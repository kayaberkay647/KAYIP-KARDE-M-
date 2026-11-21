// MEKÂN — 4 numaralı daire. Dünya: 2400 x 1920. Duvar 0–1180, zemin 1180–1920. Plan bütün sahnelerde aynıdır.
const DUNYA_W = 2400, DUVAR_Y = 1180;
const YER = { kapi: [190, 530], saat: [705, 300], pencere: [900, 1500], kanepe: [850, 1550], yatakKapi: [1700, 1960], mutfakKapi: [2060, 2330],
  sandalye: [600, 1565], kan: [800, 1640], cerceve: [990, 1715], anahtar: [705, 1665] };
// derinliğe göre ölçek (zemindeki y)
const olcek = y => .72 + (y - DUVAR_Y) * .00056;

function kamera(c, cx, cy, z) { c.setTransform(z, 0, 0, z, W / 2 - cx * z, H / 2 - cy * z); }

function duvarCiz(c, o) {
  const g = c.createLinearGradient(0, 0, 0, DUVAR_Y); g.addColorStop(0, '#e6d6bc'); g.addColorStop(1, '#efe2cb');
  c.fillStyle = g; c.fillRect(-400, -200, DUNYA_W + 800, DUVAR_Y + 200);
  // ince desen
  c.fillStyle = 'rgba(170,140,100,.10)';
  for (let y = 40; y < DUVAR_Y - 60; y += 70) for (let x = -400 + ((y / 70) % 2) * 35; x < DUNYA_W + 400; x += 70) { c.beginPath(); c.moveTo(x, y - 7); c.lineTo(x + 5, y); c.lineTo(x, y + 7); c.lineTo(x - 5, y); c.fill(); }
  // tavan pervazı, süpürgelik
  c.fillStyle = '#f5ecdc'; c.fillRect(-400, 40, DUNYA_W + 800, 26); c.fillStyle = 'rgba(120,90,60,.18)'; c.fillRect(-400, 66, DUNYA_W + 800, 6);
  c.fillStyle = '#7d5638'; c.fillRect(-400, DUVAR_Y - 34, DUNYA_W + 800, 34); c.fillStyle = '#946845'; c.fillRect(-400, DUVAR_Y - 34, DUNYA_W + 800, 6);
}
function zeminCiz(c) {
  const g = c.createLinearGradient(0, DUVAR_Y, 0, 1920); g.addColorStop(0, '#8a603f'); g.addColorStop(1, '#a87a52');
  c.fillStyle = g; c.fillRect(-400, DUVAR_Y, DUNYA_W + 800, 1100);
  c.strokeStyle = 'rgba(60,35,20,.28)'; c.lineWidth = 3; const vx = 1200, vy = 260;
  for (let x = -1400; x < 3800; x += 120) { c.beginPath(); c.moveTo(lerp(vx, x, (DUVAR_Y - vy) / (2400 - vy)), DUVAR_Y); c.lineTo(x, 2400); c.stroke(); }
  c.strokeStyle = 'rgba(60,35,20,.14)'; for (let y = DUVAR_Y + 40, d = 40; y < 2000; d *= 1.18, y += d) { c.beginPath(); c.moveTo(-400, y); c.lineTo(DUNYA_W + 400, y); c.stroke(); }
  // halı
  c.save(); c.beginPath(); c.moveTo(780, 1330); c.lineTo(1620, 1330); c.lineTo(1760, 1760); c.lineTo(640, 1760); c.closePath();
  c.fillStyle = '#8e4a40'; c.fill(); c.strokeStyle = '#6a332c'; c.lineWidth = 6; c.stroke(); c.clip();
  c.strokeStyle = 'rgba(240,210,170,.35)'; c.lineWidth = 5; c.beginPath(); c.moveTo(820, 1360); c.lineTo(1580, 1360); c.lineTo(1710, 1730); c.lineTo(690, 1730); c.closePath(); c.stroke();
  c.fillStyle = 'rgba(240,210,170,.22)'; for (let i = 0; i < 5; i++) { const x = 900 + i * 150, y = 1545; c.beginPath(); c.moveTo(x, y - 60); c.lineTo(x + 50, y); c.lineTo(x, y + 60); c.lineTo(x - 50, y); c.fill(); }
  c.restore();
}
function kapiCiz(c, o, t) {
  const [x0, x1] = YER.kapi, y0 = 380, w = x1 - x0, k = o.kapiAcik || 0;
  // kasa
  c.fillStyle = '#6b4529'; c.fillRect(x0 - 26, y0 - 26, w + 52, DUVAR_Y - y0 + 26);
  // merdiven boşluğu (kapı açıksa görünür)
  c.save(); c.beginPath(); c.rect(x0, y0, w, DUVAR_Y - y0); c.clip();
  const g = c.createLinearGradient(0, y0, 0, DUVAR_Y); g.addColorStop(0, '#9aa6b4'); g.addColorStop(1, '#6b7684'); c.fillStyle = g; c.fillRect(x0, y0, w, DUVAR_Y - y0);
  c.fillStyle = '#56606c'; for (let i = 0; i < 8; i++) { c.fillRect(x0, DUVAR_Y - 60 - i * 70, w * .5 + i * 20, 10); }
  c.strokeStyle = '#3b4148'; c.lineWidth = 8; c.beginPath(); c.moveTo(x0, 860); c.lineTo(x1, 560); c.stroke(); c.lineWidth = 4;
  for (let i = 0; i < 6; i++) { const xx = x0 + 30 + i * 55; c.beginPath(); c.moveTo(xx, 860 - (xx - x0) * .88); c.lineTo(xx, 1000 - (xx - x0) * .88); c.stroke(); }
  c.fillStyle = 'rgba(230,240,255,.25)'; c.fillRect(x0 + w * .3, y0, w * .4, 30);
  if (o.golgeMerdiven) { c.fillStyle = `rgba(20,22,28,${o.golgeMerdiven})`; c.beginPath(); c.ellipse(x0 + w * .6, 760, 50, 150, 0, 0, 7); c.fill(); }
  c.restore();
  // kapı kanadı (menteşe solda)
  const lw = w * (1 - .78 * k), sk = 40 * k;
  c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0 + lw, y0 + sk); c.lineTo(x0 + lw, DUVAR_Y - sk * .5); c.lineTo(x0, DUVAR_Y); c.closePath();
  const kg = c.createLinearGradient(x0, 0, x0 + lw, 0); kg.addColorStop(0, '#8d5d39'); kg.addColorStop(1, k > 0 ? '#6e4529' : '#80522f');
  c.fillStyle = kg; c.fill(); c.strokeStyle = '#4a2e1a'; c.lineWidth = 4; c.stroke();
  if (k < .9) {
    c.strokeStyle = 'rgba(60,35,20,.45)'; c.lineWidth = 4;
    for (const [a, b] of [[.08, .44], [.52, .94]]) { c.strokeRect(x0 + lw * .14, y0 + (DUVAR_Y - y0) * a + sk * .5, lw * .72, (DUVAR_Y - y0) * (b - a) - sk); }
    // kol (içeriden)
    const kx = x0 + lw * .86, ky = 800 + (o.kolSars || 0) * 3;
    c.fillStyle = '#c9a65a'; yd(c, kx - 10, ky - 34, 20, 68, 8); c.fill(); c.fillStyle = '#e0c27a'; yd(c, kx - 44 * (1 - k), ky - 8, 44 * (1 - k) + 6, 14, 6); c.fill();
  }
  if (k > 0) { c.fillStyle = `rgba(200,215,235,${.18 * k})`; c.beginPath(); c.moveTo(x0, DUVAR_Y); c.lineTo(x1, DUVAR_Y); c.lineTo(x1 + 260, 1700); c.lineTo(x0 - 80, 1700); c.fill(); }
}
function saatDuvar(c, o, t) {
  const [x, y] = YER.saat, r = 54;
  c.fillStyle = 'rgba(60,40,20,.18)'; c.beginPath(); c.arc(x + 6, y + 8, r + 8, 0, 7); c.fill();
  c.beginPath(); c.arc(x, y, r + 8, 0, 7); c.fillStyle = '#6b4529'; c.fill();
  c.beginPath(); c.arc(x, y, r, 0, 7); c.fillStyle = '#f7f1e4'; c.fill();
  c.fillStyle = '#333'; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; c.fillRect(x + Math.cos(a) * r * .82 - 2, y + Math.sin(a) * r * .82 - 2, 4, 4); }
  const sa = o.saat || 23.4, h = sa % 12, m = (sa % 1) * 60, sn = t * 6;
  c.strokeStyle = '#222'; c.lineCap = 'round';
  c.lineWidth = 6; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(h / 12 * 6.283) * r * .5, y - Math.cos(h / 12 * 6.283) * r * .5); c.stroke();
  c.lineWidth = 4; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(m / 60 * 6.283) * r * .75, y - Math.cos(m / 60 * 6.283) * r * .75); c.stroke();
  c.strokeStyle = '#b33'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(Math.floor(sn) / 60 * 6.283) * r * .8, y - Math.cos(Math.floor(sn) / 60 * 6.283) * r * .8); c.stroke();
}
function cerceveDuvar(c, x, y, w, h, kim) {
  c.fillStyle = 'rgba(60,40,20,.2)'; c.fillRect(x + 6, y + 8, w, h);
  c.fillStyle = '#5a3a24'; c.fillRect(x, y, w, h); c.fillStyle = '#f2ead8'; c.fillRect(x + 10, y + 10, w - 20, h - 20);
  c.save(); c.beginPath(); c.rect(x + 18, y + 18, w - 36, h - 36); c.clip();
  c.fillStyle = kim === 'deniz' ? '#9fc2d6' : '#d9c7a8'; c.fillRect(x, y, w, h);
  if (kim === 'cift') { // Aylin ve Emir fotoğrafı
    kisiCiz(c, 'EMIR', { x: x + w * .62, y: y + h * 1.9, s: h / 520, duygu: 'sicak', agizKapali: 1, don: -.25 }, 0);
    kisiCiz(c, 'AYLIN', { x: x + w * .36, y: y + h * 1.95, s: h / 520, duygu: 'sicak', agizKapali: 1, don: .25 }, 0);
  } else if (kim === 'deniz') { c.fillStyle = '#5d87a3'; c.fillRect(x, y + h * .55, w, h); c.fillStyle = '#e8d9a8'; c.beginPath(); c.arc(x + w * .7, y + h * .35, h * .1, 0, 7); c.fill(); }
  c.restore();
}
function pencereCiz(c, o, t) {
  const [x0, x1] = YER.pencere, y0 = 290, y1 = 920;
  c.fillStyle = '#f1e9da'; c.fillRect(x0 - 30, y0 - 30, x1 - x0 + 60, y1 - y0 + 60);
  c.save(); c.beginPath(); c.rect(x0, y0, x1 - x0, y1 - y0); c.clip();
  const g = c.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#16233a'); g.addColorStop(1, '#2c4363'); c.fillStyle = g; c.fillRect(x0, y0, x1 - x0, y1 - y0);
  // karşı binalar
  c.fillStyle = '#1b2840'; for (let i = 0; i < 7; i++) { const bx = x0 - 40 + i * 100, bh = 260 + hash(i + 3) * 260; c.fillRect(bx, y1 - bh, 92, bh); }
  for (let i = 0; i < 40; i++) { const bx = x0 - 20 + hash(i) * 640, by = y1 - 40 - hash(i + 9) * 420; if (hash(i * 2.3) > .55) { c.fillStyle = 'rgba(255,205,130,.55)'; c.fillRect(bx, by, 14, 18); } }
  // polis ışıkları
  if (o.polis) { const a = (Math.sin(t * 9) > 0 ? 1 : 0); c.fillStyle = a ? `rgba(60,110,255,${.35 * o.polis})` : `rgba(255,50,60,${.3 * o.polis})`; c.fillRect(x0, y0, x1 - x0, y1 - y0); }
  // yağmur
  c.strokeStyle = 'rgba(190,210,240,.35)'; c.lineWidth = 2;
  for (let i = 0; i < 70; i++) { const rx = x0 + hash(i) * 640, sp = 900 + hash(i + 50) * 500, ry = y0 + frac(t * sp / 700 + hash(i + 7)) * 700; c.beginPath(); c.moveTo(rx, ry); c.lineTo(rx - 6, ry + 28); c.stroke(); }
  // camdaki damlalar
  c.fillStyle = 'rgba(200,220,245,.35)'; for (let i = 0; i < 30; i++) { const dx = x0 + hash(i + 100) * 600, dy = y0 + frac(hash(i + 200) + t * .03 * hash(i)) * 630; c.beginPath(); c.ellipse(dx, dy, 3, 5, 0, 0, 7); c.fill(); }
  c.fillStyle = 'rgba(255,255,255,.05)'; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0 + 220, y0); c.lineTo(x0 + 40, y1); c.lineTo(x0, y1); c.fill();
  c.restore();
  // kasa ve kayıt
  c.fillStyle = '#efe7d6'; c.fillRect((x0 + x1) / 2 - 10, y0, 20, y1 - y0); c.fillRect(x0, (y0 + y1) / 2 - 10, x1 - x0, 20);
  c.strokeStyle = '#c9bca2'; c.lineWidth = 4; c.strokeRect(x0, y0, x1 - x0, y1 - y0);
  c.fillStyle = '#e3d8c2'; c.fillRect(x0 - 50, y1 + 20, x1 - x0 + 100, 22);
  // perdeler
  for (const s of [-1, 1]) {
    const bx = s < 0 ? x0 - 80 : x1 + 80, sw = gurultu(t * .4, s + 5) * 6;
    c.beginPath(); c.moveTo(bx - s * 0, 230); c.lineTo(bx + s * -160, 230); c.quadraticCurveTo(bx + s * -150 + sw, 600, bx + s * -120 + sw, 1000); c.lineTo(bx + s * 20, 1000); c.closePath();
    const pg = c.createLinearGradient(bx - 160, 0, bx + 160, 0); pg.addColorStop(0, '#b98f86'); pg.addColorStop(.5, '#d4aea4'); pg.addColorStop(1, '#a8807a');
    c.fillStyle = pg; c.fill(); c.strokeStyle = '#8a6560'; c.lineWidth = 3; c.stroke();
    c.strokeStyle = 'rgba(120,80,75,.4)'; c.lineWidth = 4; for (let i = 1; i < 4; i++) { const fx = bx + s * -40 * i; c.beginPath(); c.moveTo(fx, 240); c.quadraticCurveTo(fx + sw, 600, fx + s * 10 + sw, 995); c.stroke(); }
  }
  c.fillStyle = '#6b4529'; c.fillRect(x0 - 260, 218, x1 - x0 + 520, 14);
}
function lambaCiz(c, o, t) {
  const x = 790; c.strokeStyle = '#3a3330'; c.lineWidth = 8; c.beginPath(); c.moveTo(x, 640); c.lineTo(x, 1225); c.stroke();
  c.fillStyle = '#3a3330'; c.beginPath(); c.ellipse(x, 1228, 50, 12, 0, 0, 7); c.fill();
  c.beginPath(); c.moveTo(x - 70, 650); c.lineTo(x + 70, 650); c.lineTo(x + 46, 560); c.lineTo(x - 46, 560); c.closePath(); c.fillStyle = '#f3dcae'; c.fill(); c.strokeStyle = '#c9a670'; c.lineWidth = 3; c.stroke();
}
function kanepeCiz(c, o) {
  const [x0, x1] = YER.kanepe, ye = 1250, kc = '#2f5a4b';
  c.fillStyle = 'rgba(20,15,10,.3)'; c.beginPath(); c.ellipse((x0 + x1) / 2, ye, (x1 - x0) / 2 + 30, 26, 0, 0, 7); c.fill();
  yd(c, x0 + 20, 880, x1 - x0 - 40, 260, 40); konturlu(c, renk(kc, -.08), 4);
  for (let i = 0; i < 3; i++) { yd(c, x0 + 70 + i * 200, 905, 190, 190, 30); konturlu(c, renk(kc, .06), 3); }
  yd(c, x0 + 40, 1080, x1 - x0 - 80, 120, 26); konturlu(c, kc, 4);
  for (const s of [0, 1]) { yd(c, s ? x1 - 110 : x0, 960, 110, 260, 40); konturlu(c, renk(kc, -.04), 4); }
  c.fillStyle = '#3a2618'; for (const x of [x0 + 30, x1 - 50]) c.fillRect(x, 1218, 20, 32);
  c.save(); c.translate(x0 + 170, 1040); c.rotate(-.15); yd(c, -55, -55, 110, 100, 22); konturlu(c, '#e9dcc3', 3); c.restore();
}
function sehpaCiz(c) {
  c.fillStyle = 'rgba(20,15,10,.28)'; c.beginPath(); c.ellipse(1200, 1438, 230, 22, 0, 0, 7); c.fill();
  c.fillStyle = '#5c3b24'; for (const x of [1010, 1370]) c.fillRect(x, 1320, 22, 112);
  yd(c, 990, 1296, 420, 34, 10); konturlu(c, '#7a5032', 3);
  yd(c, 1060, 1276, 70, 22, 4); c.fillStyle = '#c94'; c.fill();
  c.fillStyle = '#e8e2d6'; yd(c, 1250, 1250, 46, 48, 8); c.fill(); c.strokeStyle = '#bbb'; c.lineWidth = 3; c.beginPath(); c.arc(1300, 1272, 12, -1.4, 1.4); c.stroke();
}
function yatakKapiCiz(c, o) {
  const [x0, x1] = YER.yatakKapi, y0 = 400, w = x1 - x0;
  c.fillStyle = '#6b4529'; c.fillRect(x0 - 22, y0 - 22, w + 44, DUVAR_Y - y0 + 22);
  c.fillStyle = '#0d0b10'; c.fillRect(x0, y0, w, DUVAR_Y - y0);
  if (o.yatakGolge) { c.fillStyle = `rgba(80,80,100,${o.yatakGolge})`; c.fillRect(x0, y0, w, DUVAR_Y - y0); }
  const lw = w * .78; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0 + lw, y0 + 14); c.lineTo(x0 + lw, DUVAR_Y - 8); c.lineTo(x0, DUVAR_Y); c.closePath();
  c.fillStyle = '#80522f'; c.fill(); c.strokeStyle = '#4a2e1a'; c.lineWidth = 4; c.stroke();
  c.strokeStyle = 'rgba(60,35,20,.4)'; c.strokeRect(x0 + 30, y0 + 60, lw - 60, 300); c.strokeRect(x0 + 30, y0 + 420, lw - 60, 300);
  c.fillStyle = '#c9a65a'; c.beginPath(); c.arc(x0 + lw - 30, 800, 12, 0, 7); c.fill();
}
function mutfakKapiCiz(c) {
  const [x0, x1] = YER.mutfakKapi, y0 = 400, w = x1 - x0;
  c.fillStyle = '#6b4529'; c.fillRect(x0 - 22, y0 - 22, w + 44, DUVAR_Y - y0 + 22);
  c.fillStyle = '#86593a'; c.fillRect(x0, y0, w, DUVAR_Y - y0);
  const g = c.createLinearGradient(0, y0 + 50, 0, y0 + 400); g.addColorStop(0, 'rgba(255,225,170,.75)'); g.addColorStop(1, 'rgba(230,190,140,.55)');
  c.fillStyle = g; c.fillRect(x0 + 40, y0 + 50, w - 80, 340); c.strokeStyle = '#4a2e1a'; c.lineWidth = 4; c.strokeRect(x0 + 40, y0 + 50, w - 80, 340);
  c.fillStyle = '#c9a65a'; c.beginPath(); c.arc(x0 + 30, 800, 12, 0, 7); c.fill();
}
function sandalyeDevrik(c, x, y) {
  c.save(); c.translate(x, y); c.rotate(-.12);
  c.fillStyle = 'rgba(20,15,10,.3)'; c.beginPath(); c.ellipse(0, 20, 170, 24, 0, 0, 7); c.fill();
  c.strokeStyle = '#5c3b24'; c.lineWidth = 16; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-150, 0); c.lineTo(-20, -10); c.moveTo(-150, 0); c.lineTo(-145, -110); c.moveTo(-20, -10); c.lineTo(-10, -120); c.stroke();
  yd(c, -160, -130, 170, 30, 8); konturlu(c, '#7a5032', 3);
  c.lineWidth = 14; c.beginPath(); c.moveTo(10, -125); c.lineTo(140, -170); c.moveTo(10, -105); c.lineTo(150, -140); c.stroke();
  c.strokeStyle = '#7a5032'; c.lineWidth = 12; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(40 + i * 40, -130 - i * 13); c.lineTo(40 + i * 40, -110 - i * 13); c.stroke(); }
  c.restore();
}
function kanIzi(c, x, y, k = 1) {
  c.fillStyle = `rgba(110,22,24,${.88 * k})`;
  c.beginPath(); c.ellipse(x, y, 46, 13, -.1, 0, 7); c.fill();
  c.beginPath(); c.ellipse(x + 40, y + 6, 22, 7, 0, 0, 7); c.fill();
  for (let i = 0; i < 9; i++) { c.beginPath(); c.ellipse(x - 100 + hash(i + 3) * 260, y - 40 + hash(i + 8) * 90, 4 + hash(i) * 6, 2.5 + hash(i) * 3, 0, 0, 7); c.fill(); }
  c.fillStyle = `rgba(255,255,255,${.25 * k})`; c.beginPath(); c.ellipse(x - 12, y - 4, 14, 3, 0, 0, 7); c.fill();
}
function cerceveYerde(c, x, y, s = 1) {
  c.save(); c.translate(x, y); c.scale(s, s * .55); c.rotate(.3);
  c.fillStyle = 'rgba(20,15,10,.3)'; c.fillRect(-70, -50, 150, 110);
  cerceveDuvar(c, -75, -60, 150, 110, 'cift');
  c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-50, -40); c.lineTo(5, 0); c.lineTo(40, -45); c.moveTo(5, 0); c.lineTo(-20, 40); c.moveTo(5, 0); c.lineTo(55, 25); c.stroke();
  c.restore();
  c.fillStyle = 'rgba(220,235,245,.8)'; for (let i = 0; i < 6; i++) { c.beginPath(); const sx = x - 90 + hash(i + 40) * 200, sy = y + 30 + hash(i + 60) * 30; c.moveTo(sx, sy); c.lineTo(sx + 9, sy + 3); c.lineTo(sx + 2, sy + 8); c.fill(); }
}
function anahtarYerde(c, x, y, s = 1, parilti = 0) {
  c.save(); c.translate(x, y); c.scale(s, s * .7); c.rotate(-.6); nesne(c, 'anahtar', 0, 0, 0); c.restore();
  if (parilti > 0) { const g = c.createRadialGradient(x, y, 0, x, y, 40 * s); g.addColorStop(0, `rgba(255,255,230,${.9 * parilti})`); g.addColorStop(1, 'rgba(255,255,230,0)'); c.fillStyle = g; c.beginPath(); c.arc(x, y, 40 * s, 0, 7); c.fill(); }
}

// Bütün salonu çizer (karakterler hariç). o: {kapiAcik, polis, saat, anahtarVar, yatakGolge, golgeMerdiven, kolSars}
function salonArka(c, o, t) {
  duvarCiz(c, o); zeminCiz(c);
  kapiCiz(c, o, t);
  // askılık
  c.fillStyle = '#5a3a24'; c.fillRect(570, 520, 90, 14); c.fillStyle = '#3d4a5c'; c.beginPath(); c.moveTo(585, 534); c.lineTo(640, 534); c.lineTo(655, 760); c.lineTo(575, 760); c.closePath(); c.fill();
  saatDuvar(c, o, t);
  // düşen çerçevenin boş yeri + çivi
  c.fillStyle = 'rgba(255,250,240,.5)'; c.fillRect(615, 830, 130, 100); c.fillStyle = '#555'; c.beginPath(); c.arc(680, 822, 4, 0, 7); c.fill();
  cerceveDuvar(c, 1600, 560, 70, 90, 'deniz');
  pencereCiz(c, o, t);
  lambaCiz(c, o, t);
  kanepeCiz(c, o);
  yatakKapiCiz(c, o); mutfakKapiCiz(c);
  cerceveDuvar(c, 2000, 260, 120, 90, 'deniz');
  sehpaCiz(c);
  sandalyeDevrik(c, ...YER.sandalye);
  kanIzi(c, ...YER.kan);
  cerceveYerde(c, ...YER.cerceve);
  if (o.anahtarVar !== false) anahtarYerde(c, ...YER.anahtar, 1, o.anahtarParilti || 0);
}
// Işık katmanı (karakterlerden sonra): sıcak lamba, soğuk pencere ışığı, loşluk, polis ışığı
function salonIsik(c, o, t) {
  c.save();
  c.globalCompositeOperation = 'multiply'; c.fillStyle = `rgba(92,96,140,${(o.gece || .5) * .62})`; c.fillRect(-400, -200, DUNYA_W + 800, 2400);
  c.globalCompositeOperation = 'screen';
  const tit = 1 + gurultu(t * 3, 2) * .03;
  let g = c.createRadialGradient(790, 640, 20, 790, 700, 900 * tit); g.addColorStop(0, 'rgba(255,190,110,.5)'); g.addColorStop(.5, 'rgba(255,170,90,.16)'); g.addColorStop(1, 'rgba(255,170,90,0)');
  c.fillStyle = g; c.fillRect(-400, -200, DUNYA_W + 800, 2400);
  // pencereden soğuk ışık hüzmeleri
  c.fillStyle = 'rgba(120,160,230,.08)';
  for (let i = 0; i < 3; i++) { const bx = 940 + i * 180; c.beginPath(); c.moveTo(bx, 300); c.lineTo(bx + 110, 300); c.lineTo(bx - 260, 1900); c.lineTo(bx - 460, 1900); c.fill(); }
  if (o.polis) {
    const a = Math.sin(t * 9) > 0; const pc = a ? `rgba(70,120,255,${.22 * o.polis})` : `rgba(255,60,70,${.18 * o.polis})`;
    g = c.createRadialGradient(1200, 600, 50, 1200, 700, 1200); g.addColorStop(0, pc); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(-400, -200, DUNYA_W + 800, 2400);
  }
  c.restore();
}

// ---------- YAKIN PLAN (insert) ÇEKİMLERİ — ekran koordinatlarında ----------
function insTelefon(c, t, lt, mod) {
  // mod: '112' | 'emir' | 'cevapsiz' | 'emirGecmis'
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2b2a33'); g.addColorStop(1, '#4a3b34'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = 'rgba(255,190,120,.12)'; c.beginPath(); c.arc(200, 300, 700, 0, 7); c.fill();
  const tit = gurultu(t * 9, 3) * 4, by = 120 + Math.sin(lt * 1.3) * 8;
  c.save(); c.translate(W / 2 + tit, H / 2 + by); c.rotate(-.05);
  // el (avuç telefonun arkasında, parmaklar sağ kenarda)
  const ten = KARAKTER.AYLIN.ten, tk = renk(ten, -.35);
  c.fillStyle = '#eee0c8'; c.beginPath(); c.moveTo(-330, 640); c.lineTo(130, 600); c.lineTo(260, 1100); c.lineTo(-420, 1100); c.fill();
  c.strokeStyle = 'rgba(120,95,70,.3)'; c.lineWidth = 5; for (let x = -320; x < 140; x += 22) { c.beginPath(); c.moveTo(x, 630); c.lineTo(x + 6, 700); c.stroke(); }
  c.fillStyle = ten; c.strokeStyle = tk; c.lineWidth = 6; c.beginPath(); c.ellipse(-30, 470, 270, 210, 0, 0, 7); c.fill(); c.stroke();
  // telefon
  yd(c, -230, -470, 460, 940, 60); c.fillStyle = '#16171b'; c.fill();
  yd(c, -206, -446, 412, 892, 44);
  const ek = c.createLinearGradient(0, -446, 0, 446);
  if (mod === '112') { ek.addColorStop(0, '#5b1d24'); ek.addColorStop(1, '#2a1014'); } else { ek.addColorStop(0, '#24314a'); ek.addColorStop(1, '#141b29'); }
  c.fillStyle = ek; c.fill();
  c.textAlign = 'center'; c.fillStyle = '#fff';
  if (mod === '112') {
    c.font = '800 46px Nunito'; c.fillText('Acil Çağrı', 0, -280); c.font = '800 110px Nunito'; c.fillText('112', 0, -150);
    c.font = '600 40px Nunito'; c.fillStyle = 'rgba(255,255,255,.8)'; c.fillText('00:' + String(Math.floor(4 + lt)).padStart(2, '0'), 0, -80);
    c.fillStyle = '#e04040'; c.beginPath(); c.arc(0, 300, 62, 0, 7); c.fill();
  } else {
    c.beginPath(); c.arc(0, -230, 90, 0, 7); c.fillStyle = '#3b4d6e'; c.fill();
    c.save(); c.beginPath(); c.arc(0, -230, 86, 0, 7); c.clip(); kisiCiz(c, 'EMIR', { x: 0, y: -230 + 300, s: .36, duygu: 'sicak', agizKapali: 1 }, 0); c.restore();
    c.fillStyle = '#fff'; c.font = '800 58px Nunito'; c.fillText('Emir ♥', 0, -90);
    const durum = mod === 'cevapsiz' ? 'Cevap yok' : 'Aranıyor' + '.'.repeat(1 + Math.floor(lt * 2) % 3);
    c.font = '600 40px Nunito'; c.fillStyle = mod === 'cevapsiz' ? '#ff8a8a' : 'rgba(255,255,255,.8)'; c.fillText(durum, 0, -30);
    if (mod === 'cevapsiz') { c.fillStyle = 'rgba(255,255,255,.5)'; c.font = '600 32px Nunito'; c.fillText('Cevapsız arama (3)', 0, 30); }
    c.fillStyle = '#e04040'; c.beginPath(); c.arc(0, 300, 62, 0, 7); c.fill();
  }
  c.strokeStyle = '#fff'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(-26, 300); c.quadraticCurveTo(0, 285, 26, 300); c.stroke();
  // parmaklar ve başparmak
  c.fillStyle = KARAKTER.AYLIN.ten; c.strokeStyle = renk(KARAKTER.AYLIN.ten, -.35); c.lineWidth = 6;
  for (let i = 0; i < 4; i++) { c.beginPath(); c.ellipse(232, -40 + i * 105, 46, 52, 0, 0, 7); c.fill(); c.stroke(); }
  c.beginPath(); c.ellipse(-236, 250, 44, 110, -.25, 0, 7); c.fill(); c.stroke();
  c.restore();
}
function insEller(c, t, lt) {
  // Aylin'in titreyen elleri ve yerdeki iz
  c.fillStyle = '#7d5638'; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(50,30,15,.35)'; c.lineWidth = 6; for (let x = -200; x < W + 200; x += 170) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 140, H); c.stroke(); }
  kanIzi(c, 560, 1450, 1); kanIzi(c, 300, 1650, .7);
  c.fillStyle = 'rgba(30,20,30,.35)'; c.fillRect(0, 0, W, H);
  const tit = gurultu(lt * 14, 7) * 6, ay = Math.sin(lt) * 10;
  for (const s of [-1, 1]) {
    c.save(); c.translate(W / 2 + s * 190 + tit, 860 + ay); c.rotate(s * -.25); const ten = KARAKTER.AYLIN.ten;
    c.fillStyle = '#eee0c8'; yd(c, -110, 330, 220, 600, 60); c.fill();
    c.strokeStyle = 'rgba(120,95,70,.3)'; c.lineWidth = 4; for (let x = -100; x < 110; x += 16) { c.beginPath(); c.moveTo(x, 340); c.lineTo(x, 400); c.stroke(); }
    c.fillStyle = ten; c.strokeStyle = renk(ten, -.35); c.lineWidth = 6;
    c.beginPath(); c.ellipse(0, 150, 140, 200, 0, 0, 7); c.fill(); c.stroke();
    for (let i = 0; i < 4; i++) { c.beginPath(); c.ellipse(-90 + i * 60, -60 + Math.abs(i - 1.5) * 18, 30, 90, 0, 0, 7); c.fill(); c.stroke(); }
    c.beginPath(); c.ellipse(s * -150, 120, 34, 80, s * .6, 0, 7); c.fill(); c.stroke();
    c.fillStyle = 'rgba(130,25,28,.75)'; c.beginPath(); c.ellipse(-30, -40, 22, 12, .3, 0, 7); c.fill(); c.beginPath(); c.ellipse(40, 140, 30, 14, -.2, 0, 7); c.fill(); c.beginPath(); c.ellipse(-60, 190, 16, 9, 0, 0, 7); c.fill();
    c.restore();
  }
}
function insAnahtar(c, t, lt) {
  c.fillStyle = '#8a603f'; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(50,30,15,.35)'; c.lineWidth = 8; for (let x = -300; x < W + 300; x += 210) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 180, H); c.stroke(); }
  const z = 1 + lt * .04; c.save(); c.translate(W / 2, H / 2); c.scale(z, z);
  // sandalye bacağı gölgesi
  c.fillStyle = 'rgba(20,15,10,.35)'; c.fillRect(-540, -900, 160, 1800);
  c.fillStyle = '#5c3b24'; c.fillRect(-560, -960, 110, 1900);
  // anahtar
  c.save(); c.rotate(-.5); c.scale(6, 6);
  c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(4, 22, 18, 40, 0, 0, 7); c.fill();
  nesne(c, 'anahtar', 0, 0, 0);
  c.restore();
  // B-13 etiketi
  c.save(); c.rotate(-.5); c.fillStyle = '#d9c9a0'; c.strokeStyle = '#8a7a50'; c.lineWidth = 5; c.beginPath(); c.arc(0, -200, 90, 0, 7); c.fill(); c.stroke();
  c.fillStyle = '#ddd'; c.beginPath(); c.arc(0, -270, 14, 0, 7); c.fill();
  c.fillStyle = '#2a2a2a'; c.font = '800 74px Nunito'; c.textAlign = 'center'; c.fillText('B-13', 0, -175); c.restore();
  // parıltı
  const p = .5 + .5 * Math.sin(lt * 4); const g = c.createRadialGradient(-60, -60, 0, -60, -60, 140); g.addColorStop(0, `rgba(255,255,230,${.5 * p})`); g.addColorStop(1, 'rgba(255,255,230,0)'); c.fillStyle = g; c.beginPath(); c.arc(-60, -60, 140, 0, 7); c.fill();
  // eldivenli el yaklaşır
  const ek = seg(lt, .4, 1.6); if (ek > 0) {
    c.save(); c.translate(lerp(700, 260, easeOut(ek)), lerp(-700, -330, easeOut(ek))); c.rotate(.7);
    c.fillStyle = '#8fb7d9'; c.strokeStyle = '#5b86ad'; c.lineWidth = 6; c.beginPath(); c.ellipse(0, 0, 120, 160, 0, 0, 7); c.fill(); c.stroke();
    for (let i = 0; i < 2; i++) { c.beginPath(); c.ellipse(-60 + i * 50, 170, 30, 80, 0, 0, 7); c.fill(); c.stroke(); }
    c.fillStyle = '#474b53'; yd(c, -150, -520, 300, 400, 40); c.fill(); c.restore();
  }
  c.restore();
  c.fillStyle = 'rgba(40,30,50,.3)'; c.fillRect(0, 0, W, H);
}
function insSaat(c, t, lt) {
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3a3f4a'); g.addColorStop(1, '#5b4b40'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(W / 2 + gurultu(lt, 4) * 6, H / 2 - 40 + Math.sin(lt * 1.5) * 8); c.rotate(-.04 + gurultu(lt * .7, 2) * .02);
  c.fillStyle = '#8fb7d9'; c.strokeStyle = '#5b86ad'; c.lineWidth = 6;
  for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * 300, -440, 80, 110, s * .4, 0, 7); c.fill(); c.stroke(); }
  c.fillStyle = 'rgba(235,240,245,.6)'; c.strokeStyle = 'rgba(150,160,170,.95)'; yd(c, -360, -520, 720, 960, 30); c.fill(); c.stroke();
  c.fillStyle = '#c0392b'; c.fillRect(-360, -520, 720, 60);
  c.fillStyle = '#fff'; c.fillRect(-250, 230, 500, 150); c.fillStyle = '#333'; c.font = '800 54px Nunito'; c.textAlign = 'center'; c.fillText('DELİL NO: 07', 0, 290);
  c.font = '600 38px Nunito'; c.fillText('Arka merdiven', 0, 345);
  saatCiz(c, 0, -60, 150, 1);
  c.fillStyle = 'rgba(255,255,255,.25)'; c.beginPath(); c.moveTo(-340, -440); c.lineTo(-200, -440); c.lineTo(-340, 200); c.fill();
  c.restore();
  c.fillStyle = 'rgba(30,25,40,.2)'; c.fillRect(0, 0, W, H);
}
function insCerceve(c, t, lt) {
  c.fillStyle = '#8a603f'; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(50,30,15,.35)'; c.lineWidth = 8; for (let x = -300; x < W + 300; x += 210) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 180, H); c.stroke(); }
  const z = 1 + lt * .05; c.save(); c.translate(W / 2, H / 2 - 80); c.scale(z, z); c.rotate(.12);
  c.fillStyle = 'rgba(20,15,10,.35)'; c.fillRect(-370, -270, 760, 580);
  cerceveDuvar(c, -380, -290, 760, 560, 'cift');
  c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 5;
  c.beginPath(); c.moveTo(-300, -200); c.lineTo(20, 0); c.lineTo(250, -230); c.moveTo(20, 0); c.lineTo(-120, 230); c.moveTo(20, 0); c.lineTo(330, 140); c.moveTo(20, 0); c.lineTo(-330, 60); c.stroke();
  c.restore();
  c.fillStyle = 'rgba(220,235,245,.9)'; for (let i = 0; i < 10; i++) { const sx = 120 + hash(i + 40) * 840, sy = 1300 + hash(i + 60) * 300; c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx + 30, sy + 10); c.lineTo(sx + 6, sy + 26); c.fill(); }
  const ek = seg(lt, .3, 1.3); if (ek > 0) {
    c.save(); c.translate(lerp(1250, 900, easeOut(ek)), lerp(1700, 1380, easeOut(ek))); c.rotate(-.6);
    c.fillStyle = '#8fb7d9'; c.strokeStyle = '#5b86ad'; c.lineWidth = 6; c.beginPath(); c.ellipse(0, 0, 110, 150, 0, 0, 7); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(-20, -170, 30, 80, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#474b53'; yd(c, -140, 120, 280, 500, 40); c.fill(); c.restore();
  }
  c.fillStyle = 'rgba(40,30,50,.3)'; c.fillRect(0, 0, W, H);
}
function insKapiKolu(c, t, lt, sars) {
  const g = c.createLinearGradient(0, 0, W, 0); g.addColorStop(0, '#6e4529'); g.addColorStop(1, '#8d5d39'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(50,30,15,.4)'; c.lineWidth = 10; c.strokeRect(120, 200, 840, 640); c.strokeRect(120, 1100, 840, 700);
  const sx = gurultu(t * 40, 1) * 14 * sars, sy = gurultu(t * 40, 2) * 6 * sars;
  c.save(); c.translate(W / 2 + 140 + sx, 980 + sy);
  c.fillStyle = '#a8873f'; yd(c, -50, -170, 100, 340, 40); c.fill(); c.strokeStyle = '#6b5420'; c.lineWidth = 5; c.stroke();
  c.fillStyle = '#d9b968'; yd(c, -260, -32, 290, 64, 30); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.35)'; yd(c, -240, -24, 240, 14, 8); c.fill();
  c.fillStyle = '#3a2a10'; c.beginPath(); c.arc(0, 90, 18, 0, 7); c.fill(); c.fillRect(-7, 90, 14, 40);
  c.restore();
  c.fillStyle = 'rgba(20,20,40,.35)'; c.fillRect(0, 0, W, H);
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.7)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}
