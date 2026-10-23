-- ===========================================================================
-- Orquídea Privé — Base de datos (Supabase / PostgreSQL)
-- Cómo usarlo: Supabase → SQL Editor → New query → pega todo → Run.
-- Se puede ejecutar varias veces sin dañar los datos existentes.
-- ===========================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Administradores
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- Modelos / creadoras
-- ---------------------------------------------------------------------------
create table if not exists public.models (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'postulada'
    check (status in ('postulada','verificada','contrato_enviado','firmado','activa','rechazada','retirada')),
  source text not null default 'registro',          -- registro | admin
  full_name text not null,
  stage_name text,
  birth_date date not null,
  doc_type text not null default 'CC',
  doc_number text not null,
  city text,
  phone text not null,
  email text,
  social text,
  hours_week int,
  interests jsonb not null default '{}'::jsonb,     -- lo que marcó al postularse
  content_consent jsonb not null default '{}'::jsonb, -- lo que autorizó al firmar
  doc_front_path text,
  doc_back_path text,
  selfie_path text,
  extra_photos text[] not null default '{}',
  -- Datos públicos para la landing
  bio text,
  tags text[] not null default '{}',
  photo_url text,
  published boolean not null default false,
  featured boolean not null default false,
  online boolean not null default false,
  is_new boolean not null default true,
  top boolean not null default false,
  sort int not null default 100,
  notes text
);

-- Galería del perfil: [{path, url, blur, exclusive}] en el orden en que se muestra.
-- Las fotos exclusivas solo se entregan al público en versión difuminada (blur).
alter table public.models add column if not exists gallery jsonb not null default '[]'::jsonb;

-- Solo mayores de 18 años: se valida en la base de datos, no solo en el formulario.
create or replace function public.enforce_adult()
returns trigger language plpgsql as $$
begin
  if new.birth_date is null or new.birth_date > (current_date - interval '18 years')::date then
    raise exception 'Solo se aceptan personas mayores de 18 años' using errcode = 'check_violation';
  end if;
  if new.birth_date < date '1940-01-01' then
    raise exception 'Fecha de nacimiento no válida' using errcode = 'check_violation';
  end if;
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists models_adult on public.models;
create trigger models_adult before insert or update on public.models
  for each row execute function public.enforce_adult();

-- ---------------------------------------------------------------------------
-- Contratos
-- ---------------------------------------------------------------------------
create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  model_id uuid not null references public.models(id) on delete cascade,
  token text not null unique default encode(gen_random_bytes(18), 'hex'),
  version text not null,
  status text not null default 'pendiente' check (status in ('pendiente','firmado','anulado')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '15 days',
  signed_at timestamptz,
  signer_name text,
  signer_doc text,
  signature_png text,          -- firma (imagen PNG en base64)
  signed_html text,            -- copia exacta del contrato firmado
  consent jsonb,
  user_agent text
);
create index if not exists contracts_model_idx on public.contracts(model_id);

-- ---------------------------------------------------------------------------
-- Imágenes y videos de la landing (fondos, galería, video de portada)
-- ---------------------------------------------------------------------------
create table if not exists public.site_media (
  slot text primary key,
  url text not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Seguridad (RLS): por defecto nadie lee ni escribe; solo admins.
-- El público entra únicamente por las funciones de abajo.
-- ---------------------------------------------------------------------------
alter table public.admins     enable row level security;
alter table public.models     enable row level security;
alter table public.contracts  enable row level security;
alter table public.site_media enable row level security;

drop policy if exists admins_self on public.admins;
create policy admins_self on public.admins for select to authenticated using (user_id = auth.uid());

drop policy if exists models_admin on public.models;
create policy models_admin on public.models for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists contracts_admin on public.contracts;
create policy contracts_admin on public.contracts for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists media_read on public.site_media;
create policy media_read on public.site_media for select to anon, authenticated using (true);
drop policy if exists media_admin on public.site_media;
create policy media_admin on public.site_media for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Funciones públicas
-- ---------------------------------------------------------------------------

-- Postulación desde registro.html
create or replace function public.register_model(p jsonb)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid := coalesce(nullif(p->>'id','')::uuid, gen_random_uuid());
begin
  if coalesce((p->>'accept_terms')::boolean, false) is not true then
    raise exception 'Debe aceptar los términos';
  end if;
  insert into public.models (id, source, full_name, stage_name, birth_date, doc_type, doc_number, city,
    phone, email, social, hours_week, interests, doc_front_path, doc_back_path, selfie_path, extra_photos)
  values (v_id, 'registro',
    left(trim(p->>'full_name'), 120), left(trim(p->>'stage_name'), 60), (p->>'birth_date')::date,
    left(coalesce(p->>'doc_type','CC'), 20), left(trim(p->>'doc_number'), 30), left(p->>'city', 60),
    left(trim(p->>'phone'), 30), left(trim(p->>'email'), 120), left(trim(p->>'social'), 120),
    nullif(p->>'hours_week','')::int, coalesce(p->'interests', '{}'::jsonb),
    nullif(p->>'doc_front_path',''), nullif(p->>'doc_back_path',''), nullif(p->>'selfie_path',''),
    coalesce(array(select jsonb_array_elements_text(p->'extra_photos')), '{}'));
  return v_id;
end $$;

-- Perfiles publicados en la landing (solo datos públicos, nunca documentos).
-- De las fotos exclusivas solo sale la versión difuminada.
drop function if exists public.list_public_models();
create function public.list_public_models()
returns table (id uuid, stage_name text, city text, age int, tags text[], bio text, photo_url text,
               featured boolean, online boolean, is_new boolean, top boolean, gallery jsonb)
language sql stable security definer set search_path = public as $$
  select m.id, coalesce(m.stage_name, split_part(m.full_name, ' ', 1)), m.city,
         date_part('year', age(m.birth_date))::int, m.tags, m.bio, m.photo_url,
         m.featured, m.online, m.is_new, m.top,
         coalesce((select jsonb_agg(
                    case when coalesce((g->>'exclusive')::boolean, false)
                         then jsonb_build_object('exclusive', true, 'blur', g->>'blur')
                         else jsonb_build_object('exclusive', false, 'url', g->>'url', 'blur', g->>'blur') end
                    order by o)
                   from jsonb_array_elements(m.gallery) with ordinality as t(g, o)), '[]'::jsonb)
  from public.models m
  where m.published and m.status = 'activa'
  order by m.sort, m.created_at desc;  -- posición fija primero; luego las más nuevas
$$;

-- Leer un contrato por su enlace privado
create or replace function public.get_contract(p_token text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare c public.contracts; m public.models;
begin
  select * into c from public.contracts where token = p_token;
  if not found or c.status = 'anulado' then return null; end if;
  select * into m from public.models where id = c.model_id;
  return jsonb_build_object(
    'status', c.status, 'version', c.version, 'expired', (c.status = 'pendiente' and c.expires_at < now()),
    'signed_at', c.signed_at, 'signed_html', c.signed_html,
    'model', jsonb_build_object('full_name', m.full_name, 'stage_name', m.stage_name, 'doc_type', m.doc_type,
      'doc_number', m.doc_number, 'birth_date', m.birth_date, 'city', m.city, 'phone', m.phone, 'email', m.email));
end $$;

-- Firmar el contrato
create or replace function public.sign_contract(p_token text, p_name text, p_doc text, p_signature text,
                                                p_html text, p_consent jsonb, p_ua text)
returns timestamptz language plpgsql security definer set search_path = public as $$
declare c public.contracts; m public.models; v_now timestamptz := now();
begin
  select * into c from public.contracts where token = p_token for update;
  if not found or c.status <> 'pendiente' then raise exception 'Este enlace ya no está disponible'; end if;
  if c.expires_at < v_now then raise exception 'El enlace venció. Pide uno nuevo.'; end if;
  select * into m from public.models where id = c.model_id;
  if regexp_replace(coalesce(p_doc,''), '\D', '', 'g') <> regexp_replace(m.doc_number, '\D', '', 'g') then
    raise exception 'El número de documento no coincide con el registrado';
  end if;
  if p_signature is null or length(p_signature) < 200 or length(p_signature) > 600000 then
    raise exception 'Firma no válida';
  end if;
  update public.contracts set status = 'firmado', signed_at = v_now, signer_name = left(p_name, 120),
    signer_doc = left(p_doc, 30), signature_png = p_signature, signed_html = left(p_html, 400000),
    consent = coalesce(p_consent, '{}'::jsonb), user_agent = left(p_ua, 300)
  where id = c.id;
  update public.models set status = 'firmado', content_consent = coalesce(p_consent, '{}'::jsonb)
  where id = m.id and status in ('postulada','verificada','contrato_enviado');
  return v_now;
end $$;

revoke all on function public.register_model(jsonb) from public;
revoke all on function public.get_contract(text) from public;
revoke all on function public.sign_contract(text,text,text,text,text,jsonb,text) from public;
revoke all on function public.list_public_models() from public;
grant execute on function public.register_model(jsonb) to anon, authenticated;
grant execute on function public.get_contract(text) to anon, authenticated;
grant execute on function public.sign_contract(text,text,text,text,text,jsonb,text) to anon, authenticated;
grant execute on function public.list_public_models() to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Almacenamiento de archivos
--   landing    → público: fondos, galería, video y fotos de perfil
--   documentos → privado: cédulas y selfies (solo admins pueden verlos)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('landing', 'landing', true, 52428800,
        array['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documentos', 'documentos', false, 10485760,
        array['image/jpeg','image/png','image/webp','image/heic','image/heif'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists landing_admin_write on storage.objects;
create policy landing_admin_write on storage.objects for all to authenticated
  using (bucket_id = 'landing' and public.is_admin())
  with check (bucket_id = 'landing' and public.is_admin());

-- Las postulantes suben sus documentos pero no pueden leerlos ni listarlos.
drop policy if exists docs_public_upload on storage.objects;
create policy docs_public_upload on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'documentos' and (storage.foldername(name))[1] = 'postulaciones');

drop policy if exists docs_admin on storage.objects;
create policy docs_admin on storage.objects for all to authenticated
  using (bucket_id = 'documentos' and public.is_admin())
  with check (bucket_id = 'documentos' and public.is_admin());

-- ---------------------------------------------------------------------------
-- ÚLTIMO PASO (una sola vez): crea tu usuario en Authentication → Users →
-- Add user, y luego ejecuta esta línea con tu correo para volverte admin:
--
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'TU_CORREO@gmail.com'
--   on conflict do nothing;
-- ---------------------------------------------------------------------------
