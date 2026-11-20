// 04 — Yavrular · sahneler. Zamanlar SENARYO.md ve veri/zaman_cizelgesi.json ile eşleşir.
// Tasvir ilkesi: peygamberler ve sahabe insan olarak çizilmez; ışık, mekân ve gök fenerleriyle simgelenir.
// Vefat eden çocuk yüzsüz bir kefen paketi ve ışıktan bir figür olarak, saygıyla ve yalnızca sembolik gösterilir.
'use strict';
const SURE = 105.0;
const kam3 = (keys, t, fn = ease) => { const [x, y, z] = kf(keys, t, fn); return { x, y, z }; };
const K1 = (keys, t, fn = easeS) => kf(keys, t, fn)[0];
const tepe1 = (t, c, w = .28) => Math.exp(-Math.pow((t - c) / w, 2));
const BABA2 = { ...ADAM, kaftan: '#8A5A3A', kaftanK: '#6A4329', kaftanA: '#A3734F', kulah: '#3E4A5A', sarik: '#E9DFC8' };
const ANNE2 = { ...KADIN, kaftan: '#4E6B5E', kaftanK: '#38504A', kaftanA: '#6A8A7A', entari: '#5E7B6E', ortu: '#EFE4CC' };
const ANNE3 = { ...KADIN, kaftan: '#5A4E78', kaftanK: '#40375A', kaftanA: '#76699A', entari: '#6A5E8A', ortu: '#E4E0F0' };

// ───────── Medine akşamı/gecesi (Mescid-i Nebevî, hurmalar, kerpiç ev) ─────────
function medine(kam, t, g, o = {}) {
  const [ust, alt] = gokV(g); gokyuzu([[0, ust], [.58, alt], [1, mix(alt, '#8A6A60', .35)]]);
  if (g > .45) { const a = sm(.45, .9, g); katman(kam, .02, () => yildizlar(200, 61, t, -800, -1300, 1600, 1150, a)); katman(kam, .05, () => hilal(-420, -330, 46, a)); }
  else katman(kam, .04, () => gunes(-430, -90, 62, '#FFEBC0', '#FFC27E', 1 - g * 1.6));
  katman(kam, .15, () => tepe(-1800, 1800, 95, 80, 340, 701, mix('#9C7A86', '#1C2C46', g)));
  katman(kam, .32, () => { X.save(); X.filter = `brightness(${lerp(1, .66, sm(.2, .9, g))}) saturate(${lerp(1, .85, g)})`; mescidiNebevi(-120, 190, .9, t, sm(.3, .8, g)); X.filter = 'none'; X.restore(); });
  katman(kam, 1, () => {
    X.fillStyle = dGrad(0, 460, 0, 1300, [[0, mix('#D8C49A', '#2A3040', g)], [1, mix('#B8996A', '#161C28', g)]]); X.fillRect(-1800, 460, 3600, 900);
    X.strokeStyle = `rgba(60,40,20,${.18 - g * .1})`; X.lineWidth = 2; for (let y = 500; y < 1200; y += 40 + (y - 500) * .1) { X.beginPath(); X.moveTo(-1800, y); X.lineTo(1800, y); X.stroke(); }
    const hr = mix('#5E6B34', '#1E2A2A', g), hg = mix('#8A6A48', '#2A2626', g);
    hurma(-640, 660, 560, t, 3, hr, hg); hurma(760, 650, 600, t, 4, hr, hg); hurma(560, 640, 420, t, 5, hr, hg);
    kerpicEv(200, 640, 1.15, t, { isik: o.isik ?? sm(.35, .8, g), gece: g });
    if (o.oncesi) o.oncesi();
  });
}
// Kerpiç evin penceresi (dünya koordinatı): ev (200,640), ölçek 1.15 → pencere 1: x 246–327, y 318–410
const PEN = { x: 286, y: 404 };

// ───────── Gökyüzü hava durumu: rahmet (altın yağmur) ve isyan (fırtına) ─────────
function havaDurumu(t) {
  return {
    rahmet: K1([[26.0, 0], [26.7, 0], [28.8, .1], [29.5, 1], [31.5, 1], [32.0, .2], [34.0, 0], [35.2, .55], [36.2, 1], [38.6, 1]], t),
    firtina: K1([[26.0, 0], [27.4, .45], [28.8, .45], [29.7, .1], [31.6, .15], [32.2, 1], [33.8, 1], [34.7, .1], [35.6, 0]], t)
  };
}
function semaHava(kam, t) {
  const h = havaDurumu(t), g = .86;
  gokyuzu([[0, mix('#0D1A32', '#2A1A24', h.firtina * .7)], [.5, mix('#223C66', '#4A2A30', h.firtina * .8)], [1, mix('#2A4670', '#5A3A38', h.firtina * .6)]]);
  katman(kam, .02, () => yildizlar(160, 71, t, -800, -1300, 1600, 1100, (1 - h.firtina) * .9));
  katman(kam, .05, () => { ay(260, -300, 58, (1 - h.firtina * .9)); });
  katman(kam, .15, () => tepe(-1800, 1800, 250, 90, 360, 711, mix('#1C2C46', '#2A1E24', h.firtina)));
  katman(kam, .45, () => { const gk = mix('#2A4670', '#4A2A30', h.firtina * .7); bulut(-330, -260, 640, 21, mix(gk, '#FFF0C8', .45 + h.rahmet * .5), 1, mix(gk, '#E8B86A', .4 + h.rahmet * .5)); bulut(420, -300, 680, 23, mix(gk, '#5A5270', .5 + h.firtina * .45), 1, mix(gk, '#2A2438', .6 + h.firtina * .3)); if (h.firtina > .12) { bulut(-100, -200, 1100, 25, mix(gk, '#3E3850', h.firtina * .95), 1, mix(gk, '#1E1A2A', h.firtina)); bulut(700, -180, 900, 27, mix(gk, '#4A3A44', h.firtina * .9), 1, mix(gk, '#241C24', h.firtina)); } });
  katman(kam, .6, () => { for (let i = 0; i < 9; i++) hurma(-1000 + i * 260, 560, 420 + hash(i) * 120, t, 40 + i, mix('#2A3A3A', '#161E22', 1), '#1E1C20'); });
  katman(kam, 1, () => {
    // sakin su
    X.fillStyle = dGrad(0, 520, 0, 1300, [[0, '#1E3250'], [1, '#0E1828']]); X.fillRect(-1800, 520, 3600, 800);
    const ay_ = (1 - h.firtina) * .6; for (let i = 0; i < 28; i++) { const y = 540 + i * 18, w = 18 + i * 3.2; X.strokeStyle = `rgba(246,236,205,${(.34 - i * .011) * ay_ * 1.6})`; X.lineWidth = 2.4; X.beginPath(); X.moveTo(270 - w * (.5 + hash(i) * .5) + Math.sin(t * .9 + i) * 8, y); X.lineTo(270 + w * (.5 + hash(i + 9) * .5) + Math.sin(t * .9 + i) * 8, y); X.stroke(); }
    if (h.rahmet > .05) { X.save(); X.globalCompositeOperation = 'screen'; parilti(-330, 700, 900, '#FFD98A', .3 * h.rahmet); X.restore(); }
    // yağmur halkaları
    for (let i = 0; i < 26; i++) { const ph = (t * (h.rahmet * .8 + h.firtina * 1.2 + .1) + hash(i) * 6) % 1, px = (hash(i + 40) - .5) * 1500, py = 600 + hash(i + 80) * 380, rr = ph * (40 + hash(i) * 40); X.save(); X.translate(px, py); X.scale(1, .28); X.beginPath(); X.arc(0, 0, rr, 0, TAU); X.strokeStyle = h.rahmet > h.firtina ? rgb('#FFE7B0', (1 - ph) * .6 * (h.rahmet + h.firtina)) : rgb('#B8B0D0', (1 - ph) * .6 * (h.rahmet + h.firtina)); X.lineWidth = 2.4; X.stroke(); X.restore(); }
  });
  katman(kam, 1.1, () => {
    if (h.rahmet > .03) yagmur(t, -760, 200, -300, 1300, Math.round(150 * h.rahmet), 7, '#FFE3A0', 520, 70, .85 * h.rahmet, .04);
    if (h.firtina > .03) yagmur(t, -1300, 1500, -400, 1300, Math.round(300 * h.firtina), 9, '#B8B2D8', 1250, 110, .75 * h.firtina, .34);
    for (const t0 of [32.15, 32.9, 33.45]) simsek(t, t0, -200 + (t0 - 32) * 330, -400, 520, Math.round(t0 * 7));
    if (h.firtina > .5) { X.save(); X.fillStyle = `rgba(60,20,30,${.18 * h.firtina})`; X.fillRect(-2000, -2000, 4000, 4000); X.restore(); }
  });
}

// ───────── Havz bahçesi ve mahşer düzlüğü ─────────
function havzBahce(kam, t, o = {}) {
  const px = o.plainX ?? 640;
  gokyuzu([[0, '#FFF4D8'], [.35, '#FBE6B0'], [.55, '#EEE8BC'], [1, '#BFDCB0']]);
  katman(kam, .03, () => { X.save(); X.globalCompositeOperation = 'screen'; parilti(-100, -420, 1100, '#FFFFFF', .55); parilti(-100, -420, 320, '#FFF6D8', .8); X.restore(); });
  katman(kam, .12, () => tepe(-1800, 1800, -30, 80, 360, 801, '#B9D8C0'));
  katman(kam, .3, () => { tepe(-1800, 1800, 70, 50, 300, 803, '#9CCB8E'); for (let i = 0; i < 12; i++) { const x = -1100 + i * 140; if (x > px - 100) continue; zeninAgac(x, tepeY(x, 70, 50, 300, 803) + 10, 70 + hash(i) * 30, t, 810 + i); } });
  katman(kam, 1, () => {
    X.fillStyle = dGrad(0, 440, 0, 1300, [[0, '#A9D69A'], [1, '#6FA868']]); X.fillRect(-1800, 440, 3600, 900);
    // sağda mahşer düzlüğü: kumlu zemin, yumuşak geçiş
    const kum = dGrad(px - 120, 0, px + 120, 0, [[0, '#E9D6A8', 0], [1, '#E9D6A8', 1]]); X.fillStyle = kum; X.fillRect(px - 120, 440, 2200, 900);
    X.fillStyle = dGrad(0, 440, 0, 1300, [[0, '#E9D6A8', 0], [1, '#C9A978', .8]]); X.fillRect(px, 440, 2200, 900);
    if (o.kalabalik) kalabalik({ x0: px + 120, x1: px + 1500, yUst: 500, yAlt: 640, n: o.kalabalik, seed: 5, minH: 26, maxH: 56, sis: .5, sisRenk: '#F2E2B8', kol: o.kol ?? .4, kolGuc: o.kolGuc ?? .8, t });
    havz(o.havzX ?? -120, 640, 380, 92, t, 1);
    for (const [x, y, s, sd] of [[-760, 640, 230, 821], [-520, 520, 150, 823], [180, 520, 140, 825], [-1000, 620, 200, 827]]) { zeytinAgaci(x, y, s, t, sd, 1, { govde: '#8A6A48', govdeK: '#6A5038', y1: '#5FA36A', y2: '#7DB86E', y3: '#D6F0B0', yK: '#3E7E50' }); }
    const r = rng(331); for (let i = 0; i < 90; i++) { const y = 560 + r() * 560, x = -1300 + r() * (px + 1300), s = (y - 380) / 700; if (x > px - 60) continue; for (let k = 0; k < 5; k++) { const a = k / 5 * TAU; daire(x + Math.cos(a) * 5 * s, y + Math.sin(a) * 5 * s, 4 * s); doldur(['#FFF6EA', '#F2C4C0', '#F7DC8A', '#D9C4F0'][i % 4]); } daire(x, y, 2.6 * s); doldur('#E9B949'); }
    if (o.on) o.on();
    ruhlarMini(t, -700, 120, 1400, 520);
  });
}
function zeninAgac(x, y, s, t, sd) { zeytinAgaci(x, y, s, t, sd, 1, { govde: '#8A6A48', govdeK: '#6A5038', y1: '#6FB27A', y2: '#8DCB86', y3: '#CFEBB0', yK: '#4E8E5E' }); }
function ruhlarMini(t, x0, y0, w, h) { X.save(); X.globalCompositeOperation = 'screen'; const r = rng(333); for (let i = 0; i < 34; i++) { const p = r() * TAU, bx = x0 + r() * w, by = y0 + r() * h, y = by - ((t * (5 + r() * 8) + r() * h) % h) * .35, x = bx + Math.sin(t * (.3 + r() * .4) + p) * 28, a = (.5 + .5 * Math.sin(t * (.8 + r()) + p)) * .55; parilti(x, y, 14, '#FFF2C8', a * .6); daire(x, y, 1.8); X.fillStyle = rgb('#FFFBEE', a); X.fill(); } X.restore(); }

function mahserDuzlugu(kam, t, o = {}) {
  gokyuzu([[0, '#4A4A78'], [.3, '#9A88A8'], [.5, '#F0C8A0'], [.6, '#FFE9B8'], [1, '#EBCB98']]);
  katman(kam, 1, () => {
    // ufuktaki ışık ve huzmeler zemine sabit (kamera yüksekliği değişse de ufukta kalır)
    X.save(); X.globalCompositeOperation = 'screen'; parilti(0, 340, 1500, '#FFE9B8', .75); parilti(0, 340, 520, '#FFFFFF', .75);
    for (let i = 0; i < 12; i++) { const a = -Math.PI + (i + .5) / 12 * Math.PI; cokgen([[0, 340], [Math.cos(a - .03) * 2600, 340 + Math.sin(a - .03) * 2600], [Math.cos(a + .03) * 2600, 340 + Math.sin(a + .03) * 2600]]); X.fillStyle = 'rgba(255,240,200,.1)'; X.fill(); }
    X.restore();
    X.fillStyle = dGrad(0, 340, 0, 1500, [[0, '#EBCB98'], [.4, '#D8B684'], [1, '#B8955E']]); X.fillRect(-2600, 340, 5200, 1500);
    if (o.catlak) catlakToprak(-1700, 1700, 760, 1500, t, 11);
    kalabalik({ x0: -1700, x1: 1700, yUst: 362, yAlt: o.yAlt ?? 900, n: o.n ?? 600, seed: 7, minH: o.minH ?? 10, maxH: o.maxH ?? 120, sis: o.sis ?? .55, sisRenk: '#F6DDAA', kol: o.kol ?? .12, kolGuc: o.kolGuc ?? 1, t });
    sicakHava(380, 70, t, .22 * (o.sicak ?? 0));
  });
}

// ───────── S1 · Beşik (0–6.2) ─────────
const S01 = {
  ad: 'Beşik', bas: 0, son: 6.2, ciz(t) {
    const kam = kam3([[-.3, 560, 400, 1.3], [6.8, 520, 440, 1.5]], t, easeS);
    katman(kam, 1, () => {
      odaCiz(t, .72, { sini: false });
      besik(330, 690, 1.7, t * .3, '#8A5A34');
      isikHuzmesi(520, -230, 300, 700, 60, 130, '#FFE3A0', .2 * sm(1.2, 3, t));
      insanOturan({ x: 640, y: 660, s: 74, yon: -1, t, kolO: [.3, -.5], kolA: [.3, -.4], egim: .2 + Math.sin(t * .6) * .01, tohum: 4 });
    });
    X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = dGrad(0, 0, 0, 760, [[0, '#F2E6CA', .6], [.6, '#F2E6CA', .26], [1, '#F2E6CA', 0]]); X.fillRect(0, 0, W, 760); X.restore();
  }
};
// ───────── S2 · Aldım, koydum, yıkadım, öptüm, kokladım, kefenledim (6.2–12.3) ─────────
const S02 = {
  ad: 'Kefen', bas: 6.2, son: 12.3, ciz(t) {
    const kam = kam3([[5.8, 520, 420, 1.28], [12.8, 500, 450, 1.5]], t, easeS);
    const al = sm(7.5, 7.95, t), koy = sm(7.95, 8.35, t), bx = lerp(lerp(380, 430, al), 540, koy), by = lerp(lerp(600, 540, al), 560, koy) - Math.sin(al * Math.PI) * 24 * (1 - koy);
    const kef = sm(11.55, 12.15, t), dok = sm(8.55, 8.9, t) * (1 - sm(10.25, 10.55, t));
    katman(kam, 1, () => {
      odaCiz(t, .78, { sini: false });
      // alçak ahşap bank
      X.fillStyle = rgb('#6B4429'); X.fillRect(410, 590, 270, 24); X.fillStyle = rgb('#8A5B37'); X.fillRect(410, 580, 270, 14); for (const sx of [430, 650]) { X.fillRect(sx, 612, 14, 70); }
      kefenPaketi(bx, by, lerp(170, 215, kef), lerp(62, 88, kef), 0);
      if (kef > .02) { X.save(); X.globalAlpha = kef; X.strokeStyle = 'rgba(160,140,110,.85)'; X.lineWidth = 4; for (const k of [-.36, 0, .36]) { X.beginPath(); X.moveTo(bx + k * 215, by - 44); X.lineTo(bx + k * 215, by + 44); X.stroke(); } X.restore(); }
      // misafirler gider
      for (const [pal, x0, y0, d0] of [[TALEBE1, 470, 665, 6.45], [TALEBE2, 580, 690, 6.7]]) { const u = sm(d0, d0 + 1.7, t), x = x0 + u * 560, yur = u > 0 && u < 1 ? 1 : 0; if (x < 1100) insanAyakta({ x, y: y0, s: 66, yon: 1, t, pal, faz: yurFaz(u * 560, 66), yur, kolO: [.05, .22], kolA: [-.05, .2], egim: .02, tohum: d0 }); }
      // Adam
      const egim = K1([[6, .05], [8.2, .05], [8.5, .12], [10.0, .12], [10.5, .34], [10.9, .34], [11.12, .22], [11.5, .34], [11.9, .1], [12.5, .05]], t);
      const uzan = K1([[6, .2], [7.5, .2], [8.0, 1.0], [8.6, 1.1], [10.2, 1.1], [10.8, .5], [12.5, .4]], t);
      insanOturan({
        x: 300, y: 650, s: 74, yon: 1, t, kolO: [uzan, .3], kolA: [.4, -.6], egim, tohum: 4,
        elde: k => { if (dok > .05) { const tilt = -.5 * dok; X.save(); X.translate(k.el[0] + .1, k.el[1] - .3); X.rotate(tilt); testi(0, -.1, 1.0, '#B9764A'); X.restore(); const sx = k.el[0] + .9, sy = k.el[1] - .5, ex = (bx - 300) / 74, ey = (by - 650) / 74 - .1; for (let i = 0; i < 10; i++) { const u = ((t * 1.6 + i / 10) % 1); X.beginPath(); X.arc(lerp(sx, ex, u * .5 + .5 * u), lerp(sy, ey, u * u), .035, 0, TAU); X.fillStyle = rgb('#BFE6F0', .85 * dok); X.fill(); } } }
      });
    });
  }
};
// ───────── S3 · Götürdüm, namazını kıldım, huzuru buldum (12.3–15.2) ─────────
const S03 = {
  ad: 'Huzur', bas: 12.3, son: 15.2, ciz(t) {
    const kam = kam3([[12.0, 160, 430, 1.22], [15.6, 470, 410, 1.36]], t, easeS), g = .46 + sm(14.0, 15.2, t) * .1;
    const yol = sm(12.3, 13.7, t), x = lerp(-100, 400, yol), dur = yol >= 1, huzur = sm(14.1, 15.0, t);
    gokyuzu([[0, mix('#7C6A92', '#D8A890', huzur * .5)], [.4, mix('#E0A088', '#FFD9A0', huzur)], [.6, mix('#F4C088', '#FFE8B8', huzur)], [1, '#D9A06A']]);
    katman(kam, .04, () => gunes(-300, -90, 70, '#FFEBC0', '#FFC27E', 1));
    katman(kam, .15, () => tepe(-1800, 1800, 100, 70, 340, 901, '#A88A86'));
    katman(kam, .35, () => { for (let i = 0; i < 14; i++) evKucuk(-900 + i * 150 + (i % 2) * 20, 190, 70, 50 + (i % 3) * 16, '#D7C0A0', '#A8643E', 0); camiSilueti(720, 200, .6, '#6A5A62', 1, t); for (let i = 0; i < 4; i++) selvi(-700 + i * 320, 190, 160, t, i, '#4A5236', '#5E6844'); });
    katman(kam, 1, () => {
      X.fillStyle = dGrad(0, 450, 0, 1300, [[0, '#C9AA82'], [1, '#9A7A58']]); X.fillRect(-1800, 450, 3600, 900);
      X.strokeStyle = 'rgba(70,46,24,.3)'; X.lineWidth = 2; for (let y = 480; y < 1200; y += 30 + (y - 480) * .12) { X.beginPath(); X.moveTo(-1800, y); X.lineTo(1800, y); X.stroke(); }
      // musalla taşı
      X.fillStyle = dGrad(0, 600, 0, 660, [[0, '#D9CBB0'], [1, '#A89878']]); X.fillRect(440, 616, 230, 40); X.fillStyle = '#EFE6D0'; X.fillRect(440, 606, 230, 14);
      if (dur) kefenPaketi(555, 598, 150, 52, 0);
      const xA = dur ? 390 : x;
      insanAyakta({
        x: xA, y: 690, s: 70, yon: 1, t, faz: yurFaz(x + 100, 70), yur: dur ? 0 : 1, kolO: dur ? [.5, 1.4] : [1.05, .9], kolA: dur ? [.45, 1.4] : [.9, 1.0], egim: dur ? .05 : 0, tohum: 4,
        elde: k => { if (!dur) kefenPaketi(k.el[0] + .25, k.el[1] - .1, 1.7, .72, -.08); }
      });
      if (huzur > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(430, 470, 600, '#FFE3A0', .45 * huzur); isikHuzmesi(60, -400, 420, 700, 80, 220, '#FFE9B8', .22 * huzur); X.restore(); }
    });
  }
};
// ───────── S4 · İbrahim vefat ederken, gözyaşı (15.2–22.0) ─────────
const S04 = {
  ad: 'Medine', bas: 15.2, son: 22.0, ciz(t) {
    const kam = kam3([[14.8, 160, 440, 1.05], [22.4, 220, 380, 1.4]], t, easeS), g = K1([[15, .52], [22.5, .66]], t), isik = sm(15.3, 17.5, t) * .8 + .2;
    medine(kam, t, g, { isik });
    katman(kam, 1, () => {
      X.save(); X.globalCompositeOperation = 'screen'; parilti(PEN.x, PEN.y - 40, 360, '#FFD98A', .5 * isik); nur(PEN.x, PEN.y - 20, 120, 560, .35 * sm(18.4, 20, t)); X.restore();
      for (let i = 0; i < 4; i++) { const t0 = 19.5 + i * .85, u = t - t0; if (u < 0) continue; const y = PEN.y + 8 + u * (60 + u * 90), a = Math.min(1, u * 3) * (y < 690 ? 1 : 0), x = PEN.x + Math.sin(i * 2.3) * 12; if (a > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(x, y, 26, '#CFE8FF', .7 * a); X.beginPath(); X.moveTo(x, y - 22); X.quadraticCurveTo(x + 8, y - 3, x, y + 6); X.quadraticCurveTo(x - 8, y - 3, x, y - 22); X.fillStyle = rgb('#F2FAFF', .95 * a); X.fill(); X.restore(); } else if (u > 0 && y >= 690 && u < 3.5 + i) { const w = clamp((y - 690) / 120); X.save(); X.translate(x, 700); X.scale(1, .3); X.beginPath(); X.arc(0, 0, 8 + w * 36, 0, TAU); X.strokeStyle = rgb('#E8F4FF', .5 * (1 - w)); X.lineWidth = 3; X.stroke(); X.restore(); } }
    });
  }
};
// ───────── S5 · Sahabe şaşırıyor (22.0–26.5) ─────────
const S05 = {
  ad: 'Fenerler', bas: 22.0, son: 26.5, ciz(t) {
    const kam = kam3([[21.6, 150, 430, 1.3], [27.0, 90, 440, 1.1]], t, easeS), g = .7;
    medine(kam, t, g, { isik: 1 });
    katman(kam, 1, () => {
      X.save(); X.globalCompositeOperation = 'screen'; parilti(PEN.x, PEN.y - 40, 340, '#FFD98A', .5); X.restore();
      const sasir = tepe1(t, 22.6, .5) + tepe1(t, 24.4, .4);
      for (let i = 0; i < 7; i++) {
        const x = -420 + i * 150, y = 470 + (i % 3) * 22 - Math.abs(i - 3) * 6, dalga = tepe1(t, 23.8 + i * .08, .25);
        gokFeneri(x, y, 34 + (i % 2) * 6, t, i + 1, .75 + .25 * sasir + .35 * dalga, (x < 150 ? .12 : -.12) * (sasir * .9 + dalga));
      }
      if (t > 23.7) { X.save(); X.globalCompositeOperation = 'screen'; const u = clamp((t - 23.7) / 1.4); X.save(); X.translate(PEN.x - 30, 520); X.scale(1, .3); X.beginPath(); X.arc(0, 0, 40 + u * 520, 0, TAU); X.strokeStyle = rgb('#FFE3A0', (1 - u) * .6); X.lineWidth = 4; X.stroke(); X.restore(); X.restore(); }
    });
  }
};
// ───────── S6a · Ağlamak iki kısım, rahmet (26.5–31.7) ─────────
const S06a = { ad: 'Rahmet', bas: 26.5, son: 31.7, ciz(t) { const kam = kam3([[26.0, -60, 300, 1.0], [32.2, -90, 330, 1.12]], t, easeS); semaHava(kam, t); } };
// ───────── S6b · İsyan fırtınası, rahmete dönüş (31.7–38.0) ─────────
const S06b = { ad: 'İsyan', bas: 31.7, son: 38.0, ciz(t) { const kam = kam3([[31.2, -60, 320, 1.12], [38.6, -120, 300, 1.0]], t, easeS); semaHava(kam, t); } };
// ───────── S7 · İki damla (38.0–41.9) ─────────
const S07 = {
  ad: 'İki damla', bas: 38.0, son: 41.9, ciz(t) {
    const kam = kam3([[37.6, 540, 960, 1.0], [42.4, 540, 960, 1.1]], t, easeS), S = 250, X0 = 560, Y0 = 2360;
    katman(kam, 1, () => {
      X.fillStyle = dGrad(0, -300, 0, 1900, [[0, '#2E221E'], [.5, '#5A3E30'], [1, '#2A1E1A']]); X.fillRect(-200, -300, 1500, 2300);
      X.beginPath(); X.moveTo(780, 420); X.lineTo(780, 120); X.arc(930, 120, 150, Math.PI, 0); X.lineTo(1080, 420); X.closePath(); X.fillStyle = dGrad(0, -30, 0, 420, [[0, '#7C6A92'], [1, '#F0B880']]); X.fill();
      X.save(); X.globalCompositeOperation = 'screen'; parilti(930, 250, 700, '#FFB870', .32); X.restore();
      insanAyakta({ x: X0, y: Y0, s: S, yon: 1, t, kirp: 1, kolO: [.05, .22], kolA: [-.05, .2], egim: .08 + Math.sin(t * .8) * .01, tohum: 4 });
      const ex = X0 + .29 * S, ey = Y0 - 6.72 * S + 2;
      for (const [t0, dx] of [[39.84, 0], [40.5, 6]]) {
        const u = (t - t0) / 1.5; if (u < 0 || u > 1) continue; const px = ex + dx + u * 20, py = ey + 20 + u * 150, a = Math.sin(clamp(u * 1.2) * Math.PI) * .9;
        X.save(); X.globalCompositeOperation = 'screen'; parilti(px, py, 30, '#CFE8FF', .55 * a); X.restore(); X.beginPath(); X.moveTo(px, py - 15); X.quadraticCurveTo(px + 8, py + 2, px, py + 9); X.quadraticCurveTo(px - 8, py + 2, px, py - 15); X.fillStyle = rgb('#E8F6FF', a); X.fill();
      }
    });
  }
};
// ───────── S8 · Müjde (41.9–44.9) ─────────
const S08 = {
  ad: 'Müjde', bas: 41.9, son: 44.9, ciz(t) {
    const kam = kam3([[41.5, 430, 280, 1.2], [45.4, 440, 300, 1.34]], t, easeS), isik = sm(42.2, 43.2, t);
    katman(kam, 1, () => {
      odaCiz(t, .88, { sini: false, pencereSag: .08 });
      X.save(); X.globalCompositeOperation = 'screen'; parilti(560, -200, 700, '#FFE7B0', .6 * isik); isikHuzmesi(560, -200, 330, 700, 120, 300, '#FFE9B8', .4 * isik); X.restore();
      insanOturan({ x: 330, y: 650, s: 74, yon: 1, t, kolO: [.6, -1.0], kolA: [.55, -.9], egim: -.1 * isik, tohum: 4 });
      for (let i = 0; i < 3; i++) { const t0 = 42.7 + i * .35, u = clamp((t - t0) / 1.9); if (t < t0) continue; const x = lerp(520, 360 + i * 30, easeO(u)), y = lerp(-90, 150 - i * 40, easeO(u)) + Math.sin(u * 7 + i) * 18 * (1 - u); guvercin(x, y, 54 - i * 8, t + i, -1, 11, .9 * (1 - u * .3)); }
    });
  }
};
// ───────── S9 · Mahşer (44.9–50.5) ─────────
const S09 = { ad: 'Mahşer', bas: 44.9, son: 50.5, ciz(t) { const kam = kam3([[44.4, 0, 650, 1.65], [51.0, 0, 400, .95]], t, easeS); mahserDuzlugu(kam, t, { n: 640, sis: .5, kol: .05, sicak: 0 }); } };
// ───────── S10 · Susuzluk (50.5–54.2) ─────────
const S10 = {
  ad: 'Susuzluk', bas: 50.5, son: 54.2, ciz(t) {
    const kam = kam3([[50.1, 0, 600, 1.15], [54.7, 0, 580, 1.32]], t, easeS), puls = tepe1(t, 53.4, .18) + tepe1(t, 53.8, .18), kg = .55 + .45 * sm(51.7, 53.0, t) + puls * .2;
    mahserDuzlugu(kam, t, { n: 70, yAlt: 1000, minH: 90, maxH: 330, kol: .6, kolGuc: kg, sis: .35, catlak: true, sicak: 1 });
  }
};
// ───────── S11 · Çocuklar havzda (54.2–59.3) ─────────
const COCUKLAR = [[-380, 735, 40], [-250, 705, 37], [-60, 690, 35], [90, 712, 38], [240, 740, 41], [-470, 690, 34], [330, 700, 36]];
const S11 = {
  ad: 'Çocuklar', bas: 54.2, son: 59.3, ciz(t) {
    const kam = kam3([[53.8, -60, 540, 1.1], [59.8, 40, 540, 1.28]], t, easeS);
    havzBahce(kam, t, { kalabalik: 90 });
    katman(kam, 1, () => { COCUKLAR.forEach(([x, y, s], i) => { const a = sm(55.0 + i * .5, 55.8 + i * .5, t); if (a > 0) { X.save(); X.globalAlpha = a; parlayanCocuk({ x, y, s: s * (.85 + .15 * a), yon: i % 2 ? -1 : 1, t, kolO: [.15 + Math.sin(t * .8 + i) * .05, .3], kolA: [-.1, .25], egim: .03, tohum: i + 3, parlak: a }); X.restore(); } }); });
  }
};
// ───────── S12 · Havzdan su götürürler (59.3–63.4) ─────────
const S12 = {
  ad: 'Su', bas: 59.3, son: 63.4, ciz(t) {
    const kam = kam3([[58.9, 40, 540, 1.28], [63.9, 760, 560, 1.2]], t, easeS), yol = t - 59.4;
    havzBahce(kam, t, { kalabalik: 160, kol: .6, kolGuc: .9 });
    katman(kam, 1, () => {
      COCUKLAR.forEach(([x0, y, s], i) => { const hz = 150 + i * 10, x = x0 + Math.max(0, yol - i * .12) * hz, yur = yol > i * .12 ? 1 : 0; parlayanCocuk({ x, y, s, yon: 1, t, faz: yurFaz(x - x0, s), yur, kolO: [1.0, .8], kolA: [.85, .9], egim: 0, tohum: i + 3, elde: k => testi(k.el[0] + .15, k.el[1] - .15, .75, '#B9764A') }); });
      X.save(); X.globalCompositeOperation = 'screen'; const r = rng(88); for (let i = 0; i < 40; i++) { const b = 60.2 + r() * 2.6, a = t - b; if (a < 0 || a > 1.4) continue; const px = 300 + (t - 59.4) * 140 + r() * 380, py = 640 - a * 50 + r() * 40, al = Math.sin(a / 1.4 * Math.PI); parilti(px, py, 12, '#CFEEFF', al * .6); daire(px, py, 1.8); X.fillStyle = rgb('#FFFFFF', al); X.fill(); } X.restore();
    });
  }
};
// ───────── S13a · "Oğlum, yavrum ben senin annenim, babanım" (63.4–66.7) ─────────
function cocukSahne(t, kam, o) {
  havzBahce(kam, t, { kalabalik: 150, kol: .3, plainX: 560, havzX: -420 });
  katman(kam, 1, () => { o(); });
}
const S13a = {
  ad: 'Çağrı', bas: 63.4, son: 66.7, ciz(t) {
    const kam = kam3([[63.0, 760, 560, 1.4], [67.2, 800, 570, 1.5]], t, easeS);
    cocukSahne(t, kam, () => {
      const geri = sm(64.9, 66.5, t) * 60;
      parlayanCocuk({ x: 1000 + geri, y: 720, s: 50, yon: -1, t, kolO: [.1, .3], kolA: [-.1, .25], egim: -.04 + Math.sin(t * 5) * .02 * sm(64.9, 66.5, t), tohum: 3 });
      for (const [pal, x0, d0, y] of [[BABA2, 560, 63.2, 730], [ANNE3, 650, 63.5, 745], [ANNE2, 740, 63.9, 722]]) { const u = sm(d0, d0 + 1.3, t), x = x0 + u * 150, yur = u > 0 && u < 1 ? 1 : 0, ac = sm(d0 + 1.0, d0 + 1.6, t); insanAyakta({ x, y, s: 66, yon: 1, t, pal, faz: yurFaz(u * 150, 66), yur, kolO: [.1 + 1.3 * ac, .3 - .1 * ac], kolA: [.1 + 1.1 * ac, .4], egim: .03 * ac, tohum: d0, agiz: ac * .6 * (Math.sin(t * 9) > 0 ? 1 : .3) }); }
    });
  }
};
// ───────── S13b · Koku ile tanıma (66.7–74.0) ─────────
const S13b = {
  ad: 'Koku', bas: 66.7, son: 74.0, ciz(t) {
    const kam = kam3([[66.2, 850, 560, 1.45], [74.6, 830, 570, 1.6]], t, easeS);
    cocukSahne(t, kam, () => {
      const bak = sm(70.7, 71.0, t) - sm(71.5, 71.8, t), say = sm(71.5, 73.6, t);
      const yon = bak > .5 ? 1 : -1, sal = Math.sin(t * 9) * .09 * sm(71.6, 72.2, t) * (1 - sm(73.2, 73.8, t));
      for (const [pal, x, y, f] of [[BABA2, 640, 735, 1], [ANNE3, 730, 750, 1], [ANNE2, 820, 725, 1]]) { insanAyakta({ x: x - sm(72.0, 73.6, t) * 40, y, s: 66, yon: 1, t, pal, kolO: [1.25 - sm(72.4, 73.4, t) * 1.1, .2], kolA: [1.0 - sm(72.4, 73.4, t) * .9, .4], egim: .02, tohum: x }); }
      kokuIplik(650, 560, 940, 560, t, .55 * sm(66.9, 67.8, t) * (1 - sm(70.4, 71.0, t)), '#D8D0B8', 3, 1); kokuIplik(740, 580, 950, 575, t, .5 * sm(67.2, 68.1, t) * (1 - sm(70.4, 71.0, t)), '#D8D0B8', 3, 2); kokuIplik(830, 555, 960, 565, t, .5 * sm(67.5, 68.4, t) * (1 - sm(70.4, 71.0, t)), '#D8D0B8', 3, 3);
      kokuIplik(1500, 520, 1010, 560, t, .95 * sm(69.5, 70.4, t), '#FFE3A0', 5, 5);
      parlayanCocuk({ x: 1010, y: 720, s: 54, yon, t, kolO: [.1, .3], kolA: [-.1, .25], egim: sal + (bak > .5 ? .04 : 0), tohum: 3 });
    });
  }
};
// ───────── S14 · Sahabe sevinir (74.0–79.0) ─────────
const S14 = {
  ad: 'Sevinç', bas: 74.0, son: 79.0, ciz(t) {
    const kam = kam3([[73.6, 0, 330, 1.12], [79.5, 0, 100, 1.0]], t, easeS), g = .74;
    medine(kam, t, g, { isik: 1 });
    katman(kam, 1, () => {
      const yuk = easeS((t - 75.4) / 3.4);
      for (let i = 0; i < 16; i++) { const a = hash(i + 5), x = -700 + i * 95 + (a - .5) * 40, y = lerp(480 + (i % 3) * 25, -700 - a * 500, yuk * (.5 + a * .5)); const par = .8 + .2 * Math.sin(t * 3 + i); gokFeneri(x, y, 28 + (i % 3) * 7, t, i + 1, par, Math.sin(t + i) * .05); }
      for (let i = 0; i < 4; i++) { const u = (t * .12 + i * .25) % 1; guvercin(-800 + u * 1900, 80 - Math.sin(u * 8 + i) * 70 - i * 40, 50, t + i, 1, 9, .6); }
    });
  }
};
// ───────── S15 · Kavuşma (79.0–82.8) ─────────
const S15 = {
  ad: 'Kavuşma', bas: 79.0, son: 82.8, ciz(t) {
    const kam = kam3([[78.6, 80, 560, 1.4], [83.3, 60, 560, 1.55]], t, easeS), kos = sm(79.4, 81.2, t), kucak = sm(81.0, 81.5, t);
    havzBahce(kam, t, { havzX: -520 });
    katman(kam, 1, () => {
      insanOturan({ x: 20, y: 740, s: 72, yon: 1, t, pal: BABA2, kolO: [lerp(.9, .5, kucak), lerp(-.5, -1.1, kucak)], kolA: [lerp(.9, .5, kucak), lerp(-.5, -1.1, kucak)], egim: -.04 * kucak, tohum: 4 });
      const cx = lerp(560, 160, kos), yurur = kos > 0 && kos < 1 ? 1 : 0;
      parlayanCocuk({ x: cx, y: 745, s: 46, yon: -1, t, faz: yurFaz(560 - cx, 46) * 1.4, yur: yurur, kolO: [lerp(.1, 1.5, kos), .3], kolA: [lerp(-.1, 1.4, kos), .3], egim: 0, tohum: 3, parlak: 1 + kucak * .6 });
      if (kucak > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(120, 600, 520, '#FFE3A0', .55 * kucak * (1 - sm(82.2, 82.8, t) * .4)); X.restore(); kokuIplik(60, 560, 150, 540, t, .8 * kucak, '#FFE3A0', 4, 8); }
    });
  }
};
// ───────── S16 · Şefkat ve merhamete ihtiyacımız var (82.8–89.8) ─────────
const S16 = {
  ad: 'Şefkat', bas: 82.8, son: 89.8, ciz(t) {
    const kam = kam3([[82.3, 40, 300, 1.2], [90.3, 40, 280, 1.3]], t, easeS), g = .9, dua = sm(85.3, 86.2, t), yag = sm(87.4, 88.8, t);
    gokyuzu([[0, '#0B1630'], [.4, '#15294A'], [.55, '#24426A'], [1, '#1C2E48']]);
    katman(kam, .02, () => yildizlar(220, 81, t, -800, -1300, 1600, 1150, 1)); katman(kam, .05, () => ay(280, -250, 56, 1));
    katman(kam, .2, () => tepe(-1800, 1800, 230, 90, 380, 811, '#1C2C46')); katman(kam, .45, () => { camiSilueti(-300, 360, .9, '#101C30', 1, t); });
    katman(kam, 1, () => {
      X.fillStyle = dGrad(0, 440, 0, 1300, [[0, '#2A3448'], [1, '#161E2E']]); X.fillRect(-1800, 440, 3600, 900);
      X.fillStyle = rgb('#7A3A2A', .9); X.fillRect(-340, 640, 760, 80);   // halı şeridi
      X.fillStyle = rgb('#56632F', .95); X.fillRect(-320, 646, 720, 68);
      X.save(); X.globalCompositeOperation = 'screen'; parilti(40, 520, 600, '#FFD98A', .12 + yag * .18); X.restore();
      insanOturan({ x: -130, y: 650, s: 76, yon: 1, t, pal: BABA2, kolO: [.5 + dua * .9, -1.0 + dua * .2], kolA: [.5 + dua * .9, -.9 + dua * .2], egim: -.03 * dua, tohum: 4 });
      insanOturan({ x: 170, y: 655, s: 72, yon: 1, t, pal: ANNE3, kolO: [.5 + dua * .9, -1.0 + dua * .2], kolA: [.5 + dua * .9, -.9 + dua * .2], egim: -.03 * dua, tohum: 8 });
      if (yag > 0) yagmur(t, -420, 520, -300, 700, Math.round(110 * yag), 17, '#FFE3A0', 300, 60, .7 * yag, .03);
      nur(40, 200, 140, 900, .3 * yag);
    });
  }
};
// ───────── S17 · Şafakta yürüyüş (89.8–96.9) ─────────
const S17 = {
  ad: 'Şafak', bas: 89.8, son: 96.9, ciz(t) {
    const kam = kam3([[89.3, 0, 460, 1.15], [97.4, 0, 300, 1.0]], t, easeS), gun = sm(92.0, 96.0, t), yuru = t - 90.0;
    gokyuzu([[0, mix('#5A5A8A', '#8AB0D0', gun)], [.35, mix('#C892A8', '#F4D0A8', gun)], [.55, mix('#F4B888', '#FFE6B0', gun)], [1, '#D8A870']]);
    katman(kam, .04, () => gunes(0, 130 - gun * 60, 74 + gun * 18, '#FFF0C8', '#FFC890', 1.1));
    katman(kam, .15, () => tepe(-1800, 1800, 190, 90, 360, 821, mix('#9C7A86', '#C9A890', gun)));
    katman(kam, .35, () => { tepe(-1800, 1800, 290, 56, 300, 823, mix('#7E8A5A', '#A8B070', gun)); for (let i = 0; i < 7; i++) selvi(-900 + i * 280, 300, 180, t, i, '#4A5A36', '#5E6E44'); });
    katman(kam, 1, () => {
      X.fillStyle = dGrad(0, 420, 0, 1300, [[0, mix('#8A9A5A', '#B0BE70', gun)], [1, '#5E7040']]); X.fillRect(-1800, 420, 3600, 900);
      X.beginPath(); X.moveTo(-60, 1100); X.bezierCurveTo(-10, 760, 20, 600, 4, 440); X.lineTo(14, 440); X.bezierCurveTo(40, 600, 130, 780, 200, 1100); X.closePath(); doldur('#E6D3A6', .85);
      X.save(); X.globalCompositeOperation = 'screen'; X.fillStyle = dGrad(0, 420, 0, 1100, [[0, '#FFE9B8', .35 * gun], [1, '#FFE9B8', 0]]); X.beginPath(); X.moveTo(-10, 440); X.lineTo(26, 440); X.lineTo(300, 1100); X.lineTo(-160, 1100); X.closePath(); X.fill(); X.restore();
      const yy = 1000 - yuru * 52, sc = lerp(1, .55, clamp((1000 - yy) / 520)), xo = x => 40 + (x - 40) * sc;
      const ph = yuru * 5.2;
      insanArka({ x: xo(-70) , y: yy, s: 62 * sc, t, faz: ph, yur: 1, pal: BABA2 });
      insanArka({ x: xo(10), y: yy + 6, s: 36 * sc, t, faz: ph * 1.3, yur: 1, pal: COCUK });
      insanArka({ x: xo(90), y: yy, s: 58 * sc, t, faz: ph + 1.2, yur: 1, pal: ANNE3 });
      X.save(); X.globalCompositeOperation = 'screen'; parilti(xo(10), yy - 110 * sc, 220 * sc, '#FFF2CC', .45); X.restore();
    });
    katman(kam, 1.3, () => { cimen(-900, 900, 1300, 90, 12, t, 77, '#4C5A28', .9); });
  }
};
// ───────── S18 · Kapanış: gece gölü, yükselen ışıklar (96.9–105) ─────────
const S18 = {
  ad: 'Kapanış', bas: 96.9, son: SURE, ciz(t) {
    const kam = kam3([[96.4, 0, 330, 1.1], [SURE + .5, 0, 250, 1.0]], t, easeS);
    gokyuzu([[0, '#0B1630'], [.35, '#15294A'], [.52, '#24426A'], [.6, '#35567E'], [1, '#1C2E48']]);
    katman(kam, .02, () => yildizlar(240, 23, t, -800, -1300, 1600, 1150, 1));
    katman(kam, .05, () => ay(240, 40, 70, 1));
    katman(kam, .18, () => tepe(-1800, 1800, 150, 90, 380, 831, '#1C2C46'));
    katman(kam, .35, () => { tepe(-1800, 1800, 290, 40, 300, 833, '#13213A'); for (let i = 0; i < 9; i++) selvi(-980 + i * 250, 300, 170 + hash(i) * 50, t, i, '#0C141E', '#16222E'); });
    katman(kam, 1, () => {
      X.fillStyle = dGrad(0, 460, 0, 1300, [[0, '#142238'], [1, '#08101C']]); X.fillRect(-1800, 460, 3600, 900);
      X.fillStyle = dGrad(150, 0, 330, 0, [[0, '#F6ECCD', 0], [.5, '#F6ECCD', .38], [1, '#F6ECCD', 0]]); X.fillRect(150, 460, 180, 700);
      for (let i = 0; i < 26; i++) { const y = 480 + i * 28, w = 40 + i * 6; X.strokeStyle = `rgba(246,236,205,${.26 - i * .008})`; X.lineWidth = 2; X.beginPath(); X.moveTo(240 - w * (.5 + hash(i) * .5) + Math.sin(t * .8 + i) * 10, y); X.lineTo(240 + w * (.5 + hash(i + 9) * .5) + Math.sin(t * .8 + i) * 10, y); X.stroke(); }
      const r = rng(41); for (let i = 0; i < 12; i++) { const b = hash(i + 3) * 8, u = ((t - 97 + b) * .05 + hash(i) * .5) % 1, x = -500 + hash(i + 11) * 1000 + Math.sin(u * 6 + i) * 30, y = 520 - u * 1500; gokFeneri(x, y, 14 + hash(i + 19) * 12, t, i + 2, .9 * Math.sin(Math.min(1, u * 5) * Math.PI / 2) * (1 - u * .4), 0); }
      atesBocekleri(18, 411, t, -600, 600, 1200, 600, .9);
    });
    katman(kam, 1.3, () => { tepe(-1300, 1300, 1050, 30, 220, 835, '#0C1422'); selvi(-480, 1000, 700, t, 3, '#0A121C', '#142030'); selvi(520, 1010, 620, t, 4, '#0A121C', '#142030'); });
    const ky = sm(97.3, 98.5, t);
    if (ky > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = dGrad(0, 120, 0, 1000, [[0, '#060C1C', 0], [.25, '#060C1C', .34 * ky], [.75, '#060C1C', .3 * ky], [1, '#060C1C', 0]]); X.fillRect(0, 0, W, H); X.restore(); }
  }
};

const SAHNELER = [S01, S02, S03, S04, S05, S06a, S06b, S07, S08, S09, S10, S11, S12, S13a, S13b, S14, S15, S16, S17, S18];
const KAPANIS = [
  { m: 'Her kimin bir yavrusu ölmüşse', tur: 'k', t: 97.6 },
  { m: 'üzülmesin,', tur: 'b', t: 98.1 },
  { m: 'ahirette ondan çok fayda görecek,', tur: 'k', t: 99.1 },
  { m: 'merhamet görecek.', tur: 'b', t: 99.7 }
];
function ustKatman(t) {
  if (t < 5) girisBasligi(t, { ust: 'HİKMETLİ KARELER', baslik: 'Yavrular', y: 400, bitis: 4.6 });
  if (t < 97.3) altyazi(t, window.ZAMAN.satirlar);
  if (t > 97.0) kapanisYazisi(t, KAPANIS, 101.3, '@1dkdua', 210);
  const k = Math.max(1 - clamp(t / .45), sm(104.15, 105.0, t));
  if (k > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = `rgba(6,8,14,${k})`; X.fillRect(0, 0, W, H); X.restore(); }
}
window.ciz = t => { X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none'; kareCiz(t, SAHNELER, ustKatman); };
