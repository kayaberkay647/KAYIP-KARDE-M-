// 1dkdua — seccade, secde ve ev içi nesneleri (dünya koordinatlarında). Tasvir ilkesi: peygamberler çizilmez.
'use strict';

// ───────── Seccade (yerel kutu 440×700, merkez 0,0; sivri mihrap yukarıda) ─────────
// o: {yeni 0..1 (1 = hiç kullanılmamış, parlak, katlak izli), asinma 0..1, isik:{alin,el,diz 0..1}, t, tohum, zemin, kenar, vurgu}
const SECCADE_IZ = { alin: [0, -168, 48, 34], el: [[-70, -138, 26, 38], [70, -138, 26, 38]], diz: [[-52, 40, 36, 46], [52, 40, 36, 46]] };
function seccade(x, y, w, h, o = {}) {
  const t = o.t || 0, yeni = o.yeni || 0, as = (o.asinma ?? 1) * (1 - yeni), zem = o.zemin || '#56632F', ken = o.kenar || '#7A3A2A', vur = o.vurgu || P.altin, krem = '#EADFC2', sd = o.tohum || 3;
  X.save(); X.translate(x, y); X.scale(w / 440, h / 700);
  // saçaklar
  X.lineCap = 'round'; X.strokeStyle = rgb(krem, .95);
  for (let i = 0; i < 46; i++) { const px = -216 + i * 9.4; X.lineWidth = 3; for (const yy of [-1, 1]) { X.beginPath(); X.moveTo(px, yy * 350); X.quadraticCurveTo(px + Math.sin(i * 2.1 + yy) * 5, yy * (366 + hash(i + yy * 7 + sd) * 6), px + Math.sin(i * 1.3 + yy * 2) * 9, yy * (380 + hash(i * 3 + yy + sd) * 14)); X.stroke(); } }
  // gövde + gölge
  X.save(); X.shadowColor = 'rgba(30,18,8,.42)'; X.shadowBlur = 28; X.shadowOffsetY = 12; X.fillStyle = rgb(ken); X.fillRect(-220, -350, 440, 700); X.restore();
  X.fillStyle = dGrad(-220, 0, 220, 0, [[0, koyu(ken, .18)], [.5, ken], [1, koyu(ken, .12)]]); X.fillRect(-220, -350, 440, 700);
  // kenar süsü (eşkenar dörtgenler)
  for (let i = 0; i < 12; i++) for (const yy of [-332, 332]) { const px = -198 + i * 36; cokgen([[px, yy - 11], [px + 11, yy], [px, yy + 11], [px - 11, yy]]); doldur(i % 2 ? krem : vur, .9); }
  for (let i = 0; i < 18; i++) for (const xx of [-202, 202]) { const py = -306 + i * 36; cokgen([[xx, py - 11], [xx + 11, py], [xx, py + 11], [xx - 11, py]]); doldur(i % 2 ? vur : krem, .9); }
  X.strokeStyle = rgb(vur, .95); X.lineWidth = 3; X.strokeRect(-184, -314, 368, 628); X.strokeStyle = rgb(krem, .55); X.lineWidth = 1.5; X.strokeRect(-176, -306, 352, 612);
  // zemin
  X.save(); X.beginPath(); X.rect(-182, -312, 364, 624); X.clip();
  X.fillStyle = rGrad(0, -20, 20, 440, [[0, acik(zem, .1)], [1, koyu(zem, .18)]]); X.fillRect(-182, -312, 364, 624);
  // dokuma ipliği
  X.lineWidth = 1; for (let yy = -312; yy < 312; yy += 5) { X.strokeStyle = (yy / 5 | 0) % 2 ? 'rgba(0,0,0,.07)' : 'rgba(255,255,255,.04)'; X.beginPath(); X.moveTo(-182, yy); X.lineTo(182, yy); X.stroke(); }
  for (let xx = -182; xx < 182; xx += 7) { X.strokeStyle = 'rgba(0,0,0,.035)'; X.beginPath(); X.moveTo(xx, -312); X.lineTo(xx, 312); X.stroke(); }
  // alt bölüm: küçük eşkenar dörtgen ızgarası
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { const px = -140 + c * 56 + (r % 2) * 28, py = -90 + r * 58 + 18; if (px > 150) continue; if (Math.hypot(px, py - 130) < 78) continue; cokgen([[px, py - 11], [px + 9, py], [px, py + 11], [px - 9, py]]); doldur(vur, .34); }
  // büyük madalyon
  cokgen([[0, 52], [64, 130], [0, 208], [-64, 130]]); X.strokeStyle = rgb(vur, .9); X.lineWidth = 3.4; X.stroke(); cokgen([[0, 78], [42, 130], [0, 182], [-42, 130]]); doldur(krem, .28); X.strokeStyle = rgb(vur, .65); X.lineWidth = 2; X.stroke();
  for (let k = 0; k < 8; k++) { const a = k / 8 * TAU; elips(Math.cos(a) * 14, 130 + Math.sin(a) * 14, 8, 4, a); doldur(vur, .85); } daire(0, 130, 5); doldur(krem);
  // mihrap kemeri
  const kemer = () => { X.beginPath(); X.moveTo(-150, -112); X.lineTo(-150, -196); X.bezierCurveTo(-150, -262, -64, -300, 0, -322); X.bezierCurveTo(64, -300, 150, -262, 150, -196); X.lineTo(150, -112); X.closePath(); };
  kemer(); X.fillStyle = dGrad(0, -322, 0, -112, [[0, acik(zem, .16)], [1, koyu(zem, .08)]]); X.fill(); X.strokeStyle = rgb(vur, .98); X.lineWidth = 5.5; X.stroke();
  X.save(); X.translate(0, -214); X.scale(.9, .9); X.translate(0, 214); kemer(); X.strokeStyle = rgb(krem, .5); X.lineWidth = 2.2; X.stroke(); X.restore();
  // mihrap içi: çiçekli dal ve sarkık kandil
  for (const sx of [-1, 1]) { X.beginPath(); X.moveTo(sx * 118, -120); X.bezierCurveTo(sx * 150, -170, sx * 80, -210, sx * 46, -262); cizgi(vur, 2.6, .7); for (let k = 0; k < 5; k++) { const u = k / 4, px = sx * (118 - 72 * u) + sx * Math.sin(u * 3) * 10, py = -120 - u * 142; elips(px + sx * 10, py, 9, 4.5, sx * (.9 - u)); doldur(vur, .75); } }
  X.beginPath(); X.moveTo(0, -318); X.lineTo(0, -272); cizgi(vur, 2, .9); elips(0, -258, 9, 15); X.fillStyle = rGrad(0, -258, 0, 14, [[0, '#FFF1C0'], [1, vur]]); X.fill();
  X.restore(); // zemin klibi
  // yeni halı: parlak yüzey, katlak izleri
  if (yeni > 0) {
    X.save(); X.beginPath(); X.rect(-220, -350, 440, 700); X.clip(); X.fillStyle = dGrad(-220, -350, 220, 350, [[0, '#FFFFFF', .22 * yeni], [.4, '#FFFFFF', 0], [.7, '#FFFFFF', .08 * yeni], [1, '#FFFFFF', 0]]); X.fillRect(-220, -350, 440, 700);
    for (const yy of [-176, 2, 180]) { X.fillStyle = `rgba(0,0,0,${.16 * yeni})`; X.fillRect(-220, yy, 440, 3); X.fillStyle = `rgba(255,255,255,${.22 * yeni})`; X.fillRect(-220, yy + 3, 440, 3); }
    X.restore();
  }
  // aşınma: ezilen hav, açılan çözgü ipleri
  const izler = [[...SECCADE_IZ.alin, 'alin'], ...SECCADE_IZ.el.map(e => [...e, 'el']), ...SECCADE_IZ.diz.map(e => [...e, 'diz'])];
  if (as > 0.01) {
    X.save(); X.beginPath(); X.rect(-182, -312, 364, 624); X.clip();
    izler.forEach(([px, py, rx, ry], i) => {
      X.save(); X.translate(px, py); X.scale(1, ry / rx);
      X.fillStyle = rGrad(0, 0, 0, rx * 1.15, [[0, '#CDB98C', .72 * as], [.55, '#B8A478', .42 * as], [1, '#B8A478', 0]]); X.beginPath(); X.arc(0, 0, rx * 1.15, 0, TAU); X.fill();
      X.strokeStyle = `rgba(48,36,16,${.16 * as})`; X.lineWidth = 3; X.beginPath(); X.arc(0, 0, rx * .86, 0, TAU); X.stroke(); X.restore();
      X.strokeStyle = `rgba(226,210,170,${.4 * as})`; X.lineWidth = 1.2;
      for (let k = 0; k < 16; k++) { const a = hash(i * 31 + k + sd) * TAU, rr = hash(i * 17 + k * 3 + sd) * rx * .8; const lx = px + Math.cos(a) * rr, ly = py + Math.sin(a) * rr * (ry / rx); X.beginPath(); X.moveTo(lx, ly); X.lineTo(lx + (hash(k + i) - .5) * 14, ly + (hash(k * 5 + i) - .5) * 10); X.stroke(); }
    });
    X.restore();
    X.fillStyle = `rgba(122,92,44,${.08 * as})`; X.fillRect(-182, -312, 364, 624);
  }
  // parıldama (alın, el, diz)
  if (o.isik) izler.forEach(([px, py, rx, ry, key]) => {
    const g = (o.isik[key] || 0); if (g <= .005) return; const nb = .72 + .28 * Math.sin(t * 2.2 + px * .03);
    X.save(); X.globalCompositeOperation = 'screen'; parilti(px, py, Math.max(rx, ry) * 2.8 * (o.parlaklik || 1), '#FFD98A', g * nb);
    X.save(); X.translate(px, py); X.scale(1, ry / rx); X.beginPath(); X.arc(0, 0, rx * 1.05, 0, TAU); cizgi('#FFE7B0', 3.2, g * .85); X.restore(); X.restore();
  });
  X.restore();
}
// Eğik (yerde yatan) görünüm: dikey yönü k kadar basık
function seccadeOblik(x, y, w, h, k, o) { X.save(); X.translate(x, y); X.scale(1, k); seccade(0, 0, w, h, o); X.restore(); }

// Yandan görünüm: seccade uzun ekseni yatay (mihrap sağda), dikey yönde k kadar basık. L = uzun kenar uzunluğu (px)
function seccadeYan(cx, cy, L, k, o) { X.save(); X.translate(cx, cy); X.scale(1, k); X.rotate(Math.PI / 2); seccade(0, 0, L * 440 / 700, L, o); X.restore(); }
const yurFaz = (px, s) => px / s / 2.7 * TAU; // yürünen mesafeden adım fazı (px → radyan)

// ───────── Secde (yandan, yüz sağa): ayak topuğu solda, alın seccadede ─────────
// o: {x, y (yer), s, yon, t, pal, kaldir (0..1 başı hafif kaldırır), nefes}
function insanSecde(o) {
  const pal = o.pal || ADAM, t = o.t || 0, kal = o.kaldir || 0;
  X.save(); X.translate(o.x, o.y); X.scale(o.s * (o.yon || 1), o.s);
  const nf = Math.sin(t * 1.7 + (o.tohum || 0)) * .028 * (1 + (o.nefes || 0) * 2.2);
  // yer gölgesi
  X.save(); X.scale(1, .12); elips(-.9, 0, 3.4, 1); X.fillStyle = 'rgba(30,18,8,.28)'; X.fill(); X.restore();
  // çıplak ayak tabanları (topuklar yukarıda)
  elips(-3.9, -.4, .22, .32, .5); doldur(pal.tenK); elips(-3.72, -.55, .2, .3, .3); doldur(pal.ten);
  // kol (arka kol silüetin arkasında)
  const arka = (a, b, c) => { X.beginPath(); X.moveTo(a[0], a[1]); X.quadraticCurveTo(b[0], b[1], c[0], c[1]); cizgi(koyu(pal.kaftan, .28), .52); elips(c[0] + .18, c[1] + .05, .26, .16); doldur(koyu(pal.ten, .15)); };
  arka([.25, -1.5 + nf], [.8, -.5], [1.85, -.2]);
  // gövde silüeti (kaftan)
  const yol = [[-3.8, 0], [-3.65, -.5], [-3.05, -.7], [-2.62, -1.15], [-2.42, -1.85 + nf], [-2.0, -2.25 + nf], [-1.3, -2.2 + nf], [-.4, -1.95 + nf], [.35, -1.7 + nf], [.7, -1.25], [.62, -.7], [.1, -.5], [-.45, -.62], [-.9, -.5], [-1.02, 0]];
  egri(yol, true); doldur(pal.kaftan);
  X.save(); egri(yol, true); X.clip();
  X.fillStyle = dGrad(0, -2.6, 0, 0, [[0, pal.kaftanA, .55], [.5, pal.kaftan, 0], [1, pal.kaftanK, .6]]); X.fillRect(-4, -3, 5, 3);
  // kuşak ve kıvrımlar
  X.beginPath(); X.moveTo(-1.6, -2.55); X.quadraticCurveTo(-1.5, -1.5, -1.0, -.1); X.lineWidth = .4; X.strokeStyle = rgb(pal.kusak, .95); X.stroke();
  X.beginPath(); X.moveTo(-2.9, -.9); X.quadraticCurveTo(-1.9, -1.4, -1.1, -.6); cizgi(pal.kaftanK, .05, .6);
  X.beginPath(); X.moveTo(-1.2, -2.3); X.quadraticCurveTo(-.4, -1.9, .3, -1.7); cizgi(pal.kaftanK, .05, .5);
  X.restore();
  // ön kol: omuzdan dirseğe, yere yayılan
  X.beginPath(); X.moveTo(.3, -1.6 + nf); X.quadraticCurveTo(.95, -.55, 2.05, -.22); cizgi(pal.kaftan, .62); X.beginPath(); X.moveTo(.3, -1.6 + nf); X.quadraticCurveTo(.95, -.55, 2.05, -.22); cizgi(pal.kaftanA, .2, .4);
  X.beginPath(); X.moveTo(1.9, -.4); X.lineTo(2.18, -.38); cizgi(acik(pal.entari, .1), .3); elips(2.4, -.17, .34, .15, -.03); doldur(pal.ten); X.beginPath(); X.moveTo(2.25, -.27); X.lineTo(2.62, -.22); cizgi(pal.tenK, .03, .6);
  // baş: yüz aşağı, alın yerde; kaldir > 0 → hafifçe yükselir
  X.save(); X.translate(1.32, -.47 - kal * .42); X.rotate(1.36 - kal * .5); X.scale(1.02, 1.02);
  basCiz(pal, { kirp: 1 - kal * .9, agiz: o.agiz || 0 }); X.restore();
  X.restore();
}

// ───────── Ev içi nesneleri ─────────
// Bohça: köşeleri düğümlü işlemeli bez; acik 0..1 → bez açılır, içindeki katlı seccade görünür
function bohca(x, y, b, acik_ = 0, renk = '#EBDDBE') {
  X.save(); X.translate(x, y); X.scale(b, b);
  if (acik_ > .02) { // açık bez (düz kare, perspektif basık)
    const g = acik_;
    X.save(); X.scale(1, .55); cokgen([[-1.05 * g - .0, -1.0 * g], [1.05 * g, -1.0 * g], [1.15 * g, 1.0 * g], [-1.15 * g, 1.0 * g]]); doldur(renk); X.strokeStyle = rgb('#8A3A34'); X.lineWidth = .1; X.stroke();
    cokgen([[-.78 * g, -.72 * g], [.78 * g, -.72 * g], [.84 * g, .72 * g], [-.84 * g, .72 * g]]); X.strokeStyle = rgb('#C99A45', .8); X.lineWidth = .05; X.stroke(); X.restore();
  } else {
    // torba gövdesi
    X.beginPath(); X.moveTo(-.9, .2); X.bezierCurveTo(-1.1, -.5, -.5, -.95, 0, -.85); X.bezierCurveTo(.5, -.95, 1.1, -.5, .9, .2); X.bezierCurveTo(.7, .62, -.7, .62, -.9, .2); X.closePath();
    X.fillStyle = dGrad(-1, -1, 1, .6, [[0, acik(renk, .15)], [1, koyu(renk, .22)]]); X.fill(); X.strokeStyle = rgb('#8A3A34', .85); X.lineWidth = .06; X.stroke();
    for (let i = 0; i < 6; i++) { cokgen([[-.7 + i * .28, -.05], [-.6 + i * .28, .05], [-.7 + i * .28, .15], [-.8 + i * .28, .05]]); doldur('#B04A3E', .85); }
    // düğüm ve uç köşeler
    elips(0, -.9, .2, .14); doldur(koyu(renk, .25)); for (const k of [-1, 1]) { X.beginPath(); X.moveTo(k * .08, -.92); X.quadraticCurveTo(k * .4, -1.25, k * .56, -1.05); X.quadraticCurveTo(k * .3, -.98, k * .1, -.88); X.closePath(); doldur(acik(renk, .05)); X.strokeStyle = rgb('#8A3A34', .7); X.lineWidth = .04; X.stroke(); }
  }
  X.restore();
}
// Katlanmış seccade (yatay dikdörtgen, iki ucunda saçak)
function katliSeccade(x, y, w, h, rot = 0) {
  X.save(); X.translate(x, y); X.rotate(rot);
  X.strokeStyle = rgb('#EADFC2', .95); X.lineWidth = h * .035; X.lineCap = 'round';
  for (const sx of [-1, 1]) for (let i = 0; i < 9; i++) { const yy = -h / 2 + (i + .5) * h / 9; X.beginPath(); X.moveTo(sx * w / 2, yy); X.lineTo(sx * (w / 2 + h * .2), yy + Math.sin(i * 2) * h * .02); X.stroke(); }
  X.beginPath(); X.roundRect(-w / 2, -h / 2, w, h, h * .06); X.fillStyle = dGrad(0, -h / 2, 0, h / 2, [[0, '#6A7A3A'], [1, '#46521F']]); X.fill();
  X.strokeStyle = rgb('#7A3A2A'); X.lineWidth = h * .14; X.strokeRect(-w / 2 + h * .07, -h / 2 + h * .07, w - h * .14, h - h * .14);
  X.strokeStyle = rgb('#D4A84B', .9); X.lineWidth = h * .035; X.strokeRect(-w / 2 + h * .17, -h / 2 + h * .17, w - h * .34, h - h * .34);
  for (let i = 0; i < 4; i++) { const px = -w * .3 + i * w * .2; cokgen([[px, -h * .1], [px + h * .1, 0], [px, h * .1], [px - h * .1, 0]]); doldur('#D4A84B', .7); }
  X.restore();
}
// Dolap (cepheden; kapak 0..1 → kanatlar açılır). Orijin: alt orta. Birim piksel (s ile ölçeklenir)
function dolap(x, y, s, kapak, t) {
  X.save(); X.translate(x, y); X.scale(s, s);
  const W = 400, Hh = 640, ahsap = '#7A4B2A', ahsapK = '#55341C', ahsapA = '#9A6638';
  // gövde ve iç
  X.fillStyle = rgb(ahsapK); X.fillRect(-W / 2 - 14, -Hh - 26, W + 28, Hh + 26);
  X.fillStyle = dGrad(0, -Hh, 0, 0, [[0, '#2A1A10'], [1, '#1A100A']]); X.fillRect(-W / 2, -Hh, W, Hh);
  for (let k = 1; k <= 4; k++) { const yy = -Hh + k * Hh / 5; X.fillStyle = rgb(ahsap); X.fillRect(-W / 2, yy, W, 12); X.fillStyle = rgb(ahsapA, .6); X.fillRect(-W / 2, yy, W, 3); }
  // raflardaki katlı kumaşlar ve bohçalar
  const kr = ['#E7DABC', '#B5583C', '#6E7B3A', '#C99A45', '#4E5A8A', '#D9C7A0', '#8A3A34'];
  for (let k = 0; k < 5; k++) { const yy = -Hh + (k + 1) * Hh / 5; let xx = -W / 2 + 14, i = k * 5; while (xx < W / 2 - 50) { const w = 50 + hash(i) * 40, h = 20 + hash(i + 40) * 18; if (!(k === 2 && xx > -20 && xx < 90)) { X.fillStyle = rgb(kr[i % 7]); X.beginPath(); X.roundRect(xx, yy - h, w, h, 4); X.fill(); X.fillStyle = 'rgba(0,0,0,.14)'; X.fillRect(xx, yy - 5, w, 5); X.strokeStyle = 'rgba(255,255,255,.18)'; X.lineWidth = 2; X.beginPath(); X.moveTo(xx + 4, yy - h + 4); X.lineTo(xx + w - 4, yy - h + 4); X.stroke(); } xx += w + 8; i++; } }
  // kanatlar (içeriye göre açılma: genişlik daralır)
  const kw = W / 2 * Math.max(.06, Math.cos(kapak * 1.35));
  for (const sd of [-1, 1]) {
    X.save(); X.translate(sd * W / 2, 0); X.scale(-sd * Math.max(.06, Math.cos(kapak * 1.35)), 1);
    X.fillStyle = dGrad(0, 0, W / 2, 0, [[0, ahsapA], [1, ahsap]]); X.fillRect(0, -Hh, W / 2, Hh);
    X.strokeStyle = rgb(ahsapK, .85); X.lineWidth = 6; X.strokeRect(10, -Hh + 12, W / 2 - 20, Hh - 24);
    X.beginPath(); X.moveTo(24, -Hh + 36); X.lineTo(24, -Hh + 200); X.arc(W / 4, -Hh + 200, W / 4 - 24, Math.PI, 0); X.lineTo(W / 2 - 24, -Hh + 36); X.closePath(); X.strokeStyle = rgb(ahsapK, .8); X.lineWidth = 4; X.stroke();
    X.fillStyle = rgb(ahsapK, .3); X.fillRect(24, -Hh + 230, W / 2 - 48, Hh - 270);
    X.beginPath(); X.arc(W / 2 - 22, -Hh * .5, 9, 0, TAU); X.fillStyle = rgb('#D4A84B'); X.fill();
    X.restore();
  }
  X.fillStyle = rgb(ahsapK); X.fillRect(-W / 2 - 14, -Hh - 26, W + 28, 26); X.fillRect(-W / 2 - 14, -10, W + 28, 10);
  X.fillStyle = rgb(ahsapA, .5); X.fillRect(-W / 2 - 14, -Hh - 26, W + 28, 5);
  X.restore();
}
// Naftalin topları (beyaz küreler) ve soluk yeşilimsi duman
function naftalin(x, y, r, t, seed = 1) {
  for (let i = 0; i < 9; i++) { const a = hash(seed * 9 + i) * TAU, d = hash(seed * 5 + i) * r; const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * .6; const rr = 9 + hash(seed + i) * 7; daire(px, py, rr); X.fillStyle = rGrad(px - rr * .3, py - rr * .3, 0, rr * 1.1, [[0, '#FFFFFF'], [1, '#CFCBBE']]); X.fill(); X.strokeStyle = 'rgba(120,115,100,.35)'; X.lineWidth = 1.2; X.stroke(); }
}
function duman(x, y, w, h, t, renk, al, seed = 1) {
  X.save(); for (let i = 0; i < 10; i++) {
    const u = (t * .16 + i / 10 + hash(seed + i) * .3) % 1, dx = Math.sin(u * 5 + i * 1.7 + t * .5) * w * .5 + (hash(i + seed * 3) - .5) * w * .4, dy = -u * h, r = 34 + u * 96;
    X.fillStyle = rGrad(x + dx, y + dy, 0, r, [[0, renk, al * Math.sin(u * Math.PI)], [1, renk, 0]]); X.fillRect(x + dx - r, y + dy - r, 2 * r, 2 * r);
  } X.restore();
}
// Sabun köpüğü baloncukları
function kopukler(x0, y0, w, h, t, n, seed, al = 1) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const p = r() * 20, sp = 28 + r() * 40, u = (((t + p) * sp / h) % 1), px = x0 + r() * w + Math.sin(t * (.6 + r()) + i) * 22, py = y0 - u * h, rr = 8 + r() * 24 * (1 - u * .3);
    const a = Math.sin(u * Math.PI) * al;
    X.save(); X.globalAlpha = a; daire(px, py, rr); X.fillStyle = rGrad(px - rr * .25, py - rr * .3, rr * .1, rr, [[0, '#FFFFFF', .12], [.75, '#DDEEFF', .12], [1, '#E8D6FF', .5]]); X.fill();
    X.strokeStyle = 'rgba(210,235,255,.85)'; X.lineWidth = 1.6; X.stroke(); daire(px - rr * .35, py - rr * .35, rr * .2); X.fillStyle = 'rgba(255,255,255,.9)'; X.fill();
    X.beginPath(); X.arc(px, py, rr * .82, 1.9, 2.8); X.strokeStyle = 'rgba(255,170,200,.5)'; X.stroke(); X.beginPath(); X.arc(px, py, rr * .82, 4.6, 5.5); X.strokeStyle = 'rgba(150,230,255,.5)'; X.stroke(); X.restore();
  }
}
// Allah'ın sözünün titreşimleri: merkezden yayılan altın halkalar + yukarı süzülen ışık çizgileri
function titresim(x, y, t, t0, sure, R, al = 1, yatay = 1) {
  const u = (t - t0) / sure; if (u <= 0) return;
  X.save(); X.globalCompositeOperation = 'screen';
  for (let i = 0; i < 6; i++) {
    const uu = u - i * .11; if (uu <= 0) continue; const rr = easeO(Math.min(1, uu)) * R, a = Math.sin(clamp(uu) * Math.PI) * .75 * al * (1 - clamp(uu - .7));
    X.save(); X.translate(x, y); X.scale(1, yatay); X.beginPath(); X.arc(0, 0, rr, 0, TAU); cizgi('#FFE3A0', 5 - i * .5, a); X.beginPath(); X.arc(0, 0, rr * .97, 0, TAU); cizgi('#FFF6DA', 1.6, a * .8); X.restore();
  }
  parilti(x, y, R * .6 * Math.min(1, u * 3), '#FFD98A', .5 * al * Math.sin(clamp(u) * Math.PI));
  X.restore();
}
// Genel cami silueti (kubbe + yarım kubbeler + iki minare). Orijin: alt orta. s=1 → ~700 px genişlik
function camiSilueti(x, y, s, renk, isik = 0, t = 0) {
  X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = rgb(renk);
  X.fillRect(-250, -150, 500, 150);
  X.beginPath(); X.arc(0, -150, 140, Math.PI, 0); X.fill();
  X.fillRect(-12, -312, 24, 24); X.beginPath(); X.moveTo(-3, -312); X.lineTo(0, -345); X.lineTo(3, -312); X.fill();
  for (const sx of [-1, 1]) {
    X.beginPath(); X.arc(sx * 190, -150, 66, Math.PI, 0); X.fill(); X.beginPath(); X.arc(sx * 108, -150, 56, Math.PI, 0); X.fill();
    const mx = sx * 330; X.fillRect(mx - 15, -470, 30, 470); X.fillRect(mx - 28, -330, 56, 14); X.fillRect(mx - 20, -318, 40, 8);
    X.beginPath(); X.moveTo(mx - 15, -470); X.quadraticCurveTo(mx - 15, -520, mx, -560); X.quadraticCurveTo(mx + 15, -520, mx + 15, -470); X.closePath(); X.fill(); X.fillRect(mx - 1.5, -582, 3, 24);
  }
  if (isik > 0) { X.fillStyle = `rgba(255,214,130,${.9 * isik})`; for (let i = 0; i < 9; i++) { const px = -200 + i * 50; X.beginPath(); X.roundRect(px - 8, -96, 16, 44, [8, 8, 0, 0]); X.fill(); } for (let i = 0; i < 5; i++) { X.beginPath(); X.roundRect(-120 + i * 60 - 6, -230, 12, 30, [6, 6, 0, 0]); X.fill(); } for (const sx of [-1, 1]) { X.fillRect(sx * 330 - 4, -420, 8, 18); X.fillRect(sx * 330 - 4, -360, 8, 18); } X.save(); X.globalCompositeOperation = 'screen'; parilti(0, -80, 360, '#FFB860', .22 * isik); X.restore(); }
  X.restore();
}
