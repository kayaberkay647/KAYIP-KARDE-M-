// ANNEMİN YATAĞINDAKİ YABANCI — 1. BÖLÜM: O KADIN KİMDİ? — çekim listesi
const BOLUM_YAZISI = '1. BÖLÜM — O KADIN KİMDİ?';
const CEKIM = []; function cek(b, f) { CEKIM.push([b, f]); }
const S = SAHNE;
const GECMIS = [];
const ARA_YAZI = [[S[7], S[7] + 3, 'Bir süre sonra...']];

// Yatak odası çekimi: yatakta uzanan/doğrulan Sevda + ayaktaki karakterler
function odaCek(c, t, cam, o, kisiler, yatakta, on) {
  let [cx, cy, z] = cam; cx += gurultu(t * .35, 11) * 15 / z; cy += gurultu(t * .3, 12) * 12 / z;
  c.save(); kamera(c, cx, cy, z);
  yatakArka(c, o, t); yatakArkaParca(c);
  if (yatakta) yataktaKisi(c, 'SEVDA', yatakta.p, yatakta.d, t);
  yatakOnParca(c, { ortu: yatakta ? 1 - yatakta.d : 0 }, t);
  kisiler.slice().sort((a, b) => a[1].y - b[1].y).forEach(([ad, p]) => kisiCiz(c, ad, p, t));
  if (on) { const [oad, taraf] = on, vw = W / z, vh = H / z, fs = 2.3 / z; c.save(); c.filter = 'blur(4px) brightness(.62)'; kisiCiz(c, oad, { x: cx + taraf * vw * .4, y: cy + vh * .4 + 835 * fs * KARAKTER[oad].boy, s: fs, arka: 1 }, t); c.restore(); }
  yatakIsik(c, o, t); c.restore();
}
const oOda = t => ({ gece: .5, kapiAcik: 1 });
const oSalon = t => ({ gece: .45, kapiAcik: t > S[3] && t < S[4] ? ease(seg(t, EV.kapi_ac, EV.kapi_ac + .5)) : 0, odaAcik: t > EV.sevda_cik - .3 ? 1 : .35, polis: t > S[7] ? .35 : 0 });

// ---------- KONUMLAR ----------
const MERT_KAPI = [1850, 1215];
const sevdaYatak = t => ({ p: { s: .95, duygu: t < EV.dogrul + .6 ? 'notr' : 'uzgun', uyku: t < EV.dogrul, don: t < EV.dogrul ? 0 : .5, sol: 'asagi', sag: t > EV.dogrul + 1 ? 'gogus' : 'asagi' }, d: ease(seg(t, EV.dogrul, EV.dogrul + 1.3)) });
const mert1 = t => { const w = yuruyus(t, Lb('M02') - .1, Lb('M02') + .7, MERT_KAPI[0] - 60, MERT_KAPI[1] + 80, MERT_KAPI[0], MERT_KAPI[1]);
  return Object.assign(w, { duygu: t > Lb('M04') ? 'sok' : 'korku', titre: 1.3, don: -.6, sol: t < Lb('M02') ? 'asagi' : 'gogus', sag: t > Lb('M02') && t < Ls('M02') ? 'ac' : 'asagi', bak: t < 1.5 ? [-.7 + gurultu(t * 3, 2) * .2, .1] : null }); };

const sevda2 = t => { const w = yuruyus(t, S[2], S[2] + 1.0, 1500, 1340, 1380, 1440); return Object.assign(w, { duygu: 'uzgun', duygu2: 'endise', dk: t > Lb('M09') ? .5 : 0, don: .55, gozyasi: t > Lb('M07') ? .9 : .4, sol: 'gogus', sag: t > Lb('M09') ? 'gogus' : 'asagi' }); };
const mert2 = t => ({ x: MERT_KAPI[0], y: MERT_KAPI[1] + 40, s: olcek(MERT_KAPI[1] + 40), duygu: t > Lb('M06') && t < Ls('M08') ? 'ofke' : 'sok', duygu2: 'uzgun', dk: .2, don: -.6, sag: t > Lb('M08') && t < Ls('M08') ? 'ac' : 'asagi', sol: t > Lb('M06') && t < Ls('M06') ? 'isaret' : 'asagi' });

const mert3 = t => { const w = t < EV.kapi_ac + .2 ? yuruyus(t, EV.mert_yuru, EV.kapi_ac, 1500, 1420, 640, 1310) : yuruyus(t, EV.kapi_ac + .3, EV.kapi_ac + 1.2, 640, 1310, 780, 1400);
  return Object.assign(w, { duygu: 'korku', duygu2: 'ofke', dk: t > Lb('M13') ? .4 : 0, don: t > EV.sevda_cik + .3 ? .8 : -.55, sol: t > EV.kapi_ac - .3 && t < EV.kapi_ac + .3 ? 'uzat' : 'asagi', sag: t > Lb('M11') && t < Ls('M11') ? 'isaret' : 'asagi' }); };
const necla3 = t => { const w = yuruyus(t, Lb('M11'), Lb('M11') + 1.2, 340, 1205, 520, 1350);
  return Object.assign(w, { duygu: t > Lb('M12') ? 'sok' : 'endise', don: t > EV.sevda_cik + .3 ? .8 : .55, sol: t < Ls('M10') ? 'gogus' : 'asagi', sag: t > Lb('M14') ? 'gogus' : 'asagi' }); };
const sevda3 = t => { const w = yuruyus(t, EV.sevda_cik, EV.sevda_cik + 1.3, 2190, 1200, 1450, 1440); return Object.assign(w, { duygu: 'uzgun', don: -.6, sol: 'gogus' }); };

const P = { mert: [930, 1480], necla: [540, 1400], sevda: [1360, 1460] };
const mert4 = t => ({ x: P.mert[0], y: P.mert[1], s: olcek(P.mert[1]), duygu: t > Lb('M17') && t < Ls('M17') ? 'ofke' : 'endise', duygu2: 'uzgun', dk: .3, don: t > Lb('M19') && t < Ls('M19') ? -.5 : .55, sag: t > Lb('M15') && t < Ls('M15') ? 'ac' : 'asagi', sol: t > Lb('M17') && t < Ls('M17') ? 'isaret' : 'asagi' });
const necla4 = t => ({ x: P.necla[0], y: P.necla[1], s: olcek(P.necla[1]), duygu: 'endise', don: .6, sol: 'gogus', sag: t > Lb('M19') && t < Ls('M19') ? 'ac' : 'asagi' });
const sevda4 = t => ({ x: P.sevda[0], y: P.sevda[1], s: olcek(P.sevda[1]), duygu: 'uzgun', don: -.55, gozyasi: .5, sol: t > EV.canta ? [-140, -430] : 'gogus', bak: t > Lb('M16') && t < Ls('M16') ? [-.3, .5] : null });

const mert5 = t => ({ x: P.mert[0], y: P.mert[1], s: olcek(P.mert[1]), duygu: t > Lb('M21') ? 'sok' : 'endise', duygu2: 'uzgun', dk: t > Lb('M24') ? .7 : 0, don: .55, gozyasi: t > Lb('M22') ? .7 : .3,
  sag: t > Lb('M21') + .4 ? 'tut' : 'asagi', sagN: t > Lb('M21') + .4 ? 'foto' : null });
const sevda5 = t => ({ x: P.sevda[0], y: P.sevda[1], s: olcek(P.sevda[1]), duygu: 'uzgun', don: -.55, gozyasi: t > Lb('M22') ? 1 : .6, sol: t < Lb('M21') + .4 ? 'uzat' : 'gogus', solN: t < Lb('M21') + .4 ? 'foto' : null });
const necla5 = t => ({ x: P.necla[0], y: P.necla[1], s: olcek(P.necla[1]), duygu: t > Lb('M23') ? 'sok' : 'endise', don: .6, sol: 'agiz' });

const mert6 = t => ({ x: P.mert[0], y: P.mert[1], s: olcek(P.mert[1]), duygu: t > Lb('M30') ? 'ofke' : 'uzgun', duygu2: 'ofke', dk: t > Lb('M28') ? .6 : 0, don: .55, gozyasi: 1, titre: t > Lb('M26') && t < Ls('M26') ? 1.2 : 0,
  sag: t < EV.tusla ? 'tut' : 'ekran', sagN: t < EV.tusla ? 'foto' : 'telEkran' });
const sevda6 = t => ({ x: P.sevda[0], y: P.sevda[1], s: olcek(P.sevda[1]), duygu: t > Lb('M31') ? 'notr' : 'uzgun', don: -.55, gozyasi: t > Lb('M29') ? 1 : .7, sol: 'gogus' });

const sinan7 = t => ({ x: 680, y: 1440, s: olcek(1440), duygu: t > Lb('M37') ? 'dusun' : 'ciddi', don: t > Lb('M34') && t < Ls('M35') ? .7 : .4, sag: 'tut', sagN: 'foto', bak: t < Lb('M32') + .6 ? [.1, .7] : null });
const mert7 = t => ({ x: 980, y: 1470, s: olcek(1470), duygu: t > Lb('M36') ? 'sok' : 'uzgun', don: t > Lb('M36') ? .6 : -.5, gozyasi: .6, sol: t > Lb('M33') && t < Ls('M33') ? 'isaret' : 'asagi' });
const sevda7 = t => ({ x: 1360, y: 1460, s: olcek(1460), duygu: 'uzgun', don: -.6, gozyasi: .7, sol: 'gogus', bak: t > Lb('M35') ? [-.3, .6] : null });
const necla7 = t => ({ x: 420, y: 1380, s: olcek(1380), duygu: 'endise', don: .6, sol: 'gogus' });

const sinan8 = t => ({ x: 680, y: 1440, s: olcek(1440), duygu: 'ciddi', duygu2: 'dusun', dk: t > Lb('M38') ? .4 : 0, don: t > EV.bakis ? .85 : .2, sag: t < Ls('M38') ? 'ekran' : 'asagi', sagN: t < Ls('M38') ? 'telEkran' : null, bak: t < Lb('M38') ? [0, .7] : null });
const mert8 = t => { const w = yuruyus(t, Lb('M38') + .5, Lb('M38') + 1.6, 980, 1470, 860, 1460); return Object.assign(w, { duygu: 'sok', duygu2: 'korku', dk: t > Lb('M41') ? 1 : 0, don: t > EV.bakis + .3 ? .7 : -.55, gozyasi: .8, titre: t > Lb('M39') ? .8 : 0 }); };
const sevda8 = t => ({ x: 1360, y: 1460, s: olcek(1460), duygu: 'uzgun', duygu2: 'korku', dk: t > EV.goz ? .3 : 0, don: -.6, gozyasi: 1, sol: 'gogus', bak: t < Lb('M40') ? [-.1, .8] : t > EV.goz ? [-.15, .05] : null });

// ---------- ÇEKİMLER ----------
// SAHNE 1 — ŞOK EDİCİ GİRİŞ
cek(0, (c, t, lt) => { const p = mert1(t); const [x] = yakin('MERT', p); const y = basY('MERT', p) + 23 * p.s * KARAKTER.MERT.boy; odaCek(c, t, [x, y, lerp(6.6, 5.8, lt / 1.6) / p.s], oOda(t), [['MERT', p]], sevdaYatak(t)); });
cek(1.6, (c, t, lt) => odaCek(c, t, [lerp(1150, 1080, lt / 2.4), lerp(980, 940, lt / 2.4), lerp(1.9, 2.3, lt / 2.4)], oOda(t), [], sevdaYatak(t)));
cek(4.0, (c, t, lt) => odaCek(c, t, [lerp(1350, 1330, lt), 1000, .86], oOda(t), [['MERT', mert1(t)]], sevdaYatak(t)));
cek(Lb('M02') + .8, (c, t, lt) => { const p = mert1(t); const [x, y] = yakin('MERT', p, 3.3); odaCek(c, t, [x, y, 3.3 / p.s], oOda(t), [['MERT', p]], sevdaYatak(t)); });
cek(EV.dogrul, (c, t, lt) => odaCek(c, t, [lerp(1260, 1290, lt / 2), lerp(860, 780, ease(lt / 1.4)), 2.0], oOda(t), [], sevdaYatak(t)));
cek(Lb('M03') + .9, (c, t, lt) => odaCek(c, t, [1340, 660, lerp(3.4, 3.8, lt / 2)], oOda(t), [], sevdaYatak(t)));
cek(Lb('M04') - .05, (c, t, lt) => { const p = mert1(t); const [x, y] = yakin('MERT', p, 3.6); odaCek(c, t, [x, y, lerp(3.6, 4.3, lt / 2) / p.s], oOda(t), [['MERT', p]], sevdaYatak(t)); });

// SAHNE 2 — YABANCI KADININ SÖZLERİ
cek(S[2], (c, t, lt) => odaCek(c, t, [lerp(1500, 1560, lt / 1.4), 1000, .95], oOda(t), [['SEVDA', sevda2(t)], ['MERT', mert2(t)]], null));
cek(Lb('M05') - .05, (c, t, lt) => { const p = sevda2(t); const [x, y] = yakin('SEVDA', p, 3.3); odaCek(c, t, [x, y, lerp(3.2, 3.6, lt / 2.5) / p.s], oOda(t), [['SEVDA', p]], null); });
cek(Lb('M06') - .05, (c, t, lt) => { const p = mert2(t); const [x, y] = yakin('MERT', p, 3); odaCek(c, t, [x + 20, y + 30, 2.9 / p.s], oOda(t), [['MERT', p]], null, ['SEVDA', -1]); });
cek(Lb('M07') - .05, (c, t, lt) => { const p = sevda2(t); const [x, y] = yakin('SEVDA', p, 3.6); odaCek(c, t, [x, y, lerp(3.6, 4.1, lt / 3) / p.s], oOda(t), [['SEVDA', p]], null); });
cek(Lb('M08') - .05, (c, t, lt) => { const p = mert2(t); const [x, y, z] = orta('MERT', p, 2.3); odaCek(c, t, [x, y, z], oOda(t), [['MERT', p]], null); });
cek(Lb('M09') - .05, (c, t, lt) => { const p = sevda2(t); const [x, y] = yakin('SEVDA', p, 3); odaCek(c, t, [x - 20, y + 30, 2.9 / p.s], oOda(t), [['SEVDA', p]], null, ['MERT', 1]); });

// SAHNE 3 — KOMŞUNUN GELİŞİ
cek(S[3], (c, t, lt) => { const p = mert2(t); const [x, y] = yakin('MERT', p, 3.2); odaCek(c, t, [x, y, 3.2 / p.s], oOda(t), [['MERT', Object.assign(p, { duygu: 'sok', don: .3, bak: [.8, 0] })]], null); });
cek(EV.mert_yuru, (c, t, lt) => salonCek(c, t, [lerp(1350, 720, ease(lt / 1.5)), 1000, 1.15], oSalon(t), [['MERT', mert3(t)]]));
cek(EV.kapi_ac + .1, (c, t, lt) => salonCek(c, t, [lerp(500, 560, lt / 1.5), 1000, 1.25], oSalon(t), [['MERT', mert3(t)], ['NECLA', necla3(t)]]));
cek(Lb('M10') + .5, (c, t, lt) => { const p = necla3(t); const [x, y] = yakin('NECLA', p, 3.2); salonCek(c, t, [x, y, 3.2 / p.s], oSalon(t), [['NECLA', p]]); });
cek(Lb('M11') - .05, (c, t, lt) => { const p = mert3(t); const [x, y] = yakin('MERT', p, 3); salonCek(c, t, [x + 20, y + 30, 2.9 / p.s], oSalon(t), [['MERT', p]], ['NECLA', -1]); });
cek(Lb('M12') - .05, (c, t, lt) => { const p = necla3(t); const [x, y] = yakin('NECLA', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], oSalon(t), [['NECLA', p]]); });
cek(Lb('M13') - .05, (c, t, lt) => { const p = mert3(t); const [x, y, z] = orta('MERT', p, 2.3); salonCek(c, t, [x, y, z], oSalon(t), [['MERT', p], ['NECLA', necla3(t)]]); });
cek(EV.sevda_cik, (c, t, lt) => salonCek(c, t, [lerp(1500, 1300, ease(lt / 1.6)), 1000, 1.1], oSalon(t), [['MERT', mert3(t)], ['NECLA', necla3(t)], ['SEVDA', sevda3(t)]]));
cek(Lb('M14') - .05, (c, t, lt) => { const p = necla3(t); const [x, y] = yakin('NECLA', p, 3.2); salonCek(c, t, [x, y, 3.2 / p.s], oSalon(t), [['NECLA', p]]); });

// SAHNE 4 — ANNENİN SAKLADIĞI SIR
cek(S[4], (c, t, lt) => salonCek(c, t, [lerp(960, 940, lt / 2), 1020, 1.2], oSalon(t), [['MERT', mert4(t)], ['NECLA', necla4(t)], ['SEVDA', sevda4(t)]]));
cek(Lb('M15') + .9, (c, t, lt) => { const p = mert4(t); const [x, y] = yakin('MERT', p, 3); salonCek(c, t, [x + 20, y + 30, 2.9 / p.s], oSalon(t), [['MERT', p]], ['SEVDA', 1]); });
cek(Lb('M16') - .05, (c, t, lt) => { const p = sevda4(t); const [x, y] = yakin('SEVDA', p, 3.3); salonCek(c, t, [x, y, lerp(3.3, 3.8, lt / 3.5) / p.s], oSalon(t), [['SEVDA', p]]); });
cek(Lb('M17') - .05, (c, t, lt) => { const p = mert4(t); const [x, y] = yakin('MERT', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], oSalon(t), [['MERT', p]]); });
cek(Lb('M18') - .05, (c, t, lt) => { const p = sevda4(t); const [x, y] = yakin('SEVDA', p, 3.7); salonCek(c, t, [x, y, 3.7 / p.s], oSalon(t), [['SEVDA', p]]); });
cek(Lb('M19') - .05, (c, t, lt) => { const p = necla4(t); const [x, y, z] = orta('NECLA', p, 2.2); salonCek(c, t, [x + 40, y, z], oSalon(t), [['NECLA', p], ['MERT', mert4(t)]]); });
cek(EV.canta, (c, t, lt) => insCanta(c, t, lt));

// SAHNE 5 — ESKİ FOTOĞRAF
cek(S[5], (c, t, lt) => insFoto(c, t, lt, 'SEVDA'));
cek(Lb('M21') - .05, (c, t, lt) => { const p = mert5(t); const [x, y] = yakin('MERT', p, 3.4); salonCek(c, t, [x, y, lerp(3.4, 3.9, lt / 2.5) / p.s], oSalon(t), [['MERT', p]]); });
cek(Lb('M22') - .05, (c, t, lt) => { const p = sevda5(t); const [x, y] = yakin('SEVDA', p, 3.4); salonCek(c, t, [x, y, lerp(3.4, 4.0, lt / 3) / p.s], oSalon(t), [['SEVDA', p]]); });
cek(Lb('M23') - .05, (c, t, lt) => { const p = necla5(t); const [x, y, z] = orta('NECLA', p, 2.3); salonCek(c, t, [x, y, z], oSalon(t), [['NECLA', p]]); });
cek(Lb('M24') - .05, (c, t, lt) => { const p = mert5(t); const [x, y] = yakin('MERT', p, 3); salonCek(c, t, [x + 20, y + 30, 2.9 / p.s], oSalon(t), [['MERT', p]], ['SEVDA', 1]); });
cek(Lb('M25') - .05, (c, t, lt) => { const p = sevda5(t); const [x, y] = yakin('SEVDA', p, 3.6); salonCek(c, t, [x, y, 3.6 / p.s], oSalon(t), [['SEVDA', p]]); });

// SAHNE 6 — MERT'İN ÖFKESİ
cek(S[6], (c, t, lt) => insFoto(c, t, lt + 3, 'MERT'));
cek(S[6] + 1.4, (c, t, lt) => { const p = mert6(t); const [x, y] = yakin('MERT', p, 3.4); salonCek(c, t, [x, y, lerp(3.4, 4.0, lt / 2.5) / p.s], oSalon(t), [['MERT', p]]); });
cek(Lb('M27') - .05, (c, t, lt) => { const p = sevda6(t); const [x, y] = yakin('SEVDA', p, 3); salonCek(c, t, [x - 20, y + 30, 2.9 / p.s], oSalon(t), [['SEVDA', p]], ['MERT', -1]); });
cek(Lb('M28') - .05, (c, t, lt) => { const p = mert6(t); const [x, y] = yakin('MERT', p, 3.5); salonCek(c, t, [x, y, 3.5 / p.s], oSalon(t), [['MERT', p]]); });
cek(Lb('M29') - .05, (c, t, lt) => { const p = sevda6(t); const [x, y] = yakin('SEVDA', p, 3.6); salonCek(c, t, [x, y, lerp(3.6, 4.1, lt / 3.5) / p.s], oSalon(t), [['SEVDA', p]]); });
cek(Lb('M30') - .05, (c, t, lt) => { const p = mert6(t); const [x, y, z] = orta('MERT', p, 2.3); salonCek(c, t, [x, y, z], oSalon(t), [['MERT', p]]); });
cek(EV.tusla, (c, t, lt) => insTusla(c, t, lt));
cek(Lb('M31') - .05, (c, t, lt) => { const p = sevda6(t); const [x, y] = yakin('SEVDA', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], oSalon(t), [['SEVDA', p]]); });

// SAHNE 7 — KOMİSERİN SORULARI
cek(S[7], (c, t, lt) => salonCek(c, t, [lerp(900, 860, lt / 2), 1010, 1.2], oSalon(t), [['SINAN', sinan7(t)], ['MERT', mert7(t)], ['SEVDA', sevda7(t)], ['NECLA', necla7(t)]]));
cek(Lb('M32') + .3, (c, t, lt) => { const p = sinan7(t); const [x, y, z] = orta('SINAN', p, 2.3); salonCek(c, t, [x + 20, y, z], oSalon(t), [['SINAN', p]]); });
cek(Lb('M33') - .05, (c, t, lt) => { const p = mert7(t); const [x, y] = yakin('MERT', p, 3.2); salonCek(c, t, [x, y, 3.2 / p.s], oSalon(t), [['MERT', p]]); });
cek(Lb('M34') - .05, (c, t, lt) => { const p = sinan7(t); const [x, y] = yakin('SINAN', p, 3); salonCek(c, t, [x + 20, y + 30, 2.9 / p.s], oSalon(t), [['SINAN', p]], ['SEVDA', 1]); });
cek(Lb('M35') - .05, (c, t, lt) => { const p = sevda7(t); const [x, y] = yakin('SEVDA', p, 3.6); salonCek(c, t, [x, y, lerp(3.6, 4.1, lt / 2.5) / p.s], oSalon(t), [['SEVDA', p]]); });
cek(Lb('M36') - .05, (c, t, lt) => { const p = mert7(t); const [x, y] = yakin('MERT', p, 3.5); salonCek(c, t, [x, y, 3.5 / p.s], oSalon(t), [['MERT', p]]); });
cek(Lb('M37') - .05, (c, t, lt) => { const p = sinan7(t); const [x, y] = yakin('SINAN', p, 3.3); salonCek(c, t, [x, y, lerp(3.3, 3.6, lt / 3) / p.s], oSalon(t), [['SINAN', p]]); });

// SAHNE 8 — BÜYÜK FİNAL
cek(S[8], (c, t, lt) => insArsiv(c, t, lt));
cek(Lb('M38') + .9, (c, t, lt) => { const p = sinan8(t); const [x, y] = yakin('SINAN', p, 3.2); salonCek(c, t, [x, y, lerp(3.2, 3.7, lt / 2.5) / p.s], oSalon(t), [['SINAN', p]]); });
cek(Lb('M39') - .05, (c, t, lt) => { const p = mert8(t); const [x, y] = yakin('MERT', p, 3.3); salonCek(c, t, [x, y, 3.3 / p.s], oSalon(t), [['MERT', p]]); });
cek(EV.bakis, (c, t, lt) => salonCek(c, t, [lerp(1000, 1060, lt), 1000, 1.35], oSalon(t), [['SINAN', sinan8(t)], ['MERT', mert8(t)], ['SEVDA', sevda8(t)]]));
cek(Lb('M40') - .05, (c, t, lt) => { const p = sevda8(t); const [x, y] = yakin('SEVDA', p, 3.4); salonCek(c, t, [x, y, lerp(3.4, 4.0, lt / 3.5) / p.s], oSalon(t), [['SEVDA', p]]); });
cek(Lb('M41') - .05, (c, t, lt) => { const p = mert8(t); const [x, y] = yakin('MERT', p, 3.6); salonCek(c, t, [x, y, 3.6 / p.s], oSalon(t), [['MERT', p]]); });
cek(EV.goz, (c, t, lt) => { const p = sevda8(t); const [x, y] = yakin('SEVDA', p); salonCek(c, t, [x + p.don * 10 * p.s, basY('SEVDA', p) + (-23) * p.s, lerp(4.2, 7.5, ease(lt / 1.8)) / p.s], oSalon(t), [['SEVDA', p]]); });
cek(EV.karar, (c, t, lt) => bitisKarti(c, t, lt));

CEKIM.sort((a, b) => a[0] - b[0]);
