// KAMERADAKİ İKİNCİ KARDEŞ — 1. Bölüm
// Adım 3: animasyonu kare kare çizer (1080x1920, 30 fps), paralel işçilerle H.264'e kodlar, sesi ekler.
// Kullanım: node 3_render.js [işçi_sayısı=4]   |   ALTYAZI=0 node 3_render.js  (altyazısız)
// Gerekenler: Node.js, Playwright (Chromium), ffmpeg
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs'); const { spawn, execFileSync } = require('child_process');
const KOK = path.join(__dirname, '..');
const FPS = 30, SURE = 150, TOPLAM = FPS * SURE;
const ISCI = +(process.argv[2] || 4);
const CIKTI_KLASOR = path.join(KOK, '..', 'cikti');
const GECICI = path.join(KOK, '.render_gecici');
const SES = path.join(KOK, 'ses', 'bolum_01_ses.wav');
const CIKTI = path.join(CIKTI_KLASOR, process.env.ALTYAZI === '0' ? 'kameradaki_ikinci_kardes_bolum_01_altyazisiz.mp4' : 'kameradaki_ikinci_kardes_bolum_01.mp4');
fs.mkdirSync(GECICI, { recursive: true }); fs.mkdirSync(CIKTI_KLASOR, { recursive: true });

async function isci(no, a, b, ilerleme) {
  const tarayici = await chromium.launch();
  const p = await tarayici.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log(`[${no}] HATA`, e.message));
  await p.goto('file://' + path.join(KOK, 'animasyon', 'index.html') + '?render=1' + (process.env.ALTYAZI === '0' ? '&altyazi=0' : ''));
  await p.waitForFunction(() => window.HAZIR_SAYFA, { timeout: 60000 });
  const seg = path.join(GECICI, `parca_${no}.mp4`);
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-tune', 'animation', '-crf', '18', '-maxrate', '16M', '-bufsize', '32M', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-r', String(FPS), seg], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = a; f < b; f++) {
    const d = await p.evaluate(t => { kare(t); return ANA.toDataURL('image/jpeg', 0.95).split(',')[1]; }, f / FPS);
    if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    ilerleme[no] = f - a + 1;
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  await tarayici.close();
  return seg;
}

(async () => {
  if (!fs.existsSync(SES)) { console.error('Ses dosyası yok: önce 1_diyalog_uret.py ve 2_ses_mix.py çalıştır.'); process.exit(1); }
  const t0 = Date.now(), ilerleme = new Array(ISCI).fill(0);
  const sinir = [...Array(ISCI + 1)].map((_, i) => Math.round(i * TOPLAM / ISCI));
  const zaman = setInterval(() => { const n = ilerleme.reduce((x, y) => x + y, 0); const s = (Date.now() - t0) / 1000; process.stdout.write(`\r${n}/${TOPLAM} kare  ${(n / TOPLAM * 100).toFixed(1)}%  ${s.toFixed(0)} sn  (kalan ~${n ? ((TOPLAM - n) * s / n).toFixed(0) : '?'} sn)   `); }, 5000);
  const parcalar = await Promise.all([...Array(ISCI)].map((_, i) => isci(i, sinir[i], sinir[i + 1], ilerleme)));
  clearInterval(zaman);
  const liste = path.join(GECICI, 'liste.txt');
  fs.writeFileSync(liste, parcalar.map(p => `file '${p}'`).join('\n'));
  console.log('\nBirleştiriliyor + ses ekleniyor…');
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', liste, '-i', SES,
    '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-t', String(SURE), '-movflags', '+faststart', CIKTI], { stdio: 'inherit' });
  for (const p of parcalar) fs.unlinkSync(p); fs.unlinkSync(liste); fs.rmdirSync(GECICI);
  console.log(`Bitti → ${CIKTI}  (${((Date.now() - t0) / 60000).toFixed(1)} dk)`);
})();
