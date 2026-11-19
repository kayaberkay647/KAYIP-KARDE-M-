const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('HATA', e.message));
  await p.goto('file://' + path.join(__dirname, '..', 'animasyon', 'index.html') + '?render=1');
  await p.waitForFunction(() => window.HAZIR_SAYFA, { timeout: 60000 });
  for (const t of process.argv.slice(2)) {
    const r = await p.evaluate(t => { const a = performance.now(); for (let i = 0; i < 5; i++) kare(+t + i / 30); const b2 = performance.now(); const u = ANA.toDataURL('image/jpeg', 0.94); return [(b2 - a) / 5, performance.now() - b2, u.length]; }, t);
    console.log(t, 'kare:', r[0].toFixed(0) + 'ms', 'jpeg:', r[1].toFixed(0) + 'ms', (r[2] / 1024).toFixed(0) + 'KB');
  }
  await b.close();
})();
