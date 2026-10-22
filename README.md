# Orquídea Privé — Página de inicio

Landing page de presentación para la comunidad. Es un solo archivo: `index.html` (ábrelo en cualquier navegador).

## Cómo personalizar

| Qué | Dónde |
|---|---|
| Imagen o GIF de fondo de una sección | atributo `data-bg="img/archivo.jpg"` en cada `<section>` |
| Video de portada | `<video id="heroVideo" src="...">` en el hero |
| Fotos de las creadoras | `photo:'img/nombre.jpg'` en el arreglo `PROFILES` del script |
| Precios y beneficios | arreglo `PLANS` del script (precios mensuales en COP) |
| Tasa de cambio USD | constante `USD_RATE` |
| Galería (fotos, videos, GIF) | bloques `.media` de la sección `#galeria` |

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
- **Formularios:** conectar a la pasarela de pagos (que acepte esta categoría de negocio) y al CRM.
- **Verificación de edad e identidad** de miembros y creadoras, contratos con las creadoras, términos, política de datos (Ley 1581) y revisión legal.
