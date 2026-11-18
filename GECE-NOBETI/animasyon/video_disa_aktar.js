// GECE NÖBETİ — 1. Bölüm'ü dikey MP4 olarak dışa aktarır (görüntü + ses efektleri + ses/ klasöründeki ElevenLabs sesleri).
// Kullanım:  node video_disa_aktar.js            → 1080x1920 (Reels)
//            node video_disa_aktar.js 720 1280   → daha hızlı
//            ALTYAZI=0 node video_disa_aktar.js  → altyazısız
// Gerekenler: Node.js, Playwright (Chromium), ffmpeg.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const KLASOR = __dirname, FPS = 24, GEN = +(process.argv[2] || 1080), YUK = +(process.argv[3] || 1920);
const CIKTI = path.join(KLASOR, process.env.CIKTI || 'GeceNobeti_Bolum1.mp4'), WAV = path.join(KLASOR, '.gecici_ses.wav');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  p.on('pageerror', e => console.error('Sayfa hatası:', e.message));
  await p.goto('file://' + path.join(KLASOR, 'index.html') + '?t=0&disa=1' + (process.env.ALTYAZI === '0' ? '&altyazi=0' : ''));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1500);
  const adlar = await p.evaluate(() => [...new Set(AYAR.replikler.map(r => r.dosya))]);
  const dosyalar = {}; let bulunan = 0;
  for (const ad of adlar) { const f = path.join(KLASOR, 'ses', ad); if (fs.existsSync(f)) { dosyalar[ad] = fs.readFileSync(f).toString('base64'); bulunan++; } }
  console.log(`Diyalog sesleri: ${bulunan}/${adlar.length} bulundu (ses/ klasörü).`);
  fs.writeFileSync(WAV, Buffer.from(await p.evaluate(d => cevrimdisiSes(d), dosyalar), 'base64'));
  console.log('Ses hazır, kareler çiziliyor…');
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', WAV,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-profile:v', 'high', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-shortest', CIKTI], { stdio: ['pipe', 'inherit', 'inherit'] });
  await p.evaluate(([w, h]) => { window._k = document.createElement('canvas'); _k.width = w; _k.height = h; }, [GEN, YUK]);
  const top = 150 * FPS;
  for (let f = 0; f < top; f++) {
    const d = await p.evaluate(t => { cizim(t); _k.getContext('2d').drawImage(document.getElementById('c'), 0, 0, _k.width, _k.height); return _k.toDataURL('image/jpeg', .93).split(',')[1]; }, f / FPS);
    if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (f % (FPS * 10) === 0) console.log(`${Math.round(f / top * 100)}%`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); fs.unlinkSync(WAV);
  console.log(`Bitti → ${CIKTI}`);
})();
