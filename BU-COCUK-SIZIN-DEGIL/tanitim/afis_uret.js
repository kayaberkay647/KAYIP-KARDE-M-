// Dizi afişi: bölümlerin çizim motoruyla (karakterler, mekân) dikey 1080x1920 PNG.
// Kullanım: node afis_uret.js   (gerekenler: Playwright; bolum8/ses_paketi.js mevcut olmalı)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const KOK = path.join(__dirname, '..', 'bolum8'), CIKTI = path.join(__dirname, 'afis.png');
const SAATLER = ['11:00', '15:00', '19:00'];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(KOK, 'index.html') + '?t=0'); await p.waitForTimeout(2500); await p.evaluate(() => window.HAZIR);
  await p.evaluate(async () => { for (const f of ['900 112px Merriweather', 'italic 700 40px Merriweather', '900 40px Roboto', '700 40px Roboto']) await document.fonts.load(f, 'ÇĞİÖŞÜçğıöşü'); });
  const png = await p.evaluate((SAATLER) => {
    for (const k of Object.keys(KAR)) { OLAY.duygu[k] = OLAY.duygu[k] || []; OLAY.poz[k] = OLAY.poz[k] || []; }
    const t = 3.2; S = { t, son: L[0], telefonIsik: false };
    c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'; c.filter = 'none';
    // arka plan: gece salonu, bulanık ve koyu
    c.drawImage(BGB.salon, 0, 0); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgb(120,120,175)'; c.fillRect(0, 0, W, H); c.restore();
    const Y = { gun: 'gece', yon: { ASLI: 540, KEREM: 880, DURU: 230, ELA: 850 } };
    // Kerem: arkada, gölgede
    kisi(c, 'KEREM', 880, 2140, 1.42, durum('KEREM', { ...Y, ozel: { KEREM: { duygu: 'gergin', poz: 'yan', gx: -.8, gy: .2 } } }));
    let g = c.createRadialGradient(880, 900, 60, 880, 900, 520); g.addColorStop(0, 'rgba(10,10,25,.35)'); g.addColorStop(1, 'rgba(10,10,25,.75)'); c.fillStyle = g; c.fillRect(500, 300, 580, 1400);
    isik(c, 300, 760, 600, '#ffcf8a', .22);
    // Aslı: ortada
    kisi(c, 'ASLI', 540, 2440, 1.75, durum('ASLI', { ...Y, ozel: { ASLI: { duygu: 'aglama', poz: 'yan', gx: 0, gy: -.05 } } }));
    // iki kız: önde
    kisi(c, 'DURU', 225, 1890, 1.32, durum('DURU', { ...Y, ozel: { DURU: { duygu: 'endise', poz: 'ayici', gx: .8, gy: -.35 } } }));
    kisi(c, 'ELA', 855, 1890, 1.32, durum('ELA', { ...Y, ozel: { ELA: { duygu: 'merakli', poz: 'yan', gx: -.8, gy: -.35 } } }));
    // üst ve alt karartma
    g = c.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, 'rgba(10,6,5,.95)'); g.addColorStop(.7, 'rgba(10,6,5,.55)'); g.addColorStop(1, 'rgba(10,6,5,0)'); c.fillStyle = g; c.fillRect(0, 0, W, 700);
    g = c.createLinearGradient(0, 1380, 0, H); g.addColorStop(0, 'rgba(10,6,5,0)'); g.addColorStop(.3, 'rgba(10,6,5,.88)'); g.addColorStop(1, 'rgba(10,6,5,.97)'); c.fillStyle = g; c.fillRect(0, 1380, W, H - 1380);
    c.drawImage(VIN, 0, 0);
    // üst etiket + başlık
    rr(c, 360, 150, 360, 60, 30); c.fillStyle = '#d9875f'; c.fill(); yazi(c, 'ANİMASYON DİZİ', 540, 192, '900 30px Roboto', '#fff');
    c.save(); c.textAlign = 'center'; c.lineJoin = 'round'; c.font = '900 118px Merriweather, serif';
    for (const [s, y, r] of [['BU ÇOCUK', 345, '#fff6ea'], ['SİZİN DEĞİL', 475, '#ef8a63']]) { c.lineWidth = 16; c.strokeStyle = '#140c08'; c.strokeText(s, 540, y); c.fillStyle = r; c.fillText(s, 540, y); }
    c.font = 'italic 700 34px Merriweather, serif'; c.lineWidth = 8; const alt = ['“Kızımın kulağı ağrıyordu… doktor', '«Bu çocuk sizin değil» dedi.”'];
    alt.forEach((s, i) => { c.strokeText(s, 540, 550 + i * 46); c.fillStyle = '#f1e4d6'; c.fillText(s, 540, 550 + i * 46); });
    c.restore();
    // DNA sonucu: küçük eğik kâğıt
    c.save(); c.translate(180, 880); c.rotate(-.12); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-118, -64, 246, 140); rr(c, -125, -70, 250, 140, 6); boya(c, '#fbfaf6', 3);
    c.fillStyle = '#3b6e5a'; c.fillRect(-125, -70, 250, 30); yazi(c, 'DNA SONUCU', 0, -48, '900 20px Roboto', '#fff'); yazi(c, 'Annelik olasılığı', 0, -6, '700 20px Roboto', '#5b2a2a'); yazi(c, '%0', 0, 54, '900 56px Roboto', '#c0392b');
    c.strokeStyle = 'rgba(214,40,40,.85)'; c.lineWidth = 5; c.beginPath(); c.ellipse(0, 36, 62, 36, -.05, 0, TAU); c.stroke(); c.restore();
    // yayın saatleri kartı
    rr(c, 70, 1500, 940, 300, 40); c.fillStyle = 'rgba(28,18,13,.86)'; c.fill(); c.strokeStyle = 'rgba(239,138,99,.9)'; c.lineWidth = 4; c.stroke();
    yazi(c, 'HER GÜN YENİ VİDEO', 540, 1578, '900 54px Roboto', '#ef8a63');
    SAATLER.forEach((s, i) => {
      const x = 225 + i * 315, y = 1660; rr(c, x - 135, y - 46, 270, 92, 46); c.fillStyle = '#ef8a63'; c.fill();
      c.strokeStyle = '#fff6ea'; c.lineWidth = 5; c.beginPath(); c.arc(x - 78, y, 22, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(x - 78, y); c.lineTo(x - 78, y - 13); c.moveTo(x - 78, y); c.lineTo(x - 67, y + 6); c.stroke();
      yazi(c, s, x + 22, y + 17, '900 48px Roboto', '#fff');
    });
    const zx = 250, zy = 1750; c.save(); c.translate(zx, zy); c.beginPath(); c.moveTo(-18, 10); c.quadraticCurveTo(-18, -22, 0, -24); c.quadraticCurveTo(18, -22, 18, 10); c.lineTo(24, 16); c.lineTo(-24, 16); c.closePath(); c.fillStyle = '#f2c230'; c.fill(); el(c, 0, 22, 5, 5); c.fill(); c.restore();
    yazi(c, 'Takip et, hiçbir bölümü kaçırma!', 290, 1762, '700 36px Roboto', '#f1e4d6', 'left');
    c.save(); c.globalAlpha = .045; c.globalCompositeOperation = 'overlay'; c.drawImage(GREN[0], 0, 0, W, H); c.restore();
    return document.getElementById('c').toDataURL('image/png');
  }, SAATLER);
  fs.writeFileSync(CIKTI, Buffer.from(png.split(',')[1], 'base64')); await b.close();
  console.log('Bitti → ' + CIKTI);
})();
