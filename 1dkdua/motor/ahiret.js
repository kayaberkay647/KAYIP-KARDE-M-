// 1dkdua — mezarlık, kabir, Medine ve ahiret temalı dekor kütüphanesi (dünya koordinatlarında)
// Tasvir ilkesi: peygamberler ve Ehl-i Beyt insan figürü olarak çizilmez; varlıkları yalnızca nur (ışık) ile simgelenir.
'use strict';

// Osmanlı mezar taşı. tur: 'sarik' | 'fes' | 'cicek' | 'sade'. (x,y) taban ortası, s = gövde yüksekliği (px)
function mezarTasi(x, y, s, tur = 'sarik', egim = 0, renk = '#DDD3BF', seed = 1, al = 1) {
  const w = s * .32, kk = koyu(renk, .3), ka = acik(renk, .15);
  X.save(); X.translate(x, y); X.rotate(egim); X.globalAlpha *= al;
  // gövde
  X.beginPath(); X.moveTo(-w / 2, 0); X.lineTo(-w * .46, -s);
  if (tur === 'cicek') X.quadraticCurveTo(0, -s - w * .75, w * .46, -s); else if (tur === 'sade') { X.lineTo(0, -s - w * .5); X.lineTo(w * .46, -s); } else X.lineTo(w * .46, -s);
  X.lineTo(w / 2, 0); X.closePath();
  X.fillStyle = dGrad(-w / 2, 0, w / 2, 0, [[0, kk], [.3, renk], [.75, ka], [1, koyu(renk, .12)]]); X.fill();
  // yazı satırları (hat izi) ve çerçeve
  X.strokeStyle = rgb(kk, .55); X.lineWidth = Math.max(1, s * .012); X.strokeRect(-w * .36, -s * .9, w * .72, s * .7);
  for (let i = 0; i < 5; i++) { const yy = -s * .8 + i * s * .12; X.beginPath(); X.moveTo(-w * .26, yy); for (let k = 0; k <= 6; k++) X.lineTo(-w * .26 + w * .52 * k / 6, yy + Math.sin(k * 2.1 + i + seed) * s * .012); X.stroke(); }
  // tepe
  if (tur === 'sarik') {
    X.fillStyle = rgb(koyu(renk, .08)); X.fillRect(-w * .2, -s - s * .06, w * .4, s * .07);
    elips(0, -s - s * .16, w * .72, s * .13); X.fillStyle = dGrad(-w * .7, 0, w * .7, 0, [[0, kk], [.5, ka], [1, koyu(renk, .15)]]); X.fill();
    for (let i = 0; i < 3; i++) { X.beginPath(); X.ellipse(0, -s - s * .12 - i * s * .05, w * .66 - i * w * .05, s * .05, 0, .1, Math.PI - .1); cizgi(kk, Math.max(1, s * .01), .6); }
    elips(0, -s - s * .29, w * .3, s * .07); doldur(renk);
  } else if (tur === 'fes') {
    cokgen([[-w * .32, -s], [w * .32, -s], [w * .25, -s - s * .26], [-w * .25, -s - s * .26]]); X.fillStyle = dGrad(-w * .3, 0, w * .3, 0, [[0, kk], [.5, ka], [1, koyu(renk, .15)]]); X.fill();
    X.beginPath(); X.moveTo(0, -s - s * .26); X.quadraticCurveTo(w * .3, -s - s * .2, w * .28, -s - s * .05); cizgi(kk, Math.max(1, s * .015), .8);
  } else if (tur === 'cicek') {
    for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; elips(Math.cos(a) * w * .1, -s - w * .25 + Math.sin(a) * w * .1, w * .07, w * .05, a); doldur(kk, .5); }
  }
  // yosun / liken
  const r = rng(seed * 17);
  for (let i = 0; i < 6; i++) { elips((r() - .5) * w * .8, -r() * s * .9, w * (.04 + r() * .06), w * (.03 + r() * .04)); doldur(r() < .5 ? '#9AA068' : '#C9A060', .35); }
  X.restore();
}
// Toprak kabir (sanduka) ve çiçekler
function kabirYeri(x, y, w, renk = '#7A6048', cicek = 0, seed = 2, t = 0) {
  X.beginPath(); X.moveTo(x - w / 2, y); X.quadraticCurveTo(x - w * .4, y - w * .12, x, y - w * .13); X.quadraticCurveTo(x + w * .4, y - w * .12, x + w / 2, y); X.closePath();
  X.fillStyle = dGrad(0, y - w * .13, 0, y, [[0, acik(renk, .15)], [1, koyu(renk, .2)]]); X.fill();
  cimen(x - w * .45, x + w * .45, y - w * .02, w * .07, 6, t, seed, '#6E7B3A', .8);
  if (cicek > 0) { const r = rng(seed * 7); for (let i = 0; i < 14; i++) { const cx = x + (r() - .5) * w * .8, cy = y - w * .03 - r() * w * .08, rr = w * .018 * cicek; for (let k = 0; k < 5; k++) { const a = k / 5 * TAU + i; daire(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, rr * .7); doldur(r() < .5 ? '#F4EEE2' : '#E9B9B0'); } daire(cx, cy, rr * .5); doldur('#E2B84A'); } }
}
// Kefenli beden (yatay; baş sağda). Yüz, kimlik yok: yalnızca bez.
function kefen(x, y, L, Hh, isik = 0) {
  X.save(); X.translate(x, y);
  X.beginPath(); X.moveTo(-L / 2 + Hh * .3, Hh * .5); X.quadraticCurveTo(-L / 2 - Hh * .1, Hh * .5, -L / 2, 0); X.quadraticCurveTo(-L / 2 - Hh * .05, -Hh * .35, -L / 2 + Hh * .4, -Hh * .42);
  X.quadraticCurveTo(0, -Hh * .62, L / 2 - Hh * .55, -Hh * .5); X.quadraticCurveTo(L / 2, -Hh * .55, L / 2, 0); X.quadraticCurveTo(L / 2, Hh * .5, L / 2 - Hh * .5, Hh * .5); X.closePath();
  X.fillStyle = dGrad(0, -Hh * .6, 0, Hh * .5, [[0, mix('#FBF8F1', '#FFF2C8', isik)], [1, mix('#CFC6B4', '#E9CF94', isik)]]); X.fill();
  X.strokeStyle = 'rgba(150,135,110,.55)'; X.lineWidth = Math.max(1, Hh * .04);
  for (const u of [-.36, .02, .36]) { X.beginPath(); X.moveTo(u * L, -Hh * .52); X.quadraticCurveTo(u * L + Hh * .05, 0, u * L, Hh * .5); X.stroke(); }
  for (let i = 0; i < 4; i++) { X.beginPath(); X.moveTo(-L * .3 + i * L * .15, -Hh * .2); X.quadraticCurveTo(-L * .25 + i * L * .15, Hh * .05, -L * .3 + i * L * .15 + Hh * .3, Hh * .3); cizgi('#B5AB98', Math.max(1, Hh * .025), .4); }
  X.restore();
}

// Kabir kesiti. o: {x, y (yüzey), s, t, sikma 0..1, karanlik 0..1, isik 0..1, cicek 0..1, tas, portal:{tur:'bahce'|'cukur', a 0..1, karis 0..1}, toprakRenk}
const KABIR = { W: 470, H: 160, D: 340 };
function kabirKesit(o) { kabirToprak(o); kabirLahit({ ...o, lx: 0 }); kabirYuzey(o); }
// Toprak katmanları, taşlar, kökler (yüzey y=0'dan aşağı)
function kabirToprak(o) {
  const s = o.s || 1, r = rng(o.seed || 5), kar = o.karanlik || 0;
  X.save(); X.translate(o.x, o.y); X.scale(s, s);
  const t1 = mix(o.toprakRenk || '#7A5A3E', '#2A1E1A', kar * .6), t2 = mix(o.toprakRenk2 || '#5A402C', '#1E1412', kar * .6), t3 = mix('#3E2C20', '#140C0C', kar * .6);
  X.fillStyle = dGrad(0, 0, 0, 1000, [[0, t1], [.35, t2], [1, t3]]); X.fillRect(-1400, 0, 2800, 1400);
  X.strokeStyle = rgb(koyu(t2, .3), .35); X.lineWidth = 3;
  for (let k = 0; k < 8; k++) { const yy = 60 + k * 120 + (k % 2) * 30; X.beginPath(); for (let xx = -1400; xx <= 1400; xx += 40) X.lineTo(xx, yy + vnoise(xx / 160, k + 3) * 18); X.stroke(); }
  const bos = o.bosluklar || [0];
  for (let i = 0; i < 80; i++) { const sx = (r() - .5) * 2700, sy = 30 + r() * 1200; if (bos.some(bx => Math.abs(sx - bx) < 300) && Math.abs(sy - KABIR.D) < 150) continue; leke(sx, sy, 8 + r() * 26, 6 + r() * 16, 200 + i, 7, .3); doldur(mix(mix('#8A7A68', '#5E5244', r()), '#201818', kar * .6), .9); }
  X.lineCap = 'round';
  for (let i = 0; i < 22; i++) { let px = (r() - .5) * 2400, py = 0; X.beginPath(); X.moveTo(px, py); const L = 80 + r() * 260; for (let k = 0; k < L; k += 20) { px += (r() - .5) * 22; py += 20; X.lineTo(px, py); } cizgi(mix('#A88A64', '#3A2C24', kar * .7), 2 + r() * 2, .55); }
  X.restore();
}
// Lahit: daralma halkaları, boşluk, portal, kefen, duman, ışık, çiçek. o.lx = toprağa göre yatay konum; o.kefen === false → boş lahit
function kabirLahit(o) {
  const s = o.s || 1, t = o.t || 0, kar = o.karanlik || 0, isik = o.isik || 0;
  X.save(); X.translate(o.x, o.y); X.scale(s, s); X.translate(o.lx || 0, 0);
  const sk = o.sikma || 0, W = KABIR.W * (1 - .22 * sk), Hh = KABIR.H * (1 - .42 * sk), cy = KABIR.D;
  if (sk > .01) for (let k = 1; k <= 4; k++) {
    const e = k * 26 * (1 - sk * .5);
    X.beginPath(); X.roundRect(-W / 2 - e, cy - Hh / 2 - e, W + 2 * e, Hh + 2 * e, 40 + e);
    cizgi(isik > .3 ? '#F2D48E' : mix('#2A1C14', '#6A1E12', kar), 3 + sk * 3, sk * (.55 - k * .1));
  }
  X.beginPath(); X.roundRect(-W / 2, cy - Hh / 2, W, Hh, 34);
  X.fillStyle = rGrad(0, cy, 10, W * .6, [[0, mix(mix('#3A2A1E', '#F4D58E', isik), '#120A08', kar * .7)], [1, mix(mix('#1E140E', '#B9874A', isik * .8), '#080404', kar * .7)]]); X.fill();
  if (o.portal && o.portal.a > .01) kabirPortali(0, cy - Hh * .05, W * .42 * o.portal.a, Hh * .44 * o.portal.a, o.portal, t);
  if (o.kefen !== false) kefen(0, cy + Hh * .18, Math.min(W * .78, 330), Math.min(Hh * .42, 62), isik);
  if (kar > .01) for (let i = 0; i < 12; i++) { const u = (t * .12 + i / 12) % 1; const dx = Math.sin(i * 2.3 + t * .4) * W * .45, dy = cy - Hh * .1 - u * 90 + Math.cos(i) * 20; elips(dx, dy, 40 + u * 50, 22 + u * 26); X.fillStyle = rgb('#0A0606', kar * .35 * Math.sin(u * Math.PI)); X.fill(); }
  if (kar > .01) { X.save(); X.globalCompositeOperation = 'screen'; X.beginPath(); X.roundRect(-W / 2, cy - Hh / 2, W, Hh, 34); cizgi('#8A2A16', 4, kar * .45); X.restore(); }
  if (isik > .01) { X.save(); X.globalCompositeOperation = 'screen'; parilti(0, cy, W * .9, '#FFD98A', .5 * isik); X.restore(); tozZerre(18, 31, t, -W / 2, cy - Hh / 2, W, Hh, '#FFF3CF', .7 * isik); }
  const ck = o.cicek || 0;
  if (ck > .01) for (let i = 0; i < 26; i++) { const a = i / 26 * TAU, rr = 1 + (hash(i) * .2); const cx = Math.cos(a) * (W / 2 + 14) * rr, cyy = cy + Math.sin(a) * (Hh / 2 + 12) * rr; const pr = 7 * ck * (.6 + hash(i + 9) * .6); for (let k = 0; k < 5; k++) { const b = k / 5 * TAU + i; daire(cx + Math.cos(b) * pr, cyy + Math.sin(b) * pr, pr * .7); doldur(hash(i * 3) < .5 ? '#FFF6EA' : '#F2C4C0'); } daire(cx, cyy, pr * .5); doldur('#E9B949'); }
  X.restore();
}
// Yüzey: çimen bandı, toprak kabir, taş. o.taslar = [[lx, tur]] (yoksa ortada tek taş)
function kabirYuzey(o) {
  const s = o.s || 1, t = o.t || 0, kar = o.karanlik || 0;
  X.save(); X.translate(o.x, o.y); X.scale(s, s);
  X.fillStyle = dGrad(0, -40, 0, 14, [[0, mix(o.cimRenk || '#7D8B4A', '#3A3A2A', kar * .6)], [1, mix('#5E6B34', '#2A2A20', kar * .6)]]); X.fillRect(-1400, -10, 2800, 24);
  cimen(-1300, 1300, 4, 34, 7, t, 61, mix(o.cimRenk || '#5E6B30', '#2E3020', kar * .6), .95);
  for (const [lx, tur] of (o.taslar || [[0, o.tas || 'sarik']])) {
    kabirYeri(lx, 4, 360, mix('#7A6048', '#3A2C24', kar * .6), o.yuzeyCicek || 0, 9 + lx, t);
    mezarTasi(lx + 150, -30, 190, tur, -.03, mix(o.tasRenk || '#DDD3BF', '#6A6460', kar * .6), 3 + lx);
  }
  X.restore();
}
function kabirPortali(x, y, rx, ry, p, t) {
  X.save(); elips(x, y, rx, ry); X.clip();
  const b = p.tur === 'bahce' ? 1 - (p.karis || 0) : 0, c = 1 - b;
  if (b > 0) { X.globalAlpha = b; cennetMini(x, y, rx, ry, t); }
  if (c > 0) { X.globalAlpha = c; cukurMini(x, y, rx, ry, t); }
  X.restore();
  X.save(); X.globalCompositeOperation = 'screen'; elips(x, y, rx, ry); cizgi(b > .5 ? '#FFE7A8' : '#FF8A4A', 5, .7); parilti(x, y, Math.max(rx, ry) * 1.6, b > .5 ? '#FFE3A0' : '#FF6A2A', .35); X.restore();
}
function cennetMini(x, y, rx, ry, t) {
  X.fillStyle = dGrad(0, y - ry, 0, y + ry, [[0, '#FFF6DC'], [.5, '#F6E2A8'], [1, '#CFE3B0']]); X.fillRect(x - rx, y - ry, rx * 2, ry * 2);
  parilti(x, y - ry * .5, rx, '#FFFFFF', .6);
  X.beginPath(); X.moveTo(x - rx, y + ry * .2); for (let k = 0; k <= 10; k++) X.lineTo(x - rx + rx * 2 * k / 10, y + ry * .15 - Math.sin(k * .9) * ry * .12); X.lineTo(x + rx, y + ry); X.lineTo(x - rx, y + ry); X.closePath(); doldur('#8FBF7A');
  X.beginPath(); X.moveTo(x - rx * .1, y + ry * .2); X.quadraticCurveTo(x + rx * .3, y + ry * .6, x - rx * .2, y + ry); X.lineTo(x + rx * .3, y + ry); X.quadraticCurveTo(x + rx * .6, y + ry * .5, x + rx * .05, y + ry * .2); X.closePath(); doldur('#BFE6F0');
  for (let i = 0; i < 5; i++) { const tx = x - rx * .8 + i * rx * .4, ty = y + ry * .2; X.fillStyle = '#7A5A3A'; X.fillRect(tx - 3, ty - ry * .25, 6, ry * .25); leke(tx, ty - ry * .38, rx * .14, ry * .18, 70 + i, 8, .2); doldur(i % 2 ? '#5FA36A' : '#7DB86E'); for (let k = 0; k < 4; k++) { daire(tx + (hash(i * 9 + k) - .5) * rx * .2, ty - ry * .38 + (hash(i * 7 + k) - .5) * ry * .2, 4); doldur('#F2B84A'); } }
}
function cukurMini(x, y, rx, ry, t) {
  X.fillStyle = dGrad(0, y - ry, 0, y + ry, [[0, '#1A0C0A'], [.6, '#4A140C'], [1, '#C2421A']]); X.fillRect(x - rx, y - ry, rx * 2, ry * 2);
  parilti(x, y + ry * .9, rx * 1.1, '#FF7A2E', .7);
  X.fillStyle = '#140A08'; cokgen([[x - rx, y - ry], [x - rx * .35, y - ry], [x - rx * .55, y + ry * .2], [x - rx * .3, y + ry], [x - rx, y + ry]]); X.fill();
  cokgen([[x + rx, y - ry], [x + rx * .3, y - ry], [x + rx * .5, y + ry * .1], [x + rx * .25, y + ry], [x + rx, y + ry]]); X.fill();
  for (let i = 0; i < 14; i++) { const u = (t * .3 + i / 14) % 1; daire(x + Math.sin(i * 3 + t) * rx * .3, y + ry - u * ry * 2, 2.2); X.fillStyle = rgb('#FFB060', Math.sin(u * Math.PI)); X.fill(); }
}

// Hurma ağacı
function hurma(x, y, h, t, seed = 0, renk = '#5E6B34', govde = '#8A6A48') {
  const s = sal(t * .8, seed) * h * .02;
  X.save(); X.translate(x, y);
  X.beginPath(); X.moveTo(-h * .025, 0); X.quadraticCurveTo(h * .06, -h * .5, s, -h); X.lineTo(s + h * .02, -h); X.quadraticCurveTo(h * .09, -h * .5, h * .025, 0); X.closePath(); doldur(govde);
  X.strokeStyle = rgb(koyu(govde, .3), .6); X.lineWidth = Math.max(1, h * .006); for (let k = 1; k < 14; k++) { const yy = -h * k / 14, xx = h * .06 * Math.sin(Math.PI * k / 14) + s * k / 14; X.beginPath(); X.moveTo(xx - h * .025, yy); X.lineTo(xx + h * .025, yy + h * .01); X.stroke(); }
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i / 9 - .5) * 2.9 + sal(t * 1.2, seed + i) * .05, L = h * (.32 + hash(seed + i) * .1);
    const ex = s + Math.cos(a) * L, ey = -h + Math.sin(a) * L * .55 + L * .25;
    X.beginPath(); X.moveTo(s, -h); X.quadraticCurveTo(s + Math.cos(a) * L * .55, -h + Math.sin(a) * L * .6 - L * .1, ex, ey); cizgi(koyu(renk, .1), Math.max(1.5, h * .008));
    for (let k = 2; k < 10; k++) { const u = k / 10, px = s + (ex - s) * u, py = -h + (ey + h) * u - Math.sin(u * Math.PI) * L * .12, ll = L * .14 * (1 - u * .5); X.beginPath(); X.moveTo(px, py); X.lineTo(px + Math.cos(a + 1.2) * ll, py + Math.sin(a + 1.2) * ll + ll * .4); X.moveTo(px, py); X.lineTo(px + Math.cos(a - 1.2) * ll, py + Math.sin(a - 1.2) * ll + ll * .4); cizgi(i % 2 ? renk : acik(renk, .12), Math.max(1, h * .006)); }
  }
  X.restore();
}

// Mescid-i Nebevî (Yeşil Kubbe, minareler, revaklar). s=1 → ~1000 px genişlik
function mescidiNebevi(x, y, s, t, isik = 1) {
  X.save(); X.translate(x, y); X.scale(s, s);
  const duvar = '#EFE6D2', duvarK = '#CFC2A6';
  // minareler
  for (const [mx, mh] of [[-470, 520], [-210, 470], [300, 500], [470, 540]]) {
    X.fillStyle = dGrad(mx - 16, 0, mx + 16, 0, [[0, duvarK], [.5, '#FBF6EA'], [1, duvarK]]); X.fillRect(mx - 15, -mh, 30, mh);
    for (const f of [.45, .72]) { X.fillStyle = rgb('#D9CDB2'); X.fillRect(mx - 26, -mh * f, 52, 12); X.fillStyle = rgb('#A8946C'); X.fillRect(mx - 24, -mh * f + 12, 48, 4); }
    X.beginPath(); X.moveTo(mx - 15, -mh); X.quadraticCurveTo(mx - 15, -mh - 40, mx, -mh - 70); X.quadraticCurveTo(mx + 15, -mh - 40, mx + 15, -mh); X.closePath(); X.fillStyle = dGrad(mx - 15, 0, mx + 15, 0, [[0, '#3E6E52'], [.5, '#6FA683'], [1, '#2E5A40']]); X.fill();
    X.strokeStyle = rgb(P.altin); X.lineWidth = 3; X.beginPath(); X.moveTo(mx, -mh - 70); X.lineTo(mx, -mh - 92); X.stroke(); X.beginPath(); X.arc(mx, -mh - 98, 7, Math.PI * .2, Math.PI * 1.8); X.stroke();
    if (isik > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(mx, -mh * .72, 40, '#FFE2A0', .4 * isik); X.restore(); }
  }
  // ana gövde ve revaklar
  X.fillStyle = dGrad(0, -200, 0, 0, [[0, '#F6EFDF'], [1, duvarK]]); X.fillRect(-560, -190, 1120, 190);
  for (let i = 0; i < 16; i++) { const ax = -525 + i * 70; X.beginPath(); X.moveTo(ax - 22, -10); X.lineTo(ax - 22, -110); X.arc(ax, -110, 22, Math.PI, 0); X.lineTo(ax + 22, -10); X.closePath(); X.fillStyle = isik > 0 ? rgb(mix('#6A5A44', '#F6C878', isik * .55)) : '#6A5A44'; X.fill(); }
  X.fillStyle = rgb('#D9CDB2'); X.fillRect(-570, -200, 1140, 16); for (let i = -560; i < 560; i += 28) X.fillRect(i, -214, 16, 16);
  // küçük beyaz kubbeler
  for (const dx of [-380, -250, -120, 330, 450]) { X.beginPath(); X.arc(dx, -200, 42, Math.PI, 0); X.fillStyle = dGrad(dx - 42, 0, dx + 42, 0, [[0, '#C9C3B6'], [.5, '#F3EFE6'], [1, '#B7B1A4']]); X.fill(); }
  // Yeşil Kubbe
  const gx = 120; X.fillStyle = dGrad(gx - 110, 0, gx + 110, 0, [[0, duvarK], [.5, '#F7F0E0'], [1, duvarK]]); X.fillRect(gx - 110, -300, 220, 100);
  for (let i = 0; i < 6; i++) { X.fillStyle = rgb('#7A6A50'); X.beginPath(); X.roundRect(gx - 92 + i * 34, -280, 16, 50, [8, 8, 0, 0]); X.fill(); }
  X.beginPath(); X.moveTo(gx - 118, -300); X.bezierCurveTo(gx - 120, -420, gx - 40, -470, gx, -520); X.bezierCurveTo(gx + 40, -470, gx + 120, -420, gx + 118, -300); X.closePath();
  X.fillStyle = dGrad(gx - 118, 0, gx + 118, 0, [[0, '#1F5A3A'], [.35, '#3E9A62'], [.55, '#5DB57E'], [1, '#1E4E34']]); X.fill();
  X.strokeStyle = 'rgba(20,60,40,.35)'; X.lineWidth = 2; for (let k = -3; k <= 3; k++) { X.beginPath(); X.moveTo(gx + k * 30, -300); X.quadraticCurveTo(gx + k * 14, -440, gx, -515); X.stroke(); }
  X.strokeStyle = rgb(P.altin); X.lineWidth = 4; X.beginPath(); X.moveTo(gx, -520); X.lineTo(gx, -560); X.stroke(); daire(gx, -546, 7); doldur(P.altin); X.beginPath(); X.arc(gx, -578, 11, Math.PI * .2, Math.PI * 1.8); X.stroke();
  if (isik > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(gx, -420, 260, '#9FE0B0', .22 * isik); X.restore(); }
  X.restore();
}

// Kerpiç ev (Hicaz). o: {isik 0..1 pencere, gece 0..1, besik, ocak}
function kerpicEv(x, y, s, t, o = {}) {
  X.save(); X.translate(x, y); X.scale(s, s);
  const g = o.gece || 0, duvar = mix('#C9A274', '#3E4058', g * .75), duvarK = mix('#A27E56', '#2A2C40', g * .75), ahsap = mix('#6B4A2E', '#2A2228', g * .7);
  // arka blok
  X.fillStyle = dGrad(0, -380, 0, 0, [[0, acik(duvar, .05)], [1, duvarK]]); X.beginPath(); X.roundRect(-120, -380, 400, 380, [18, 18, 0, 0]); X.fill();
  // ön blok
  X.fillStyle = dGrad(0, -270, 0, 0, [[0, acik(duvar, .1)], [1, duvarK]]); X.beginPath(); X.roundRect(-380, -270, 380, 270, [16, 16, 0, 0]); X.fill();
  X.strokeStyle = rgb(duvarK, .5); X.lineWidth = 2; const r = rng(41);
  for (let i = 0; i < 60; i++) { const px = -370 + r() * 640, py = -370 + r() * 360; if (px < -120 && py < -270) continue; X.beginPath(); X.moveTo(px, py); X.lineTo(px + 10 + r() * 16, py); X.stroke(); }
  for (const [bx, by, n] of [[-370, -250, 9], [-110, -360, 9]]) for (let k = 0; k < n; k++) { X.fillStyle = rgb(ahsap); X.fillRect(bx + k * 42, by, 14, 12); }
  // kapı ve pencereler
  X.fillStyle = rgb(koyu(duvar, .25)); X.beginPath(); X.roundRect(-260, -170, 100, 170, [50, 50, 0, 0]); X.fill();
  X.fillStyle = rgb(ahsap); X.beginPath(); X.roundRect(-250, -160, 80, 160, [40, 40, 0, 0]); X.fill();
  X.strokeStyle = rgb(koyu(ahsap, .3)); X.lineWidth = 3; for (let k = 1; k < 4; k++) { X.beginPath(); X.moveTo(-250 + k * 20, -150); X.lineTo(-250 + k * 20, 0); X.stroke(); }
  const pen = [[40, -280, 70, 80], [-80, -200, 60, 70]];
  for (const [px, py, pw, ph] of pen) {
    X.fillStyle = rgb(koyu(duvar, .25)); X.fillRect(px - 6, py - 6, pw + 12, ph + 12);
    X.fillStyle = rgb(mix('#2A2220', '#FFC870', o.isik || 0)); X.fillRect(px, py, pw, ph);
    X.strokeStyle = rgb(ahsap); X.lineWidth = 4; for (let k = 1; k < 4; k++) { X.beginPath(); X.moveTo(px + k * pw / 4, py); X.lineTo(px + k * pw / 4, py + ph); X.stroke(); } X.beginPath(); X.moveTo(px, py + ph / 2); X.lineTo(px + pw, py + ph / 2); X.stroke();
    if ((o.isik || 0) > .01) { X.save(); X.globalCompositeOperation = 'screen'; parilti(px + pw / 2, py + ph / 2, 160, '#FFB860', .55 * o.isik); X.restore(); }
  }
  X.restore();
}
// Beşik (ahşap, sallanır) — çocuğun yeri; içinde figür yok, yalnızca örtü
function besik(x, y, s, t, renk = '#8A5A34') {
  X.save(); X.translate(x, y); X.scale(s, s); X.rotate(Math.sin(t * 1.3) * .06);
  X.beginPath(); X.arc(0, -150, 150, Math.PI * .28, Math.PI * .72); cizgi(koyu(renk, .2), 10);
  X.fillStyle = dGrad(0, -140, 0, -30, [[0, acik(renk, .1)], [1, koyu(renk, .2)]]); X.beginPath(); X.roundRect(-95, -130, 190, 90, 14); X.fill();
  X.beginPath(); X.roundRect(-85, -128, 170, 30, 12); doldur('#EDE3CC'); X.beginPath(); X.moveTo(-80, -112); X.quadraticCurveTo(0, -135, 80, -112); cizgi('#C9A860', 3, .8);
  for (const sx of [-95, 95]) { X.fillStyle = rgb(koyu(renk, .1)); X.fillRect(sx - 6, -175, 12, 60); daire(sx, -178, 9); doldur(koyu(renk, .1)); }
  X.restore();
}
function testi(x, y, s, renk = '#B9764A') {
  X.save(); X.translate(x, y); X.scale(s, s);
  X.beginPath(); X.moveTo(-.18, 0); X.quadraticCurveTo(-.5, -.5, -.2, -.9); X.lineTo(-.14, -1.1); X.lineTo(.14, -1.1); X.lineTo(.2, -.9); X.quadraticCurveTo(.5, -.5, .18, 0); X.closePath();
  X.fillStyle = dGrad(-.4, 0, .4, 0, [[0, koyu(renk, .25)], [.45, acik(renk, .15)], [1, koyu(renk, .3)]]); X.fill();
  X.restore();
}
// Işık sütunu / nur (peygamberin varlığının simgesi): dikey ya da yatay
function nur(x, y, en, boy, al, yatay = 0) {
  if (al <= 0) return;
  X.save(); X.globalCompositeOperation = 'screen';
  const w = lerp(en, boy, yatay), h = lerp(boy, en, yatay);
  X.fillStyle = rGrad(x, y, 0, Math.max(w, h) * .6, [[0, '#FFF6DA', .75 * al], [.5, '#FFE3A0', .3 * al], [1, '#FFD27A', 0]]);
  X.save(); X.translate(x, y); X.scale(w / Math.max(w, h), h / Math.max(w, h)); X.beginPath(); X.arc(0, 0, Math.max(w, h) * .6, 0, TAU); X.restore(); X.fill();
  parilti(x, y, Math.max(w, h) * .9, '#FFE7B0', .3 * al);
  X.restore();
}

// Hilal (ince ay) — hale küçük, iç kısım boş
function hilal(x, y, r, al = 1) {
  parilti(x, y, r * 5, '#9FB6D8', .22 * al);
  X.beginPath(); X.arc(x, y, r, Math.PI * .35, Math.PI * 1.65); X.arc(x + r * .42, y - r * .08, r * .9, Math.PI * 1.55, Math.PI * .45, true); X.closePath();
  X.fillStyle = rgb(P.ay, al); X.fill();
}
