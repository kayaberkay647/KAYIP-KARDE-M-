// YASTIĞIMDAKİ MUSKA — 8. Bölüm: "Kırk Birinci Düğüm" (yeniden çekim: sade, net ses tonu)
'use strict';

const yrep = id => ZAMAN.replikler.find(r => r.id === id);

// ───────────── bölüme özel yardımcılar ─────────────
function nazliEli(g, hx, hy, aci = -.6, renk = NAZLI.kolRenk) {
  g.beginPath(); g.moveTo(hx - 30, hy + 20); g.lineTo(-PAY - 100, hy + 300); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = renk; g.stroke();
  elMitt(g, hx, hy, 2.4, aci, NAZLI.ten);
}
function haticeBilegi(g, hx, hy, say, dugum = true, sx = 1320, sy = 620) {
  g.save(); g.translate(sx, sy); g.scale(2.6, 2.6);
  const [ex, ey, a] = kol(g, [0, 0], [(hx - sx) / 2.6, (hy - sy) / 2.6], { renk: HATICE.kolRenk, ten: HATICE.ten, bilezik: say > 0, bilezikSay: say, kalin: 46, mansetRenk: HATICE.manset, basparmak: -1 });
  if (dugum) { g.translate(ex, ey); g.rotate(a - Math.PI / 2); el(g, 0, -44, 30, 7); g.lineWidth = 5; g.strokeStyle = '#d0303a'; g.stroke(); el(g, 22, -44, 8, 7); dol(g, '#b01f28'); cizgi(g, 2, '#3a0508'); }
  g.restore();
  if (dugum) isikHalesi(g, hx + 60, hy - 60, 220, '255,40,40', .3);
}
function soba(g, x, y, s, t, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -40, -900, 80, 600, 10); dol(g, '#2a2626'); cizgi(g, 5, '#0d0b0b');
  rr(g, -220, -320, 440, 520, 30); g.fillStyle = dg(g, -220, 0, 220, 0, [[0, '#3a3434'], [.5, '#5a5252'], [1, '#2a2626']]); g.fill(); cizgi(g, 6, '#0d0b0b');
  rr(g, -150, -200, 300, 230, 16); dol(g, '#120806'); cizgi(g, 5, '#0d0b0b');
  g.save(); g.beginPath(); g.roundRect(-150, -200, 300, 230, 16); g.clip();
  if (o.kul) { for (let i = 0; i < 30; i++) { el(g, -130 + hash(i) * 260, -10 + hash(i + 3) * 40, 14 + hash(i + 5) * 20, 6 + hash(i + 7) * 8); dol(g, i % 3 ? '#4a4440' : '#2e2826'); } for (let i = 0; i < 10; i++) { el(g, -120 + hash(i + 40) * 240, 5 + hash(i + 41) * 20, 3, 3); dol(g, '#ff8a3a'); } }
  else for (let i = 0; i < 7; i++) { const fx = -110 + i * 36, h = 90 + gurultu(t * 4 + i, i) * 40; g.beginPath(); g.moveTo(fx - 26, 30); g.quadraticCurveTo(fx - 10, 30 - h * .6, fx + gurultu(t * 3, i) * 10, 30 - h); g.quadraticCurveTo(fx + 12, 30 - h * .6, fx + 26, 30); g.closePath(); g.fillStyle = i % 2 ? 'rgba(255,140,40,.9)' : 'rgba(255,200,80,.85)'; g.fill(); }
  if (o.yansima) o.yansima(g);
  g.restore();
  g.restore();
}
function kirmiziDugum(g, x, y, s, t) { isikHalesi(g, x, y, 220 * s, '255,30,30', .6); g.save(); g.translate(x, y); g.scale(s, s); g.beginPath(); g.moveTo(-60, 6); g.quadraticCurveTo(-30, -8, -16, 0); g.moveTo(16, 0); g.quadraticCurveTo(36, 10, 64, -4); cizgi(g, 5, '#7a1218'); el(g, 0, 0, 18, 14); dol(g, '#d0303a'); cizgi(g, 3, '#3a0508'); g.beginPath(); g.moveTo(-12, -5); g.quadraticCurveTo(0, 7, 12, -5); cizgi(g, 3, '#ff6060'); g.restore(); }
function caydanlik(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -80, -40, 160, 130, 40); dol(g, '#c9cdd1'); cizgi(g, 4); g.beginPath(); g.moveTo(80, 0); g.quadraticCurveTo(140, 10, 150, -40); cizgi(g, 14, OUT); g.beginPath(); g.moveTo(80, 0); g.quadraticCurveTo(140, 10, 150, -40); cizgi(g, 8, '#c9cdd1');
  rr(g, -60, -110, 120, 80, 30); dol(g, '#dde1e4'); cizgi(g, 4); el(g, 0, -116, 16, 10); dol(g, '#2a2626');
  g.beginPath(); g.moveTo(-70, -30); g.quadraticCurveTo(0, -170, 70, -30); cizgi(g, 6, '#2a2626');
  g.restore();
}
function kahvaltiMasasi(g, T) {
  yemekMasasi(g, 1240);
  for (const [x, y] of [[230, 1330], [540, 1345], [850, 1330]]) { el(g, x, y, 120, 50); dol(g, '#fbfaf6'); cizgi(g, 4); el(g, x - 30, y - 6, 34, 18); dol(g, '#f3e7a8'); cizgi(g, 2.5); for (let k = 0; k < 4; k++) { el(g, x + 30 + k * 14, y + (k % 2) * 8, 8, 10); dol(g, '#2a2420'); } el(g, x + 10, y + 18, 22, 10); dol(g, '#c8452e'); }
  cayBardagi(g, 360, 1290, .7); cayBardagi(g, 700, 1290, .7); cayBardagi(g, 980, 1300, .7);
}
function salonGece(g) { haticeSalon(g); g.fillStyle = 'rgba(10,12,30,.6)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); }
const EMRE_BOS = { gozAcik: .85, kirpma: false, bebek: .3, donuk: true, gulum: 0, kas: 'normal' };
function HT3(g, T, o) { return HT(g, T, Object.assign({ bilezikSay: 3 }, o)); }
function haticeGece(g, T, o) { return HT3(g, T, Object.assign({ solgun: true, enUst: seyrekSac }, o)); }
function mutfakGece(g) { mutfakArka(g); g.fillStyle = 'rgba(10,12,30,.65)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); }
function kaynanaPortresi(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -220, -300, 440, 560, 10); dol(g, '#3a2414'); cizgi(g, 8); rr(g, -186, -266, 372, 492, 6); dol(g, '#9a8a6e');
  el(g, 0, -60, 90, 100); dol(g, '#c9b38e'); el(g, 0, -160, 60, 40); dol(g, '#6a6258'); el(g, 0, -110, 96, 60); dol(g, '#7a7268');
  for (const k of [-1, 1]) { el(g, k * 34, -60, 12, 6); dol(g, '#3a2a1a'); }
  g.beginPath(); g.moveTo(-26, 0); g.quadraticCurveTo(0, -8, 26, 0); cizgi(g, 5, '#3a2a1a');
  poly(g, [[-150, 60], [150, 60], [186, 226], [-186, 226]]); dol(g, '#3a3030');
  for (let i = 0; i < 4; i++) { el(g, -80 + i * 20, 200, 14, 6); g.lineWidth = 5; g.strokeStyle = '#c9a24f'; g.stroke(); }
  poly(g, [[110, -300], [220, -300], [220, -190]]); dol(g, '#0a0606'); g.beginPath(); g.moveTo(110, -300); g.lineTo(220, -190); cizgi(g, 18, '#0a0606');
  g.restore();
}
function mendil(g, x, y, s, kat) { // saç telini saran beyaz mendil
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(-.15);
  const w = lerp(220, 90, kat), h = lerp(220, 70, kat);
  rr(g, -w / 2, -h / 2, w, h, 8); dol(g, '#f4f0e8'); cizgi(g, 4);
  g.globalAlpha = .6; rr(g, -w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 4); cizgi(g, 2, '#c0262f'); g.globalAlpha = 1;
  if (kat < .6) { g.globalAlpha = 1 - kat / .6; sacTeli(g, -60, -20, 150, .2, .6, '#8d5837', 3.5); g.globalAlpha = 1; }
  g.restore();
}
function baslikKarti8(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .8)), cik = aralik(lt, d - .4, d);
  g.save(); g.globalAlpha = gir; kirmiziDugum(g, 540, 470, 2.6 + Math.sin(lt * 3) * .1, T); g.restore();
  g.save(); g.globalAlpha = gir * (1 - cik) * (.92 + .08 * Math.sin(lt * 37) * (lt < 1 ? 1 : 0));
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 88px "Lora"'; g.fillStyle = '#efe2cc'; g.letterSpacing = '6px'; g.fillText('YASTIĞIMDAKİ', W / 2, 790);
  g.font = '700 190px "Lora"'; g.lineWidth = 10; g.strokeStyle = '#1a0507'; g.strokeText('MUSKA', W / 2, 940); g.fillStyle = '#c0262f'; g.fillText('MUSKA', W / 2, 940);
  g.letterSpacing = '10px'; g.font = '700 40px "Lora"'; g.fillStyle = '#c9a98a'; g.fillText('8. BÖLÜM', W / 2, 1150);
  g.letterSpacing = '0px'; g.font = 'italic 600 62px "Lora"'; g.fillStyle = '#efe2cc'; g.fillText('Kırk Birinci Düğüm', W / 2, 1240);
  g.restore();
}
function soruKarti8(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .6));
  g.save(); g.globalAlpha = gir;
  karakter(g, HATICE, { x: W / 2, y: 600, s: 1.7, t: T, T, konus: 0, gozAcik: .95, kirpma: false, bebek: .45, donuk: true, gulum: .45, kas: 'normal', bak: [0, 0] });
  g.restore();
  g.fillStyle = dg(g, 0, 850, 0, 1100, [[0, 'rgba(5,2,3,0)'], [1, 'rgba(5,2,3,.96)']]); g.fillRect(0, 850, W, 1070);
  g.save(); g.globalAlpha = gir; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 72px "Lora"'; g.lineWidth = 12; g.strokeStyle = '#1a0507'; g.lineJoin = 'round';
  for (const [s, y] of [['Sizce Nazlı', 1150], ['bu sefer', 1242], ['kurtulabilecek mi?', 1334]]) { g.strokeText(s, W / 2, y); g.fillStyle = '#f5ead8'; g.fillText(s, W / 2, y); }
  g.font = 'italic 600 46px "Lora"'; g.fillStyle = '#d9b9a0'; g.fillText('Cevabını yorumlara yaz', W / 2, 1460);
  const oy = 1550 + Math.sin(lt * 5) * 14; g.beginPath(); g.moveTo(W / 2 - 34, oy); g.lineTo(W / 2, oy + 40); g.lineTo(W / 2 + 34, oy); cizgi(g, 10, '#c0262f');
  g.font = '700 38px "Lora"'; g.letterSpacing = '4px'; g.fillStyle = '#8a6a60'; g.fillText('SONRAKİ BÖLÜM: KAYNANANIN OYUNU', W / 2, 1710);
  g.restore();
}

// ───────────── ÇEKİMLER ─────────────
const CEKIM = {
  // ═════ SAHNE 1 · KAYNANANIN PORTRESİ ═════
  A1: { renk: 'gece', vinyet: .72, giris: .15, kam: KAM(560, 860, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'mutfakGece', mutfakGece, { olcek: 1.2, merkez: [540, 700], blur: 2 });
      kaynanaPortresi(g, 250, 640, .75); mum(g, 250, 1010, .7, T);
      isikHalesi(g, 250, 900, 520, '255,170,80', .4, T);
      haticeGece(g, T, { x: 720, y: 820, s: 1.75, gozAcik: .75, kirpma: false, bebek: .6, kas: 'normal', gulum: .25, bak: [-.7, -.1], don: -.35, isik: altIsik('255,150,70', .35) });
      karanlik(g, 520, 900, 450, 1300, .55, T);
    } },
  A2: { renk: 'gece', vinyet: .78, kam: KAM(520, 900, 1.0, 1.16),
    ciz(g, lt, d, T) {
      g.fillStyle = '#20140e'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      kaynanaPortresi(g, 470, 860, 1.3); mum(g, 470 + 330 * 1.3, 860 + 300 * 1.3, .9, T);
      isikHalesi(g, 470 + 330 * 1.3, 860 + 300 * 1.3 - 150, 520, '255,170,80', .45, T);
      karanlik(g, 560, 1000, 320, 1100, .55, T);
    } },
  A3: { renk: 'gece', vinyet: .75, kam: KAM(560, 960, 1.05, 1.18),
    ciz(g, lt, d, T) {
      g.fillStyle = '#140c0a'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      g.save(); g.translate(540, 1000); g.scale(2.6, 2.6); g.translate(-540, -1000); soba(g, 540, 1080, 1.0, T, { kul: true }); g.restore();
      const al = ease(aralik(lt, 1.0, 3.2)), cek = ease(aralik(lt, 3.6, 5.0));
      kirmiziDugum(g, 560, lerp(1050, 760, cek), 2.2, T);
      haticeBilegi(g, lerp(1000, 640, al) - cek * 40, lerp(800, 1000, al) - cek * 280, 3, false);
      isikHalesi(g, 560, 1000, 700, '255,120,60', .3, T); karanlik(g, 560, 1000, 400, 1300, .35, T);
    } },
  A4: { renk: 'gece', vinyet: .75, kam: KAM(560, 980, 1.0, 1.1),
    ciz(g, lt, d, T) {
      g.fillStyle = '#140c0a'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      const bag = ease(aralik(lt, .3, 2.2));
      haticeBilegi(g, 560, 980, 3, bag > .5);
      if (bag <= .5) kirmiziDugum(g, lerp(380, 640, bag * 2), lerp(1200, 940, bag * 2), 1.2, T);
      nazliEli(g, lerp(300, 480, bag), lerp(1250, 1000, bag), -.6, HATICE.kolRenk);
      karanlik(g, 560, 980, 300, 1000, .5, T);
    } },
  A5: { renk: 'gece', vinyet: .78, kirmiziVinyet: true, kam: KAM(540, 800, 1.04, 1.2),
    ciz(g, lt, d, T) {
      arka(g, 'mutfakGece', mutfakGece, { olcek: 1.45, merkez: [500, 700], blur: 3 });
      haticeGece(g, T, { x: 540, y: 800, s: 2.2, gozAcik: .78, kirpma: false, bebek: .55, kas: 'normal', gulum: .3, bak: [0, .05], isik: altIsik('255,60,40', .4) });
      isikHalesi(g, 540, 1800, 900, '255,50,30', .45, T); karanlik(g, 540, 1300, 400, 1400, .65, T);
    } },
  T1: { renk: 'normal', vinyet: 0, ekran: true, ciz: baslikKarti8 },

  // ═════ SAHNE 2 · KAHVALTI ═════
  B1: { renk: 'sicak', giris: .4, kam: KAM(540, 960, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka);
      N(g, T, { x: 220, y: 810, s: 1.1, don: .35, bak: [.6, .1], gulum: .45, kas: 'mutlu', gozAcik: .7, konus: 0 });
      EM(g, T, { x: 860, y: 800, s: 1.1, don: -.35, bak: [-.6, .1], gulum: .45, kas: 'mutlu' });
      HT3(g, T, { x: 540, y: 740, s: 1.15, gulum: .5, gozAcik: .55, kas: 'mutlu', bak: [-.3, .2] });
      kahvaltiMasasi(g, T);
    } },
  B2: { renk: 'sicak', kam: KAM(560, 900, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.2, merkez: [540, 800], blur: 2 });
      HT3(g, T, { x: 600, y: 770, s: 1.45, don: -.3, gulum: .55, gozAcik: .55, kas: 'mutlu', bak: [-.6, .3],
        kollar: { sol: { el: [-170, 330], on: true } }, kolSonrasi: g => { caydanlik(g, -230, 330, .55); elMitt(g, -170, 330, 1, -1.2, HATICE.ten, -1); } });
      arka(g, 'masa3', g => { yemekMasasi(g, 1400); cayBardagi(g, 300, 1450, .9); cayBardagi(g, 780, 1460, .9); });
    } },
  B3: { renk: 'sicak', kam: KAM(540, 790, 1.0, 1.06),
    ciz(g, lt, d, T) { arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [650, 700], blur: 3 }); EM(g, T, { x: 540, y: 790, s: 2.0, don: -.2, bak: [-.6, .05], kas: 'mutlu', gulum: .6, gozAcik: .7 }); } },
  B4: { renk: 'sicak', kam: KAM(540, 780, 1.0, 1.08),
    ciz(g, lt, d, T) { arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [450, 700], blur: 3 }); N(g, T, { x: 540, y: 780, s: 2.05, kas: 'mutlu', gulum: .5, bak: [.5, .05], gozAcik: .75 }); } },
  B5: { renk: 'sicak', kam: KAM(540, 800, 1.0, 1.14),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [560, 700], blur: 3 });
      HT3(g, T, { x: 540, y: 800, s: 2.1, gulum: .45, gozAcik: .6, kas: 'mutlu', bak: [-.4, .15], konus: 0 });
    } },
  B6: { renk: 'sicak', kam: KAM(480, 820, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.3, merkez: [450, 700], blur: 2.5 });
      N(g, T, { x: 420, y: 800, s: 1.7, kas: 'mutlu', gulum: .4, bak: [.5, 0], gozAcik: .7, don: .25, konus: 0 });
      const al = ease(aralik(lt, .6, 1.6)), cek = ease(aralik(lt, 2.0, 3.0));
      const hx = lerp(900, 620, al) + cek * 140, hy = lerp(900, 1030, al) - cek * 240;
      if (al > .9) sacTeli(g, hx - 40, hy + 10, 150, 1.9 - cek * .8, .5, '#8d5837', 3.5);
      haticeBilegi(g, hx, hy, 3, true, 1320, 700);
    } },
  B7: { renk: 'sicak', kam: KAM(540, 780, 1.0, 1.08),
    ciz(g, lt, d, T) { arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [450, 700], blur: 3 }); N(g, T, { x: 540, y: 780, s: 2.05, kas: 'mutlu', gulum: .4, bak: [.5, .05], gozAcik: .75 }); } },
  B8: { renk: ['sicak', 'korku', .25], vinyet: [.35, .55], kam: KAM(540, 790, 1.0, 1.16),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.45, merkez: [560, 700], blur: 3 });
      HT3(g, T, { x: 540, y: 800, s: 2.15, gulum: .45, gozAcik: .62, kas: 'mutlu', bak: [-.2, 0],
        kollar: { sag: { el: [150, 60], on: true } }, enUst: g => { sacTeli(g, 150, 30, 150, Math.PI / 2 + .1, .3, '#8d5837', 3); elMitt(g, 150, 40, 1.05, Math.PI + .2, HATICE.ten, -1); } });
    } },
  B9: { renk: ['sicak', 'korku', .4], vinyet: .6, kam: KAM(560, 960, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 2.0, merkez: [540, 900], blur: 6 });
      const kat = ease(aralik(lt, .5, 2.6)), cep = ease(aralik(lt, 3.0, 4.2));
      const hx = 580 + cep * 120, hy = 980 + cep * 260;
      haticeBilegi(g, hx, hy, 3, true, 1320, 640);
      mendil(g, hx - 90, hy - 50, 2.0, kat);
      karanlik(g, 560, 960, 400, 1200, .3, T);
    } },

  // ═════ SAHNE 3 · YENİ MUSKA ═════
  C0: { renk: 'gece', giris: .4, vinyet: .7, kam: KAM(540, 900, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'salonGece', salonGece);
      const yuru = ease(aralik(lt, 0, d));
      N(g, T, { x: lerp(260, 520, yuru), y: 830, s: 1.4, kiyafet: 'pijama', kas: 'endise', gulum: 0, gozAcik: .85, bak: [.6, 0], don: .3, konus: 0, egim: Math.sin(lt * 4) * .02 });
      isikHalesi(g, 980, 900, 420, '255,40,40', .3, T); karanlik(g, 520, 900, 300, 1100, .7, T);
    } },
  C1: { renk: 'gece', vinyet: .7, kam: KAM(540, 960, 1.0, 1.15),
    ciz(g, lt, d, T) {
      g.fillStyle = '#2a1a12'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      g.save(); g.translate(540, 960); g.scale(1.2, 1.2);
      rr(g, -420, -300, 840, 600, 16); dol(g, '#6a4228'); cizgi(g, 6); rr(g, -380, -260, 760, 520, 10); dol(g, '#3a2216'); cizgi(g, 4);
      g.save(); g.rotate(.12); rr(g, -320, -200, 280, 200, 6); dol(g, '#efe6d6'); cizgi(g, 3); g.restore();
      muskaCiz(g, 120, 40, 1.1, .2, { ipUzun: 150 });
      rr(g, -440, 280, 880, 80, 10); dol(g, '#8a5a3a'); cizgi(g, 6);
      g.restore();
      if (lt > 1.4) nazliEli(g, lerp(-100, 600, ease(aralik(lt, 1.4, 2.6))), lerp(1300, 1020, ease(aralik(lt, 1.4, 2.6))), -.5, '#c3b1dc');
      isikHalesi(g, 680, 1000, 500, '255,40,40', .35, T); isikHalesi(g, 540, 300, 800, '140,170,255', .2, T); karanlik(g, 540, 900, 300, 1200, .55, T);
    } },
  C2: { renk: ['gece', 'korku', .3], vinyet: .7, kam: (lt, d) => { const p = ease(aralik(lt, 2.0, 4.0)); return { x: 540, y: lerp(900, 1360, p), z: lerp(1.0, 1.4, p) }; },
    ciz(g, lt, d, T) {
      arka(g, 'masaYakin', g => masa(g, -PAY));
      muskaKagit(g, 540, 820, 1.15, 1, T);
      dugumluIp(g, -100, 1180, 1450, 14, { t: T, sacli: true });
      karanlik(g, 540, 900, 400, 1500, .55, T);
    } },
  C3: { renk: ['gece', 'korku', .3], vinyet: .72, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) { arka(g, 'salonGece', salonGece, { olcek: 1.45, merkez: [540, 700], blur: 3 }); N(g, T, { x: 540, y: 790, s: 2.05, kiyafet: 'pijama', kas: 'saskin', gozAcik: 1.1, bebek: .5, kirpma: false, bak: [0, .4], gulum: -.3, ter: .6 }); karanlik(g, 540, 800, 350, 1200, .55, T); } },
  C4: { renk: ['gece', 'korku', .4], vinyet: .78, kam: KAM(540, 900, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'odaKapiGece', g => { g.fillStyle = '#4a3a3e'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); rr(g, 270, 250, 540, 1500, 6); dol(g, '#4a3424'); cizgi(g); g.fillStyle = '#0d0a0c'; g.fillRect(300, 280, 480, 1470); g.fillStyle = '#3a2a22'; g.fillRect(-PAY, 1750, W + PAY * 2, H); });
      HT3(g, T, { x: 540, y: 640, s: 1.28, kirpma: false, gozAcik: .85, bebek: .5, bak: [-.3, .3], gulum: .35, kas: 'normal', bilezikSay: 3 });
      isikHalesi(g, 540, 900, 500, '255,60,40', .2, T); karanlik(g, 540, 1000, 300, 1100, .7, T);
    } },
  C5: { renk: ['gece', 'korku', .4], vinyet: .72, kam: KAM(540, 790, 1.0, 1.08),
    ciz(g, lt, d, T) { arka(g, 'salonGece', salonGece, { olcek: 1.45, merkez: [540, 700], blur: 3 }); N(g, T, { x: 540, y: 790, s: 2.05, kiyafet: 'pijama', kas: 'uzgun', gozAcik: 1.0, bebek: .6, bak: [.5, 0], gulum: -.3, yas: .7 }); karanlik(g, 540, 800, 350, 1200, .55, T); } },
  C6: { renk: 'korku', vinyet: .78, kirmiziVinyet: true, kam: KAM(540, 800, 1.0, 1.15),
    ciz(g, lt, d, T) { arka(g, 'salonGece', salonGece, { olcek: 1.45, merkez: [540, 700], blur: 3 }); HT3(g, T, { x: 540, y: 800, s: 2.15, gozAcik: .8, kirpma: false, bebek: .5, kas: 'normal', gulum: .45, bak: [-.4, 0] }); karanlik(g, 540, 800, 400, 1300, .5, T); } },
  C7: { renk: ['gece', 'korku', .4], vinyet: .72, kam: KAM(540, 790, 1.0, 1.06),
    ciz(g, lt, d, T) { arka(g, 'salonGece', salonGece, { olcek: 1.45, merkez: [540, 700], blur: 3 }); N(g, T, { x: 540, y: 790, s: 2.05, kiyafet: 'pijama', kas: 'kizgin', gozAcik: .95, bebek: .6, bak: [.5, 0], gulum: -.3, yas: .6 }); karanlik(g, 540, 800, 350, 1200, .55, T); } },
  C8: { renk: 'korku', vinyet: .8, kirmiziVinyet: true, kam: KAM(540, 800, 1.05, 1.3),
    ciz(g, lt, d, T) { arka(g, 'salonGece', salonGece, { olcek: 1.45, merkez: [540, 700], blur: 3 }); HT3(g, T, { x: 540, y: 800, s: 2.25, gozAcik: .8, kirpma: false, bebek: .55, kas: 'normal', gulum: .2, bak: [-.3, 0] }); karanlik(g, 540, 800, 400, 1300, .5, T); } },
  C9: { renk: ['gece', 'korku', .4], vinyet: .72, kam: (lt, d) => ({ x: 540 + gurultu(lt * 25, 4) * 4, y: 790, z: 1.06 }),
    ciz(g, lt, d, T) { arka(g, 'salonGece', salonGece, { olcek: 1.45, merkez: [540, 700], blur: 3 }); N(g, T, { x: 540, y: 790, s: 2.05, kiyafet: 'pijama', kas: 'saskin', gozAcik: 1.1, bebek: .5, kirpma: false, bak: [-.8, 0], don: -.3, gulum: -.3, yas: .8 }); karanlik(g, 540, 800, 350, 1200, .55, T); } },
  C10: { renk: ['gece', 'korku', .5], vinyet: .78, kam: KAM(560, 880, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'salonGece', salonGece, { olcek: 1.2, merkez: [540, 800], blur: 2 });
      const gir = ease(aralik(lt, 0, 1.0));
      HT3(g, T, { x: 760, y: 760, s: 1.4, gozAcik: .85, kirpma: false, bebek: .5, gulum: .4, kas: 'normal', bak: [-.6, .1], don: -.3 });
      EM(g, T, Object.assign({ x: lerp(-100, 360, gir), y: 790, s: 1.45, don: .2, bak: [.1, 0],
        onGovde: g => yastik(g, 0, 330, 330, 210, { t: T, gulX: 110, gulY: 60, dikis: { x: -70, y0: -70, y1: 70 } }),
        kollar: { sol: { el: [-150, 330], on: true }, sag: { el: [150, 330], on: true } } }, EMRE_BOS));
      karanlik(g, 560, 900, 350, 1200, .6, T);
    } },
  C11: { renk: ['gece', 'korku', .5], vinyet: .75, kam: KAM(540, 790, 1.0, 1.12),
    ciz(g, lt, d, T) { arka(g, 'salonGece', salonGece, { olcek: 1.45, merkez: [540, 700], blur: 3 }); N(g, T, { x: 540, y: 790, s: 2.05, kiyafet: 'pijama', kas: 'saskin', gozAcik: 1.12, bebek: .45, kirpma: false, bak: [.6, 0], gulum: -.35, yas: 1, yasDamla: aralik(lt, 0, d), konus: 0 }); karanlik(g, 540, 800, 350, 1200, .55, T); } },
  C12: { renk: ['gece', 'korku', .5], vinyet: .78, kam: KAM(540, 900, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'salonGece', salonGece, { olcek: 1.2, merkez: [540, 800], blur: 2 });
      const yuru = ease(aralik(lt, 2.6, d));
      HT3(g, T, { x: 300, y: 770, s: 1.3, gozAcik: .8, kirpma: false, bebek: .5, gulum: .45, kas: 'normal', bak: [.7, .1], don: .4 });
      EM(g, T, Object.assign({ x: lerp(700, 1300, yuru), y: 790, s: 1.4, don: lerp(0, .5, yuru), bak: [.2, 0],
        onGovde: g => yastik(g, 0, 330, 330, 210, { t: T, gulX: 110, gulY: 60, dikis: { x: -70, y0: -70, y1: 70 } }),
        kollar: { sol: { el: [-150, 330], on: true }, sag: { el: [150, 330], on: true } } }, EMRE_BOS));
      karanlik(g, 540, 900, 350, 1200, .6, T);
    } },
  C13: { renk: 'korku', vinyet: .82, kirmiziVinyet: true, kam: KAM(540, 820, 1.05, 1.32),
    ciz(g, lt, d, T) { arka(g, 'salonGece', salonGece, { olcek: 1.45, merkez: [540, 700], blur: 3 }); HT3(g, T, { x: 540, y: 820, s: 2.5, gozAcik: .78, kirpma: false, bebek: .5, kas: 'normal', gulum: .35, bak: [0, 0] }); karanlik(g, 540, 820, 400, 1300, .5, T); } },
  D1: { renk: 'normal', vinyet: 0, ekran: true,
    ciz(g, lt, d, T) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); if (lt > .03 && lt < .16) { g.fillStyle = 'rgba(150,10,20,.45)'; g.fillRect(0, 0, W, H); } } },
  D2: { renk: 'normal', vinyet: 0, ekran: true, ciz: soruKarti8 },
};
