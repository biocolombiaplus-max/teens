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

| Plan | Precio | Para quién |
|---|---|---|
| Pase 7 días | $39.900 COP (≈ US$10) | Prueba sin compromiso; convierte indecisos |
| Esencial | $89.900 COP/mes (≈ US$22) | Entrada; chat ilimitado + 30 min de llamada |
| Premium (ancla) | $179.900 COP/mes (≈ US$45) | El plan que se quiere vender; 120 min |
| Black VIP | $449.900 COP/mes (≈ US$112) | Exclusividad y concierge; hace ver Premium razonable |

Trimestral con 20% de descuento para mejorar retención.

## Antes del lanzamiento público

- **Actividad en vivo y cifras:** con `DEMO_MODE = true` las notificaciones son de ejemplo (y lo indican). En producción deben venir de suscripciones reales; mostrar actividad inventada como real es publicidad engañosa (Ley 1480, Estatuto del Consumidor).
- **Testimonios y perfiles de muestra:** reemplazarlos por reales con autorización escrita.
- **Formularios:** conectar a la pasarela de pagos (que acepte esta categoría de negocio) y al CRM.
- **Verificación de edad e identidad** de miembros y creadoras, contratos con las creadoras, términos, política de datos (Ley 1581) y revisión legal.
