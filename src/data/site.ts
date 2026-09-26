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
    "Una misión legendaria dedicada a la jugadora más especial del mundo. " +
    "Completá los niveles, desbloqueá nuestros recuerdos y superá la trivia para recibir tu regalo final.",
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
    lore: "Lista para arrancar. Cualquier destino sirve si vas atrás.",
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
    lore: "Función privada: vos, yo y cero atención a la pantalla.",
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
    lore: "Con el agua de fondo y el mundo entero en pausa.",
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
    lore: "Nos tomamos el disfraz demasiado en serio, como corresponde.",
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
    lore: "Toda la ciudad abajo y yo mirando para otro lado.",
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
    lore: "El nivel de cursilería que solo nos permitimos en casa.",
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
    lore: "Ni idea de qué hablamos esa noche, pero nos reímos muchísimo.",
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
    lore: "Una banca, un columpio y todo el día por delante.",
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
    lore: "Probarse todos los sombreros del pasillo cuenta como cita.",
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
    lore: "Caminar sin rumbo, que es nuestra forma favorita de hablar.",
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
    lore: "Cascos puestos y esa sonrisa tuya antes de arrancar.",
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
    lore: "Detalle chiquito que nos delata en cada foto.",
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
    lore: "Tu sonrisa con las flores en la mano. Esta le gana a todas.",
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
    lore: "El primer 'hola' y la chispa que encendió todo esto.",
  },
  {
    world: "MUNDO 1-2",
    emoji: "💖",
    nodeClass: "bg-secondary",
    photoFile: "7-noviecitos.avif",
    date: "[FECHA]",
    title: "NOVIECITOS",
    lore: "Se acabó el disimulo: oficialmente juntos.",
  },
  {
    world: "MUNDO 1-3",
    emoji: "🎓",
    nodeClass: "bg-[#a855f7]",
    photoFile: "5-grafuacion-campus.avif",
    date: "[FECHA]",
    title: "ME GRADUÉ",
    lore: "Un logro tachado de la lista, con vos ahí para verlo.",
  },
  {
    world: "MUNDO 1-4",
    emoji: "🎁",
    nodeClass: "bg-tertiary",
    photoFile: "4-cumple-juan.avif",
    date: "[FECHA]",
    title: "MI CUMPLE",
    lore: "Mi cumpleaños y todo lo que me preparaste.",
  },
  {
    world: "MUNDO 1-5",
    emoji: "🏞️",
    nodeClass: "bg-cyan",
    photoFile: "20-guatoque.jpeg",
    date: "[FECHA]",
    title: "GUATOQUE",
    lore: "Salir de la rutina y perdernos un rato juntos.",
  },
  {
    world: "MUNDO 1-6",
    emoji: "🎂",
    nodeClass: "bg-secondary",
    photoFile: "3-tu-cumple.avif",
    date: "[FECHA]",
    title: "TU CUMPLE",
    lore: "Tu día, y yo mirándote como siempre.",
  },
  {
    world: "MUNDO 1-7",
    emoji: "🌊",
    nodeClass: "bg-neon",
    photoFile: "2-playa.avif",
    date: "[FECHA]",
    title: "LA PLAYA",
    lore: "Sol, agua y esa sonrisa que aparece lejos de todo.",
  },
  {
    world: "MUNDO 1-8",
    emoji: "🏔️",
    nodeClass: "bg-[#a855f7]",
    photoFile: "1-zapatoca.avif",
    date: "[FECHA]",
    title: "ZAPATOCA",
    lore: "Cascos puestos y cero miedo. Otro viaje para la colección.",
  },
  {
    world: "★ HOY ★",
    emoji: "🏰",
    nodeClass: "bg-tertiary",
    photoFile: "8-ahora.jpeg",
    date: "[FECHA]",
    title: "AHORA",
    lore: "Acá estamos, celebrando un año más tuyo y todo lo que falta.",
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
  dedicationTitle: `Para ${player.nameSoft}, la dueña de mi corazón:`,
  dedication: [
    "[MENSAJE / DEDICATORIA FINAL: Podés escribir acá tu carta de amor completa. " +
      "Gracias por cada partida compartida, por cada risa, por ser mi compañera incondicional " +
      "en las buenas y en las malas. Sos la mejor casualidad que me pasó en la vida y el regalo " +
      "más lindo que tengo todos los días.]",
  ],
  closing: "Te amo hasta el último nivel del universo. ¡Feliz cumpleaños!",
  signature: "CON TODO MI AMOR, SIEMPRE.",
} as const;
