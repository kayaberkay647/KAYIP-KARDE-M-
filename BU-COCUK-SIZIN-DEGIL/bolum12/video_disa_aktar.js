// BU ÇOCUK SİZİN DEĞİL — 2. Bölüm'ü dikey MP4 (1080x1920) olarak dışa aktarır.
// Kullanım:  node video_disa_aktar.js              → 1080x1920
//            node video_disa_aktar.js 720 1280     → daha hızlı önizleme
//            ALTYAZI=0 node video_disa_aktar.js    → altyazısız
// Gerekenler: Node.js, Playwright (Chromium), ffmpeg. Önce: node ses_uret.js
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const KLASOR = __dirname, FPS = 30, GEN = +(process.argv[2] || 1080), YUK = +(process.argv[3] || 1920);
const CIKTI = path.join(KLASOR, 'BuCocukSizinDegil_Bolum12.mp4'), WAV = path.join(KLASOR, '.gecici_ses.wav');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(KLASOR, 'index.html') + '?t=0' + (process.env.ALTYAZI === '0' ? '&altyazi=0' : ''));
  await p.waitForTimeout(2500); await p.evaluate(() => window.HAZIR);
  const toplam = await p.evaluate(() => TOPLAM_SURE());
  fs.writeFileSync(WAV, Buffer.from(await p.evaluate(() => cevrimdisiSes()), 'base64'));
  console.log(`Ses hazır (${toplam.toFixed(1)} sn). Kareler çiziliyor…`);
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', WAV,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', CIKTI], { stdio: ['pipe', 'inherit', 'inherit'] });
  await p.evaluate(([w, h]) => { window._k = document.createElement('canvas'); _k.width = w; _k.height = h; }, [GEN, YUK]);
  const top = Math.ceil(toplam * FPS);
  for (let f = 0; f < top; f++) {
    const d = await p.evaluate(t => { cizim(t); _k.getContext('2d').drawImage(document.getElementById('c'), 0, 0, _k.width, _k.height); return _k.toDataURL('image/jpeg', .92).split(',')[1]; }, f / FPS);
    if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (f % (FPS * 10) === 0) process.stdout.write(`\r%${Math.round(f / top * 100)}`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); fs.unlinkSync(WAV);
  console.log(`\nBitti → ${CIKTI}`);
})();
