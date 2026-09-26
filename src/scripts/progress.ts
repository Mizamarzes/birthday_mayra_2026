/**
 * Progreso de la partida, persistido en localStorage.
 * Se guarda qué pantalla está activa y qué cosas ya inspeccionó,
 * para que recargar la página no la haga empezar de nuevo.
 */
import { stages, type StageId } from "../data/site";

const STORAGE_KEY = "love-quest:progress:v1";
const STAGE_IDS: readonly string[] = stages.map((s) => s.id);

export interface Progress {
  screen: StageId;
  /** Ids de los ítems del álbum ya inspeccionados. */
  album: string[];
  /** Índices de los hitos del mapa ya inspeccionados. */
  map: string[];
  triviaWon: boolean;
}

function emptyProgress(): Progress {
  return { screen: "start", album: [], map: [], triviaWon: false };
}

/** Acepta solo strings; descarta cualquier cosa rara que haya quedado guardada. */
function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((v): v is string => typeof v === "string"))];
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return emptyProgress();

    const data = parsed as Record<string, unknown>;
    const screen = typeof data.screen === "string" && STAGE_IDS.includes(data.screen)
      ? (data.screen as StageId)
      : "start";

    return {
      screen,
      album: toStringList(data.album),
      map: toStringList(data.map),
      triviaWon: data.triviaWon === true,
    };
  } catch {
    // Modo incógnito o storage bloqueado: la partida funciona igual, sin memoria.
    return emptyProgress();
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Sin persistencia, pero la sesión actual sigue andando.
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nada que limpiar.
  }
}
