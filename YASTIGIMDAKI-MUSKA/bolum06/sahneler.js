// YASTIĞIMDAKİ MUSKA — 6. Bölüm: "Hatice'nin Çeyiz Sandığı" çekimleri
'use strict';

const yrep = id => ZAMAN.replikler.find(r => r.id === id);
const GH = (g, T, o) => karakter(g, GENC_HATICE, Object.assign({ t: T, T, konus: 0 }, o));

// ───────────── bölüme özel yardımcılar ─────────────
function mumluOda(g, T, o = {}) { arka(g, 'buyu', buyuDuvar, o.arka || {}); tavanIpleri(g, T, { n: o.n ?? 38, derinlik: true }); }
function defterCekim(g, lt, yazi, arkaFn) {
  arkaFn(g);
  const k = easeOut(aralik(lt, 0, .5));
  defter(g, 540, lerp(1400, 980, k), 1.7, yazi, -.04);
  for (const s of [-1, 1]) { g.beginPath(); g.moveTo(540 + s * 360, lerp(1500, 1080, k)); g.lineTo(540 + s * 520, H + PAY); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = NAZLI.kolRenk; g.stroke(); elMitt(g, 540 + s * 385, lerp(1420, 1000, k), 2.2, s * -1.2, NAZLI.ten, s); }
}
function haticeBilegi(g, hx, hy, say) {
  const sx = 1320, sy = 620;
  g.save(); g.translate(sx, sy); g.scale(2.6, 2.6); kol(g, [0, 0], [(hx - sx) / 2.6, (hy - sy) / 2.6], { renk: HATICE.kolRenk, ten: HATICE.ten, bilezik: say > 0, bilezikSay: say, kalin: 46, mansetRenk: HATICE.manset, basparmak: -1 }); g.restore();
}
function nazliEli(g, hx, hy, aci = -.6, renk = NAZLI.kolRenk) {
  g.beginPath(); g.moveTo(hx - 30, hy + 20); g.lineTo(-PAY - 100, hy + 300); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = renk; g.stroke();
  elMitt(g, hx, hy, 2.4, aci, NAZLI.ten);
}
function depoIsik(g, T, x = 540, y = 1300) { isikHalesi(g, x, y, 900, '255,70,50', .35, T); karanlik(g, x, y - 300, 350, 1300, .72, T); }
function haticeSimdi(g, T, o) { // saçları seyrelmiş, yorgun Hatice
  return HT(g, T, Object.assign({ bilezikSay: 3, solgun: true, enUst: seyrekSac }, o));
}
function kaynanaPortresi(g, x, y, s, mumSon) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -220, -300, 440, 560, 10); dol(g, '#3a2414'); cizgi(g, 8); rr(g, -186, -266, 372, 492, 6); dol(g, '#9a8a6e');
  el(g, 0, -60, 90, 100); dol(g, '#c9b38e'); el(g, 0, -160, 60, 40); dol(g, '#6a6258'); el(g, 0, -110, 96, 60); dol(g, '#7a7268');
  for (const k of [-1, 1]) { el(g, k * 34, -60, 12, 6); dol(g, '#3a2a1a'); }
  g.beginPath(); g.moveTo(-26, 0); g.quadraticCurveTo(0, -8, 26, 0); cizgi(g, 5, '#3a2a1a');
  poly(g, [[-150, 60], [150, 60], [186, 226], [-186, 226]]); dol(g, '#3a3030');
  for (let i = 0; i < 4; i++) { el(g, -80 + i * 20, 200, 14, 6); g.lineWidth = 5; g.strokeStyle = '#c9a24f'; g.stroke(); }
  poly(g, [[110, -300], [220, -300], [220, -190]]); dol(g, '#0a0606'); g.beginPath(); g.moveTo(110, -300); g.lineTo(220, -190); cizgi(g, 18, '#0a0606');
  g.restore();
  mum(g, x + 330 * s, y + 300 * s, .9, 0, mumSon ? { sonuk: true, duman: mumSon } : {});
}
function baslikKarti6(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .8)), cik = aralik(lt, d - .4, d);
  g.save(); g.globalAlpha = .45 * gir; sandikCiz(g, 540, 430, .55, ease(aralik(lt, .2, 2.0)), T); g.restore();
  g.save(); g.globalAlpha = gir * (1 - cik) * (.92 + .08 * Math.sin(lt * 37) * (lt < 1 ? 1 : 0));
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 88px "Lora"'; g.fillStyle = '#efe2cc'; g.letterSpacing = '6px'; g.fillText('YASTIĞIMDAKİ', W / 2, 790);
  g.font = '700 190px "Lora"'; g.lineWidth = 10; g.strokeStyle = '#1a0507'; g.strokeText('MUSKA', W / 2, 940); g.fillStyle = '#c0262f'; g.fillText('MUSKA', W / 2, 940);
  g.letterSpacing = '10px'; g.font = '700 40px "Lora"'; g.fillStyle = '#c9a98a'; g.fillText('6. BÖLÜM', W / 2, 1150);
  g.letterSpacing = '0px'; g.font = 'italic 600 60px "Lora"'; g.fillStyle = '#efe2cc'; g.fillText("Hatice'nin Çeyiz Sandığı", W / 2, 1240);
  g.restore();
}
function soruKarti6(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .6));
  g.save(); g.globalAlpha = gir; isikHalesi(g, W / 2, 600, 500, '255,80,60', .35); eskiFoto(g, W / 2 - 150, 640, 1.05, { aci: -.12, yazi: '1984' }); eskiFoto(g, W / 2 + 150, 620, 1.05, { aci: .1, cokEski: true, yazi: 'Gülizar · 1924' }); g.restore();
  g.save(); g.globalAlpha = gir; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 70px "Lora"'; g.lineWidth = 12; g.strokeStyle = '#1a0507'; g.lineJoin = 'round';
  for (const [s, y] of [['Sizce bu laneti', 1110], ['bitirmek', 1200], ['mümkün mü?', 1290]]) { g.strokeText(s, W / 2, y); g.fillStyle = '#f5ead8'; g.fillText(s, W / 2, y); }
  g.font = 'italic 600 46px "Lora"'; g.fillStyle = '#d9b9a0'; g.fillText('Cevabını yorumlara yaz', W / 2, 1420);
  const oy = 1510 + Math.sin(lt * 5) * 14; g.beginPath(); g.moveTo(W / 2 - 34, oy); g.lineTo(W / 2, oy + 40); g.lineTo(W / 2 + 34, oy); cizgi(g, 10, '#c0262f');
  g.font = '700 38px "Lora"'; g.letterSpacing = '4px'; g.fillStyle = '#8a6a60'; g.fillText('SONRAKİ BÖLÜM: BÜYÜ GERİ DÖNDÜ', W / 2, 1680);
  g.restore();
}

// ───────────── ÇEKİMLER ─────────────
const CEKIM = {
  // ═════ SAHNE 1 · ÇEYİZ SANDIĞI ═════
  A1: { renk: 'normal', vinyet: .7, giris: .3, kam: KAM(540, 1000, 1.0, 1.14),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka);
      const ac = ease(aralik(lt, .2, 2.6));
      sandikCiz(g, 540, 1180, 1.0, ac, T);
      for (const s of [-1, 1]) { const hx = 540 + s * 250, hy = lerp(1130, 830, ac); g.beginPath(); g.moveTo(hx, hy + 30); g.lineTo(540 + s * 300, H + PAY); g.lineCap = 'round'; g.lineWidth = 72 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 72; g.strokeStyle = NAZLI.kolRenk; g.stroke(); elMitt(g, hx, hy, 2.0, s * -.3 + Math.PI, NAZLI.ten, s); }
      depoIsik(g, T, 540, 1150);
    } },
  A2: { renk: 'normal', vinyet: .7, kam: (lt, d) => ({ x: 540 + (lt < .3 ? gurultu(lt * 40, 3) * 10 : 0), y: 790, z: lerp(1.08, 1.0, easeOut(lt / .6)) }),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'saskin', gozAcik: 1.1, bebek: .5, kirpma: false, bak: [.6, 0], don: .3, gulum: -.2, konus: 0, isik: altIsik('255,80,60', .35) });
      depoIsik(g, T, 540, 1700);
    } },
  A3: { renk: 'normal', vinyet: .75, kam: KAM(540, 900, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'depoKapi', g => depoKapi(g, 1, 0));
      haticeSimdi(g, T, { x: 540, y: 700, s: 1.2, gozAcik: .7, kas: 'uzgun', gulum: -.1, bak: [-.3, .3], kollar: { sag: { el: [60, 300], on: true } }, kolSonrasi: g => { mum(g, 60, 300, .45, T); elMitt(g, 60, 300, 1, 0, HATICE.ten); } });
      isikHalesi(g, 540 + 60 * 1.2, 700 + 260 * 1.2, 500, '255,170,80', .45, T); karanlik(g, 610, 1000, 220, 1000, .82, T);
    } },
  A4: { renk: 'normal', vinyet: .7, kam: KAM(540, 960, 1.0, 1.15),
    ciz(g, lt, d, T) {
      g.fillStyle = '#1a0806'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      gelinlikKatli(g, 360, 760, 1.4); yastik(g, 760, 1180, 520, 330, { t: T, aci: .08 });
      eskiFoto(g, 420, 1250, 1.05, { aci: -.15 });
      isikHalesi(g, 540, 1000, 900, '255,70,50', .4, T); karanlik(g, 540, 1000, 400, 1200, .55, T);
    } },
  A5: { renk: 'normal', vinyet: .7, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      haticeSimdi(g, T, { x: 540, y: 800, s: 2.1, gozAcik: .65, kas: 'uzgun', gulum: -.15, bak: [-.3, .1], isik: altIsik('255,170,80', .3) });
      isikHalesi(g, 540, 1500, 800, '255,170,80', .35, T); karanlik(g, 540, 1200, 450, 1400, .65, T);
    } },
  T1: { renk: 'normal', vinyet: 0, ekran: true, ciz: baslikKarti6 },

  // ═════ SAHNE 2 · 1984 ═════
  B1: { renk: 'normal', vinyet: .7, kam: KAM(540, 920, 1.0, 1.35),
    ciz(g, lt, d, T) { g.fillStyle = '#1a0806'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); isikHalesi(g, 540, 900, 700, '255,90,60', .35, T); eskiFoto(g, 540, 940, 2.4, { aci: -.04 }); karanlik(g, 540, 940, 400, 1100, .5, T); } },
  B2: { renk: 'sepya', giris: .4, vinyet: .75, kam: KAM(480, 1000, 1.0, 1.07),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true));
      yastik(g, 360, 930, 330, 190, { t: T }); yastik(g, 730, 930, 330, 190, { t: T, gulX: 1e4 });
      GH(g, T, { x: 365, y: 910, s: .72, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: .8, kas: 'endise', gulum: -.1, bak: [.5, -.2] });
      emreArkaKafa(g, 730, 900, .72);
      arka(g, 'yatakOnGece', g => yatakOn(g, true));
    } },
  B3: { renk: 'sepya', vinyet: .75, kam: KAM(540, 790, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'ruya', ruyaArka);
      GH(g, T, { x: 540, y: 790, s: 2.0, gozAcik: .85, kas: 'uzgun', gulum: -.3, bak: [0, .4], yas: 1, yasDamla: aralik(lt, 0, d), kollar: { sag: { el: [20, 150], on: true } }, enUst: g => elMitt(g, 16, 150, 1.05, .3, GENC_HATICE.ten) });
      for (let i = 0; i < 22; i++) { const dog = (i / 22) * d, yas = lt - dog; if (yas < 0 || yas > 2.4) continue; g.save(); g.globalAlpha = clamp(1 - yas / 2.4); sacTeli(g, 340 + hash(i) * 420, 500 + yas * yas * 260, 100 + hash(i) * 80, 1.4 + hash(i + 1), (hash(i + 2) - .5) * 2, '#5a3a28', 3.5); g.restore(); }
    } },
  B3B: { renk: 'sepya', vinyet: .75, kam: KAM(540, 800, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.5, merkez: [600, 800], blur: 4 });
      EM(g, T, { x: 540, y: 800, s: 1.95, konus: 0, kas: 'endise', gozAcik: .9, bak: [-.4, 0], gulum: -.1, ceket: true,
        enUst: g => { g.beginPath(); g.moveTo(-34, 74); g.quadraticCurveTo(0, 60, 34, 74); g.quadraticCurveTo(0, 82, -34, 74); dol(g, '#2c211c'); cizgi(g, 3, '#1a1310'); } });
    } },
  B4: { renk: 'normal', vinyet: .7, kam: KAM(540, 790, 1.02, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'uzgun', gozAcik: .9, bebek: .7, bak: [.5, .1], yas: .7, gulum: -.25, konus: 0, isik: altIsik('255,80,60', .3) });
      depoIsik(g, T, 540, 1700);
    } },
  B5: { renk: 'sepya', vinyet: .7, kam: KAM(560, 1020, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'salon', haticeSalon, { olcek: 2, merkez: [880, 700], blur: 6 });
      const al = lt > 2.0, gel = ease(aralik(lt, .3, 1.9)), git = ease(aralik(lt, 2.1, 3.2));
      kristalKase(g, 420, 1120, 1.6, al ? 3 : 4, T);
      const hx = lerp(-100, 380, gel) - git * 520, hy = lerp(1300, 1060, gel) + git * 200;
      if (al) tekBilezik(g, hx + 30, hy - 10, 1.5, -.3);
      nazliEli(g, hx, hy, -.5, GENC_HATICE.kolRenk);
    } },
  B6: { renk: 'sepya', vinyet: .75, kam: KAM(540, 940, 1.0, 1.12),
    ciz(g, lt, d, T) {
      g.fillStyle = '#2a1a12'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      const son = aralik(lt, d - 1.3, d - .4);
      kaynanaPortresi(g, 470, 880, 1.25, son > 0 ? son : 0);
      if (son <= 0) { isikHalesi(g, 470 + 330 * 1.25, 880 + 300 * 1.25 - 150, 500, '255,170,80', .45, T); }
      karanlik(g, 600, 1000, 300, 1100, .55 + son * .35, T);
    } },
  B7: { renk: 'normal', vinyet: .7, kam: KAM(560, 980, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 2, merkez: [540, 900], blur: 6 });
      haticeBilegi(g, 560, 980, 3);
      isikHalesi(g, 650, 950, 300, '255,210,120', .35 + .1 * Math.sin(T * 4)); karanlik(g, 600, 980, 300, 1100, .55, T);
    } },

  // ═════ SAHNE 3 · DÖNGÜ ═════
  C1: { renk: 'buyu', vinyet: .65, kam: KAM(540, 860, 1.0, 1.1), ciz(g, lt, d, T) { gulizarCekim(g, lt, d, T); } },
  C1B: { renk: 'normal', vinyet: .7, kam: KAM(540, 790, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'saskin', gozAcik: 1.08, bebek: .55, kirpma: false, bak: [0, .2], gulum: -.3, konus: 0, isik: altIsik('255,80,60', .3) });
      depoIsik(g, T, 540, 1700);
    } },
  C2: { renk: 'normal', vinyet: .72, kam: KAM(540, 790, 1.0, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      haticeSimdi(g, T, { x: 540, y: 800, s: 2.1, gozAcik: .7, kas: 'uzgun', gulum: -.1, bak: [-.4, .05], kirpma: false, isik: altIsik('255,170,80', .3) });
      isikHalesi(g, 540, 1500, 800, '255,170,80', .35, T); karanlik(g, 540, 1200, 450, 1400, .65, T);
    } },
  C3: { renk: 'normal', vinyet: .6, kam: KAM(540, 980, 1.0, 1.1),
    ciz(g, lt, d, T) { defterCekim(g, lt, 'BİTİRMENİN\nBİR YOLU\nVAR MI?', g => { arka(g, 'depo', depoArka, { olcek: 1.8, merkez: [540, 800], blur: 6 }); isikHalesi(g, 540, 1300, 900, '255,90,60', .35, T); }); karanlik(g, 540, 1000, 400, 1300, .5, T); } },
  C4: { renk: 'normal', vinyet: .72, kam: KAM(540, 800, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      haticeSimdi(g, T, { x: 540, y: 800, s: 2.1, gozAcik: .6, kas: 'uzgun', gulum: -.1, bak: [.2, .7], isik: altIsik('255,80,60', .3) });
      depoIsik(g, T, 540, 1700);
    } },
  C5: { renk: 'normal', vinyet: .72, kam: KAM(560, 1000, 1.0, 1.2),
    ciz(g, lt, d, T) {
      g.fillStyle = '#1a0806'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      g.save(); g.globalAlpha = .6; gelinlikKatli(g, 300, 600, 1.2); g.restore();
      const cek = ease(aralik(lt, .4, 2.2));
      eskiFoto(g, lerp(560, 540, cek), lerp(1500, 860, cek), lerp(.9, 1.8, cek), { aci: lerp(.3, -.03, cek), cokEski: true, yazi: 'Gülizar · 1924' });
      nazliEli(g, lerp(400, 300, cek), lerp(1560, 1200, cek), -.6);
      isikHalesi(g, 540, 1100, 900, '255,70,50', .4, T); karanlik(g, 540, 1050, 400, 1200, .5, T);
    } },
  C6: { renk: 'normal', vinyet: .72, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'saskin', gozAcik: 1.1, bebek: .5, kirpma: false, bak: [0, .5], gulum: -.25, konus: 0, isik: altIsik('255,80,60', .35) });
      depoIsik(g, T, 540, 1700);
    } },
  C7: { renk: ['normal', 'korku', .3], vinyet: .75, kam: KAM(540, 800, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      haticeSimdi(g, T, { x: 540, y: 800, s: 2.1, gozAcik: 1.08, bebek: .5, kirpma: false, kas: 'saskin', gulum: -.25, bak: [-.2, .4], isik: altIsik('255,80,60', .3) });
      depoIsik(g, T, 540, 1700);
    } },

  // ═════ SAHNE 4 · GÜLİZAR KAPIDA ═════
  D1: { renk: ['normal', 'korku', .4], vinyet: .75, kam: (lt, d) => ({ x: 540 + (lt > 1.2 ? gurultu(lt * 30, 2) * 4 : 0), y: 950, z: lerp(1.0, 1.08, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'depoKapiKapali', g => depoKapi(g, 0, 0));
      depoKapi(g, ease(aralik(lt, 1.2, 3.6)), T);
      const titre = gurultu(T * 9, 6);
      isikHalesi(g, 540, 1600, 700 * (1 + titre * .3), '255,150,60', .4, T); karanlik(g, 540, 1300, 300 + titre * 80, 1200, .78, T);
    } },
  D2: { renk: ['normal', 'korku', .5], vinyet: .8, kam: KAM(540, 860, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'depoKapiAcik', g => depoKapi(g, 1, 0));
      gulizar(g, { x: 540, y: 760, s: 1.25, t: T, T });
      isikHalesi(g, 540, 1700, 700, '255,150,60', .35, T); karanlik(g, 540, 1000, 250, 1000, .8, T);
    } },
  D2B: { renk: ['buyu', 'korku', .3], vinyet: .8, kirmiziVinyet: true, kam: KAM(540, 880, 1.08, 1.32),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      gulizar(g, { x: 540, y: 900, s: 2.5, t: T, T });
      isikHalesi(g, 540, 1900, 1100, '255,150,60', .5, T); karanlik(g, 540, 1500, 400, 1500, .82, T);
    } },
  D3: { renk: ['normal', 'korku', .5], vinyet: .78, kam: (lt, d) => ({ x: 540 + gurultu(lt * 25, 4) * 4, y: 860, z: 1.05 }),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.3, merkez: [540, 800], blur: 3 });
      haticeSimdi(g, T, { x: 720, y: 820, s: 1.55, gozAcik: 1.12, bebek: .45, kirpma: false, kas: 'saskin', gulum: -.3, bak: [-.2, -.2], don: -.2 });
      N(g, T, { x: 340, y: 850, s: 1.55, solgun: true, morluk: .55, kas: 'saskin', gozAcik: 1.12, bebek: .45, kirpma: false, bak: [.2, -.2], don: .2, gulum: -.3, konus: 0, kollar: { sag: { el: [150, 330], on: true } } });
      depoIsik(g, T, 540, 1600);
    } },
  D4: { renk: 'normal', vinyet: 0, ekran: true,
    ciz(g, lt, d, T) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); if (lt > .03 && lt < .16) { g.fillStyle = 'rgba(150,10,20,.45)'; g.fillRect(0, 0, W, H); } } },
  D5: { renk: 'normal', vinyet: 0, ekran: true, ciz: soruKarti6 },
};
