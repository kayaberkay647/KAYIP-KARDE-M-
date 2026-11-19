// Türkçe dudak senkronu.
// 1) ElevenLabs "with-timestamps" hizalaması varsa her harfin gerçek başlangıç/bitiş zamanı kullanılır.
// 2) Yoksa metin, ses dosyasının gerçek süresine (yoksa tahmini süreye) ağırlıklı olarak yayılır.
// Ağız şekli (viseme) + açıklık (0..1) döner; rig bu ikisini katmanlara çevirir.
import type { DialogueLine } from "../data/script";
import { alignmentOf, durationOf, voicePath, type Alignment } from "./assets";

export type Viseme = "X" | "MBP" | "A" | "E" | "I" | "O" | "U" | "FV" | "C";
export const VISEMES: Viseme[] = ["X", "MBP", "A", "E", "I", "O", "U", "FV", "C"];

const OPEN: Record<Viseme, number> = { X: 0, MBP: 0, A: 1, E: 0.75, I: 0.45, O: 0.8, U: 0.5, FV: 0.2, C: 0.35 };

export function charToViseme(ch: string): Viseme {
  const c = ch.toLocaleLowerCase("tr-TR");
  if ("aâ".includes(c)) return "A";
  if ("e".includes(c)) return "E";
  if ("ıiî".includes(c)) return "I";
  if ("oö".includes(c)) return "O";
  if ("uüû".includes(c)) return "U";
  if ("mbp".includes(c)) return "MBP";
  if ("fv".includes(c)) return "FV";
  if (/[a-zçğşı]/.test(c)) return "C";
  return "X";
}

const PAUSE_WEIGHT: Record<string, number> = { ",": 2.4, ".": 3, "!": 3, "?": 3, "…": 5, " ": 0.45 };

/** Hizalama yoksa: harf başına ağırlıklı yapay zaman çizelgesi. */
function synthAlignment(text: string, duration: number): Alignment {
  const t = text.replace(/\.\.\./g, "…");
  const chars = [...t];
  const w = chars.map((c) => {
    if (c in PAUSE_WEIGHT) return PAUSE_WEIGHT[c];
    const v = charToViseme(c);
    return v === "X" ? 0.3 : "AEIOU".includes(v) ? 1.15 : 0.7;
  });
  // sondaki noktalama sessizliği süreye dahil etme
  let lastSpoken = chars.length - 1;
  while (lastSpoken > 0 && charToViseme(chars[lastSpoken]) === "X") lastSpoken--;
  const total = w.slice(0, lastSpoken + 1).reduce((a, b) => a + b, 0);
  const starts: number[] = [];
  const ends: number[] = [];
  let acc = 0;
  chars.forEach((_, i) => {
    starts.push((acc / total) * duration);
    acc += i <= lastSpoken ? w[i] : 0;
    ends.push((acc / total) * duration);
  });
  return { chars, starts, ends };
}

/** Replik sesinin gerçek ya da tahmini süresi (sn). */
export function lineDuration(line: DialogueLine): number {
  const real = durationOf(voicePath(line.id));
  if (real) return real;
  const letters = line.text.replace(/[^\p{L}]/gu, "").length;
  const pauses = (line.text.match(/\.\.\.|…/g) || []).length * 0.45 + (line.text.match(/[,.!?]/g) || []).length * 0.12;
  return Math.min(line.window, letters / 14.5 + pauses + 0.2);
}

const cache = new Map<string, Alignment>();
function getAlignment(line: DialogueLine): Alignment {
  const real = alignmentOf(line.id);
  if (real) return real;
  const key = line.id;
  if (!cache.has(key)) cache.set(key, synthAlignment(line.text, lineDuration(line)));
  return cache.get(key)!;
}

export type MouthState = { viseme: Viseme; open: number; speaking: boolean };

/** Replik başından itibaren geçen süre (sn) için ağız durumu. */
export function mouthAt(line: DialogueLine, tSec: number): MouthState {
  const dur = lineDuration(line);
  if (tSec < 0 || tSec > dur + 0.05) return { viseme: "X", open: 0, speaking: false };
  const al = getAlignment(line);
  let idx = -1;
  for (let i = 0; i < al.chars.length; i++) {
    if (tSec >= al.starts[i] && tSec < al.ends[i]) {
      idx = i;
      break;
    }
  }
  if (idx < 0) return { viseme: "X", open: 0, speaking: true };
  const v = charToViseme(al.chars[idx]);
  // harf içinde açıl-kapan eğrisi (yumuşak koartikülasyon)
  const span = Math.max(0.001, al.ends[idx] - al.starts[idx]);
  const p = (tSec - al.starts[idx]) / span;
  const env = Math.sin(Math.PI * Math.min(1, Math.max(0, p))) * 0.35 + 0.65;
  return { viseme: v, open: OPEN[v] * env, speaking: true };
}
