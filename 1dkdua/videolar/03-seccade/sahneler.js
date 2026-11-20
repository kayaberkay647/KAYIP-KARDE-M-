// 03 — Seccade · sahneler. Zamanlar SENARYO.md ve veri/zaman_cizelgesi.json ile eşleşir.
'use strict';
const SURE = 53.0;
const kam3 = (keys, t, fn = ease) => { const [x, y, z] = kf(keys, t, fn); return { x, y, z }; };
const tepe1 = (t, c, w = .28) => Math.exp(-Math.pow((t - c) / w, 2));

// ───────── S1 · Aşınan yerler (0–6.45) ─────────
const S01 = {
  ad: 'Aşınma', bas: 0, son: 6.45, ciz(t) {
    const kam = kam3([[-.5, 0, 80, 1.0], [1.8, 0, -30, 1.2], [2.9, 0, -5, 1.3], [4.2, 0, 140, 1.28], [7.0, 0, 110, 1.1]], t, easeS), son = 1 - .45 * sm(5.5, 6.4, t);
    const ik = { alin: sm(1.2, 1.9, t) * son, el: sm(2.95, 3.6, t) * son, diz: sm(3.48, 4.2, t) * son };
    katman(kam, 1, () => { zeminUst(t, 0, 1); seccade(0, 120, 520, 828, { yeni: 0, asinma: 1, isik: ik, t }); });
    X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = dGrad(0, 0, 0, 760, [[0, '#F7EBD0', .62], [.6, '#F7EBD0', .28], [1, '#F7EBD0', 0]]); X.fillRect(0, 0, W, 760); X.restore();
  }
};
// ───────── S2 · Tertemiz seccade, kimse kılmıyor (6.45–11.2) ─────────
const S02 = {
  ad: 'Tertemiz', bas: 6.45, son: 11.2, ciz(t) {
    const kam = kam3([[6.0, 330, 270, 1.2], [11.7, 310, 300, 1.3]], t, easeS);
    katman(kam, 1, () => {
      odaCiz(t, .04);
      seccadeOblik(520, 660, 470, 748, .34, { yeni: 1, t });
      const gidiyor = t > 9.75, x = gidiyor ? 160 - (t - 9.75) * 170 : 160, yon = gidiyor ? -1 : 1;
      const kO = kf([[6.0, .05, .22], [8.1, .05, .22], [8.45, 1.0, .95], [9.4, 1.0, .95], [9.75, .05, .22]], t);
      insanAyakta({ x, y: 600, s: 66, yon, t, faz: yurFaz(160 - x, 66), yur: gidiyor ? 1 : 0, kolO: kO, kolA: [-.05, .2], egim: tepe1(t, 8.7, .5) * .05 - .01, tohum: 4 });
    });
  }
};
// ───────── S3 · Misafir, namaz vakti (11.2–15.2) ─────────
const S03 = {
  ad: 'Misafir', bas: 11.2, son: 15.2, ciz(t) {
    const kam = kam3([[10.7, 640, 230, 1.25], [15.7, 660, 250, 1.38]], t, easeS), g = kf([[11.0, .1], [12.8, .16], [14.6, .56], [16, .6]], t, easeS)[0];
    katman(kam, 1, () => {
      odaCiz(t, g, { kuslar: 1 });
      const kO = kf([[11, .05, .22], [13.5, .05, .22], [14.3, .9, .9], [15.2, .85, .95]], t);
      insanAyakta({ x: 840, y: 590, s: 66, yon: -1, t, kolO: kO, kolA: [-.08, .2], egim: -.03 + Math.sin(t * .8) * .01, tohum: 4 });
    });
  }
};
// ───────── S4 · Dolaptan bohça, seccade (15.2–19.4) ─────────
const S04 = {
  ad: 'Bohça', bas: 15.2, son: 19.4, ciz(t) {
    const kam = kam3([[14.7, 600, 260, 1.2], [16.3, 150, 270, 1.28], [17.5, 130, 270, 1.34], [19.5, 540, 270, 1.28]], t, easeS), g = .6, kapak = easeS((t - 16.3) / .6);
    katman(kam, 1, () => {
      odaCiz(t, g, { dolap: kapak });
      // Adam bekliyor
      insanAyakta({ x: 840, y: 590, s: 66, yon: -1, t, kolO: [.42, 1.15], kolA: [.5, 1.1], egim: .02 + Math.sin(t * .9) * .01, tohum: 4 });
      // Ev sahibi: odadan dolaba yürür, bohçayı alır, getirir
      let x, yon, yur = 1;
      if (t < 16.25) { x = lerp(620, 150, easeS((t - 15.25) / 1.0)); yon = -1; if (t < 15.25) { x = 620; yur = 0; } }
      else if (t < 17.55) { x = 150; yon = -1; yur = 0; }
      else { x = lerp(150, 560, easeS((t - 17.55) / 1.85)); yon = 1; }
      if (t >= 16.25 && t < 17.55) yur = 0;
      const ph = t < 16.25 ? yurFaz(620 - x, 66) : yurFaz(x - 150, 66);
      const uzan = t < 16.5 ? 0 : t < 17.15 ? easeS((t - 16.5) / .35) : 1 - easeS((t - 17.15) / .35);
      const kO = t < 17.5 ? [lerp(.05, 1.5, uzan), lerp(.22, .15, uzan)] : [.95, .9], kA = t < 17.5 ? [-.05 + uzan * .2, .2] : [.75, 1.0];
      const tut = t > 17.1;
      insanAyakta({
        x, y: 590, s: 66, yon, t, pal: KADIN, faz: ph, yur, kolO: kO, kolA: kA, egim: .02, tohum: 8,
        elde: k => { if (!tut) return; const ac = sm(17.85, 18.5, t); if (ac < .05) bohca(k.el[0] + .15, k.el[1] - .05, .85, 0); else { bohca(k.el[0] + .1, k.el[1] + .1, .62, ac); katliSeccade(k.el[0] + .05, k.el[1] - .15, 2.5, 1.1, -.04); } }
      });
    });
  }
};
// ───────── S5 · "Sevdiklerinden öyle yapıyor" (19.4–23.6) ─────────
const S05 = {
  ad: 'Sevgi', bas: 19.4, son: 23.6, ciz(t) {
    const kam = kam3([[18.9, 640, 250, 1.32], [23.9, 660, 260, 1.45]], t, easeS), g = .62;
    katman(kam, 1, () => {
      odaCiz(t, g);
      const verir = 1 - sm(20.1, 20.6, t), aldi = t > 20.35;
      // Ev sahibi
      insanAyakta({ x: 540, y: 590, s: 66, yon: 1, t, pal: KADIN, kolO: [lerp(.1, 1.5, verir), lerp(.3, .15, verir)], kolA: [lerp(.1, .6, verir), .5], egim: .02 + tepe1(t, 22.9, .5) * .05, tohum: 8, elde: k => { if (!aldi) katliSeccade(k.el[0] + .6, k.el[1] - .05, 2.5, 1.1, -.04); } });
      // Adam seccadeyi alır, elini göğsüne koyar
      const kO = kf([[19.4, .45, 1.1], [19.9, 1.45, .3], [20.3, 1.45, .3], [20.9, .1, 2.15], [23.7, .1, 2.15]], t);
      insanAyakta({ x: 790, y: 590, s: 66, yon: -1, t, kolO: kO, kolA: [.2, 1.5], egim: .04 + sm(20.9, 21.6, t) * .03, tohum: 4, oncesi: () => { if (aldi) katliSeccade(.6, -3.7, 2.4, 1.05, -.05); } });
      // sıcak ışıltılar
      const r = rng(55); X.save(); X.globalCompositeOperation = 'screen';
      for (let i = 0; i < 40; i++) { const b = 19.6 + r() * 3.4, a = t - b; if (a < 0 || a > 2.4) continue; const px = 560 + r() * 260 + Math.sin(a * 2 + i) * 18, py = 380 - a * (30 + r() * 40); const al = Math.sin(a / 2.4 * Math.PI) * .8; parilti(px, py, 18, '#FFD89A', al * .6); daire(px, py, 2); X.fillStyle = rgb('#FFF3D6', al); X.fill(); }
      X.restore();
    });
  }
};
// ───────── Seccade üstünde secde sahneleri ─────────
const RUG = { cx: 520, cy: 700, L: 640, k: .4 }, SECDE_S = 88;
function secdeAdam(t, o = {}) {
  const x0 = RUG.cx + 168 * RUG.L / 700 - 1.55 * SECDE_S + 6;
  X.save(); X.translate((o.titre || 0) * Math.sin(t * 41) * 1.4, 0);
  insanSecde({ x: x0, y: RUG.cy + 6, s: SECDE_S, t, pal: o.pal || ADAM, kaldir: o.kaldir || 0, nefes: o.nefes || 0, tohum: o.tohum || 0 });
  X.restore();
}
// ───────── S6 · Naftalin ve deterjan kokusu (23.6–29.3) ─────────
const S06 = {
  ad: 'Koku', bas: 23.6, son: 29.3, ciz(t) {
    const kam = kam3([[23.2, 520, 600, 1.5], [26.0, 520, 620, 1.6], [29.8, 520, 640, 1.72]], t, easeS), g = .74;
    const kal = sm(28.0, 28.45, t) * (1 - sm(28.9, 29.3, t)), nf = sm(25.4, 25.9, t), tit = nf * (1 - sm(28.9, 29.3, t));
    const naf = sm(24.7, 25.4, t), det = sm(26.7, 27.3, t);
    katman(kam, 1, () => {
      odaCiz(t, g);
      seccadeYan(RUG.cx, RUG.cy, RUG.L, RUG.k, { yeni: .2, asinma: .8, t });
      X.save(); X.globalAlpha = naf; naftalin(RUG.cx - 190, RUG.cy + 18, 40, t, 2); naftalin(RUG.cx + 230, RUG.cy + 26, 36, t, 5); naftalin(RUG.cx + 20, RUG.cy + 34, 80, t, 7); X.restore();
      secdeAdam(t, { kaldir: kal, nefes: nf, titre: tit * .8 });
      // kokular: soluk yeşil sis ve sabun köpükleri
      duman(RUG.cx + 20, RUG.cy - 10, 420, 480, t, '#C8DA9C', .5 * naf, 3);
      duman(RUG.cx + 130, RUG.cy - 30, 300, 420, t, '#DDE9D6', .42 * det, 9);
      kopukler(RUG.cx - 260, RUG.cy + 30, 620, 420, t, 22, 31, det);
    });
  }
};
// ───────── S7 · "Alın yapışmış" (29.3–32.8) ─────────
const GECE_RUG = { yeni: 0, asinma: 1, zemin: '#4F5A2A', kenar: '#6A3125', parlaklik: 2.1 };
const S07 = {
  ad: 'Alın', bas: 29.3, son: 32.8, ciz(t) {
    const kam = kam3([[28.8, 520, 640, 1.55], [33.4, 560, 670, 1.85]], t, easeS), ik = { alin: sm(31.28, 32.0, t) * .95, el: sm(31.6, 32.3, t) * .55, diz: 0 };
    katman(kam, 1, () => {
      odaCiz(t, 1);
      seccadeYan(RUG.cx, RUG.cy, RUG.L, RUG.k, { ...GECE_RUG, isik: ik, t });
      secdeAdam(t, { nefes: 0 });
      titresim(RUG.cx + 168 * RUG.L / 700, RUG.cy, t, 30.92, 1.6, 150, .35, RUG.k * 1.2);
      X.save(); X.globalCompositeOperation = 'screen'; parilti(RUG.cx + 168 * RUG.L / 700, RUG.cy, 260, '#FFD98A', .5 * ik.alin); X.restore();
    });
  }
};
// ───────── S8 · "Burada namaz kılınmış, burada Allah denilmiş" (32.8–35.55) ─────────
const S08 = {
  ad: 'Katmanlar', bas: 32.8, son: 35.55, ciz(t) {
    const kam = kam3([[32.3, 560, 670, 1.8], [36.1, 560, 660, 1.62]], t, easeS);
    const alinX = RUG.cx + 168 * RUG.L / 700, ik = { alin: .8 + .15 * Math.sin(t * 2), el: .5, diz: .0 };
    katman(kam, 1, () => {
      odaCiz(t, 1);
      seccadeYan(RUG.cx, RUG.cy, RUG.L, RUG.k, { ...GECE_RUG, isik: ik, t });
      for (const [pal, t0, dx] of [[FAKIR, 33.55, -46], [YASLI_HOCA, 34.0, 40], [TALEBE1, 34.45, -20]]) { const a = sm(t0, t0 + .5, t) * .46; if (a > 0) { X.save(); X.globalAlpha = a; X.translate(dx, 0); secdeAdam(t, { pal, tohum: dx }); X.restore(); } }
      secdeAdam(t, {});
      // "Allah" denilince altın sözcük ışıkları
      if (t > 34.4) { const r = rng(66); X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 44; i++) { const b = 34.4 + r() * 1.1, a = t - b; if (a < 0 || a > 1.8) continue; const px = alinX + (r() - .5) * 60 + Math.sin(a * 3 + i) * 10, py = RUG.cy - 10 - a * (120 + r() * 120); const al = Math.sin(a / 1.8 * Math.PI); parilti(px, py, 16, '#FFE3A0', .75 * al); daire(px, py, 2.1); X.fillStyle = rgb('#FFF6DA', al); X.fill(); } X.restore(); }
    });
  }
};
// ───────── S9 · Titreşimler seccadeye geçer (35.55–39.85) ─────────
const S09 = {
  ad: 'Titreşim', bas: 35.55, son: 39.85, ciz(t) {
    const kam = kam3([[35.0, 0, 70, 1.0], [39.9, 0, 40, 1.55]], t, easeS), fx = 0, fy = 120 - 168 * 1.183, par = sm(38.5, 39.4, t);
    katman(kam, 1, () => {
      zeminUst(t, .55, 0);
      X.save(); X.globalCompositeOperation = 'screen'; parilti(0, 120, 900, '#FFB860', .26 + par * .2); X.restore();
      seccade(0, 120, 520, 828, { yeni: 0, asinma: 1, isik: { alin: .85, el: .65, diz: .45 }, t });
      for (const t0 of [36.0, 36.99, 37.55, 38.5]) titresim(fx, fy, t, t0, 2.4, 420, .8 + par * .2, 1);
      if (par > 0) { X.save(); X.globalCompositeOperation = 'screen'; X.beginPath(); X.rect(-260, -294, 520, 828); X.clip(); X.fillStyle = rGrad(0, 120, 20, 560, [[0, '#FFE3A0', .38 * par], [.6, '#FFD27A', .2 * par], [1, '#FFD27A', 0]]); X.fillRect(-300, -330, 600, 900); X.restore(); }
      const r = rng(77); X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 70; i++) { const b = 36 + r() * 3.2, a = t - b; if (a < 0 || a > 2.2) continue; const ang = r() * TAU, d = 40 + a * (110 + r() * 110); const px = fx + Math.cos(ang) * d, py = fy + Math.sin(ang) * d * 1.1; if (Math.abs(px) > 260 || py < -294 || py > 534) continue; const al = Math.sin(a / 2.2 * Math.PI); parilti(px, py, 12, '#FFE3A0', .7 * al); daire(px, py, 1.8); X.fillStyle = rgb('#FFF6DA', al); X.fill(); } X.restore();
    });
  }
};
// ───────── S10 · "Beni kimsecikler okşamaz… öp seccadem" (39.85–44.75) ─────────
const S10 = {
  ad: 'Okşama', bas: 39.85, son: 44.75, ciz(t) {
    const kam = kam3([[39.3, 560, 630, 1.34], [42.6, 540, 650, 1.55], [45.3, 540, 660, 1.62]], t, easeS);
    const secde = t >= 42.6, giris = clamp((t - 41.5) / 1.0), yaklasim = RUG.cx - 330 + easeS(giris) * 40;
    const ik = { alin: secde ? (sm(42.6, 43.4, t) * .9 + tepe1(t, 44.1, .3) * .1) : 0, el: secde ? sm(42.8, 43.6, t) * .5 : 0, diz: 0 };
    katman(kam, 1, () => {
      odaCiz(t, 1);
      seccadeYan(RUG.cx, RUG.cy, RUG.L, RUG.k, { ...GECE_RUG, isik: ik, t });
      if (!secde && t > 41.5) { const xs = lerp(RUG.cx - 520, RUG.cx - 270, easeS(giris)); insanAyakta({ x: xs, y: RUG.cy + 4, s: 74, yon: 1, t, faz: yurFaz(xs - (RUG.cx - 520), 74), yur: giris < 1 ? 1 : 0, kolO: [.05, .22], kolA: [-.05, .2], egim: .05, tohum: 4 }); }
      if (secde) { const a = sm(42.6, 42.85, t); X.save(); X.globalAlpha = a; secdeAdam(t, {}); X.restore(); if (a < 1) { X.save(); X.globalAlpha = 1 - a; insanAyakta({ x: RUG.cx - 270, y: RUG.cy + 4, s: 74, yon: 1, t, kolO: [.05, .22], kolA: [-.05, .2], egim: .12, tohum: 4 }); X.restore(); } }
      titresim(RUG.cx + 168 * RUG.L / 700, RUG.cy, t, 43.9, 1.6, 150, .5, RUG.k * 1.2);
      tozZerre(26, 31, t, RUG.cx - 380, RUG.cy - 360, 760, 360, '#CFE0FF', .5);
    });
  }
};
// ───────── S11 · "Seccade böyle olmalı." (44.75–46.2) ─────────
const S11 = {
  ad: 'Böyle', bas: 44.75, son: 46.2, ciz(t) {
    const kam = kam3([[44.4, 540, 650, 1.6], [46.8, 480, 400, 1.08]], t, easeS), ik = { alin: .6, el: .5, diz: .45 };
    katman(kam, 1, () => {
      odaCiz(t, 1);
      seccadeYan(RUG.cx, RUG.cy, RUG.L, RUG.k, { ...GECE_RUG, isik: ik, t });
      insanOturan({ x: RUG.cx - 60, y: RUG.cy + 20, s: 62, yon: 1, t, kolO: [.3, -1.0], kolA: [.35, -.9], egim: .12, tohum: 4 });
      X.save(); X.globalCompositeOperation = 'screen'; parilti(RUG.cx + 100, RUG.cy, 520, '#FFD98A', .22); X.restore();
    });
  }
};
// ───────── S12 · Kapanış: gece, terastaki seccade (46.2–53) ─────────
const S12 = {
  ad: 'Kapanış', bas: 46.2, son: SURE, ciz(t) {
    const kam = kam3([[45.7, 0, 330, 1.12], [SURE + .5, 0, 250, 1.0]], t, easeS);
    gokyuzu([[0, '#0B1630'], [.35, '#15294A'], [.52, '#24426A'], [.6, '#35567E'], [1, '#1C2E48']]);
    katman(kam, .02, () => yildizlar(240, 23, t, -700, -1250, 1400, 1150));
    katman(kam, .05, () => ay(260, 40, 70, 1));
    katman(kam, .18, () => tepe(-1700, 1700, 130, 90, 380, 301, '#1C2C46'));
    katman(kam, .35, () => {
      tepe(-1700, 1700, 270, 36, 300, 303, '#13213A');
      const r = rng(311); for (let i = 0; i < 44; i++) { const x = -1000 + i * 48 + r() * 20, w = 30 + r() * 22, h = 30 + r() * 70, y = tepeY(x, 270, 36, 300, 303) + 8; X.fillStyle = rgb('#0F1B30'); X.fillRect(x, y - h, w, h + 40); if (r() < .6) { X.fillStyle = rgba2('#FFD27A', .55 + r() * .4); X.fillRect(x + 6, y - h + 10 + r() * 20, 7, 9); if (r() < .4) X.fillRect(x + w - 14, y - h + 24, 7, 9); } }
      camiSilueti(-170, 300, .95, '#0F1B30', 1, t); camiSilueti(560, 310, .5, '#101C30', .8, t);
    });
    katman(kam, 1, () => {
      // teras: duvar, taş zemin, seccade
      X.fillStyle = dGrad(0, 480, 0, 1500, [[0, '#2A3448'], [1, '#161E2E']]); X.fillRect(-1500, 540, 3000, 1100);
      X.strokeStyle = 'rgba(100,120,150,.18)'; X.lineWidth = 2; for (let y = 560; y < 1500; y += 40 + (y - 560) * .1) { X.beginPath(); X.moveTo(-1500, y); X.lineTo(1500, y); X.stroke(); }
      for (let i = -16; i <= 16; i++) { X.beginPath(); X.moveTo(i * 50, 560); X.lineTo(i * 130, 1500); X.stroke(); }
      X.fillStyle = dGrad(0, 470, 0, 560, [[0, '#3A4660'], [1, '#222B3E']]); X.fillRect(-1500, 470, 3000, 90);
      X.fillStyle = 'rgba(160,180,210,.25)'; X.fillRect(-1500, 470, 3000, 6); for (let i = -14; i < 15; i++) { X.fillStyle = 'rgba(8,12,22,.4)'; X.fillRect(i * 110 + 20, 478, 3, 80); }
      X.save(); X.globalCompositeOperation = 'screen'; parilti(0, 790, 600, '#FFD98A', .2); X.restore();
      seccadeOblik(0, 790, 460, 732, .4, { ...GECE_RUG, isik: { alin: .7 + .15 * Math.sin(t * 1.8), el: .55, diz: .45 }, t, yeni: 0 });
      titresim(0, 790 - 168 * 732 / 700 * .4, t, 46.4, 3, 420, .5, .4); titresim(0, 790 - 168 * 732 / 700 * .4, t, 50.0, 3, 420, .45, .4);
      atesBocekleri(18, 411, t, -600, 560, 1200, 700, .9);
    });
    katman(kam, 1.3, () => { tepe(-1300, 1300, 1030, 30, 220, 313, '#0C1422'); });
    const ky = sm(46.6, 47.8, t);
    if (ky > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = dGrad(0, 120, 0, 1000, [[0, '#060C1C', 0], [.25, '#060C1C', .34 * ky], [.75, '#060C1C', .3 * ky], [1, '#060C1C', 0]]); X.fillRect(0, 0, W, H); X.restore(); }
  }
};
function rgba2(c, a) { return rgb(c, a); }

const SAHNELER = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12];
const KAPANIS = [
  { m: 'Burada namaz kılınmış,', tur: 'k', t: 46.9 },
  { m: 'burada Allah denilmiş', tur: 'b', t: 47.4 },
  { m: "ve o Allah'ın sözünün titreşimleri", tur: 'k', t: 48.4 },
  { m: 'seccadeye geçmiş.', tur: 'b', t: 48.9 }
];
function ustKatman(t) {
  if (t < 5) girisBasligi(t, { ust: 'HİKMETLİ KARELER', baslik: 'Seccade', y: 400, bitis: 4.6 });
  if (t < 47.0) altyazi(t, window.ZAMAN.satirlar);
  if (t > 46.4) kapanisYazisi(t, KAPANIS, 50.6, '@1dkdua', 210);
  const k = Math.max(1 - clamp(t / .45), sm(52.15, 53.0, t));
  if (k > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = `rgba(6,8,14,${k})`; X.fillRect(0, 0, W, H); X.restore(); }
}
window.ciz = t => { X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none'; kareCiz(t, SAHNELER, ustKatman); };
