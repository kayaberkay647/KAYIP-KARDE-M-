// 1dkdua — karakter iskeleti. Birim = baş yüksekliği. Ayakta: ayak tabanı y=0, sarık tepesi ≈ -7.4.
// Yüz sağa bakar (yon=1); yon=-1 aynalar. Her karakter kendi sabit paletini taşır → her sahnede aynı görünüm.
'use strict';
const ADAM = {
  ten: '#C98F67', tenK: '#A8704E', sakal: '#3B2A1F', goz: '#2A1E16',
  sarik: '#EFE5CF', sarikK: '#D5C5A3', kulah: '#5F6B30',
  kaftan: '#6F7A3C', kaftanK: '#525C2A', kaftanA: '#8C9858', trim: '#D4A84B',
  entari: '#EEE3C8', entariK: '#D9CBA8', kusak: '#C99A45', kusakK: '#A27832', ayakkabi: '#5A3A26'
};
const HOCA = {
  ten: '#C48A63', tenK: '#9F6A4A', sakal: '#1E1814', goz: '#1E1814',
  sarik: '#F5F1E7', sarikK: '#DCD5C4', kulah: '#F5F1E7',
  kaftan: '#2E2B2A', kaftanK: '#1E1C1C', kaftanA: '#47423E', trim: '#4F4A44',
  entari: '#F2EEE4', entariK: '#D9D2C2', kusak: '#3B3735', kusakK: '#2A2726', ayakkabi: '#2A201A', buyukSarik: 1
};
const TALEBE1 = { ...ADAM, sarik: '#E9DFC8', sarikK: '#CDBE9C', kulah: '#8A4B32', kaftan: '#8A5A3A', kaftanK: '#6A4329', kaftanA: '#A3734F', kusak: '#D8C9A4', kusakK: '#BBA982' };
// Yaşlı Hoca (02'nin konuşmacısı): beyaz sakal ve kaş, yuvarlak gözlük, beyaz gömlek, gri-bej hırka
const YASLI_HOCA = {
  ten: '#D3A27F', tenK: '#AE7C5C', sakal: '#ECE8E1', kas: '#E4DED4', goz: '#2A221C',
  sarik: '#F7F4EE', sarikK: '#DAD3C5', kulah: '#F7F4EE',
  kaftan: '#8E8473', kaftanK: '#6C6455', kaftanA: '#A79D8B', trim: '#C9B48A',
  entari: '#F5F2EC', entariK: '#DDD7CC', kusak: '#5E574C', kusakK: '#4A443B', ayakkabi: '#2A201A', buyukSarik: 1, gozluk: 1, yasli: 1
};
const FAKIR = {
  ten: '#B98060', tenK: '#946148', sakal: '#9A958D', kas: '#8E8880', goz: '#2A1E16', yasli: 1,
  sarik: '#B9AA8F', sarikK: '#978A72', kulah: '#6E5A44',
  kaftan: '#7A6450', kaftanK: '#5A4838', kaftanA: '#937B63', trim: '#6A5442',
  entari: '#D9CDB4', entariK: '#BFB296', kusak: '#6E7B3A', kusakK: '#55602C', ayakkabi: '#4A3A2E'
};
const TALEBE2 = { ...ADAM, sarik: '#E4DCC9', sarikK: '#C7BB9F', kulah: '#4E5A3A', kaftan: '#5C6B5E', kaftanK: '#445147', kaftanA: '#76857A', kusak: '#C99A45', kusakK: '#A27832' };

// Yürüme: faz yürünen mesafeden türetilir (ayak kayması olmaz). mesafe birim cinsinden.
const ADIM_K = .35 * 2 / Math.PI;
const adimFaz = mesafe => mesafe / ADIM_K;
// Göz kırpma: belirli anlarda 0.14 sn
function kirp(t, seed = 0) { const p = 3.1 + hash(seed) * 1.7; const u = ((t + hash(seed + 3) * 3) % p) / .14; return u < 1 ? Math.sin(u * Math.PI) : 0; }

// El konumu (kolCiz ile aynı geometri) — tutulan nesneyi kolun altına çizmek için
function elNoktasi(sx, sy, a1, a2, olc = 1) {
  const ex = sx + Math.sin(a1) * 1.45 * olc, ey = sy + Math.cos(a1) * 1.45 * olc, b = a1 + a2;
  return [ex + Math.sin(b) * (1.28 * olc + .2), ey + Math.cos(b) * (1.28 * olc + .2)];
}
function kolCiz(sx, sy, a1, a2, pal, arka, olc = 1) {
  const L1 = 1.45 * olc, L2 = 1.28 * olc;
  const ex = sx + Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1;
  const b = a1 + a2, wx = ex + Math.sin(b) * L2, wy = ey + Math.cos(b) * L2;
  const dx = Math.sin(b), dy = Math.cos(b);
  const kumas = arka ? koyu(pal.kaftan, .22) : pal.kaftan, kumasK = arka ? koyu(pal.kaftanK, .2) : pal.kaftanK;
  // el (kolun altında kalır)
  const hx = wx + dx * .2, hy = wy + dy * .2;
  X.save(); X.translate(hx, hy); X.rotate(-b);
  elips(0, .02, .13, .17); doldur(arka ? koyu(pal.ten, .15) : pal.ten);
  elips(.09 * (arka ? -1 : 1), -.04, .05, .09, .5); doldur(arka ? koyu(pal.tenK, .1) : pal.tenK);
  X.restore();
  // yen (geniş kaftan kolu)
  const n1x = Math.cos(a1), n1y = -Math.sin(a1), n2x = Math.cos(b), n2y = -Math.sin(b);
  const nx = (n1x + n2x) / 2, ny = (n1y + n2y) / 2;
  const w0 = .27, we = .22, ww = .27;
  egri([[sx + n1x * w0, sy + n1y * w0], [ex + nx * we, ey + ny * we], [wx + n2x * ww, wy + n2y * ww], [wx + dx * .05, wy + dy * .05], [wx - n2x * ww, wy - n2y * ww], [ex - nx * we, ey - ny * we], [sx - n1x * w0, sy - n1y * w0], [sx - dx * .1, sy - .25]], true);
  doldur(kumas);
  // yen kıvrımı ve manşet
  X.beginPath(); X.moveTo(ex - nx * we * .6, ey - ny * we * .6); X.quadraticCurveTo(ex + dx * .3, ey + dy * .3, wx - n2x * ww * .5 - dx * .2, wy - n2y * ww * .5 - dy * .2); cizgi(kumasK, .045, .7);
  X.beginPath(); X.moveTo(wx + n2x * ww * .9 - dx * .02, wy + n2y * ww * .9 - dy * .02); X.lineTo(wx - n2x * ww * .9 - dx * .02, wy - n2y * ww * .9 - dy * .02); cizgi(arka ? koyu(pal.entari, .2) : pal.entari, .1);
  return { el: [hx, hy], dirsek: [ex, ey], yon: b };
}

function yemeni(x, kalk, pal, koyuluk = 0) {
  X.save(); X.translate(x, -kalk); X.rotate(-kalk * 1.2);
  X.beginPath(); X.moveTo(-.3, 0); X.quadraticCurveTo(-.32, -.2, -.05, -.21); X.quadraticCurveTo(.25, -.2, .44, -.03); X.quadraticCurveTo(.12, .03, -.3, 0); X.closePath();
  doldur(koyu(pal.ayakkabi, koyuluk)); X.restore();
}

// Baş (3/4, sağa bakar). (0,0) = yüz merkezi. o: {kirp, agiz, egim}
function basCiz(pal, o = {}) {
  X.save(); X.rotate(o.egim || 0);
  const bs = pal.buyukSarik ? 1.12 : 1;
  // kulah tepesi
  X.save(); X.scale(bs, bs); elips(.06, -.8, .19, .13); doldur(pal.kulah); X.restore();
  // kulak
  elips(-.17, -.02, .075, .12); doldur(pal.tenK);
  // yüz
  X.beginPath(); X.moveTo(-.30, -.25);
  X.bezierCurveTo(-.25, -.48, .18, -.52, .33, -.28);
  X.quadraticCurveTo(.38, -.16, .39, -.08); X.quadraticCurveTo(.48, .02, .46, .07);
  X.quadraticCurveTo(.42, .11, .37, .11); X.quadraticCurveTo(.38, .30, .26, .42);
  X.quadraticCurveTo(.10, .52, -.10, .40); X.quadraticCurveTo(-.30, .25, -.30, -.25); X.closePath();
  doldur(pal.ten);
  // yanak ve gölge
  X.save(); X.clip(); X.fillStyle = rGrad(.2, .02, 0, .16, [[0, '#D9735A', .22], [1, '#D9735A', 0]]); X.fillRect(0, -.2, .45, .4);
  X.fillStyle = dGrad(-.3, 0, .1, 0, [[0, pal.tenK, .55], [1, pal.tenK, 0]]); X.fillRect(-.35, -.5, .5, 1); X.restore();
  // sakal
  X.beginPath(); X.moveTo(-.22, -.04);
  X.quadraticCurveTo(-.22, .30, -.02, .52); X.quadraticCurveTo(.22, .66, .36, .40);
  X.quadraticCurveTo(.41, .26, .38, .15); X.quadraticCurveTo(.31, .14, .27, .21);
  X.quadraticCurveTo(.12, .17, .07, .04); X.quadraticCurveTo(-.08, .03, -.22, -.04); X.closePath();
  doldur(pal.sakal);
  // bıyık
  X.beginPath(); X.moveTo(.41, .09); X.quadraticCurveTo(.36, .16, .24, .2); X.quadraticCurveTo(.31, .11, .41, .09); X.closePath(); doldur(pal.sakal);
  // ağız (konuşurken)
  const ag = o.agiz || 0;
  if (ag > .05) { elips(.33, .215, .055, .025 + ag * .06); doldur('#4A2418'); }
  // göz ve kaş
  const k = 1 - (o.kirp || 0) * .9;
  elips(.235, -.1, .042, .055 * k); doldur(pal.goz);
  if (k > .5) { elips(.248, -.118, .013, .015); doldur('#FFF6E6', .8); }
  X.beginPath(); X.moveTo(.15, -.205); X.quadraticCurveTo(.24, -.235, .33, -.2); cizgi(pal.kas || pal.sakal, pal.kas ? .06 : .045);
  if (pal.yasli) { // göz kenarı ve yanak çizgileri
    X.beginPath(); X.moveTo(.15, -.07); X.quadraticCurveTo(.12, -.04, .1, -.08); X.moveTo(.16, -.03); X.quadraticCurveTo(.13, -.0, .11, -.03); cizgi(pal.tenK, .018, .8);
    X.beginPath(); X.moveTo(.3, .02); X.quadraticCurveTo(.27, .08, .28, .12); cizgi(pal.tenK, .018, .6);
  }
  if (pal.gozluk) { // yuvarlak gözlük
    X.save(); X.beginPath(); X.arc(.235, -.1, .105, 0, TAU); X.fillStyle = 'rgba(220,235,240,.18)'; X.fill(); cizgi('#3A3230', .028);
    X.beginPath(); X.arc(.235, -.1, .08, Math.PI * 1.1, Math.PI * 1.45); cizgi('#FFFFFF', .016, .55);
    X.beginPath(); X.moveTo(.34, -.11); X.quadraticCurveTo(.38, -.13, .41, -.1); cizgi('#3A3230', .024);
    X.beginPath(); X.moveTo(.13, -.11); X.lineTo(-.15, -.08); cizgi('#3A3230', .022); X.restore();
  }
  // sarık
  X.save(); X.scale(bs, bs);
  X.beginPath(); X.moveTo(-.37, -.08);
  X.bezierCurveTo(-.48, -.56, -.12, -.86, .14, -.79);
  X.bezierCurveTo(.44, -.72, .52, -.44, .41, -.21);
  X.quadraticCurveTo(.10, -.31, -.37, -.08); X.closePath(); doldur(pal.sarik);
  X.save(); X.clip();
  X.fillStyle = dGrad(-.4, 0, .45, 0, [[0, pal.sarikK, .9], [.55, pal.sarik, 0]]); X.fillRect(-.6, -1, 1.2, 1.1);
  for (let i = 0; i < 4; i++) { const yy = -.16 - i * .15; X.beginPath(); X.moveTo(-.5, yy + .18); X.quadraticCurveTo(0, yy - .12 + i * .02, .55, yy - .02); cizgi(pal.sarikK, .045, .85); }
  X.restore(); X.restore();
  X.restore();
}

// Kaftan gövdesi (ayakta). hs = etek salınımı
function govdeAyakta(pal, hs, t) {
  const yol = [[-.22, -5.96], [-.62, -5.8], [-.80, -5.38], [-.81, -4.3], [-.77, -3.62], [-.90 + hs * .5, -1.9], [-1.04 + hs, -.34], [-1.0 + hs, -.25], [-.02 + hs, -.2], [.97 + hs, -.24], [1.0 + hs, -.33], [.84 + hs * .5, -1.9], [.70, -3.62], [.75, -4.55], [.64, -5.45], [.42, -5.8], [.18, -5.96]];
  egri(yol, true); doldur(pal.kaftan);
  X.save(); egri(yol, true); X.clip();
  X.fillStyle = dGrad(-1.05, 0, 1.0, 0, [[0, pal.kaftanK, 1], [.35, pal.kaftan, 0], [.75, pal.kaftanA, .45], [1, pal.kaftan, 0]]); X.fillRect(-1.2, -6.2, 2.4, 6.2);
  // kıvrımlar
  for (const [x0, k] of [[-.48, 0], [.02, 1], [.55, 2]]) { X.beginPath(); X.moveTo(x0 * .55, -3.4); X.quadraticCurveTo(x0 * .9 + hs * .3 + sal(t * .8, k) * .03, -1.8, x0 * 1.2 + hs * .9, -.22); cizgi(pal.kaftanK, .05, .55); }
  // ön açıklık (entari)
  cokgen([[.12, -5.93], [.32, -5.9], [.56 + hs, -.24], [.30 + hs, -.22]]); doldur(pal.entari);
  X.beginPath(); X.moveTo(.31, -5.9); X.lineTo(.56 + hs, -.24); cizgi(pal.trim, .04, .8);
  X.beginPath(); X.moveTo(.13, -5.93); X.lineTo(.30 + hs, -.22); cizgi(pal.trim, .04, .6);
  // kuşak
  cokgen([[-1, -3.95], [1, -3.9], [1, -3.38], [-1, -3.43]]); doldur(pal.kusak);
  for (let i = 0; i < 3; i++) { X.beginPath(); X.moveTo(-1, -3.84 + i * .16); X.quadraticCurveTo(0, -3.8 + i * .16 + .03, 1, -3.82 + i * .16); cizgi(pal.kusakK, .035, .7); }
  X.restore();
  // kuşak ucu
  const ku = sal(t * 1.3, 4) * .06 + hs * .6;
  egri([[.36, -3.55], [.52, -3.5], [.56 + ku * .5, -3.0], [.6 + ku, -2.55], [.46 + ku, -2.52], [.42 + ku * .5, -3.0]], true); doldur(pal.kusakK);
  // yaka
  cokgen([[.0, -5.98], [.32, -5.96], [.2, -5.62]]); doldur(pal.entariK);
}

// Ayakta / yürüyen insan. o: {x,y,s,yon,faz,yur,t,pal, kolA:[a1,a2], kolO:[a1,a2], kirp, agiz, egim, govdeEgim, elde(fn)}
function insanAyakta(o) {
  const pal = o.pal || ADAM, ph = o.faz || 0, wk = o.yur ?? 0, t = o.t || 0;
  X.save(); X.translate(o.x, o.y);
  // yer gölgesi
  X.save(); X.scale(o.s, o.s * .9); elips(0, 0, 1.25, .2); X.fillStyle = 'rgba(40,24,10,.22)'; X.fill(); X.restore();
  X.scale(o.s * (o.yon || 1), o.s);
  const bob = -.05 * Math.cos(2 * ph) * wk + Math.sin(t * 1.6) * .012; // nefes
  const hs = .07 * Math.sin(ph) * wk + sal(t, 2) * .035 + (o.ruzgar || 0) * .08;
  // ayaklar
  const fa = .34 * Math.sin(ph) * wk, ka = Math.max(0, Math.cos(ph)) * .14 * wk, kb = Math.max(0, -Math.cos(ph)) * .14 * wk;
  yemeni(-fa - .1, kb, pal, .25); yemeni(fa + .08, ka, pal, 0);
  X.translate(0, bob); X.rotate(o.govdeEgim || 0);
  const sw = .28 * Math.sin(ph) * wk;
  const kA = o.kolA || [-.08 - sw, .18], kO = o.kolO || [.06 + sw, .22];
  const arkaKol = kolCiz(-.45, -5.5, kA[0], kA[1], pal, true);
  govdeAyakta(pal, hs, t);
  X.save(); X.translate(.06, -6.62); X.scale(.98, .98); basCiz(pal, { kirp: o.kirp ?? kirp(t, o.tohum || 1), agiz: o.agiz, egim: o.egim }); X.restore();
  let onKol;
  if (o.oncesi) o.oncesi();
  onKol = kolCiz(.32, -5.52, kO[0], kO[1], pal, false);
  if (o.elde) o.elde(onKol, arkaKol);
  X.restore();
  return onKol;
}

// Bağdaş kurmuş oturan insan. Orijin = minder üstü, kalça ortası.
function insanOturan(o) {
  const pal = o.pal || ADAM, t = o.t || 0;
  X.save(); X.translate(o.x, o.y); X.scale(o.s * (o.yon || 1), o.s);
  const nf = Math.sin(t * 1.5 + (o.tohum || 0)) * .015;
  // bacaklar (etekle örtülü)
  const kucak = [[-1.6, -.05], [-1.45, -.5], [-.7, -.78], [.3, -.86], [1.25, -.62], [1.7, -.12], [1.2, .06], [0, .1], [-1.1, .06]];
  egri(kucak, true); doldur(koyu(pal.kaftan, .05));
  X.save(); egri(kucak, true); X.clip(); X.fillStyle = dGrad(0, -.9, 0, .1, [[0, pal.kaftanA, .5], [1, pal.kaftanK, .9]]); X.fillRect(-2, -1, 4, 1.2);
  X.beginPath(); X.moveTo(-1.2, -.45); X.quadraticCurveTo(-.4, -.2, .2, -.05); cizgi(pal.kaftanK, .05, .7);
  X.beginPath(); X.moveTo(1.3, -.5); X.quadraticCurveTo(.6, -.25, .1, -.1); cizgi(pal.kaftanK, .05, .7); X.restore();
  yemeni(1.15, .05, pal, .1);
  X.translate(0, nf - .55); X.scale(1, 1 + nf * .5);
  const kA = o.kolA || [.25, -.9], kO = o.kolO || [.35, -1.2];
  const arkaKol = kolCiz(-.45, -2.42, kA[0], kA[1], pal, true, .92);
  // gövde
  const yol = [[-.2, -2.88], [-.62, -2.75], [-.8, -2.35], [-.84, -1.2], [-.95, -.2], [-.6, .12], [.6, .12], [.92, -.2], [.76, -1.2], [.72, -2.0], [.62, -2.48], [.42, -2.76], [.18, -2.88]];
  egri(yol, true); doldur(pal.kaftan);
  X.save(); egri(yol, true); X.clip();
  X.fillStyle = dGrad(-1, 0, 1, 0, [[0, pal.kaftanK, 1], [.4, pal.kaftan, 0], [.8, pal.kaftanA, .4]]); X.fillRect(-1.2, -3.2, 2.4, 3.5);
  cokgen([[.12, -2.86], [.32, -2.84], [.5, .1], [.28, .1]]); doldur(pal.entari);
  X.beginPath(); X.moveTo(.31, -2.84); X.lineTo(.5, .1); cizgi(pal.trim, .04, .8);
  cokgen([[-1, -1.25], [1, -1.2], [1, -.78], [-1, -.82]]); doldur(pal.kusak);
  X.beginPath(); X.moveTo(-1, -1.1); X.quadraticCurveTo(0, -1.05, 1, -1.08); cizgi(pal.kusakK, .035, .7);
  X.restore();
  cokgen([[.0, -2.9], [.32, -2.88], [.2, -2.58]]); doldur(pal.entariK);
  X.save(); X.translate(.06, -3.55); basCiz(pal, { kirp: o.kirp ?? kirp(t, o.tohum || 2), agiz: o.agiz, egim: o.egim }); X.restore();
  if (o.oncesi) o.oncesi();
  const onKol = kolCiz(.3, -2.44, kO[0], kO[1], pal, false, .92);
  if (o.elde) o.elde(onKol, arkaKol);
  X.restore();
  return onKol;
}

// Arkadan görünen ayakta / yürüyen insan (uzaklaşırken)
function insanArka(o) {
  const pal = o.pal || ADAM, ph = o.faz || 0, wk = o.yur ?? 1, t = o.t || 0;
  X.save(); X.translate(o.x, o.y);
  X.save(); X.scale(o.s, o.s * .9); elips(0, 0, 1.15, .18); X.fillStyle = 'rgba(30,18,8,.22)'; X.fill(); X.restore();
  X.scale(o.s, o.s);
  const bob = -.05 * Math.cos(2 * ph) * wk;
  const ka = Math.max(0, Math.cos(ph)) * .16 * wk, kb = Math.max(0, -Math.cos(ph)) * .16 * wk;
  for (const [x, k] of [[-.28, ka], [.28, kb]]) { elips(x, -.06 - k, .2, .1 + k * .25); doldur(koyu(pal.ayakkabi, .15)); }
  X.translate(0, bob);
  const sw = .22 * Math.sin(ph) * wk;
  const hs = sal(t, 5) * .03;
  const yol = [[-.2, -5.96], [-.66, -5.78], [-.8, -5.3], [-.8, -3.6], [-1.0 + hs, -.3], [0, -.22], [1.0 + hs, -.3], [.8, -3.6], [.8, -5.3], [.66, -5.78], [.2, -5.96]];
  egri(yol, true); doldur(pal.kaftan);
  X.save(); egri(yol, true); X.clip();
  X.fillStyle = dGrad(-1, 0, 1, 0, [[0, pal.kaftanK, .8], [.5, pal.kaftan, 0], [1, pal.kaftanK, .6]]); X.fillRect(-1.2, -6.2, 2.4, 6.2);
  X.beginPath(); X.moveTo(0, -5.9); X.lineTo(hs * .5, -.25); cizgi(pal.kaftanK, .05, .6);
  cokgen([[-1, -3.95], [1, -3.95], [1, -3.42], [-1, -3.42]]); doldur(pal.kusak);
  X.restore();
  // kollar (yanlarda, gövdenin üstünde)
  for (const [sx, a] of [[-.74, -sw], [.74, sw]]) {
    const yon = Math.sign(sx);
    X.save(); X.translate(sx, -5.42); X.rotate(-yon * .06 + a * .35);
    egri([[-.2 - yon * .04, -.05], [.2 - yon * .04, -.05], [.26 + yon * .06, 2.45], [.02, 2.58], [-.22 + yon * .06, 2.45]], true); doldur(koyu(pal.kaftan, .06));
    X.beginPath(); X.moveTo(-yon * .12, .2); X.quadraticCurveTo(-yon * .02, 1.4, -yon * .1, 2.4); cizgi(pal.kaftanK, .05, .5);
    X.beginPath(); X.moveTo(-.2, 2.45); X.lineTo(.26, 2.45); cizgi(koyu(pal.entari, .1), .09);
    elips(.03, 2.7, .12, .16); doldur(koyu(pal.ten, .12));
    X.restore();
  }
  // ense + sarık (arkadan)
  cokgen([[-.17, -6.2], [.17, -6.2], [.19, -5.9], [-.19, -5.9]]); doldur(pal.tenK);
  X.save(); X.translate(0, -6.62); const bs = pal.buyukSarik ? 1.12 : 1; X.scale(bs, bs);
  elips(-.31, -.02, .07, .11); doldur(pal.tenK); elips(.31, -.02, .07, .11); doldur(pal.tenK);
  elips(0, .02, .31, .4); doldur(mix(pal.sakal, pal.tenK, .35));
  elips(0, -.8, .18, .12); doldur(pal.kulah);
  X.beginPath(); X.moveTo(-.42, -.06); X.bezierCurveTo(-.5, -.62, -.2, -.86, 0, -.86); X.bezierCurveTo(.2, -.86, .5, -.62, .42, -.06); X.quadraticCurveTo(0, .02, -.42, -.06); X.closePath(); doldur(pal.sarik);
  for (let i = 0; i < 3; i++) { X.beginPath(); X.moveTo(-.45, -.2 - i * .17); X.quadraticCurveTo(0, -.12 - i * .2, .45, -.28 - i * .15); cizgi(pal.sarikK, .045, .8); }
  X.restore();
  X.restore();
}

// Arkadan görünen oturan talebe
function talebeArka(o) {
  const pal = o.pal || TALEBE1, t = o.t || 0;
  X.save(); X.translate(o.x, o.y); X.scale(o.s, o.s);
  const nf = Math.sin(t * 1.4 + (o.tohum || 0)) * .02;
  egri([[-1.7, 0], [-1.4, -.6], [0, -.85], [1.4, -.6], [1.7, 0], [0, .12]], true); doldur(koyu(pal.kaftan, .12));
  X.translate(0, nf);
  const yol = [[-.2, -3.4], [-.7, -3.2], [-.88, -2.7], [-.95, -1.0], [-1.1, -.2], [1.1, -.2], [.95, -1.0], [.88, -2.7], [.7, -3.2], [.2, -3.4]];
  egri(yol, true); doldur(pal.kaftan);
  X.save(); egri(yol, true); X.clip(); X.fillStyle = dGrad(-1, 0, 1, 0, [[0, pal.kaftanK, .9], [.5, pal.kaftan, 0], [1, pal.kaftanK, .5]]); X.fillRect(-1.2, -3.5, 2.4, 3.5); X.restore();
  X.save(); X.translate(0, -4.05 + nf); X.rotate((o.egim || 0) + Math.sin(t * .6 + (o.tohum || 0)) * .03);
  elips(0, .55, .2, .16); doldur(pal.tenK);
  elips(-.31, .02, .07, .11); doldur(pal.tenK); elips(.31, .02, .07, .11); doldur(pal.tenK);
  elips(0, .05, .3, .38); doldur(pal.tenK);
  elips(0, -.75, .18, .12); doldur(pal.kulah);
  X.beginPath(); X.moveTo(-.4, -.04); X.bezierCurveTo(-.48, -.6, -.2, -.82, 0, -.82); X.bezierCurveTo(.2, -.82, .48, -.6, .4, -.04); X.quadraticCurveTo(0, .04, -.4, -.04); X.closePath(); doldur(pal.sarik);
  for (let i = 0; i < 3; i++) { X.beginPath(); X.moveTo(-.43, -.18 - i * .16); X.quadraticCurveTo(0, -.1 - i * .19, .43, -.26 - i * .14); cizgi(pal.sarikK, .045, .8); }
  X.restore();
  X.restore();
}
