// public/ klasörünü tarar → src/generated/asset-status.json
// Remotion bileşenleri yalnızca burada listelenen (gerçekten var olan) dosyaları yükler.
import fs from "node:fs";
import path from "node:path";
import { PUBLIC, STATUS_FILE, probeDuration, walk } from "./lib";

const present = walk(PUBLIC).filter((p) => !p.endsWith(".align.json")).sort();
const durations: Record<string, number> = {};
for (const p of present) {
  if (/\.(mp3|wav|m4a|ogg)$/i.test(p)) {
    const d = probeDuration(path.join(PUBLIC, p));
    if (d) durations[p] = d;
  }
}
const alignments: Record<string, { chars: string[]; starts: number[]; ends: number[] }> = {};
for (const p of walk(path.join(PUBLIC, "audio/voice")).filter((p) => p.endsWith(".align.json"))) {
  const id = path.basename(p, ".align.json");
  try {
    alignments[id] = JSON.parse(fs.readFileSync(path.join(PUBLIC, "audio/voice", p), "utf8"));
  } catch (e) {
    console.warn(`Hizalama okunamadı: ${p}`, e);
  }
}
const status = { generatedAt: new Date().toISOString(), present, durations, alignments };
fs.mkdirSync(path.dirname(STATUS_FILE), { recursive: true });
fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2) + "\n");
const count = (re: RegExp) => present.filter((p) => re.test(p)).length;
console.log(
  `Varlık taraması: ${present.length} dosya · ses ${count(/^audio\/voice\/.*\.mp3$/)} replik · efekt ${count(/^audio\/sfx\//)} · ortam ${count(/^audio\/amb\//)} · set ${count(/^assets\/sets\//)} · karakter katmanı ${count(/^assets\/characters\//)} · hizalama ${Object.keys(alignments).length}`,
);
