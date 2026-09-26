/**
 * Contenido de la página. Todo está quemado acá a propósito:
 * es el único archivo a tocar cuando lleguen los datos reales.
 */

export const player = {
  /** Nombre de la cumpleañera. Aparece en el HUD, el título y la dedicatoria. */
  name: "MAYRA",
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
  /** Marco de la foto: reemplazar `photo` por la ruta real en /public. */
  photoLabel: string;
  photo?: string;
  title: string;
  lore: string;
  exp: string;
  status: string;
}

export const albumItems: AlbumItem[] = [
  {
    id: "001",
    rarity: "SSS",
    emoji: "☕",
    photoLabel: "[FOTO 1: PRIMERA CITA]",
    title: "EL DÍA QUE EMPEZÓ TODO",
    lore: "Los nervios más hermosos del mundo, un café compartido y risas interminables.",
    exp: "+500 PTS",
    status: "INOLVIDABLE",
  },
  {
    id: "002",
    rarity: "EPIC",
    emoji: "✈️",
    photoLabel: "[FOTO 2: PRIMER VIAJE]",
    title: "EXPEDICIÓN JUNTOS",
    lore: "Perdidos en una ciudad nueva pero con la brújula perfecta en tus manos.",
    exp: "+750 PTS",
    status: "AVENTURA",
  },
  {
    id: "003",
    rarity: "RARE",
    emoji: "🎸",
    photoLabel: "[FOTO 3: NOCHE ÉPICA]",
    title: "BANDA SONORA",
    lore: "Cantando desafinados a todo pulmón en el show de nuestras vidas.",
    exp: "+600 PTS",
    status: "EN SINTONÍA",
  },
  {
    id: "004",
    rarity: "COMMON",
    emoji: "🍿",
    photoLabel: "[FOTO 4: DOMINGOS]",
    title: "REFUGIO CÁLIDO",
    lore: "Cero planes, mil abrazos, pizza fría y tu cabeza apoyada en mi hombro.",
    exp: "+450 PTS",
    status: "HOGAR",
  },
  {
    id: "005",
    rarity: "SPECIAL",
    emoji: "🍝",
    photoLabel: "[FOTO 5: RISAS]",
    title: "COCINEROS AMATEUR",
    lore: "Esa receta que salió desastrosa pero terminó siendo la cena más divertida.",
    exp: "+550 PTS",
    status: "TENTADAS",
  },
  {
    id: "006",
    rarity: "LEGENDARY",
    emoji: "👑",
    photoLabel: "[FOTO 6: TU SONRISA]",
    title: "MI JUGADORA FAVORITA",
    lore: "Esa foto espontánea donde tenés la sonrisa más radiante de todo el mapa.",
    exp: "+9999 PTS",
    status: "PERFECTA",
  },
];

export interface MapNode {
  world: string;
  emoji: string;
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
    emoji: "🌱",
    nodeClass: "bg-primary",
    date: "[HITO 1 - FECHA]",
    title: "EL COMIENZO",
    lore: "El primer 'hola' y la chispa que encendió esta aventura.",
  },
  {
    world: "MUNDO 1-2",
    emoji: "💖",
    nodeClass: "bg-secondary",
    date: "[HITO 2 - FECHA]",
    title: "OFICIALMENTE NOVIOS",
    lore: "El beso bajo la lluvia y la decisión más hermosa: caminar a la par.",
  },
  {
    world: "MUNDO 1-3",
    emoji: "🗝️",
    nodeClass: "bg-[#a855f7]",
    date: "[HITO 3 - FECHA]",
    title: "NUESTRA LLAVE",
    lore: "Armando juntos un espacio que se siente 100% como nuestro hogar.",
  },
  {
    world: "★ HOY ★",
    emoji: "🏰",
    nodeClass: "bg-tertiary",
    date: "[HITO 4 - FECHA]",
    title: "TU CUMPLEAÑOS",
    lore: "Celebrando un año más de tu vida y todo el futuro por delante.",
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
    question: "¿En qué lugar tuvimos nuestra primera cita inolvidable?",
    options: [
      "En esa cafetería pequeña que nos encantó",
      "En el cine mirando una peli de terror",
      "Caminando por el parque con helado",
      "En una pizzería de trasnoche",
    ],
    correct: 0,
    comment: "¡Exacto! Pedimos ese café y nos quedamos charlando horas.",
  },
  {
    question: "¿Cuál es mi comida favorita que siempre me hace sonreír?",
    options: [
      "Hamburguesa con mil salsas",
      "Las pastas caseras que hacemos juntos",
      "Sushi los fines de semana",
      "Pizza fría del día siguiente",
    ],
    correct: 1,
    comment: "¡Sos una genia! Las pastas compartidas son insuperables.",
  },
  {
    question: "¿Qué es lo primero que pensé cuando te vi por primera vez?",
    options: [
      "'Ojalá le caiga bien mi remera'",
      "'Tiene la sonrisa más hermosa que vi en mi vida'",
      "'Qué nervios, no sé qué decir'",
      "'Definitivamente esta chica es de otro planeta'",
    ],
    correct: 1,
    comment: "¡Totalmente! Quedé hipnotizado con tu sonrisa desde el segundo cero.",
  },
  {
    question: "¿Cuál es nuestro 'meme' o chiste interno favorito?",
    options: [
      "Esa voz rara que hacemos para quejarnos",
      "El baile ridículo cuando estamos felices",
      "El apodo secreto que solo nosotros sabemos",
      "¡Todas las anteriores son súper nuestras!",
    ],
    correct: 3,
    comment: "¡100% real! Tenemos un diccionario propio de locuras.",
  },
  {
    question: "¿Quién ama más a quién en esta relación?",
    options: [
      "Empate técnico legendario",
      "Yo a vos, por goleada",
      "Vos a mí, sin dudas",
      "Un amor mutuo e infinito nivel 99",
    ],
    correct: 3,
    comment: "¡Respuesta perfecta! Amor infinito de 16-bit.",
  },
];

export const finale = {
  /** Poné el archivo en /public/video.mp4 (o cambiá la ruta). */
  videoSrc: "/video.mp4",
  videoLabel: "[VIDEO.MP4]",
  dedicationTitle: `Para ${player.name}, la dueña de mi corazón:`,
  dedication: [
    "[MENSAJE / DEDICATORIA FINAL: Podés escribir acá tu carta de amor completa. " +
      "Gracias por cada partida compartida, por cada risa, por ser mi compañera incondicional " +
      "en las buenas y en las malas. Sos la mejor casualidad que me pasó en la vida y el regalo " +
      "más lindo que tengo todos los días.]",
  ],
  closing: "Te amo hasta el último nivel del universo. ¡Feliz cumpleaños!",
  signature: "CON TODO MI AMOR, SIEMPRE.",
} as const;
