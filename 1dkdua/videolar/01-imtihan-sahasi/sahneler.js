// 01 — İmtihan Sahası · sahneler. Zamanlar SENARYO.md ve veri/zaman_cizelgesi.json ile eşleşir.
'use strict';
const SURE = 57.0;
const kam3 = (keys, t, fn = ease) => { const [x, y, z] = kf(keys, t, fn); return { x, y, z }; };
const agizZarfi = t => { const z = window.ZAMAN.zarf, i = t * window.ZAMAN.zarfHz; const a = z[Math.floor(i)] || 0, b = z[Math.floor(i) + 1] || 0; return lerp(a, b, i % 1); };

// ───────── A · Mülk (0–6.5) ─────────
const S_MULK = {
  ad: 'Mülk', bas: 0, son: 6.5, ciz(t) {
    const kam = kam3([[0, -60, 300, 1.3], [7.0, 0, 40, 1.0]], t, easeS);
    gokyuzu([[0, '#E3CCA2'], [.3, '#EFD4A3'], [.52, '#F5CC92'], [.62, '#F3BE86'], [1, '#E9B57F']]);
    katman(kam, .04, () => gunes(250, -40, 58));
    katman(kam, .08, () => { bulut(-320 + t * 9, -560, 380, 3, '#FFF4DF', .8); bulut(260 + t * 6, -730, 300, 7, '#FFF4DF', .7); bulut(470 + t * 5, -420, 220, 11, '#FFF2DA', .55); });
    katman(kam, .25, () => { for (let i = 0; i < 4; i++) kus(-560 + t * 62 + i * 54, -430 + i * 26 + Math.sin(t * 1.3 + i) * 8, 9 - i, t, i); });
    katman(kam, .14, () => tepe(-1500, 1500, 20, 110, 320, 5, mix('#BFA996', '#F3C690', .3)));
    katman(kam, .22, () => {
      tepe(-1500, 1500, 70, 70, 230, 8, mix('#AFA587', '#F0C690', .25));
      for (let i = 0; i < 9; i++) selvi(-560 + i * 34 + (i % 3) * 6, tepeY(-560 + i * 34, 70, 70, 230, 8) + 4, 26 + (i % 2) * 8, t, i, '#7A7A55', '#8E8E62');
    });
    katman(kam, .35, () => {
      tepe(-1500, 1500, 140, 50, 260, 12, '#A5A46B');
      // tarlalar (yamalı)
      const renk = ['#D8B66C', '#9DAA6A', '#C79A64', '#B9B46E', '#E0C27A'];
      for (let i = 0; i < 16; i++) { const x0 = -900 + i * 110, y0 = tepeY(x0 + 55, 140, 50, 260, 12) + 18; cokgen([[x0, y0], [x0 + 104, y0 - 4], [x0 + 118, y0 + 56], [x0 + 8, y0 + 62]]); doldur(renk[i % 5], .85); }
      // uzak kasaba ve kubbe
      for (let i = 0; i < 9; i++) evKucuk(150 + i * 32 + (i % 2) * 8, tepeY(150 + i * 32, 140, 50, 260, 12) + 6, 24, 18 + (i % 3) * 5, '#EBDCBF', '#B6693F', 0);
      kubbe(300, tepeY(300, 140, 50, 260, 12) - 4, 20);
      // tepede konak
      const kx = -300, ky = tepeY(kx, 140, 50, 260, 12) + 4;
      evKucuk(kx, ky, 64, 40, '#F1E4C9', '#B9653F', 1); selvi(kx - 48, ky + 2, 70, t, 3); selvi(kx + 50, ky + 2, 62, t, 4);
    });
    katman(kam, .6, () => {
      tepe(-1500, 1500, 330, 34, 300, 20, '#93A05D');
      zeytinAgaci(-170, 330, 70, t, 4, .6); zeytinAgaci(420, 342, 60, t, 6, .6);
      for (let i = 0; i < 9; i++) { const x = 40 + i * 38 + (hash(i) - .5) * 30 + Math.sin(t * .2 + i) * 4, y = 350 + (hash(i + 9) - .5) * 40; koyun(x, y, 22, t, i + 1); }
      cimen(-900, 900, 352, 14, 9, t, 17, '#7F8C4C', .7);
    });
    katman(kam, 1, () => {
      const yb = 570, amp = 60, dl = 520, sd = 31;
      tepe(-1300, 1300, yb, amp, dl, sd, '#7D8B4A');
      X.save(); X.globalCompositeOperation = 'soft-light'; X.fillStyle = dGrad(-600, 400, 400, 800, [[0, '#FFE7B0', .55], [1, '#3A3A1A', .4]]); X.fillRect(-1300, 400, 2600, 1400); X.restore();
      zeytinAgaci(-470, tepeY(-470, yb, amp, dl, sd) + 16, 330, t, 2, 1);
      for (let i = 0; i < 22; i++) { const x = -800 + i * 80; cimen(x, x + 80, tepeY(x + 40, yb, amp, dl, sd) + 8, 30, 7, t, 50 + i, '#62702F', .9); }
      // Adam: tepede, lanlara bakıyor; "bütün dünyaya" ile kolunu açar
      const ax = -30, ay = tepeY(ax, yb, amp, dl, sd) + 8;
      const kO = kf([[0, .05, .22], [4.05, .05, .22], [4.85, 1.85, .32], [5.9, 1.72, .28], [6.8, 1.5, .3]], t);
      const kA = kf([[0, -.08, .18], [4.2, -.08, .18], [5.0, -.35, .25]], t);
      insanAyakta({ x: ax, y: ay, s: 56, yon: 1, t, kolO: kO, kolA: kA, egim: kf([[0, .02], [4.2, .02], [5, -.07]], t)[0], ruzgar: sal(t, 9) * .5, tohum: 4 });
    });
    katman(kam, 1.35, () => { tepe(-1200, 1200, 960, 40, 240, 41, '#5D6A34'); cimen(-900, 900, 930, 70, 9, t, 77, '#4C5A28', .95); });
    katman(kam, 0, () => { X.fillStyle = dGrad(0, -200, 0, 400, [[0, '#FFE2AE', 0], [.5, '#FFE2AE', .18], [1, '#FFE2AE', 0]]); X.fillRect(-W, -200, 2 * W, 600); });
    katman(kam, .04, () => parilti(250, -40, 900, '#FFD9A0', .18));
  }
};

// ───────── B+C · Konak odası: sofra → elbiseler (6.5–12.9) ─────────
const ODA_PENCERE = [-880, -300, 320];
function odaArka(t) {
  X.fillStyle = dGrad(0, -1000, 0, 380, [[0, '#E3CDA4'], [.6, '#EAD6B1'], [1, '#DCC39A']]); X.fillRect(-1500, -1000, 3200, 1400);
  // kalemişi friz
  X.fillStyle = rgb('#6E7B3A'); X.fillRect(-1500, -760, 3200, 46);
  for (let x = -1500; x < 1700; x += 60) { cokgen([[x + 30, -756], [x + 50, -737], [x + 30, -718], [x + 10, -737]]); doldur(P.altin, .9); }
  X.fillStyle = rgb('#5C3B24'); X.fillRect(-1500, -1000, 3200, 170);
  for (let x = -1500; x < 1700; x += 140) { X.fillStyle = rgb('#4A2F1C'); X.fillRect(x, -1000, 26, 175); }
  // pencereler ve ışık
  for (const px of ODA_PENCERE) {
    X.fillStyle = rgb('#B79B74'); X.beginPath(); X.moveTo(px - 125, -100); X.lineTo(px - 125, -460); X.arc(px, -460, 125, Math.PI, 0); X.lineTo(px + 125, -100); X.closePath(); X.fill();
    X.beginPath(); X.moveTo(px - 105, -110); X.lineTo(px - 105, -460); X.arc(px, -460, 105, Math.PI, 0); X.lineTo(px + 105, -110); X.closePath();
    X.fillStyle = dGrad(0, -565, 0, -110, [[0, '#FFF3D6'], [1, '#F6D9A2']]); X.fill();
    X.save(); X.clip(); X.strokeStyle = rgb('#7A5233', .85); X.lineWidth = 3.5;
    for (let k = -12; k < 13; k++) { X.beginPath(); X.moveTo(px - 110 + k * 21, -110); X.lineTo(px - 110 + k * 21 + 460, -570); X.moveTo(px + 110 - k * 21, -110); X.lineTo(px + 110 - k * 21 - 460, -570); X.stroke(); }
    X.restore();
    X.fillStyle = rgb('#8A5B37'); X.fillRect(px - 135, -104, 270, 18);
  }
  // lambri
  X.fillStyle = dGrad(0, 150, 0, 385, [[0, '#8C5C38'], [1, '#6E4529']]); X.fillRect(-1500, 150, 3200, 235);
  X.strokeStyle = rgb('#5A3820', .8); X.lineWidth = 4; for (let x = -1500; x < 1700; x += 160) X.strokeRect(x + 14, 170, 132, 190);
  // döşeme
  X.fillStyle = dGrad(0, 385, 0, 1000, [[0, '#A8744A'], [1, '#7C5232']]); X.fillRect(-1500, 385, 3200, 700);
  X.strokeStyle = 'rgba(70,42,22,.35)'; X.lineWidth = 3; for (let y = 400; y < 1000; y += 34 + (y - 400) * .12) { X.beginPath(); X.moveTo(-1500, y); X.lineTo(1700, y); X.stroke(); }
}
function odaIsik(t) { for (const px of ODA_PENCERE) { isikHuzmesi(px - 20, -330, px + 260, 640, 95, 190, '#FFE9B8', .28); } tozZerre(40, 5, t, -1100, -500, 2000, 1000, '#FFF2CF', .45); }
function sedir() {
  X.fillStyle = rgb('#6E4529'); X.fillRect(-1300, 175, 1250, 140);
  X.fillStyle = rgb('#B5583C'); X.fillRect(-1300, 130, 1250, 52);
  X.fillStyle = rgb(P.altin, .9); X.fillRect(-1300, 176, 1250, 6);
  const renk = ['#7D8648', '#C4A05A', '#A65A44', '#7D8648', '#C4A05A', '#A65A44', '#7D8648'];
  for (let i = 0; i < 7; i++) {
    const x = -1250 + i * 172, c = renk[i];
    X.save(); X.translate(x + 75, 82); X.rotate((hash(i) - .5) * .06);
    X.beginPath(); X.moveTo(-72, 48); X.quadraticCurveTo(-82, -6, -62, -50); X.quadraticCurveTo(0, -60, 62, -50); X.quadraticCurveTo(82, -6, 72, 48); X.quadraticCurveTo(0, 56, -72, 48); X.closePath();
    X.fillStyle = dGrad(0, -55, 0, 50, [[0, acik(c, .12)], [1, koyu(c, .18)]]); X.fill();
    X.strokeStyle = rgb(P.altin, .55); X.lineWidth = 2.5; X.beginPath(); X.ellipse(0, -2, 40, 28, 0, 0, TAU); X.stroke();
    cokgen([[0, -16], [14, -2], [0, 12], [-14, -2]]); doldur(P.altin, .6);
    for (const k of [-1, 1]) { X.beginPath(); X.moveTo(k * 66, -48); X.lineTo(k * 76, -62); X.moveTo(k * 70, 46); X.lineTo(k * 80, 58); cizgi(P.altinK, 4, .8); }
    X.restore();
  }
}
function sofra(t, yeme) {
  const cx = -400, cy = 488;
  // ayak ve tepsi
  X.fillStyle = rgb('#5C3B24'); cokgen([[cx - 140, cy + 80], [cx - 120, cy + 10], [cx + 120, cy + 10], [cx + 140, cy + 80]]); X.fill();
  elips(cx, cy + 6, 236, 64); doldur('#8E5A2C'); elips(cx, cy, 236, 62); X.fillStyle = dGrad(cx - 236, 0, cx + 236, 0, [[0, '#B8743A'], [.45, '#E2A35E'], [1, '#A9672F']]); X.fill();
  elips(cx, cy, 206, 50); doldur('#C98544', .6);
  // pilav
  elips(cx - 20, cy - 4, 92, 30); doldur('#E9D9B4'); X.beginPath(); X.ellipse(cx - 20, cy - 10, 80, 56, 0, Math.PI, 0); X.fillStyle = dGrad(0, cy - 66, 0, cy - 4, [[0, '#FBF2DA'], [1, '#E6D2A6']]); X.fill();
  const r = rng(12); for (let i = 0; i < 60; i++) { const a = r() * Math.PI, d = r(); elips(cx - 20 + Math.cos(a) * 72 * d, cy - 12 - Math.sin(a) * 50 * d, 3, 1.4, r()); doldur('#FFFFFF', .7); }
  for (let i = 0; i < 6; i++) { leke(cx - 50 + i * 12, cy - 50 + (i % 2) * 14, 11, 8, 30 + i, 7, .3); doldur('#8A4E2B'); }
  // ekmekler, meyve kâsesi, ibrik
  elips(cx - 160, cy + 6, 46, 20, -.2); doldur('#D49A52'); elips(cx - 160, cy, 40, 13, -.2); doldur('#E6B571');
  elips(cx + 130, cy + 4, 62, 22); doldur('#2F5E6A'); X.beginPath(); X.ellipse(cx + 130, cy + 2, 58, 18, 0, 0, Math.PI); X.fillStyle = '#3E7480'; X.fill();
  for (const [dx, dy, rr, c] of [[-26, -22, 21, '#B33A2E'], [12, -26, 23, '#C2483A'], [36, -12, 17, '#9C2E25'], [-6, -44, 18, '#7A3C6E']]) { daire(cx + 130 + dx, cy + dy, rr); doldur(c); daire(cx + 124 + dx, cy + dy - 6, rr * .3); doldur('#FFFFFF', .25); }
  X.save(); X.translate(cx + 200, cy - 20);
  X.beginPath(); X.moveTo(-20, 30); X.quadraticCurveTo(-36, -10, -14, -40); X.lineTo(-10, -80); X.lineTo(10, -80); X.lineTo(14, -40); X.quadraticCurveTo(36, -10, 20, 30); X.closePath(); X.fillStyle = dGrad(-30, 0, 30, 0, [[0, '#9C5A26'], [.4, '#E5A15C'], [1, '#8A4E20']]); X.fill();
  X.beginPath(); X.moveTo(22, -10); X.quadraticCurveTo(52, -30, 46, -64); cizgi('#A9672F', 5); X.restore();
  // çorba kâsesi ve buhar
  elips(cx + 60, cy + 30, 40, 13); doldur('#E7DCC4'); elips(cx + 60, cy + 26, 34, 9); doldur('#B9763F');
  for (let i = 0; i < 3; i++) { const u = ((t * .35 + i / 3) % 1); X.beginPath(); X.moveTo(cx + 50 + i * 10, cy + 18 - u * 10); X.bezierCurveTo(cx + 40 + i * 10 + sal(t, i) * 14, cy - 10 - u * 60, cx + 70 + i * 10, cy - 30 - u * 80, cx + 54 + i * 10 + sal(t * 1.3, i) * 16, cy - 50 - u * 110); cizgi('#FFFFFF', 4, .22 * Math.sin(u * Math.PI)); }
}
function kaftanAsili(x, y, s, renk, kenar, t, seed, yirtik = 0) { // askıdaki ya da tutulan işlemeli kaftan; (x,y) = askı ortası
  X.save(); X.translate(x, y); X.scale(s, s); X.rotate(sal(t * .9, seed) * .025);
  if (!yirtik) { X.beginPath(); X.moveTo(-1.1, -.05); X.lineTo(1.1, -.05); cizgi('#6B4429', .09); }
  const yol = [[-.25, 0], [-1.0, .15], [-1.55, 1.9], [-1.25, 2.0], [-.95, .9], [-1.05, 4.6], [1.05, 4.6], [.95, .9], [1.25, 2.0], [1.55, 1.9], [1.0, .15], [.25, 0]];
  egri(yol, true); doldur(renk);
  X.save(); egri(yol, true); X.clip();
  X.fillStyle = dGrad(-1.5, 0, 1.5, 0, [[0, koyu(renk, .3)], [.5, acik(renk, .12)], [1, koyu(renk, .3)]]); X.fillRect(-1.6, 0, 3.2, 4.7);
  X.strokeStyle = rgb(kenar); X.lineWidth = .1; X.beginPath(); X.moveTo(-.25, 0); X.lineTo(-.15, 4.6); X.moveTo(.25, 0); X.lineTo(.15, 4.6); X.moveTo(-1.1, 4.45); X.lineTo(1.1, 4.45); X.stroke();
  const r = rng(seed); X.fillStyle = rgb(kenar, .85);
  for (let i = 0; i < 26; i++) { const px = (r() - .5) * 1.8, py = .6 + r() * 3.7; cokgen([[px, py - .08], [px + .08, py], [px, py + .08], [px - .08, py]]); X.fill(); }
  X.restore();
  if (yirtik) { X.fillStyle = 'rgba(40,28,20,.85)'; leke(.5, 3.6, .45, .35, 7, 8, .45); X.fill(); leke(-.6, 2.4, .3, .2, 8, 7, .5); X.fill(); }
  X.restore();
}
const S_ODA = {
  ad: 'Oda', bas: 6.5, son: 12.9, bulanik: t => (t > 9.42 && t < 10.58 ? 12 : 1), ciz(t) {
    const kam = kam3([[6.0, -500, 330, 1.44], [9.4, -470, 318, 1.52], [10.6, 1040, 305, 1.45], [13.4, 1085, 296, 1.52]], t);
    katman(kam, 1, () => {
      odaArka(t); sedir();
      hali(-1120, 430, 1000, 170, 3);
      // sağ köşe: askılık, ayna
      X.fillStyle = rgb('#5C3B24'); X.fillRect(470, -380, 22, 760); X.fillRect(760, -380, 22, 760); X.fillRect(450, -392, 352, 22);
      kaftanAsili(560, -360, 72, '#2F4A6E', '#C9CED6', t, 3); kaftanAsili(690, -362, 72, '#C9963E', '#7A3B2A', t, 5);
      // ayna
      const mx = 1110;
      X.fillStyle = dGrad(mx - 175, 0, mx + 175, 0, [[0, '#9C7A32'], [.5, '#E4C574'], [1, '#9C7A32']]); X.beginPath(); X.roundRect(mx - 175, -470, 350, 860, [175, 175, 14, 14]); X.fill();
      X.beginPath(); X.roundRect(mx - 145, -440, 290, 800, [145, 145, 8, 8]); X.fillStyle = dGrad(mx - 145, -440, mx + 145, 360, [[0, '#DCE3DE'], [.5, '#AFC0BE'], [1, '#8EA19F']]); X.fill();
      if (t >= 10.0) {
        X.save(); X.beginPath(); X.roundRect(mx - 145, -440, 290, 800, [145, 145, 8, 8]); X.clip(); X.globalAlpha = .5;
        adamKaftanla(t, mx + 150, 470, 60, -1); X.globalAlpha = 1;
        X.fillStyle = 'rgba(160,190,200,.28)'; X.fillRect(mx - 150, -450, 300, 820);
        X.restore();
      }
      X.save(); X.globalCompositeOperation = 'screen'; X.fillStyle = dGrad(mx - 140, -440, mx + 60, 200, [[0, '#FFFFFF', .35], [.4, '#FFFFFF', 0]]); X.beginPath(); X.roundRect(mx - 145, -440, 290, 800, [145, 145, 8, 8]); X.fill(); X.restore();
      // oturan Adam ve sofra
      if (t < 10.0) {
        const p = ((t - 5.6) / 2.4) % 1; // yeme döngüsü
        const tabak = [1.0, -.95], agiz = [1.25, 2.5];
        let kO;
        if (p < .3) kO = tabak.map((v, i) => lerp(agiz[i], v, easeS(p / .3)));
        else if (p < .45) kO = tabak;
        else if (p < .75) kO = tabak.map((v, i) => lerp(v, agiz[i], easeS((p - .45) / .3)));
        else kO = agiz;
        const cig = p > .75 ? Math.sin((p - .75) / .25 * Math.PI * 3) : 0;
        insanOturan({ x: -720, y: 470, s: 72, yon: 1, t, kolO: kO, kolA: [.35, -.6], egim: .06 + cig * .025 + (p < .45 ? .05 : 0), agiz: Math.max(0, cig) * .25, tohum: 7 });
      }
      sofra(t);
      if (t >= 10.0) adamKaftanla(t, 870, 470, 62, 1);
    });
    katman(kam, 1, () => odaIsik(t));
    katman(kam, 1.3, () => { // ön plan direği (parallax)
      X.fillStyle = dGrad(120, 0, 210, 0, [[0, '#3E2716'], [.5, '#6B4429'], [1, '#3E2716']]); X.fillRect(120, -1200, 90, 2400);
      X.fillStyle = rgb('#4A2F1C'); X.fillRect(100, -760, 130, 40);
    });
  }
};
function adamKaftanla(t, x, y, s, yon) {
  const kO = kf([[10.0, .7, 1.54], [11.0, .7, 1.54], [11.9, .25, 2.75], [13.4, .28, 2.72]], t);
  const el = elNoktasi(.32, -5.52, kO[0], kO[1]);
  insanAyakta({
    x, y, s, yon, t, kolO: kO, kolA: kf([[10, -.1, .2], [11.4, .25, -.3]], t), egim: kf([[10, .06], [11.5, -.02]], t)[0], tohum: 7,
    oncesi: () => kaftanAsili(el[0], el[1] - .1, 1, '#7E2635', '#D4A84B', t, 9)
  });
}

// ───────── D · Çöplük (12.9–17.0) ─────────
function copYigini(t) {
  const r = rng(21);
  // toprak tümsek
  X.beginPath(); X.moveTo(-420, 640); X.quadraticCurveTo(-330, 470, -120, 450); X.quadraticCurveTo(60, 400, 220, 455); X.quadraticCurveTo(420, 500, 470, 640); X.closePath();
  X.fillStyle = dGrad(0, 400, 0, 640, [[0, '#7A6250'], [1, '#4E3D31']]); X.fill();
  for (let i = 0; i < 26; i++) { const x = -360 + r() * 780, y = 470 + r() * 150; leke(x, y, 16 + r() * 22, 8 + r() * 10, 100 + i, 7, .4); doldur(mix('#5E4A3A', '#8C735C', r()), .9); }
  // yırtık kaftan (aynı bordo kaftan)
  X.save(); X.translate(-130, 448); X.rotate(-.32); X.scale(62, 36); kaftanAsili(0, 0, 1, '#6A2330', '#B9913E', 0, 9, 1); X.restore();
  // artıklar
  for (let i = 0; i < 9; i++) { const x = -300 + r() * 650, y = 480 + r() * 130; X.save(); X.translate(x, y); X.rotate(r() * TAU); cokgen([[0, 0], [30, -6], [22, 16]]); doldur('#B0623E'); X.restore(); }
  for (let i = 0; i < 6; i++) { const x = -260 + r() * 600, y = 470 + r() * 120; X.save(); X.translate(x, y); X.rotate(r() * TAU); X.beginPath(); X.roundRect(-22, -5, 44, 10, 5); doldur('#EADFC6'); daire(-22, -5, 6); doldur('#EADFC6'); daire(-22, 5, 6); doldur('#EADFC6'); X.restore(); }
  for (let i = 0; i < 5; i++) { const x = -200 + r() * 520, y = 460 + r() * 120; X.beginPath(); X.arc(x, y, 26, Math.PI * .1, Math.PI * .9); cizgi('#6F8A3E', 9); X.beginPath(); X.arc(x, y, 20, Math.PI * .15, Math.PI * .85); cizgi('#E6D27A', 5); }
  for (let i = 0; i < 4; i++) { const x = 80 + r() * 260, y = 470 + r() * 90; X.beginPath(); X.arc(x, y, 18, 0, Math.PI); doldur('#9A2F27'); }
  for (let i = 0; i < 4; i++) { elips(-150 + r() * 400, 500 + r() * 100, 26, 11, r()); doldur('#B98A4E'); }
  // ince duman
  for (let i = 0; i < 16; i++) {
    const u = (t * .22 + i / 16) % 1; const x = 150 + Math.sin(u * 5 + i) * 26 + u * 90, y = 450 - u * 560;
    elips(x, y, 26 + u * 80, 18 + u * 50); X.fillStyle = rgb('#D9CFC4', .16 * Math.sin(u * Math.PI)); X.fill();
  }
  // sinekler
  for (let i = 0; i < 9; i++) { const a = t * (2 + i * .3) + i, rr = 40 + i * 9; daire(60 + Math.cos(a) * rr, 380 + Math.sin(a * 1.3) * rr * .4, 2); doldur('#1E1814', .8); }
}
const S_COP = {
  ad: 'Çöplük', bas: 12.9, son: 17.0, ciz(t) {
    const kam = kam3([[12.4, -150, 230, 1.12], [17.5, 40, 400, 1.42]], t, easeS);
    gokyuzu([[0, '#857081'], [.32, '#BC8F86'], [.55, '#E3AE86'], [.7, '#E7B184'], [1, '#C99572']]);
    katman(kam, .04, () => parilti(-240, 60, 700, '#FFC98E', .45));
    katman(kam, .08, () => { bulut(-260 + t * 5, -620, 340, 13, '#E9C1A6', .55, '#C99A8E'); bulut(330 + t * 4, -480, 260, 17, '#EBC6A9', .5, '#C99A8E'); });
    katman(kam, .2, () => tepe(-1500, 1500, 80, 70, 260, 23, '#9C7F78'));
    katman(kam, .85, () => {
      // sur, kuleler, arkada çatılar
      for (let i = 0; i < 6; i++) evKucuk(-560 + i * 170, 30, 90, 60, '#B09080', '#8E5A44', 0);
      kubbe(140, 20, 60, '#B49A88'); selvi(-420, 60, 190, t, 2, '#4E5038', '#5E6044'); selvi(420, 60, 170, t, 5, '#4E5038', '#5E6044');
      X.fillStyle = dGrad(0, -40, 0, 270, [[0, '#B8977A'], [1, '#93765E']]); X.fillRect(-1200, 40, 2400, 230);
      for (let x = -1200; x < 1200; x += 60) X.fillRect(x, 16, 36, 30);
      for (const kx of [-720, 520]) { X.fillStyle = rgb('#A88A70'); X.fillRect(kx - 70, -60, 140, 330); for (let x = kx - 70; x < kx + 70; x += 40) X.fillRect(x, -84, 26, 30); }
      X.strokeStyle = 'rgba(80,60,45,.35)'; X.lineWidth = 2; for (let y = 70; y < 270; y += 32) { X.beginPath(); X.moveTo(-1200, y); X.lineTo(1200, y); X.stroke(); }
      X.beginPath(); X.moveTo(-340, 270); X.lineTo(-340, 150); X.arc(-270, 150, 70, Math.PI, 0); X.lineTo(-200, 270); X.closePath(); doldur('#5A3E2C');
    });
    katman(kam, 1, () => {
      X.fillStyle = dGrad(0, 250, 0, 1000, [[0, '#A88A6C'], [1, '#7A6048']]); X.fillRect(-1300, 250, 2600, 900);
      // sur kapısından çöplüğe inen ve orada biten patika
      X.beginPath(); X.moveTo(-320, 262); X.bezierCurveTo(-300, 360, -120, 380, -60, 470); X.lineTo(60, 470); X.bezierCurveTo(-40, 360, -190, 330, -220, 262); X.closePath(); doldur('#C3A684', .85);
      copYigini(t);
      karga(-240, 560, 30, t, 1, Math.max(0, Math.sin(t * 3.1)) ** 4);
      karga(250, 520, 26, t, 2.7, 0);
      karga(-40, 452, 28, t, 4, Math.max(0, Math.sin(t * 2.5 + 1)) ** 4);
    });
    katman(kam, 1.3, () => {
      tepe(-1200, 1200, 980, 50, 200, 61, '#5E4A38');
      cimen(-900, 900, 950, 60, 14, t, 81, '#6E5E3A', .9, .6);
      for (let i = 0; i < 6; i++) { leke(-600 + i * 230, 960, 40, 22, 600 + i, 8, .3); doldur('#7E6A54'); }
    });
  }
};

// ───────── E · Konak → harabe (17.0–23.3) ─────────
const S_KONAK = {
  ad: 'Konak', bas: 17.0, son: 23.3, ciz(t) {
    const kam = kam3([[16.5, 0, 190, 1.12], [23.8, 0, 80, .98]], t, easeS);
    const d = easeS((t - 21.0) / 1.9), gece = Math.sin(clamp((t - 20.9) / 2.0) * Math.PI) * .35;
    gokyuzu([[0, mix(mix('#A9C7C8', '#8E949C', d), '#3E4A66', gece)], [.5, mix(mix('#E4E2C9', '#B7B2A8', d), '#6E6E80', gece)], [1, mix(mix('#F1DCB2', '#C9BBA6', d), '#8A7C84', gece)]]);
    const ak = 1700 * easeS((t - 20.8) / 2.3);
    katman(kam, .08, () => { for (const [x, y, w, sd] of [[-380, -620, 360, 31], [260, -760, 300, 33], [520, -470, 240, 35], [-900, -500, 300, 37], [-1400, -700, 360, 39]]) bulut(x + t * 6 + ak, y, w, sd, mix('#FFF8EA', '#DAD6D0', d), .8, mix('#E7D3B5', '#ABA59E', d)); });
    katman(kam, .25, () => { tepe(-1500, 1500, 80, 60, 260, 42, mix('#B5B98E', '#98988A', d)); for (let i = 0; i < 7; i++) selvi(-520 + i * 170, 92, 150 + (i % 2) * 40, t, i, mix('#55613A', '#4E5244', d), mix('#6E7B47', '#5E6252', d)); });
    katman(kam, 1, () => {
      // avlu zemini
      X.fillStyle = dGrad(0, 500, 0, 1000, [[0, mix('#D7C6A4', '#A9A090', d)], [1, mix('#BFA884', '#8E8676', d)]]); X.fillRect(-1300, 500, 2600, 600);
      X.strokeStyle = rgb('#8E7A5C', .35); X.lineWidth = 2;
      for (let y = 520; y < 1000; y += 30 + (y - 520) * .15) { X.beginPath(); X.moveTo(-1300, y); X.lineTo(1300, y); X.stroke(); }
      for (let i = -14; i <= 14; i++) { X.beginPath(); X.moveTo(i * 40, 520); X.lineTo(i * 150, 1000); X.stroke(); }
      if (d > 0) { const r = rng(44); for (let i = 0; i < 30; i++) { cimen(-600 + r() * 1200, -560 + r() * 1200, 530 + r() * 420, 28 * d, 6, t, 400 + i, '#6E7A3A', d); } }
      const kapi = clamp((t - 19.95) / .35) * (1 - clamp((t - 20.75) / .35));
      konak(0, 520, 1, d, t, 1 - d, kapi);
      // havuz / çeşme
      X.fillStyle = rgb(mix('#CDBB9C', '#9C9384', d)); X.beginPath(); X.roundRect(-470, 590, 210, 70, 12); X.fill();
      elips(-365, 594, 100, 18); doldur(mix('#7FA6A8', '#6E6458', d));
      if (d < .9) for (let i = 0; i < 4; i++) { X.beginPath(); X.moveTo(-365, 520); X.quadraticCurveTo(-365 + (i - 1.5) * 36, 470 + sal(t * 3, i) * 3, -365 + (i - 1.5) * 60, 590); cizgi('#E6F2F0', 3, .7 * (1 - d)); }
      X.fillStyle = rgb(mix('#BBA98A', '#8C8476', d)); X.fillRect(-375, 520, 20, 72);
      zeytinAgaci(470, 640, 300, t, 8, 1 - d * .5);
      // Adam avluda, sonra içeri girer
      if (t < 20.95) {
        const u = easeS((t - 19.3) / 1.4);
        const x = lerp(-250, -6, u), y = lerp(720, 528, u), s = lerp(62, 48, u);
        const yur = clamp((t - 19.3) / .25) * (1 - clamp((t - 20.55) / .25));
        const al = 1 - clamp((t - 20.55) / .4);
        X.save(); X.globalAlpha = al;
        insanAyakta({ x, y, s, yon: 1, t, faz: adimFaz(u * 5.6), yur, kolO: yur > .1 ? undefined : kf([[17, .05, .22], [18.1, .05, .22], [18.7, 1.3, .5], [19.3, .1, .22]], t), egim: -.04, tohum: 4 });
        X.restore();
      }
      // gölge geçişleri (zaman akıyor)
      if (t > 20.9 && t < 23.2) { const u = (t - 20.9) / 2.3; X.save(); X.globalCompositeOperation = 'multiply'; for (let k = 0; k < 2; k++) { const sx = -1400 + ((u * 2 + k * .5) % 1) * 2800; X.fillStyle = dGrad(sx - 400, 0, sx + 400, 0, [[0, '#5A5A70', 0], [.5, '#5A5A70', .35], [1, '#5A5A70', 0]]); X.fillRect(sx - 400, -800, 800, 1800); } X.restore(); }
    });
    katman(kam, 1.3, () => { tepe(-1200, 1200, 1000, 30, 200, 71, mix('#8E7F5E', '#6E665A', d)); cimen(-900, 900, 980, 40, 11, t, 91, mix('#6E7B3A', '#6E6A44', d), .9); });
  }
};

// ───────── F · Karun'un sarayları (23.3–27.6) ─────────
function hayaletSaray(al, cozul, t) {
  if (al <= 0) return;
  X.save(); X.globalAlpha = al; X.strokeStyle = rgb('#F6D58A'); X.lineWidth = 3; X.shadowColor = 'rgba(255,214,130,.9)'; X.shadowBlur = 16; X.lineCap = 'round';
  // sütunlar (kalıntılarla hizalı), saçaklık, kemerli üst kat, kubbeler, kuleler
  for (let i = 0; i < 9; i++) { const x = -440 + i * 110; X.strokeRect(x - 27, -170, 54, 470); X.beginPath(); X.moveTo(x - 38, -170); X.lineTo(x + 38, -170); X.moveTo(x - 38, 300); X.lineTo(x + 38, 300); X.stroke(); }
  X.strokeRect(-500, -235, 1000, 65);
  for (let i = 0; i < 8; i++) { const x = -385 + i * 110; X.beginPath(); X.moveTo(x - 46, -235); X.lineTo(x - 46, -300); X.arc(x, -300, 46, Math.PI, 0); X.lineTo(x + 46, -235); X.stroke(); }
  X.strokeRect(-500, -375, 1000, 24);
  X.beginPath(); X.arc(0, -375, 190, Math.PI, 0); X.stroke(); X.beginPath(); X.arc(0, -375, 150, Math.PI, 0); X.stroke(); X.beginPath(); X.moveTo(0, -565); X.lineTo(0, -625); X.stroke();
  for (const sx of [-1, 1]) { X.beginPath(); X.arc(sx * 320, -375, 100, Math.PI, 0); X.stroke(); X.strokeRect(sx * 500 - 42, -660, 84, 960); X.beginPath(); X.moveTo(sx * 500 - 54, -660); X.lineTo(sx * 500, -780); X.lineTo(sx * 500 + 54, -660); X.stroke(); for (let k = 0; k < 4; k++) X.strokeRect(sx * 500 - 14, -600 + k * 200, 28, 60); }
  X.restore();
}
const S_KARUN = {
  ad: 'Karun', bas: 23.3, son: 27.6, ciz(t) {
    const kam = kam3([[22.8, -150, 60, 1.12], [28.1, 140, 30, 1.08]], t, x => x);
    gokyuzu([[0, '#6F6182'], [.35, '#B98386'], [.56, '#E7B08A'], [.66, '#EDB989'], [1, '#D9965F']]);
    katman(kam, .04, () => gunes(-260, 20, 64, '#FFE4B0', '#FFC27E', .9));
    katman(kam, .1, () => { for (let i = 0; i < 5; i++) { elips(-600 + i * 330 + t * 10, -380 - i * 40, 260, 14); doldur('#F2C3A0', .35); } });
    katman(kam, .18, () => tepe(-1600, 1600, 120, 60, 420, 51, mix('#D3A07C', '#EDB989', .35)));
    katman(kam, .32, () => tepe(-1600, 1600, 200, 70, 380, 53, '#CC9568'));
    const goster = sm(24.35, 25.0, t), coz = sm(26.05, 26.9, t);
    katman(kam, .55, () => {
      tepe(-1600, 1600, 330, 40, 500, 55, '#C48C5E');
      // kalıntılar (ana sütun sırası saray planıyla hizalı)
      const kirik = [.15, .55, 0, .7, .35, .8, 0, .5, .25];
      for (let i = 0; i < 9; i++) { const x = -440 + i * 110; if ([2, 6].includes(i)) continue; sutun(x, 300 + (i % 3) * 6, 470, 54, kirik[i], '#D7BB90', i); }
      // devrik sütun parçaları
      for (let i = 0; i < 3; i++) { X.save(); X.translate(-60 + i * 46, 300); X.rotate(.05 * i); X.fillStyle = dGrad(0, -34, 0, 0, [[0, '#E2C9A0'], [1, '#A88A62']]); X.fillRect(-20, -34, 40, 34); X.restore(); }
      // yarı gömülü kubbe ve kırık kemer
      X.beginPath(); X.arc(330, 320, 120, Math.PI, 0); X.fillStyle = dGrad(210, 0, 450, 0, [[0, '#E2C9A0'], [1, '#9C7E58']]); X.fill();
      X.beginPath(); X.arc(330, 320, 120, Math.PI, Math.PI * 1.35); X.lineTo(330, 320); X.fillStyle = 'rgba(70,45,30,.4)'; X.fill();
      hayaletSaray(goster * (1 - coz) * .95, coz, t);
      // çözülürken altın kum zerreleri
      if (coz > 0 && coz < 1) { const r = rng(61); for (let i = 0; i < 160; i++) { const sx = -480 + r() * 960, sy = -560 + r() * 820, b = r() * .5; const u = clamp((coz - b) / .5); if (u <= 0 || u >= 1) continue; daire(sx + u * 260 + Math.sin(i + u * 6) * 14, sy - u * 60 + u * u * 140, 2.4); doldur('#F6D58A', (1 - u) * .9); } }
      tepe(-1600, 1600, 370, 34, 300, 57, '#BE8457');
    });
    katman(kam, 1, () => {
      tepe(-1600, 1600, 640, 70, 420, 59, '#B07A4E');
      X.strokeStyle = 'rgba(255,225,180,.18)'; X.lineWidth = 3; for (let i = 0; i < 18; i++) { const y = 640 + i * 22; X.beginPath(); for (let x = -1300; x < 1300; x += 30) X.lineTo(x, y + Math.sin(x * .01 + i) * 8 - (tepeY(x, 640, 70, 420, 59) - 640) * (1 - i / 18)); X.stroke(); }
      // yarı gömülü taş başlık
      X.save(); X.translate(-300, 690); X.rotate(-.2); X.fillStyle = dGrad(0, -60, 0, 0, [[0, '#DCC096'], [1, '#9A7B55']]); X.fillRect(-90, -50, 180, 50); X.fillRect(-60, -80, 120, 30); X.restore();
    });
    katman(kam, 1.25, () => {
      // rüzgârla savrulan kum
      const r = rng(71); X.lineCap = 'round';
      for (let i = 0; i < 70; i++) { const y = -200 + r() * 1300, L = 40 + r() * 120, v = 400 + r() * 500; const x = ((r() * 2600 + t * v) % 2600) - 1300; X.beginPath(); X.moveTo(x, y); X.lineTo(x + L, y - L * .05); cizgi('#F3D2A8', 1.6, .25 + r() * .2); }
      tepe(-1600, 1600, 1000, 40, 260, 63, '#94653F');
    });
  }
};

// ───────── G · İnsan gider, dünya metaı da gider (27.6–31.6) ─────────
const S_YOL = {
  ad: 'Yol', bas: 27.6, son: 31.6, ciz(t) {
    const kam = kam3([[27.1, 0, 130, 1.04], [29.4, -40, 170, 1.1], [32.1, -100, 220, 1.18]], t);
    gokyuzu([[0, '#7F6E8C'], [.2, '#C98E84'], [.34, '#F1B986'], [.42, '#F8D49A'], [1, '#F8D49A']]);
    katman(kam, .08, () => { for (let i = 0; i < 4; i++) { elips(-500 + i * 300 + t * 8, -300 - i * 60, 300, 12); doldur('#F7CFA8', .4); } });
    katman(kam, 1, () => {
      const HZ = 0, f = 900; // ufuk ve perspektif ölçeği
      gunes(0, -95, 82, '#FFEFC6', '#FFC685', 1.1);
      tepe(-1600, 1600, 2, 46, 300, 81, mix('#B07E78', '#F1B986', .35));
      X.fillStyle = dGrad(0, HZ, 0, 1000, [[0, '#D6A866'], [.25, '#B99A58'], [1, '#7E7A40']]); X.fillRect(-1600, HZ, 3200, 1100);
      X.strokeStyle = 'rgba(90,70,30,.2)'; X.lineWidth = 2; for (let i = -24; i <= 24; i++) { X.beginPath(); X.moveTo(0, HZ); X.lineTo(i * 140, 1000); X.stroke(); }
      // yol
      X.beginPath(); X.moveTo(-6, HZ); X.lineTo(6, HZ); X.lineTo(560, 1000); X.lineTo(-560, 1000); X.closePath(); X.fillStyle = dGrad(0, HZ, 0, 1000, [[0, '#F0CFA0'], [1, '#C29A6E']]); X.fill();
      X.strokeStyle = 'rgba(120,85,55,.35)'; X.lineWidth = 3; for (const k of [-.25, .25]) { X.beginPath(); X.moveTo(0, HZ); X.lineTo(k * 1120, 1000); X.stroke(); }
      // yol boyu serviler (perspektif)
      for (let z = 14; z >= 1.3; z -= 1.1) { for (const sx of [-1, 1]) { const x = sx * 620 / z, y = HZ + f / z * .9; selvi(x, y, 520 / z, t, z * 3 + sx, '#4C5233', '#6B6E44'); } }
      parilti(0, HZ, 500, '#FFD49A', .35);
      // Adam yürüyerek uzaklaşır
      const Z = lerp(1.55, 4.3, easeS((t - 27.5) / 4.4) * .5 + clamp((t - 27.5) / 4.4) * .5);
      insanArka({ x: 60 / Z, y: HZ + f / Z * .9, s: 64 / Z, t, faz: t * 6.4, yur: 1 });
      // ön planda altın sandığı
      const dolu = 1 - easeS((t - 29.7) / 1.4);
      sandik(-280, 640, 92, dolu, t);
      // altınlar toza dönüşüp güneşe doğru savrulur
      if (t > 29.6) {
        const r = rng(91); X.save(); X.globalCompositeOperation = 'screen';
        for (let i = 0; i < 240; i++) {
          const b = 29.65 + r() * 1.5, x0 = -280 + (r() - .5) * 150, y0 = 640 - 92 * (1.1 + r() * .5), vx = 110 + r() * 160, vy = 90 + r() * 140, sz = 1.5 + r() * 3.5, ph = r() * 6;
          const a = t - b; if (a < 0 || a > 2.2) continue;
          const x = x0 + vx * a + Math.sin(a * 3 + ph) * 18, y = y0 - vy * a - a * a * 10;
          const al = Math.sin(clamp(a / 2.2) * Math.PI) * .95;
          parilti(x, y, sz * 5, '#FFD58A', al * .5); daire(x, y, sz); X.fillStyle = rgb('#FFF0C2', al); X.fill();
        }
        X.restore();
      }
    });
    katman(kam, 1.3, () => { tepe(-1200, 1200, 1010, 30, 220, 95, '#5E5A30'); cimen(-900, 900, 990, 80, 10, t, 97, '#6A6633', .9); });
  }
};

// ───────── H · Hoca ve Kur'ân (31.6–37.5) ─────────
function rahle(x, y, s, isik, t) {
  X.save(); X.translate(x, y); X.scale(s, s);
  X.fillStyle = rgb('#6B4429'); cokgen([[-1.1, 0], [-.9, 0], [.9, -1.5], [.7, -1.5]]); X.fill(); cokgen([[1.1, 0], [.9, 0], [-.9, -1.5], [-.7, -1.5]]); X.fill();
  X.fillStyle = rgb('#8A5B37'); cokgen([[-1.0, -1.45], [0, -1.62], [1.0, -1.45], [0, -1.32]]); X.fill();
  // açık kitap
  X.fillStyle = rgb('#7A2E25'); cokgen([[-1.12, -1.5], [0, -1.74], [1.12, -1.5], [0, -1.3]]); X.fill();
  for (const sx of [-1, 1]) { cokgen([[0, -1.72], [sx * 1.0, -1.52], [sx * .98, -1.42], [0, -1.6]]); X.fillStyle = dGrad(0, 0, sx, 0, [[0, '#E9DDBF'], [1, '#F7EEDA']]); X.fill(); }
  X.strokeStyle = rgb('#8C7A5A', .5); X.lineWidth = .012;
  for (let i = 1; i < 6; i++) for (const sx of [-1, 1]) { X.beginPath(); X.moveTo(sx * .12, -1.7 + i * .012 + i * .006); X.lineTo(sx * .86, -1.52 + i * .012); X.stroke(); }
  X.restore();
  if (isik > 0) { parilti(x, y - 1.6 * s, 4.2 * s * (1 + isik * .4), '#FFD98A', .55 * isik); }
}
const S_HOCA = {
  ad: 'Hoca', bas: 31.6, son: 37.5, ciz(t) {
    const kam = kam3([[31.1, 30, 250, 1.0], [38.0, 70, 250, 1.2]], t, easeS);
    katman(kam, 1, () => {
      // duvar, çini kuşak, niş, pencere
      X.fillStyle = dGrad(0, -1100, 0, 330, [[0, '#2A201C'], [.55, '#4A3A2E'], [1, '#5A4434']]); X.fillRect(-1300, -1100, 2600, 1440);
      X.fillStyle = rgb('#3E4A2C'); X.fillRect(-1300, -60, 2600, 70);
      for (let x = -1300; x < 1300; x += 70) { cokgen([[x + 35, -55], [x + 62, -25], [x + 35, 5], [x + 8, -25]]); doldur(P.altin, .75); daire(x + 35, -25, 6); doldur('#2C4A5A'); }
      // kitap nişi
      X.fillStyle = rgb('#2E231D'); X.beginPath(); X.moveTo(-560, -120); X.lineTo(-560, -420); X.arc(-450, -420, 110, Math.PI, 0); X.lineTo(-340, -120); X.closePath(); X.fill();
      const kr = ['#7A2E25', '#3E5A4A', '#C99A45', '#4A3A6A', '#8A5B37', '#2F4A6E'];
      for (let i = 0; i < 9; i++) { X.fillStyle = rgb(kr[i % 6]); X.fillRect(-545 + i * 22, -300 + (i % 3) * 8, 18, 140 - (i % 3) * 8); X.fillStyle = rgb(P.altin, .7); X.fillRect(-545 + i * 22, -270, 18, 4); }
      for (let i = 0; i < 4; i++) { X.fillStyle = rgb(kr[(i + 2) % 6]); X.fillRect(-540, -150 - i * 22, 170, 18); }
      // pencere: gece mavisi
      const px = 400;
      X.fillStyle = rgb('#2B211B'); X.beginPath(); X.moveTo(px - 130, -60); X.lineTo(px - 130, -470); X.arc(px, -470, 130, Math.PI, 0); X.lineTo(px + 130, -60); X.closePath(); X.fill();
      X.beginPath(); X.moveTo(px - 108, -70); X.lineTo(px - 108, -470); X.arc(px, -470, 108, Math.PI, 0); X.lineTo(px + 108, -70); X.closePath(); X.fillStyle = dGrad(0, -580, 0, -70, [[0, '#122546'], [1, '#2C4C78']]); X.fill();
      X.save(); X.clip(); ay(px + 40, -440, 34, .9); yildizlar(30, 5, t, px - 108, -580, 216, 400, .8);
      X.strokeStyle = rgb('#2B211B'); X.lineWidth = 7; for (let k = -6; k < 7; k++) { X.beginPath(); X.moveTo(px - 108 + k * 34, -70); X.lineTo(px - 108 + k * 34 + 520, -590); X.moveTo(px + 108 - k * 34, -70); X.lineTo(px + 108 - k * 34 - 520, -590); X.stroke(); }
      X.restore();
      // zemin ve halı
      X.fillStyle = dGrad(0, 330, 0, 1100, [[0, '#4A3426'], [1, '#2E2019']]); X.fillRect(-1300, 330, 2600, 800);
      X.fillStyle = rgb('#7E2E25'); X.fillRect(-1100, 380, 2200, 700); X.strokeStyle = rgb(P.altin, .55); X.lineWidth = 10; X.strokeRect(-1060, 410, 2120, 640);
      X.strokeStyle = rgb('#3E4A2C', .9); X.lineWidth = 16; X.strokeRect(-1030, 440, 2060, 580);
      for (let i = 0; i < 9; i++) { const cx = -800 + i * 200; cokgen([[cx, 600], [cx + 60, 680], [cx, 760], [cx - 60, 680]]); doldur(P.altin, .45); }
      // ay ışığı huzmesi
      isikHuzmesi(px, -300, px - 260, 760, 90, 230, '#7FA0D0', .18);
      // kandil ışığı
      kandil(30, -520, 120, t, 500);
      X.save(); X.globalCompositeOperation = 'screen'; parilti(30, -440, 900, '#FFB860', .28 + sal(t * .9, 2) * .02); X.restore();
      // Hoca: rahlenin başında, sesle senkron konuşur
      const kO = kf([[31.4, .35, -.3], [32.0, .35, -.3], [32.55, .9, 1.5], [33.5, .95, 1.4], [33.95, .54, 1.33], [35.25, .56, 1.3], [35.7, .9, 1.55], [36.9, .85, 1.5], [37.5, .4, -.2]], t);
      const egim = kf([[31.4, -.02], [33.9, .1], [35.3, .1], [35.7, -.04], [37.5, .02]], t)[0];
      insanOturan({ x: -120, y: 470, s: 80, yon: 1, t, pal: HOCA, kolO: kO, kolA: [.3, -.5], egim: egim + sal(t * 1.7, 3) * .015, agiz: t > 31.7 && t < 36.95 ? agizZarfi(t) : 0, tohum: 11 });
      const isik = sm(35.3, 36.0, t) * (1 - sm(37.1, 37.8, t)) + .25;
      rahle(170, 470, 112, isik, t);
      if (t > 35.2) { const r = rng(17); X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 40; i++) { const b = 35.3 + r() * 1.8, a = t - b; if (a < 0 || a > 2.4) continue; const x = 170 + (r() - .5) * 180 + Math.sin(a * 2 + i) * 16, y = 290 - a * (90 + r() * 70); const al = Math.sin(a / 2.4 * Math.PI); parilti(x, y, 14, '#FFE3A0', al * .6); daire(x, y, 2.2); X.fillStyle = rgb('#FFF6DA', al); X.fill(); } X.restore(); }
      X.save(); X.globalCompositeOperation = 'screen'; parilti(170, 300, 380, '#FFC870', .22); X.restore();
    });
    katman(kam, 1.22, () => { // dinleyen talebeler (ön plan)
      talebeArka({ x: -330, y: 840, s: 74, t, pal: TALEBE1, tohum: 1, egim: .05 });
      talebeArka({ x: 340, y: 870, s: 78, t, pal: TALEBE2, tohum: 2, egim: -.06 });
    });
    katman(kam, 0, () => { X.fillStyle = rGrad(0, -100, 300, 1300, [[0, '#000000', 0], [1, '#0A0604', .45]]); X.fillRect(-W, -H, 2 * W, 2 * H); });
  }
};

// ───────── I · İmtihan sahası, şafak (37.5–44.9) ─────────
// Patika: ön soldan kemere, kemerden ufka. I ve J sahneleri aynı yerleşimi paylaşır (süreklilik).
const KEMER = { x: 60, y: 340, s: 96 };
function patikaNokta(u) { // u: 0 (ön sol) → 1 (ufuk)
  const p = [[-560, 980], [-240, 600], [60, 342], [110, 200], [128, 40]];
  const n = p.length - 1, k = Math.min(n - 1, Math.floor(u * n)), f = u * n - k;
  const a = p[Math.max(0, k - 1)], b = p[k], c = p[k + 1], d = p[Math.min(n, k + 2)];
  const cr = (i) => .5 * ((2 * b[i]) + (-a[i] + c[i]) * f + (2 * a[i] - 5 * b[i] + 4 * c[i] - d[i]) * f * f + (-a[i] + 3 * b[i] - 3 * c[i] + d[i]) * f * f * f);
  return [cr(0), cr(1)];
}
function patika(renk, al) {
  const sol = [], sag = [];
  for (let i = 0; i <= 60; i++) { const u = i / 60, [x, y] = patikaNokta(u), w = 6 + Math.max(0, y - 30) * .26; sol.push([x - w, y]); sag.push([x + w, y]); }
  X.beginPath(); X.moveTo(sol[0][0], sol[0][1]); for (const p of sol) X.lineTo(p[0], p[1]); for (const p of sag.reverse()) X.lineTo(p[0], p[1]); X.closePath(); doldur(renk, al);
}
function ovaSahnesi(t, gece, kam) {
  const g = gece;
  katman(kam, .1, () => tepe(-1600, 1600, 10, 120, 380, 101, mix(mix('#BDB0BC', '#F0CBA8', .25), '#26385A', g)));
  katman(kam, .18, () => tepe(-1600, 1600, 30, 70, 300, 103, mix('#A9A3A6', '#1E2E4C', g)));
  katman(kam, .3, () => { tepe(-1600, 1600, 50, 34, 260, 105, mix('#9AA07A', '#1B2A40', g)); for (let i = 0; i < 6; i++) zeytinAgaci(-700 + i * 260 + (i % 2) * 60, 50, 46, t, 20 + i, .5 - g * .5, g ? { govde: '#1A2232', govdeK: '#121826', y1: '#1E2C3A', y2: '#26384A', y3: '#3A5068', yK: '#16202E' } : undefined); });
  katman(kam, 1, () => {
    X.fillStyle = dGrad(0, 30, 0, 1000, [[0, mix('#D8CB98', '#24364F', g)], [.35, mix('#AFAE72', '#1B2B3E', g)], [1, mix('#7F8C4C', '#111C2A', g)]]); X.fillRect(-1600, 30, 3200, 1100);
    const r = rng(111);
    for (let i = 0; i < 46; i++) { const y = 60 + Math.pow(r(), 1.6) * 900, x = (r() - .5) * 2400, s = .15 + (y - 30) / 900; leke(x, y, 40 * s, 14 * s, 1000 + i, 7, .3); doldur(mix(mix('#7B8746', '#9AA45E', r()), '#0F1A28', g * .85)); }
    for (let i = 0; i < 30; i++) { const y = 80 + Math.pow(r(), 1.4) * 860, x = (r() - .5) * 2200, s = .15 + (y - 30) / 900; leke(x, y, 22 * s, 13 * s, 1100 + i, 7, .25); doldur(mix('#B4A88C', '#2A3446', g)); }
    // perspektifli çimen dokusu
    X.save(); X.lineCap = 'round';
    for (let y = 46, k = 0; y < 1000; y += 6 + (y - 30) * .05, k++) {
      const s = (y - 30) / 900, n = 26 + (k % 3);
      X.strokeStyle = rgb(mix(mix('#7E8A48', '#B9B27A', clamp(1 - s * 2)), '#0E1826', g * .9), .35 + s * .3); X.lineWidth = .8 + s * 2.6;
      X.beginPath(); for (let i = 0; i < n; i++) { const x = -1300 + (i + hash(k * 37 + i)) * 2600 / n, h = 3 + s * 26, e = sal(t * 1.2 + x * .004, k) * h * .35; X.moveTo(x, y); X.quadraticCurveTo(x + e * .4, y - h * .6, x + e, y - h); } X.stroke();
    }
    X.restore();
    patika(mix('#E6D3A6', '#7F93AE', g), g ? .55 : .9);
    if (!g) { const r2 = rng(131); for (let i = 0; i < 70; i++) { const y = 560 + r2() * 420, x = (r2() - .5) * 1600, s = (y - 30) / 900; daire(x, y - 6 * s, 3.5 * s + 1); doldur(r2() < .5 ? '#F3E3B0' : '#E9C46A', .9); } }
  });
}
function adamSahada(t) { // 41.2 → 44.9: ön soldan kemere, kemerin altından ovaya
  const u = clamp((t - 41.15) / 3.75), uu = lerp(.02, .66, u * .55 + easeS(u) * .45);
  const [x, y] = patikaNokta(uu); const s = Math.max(8, 14 + (y - 30) * .068);
  return { x, y, s, faz: adimFaz(uu * 140), arkada: y < KEMER.y - 2 };
}
const S_SAHA = {
  ad: 'Saha', bas: 37.5, son: 44.9, ciz(t) {
    const kam = kam3([[37.0, 0, 30, 1.0], [40.8, -30, 110, 1.05], [44.9, 50, 250, 1.2], [45.5, 60, 260, 1.22]], t);
    gokyuzu([[0, '#9EBDC2'], [.3, '#D7D6C2'], [.48, '#F2D6B4'], [.56, '#F5C99E'], [1, '#E9B88C']]);
    katman(kam, .04, () => gunes(300, 0, 54, '#FFF2D0', '#FFD2A0', .9));
    katman(kam, .08, () => { bulut(-330 + t * 7, -640, 360, 41, '#FFF7E8', .75, '#EED7C0'); bulut(280 + t * 5, -780, 300, 43, '#FFF7E8', .7, '#EED7C0'); bulut(-20 + t * 4, -470, 220, 45, '#FFF3E2', .5, '#EED7C0'); });
    katman(kam, .2, () => { for (let i = 0; i < 5; i++) kus(-600 + (t - 37.5) * 75 + i * 50, -520 + i * 24 + Math.sin(t * 1.2 + i) * 6, 8 - i * .6, t, i + 3); });
    ovaSahnesi(t, 0, kam);
    katman(kam, 1, () => {
      sis(140, 30, t, 22, .5); sis(210, 40, t, -16, .35, '#FFF6E6', 3);
      // kemerin yanlarında yıkık duvar parçaları
      for (const [sx, w, h] of [[-190, 120, 90], [-320, 90, 50], [300, 140, 80], [430, 70, 40]]) {
        X.beginPath(); X.moveTo(sx - w / 2, KEMER.y); X.lineTo(sx - w / 2, KEMER.y - h * .8); for (let i = 0; i <= 5; i++) X.lineTo(sx - w / 2 + w * i / 5, KEMER.y - h + (hash(sx + i) - .5) * 18); X.lineTo(sx + w / 2, KEMER.y); X.closePath();
        X.fillStyle = dGrad(sx, KEMER.y - h, sx, KEMER.y, [[0, '#D3C2A2'], [1, '#A79474']]); X.fill();
        X.strokeStyle = 'rgba(110,90,60,.35)'; X.lineWidth = 2; for (let yy = KEMER.y - 22; yy > KEMER.y - h * .8; yy -= 22) { X.beginPath(); X.moveTo(sx - w / 2, yy); X.lineTo(sx + w / 2, yy); X.stroke(); }
      }
      const a = adamSahada(t), gor = t > 41.1;
      if (gor && a.arkada) insanAyakta({ x: a.x, y: a.y, s: a.s, yon: 1, t, faz: a.faz, yur: 1, tohum: 4 });
      kemer(KEMER.x, KEMER.y, KEMER.s, t, 1);
      if (gor && !a.arkada) insanAyakta({ x: a.x, y: a.y, s: a.s, yon: 1, t, faz: a.faz, yur: 1, tohum: 4 });
      sis(330, 46, t, 30, .16, '#FFF6E6', 6);
    });
    katman(kam, 1.3, () => { tepe(-1200, 1200, 1000, 40, 240, 121, '#6E7B3A'); cimen(-900, 900, 985, 80, 9, t, 123, '#5E6B30', .95); });
    katman(kam, .04, () => parilti(300, 0, 900, '#FFE0B0', .2));
  }
};

// ───────── J · Gece ve kapanış (44.9–57.0) ─────────
const S_GECE = {
  ad: 'Gece', bas: 44.9, son: 57.0, ciz(t) {
    const kam = kam3([[44.3, 30, 150, 1.12], [50.6, 0, 40, 1.0], [57.5, 0, -10, .98]], t);
    gokyuzu([[0, '#0B1630'], [.35, '#152A4C'], [.52, '#24426A'], [.58, '#35567E'], [1, '#1C2E48']]);
    katman(kam, .02, () => { X.save(); X.globalCompositeOperation = 'screen'; X.fillStyle = dGrad(-600, -900, 600, 100, [[0, '#2A3E6A', 0], [.5, '#4A6090', .25], [1, '#2A3E6A', 0]]); X.fillRect(-700, -1000, 1400, 1100); X.restore(); });
    katman(kam, .03, () => yildizlar(220, 7, t, -620, -1050, 1240, 1060));
    katman(kam, .05, () => ay(KEMER.x, -95, 74, 1));
    ovaSahnesi(t, 1, kam);
    katman(kam, 1, () => {
      sis(150, 30, t, 12, .14, '#9DB3D6');
      // Adam ufka doğru yürür, ay ışığında küçülüp kaybolur
      const u = clamp((t - 44.6) / 7.6), uu = lerp(.66, .97, u);
      const [x, y] = patikaNokta(uu), s = Math.max(4, 14 + (y - 30) * .068), al = 1 - sm(51.2, 52.6, t);
      if (al > 0) { X.save(); X.globalAlpha = al; insanArka({ x, y, s, t, faz: adimFaz(uu * 140), yur: 1, pal: { ...ADAM, kaftan: '#4A5636', kaftanK: '#323C26', kusak: '#8A7046', sarik: '#C9CCD2', sarikK: '#9CA3AE' } }); X.restore(); }
      // kemer arkadan ay ışığı alır
      X.save(); X.filter = 'brightness(0.42) saturate(0.6) hue-rotate(-10deg)'; kemer(KEMER.x, KEMER.y, KEMER.s, t, 1, '#8E9AB4'); X.restore();
      X.save(); X.globalCompositeOperation = 'screen'; X.beginPath(); X.arc(KEMER.x, KEMER.y - 2.6 * KEMER.s, 1.1 * KEMER.s, Math.PI, 0); cizgi('#B9C8E6', 4, .35); X.restore();
      atesBocekleri(26, 13, t, -600, 380, 1200, 560);
    });
    katman(kam, 1.15, () => zeytinAgaci(480, 900, 340, t, 12, .25, { govde: '#1C2432', govdeK: '#121822', y1: '#1F2D3C', y2: '#2A3D52', y3: '#5A7494', yK: '#141C28' }));
    katman(kam, 1.3, () => { tepe(-1200, 1200, 1010, 40, 240, 131, '#0E1622'); cimen(-900, 900, 990, 80, 9, t, 133, '#1A2638', .95); atesBocekleri(10, 17, t, -500, 820, 1000, 160, .9); });
    // kapanış yazısı için gökyüzünde yumuşak koyulaşma
    const ky = sm(50.2, 51.4, t);
    if (ky > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = dGrad(0, 150, 0, 980, [[0, '#060C1C', .0], [.25, '#060C1C', .32 * ky], [.75, '#060C1C', .28 * ky], [1, '#060C1C', 0]]); X.fillRect(0, 0, W, H); X.restore(); }
  }
};

const SAHNELER = [S_MULK, S_ODA, S_COP, S_KONAK, S_KARUN, S_YOL, S_HOCA, S_SAHA, S_GECE];
const KAPANIS = [
  { m: 'Dünya imtihan sahasıdır', tur: 'k', t: 50.45 },
  { m: 'insanoğlu için.', tur: 'b', t: 50.95 },
  { m: 'Ama insan bilir ki,', tur: 'k', t: 51.9 },
  { m: 'o imtihan sahasında', tur: 'b', t: 52.4 },
  { m: 'durmayacaktır.', tur: 'b', t: 52.9 }
];
function ustKatman(t) {
  if (t < 5) girisBasligi(t, { ust: 'HİKMETLİ KARELER', baslik: 'İmtihan Sahası', y: 400, bitis: 4.6 });
  if (t < 51.2) altyazi(t, window.ZAMAN.satirlar);
  if (t > 50) kapanisYazisi(t, KAPANIS, 54.1, '@1dkdua', 250);
  // açılış ve bitiş kararması
  const k = Math.max(1 - clamp(t / .45), sm(56.15, 57.0, t));
  if (k > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = `rgba(6,8,14,${k})`; X.fillRect(0, 0, W, H); X.restore(); }
}
window.ciz = t => { X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none'; kareCiz(t, SAHNELER, ustKatman); };
