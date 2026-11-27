// YASTIĞIMDAKİ MUSKA — bütün bölümlerin ortak mekânları ve çekim yardımcıları
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

function gulizarCekim(g, lt, d, T) {
  arka(g, 'buyu', buyuDuvar, { olcek: 1.3, merkez: [540, 600], blur: 3 });
  gulizar(g, { x: 540, y: 860, s: 1.65, t: T, T });
  // duman
  g.save(); g.globalAlpha = .18; for (let i = 0; i < 3; i++) { const ph = (T * .2 + i / 3) % 1; g.beginPath(); g.moveTo(260, 1450 - ph * 200); g.bezierCurveTo(200 + i * 40, 1200 - ph * 500, 420, 1000 - ph * 600, 300 + i * 60, 700 - ph * 700); cizgi(g, 22, '#b9a99a'); } g.restore();
  g.save(); g.filter = 'blur(5px)'; mum(g, 230, 1800, 1.7, T); g.restore();
  isikHalesi(g, 233, 1520, 900, '255,150,60', .55, T); karanlik(g, 300, 1450, 220, 1350, .88, T);
}


// ───────────── HATİCE'NİN SALONU ─────────────
function haticeSalon(g, o = {}) {
  g.fillStyle = dg(g, 0, 0, 0, 1400, [[0, '#cfa79c'], [1, '#b88c80']]); g.fillRect(-PAY, -PAY, W + PAY * 2, 1500 + PAY);
  // damask desen
  g.fillStyle = 'rgba(120,60,55,.18)';
  for (let y = -40, r = 0; y < 1300; y += 150, r++) for (let x = -80 + (r % 2) * 90; x < W + 100; x += 180) {
    g.save(); g.translate(x, y); el(g, 0, 0, 26, 48); g.fill(); el(g, -30, 30, 14, 26, -.6); g.fill(); el(g, 30, 30, 14, 26, .6); g.fill(); el(g, 0, -56, 8, 14); g.fill(); g.restore();
  }
  rr(g, -PAY, 1160, W + PAY * 2, 340, 0); dol(g, '#8a5a4a'); g.beginPath(); g.moveTo(-PAY, 1160); g.lineTo(W + PAY, 1160); cizgi(g, 5);
  // ağır perde (sol)
  g.beginPath(); g.moveTo(-PAY, -PAY); g.lineTo(170, -PAY); g.quadraticCurveTo(120, 500, 190, 1160); g.lineTo(-PAY, 1160); g.closePath(); dol(g, '#6e1d27'); cizgi(g);
  g.globalAlpha = .35; for (const x of [20, 80, 130]) { g.beginPath(); g.moveTo(x, -PAY); g.quadraticCurveTo(x - 30, 500, x + 20, 1160); cizgi(g, 5, '#3e0d14'); } g.globalAlpha = 1;
  g.beginPath(); g.moveTo(150, 520); g.quadraticCurveTo(60, 560, -PAY, 540); cizgi(g, 10, '#d8b84a');
  // küçük Emre'nin çerçeveli portresi
  rr(g, 300, 240, 230, 290, 8); dol(g, '#c9a24f'); cizgi(g); rr(g, 322, 262, 186, 246, 4); dol(g, '#e9dcc6');
  g.save(); g.translate(415, 420); g.scale(.62, .62);
  el(g, 0, -60, 90, 96); dol(g, TEN.emre[0]); cizgi(g, 5); EMRE.sacOnYol(g); dol(g, '#2c211c'); cizgi(g, 5);
  for (const s of [-1, 1]) { el(g, s * 32, -50, 8, 10); dol(g, '#2a1a10'); } g.beginPath(); g.moveTo(-18, -8); g.quadraticCurveTo(0, 6, 18, -8); cizgi(g, 4, '#6a3124');
  rr(g, -100, 40, 200, 160, 30); dol(g, '#3d5a8a'); cizgi(g, 5);
  g.restore();
  // vitrin (sağ)
  rr(g, 700, 200, 380, 960, 10); dol(g, '#6a4230'); cizgi(g);
  rr(g, 730, 240, 320, 560, 6); g.fillStyle = 'rgba(210,225,230,.55)'; g.fill(); cizgi(g, 3);
  for (const yy of [420, 600]) { g.beginPath(); g.moveTo(730, yy); g.lineTo(1050, yy); cizgi(g, 4); }
  for (const [yy, n] of [[330, 3], [510, 3], [690, 4]]) for (let i = 0; i < n; i++) { const xx = 780 + i * (240 / (n - 1 || 1)); el(g, xx, yy, 44, 44); dol(g, '#f7f3ea'); cizgi(g, 3); el(g, xx, yy, 30, 30); g.lineWidth = 3; g.strokeStyle = '#3d6ea8'; g.stroke(); }
  rr(g, 730, 830, 320, 300, 6); dol(g, '#7d5038'); cizgi(g, 3); g.beginPath(); g.moveTo(890, 830); g.lineTo(890, 1130); cizgi(g, 3);
  // avize
  g.beginPath(); g.moveTo(540, -PAY); g.lineTo(540, 60); cizgi(g, 4, '#8a6a20');
  g.beginPath(); g.moveTo(400, 110); g.quadraticCurveTo(540, 170, 680, 110); cizgi(g, 6, '#c9a24f');
  for (const x of [400, 470, 540, 610, 680]) { rr(g, x - 8, 70, 16, 40, 4); dol(g, '#f3ead6'); cizgi(g, 2.5); el(g, x, 62, 6, 12); dol(g, '#ffd98a'); }
  isikHalesi(g, 540, 90, 520, '255,210,140', .35);
  g.fillStyle = dg(g, 0, 1500, 0, H, [[0, '#7a2a2c'], [1, '#5a1c1f']]); g.fillRect(-PAY, 1500, W + PAY * 2, H - 1500 + PAY);
}
function yemekMasasi(g, y = 1240) { // dantel örtülü masa (ön planda)
  g.fillStyle = '#fbf7ee'; g.fillRect(-PAY, y, W + PAY * 2, H - y + PAY);
  g.beginPath(); g.moveTo(-PAY, y); g.lineTo(W + PAY, y); cizgi(g);
  g.globalAlpha = .5; for (let x = -PAY; x < W + PAY; x += 60) { el(g, x, y + 40, 14, 14); g.lineWidth = 2.5; g.strokeStyle = '#d9cfbd'; g.stroke(); } g.globalAlpha = 1;
  g.globalAlpha = .4; for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(-PAY, y + i * 120); g.lineTo(W + PAY, y + i * 120 + 20); cizgi(g, 2, '#d9cfbd'); } g.globalAlpha = 1;
}
function haticeKoltuk(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.beginPath(); g.moveTo(-210, 500); g.lineTo(-200, -60); g.quadraticCurveTo(0, -180, 200, -60); g.lineTo(210, 500); g.closePath(); dol(g, '#7a2633'); cizgi(g);
  g.globalAlpha = .3; for (let i = -2; i <= 2; i++) { el(g, i * 70, 60, 8, 8); dol(g, '#2a0a10'); } g.globalAlpha = 1;
  g.restore();
}

// ───────────── OFİS ─────────────
function ofisArka(g) {
  g.fillStyle = dg(g, 0, 0, 0, 1400, [[0, '#dfe6ea'], [1, '#c9d3d9']]); g.fillRect(-PAY, -PAY, W + PAY * 2, 1500 + PAY);
  rr(g, 520, 180, 540, 640, 8); dol(g, '#eef3f6'); cizgi(g);
  g.fillStyle = dg(g, 0, 200, 0, 800, [[0, '#a9c4d6'], [1, '#d7e2ea']]); g.fillRect(540, 200, 500, 600);
  for (let i = 0; i < 6; i++) { rr(g, 560 + i * 80, 600 - i * 30 - (i % 2) * 60, 60, 200 + i * 30, 2); dol(g, '#8aa1b3'); }
  for (let yy = 210; yy < 800; yy += 34) { g.beginPath(); g.moveTo(540, yy); g.lineTo(1040, yy); cizgi(g, 6, 'rgba(240,244,246,.85)'); }
  rr(g, 60, 300, 330, 220, 6); dol(g, '#f7f9fa'); cizgi(g); for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(90, 350 + i * 40); g.lineTo(240 + hash(i) * 120, 350 + i * 40); cizgi(g, 5, '#9fb3c2'); }
  rr(g, 80, 900, 70, 90, 12); dol(g, '#c86f4a'); cizgi(g); for (let i = 0; i < 6; i++) { el(g, 115 + (i - 2.5) * 18, 860 - (i % 2) * 30, 14, 34, (i - 2.5) * .35); dol(g, '#6d9c50'); cizgi(g, 2.5); }
  g.fillStyle = '#b8c3ca'; g.fillRect(-PAY, 1500, W + PAY * 2, H);
}
function ofisMasa(g, y = 1260) {
  rr(g, -PAY, y, W + PAY * 2, 40, 0); g.fillStyle = dg(g, 0, y, 0, y + 40, [[0, '#e9e4dc'], [1, '#cfc7bb']]); g.fill(); cizgi(g);
  g.fillStyle = '#a99a88'; g.fillRect(-PAY, y + 40, W + PAY * 2, H - y + PAY); g.beginPath(); g.moveTo(-PAY, y + 40); g.lineTo(W + PAY, y + 40); cizgi(g);
  rr(g, 640, y - 300, 380, 250, 12); dol(g, '#2a2d33'); cizgi(g); rr(g, 656, y - 286, 348, 214, 6); dol(g, '#5d7896'); rr(g, 800, y - 50, 60, 50, 4); dol(g, '#3a3d44'); cizgi(g, 3);
  rr(g, 120, y - 90, 70, 90, 12); dol(g, '#f4f1ea'); cizgi(g, 3.5); g.beginPath(); g.arc(196, y - 50, 18, -1.4, 1.4); cizgi(g, 5, OUT);
}

// ───────────── GECE BANYO KAPISI ─────────────
function banyoKapi(g, kol, t, ayak = 1) { // kol: kolun aşağı inme miktarı (0-1)
  banyoArka(g);
  rr(g, 220, 160, 640, 1600, 6); dol(g, '#e8e4dc'); cizgi(g);
  rr(g, 260, 200, 560, 1520, 4); dol(g, '#f4f1ea'); cizgi(g, 4);
  for (const [yy, hh] of [[260, 600], [920, 740]]) { rr(g, 310, yy, 460, hh, 8); g.lineWidth = 4; g.strokeStyle = '#d3cdc1'; g.stroke(); }
  // kapı altı ışık + ayak gölgeleri
  g.fillStyle = 'rgba(255,214,150,.95)'; g.fillRect(260, 1720, 560, 26);
  isikHalesi(g, 540, 1760, 420, '255,200,130', .4);
  if (ayak > 0) { g.fillStyle = `rgba(20,10,8,${.9 * ayak})`; for (const x of [450, 610]) { rr(g, x - 52 + Math.sin(t * 1.3) * 4, 1720, 104, 26, 8); g.fill(); } }
  // kapı kolu (dönebilen)
  g.save(); g.translate(760, 960); rr(g, -26, -60, 52, 120, 12); dol(g, '#c9cdd1'); cizgi(g, 4);
  g.rotate(clamp(kol) * .75); rr(g, -150, -14, 160, 28, 14); g.fillStyle = dg(g, 0, -14, 0, 14, [[0, '#eef1f3'], [1, '#a8aeb3']]); g.fill(); cizgi(g, 4);
  el(g, 0, 0, 20, 20); dol(g, '#dde1e4'); cizgi(g, 3); g.restore();
  g.fillStyle = 'rgba(255,255,255,0)';
}

// ───────────── MEZARLIK SOKAĞI ─────────────
function mezarlikSokagi(g) {
  g.fillStyle = dg(g, 0, -PAY, 0, 1100, [[0, '#2a2140'], [.55, '#6a3a5a'], [1, '#d07a4a']]); g.fillRect(-PAY, -PAY, W + PAY * 2, 1300);
  el(g, 860, 420, 60, 60); dol(g, 'rgba(255,220,170,.85)'); isikHalesi(g, 860, 420, 300, '255,200,150', .3);
  // selviler
  for (const [x, h] of [[90, 760], [210, 900], [330, 700]]) { g.beginPath(); g.moveTo(x, 1120 - h); g.quadraticCurveTo(x + 70, 1120 - h * .5, x + 46, 1120); g.lineTo(x - 46, 1120); g.quadraticCurveTo(x - 70, 1120 - h * .5, x, 1120 - h); dol(g, '#1d2a22'); cizgi(g, 3, '#0d140f'); }
  // mezarlık duvarı + taşlar
  for (let i = 0; i < 7; i++) { const x = -60 + i * 72, h = 90 + hash(i) * 60; rr(g, x, 1060 - h, 52, h + 20, 22); dol(g, '#8a8790'); cizgi(g, 3, '#3a3840'); }
  rr(g, -PAY, 1050, 520 + PAY, 200, 0); dol(g, '#6f6a70'); cizgi(g); for (let y = 1080; y < 1250; y += 50) for (let x = -PAY + ((y / 50) % 2) * 40; x < 520; x += 80) { rr(g, x, y, 76, 46, 4); g.lineWidth = 2.5; g.strokeStyle = '#4e4a52'; g.stroke(); }
  // eski ev cephesi
  rr(g, 300, 380, W - 300 + PAY, 1100, 0); g.fillStyle = dg(g, 300, 0, W, 0, [[0, '#6b5450'], [1, '#4e3c3a']]); g.fill(); cizgi(g);
  g.globalAlpha = .35; for (let i = 0; i < 14; i++) { g.beginPath(); g.moveTo(330 + hash(i) * 700, 400 + hash(i + 1) * 900); g.lineTo(350 + hash(i) * 700, 440 + hash(i + 1) * 900); cizgi(g, 3, '#2a1d1c'); } g.globalAlpha = 1;
  rr(g, 820, 520, 180, 220, 6); dol(g, '#1f1a22'); cizgi(g); g.beginPath(); g.moveTo(910, 520); g.lineTo(910, 740); g.moveTo(820, 630); g.lineTo(1000, 630); cizgi(g, 8, '#4e3c3a');
  // kapı kemeri ve numara
  g.beginPath(); g.moveTo(380, 1460); g.lineTo(380, 760); g.arc(570, 760, 190, Math.PI, 0); g.lineTo(760, 1460); g.closePath(); dol(g, '#3a2a26'); cizgi(g, 6);
  rr(g, 520, 500, 100, 70, 8); dol(g, '#2c4a7a'); cizgi(g, 4); g.font = '700 50px "Lora", serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#f3ead6'; g.fillText('13', 570, 538);
  // fener
  g.beginPath(); g.moveTo(1010, 700); g.lineTo(1060, 700); cizgi(g, 6, '#1a1416'); rr(g, 1020, 700, 50, 80, 8); dol(g, '#e9b060'); cizgi(g, 4, '#1a1416'); isikHalesi(g, 1045, 740, 260, '255,190,110', .35);
  // kaldırım
  g.fillStyle = dg(g, 0, 1460, 0, H, [[0, '#4a4248'], [1, '#2a2428']]); g.fillRect(-PAY, 1460, W + PAY * 2, H - 1460 + PAY);
  for (let y = 1480, r = 0; y < H + PAY; y += 70, r++) for (let x = -PAY + (r % 2) * 50; x < W + PAY; x += 100) { el(g, x, y, 44, 26); g.lineWidth = 3; g.strokeStyle = '#1e1a1d'; g.stroke(); }
  // kargalar
  for (const [x, y, s] of [[120, 1035, 1], [420, 1045, .8], [700, 360, .7]]) { g.save(); g.translate(x, y); g.scale(s, s); el(g, 0, 0, 30, 18); dol(g, '#0d0b0d'); el(g, 24, -14, 13, 12); dol(g, '#0d0b0d'); poly(g, [[34, -14], [52, -10], [34, -8]]); g.fillStyle = '#3a3030'; g.fill(); el(g, 27, -17, 2.5, 2.5); dol(g, '#e9d38a'); poly(g, [[-26, -2], [-52, 6], [-26, 8]]); g.fillStyle = '#0d0b0d'; g.fill(); g.restore(); }
}
function mezarlikKapisi(g, acik, t) { // 13 numaranın kapısı: kemerin içine çizilir
  g.save(); g.beginPath(); g.moveTo(400, 1460); g.lineTo(400, 760); g.arc(570, 760, 170, Math.PI, 0); g.lineTo(740, 1460); g.closePath(); g.clip();
  g.fillStyle = '#0a0607'; g.fillRect(380, 560, 380, 920);
  isikHalesi(g, 600, 1100, 260 * acik, '255,150,70', .5 * acik, t);
  const gen = 340 * Math.cos(acik * 1.3);
  g.beginPath(); g.moveTo(400, 560); g.lineTo(400 + gen, 560 + 30 * acik); g.lineTo(400 + gen, 1460 - 20 * acik); g.lineTo(400, 1460); g.closePath();
  g.fillStyle = dg(g, 400, 0, 400 + gen, 0, [[0, '#4a2e22'], [1, '#6a4430']]); g.fill(); cizgi(g, 5);
  if (acik < .5) { for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(400 + gen * i / 5, 600); g.lineTo(400 + gen * i / 5, 1440); cizgi(g, 3, '#3a2218'); } el(g, 400 + gen - 40, 1050, 14, 14); dol(g, '#8a7a50'); cizgi(g, 3); }
  g.restore();
}
