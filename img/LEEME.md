# Imágenes de la landing

Sube los archivos **con estos nombres exactos** (minúsculas, sin tildes) y la página los toma sola.
Si un archivo no está, esa parte se ve con el diseño oscuro por defecto.

## Fondos de sección — `img/fondos/`
Formato `.jpg`, horizontal, ~1920×1080, idealmente menos de 400 KB (comprímelas en squoosh.app o tinypng.com).
Se les pone encima un velo oscuro automático para que el texto se lea.

| Archivo | Sección |
|---|---|
| `portada.jpg` | Portada (arriba de todo) |
| `creadoras.jpg` | Perfiles de las creadoras |
| `como-funciona.jpg` | Cómo funciona |
| `beneficios.jpg` | Por qué suscribirte (chat) |
| `membresias.jpg` | Planes y precios |
| `seguridad.jpg` | Seguridad y confianza |
| `galeria.jpg` | El club por dentro |
| `testimonios.jpg` | Testimonios |
| `trabaja-con-nosotros.jpg` | Para creadoras |
| `preguntas.jpg` | Preguntas frecuentes |
| `cierre.jpg` | Llamado final |

## Galería — `img/galeria/`
`1.jpg` a `6.jpg`. Si alguno es GIF, súbelo como `.gif` y cambia esa extensión en `index.html` (busca `img/galeria/`).
Los bloques 1 y 5 son verticales, el 3 y el 6 son anchos.

## Video de portada — `img/video/`
`portada.mp4`: 10–20 segundos, sin audio, menos de 8 MB.

## Modelos — `img/modelos/`
Para después: fotos verticales 3:4 (ej. 1200×1600). Se enlazan en el arreglo `PROFILES` de `index.html` con `photo:'img/modelos/nombre.jpg'`.
