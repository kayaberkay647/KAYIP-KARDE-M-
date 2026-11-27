// YASTIĞIMDAKİ MUSKA — 5. Bölüm: "Dördüncü Bilezik" çekimleri
'use strict';

const yrep = id => ZAMAN.replikler.find(r => r.id === id);

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
function haticeTelefon(g) { telefon(g, -104, 16, 1.1, -.12, '#3d5a7a'); elMitt(g, -112, 52, 1, .2, HATICE.ten, -1); }
function salonGece(g) { haticeSalon(g); g.fillStyle = 'rgba(10,12,30,.6)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); }
function dolapIci(g) { g.fillStyle = '#140b07'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
  for (let i = 0; i < 6; i++) { const x = 60 + i * 190; g.beginPath(); g.moveTo(x, -PAY); g.lineTo(x, 200); cizgi(g, 5, '#2a1a12'); g.beginPath(); g.moveTo(x - 90, 220); g.quadraticCurveTo(x, 180, x + 90, 220); g.lineTo(x + 110, 1200); g.lineTo(x - 110, 1200); g.closePath(); g.fillStyle = ['#3a2a40', '#2a3a30', '#4a2a2a'][i % 3]; g.fill(); cizgi(g, 3, '#0a0604'); } }
function bilezikBuyusu(g, T, cx, cy, s, sarim) { // kırmızı iplikle sarılan bilezik
  isikHalesi(g, cx, cy, 420 * s, '255,210,120', .55);
  tekBilezik(g, cx, cy, 3.2 * s, -.15);
  const n = Math.floor(40 * clamp(sarim)); if (n < 2) return;
  g.beginPath(); for (let i = 0; i <= n; i++) { const a = i / 40 * TAU * 3 + T * .5, r = 150 * s; const x = cx + Math.cos(a) * r * .9, y = cy + Math.sin(a) * r * .36 + (i - 20) * 1.5 * s; i ? g.lineTo(x, y) : g.moveTo(x, y); } cizgi(g, 6, '#b01f28');
}
function baslikKarti5(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .8)), cik = aralik(lt, d - .4, d);
  g.save(); g.globalAlpha = .55 * gir; bilezikBuyusu(g, T, 540, 470, .8, aralik(lt, .2, 2.4)); g.restore();
  g.save(); g.globalAlpha = gir * (1 - cik) * (.92 + .08 * Math.sin(lt * 37) * (lt < 1 ? 1 : 0));
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 88px "Lora"'; g.fillStyle = '#efe2cc'; g.letterSpacing = '6px'; g.fillText('YASTIĞIMDAKİ', W / 2, 790);
  g.font = '700 190px "Lora"'; g.lineWidth = 10; g.strokeStyle = '#1a0507'; g.strokeText('MUSKA', W / 2, 940); g.fillStyle = '#c0262f'; g.fillText('MUSKA', W / 2, 940);
  g.letterSpacing = '10px'; g.font = '700 40px "Lora"'; g.fillStyle = '#c9a98a'; g.fillText('5. BÖLÜM', W / 2, 1150);
  g.letterSpacing = '0px'; g.font = 'italic 600 62px "Lora"'; g.fillStyle = '#efe2cc'; g.fillText('Dördüncü Bilezik', W / 2, 1240);
  g.restore();
}
function eskiFoto(g, x, y, s, a = 1) { // 1984: gelinlikli genç bir kadın
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(-.06); g.globalAlpha = a;
  rr(g, -150, -200, 300, 380, 6); dol(g, '#e9dcc0'); cizgi(g, 5, '#3a2416'); rr(g, -128, -178, 256, 300, 4); dol(g, '#bba98a');
  el(g, 0, -90, 46, 50); dol(g, '#d9c4a6'); el(g, 0, -112, 52, 30); dol(g, '#8a7a66');
  g.beginPath(); g.moveTo(-40, -150); g.quadraticCurveTo(0, -190, 40, -150); g.lineTo(90, 110); g.lineTo(-90, 110); g.closePath(); g.fillStyle = 'rgba(255,255,250,.55)'; g.fill();
  poly(g, [[-60, -40], [60, -40], [96, 110], [-96, 110]]); dol(g, '#f6f1e6');
  g.font = 'italic 600 30px "Lora", serif'; g.textAlign = 'center'; g.fillStyle = '#5a3a26'; g.fillText('1984', 0, 158);
  g.restore();
}
function soruKarti5(g, lt, d, T) {
  g.fillStyle = rg(g, W / 2, H * .45, 50, 1200, [[0, '#2a0d10'], [1, '#050203']]); g.fillRect(0, 0, W, H);
  const gir = easeOut(aralik(lt, 0, .6));
  g.save(); g.globalAlpha = gir; isikHalesi(g, W / 2, 600, 500, '255,80,60', .35); eskiFoto(g, W / 2, 620, 1.35); g.restore();
  g.save(); g.globalAlpha = gir; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '700 70px "Lora"'; g.lineWidth = 12; g.strokeStyle = '#1a0507'; g.lineJoin = 'round';
  for (const [s, y] of [['Sizce Hatice de', 1110], ['bir zamanlar', 1200], ['büyü kurbanı mıydı?', 1290]]) { g.strokeText(s, W / 2, y); g.fillStyle = '#f5ead8'; g.fillText(s, W / 2, y); }
  g.font = 'italic 600 46px "Lora"'; g.fillStyle = '#d9b9a0'; g.fillText('Cevabını yorumlara yaz', W / 2, 1420);
  const oy = 1510 + Math.sin(lt * 5) * 14; g.beginPath(); g.moveTo(W / 2 - 34, oy); g.lineTo(W / 2, oy + 40); g.lineTo(W / 2 + 34, oy); cizgi(g, 10, '#c0262f');
  g.font = '700 36px "Lora"'; g.letterSpacing = '4px'; g.fillStyle = '#8a6a60'; g.fillText("SONRAKİ BÖLÜM: HATİCE'NİN ÇEYİZ SANDIĞI", W / 2, 1680);
  g.restore();
}

// ───────────── ÇEKİMLER ─────────────
const CEKIM = {
  // ═════ SAHNE 1 · DOLAP ═════
  A1: { renk: 'soluk', vinyet: .7, giris: .2, kam: KAM(540, 820, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.2, merkez: [540, 900], blur: 1.5 });
      isikHalesi(g, 560, 800, 500, '255,230,200', .18, T);
      HT(g, T, { x: 560, y: 770, s: 1.5, gozAcik: lt < 2.4 ? .08 : .9, mutluGoz: false, kirpma: false, bebek: .5, kas: lt < 2.4 ? 'normal' : 'suphe', gulum: .2, bak: [-.4, 0], egim: Math.sin(lt * 1.4) * .05, kafaY: -6 });
      dolapPanjur(g, { kalin: 62 }); g.fillStyle = 'rgba(8,4,3,.12)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
    } },
  A2: { renk: 'soluk', vinyet: .75, kam: (lt, d) => ({ x: 540 + gurultu(lt * 25, 4) * 3, y: 800, z: lerp(1.04, 1.12, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      dolapIci(g);
      N(g, T, { x: 540 + gurultu(T * 18, 2) * 2, y: 800, s: 2.05, kiyafet: 'pijama', solgun: true, morluk: .55, kas: 'saskin', gozAcik: 1.1, bebek: .5, kirpma: false, bak: [.5, 0], ter: .8, gulum: -.25, konus: 0,
        kollar: { sag: { el: [15, 285], on: true } }, kolSonrasi: g => { tekBilezik(g, 10, 270, .55, .3); elMitt(g, 18, 286, 1, .4, NAZLI.ten); } });
      g.fillStyle = 'rgba(6,3,2,.45)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      isikSeritleri(g, .2);
    } },
  A2B: { renk: 'soluk', vinyet: .65, kam: KAM(560, 900, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.2, merkez: [540, 900], blur: 1.5 });
      const kok = ease(aralik(lt, .2, 1.2));
      HT(g, T, { x: 560, y: 760, s: 1.45, gozAcik: kok > .5 && lt < d - 1.2 ? .1 : .85, kirpma: false, bebek: .5, kas: 'suphe', gulum: .15, bak: [0, .4],
        onGovde: g => yastik(g, 0, lerp(380, 200, kok), 320, 200, { t: T, dikis: { x: -60, y0: -70, y1: 70 }, gulX: 1e4 }),
        kollar: { sol: { el: [-140, lerp(380, 200, kok)], on: true }, sag: { el: [140, lerp(380, 200, kok)], on: true } } });
    } },
  A3: { renk: 'soluk', vinyet: .6, kam: KAM(560, 880, 1.0, 1.08),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.25, merkez: [540, 900], blur: 2 });
      HT(g, T, { x: 560, y: 770, s: 1.5, gozAcik: .6, kas: 'suphe', gulum: .3, bak: [0, .6],
        kollar: { sol: { el: [-110, 290], on: true }, sag: { el: [110, 290], on: true } },
        kolSonrasi: g => { defter(g, 0, 300, .42, 'SESİMİ\nGERİ VER!', -.05); elMitt(g, -110, 290, 1, -1.2, HATICE.ten, -1); elMitt(g, 110, 290, 1, 1.2, HATICE.ten); } });
    } },
  A4: { renk: 'soluk', vinyet: .65, kam: (lt, d) => ({ x: 540 + (lt > 2.0 && lt < 2.2 ? gurultu(lt * 60, 5) * 10 : 0), y: 960, z: lerp(1.05, 1.18, ease(lt / d)) }),
    ciz(g, lt, d, T) {
      arka(g, 'dolapDis', dolapDis);
      const uz = ease(aralik(lt, .1, 1.0)), dur = lt > 2.0 ? 1 - ease(aralik(lt, 2.3, 3.2)) * .35 : 1;
      haticeBilegi(g, lerp(900, 620, uz * dur), lerp(1100, 960, uz * dur), 3);
    } },
  A5: { renk: 'soluk', kam: KAM(560, 860, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.25, merkez: [540, 900], blur: 2 });
      const h3 = yrep('H03'), tatli = h3 && T >= h3.t0 - .2;
      HT(g, T, { x: 580, y: 780, s: 1.5, gozAcik: tatli ? .5 : .8, kas: tatli ? 'mutlu' : 'suphe', gulum: tatli ? .55 : .1, bak: [-.4, 0], kollar: { sol: { el: [-112, 60], on: true } }, enUst: haticeTelefon });
    } },
  A6: { renk: ['soluk', 'korku', .5], vinyet: .8, kirmiziVinyet: true, kam: KAM(540, 820, 1.05, 1.3),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGunduz', g => yatakOdasi(g, false), { olcek: 1.6, merkez: [540, 800], blur: 4 });
      HT(g, T, { x: 540, y: 798, s: 2.7, gozAcik: .95, kirpma: false, bebek: .42, donuk: true, kas: 'normal', gulum: .35, bak: [0, 0] });
      dolapPanjur(g, { kalin: 62 }); g.fillStyle = 'rgba(8,4,3,.12)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
    } },
  T1: { renk: 'normal', vinyet: 0, ekran: true, ciz: baslikKarti5 },

  // ═════ SAHNE 2 · BİLEZİK BÜYÜCÜNÜN ELİNDE ═════
  B1: { renk: 'normal', vinyet: .6, giris: .3, kam: KAM(570, 1000, 1.0, 1.1),
    ciz(g, lt, d, T) { arka(g, 'sokak', mezarlikSokagi); mezarlikKapisi(g, ease(aralik(lt, .2, 2.4)), T); } },
  B2: { renk: 'buyu', vinyet: .7, kam: KAM(540, 820, 1.0, 1.1),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.4, merkez: [540, 700], blur: 4 }, n: 20 });
      g.fillStyle = 'rgba(10,4,4,.4)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      gulizarEl(g, 540, 1500, 2.2, Math.PI, { parmak: [-.45, -.15, .15, .45] });
      bilezikBuyusu(g, T, 540, 780 + Math.sin(T * 2) * 8, 1.1, aralik(lt, .4, d - .2));
      karanlik(g, 540, 900, 300, 1100, .7, T);
    } },
  B3: { renk: 'buyu', vinyet: .65, kam: KAM(540, 840, 1.0, 1.08),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.5, merkez: [540, 600], blur: 4 }, n: 18 });
      gulizar(g, { x: 540, y: 880, s: 2.15, t: T, T });
      g.save(); g.filter = 'blur(6px)'; mum(g, 170, 1880, 2.0, T); g.restore();
      isikHalesi(g, 173, 1550, 1000, '255,150,60', .55, T); karanlik(g, 400, 1250, 350, 1500, .8, T);
    } },
  B4: { renk: 'buyu', vinyet: .6, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.5, merkez: [540, 600], blur: 4 }, n: 18 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'saskin', gulum: -.15, gozAcik: 1.08, bebek: .6, bak: [-.3, 0], konus: 0, isik: altIsik('255,160,90', .3) });
      isikHalesi(g, 540, 1700, 900, '255,150,60', .4, T); karanlik(g, 540, 1300, 450, 1500, .6, T);
    } },
  B5: { renk: 'buyu', vinyet: .7, kam: KAM(540, 840, 1.06, 1.16), ciz(g, lt, d, T) { CEKIM.B3.ciz(g, lt, d, T); } },
  B6: { renk: 'buyu', vinyet: .55, kam: KAM(540, 980, 1.0, 1.1),
    ciz(g, lt, d, T) { defterCekim(g, lt, 'NE\nŞARTI?', g => { arka(g, 'buyu', buyuDuvar, { olcek: 1.8, merkez: [540, 700], blur: 6 }); isikHalesi(g, 540, 1300, 900, '255,160,70', .4, T); }); karanlik(g, 540, 1000, 400, 1300, .55, T); } },
  B7: { renk: ['buyu', 'korku', .3], vinyet: .75, kirmiziVinyet: true, kam: KAM(540, 880, 1.1, 1.3),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.5, merkez: [540, 600], blur: 4 }, n: 18 });
      gulizar(g, { x: 540, y: 900, s: 2.5, t: T, T });
      gulizarEl(g, 860, 1700, 1.6, Math.PI + .3, { parmak: [-.4, -.13, .13, .4] }); bilezikBuyusu(g, T, 840, 1180, .55, 1);
      isikHalesi(g, 540, 1900, 1100, '255,150,60', .5, T); karanlik(g, 540, 1500, 400, 1500, .8, T);
    } },
  B8: { renk: 'buyu', vinyet: .65, kam: KAM(540, 790, 1.0, 1.12),
    ciz(g, lt, d, T) {
      mumluOda(g, T, { arka: { olcek: 1.5, merkez: [540, 600], blur: 4 }, n: 18 });
      N(g, T, { x: 540, y: 790, s: 2.05, solgun: true, morluk: .55, kas: 'endise', gulum: -.2, gozAcik: .95, bebek: .7, bak: [0, .3], konus: 0, isik: altIsik('255,160,90', .3) });
      isikHalesi(g, 540, 1700, 900, '255,150,60', .4, T); karanlik(g, 540, 1300, 450, 1500, .6, T);
    } },

  // ═════ SAHNE 3 · GECE YARISI ═════
  C1: { renk: 'gece', giris: .4, vinyet: .65, kam: KAM(540, 960, 1.0, 1.12),
    ciz(g, lt, d, T) {
      g.fillStyle = '#2a1a12'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      const al = ease(aralik(lt, 1.6, 3.0));
      cekmeceAnahtar(g, 540, 960, 1.2, al);
      const hx = lerp(590, 380, al), hy = lerp(1000, 520, al);
      if (lt > 1.0) nazliEli(g, lerp(-100, hx, ease(aralik(lt, 1.0, 1.6))), lerp(1300, hy, ease(aralik(lt, 1.0, 1.6))), -.4, '#c3b1dc');
      isikHalesi(g, 540, 300, 800, '140,170,255', .25, T); karanlik(g, 540, 900, 300, 1200, .55, T);
    } },
  C1B: { renk: 'gece', vinyet: .7, kam: KAM(540, 900, 1.0, 1.06),
    ciz(g, lt, d, T) {
      arka(g, 'salonGece', salonGece);
      const yuru = ease(aralik(lt, 0, d));
      N(g, T, { x: lerp(260, 520, yuru), y: 830, s: 1.4, kiyafet: 'pijama', solgun: true, morluk: .5, kas: 'endise', gulum: -.15, gozAcik: .9, bak: [.6, 0], don: .3, konus: 0, egim: Math.sin(lt * 4) * .02 });
      isikHalesi(g, 900, 700, 360, '140,170,255', .25, T); karanlik(g, 520, 900, 300, 1100, .7, T);
    } },
  C2: { renk: 'gece', vinyet: .7, kam: KAM(560, 980, 1.0, 1.12),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true), { olcek: 1.6, merkez: [500, 900], blur: 4 });
      g.fillStyle = 'rgba(40,10,20,.25)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      yastik(g, 560, 1080, 1060, 640, { t: T, gulX: 1e4 });
      HT(g, T, { x: 560, y: 880, s: 1.75, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: 0, kas: 'normal', gulum: 0, egim: .08 });
      const it = ease(aralik(lt, .3, 1.4)), cek = ease(aralik(lt, 2.8, 3.6));
      if (it < 1 || cek < 1) { tekBilezik(g, lerp(160, 260, it) - cek * 400, 1300, .9, .2); }
      nazliEli(g, lerp(-80, 300, it) - cek * 500, 1320, -1.3, '#c3b1dc');
      karanlik(g, 560, 1000, 350, 1200, .6, T);
    } },
  C3: { renk: 'gece', vinyet: .7, kam: KAM(540, 790, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'salonGece', salonGece, { olcek: 1.45, merkez: [540, 700], blur: 3 });
      N(g, T, { x: 540, y: 790, s: 2.05, kiyafet: 'pijama', solgun: true, morluk: .55, kas: 'saskin', gozAcik: 1.1, bebek: .5, kirpma: false, bak: [-.5, .1], ter: .7, gulum: -.25, konus: 0 });
      karanlik(g, 540, 800, 350, 1200, .55, T);
    } },
  C3B: { renk: 'gece', vinyet: .7, kam: KAM(540, 920, 1.0, 1.1),
    ciz(g, lt, d, T) {
      arka(g, 'salonGece', salonGece, { olcek: 1.5, merkez: [540, 800], blur: 4 });
      kanepeArkasi(g, 540, 1150, 1.0);
      EM(g, T, { x: 560, y: 900, s: 1.75, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: 0, gulum: .05, egim: .12, konus: 0 });
      const uz = ease(aralik(lt, 1.6, d - .2));
      nazliEli(g, lerp(-100, 400, uz), lerp(1200, 960, uz), -1.0, '#c3b1dc');
      karanlik(g, 560, 950, 350, 1100, .55, T);
    } },
  C4: { renk: ['gece', 'korku', .3], vinyet: .7, kam: (lt, d) => ({ x: 540 + (lt > .9 && lt < 1.2 ? gurultu(lt * 60, 3) * 14 : 0), y: 800, z: lerp(1.08, 1.0, easeOut(aralik(lt, .9, 1.6))) }),
    ciz(g, lt, d, T) {
      arka(g, 'salonGece', salonGece, { olcek: 1.45, merkez: [540, 700], blur: 3 });
      const uyan = lt > .9;
      EM(g, T, { x: 540, y: 800, s: 2.0, gozAcik: uyan ? 1.12 : 0, bebek: .5, kirpma: false, kas: uyan ? 'kizgin' : 'normal', gulum: -.3, bak: [-.4, 0] });
      karanlik(g, 540, 800, 350, 1200, .5, T);
    } },
  C5: { renk: ['gece', 'korku', .3], vinyet: .7, kam: KAM(540, 880, 1.0, 1.05),
    ciz(g, lt, d, T) {
      arka(g, 'salonGece', salonGece, { olcek: 1.2, merkez: [540, 800], blur: 2 });
      EM(g, T, { x: 540, y: 790, s: 1.5, don: .5, gozAcik: 1.1, bebek: .5, kas: 'kizgin', gulum: -.35, bak: [.85, -.1], kollar: { sol: { el: [-210, 120], on: true } } });
      karanlik(g, 540, 850, 350, 1200, .5, T);
    } },
  C6: { renk: ['gece', 'korku', .3], vinyet: .75, kam: (lt, d) => ({ x: 540 + gurultu(lt * 14, 1) * 18, y: 800 + gurultu(lt * 12, 2) * 14, z: 1.1 }),
    ciz(g, lt, d, T) {
      arka(g, 'antreGece', g => { antreDuvar(g); antreKapi(g, 0); g.fillStyle = 'rgba(10,12,30,.6)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2); }, { olcek: 1.4, merkez: [540, 800], blur: 5 });
      N(g, T, { x: 540, y: 800, s: 2.05, kiyafet: 'pijama', solgun: true, morluk: .6, kas: 'uzgun', gozAcik: .85, bak: [-.3, .2], yas: 1, yasDamla: aralik(lt, 0, d), gulum: -.35, konus: 0, egim: Math.sin(lt * 6) * .03 });
      karanlik(g, 540, 800, 350, 1200, .55, T);
    } },

  // ═════ SAHNE 4 · DÜĞÜM DÖNDÜ ═════
  D1: { renk: ['gece', 'korku', .4], giris: .4, vinyet: .7, kam: (lt, d) => ({ x: lerp(300, 700, ease(lt / d)), y: 960, z: 2.0 }),
    ciz(g, lt, d, T) {
      arka(g, 'masaYakin', g => masa(g, -PAY));
      g.save(); g.translate(540, 960); g.rotate(Math.sin(lt * 2) * .02); g.translate(-540, -960);
      dugumluIp(g, -300, 1400, 960, 26, { t: -T * 3, sacli: true, cozulmus: [0, 1] });
      g.restore();
      for (let i = 2; i < 26; i++) { const x = -300 + 1700 / 27 * (i + 1); isikHalesi(g, x, 960, 90, '255,40,40', .25 + .2 * Math.sin(T * 5 + i)); }
      karanlik(g, 500, 960, 260, 1000, .55, T);
    } },
  D2: { renk: ['gece', 'korku', .5], vinyet: .75, kam: KAM(560, 940, 1.0, 1.15),
    ciz(g, lt, d, T) {
      arka(g, 'yatakGece', g => yatakOdasi(g, true), { olcek: 1.6, merkez: [500, 900], blur: 4 });
      g.fillStyle = 'rgba(40,10,20,.25)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      yastik(g, 560, 1080, 1060, 640, { t: T, gulX: 1e4, saclar: 46, sacRenk: '#c9c3bd', sacRenk2: '#9a948e' });
      const h8 = yrep('H08'), ofke = h8 && T >= h8.t0 - .1;
      HT(g, T, { x: 560, y: 860, s: 1.75, govdeYok: true, kollar: { sol: { gizli: true }, sag: { gizli: true } }, gozAcik: 1.15, bebek: .4, kirpma: false, kas: ofke ? 'kizgin' : 'saskin', gulum: -.4, ter: 1, bak: [0, .6], egim: .06 });
      karanlik(g, 560, 1000, 350, 1200, .5, T);
    } },
  D3: { renk: ['gece', 'korku', .6], vinyet: .8, kirmiziVinyet: true, kam: KAM(540, 900, 1.0, 1.22),
    ciz(g, lt, d, T) {
      g.fillStyle = dg(g, 0, -PAY, 0, H, [[0, '#cfc8bf'], [1, '#a49c92']]); g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      g.globalAlpha = .3; for (let i = 0; i < 8; i++) { g.beginPath(); g.moveTo(-PAY, 300 + i * 220); g.bezierCurveTo(300, 260 + i * 220, 700, 340 + i * 220, W + PAY, 290 + i * 220); cizgi(g, 4, '#8a8278'); } g.globalAlpha = 1;
      g.fillStyle = 'rgba(20,4,8,.35)'; g.fillRect(-PAY, -PAY, W + PAY * 2, H + PAY * 2);
      yastik(g, 540, 330, 1300, 700, { t: T, gulX: 1e4, aci: -.06 });
      for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(540 + (i - 2) * 50, 960); g.bezierCurveTo(500 + i * 30, 840 - lt * 60, 600 - i * 20, 740 - lt * 90, 540 + (i - 2) * 70, 640 - lt * 120); cizgi(g, 6, `rgba(176,31,40,${.65 - i * .1})`); }
      isikHalesi(g, 540, 1000, 700, '255,40,30', .6 + .15 * Math.sin(T * 6)); tekBilezik(g, 540, 1000, 3.2, .1);
      sacTeli(g, 420, 1060, 160, .3, .8, '#c9c3bd', 3.4); sacTeli(g, 660, 1040, 140, 2.6, -.6, '#9a948e', 3.4);
    } },
  D4: { renk: 'normal', vinyet: 0, ekran: true,
    ciz(g, lt, d, T) { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); if (lt > .03 && lt < .16) { g.fillStyle = 'rgba(150,10,20,.45)'; g.fillRect(0, 0, W, H); } } },
  D5: { renk: 'normal', vinyet: 0, ekran: true, ciz: soruKarti5 },
};
