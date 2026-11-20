// 06 — Ters Dönen Taht · sahneler. Zamanlar SENARYO.md ve veri/zaman_cizelgesi.json ile eşleşir.
'use strict';
const SURE = 98.5;
const kam3 = (keys, t, fn = ease) => { const [x, y, z] = kf(keys, t, fn); return { x, y, z }; };
const K1 = (keys, t, fn = easeS) => kf(keys, t, fn)[0];
const tepe1 = (t, c, w = .28) => Math.exp(-Math.pow((t - c) / w, 2));
const VALI = { ...ADAM, kaftan: '#5B3A72', kaftanK: '#3F2650', kaftanA: '#7C5A94', kulah: '#D4A84B', sarik: '#F4EAD0', sarikK: '#D8CBA6', kusak: '#D4A84B', kusakK: '#A97F2C', trim: '#F2D48A', buyukSarik: 1 };
const ZB = { ...ADAM, kaftan: '#6A4A32', kaftanK: '#4A3320', kaftanA: '#8A6648', sarik: '#CDBFA0', sarikK: '#A89A7C', kulah: '#3A2E24' };

// ───────── Nesneler ─────────
function taht(x, y, s, rot = 0, par = 1) { // (x,y) = tahtın merkezi
  X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s);
  if (par > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(0, 0, 2.6, '#FFD98A', .35 * par); X.restore(); }
  X.beginPath(); X.moveTo(-.8, .5); X.lineTo(-.8, -.7); X.bezierCurveTo(-.8, -1.15, -.35, -1.3, 0, -1.4); X.bezierCurveTo(.35, -1.3, .8, -1.15, .8, -.7); X.lineTo(.8, .5); X.closePath();
  X.fillStyle = dGrad(-.8, 0, .8, 0, [[0, '#A97F2C'], [.5, '#EBCB7E'], [1, '#A97F2C']]); X.fill(); X.strokeStyle = '#7A5A20'; X.lineWidth = .04; X.stroke();
  X.beginPath(); X.moveTo(-.6, .4); X.lineTo(-.6, -.65); X.bezierCurveTo(-.6, -1.0, -.3, -1.1, 0, -1.2); X.bezierCurveTo(.3, -1.1, .6, -1.0, .6, -.65); X.lineTo(.6, .4); X.closePath(); X.fillStyle = dGrad(0, -1.2, 0, .4, [[0, '#8A2A2E'], [1, '#5A1A22']]); X.fill();
  daire(0, -.55, .16); doldur('#F2C84A'); daire(0, -.55, .08); doldur('#C83A4A');
  X.fillStyle = dGrad(0, .5, 0, .95, [[0, '#EBCB7E'], [1, '#A97F2C']]); X.fillRect(-.95, .5, 1.9, .42); X.fillStyle = '#B8333E'; X.beginPath(); X.roundRect(-.8, .36, 1.6, .2, .06); X.fill();
  for (const sd of [-1, 1]) { X.fillStyle = '#C9A04A'; X.fillRect(sd * .95 - .08, .05, .16, .5); X.fillRect(sd * .78 - .09, .92, .18, .38); daire(sd * .95, .02, .1); doldur('#F2C84A'); }
  daire(0, -1.45, .12); doldur('#F2C84A');
  X.restore();
}
function kese(x, y, s, par = 1) {
  X.save(); X.translate(x, y); X.scale(s, s);
  if (par > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(0, -.3, 2, '#FFD98A', .5 * par); X.restore(); }
  for (let i = 0; i < 6; i++) { elips(-.28 + i * .12, -.78 - (i % 2) * .06, .08, .045, .3 * (i % 2 ? 1 : -1)); doldur(i % 2 ? '#F7DE9A' : '#D9AB4B'); }
  X.beginPath(); X.moveTo(-.2, -.7); X.bezierCurveTo(-.9, -.2, -.85, .55, -.3, .62); X.lineTo(.3, .62); X.bezierCurveTo(.85, .55, .9, -.2, .2, -.7); X.closePath();
  X.fillStyle = dGrad(-.8, -.6, .8, .6, [[0, '#8A5A34'], [.5, '#B07A44'], [1, '#6A4226']]); X.fill(); X.strokeStyle = '#4A2E18'; X.lineWidth = .04; X.stroke();
  X.beginPath(); X.moveTo(-.3, -.64); X.quadraticCurveTo(0, -.5, .3, -.64); cizgi('#E2C27A', .06); daire(.0, -.52, .07); doldur('#E2C27A');
  X.restore();
}
function ruyaBaloncugu(cx, cy, rx, ry, t, ic, a = 1) {
  X.save(); X.globalAlpha = a;
  for (const [dx, dy, r] of [[-rx * .8, ry * 1.1, 14], [-rx * .6, ry * 1.35, 9], [-rx * .45, ry * 1.55, 5]]) { daire(cx + dx, cy + dy, r); doldur('#E8E2F6', .9); }
  elips(cx, cy, rx + 14, ry + 14); doldur('#CFC6EA', .7); elips(cx, cy, rx, ry); X.fillStyle = dGrad(0, cy - ry, 0, cy + ry, [[0, '#2A2450'], [1, '#6A5A98']]); X.fill();
  X.save(); elips(cx, cy, rx, ry); X.clip(); X.translate(cx, cy); ic(); X.restore(); elips(cx, cy, rx, ry); cizgi('#F2EEFF', 3, .8);
  X.restore();
}
function zindan(t, o = {}) { // ekran koordinatları (kamera 540,960)
  X.fillStyle = dGrad(0, 0, 0, 1300, [[0, '#2A2622'], [1, '#3E3630']]); X.fillRect(-300, -300, 1700, 1700);
  X.strokeStyle = 'rgba(14,10,8,.55)'; X.lineWidth = 3; for (let y = 0; y < 1260; y += 70) { X.beginPath(); X.moveTo(-300, y); X.lineTo(1400, y); X.stroke(); for (let x = -300 + ((y / 70) % 2 ? 0 : 60); x < 1400; x += 120) { X.beginPath(); X.moveTo(x, y); X.lineTo(x, y + 70); X.stroke(); } }
  const r = rng(5); for (let i = 0; i < 60; i++) { leke(r() * 1100 - 20, r() * 1250, 12 + r() * 30, 8 + r() * 14, 100 + i, 6, .3); doldur('#1E1812', .22); }
  // pencere ve ay ışığı
  X.beginPath(); X.moveTo(640, 520); X.lineTo(640, 260); X.arc(760, 260, 120, Math.PI, 0); X.lineTo(880, 520); X.closePath(); X.fillStyle = dGrad(0, 130, 0, 520, [[0, '#14243E'], [1, '#2C4670']]); X.fill();
  X.save(); X.clip(); ay(800, 250, 30, .9); yildizlar(14, 3, t, 640, 140, 240, 300, .8); X.restore();
  X.strokeStyle = '#1A1612'; X.lineWidth = 9; for (let k = 0; k < 4; k++) { X.beginPath(); X.moveTo(680 + k * 40, 150); X.lineTo(680 + k * 40, 520); X.stroke(); } X.beginPath(); X.moveTo(640, 340); X.lineTo(880, 340); X.stroke(); X.strokeStyle = '#4A4036'; X.lineWidth = 14; X.beginPath(); X.moveTo(630, 526); X.lineTo(890, 526); X.stroke();
  isikHuzmesi(760, 400, 420, 1300, 110, 280, '#9FB6E0', .16 + (o.isik || 0) * .1);
  // demir kapı
  const ac = o.kapi || 0; X.fillStyle = '#16120E'; X.fillRect(40, 620, 250, 640); X.fillStyle = dGrad(40, 0, 290, 0, [[0, '#4A4038'], [1, '#2A241E']]); X.fillRect(40, 620, 250 * (1 - ac * .8), 640);
  X.strokeStyle = '#1A1612'; X.lineWidth = 8; for (let k = 0; k < 5; k++) { X.beginPath(); X.moveTo(60 + k * 46 * (1 - ac * .8), 640); X.lineTo(60 + k * 46 * (1 - ac * .8), 1240); X.stroke(); }
  if (ac > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(180, 900, 700, '#FFC070', .5 * ac); X.restore(); }
  // zemin
  X.fillStyle = dGrad(0, 1260, 0, 1920, [[0, '#4A3E2E'], [1, '#2A2218']]); X.fillRect(-300, 1260, 1700, 800);
  for (let i = 0; i < 90; i++) { const x = r() * 1100, y = 1280 + r() * 600; X.strokeStyle = `rgba(200,170,100,${.2 + r() * .3})`; X.lineWidth = 2; X.beginPath(); X.moveTo(x, y); X.lineTo(x + (r() - .5) * 60, y - 8 - r() * 14); X.stroke(); }
}
function sarayHavasi(kam, t, g, o = {}) { odaCiz(t, g, { sini: o.sini, ...o }); }

// ───────── S1 · Hapse atılan adam (0–6.3) ─────────
const S01 = { ad: 'Zindan', bas: 0, son: 6.3, ciz(t) {
  const kam = kam3([[-.3, 540, 960, 1.0], [6.9, 540, 1000, 1.15]], t, easeS);
  katman(kam, 1, () => { zindan(t); insanOturan({ x: 480, y: 1330, s: 96, yon: 1, t, kolO: [.3, -.5], kolA: [.3, -.4], egim: .22 + Math.sin(t * .6) * .01, tohum: 4 }); });
} };
// ───────── S2 · Gece dua (6.3–10.4) ─────────
const S02 = { ad: 'Dua', bas: 6.3, son: 10.4, ciz(t) {
  const kam = kam3([[5.9, 540, 1000, 1.1], [10.9, 540, 1080, 1.4]], t, easeS), dua = sm(6.6, 7.6, t), isik = sm(7.0, 9.5, t);
  katman(kam, 1, () => {
    zindan(t, { isik });
    insanOturan({ x: 480, y: 1330, s: 96, yon: 1, t, kolO: [.5 + dua * .9, -1.0 + dua * .2], kolA: [.5 + dua * .9, -.9 + dua * .2], egim: -.06 * dua + .1 * (1 - dua), tohum: 4 });
    X.save(); X.globalCompositeOperation = 'screen'; parilti(500, 1050, 520, '#FFD98A', .45 * isik); X.restore(); nur(500, 800, 160, 900, .35 * isik);
    for (let i = 0; i < 4; i++) { const t0 = 7.0 + i * 1.0, u = t - t0; if (u < 0 || u > 1.8) continue; const px = 540 + i * 4, py = 1110 + u * 100, a = Math.sin(u / 1.8 * Math.PI); X.save(); X.globalCompositeOperation = 'screen'; parilti(px, py, 18, '#CFE8FF', .7 * a); X.restore(); }
  });
} };
// ───────── Saray yatak odası: rüya baloncuğu ─────────
function yatakOdasi(t, kam, vali, ic, ruya = 1, o = {}) {
  katman(kam, 1, () => {
    odaCiz(t, K1([[10, .92], [32, .5]], t), { sini: false });
    insanOturan({ x: 560, y: 660, s: 78, yon: -1, t, pal: VALI, ...vali });
    if (ruya > 0) ruyaBaloncugu(760, 20, 230, 170, t, ic, ruya);
  });
}
const sallan = t => Math.sin(t * 2) * .02;
// ───────── S3 · Valinin rüyası: ters çevrilen taht (10.4–15.5) ─────────
const S03 = { ad: 'Rüya', bas: 10.4, son: 15.5, ciz(t) {
  const kam = kam3([[10.0, 560, 230, 1.15], [16.0, 600, 230, 1.28]], t, easeS), uy = sm(12.7, 13.1, t);
  yatakOdasi(t, kam, { kolO: [.3 + uy * 1.0, -.6], kolA: [.3 + uy * 1.0, -.5], egim: .32 * (1 - uy) - .1 * uy + sallan(t), tohum: 8 }, () => { taht(0, 0, 70, Math.PI * sm(14.2, 15.1, t), 1); }, 1);
} };
// ───────── S4 · Üstüne yürüyenler, ödü patlıyor (15.5–19.8) ─────────
const S04 = { ad: 'Yürüyenler', bas: 15.5, son: 19.8, ciz(t) {
  const kam = kam3([[15.1, 600, 230, 1.28], [20.3, 560, 240, 1.2]], t, easeS), uy = sm(17.9, 18.3, t);
  yatakOdasi(t, kam, { kolO: [.3 + uy * 1.2, -.6], kolA: [.3 + uy * 1.2, -.5], egim: .3 * (1 - uy) - .14 * uy, tohum: 8 }, () => {
    const u = clamp((t - 15.8) / 2.2); for (let i = 0; i < 14; i++) { const k = (i % 7) / 7, y = lerp(-20, 100, u) + (hash(i) - .5) * 40 + (i > 6 ? 30 : 0), x = (-190 + i % 7 * 63) * (.4 + u * 1.2); kisi(x, y + 40, 40 + u * 90, '#0E0A1C', 1, t, i); }
  }, 1 - sm(18.9, 19.5, t));
} };
// ───────── S5 · Taş, taht, kendi bir tarafta (19.8–22.4) ─────────
const S05 = { ad: 'Dağılma', bas: 19.8, son: 22.4, ciz(t) {
  const kam = kam3([[19.4, 540, 960, 1.0], [22.9, 540, 960, 1.1]], t, easeS), a = sm(20.3, 21.9, t);
  katman(kam, 1, () => {
    gokyuzu([[0, '#1A1440'], [.5, '#3E2E6E'], [1, '#6A4A8A']]); yildizlar(80, 7, t, 0, 0, 1080, 1000, .8);
    sis(900, 80, t, 20, .3, '#B9A2C8', 1);
    taht(260 - a * 70, 760 - a * 30, 120, -a * 2.4 + Math.sin(t * 2) * .05, 1);
    X.save(); X.translate(560, 820 + Math.sin(t * 2.4) * 18); X.rotate(Math.sin(t * 1.5) * .3); leke(0, 0, 90, 70, 21, 9, .25); doldur('#6A6470'); leke(-14, -16, 50, 34, 22, 8, .25); doldur('#8A8494'); X.restore();
    insanAyakta({ x: 820 + a * 60, y: 1100 - Math.abs(Math.sin(t * 2)) * 30, s: 56, yon: -1, t, pal: VALI, kolO: [1.4, .3], kolA: [1.2, .3], egim: .4 * Math.sin(t * 3), tohum: 8 });
  });
} };
// ───────── S6 · Salavat, aynı rüya (22.4–28.9) ─────────
const S06 = { ad: 'Salavat', bas: 22.4, son: 28.9, ciz(t) {
  const kam = kam3([[22.0, 560, 240, 1.2], [29.4, 600, 230, 1.3]], t, easeS), dua = sm(23.4, 24.2, t) * (1 - sm(24.9, 25.4, t)), uyu = sm(25.0, 25.5, t);
  yatakOdasi(t, kam, { kolO: [.5 + dua * .9, -1.0], kolA: [.5 + dua * .9, -.9], egim: .06 * (1 - uyu) + .3 * uyu, tohum: 8 }, () => { taht(0, 0, 70, Math.PI * sm(26.1, 26.9, t), 1); }, sm(25.6, 26.1, t));
} };
// ───────── S7 · Üçüncü kez: net mesaj (28.9–32.0) ─────────
const S07 = { ad: 'Mesaj', bas: 28.9, son: 32.0, ciz(t) {
  const kam = kam3([[28.5, 600, 230, 1.3], [32.5, 600, 230, 1.4]], t, easeS), uy = sm(29.2, 29.6, t), ic = sm(29.5, 30.3, t);
  yatakOdasi(t, kam, { kolO: [lerp(.3, .6, uy) + sm(30.8, 31.4, t) * .9, lerp(-.6, .5, sm(30.8, 31.4, t))], kolA: [.4, -.4], egim: .28 * (1 - uy) - .06 * sm(30.8, 31.4, t), tohum: 8 }, () => { for (let i = 0; i < 3; i++) { const a = sm(29.7 + i * .35, 30.3 + i * .35, t); X.save(); X.globalAlpha = a; taht(-120 + i * 120, 0, 42, Math.PI, 1); X.restore(); } }, ic > 0 ? 1 : 0);
} };
// ───────── Divan salonu ─────────
function divan(t, kam, g, vali, adam, zb, ek) {
  katman(kam, 1, () => {
    odaCiz(t, g, { sini: false }); taht(770, 250, 96, 0, .5);
    if (adam) insanAyakta({ x: 330, y: 610, s: 70, yon: 1, t, ...adam });
    if (zb) insanAyakta({ x: 400, y: 620, s: 68, yon: 1, t, pal: ZB, ...zb });
    insanOturan({ x: 770, y: 345, s: 58, yon: -1, t, pal: VALI, ...(vali || {}) });
    if (ek) ek();
  });
}
// ───────── S8 · Zindancıbaşı haber verir (32.0–38.0) ─────────
const S08 = { ad: 'Divan', bas: 32.0, son: 38.0, ciz(t) {
  const kam = kam3([[31.6, 560, 280, 1.2], [38.5, 600, 280, 1.3]], t, easeS), konus = sm(35.5, 36.0, t);
  divan(t, kam, .2, { kolO: [lerp(.5, 1.0, tepe1(t, 33.6, .5)), -.8], kolA: [.5, -.7], egim: .04, tohum: 8 }, null, { kolO: [.4 + konus * .5, .5], kolA: [.2, .4], egim: .08, tohum: 5 });
} };
// ───────── S9 · Zindan kapısı açılır (38.0–41.4) ─────────
const S09 = { ad: 'Çağrı', bas: 38.0, son: 41.4, ciz(t) {
  const kam = kam3([[37.6, 540, 1000, 1.1], [41.9, 480, 1020, 1.2]], t, easeS), kapi = sm(39.4, 40.6, t), kalk = sm(40.2, 41.2, t);
  katman(kam, 1, () => { zindan(t, { kapi, isik: 1 }); insanOturan({ x: 560, y: 1330, s: 96, yon: 1, t, kolO: [1.4, -.8 + kalk * .6], kolA: [1.4, -.7 + kalk * .6], egim: -.06 - kalk * .1, tohum: 4 }); X.save(); X.globalCompositeOperation = 'screen'; parilti(520, 1100, 520, '#FFD98A', .35); X.restore(); });
} };
// ───────── S10 · Haksız yere gelmiş (41.4–46.5) ─────────
function karsilasma(t, kam, vali, adam, ek) {
  katman(kam, 1, () => { odaCiz(t, .25, { sini: false }); insanAyakta({ x: 330, y: 610, s: 74, yon: 1, t, ...adam }); insanAyakta({ x: 640, y: 610, s: 74, yon: -1, t, pal: VALI, ...vali }); if (ek) ek(); });
}
const S10 = { ad: 'Hakkın', bas: 41.4, son: 46.5, ciz(t) {
  const kam = kam3([[41.0, 480, 270, 1.25], [47.0, 490, 280, 1.4]], t, easeS);
  karsilasma(t, kam, { kolO: [.1 + sm(42.0, 42.8, t) * .8, .3], kolA: [.1, .3], egim: .08 * sm(43.5, 44.5, t), tohum: 8 }, { kolO: [.05, .22], kolA: [-.05, .2], egim: .03, tohum: 4 });
} };
// ───────── S11 · Bizi bağışlayın, misafirimizsiniz (46.5–51.0) ─────────
const S11 = { ad: 'Bağışlayın', bas: 46.5, son: 51.0, ciz(t) {
  const kam = kam3([[46.1, 490, 280, 1.4], [51.5, 480, 270, 1.3]], t, easeS), el = sm(46.8, 47.5, t);
  karsilasma(t, kam, { kolO: [.3 + el * .6, 1.6 * el + .3], kolA: [.2 + el * .5, 1.5 * el + .3], egim: .1 * el + .06 * sm(49.5, 50.3, t), tohum: 8 }, { kolO: [.5 * sm(49.8, 50.5, t), .3], kolA: [-.05, .2], egim: .03, tohum: 4 });
} };
// ───────── S12 · Vali konağında ağırlayacağım (51.0–54.0) ─────────
const S12 = { ad: 'Konak', bas: 51.0, son: 54.0, ciz(t) {
  const kam = kam3([[50.6, 160, 300, 1.3], [54.5, 170, 300, 1.4]], t, easeS);
  katman(kam, 1, () => { odaCiz(t, .3); insanOturan({ x: -20, y: 650, s: 74, yon: 1, t, kolO: [.5, -.6], kolA: [.4, -.5], egim: .03, tohum: 4 }); insanOturan({ x: 310, y: 655, s: 76, yon: -1, t, pal: VALI, kolO: [.9 * sm(52.6, 53.3, t) + .3, -.4], kolA: [.4, -.5], egim: .05, tohum: 8 }); });
} };
// ───────── Hediye sahneleri ─────────
function hediye(t, kam, vali, adam, keseX, keseY, keseS, par) {
  katman(kam, 1, () => { odaCiz(t, .3); insanOturan({ x: -20, y: 650, s: 74, yon: 1, t, pal: ADAM, ...adam }); insanOturan({ x: 310, y: 655, s: 76, yon: -1, t, pal: VALI, ...vali }); if (keseS > 0) kese(keseX, keseY, keseS, par); });
}
const S13 = { ad: 'Kese', bas: 54.0, son: 60.2, ciz(t) {
  const kam = kam3([[53.6, 160, 330, 1.35], [60.7, 150, 340, 1.55]], t, easeS), uzat = sm(54.4, 55.2, t);
  hediye(t, kam, { kolO: [.4 + uzat * 1.0, -.2], kolA: [.4, -.5], egim: .05, tohum: 8 }, { kolO: [.5, -.5], kolA: [.4, -.5], egim: .03 + sm(57.8, 58.8, t) * .03, tohum: 4 }, lerp(300, 150, uzat), lerp(560, 520, uzat), 40, sm(55.0, 56.0, t));
} };
const S14a = { ad: 'Kırmayın', bas: 60.2, son: 65.5, ciz(t) {
  const kam = kam3([[59.8, 150, 340, 1.55], [66.0, 120, 340, 1.6]], t, easeS);
  hediye(t, kam, { kolO: [1.2, -.2], kolA: [.4, -.5], egim: .08 * Math.sin(t) * 0 + .06, tohum: 8 }, { kolO: [.5, -.5], kolA: [.4, -.5], egim: .03, tohum: 4 }, 150, 520, 40, 1);
} };
const S14b = { ad: 'Acizane', bas: 65.5, son: 71.0, ciz(t) {
  const kam = kam3([[65.1, 290, 330, 1.6], [71.5, 300, 330, 1.45]], t, easeS), go = sm(68.4, 69.2, t);
  hediye(t, kam, { kolO: [1.2 - go * .6, -.2 + go * 1.9], kolA: [.4, -.5], egim: .06 + go * .06, tohum: 8 }, { kolO: [.5, -.5], kolA: [.4, -.5], egim: .03, tohum: 4 }, 150, 520, 40, 1 - go);
} };
const S15a = { ad: 'Helal', bas: 71.0, son: 75.5, ciz(t) {
  const kam = kam3([[70.6, 40, 330, 1.45], [75.9, 60, 330, 1.55]], t, easeS), h = sm(72.9, 73.6, t);
  hediye(t, kam, { kolO: [.4, -.5], kolA: [.4, -.5], egim: .02, tohum: 8 }, { kolO: [.1 + h * .5, .3 + h * 1.7], kolA: [.4, -.5], egim: .05 * h, tohum: 4 }, 150, 520, 40, 1);
} };
const S15b = { ad: 'Kabul', bas: 75.5, son: 80.1, ciz(t) {
  const kam = kam3([[75.1, 60, 330, 1.55], [80.6, 80, 330, 1.45]], t, easeS), al = sm(76.2, 77.0, t);
  hediye(t, kam, { kolO: [.4, -.5], kolA: [.4, -.5], egim: .02, tohum: 8 }, { kolO: [.6 + al * .6, -.4 + al * .8], kolA: [.4, -.5], egim: .04, tohum: 4 }, lerp(150, -40, al), lerp(520, 570, al) - al * 40, 40 * (1 - sm(77.4, 78.2, t)), 1);
} };
const S16 = { ad: 'Niye', bas: 80.1, son: 86.0, ciz(t) {
  const kam = kam3([[79.7, 80, 330, 1.45], [86.5, 100, 330, 1.6]], t, easeS), sal = Math.sin(t * 5) * .06 * sm(81.6, 82.6, t) * (1 - sm(83.2, 83.8, t));
  hediye(t, kam, { kolO: [.5, -.3 + tepe1(t, 83.4, .6) * 1.3], kolA: [.4, -.5], egim: .04, tohum: 8 }, { kolO: [.5 + sm(80.4, 81.0, t) * .5, .3], kolA: [.4, -.5], egim: sal, tohum: 4 }, 0, 0, 0, 0);
} };
// ───────── S17 · Üç defa ters dönen taht (86.0–90.2) ─────────
const S17 = { ad: 'Tevekkül', bas: 86.0, son: 90.2, ciz(t) {
  const kam = kam3([[85.6, 540, 900, 1.0], [90.7, 540, 880, 1.1]], t, easeS), a = sm(86.2, 87.4, t);
  katman(kam, 1, () => {
    gokyuzu([[0, '#0B1630'], [.5, '#1E3458'], [1, '#2A4670']]); yildizlar(200, 31, t, 0, 0, 1080, 1100, 1); ay(220, 220, 56, 1);
    for (let i = 0; i < 3; i++) { const t0 = 86.9 + i * .9, u = clamp((t - t0) / 1.0); if (t < t0 - .1) continue; X.save(); X.globalAlpha = Math.min(1, (t - t0 + .1) * 3); taht(300 + i * 240, 460 - i * 40, 62, Math.PI * easeS(u) + i * 0, 1); X.restore(); }
    nur(560, 900, 220, 1200, .35 * a);
    X.fillStyle = dGrad(0, 1100, 0, 1920, [[0, '#142238'], [1, '#08101C']]); X.fillRect(0, 1100, 1080, 900);
    insanArka({ x: 560, y: 1400, s: 92, t, faz: 0, yur: 0, pal: ADAM });
    X.save(); X.globalCompositeOperation = 'screen'; parilti(560, 1100, 520, '#FFE3A0', .35 * a); X.restore();
  });
} };
// ───────── S18 · Kapanış (90.2–98.5) ─────────
const S18 = { ad: 'Kapanış', bas: 90.2, son: SURE, ciz(t) {
  const kam = kam3([[89.8, 0, 330, 1.1], [SURE + .5, 0, 250, 1.0]], t, easeS);
  gokyuzu([[0, '#0B1630'], [.35, '#15294A'], [.52, '#24426A'], [.6, '#35567E'], [1, '#1C2E48']]);
  katman(kam, .02, () => yildizlar(240, 23, t, -800, -1300, 1600, 1150, 1)); katman(kam, .05, () => ay(240, 40, 70, 1));
  katman(kam, .18, () => tepe(-1800, 1800, 150, 90, 380, 831, '#1C2C46'));
  katman(kam, .35, () => { tepe(-1800, 1800, 290, 40, 300, 833, '#13213A'); for (let i = 0; i < 9; i++) selvi(-980 + i * 250, 300, 170 + hash(i) * 50, t, i, '#0C141E', '#16222E'); camiSilueti(420, 300, .7, '#101C30', 1, t); });
  katman(kam, 1, () => {
    X.fillStyle = dGrad(0, 460, 0, 1300, [[0, '#142238'], [1, '#08101C']]); X.fillRect(-1800, 460, 3600, 900);
    X.fillStyle = dGrad(150, 0, 330, 0, [[0, '#F6ECCD', 0], [.5, '#F6ECCD', .38], [1, '#F6ECCD', 0]]); X.fillRect(150, 460, 180, 700);
    for (let i = 0; i < 26; i++) { const y = 480 + i * 28, w = 40 + i * 6; X.strokeStyle = `rgba(246,236,205,${.26 - i * .008})`; X.lineWidth = 2; X.beginPath(); X.moveTo(240 - w * (.5 + hash(i) * .5) + Math.sin(t * .8 + i) * 10, y); X.lineTo(240 + w * (.5 + hash(i + 9) * .5) + Math.sin(t * .8 + i) * 10, y); X.stroke(); }
    for (let i = 0; i < 12; i++) { const b = hash(i + 3) * 8, u = ((t - 91 + b) * .05 + hash(i) * .5) % 1, x = -500 + hash(i + 11) * 1000 + Math.sin(u * 6 + i) * 30, y = 520 - u * 1500; gokFeneri(x, y, 14 + hash(i + 19) * 12, t, i + 2, .9 * Math.sin(Math.min(1, u * 5) * Math.PI / 2) * (1 - u * .4), 0); }
    atesBocekleri(18, 411, t, -600, 600, 1200, 600, .9);
  });
  katman(kam, 1.3, () => { tepe(-1300, 1300, 1050, 30, 220, 835, '#0C1422'); selvi(-480, 1000, 700, t, 3, '#0A121C', '#142030'); selvi(520, 1010, 620, t, 4, '#0A121C', '#142030'); });
  const ky = sm(90.7, 91.9, t); if (ky > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = dGrad(0, 120, 0, 1000, [[0, '#060C1C', 0], [.25, '#060C1C', .34 * ky], [.75, '#060C1C', .3 * ky], [1, '#060C1C', 0]]); X.fillRect(0, 0, W, H); X.restore(); }
} };

const SAHNELER = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14a, S14b, S15a, S15b, S16, S17, S18];
const KAPANIS = [
  { m: 'Benim gibi bir gariban için', tur: 'k', t: 91.0 },
  { m: 'valinin tahtını üç defa', tur: 'b', t: 91.5 },
  { m: 'tersine çeviren Allah var.', tur: 'b', t: 92.0 },
  { m: 'Ben başka kapı', tur: 'k', t: 93.0 },
  { m: 'çalar mıyım?', tur: 'b', t: 93.5 }
];
function ustKatman(t) {
  if (t < 5) girisBasligi(t, { ust: 'HİKMETLİ KARELER', baslik: 'Ters Dönen Taht', y: 400, bitis: 4.6, renk: '#F6EBCB', ustRenk: '#D4A84B' });
  if (t < 90.6) altyazi(t, window.ZAMAN.satirlar);
  if (t > 90.4) kapanisYazisi(t, KAPANIS, 95.2, '@1dkdua', 210);
  const k = Math.max(1 - clamp(t / .45), sm(97.65, 98.5, t));
  if (k > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = `rgba(6,8,14,${k})`; X.fillRect(0, 0, W, H); X.restore(); }
}
window.ciz = t => { X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none'; kareCiz(t, SAHNELER, ustKatman); };
