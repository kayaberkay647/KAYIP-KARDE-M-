// YASTIĞIMDAKİ MUSKA — 7. Bölüm: "Büyü Geri Döndü" çekimleri
'use strict';

const yrep = id => ZAMAN.replikler.find(r => r.id === id);

// ───────────── bölüme özel yardımcılar ─────────────
function depoIsik(g, T, x = 540, y = 1300, a = .72) { isikHalesi(g, x, y, 900, '255,70,50', .35, T); karanlik(g, x, y - 300, 350, 1300, a, T); }
function haticeSimdi(g, T, o) { return HT(g, T, Object.assign({ bilezikSay: 3, solgun: true, enUst: seyrekSac }, o)); }
function nazliEli(g, hx, hy, aci = -.6, renk = NAZLI.kolRenk) {
  g.beginPath(); g.moveTo(hx - 30, hy + 20); g.lineTo(-PAY - 100, hy + 300); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = renk; g.stroke();
  elMitt(g, hx, hy, 2.4, aci, NAZLI.ten);
}
function ucanIplik(g, x0, y0, x1, y1, p, T, i = 0) { // Gülizar'dan bileğe uzanan kırmızı iplik
  if (p <= 0) return;
  const n = 30; g.beginPath();
  for (let k = 0; k <= n * p; k++) { const u = k / n, x = lerp(x0, x1, u) + Math.sin(u * 9 + T * 6 + i) * 30 * (1 - u), y = lerp(y0, y1, u) + Math.sin(u * 5 + i) * 120 * u * (1 - u); k ? g.lineTo(x, y) : g.moveTo(x, y); }
  cizgi(g, 9, '#3a0508'); g.stroke(); cizgi(g, 5, '#d0303a');
}
function bilekSarim(g, x, y, s, n, renk = '#d0303a') { // bileğe dolanmış iplik
  g.save(); g.translate(x, y); g.scale(s, s);
  for (let i = 0; i < n; i++) { el(g, 0, -20 + i * 14, 34, 9, .1); g.lineWidth = 5; g.strokeStyle = renk; g.stroke(); }
  g.restore();
}
function fotoArkasi(g, x, y, s, sac = 1) {
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(.04);
  rr(g, -150, -200, 300, 380, 6); dol(g, '#d9c39a'); cizgi(g, 5, '#3a2416');
  g.fillStyle = '#2a1408'; poly(g, [[-150, -200], [-150, -120], [-90, -200]]); g.fill();
  for (let i = 0; i < 8; i++) { el(g, (hash(i + 9) - .5) * 240, (hash(i + 13) - .5) * 300, 10 + hash(i + 5) * 16, 6 + hash(i + 7) * 10); g.fillStyle = 'rgba(90,60,30,.3)'; g.fill(); }
  g.font = 'italic 600 34px "Lora", serif'; g.textAlign = 'center'; g.fillStyle = 'rgba(70,40,20,.75)'; g.fillText('Gülizar', 0, 120); g.fillText('1924', 0, 160);
  if (sac > 0) { g.save(); g.globalAlpha = sac;
    for (let i = 0; i < 14; i++) sacTeli(g, -40 + i * 6, -90, 120 + hash(i) * 40, Math.PI / 2 + (hash(i + 2) - .5) * .5, (hash(i + 3) - .5) * .8, i % 3 ? '#3a3230' : '#8a8480', 3);
    rr(g, -70, -110, 140, 40, 4); g.fillStyle = 'rgba(240,230,200,.85)'; g.fill(); cizgi(g, 2, '#a89a7a'); g.restore(); }
  g.restore();
}
function soba(g, x, y, s, t, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -40, -900, 80, 600, 10); dol(g, '#2a2626'); cizgi(g, 5, '#0d0b0b');
  rr(g, -220, -320, 440, 520, 30); g.fillStyle = dg(g, -220, 0, 220, 0, [[0, '#3a3434'], [.5, '#5a5252'], [1, '#2a2626']]); g.fill(); cizgi(g, 6, '#0d0b0b');
  rr(g, -150, -200, 300, 230, 16); dol(g, '#120806'); cizgi(g, 5, '#0d0b0b');
  g.save(); g.beginPath(); g.roundRect(-150, -200, 300, 230, 16); g.clip();
  if (o.yastik) { g.save(); g.translate(0, -40); g.scale(.36, .36); yastik(g, 0, 0, 500, 300, { t, gulX: 1e4, renk: '#d9cfc0', golge: '#5a4a3a' }); g.restore(); }
  for (let i = 0; i < 7; i++) { const fx = -110 + i * 36, h = 90 + gurultu(t * 4 + i, i) * 40 + (o.yastik ? 40 : 0); g.beginPath(); g.moveTo(fx - 26, 30); g.quadraticCurveTo(fx - 10, 30 - h * .6, fx + gurultu(t * 3, i) * 10, 30 - h); g.quadraticCurveTo(fx + 12, 30 - h * .6, fx + 26, 30); g.closePath(); g.fillStyle = i % 2 ? 'rgba(255,140,40,.9)' : 'rgba(255,200,80,.85)'; g.fill(); }
  g.restore();
  rr(g, -180, 200, 40, 60, 6); dol(g, '#1a1616'); rr(g, 140, 200, 40, 60, 6); dol(g, '#1a1616');
  g.restore();
  isikHalesi(g, x, y - 80 * s, 500 * s, '255,150,60', .45, t);
}
function kuller(g, T, dugumParla) {
  g.fillStyle = '#140c0a'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
  for (let i = 0; i < 120; i++) { el(g, (hash(i) - .1) * 1300, 700 + hash(i + 3) * 800, 20 + hash(i + 5) * 60, 10 + hash(i + 7) * 24, hash(i)); dol(g, i % 3 ? '#4a4440' : '#2e2826'); }
  for (let i = 0; i < 26; i++) { const p = .5 + .5 * Math.sin(T * 3 + i); el(g, hash(i + 40) * W, 800 + hash(i + 41) * 600, 5, 5); dol(g, `rgba(255,${120 + p * 80},40,${.4 + p * .5})`); }
  isikHalesi(g, 540, 1020, 380, '255,30,30', .55 * dugumParla);
  g.save(); g.translate(540, 1020); g.scale(2.4, 2.4);
  g.beginPath(); g.moveTo(-90, 10); g.quadraticCurveTo(-40, -10, -18, 0); g.moveTo(18, 0); g.quadraticCurveTo(50, 14, 100, -6); cizgi(g, 5, '#7a1218');
  el(g, 0, 0, 20, 16); dol(g, '#c4202a'); cizgi(g, 3, '#3a0508'); g.beginPath(); g.moveTo(-14, -6); g.quadraticCurveTo(0, 8, 14, -6); cizgi(g, 3, '#ff6060');
  g.restore();
}
function baslikKarti7(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .8)), cik = aralik(lt, d - .4, d);
  g.save(); g.globalAlpha = .9 * gir; g.translate(540, 470); g.rotate(-.35); dugumluIp(g, -700, 700 * ease(aralik(lt, .2, 1.8)) - 0, 0, 10, { t: T }); g.restore();
  g.save(); g.globalAlpha = gir * (1 - cik) * (.92 + .08 * Math.sin(lt * 37) * (lt < 1 ? 1 : 0));
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 88px "Lora"'; g.fillStyle = '#efe2cc'; g.letterSpacing = '6px'; g.fillText('YASTIĞIMDAKİ', W / 2, 790);
  g.font = '700 190px "Lora"'; g.lineWidth = 10; g.strokeStyle = '#1a0507'; g.strokeText('MUSKA', W / 2, 940); g.fillStyle = '#c0262f'; g.fillText('MUSKA', W / 2, 940);
  g.letterSpacing = '10px'; g.font = '700 40px "Lora"'; g.fillStyle = '#c9a98a'; g.fillText('7. BÖLÜM', W / 2, 1150);
  g.letterSpacing = '0px'; g.font = 'italic 600 62px "Lora"'; g.fillStyle = '#efe2cc'; g.fillText('Büyü Geri Döndü', W / 2, 1240);
  g.restore();
}
function soruKarti7(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .6));
  g.save(); g.globalAlpha = gir; g.translate(0, -380); kuller(g, T, .8 + .2 * Math.sin(lt * 4)); g.restore();
  g.fillStyle = dg(g, 0, 900, 0, 1150, [[0, 'rgba(5,2,3,0)'], [1, 'rgba(5,2,3,.96)']]); g.fillRect(0, 900, W, 1020);
  g.save(); g.globalAlpha = gir; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 74px "Lora"'; g.lineWidth = 12; g.strokeStyle = '#1a0507'; g.lineJoin = 'round';
  for (const [s, y] of [['Sizce Gülizar', 1170], ['gerçekten', 1265], ['gitti mi?', 1360]]) { g.strokeText(s, W / 2, y); g.fillStyle = '#f5ead8'; g.fillText(s, W / 2, y); }
  g.font = 'italic 600 46px "Lora"'; g.fillStyle = '#d9b9a0'; g.fillText('Cevabını yorumlara yaz', W / 2, 1490);
  const oy = 1580 + Math.sin(lt * 5) * 14; g.beginPath(); g.moveTo(W / 2 - 34, oy); g.lineTo(W / 2, oy + 40); g.lineTo(W / 2 + 34, oy); cizgi(g, 10, '#c0262f');
  g.font = '700 38px "Lora"'; g.letterSpacing = '4px'; g.fillStyle = '#8a6a60'; g.fillText('SONRAKİ BÖLÜM: KIRK BİRİNCİ DÜĞÜM', W / 2, 1740);
  g.restore();
}

// ───────────── ÇEKİMLER ─────────────
const CEKIM = {
  // ═════ SAHNE 1 · İKİ GELİN ═════
  A1: { renk: ['normal', 'korku', .5], vinyet: .8, giris: .2, kam: KAM(540, 860, 1.0, 1.14),
    ciz(g, lt, d, T) {
      arka(g, 'depoKapiAcik', g => depoKapi(g, 1, 0));
      gulizar(g, { x: 540, y: 760, s: 1.25, t: T, T });
      isikHalesi(g, 540, 1700, 700, '255,150,60', .35, T); karanlik(g, 540, 1000, 250, 1000, .8, T);
    } },
  A2: { renk: ['normal', 'korku', .5], vinyet: .78, kam: (lt, d) => ({ x: 540 + (lt < .6 ? gurultu(lt * 40, 3) * 10 : 0), y: 860, z: 1.05 }),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.3, merkez: [540, 800], blur: 3 });
      N(g, T, { x: 330, y: 850, s: 1.5, solgun: true, morluk: .55, kas: 'saskin', gozAcik: 1.12, bebek: .45, kirpma: false, bak: [.8, -.1], don: .3, gulum: -.3, konus: 0, kollar: { sag: { el: [150, 260], on: true } } });
      haticeSimdi(g, T, { x: 740, y: 820, s: 1.5, gozAcik: 1.12, bebek: .45, kirpma: false, kas: 'saskin', gulum: -.3, bak: [.6, -.1], don: .2, kollar: { sag: { el: [160, 250], on: true } } });
      const p = ease(aralik(lt, .1, 1.0));
      ucanIplik(g, W + PAY, 600, 330 + 150 * 1.5, 850 + 260 * 1.5, p, T, 0); ucanIplik(g, W + PAY, 700, 740 + 160 * 1.5, 820 + 250 * 1.5, p, T, 2);
      depoIsik(g, T, 540, 1600);
    } },
  A3: { renk: ['normal', 'korku', .5], vinyet: .75, kam: KAM(540, 980, 1.0, 1.12),
    ciz(g, lt, d, T) {
      g.fillStyle = '#1a0a08'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      const n = Math.floor(1 + ease(aralik(lt, 0, 2.6)) * 6);
      nazliEli(g, 380, 980, -.4); bilekSarim(g, 300, 1060, 2.2, n);
      const sx = 1320, sy = 620; g.save(); g.translate(sx, sy); g.scale(2.6, 2.6); kol(g, [0, 0], [(720 - sx) / 2.6, (980 - sy) / 2.6], { renk: HATICE.kolRenk, ten: HATICE.ten, bilezik: true, bilezikSay: 3, kalin: 46, mansetRenk: HATICE.manset, basparmak: -1 }); g.restore();
      bilekSarim(g, 830, 930, 2.2, n);
      ucanIplik(g, W + PAY, -PAY, 830, 930, 1, T, 1); ucanIplik(g, W + PAY, -PAY + 200, 300, 1060, 1, T, 3);
      isikHalesi(g, 560, 980, 600, '255,40,40', .35, T); karanlik(g, 560, 980, 350, 1100, .55, T);
    } },
  A4: { renk: 'buyu', vinyet: .7, kam: KAM(540, 860, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      gulizar(g, { x: 540, y: 880, s: 2.15, t: T, T });
      for (const s of [-1, 1]) ucanIplik(g, 540 + s * 300, 1500, 540 + s * 900, 1300, 1, T, s + 3);
      isikHalesi(g, 540, 1900, 1000, '255,150,60', .45, T); karanlik(g, 540, 1300, 350, 1500, .78, T);
    } },
  A5: { renk: ['buyu', 'korku', .3], vinyet: .8, kirmiziVinyet: true, kam: KAM(540, 900, 1.12, 1.35),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      gulizar(g, { x: 540, y: 900, s: 2.6, t: T, T });
      isikHalesi(g, 540, 1900, 1100, '255,150,60', .5, T); karanlik(g, 540, 1500, 400, 1500, .82, T);
    } },
  T1: { renk: 'normal', vinyet: 0, ekran: true, ciz: baslikKarti7 },

  // ═════ SAHNE 2 · KARŞI BÜYÜ ═════
  B0: { renk: ['normal', 'korku', .4], vinyet: .72, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'endise', gozAcik: .95, bebek: .7, bak: [.7, 0], gulum: -.2, konus: 0, isik: altIsik('255,80,60', .3) });
      depoIsik(g, T, 540, 1700, .65);
    } },
  B1: { renk: ['normal', 'korku', .4], vinyet: .72, kam: (lt, d) => ({ x: 540 + gurultu(lt * 20, 2) * 3, y: 800, z: 1.06 }),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      haticeSimdi(g, T, { x: 540, y: 800, s: 2.1, gozAcik: 1.08, bebek: .5, kirpma: false, kas: 'saskin', gulum: -.2, bak: [-.5, 0], isik: altIsik('255,80,60', .3) });
      depoIsik(g, T, 540, 1700, .65);
    } },
  B2: { renk: 'normal', vinyet: .7, kam: KAM(540, 920, 1.0, 1.2),
    ciz(g, lt, d, T) {
      g.fillStyle = '#1a0806'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      const don = ease(aralik(lt, .2, 1.0));
      if (don < .5) eskiFoto(g, 540, 940, 2.0, { aci: -.03, cokEski: true, yazi: 'Gülizar · 1924' });
      else fotoArkasi(g, 540, 940, 2.0, ease(aralik(lt, 1.0, 1.8)));
      nazliEli(g, 300, 1320, -.6);
      isikHalesi(g, 540, 900, 700, '255,90,60', .35, T); karanlik(g, 540, 940, 400, 1100, .5, T);
    } },
  B3: { renk: ['normal', 'korku', .4], vinyet: .72, kam: KAM(540, 800, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      haticeSimdi(g, T, { x: 540, y: 800, s: 2.1, gozAcik: 1.0, bebek: .6, kas: 'kizgin', gulum: -.1, bak: [-.4, .3], kollar: { sol: { el: [-200, 150], on: true } } });
      depoIsik(g, T, 540, 1700, .65);
    } },
  B4: { renk: 'normal', vinyet: .7, kam: KAM(560, 960, 1.05, 1.2),
    ciz(g, lt, d, T) {
      g.fillStyle = '#1a0806'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      yastik(g, 540, 960, 1500, 1000, { t: T, gulX: 500, gulY: 330 });
      g.fillStyle = '#fbf8f1'; g.fillRect(520, 800, 40, 320); el(g, 540, 960, 30, 170); g.fillStyle = rg(g, 540, 960, 4, 170, [[0, '#120806'], [1, '#3a2418']]); g.fill(); cizgi(g, 4);
      const it = ease(aralik(lt, .3, 2.6));
      for (let i = 0; i < 12; i++) sacTeli(g, lerp(380, 540, it) - 40 + i * 6, lerp(1250, 980, it), 140 * (1 - it * .7), -1.0 + (hash(i) - .5) * .5, .4, i % 3 ? '#3a3230' : '#8a8480', 3.2);
      nazliEli(g, lerp(330, 470, it), lerp(1330, 1060, it), -.9);
      isikHalesi(g, 540, 960, 700, '255,70,50', .35, T); karanlik(g, 540, 960, 400, 1200, .5, T);
    } },
  B5: { renk: ['normal', 'korku', .3], vinyet: .7, kam: KAM(560, 820, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.3, merkez: [540, 800], blur: 3 });
      const kalk = ease(aralik(lt, .2, 1.0));
      haticeSimdi(g, T, { x: 560, y: 800, s: 1.6, gozAcik: .9, kas: 'kizgin', gulum: 0, bak: [.4, -.4], kollar: { sag: { el: [lerp(120, 170, kalk), lerp(380, 20, kalk)], on: true } },
        enUst: g => { seyrekSac(g); const hx = lerp(120, 170, kalk), hy = lerp(380, 20, kalk); isikHalesi(g, hx, hy - 50, 200, '255,215,120', .5); tekBilezik(g, hx, hy - 50, .7, .2); elMitt(g, hx, hy, 1, Math.PI, HATICE.ten, -1); } });
      depoIsik(g, T, 540, 1600, .6);
    } },
  B6: { renk: ['normal', 'korku', .4], vinyet: .72, kam: KAM(540, 960, 1.0, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'tahtaZemin7', g => { g.fillStyle = '#3a2414'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); for (let y = -PAY, i = 0; y < H + PAY; y += 150, i++) { g.beginPath(); g.moveTo(-PAY, y); g.lineTo(W + PAY, y); cizgi(g, 5, '#1d1209'); } });
      yastik(g, 540, 960, 760, 480, { t: T, gulX: 1e4, dikis: { x: 0, y0: -120, y1: 120 } });
      for (let i = 0; i < 4; i++) { const a = i / 4 * TAU + .4; tekBilezik(g, 540 + Math.cos(a) * 200, 960 + Math.sin(a) * 110, 1.0, a); }
      g.save(); g.translate(540, 960); g.beginPath(); for (let k = 0; k <= 80; k++) { const a = k / 80 * TAU; const x = Math.cos(a) * 470, y = Math.sin(a) * 320; k ? g.lineTo(x, y) : g.moveTo(x, y); } cizgi(g, 7, '#b01f28');
      for (let k = 0; k < 40; k++) { const a = k / 40 * TAU; el(g, Math.cos(a) * 470, Math.sin(a) * 320, 12, 10); dol(g, '#8e1820'); } g.restore();
      const bag = ease(aralik(lt, .6, 2.4));
      nazliEli(g, lerp(380, 520, bag), lerp(1400, 1290, bag), -1.1);
      isikHalesi(g, 540, 960, 700, '255,40,40', .3 + .25 * bag, T); karanlik(g, 540, 960, 450, 1300, .55, T);
    } },
  B7: { renk: ['buyu', 'korku', .4], vinyet: .8, kirmiziVinyet: true, kam: (lt, d) => ({ x: 540 + gurultu(lt * 30, 5) * 6, y: 880, z: 1.15 }),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      gulizar(g, { x: 540, y: 900, s: 2.3, t: T, T });
      isikHalesi(g, 540, 1900, 1100, '255,60,40', .55, T); karanlik(g, 540, 1500, 400, 1500, .78, T);
    } },

  // ═════ SAHNE 3 · BÜYÜ GERİ DÖNDÜ ═════
  C1: { renk: ['normal', 'korku', .4], vinyet: .75, kam: KAM(560, 860, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.25, merkez: [540, 800], blur: 3 });
      haticeSimdi(g, T, { x: 560, y: 780, s: 1.55, gozAcik: .95, kirpma: false, kas: 'kizgin', gulum: -.1, bak: [0, .5], kollar: { sag: { el: [150, 260], on: true }, sol: { el: [-150, 260], on: true } } });
      isikHalesi(g, 560, 1500, 900, '255,40,40', .55 + .1 * Math.sin(T * 6), T); karanlik(g, 560, 1100, 400, 1300, .65, T);
    } },
  C2: { renk: ['buyu', 'korku', .5], vinyet: .8, kam: (lt, d) => ({ x: 540 + gurultu(lt * 30, 2) * 10 * (1 - aralik(lt, 3, d)), y: 860, z: 1.1 }),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.4, merkez: [540, 800], blur: 4 });
      const dag = ease(aralik(lt, .5, 3.6));
      g.save(); g.globalAlpha = 1 - dag; gulizar(g, { x: 540 + gurultu(T * 20, 1) * 8 * dag, y: 860, s: 1.9, t: T, T }); g.restore();
      for (let i = 0; i < 90; i++) { const dog = hash(i) * 3, yas = lt - .5 - dog; if (yas < 0 || yas > 2.5) continue; const x0 = 300 + hash(i + 3) * 480, y0 = 500 + hash(i + 7) * 900;
        g.save(); g.globalAlpha = clamp(1 - yas / 2.5); g.beginPath(); g.moveTo(x0 + yas * 120 * (hash(i + 2) - .3), y0 + yas * yas * 160); g.quadraticCurveTo(x0 + 30, y0 + 40, x0 + 60 * (hash(i + 4) - .5), y0 + 80 + yas * 60); cizgi(g, 4, '#d0303a'); g.restore(); }
      g.save(); g.globalAlpha = .25 * Math.sin(dag * Math.PI); for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(-PAY, 500 + i * 180); g.bezierCurveTo(300, 450 + i * 180 - lt * 40, 700, 560 + i * 180, W + PAY, 480 + i * 180); cizgi(g, 10, '#ffffff'); } g.restore();
      isikHalesi(g, 540, 900, 900 * (1 - dag * .6), '255,50,40', .5, T); karanlik(g, 540, 1000, 350, 1300, .75, T);
    } },
  C3: { renk: 'normal', vinyet: .9, kam: KAM(540, 1000, 1.0, 1.06),
    ciz(g, lt, d, T) {
      g.fillStyle = '#0a0606'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      const son = aralik(lt, .4, .6);
      mum(g, 540, 1300, 1.4, T, son > 0 ? { sonuk: true, duman: aralik(lt, .5, 2.6) } : {});
      if (son <= 0) isikHalesi(g, 543, 1060, 600, '255,150,60', .5, T);
      karanlik(g, 540, 1100, 200, 900, .85, T);
    } },
  C4: { renk: 'normal', vinyet: .75, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .4, kas: 'saskin', gozAcik: .95, bebek: .8, bak: [0, .2], gulum: 0, konus: 0, kollar: { sag: { el: [18, 150], on: true } }, enUst: g => elMitt(g, 14, 150, 1.05, .3, NAZLI.ten) });
      isikHalesi(g, 880, 560, 500, '200,210,255', .25, T); karanlik(g, 540, 800, 350, 1200, .6, T);
    } },
  C5: { renk: 'normal', vinyet: .7, kam: KAM(540, 790, 1.0, 1.14),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .3, kas: 'uzgun', gozAcik: .9, bak: [.6, 0], gulum: .15, yas: .9, yasDamla: aralik(lt, .5, d) });
      isikHalesi(g, 880, 560, 500, '200,210,255', .3, T); karanlik(g, 540, 800, 400, 1300, .5, T);
    } },
  C6: { renk: 'normal', vinyet: .7, kam: KAM(540, 800, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      haticeSimdi(g, T, { x: 540, y: 800, s: 2.1, gozAcik: .8, kas: 'uzgun', gulum: .25, bak: [-.6, 0], yas: 1, yasDamla: aralik(lt, .3, d), solgun: false });
      isikHalesi(g, 880, 560, 500, '200,210,255', .3, T); karanlik(g, 540, 800, 400, 1300, .5, T);
    } },
  C7: { renk: ['normal', 'sicak', .4], vinyet: .6, kam: KAM(560, 860, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.3, merkez: [540, 800], blur: 3 });
      haticeSimdi(g, T, { x: 700, y: 790, s: 1.6, gozAcik: .6, kas: 'uzgun', gulum: .25, bak: [-.7, .2], don: -.4, egim: -.08, yas: 1, solgun: false, kollar: { sol: { gizli: true } } });
      N(g, T, { x: 420, y: 830, s: 1.6, morluk: .2, kas: 'uzgun', gozAcik: .55, bak: [.6, .1], don: .35, egim: .06, gulum: .2, yas: .8, konus: 0 });
      g.save(); g.translate(700 - 100 * 1.6, 790 + 152 * 1.6); g.scale(1.6, 1.6); kol(g, [0, 0], [(300 - 540) / 1.6, (1010 - 1033) / 1.6], { renk: HATICE.kolRenk, ten: HATICE.ten, bukum: -1, kalin: 44, mansetRenk: HATICE.manset, bilezik: true, bilezikSay: 3 }); g.restore();
      isikHalesi(g, 880, 560, 600, '255,220,180', .3, T); karanlik(g, 560, 850, 450, 1300, .4, T);
    } },

  // ═════ SAHNE 4 · SABAH ═════
  D1: { renk: 'sicak', giris: .6, vinyet: .35, kam: KAM(540, 980, 1.0, 1.06),
    ciz(g, lt, d, T) {
      const ac = ease(aralik(lt, 3.4, 4.6));
      arka(g, 'antre', antreDuvar); antreKapi(g, ac); antreKapiKanat(g, ac);
      N(g, T, { x: 300, y: 860, s: 1.25, kas: 'normal', gulum: .1, gozAcik: .8, bak: [.8, 0], don: .4, konus: 0 });
      g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = .1; g.fillStyle = '#fff3d0'; poly(g, [[600, 0], [900, 0], [500, H], [100, H]]); g.fill(); g.restore();
    } },
  D2: { renk: 'sicak', vinyet: .35, kam: KAM(540, 800, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'antre', antreDuvar, { olcek: 1.4, merkez: [540, 800], blur: 3 });
      EM(g, T, { x: 540, y: 800, s: 2.0, kas: 'uzgun', gozAcik: .95, bak: [-.3, 0], gulum: .35, yas: .7 });
    } },
  D3: { renk: 'sicak', vinyet: .35, kam: KAM(560, 900, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'antre', antreDuvar, { olcek: 1.15, merkez: [540, 800], blur: 1.5 });
      g.save(); g.translate(700 - 108 * 1.3, 690 + 152 * 1.3); g.scale(1.3, 1.3); kol(g, [0, 0], [(318 - 559) / 1.3, (975 - 888) / 1.3], { renk: EMRE.kolRenk, ten: EMRE.ten, bukum: -1, kalin: 48, mansetRenk: EMRE.manset, basparmak: 1 }); g.restore();
      EM(g, T, { x: 700, y: 690, s: 1.3, don: -.35, bak: [-.75, .35], gulum: .5, kas: 'mutlu', egim: -.05, gozAcik: .5, kollar: { sol: { gizli: true }, sag: { gizli: true } } });
      N(g, T, { x: 430, y: 770, s: 1.3, don: .35, bak: [.7, -.25], gulum: .5, gozAcik: .2, mutluGoz: true, kas: 'uzgun', egim: .04, yas: .8, kollar: { sag: { el: [118, 410] }, sol: { el: [-125, 415] } } });
      g.save(); g.translate(322, 968); g.scale(1.3, 1.3); g.rotate(.9); el(g, 0, 0, 23, 27); dol(g, EMRE.ten[0]); cizgi(g); g.restore();
    } },
  D4: { renk: ['sicak', 'normal', .4], vinyet: .5, kam: KAM(560, 900, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.15, merkez: [540, 700], blur: 2 });
      soba(g, 290, 1250, 1.0, T, { yastik: true });
      haticeSimdi(g, T, { x: 760, y: 780, s: 1.4, gozAcik: .7, kas: 'kizgin', gulum: -.05, bak: [-.7, .4], don: -.35, solgun: false });
    } },
  D5: { renk: ['normal', 'korku', .5], vinyet: .8, kam: KAM(540, 1020, 1.0, 1.35),
    ciz(g, lt, d, T) { kuller(g, T, ease(aralik(lt, 1.0, 3.0)) * (.85 + .15 * Math.sin(T * 5))); } },
  D6: { renk: 'normal', vinyet: 0, ekran: true,
    ciz(g, lt, d, T) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); if (lt > .03 && lt < .16) { g.fillStyle = 'rgba(150,10,20,.45)'; g.fillRect(0, 0, W, H); } } },
  D7: { renk: 'normal', vinyet: 0, ekran: true, ciz: soruKarti7 },
};
