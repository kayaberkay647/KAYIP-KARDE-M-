// YASTIĞIMDAKİ MUSKA — 4. Bölüm: "Mezarlık Sokağı" çekimleri
'use strict';

const yrep = id => ZAMAN.replikler.find(r => r.id === id);

// ───────────── bölüme özel yardımcılar ─────────────
function mumluOda(g, T, o = {}) { // Gülizar'ın odası: duvar + tavandan sarkan iplikler
  arka(g, 'buyu', buyuDuvar, o.arka || {});
  tavanIpleri(g, T, { n: o.n ?? 38, derinlik: true });
}
function defterCekim(g, lt, yazi, arkaFn) {
  arkaFn(g);
  const k = easeOut(aralik(lt, 0, .5));
  defter(g, 540, lerp(1400, 980, k), 1.7, yazi, -.04);
  for (const s of [-1, 1]) { g.beginPath(); g.moveTo(540 + s * 360, lerp(1500, 1080, k)); g.lineTo(540 + s * 520, H + PAY); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = NAZLI.kolRenk; g.stroke(); elMitt(g, 540 + s * 385, lerp(1420, 1000, k), 2.2, s * -1.2, NAZLI.ten, s); }
}
function haticeBilegi(g, hx, hy, say, isilti = 0) { // sağdan uzanan Hatice kolu, bilezik sayısı ayarlı
  const sx = 1320, sy = 620;
  g.save(); g.translate(sx, sy); g.scale(2.6, 2.6); kol(g, [0, 0], [(hx - sx) / 2.6, (hy - sy) / 2.6], { renk: HATICE.kolRenk, ten: HATICE.ten, bilezik: say > 0, bilezikSay: say, kalin: 46, mansetRenk: HATICE.manset, basparmak: -1 }); g.restore();
  if (isilti > 0) isikHalesi(g, hx + 90, hy - 40, 260, '255,215,120', .35 * isilti);
}
function nazliEli(g, hx, hy, aci = -.6) { // soldan uzanan Nazlı eli
  g.beginPath(); g.moveTo(hx - 30, hy + 20); g.lineTo(-PAY - 100, hy + 300); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = NAZLI.kolRenk; g.stroke();
  elMitt(g, hx, hy, 2.4, aci, NAZLI.ten);
}
function ipEtiketi(g, T, x, uz) { // Nazlı'nın kaderi: saçlı, düğümlü iplik + "NAZLI" etiketi
  const sw = Math.sin(T * 1.1) * 14;
  g.beginPath(); g.moveTo(x, -PAY); g.quadraticCurveTo(x + sw * .5, uz * .5, x + sw, uz); cizgi(g, 12, '#2a0508'); g.beginPath(); g.moveTo(x, -PAY); g.quadraticCurveTo(x + sw * .5, uz * .5, x + sw, uz); cizgi(g, 8, '#b01f28');
  g.beginPath(); g.moveTo(x - 6, 80); g.bezierCurveTo(x + 30, 300, x - 30, 600, x + sw * .8, uz - 120); cizgi(g, 3.5, '#8d5837');
  for (let k = 0; k < 6; k++) { const yy = 180 + k * (uz - 300) / 6, xx = x + sw * (yy / uz); if (k === 0) { g.beginPath(); g.arc(xx, yy, 10, 0, TAU); g.setLineDash([4, 5]); cizgi(g, 2, '#e9a0a0'); g.setLineDash([]); continue; }
    el(g, xx, yy, 22, 18); dol(g, '#8e1820'); cizgi(g, 3, '#2a0508'); if (k === 1) isikHalesi(g, xx, yy, 120, '255,60,60', .4 + .2 * Math.sin(T * 6)); }
  g.save(); g.translate(x + sw, uz + 20); g.rotate(sw * .01); rr(g, -70, 0, 140, 110, 8); dol(g, '#e6d8b8'); cizgi(g, 4, '#4a3420');
  g.font = 'italic 600 44px "Lora", serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#a3141c'; g.fillText('Nazlı', 0, 58); g.restore();
}
function baslikKarti4(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .8)), cik = aralik(lt, d - .4, d);
  g.save(); g.globalAlpha = .5 * gir; tavanIpleri(g, T, { n: 22, derinlik: true }); g.fillStyle = 'rgba(5,2,3,.55)'; g.fillRect(0, 0, W, H); g.restore();
  g.save(); g.globalAlpha = gir * (1 - cik) * (.92 + .08 * Math.sin(lt * 37) * (lt < 1 ? 1 : 0));
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 88px "Lora"'; g.fillStyle = '#efe2cc'; g.letterSpacing = '6px'; g.fillText('YASTIĞIMDAKİ', W / 2, 790);
  g.font = '700 190px "Lora"'; g.lineWidth = 10; g.strokeStyle = '#1a0507'; g.strokeText('MUSKA', W / 2, 940); g.fillStyle = '#c0262f'; g.fillText('MUSKA', W / 2, 940);
  g.letterSpacing = '10px'; g.font = '700 40px "Lora"'; g.fillStyle = '#c9a98a'; g.fillText('4. BÖLÜM', W / 2, 1150);
  g.letterSpacing = '0px'; g.font = 'italic 600 62px "Lora"'; g.fillStyle = '#efe2cc'; g.fillText('Mezarlık Sokağı', W / 2, 1240);
  g.restore();
}
function soruKarti4(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .6)), sil = .25 + .2 * Math.sin(lt * 2);
  g.save(); g.globalAlpha = gir; g.translate(W / 2, 640); g.rotate(-.03);
  rr(g, -330, -280, 660, 520, 12); dol(g, '#c9a24f'); cizgi(g, 6); rr(g, -295, -245, 590, 450, 6); dol(g, '#efe6d6');
  g.save(); g.translate(-80, 60); g.globalAlpha = gir * sil;
  el(g, 0, -110, 46, 50); dol(g, '#f6d6c0'); el(g, 0, -126, 54, 38); dol(g, '#8d5837'); poly(g, [[-62, -56], [62, -56], [100, 150], [-100, 150]]); dol(g, '#ffffff'); cizgi(g, 3); g.restore();
  g.save(); g.translate(90, 56); g.globalAlpha = gir; el(g, 0, -114, 46, 50); dol(g, '#f6d6c0'); el(g, 0, -140, 50, 28); dol(g, '#2c211c'); rr(g, -62, -60, 124, 210, 12); dol(g, '#2b2b36'); cizgi(g, 3); g.restore();
  g.beginPath(); g.moveTo(-290, -150); g.bezierCurveTo(-120, -60, -60, 120, 10, 200); cizgi(g, 7, '#b01f28');
  g.restore();
  g.save(); g.globalAlpha = gir; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 74px "Lora"'; g.lineWidth = 12; g.strokeStyle = '#1a0507'; g.lineJoin = 'round';
  for (const [s, y] of [['Sizce Emre', 1150], ["Nazlı'yı", 1245], ['hatırlayacak mı?', 1340]]) { g.strokeText(s, W / 2, y); g.fillStyle = '#f5ead8'; g.fillText(s, W / 2, y); }
  g.font = 'italic 600 46px "Lora"'; g.fillStyle = '#d9b9a0'; g.fillText('Cevabını yorumlara yaz', W / 2, 1470);
  const oy = 1560 + Math.sin(lt * 5) * 14; g.beginPath(); g.moveTo(W / 2 - 34, oy); g.lineTo(W / 2, oy + 40); g.lineTo(W / 2 + 34, oy); cizgi(g, 10, '#c0262f');
  g.font = '700 38px "Lora"'; g.letterSpacing = '4px'; g.fillStyle = '#8a6a60'; g.fillText('SONRAKİ BÖLÜM: DÖRDÜNCÜ BİLEZİK', W / 2, 1720);
  g.restore();
}

// ───────────── ÇEKİMLER ─────────────
const CEKIM = {
  // ═════ SAHNE 1 · MEZARLIK SOKAĞI ═════
  A1: { renk: 'normal', vinyet: .6, giris: .25, kam: KAM(570, 1000, 1.0, 1.14),
    ciz(g, lt, d, T) { arka(g, 'sokak', mezarlikSokagi); mezarlikKapisi(g, ease(aralik(lt, .15, 2.6)), T); } },
  A2: { renk: 'normal', vinyet: .6, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'sokak', mezarlikSokagi, { olcek: 1.5, merkez: [570, 900], blur: 4 });
      isikHalesi(g, 560, 900, 700, '255,150,70', .25, T);
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'endise', gulum: -.15, gozAcik: .9, bak: [.2, -.25], konus: 0, isik: altIsik('255,160,90', .2) });
    } },
  A3: { renk: 'buyu', vinyet: .65, kam: (lt, d) => { const p = ease(lt / d); return { x: 540, y: lerp(700, 980, p), z: lerp(1.15, 1.0, p) }; },
    ciz(g, lt, d, T) {
      mumluOda(g, T);
      gulizar(g, { x: 540, y: 1080, s: .95, t: T, T, konus: 0 });
      arka(g, 'masa', g => masa(g)); mum(g, 760, 1330, .9, T); mum(g, 330, 1340, .7, T + 2);
      isikHalesi(g, 762, 1175, 600, '255,160,70', .5, T); karanlik(g, 600, 1100, 220, 1150, .8, T);
    } },
  A4: { renk: 'buyu', vinyet: .65, kam: KAM(560, 880, 1.0, 1.08),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.3, merkez: [540, 600], blur: 3 }, n: 26 });
      gulizar(g, { x: 480, y: 880, s: 1.55, t: T, T });
      const kalk = ease(aralik(lt, .3, 1.3));
      gulizarEl(g, lerp(700, 800, kalk), lerp(1250, 980, kalk), 1.1, lerp(Math.PI - .2, Math.PI + .7, kalk), { parmak: [-.22, -.07, .07, .22] });
      g.save(); g.filter = 'blur(5px)'; mum(g, 200, 1820, 1.7, T); g.restore();
      isikHalesi(g, 203, 1540, 950, '255,150,60', .6, T); karanlik(g, 400, 1250, 300, 1400, .82, T);
    } },
  A5: { renk: 'buyu', vinyet: .7, kam: KAM(560, 900, 1.0, 1.25),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.8, merkez: [540, 600], blur: 6 }, n: 16 });
      g.fillStyle = 'rgba(10,4,4,.45)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      ipEtiketi(g, T, 560, 1320);
      isikHalesi(g, 560, 900, 700, '255,150,70', .3, T); karanlik(g, 560, 900, 300, 1200, .6, T);
    } },
  T1: { renk: 'normal', vinyet: 0, ekran: true, ciz: baslikKarti4 },

  // ═════ SAHNE 2 · PAZARLIK ═════
  B1: { renk: 'buyu', vinyet: .55, kam: KAM(540, 980, 1.0, 1.1),
    ciz(g, lt, d, T) { defterCekim(g, lt, 'SESİMİ\nGERİ VER!', g => { arka(g, 'buyu', buyuDuvar, { olcek: 1.8, merkez: [540, 700], blur: 6 }); isikHalesi(g, 540, 1300, 900, '255,160,70', .4, T); }); karanlik(g, 540, 1000, 400, 1300, .55, T); } },
  B2: { renk: 'buyu', vinyet: .65, kam: KAM(540, 840, 1.0, 1.08),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.5, merkez: [540, 600], blur: 4 }, n: 18 });
      gulizar(g, { x: 540, y: 880, s: 2.15, t: T, T });
      g.save(); g.filter = 'blur(6px)'; mum(g, 170, 1880, 2.0, T); g.restore();
      isikHalesi(g, 173, 1550, 1000, '255,150,60', .55, T); karanlik(g, 400, 1250, 350, 1500, .8, T);
    } },
  B3: { renk: 'buyu', vinyet: .6, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.5, merkez: [540, 600], blur: 4 }, n: 18 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'kizgin', gulum: -.1, gozAcik: .82, bak: [-.3, 0], konus: 0, isik: altIsik('255,160,90', .3) });
      isikHalesi(g, 540, 1700, 900, '255,150,60', .4, T); karanlik(g, 540, 1300, 450, 1500, .6, T);
    } },
  B4: { renk: 'buyu', vinyet: .65, kam: KAM(540, 840, 1.08, 1.16),
    ciz(g, lt, d, T) { CEKIM.B2.ciz(g, lt, d, T); } },
  B5: { renk: ['buyu', 'korku', .3], vinyet: .75, kirmiziVinyet: true, kam: KAM(540, 900, 1.15, 1.4),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.5, merkez: [540, 600], blur: 4 }, n: 18 });
      gulizar(g, { x: 540, y: 900, s: 2.6, t: T, T });
      isikHalesi(g, 540, 1900, 1100, '255,150,60', .5, T); karanlik(g, 540, 1500, 400, 1500, .82, T);
    } },
  B6: { renk: 'ruya', vinyet: .7, kam: KAM(600, 960, 1.0, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.6, merkez: [540, 700], blur: 6 });
      haticeBilegi(g, 520, 1020, 4, .8 + .2 * Math.sin(lt * 4));
      g.fillStyle = 'rgba(30,10,10,.25)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
    } },
  B7: { renk: 'buyu', vinyet: .65, kam: KAM(540, 900, 1.0, 1.08),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.3, merkez: [540, 600], blur: 3 }, n: 20 });
      gulizar(g, { x: 540, y: 840, s: 1.55, t: T, T });
      dugumluIp(g, 300, 780, 1060, 8, { t: T, sacli: true, cozulmus: [0], cozulen: 1, cozulme: .3 });
      gulizarEl(g, 300, 1095, 1.0, Math.PI - .5, { parmak: [-.25, -.08, .08, .25] }); gulizarEl(g, 780, 1095, 1.0, Math.PI + .5, { parmak: [-.25, -.08, .08, .25] });
      g.save(); g.filter = 'blur(5px)'; mum(g, 200, 1820, 1.7, T); g.restore();
      isikHalesi(g, 203, 1540, 950, '255,150,60', .6, T); karanlik(g, 400, 1250, 300, 1400, .82, T);
    } },
  B8: { renk: 'buyu', vinyet: .65, kam: KAM(540, 790, 1.0, 1.12),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.5, merkez: [540, 600], blur: 4 }, n: 18 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'uzgun', gulum: -.25, gozAcik: 1.05, bebek: .6, bak: [0, .4], yas: .6, konus: 0, isik: altIsik('255,160,90', .3) });
      isikHalesi(g, 540, 1700, 900, '255,150,60', .4, T); karanlik(g, 540, 1300, 450, 1500, .6, T);
    } },

  // ═════ SAHNE 3 · BİLEZİK ═════
  C1: { renk: 'sicak', giris: .3, kam: KAM(540, 1000, 1.0, 1.06),
    ciz(g, lt, d, T) {
      const ac = ease(aralik(lt, .3, 1.2));
      arka(g, 'antre', antreDuvar); antreKapi(g, ac); antreKapiKanat(g, ac);
      if (ac > .15) HT(g, T, { x: 545, y: 720, s: 1.08, gulum: .6, gozAcik: .5, kas: 'mutlu', bak: [-.1, .2], kollar: { sol: { el: [-150, 250], on: true } } });
    } },
  C2: { renk: 'sicak', kam: KAM(540, 900, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.25, merkez: [300, 800], blur: 2.5 });
      EM(g, T, { x: 540, y: 790, s: 1.45, don: .3, bak: [.65, .05], gulum: -.2, gozAcik: .6, kas: 'normal' });
      arka(g, 'masa3', g => { yemekMasasi(g, 1400); cayBardagi(g, 380, 1450, .8); cayBardagi(g, 760, 1460, .8); });
    } },
  C3: { renk: 'sicak', vinyet: .5, kam: KAM(540, 980, 1.0, 1.1),
    ciz(g, lt, d, T) { defterCekim(g, lt, 'SANA\nANLATMAM\nGEREK!', g => arka(g, 'salon', haticeSalon, { olcek: 2, merkez: [540, 700], blur: 6 })); } },
  C4: { renk: 'sicak', kam: KAM(560, 900, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.2, merkez: [540, 800], blur: 2 });
      HT(g, T, { x: 560, y: 770, s: 1.4, don: -.2, bak: [-.5, .1], gulum: .1, kas: 'uzgun', gozAcik: .62, kollar: { sag: { el: [40, 290], on: true } } });
      arka(g, 'masa3', g => { yemekMasasi(g, 1400); cayBardagi(g, 380, 1450, .8); cayBardagi(g, 760, 1460, .8); });
    } },
  C5: { renk: ['sicak', 'normal', .4], vinyet: .55, kam: KAM(560, 980, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 2, merkez: [880, 700], blur: 6 });
      const cikan = Math.min(4, Math.floor(aralik(lt, .4, 3.4) * 4.99));
      kristalKase(g, 420, 1120, 1.6, cikan, T);
      haticeBilegi(g, lerp(700, 560, ease(aralik(lt, .2, .8))), 980, 4 - cikan);
    } },
  C6: { renk: ['normal', 'korku', .3], vinyet: .6, kam: (lt, d) => ({ x: 480 + (lt > 1.2 && lt < 1.35 ? gurultu(lt * 60, 3) * 12 : 0), y: 1080, z: lerp(1.05, 1.16, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 2, merkez: [880, 700], blur: 6 });
      const al = lt > 1.2, gel = ease(aralik(lt, .1, 1.1)), git = ease(aralik(lt, 1.35, 2.4));
      kristalKase(g, 420, 1120, 1.6, al ? 3 : 4, T);
      const hx = lerp(-100, 380, gel) - git * 520, hy = lerp(1300, 1060, gel) + git * 200;
      if (al) tekBilezik(g, hx + 30, hy - 10, 1.5, -.3);
      nazliEli(g, hx, hy, -.5);
    } },
  C7: { renk: 'korku', vinyet: .65, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.45, merkez: [880, 700], blur: 3 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'saskin', gulum: -.25, gozAcik: 1.12, bebek: .5, kirpma: false, bak: [.7, -.1], ter: .7, konus: 0, kollar: { sag: { el: [150, 470] } } });
    } },
  C8: { renk: ['sicak', 'korku', .4], vinyet: .6, kam: KAM(560, 980, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 2, merkez: [880, 700], blur: 6 });
      const tak = 1 + Math.min(2, Math.floor(aralik(lt, .35, 2.4) * 2.99));
      kristalKase(g, 300, 1220, 1.4, 0, T);
      haticeBilegi(g, 560, 960, tak);
    } },
  C9: { renk: 'korku', vinyet: .7, kam: KAM(540, 790, 1.0, 1.2),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.45, merkez: [540, 700], blur: 3 });
      HT(g, T, { x: 540, y: 790, s: 2.15, gulum: 0, gozAcik: .95, kirpma: false, bebek: .45, donuk: true, kas: 'kizgin', bak: [-.4, 0] });
    } },
  C10: { renk: 'korku', kam: KAM(540, 900, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.25, merkez: [300, 800], blur: 2.5 });
      EM(g, T, { x: 540, y: 790, s: 1.45, don: -.3, bak: [-.6, .05], gulum: -.15, gozAcik: .58, kas: 'normal' });
      arka(g, 'masa3', g => { yemekMasasi(g, 1400); cayBardagi(g, 380, 1450, .8); cayBardagi(g, 760, 1460, .8); });
    } },
  C11: { renk: 'korku', vinyet: .78, kirmiziVinyet: true, kam: KAM(540, 800, 1.05, 1.38),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 1.45, merkez: [540, 700], blur: 3 });
      HT(g, T, { x: 540, y: 800, s: 2.25, gulum: .4, gozAcik: .95, kirpma: false, bebek: .42, donuk: true, kas: 'normal', bak: [-.2, 0], egim: -.05 });
    } },

  // ═════ SAHNE 4 · GECE 03:00 ═════
  D1: { renk: 'gece', giris: .5, vinyet: .55, kam: KAM(480, 1000, 1.0, 1.07),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true));
      yastik(g, 360, 930, 330, 190, { t: T, gulX: 1e4 }); yastik(g, 730, 930, 330, 190, { t: T, gulX: 1e4 });
      N(g, T, { x: 365, y: 910, s: .72, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: .9, bak: [-.6, .3], kas: 'endise', gulum: -.15, sacUzun: 200, kiyafet: 'pijama', konus: 0 });
      arka(g, 'yatakOnGece', g => yatakOn(g, true));
      tekBilezik(g, 420, 1150, .9, .2); isikHalesi(g, 420, 1150, 160, '255,215,120', .3, T);
      dijitalSaat(g, 110, 950, .85, '03:00', true);
      g.save(); g.translate(110, 1040); g.scale(.18, .18); dugumluIp(g, -500, 500, 0, 6, { t: T, cozulmus: [0], cozulen: 1, cozulme: .5 }); g.restore();
    } },
  D2: { renk: ['gece', 'korku', .5], vinyet: .7, kam: (lt, d) => ({ x: 400, y: 960, z: lerp(2.3, 2.7, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'masaYakin', g => masa(g, -PAY));
      dugumluIp(g, -300, 1400, 960, 26, { t: T, sacli: true, cozulmus: [0], cozulen: 1, cozulme: .5 + .5 * ease(aralik(lt, .2, 2.6)) });
      karanlik(g, 400, 960, 200, 900, .6, T);
    } },
  D3: { renk: 'gece', vinyet: .65, kam: (lt, d) => ({ x: 540 + gurultu(lt * 40, 2) * 4, y: 960, z: 1.15 }),
    ciz(g, lt, d, T) {
      arka(g, 'masaYakin', g => masa(g, -PAY));
      const tit = Math.sin(lt * 60) * 6 * (Math.sin(lt * 4) > -.3 ? 1 : 0);
      telefon(g, 540 + tit, 960, 5.0, .05, '#3d5a7a', 'Emre\narıyor…');
      isikHalesi(g, 540, 960, 600, '140,180,255', .35, T); karanlik(g, 540, 960, 400, 1200, .6, T);
    } },
  D4: { renk: 'gece', vinyet: .65, kam: KAM(560, 900, 1.0, 1.08), ekYazi: { metin: '( ses çıkmıyor )', bas: .5, bit: 2.8 },
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true), { olcek: 1.6, merkez: [360, 900], blur: 4 });
      yastik(g, 540, 1080, 1060, 640, { t: T, gulX: 1e4 });
      N(g, T, { x: 470, y: 880, s: 1.75, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: 1.05, bebek: .6, kas: 'endise', bak: [.3, 0], gulum: -.1, sacUzun: 220, egim: -.1, konus: lt > .4 && lt < 2.6 ? Math.abs(Math.sin(lt * 7)) * .7 : 0,
        enUst: g => { telefon(g, 104, 16, 1.1, .12); elMitt(g, 112, 52, 1, -.2, NAZLI.ten); } });
    } },
  D5: { renk: ['gece', 'korku', .4], vinyet: .7, kam: KAM(560, 820, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'salonGece', g => { haticeSalon(g); g.fillStyle = 'rgba(10,12,30,.55)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); }, { olcek: 1.4, merkez: [700, 700], blur: 3 });
      g.save(); g.filter = 'brightness(.22) saturate(.4)'; HT(g, T, { x: 860, y: 600, s: 1.3, gozAcik: .9, kirpma: false, bebek: .5, bak: [-.6, .2], gulum: .3 }); g.restore();
      const h7 = yrep('H07'), konus = h7 && T >= h7.t0 && T <= h7.t1;
      if (konus) { for (const s of [-1, 1]) { el(g, 860 + s * 41 * 1.3 - 6, 600 + 20 * 1.3, 6, 3); dol(g, 'rgba(255,230,180,.8)'); } }
      EM(g, T, { x: 450, y: 830, s: 1.85, don: .1, bak: [.2, .05], kas: 'endise', gulum: -.1, gozAcik: .75, kollar: { sag: { el: [112, 60], on: true } },
        enUst: g => { telefon(g, 104, 16, 1.1, .12, '#3d5a7a'); elMitt(g, 112, 52, 1, -.2, EMRE.ten); } });
      isikHalesi(g, 500, 760, 380, '140,180,255', .3, T); karanlik(g, 500, 820, 300, 1200, .6, T);
    } },
  D6: { renk: 'gece', vinyet: .7, kam: KAM(560, 900, 1.0, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true), { olcek: 1.6, merkez: [360, 900], blur: 4 });
      yastik(g, 540, 1080, 1060, 640, { t: T, gulX: 1e4 });
      N(g, T, { x: 470, y: 880, s: 1.75, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: .7, kas: 'uzgun', bak: [.2, .4], gulum: -.35, sacUzun: 220, egim: -.1, yas: 1, yasDamla: aralik(lt, 0, d), konus: 0 });
    } },
  D7: { renk: 'normal', vinyet: 0, ekran: true,
    ciz(g, lt, d, T) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); if (lt > .03 && lt < .16) { g.fillStyle = 'rgba(150,10,20,.45)'; g.fillRect(0, 0, W, H); } } },
  D8: { renk: 'normal', vinyet: 0, ekran: true, ciz: soruKarti4 },
};
