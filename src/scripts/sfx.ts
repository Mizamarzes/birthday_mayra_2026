/**
 * Sintetizador 8-bit con Web Audio API. Cero dependencias.
 * El AudioContext se crea perezosamente en la primera interacción del usuario,
 * que es lo que exigen los navegadores para permitir audio.
 */

export type SoundName = "select" | "start" | "correct" | "wrong" | "win";

let audioCtx: AudioContext | null = null;
let muted = false;

function getAudioContext(): AudioContext {
  audioCtx ??= new AudioContext();
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

export function isMuted(): boolean {
  return muted;
}

export function toggleMute(): boolean {
  muted = !muted;
  return muted;
}

/** Secuencia de frecuencias sobre un solo oscilador. */
function ramp(
  ctx: AudioContext,
  type: OscillatorType,
  steps: readonly [number, number][],
  gainValue: number,
  duration: number,
) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  for (const [freq, at] of steps) osc.frequency.setValueAtTime(freq, now + at);
  gain.gain.setValueAtTime(gainValue, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

/** Arpegio: un oscilador por nota. */
function arpeggio(ctx: AudioContext, notes: readonly number[], step: number, gainValue: number) {
  const now = ctx.currentTime;
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    const at = now + i * step;
    gain.gain.setValueAtTime(gainValue, at);
    gain.gain.exponentialRampToValueAtTime(0.001, at + step * 1.6);
    osc.start(at);
    osc.stop(at + step * 1.8);
  });
}

export function playSound(name: SoundName): void {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    switch (name) {
      case "select":
        ramp(ctx, "square", [[440, 0], [880, 0.05]], 0.12, 0.15);
        break;
      case "start":
        ramp(
          ctx,
          "square",
          [[330, 0], [392, 0.08], [659, 0.16], [523, 0.24], [587, 0.32], [783, 0.4]],
          0.15,
          0.6,
        );
        break;
      case "correct":
        ramp(ctx, "square", [[523.25, 0], [659.25, 0.09], [783.99, 0.18], [1046.5, 0.27]], 0.16, 0.45);
        break;
      case "wrong":
        ramp(ctx, "sawtooth", [[180, 0], [110, 0.12]], 0.2, 0.35);
        break;
      case "win":
        arpeggio(ctx, [440, 440, 440, 554, 659, 880], 0.11, 0.15);
        break;
    }
  } catch {
    // Si el contexto está bloqueado, la página sigue funcionando en silencio.
  }
}

/**
 * Conecta cualquier elemento con `data-sfx="<nombre>"` para que suene al hacer clic.
 * Reemplaza los `onclick="playSound(...)"` inline del diseño original.
 */
export function bindSfxTriggers(root: ParentNode = document): void {
  for (const el of root.querySelectorAll<HTMLElement>("[data-sfx]")) {
    const name = el.dataset.sfx as SoundName | undefined;
    if (!name) continue;
    el.addEventListener("click", () => playSound(name));
  }
}
