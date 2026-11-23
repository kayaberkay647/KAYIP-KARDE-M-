// BU ÇOCUK SİZİN DEĞİL — 1. Bölüm: tüm sesleri ElevenLabs ile üretir.
//  • Diyaloglar: her sahne tek parça "diyalog modu" (karakterler birbirine cevap verir gibi). Her sahne için birkaç okuma
//    üretilir, yazıya çevrilip metinle karşılaştırılır, en doğrusu seçilir. Kelime zamanları kaydedilir (altyazı senkronu).
//  • Fon müziği: ElevenLabs müzik (tek parça, sürekli). • Efektler: ElevenLabs ses efektleri.
//  • Konuşma −16 LUFS'a eşitlenir; tempo saniyede hedefTempo kelimeye yaklaştırılır (ses perdesi korunur).
// Kullanım:  node ses_uret.js  ·  node ses_uret.js S3 (sadece o sahne)  ·  node ses_uret.js --deneme 3
// API anahtarı: ELEVENLABS_API_KEY (Claude Code bulut oturumunda otomatik eklenir).
const fs = require('fs'), path = require('path'), crypto = require('crypto'), { execFileSync, spawnSync } = require('child_process');
const BOLUM = require('./bolum1.js');
const K = path.join(__dirname, 'ses'), HAM = path.join(K, 'ham');
fs.mkdirSync(HAM, { recursive: true });
const arg = process.argv.slice(2), DENEME = arg.includes('--deneme') ? +arg[arg.indexOf('--deneme') + 1] : 2, SECILI = arg.filter(a => /^S\d+$/.test(a));
const ANAHTAR = process.env.ELEVENLABS_API_KEY ? ['-H', `xi-api-key: ${process.env.ELEVENLABS_API_KEY}`] : [];
const MAN = path.join(K, 'manifest.json'), man = fs.existsSync(MAN) ? JSON.parse(fs.readFileSync(MAN, 'utf8')) : {};
const kaydet = () => fs.writeFileSync(MAN, JSON.stringify(man, null, 2));
const ozet = o => crypto.createHash('sha1').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const sure = f => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim();
const ff = a => execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...a]);
const sade = s => s.toLocaleLowerCase('tr').replace(/\[[^\]]*\]/g, ' ').replace(/(.)\1{2,}/g, '$1').replace(/[^a-zçğıöşüâ0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const istek = (url, govde, cikti) => execFileSync('curl', ['-sS', '-o', cikti, '-w', '%{http_code}', '-X', 'POST', url, '-H', 'Content-Type: application/json', ...ANAHTAR, '-d', JSON.stringify(govde)], { maxBuffer: 1e8 }).toString();
function yaziyaCevir(f) { const out = execFileSync('curl', ['-sS', '-X', 'POST', 'https://api.elevenlabs.io/v1/speech-to-text', ...ANAHTAR, '-F', 'model_id=scribe_v1', '-F', 'language_code=tur', '-F', `file=@${f}`]).toString(); return JSON.parse(out).text || ''; }
function benzerlik(hedef, duyulan) { const a = sade(hedef).split(' '), b = new Set(sade(duyulan).split(' ')); return a.filter(w => b.has(w)).length / a.length; }
function esitle(giris, cikis, lufs) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-i', giris, '-af', `loudnorm=I=${lufs}:TP=-1.5:LRA=11:print_format=json`, '-f', 'null', '-'], { encoding: 'utf8' });
  const j = JSON.parse(r.stderr.slice(r.stderr.lastIndexOf('{')));
  ff(['-i', giris, '-af', `volume=${Math.min(18, lufs - +j.input_i).toFixed(2)}dB,alimiter=limit=0.89:level=false`, '-c:a', 'libmp3lame', '-b:a', '192k', cikis]);
}
// Hizalamadan replik başına kelime zamanları: [{w, s, e}] (etiketler hariç)
function kelimeler(al, a, b) {
  const out = []; let cur = null, etiket = false;
  for (let i = a; i < b; i++) {
    const ch = al.characters[i];
    if (ch === '[') { etiket = true; if (cur) { out.push(cur); cur = null; } continue; }
    if (ch === ']') { etiket = false; continue; }
    if (etiket) continue;
    if (/\s/.test(ch)) { if (cur) { out.push(cur); cur = null; } continue; }
    if (!cur) cur = { w: '', s: al.character_start_times_seconds[i], e: 0 };
    cur.w += ch; cur.e = al.character_end_times_seconds[i];
  }
  if (cur) out.push(cur);
  return out.filter(x => /[\p{L}\p{N}]/u.test(x.w));
}

// ── 1) DİYALOGLAR ──
for (const s of BOLUM.sahneler) {
  const girdiler = s.replikler.map(r => ({ text: r.ses || r.metin, voice_id: BOLUM.karakterler[r.kim.replace('_IC', '')].ses }));
  const govde = { model_id: BOLUM.diyalogModeli, inputs: girdiler, settings: { stability: BOLUM.stabilite } };
  const oz = ozet(govde), hedef = path.join(HAM, `diyalog_${s.id}.mp3`);
  const zorla = SECILI.includes(s.id);
  if (SECILI.length && !zorla) continue;
  if (!zorla && man[s.id] && man[s.id].ozet === oz && fs.existsSync(hedef)) { console.log(`✓ ${s.id} diyalog (değişmedi)`); continue; }
  const metin = s.replikler.map(r => r.metin).join(' '), adaylar = [];
  for (let d = 0; d < DENEME; d++) {
    const js = `${hedef}.${d}.json`;
    const kod = istek('https://api.elevenlabs.io/v1/text-to-dialogue/with-timestamps?output_format=mp3_44100_192', govde, js);
    if (kod !== '200') { console.log(`${s.id} HATA ${kod}: ${fs.readFileSync(js, 'utf8').slice(0, 300)}`); process.exit(1); }
    const j = JSON.parse(fs.readFileSync(js, 'utf8')); fs.unlinkSync(js);
    const mp3 = `${hedef}.${d}.mp3`; fs.writeFileSync(mp3, Buffer.from(j.audio_base64, 'base64'));
    const seg = s.replikler.map((r, i) => {
      const v = j.voice_segments.filter(x => x.dialogue_input_index === i); if (!v.length) return null;
      const a = Math.min(...v.map(x => x.character_start_index)), b = Math.max(...v.map(x => x.character_end_index));
      return { id: r.id, bas: Math.min(...v.map(x => x.start_time_seconds)), bit: Math.max(...v.map(x => x.end_time_seconds)), kelime: kelimeler(j.alignment, a, b) };
    });
    const duyulan = yaziyaCevir(mp3), dogruluk = benzerlik(metin, duyulan), tamam = seg.every(Boolean);
    adaylar.push({ mp3, seg, duyulan, dogruluk, puan: dogruluk + (tamam ? 1 : 0) });
    console.log(`  ${s.id} okuma ${d + 1}: doğruluk %${Math.round(dogruluk * 100)}${tamam ? '' : ' (eksik replik!)'}`);
  }
  adaylar.sort((a, b) => b.puan - a.puan); const en = adaylar[0];
  fs.renameSync(en.mp3, hedef); for (const a of adaylar.slice(1)) fs.unlinkSync(a.mp3);
  man[s.id] = { ozet: oz, segmentler: en.seg, dogruluk: +en.dogruluk.toFixed(3), duyulan: en.duyulan }; kaydet();
  console.log(`${en.dogruluk >= .9 ? '✓' : '⚠'} ${s.id} seçildi: %${Math.round(en.dogruluk * 100)}  "${en.duyulan.slice(0, 80)}…"`);
}

// ── 2) MÜZİK + EFEKTLER ──
function uret(anahtar, url, govde, hedef, yedek) {
  const oz = ozet(govde);
  if (man[anahtar] && man[anahtar].ozet === oz && fs.existsSync(hedef)) { console.log(`✓ ${anahtar} (değişmedi)`); return; }
  let kod = istek(url, govde, hedef);
  if (kod !== '200' && yedek) { yedek(govde); kod = istek(url, govde, hedef); }
  if (kod !== '200') { console.log(`${anahtar} HATA ${kod}: ${fs.readFileSync(hedef, 'utf8').slice(0, 200)}`); process.exit(1); }
  man[anahtar] = { ozet: oz }; kaydet(); console.log(`✓ ${anahtar} üretildi (${sure(hedef).toFixed(1)} sn)`);
}
const M = BOLUM.muzik;
uret('muzik', 'https://api.elevenlabs.io/v1/music?output_format=mp3_44100_192', { prompt: M.istem, music_length_ms: Math.round(M.sure * 1000), force_instrumental: true }, path.join(HAM, 'muzik.mp3'), g => delete g.force_instrumental);
for (const [ad, e] of Object.entries(BOLUM.efektler)) uret('efekt_' + ad, 'https://api.elevenlabs.io/v1/sound-generation', { text: e.istem, duration_seconds: e.sure, prompt_influence: 0.5 }, path.join(HAM, `efekt_${ad}.mp3`));

// ── 3) TEMPO + SEVİYE + PAKET ──
const paket = { sahneler: {}, efektler: {}, muzik: null };
const b64 = f => fs.readFileSync(f).toString('base64');
for (const s of BOLUM.sahneler) {
  const ham = path.join(HAM, `diyalog_${s.id}.mp3`); if (!fs.existsSync(ham) || !man[s.id]) continue;
  const son = path.join(K, `diyalog_${s.id}.mp3`), gecici = son + '.tmp.mp3';
  const sg = man[s.id].segmentler, kelime = s.replikler.reduce((a, r) => a + r.metin.split(/\s+/).length, 0), ks = sg.reduce((a, g) => a + g.bit - g.bas, 0);
  const HIZ = Math.min(1.15, Math.max(1, BOLUM.hedefTempo / (kelime / ks)));
  console.log(`  ${s.id}: tempo ${(kelime / ks).toFixed(2)} → ${(kelime / ks * HIZ).toFixed(2)} kelime/sn (x${HIZ.toFixed(2)})`);
  if (HIZ > 1.001) ff(['-i', ham, '-af', `rubberband=tempo=${HIZ}:transients=mixed:detector=compound:pitchq=quality`, '-c:a', 'libmp3lame', '-b:a', '192k', gecici]); else fs.copyFileSync(ham, gecici);
  esitle(gecici, son, -16); fs.unlinkSync(gecici);
  paket.sahneler[s.id] = { hiz: HIZ, sure: sure(son), veri: b64(son),
    segmentler: sg.map(g => ({ id: g.id, bas: g.bas / HIZ, bit: g.bit / HIZ, kelime: g.kelime.map(k => ({ w: k.w, s: +(k.s / HIZ).toFixed(3), e: +(k.e / HIZ).toFixed(3) })) })) };
}
if (fs.existsSync(path.join(HAM, 'muzik.mp3'))) { const son = path.join(K, 'muzik.mp3'); esitle(path.join(HAM, 'muzik.mp3'), son, -20); paket.muzik = { sure: sure(son), veri: b64(son) }; }
for (const ad of Object.keys(BOLUM.efektler)) { const ham = path.join(HAM, `efekt_${ad}.mp3`); if (!fs.existsSync(ham)) continue; const son = path.join(K, `efekt_${ad}.mp3`); esitle(ham, son, -20); paket.efektler[ad] = { sure: sure(son), veri: b64(son) }; }
fs.writeFileSync(path.join(__dirname, 'ses_paketi.js'), 'window.SES_PAKETI = ' + JSON.stringify(paket) + ';\n');
const konusma = Object.values(paket.sahneler).reduce((a, s) => a + s.segmentler.reduce((b, g) => b + g.bit - g.bas, 0), 0);
console.log(`\nses_paketi.js yazıldı · sahne: ${Object.keys(paket.sahneler).length} · müzik: ${paket.muzik ? 'var' : 'yok'} · efekt: ${Object.keys(paket.efektler).length} · toplam konuşma ≈ ${konusma.toFixed(1)} sn`);
