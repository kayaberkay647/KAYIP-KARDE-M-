// YASTIĞIMDAKİ MUSKA — çizim motoru: yardımcılar, karakter iskeleti, karakterler, aksesuarlar
'use strict';
const W = 1080, H = 1920, TAU = Math.PI * 2;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => (t = clamp(t), t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOut = t => 1 - Math.pow(1 - clamp(t), 3);
const easeIn = t => Math.pow(clamp(t), 3);
const aralik = (t, a, b) => clamp((t - a) / (b - a));
function hash(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function gurultu(t, s = 0) { const i = Math.floor(t), f = t - i, u = f * f * (3 - 2 * f); return lerp(hash(i + s * 97), hash(i + 1 + s * 97), u) * 2 - 1; }
function tuval(w, h) { const k = document.createElement('canvas'); k.width = w; k.height = h; return k; }

const OUT = '#4a2d21', LW = 4.5;
function cizgi(g, w = LW, c = OUT) { g.lineWidth = w; g.strokeStyle = c; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); }
function dol(g, c) { g.fillStyle = c; g.fill(); }
function el(g, x, y, rx, ry, r = 0) { g.beginPath(); g.ellipse(x, y, Math.abs(rx), Math.abs(ry), r, 0, TAU); }
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect(x, y, w, h, r); }
function dg(g, x0, y0, x1, y1, stops) { const k = g.createLinearGradient(x0, y0, x1, y1); stops.forEach(([p, c]) => k.addColorStop(p, c)); return k; }
function rg(g, x, y, r0, r1, stops) { const k = g.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([p, c]) => k.addColorStop(p, c)); return k; }
function poly(g, pts) { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.closePath(); }
function yumusak(g, pts, kapali = true) { // noktalardan geçen yumuşak eğri
  const n = pts.length; g.beginPath();
  const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  if (kapali) {
    let s = m(pts[n - 1], pts[0]); g.moveTo(s[0], s[1]);
    for (let i = 0; i < n; i++) { const p = pts[i], q = m(p, pts[(i + 1) % n]); g.quadraticCurveTo(p[0], p[1], q[0], q[1]); }
    g.closePath();
  } else {
    g.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < n - 1; i++) { const q = m(pts[i], pts[i + 1]); g.quadraticCurveTo(pts[i][0], pts[i][1], q[0], q[1]); }
    g.lineTo(pts[n - 1][0], pts[n - 1][1]);
  }
}

// ───────────── ses → ağız ─────────────
function agizAcik(kim, t) {
  if (typeof ZAMAN === 'undefined') return 0;
  for (const r of ZAMAN.replikler) {
    if (r.kim !== kim || t < r.t0 || t > r.t1 || r.tur === 'icses' || r.tur === 'fisilti') continue;
    const i = Math.floor((t - r.t0) * ZAMAN.fps);
    return r.zarf[Math.min(i, r.zarf.length - 1)] || 0;
  }
  return 0;
}
function replikAktif(id, t) { const r = ZAMAN.replikler.find(r => r.id === id); return r && t >= r.t0 && t <= r.t1; }
function parcaNo(id, t) { const r = ZAMAN.replikler.find(r => r.id === id); if (!r) return -1; for (let i = r.parcalar.length - 1; i >= 0; i--) if (t >= r.parcalar[i].bas) return i; return -1; }
function kirpma(t, seed) { // göz kırpma çarpanı
  const p = 2.9 + hash(seed) * 2.1, f = ((t + hash(seed + 7) * 9) % p) / .16;
  return f < 1 ? Math.abs(Math.cos(f * Math.PI)) * .9 + .1 * (f > .5 ? 1 : 0) : 1;
}

// ───────────── iskelet ─────────────
function ik(sx, sy, hx, hy, L1, L2, bukum) {
  const dx = hx - sx, dy = hy - sy, d = Math.min(Math.hypot(dx, dy), L1 + L2 - .5);
  const a = Math.atan2(dy, dx), b = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  return [sx + Math.cos(a + bukum * b) * L1, sy + Math.sin(a + bukum * b) * L1];
}
function kol(g, omuz, hedef, o) {
  const L1 = o.L1 || 150, L2 = o.L2 || 148, k = o.kalin || 44;
  let [hx, hy] = hedef; const [sx, sy] = omuz, dx = hx - sx, dy = hy - sy, d = Math.hypot(dx, dy);
  if (d > L1 + L2 - 1) { hx = sx + dx / d * (L1 + L2 - 1); hy = sy + dy / d * (L1 + L2 - 1); }
  let ex, ey;
  if (o.bukum === undefined) { // dirsek her zaman dışa doğru bükülsün
    const a1 = ik(sx, sy, hx, hy, L1, L2, 1), a2 = ik(sx, sy, hx, hy, L1, L2, -1), yon = Math.sign(sx) || 1;
    [ex, ey] = (a1[0] * yon > a2[0] * yon) ? a1 : a2;
  } else [ex, ey] = ik(sx, sy, hx, hy, L1, L2, o.bukum);
  g.beginPath(); g.moveTo(sx, sy); g.lineTo(ex, ey); g.lineTo(hx, hy);
  g.lineCap = 'round'; g.lineJoin = 'round';
  g.lineWidth = k + LW * 2; g.strokeStyle = OUT; g.stroke();
  g.lineWidth = k; g.strokeStyle = o.renk; g.stroke();
  // kol içi gölge
  g.save(); g.globalAlpha = .18; g.beginPath(); g.moveTo(ex, ey); g.lineTo(hx, hy); g.lineWidth = k * .45; g.strokeStyle = '#000'; g.stroke(); g.restore();
  const a = Math.atan2(hy - ey, hx - ex);
  g.save(); g.translate(hx, hy); g.rotate(a - Math.PI / 2);
  // manşet
  g.beginPath(); g.moveTo(-k / 2, -2); g.lineTo(k / 2, -2); cizgi(g, 3, o.mansetRenk || OUT);
  // el (eldiven gibi yuvarlak, başparmak çıkıntısı)
  const tr = o.ten || TEN.nazli;
  el(g, 0, 20, 23, 27); dol(g, tr[0]); cizgi(g);
  g.beginPath(); g.ellipse((o.basparmak || 1) * 17, 12, 9, 13, (o.basparmak || 1) * -.5, 0, TAU); dol(g, tr[0]); cizgi(g, 3.5);
  el(g, 0, 22, 17, 20); dol(g, tr[0]);
  g.save(); g.globalAlpha = .25; el(g, 6, 28, 12, 14); dol(g, tr[1]); g.restore();
  if (o.bilezik) for (let i = 0; i < (o.bilezikSay ?? 4); i++) {
    el(g, 0, -10 - i * 8, k / 2 + 5, 5); g.lineWidth = 5; g.strokeStyle = i % 2 ? '#e0b648' : '#f3cf63'; g.stroke();
    g.beginPath(); g.ellipse(-8, -12 - i * 8, 5, 2, 0, 0, TAU); g.fillStyle = 'rgba(255,250,210,.8)'; g.fill();
  }
  if (o.tut) o.tut(g);
  g.restore();
  return [hx, hy, a];
}

const TEN = { nazli: ['#f9d9c2', '#eab598'], hatice: ['#f1ccb2', '#d9a78b'], emre: ['#f4cfb1', '#dcab8c'], gulizar: ['#a07a66', '#6e4e40'] };

function yuzYolu(g) {
  g.beginPath(); g.moveTo(0, -118);
  g.bezierCurveTo(64, -118, 104, -80, 104, -16);
  g.bezierCurveTo(104, 44, 82, 90, 40, 112);
  g.quadraticCurveTo(0, 130, -40, 112);
  g.bezierCurveTo(-82, 90, -104, 44, -104, -16);
  g.bezierCurveTo(-104, -80, -64, -118, 0, -118); g.closePath();
}

function goz(g, x, y, yon, o) {
  const ac = o.ac, w = 25, L = [x - w, y + 2], R = [x + w, y + 2], koyu = '#3a2218';
  const dis = yon > 0 ? R : L; // dış köşe
  if (ac < .16) {
    g.beginPath(); g.moveTo(L[0], L[1]); g.quadraticCurveTo(x, y + (o.mutlu ? -14 : 9), R[0], R[1]); cizgi(g, 5, koyu);
    if (o.kirpik) { g.beginPath(); g.moveTo(dis[0] - yon * 2, dis[1]); g.lineTo(dis[0] + yon * 9, dis[1] - (o.mutlu ? 6 : -2)); cizgi(g, 3.5, koyu); }
    return;
  }
  const ust = y - 2 - 24 * ac, alt = y + 14 + 3 * ac;
  g.save();
  g.beginPath(); g.moveTo(L[0], L[1]); g.quadraticCurveTo(x, ust, R[0], R[1]); g.quadraticCurveTo(x, alt, L[0], L[1]); g.closePath();
  g.fillStyle = o.yasli ? '#f7efe8' : '#fffbf7'; g.fill(); g.clip();
  const ix = x + (o.bak?.[0] || 0) * 9, iy = y + 4 + (o.bak?.[1] || 0) * 5, ir = 13.5;
  el(g, ix, iy, ir, ir); dol(g, o.iris); g.lineWidth = 2.5; g.strokeStyle = 'rgba(40,20,10,.55)'; g.stroke();
  el(g, ix, iy + 4, ir * .8, ir * .55); dol(g, 'rgba(255,255,255,.18)');
  el(g, ix, iy, 6.5 * (o.bebek || 1), 6.5 * (o.bebek || 1)); dol(g, '#1b100b');
  if (!o.donuk) { el(g, ix - 4.5, iy - 5, 3.3, 3.3); dol(g, '#fff'); el(g, ix + 4, iy + 4, 1.4, 1.4); dol(g, 'rgba(255,255,255,.8)'); }
  // üst kapak gölgesi
  g.globalAlpha = .22; g.beginPath(); g.moveTo(L[0], L[1]); g.quadraticCurveTo(x, ust, R[0], R[1]); g.lineTo(R[0], R[1] - 40); g.lineTo(L[0], L[1] - 40); g.closePath(); g.translate(0, 7); dol(g, '#7a4a35');
  g.restore();
  if (o.yas > 0) { g.save(); g.globalAlpha = o.yas * .8; g.beginPath(); g.moveTo(L[0] + 6, L[1] + 4); g.quadraticCurveTo(x, alt + 1, R[0] - 6, R[1] + 4); cizgi(g, 4, '#bfe3f2'); g.restore(); }
  g.beginPath(); g.moveTo(L[0] - 1, L[1]); g.quadraticCurveTo(x, ust, R[0] + 1, R[1]); cizgi(g, o.kirpik ? 6 : 5, koyu);
  if (o.kirpik) {
    g.beginPath(); g.moveTo(dis[0] - yon * 3, dis[1] - 1); g.quadraticCurveTo(dis[0] + yon * 6, dis[1] - 3, dis[0] + yon * 11, dis[1] - 9); cizgi(g, 4, koyu);
    g.beginPath(); g.moveTo(dis[0] - yon * 9, dis[1] - 7 * ac); g.lineTo(dis[0] - yon * 2, dis[1] - 14 * ac); cizgi(g, 3, koyu);
  }
  g.beginPath(); g.moveTo(L[0] + 5, L[1] + 3); g.quadraticCurveTo(x, alt - 1, R[0] - 5, R[1] + 3); cizgi(g, 1.8, 'rgba(110,60,40,.45)');
  g.beginPath(); g.moveTo(x - w * .75, (ust + y) / 2 - 7); g.quadraticCurveTo(x, ust - 6, x + w * .75, (ust + y) / 2 - 7); cizgi(g, 1.6, 'rgba(120,70,50,.35)');
  if (o.morluk) { g.save(); g.globalAlpha = o.morluk; g.beginPath(); g.moveTo(L[0] + 3, L[1] + 9); g.quadraticCurveTo(x, alt + 12, R[0] - 3, R[1] + 9); cizgi(g, 5, '#9d7a95'); g.restore(); }
  if (o.yasli) { g.beginPath(); g.moveTo(dis[0] + yon * 6, dis[1] + 2); g.lineTo(dis[0] + yon * 16, dis[1] - 2); g.moveTo(dis[0] + yon * 6, dis[1] + 8); g.lineTo(dis[0] + yon * 15, dis[1] + 9); cizgi(g, 1.8, 'rgba(120,70,50,.45)'); }
}

const KAS = { normal: [-30, -33], uzgun: [-43, -26], kizgin: [-20, -37], saskin: [-48, -47], endise: [-40, -31], mutlu: [-33, -35], suphe: [-30, -42] };
function kasCiz(g, x, y, yon, tip, renk, kalin = 5) {
  const p = Array.isArray(tip) ? tip : (KAS[tip] || KAS.normal);
  let [iy, oy] = p; if (tip === 'suphe' && yon < 0) { iy = -26; oy = -30; }
  const ix = x - yon * 17, ox = x + yon * 27;
  g.beginPath(); g.moveTo(ix, y + iy); g.quadraticCurveTo((ix + ox) / 2, y + Math.min(iy, oy) - 6, ox, y + oy); cizgi(g, kalin, renk);
}

function agizCiz(g, x, y, o) {
  const ac = clamp(o.konus || 0), s = o.gulum || 0, koyu = '#6a3124';
  if (ac < .07) {
    const w = 15 + Math.max(0, s) * 6;
    if (o.dudak) {
      g.beginPath(); g.moveTo(x - w, y - s * 3); g.quadraticCurveTo(x - 6, y - 7 - s * 3, x, y - 4 - s * 2); g.quadraticCurveTo(x + 6, y - 7 - s * 3, x + w, y - s * 3);
      g.quadraticCurveTo(x, y + 11 + s * 6, x - w, y - s * 3); g.closePath(); dol(g, o.dudak); cizgi(g, 2.4, '#5a1f1f');
      g.beginPath(); g.moveTo(x - w + 2, y - s * 3); g.quadraticCurveTo(x, y + 3 + s * 7, x + w - 2, y - s * 3); cizgi(g, 2.4, '#4a1616');
      return;
    }
    g.beginPath(); g.moveTo(x - w, y - s * 4); g.quadraticCurveTo(x, y + s * 14 - (s < 0 ? 4 : 0), x + w, y - s * 4); cizgi(g, 3.6, koyu);
    return;
  }
  const h = 5 + ac * 20, w = 16 + ac * 4 + Math.max(0, s) * 4;
  g.save();
  g.beginPath(); g.moveTo(x - w, y - s * 3); g.quadraticCurveTo(x, y - 5 - s * 1, x + w, y - s * 3);
  g.quadraticCurveTo(x + w * .85, y + h, x, y + h + s * 3); g.quadraticCurveTo(x - w * .85, y + h, x - w, y - s * 3); g.closePath();
  dol(g, '#7a2526'); g.save(); g.clip();
  if (ac > .35) { rr(g, x - w * .7, y - 8, w * 1.4, 7 + ac * 2, 3); dol(g, '#fff'); }
  el(g, x, y + h + 2, w * .6, h * .45); dol(g, '#d9676a');
  g.restore();
  g.beginPath(); g.moveTo(x - w, y - s * 3); g.quadraticCurveTo(x, y - 5 - s * 1, x + w, y - s * 3);
  g.quadraticCurveTo(x + w * .85, y + h, x, y + h + s * 3); g.quadraticCurveTo(x - w * .85, y + h, x - w, y - s * 3); g.closePath();
  cizgi(g, o.dudak ? 4 : 3, o.dudak || koyu);
  g.restore();
}

function kafa(g, K, o) {
  const d = (o.don || 0) * 13, tr = K.ten;
  // kulaklar
  for (const s of [-1, 1]) { el(g, s * 101 + d * .3, 10, 16, 23); dol(g, tr[0]); cizgi(g); el(g, s * 101 + d * .3, 10, 7, 12); dol(g, tr[1]); }
  // boyun
  g.beginPath(); g.rect(-27, 70, 54, 94); dol(g, tr[0]); g.beginPath(); g.moveTo(-27, 70); g.lineTo(-27, 160); g.moveTo(27, 70); g.lineTo(27, 160); cizgi(g);
  el(g, 0, 118, 30, 18); dol(g, 'rgba(160,90,60,.35)');
  yuzYolu(g); dol(g, o.solgun ? '#efd8cb' : tr[0]);
  g.save(); yuzYolu(g); g.clip();
  g.fillStyle = rg(g, 118 + d, 20, 20, 120, [[0, tr[1]], [1, tr[1] + '00']]); g.fillRect(-120, -130, 240, 260); g.globalAlpha = .5; el(g, 0, 140, 110, 34); dol(g, tr[1]);
  g.globalAlpha = 1;
  if (K.sacOnYol) { g.save(); g.translate(4, 12); K.sacOnYol(g, o); g.fillStyle = 'rgba(150,80,55,.28)'; g.fill(); g.restore(); }
  if (o.isik) o.isik(g); // sahneye özel yüz aydınlatması
  g.restore();
  yuzYolu(g); cizgi(g);
  // allık
  const allik = (o.solgun ? .25 : 1) * (K.allik ?? .55) * (o.kizarma ?? 1);
  for (const s of [-1, 1]) { el(g, s * 60 + d, 50, 23, 13); g.fillStyle = rg(g, s * 60 + d, 50, 2, 24, [[0, `rgba(240,110,110,${allik})`], [1, 'rgba(240,110,110,0)']]); g.fill(); }
  // gözler, kaşlar
  const go = { ac: o.ac, bak: o.bak, iris: K.iris, kirpik: K.kirpik, mutlu: o.mutluGoz, bebek: o.bebek, yas: o.yas, morluk: o.morluk, yasli: K.yasli, donuk: o.donuk };
  goz(g, -41 + d, 16, -1, go); goz(g, 41 + d, 16, 1, go);
  kasCiz(g, -41 + d, 16, -1, o.kas || 'normal', K.kasRenk); kasCiz(g, 41 + d, 16, 1, o.kas || 'normal', K.kasRenk);
  // burun
  g.beginPath(); g.moveTo(5 + d * 1.3, 40); g.quadraticCurveTo(13 + d * 1.3, 52, 3 + d * 1.3, 58); cizgi(g, 3, 'rgba(170,100,75,.9)');
  if (K.yasli) { for (const s of [-1, 1]) { g.beginPath(); g.moveTo(s * 26 + d, 64); g.quadraticCurveTo(s * 34 + d, 82, s * 30 + d, 96); cizgi(g, 1.8, 'rgba(140,80,60,.4)'); } }
  agizCiz(g, d * 1.1, 86, { konus: o.konus, gulum: o.gulum, dudak: K.dudak });
  if (K.ben) { el(g, 33 + d, 98, 3.4, 3.4); dol(g, '#4a2a22'); }
  if (o.ter) { g.save(); g.globalAlpha = o.ter; g.beginPath(); g.moveTo(80, -60); g.quadraticCurveTo(92, -40, 86, -30); g.quadraticCurveTo(74, -34, 80, -60); dol(g, '#cfeefc'); cizgi(g, 2.5, '#6aa0bf'); g.restore(); }
  if (o.yasDamla > 0) {
    g.save(); g.globalAlpha = .85; const yy = 30 + o.yasDamla * 70;
    g.beginPath(); g.moveTo(-58 + d, 26); g.quadraticCurveTo(-62 + d, yy - 10, -60 + d, yy); cizgi(g, 3.5, 'rgba(190,230,245,.9)');
    el(g, -60 + d, yy + 4, 5, 7); dol(g, '#d8f2fb'); cizgi(g, 2, '#7fb2cc'); g.restore();
  }
}

function karakter(g, K, o) {
  const t = o.t || 0, s = o.s || 1;
  g.save(); g.translate(o.x, o.y); g.scale(s * (o.ayna ? -1 : 1), s);
  if (o.don && o.ayna) o.don = -o.don;
  const nefes = Math.sin(t * 2.1 + K.seed) * 2.2;
  o.ac = o.ac ?? ((o.gozAcik ?? .82) * (o.kirpma === false ? 1 : kirpma(t, K.seed)));
  if (o.konus === undefined) o.konus = agizAcik(K.ad, o.T ?? t);
  const omuzY = 134 + nefes * .25;
  if (K.sacArka) { g.save(); g.translate(0, nefes * .3); K.sacArka(g, o); g.restore(); }
  const kollar = Object.assign({ sol: { el: [-132, 420] }, sag: { el: [132, 420] } }, o.kollar || {});
  const omuz = { sol: [-(K.omuz - 16), omuzY + 34], sag: [K.omuz - 16, omuzY + 34] };
  const kolCiz = (yan, on) => { const k = kollar[yan]; if (!k || !!k.on !== on || k.gizli) return;
    kol(g, omuz[yan], k.el, { renk: K.kolRenk, ten: K.ten, bukum: k.bukum, bilezik: K.bilezik, bilezikSay: o.bilezikSay, basparmak: yan === 'sol' ? 1 : -1, tut: k.tut, kalin: K.kolKalin, mansetRenk: K.manset }); };
  kolCiz('sol', false); kolCiz('sag', false);
  if (!o.govdeYok) { g.save(); g.translate(0, nefes * .25 - 16); K.beden(g, o); g.restore(); }
  if (o.onGovde) o.onGovde(g);
  kolCiz('sol', true); kolCiz('sag', true);
  if (o.kolSonrasi) o.kolSonrasi(g);
  g.save(); g.translate(o.kafaX || 0, nefes * .5 + (o.kafaY || 0)); g.rotate((o.egim || 0) + Math.sin(t * 1.3 + K.seed) * .008 + (o.konus || 0) * Math.sin(t * 9) * .006);
  kafa(g, K, o);
  if (K.sacOn) K.sacOn(g, o);
  if (K.basUstu) K.basUstu(g, o);
  g.restore();
  if (o.enUst) o.enUst(g);
  g.restore();
}

// ───────────── beden parçaları ─────────────
function govdeYolu(g, w, bel, y0, y1) {
  g.beginPath(); g.moveTo(-w + 30, y0); g.quadraticCurveTo(-w - 2, y0 + 2, -w, y0 + 44);
  g.lineTo(-bel, y1); g.lineTo(bel, y1); g.lineTo(w, y0 + 44); g.quadraticCurveTo(w + 2, y0 + 2, w - 30, y0); g.closePath();
}
function bacaklar(g, y0, y1, renk, ayakkabi, ara = 42, kalin = 36) {
  for (const s of [-1, 1]) {
    g.beginPath(); g.moveTo(s * ara, y0); g.lineTo(s * ara, y1); g.lineCap = 'round';
    g.lineWidth = kalin + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = kalin; g.strokeStyle = renk; g.stroke();
    el(g, s * (ara + 8), y1 + 14, 30, 15); dol(g, ayakkabi); cizgi(g);
  }
}

// ───────────── KARAKTERLER ─────────────
const NAZLI = {
  ad: 'NAZLI', seed: 3, omuz: 112, ten: TEN.nazli, iris: '#7a5532', kirpik: true, kasRenk: '#5b3622', allik: .6,
  sac: ['#8d5837', '#6d3f25', '#ad7550'], kolRenk: '#a5bd9c', manset: '#7d9877',
  kiyafet: 'elbise',
  sacArka(g, o) {
    const t = o.t || 0, sw = Math.sin(t * 1.4 + 1) * 5, uz = o.sacUzun ?? 330;
    const p = [[0, -140], [110, -120], [148, -30], [150, 90], [158, uz - 80], [150 + sw, uz], [100 + sw, uz + 22], [40, uz - 4], [-40, uz - 4], [-100 + sw, uz + 22], [-150 + sw, uz], [-158, uz - 80], [-150, 90], [-148, -30], [-110, -120]];
    yumusak(g, p); g.fillStyle = dg(g, 0, -140, 0, uz, [[0, this.sac[0]], [1, this.sac[1]]]); g.fill(); cizgi(g);
    g.globalAlpha = .5; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(s * 120, 60); g.quadraticCurveTo(s * 135, 180, s * (125) + sw, uz - 30); cizgi(g, 3, this.sac[1]); } g.globalAlpha = 1;
  },
  sacOnYol(g) {
    g.beginPath(); g.moveTo(-112, 30);
    g.bezierCurveTo(-118, -90, -60, -142, 0, -140); g.bezierCurveTo(60, -142, 118, -90, 112, 30);
    g.bezierCurveTo(108, 70, 100, 96, 92, 112); g.bezierCurveTo(78, 60, 70, -10, 46, -62); g.bezierCurveTo(30, -88, 12, -98, 0, -104);
    g.bezierCurveTo(-12, -98, -30, -88, -46, -62); g.bezierCurveTo(-70, -10, -78, 60, -92, 112); g.bezierCurveTo(-100, 96, -108, 70, -112, 30); g.closePath();
  },
  sacOn(g, o) {
    this.sacOnYol(g); g.fillStyle = dg(g, 0, -140, 0, 110, [[0, this.sac[2]], [.4, this.sac[0]], [1, this.sac[1]]]); g.fill(); cizgi(g);
    g.globalAlpha = .55;
    for (const s of [-1, 1]) {
      g.beginPath(); g.moveTo(s * 8, -100); g.bezierCurveTo(s * 40, -80, s * 70, -20, s * 86, 80); cizgi(g, 2.6, this.sac[1]);
      g.beginPath(); g.moveTo(s * 30, -120); g.bezierCurveTo(s * 70, -110, s * 96, -60, s * 102, 0); cizgi(g, 2.6, this.sac[1]);
    }
    g.globalAlpha = .35; g.beginPath(); g.moveTo(-40, -128); g.quadraticCurveTo(-10, -138, 20, -130); cizgi(g, 7, '#d29b6e'); g.globalAlpha = 1;
  },
  beden(g, o) {
    const k = o.kiyafet || this.kiyafet;
    if (k === 'pijama') {
      govdeYolu(g, 114, 98, 150, 470); dol(g, '#c3b1dc'); cizgi(g);
      g.save(); govdeYolu(g, 114, 98, 150, 470); g.clip(); g.globalAlpha = .25; el(g, 90, 300, 60, 200); dol(g, '#8e78b2'); g.restore();
      g.beginPath(); g.moveTo(-38, 152); g.quadraticCurveTo(0, 200, 38, 152); dol(g, this.ten[0]); cizgi(g, 3.5);
      g.beginPath(); g.moveTo(0, 196); g.lineTo(0, 470); cizgi(g, 2.5, 'rgba(90,60,120,.5)');
      for (let i = 0; i < 4; i++) { el(g, 10, 230 + i * 60, 5, 5); dol(g, '#fff'); cizgi(g, 2); }
      bacaklar(g, 470, 820, '#c3b1dc', '#e8dff5', 44, 58);
      return;
    }
    const bedenRenk = '#a7bf9e', golge = '#87a07f';
    g.beginPath(); g.moveTo(-92, 420); g.quadraticCurveTo(-110, 560, -138, 700); g.quadraticCurveTo(0, 724, 138, 700); g.quadraticCurveTo(110, 560, 92, 420); g.closePath();
    if (!o.etekYok) { bacaklar(g, 700, 830, this.ten[0], '#8a5a3c', 40, 32); g.beginPath(); g.moveTo(-92, 420); g.quadraticCurveTo(-110, 560, -138, 700); g.quadraticCurveTo(0, 724, 138, 700); g.quadraticCurveTo(110, 560, 92, 420); g.closePath(); dol(g, bedenRenk); cizgi(g);
      g.globalAlpha = .4; for (const x of [-60, 0, 60]) { g.beginPath(); g.moveTo(x * .6, 440); g.quadraticCurveTo(x, 600, x * 1.3, 705); cizgi(g, 2.5, golge); } g.globalAlpha = 1; }
    govdeYolu(g, 112, 94, 150, 440); dol(g, bedenRenk); cizgi(g);
    g.save(); govdeYolu(g, 112, 94, 150, 440); g.clip(); g.globalAlpha = .35; el(g, 95, 300, 55, 220); dol(g, golge); g.restore();
    g.beginPath(); g.moveTo(-40, 152); g.quadraticCurveTo(0, 206, 40, 152); dol(g, this.ten[0]); cizgi(g, 3.5);
    // dantel yaka
    for (let i = -4; i <= 4; i++) { const a = i / 4 * .9, x = Math.sin(a) * 46, y = 156 + Math.cos(a) * 44 - 40; el(g, x, y + 4, 7, 6); dol(g, '#fbf6ec'); cizgi(g, 2); }
    rr(g, -94, 412, 188, 22, 8); dol(g, '#8aa482'); cizgi(g, 3);
  },
  get kolRenkGece() { return '#c3b1dc'; }
};

const HATICE = {
  ad: 'HATICE', seed: 11, omuz: 116, ten: TEN.hatice, iris: '#5d6b45', kirpik: true, kasRenk: '#6d6560', allik: .35,
  dudak: '#a52a35', ben: true, yasli: true, bilezik: true, kolRenk: '#7b2633', manset: '#521823',
  sac: ['#bdb7b1', '#958e88', '#dcd7d2'],
  sacOnYol(g) {
    g.beginPath(); g.moveTo(-110, 20);
    g.bezierCurveTo(-120, -90, -60, -140, 0, -138); g.bezierCurveTo(60, -140, 120, -90, 110, 20);
    g.bezierCurveTo(100, -20, 90, -60, 60, -78); g.bezierCurveTo(30, -92, -30, -92, -60, -78); g.bezierCurveTo(-90, -60, -100, -20, -110, 20); g.closePath();
  },
  sacOn(g) {
    el(g, 0, -150, 52, 40); g.fillStyle = dg(g, 0, -190, 0, -110, [[0, this.sac[2]], [1, this.sac[1]]]); g.fill(); cizgi(g);
    g.globalAlpha = .6; g.beginPath(); g.moveTo(-30, -160); g.quadraticCurveTo(0, -180, 32, -158); g.moveTo(-36, -140); g.quadraticCurveTo(0, -125, 36, -140); cizgi(g, 2.5, this.sac[1]); g.globalAlpha = 1;
    this.sacOnYol(g); g.fillStyle = dg(g, 0, -140, 0, 20, [[0, this.sac[2]], [1, this.sac[0]]]); g.fill(); cizgi(g);
    g.globalAlpha = .55; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(s * 10, -86); g.bezierCurveTo(s * 50, -84, s * 90, -60, s * 104, 0); g.moveTo(s * 20, -120); g.bezierCurveTo(s * 60, -120, s * 96, -80, s * 108, -30); cizgi(g, 2.4, this.sac[1]); } g.globalAlpha = 1;
    // inci küpe
    for (const s of [-1, 1]) { el(g, s * 104, 36, 6, 6); dol(g, '#fbf3e6'); cizgi(g, 2); }
  },
  beden(g, o) {
    bacaklar(g, 690, 830, '#c9a690', '#2a1d1a', 38, 30);
    g.beginPath(); g.moveTo(-96, 420); g.lineTo(-118, 700); g.quadraticCurveTo(0, 716, 118, 700); g.lineTo(96, 420); g.closePath(); dol(g, '#2c2427'); cizgi(g);
    govdeYolu(g, 116, 98, 150, 450); dol(g, '#3a2b34'); cizgi(g);
    // hırka
    for (const s of [-1, 1]) {
      g.beginPath(); g.moveTo(s * 86, 150); g.quadraticCurveTo(s * 120, 152, s * 116, 194); g.lineTo(s * 104, 520); g.lineTo(s * 40, 530); g.lineTo(s * 30, 200); g.closePath();
      dol(g, '#7b2633'); cizgi(g);
      g.save(); g.globalAlpha = .3; g.beginPath(); g.moveTo(s * 40, 230); g.lineTo(s * 46, 520); cizgi(g, 10, '#4c1520'); g.restore();
    }
    g.beginPath(); g.moveTo(-34, 152); g.quadraticCurveTo(0, 196, 34, 152); dol(g, this.ten[0]); cizgi(g, 3.5);
    // altın kolye
    g.beginPath(); g.moveTo(-38, 158); g.quadraticCurveTo(0, 232, 38, 158); g.setLineDash([3, 5]); cizgi(g, 4, '#e2b84a'); g.setLineDash([]);
    el(g, 0, 214, 8, 10); dol(g, '#efc85a'); cizgi(g, 2, '#8a6a20');
    for (const y of [270, 330, 390]) { el(g, 32, y, 5, 5); dol(g, '#d9c9a8'); }
  },
};

const EMRE = {
  ad: 'EMRE', seed: 21, omuz: 124, ten: TEN.emre, iris: '#5b3a22', kirpik: false, kasRenk: '#2a1d18', allik: .3,
  sac: ['#2c211c', '#1a1310', '#4a3a32'], kolRenk: '#6f7c57', manset: '#58643f', kolKalin: 48,
  sacOnYol(g) {
    g.beginPath(); g.moveTo(-110, 20);
    g.bezierCurveTo(-122, -100, -60, -152, 4, -150); g.bezierCurveTo(70, -150, 124, -100, 110, 20);
    g.lineTo(100, -30); g.lineTo(84, -52); g.lineTo(66, -38); g.lineTo(46, -64); g.lineTo(22, -46); g.lineTo(0, -70); g.lineTo(-24, -50); g.lineTo(-48, -66); g.lineTo(-70, -46); g.lineTo(-88, -58); g.lineTo(-102, -28); g.closePath();
  },
  sacOn(g) {
    this.sacOnYol(g); g.fillStyle = dg(g, 0, -150, 0, 0, [[0, this.sac[2]], [.5, this.sac[0]], [1, this.sac[1]]]); g.fill(); cizgi(g);
    g.globalAlpha = .5; g.beginPath(); g.moveTo(-30, -130); g.quadraticCurveTo(10, -140, 50, -124); cizgi(g, 6, '#5d4a40'); g.globalAlpha = 1;
  },
  beden(g, o) {
    bacaklar(g, 450, 830, '#3b3d48', '#2a1d16', 46, 66);
    const ceket = o.ceket;
    govdeYolu(g, 124, 104, 150, 470); dol(g, '#6f7c57'); cizgi(g);
    g.save(); govdeYolu(g, 124, 104, 150, 470); g.clip(); g.globalAlpha = .35; el(g, 100, 300, 60, 230); dol(g, '#55613f'); g.restore();
    // gömlek yakası
    for (const s of [-1, 1]) { poly(g, [[s * 4, 160], [s * 46, 150], [s * 52, 196], [s * 16, 206]]); dol(g, '#7d8a63'); cizgi(g, 3.5); }
    g.beginPath(); g.moveTo(0, 200); g.lineTo(0, 470); cizgi(g, 2.5, 'rgba(50,60,30,.6)');
    for (let i = 0; i < 4; i++) { el(g, 9, 240 + i * 58, 4.5, 4.5); dol(g, '#e9e3d0'); cizgi(g, 1.8); }
    if (ceket) {
      for (const s of [-1, 1]) {
        g.beginPath(); g.moveTo(s * 50, 148); g.quadraticCurveTo(s * 128, 150, s * 126, 196); g.lineTo(s * 116, 520); g.lineTo(s * 30, 530); g.lineTo(s * 44, 260); g.closePath();
        dol(g, '#4d3f35'); cizgi(g);
        poly(g, [[s * 50, 150], [s * 74, 152], [s * 52, 250], [s * 40, 230]]); dol(g, '#3d3129'); cizgi(g, 3);
      }
    }
  },
};

const GULIZAR = { ad: 'GULIZAR', seed: 31 };
function gulizar(g, o) {
  const t = o.t || 0, s = o.s || 1, ac = clamp(o.konus ?? agizAcik('GULIZAR', o.T ?? t));
  g.save(); g.translate(o.x, o.y); g.scale(s, s);
  const nefes = Math.sin(t * 1.6) * 2.5;
  // örtü / beden
  g.beginPath(); g.moveTo(0, -190); g.bezierCurveTo(140, -190, 180, -60, 175, 80); g.bezierCurveTo(240, 180, 300, 360, 320, 700); g.lineTo(-320, 700); g.bezierCurveTo(-300, 360, -240, 180, -175, 80); g.bezierCurveTo(-180, -60, -140, -190, 0, -190); g.closePath();
  g.fillStyle = dg(g, 0, -190, 0, 700, [[0, '#1b1416'], [1, '#0d090a']]); g.fill(); cizgi(g, 5, '#050304');
  g.save(); g.globalAlpha = .4; g.beginPath(); g.moveTo(-120, 140); g.quadraticCurveTo(-60, 300, -140, 600); g.moveTo(130, 150); g.quadraticCurveTo(80, 320, 150, 640); cizgi(g, 4, '#2b2124'); g.restore();
  // yüz (alttan mum ışığı)
  g.save(); g.translate(0, 10 + nefes * .3);
  g.beginPath(); g.moveTo(0, -112); g.bezierCurveTo(64, -112, 96, -70, 96, -10); g.bezierCurveTo(96, 50, 76, 92, 36, 114); g.quadraticCurveTo(0, 132, -36, 114); g.bezierCurveTo(-76, 92, -96, 50, -96, -10); g.bezierCurveTo(-96, -70, -64, -112, 0, -112); g.closePath();
  g.fillStyle = dg(g, 0, -112, 0, 130, [[0, '#120c0c'], [.45, '#3b2722'], [.8, '#8a5b45'], [1, '#b47a58']]); g.fill();
  g.save(); g.clip();
  // kırışıklar
  g.globalAlpha = .55;
  for (const sx of [-1, 1]) { g.beginPath(); g.moveTo(sx * 22, 58); g.quadraticCurveTo(sx * 40, 84, sx * 34, 110); g.moveTo(sx * 50, 40); g.quadraticCurveTo(sx * 64, 70, sx * 58, 96); cizgi(g, 2.2, '#2a1814'); }
  g.beginPath(); g.moveTo(-14, 118); g.quadraticCurveTo(0, 124, 14, 118); cizgi(g, 2, '#2a1814');
  g.restore();
  // göz parıltıları (gölgede)
  const parla = .55 + .45 * Math.abs(Math.sin(t * .7));
  for (const sx of [-1, 1]) { el(g, sx * 38, 6, 6, 3.5); dol(g, `rgba(255,220,170,${.5 * parla})`); el(g, sx * 38, 6, 2.2, 2.2); dol(g, `rgba(255,245,220,${parla})`); }
  // ağız
  const h = 3 + ac * 22, w = 20 + ac * 3;
  g.beginPath(); g.moveTo(-w, 82); g.quadraticCurveTo(0, 76 - ac * 2, w, 82); g.quadraticCurveTo(w * .8, 82 + h, 0, 84 + h); g.quadraticCurveTo(-w * .8, 82 + h, -w, 82); g.closePath();
  dol(g, '#1a0a08'); if (ac > .3) { poly(g, [[-8, 80], [-2, 80], [-4, 88]]); dol(g, '#d9c9a0'); poly(g, [[6, 80], [12, 80], [9, 87]]); dol(g, '#cbb88c'); }
  cizgi(g, 3, '#2a1410');
  g.restore();
  // örtü kenarı yüzü çevreler
  g.beginPath(); g.moveTo(-104, 120); g.bezierCurveTo(-130, -40, -110, -170, 0, -170); g.bezierCurveTo(110, -170, 130, -40, 104, 120); g.bezierCurveTo(120, 20, 100, -110, 0, -116); g.bezierCurveTo(-100, -110, -120, 20, -104, 120); g.closePath();
  g.fillStyle = '#1e1618'; g.fill(); cizgi(g, 4, '#050304');
  g.restore();
}
function gulizarEl(g, x, y, s, aci, o = {}) { // buruşuk, uzun tırnaklı el + siyah yen
  g.save(); g.translate(x, y); g.rotate(aci); g.scale(s, s);
  g.beginPath(); g.moveTo(-40, -420); g.lineTo(40, -420); g.lineTo(34, -40); g.lineTo(-34, -40); g.closePath(); dol(g, '#151012'); cizgi(g, 4, '#050304');
  el(g, 0, 0, 34, 44); dol(g, o.renk || '#a8836c'); cizgi(g, 4, '#3a2318');
  const parmak = o.parmak ?? [-.25, -.08, .08, .25];
  parmak.forEach((a, i) => {
    g.save(); g.rotate(a); const L = 62 + (i === 1 || i === 2 ? 8 : 0);
    rr(g, -8, 20, 16, L, 8); dol(g, o.renk || '#a8836c'); cizgi(g, 3.5, '#3a2318');
    for (const k of [L * .45, L * .7]) { g.beginPath(); g.moveTo(-5, 20 + k); g.lineTo(5, 20 + k); cizgi(g, 1.6, 'rgba(60,30,20,.6)'); }
    g.beginPath(); g.moveTo(-6, 18 + L); g.quadraticCurveTo(0, 36 + L, 6, 18 + L); dol(g, '#d9c27a'); cizgi(g, 2, '#6a5520');
    g.restore();
  });
  g.save(); g.rotate(-1.0); rr(g, -8, 10, 16, 46, 8); dol(g, o.renk || '#a8836c'); cizgi(g, 3.5, '#3a2318'); g.restore();
  g.globalAlpha = .5; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(-20, -20 + i * 9); g.quadraticCurveTo(0, -16 + i * 9, 20, -22 + i * 9); cizgi(g, 1.6, '#4a2c20'); }
  g.restore();
}

// ───────────── AKSESUARLAR ─────────────
function mum(g, x, y, s, t, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  el(g, 0, 0, 70, 18); dol(g, '#4a3a2c'); cizgi(g, 3, '#1d140e');
  rr(g, -30, -150, 60, 150, 8); g.fillStyle = dg(g, -30, 0, 30, 0, [[0, '#e9dcc0'], [.6, '#f7efdc'], [1, '#c9b894']]); g.fill(); cizgi(g, 3.5, '#5a4630');
  g.beginPath(); g.moveTo(-30, -142); g.quadraticCurveTo(-24, -110, -18, -116); g.quadraticCurveTo(-12, -140, 0, -132); g.quadraticCurveTo(8, -100, 14, -108); g.quadraticCurveTo(20, -138, 30, -140); g.lineTo(30, -150); g.lineTo(-30, -150); g.closePath(); dol(g, '#fbf5e6');
  g.beginPath(); g.moveTo(0, -150); g.lineTo(2, -166); cizgi(g, 3, '#1a1410');
  if (!o.sonuk) {
    const f = 1 + gurultu(t * 8, 3) * .12, sw = gurultu(t * 5, 9) * 5;
    g.save(); g.translate(2, -164); g.scale(f, f * (1 + gurultu(t * 6, 4) * .1));
    g.beginPath(); g.moveTo(0, 6); g.quadraticCurveTo(-16, -8, sw, -54); g.quadraticCurveTo(16, -8, 0, 6); g.fillStyle = 'rgba(255,170,60,.95)'; g.fill();
    g.beginPath(); g.moveTo(0, 4); g.quadraticCurveTo(-8, -6, sw * .6, -32); g.quadraticCurveTo(8, -6, 0, 4); g.fillStyle = '#fff5c8'; g.fill();
    el(g, 0, 0, 4, 6); dol(g, 'rgba(80,120,255,.6)');
    g.restore();
  } else if (o.duman !== undefined) {
    g.save(); g.globalAlpha = clamp(1 - o.duman) * .7;
    for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(2, -166); g.bezierCurveTo(-20 + i * 10, -220 - o.duman * 80, 30 - i * 8, -260 - o.duman * 120, 4 + i * 6, -320 - o.duman * 180); cizgi(g, 4 - i, '#9a9088'); }
    g.restore();
  }
  g.restore();
}
function isikHalesi(g, x, y, r, renk = '255,170,80', a = .5, t = 0) {
  const f = 1 + gurultu(t * 7, 5) * .05;
  g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = rg(g, x, y, 0, r * f, [[0, `rgba(${renk},${a})`], [.35, `rgba(${renk},${a * .35})`], [1, `rgba(${renk},0)`]]);
  g.fillRect(x - r * 1.2, y - r * 1.2, r * 2.4, r * 2.4); g.restore();
}
function karanlik(g, x, y, r0, r1, a, t = 0) { // ışık kaynağı dışında karanlık
  const f = 1 + gurultu(t * 7, 5) * .04;
  g.fillStyle = rg(g, x, y, r0 * f, r1 * f, [[0, 'rgba(0,0,0,0)'], [1, `rgba(0,0,0,${a})`]]);
  g.fillRect(-2000, -2000, W + 4000, H + 4000);
}

function sacTeli(g, x, y, uz, aci, kivrim, renk = '#8d5837', kalin = 2.6) {
  g.beginPath(); g.moveTo(x, y);
  const ex = x + Math.cos(aci) * uz, ey = y + Math.sin(aci) * uz;
  g.bezierCurveTo(x + Math.cos(aci + kivrim) * uz * .4, y + Math.sin(aci + kivrim) * uz * .4, ex - Math.cos(aci - kivrim) * uz * .4, ey - Math.sin(aci - kivrim) * uz * .4, ex, ey);
  cizgi(g, kalin, renk);
}
function zarf(g, x, y, s, acik, sacCik, t) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -260, -160, 520, 320, 10); g.fillStyle = dg(g, 0, -160, 0, 160, [[0, '#d8c39c'], [1, '#b89b6e']]); g.fill(); cizgi(g, 5, '#3a2a1a');
  // saçlar
  if (sacCik > 0) {
    g.save(); g.beginPath(); g.rect(-300, -600, 600, 440 + 10); g.clip();
    for (let i = 0; i < 26; i++) {
      const bx = -150 + hash(i) * 300, uz = 120 + hash(i + 3) * 220;
      g.save(); g.translate(0, -sacCik * 160);
      sacTeli(g, bx, -40, uz, -Math.PI / 2 + (hash(i + 9) - .5) * .9, (hash(i + 5) - .5) * 1.6, i % 3 ? '#8d5837' : '#a8703f', 3.2);
      g.restore();
    }
    g.restore();
  }
  g.beginPath(); g.moveTo(-260, 160); g.lineTo(0, 10); g.lineTo(260, 160); cizgi(g, 4, '#7a5f3a');
  // kapak
  const ky = lerp(40, -330, acik);
  g.beginPath(); g.moveTo(-260, -160); g.lineTo(0, ky); g.lineTo(260, -160); g.closePath(); g.fillStyle = acik > .5 ? '#a8895c' : '#cbb388'; g.fill(); cizgi(g, 5, '#3a2a1a');
  if (acik < .5) { el(g, 0, ky - 30, 30, 30); dol(g, '#7d1b1b'); cizgi(g, 3, '#3a0a0a'); }
  g.restore();
}
function yastik(g, x, y, w, h, o = {}) {
  const t = o.t || 0, nef = o.nefes ? 1 + Math.sin(t * 1.9) * .018 * o.nefes : 1;
  g.save(); g.translate(x, y); g.scale(nef, nef); g.rotate(o.aci || 0);
  const hw = w / 2, hh = h / 2;
  const yol = () => { g.beginPath(); g.moveTo(-hw + 30, -hh); g.quadraticCurveTo(0, -hh + 22, hw - 30, -hh); g.quadraticCurveTo(hw + 10, -hh - 6, hw, -hh + 34); g.quadraticCurveTo(hw - 22, 0, hw, hh - 34); g.quadraticCurveTo(hw + 10, hh + 6, hw - 30, hh); g.quadraticCurveTo(0, hh - 22, -hw + 30, hh); g.quadraticCurveTo(-hw - 10, hh + 6, -hw, hh - 34); g.quadraticCurveTo(-hw + 22, 0, -hw, -hh + 34); g.quadraticCurveTo(-hw - 10, -hh - 6, -hw + 30, -hh); g.closePath(); };
  // dantel
  if (o.dantel !== false) { g.save(); g.translate(0, 0); for (let i = 0; i < 28; i++) { const a = i / 28 * TAU; el(g, Math.cos(a) * (hw + 6), Math.sin(a) * (hh + 6), 16, 12); dol(g, '#f6efe2'); } g.restore(); }
  yol(); g.fillStyle = rg(g, -hw * .2, -hh * .3, 10, Math.max(hw, hh) * 1.2, [[0, o.renk || '#fffdf8'], [1, o.golge || '#e6dccb']]); g.fill(); cizgi(g, 5);
  g.save(); yol(); g.clip();
  if (o.yumru) { el(g, o.yumru[0], o.yumru[1], 70, 50); g.fillStyle = rg(g, o.yumru[0] - 10, o.yumru[1] - 14, 4, 80, [[0, 'rgba(255,255,255,.9)'], [.6, 'rgba(255,255,255,0)'], [1, 'rgba(150,130,110,.35)']]); g.fill(); }
  // gül nakışı
  const gx = o.gulX ?? hw - 80, gy = o.gulY ?? hh - 70;
  g.save(); g.translate(gx, gy);
  for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; el(g, Math.cos(a) * 14, Math.sin(a) * 14, 16, 13, a); dol(g, '#b3262e'); cizgi(g, 2.2, '#6d1218'); }
  el(g, 0, 0, 10, 10); dol(g, '#d33a40'); g.beginPath(); g.arc(0, 0, 6, 0, 4.5); cizgi(g, 2, '#6d1218');
  for (const s of [-1, 1]) { el(g, s * 30, 18, 15, 7, s * .5); dol(g, '#5e7d4a'); cizgi(g, 2, '#2f4423'); }
  g.restore();
  // dikiş izleri (çerçeve)
  g.setLineDash([10, 8]); g.beginPath(); g.roundRect(-hw + 26, -hh + 26, w - 52, h - 52, 30); cizgi(g, 2.4, 'rgba(180,150,120,.6)'); g.setLineDash([]);
  if (o.dikis) { // kırmızı iplikle sonradan dikilmiş yan dikiş
    const dx = o.dikis.x, y0 = o.dikis.y0, y1 = o.dikis.y1;
    g.beginPath(); g.moveTo(dx, y0); g.lineTo(dx, y1); cizgi(g, 3, 'rgba(120,100,80,.5)');
    for (let yy = y0; yy < y1; yy += 22) { g.beginPath(); g.moveTo(dx - 12, yy); g.lineTo(dx + 12, yy + 11); g.moveTo(dx + 12, yy + 11); g.lineTo(dx - 12, yy + 22); cizgi(g, 4.5, '#b01f28'); }
  }
  if (o.saclar) for (let i = 0; i < o.saclar; i++) {
    const sx = (hash(i * 3 + 1) - .5) * w * .85, sy = (hash(i * 7 + 2) - .5) * h * .8;
    sacTeli(g, sx, sy, 60 + hash(i + 11) * 160, hash(i + 4) * TAU, (hash(i + 8) - .5) * 2.2, i % 4 ? (o.sacRenk || '#8d5837') : (o.sacRenk2 || '#6d3f25'), 3.4);
  }
  g.restore();
  g.restore();
}
function orgu(g, x, y, s, cikis, t) { // dikişten çıkan saç örgüsü
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(-.35 + Math.sin(t * 3) * .03);
  const n = Math.floor(2 + cikis * 6);
  for (let i = 0; i < n; i++) {
    const yy = -i * 26;
    el(g, (i % 2 ? 8 : -8), yy, 20, 16, i % 2 ? .5 : -.5); dol(g, i % 2 ? '#8d5837' : '#7a4a2d'); cizgi(g, 3);
    if (i % 2) { g.beginPath(); g.moveTo(-18, yy - 6); g.lineTo(18, yy + 4); cizgi(g, 4, '#b01f28'); }
  }
  for (let i = 0; i < 5; i++) sacTeli(g, -4 + i * 3, -n * 26 + 10, 40 + i * 6, -Math.PI / 2 + (i - 2) * .18, .4, '#8d5837', 2.4);
  g.restore();
}
function tava(g, x, y, s, t) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, 170, -14, 200, 28, 14); dol(g, '#2a2626'); cizgi(g, 4, '#0d0b0b');
  el(g, 0, 0, 190, 70); dol(g, '#3a3434'); cizgi(g, 5, '#0d0b0b');
  el(g, 0, -4, 166, 56); dol(g, '#c8452e');
  for (let i = 0; i < 9; i++) { el(g, -120 + hash(i) * 240, -20 + hash(i + 4) * 30, 18, 10); dol(g, '#e0602f'); }
  for (let i = 0; i < 4; i++) { const ex = -90 + i * 60, ey = -6 + (i % 2) * 10; el(g, ex, ey, 34, 20); dol(g, '#fbf4e4'); el(g, ex + 4, ey - 2, 13, 10); dol(g, '#f2b632'); }
  for (let i = 0; i < 7; i++) { el(g, -110 + hash(i + 20) * 220, -24 + hash(i + 30) * 36, 9, 5, hash(i)); dol(g, '#5f9a3a'); }
  // buhar
  g.globalAlpha = .45;
  for (let i = 0; i < 4; i++) { const ph = (t * .35 + i * .25) % 1; g.save(); g.globalAlpha = .4 * Math.sin(ph * Math.PI); g.beginPath(); const bx = -80 + i * 55; g.moveTo(bx, -40); g.bezierCurveTo(bx - 30, -100 - ph * 120, bx + 30, -150 - ph * 140, bx + gurultu(t + i, i) * 20, -220 - ph * 200); cizgi(g, 10, '#ffffff'); g.restore(); }
  g.restore();
}
function spatula(g) { rr(g, -6, -150, 12, 160, 6); dol(g, '#b8895a'); cizgi(g, 3); rr(g, -22, -200, 44, 60, 10); dol(g, '#c99c6a'); cizgi(g, 3); }
function anahtar(g) { el(g, 0, -40, 18, 18); g.lineWidth = 8; g.strokeStyle = '#d8b84a'; g.stroke(); rr(g, -4, -24, 8, 60, 3); dol(g, '#d8b84a'); rr(g, 0, 20, 14, 6, 2); dol(g, '#d8b84a'); rr(g, 0, 30, 10, 6, 2); dol(g, '#d8b84a'); }
function tarakFirca(g, sacli) {
  rr(g, -12, 0, 24, 150, 10); dol(g, '#7a4a2e'); cizgi(g, 3.5);
  el(g, 0, -40, 50, 64); dol(g, '#8e5a37'); cizgi(g, 4);
  el(g, 0, -40, 40, 54); dol(g, '#2a201c');
  for (let i = 0; i < 18; i++) { el(g, -24 + (i % 4) * 16 + (Math.floor(i / 4) % 2) * 8, -80 + Math.floor(i / 4) * 18, 3, 3); dol(g, '#d8cfc4'); }
  if (sacli) for (let i = 0; i < 14; i++) sacTeli(g, -30 + hash(i) * 60, -80 + hash(i + 2) * 80, 60 + hash(i + 3) * 100, Math.PI / 2 + (hash(i + 5) - .5) * 1.4, (hash(i + 6) - .5) * 2, '#8d5837', 3);
}
function makas(g, x, y, s, acik) {
  g.save(); g.translate(x, y); g.scale(s, s);
  for (const yon of [-1, 1]) {
    g.save(); g.rotate(yon * acik * .35);
    g.beginPath(); g.moveTo(0, 0); g.lineTo(yon * 10, -220); g.lineTo(yon * -6, -220); g.lineTo(yon * -12, 0); g.closePath(); g.fillStyle = dg(g, -20, 0, 20, 0, [[0, '#9aa3ab'], [.5, '#e8eef3'], [1, '#8a939b']]); g.fill(); cizgi(g, 3.5, '#2a2f35');
    el(g, yon * 34, 60, 30, 40); g.lineWidth = 16; g.strokeStyle = '#1f1f24'; g.stroke(); g.lineWidth = 10; g.strokeStyle = '#b3262e'; g.stroke();
    g.restore();
  }
  el(g, 0, 0, 7, 7); dol(g, '#555'); cizgi(g, 2);
  g.restore();
}
function dijitalSaat(g, x, y, s, yazi, gece) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -90, -46, 180, 92, 18); dol(g, '#2a2324'); cizgi(g, 4, '#0e0a0a');
  rr(g, -74, -32, 148, 64, 10); dol(g, '#120c0c');
  g.font = 'bold 50px "DejaVu Sans Mono", monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
  if (gece) { g.shadowColor = 'rgba(255,40,40,.9)'; g.shadowBlur = 18; }
  g.fillStyle = '#ff3b30'; g.fillText(yazi, 0, 2); g.shadowBlur = 0;
  g.restore();
  if (gece) isikHalesi(g, x, y, 160 * s, '255,40,30', .25);
}

// ───────────── 2. BÖLÜM AKSESUARLARI ─────────────
function elMitt(g, x, y, s, aci, ten = TEN.nazli, ayna = 1) { // tek başına el (eldiven gibi)
  g.save(); g.translate(x, y); g.rotate(aci); g.scale(s * ayna, s);
  el(g, 0, 0, 23, 27); dol(g, ten[0]); cizgi(g);
  g.beginPath(); g.ellipse(17, -8, 9, 13, -.5, 0, TAU); dol(g, ten[0]); cizgi(g, 3.5);
  el(g, 0, 2, 16, 19); dol(g, ten[0]); g.globalAlpha = .25; el(g, -5, 8, 12, 14); dol(g, ten[1]);
  g.restore();
}
function telefon(g, x, y, s, aci, ekran = '#3d5a7a', yazi) {
  g.save(); g.translate(x, y); g.rotate(aci); g.scale(s, s);
  rr(g, -30, -60, 60, 120, 13); dol(g, '#24272e'); cizgi(g, 4, '#0d0e10');
  rr(g, -24, -52, 48, 100, 8); g.fillStyle = ekran; g.fill();
  if (yazi) { g.fillStyle = '#e9eef5'; g.font = '700 9px "DejaVu Sans"'; g.textAlign = 'center'; yazi.split('\n').forEach((s, i) => g.fillText(s, 0, -8 + i * 12)); }
  g.restore();
}
function muskaCiz(g, x, y, s, aci = 0, o = {}) { // üçgen bez muska, kırmızı iplikle sarılı
  g.save(); g.translate(x, y); g.rotate(aci); g.scale(s, s);
  if (o.ip !== false) { g.beginPath(); g.moveTo(0, -70); g.bezierCurveTo(-10, -110, 20, -140, 6, -(o.ipUzun || 190)); cizgi(g, 5, '#b01f28'); }
  poly(g, [[0, -70], [66, 50], [-66, 50]]); g.fillStyle = dg(g, 0, -70, 0, 50, [[0, '#efe3c8'], [1, '#c9b48e']]); g.fill(); cizgi(g, 5, '#3a2416');
  poly(g, [[0, -46], [42, 32], [-42, 32]]); g.lineWidth = 2.5; g.setLineDash([6, 5]); g.strokeStyle = '#8a6a44'; g.stroke(); g.setLineDash([]);
  for (const k of [-.35, 0, .35]) { g.beginPath(); g.moveTo(-60 + k * 40, 38 + k * 10); g.lineTo(52 + k * 30, -10 + k * 40); cizgi(g, 5, '#b01f28'); }
  g.restore();
}
function dugumluIp(g, x0, x1, y, n, o = {}) { // kırmızı iplik + n düğüm; o.cozulen düğüm o.cozulme (0-1) kadar çözülür
  const t = o.t || 0, ad = (x1 - x0) / (n + 1);
  g.beginPath(); for (let x = x0; x <= x1; x += 6) { const yy = y + Math.sin(x * .02 + t * .8) * 6; x === x0 ? g.moveTo(x, yy) : g.lineTo(x, yy); }
  g.lineWidth = 9 + LW; g.strokeStyle = '#3a0a0e'; g.stroke(); g.lineWidth = 9; g.strokeStyle = '#b01f28'; g.stroke();
  for (let i = 0; i < n; i++) {
    const x = x0 + ad * (i + 1), yy = y + Math.sin(x * .02 + t * .8) * 6, c = i === o.cozulen ? clamp(o.cozulme || 0) : 0;
    if (o.cozulmus && o.cozulmus.includes(i)) continue;
    if (c >= 1) continue;
    g.save(); g.translate(x, yy); g.scale(1 - c * .8, 1 - c * .6);
    el(g, 0, 0, 17, 14); dol(g, '#9a1820'); cizgi(g, 3.5, '#3a0a0e');
    g.beginPath(); g.moveTo(-12, -6); g.quadraticCurveTo(0, 8, 12, -6); cizgi(g, 3, '#d0434b');
    if (o.sacli) { g.beginPath(); g.moveTo(-6, 10); g.quadraticCurveTo(-14, 30, -4, 44); cizgi(g, 2.2, '#8d5837'); }
    g.restore();
    if (c > 0) isikHalesi(g, x, yy, 120, '255,60,60', .35 * Math.sin(c * Math.PI));
  }
}
function muskaKagit(g, x, y, s, acik = 1, t = 0) { // açılmış muska kâğıdı: tuhaf işaretler + kırmızı "NAZLI"
  g.save(); g.translate(x, y); g.scale(s * lerp(.35, 1, acik), s * lerp(.35, 1, acik)); g.rotate(lerp(.6, -.04, acik));
  rr(g, -300, -380, 600, 760, 10); g.fillStyle = dg(g, 0, -380, 0, 380, [[0, '#efe3c6'], [1, '#d9c59c']]); g.fill(); cizgi(g, 5, '#4a3420');
  g.globalAlpha = .35; g.beginPath(); g.moveTo(-300, 0); g.lineTo(300, 0); g.moveTo(0, -380); g.lineTo(0, 380); g.moveTo(-300, -380); g.lineTo(300, 380); cizgi(g, 3, '#8a6a44'); g.globalAlpha = 1;
  // uydurma işaretler (gerçek bir yazı değil)
  for (let i = 0; i < 9; i++) for (let j = 0; j < 5; j++) {
    const px = -230 + j * 115, py = -320 + i * 52; if (i > 2 && i < 6 && j > 0 && j < 4) continue;
    g.beginPath(); g.moveTo(px - 20, py); g.quadraticCurveTo(px, py - 24 * hash(i * 9 + j), px + 18, py + 4); g.lineTo(px + 4, py + 14); g.arc(px + 4, py + 4, 6 + hash(i + j * 3) * 5, 0, 3); cizgi(g, 3.2, '#3a2416');
  }
  g.beginPath(); g.arc(0, -10, 118, 0, TAU); cizgi(g, 4, '#7a1a1f'); g.beginPath(); g.arc(0, -10, 104, 0, TAU); g.setLineDash([8, 7]); cizgi(g, 3, '#7a1a1f'); g.setLineDash([]);
  g.font = '700 74px "Lora", serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#a3141c'; g.fillText('NAZLI', 0, -8);
  g.restore();
}
function canta(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.beginPath(); g.moveTo(-60, -60); g.quadraticCurveTo(0, -150, 60, -60); cizgi(g, 12, '#5a3524');
  g.beginPath(); g.moveTo(-110, -60); g.lineTo(110, -60); g.lineTo(130, 90); g.quadraticCurveTo(0, 110, -130, 90); g.closePath(); g.fillStyle = dg(g, 0, -60, 0, 100, [[0, '#9c5b3e'], [1, '#7a4430']]); g.fill(); cizgi(g);
  rr(g, -24, -40, 48, 26, 6); dol(g, '#d8b84a'); cizgi(g, 3);
  g.restore();
}
function sarmaTabak(g, x, y, s, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  el(g, 0, 0, 210, 120); dol(g, '#fbfaf6'); cizgi(g, 4.5); el(g, 0, 0, 160, 88); g.lineWidth = 3; g.strokeStyle = '#d8d2c6'; g.stroke();
  g.beginPath(); g.ellipse(0, 0, 200, 112, 0, 0, TAU); g.setLineDash([4, 10]); g.lineWidth = 3; g.strokeStyle = '#3d6ea8'; g.stroke(); g.setLineDash([]);
  const n = o.adet ?? 7;
  for (let i = 0; i < n; i++) { const a = (i / n) * TAU, rx = Math.cos(a) * 80, ry = Math.sin(a) * 40; g.save(); g.translate(rx, ry); g.rotate(a * .3); rr(g, -34, -15, 68, 30, 15); dol(g, i % 2 ? '#6b8a3c' : '#5f7d34'); cizgi(g, 3, '#2f4019'); g.beginPath(); g.moveTo(-20, -6); g.lineTo(20, 6); cizgi(g, 2, '#9cb866'); g.restore(); }
  el(g, 0, 0, 44, 26); dol(g, '#fdfbf2'); cizgi(g, 2.5, '#c9c2b0');
  if (o.sac) { g.beginPath(); g.moveTo(-150, -30); g.bezierCurveTo(-60, -90, 20, 60, 70, -10); g.bezierCurveTo(110, -60, 150, 20, 120, 60); cizgi(g, 3, '#6d3f25'); }
  g.restore();
}
function cayBardagi(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  el(g, 0, 40, 46, 12); dol(g, '#f4f1ea'); cizgi(g, 3);
  g.beginPath(); g.moveTo(-22, -40); g.quadraticCurveTo(-10, 0, -20, 36); g.lineTo(20, 36); g.quadraticCurveTo(10, 0, 22, -40); g.closePath();
  g.fillStyle = dg(g, 0, -40, 0, 36, [[0, 'rgba(200,60,30,.7)'], [1, 'rgba(140,30,10,.9)']]); g.fill(); cizgi(g, 3);
  g.restore();
}

// ───────────── 3. BÖLÜM AKSESUARLARI ─────────────
function corbaKase(g, x, y, s, t = 0, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  if (o.tepsi) { el(g, 0, 40, 260, 70); dol(g, '#c9a24f'); cizgi(g); el(g, 0, 34, 236, 58); dol(g, '#dcb75e'); }
  g.beginPath(); g.moveTo(-150, -10); g.quadraticCurveTo(-140, 110, 0, 120); g.quadraticCurveTo(140, 110, 150, -10); g.closePath(); dol(g, '#f7f3ea'); cizgi(g);
  g.beginPath(); g.moveTo(-150, -10); g.quadraticCurveTo(0, 30, 150, -10); g.lineWidth = 5; g.strokeStyle = '#3d6ea8'; g.stroke();
  el(g, 0, -10, 150, 34); dol(g, '#d9652b'); cizgi(g, 4);
  for (let i = 0; i < 6; i++) { el(g, -90 + hash(i) * 180, -14 + hash(i + 3) * 10, 8, 4); dol(g, '#f0a04a'); }
  el(g, 40, -16, 18, 6); dol(g, '#3d5a2a');
  if (o.sac) { g.beginPath(); g.moveTo(-110, -6); g.bezierCurveTo(-50, -30, 0, 6, 40, -16); g.bezierCurveTo(80, -30, 110, -4, 96, 6); cizgi(g, 2.6, '#6d3f25'); }
  g.globalAlpha = .4; for (let i = 0; i < 3; i++) { const ph = (t * .35 + i / 3) % 1; g.save(); g.globalAlpha = .4 * Math.sin(ph * Math.PI); g.beginPath(); const bx = -60 + i * 60; g.moveTo(bx, -30); g.bezierCurveTo(bx - 30, -90 - ph * 100, bx + 30, -140 - ph * 120, bx + gurultu(t + i, i) * 20, -200 - ph * 160); cizgi(g, 12, '#ffffff'); g.restore(); }
  g.restore();
}
function defter(g, x, y, s, yazi, aci = 0, boyut) {
  g.save(); g.translate(x, y); g.rotate(aci); g.scale(s, s);
  rr(g, -230, -170, 460, 340, 10); dol(g, '#fbf8f0'); cizgi(g);
  g.globalAlpha = .7; for (let yy = -110; yy < 160; yy += 40) { g.beginPath(); g.moveTo(-210, yy); g.lineTo(210, yy); cizgi(g, 2.5, '#b9cde0'); } g.globalAlpha = 1;
  g.beginPath(); g.moveTo(-170, -170); g.lineTo(-170, 170); cizgi(g, 3, '#e3a3a3');
  for (let i = 0; i < 7; i++) { el(g, -230, -140 + i * 46, 10, 10); dol(g, '#7d7d84'); cizgi(g, 2.5); }
  const satir = String(yazi).split('\n'), fb = boyut ?? (satir.length > 1 ? 62 : 82), ara = fb * 1.08, y0 = satir.length > 1 ? -10 - (satir.length - 1) * ara / 2 : -10;
  g.font = `italic 600 ${fb}px "Lora", serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#b01f28';
  satir.forEach((s_, i) => g.fillText(s_, 20, y0 + i * ara));
  const alt = y0 + (satir.length - 1) * ara + 60; g.beginPath(); g.moveTo(-120, alt); g.quadraticCurveTo(20, alt + 16, 160, alt - 6); cizgi(g, 5, '#b01f28');
  g.restore();
}
function kapiZinciri(g, x0, y0, aci, s = 1) { // kasadan sarkan güvenlik zinciri (aci: sallanma)
  g.save(); g.translate(x0, y0); g.scale(s, s);
  rr(g, -16, -30, 32, 60, 6); dol(g, '#b9bec3'); cizgi(g, 3.5);
  g.rotate(aci);
  for (let i = 0; i < 9; i++) { const yy = 20 + i * 22; el(g, 0, yy, i % 2 ? 6 : 10, 12); g.lineWidth = 5; g.strokeStyle = '#2a2d31'; g.stroke(); g.lineWidth = 3; g.strokeStyle = '#c9cdd1'; g.stroke(); }
  el(g, 0, 230, 16, 16); dol(g, '#9aa0a6'); cizgi(g, 3.5);
  g.restore();
}
function muskaKagitArka(g, x, y, s, t = 0, muhurParlak = .8) { // kâğıdın arkası: silik mühür
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(.03);
  rr(g, -300, -380, 600, 760, 10); g.fillStyle = dg(g, 0, -380, 0, 380, [[0, '#e6d8b8'], [1, '#cdb88c']]); g.fill(); cizgi(g, 5, '#4a3420');
  g.globalAlpha = .3; g.beginPath(); g.moveTo(-300, 0); g.lineTo(300, 0); g.moveTo(0, -380); g.lineTo(0, 380); cizgi(g, 3, '#8a6a44'); g.globalAlpha = 1;
  g.globalAlpha = .18; g.font = '700 74px "Lora", serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#a3141c'; g.save(); g.scale(-1, 1); g.fillText('NAZLI', 0, -8); g.restore(); g.globalAlpha = 1;
  g.save(); g.translate(60, 200); g.rotate(-.18); g.globalAlpha = muhurParlak;
  g.beginPath(); g.arc(0, 0, 150, 0, TAU); cizgi(g, 8, '#3c4f7a'); g.beginPath(); g.arc(0, 0, 118, 0, TAU); cizgi(g, 4, '#3c4f7a');
  g.font = '700 30px "Lora", serif'; g.fillStyle = '#3c4f7a'; g.textAlign = 'center'; g.textBaseline = 'middle';
  const ust = 'GÜLİZAR ANA'; for (let i = 0; i < ust.length; i++) { const a = -Math.PI / 2 + (i - (ust.length - 1) / 2) * .2; g.save(); g.rotate(a + Math.PI / 2); g.fillText(ust[i], 0, -134); g.restore(); }
  g.font = '700 30px "Lora", serif'; g.fillText('MEZARLIK SK.', 0, -12); g.font = '700 46px "Lora", serif'; g.fillText('NO: 13', 0, 34);
  for (let i = 0; i < 26; i++) { const lx = (hash(i) - .5) * 280, ly = (hash(i + 9) - .5) * 280; if (Math.abs(ly) < 75 && Math.abs(lx) < 110) continue; el(g, lx, ly, 10 + hash(i + 2) * 18, 6 + hash(i + 4) * 8); dol(g, '#e2d3b0'); }
  g.restore();
  g.restore();
}

// ───────────── 4. BÖLÜM AKSESUARLARI ─────────────
function kristalKase(g, x, y, s, adet = 4, t = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.beginPath(); g.moveTo(-150, -40); g.quadraticCurveTo(-140, 70, 0, 80); g.quadraticCurveTo(140, 70, 150, -40); g.closePath();
  g.fillStyle = 'rgba(210,230,240,.45)'; g.fill(); cizgi(g, 4, '#5a7280');
  for (let i = 0; i < adet; i++) { el(g, -60 + i * 40, 0 - (i % 2) * 10, 46, 18, (i - 1.5) * .15); g.lineWidth = 8; g.strokeStyle = i % 2 ? '#e0b648' : '#f3cf63'; g.stroke(); el(g, -74 + i * 40, -6 - (i % 2) * 10, 8, 3); dol(g, 'rgba(255,250,210,.9)'); }
  el(g, 0, -40, 150, 30); g.lineWidth = 4; g.strokeStyle = '#5a7280'; g.stroke(); g.globalAlpha = .5; el(g, -60, -42, 50, 8); dol(g, '#ffffff'); g.globalAlpha = 1;
  rr(g, -40, 78, 80, 22, 6); dol(g, 'rgba(210,230,240,.6)'); cizgi(g, 3, '#5a7280');
  g.restore();
}
function tekBilezik(g, x, y, s, aci = 0) { g.save(); g.translate(x, y); g.rotate(aci); g.scale(s, s); el(g, 0, 0, 50, 20); g.lineWidth = 10; g.strokeStyle = '#f3cf63'; g.stroke(); el(g, -18, -10, 10, 3); dol(g, 'rgba(255,250,215,.95)'); g.restore(); }
function tavanIpleri(g, t, o = {}) { // Gülizar'ın odası: tavandan sarkan düğümlü kırmızı iplikler
  const n = o.n ?? 34;
  for (let i = 0; i < n; i++) {
    const x = -100 + hash(i * 3 + 1) * (W + 200), uz = 400 + hash(i * 5 + 2) * 900, sw = Math.sin(t * .9 + i) * 10 * (uz / 1300), kal = 3 + hash(i) * 2.5;
    const yak = o.derinlik ? .55 + hash(i + 7) * .45 : 1;
    g.save(); g.globalAlpha = yak;
    g.beginPath(); g.moveTo(x, -PAY); g.quadraticCurveTo(x + sw * .5, uz * .5, x + sw, uz); cizgi(g, kal + 2, '#2a0508'); g.beginPath(); g.moveTo(x, -PAY); g.quadraticCurveTo(x + sw * .5, uz * .5, x + sw, uz); cizgi(g, kal, '#b01f28');
    const dn = 2 + Math.floor(hash(i + 11) * 4);
    for (let k = 1; k <= dn; k++) { const yy = uz * k / (dn + .5), xx = x + sw * (yy / uz); el(g, xx, yy, kal * 2.6, kal * 2.2); dol(g, '#8e1820'); cizgi(g, 2, '#2a0508'); }
    if (hash(i + 21) > .55) { g.save(); g.translate(x + sw, uz + 14); g.rotate(sw * .01); rr(g, -18, 0, 36, 46, 4); dol(g, '#e2d3b0'); cizgi(g, 2.5, '#4a3420'); g.restore(); }
    g.restore();
  }
}

// ───────────── 5. BÖLÜM AKSESUARLARI ─────────────
function dolapPanjur(g, o = {}) { // dolabın içinden bakış: aralıklı tahta kapak çıtaları
  const ara = o.ara ?? 150, kalin = o.kalin ?? 104;
  for (let y = -PAY - 40; y < H + PAY; y += ara) {
    g.beginPath(); g.moveTo(-PAY, y); g.lineTo(W + PAY, y); g.lineTo(W + PAY, y + kalin); g.lineTo(-PAY, y + kalin + 18); g.closePath();
    g.fillStyle = dg(g, 0, y, 0, y + kalin, [[0, '#2a1a12'], [.5, '#3e2818'], [1, '#160d08']]); g.fill();
    g.beginPath(); g.moveTo(-PAY, y + kalin + 18); g.lineTo(W + PAY, y + kalin); cizgi(g, 4, '#0a0604');
  }
  g.fillStyle = '#120a06'; g.fillRect(-PAY, -PAY, 120 + PAY, H + PAY * 2); g.fillRect(W - 120, -PAY, 120 + PAY, H + PAY * 2);
}
function isikSeritleri(g, a = .35, ara = 150) { // dolabın içine sızan ışık çizgileri
  g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = `rgba(255,220,170,${a})`;
  for (let y = -PAY - 40 + 104; y < H + PAY; y += ara) { g.beginPath(); g.moveTo(-PAY, y + 10); g.lineTo(W + PAY, y - 6); g.lineTo(W + PAY, y + 26); g.lineTo(-PAY, y + 44); g.closePath(); g.fill(); }
  g.restore();
}
function dolapDis(g) { // kapalı, panjurlu gardırop
  g.fillStyle = '#c9b2a6'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
  rr(g, 80, -PAY, 920, H + PAY * 2, 10); g.fillStyle = dg(g, 80, 0, 1000, 0, [[0, '#8a5a3a'], [.5, '#9c6a46'], [1, '#7a4c30']]); g.fill(); cizgi(g, 6);
  g.beginPath(); g.moveTo(540, -PAY); g.lineTo(540, H + PAY); cizgi(g, 6);
  for (const x0 of [130, 580]) for (let y = 120; y < 1760; y += 46) { g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + 370, y); g.lineTo(x0 + 370, y + 22); g.lineTo(x0, y + 30); g.closePath(); dol(g, '#6a4228'); cizgi(g, 2.5, '#3a2216'); }
  for (const x of [500, 580]) { rr(g, x - 12, 880, 24, 120, 12); dol(g, '#d8b84a'); cizgi(g, 3.5); }
}
function cekmeceAnahtar(g, x, y, s, alindi = 0) { // açık çekmece + anahtarlık
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -420, -300, 840, 600, 16); dol(g, '#6a4228'); cizgi(g, 6);
  rr(g, -380, -260, 760, 520, 10); dol(g, '#3a2216'); cizgi(g, 4);
  g.save(); g.rotate(.12); rr(g, -300, -200, 300, 200, 6); dol(g, '#efe6d6'); cizgi(g, 3); g.restore();
  g.save(); g.rotate(-.2); rr(g, 60, -160, 200, 260, 6); dol(g, '#d9c4a6'); cizgi(g, 3); g.restore();
  g.save(); g.translate(40 - alindi * 200, 40 - alindi * 400);
  el(g, 0, 0, 46, 46); g.lineWidth = 10; g.strokeStyle = '#c9cdd1'; g.stroke();
  for (const [a, r] of [[.3, 1], [1.2, 1], [2.3, 1]]) { g.save(); g.rotate(a); g.translate(0, 46); anahtar(g); g.restore(); }
  rr(g, -70, -100, 60, 40, 6); dol(g, '#b01f28'); cizgi(g, 3); g.font = '700 20px "Lora", serif'; g.fillStyle = '#fff4e4'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('Ev', -40, -80);
  g.restore();
  rr(g, -440, 280, 880, 80, 10); dol(g, '#8a5a3a'); cizgi(g, 6); rr(g, -60, 300, 120, 30, 15); dol(g, '#d8b84a'); cizgi(g, 3);
  g.restore();
}
function kanepeArkasi(g, x, y, s) { // uyuyan Emre için kanepe minderi
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -520, -260, 1040, 420, 80); dol(g, '#6e2a33'); cizgi(g, 6);
  rr(g, -480, -40, 960, 300, 60); dol(g, '#7d3440'); cizgi(g, 5);
  g.restore();
}

// ───────────── 6. BÖLÜM AKSESUARLARI ─────────────
function sandikCiz(g, x, y, s, acik = 0, t = 0) { // çeyiz sandığı (acik: kapak açıklığı 0-1)
  g.save(); g.translate(x, y); g.scale(s, s);
  const ky = lerp(-60, -420, acik);
  if (acik > .02) { // iç + kızıl ışık
    g.fillStyle = '#1a0806'; g.fillRect(-370, -70, 740, 80);
    isikHalesi(g, 0, -40, 520 * acik, '255,60,40', .6 * acik, t);
  }
  // kapak
  g.beginPath(); g.moveTo(-390, -60); g.lineTo(-360, ky); g.lineTo(360, ky); g.lineTo(390, -60); g.closePath();
  g.fillStyle = dg(g, 0, ky, 0, -60, [[0, '#7a4a2c'], [1, '#5a341e']]); g.fill(); cizgi(g, 7);
  for (const k of [-.55, 0, .55]) { g.beginPath(); g.moveTo(k * 390, -60); g.lineTo(k * 360, ky); cizgi(g, 10, '#c9a24f'); }
  // gövde
  rr(g, -400, -60, 800, 440, 18); g.fillStyle = dg(g, 0, -60, 0, 380, [[0, '#8a5634'], [1, '#5e3820']]); g.fill(); cizgi(g, 7);
  g.globalAlpha = .35; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(-390, 40 + i * 90); g.bezierCurveTo(-100, 30 + i * 90, 100, 60 + i * 90, 390, 40 + i * 90); cizgi(g, 3, '#3a2010'); } g.globalAlpha = 1;
  for (const [cx, cy] of [[-400, -60], [400, -60], [-400, 380], [400, 380]]) { rr(g, cx - 30, cy - 30, 60, 60, 8); dol(g, '#c9a24f'); cizgi(g, 4); }
  for (const k of [-.55, .55]) { rr(g, k * 400 - 14, -60, 28, 440, 4); dol(g, '#b08a3e'); cizgi(g, 3); }
  el(g, 0, 140, 44, 50); dol(g, '#c9a24f'); cizgi(g, 5); rr(g, -12, 135, 24, 44, 6); dol(g, '#2a1408');
  g.restore();
}
function eskiFoto(g, x, y, s, o = {}) { // sepya, gelinlikli kadın fotoğrafı
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(o.aci ?? -.06); g.globalAlpha *= (o.a ?? 1);
  const kag = o.cokEski ? '#d9c39a' : '#e9dcc0', ic = o.cokEski ? '#8a7454' : '#bba98a';
  rr(g, -150, -200, 300, 380, 6); dol(g, kag); cizgi(g, 5, '#3a2416'); rr(g, -128, -178, 256, 300, 4); dol(g, ic);
  el(g, 0, -90, 46, 50); dol(g, o.cokEski ? '#b8a07a' : '#d9c4a6'); el(g, 0, -112, 52, 30); dol(g, o.cokEski ? '#4a3a2a' : '#8a7a66');
  g.beginPath(); g.moveTo(-40, -150); g.quadraticCurveTo(0, -190, 40, -150); g.lineTo(90, 110); g.lineTo(-90, 110); g.closePath(); g.fillStyle = 'rgba(255,255,250,.5)'; g.fill();
  poly(g, [[-60, -40], [60, -40], [96, 110], [-96, 110]]); dol(g, o.cokEski ? '#e6dcc4' : '#f6f1e6');
  if (o.cokEski) { // yırtık köşe ve lekeler
    g.fillStyle = '#2a1408'; poly(g, [[150, -200], [150, -120], [90, -200]]); g.fill();
    for (let i = 0; i < 8; i++) { el(g, (hash(i) - .5) * 240, (hash(i + 3) - .5) * 300, 10 + hash(i + 5) * 16, 6 + hash(i + 7) * 10); g.fillStyle = 'rgba(90,60,30,.35)'; g.fill(); }
  }
  g.font = 'italic 600 30px "Lora", serif'; g.textAlign = 'center'; g.fillStyle = '#5a3a26'; g.fillText(o.yazi || '1984', 0, 158);
  g.restore();
}
function gelinlikKatli(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -220, -140, 440, 280, 30); dol(g, '#f6f1e6'); cizgi(g, 5);
  for (let i = 0; i < 14; i++) { const a = i / 14 * TAU; el(g, Math.cos(a) * 230, Math.sin(a) * 150, 16, 12); dol(g, '#fbf8f0'); }
  g.globalAlpha = .4; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(-180, -80 + i * 40); g.quadraticCurveTo(0, -60 + i * 40, 180, -80 + i * 40); cizgi(g, 3, '#d9cfbd'); } g.globalAlpha = 1;
  el(g, 0, -20, 40, 40); dol(g, '#f0e6d2'); cizgi(g, 3, '#c9b896');
  g.restore();
}
const GENC_HATICE = Object.assign({}, HATICE, { yasli: false, sac: ['#5a3a28', '#3a2418', '#7a5640'], kasRenk: '#3a2418', dudak: '#c4515a', bilezik: false, allik: .55, kolRenk: '#efe8da' });
function seyrekSac(g) { // Hatice'nin dökülen saçları (karakterin enUst katmanında)
  for (const [x, y, rx, ry] of [[-44, -112, 26, 14], [34, -100, 22, 12], [-6, -128, 18, 10], [70, -60, 14, 18]]) { el(g, x, y, rx, ry); dol(g, TEN.hatice[0]); g.globalAlpha = .5; el(g, x + 4, y + 2, rx * .7, ry * .6); dol(g, TEN.hatice[1]); g.globalAlpha = 1; }
  for (let i = 0; i < 5; i++) sacTeli(g, -60 + i * 30, -118 + (i % 2) * 10, 40 + i * 6, -1.2 + i * .5, .6, '#c9c3bd', 2.4);
}
