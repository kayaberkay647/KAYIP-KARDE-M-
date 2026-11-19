/* KAMERADAKİ İKİNCİ KARDEŞ — çekim katmanı
   Karakterlerin dünya durumu (sahneler.js → DURUM) + mekân + kamera → kare. */
'use strict';

// ---- dudak senkronu (1_diyalog_uret.py çıktısı) ----
function agizDurum(kim, t) {
  const D = window.DIYALOG || [];
  for (const r of D) {
    if (r.kim !== kim) continue;
    const i = Math.floor((t - r.t) * FPS);
    if (i >= 0 && i < r.acik.length) {
      const f = (t - r.t) * FPS - i;
      const a = lerp(r.acik[i], r.acik[Math.min(i + 1, r.acik.length - 1)], f) / 99;
      return { acik: a, sekil: r.agiz[i] };
    }
  }
  return { acik: 0, sekil: 'X' };
}
function konusuyorMu(kim, t) { const a = agizDurum(kim, t); return a.acik > 0.02; }

// ---- göz kırpma ----
const KIRPMA = {};
function kirpmaZamanlari(ad) {
  if (KIRPMA[ad]) return KIRPMA[ad];
  const r = rng(ad.length * 101 + ad.charCodeAt(0) * 7), out = [];
  let t = 0.6 + r() * 1.5;
  const [a, b] = ad === 'IKINCI' ? [11, 16] : [2.4, 5.2];
  while (t < SURE + 5) { out.push(t); if (r() < 0.12 && ad !== 'IKINCI') out.push(t + 0.32); t += a + r() * (b - a); }
  return (KIRPMA[ad] = out);
}
function kirpma(ad, t, ekstra = []) {
  const yavas = ad === 'IKINCI' ? 2.2 : 1;
  let v = 0;
  for (const b of kirpmaZamanlari(ad).concat(ekstra)) {
    const d = (t - b) / yavas; if (d < -0.01 || d > 0.25) continue;
    v = Math.max(v, d < 0.07 ? d / 0.07 : d < 0.11 ? 1 : 1 - (d - 0.11) / 0.12);
  }
  return clamp(v);
}

// ---- dünya yönü → rig açıları ----
function rigAcilari(K, yon, basYon) {
  const gy = norm(Math.PI - (yon - K.yaw));
  const ky = norm(Math.PI - (yon + (basYon || 0) - K.yaw));
  return [gy, ky];
}
function yonuHedefe(x, z, hx, hz) { return Math.atan2(hx - x, hz - z); }

// Karakterin çizim durumunu oluşturur
function rigDurum(K, D, t, z2) {
  const T = TASARIM[D.tasarim || D.ad];
  const p = K.yerles(D.x, D.y || 0, D.z);
  const [gy, ky] = rigAcilari(K, D.yon, D.bas);
  const nefP = D.nefesHiz || 3.6, nefA = D.nefesGenlik ?? 1;
  const nef = nefA * Math.sin(t * TAU / nefP + (D.ad === 'ARDA' ? 0 : 1.7));
  const sd = D.ad === 'ARDA' ? 1 : D.ad === 'DEFNE' ? 2 : 3;
  const mikro = D.ad === 'IKINCI' ? 0.25 : 1;
  const ifade = typeof D.ifade === 'string' ? IFADE[D.ifade] : D.ifade;
  return {
    T, d: {
      x: p.x, y: p.y, s: p.s / 100, zoom: z2 || 1, t,
      govdeYaw: gy, yaw: ky,
      egim: (D.egim || 0) + 0.025 * mikro * gur2(t * 0.35, sd),
      nod: (D.nod || 0) + 0.05 * mikro * gur2(t * 0.3, sd + 5),
      otur: D.otur || 0, yuru: D.yuru || 0, faz: D.faz || 0, adimX: D.adimX || 0,
      nefes: nef, eller: D.eller, telefon: D.telefon, telPoz: D.telPoz, telIsik: D.telIsik || 0, titresim: D.titresim || 0,
      ifade, bakX: (D.bakX || 0) + 0.04 * mikro * gur(t * 0.8, sd + 2), bakY: D.bakY || 0,
      kirp: Math.max(kirpma(D.ad, t, D.kirpEk || []), D.kirpZorla || 0),
      agiz: D.agizKapali ? { acik: 0, sekil: 'X' } : agizDurum(D.ad, t),
      isik: D.isik || { dx: 0.9, dy: 0.45 }, ikinci: D.ad === 'IKINCI',
      sacSal: (D.sacSal || 0) + 0.25 * gur(t * 0.7, sd + 8) * (D.yuru ? 1.5 : 0.5),
      golgeAlfa: D.golgeAlfa ?? 0.2, kafaX: D.kafaX || 0, kafaY: D.kafaY || 0, govdeEgim: D.govdeEgim || 0,
    }, derinlik: p.d
  };
}

// Yüzün temel ekran koordinatı (kamera hedeflemek için)
function yuzKonum(K, D) {
  const T = TASARIM[D.tasarim || D.ad];
  const p = K.yerles(D.x, D.y || 0, D.z);
  const ot = D.otur || 0;
  const dy = -(T.boy - 1.2 * T.R) + ot * (T.kalcaY - T.oturmaY) + ot * 1.5;
  return { x: p.x, y: p.y + dy * p.s / 100, s: p.s / 100 };
}

// Siluet (karanlık gölge) çizimi için geçici tuval
const _silT = {};
function karakterCizEk(ctx, T, d, D) {
  const sil = D.siluet || 0, alfa = D.alfa ?? 1;
  if (alfa <= 0) return;
  ctx.save();
  if (D.kirp) D.kirp(ctx);
  if (sil <= 0.01 && alfa >= 1) { karakterCiz(ctx, T, d); ctx.restore(); return; }
  const cw = ctx.canvas.width, ch = ctx.canvas.height, an = cw + 'x' + ch;
  if (!_silT[an]) _silT[an] = tuval(cw, ch);
  const _sil = _silT[an];
  const g = _sil.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, cw, ch);
  g.setTransform(ctx.getTransform());
  karakterCiz(g, T, d);
  if (sil > 0) { g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-atop'; g.fillStyle = `rgba(8,10,16,${sil})`; g.fillRect(0, 0, cw, ch); g.globalCompositeOperation = 'source-over'; }
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = alfa; ctx.drawImage(_sil, 0, 0); ctx.restore();
}

/* ---- mekân çekimleri ----
   o: { k2: {x,y,z,r} 2B kamera, karakterler: [D...], blur: arka plan bulanıklığı (px), ... } */
let _arka = null;
function arkaTuval(w, h) { if (!_arka || _arka.width !== w || _arka.height !== h) _arka = tuval(w, h); return _arka; }

function katmanli(ctx, o, cizArka, ogeler, cizOn) {
  // o.blur > 0 ise: odak derinliğinden uzak öğeler + kabuk bulanık katmana
  const k2 = o.k2 || { x: W / 2, y: H / 2, z: 1 };
  const bl = o.blur || 0;
  ogeler.sort((a, b) => b.d - a.d);
  if (bl > 0.3) {
    const cw = ctx.canvas.width, ch = ctx.canvas.height;
    const A = arkaTuval(cw, ch), g = A.getContext('2d');
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, cw, ch);
    g.setTransform(ctx.getTransform()); g.save(); kamera2B(g, k2);
    cizArka(g);
    const esik = (o.odakD ?? 0) + 0.25;
    for (const it of ogeler) if (it.d > esik && it.d > 0.05) it.f(g);
    g.restore();
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = `blur(${bl}px)`; ctx.drawImage(A, 0, 0); ctx.filter = 'none'; ctx.restore();
    ctx.save(); kamera2B(ctx, k2);
    for (const it of ogeler) if (!(it.d > esik) && it.d > 0.05) it.f(ctx);
  } else {
    ctx.save(); kamera2B(ctx, k2);
    cizArka(ctx);
    for (const it of ogeler) if (it.d > 0.05) it.f(ctx);
  }
  if (cizOn) cizOn(ctx);
  const M = ctx.getTransform();
  ctx.restore();
  return [M.a, 0, 0, M.d, M.e, M.f];
}

function salonCek(ctx, K, t, o) {
  const k2 = o.k2 || { x: W / 2, y: H / 2, z: 1 };
  const lw = lwOlc(k2.z * (o.olcek || 1));
  const kar = (o.karakterler || []).filter(D => D && D.mekan === 'salon' && (D.alfa ?? 1) > 0 && (!D.sadeceKamera || o.kameraMi));
  const ters = Math.abs(norm(K.yaw)) > 2;
  const ogeler = [];
  if (!ters) {
    ogeler.push({ d: K.derinlik(LAMBA[0], 0.8, LAMBA[1]), f: g => lambaCiz(g, K, t, lw) });
    ogeler.push({ d: K.derinlik(0, 0.6, KOLTUK.zArka - 0.05), f: g => koltukArka(g, K, lw) });
    ogeler.push({ d: K.derinlik(0, 0.4, 3.62), f: g => koltukOn(g, K, lw) });
  }
  ogeler.push({ d: K.derinlik(0, 0.4, 2.46), f: g => sehpaCiz(g, K, t, lw) });
  for (const D of kar) {
    const R = rigDurum(K, D, t, k2.z * (o.olcek || 1));
    ogeler.push({ d: R.derinlik + (D.derinlikEk || 0), f: g => karakterCizEk(g, R.T, R.d, D) });
  }
  const tr = katmanli(ctx, o, g => salonKabuk(g, K, t, lw, { tvDuvari: ters, kapiArkasi: o.kapiArkasi }), ogeler,
    g => { if (!ters) lambaIsigi(g, K, t); if (o.ekCiz) o.ekCiz(g, lw); });
  salonIsik(ctx, K, t, { tr, tv: !ters });
}

function koridorCek(ctx, K, t, o) {
  const k2 = o.k2 || { x: W / 2, y: H / 2, z: 1 };
  const lw = lwOlc(k2.z * (o.olcek || 1));
  const kar = (o.karakterler || []).filter(D => D && D.mekan === 'koridor' && (D.alfa ?? 1) > 0 && (!D.sadeceKamera || o.kameraMi));
  const ogeler = [];
  for (const D0 of kar) {
    let D = D0;
    if (D0.z > KOR.z1 - 0.02) {
      const bos = K.cok([[-0.42, 0, KOR.z1], [-0.42, 2.05, KOR.z1], [0.42, 2.05, KOR.z1], [0.42, 0, KOR.z1]]);
      if (!bos) continue;
      D = { ...D0, kirp: g => { cokgen(g, bos); g.clip(); } };
    }
    const R = rigDurum(K, D, t, k2.z * (o.olcek || 1));
    ogeler.push({ d: R.derinlik + (D.derinlikEk || 0), f: g => karakterCizEk(g, R.T, R.d, D) });
  }
  const tr = katmanli(ctx, o, g => koridorKabuk(g, K, t, lw, { kapiAci: o.kapiAci || 0, mutfakIci: o.mutfakIci, salonIci: o.salonIci }), ogeler, o.ekCiz ? g => o.ekCiz(g, lw) : null);
  koridorIsik(ctx, K, t, { tr, titreme: o.lambaTitreme || 0, K });
}

// Güvenlik kamerası görüntüsü: hedef alana (w x h, yerel birim) çizer; iç çözünürlük ekrandaki gerçek boyuta göre.
// o: { kamera:'K1'|'K2', saat, canli, parazit, zoom:{x,y,z}, karakterler, kapiAci, yuva }
const _kamTuval = {};
function kameraGoruntusu(ctx, w, h, t, o) {
  if (o.simdi) t = window.SIMDI || t;
  const M = ctx.getTransform(), sc = Math.min(1.6, Math.hypot(M.a, M.b) || 1);
  let cw = Math.max(64, Math.round(w * sc)), ch = Math.max(64, Math.round(h * sc));
  if (ch > 2200) { const k = 2200 / ch; cw = Math.round(cw * k); ch = 2200; }
  const yuva = o.yuva || 'a';
  if (!_kamTuval[yuva]) _kamTuval[yuva] = tuval(cw, ch);
  const c = _kamTuval[yuva];
  if (c.width !== cw || c.height !== ch) { c.width = cw; c.height = ch; }
  const g = c.getContext('2d');
  g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, cw, ch);
  const s = Math.max(cw / W, ch / H);
  g.save();
  g.translate(cw / 2, ch / 2); g.scale(s, s); g.translate(-W / 2, -H / 2);
  const K = o.kamera === 'K1' ? KAMERA_K1() : KAMERA_K2();
  const z = o.zoom || { x: W / 2, y: H / 2, z: 1 };
  if (o.kamera === 'K1') koridorCek(g, K, t, { k2: z, karakterler: o.karakterler, kapiAci: o.kapiAci, olcek: s * 1.3, mutfakIci: o.mutfakIci, kameraMi: true });
  else salonCek(g, K, t, { k2: z, karakterler: o.karakterler, olcek: s * 1.3, kameraMi: true });
  g.restore();
  kameraEfekti(g, cw, ch, t, { ad: o.kamera === 'K1' ? 'K1 - KORİDOR' : 'K2 - SALON', saat: o.saat, canli: o.canli, parazit: o.parazit || 0, gren: o.gren, kayit: o.kayitYazisi, hareket: o.hareket });
  ctx.drawImage(c, 0, 0, w, h);
}
