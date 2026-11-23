// BU ÇOCUK SİZİN DEĞİL — 1. Bölüm: tüm sesleri ElevenLabs ile üretir.
//  • Diyaloglar: her sahne tek parça "diyalog modu" ile üretilir (karakterler birbirine cevap verir gibi, doğal akış).
//    Her sahne için birkaç okuma üretilir, yazıya çevrilip metinle karşılaştırılır, en iyisi seçilir.
//  • Ortam sesleri ve vurgu efektleri: ElevenLabs ses efektleri. • Fon müziği: ElevenLabs müzik.
//  • Hepsi yayın standardında ses seviyesine (LUFS) eşitlenir: konuşma her sahnede aynı netlikte duyulur.
// Kullanım:
//   node ses_uret.js                 → eksik/değişen her şeyi üretir (değişmeyenler önbellekten)
//   node ses_uret.js --deneme 3      → her sahne için 3 okuma (varsayılan 2)
//   node ses_uret.js S3 S5           → sadece bu sahnelerin diyaloğunu yeniden üretir
// API anahtarı: ELEVENLABS_API_KEY (Claude Code bulut oturumunda otomatik eklenir).
const fs = require('fs'), path = require('path'), crypto = require('crypto'), { execFileSync } = require('child_process');
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
function istek(url, govde, cikti) {
  const kod = execFileSync('curl', ['-sS', '-o', cikti, '-w', '%{http_code}', '-X', 'POST', url, '-H', 'Content-Type: application/json', ...ANAHTAR, '-d', JSON.stringify(govde)], { maxBuffer: 1e8 }).toString();
  return kod;
}
function yaziyaCevir(f) {
  const out = execFileSync('curl', ['-sS', '-X', 'POST', 'https://api.elevenlabs.io/v1/speech-to-text', ...ANAHTAR, '-F', 'model_id=scribe_v1', '-F', 'language_code=tur', '-F', `file=@${f}`]).toString();
  return JSON.parse(out).text || '';
}
function benzerlik(hedef, duyulan) { const a = sade(hedef).split(' '), b = new Set(sade(duyulan).split(' ')); return a.filter(w => b.has(w)).length / a.length; }
// Ses seviyesi eşitleme (EBU R128). Zaman bilgisi korunur (sadece kazanç).
function esitle(giris, cikis, lufs) {
  const r = require('child_process').spawnSync('ffmpeg', ['-hide_banner', '-i', giris, '-af', `loudnorm=I=${lufs}:TP=-1.5:LRA=11:print_format=json`, '-f', 'null', '-'], { encoding: 'utf8' });
  const j = JSON.parse(r.stderr.slice(r.stderr.lastIndexOf('{')));
  const kazanc = Math.min(18, lufs - +j.input_i);  // dB — sadece kazanç, zamanlama değişmez
  ff(['-i', giris, '-af', `volume=${kazanc.toFixed(2)}dB,alimiter=limit=0.89:level=false`, '-c:a', 'libmp3lame', '-b:a', '192k', cikis]);
  return { olculen: +j.input_i, kazanc };
}

// ── 1) DİYALOGLAR ──
for (const s of BOLUM.sahneler) {
  const girdiler = s.replikler.map(r => ({ text: r.ses || r.metin, voice_id: BOLUM.karakterler[r.kim.replace('_IC', '')].ses }));
  const govde = { model_id: BOLUM.diyalogModeli, inputs: girdiler, settings: { stability: BOLUM.stabilite } };
  const oz = ozet(govde), hedef = path.join(HAM, `diyalog_${s.id}.mp3`);
  const zorla = SECILI.includes(s.id);
  if (SECILI.length && !zorla && man[s.id]) { continue; }
  if (!zorla && man[s.id] && man[s.id].ozet === oz && fs.existsSync(hedef)) { console.log(`✓ ${s.id} diyalog (değişmedi)`); continue; }
  const metin = s.replikler.map(r => r.metin).join(' ');
  const adaylar = [];
  for (let d = 0; d < DENEME; d++) {
    const js = `${hedef}.${d}.json`;
    const kod = istek(`https://api.elevenlabs.io/v1/text-to-dialogue/with-timestamps?output_format=mp3_44100_192`, govde, js);
    if (kod !== '200') { console.log(`${s.id} HATA ${kod}: ${fs.readFileSync(js, 'utf8').slice(0, 300)}`); process.exit(1); }
    const j = JSON.parse(fs.readFileSync(js, 'utf8')); fs.unlinkSync(js);
    const mp3 = `${hedef}.${d}.mp3`; fs.writeFileSync(mp3, Buffer.from(j.audio_base64, 'base64'));
    const seg = s.replikler.map((r, i) => { const v = j.voice_segments.filter(x => x.dialogue_input_index === i); return v.length ? { id: r.id, bas: Math.min(...v.map(x => x.start_time_seconds)), bit: Math.max(...v.map(x => x.end_time_seconds)) } : null; });
    const duyulan = yaziyaCevir(mp3), dogruluk = benzerlik(metin, duyulan), tamam = seg.every(Boolean);
    adaylar.push({ mp3, seg, duyulan, dogruluk, puan: dogruluk + (tamam ? 1 : 0) });
    process.stdout.write(`  ${s.id} okuma ${d + 1}: doğruluk %${Math.round(dogruluk * 100)}${tamam ? '' : ' (eksik replik!)'}\n`);
  }
  adaylar.sort((a, b) => b.puan - a.puan); const en = adaylar[0];
  fs.renameSync(en.mp3, hedef); for (const a of adaylar.slice(1)) fs.unlinkSync(a.mp3);
  man[s.id] = { ozet: oz, segmentler: en.seg, dogruluk: +en.dogruluk.toFixed(3), duyulan: en.duyulan }; kaydet();
  console.log(`${en.dogruluk >= .9 ? '✓' : '⚠'} ${s.id} diyalog seçildi: doğruluk %${Math.round(en.dogruluk * 100)}  "${en.duyulan.slice(0, 90)}…"`);
}

// ── 2) ORTAM SESLERİ + VURGU EFEKTLERİ ──
function efektUret(ad, e, dongu) {
  const govde = { text: e.istem, duration_seconds: e.sure, prompt_influence: 0.45, ...(dongu ? { loop: true } : {}) };
  const oz = ozet(govde), hedef = path.join(HAM, `efekt_${ad}.mp3`);
  if (man['efekt_' + ad] && man['efekt_' + ad].ozet === oz && fs.existsSync(hedef)) { console.log(`✓ efekt ${ad} (değişmedi)`); return; }
  let kod = istek('https://api.elevenlabs.io/v1/sound-generation', govde, hedef);
  if (kod !== '200' && dongu) { delete govde.loop; kod = istek('https://api.elevenlabs.io/v1/sound-generation', govde, hedef); }
  if (kod !== '200') { console.log(`efekt ${ad} HATA ${kod}: ${fs.readFileSync(hedef, 'utf8').slice(0, 200)}`); process.exit(1); }
  man['efekt_' + ad] = { ozet: oz }; kaydet(); console.log(`✓ efekt ${ad} üretildi (${sure(hedef).toFixed(1)} sn)`);
}
for (const [ad, e] of Object.entries(BOLUM.ortamSesleri)) efektUret(ad, e, e.dongu);
for (const [ad, e] of Object.entries(BOLUM.spotEfektler)) efektUret(ad, e, false);

// ── 3) MÜZİK ──
for (const [ad, m] of Object.entries(BOLUM.muzikler)) {
  const govde = { prompt: m.istem, music_length_ms: Math.round(m.sure * 1000), force_instrumental: true };
  const oz = ozet(govde), hedef = path.join(HAM, `muzik_${ad}.mp3`);
  if (man['muzik_' + ad] && man['muzik_' + ad].ozet === oz && fs.existsSync(hedef)) { console.log(`✓ müzik ${ad} (değişmedi)`); continue; }
  let kod = istek('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_192', govde, hedef);
  if (kod !== '200') { delete govde.force_instrumental; kod = istek('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_192', govde, hedef); }
  if (kod !== '200') { console.log(`müzik ${ad} HATA ${kod}: ${fs.readFileSync(hedef, 'utf8').slice(0, 200)}`); process.exit(1); }
  man['muzik_' + ad] = { ozet: oz }; kaydet(); console.log(`✓ müzik ${ad} üretildi (${sure(hedef).toFixed(1)} sn)`);
}

// ── 4) SEVİYE EŞİTLEME + HIZ + PAKET ──
const paket = { sahneler: {}, efektler: {}, muzik: {} };
const b64 = f => fs.readFileSync(f).toString('base64');
for (const s of BOLUM.sahneler) {
  const ham = path.join(HAM, `diyalog_${s.id}.mp3`); if (!fs.existsSync(ham)) continue;
  const son = path.join(K, `diyalog_${s.id}.mp3`), gecici = son + '.tmp.mp3';
  // Sahne temposu: saniyedeki kelime sayısı hedefTempo'ya yaklaştırılır (en fazla %18 hızlandırma)
  const sg = man[s.id].segmentler, kelime = s.replikler.reduce((a, r) => a + r.metin.split(/\s+/).length, 0), ksure = sg.reduce((a, g) => a + g.bit - g.bas, 0);
  const HIZ = (BOLUM.konusmaHizi || 1) * (BOLUM.hedefTempo ? Math.min(1.18, Math.max(1, BOLUM.hedefTempo / (kelime / ksure))) : 1);
  console.log(`  ${s.id}: tempo ${(kelime / ksure).toFixed(2)} → ${(kelime / ksure * HIZ).toFixed(2)} kelime/sn (x${HIZ.toFixed(2)})`);
  if (HIZ !== 1) ff(['-i', ham, '-af', `rubberband=tempo=${HIZ}:transients=mixed:detector=compound:pitchq=quality`, '-c:a', 'libmp3lame', '-b:a', '192k', gecici]); else fs.copyFileSync(ham, gecici);
  esitle(gecici, son, -16); fs.unlinkSync(gecici);
  paket.sahneler[s.id] = { hiz: HIZ, sure: sure(son), segmentler: man[s.id].segmentler.map(g => ({ id: g.id, bas: g.bas / HIZ, bit: g.bit / HIZ })), veri: b64(son) };
}
for (const [grup, liste, lufs] of [['efektler', { ...BOLUM.ortamSesleri, ...BOLUM.spotEfektler }, -24], ['muzik', BOLUM.muzikler, -20]]) {
  for (const ad of Object.keys(liste)) {
    const ham = path.join(HAM, `${grup === 'muzik' ? 'muzik' : 'efekt'}_${ad}.mp3`); if (!fs.existsSync(ham)) continue;
    const son = path.join(K, path.basename(ham)); esitle(ham, son, lufs);
    paket[grup][ad] = { sure: sure(son), veri: b64(son) };
  }
}
fs.writeFileSync(path.join(__dirname, 'ses_paketi.js'), 'window.SES_PAKETI = ' + JSON.stringify(paket) + ';\n');
const konusma = Object.values(paket.sahneler).reduce((a, s) => a + (s.segmentler.at(-1).bit - s.segmentler[0].bas), 0);
console.log(`\nses_paketi.js yazıldı · sahne: ${Object.keys(paket.sahneler).length} · efekt: ${Object.keys(paket.efektler).length} · müzik: ${Object.keys(paket.muzik).length} · toplam konuşma ≈ ${konusma.toFixed(1)} sn`);
