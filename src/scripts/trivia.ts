/**
 * Lógica del minijuego de trivia.
 * Reemplaza las funciones globales + `onclick` inline del diseño original:
 * acá todo se engancha por id/atributo una vez que el DOM está listo.
 */
import { player, triviaQuestions } from "../data/site";
import { playSound } from "./sfx";

const TOTAL_LIVES = 3;
const POINTS_PER_HIT = 100;
const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

const el = <T extends HTMLElement>(id: string): T | null => document.getElementById(id) as T | null;

export function initTrivia(): void {
  const questionText = el("question-text");
  const questionCounter = el("question-counter");
  const optionsGrid = el("options-grid");
  const gameScore = el("game-score");
  const hudScore = el("hud-score");
  const feedback = el("feedback-banner");
  const gameOverScreen = el("game-over-screen");
  const victoryScreen = el("victory-screen");

  // Si la sección no está en esta página, no hay nada que inicializar.
  if (!questionText || !questionCounter || !optionsGrid || !gameScore || !feedback) return;
  if (!gameOverScreen || !victoryScreen) return;

  let currentIdx = 0;
  let lives = TOTAL_LIVES;
  let score = 0;
  let answerLocked = false;
  let feedbackTimer: number | undefined;

  function renderHearts() {
    for (let i = 1; i <= TOTAL_LIVES; i++) {
      const heart = el<HTMLElement>(`heart-${i}`);
      if (!heart) continue;
      const alive = i <= lives;
      heart.setAttribute("fill", alive ? "#ff2a55" : "#3d162a");
      heart.style.opacity = alive ? "1" : "0.4";
      heart.style.filter = alive ? "drop-shadow(0 0 4px #ff2a55)" : "none";
    }
  }

  function showFeedback(text: string, bg: string, fg: string) {
    feedback!.textContent = text;
    feedback!.className =
      "absolute left-1/2 top-4 z-30 -translate-x-1/2 animate-bounce border-4 border-black px-6 py-2 " +
      `font-title text-xs tracking-wider shadow-[4px_4px_0_#000] sm:text-sm ${bg} ${fg}`;
    feedback!.hidden = false;
    clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => {
      feedback!.hidden = true;
    }, 1000);
  }

  function showVictory() {
    playSound("win");
    victoryScreen!.hidden = false;
  }

  function loadQuestion(idx: number) {
    if (idx >= triviaQuestions.length) {
      showVictory();
      return;
    }

    answerLocked = false;
    const q = triviaQuestions[idx]!;
    questionCounter!.textContent = `PREGUNTA ${idx + 1} DE ${triviaQuestions.length}`;
    questionText!.textContent = q.question;

    optionsGrid!.replaceChildren();
    q.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "group flex items-center gap-3 border-4 border-black bg-panel p-3 text-left font-ui " +
        "text-xs text-white shadow-[4px_4px_0_#000] transition-all hover:bg-edge sm:p-4 sm:text-sm";

      const letter = document.createElement("span");
      letter.className =
        "flex h-7 w-7 shrink-0 items-center justify-center border-2 border-tertiary bg-black " +
        "font-title text-xs text-tertiary group-hover:bg-tertiary group-hover:text-black";
      letter.textContent = OPTION_LETTERS[index]!;

      const label = document.createElement("span");
      label.className = "grow";
      label.textContent = option;

      btn.append(letter, label);
      btn.addEventListener("click", () => selectAnswer(index, btn));
      optionsGrid!.append(btn);
    });
  }

  function selectAnswer(chosen: number, btn: HTMLButtonElement) {
    if (answerLocked) return;
    answerLocked = true;

    const q = triviaQuestions[currentIdx]!;

    if (chosen === q.correct) {
      playSound("correct");
      score += POINTS_PER_HIT;
      gameScore!.textContent = String(score);
      if (hudScore) hudScore.textContent = String(player.baseScore + score);

      gameScore!.classList.add("animate-score-pop");
      setTimeout(() => gameScore!.classList.remove("animate-score-pop"), 500);

      btn.classList.remove("bg-panel");
      btn.classList.add("bg-neon", "text-black");
      showFeedback(`+${POINTS_PER_HIT} PUNTOS ★ ¡CORRECTO!`, "bg-neon", "text-black");
    } else {
      playSound("wrong");
      lives--;
      renderHearts();

      btn.classList.remove("bg-panel");
      btn.classList.add("bg-primary", "text-white");
      showFeedback("-1 CORAZÓN ★ ¡OUCH!", "bg-primary", "text-white");

      if (lives <= 0) {
        setTimeout(() => {
          gameOverScreen!.hidden = false;
        }, 800);
        return;
      }
    }

    setTimeout(() => {
      currentIdx++;
      loadQuestion(currentIdx);
    }, 1200);
  }

  function restart() {
    lives = TOTAL_LIVES;
    score = 0;
    currentIdx = 0;
    gameScore!.textContent = "0";
    if (hudScore) hudScore.textContent = String(player.baseScore);
    renderHearts();
    gameOverScreen!.hidden = true;
    victoryScreen!.hidden = true;
    loadQuestion(0);
    playSound("start");
  }

  el<HTMLButtonElement>("btn-retry")?.addEventListener("click", restart);

  el<HTMLButtonElement>("btn-skip")?.addEventListener("click", () => {
    gameOverScreen.hidden = true;
    showVictory();
  });

  el<HTMLAnchorElement>("btn-unlock")?.addEventListener("click", () => {
    playSound("correct");
  });

  // "Jugar de nuevo" desde la pantalla final: reinicia y vuelve arriba.
  el<HTMLButtonElement>("btn-replay")?.addEventListener("click", () => {
    restart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  renderHearts();
  loadQuestion(0);
}
