// ELEVENLABS SESLENDİRME — her replik ayrı dosya, her karakter tüm bölümlerde AYNI voice ID.
//
// Kurulum (.env dosyası veya ortam değişkeni; .env git'e girmez):
//   ELEVENLABS_API_KEY=...
//   VOICE_ID_KEREM=...   VOICE_ID_DEFNE=...   VOICE_ID_YABANCI=...
// (Voice ID'ler gizli değildir; 15 bölüm boyunca sabit kalmaları için production/voices.json'a da yazılabilir.)
//
// Kullanım:
//   npm run voices -- --dry-run            → istek metinlerini göster, API çağırma
//   npm run voices                         → eksik replikleri üret
//   npm run voices -- --only=E01_S18_L02_YABANCI --force
//   ELEVEN_MODEL=eleven_multilingual_v2 npm run voices   → etiket desteklemeyen model (etiketler metinden çıkarılır)
//
// Çıktı: public/audio/voice/<ID>.mp3 + <ID>.align.json (harf zamanlamaları → dudak senkronu)
import fs from "node:fs";
import path from "node:path";
import { ALL_LINES, type DialogueLine } from "../src/data/script";
import { CHARACTERS } from "../src/data/characters";
import { PRODUCTION, PUBLIC, flag, loadEnv, opt, probeDuration } from "./lib";

loadEnv();
const MODEL = process.env.ELEVEN_MODEL || "eleven_v3";
const SUPPORTS_TAGS = MODEL.startsWith("eleven_v3");
const DRY = flag("dry-run");
const FORCE = flag("force");
const ONLY = opt("only");
const OUT = path.join(PUBLIC, "audio/voice");

const voicesFile = path.join(PRODUCTION, "voices.json");
const fixed: Record<string, string> = fs.existsSync(voicesFile) ? JSON.parse(fs.readFileSync(voicesFile, "utf8")) : {};
const voiceId = (speaker: string) => {
  const key = CHARACTERS[speaker as keyof typeof CHARACTERS].voiceEnvKey;
  const v = process.env[key] || fixed[key];
  return v && !v.startsWith("BURAYA") ? v : undefined;
};

export const requestText = (l: DialogueLine) => (SUPPORTS_TAGS && l.tags.length ? l.tags.map((t) => `[${t}]`).join(" ") + " " : "") + l.text;

async function tts(l: DialogueLine) {
  const vid = voiceId(l.speaker)!;
  const ch = CHARACTERS[l.speaker];
  const body: Record<string, unknown> = {
    text: requestText(l),
    model_id: MODEL,
    voice_settings: ch.voiceSettings,
  };
  if (process.env.ELEVEN_LANGUAGE_CODE) body.language_code = process.env.ELEVEN_LANGUAGE_CODE; // ör. "tr" (destekleyen modellerde)
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${vid}/with-timestamps?output_format=mp3_44100_128`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY!, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const json = (await res.json()) as {
    audio_base64: string;
    alignment?: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] };
  };
  fs.writeFileSync(path.join(OUT, `${l.id}.mp3`), Buffer.from(json.audio_base64, "base64"));
  if (json.alignment) {
    // Etiket karakterlerini at: hizalamayı ekrandaki metnin başladığı yerden kes.
    const chars = json.alignment.characters;
    const joined = chars.join("");
    const head = l.text.slice(0, Math.min(6, l.text.length));
    const idx = Math.max(0, joined.indexOf(head));
    const align = {
      chars: chars.slice(idx),
      starts: json.alignment.character_start_times_seconds.slice(idx),
      ends: json.alignment.character_end_times_seconds.slice(idx),
    };
    fs.writeFileSync(path.join(OUT, `${l.id}.align.json`), JSON.stringify(align));
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const lines = ALL_LINES.filter((l) => !ONLY || l.id === ONLY);
  if (!DRY && !process.env.ELEVENLABS_API_KEY) {
    console.error("ELEVENLABS_API_KEY tanımlı değil. Önce --dry-run ile metinleri kontrol edin ya da .env oluşturun (bkz. README).");
    process.exit(1);
  }
  const missingVoice = [...new Set(lines.map((l) => l.speaker))].filter((s) => !voiceId(s));
  if (!DRY && missingVoice.length) {
    console.error(`Voice ID eksik: ${missingVoice.map((s) => CHARACTERS[s].voiceEnvKey).join(", ")}`);
    process.exit(1);
  }
  for (const l of lines) {
    const file = path.join(OUT, `${l.id}.mp3`);
    if (DRY) {
      console.log(`${l.id.padEnd(22)} @${l.at.toFixed(1).padStart(5)}s ≤${l.window}s  ${requestText(l)}`);
      continue;
    }
    if (fs.existsSync(file) && !FORCE) {
      console.log(`atlandı (var): ${l.id}`);
      continue;
    }
    process.stdout.write(`üretiliyor: ${l.id} … `);
    await tts(l);
    const d = probeDuration(file);
    console.log(d ? `${d.toFixed(2)} sn${d > l.window ? `  ⚠ pencere ${l.window} sn'yi aşıyor` : ""}` : "tamam");
  }
  if (!DRY) console.log("\nBitti. Şimdi: npm run validate");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
