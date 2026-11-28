// YASTIĞIMDAKİ MUSKA — 7. Bölüm: "Büyü Geri Döndü" (yeniden çekim: sade, gergin, doğal ses tonu)
'use strict';

const yrep = id => ZAMAN.replikler.find(r => r.id === id);

// ───────────── bölüme özel yardımcılar ─────────────
function depoIsik(g, T, x = 540, y = 1300, a = .7) { isikHalesi(g, x, y, 900, '255,150,70', .32, T); karanlik(g, x, y - 300, 350, 1300, a, T); }
function haticeSimdi(g, T, o) { return HT(g, T, Object.assign({ bilezikSay: 3, solgun: true, enUst: seyrekSac }, o)); }
function nazliEli(g, hx, hy, aci = -.6, renk = NAZLI.kolRenk) {
  g.beginPath(); g.moveTo(hx - 30, hy + 20); g.lineTo(-PAY - 100, hy + 300); g.lineCap = 'round'; g.lineWidth = 120 + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 120; g.strokeStyle = renk; g.stroke();
  elMitt(g, hx, hy, 2.4, aci, NAZLI.ten);
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
function catlaklar(g, x, y, s, miktar) { // Gülizar'ın yüzünde beliren çatlaklar
  if (miktar <= 0) return;
  g.save(); g.translate(x, y); g.scale(s, s); g.globalAlpha = clamp(miktar);
  const yollar = [[[-10, -80], [-30, -40], [-20, 0], [-50, 40]], [[20, -60], [40, -20], [30, 30], [60, 70]], [[0, 20], [-20, 60], [10, 100]], [[-60, -20], [-80, 20]], [[70, 0], [86, -40]]];
  yollar.slice(0, Math.ceil(miktar * yollar.length)).forEach(p => { g.beginPath(); g.moveTo(p[0][0], p[0][1]); p.slice(1).forEach(q => g.lineTo(q[0], q[1])); cizgi(g, 3, '#0a0405'); });
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
  if (o.kapak !== undefined) { const w = 300 * (1 - o.kapak); rr(g, -150 + (300 - w), -200, Math.max(w, 2), 230, 12); g.fillStyle = '#3a3434'; g.fill(); cizgi(g, 5, '#0d0b0b'); }
  rr(g, -180, 200, 40, 60, 6); dol(g, '#1a1616'); rr(g, 140, 200, 40, 60, 6); dol(g, '#1a1616');
  g.restore();
  isikHalesi(g, x, y - 80 * s, 500 * s, '255,150,60', .45 * (o.kapak !== undefined ? 1 - o.kapak * .7 : 1), t);
}
function kulYigini(g, T, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.beginPath(); g.moveTo(-320, 60); g.quadraticCurveTo(-200, -80, -40, -50); g.quadraticCurveTo(120, -110, 300, 40); g.quadraticCurveTo(0, 110, -320, 60); dol(g, '#151012'); cizgi(g, 4, '#050304');
  for (let i = 0; i < 40; i++) { el(g, (hash(i) - .5) * 560, -20 + hash(i + 3) * 80, 10 + hash(i + 5) * 22, 5 + hash(i + 7) * 8); dol(g, i % 3 ? '#5a5450' : '#3a3432'); }
  for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(-200 + i * 120, 20); g.bezierCurveTo(-160 + i * 120, 60, -240 + i * 130, 100, -180 + i * 140, 140); cizgi(g, 5, '#b01f28'); }
  g.restore();
}
function baslikKarti7(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .8)), cik = aralik(lt, d - .4, d);
  g.save(); g.globalAlpha = .9 * gir; dugumluIp(g, 80, 1000, 470, 12, { t: T, cozulmus: Array.from({ length: Math.floor(ease(aralik(lt, .3, 2.6)) * 12) }, (_, i) => i) }); g.restore();
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
  g.save(); g.globalAlpha = gir;
  haticeSimdi(g, T, { x: W / 2, y: 620, s: 1.75, konus: 0, gozAcik: .7, kirpma: false, bebek: .6, gulum: .35, kas: 'normal', bak: [-.3, .2], isik: altIsik('255,140,60', .45) });
  g.restore();
  g.fillStyle = dg(g, 0, 850, 0, 1100, [[0, 'rgba(5,2,3,0)'], [1, 'rgba(5,2,3,.96)']]); g.fillRect(0, 850, W, 1070);
  g.save(); g.globalAlpha = gir; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 74px "Lora"'; g.lineWidth = 12; g.strokeStyle = '#1a0507'; g.lineJoin = 'round';
  for (const [s, y] of [['Sizce Hatice', 1170], ['neden', 1262], ['gülümsedi?', 1354]]) { g.strokeText(s, W / 2, y); g.fillStyle = '#f5ead8'; g.fillText(s, W / 2, y); }
  g.font = 'italic 600 46px "Lora"'; g.fillStyle = '#d9b9a0'; g.fillText('Cevabını yorumlara yaz', W / 2, 1480);
  const oy = 1570 + Math.sin(lt * 5) * 14; g.beginPath(); g.moveTo(W / 2 - 34, oy); g.lineTo(W / 2, oy + 40); g.lineTo(W / 2 + 34, oy); cizgi(g, 10, '#c0262f');
  g.font = '700 38px "Lora"'; g.letterSpacing = '4px'; g.fillStyle = '#8a6a60'; g.fillText('SONRAKİ BÖLÜM: KIRK BİRİNCİ DÜĞÜM', W / 2, 1730);
  g.restore();
}
function ikiEl(g, kx, ky, s = 1) { // ipi tutan iki el, kollar kadrajın altından gelir
  for (const yon of [-1, 1]) {
    const hx = kx + yon * 58 * s, hy = ky + 34 * s;
    g.beginPath(); g.moveTo(hx, hy + 8 * s); g.lineTo(hx + yon * 230 * s, hy + 700 * s); g.lineCap = 'round';
    g.lineWidth = 62 * s + LW * 2; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 62 * s; g.strokeStyle = NAZLI.kolRenk; g.stroke();
    elMitt(g, hx, hy, 1.45 * s, yon < 0 ? -.35 : .35, NAZLI.ten, yon < 0 ? 1 : -1);
  }
}
const IP_N = 40;

// ───────────── ÇEKİMLER ─────────────
const CEKIM = {
  // ═════ SAHNE 1 · KAPIDAKİ GÜLİZAR ═════
  A1: { renk: ['normal', 'korku', .4], vinyet: .75, giris: .15, kam: KAM(540, 860, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'depoKapiAcik', g => depoKapi(g, 1, 0));
      gulizar(g, { x: 540, y: 760, s: 1.25, t: T, T });
      isikHalesi(g, 540, 1700, 700, '255,150,60', .35, T); karanlik(g, 540, 1000, 250, 1000, .78, T);
    } },
  A2: { renk: ['normal', 'korku', .3], vinyet: .7, kam: KAM(540, 800, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      haticeSimdi(g, T, { x: 540, y: 800, s: 2.1, gozAcik: .8, kirpma: false, bebek: .7, kas: 'kizgin', gulum: -.1, bak: [.5, 0], isik: altIsik('255,150,70', .3) });
      depoIsik(g, T, 540, 1700, .62);
    } },
  A3: { renk: ['normal', 'korku', .4], vinyet: .72, kam: KAM(540, 860, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      gulizar(g, { x: 540, y: 880, s: 2.1, t: T, T });
      isikHalesi(g, 540, 1900, 1000, '255,150,60', .42, T); karanlik(g, 540, 1300, 350, 1500, .78, T);
    } },
  A4: { renk: ['normal', 'korku', .3], vinyet: .7, kam: KAM(540, 880, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.3, merkez: [540, 800], blur: 3 });
      N(g, T, { x: 540, y: 800, s: 1.55, solgun: true, morluk: .55, kas: 'endise', gozAcik: .95, bebek: .7, bak: [.6, -.1], gulum: -.2, konus: 0,
        kollar: { sol: { el: [-150, 420], on: false } }, kolSonrasi: g => { g.save(); g.globalAlpha = .9; eskiFoto(g, -175, 470, .35, { aci: .4, cokEski: true, yazi: '' }); g.restore(); } });
      depoIsik(g, T, 540, 1600, .62);
    } },
  A5: { renk: ['buyu', 'korku', .3], vinyet: .78, kirmiziVinyet: true, kam: KAM(540, 880, 1.06, 1.22),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      gulizar(g, { x: 540, y: 900, s: 2.4, t: T, T });
      isikHalesi(g, 540, 1900, 1100, '255,150,60', .45, T); karanlik(g, 540, 1500, 400, 1500, .8, T);
    } },
  A6: { renk: ['normal', 'korku', .3], vinyet: .72, kam: KAM(600, 860, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.3, merkez: [540, 800], blur: 3 });
      N(g, T, { x: 280, y: 820, s: 1.35, solgun: true, morluk: .55, kas: 'endise', gozAcik: .95, bak: [.7, 0], don: .3, gulum: -.2, konus: 0 });
      haticeSimdi(g, T, { x: 740, y: 840, s: 1.8, gozAcik: .7, kirpma: false, bebek: .6, kas: 'normal', gulum: 0, bak: [-.85, .05], don: -.45 });
      depoIsik(g, T, 540, 1600, .62);
    } },
  T1: { renk: 'normal', vinyet: 0, ekran: true, ciz: baslikKarti7 },

  // ═════ SAHNE 2 · KIRK DÜĞÜM ═════
  B1: { renk: ['normal', 'korku', .25], vinyet: .7, kam: KAM(560, 880, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.3, merkez: [540, 800], blur: 3 });
      N(g, T, { x: 280, y: 830, s: 1.4, solgun: true, morluk: .55, kas: 'endise', gozAcik: .9, bak: [.75, -.05], don: .35, gulum: -.15, konus: 0 });
      haticeSimdi(g, T, { x: 740, y: 800, s: 1.55, gozAcik: .85, kas: 'kizgin', gulum: -.05, bak: [-.75, 0], don: -.35, kollar: { sol: { el: [-180, 300], on: true } } });
      depoIsik(g, T, 540, 1600, .62);
    } },
  B2: { renk: 'normal', vinyet: .7, kam: KAM(540, 940, 1.0, 1.15),
    ciz(g, lt, d, T) {
      g.fillStyle = '#1a0806'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      fotoArkasi(g, 540, 940, 2.0, 1); nazliEli(g, 300, 1320, -.6);
      isikHalesi(g, 540, 900, 700, '255,140,70', .32, T); karanlik(g, 540, 940, 400, 1100, .5, T);
    } },
  B3: { renk: ['buyu', 'korku', .4], vinyet: .78, kam: (lt, d) => ({ x: 540 + (lt < .3 ? gurultu(lt * 40, 2) * 8 : 0), y: 880, z: 1.12 }),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      gulizar(g, { x: 540, y: 900, s: 2.3, t: T, T });
      isikHalesi(g, 540, 1900, 1100, '255,90,50', .5, T); karanlik(g, 540, 1500, 400, 1500, .8, T);
    } },
  B4: { renk: ['normal', 'korku', .3], vinyet: .72, kam: (lt, d) => ({ x: lerp(160, 760, ease(lt / d)), y: 960, z: 1.8 }),
    ciz(g, lt, d, T) {
      arka(g, 'masaYakin', g => masa(g, -PAY));
      const ad = (1400 + 300) / (IP_N + 1), coz = Math.floor(aralik(lt, .3, d - .2) * 24);
      dugumluIp(g, -300, 1400, 960, IP_N, { t: T, sacli: true, cozulmus: Array.from({ length: coz }, (_, i) => i), cozulen: coz, cozulme: (aralik(lt, .3, d - .2) * 24) % 1 });
      const kx = -300 + ad * (coz + 1);
      ikiEl(g, kx, 960, 1);
      isikHalesi(g, kx, 960, 320, '255,140,70', .3, T); karanlik(g, kx, 960, 300, 900, .5, T);
    } },
  B5: { renk: ['buyu', 'korku', .4], vinyet: .78, kam: (lt, d) => ({ x: 540 + gurultu(lt * 20, 5) * 5, y: 880, z: 1.15 }),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      gulizar(g, { x: 540, y: 900, s: 2.3, t: T, T, konus: undefined });
      catlaklar(g, 540, 900 + 10 * 2.3, 2.3, .4 + .4 * aralik(lt, 0, d));
      isikHalesi(g, 540, 1900, 1100, '255,150,60', .4, T); karanlik(g, 540, 1500, 400, 1500, .8, T);
    } },
  B6: { renk: ['normal', 'korku', .3], vinyet: .72, kam: KAM(540, 800, 1.0, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      haticeSimdi(g, T, { x: 540, y: 800, s: 2.15, gozAcik: .72, kirpma: false, bebek: .6, kas: 'normal', gulum: .22, bak: [.4, -.05], isik: altIsik('255,150,70', .32) });
      depoIsik(g, T, 540, 1700, .62);
    } },
  B7: { renk: ['normal', 'korku', .4], vinyet: .75, kam: (lt, d) => ({ x: 540, y: 960, z: lerp(2.3, 2.7, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'masaYakin', g => masa(g, -PAY));
      dugumluIp(g, -300, 1400, 960, 26, { t: T, sacli: true, cozulmus: Array.from({ length: 26 }, (_, i) => i).filter(i => i !== 12), cozulen: 12, cozulme: ease(aralik(lt, .4, 2.6)) });
      ikiEl(g, 540, 960, .85);
      karanlik(g, 540, 960, 200, 900, .55, T);
    } },

  // ═════ SAHNE 3 · BİR AVUÇ KÜL ═════
  C1: { renk: ['buyu', 'korku', .4], vinyet: .8, kam: (lt, d) => ({ x: 540 + gurultu(lt * 20, 2) * 6 * aralik(lt, 1.6, 3), y: 900, z: 1.08 }),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.4, merkez: [540, 800], blur: 4 });
      const cok = ease(aralik(lt, 1.8, 4.4));
      g.save(); g.globalAlpha = 1 - cok; g.translate(0, cok * 260);
      gulizar(g, { x: 540, y: 860, s: 1.9, t: T, T }); catlaklar(g, 540, 880, 1.9, 1);
      g.restore();
      if (cok > .3) kulYigini(g, T, 540, 1500, 1.4 * clamp((cok - .3) / .7));
      for (let i = 0; i < 40; i++) { const yas = lt - 1.8 - hash(i) * 1.5; if (yas < 0 || yas > 2) continue; g.save(); g.globalAlpha = .7 * (1 - yas / 2); el(g, 360 + hash(i + 3) * 360, 700 + hash(i + 7) * 500 + yas * yas * 200, 4, 4); dol(g, '#8a8480'); g.restore(); }
      isikHalesi(g, 540, 1700, 900, '255,150,60', .38, T); karanlik(g, 540, 1100, 350, 1300, .75, T);
    } },
  C2: { renk: 'normal', vinyet: .75, kam: KAM(540, 1300, 1.2, 1.35),
    ciz(g, lt, d, T) { arka(g, 'depo', depoArka); kulYigini(g, T, 540, 1500, 1.4); isikHalesi(g, 880, 560, 500, '200,210,255', .2, T); karanlik(g, 540, 1300, 350, 1100, .62, T); } },
  C3: { renk: 'normal', vinyet: .7, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .4, kas: 'endise', gozAcik: .9, bak: [.5, .05], gulum: -.05, kollar: { sag: { el: [18, 150], on: true } }, enUst: g => elMitt(g, 14, 150, 1.05, .3, NAZLI.ten) });
      isikHalesi(g, 880, 560, 500, '200,210,255', .25, T); karanlik(g, 540, 800, 380, 1250, .55, T);
    } },
  C4: { renk: 'normal', vinyet: .7, kam: KAM(540, 800, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      haticeSimdi(g, T, { x: 540, y: 800, s: 2.1, gozAcik: .62, kas: 'uzgun', gulum: .2, bak: [-.5, .05] });
      isikHalesi(g, 880, 560, 500, '200,210,255', .25, T); karanlik(g, 540, 800, 380, 1250, .55, T);
    } },
  C5: { renk: 'normal', vinyet: .7, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .35, kas: 'uzgun', gozAcik: .8, bak: [.5, .1], gulum: .1, yas: .6, konus: 0 });
      isikHalesi(g, 880, 560, 500, '200,210,255', .25, T); karanlik(g, 540, 800, 380, 1250, .5, T);
    } },
  C6: { renk: 'normal', vinyet: .7, kam: KAM(560, 880, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.3, merkez: [540, 800], blur: 3 });
      haticeSimdi(g, T, { x: 560, y: 780, s: 1.5, gozAcik: .75, kas: 'normal', gulum: 0, bak: [0, .6],
        onGovde: g => yastik(g, 0, 330, 330, 210, { t: T, gulX: 110, gulY: 60, dikis: { x: 0, y0: -70, y1: 70 } }),
        kollar: { sol: { el: [-150, 330], on: true }, sag: { el: [150, 330], on: true } } });
      depoIsik(g, T, 540, 1500, .55);
    } },
  C7: { renk: 'normal', vinyet: .65, kam: KAM(540, 790, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'depo', depoArka, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      N(g, T, { x: 540, y: 790, s: 2.05, morluk: .3, kas: 'normal', gozAcik: .8, bak: [.5, .05], gulum: .25 });
      isikHalesi(g, 880, 560, 500, '200,210,255', .25, T); karanlik(g, 540, 800, 400, 1300, .45, T);
    } },

  // ═════ SAHNE 4 · SABAH ═════
  D1: { renk: 'sicak', giris: .5, vinyet: .35, kam: KAM(540, 1000, 1.0, 1.05),
    ciz(g, lt, d, T) {
      const ac = ease(aralik(lt, .2, 1.1));
      arka(g, 'antre', antreDuvar); antreKapi(g, ac); antreKapiKanat(g, ac);
      if (ac > .15) { const gir = ease(aralik(lt, .8, 2.0)); EM(g, T, { x: 545, y: lerp(700, 720, gir), s: lerp(1.0, 1.1, gir), kas: 'endise', gulum: -.05, gozAcik: .9, bak: [-.3, .1] }); }
    } },
  D2: { renk: 'sicak', vinyet: .35, kam: KAM(540, 780, 1.0, 1.06),
    ciz(g, lt, d, T) { arka(g, 'antre', antreDuvar, { olcek: 1.45, merkez: [400, 800], blur: 3 }); N(g, T, { x: 540, y: 780, s: 2.05, morluk: .25, kas: 'uzgun', gulum: .3, gozAcik: .75, bak: [.5, 0] }); } },
  D3: { renk: 'sicak', vinyet: .35, kam: KAM(560, 900, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'antre', antreDuvar, { olcek: 1.15, merkez: [540, 800], blur: 1.5 });
      g.save(); g.translate(700 - 108 * 1.3, 690 + 152 * 1.3); g.scale(1.3, 1.3); kol(g, [0, 0], [(318 - 559) / 1.3, (975 - 888) / 1.3], { renk: EMRE.kolRenk, ten: EMRE.ten, bukum: -1, kalin: 48, mansetRenk: EMRE.manset, basparmak: 1 }); g.restore();
      EM(g, T, { x: 700, y: 690, s: 1.3, don: -.35, bak: [-.75, .35], gulum: .3, kas: 'uzgun', egim: -.05, gozAcik: .7, kollar: { sol: { gizli: true }, sag: { gizli: true } } });
      N(g, T, { x: 430, y: 770, s: 1.3, don: .35, bak: [.7, -.25], gulum: .3, gozAcik: .6, kas: 'uzgun', egim: .04, kollar: { sag: { el: [118, 410] }, sol: { el: [-125, 415] } } });
      g.save(); g.translate(322, 968); g.scale(1.3, 1.3); g.rotate(.9); el(g, 0, 0, 23, 27); dol(g, EMRE.ten[0]); cizgi(g); g.restore();
    } },
  D4: { renk: ['sicak', 'normal', .4], vinyet: .45, kam: KAM(560, 900, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'mutfak', mutfakArka, { olcek: 1.15, merkez: [540, 700], blur: 2 });
      soba(g, 290, 1250, 1.0, T, { yastik: true });
      haticeSimdi(g, T, { x: 760, y: 780, s: 1.4, gozAcik: .7, kas: 'normal', gulum: 0, bak: [-.7, .4], don: -.35, solgun: false });
    } },
  D5: { renk: ['normal', 'korku', .3], vinyet: .75, kam: KAM(540, 960, 1.0, 1.12),
    ciz(g, lt, d, T) {
      g.fillStyle = '#1a0e0a'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      const gul = ease(aralik(lt, 2.0, 3.2));
      soba(g, 250, 1360, 1.3, T, { kapak: ease(aralik(lt, .3, 1.4)) });
      haticeSimdi(g, T, { x: 730, y: 760, s: 1.85, gozAcik: lerp(.7, .55, gul), kirpma: false, bebek: .6, kas: 'normal', gulum: lerp(0, .38, gul), bak: [-.5, .3], don: -.2, solgun: false, isik: altIsik('255,140,60', .45) });
      karanlik(g, 520, 1100, 450, 1400, .6, T);
    } },
  D6: { renk: 'normal', vinyet: 0, ekran: true,
    ciz(g, lt, d, T) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); if (lt > .03 && lt < .16) { g.fillStyle = 'rgba(150,10,20,.4)'; g.fillRect(0, 0, W, H); } } },
  D7: { renk: 'normal', vinyet: 0, ekran: true, ciz: soruKarti7 },
};
