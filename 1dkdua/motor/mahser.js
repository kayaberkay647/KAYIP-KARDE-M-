// 1dkdua — mahşer, havz, çocuk figürü, güvercin, gök feneri, yağmur/fırtına, koku iplikleri (dünya koordinatlarında)
// Tasvir ilkesi: peygamberler ve sahabe insan olarak çizilmez; varlıkları ışık, mekân ve gök fenerleriyle simgelenir.
'use strict';

// Işıktan çocuk: yüzü sade, krem-beyaz entari ve örgü takke; ışık halesiyle çizilir
const COCUK = {
  ten: '#E8C29E', tenK: '#C79C7A', sakal: '#E8C29E', goz: '#2A1E16', cocuk: 1, takke: '#FFFFFF', basOlcek: 1.5, govdeBoy: .72,
  sarik: '#FFFFFF', sarikK: '#E6DDC8', kulah: '#FFFFFF',
  kaftan: '#F8F2E4', kaftanK: '#DCD2BA', kaftanA: '#FFFFFF', trim: '#E9C46A', entari: '#FFFFFF', entariK: '#E8DFC8', kusak: '#E9C46A', kusakK: '#C9A04A', ayakkabi: '#CBBBA0'
};
function parlayanCocuk(o) {
  const par = o.parlak ?? 1; X.save(); X.globalCompositeOperation = 'screen'; parilti(o.x, o.y - o.s * 2.9, o.s * 6.5, '#FFF2CC', .5 * par); parilti(o.x, o.y - o.s * 2.9, o.s * 2.8, '#FFFFFF', .35 * par); X.restore();
  insanAyakta({ ...o, pal: COCUK });
}

// Güvercin (yandan; yon=1 sağa uçar)
function guvercin(x, y, s, t, yon = 1, hiz = 9, parlak = 1) {
  X.save(); X.translate(x, y); X.scale(s * yon, s);
  const f = Math.sin(t * hiz);
  if (parlak > 0) { X.save(); X.globalCompositeOperation = 'screen'; parilti(0, 0, 3, '#FFF4D0', .5 * parlak); X.restore(); }
  const kanat = ters => {
    X.save(); X.translate(.12, -.14); X.rotate((-.85 + f * .8) * (ters ? .8 : 1));
    X.beginPath(); X.moveTo(0, 0); X.bezierCurveTo(-.15, -.75, .5, -1.2, 1.25, -1.0); X.bezierCurveTo(.9, -.78, .6, -.48, .38, -.12); X.closePath();
    X.fillStyle = ters ? '#E4DCCB' : dGrad(0, 0, 1.2, -1, [[0, '#FFFFFF'], [1, '#F1ECE0']]); X.fill();
    X.strokeStyle = 'rgba(190,175,150,.7)'; X.lineWidth = .025; for (let k = 1; k < 5; k++) { X.beginPath(); X.moveTo(.12 * k, -.1 * k); X.quadraticCurveTo(.5 + .12 * k, -.55 - .08 * k, 1.1 - .04 * k, -.95 + .06 * k); X.stroke(); }
    X.restore();
  };
  kanat(true);
  X.beginPath(); X.moveTo(-.95, -.05); X.lineTo(-.5, -.3); X.quadraticCurveTo(.1, -.42, .55, -.3); X.quadraticCurveTo(.7, .05, .2, .24); X.quadraticCurveTo(-.3, .3, -.6, .1); X.closePath(); X.fillStyle = dGrad(0, -.4, 0, .3, [[0, '#FFFFFF'], [1, '#E2D9C6']]); X.fill();
  daire(.62, -.38, .2); doldur('#FFFFFF'); X.beginPath(); X.moveTo(.8, -.4); X.lineTo(1.0, -.33); X.lineTo(.8, -.3); X.closePath(); doldur('#D9A24A'); daire(.68, -.42, .03); doldur('#2A1E16');
  kanat(false);
  X.restore();
}

// Gök feneri: sahabeyi insan olarak çizmeden simgeleyen ışık (havada süzülür)
function gokFeneri(x, y, s, t, seed = 1, parlak = 1, egim = 0) {
  const bob = Math.sin(t * .9 + seed * 2.1) * s * .1; X.save(); X.translate(x, y + bob); X.rotate(egim + Math.sin(t * .7 + seed) * .035);
  X.save(); X.globalCompositeOperation = 'screen'; parilti(0, 0, s * 3.4, '#FFC870', .55 * parlak); X.restore();
  X.beginPath(); X.moveTo(-s * .55, s * .5); X.quadraticCurveTo(-s * .82, -s * .1, -s * .45, -s * .75); X.lineTo(s * .45, -s * .75); X.quadraticCurveTo(s * .82, -s * .1, s * .55, s * .5); X.closePath();
  X.fillStyle = rGrad(0, s * .1, 0, s, [[0, '#FFF6D0', parlak], [.6, '#FFC864', parlak], [1, '#D98A3C', parlak]]); X.fill(); X.strokeStyle = 'rgba(150,80,30,.55)'; X.lineWidth = s * .04; X.stroke();
  for (const k of [-.3, 0, .3]) { X.beginPath(); X.moveTo(k * s, s * .5); X.quadraticCurveTo(k * s * 1.25, -s * .1, k * s * .8, -s * .75); X.stroke(); }
  X.fillStyle = '#7A4A26'; X.fillRect(-s * .5, s * .5, s, s * .1); X.fillRect(-s * .48, -s * .8, s * .96, s * .07);
  X.restore();
}

// Uzaktaki kişi (arkadan/önden basit): y = ayak, h = boy
const KISI_RENK = ['#D8C7A0', '#B99A6A', '#8E8A5A', '#7A5A44', '#9A6A5A', '#6A7A86', '#C9B48A', '#A58A62', '#EFE6CE', '#7C8A5A'];
function kisi(x, y, h, renk, kol, t, ph) {
  const w = h * .3; X.fillStyle = rgb(renk);
  X.beginPath(); X.moveTo(x - w * .5, y); X.quadraticCurveTo(x - w * .62, y - h * .5, x - w * .26, y - h * .78); X.lineTo(x + w * .26, y - h * .78); X.quadraticCurveTo(x + w * .62, y - h * .5, x + w * .5, y); X.closePath(); X.fill();
  if (kol > .01) { X.strokeStyle = rgb(renk); X.lineWidth = h * .08; X.lineCap = 'round'; const sw = Math.sin(t * 3 + ph) * .08 * kol; for (const sd of [-1, 1]) { X.beginPath(); X.moveTo(x + sd * w * .25, y - h * .72); X.quadraticCurveTo(x + sd * w * .6, y - h * (.8 + .1 * kol), x + sd * w * .5, y - h * (.78 + .32 * kol) + sw * h); X.stroke(); } }
  daire(x, y - h * .9, h * .1); doldur(mix(renk, '#B98A66', .55)); elips(x, y - h * .98, h * .12, h * .065); doldur(mix(renk, '#F2EAD6', .5));
}
// Kalabalık: derinliğe göre küçülen kişiler. o: {x0,x1,yUst,yAlt,n,seed,minH,maxH,sis,sisRenk,kol,t,bosluk:[x0,x1,y0,y1]}
function kalabalik(o) {
  const r = rng(o.seed || 1), liste = [];
  for (let i = 0; i < o.n; i++) {
    const u = Math.pow(r(), .85), y = lerp(o.yUst, o.yAlt, u), h = lerp(o.minH, o.maxH, u), x = lerp(o.x0, o.x1, r()) + (r() - .5) * h;
    if (o.bosluk && x > o.bosluk[0] && x < o.bosluk[1] && y > o.bosluk[2] && y < o.bosluk[3]) continue;
    liste.push({ x, y, h, c: KISI_RENK[(r() * 10) | 0], k: r() < (o.kol || 0) ? 1 : 0, ph: r() * 6, u });
  }
  liste.sort((a, b) => a.y - b.y);
  for (const p of liste) { const c = mix(p.c, o.sisRenk || '#F6D8A8', (1 - p.u) * (o.sis ?? .6)); kisi(p.x + Math.sin(o.t * .8 + p.ph) * p.h * .015, p.y, p.h, c, p.k * (o.kolGuc ?? 1), o.t, p.ph); }
}

// Havz: ışıklı havuz, nilüferler
function nilufer(x, y, s, t, seed) {
  elips(x, y + s * .12, s * 1.1, s * .36); doldur('#6FA874'); const nf = Math.sin(t * 1.4 + seed) * .03;
  for (let k = -2; k <= 2; k++) { X.save(); X.translate(x, y); X.rotate(k * .42 + nf); X.beginPath(); X.moveTo(0, 0); X.quadraticCurveTo(s * .3, -s * .5, 0, -s * .95); X.quadraticCurveTo(-s * .3, -s * .5, 0, 0); X.fillStyle = k % 2 ? '#FFFFFF' : '#FFF1F4'; X.fill(); X.strokeStyle = 'rgba(210,190,200,.6)'; X.lineWidth = 1; X.stroke(); X.restore(); }
  daire(x, y - s * .15, s * .1); doldur('#F2C84A');
}
function havz(cx, cy, rx, ry, t, parlak = 1) {
  X.save(); X.globalCompositeOperation = 'screen'; parilti(cx, cy - ry * .6, rx * 2.4, '#FFF6D8', .5 * parlak); X.restore();
  elips(cx, cy + 12, rx + 26, ry + 16); doldur('#CFC3A8'); elips(cx, cy + 5, rx + 17, ry + 9); doldur('#EFE6D0');
  X.save(); elips(cx, cy, rx, ry); X.clip();
  X.fillStyle = dGrad(0, cy - ry, 0, cy + ry, [[0, '#F4FFFF'], [.5, '#BFEFF0'], [1, '#8FD6E4']]); X.fillRect(cx - rx, cy - ry, 2 * rx, 2 * ry);
  X.globalCompositeOperation = 'screen'; parilti(cx, cy, rx * 1.2, '#FFFFFF', .7 * parlak); X.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 5; i++) { const u = ((t * .12 + i / 5) % 1); elips(cx, cy, rx * u, ry * u); cizgi('#FFFFFF', 2, (1 - u) * .7); }
  for (let i = 0; i < 20; i++) { const px = cx + (hash(i) - .5) * rx * 1.7, py = cy + (hash(i + 20) - .5) * ry * 1.6, a = Math.max(0, Math.sin(t * 2 + i * 1.7)); daire(px, py, 2.2); X.fillStyle = rgb('#FFFFFF', a); X.fill(); }
  X.restore();
  for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + .4; nilufer(cx + Math.cos(a) * rx * .74, cy + Math.sin(a) * ry * .64, 20 + hash(i) * 12, t, i); }
}

// Yağmur (altın rahmet) ve şimşek
function yagmur(t, x0, x1, yUst, yAlt, adet, seed, renk, hiz, uzun, al, egim = .1) {
  const r = rng(seed), H = yAlt - yUst; X.save(); X.lineCap = 'round';
  for (let i = 0; i < adet; i++) {
    const x = x0 + r() * (x1 - x0), sp = hiz * (.75 + r() * .5), off = r() * H, y = yUst + ((t * sp + off) % H), L = uzun * (.6 + r() * .8);
    const a = al * (.45 + r() * .55) * Math.min(1, (y - yUst) / 80) * Math.min(1, (yAlt - y) / 80); X.strokeStyle = rgb(renk, a); X.lineWidth = 1.3 + r() * 1.8; X.beginPath(); X.moveTo(x, y); X.lineTo(x - egim * L, y - L); X.stroke();
  }
  X.restore();
}
function simsek(t, t0, x, yUst, yAlt, seed) {
  const u = t - t0; if (u < 0 || u > .5) return; const a = u < .07 ? u / .07 : Math.exp(-(u - .07) * 8), r = rng(seed);
  X.save(); X.globalCompositeOperation = 'screen'; X.fillStyle = rgb('#CFC8F0', .2 * a); X.fillRect(-2000, -2000, 4000, 4000);
  X.beginPath(); let px = x, py = yUst; X.moveTo(px, py); while (py < yAlt) { py += 50 + r() * 60; px += (r() - .5) * 130; X.lineTo(px, py); }
  X.strokeStyle = rgb('#F2EEFF', a); X.lineWidth = 6; X.lineJoin = 'round'; X.shadowColor = 'rgba(200,190,255,.9)'; X.shadowBlur = 30; X.stroke(); X.shadowBlur = 0; X.restore();
}
// Koku iplikleri: bir kaynaktan hedefe süzülen ince ışık dalgaları
function kokuIplik(x0, y0, x1, y1, t, al, renk = '#FFE3A0', n = 4, seed = 1) {
  X.save(); X.globalCompositeOperation = 'screen'; X.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const ph = t * .8 + i * 1.7 + seed, mx = (x0 + x1) / 2 + Math.sin(ph) * 46, my = (y0 + y1) / 2 - 50 + Math.cos(ph * 1.3) * 34, pt = w => [(1 - w) * (1 - w) * x0 + 2 * (1 - w) * w * mx + w * w * x1, (1 - w) * (1 - w) * y0 + 2 * (1 - w) * w * my + w * w * y1];
    X.beginPath(); for (let k = 0; k <= 26; k++) { const [px, py] = pt(k / 26); k ? X.lineTo(px, py) : X.moveTo(px, py); } X.strokeStyle = rgb(renk, al * .28); X.lineWidth = 2.2; X.stroke();
    const u = ((t * .35 + i / n) % 1); X.beginPath(); let ilk = true; for (let k = 0; k <= 12; k++) { const w = clamp(u - .22 + k / 12 * .22), [px, py] = pt(w); ilk ? (X.moveTo(px, py), ilk = false) : X.lineTo(px, py); } X.strokeStyle = rgb(renk, al * .95); X.lineWidth = 4; X.stroke();
    const [hx, hy] = pt(u); parilti(hx, hy, 22, renk, al * .6);
  }
  X.restore();
}
// Beyaz kefene sarılı küçük paket (yüzsüz; yalnızca bez)
function kefenPaketi(x, y, L, Hh, rot = 0) {
  X.save(); X.translate(x, y); X.rotate(rot);
  for (const sd of [-1, 1]) { X.beginPath(); X.moveTo(sd * L * .5, 0); X.quadraticCurveTo(sd * (L * .5 + Hh * .35), -Hh * .18, sd * (L * .5 + Hh * .5), Hh * .1); X.strokeStyle = 'rgba(190,176,146,.9)'; X.lineWidth = Hh * .08; X.lineCap = 'round'; X.stroke(); }
  X.beginPath(); X.roundRect(-L / 2, -Hh / 2, L, Hh, Hh * .46); X.fillStyle = dGrad(0, -Hh / 2, 0, Hh / 2, [[0, '#FFFFFF'], [1, '#DCD2BA']]); X.fill(); X.strokeStyle = 'rgba(160,145,115,.55)'; X.lineWidth = Hh * .04; X.stroke();
  for (const k of [-.3, .02, .32]) { X.beginPath(); X.moveTo(k * L, -Hh / 2 + 2); X.quadraticCurveTo(k * L + Hh * .06, 0, k * L, Hh / 2 - 2); X.strokeStyle = 'rgba(150,135,105,.65)'; X.lineWidth = Hh * .06; X.stroke(); }
  X.restore();
}
// Çatlak toprak (susuzluk)
function catlakToprak(x0, x1, y0, y1, t, seed = 1) {
  X.fillStyle = dGrad(0, y0, 0, y1, [[0, '#C9A06A'], [1, '#8E6A42']]); X.fillRect(x0, y0, x1 - x0, y1 - y0);
  const r = rng(seed); X.strokeStyle = 'rgba(60,36,18,.7)'; X.lineWidth = 3; X.lineCap = 'round'; X.lineJoin = 'round';
  for (let i = 0; i < 46; i++) { let px = x0 + r() * (x1 - x0), py = y0 + r() * (y1 - y0), a = r() * TAU; X.beginPath(); X.moveTo(px, py); const n = 3 + (r() * 5 | 0); for (let k = 0; k < n; k++) { a += (r() - .5) * 1.5; const L = 20 + r() * 50 * (.3 + (py - y0) / (y1 - y0)); px += Math.cos(a) * L; py += Math.sin(a) * L * .6; X.lineTo(px, py); } X.stroke(); }
}
// Sıcak hava titreşimi: ufuk çizgisinde yatay dalgalı şeritler
function sicakHava(y, kal, t, al) { X.save(); for (let i = 0; i < 6; i++) { const yy = y - i * kal * .3; X.strokeStyle = rgb('#FFF1D0', al * (1 - i / 7)); X.lineWidth = 2; X.beginPath(); for (let x = -1500; x <= 1500; x += 20) X.lineTo(x, yy + Math.sin(x * .02 + t * 2 + i) * 4); X.stroke(); } X.restore(); }
