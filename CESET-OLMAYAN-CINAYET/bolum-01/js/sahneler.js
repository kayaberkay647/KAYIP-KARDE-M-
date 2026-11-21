// SAHNELER — çekim listesi, kamera, karakter konumları, altyazı, başlıklar.
const L = id => REPLIK.find(r => r.id === id), Lb = id => L(id).t, Ls = id => L(id).t + L(id).d;
const VURUSLAR = [0, .55, 1.1].map(k => EV.vurus + k);
const basY = (ad, p) => p.y - 835 * (p.s || 1) * KARAKTER[ad].boy + (p.otur || 0) * 150 * (p.s || 1) * KARAKTER[ad].boy;

function yuruyus(t, t0, t1, x0, y0, x1, y1) {
  const k = seg(t, t0, t1), e = ease(k);
  const x = lerp(x0, x1, e), y = lerp(y0, y1, e);
  const hareket = k > 0 && k < 1;
  return { x, y, s: olcek(y), yuru: hareket ? Math.hypot(x - x0, y - y0) / 150 : null, yon: Math.sign(x1 - x0) || 1 };
}
const yakin = (ad, p, z = 3.5, dy = 40) => [p.x + (p.don || 0) * 10 * (p.s || 1), basY(ad, p) + dy * (p.s || 1), z / (p.s || 1)];
const orta = (ad, p, z = 2.3, dy = 230) => [p.x, basY(ad, p) + dy * (p.s || 1), z / (p.s || 1)];

// Bir salon çekimi çizer. kisiler: [[ad, p], ...]  on: ön plan omuz üstü [ad, p]
function salonCek(c, t, cam, o, kisiler, on) {
  let [cx, cy, z] = cam;
  cx += gurultu(t * .35, 11) * 5 / z * 3; cy += gurultu(t * .3, 12) * 4 / z * 3;
  c.save(); kamera(c, cx, cy, z);
  salonArka(c, o, t);
  kisiler.slice().sort((a, b) => a[1].y - b[1].y).forEach(([ad, p]) => kisiCiz(c, ad, p, t));
  if (on) { // omuz üstü ön plan: kameraya göre konumlanır, hafif bulanık ve koyu
    const [oad, taraf] = on, vw = W / z, vh = H / z, fs = 2.3 / z;
    const oy = cy + vh * .4 + 835 * fs * KARAKTER[oad].boy, ox = cx + taraf * vw * .4;
    c.save(); c.filter = 'blur(4px) brightness(.62)'; kisiCiz(c, oad, { x: ox, y: oy, s: fs, arka: 1 }, t); c.restore();
  }
  salonIsik(c, o, t);
  c.restore();
}

// ---------- KARAKTER KONUMLARI (sahne içi süreklilik) ----------
const POS = {
  aylin1: t => ({ x: 1300, y: 1640, s: olcek(1640), duygu: 'korku', sag: 'kulak', sagN: 'tel', don: -.15, titre: 1, gozyasi: seg(t, Lb('R03'), Lb('R03') + 1.5) * .9,
    sol: t > Lb('R03') ? 'gogus' : 'asagi', bak: t < 1.5 ? [gurultu(t * 3, 4) * .8, -.2] : null }),
};

// ---------- ÇEKİM LİSTESİ ----------
// Her çekim: [başlangıç, fonksiyon(c, t, lt)] — bir sonraki çekime kadar sürer.
const CEKIM = [];
function cek(b, f) { CEKIM.push([b, f]); }

// SAHNE 1 — ŞOK AÇILIŞ
cek(0, (c, t, lt) => { const p = POS.aylin1(t); const [x, y] = yakin('AYLIN', p); salonCek(c, t, [x, y - 70 * p.s, lerp(6.2, 5.6, lt / 1.5) / p.s], { gece: .55 }, [['AYLIN', p]]); });
cek(1.5, (c, t, lt) => { salonCek(c, t, [lerp(640, 1000, ease(lt / 1.6)), lerp(1500, 1560, lt / 1.6), 1.9], { gece: .5 }, [['AYLIN', POS.aylin1(t)]]); });
cek(Lb('R02') - .05, (c, t, lt) => insTelefon(c, t, lt, '112'));
cek(Lb('R02') + 1.7, (c, t, lt) => { const p = POS.aylin1(t); const [x, y, z] = orta('AYLIN', p, 2.4); salonCek(c, t, [x, y, z], { gece: .5 }, [['AYLIN', Object.assign(p, { duygu: 'korku', duygu2: 'uzgun', dk: .3 })]]); });
cek(Lb('R03') - .05, (c, t, lt) => { const p = POS.aylin1(t); const [x, y] = yakin('AYLIN', p); salonCek(c, t, [x, y, lerp(3.0, 3.9, lt / 4.5) / p.s], { gece: .5 }, [['AYLIN', Object.assign(p, { duygu: 'korku', duygu2: 'uzgun', dk: seg(t, Lb('R03') + 1, Lb('R03') + 2.5) })]]); });

// SAHNE 2 — KAYBOLAN NİŞANLI
const S2 = SAHNE[2];
const aylin2 = t => {
  const w = yuruyus(t, S2, S2 + 1.6, 1300, 1640, 1000, 1600);
  return Object.assign(w, { duygu: 'endise', duygu2: 'uzgun', dk: seg(t, Lb('R05'), Lb('R05') + 1), don: t < Lb('R04') + 1.2 ? .55 : -.45, sag: t > EV.arama - .1 ? 'ekran' : 'asagi', sagN: t > EV.arama - .1 ? 'telEkran' : null, gozyasi: seg(t, Lb('R05'), Lb('R05') + 1.2) });
};
cek(S2, (c, t, lt) => { const p = aylin2(t); salonCek(c, t, [lerp(1250, 1080, ease(lt / 1.6)), 1080, 1.15], { gece: .5 }, [['AYLIN', p]]); });
cek(S2 + 1.5, (c, t, lt) => insEller(c, t, lt));
cek(S2 + 2.9, (c, t, lt) => { const p = aylin2(t); salonCek(c, t, [lerp(900, 860, lt / 2), 1250, 1.7], { gece: .5 }, [['AYLIN', Object.assign(p, { don: -.6, bak: [-.7, .5] })]]); });
cek(EV.arama, (c, t, lt) => insTelefon(c, t, lt, t > EV.cevapsiz - .2 ? 'cevapsiz' : 'emir'));
cek(Lb('R05') - .1, (c, t, lt) => { const p = aylin2(t); const [x, y] = yakin('AYLIN', p, 3.2); salonCek(c, t, [x, y + 20, lerp(3.1, 3.6, lt / 3.4) / p.s], { gece: .5 }, [['AYLIN', Object.assign(p, { bak: lt < 1.6 ? [0, .7] : [.2, 0] })]]); });
cek(EV.kapi_pan, (c, t, lt) => { const k = ease(lt / 1.4); salonCek(c, t, [lerp(1100, 1830, k), lerp(1000, 820, k), lerp(1.2, 2.1, k)], { gece: .52, yatakGolge: 0 }, [['AYLIN', Object.assign(aylin2(t), { don: .7 })]]); });

// SAHNE 3 — KOMŞUNUN ŞÜPHESİ
const S3 = SAHNE[3];
const zehra3 = t => { const w = yuruyus(t, S3 + .9, S3 + 2.6, 360, 1200, 470, 1330); return Object.assign(w, { duygu: 'endise', don: .45, sag: t > Lb('R08') && t < Lb('R09') ? 'gogus' : t > Lb('R10') + 1.2 ? 'isaret' : 'asagi', sol: t < S3 + 2.2 ? 'agiz' : 'asagi' }); };
const aylin3 = t => { const w = yuruyus(t, S3 + .9, S3 + 2.4, 1000, 1600, 780, 1420); return Object.assign(w, { duygu: t > Lb('R09') ? 'korku' : 'endise', duygu2: 'uzgun', dk: .3, don: -.5, gozyasi: .5 }); };
const kapi3 = t => ease(seg(t, S3 + .05, S3 + .7));
cek(S3, (c, t, lt) => { salonCek(c, t, [lerp(520, 600, lt / 2), 1020, 1.08], { gece: .5, kapiAcik: kapi3(t) }, [['ZEHRA', zehra3(t)], ['AYLIN', aylin3(t)]]); });
cek(Lb('R06') + 1.6, (c, t, lt) => { salonCek(c, t, [630, 1000, 1.55], { gece: .5, kapiAcik: 1 }, [['ZEHRA', zehra3(t)], ['AYLIN', aylin3(t)]]); });
cek(Lb('R07') - .05, (c, t, lt) => { const p = aylin3(t); const z = zehra3(t); const [x, y] = yakin('AYLIN', p, 3); salonCek(c, t, [x - 30, y + 30, 2.9 / p.s], { gece: .5, kapiAcik: 1 }, [['AYLIN', p]], ['ZEHRA', -1]); });
cek(Lb('R08') - .05, (c, t, lt) => { const p = zehra3(t); const [x, y] = yakin('ZEHRA', p, 3.2); salonCek(c, t, [x, y, lerp(3.1, 3.4, lt / 3) / p.s], { gece: .5, kapiAcik: 1 }, [['ZEHRA', p]]); });
cek(Lb('R09') - .05, (c, t, lt) => { const p = aylin3(t); const [x, y] = yakin('AYLIN', p, 3.6); salonCek(c, t, [x, y, 3.6 / p.s], { gece: .5, kapiAcik: 1 }, [['AYLIN', p]]); });
cek(Lb('R10') - .05, (c, t, lt) => { const p = zehra3(t); const [x, y, z] = orta('ZEHRA', p, 2.2); salonCek(c, t, [x + 60, y, z], { gece: .5, kapiAcik: 1 }, [['ZEHRA', p], ['AYLIN', aylin3(t)]]); });

// SAHNE 4 — KOMİSERİN GELİŞİ
const S4 = SAHNE[4];
const polis4 = t => clamp(seg(t, S4 - .2, S4 + 1) * (t < SAHNE[8] ? 1 : .45), 0, 1);
const murat4 = t => { const w = yuruyus(t, S4 + .3, S4 + 2.2, 360, 1200, 540, 1390); return Object.assign(w, { duygu: t > Lb('R15') ? 'dusun' : 'ciddi', don: .45, sag: t > Lb('R11') + .2 && t < Lb('R11') + 2.4 ? 'ac' : 'asagi', sol: t > Lb('R13') && t < Ls('R13') ? 'bel' : 'asagi' }); };
const aylin4 = t => ({ x: 830, y: 1430, s: olcek(1430), duygu: t > Lb('R14') ? 'korku' : 'endise', duygu2: 'uzgun', dk: t > Lb('R16') ? .8 : .3, don: -.5, gozyasi: .45,
  sag: t > Lb('R12') && t < Lb('R12') + 2.5 ? 'kulak' : 'asagi', sagN: t > Lb('R12') && t < Lb('R12') + 2.5 ? 'tel' : null, sol: t > Lb('R14') && t < Ls('R14') ? 'gogus' : 'asagi', bak: t > Lb('R16') + .6 ? [-.3, .6] : null });
const zehra4 = t => ({ x: 150, y: 1290, s: olcek(1290), duygu: 'endise', don: .6, sol: 'agiz' });
const o4 = t => ({ gece: .5, kapiAcik: 1, polis: polis4(t) });
cek(S4, (c, t, lt) => { salonCek(c, t, [lerp(560, 640, lt / 2.5), 1020, 1.1], o4(t), [['MURAT', murat4(t)], ['AYLIN', aylin4(t)], ['ZEHRA', zehra4(t)]]); });
cek(Lb('R11') + 2.2, (c, t, lt) => insCerceve(c, t, lt));
cek(Lb('R12') - .05, (c, t, lt) => { const p = aylin4(t), m = murat4(t); const [x, y] = yakin('AYLIN', p, 3); salonCek(c, t, [x - 20, y + 40, 2.8 / p.s], o4(t), [['AYLIN', p]], ['MURAT', -1]); });
cek(Lb('R13') - .05, (c, t, lt) => { const p = murat4(t); const [x, y, z] = orta('MURAT', p, 2.4); salonCek(c, t, [x, y, z], o4(t), [['MURAT', p]]); });
cek(Lb('R14') - .05, (c, t, lt) => { const p = aylin4(t); const [x, y] = yakin('AYLIN', p, 3.3); salonCek(c, t, [x, y, lerp(3.2, 4.0, lt / 4.2) / p.s], o4(t), [['AYLIN', p]]); });
cek(Lb('R15') - .05, (c, t, lt) => { const p = murat4(t); const [x, y] = yakin('MURAT', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], o4(t), [['MURAT', p]]); });
cek(Lb('R16') - .05, (c, t, lt) => { const p = aylin4(t); const [x, y, z] = orta('AYLIN', p, 2.3); salonCek(c, t, [x, y, z], o4(t), [['AYLIN', p], ['MURAT', murat4(t)]]); });

// SAHNE 5 — SON TELEFON GÖRÜŞMESİ (geçmiş)
const S5 = SAHNE[5];
const emir5 = t => ({ x: 1560, y: 1300, s: olcek(1300), duygu: t > EV.golge ? 'endise' : 'ciddi', duygu2: 'sok', dk: seg(t, EV.kesildi - .4, EV.kesildi), sag: 'kulak', sagN: 'tel', sol: t > Lb('R19') ? 'gogus' : 'asagi',
  don: t < Lb('R18') ? -.7 : t < Lb('R20') ? .1 : .75, bak: t > Lb('R20') ? [.9, 0] : null });
const o5 = t => ({ gece: .45, kapiAcik: 0, anahtarVar: false, saat: 22.6 });
const gecmisSahne = (c, t, cam, golge) => { salonCekGecmis(c, t, cam, o5(t), [['EMIR', emir5(t)]], golge); };
function salonCekGecmis(c, t, cam, o, kisiler, golge) {
  c.save(); kamera(c, ...cam);
  duvarCiz(c, o); zeminCiz(c); kapiCiz(c, o, t);
  c.fillStyle = '#5a3a24'; c.fillRect(570, 520, 90, 14);
  saatDuvar(c, o, t); cerceveDuvar(c, 615, 830, 130, 100, 'cift'); cerceveDuvar(c, 1600, 560, 70, 90, 'deniz');
  pencereCiz(c, o, t); lambaCiz(c, o, t); kanepeCiz(c, o); yatakKapiCiz(c, o); mutfakKapiCiz(c); cerceveDuvar(c, 2000, 260, 120, 90, 'deniz'); sehpaCiz(c);
  // sandalye ayakta
  c.strokeStyle = '#5c3b24'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(560, 1560); c.lineTo(560, 1420); c.moveTo(690, 1560); c.lineTo(690, 1420); c.moveTo(580, 1500); c.lineTo(580, 1240); c.moveTo(670, 1500); c.lineTo(670, 1240); c.stroke();
  yd(c, 540, 1400, 170, 34, 8); konturlu(c, '#7a5032', 3); yd(c, 570, 1230, 110, 90, 10); konturlu(c, '#7a5032', 3);
  if (golge > 0) { // koridordan geçen kimliği belirsiz gölge
    const gx = lerp(1640, 2050, golge); c.save(); c.filter = 'blur(10px)'; c.fillStyle = 'rgba(15,12,20,.6)';
    c.beginPath(); c.ellipse(gx, 640, 60, 70, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(gx - 110, 1180); c.quadraticCurveTo(gx - 120, 720, gx, 700); c.quadraticCurveTo(gx + 120, 720, gx + 110, 1180); c.fill(); c.restore();
  }
  kisiler.forEach(([ad, p]) => kisiCiz(c, ad, p, t));
  salonIsik(c, o, t); c.restore();
}
cek(S5, (c, t, lt) => { const p = emir5(t); const [x, y, z] = orta('EMIR', p, 2.2); gecmisSahne(c, t, [x - 120, y, lerp(z * .9, z, lt / 3)], 0); });
cek(Lb('R18') - .05, (c, t, lt) => { const p = emir5(t); const [x, y] = yakin('EMIR', p, 3.3); gecmisSahne(c, t, [x, y, 3.3 / p.s], 0); });
cek(EV.golge, (c, t, lt) => { gecmisSahne(c, t, [1720, 900, 1.25], seg(t, EV.golge + .3, EV.golge + 2.6)); });
cek(EV.golge + 2.4, (c, t, lt) => { const p = emir5(t); const [x, y] = yakin('EMIR', p, 3.5); gecmisSahne(c, t, [x, y, lerp(3.4, 4.1, lt / 3) / p.s], 0); });
cek(EV.kesildi + .1, (c, t, lt) => insTelefonKesik(c, t, lt));
cek(EV.donus, (c, t, lt) => { const p = aylin4(t); const [x, y] = yakin('AYLIN', p, 3.6); salonCek(c, t, [x, y, 3.6 / p.s], o4(t), [['AYLIN', Object.assign(p, { duygu: 'uzgun', gozyasi: 1, bak: [-.2, .4] })]]); });
function insTelefonKesik(c, t, lt) {
  c.fillStyle = '#0b0d12'; c.fillRect(0, 0, W, H);
  c.save(); c.translate(W / 2, H / 2); yd(c, -230, -470, 460, 940, 60); c.fillStyle = '#16171b'; c.fill(); yd(c, -206, -446, 412, 892, 44); c.fillStyle = '#141b29'; c.fill();
  c.fillStyle = '#ff6b6b'; c.font = '800 54px Nunito'; c.textAlign = 'center'; c.fillText('Arama sonlandı', 0, -60); c.fillStyle = 'rgba(255,255,255,.7)'; c.font = '600 40px Nunito'; c.fillText('Aylin ♥  ·  00:41', 0, 0); c.restore();
  if (lt < .25) { c.fillStyle = `rgba(255,255,255,${.6 * (1 - lt / .25)})`; c.fillRect(0, 0, W, H); }
  for (let i = 0; i < 8; i++) { const y = hash(Math.floor(t * 20) + i) * H; c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(0, y, W, 6 + hash(i) * 20); }
}

// SAHNE 6 — GİZEMLİ ANAHTAR
const S6 = SAHNE[6];
const murat6 = t => ({ x: 650, y: 1440, s: olcek(1440), duygu: t > EV.torbaya - .5 ? 'dusun' : 'ciddi', eldiven: 1, don: t > Lb('R23') - .2 && t < Ls('R25') ? -.75 : .5,
  sol: t < EV.torbaya + .1 ? [-50, -660] : 'asagi', solN: t < EV.torbaya + .1 ? 'anahtar' : null, bak: t > EV.torbaya - .6 ? [-.4, -.6] : null });
const aylin6 = t => ({ x: 960, y: 1450, s: olcek(1450), duygu: 'endise', don: -.45, gozyasi: .5, sol: 'gogus' });
const zehra6 = t => ({ x: 330, y: 1260, s: olcek(1260), duygu: 'endise', don: .55, sag: t > Lb('R25') ? 'ac' : 'asagi' });
const o6 = t => ({ gece: .5, kapiAcik: 1, polis: polis4(t), anahtarVar: false });
cek(S6, (c, t, lt) => insAnahtar(c, t, lt));
cek(Lb('R21') + 1.4, (c, t, lt) => { const p = murat6(t); const [x, y, z] = orta('MURAT', p, 2.5, 160); salonCek(c, t, [x + 20, y, z], o6(t), [['MURAT', p]]); });
cek(Lb('R22') - .05, (c, t, lt) => { const p = aylin6(t); const [x, y] = yakin('AYLIN', p, 3.1); salonCek(c, t, [x - 20, y + 30, 2.9 / p.s], o6(t), [['AYLIN', Object.assign(p, { don: gurultu(t * 1.5, 3) * .25 - .3 })]], ['MURAT', -1]); });
cek(Lb('R23') - .1, (c, t, lt) => { salonCek(c, t, [lerp(520, 470, lt / 3), 980, 1.5], o6(t), [['ZEHRA', zehra6(t)], ['MURAT', murat6(t)]]); });
cek(Lb('R24') - .05, (c, t, lt) => { const p = murat6(t); const [x, y] = yakin('MURAT', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], o6(t), [['MURAT', p]]); });
cek(Lb('R25') - .05, (c, t, lt) => { const p = zehra6(t); const [x, y, z] = orta('ZEHRA', p, 2.3); salonCek(c, t, [x, y, z], o6(t), [['ZEHRA', p]]); });
cek(EV.torbaya - .5, (c, t, lt) => { const p = murat6(t); const [x, y] = yakin('MURAT', p, 3); salonCek(c, t, [x, y - 30, lerp(2.9, 3.3, lt / 1.4) / p.s], o6(t), [['MURAT', p]]); });

// SAHNE 7 — KIRIK SAAT
const S7 = SAHNE[7];
const memur7 = t => { const w = yuruyus(t, S7, S7 + 1.6, 360, 1200, 400, 1380); return Object.assign(w, { duygu: 'ciddi', don: .5, sag: t < Ls('R26') + .3 ? 'uzat' : 'asagi', sagN: t < Ls('R26') + .3 ? 'torba' : null }); };
const murat7 = t => ({ x: 690, y: 1450, s: olcek(1450), duygu: 'ciddi', duygu2: 'dusun', dk: t > Lb('R31') ? .5 : 0, don: t < Lb('R30') ? -.55 : .55, eldiven: 1,
  sol: t > Ls('R26') ? 'tut' : 'asagi', solN: t > Ls('R26') ? 'torba' : null, sag: t > Lb('R31') + 1 ? 'ac' : 'asagi' });
const aylin7 = t => ({ x: 980, y: 1470, s: olcek(1470), duygu: t > Lb('R30') ? 'ofke' : 'sok', duygu2: 'uzgun', dk: t > Lb('R31') ? .7 : .2, don: -.5, gozyasi: t > Lb('R27') ? 1 : .4, titre: t > Lb('R30') && t < Ls('R30') ? 1.5 : 0,
  sol: t > Lb('R27') && t < Ls('R27') + .5 ? 'agiz' : 'gogus' });
const o7 = t => ({ gece: .5, kapiAcik: 1, polis: polis4(t), anahtarVar: false });
cek(S7, (c, t, lt) => { salonCek(c, t, [lerp(560, 620, lt / 2), 1000, 1.25], o7(t), [['MEMUR', memur7(t)], ['MURAT', murat7(t)], ['AYLIN', aylin7(t)]]); });
cek(Lb('R26') + .2, (c, t, lt) => { const p = memur7(t); const [x, y, z] = orta('MEMUR', p, 2.3); salonCek(c, t, [x + 30, y, z], o7(t), [['MEMUR', p]]); });
cek(Lb('R27') - .3, (c, t, lt) => insSaat(c, t, lt));
cek(Lb('R27') + 1.1, (c, t, lt) => { const p = aylin7(t); const [x, y] = yakin('AYLIN', p); salonCek(c, t, [x, y - 20, lerp(3.6, 4.6, lt / 3) / p.s], o7(t), [['AYLIN', p]]); });
cek(Lb('R28') - .05, (c, t, lt) => { const p = murat7(t); const [x, y, z] = orta('MURAT', p, 2.3); salonCek(c, t, [x, y, z], o7(t), [['MURAT', p]]); });
cek(Lb('R29') - .05, (c, t, lt) => { const p = memur7(t); const [x, y] = yakin('MEMUR', p, 3.2); salonCek(c, t, [x, y, 3.2 / p.s], o7(t), [['MEMUR', p]]); });
cek(Lb('R30') - .05, (c, t, lt) => { const p = aylin7(t); const [x, y] = yakin('AYLIN', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], o7(t), [['AYLIN', p]]); });
cek(Lb('R31') - .05, (c, t, lt) => { const p = murat7(t); const [x, y] = yakin('MURAT', p, 2.9); salonCek(c, t, [x + 20, y + 40, lerp(2.8, 3.2, lt / 4.5) / p.s], o7(t), [['MURAT', p]], ['AYLIN', 1]); });

// SAHNE 8 — ŞAŞIRTICI FİNAL
const S8 = SAHNE[8];
const murat8 = t => ({ x: 1480, y: 1340, s: olcek(1340), duygu: t > Lb('R32') ? 'sok' : 'ciddi', duygu2: 'ciddi', dk: seg(t, Lb('R34'), Lb('R34') + 1), don: t > EV.vurus ? -.85 : t > Lb('R33') ? -.5 : -.2,
  sag: t > S8 + .5 && t < Lb('R34') + .3 ? 'kulak' : 'asagi', sagN: t > S8 + .5 && t < Lb('R34') + .3 ? 'tel' : null });
const aylin8 = t => ({ x: 1080, y: 1262, s: olcek(1262), otur: 1 - ease(seg(t, Lb('R33') - .2, Lb('R33') + .5)), duygu: t > Lb('R35') ? 'sok' : 'endise', duygu2: 'korku', dk: t > EV.vurus ? 1 : 0, don: t > EV.vurus ? -.85 : .45, gozyasi: .6,
  sol: t < Lb('R33') ? 'gogus' : 'asagi', sag: t < Lb('R33') ? 'gogus' : 'asagi' });
const o8 = t => ({ gece: .55, kapiAcik: 0, polis: polis4(t), anahtarVar: false, saat: 1.6, kolSars: VURUSLAR.some(v => t > v && t < v + .15) ? 1 : 0 });
cek(S8, (c, t, lt) => { salonCek(c, t, [lerp(1350, 1300, lt), 1000, 1.2], o8(t), [['AYLIN', aylin8(t)], ['MURAT', murat8(t)]]); });
cek(Lb('R32') - .1, (c, t, lt) => { const p = murat8(t); const [x, y] = yakin('MURAT', p, 3.3); salonCek(c, t, [x, y, 3.3 / p.s], o8(t), [['MURAT', p]]); });
cek(Lb('R33') - .25, (c, t, lt) => { const p = aylin8(t); const [x, y, z] = orta('AYLIN', p, 2.2); salonCek(c, t, [x, lerp(y + 60, y - 60, ease(lt / 1)), z], o8(t), [['AYLIN', p], ['MURAT', murat8(t)]]); });
cek(Lb('R34') - .05, (c, t, lt) => { const p = murat8(t); const [x, y] = yakin('MURAT', p, 3.2); salonCek(c, t, [x, y, lerp(3.1, 4.0, lt / 4) / p.s], o8(t), [['MURAT', p]]); });
cek(Lb('R35') - .05, (c, t, lt) => { const p = aylin8(t); const [x, y] = yakin('AYLIN', p, 3.4); salonCek(c, t, [x, y, lerp(3.4, 4.2, lt / 3.8) / p.s], o8(t), [['AYLIN', p]]); });
cek(EV.vurus - .02, (c, t, lt) => { salonCek(c, t, [lerp(900, 760, ease(lt / .5)), 980, 1.15], o8(t), [['AYLIN', aylin8(t)], ['MURAT', murat8(t)]]); });
cek(EV.vurus + .5, (c, t, lt) => { const sars = VURUSLAR.reduce((a, v) => a + Math.max(0, 1 - Math.abs(t - v - .05) / .12), 0); c.save(); const z = lerp(1, 1.25, ease(lt / 1)); c.translate(W / 2, H / 2); c.scale(z, z); c.translate(-W / 2 - 60 * (z - 1) * 4, -H / 2); insKapiKolu(c, t, lt, sars); c.restore(); });
cek(EV.karar, (c, t, lt) => bitisKarti(c, t, lt));

CEKIM.sort((a, b) => a[0] - b[0]);

// ---------- YAZILAR ----------
function altBaslik(c, yazi, lt) {
  const a = Math.min(seg(lt, .1, .6), 1 - seg(lt, 2.2, 2.8)); if (a <= 0) return;
  c.save(); c.globalAlpha = a; c.font = '600 76px Caveat'; c.textAlign = 'left'; c.fillStyle = 'rgba(0,0,0,.55)'; c.fillText(yazi, 75, 245); c.fillStyle = '#f4ead8'; c.fillText(yazi, 70, 240); c.restore();
}
function baslikKarti(c, t, lt) {
  const a = Math.min(seg(lt, 0, .45), 1 - seg(lt, 1.5, 1.9)); if (a <= 0) return;
  c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(8,8,14,.72)'; c.fillRect(0, 0, W, H);
  c.textAlign = 'center'; const s = 1 + (1 - easeOut(seg(lt, 0, .8))) * .08;
  c.translate(W / 2, 880); c.scale(s, s);
  c.font = '600 112px Oswald'; c.fillStyle = '#f2ece2'; c.fillText('CESET', 0, -60); c.fillText('OLMAYAN', 0, 60);
  c.fillStyle = '#c0392b'; c.fillText('CİNAYET', 0, 180);
  c.fillStyle = '#c0392b'; c.fillRect(-260, 225, 520 * easeOut(seg(lt, .2, .9)), 6);
  c.font = '800 46px Nunito'; c.fillStyle = 'rgba(242,236,226,.9)'; c.fillText('1. BÖLÜM — KANLI EV', 0, 310);
  c.restore();
}
function bitisKarti(c, t, lt) {
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const a = seg(lt, .25, .8), b = seg(lt, .7, 1.4);
  c.save(); c.textAlign = 'center'; c.globalAlpha = a;
  c.font = '600 84px Oswald'; c.fillStyle = '#f2ece2'; c.fillText('CESET OLMAYAN', W / 2, 860); c.fillStyle = '#c0392b'; c.fillText('CİNAYET', W / 2, 960);
  c.globalAlpha = b; c.font = '800 54px Nunito'; c.fillStyle = 'rgba(242,236,226,.9)';
  const yazi = 'DEVAM EDECEK...'; c.fillText(yazi.slice(0, Math.ceil(yazi.length * seg(lt, .7, 1.5))), W / 2, 1090);
  c.restore();
}
function altyaziCiz(c, t) {
  if (!AYAR.altyazi) return;
  for (const r of REPLIK) {
    if (t < r.t - .05 || t > r.t + r.d + .15) continue;
    const a = Math.min(seg(t, r.t - .05, r.t + .08), 1 - seg(t, r.t + r.d + .02, r.t + r.d + .15));
    c.save(); c.globalAlpha = a; c.font = '800 54px Nunito'; c.textAlign = 'center'; c.lineJoin = 'round';
    const satirlar = []; let s = '';
    for (const k of r.m.split(' ')) { const d = s ? s + ' ' + k : k; if (c.measureText(d).width > 900 && s) { satirlar.push(s); s = k; } else s = d; }
    satirlar.push(s);
    const y0 = 1470 - (satirlar.length - 1) * 33;
    satirlar.forEach((st, i) => {
      const y = y0 + i * 66;
      c.lineWidth = 11; c.strokeStyle = 'rgba(10,10,16,.85)'; c.strokeText(st, W / 2, y);
      c.fillStyle = r.tel ? '#cfe5ff' : '#ffffff'; c.fillText(st, W / 2, y);
    });
    c.restore();
  }
}

// ---------- ANA KARE ÇİZİMİ ----------
const tampon = document.createElement('canvas'); tampon.width = W; tampon.height = H; const tc = tampon.getContext('2d');
const grenK = document.createElement('canvas'); grenK.width = grenK.height = 256; { const g = grenK.getContext('2d'), d = g.createImageData(256, 256); for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 14; } g.putImageData(d, 0, 0); }
const AYAR = { altyazi: true };
function cizim(t, ctx) {
  t = clamp(t, 0, SURE - .001);
  let i = 0; while (i < CEKIM.length - 1 && t >= CEKIM[i + 1][0]) i++;
  const [b, f] = CEKIM[i];
  tc.setTransform(1, 0, 0, 1, 0, 0); tc.filter = 'none'; tc.globalAlpha = 1; tc.clearRect(0, 0, W, H);
  f(tc, t, t - b);
  tc.setTransform(1, 0, 0, 1, 0, 0);
  const gecmis = t >= SAHNE[5] && t < EV.donus;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.filter = gecmis ? 'sepia(.45) saturate(.55) brightness(1.06) contrast(.94)' : 'none';
  ctx.drawImage(tampon, 0, 0); ctx.filter = 'none';
  // vinyet
  const v = ctx.createRadialGradient(W / 2, H * .45, H * .3, W / 2, H * .5, H * .78); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, gecmis ? 'rgba(40,30,20,.6)' : 'rgba(0,0,0,.42)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  // gren
  ctx.save(); ctx.globalAlpha = 1; const ox = hash(Math.floor(t * 30)) * 256, oy = hash(Math.floor(t * 30) + 5) * 256; ctx.translate(-ox, -oy); ctx.fillStyle = ctx.createPattern(grenK, 'repeat'); ctx.fillRect(0, 0, W + 256, H + 256); ctx.restore();
  // geçişler: açılış, geçmişe giriş/çıkış flaşı
  if (t < .45) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .45})`; ctx.fillRect(0, 0, W, H); }
  for (const [g, d] of [[SAHNE[5], .45], [EV.donus, .4]]) if (t >= g && t < g + d) { ctx.fillStyle = `rgba(255,248,235,${.85 * (1 - (t - g) / d)})`; ctx.fillRect(0, 0, W, H); }
  if (gecmis && t > SAHNE[5] + .3) altBaslik(ctx, 'Bir saat önce...', t - SAHNE[5] - .3);
  if (t >= SAHNE[8] && t < SAHNE[8] + 3) altBaslik(ctx, 'Aynı gece, iki saat sonra', t - SAHNE[8]);
  if (t >= EV.baslik && t < SAHNE[2]) baslikKarti(ctx, t, t - EV.baslik);
  if (t < EV.karar) altyaziCiz(ctx, t);
}
