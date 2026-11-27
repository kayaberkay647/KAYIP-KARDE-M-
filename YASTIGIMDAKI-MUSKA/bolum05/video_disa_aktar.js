// YASTIĞIMDAKİ MUSKA — 5. Bölüm'ü dikey MP4 olarak dışa aktarır (görüntü + ses/karisim.wav).
// Kullanım:  node video_disa_aktar.js              → 1080x1920, 30 fps
//            node video_disa_aktar.js 720 1280     → daha hızlı
//            ALTYAZI=0 node video_disa_aktar.js    → altyazısız
// Gerekenler: Node.js, Playwright (Chromium), ffmpeg. Önce: python3 araclar/zaman_cizelgesi.py
const { chromium } = require('playwright'); const path = require('path'); const { spawn } = require('child_process');
const KLASOR = __dirname, GEN = +(process.argv[2] || 1080), YUK = +(process.argv[3] || 1920);
const CIKTI = path.join(KLASOR, process.env.CIKTI || 'YastigimdakiMuska_Bolum5.mp4');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.error('Sayfa hatası:', e.message));
  await p.goto('file://' + path.join(KLASOR, 'index.html') + '?disa=1' + (process.env.ALTYAZI === '0' ? '&altyazi=0' : ''));
  await p.waitForFunction(() => window.HAZIR);
  const { fps, sure } = await p.evaluate(() => ({ fps: ZAMAN.fps, sure: ZAMAN.sure }));
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-i', path.join(KLASOR, 'ses', 'karisim.wav'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'medium', '-profile:v', 'high', '-tune', 'animation', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-shortest', CIKTI], { stdio: ['pipe', 'inherit', 'inherit'] });
  await p.evaluate(([w, h]) => { window._k = tuval(w, h); }, [GEN, YUK]);
  const top = Math.ceil(sure * fps), bas = Date.now();
  for (let f = 0; f < top; f++) {
    const d = await p.evaluate(t => { cizim(t); _k.getContext('2d').drawImage(document.getElementById('c'), 0, 0, _k.width, _k.height); return _k.toDataURL('image/jpeg', .95).split(',')[1]; }, f / fps);
    if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (f % (fps * 10) === 0) console.log(`${Math.round(f / top * 100)}%  (${f}/${top} kare, ${Math.round((Date.now() - bas) / 1000)} sn)`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
  console.log(`Bitti → ${CIKTI}  (${Math.round((Date.now() - bas) / 1000)} sn)`);
})();
