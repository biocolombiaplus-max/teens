# Orquídea Privé

Sitio estático (funciona en Vercel o Cloudflare Pages) con base de datos en Supabase.

| Archivo | Qué es |
|---|---|
| `index.html` | Landing principal |
| `registro.html` | Registro de modelos (enlace para compartir). Solo mayores de 18; envía los datos a WhatsApp y al panel |
| `contrato.html` | Contrato que la modelo lee y firma con el dedo (se abre con el enlace que genera el panel) |
| `admin.html` | Panel administrativo: modelos, documentos, contratos, fotos de la landing y enlaces |
| `config.js` | **Único archivo que debes editar**: Supabase, WhatsApp, ePayco, Zinli, datos de la empresa y porcentaje |
| `assets/contrato.js` | Texto del contrato |
| `supabase/schema.sql` | Base de datos y reglas de seguridad |
| `supabase/LEEME.md` | **Guía paso a paso para activar todo** |

## Pagos
- **ePayco** (tarjeta, PSE, Nequi, Daviplata, en COP): pega tu `PUBLIC_KEY` en `config.js` → `epayco.publicKey`. Deja `test: true` hasta hacer una compra de prueba, luego cámbialo a `false`. Al volver del pago, la landing muestra un mensaje de confirmación con la referencia.
- **Zinli** (USD): pon el correo o teléfono de tu cuenta en `config.js` → `zinli.cuenta`. El cliente ve el monto en dólares y envía el comprobante por WhatsApp; la activación es manual.
- La activación automática de membresías (área privada de miembros) es la siguiente fase.

## Cómo personalizar la landing

| Qué | Dónde |
|---|---|
| Fotos de fondo, galería y video | Panel → **Fotos de la landing** (o archivos en `img/`, ver `img/LEEME.md`) |
| Modelos (tarjetas) | Panel → **Modelos**: foto, nombre artístico, etiquetas, *Publicada* + estado *Activa* |
| Precios y beneficios | arreglo `PLANS` en `index.html` (precios mensuales en COP) |
| Tasa de cambio USD | constante `USD_RATE` en `index.html` |

## Membresías propuestas

Escalera por tipo de contenido: fotos → videos → en vivo.

| Plan | Precio mensual | Desbloquea |
|---|---|---|
| Galería | $69.900 COP (≈ US$17) | Fotos exclusivas, chat ilimitado, 1 foto personalizada |
| Cinema | $149.900 COP (≈ US$37) | + videos exclusivos, 4 fotos y 1 video personalizado, 30 min de llamada |
| Privé Live (ancla, "Más elegido") | $299.900 COP (≈ US$75) | + transmisiones en vivo ilimitadas, 30 min de videollamada 1 a 1, 8 fotos y 3 videos |
| Black Diamond | $699.900 COP (≈ US$175) | + 120 min de videollamada 1 a 1, shows privados agendados, personalizados ilimitados (uso justo), concierge |

Trimestral con 20% de descuento.

**Extras a la carta** (donde está el mayor margen en plataformas similares): set de 5 fotos $49.900, video personalizado $89.900, videollamada $9.900/min, show privado de 30 min $249.900.

Referencias del mercado: suscripciones de creadoras entre US$10 y US$50 al mes; minutos privados en vivo en sitios de cámaras entre US$2 y US$6; videos personalizados entre US$20 y US$100.

## Antes del lanzamiento público

- **Actividad en vivo y cifras:** con `DEMO_MODE = true` las notificaciones son de ejemplo (y lo indican). En producción deben venir de suscripciones reales; mostrar actividad inventada como real es publicidad engañosa (Ley 1480, Estatuto del Consumidor).
- **Testimonios y perfiles de muestra:** reemplazarlos por reales con autorización escrita.
- **Pasarela:** confirma por escrito con ePayco que aprueba esta categoría de negocio (contenido para adultos) antes de recibir pagos reales; si la rechaza, alternativas especializadas: CCBill, Segpay, Epoch.
- **Contrato:** `assets/contrato.js` es una plantilla de referencia. Debe revisarla un abogado en Colombia; completa razón social, NIT y representante en `config.js`.
- **Términos, política de privacidad (Ley 1581) y verificación de edad de los miembros.**
