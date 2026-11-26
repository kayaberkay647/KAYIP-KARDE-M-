// Her çekimden kare alır: node araclar/onizle.js <çıktı_klasörü> [konum 0-1 = .55] [çekim kimlikleri...]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const KLASOR = path.dirname(__dirname);
(async () => {
  const cikti = process.argv[2] || '/tmp/onizle', konum = +(process.argv[3] || .55), secili = process.argv.slice(4);
  fs.mkdirSync(cikti, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.error('Sayfa hatası:', e.message)); p.on('console', m => { if (m.type() === 'error') console.error(m.text()); });
  await p.goto('file://' + path.join(KLASOR, 'index.html') + '?disa=1');
  await p.waitForFunction(() => window.HAZIR);
  const cekimler = await p.evaluate(() => ZAMAN.cekimler);
  for (const c of cekimler) {
    if (secili.length && !secili.includes(c.id)) continue;
    const t = c.t0 + (c.t1 - c.t0) * konum;
    const d = await p.evaluate(t => { const s = performance.now(); cizim(t); const k = tuval(540, 960); k.getContext('2d').drawImage(document.getElementById('c'), 0, 0, 540, 960); return [k.toDataURL('image/jpeg', .85).split(',')[1], performance.now() - s]; }, t);
    fs.writeFileSync(path.join(cikti, `${c.id}.jpg`), Buffer.from(d[0], 'base64'));
    console.log(c.id, t.toFixed(2), Math.round(d[1]) + 'ms');
  }
  await b.close();
})();
