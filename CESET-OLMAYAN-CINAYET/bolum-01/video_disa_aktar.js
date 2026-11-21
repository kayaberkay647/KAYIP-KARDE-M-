// CESET OLMAYAN CİNAYET — 1. Bölüm'ü 1080x1920 / 30 fps MP4 olarak dışa aktarır.
// Kullanım: node video_disa_aktar.js            (altyazılı)
//           ALTYAZI=0 node video_disa_aktar.js  (altyazısız)
//           node video_disa_aktar.js 30 45      (sadece 30–45. saniyeler, deneme için)
// Önce ses miksi: python3 araclar/zamanla.py --mix   Gerekenler: Node.js, Playwright, ffmpeg.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs'); const { spawn } = require('child_process');
const KLASOR = __dirname, FPS = 30;
const altyazi = process.env.ALTYAZI !== '0';
const CIKTI = path.join(KLASOR, altyazi ? 'CesetOlmayanCinayet_Bolum1.mp4' : 'CesetOlmayanCinayet_Bolum1_altyazisiz.mp4');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('HATA', e.message));
  await p.goto('file://' + path.join(KLASOR, 'index.html') + '?kayit=1' + (altyazi ? '' : '&altyazi=0'));
  await p.waitForFunction(() => window.HAZIR);
  const SURE = await p.evaluate(() => SURE);
  const bas = +(process.argv[2] || 0), son = +(process.argv[3] || SURE);
  const cikti = process.argv[2] ? CIKTI.replace('.mp4', `_${bas}-${son}.mp4`) : CIKTI;
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-ss', String(bas), '-t', String(son - bas), '-i', path.join(KLASOR, '.bolum_ses.wav'),
    '-vf', 'hqdn3d=1.5:1.5:3:3', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '21', '-maxrate', '12M', '-bufsize', '24M', '-preset', 'slow', '-tune', 'animation', '-profile:v', 'high', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '192k', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-shortest', '-movflags', '+faststart', cikti], { stdio: ['pipe', 'inherit', 'inherit'] });
  const f0 = Math.round(bas * FPS), f1 = Math.round(son * FPS);
  for (let f = f0; f < f1; f++) {
    const d = await p.evaluate(t => { const cv = document.getElementById('sahne'); cizim(t, cv.getContext('2d')); return cv.toDataURL('image/jpeg', .93).split(',')[1]; }, f / FPS);
    if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - f0) % 150 === 0) console.log(`${Math.round((f - f0) / (f1 - f0) * 100)}%  (${(f / FPS).toFixed(1)} sn)`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
  console.log('Bitti →', cikti);
})();
