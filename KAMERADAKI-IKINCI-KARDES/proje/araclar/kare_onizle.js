// Belirli saniyelerin karelerini PNG olarak kaydeder (kontrol için).
// Kullanım: node kare_onizle.js <çıktı_klasörü> 12 35.5 90 ...
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const [out, ...ts] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ args: ['--disable-web-security', '--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('HATA', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('KONSOL', m.text()); });
  await p.goto('file://' + path.join(__dirname, '..', 'animasyon', 'index.html') + '?render=1');
  await p.waitForFunction(() => window.HAZIR_SAYFA, { timeout: 60000 });
  for (const t of ts) {
    const t0 = Date.now();
    await p.evaluate(t => kare(+t), t);
    const el = await p.$('#c');
    await el.screenshot({ path: path.join(out, `kare_${String(t).padStart(6, '0')}.png`) });
    console.log(t, (Date.now() - t0) + 'ms');
  }
  await b.close();
})();
