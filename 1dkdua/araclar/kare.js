// Belirli saniyelerin karelerini PNG olarak kaydeder (kontrol için).
// node araclar/kare.js videolar/01-imtihan-sahasi cikti_klasoru 0.5 6 12.3 ...
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const { sunucuBaslat } = require('./sunucu');
(async () => {
  const [video, out, ...ts] = process.argv.slice(2);
  const kok = path.resolve(__dirname, '..'); const srv = await sunucuBaslat(kok);
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('SAYFA HATASI:', e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('konsol:', m.text()); });
  await p.goto(`http://127.0.0.1:${srv.port}/${video}/index.html?render=1`);
  await p.waitForFunction(() => window.HAZIR && window.HAZIR(), null, { timeout: 60000 });
  for (const t of ts) {
    const d = await p.evaluate(t => { ciz(+t); return document.getElementById('c').toDataURL('image/png').split(',')[1]; }, t);
    fs.writeFileSync(path.join(out, `t${(+t).toFixed(2).padStart(6, '0')}.png`), Buffer.from(d, 'base64'));
  }
  await b.close(); srv.kapat();
})();
