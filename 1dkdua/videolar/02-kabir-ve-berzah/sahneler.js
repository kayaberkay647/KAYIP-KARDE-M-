// 02 — Kabir ve Berzah · sahneler. Zamanlar SENARYO.md ve veri/zaman_cizelgesi.json ile eşleşir.
// Tasvir ilkesi: Peygamber Efendimiz, Hz. Ali ve Hz. Fâtıma binti Esed insan figürü olarak çizilmez (nur ile simgelenir).
'use strict';
const SURE = 128.5;
const kam3 = (keys, t, fn = ease) => { const [x, y, z] = kf(keys, t, fn); return { x, y, z }; };
const agizZarfi = t => { const z = window.ZAMAN.zarf, i = t * window.ZAMAN.zarfHz; const a = z[Math.floor(i)] || 0, b = z[Math.floor(i) + 1] || 0; return lerp(a, b, i % 1); };
const tepe1 = (t, c, w = .28) => Math.exp(-Math.pow((t - c) / w, 2)); // tek vuruşluk yumuşak darbe

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

// ───────── Kitaplıklı oda (Hoca'nın odası, gündüz) ─────────
function kitaplikOda(t) {
  X.fillStyle = dGrad(0, -1100, 0, 420, [[0, '#D9C29A'], [.6, '#E8D5B0'], [1, '#D7BF96']]); X.fillRect(-1400, -1100, 2800, 1530);
  // kitaplık
  X.fillStyle = rgb('#6B4429'); X.fillRect(-700, -720, 460, 860);
  const kr = ['#7A2E25', '#3E5A4A', '#C99A45', '#4A3A6A', '#8A5B37', '#2F4A6E', '#5C6B3A', '#9C6A3A'];
  for (let raf = 0; raf < 5; raf++) {
    const y0 = -700 + raf * 168; X.fillStyle = rgb('#4A2F1C'); X.fillRect(-690, y0 + 150, 440, 14);
    let x = -684; let i = raf * 7;
    while (x < -270) { const w = 18 + hash(i) * 16, h = 100 + hash(i + 50) * 44; X.fillStyle = rgb(kr[i % 8]); X.fillRect(x, y0 + 150 - h, w, h); X.fillStyle = rgb(P.altin, .7); X.fillRect(x, y0 + 150 - h + 14, w, 3); X.fillRect(x, y0 + 150 - 22, w, 3); x += w + 2; i++; }
  }
  // pencere (gün ışığı)
  const px = 330;
  X.fillStyle = rgb('#B79B74'); X.beginPath(); X.moveTo(px - 150, -60); X.lineTo(px - 150, -520); X.arc(px, -520, 150, Math.PI, 0); X.lineTo(px + 150, -60); X.closePath(); X.fill();
  X.beginPath(); X.moveTo(px - 128, -70); X.lineTo(px - 128, -520); X.arc(px, -520, 128, Math.PI, 0); X.lineTo(px + 128, -70); X.closePath(); X.fillStyle = dGrad(0, -650, 0, -70, [[0, '#FFF6DC'], [1, '#F7DDA8']]); X.fill();
  X.save(); X.clip(); X.strokeStyle = rgb('#7A5233', .85); X.lineWidth = 3.5; for (let k = -14; k < 15; k++) { X.beginPath(); X.moveTo(px - 130 + k * 22, -70); X.lineTo(px - 130 + k * 22 + 600, -680); X.moveTo(px + 130 - k * 22, -70); X.lineTo(px + 130 - k * 22 - 600, -680); X.stroke(); } X.restore();
  X.fillStyle = rgb('#8A5B37'); X.fillRect(px - 160, -64, 320, 18);
  // duvar saati ve levha (kaynaktaki odaya selam)
  daire(-80, -620, 46); doldur('#3A3230'); daire(-80, -620, 38); doldur('#F2EBDD'); X.beginPath(); X.moveTo(-80, -620); X.lineTo(-80, -648); X.moveTo(-80, -620); X.lineTo(-62, -612); cizgi('#2A2420', 4);
  X.fillStyle = rgb('#6B4429'); X.fillRect(40, -760, 120, 160); X.fillStyle = rgb('#E9DCC0'); X.fillRect(52, -748, 96, 136); X.strokeStyle = rgb('#7A5A3A', .7); X.lineWidth = 3; for (let i = 0; i < 4; i++) { X.beginPath(); X.moveTo(64, -720 + i * 30); X.quadraticCurveTo(100, -735 + i * 30, 136, -718 + i * 30); X.stroke(); }
  // zemin, halı, minder
  X.fillStyle = dGrad(0, 420, 0, 1200, [[0, '#9C6A42'], [1, '#6E4529']]); X.fillRect(-1400, 420, 2800, 800);
  X.fillStyle = rgb('#8E3B2C'); X.fillRect(-900, 520, 1800, 600); X.strokeStyle = rgb(P.altin, .7); X.lineWidth = 10; X.strokeRect(-870, 548, 1740, 540);
  for (let i = 0; i < 8; i++) { const cx = -700 + i * 200; cokgen([[cx, 700], [cx + 60, 780], [cx, 860], [cx - 60, 780]]); doldur(i % 2 ? '#4E5A28' : P.altin, .8); }
  isikHuzmesi(px, -320, px - 280, 900, 110, 280, '#FFE9B8', .26);
  tozZerre(40, 21, t, -400, -500, 900, 1300, '#FFF2CF', .45);
}
function acikKitap(x, y, w, aci = 0, sayfa = '#F2E3BF') {
  X.save(); X.translate(x, y); X.rotate(aci);
  cokgen([[-w * .52, -w * .02], [0, w * .06], [w * .52, -w * .02], [w * .5, w * .2], [0, w * .28], [-w * .5, w * .2]]); doldur('#1E1A18');
  for (const sx of [-1, 1]) { cokgen([[0, w * .05], [sx * w * .48, -w * .05], [sx * w * .47, w * .15], [0, w * .23]]); X.fillStyle = dGrad(0, 0, sx * w * .5, 0, [[0, koyu(sayfa, .12)], [1, sayfa]]); X.fill(); }
  X.strokeStyle = 'rgba(120,90,60,.45)'; X.lineWidth = w * .012; for (let i = 0; i < 5; i++) for (const sx of [-1, 1]) { X.beginPath(); X.moveTo(sx * w * .07, w * .05 + i * w * .03); X.lineTo(sx * w * .42, -w * .03 + i * w * .03); X.stroke(); }
  X.restore();
}
function ekmek(x, y, r) { elips(x, y, r * 1.3, r * .8); X.fillStyle = rGrad(x - r * .3, y - r * .3, 0, r * 1.3, [[0, '#F0C47A'], [1, '#B9773A']]); X.fill(); X.beginPath(); X.moveTo(x - r * .6, y - r * .2); X.quadraticCurveTo(x, y - r * .45, x + r * .6, y - r * .2); cizgi('#8A5428', r * .12, .6); }

// ───────── Ruh ışıkları ─────────
function ruhlar(n, seed, t, x0, y0, w, h, renk, al, yukari = 12, boy = 1) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const bx = x0 + r() * w, by = y0 + r() * h, p = r() * TAU, sp = (.4 + r()) * yukari, sz = (3 + r() * 6) * boy;
    const y = by - ((t * sp + r() * h) % h) * (yukari > 0 ? 1 : -1) * .35, x = bx + Math.sin(t * (.3 + r() * .4) + p) * 30;
    const pa = (.55 + .45 * Math.sin(t * (.8 + r()) + p)) * al;
    parilti(x, y, sz * 7, renk, .45 * pa); daire(x, y, sz * .6); X.fillStyle = rgb('#FFFBEE', .9 * pa); X.fill();
  }
}

// ───────── 1 · Mezarlıkta dua (0–6.3) ─────────
const S01 = {
  ad: 'Dua', bas: 0, son: 6.3, ciz(t) {
    const kam = kam3([[0, 0, 200, 1.0], [6.9, -50, 380, 1.3]], t, easeS);
    mezarlik(kam, t, 'ikindi', { odak: [90, 650], on: () => insanOturan({ x: -140, y: 668, s: 64, yon: 1, t, kolO: [.55 + sal(t, 1) * .02, 1.3], kolA: [.62, 1.25], egim: .1, tohum: 4 }) });
  }
};
// ───────── 2 · Hoca kitabından okur (6.3–9.6) ─────────
function hocaOkur(t, x, y, s, agiz, egim = .12) {
  return insanOturan({ x, y, s, yon: 1, t, pal: YASLI_HOCA, kolO: [.45, 1.8], kolA: [.4, 1.75], egim: egim + sal(t * 1.3, 2) * .012, agiz, tohum: 13, elde: k => acikKitap(k.el[0] - .1, k.el[1] - .05, 1.7, -.15) });
}
const S02 = {
  ad: 'Hoca', bas: 6.3, son: 9.6, ciz(t) {
    const kam = kam3([[5.8, -60, 330, 1.25], [10.1, -40, 320, 1.36]], t, easeS);
    katman(kam, 1, () => { kitaplikOda(t); hocaOkur(t, -60, 600, 86, agizZarfi(t)); });
  }
};
// ───────── 3 · Kur'an ve sadaka (9.6–13.5) ─────────
const S03 = {
  ad: 'Sadaka', bas: 9.6, son: 13.5, ciz(t) {
    const kam = kam3([[9.1, -10, 420, 1.28], [14.0, 10, 430, 1.36]], t, easeS);
    const ver = easeS((t - 11.85) / .6), aldi = t > 12.75;
    mezarlik(kam, t, 'ikindi', {
      odak: [30, 575], bosluk: 330, on: () => {
        insanOturan({ x: -140, y: 690, s: 66, yon: 1, t, kolO: [lerp(.6, 1.45, ver), lerp(.85, .15, ver)], kolA: [.55, .95], egim: lerp(.14, .02, ver), tohum: 4,
          oncesi: () => acikKitap(1.05, -.55, 1.6, -.08, '#F2E3BF'),
          elde: k => { if (!aldi && ver > .3) ekmek(k.el[0] + .1, k.el[1] - .05, .32); } });
        const al = easeS((t - 12.1) / .5);
        insanAyakta({ x: 130, y: 700, s: 60, yon: -1, t, pal: FAKIR, kolO: [lerp(.05, 1.15, al), lerp(.2, .4, al)], egim: .05, tohum: 9, elde: k => { if (aldi) ekmek(k.el[0] + .05, k.el[1] - .1, .32); } });
      }
    });
  }
};
// ───────── 4 · Bereketle azap kalkar (13.5–19.4) ─────────
function yuzeyArka(kam, t, sa) {
  const p = SAAT[sa]; gokyuzu(p.gok);
  if (sa === 'gece') { katman(kam, .02, () => yildizlar(200, 31, t, -700, -1300, 1400, 1100)); katman(kam, .05, () => ay(300, -700, 54, .9)); }
  else if (p.gunes) katman(kam, .05, () => gunes(p.gunes[0], -500, 50, p.gunes[2], p.gunes[3], .8));
  katman(kam, .3, () => { tepe(-1700, 1700, -60, 70, 320, 221, p.uzak); for (let i = 0; i < 12; i++) selvi(-800 + i * 150, -40, 110 + hash(i) * 60, t, i, p.selvi[0], p.selvi[1]); });
}
const S04 = {
  ad: 'Bereket', bas: 13.5, son: 19.4, ciz(t) {
    const kam = kam3([[13.0, 0, -300, 1.0], [16.1, 0, 330, 1.12], [19.9, 0, 350, 1.2]], t);
    const isik = easeS((t - 14.3) / 3.6) * .8, kar = 1 - easeS((t - 16.3) / 2.5);
    yuzeyArka(kam, t, 'ikindi');
    katman(kam, 1, () => {
      const o = { x: 0, y: 0, s: 1.1, t, karanlik: kar, isik, cicek: 0, tas: 'cicek', yuzeyCicek: isik };
      kabirToprak(o);
      // yukarıdan inen bereket ışığı
      if (t > 14.0) { const a = easeS((t - 14.0) / 1.2); for (const dx of [-120, 0, 120]) isikHuzmesi(dx * .6, -60, dx * .2, 380, 50, 120, '#FFE3A0', .22 * a); const r = rng(7); X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 50; i++) { const b = 14 + r() * 4, u = (t - b) / 1.6; if (u < 0 || u > 1) continue; const x = (r() - .5) * 360 * (1 - u * .6), y = -40 + u * 410; parilti(x, y, 16, '#FFE3A0', .7 * Math.sin(u * Math.PI)); } X.restore(); }
      kabirLahit({ ...o, lx: 0 }); kabirYuzey(o);
    });
  }
};
// ───────── 5 · Medine (19.4–24.2) ─────────
const S05 = {
  ad: 'Medine', bas: 19.4, son: 24.2, ciz(t) {
    const kam = kam3([[18.9, -20, 140, 1.0], [24.7, 50, 170, 1.1]], t, easeS);
    gokyuzu([[0, '#7C6E92'], [.3, '#C8908A'], [.48, '#F0B48A'], [.56, '#F7CB94'], [1, '#E9B07A']]);
    katman(kam, .04, () => gunes(-330, 160, 70, '#FFEBC0', '#FFC27E', 1));
    katman(kam, .1, () => { for (let i = 0; i < 4; i++) { elips(-500 + i * 330 + t * 9, -420 - i * 50, 280, 12); doldur('#F7D2B0', .4); } });
    katman(kam, .2, () => { tepe(-1600, 1600, 300, 120, 260, 231, mix('#9C7A86', '#F0B48A', .35)); });
    katman(kam, .35, () => { for (let i = 0; i < 26; i++) { const x = -1000 + i * 80, h = 50 + hash(i) * 40; X.fillStyle = rgb(mix('#B08A78', '#F0B48A', .2)); X.fillRect(x, 400 - h, 70, h + 200); } });
    katman(kam, 1, () => {
      X.fillStyle = dGrad(0, 520, 0, 1200, [[0, '#EDDCBC'], [1, '#C9AE86']]); X.fillRect(-1500, 515, 3000, 800);
      X.strokeStyle = 'rgba(160,130,90,.3)'; X.lineWidth = 2; for (let y = 540; y < 1200; y += 30 + (y - 540) * .12) { X.beginPath(); X.moveTo(-1500, y); X.lineTo(1500, y); X.stroke(); }
      mescidiNebevi(40, 520, .92, t, .9);
      for (let i = 0; i < 7; i++) kus(-500 + ((t - 19.4) * 70 + i * 90) % 1100, -380 + i * 30 + Math.sin(t * 1.4 + i) * 8, 8, t, i + 5, '#FFF8EE');
    });
    katman(kam, 1.15, () => { hurma(-460, 820, 600, t, 1); hurma(500, 840, 640, t, 2); hurma(-260, 800, 380, t, 3); });
    katman(kam, .04, () => parilti(-330, 160, 900, '#FFD7A0', .2));
  }
};
// ───────── 6 · Kabir "hoş geldin" eder, sıkar (24.2–29.9) ─────────
const S06 = {
  ad: 'Sıkar', bas: 24.2, son: 29.9, ciz(t) {
    const kam = kam3([[23.7, 0, -330, 1.0], [25.0, 0, -300, 1.02], [26.5, 0, 330, 1.14], [30.4, 0, 345, 1.2]], t);
    const isik = tepe1(t, 26.95, .55) * .45 + clamp((t - 26.5) / .5) * .12, sk = Math.min(1, tepe1(t, 27.85, .3) * .85 + tepe1(t, 29.0, .3) * .85 + clamp((t - 27.7) / .3) * .2);
    yuzeyArka(kam, t, 'aksam');
    katman(kam, 1, () => { const o = { x: 0, y: 0, s: 1.1, t, sikma: sk, isik, taslar: [[-620, 'fes'], [0, 'sarik'], [620, 'cicek']], tasRenk: SAAT.aksam.tas, cimRenk: '#5C603A' }; kabirToprak(o); kabirLahit({ ...o, lx: 0 }); kabirYuzey(o); });
  }
};
// ───────── 7 · İki kabir: azap / hoş geldin (29.9–37.65) ─────────
const S07 = {
  ad: 'İki kabir', bas: 29.9, son: 37.65, ciz(t) {
    const kam = kam3([[29.4, -310, 330, 1.26], [34.5, -300, 345, 1.3], [35.6, 300, 335, 1.28], [38.2, 320, 330, 1.33]], t);
    const skL = Math.min(1, tepe1(t, 31.35) + tepe1(t, 32.35) + tepe1(t, 33.6) + clamp((t - 31.0) / .4) * .3);
    const isR = .15 + easeS((t - 35.0) / 1.2) * .75, ckR = easeS((t - 35.6) / 1.6), skR = tepe1(t, 36.9, .35) * .5;
    yuzeyArka(kam, t, 'aksam');
    katman(kam, 1, () => {
      const o = { x: 0, y: 0, s: .9, t, karanlik: .25, bosluklar: [-340, 340], taslar: [[-340, 'fes'], [340, 'sarik']], tasRenk: SAAT.aksam.tas };
      kabirToprak(o);
      kabirLahit({ x: 0, y: 0, s: .9, t, lx: -340, karanlik: 1, sikma: skL });
      kabirLahit({ x: 0, y: 0, s: .9, t, lx: 340, isik: isR, cicek: ckR, sikma: skR });
      kabirYuzey(o);
    });
  }
};
// ───────── 8 · Müjde: birkaç kabir ışıldar (37.65–44.5) ─────────
const ISIKLI = [[-330, 610], [70, 650], [400, 600]];
const S08 = {
  ad: 'Müjde', bas: 37.65, son: 44.5, ciz(t) {
    const kam = kam3([[37.1, -90, 440, 1.08], [45.0, 60, 470, 1.18]], t, easeS);
    mezarlik(kam, t, 'gece', {
      tasTur: 'sade', tasOlcek: .5, bosluk: 0, ayX: -300, ayY: -460, on: () => {
        ISIKLI.forEach(([x, y], i) => {
          const a = easeS((t - 41.9 - i * .35) / 1.2);
          kabirYeri(x, y, 300, '#2A2E3A', 0, 300 + i, t); mezarTasi(x + 100, y - 14, 90, 'sade', 0, '#9AA2B4', 300 + i);
          if (a > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(x, y - 20, 340, '#FFD98A', .8 * a); X.restore(); nur(x, y - 280, 80, 560, .85 * a); }
        });
      }
    });
  }
};
// ───────── 9 · Fâtıma binti Esed'in kabri (44.5–50.3) ─────────
const S09 = {
  ad: 'Kabir', bas: 44.5, son: 50.3, ciz(t) {
    const kam = kam3([[44.0, 70, 470, 1.3], [50.8, 70, 540, 1.62]], t, easeS);
    const ck = easeS((t - 45.4) / 2.6), kubbe = easeS((t - 48.7) / 1.0);
    mezarlik(kam, t, 'gece', {
      tasTur: 'sade', tasOlcek: .5, bosluk: 0, ayX: -300, ayY: -460, on: () => {
        ISIKLI.forEach(([x, y], i) => { kabirYeri(x, y, 300, '#2A2E3A', i === 1 ? ck : 0, 300 + i, t); mezarTasi(x + 100, y - 14, 90, 'sade', 0, '#9AA2B4', 300 + i); X.save(); X.globalCompositeOperation = 'screen'; parilti(x, y - 20, 300, '#FFD98A', i === 1 ? .6 : .35); X.restore(); });
        const [x, y] = ISIKLI[1];
        if (kubbe > 0) { X.save(); X.globalCompositeOperation = 'screen'; X.beginPath(); X.arc(x, y + 10, 230 * (.85 + kubbe * .15), Math.PI, 0); X.closePath(); X.fillStyle = rGrad(x, y, 30, 240, [[0, '#FFE7B0', .0], [.75, '#FFE7B0', .18 * kubbe], [1, '#FFF3D0', .4 * kubbe]]); X.fill(); X.beginPath(); X.arc(x, y + 10, 230 * (.85 + kubbe * .15), Math.PI, 0); cizgi('#FFF0C8', 3, .5 * kubbe); X.restore(); }
        ruhlar(14, 5, t, x - 220, y - 300, 440, 300, '#FFE3A0', .5 * ck, 6, .7);
      }
    });
  }
};
// ───────── 10–11 · Kerpiç ev: anne şefkati, vefat (50.3–60.9) ─────────
function evSahnesi(kam, t, gece, pencere, besikT) {
  gokyuzu(gece ? [[0, '#0B1630'], [.45, '#18304F'], [.62, '#2C4A72'], [1, '#1A2C46']] : [[0, '#8A7090'], [.3, '#D99A84'], [.48, '#F4BC88'], [.58, '#F8D29A'], [1, '#E9B07A']]);
  if (gece) { katman(kam, .02, () => yildizlar(200, 51, t, -700, -1200, 1400, 1100)); katman(kam, .05, () => hilal(-320, -520, 40, .95)); }
  else katman(kam, .04, () => gunes(-330, 120, 64, '#FFEBC0', '#FFC27E', 1));
  const dag = (c, g) => mix(c, '#1A2638', g * .8);
  katman(kam, .15, () => { X.beginPath(); X.moveTo(-1700, 600); for (let x = -1700; x <= 1700; x += 60) X.lineTo(x, 180 - Math.abs(vnoise(x / 180, 241)) * 230 - vnoise(x / 60, 243) * 30); X.lineTo(1700, 600); X.closePath(); doldur(dag('#B48A74', gece)); });
  katman(kam, .3, () => { X.beginPath(); X.moveTo(-1700, 700); for (let x = -1700; x <= 1700; x += 50) X.lineTo(x, 330 - Math.abs(vnoise(x / 140, 245)) * 150); X.lineTo(1700, 700); X.closePath(); doldur(dag('#A07A62', gece)); });
  katman(kam, 1, () => {
    X.fillStyle = dGrad(0, 540, 0, 1200, [[0, dag('#E2C394', gece)], [1, dag('#C29A6A', gece)]]); X.fillRect(-1500, 540, 3000, 800);
    hurma(430, 560, 560, t, 7, gece ? '#1E2A2A' : '#5E6B34', gece ? '#2A2626' : '#8A6A48');
    kerpicEv(120, 565, 1.0, t, { isik: pencere, gece });
    hurma(-500, 600, 430, t, 8, gece ? '#1E2A2A' : '#5E6B34', gece ? '#2A2626' : '#8A6A48');
    // tandır ve duman
    X.beginPath(); X.moveTo(-400, 640); X.quadraticCurveTo(-400, 540, -330, 535); X.quadraticCurveTo(-260, 540, -260, 640); X.closePath(); X.fillStyle = dGrad(-400, 0, -260, 0, [[0, dag('#8E5634', gece)], [.5, dag('#C07A4A', gece)], [1, dag('#7A4628', gece)]]); X.fill();
    elips(-330, 590, 26, 18); doldur(gece ? '#1A1214' : '#3A2018');
    if (!gece) for (let i = 0; i < 9; i++) { const u = (t * .25 + i / 9) % 1; elips(-330 + Math.sin(u * 5 + i) * 18 + u * 40, 520 - u * 380, 18 + u * 50, 12 + u * 30); X.fillStyle = rgb('#E9DDD0', .18 * Math.sin(u * Math.PI)); X.fill(); }
    testi(-190, 660, 78, dag('#B9764A', gece)); testi(-130, 668, 56, dag('#A8683E', gece));
    besik(250, 712, .78, besikT, dag('#8A5A34', gece));
  });
  katman(kam, 1.3, () => { tepe(-1300, 1300, 1020, 30, 200, 251, dag('#B48A5E', gece)); });
}
const S10 = {
  ad: 'Ev', bas: 50.3, son: 57.0, ciz(t) { const kam = kam3([[49.8, 0, 300, 1.05], [57.5, 130, 430, 1.3]], t, easeS); evSahnesi(kam, t, 0, .55, t); }
};
const S11 = {
  ad: 'Vefat', bas: 57.0, son: 60.9, ciz(t) { const kam = kam3([[56.5, 70, 360, 1.16], [61.4, 90, 330, 1.24]], t, easeS); evSahnesi(kam, t, 1, 1 - easeS((t - 58.1) / 2.1), 57.0); }
};
// ───────── 12 · Gömlek kefen olur (60.9–64.75) ─────────
function gomlek(x, y, w, al, sal_ = 0) { // nurlu beyaz gömlek (ön görünüş)
  if (al <= 0) return; X.save(); X.globalAlpha *= al; X.translate(x, y); X.rotate(sal_);
  X.save(); X.globalCompositeOperation = 'screen'; parilti(0, w * .5, w * 1.4, '#FFE9B0', .55); X.restore();
  const p = [[-w * .14, 0], [-w * .58, w * .1], [-w * 1.0, w * .5], [-w * .82, w * .66], [-w * .46, w * .4], [-w * .5, w * 1.32], [w * .5, w * 1.32], [w * .46, w * .4], [w * .82, w * .66], [w * 1.0, w * .5], [w * .58, w * .1], [w * .14, 0]];
  cokgen(p); X.fillStyle = dGrad(0, 0, 0, w * 1.32, [[0, '#FFFFFF'], [1, '#EFE6D2']]); X.fill();
  X.strokeStyle = 'rgba(200,185,155,.8)'; X.lineWidth = w * .025; X.lineJoin = 'round'; X.stroke();
  X.beginPath(); X.moveTo(-w * .14, 0); X.lineTo(0, w * .2); X.lineTo(w * .14, 0); cizgi('#CDBF9E', w * .03);
  X.beginPath(); X.moveTo(0, w * .2); X.lineTo(0, w * .6); cizgi('#D9CDB2', w * .02, .8);
  for (const k of [-1, 1]) { X.beginPath(); X.moveTo(k * w * .46, w * .42); X.quadraticCurveTo(k * w * .3, w * .9, k * w * .4, w * 1.3); cizgi('#E2D6BE', w * .02, .7); }
  X.restore();
}
const S12 = {
  ad: 'Gömlek', bas: 60.9, son: 64.75, ciz(t) {
    const kam = kam3([[60.4, 0, 400, 1.2], [65.3, 0, 470, 1.36]], t, easeS);
    const in_ = easeS((t - 61.3) / 2.3), yer = easeS((t - 63.1) / .6), nurA = easeS((t - 62.9) / 1.4);
    katman(kam, 1, () => {
      X.fillStyle = dGrad(0, -1100, 0, 560, [[0, '#1E1816'], [.6, '#3A2E26'], [1, '#4A3A2E']]); X.fillRect(-1400, -1100, 2800, 1660);
      // yüksek pencere (ay ışığı) ve nişte kandil
      X.fillStyle = rgb('#1A2440'); X.beginPath(); X.roundRect(160, -560, 150, 190, [75, 75, 0, 0]); X.fill(); ay(235, -470, 26, .6);
      isikHuzmesi(235, -400, 60, 620, 60, 200, '#8FA8D0', .15);
      X.fillStyle = rgb('#2A201C'); X.beginPath(); X.roundRect(-430, -360, 140, 170, [70, 70, 0, 0]); X.fill();
      X.beginPath(); X.ellipse(-360, -205, 34, 12, 0, 0, TAU); doldur('#8E5634'); X.beginPath(); X.moveTo(-360, -212); X.quadraticCurveTo(-352 + sal(t * 2.2, 1) * 2, -232, -360, -250); X.quadraticCurveTo(-368, -232, -360, -212); doldur('#FFE7A8');
      X.save(); X.globalCompositeOperation = 'screen'; parilti(-360, -230, 380, '#FFB860', .35); X.restore();
      X.fillStyle = dGrad(0, 560, 0, 1200, [[0, '#5A4434'], [1, '#2E241C']]); X.fillRect(-1400, 560, 2800, 700);
      // hasır
      X.fillStyle = rgb('#B9955E'); X.fillRect(-340, 560, 680, 160); X.strokeStyle = 'rgba(110,80,40,.5)'; X.lineWidth = 3; for (let k = 0; k < 24; k++) { X.beginPath(); X.moveTo(-340 + k * 29, 560); X.lineTo(-340 + k * 29, 720); X.stroke(); }
      kefen(0, 600, 460, 86, nurA * .6);
      // örtülen gömlek (kefen üstünde)
      if (yer > 0) { X.save(); X.globalAlpha = yer; X.beginPath(); X.moveTo(-170, 570); X.quadraticCurveTo(0, 540, 170, 570); X.lineTo(200, 640); X.quadraticCurveTo(0, 660, -200, 640); X.closePath(); X.fillStyle = dGrad(0, 540, 0, 660, [[0, '#FFFFFF'], [1, '#F2E8D2']]); X.fill(); X.restore(); }
      gomlek(0, lerp(-420, 470, in_), 110, (t > 61.2 ? 1 : 0) * (1 - yer), sal(t, 3) * .04 * (1 - in_));
      if (nurA > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(0, 590, 520, '#FFE3A0', .45 * nurA); X.restore(); tozZerre(24, 41, t, -260, 380, 520, 260, '#FFF3CF', .7 * nurA); }
    });
  }
};
// ───────── 13 · Nur kabre iner ve uzanır (64.75–68.75) ─────────
const S13 = {
  ad: 'Nur', bas: 64.75, son: 68.75, ciz(t) {
    const kam = kam3([[64.25, 0, -120, 1.0], [66.2, 0, 270, 1.12], [69.2, 0, 300, 1.2]], t);
    const in_ = easeS((t - 64.9) / 1.3), yat = easeS((t - 66.15) / .8);
    yuzeyArka(kam, t, 'gece');
    katman(kam, 1, () => {
      const o = { x: 0, y: 0, s: 1.1, t, kefen: false, isik: yat * .55, karanlik: 0, toprakRenk: '#5A4A40', toprakRenk2: '#40342C', tas: 'sade', tasRenk: '#9AA2B4', cimRenk: '#2E3A30' };
      kabirToprak(o); kabirLahit({ ...o, lx: 0 }); kabirYuzey(o);
      const y = lerp(-600, KABIR.D * 1.1, in_) * 1;
      nur(0, y, 90, 520 * (1 - yat * .2), (t > 64.85 ? 1 : 0) * (.8 + .1 * Math.sin(t * 2)), yat);
    });
  }
};
// ───────── 14 · Dua: kabirden göğe ışık (68.75–72.4) ─────────
const S14 = {
  ad: 'Dua ışığı', bas: 68.75, son: 72.4, ciz(t) {
    const kam = kam3([[68.25, 30, 420, 1.15], [72.9, 30, -60, 1.0]], t);
    const a = easeS((t - 69.0) / 1.2);
    mezarlik(kam, t, 'gece', {
      tasTur: 'sade', tasOlcek: .5, bosluk: 0, ayX: -300, ayY: -460, odak: [60, 640], odakTas: 'sade', odakTasBoy: 100, odakIsik: .6 * a, on: () => {
        X.save(); X.globalCompositeOperation = 'screen';
        X.fillStyle = dGrad(0, 640, 0, -1300, [[0, '#FFE3A0', .5 * a], [.6, '#FFE3A0', .18 * a], [1, '#FFE3A0', 0]]); X.beginPath(); X.moveTo(-10, 640); X.lineTo(-90, -1300); X.lineTo(170, -1300); X.lineTo(110, 640); X.closePath(); X.fill();
        const r = rng(71); for (let i = 0; i < 70; i++) { const b = 69 + r() * 3.4, u = (t - b) / 2.2; if (u < 0 || u > 1) continue; const x = 50 + (r() - .5) * 160 * (1 - u * .3), y = 620 - u * 1700; parilti(x, y, 14, '#FFF0C8', .8 * Math.sin(u * Math.PI)); }
        X.restore();
      }
    });
  }
};
// ───────── 15 · Rahmet (72.4–77.25) ─────────
const S15 = {
  ad: 'Rahmet', bas: 72.4, son: 77.25, ciz(t) {
    const kam = kam3([[71.9, 30, -300, 1.0], [75.4, 40, 440, 1.2], [77.8, 40, 460, 1.24]], t);
    const g = easeS((t - 75.0) / 1.0);
    mezarlik(kam, t, 'gece', {
      tasTur: 'sade', tasOlcek: .5, bosluk: 0, ayX: -300, ayY: -460, odak: [60, 640], odakTas: 'sade', odakTasBoy: 100, odakIsik: .25 + .6 * g, yuzeyCicek: g,
      on: () => { const r = rng(81); X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 160; i++) { const b = 72.0 + r() * 5.5, u = (t - b) / 3.0; if (u < 0 || u > 1) continue; const x = (r() - .5) * 1500 + Math.sin(u * 4 + i) * 20, y = -1200 + u * 1900; parilti(x, y, 10, '#FFF0C8', .7 * Math.sin(u * Math.PI)); daire(x, y, 1.6); X.fillStyle = 'rgba(255,250,235,.9)'; X.fill(); } X.restore(); }
    });
  }
};
// ───────── 16 · Şafak: huzurlu kabir (77.25–81.7) ─────────
const S16 = {
  ad: 'Şafak', bas: 77.25, son: 81.7, ciz(t) {
    const kam = kam3([[76.75, 40, 470, 1.26], [82.2, 0, 210, 1.0]], t, easeS);
    mezarlik(kam, t, 'safak', { tasTur: 'sade', tasOlcek: .5, odak: [60, 640], odakTas: 'sade', odakTasBoy: 100, odakIsik: .35, yuzeyCicek: 1, on: () => { for (let i = 0; i < 5; i++) kus(-600 + (t - 77) * 80 + i * 60, -480 + i * 26 + Math.sin(t * 1.3 + i) * 6, 8 - i * .5, t, i + 2); } });
    katman(kam, .04, () => { for (let i = 0; i < 6; i++) isikHuzmesi(260, 40, 260 + Math.cos(-2.4 + i * .35) * 1600, 40 + Math.sin(-2.4 + i * .35) * 1600, 10, 120, '#FFE6B8', .1); });
  }
};
// ───────── 17 · Soru: Adam Hoca'ya sorar (81.7–89.25) ─────────
const S17 = {
  ad: 'Soru', bas: 81.7, son: 89.25, ciz(t) {
    const kam = kam3([[81.2, 0, 330, 1.1], [89.75, 10, 345, 1.24]], t, easeS);
    katman(kam, 1, () => {
      kitaplikOda(t);
      const kon = t > 81.9 && t < 88.95 ? agizZarfi(t) : 0;
      insanOturan({ x: -250, y: 620, s: 80, yon: 1, t, pal: YASLI_HOCA, kolO: kf([[81, .5, 1.6], [88.6, .5, 1.6], [89.4, .95, 1.4]], t), kolA: [.42, 1.65], egim: .03 + tepe1(t, 84.2, .4) * .05 + tepe1(t, 86.9, .4) * .05, tohum: 13, elde: k => acikKitap(k.el[0] - .2, k.el[1] + .05, 1.6, -.1) });
      insanOturan({ x: 270, y: 630, s: 76, yon: -1, t, pal: ADAM, agiz: kon, kolO: kf([[81.6, .35, -.3], [82.3, .9, 1.4], [85.2, .95, 1.3], [86.7, 1.15, .7], [88.4, 1.0, 1.1], [89.2, .4, -.2]], t), kolA: [.3, -.4], egim: -.02, tohum: 4 });
    });
  }
};
// ───────── 18 · Kabir: bahçe ya da çukur (89.25–96.6) ─────────
const S18 = {
  ad: 'İki kapı', bas: 89.25, son: 96.6, ciz(t) {
    const kam = kam3([[88.75, 0, 320, 1.26], [95.4, 0, 335, 1.34], [96.4, 0, -150, 1.05], [97.1, 0, -180, 1.0]], t);
    const a = easeO((t - 89.95) / .7) * (1 - easeS((t - 95.45) / .6)), karis = easeS((t - 93.1) / .6);
    yuzeyArka(kam, t, 'ikindi');
    katman(kam, 1, () => { const o = { x: 0, y: 0, s: 1.1, t, isik: .3 * (1 - karis) * a, karanlik: .35 * karis * a, portal: { tur: 'bahce', a, karis }, tas: 'sarik' }; kabirToprak(o); kabirLahit({ ...o, lx: 0 }); kabirYuzey(o); });
  }
};
// ───────── 19 · Cennet bahçesi (96.6–101.3) ─────────
function cennet(kam, t, adam) {
  gokyuzu([[0, '#FFF4D8'], [.35, '#FBE6B0'], [.55, '#EEE8BC'], [1, '#BFDCB0']]);
  katman(kam, .03, () => { X.save(); X.globalCompositeOperation = 'screen'; parilti(0, -380, 1000, '#FFFFFF', .55); parilti(0, -380, 300, '#FFF6D8', .8); X.restore(); });
  katman(kam, .12, () => {
    tepe(-1700, 1700, 120, 80, 360, 301, '#B9D8C0');
    for (const [x, y, s] of [[-420, 60, 1], [-120, 30, .8], [260, 50, 1.1], [520, 80, .7]]) { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = 'rgba(255,248,230,.95)'; X.fillRect(-60, -80, 120, 80); X.beginPath(); X.arc(0, -80, 52, Math.PI, 0); X.fillStyle = '#F6DFA8'; X.fill(); X.fillStyle = rgb(P.altin); X.fillRect(-2, -150, 4, 22); for (let k = 0; k < 3; k++) { X.fillStyle = 'rgba(214,170,90,.8)'; X.beginPath(); X.roundRect(-44 + k * 32, -60, 20, 46, [10, 10, 0, 0]); X.fill(); } X.restore(); X.save(); X.globalCompositeOperation = 'screen'; parilti(x, y - 60 * s, 160 * s, '#FFE7B0', .4); X.restore(); }
  });
  katman(kam, .3, () => { tepe(-1700, 1700, 260, 50, 300, 303, '#9CCB8E'); for (let i = 0; i < 14; i++) { const x = -1000 + i * 150; zeytinAgaci(x, tepeY(x, 260, 50, 300, 303) + 10, 70 + hash(i) * 30, t, 310 + i, 1, { govde: '#8A6A48', govdeK: '#6A5038', y1: '#6FB27A', y2: '#8DCB86', y3: '#CFEBB0', yK: '#4E8E5E' }); } });
  katman(kam, 1, () => {
    X.fillStyle = dGrad(0, 330, 0, 1200, [[0, '#A9D69A'], [1, '#6FA868']]); X.fillRect(-1500, 330, 3000, 900);
    // ırmak
    const nok = u => [Math.sin(u * 3.2) * 200 * u + 40 * (1 - u), 340 + u * u * 700];
    const sol = [], sag = [];
    for (let i = 0; i <= 40; i++) { const u = i / 40, [x, y] = nok(u), w = 10 + u * 260; sol.push([x - w, y]); sag.push([x + w, y]); }
    X.beginPath(); X.moveTo(sol[0][0], sol[0][1]); for (const p of sol) X.lineTo(p[0], p[1]); for (const p of [...sag].reverse()) X.lineTo(p[0], p[1]); X.closePath(); X.fillStyle = dGrad(0, 340, 0, 1050, [[0, '#E9F6F2'], [1, '#9FD6E4']]); X.fill();
    X.strokeStyle = 'rgba(255,255,255,.75)'; X.lineWidth = 3; for (let i = 0; i < 26; i++) { const u = ((i / 26) + t * .08) % 1, [x, y] = nok(u), w = (10 + u * 260) * .7, k = (hash(i) - .5) * 2 * w; X.beginPath(); X.moveTo(x + k - 20 * u, y); X.lineTo(x + k + 30 * u, y); X.stroke(); }
    // meyveli ağaçlar
    for (const [x, y, s, sd] of [[-460, 620, 230, 321], [480, 650, 250, 322], [-330, 470, 140, 323], [330, 480, 150, 324]]) { zeytinAgaci(x, y, s, t, sd, 1, { govde: '#8A6A48', govdeK: '#6A5038', y1: '#5FA36A', y2: '#7DB86E', y3: '#D6F0B0', yK: '#3E7E50' }); const r = rng(sd); for (let i = 0; i < 18; i++) { const a = r() * TAU, d = r(); daire(x + Math.cos(a) * s * .8 * d, y - s * 1.6 + Math.sin(a) * s * .4 * d, s * .045); doldur(r() < .5 ? '#F2B84A' : '#E8574A'); } }
    const r = rng(331); for (let i = 0; i < 120; i++) { const y = 480 + Math.pow(r(), .7) * 560, x = (r() - .5) * 1800, s = (y - 300) / 700; if (Math.abs(x - nok((y - 340) / 700)[0]) < 60 + s * 250) continue; for (let k = 0; k < 5; k++) { const a = k / 5 * TAU; daire(x + Math.cos(a) * 5 * s, y + Math.sin(a) * 5 * s, 4 * s); doldur(['#FFF6EA', '#F2C4C0', '#F7DC8A', '#D9C4F0'][i % 4]); } daire(x, y, 2.6 * s); doldur('#E9B949'); }
    if (adam) adam();
    ruhlar(30, 333, t, -600, -400, 1200, 900, '#FFF2C8', .5, 6, .6);
  });
  katman(kam, 1.25, () => { tepe(-1300, 1300, 1020, 30, 200, 335, '#5E9A5E'); cimen(-1000, 1000, 1000, 70, 10, t, 337, '#4E8A50', .95); });
}
const S19 = {
  ad: 'Cennet', bas: 96.6, son: 101.3, ciz(t) {
    const kam = kam3([[96.1, 0, 120, 1.0], [101.8, 0, 160, 1.14]], t, easeS);
    cennet(kam, t, () => { const u = clamp((t - 99.75) / 2.4); if (u <= 0) return; const y = lerp(1000, 610, u), s = lerp(70, 44, u); insanArka({ x: lerp(-330, -250, u), y, s, t, faz: adimFaz(u * 3.6), yur: 1 }); });
  }
};
// ───────── 20 · Cehennem çukuru (101.3–105.6) ─────────
function ucurum(kam, t, ruhAl = 0) {
  gokyuzu([[0, '#140808'], [.4, '#2E0E0A'], [.62, '#5A1E10'], [1, '#2A0C08']]);
  const kenar = (y, sd) => Math.abs(vnoise(y / 210, sd)) * 200 + vnoise(y / 55, sd + 1) * 34 + vnoise(y / 17, sd + 2) * 9;
  katman(kam, .15, () => { X.beginPath(); X.moveTo(-1700, 800); for (let x = -1700; x <= 1700; x += 16) X.lineTo(x, 140 - Math.abs(vnoise(x / 260, 401)) * 220 - vnoise(x / 70, 402) * 30 - vnoise(x / 20, 403) * 8); X.lineTo(1700, 800); X.closePath(); doldur('#241210'); X.save(); X.clip(); X.strokeStyle = 'rgba(255,110,40,.3)'; X.lineWidth = 6; X.stroke(); X.restore(); });
  katman(kam, .5, () => {
    X.save(); X.globalCompositeOperation = 'screen'; parilti(0, 760, 1200, '#FF6A22', .85); parilti(0, 820, 520, '#FFB060', .75); parilti(0, 860, 200, '#FFE0A0', .6); X.restore();
    // yumuşak duman bulutları
    for (let i = 0; i < 16; i++) { const u = (t * .05 + i / 16) % 1, x = Math.sin(i * 1.7 + t * .15) * 300 + (hash(i) - .5) * 260, y = 860 - u * 1400, r = 150 + u * 260; X.fillStyle = rGrad(x, y, 0, r, [[0, '#120806', .32 * Math.sin(u * Math.PI)], [1, '#120806', 0]]); X.fillRect(x - r, y - r, 2 * r, 2 * r); }
    const r = rng(411); X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 110; i++) { const sp = 60 + r() * 120, ph = r() * 20, u = ((t + ph) * sp / 1600) % 1; const x = (r() - .5) * 900 + Math.sin(t * 2 + i) * 20, y = 950 - u * 1600; daire(x, y, 1.4 + r() * 2.6); X.fillStyle = rgb('#FFB060', .9 * Math.sin(u * Math.PI)); X.fill(); } X.restore();
    if (ruhAl > 0) ruhlar(26, 421, t, -500, 100, 1000, 700, '#C96A48', ruhAl, -4, .7);
  });
  katman(kam, 1.1, () => {
    for (const sx of [-1, 1]) {
      const sd = sx > 0 ? 431 : 433;
      X.beginPath(); X.moveTo(sx * 1700, -1300); X.lineTo(sx * 380, -1300);
      for (let y = -1300; y <= 1400; y += 12) X.lineTo(sx * (340 + kenar(y, sd) + (y > 600 ? (y - 600) * .22 : 0)), y);
      X.lineTo(sx * 1700, 1400); X.closePath();
      X.fillStyle = dGrad(sx * 330, 0, sx * 900, 0, [[0, '#4A2014'], [.12, '#24120E'], [1, '#0E0808']]); X.fill();
      X.save(); X.clip();
      X.strokeStyle = 'rgba(255,130,60,.75)'; X.lineWidth = 14; X.stroke(); X.strokeStyle = 'rgba(255,210,140,.55)'; X.lineWidth = 3; X.stroke();
      X.strokeStyle = 'rgba(90,40,24,.6)'; X.lineWidth = 3; for (let k = 0; k < 12; k++) { const y0 = -1100 + k * 210; X.beginPath(); X.moveTo(sx * 1700, y0 + 60); X.quadraticCurveTo(sx * 900, y0 + vnoise(k, 7) * 60, sx * 360, y0); X.stroke(); }
      X.restore();
    }
  });
}
const S20 = { ad: 'Çukur', bas: 101.3, son: 105.6, ciz(t) { const kam = kam3([[100.8, 0, 60, 1.0], [106.1, 0, 220, 1.14]], t, easeS); ucurum(kam, t); } };
// ───────── 21 · Berzah âlemi (105.6–112.4) ─────────
function berzah(kam, t, halka) {
  gokyuzu([[0, '#1C1E3E'], [.4, '#3A3266'], [.65, '#6E5A8A'], [1, '#9A7A9A']]);
  katman(kam, .03, () => yildizlar(90, 501, t, -700, -1200, 1400, 900, .6));
  katman(kam, .1, () => { X.save(); X.globalCompositeOperation = 'screen'; parilti(0, 200, 1100, '#C9A8D8', .35); X.restore(); });
  katman(kam, .2, () => { sis(-200, 90, t, 10, .35, '#B9A2C8', 1); sis(80, 110, t, -8, .3, '#C9B2D2', 2); });
  katman(kam, .5, () => { ruhlar(60, 503, t, -900, -700, 1800, 1400, '#E6DDF6', .7, 8, .8); sis(380, 140, t, 14, .4, '#D8C6E0', 3); });
  katman(kam, 1, () => {
    ruhlar(34, 505, t, -700, -500, 1400, 1300, '#FFF0D8', .9, 6, 1.2);
    if (halka > 0) { const r = rng(507); X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 9; i++) { const x = (r() - .5) * 1100, y = -500 + r() * 1100, rr = 60 + r() * 70; X.beginPath(); X.arc(x, y, rr * (.8 + halka * .2), 0, TAU); cizgi('#FFF0D0', 3, .5 * halka); parilti(x, y, rr * 1.3, '#E9DDF6', .25 * halka); } X.restore(); }
    sis(700, 160, t, 20, .45, '#E0D0E6', 4);
  });
}
const S21 = { ad: 'Berzah', bas: 105.6, son: 112.4, ciz(t) { const kam = kam3([[105.1, 0, 40, 1.0], [112.9, 0, -40, 1.08]], t, easeS); berzah(kam, t, easeS((t - 110.9) / .9)); } };
// ───────── 22 · Müminlerin ruhları (112.4–117.35) ─────────
const S22 = {
  ad: 'Müminler', bas: 112.4, son: 117.35, ciz(t) {
    const kam = kam3([[111.9, 0, 140, 1.0], [117.85, 0, 60, 1.1]], t, easeS);
    cennet(kam, t, null);
    katman(kam, .6, () => { X.save(); X.globalCompositeOperation = 'screen'; X.fillStyle = 'rgba(255,240,210,.18)'; X.fillRect(-1500, -1500, 3000, 3000); X.restore(); ruhlar(50, 601, t, -700, -300, 1400, 1300, '#FFF0C0', .95, 18, 1.1); });
  }
};
// ───────── 23 · Kâfirlerin ruhları (117.35–121.0) ─────────
const S23 = { ad: 'Kâfirler', bas: 117.35, son: 121.0, ciz(t) { const kam = kam3([[116.85, 0, 100, 1.04], [121.5, 0, 200, 1.14]], t, easeS); ucurum(kam, t, .8); } };
// ───────── 24 · Kapanış: dolunaylı gece mezarlığı (121.0–128.5) ─────────
const S24 = {
  ad: 'Kapanış', bas: 121.0, son: SURE, ciz(t) {
    const kam = kam3([[120.5, 0, 160, 1.08], [128.5, 0, 60, 1.0]], t, easeS);
    mezarlik(kam, t, 'gece', {
      tasTur: null, bosluk: 0, ayX: 280, ayY: 60, onPlan: () => { atesBocekleri(14, 611, t, -600, 820, 1200, 180, .9); },
      on: () => { atesBocekleri(26, 613, t, -700, 380, 1400, 360); sis(470, 40, t, 10, .2, '#9DB3D6', 7); }
    });
    katman(kam, 1.15, () => { selvi(-470, 900, 760, t, 3, '#0C141E', '#16222E'); selvi(-330, 920, 520, t, 4, '#0C141E', '#16222E'); selvi(500, 930, 680, t, 5, '#0C141E', '#16222E'); });
    const ky = sm(120.8, 122.0, t);
    if (ky > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = dGrad(0, 120, 0, 1000, [[0, '#060C1C', 0], [.25, '#060C1C', .34 * ky], [.75, '#060C1C', .3 * ky], [1, '#060C1C', 0]]); X.fillRect(0, 0, W, H); X.restore(); }
  }
};

const SAHNELER = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S20, S21, S22, S23, S24];
const KAPANIS = [
  { m: 'Kabir ya', tur: 'k', t: 121.3 },
  { m: 'cennet bahçesinden', tur: 'b', t: 121.8 },
  { m: 'bir bahçedir,', tur: 'b', t: 122.25 },
  { m: 'veya', tur: 'k', t: 123.1 },
  { m: 'cehennem çukurundan', tur: 'b', t: 123.6 },
  { m: 'bir çukurdur.', tur: 'b', t: 124.05 }
];
function ustKatman(t) {
  if (t < 5) girisBasligi(t, { ust: 'HİKMETLİ KARELER', baslik: 'Kabir ve Berzah', y: 400, bitis: 4.6 });
  if (t < 121.6) altyazi(t, window.ZAMAN.satirlar);
  if (t > 121) kapanisYazisi(t, KAPANIS, 125.2, '@1dkdua', 210);
  const k = Math.max(1 - clamp(t / .45), sm(127.65, 128.5, t));
  if (k > 0) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = `rgba(6,8,14,${k})`; X.fillRect(0, 0, W, H); X.restore(); }
}
window.ciz = t => { X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none'; kareCiz(t, SAHNELER, ustKatman); };
