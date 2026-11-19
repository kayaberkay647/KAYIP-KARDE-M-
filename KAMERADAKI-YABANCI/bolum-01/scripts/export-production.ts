// Üretim dokümanlarını tek doğruluk kaynağından (src/data) üretir → production/
//   npm run prompts
import fs from "node:fs";
import path from "node:path";
import { CHARACTERS, NEGATIVE_PROMPT_EN, STYLE_PROMPT_EN } from "../src/data/characters";
import { FLOOR_PLAN_TR, SETS } from "../src/data/locations";
import { BACK_LAYERS, FRONT_LAYERS, VISEME_LIST, VISEME_NOTES_TR } from "../src/data/rig";
import { ALL_LINES, ALL_SFX, AMBIENCE, BLACKOUT_AT, END_CARD_AT, MUSIC_CUT_AT, SCENES } from "../src/data/script";
import { DURATION_FRAMES, FPS, f } from "../src/config";
import { PRODUCTION } from "./lib";

fs.mkdirSync(PRODUCTION, { recursive: true });
const write = (name: string, body: string) => {
  fs.writeFileSync(path.join(PRODUCTION, name), body.trimStart());
  console.log("yazıldı: production/" + name);
};
const tc = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${(s % 60).toFixed(1).padStart(4, "0")}`;
const HEADER = "> Bu dosya `npm run prompts` ile `src/data/` içinden otomatik üretilir. Elle düzenlemeyin; kaynağı düzenleyin.\n";

// ---------------------------------------------------------------- 01 KARAKTERLER
write(
  "01_KARAKTER_REFERANSLARI.md",
  `
# 01 · Karakter Referansları ve Rig Katmanları
${HEADER}
## Genel stil (tüm görsellerde aynen kullanın)
**Style:** ${STYLE_PROMPT_EN}

**Negative:** ${NEGATIVE_PROMPT_EN}

## Tutarlılık kuralı
1. Her karakter için önce **tek bir ana referans** (model sheet) üretin ve onaylayın.
2. Sonraki tüm görsellerde bu referansı görüntü referansı / karakter kilidi olarak verin (ör. IP-Adapter, character reference, LoRA).
3. Yüz, saç, kıyafet ve vücut oranı hiçbir sahnede değişmez. Onaylanan referans: \`production/refs/<karakter>_model_sheet.png\` olarak saklayın.

${Object.values(CHARACTERS)
  .map(
    (c) => `
---
## ${c.name} — ${c.role}${c.age ? ` (${c.age})` : ""}
${c.descriptionTr.map((d) => `- ${d}`).join("\n")}

**Ses:** ${c.voiceTr.join(" · ")}
**Oyunculuk:** ${c.actingTr.join(" · ")}

**Sabit tanım (EN):** ${c.referencePromptEn}

${
  c.id === "yabanci"
    ? `### Üretilecek görsel
| Dosya | Prompt |
|---|---|
| \`public/assets/characters/yabanci/cctv_stand.png\` (720x3400, şeffaf) | ${c.referencePromptEn}, full body standing, facing camera, the hood opening is pure black void with zero facial detail, transparent background, ${STYLE_PROMPT_EN} |

> Yüz ASLA çizilmez. Kod, çizim olmadan da yalnızca siluet çizer; yüz katmanı hiç yoktur.`
    : `### 1) Model sheet
\`${c.referencePromptEn}, character model sheet, front view, three-quarter view, side view and back view, neutral expression, full body, plain neutral gray background, ${STYLE_PROMPT_EN}\`

### 2) İfade sayfası
\`${c.referencePromptEn}, facial expression sheet: neutral, tired, worried, frightened, terrified, determined, whispering, close-up head shots, same face in every panel, ${STYLE_PROMPT_EN}\`

### 3) Rig katmanları (şeffaf PNG, 1200x2800, aynı hiza)
Ön görünüm \`public/assets/characters/${c.id}/front/\`: ${FRONT_LAYERS.map((l) => `\`${l}.png\``).join(", ")}

Arka görünüm \`public/assets/characters/${c.id}/back/\`: ${BACK_LAYERS.map((l) => `\`${l}.png\``).join(", ")}`
}
`,
  )
  .join("\n")}

---
## Rig sözleşmesi
- Tuval: 1200x2800 px şeffaf PNG; rig kutusu 600x1400 birim (2x çözünürlük). Ayak ortası = (600, 2800). Boyun pivotu ≈ (600, 600).
- \`head\`: göz/kaş/ağız İÇERMEYEN yüz tabanı (burun, kulak, cilt gölgesi dahil).
- \`eyes_*\`: göz akı + iris + kapak çizgisi; \`eyes_half\` yarı kapalı, \`eyes_closed\` kapalı (kırpma 5 karede open → half → closed → half → open).
- \`body_*\`: boyun dahil gövde, kollar, eller, bacaklar. \`*_phone\`: telefonu iki eliyle göğüs hizasında tutar (telefon ekranı kodla çizilir; PNG'de ekran siyah).
- Ağız (viseme) katmanları — Türkçe dudak senkronu bunları harf zamanlamasına göre değiştirir:

| Katman | Kullanım |
|---|---|
${VISEME_LIST.map((v) => `| \`mouth_${v}.png\` | ${VISEME_NOTES_TR[v]} |`).join("\n")}

Katmanlar eksiksiz konduğunda rig otomatik olarak çizim moduna geçer (\`npm run scan\`).
`,
);

// ---------------------------------------------------------------- 02 MEKÂNLAR
write(
  "02_MEKAN_PLAKALARI.md",
  `
# 02 · Mekân Plakaları
${HEADER}
\`\`\`
${FLOOR_PLAN_TR.trim()}
\`\`\`

Genel: gece, şiddetli olmayan yağmur, zaman zaman rüzgâr. Renkler: koyu lacivert, soluk gri, soğuk mavi, loş sarı ışık.
Plakalarda **karakter, yazı, logo olmamalı**. Canlı öğeler (yağmur damlası, lamba titremesi, saat saniyesi, telefon ekranı, kamera LED'i, kapı kolu dönüşü, kablo) kodla üstüne eklenir.

${Object.values(SETS)
  .map(
    (st) => `
## ${st.id} — ${st.location}
- Kullanıldığı sahneler: ${st.usedInScenes.map((n) => `S${String(n).padStart(2, "0")}`).join(", ")}
- Sahne koordinatı: ${st.stage.w}x${st.stage.h} · Üretim çözünürlüğü: **${st.renderSize.w}x${st.renderSize.h}**
- Dosyalar:
${st.layers.map((l) => `  - \`public/assets/sets/${st.id}/${l.file}\` ${l.required ? "(zorunlu)" : "(isteğe bağlı)"} — ${l.noteTr}`).join("\n")}

**Prompt:** ${st.promptEn}

**Negative:** ${NEGATIVE_PROMPT_EN}, people, person, figure
`,
  )
  .join("\n")}
`,
);

// ---------------------------------------------------------------- 03 SAHNE PLANI
write(
  "03_SAHNE_PLANI.md",
  `
# 03 · Sahne Planı — KAMERADAKİ YABANCI · 1. Bölüm · GECE 03.13
${HEADER}
1080x1920 · 9:16 · ${FPS} fps · **${DURATION_FRAMES} kare (120 sn)** · ${SCENES.length} sahne
Müzik ${tc(MUSIC_CUT_AT)}'da kesilir · ${tc(BLACKOUT_AT)} ani kararma · ${tc(END_CARD_AT)} "DEVAM EDECEK..." · 02:00.0 son.

| # | Zaman | Kareler | Başlık | Replik |
|---|---|---|---|---|
${SCENES.map((sc) => `| ${sc.n} | ${tc(sc.start)}–${tc(sc.end)} | ${f(sc.start)}–${f(sc.end) - 1} | ${sc.title} | ${sc.dialogue.length} |`).join("\n")}

${SCENES.map(
  (sc) => `
---
## SAHNE ${String(sc.n).padStart(2, "0")} · ${sc.title}
**${tc(sc.start)} – ${tc(sc.end)}** (kare ${f(sc.start)}–${f(sc.end) - 1}, ${(sc.end - sc.start).toFixed(0)} sn)

**Visual prompt (EN):** ${sc.visualPromptEn}

**Kamera:** ${sc.cameraTr.join(" → ")}
**Animasyon / oyunculuk:** ${sc.animationTr.join(" · ")}

${
  sc.dialogue.length
    ? `| Başlangıç | Karakter | Replik | En fazla | Yönerge |
|---|---|---|---|---|
${sc.dialogue.map((l) => `| ${tc(l.at)} | ${CHARACTERS[l.speaker].name} | "${l.text}" | ${l.window} sn | ${l.tags.map((t) => `[${t}]`).join(" ")} ${l.deliveryTr} |`).join("\n")}`
    : "Diyalog yok."
}

**Efektler:** ${sc.sfx.map((x) => `${tc(x.at)} ${x.id}`).join(" · ")}
`,
).join("\n")}
`,
);

// ---------------------------------------------------------------- 04 SESLENDİRME
const v3 = (l: (typeof ALL_LINES)[number]) => (l.tags.length ? l.tags.map((t) => `[${t}]`).join(" ") + " " : "") + l.text;
write(
  "04_SESLENDIRME_MANIFESTI.md",
  `
# 04 · Seslendirme Manifesti (ElevenLabs)
${HEADER}
- Model: **eleven_v3** (ses etiketleri desteklenir). Etiket desteklemeyen modelde (ör. eleven_multilingual_v2) etiketleri silin, "Yönerge" sütununu oyunculuk notu olarak kullanın.
- Her karakter **tüm bölümlerde aynı voice ID** ile seslendirilir → \`production/voices.json\`.
- Her replik ayrı dosya: \`public/audio/voice/<ID>.mp3\`. Otomatik üretim: \`npm run voices\` (harf zamanlamalı \`.align.json\` da kaydedilir → dudak senkronu).
- Replik "En fazla" süresini aşarsa \`npm run validate\` hata verir; hızı (speed) artırın veya yeniden üretin. Sahne süreleri DEĞİŞMEZ.
- Yabancının sesi: robotik/pitch/canavar efekti YOK. Temiz, kuru, çok yakın mikrofon.

## Ses ayarları (sabit)
| Karakter | Env anahtarı | Stability | Similarity | Style | Speed |
|---|---|---|---|---|---|
${Object.values(CHARACTERS)
  .map((c) => `| ${c.name} | \`${c.voiceEnvKey}\` | ${c.voiceSettings.stability} | ${c.voiceSettings.similarity_boost} | ${c.voiceSettings.style} | ${c.voiceSettings.speed} |`)
  .join("\n")}

## Replikler
| Dosya | Başlangıç | En fazla | Karakter | eleven_v3 metni | Yönerge |
|---|---|---|---|---|---|
${ALL_LINES.map((l) => `| \`${l.id}.mp3\` | ${tc(l.at)} | ${l.window} sn | ${CHARACTERS[l.speaker].name} | ${v3(l)} | ${l.deliveryTr} |`).join("\n")}
`,
);
const csv = (rows: (string | number)[][]) => rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n") + "\n";
write(
  "voice-manifest.csv",
  csv([
    ["file", "speaker", "start_sec", "max_sec", "text", "eleven_v3_text", "delivery_tr"],
    ...ALL_LINES.map((l) => [`audio/voice/${l.id}.mp3`, l.speaker, l.at, l.window, l.text, v3(l), l.deliveryTr]),
  ]),
);

// ---------------------------------------------------------------- 05 EFEKTLER
write(
  "05_SES_EFEKTLERI.md",
  `
# 05 · Ses Efektleri ve Ortam
${HEADER}
Otomatik üretim: \`npm run sfx\` (ElevenLabs Sound Effects). Elle üretilecekse aynı dosya adlarını kullanın.

## Efektler (\`public/audio/sfx/\`)
| Dosya | Zaman | Süre | Seviye | Prompt (EN) |
|---|---|---|---|---|
${ALL_SFX.map((x) => `| \`${x.file}\` | ${tc(x.at)} | ${x.duration} sn | ${x.volume} | ${x.promptEn} |`).join("\n")}

## Ortam / müzik yatakları (\`public/audio/amb/\`, döngü)
| Dosya | Aralık | Seviye | Giriş/Çıkış | Prompt (EN) |
|---|---|---|---|---|
${AMBIENCE.map((a) => `| \`${a.file}\` | ${tc(a.from)}–${tc(a.to)} | ${a.volume} | ${a.fadeIn}/${a.fadeOut} sn | ${a.promptEn} |`).join("\n")}

**Kurallar:** Müzik yatağı ${tc(MUSIC_CUT_AT)}'da (S17) ANİDEN kesilir. ${tc(BLACKOUT_AT)}'da tüm sesler kesilir; yalnızca ${tc(118.8)}'de tek alçak vuruş.
`,
);
write(
  "sfx-manifest.csv",
  csv([
    ["file", "start_sec", "duration_sec", "volume", "prompt_en"],
    ...ALL_SFX.map((x) => [`audio/sfx/${x.file}`, x.at, x.duration, x.volume, x.promptEn]),
    ...AMBIENCE.map((a) => [`audio/amb/${a.file}`, a.from, a.to - a.from, a.volume, a.promptEn]),
  ]),
);

// ---------------------------------------------------------------- voices.json şablonu
const vj = path.join(PRODUCTION, "voices.json");
if (!fs.existsSync(vj)) {
  fs.writeFileSync(
    vj,
    JSON.stringify({ VOICE_ID_KEREM: "BURAYA_KEREM_VOICE_ID", VOICE_ID_DEFNE: "BURAYA_DEFNE_VOICE_ID", VOICE_ID_YABANCI: "BURAYA_YABANCI_VOICE_ID" }, null, 2) + "\n",
  );
  console.log("yazıldı: production/voices.json (şablon)");
}
