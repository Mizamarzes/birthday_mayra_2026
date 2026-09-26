/**
 * Contenido de la página. Todo está quemado acá a propósito:
 * es el único archivo a tocar cuando lleguen los datos reales.
 */
/*
 * --- FOTOS ---
 * Hay dos carpetas, una por sección:
 *   src/assets/album/     → las fotos del álbum de logros  (campo photoFile de albumItems)
 *   src/assets/timeline/  → las fotos de la ruta           (campo photoFile de mapNodes)
 * Se referencian solo por nombre de archivo; no hay que importar nada. Si el nombre no
 * existe en esa carpeta, falla el build y te dice cuáles hay.
 */

export const player = {
  /** Cómo se la llama en el HUD, el título grande y los créditos (todo en mayúscula). */
  name: "MI AMOR",
  /** La misma persona, pero dentro de una frase. Se usa en la dedicatoria. */
  nameSoft: "mi amor",
  /** Quién firma la página. */
  from: "TU NOVIO",
  year: 2026,
  cabinetId: "1994",
  highScore: 999999,
  baseScore: 10000,
} as const;

export const intro = {
  badge: "¡FELIZ CUMPLEAÑOS!",
  title: "LOVE QUEST",
  subtitle: `★ 16-BIT ROMANTIC EDITION (AÑO ${player.year}) ★`,
  story:
    "Una misión legendaria dedicada a la jugadora más especial del mundo",
  cta: "▶ PRESS START / TOCÁ PARA JUGAR",
  hint: "O deslizá hacia abajo con tu joystick ↓",
} as const;

/** Las cinco pantallas del recorrido, en orden. */
export const stages = [
  { id: "start", label: "INSERT COIN" },
  { id: "album", label: "ÁLBUM DE LOGROS" },
  { id: "map", label: "MAPA DE NIVELES" },
  { id: "trivia", label: "MINIJUEGO" },
  { id: "final", label: "TU REGALO" },
] as const;

export type StageId = (typeof stages)[number]["id"];

/** Paleta de acento por rareza de ítem. */
export type Rarity = "SSS" | "EPIC" | "RARE" | "COMMON" | "SPECIAL" | "LEGENDARY";

export interface AlbumItem {
  id: string;
  rarity: Rarity;
  emoji: string;
  /** Texto del marco vacío, mientras no haya foto. */
  photoLabel: string;
  /** Nombre del archivo dentro de `src/assets/album/`. Sin esto, se muestra el marco vacío. */
  photoFile?: string;
  title: string;
  lore: string;
  exp: string;
  status: string;
}

export const albumItems: AlbumItem[] = [
  {
    id: "001",
    rarity: "SSS",
    emoji: "🛵",
    photoLabel: "[FOTO: LA MOTO]",
    photoFile: "9-moto-cola.jpeg",
    title: "MI COPILOTA",
    lore: "Que linda colaa muack.",
    exp: "+500 PTS",
    status: "EN RUTA",
  },
  {
    id: "002",
    rarity: "COMMON",
    emoji: "🍿",
    photoLabel: "[FOTO: TARDE DE PELI]",
    photoFile: "10-peli-piedec.jpeg",
    title: "TARDE DE PELI",
    lore: "Un viaje infinito hasta peyecuesta.",
    exp: "+450 PTS",
    status: "PLAN PERFECTO",
  },
  {
    id: "003",
    rarity: "EPIC",
    emoji: "💋",
    photoLabel: "[FOTO: EL BESOTE]",
    photoFile: "11-besote.jpeg",
    title: "EL BESOTE",
    lore: "besote en el malecon de la playita.",
    exp: "+800 PTS",
    status: "INOLVIDABLE",
  },
  {
    id: "004",
    rarity: "SPECIAL",
    emoji: "🎃",
    photoLabel: "[FOTO: DISFRACES]",
    photoFile: "12-disfraces.jpeg",
    title: "MODO DISFRAZ",
    lore: "walter white y jesse pinkman.",
    exp: "+700 PTS",
    status: "ICÓNICO",
  },
  {
    id: "005",
    rarity: "EPIC",
    emoji: "🌆",
    photoLabel: "[FOTO: BESO CON VISTA]",
    photoFile: "13-beso-mano-.jpeg",
    title: "BESO CON VISTA",
    lore: "besoote.",
    exp: "+850 PTS",
    status: "DE PELÍCULA",
  },
  {
    id: "006",
    rarity: "COMMON",
    emoji: "🛌",
    photoLabel: "[FOTO: PIJAMAS]",
    photoFile: "14-pijamas-geis.jpeg",
    title: "PIJAMAS A JUEGO",
    lore: "pijamas todas homosexuales.",
    exp: "+400 PTS",
    status: "HOGAR",
  },
  {
    id: "007",
    rarity: "RARE",
    emoji: "🍻",
    photoLabel: "[FOTO: PRIMERA BORRACHERA]",
    photoFile: "15-primera-borrachera.jpeg",
    title: "LA PRIMERA BORRACHERA",
    lore: "borracha, no aguanta nada.",
    exp: "+650 PTS",
    status: "LEYENDA",
  },
  {
    id: "008",
    rarity: "RARE",
    emoji: "🎡",
    photoLabel: "[FOTO: PAMPLONA]",
    photoFile: "16-pamplona.jpeg",
    title: "PAMPLONA",
    lore: "en la loma con mi peruana.",
    exp: "+600 PTS",
    status: "ESCAPADA",
  },
  {
    id: "009",
    rarity: "COMMON",
    emoji: "🤠",
    photoLabel: "[FOTO: DOLLARCITY]",
    photoFile: "17-dollarcity.jpeg",
    title: "MODO DOLLARCITY",
    lore: "foto toda bonita.",
    exp: "+420 PTS",
    status: "SIN VERGÜENZA",
  },
  {
    id: "010",
    rarity: "SPECIAL",
    emoji: "🚶",
    photoLabel: "[FOTO: LA CAMINATA]",
    photoFile: "18-caminata.jpeg",
    title: "LA CAMINATA",
    lore: "el camino a giron.",
    exp: "+550 PTS",
    status: "TRANQUILO",
  },
  {
    id: "011",
    rarity: "EPIC",
    emoji: "🏍️",
    photoLabel: "[FOTO: MOTO MOTO]",
    photoFile: "19-motomoto.jpeg",
    title: "MOTO MOTO",
    lore: "mi novia sii me quedo sin trabajo.",
    exp: "+750 PTS",
    status: "AVENTURA",
  },
  {
    id: "012",
    rarity: "SPECIAL",
    emoji: "📱",
    photoLabel: "[FOTO: CARCASAS]",
    photoFile: "19-carcasas-celular.jpeg",
    title: "CARCASAS A JUEGO",
    lore: "unos forritos todos lindos.",
    exp: "+500 PTS",
    status: "EQUIPO",
  },
  {
    id: "013",
    rarity: "LEGENDARY",
    emoji: "💛",
    photoLabel: "[FOTO: FLORES AMARILLAS]",
    photoFile: "6-flores-amarillas.avif",
    title: "FLORES AMARILLAS",
    lore: "tus florecitas amarillas.",
    exp: "+9999 PTS",
    status: "PERFECTA",
  },
];

export interface MapNode {
  world: string;
  emoji: string;
  /** Nombre del archivo en `src/assets/album/`. Sin esto, la estación muestra el slot vacío. */
  photoFile?: string;
  /** Color de fondo del nodo en el mapa. */
  nodeClass: string;
  date: string;
  title: string;
  lore: string;
  /** El nivel actual se resalta y no muestra "CLEARED". */
  current?: boolean;
}

export const mapNodes: MapNode[] = [
  {
    world: "MUNDO 1-1",
    emoji: "✨",
    nodeClass: "bg-primary",
    photoFile: "21-nos-conocimos.jpeg",
    date: "[FECHA]",
    title: "NOS CONOCIMOS",
    lore: "cuando la vi era toda enana.",
  },
  {
    world: "MUNDO 1-2",
    emoji: "💖",
    nodeClass: "bg-secondary",
    photoFile: "7-noviecitos.avif",
    date: "[FECHA]",
    title: "NOVIECITOS",
    lore: "noviecitos muack.",
  },
  {
    world: "MUNDO 1-3",
    emoji: "🎓",
    nodeClass: "bg-[#a855f7]",
    photoFile: "5-grafuacion-campus.avif",
    date: "[FECHA]",
    title: "ME GRADUÉ",
    lore: "chamuslands.",
  },
  {
    world: "MUNDO 1-4",
    emoji: "🎁",
    nodeClass: "bg-tertiary",
    photoFile: "4-cumple-juan.avif",
    date: "[FECHA]",
    title: "MI CUMPLE",
    lore: "feliz cum para mi y mis regalitos.",
  },
  {
    world: "MUNDO 1-5",
    emoji: "🏞️",
    nodeClass: "bg-cyan",
    photoFile: "20-guatoque.jpeg",
    date: "[FECHA]",
    title: "GUATOQUE",
    lore: "guatoque re god.",
  },
  {
    world: "MUNDO 1-6",
    emoji: "🎂",
    nodeClass: "bg-secondary",
    photoFile: "3-tu-cumple.avif",
    date: "[FECHA]",
    title: "TU CUMPLE",
    lore: "Tu cumple con tu increible novio.",
  },
  {
    world: "MUNDO 1-7",
    emoji: "🌊",
    nodeClass: "bg-neon",
    photoFile: "2-playa.avif",
    date: "[FECHA]",
    title: "LA PLAYA",
    lore: "nuestro primer viajecito.",
  },
  {
    world: "MUNDO 1-8",
    emoji: "🏔️",
    nodeClass: "bg-[#a855f7]",
    photoFile: "1-zapatoca.avif",
    date: "[FECHA]",
    title: "ZAPATOCA",
    lore: "zapatoca god, la cueva del indio ajksdasj, barichara zzZZzZzz.",
  },
  {
    world: "★ HOY ★",
    emoji: "🏰",
    nodeClass: "bg-tertiary",
    photoFile: "8-ahora.jpeg",
    date: "[FECHA]",
    title: "AHORA",
    lore: "El ahora con mi noviecita.",
    current: true,
  },
];

export interface TriviaQuestion {
  question: string;
  options: [string, string, string, string];
  /** Índice 0-3 de la opción correcta. */
  correct: 0 | 1 | 2 | 3;
  comment: string;
}

export const triviaQuestions: TriviaQuestion[] = [
  {
    question: "¿Si tuviera que elegir una bebida cual elegiria?",
    options: [
      "Agua",
      "Coca-Cola full azucar",
      "jugo de guanabana",
      "jugo hit",
    ],
    correct: 3,
    comment: "Jugito god.",
  },
  {
    question: "¿Quien dijo la frase poetica 'Las papas locas son papas normales'?",
    options: [
      "Pedro nel",
      "Abelardo",
      "Juan Contreras",
      "Paco",
    ],
    correct: 2,
    comment: "Un desentendido por la sociedad.",
  },
  {
    question: "¿Que es un Sistema Tipo SAS?",
    options: [
      "Es el backend y el frontend de un sistema de almacenamiento en la nube.",
      "Son los aplicativos hechos para manejar diversos clientes, cada uno con sus configuraciones lo que hace que se evite la creacion de proyectos para cada cliente, lo que ahorra tiempo y recursos.",
      "Un sistema de almacenamiento en la nube que permite a los usuarios acceder a sus archivos desde cualquier lugar y dispositivo.",
      "Es una aplicacion mobile que permite a los usuarios acceder a servicios de almacenamiento en la nube y sincronización de archivos de manera segura y eficiente.",
    ],
    correct: 1,
    comment: "¡Se lo he explicado miles de veces y siempre se duerme!",
  },
];

export const finale = {
  /** Nombre del archivo dentro de `src/assets/video/`. */
  videoFile: "video-01.mp4",
  /**
   * Proporción real del video, para que el marco no lo recorte.
   * El actual es vertical (478x850). Si cambiás el archivo, actualizá esto.
   */
  videoAspect: "478 / 850",
  dedicationTitle: `Para ${player.nameSoft}, la dueña de mi corazón y de mi Bancolombia:`,
  dedication: [
      "Gracias por acompa;arme y guiarme estos dos ultimos años, por enseñarme a ser mejor persona y por hacerme sentir amado y por entrenar mi paciencia hasta niveles extraordinarios.",
      "Gracias por apoyarme en mis metas y por hacerme reír con tus chistes rancios y tus publicaciones de facebook y por darme confianza de que no estoy haciendo las cosas mal.",
  ],
  closing: "Te amo mi amor con todo mi corazon!",
  signature: "CON TODO MI AMOR, SIEMPRE.",
} as const;
