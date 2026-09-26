# birthday_mayra_2026

**LOVE QUEST — 16-Bit Romantic Arcade.** Landing page de cumpleaños hecha con Astro + Tailwind v4.

## Dónde tocar el contenido

Todo el texto y los datos están quemados en **un solo archivo**: `src/data/site.ts`.

| Qué querés cambiar | Dónde |
| :-- | :-- |
| Nombre, quién firma, año, puntajes del HUD | `player` |
| Título, subtítulo y texto de la pantalla de inicio | `intro` |
| Los 6 ítems del álbum (foto, título, lore, rareza) | `albumItems` |
| Los 4 hitos del mapa de niveles | `mapNodes` |
| Las 5 preguntas de la trivia | `triviaQuestions` |
| Video final y dedicatoria | `finale` |

### Fotos y video

- **Fotos del álbum**: poné la imagen en `public/` (ej. `public/fotos/primera-cita.jpg`) y agregá
  `photo: "/fotos/primera-cita.jpg"` al ítem correspondiente en `albumItems`. Mientras no haya
  `photo`, la tarjeta muestra el marco punteado con el emoji y la etiqueta `[FOTO N: ...]`.
- **Video del regalo**: dejá el archivo en `public/video.mp4` (o cambiá `finale.videoSrc`).

## Estructura

```text
/
├── design/
│   └── codigo_design_page.html   Diseño original de referencia (excluido de Tailwind)
├── public/                       Assets estáticos: fotos, video, favicon
└── src/
    ├── components/               Secciones de la página
    ├── data/site.ts              ← TODO el contenido editable
    ├── layouts/Layout.astro      <head>, fuentes, overlay CRT
    ├── pages/index.astro         Compone las secciones + engancha los scripts
    ├── scripts/
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
