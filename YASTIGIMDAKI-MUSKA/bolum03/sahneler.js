// YASTIĞIMDAKİ MUSKA — 3. Bölüm: "Kırk Düğüm" çekimleri
'use strict';

const yrep = id => ZAMAN.replikler.find(r => r.id === id);
const sonra = id => { const r = yrep(id); return r ? (window._sonT ?? 0) - r.t1 : -1; };

// ───────────── bölüme özel yardımcılar ─────────────
function banyoZemin(g) { g.fillStyle = '#b9c4c4'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); g.globalAlpha = .6; for (let y = -PAY; y < H + PAY; y += 130) { g.beginPath(); g.moveTo(-PAY, y); g.lineTo(W + PAY, y); cizgi(g, 4, '#9aa6a6'); } for (let x = -PAY; x < W + PAY; x += 130) { g.beginPath(); g.moveTo(x, -PAY); g.lineTo(x, H + PAY); cizgi(g, 4, '#9aa6a6'); } g.globalAlpha = 1; }
function tahtaZemin(g) {
  g.fillStyle = '#7a5236'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
  for (let y = -PAY, i = 0; y < H + PAY; y += 150, i++) {
    g.fillStyle = i % 2 ? '#86593b' : '#7a5236'; g.fillRect(-PAY, y, W + PAY * 2, 150);
    g.beginPath(); g.moveTo(-PAY, y); g.lineTo(W + PAY, y); cizgi(g, 6, '#3a2416');
    for (let x = -PAY + (i % 3) * 260; x < W + PAY; x += 780) { g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 150); cizgi(g, 5, '#3a2416'); }
    g.globalAlpha = .25; for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(-PAY, y + 40 + k * 35); g.bezierCurveTo(300, y + 30 + k * 35, 700, y + 60 + k * 35, W + PAY, y + 45 + k * 35); cizgi(g, 3, '#4a2e1c'); } g.globalAlpha = 1;
  }
}
function antreGece(g) { antreDuvar(g); antreKapi(g, 0); }
function emreSirti(g, x, y, s) { // arkası dönük Emre (omuzlar + ense)
  g.save(); g.translate(x, y); g.scale(s, s);
  govdeYolu(g, 124, 104, 118, 460); dol(g, EMRE.kolRenk); cizgi(g);
  g.save(); govdeYolu(g, 124, 104, 118, 460); g.clip(); g.globalAlpha = .3; el(g, 60, 300, 70, 230); dol(g, '#55613f'); g.restore();
  g.beginPath(); g.moveTo(-40, 128); g.quadraticCurveTo(0, 150, 40, 128); cizgi(g, 3, '#58643f');
  g.restore();
  emreArkaKafa(g, x, y, s);
}
function nazliSessiz(lt, a, b) { return lt > a && lt < b ? Math.abs(Math.sin(lt * 7.5)) * .75 : 0; }
function baslikKarti3(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .8)), cik = aralik(lt, d - .4, d);
  g.save(); g.globalAlpha = .9 * gir; dugumluIp(g, 80, 1000, 1050, 9, { t: T, cozulmus: [0], cozulen: 1, cozulme: ease(aralik(lt, .4, 2.6)) * .6 }); g.restore();
  g.save(); g.globalAlpha = gir * (1 - cik) * (.92 + .08 * Math.sin(lt * 37) * (lt < 1 ? 1 : 0));
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 88px "Lora"'; g.fillStyle = '#efe2cc'; g.letterSpacing = '6px'; g.fillText('YASTIĞIMDAKİ', W / 2, 790);
  g.font = '700 190px "Lora"'; g.lineWidth = 10; g.strokeStyle = '#1a0507'; g.strokeText('MUSKA', W / 2, 940); g.fillStyle = '#c0262f'; g.fillText('MUSKA', W / 2, 940);
  g.letterSpacing = '10px'; g.font = '700 40px "Lora"'; g.fillStyle = '#c9a98a'; g.fillText('3. BÖLÜM', W / 2, 1150);
  g.letterSpacing = '0px'; g.font = 'italic 600 62px "Lora"'; g.fillStyle = '#efe2cc'; g.fillText('Kırk Düğüm', W / 2, 1240);
  g.restore();
}
function soruKarti3(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .6));
  g.save(); g.globalAlpha = gir;
  karakter(g, NAZLI, { x: W / 2, y: 650, s: 1.75, t: T, T, konus: 0, gozAcik: .95, kirpma: false, bebek: .7, kas: 'uzgun', gulum: 0, yas: .8, yasDamla: .5, solgun: true, morluk: .5, kiyafet: 'pijama',
    enUst: g => { g.beginPath(); g.moveTo(-28, 86); g.lineTo(28, 86); cizgi(g, 3.5, '#b01f28'); for (const x of [-21, -7, 7, 21]) { g.beginPath(); g.moveTo(x - 3, 76); g.lineTo(x + 3, 96); cizgi(g, 3.5, '#b01f28'); } } });
  g.fillStyle = dg(g, 0, 900, 0, 1150, [[0, 'rgba(5,2,3,0)'], [1, 'rgba(5,2,3,.95)']]); g.fillRect(0, 900, W, 1020);
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 74px "Lora"'; g.lineWidth = 12; g.strokeStyle = '#1a0507'; g.lineJoin = 'round';
  for (const [s, y] of [['Sizce Nazlı', 1200], ['sesini geri', 1295], ['alabilecek mi?', 1390]]) { g.strokeText(s, W / 2, y); g.fillStyle = '#f5ead8'; g.fillText(s, W / 2, y); }
  g.font = 'italic 600 46px "Lora"'; g.fillStyle = '#d9b9a0'; g.fillText('Cevabını yorumlara yaz', W / 2, 1520);
  const oy = 1610 + Math.sin(lt * 5) * 14; g.beginPath(); g.moveTo(W / 2 - 34, oy); g.lineTo(W / 2, oy + 40); g.lineTo(W / 2 + 34, oy); cizgi(g, 10, '#c0262f');
  g.font = '700 38px "Lora"'; g.letterSpacing = '4px'; g.fillStyle = '#8a6a60'; g.fillText('SONRAKİ BÖLÜM: MEZARLIK SOKAĞI', W / 2, 1760);
  g.restore();
}

// ───────────── ÇEKİMLER ─────────────
const CEKIM = {
  // ═════ SAHNE 1 · GECE 03:00 ═════
  A1: { renk: ['gece', 'korku', .3], vinyet: .7, giris: .12, kam: KAM(620, 1150, 1.0, 1.18),
    ciz(g, lt, d, T) { banyoKapi(g, .75 + Math.sin(lt * 9) * .03 * (lt < 1.2 ? 1 : 0), T, 1); karanlik(g, 620, 1300, 400, 1400, .55, T); } },
  A2: { renk: ['gece', 'korku', .3], vinyet: .7, kam: (lt, d) => ({ x: 540 + gurultu(lt * 30, 3) * 3, y: 790, z: lerp(1.04, 1.12, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'banyo', banyoArka, { olcek: 1.4, merkez: [540, 800], blur: 3 });
      N(g, T, { x: 540 + gurultu(T * 20, 1) * 3, y: 790, s: 2.05, kiyafet: 'pijama', solgun: true, morluk: .6, kas: 'saskin', gozAcik: 1.1, bebek: .5, kirpma: false, bak: [.5, -.3], yas: .9, yasDamla: aralik(lt, 0, d), gulum: -.25, konus: 0,
        kollar: { sag: { el: [20, 285], on: true }, sol: { el: [-30, 300], on: true } },
        kolSonrasi: g => { muskaCiz(g, -4, 290, .5, 0, { ipUzun: 100 }); elMitt(g, 22, 286, 1, .4, NAZLI.ten); elMitt(g, -30, 300, 1, -.4, NAZLI.ten, -1); } });
      karanlik(g, 540, 600, 350, 1300, .6, T);
    } },
  A3: { renk: ['gece', 'korku', .3], vinyet: .7, kam: KAM(620, 1130, 1.15, 1.05),
    ciz(g, lt, d, T) {
      banyoKapi(g, .75 * (1 - ease(aralik(lt, .4, 1.6))), T, 1 - ease(aralik(lt, .8, 3.0)));
      g.fillStyle = `rgba(10,8,12,${.9 * ease(aralik(lt, 2.6, 4.2))})`; g.fillRect(255, 1716, 570, 34);
      karanlik(g, 620, 1300, 400, 1400, .55 + .2 * aralik(lt, 2.6, 4.2), T);
    } },
  A4: { renk: 'gece', vinyet: .7, kam: (lt, d) => { const p = ease(aralik(T3('I02', 1), 0, 1.6)); return { x: lerp(540, 700, p), y: lerp(980, 900, p), z: lerp(1.0, 1.6, p) }; },
    ciz(g, lt, d, T) {
      arka(g, 'antreGece', antreGece);
      kapiZinciri(g, 765, 860, Math.sin(lt * 3.6) * .35 * Math.exp(-lt * .15), .9);
      g.fillStyle = 'rgba(20,24,40,.35)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      isikHalesi(g, 920, 560, 300, '180,200,255', .15, T); karanlik(g, 650, 900, 300, 1200, .75, T);
    } },
  A5: { renk: 'gece', vinyet: .7, kam: KAM(540, 940, 1.0, 1.1),
    ciz(g, lt, d, T) {
      g.fillStyle = dg(g, 0, 0, W, 0, [[0, '#7d5235'], [.55, '#7d5235'], [.56, '#a46d45'], [1, '#a46d45']]); g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      g.beginPath(); g.moveTo(600, -PAY); g.lineTo(600, H + PAY); cizgi(g, 6);
      rr(g, 700, 1200, 80, 30, 8); dol(g, '#b9bec3'); cizgi(g, 3.5);
      kapiZinciri(g, 440, 520, Math.sin(lt * 3.6 + 1) * .4 * Math.exp(-lt * .2), 2.6);
      g.fillStyle = 'rgba(20,24,40,.35)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); karanlik(g, 480, 900, 300, 1100, .7, T);
    } },
  T1: { renk: 'normal', vinyet: 0, ekran: true, ciz: baslikKarti3 },

  // ═════ SAHNE 2 · SABAH: SES YOK ═════
  B0: { renk: ['sicak', 'soluk', .5], giris: .4, kam: KAM(540, 980, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false));
      yastik(g, 730, 930, 330, 190, { t: T, gulX: 1e4 });
      EM(g, T, { x: 730, y: 905, s: .72, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: 0, gulum: 0, konus: 0 });
      arka(g, 'yatakOnGunduz', g => yatakOn(g, false));
      N(g, T, { x: 330, y: 1000, s: 1.15, solgun: true, morluk: .5, kas: 'kizgin', gulum: -.05, gozAcik: .8, bak: [.8, -.1], don: .35, etekYok: true, konus: 0 });
    } },
  B1: { renk: ['sicak', 'soluk', .5], kam: KAM(560, 900, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.6, merkez: [700, 900], blur: 4 });
      yastik(g, 560, 1080, 1060, 640, { t: T, gulX: 1e4 });
      EM(g, T, { x: 560, y: 880, s: 1.75, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: lt < .6 ? .1 : .65, bak: [-.6, 0], kas: 'normal', gulum: .1, egim: .08 });
    } },
  B2: { renk: ['sicak', 'soluk', .6], kam: KAM(540, 790, 1.0, 1.1), ekYazi: { metin: '( ses çıkmıyor )', bas: .6, bit: 3.6 },
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.5, merkez: [400, 800], blur: 4 });
      const el_ = ease(aralik(lt, 2.4, 3.2));
      N(g, T, { x: 540, y: 780, s: 2.05, solgun: true, morluk: .5, kas: lt < 1.6 ? 'endise' : 'saskin', gozAcik: lt < 1.6 ? .85 : 1.1, bebek: lt < 1.6 ? 1 : .6, bak: [.6, 0], gulum: -.1, konus: nazliSessiz(lt, .5, 3.4),
        kollar: { sag: { el: [lerp(132, 20, el_), lerp(420, 150, el_)], on: true } } });
    } },
  B3: { renk: ['sicak', 'soluk', .6], kam: KAM(540, 800, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.5, merkez: [700, 800], blur: 4 });
      EM(g, T, { x: 540, y: 800, s: 1.9, don: -.25, bak: [-.6, .05], kas: 'kizgin', gulum: -.2, gozAcik: .7 });
    } },
  B3B: { renk: ['sicak', 'soluk', .6], vinyet: .5, kam: KAM(540, 980, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 2, merkez: [500, 900], blur: 6 });
      const k = easeOut(aralik(lt, 0, .5));
      defter(g, 540, lerp(1400, 980, k), 1.7, 'SESİM YOK!', -.04);
      for (const s of [-1, 1]) { g.beginPath(); g.moveTo(540 + s * 360, lerp(1500, 1080, k)); g.lineTo(540 + s * 520, H + PAY); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = NAZLI.kolRenk; g.stroke(); elMitt(g, 540 + s * 385, lerp(1420, 1000, k), 2.2, s * -1.2, NAZLI.ten, s); }
    } },
  B4: { renk: 'soluk', kam: KAM(540, 790, 1.02, 1.14),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.5, merkez: [400, 800], blur: 4 });
      N(g, T, { x: 540, y: 780, s: 2.05, solgun: true, morluk: .55, kas: 'uzgun', gozAcik: .95, bebek: .7, bak: [0, .3], yas: .9, yasDamla: aralik(lt, .4, d), gulum: -.3, konus: 0, egim: Math.sin(lt * 1.3) * .02,
        kollar: { sag: { el: [18, 150], on: true } }, enUst: g => elMitt(g, 14, 150, 1.05, .3, NAZLI.ten) });
    } },
  B5: { renk: 'soluk', kam: KAM(540, 800, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.5, merkez: [700, 800], blur: 4 });
      EM(g, T, { x: 540, y: 800, s: 1.9, don: .2, bak: [.6, .1], kas: 'normal', gulum: -.2, gozAcik: .58 });
    } },

  // ═════ SAHNE 3 · ÇORBA ═════
  C1: { renk: 'sicak', kam: KAM(540, 1000, 1.0, 1.06),
    ciz(g, lt, d, T) {
      const ac = ease(aralik(lt, .35, 1.25));
      arka(g, 'antre', antreDuvar); antreKapi(g, ac); antreKapiKanat(g, ac);
      if (ac > .15) {
        const gir = ease(aralik(lt, .9, 2.4));
        HT(g, T, { x: 545, y: lerp(700, 720, gir), s: lerp(1.0, 1.1, gir), gulum: .6, gozAcik: .5, kas: 'mutlu', bak: [-.2, .1],
          kollar: { sol: { el: [-110, 330], on: true }, sag: { el: [110, 330], on: true } }, kolSonrasi: g => { corbaKase(g, 0, 320, .55, T, { tepsi: true }); elMitt(g, -110, 330, 1, -1.2, HATICE.ten, -1); elMitt(g, 110, 330, 1, 1.2, HATICE.ten); } });
      }
    } },
  C2: { renk: 'sicak', kam: KAM(540, 780, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [450, 700], blur: 3 });
      N(g, T, { x: 540, y: 780, s: 2.05, solgun: true, morluk: .55, kas: 'endise', gulum: -.15, bak: [.65, .05], gozAcik: .72, konus: 0 });
    } },
  C2B: { renk: 'sicak', vinyet: .55, kam: KAM(540, 1000, 1.0, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'mutfakOnUst', g => { mutfakOn(g, -PAY); });
      const it = ease(aralik(lt, .1, 1.2));
      corbaKase(g, lerp(640, 520, it), 1050, 2.1, T, { sac: true });
      const hx = lerp(1000, 860, it), hy = 1180, sx = 1300, sy = 760;
      g.save(); g.translate(sx, sy); g.scale(2.6, 2.6); kol(g, [0, 0], [(hx - sx) / 2.6, (hy - sy) / 2.6], { renk: HATICE.kolRenk, ten: HATICE.ten, bilezik: true, kalin: 46, mansetRenk: HATICE.manset, basparmak: -1 }); g.restore();
    } },
  C3: { renk: 'sicak', kam: KAM(560, 940, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.1, merkez: [540, 700], blur: 1.5 });
      emreSirti(g, 820, 640, .8);
      const dok = ease(aralik(lt, .3, 1.0));
      N(g, T, { x: 300, y: 800, s: 1.3, don: .35, bak: [.75, .05], kas: 'endise', gulum: -.15, solgun: true, morluk: .5, konus: 0 });
      HT(g, T, { x: 700, y: 770, s: 1.35, don: -.35, bak: [-.7, .1], kas: 'uzgun', gulum: .25, gozAcik: .6, egim: -.04,
        kollar: { sol: { el: [lerp(-130, -230, dok), lerp(400, 30, dok)], on: true } } });
      arka(g, 'mutfakOnYuksek', g => mutfakOn(g, 1560));
    } },
  C4: { renk: ['sicak', 'korku', 'ilerle'], vinyet: [.4, .7], kam: KAM(470, 800, 1.0, 1.25),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.25, merkez: [540, 700], blur: 2.5 });
      emreSirti(g, 880, 620, .75);
      N(g, T, { x: 330, y: 830, s: 1.6, don: .15, bak: [.5, -.1], kas: 'saskin', gulum: -.25, gozAcik: 1.1, bebek: .5, kirpma: false, solgun: true, morluk: .5, konus: 0 });
      HT(g, T, { x: 720, y: 790, s: 1.5, don: -.6, bak: [-.9, .25], kas: 'normal', gulum: .35, gozAcik: .7, kirpma: false, egim: -.14, kafaX: -70 });
      arka(g, 'mutfakOnYuksek', g => mutfakOn(g, 1560));
    } },
  C5: { renk: 'korku', vinyet: .6, kam: (lt, d) => ({ x: 540 + (lt < .25 ? gurultu(lt * 50, 7) * 10 : 0), y: 790, z: lerp(1.0, 1.06, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [650, 700], blur: 3 });
      EM(g, T, { x: 540, y: 790, s: 2.0, don: -.3, bak: [-.7, 0], kas: 'saskin', gulum: -.25, gozAcik: 1.05 });
    } },
  C6: { renk: 'korku', vinyet: .6, kam: KAM(540, 780, 1.02, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [450, 700], blur: 3 });
      N(g, T, { x: 540, y: 780, s: 2.05, solgun: true, morluk: .55, kas: 'uzgun', gulum: -.3, bak: [.6, 0], gozAcik: 1.0, yas: .9, yasDamla: aralik(lt, .2, d), konus: nazliSessiz(lt, .2, 1.6) * .6, kafaX: Math.sin(lt * 9) * 10 * clamp(1 - lt / 2.5), egim: Math.sin(lt * 9) * .04 * clamp(1 - lt / 2.5) });
    } },
  C7: { renk: 'korku', vinyet: .6, kam: KAM(540, 790, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [650, 700], blur: 3 });
      const cik = ease(aralik(sonra('E05'), .1, .8));
      EM(g, T, { x: lerp(540, 1400, cik), y: 790, s: 2.0, don: lerp(-.25, .6, clamp(cik * 3)), bak: cik > 0 ? [.9, 0] : [-.6, .1], kas: 'uzgun', gulum: -.3, gozAcik: .7 });
    } },
  C8: { renk: 'korku', vinyet: .75, kirmiziVinyet: true, kam: KAM(540, 790, 1.0, 1.32),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [560, 700], blur: 3 });
      HT(g, T, { x: 540, y: 800, s: 2.2, gulum: .45, gozAcik: .95, kirpma: false, bebek: .45, donuk: true, kas: 'normal', bak: [-.3, .05], egim: -.05 });
    } },
  C9: { renk: ['korku', 'soluk', .5], vinyet: .7, kam: (lt, d) => ({ x: lerp(160, 260, ease(lt / d)), y: 960, z: 2.0 }),
    ciz(g, lt, d, T) {
      arka(g, 'masaYakin', g => masa(g, -PAY));
      dugumluIp(g, -200, 1400, 960, 24, { t: T, sacli: true, cozulmus: [0], cozulen: 1, cozulme: .25 + .15 * ease(aralik(lt, .6, d)) });
      karanlik(g, 220, 960, 200, 900, .5, T);
    } },

  // ═════ SAHNE 4 · İZ VE GECE ═════
  D1: { renk: 'soluk', kam: KAM(540, 1000, 1.0, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.15, merkez: [540, 700], blur: 2 });
      N(g, T, { x: 540, y: 760, s: 1.45, solgun: true, morluk: .55, kas: 'endise', gulum: -.1, gozAcik: .78, bak: [0, .85], konus: 0,
        kollar: { sol: { el: [-110, 330], on: true }, sag: { el: [110, 330], on: true } },
        kolSonrasi: g => { muskaKagitArka(g, 0, 300, .32, T, .55); elMitt(g, -100, 330, 1, -.6, NAZLI.ten, -1); elMitt(g, 100, 330, 1, .6, NAZLI.ten); } });
      arka(g, 'mutfakOnYuksek', g => mutfakOn(g, 1560));
    } },
  D2: { renk: 'soluk', vinyet: .55, kam: KAM(600, 1180, 1.0, 1.35),
    ciz(g, lt, d, T) {
      arka(g, 'masaYakin', g => masa(g, -PAY));
      muskaKagitArka(g, 540, 960, 1.3, T, lerp(.55, .95, ease(aralik(lt, .2, 2))));
    } },
  D2B: { renk: 'soluk', kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [450, 700], blur: 3 });
      N(g, T, { x: 540, y: 780, s: 2.05, solgun: true, morluk: .5, kas: 'kizgin', gulum: -.1, bak: [.1, 0], gozAcik: .8, konus: 0 });
    } },
  D3: { renk: 'buyu', vinyet: .65, kam: KAM(540, 860, 1.0, 1.1),
    ciz(g, lt, d, T) { gulizarCekim(g, lt, d, T); } },
  D4: { renk: 'gece', giris: .4, vinyet: .6, kam: KAM(480, 1000, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true));
      yastik(g, 360, 930, 330, 190, { t: T, gulX: 1e4 }); yastik(g, 730, 930, 330, 190, { t: T, gulX: 1e4 });
      N(g, T, { x: 365, y: 910, s: .72, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: .85, bak: [-.7, .2], kas: 'uzgun', gulum: -.15, sacUzun: 200, kiyafet: 'pijama', konus: 0 });
      arka(g, 'yatakOnGece', g => yatakOn(g, true));
      const yan = lt > .8;
      telefon(g, 70, 960, 1.5, -.08, yan ? '#3d5a7a' : '#1a1f28', yan ? 'Emre:\nAnnemde\nkalıyorum.' : null);
      if (yan) isikHalesi(g, 70, 960, 260, '140,180,255', .35, T);
    } },
  D5: { renk: 'gece', vinyet: .65, kam: KAM(560, 900, 1.0, 1.18),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true), { olcek: 1.6, merkez: [360, 900], blur: 4 });
      yastik(g, 540, 1080, 1060, 640, { t: T, gulX: 1e4 });
      const duy = lt > 1.0;
      N(g, T, { x: 470, y: 880, s: 1.75, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: duy ? 1.12 : .8, bebek: duy ? .5 : 1, kirpma: !duy, bak: duy ? [0, .9] : [.5, 0], kas: duy ? 'saskin' : 'uzgun', gulum: -.2, sacUzun: 220, egim: -.1, konus: 0 });
    } },
  D6: { renk: 'gece', vinyet: .7, kam: KAM(540, 900, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'tahta', tahtaZemin);
      g.save(); g.translate(560, 820); g.rotate(-Math.PI / 2 * .92);
      karakter(g, NAZLI, { x: 0, y: 0, s: 1.7, t: T, T, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: 1.05, bebek: .5, kirpma: false, bak: [.9, 0], kas: 'saskin', gulum: -.2, sacUzun: 240, solgun: true, morluk: .5, konus: 0 });
      g.restore();
      g.fillStyle = 'rgba(20,24,40,.3)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      isikHalesi(g, 540, 1180, 500, '255,190,120', .18, T); karanlik(g, 540, 900, 300, 1200, .6, T);
    } },
  D7: { renk: ['gece', 'korku', .5], vinyet: .75, kam: (lt, d) => ({ x: 540, y: 960, z: lerp(1.1, 1.5, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'tahta', tahtaZemin);
      g.fillStyle = 'rgba(14,10,12,.55)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      // tahtalar arasındaki aralık ve alttan gelen ışık
      g.save(); g.beginPath(); g.rect(-PAY, 905, W + PAY * 2, 120); g.clip();
      g.fillStyle = dg(g, 0, 905, 0, 1025, [[0, '#2a140a'], [.5, '#d9893a'], [1, '#2a140a']]); g.fillRect(-PAY, 905, W + PAY * 2, 120);
      const ac = ease(aralik(lt, .9, 1.5)) * (lt > d - .3 ? 1 - aralik(lt, d - .3, d) : 1);
      if (ac > .05) {
        g.save(); g.translate(540, 968); g.scale(2.3, 2.3); el(g, 0, 0, 62, 24); dol(g, HATICE.ten[1]);
        goz(g, 0, -2, 1, { ac: ac * .7, bak: [0, -.6], iris: HATICE.iris, kirpik: true, bebek: .45, yasli: true, donuk: true }); g.restore();
      }
      g.restore();
      g.beginPath(); g.moveTo(-PAY, 905); g.lineTo(W + PAY, 905); g.moveTo(-PAY, 1025); g.lineTo(W + PAY, 1025); cizgi(g, 6, '#1a0e08');
      isikHalesi(g, 540, 962, 520, '255,170,90', .3, T); karanlik(g, 540, 962, 220, 1000, .7, T);
    } },
  D8: { renk: 'normal', vinyet: 0, ekran: true,
    ciz(g, lt, d, T) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); if (lt > .03 && lt < .16) { g.fillStyle = 'rgba(150,10,20,.45)'; g.fillRect(0, 0, W, H); } } },
  D9: { renk: 'normal', vinyet: 0, ekran: true, ciz: soruKarti3 },
};
function T3(id, parca) { const r = yrep(id); if (!r || !r.parcalar[parca]) return -1; return (window._sonT ?? 0) - r.parcalar[parca].bas; }
