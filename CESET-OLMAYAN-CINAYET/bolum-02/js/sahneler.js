// CESET OLMAYAN CİNAYET — 2. BÖLÜM: KAPIDAKİ KADIN — çekim listesi
const BOLUM_YAZISI = '2. BÖLÜM — KAPIDAKİ KADIN';
const CEKIM = []; function cek(b, f) { CEKIM.push([b, f]); }
const S = SAHNE;
const GECMIS = [[Lb('D14') + .35, Ls('D14') + .25]];
const ARA_YAZI = [];

function bodrumCek(c, t, cam, o, kisiler, on) {
  let [cx, cy, z] = cam; cx += gurultu(t * .35, 11) * 15 / z; cy += gurultu(t * .3, 12) * 12 / z;
  c.save(); kamera(c, cx, cy, z); bodrumArka(c, o, t);
  kisiler.slice().sort((a, b) => a[1].y - b[1].y).forEach(([ad, p]) => kisiCiz(c, ad, p, t));
  bodrumIsik(c, o, t); c.restore();
}
const polis = .4, saat = 1.75;

// ---------- KONUMLAR ----------
const kapiAcik1 = t => t < EV.kapi_kapan ? ease(seg(t, EV.kapi_ac + .45, EV.kapi_ac + 1)) : 1 - ease(seg(t, EV.kapi_kapan - .2, EV.kapi_kapan + .35));
const kapiMemur = t => ease(seg(t, EV.isaret + .3, EV.isaret + .8)) * (1 - ease(seg(t, S[6] - .3, S[6])));
const o1 = t => ({ gece: .55, polis, saat, anahtarVar: false, kapiAcik: kapiAcik1(t), kolSars: VURUSLAR.some(v => t > v && t < v + .15) ? 1 : 0 });
const oS = t => ({ gece: .55, polis, saat, anahtarVar: false, kapiAcik: t > S[7] ? ease(seg(t, EV.murat_don - .2, EV.murat_don + .3)) * (1 - ease(seg(t, EV.murat_don + 1.1, EV.murat_don + 1.5))) : kapiMemur(t) });

const aylin1 = t => { const w = yuruyus(t, Lb('D01') + .4, Lb('D01') + 2, 1080, 1262, 880, 1400);
  return Object.assign(w, { duygu: t < EV.kapi_ac ? 'korku' : 'sok', duygu2: 'endise', dk: seg(t, Lb('D03'), Lb('D03') + 1), don: t < EV.murat_yuru ? .55 : -.55, gozyasi: .5, sol: t < Lb('D02') ? 'gogus' : 'asagi' }); };
const murat1 = t => { const w = yuruyus(t, EV.murat_yuru, EV.kapi_ac, 1480, 1340, 610, 1290); const w2 = yuruyus(t, EV.kapi_ac + .7, EV.kapi_ac + 1.4, 610, 1290, 720, 1330);
  const p = t < EV.kapi_ac + .5 ? w : w2; return Object.assign(p, { duygu: 'ciddi', don: t < EV.murat_yuru ? -.55 : -.6, sol: t > EV.kapi_ac - .3 && t < EV.kapi_ac + .5 ? 'uzat' : (t > EV.kapi_kapan - .5 && t < EV.kapi_kapan + .3 ? 'isaret' : 'asagi'), eldiven: 1 }); };
const derya1 = t => { const w = yuruyus(t, Lb('D03') + .2, Lb('D03') + 1.6, 360, 1205, 470, 1380);
  return Object.assign(w, { duygu: 'korku', titre: 1.2, don: t > EV.kapi_kapan - .3 ? -.8 : t < Lb('D02') ? .3 : .55, sol: 'gogus', bak: t > EV.kapi_kapan ? [-.9, 0] : null }); };

const P2 = { aylin: [1230, 1480], derya: [900, 1460], murat: [620, 1440] };
const aylin2 = t => ({ x: P2.aylin[0], y: P2.aylin[1], s: olcek(P2.aylin[1]), duygu: t > Lb('D07') + .6 ? 'uzgun' : 'endise', duygu2: 'uzgun', dk: .4, don: -.55, gozyasi: t > Lb('D07') + .5 ? 1 : .5, sol: t > Lb('D06') && t < Ls('D06') ? 'gogus' : 'asagi' });
const derya2 = t => ({ x: P2.derya[0], y: P2.derya[1], s: olcek(P2.derya[1]), duygu: 'endise', don: t < Lb('D06') ? -.45 : .5, bak: t > Lb('D07') ? [.5, .6] : null, sol: 'gogus', titre: .4 });
const murat2 = t => ({ x: P2.murat[0], y: P2.murat[1], s: olcek(P2.murat[1]), duygu: 'ciddi', don: .5, eldiven: 1, sag: t > Lb('D04') && t < Ls('D04') ? 'ac' : 'asagi' });

const aylinOtur = t => ({ x: 1080, y: 1262, s: olcek(1262), otur: 1, duygu: t > Lb('D12') ? 'ofke' : 'uzgun', duygu2: 'uzgun', dk: t > Ls('D12') ? .8 : 0, don: -.4, gozyasi: 1, sol: 'gogus', sag: t > Lb('D10') && t < Ls('D10') ? 'ac' : 'gogus', titre: t > Lb('D12') && t < Ls('D12') ? 1.4 : 0 });
const derya3 = t => ({ x: 820, y: 1430, s: olcek(1430), duygu: 'uzgun', don: .45, bak: t > Lb('D11') ? [.3, .7] : null, sol: 'gogus' });
const murat3 = t => ({ x: 560, y: 1400, s: olcek(1400), duygu: 'dusun', don: .5, eldiven: 1 });

const derya4 = t => ({ x: 900, y: 1455, s: olcek(1455), duygu: 'korku', duygu2: 'endise', dk: t > Lb('D16') ? .6 : 0, don: t > Lb('D15') && t < Lb('D16') ? .7 : -.45, sol: t < Lb('D15') ? 'sargi' : 'gogus', sargi: 1, bak: t > Lb('D17') + 1.5 ? [.4, .6] : null });
const murat4 = t => ({ x: 690, y: 1445, s: olcek(1445), duygu: t > Ls('D17') ? 'dusun' : 'ciddi', don: t > Lb('D15') && t < Lb('D16') + .4 ? .8 : t > Ls('D17') ? -.8 : .45, eldiven: 1, sag: t < Lb('D15') ? [150, -560] : 'asagi' });
const zehra4 = t => { const w = yuruyus(t, EV.zehra_gel, EV.zehra_gel + 1.6, 2190, 1195, 1900, 1340); return Object.assign(w, { duygu: 'endise', don: -.7, sag: t > Lb('D15') && t < Ls('D15') ? 'isaret' : 'asagi', sol: t > Lb('D15') ? 'gogus' : 'asagi' }); };

const derya5 = t => ({ x: 900, y: 1455, s: olcek(1455), duygu: t > Lb('D18') ? 'sok' : 'endise', duygu2: 'korku', dk: seg(t, Lb('D20'), Lb('D20') + 1), don: -.45, sol: 'gogus', sargi: 1, bak: t > Lb('D18') && t < Ls('D18') ? [-.5, .4] : null });
const murat5 = t => ({ x: 690, y: 1445, s: olcek(1445), duygu: 'ciddi', don: t > EV.isaret - .2 ? -.8 : .45, eldiven: 1, sag: t < EV.isaret ? 'tut' : 'asagi', sagN: t < EV.isaret ? 'torbaAnahtar' : null, sol: t > EV.isaret && t < EV.isaret + 1.2 ? 'isaret' : 'asagi' });
const aylin5 = t => ({ x: 1150, y: 1470, s: olcek(1470), duygu: 'endise', don: -.5, gozyasi: .7, sol: 'gogus' });
const zehra5 = t => ({ x: 1900, y: 1340, s: olcek(1340), duygu: 'endise', don: -.7, sol: 'gogus' });
const memur5 = t => ({ x: 360, y: 1205, s: olcek(1205), duygu: 'ciddi', don: .5 });

const murat6 = t => { const w = yuruyus(t, S[6], S[6] + 1.6, 1560, 1300, 1180, 1470); return Object.assign(w, { duygu: 'ciddi', don: t > EV.kapi_acil ? -.6 : -.4, eldiven: 1, sag: t > Lb('D24') && t < EV.kilit + .2 ? 'uzat' : 'asagi', sagN: t > Lb('D24') && t < EV.kilit ? 'torbaAnahtar' : null }); };
const memur6 = t => { const w = yuruyus(t, S[6] + .2, S[6] + 1.8, 1620, 1260, 1380, 1400); return Object.assign(w, { duygu: t > Lb('D25') ? 'sok' : 'ciddi', don: -.6, sag: t > EV.kapi_acil ? 'uzat' : 'asagi' }); };
const oB = t => ({ b13Acik: ease(seg(t, EV.kapi_acil, EV.kapi_acil + 1)), fener: t > EV.kapi_acil + .3 ? [1250, 900, 1120, 860] : null });

const aylin7 = t => ({ x: 1150, y: 1475, s: olcek(1475), duygu: t > Lb('D31') ? 'uzgun' : 'endise', duygu2: 'uzgun', dk: .5, don: -.55, gozyasi: t > Lb('D29') ? 1 : .7, sol: t > Lb('D31') ? 'gogus' : 'asagi', titre: t > Lb('D31') ? .8 : 0 });
const derya7 = t => ({ x: 840, y: 1455, s: olcek(1455), duygu: 'uzgun', don: .5, sol: 'gogus', sargi: 1, bak: t > Lb('D30') ? [.3, .6] : null });
const zehra7 = t => ({ x: 1950, y: 1320, s: olcek(1320), duygu: 'uzgun', don: -.6, sol: 'agiz' });
const murat7 = t => { const w = yuruyus(t, EV.murat_don, EV.murat_don + 1.2, 360, 1205, 600, 1440); return Object.assign(w, { duygu: 'ciddi', don: .5, eldiven: 1, sag: 'tut', sagN: 'torbaKayit' }); };

const murat8 = t => ({ x: 600, y: 1440, s: olcek(1440), duygu: t > Lb('D34') ? 'dusun' : 'ciddi', don: t > Lb('D34') ? .7 : .45, eldiven: 1, sag: 'tut', sagN: 'torbaKayit', bak: t > EV.donus ? [.7, 0] : null });
const aylin8 = t => ({ x: 1150, y: 1475, s: olcek(1475), duygu: t > Lb('D34') ? 'sok' : 'sok', duygu2: 'korku', dk: seg(t, EV.donus, EV.donus + 1), don: t < EV.donus ? -.75 : lerp(-.75, -.3, ease(seg(t, EV.donus, EV.donus + 1))), gozyasi: 1,
  bak: t > EV.donus ? [-lerp(.2, .9, seg(t, EV.donus, EV.donus + .8)), 0] : null, sol: t > Lb('D33') && t < Ls('D33') ? 'gogus' : 'asagi' });
const derya8 = t => ({ x: 840, y: 1455, s: olcek(1455), duygu: t > Lb('D34') + 1 ? 'uzgun' : 'endise', duygu2: 'korku', dk: .3, don: t > EV.donus ? .35 : -.4, sol: 'gogus', sargi: 1, bak: t > EV.derya_yakin ? [0, .85] : (t > Lb('D34') ? [.2, .5] : null) });

// ---------- ÇEKİMLER ----------
// SAHNE 1 — KAPIYI AÇMAYIN!
cek(0, (c, t, lt) => salonCek(c, t, [lerp(1350, 1300, lt / 1.5), 1000, 1.15], o1(t), [['AYLIN', aylin1(t)], ['MURAT', murat1(t)]]));
cek(EV.bakis, (c, t, lt) => { const p = aylin1(t); const [x, y] = yakin('AYLIN', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], o1(t), [['AYLIN', p]]); });
cek(EV.bakis + .45, (c, t, lt) => { const p = murat1(t); const [x, y] = yakin('MURAT', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], o1(t), [['MURAT', p]]); });
cek(EV.murat_yuru, (c, t, lt) => salonCek(c, t, [lerp(1200, 760, ease(lt / 1.3)), 1000, 1.15], o1(t), [['AYLIN', aylin1(t)], ['MURAT', murat1(t)]]));
cek(EV.kapi_ac, (c, t, lt) => { c.save(); const z = lerp(1.15, 1.0, ease(lt / .5)); c.translate(W / 2, H / 2); c.scale(z, z); c.translate(-W / 2, -H / 2); insKapiKolu(c, t, lt, 0); c.restore(); });
cek(EV.kapi_ac + .45, (c, t, lt) => salonCek(c, t, [lerp(470, 430, lt), 1000, 1.25], o1(t), [['DERYA', derya1(t)], ['MURAT', murat1(t)]]));
cek(Lb('D01') + .1, (c, t, lt) => { const p = derya1(t); const [x, y] = yakin('DERYA', p, 3.3); salonCek(c, t, [x, y, lerp(3.2, 3.7, lt / 2.6) / p.s], o1(t), [['DERYA', p]]); });
cek(Lb('D02') - .05, (c, t, lt) => { const p = aylin1(t); const [x, y] = yakin('AYLIN', p, 3); salonCek(c, t, [x - 20, y + 30, 2.9 / p.s], o1(t), [['AYLIN', p]], ['DERYA', -1]); });
cek(Lb('D03') - .05, (c, t, lt) => { const p = derya1(t); const [x, y, z] = orta('DERYA', p, 2.2); salonCek(c, t, [x + 40, y, z], o1(t), [['DERYA', p], ['MURAT', murat1(t)]]); });
cek(EV.kapi_kapan - .3, (c, t, lt) => salonCek(c, t, [560, 1000, 1.35], o1(t), [['DERYA', derya1(t)], ['MURAT', murat1(t)], ['AYLIN', aylin1(t)]]));

// SAHNE 2 — GİZEMLİ KADIN
cek(S[2], (c, t, lt) => salonCek(c, t, [lerp(950, 920, lt / 2), 1020, 1.25], oS(t), [['DERYA', derya2(t)], ['AYLIN', aylin2(t)], ['MURAT', murat2(t)]]));
cek(Lb('D04') + 1.2, (c, t, lt) => { const p = murat2(t); const [x, y, z] = orta('MURAT', p, 2.4); salonCek(c, t, [x, y, z], oS(t), [['MURAT', p]]); });
cek(Lb('D05') - .05, (c, t, lt) => { const p = derya2(t); const [x, y] = yakin('DERYA', p, 3.2); salonCek(c, t, [x, y, lerp(3.1, 3.5, lt / 3.5) / p.s], oS(t), [['DERYA', p]]); });
cek(Lb('D06') - .05, (c, t, lt) => { const p = aylin2(t); const [x, y] = yakin('AYLIN', p, 3); salonCek(c, t, [x - 20, y + 30, 2.9 / p.s], oS(t), [['AYLIN', p]], ['DERYA', -1]); });
cek(Lb('D07') - .05, (c, t, lt) => { const p = derya2(t); const [x, y] = yakin('DERYA', p, 3.6); salonCek(c, t, [x, y, 3.6 / p.s], oS(t), [['DERYA', p]]); });
cek(Ls('D07') + .05, (c, t, lt) => { const p = aylin2(t); const [x, y] = yakin('AYLIN', p, 3.6); salonCek(c, t, [x, y, lerp(3.6, 4.2, lt / 1) / p.s], oS(t), [['AYLIN', p]]); });

// SAHNE 3 — SAKLANAN GERÇEK
cek(S[3], (c, t, lt) => salonCek(c, t, [lerp(1000, 960, lt / 2), 1020, 1.3], oS(t), [['AYLIN', aylinOtur(t)], ['DERYA', derya3(t)], ['MURAT', murat3(t)]]));
cek(Lb('D08') + 1.0, (c, t, lt) => { const p = aylinOtur(t); const [x, y] = yakin('AYLIN', p, 3.3); salonCek(c, t, [x, y, lerp(3.2, 3.8, lt / 3) / p.s], oS(t), [['AYLIN', p]]); });
cek(Lb('D09') - .05, (c, t, lt) => { const p = derya3(t); const [x, y, z] = orta('DERYA', p, 2.3); salonCek(c, t, [x + 30, y, z], oS(t), [['DERYA', p], ['MURAT', murat3(t)]]); });
cek(Lb('D10') - .05, (c, t, lt) => { const p = aylinOtur(t); const [x, y] = yakin('AYLIN', p, 3.1); salonCek(c, t, [x, y, 3.1 / p.s], oS(t), [['AYLIN', p]]); });
cek(Lb('D11') - .05, (c, t, lt) => { const p = derya3(t); const [x, y] = yakin('DERYA', p, 3.3); salonCek(c, t, [x, y, 3.3 / p.s], oS(t), [['DERYA', p]]); });
cek(Lb('D12') - .05, (c, t, lt) => { const p = aylinOtur(t); const [x, y] = yakin('AYLIN', p, 3.5); salonCek(c, t, [x, y - 10, lerp(3.5, 4.3, lt / 2.5) / p.s], oS(t), [['AYLIN', p]]); });

// SAHNE 4 — MERDİVENDEKİ ADAM
cek(S[4], (c, t, lt) => { const p = derya4(t); salonCek(c, t, [800, lerp(1050, 1000, lt / 2), 2.0], oS(t), [['DERYA', p], ['MURAT', murat4(t)]]); });
cek(Lb('D14') - .05, (c, t, lt) => { const p = derya4(t); const [x, y] = yakin('DERYA', p, 3.2); salonCek(c, t, [x, y, 3.2 / p.s], oS(t), [['DERYA', p]]); });
cek(GECMIS[0][0], (c, t, lt) => merdivenGecmis(c, t, lt));
cek(GECMIS[0][1], (c, t, lt) => { salonCek(c, t, [lerp(1880, 1820, lt / 1.5), 1000, 1.25], oS(t), [['ZEHRA', zehra4(t)]]); });
cek(Lb('D15') + 1.0, (c, t, lt) => { const p = zehra4(t); const [x, y, z] = orta('ZEHRA', p, 2.3); salonCek(c, t, [x, y, z], oS(t), [['ZEHRA', p]]); });
cek(Lb('D16') - .05, (c, t, lt) => { const p = murat4(t); const [x, y] = yakin('MURAT', p, 3.3); salonCek(c, t, [x, y, 3.3 / p.s], oS(t), [['MURAT', p]]); });
cek(Lb('D17') - .05, (c, t, lt) => { const p = derya4(t); const [x, y] = yakin('DERYA', p, 3.1); salonCek(c, t, [x - 20, y + 30, 2.9 / p.s], oS(t), [['DERYA', p]], ['MURAT', -1]); });
cek(Ls('D17') + .1, (c, t, lt) => { const p = murat4(t); const [x, y] = yakin('MURAT', p, 3.2); salonCek(c, t, [x - 30, y, lerp(3.0, 3.4, lt) / p.s], oS(t), [['MURAT', p]]); });

// SAHNE 5 — B-13 ANAHTARI
cek(S[5], (c, t, lt) => insAnahtarTorba(c, t, lt));
cek(Lb('D18') - .05, (c, t, lt) => { const p = derya5(t); const [x, y] = yakin('DERYA', p, 3.5); salonCek(c, t, [x, y, lerp(3.5, 4.1, lt / 2) / p.s], oS(t), [['DERYA', p]]); });
cek(Lb('D19') - .05, (c, t, lt) => { const p = murat5(t); const [x, y, z] = orta('MURAT', p, 2.3); salonCek(c, t, [x + 20, y, z], oS(t), [['MURAT', p]]); });
cek(Lb('D20') - .05, (c, t, lt) => { const p = derya5(t); const [x, y] = yakin('DERYA', p, 3.2); salonCek(c, t, [x, y, 3.2 / p.s], oS(t), [['DERYA', p]]); });
cek(Lb('D21') - .05, (c, t, lt) => { const p = aylin5(t); const [x, y] = yakin('AYLIN', p, 3.1); salonCek(c, t, [x, y, 3.1 / p.s], oS(t), [['AYLIN', p]]); });
cek(Lb('D22') - .05, (c, t, lt) => { const p = derya5(t); const [x, y] = yakin('DERYA', p, 3.4); salonCek(c, t, [x, y, lerp(3.4, 3.8, lt / 3) / p.s], oS(t), [['DERYA', p]]); });
cek(EV.isaret - .1, (c, t, lt) => salonCek(c, t, [lerp(700, 600, lt / 1.4), 1000, 1.2], oS(t), [['MURAT', murat5(t)], ['DERYA', derya5(t)], ['MEMUR', memur5(t)]]));

// SAHNE 6 — BODRUMDAKİ SIR
cek(S[6], (c, t, lt) => bodrumCek(c, t, [lerp(1250, 1150, lt / 2), 960, 1.1], oB(t), [['MURAT', murat6(t)], ['MEMUR', memur6(t)]]));
cek(Lb('D23') - .05, (c, t, lt) => { const p = memur6(t); const [x, y, z] = orta('MEMUR', p, 2.3); bodrumCek(c, t, [x, y, z], oB(t), [['MEMUR', p]]); });
cek(Lb('D24') - .05, (c, t, lt) => { const p = murat6(t); const [x, y, z] = orta('MURAT', p, 2.3); bodrumCek(c, t, [x, y, z], oB(t), [['MURAT', p]]); });
cek(EV.kilit, (c, t, lt) => insKilit(c, t, lt));
cek(EV.kapi_acil, (c, t, lt) => bodrumCek(c, t, [lerp(1150, 1120, lt), lerp(900, 860, lt), lerp(1.3, 1.6, lt / 1.3)], oB(t), [['MURAT', murat6(t)], ['MEMUR', memur6(t)]]));
cek(Lb('D25') - .05, (c, t, lt) => insKayitRaf(c, t, lt, -1));
cek(Lb('D26') - .05, (c, t, lt) => { const p = murat6(t); const [x, y] = yakin('MURAT', p, 3.1); bodrumCek(c, t, [x, y, 3.1 / p.s], oB(t), [['MURAT', p]]); });
cek(EV.flas - .2, (c, t, lt) => insKayitRaf(c, t, lt + 3, lt - .2));

// SAHNE 7 — AYLİN'İN GÖZYAŞLARI
cek(S[7], (c, t, lt) => salonCek(c, t, [lerp(1100, 1050, lt / 2), 1020, 1.3], oS(t), [['AYLIN', aylin7(t)], ['DERYA', derya7(t)], ['ZEHRA', zehra7(t)]]));
cek(Lb('D27') + 1.2, (c, t, lt) => { const p = aylin7(t); const [x, y] = yakin('AYLIN', p, 3); salonCek(c, t, [x - 20, y + 30, 2.9 / p.s], oS(t), [['AYLIN', p]], ['DERYA', -1]); });
cek(Lb('D28') - .05, (c, t, lt) => { const p = derya7(t); const [x, y] = yakin('DERYA', p, 3); salonCek(c, t, [x + 20, y + 30, 2.9 / p.s], oS(t), [['DERYA', p]], ['AYLIN', 1]); });
cek(Lb('D29') - .05, (c, t, lt) => { const p = aylin7(t); const [x, y] = yakin('AYLIN', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], oS(t), [['AYLIN', p]]); });
cek(Lb('D30') - .05, (c, t, lt) => { const p = derya7(t); const [x, y] = yakin('DERYA', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], oS(t), [['DERYA', p]]); });
cek(Lb('D31') - .05, (c, t, lt) => { const p = aylin7(t); const [x, y] = yakin('AYLIN', p, 3.5); salonCek(c, t, [x, y - 10, lerp(3.5, 4.4, lt / 3.5) / p.s], oS(t), [['AYLIN', p]]); });
cek(EV.murat_don - .1, (c, t, lt) => salonCek(c, t, [lerp(620, 700, lt / 1.4), 1000, 1.2], oS(t), [['MURAT', murat7(t)], ['DERYA', derya7(t)], ['AYLIN', aylin7(t)]]));

// SAHNE 8 — EMİR'İN SON UYARISI
cek(S[8], (c, t, lt) => { const p = murat8(t); const [x, y, z] = orta('MURAT', p, 2.3); salonCek(c, t, [x + 20, y, z], oS(t), [['MURAT', p]]); });
cek(Lb('D33') - .05, (c, t, lt) => { const p = aylin8(t); const [x, y] = yakin('AYLIN', p, 3.4); salonCek(c, t, [x, y, 3.4 / p.s], oS(t), [['AYLIN', p]]); });
cek(EV.play, (c, t, lt) => insKayitCalar(c, t, lt, t > EV.play + .45 ? 1 : 0));
cek(EV.donus, (c, t, lt) => { const p = aylin8(t); const [x, y] = yakin('AYLIN', p, 3.4); salonCek(c, t, [x, y, lerp(3.4, 4.0, lt / 2.5) / p.s], oS(t), [['AYLIN', p]]); });
cek(EV.derya_yakin, (c, t, lt) => { const p = derya8(t); const [x, y] = yakin('DERYA', p, 3.6); salonCek(c, t, [x, y - 20, lerp(3.6, 5.2, lt / 2.3) / p.s], oS(t), [['DERYA', p]]); });
cek(EV.karar, (c, t, lt) => bitisKarti(c, t, lt));

CEKIM.sort((a, b) => a[0] - b[0]);
