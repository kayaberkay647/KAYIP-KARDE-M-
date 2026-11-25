// YASTIĞIMDAKİ MUSKA — 1. Bölüm: mekânlar ve çekimler
'use strict';

// ───────────── arka plan önbelleği ─────────────
const ONBELLEK = {};
const PAY = 160;
function onbellek(ad, fn) {
  if (!ONBELLEK[ad]) { const k = tuval(W + PAY * 2, H + PAY * 2), g = k.getContext('2d'); g.translate(PAY, PAY); fn(g); ONBELLEK[ad] = k; }
  return ONBELLEK[ad];
}
function arka(g, ad, fn, o = {}) { // o.olcek, o.merkez, o.blur
  const k = onbellek(ad, fn);
  g.save();
  if (o.olcek) { const [mx, my] = o.merkez || [W / 2, H / 2]; g.translate(mx, my); g.scale(o.olcek, o.olcek); g.translate(-mx, -my); }
  if (o.blur) g.filter = `blur(${o.blur}px)`;
  g.drawImage(k, -PAY, -PAY); g.filter = 'none';
  g.restore();
}

// ───────────── desen yardımcıları ─────────────
function yaprakDesen(g, x0, y0, x1, y1, renk, ara = 86) {
  g.fillStyle = renk;
  for (let y = y0, r = 0; y < y1; y += ara, r++) for (let x = x0 + (r % 2) * ara / 2; x < x1; x += ara) {
    g.save(); g.translate(x, y); g.rotate(-.6);
    el(g, -5, 0, 5, 10, .5); g.fill(); el(g, 5, 0, 5, 10, -.5); g.fill(); g.restore();
  }
}
function vinyetDunya(g, a = .5) { g.fillStyle = rg(g, W / 2, H / 2, 500, 1300, [[0, 'rgba(0,0,0,0)'], [1, `rgba(0,0,0,${a})`]]); g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); }

// ───────────── BÜYÜ ODASI ─────────────
function buyuDuvar(g) {
  g.fillStyle = dg(g, 0, 0, 0, H, [[0, '#24130f'], [1, '#160b09']]); g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
  g.globalAlpha = .35; for (let x = -PAY; x < W + PAY; x += 120) { g.beginPath(); g.moveTo(x, -PAY); g.lineTo(x + 6, H); cizgi(g, 3, '#0d0605'); } g.globalAlpha = 1;
  // asılı kurutulmuş otlar
  for (let i = 0; i < 6; i++) {
    const x = 80 + i * 180, y = 60 + (i % 2) * 40;
    g.beginPath(); g.moveTo(x, -PAY); g.lineTo(x, y); cizgi(g, 3, '#3a2419');
    for (let j = 0; j < 7; j++) { g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + (j - 3) * 14, y + 60, x + (j - 3) * 22, y + 150 + hash(i * 7 + j) * 60); cizgi(g, 5, j % 2 ? '#3d3a22' : '#4a2c1f'); }
  }
  // raf + kavanozlar + nazar boncukları
  rr(g, 60, 560, 960, 22, 4); dol(g, '#3a2116'); cizgi(g, 3, '#0d0605');
  for (let i = 0; i < 7; i++) { const x = 110 + i * 130, h = 80 + hash(i) * 60; rr(g, x, 560 - h, 70, h, 12); g.fillStyle = `rgba(${90 + i * 10},${70 + i * 5},50,.55)`; g.fill(); cizgi(g, 3, '#0d0605'); }
  g.save(); g.translate(880, 360);
  for (let i = 0; i < 3; i++) { el(g, i * 40 - 40, 0, 16, 16); dol(g, '#1e3f8a'); el(g, i * 40 - 40, 0, 10, 10); dol(g, '#e8eef8'); el(g, i * 40 - 40, 0, 5, 5); dol(g, '#0d1a3a'); }
  g.restore();
}
function masa(g, y = 1250) {
  g.fillStyle = dg(g, 0, y, 0, H, [[0, '#4a2a1c'], [1, '#2a170f']]); g.fillRect(-PAY, y, W + PAY * 2, H - y + PAY);
  g.beginPath(); g.moveTo(-PAY, y); g.lineTo(W + PAY, y); cizgi(g, 6, '#130905');
  g.globalAlpha = .4; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(-PAY, y + 70 + i * 120); g.bezierCurveTo(300, y + 50 + i * 120, 700, y + 100 + i * 120, W + PAY, y + 60 + i * 120); cizgi(g, 3, '#1c0e08'); } g.globalAlpha = 1;
  // dağınık eşyalar: kırmızı iplik yumağı, nazar boncuğu
  el(g, 160, y + 120, 46, 36); dol(g, '#8e1c22'); cizgi(g, 3, '#2a0808');
  g.globalAlpha = .6; for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(160, y + 120, 12 + i * 7, i, i + 2.4); cizgi(g, 2, '#5e0e13'); } g.globalAlpha = 1;
  g.beginPath(); g.moveTo(200, y + 130); g.bezierCurveTo(300, y + 180, 360, y + 120, 460, y + 170); cizgi(g, 3, '#8e1c22');
}
function altIsik(renk = '255,150,70', a = .28) { return g => { g.fillStyle = dg(g, 0, -130, 0, 140, [[0, 'rgba(0,0,0,.35)'], [.55, 'rgba(0,0,0,0)'], [1, `rgba(${renk},${a})`]]); g.fillRect(-130, -140, 260, 290); }; }

// ───────────── MUTFAK ─────────────
function mutfakArka(g) {
  g.fillStyle = dg(g, 0, 0, 0, 1300, [[0, '#f5e3c8'], [1, '#ecd5b5']]); g.fillRect(-PAY, -PAY, W + PAY * 2, 1500 + PAY);
  yaprakDesen(g, -PAY, -PAY, W + PAY, 800, 'rgba(205,170,125,.35)');
  // pencere
  const px = 300, py = 220, pw = 480, ph = 460;
  rr(g, px - 22, py - 22, pw + 44, ph + 44, 10); dol(g, '#f8f2e8'); cizgi(g);
  g.fillStyle = dg(g, 0, py, 0, py + ph, [[0, '#cfe5ee'], [.7, '#f3ead2'], [1, '#f7e3b8']]); g.fillRect(px, py, pw, ph);
  g.save(); g.beginPath(); g.rect(px, py, pw, ph); g.clip();
  el(g, px + pw - 80, py + 80, 70, 70); g.fillStyle = 'rgba(255,248,215,.9)'; g.fill();
  for (let i = 0; i < 6; i++) { el(g, px + 30 + i * 90, py + ph - 60 + (i % 2) * 30, 90, 80); dol(g, i % 2 ? '#84ad69' : '#9ac17c'); cizgi(g, 3, '#5d7f47'); }
  g.restore();
  g.beginPath(); g.moveTo(px + pw / 2, py); g.lineTo(px + pw / 2, py + ph); g.moveTo(px, py + ph / 2); g.lineTo(px + pw, py + ph / 2); cizgi(g, 12, '#f8f2e8'); g.beginPath(); g.rect(px, py, pw, ph); cizgi(g);
  rr(g, px - 40, py + ph + 14, pw + 80, 26, 6); dol(g, '#f2eadf'); cizgi(g);
  // saksı
  rr(g, px + 30, py + ph - 50, 70, 64, 10); dol(g, '#c86f4a'); cizgi(g); for (let i = 0; i < 5; i++) { el(g, px + 65 + (i - 2) * 16, py + ph - 70 - (i % 2) * 20, 14, 26, (i - 2) * .4); dol(g, '#6d9c50'); cizgi(g, 2.5); }
  // perdeler
  for (const s of [-1, 1]) {
    const x = s < 0 ? px - 90 : px + pw + 20;
    g.beginPath(); g.moveTo(x, py - 60); g.lineTo(x + 70, py - 60); g.quadraticCurveTo(x + 50 - s * 10, py + 300, x + 80, py + ph + 40); g.lineTo(x - 10, py + ph + 40); g.quadraticCurveTo(x + 20, py + 300, x, py - 60); g.closePath();
    dol(g, '#f3e4cf'); cizgi(g); g.globalAlpha = .5; g.beginPath(); g.moveTo(x + 30, py - 50); g.quadraticCurveTo(x + 30, py + 300, x + 36, py + ph + 30); cizgi(g, 3, '#d4b896'); g.globalAlpha = 1;
  }
  rr(g, px - 120, py - 72, pw + 240, 14, 7); dol(g, '#9a7050'); cizgi(g, 3);
  // üst dolaplar
  for (const [x, w] of [[-PAY, 280 + PAY - 20], [840, 400]]) {
    rr(g, x, 120, w, 420, 6); dol(g, '#d9b68c'); cizgi(g);
    for (let i = 0; i < 2; i++) { rr(g, x + 20 + i * (w / 2), 140, w / 2 - 30, 380, 6); dol(g, '#e2c29b'); cizgi(g, 3); el(g, x + (i ? w / 2 + 30 : w / 2 - 40), 470, 7, 7); dol(g, '#7a5236'); }
  }
  // fayans
  g.fillStyle = '#eef2f0'; g.fillRect(-PAY, 820, W + PAY * 2, 420);
  g.globalAlpha = .9; for (let y = 820; y < 1240; y += 70) { g.beginPath(); g.moveTo(-PAY, y); g.lineTo(W + PAY, y); cizgi(g, 2.5, '#c9d6d8'); }
  for (let y = 820, r = 0; y < 1240; y += 70, r++) for (let x = -PAY + (r % 2) * 35; x < W + PAY; x += 70) { g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 70); cizgi(g, 2.5, '#c9d6d8'); }
  g.globalAlpha = 1; g.beginPath(); g.moveTo(-PAY, 820); g.lineTo(W + PAY, 820); cizgi(g);
  // davlumbaz
  poly(g, [[400, 560], [680, 560], [720, 760], [360, 760]]); g.fillStyle = dg(g, 360, 0, 720, 0, [[0, '#bfc3c6'], [.5, '#e3e6e8'], [1, '#aeb2b5']]); g.fill(); cizgi(g);
  rr(g, 350, 760, 380, 34, 6); dol(g, '#cfd3d6'); cizgi(g);
  // güneş huzmeleri
  g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = .07; g.fillStyle = '#fff3d0';
  for (let i = 0; i < 3; i++) { poly(g, [[px + 80 + i * 140, py], [px + 180 + i * 140, py], [px - 300 + i * 260, H], [px - 520 + i * 260, H]]); g.fill(); }
  g.restore();
}
function mutfakOn(g, y = 1240) {
  rr(g, -PAY, y, W + PAY * 2, 44, 0); g.fillStyle = dg(g, 0, y, 0, y + 44, [[0, '#f4efe8'], [1, '#d9d0c4']]); g.fill(); cizgi(g);
  g.fillStyle = dg(g, 0, y + 44, 0, H, [[0, '#c9a27a'], [1, '#a8805a']]); g.fillRect(-PAY, y + 44, W + PAY * 2, H - y + PAY);
  g.beginPath(); g.moveTo(-PAY, y + 44); g.lineTo(W + PAY, y + 44); cizgi(g);
  for (let x = -60; x < W + 100; x += 300) { rr(g, x + 20, y + 80, 260, 700, 10); g.lineWidth = 4; g.strokeStyle = '#8c6644'; g.stroke(); rr(g, x + 120, y + 110, 60, 12, 6); dol(g, '#7a5236'); cizgi(g, 2.5); }
}
function ocak(g, x, y, s) { el(g, x, y + 6 * s, 220 * s, 50 * s); dol(g, '#2a2626'); cizgi(g, 4, '#0d0b0b'); }

// ───────────── ANTRE ─────────────
function antreDuvar(g, o = {}) {
  g.fillStyle = dg(g, 0, 0, 0, 1500, [[0, '#f2e2c9'], [1, '#e8d3b4']]); g.fillRect(-PAY, -PAY, W + PAY * 2, 1500 + PAY);
  yaprakDesen(g, -PAY, -PAY, W + PAY, 1250, 'rgba(196,160,118,.4)', 80);
  rr(g, -PAY, 1180, W + PAY * 2, 320, 0); dol(g, '#e3cdb0'); g.beginPath(); g.moveTo(-PAY, 1180); g.lineTo(W + PAY, 1180); cizgi(g, 5);
  for (let x = -40; x < W + 100; x += 230) { rr(g, x, 1220, 190, 240, 6); g.lineWidth = 3; g.strokeStyle = '#c9ae8c'; g.stroke(); }
  g.fillStyle = dg(g, 0, 1500, 0, H, [[0, '#b88a5f'], [1, '#93683f']]); g.fillRect(-PAY, 1500, W + PAY * 2, H - 1500 + PAY);
  g.beginPath(); g.moveTo(-PAY, 1500); g.lineTo(W + PAY, 1500); cizgi(g, 5);
  g.globalAlpha = .5; for (let i = 0; i < 8; i++) { g.beginPath(); g.moveTo(-PAY + i * 220, 1500); g.lineTo(-400 + i * 300, H + PAY); cizgi(g, 3, '#7a542f'); } g.globalAlpha = 1;
  // askılık + ceket
  rr(g, 40, 520, 220, 26, 6); dol(g, '#8e6142'); cizgi(g, 3);
  for (let i = 0; i < 3; i++) { el(g, 70 + i * 80, 560, 9, 9); dol(g, '#d8b84a'); cizgi(g, 2); }
  g.beginPath(); g.moveTo(80, 560); g.quadraticCurveTo(30, 700, 60, 920); g.lineTo(170, 930); g.quadraticCurveTo(160, 700, 110, 560); g.closePath(); dol(g, '#6b5a7a'); cizgi(g);
  // ayna + aplik
  el(g, 920, 560, 90, 130); dol(g, '#c9a46c'); cizgi(g); el(g, 920, 560, 72, 110); g.fillStyle = dg(g, 850, 450, 990, 670, [[0, '#dfe9ec'], [1, '#b9c9cf']]); g.fill(); cizgi(g, 3);
  g.globalAlpha = .5; g.beginPath(); g.moveTo(880, 500); g.lineTo(940, 460); g.moveTo(890, 540); g.lineTo(960, 490); cizgi(g, 6, '#fff'); g.globalAlpha = 1;
  // ayakkabılık
  rr(g, 800, 1300, 240, 200, 8); dol(g, '#9a6c4a'); cizgi(g); g.beginPath(); g.moveTo(920, 1300); g.lineTo(920, 1500); cizgi(g, 3);
}
function antreKapiBosluk(g) { // açık kapının ardı: apartman sahanlığı
  g.fillStyle = dg(g, 0, 420, 0, 1500, [[0, '#6b625a'], [1, '#3e3833']]); g.fillRect(330, 420, 420, 1080);
  rr(g, 400, 520, 280, 360, 6); dol(g, '#57504a'); // karşı kapı
  g.fillStyle = 'rgba(255,240,200,.25)'; poly(g, [[480, 420], [600, 420], [700, 1500], [380, 1500]]); g.fill();
}
function antreKapi(g, acik) {
  // kasa
  rr(g, 300, 390, 480, 1120, 8); dol(g, '#7d5235'); cizgi(g);
  if (acik < .02) { rr(g, 330, 420, 420, 1080, 4); dol(g, '#a46d45'); cizgi(g); kapiPanel(g, 330, 420, 420, 1); return; }
  antreKapiBosluk(g);
  g.beginPath(); g.rect(330, 420, 420, 1080); cizgi(g);
}
function kapiPanel(g, x, y, w, sx) {
  for (const [py, ph] of [[60, 420], [540, 460]]) { rr(g, x + w * .12, y + py, w * .76, ph, 8); g.lineWidth = 4; g.strokeStyle = '#7b4c2c'; g.stroke(); }
  el(g, x + (sx > 0 ? w * .86 : w * .14), y + 560, 14, 14); dol(g, '#d8b84a'); cizgi(g, 3);
}
function antreKapiKanat(g, acik) { // içe doğru açılan kapı kanadı (sol menteşe)
  if (acik < .02) return;
  const gen = 420 * Math.cos(acik * 1.35), egim = 60 * Math.sin(acik * 1.35);
  g.beginPath(); g.moveTo(330, 420); g.lineTo(330 + gen, 420 + egim); g.lineTo(330 + gen, 1500 - egim * .6); g.lineTo(330, 1500); g.closePath();
  g.fillStyle = dg(g, 330, 0, 330 + gen, 0, [[0, '#8e5c3a'], [1, '#a46d45']]); g.fill(); cizgi(g);
}

// ───────────── YATAK ODASI ─────────────
function yatakOdasi(g, gece) {
  g.fillStyle = gece ? '#cdbdc0' : '#ead8d0'; g.fillRect(-PAY, -PAY, W + PAY * 2, 1500 + PAY);
  yaprakDesen(g, -PAY, -PAY, W + PAY, 1500, gece ? 'rgba(150,120,130,.35)' : 'rgba(200,160,150,.4)', 90);
  // pencere (sağ)
  const px = 790, py = 260, pw = 330, ph = 560;
  rr(g, px - 18, py - 18, pw + 36, ph + 36, 8); dol(g, '#f4ece4'); cizgi(g);
  g.fillStyle = gece ? dg(g, 0, py, 0, py + ph, [[0, '#16203a'], [1, '#2c3a5e']]) : dg(g, 0, py, 0, py + ph, [[0, '#d3e4ee'], [1, '#f1e8d8']]); g.fillRect(px, py, pw, ph);
  if (gece) { el(g, px + 220, py + 130, 52, 52); dol(g, '#f3efd8'); isikHalesi(g, px + 220, py + 130, 220, '200,210,255', .35); for (let i = 0; i < 14; i++) { el(g, px + hash(i) * pw, py + hash(i + 5) * ph * .7, 2.5, 2.5); dol(g, '#fff'); } }
  else { for (let i = 0; i < 4; i++) { el(g, px + 40 + i * 90, py + ph - 50, 80, 70); dol(g, '#9ac17c'); cizgi(g, 3, '#5d7f47'); } }
  g.beginPath(); g.moveTo(px + pw / 2, py); g.lineTo(px + pw / 2, py + ph); cizgi(g, 10, '#f4ece4'); g.beginPath(); g.rect(px, py, pw, ph); cizgi(g);
  for (const x of [px - 70, px + pw - 30]) { g.beginPath(); g.moveTo(x, py - 50); g.lineTo(x + 100, py - 50); g.quadraticCurveTo(x + 80, py + 320, x + 110, py + ph + 80); g.lineTo(x - 10, py + ph + 80); g.quadraticCurveTo(x + 20, py + 320, x, py - 50); g.closePath(); dol(g, gece ? '#6f7f9b' : '#a9b8cf'); cizgi(g); }
  // düğün fotoğrafı
  rr(g, 380, 300, 300, 230, 6); dol(g, '#c9a24f'); cizgi(g); rr(g, 400, 320, 260, 190, 4); dol(g, '#efe6d6');
  g.save(); g.translate(490, 440); el(g, 0, -52, 22, 24); dol(g, '#f6d6c0'); el(g, 0, -62, 26, 18); dol(g, '#8d5837'); poly(g, [[-30, -28], [30, -28], [48, 64], [-48, 64]]); dol(g, '#ffffff'); cizgi(g, 2.5); g.restore();
  g.save(); g.translate(572, 436); el(g, 0, -54, 22, 24); dol(g, '#f6d6c0'); el(g, 0, -68, 24, 14); dol(g, '#2c211c'); rr(g, -30, -28, 60, 96, 6); dol(g, '#2b2b36'); cizgi(g, 2.5); g.restore();
  // başlık
  g.beginPath(); g.moveTo(150, 1000); g.lineTo(150, 720); g.quadraticCurveTo(540, 580, 930, 720); g.lineTo(930, 1000); g.closePath(); dol(g, '#8e6345'); cizgi(g);
  g.beginPath(); g.moveTo(200, 980); g.lineTo(200, 750); g.quadraticCurveTo(540, 640, 880, 750); g.lineTo(880, 980); g.closePath(); dol(g, '#a5774f'); cizgi(g, 3);
  // komodin + lamba
  rr(g, -60, 1000, 240, 300, 8); dol(g, '#9a6c4a'); cizgi(g); g.beginPath(); g.moveTo(-60, 1130); g.lineTo(180, 1130); cizgi(g, 3); el(g, 60, 1080, 12, 6); dol(g, '#d8b84a'); el(g, 60, 1200, 12, 6); dol(g, '#d8b84a');
  rr(g, 20, 880, 30, 120, 6); dol(g, '#c9a46c'); cizgi(g, 3); poly(g, [[-20, 760], [90, 760], [120, 880], [-50, 880]]); dol(g, gece ? '#bfae96' : '#f3e7cf'); cizgi(g);
  g.fillStyle = gece ? '#bcaab0' : '#dcc8c0'; g.fillRect(-PAY, 1500, W + PAY * 2, H);
  g.fillStyle = dg(g, 0, 1500, 0, H, [[0, gece ? '#6a5048' : '#a37a58'], [1, gece ? '#4a3832' : '#8a6446']]); g.fillRect(-PAY, 1500, W + PAY * 2, H - 1500 + PAY);
}
function yatakOn(g, gece, y = 1030) { // yorgan + karyola ön tahtası
  g.beginPath(); g.moveTo(130, y + 30); g.quadraticCurveTo(540, y - 30, 950, y + 30); g.lineTo(980, 1520); g.lineTo(100, 1520); g.closePath();
  g.fillStyle = gece ? dg(g, 0, y, 0, 1520, [[0, '#8f9fc0'], [1, '#6f7ea0']]) : dg(g, 0, y, 0, 1520, [[0, '#c4d0e2'], [1, '#a9b6cc']]); g.fill(); cizgi(g);
  g.globalAlpha = .35; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(140 + i * 150, y + 40); g.quadraticCurveTo(160 + i * 150, y + 260, 120 + i * 160, 1510); cizgi(g, 3, '#ffffff'); } g.globalAlpha = 1;
  g.beginPath(); g.moveTo(130, y + 30); g.quadraticCurveTo(540, y - 30, 950, y + 30); g.lineTo(950, y + 80); g.quadraticCurveTo(540, y + 20, 130, y + 80); g.closePath(); dol(g, gece ? '#c9c4d6' : '#f6f2ea'); cizgi(g, 3.5);
  rr(g, 80, 1500, 920, 150, 12); dol(g, '#8e6345'); cizgi(g); rr(g, 120, 1530, 840, 90, 8); g.lineWidth = 3; g.strokeStyle = '#6e4a31'; g.stroke();
}
function emreArkaKafa(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -34, 70, 68, 70, 10); dol(g, TEN.emre[0]); cizgi(g);
  for (const k of [-1, 1]) { el(g, k * 100, 14, 15, 22); dol(g, TEN.emre[0]); cizgi(g); el(g, k * 100, 14, 6, 11); dol(g, TEN.emre[1]); }
  g.beginPath(); g.moveTo(-104, 30); g.bezierCurveTo(-118, -100, -50, -140, 4, -138); g.bezierCurveTo(70, -138, 120, -96, 104, 30);
  g.bezierCurveTo(96, 80, 50, 100, 0, 96); g.bezierCurveTo(-50, 100, -96, 80, -104, 30); g.closePath();
  g.fillStyle = dg(g, 0, -140, 0, 100, [[0, '#5a463c'], [.5, '#3a2c25'], [1, '#2a1f1a']]); g.fill(); cizgi(g);
  g.globalAlpha = .55; for (let i = 0; i < 7; i++) { g.beginPath(); g.moveTo(-70 + i * 22, -110 + Math.abs(i - 3) * 8); g.quadraticCurveTo(-64 + i * 21, 0, -58 + i * 19, 88); cizgi(g, 3, '#1c1411'); } g.globalAlpha = 1;
  g.globalAlpha = .35; g.beginPath(); g.moveTo(-40, -110); g.quadraticCurveTo(0, -126, 40, -112); cizgi(g, 8, '#8a7266'); g.globalAlpha = 1;
  g.restore();
}

// ───────────── BANYO ─────────────
function banyoArka(g) {
  g.fillStyle = '#d9e6e4'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
  g.globalAlpha = .7; for (let y = -PAY; y < H; y += 90) { g.beginPath(); g.moveTo(-PAY, y); g.lineTo(W + PAY, y); cizgi(g, 3, '#b9cbc9'); } for (let x = -PAY; x < W + PAY; x += 90) { g.beginPath(); g.moveTo(x, -PAY); g.lineTo(x, H); cizgi(g, 3, '#b9cbc9'); } g.globalAlpha = 1;
}
function aynaIci(g) {
  g.fillStyle = '#e8efee'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
  g.globalAlpha = .6; for (let y = 0; y < H; y += 110) { g.beginPath(); g.moveTo(-PAY, y); g.lineTo(W + PAY, y); cizgi(g, 3, '#c9d8d6'); } for (let x = 0; x < W + PAY; x += 110) { g.beginPath(); g.moveTo(x, -PAY); g.lineTo(x, H); cizgi(g, 3, '#c9d8d6'); } g.globalAlpha = 1;
  rr(g, 820, 380, 40, 240, 10); dol(g, '#c9a46c'); cizgi(g, 3);
  g.beginPath(); g.moveTo(780, 420); g.lineTo(900, 420); g.lineTo(920, 820); g.lineTo(760, 820); g.closePath(); dol(g, '#e8a5a5'); cizgi(g); g.globalAlpha = .4; g.beginPath(); g.moveTo(790, 760); g.lineTo(910, 760); cizgi(g, 6, '#fff'); g.globalAlpha = 1;
  rr(g, 120, 600, 220, 20, 6); dol(g, '#f4f1ea'); cizgi(g, 3); rr(g, 150, 520, 50, 80, 10); dol(g, '#9fc4d8'); cizgi(g, 3); rr(g, 230, 540, 40, 60, 8); dol(g, '#f0d58a'); cizgi(g, 3);
}
function aynaCerceve(g, x, y, w, h) {
  g.save(); g.beginPath(); g.rect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); g.roundRect(x, y, w, h, 40); g.clip('evenodd');
  banyoArka(g); g.restore();
  rr(g, x - 14, y - 14, w + 28, h + 28, 50); g.lineWidth = 28; g.strokeStyle = '#d9c4a0'; g.stroke(); cizgi(g); rr(g, x, y, w, h, 40); cizgi(g);
  g.save(); g.globalAlpha = .1; g.fillStyle = '#fff'; poly(g, [[x + 80, y], [x + 260, y], [x + 60, y + h], [x - 120, y + h]]); g.fill(); poly(g, [[x + 330, y], [x + 390, y], [x + 190, y + h], [x + 130, y + h]]); g.fill(); g.restore();
  // lavabo
  el(g, 540, 1720, 470, 120); dol(g, '#f7f7f5'); cizgi(g); el(g, 540, 1730, 380, 80); g.fillStyle = dg(g, 0, 1660, 0, 1800, [[0, '#d5dcdc'], [1, '#f7f7f5']]); g.fill(); cizgi(g, 3);
  rr(g, 520, 1560, 40, 100, 10); dol(g, '#c7cdd1'); cizgi(g); rr(g, 500, 1560, 120, 26, 12); dol(g, '#dde2e5'); cizgi(g, 3);
}

// ───────────── RÜYA ─────────────
function ruyaArka(g) {
  g.fillStyle = rg(g, 540, 1000, 50, 1300, [[0, '#3a1618'], [1, '#050203']]); g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
}
function tahtaTarak(g) { rr(g, -90, -24, 180, 40, 10); dol(g, '#8a5a32'); cizgi(g, 3.5); for (let i = 0; i < 14; i++) { rr(g, -84 + i * 12.5, 12, 7, 46, 3); dol(g, '#8a5a32'); cizgi(g, 2); } }

// ───────────── ÇEKİMLER ─────────────
const KAM = (x, y, z0, z1, o = {}) => (lt, d) => ({ x: lerp(x, o.x1 ?? x, ease(lt / d)), y: lerp(y, o.y1 ?? y, ease(lt / d)), z: lerp(z0, z1, o.lineer ? clamp(lt / d) : ease(lt / d)) });
const N = (g, T, o) => karakter(g, NAZLI, Object.assign({ t: T, T }, o));
const HT = (g, T, o) => karakter(g, HATICE, Object.assign({ t: T, T }, o));
const EM = (g, T, o) => karakter(g, EMRE, Object.assign({ t: T, T }, o));

const CEKIM = {
  // ═════ SAHNE 1 · BÜYÜ ═════
  A1: { renk: 'buyu', vinyet: .55, kam: KAM(540, 900, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'buyu', buyuDuvar);
      const it = ease(aralik(lt, .3, 1.8));
      HT(g, T, { x: 520, y: 690, s: 1.58, kas: 'kizgin', gulum: -.15, gozAcik: .6, bak: [.5, .55], isik: altIsik(),
        kollar: { sag: { el: [lerp(120, 170, it), lerp(360, 368, it)], on: true }, sol: { el: [-150, 368], on: true } } });
      arka(g, 'masa', g => masa(g)); zarf(g, lerp(640, 720, it), 1305, .32, 0, 0, T);
      mum(g, 860, 1330, .95, T);
      isikHalesi(g, 862, 1170, 620, '255,160,70', .55, T); karanlik(g, 862, 1170, 160, 1150, .86, T);
    } },
  A2: { renk: 'buyu', vinyet: .6, kam: KAM(540, 1000, 1.0, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'masaYakin', g => { masa(g, -PAY); });
      const ac = ease(aralik(lt, .15, .9)), sc = ease(aralik(lt, .7, 2.0));
      zarf(g, 540, 1100, 1.25, ac, sc, T);
      gulizarEl(g, 300, lerp(620, 700, ac), 1.15, .5, {});
      gulizarEl(g, 800, lerp(760, 700, sc), 1.15, -.55, {});
      isikHalesi(g, 980, 760, 900, '255,150,60', .5, T); karanlik(g, 900, 800, 200, 1300, .85, T);
    } },
  A3: { renk: 'buyu', vinyet: .6, kam: KAM(540, 860, 1.0, 1.06), ciz: gulizarCekim },
  A4: { renk: 'buyu', vinyet: .6, kam: KAM(540, 760, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'buyu', buyuDuvar, { olcek: 1.3, merkez: [540, 700], blur: 3 });
      const kot = replikAktif('H02', T) && (T - ZAMAN.replikler.find(r => r.id === 'H02').t0) > 1.4;
      HT(g, T, { x: 540, y: 780, s: 2.1, kas: 'kizgin', gulum: kot ? .35 : -.1, gozAcik: kot ? .55 : .7, bak: [.35, .1], isik: altIsik('255,150,70', .32) });
      isikHalesi(g, 880, 1750, 900, '255,150,60', .45, T); karanlik(g, 820, 1650, 250, 1400, .82, T);
    } },
  A5: { renk: 'buyu', vinyet: .6, kam: KAM(540, 860, 1.06, 1.14), ciz: gulizarCekim },
  A6: { renk: 'buyu', vinyet: .65, kam: KAM(540, 850, 1.0, 1.3),
    ciz(g, lt, d, T) {
      const son = aralik(lt, d - 1.1, d - .95);
      arka(g, 'buyu', buyuDuvar, { olcek: 1.5, merkez: [540, 700], blur: 4 });
      HT(g, T, { x: 540, y: 860, s: 2.6, kas: 'kizgin', gulum: .12, gozAcik: .92, kirpma: false, bebek: .6, bak: [0, 0], isik: altIsik('255,150,70', .35) });
      isikHalesi(g, 540, 1950, 1200 * (1 - son), '255,150,60', .5, T); karanlik(g, 540, 1900, 300, 1500 * (1 - son * .9) + 1, .85 + son * .15, T);
      if (son > 0) { g.fillStyle = `rgba(0,0,0,${son})`; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); }
      if (lt > d - .95) { const p = aralik(lt, d - .95, d); g.save(); g.globalAlpha = (1 - p) * .9; for (const s of [-1, 1]) { el(g, 540 + s * 41 * 2.6, 860 + 20 * 2.6, 6, 3); dol(g, 'rgba(255,200,150,.9)'); } g.restore(); }
    } },
  T1: { renk: 'normal', vinyet: 0, ekran: true, ciz: baslikKarti },

  // ═════ SAHNE 2 · MUTLU SABAH ═════
  B1: { renk: 'sicak', giris: .4, kam: KAM(540, 960, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka);
      const sw = Math.sin(lt * 2.6);
      N(g, T, { x: 480 + sw * 8, y: 770, s: 1.1, egim: sw * .03, gozAcik: .08, mutluGoz: true, gulum: .55, kas: 'mutlu',
        kollar: { sag: { el: [150 + Math.cos(lt * 4) * 12, 352 + Math.sin(lt * 4) * 6], on: true, tut: g => { g.save(); g.rotate(.2); g.translate(0, 30); spatula(g); g.restore(); } }, sol: { el: [-110, 410], on: true } } });
      arka(g, 'mutfakOn', g => mutfakOn(g));
      ocak(g, 640, 1238, .6); tava(g, 640, 1225, .6, T);
    } },
  B2: { renk: 'sicak', kam: KAM(560, 900, 1.0, 1.07),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.15, merkez: [540, 700], blur: 1.5 });
      EM(g, T, { x: 700, y: 690, s: 1.3, don: -.35, bak: [-.75, .35], gulum: .5, kas: 'mutlu', egim: -.05, kollar: { sol: { gizli: true }, sag: { gizli: true } } });
      const gul = replikAktif('N02', T);
      g.save(); g.translate(700 - 108 * 1.3, 690 + 152 * 1.3); g.scale(1.3, 1.3);
      kol(g, [0, 0], [(318 - 559) / 1.3, (975 - 888) / 1.3], { renk: EMRE.kolRenk, ten: EMRE.ten, bukum: -1, kalin: 48, mansetRenk: EMRE.manset, basparmak: 1 });
      g.restore();
      N(g, T, { x: 430, y: 770, s: 1.3, don: .35, bak: [.7, -.25], gulum: gul ? .7 : .5, gozAcik: gul ? .12 : .8, mutluGoz: gul, kas: 'mutlu', egim: .04,
        kollar: { sag: { el: [118, 410] }, sol: { el: [-125, 415] } } });
      g.save(); g.translate(322, 968); g.scale(1.3, 1.3); g.rotate(.9); el(g, 0, 0, 23, 27); dol(g, EMRE.ten[0]); cizgi(g); g.beginPath(); g.ellipse(-16, -6, 9, 13, .5, 0, TAU); dol(g, EMRE.ten[0]); cizgi(g, 3.5); el(g, 0, 2, 16, 19); dol(g, EMRE.ten[0]); g.restore();
      arka(g, 'mutfakOnYuksek', g => mutfakOn(g, 1560));
    } },
  B3: { renk: 'sicak', kam: KAM(540, 760, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [500, 700], blur: 3 });
      const uz = parcaNo('I01', T) >= 1 || (T > (ZAMAN.replikler.find(r => r.id === 'I01')?.t1 || 1e9));
      N(g, T, { x: 540, y: 770, s: 2.05, gulum: uz ? 0 : .35, kas: uz ? 'endise' : 'mutlu', bak: uz ? [-.2, .55] : [.2, 0], gozAcik: uz ? .62 : .8, konus: 0 });
    } },
  B4: { renk: 'sicak', kam: KAM(540, 1000, 1.0, 1.06),
    ciz(g, lt, d, T) {
      const ac = ease(aralik(lt, .35, 1.25));
      arka(g, 'antre', antreDuvar); antreKapi(g, ac);
      antreKapiKanat(g, ac);
      if (ac > .15) {
        const gir = ease(aralik(lt, .9, 2.4)), anh = aralik(lt, .0, 2.0) < 1;
        HT(g, T, { x: 545, y: lerp(700, 720, gir), s: lerp(1.0, 1.1, gir), gulum: .6, gozAcik: .5, kas: 'mutlu', bak: [-.2, .1],
          kollar: { sag: { el: anh ? [140, 110] : [130, 400], on: anh, tut: anh ? (g => { g.save(); g.translate(0, 50); anahtar(g); g.restore(); }) : null }, sol: { el: [-125, 405] } } });
      }
    } },
  B5: { renk: 'sicak', kam: KAM(540, 940, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.1, merkez: [540, 700], blur: 1.5 });
      N(g, T, { x: 170, y: 800, s: 1.3, don: .4, bak: [.85, .05], gulum: -.05, kas: 'endise', kollar: { sag: { el: [100, 380], on: true }, sol: { el: [-120, 410] } } });
      const isaret = ease(aralik(lt, 1.0, 1.6));
      HT(g, T, { x: 730, y: 760, s: 1.35, egim: .06, don: -.3, bak: [-.6, .55], kas: 'suphe', gulum: .15,
        kollar: { sol: { el: [lerp(-120, -190, isaret), lerp(400, 330, isaret)], on: true }, sag: { el: [120, 405] } } });
      arka(g, 'mutfakOnOrta', g => mutfakOn(g, 1320));
      ocak(g, 470, 1318, .72); tava(g, 470, 1305, .72, T);
    } },
  B6: { renk: 'sicak', kam: KAM(540, 780, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [620, 700], blur: 3 });
      EM(g, T, { x: 540, y: 790, s: 2.0, don: -.25, bak: [-.65, .1], kas: 'endise', gulum: .12, kollar: { sag: { el: [112, 96 + Math.sin(lt * 11) * 5], on: true, bukum: 1 } } });
    } },
  B7: { renk: ['sicak', 'normal', .6], kam: KAM(540, 770, 1.04, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [500, 700], blur: 3 });
      N(g, T, { x: 540, y: 770, s: 2.05, kas: 'uzgun', gulum: -.15, bak: [-.25, .6], gozAcik: .6, yas: .5, konus: 0 });
    } },

  // ═════ SAHNE 3 · HEDİYE ═════
  C1: { renk: 'sicak', kam: KAM(600, 980, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.1, merkez: [540, 700], blur: 1.5 });
      N(g, T, { x: 220, y: 810, s: 1.3, don: .4, bak: [.8, .3], gulum: .1, kas: 'saskin', gozAcik: .95, kollar: { sag: { el: [60, 330], on: true }, sol: { el: [-120, 410] } } });
      const yk = ease(aralik(lt, .1, 1.0));
      HT(g, T, { x: 690, y: 760, s: 1.35, don: -.3, bak: [-.55, .15], gulum: .55, gozAcik: .55, kas: 'mutlu',
        onGovde: g => yastik(g, 0, lerp(400, 330, yk), 330, 220, { t: T }),
        kollar: { sol: { el: [-150, lerp(400, 330, yk)], on: true }, sag: { el: [150, lerp(400, 330, yk)], on: true } } });
      arka(g, 'mutfakOnYuksek', g => mutfakOn(g, 1560));
    } },
  C2: { renk: 'sicak', kam: KAM(540, 770, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [450, 700], blur: 3 });
      const fis = replikAktif('I03', T) || T > (ZAMAN.replikler.find(r => r.id === 'I03')?.t0 || 1e9);
      N(g, T, { x: 540, y: 770, s: 2.05, gulum: .45, kas: 'uzgun', gozAcik: .7, yas: .7, bak: fis ? [.3, .7] : [.4, .1], kollar: { sag: { el: [20, 300], on: true } } });
    } },
  C3: { renk: 'sicak', kam: KAM(540, 790, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [650, 700], blur: 3 });
      EM(g, T, { x: 540, y: 790, s: 2.0, don: -.2, bak: [-.7, .05], kas: 'mutlu', gulum: .65, gozAcik: .78 });
    } },
  C4: { renk: ['sicak', 'korku', 'ilerle'], vinyet: [.35, .65], kam: KAM(540, 770, 1.0, 1.25),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [560, 700], blur: 3 });
      HT(g, T, { x: 540, y: 790, s: 2.15, gulum: .45, gozAcik: .95, kirpma: false, bebek: .55, bak: [0, 0], kas: 'normal' });
    } },
  C5: { renk: 'korku', vinyet: .7, kam: KAM(540, 790, 1.25, 1.45),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [560, 700], blur: 3 });
      HT(g, T, { x: 540, y: 790, s: 2.15, gulum: .48, gozAcik: .95, kirpma: false, bebek: .5, bak: [0, 0], kas: 'normal', donuk: true });
    } },

  // ═════ SAHNE 4 · İLK GECE ═════
  D1: { renk: 'gece', giris: .6, vinyet: .55, kam: KAM(540, 1000, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true));
      yastik(g, 360, 930, 330, 190, { t: T }); yastik(g, 730, 930, 330, 190, { t: T, gulX: 1e4 });
      N(g, T, { x: 365, y: 910, s: .72, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: 0, kas: 'endise', gulum: -.05, sacUzun: 200, kiyafet: 'pijama' });
      emreArkaKafa(g, 730, 900, .72);
      arka(g, 'yatakOnGece', g => yatakOn(g, true));
      dijitalSaat(g, 110, 950, .85, '02:58', true);
    } },
  D2: { renk: 'gece', vinyet: .6, kam: KAM(620, 1040, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true), { olcek: 1.6, merkez: [360, 900], blur: 4 });
      yastik(g, 560, 1080, 1060, 640, { t: T, nefes: 1.2, gulX: 330, gulY: 200 });
      N(g, T, { x: 260, y: 900, s: 1.6, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: 0, kas: 'endise', gulum: -.1, sacUzun: 220, egim: -.12 });
    } },
  D3: { renk: 'ruya', vinyet: .8, kam: (lt, d) => ({ x: 540 + Math.sin(lt * .9) * 10, y: 880, z: 1.05 + Math.sin(lt * .7) * .02, r: Math.sin(lt * .6) * .012 }),
    ciz(g, lt, d, T) {
      arka(g, 'ruya', ruyaArka);
      N(g, T, { x: 540, y: 860, s: 1.55, gozAcik: 0, kas: 'uzgun', gulum: -.15, kiyafet: 'pijama', konus: 0, kollar: { sag: { el: [60, 390], on: true }, sol: { el: [-60, 400], on: true } } });
      const per = 1.7, f = (lt % per) / per, hy = lerp(560, 1120, ease(f));
      for (let i = 0; i < 26; i++) { // düşen saç telleri
        const dogum = Math.floor(lt / per) * per + hash(i) * per * .8, yas = lt - dogum;
        if (yas < 0 || yas > 2.2) continue;
        const x0 = 640 + hash(i + 3) * 120, y0 = 650 + hash(i + 7) * 400;
        g.save(); g.globalAlpha = clamp(1 - yas / 2.2); sacTeli(g, x0 + Math.sin(yas * 3 + i) * 20, y0 + yas * yas * 220, 90 + hash(i) * 80, 1.4 + hash(i + 1), (hash(i + 2) - .5) * 2, '#8d5837', 3.5); g.restore();
      }
      g.save(); gulizarEl(g, 760, hy - 120, 1.1, .5, { parmak: [-.2, -.05, .05, .2] }); g.translate(700, hy - 40); g.rotate(.5); tahtaTarak(g); g.restore();
      mum(g, 180, 1640, 1.1, T);
      isikHalesi(g, 182, 1450, 800, '255,140,60', .45, T); karanlik(g, 400, 1200, 300, 1300, .8, T);
    } },
  D4: { renk: 'gece', vinyet: .6, kam: (lt, d) => ({ x: 540 + (lt < .5 ? gurultu(lt * 40, 2) * 18 * (1 - lt * 2) : 0), y: 900, z: lerp(1.12, 1.02, easeOut(lt / .6)) }),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true));
      yastik(g, 540, 900, 380, 200, { t: T });
      N(g, T, { x: 540, y: 760, s: 1.35, kiyafet: 'pijama', gozAcik: 1.15, bebek: .55, kas: 'saskin', konus: lt < .7 ? .75 : .3, gulum: -.2, ter: 1, kirpma: false, kollar: { sag: { el: [15, 300], on: true }, sol: { el: [-140, 470] } } });
      g.save(); g.beginPath(); g.moveTo(100, 1250); g.quadraticCurveTo(540, 1180, 980, 1250); g.lineTo(1000, 1520); g.lineTo(80, 1520); g.closePath(); dol(g, '#8f9fc0'); cizgi(g); g.restore();
      arka(g, 'yatakAyak', g => { rr(g, 80, 1500, 920, 150, 12); dol(g, '#8e6345'); cizgi(g); });
      dijitalSaat(g, 135, 1090, .95, '03:00', true);
      if (lt < .08) { g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(-PAY, -PAY, W + 2 * PAY, H + 2 * PAY); }
    } },
  D5: { renk: 'gece', vinyet: .6, kam: KAM(540, 980, 1.0, 1.25),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true), { olcek: 1.8, merkez: [400, 900], blur: 5 });
      yastik(g, 540, 990, 1000, 660, { t: T, saclar: 48, gulX: 340, gulY: 220 });
      el(g, 480, 960, 260, 150); g.fillStyle = 'rgba(80,70,90,.12)'; g.fill();
    } },
  D6: { renk: 'gece', vinyet: .6, kam: KAM(540, 790, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true), { olcek: 1.5, merkez: [500, 800], blur: 4 });
      N(g, T, { x: 540 + gurultu(T * 18, 1) * 2.5, y: 790, s: 2.05, kiyafet: 'pijama', kas: 'uzgun', gozAcik: .9, bebek: .7, bak: [0, .65], yas: .8, yasDamla: lt / d, gulum: -.3, konus: 0 });
    } },

  // ═════ SAHNE 5 · SOĞUYAN SABAH ═════
  E1: { renk: 'soluk', giris: .3, kam: (lt, d) => { const p = ease(aralik(lt, 1.7, d - .2)); return { x: lerp(540, 590, p), y: lerp(900, 760, p), z: lerp(1.0, 1.75, p) }; },
    ciz(g, lt, d, T) {
      const ax = 70, ay = 120, aw = 940, ah = 1440;
      g.save(); g.beginPath(); g.roundRect(ax, ay, aw, ah, 40); g.clip();
      arka(g, 'aynaIci', aynaIci);
      const ind = ease(aralik(lt, 1.4, 2.0));
      N(g, T, { x: 540, y: 820, s: 1.55, solgun: true, morluk: .6, kas: 'endise', gulum: -.18, bak: [0, ind * .5], gozAcik: .72,
        kollar: { sol: { el: [lerp(-135, -50, ind), lerp(-60 + Math.sin(lt * 6) * 50, 250, ind)], on: true, bukum: -1, tut: g => { g.save(); g.translate(0, 40); g.rotate(Math.PI); tarakFirca(g, ind > .3); g.restore(); } } },
        enUst: g => { g.beginPath(); g.moveTo(58, -128); g.bezierCurveTo(80, -80, 96, -20, 90, 60); cizgi(g, 5, OUT); g.beginPath(); g.moveTo(58, -128); g.bezierCurveTo(80, -80, 96, -20, 90, 60); cizgi(g, 3, '#f6f3ec'); } });
      g.restore();
      arka(g, 'aynaCerceve', g => aynaCerceve(g, ax, ay, aw, ah));
    } },
  E2: { renk: 'soluk', kam: KAM(560, 820, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'antreKapali', g => { antreDuvar(g); antreKapi(g, 0); }, { olcek: 1.35, merkez: [540, 800], blur: 3 });
      EM(g, T, { x: 560, y: 810, s: 1.75, ceket: true, don: .3, bak: [.75, 0], gulum: -.05, gozAcik: .68, kas: 'normal', kollar: { sol: { el: [-30, 175 + Math.sin(lt * 3) * 6], on: true } } });
    } },
  E3: { renk: 'soluk', kam: KAM(540, 900, 1.02, 1.02),
    ciz(g, lt, d, T) {
      arka(g, 'antreKapali', g => { antreDuvar(g); antreKapi(g, 0); });
      const e5 = ZAMAN.replikler.find(r => r.id === 'E05'), cik = e5 ? ease(aralik(T, e5.t1 + .1, e5.t1 + .9)) : 0;
      EM(g, T, { x: lerp(770, 1320, cik), y: 780, s: 1.3, ceket: true, don: .5, bak: [.9, 0], gulum: -.05, gozAcik: .7, egim: cik * .05 });
      N(g, T, { x: 320, y: 820, s: 1.28, don: .35, bak: [.85, .05], kas: 'endise', gulum: -.05, solgun: true, morluk: .4, kollar: { sag: { el: [lerp(170, 120, cik), lerp(250, 380, cik)], on: true } } });
    } },
  E4: { renk: 'soluk', kam: KAM(540, 770, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'antreKapali', g => { antreDuvar(g); antreKapi(g, 0); }, { olcek: 1.45, merkez: [700, 800], blur: 3 });
      N(g, T, { x: 540, y: 770, s: 2.05, kas: 'uzgun', gulum: -.25, bak: [.6, .3], gozAcik: .65, yas: .8, yasDamla: aralik(lt, .8, d), solgun: true, morluk: .4, konus: 0 });
    } },

  // ═════ SAHNE 6 · DİKİŞ ═════
  F1: { renk: 'soluk', kam: KAM(540, 940, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.15, merkez: [540, 900], blur: 1.5 });
      const bas = Math.sin(lt * 5) * 8;
      N(g, T, { x: 540, y: 760, s: 1.3, kas: 'endise', gulum: -.12, bak: [0, .85], gozAcik: .7, solgun: true, morluk: .4, etekYok: true,
        onGovde: g => yastik(g, 0, 420, 360, 220, { t: T, yumru: [-30, -10] }),
        kollar: { sol: { el: [-70, 400 + bas], on: true }, sag: { el: [50, 390 - bas], on: true } } });
      arka(g, 'yatakOnGunduz', g => yatakOn(g, false, 1330));
    } },
  F2: { renk: 'soluk', vinyet: .5, kam: KAM(560, 960, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 2, merkez: [540, 900], blur: 6 });
      yastik(g, 540, 960, 1500, 1000, { t: T, dikis: { x: 0, y0: -360, y1: 360 }, yumru: [40, 10], gulX: 500, gulY: 330 });
    } },
  F3: { renk: 'soluk', vinyet: .55, kam: (lt, d) => { const j = lt > 1.3 && lt < 1.45 ? gurultu(lt * 60, 4) * 14 : 0; return { x: 560 + j, y: 960, z: lerp(1.08, 1.16, ease(lt / d)) }; },
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 2, merkez: [540, 900], blur: 6 });
      yastik(g, 540, 960, 1500, 1000, { t: T, dikis: { x: 0, y0: -360, y1: 360 }, yumru: [40, 10], gulX: 500, gulY: 330 });
      const yak = easeOut(aralik(lt, 0, .5)), ac = ease(aralik(lt, .4, .9)) * (lt > 1.35 ? 1 : 1);
      const mx = lerp(820, 600, yak), my = lerp(1650, 1230, yak);
      g.save(); g.translate(mx, my); g.rotate(-.42);
      makas(g, 0, 0, 1.25, ac);
      // kol (sağ alttan uzanır) + makası kavrayan el
      g.save(); g.rotate(.42);
      g.beginPath(); g.moveTo(150, 170); g.lineTo(600, 900); g.lineCap = 'round'; g.lineWidth = 150 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 150; g.strokeStyle = NAZLI.kolRenk; g.stroke();
      g.globalAlpha = .2; g.beginPath(); g.moveTo(190, 230); g.lineTo(600, 900); g.lineWidth = 60; g.strokeStyle = '#000'; g.stroke(); g.globalAlpha = 1;
      g.beginPath(); g.moveTo(95, 215); g.lineTo(215, 130); cizgi(g, 4, '#7d9877');
      g.restore();
      g.save(); g.translate(78, 92); g.rotate(-.5);
      el(g, 0, 0, 62, 54); dol(g, NAZLI.ten[0]); cizgi(g);
      for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(-40 + i * 26, -46); g.quadraticCurveTo(-34 + i * 26, -20, -40 + i * 26, 6); cizgi(g, 2.5, 'rgba(150,90,60,.6)'); }
      g.beginPath(); g.ellipse(-52, -8, 18, 30, .5, 0, TAU); dol(g, NAZLI.ten[0]); cizgi(g, 4);
      g.globalAlpha = .3; el(g, 14, 18, 40, 28); dol(g, NAZLI.ten[1]); g.globalAlpha = 1;
      g.restore();
      g.restore();
    } },
  F4: { renk: ['soluk', 'korku', .5], vinyet: .6, kam: KAM(540, 920, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'odaKapi', g => {
        g.fillStyle = '#e3d1c9'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); yaprakDesen(g, -PAY, -PAY, W + PAY, H, 'rgba(190,150,140,.4)', 90);
        rr(g, 270, 250, 540, 1500, 6); dol(g, '#8e6345'); cizgi(g);
        g.fillStyle = dg(g, 0, 300, 0, 1750, [[0, '#1d1819'], [1, '#2e2526']]); g.fillRect(300, 280, 480, 1470); g.beginPath(); g.rect(300, 280, 480, 1470); cizgi(g);
        g.fillStyle = dg(g, 0, 1750, 0, H, [[0, '#a37a58'], [1, '#8a6446']]); g.fillRect(-PAY, 1750, W + PAY * 2, H);
      });
      isikHalesi(g, 540, 900, 600, '255,230,200', .12, T);
      HT(g, T, { x: 540, y: 650, s: 1.28, kirpma: false, gozAcik: .82, bebek: .65, bak: [-.3, .35], gulum: .32, kas: 'normal', kollar: { sol: { el: [-128, 410] }, sag: { el: [128, 410] } } });
    } },
  F5: { renk: 'soluk', kam: (lt, d) => ({ x: 540 + (lt < .25 ? gurultu(lt * 50, 7) * 10 : 0), y: 780, z: lerp(1.0, 1.05, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.5, merkez: [500, 800], blur: 4 });
      N(g, T, { x: 540, y: 780, s: 2.05, kas: 'saskin', gozAcik: 1.08, bebek: .7, bak: [.45, -.15], gulum: -.1, ter: .7, solgun: true, morluk: .4,
        onGovde: g => yastik(g, 0, 400, 300, 190, { t: T }), kollar: { sol: { el: [-140, 400], on: true }, sag: { el: [140, 400], on: true } } });
    } },
  F6: { renk: 'korku', vinyet: .75, kirmiziVinyet: true, kam: KAM(540, 790, 1.0, 1.35),
    ciz(g, lt, d, T) {
      arka(g, 'odaKapi', null, { olcek: 1.6, merkez: [540, 800], blur: 4 });
      const iki = parcaNo('H09', T) >= 1;
      HT(g, T, { x: 540, y: 800, s: 2.2, kirpma: false, gozAcik: .95, bebek: .5, bak: [0, 0], kas: iki ? 'kizgin' : 'normal', gulum: iki ? .5 : .35, donuk: true });
    } },

  // ═════ SAHNE 7 · FİNAL ═════
  G1: { renk: 'soluk', vinyet: .5, kam: KAM(540, 960, 1.0, 1.04),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false));
      arka(g, 'kapiSag', g => { rr(g, 870, 480, 300, 1040, 6); dol(g, '#8e6345'); cizgi(g); g.fillStyle = '#2a2224'; g.fillRect(895, 505, 300, 1000); });
      const cik = ease(aralik(lt, .1, 1.5));
      HT(g, T, { x: lerp(1000, 1320, cik), y: 760, s: .95, don: .5, bak: [.8, 0], gulum: .3 });
      N(g, T, { x: 440, y: 860, s: 1.05, kas: 'endise', gulum: -.15, bak: [.2, .85], solgun: true, etekYok: true,
        onGovde: g => yastik(g, 0, 420, 340, 210, { t: T }), kollar: { sol: { el: [-120, 410], on: true }, sag: { el: [120, 410], on: true } } });
      arka(g, 'yatakOnGunduz2', g => yatakOn(g, false, 1340));
    } },
  G2: { renk: 'korku', vinyet: .75, kam: KAM(560, 920, 1.0, 1.45, { lineer: true }),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 2, merkez: [540, 900], blur: 6 });
      yastik(g, 540, 960, 1500, 1000, { t: T, dikis: { x: 0, y0: -360, y1: 360 }, yumru: [40, 10], gulX: 500, gulY: 330 });
      orgu(g, 548, 940, 1.5, ease(aralik(lt, .2, 2.6)), T);
    } },
  G3: { renk: 'normal', vinyet: 0, ekran: true,
    ciz(g, lt, d, T) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); if (lt > .03 && lt < .16) { g.fillStyle = 'rgba(150,10,20,.45)'; g.fillRect(0, 0, W, H); } } },
  G4: { renk: 'normal', vinyet: 0, ekran: true, ciz: soruKarti },
};
CEKIM.F6.ciz = function (g, lt, d, T) { // F4'ün kapı arka planını yakın plan için kullan
  arka(g, 'odaKapi', CEKIM_ODA_KAPI, { olcek: 1.6, merkez: [540, 800], blur: 4 });
  const iki = parcaNo('H09', T) >= 1;
  HT(g, T, { x: 540, y: 800, s: 2.2, kirpma: false, gozAcik: .95, bebek: .5, bak: [0, 0], kas: iki ? 'kizgin' : 'normal', gulum: iki ? .5 : .35, donuk: true });
};
function CEKIM_ODA_KAPI(g) {
  g.fillStyle = '#e3d1c9'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); yaprakDesen(g, -PAY, -PAY, W + PAY, H, 'rgba(190,150,140,.4)', 90);
  rr(g, 270, 250, 540, 1500, 6); dol(g, '#8e6345'); cizgi(g);
  g.fillStyle = dg(g, 0, 300, 0, 1750, [[0, '#1d1819'], [1, '#2e2526']]); g.fillRect(300, 280, 480, 1470); g.beginPath(); g.rect(300, 280, 480, 1470); cizgi(g);
  g.fillStyle = dg(g, 0, 1750, 0, H, [[0, '#a37a58'], [1, '#8a6446']]); g.fillRect(-PAY, 1750, W + PAY * 2, H);
}

function gulizarCekim(g, lt, d, T) {
  arka(g, 'buyu', buyuDuvar, { olcek: 1.3, merkez: [540, 600], blur: 3 });
  gulizar(g, { x: 540, y: 860, s: 1.65, t: T, T });
  // duman
  g.save(); g.globalAlpha = .18; for (let i = 0; i < 3; i++) { const ph = (T * .2 + i / 3) % 1; g.beginPath(); g.moveTo(260, 1450 - ph * 200); g.bezierCurveTo(200 + i * 40, 1200 - ph * 500, 420, 1000 - ph * 600, 300 + i * 60, 700 - ph * 700); cizgi(g, 22, '#b9a99a'); } g.restore();
  g.save(); g.filter = 'blur(5px)'; mum(g, 230, 1800, 1.7, T); g.restore();
  isikHalesi(g, 233, 1520, 900, '255,150,60', .55, T); karanlik(g, 300, 1450, 220, 1350, .88, T);
}

// ───────────── KARTLAR ─────────────
function baslikKarti(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .8)), cik = aralik(lt, d - .4, d);
  g.save(); g.globalAlpha = .12 * gir; yastik(g, W / 2, 880, 760, 480, { t: T, dantel: true, renk: '#d9c9c0', golge: '#8a6a66' }); g.restore();
  // kırmızı iplik dikişi
  const p = ease(aralik(lt, .3, 1.6));
  g.save(); g.beginPath(); g.rect(160, 0, 760 * p, H); g.clip();
  for (let x = 160; x < 920; x += 34) { g.beginPath(); g.moveTo(x, 1040); g.lineTo(x + 17, 1056); g.moveTo(x + 17, 1056); g.lineTo(x + 34, 1040); cizgi(g, 6, '#b01f28'); }
  g.restore();
  g.save(); g.globalAlpha = gir * (1 - cik) * (.92 + .08 * Math.sin(lt * 37) * (lt < 1 ? 1 : 0));
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 88px "Lora"'; g.fillStyle = '#efe2cc'; g.letterSpacing = '6px'; g.fillText('YASTIĞIMDAKİ', W / 2, 790);
  g.font = '700 190px "Lora"'; g.lineWidth = 10; g.strokeStyle = '#1a0507'; g.strokeText('MUSKA', W / 2, 940); g.fillStyle = '#c0262f'; g.fillText('MUSKA', W / 2, 940);
  g.letterSpacing = '10px'; g.font = '700 40px "Lora"'; g.fillStyle = '#c9a98a'; g.fillText('1. BÖLÜM', W / 2, 1150);
  g.letterSpacing = '0px'; g.font = 'italic 600 62px "Lora"'; g.fillStyle = '#efe2cc'; g.fillText('Çeyizden Gelen Hediye', W / 2, 1240);
  g.restore();
}
function soruKarti(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .6));
  g.save(); g.globalAlpha = .9 * gir; yastik(g, W / 2, 620, 520, 320, { t: T, dikis: { x: 0, y0: -110, y1: 110 }, gulX: 180, gulY: 90 }); orgu(g, W / 2 + 8, 600, .8, .7, T); g.restore();
  g.save(); g.globalAlpha = gir; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 74px "Lora"'; g.lineWidth = 12; g.strokeStyle = '#1a0507'; g.lineJoin = 'round';
  for (const [s, y] of [['Sizce Nazlı', 980], ['o yastığı', 1075], ['sökmeli mi?', 1170]]) { g.strokeText(s, W / 2, y); g.fillStyle = '#f5ead8'; g.fillText(s, W / 2, y); }
  g.font = 'italic 600 46px "Lora"'; g.fillStyle = '#d9b9a0'; g.fillText('Cevabını yorumlara yaz', W / 2, 1310);
  const oy = 1420 + Math.sin(lt * 5) * 14; g.beginPath(); g.moveTo(W / 2 - 34, oy); g.lineTo(W / 2, oy + 40); g.lineTo(W / 2 + 34, oy); cizgi(g, 10, '#c0262f');
  g.font = '700 38px "Lora"'; g.letterSpacing = '4px'; g.fillStyle = '#8a6a60'; g.fillText('SONRAKİ BÖLÜM: KIRMIZI İPLİK', W / 2, 1640);
  g.restore();
}
