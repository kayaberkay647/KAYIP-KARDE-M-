// ZAMAN ÇİZELGESİ ve VARLIK DOĞRULAMASI
//   npm run validate        → teknik kurallar (süre, kare, sahne, diyalog sırası/sığması, altyazı)
//   npm run validate:final  → + final render için gereken TÜM görsel ve ses dosyaları
import fs from "node:fs";
import { DURATION_FRAMES, DURATION_SECONDS, FPS, HEIGHT, SCENE_COUNT, WIDTH, f } from "../src/config";
import { ALL_LINES, ALL_SFX, AMBIENCE, BLACKOUT_AT, SCENES } from "../src/data/script";
import { SETS } from "../src/data/locations";
import { rigLayerPaths } from "../src/data/rig";
import { STATUS_FILE, flag } from "./lib";

const FINAL = flag("final");
const errors: string[] = [];
const warns: string[] = [];
const E = (m: string) => errors.push(m);
const W = (m: string) => warns.push(m);

const status = JSON.parse(fs.readFileSync(STATUS_FILE, "utf8")) as { present: string[]; durations: Record<string, number> };
const present = new Set(status.present);

// 1) Teknik sabitler
if (WIDTH !== 1080 || HEIGHT !== 1920) E(`Çözünürlük 1080x1920 olmalı (şu an ${WIDTH}x${HEIGHT})`);
if (FPS !== 30) E(`FPS 30 olmalı (şu an ${FPS})`);
if (DURATION_SECONDS !== 120 || DURATION_FRAMES !== 3600) E(`Süre 120 sn / 3600 kare olmalı (şu an ${DURATION_SECONDS} sn / ${DURATION_FRAMES} kare)`);
if (SCENES.length !== SCENE_COUNT || SCENE_COUNT !== 18) E(`Sahne sayısı 18 olmalı (şu an ${SCENES.length})`);

// 2) Sahneler: ardışık, boşluksuz, 0 → 120
SCENES.forEach((sc, i) => {
  if (sc.n !== i + 1) E(`Sahne numarası sırası bozuk: ${sc.n}`);
  const prevEnd = i === 0 ? 0 : SCENES[i - 1].end;
  if (sc.start !== prevEnd) E(`S${sc.n}: başlangıç ${sc.start} ≠ önceki sahne sonu ${prevEnd}`);
  if (sc.end <= sc.start) E(`S${sc.n}: süre sıfır/negatif`);
});
if (SCENES[SCENES.length - 1].end !== DURATION_SECONDS) E(`Son sahne ${DURATION_SECONDS}. saniyede bitmeli`);
const frameSum = SCENES.reduce((a, sc) => a + (f(sc.end) - f(sc.start)), 0);
if (frameSum !== DURATION_FRAMES) E(`Sahne kare toplamı ${frameSum} ≠ ${DURATION_FRAMES}`);

// 3) Diyaloglar
const durOf = (id: string) => status.durations[`audio/voice/${id}.mp3`];
const ids = new Set<string>();
ALL_LINES.forEach((l, i) => {
  if (ids.has(l.id)) E(`Yinelenen replik kimliği ${l.id}`);
  ids.add(l.id);
  const sc = SCENES.find((s) => l.at >= s.start && l.at < s.end);
  if (!sc || !l.id.includes(`_S${String(sc.n).padStart(2, "0")}_`)) E(`${l.id}: başlangıç ${l.at} sn kendi sahnesinin içinde değil`);
  const next = ALL_LINES[i + 1];
  if (next && next.at < l.at) E(`${l.id}: diyalog sırası bozuk`);
  const limit = Math.min(next ? next.at : Infinity, sc ? sc.end : Infinity, l.speaker === "yabanci" || sc?.n === 18 ? BLACKOUT_AT : Infinity);
  if (l.at + l.window > limit + 1e-6) E(`${l.id}: ayrılan pencere (${l.at}+${l.window}) ${limit} sn sınırını aşıyor`);
  const real = durOf(l.id);
  if (real !== undefined) {
    if (l.at + real > limit + 0.05) E(`${l.id}: ses ${real.toFixed(2)} sn — ${limit} sn sınırını ${(l.at + real - limit).toFixed(2)} sn aşıyor. Yeniden üret (speed ↑) veya hızlandır.`);
    else if (real > l.window) W(`${l.id}: ses ${real.toFixed(2)} sn > pencere ${l.window} sn (sınıra sığıyor)`);
  } else W(`${l.id}: ses dosyası yok — animatik tahmini süre kullanıyor`);
  // altyazı: en fazla 2 satır (~30 karakter/satır)
  const words = l.text.split(" ");
  let lines = 1;
  let cur = 0;
  for (const w of words) {
    if (cur + w.length + (cur ? 1 : 0) > 30) {
      lines++;
      cur = w.length;
    } else cur += w.length + (cur ? 1 : 0);
  }
  if (lines > 2) E(`${l.id}: altyazı 2 satırı aşıyor`);
});
const yab = ALL_LINES.filter((l) => l.speaker === "yabanci");
if (yab.length !== 1 || yab[0].at < 117 - 1e-6) E("Yabancı yalnızca finalde (01:57) tek replikle konuşmalı");

// 4) Final varlıkları
const need = (rel: string, what: string) => {
  if (!present.has(rel)) (FINAL ? E : W)(`Eksik ${what}: public/${rel}`);
};
if (FINAL) {
  ALL_LINES.forEach((l) => need(`audio/voice/${l.id}.mp3`, "replik sesi"));
  ALL_SFX.forEach((x) => need(`audio/sfx/${x.file}`, "efekt"));
  AMBIENCE.forEach((a) => need(`audio/amb/${a.file}`, "ortam sesi"));
  Object.values(SETS).forEach((st) => st.layers.filter((l) => l.required).forEach((l) => need(`assets/sets/${st.id}/${l.file}`, `set plakası (${st.id})`)));
  ["kerem", "defne"].forEach((c) => rigLayerPaths(c).forEach((p) => need(p, `karakter katmanı (${c})`)));
  need("assets/characters/yabanci/cctv_stand.png", "yabancı CCTV çizimi");
} else {
  const missingVoice = ALL_LINES.filter((l) => !present.has(`audio/voice/${l.id}.mp3`)).length;
  const missingPlates = Object.values(SETS).filter((st) => !present.has(`assets/sets/${st.id}/bg.png`)).length;
  if (missingVoice || missingPlates) W(`Animatik modu: ${missingVoice} replik sesi ve ${missingPlates} set plakası eksik → yer tutucular kullanılacak`);
}

console.log(`\nKAMERADAKİ YABANCI · 1. Bölüm · ${SCENES.length} sahne · ${DURATION_FRAMES} kare · ${ALL_LINES.length} replik · ${ALL_SFX.length} efekt`);
const shownWarns = FINAL ? warns : warns.filter((w) => !w.includes("ses dosyası yok"));
if (shownWarns.length) console.log("\nUyarılar:\n" + shownWarns.map((w) => "  ⚠ " + w).join("\n"));
if (errors.length) {
  console.error("\nHATALAR:\n" + errors.map((e) => "  ✖ " + e).join("\n"));
  process.exit(1);
}
console.log(`\n✔ Doğrulama başarılı${FINAL ? " (FINAL)" : ""}.`);
