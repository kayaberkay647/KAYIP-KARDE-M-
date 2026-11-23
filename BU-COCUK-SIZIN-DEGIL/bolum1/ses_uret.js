// BU ÇOCUK SİZİN DEĞİL — 1. Bölüm diyaloglarını ElevenLabs ile üretir.
// Kullanım:
//   node ses_uret.js            → eksik veya metni/ayarı değişen replikleri üretir
//   node ses_uret.js --hepsi    → hepsini baştan üretir
//   node ses_uret.js --kontrol  → ayrıca her sesi yazıya çevirip metinle karşılaştırır (telaffuz kontrolü)
// API anahtarı: ELEVENLABS_API_KEY ortam değişkeni (Claude Code bulut oturumunda anahtar otomatik eklenir).
// Çıktılar: ses/B01_Rxx_KIM.mp3 ve ses_paketi.js (animasyonun okuduğu ses paketi)
const fs = require('fs'), path = require('path'), crypto = require('crypto'), { execFileSync } = require('child_process');
const BOLUM = require('./bolum1.js');
const KLASOR = path.join(__dirname, 'ses'), MANIFEST = path.join(KLASOR, 'manifest.json');
const HEPSI = process.argv.includes('--hepsi'), KONTROL = process.argv.includes('--kontrol');
const ANAHTAR = process.env.ELEVENLABS_API_KEY ? ['-H', `xi-api-key: ${process.env.ELEVENLABS_API_KEY}`] : [];
fs.mkdirSync(KLASOR, { recursive: true });
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const dosyaAdi = r => `B0${BOLUM.no}_${r.id}_${r.kim}.mp3`.replace(/^B0(\d\d)/, 'B$1');
const sure = f => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim();

const L = BOLUM.replikler;
for (let i = 0; i < L.length; i++) {
  const r = L[i], ses = BOLUM.sesler[r.kim];
  if (!ses) throw new Error(`${r.id}: "${r.kim}" için ses tanımlı değil`);
  const govde = {
    text: r.metin, model_id: BOLUM.model, voice_settings: ses.ayar,
    previous_text: i > 0 ? L[i - 1].metin : undefined, next_text: i < L.length - 1 ? L[i + 1].metin : undefined,
  };
  const ozet = crypto.createHash('sha1').update(JSON.stringify([ses.id, govde])).digest('hex');
  const hedef = path.join(KLASOR, dosyaAdi(r));
  if (!HEPSI && manifest[r.id] && manifest[r.id].ozet === ozet && fs.existsSync(hedef)) { console.log(`✓ ${r.id} (değişmedi)`); continue; }
  process.stdout.write(`… ${r.id} ${r.kim.padEnd(8)} üretiliyor `);
  const gecici = hedef + '.tmp';
  const kod = execFileSync('curl', ['-sS', '-o', gecici, '-w', '%{http_code}', '-X', 'POST',
    `https://api.elevenlabs.io/v1/text-to-speech/${ses.id}?output_format=mp3_44100_128`,
    '-H', 'Content-Type: application/json', ...ANAHTAR, '-d', JSON.stringify(govde)]).toString();
  if (kod !== '200') { console.log(`HATA ${kod}: ${fs.readFileSync(gecici, 'utf8').slice(0, 300)}`); fs.unlinkSync(gecici); process.exit(1); }
  fs.renameSync(gecici, hedef);
  manifest[r.id] = { ozet, dosya: dosyaAdi(r), sure: sure(hedef) };
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`✓ ${manifest[r.id].sure.toFixed(2)} sn`);
}

if (KONTROL) {
  const sade = s => s.toLocaleLowerCase('tr').replace(/[^a-zçğıöşüâ0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('\nTelaffuz kontrolü (konuşmadan metne):');
  for (const r of L) {
    const out = execFileSync('curl', ['-sS', '-X', 'POST', 'https://api.elevenlabs.io/v1/speech-to-text', ...ANAHTAR,
      '-F', 'model_id=scribe_v1', '-F', 'language_code=tur', '-F', `file=@${path.join(KLASOR, dosyaAdi(r))}`]).toString();
    const duyulan = JSON.parse(out).text || '';
    const a = sade(r.metin).split(' '), b = new Set(sade(duyulan).split(' '));
    const oran = a.filter(w => b.has(w)).length / a.length;
    console.log(`${oran > 0.85 ? '✓' : '⚠'} ${r.id} %${Math.round(oran * 100)}  "${duyulan}"`);
  }
}

// Animasyonun okuduğu ses paketi (tarayıcıda dosya:// ile açınca da çalışsın diye base64 gömülü)
const paket = { sure: {}, veri: {} };
for (const r of L) { const f = path.join(KLASOR, dosyaAdi(r)); if (!fs.existsSync(f)) continue; paket.sure[r.id] = sure(f); paket.veri[r.id] = fs.readFileSync(f).toString('base64'); }
fs.writeFileSync(path.join(__dirname, 'ses_paketi.js'), 'window.SES_PAKETI = ' + JSON.stringify(paket) + ';\n');
const top = Object.values(paket.sure).reduce((a, b) => a + b, 0);
console.log(`\nses_paketi.js yazıldı: ${Object.keys(paket.sure).length}/${L.length} replik, toplam konuşma ${top.toFixed(1)} sn`);
