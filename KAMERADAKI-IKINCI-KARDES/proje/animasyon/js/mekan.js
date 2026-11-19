/* KAMERADAKİ İKİNCİ KARDEŞ — mekânlar (salon, koridor), güvenlik kamerası görünümü, telefon arayüzü, çocuk çizimi
   Mekân birimi metre. Her mekân 3B kutu olarak tanımlı; tüm çekimler (normal kamera, K1, K2) aynı geometriden çizilir. */
'use strict';
const MK = '#2b211d'; // mekân kontur rengi

// Hikâye saati: video t=0 → 23:17:05
function hikayeSaati(t) { return 23 * 3600 + 17 * 60 + 5 + t; }
function saatYaz(sn, saniyeli = true) {
  sn = Math.floor(sn); const h = Math.floor(sn / 3600) % 24, m = Math.floor(sn / 60) % 60, s = sn % 60;
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + (saniyeli ? ':' + String(s).padStart(2, '0') : '');
}

/* =========================================================================
   SALON   x: -2.4..2.4   y: 0..2.75   z: 0 (TV duvarı) .. 4.6 (pencere duvarı)
   ========================================================================= */
const SAL = { x0: -2.4, x1: 2.4, h: 2.75, z1: 4.6 };
const SR = {
  duvar: '#e4d2b4', duvarK: '#d8c3a1', desen: '#c9b28d', tavan: '#d9c9ab', korniş: '#f2e8d5',
  zemin: '#8b5b3b', zeminK: '#70472d', supurge: '#5b3a26',
  hali: '#7c2a31', haliK: '#5f1c24', haliS: '#c39a62', haliA: '#93393f',
  koltuk: '#34507b', koltukK: '#263e62', koltukA: '#46699a', koltukU: '#3d5d8b',
  ahsap: '#7d5130', ahsapK: '#5d3a20', ahsapA: '#9a6a43',
  perde: '#bba17b', perdeK: '#9a805e', perdeA: '#cfb995',
};

function lwOlc(kz) { return 2.3 / Math.sqrt(kz || 1); }

function desenliDuvar(ctx, K, pts, eksen, sabit, a0, a1, b0, b1, renk, lw, alfa) {
  const e = K.cok(pts); if (!e) return;
  cokgen(ctx, e); ctx.save(); ctx.clip();
  ctx.fillStyle = renk; ctx.globalAlpha = alfa;
  const ad = 0.2;
  for (let a = a0 + ad / 2; a < a1; a += ad) for (let b = b0 + 0.18, i = 0; b < b1 - 0.08; b += 0.22, i++) {
    const aa = a + (i % 2) * ad / 2;
    const P = eksen === 'z' ? [aa, b, sabit] : [sabit, b, aa];
    const c = K.kamUzay(P[0], P[1], P[2]); if (c[2] < 0.2) continue;
    const s = K.f / c[2] * 0.022; const [x, y] = K.ekran(c);
    ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x + s * 0.7, y); ctx.lineTo(x, y + s); ctx.lineTo(x - s * 0.7, y); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

function salonKabuk(ctx, K, t, lw, o = {}) {
  const { x0, x1, h, z1 } = SAL;
  // tavan, zemin, duvarlar
  K.ciz(ctx, [[x0, h, 0], [x0, h, z1], [x1, h, z1], [x1, h, 0]], SR.tavan, MK, lw);
  K.ciz(ctx, [[x0, 0, -1], [x1, 0, -1], [x1, 0, z1], [x0, 0, z1]], SR.zemin, MK, lw);
  // parke çizgileri
  ctx.save(); const ze = K.cok([[x0, 0, -1], [x1, 0, -1], [x1, 0, z1], [x0, 0, z1]]); if (ze) { cokgen(ctx, ze); ctx.clip(); }
  for (let x = x0; x <= x1; x += 0.15) K.cizgi(ctx, [x, 0, -1], [x, 0, z1], SR.zeminK, lw * 0.5);
  for (let z = 0, i = 0; z < z1; z += 0.62, i++) for (let x = x0 + (i % 3) * 0.05; x < x1; x += 0.45) K.cizgi(ctx, [x, 0, z], [x + 0.15, 0, z], SR.zeminK, lw * 0.45);
  ctx.restore();
  K.ciz(ctx, [[x0, 0, 0], [x0, h, 0], [x0, h, z1], [x0, 0, z1]], SR.duvarK, MK, lw);
  K.ciz(ctx, [[x1, 0, z1], [x1, h, z1], [x1, h, 0], [x1, 0, 0]], SR.duvarK, MK, lw);
  K.ciz(ctx, [[x0, 0, z1], [x0, h, z1], [x1, h, z1], [x1, 0, z1]], SR.duvar, MK, lw);
  if (o.tvDuvari) K.ciz(ctx, [[x1, 0, 0], [x1, h, 0], [x0, h, 0], [x0, 0, 0]], SR.duvar, MK, lw);
  desenliDuvar(ctx, K, [[x0, 0, z1], [x0, h, z1], [x1, h, z1], [x1, 0, z1]], 'z', z1, x0, x1, 0.1, h, SR.desen, lw, 0.55);
  desenliDuvar(ctx, K, [[x0, 0, 0], [x0, h, 0], [x0, h, z1], [x0, 0, z1]], 'x', x0, 0, z1, 0.1, h, SR.desen, lw, 0.45);
  desenliDuvar(ctx, K, [[x1, 0, z1], [x1, h, z1], [x1, h, 0], [x1, 0, 0]], 'x', x1, 0, z1, 0.1, h, SR.desen, lw, 0.45);
  // süpürgelik + korniş
  for (const [a, b] of [[[x0, 0, z1], [x1, 0, z1]], [[x0, 0, 0], [x0, 0, z1]], [[x1, 0, 0], [x1, 0, z1]]]) {
    const n = a[0] === b[0] ? [a[0] === x0 ? 0.015 : -0.015, 0, 0] : [0, 0, -0.015];
    K.ciz(ctx, [[a[0] + n[0], 0, a[2] + n[2]], [a[0] + n[0], 0.09, a[2] + n[2]], [b[0] + n[0], 0.09, b[2] + n[2]], [b[0] + n[0], 0, b[2] + n[2]]], SR.supurge, MK, lw * 0.7);
    K.ciz(ctx, [[a[0] + n[0], h - 0.07, a[2] + n[2]], [a[0] + n[0], h, a[2] + n[2]], [b[0] + n[0], h, b[2] + n[2]], [b[0] + n[0], h - 0.07, b[2] + n[2]]], SR.korniş, MK, lw * 0.6);
  }
  pencere(ctx, K, t, lw);
  saatCiz(ctx, K, t, lw);
  // sağ duvarda çerçeveli resim
  K.ciz(ctx, [[x1 - 0.01, 1.32, 3.45], [x1 - 0.01, 1.88, 3.45], [x1 - 0.01, 1.88, 2.7], [x1 - 0.01, 1.32, 2.7]], '#6b4a30', MK, lw);
  K.ciz(ctx, [[x1 - 0.015, 1.38, 3.38], [x1 - 0.015, 1.82, 3.38], [x1 - 0.015, 1.82, 2.77], [x1 - 0.015, 1.38, 2.77]], '#9fb3a4', MK, lw * 0.6);
  K.ciz(ctx, [[x1 - 0.02, 1.38, 3.38], [x1 - 0.02, 1.58, 3.2], [x1 - 0.02, 1.5, 2.95], [x1 - 0.02, 1.62, 2.77], [x1 - 0.02, 1.38, 2.77]], '#6f8c74', null, 0);
  // sol duvarda raf + saksı
  K.kutu(ctx, x0, x0 + 0.22, 1.42, 1.46, 2.2, 3.0, { on: SR.ahsap, ust: SR.ahsapA, yan: SR.ahsapK }, MK, lw * 0.7);
  K.kutu(ctx, x0 + 0.03, x0 + 0.16, 1.46, 1.6, 2.3, 2.45, { on: '#b8674a', ust: '#c97b5c', yan: '#9a5038' }, MK, lw * 0.6);
  K.kutu(ctx, x0 + 0.02, x0 + 0.18, 1.46, 1.68, 2.62, 2.9, { on: '#8a9a6a', ust: '#9aab78', yan: '#6f7d53' }, MK, lw * 0.6);
  // halı
  haliCiz(ctx, K, lw);
  if (o.tvDuvari) tvDuvari(ctx, K, t, lw, o);
}

function haliCiz(ctx, K, lw) {
  const y = 0.006;
  K.ciz(ctx, [[-1.55, y, 1.45], [1.55, y, 1.45], [1.55, y, 4.25], [-1.55, y, 4.25]], SR.hali, MK, lw);
  K.ciz(ctx, [[-1.42, y, 1.58], [1.42, y, 1.58], [1.42, y, 4.12], [-1.42, y, 4.12]], null, SR.haliS, lw * 0.9);
  K.ciz(ctx, [[-1.33, y, 1.67], [1.33, y, 1.67], [1.33, y, 4.03], [-1.33, y, 4.03]], null, SR.haliK, lw * 0.7);
  K.ciz(ctx, [[0, y, 1.95], [0.85, y, 2.85], [0, y, 3.75], [-0.85, y, 2.85]], SR.haliA, SR.haliS, lw * 0.8);
  K.ciz(ctx, [[0, y, 2.35], [0.4, y, 2.85], [0, y, 3.35], [-0.4, y, 2.85]], SR.haliK, SR.haliS, lw * 0.6);
  // saçaklar
  for (let x = -1.5; x <= 1.5; x += 0.06) K.cizgi(ctx, [x, y, 1.45], [x, y, 1.39], SR.haliS, lw * 0.4);
}

function pencere(ctx, K, t, lw) {
  const z = SAL.z1 - 0.005, X0 = 0.55, X1 = 1.95, Y0 = 0.95, Y1 = 2.3;
  K.ciz(ctx, [[X0 - 0.06, Y0 - 0.08, z], [X0 - 0.06, Y1 + 0.06, z], [X1 + 0.06, Y1 + 0.06, z], [X1 + 0.06, Y0 - 0.08, z]], '#f1ece2', MK, lw);
  const cam = [[X0, Y0, z - 0.002], [X0, Y1, z - 0.002], [X1, Y1, z - 0.002], [X1, Y0, z - 0.002]];
  const e = K.cok(cam);
  if (e) {
    cokgen(ctx, e); ctx.save(); ctx.clip();
    const ys = e.map(p => p[1]), xs = e.map(p => p[0]);
    const top = Math.min(...ys), bot = Math.max(...ys), lft = Math.min(...xs), rgt = Math.max(...xs), hh = bot - top, ww = rgt - lft;
    const g = ctx.createLinearGradient(0, top, 0, bot); g.addColorStop(0, '#0c1630'); g.addColorStop(0.7, '#1d2f55'); g.addColorStop(1, '#3a4870');
    ctx.fillStyle = g; ctx.fillRect(lft, top, ww, hh);
    const r = rng(42);
    // uzak binalar
    for (let k = 0; k < 2; k++) {
      ctx.fillStyle = k ? '#0b1120' : '#131c33';
      let x = lft - 10;
      while (x < rgt) {
        const bw = ww * (0.06 + r() * 0.1), bh = hh * (0.18 + r() * (k ? 0.32 : 0.45));
        ctx.fillRect(x, bot - bh * (k ? 0.75 : 1), bw, bh);
        // pencere ışıkları
        for (let wy = bot - bh * (k ? 0.75 : 1) + hh * 0.03; wy < bot - 4; wy += hh * 0.035) for (let wx = x + bw * 0.15; wx < x + bw * 0.85; wx += bw * 0.22) {
          const rr = r();
          if (rr < (k ? 0.32 : 0.18)) {
            const tw = 0.75 + 0.25 * Math.sin(t * (0.3 + rr * 2) + rr * 40);
            ctx.fillStyle = rgba(rr < 0.08 ? '#9fc4ff' : '#ffcf7a', (k ? 0.85 : 0.5) * tw); ctx.fillRect(wx, wy, Math.max(1, bw * 0.08), Math.max(1, hh * 0.012));
            ctx.fillStyle = k ? '#0b1120' : '#131c33';
          }
        }
        x += bw + ww * 0.01;
      }
    }
    // uzak ışık noktaları
    for (let i = 0; i < 26; i++) { const px = lft + r() * ww, py = bot - r() * hh * 0.12; ctx.fillStyle = rgba('#ffd9a0', 0.4 + 0.3 * Math.sin(t * 1.3 + i)); ctx.beginPath(); ctx.arc(px, py, Math.max(0.8, ww * 0.005), 0, TAU); ctx.fill(); }
    // cam yansıması
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath(); ctx.moveTo(lft + ww * 0.15, top); ctx.lineTo(lft + ww * 0.32, top); ctx.lineTo(lft + ww * 0.05, bot); ctx.lineTo(lft - ww * 0.12, bot); ctx.closePath(); ctx.fill();
    ctx.restore();
    cokgen(ctx, e); ctx.strokeStyle = MK; ctx.lineWidth = lw; ctx.stroke();
  }
  // orta kayıt + kol
  const xm = (X0 + X1) / 2;
  K.ciz(ctx, [[xm - 0.035, Y0, z - 0.004], [xm - 0.035, Y1, z - 0.004], [xm + 0.035, Y1, z - 0.004], [xm + 0.035, Y0, z - 0.004]], '#f1ece2', MK, lw * 0.8);
  K.ciz(ctx, [[X0, Y0 - 0.02, z - 0.03], [X0, Y0 + 0.02, z - 0.1], [X1, Y0 + 0.02, z - 0.1], [X1, Y0 - 0.02, z - 0.03]], '#efe8dc', MK, lw * 0.7);
  // perdeler (hafif salınım)
  K.ciz(ctx, [[X0 - 0.4, 2.47, z - 0.08], [X0 - 0.4, 2.51, z - 0.08], [X1 + 0.4, 2.51, z - 0.08], [X1 + 0.4, 2.47, z - 0.08]], '#5d4a3a', MK, lw * 0.7);
  for (const [a, b, fz] of [[X0 - 0.36, X0 + 0.14, 0], [X1 - 0.14, X1 + 0.36, 1]]) {
    const sw = 0.02 * Math.sin(t * 0.45 + fz * 2) + 0.012 * Math.sin(t * 1.1 + fz);
    const pts = [[a, 2.48, z - 0.07], [b, 2.48, z - 0.07], [b + sw * 1.4 + (fz ? -0.03 : 0.03), 0.12, z - 0.09], [a + sw, 0.12, z - 0.09]];
    const e2 = K.ciz(ctx, pts, SR.perde, MK, lw);
    if (e2) {
      ctx.save(); cokgen(ctx, e2); ctx.clip();
      for (let i = 1; i < 5; i++) {
        const k = i / 5, top = K.p(lerp(a, b, k), 2.48, z - 0.07), bot = K.p(lerp(a + sw, b + sw * 1.4, k), 0.12, z - 0.09);
        ctx.strokeStyle = i % 2 ? SR.perdeK : SR.perdeA; ctx.lineWidth = lw * (i % 2 ? 1.6 : 1.1); ctx.globalAlpha = 0.8;
        ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.lineTo(bot[0], bot[1]); ctx.stroke();
      }
      ctx.restore();
    }
  }
}

function saatCiz(ctx, K, t, lw) {
  const c = [-0.55, 2.02, SAL.z1 - 0.02], r = 0.19;
  const m = K.yerles(c[0], c[1], c[2]); const R = r * m.s;
  if (m.d < 0.2) return;
  ctx.save(); ctx.translate(m.x, m.y);
  ctx.fillStyle = '#4b3424'; ctx.beginPath(); ctx.arc(0, 0, R * 1.12, 0, TAU); ctx.fill(); ctx.strokeStyle = MK; ctx.lineWidth = lw; ctx.stroke();
  ctx.fillStyle = '#f6f0e3'; ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = '#3a2c22';
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; ctx.lineWidth = lw * (i % 3 ? 0.6 : 1.1); ctx.beginPath(); ctx.moveTo(Math.sin(a) * R * 0.8, -Math.cos(a) * R * 0.8); ctx.lineTo(Math.sin(a) * R * (i % 3 ? 0.9 : 0.93), -Math.cos(a) * R * (i % 3 ? 0.9 : 0.93)); ctx.stroke(); }
  const sn = hikayeSaati(t), san = Math.floor(sn) % 60, dk = (sn / 60) % 60, sa = (sn / 3600) % 12;
  const el = (a, l, w, renk) => { ctx.strokeStyle = renk; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-Math.sin(a) * R * 0.12, Math.cos(a) * R * 0.12); ctx.lineTo(Math.sin(a) * R * l, -Math.cos(a) * R * l); ctx.stroke(); };
  el(sa / 12 * TAU, 0.5, lw * 1.9, '#2a201a'); el(dk / 60 * TAU, 0.74, lw * 1.3, '#2a201a');
  const sAci = (san + ss(clamp((sn % 1) / 0.12))) / 60 * TAU; el(sAci, 0.82, lw * 0.6, '#a33b2c');
  ctx.fillStyle = '#2a201a'; ctx.beginPath(); ctx.arc(0, 0, R * 0.05, 0, TAU); ctx.fill();
  ctx.restore();
}

// Ayaklı lamba (salonun sol arka köşesi)
const LAMBA = [-1.75, 4.12];
function lambaCiz(ctx, K, t, lw) {
  const [lx, lz] = LAMBA;
  K.ciz(ctx, polyDaire(lx, 0.012, lz, 0.17, 18), '#3b2e26', MK, lw);
  K.cizgi(ctx, [lx, 0.02, lz], [lx, 1.48, lz], '#3b2e26', lw * 3.2);
  K.cizgi(ctx, [lx, 0.02, lz], [lx, 1.48, lz], '#6b5848', lw * 1.6);
  // abajur: kesik koni
  const a = K.p(lx - 0.25, 1.42, lz), b = K.p(lx + 0.25, 1.42, lz), c = K.p(lx + 0.15, 1.76, lz), d = K.p(lx - 0.15, 1.76, lz);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.closePath();
  const g = ctx.createLinearGradient(a[0], 0, b[0], 0); g.addColorStop(0, '#fff2cf'); g.addColorStop(0.6, '#f6dca2'); g.addColorStop(1, '#d9b675');
  ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = MK; ctx.lineWidth = lw; ctx.stroke();
}
function lambaIsigi(ctx, K, t) {
  const [lx, lz] = LAMBA; const m = K.yerles(lx, 1.6, lz); if (m.d < 0.2) return;
  const fl = 1 + 0.015 * Math.sin(t * 7.1) + 0.01 * Math.sin(t * 13.7);
  isikTopu(ctx, m.x, m.y - m.s * 0.1, m.s * 2.2, '#ffc070', 0.22 * fl);
  isikTopu(ctx, m.x, m.y, m.s * 0.55, '#fff0c8', 0.28 * fl);
}
function polyDaire(x, y, z, r, n) { const o = []; for (let i = 0; i < n; i++) { const a = i / n * TAU; o.push([x + Math.cos(a) * r, y, z + Math.sin(a) * r]); } return o; }

// Üçlü koltuk (koyu mavi)
const KOLTUK = { x0: -1.18, x1: 1.18, zOn: 3.2, zArka: 4.05 };
function koltukArka(ctx, K, lw) { // sırt (arka yüz dahil, ikinci Defne'nin önünde kalan kısım)
  const { x0, x1, zOn, zArka } = KOLTUK;
  K.kutu(ctx, x0 + 0.2, x1 - 0.2, 0.42, 0.9, zArka - 0.26, zArka, { on: SR.koltukK, ust: SR.koltukA, yan: SR.koltukK, arka: SR.koltukK }, MK, lw);
}
function koltukOn(ctx, K, lw) {
  const { x0, x1, zOn, zArka } = KOLTUK;
  // sırt minderleri
  for (let i = 0; i < 3; i++) {
    const a = x0 + 0.23 + i * 0.6, b = a + 0.58;
    K.kutu(ctx, a, b, 0.46, 0.86, zArka - 0.42, zArka - 0.26, { on: SR.koltuk, ust: SR.koltukA, yan: SR.koltukK }, MK, lw);
    const p1 = K.p(a + 0.08, 0.8, zArka - 0.42), p2 = K.p(b - 0.08, 0.8, zArka - 0.42);
    ctx.strokeStyle = rgba(SR.koltukA, 0.8); ctx.lineWidth = lw * 1.4; ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
  }
  // gövde tabanı
  K.kutu(ctx, x0 + 0.2, x1 - 0.2, 0.1, 0.36, zOn, zArka - 0.2, { on: SR.koltukK, ust: SR.koltuk, yan: SR.koltukK }, MK, lw);
  // oturma minderleri
  for (let i = 0; i < 3; i++) {
    const a = x0 + 0.23 + i * 0.6, b = a + 0.58;
    K.kutu(ctx, a, b, 0.34, 0.48, zOn - 0.02, zArka - 0.42, { on: SR.koltuk, ust: SR.koltukU, yan: SR.koltukK }, MK, lw);
  }
  // kolçaklar
  for (const [a, b] of [[x0, x0 + 0.22], [x1 - 0.22, x1]]) {
    K.kutu(ctx, a, b, 0.1, 0.64, zOn - 0.04, zArka, { on: SR.koltuk, ust: SR.koltukA, yan: SR.koltukK }, MK, lw);
    const u1 = K.p(a + 0.03, 0.64, zOn - 0.04), u2 = K.p(b - 0.03, 0.64, zOn - 0.04);
    ctx.strokeStyle = rgba(SR.koltukA, 0.9); ctx.lineWidth = lw * 1.2; ctx.beginPath(); ctx.moveTo(u1[0], u1[1] + 2); ctx.lineTo(u2[0], u2[1] + 2); ctx.stroke();
  }
  // ahşap ayaklar
  for (const x of [x0 + 0.06, x1 - 0.06]) K.kutu(ctx, x - 0.035, x + 0.035, 0, 0.1, zOn + 0.04, zOn + 0.11, { on: SR.ahsapK, ust: SR.ahsap, yan: SR.ahsapK }, MK, lw * 0.6);
}
// Sehpa + çay bardağı + kumanda
function sehpaCiz(ctx, K, t, lw) {
  const x0 = -0.55, x1 = 0.55, z0 = 2.2, z1 = 2.72, y = 0.42;
  for (const [x, z] of [[x0 + 0.05, z0 + 0.05], [x1 - 0.05, z0 + 0.05], [x0 + 0.05, z1 - 0.05], [x1 - 0.05, z1 - 0.05]])
    K.kutu(ctx, x - 0.025, x + 0.025, 0, y - 0.04, z - 0.025, z + 0.025, { on: SR.ahsapK, ust: SR.ahsap, yan: SR.ahsapK }, MK, lw * 0.7);
  K.kutu(ctx, x0, x1, y - 0.04, y, z0, z1, { on: SR.ahsap, ust: SR.ahsapA, yan: SR.ahsapK }, MK, lw);
  // çay bardağı + tabak
  const tb = K.yerles(-0.22, y, 2.48); const s = tb.s;
  ctx.save(); ctx.translate(tb.x, tb.y);
  ctx.fillStyle = '#e9e4da'; ctx.beginPath(); ctx.ellipse(0, 0, 0.07 * s, 0.022 * s, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = MK; ctx.lineWidth = lw * 0.7; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-0.032 * s, -0.11 * s); ctx.quadraticCurveTo(-0.018 * s, -0.06 * s, -0.03 * s, -0.005 * s); ctx.lineTo(0.03 * s, -0.005 * s); ctx.quadraticCurveTo(0.018 * s, -0.06 * s, 0.032 * s, -0.11 * s); ctx.closePath();
  ctx.fillStyle = '#9b3b1f'; ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(-0.02 * s, -0.1 * s, 0.006 * s, 0.07 * s);
  ctx.restore();
  // kumanda
  K.kutu(ctx, 0.12, 0.2, y, y + 0.02, 2.36, 2.56, { on: '#26282e', ust: '#33363d', yan: '#1c1e22' }, MK, lw * 0.5);
}

// TV duvarı (ters açı): TV ünitesi, televizyon, kapı (koridora açılır), K2 kamerası
const SALON_KAPI = { x0: 1.35, x1: 2.25, h: 2.08 };
function tvDuvari(ctx, K, t, lw, o) {
  const z = 0.004;
  // kapı boşluğu: arkasında soğuk koridor
  const { x0, x1, h } = SALON_KAPI;
  const bos = K.cok([[x0, 0, z], [x0, h, z], [x1, h, z], [x1, 0, z]]);
  if (bos) {
    cokgen(ctx, bos); ctx.save(); ctx.clip();
    // koridorun karşı duvarı (1.3 m geride)
    K.ciz(ctx, [[x0 - 1, 0, -1.3], [x0 - 1, 2.6, -1.3], [x1 + 1, 2.6, -1.3], [x1 + 1, 0, -1.3]], '#cfd2cf', null, 0);
    K.ciz(ctx, [[x0 - 1, 0, 0], [x0 - 1, 0, -1.3], [x1 + 1, 0, -1.3], [x1 + 1, 0, 0]], '#6d5442', null, 0);
    for (let x = x0 - 1; x < x1 + 1; x += 0.14) K.cizgi(ctx, [x, 0, 0], [x, 0, -1.3], '#5a4436', lw * 0.4);
    K.ciz(ctx, [[x0 - 1, 0.0, -1.29], [x0 - 1, 0.08, -1.29], [x1 + 1, 0.08, -1.29], [x1 + 1, 0, -1.29]], '#8b8f8c', null, 0);
    K.ciz(ctx, [[x0 - 0.1, 1.35, -1.29], [x0 - 0.1, 1.85, -1.29], [x0 + 0.55, 1.85, -1.29], [x0 + 0.55, 1.35, -1.29]], '#59544c', MK, lw * 0.7);
    K.ciz(ctx, [[x0 - 0.05, 1.4, -1.285], [x0 - 0.05, 1.8, -1.285], [x0 + 0.5, 1.8, -1.285], [x0 + 0.5, 1.4, -1.285]], '#a7b3b9', null, 0);
    const lp = K.p((x0 + x1) / 2 + 0.6, 2.6, -0.65);
    isikTopu(ctx, lp[0], lp[1], 900 * K.f / 1500, '#dfe9ff', 0.25);
    if (o.kapiArkasi) o.kapiArkasi(ctx);
    ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#8fa2c4'; ctx.fillRect(-5000, -5000, 10000, 10000);
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
  }
  // kapı pervazı
  const pv = 0.07;
  K.ciz(ctx, [[x0 - pv, 0, z], [x0 - pv, h + pv, z], [x0, h + pv, z], [x0, 0, z]], '#f0ebe1', MK, lw);
  K.ciz(ctx, [[x1, 0, z], [x1, h + pv, z], [x1 + pv, h + pv, z], [x1 + pv, 0, z]], '#f0ebe1', MK, lw);
  K.ciz(ctx, [[x0 - pv, h, z], [x0 - pv, h + pv, z], [x1 + pv, h + pv, z], [x1 + pv, h, z]], '#f0ebe1', MK, lw);
  // açık kapı kanadı (duvara yaslanmış)
  K.ciz(ctx, [[x1 + 0.02, 0.01, 0.03], [x1 + 0.02, h - 0.02, 0.03], [x1 + 0.03, h - 0.02, 0.86], [x1 + 0.03, 0.01, 0.86]], '#e9e2d4', MK, lw);
  // TV ünitesi + TV
  K.kutu(ctx, -1.45, 0.75, 0.0, 0.5, 0.02, 0.45, { on: SR.ahsap, ust: SR.ahsapA, yan: SR.ahsapK }, MK, lw);
  K.ciz(ctx, [[-1.38, 0.08, 0.452], [-1.38, 0.42, 0.452], [-0.38, 0.42, 0.452], [-0.38, 0.08, 0.452]], null, SR.ahsapK, lw * 0.7);
  K.ciz(ctx, [[-0.3, 0.08, 0.452], [-0.3, 0.42, 0.452], [0.68, 0.42, 0.452], [0.68, 0.08, 0.452]], null, SR.ahsapK, lw * 0.7);
  K.kutu(ctx, -0.42, -0.24, 0.5, 0.56, 0.15, 0.3, { on: '#1c1d22', ust: '#2a2c33', yan: '#15161a' }, MK, lw * 0.6);
  K.kutu(ctx, -0.36, -0.3, 0.56, 0.72, 0.2, 0.24, { on: '#1c1d22', ust: '#2a2c33', yan: '#15161a' }, MK, lw * 0.6);
  const ek = K.ciz(ctx, [[-1.05, 0.72, 0.22], [-1.05, 1.42, 0.22], [0.39, 1.42, 0.22], [0.39, 0.72, 0.22]], '#141518', MK, lw);
  if (ek) { // ekran ışığı (titrek)
    cokgen(ctx, ek); ctx.save(); ctx.clip();
    const fl = 0.55 + 0.25 * Math.sin(t * 2.3) + 0.15 * Math.sin(t * 7.7 + 1) + 0.1 * gur(t * 3, 4);
    const xs = ek.map(p => p[0]), ys = ek.map(p => p[1]);
    const g = ctx.createLinearGradient(0, Math.min(...ys), 0, Math.max(...ys));
    g.addColorStop(0, rgba('#5c7fb0', 0.55 * fl)); g.addColorStop(1, rgba('#2c3e5c', 0.6 * fl));
    ctx.fillStyle = g; ctx.fillRect(Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    ctx.restore();
  }
  // K2 kamerası (TV duvarında, tavana yakın)
  const kc = K.yerles(0.95, 2.5, 0.05);
  if (kc.d > 0.2) {
    const s = kc.s;
    ctx.save(); ctx.translate(kc.x, kc.y);
    ctx.fillStyle = '#f2f2f0'; ctx.strokeStyle = MK; ctx.lineWidth = lw * 0.8;
    ctx.beginPath(); ctx.roundRect(-0.05 * s, -0.04 * s, 0.1 * s, 0.07 * s, 0.015 * s); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0.06 * s, 0.045 * s, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1a1c22'; ctx.beginPath(); ctx.arc(0, 0.065 * s, 0.024 * s, 0, TAU); ctx.fill();
    ctx.fillStyle = rgba('#ff3b30', 0.6 + 0.4 * (Math.floor(t * 1.2) % 2)); ctx.beginPath(); ctx.arc(0.03 * s, -0.01 * s, 0.006 * s + 0.6, 0, TAU); ctx.fill();
    ctx.restore();
  }
}

// Salon ışık/renk düzenlemesi (gece; ayaklı lambanın sıcak bej-sarı ışığı)
function salonIsik(ctx, K, t, o = {}) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const tr = o.tr || [1, 0, 0, 1, 0, 0];
  const cw = ctx.canvas.width, ch = ctx.canvas.height;
  ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#ecd9bf'; ctx.fillRect(0, 0, cw, ch);
  const [lx, lz] = LAMBA; const m = K.yerles(lx, 1.6, lz);
  if (m.d > 0.1) {
    const mx = tr[0] * m.x + tr[4], my = tr[3] * m.y + tr[5], ms = Math.abs(m.s * tr[0]);
    const g = ctx.createRadialGradient(mx, my, ms * 0.2, mx, my + ms * 0.6, ms * 5.2);
    g.addColorStop(0, 'rgba(255,245,225,0)'); g.addColorStop(0.35, 'rgba(150,105,70,0.10)'); g.addColorStop(0.75, 'rgba(70,45,32,0.36)'); g.addColorStop(1, 'rgba(35,22,18,0.55)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch);
  } else {
    const g = ctx.createRadialGradient(cw * 0.6, ch * 0.45, cw * 0.1, cw * 0.5, ch * 0.5, ch * 0.75);
    g.addColorStop(0, 'rgba(150,105,70,0.08)'); g.addColorStop(1, 'rgba(35,22,18,0.5)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch);
  }
  // tavan tarafını karart (ışık aşağıdan)
  const tg = ctx.createLinearGradient(0, 0, 0, ch * 0.45); tg.addColorStop(0, 'rgba(60,40,30,0.35)'); tg.addColorStop(1, 'rgba(60,40,30,0)');
  ctx.fillStyle = tg; ctx.fillRect(0, 0, cw, ch * 0.45);
  ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = 'rgba(255,190,110,0.16)'; ctx.fillRect(0, 0, cw, ch);
  if (o.tv !== false) {
    const fl = 0.5 + 0.3 * Math.sin(t * 2.3) + 0.2 * gur(t * 3, 4);
    const bg = ctx.createLinearGradient(0, ch, 0, 0); bg.addColorStop(0, `rgba(110,150,220,${0.11 * fl})`); bg.addColorStop(0.55, 'rgba(110,150,220,0)');
    ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = bg; ctx.fillRect(0, 0, cw, ch);
  }
  ctx.restore();
}

/* =========================================================================
   KORİDOR   x: -0.65..0.65   y: 0..2.6   z: 0 (giriş kapısı) .. 7.4 (mutfak kapısı)
   Salon kapısı sol duvarda (x=-0.65), z: 2.5..3.4
   ========================================================================= */
const KOR = { x0: -0.65, x1: 0.65, h: 2.6, z1: 7.4, sk0: 2.5, sk1: 3.4, lambaZ: 4.0 };
const KR = { duvar: '#e6decb', duvarK: '#d9cfb8', tavan: '#ebe5d6', zemin: '#7c5236', zeminK: '#60402a', supurge: '#5a3b27', pervaz: '#f1ede4', kapi: '#ece6da', kapiK: '#d2cabb' };

function koridorKabuk(ctx, K, t, lw, o = {}) {
  const { x0, x1, h, z1, sk0, sk1 } = KOR;
  const zb = -0.01;
  K.ciz(ctx, [[x0, h, zb], [x0, h, z1], [x1, h, z1], [x1, h, zb]], KR.tavan, MK, lw);
  K.ciz(ctx, [[x0, 0, zb], [x1, 0, zb], [x1, 0, z1], [x0, 0, z1]], KR.zemin, MK, lw);
  ctx.save(); const ze = K.cok([[x0, 0, zb], [x1, 0, zb], [x1, 0, z1], [x0, 0, z1]]); if (ze) { cokgen(ctx, ze); ctx.clip(); }
  for (let x = x0; x <= x1 + 0.01; x += 0.13) K.cizgi(ctx, [x, 0, zb], [x, 0, z1], KR.zeminK, lw * 0.55);
  for (let z = 0.3, i = 0; z < z1; z += 0.55, i++) for (let x = x0 + (i % 2) * 0.065; x < x1; x += 0.26) K.cizgi(ctx, [x, 0, z], [x + 0.13, 0, z], KR.zeminK, lw * 0.5);
  ctx.restore();
  // sağ duvar
  K.ciz(ctx, [[x1, 0, z1], [x1, h, z1], [x1, h, zb], [x1, 0, zb]], KR.duvarK, MK, lw);
  // sol duvar (salon kapısı boşluğu ile)
  K.ciz(ctx, [[x0, 0, zb], [x0, h, zb], [x0, h, sk0], [x0, 0, sk0]], KR.duvarK, MK, lw);
  K.ciz(ctx, [[x0, 2.08, sk0], [x0, h, sk0], [x0, h, sk1], [x0, 2.08, sk1]], KR.duvarK, MK, lw);
  K.ciz(ctx, [[x0, 0, sk1], [x0, h, sk1], [x0, h, z1], [x0, 0, z1]], KR.duvarK, MK, lw);
  // salon kapısı boşluğu: sıcak ışık
  const sb = K.cok([[x0, 0, sk0], [x0, 2.08, sk0], [x0, 2.08, sk1], [x0, 0, sk1]]);
  if (sb) {
    cokgen(ctx, sb); ctx.save(); ctx.clip();
    K.ciz(ctx, [[x0 - 3, 0, sk0 - 2], [x0 - 3, 2.75, sk0 - 2], [x0 - 3, 2.75, sk1 + 3], [x0 - 3, 0, sk1 + 3]], '#d9b98a', null, 0);
    K.ciz(ctx, [[x0, 0, sk0 - 1], [x0 - 3, 0, sk0 - 1], [x0 - 3, 0, sk1 + 2], [x0, 0, sk1 + 2]], '#7e4f33', null, 0);
    K.ciz(ctx, [[x0 - 0.2, 0.004, sk0 - 0.6], [x0 - 2.4, 0.004, sk0 - 0.6], [x0 - 2.4, 0.004, sk1 + 0.8], [x0 - 0.2, 0.004, sk1 + 0.8]], '#6e2a2f', null, 0);
    K.kutu(ctx, x0 - 2.6, x0 - 1.8, 0.08, 0.85, sk0 - 0.2, sk1 + 0.6, { on: SR.koltuk, ust: SR.koltukA, yan: SR.koltukK, sag: SR.koltuk }, MK, lw);
    const lp = K.p(x0 - 1.6, 1.5, sk1 + 0.9);
    isikTopu(ctx, lp[0], lp[1], 700 * K.f / 1200, '#ffcf88', 0.35);
    if (o.salonIci) o.salonIci(ctx);
    ctx.restore();
  }
  // salon kapısı pervazı
  for (const [a, b] of [[sk0 - 0.07, sk0], [sk1, sk1 + 0.07]]) K.ciz(ctx, [[x0 + 0.01, 0, a], [x0 + 0.01, 2.15, a], [x0 + 0.01, 2.15, b], [x0 + 0.01, 0, b]], KR.pervaz, MK, lw);
  K.ciz(ctx, [[x0 + 0.01, 2.08, sk0 - 0.07], [x0 + 0.01, 2.15, sk0 - 0.07], [x0 + 0.01, 2.15, sk1 + 0.07], [x0 + 0.01, 2.08, sk1 + 0.07]], KR.pervaz, MK, lw);
  // ışığın zemine düşen sıcak lekesi
  const ll = K.cok([[x0, 0.002, sk0 + 0.05], [x0 + 0.95, 0.002, sk0 + 0.25], [x0 + 0.95, 0.002, sk1 + 0.15], [x0, 0.002, sk1 - 0.05]]);
  if (ll) { ctx.save(); cokgen(ctx, ll); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = 'rgba(255,190,110,0.22)'; ctx.fill(); ctx.restore(); }
  // anahtar (ışık düğmesi)
  K.ciz(ctx, [[x0 + 0.012, 1.08, sk1 + 0.14], [x0 + 0.012, 1.2, sk1 + 0.14], [x0 + 0.012, 1.2, sk1 + 0.24], [x0 + 0.012, 1.08, sk1 + 0.24]], '#f6f3ec', MK, lw * 0.6);
  // süpürgelikler
  for (const [xx, za, zbb] of [[x1 - 0.012, zb, z1], [x0 + 0.012, zb, sk0 - 0.07], [x0 + 0.012, sk1 + 0.07, z1]])
    K.ciz(ctx, [[xx, 0, za], [xx, 0.08, za], [xx, 0.08, zbb], [xx, 0, zbb]], KR.supurge, MK, lw * 0.6);
  // sağ duvar: resim + kalorifer peteği
  K.ciz(ctx, [[x1 - 0.01, 1.35, 4.95], [x1 - 0.01, 1.85, 4.95], [x1 - 0.01, 1.85, 4.35], [x1 - 0.01, 1.35, 4.35]], '#4f3c2c', MK, lw);
  K.ciz(ctx, [[x1 - 0.015, 1.4, 4.9], [x1 - 0.015, 1.8, 4.9], [x1 - 0.015, 1.8, 4.4], [x1 - 0.015, 1.4, 4.4]], '#c9bfa8', MK, lw * 0.5);
  K.ciz(ctx, [[x1 - 0.02, 1.4, 4.9], [x1 - 0.02, 1.55, 4.7], [x1 - 0.02, 1.5, 4.55], [x1 - 0.02, 1.6, 4.4], [x1 - 0.02, 1.4, 4.4]], '#8d9a8f', null, 0);
  K.kutu(ctx, x1 - 0.1, x1 - 0.02, 0.15, 0.75, 5.6, 6.5, { on: '#efefea', ust: '#f7f7f2', yan: '#dcdcd5', sol: '#e4e4dd' }, MK, lw * 0.8);
  for (let z = 5.66; z < 6.48; z += 0.07) K.cizgi(ctx, [x1 - 0.1, 0.17, z], [x1 - 0.1, 0.73, z], '#c9c9c2', lw * 0.5);
  // giriş tarafı: ayakkabılık (sağ duvar)
  K.kutu(ctx, x1 - 0.34, x1 - 0.01, 0, 0.5, 0.12, 0.85, { on: '#c9b08a', ust: '#d8c19c', yan: '#ad9471', sol: '#bfa47e' }, MK, lw);
  K.ciz(ctx, [[x1 - 0.345, 0.06, 0.16], [x1 - 0.345, 0.44, 0.16], [x1 - 0.345, 0.44, 0.47], [x1 - 0.345, 0.06, 0.47]], null, '#8f7756', lw * 0.6);
  K.ciz(ctx, [[x1 - 0.345, 0.06, 0.5], [x1 - 0.345, 0.44, 0.5], [x1 - 0.345, 0.44, 0.81], [x1 - 0.345, 0.06, 0.81]], null, '#8f7756', lw * 0.6);
  // uzak duvar: mutfak kapısı
  mutfakDuvari(ctx, K, t, lw, o);
  // yakın duvar: giriş kapısı (ters açıdan görünür)
  if (K.yaw > 2) girisDuvari(ctx, K, t, lw);
  // tavan lambası
  const lz = KOR.lambaZ;
  K.ciz(ctx, polyDaire(0, h - 0.002, lz, 0.17, 16), '#f4f2ec', MK, lw * 0.7);
  const lm = K.yerles(0, h - 0.05, lz);
  if (lm.d > 0.15) {
    ctx.save(); ctx.translate(lm.x, lm.y);
    ctx.beginPath(); ctx.ellipse(0, -0.02 * lm.s, 0.15 * lm.s, 0.07 * lm.s, 0, 0, Math.PI); ctx.fillStyle = o.lambaKapali ? '#cfd3d6' : '#ffffff'; ctx.fill(); ctx.strokeStyle = MK; ctx.lineWidth = lw * 0.7; ctx.stroke();
    ctx.restore();
  }
}

function mutfakDuvari(ctx, K, t, lw, o) {
  const { x0, x1, h, z1 } = KOR, z = z1;
  const k0 = -0.42, k1 = 0.42, kh = 2.05;
  K.ciz(ctx, [[x0, 0, z], [x0, h, z], [x1, h, z], [x1, 0, z]], KR.duvar, MK, lw);
  // kapı boşluğu (karanlık mutfak)
  const bos = K.cok([[k0, 0, z], [k0, kh, z], [k1, kh, z], [k1, 0, z]]);
  if (bos) {
    cokgen(ctx, bos); ctx.fillStyle = '#07090d'; ctx.fill();
    ctx.save(); cokgen(ctx, bos); ctx.clip();
    // mutfak içi: uzakta ay ışıklı pencere ve tezgâh hatları
    K.ciz(ctx, [[0.25, 1.0, z + 2.6], [0.25, 1.75, z + 2.6], [0.95, 1.75, z + 2.6], [0.95, 1.0, z + 2.6]], '#1a2638', null, 0);
    K.ciz(ctx, [[0.58, 1.0, z + 2.59], [0.58, 1.75, z + 2.59], [0.62, 1.75, z + 2.59], [0.62, 1.0, z + 2.59]], '#0b0f16', null, 0);
    K.ciz(ctx, [[-1.5, 0.88, z + 2.5], [-1.5, 0.92, z + 2.5], [1.5, 0.92, z + 2.5], [1.5, 0.88, z + 2.5]], '#141a24', null, 0);
    if (o.mutfakIci) o.mutfakIci(ctx);
    ctx.restore();
  }
  // pervaz
  const pv = 0.07;
  K.ciz(ctx, [[k0 - pv, 0, z - 0.01], [k0 - pv, kh + pv, z - 0.01], [k0, kh + pv, z - 0.01], [k0, 0, z - 0.01]], KR.pervaz, MK, lw);
  K.ciz(ctx, [[k1, 0, z - 0.01], [k1, kh + pv, z - 0.01], [k1 + pv, kh + pv, z - 0.01], [k1 + pv, 0, z - 0.01]], KR.pervaz, MK, lw);
  K.ciz(ctx, [[k0 - pv, kh, z - 0.01], [k0 - pv, kh + pv, z - 0.01], [k1 + pv, kh + pv, z - 0.01], [k1 + pv, kh, z - 0.01]], KR.pervaz, MK, lw);
  // kapı kanadı (sol menteşe, mutfağa doğru açılır)
  const aci = o.kapiAci || 0, w = k1 - k0;
  const fx = k0 + w * Math.cos(aci), fz = z + w * Math.sin(aci);
  const kanat = [[k0, 0.01, z], [k0, kh - 0.01, z], [fx, kh - 0.01, fz], [fx, 0.01, fz]];
  const e = K.ciz(ctx, kanat, aci > 0.02 ? KR.kapiK : KR.kapi, MK, lw);
  if (e) {
    // buzlu cam panel + kol
    const L2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
    const P = (u, v) => { const top = L2([k0, kh, z], [fx, kh, fz], u), bot = L2([k0, 0, z], [fx, 0, fz], u); return L2(bot, top, v); };
    K.ciz(ctx, [P(0.22, 0.52), P(0.22, 0.9), P(0.78, 0.9), P(0.78, 0.52)], '#b9c3c9', MK, lw * 0.7);
    K.ciz(ctx, [P(0.22, 0.1), P(0.22, 0.42), P(0.78, 0.42), P(0.78, 0.1)], null, KR.kapiK, lw * 0.7);
    const kol = P(0.88, 0.48); const kp = K.p(kol[0], kol[1], kol[2]), kp2 = K.p(kol[0] - 0.08 * Math.cos(aci), kol[1], kol[2] - 0.08 * Math.sin(aci));
    ctx.strokeStyle = '#9a9a9a'; ctx.lineWidth = lw * 2.2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(kp[0], kp[1]); ctx.lineTo(kp2[0], kp2[1]); ctx.stroke();
  }
}

function girisDuvari(ctx, K, t, lw) {
  const { x0, x1, h } = KOR, z = 0;
  K.ciz(ctx, [[x1, 0, z], [x1, h, z], [x0, h, z], [x0, 0, z]], KR.duvar, MK, lw);
  K.ciz(ctx, [[0.48, 0, z + 0.01], [0.48, 2.12, z + 0.01], [-0.48, 2.12, z + 0.01], [-0.48, 0, z + 0.01]], KR.pervaz, MK, lw);
  K.ciz(ctx, [[0.42, 0, z + 0.015], [0.42, 2.06, z + 0.015], [-0.42, 2.06, z + 0.015], [-0.42, 0, z + 0.015]], '#6a4a35', MK, lw);
  K.ciz(ctx, [[0.34, 0.12, z + 0.02], [0.34, 0.92, z + 0.02], [-0.34, 0.92, z + 0.02], [-0.34, 0.12, z + 0.02]], null, '#553a28', lw * 0.7);
  K.ciz(ctx, [[0.34, 1.1, z + 0.02], [0.34, 1.92, z + 0.02], [-0.34, 1.92, z + 0.02], [-0.34, 1.1, z + 0.02]], null, '#553a28', lw * 0.7);
  const kp = K.p(-0.32, 1.02, z + 0.03), kp2 = K.p(-0.2, 1.02, z + 0.03);
  ctx.strokeStyle = '#b5b5b0'; ctx.lineWidth = lw * 2.4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(kp[0], kp[1]); ctx.lineTo(kp2[0], kp2[1]); ctx.stroke();
  const gz = K.p(0, 1.55, z + 0.03); ctx.fillStyle = '#c9c4b8'; ctx.beginPath(); ctx.arc(gz[0], gz[1], Math.max(1.5, K.f / Math.max(0.3, K.derinlik(0, 1.55, z)) * 0.012), 0, TAU); ctx.fill();
  // K1 kamerası (giriş tarafı tavan köşesi)
  const kc = K.yerles(0.5, 2.48, 0.22);
  if (kc.d > 0.2) {
    const s = kc.s; ctx.save(); ctx.translate(kc.x, kc.y);
    ctx.fillStyle = '#f2f2f0'; ctx.strokeStyle = MK; ctx.lineWidth = lw * 0.8;
    ctx.beginPath(); ctx.roundRect(-0.05 * s, -0.05 * s, 0.1 * s, 0.07 * s, 0.015 * s); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0.05 * s, 0.045 * s, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1a1c22'; ctx.beginPath(); ctx.arc(0, 0.055 * s, 0.024 * s, 0, TAU); ctx.fill();
    ctx.fillStyle = rgba('#ff3b30', 0.6 + 0.4 * (Math.floor(t * 1.2) % 2)); ctx.beginPath(); ctx.arc(0.03 * s, -0.02 * s, 0.006 * s + 0.6, 0, TAU); ctx.fill();
    ctx.restore();
  }
  // askılık + mont
  const a1 = K.p(0.62, 1.75, 0.6);
  K.ciz(ctx, [[x1 - 0.01, 1.68, 0.35], [x1 - 0.01, 1.75, 0.35], [x1 - 0.01, 1.75, 1.1], [x1 - 0.01, 1.68, 1.1]], SR.ahsap, MK, lw * 0.7);
  K.ciz(ctx, [[x1 - 0.06, 1.72, 0.55], [x1 - 0.1, 1.2, 0.5], [x1 - 0.12, 0.95, 0.62], [x1 - 0.1, 0.98, 0.85], [x1 - 0.06, 1.72, 0.8]], '#3d4a3a', MK, lw);
}

// Koridor ışığı (soğuk mavi-gri)
function koridorIsik(ctx, K, t, o = {}) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const tr = o.tr || [1, 0, 0, 1, 0, 0];
  ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = o.renk || '#a3b0c2'; ctx.fillRect(0, 0, W, H);
  const lm = K.yerles(0, KOR.h - 0.05, KOR.lambaZ);
  let fl = 1;
  if (o.titreme) { const k = o.titreme; fl = 1 - k * (0.5 + 0.5 * Math.sign(Math.sin(t * 61))) * 0.6; }
  if (lm.d > 0.1) {
    const x = tr[0] * lm.x + tr[4], y = tr[3] * lm.y + tr[5], s = lm.s * tr[0];
    const g = ctx.createRadialGradient(x, y, 0, x, y + s * 1.2, s * 3.8);
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(70,80,100,0.15)'); g.addColorStop(1, 'rgba(15,20,32,0.55)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'screen'; isikTopu(ctx, x, y, s * 1.4, '#dfe8ff', 0.22 * fl, 'screen'); isikTopu(ctx, x, y, s * 0.3, '#ffffff', 0.45 * fl, 'screen');
  } else { ctx.fillStyle = 'rgba(15,20,32,0.35)'; ctx.fillRect(0, 0, W, H); }
  if (fl < 1) { ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = `rgba(5,8,14,${(1 - fl) * 0.5})`; ctx.fillRect(0, 0, W, H); }
  // salon kapısından taşan sıcak ışık
  if (o.K) {
    const sk = o.K.yerles(KOR.x0 - 0.2, 1.1, (KOR.sk0 + KOR.sk1) / 2);
    if (sk.d > 0.2) { ctx.globalCompositeOperation = 'screen'; const x = tr[0] * sk.x + tr[4], y = tr[3] * sk.y + tr[5]; isikTopu(ctx, x, y, Math.abs(sk.s * tr[0]) * 1.5, '#ffb460', 0.2, 'screen'); }
  }
  ctx.restore();
}

/* =========================================================================
   GÜVENLİK KAMERASI GÖRÜNÜMÜ (soluk, az grenli, mavi-gri; yazı + parazit)
   ========================================================================= */
const KAMERA_K1 = () => new Kam3B({ x: 0.42, y: 2.42, z: 0.22, yaw: -0.055, pitch: 0.42, f: 900 });
const KAMERA_K2 = () => new Kam3B({ x: 0.95, y: 2.48, z: 0.08, yaw: -0.2, pitch: 0.47, f: 860 });

function kameraEfekti(ctx, w, h, t, o) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  // renk: doygunluğu düşür + mavi-gri
  ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = 'rgba(128,128,128,0.72)'; ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#b4c0cc'; ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = 'rgba(20,25,32,1)'; ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'source-over';
  ctx.restore();
  gren(ctx, Math.floor(t * 15) / 15, o.gren ?? 0.09, w, h, w / W * 1.2);
  // tarama çizgileri
  ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.06)'; const ad = Math.max(2, h / 480);
  for (let y = 0; y < h; y += ad * 2) ctx.fillRect(0, y, w, ad * 0.6);
  ctx.restore();
  vinyet(ctx, 0.55, '#05070a', w, h, 0.35);
  // parazit
  if (o.parazit > 0) parazitCiz(ctx, w, h, t, o.parazit);
  // yazılar
  const fs = Math.round(w * 0.042);
  ctx.save(); ctx.font = `600 ${fs}px "JetBrains Mono", monospace`; ctx.textBaseline = 'top';
  const g = (s, x, y, al = 'left') => { ctx.textAlign = al; ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillText(s, x + fs * 0.08, y + fs * 0.08); ctx.fillStyle = 'rgba(240,244,248,0.92)'; ctx.fillText(s, x, y); };
  const m = w * 0.045;
  g(o.ad, m, m * 1.1);
  g(saatYaz(o.saat), w - m, m * 1.1, 'right');
  ctx.font = `500 ${Math.round(fs * 0.78)}px "JetBrains Mono", monospace`;
  g(o.tarih || '19.11.2026', m, h - m * 1.1 - fs);
  if (o.canli) { ctx.fillStyle = 'rgba(255,59,48,' + (0.55 + 0.45 * (Math.floor(t * 1.5) % 2)) + ')'; ctx.beginPath(); ctx.arc(w - m - fs * 2.6, h - m * 1.1 - fs * 0.45, fs * 0.28, 0, TAU); ctx.fill(); g(o.kayit ? 'KAYIT' : 'CANLI', w - m, h - m * 1.1 - fs, 'right'); }
  else g('KAYIT', w - m, h - m * 1.1 - fs, 'right');
  if (o.hareket > 0) { ctx.globalAlpha = o.hareket * (Math.floor(t * 3) % 2 ? 1 : 0.35); ctx.fillStyle = 'rgba(255,190,40,0.95)'; ctx.font = `700 ${Math.round(fs * 0.8)}px "JetBrains Mono", monospace`; ctx.textAlign = 'left'; ctx.fillText('● HAREKET ALGILANDI', m, m * 1.1 + fs * 1.5); ctx.globalAlpha = 1; }
  // köşe çerçeveleri
  ctx.strokeStyle = 'rgba(240,244,248,0.6)'; ctx.lineWidth = Math.max(1.5, w / 400); const c = w * 0.06;
  for (const [x, y, sx, sy] of [[m * 0.5, m * 0.5, 1, 1], [w - m * 0.5, m * 0.5, -1, 1], [m * 0.5, h - m * 0.5, 1, -1], [w - m * 0.5, h - m * 0.5, -1, -1]]) { ctx.beginPath(); ctx.moveTo(x, y + sy * c); ctx.lineTo(x, y); ctx.lineTo(x + sx * c, y); ctx.stroke(); }
  ctx.restore();
}

function parazitCiz(ctx, w, h, t, k) {
  const r = rng(Math.floor(t * 30) * 13 + 7);
  ctx.save();
  // yatay kaymalar
  const n = Math.floor(3 + k * 10);
  for (let i = 0; i < n; i++) {
    const y = r() * h, hh = h * (0.01 + r() * 0.06 * k), dx = (r() - 0.5) * w * 0.12 * k;
    try { ctx.drawImage(ctx.canvas, 0, y, w, hh, dx, y, w, hh); } catch (e) { }
  }
  // renk kayması bantları
  ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < n * 0.6; i++) { ctx.fillStyle = r() < 0.5 ? `rgba(255,40,80,${0.15 * k})` : `rgba(40,220,255,${0.15 * k})`; ctx.fillRect(0, r() * h, w, h * 0.01 * (1 + r() * 3)); }
  ctx.globalCompositeOperation = 'source-over';
  // blok gürültü
  for (let i = 0; i < 30 * k; i++) { const v = Math.floor(r() * 255); ctx.fillStyle = `rgba(${v},${v},${v},${0.35 * k})`; ctx.fillRect(r() * w, r() * h, w * 0.02 * (1 + r() * 4), h * 0.004 * (1 + r() * 3)); }
  if (k > 0.7) { ctx.fillStyle = `rgba(200,210,220,${(k - 0.7) * 0.5})`; ctx.fillRect(0, 0, w, h); }
  ctx.restore();
}

/* =========================================================================
   TELEFON ARAYÜZÜ ("Ev Kamerası" uygulaması)
   ========================================================================= */
function uiYazi(ctx, s, x, y, px, renk, kalin = 600, hiza = 'left', font = 'Inter') { ctx.font = `${kalin} ${px}px "${font}", sans-serif`; ctx.textAlign = hiza; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = renk; ctx.fillText(s, x, y); }

// Telefonu çizer: (cx, cy) merkez, gen genişlik (px), a açı; ekran(ctx, w, h) içerik fonksiyonu (ekran koordinatlarında)
function telefonCiz(ctx, cx, cy, gen, a, ekran) {
  const yuk = gen * 2.06, r = gen * 0.13;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.roundRect(-gen / 2 + gen * 0.03, -yuk / 2 + gen * 0.05, gen, yuk, r); ctx.fill();
  ctx.fillStyle = '#1d2027'; ctx.beginPath(); ctx.roundRect(-gen / 2, -yuk / 2, gen, yuk, r); ctx.fill();
  ctx.strokeStyle = MK; ctx.lineWidth = Math.max(2, gen * 0.006); ctx.stroke();
  ctx.strokeStyle = '#4a4f5a'; ctx.lineWidth = gen * 0.008; ctx.beginPath(); ctx.roundRect(-gen / 2 + gen * 0.01, -yuk / 2 + gen * 0.01, gen - gen * 0.02, yuk - gen * 0.02, r * 0.92); ctx.stroke();
  const b = gen * 0.035, ew = gen - b * 2, eh = yuk - b * 2;
  ctx.save(); ctx.beginPath(); ctx.roundRect(-gen / 2 + b, -yuk / 2 + b, ew, eh, r * 0.75); ctx.clip();
  ctx.translate(-gen / 2 + b, -yuk / 2 + b);
  ekran(ctx, ew, eh);
  // cam parlaması
  ctx.fillStyle = 'rgba(255,255,255,0.035)'; ctx.beginPath(); ctx.moveTo(ew * 0.55, 0); ctx.lineTo(ew, 0); ctx.lineTo(ew, eh * 0.25); ctx.closePath(); ctx.fill();
  ctx.restore();
  // ön kamera adası
  ctx.fillStyle = '#05060a'; ctx.beginPath(); ctx.roundRect(-gen * 0.12, -yuk / 2 + b + gen * 0.025, gen * 0.24, gen * 0.06, gen * 0.03); ctx.fill();
  ctx.restore();
  return { yuk };
}

function durumCubugu(ctx, w, t, saat) {
  const px = w * 0.04;
  uiYazi(ctx, saatYaz(saat, false), w * 0.09, w * 0.085, px, '#f2f4f7', 600);
  ctx.fillStyle = '#f2f4f7';
  for (let i = 0; i < 4; i++) ctx.fillRect(w * 0.72 + i * w * 0.018, w * 0.075 - i * w * 0.007, w * 0.011, w * 0.012 + i * w * 0.007);
  ctx.strokeStyle = '#f2f4f7'; ctx.lineWidth = w * 0.004; ctx.strokeRect(w * 0.82, w * 0.058, w * 0.07, w * 0.03); ctx.fillRect(w * 0.825, w * 0.063, w * 0.045, w * 0.02);
}
function uygulamaBaslik(ctx, w, baslik, alt) {
  uiYazi(ctx, baslik, w * 0.07, w * 0.23, w * 0.068, '#f4f6f9', 700);
  if (alt) uiYazi(ctx, alt, w * 0.07, w * 0.29, w * 0.036, '#8f9aab', 500);
}
// Bildirim listesi
function ekranListe(ctx, w, h, t, o) {
  ctx.fillStyle = '#10141b'; ctx.fillRect(0, 0, w, h);
  durumCubugu(ctx, w, t, o.saat);
  uygulamaBaslik(ctx, w, 'Ev Kamerası', 'Bildirimler');
  const ogeler = [
    ['K1 · Koridor', 'Hareket algılandı', '23:17', true],
    ['K1 · Koridor', 'Hareket algılandı', '23:14', true],
    ['K2 · Salon', 'Hareket algılandı', '22:51', false],
    ['K1 · Koridor', 'Hareket algılandı', '21:08', false],
  ];
  ogeler.forEach((g, i) => {
    const y = w * 0.36 + i * w * 0.3, hh = w * 0.26;
    const sec = o.secili === i ? o.seciliK || 0 : 0;
    ctx.fillStyle = sec > 0 ? karis('#1b2230', '#2c3c58', sec) : '#1b2230'; ctx.beginPath(); ctx.roundRect(w * 0.05, y, w * 0.9, hh, w * 0.04); ctx.fill();
    // küçük resim
    ctx.save(); ctx.beginPath(); ctx.roundRect(w * 0.08, y + w * 0.03, w * 0.26, hh - w * 0.06, w * 0.02); ctx.clip();
    if (o.kucukResim) o.kucukResim(ctx, w * 0.08, y + w * 0.03, w * 0.26, hh - w * 0.06, i); else { ctx.fillStyle = '#39424f'; ctx.fillRect(w * 0.08, y, w * 0.26, hh); }
    ctx.restore();
    uiYazi(ctx, g[1], w * 0.38, y + w * 0.1, w * 0.045, '#f1f3f6', 600);
    uiYazi(ctx, g[0], w * 0.38, y + w * 0.16, w * 0.038, '#97a3b6', 500);
    uiYazi(ctx, g[2], w * 0.9, y + w * 0.1, w * 0.04, g[3] ? '#ff6b5e' : '#7d8899', 600, 'right');
    if (g[3] && i === 0) { ctx.fillStyle = '#ff453a'; ctx.beginPath(); ctx.arc(w * 0.9, y + w * 0.17, w * 0.012, 0, TAU); ctx.fill(); }
  });
}
// Oynatıcı: tek görüntü
function ekranOynatici(ctx, w, h, t, o) {
  ctx.fillStyle = '#0b0e13'; ctx.fillRect(0, 0, w, h);
  durumCubugu(ctx, w, t, o.saat);
  uiYazi(ctx, '‹', w * 0.06, w * 0.24, w * 0.09, '#f4f6f9', 500);
  uiYazi(ctx, o.baslik, w * 0.5, w * 0.215, w * 0.05, '#f4f6f9', 700, 'center');
  uiYazi(ctx, o.alt, w * 0.5, w * 0.27, w * 0.034, o.canli ? '#ff6b5e' : '#8f9aab', 600, 'center');
  const vy = w * 0.33, vh = h - vy - w * 0.42;
  ctx.save(); ctx.beginPath(); ctx.rect(0, vy, w, vh); ctx.clip(); ctx.translate(0, vy);
  o.goruntu(ctx, w, vh); ctx.restore();
  // ilerleme çubuğu + düğmeler
  const by = vy + vh + w * 0.09;
  ctx.fillStyle = '#2a313d'; ctx.fillRect(w * 0.07, by, w * 0.86, w * 0.012);
  if (!o.canli) { ctx.fillStyle = '#4c8dff'; ctx.fillRect(w * 0.07, by, w * 0.86 * clamp(o.ilerleme || 0), w * 0.012); ctx.beginPath(); ctx.arc(w * 0.07 + w * 0.86 * clamp(o.ilerleme || 0), by + w * 0.006, w * 0.022, 0, TAU); ctx.fill(); }
  else { ctx.fillStyle = '#ff453a'; ctx.fillRect(w * 0.07, by, w * 0.86, w * 0.012); }
  const dy = by + w * 0.16;
  const dug = (x, s, aktif) => { ctx.fillStyle = aktif ? '#2f5fd0' : '#1d2430'; ctx.beginPath(); ctx.roundRect(x - w * 0.19, dy - w * 0.07, w * 0.38, w * 0.11, w * 0.055); ctx.fill(); uiYazi(ctx, s, x, dy + w * 0.002, w * 0.04, '#eef2f8', 600, 'center'); };
  dug(w * 0.28, o.canli ? 'Kayıtlar' : 'Canlı', false); dug(w * 0.72, 'Karşılaştır', o.karsilastirBas > 0);
}
// Karşılaştır: iki görüntü yan yana
function ekranKarsilastir(ctx, w, h, t, o) {
  ctx.fillStyle = '#0b0e13'; ctx.fillRect(0, 0, w, h);
  durumCubugu(ctx, w, t, o.saat);
  uiYazi(ctx, 'Karşılaştır', w * 0.5, w * 0.215, w * 0.05, '#f4f6f9', 700, 'center');
  uiYazi(ctx, 'Aynı saat · 23:14', w * 0.5, w * 0.27, w * 0.034, '#8f9aab', 600, 'center');
  const vy = w * 0.36, gw = w * 0.47, gh = h - vy - w * 0.5;
  for (let i = 0; i < 2; i++) {
    const x = w * 0.02 + i * (gw + w * 0.02);
    ctx.save(); ctx.beginPath(); ctx.roundRect(x, vy, gw, gh, w * 0.02); ctx.clip(); ctx.translate(x, vy);
    o.goruntu(ctx, gw, gh, i); ctx.restore();
  }
  uiYazi(ctx, 'K1 · Koridor', w * 0.02 + gw / 2, vy + gh + w * 0.07, w * 0.036, '#c9d2df', 600, 'center');
  uiYazi(ctx, 'K2 · Salon', w * 0.04 + gw * 1.5, vy + gh + w * 0.07, w * 0.036, '#c9d2df', 600, 'center');
  const by = vy + gh + w * 0.17;
  ctx.fillStyle = '#2a313d'; ctx.fillRect(w * 0.07, by, w * 0.86, w * 0.012);
  ctx.fillStyle = '#4c8dff'; ctx.fillRect(w * 0.07, by, w * 0.86 * clamp(o.ilerleme || 0), w * 0.012);
  ctx.beginPath(); ctx.arc(w * 0.07 + w * 0.86 * clamp(o.ilerleme || 0), by + w * 0.006, w * 0.022, 0, TAU); ctx.fill();
  uiYazi(ctx, saatYaz(o.kayitSaat || 0), w * 0.07, by + w * 0.09, w * 0.034, '#8f9aab', 600);
  uiYazi(ctx, '2 kamera eşleşti', w * 0.93, by + w * 0.09, w * 0.034, '#8f9aab', 600, 'right');
}
// Bildirim afişi
function bildirimAfisi(ctx, w, k, metin, alt) {
  if (k <= 0) return;
  const y = lerp(-w * 0.3, w * 0.12, eo(clamp(k)));
  ctx.save(); ctx.globalAlpha = clamp(k * 2);
  ctx.fillStyle = 'rgba(40,44,54,0.96)'; ctx.beginPath(); ctx.roundRect(w * 0.04, y, w * 0.92, w * 0.24, w * 0.05); ctx.fill();
  ctx.fillStyle = '#ff453a'; ctx.beginPath(); ctx.roundRect(w * 0.08, y + w * 0.05, w * 0.12, w * 0.12, w * 0.03); ctx.fill();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = w * 0.01; ctx.beginPath(); ctx.arc(w * 0.14, y + w * 0.11, w * 0.028, 0, TAU); ctx.stroke();
  uiYazi(ctx, metin, w * 0.24, y + w * 0.105, w * 0.042, '#ffffff', 700);
  uiYazi(ctx, alt, w * 0.24, y + w * 0.17, w * 0.036, '#c3cad6', 500);
  uiYazi(ctx, 'şimdi', w * 0.92, y + w * 0.105, w * 0.032, '#9aa3b2', 500, 'right');
  ctx.restore();
}

/* =========================================================================
   FİNAL: bej kâğıtta çocuk çizimi (abi, iki aynı kız kardeş, arkalarında karanlık kapı)
   ========================================================================= */
function cocukCizimi(ctx, t) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#e6d8b9'; ctx.fillRect(0, 0, W, H);
  const r = rng(99);
  for (let i = 0; i < 3000; i++) { ctx.fillStyle = r() < 0.5 ? 'rgba(120,95,60,0.06)' : 'rgba(255,255,255,0.07)'; ctx.fillRect(r() * W, r() * H, 2 + r() * 4, 1 + r() * 2); }
  // kâğıt kenarı gölgesi ve katlanma izi
  const vg = ctx.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, H * 0.7); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(90,60,30,0.35)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(120,95,60,0.18)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, H * 0.52); ctx.lineTo(W, H * 0.5); ctx.stroke();
  const kalem = (pts, renk, kal, tekrar = 2, tohum = 1, alfa = 0.8) => {
    const rr = rng(tohum);
    ctx.strokeStyle = renk; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let k = 0; k < tekrar; k++) {
      ctx.lineWidth = kal * (0.7 + rr() * 0.6); ctx.globalAlpha = alfa;
      ctx.beginPath();
      pts.forEach((p, i) => { const x = p[0] + (rr() - 0.5) * kal * 1.2, y = p[1] + (rr() - 0.5) * kal * 1.2; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };
  const karala = (x0, y0, x1, y1, renk, tohum, yog = 9, kal = 11) => {
    const rr = rng(tohum); ctx.strokeStyle = renk; ctx.lineCap = 'round';
    for (let pas = 0; pas < 2; pas++) for (let y = y0 - (x1 - x0); y < y1; y += yog) {
      ctx.globalAlpha = 0.55 + rr() * 0.3; ctx.lineWidth = kal * (0.6 + rr() * 0.8);
      const a = pas ? -0.5 : 0.35;
      ctx.beginPath(); ctx.moveTo(x0, y + rr() * 6); ctx.lineTo(x1, y + (x1 - x0) * a + rr() * 6); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };
  // karanlık kapı (aralık)
  const DX0 = 250, DX1 = 830, DY0 = 330, DY1 = 1420;
  ctx.save(); ctx.beginPath(); ctx.rect(DX0, DY0, DX1 - DX0, DY1 - DY0); ctx.clip();
  karala(DX0, DY0, DX1, DY1, '#2a2428', 3, 8, 12);
  karala(DX0 + 300, DY0, DX1, DY1, '#0d0b0c', 7, 6, 13);
  ctx.restore();
  kalem([[DX0, DY1], [DX0, DY0], [DX1, DY0], [DX1, DY1]], '#0f0d0e', 12, 3, 4, 0.9);
  kalem([[DX0 + 300, DY0 + 6], [DX0 + 300, DY1 - 4]], '#4a4045', 7, 2, 8, 0.7);
  kalem([[DX0 + 260, 900], [DX0 + 285, 900]], '#8a8a86', 12, 2, 5);
  kalem([[60, DY1], [1020, DY1 - 10]], '#5b4a3a', 9, 2, 6);
  const insan = (x, boy, sac, ust, alt, kiz, tohum, gozBos) => {
    const taban = DY1 - 4, ky = taban - boy, hr = boy * 0.135;
    const g0 = ky + hr * 2.2, g1 = ky + boy * 0.6, ust0 = boy * 0.13, ust1 = boy * (kiz ? 0.22 : 0.16);
    const gov = [[x - ust0, g0], [x + ust0, g0], [x + ust1, g1], [x - ust1, g1]];
    ctx.fillStyle = '#e6d8b9'; cokgen(ctx, gov); ctx.fill();
    ctx.fillStyle = ust; ctx.globalAlpha = 0.9; cokgen(ctx, gov); ctx.fill(); ctx.globalAlpha = 1;
    ctx.save(); cokgen(ctx, gov); ctx.clip(); karala(x - ust1, g0, x + ust1, g1, karis(ust, '#000000', 0.15), tohum + 9, 16, 5); ctx.restore();
    kalem(gov.concat([gov[0]]), '#2a2420', 6, 2, tohum);
    kalem([[x - boy * 0.07, g1], [x - boy * 0.085, taban]], alt, 15, 3, tohum + 1, 0.95);
    kalem([[x + boy * 0.07, g1], [x + boy * 0.085, taban]], alt, 15, 3, tohum + 2, 0.95);
    kalem([[x - ust0, g0 + 10], [x - boy * 0.27, ky + boy * 0.47]], ust, 13, 2, tohum + 3, 0.95);
    kalem([[x + ust0, g0 + 10], [x + boy * 0.27, ky + boy * 0.47]], ust, 13, 2, tohum + 4, 0.95);
    ctx.fillStyle = '#f2d2b8'; ctx.beginPath(); ctx.arc(x, ky + hr, hr, 0, TAU); ctx.fill();
    const kp = []; for (let i = 0; i <= 22; i++) { const a = i / 22 * TAU; kp.push([x + Math.cos(a) * hr, ky + hr + Math.sin(a) * hr * 1.04]); }
    kalem(kp, '#2a2420', 6, 2, tohum + 5);
    if (kiz) {
      kalem([[x - hr * 1.05, ky + hr * 2.6], [x - hr * 1.15, ky + hr * 0.6], [x - hr * 0.3, ky - hr * 0.12], [x + hr * 0.6, ky - hr * 0.05], [x + hr * 1.15, ky + hr * 0.6], [x + hr * 1.05, ky + hr * 2.6]], sac, 20, 3, tohum + 6, 0.92);
    } else kalem([[x - hr * 0.95, ky + hr * 0.7], [x - hr * 0.6, ky - hr * 0.02], [x + hr * 0.4, ky - hr * 0.08], [x + hr * 0.98, ky + hr * 0.6]], sac, 20, 3, tohum + 6, 0.95);
    ctx.fillStyle = '#1b1715';
    if (gozBos) { ctx.lineWidth = 4; ctx.strokeStyle = '#1b1715'; for (const s2 of [-1, 1]) { ctx.beginPath(); ctx.arc(x + s2 * hr * 0.36, ky + hr * 0.95, hr * 0.13, 0, TAU); ctx.stroke(); } }
    else { ctx.beginPath(); ctx.arc(x - hr * 0.36, ky + hr * 0.95, hr * 0.11, 0, TAU); ctx.arc(x + hr * 0.36, ky + hr * 0.95, hr * 0.11, 0, TAU); ctx.fill(); }
    kalem([[x - hr * 0.28, ky + hr * 1.5], [x + hr * 0.28, ky + hr * 1.5]], '#7a2a2a', 5, 1, tohum + 7);
  };
  insan(540, 600, '#4a2e1c', '#b9bec6', '#2b3656', false, 40);
  insan(225, 470, '#c9a052', '#7fb1e0', '#efe4cc', true, 20, false);
  insan(855, 470, '#c9a052', '#7fb1e0', '#efe4cc', true, 60, true);
  ctx.restore();
}
