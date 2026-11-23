// BU ÇOCUK SİZİN DEĞİL — 1. Bölüm diyaloglarını ElevenLabs ile üretir.
// Kullanım:
//   node ses_uret.js              → eksik veya metni/ayarı değişen replikleri üretir
//   node ses_uret.js --hepsi      → hepsini baştan üretir
//   node ses_uret.js --deneme 3   → her replik için 3 okuma üretip en iyisini seçer (varsayılan 2)
//   node ses_uret.js R03 R09      → sadece bu replikleri yeniden üretir
// Her okuma yazıya çevrilip metinle karşılaştırılır; en doğru ve en canlı (ses dinamiği en yüksek) okuma seçilir.
// Baştaki/sondaki sessizlik kırpılır. Ham sesler ses/ham/ içinde; konusmaHizi uygulanmış hali ses/ içinde. API anahtarı: ELEVENLABS_API_KEY (Claude Code bulut oturumunda otomatik eklenir).
const fs = require('fs'), path = require('path'), crypto = require('crypto'), { execFileSync } = require('child_process');
const BOLUM = require('./bolum1.js');
const KLASOR = path.join(__dirname, 'ses'), HAM = path.join(KLASOR, 'ham'), MANIFEST = path.join(KLASOR, 'manifest.json');
const HIZ = BOLUM.konusmaHizi || 1;
const arg = process.argv.slice(2), HEPSI = arg.includes('--hepsi');
const DENEME = arg.includes('--deneme') ? +arg[arg.indexOf('--deneme') + 1] : 2;
const SECILI = arg.filter(a => /^R\d\d$/.test(a));
const ANAHTAR = process.env.ELEVENLABS_API_KEY ? ['-H', `xi-api-key: ${process.env.ELEVENLABS_API_KEY}`] : [];
fs.mkdirSync(HAM, { recursive: true });
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const dosyaAdi = r => `B${String(BOLUM.no).padStart(2, '0')}_${r.id}_${r.kim}.mp3`;
const sure = f => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim();
const sade = s => s.toLocaleLowerCase('tr').replace(/\[[^\]]*\]/g, ' ').replace(/(.)\1{2,}/g, '$1').replace(/[^a-zçğıöşüâ0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

function kirp(giris, cikis) {
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', giris, '-af',
    'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.15,areverse',
    '-c:a', 'libmp3lame', '-b:a', '160k', cikis]);
}
function dinamik(f) { // ses seviyesinin konuşma boyunca ne kadar değiştiği (dB std) → canlılık ölçüsü
  const pcm = execFileSync('ffmpeg', ['-loglevel', 'error', '-i', f, '-ac', '1', '-ar', '8000', '-f', 's16le', '-'], { maxBuffer: 64e6 });
  const n = pcm.length / 2, adim = 400, db = [];
  for (let i = 0; i + adim <= n; i += adim) { let s = 0; for (let j = i; j < i + adim; j++) { const v = pcm.readInt16LE(j * 2) / 32768; s += v * v; } const r = Math.sqrt(s / adim); if (r > 0.003) db.push(20 * Math.log10(r)); }
  const ort = db.reduce((a, b) => a + b, 0) / (db.length || 1);
  return Math.sqrt(db.reduce((a, b) => a + (b - ort) ** 2, 0) / (db.length || 1));
}
function yaziyaCevir(f) {
  const out = execFileSync('curl', ['-sS', '-X', 'POST', 'https://api.elevenlabs.io/v1/speech-to-text', ...ANAHTAR,
    '-F', 'model_id=scribe_v1', '-F', 'language_code=tur', '-F', `file=@${f}`]).toString();
  return JSON.parse(out).text || '';
}
function benzerlik(hedef, duyulan) { const a = sade(hedef).split(' '), b = new Set(sade(duyulan).split(' ')); return a.filter(w => b.has(w)).length / a.length; }

const L = BOLUM.replikler;
for (let i = 0; i < L.length; i++) {
  const r = L[i], ses = BOLUM.sesler[r.kim];
  if (!ses) throw new Error(`${r.id}: "${r.kim}" için ses tanımlı değil`);
  const govde = {
    text: r.ses || r.metin, model_id: BOLUM.model, voice_settings: ses.ayar,
    previous_text: i > 0 ? L[i - 1].metin : undefined, next_text: i < L.length - 1 ? L[i + 1].metin : undefined,
  };
  const ozet = crypto.createHash('sha1').update(JSON.stringify([ses.id, govde])).digest('hex');
  const hedef = path.join(HAM, dosyaAdi(r));
  const zorla = HEPSI || SECILI.includes(r.id);
  if (SECILI.length && !SECILI.includes(r.id)) continue;
  if (!zorla && manifest[r.id] && manifest[r.id].ozet === ozet && fs.existsSync(hedef)) { console.log(`✓ ${r.id} (değişmedi)`); continue; }
  const adaylar = [];
  for (let d = 0; d < DENEME; d++) {
    const ham = `${hedef}.ham${d}.mp3`, temiz = `${hedef}.aday${d}.mp3`;
    const kod = execFileSync('curl', ['-sS', '-o', ham, '-w', '%{http_code}', '-X', 'POST',
      `https://api.elevenlabs.io/v1/text-to-speech/${ses.id}?output_format=mp3_44100_192`,
      '-H', 'Content-Type: application/json', ...ANAHTAR, '-d', JSON.stringify(govde)]).toString();
    if (kod !== '200') { console.log(`${r.id} HATA ${kod}: ${fs.readFileSync(ham, 'utf8').slice(0, 300)}`); process.exit(1); }
    kirp(ham, temiz); fs.unlinkSync(ham);
    const duyulan = yaziyaCevir(temiz), dogruluk = benzerlik(r.metin, duyulan), din = dinamik(temiz);
    adaylar.push({ temiz, duyulan, dogruluk, din, puan: dogruluk * 10 + din * .15 });
  }
  adaylar.sort((a, b) => b.puan - a.puan);
  const en = adaylar[0];
  fs.renameSync(en.temiz, hedef); for (const a of adaylar.slice(1)) fs.unlinkSync(a.temiz);
  manifest[r.id] = { ozet, dosya: dosyaAdi(r), hiz: null, sure: sure(hedef), dogruluk: +en.dogruluk.toFixed(2), canlilik: +en.din.toFixed(1), duyulan: en.duyulan };
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`${en.dogruluk >= .85 ? '✓' : '⚠'} ${r.id} ${r.kim.padEnd(8)} ${manifest[r.id].sure.toFixed(2)} sn  doğruluk %${Math.round(en.dogruluk * 100)}  canlılık ${en.din.toFixed(1)}  "${en.duyulan}"`);
}

// Konuşma hızı: ham sesleri ses perdesini koruyarak hızlandır (ElevenLabs'a tekrar istek gitmez)
for (const r of L) {
  const ham = path.join(HAM, dosyaAdi(r)), son = path.join(KLASOR, dosyaAdi(r));
  if (!fs.existsSync(ham)) continue;
  if (fs.existsSync(son) && manifest[r.id] && manifest[r.id].hiz === HIZ) continue;
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', ham, '-af', HIZ === 1 ? 'anull' : `rubberband=tempo=${HIZ}:transients=mixed:detector=compound:window=standard:pitchq=quality`,
    '-c:a', 'libmp3lame', '-b:a', '160k', son]);
  manifest[r.id] = Object.assign(manifest[r.id] || {}, { hiz: HIZ });
}
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));

// Animasyonun okuduğu ses paketi (tarayıcıda dosya:// ile açınca da çalışsın diye base64 gömülü)
const paket = { sure: {}, veri: {} };
for (const r of L) { const f = path.join(KLASOR, dosyaAdi(r)); if (!fs.existsSync(f)) continue; paket.sure[r.id] = sure(f); paket.veri[r.id] = fs.readFileSync(f).toString('base64'); }
fs.writeFileSync(path.join(__dirname, 'ses_paketi.js'), 'window.SES_PAKETI = ' + JSON.stringify(paket) + ';\n');
const top = Object.values(paket.sure).reduce((a, b) => a + b, 0);
console.log(`\nses_paketi.js yazıldı: ${Object.keys(paket.sure).length}/${L.length} replik, toplam konuşma ${top.toFixed(1)} sn`);
