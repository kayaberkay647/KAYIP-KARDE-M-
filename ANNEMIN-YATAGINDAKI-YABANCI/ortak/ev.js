// ANNEMİN YATAĞINDAKİ YABANCI — AİLE EVİ. Plan bütün bölümlerde aynıdır.
// Dünya: salon 2400 x 1920, yatak odası 2200 x 1920. Duvar 0–1180, zemin 1180–1920.
const DUVAR_Y = 1180;
const olcek = y => .72 + (y - DUVAR_Y) * .00056;
function kamera(c, cx, cy, z) { c.setTransform(z, 0, 0, z, W / 2 - cx * z, H / 2 - cy * z); }
const EVPLAN = { girisKapi: [180, 500], odaKapi: [2050, 2330], yatak: [820, 1700] };

// ---------- ortak parçalar ----------
function parke(c, x0, x1, renk1, renk2) {
  const g = c.createLinearGradient(0, DUVAR_Y, 0, 1920); g.addColorStop(0, renk1); g.addColorStop(1, renk2);
  c.fillStyle = g; c.fillRect(x0, DUVAR_Y, x1 - x0, 900);
  c.strokeStyle = 'rgba(70,35,15,.25)'; c.lineWidth = 3; const vx = (x0 + x1) / 2, vy = 260;
  for (let x = x0 - 1600; x < x1 + 1600; x += 115) { c.beginPath(); c.moveTo(lerp(vx, x, (DUVAR_Y - vy) / (2400 - vy)), DUVAR_Y); c.lineTo(x, 2400); c.stroke(); }
  c.strokeStyle = 'rgba(70,35,15,.12)'; for (let y = DUVAR_Y + 40, d = 40; y < 2000; d *= 1.18, y += d) { c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); }
}
function kilim(c, x0, y0, x1, y1, a, b) {
  c.save(); c.beginPath(); c.moveTo(x0 + 120, y0); c.lineTo(x1 - 120, y0); c.lineTo(x1, y1); c.lineTo(x0, y1); c.closePath();
  c.fillStyle = a; c.fill(); c.strokeStyle = renk(a, -.35); c.lineWidth = 6; c.stroke(); c.clip();
  c.strokeStyle = b; c.lineWidth = 14; c.beginPath(); c.moveTo(x0 + 150, y0 + 30); c.lineTo(x1 - 150, y0 + 30); c.lineTo(x1 - 40, y1 - 30); c.lineTo(x0 + 40, y1 - 30); c.closePath(); c.stroke();
  const n = 5, cy = (y0 + y1) / 2;
  for (let i = 0; i < n; i++) { const x = lerp(x0 + 230, x1 - 230, i / (n - 1)); c.fillStyle = i % 2 ? b : '#f2d48a'; c.beginPath(); c.moveTo(x, cy - 80); c.lineTo(x + 60, cy); c.lineTo(x, cy + 80); c.lineTo(x - 60, cy); c.fill(); c.fillStyle = a; c.beginPath(); c.moveTo(x, cy - 30); c.lineTo(x + 22, cy); c.lineTo(x, cy + 30); c.lineTo(x - 22, cy); c.fill(); }
  c.restore();
}
function cerceve(c, x, y, w, h, icerik, cerRenk = '#6e4224') {
  c.fillStyle = 'rgba(60,35,15,.2)'; c.fillRect(x + 6, y + 8, w, h);
  c.fillStyle = cerRenk; c.fillRect(x, y, w, h); c.fillStyle = '#f4ead6'; c.fillRect(x + 8, y + 8, w - 16, h - 16);
  c.save(); c.beginPath(); c.rect(x + 14, y + 14, w - 28, h - 28); c.clip();
  c.fillStyle = '#d8c2a0'; c.fillRect(x, y, w, h);
  if (icerik) icerik(x + 14, y + 14, w - 28, h - 28);
  c.fillStyle = 'rgba(160,110,60,.18)'; c.fillRect(x, y, w, h);
  c.restore();
}
// fotoğraf içerikleri
const FOTO = {
  anneMert: (x, y, w, h) => { c2Gok(x, y, w, h, '#9cc5e0'); kisiCiz(CTX_AKTIF, 'ANNE_GENC', { x: x + w * .38, y: y + h * 1.85, s: h / 560, duygu: 'sicak', agizKapali: 1, don: .2 }, 0); kisiCiz(CTX_AKTIF, 'MERT', { x: x + w * .7, y: y + h * 2.05, s: h / 820, duygu: 'sicak', agizKapali: 1, don: -.2 }, 0); },
  anne: (x, y, w, h) => { c2Gok(x, y, w, h, '#c8b8d8'); kisiCiz(CTX_AKTIF, 'ANNE_GENC', { x: x + w / 2, y: y + h * 2.05, s: h / 470, duygu: 'sicak', agizKapali: 1 }, 0); },
  deniz: (x, y, w, h) => { c2Gok(x, y, w, h, '#8fc0de'); CTX_AKTIF.fillStyle = '#3d7fae'; CTX_AKTIF.fillRect(x, y + h * .58, w, h); CTX_AKTIF.fillStyle = '#f4d58a'; CTX_AKTIF.beginPath(); CTX_AKTIF.arc(x + w * .72, y + h * .3, h * .1, 0, 7); CTX_AKTIF.fill(); },
  dag: (x, y, w, h) => { c2Gok(x, y, w, h, '#b6d7e8'); const c = CTX_AKTIF; c.fillStyle = '#6f9a6a'; c.beginPath(); c.moveTo(x, y + h); c.lineTo(x + w * .35, y + h * .35); c.lineTo(x + w * .6, y + h * .7); c.lineTo(x + w * .8, y + h * .45); c.lineTo(x + w, y + h); c.fill(); },
};
let CTX_AKTIF = null;
function c2Gok(x, y, w, h, renk1) { CTX_AKTIF.fillStyle = renk1; CTX_AKTIF.fillRect(x, y, w, h); }
function fotoCerceve(c, x, y, w, h, tur, cerRenk) { CTX_AKTIF = c; cerceve(c, x, y, w, h, FOTO[tur], cerRenk); }

function ahsapKapi(c, x0, x1, y0, acik, arkaPlan, kolSars) {
  const w = x1 - x0;
  c.fillStyle = '#6a3f20'; c.fillRect(x0 - 26, y0 - 26, w + 52, DUVAR_Y - y0 + 26);
  c.save(); c.beginPath(); c.rect(x0, y0, w, DUVAR_Y - y0); c.clip(); arkaPlan(x0, y0, w, DUVAR_Y - y0); c.restore();
  const lw = w * (1 - .8 * acik), sk = 40 * acik;
  c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0 + lw, y0 + sk); c.lineTo(x0 + lw, DUVAR_Y - sk * .5); c.lineTo(x0, DUVAR_Y); c.closePath();
  const kg = c.createLinearGradient(x0, 0, x0 + lw, 0); kg.addColorStop(0, '#a26a37'); kg.addColorStop(1, '#87532a'); c.fillStyle = kg; c.fill(); c.strokeStyle = '#4e2c14'; c.lineWidth = 4; c.stroke();
  if (acik < .9) {
    c.strokeStyle = 'rgba(70,38,16,.5)'; c.lineWidth = 5;
    for (const [a, b] of [[.07, .45], [.53, .94]]) c.strokeRect(x0 + lw * .15, y0 + (DUVAR_Y - y0) * a + sk * .5, lw * .7, (DUVAR_Y - y0) * (b - a) - sk);
    const kx = x0 + lw * .86, ky = 800 + (kolSars || 0) * 3;
    c.fillStyle = '#d4af5f'; yd(c, kx - 10, ky - 34, 20, 68, 8); c.fill(); c.fillStyle = '#ecca7c'; yd(c, kx - 44 * (1 - acik), ky - 8, 44 * (1 - acik) + 6, 14, 6); c.fill();
  }
}

// ---------- SALON ----------
function salonArka(c, o, t) {
  const g = c.createLinearGradient(0, 0, 0, DUVAR_Y); g.addColorStop(0, '#f1dcb4'); g.addColorStop(1, '#f6e6c6');
  c.fillStyle = g; c.fillRect(-400, -200, 3200, DUVAR_Y + 200);
  c.fillStyle = 'rgba(200,150,90,.14)'; for (let x = -400; x < 2800; x += 64) c.fillRect(x, 70, 22, 830);
  c.fillStyle = '#f9efd8'; c.fillRect(-400, 40, 3200, 26);
  // ahşap lambri
  c.fillStyle = '#a8673a'; c.fillRect(-400, 900, 3200, DUVAR_Y - 900); c.fillStyle = '#c07d47'; c.fillRect(-400, 900, 3200, 14);
  c.strokeStyle = 'rgba(70,35,15,.35)'; c.lineWidth = 4; for (let x = -380; x < 2800; x += 180) c.strokeRect(x, 940, 150, 200);
  parke(c, -400, 2800, '#9a5e33', '#b9773f');
  kilim(c, 700, 1330, 1800, 1780, '#b3323a', '#21507a');
  // giriş kapısı (açılınca apartman sahanlığı)
  ahsapKapi(c, ...EVPLAN.girisKapi, 380, o.kapiAcik || 0, (x, y, w, h) => {
    const sg = c.createLinearGradient(0, y, 0, y + h); sg.addColorStop(0, '#c9b28a'); sg.addColorStop(1, '#8c7556'); c.fillStyle = sg; c.fillRect(x, y, w, h);
    c.fillStyle = '#6d5a42'; c.fillRect(x, y + h - 60, w, 60); c.fillStyle = 'rgba(255,230,170,.35)'; c.beginPath(); c.arc(x + w / 2, y + 40, 90, 0, 7); c.fill();
  }, o.kolSars);
  if (o.kapiAcik > 0) { c.fillStyle = `rgba(255,225,160,${.16 * o.kapiAcik})`; c.beginPath(); c.moveTo(EVPLAN.girisKapi[0], DUVAR_Y); c.lineTo(EVPLAN.girisKapi[1], DUVAR_Y); c.lineTo(EVPLAN.girisKapi[1] + 240, 1700); c.lineTo(EVPLAN.girisKapi[0] - 60, 1700); c.fill(); }
  // portmanto
  c.fillStyle = '#5a3418'; c.fillRect(560, 500, 100, 16); c.fillStyle = '#7d2f2f'; c.beginPath(); c.moveTo(575, 516); c.lineTo(640, 516); c.lineTo(655, 760); c.lineTo(565, 760); c.closePath(); c.fill();
  // aile fotoğrafları duvarı
  fotoCerceve(c, 720, 330, 170, 210, 'anneMert'); fotoCerceve(c, 910, 380, 120, 150, 'dag', '#8a5a2c'); fotoCerceve(c, 760, 570, 230, 160, 'deniz');
  // pencere
  const [px0, px1] = [1080, 1520], py0 = 300, py1 = 880;
  c.fillStyle = '#fbf4e4'; c.fillRect(px0 - 28, py0 - 28, px1 - px0 + 56, py1 - py0 + 56);
  c.save(); c.beginPath(); c.rect(px0, py0, px1 - px0, py1 - py0); c.clip();
  const gg = c.createLinearGradient(0, py0, 0, py1); gg.addColorStop(0, '#1b2d5a'); gg.addColorStop(1, '#3b5590'); c.fillStyle = gg; c.fillRect(px0, py0, px1 - px0, py1 - py0);
  c.fillStyle = '#fff6d8'; c.beginPath(); c.arc(px0 + 330, py0 + 120, 34, 0, 7); c.fill();
  c.fillStyle = '#132246'; for (let i = 0; i < 6; i++) { const bh = 200 + hash(i + 3) * 230; c.fillRect(px0 - 30 + i * 85, py1 - bh, 80, bh); }
  for (let i = 0; i < 26; i++) if (hash(i * 2.3) > .5) { c.fillStyle = 'rgba(255,208,120,.75)'; c.fillRect(px0 + hash(i) * 440, py1 - 30 - hash(i + 9) * 360, 12, 16); }
  c.restore();
  c.fillStyle = '#fbf4e4'; c.fillRect((px0 + px1) / 2 - 9, py0, 18, py1 - py0); c.fillRect(px0, (py0 + py1) / 2 - 9, px1 - px0, 18);
  { // tül perde (o.perde: 0 kapalı, 1 aralık)
    const ar = (o.perde || 0) * 170, orta = (px0 + px1) / 2 - 40;
    for (const [a, b] of [[px0 - 10, orta - ar], [orta + ar * .2, px1 + 10]]) {
      if (b - a < 10) continue; c.fillStyle = 'rgba(250,246,236,.42)'; c.fillRect(a, py0 - 10, b - a, py1 - py0 + 20);
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 3; for (let x = a + 14; x < b; x += 26) { c.beginPath(); c.moveTo(x, py0 - 10); c.quadraticCurveTo(x + 6, (py0 + py1) / 2, x, py1 + 10); c.stroke(); }
    }
  }
  for (const sgn of [-1, 1]) { const bx = sgn < 0 ? px0 - 70 : px1 + 70, sw = gurultu(t * .4, sgn + 5) * 5;
    c.beginPath(); c.moveTo(bx, 230); c.lineTo(bx - sgn * 150, 230); c.quadraticCurveTo(bx - sgn * 140 + sw, 600, bx - sgn * 110 + sw, 960); c.lineTo(bx + sgn * 20, 960); c.closePath();
    const pg = c.createLinearGradient(bx - 150, 0, bx + 150, 0); pg.addColorStop(0, '#d79a35'); pg.addColorStop(.5, '#eab650'); pg.addColorStop(1, '#c68a2c'); c.fillStyle = pg; c.fill(); c.strokeStyle = '#9b6a1e'; c.lineWidth = 3; c.stroke();
    c.strokeStyle = 'rgba(140,90,20,.4)'; c.lineWidth = 4; for (let i = 1; i < 4; i++) { const fx = bx - sgn * 38 * i; c.beginPath(); c.moveTo(fx, 240); c.quadraticCurveTo(fx + sw, 600, fx + sgn * 8 + sw, 955); c.stroke(); } }
  c.fillStyle = '#5a3418'; c.fillRect(px0 - 250, 218, px1 - px0 + 500, 14);
  // ayaklı lamba
  c.strokeStyle = '#3a2a22'; c.lineWidth = 8; c.beginPath(); c.moveTo(920, 650); c.lineTo(920, 1225); c.stroke(); c.fillStyle = '#3a2a22'; c.beginPath(); c.ellipse(920, 1228, 50, 12, 0, 0, 7); c.fill();
  c.beginPath(); c.moveTo(850, 660); c.lineTo(990, 660); c.lineTo(966, 568); c.lineTo(874, 568); c.closePath(); c.fillStyle = '#ffe2a0'; c.fill(); c.strokeStyle = '#d4a850'; c.lineWidth = 3; c.stroke();
  // kahverengi kanepe
  const k0 = 1010, k1 = 1600, kc = '#7a4526';
  c.fillStyle = 'rgba(40,20,10,.3)'; c.beginPath(); c.ellipse((k0 + k1) / 2, 1250, (k1 - k0) / 2 + 30, 26, 0, 0, 7); c.fill();
  yd(c, k0 + 20, 890, k1 - k0 - 40, 250, 40); konturlu(c, renk(kc, -.06), 4);
  for (let i = 0; i < 3; i++) { yd(c, k0 + 60 + i * 162, 912, 155, 180, 28); konturlu(c, renk(kc, .08), 3); }
  yd(c, k0 + 40, 1080, k1 - k0 - 80, 120, 24); konturlu(c, kc, 4);
  for (const sx of [0, 1]) { yd(c, sx ? k1 - 110 : k0, 960, 110, 260, 40); konturlu(c, renk(kc, -.03), 4); }
  c.save(); c.translate(k0 + 160, 1040); c.rotate(-.15); yd(c, -55, -55, 110, 100, 22); konturlu(c, '#e3b14a', 3); c.restore();
  c.save(); c.translate(k1 - 170, 1040); c.rotate(.12); yd(c, -50, -50, 100, 92, 22); konturlu(c, '#2f6a8a', 3); c.restore();
  // sehpa
  c.fillStyle = 'rgba(40,20,10,.28)'; c.beginPath(); c.ellipse(1300, 1440, 220, 22, 0, 0, 7); c.fill();
  c.fillStyle = '#5a3418'; for (const x of [1110, 1470]) c.fillRect(x, 1320, 22, 112); yd(c, 1090, 1296, 420, 34, 10); konturlu(c, '#7d4a24', 3);
  c.fillStyle = '#f1e9da'; yd(c, 1180, 1250, 46, 48, 8); c.fill(); c.fillStyle = '#c0392b'; c.fillRect(1180, 1262, 46, 8);
  c.fillStyle = '#8a5a2c'; c.beginPath(); c.ellipse(1380, 1282, 60, 14, 0, 0, 7); c.fill();
  // büfe + siyah kurdeleli anne fotoğrafı
  yd(c, 1680, 860, 320, 320, 10); konturlu(c, '#7a4526', 4); c.strokeStyle = 'rgba(60,30,10,.4)'; c.lineWidth = 4; c.strokeRect(1700, 900, 135, 250); c.strokeRect(1845, 900, 135, 250);
  c.fillStyle = '#d4af5f'; for (const x of [1820, 1860]) { c.beginPath(); c.arc(x, 1020, 7, 0, 7); c.fill(); }
  fotoCerceve(c, 1760, 680, 140, 175, 'anne', '#3a2414');
  c.fillStyle = '#111'; c.beginPath(); c.moveTo(1760, 715); c.lineTo(1795, 680); c.lineTo(1815, 680); c.lineTo(1760, 735); c.closePath(); c.fill();
  c.fillStyle = '#3d7a9c'; yd(c, 1930, 760, 40, 100, 14); c.fill(); c.fillStyle = '#f4f0e6'; for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(1940 + i * 12, 745 - i * 6, 14, 0, 7); c.fill(); }
  // anne odası kapısı
  ahsapKapi(c, ...EVPLAN.odaKapi, 400, o.odaAcik ?? .35, (x, y, w, h) => { const og = c.createRadialGradient(x + w * .3, y + 300, 20, x + w * .3, y + 300, 500); og.addColorStop(0, '#6a4a2a'); og.addColorStop(1, '#1a120c'); c.fillStyle = og; c.fillRect(x, y, w, h); });
}
function salonIsik(c, o, t) {
  c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = `rgba(110,105,160,${(o.gece ?? .5) * .42})`; c.fillRect(-400, -200, 3200, 2400);
  c.globalCompositeOperation = 'screen';
  const tit = 1 + gurultu(t * 3, 2) * .025;
  let g = c.createRadialGradient(920, 620, 20, 920, 700, 950 * tit); g.addColorStop(0, 'rgba(255,200,110,.5)'); g.addColorStop(.5, 'rgba(255,180,90,.15)'); g.addColorStop(1, 'rgba(255,180,90,0)'); c.fillStyle = g; c.fillRect(-400, -200, 3200, 2400);
  c.fillStyle = 'rgba(130,160,240,.07)'; for (let i = 0; i < 3; i++) { const bx = 1110 + i * 150; c.beginPath(); c.moveTo(bx, 300); c.lineTo(bx + 90, 300); c.lineTo(bx - 250, 1900); c.lineTo(bx - 420, 1900); c.fill(); }
  if (o.polis) { const a = Math.sin(t * 8) > 0; g = c.createRadialGradient(1300, 600, 50, 1300, 700, 1100); g.addColorStop(0, a ? `rgba(70,120,255,${.18 * o.polis})` : `rgba(255,60,70,${.14 * o.polis})`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(-400, -200, 3200, 2400); }
  c.restore();
}

// ---------- ANNENİN YATAK ODASI ----------
function yatakArka(c, o, t) {
  const g = c.createLinearGradient(0, 0, 0, DUVAR_Y); g.addColorStop(0, '#efdcc0'); g.addColorStop(1, '#f5e8d2');
  c.fillStyle = g; c.fillRect(-400, -200, 3000, DUVAR_Y + 200);
  c.fillStyle = 'rgba(190,120,120,.16)'; for (let y = 60; y < 1120; y += 90) for (let x = -400 + ((y / 90) % 2) * 45; x < 2600; x += 90) { c.beginPath(); c.arc(x, y, 9, 0, 7); c.fill(); c.fillStyle = 'rgba(120,150,100,.16)'; c.beginPath(); c.ellipse(x + 14, y + 6, 8, 4, .6, 0, 7); c.fill(); c.fillStyle = 'rgba(190,120,120,.16)'; }
  c.fillStyle = '#7d4a26'; c.fillRect(-400, DUVAR_Y - 34, 3000, 34);
  parke(c, -400, 2600, '#8e5530', '#ad6f3c');
  kilim(c, 900, 1420, 1900, 1800, '#2d6e8e', '#c9473e');
  // pencere (ay ışığı)
  const [px0, px1] = [140, 520], py0 = 320, py1 = 860;
  c.fillStyle = '#fbf4e4'; c.fillRect(px0 - 24, py0 - 24, px1 - px0 + 48, py1 - py0 + 48);
  const pg = c.createLinearGradient(0, py0, 0, py1); pg.addColorStop(0, '#1a2c5c'); pg.addColorStop(1, '#40609a'); c.fillStyle = pg; c.fillRect(px0, py0, px1 - px0, py1 - py0);
  c.fillStyle = '#fff6d8'; c.beginPath(); c.arc(px0 + 270, py0 + 130, 40, 0, 7); c.fill(); c.fillStyle = 'rgba(255,246,216,.15)'; c.beginPath(); c.arc(px0 + 270, py0 + 130, 80, 0, 7); c.fill();
  c.fillStyle = '#fbf4e4'; c.fillRect((px0 + px1) / 2 - 8, py0, 16, py1 - py0);
  for (const sgn of [-1, 1]) { const bx = sgn < 0 ? px0 - 60 : px1 + 60; c.beginPath(); c.moveTo(bx, 250); c.lineTo(bx - sgn * 120, 250); c.quadraticCurveTo(bx - sgn * 110, 600, bx - sgn * 90, 940); c.lineTo(bx + sgn * 15, 940); c.closePath(); c.fillStyle = '#d98a9a'; c.fill(); c.strokeStyle = '#a95a6a'; c.lineWidth = 3; c.stroke(); }
  // yatağın üstündeki fotoğraflar
  fotoCerceve(c, 980, 380, 150, 190, 'anne', '#5a3418'); fotoCerceve(c, 1160, 420, 210, 150, 'anneMert'); fotoCerceve(c, 1400, 400, 120, 160, 'dag', '#7a4a24');
  // komodin + gece lambası + küçük çerçeveler
  yd(c, 560, 960, 210, 230, 8); konturlu(c, '#8a5229', 4); c.strokeStyle = 'rgba(60,30,10,.4)'; c.lineWidth = 3; c.strokeRect(580, 1000, 170, 70); c.strokeRect(580, 1085, 170, 80);
  c.fillStyle = '#d4af5f'; c.beginPath(); c.arc(665, 1035, 6, 0, 7); c.fill(); c.beginPath(); c.arc(665, 1125, 6, 0, 7); c.fill();
  c.fillStyle = '#6a4a2a'; c.fillRect(655, 860, 20, 100); c.beginPath(); c.moveTo(600, 870); c.lineTo(730, 870); c.lineTo(705, 780); c.lineTo(625, 780); c.closePath(); c.fillStyle = '#ffd77a'; c.fill(); c.strokeStyle = '#d4a03a'; c.lineWidth = 3; c.stroke();
  fotoCerceve(c, 580, 880, 60, 78, 'anneMert', '#c9a34a');
  // berjer koltuk (pencerenin önü)
  c.fillStyle = 'rgba(40,20,10,.25)'; c.beginPath(); c.ellipse(345, 1335, 150, 20, 0, 0, 7); c.fill();
  yd(c, 225, 1010, 240, 220, 50); konturlu(c, '#c4703c', 4); yd(c, 205, 1160, 280, 120, 30); konturlu(c, '#d68449', 4);
  for (const x of [190, 450]) { yd(c, x, 1120, 55, 170, 24); konturlu(c, '#b8622f', 4); }
  c.fillStyle = '#5a3418'; for (const x of [220, 455]) c.fillRect(x, 1280, 16, 50);
  // oda kapısı (salona açılır) — sağda
  ahsapKapi(c, 1720, 1980, 400, o.kapiAcik ?? 1, (x, y, w, h) => { const og = c.createLinearGradient(0, y, 0, y + h); og.addColorStop(0, '#8a6a46'); og.addColorStop(1, '#4a3420'); c.fillStyle = og; c.fillRect(x, y, w, h); c.fillStyle = 'rgba(255,210,140,.35)'; c.fillRect(x, y, w, h); });
}
// Yatak: arka (başlık + şilte) ve ön (örtü + ön panel) ayrı çizilir; arada uzanan/oturan karakter.
const YATAK = { x0: 820, x1: 1600, ust: 1060 };
function yatakArkaParca(c) {
  const { x0, x1, ust } = YATAK;
  yd(c, x0 - 40, 760, 70, 470, 18); konturlu(c, '#7a4422', 4); c.fillStyle = '#93582d'; yd(c, x0 - 30, 780, 50, 140, 12); c.fill();
  yd(c, x1 - 10, 900, 60, 330, 16); konturlu(c, '#7a4422', 4);
  yd(c, x0 + 20, ust - 40, x1 - x0 - 30, 60, 20); c.fillStyle = '#f6f2ea'; c.fill();
  c.save(); c.translate(x0 + 120, ust - 50); c.rotate(-.06); yd(c, -95, -45, 190, 90, 40); konturlu(c, '#fbf8f2', 3, -.12); c.restore();
}
function yatakOnParca(c, o, t) {
  const { x0, x1, ust } = YATAK, ob = o.ortu ?? 0; // ortu: 1 = uzanırken göğse kadar örter, 0 = oturunca beline
  const kx = lerp(x0 + 230, x0 + 260, ob), tepe = lerp(ust - 95, ust - 150, ob);
  c.beginPath(); c.moveTo(kx, ust + 10);
  c.bezierCurveTo(kx - 20, tepe, kx + 120, tepe - 20, kx + 260, tepe + 5);
  c.bezierCurveTo(kx + 420, tepe + 30, x1 - 140, ust - 50, x1 + 10, ust - 30);
  c.lineTo(x1 + 20, ust + 220); c.lineTo(x0 + 20, ust + 220); c.lineTo(x0 + 20, ust + 10); c.closePath();
  const g = c.createLinearGradient(0, tepe, 0, ust + 220); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#e3ded4'); c.fillStyle = g; c.fill(); c.strokeStyle = '#c9c2b4'; c.lineWidth = 4; c.stroke();
  c.strokeStyle = 'rgba(160,150,135,.45)'; c.lineWidth = 3; for (const x of [kx + 140, kx + 380, x1 - 200]) { c.beginPath(); c.moveTo(x, tepe + 30); c.quadraticCurveTo(x + 30, ust + 80, x - 10, ust + 200); c.stroke(); }
  c.fillStyle = '#d8a46a'; c.fillRect(x0 + 20, ust + 150, x1 - x0, 16);
  yd(c, x0 + 10, ust + 200, x1 - x0 + 20, 70, 10); konturlu(c, '#8a5229', 4);
  c.fillStyle = '#5a3418'; for (const x of [x0 + 20, x1 - 10]) c.fillRect(x, ust + 270, 26, 60);
  c.fillStyle = 'rgba(40,20,10,.25)'; c.beginPath(); c.ellipse((x0 + x1) / 2, ust + 335, (x1 - x0) / 2 + 40, 24, 0, 0, 7); c.fill();
}
// Yatakta uzanan / doğrulan karakter. dogrul: 0 = uzanıyor, 1 = oturuyor
function yataktaKisi(c, ad, p, dogrul, t) {
  const K = KARAKTER[ad], sc = (p.s || 1) * K.boy, kalcaX = YATAK.x0 + 520, kalcaY = YATAK.ust - 10;
  const ang = lerp(-Math.PI / 2 * .97, -.06, ease(dogrul));
  c.save(); c.beginPath(); c.rect(-400, -200, YATAK.x1 - 20 + 400, YATAK.ust + 40 + 200); c.clip();
  c.translate(kalcaX, kalcaY); c.rotate(ang);
  kisiCiz(c, ad, Object.assign({}, p, { x: 0, y: 380 * sc, s: p.s || 1, otur: 0 }), t);
  c.restore();
}
function yatakIsik(c, o, t) {
  c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = `rgba(95,95,155,${(o.gece ?? .55) * .55})`; c.fillRect(-400, -200, 3000, 2400);
  c.globalCompositeOperation = 'screen';
  const tit = 1 + gurultu(t * 3, 4) * .03;
  let g = c.createRadialGradient(665, 830, 10, 700, 880, 850 * tit); g.addColorStop(0, 'rgba(255,205,110,.62)'); g.addColorStop(.45, 'rgba(255,185,90,.2)'); g.addColorStop(1, 'rgba(255,185,90,0)'); c.fillStyle = g; c.fillRect(-400, -200, 3000, 2400);
  c.fillStyle = 'rgba(150,180,255,.08)'; c.beginPath(); c.moveTo(140, 320); c.lineTo(520, 320); c.lineTo(1100, 1900); c.lineTo(400, 1900); c.fill();
  g = c.createLinearGradient(1720, 0, 2100, 0); g.addColorStop(0, 'rgba(255,210,140,.18)'); g.addColorStop(1, 'rgba(255,210,140,0)'); c.fillStyle = g; c.fillRect(1720, 400, 700, 1500);
  c.restore();
}

// ---------- YAKIN PLANLAR ----------
function insKapiKolu(c, t, lt, sars) {
  const g = c.createLinearGradient(0, 0, W, 0); g.addColorStop(0, '#8a5229'); g.addColorStop(1, '#a26a37'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(70,38,16,.45)'; c.lineWidth = 10; c.strokeRect(120, 200, 840, 640); c.strokeRect(120, 1100, 840, 700);
  const sx = gurultu(t * 40, 1) * 14 * sars, sy = gurultu(t * 40, 2) * 6 * sars;
  c.save(); c.translate(W / 2 + 140 + sx, 980 + sy);
  c.fillStyle = '#b9933f'; yd(c, -50, -170, 100, 340, 40); c.fill(); c.strokeStyle = '#6b5420'; c.lineWidth = 5; c.stroke();
  c.fillStyle = '#e3c06a'; yd(c, -260, -32, 290, 64, 30); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.4)'; yd(c, -240, -24, 240, 14, 8); c.fill();
  c.fillStyle = '#3a2a10'; c.beginPath(); c.arc(0, 90, 18, 0, 7); c.fill(); c.fillRect(-7, 90, 14, 40); c.restore();
  c.fillStyle = 'rgba(30,25,50,.25)'; c.fillRect(0, 0, W, H);
}
// Eski, yıpranmış fotoğraf: genç anne + sarı saçlı küçük kız
function eskiFoto(c, x, y, w, h, rot) {
  c.save(); c.translate(x, y); c.rotate(rot);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-w / 2 + 14, -h / 2 + 18, w, h);
  c.fillStyle = '#efe4cc'; c.fillRect(-w / 2, -h / 2, w, h);
  const ix = -w / 2 + w * .07, iy = -h / 2 + w * .07, iw = w * .86, ih = h - w * .07 - w * .2;
  c.save(); c.beginPath(); c.rect(ix, iy, iw, ih); c.clip();
  const gk = c.createLinearGradient(0, iy, 0, iy + ih); gk.addColorStop(0, '#a9cfe0'); gk.addColorStop(.6, '#cfe3c4'); gk.addColorStop(1, '#7aa86a'); c.fillStyle = gk; c.fillRect(ix, iy, iw, ih);
  c.fillStyle = '#b05a4a'; c.fillRect(ix + iw * .62, iy + ih * .2, iw * .5, ih * .55); c.fillStyle = '#7a3a30'; c.beginPath(); c.moveTo(ix + iw * .58, iy + ih * .22); c.lineTo(ix + iw * .85, iy + ih * .02); c.lineTo(ix + iw * 1.1, iy + ih * .22); c.fill();
  c.fillStyle = '#f4ead0'; c.fillRect(ix + iw * .7, iy + ih * .35, iw * .12, ih * .14);
  kisiCiz(c, 'ANNE_GENC', { x: ix + iw * .4, y: iy + ih * 1.55, s: ih / 720, duygu: 'sicak', agizKapali: 1, don: .2, sag: [120, -480] }, 0);
  kisiCiz(c, 'KIZ', { x: ix + iw * .68, y: iy + ih * 1.32, s: ih / 1100, duygu: 'sicak', agizKapali: 1, don: -.25 }, 0);
  c.fillStyle = 'rgba(200,150,80,.25)'; c.fillRect(ix, iy, iw, ih);
  c.restore();
  // yıpranma: kırışıklık, köşe, leke
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = w * .006; c.beginPath(); c.moveTo(-w / 2, -h * .05); c.lineTo(w / 2, h * .08); c.stroke();
  c.strokeStyle = 'rgba(120,90,50,.35)'; c.beginPath(); c.moveTo(-w * .1, -h / 2); c.lineTo(w * .05, h / 2); c.stroke();
  c.fillStyle = 'rgba(150,110,60,.25)'; c.beginPath(); c.ellipse(w * .3, h * .38, w * .12, h * .05, .3, 0, 7); c.fill();
  c.fillStyle = '#2a1a10'; c.font = `600 ${w * .07}px Caveat`; c.textAlign = 'center'; c.fillText('Bahar, 1997', 0, h / 2 - w * .07);
  c.restore();
}
function insFoto(c, t, lt, kimde) {
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3a2a35'); g.addColorStop(1, '#6a4a34'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = 'rgba(255,190,110,.18)'; c.beginPath(); c.arc(250, 300, 700, 0, 7); c.fill();
  const z = 1 + lt * .035, tit = gurultu(t * 6, 3) * 3;
  c.save(); c.translate(W / 2 + tit, H / 2 - 40); c.scale(z, z);
  const ten = KARAKTER[kimde || 'SEVDA'].ten, kol = KARAKTER[kimde || 'SEVDA'].ust;
  for (const s of [-1, 1]) { c.fillStyle = kol; yd(c, s * 330 - 70, 330, 140, 700, 50); c.fill(); }
  eskiFoto(c, 0, 0, 640, 820, -.04);
  for (const s of [-1, 1]) { c.fillStyle = ten; c.strokeStyle = renk(ten, -.35); c.lineWidth = 6; c.beginPath(); c.ellipse(s * 300, 300, 70, 110, s * .3, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(s * 290, 180, 34, 70, s * -.3, 0, 7); c.fill(); c.stroke(); }
  c.restore();
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}
// Çantadan fotoğraf çıkarma
function insCanta(c, t, lt) {
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3a2c2a'); g.addColorStop(1, '#5a4034'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = 'rgba(255,190,110,.16)'; c.beginPath(); c.arc(300, 400, 800, 0, 7); c.fill();
  c.save(); c.translate(W / 2, 1180);
  // çanta askısı ve gövdesi
  c.strokeStyle = '#5a2f20'; c.lineWidth = 34; c.lineCap = 'round'; c.beginPath(); c.moveTo(-300, -240); c.quadraticCurveTo(0, -760, 300, -240); c.stroke();
  yd(c, -390, -260, 780, 580, 70); const cg = c.createLinearGradient(-390, 0, 390, 0); cg.addColorStop(0, '#8e4f35'); cg.addColorStop(1, '#6b3826'); konturlu(c, cg, 5);
  c.setLineDash([14, 12]); c.strokeStyle = 'rgba(240,200,150,.45)'; c.lineWidth = 4; yd(c, -360, -230, 720, 520, 56); c.stroke(); c.setLineDash([]);
  const fk = easeOut(seg(lt, 0, .7));
  c.fillStyle = '#2a1712'; c.fillRect(-330, -214, lerp(0, 660, fk), 28);
  c.strokeStyle = '#d4af5f'; c.lineWidth = 7; c.beginPath(); c.moveTo(-330, -200); c.lineTo(330, -200); c.stroke();
  c.fillStyle = '#e8c56e'; yd(c, lerp(-340, 320, fk) - 4, -226, 36, 54, 7); c.fill(); c.strokeStyle = '#a88a3e'; c.lineWidth = 3; c.stroke();
  const cik = easeOut(seg(lt, .8, 1.8));
  if (lt > .7) { c.save(); c.beginPath(); c.rect(-420, -1400, 840, 1210); c.clip(); eskiFoto(c, -20, lerp(-60, -600, cik), 420, 540, -.08); c.restore(); }
  // Sevda'nın eli: sağ alttan gelen kol
  const ten = KARAKTER.SEVDA.ten, hx = lt < .75 ? lerp(-330, 330, fk) + 10 : 130, hy = lt < .75 ? -232 : lerp(-200, -600, cik) + 40;
  c.fillStyle = KARAKTER.SEVDA.ust; c.strokeStyle = renk(KARAKTER.SEVDA.ust, -.4); c.lineWidth = 5;
  c.beginPath(); c.moveTo(hx + 55, hy + 10); c.lineTo(hx - 35, hy + 80); c.lineTo(560, 1100); c.lineTo(700, 640); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = ten; c.strokeStyle = renk(ten, -.35); c.lineWidth = 5;
  c.save(); c.translate(hx, hy); c.rotate(-.7);
  c.beginPath(); c.ellipse(0, 20, 62, 78, 0, 0, 7); c.fill(); c.stroke();
  for (let i = 0; i < 4; i++) { c.beginPath(); c.ellipse(-36 + i * 24, -58 + Math.abs(i - 1.5) * 6, 13, 34, 0, 0, 7); c.fill(); c.stroke(); }
  c.beginPath(); c.ellipse(-60, 10, 16, 36, -.8, 0, 7); c.fill(); c.stroke();
  c.restore();
  c.restore();
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.5)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}
// 112'yi tuşlama
function insTusla(c, t, lt) {
  c.fillStyle = '#251f2a'; c.fillRect(0, 0, W, H);
  c.save(); c.translate(W / 2, H / 2 + 60); c.rotate(-.05);
  yd(c, -260, -560, 520, 1100, 60); c.fillStyle = '#16171b'; c.fill(); yd(c, -236, -536, 472, 1052, 44); c.fillStyle = '#eef1f6'; c.fill();
  const n = Math.min(3, Math.floor(lt / .45) + 1), yazi = '112'.slice(0, n);
  c.fillStyle = '#222'; c.font = '800 110px Nunito'; c.textAlign = 'center'; c.fillText(yazi, 0, -330);
  const tus = '123456789*0#';
  for (let i = 0; i < 12; i++) { const x = -150 + (i % 3) * 150, y = -150 + Math.floor(i / 3) * 140, aktif = (tus[i] === '1' && n >= 1 && lt < .9) || (tus[i] === '2' && n === 3);
    c.fillStyle = aktif ? '#9fc4ff' : '#dfe3ea'; c.beginPath(); c.arc(x, y, 58, 0, 7); c.fill(); c.fillStyle = '#222'; c.font = '600 56px Nunito'; c.fillText(tus[i], x, y + 20); }
  c.fillStyle = '#3cb371'; c.beginPath(); c.arc(0, 430, 62, 0, 7); c.fill();
  const ten = KARAKTER.MERT.ten, px = [[-150, -150], [-150, -150], [0, -150]][Math.min(2, Math.floor(lt / .45))];
  c.fillStyle = ten; c.strokeStyle = renk(ten, -.35); c.lineWidth = 6; c.beginPath(); c.ellipse(px[0] + 40, px[1] + 190, 46, 150, -.25, 0, 7); c.fill(); c.stroke();
  c.fillStyle = KARAKTER.MERT.ust; yd(c, px[0] + 20, px[1] + 320, 200, 700, 60); c.fill();
  c.restore();
}
// Komiserin telefonunda arşiv kaydı (isim karartılmış)
function insArsiv(c, t, lt, d = {}) {
  const yil = d.yil || 1999, yas = d.yas || 7;
  c.fillStyle = '#1b1d24'; c.fillRect(0, 0, W, H);
  c.save(); c.translate(W / 2, H / 2 - 20); const z = 1 + lt * .03; c.scale(z, z);
  yd(c, -300, -620, 600, 1240, 60); c.fillStyle = '#111215'; c.fill(); yd(c, -276, -596, 552, 1192, 44); c.fillStyle = '#f4f5f7'; c.fill();
  c.fillStyle = '#1f3a6e'; yd(c, -276, -596, 552, 130, 44); c.fill(); c.fillRect(-276, -520, 552, 54);
  c.fillStyle = '#fff'; c.font = '800 38px Nunito'; c.textAlign = 'center'; c.fillText('EMNİYET ARŞİV KAYDI', 0, -510);
  c.textAlign = 'left'; c.fillStyle = '#333'; c.font = '800 40px Nunito'; c.fillText(`Dosya: ${yil} / 0418`, -236, -400);
  c.font = '600 34px Nunito'; c.fillStyle = '#555';
  const sat = ['Konu: Kayıp kız çocuğu', `Yaş: ${yas}`, 'Durum: Bulunamadı', 'Tanık ifadesi:'];
  sat.forEach((s, i) => c.fillText(s, -236, -320 + i * 64));
  c.fillStyle = '#111'; c.fillRect(-236, -96, 360, 40); c.fillStyle = '#c0392b'; c.font = '800 30px Nunito'; c.fillText('GİZLİ', 140, -66);
  c.fillStyle = '#ddd'; for (let i = 0; i < 6; i++) c.fillRect(-236, 0 + i * 48, 470 - (i % 3) * 60, 18);
  c.fillStyle = '#c9cfd8'; yd(c, -236, 320, 180, 220, 10); c.fill(); c.fillStyle = '#9aa3b0'; c.beginPath(); c.arc(-146, 400, 40, 0, 7); c.fill(); c.fillRect(-206, 450, 120, 90); c.fillStyle = '#555'; c.font = '600 26px Nunito'; c.fillText('Fotoğraf yok', -236, 580);
  c.restore();
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.6)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}

// elde tutulan eski fotoğraf (karakter nesnesi)
const _nesneTemel = nesne;
nesne = function (c, ad, x, y, aci) {
  if (ad !== 'foto') return _nesneTemel(c, ad, x, y, aci);
  c.save(); c.translate(x, y); eskiFoto(c, 0, 10, 110, 140, aci * .2); c.restore();
};

// ---------- KORİDOR (salon ile yatak odası arası) — dünya 0..3000 ----------
function koridorArka(c, o, t) {
  const g = c.createLinearGradient(0, 0, 0, DUVAR_Y); g.addColorStop(0, '#eedab6'); g.addColorStop(1, '#f5e5c6');
  c.fillStyle = g; c.fillRect(-400, -200, 3800, DUVAR_Y + 200);
  c.fillStyle = 'rgba(200,150,90,.12)'; for (let x = -400; x < 3400; x += 64) c.fillRect(x, 70, 22, 830);
  c.fillStyle = '#a8673a'; c.fillRect(-400, 900, 3800, DUVAR_Y - 900); c.fillStyle = '#c07d47'; c.fillRect(-400, 900, 3800, 14);
  c.strokeStyle = 'rgba(70,35,15,.35)'; c.lineWidth = 4; for (let x = -380; x < 3400; x += 180) c.strokeRect(x, 940, 150, 200);
  parke(c, -400, 3400, '#9a5e33', '#b9773f');
  // yolluk halı
  c.fillStyle = '#9c2f3a'; c.fillRect(-400, 1400, 3800, 260); c.strokeStyle = '#e6b85a'; c.lineWidth = 8; c.strokeRect(-420, 1425, 3840, 210);
  c.fillStyle = '#21507a'; for (let x = -300; x < 3400; x += 260) { c.beginPath(); c.moveTo(x, 1530); c.lineTo(x + 50, 1480); c.lineTo(x + 100, 1530); c.lineTo(x + 50, 1580); c.fill(); }
  // kapılar
  ahsapKapi(c, 300, 560, 400, 0, () => {}); ahsapKapi(c, 1300, 1560, 400, 0, () => {});
  ahsapKapi(c, 2500, 2760, 400, o.odaAcik ?? .3, (x, y, w, h) => { const og = c.createRadialGradient(x + w * .5, y + 300, 20, x + w * .5, y + 300, 500); og.addColorStop(0, '#8a6a3a'); og.addColorStop(1, '#2a1a0c'); c.fillStyle = og; c.fillRect(x, y, w, h); });
  // aile fotoğrafları
  fotoCerceve(c, 700, 420, 150, 190, 'anne', '#5a3418'); fotoCerceve(c, 900, 470, 210, 150, 'anneMert'); fotoCerceve(c, 1700, 430, 160, 200, 'dag', '#7a4a24'); fotoCerceve(c, 1920, 480, 230, 160, 'deniz'); fotoCerceve(c, 2250, 420, 130, 170, 'anneMert', '#3a2414');
  // aplikler
  for (const x of [640, 1220, 2200]) { c.fillStyle = '#7a5a2a'; c.fillRect(x - 6, 330, 12, 60); c.beginPath(); c.moveTo(x - 40, 330); c.lineTo(x + 40, 330); c.lineTo(x + 26, 270); c.lineTo(x - 26, 270); c.closePath(); c.fillStyle = '#ffe2a0'; c.fill(); }
}
function koridorIsik(c, o, t) {
  c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(110,105,160,.24)'; c.fillRect(-400, -200, 3800, 2400);
  c.globalCompositeOperation = 'screen';
  for (const x of [640, 1220, 2200]) { const g = c.createRadialGradient(x, 300, 10, x, 420, 650); g.addColorStop(0, 'rgba(255,200,110,.45)'); g.addColorStop(1, 'rgba(255,200,110,0)'); c.fillStyle = g; c.fillRect(x - 700, -200, 1400, 2400); }
  c.restore();
}

// ---------- GEÇMİŞ: 1999, gece, evin önü ----------
function disGecmis(c, t, lt, d = {}) {
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0f1834'); g.addColorStop(.55, '#26365e'); g.addColorStop(1, '#3a3a44'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  // ev cephesi
  c.fillStyle = '#a77d5a'; c.fillRect(-40, 260, 760, 1080); c.fillStyle = '#7d5a3e'; c.beginPath(); c.moveTo(-80, 270); c.lineTo(340, 60); c.lineTo(760, 270); c.fill();
  for (const [x, y, isik] of [[60, 380, 1], [380, 380, 0], [60, 760, 1]]) { c.fillStyle = isik ? '#ffd98a' : '#2a2a3a'; c.fillRect(x, y, 220, 260); c.strokeStyle = '#efe4d0'; c.lineWidth = 10; c.strokeRect(x, y, 220, 260); c.beginPath(); c.moveTo(x + 110, y); c.lineTo(x + 110, y + 260); c.stroke(); }
  c.fillStyle = '#5a3418'; c.fillRect(430, 820, 200, 520); c.fillStyle = 'rgba(255,220,150,.5)'; c.fillRect(440, 830, 180, 500);
  // kaldırım + yol
  c.fillStyle = '#6a6a72'; c.fillRect(0, 1340, W, 120); c.fillStyle = '#2c2c34'; c.fillRect(0, 1460, W, 500);
  c.strokeStyle = 'rgba(230,220,180,.5)'; c.lineWidth = 10; c.setLineDash([80, 60]); c.beginPath(); c.moveTo(0, 1760); c.lineTo(W, 1760); c.stroke(); c.setLineDash([]);
  // sokak lambası
  c.fillStyle = '#222'; c.fillRect(930, 300, 18, 1060); c.fillRect(860, 300, 90, 14); c.fillStyle = '#ffe9b0'; c.beginPath(); c.ellipse(865, 330, 34, 18, 0, 0, 7); c.fill();
  const lg = c.createRadialGradient(865, 340, 10, 865, 900, 900); lg.addColorStop(0, 'rgba(255,225,160,.45)'); lg.addColorStop(1, 'rgba(255,225,160,0)'); c.fillStyle = lg; c.fillRect(0, 0, W, H);
  // araba (koyu, 90'lar sedan)
  const ax = 620, ay = 1500;
  c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(ax + 250, ay + 135, 420, 30, 0, 0, 7); c.fill();
  c.fillStyle = '#1c2230'; c.beginPath(); c.moveTo(ax - 120, ay + 120); c.lineTo(ax - 120, ay + 30); c.lineTo(ax + 40, ay + 10); c.lineTo(ax + 120, ay - 90); c.lineTo(ax + 420, ay - 90); c.lineTo(ax + 520, ay + 10); c.lineTo(ax + 640, ay + 30); c.lineTo(ax + 640, ay + 120); c.closePath(); c.fill();
  c.fillStyle = '#3a4a66'; c.beginPath(); c.moveTo(ax + 140, ay - 75); c.lineTo(ax + 260, ay - 75); c.lineTo(ax + 260, ay + 5); c.lineTo(ax + 70, ay + 5); c.closePath(); c.fill(); c.beginPath(); c.moveTo(ax + 280, ay - 75); c.lineTo(ax + 405, ay - 75); c.lineTo(ax + 490, ay + 5); c.lineTo(ax + 280, ay + 5); c.closePath(); c.fill();
  const kapi = d.kapi ?? 1; // arka kapı açık
  if (kapi > 0) { c.fillStyle = '#0c0f16'; c.fillRect(ax + 270, ay - 70, 200, 180); c.fillStyle = '#232b3c'; c.beginPath(); c.moveTo(ax + 470, ay - 75); c.lineTo(ax + 470 + 120 * kapi, ay - 60); c.lineTo(ax + 470 + 120 * kapi, ay + 120); c.lineTo(ax + 470, ay + 125); c.fill(); }
  for (const x of [ax, ax + 500]) { c.fillStyle = '#0a0a0a'; c.beginPath(); c.arc(x, ay + 120, 58, 0, 7); c.fill(); c.fillStyle = '#777'; c.beginPath(); c.arc(x, ay + 120, 24, 0, 7); c.fill(); }
  c.fillStyle = '#ffd77a'; c.fillRect(ax + 620, ay + 40, 20, 26); c.fillStyle = '#c0392b'; c.fillRect(ax - 120, ay + 40, 16, 30);
  // adam (yüzü görünmez, sırtı dönük) ve küçük kız
  const k = seg(lt, 0, 2.4), mx = lerp(360, 760, k), my = lerp(1430, 1480, k);
  c.save(); c.filter = 'brightness(.25)'; kisiCiz(c, 'BABA_GENC', { x: mx, y: my, s: 1.08, arka: 1, yuru: k * 5, yon: 1, donuk: 1 }, t); c.restore();
  kisiCiz(c, 'KIZ', { x: mx - 170, y: my + 20, s: .66, duygu: 'korku', duygu2: 'uzgun', dk: .6, don: -.7, gozyasi: 1, yuru: k * 7, yon: 1, sag: [180, -560], titre: .8, bak: [-.9, -.2], donuk: 1, agizKapali: 0 }, t);
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.7)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}

// ---------- YAKIN PLANLAR (2. bölüm) ----------
function dikisKutusu(c, x, y, s, acik) {
  c.save(); c.translate(x, y); c.scale(s, s);
  yd(c, -170, -70, 340, 150, 18); konturlu(c, '#3d6f8e', 4);
  c.fillStyle = '#f2d48a'; for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(-130 + i * 52, 5, 14, 0, 7); c.fill(); c.fillStyle = '#d9707a'; c.beginPath(); c.arc(-130 + i * 52, 5, 6, 0, 7); c.fill(); c.fillStyle = '#f2d48a'; }
  if (acik > 0) { c.fillStyle = '#2f5a73'; c.beginPath(); c.moveTo(-170, -70); c.lineTo(170, -70); c.lineTo(150 - 20 * acik, -70 - 160 * acik); c.lineTo(-150 + 20 * acik, -70 - 160 * acik); c.closePath(); c.fill(); }
  else { yd(c, -180, -100, 360, 50, 14); konturlu(c, '#4a82a3', 4); }
  c.restore();
}
function insCekmece(c, t, lt) {
  c.fillStyle = '#8a5229'; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(60,30,10,.45)'; c.lineWidth = 8; c.strokeRect(80, 200, 920, 600);
  const ac = easeOut(seg(lt, .1, .8));
  c.fillStyle = '#2a160a'; c.fillRect(80, 960, 920, 560);
  c.save(); c.translate(0, ac * 220);
  c.fillStyle = '#9a5e30'; c.fillRect(60, 900, 960, 110); c.fillStyle = '#d4af5f'; c.beginPath(); c.arc(540, 955, 16, 0, 7); c.fill();
  c.fillStyle = '#6b3a1c'; c.fillRect(80, 1010, 920, 420);
  dikisKutusu(c, 540 + lerp(0, 40, seg(lt, 1, 2)), 1180 - easeOut(seg(lt, 1, 2)) * 260, 1.9, 0);
  c.restore();
  const ten = KARAKTER.MERT.ten; c.fillStyle = ten; c.strokeStyle = renk(ten, -.35); c.lineWidth = 6;
  const hy = 1150 + ac * 220 - easeOut(seg(lt, 1, 2)) * 260;
  for (const sg of [-1, 1]) { c.save(); c.translate(540 + sg * 330, hy); c.rotate(sg * .3); c.beginPath(); c.ellipse(0, 0, 70, 95, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = KARAKTER.MERT.ust; yd(c, -70, 60, 140, 700, 50); c.fill(); c.fillStyle = ten; c.restore(); }
  c.fillStyle = 'rgba(30,25,50,.3)'; c.fillRect(0, 0, W, H);
}
function insKutu(c, t, lt) {
  c.fillStyle = '#3a2a22'; c.fillRect(0, 0, W, H); c.fillStyle = 'rgba(255,200,120,.18)'; c.beginPath(); c.arc(500, 700, 800, 0, 7); c.fill();
  const ac = easeOut(seg(lt, .2, 1.1)), z = 1 + lt * .03;
  c.save(); c.translate(W / 2, 1150); c.scale(z, z);
  dikisKutusu(c, 0, 0, 2.6, ac);
  if (ac > .5) {
    c.save(); c.rotate(-.06); c.fillStyle = '#ead8b0'; c.fillRect(-330, -230, 520, 300); c.strokeStyle = '#b8a070'; c.lineWidth = 4; c.strokeRect(-330, -230, 520, 300);
    c.beginPath(); c.moveTo(-330, -230); c.lineTo(-70, -60); c.lineTo(190, -230); c.stroke();
    c.fillStyle = '#3a2410'; c.font = '600 70px Caveat'; c.textAlign = 'center'; c.fillText('Mert\'e', -70, 20); c.restore();
    c.save(); c.translate(250, -140); c.rotate(.18); c.fillStyle = '#efe4cc'; c.fillRect(-90, -110, 180, 220); c.fillStyle = '#9aa'; c.fillRect(-75, -95, 150, 160); c.restore();
  }
  c.restore();
  for (const sg of [-1, 1]) { c.save(); c.translate(W / 2 + sg * 420, 1050 + Math.sin(lt * 2) * 6); c.rotate(sg * -.4); c.fillStyle = '#8fb7d9'; c.strokeStyle = '#5b86ad'; c.lineWidth = 6; c.beginPath(); c.ellipse(0, 0, 80, 110, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = KARAKTER.SINAN.ust; yd(c, -70, 80, 140, 700, 50); c.fill(); c.restore(); }
}
// Üç kişilik eski fotoğraf: genç anne, küçük Sevda, yüzü yarı gölgede genç adam
function eskiFoto3(c, x, y, w, h, rot) {
  c.save(); c.translate(x, y); c.rotate(rot);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-w / 2 + 14, -h / 2 + 18, w, h);
  c.fillStyle = '#efe4cc'; c.fillRect(-w / 2, -h / 2, w, h);
  const ix = -w / 2 + w * .07, iy = -h / 2 + w * .07, iw = w * .86, ih = h - w * .07 - w * .2;
  c.save(); c.beginPath(); c.rect(ix, iy, iw, ih); c.clip();
  const gk = c.createLinearGradient(0, iy, 0, iy + ih); gk.addColorStop(0, '#b9c9d6'); gk.addColorStop(1, '#8aa07a'); c.fillStyle = gk; c.fillRect(ix, iy, iw, ih);
  kisiCiz(c, 'BABA_GENC', { x: ix + iw * .76, y: iy + ih * 1.6, s: ih / 690, duygu: 'notr', agizKapali: 1, don: -.2, donuk: 1 }, 0);
  // adamın yüzünün üst yarısı gölgede
  const gg = c.createLinearGradient(ix + iw * .55, 0, ix + iw, 0); gg.addColorStop(0, 'rgba(20,15,15,.0)'); gg.addColorStop(.25, 'rgba(20,15,15,.85)'); c.fillStyle = gg; c.fillRect(ix + iw * .55, iy, iw * .5, ih * .42);
  kisiCiz(c, 'ANNE_GENC', { x: ix + iw * .34, y: iy + ih * 1.62, s: ih / 720, duygu: 'sicak', agizKapali: 1, don: .2, donuk: 1 }, 0);
  kisiCiz(c, 'KIZ', { x: ix + iw * .52, y: iy + ih * 1.33, s: ih / 1050, duygu: 'notr', agizKapali: 1, donuk: 1 }, 0);
  c.fillStyle = 'rgba(200,150,80,.22)'; c.fillRect(ix, iy, iw, ih);
  c.restore();
  c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = w * .006; c.beginPath(); c.moveTo(-w / 2, h * .1); c.lineTo(w / 2, -h * .02); c.stroke();
  c.fillStyle = 'rgba(150,110,60,.25)'; c.beginPath(); c.ellipse(-w * .3, -h * .35, w * .1, h * .04, .3, 0, 7); c.fill();
  c.restore();
}
function insFoto3(c, t, lt, kimde = 'MERT') {
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3a2a35'); g.addColorStop(1, '#6a4a34'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  const z = 1 + lt * .035, tit = gurultu(t * 7, 3) * 4;
  c.save(); c.translate(W / 2 + tit, H / 2 - 40); c.scale(z, z);
  const K = KARAKTER[kimde]; for (const s of [-1, 1]) { c.fillStyle = K.ust; yd(c, s * 330 - 70, 330, 140, 700, 50); c.fill(); }
  eskiFoto3(c, 0, 0, 700, 860, .03);
  for (const s of [-1, 1]) { c.fillStyle = K.ten; c.strokeStyle = renk(K.ten, -.35); c.lineWidth = 6; c.beginPath(); c.ellipse(s * 330, 320, 70, 110, s * .3, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(s * 320, 200, 34, 70, s * -.3, 0, 7); c.fill(); c.stroke(); }
  c.restore();
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}
// Fotoğrafın arkası: tarih okunur, isim başparmağın altında / bulanık
function insFotoArka(c, t, lt, yakinlik = 0) {
  c.fillStyle = '#2e2428'; c.fillRect(0, 0, W, H);
  const z = 1 + yakinlik * 1.2 + lt * .02; c.save(); c.translate(W / 2 + gurultu(t * 7, 5) * 3, H / 2 - 40 - yakinlik * 120); c.scale(z, z);
  c.fillStyle = '#e9dcc0'; c.fillRect(-350, -430, 700, 860);
  c.fillStyle = 'rgba(150,110,60,.2)'; c.beginPath(); c.ellipse(150, 200, 120, 40, .4, 0, 7); c.fill();
  c.fillStyle = '#2a1a10'; c.font = '600 96px Caveat'; c.textAlign = 'center'; c.fillText('Ekim 1999', 0, -40);
  c.save(); c.filter = 'blur(7px)'; c.strokeStyle = '#2a1a10'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(-220, 80);
  for (let i = 0; i < 26; i++) { const x = -220 + i * 17; c.quadraticCurveTo(x + 8, 80 - 40 * hash(i + 3) - 10, x + 17, 80 + 18 * hash(i + 9)); } c.stroke(); c.restore();
  const ten = KARAKTER.MERT.ten; c.fillStyle = ten; c.strokeStyle = renk(ten, -.35); c.lineWidth = 6;
  c.save(); c.translate(-40, 150); c.rotate(-.5); c.beginPath(); c.ellipse(0, 0, 70, 160, 0, 0, 7); c.fill(); c.stroke(); c.restore();
  c.restore();
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.6)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}
// Annenin mektubu — el yazısı, okunan kısım belirginleşir
function insMektup(c, t, lt, ilerleme) {
  c.fillStyle = '#2b2226'; c.fillRect(0, 0, W, H); c.fillStyle = 'rgba(255,200,120,.18)'; c.beginPath(); c.arc(300, 500, 800, 0, 7); c.fill();
  const tit = gurultu(t * 9, 6) * 5;
  c.save(); c.translate(W / 2 + tit, H / 2 - 60); c.rotate(-.03 + gurultu(t * 2, 7) * .01);
  c.fillStyle = '#f0e2bf'; c.fillRect(-420, -560, 840, 1120); c.strokeStyle = 'rgba(170,140,90,.35)'; c.lineWidth = 2;
  for (let y = -440; y < 520; y += 86) { c.beginPath(); c.moveTo(-370, y); c.lineTo(370, y); c.stroke(); }
  c.strokeStyle = 'rgba(150,120,70,.3)'; c.beginPath(); c.moveTo(-420, -40); c.lineTo(420, -20); c.stroke();
  const satirlar = ['Sevgili oğlum...', '', 'Bir gün Sevda', 'geri dönerse,', 'bil ki onu', 'koruyamadım.', '', '            Annen'];
  const toplam = satirlar.join('').length; let say = 0;
  c.font = '600 76px Caveat'; c.textAlign = 'left';
  satirlar.forEach((st, i) => { const y = -460 + i * 86; for (const ch of st) { say++; c.fillStyle = say / toplam <= ilerleme ? '#1f2a5a' : 'rgba(31,42,90,.18)'; } c.fillStyle = (say / toplam) <= ilerleme + .02 ? '#1f2a5a' : 'rgba(31,42,90,.2)'; c.fillText(st, -360, y); });
  c.restore();
  const ten = KARAKTER.MERT.ten; c.fillStyle = ten; c.strokeStyle = renk(ten, -.35); c.lineWidth = 6;
  for (const sg of [-1, 1]) { c.save(); c.translate(W / 2 + sg * 430 + tit, 1350); c.rotate(sg * .25); c.beginPath(); c.ellipse(0, 0, 70, 100, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = KARAKTER.MERT.ust; yd(c, -70, 70, 140, 700, 50); c.fill(); c.restore(); }
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.5)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}
