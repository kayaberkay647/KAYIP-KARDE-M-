// 1dkdua | Hikmetli Kareler — animasyon motoru
// Tüm görüntü kodla çizilir. Her kare yalnızca t (saniye) değerine bağlıdır: aynı t → aynı kare (titreme yok).
'use strict';
const W = 1080, H = 1920, FPS = 30;
let X = null; // etkin 2D bağlam (sahneler buna çizer)

// ───────── Görsel kimlik: renk paleti ─────────
const P = {
  krem: '#F3EAD3', kremK: '#E6D7B4', kagit: '#F4ECD9', murekkep: '#3A2E24', murekkepA: '#6B5A47',
  zeytin: '#6E7B3A', zeytinK: '#4E5A28', zeytinA: '#A3AC72', yaprak: '#8E9C6A', yaprakK: '#64714A',
  toprak: '#A0673F', toprakK: '#6B4429', toprakA: '#C9976A', kiremit: '#B9653F',
  altin: '#D4A84B', altinA: '#EBCB7E', altinK: '#A97F2C',
  gece1: '#0E1B33', gece2: '#1A3155', gece3: '#2C4A73', ay: '#F6ECCD'
};

// ───────── Yardımcılar ─────────
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => (t = clamp(t), t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeS = t => (t = clamp(t), t * t * (3 - 2 * t));
const easeO = t => (t = clamp(t), 1 - Math.pow(1 - t, 3));
const easeI = t => (t = clamp(t), t * t * t);
const sm = (a, b, x) => easeS((x - a) / (b - a));
const TAU = Math.PI * 2;
function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hash(i) { let x = Math.imul((i | 0) ^ 0x9E3779B9, 0x85EBCA6B); x ^= x >>> 13; x = Math.imul(x, 0xC2B2AE35); x ^= x >>> 16; return (x >>> 0) / 4294967296; }
function vnoise(x, seed = 0) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i * 7 + seed * 131), hash((i + 1) * 7 + seed * 131), u) * 2 - 1; }
// yumuşak salınım (rüzgâr, nefes): -1..1 civarı, pürüzsüz
function sal(t, s = 0) { return Math.sin(t * .9 + s) * .55 + Math.sin(t * 1.73 + s * 2.3) * .3 + Math.sin(t * .37 + s * .7) * .35; }
// anahtar kare: [[t, v1, v2...], ...]
function kf(keys, t, fn = ease) {
  if (t <= keys[0][0]) return keys[0].slice(1);
  for (let i = 0; i < keys.length - 1; i++) { const a = keys[i], b = keys[i + 1]; if (t <= b[0]) { const u = fn((t - a[0]) / (b[0] - a[0])); return a.slice(1).map((v, j) => lerp(v, b[j + 1], u)); } }
  return keys[keys.length - 1].slice(1);
}
const _hc = new Map();
function hex(c) { if (Array.isArray(c)) return c; let r = _hc.get(c); if (!r) { const n = parseInt(c.slice(1), 16); r = [n >> 16 & 255, n >> 8 & 255, n & 255]; _hc.set(c, r); } return r; }
function mix(a, b, t) { a = hex(a); b = hex(b); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
function rgb(c, al = 1) { c = hex(c); return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${al})`; }
function koyu(c, k) { return mix(c, '#1E140C', k); }
function acik(c, k) { return mix(c, '#FFF8E8', k); }

// ───────── Yol / şekil yardımcıları ─────────
function egri(pts, kapali = true) { // noktalardan yumuşak eğri (Catmull-Rom → Bezier)
  const n = pts.length; X.beginPath();
  if (!kapali) X.moveTo(pts[0][0], pts[0][1]); else X.moveTo((pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2);
  const m = kapali ? n : n - 1;
  if (kapali) for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; X.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); }
  else {
    for (let i = 0; i < m; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
      X.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
    }
  }
  if (kapali) X.closePath();
}
function cokgen(pts) { X.beginPath(); X.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) X.lineTo(pts[i][0], pts[i][1]); X.closePath(); }
function elips(x, y, rx, ry, rot = 0) { X.beginPath(); X.ellipse(x, y, Math.abs(rx), Math.abs(ry), rot, 0, TAU); }
function daire(x, y, r) { X.beginPath(); X.arc(x, y, Math.abs(r), 0, TAU); }
function doldur(c, al = 1) { X.fillStyle = typeof c === 'string' && c[0] !== '#' ? c : rgb(c, al); X.fill(); }
function cizgi(c, w, al = 1) { X.strokeStyle = rgb(c, al); X.lineWidth = w; X.lineCap = 'round'; X.lineJoin = 'round'; X.stroke(); }
// organik leke (bulut, yaprak kümesi, çalı)
function leke(cx, cy, rx, ry, seed, n = 9, duzensiz = .22, faz = 0) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU, k = 1 + (hash(seed * 31 + i) - .5) * 2 * duzensiz + Math.sin(faz + i * 1.7) * .02;
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  egri(pts, true);
}
function dGrad(x0, y0, x1, y1, duraklar) { const g = X.createLinearGradient(x0, y0, x1, y1); for (const [o, c, a = 1] of duraklar) g.addColorStop(o, rgb(c, a)); return g; }
function rGrad(x, y, r0, r1, duraklar, x1 = x, y1 = y) { const g = X.createRadialGradient(x, y, r0, x1, y1, r1); for (const [o, c, a = 1] of duraklar) g.addColorStop(o, rgb(c, a)); return g; }
function parilti(x, y, r, c, al = 1, mod = 'screen') { // yumuşak ışık halesi
  X.save(); X.globalCompositeOperation = mod; X.fillStyle = rGrad(x, y, 0, r, [[0, c, al], [.35, c, al * .45], [1, c, 0]]); X.fillRect(x - r, y - r, 2 * r, 2 * r); X.restore();
}

// ───────── Kamera ve katmanlar (parallax) ─────────
// kam = {x, y, z}; d = derinlik çarpanı (0 = sonsuz uzak, 1 = ana düzlem, >1 ön plan)
function katman(kam, d, fn) {
  X.save(); const z = 1 + (kam.z - 1) * d;
  X.translate(W / 2 + (kam.sx || 0), H / 2 + (kam.sy || 0)); if (kam.r) X.rotate(kam.r * d);
  X.scale(z, z); X.translate(-kam.x * d, -kam.y * d); fn(); X.restore();
}

// ───────── Kâğıt dokusu, vinyet ─────────
let DOKU = null, VINYET = null;
function dokuHazirla() {
  const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  const r = rng(1907); const im = g.createImageData(W, H); const d = im.data;
  // ince lifli gren + düşük frekanslı lekeler
  const low = new Float32Array(Math.ceil(W / 40 + 2) * Math.ceil(H / 40 + 2)); const lw = Math.ceil(W / 40 + 2);
  for (let i = 0; i < low.length; i++) low[i] = r() - .5;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const gx = x / 40, gy = y / 40, ix = gx | 0, iy = gy | 0, fx = gx - ix, fy = gy - iy;
    const l = lerp(lerp(low[iy * lw + ix], low[iy * lw + ix + 1], fx), lerp(low[(iy + 1) * lw + ix], low[(iy + 1) * lw + ix + 1], fx), fy);
    const v = 128 + (r() - .5) * 26 + l * 22; const i = (y * W + x) * 4; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  // kâğıt lifleri
  for (let i = 0; i < 3800; i++) {
    const x = r() * W, y = r() * H, a = r() * TAU, l = 6 + r() * 26;
    g.strokeStyle = r() < .5 ? 'rgba(255,255,255,.10)' : 'rgba(0,0,0,.08)'; g.lineWidth = .6 + r() * .8;
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a + .4) * l * .5, y + Math.sin(a + .4) * l * .5, x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  DOKU = c;
  const v = document.createElement('canvas'); v.width = W; v.height = H; const vg = v.getContext('2d');
  const gr = vg.createRadialGradient(W / 2, H * .46, H * .22, W / 2, H * .5, H * .78);
  gr.addColorStop(0, 'rgba(70,40,15,0)'); gr.addColorStop(.7, 'rgba(70,40,15,.10)'); gr.addColorStop(1, 'rgba(50,28,10,.42)');
  vg.fillStyle = gr; vg.fillRect(0, 0, W, H); VINYET = v;
}
function sonIslem(gucDoku = 1) {
  X.save();
  X.globalCompositeOperation = 'multiply'; X.drawImage(VINYET, 0, 0);
  X.globalCompositeOperation = 'overlay'; X.globalAlpha = .55 * gucDoku; X.drawImage(DOKU, 0, 0);
  X.restore();
}

// ───────── Tipografi ─────────
const F = {
  ust: (px, w = 600) => `${w} ${px}px "Cinzel"`,
  baslik: (px, w = 700) => `${w} ${px}px "Cormorant Garamond"`,
  baslikI: (px, w = 600) => `italic ${w} ${px}px "Cormorant Garamond"`,
  alt: (px, w = 500) => `${w} ${px}px "EB Garamond"`
};
async function fontlariYukle() {
  const istek = ['600 30px "Cinzel"', '500 30px "Cinzel"', '700 90px "Cormorant Garamond"', '600 90px "Cormorant Garamond"', 'italic 600 50px "Cormorant Garamond"', 'italic 500 50px "Cormorant Garamond"', '500 46px "EB Garamond"', '600 46px "EB Garamond"'];
  await Promise.all(istek.map(f => document.fonts.load(f, 'İıŞşĞğÜüÖöÇçÂâÎîÛû'))); await document.fonts.ready;
}
function aralik(px) { if ('letterSpacing' in X) X.letterSpacing = px + 'px'; }

// Süs: altın ince çizgi + ortada küçük elmas (1dkdua imzası)
function sus(x, y, gen, al, c = P.altin) {
  X.save(); X.globalAlpha = al; X.strokeStyle = rgb(c, .95); X.lineWidth = 2; X.lineCap = 'round';
  X.beginPath(); X.moveTo(x - gen, y); X.lineTo(x - 14, y); X.moveTo(x + 14, y); X.lineTo(x + gen, y); X.stroke();
  X.fillStyle = rgb(c); X.beginPath(); X.moveTo(x, y - 7); X.lineTo(x + 7, y); X.lineTo(x, y + 7); X.lineTo(x - 7, y); X.closePath(); X.fill();
  X.fillStyle = rgb(c, .9); daire(x - gen - 6, y, 2.4); X.fill(); daire(x + gen + 6, y, 2.4); X.fill();
  X.restore();
}

// ───────── Giriş başlığı ─────────
function girisBasligi(t, o) {
  // o = {ust:'HİKMETLİ KARELER', baslik:'İmtihan Sahası', y:380, renk, ustRenk, bitis: 4.4}
  const gir = sm(.25, 1.3, t), cik = 1 - sm(o.bitis - .7, o.bitis, t); if (cik <= 0 || t < .2) return;
  const y = o.y - 14 * easeO((t - .2) / 1.4) - 18 * (1 - cik);
  X.save(); X.textAlign = 'center'; X.textBaseline = 'alphabetic';
  // ust satır
  X.font = F.ust(30, 600); aralik(lerp(16, 9, easeO((t - .25) / 1.4)));
  X.globalAlpha = sm(.25, 1.0, t) * cik; X.fillStyle = rgb(o.ustRenk || P.toprak); X.fillText(o.ust, W / 2, y - 92);
  aralik(0);
  // başlık (hafif bulanıktan netleşir)
  const b = (1 - sm(.4, 1.5, t)) * 6; X.filter = b > .2 ? `blur(${b.toFixed(2)}px)` : 'none';
  X.globalAlpha = sm(.4, 1.4, t) * cik; X.font = F.baslik(104, 700);
  X.shadowColor = 'rgba(255,240,210,.55)'; X.shadowBlur = 24;
  X.fillStyle = rgb(o.renk || P.murekkep); X.fillText(o.baslik, W / 2, y + 12);
  X.filter = 'none'; X.shadowBlur = 0;
  X.restore();
  sus(W / 2, y + 62, 150 * easeO((t - .9) / 1.0), sm(.9, 1.5, t) * cik);
}

// ───────── Altyazı panosu ─────────
// Kenarları yırtık kâğıt gibi tırtıklı krem pano; kelimeler konuşmayla birlikte koyulaşır.
function panoYolu(x, y, w, h, seed) {
  const pts = []; const adim = 9;
  const ek = (u, s) => vnoise(u / 7, s) * 1.6 + vnoise(u / 23, s + 5) * 2.2 + (hash(Math.floor(u / 3) + s * 977) - .5) * 1.1;
  for (let u = 0; u <= w; u += adim) pts.push([x + u, y + ek(u + 1000, seed)]);
  for (let u = 0; u <= h; u += adim) pts.push([x + w + ek(u + 3000, seed + 1), y + u]);
  for (let u = w; u >= 0; u -= adim) pts.push([x + u, y + h + ek(u + 5000, seed + 2)]);
  for (let u = h; u >= 0; u -= adim) pts.push([x + ek(u + 7000, seed + 3), y + u]);
  cokgen(pts);
}
function satirlaraBol(kelimeler, maxW) {
  const satirlar = [[]]; let gen = 0; const bos = X.measureText(' ').width;
  for (const k of kelimeler) {
    const w = X.measureText(k.m).width;
    if (satirlar[satirlar.length - 1].length && gen + bos + w > maxW) { satirlar.push([]); gen = 0; }
    const s = satirlar[satirlar.length - 1]; s.push({ ...k, w }); gen += (s.length > 1 ? bos : 0) + w;
  }
  // iki satırı dengele
  if (satirlar.length === 2 && satirlar[1].length === 1 && satirlar[0].length > 2) satirlar[1].unshift(satirlar[0].pop());
  return satirlar;
}
const ALT = { boyut: 44, satirY: 58, maxW: 780, y: 1520, dolguX: 46, dolguY: 30 };
function panoOlc(satir) {
  X.font = F.alt(ALT.boyut, 500);
  const sat = satirlaraBol(satir.kelimeler, ALT.maxW); const bos = X.measureText(' ').width;
  const gen = Math.max(...sat.map(s => s.reduce((a, k) => a + k.w, 0) + bos * (s.length - 1)));
  return { sat, bos, w: Math.max(gen + ALT.dolguX * 2, 320), h: sat.length * ALT.satirY + ALT.dolguY * 2 - 8 };
}
function altyazi(t, satirlar, opt = {}) {
  const ON = .2, SON = .75;
  let i = -1; for (let k = 0; k < satirlar.length; k++) if (t >= satirlar[k].bas - ON) i = k;
  if (i < 0) return;
  const s = satirlar[i], sonraki = satirlar[i + 1];
  const bitis = sonraki ? Math.min(s.son + SON, sonraki.bas - ON) : s.son + SON;
  if (t > bitis + .3) return;
  const onceki = satirlar[i - 1]; const bitisikOnceki = onceki && (s.bas - ON) - Math.min(onceki.son + SON, s.bas - ON) < .05;
  const bitisikSonraki = sonraki && sonraki.bas - ON - bitis < .05;
  let al = 1, dy = 0;
  if (!bitisikOnceki) { const u = easeO((t - (s.bas - ON)) / .3); al = u; dy = (1 - u) * 14; }
  if (!bitisikSonraki) { const u = clamp((t - bitis) / .3); al *= 1 - u; dy -= u * 6; }
  if (al <= 0) return;
  const m = panoOlc(s);
  let w = m.w, h = m.h;
  if (bitisikOnceki) { const u = easeO((t - (s.bas - ON)) / .24); const mo = panoOlc(onceki); w = lerp(mo.w, m.w, u); h = lerp(mo.h, m.h, u); }
  const y0 = (opt.y || ALT.y) - h / 2 + dy, x0 = W / 2 - w / 2;
  X.save(); X.globalAlpha = al * (opt.al ?? 1);
  // gölge + kâğıt
  X.shadowColor = 'rgba(45,28,12,.32)'; X.shadowBlur = 22; X.shadowOffsetY = 7;
  panoYolu(x0, y0, w, h, 11); X.fillStyle = dGrad(0, y0, 0, y0 + h, [[0, '#F7F0DF'], [1, '#EEE3C9']]); X.fill();
  X.shadowBlur = 0; X.shadowOffsetY = 0;
  // kâğıt dokusu ve ince altın iç çerçeve
  X.save(); panoYolu(x0, y0, w, h, 11); X.clip(); X.globalCompositeOperation = 'multiply'; X.globalAlpha = .55 * al; X.drawImage(DOKU, x0, y0, w, h, x0, y0, w, h); X.restore();
  X.strokeStyle = rgb(P.altin, .55); X.lineWidth = 1.4; X.strokeRect(x0 + 11, y0 + 10, w - 22, h - 20);
  // üst ortada küçük elmas (imza)
  X.fillStyle = rgb(P.altin, .95); X.beginPath(); X.moveTo(W / 2, y0 + 3); X.lineTo(W / 2 + 6, y0 + 10); X.lineTo(W / 2, y0 + 17); X.lineTo(W / 2 - 6, y0 + 10); X.closePath(); X.fill();
  // metin: her satır için kelime kelime
  const yaziAl = bitisikOnceki ? easeO((t - (s.bas - ON)) / .2) : 1;
  X.font = F.alt(ALT.boyut, 500); X.textBaseline = 'middle'; X.textAlign = 'left';
  const ilkY = y0 + h / 2 - (m.sat.length - 1) * ALT.satirY / 2 + 2;
  m.sat.forEach((sat, si) => {
    const sw = sat.reduce((a, k) => a + k.w, 0) + m.bos * (sat.length - 1); let x = W / 2 - sw / 2; const yy = ilkY + si * ALT.satirY;
    for (const k of sat) {
      const u = easeO((t - k.s + .04) / .18); // söylenince koyulaşır
      const yeni = clamp(1 - (t - k.s) / .9);   // yeni söylenen kelime kısa süre zeytin tonunda
      const c = mix(P.murekkep, '#5D6A2C', u * yeni * .85);
      X.globalAlpha = al * yaziAl * (.26 + .74 * u);
      X.fillStyle = rgb(c); X.fillText(k.m, x, yy);
      x += k.w + m.bos;
    }
  });
  X.restore();
}

// ───────── Kapanış yazısı ─────────
// satirlar: [{m, tur:'k'|'b', t}] k = küçük italik krem, b = büyük altın
function kapanisYazisi(t, satirlar, imzaT, imza = '@1dkdua', ustY = 330) {
  X.save(); X.textAlign = 'center'; X.textBaseline = 'alphabetic';
  let y = ustY;
  for (const s of satirlar) {
    const u = easeO((t - s.t) / 1.1); const kucuk = s.tur === 'k';
    y += kucuk ? 62 : 84;
    if (u > 0) {
      X.globalAlpha = u; const dy = (1 - u) * 16;
      if (kucuk) { X.font = F.baslikI(50, 500); X.fillStyle = rgb('#EFE4C8', .92); X.shadowColor = 'rgba(0,0,0,.35)'; X.shadowBlur = 10; X.fillText(s.m, W / 2, y + dy); }
      else {
        X.font = F.baslik(78, 700); const tw = X.measureText(s.m).width;
        X.shadowColor = 'rgba(232,190,100,.45)'; X.shadowBlur = 26;
        X.fillStyle = dGrad(W / 2 - tw / 2, y - 60, W / 2 + tw / 2, y + 8, [[0, '#F3D48A'], [.45, '#E2B456'], [1, '#C8933A']]);
        X.fillText(s.m, W / 2, y + dy);
        X.shadowBlur = 0; X.globalAlpha = u * .5; X.fillStyle = dGrad(0, y - 60, 0, y, [[0, '#FFF3CF', .7], [.5, '#FFF3CF', 0]]); X.fillText(s.m, W / 2, y + dy);
      }
      X.shadowBlur = 0;
    }
    y += kucuk ? 4 : 18;
  }
  const u = easeO((t - imzaT) / 1.2);
  if (u > 0) {
    y += 70; sus(W / 2, y - 34, 120 * u, u, P.altinA);
    X.globalAlpha = u; X.font = F.baslikI(44, 600); aralik(2); X.fillStyle = rgb('#F1DFAF', .95); X.fillText(imza, W / 2 + 1, y + 16); aralik(0);
  }
  X.restore();
}

// ───────── Sahne yöneticisi ─────────
// Hareket bulanıklığı: sahne bulanik(t) > 1 dönerse, yarım kare aralığına yayılan alt kareler ortalanır (180° obtüratör).
let BIRIK = null, BX = null;
function sahneCiz(s, t) {
  const n = s.bulanik ? s.bulanik(t) : 1;
  if (n <= 1) { s.ciz(t, t - s.bas); return; }
  if (!BIRIK) { BIRIK = document.createElement('canvas'); BIRIK.width = W; BIRIK.height = H; BX = BIRIK.getContext('2d'); }
  const hedef = X; const tmp = document.createElement('canvas'); tmp.width = W; tmp.height = H; const tx = tmp.getContext('2d');
  BX.setTransform(1, 0, 0, 1, 0, 0); BX.globalAlpha = 1; BX.clearRect(0, 0, W, H);
  for (let i = 0; i < n; i++) {
    const ti = t + (i / (n - 1) - .5) * (.5 / FPS);
    X = tx; X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.clearRect(0, 0, W, H);
    s.ciz(ti, ti - s.bas);
    BX.globalAlpha = 1 / (i + 1); BX.drawImage(tmp, 0, 0);
  }
  X = hedef; X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.drawImage(BIRIK, 0, 0); X.restore();
}
// SAHNELER: [{ad, bas, son, ciz(t, yerelT)}]. Geçişler: son ile sonraki bas arasında GECIS sn çapraz geçiş.
const GECIS = .6;
let TAMPON = null, TX = null;
function kareCiz(t, SAHNELER, ust) {
  const ana = X;
  // etkin sahneler
  const etkin = [];
  for (const s of SAHNELER) { const a = s.bas - GECIS / 2, b = s.son + GECIS / 2; if (t >= a && t < b) etkin.push(s); }
  if (!etkin.length) etkin.push(t < SAHNELER[0].bas ? SAHNELER[0] : SAHNELER[SAHNELER.length - 1]);
  const ilk = etkin[0]; sahneCiz(ilk, t);
  if (etkin.length > 1) {
    const s2 = etkin[1]; const u = easeS((t - (s2.bas - GECIS / 2)) / GECIS);
    if (!TAMPON) { TAMPON = document.createElement('canvas'); TAMPON.width = W; TAMPON.height = H; TX = TAMPON.getContext('2d'); }
    X = TX; X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.clearRect(0, 0, W, H);
    sahneCiz(s2, t); X = ana; X.save(); X.globalAlpha = u; X.drawImage(TAMPON, 0, 0); X.restore();
  }
  sonIslem();
  if (ust) ust(t);
}
