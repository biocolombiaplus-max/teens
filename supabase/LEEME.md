# Activar el panel administrativo, el registro y los contratos

Todo funciona con **Supabase** (gratis para empezar): guarda las modelos, los documentos, los contratos firmados y las fotos de la landing. Tarda unos 15 minutos y solo se hace una vez.

## 1. Crear el proyecto
1. Entra a **supabase.com** y crea una cuenta, por ejemplo con tu GitHub.
2. Pulsa **New project**:
   - Nombre: `orquidea-prive`
   - Contraseña de base de datos: inventa una y **guárdala**
   - Región: **East US** (la más cercana a Colombia)
3. Espera unos 2 minutos mientras se crea.

## 2. Crear las tablas
1. En el menú izquierdo entra a **SQL Editor** y pulsa **New query**.
2. Abre el archivo `supabase/schema.sql` de este repositorio, copia **todo** su contenido y pégalo.
3. Pulsa **Run**. Debe decir *Success*.

## 3. Conectar la página
1. En Supabase entra a **Project Settings → API**.
2. Copia **Project URL** y la llave **anon public**.
3. En GitHub abre `config.js`, pulsa el lápiz ✏️ y pega los dos valores:
   ```js
   supabaseUrl: 'https://xxxx.supabase.co',
   supabaseAnonKey: 'eyJhbGciOi...',
   ```
4. Pulsa **Commit changes**. Vercel actualiza la página sola.

> ⚠️ Nunca pegues la llave **service_role**: esa es secreta. La **anon** sí es pública y está protegida por las reglas de seguridad del `schema.sql`.

## 4. Crear tu usuario administrador
1. En Supabase entra a **Authentication → Users → Add user → Create new user**.
2. Escribe tu correo y una contraseña fuerte, y marca **Auto Confirm User**.
3. Vuelve a **SQL Editor** y ejecuta esto, con tu correo:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'TU_CORREO@gmail.com'
   on conflict do nothing;
   ```
4. Para que nadie pueda crearse una cuenta por su cuenta, entra a **Authentication → Sign In / Providers** y desactiva **Allow new users to sign up**.

## 5. Indicar la dirección de tu sitio
En **Authentication → URL Configuration**, en **Site URL**, pon tu dirección de Vercel (por ejemplo `https://orquideaprive.vercel.app`).

## Listo: tus enlaces
| Página | Para quién | Enlace |
|---|---|---|
| Panel administrativo | Solo tú | `https://TU-SITIO/admin.html` |
| Registro de modelos | Para enviar a las modelos | `https://TU-SITIO/registro.html` |
| Contrato | Se genera desde el panel, uno por modelo | `https://TU-SITIO/contrato.html?t=...` |

## Cómo es el proceso con cada modelo
1. **Registro:** la modelo llena `registro.html`. Se rechaza a cualquier menor de 18 años, tanto en el formulario como en la base de datos. Sube su documento y una selfie, y sus datos te llegan a WhatsApp (3126014769) y al panel.
2. **Verificación:** en el panel, en **Modelos**, revisas sus documentos y cambias el estado a **Verificada**.
3. **Contrato:** pulsas **Generar contrato y enviar por WhatsApp**. Se abre WhatsApp con el enlace listo para enviárselo.
4. **Firma:** ella lee el contrato, marca qué contenido autoriza y firma con el dedo. El contrato firmado queda guardado con su firma, documento, fecha, hora y dispositivo, y ella puede descargarlo en PDF.
5. **Publicación:** subes la foto de su tarjeta, cambias el estado a **Activa** y marcas **Publicada**. Aparece en la landing al instante.

Cuando hay al menos una modelo publicada, la landing muestra solo las modelos reales y oculta las de muestra.

## Fotos de la landing
En el panel, la pestaña **Fotos de la landing** permite subir los fondos de cada sección, las 6 fotos de la galería y el video de portada. Se publican al instante.
