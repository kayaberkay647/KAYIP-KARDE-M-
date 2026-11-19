/* KAMERADAKİ İKİNCİ KARDEŞ — çekirdek yardımcılar
   Birimler: mekânlar metre, karakterler santimetre. Tuval 1080x1920 (9:16). */
'use strict';
const W = 1080, H = 1920, FPS = 30, SURE = 150, TAU = Math.PI * 2;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const ss = k => k * k * (3 - 2 * k);
const eio = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
const eo = k => 1 - Math.pow(1 - k, 3);
const ei = k => k * k * k;
const sio = k => -(Math.cos(Math.PI * k) - 1) / 2;
function hash(n) { n = Math.sin(n * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n); }
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
// yumuşak 1B gürültü (-1..1)
function gur(t, s = 0) { const i = Math.floor(t), f = t - i, u = f * f * (3 - 2 * f); return lerp(hash(i + s * 57.3) * 2 - 1, hash(i + 1 + s * 57.3) * 2 - 1, u); }
function gur2(t, s = 0) { return gur(t, s) * 0.65 + gur(t * 2.3, s + 9) * 0.35; }

// Anahtar kare: anim(t, [[t0, v0], [t1, v1], ...], easing). v sayı ya da dizi olabilir.
function anim(t, keys, e = sio) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (t <= b[0]) {
      const k = (b[2] || e)(seg(t, a[0], b[0]));
      if (Array.isArray(a[1])) return a[1].map((v, j) => lerp(v, b[1][j], k));
      if (typeof a[1] === 'object') { const o = {}; for (const q in a[1]) o[q] = lerp(a[1][q], b[1][q] ?? a[1][q], k); return o; }
      return lerp(a[1], b[1], k);
    }
  }
  return keys[keys.length - 1][1];
}

// --- renkler ---
function hex2rgb(h) { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgb2hex(c) { return '#' + c.map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join(''); }
function karis(a, b, k) { const A = hex2rgb(a), B = hex2rgb(b); return rgb2hex(A.map((v, i) => lerp(v, B[i], k))); }
function rgba(h, a) { const c = hex2rgb(h); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

// --- tuval yardımcıları ---
function tuval(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function cokgen(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
// Path2D'yi dolgu + cel gölge + kontur ile boyar. golge: {r: renk, dx, dy} (ışığa göre kayma)
function boya(ctx, p, dolgu, golge, kontur, lw) {
  ctx.fillStyle = dolgu; ctx.fill(p);
  if (golge) {
    ctx.save(); ctx.clip(p);
    ctx.fillStyle = golge.r; ctx.fill(p);
    ctx.translate(-golge.dx, -golge.dy); ctx.fillStyle = dolgu; ctx.fill(p);
    ctx.restore();
  }
  if (kontur && lw > 0) { ctx.lineWidth = lw; ctx.strokeStyle = kontur; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(p); }
}
// Konturlu kalın çizgi (uzuvlar için): önce koyu, sonra renkli
function uzuv(ctx, pts, kalin, renk, kontur, lw, golgeRenk) {
  const yolu = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); };
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  yolu(); ctx.strokeStyle = kontur; ctx.lineWidth = kalin + lw * 2; ctx.stroke();
  yolu(); ctx.strokeStyle = renk; ctx.lineWidth = kalin; ctx.stroke();
  if (golgeRenk) {
    ctx.save(); ctx.translate(kalin * 0.22, 0); yolu(); ctx.strokeStyle = golgeRenk; ctx.lineWidth = kalin * 0.42; ctx.globalAlpha = 0.55; ctx.stroke(); ctx.restore();
  }
}
function isikTopu(ctx, x, y, r, renk, a, mod = 'lighter') {
  if (a <= 0 || r <= 0) return;
  ctx.save(); ctx.globalCompositeOperation = mod;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(renk, a)); g.addColorStop(.4, rgba(renk, a * .4)); g.addColorStop(1, rgba(renk, 0));
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
}

/* --- 3B kamera: mekânları perspektifle çizer ---
   Dünya: x sağ, y yukarı, z ileri. yaw=0 → +z'ye bakar. pitch>0 → aşağı bakar. */
class Kam3B {
  constructor(o) { Object.assign(this, { x: 0, y: 1.5, z: 0, yaw: 0, pitch: 0, f: 1000, cx: W / 2, cy: H / 2, yakin: 0.08 }, o); this._h(); }
  _h() { this.cy_ = Math.cos(this.yaw); this.sy_ = Math.sin(this.yaw); this.cp_ = Math.cos(this.pitch); this.sp_ = Math.sin(this.pitch); }
  kamUzay(x, y, z) {
    const dx = x - this.x, dy = y - this.y, dz = z - this.z;
    const xr = dx * this.cy_ - dz * this.sy_, zr = dx * this.sy_ + dz * this.cy_;
    return [xr, dy * this.cp_ + zr * this.sp_, -dy * this.sp_ + zr * this.cp_];
  }
  ekran(c) { return [this.cx + this.f * c[0] / c[2], this.cy - this.f * c[1] / c[2]]; }
  p(x, y, z) { const c = this.kamUzay(x, y, z); return this.ekran(c); }
  derinlik(x, y, z) { return this.kamUzay(x, y, z)[2]; }
  // Karakter/obje yerleşimi: zemindeki nokta → ekran konumu ve px/m ölçeği
  yerles(x, y, z) { const c = this.kamUzay(x, y, z); return { x: this.cx + this.f * c[0] / c[2], y: this.cy - this.f * c[1] / c[2], s: this.f / c[2], d: c[2] }; }
  // Çokgen: yakın düzlemde kırpılır, ekran noktaları döner (görünmüyorsa null)
  cok(pts) {
    let c = pts.map(q => this.kamUzay(q[0], q[1], q[2]));
    const out = [], n = c.length, Z = this.yakin;
    for (let i = 0; i < n; i++) {
      const a = c[i], b = c[(i + 1) % n], ai = a[2] >= Z, bi = b[2] >= Z;
      if (ai) out.push(a);
      if (ai !== bi) { const k = (Z - a[2]) / (b[2] - a[2]); out.push([lerp(a[0], b[0], k), lerp(a[1], b[1], k), Z]); }
    }
    if (out.length < 3) return null;
    return out.map(q => this.ekran(q));
  }
  // Çokgeni çiz (dolgu + isteğe bağlı kontur). Arka yüzleri atmak için: tekYuz=true (saat yönü kontrolü)
  ciz(ctx, pts, dolgu, kontur, lw, tekYuz) {
    const e = this.cok(pts); if (!e) return null;
    if (tekYuz) { let a = 0; for (let i = 0; i < e.length; i++) { const p = e[i], q = e[(i + 1) % e.length]; a += p[0] * q[1] - q[0] * p[1]; } if (a > 0) return null; }
    cokgen(ctx, e);
    if (dolgu) { ctx.fillStyle = dolgu; ctx.fill(); }
    if (kontur) { ctx.strokeStyle = kontur; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.stroke(); }
    return e;
  }
  cizgi(ctx, a, b, renk, lw) {
    const e = this.cok([a, b, b]); if (!e) return;
    ctx.beginPath(); ctx.moveTo(e[0][0], e[0][1]); ctx.lineTo(e[1][0], e[1][1]); ctx.strokeStyle = renk; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.stroke();
  }
  // Kutu: 6 yüz, görünür olanlar çizilir. renk: {on, ust, yan, alt?}
  kutu(ctx, x0, x1, y0, y1, z0, z1, r, kontur, lw) {
    const P = (x, y, z) => [x, y, z];
    const yuzler = [
      [[P(x0, y0, z0), P(x0, y1, z0), P(x1, y1, z0), P(x1, y0, z0)], r.on, [0, 0, -1]],
      [[P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1), P(x0, y0, z1)], r.arka || r.on, [0, 0, 1]],
      [[P(x0, y1, z0), P(x0, y1, z1), P(x1, y1, z1), P(x1, y1, z0)], r.ust, [0, 1, 0]],
      [[P(x0, y0, z1), P(x0, y0, z0), P(x1, y0, z0), P(x1, y0, z1)], r.alt || r.yan, [0, -1, 0]],
      [[P(x0, y0, z1), P(x0, y1, z1), P(x0, y1, z0), P(x0, y0, z0)], r.sol || r.yan, [-1, 0, 0]],
      [[P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)], r.sag || r.yan, [1, 0, 0]],
    ];
    const cxm = (x0 + x1) / 2, cym = (y0 + y1) / 2, czm = (z0 + z1) / 2;
    for (const [pts, renk, n] of yuzler) {
      const fc = [cxm + n[0] * (x1 - x0) / 2, cym + n[1] * (y1 - y0) / 2, czm + n[2] * (z1 - z0) / 2];
      const v = [this.x - fc[0], this.y - fc[1], this.z - fc[2]];
      if (v[0] * n[0] + v[1] * n[1] + v[2] * n[2] <= 0) continue;
      this.ciz(ctx, pts, renk, kontur, lw);
    }
  }
}

// --- 2B kamera (dijital zoom / pan): odak noktası ekranın ortasına gelir ---
function kamera2B(ctx, k) { // k = {x, y, z, r?, ox?, oy?}  (x,y: temel ekran koordinatı)
  const ox = k.ox ?? W / 2, oy = k.oy ?? H / 2;
  ctx.translate(ox, oy); if (k.r) ctx.rotate(k.r); ctx.scale(k.z, k.z); ctx.translate(-k.x, -k.y);
}

// --- film greni dokuları (önceden üretilir) ---
const GREN = [];
function grenHazirla() {
  for (let n = 0; n < 6; n++) {
    const c = tuval(512, 512), g = c.getContext('2d'), d = g.createImageData(512, 512), r = rng(n * 977 + 13);
    for (let i = 0; i < d.data.length; i += 4) { const v = r() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
    g.putImageData(d, 0, 0); GREN.push(c);
  }
}
function gren(ctx, t, a, w = W, h = H, olcek = 1) {
  if (a <= 0) return;
  const c = GREN[Math.floor(t * FPS) % GREN.length];
  ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'overlay';
  const ox = Math.floor(hash(Math.floor(t * FPS)) * 512), oy = Math.floor(hash(Math.floor(t * FPS) + 3) * 512);
  ctx.translate(-ox, -oy); ctx.scale(olcek, olcek);
  for (let x = 0; x < w / olcek + 512; x += 512) for (let y = 0; y < h / olcek + 512; y += 512) ctx.drawImage(c, x, y);
  ctx.restore();
}
function vinyet(ctx, a, renk = '#000', w = W, h = H, ic = 0.42) {
  if (a <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const g = ctx.createRadialGradient(w / 2, h * 0.47, Math.min(w, h) * ic, w / 2, h / 2, Math.hypot(w, h) * 0.55);
  g.addColorStop(0, rgba(renk, 0)); g.addColorStop(1, rgba(renk, a));
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); ctx.restore();
}
// Çizgi kalınlığı: yakınlaştıkça kalınlaşır ama orantısız değil (temiz kontur)
const cizgiPx = s => Math.max(1.1, 1.55 * Math.pow(s, 0.5));
