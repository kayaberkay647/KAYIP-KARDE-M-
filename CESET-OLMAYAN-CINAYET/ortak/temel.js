// Temel yardımcılar
const W = 1080, H = 1920, FPS = 30;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const ease = k => k <= 0 ? 0 : k >= 1 ? 1 : k * k * (3 - 2 * k);
const easeOut = k => 1 - Math.pow(1 - clamp(k, 0, 1), 3);
const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const frac = x => x - Math.floor(x);
const hash = n => frac(Math.sin(n * 127.1 + 311.7) * 43758.5453);
// pürüzsüz gürültü (deterministik)
const gurultu = (x, s = 0) => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i + s * 57), hash(i + 1 + s * 57), u) * 2 - 1; };
// anahtar kare: [[t, v1, v2...], ...] → yumuşak geçişli değerler
function anahtar(t, keys) {
  if (t <= keys[0][0]) return keys[0].slice(1);
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (t < b[0]) { const k = ease((t - a[0]) / (b[0] - a[0])); return a.slice(1).map((v, j) => typeof v === 'number' ? lerp(v, b[j + 1], k) : (k < .5 ? v : b[j + 1])); }
  }
  return keys[keys.length - 1].slice(1);
}
function renk(hex, k) { // k>0 açar, k<0 koyulaştırır
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  if (k > 0) { r += (255 - r) * k; g += (255 - g) * k; b += (255 - b) * k; } else { r *= 1 + k; g *= 1 + k; b *= 1 + k; }
  return `rgb(${r | 0},${g | 0},${b | 0})`;
}
function rgba(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
// yuvarlak dikdörtgen
function yd(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
// İki kemik IK: omuzdan hedefe, dirsek dışa
function ik(sx, sy, tx, ty, l1, l2, yon) {
  let dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy); const m = l1 + l2 - .01;
  if (d > m) { dx *= m / d; dy *= m / d; d = m; }
  const a = Math.atan2(dy, dx), b = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1));
  const ex = sx + Math.cos(a - b * yon) * l1, ey = sy + Math.sin(a - b * yon) * l1;
  return [ex, ey, sx + dx, sy + dy];
}
