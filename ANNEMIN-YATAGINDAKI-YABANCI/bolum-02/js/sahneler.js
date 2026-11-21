// ANNEMİN YATAĞINDAKİ YABANCI — 2. BÖLÜM: O GECE NE OLDU? — çekim listesi
const BOLUM_YAZISI = '2. BÖLÜM — O GECE NE OLDU?';
const CEKIM = []; function cek(b, f) { CEKIM.push([b, f]); }
const S = SAHNE;
const GECMIS = [[Lb('N08') + .9, Lb('N09') - .05], [Lb('N11') + .25, Ls('N11') + .55]];
const ARA_YAZI = [[GECMIS[0][0] + .2, GECMIS[0][1], '27 yıl önce...']];

function odaCek(c, t, cam, o, kisiler, on) {
  let [cx, cy, z] = cam; cx += gurultu(t * .3, 11) * 10 / z; cy += gurultu(t * .25, 12) * 8 / z;
  c.save(); kamera(c, cx, cy, z);
  yatakArka(c, o, t); yatakArkaParca(c); yatakOnParca(c, { ortu: 0 }, t);
  kisiler.slice().sort((a, b) => a[1].y - b[1].y).forEach(([ad, p]) => kisiCiz(c, ad, p, t));
  if (on) { const [oad, taraf] = on, vw = W / z, vh = H / z, fs = 2.3 / z; c.save(); c.filter = 'blur(4px) brightness(.62)'; kisiCiz(c, oad, { x: cx + taraf * vw * .4, y: cy + vh * .4 + 835 * fs * KARAKTER[oad].boy, s: fs, arka: 1 }, t); c.restore(); }
  yatakIsik(c, o, t); c.restore();
}
function koridorCek(c, t, cam, kisiler) {
  let [cx, cy, z] = cam; c.save(); kamera(c, cx, cy, z);
  koridorArka(c, {}, t); kisiler.slice().sort((a, b) => a[1].y - b[1].y).forEach(([ad, p]) => kisiCiz(c, ad, p, t));
  koridorIsik(c, {}, t); c.restore();
}
const oSalon = t => ({ gece: .45, polis: .3, perde: ease(seg(t, EV.necla_pencere + 1.0, EV.necla_pencere + 1.6)) * (1 - ease(seg(t, Ls('N11') + .4, Ls('N11') + 1.2))), odaAcik: t > Lb('N16') ? 1 : .35 });
const oOda = t => ({ gece: .5, kapiAcik: 1 });

// ---------- KONUMLAR ----------
// SALON (1. bölümün son karesinden devam)
const sevda1 = t => { const w = yuruyus(t, Lb('N01') + 1.4, Lb('N01') + 2.6, 1360, 1460, 1300, 1470);
  return Object.assign(w, { duygu: 'uzgun', duygu2: 'ofke', dk: t < Ls('N01') ? .25 : 0, don: -.6, gozyasi: 1, titre: t < Ls('N01') ? .6 : 0, sol: t > Lb('N01') + 1 && t < Ls('N01') ? [-190, -560] : 'gogus' }); };
const mert1 = t => { const w = yuruyus(t, Lb('N01') + 1.8, Lb('N01') + 2.8, 860, 1460, 720, 1450);
  return Object.assign(w, { duygu: t > Lb('N02') ? 'ofke' : 'sok', duygu2: 'uzgun', dk: t > Lb('N03') ? .6 : 0, don: .6, gozyasi: .5, sag: t > Lb('N02') && t < Ls('N02') ? 'ac' : 'asagi', sol: t > Lb('N02') && t < Ls('N02') ? 'ac' : 'asagi' }); };
const sinan1 = t => { const w = yuruyus(t, Lb('N01') + 2, Lb('N01') + 3.3, 680, 1440, 1005, 1515); return Object.assign(w, { duygu: 'ciddi', don: t > Lb('N02') && t < Ls('N02') ? -.6 : .4, sag: t > Lb('N01') + 3.3 && t < S[2] ? [150, -560] : 'asagi', sagN: null }); };
const necla1 = t => ({ x: 420, y: 1380, s: olcek(1380), duygu: 'endise', don: .6, sol: 'agiz' });

const sinan2 = t => ({ x: 995, y: 1510, s: olcek(1510), duygu: 'ciddi', duygu2: 'dusun', dk: t > Lb('N06') ? .5 : 0, don: t > Lb('N05') ? -.5 : 0, sol: 'tut', solN: 'foto', sag: 'ekran', sagN: 'telEkran', bak: t < Lb('N05') ? [-.2, .7] : null });
const mert2 = t => { const w = yuruyus(t, S[2] + .3, S[2] + 1.4, 720, 1450, 830, 1470); return Object.assign(w, { duygu: t > Lb('N05') ? 'sok' : 'endise', don: t > Lb('N07') ? .7 : .55, gozyasi: .5 }); };
const sevda2 = t => { const w = yuruyus(t, S[2] + .4, EV.otur, 1300, 1470, 1300, 1270); const ot = ease(seg(t, EV.otur, EV.otur + .7));
  return Object.assign(w, { otur: ot, duygu: 'uzgun', don: -.4, gozyasi: .9, sol: 'gogus', sag: ot > .5 ? 'gogus' : 'asagi', bak: t > Lb('N07') ? [-.1, .4] : null }); };

const necla3 = t => { const w = yuruyus(t, S[3], S[3] + 1.2, 420, 1380, 1180, 1265); const don = t > Lb('N10') - .2;
  return Object.assign(w, { arka: t < Lb('N10') - .2 ? 1 : 0, duygu: 'uzgun', duygu2: 'endise', dk: .4, don: don ? -.5 : 0, sag: t > Lb('N10') && t < Ls('N10') ? 'ac' : 'asagi', sol: 'gogus' }); };
const mert3 = t => ({ x: 830, y: 1470, s: olcek(1470), duygu: t > Lb('N09') && t < Ls('N09') ? 'ofke' : 'endise', don: .55, sag: t > Lb('N09') && t < Ls('N09') ? 'ac' : 'asagi' });
const sevda3 = t => ({ x: 1300, y: 1270, s: olcek(1270), otur: 1, duygu: 'uzgun', don: -.3, gozyasi: t > Lb('N11') ? 1 : .8, sol: 'gogus', sag: 'gogus', titre: t > Lb('N11') ? .7 : 0 });

const mert4 = t => { const a = yuruyus(t, S[4] + .2, S[4] + 1.8, 830, 1470, 1080, 1490), b = yuruyus(t, Lb('N13') + .2, Lb('N13') + 1.4, 1080, 1490, 900, 1470);
  const w = t < Lb('N13') ? a : b; return Object.assign(w, { duygu: t > Lb('N13') && t < Ls('N13') ? 'sok' : 'endise', duygu2: 'uzgun', dk: .3, don: t > Lb('N16') ? .8 : .6, gozyasi: .5, sag: t > Lb('N15') && t < Ls('N15') ? 'isaret' : 'asagi' }); };
const sevda4 = t => { const ot = 1 - ease(seg(t, S[4] + .2, S[4] + .9)); const w = yuruyus(t, Lb('N12') + .5, Lb('N14') + .5, 1300, 1270, 1650, 1330);
  return Object.assign(w, { otur: ot, duygu: 'uzgun', don: t > Lb('N13') ? -.55 : .5, gozyasi: .6, sol: 'gogus', bak: t > Lb('N14') ? [-.3, .3] : null }); };
const sinan4 = t => ({ x: 995, y: 1510, s: olcek(1510), duygu: 'dusun', duygu2: 'ciddi', dk: t > Lb('N16') ? 1 : 0, don: t > Lb('N16') ? .7 : -.3, sol: 'tut', solN: 'foto', sag: t > Lb('N16') ? 'isaret' : 'asagi' });
const necla4 = t => ({ x: 1180, y: 1265, s: olcek(1265), duygu: 'uzgun', don: -.4, sol: 'gogus' });

// KORİDOR: Mert önde, Sinan ve Sevda arkasında
const kor = (t, gecikme, y) => { const w = yuruyus(t, EV.koridor + gecikme, EV.koridor + gecikme + 3.1, 300, y, 2350, y); return Object.assign(w, { yon: 1 }); };
const mertK = t => Object.assign(kor(t, 0, 1520), { duygu: 'endise', don: .5, gozyasi: .4 });
const sinanK = t => Object.assign(kor(t, .55, 1470), { duygu: 'ciddi', don: .4, sol: 'tut', solN: 'foto' });
const sevdaK = t => Object.assign(kor(t, .35, 1560), { duygu: 'uzgun', don: .4, sol: 'gogus' });

// YATAK ODASI
const mert5 = t => { const w = t < S[5] ? yuruyus(t, EV.oda_gir, EV.oda_gir + .9, 1850, 1215, 1500, 1330) : { x: 700, y: 1310, s: olcek(1310), yuru: null };
  return Object.assign(w, { otur: t > S[5] ? .85 : 0, duygu: t > Lb('N19') ? 'sicak' : 'uzgun', duygu2: 'endise', dk: t > Ls('N19') ? .8 : 0, don: t > Lb('N18') ? .6 : .2, gozyasi: .6,
    sag: t > Lb('N19') && t < Ls('N19') ? 'ac' : 'asagi' }); };
const sinan5 = t => ({ x: 1060, y: 1390, s: olcek(1390), duygu: 'ciddi', don: t > Lb('N20') ? -.6 : -.3, eldiven: t > EV.eldiven, sag: t > EV.eldiven - .3 && t < EV.eldiven + .3 ? 'gogus' : (t > Lb('N18') ? 'tut' : 'asagi'), sagN: t > Lb('N18') ? 'foto' : null, sol: t > EV.eldiven - .3 && t < EV.eldiven + .3 ? 'gogus' : 'asagi' });
const sevda5 = t => ({ x: 470, y: 1450, s: olcek(1450), duygu: t > Lb('N20') ? 'korku' : 'uzgun', duygu2: 'endise', dk: .3, don: .55, gozyasi: .7, sol: 'gogus', sag: t > Lb('N20') && t < Ls('N20') ? [180, -540] : 'asagi' });

const mert6 = t => ({ x: 700, y: 1310, s: olcek(1310), otur: .85, duygu: t > Lb('N21') && t < Ls('N21') ? 'sok' : 'endise', duygu2: 'uzgun', dk: .4, don: .4, gozyasi: .6, sag: 'tut', sagN: 'foto', bak: t > Lb('N25') ? [0, .7] : null });
const sevda6 = t => ({ x: 470, y: 1450, s: olcek(1450), duygu: 'korku', duygu2: 'uzgun', dk: t > Lb('N24') ? .5 : 0, don: .55, gozyasi: 1, titre: 1.1, sol: 'gogus', sag: 'gogus' });
const sinan6 = t => ({ x: 1060, y: 1390, s: olcek(1390), duygu: 'dusun', don: -.55, eldiven: 1 });

const mert7 = t => ({ x: 1100, y: 1405, s: olcek(1405), otur: 1, duygu: t > Lb('N27') ? 'uzgun' : 'endise', duygu2: 'ofke', dk: t > Lb('N29') ? .4 : 0, don: -.5, gozyasi: 1, titre: t < Ls('N27') ? .8 : .3,
  sag: t < Lb('N27') + .5 ? 'tut' : 'gogus', sol: t < Lb('N27') + .5 ? 'tut' : 'asagi', bak: t < Lb('N27') ? [0, .7] : null });
const sevda7 = t => { const ot = ease(seg(t, EV.sevda_otur, EV.sevda_otur + .9)); const w = yuruyus(t, EV.sevda_otur - .2, EV.sevda_otur + .6, 520, 1440, 345, 1338);
  return Object.assign(w, { otur: ot, duygu: 'uzgun', don: .55, gozyasi: 1, sol: 'gogus', sag: t > EV.sevda_otur ? 'tut' : 'asagi', bak: t > EV.sevda_otur ? [.2, .7] : null }); };
const sinan7 = t => ({ x: 1520, y: 1250, s: olcek(1250), duygu: 'dusun', don: -.4, eldiven: 1, sag: 'tut', sagN: 'foto' });

const sevda8 = t => { const ot = 1 - ease(seg(t, EV.kalk, EV.kalk + .35)); const w = yuruyus(t, EV.kalk + .2, EV.kalk + .9, 345, 1338, 560, 1440);
  return Object.assign(w, { otur: ot, duygu: t > EV.kalk ? 'korku' : 'uzgun', duygu2: 'uzgun', dk: t > Lb('N32') ? .6 : 0, don: .6, gozyasi: 1, titre: t > EV.kalk ? 1.2 : 0, sol: 'gogus', sag: t > Lb('N32') ? 'gogus' : 'asagi' }); };
const mert8 = t => ({ x: 1100, y: 1405, s: olcek(1405), otur: 1, duygu: t > Lb('N33') - .2 ? 'sok' : 'endise', duygu2: 'korku', dk: t > Lb('N31') ? .5 : 0, don: t > EV.kalk ? -.65 : -.3, gozyasi: .9, sag: 'tut', sagN: t < Lb('N30') ? 'foto' : null, titre: t > Lb('N33') ? 1 : 0 });

// ---------- ÇEKİMLER ----------
// SAHNE 1 — VURUCU GİRİŞ
cek(0, (c, t, lt) => { const p = sevda1(t); const [x] = yakin('SEVDA', p); salonCek(c, t, [x, basY('SEVDA', p) + 23 * p.s * KARAKTER.SEVDA.boy, lerp(6.8, 6.0, lt / 1.4) / p.s], oSalon(t), [['SEVDA', p]]); });
cek(1.4, (c, t, lt) => salonCek(c, t, [lerp(1080, 1020, lt / 3), 1010, 1.25], oSalon(t), [['SEVDA', sevda1(t)], ['MERT', mert1(t)], ['SINAN', sinan1(t)], ['NECLA', necla1(t)]]));
cek(Lb('N02') - .05, (c, t, lt) => { const p = mert1(t); const [x, y] = yakin('MERT', p, 3); salonCek(c, t, [x + 20, y + 30, 2.9 / p.s], oSalon(t), [['MERT', p]], ['SEVDA', 1]); });
cek(Lb('N03') - .05, (c, t, lt) => { const p = sevda1(t); const [x, y] = yakin('SEVDA', p, 3.5); salonCek(c, t, [x, y, lerp(3.5, 4.0, lt / 3) / p.s], oSalon(t), [['SEVDA', p]]); });

// SAHNE 2 — KAYIP ÇOCUĞUN DOSYASI
cek(S[2], (c, t, lt) => insArsiv(c, t, lt, { yil: 1999, yas: 7 }));
cek(Lb('N04') + 2.2, (c, t, lt) => { const p = sinan2(t); const [x, y, z] = orta('SINAN', p, 2.3); salonCek(c, t, [x, y, z], oSalon(t), [['SINAN', p], ['MERT', mert2(t)]]); });
cek(Lb('N05') - .05, (c, t, lt) => { const p = mert2(t); const [x, y] = yakin('MERT', p, 3.3); salonCek(c, t, [x, y, 3.3 / p.s], oSalon(t), [['MERT', p]]); });
cek(Lb('N06') - .05, (c, t, lt) => { const p = sinan2(t); const [x, y] = yakin('SINAN', p, 3); salonCek(c, t, [x - 20, y + 30, 2.9 / p.s], oSalon(t), [['SINAN', p]], ['MERT', -1]); });
cek(EV.otur - .4, (c, t, lt) => salonCek(c, t, [lerp(1200, 1260, lt / 1.2), 1000, 1.4], oSalon(t), [['SEVDA', sevda2(t)], ['SINAN', sinan2(t)]]));
cek(Lb('N07') + .1, (c, t, lt) => { const p = sevda2(t); const [x, y] = yakin('SEVDA', p, 3.4); salonCek(c, t, [x, y, lerp(3.4, 4.3, ease(lt / 2.8)) / p.s], oSalon(t), [['SEVDA', p]]); });

// SAHNE 3 — KOMŞUNUN HATIRLADIĞI GECE
cek(S[3], (c, t, lt) => salonCek(c, t, [lerp(800, 1150, ease(lt / 1.5)), lerp(1000, 900, ease(lt / 1.5)), lerp(1.2, 1.7, ease(lt / 1.5))], oSalon(t), [['NECLA', necla3(t)], ['MERT', mert3(t)], ['SEVDA', sevda3(t)]]));
cek(GECMIS[0][0], (c, t, lt) => disGecmis(c, t, lt, { kapi: 1 - ease(seg(lt, 2.2, 2.6)) }));
cek(Lb('N09') - .05, (c, t, lt) => { const p = mert3(t); const [x, y] = yakin('MERT', p, 3.3); salonCek(c, t, [x, y, 3.3 / p.s], oSalon(t), [['MERT', p]]); });
cek(Lb('N10') - .05, (c, t, lt) => { const p = necla3(t); const [x, y] = yakin('NECLA', p, 3.2); salonCek(c, t, [x, y, lerp(3.2, 3.6, lt / 3) / p.s], oSalon(t), [['NECLA', p]]); });
cek(Lb('N11') - .05, (c, t, lt) => { const p = sevda3(t); const [x, y] = yakin('SEVDA', p, 3.6); salonCek(c, t, [x, y, 3.6 / p.s], oSalon(t), [['SEVDA', p]]); });
cek(GECMIS[1][0], (c, t, lt) => { c.save(); c.translate(W / 2, H * .62); c.scale(1.7, 1.7); c.translate(-W / 2 + 120, -H * .62 - 60); disGecmis(c, t, lt + 1.6, { kapi: 1 }); c.restore(); });
cek(GECMIS[1][1], (c, t, lt) => { const p = sevda3(t); const [x, y] = yakin('SEVDA', p, 3.8); salonCek(c, t, [x, y, 3.8 / p.s], oSalon(t), [['SEVDA', p]]); });

// SAHNE 4 — MERT'İN HATIRLADIĞI KUTU
cek(S[4], (c, t, lt) => salonCek(c, t, [lerp(1000, 1150, lt / 2.5), 1010, 1.2], oSalon(t), [['MERT', mert4(t)], ['SEVDA', sevda4(t)], ['SINAN', sinan4(t)], ['NECLA', necla4(t)]]));
cek(Lb('N12') + .4, (c, t, lt) => { const p = sevda4(t); const [x, y] = yakin('SEVDA', p, 3.2); salonCek(c, t, [x, y, 3.2 / p.s], oSalon(t), [['SEVDA', p]]); });
cek(Lb('N13') - .05, (c, t, lt) => { const p = mert4(t); const [x, y, z] = orta('MERT', p, 2.2); salonCek(c, t, [x, y, z], oSalon(t), [['MERT', p]]); });
cek(Lb('N14') - .05, (c, t, lt) => { const p = sevda4(t); const [x, y] = yakin('SEVDA', p, 3.4); salonCek(c, t, [x, y, lerp(3.4, 3.9, lt / 2.5) / p.s], oSalon(t), [['SEVDA', p]]); });
cek(Lb('N15') - .05, (c, t, lt) => { const p = mert4(t); const [x, y] = yakin('MERT', p, 3.3); salonCek(c, t, [x, y, 3.3 / p.s], oSalon(t), [['MERT', p]]); });
cek(Lb('N16') - .05, (c, t, lt) => { const p = sinan4(t); const [x, y, z] = orta('SINAN', p, 2.3); salonCek(c, t, [x, y, z], oSalon(t), [['SINAN', p]]); });
cek(EV.koridor, (c, t, lt) => { const m = mertK(t); koridorCek(c, t, [clamp(m.x - 60, 700, 2300), 1020, 1.2], [['MERT', m], ['SINAN', sinanK(t)], ['SEVDA', sevdaK(t)]]); });
cek(EV.oda_gir, (c, t, lt) => odaCek(c, t, [lerp(1500, 1300, ease(lt / .9)), 1000, .95], oOda(t), [['MERT', mert5(t)]]));

// SAHNE 5 — ANNENİN SAKLADIĞI MEKTUP
cek(S[5], (c, t, lt) => insCekmece(c, t, lt));
cek(Lb('N17') - .05, (c, t, lt) => { const p = mert5(t); const [x, y] = yakin('MERT', p, 3.3); odaCek(c, t, [x, y, lerp(3.3, 3.7, lt / 2.5) / p.s], oOda(t), [['MERT', p]]); });
cek(EV.eldiven - .1, (c, t, lt) => { const p = sinan5(t); const [x, y, z] = orta('SINAN', p, 2.3); odaCek(c, t, [x, y, z], oOda(t), [['SINAN', p]]); });
cek(EV.kutu, (c, t, lt) => insKutu(c, t, lt));
cek(Lb('N18') + 1.0, (c, t, lt) => { const p = sinan5(t); const [x, y] = yakin('SINAN', p, 3); odaCek(c, t, [x - 20, y + 30, 2.9 / p.s], oOda(t), [['SINAN', p]], ['MERT', -1]); });
cek(Lb('N19') - .05, (c, t, lt) => { const p = mert5(t); const [x, y] = yakin('MERT', p, 3.4); odaCek(c, t, [x, y, 3.4 / p.s], oOda(t), [['MERT', p]]); });
cek(Lb('N20') - .05, (c, t, lt) => { const p = sevda5(t); const [x, y] = yakin('SEVDA', p, 3.3); odaCek(c, t, [x, y, lerp(3.3, 3.8, lt / 2.5) / p.s], oOda(t), [['SEVDA', p]]); });

// SAHNE 6 — FOTOĞRAFTAKİ ADAM
cek(S[6], (c, t, lt) => insFoto3(c, t, lt, 'SINAN'));
cek(Lb('N21') + 1.2, (c, t, lt) => { const p = mert6(t); const [x, y] = yakin('MERT', p, 3.3); odaCek(c, t, [x, y, 3.3 / p.s], oOda(t), [['MERT', p]]); });
cek(Lb('N22') - .05, (c, t, lt) => { const p = sevda6(t); const [x, y] = yakin('SEVDA', p, 3.5); odaCek(c, t, [x, y, lerp(3.5, 4.1, lt / 3) / p.s], oOda(t), [['SEVDA', p]]); });
cek(Lb('N23') - .05, (c, t, lt) => { const p = sinan6(t); const [x, y] = yakin('SINAN', p, 3.2); odaCek(c, t, [x, y, 3.2 / p.s], oOda(t), [['SINAN', p]]); });
cek(Lb('N24') - .05, (c, t, lt) => { const p = sevda6(t); const [x, y] = yakin('SEVDA', p, 3.7); odaCek(c, t, [x, y, 3.7 / p.s], oOda(t), [['SEVDA', p]]); });
cek(EV.arka, (c, t, lt) => insFotoArka(c, t, lt, 0));

// SAHNE 7 — ANNENİN SON MEKTUBU
cek(S[7], (c, t, lt) => odaCek(c, t, [lerp(900, 950, lt / 1.5), 1000, 1.1], oOda(t), [['MERT', mert7(t)], ['SEVDA', sevda7(t)], ['SINAN', sinan7(t)]]));
cek(Lb('N26') - .2, (c, t, lt) => insMektup(c, t, lt, clamp((t - Lb('N26')) / L('N26').d, 0, 1)));
cek(Ls('N26') + .3, (c, t, lt) => { const p = mert7(t); const [x, y] = yakin('MERT', p, 3.4); odaCek(c, t, [x, y, lerp(3.4, 4.0, lt / 3.5) / p.s], oOda(t), [['MERT', p]]); });
cek(Lb('N28') - .05, (c, t, lt) => { const p = sevda7(t); const [x, y] = yakin('SEVDA', p, 3); odaCek(c, t, [x + 20, y + 30, 2.9 / p.s], oOda(t), [['SEVDA', p]], ['MERT', 1]); });
cek(Lb('N29') - .05, (c, t, lt) => { const p = mert7(t); const [x, y] = yakin('MERT', p, 3.5); odaCek(c, t, [x, y, 3.5 / p.s], oOda(t), [['MERT', p]]); });
cek(EV.sevda_otur - .2, (c, t, lt) => odaCek(c, t, [lerp(600, 520, lt / 1.6), lerp(1050, 1000, lt / 1.6), 1.6], oOda(t), [['SEVDA', sevda7(t)], ['MERT', mert7(t)]]));

// SAHNE 8 — ŞOKE EDİCİ FİNAL
cek(S[8], (c, t, lt) => insFotoArka(c, t, lt, ease(seg(lt, 0, 1.6))));
cek(EV.kalk - .1, (c, t, lt) => odaCek(c, t, [lerp(620, 680, lt / 1.5), 1000, 1.45], oOda(t), [['SEVDA', sevda8(t)], ['MERT', mert8(t)]]));
cek(Lb('N30') + .4, (c, t, lt) => { const p = sevda8(t); const [x, y] = yakin('SEVDA', p, 3.4); odaCek(c, t, [x, y, 3.4 / p.s], oOda(t), [['SEVDA', p]]); });
cek(Lb('N31') - .05, (c, t, lt) => { const p = mert8(t); const [x, y] = yakin('MERT', p, 3); odaCek(c, t, [x - 20, y + 30, 2.9 / p.s], oOda(t), [['MERT', p]], ['SEVDA', -1]); });
cek(Lb('N32') - .05, (c, t, lt) => { const p = sevda8(t); const [x, y] = yakin('SEVDA', p, 3.6); odaCek(c, t, [x, y, lerp(3.6, 4.3, lt / 3.5) / p.s], oOda(t), [['SEVDA', p]]); });
cek(EV.mert_yakin, (c, t, lt) => { const p = mert8(t); const [x, y] = yakin('MERT', p, 3); odaCek(c, t, [x, y, lerp(3.0, 4.6, ease(lt / 2.2)) / p.s], oOda(t), [['MERT', p]]); });
cek(EV.sevda_goz, (c, t, lt) => { const p = sevda8(t); const [x] = yakin('SEVDA', p); odaCek(c, t, [x + p.don * 10 * p.s, basY('SEVDA', p) + 23 * p.s * KARAKTER.SEVDA.boy, lerp(6.0, 7.2, lt / 1.8) / p.s], oOda(t), [['SEVDA', p]]); });
cek(EV.karar, (c, t, lt) => bitisKarti(c, t, lt));

CEKIM.sort((a, b) => a[0] - b[0]);
