/**
 * Controlador de pantallas.
 *
 * La página es un recorrido de 5 pantallas y solo una está visible a la vez.
 * Cada una tiene una condición para habilitar su botón "CONTINUAR":
 *   start  → libre
 *   album  → inspeccionar los 6 ítems
 *   map    → inspeccionar los 4 hitos
 *   trivia → ganar la trivia (o usar el modo trampa)
 *   final  → última
 * El progreso se persiste, así que recargar devuelve a donde estaba.
 */
import { albumItems, mapNodes, stages, type StageId } from "../data/site";
import { playSound } from "./sfx";
import { initTrivia, type TriviaController } from "./trivia";
import { clearProgress, loadProgress, saveProgress, type Progress } from "./progress";

const ORDER: StageId[] = stages.map((s) => s.id);
const TRANSITION_MS = 1100;

/** Cuántas cosas hay que inspeccionar en cada pantalla con contador. */
const INSPECT_TOTALS = {
  album: albumItems.length,
  map: mapNodes.length,
} as const;

type InspectKind = keyof typeof INSPECT_TOTALS;

export function initScreens(): void {
  const cabinet = document.querySelector<HTMLElement>("[data-cabinet]");
  const sections = new Map<StageId, HTMLElement>();
  for (const id of ORDER) {
    const el = document.querySelector<HTMLElement>(`[data-screen="${id}"]`);
    if (el) sections.set(id, el);
  }
  if (sections.size === 0) return;

  const transition = document.querySelector<HTMLElement>("[data-transition]");
  const transitionNext = document.querySelector<HTMLElement>("[data-transition-next]");
  const transitionBar = document.querySelector<HTMLElement>("[data-transition-bar]");
  const stageLabel = document.querySelector<HTMLElement>("[data-stage-label]");

  let progress: Progress = loadProgress();
  let busy = false;

  const trivia: TriviaController | null = initTrivia({
    onWin: () => {
      if (progress.triviaWon) return;
      progress.triviaWon = true;
      persist();
      render();
    },
  });

  function persist() {
    saveProgress(progress);
  }

  function seen(kind: InspectKind): string[] {
    return kind === "album" ? progress.album : progress.map;
  }

  /** ¿Se cumplió la condición para salir de esta pantalla? */
  function isCleared(id: StageId): boolean {
    switch (id) {
      case "album":
      case "map":
        return seen(id).length >= INSPECT_TOTALS[id];
      case "trivia":
        return progress.triviaWon;
      default:
        return true;
    }
  }

  /** La pantalla más lejana permitida: avanza mientras las anteriores estén superadas. */
  function maxReachableIndex(): number {
    let i = 0;
    while (i < ORDER.length - 1 && isCleared(ORDER[i]!)) i++;
    return i;
  }

  function render() {
    const activeIndex = ORDER.indexOf(progress.screen);
    const reachable = maxReachableIndex();

    for (const [id, el] of sections) el.hidden = id !== progress.screen;

    // Indicador de etapa: un punto por pantalla, clickeable si ya se llegó.
    document.querySelectorAll<HTMLButtonElement>("[data-stage]").forEach((btn) => {
      const id = btn.dataset.stage as StageId;
      const index = ORDER.indexOf(id);
      const unlocked = index <= reachable;
      btn.disabled = !unlocked;
      btn.setAttribute("aria-current", id === progress.screen ? "step" : "false");
      btn.dataset.state = id === progress.screen ? "active" : isCleared(id) && index < reachable ? "cleared" : unlocked ? "open" : "locked";
    });

    if (stageLabel) {
      const stage = stages[activeIndex];
      stageLabel.textContent = `PANTALLA ${activeIndex + 1} DE ${ORDER.length} · ${stage?.label ?? ""}`;
    }

    // Contadores e hints de las pantallas que exigen inspeccionar.
    for (const kind of Object.keys(INSPECT_TOTALS) as InspectKind[]) {
      const total = INSPECT_TOTALS[kind];
      const count = seen(kind).length;
      const remaining = total - count;

      document.querySelectorAll<HTMLElement>(`[data-counter="${kind}"]`).forEach((n) => {
        n.textContent = String(count);
      });
      document.querySelectorAll<HTMLElement>(`[data-hint="${kind}"]`).forEach((n) => {
        n.textContent =
          remaining > 0
            ? `Te faltan ${remaining} por descubrir`
            : "★ ¡Todo descubierto! Ya podés continuar";
      });
    }

    // Cubiertas de inspección: se ocultan cuando ya se tocó ese ítem.
    document.querySelectorAll<HTMLElement>("[data-inspect]").forEach((cover) => {
      const kind = cover.dataset.inspect as InspectKind;
      const id = cover.dataset.inspectId ?? "";
      cover.hidden = seen(kind).includes(id);
    });
    document.querySelectorAll<HTMLElement>("[data-inspect-mark]").forEach((mark) => {
      const kind = mark.dataset.inspectMark as InspectKind;
      const id = mark.dataset.inspectId ?? "";
      mark.hidden = !seen(kind).includes(id);
    });

    // Botones de continuar.
    document.querySelectorAll<HTMLButtonElement>("[data-continue]").forEach((btn) => {
      const id = btn.dataset.continue as StageId;
      const ready = isCleared(id);
      btn.disabled = !ready;
      btn.classList.toggle("animate-pixel-blink", ready && id !== "start");
    });
  }

  function markInspected(kind: InspectKind, id: string) {
    const list = seen(kind);
    if (list.includes(id)) return;

    list.push(id);
    const complete = list.length >= INSPECT_TOTALS[kind];
    persist();
    render();
    playSound(complete ? "correct" : "select");
  }

  async function goTo(next: StageId, { celebrate = false } = {}) {
    if (busy || next === progress.screen) return;
    busy = true;

    if (celebrate && transition) {
      if (transitionNext) {
        const stage = stages[ORDER.indexOf(next)];
        transitionNext.textContent = `CARGANDO: ${stage?.label ?? ""}`;
      }
      transition.hidden = false;
      if (transitionBar) {
        transitionBar.style.width = "0%";
        // Un frame de margen para que el ancho inicial se aplique antes de animar.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            transitionBar.style.width = "100%";
          });
        });
      }
      playSound("start");
      await new Promise((resolve) => setTimeout(resolve, TRANSITION_MS));
      transition.hidden = true;
    }

    progress.screen = next;
    persist();
    render();

    // Al entrar a la trivia: victoria si ya la ganó, partida limpia si no.
    if (next === "trivia" && trivia) {
      if (progress.triviaWon) trivia.showVictory();
      else trivia.restart({ silent: true });
    }

    cabinet?.scrollIntoView({ block: "start", behavior: "smooth" });
    busy = false;
  }

  function resetAll() {
    clearProgress();
    progress = { screen: "start", album: [], map: [], triviaWon: false };
    persist();
    trivia?.restart({ silent: true });
    render();
    cabinet?.scrollIntoView({ block: "start", behavior: "smooth" });
    playSound("start");
  }

  // --- Enganches ---

  document.querySelectorAll<HTMLElement>("[data-inspect]").forEach((cover) => {
    cover.addEventListener("click", () => {
      const kind = cover.dataset.inspect as InspectKind;
      markInspected(kind, cover.dataset.inspectId ?? "");
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-continue]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.continue as StageId;
      if (!isCleared(id)) return;
      const next = ORDER[ORDER.indexOf(id) + 1];
      if (next) void goTo(next, { celebrate: true });
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-stage]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      void goTo(btn.dataset.stage as StageId);
    });
  });

  document.querySelectorAll<HTMLElement>("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      void goTo(btn.dataset.goto as StageId);
    });
  });

  // Reinicio en dos toques, para no borrar la partida por accidente.
  document.querySelectorAll<HTMLButtonElement>("[data-reset]").forEach((btn) => {
    const original = btn.textContent ?? "";
    let armed = false;
    let armedTimer: number | undefined;

    btn.addEventListener("click", () => {
      if (!armed) {
        armed = true;
        btn.textContent = "¿SEGURO? TOCÁ DE NUEVO";
        btn.classList.add("text-primary");
        playSound("select");
        armedTimer = window.setTimeout(() => {
          armed = false;
          btn.textContent = original;
          btn.classList.remove("text-primary");
        }, 4000);
        return;
      }

      clearTimeout(armedTimer);
      armed = false;
      btn.textContent = original;
      btn.classList.remove("text-primary");
      resetAll();
    });
  });

  // Nunca arrancar más adelante de lo que el progreso permite.
  const reachable = maxReachableIndex();
  if (ORDER.indexOf(progress.screen) > reachable) progress.screen = ORDER[reachable]!;

  if (progress.screen === "trivia" && trivia) {
    if (progress.triviaWon) trivia.showVictory();
    else trivia.restart({ silent: true });
  }

  render();
}
