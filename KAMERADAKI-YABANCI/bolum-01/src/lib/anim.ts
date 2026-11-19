import { Easing, interpolate, random } from "remotion";
import { noise2D } from "@remotion/noise";
import { FPS } from "../config";

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const smooth = Easing.bezier(0.45, 0, 0.25, 1); // sinematik yumuşak hızlanma/yavaşlama
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeIn = Easing.bezier(0.55, 0, 1, 0.45);

/** Saniye cinsinden [a,b] aralığında 0→1 yumuşak ilerleme. */
export const prog = (tSec: number, a: number, b: number, ease = smooth) =>
  interpolate(tSec, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

export type Key<T extends Record<string, number>> = { t: number } & T;

/** Anahtar kareler arasında (saniye) yumuşak geçişli değer. */
export function keys<T extends Record<string, number>>(tSec: number, ks: Key<T>[], ease = smooth): T {
  if (tSec <= ks[0].t) return strip(ks[0]);
  for (let i = 0; i < ks.length - 1; i++) {
    const a = ks[i];
    const b = ks[i + 1];
    if (tSec <= b.t) {
      const p = ease(clamp01((tSec - a.t) / Math.max(1e-6, b.t - a.t)));
      const out = {} as Record<string, number>;
      for (const k of Object.keys(a)) if (k !== "t") out[k] = (a as never as Record<string, number>)[k] + ((b as never as Record<string, number>)[k] - (a as never as Record<string, number>)[k]) * p;
      return out as T;
    }
  }
  return strip(ks[ks.length - 1]);
}
function strip<T extends Record<string, number>>(k: Key<T>): T {
  const { t: _t, ...rest } = k;
  return rest as unknown as T;
}

/** Elde kamera titremesi (px ve derece). amount 0 = sabit sehpa. */
export function handheld(frame: number, amount: number, seed = "hh") {
  const t = frame / FPS;
  const x = noise2D(seed + "x", t * 0.55, 0) * 9 + noise2D(seed + "x2", t * 2.1, 0) * 2.5;
  const y = noise2D(seed + "y", 0, t * 0.5) * 7 + noise2D(seed + "y2", 0, t * 1.9) * 2;
  const r = noise2D(seed + "r", t * 0.4, t * 0.3) * 0.35;
  return { x: x * amount, y: y * amount, r: r * amount };
}

/**
 * Doğal göz kırpma: karakter başına tohumlu, 2.4–5.2 sn aralıklarla, ~5 karelik kırpma.
 * Dönüş: 0 = açık, 1 = kapalı.
 */
export function blink(frame: number, seed: string, rate = 1): number {
  let t = 0.6 + random(seed + "start") * 1.5;
  let i = 0;
  const now = frame / FPS;
  while (t < now + 1) {
    const d = now - t;
    if (d >= 0 && d < 0.2) {
      // kapanış hızlı, açılış daha yavaş
      return d < 0.07 ? d / 0.07 : d < 0.1 ? 1 : 1 - (d - 0.1) / 0.1;
    }
    i++;
    const gap = (2.4 + random(seed + i) * 2.8) / rate;
    // ara sıra çift kırpma
    t += random(seed + "d" + i) < 0.15 ? 0.32 : gap;
    if (i > 400) break;
  }
  return 0;
}

/** Nefes: 0..1 dalga. rate = dakikadaki nefes / 15 (korku ile artar). */
export const breath = (frame: number, rate = 1, phase = 0) =>
  0.5 + 0.5 * Math.sin(((frame / FPS) * rate * 2 * Math.PI) / 4 + phase);

/** Korku titremesi (küçük, yüksek frekanslı). */
export const tremble = (frame: number, amount: number, seed: string) => ({
  x: noise2D(seed + "tx", frame * 0.35, 0) * 2.2 * amount,
  y: noise2D(seed + "ty", 0, frame * 0.35) * 1.6 * amount,
});

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
