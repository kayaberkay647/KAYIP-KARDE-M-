// 05 — Mezar Başında · sahneler. Zamanlar SENARYO.md ve veri/zaman_cizelgesi.json ile eşleşir.
// Kabir içi yalnızca ışık ve boş niş olarak gösterilir; bedeni olan hiçbir figür çizilmez.
'use strict';
const SURE = 55.5;
const kam3 = (keys, t, fn = ease) => { const [x, y, z] = kf(keys, t, fn); return { x, y, z }; };
const K1 = (keys, t, fn = easeS) => kf(keys, t, fn)[0];
const tepe1 = (t, c, w = .28) => Math.exp(-Math.pow((t - c) / w, 2));
const HACI = { ...FAKIR, sakal: '#EDEAE2', kas: '#E2DCD0', sarik: '#F4F0E8', sarikK: '#D6CFBF', kulah: '#F4F0E8', kaftan: '#6A6250', kaftanK: '#4C4638', kaftanA: '#857C66' };
// ───────── Vakit paletleri ─────────
const SAAT = {
  ikindi: { gok: [[0, '#DCC8A2'], [.3, '#EBD2A4'], [.5, '#F2CA92'], [.62, '#F0BA84'], [1, '#E2B07E']], uzak: '#B5A592', orta: '#9A9868', zemin: '#7E8A4C', zeminK: '#5E6B34', tas: '#DDD3BF', selvi: ['#4F5C34', '#6E7B47'], gunes: [300, -30, '#FFF1C9', '#FFD99A'], bulut: '#FFF4DF' },
  aksam: { gok: [[0, '#5E5478'], [.35, '#A9808A'], [.55, '#E0A585'], [1, '#C98C70']], uzak: '#8A7480', orta: '#686458', zemin: '#5C603A', zeminK: '#40452A', tas: '#C9BDAE', selvi: ['#353C2C', '#4A5038'], bulut: '#E9BFA6' },
  gece: { gok: [[0, '#0B1630'], [.4, '#15294A'], [.58, '#26426A'], [1, '#1A2C46']], uzak: '#1C2C46', orta: '#16243A', zemin: '#14202E', zeminK: '#0E1622', tas: '#8C94A6', selvi: ['#0E1622', '#1A2638'] },
  safak: { gok: [[0, '#9DB9C4'], [.3, '#DCD6C4'], [.5, '#F4D2AC'], [.6, '#F6C69C'], [1, '#E9B88C']], uzak: '#B6A9B2', orta: '#98A07A', zemin: '#83904E', zeminK: '#62703A', tas: '#E4DAC8', selvi: ['#4F5C34', '#6E7B47'], gunes: [260, 40, '#FFF2D0', '#FFD2A0'], bulut: '#FFF7E8' }
};
const TAS_TUR = ['sarik', 'fes', 'cicek', 'sade', 'sarik', 'cicek'];
// Mezarlık sahnesi. o: {odak:[x,y], bosluk, tasTur, ayX, ayY, on(), yuzeyCicek, odakIsik, bulutYok}
function mezarlik(kam, t, sa, o = {}) {
  const p = SAAT[sa], gece = sa === 'gece';
  gokyuzu(p.gok);
  if (gece) { katman(kam, .02, () => yildizlar(220, 11, t, -700, -1200, 1400, 1100)); katman(kam, .05, () => ay(o.ayX ?? 300, o.ayY ?? -420, 58, .9)); }
  else if (p.gunes) katman(kam, .04, () => gunes(p.gunes[0], p.gunes[1], 54, p.gunes[2], p.gunes[3], .9));
  if (p.bulut && !o.bulutYok) katman(kam, .08, () => { bulut(-330 + t * 7, -620, 360, 41, p.bulut, .75, mix(p.bulut, '#C9A08E', .35)); bulut(300 + t * 5, -760, 300, 43, p.bulut, .6, mix(p.bulut, '#C9A08E', .35)); });
  katman(kam, .15, () => {
    tepe(-1700, 1700, 70, 90, 340, 201, p.uzak);
    // uzak kasaba ve minare silueti
    const c = koyu(p.uzak, .12);
    for (let i = 0; i < 8; i++) { X.fillStyle = rgb(c); X.fillRect(-470 + i * 34, 30 - (i % 3) * 8, 28, 40 + (i % 3) * 8); }
    X.fillStyle = rgb(c); X.fillRect(-330, -110, 12, 140); X.beginPath(); X.moveTo(-333, -110); X.lineTo(-324, -150); X.lineTo(-315, -110); X.fill(); X.fillRect(-338, -60, 28, 6);
    X.beginPath(); X.arc(-250, 30, 44, Math.PI, 0); X.fill();
  });
  katman(kam, .35, () => {
    tepe(-1700, 1700, 190, 40, 280, 203, p.orta);
    for (let i = 0; i < 16; i++) { const x = -900 + i * 120 + (hash(i) - .5) * 40; selvi(x, tepeY(x, 190, 40, 280, 203) + 6, 90 + hash(i + 3) * 60, t, i, koyu(p.selvi[0], .05), p.selvi[1]); }
    for (let i = 0; i < 22; i++) { const x = -1000 + i * 92 + hash(i + 50) * 30; mezarTasi(x, tepeY(x, 190, 40, 280, 203) + 14, (46 + hash(i) * 14) * (o.tasOlcek || 1), o.tasTur || TAS_TUR[i % 6], (hash(i + 7) - .5) * .14, koyu(p.tas, .12), i, .9); }
  });
  katman(kam, 1, () => {
    tepe(-1600, 1600, 480, 26, 420, 205, p.zemin); X.fillStyle = dGrad(0, 460, 0, 1200, [[0, p.zemin], [1, p.zeminK]]); X.fillRect(-1600, 470, 3200, 900);
    cimen(-1300, 1300, 475, 22, 9, t, 207, koyu(p.zemin, .1), .8);
    const r = rng(209), [ox, oy] = o.odak || [0, 640], bos = o.bosluk ?? 260;
    for (const [yy, n, ss] of [[505, 12, 112], [560, 10, 140]]) for (let i = 0; i < n; i++) {
      const x = -1150 + i * (2300 / n) + (r() - .5) * 60, tur = o.tasTur || TAS_TUR[(i + n) % 6], eg = (r() - .5) * .16, sc = ss * (.85 + r() * .3) * (o.tasOlcek || 1);
      if (Math.abs(x - ox) < bos && yy > oy - 140) continue;
      kabirYeri(x - sc * .4 / (o.tasOlcek || 1), yy + 6, sc * 1.6 / (o.tasOlcek || 1), koyu(p.zemin, .25), 0, i + yy, t); mezarTasi(x, yy, sc, tur, eg, p.tas, i * 3 + yy);
    }
    if (o.odak) { kabirYeri(ox - 40, oy + 8, 380, koyu(p.zemin, .2), o.yuzeyCicek || 0, 77, t); if (o.odakIsik) { X.save(); X.globalCompositeOperation = 'screen'; parilti(ox - 40, oy - 20, 360, '#FFD98A', .45 * o.odakIsik); X.restore(); } mezarTasi(ox + (o.odakTasBoy ? 90 : 120), oy - 20, o.odakTasBoy || 210, o.odakTas || 'cicek', -.02, p.tas, 91); }
    if (o.on) o.on();
  });
  katman(kam, 1.3, () => { tepe(-1300, 1300, 1010, 34, 220, 211, koyu(p.zeminK, .1)); cimen(-1000, 1000, 990, 70, 9, t, 213, koyu(p.zeminK, .05), .95); if (o.onPlan) o.onPlan(); });
}


function acikMezar(x, y, w, t, derin = 1) { // yeni kazılmış, boş mezar çukuru (yer düzleminde, yandan eğik)
  X.save(); X.translate(x, y);
  elips(0, 6, w * .62, w * .13); doldur('#5A4430');
  X.beginPath(); X.moveTo(-w * .5, 0); X.lineTo(w * .5, 0); X.lineTo(w * .42, w * .09 * derin); X.lineTo(-w * .42, w * .09 * derin); X.closePath(); X.fillStyle = dGrad(0, 0, 0, w * .1, [[0, '#1A100A'], [1, '#050302']]); X.fill();
  // toprak kümeleri (kenar)
  const r = rng(61); for (let i = 0; i < 16; i++) { const px = -w * .6 + r() * w * 1.2, py = -r() * w * .05; leke(px, py, 14 + r() * 24, 8 + r() * 12, 700 + i, 7, .35); doldur(mix('#7A5A3E', '#4A3424', r()), .95); }
  X.restore();
}
function ruzgarCizgi(t, x0, x1, y0, y1, n, seed, al) { const r = rng(seed); X.save(); X.lineCap = 'round'; for (let i = 0; i < n; i++) { const y = y0 + r() * (y1 - y0), L = 60 + r() * 120, x = x0 + ((r() * (x1 - x0) + t * (160 + r() * 140)) % (x1 - x0)); X.strokeStyle = rgb('#E8E2D4', al * (.3 + r() * .7)); X.lineWidth = 1.6; X.beginPath(); X.moveTo(x, y); X.quadraticCurveTo(x + L / 2, y - 8 + Math.sin(t + i) * 6, x + L, y); X.stroke(); } X.restore(); }
function gol(kam, t, g) {
  const [ust, alt] = gokV(g); gokyuzu([[0, ust], [.55, alt], [1, mix(alt, '#8A6A60', .35)]]);
  katman(kam, .05, () => gunes(-300, -110, 60, '#FFEBC0', '#FFC27E', 1 - g * 1.4));
  katman(kam, .15, () => tepe(-1800, 1800, 40, 120, 420, 901, mix('#E8E6EE', '#9A92A8', g)));
  katman(kam, .3, () => tepe(-1800, 1800, 160, 60, 360, 903, mix('#8A8A9A', '#4A4A66', g)));
  katman(kam, 1, () => { X.fillStyle = dGrad(0, 470, 0, 1000, [[0, mix('#9CC8D8', '#3A5070', g)], [1, mix('#5E94AE', '#223250', g)]]); X.fillRect(-1800, 470, 3600, 700); X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 22; i++) { const y = 490 + i * 20, w = 60 + i * 16; X.strokeStyle = `rgba(255,236,200,${(.3 - i * .012) * (1 - g * .5)})`; X.lineWidth = 2.2; X.beginPath(); X.moveTo(-300 - w * hash(i) + Math.sin(t + i) * 14, y); X.lineTo(-300 + w * hash(i + 9) + Math.sin(t + i) * 14, y); X.stroke(); } X.restore(); X.fillStyle = dGrad(0, 1000, 0, 1500, [[0, mix('#B8A27A', '#3A3226', g)], [1, mix('#8E7A56', '#262016', g)]]); X.fillRect(-1800, 1000, 3600, 700); });
}

const MZ = { odak: null, tasTur: null };
function mezarSahnesi(kam, t, sa, on, o = {}) { mezarlik(kam, t, sa, { bosluk: 0, on, tasOlcek: 1, ...o }); }
// ───────── S1 · Selam (0–3.6) ─────────
const S01 = { ad: 'Selam', bas: 0, son: 3.6, ciz(t) {
  const kam = kam3([[-.3, 0, 650, 1.1], [4.2, 0, 650, 1.2]], t, easeS);
  gol(kam, t, .5);
  katman(kam, 1, () => { insanAyakta({ x: 60, y: 1090, s: 72, yon: 1, t, kolO: [.7, 1.9], kolA: [-.05, .2], egim: .05 + tepe1(t, 1.6, .5) * .06, tohum: 4 }); });
} };
// ───────── S2 · "Bir mezar gösterdim. Yeni açılmış." (3.6–8.0) ─────────
const S02 = { ad: 'Mezar', bas: 3.6, son: 8.0, ciz(t) {
  const kam = kam3([[3.2, 0, 330, 1.1], [8.5, 40, 420, 1.3]], t, easeS), g = .4;
  mezarSahnesi(kam, t, 'ikindi', () => {
    acikMezar(150, 690, 380, t);
    insanAyakta({ x: -330, y: 700, s: 62, yon: 1, t, kolO: [.05, .22], kolA: [-.05, .2], egim: .03, tohum: 4 });
    insanAyakta({ x: -120, y: 712, s: 60, yon: 1, t, pal: HACI, kolO: K1([[3, .05], [4.4, .05], [5.0, 1.45], [8.5, 1.45]], t) > 0 ? [K1([[3, .05], [4.4, .05], [5.0, 1.45], [8.5, 1.45]], t), .2] : [.05, .2], kolA: [-.05, .2], egim: .02, tohum: 8 });
  });
} };
// ───────── S3 · Dişsiz bir ağız gibi (8.0–12.8) ─────────
const S03 = { ad: 'Çukur', bas: 8.0, son: 12.8, ciz(t) {
  const kam = kam3([[7.6, 140, 560, 1.3], [13.2, 150, 600, 1.75]], t, easeS);
  mezarSahnesi(kam, t, 'aksam', () => {
    acikMezar(150, 690, 520, t, 1.4);
    insanAyakta({ x: -190, y: 710, s: 62, yon: 1, t, kolO: [.05, .22], kolA: [-.05, .2], egim: .04, tohum: 4 });
    duman(150, 700, 300, 260, t, '#1A1410', .5, 5);
  });
} };
// ───────── S4 · "Aman ya Rabbi" (12.8–16.5) ─────────
const S04 = { ad: 'Rabbi', bas: 12.8, son: 16.5, ciz(t) {
  const kam = kam3([[12.4, 0, 440, 1.3], [17.0, 0, 450, 1.45]], t, easeS);
  mezarSahnesi(kam, t, 'aksam', () => { insanAyakta({ x: 0, y: 720, s: 92, yon: 1, t, kolO: [.6, 1.95], kolA: [-.05, .2], egim: .1 + Math.sin(t * 1.2) * .01, tohum: 4 }); acikMezar(330, 760, 400, t); });
} };
// ───────── S5 · Ürperdim (16.5–19.6) ─────────
const S05 = { ad: 'Ürperti', bas: 16.5, son: 19.6, ciz(t) {
  const kam = kam3([[16.1, 0, 450, 1.45], [20.1, 0, 360, 1.15]], t, easeS);
  mezarSahnesi(kam, t, 'gece', () => {
    X.save(); X.translate(Math.sin(t * 38) * 1.6 * sm(18.3, 18.8, t), 0); insanAyakta({ x: 0, y: 720, s: 84, yon: 1, t, kolO: [.55, 2.1], kolA: [.5, 2.0], egim: .08, tohum: 4 }); X.restore();
    acikMezar(330, 760, 400, t); ruzgarCizgi(t, -500, 500, 300, 700, 30, 3, .5);
  });
} };
// ───────── S6 · "Hacı amca dedim, burası için ne düşünüyorsun?" (19.6–22.4) ─────────
const S06 = { ad: 'Hacı amca', bas: 19.6, son: 22.4, ciz(t) {
  const kam = kam3([[19.2, 0, 430, 1.2], [22.9, 0, 440, 1.3]], t, easeS);
  mezarSahnesi(kam, t, 'aksam', () => {
    acikMezar(10, 780, 420, t);
    insanAyakta({ x: -190, y: 700, s: 70, yon: 1, t, kolO: [.4, 1.0], kolA: [-.05, .2], egim: .04, tohum: 4, agiz: 0 });
    insanAyakta({ x: 180, y: 705, s: 68, yon: -1, t, pal: HACI, kolO: [.05, .22], kolA: [-.05, .2], egim: .03, tohum: 8 });
  });
} };
// ───────── S7 · "Baktı, gülümsedi: zerre kadar korkum yok" (22.4–26.2) ─────────
const S07 = { ad: 'Gülümseme', bas: 22.4, son: 26.2, ciz(t) {
  const kam = kam3([[22.0, 60, 430, 1.3], [26.7, 130, 440, 1.6]], t, easeS), isik = sm(23.4, 25.2, t);
  mezarSahnesi(kam, t, 'aksam', () => {
    acikMezar(-140, 780, 420, t);
    insanAyakta({ x: -250, y: 700, s: 70, yon: 1, t, kolO: [.4, 1.0], kolA: [-.05, .2], egim: .04, tohum: 4 });
    insanAyakta({ x: 190, y: 705, s: 76, yon: -1, t, pal: HACI, kolO: K1([[22, .05], [24.5, .05], [24.9, 1.2], [26.8, 1.2]], t) > 0 ? [K1([[22, .05], [24.5, .05], [24.9, 1.2], [26.8, 1.2]], t), .6] : [.05, .2], kolA: [-.05, .2], egim: -.03, tohum: 8, agiz: 0 });
    X.save(); X.globalCompositeOperation = 'screen'; parilti(190, 420, 380, '#FFD98A', .5 * isik); X.restore();
  });
} };
// ───────── S8 · Kerem ve ihsan, lütuf (26.2–31.2) ─────────
const S08 = { ad: 'Lütuf', bas: 26.2, son: 31.2, ciz(t) {
  const kam = kam3([[25.8, 150, 420, 1.55], [31.7, 150, 360, 1.3]], t, easeS), isik = sm(26.6, 28.4, t);
  mezarSahnesi(kam, t, 'ikindi', () => {
    insanAyakta({ x: 190, y: 705, s: 76, yon: -1, t, pal: HACI, kolO: [.05, .22], kolA: [-.05, .2], egim: -.14 * isik, tohum: 8 });
    nur(190, 420, 200, 1000, .55 * isik);
    const r = rng(81); X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 46; i++) { const b = 26.8 + r() * 3.4, a = t - b; if (a < 0 || a > 2.2) continue; const px = 190 + (r() - .5) * 220, py = 100 + a * (110 + r() * 80), al = Math.sin(a / 2.2 * Math.PI); parilti(px, py, 15, '#FFE3A0', .7 * al); daire(px, py, 2); X.fillStyle = rgb('#FFF6DA', al); X.fill(); } X.restore();
  });
} };
// ───────── S9 · "Anne bile geride kaldı" (31.2–34.2) ─────────
const S09 = { ad: 'Geride', bas: 31.2, son: 34.2, ciz(t) {
  const kam = kam3([[30.8, 0, 250, 1.5], [34.7, 0, 330, .95]], t, easeS);
  mezarSahnesi(kam, t, 'gece', () => { const k = sm(31.2, 34.2, t); gokFeneri(-120, 640, 30 - 10 * k, t, 3, .9, 0); ruzgarCizgi(t, -700, 700, 350, 800, 24, 5, .35); }, { tasOlcek: .8 });
} };
// ───────── S10 · Kabir içinde yalnız ışık (34.2–40.2) ─────────
const S10 = { ad: 'Kabir', bas: 34.2, son: 40.2, ciz(t) {
  const kam = kam3([[33.7, 0, -300, 1.0], [35.2, 0, 330, 1.12], [40.7, 0, 350, 1.2]], t);
  const isik = sm(34.6, 36.0, t) * .35 + sm(36.9, 39.0, t) * .55;
  gokyuzu([[0, '#0B1630'], [.5, '#1E3458'], [1, '#2A4670']]);
  katman(kam, .02, () => yildizlar(200, 31, t, -700, -1300, 1400, 1100)); katman(kam, .3, () => tepe(-1800, 1800, -60, 70, 320, 951, '#1C2C46'));
  katman(kam, 1, () => {
    const o = { x: 0, y: 0, s: 1.1, t, kefen: false, isik, karanlik: .5 * (1 - isik), tas: 'sade', tasRenk: '#9AA2B4', cimRenk: '#2E3A30', toprakRenk: '#5A4A40', toprakRenk2: '#40342C' };
    kabirToprak(o); kabirLahit({ ...o, lx: 0 }); kabirYuzey(o);
    if (isik > .05) nur(0, KABIR.D * .6 - 380, 110, 760, .8 * isik);
    const r = rng(11); X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 40; i++) { const b = 35 + r() * 4, a = t - b; if (a < 0 || a > 2) continue; const px = (r() - .5) * 200, py = -40 + a * 170, al = Math.sin(a / 2 * Math.PI); parilti(px, py, 12, '#FFE3A0', .7 * al); } X.restore();
  });
} };
// ───────── S11 · "Sırt mı çevirir?" (40.2–44.4) ─────────
const S11 = { ad: 'Dua', bas: 40.2, son: 44.4, ciz(t) {
  const kam = kam3([[39.8, 0, 300, 1.2], [44.9, 0, 290, 1.3]], t, easeS), yag = sm(41.4, 43.0, t), dua = sm(40.6, 41.3, t);
  gokyuzu([[0, '#0B1630'], [.4, '#15294A'], [.55, '#24426A'], [1, '#1C2E48']]);
  katman(kam, .02, () => yildizlar(220, 81, t, -800, -1300, 1600, 1150, 1)); katman(kam, .05, () => ay(280, -250, 56, 1));
  katman(kam, .2, () => tepe(-1800, 1800, 190, 90, 380, 811, '#1C2C46'));
  katman(kam, 1, () => {
    X.fillStyle = dGrad(0, 440, 0, 1300, [[0, '#2A3448'], [1, '#161E2E']]); X.fillRect(-1800, 440, 3600, 900);
    X.fillStyle = rgb('#7A3A2A', .9); X.fillRect(-340, 640, 760, 80); X.fillStyle = rgb('#56632F', .95); X.fillRect(-320, 646, 720, 68);
    insanOturan({ x: -130, y: 650, s: 76, yon: 1, t, kolO: [.5 + dua * .9, -1.0 + dua * .2], kolA: [.5 + dua * .9, -.9 + dua * .2], egim: -.05 * dua, tohum: 4 });
    insanOturan({ x: 170, y: 655, s: 72, yon: 1, t, pal: HACI, kolO: [.5 + dua * .9, -1.0 + dua * .2], kolA: [.5 + dua * .9, -.9 + dua * .2], egim: -.05 * dua, tohum: 8 });
    if (yag > 0) yagmur(t, -420, 520, -300, 700, Math.round(110 * yag), 17, '#FFE3A0', 300, 60, .7 * yag, .03);
    X.save(); X.globalCompositeOperation = 'screen'; parilti(20, 520, 600, '#FFD98A', .12 + yag * .2); X.restore();
  });
} };
// ───────── S12 · Ferahlama (44.4–46.9) ─────────
const S12 = { ad: 'Ferahlık', bas: 44.4, son: 46.9, ciz(t) {
  const kam = kam3([[44.0, 0, 650, 1.18], [47.4, 0, 650, 1.1]], t, easeS), a = sm(44.6, 46.4, t);
  gol(kam, t, .3 - a * .25);
  katman(kam, 1, () => { insanAyakta({ x: 40, y: 1090, s: 74, yon: 1, t, kolO: [lerp(.7, .05, a), lerp(1.9, .22, a)], kolA: [-.05, .2], egim: lerp(.1, -.12, a), tohum: 4 }); X.save(); X.globalCompositeOperation = 'screen'; parilti(260, 780, 700, '#FFE3A0', .4 * a); X.restore(); for (let i = 0; i < 4; i++) { const u = (t * .1 + i * .25) % 1; kus(-500 + u * 1100, 280 - Math.sin(u * 7 + i) * 50 - i * 26, 9, t, i + 2, '#4A3A44'); } });
} };
// ───────── S13 · Kapanış (46.9–55.5) ─────────
const S13 = { ad: 'Kapanış', bas: 46.9, son: SURE, ciz(t) {
  const kam = kam3([[46.4, 0, 650, 1.1], [SURE + .5, 0, 600, 1.0]], t, easeS);
  gol(kam, t, .98);
  katman(kam, .02, () => yildizlar(240, 23, t, -800, -1300, 1600, 1150, 1)); katman(kam, .06, () => ay(240, -170, 66, 1));
  katman(kam, 1, () => { for (let i = 0; i < 12; i++) { const b = hash(i + 3) * 8, u = ((t - 47 + b) * .05 + hash(i) * .5) % 1, x = -500 + hash(i + 11) * 1000 + Math.sin(u * 6 + i) * 30, y = 900 - u * 1500; gokFeneri(x, y, 14 + hash(i + 19) * 12, t, i + 2, .9 * Math.sin(Math.min(1, u * 5) * Math.PI / 2) * (1 - u * .4), 0); } atesBocekleri(18, 411, t, -600, 1000, 1200, 500, .9); });
  const ky = sm(47.3, 48.5, t); if (ky > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = dGrad(0, 120, 0, 1000, [[0, '#060C1C', 0], [.25, '#060C1C', .34 * ky], [.75, '#060C1C', .3 * ky], [1, '#060C1C', 0]]); X.fillRect(0, 0, W, H); X.restore(); }
} };

const SAHNELER = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13];
const KAPANIS = [
  { m: 'Öyle bir yer ki,', tur: 'k', t: 47.4 },
  { m: 'ondan başka yardımcı yok.', tur: 'b', t: 47.9 },
  { m: 'Benim bu kadar çaresiz olduğumu bile bile', tur: 'k', t: 49.0 },
  { m: 'bana sırt mı çevirir?', tur: 'b', t: 49.6 }
];
function ustKatman(t) {
  if (t < 5) girisBasligi(t, { ust: 'HİKMETLİ KARELER', baslik: 'Mezar Başında', y: 400, bitis: 4.6 });
  if (t < 47.2) altyazi(t, window.ZAMAN.satirlar);
  if (t > 46.9) kapanisYazisi(t, KAPANIS, 51.3, '@1dkdua', 210);
  const k = Math.max(1 - clamp(t / .45), sm(54.65, 55.5, t));
  if (k > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = `rgba(6,8,14,${k})`; X.fillRect(0, 0, W, H); X.restore(); }
}
window.ciz = t => { X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none'; kareCiz(t, SAHNELER, ustKatman); };
