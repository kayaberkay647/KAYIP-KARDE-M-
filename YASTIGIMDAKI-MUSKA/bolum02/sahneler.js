// YASTIĞIMDAKİ MUSKA — 2. Bölüm: "Kırmızı İplik" çekimleri
'use strict';

const yrep = id => ZAMAN.replikler.find(r => r.id === id);

// ───────────── bölüme özel yardımcılar ─────────────
function yastikYakin(g, T, o = {}) { // yarılmış dikişli yastık yakın planı
  arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 2, merkez: [540, 900], blur: 6 });
  const sik = o.sik ?? 1;
  g.save(); g.translate(540, 960); g.scale(sik, sik); g.translate(-540, -960);
  yastik(g, 540, 960, 1500, 1000, { t: T, dikis: { x: 0, y0: -360, y1: 360 }, gulX: 500, gulY: 330 });
  const yar = o.yarik || 0;
  if (yar > 0) {
    g.fillStyle = '#fbf8f1'; g.fillRect(520, 960 - 150 * yar - 14, 40, 300 * yar + 28);
    el(g, 540, 960, 8 + 22 * yar, 30 + 150 * yar); g.fillStyle = rg(g, 540, 960, 4, 160, [[0, '#120806'], [1, '#3a2418']]); g.fill(); cizgi(g, 4);
    for (const s of [-1, 1]) { g.beginPath(); g.moveTo(540 + s * 14, 960 - 150 * yar - 16); g.quadraticCurveTo(540 + s * 40, 960 - 150 * yar - 50, 540 + s * 30, 960 - 150 * yar - 80); cizgi(g, 4.5, '#b01f28'); g.beginPath(); g.moveTo(540 + s * 14, 960 + 150 * yar + 16); g.quadraticCurveTo(540 + s * 44, 960 + 150 * yar + 40, 540 + s * 36, 960 + 150 * yar + 74); cizgi(g, 4.5, '#b01f28'); }
  }
  g.restore();
}
function makasEl(g, mx, my, ac) {
  g.save(); g.translate(mx, my); g.rotate(-.42);
  makas(g, 0, 0, 1.25, ac);
  g.save(); g.rotate(.42);
  g.beginPath(); g.moveTo(150, 170); g.lineTo(600, 900); g.lineCap = 'round'; g.lineWidth = 150 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 150; g.strokeStyle = NAZLI.kolRenk; g.stroke();
  g.globalAlpha = .2; g.beginPath(); g.moveTo(190, 230); g.lineTo(600, 900); g.lineWidth = 60; g.strokeStyle = '#000'; g.stroke(); g.globalAlpha = 1;
  g.restore();
  g.save(); g.translate(78, 92); g.rotate(-.5); el(g, 0, 0, 62, 54); dol(g, NAZLI.ten[0]); cizgi(g);
  g.beginPath(); g.ellipse(-52, -8, 18, 30, .5, 0, TAU); dol(g, NAZLI.ten[0]); cizgi(g, 4); g.restore();
  g.restore();
}
function orguZincir(g, x, yUst, yAlt, s, t) { // aşağı sarkan saç örgüsü (kırmızı iplik sarılı)
  const ad = 26 * s; let i = 0;
  for (let y = yUst; y < yAlt; y += ad, i++) {
    const sx = Math.sin(t * 2 + y * .004) * 6 * (y - yUst) / 400;
    el(g, x + sx + (i % 2 ? 8 : -8) * s, y, 20 * s, 16 * s, i % 2 ? .5 : -.5); dol(g, i % 2 ? '#8d5837' : '#7a4a2d'); cizgi(g, 3);
    if (i % 3 === 1) { g.beginPath(); g.moveTo(x + sx - 18 * s, y - 6 * s); g.lineTo(x + sx + 18 * s, y + 4 * s); cizgi(g, 4.5, '#b01f28'); }
  }
}
function telefonKulak(s = 1) { return g => { elMitt(g, 112, 52, 1, -.2, NAZLI.ten); telefon(g, 104, 16, 1.1, .12); elMitt(g, 112, 52, 1, -.2, NAZLI.ten); }; }
function telefonKulakEmre(g) { telefon(g, -104, 16, 1.1, -.12); elMitt(g, -112, 52, 1, .2, EMRE.ten, -1); }
function nazliHatice(g, lt, d, T, o) { return HT(g, T, o); }
function karanlikOrtam(g, x, y, r0, r1, a, T) { karanlik(g, x, y, r0, r1, a, T); }
function baslikKarti2(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .8)), cik = aralik(lt, d - .4, d);
  g.save(); g.globalAlpha = .9 * gir; dugumluIp(g, 80, 80 + 920 * ease(aralik(lt, .2, 1.6)), 1050, 9, { t: T }); g.restore();
  g.save(); g.globalAlpha = gir * (1 - cik) * (.92 + .08 * Math.sin(lt * 37) * (lt < 1 ? 1 : 0));
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 88px "Lora"'; g.fillStyle = '#efe2cc'; g.letterSpacing = '6px'; g.fillText('YASTIĞIMDAKİ', W / 2, 790);
  g.font = '700 190px "Lora"'; g.lineWidth = 10; g.strokeStyle = '#1a0507'; g.strokeText('MUSKA', W / 2, 940); g.fillStyle = '#c0262f'; g.fillText('MUSKA', W / 2, 940);
  g.letterSpacing = '10px'; g.font = '700 40px "Lora"'; g.fillStyle = '#c9a98a'; g.fillText('2. BÖLÜM', W / 2, 1150);
  g.letterSpacing = '0px'; g.font = 'italic 600 62px "Lora"'; g.fillStyle = '#efe2cc'; g.fillText('Kırmızı İplik', W / 2, 1240);
  g.restore();
}
function soruKarti2(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .6));
  g.save(); g.globalAlpha = .95 * gir; g.translate(W / 2, 640); g.scale(.62, .62); g.translate(-540, -960); banyoKapi(g, .55, T, 1); g.restore();
  g.save(); g.globalAlpha = gir; g.fillStyle = 'rgba(5,2,3,.35)'; g.fillRect(0, 0, W, H); g.restore();
  g.save(); g.globalAlpha = gir; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 74px "Lora"'; g.lineWidth = 12; g.strokeStyle = '#1a0507'; g.lineJoin = 'round';
  for (const [s, y] of [['Sizce Nazlı', 1180], ['kapıyı açmalı mı?', 1275]]) { g.strokeText(s, W / 2, y); g.fillStyle = '#f5ead8'; g.fillText(s, W / 2, y); }
  g.font = 'italic 600 46px "Lora"'; g.fillStyle = '#d9b9a0'; g.fillText('Cevabını yorumlara yaz', W / 2, 1400);
  const oy = 1500 + Math.sin(lt * 5) * 14; g.beginPath(); g.moveTo(W / 2 - 34, oy); g.lineTo(W / 2, oy + 40); g.lineTo(W / 2 + 34, oy); cizgi(g, 10, '#c0262f');
  g.font = '700 38px "Lora"'; g.letterSpacing = '4px'; g.fillStyle = '#8a6a60'; g.fillText('SONRAKİ BÖLÜM: KIRK DÜĞÜM', W / 2, 1700);
  g.restore();
}

function banyoZemin(g) { g.fillStyle = '#b9c4c4'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); g.globalAlpha = .6; for (let y = -PAY; y < H + PAY; y += 130) { g.beginPath(); g.moveTo(-PAY, y); g.lineTo(W + PAY, y); cizgi(g, 4, '#9aa6a6'); } for (let x = -PAY; x < W + PAY; x += 130) { g.beginPath(); g.moveTo(x, -PAY); g.lineTo(x, H + PAY); cizgi(g, 4, '#9aa6a6'); } g.globalAlpha = 1; }

// ───────────── ÇEKİMLER ─────────────
const CEKIM = {
  // ═════ SAHNE 1 · DİKİŞ KESİLİYOR ═════
  A1: { renk: 'soluk', vinyet: .6, giris: .15, kam: KAM(560, 960, 1.0, 1.14),
    ciz(g, lt, d, T) {
      const kes = aralik(lt, .05, .25), yar = ease(aralik(lt, .3, 1.2)), soluk = aralik(lt, 1.25, 2.4);
      yastikYakin(g, T, { yarik: yar, sik: 1 - Math.sin(soluk * Math.PI) * .03 - soluk * .02 });
      if (soluk > 0) { // yastığın nefesi: yarıktan çıkan toz ve iplik kırıntıları
        g.save(); for (let i = 0; i < 40; i++) { const a = hash(i) * TAU, v = 140 + hash(i + 5) * 380, p = soluk;
          g.globalAlpha = clamp(1 - p) * .8; el(g, 540 + Math.cos(a) * v * p * .6, 960 - Math.abs(Math.sin(a)) * v * p - 40 * p, 4 + hash(i + 2) * 6, 4 + hash(i + 2) * 6); dol(g, i % 4 ? '#e9e2d6' : '#b01f28'); }
        g.globalAlpha = .25 * Math.sin(soluk * Math.PI); for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(540, 900); g.bezierCurveTo(480 + i * 40, 700, 620 - i * 30, 600, 520 + i * 20, 420 - soluk * 100); cizgi(g, 14, '#ffffff'); } g.restore();
      }
      const geri = easeOut(aralik(lt, .35, 1.1));
      makasEl(g, lerp(600, 760, geri), lerp(1180, 1520, geri), kes < 1 ? lerp(.9, .1, ease(kes)) : .1);
    } },
  A2: { renk: 'soluk', vinyet: .6, kam: (lt, d) => { const p = ease(aralik(lt, .2, d - .3)); return { x: 560, y: lerp(960, 760, p), z: lerp(1.12, 1.0, p) }; },
    ciz(g, lt, d, T) {
      yastikYakin(g, T, { yarik: 1, sik: .95 });
      const p = ease(aralik(lt, .2, d - .5)), hy = lerp(980, 330, p), alt = Math.min(hy + 640, 1000), sw = Math.sin(lt * 3.2) * .25 * p;
      g.save(); g.beginPath(); g.rect(-PAY, -PAY, W + PAY * 2, 990 + PAY); g.clip(); orguZincir(g, 548, hy + 30, alt, 1.4, T); g.restore();
      if (hy + 640 < 990) { g.save(); g.translate(548, alt); g.rotate(sw); muskaCiz(g, 0, 90, .95, 0, { ipUzun: 90 }); g.restore(); }
      g.beginPath(); g.moveTo(560, hy - 40); g.lineTo(700, -PAY); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = NAZLI.kolRenk; g.stroke();
      elMitt(g, 552, hy + 4, 2.3, Math.PI + .15, NAZLI.ten);
    } },
  A3: { renk: 'soluk', vinyet: .5, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.5, merkez: [500, 800], blur: 4 });
      const iki = parcaNo('I02', T) >= 1, sw = Math.sin(lt * 2.6) * .18;
      N(g, T, { x: 520, y: 800, s: 2.0, solgun: true, morluk: .5, kas: iki ? 'uzgun' : 'saskin', gozAcik: iki ? .85 : 1.08, bebek: .7, bak: [.55, .25], yas: iki ? .7 : .3, gulum: -.2, konus: 0,
        kollar: { sag: { el: [150, 40], on: true } },
        enUst: g => { orguZincir(g, 150, 10, 230, 1, T); g.save(); g.translate(150, 230); g.rotate(sw); muskaCiz(g, 0, 66, .62, 0, { ipUzun: 66 }); g.restore(); elMitt(g, 150, 20, 1.05, Math.PI + .2, NAZLI.ten); } });
    } },
  A4: { renk: 'buyu', vinyet: .65, kam: KAM(540, 900, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'buyu', buyuDuvar, { olcek: 1.3, merkez: [540, 600], blur: 3 });
      gulizar(g, { x: 540, y: 840, s: 1.55, t: T, T });
      const ip = yrep('G01'), cek = ip ? Math.sin(clamp((T - ip.t0) * 3)) : 0;
      dugumluIp(g, 300, 780, 1060, 8, { t: T, sacli: true });
      gulizarEl(g, 300, 1095, 1.0, Math.PI - .5, { parmak: [-.25, -.08, .08, .25] }); gulizarEl(g, 780, 1095, 1.0, Math.PI + .5, { parmak: [-.25, -.08, .08, .25] });
      g.save(); g.filter = 'blur(5px)'; mum(g, 200, 1820, 1.7, T); g.restore();
      const parla = parcaNo('G01', T) === 0 ? 1.25 : 1;
      isikHalesi(g, 203, 1540, 950 * parla, '255,150,60', .6, T); karanlik(g, 400, 1250, 300, 1400 * parla, .82, T);
    } },
  A5: { renk: 'buyu', vinyet: .7, kam: KAM(540, 760, 1.0, 1.16),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.25, merkez: [540, 700], blur: 2.5 });
      haticeKoltuk(g, 540, 820, 1.25);
      HT(g, T, { x: 540, y: 780, s: 1.6, bak: [.1, -1], gozAcik: .9, kirpma: false, bebek: .55, kas: 'kizgin', gulum: .28, isik: altIsik('255,190,120', .25),
        kollar: { sol: { el: [-140, 360], on: true }, sag: { el: [140, 360], on: true } } });
      isikHalesi(g, 900, 1100, 700, '255,190,120', .35, T); karanlik(g, 820, 1000, 250, 1250, .9, T);
    } },
  T1: { renk: 'normal', vinyet: 0, ekran: true, ciz: baslikKarti2 },

  // ═════ SAHNE 2 · TELEFON ═════
  B1: { renk: 'soluk', kam: KAM(540, 780, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.5, merkez: [500, 800], blur: 4 });
      N(g, T, { x: 540, y: 780, s: 2.05, solgun: true, morluk: .5, kas: 'saskin', gozAcik: 1.0, bak: [-.3, 0], gulum: -.2, ter: .5, kollar: { sag: { el: [112, 60], on: true } }, enUst: telefonKulak() });
    } },
  B2: { renk: ['soluk', 'normal', .4], kam: KAM(540, 900, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'ofis', ofisArka);
      EM(g, T, { x: 430, y: 760, s: 1.4, don: .2, bak: [.6, .1], kas: 'kizgin', gulum: -.2, gozAcik: .62, kollar: { sol: { el: [-112, 60], on: true }, sag: { el: [140, 420], on: true } }, enUst: telefonKulakEmre });
      arka(g, 'ofisMasa', g => ofisMasa(g, 1270));
    } },
  B3: { renk: 'soluk', kam: KAM(540, 780, 1.02, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.5, merkez: [500, 800], blur: 4 });
      N(g, T, { x: 540, y: 780, s: 2.05, solgun: true, morluk: .5, kas: 'uzgun', gozAcik: .8, bak: [-.2, .2], gulum: -.25, yas: .7, kollar: { sag: { el: [112, 60], on: true } }, enUst: telefonKulak() });
    } },
  B4: { renk: ['soluk', 'normal', .4], kam: KAM(540, 790, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'ofis', ofisArka, { olcek: 1.45, merkez: [500, 700], blur: 3 });
      const in_ = ease(aralik(lt, d - 1.0, d - .55));
      EM(g, T, { x: 540, y: 790, s: 2.0, don: .15, bak: [.5, .2], kas: 'normal', gulum: -.15, gozAcik: .6, kollar: { sol: { el: [lerp(-112, -60, in_), lerp(60, 330, in_)], on: true } },
        enUst: g => { const x = lerp(-104, -60, in_), y = lerp(16, 300, in_); telefon(g, x, y, 1.1, lerp(-.12, .3, in_)); elMitt(g, x - 8, y + 36, 1, .2, EMRE.ten, -1); } });
    } },
  B5: { renk: 'soluk', kam: KAM(540, 800, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.5, merkez: [500, 800], blur: 4 });
      N(g, T, { x: 540, y: 780, s: 2.05, solgun: true, morluk: .5, kas: 'uzgun', gozAcik: .65, bak: [0, .8], gulum: -.3, yas: .85, yasDamla: aralik(lt, .4, d), konus: 0,
        kollar: { sag: { el: [40, 300], on: true } }, enUst: g => { telefon(g, 40, 260, 1.2, .1, '#2c3644', 'Arama\nsona erdi'); elMitt(g, 44, 304, 1, .3, NAZLI.ten); } });
    } },
  B6: { renk: 'soluk', kam: (lt, d) => { const p = ease(aralik(lt, .6, 3.4)); return { x: lerp(540, 450, p), y: lerp(880, 990, p), z: lerp(1.0, 1.9, p) }; },
    ciz(g, lt, d, T) {
      const ax = 70, ay = 120, aw = 940, ah = 1440, korku = parcaNo('I08', T) >= 1;
      g.save(); g.beginPath(); g.roundRect(ax, ay, aw, ah, 40); g.clip();
      arka(g, 'aynaIci', aynaIci);
      N(g, T, { x: 540, y: 820, s: 1.6, solgun: true, morluk: .6, kas: korku ? 'saskin' : 'endise', gozAcik: korku ? 1.1 : .8, bebek: korku ? .55 : 1, bak: korku ? [0, 0] : [-.6, .4], don: -.2, gulum: -.2, konus: 0,
        kollar: { sol: { el: [-120, 150], on: true } },
        enUst: g => { // kökünden kesilmiş tutam
          g.save(); g.translate(-78, 112);
          for (let i = 0; i < 9; i++) { g.beginPath(); g.moveTo(-14 + i * 4, -30); g.lineTo(-18 + i * 4.5, 26); cizgi(g, 4, i % 2 ? '#6d3f25' : '#8d5837'); }
          g.beginPath(); g.moveTo(-24, 28); g.lineTo(24, 28); cizgi(g, 3, '#3a2216');
          g.restore(); elMitt(g, -120, 150, 1, .4, NAZLI.ten); } });
      g.restore();
      arka(g, 'aynaCerceve', g => aynaCerceve(g, ax, ay, aw, ah));
    } },
  B7: { renk: ['sicak', 'soluk', .45], vinyet: .45, kam: KAM(540, 940, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'antreKapali', g => { antreDuvar(g); antreKapi(g, 0); }, { olcek: 1.2, merkez: [540, 900], blur: 2 });
      const p = ease(aralik(lt, .5, 1.6)), icinde = lt > 1.7;
      N(g, T, { x: 540, y: 800, s: 1.5, kas: 'kizgin', gulum: -.1, gozAcik: .78, bak: [-.5, .55], solgun: true, morluk: .4, konus: 0,
        kollar: { sol: { el: [-150, 400], on: true }, sag: { el: [lerp(60, -95, p), lerp(250, 330, p)], on: true } },
        kolSonrasi: g => { canta(g, -150, 430, .62); if (!icinde) muskaCiz(g, lerp(60, -95, p), lerp(250, 330, p) + 20, .32, 0, { ipUzun: 120 }); elMitt(g, lerp(60, -95, p), lerp(250, 330, p), 1, .3, NAZLI.ten); } });
    } },

  // ═════ SAHNE 3 · AKŞAM YEMEĞİ ═════
  C1: { renk: 'sicak', giris: .3, kam: KAM(540, 960, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon);
      const uz = ease(aralik(lt, .3, 1.4));
      EM(g, T, { x: 860, y: 790, s: 1.1, don: -.35, bak: [-.6, 0], gulum: .1, kas: 'normal' });
      N(g, T, { x: 210, y: 800, s: 1.1, don: .35, bak: [.6, .1], gulum: -.1, kas: 'endise', solgun: true });
      HT(g, T, { x: 540, y: 720, s: 1.15, don: -.2, bak: [-.6, .2], gulum: .5, gozAcik: .55, kas: 'mutlu',
        kollar: { sol: { el: [lerp(-120, -215, uz), lerp(380, 330, uz)], on: true } },
        kolSonrasi: g => { sarmaTabak(g, lerp(-150, -245, uz), lerp(400, 345, uz), .42); elMitt(g, lerp(-120, -215, uz), lerp(380, 330, uz), 1, 1.2, HATICE.ten); } });
      arka(g, 'masa2', g => { yemekMasasi(g, 1240); sarmaTabak(g, 540, 1330, .5); sarmaTabak(g, 860, 1345, .5); cayBardagi(g, 700, 1290, .7); cayBardagi(g, 380, 1300, .7); });
    } },
  C2: { renk: 'sicak', vinyet: .55, kam: KAM(560, 940, 1.0, 1.22),
    ciz(g, lt, d, T) {
      arka(g, 'masaUst', g => { yemekMasasi(g, -PAY); });
      sarmaTabak(g, 540, 960, 2.2, { sac: true });
      g.save(); g.translate(1010, 980); g.rotate(.1); rr(g, -14, -300, 28, 600, 12); dol(g, '#c9cdd1'); cizgi(g, 4); g.restore();
    } },
  C2B: { renk: 'sicak', kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.45, merkez: [540, 700], blur: 3 });
      const don = lt > d - .7;
      HT(g, T, { x: 540, y: 790, s: 2.05, gulum: .55, gozAcik: don ? .95 : .55, kirpma: !don, bebek: don ? .55 : 1, kas: 'mutlu', bak: [-.4, .1] });
    } },
  C3: { renk: 'sicak', kam: KAM(560, 900, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.2, merkez: [540, 800], blur: 2 });
      HT(g, T, { x: 560, y: 770, s: 1.4, don: .35, bak: [.75, 0], gulum: .08, kas: 'endise', kollar: { sag: { el: [175, 330], on: true } } });
      arka(g, 'masa3', g => { yemekMasasi(g, 1400); sarmaTabak(g, 520, 1500, .6); cayBardagi(g, 820, 1450, .8); });
    } },
  C4: { renk: 'sicak', kam: KAM(540, 900, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.25, merkez: [300, 800], blur: 2.5 });
      EM(g, T, { x: 540, y: 790, s: 1.45, don: -.3, bak: [-.65, .05], gulum: -.1, gozAcik: .58, kas: 'normal' });
      arka(g, 'masa3', g => { yemekMasasi(g, 1400); sarmaTabak(g, 520, 1500, .6); cayBardagi(g, 820, 1450, .8); });
    } },
  C5: { renk: ['sicak', 'korku', 'ilerle'], vinyet: [.4, .65], kam: KAM(540, 780, 1.0, 1.2),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.45, merkez: [540, 700], blur: 3 });
      HT(g, T, { x: 540, y: 790, s: 2.15, gulum: 0, gozAcik: .95, kirpma: false, bebek: .5, kas: 'normal', bak: [-.35, 0], donuk: true });
    } },
  C6: { renk: 'sicak', vinyet: .5, kam: KAM(540, 1000, 1.05, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'masaUst', g => { yemekMasasi(g, -PAY); });
      sarmaTabak(g, 160, 560, 1.4); cayBardagi(g, 930, 600, 1.4);
      const dus = easeIn(aralik(lt, 0, .3)), cek = ease(aralik(lt, .5, 1.3));
      muskaCiz(g, 540, lerp(760, 1010, dus), 1.5, lerp(-.3, .15, dus), { ipUzun: 160 });
      g.beginPath(); g.moveTo(lerp(470, 380, cek), lerp(700, 300, cek)); g.lineTo(-PAY, -PAY); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = NAZLI.kolRenk; g.stroke();
      elMitt(g, lerp(500, 410, cek), lerp(740, 340, cek), 2.4, -.6, NAZLI.ten);
    } },
  C7: { renk: 'sicak', kam: KAM(540, 790, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.45, merkez: [540, 700], blur: 3 });
      const gul = parcaNo('H04', T) <= 0, don = lt > d - .5;
      HT(g, T, { x: 540, y: 790, s: 2.05, gulum: gul ? .75 : .5, gozAcik: gul ? .1 : (don ? .95 : .55), mutluGoz: gul, kirpma: !don, bebek: don ? .55 : 1, kas: 'mutlu', bak: [-.3, .1], egim: gul ? Math.sin(lt * 9) * .02 : 0 });
    } },
  C8: { renk: 'sicak', kam: KAM(540, 790, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.45, merkez: [300, 700], blur: 3 });
      EM(g, T, { x: 540, y: 790, s: 2.0, don: -.25, bak: [-.65, .05], gulum: .5, kas: 'mutlu', gozAcik: .75 });
    } },
  C9: { renk: ['sicak', 'normal', .5], kam: KAM(540, 780, 1.02, 1.14),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.45, merkez: [800, 700], blur: 3 });
      N(g, T, { x: 540, y: 780, s: 2.05, solgun: true, morluk: .5, kas: 'endise', gulum: -.15, bak: [.65, .05], gozAcik: .7, konus: 0 });
    } },
  C10: { renk: ['sicak', 'korku', .4], vinyet: .6, kam: KAM(560, 990, 1.05, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'masaUst', g => { yemekMasasi(g, -PAY); });
      sarmaTabak(g, 160, 560, 1.4); cayBardagi(g, 930, 600, 1.4);
      const kap = ease(aralik(lt, d - .55, d - .25));
      muskaCiz(g, lerp(540, -260, kap), 1010, 1.5, .15, { ipUzun: 160 });
      if (kap > 0) { g.beginPath(); g.moveTo(lerp(380, -200, kap), 1000); g.lineTo(-PAY - 200, 1150); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = NAZLI.kolRenk; g.stroke(); elMitt(g, lerp(420, -160, kap), 990, 2.4, -1.4, NAZLI.ten); }
      const p = ease(aralik(lt, 0, d - .5)), hx = lerp(1020, 680, p), hy = lerp(880, 975, p), sx = 1300, sy = 640;
      g.save(); g.translate(sx, sy); g.scale(2.6, 2.6); kol(g, [0, 0], [(hx - sx) / 2.6, (hy - sy) / 2.6], { renk: HATICE.kolRenk, ten: HATICE.ten, bilezik: true, kalin: 46, mansetRenk: HATICE.manset, basparmak: -1 }); g.restore();
    } },
  C11: { renk: ['sicak', 'normal', .5], kam: KAM(540, 790, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.45, merkez: [800, 700], blur: 3 });
      N(g, T, { x: 540, y: 780, s: 2.05, solgun: true, morluk: .5, kas: 'endise', gulum: -.2, bak: [.6, 0], gozAcik: .9, ter: .4,
        kollar: { sag: { el: [10, 290], on: true } }, kolSonrasi: g => { muskaCiz(g, 6, 290, .45, .1, { ipUzun: 120 }); elMitt(g, 12, 296, 1, .4, NAZLI.ten); } });
    } },
  C12: { renk: 'korku', vinyet: .75, kirmiziVinyet: true, kam: KAM(540, 790, 1.0, 1.3),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.45, merkez: [540, 700], blur: 3 });
      HT(g, T, { x: 540, y: 800, s: 2.2, gulum: .22, gozAcik: .95, kirpma: false, bebek: .45, donuk: true, kas: 'normal', bak: [-.25, 0] });
    } },

  // ═════ SAHNE 4 · GECE 03:00 ═════
  D0: { renk: 'gece', giris: .5, vinyet: .55, kam: KAM(540, 1000, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true));
      yastik(g, 360, 930, 330, 190, { t: T, gulX: 1e4 }); yastik(g, 730, 930, 330, 190, { t: T, gulX: 1e4 });
      N(g, T, { x: 365, y: 910, s: .72, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: .85, bak: [.4, -.4], kas: 'endise', gulum: -.1, sacUzun: 200, kiyafet: 'pijama', konus: 0 });
      emreArkaKafa(g, 730 + agizAcik('EMRE', T) * 4, 900, .72);
      arka(g, 'yatakOnGece', g => yatakOn(g, true));
      dijitalSaat(g, 110, 950, .85, '02:59', true);
    } },
  D0B: { renk: 'gece', vinyet: .6, kam: KAM(560, 900, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true), { olcek: 1.6, merkez: [360, 900], blur: 4 });
      yastik(g, 540, 1080, 1060, 640, { t: T, gulX: 1e4 });
      N(g, T, { x: 470, y: 880, s: 1.75, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: .8, bak: [.85, 0], kas: 'uzgun', gulum: -.2, sacUzun: 220, egim: -.1, yas: .8, yasDamla: aralik(lt, .5, d), konus: 0 });
    } },
  D1: { renk: 'gece', vinyet: .65, kam: KAM(540, 940, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'banyo', banyoArka);
      const ac = ease(aralik(lt, .8, 2.4));
      N(g, T, { x: 540, y: 820, s: 1.5, kiyafet: 'pijama', solgun: true, morluk: .6, kas: 'endise', gulum: -.15, gozAcik: .75, bak: [0, .85], konus: 0,
        kollar: { sol: { el: [-60, 340], on: true }, sag: { el: [60, 340], on: true } },
        kolSonrasi: g => { if (ac < .5) muskaCiz(g, 0, 330, .6, 0, { ip: false }); else muskaKagit(g, 0, 300, .32, ac, T); elMitt(g, -62, 340, 1, -.4, NAZLI.ten); elMitt(g, 62, 340, 1, .4, NAZLI.ten, -1); } });
      rr(g, -PAY, 1400, W + PAY * 2, 700, 40); g.fillStyle = dg(g, 0, 1400, 0, H, [[0, '#f4f4f2'], [1, '#c9cfd0']]); g.fill(); cizgi(g);
      isikHalesi(g, 540, 120, 700, '255,220,170', .3, T); karanlik(g, 540, 500, 300, 1300, .7, T);
    } },
  D2: { renk: 'gece', vinyet: .6, kam: (lt, d) => { const p = ease(aralik(T2('I06', 1), 0, 1.2)); return { x: 540, y: lerp(900, 1360, p), z: lerp(1.0, 1.4, p) }; },
    ciz(g, lt, d, T) {
      arka(g, 'banyoZemin', banyoZemin);
      muskaKagit(g, 540, 820, 1.15, 1, T);
      dugumluIp(g, -100, 1180, 1450, 14, { t: T, sacli: true });
      isikHalesi(g, 540, 700, 800, '255,220,170', .25, T); karanlik(g, 540, 900, 400, 1500, .6, T);
    } },
  D3: { renk: 'gece', vinyet: .65, kam: (lt, d) => ({ x: lerp(220, 860, ease(lt / d)), y: 960, z: 1.7 }),
    ciz(g, lt, d, T) {
      arka(g, 'banyoZemin', banyoZemin);
      dugumluIp(g, -300, 1400, 960, 26, { t: T, sacli: true });
      karanlik(g, 540, 960, 400, 1300, .55, T);
    } },
  D4: { renk: ['gece', 'korku', .5], vinyet: .7, kam: (lt, d) => ({ x: 540, y: 960, z: lerp(2.3, 2.7, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'banyoZemin', banyoZemin);
      dugumluIp(g, -300, 1400, 960, 26, { t: T, sacli: true, cozulen: 12, cozulme: ease(aralik(lt, .3, 2.4)) });
      karanlik(g, 540, 960, 200, 900, .6, T);
    } },
  D5: { renk: 'gece', vinyet: .65, kam: KAM(540, 780, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'banyo', banyoArka, { olcek: 1.4, merkez: [540, 800], blur: 3 });
      const irk = lt > .45;
      N(g, T, { x: 540, y: 790, s: 2.05, kiyafet: 'pijama', solgun: true, morluk: .6, kas: irk ? 'saskin' : 'endise', gozAcik: irk ? 1.15 : .8, bebek: irk ? .5 : .9, kirpma: !irk, bak: irk ? [.55, -.45] : [0, .7], gulum: -.2, konus: 0 });
      isikHalesi(g, 540, 120, 700, '255,220,170', .25, T); karanlik(g, 540, 600, 350, 1300, .6, T);
    } },
  D6: { renk: ['gece', 'korku', .3], vinyet: .7, kam: KAM(620, 1150, 1.0, 1.2),
    ciz(g, lt, d, T) { banyoKapi(g, ease(aralik(lt, .2, 2.6)), T, clamp(lt / .4)); karanlik(g, 620, 1300, 400, 1400, .55, T); } },
  D7: { renk: ['gece', 'korku', .5], vinyet: .75, kam: (lt, d) => ({ x: 540 + gurultu(lt * 30, 3) * 4, y: 790, z: lerp(1.05, 1.15, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'banyo', banyoArka, { olcek: 1.4, merkez: [540, 800], blur: 3 });
      N(g, T, { x: 540 + gurultu(T * 20, 1) * 3, y: 790, s: 2.05, kiyafet: 'pijama', solgun: true, morluk: .6, kas: 'saskin', gozAcik: 1.15, bebek: .45, kirpma: false, bak: [.5, -.35], yas: .9, yasDamla: aralik(lt, 0, d), konus: 0,
        kollar: { sag: { el: [20, 130], on: true } }, enUst: g => elMitt(g, 6, 92, 1.25, -.25, NAZLI.ten) });
      karanlik(g, 540, 600, 350, 1300, .6, T);
    } },
  D8: { renk: 'normal', vinyet: 0, ekran: true,
    ciz(g, lt, d, T) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); if (lt > .03 && lt < .16) { g.fillStyle = 'rgba(150,10,20,.45)'; g.fillRect(0, 0, W, H); } } },
  D9: { renk: 'normal', vinyet: 0, ekran: true, ciz: soruKarti2 },
};
function T2(id, parca) { // parçanın başlangıcından bu yana geçen süre (kamera için)
  const r = yrep(id); if (!r || !r.parcalar[parca]) return -1;
  return (window._sonT ?? 0) - r.parcalar[parca].bas;
}
