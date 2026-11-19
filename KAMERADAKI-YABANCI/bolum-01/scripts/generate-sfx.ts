// ELEVENLABS SES EFEKTLERİ + ORTAM YATAKLARI
//   npm run sfx -- --dry-run   → promptları listele
//   npm run sfx                → eksikleri üret (public/audio/sfx, public/audio/amb)
//   npm run sfx -- --only=S17_handle_turn --force
// Not: Müzik yatağı (MUS_dread_bed) da burada üretilebilir; isterseniz kendi bestenizi aynı adla koyun.
import fs from "node:fs";
import path from "node:path";
import { ALL_SFX, AMBIENCE } from "../src/data/script";
import { PUBLIC, flag, loadEnv, opt, probeDuration } from "./lib";

loadEnv();
const DRY = flag("dry-run");
const FORCE = flag("force");
const ONLY = opt("only");

type Job = { id: string; out: string; prompt: string; duration: number; influence: number };
const jobs: Job[] = [
  ...ALL_SFX.map((x) => ({ id: x.id, out: path.join(PUBLIC, "audio/sfx", x.file), prompt: x.promptEn, duration: x.duration, influence: 0.45 })),
  ...AMBIENCE.map((a) => ({ id: a.id, out: path.join(PUBLIC, "audio/amb", a.file), prompt: a.promptEn, duration: 22, influence: 0.35 })),
].filter((j) => !ONLY || j.id === ONLY);

async function main() {
  if (!DRY && !process.env.ELEVENLABS_API_KEY) {
    console.error("ELEVENLABS_API_KEY tanımlı değil (bkz. README). Promptları görmek için: npm run sfx -- --dry-run");
    process.exit(1);
  }
  for (const j of jobs) {
    const dur = Math.min(22, Math.max(0.5, j.duration));
    if (DRY) {
      console.log(`${j.id.padEnd(26)} ${dur.toFixed(1).padStart(4)} sn  ${j.prompt}`);
      continue;
    }
    if (fs.existsSync(j.out) && !FORCE) {
      console.log(`atlandı (var): ${j.id}`);
      continue;
    }
    fs.mkdirSync(path.dirname(j.out), { recursive: true });
    process.stdout.write(`üretiliyor: ${j.id} … `);
    const res = await fetch("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", {
      method: "POST",
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY!, "Content-Type": "application/json" },
      body: JSON.stringify({ text: j.prompt, duration_seconds: dur, prompt_influence: j.influence }),
    });
    if (!res.ok) throw new Error(`${j.id}: ${res.status} ${await res.text()}`);
    fs.writeFileSync(j.out, Buffer.from(await res.arrayBuffer()));
    console.log(`${probeDuration(j.out)?.toFixed(2) ?? "?"} sn`);
  }
  if (!DRY) console.log("\nBitti. Şimdi: npm run validate");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
