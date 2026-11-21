/* KAMERADAKİ İKİNCİ KARDEŞ — 1. Bölüm: EVDE BİRİ DAHA VAR
   Karakterlerin dünya zaman çizelgesi (DURUM) + 15 sahnenin çekim listesi (CEKIMLER).
   Tüm kamera açıları aynı dünya durumundan çizilir → mekânsal devamlılık korunur. */
'use strict';

/* ---------- yardımcılar ---------- */
function ifadeZaman(t, keys, gecis = 0.45) {
  if (t <= keys[0][0]) return IFADE[keys[0][1]];
  let i = 0; while (i + 1 < keys.length && keys[i + 1][0] <= t) i++;
  const cur = keys[i], prev = i > 0 ? keys[i - 1] : cur;
  return ifadeKaris(prev[1], cur[1], ss(clamp((t - cur[0]) / (cur[2] || gecis))));
}
function yolNoktasi(yol, s) {
  let kalan = s;
  for (let i = 0; i < yol.length - 1; i++) {
    const a = yol[i], b = yol[i + 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (kalan <= l || i === yol.length - 2) { const k = clamp(kalan / l); return { x: lerp(a[0], b[0], k), z: lerp(a[1], b[1], k), yon: Math.atan2(b[0] - a[0], b[1] - a[1]) }; }
    kalan -= l;
  }
}
function yolUzunlugu(yol) { let L = 0; for (let i = 0; i < yol.length - 1; i++) L += Math.hypot(yol[i + 1][0] - yol[i][0], yol[i + 1][1] - yol[i][1]); return L; }
// Bir yürüyüş bölümünde karakterin konumu; bölüm dışında null
function yurume(ad, t) {
  const Y = window.YURUME[ad]; if (!Y || t < Y.t0 || t > Y.t1) return null;
  const u = (t - Y.t0) / (Y.t1 - Y.t0), L = yolUzunlugu(Y.yol);
  const s = L * lerp(u, sio(u), 0.45);
  const p = yolNoktasi(Y.yol, s), p2 = yolNoktasi(Y.yol, Math.min(L, s + 0.25));
  return { x: p.x, z: p.z, yon: p2.yon, yuru: 1, faz: Y.adim * Math.PI * u, adimX: 0 };
}
function yurumeBas(ad) { const Y = window.YURUME[ad]; return { x: Y.yol[0][0], z: Y.yol[0][1] }; }
function yurumeSon(ad) { const Y = window.YURUME[ad]; const n = Y.yol.length; return { x: Y.yol[n - 1][0], z: Y.yol[n - 1][1], yon: Math.atan2(Y.yol[n - 1][0] - Y.yol[n - 2][0], Y.yol[n - 1][1] - Y.yol[n - 2][1]) }; }
const PI = Math.PI;
const SALON_ISIK = { dx: 0.9, dy: 0.4 }, KOR_ISIK = { dx: 0.2, dy: 1 };
// Salon koltuğu: oturma konumları
const OTUR_ARDA = { x: 0.45, z: 3.42 }, OTUR_DEFNE = { x: -0.45, z: 3.42 };
// Telefonu tutma pozu: y (omuzdan aşağı cm), a (eğim)
const telTitre = (t, k) => ({ x: 0.6 * k * Math.sin(t * 37), y: 0.5 * k * Math.sin(t * 29 + 1), a: 0.02 * k * Math.sin(t * 41) });

/* =========================================================================
   ARDA
   ========================================================================= */
function durumArda(t) {
  const D = { ad: 'ARDA', isik: SALON_ISIK, golgeAlfa: 0.2 };
  // ---------- SALON: koltukta (0 – 67.55) ----------
  if (t < 67.55) {
    Object.assign(D, { mekan: 'salon', x: OTUR_ARDA.x, z: OTUR_ARDA.z, yon: PI, otur: 1, telefon: 'iki' });
    // baş: + = ekranda sola (Defne'ye), - = sağa (kapıya)
    D.bas = anim(t, [[0, 0.05], [11.9, 0.05], [12.4, 0.42], [13.8, 0.42], [14.3, 0.08], [24.4, 0.08], [24.9, 0.5], [26.4, 0.5], [26.9, 0.15],
      [30.4, 0.15], [34.5, 0.15], [34.9, 0.48], [37.9, 0.48], [38.4, 0.1], [49.3, 0.1], [50.0, 0.5], [52.8, 0.5], [53.3, 0.08],
      [58.9, 0.08], [59.6, -0.85], [61.0, -0.85], [61.6, 0.45], [63.6, 0.45], [64.2, 0.0], [65.2, 0.55], [66.6, 0.55], [67.3, -0.5]]);
    D.nod = anim(t, [[0, 0.45], [11.9, 0.45], [12.4, 0.05], [13.8, 0.05], [14.3, 0.45], [24.4, 0.45], [24.9, 0.05], [26.4, 0.05], [26.9, 0.45],
      [34.5, 0.45], [34.9, 0.0], [37.9, 0.0], [38.4, 0.45], [49.3, 0.45], [50.0, 0.0], [52.8, 0.0], [53.3, 0.45], [58.9, 0.45], [59.6, -0.05], [64.0, 0.0], [65.2, 0.25], [66.6, 0.25], [67.3, 0.0]]);
    D.bakY = anim(t, [[0, 0.75], [11.9, 0.75], [12.3, 0.1], [13.9, 0.1], [14.3, 0.75], [24.4, 0.75], [24.8, 0.05], [26.4, 0.05], [26.9, 0.75],
      [34.5, 0.75], [34.9, 0.05], [37.9, 0.05], [38.4, 0.75], [49.3, 0.75], [50.0, 0.1], [52.8, 0.1], [53.3, 0.75], [58.9, 0.75], [59.6, 0.0], [65.2, 0.35], [66.6, 0.35], [67.3, 0]]);
    D.bakX = anim(t, [[0, 0], [12.2, 0], [12.5, -0.35], [13.8, -0.35], [14.2, 0], [24.8, -0.4], [26.4, -0.4], [26.8, 0], [34.8, -0.4], [37.9, -0.4], [38.3, 0],
      [49.8, -0.4], [52.8, -0.4], [53.2, 0], [59.5, 0.5], [61.0, 0.5], [61.5, -0.35], [63.6, -0.35], [64.0, 0], [65.2, -0.35], [66.6, -0.35], [67.2, 0.4]]);
    D.ifade = ifadeZaman(t, [[0, 'notr'], [10.35, 'supheli', 0.35], [11.4, 'merakli'], [14.4, 'supheli'], [17.6, 'merakli'], [22.5, 'sasirmis', 0.3], [24.2, 'ciddi'], [27.0, 'supheli'],
      [34.6, 'supheli'], [38.6, 'ciddi'], [41.0, 'ciddi'], [44.5, 'sasirmis', 0.5], [46.8, 'korkmus', 0.6], [49.2, 'endiseli'], [53.2, 'korkmus', 0.5],
      [56.8, 'dehset', 0.6], [59.2, 'endiseli'], [60.5, 'ciddi'], [64.8, 'ciddi'], [67.2, 'endiseli']]);
    D.telIsik = 1;
    D.titresim = t > 10.0 && t < 10.95 ? (Math.sin((t - 10) * PI / 0.45) > 0 ? 1 : 0.2) : 0;
    // telefon pozu: Defne'ye ekranı gösterir (29.5–38.5), indirir (49–52.8)
    const tp = { x: anim(t, [[29.2, 0], [30.0, -4.5], [38.3, -4.5], [38.9, 0]]), y: anim(t, [[0, 27], [49.0, 27], [50.2, 36], [52.8, 36], [53.4, 26], [63.8, 26], [64.4, 30]]), a: anim(t, [[29.2, 0], [30.0, -0.32], [38.3, -0.32], [38.9, 0]]) };
    D.telPoz = tp;
    // ayağa kalkış (64.0 – 65.4)
    D.otur = anim(t, [[64.0, 1], [65.4, 0]], eio);
    if (t > 64.0) {
      const k = seg(t, 64.0, 65.4);
      D.govdeEgim = 0.6 * Math.sin(k * PI);
      D.telefon = t < 64.6 ? 'iki' : null;
      D.eller = { sag: { x: 21, y: 59, tel: true }, sol: { x: -21.5, y: 60 } };
      D.isik = SALON_ISIK;
      if (t > 66.9) { D.yon = anim(t, [[66.9, PI], [67.5, 2.75]]); D.bas = anim(t, [[66.9, 0.4], [67.5, 0]]); }
    }
    D.nefesHiz = t > 46 ? 2.4 : 3.8; D.nefesGenlik = t > 46 ? 1.4 : 1;
    D.kirpEk = [22.55, 46.75, 57.0];
    return D;
  }
  // ---------- SALON → kapı ----------
  const ys = yurume('ARDA_salon', t);
  if (ys) { Object.assign(D, { mekan: 'salon', ...ys, eller: { sag: { x: 21, y: 59, tel: true }, sol: { x: -21.5, y: 60 } }, ifade: IFADE.endiseli, bas: 0 }); return D; }
  if (t < 69.0) { const s = yurumeSon('ARDA_salon'); Object.assign(D, { mekan: 'salon', x: s.x, z: s.z, yon: s.yon, ifade: IFADE.endiseli }); return D; }
  // ---------- KORİDOR ----------
  D.mekan = 'koridor'; D.isik = KOR_ISIK; D.golgeAlfa = 0.25;
  const elSarkik = { sag: { x: 21, y: 59, tel: true }, sol: { x: -21.5, y: 60 } };
  let y1 = yurume('ARDA_kor1', t), y2 = yurume('ARDA_kor2', t), y3 = yurume('ARDA_kor3', t);
  if (y1 || y2 || y3) Object.assign(D, y1 || y2 || y3);
  else if (t < 71.25) { const s = yurumeSon('ARDA_kor1'); Object.assign(D, { x: s.x, z: s.z, yon: anim(t, [[70.3, 0.6], [70.9, 0]]) }); }
  else if (t < 98.75) { const s = yurumeSon('ARDA_kor2'); Object.assign(D, { x: s.x, z: s.z, yon: 0 }); }
  else { const s = yurumeSon('ARDA_kor3'); Object.assign(D, { x: s.x, z: s.z, yon: anim(t, [[99.6, -1.2], [100.0, -PI / 2]]) }); }
  D.eller = elSarkik;
  // bakışlar: koridorda
  D.bas = anim(t, [[72.6, 0], [72.9, 0.75], [73.3, 0.75], [73.55, -0.6], [74.0, -0.6], [74.4, 0], [76.4, 0], [76.9, 0.9], [78.6, 0.9], [79.1, 0],
    [87.1, 0], [87.4, 0.8], [88.4, 0.8], [88.9, 0]]);
  D.ifade = ifadeZaman(t, [[69, 'endiseli'], [70.6, 'korkmus', 0.25], [71.3, 'endiseli'], [73.5, 'ciddi'], [74.6, 'endiseli'], [79.2, 'supheli'],
    [83.6, 'korkmus', 0.5], [84.3, 'dehset', 0.4], [89, 'dehset'], [94.3, 'korkmus'], [98.6, 'dehset', 0.25]]);
  D.nod = 0.05;
  // telefon: 79.15'te kaldırır
  if (t > 79.15 && t < 98.75) {
    D.telefon = 'iki'; D.telIsik = 1;
    const tp = telTitre(t, t > 84 ? 1 : 0.3);
    D.telPoz = { x: tp.x, y: anim(t, [[79.15, 40], [79.7, 25]]) + tp.y, a: tp.a };
    D.nod = 0.45; D.bakY = 0.7; D.bas = 0;
    if (t > 87.2 && t < 88.6) { D.bas = anim(t, [[87.2, 0], [87.5, 0.7], [88.3, 0.7], [88.6, 0]]); D.nod = anim(t, [[87.2, 0.45], [87.5, 0.05], [88.3, 0.05], [88.6, 0.45]]); D.bakY = anim(t, [[87.2, 0.7], [87.5, 0.1], [88.3, 0.1], [88.6, 0.7]]); }
    D.titresim = t > 79.15 && t < 80.1 ? (Math.sin((t - 79.15) * PI / 0.4) > 0 ? 1 : 0.2) : 0;
    D.kirpEk = [84.2];
  }
  if (t >= 98.75 && t < 99.65) { D.ifade = IFADE.dehset; }
  D.nefesHiz = t > 83 ? 1.7 : 2.6; D.nefesGenlik = t > 83 ? 1.6 : 1.1;
  // ---------- 99.65+: salon kapısında (koridor koordinatı) ----------
  if (t >= 99.65) {
    // salon kapısının eşiği; salon koordinatında (1.8, -0.15) karşılığı
    Object.assign(D, { x: anim(t, [[118.8, -0.32], [119.6, 0.02]]), z: anim(t, [[118.8, 3.1], [119.6, 3.2]]) });
    if (t > 118.8 && t < 119.6) { D.yuru = 1; D.faz = seg(t, 118.8, 119.6) * PI * 2; }
    D.telefon = 'iki'; D.telIsik = 1;
    const tp = telTitre(t, 0.7);
    D.telPoz = { x: tp.x, y: 25 + tp.y, a: tp.a };
    D.nod = 0.1; D.bakY = 0.2;
    D.ifade = ifadeZaman(t, [[99.65, 'dehset'], [100.1, 'korkmus'], [105.9, 'dehset', 0.3], [107.6, 'korkmus'], [113.8, 'korkmus'], [119.5, 'dehset', 0.3], [121.0, 'korkmus'],
      [121.5, 'dehset', 0.3], [124.2, 'dehset'], [129.0, 'korkmus'], [130.4, 'korkmus'], [133.3, 'dehset', 0.5], [137.2, 'dehset'], [142.6, 'dehset']]);
    // salona bakar (yön -π/2) ↔ telefona bakar; 119.4'te Defne gelince mutfağa döner
    D.yon = anim(t, [[99.65, -PI / 2], [119.2, -PI / 2], [120.4, 0]]);
    if (t > 105.6 && t < 107.6) { D.nod = 0.45; D.bakY = 0.75; }
    if (t > 113.6 && t < 116.8) { D.nod = anim(t, [[113.6, 0.1], [114.0, 0.35]]); D.bakY = 0.4; }
    if (t > 119.0) {
      // Defne'nin kolunu tutar
      D.telefon = t < 139.2 ? null : 'iki';
      D.eller = { sol: { x: -21, y: 59, tel: true }, sag: { x: 27, y: 52, on: true } };
      D.bas = anim(t, [[119.0, 0], [119.4, -0.6], [120.6, -0.6], [121.1, 0], [126.4, 0], [126.8, -0.5], [128.9, -0.5], [129.3, 0],
        [137.6, 0], [138.0, -0.3], [139.0, 0], [141.6, 0], [142.0, -0.35], [143.0, -0.35], [143.6, 0]]);
      D.nod = anim(t, [[119.0, 0.1], [121.0, 0.0], [139.2, 0.0], [139.9, 0.4]]);
      D.bakY = anim(t, [[119.0, 0.2], [121.0, 0.0], [139.2, 0.0], [139.9, 0.7]]);
      D.bakX = anim(t, [[141.6, 0], [142.0, -0.6], [143.2, -0.6], [143.6, 0]]);
      if (t >= 139.2) {
        const tp2 = telTitre(t, 1.6);
        D.telPoz = { x: tp2.x, y: anim(t, [[139.2, 44], [140.3, 24]]) + tp2.y, a: tp2.a };
        D.eller = undefined;
      }
    }
    D.nefesHiz = 1.6; D.nefesGenlik = 1.7;
    D.kirpEk = [107.5, 121.9, 133.4];
  }
  return D;
}

// Arda'nın salon koordinatındaki karşılığı (salonun ters açısında kapı eşiğinde görünür)
function ardaSalonKapisinda(t) {
  const A = durumArda(t);
  if (A.mekan !== 'koridor' || t < 98.9) return null;
  const B = { ...A, mekan: 'salon', isik: { dx: -0.5, dy: 0.5 } };
  // koridor(x=-0.32..0, z=3.1) → salon(x=1.8, z=-0.12..-0.5)
  const ileri = t < 99.65 ? anim(t, [[98.9, -0.75], [99.65, -0.12]]) : -0.12;
  B.x = 1.8 + (t < 99.65 ? 0.08 : 0); B.z = ileri;
  B.yon = -0.5;
  if (t < 99.65) { B.yuru = 1; B.faz = (t - 98.9) / 0.75 * PI * 2; }
  return B;
}

/* =========================================================================
   DEFNE
   ========================================================================= */
function durumDefne(t) {
  const D = { ad: 'DEFNE', isik: SALON_ISIK, golgeAlfa: 0.2 };
  if (t < 110.55) {
    // koltukta. 29.2'den sonra abisine yaklaşır (x: -0.45 → -0.2); 59.8'de daha da sokulur
    const x = anim(t, [[29.2, OTUR_DEFNE.x], [30.2, -0.2], [59.8, -0.2], [60.5, -0.05], [67.6, -0.05], [68.6, -0.2]]);
    Object.assign(D, { mekan: 'salon', x, z: OTUR_DEFNE.z, yon: PI, otur: 1 });
    // telefonuna bakar (0–29); 29'dan sonra telefonu kucağına bırakır
    if (t < 29.2) { D.telefon = 'iki'; D.telPoz = { x: 0, y: 34, a: 0.05 }; D.telIsik = 0.9; }
    else D.eller = { sol: { x: -6, y: 50, on: true }, sag: { x: 7, y: 51, on: true } };
    if (t > 59.8 && t < 67.6) D.eller = { sol: { x: -4, y: 40, on: true }, sag: { x: 6, y: 42, on: true } };
    D.kafaX = anim(t, [[29.2, 0], [30.2, 4.5], [38.6, 4.5], [39.4, 2], [49, 2], [49.6, 0]]);
    D.egim = anim(t, [[29.2, 0], [30.2, -0.1], [38.6, -0.1], [39.4, -0.04], [49, -0.04], [49.6, 0]]);
    D.bas = anim(t, [[0, 0.1], [14.6, 0.1], [15.0, -0.4], [17.4, -0.4], [17.9, 0.08], [26.4, 0.08], [26.8, -0.5], [29.2, -0.5], [30.2, -0.25],
      [33.5, -0.25], [33.9, -0.55], [38.6, -0.55], [39.3, -0.3], [46.9, -0.3], [47.2, -0.5], [49.2, -0.5], [49.8, -0.6], [52.8, -0.6], [53.4, -0.35],
      [59.4, -0.35], [59.8, -1.0], [61.0, -1.0], [61.3, -0.55], [63.8, -0.55], [64.2, -0.45], [66.6, -0.6], [67.6, -0.8], [68.5, -0.95], [69.5, -0.7]]);
    D.nod = anim(t, [[0, 0.55], [14.6, 0.55], [15.0, 0.0], [17.4, 0.0], [17.9, 0.55], [26.4, 0.55], [26.8, 0.05], [29.2, 0.05], [30.2, 0.35],
      [33.5, 0.35], [33.9, 0.0], [39.3, 0.25], [46.9, 0.25], [47.2, 0.0], [59.8, 0.0], [64.2, -0.25], [66.6, -0.3], [67.6, 0], [69.5, 0]]);
    D.bakY = anim(t, [[0, 0.8], [14.6, 0.8], [15.0, 0.0], [17.4, 0.0], [17.9, 0.8], [26.4, 0.8], [26.8, 0.1], [29.2, 0.1], [30.2, 0.6],
      [33.5, 0.6], [33.9, 0.0], [39.3, 0.55], [46.9, 0.55], [47.2, 0.0], [64.2, -0.5], [66.6, -0.55], [67.6, 0]]);
    D.bakX = anim(t, [[30.2, 0.35], [33.5, 0.35], [33.9, 0.45], [38.6, 0.45], [39.3, 0.4], [59.8, 0.45], [60.0, 0.6], [61.0, 0.6], [61.3, 0.3], [67.6, 0.5]]);
    D.ifade = ifadeZaman(t, [[0, 'rahat'], [14.8, 'rahat'], [17.6, 'rahat'], [26.5, 'merakli'], [30.4, 'merakli'], [30.9, 'sasirmis', 0.3], [32.6, 'supheli', 0.5],
      [33.9, 'sasirmis'], [36.2, 'endiseli', 0.6], [42.5, 'endiseli'], [46.5, 'korkmus', 0.5], [49.0, 'korkmus'], [52.0, 'korkmus'],
      [59.4, 'dehset', 0.25], [60.8, 'korkmus'], [64.0, 'korkmus'], [67.6, 'dehset', 0.5], [69.5, 'korkmus'], [86.8, 'endiseli'], [94.6, 'korkmus'],
      [97.3, 'endiseli'], [100.2, 'korkmus', 0.4], [103.2, 'korkmus'], [106.0, 'dehset']]);
    // salonda yalnız (69.5 – 110.5): kapıya / abisine bakar
    if (t > 69.5) {
      const kapiYon = Math.atan2(1.8 - D.x, -0.2 - D.z);           // salon kapısına bakış yönü
      D.bas = norm(kapiYon - PI) * anim(t, [[69.5, 0.7], [70.5, 0.55], [84, 0.55], [86.9, 0.75], [90, 0.75], [92.5, 0.45], [97.2, 0.45], [97.4, 0.85], [104, 0.85]]);
      D.nod = anim(t, [[69.5, 0], [75, 0.25], [86.5, 0.25], [86.9, -0.05], [92.5, 0.2], [97.2, 0.2], [97.4, -0.05], [99.6, 0], [100.2, 0.05]]);
      D.bakX = anim(t, [[69.5, 0.5], [75, 0.3], [86.9, 0.5], [92.5, 0.2], [97.4, 0.5]]);
      D.bakY = anim(t, [[69.5, 0], [75, 0.4], [86.5, 0.4], [86.9, 0], [92.5, 0.35], [97.2, 0.35], [97.4, 0]]);
      D.eller = { sol: { x: -5, y: 44, on: true }, sag: { x: 6, y: 45, on: true } };
      D.telefon = null;
      if (t > 99.6) { D.nefesHiz = 1.5; D.nefesGenlik = 1.8; }
      // ayağa kalkar (109.4 – 110.55)
      D.otur = anim(t, [[109.4, 1], [110.5, 0]], eio);
      if (t > 109.4) { D.govdeEgim = 0.6 * Math.sin(seg(t, 109.4, 110.5) * PI); D.eller = { sol: { x: -19, y: 58 }, sag: { x: 19, y: 58 } }; D.yon = anim(t, [[109.4, PI], [110.5, 2.2]]); D.bas = anim(t, [[109.4, -0.6], [110.5, 0]]); }
    }
    D.nefesHiz = t > 46 ? 2.0 : 3.6; D.nefesGenlik = t > 46 ? 1.5 : 1;
    if (t > 99.6) { D.nefesHiz = 1.4; D.nefesGenlik = 1.9; }
    D.kirpEk = [30.95, 47.1, 59.5, 67.7];
    return D;
  }
  // salon içinde kapıya yürür (110.55 – 118.2) — arkaya bakmaz
  const ys = yurume('DEFNE_salon', t);
  if (ys) { Object.assign(D, { mekan: 'salon', ...ys, eller: { sol: { x: -18, y: 57 }, sag: { x: 18, y: 57 } }, ifade: ifadeZaman(t, [[110.5, 'korkmus'], [113.8, 'dehset', 0.6]]), nefesHiz: 1.3, nefesGenlik: 2, bakY: -0.05 }); D.bas = 0; return D; }
  if (t < 118.6) { const s = yurumeSon('DEFNE_salon'); Object.assign(D, { mekan: 'salon', x: s.x, z: s.z, yon: s.yon, ifade: IFADE.dehset }); return D; }
  // koridor: abisinin yanında
  D.mekan = 'koridor'; D.isik = KOR_ISIK; D.golgeAlfa = 0.25;
  const yk = yurume('DEFNE_kor', t);
  if (yk) Object.assign(D, yk); else { const s = yurumeSon('DEFNE_kor'); Object.assign(D, { x: s.x, z: s.z, yon: anim(t, [[119.7, 1.0], [120.8, 0.05]]) }); }
  D.eller = { sol: { x: -24, y: 46, on: true }, sag: { x: 19, y: 58 } };
  if (t > 129.4) D.eller = { sol: { x: -27, y: 38, on: true }, sag: { x: -8, y: 36, on: true } };   // abisinin koluna sarılır
  D.bas = anim(t, [[119.7, 0.6], [120.6, 0.6], [121.1, 0], [126.6, 0], [126.9, 0.55], [128.9, 0.55], [129.3, 0.1], [141.5, 0.1], [142.4, 0.95], [146, 0.95]]);
  D.bakX = anim(t, [[121, 0], [126.6, 0], [126.9, 0.5], [128.9, 0.5], [129.3, 0], [141.5, 0], [142.4, 0.55]]);
  D.ifade = ifadeZaman(t, [[118.6, 'dehset'], [120.2, 'korkmus'], [121.6, 'dehset', 0.3], [124.4, 'dehset'], [127.0, 'dehset'], [129.5, 'dehset'], [142.4, 'korkmus'], [145.0, 'dehset']]);
  D.nefesHiz = 1.25; D.nefesGenlik = 2.1;
  D.kirpEk = [121.7, 133.3];
  D.egim = anim(t, [[129.4, 0], [130.0, 0.08]]);
  return D;
}

/* =========================================================================
   İKİNCİ DEFNE (görünüşü birebir Defne; fark: sakin yüz, az göz kırpma, yavaş hareket, ışıksız bakış)
   ========================================================================= */
const K2_KONUM = [0.95, 0.08];
function durumIkinci(t) {
  const liste = [];
  const temel = { ad: 'IKINCI', tasarim: 'DEFNE', ifade: IFADE.bos, isik: KOR_ISIK, nefesHiz: 6, nefesGenlik: 0.4, golgeAlfa: 0.22 };
  // Sahne 1: mutfak kapısı aralığında kısa gölge
  if (t > 5.45 && t < 6.45) liste.push({ ...temel, mekan: 'koridor', x: 0.3, z: 7.72, yon: PI, siluet: 1, alfa: ss(seg(t, 5.45, 5.6)) * (1 - ss(seg(t, 6.2, 6.45))), sadeceKamera: true });
  // Salonda koltuğun arkasında (yalnızca K2 kamerasında görünür)
  if (t > 82.6 && t < 125) {
    const yonK2 = Math.atan2(K2_KONUM[0] - (-0.2), K2_KONUM[1] - 4.32);
    liste.push({ ...temel, mekan: 'salon', x: -0.2, z: 4.32, yon: yonK2, isik: SALON_ISIK, sadeceKamera: true,
      siluet: anim(t, [[82.6, 1], [89.4, 1], [93.2, 0.12]]), alfa: ss(seg(t, 82.8, 84.0)),
      egim: anim(t, [[117.3, 0.0], [118.6, 0.26]], eio), bas: 0, eller: { sol: { x: -18, y: 58 }, sag: { x: 18, y: 58 } } });
  }
  // Mutfak kapısında (123.5 →)
  if (t > 123.0) {
    const z = anim(t, [[123, 7.75], [131.2, 7.75], [133.0, 7.32]]);
    liste.push({ ...temel, mekan: 'koridor', x: 0.12, z, yon: PI, siluet: anim(t, [[123, 0.85], [130.5, 0.85], [132.6, 0.25]]), alfa: ss(seg(t, 129.4, 130.4)),
      egim: anim(t, [[133.0, 0], [134.3, 0.24]], eio), bas: anim(t, [[141.6, 0], [142.4, 0.12]]),
      bakX: anim(t, [[141.6, 0], [142.4, -0.25]]), eller: { sol: { x: -18.5, y: 58 }, sag: { x: 18.5, y: 58 } }, derinlikEk: 0 });
  }
  return liste;
}

/* ---- 23:14 kaydı: rec = kayıt saniyesi ---- */
function kayitKarakterleri(rec) {
  const yurur = rec < 22.8;
  const z = 1.2 + 0.2 * Math.min(rec, 22.8);
  const don = seg(rec, 23.1, 25.3);                              // aniden durur, sonra yavaşça döner
  const ikinci = { ad: 'IKINCI', tasarim: 'DEFNE', mekan: 'koridor', x: 0.08, z, ifade: IFADE.bos, isik: KOR_ISIK,
    yon: lerp(0, -PI + 0.05, eio(don)), bas: lerp(0, -0.9, ss(seg(rec, 22.9, 24.3))) * (1 - ss(seg(rec, 24.3, 25.6))),
    yuru: yurur ? 1 : 0, faz: rec * 2 * PI * 0.8, eller: { sol: { x: -18.5, y: 58 }, sag: { x: 18.5, y: 58 } }, sadeceKamera: true, nefesGenlik: 0.3 };
  const arda = { ad: 'ARDA', mekan: 'salon', x: OTUR_ARDA.x, z: OTUR_ARDA.z, yon: PI, otur: 1, telefon: 'iki', telPoz: { x: 0, y: 27, a: 0 }, nod: 0.45, bakY: 0.7, ifade: IFADE.notr, isik: SALON_ISIK, agizKapali: true };
  const defne = { ad: 'DEFNE', mekan: 'salon', x: OTUR_DEFNE.x, z: OTUR_DEFNE.z, yon: PI, otur: 1, telefon: 'iki', telPoz: { x: 0, y: 34, a: 0.05 }, nod: 0.55, bakY: 0.8, ifade: IFADE.rahat, isik: SALON_ISIK, agizKapali: true, bas: 0.1 };
  return [arda, defne, ikinci];
}

function canliKarakterler(t) {
  const A = durumArda(t), D = durumDefne(t);
  return [A, D, ...durumIkinci(t)];
}

/* =========================================================================
   KAMERALAR
   ========================================================================= */
const K_ON = () => new Kam3B({ x: 0, y: 1.22, z: -0.9, yaw: 0, pitch: 0.07, f: 1750 });          // salon: TV tarafından koltuğa
const K_KAPI = () => new Kam3B({ x: 1.72, y: 1.5, z: -0.35, yaw: -0.5, pitch: 0.06, f: 1500 });   // salon: kapı eşiğinden (Arda'nın bakışı)
const K_TERS = () => new Kam3B({ x: -0.55, y: 1.42, z: 1.05, yaw: 2.06, pitch: 0.03, f: 1500 });     // salon: odanın içinden kapıya
const K_KOR_ILERI = (z = 1.2, x = 0.05, y = 1.55) => new Kam3B({ x, y, z, yaw: 0, pitch: 0.02, f: 1250 });
const K_KOR_GERI = (z = 6.2, x = 0.0, y = 1.52) => new Kam3B({ x, y, z, yaw: PI, pitch: 0.02, f: 1250 });

// 2B kamera: karakterin yüzünü (ox, oy) ekran oranına getirir
function yuzeOdak(K, D, z, oy = 0.4, ox = 0.5, dx = 0, dy = 0) {
  const y = yuzKonum(K, D);
  return { x: y.x + dx * y.s * 100 / 100, y: y.y + dy * y.s, z, ox: W * ox, oy: H * oy };
}
function karisK(a, b, k) { return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), z: lerp(a.z, b.z, k), ox: lerp(a.ox ?? W / 2, b.ox ?? W / 2, k), oy: lerp(a.oy ?? H / 2, b.oy ?? H / 2, k) }; }
// Hafif el kamerası nefesi (sallanma değil, çok küçük süzülme)
function suzul(k, t, a = 1) { return { ...k, x: k.x + a * 2.2 * gur2(t * 0.25, 3) / k.z, y: k.y + a * 1.8 * gur2(t * 0.22, 7) / k.z }; }

/* =========================================================================
   TELEFON YAKIN ÇEKİMİ (Arda'nın elinde)
   ========================================================================= */
function telefonCekimi(ctx, t, o) {
  // arka plan: bulanık mekân
  ctx.save();
  if (o.arka) o.arka(ctx);
  ctx.restore();
  const k2 = o.k2 || { x: W / 2, y: H / 2, z: 1 };
  ctx.save(); kamera2B(ctx, k2);
  const cx = 540 + (o.dx || 0), cy = 900 + (o.dy || 0), gen = 760, a = o.aci ?? -0.03;
  const tt = o.titre || 0;
  const jx = tt * 3 * Math.sin(t * 31), jy = tt * 2.5 * Math.sin(t * 27 + 1);
  // sol el (alttan kavrar)
  const ten = TASARIM.ARDA.ten, tenG = TASARIM.ARDA.tenG;
  const yuk = gen * 2.06;
  ctx.save(); ctx.translate(cx + jx, cy + jy); ctx.rotate(a);
  const avuc = new Path2D();
  avuc.moveTo(-gen * 0.62, yuk * 0.62); avuc.bezierCurveTo(-gen * 0.6, yuk * 0.3, -gen * 0.58, yuk * 0.18, -gen * 0.5, yuk * 0.12);
  avuc.lineTo(-gen * 0.2, yuk * 0.38); avuc.bezierCurveTo(-gen * 0.05, yuk * 0.5, gen * 0.05, yuk * 0.6, gen * 0.2, yuk * 0.75); avuc.lineTo(-gen * 0.62, yuk * 0.75); avuc.closePath();
  boya(ctx, avuc, ten, { r: tenG, dx: 18, dy: 0 }, KONTUR, 5);
  ctx.restore();
  telefonCiz(ctx, cx + jx, cy + jy, gen, a, (g, w, h) => { o.ekran(g, w, h); });
  // sol elin parmakları (telefon kenarını sarar)
  ctx.save(); ctx.translate(cx + jx, cy + jy); ctx.rotate(a);
  for (let i = 0; i < 3; i++) {
    const p = new Path2D(); p.roundRect(-gen * 0.555, yuk * (0.1 + i * 0.095), gen * 0.085, yuk * 0.082, gen * 0.04);
    boya(ctx, p, ten, { r: tenG, dx: 6, dy: 0 }, KONTUR, 4.5);
  }
  ctx.restore();
  // sağ el + başparmak (sağ alt köşeden ekrana uzanır)
  const b = o.basParmak;
  if (b) {
    const [bx, by] = b;
    const ew = gen - gen * 0.07, eh = yuk - gen * 0.07;
    const hx = cx + jx - ew / 2 + bx * ew, hy = cy + jy - eh / 2 + by * eh;
    const bas = o.bas || 0;
    const ux = hx + 34 * (1 - bas), uy = hy + 42 * (1 - bas);
    const aci = -2.2, L0 = 215;                       // başparmak yönü (sol-yukarı)
    const kx = ux - Math.cos(aci) * L0, ky = uy - Math.sin(aci) * L0;
    ctx.save();
    // avuç (telefonun sağ alt kenarının dışında kalan kısmı)
    const avucS = new Path2D();
    avucS.moveTo(kx - 30, ky + 10); avucS.bezierCurveTo(kx + 30, ky - 60, kx + 150, ky - 20, kx + 210, ky + 120);
    avucS.lineTo(kx + 230, ky + 520); avucS.lineTo(kx - 10, ky + 520); avucS.bezierCurveTo(kx - 70, ky + 230, kx - 80, ky + 80, kx - 30, ky + 10); avucS.closePath();
    boya(ctx, avucS, ten, { r: tenG, dx: 22, dy: 8 }, KONTUR, 5);
    // başparmak
    const p = new Path2D();
    const nx = Math.cos(aci + PI / 2), ny = Math.sin(aci + PI / 2), r1 = 44, r2 = 33;
    p.moveTo(kx + nx * r1, ky + ny * r1); p.lineTo(ux + nx * r2, uy + ny * r2);
    p.arc(ux, uy, r2, aci + PI / 2, aci - PI / 2, true);
    p.lineTo(kx - nx * r1, ky - ny * r1); p.closePath();
    boya(ctx, p, ten, { r: tenG, dx: -nx * 12, dy: -ny * 12 }, KONTUR, 5);
    // tırnak + boğum
    ctx.translate(ux, uy); ctx.rotate(aci + PI / 2);
    ctx.fillStyle = '#f6dccb'; ctx.strokeStyle = rgba(KONTUR, 0.55); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(-20, -2, 40, 46, 18); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = rgba(KONTUR, 0.35); ctx.beginPath(); ctx.moveTo(-22, 92); ctx.quadraticCurveTo(0, 99, 22, 92); ctx.stroke();
    ctx.restore();
    if (o.dalga > 0) { ctx.save(); ctx.strokeStyle = rgba('#ffffff', 0.6 * (1 - o.dalga)); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(hx, hy, 20 + 70 * o.dalga, 0, TAU); ctx.stroke(); ctx.restore(); }
  }
  // ekran ışığı ellere
  isikTopu(ctx, cx, cy, gen * 1.1, '#a9c8ff', 0.1);
  ctx.restore();
}
// Bulanık, karanlık mekân arka planı (telefon çekimleri için)
const _bulanik = {};
function bulanikArka(tur, t) {
  return (ctx) => {
    if (_bulanik[tur]) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(_bulanik[tur], 0, 0); ctx.restore(); return; }
    const A = tuval(W, H), g = A.getContext('2d');
    if (tur === 'salon') salonCek(g, K_ON(), t, { k2: { x: 560, y: 760, z: 1.7 }, karakterler: [] });
    else if (tur === 'koridor') koridorCek(g, K_KOR_GERI(3.0, 0, 1.45), t, { k2: { x: 540, y: 900, z: 1.25 }, karakterler: [] });
    else if (tur === 'koridorIleri') koridorCek(g, K_KOR_ILERI(2.6, -0.1, 1.45), t, { k2: { x: 540, y: 860, z: 1.25 }, karakterler: [] });
    else if (tur === 'salonKapi') salonCek(g, K_TERS(), t, { k2: { x: 540, y: 900, z: 1.3 }, karakterler: [] });
    const B = tuval(W, H), b = B.getContext('2d');
    b.filter = 'blur(26px)'; b.drawImage(A, -40, -40, W + 80, H + 80); b.filter = 'none';
    b.fillStyle = 'rgba(8,10,14,0.45)'; b.fillRect(0, 0, W, H);
    _bulanik[tur] = B;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(B, 0, 0); ctx.restore();
  };
}

/* ---- ekran içerikleri ---- */
function kayitGoruntusu(rec, ekst = {}) {
  return (g, w, h) => kameraGoruntusu(g, w, h, 0, {
    kamera: 'K1', saat: 23 * 3600 + 14 * 60 + 2 + rec, karakterler: kayitKarakterleri(rec), kayitYazisi: true, yuva: ekst.yuva || 'a', simdi: true, ...ekst
  });
}
function k2KayitGoruntusu(rec, ekst = {}) {
  return (g, w, h) => kameraGoruntusu(g, w, h, 0, {
    kamera: 'K2', saat: 23 * 3600 + 14 * 60 + 2 + rec, karakterler: kayitKarakterleri(rec), kayitYazisi: true, yuva: ekst.yuva || 'b', simdi: true, ...ekst
  });
}
function canliGoruntu(kamera, t, ekst = {}) {
  return (g, w, h) => kameraGoruntusu(g, w, h, t, { kamera, saat: hikayeSaati(t), karakterler: canliKarakterler(t), canli: true, kapiAci: kapiAcisi(t), yuva: ekst.yuva || 'a', ...ekst });
}
// Mutfak kapısı açıklığı (radyan) — tüm açılardan aynı
function kapiAcisi(t) {
  return anim(t, [[0, 0], [3.6, 0], [5.4, 0.5], [9, 0.5], [10, 0.0], [121.3, 0], [124.0, 0.42], [129.0, 0.42], [130.6, 1.05], [150, 1.05]]);
}

/* =========================================================================
   ÇEKİM LİSTESİ
   her çekim: { t0, t1, sahne, ciz(ctx, t) , giris?: {tip:'erit'|'parazit', sure} }
   ========================================================================= */
const CEKIMLER = [];
function cekim(t0, t1, sahne, ciz, giris) { CEKIMLER.push({ t0, t1, sahne, ciz, giris }); }

// ---------- SAHNE 01 (0–9): K1 koridor, canlı ----------
cekim(0, 9, 1, (ctx, t) => {
  const K = KAMERA_K1(); const kp = K.p(0, 1.0, 7.4);
  const z = 1 + 0.15 * eio(seg(t, 1.4, 8.6));
  kameraGoruntusu(ctx, W, H, t, {
    kamera: 'K1', saat: hikayeSaati(t), canli: true, karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), yuva: 'tam',
    zoom: { x: lerp(W / 2, kp[0], seg(t, 1.4, 8.6)), y: lerp(H / 2, kp[1], seg(t, 1.4, 8.6)), z },
    parazit: Math.max(1 - seg(t, 0.55, 1.05), t > 5.95 && t < 6.25 ? 0.85 : 0), hareket: t > 7.55 ? 1 : 0,
  });
  if (t < 0.55) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); }
});

// ---------- SAHNE 02 (9–19): salon, iki kardeş ----------
cekim(9, 19, 2, (ctx, t) => {
  const K = K_ON(), A = durumArda(t), D = durumDefne(t);
  const iki = { x: (yuzKonum(K, A).x + yuzKonum(K, D).x) / 2, y: yuzKonum(K, A).y + 60, z: 1.0, ox: W / 2, oy: H * 0.42 };
  const ardaY = yuzeOdak(K, A, 1.8, 0.4), defY = yuzeOdak(K, D, 1.8, 0.4);
  let k = karisK(iki, { ...iki, z: 1.08 }, seg(t, 9, 10.2));
  k = karisK(k, ardaY, eio(seg(t, 10.3, 13.4)));
  k = karisK(k, { ...defY, z: 1.86 }, eio(seg(t, 14.6, 16.6)));
  k = karisK(k, { ...yuzeOdak(K, A, 2.05, 0.36, 0.5, 0, 30) }, eio(seg(t, 17.3, 19.0)));
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t) });
});

// ---------- SAHNE 03 (19–29): bildirim geçmişi → 23:14 kaydı ----------
const TEL_SALON = bulanikArka('salon', 20);
cekim(19, 22.7, 3, (ctx, t) => {
  const z = 1.0 + 0.06 * seg(t, 19, 22.7);
  const dokun = seg(t, 20.05, 20.3) * (1 - seg(t, 20.45, 20.7));
  const ac = eo(seg(t, 20.65, 21.0));
  telefonCekimi(ctx, t, {
    arka: TEL_SALON, k2: { x: 540, y: 880, z },
    basParmak: t < 21.0 ? [0.42, 0.45] : [0.75, 0.95], bas: dokun, dalga: seg(t, 20.3, 20.75) * (t < 20.75 ? 1 : 0),
    ekran: (g, w, h) => {
      ekranListe(g, w, h, t, { saat: hikayeSaati(t), secili: 1, seciliK: seg(t, 20.15, 20.35), kucukResim: (gg, x, y, ww, hh, i) => { gg.save(); gg.translate(x, y); kayitGoruntusu(i === 1 ? 4 : 0.5, { yuva: 'kucuk' + i, gren: 0.1 })(gg, ww, hh); gg.restore(); } });
      if (ac > 0) { g.save(); g.translate(w * (1 - ac), 0); ekranOynatici(g, w, h, t, { saat: hikayeSaati(t), baslik: 'K1 · Koridor', alt: 'Kayıt · 23:14', ilerleme: 0.05, goruntu: kayitGoruntusu(Math.max(0, t - 21.0)) }); g.restore(); }
    },
  });
});
cekim(22.7, 26.5, 3, (ctx, t) => {
  const K = K_ON(), A = durumArda(t);
  const k = karisK(yuzeOdak(K, A, 4.2, 0.4), yuzeOdak(K, A, 4.85, 0.4), eio(seg(t, 22.7, 26.5)));
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t), blur: 7, odakD: K.derinlik(A.x, 1, A.z) });
});
cekim(26.5, 29, 3, (ctx, t) => {
  const z = lerp(1.12, 1.24, eio(seg(t, 26.5, 29)));
  telefonCekimi(ctx, t, {
    arka: TEL_SALON, k2: { x: 540, y: 820, z }, ekran: (g, w, h) => ekranOynatici(g, w, h, t, { saat: hikayeSaati(t), baslik: 'K1 · Koridor', alt: 'Kayıt · 23:14', ilerleme: 0.05 + (t - 21) * 0.02, goruntu: kayitGoruntusu(t - 21.0) }),
  });
}, { tip: 'erit', sure: 0.25 });

// ---------- SAHNE 04 (29–39): Defne ekrana yaklaşır ----------
cekim(29, 34.4, 4, (ctx, t) => {
  const K = K_ON(), D = durumDefne(t), A = durumArda(t);
  const k = karisK(yuzeOdak(K, D, 3.4, 0.4, 0.47), yuzeOdak(K, D, 4.0, 0.4, 0.47), eio(seg(t, 29.2, 34.4)));
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t), blur: 4, odakD: K.derinlik(D.x, 1, D.z) });
});
cekim(34.4, 39, 4, (ctx, t) => {
  const K = K_ON(), A = durumArda(t);
  const k = karisK(yuzeOdak(K, A, 3.3, 0.4, 0.53), yuzeOdak(K, A, 3.9, 0.4, 0.53), eio(seg(t, 34.4, 39)));
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t), blur: 4, odakD: K.derinlik(A.x, 1, A.z) });
});

// ---------- SAHNE 05 (39–49): K1 ve K2 aynı saatte ----------
cekim(39, 42.6, 5, (ctx, t) => {
  const dokun = seg(t, 40.1, 40.3) * (1 - seg(t, 40.45, 40.65));
  const ac = ss(seg(t, 40.6, 41.0));
  telefonCekimi(ctx, t, {
    arka: TEL_SALON, k2: { x: 540, y: 880, z: 1.0 + 0.05 * seg(t, 39, 42.6) },
    basParmak: [0.72, 0.9], bas: dokun, dalga: t > 40.3 && t < 40.8 ? seg(t, 40.3, 40.8) : 0,
    ekran: (g, w, h) => {
      ekranOynatici(g, w, h, t, { saat: hikayeSaati(t), baslik: 'K1 · Koridor', alt: 'Kayıt · 23:14', ilerleme: 0.32, karsilastirBas: dokun, goruntu: kayitGoruntusu(7.5 + (t - 39) * 0.3) });
      if (ac > 0) { g.save(); g.globalAlpha = ac; ekranKarsilastir(g, w, h, t, { saat: hikayeSaati(t), ilerleme: 0.35, kayitSaat: 23 * 3600 + 14 * 60 + 2 + (t - 32.5), goruntu: (gg, ww, hh, i) => (i ? k2KayitGoruntusu(t - 32.5) : kayitGoruntusu(t - 32.5))(gg, ww, hh) }); g.restore(); }
    },
  });
});
cekim(42.6, 46.6, 5, (ctx, t) => {
  const z = lerp(2.05, 2.3, eio(seg(t, 42.6, 46.6)));
  telefonCekimi(ctx, t, {
    arka: TEL_SALON, k2: { x: 540, y: 745, z, oy: H * 0.46 },
    ekran: (g, w, h) => ekranKarsilastir(g, w, h, t, { saat: hikayeSaati(t), ilerleme: 0.35 + (t - 41) * 0.02, kayitSaat: 23 * 3600 + 14 * 60 + 2 + (t - 32.5), goruntu: (gg, ww, hh, i) => (i ? k2KayitGoruntusu(t - 32.5) : kayitGoruntusu(t - 32.5))(gg, ww, hh) }),
  });
});
cekim(46.6, 49, 5, (ctx, t) => {
  const K = K_ON(), A = durumArda(t);
  const k = karisK(yuzeOdak(K, A, 12.5, 0.42, 0.5, 0, 3), yuzeOdak(K, A, 14.6, 0.42, 0.5, 0, 3), eio(seg(t, 46.6, 49)));
  salonCek(ctx, K, t, { k2: k, karakterler: canliKarakterler(t), blur: 10, odakD: K.derinlik(A.x, 1, A.z) });
});

// ---------- SAHNE 06 (49–59): "Resmen sensin" ----------
cekim(49, 52.8, 6, (ctx, t) => {
  const K = K_ON(), A = durumArda(t), D = durumDefne(t);
  const iki = { x: (yuzKonum(K, A).x + yuzKonum(K, D).x) / 2, y: yuzKonum(K, A).y + 40, z: 1.55, ox: W / 2, oy: H * 0.42 };
  const k = karisK(iki, yuzeOdak(K, D, 3.0, 0.4, 0.5), eio(seg(t, 49.6, 52.6)));
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t), blur: 3 * seg(t, 49.6, 52.6), odakD: K.derinlik(D.x, 1, D.z) });
});
cekim(52.8, 55.2, 6, (ctx, t) => {
  const K = K_ON(), A = durumArda(t);
  const k = karisK(yuzeOdak(K, A, 4.2, 0.4), yuzeOdak(K, A, 4.8, 0.4), eio(seg(t, 52.8, 55.2)));
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t), blur: 7, odakD: K.derinlik(A.x, 1, A.z) });
});
cekim(55.2, 59, 6, (ctx, t) => {
  const rec = t - 32.2;                                // durur (23.1), döner (23.1–25.3)
  const KK = KAMERA_K1(); const ik = kayitKarakterleri(rec)[2];
  const yp = yuzKonum(KK, ik);
  const dz = lerp(1, 11, eio(seg(t, 55.9, 58.6)));
  telefonCekimi(ctx, t, {
    arka: TEL_SALON, k2: { x: 540, y: 745, z: lerp(2.15, 2.3, seg(t, 55.2, 59)), oy: H * 0.46 },
    ekran: (g, w, h) => ekranOynatici(g, w, h, t, { saat: hikayeSaati(t), baslik: 'K1 · Koridor', alt: 'Kayıt · 23:14', ilerleme: 0.62,
      goruntu: kayitGoruntusu(rec, { zoom: { x: lerp(W / 2, yp.x, seg(t, 55.9, 57.5)), y: lerp(H / 2, yp.y, seg(t, 55.9, 57.5)), z: dz }, parazit: t > 58.3 && t < 58.62 ? 0.9 : 0 }) }),
  });
});

// ---------- SAHNE 07 (59–69): koridordan ayak sesi ----------
cekim(59, 63.7, 7, (ctx, t) => {
  const K = K_ON(), A = durumArda(t), D = durumDefne(t);
  const iki = { x: (yuzKonum(K, A).x + yuzKonum(K, D).x) / 2 + 20, y: yuzKonum(K, A).y + 50, z: 1.5, ox: W / 2, oy: H * 0.42 };
  const k = karisK(iki, { ...yuzeOdak(K, D, 2.1, 0.42, 0.42) }, eio(seg(t, 60.8, 63.4)));
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t) });
});
cekim(63.7, 67.6, 7, (ctx, t) => {
  const K = K_ON(), A = durumArda(t);
  const f = yuzeOdak(K, A, lerp(2.0, 2.45, eio(seg(t, 64.0, 67.4))), 0.4, 0.55);
  salonCek(ctx, K, t, { k2: suzul(f, t), karakterler: canliKarakterler(t), blur: 3, odakD: K.derinlik(A.x, 1, A.z) });
});
cekim(67.6, 69, 7, (ctx, t) => {
  const K = K_ON(), D = durumDefne(t);
  const k = karisK(yuzeOdak(K, D, 3.9, 0.4, 0.42), yuzeOdak(K, D, 4.3, 0.4, 0.42), seg(t, 67.6, 69));
  salonCek(ctx, K, t, { k2: k, karakterler: canliKarakterler(t), blur: 6, odakD: K.derinlik(D.x, 1, D.z) });
});

// ---------- SAHNE 08 (69–79): koridor ----------
cekim(69, 73.2, 8, (ctx, t) => {
  const A = durumArda(t);
  const kz = Math.min(A.z - 2.1, 1.75), K = K_KOR_ILERI(lerp(0.9, kz, seg(t, 69, 72.6)), 0.02, 1.58);
  const yp = yuzKonum(K, A);
  const k = { x: lerp(540, yp.x, 0.5), y: yp.y + 160, z: lerp(1.25, 1.42, eio(seg(t, 69, 73.2))), ox: W / 2, oy: H * 0.45 };
  koridorCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), lambaTitreme: t > 70.55 && t < 70.85 ? 1 : 0 });
}, { tip: 'erit', sure: 0.3 });
cekim(73.2, 79, 8, (ctx, t) => {
  const K = K_KOR_GERI(6.6), A = durumArda(t);
  const k = karisK(yuzeOdak(K, A, 2.7, 0.42), yuzeOdak(K, A, 3.2, 0.4), eio(seg(t, 73.2, 79)));
  koridorCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), blur: 3, odakD: K.derinlik(A.x, 1, A.z) });
});

// ---------- SAHNE 09 (79–89): K2'den yeni bildirim ----------
const TEL_KOR = bulanikArka('koridorIleri', 80);
cekim(79, 82.4, 9, (ctx, t) => {
  const dokun = seg(t, 80.85, 81.05) * (1 - seg(t, 81.2, 81.4));
  const ac = eo(seg(t, 81.35, 81.7));
  telefonCekimi(ctx, t, {
    arka: TEL_KOR, k2: { x: 540, y: 860, z: 1.0 + 0.07 * seg(t, 79, 82.4) }, titre: t < 80.1 ? 0.6 * (Math.sin((t - 79.15) * PI / 0.4) > 0 ? 1 : 0) : 0.25,
    basParmak: [0.5, 0.14], bas: dokun, dalga: t > 81.05 && t < 81.5 ? seg(t, 81.05, 81.5) : 0,
    ekran: (g, w, h) => {
      ekranOynatici(g, w, h, t, { saat: hikayeSaati(t), baslik: 'K1 · Koridor', alt: 'Kayıt · 23:14', ilerleme: 0.62, goruntu: kayitGoruntusu(26) });
      bildirimAfisi(g, w, seg(t, 79.25, 79.6) * (1 - seg(t, 81.3, 81.5)), 'HAREKET ALGILANDI — K2 SALON', 'Ev Kamerası · Canlı izle');
      if (ac > 0) { g.save(); g.translate(0, h * (1 - ac)); ekranOynatici(g, w, h, t, { saat: hikayeSaati(t), baslik: 'K2 · Salon', alt: '● CANLI', canli: true, goruntu: canliGoruntu('K2', t) }); g.restore(); }
    },
  });
});
cekim(82.4, 84.6, 9, (ctx, t) => {
  telefonCekimi(ctx, t, {
    arka: TEL_KOR, k2: { x: 540, y: 745, z: lerp(2.1, 2.3, seg(t, 82.4, 84.6)), oy: H * 0.46 }, titre: 0.3,
    ekran: (g, w, h) => ekranOynatici(g, w, h, t, { saat: hikayeSaati(t), baslik: 'K2 · Salon', alt: '● CANLI', canli: true, goruntu: canliGoruntu('K2', t) }),
  });
});
cekim(84.6, 89, 9, (ctx, t) => {
  const K = K_KOR_GERI(6.2), A = durumArda(t);
  const k = karisK(yuzeOdak(K, A, 3.0, 0.42), yuzeOdak(K, A, 4.3, 0.42), eio(seg(t, 84.6, 89)));
  koridorCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), blur: 5, odakD: K.derinlik(A.x, 1, A.z) });
});

// ---------- SAHNE 10 (89–99): K2 canlı, tam ekran ----------
cekim(89, 94.2, 10, (ctx, t) => {
  const KK = KAMERA_K2(); const ik = durumIkinci(t).find(d => d.mekan === 'salon');
  const yp = yuzKonum(KK, ik);
  const tt = (t > 93.55 && t < 93.85) ? 93.55 : (t >= 93.85 ? t + 0.35 : t);   // görüntü atlaması
  const z = lerp(1.0, 4.2, eio(seg(t, 89.4, 94.0)));
  kameraGoruntusu(ctx, W, H, tt, { kamera: 'K2', saat: hikayeSaati(tt), canli: true, karakterler: canliKarakterler(tt), yuva: 'tam',
    zoom: { x: lerp(W / 2, yp.x, seg(t, 89.4, 92.5)), y: lerp(H / 2, yp.y + 40, seg(t, 89.4, 92.5)), z }, parazit: (t > 93.5 && t < 93.9) ? 0.75 : 0 });
}, { tip: 'parazit', sure: 0.2 });
cekim(94.2, 99, 10, (ctx, t) => {
  const K = K_KOR_GERI(6.2), A = durumArda(t);
  const k = karisK(yuzeOdak(K, A, 4.4, 0.42), yuzeOdak(K, A, 5.0, 0.42), eio(seg(t, 94.2, 98.6)));
  koridorCek(ctx, K, t, { k2: k, karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), blur: 7, odakD: K.derinlik(A.x, 1, A.z) });
});

// ---------- SAHNE 11 (99–109): salon kapısında ----------
function salonKarakterleri(t) { const L = canliKarakterler(t); const a = ardaSalonKapisinda(t); if (a) L.push(a); return L; }
cekim(99, 102.9, 11, (ctx, t) => {
  const K = K_TERS(), A = ardaSalonKapisinda(Math.max(t, 98.95)) || durumArda(t);
  const z = lerp(2.3, 3.0, eio(seg(t, 99.3, 102.9)));
  const k = yuzeOdak(K, A, z, 0.4, 0.5);
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: salonKarakterleri(t), blur: 2.5, odakD: K.derinlik(A.x, 1, A.z) });
});
cekim(102.9, 105.9, 11, (ctx, t) => {
  const K = K_KAPI(), D = durumDefne(t);
  const k = karisK(yuzeOdak(K, D, 1.55, 0.44), yuzeOdak(K, D, 2.05, 0.42), eio(seg(t, 102.9, 105.9)));
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t) });
});
cekim(105.9, 107.4, 11, (ctx, t) => {
  telefonCekimi(ctx, t, {
    arka: bulanikArka('salonKapi', 106), k2: { x: 540, y: 745, z: lerp(2.15, 2.3, seg(t, 105.9, 107.4)), oy: H * 0.46 }, titre: 0.5,
    ekran: (g, w, h) => ekranOynatici(g, w, h, t, { saat: hikayeSaati(t), baslik: 'K2 · Salon', alt: '● CANLI', canli: true, goruntu: canliGoruntu('K2', t) }),
  });
});
cekim(107.4, 109, 11, (ctx, t) => {
  const K = K_TERS(), A = ardaSalonKapisinda(t);
  const k = karisK(yuzeOdak(K, A, 11, 0.42, 0.5, 0, 3), yuzeOdak(K, A, 12.8, 0.42, 0.5, 0, 3), eio(seg(t, 107.4, 109)));
  salonCek(ctx, K, t, { k2: k, karakterler: salonKarakterleri(t), blur: 10, odakD: K.derinlik(A.x, 1, A.z) });
});

// ---------- SAHNE 12 (109–119): Defne kalkar, abisine yürür ----------
cekim(109, 113.6, 12, (ctx, t) => {
  const K = K_KAPI(), D = durumDefne(t);
  const k = karisK(yuzeOdak(K, D, 1.45, 0.44), yuzeOdak(K, D, 2.0, 0.42), eio(seg(t, 109.3, 113.6)));
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t) });
});
cekim(113.6, 116.6, 12, (ctx, t) => {
  const K = K_TERS(), A = ardaSalonKapisinda(t);
  const k = karisK(yuzeOdak(K, A, 2.6, 0.4, 0.5), yuzeOdak(K, A, 3.05, 0.4, 0.5), eio(seg(t, 113.6, 116.6)));
  salonCek(ctx, K, t, { k2: suzul(k, t), karakterler: salonKarakterleri(t) });
});
cekim(116.6, 119, 12, (ctx, t) => {
  const KK = KAMERA_K2(); const ik = durumIkinci(t).find(d => d.mekan === 'salon');
  const yp = yuzKonum(KK, ik);
  const dz = lerp(1.0, 5.2, eio(seg(t, 117.0, 118.9)));
  telefonCekimi(ctx, t, {
    arka: bulanikArka('salonKapi', 117), k2: { x: 540, y: 745, z: lerp(2.15, 2.3, seg(t, 116.6, 119)), oy: H * 0.46 }, titre: 0.5,
    ekran: (g, w, h) => ekranOynatici(g, w, h, t, { saat: hikayeSaati(t), baslik: 'K2 · Salon', alt: '● CANLI', canli: true,
      goruntu: canliGoruntu('K2', t, { zoom: { x: lerp(W / 2, yp.x, seg(t, 117, 118.4)), y: lerp(H / 2, yp.y + 30, seg(t, 117, 118.4)), z: dz } }) }),
  });
});

// ---------- SAHNE 13 (119–129): "Abi... Buraya gelsene." ----------
cekim(119, 123.2, 13, (ctx, t) => {
  const K = K_KOR_GERI(5.4, -0.15), A = durumArda(t), D = durumDefne(t);
  const ya = yuzKonum(K, A), yd = yuzKonum(K, D);
  const iki = { x: (ya.x + yd.x) / 2, y: (ya.y + yd.y) / 2 + 30, z: 1.45, ox: W / 2, oy: H * 0.42 };
  const k = karisK(iki, yuzeOdak(K, D, 2.6, 0.42), eio(seg(t, 120.8, 123.2)));
  koridorCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), blur: 2 * seg(t, 120.8, 123.2), odakD: K.derinlik(D.x, 1, D.z) });
}, { tip: 'erit', sure: 0.3 });
cekim(123.2, 126.45, 13, (ctx, t) => {
  const kz = lerp(3.55, 4.75, ss(seg(t, 123.2, 126.45)));
  const K = K_KOR_ILERI(kz, -0.1, 1.5);
  const kp = K.p(0, 1.05, 7.4);
  koridorCek(ctx, K, t, { k2: { x: kp[0], y: kp[1] + 80, z: lerp(1.35, 1.5, seg(t, 123.2, 126.45)), ox: W / 2, oy: H * 0.45 }, karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t) });
});
cekim(126.45, 129, 13, (ctx, t) => {
  const K = K_KOR_GERI(5.4, -0.15), D = durumDefne(t);
  const k = karisK(yuzeOdak(K, D, 4.2, 0.42), yuzeOdak(K, D, 4.8, 0.42), eio(seg(t, 126.45, 129)));
  koridorCek(ctx, K, t, { k2: k, karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), blur: 7, odakD: K.derinlik(D.x, 1, D.z) });
});

// ---------- SAHNE 14 (129–139): kapıdaki ikinci Defne ----------
cekim(129, 132.7, 14, (ctx, t) => {
  const K = K_KOR_GERI(5.0, -0.15), A = durumArda(t), D = durumDefne(t);
  const ya = yuzKonum(K, A), yd = yuzKonum(K, D);
  const k = karisK({ x: (ya.x + yd.x) / 2, y: (ya.y + yd.y) / 2 + 20, z: 1.95, ox: W / 2, oy: H * 0.42 }, { x: (ya.x + yd.x) / 2 - 10, y: (ya.y + yd.y) / 2 + 15, z: 2.25, ox: W / 2, oy: H * 0.42 }, eio(seg(t, 129, 132.7)));
  koridorCek(ctx, K, t, { k2: suzul(k, t), karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), blur: 3, odakD: K.derinlik(A.x, 1, A.z) });
});
cekim(132.7, 137.3, 14, (ctx, t) => {
  const K = K_KOR_ILERI(3.35, -0.12, 1.5); const ik = durumIkinci(t).find(d => d.mekan === 'koridor');
  const k = karisK(yuzeOdak(K, ik, 3.0, 0.42), yuzeOdak(K, ik, 4.2, 0.42), eio(seg(t, 132.7, 135.9)));
  const k2 = karisK(k, yuzeOdak(K, ik, 12.5, 0.42, 0.5, 0, 3), eio(seg(t, 135.9, 137.0)));
  koridorCek(ctx, K, t, { k2: k2, karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t) });
});
cekim(137.3, 139, 14, (ctx, t) => {
  const K = K_KOR_GERI(5.0, -0.15), A = durumArda(t);
  const k = karisK(yuzeOdak(K, A, 4.6, 0.42), yuzeOdak(K, A, 5.1, 0.42), seg(t, 137.3, 139));
  koridorCek(ctx, K, t, { k2: k, karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), blur: 7, odakD: K.derinlik(A.x, 1, A.z) });
});

// ---------- SAHNE 15 (139–150): "Ben de öyle." ----------
cekim(139, 140.7, 15, (ctx, t) => {
  const K = K_KOR_GERI(5.0, -0.15), A = durumArda(t);
  const k = karisK(yuzeOdak(K, A, 1.9, 0.36, 0.5, 0, 22), yuzeOdak(K, A, 2.05, 0.36, 0.5, 0, 22), seg(t, 139, 140.7));
  koridorCek(ctx, K, t, { k2: k, karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), blur: 2, odakD: K.derinlik(A.x, 1, A.z) });
});
cekim(140.7, 144.0, 15, (ctx, t) => {
  telefonCekimi(ctx, t, {
    arka: bulanikArka('koridor', 141), k2: { x: 540, y: 745, z: lerp(2.1, 2.3, seg(t, 140.7, 144)), oy: H * 0.46 }, titre: 1,
    ekran: (g, w, h) => ekranOynatici(g, w, h, t, { saat: hikayeSaati(t), baslik: 'K1 · Koridor', alt: '● CANLI', canli: true, goruntu: canliGoruntu('K1', t) }),
  });
});
cekim(144.0, 145.7, 15, (ctx, t) => {
  const K = K_KOR_GERI(5.0, -0.15), A = durumArda(t);
  const k = karisK(yuzeOdak(K, A, 11.5, 0.42, 0.5, 0, 3), yuzeOdak(K, A, 13.2, 0.42, 0.5, 0, 3), seg(t, 144, 145.7));
  koridorCek(ctx, K, t, { k2: k, karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t), blur: 12, odakD: K.derinlik(A.x, 1, A.z) });
});
cekim(145.7, 148.0, 15, (ctx, t) => {
  const K = K_KOR_ILERI(4.6, -0.05, 1.5); const ik = durumIkinci(t).find(d => d.mekan === 'koridor');
  const k = karisK(yuzeOdak(K, ik, 4.4, 0.42), yuzeOdak(K, ik, 5.6, 0.42), eio(seg(t, 145.7, 148)));
  koridorCek(ctx, K, t, { k2: k, karakterler: canliKarakterler(t), kapiAci: kapiAcisi(t) });
  if (t > 147.8) parazitCiz(ctx, W, H, t, 1);
});
cekim(148.0, 148.7, 15, (ctx, t) => {
  cocukCizimi(ctx, t);
  const k = 1 - seg(t, 148.0, 148.12);
  if (k > 0) parazitCiz(ctx, W, H, t, k);
  if (t > 148.6) parazitCiz(ctx, W, H, t, seg(t, 148.6, 148.7));
});
cekim(148.7, 150.01, 15, (ctx, t) => { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); });
