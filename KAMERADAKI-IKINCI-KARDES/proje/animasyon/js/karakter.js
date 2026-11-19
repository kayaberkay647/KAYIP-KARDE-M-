/* KAMERADAKİ İKİNCİ KARDEŞ — katmanlı 2D karakter rigi
   Katmanlar: arka saç → bacaklar → gövde → boyun → kulak → kafa → yüz (göz, kaş, burun, ağız) → ön saç → kollar/eller/telefon
   Yerel birim: santimetre. Orijin: iki ayağın ortası, zemin. y negatif = yukarı. */
'use strict';
const KONTUR = '#2a201d';

const TASARIM = {
  ARDA: {
    ad: 'ARDA', boy: 180, R: 12.3, cene: 0.85, kafaUzun: 1.05,
    ten: '#ecc49c', tenG: '#cf9f78', tenA: '#f6d8b8', yanak: null,
    sac: '#4a2e1c', sacG: '#2f1c10', sacP: '#7a5236',
    iris: '#6a4124', irisK: '#3a2010', kas: '#35210f', kasKalin: 0.85,
    ust: '#c7ccd2', ustG: '#9fa6b0', ustP: '#dde1e5',
    alt: '#283453', altG: '#1a2238',
    corap: '#4a4f58', corapG: '#363a42',
    ayakY: 7, dizY: 48, kalcaY: 91, belY: 104, omuzY: 145,
    omuz: 20.5, bel: 15.2, kalca: 12.6, gogus: 18.5,
    kolUst: 29, kolAlt: 26, el: 9.2, kolK: 7.4, bilekK: 5.6, uylukK: 15.5, baldirK: 11.5,
    kisaKol: true, oturmaY: 46, boyunK: 0.42, gozW: 0.225, gozH: 0.245, kirpik: 0, gozY: 0.16,
  },
  DEFNE: {
    ad: 'DEFNE', boy: 165, R: 11.9, cene: 0.2, kafaUzun: 1.0,
    ten: '#f7d8c4', tenG: '#e2b29a', tenA: '#fde9dc', yanak: '#f09a96',
    sac: '#b5884b', sacG: '#8c6233', sacP: '#d8b273',
    iris: '#4f8fd0', irisK: '#22508a', kas: '#7a5630', kasKalin: 0.62,
    ust: '#8ec0ec', ustG: '#6b9ccc', ustP: '#b5d6f4',
    alt: '#ebdfc6', altG: '#cbbb9c',
    corap: '#f0eee8', corapG: '#d2cfc7',
    ayakY: 6.5, dizY: 44.5, kalcaY: 82.5, belY: 94, omuzY: 131,
    omuz: 17.2, bel: 12.4, kalca: 14.2, gogus: 15.6,
    kolUst: 26, kolAlt: 23.5, el: 8.2, kolK: 6.2, bilekK: 4.8, uylukK: 15.5, baldirK: 10.6,
    kisaKol: false, oturmaY: 44, boyunK: 0.35, gozW: 0.24, gozH: 0.27, kirpik: 1, gozY: 0.17,
  },
};

const IFADE = {
  notr:     { kasY: 0,    kasCat: 0,    kasUzgun: 0,    gozAc: 1,    gozbebek: 1,    gulus: 0.12 },
  rahat:    { kasY: 0.1,  kasCat: 0,    kasUzgun: 0,    gozAc: 0.94, gozbebek: 1,    gulus: 0.55 },
  merakli:  { kasY: 0.35, kasCat: 0,    kasUzgun: 0.1,  gozAc: 1.06, gozbebek: 1.05, gulus: 0.12 },
  supheli:  { kasY: -0.1, kasCat: 0.65, kasUzgun: 0,    gozAc: 0.9,  gozbebek: 1,    gulus: -0.08 },
  sasirmis: { kasY: 0.85, kasCat: 0,    kasUzgun: 0.15, gozAc: 1.17, gozbebek: 1.05, gulus: 0 },
  ciddi:    { kasY: -0.05,kasCat: 0.5,  kasUzgun: 0,    gozAc: 0.96, gozbebek: 1.05, gulus: -0.15 },
  endiseli: { kasY: 0.25, kasCat: 0.1,  kasUzgun: 0.65, gozAc: 1.06, gozbebek: 1.12, gulus: -0.25 },
  korkmus:  { kasY: 0.55, kasCat: 0.05, kasUzgun: 0.85, gozAc: 1.2,  gozbebek: 1.3,  gulus: -0.35 },
  dehset:   { kasY: 0.95, kasCat: 0,    kasUzgun: 1,    gozAc: 1.32, gozbebek: 1.45, gulus: -0.45 },
  bos:      { kasY: 0.02, kasCat: 0,    kasUzgun: 0,    gozAc: 1.0,  gozbebek: 0.92, gulus: 0.0 },
};
function ifadeKaris(a, b, k) { const A = IFADE[a] || a, B = IFADE[b] || b, o = {}; for (const q in A) o[q] = lerp(A[q], B[q], k); return o; }

// İki kemikli ters kinematik (2B). dis: dirseğin dışa bakacağı yön (+1 sağ / -1 sol)
function ik(sx, sy, tx, ty, a, b, dis) {
  let dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy);
  d = clamp(d, Math.abs(a - b) + 0.5, a + b - 0.3);
  const th = Math.atan2(dy, dx), al = Math.acos(clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1));
  const c1 = [sx + a * Math.cos(th + al), sy + a * Math.sin(th + al)], c2 = [sx + a * Math.cos(th - al), sy + a * Math.sin(th - al)];
  const e = (c1[0] - sx) * dis > (c2[0] - sx) * dis ? c1 : c2;
  const ux = Math.cos(th), uy = Math.sin(th);
  return { dirsek: e, el: [sx + ux * d, sy + uy * d] };
}

/* =========================================================================
   KAFA
   ========================================================================= */
function kafaYolu(T, yaw) {
  const R = T.R, U = T.kafaUzun, c = T.cene, sy = Math.sin(yaw);
  const kay = (x, y) => [x + sy * 0.15 * R * clamp((y / R - 0.15) / 0.85), y];
  const p = new Path2D();
  const pts = [];
  // sağ yarım (front): üst → yanak → çene köşesi → çene ucu
  const jx = lerp(0.62, 0.74, c) * R, jy = lerp(0.84, 0.8, c) * R * U;
  const seq = [
    ['M', 0, -1.04 * R * U],
    ['C', 0.62 * R, -1.05 * R * U, 1.0 * R, -0.72 * R * U, 1.0 * R, -0.1 * R * U],
    ['C', 1.0 * R, lerp(0.38, 0.5, c) * R * U, lerp(0.86, 0.9, c) * R, jy - 0.08 * R, jx, jy],
    ['C', lerp(0.48, 0.55, c) * R, lerp(0.98, 0.98, c) * R * U, 0.22 * R, 1.03 * R * U, 0, 1.03 * R * U],
    ['C', -0.22 * R, 1.03 * R * U, -lerp(0.48, 0.55, c) * R, 0.98 * R * U, -jx, jy],
    ['C', -lerp(0.86, 0.9, c) * R, jy - 0.08 * R, -1.0 * R, lerp(0.38, 0.5, c) * R * U, -1.0 * R, -0.1 * R * U],
    ['C', -1.0 * R, -0.72 * R * U, -0.62 * R, -1.05 * R * U, 0, -1.04 * R * U],
  ];
  for (const s of seq) {
    if (s[0] === 'M') { const q = kay(s[1], s[2]); p.moveTo(q[0], q[1]); }
    else { const a = kay(s[1], s[2]), b = kay(s[3], s[4]), d = kay(s[5], s[6]); p.bezierCurveTo(a[0], a[1], b[0], b[1], d[0], d[1]); }
  }
  p.closePath(); return p;
}

// Saç çizgisi yüksekliği (θ: kafa etrafındaki açı, 0 = ön; + ekranda sağ). Değer R biriminde.
function sacCizgisiArda(th) {
  const a = Math.abs(th), P = -0.5;               // ayrım çizgisi solda
  let y;
  if (a <= 1.02) {
    if (th < P) y = lerp(-0.86, -0.36, Math.pow((P - th) / (1.02 + P), 0.8));
    else y = lerp(-0.86, -0.34, Math.pow((th - P) / (1.02 - P), 0.75)) + 0.075 * Math.abs(Math.sin((th - P) * 7.2)) * (1 - (th - P) / 1.6);
  }
  else if (a < 1.38) y = lerp(-0.34, 0.3, ss((a - 1.02) / 0.36));
  else if (a < 1.62) y = lerp(0.3, 0.18, (a - 1.38) / 0.24);
  else if (a < 2.0) y = lerp(0.18, 0.86, ss((a - 1.62) / 0.38));
  else y = 0.86 + 0.04 * ss((a - 2.0) / (Math.PI - 2.0));
  return y;
}
function sacCizgisiDefne(th) {
  const a = Math.abs(th), P = 0.42;               // ayrım çizgisi sağda
  let y;
  if (a <= 1.0) {
    if (th < P) y = lerp(-0.97, -0.26, Math.pow((P - th) / (1.0 + P), 0.62)) + 0.03 * Math.abs(Math.sin(th * 9));
    else y = lerp(-0.97, -0.4, Math.pow((th - P) / (1.0 - P), 0.55));
  }
  else if (a < 1.2) { const e = th < 0 ? -0.26 : -0.4; y = lerp(e, 2.0, ss((a - 1.0) / 0.2)); }
  else y = 2.0;
  return y;
}
const SAC_DIS = { ARDA: { ust: 1.24, yan: 1.09, alt: 0.3 }, DEFNE: { ust: 1.2, yan: 1.12, alt: 2.0, uc: 1.34 } };

function kafaCiz(ctx, T, d, L) {
  const R = T.R, yaw = d.yaw;
  const cy = Math.cos(yaw), on = cy > -0.05;
  const g = d.isik;
  const nod = d.nod || 0;
  const kafa = kafaYolu(T, yaw);
  const sacR = T.ad === 'ARDA' ? sacCizgisiArda : sacCizgisiDefne;
  // kulaklar (sadece Arda; Defne'nin saçı kulaklarını örter)
  if (T.ad === 'ARDA') for (const tar of [-1, 1]) {
    const a = tar * Math.PI / 2 + yaw, v = Math.cos(a);
    if (v < -0.5) continue;
    const kx = R * 0.97 * Math.sin(a), ky = 0.16 * R + nod * 0.1 * R, sg = Math.sign(kx) || tar;
    const k = new Path2D(); k.ellipse(kx + sg * 0.1 * R, ky, 0.19 * R * (0.6 + 0.4 * Math.abs(Math.sin(a))), 0.29 * R, sg * 0.15, 0, TAU);
    boya(ctx, k, T.ten, { r: T.tenG, dx: g.dx * 0.06 * R, dy: g.dy * 0.06 * R }, KONTUR, L);
    ctx.beginPath(); ctx.arc(kx + sg * 0.1 * R, ky, 0.1 * R, sg > 0 ? -0.8 : Math.PI - 0.9, sg > 0 ? 0.9 : Math.PI + 0.8);
    ctx.strokeStyle = rgba(KONTUR, 0.55); ctx.lineWidth = L * 0.6; ctx.stroke();
  }
  boya(ctx, kafa, T.ten, { r: T.tenG, dx: g.dx * 0.15 * R, dy: g.dy * 0.1 * R }, null, 0);
  if (on) { // saçın alına düşen gölgesi
    ctx.save(); ctx.clip(kafa); ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const th = -Math.PI / 2 + Math.PI * i / 40 - yaw; const x = R * Math.sin(th + yaw), y = (Math.min(sacR(norm(th)), 0.6) + 0.13) * R; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.lineTo(R * 1.2, -R * 1.4); ctx.lineTo(-R * 1.2, -R * 1.4); ctx.closePath();
    ctx.fillStyle = rgba(T.tenG, 0.8); ctx.fill(); ctx.restore();
  }
  if (cy > -0.25) yuzCiz(ctx, T, d, L, kafa);
  ctx.lineWidth = L; ctx.strokeStyle = KONTUR; ctx.lineJoin = 'round'; ctx.stroke(kafa);
  sacCiz(ctx, T, d, L);
}

// Saç: dış siluet (üst kemer + yanlar) ile görünen saç çizgisi arasındaki bölge
function sacCiz(ctx, T, d, L) {
  const R = T.R, yaw = d.yaw, sy = Math.sin(yaw);
  const D = SAC_DIS[T.ad], sacR = T.ad === 'ARDA' ? sacCizgisiArda : sacCizgisiDefne;
  const sal = (d.sacSal || 0) * 0.1 * R;
  const kay = -sy * 0.1 * R;                       // arka hacim dönüşün ters yönüne
  const p = new Path2D();
  const thR = Math.PI / 2 - yaw, thL = -Math.PI / 2 - yaw;
  const yR = sacR(norm(thR)) * R, yL = sacR(norm(thL)) * R;
  if (T.ad === 'ARDA') {
    const sx = D.yan * R;
    p.moveTo(-sx + kay, yL);
    p.bezierCurveTo(-sx * 1.04 + kay, -0.7 * R, -0.66 * R + kay, -D.ust * R - 0.02 * R, -0.12 * R + kay * 0.5, -D.ust * R - 0.04 * R);
    p.bezierCurveTo(0.5 * R + kay * 0.5, -D.ust * R + 0.02 * R, sx * 1.04 + kay, -0.72 * R, sx + kay, yR);
  } else {
    const sx = D.yan * R, ux = D.uc * R;
    p.moveTo(-ux + kay + sal, D.alt * R);
    p.bezierCurveTo(-sx * 1.06 + kay, 1.1 * R, -sx * 1.04 + kay, 0.1 * R, -sx + kay, -0.45 * R);
    p.bezierCurveTo(-sx * 0.98 + kay, -1.0 * R, -0.6 * R + kay, -D.ust * R, 0.05 * R + kay * 0.5, -D.ust * R);
    p.bezierCurveTo(0.65 * R + kay, -D.ust * R, sx * 0.98 + kay, -1.0 * R, sx + kay, -0.45 * R);
    p.bezierCurveTo(sx * 1.04 + kay, 0.1 * R, sx * 1.06 + kay, 1.1 * R, ux + kay + sal, D.alt * R);
    // düz kesim uçlar (sağdan sola, görünür saç çizgisinin sağ ucuna kadar)
    const N = 4; const xr = R * Math.sin(thR + yaw);
    for (let i = 1; i <= N; i++) p.lineTo(lerp(ux + kay + sal, xr + sal, i / N), D.alt * R + (i % 2 ? 0.06 * R : 0));
  }
  const N = 64;
  for (let i = 0; i <= N; i++) {
    const th = thR - Math.PI * i / N;
    const y = sacR(norm(th)) * R;
    p.lineTo(R * 1.0 * Math.sin(th + yaw) + (y > 0.5 * R ? sal * clamp((y / R - 0.5) / 1.5) : 0), y);
  }
  if (T.ad === 'DEFNE') { const xl = -R * D.uc + kay + sal; for (let i = 1; i <= 4; i++) p.lineTo(lerp(R * Math.sin(thL + yaw) + sal, xl, i / 4), D.alt * R + (i % 2 ? 0.06 * R : 0)); }
  p.closePath();
  const g = d.isik;
  boya(ctx, p, T.sac, { r: T.sacG, dx: g.dx * 0.2 * R, dy: g.dy * 0.12 * R }, KONTUR, L);
  // iç detaylar: tel çizgileri ve parlaklık
  ctx.save(); ctx.clip(p);
  const P = T.ad === 'ARDA' ? -0.5 : 0.42;
  const px = R * Math.sin(P + yaw);
  ctx.lineCap = 'round';
  if (Math.cos(P + yaw) > 0) {
    // ayrımdan çıkan teller
    ctx.strokeStyle = rgba(T.sacG, 0.75); ctx.lineWidth = L * 0.55;
    for (let i = -3; i <= 4; i++) {
      if (i === 0) continue;
      const th = P + i * 0.24; if (Math.cos(th + yaw) < 0.05) continue;
      const ex = R * Math.sin(th + yaw), ey = sacR(norm(th)) * R - 0.06 * R;
      const bx = px + (ex - px) * 0.18;
      ctx.beginPath(); ctx.moveTo(bx, -1.0 * R); ctx.quadraticCurveTo(lerp(bx, ex, 0.6), -1.02 * R + (ey + R) * 0.25, ex, Math.min(ey, 0.3 * R)); ctx.stroke();
    }
    ctx.strokeStyle = KONTUR; ctx.lineWidth = L * 0.7;
    ctx.beginPath(); ctx.moveTo(px, sacR(P) * R + 0.02 * R); ctx.lineTo(px + 0.02 * R, -1.04 * R); ctx.stroke();
  } else {
    ctx.strokeStyle = rgba(T.sacG, 0.7); ctx.lineWidth = L * 0.55;
    for (let i = 0; i < 7; i++) { const x = (-0.9 + i * 0.3) * R; ctx.beginPath(); ctx.moveTo(x * 0.4, -1.05 * R); ctx.quadraticCurveTo(x * 1.0, 0.2 * R, x * 1.08 + sal, (T.ad === 'ARDA' ? 0.8 : 1.95) * R); ctx.stroke(); }
  }
  // parlak kemer
  ctx.strokeStyle = rgba(T.sacP, 0.85); ctx.lineWidth = L * 1.2;
  ctx.beginPath(); ctx.ellipse(kay * 0.6 + sy * 0.15 * R, -0.42 * R, R * 0.78, R * 0.5, 0, Math.PI * 1.18, Math.PI * 1.42); ctx.stroke();
  ctx.lineWidth = L * 0.8;
  ctx.beginPath(); ctx.ellipse(kay * 0.6 + sy * 0.15 * R, -0.42 * R, R * 0.78, R * 0.5, 0, Math.PI * 1.5, Math.PI * 1.62); ctx.stroke();
  ctx.restore();
}
function norm(a) { while (a > Math.PI) a -= TAU; while (a < -Math.PI) a += TAU; return a; }

// Defne: ön bakışta boynun arkasında görünen saç (daha koyu)
function arkaSacDefne(ctx, T, d, L) {
  const R = T.R, g = d.isik, sal = (d.sacSal || 0) * 0.1 * R, kay = -Math.sin(d.yaw) * 0.1 * R;
  const p = new Path2D();
  p.moveTo(-R * 1.0 + kay, -0.2 * R);
  p.lineTo(R * 1.0 + kay, -0.2 * R);
  p.bezierCurveTo(R * 1.1 + kay, 0.8 * R, R * 1.2 + sal, 1.5 * R, R * 1.22 + sal, 1.98 * R);
  p.lineTo(-R * 1.22 + sal, 1.98 * R);
  p.bezierCurveTo(-R * 1.2 + sal, 1.5 * R, -R * 1.1 + kay, 0.8 * R, -R * 1.0 + kay, -0.2 * R);
  p.closePath();
  boya(ctx, p, karis(T.sacG, T.sac, 0.25), null, KONTUR, L);
}

function gozCiz(ctx, T, d, L, ex, ey, sx, taraf) {
  const R = T.R, w = T.gozW * R, ac = d.ifade.gozAc;
  let h = T.gozH * R * ac;
  const kir = clamp(d.kirp);
  const ikinci = d.ikinci;
  // göz şekli: üst kapak kemeri, alt kapak daha düz. Dış köşe hafif yukarı
  const ic = -taraf; // iç köşe yönü (burna doğru)
  const iX = ex + ic * w * sx, dX = ex - ic * w * sx;
  const iY = ey + 0.12 * h, dY = ey - 0.02 * h - T.kirpik * 0.08 * h;
  const ustY = ey - h * 1.02, altY = ey + h * 0.82;
  const kapakY = lerp(ustY, altY - 0.1 * h, kir);           // kırpma: üst kapak iner
  const ustYol = (yy) => { ctx.moveTo(iX, iY); ctx.bezierCurveTo(lerp(iX, ex, 0.2), yy, lerp(dX, ex, 0.25), yy - 0.05 * h, dX, dY); };
  const goz = new Path2D();
  goz.moveTo(iX, iY); goz.bezierCurveTo(lerp(iX, ex, 0.2), kapakY, lerp(dX, ex, 0.25), kapakY - 0.05 * h, dX, dY);
  goz.bezierCurveTo(lerp(dX, ex, 0.3), altY, lerp(iX, ex, 0.35), altY, iX, iY); goz.closePath();
  if (kir < 0.93) {
    ctx.save(); ctx.clip(goz);
    ctx.fillStyle = '#fbf7f2'; ctx.fillRect(ex - w * 2, ey - h * 2, w * 4, h * 4);
    // iris
    const ir = w * 0.66, lx = (d.bakX || 0) * w * 0.42 * sx, ly = (d.bakY || 0) * h * 0.32;
    const ix = ex + lx, iy = ey + ly + 0.06 * h;
    const gr = ctx.createLinearGradient(0, iy - ir, 0, iy + ir);
    gr.addColorStop(0, T.irisK); gr.addColorStop(0.55, T.iris); gr.addColorStop(1, karis(T.iris, '#ffffff', 0.18));
    ctx.beginPath(); ctx.ellipse(ix, iy, ir * sx, ir, 0, 0, TAU); ctx.fillStyle = gr; ctx.fill();
    ctx.lineWidth = L * 0.45; ctx.strokeStyle = rgba(T.irisK, 0.9); ctx.stroke();
    const pr = ir * 0.42 * d.ifade.gozbebek;
    ctx.beginPath(); ctx.ellipse(ix, iy, pr * sx, pr, 0, 0, TAU); ctx.fillStyle = '#16100e'; ctx.fill();
    if (!ikinci) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.ellipse(ix - ir * 0.34 * sx, iy - ir * 0.38, ir * 0.27 * sx, ir * 0.27, 0, 0, TAU); ctx.fill();
      ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.ellipse(ix + ir * 0.33 * sx, iy + ir * 0.33, ir * 0.11 * sx, ir * 0.11, 0, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.beginPath(); ctx.ellipse(ix - ir * 0.3 * sx, iy - ir * 0.36, ir * 0.12 * sx, ir * 0.12, 0, 0, TAU); ctx.fill();
    }
    // üst kapak gölgesi
    ctx.beginPath(); ustYol(kapakY + 0.28 * h); ctx.lineTo(dX, ey - h * 3); ctx.lineTo(iX, ey - h * 3); ctx.closePath();
    ctx.fillStyle = 'rgba(70,55,60,0.22)'; ctx.fill();
    ctx.restore();
    // alt kapak
    ctx.beginPath(); ctx.moveTo(lerp(iX, dX, 0.3), lerp(iY, altY, 0.7)); ctx.quadraticCurveTo(lerp(iX, dX, 0.65), altY + 0.05 * h, dX, dY);
    ctx.strokeStyle = rgba(KONTUR, 0.55); ctx.lineWidth = L * 0.55; ctx.stroke();
    // üst kapak (kirpik) çizgisi
    ctx.beginPath(); ctx.moveTo(iX, iY); ctx.bezierCurveTo(lerp(iX, ex, 0.2), kapakY, lerp(dX, ex, 0.25), kapakY - 0.05 * h, dX, dY);
    ctx.strokeStyle = KONTUR; ctx.lineWidth = L * (1.25 + T.kirpik * 0.35); ctx.stroke();
    if (T.kirpik) { // dış köşe kirpik kıvrımı
      ctx.beginPath(); ctx.moveTo(dX, dY); ctx.quadraticCurveTo(dX - ic * 0.15 * w * sx, dY - 0.2 * h, dX - ic * 0.32 * w * sx, dY - 0.34 * h);
      ctx.lineWidth = L * 0.9; ctx.stroke();
    }
    // göz kapağı kıvrımı
    ctx.beginPath(); ctx.moveTo(lerp(iX, ex, 0.25), ustY - 0.28 * h - kir * 0.1 * h); ctx.quadraticCurveTo(ex, ustY - 0.42 * h, lerp(dX, ex, 0.15), ustY - 0.22 * h);
    ctx.strokeStyle = rgba(KONTUR, 0.32); ctx.lineWidth = L * 0.5; ctx.stroke();
  } else {
    // kapalı göz
    ctx.beginPath(); ctx.moveTo(iX, iY); ctx.quadraticCurveTo(ex, altY - 0.25 * h, dX, dY);
    ctx.strokeStyle = KONTUR; ctx.lineWidth = L * 1.15; ctx.stroke();
    if (T.kirpik) { ctx.beginPath(); ctx.moveTo(dX, dY); ctx.lineTo(dX - ic * 0.2 * w * sx, dY + 0.15 * h); ctx.lineWidth = L * 0.8; ctx.stroke(); }
  }
}

function kasCiz(ctx, T, d, L, ex, ey, sx, taraf) {
  const R = T.R, f = d.ifade, w = T.gozW * R;
  const ic = -taraf;
  const baz = ey - T.gozH * R * 1.0 - 0.2 * R - f.kasY * 0.13 * R - (f.gozAc - 1) * 0.12 * R;
  const icX = ex + ic * w * 1.0 * sx - ic * f.kasCat * 0.06 * R * sx, disX = ex - ic * w * 1.15 * sx;
  const icY = baz + f.kasCat * 0.13 * R - f.kasUzgun * 0.16 * R + 0.02 * R;
  const disY = baz + 0.05 * R + f.kasUzgun * 0.05 * R - f.kasCat * 0.03 * R;
  const tepeY = baz - 0.07 * R - f.kasY * 0.03 * R + f.kasUzgun * 0.02 * R;
  const k = T.kasKalin * 0.11 * R;
  const p = new Path2D();
  p.moveTo(icX, icY - k * 0.55);
  p.quadraticCurveTo(lerp(icX, disX, 0.45), tepeY - k * 0.5, disX, disY);
  p.quadraticCurveTo(lerp(icX, disX, 0.5), tepeY + k * 0.65, icX, icY + k * 0.55);
  p.closePath();
  ctx.fillStyle = T.kas; ctx.fill(p);
  ctx.lineWidth = L * 0.35; ctx.strokeStyle = T.kas; ctx.stroke(p);
}

function agizCiz(ctx, T, d, L, mx, my, sx) {
  const R = T.R, f = d.ifade;
  const a = d.agiz || { acik: 0, sekil: 'X' };
  const ac = clamp(a.acik);
  const sek = a.sekil;
  const SH = { A: [1.0, 0.5], E: [1.12, 0.3], I: [0.92, 0.24], O: [0.66, 0.44], U: [0.48, 0.32], C: [0.82, 0.26], S: [0.9, 0.14], F: [0.86, 0.13], M: [0.85, 0.02], X: [0.85, 0.1] };
  const sh = SH[sek] || SH.X;
  const gw = (T.ad === 'ARDA' ? 0.36 : 0.32) * R * sx;
  const w = gw * lerp(1, sh[0], clamp(ac * 1.6)) * (1 + 0.12 * Math.max(0, f.gulus));
  const h = sh[1] * R * ac * 0.95;
  const kose = -f.gulus * 0.09 * R;              // köşeler: gülünce yukarı (negatif)
  if (h < 0.035 * R) {
    // kapalı ağız
    ctx.beginPath(); ctx.moveTo(mx - w * 0.5, my + kose);
    ctx.quadraticCurveTo(mx, my + f.gulus * 0.07 * R + 0.01 * R, mx + w * 0.5, my + kose);
    ctx.strokeStyle = KONTUR; ctx.lineWidth = L * 0.95; ctx.lineCap = 'round'; ctx.stroke();
    if (T.ad === 'DEFNE') { ctx.beginPath(); ctx.moveTo(mx - w * 0.18, my + 0.13 * R); ctx.quadraticCurveTo(mx, my + 0.17 * R, mx + w * 0.18, my + 0.13 * R); ctx.strokeStyle = rgba('#c9837c', 0.6); ctx.lineWidth = L * 0.6; ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(mx - w * 0.16, my + 0.16 * R); ctx.lineTo(mx + w * 0.16, my + 0.16 * R); ctx.strokeStyle = rgba(KONTUR, 0.25); ctx.lineWidth = L * 0.6; ctx.stroke(); }
    return;
  }
  const ust = my - h * 0.18, alt = my + h * 0.82;
  const yuvarlak = (sek === 'O' || sek === 'U') ? 0.55 : 0.15;
  const p = new Path2D();
  p.moveTo(mx - w * 0.5, my + kose * 0.6);
  p.bezierCurveTo(mx - w * 0.38, ust - h * yuvarlak * 0.3, mx + w * 0.38, ust - h * yuvarlak * 0.3, mx + w * 0.5, my + kose * 0.6);
  p.bezierCurveTo(mx + w * (0.48 - yuvarlak * 0.1), alt + h * 0.1, mx - w * (0.48 - yuvarlak * 0.1), alt + h * 0.1, mx - w * 0.5, my + kose * 0.6);
  p.closePath();
  ctx.fillStyle = '#4b1b22'; ctx.fill(p);
  ctx.save(); ctx.clip(p);
  // dil
  ctx.beginPath(); ctx.ellipse(mx, alt + h * 0.12, w * 0.32, h * 0.42, 0, 0, TAU); ctx.fillStyle = '#c56d6b'; ctx.fill();
  // üst dişler
  if (sek !== 'O' && sek !== 'U') { ctx.fillStyle = '#fbf7f0'; ctx.fillRect(mx - w * 0.42, ust - h, w * 0.84, h * (sek === 'S' || sek === 'F' ? 1.55 : 1.24)); }
  ctx.restore();
  ctx.lineWidth = L * 0.9; ctx.strokeStyle = KONTUR; ctx.lineJoin = 'round'; ctx.stroke(p);
  if (T.ad === 'DEFNE') { ctx.beginPath(); ctx.moveTo(mx - w * 0.2, alt + h * 0.22 + 0.06 * R); ctx.quadraticCurveTo(mx, alt + h * 0.3 + 0.08 * R, mx + w * 0.2, alt + h * 0.22 + 0.06 * R); ctx.strokeStyle = rgba('#c9837c', 0.55); ctx.lineWidth = L * 0.55; ctx.stroke(); }
}

function yuzCiz(ctx, T, d, L, kafa) {
  const R = T.R, yaw = d.yaw, nod = d.nod || 0;
  const g = d.isik;
  ctx.save(); ctx.clip(kafa);
  const ny = nod * 0.22 * R;
  // yanaklar (allık)
  if (T.yanak) for (const tar of [-1, 1]) {
    const a = tar * 0.78 + yaw, v = Math.cos(a); if (v < 0.1) continue;
    ctx.save(); ctx.globalAlpha = 0.22 * v; ctx.fillStyle = T.yanak;
    ctx.beginPath(); ctx.ellipse(R * 0.93 * Math.sin(a), 0.5 * R + ny, 0.17 * R * v, 0.1 * R, 0, 0, TAU); ctx.fill(); ctx.restore();
  }
  // gözler + kaşlar
  for (const tar of [-1, 1]) {
    const a = tar * 0.5 + yaw, v = Math.cos(a); if (v < 0.12) continue;
    const sx = Math.pow(v, 0.8);
    const ex = R * 0.98 * Math.sin(a), ey = T.gozY * R + ny;
    gozCiz(ctx, T, d, L, ex, ey, sx, tar);
    kasCiz(ctx, T, d, L, ex, ey, sx, tar);
  }
  // burun
  {
    const v = Math.cos(yaw);
    if (v > 0.05) {
      const nx = R * 1.06 * Math.sin(yaw), nyy = 0.47 * R + ny;
      const yon = Math.abs(yaw) < 0.08 ? -g.dx || 1 : -Math.sign(yaw);
      ctx.beginPath();
      ctx.moveTo(nx + yon * -0.02 * R, nyy - 0.2 * R);
      ctx.quadraticCurveTo(nx - yon * 0.1 * R, nyy + 0.04 * R, nx - yon * 0.01 * R, nyy + 0.07 * R);
      ctx.strokeStyle = rgba(KONTUR, T.ad === 'ARDA' ? 0.75 : 0.55); ctx.lineWidth = L * 0.75; ctx.lineCap = 'round'; ctx.stroke();
      ctx.fillStyle = rgba(T.tenG, 0.7); ctx.beginPath(); ctx.ellipse(nx + 0.02 * R * Math.sign(g.dx || 1), nyy + 0.1 * R, 0.1 * R * v, 0.035 * R, 0, 0, TAU); ctx.fill();
    }
  }
  // ağız
  {
    const v = Math.cos(yaw);
    if (v > 0.1) agizCiz(ctx, T, d, L, R * 0.93 * Math.sin(yaw), 0.71 * R * T.kafaUzun + ny, Math.pow(v, 0.7));
  }
  ctx.restore();
}

/* =========================================================================
   GÖVDE + KOLLAR + BACAKLAR
   d: { x, y, s, zoom, govdeYaw, yaw, egim, nod, otur, yuru, faz, adimX, nefes, eller{sol,sag}, telefon, telPoz,
        telIsik, titresim, ifade, bakX, bakY, kirp, agiz, isik{dx,dy}, ikinci, sacSal, golgeAlfa }
   ========================================================================= */
function elCiz(ctx, T, L, el, ang, tar, tip, telefonVar) {
  const es = T.el;
  ctx.save(); ctx.translate(el[0], el[1]); ctx.rotate(ang - Math.PI / 2);
  if (telefonVar) { // tek elde telefon (ekran içe dönük)
    const p = new Path2D(); p.roundRect(-3.4, 0.2 * es, 6.8, 13.6, 1.2);
    boya(ctx, p, '#2b2f38', null, KONTUR, L);
  }
  const p = new Path2D();
  if (tip === 'yumruk') {
    p.roundRect(-0.46 * es, -0.05 * es, 0.92 * es, 0.85 * es, 0.34 * es);
  } else {
    p.moveTo(-0.4 * es, -0.05 * es);
    p.lineTo(-0.45 * es, 0.52 * es);
    p.quadraticCurveTo(-0.44 * es, 1.02 * es, -0.04 * es, 1.04 * es);
    p.quadraticCurveTo(0.4 * es, 1.02 * es, 0.43 * es, 0.56 * es);
    p.lineTo(0.4 * es, -0.05 * es); p.closePath();
  }
  boya(ctx, p, T.ten, { r: T.tenG, dx: 0.12 * es * tar, dy: 0 }, KONTUR, L);
  ctx.strokeStyle = rgba(KONTUR, 0.55); ctx.lineWidth = L * 0.55; ctx.lineCap = 'round';
  if (tip !== 'yumruk') for (const fx of [-0.15, 0.12]) { ctx.beginPath(); ctx.moveTo(fx * es, 0.68 * es); ctx.lineTo(fx * es + 0.01 * es, 0.95 * es); ctx.stroke(); }
  const th = new Path2D(); th.ellipse(-tar * 0.44 * es, 0.34 * es, 0.15 * es, 0.32 * es, -tar * 0.35, 0, TAU);
  boya(ctx, th, T.ten, { r: T.tenG, dx: 0.05 * es, dy: 0 }, KONTUR, L * 0.85);
  ctx.restore();
}

function karakterCiz(ctx, T, d) {
  const S = d.s * (d.zoom || 1);
  const L = cizgiPx(S) / S;
  const g = d.isik || { dx: 1, dy: 0.4 };
  const by = d.govdeYaw || 0, sb = Math.sin(by), arka = Math.cos(by) < 0;
  const yaw = d.yaw ?? by, kafaArka = Math.cos(yaw) < 0;
  ctx.save();
  ctx.translate(d.x, d.y); ctx.scale(d.s, d.s);
  const ot = clamp(d.otur || 0), yu = clamp(d.yuru || 0), faz = d.faz || 0;
  if (d.golgeAlfa !== 0) {
    ctx.fillStyle = `rgba(20,14,12,${d.golgeAlfa ?? 0.22})`;
    ctx.beginPath(); ctx.ellipse(0, ot > 0.5 ? 7 : 0, T.omuz * 1.3, 4.8, 0, 0, TAU); ctx.fill();
  }
  const nef = d.nefes || 0;
  const bob = -yu * 1.8 * Math.abs(Math.cos(faz));
  const kalcaY = lerp(-T.kalcaY, -T.oturmaY, ot) + bob;
  const govdeBoy = T.kalcaY - T.omuzY;
  const omuzY = kalcaY + govdeBoy - nef * 0.9 + ot * 1.5;
  const belY = kalcaY + (T.kalcaY - T.belY);
  const egim = d.egim || 0;
  const kx = sb * 3.5 + (d.govdeEgim || 0) * 8;
  const kafaCY = omuzY - (T.boy - 1.2 * T.R - T.omuzY) + nef * 0.3;
  const hx = kx * 1.25 + Math.sin(egim) * 4 + (d.kafaX || 0), hy = kafaCY + (d.kafaY || 0);
  const omz = T.omuz;

  // ---- kol çözümü ----
  const kollar = {};
  for (const tar of [-1, 1]) {
    const ad = tar < 0 ? 'sol' : 'sag';
    let e = (d.eller && d.eller[arka ? (ad === 'sol' ? 'sag' : 'sol') : ad]) || { x: tar * (omz + 0.5), y: 61 };
    if (arka && d.eller && d.eller[ad === 'sol' ? 'sag' : 'sol']) e = { ...e, x: -e.x };
    const sx = tar * (omz - 3.2) + kx * 0.5, sy = omuzY + 4.5;
    let tx, ty, kis = e.kisalt ?? 1;
    if (d.telefon === 'iki') {
      const tp = d.telPoz || { x: 0, y: 26, a: 0 };
      tx = kx + tp.x + tar * 4.6; ty = omuzY + tp.y + 3.5; kis = 0.6;
    } else {
      const ph = faz + (tar > 0 ? 0 : Math.PI);
      tx = kx + e.x + yu * 1.2 * Math.sin(ph) * tar; ty = omuzY + e.y - yu * 2.6 * Math.sin(ph);
    }
    const r = ik(sx, sy, tx, ty, T.kolUst, T.kolAlt * kis, tar);
    kollar[ad] = { tar, s: [sx, sy], dirsek: r.dirsek, el: r.el, ang: Math.atan2(r.el[1] - r.dirsek[1], r.el[0] - r.dirsek[0]), tip: e.tip, tel: e.tel, onde: Math.abs(tx - kx) < omz - 3, oneGel: !!e.on };
  }
  const ustKol = (k) => {
    const { s, dirsek } = k;
    if (T.kisaKol) {
      uzuv(ctx, [s, dirsek], T.bilekK * 1.22, T.ten, KONTUR, L, T.tenG);
      const son = [lerp(s[0], dirsek[0], 0.55), lerp(s[1], dirsek[1], 0.55)];
      uzuv(ctx, [s, son], T.kolK * 1.4, T.ust, KONTUR, L, T.ustG);
    } else uzuv(ctx, [s, dirsek], T.kolK * 1.18, T.ust, KONTUR, L, T.ustG);
  };
  const altKol = (k, telTut) => {
    const { dirsek, el, ang, tar } = k;
    if (T.kisaKol) uzuv(ctx, [dirsek, el], T.bilekK * 1.1, T.ten, KONTUR, L, T.tenG);
    else {
      const m = [lerp(dirsek[0], el[0], 0.86), lerp(dirsek[1], el[1], 0.86)];
      uzuv(ctx, [dirsek, m], T.kolK * 1.08, T.ust, KONTUR, L, T.ustG);
      uzuv(ctx, [[lerp(dirsek[0], el[0], 0.78), lerp(dirsek[1], el[1], 0.78)], m], T.kolK * 1.12, T.ustP, KONTUR, L);
    }
    if (!telTut) elCiz(ctx, T, L, el, ang, tar, k.tip, k.tel);
  };

  // ---- bacaklar ----
  const bacak = (tar) => {
    const ph = faz + (tar > 0 ? Math.PI : 0);
    const kald = yu * Math.max(0, Math.sin(ph));
    const adim = (d.adimX || 0) * Math.cos(ph) * yu;
    const hip = [tar * T.kalca * 0.52 + kx * 0.3, kalcaY + 2];
    const diz = [lerp(tar * T.kalca * 0.55 + adim * 0.5, tar * (T.kalca * 0.6 + 1.2), ot), lerp(-T.dizY - kald * 4 + bob * 0.5, kalcaY + 3, ot)];
    const bilek = [lerp(tar * T.kalca * 0.5 + adim, tar * (T.kalca * 0.56 + 0.8), ot), lerp(-T.ayakY - kald * 7, 2, ot)];
    return { hip, diz, bilek, tar, kald };
  };
  const bs = [bacak(-1), bacak(1)];
  const ayakCiz = (b) => {
    const fx = b.bilek[0] + b.tar * 1.2, fy = b.bilek[1] + 0.5, fs = ot > 0.5 ? 1.1 : 1;
    const f = new Path2D();
    if (arka) { f.moveTo(fx - 4.6 * fs, fy); f.quadraticCurveTo(fx - 5 * fs, fy + 5 * fs, fx, fy + 5.3 * fs); f.quadraticCurveTo(fx + 5 * fs, fy + 5 * fs, fx + 4.6 * fs, fy); }
    else { f.moveTo(fx - 5 * fs, fy); f.quadraticCurveTo(fx - 6.2 * fs, fy + 6.5 * fs, fx, fy + 6.9 * fs); f.quadraticCurveTo(fx + 6.2 * fs, fy + 6.5 * fs, fx + 5 * fs, fy); }
    f.closePath();
    boya(ctx, f, T.corap, { r: T.corapG, dx: g.dx * 1.2, dy: -1.5 }, KONTUR, L);
  };
  const ofs = (a, c, w) => { const dx = c[0] - a[0], dy = c[1] - a[1], l = Math.hypot(dx, dy) || 1; return [-dy / l * w, dx / l * w]; };
  const ayakta = (b) => {
    const { hip, diz, bilek } = b;
    const wU = T.uylukK * 0.5, wD = T.baldirK * 0.5;
    const o1 = ofs(hip, diz, wU), o2 = ofs(diz, bilek, wD);
    const p = new Path2D();
    p.moveTo(hip[0] + o1[0], hip[1] + o1[1]); p.lineTo(diz[0] + o1[0] * 0.85, diz[1] + o1[1]);
    p.lineTo(bilek[0] + o2[0] * 1.06, bilek[1] + o2[1]); p.lineTo(bilek[0] - o2[0] * 1.06, bilek[1] - o2[1]);
    p.lineTo(diz[0] - o1[0] * 0.85, diz[1] - o1[1]); p.lineTo(hip[0] - o1[0], hip[1] - o1[1]); p.closePath();
    boya(ctx, p, T.alt, { r: T.altG, dx: g.dx * 2.2, dy: 0 }, KONTUR, L);
    ayakCiz(b);
  };
  const baldirOtur = (b) => {
    const { diz, bilek } = b, wD = T.baldirK * 0.52;
    const p = new Path2D();
    p.moveTo(diz[0] - wD * 1.05, diz[1] + 2); p.lineTo(bilek[0] - wD, bilek[1]); p.lineTo(bilek[0] + wD, bilek[1]); p.lineTo(diz[0] + wD * 1.05, diz[1] + 2); p.closePath();
    boya(ctx, p, T.alt, { r: T.altG, dx: g.dx * 2.2, dy: 0 }, KONTUR, L);
    ayakCiz(b);
  };
  const dizOtur = (b) => {
    const { diz } = b, w = T.uylukK * 0.62;
    const p = new Path2D();
    p.moveTo(diz[0] - w, diz[1] + 6);
    p.bezierCurveTo(diz[0] - w * 1.08, diz[1] - 3, diz[0] - w * 0.6, diz[1] - 7.5, diz[0], diz[1] - 7.5);
    p.bezierCurveTo(diz[0] + w * 0.6, diz[1] - 7.5, diz[0] + w * 1.08, diz[1] - 3, diz[0] + w, diz[1] + 6);
    p.quadraticCurveTo(diz[0], diz[1] + 8.5, diz[0] - w, diz[1] + 6); p.closePath();
    boya(ctx, p, T.alt, { r: T.altG, dx: g.dx * 2.6, dy: 1.2 }, KONTUR, L);
    ctx.save(); ctx.clip(p); ctx.fillStyle = rgba(T.altG, 0.5);
    ctx.beginPath(); ctx.ellipse(diz[0], diz[1] + 8, w * 1.1, 4, 0, 0, TAU); ctx.fill(); ctx.restore();
  };
  const kucak = () => {
    const p = new Path2D(), w = T.kalca + 1.5;
    p.moveTo(-w, kalcaY - 4); p.lineTo(w, kalcaY - 4); p.lineTo(w * 0.95, kalcaY + 6); p.quadraticCurveTo(0, kalcaY + 13, -w * 0.95, kalcaY + 6); p.closePath();
    boya(ctx, p, T.alt, { r: T.altG, dx: g.dx * 3, dy: 0 }, KONTUR, L);
  };

  // ---- gövde yolu ----
  const gW = T.gogus, bW = T.bel;
  const etekY = kalcaY - 3 + (T.ad === 'ARDA' ? 1 : -1) + ot * 1.5;
  const nk = T.R * T.boyunK * 1.08;
  const uzak = 1 - Math.abs(sb) * 0.18;
  const sagO = sb > 0 ? omz * uzak : omz, solO = sb < 0 ? omz * uzak : omz;
  const govde = new Path2D();
  govde.moveTo(-nk + kx, omuzY - 1.2);
  govde.bezierCurveTo(-nk * 0.6 + kx, omuzY - 1, -solO * 0.7, omuzY - 0.5, -solO, omuzY + 3.2);
  govde.bezierCurveTo(-solO - 1.5, omuzY + 9, -gW - 0.5, omuzY + 14, -gW, omuzY + 18);
  govde.bezierCurveTo(-gW + 1, belY - 6, -bW - 0.5, belY - 2, -bW - 0.3, belY);
  govde.bezierCurveTo(-bW - 1, etekY - 6, -T.kalca - 1.5, etekY - 2, -T.kalca - 1.8 - ot, etekY);
  govde.quadraticCurveTo(0, etekY + 2.2, T.kalca + 1.8 + ot, etekY);
  govde.bezierCurveTo(T.kalca + 1.5, etekY - 2, bW + 1, etekY - 6, bW + 0.3, belY);
  govde.bezierCurveTo(bW + 0.5, belY - 2, gW - 1, belY - 6, gW, omuzY + 18);
  govde.bezierCurveTo(gW + 0.5, omuzY + 14, sagO + 1.5, omuzY + 9, sagO, omuzY + 3.2);
  govde.bezierCurveTo(sagO * 0.7, omuzY - 0.5, nk * 0.6 + kx, omuzY - 1, nk + kx, omuzY - 1.2);
  govde.closePath();
  const govdeCiz = () => {
    boya(ctx, govde, T.ust, { r: T.ustG, dx: g.dx * 3.4, dy: g.dy * 1.5 }, KONTUR, L);
    ctx.save(); ctx.clip(govde);
    if (!arka) {
      const yd = T.ad === 'ARDA' ? 4.2 : 5.8;
      ctx.beginPath(); ctx.moveTo(-nk + kx, omuzY - 1.2); ctx.quadraticCurveTo(kx, omuzY + yd, nk + kx, omuzY - 1.2);
      ctx.lineTo(nk + kx + 0.6, omuzY - 2.5); ctx.lineTo(-nk + kx - 0.6, omuzY - 2.5); ctx.closePath();
      ctx.fillStyle = T.ten; ctx.fill(); ctx.fillStyle = rgba(T.tenG, 0.65); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-nk + kx, omuzY - 1.2); ctx.quadraticCurveTo(kx, omuzY + yd, nk + kx, omuzY - 1.2);
      ctx.strokeStyle = KONTUR; ctx.lineWidth = L; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-nk * 1.18 + kx, omuzY - 0.5); ctx.quadraticCurveTo(kx, omuzY + yd + 1.5, nk * 1.18 + kx, omuzY - 0.5);
      ctx.strokeStyle = rgba(KONTUR, 0.32); ctx.lineWidth = L * 0.6; ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(-nk + kx, omuzY - 1.2); ctx.quadraticCurveTo(kx, omuzY + 0.8, nk + kx, omuzY - 1.2);
      ctx.strokeStyle = KONTUR; ctx.lineWidth = L * 0.9; ctx.stroke();
      ctx.strokeStyle = rgba(T.ustG, 0.8); ctx.lineWidth = L * 0.55;
      ctx.beginPath(); ctx.moveTo(-gW + 3, omuzY + 10); ctx.quadraticCurveTo(-4, omuzY + 13, -2, omuzY + 22); ctx.stroke();
    }
    ctx.strokeStyle = rgba(T.ustG, 0.9); ctx.lineWidth = L * 0.55;
    ctx.beginPath(); ctx.moveTo(-bW + 2, belY + 1); ctx.quadraticCurveTo(-bW + 5, belY + 3, -bW + 7, belY + 2.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bW - 2.5, belY - 3); ctx.quadraticCurveTo(bW - 5, belY - 1, bW - 7.5, belY - 1.5); ctx.stroke();
    if (ot > 0.5) { ctx.beginPath(); ctx.moveTo(-bW, etekY - 4); ctx.quadraticCurveTo(0, etekY - 1, bW, etekY - 4); ctx.stroke(); }
    ctx.restore();
  };
  const boyunCiz = () => {
    const bw = T.R * T.boyunK;
    const p = new Path2D(), ust = hy + T.R * 0.6;
    p.moveTo(hx - bw, ust); p.lineTo(kx - bw * 1.05, omuzY + 1); p.lineTo(kx + bw * 1.05, omuzY + 1); p.lineTo(hx + bw, ust); p.closePath();
    boya(ctx, p, T.ten, { r: T.tenG, dx: g.dx * 1.6, dy: 0 }, KONTUR, L);
    ctx.save(); ctx.clip(p); ctx.fillStyle = T.tenG;
    ctx.beginPath(); ctx.ellipse(hx, hy + T.R * 1.02, T.R * 0.66, T.R * 0.36, 0, 0, TAU); ctx.fill(); ctx.restore();
  };
  const kafaCizFn = () => {
    ctx.save(); ctx.translate(hx, hy + T.R); ctx.rotate(egim); ctx.translate(0, -T.R);
    kafaCiz(ctx, T, { ...d, yaw, isik: g }, L);
    ctx.restore();
  };

  // ==== ÇİZİM SIRASI ====
  if (!arka) {
    if (T.ad === 'DEFNE' && !kafaArka) { ctx.save(); ctx.translate(hx, hy + T.R); ctx.rotate(egim); ctx.translate(0, -T.R); arkaSacDefne(ctx, T, { ...d, yaw, isik: g }, L); ctx.restore(); }
    const iki = d.telefon === 'iki';
    const arkada = k => !iki && !k.onde && !k.oneGel;
    for (const k of [kollar.sol, kollar.sag]) { ustKol(k); if (arkada(k)) altKol(k, false); }
    if (ot < 0.5) { kucak(); bs.slice().sort((a, b) => a.kald - b.kald).forEach(ayakta); }
    else bs.forEach(baldirOtur);
    boyunCiz(); govdeCiz();
    if (ot >= 0.5) bs.forEach(dizOtur);
    kafaCizFn();
    for (const k of [kollar.sol, kollar.sag]) if (!arkada(k)) altKol(k, iki);
    if (iki) telefonIkiEl(ctx, T, d, kollar, L);
  } else {
    if (ot < 0.5) { kucak(); bs.slice().sort((a, b) => a.kald - b.kald).forEach(ayakta); } else bs.forEach(baldirOtur);
    for (const k of [kollar.sol, kollar.sag]) if (!k.onde && d.telefon !== 'iki') { ustKol(k); altKol(k, false); }
    boyunCiz(); govdeCiz();
    for (const k of [kollar.sol, kollar.sag]) if (k.onde || d.telefon === 'iki') ustKol(k);
    kafaCizFn();
  }
  ctx.restore();
  return { kafa: [d.x + hx * d.s, d.y + hy * d.s], R: T.R * d.s };
}

// İki elle tutulan telefon: kamera telefonun arkasını görür, ekran ışığı yüze vurur
function telefonIkiEl(ctx, T, d, kollar, L) {
  const pS = kollar.sol.el, pD = kollar.sag.el;
  const px = (pS[0] + pD[0]) / 2, py = (pS[1] + pD[1]) / 2 - 3.5;
  const a = (d.telPoz && d.telPoz.a) || 0;
  const tw = 7.4, th = 15.2;
  ctx.save(); ctx.translate(px, py); ctx.rotate(a);
  if (d.titresim > 0) ctx.translate(Math.sin((d.t || 0) * 95) * 0.45 * d.titresim, Math.cos((d.t || 0) * 83) * 0.2 * d.titresim);
  const p = new Path2D(); p.roundRect(-tw / 2, -th / 2, tw, th, 1.3);
  boya(ctx, p, '#2b2f38', { r: '#1c1f26', dx: 1, dy: 0 }, KONTUR, L);
  ctx.fillStyle = '#3a3f4a'; ctx.beginPath(); ctx.roundRect(-tw / 2 + 0.9, -th / 2 + 0.9, 2.6, 3.8, 0.8); ctx.fill();
  ctx.fillStyle = '#11141a'; ctx.beginPath(); ctx.arc(-tw / 2 + 2.2, -th / 2 + 1.9, 0.7, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(-tw / 2 + 2.2, -th / 2 + 3.7, 0.6, 0, TAU); ctx.fill();
  if (d.titresim > 0) {
    ctx.strokeStyle = rgba('#ffffff', 0.75 * d.titresim); ctx.lineWidth = L * 0.75; ctx.lineCap = 'round';
    for (const tr of [-1, 1]) for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.arc(0, 0, th * 0.6 + i * 2.4, tr > 0 ? -0.42 : Math.PI - 0.42, tr > 0 ? 0.42 : Math.PI + 0.42); ctx.stroke(); }
  }
  if (d.telIsik > 0) { ctx.strokeStyle = rgba('#cfe2ff', 0.5 * d.telIsik); ctx.lineWidth = L * 0.8; ctx.strokeRect(-tw / 2 - 0.35, -th / 2 - 0.35, tw + 0.7, th + 0.7); }
  ctx.restore();
  // eller
  const es = T.el;
  for (const k of [kollar.sol, kollar.sag]) {
    const tar = k.tar, hxp = px + tar * (tw / 2 + 0.2), hyp = py + 3;
    const p = new Path2D();
    p.moveTo(hxp - tar * 0.1 * es, hyp - 0.55 * es);
    p.quadraticCurveTo(hxp + tar * 0.55 * es, hyp - 0.5 * es, hxp + tar * 0.5 * es, hyp + 0.2 * es);
    p.quadraticCurveTo(hxp + tar * 0.45 * es, hyp + 0.75 * es, hxp - tar * 0.05 * es, hyp + 0.7 * es);
    p.quadraticCurveTo(hxp - tar * 0.3 * es, hyp + 0.1 * es, hxp - tar * 0.1 * es, hyp - 0.55 * es); p.closePath();
    boya(ctx, p, T.ten, { r: T.tenG, dx: tar * 0.1 * es, dy: 0.05 * es }, KONTUR, L);
    // telefonun önüne sarılan parmaklar
    ctx.strokeStyle = KONTUR; ctx.lineWidth = L * 0.75; ctx.lineCap = 'round';
    for (let i = 0; i < 3; i++) {
      const fy = hyp - 0.35 * es + i * 0.32 * es;
      const f = new Path2D(); f.roundRect(Math.min(hxp, hxp - tar * 0.32 * es), fy - 0.12 * es, 0.32 * es, 0.26 * es, 0.12 * es);
      boya(ctx, f, T.ten, null, KONTUR, L * 0.7);
    }
  }
  if (d.telIsik > 0) isikTopu(ctx, px, py - 6, 34, '#9fc0ff', 0.13 * d.telIsik);
}
