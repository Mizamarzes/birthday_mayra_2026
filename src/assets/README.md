# Fotos

Dos carpetas, una por sección. Se referencian **solo por nombre de archivo** desde
`src/data/site.ts`; no hay que importar nada.

| Carpeta | Sección | Campo en `site.ts` |
| :-- | :-- | :-- |
| `album/` | Álbum de logros | `photoFile` de cada ítem de `albumItems` |
| `timeline/` | La ruta | `photoFile` de cada estación de `mapNodes` |
| `video/` | El regalo final | `videoFile` de `finale` |

Astro las redimensiona y las sirve en **WebP** en el build. Subí el original sin optimizar: para
una foto de celular las variantes quedan entre 8 y 60 kB.

Si un `photoFile` no coincide con ningún archivo de su carpeta, **falla el build** y el error lista
los que sí están. Es a propósito: mejor enterarse al compilar que con una foto rota en producción.

## Video

`video/` no pasa por ningún pipeline: Vite lo copia a `dist/` con hash y se sirve tal cual. El
marco del reproductor usa `finale.videoAspect` para seguir la proporción real del archivo — el
actual es vertical (478×850). **Si cambiás el video, actualizá también ese valor**, o el marco lo
va a recortar.

## Resolución mínima

El marco del álbum se ve a ~260 px y el de la ruta a ~120 px, así que en pantallas retina hacen
falta ~520 px y ~240 px de ancho real. Astro **no amplía** imágenes: si el archivo es más chico que
eso, se ve borroso. `timeline/21-nos-conocimos.jpeg` mide 154×126 y es el caso que hoy se nota.
