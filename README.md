# birthday_mayra_2026

**LOVE QUEST — 16-Bit Romantic Arcade.** Página de cumpleaños hecha con Astro + Tailwind v4.

## Cómo funciona

No es una página con scroll: es un recorrido de **5 pantallas**, una por vez. Para pasar a la
siguiente hay que completar la actual.

| # | Pantalla | Qué hay que hacer |
| :-- | :-- | :-- |
| 1 | Inicio | Tocar PRESS START |
| 2 | Álbum de logros | Inspeccionar los 13 ítems (cada uno revela su recuerdo) |
| 3 | La ruta | Desbloquear la foto de las 9 estaciones |
| 4 | Minijuego | Ganar la trivia. Hay 3 vidas y un botón de "modo trampa" si se queda sin |
| 5 | Tu regalo | El video y la dedicatoria |

Los puntitos de arriba muestran en qué pantalla va y dejan volver a las ya superadas. El progreso se
guarda en el navegador: si recarga o cierra la página, vuelve a donde estaba. Para empezar de cero
está **↺ REINICIAR PARTIDA** en el pie (pide confirmación con un segundo toque).

## Dónde tocar el contenido

Todo el texto y los datos están quemados en **un solo archivo**: `src/data/site.ts`.

| Qué querés cambiar | Dónde |
| :-- | :-- |
| Cómo se la llama, quién firma, año, puntajes del HUD | `player` |
| Nombre de cada pantalla en el indicador de etapa | `stages` |
| Título, subtítulo y texto de la pantalla de inicio | `intro` |
| Los ítems del álbum (foto, título, lore, rareza) | `albumItems` |
| Las estaciones de la ruta (foto, título, fecha) | `mapNodes` |
| Las 5 preguntas de la trivia | `triviaQuestions` |
| Video final y dedicatoria | `finale` |

> `player` tiene **dos** campos para el nombre: `name` en mayúscula (`MI AMOR`) para el HUD, el
> título grande y los créditos, y `nameSoft` en minúscula (`mi amor`) para cuando va dentro de una
> frase, como la dedicatoria. Cambiá los dos juntos.

### Fotos y video

- **Fotos**: hay una carpeta por sección — `src/assets/album/` para el álbum y
  `src/assets/timeline/` para la ruta. Dejá la imagen en la que corresponda y poné su nombre en el
  campo `photoFile` del ítem (`albumItems`) o de la estación (`mapNodes`). Nada más — no hay que importar
  ni optimizar nada: Astro la redimensiona y la sirve en WebP (una foto de celular de 3000px queda
  entre 8 y 40 kB). Mientras no haya `photoFile`, la tarjeta muestra el marco punteado con el emoji
  y la etiqueta `[FOTO N: ...]`.

  Si el nombre no coincide con ningún archivo, el build falla y te dice cuáles hay. Eso es a
  propósito: mejor enterarte al compilar que con una foto rota en producción.
- **Video del regalo**: está en `src/assets/video/video-01.mp4`. Para cambiarlo, dejá el nuevo en
  esa carpeta y actualizá `finale.videoFile` y `finale.videoAspect` (la proporción del archivo, para
  que el marco no lo recorte).

## Estructura

```text
/
├── design/
│   └── codigo_design_page.html   Diseño original de referencia (excluido de Tailwind)
├── public/                       Assets sin procesar: favicon
└── src/
    ├── assets/
    │   ├── album/                Fotos del álbum      (Astro las optimiza)
    │   ├── timeline/             Fotos de la ruta
    │   └── video/                El video del regalo
    ├── components/               Secciones de la página
    ├── data/site.ts              ← TODO el contenido editable
    ├── layouts/Layout.astro      <head>, fuentes, overlay CRT
    ├── pages/index.astro         Compone las secciones + engancha los scripts
    ├── scripts/
    │   ├── screens.ts            Recorrido de pantallas y condiciones para avanzar
    │   ├── progress.ts           Guardado del progreso en localStorage
    │   ├── sfx.ts                Sintetizador 8-bit (Web Audio, sin dependencias)
    │   └── trivia.ts             Lógica del minijuego
    └── styles/global.css         Tokens de diseño (@theme) y clases pixel
```

## Sistema de diseño

Los tokens viven en el bloque `@theme` de `src/styles/global.css` y se usan como utilidades de
Tailwind (`bg-primary`, `text-tertiary`, `font-title`…).

| Token | Valor | Uso |
| :-- | :-- | :-- |
| `primary` | `#FF2A55` | Botones, acentos principales |
| `secondary` | `#FF4B93` | Bordes, texto secundario |
| `tertiary` | `#FFBE0B` | Dorado: labels, estados, destacados |
| `cabinet` | `#180D2B` | Neutro base; de ahí salen `ink`, `void`, `screen`, `panel`, `bezel`, `edge` |

**Tipografías**: `font-title` = Press Start 2P (títulos), `font-ui` = Space Mono (labels/HUD),
`font-body` = Rubik (párrafos).

> Press Start 2P no trae glifos acentuados (Á, Í, Ó, Ñ). Esos caracteres caen a Space Mono, que se
> ve levemente más chico dentro de un título pixel. Si molesta, pasá los `h2` a `font-ui`.

## Comandos

| Comando | Acción |
| :-- | :-- |
| `npm install` | Instala dependencias |
| `npm run dev` | Dev server en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Previsualiza el build |
| `npx astro check` | Chequeo de tipos |
