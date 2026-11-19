// 1dkdua — kareleri paralel çizip sessiz MP4 üretir (ses ayrıca eklenir: araclar/birlestir.sh)
// node araclar/render.js videolar/01-imtihan-sahasi cikti.mp4 [isci=4] [bas_sn] [bit_sn]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const { sunucuBaslat } = require('./sunucu');
const FPS = 30;
(async () => {
  const [video, cikti, isciS = '4', basS, bitS] = process.argv.slice(2);
  const ISCI = +isciS; const kok = path.resolve(__dirname, '..'); const srv = await sunucuBaslat(kok);
  const b = await chromium.launch({ args: ['--disable-gpu-vsync', '--disable-background-timer-throttling'] });
  const sayfalar = [];
  for (let i = 0; i < ISCI; i++) {
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
    p.on('pageerror', e => console.log('SAYFA HATASI:', e.message));
    await p.goto(`http://127.0.0.1:${srv.port}/${video}/index.html?render=1`);
    await p.waitForFunction(() => window.HAZIR && window.HAZIR(), null, { timeout: 60000 });
    sayfalar.push(p);
  }
  const sure = await sayfalar[0].evaluate(() => SURE);
  const f0 = Math.round((+basS || 0) * FPS), f1 = Math.round((bitS ? +bitS : sure) * FPS);
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-vf', 'scale=in_range=full:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-tune', 'animation', '-profile:v', 'high', '-r', String(FPS),
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv', '-movflags', '+faststart', cikti], { stdio: ['pipe', 'inherit', 'inherit'] });
  const bekleyen = new Map(); let siradaki = f0, dagit = f0; const bas = Date.now();
  const yaz = async () => {
    while (bekleyen.has(siradaki)) {
      const buf = bekleyen.get(siradaki); bekleyen.delete(siradaki); siradaki++;
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (siradaki % FPS === 0) process.stdout.write(`\r${((siradaki - f0) / (f1 - f0) * 100).toFixed(1)}%  ${(siradaki / FPS).toFixed(1)} sn  (${((Date.now() - bas) / 1000).toFixed(0)} sn geçti)   `);
    }
  };
  let yaziyor = Promise.resolve();
  await Promise.all(sayfalar.map(async p => {
    while (true) {
      const f = dagit++; if (f >= f1) break;
      while (f - siradaki > 90) await new Promise(r => setTimeout(r, 20));
      const d = await p.evaluate(t => { ciz(t); return document.getElementById('c').toDataURL('image/jpeg', .95).split(',')[1]; }, f / FPS);
      bekleyen.set(f, Buffer.from(d, 'base64'));
      yaziyor = yaziyor.then(yaz);
    }
  }));
  await yaziyor; ff.stdin.end(); await new Promise(r => ff.on('close', r));
  await b.close(); srv.kapat();
  console.log(`\nBitti → ${cikti}  (${f1 - f0} kare, ${((Date.now() - bas) / 1000).toFixed(0)} sn)`);
})();
