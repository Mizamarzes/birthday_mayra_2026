# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> `CLAUDE.md` is a symlink to `AGENTS.md`. Edit either path — it is one file.

## Commands

| Comando | Acción |
| :-- | :-- |
| `npm run dev` | Dev server en `localhost:4321` |
| `npm run build` | Build estático a `./dist/` |
| `npm run preview` | Sirve el build |
| `npx astro check` | Chequeo de tipos (`.astro` + `.ts`). Es la única verificación automatizada del repo. |

No hay tests ni linter configurados. Para validar un cambio: `npx astro check && npm run build`.

Al levantar el dev server, usá modo background: `astro dev --background`, y manejalo con
`astro dev stop`, `astro dev status`, `astro dev logs`.

## Qué es esto

Una página de cumpleaños con estética arcade 16-bit, en una sola ruta (`src/pages/index.astro`).
No es una landing con scroll: es un **recorrido de 5 pantallas** donde solo una está visible a la
vez y hay que cumplir una condición para pasar a la siguiente. Todo vive dentro de un "mueble de
arcade" bajo un overlay CRT. Astro estático + Tailwind v4. Sin framework de UI, sin dependencias de
runtime.

## Arquitectura

### El contenido vive en un solo archivo

`src/data/site.ts` exporta **todo** el texto y los datos (`player`, `intro`, `albumItems`,
`mapNodes`, `triviaQuestions`, `finale`). Los componentes no llevan texto propio salvo etiquetas
estructurales. Los valores actuales son placeholders a la espera de los datos reales
(`[FOTO N: ...]`, `[HITO N - FECHA]`, dedicatoria de relleno). **Cualquier cambio de contenido va
acá, no en los componentes.**

`src/scripts/trivia.ts` importa este mismo módulo, así que las preguntas se bundlean al cliente
desde la misma fuente que usa el render — no hay que duplicarlas ni pasarlas con `define:vars`.

### Tokens de diseño

El bloque `@theme` de `src/styles/global.css` es la fuente de la paleta y las tipografías; Tailwind
v4 genera las utilidades a partir de ahí (`bg-primary`, `text-tertiary`, `font-title`…). No hay
`tailwind.config`.

- Marca: `primary #FF2A55`, `secondary #FF4B93`, `tertiary #FFBE0B`.
- Escala neutra derivada de `#180D2B`: `ink` → `void` → `inset` → `screen` → `cabinet` → `panel` →
  `bezel` → `edge` (de más oscuro a más claro). Usá estos tokens en vez de hexadecimales sueltos.
- Fuentes: `font-title` (Press Start 2P), `font-ui` (Space Mono), `font-body` (Rubik).

Las clases pixel (`pixel-box`, `pixel-box-gold`, `pixel-box-inset`, `pixel-btn` + modificadores
`pixel-btn-secondary` / `pixel-btn-gold`, `rare-item-glow`, `crt-overlay`, `pixel-star`) están en
`@layer components` del mismo archivo. Los modificadores de botón **requieren** la clase base:
`class="pixel-btn pixel-btn-gold"`.

### El recorrido de pantallas

`src/scripts/screens.ts` es el corazón de la página. Cada sección es un `<section data-screen="…">`
que arranca con el atributo `hidden`; el controlador muestra una sola y gobierna todo lo demás.
El orden y las etiquetas salen de `stages` en `src/data/site.ts`.

| Pantalla | Condición para continuar |
| :-- | :-- |
| `start` | libre |
| `album` | inspeccionar los 6 ítems |
| `map` | revelar los 4 hitos |
| `trivia` | ganar la trivia (o el botón de modo trampa) |
| `final` | última |

El progreso se persiste en localStorage (`src/scripts/progress.ts`, clave `love-quest:progress:v1`)
y se valida al leerlo, así que un storage corrupto degrada a partida nueva en vez de romper. Al
iniciar, la pantalla guardada se **recorta** a la más lejana alcanzable: nadie entra por URL o
storage editado a una pantalla que no desbloqueó.

#### Contrato de atributos

El controlador no conoce ningún componente: se engancha por atributos. Para sumar algo nuevo,
usá estos en el markup en vez de tocar `screens.ts`.

| Atributo | Qué hace |
| :-- | :-- |
| `data-screen="<id>"` | Marca una sección como pantalla del recorrido |
| `data-continue="<id>"` | Botón que avanza desde esa pantalla; se habilita solo si está superada |
| `data-inspect="album\|map"` + `data-inspect-id` | Cubierta clickeable; al tocarla registra progreso y se oculta |
| `data-inspect-mark="album\|map"` + `data-inspect-id` | Marca "✓" que aparece al inspeccionar |
| `data-counter="album\|map"` | Recibe el número de cosas ya inspeccionadas |
| `data-hint="album\|map"` | Recibe el texto de cuánto falta |
| `data-stage="<id>"` | Punto del indicador de etapa; navega a pantallas ya alcanzadas |
| `data-goto="<id>"` | Salto directo sin animación de transición |
| `data-reset` | Reinicia la partida; pide confirmación con un segundo toque |

La trivia es el único módulo que `screens.ts` maneja de forma explícita: `initTrivia()` devuelve un
`TriviaController` y el controlador lo llama al entrar a esa pantalla (`showVictory()` si ya ganó,
`restart({ silent: true })` si no). `onWin` marca el progreso, y de ahí sale la habilitación del
botón de la pantalla de victoria.

### Interactividad

No hay handlers inline ni funciones globales; todo se engancha desde el único `<script>` de
`src/pages/index.astro`, que llama a `initScreens()` (que a su vez inicializa la trivia) y a
`bindSfxTriggers()`. Los módulos de cliente son:

- `src/scripts/sfx.ts` — sintetizador 8-bit con Web Audio, sin dependencias. `bindSfxTriggers()`
  recorre el DOM y conecta cualquier elemento con `data-sfx="select|start|correct|wrong|win"`.
  **Para que algo suene al clic, agregale el atributo `data-sfx`** en el `.astro`.
- `src/scripts/trivia.ts` — `initTrivia()` busca los elementos por `id` y devuelve `null` si no
  están, así que la sección puede faltar sin romper la página. Los botones de opción se crean en JS.
- `src/scripts/screens.ts` y `src/scripts/progress.ts` — ver arriba.

## Convenciones que importan

**Mostrar/ocultar overlays usa el atributo `hidden`, no la clase.** `global.css` declara
`[hidden] { display: none !important }` precisamente para esto: poner `hidden` y `flex` juntos como
clases de Tailwind depende del orden de emisión de las utilidades de display. En el markup va el
atributo `hidden`; en JS se togglea `el.hidden = true/false`.

**Las clases que generan los scripts en runtime tienen que ser literales completos** en el source —
Tailwind escanea los `.ts` y no puede resolver concatenaciones parciales como `` `bg-${color}` ``.

**Sin JavaScript la página queda en blanco**, porque todas las pantallas arrancan con `hidden`. Hay
un `<noscript>` que lo avisa. Es una decisión asumida: el recorrido es inherentemente interactivo.

**`design/codigo_design_page.html` es el diseño original de referencia, no código vivo.** Está
excluido del escaneo de Tailwind con `@source not "../../design";` en `global.css`. Usa la paleta
**vieja** (`#ff2a5f`, `#ff5c93`, `#3d1a6d`) y clases que ya no existen: consultalo para intención de
diseño, nunca copies valores de ahí.

**Press Start 2P no tiene glifos acentuados** (Á, Í, Ó, Ñ). Caen a Space Mono, que se ve algo más
chico dentro de un título pixel. Es un artefacto conocido y aceptado; no lo "arregles" sacando los
acentos del español.

## Assets

- Fotos del álbum: van en `public/` y se referencian con el campo `photo` del ítem en `albumItems`.
  Sin `photo`, la tarjeta cae al marco punteado con emoji y etiqueta.
- Video del regalo: `public/video.mp4`, o cambiá `finale.videoSrc`.

## Documentación

Astro: https://docs.astro.build — consultá las guías de
[routing](https://docs.astro.build/en/guides/routing/),
[componentes](https://docs.astro.build/en/basics/astro-components/),
[estilos y Tailwind](https://docs.astro.build/en/guides/styling/) antes de tocar esas áreas.
