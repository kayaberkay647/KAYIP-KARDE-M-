// Instagram story tanıtımı: 1. bölümün çizim motoruyla (karakterler, mekân) 1080x1920 PNG + 8 sn müzikli MP4.
// Kullanım: node story_uret.js   (gerekenler: Playwright, ffmpeg; önce bolum1/ses_uret.js çalışmış olmalı)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { spawn, execFileSync } = require('child_process');
const KOK = path.join(__dirname, '..', 'bolum1'), CIKTI = __dirname, FPS = 30, SURE = 8;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(KOK, 'index.html') + '?t=0'); await p.waitForTimeout(2500); await p.evaluate(() => window.HAZIR);
  await p.evaluate(() => {
    window.storyCiz = (t) => {
      S = { t, son: L[0], telefonIsik: true };
      c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'; c.filter = 'none';
      // arka plan: gece salonu, çok hafif yakınlaşma
      c.save(); kam(c, 540, 900, 1.04 + t * .006); c.drawImage(BG.salon, 0, 0);
      const Y = { gun: 'gece', yon: { ASLI: 420, DURU: 690, KEREM: 880 } };
      kisi(c, 'KEREM', 880, 1360, .82, durum('KEREM', { ...Y, ozel: { KEREM: { duygu: 'gergin', poz: 'telefon', gy: .9, gx: .1 } } }));
      kisi(c, 'DURU', 690, 1430, .95, durum('DURU', { ...Y, ozel: { DURU: { duygu: 'uykulu', poz: 'ayici', gx: -.7, gy: -.3 } } }));
      kisi(c, 'ASLI', 420, 1430, .95, durum('ASLI', { ...Y, ozel: { ASLI: { duygu: 'endise', poz: 'basOksa', gx: .9, gy: 0 } } }));
      c.restore();
      c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgb(150,156,205)'; c.fillRect(0, 0, W, H); c.restore();
      isik(c, 880, 1150, 220, '#bcd4ff', .35);
      // üst ve alt karartma (yazılar okunaklı olsun)
      let g = c.createLinearGradient(0, 0, 0, 620); g.addColorStop(0, 'rgba(12,8,6,.92)'); g.addColorStop(1, 'rgba(12,8,6,0)'); c.fillStyle = g; c.fillRect(0, 0, W, 620);
      g = c.createLinearGradient(0, 1280, 0, H); g.addColorStop(0, 'rgba(12,8,6,0)'); g.addColorStop(.35, 'rgba(12,8,6,.85)'); g.addColorStop(1, 'rgba(12,8,6,.95)'); c.fillStyle = g; c.fillRect(0, 1280, W, H);
      c.drawImage(VIN, 0, 0);
      const gir = k => ss(clamp((t - k) / .5));
      // üst etiket
      c.save(); c.globalAlpha = gir(0); rr(c, 370, 210, 340, 64, 32); c.fillStyle = '#d9875f'; c.fill(); yazi(c, 'YENİ DİZİ', 540, 254, '900 34px Roboto', '#fff'); c.restore();
      // başlık
      c.save(); c.globalAlpha = gir(.2); c.textAlign = 'center'; c.lineJoin = 'round'; c.font = '900 112px Merriweather, serif';
      for (const [s, y, r] of [['BU ÇOCUK', 400, '#fff6ea'], ['SİZİN DEĞİL', 520, '#ef8a63']]) { c.lineWidth = 14; c.strokeStyle = '#1b100b'; c.strokeText(s, 540, y); c.fillStyle = r; c.fillText(s, 540, y); }
      c.font = 'italic 700 40px Merriweather, serif'; c.fillStyle = '#e9ddd0'; c.fillText('Bir annenin sarsıcı gerçeği', 540, 590); c.restore();
      // bilgi kartı
      c.save(); c.globalAlpha = gir(.7); rr(c, 90, 1390, 900, 300, 36); c.fillStyle = 'rgba(30,20,15,.78)'; c.fill(); c.strokeStyle = 'rgba(239,138,99,.8)'; c.lineWidth = 3; c.stroke();
      yazi(c, '1. BÖLÜM YAYINDA', 540, 1462, '900 52px Roboto', '#ef8a63');
      // saat simgesi + metin
      const sx = 214, sy = 1546; c.strokeStyle = '#fff6ea'; c.lineWidth = 6; c.beginPath(); c.arc(sx, sy, 30, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx, sy - 18); c.moveTo(sx, sy); c.lineTo(sx + 14, sy + 8); c.stroke();
      yazi(c, 'Her akşam 21:00\'de yeni bölüm', 266, 1560, '700 44px Roboto', '#fff6ea', 'left');
      const nab = 1 + Math.sin(t * 5) * .03; c.save(); c.translate(540, 1636); c.scale(nab, nab); rr(c, -330, -36, 660, 72, 36); c.fillStyle = '#ef8a63'; c.fill(); yazi(c, '2. Bölüm: Bu akşam 21:00', 0, 14, '900 40px Roboto', '#fff'); c.restore();
      c.restore();
      // zil + yönlendirme (Instagram alt çubuğunun üstünde)
      c.save(); c.globalAlpha = gir(1.1); const zx = 330, zy = 1745, sal = Math.sin(t * 9) * .2 * (t % 2 < .7 ? 1 : 0); c.translate(zx, zy); c.rotate(sal);
      c.beginPath(); c.moveTo(-20, 12); c.quadraticCurveTo(-20, -24, 0, -26); c.quadraticCurveTo(20, -24, 20, 12); c.lineTo(26, 18); c.lineTo(-26, 18); c.closePath(); c.fillStyle = '#f2c230'; c.fill(); el(c, 0, 24, 6, 6); c.fill(); c.restore();
      c.save(); c.globalAlpha = gir(1.1); yazi(c, 'Takip et, bildirimleri aç', 372, 1756, '700 36px Roboto', '#e9ddd0', 'left'); c.restore();
      c.save(); c.globalAlpha = .045; c.globalCompositeOperation = 'overlay'; c.drawImage(GREN[Math.floor(t * 24) % 6], 0, 0, W, H); c.restore();
    };
  });
  const kare = async t => Buffer.from((await p.evaluate(t => { storyCiz(t); return document.getElementById('c').toDataURL('image/png'); }, t)).split(',')[1], 'base64');
  fs.writeFileSync(path.join(CIKTI, 'story_bolum1.png'), await kare(2.5));
  // müzik: fon müziğinin ilk 8 saniyesi, giriş/çıkış yumuşak
  const wav = path.join(CIKTI, '.story_muzik.wav');
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', path.join(KOK, 'ses', 'muzik.mp3'), '-t', String(SURE), '-af', `afade=t=in:d=0.8,afade=t=out:st=${SURE - 1.2}:d=1.2,volume=0.9`, wav]);
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-', '-i', wav, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '19', '-preset', 'medium', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', path.join(CIKTI, 'story_bolum1.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < SURE * FPS; f++) { if (!ff.stdin.write(await kare(f / FPS))) await new Promise(r => ff.stdin.once('drain', r)); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); fs.unlinkSync(wav); await b.close();
  console.log('Bitti → story_bolum1.png, story_bolum1.mp4');
})();
