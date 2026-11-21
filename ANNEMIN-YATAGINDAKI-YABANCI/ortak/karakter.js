// KARAKTERLER — her karakterin tasarımı burada sabittir; bütün sahnelerde aynı fonksiyonla çizilir.
const KARAKTER = {
  // ANNEMİN YATAĞINDAKİ YABANCI — sabit karakter tasarımları (bütün bölümlerde aynı)
  MERT:  { boy: 1.03, kadin: 0, ten: '#e6b994', sac: '#3a2417', goz: '#6b3f1f', kas: '#2f1d12', yuz: 'normal', sacTip: 'mert', sakal: .2, sakalRenk: '#3a2417',
    ust: '#1f3566', ustTip: 'kazak', alt: '#17171b', altTip: 'pantolon', ayak: '#1d1b1c', omuz: 134, dudak: '#b5705f', seed: 11 },
  SEVDA: { boy: .97, kadin: 1, ten: '#f8dcc8', sac: '#e3b553', goz: '#139a62', kas: '#9c6f2c', yuz: 'ince', sacTip: 'sevda',
    ust: '#1f5e44', ustTip: 'hirka', ic: '#f2e6cf', icDesen: 0, alt: '#18181c', altTip: 'pantolon', ayak: '#221d1b', omuz: 116, dudak: '#d0747a', seed: 12 },
  NECLA: { boy: .94, kadin: 1, toplu: 1, ten: '#f0c9a8', sac: '#a0714a', goz: '#6a4528', kas: '#7a5434', yuz: 'yuvarlak', sacTip: 'necla', yas: 1,
    ust: '#8a2336', ustTip: 'hirka', ic: '#3f3a52', icDesen: 1, alt: '#2c2a33', altTip: 'etek', ayak: '#2d2420', omuz: 128, dudak: '#c06a6a', seed: 13 },
  SINAN: { boy: 1.04, kadin: 0, ten: '#dcae88', sac: '#141416', goz: '#3e2a1c', kas: '#141416', yuz: 'kosegen', sacTip: 'sinan', sakal: .3, sakalRenk: '#55565b',
    ust: '#44474f', ustTip: 'ceket', ic: '#18181c', alt: '#1d1e23', altTip: 'pantolon', ayak: '#121212', omuz: 138, dudak: '#a96a5d', seed: 14 },
  // yalnızca eski fotoğrafta: annenin genç hâli ve küçük kız
  ANNE_GENC: { boy: .96, kadin: 1, ten: '#f1cdb0', sac: '#4a2a1a', goz: '#5d3a22', kas: '#3b2416', yuz: 'normal', sacTip: 'aylin',
    ust: '#b2463e', ustTip: 'kazak', alt: '#384058', altTip: 'pantolon', ayak: '#3a2e27', omuz: 116, dudak: '#c26e6e', seed: 15 },
  KIZ: { boy: .9, kadin: 1, ten: '#f9e0cc', sac: '#ecc260', goz: '#2a9a66', kas: '#b98a35', yuz: 'yuvarlak', sacTip: 'sevda',
    ust: '#f2a9b3', ustTip: 'kazak', alt: '#5a6f9a', altTip: 'pantolon', ayak: '#c05050', omuz: 112, dudak: '#d98080', seed: 16 },
};

// Duygu ayarları: kaş iç/dış yüksekliği, göz açıklığı, göz kapağı, ağız eğrisi, göz bebeği
const DUYGU = {
  notr:   { ki: 0,   kd: 0,  ga: 1,    gk: 0,   ae: 1,  gb: 1 },
  korku:  { ki: -16, kd: 4,  ga: 1.16, gk: 0,   ae: -4, gb: .78 },
  endise: { ki: -11, kd: 3,  ga: 1.04, gk: .05, ae: -3, gb: .95 },
  uzgun:  { ki: -13, kd: 6,  ga: .92,  gk: .22, ae: -5, gb: 1 },
  ciddi:  { ki: 7,   kd: -2, ga: .95,  gk: .18, ae: -1, gb: 1 },
  sok:    { ki: -18, kd: -10, ga: 1.25, gk: 0,  ae: -2, gb: .7 },
  ofke:   { ki: 12,  kd: -6, ga: 1.0,  gk: .12, ae: -4, gb: .9 },
  sicak:  { ki: -4,  kd: 2,  ga: 1,    gk: .08, ae: 5,  gb: 1 },
  dusun:  { ki: 4,   kd: -4, ga: .9,   gk: .25, ae: -1, gb: 1 },
};

function karisDuygu(a, b, k) { const A = DUYGU[a] || DUYGU.notr, B = DUYGU[b] || DUYGU.notr; const o = {}; for (const n in A) o[n] = lerp(A[n], B[n], k); return o; }

// Konuşan karakterin o anki ağız durumu (zaman.js'deki ses verisinden)
function agizDurum(kar, t) {
  for (const r of REPLIK) {
    if (r.k !== kar || t < r.t || t >= r.t + r.d) continue;
    const f = (t - r.t) * FPS, i = Math.floor(f), k = f - i;
    const a0 = +(r.ac[i] || 0), a1 = +(r.ac[i + 1] || 0);
    return { ac: lerp(a0, a1, k) / 9, yu: +(r.yu[i] || 0), konus: 1 };
  }
  return { ac: 0, yu: 0, konus: 0 };
}
function goz_kirp(seed, t) { // doğal aralıklarla göz kırpma
  const per = 3.1 + hash(seed) * 1.6, f = frac(t / per + hash(seed * 3)), d = .13 / per;
  return f < d ? Math.sin(f / d * Math.PI) : 0;
}

function konturlu(c, dolgu, kalinlik = 3, k = -.38) { c.fillStyle = dolgu; c.fill(); c.lineWidth = kalinlik; c.strokeStyle = typeof dolgu === 'string' && dolgu[0] === '#' ? renk(dolgu, k) : 'rgba(40,25,20,.35)'; c.stroke(); }

// ---------- YÜZ ----------
function yuzYolu(c, tip) {
  const w = tip === 'ince' ? 114 : tip === 'yuvarlak' ? 128 : tip === 'kosegen' ? 122 : 120;
  const ceneY = tip === 'yuvarlak' ? -706 : tip === 'ince' ? -704 : -702, ceneW = tip === 'kosegen' ? 50 : tip === 'ince' ? 30 : 42;
  c.beginPath(); c.moveTo(0, -968);
  c.bezierCurveTo(w * .62, -968, w, -930, w, -850);
  c.bezierCurveTo(w, tip === 'kosegen' ? -770 : -790, w * .86, -742, ceneW + 18, -716);
  c.quadraticCurveTo(ceneW * .5, ceneY + 2, 0, ceneY);
  c.quadraticCurveTo(-ceneW * .5, ceneY + 2, -ceneW - 18, -716);
  c.bezierCurveTo(-w * .86, -742, -w, tip === 'kosegen' ? -770 : -790, -w, -850);
  c.bezierCurveTo(-w, -930, -w * .62, -968, 0, -968); c.closePath();
}

function goz(c, K, x, y, uzak, D, p, t) {
  const w = 29 * (1 - uzak * .22), h = 21 * D.ga, kirp = Math.max(p.kirp || 0, D.gk);
  const gx = (p.bak ? p.bak[0] : p.don * .6) * 8, gy = (p.bak ? p.bak[1] : 0) * 5;
  c.save();
  // göz akı
  c.beginPath(); c.moveTo(x - w, y); c.quadraticCurveTo(x, y - h * 1.55, x + w, y); c.quadraticCurveTo(x, y + h * 1.15, x - w, y); c.closePath();
  c.fillStyle = '#fbf8f4'; c.fill();
  c.clip();
  // iris
  const ir = 16.5, ix = x + gx, iy = y + gy + 1;
  const g = c.createRadialGradient(ix, iy - 4, 2, ix, iy, ir);
  g.addColorStop(0, renk(K.goz, .35)); g.addColorStop(.7, K.goz); g.addColorStop(1, renk(K.goz, -.45));
  c.fillStyle = g; c.beginPath(); c.arc(ix, iy, ir, 0, 7); c.fill();
  c.fillStyle = '#1a100c'; c.beginPath(); c.arc(ix, iy, 8 * D.gb, 0, 7); c.fill();
  c.fillStyle = 'rgba(255,255,255,.95)'; c.beginPath(); c.arc(ix - 5, iy - 6, 4.6 + (p.gozyasi || 0) * 1.5, 0, 7); c.fill();
  c.beginPath(); c.arc(ix + 6, iy + 5, 2.2 + (p.gozyasi || 0), 0, 7); c.fill();
  // üst kapak gölgesi
  c.fillStyle = 'rgba(120,70,60,.16)'; c.fillRect(x - w, y - h * 1.6, w * 2, h * .5);
  // kapak (kırpma/duygu)
  if (kirp > 0) { c.fillStyle = K.ten; c.fillRect(x - w - 2, y - h * 1.7, w * 2 + 4, h * 2.85 * kirp); }
  c.restore();
  // kirpik çizgisi
  const ky = y - h * 1.55 + (h * 2.7) * kirp * .98;
  c.lineCap = 'round'; c.strokeStyle = '#2a1712'; c.lineWidth = K.kadin ? 5.5 : 4.5;
  c.beginPath(); c.moveTo(x - w - 1, y); c.quadraticCurveTo(x, kirp > .55 ? y + h * .7 * (kirp - .55) * 2 : ky, x + w + 1, y); c.stroke();
  if (K.kadin) { const s = Math.sign(x - (p.don * 26)) || 1; c.lineWidth = 4; c.beginPath(); c.moveTo(x + s * w, y - 1); c.lineTo(x + s * (w + 8), y - 7); c.stroke(); }
  // alt kapak
  c.strokeStyle = 'rgba(110,60,50,.28)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - w * .7, y + h * .75); c.quadraticCurveTo(x, y + h * 1.15, x + w * .7, y + h * .75); c.stroke();
  if (K.yas) { c.strokeStyle = 'rgba(110,60,50,.22)'; c.beginPath(); const s = Math.sign(x - p.don * 26) || 1; c.moveTo(x + s * (w + 4), y + 4); c.lineTo(x + s * (w + 14), y + 10); c.stroke(); }
}

function agizCiz(c, K, x, y, A, D) {
  const o = clamp(A.ac, 0, 1), yu = A.yu;
  const mw = (K.kadin ? 24 : 27) * (yu ? .62 : 1) * (1 + o * .12), mh = o * (yu ? 30 : 26);
  c.lineCap = 'round'; c.lineJoin = 'round';
  if (mh < 3.5) {
    c.strokeStyle = renk(K.dudak, -.35); c.lineWidth = 4.5; c.beginPath();
    c.moveTo(x - mw, y - D.ae * .4); c.quadraticCurveTo(x, y + D.ae * 1.1, x + mw, y - D.ae * .4); c.stroke();
    c.strokeStyle = rgba(K.dudak, .45); c.lineWidth = 3; c.beginPath(); c.moveTo(x - mw * .45, y + 7); c.quadraticCurveTo(x, y + 10, x + mw * .45, y + 7); c.stroke();
    return;
  }
  c.beginPath(); c.moveTo(x - mw, y - D.ae * .3);
  c.quadraticCurveTo(x, y - 6 - mh * .15, x + mw, y - D.ae * .3);
  c.quadraticCurveTo(x + mw * .8, y + mh, x, y + mh + 2);
  c.quadraticCurveTo(x - mw * .8, y + mh, x - mw, y - D.ae * .3); c.closePath();
  c.fillStyle = '#5b2424'; c.fill(); c.save(); c.clip();
  c.fillStyle = '#f6f1ea'; c.fillRect(x - mw, y - 10, mw * 2, 6 + Math.min(5, mh * .22));
  c.fillStyle = '#c4646a'; c.beginPath(); c.ellipse(x, y + mh + 2, mw * .62, mh * .45, 0, 0, 7); c.fill();
  c.restore();
  c.strokeStyle = renk(K.dudak, -.2); c.lineWidth = 3.4; c.stroke();
}

function yuzCiz(c, K, p, t) {
  const D = p.D, dx = p.don * 26, A = p.agiz || { ac: 0, yu: 0 };
  // yüz
  yuzYolu(c, K.yuz);
  const g = c.createLinearGradient(-120, 0, 120, 0); g.addColorStop(0, renk(K.ten, .06)); g.addColorStop(.6, K.ten); g.addColorStop(1, renk(K.ten, -.1));
  c.fillStyle = g; c.fill(); c.lineWidth = 3.5; c.strokeStyle = renk(K.ten, -.38); c.stroke();
  c.save(); yuzYolu(c, K.yuz); c.clip();
  // saç gölgesi (alın)
  c.fillStyle = 'rgba(120,60,45,.12)'; c.beginPath(); c.ellipse(0, -935, 140, 40, 0, 0, 7); c.fill();
  // sakal gölgesi
  if (K.sakal) {
    c.fillStyle = rgba(K.sakalRenk || '#28201c', K.sakal * 1.3); c.beginPath();
    c.moveTo(-122, -800); c.quadraticCurveTo(-110, -742, -60, -712); c.quadraticCurveTo(0, -690, 60, -712); c.quadraticCurveTo(110, -742, 122, -800);
    c.quadraticCurveTo(95, -770, 55 + dx, -762); c.quadraticCurveTo(dx, -770, -55 + dx, -762); c.quadraticCurveTo(-95, -770, -122, -800); c.fill();
    c.fillStyle = rgba(K.sakalRenk || '#28201c', K.sakal * .8); c.beginPath(); c.ellipse(dx * 1.1, -757, 30, 7, 0, 0, 7); c.fill();
    c.fillStyle = rgba(K.sakalRenk || '#1e1614', K.sakal * .9);
    for (let i = 0; i < 70; i++) { const a = hash(i + K.seed * 100) * Math.PI, r = 85 + hash(i * 7 + K.seed) * 30; c.fillRect(Math.cos(a) * r * .95 + dx * .3 - 1, -760 + Math.sin(a) * 55 - 1, 2.2, 2.2); }
  }
  // yanaklar
  for (const s of [-1, 1]) {
    const yg = c.createRadialGradient(s * 70 + dx * .8, -772, 2, s * 70 + dx * .8, -772, 30);
    yg.addColorStop(0, `rgba(238,120,118,${K.kadin ? .34 : .14})`); yg.addColorStop(1, 'rgba(238,120,118,0)');
    c.fillStyle = yg; c.beginPath(); c.arc(s * 70 + dx * .8, -772, 30, 0, 7); c.fill();
  }
  c.restore();
  // kulaklar (kısa saçlılar)
  if (['emir', 'murat', 'memur', 'mert', 'sinan', 'necla'].includes(K.sacTip)) {
    for (const s of [-1, 1]) { if (s * p.don > .55) continue; c.beginPath(); c.ellipse(s * (121 - Math.max(0, s * p.don) * 10), -815, 15, 26, 0, 0, 7); konturlu(c, renk(K.ten, -.04), 3); }
  }
  // gözler
  const uz = s => clamp(s * p.don, 0, 1);
  goz(c, K, -48 + dx, -812, uz(-1), D, p, t);
  goz(c, K, 48 + dx, -812, uz(1), D, p, t);
  // kaşlar
  c.strokeStyle = K.kas; c.lineCap = 'round'; c.lineWidth = K.kadin ? 7 : 10;
  for (const s of [-1, 1]) {
    const ix = s * 20 + dx, ox = s * 78 + dx * .9, by = -862 - (D.ga - 1) * 20;
    c.beginPath(); c.moveTo(ix, by + D.ki * .9); c.quadraticCurveTo((ix + ox) / 2, by - 8 + (D.ki + D.kd) * .3, ox, by + 6 + D.kd); c.stroke();
  }
  if (K.yas) { c.strokeStyle = 'rgba(120,70,55,.22)'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-34 + dx, -900); c.quadraticCurveTo(dx, -905, 34 + dx, -900); c.stroke(); }
  // burun
  c.strokeStyle = renk(K.ten, -.32); c.lineWidth = 3.4; c.beginPath(); c.moveTo(dx * 1.15 + 4, -800); c.quadraticCurveTo(dx * 1.15 + 15, -774, dx * 1.15 + 1, -767); c.stroke();
  c.fillStyle = rgba('#a06050', .14); c.beginPath(); c.ellipse(dx * 1.15 - 6, -772, 10, 6, 0, 0, 7); c.fill();
  // ağız
  agizCiz(c, K, dx * 1.12, -736, A, D);
  // gözyaşı
  if (p.gozyasi > 0) {
    c.strokeStyle = `rgba(200,230,255,${.75 * p.gozyasi})`; c.lineWidth = 3;
    for (const s of [-1, 1]) { const x = s * 48 + dx; c.beginPath(); c.moveTo(x - 22, -797); c.quadraticCurveTo(x, -790, x + 22, -797); c.stroke(); }
    if (p.gozyasi > .6) {
      const yk = frac(t * .35) * 70; c.fillStyle = `rgba(210,235,255,${.8 * (1 - yk / 70)})`;
      c.beginPath(); c.ellipse(-56 + dx, -790 + yk, 4, 6, 0, 0, 7); c.fill();
    }
  }
}

// ---------- SAÇ ----------
// noktalardan geçen yumuşak eğri (orta noktalar üzerinden quadratic)
function yumusak(c, pts, devam) {
  if (!devam) c.moveTo(pts[0][0], pts[0][1]); else c.lineTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) c.quadraticCurveTo(pts[i][0], pts[i][1], (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2);
  const l = pts[pts.length - 1]; c.lineTo(l[0], l[1]);
}
function sacArka(c, K, p, t) {
  const sw = gurultu(t * .6, K.seed) * 4;
  if (K.sacTip === 'aylin') {
    c.beginPath(); c.moveTo(-132, -860);
    c.bezierCurveTo(-150, -1010, 150, -1010, 132, -860);
    c.bezierCurveTo(150, -780, 158 + sw, -700, 150 + sw, -640);
    c.quadraticCurveTo(120, -628, 95, -650); c.quadraticCurveTo(60, -640, 30, -660);
    c.lineTo(-30, -660); c.quadraticCurveTo(-60, -640, -95, -650); c.quadraticCurveTo(-120, -628, -150 + sw, -640);
    c.bezierCurveTo(-158 + sw, -700, -150, -780, -132, -860); c.closePath();
    const g = c.createLinearGradient(0, -960, 0, -640); g.addColorStop(0, K.sac); g.addColorStop(1, renk(K.sac, -.35));
    konturlu(c, g, 3); c.strokeStyle = renk(K.sac, -.5); c.stroke();
  } else if (K.sacTip === 'sevda') {
    // uzun, dalgalı altın sarısı — omuzların altına iner
    const sag = [], sol = [];
    for (let i = 0; i <= 10; i++) { const y = -840 + i * 30; sag.push([150 + Math.sin(i * 1.1 + t * .8) * 8 + i * 1.8 + sw, y]); sol.push([-150 - Math.sin(i * 1.1 + 2 + t * .8) * 8 - i * 1.8 + sw, y]); }
    c.beginPath(); c.moveTo(sol[0][0], sol[0][1]); c.bezierCurveTo(-158, -1020, 158, -1020, sag[0][0], sag[0][1]);
    yumusak(c, sag, 1);
    c.quadraticCurveTo(140, -520, 100, -538); c.quadraticCurveTo(60, -515, 25, -545); c.quadraticCurveTo(0, -530, -25, -545); c.quadraticCurveTo(-60, -515, -100, -538); c.quadraticCurveTo(-140, -520, sol[10][0], sol[10][1]);
    yumusak(c, sol.slice().reverse(), 1);
    c.closePath();
    const g = c.createLinearGradient(0, -980, 0, -540); g.addColorStop(0, renk(K.sac, .12)); g.addColorStop(.6, K.sac); g.addColorStop(1, renk(K.sac, -.28));
    konturlu(c, g, 3, -.38);
  } else if (K.sacTip === 'necla') {
    c.beginPath(); c.arc(-40, -985, 52, 0, 7); const g = c.createRadialGradient(-50, -1000, 5, -40, -985, 52); g.addColorStop(0, renk(K.sac, .2)); g.addColorStop(1, renk(K.sac, -.15)); konturlu(c, g, 3, -.35);
    c.strokeStyle = 'rgba(80,50,30,.35)'; c.lineWidth = 3; c.beginPath(); c.arc(-40, -985, 30, .5, 4); c.stroke();
  } else if (K.sacTip === 'derya') {
    c.beginPath(); c.moveTo(-128, -870);
    c.bezierCurveTo(-140, -1010, 140, -1010, 128, -870);
    c.lineTo(140 + sw * .5, -655); c.lineTo(-140 + sw * .5, -655); c.closePath();
    const g = c.createLinearGradient(0, -980, 0, -650); g.addColorStop(0, renk(K.sac, .12)); g.addColorStop(1, K.sac);
    konturlu(c, g, 3, -.2);
  } else if (K.sacTip === 'zehra') {
    c.beginPath(); c.moveTo(-150, -850); c.bezierCurveTo(-160, -1020, 160, -1020, 150, -850);
    c.bezierCurveTo(152, -760, 175, -690, 185, -612); c.quadraticCurveTo(0, -585, -185, -612);
    c.bezierCurveTo(-175, -690, -152, -760, -150, -850); c.closePath();
    const g = c.createLinearGradient(-150, 0, 150, 0); g.addColorStop(0, renk(K.sac, .1)); g.addColorStop(1, renk(K.sac, -.14));
    konturlu(c, g, 3.5, -.3);
  }
}
function sacOn(c, K, p, t) {
  const dx = p.don * 22;
  c.lineJoin = 'round';
  if (K.sacTip === 'aylin') {
    // perçem: yandan ayrık, alnı kısmen örten
    c.beginPath(); c.moveTo(-126, -838);
    c.bezierCurveTo(-138, -960, -60, -1000, 10, -992);
    c.bezierCurveTo(90, -990, 140, -950, 128, -838);
    c.bezierCurveTo(118, -880, 90, -912, 40 + dx, -918);
    c.bezierCurveTo(-10 + dx, -906, -60 + dx, -880, -96, -850);
    c.quadraticCurveTo(-112, -830, -126, -838); c.closePath();
    const g = c.createLinearGradient(0, -1000, 0, -840); g.addColorStop(0, renk(K.sac, .08)); g.addColorStop(1, K.sac);
    konturlu(c, g, 3, -.5);
    // yüzü çerçeveleyen tutamlar
    for (const s of [-1, 1]) {
      c.beginPath(); c.moveTo(s * 126, -850); c.bezierCurveTo(s * 138, -790, s * 134, -720, s * 124, -660);
      c.quadraticCurveTo(s * 112, -690, s * 106, -740); c.bezierCurveTo(s * 108, -790, s * 112, -820, s * 118, -846); c.closePath();
      konturlu(c, K.sac, 2.5, -.5);
    }
    c.strokeStyle = 'rgba(255,220,190,.22)'; c.lineWidth = 5; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-70, -968); c.quadraticCurveTo(0, -985, 60, -962); c.stroke();
    c.beginPath(); c.moveTo(70, -940); c.quadraticCurveTo(100, -920, 112, -880); c.stroke();
  } else if (K.sacTip === 'sevda') {
    // yan ayrık yumuşak perçem + yüzü çerçeveleyen dalgalı tutamlar
    c.beginPath(); c.moveTo(-126, -836);
    c.bezierCurveTo(-140, -965, -40, -1004, 30, -996); c.bezierCurveTo(110, -986, 142, -930, 128, -836);
    c.bezierCurveTo(116, -884, 84, -914, 38 + dx, -920); c.bezierCurveTo(-20 + dx, -910, -70 + dx, -878, -100, -846); c.quadraticCurveTo(-114, -826, -126, -836); c.closePath();
    let g = c.createLinearGradient(0, -1000, 0, -840); g.addColorStop(0, renk(K.sac, .2)); g.addColorStop(1, K.sac); konturlu(c, g, 2.5, -.38);
    for (const sg of [-1, 1]) {
      const dis = [], ic = [];
      for (let i = 0; i <= 9; i++) { const y = -830 + i * 30; dis.push([sg * (134 + Math.sin(i * 1.2 + 1 + t * .8) * 9 + i * 1.6), y]); ic.push([sg * (106 + Math.sin(i * 1.2 + t * .8) * 6), y]); }
      c.beginPath(); c.moveTo(sg * 124, -852); yumusak(c, dis, 1);
      c.quadraticCurveTo(sg * 128, -548, sg * 112, -556);
      yumusak(c, ic.slice().reverse(), 1); c.closePath();
      g = c.createLinearGradient(0, -860, 0, -560); g.addColorStop(0, K.sac); g.addColorStop(1, renk(K.sac, -.2)); konturlu(c, g, 2.5, -.38);
      c.strokeStyle = 'rgba(160,110,35,.35)'; c.lineWidth = 2.5; c.beginPath(); yumusak(c, dis.map((q, i) => [lerp(q[0], ic[i][0], .5), q[1]]), 0); c.stroke();
    }
    c.strokeStyle = 'rgba(255,240,190,.5)'; c.lineWidth = 5; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-60, -972); c.quadraticCurveTo(10, -992, 70, -962); c.stroke();
    for (const sg of [-1, 1]) { c.beginPath(); c.moveTo(sg * 128, -790); c.quadraticCurveTo(sg * 140, -720, sg * 132, -640); c.stroke(); }
    c.strokeStyle = 'rgba(150,100,30,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-90, -950); c.quadraticCurveTo(-50, -930, -10 + dx, -920); c.stroke();
  } else if (K.sacTip === 'mert') {
    c.beginPath(); c.moveTo(-124, -826);
    c.bezierCurveTo(-138, -940, -80, -1012, 10, -1008); c.bezierCurveTo(100, -1004, 140, -940, 124, -826);
    c.lineTo(116, -862); c.quadraticCurveTo(104, -900, 70 + dx, -918);
    c.quadraticCurveTo(20 + dx, -930, -30 + dx, -908); c.quadraticCurveTo(-60 + dx, -935, -90 + dx, -900);
    c.quadraticCurveTo(-112, -885, -116, -858); c.closePath();
    const g = c.createLinearGradient(0, -1010, 0, -830); g.addColorStop(0, renk(K.sac, .15)); g.addColorStop(1, K.sac); konturlu(c, g, 3, -.4);
    c.strokeStyle = 'rgba(255,200,150,.22)'; c.lineWidth = 5; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-70, -985); c.quadraticCurveTo(0, -1005, 80, -970); c.stroke(); c.beginPath(); c.moveTo(-40, -960); c.quadraticCurveTo(20, -975, 70, -945); c.stroke();
  } else if (K.sacTip === 'sinan') {
    c.beginPath(); c.moveTo(-124, -822);
    c.bezierCurveTo(-134, -935, -88, -1000, 0, -1000); c.bezierCurveTo(88, -1000, 134, -935, 124, -822);
    c.lineTo(117, -868); c.quadraticCurveTo(100, -912, 40 + dx, -922); c.lineTo(-40 + dx, -922); c.quadraticCurveTo(-100, -912, -117, -868); c.closePath();
    konturlu(c, K.sac, 3, -.2); c.strokeStyle = 'rgba(0,0,0,.4)'; c.stroke();
    c.fillStyle = 'rgba(170,170,178,.55)'; for (const sg of [-1, 1]) { c.beginPath(); c.ellipse(sg * 118, -860, 9, 30, 0, 0, 7); c.fill(); }
    c.strokeStyle = 'rgba(255,255,255,.14)'; c.lineWidth = 5; c.beginPath(); c.moveTo(-50, -978); c.quadraticCurveTo(10, -992, 60, -972); c.stroke();
  } else if (K.sacTip === 'necla') {
    c.beginPath(); c.moveTo(-124, -830);
    c.bezierCurveTo(-136, -950, -80, -1000, 0, -1000); c.bezierCurveTo(80, -1000, 136, -950, 124, -830);
    c.lineTo(116, -860); c.quadraticCurveTo(90, -930, 10 + dx, -944); c.quadraticCurveTo(-80, -930, -116, -860); c.closePath();
    const g = c.createLinearGradient(0, -1000, 0, -840); g.addColorStop(0, renk(K.sac, .18)); g.addColorStop(1, K.sac); konturlu(c, g, 3, -.35);
    c.strokeStyle = 'rgba(80,50,30,.3)'; c.lineWidth = 2.5; for (const x of [-60, -20, 30, 70]) { c.beginPath(); c.moveTo(x * .3 + dx, -990); c.quadraticCurveTo(x, -960, x * 1.5, -880); c.stroke(); }
    c.strokeStyle = rgba(K.sac, .8); c.lineWidth = 3; c.beginPath(); c.moveTo(-118, -850); c.quadraticCurveTo(-128, -800, -118, -770); c.stroke();
  } else if (K.sacTip === 'derya') {
    // ortadan ayrık, düz, omuz hizası; ıslak tutamlar
    for (const sg of [-1, 1]) {
      c.beginPath(); c.moveTo(dx * .4 + sg * 2, -992);
      c.bezierCurveTo(sg * 70, -995, sg * 132, -955, sg * 132, -860);
      c.lineTo(sg * 136, -662); c.lineTo(sg * 104, -668); c.lineTo(sg * 110, -760);
      c.bezierCurveTo(sg * 112, -850, sg * 90, -905, dx * .4 + sg * 4, -930); c.closePath();
      const g = c.createLinearGradient(0, -1000, 0, -660); g.addColorStop(0, renk(K.sac, .14)); g.addColorStop(1, K.sac);
      konturlu(c, g, 2.5, -.2);
    }
    c.strokeStyle = 'rgba(170,190,215,.28)'; c.lineWidth = 3; c.lineCap = 'round';
    for (const sg of [-1, 1]) { c.beginPath(); c.moveTo(sg * 50 + dx * .4, -975); c.quadraticCurveTo(sg * 112, -930, sg * 120, -820); c.stroke(); c.beginPath(); c.moveTo(sg * 122, -800); c.lineTo(sg * 118, -700); c.stroke(); }
    c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 2; c.beginPath(); c.moveTo(dx * .4, -992); c.lineTo(dx * .4, -935); c.stroke();
  } else if (K.sacTip === 'emir' || K.sacTip === 'memur') {
    c.beginPath(); c.moveTo(-124, -826);
    c.bezierCurveTo(-136, -930, -90, -1004, 0, -1004); c.bezierCurveTo(90, -1004, 138, -940, 124, -826);
    c.lineTo(116, -858); c.quadraticCurveTo(100, -900, 64 + dx, -914);
    c.lineTo(42 + dx, -900); c.lineTo(20 + dx, -918); c.lineTo(-10 + dx, -903); c.lineTo(-36 + dx, -920); c.lineTo(-70 + dx, -904);
    c.quadraticCurveTo(-110, -890, -116, -858); c.closePath();
    konturlu(c, K.sac, 3, -.3); c.strokeStyle = 'rgba(0,0,0,.4)'; c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-50, -980); c.quadraticCurveTo(10, -995, 60, -975); c.stroke();
    if (K.sacTip === 'memur') { // polis şapkası
      c.beginPath(); c.moveTo(-132, -905); c.bezierCurveTo(-150, -1010, 150, -1010, 132, -905); c.closePath(); konturlu(c, '#1d2a44', 3);
      yd(c, -130, -925, 260, 26, 8); konturlu(c, '#2c3d60', 2.5);
      c.beginPath(); c.moveTo(-128, -903); c.quadraticCurveTo(0, -870, 128, -903); c.quadraticCurveTo(0, -890, -128, -903); konturlu(c, '#0e0e10', 3);
      c.beginPath(); c.arc(0, -955, 14, 0, 7); konturlu(c, '#d8b45a', 2.5); c.fillStyle = '#b48d34'; c.beginPath(); c.arc(0, -955, 6, 0, 7); c.fill();
    }
  } else if (K.sacTip === 'murat') {
    c.beginPath(); c.moveTo(-124, -820);
    c.bezierCurveTo(-136, -935, -86, -998, 0, -998); c.bezierCurveTo(86, -998, 136, -935, 124, -820);
    c.lineTo(117, -866); c.quadraticCurveTo(100, -918, 50 + dx, -930); c.quadraticCurveTo(0 + dx, -920, -50 + dx, -930);
    c.quadraticCurveTo(-100, -918, -117, -866); c.closePath();
    const g = c.createLinearGradient(0, -1000, 0, -820); g.addColorStop(0, '#55575c'); g.addColorStop(1, '#8c8e92');
    konturlu(c, g, 3, -.4);
    c.strokeStyle = 'rgba(220,220,225,.35)'; c.lineWidth = 3; c.lineCap = 'round';
    for (let i = 0; i < 9; i++) { const x = -90 + i * 22; c.beginPath(); c.moveTo(x, -965 + Math.abs(x) * .25); c.lineTo(x + 10, -935 + Math.abs(x) * .2); c.stroke(); }
    c.strokeStyle = 'rgba(40,40,45,.35)'; for (let i = 0; i < 6; i++) { const x = -70 + i * 28; c.beginPath(); c.moveTo(x, -980 + Math.abs(x) * .2); c.lineTo(x + 8, -945); c.stroke(); }
  } else if (K.sacTip === 'zehra') {
    // başörtüsü ön kenarı ve çene altı
    c.beginPath(); c.moveTo(-128, -840); c.bezierCurveTo(-138, -975, 138, -975, 128, -840);
    c.bezierCurveTo(136, -780, 120, -722, 70, -696); c.quadraticCurveTo(0, -668, -70, -696); c.bezierCurveTo(-120, -722, -136, -780, -128, -840);
    c.lineTo(-114, -840); c.bezierCurveTo(-118, -770, -100, -728, -60, -712); c.quadraticCurveTo(0, -695, 60, -712); c.bezierCurveTo(100, -728, 118, -770, 114, -840);
    c.bezierCurveTo(122, -950, -122, -950, -114, -840); c.closePath();
    const g = c.createLinearGradient(0, -980, 0, -680); g.addColorStop(0, renk(K.sac, .12)); g.addColorStop(1, renk(K.sac, -.08));
    c.fillStyle = g; c.fill('evenodd'); c.strokeStyle = renk(K.sac, -.32); c.lineWidth = 3; c.stroke();
    c.strokeStyle = 'rgba(150,120,80,.35)'; c.lineWidth = 2.5;
    c.beginPath(); c.moveTo(-60, -955); c.quadraticCurveTo(-90, -900, -124, -870); c.stroke();
    c.beginPath(); c.moveTo(70, -950); c.quadraticCurveTo(110, -880, 122, -810); c.stroke();
    c.beginPath(); c.moveTo(-40, -690); c.quadraticCurveTo(0, -670, 50, -688); c.stroke();
    // iğne
    c.fillStyle = '#c9a85a'; c.beginPath(); c.arc(78, -706, 5, 0, 7); c.fill();
  }
}

// ---------- GÖVDE / GİYSİ ----------
function govdeYolu(c, sw, kadin, toplu) {
  const ww = toplu ? sw - 2 : kadin ? sw - 22 : sw - 14, hw = toplu ? sw + 8 : kadin ? sw - 6 : sw - 18;
  c.beginPath(); c.moveTo(-sw + 22, -672);
  c.quadraticCurveTo(-sw - 2, -668, -sw, -626); c.lineTo(-ww, -480); c.quadraticCurveTo(-ww - 2, -430, -hw, -380);
  c.lineTo(hw, -380); c.quadraticCurveTo(ww + 2, -430, ww, -480); c.lineTo(sw, -626); c.quadraticCurveTo(sw + 2, -668, sw - 22, -672); c.closePath();
}
function govdeCiz(c, K, p, t) {
  const sw = K.omuz;
  // boyun
  yd(c, -26, -716, 52, 60, 14); konturlu(c, renk(K.ten, -.08), 3);
  c.fillStyle = 'rgba(110,60,45,.22)'; c.beginPath(); c.ellipse(0, -700, 30, 12, 0, 0, 7); c.fill();
  govdeYolu(c, sw, K.kadin, K.toplu);
  const g = c.createLinearGradient(-sw, 0, sw, 0); g.addColorStop(0, renk(K.ust, .1)); g.addColorStop(.55, K.ust); g.addColorStop(1, renk(K.ust, -.18));
  konturlu(c, g, 3.5);
  c.save(); govdeYolu(c, sw, K.kadin, K.toplu); c.clip();
  if (K.ustTip === 'kazak') {
    c.strokeStyle = 'rgba(150,120,90,.12)'; c.lineWidth = 3;
    for (let x = -sw; x < sw; x += 14) { c.beginPath(); c.moveTo(x, -650); c.lineTo(x, -420); c.stroke(); }
    c.fillStyle = renk(K.ust, -.06); c.fillRect(-sw, -410, sw * 2, 30);
    c.strokeStyle = 'rgba(120,95,70,.25)'; for (let x = -sw; x < sw; x += 8) { c.beginPath(); c.moveTo(x, -410); c.lineTo(x, -380); c.stroke(); }
    c.beginPath(); c.ellipse(0, -676, 46, 20, 0, 0, Math.PI); c.lineWidth = 12; c.strokeStyle = renk(K.ust, -.08); c.stroke();
  } else if (K.ustTip === 'gomlek' || K.ustTip === 'uniforma') {
    c.strokeStyle = renk(K.ust, -.35); c.lineWidth = 3; c.beginPath(); c.moveTo(0, -680); c.lineTo(0, -380); c.stroke();
    c.fillStyle = renk(K.ust, .35); for (let y = -640; y > -700 + 300; y -= 0) break;
    for (let y = -650; y < -390; y += 52) { c.beginPath(); c.arc(7, y, 4, 0, 7); c.fill(); }
    if (K.ustTip === 'uniforma') {
      for (const s of [-1, 1]) { yd(c, s * 70 - 30, -620, 60, 64, 6); c.fillStyle = renk(K.ust, -.1); c.fill(); c.strokeStyle = renk(K.ust, -.4); c.lineWidth = 2.5; c.stroke(); }
      yd(c, 38, -600, 66, 22, 4); c.fillStyle = '#e8e8ea'; c.fill(); c.fillStyle = '#1f2c47'; c.font = 'bold 15px Nunito, sans-serif'; c.textAlign = 'center'; c.fillText('POLİS', 71, -584);
      c.fillStyle = '#d8b45a'; c.beginPath(); c.moveTo(-70, -610); c.lineTo(-58, -600); c.lineTo(-62, -584); c.lineTo(-78, -584); c.lineTo(-82, -600); c.closePath(); c.fill();
      c.fillStyle = '#111'; c.fillRect(-sw, -420, sw * 2, 26); c.fillStyle = '#b8b8b8'; c.fillRect(-14, -418, 28, 22);
    }
  } else if (K.ustTip === 'ceket') {
    c.fillStyle = K.ic || '#cfdbe8'; c.beginPath(); c.moveTo(-34, -684); c.lineTo(34, -684); c.lineTo(14, -470); c.lineTo(-14, -470); c.closePath(); c.fill();
    c.fillStyle = K.ic ? renk(K.ic, .12) : '#b9c8d8'; c.beginPath(); c.moveTo(-34, -684); c.lineTo(-6, -640); c.lineTo(-24, -620); c.closePath(); c.fill(); c.beginPath(); c.moveTo(34, -684); c.lineTo(6, -640); c.lineTo(24, -620); c.closePath(); c.fill();
    for (const s of [-1, 1]) {
      c.beginPath(); c.moveTo(s * 36, -686); c.lineTo(s * 70, -660); c.lineTo(s * 50, -600); c.lineTo(s * 70, -590); c.lineTo(s * 12, -460); c.lineTo(s * 30, -686); c.closePath();
      c.fillStyle = renk(K.ust, -.08); c.fill(); c.strokeStyle = renk(K.ust, -.42); c.lineWidth = 3; c.stroke();
    }
    c.fillStyle = renk(K.ust, -.4); c.beginPath(); c.arc(-20, -440, 6, 0, 7); c.fill();
    c.strokeStyle = renk(K.ust, -.35); c.lineWidth = 3; c.beginPath(); c.moveTo(-sw + 40, -480); c.lineTo(-sw + 90, -480); c.stroke();
  } else if (K.ustTip === 'yagmurluk') {
    c.fillStyle = renk(K.ust, -.12); c.beginPath(); c.moveTo(-40, -690); c.lineTo(40, -690); c.lineTo(10, -560); c.lineTo(-10, -560); c.closePath(); c.fill();
    c.fillStyle = '#2a2328'; c.beginPath(); c.moveTo(-26, -688); c.lineTo(26, -688); c.lineTo(8, -600); c.lineTo(-8, -600); c.closePath(); c.fill();
    for (const sg of [-1, 1]) {
      c.beginPath(); c.moveTo(sg * 40, -692); c.lineTo(sg * 92, -666); c.lineTo(sg * 64, -600); c.lineTo(sg * 84, -590); c.lineTo(sg * 18, -540); c.closePath();
      c.fillStyle = renk(K.ust, .08); c.fill(); c.strokeStyle = renk(K.ust, -.45); c.lineWidth = 3; c.stroke();
    }
    c.fillStyle = renk(K.ust, -.4); for (const y of [-520, -470]) for (const x of [-34, 34]) { c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); }
    c.fillStyle = renk(K.ust, -.1); c.fillRect(-sw, -455, sw * 2, 30); c.strokeStyle = renk(K.ust, -.45); c.lineWidth = 2.5; c.strokeRect(-sw, -455, sw * 2, 30);
    c.fillStyle = '#c9a65a'; yd(c, 24, -458, 30, 36, 4); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-sw + 30, -640); c.lineTo(-sw + 40, -480); c.stroke();
  } else if (K.ustTip === 'hirka') {
    c.fillStyle = K.ic || '#3f6b66'; c.beginPath(); c.moveTo(-44, -690); c.lineTo(44, -690); c.lineTo(30, -380); c.lineTo(-30, -380); c.closePath(); c.fill();
    if (K.icDesen !== 0) { c.fillStyle = 'rgba(240,230,200,.55)'; } else { c.fillStyle = 'rgba(0,0,0,0)'; }
    if (K.icDesen === 0) { c.strokeStyle = 'rgba(170,150,120,.5)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-30, -690); c.quadraticCurveTo(0, -660, 30, -690); c.stroke(); c.fillStyle = 'rgba(200,180,150,.8)'; for (let y = -640; y < -400; y += 55) { c.beginPath(); c.arc(0, y, 3.5, 0, 7); c.fill(); } c.fillStyle = 'rgba(0,0,0,0)'; }
    for (let i = 0; i < 18; i++) { c.beginPath(); c.arc(-26 + (i % 3) * 26 + (Math.floor(i / 3) % 2) * 13, -660 + Math.floor(i / 3) * 48, 3.5, 0, 7); c.fill(); }
    for (const s of [-1, 1]) { c.strokeStyle = renk(K.ust, -.35); c.lineWidth = 4; c.beginPath(); c.moveTo(s * 44, -690); c.lineTo(s * 32, -380); c.stroke(); }
    c.fillStyle = renk(K.ust, .35); for (let y = -640; y < -400; y += 60) { c.beginPath(); c.arc(-40, y, 5, 0, 7); c.fill(); }
    c.strokeStyle = 'rgba(60,40,25,.25)'; c.lineWidth = 2; for (let x = -sw; x < sw; x += 16) { if (Math.abs(x) < 46) continue; c.beginPath(); c.moveTo(x, -640); c.lineTo(x, -390); c.stroke(); }
  }
  // gövde gölgesi (sağ)
  c.fillStyle = 'rgba(30,20,30,.08)'; c.fillRect(sw * .45, -700, sw, 330);
  c.restore();
  if (K.ustTip === 'yagmurluk') {
    const hw = sw - 6;
    c.beginPath(); c.moveTo(-hw, -385); c.lineTo(hw, -385); c.lineTo(hw + 22, -250); c.quadraticCurveTo(0, -238, -hw - 22, -250); c.closePath();
    const g2 = c.createLinearGradient(-hw, 0, hw, 0); g2.addColorStop(0, renk(K.ust, .08)); g2.addColorStop(1, renk(K.ust, -.18)); konturlu(c, g2, 3.5);
    c.strokeStyle = renk(K.ust, -.4); c.lineWidth = 3; c.beginPath(); c.moveTo(4, -385); c.lineTo(8, -244); c.stroke();
    c.fillStyle = 'rgba(220,235,255,.55)'; for (let i = 0; i < 14; i++) { c.beginPath(); c.ellipse(-sw + 20 + hash(i + 70) * (sw * 2 - 40), -660 + hash(i + 90) * 400, 2.5, 4, 0, 0, 7); c.fill(); }
  }
  // gömlek yakası (gövdenin üstünde)
  if (K.ustTip === 'gomlek' || K.ustTip === 'uniforma') {
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 4, -668); c.lineTo(s * 40, -694); c.lineTo(s * 50, -648); c.closePath(); konturlu(c, renk(K.ust, .08), 3); }
  }
}

function bacakCiz(c, K, p, t) {
  const sw = K.omuz, hw = K.kadin ? sw - 6 : sw - 18, yur = p.yuru, otur = p.otur || 0;
  const kalcaY = -380 + otur * 150;
  if (K.altTip === 'etek') {
    for (const s of [-1, 1]) { yd(c, s * 34 - 18, -110, 36, 90, 12); konturlu(c, renk(K.ten, -.05), 3); }
    c.beginPath(); c.moveTo(-hw + 4, kalcaY); c.lineTo(hw - 4, kalcaY); c.quadraticCurveTo(hw + 24, -200, hw + 30, -96); c.quadraticCurveTo(0, -84, -hw - 30, -96); c.quadraticCurveTo(-hw - 24, -200, -hw + 4, kalcaY); c.closePath();
    const g = c.createLinearGradient(-hw, 0, hw, 0); g.addColorStop(0, renk(K.alt, .1)); g.addColorStop(1, renk(K.alt, -.2)); konturlu(c, g, 3.5);
    c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 3; for (const x of [-50, -10, 34]) { c.beginPath(); c.moveTo(x, kalcaY + 40); c.lineTo(x * 1.3, -100); c.stroke(); }
    for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * 36, -14, 32, 15, 0, 0, 7); konturlu(c, K.ayak, 3); }
    return;
  }
  for (const s of [-1, 1]) {
    let kalk = 0, ileri = 0;
    if (yur != null) { const f = Math.sin(yur * Math.PI * 2 + (s > 0 ? 0 : Math.PI)); kalk = Math.max(0, f) * 26; ileri = f * 16 * (p.yon || 1); }
    const ust = s * (hw * .5) - 4 * s, ay = s * 40 + ileri;
    c.beginPath();
    if (otur) {
      const dizY = -300, dizX = s * 52;
      c.moveTo(s * 4, kalcaY); c.lineTo(s * hw, kalcaY); c.quadraticCurveTo(s * (hw + 6), dizY, dizX + s * 32, dizY + 10);
      c.lineTo(ay + s * 26, -28); c.lineTo(ay - s * 26, -28); c.lineTo(dizX - s * 34, dizY + 10); c.closePath();
    } else {
      c.moveTo(s * 4, kalcaY); c.lineTo(s * hw, kalcaY); c.quadraticCurveTo(s * (hw + 4), -200, ay + s * 30, -30 - kalk);
      c.lineTo(ay - s * 24, -30 - kalk); c.quadraticCurveTo(s * 14, -200, s * 4, kalcaY + 40); c.closePath();
    }
    const g = c.createLinearGradient(-hw, 0, hw, 0); g.addColorStop(0, renk(K.alt, .12)); g.addColorStop(1, renk(K.alt, -.18));
    konturlu(c, g, 3.5);
    c.beginPath(); c.ellipse(ay + s * 4, -16 - kalk, 38, 17, 0, 0, 7); konturlu(c, K.ayak, 3);
    c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.ellipse(ay + s * 4 - 8, -22 - kalk, 18, 5, 0, 0, 7); c.fill();
  }
}

// ---------- KOL / EL / NESNE ----------
function el(c, K, x, y, aci, eldiven) {
  c.save(); c.translate(x, y); c.rotate(aci);
  const ten = eldiven ? '#8fb7d9' : K.ten;
  c.beginPath(); c.ellipse(0, 18, 20, 25, 0, 0, 7); konturlu(c, ten, 3);
  c.beginPath(); c.ellipse(-15, 8, 8, 14, -.5, 0, 7); konturlu(c, renk(ten, -.03), 2.5);
  c.restore();
}
function nesne(c, ad, x, y, aci) {
  c.save(); c.translate(x, y); c.rotate(aci);
  if (ad === 'tel') { yd(c, -18, -6, 36, 66, 7); konturlu(c, '#1b1d22', 3); c.fillStyle = 'rgba(140,190,255,.5)'; yd(c, -14, -2, 28, 56, 4); c.fill(); }
  else if (ad === 'telEkran') { yd(c, -22, -40, 44, 84, 8); konturlu(c, '#1b1d22', 3); c.fillStyle = '#9cc7ff'; yd(c, -18, -36, 36, 74, 5); c.fill(); }
  else if (ad === 'anahtar') {
    c.fillStyle = '#b9b2a2'; c.strokeStyle = '#6d675b'; c.lineWidth = 2.5;
    c.beginPath(); c.arc(0, -10, 13, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#ddd'; c.beginPath(); c.arc(0, -13, 4, 0, 7); c.fill();
    c.fillStyle = '#b9b2a2'; c.fillRect(-3.5, 0, 7, 34); c.strokeRect(-3.5, 0, 7, 34); c.fillRect(3, 22, 7, 5); c.fillRect(3, 30, 9, 4);
  } else if (ad === 'torba') {
    c.fillStyle = 'rgba(235,240,245,.55)'; c.strokeStyle = 'rgba(120,130,140,.9)'; c.lineWidth = 3; yd(c, -55, -10, 110, 130, 6); c.fill(); c.stroke();
    c.fillStyle = '#c0392b'; c.fillRect(-55, -10, 110, 12); c.fillStyle = '#fff'; c.fillRect(-40, 80, 80, 26); c.fillStyle = '#333'; c.font = 'bold 12px Nunito'; c.textAlign = 'center'; c.fillText('DELİL', 0, 98);
    saatCiz(c, 0, 40, 26, 1);
  } else if (ad === 'torbaAnahtar' || ad === 'torbaKayit') {
    c.fillStyle = 'rgba(235,240,245,.55)'; c.strokeStyle = 'rgba(120,130,140,.9)'; c.lineWidth = 3; yd(c, -50, -10, 100, 120, 6); c.fill(); c.stroke();
    c.fillStyle = '#c0392b'; c.fillRect(-50, -10, 100, 12);
    if (ad === 'torbaAnahtar') { c.save(); c.translate(0, 50); c.rotate(.5); nesne(c, 'anahtar', 0, -10, 0); c.restore(); }
    else kayitCihazi(c, 0, 52, .55, 0);
  }
  c.restore();
}
// Küçük ses kayıt cihazı — üzerinde "AYLİN" etiketi
function kayitCihazi(c, x, y, s, led) {
  c.save(); c.translate(x, y); c.scale(s, s);
  yd(c, -42, -80, 84, 160, 14); konturlu(c, '#2b2d33', 3);
  c.fillStyle = '#1a1b1f'; yd(c, -32, -70, 64, 44, 8); c.fill();
  c.fillStyle = '#3d4048'; for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) { c.beginPath(); c.arc(-18 + i * 9, -60 + j * 12, 2.6, 0, 7); c.fill(); }
  c.fillStyle = led ? `rgba(255,50,50,${.6 + .4 * led})` : '#5a2020'; c.beginPath(); c.arc(26, -12, 5, 0, 7); c.fill();
  c.fillStyle = '#9aa3ad'; c.beginPath(); c.arc(0, 18, 14, 0, 7); c.fill(); c.fillStyle = '#2b2d33'; c.beginPath(); c.moveTo(-4, 11); c.lineTo(7, 18); c.lineTo(-4, 25); c.fill();
  c.fillStyle = '#f1ead2'; c.fillRect(-34, 44, 68, 26); c.fillStyle = '#222'; c.font = '800 16px Nunito'; c.textAlign = 'center'; c.fillText('AYLİN', 0, 63);
  c.restore();
}
function saatCiz(c, x, y, r, kirik) {
  c.fillStyle = '#5a3d2a'; c.fillRect(x - r * .45, y - r * 2, r * .9, r * 4);
  c.beginPath(); c.arc(x, y, r, 0, 7); c.fillStyle = '#c8c8cc'; c.fill(); c.strokeStyle = '#77777c'; c.lineWidth = r * .14; c.stroke();
  c.beginPath(); c.arc(x, y, r * .8, 0, 7); c.fillStyle = '#f4f1ea'; c.fill();
  c.strokeStyle = '#222'; c.lineWidth = r * .07; c.lineCap = 'round';
  c.beginPath(); c.moveTo(x, y); c.lineTo(x + r * .2, y - r * .5); c.moveTo(x, y); c.lineTo(x + r * .55, y + r * .15); c.stroke();
  if (kirik) { c.strokeStyle = 'rgba(80,80,90,.8)'; c.lineWidth = r * .04; c.beginPath(); c.moveTo(x - r * .7, y - r * .3); c.lineTo(x - r * .1, y + r * .05); c.lineTo(x + r * .3, y - r * .6); c.moveTo(x - r * .1, y + r * .05); c.lineTo(x + r * .1, y + r * .7); c.moveTo(x - r * .1, y + r * .05); c.lineTo(x + r * .7, y + r * .2); c.stroke(); }
}

function kolCiz(c, K, s, hedef, nes, p) {
  const sw = K.omuz, ox = s * (sw - 16), oy = -646;
  const [tx, ty] = hedef;
  // hedef yakınsa kol kameraya doğru kısalır (perspektif) — dirsek doğal yerde kalır
  const d = Math.hypot(tx - ox, ty - oy), kis = clamp(d / (.82 * 328), .5, 1);
  const yukari = ty < oy - 20 ? 1 : 0;
  const [ex, ey, hx, hy] = ik(ox, oy, tx, ty, 168 * kis * (yukari ? .85 : 1), 160 * kis, s > 0 ? 1 : -1);
  const kol = K.ust;
  c.lineCap = 'round'; c.lineJoin = 'round';
  c.strokeStyle = renk(kol, -.4); c.lineWidth = 50; c.beginPath(); c.moveTo(ox, oy); c.lineTo(ex, ey); c.lineTo(hx, hy); c.stroke();
  c.strokeStyle = renk(kol, s < 0 ? .06 : -.06); c.lineWidth = 44; c.beginPath(); c.moveTo(ox, oy); c.lineTo(ex, ey); c.lineTo(hx, hy); c.stroke();
  // manşet
  const a = Math.atan2(hy - ey, hx - ex);
  c.strokeStyle = K.ustTip === 'ceket' ? (K.ic || '#cfdbe8') : renk(kol, -.15); c.lineWidth = 46; c.lineCap = 'butt';
  c.beginPath(); c.moveTo(hx - Math.cos(a) * 14, hy - Math.sin(a) * 14); c.lineTo(hx - Math.cos(a) * 4, hy - Math.sin(a) * 4); c.stroke();
  if (nes && nes !== 'tel' && nes !== 'telEkran') nesne(c, nes, hx + Math.cos(a) * 24, hy + Math.sin(a) * 24, nes === 'torba' ? 0 : a - Math.PI / 2);
  if (p.sargi && s < 0) { // kol sıvanmış: ön kol çıplak, ortasında sargı
    const mx = lerp(ex, hx, .25), my = lerp(ey, hy, .25);
    c.lineCap = 'round'; c.strokeStyle = renk(K.ten, -.35); c.lineWidth = 40; c.beginPath(); c.moveTo(mx, my); c.lineTo(hx, hy); c.stroke();
    c.strokeStyle = K.ten; c.lineWidth = 34; c.beginPath(); c.moveTo(mx, my); c.lineTo(hx, hy); c.stroke();
    const b0x = lerp(ex, hx, .45), b0y = lerp(ey, hy, .45), b1x = lerp(ex, hx, .78), b1y = lerp(ey, hy, .78);
    c.lineCap = 'butt'; c.strokeStyle = '#efece4'; c.lineWidth = 40; c.beginPath(); c.moveTo(b0x, b0y); c.lineTo(b1x, b1y); c.stroke();
    c.strokeStyle = 'rgba(150,140,125,.5)'; c.lineWidth = 2; for (let k = .5; k < .78; k += .06) { const x = lerp(ex, hx, k), y = lerp(ey, hy, k); c.beginPath(); c.moveTo(x - Math.sin(a) * 19, y + Math.cos(a) * 19); c.lineTo(x + Math.sin(a) * 19 + Math.cos(a) * 8, y - Math.cos(a) * 19 + Math.sin(a) * 8); c.stroke(); }
    c.fillStyle = 'rgba(150,40,45,.45)'; c.beginPath(); c.ellipse(lerp(ex, hx, .6), lerp(ey, hy, .6), 9, 6, a, 0, 7); c.fill();
    c.strokeStyle = renk(K.ust, -.1); c.lineWidth = 54; c.lineCap = 'round'; c.beginPath(); c.moveTo(lerp(ex, hx, .2), lerp(ey, hy, .2)); c.lineTo(lerp(ex, hx, .27), lerp(ey, hy, .27)); c.stroke();
  }
  el(c, K, hx, hy, a - Math.PI / 2, p.eldiven);
  if (nes === 'tel') nesne(c, 'tel', hx + 8 * s, hy - 6, s * .25);
  if (nes === 'telEkran') nesne(c, 'telEkran', hx - s * 12, hy - 20, 0);
}

// Hazır kol hedefleri (karakter birimleri)
const KOL = {
  asagi: s => [s * 150, -330], yan: s => [s * 175, -360], gogus: s => [s * 28, -560], kulak: s => [s * 128, -812],
  agiz: s => [s * 18, -742], tut: s => [s * 70, -500], ekran: s => [s * 40, -610], sargi: s => [s * 215, -540], isaret: s => [s * 300, -640],
  yukari: s => [s * 92, -760], bel: s => [s * 150, -440], ac: s => [s * 230, -470], uzat: s => [s * 120, -560],
};
function kolHedef(v, s) { return typeof v === 'string' ? KOL[v](s) : v; }

// ---------- ANA ÇİZİM ----------
// p: {x,y,s, don, egik, duygu, duygu2, dk, kar, sag, sol, sagN, solN, yuru, yon, otur, arka, gozyasi, bak, eldiven}
function kisiCiz(c, ad, p, t) {
  const K = KARAKTER[ad];
  p = Object.assign({ don: 0, egik: 0, duygu: 'notr', sag: 'asagi', sol: 'asagi' }, p);
  p.D = karisDuygu(p.duygu, p.duygu2 || p.duygu, p.dk || 0);
  const A = agizDurum(ad, t); p.agiz = p.agizKapali ? { ac: 0, yu: 0 } : A;
  p.kirp = p.uyku ? 1 : goz_kirp(K.seed, t);
  const sc = (p.s || 1) * K.boy;
  const nefes = Math.sin(t * 2.1 + K.seed) * .006 * (p.duygu === 'korku' ? 2.2 : 1);
  const bob = p.yuru != null ? Math.abs(Math.sin(p.yuru * Math.PI * 2)) * -10 : 0;
  const titre = (p.titre || 0) * gurultu(t * 18, K.seed) * 2.5;
  c.save(); c.translate(p.x + titre, p.y); c.scale(sc, sc);
  // zemin gölgesi
  c.fillStyle = 'rgba(30,20,20,.22)'; c.beginPath(); c.ellipse(0, -4, 150, 26, 0, 0, 7); c.fill();
  c.translate(0, bob);
  bacakCiz(c, K, p, t);
  c.translate(0, (p.otur || 0) * 150);
  c.save(); c.translate(0, -380); c.scale(1, 1 + nefes); c.translate(0, 380);
  const basDon = p.don + (A.konus ? gurultu(t * 2.2, K.seed + 9) * .05 : 0);
  const basEg = p.egik + gurultu(t * .7, K.seed) * .025 + A.ac * .02;
  const sagH = kolHedef(p.sag, 1), solH = kolHedef(p.sol, -1);
  const kolSonra = h => h[1] < -690;
  if (p.arka) {
    govdeCiz(c, Object.assign({}, K, { ustTip: 'duz' }), p, t);
    for (const s of [-1, 1]) kolCiz(c, K, s, KOL.asagi(s), null, p);
    c.save(); c.translate(0, -835); c.rotate(basEg); c.translate(0, 835);
    sacArka(c, K, p, t);
    yuzYolu(c, K.yuz); c.fillStyle = renk(K.ten, -.05); c.fill();
    if (K.sacTip !== 'aylin') sacOn(c, K, Object.assign({}, p, { don: 0 }), t);
    // arkadan saç kütlesi
    c.beginPath();
    if (K.sacTip === 'sevda') { sacArka(c, K, p, t); }
    else if (K.sacTip === 'aylin') { c.moveTo(-128, -850); c.bezierCurveTo(-140, -1005, 140, -1005, 128, -850); c.bezierCurveTo(146, -760, 150, -690, 140, -650); c.quadraticCurveTo(0, -630, -140, -650); c.bezierCurveTo(-150, -690, -146, -760, -128, -850); konturlu(c, K.sac, 3, -.5); }
    else if (K.sacTip === 'zehra') { c.moveTo(-150, -850); c.bezierCurveTo(-160, -1020, 160, -1020, 150, -850); c.bezierCurveTo(152, -760, 175, -690, 185, -612); c.quadraticCurveTo(0, -585, -185, -612); c.bezierCurveTo(-175, -690, -152, -760, -150, -850); konturlu(c, K.sac, 3, -.3); }
    else { c.moveTo(-124, -800); c.bezierCurveTo(-136, -940, -86, -1004, 0, -1004); c.bezierCurveTo(86, -1004, 136, -940, 124, -800); c.quadraticCurveTo(0, -760, -124, -800); konturlu(c, K.sacTip === 'murat' ? '#77797e' : K.sac, 3, -.3); }
    c.restore(); c.restore(); c.restore(); return;
  }
  sacArka(c, K, p, t);
  govdeCiz(c, K, p, t);
  if (!kolSonra(solH)) kolCiz(c, K, -1, solH, p.solN, p);
  if (!kolSonra(sagH)) kolCiz(c, K, 1, sagH, p.sagN, p);
  c.save(); c.translate(p.don * 8, -835); c.rotate(basEg); c.translate(0, 835);
  yuzCiz(c, K, Object.assign({}, p, { don: basDon }), t);
  sacOn(c, K, Object.assign({}, p, { don: basDon }), t);
  c.restore();
  if (kolSonra(solH)) kolCiz(c, K, -1, solH, p.solN, p);
  if (kolSonra(sagH)) kolCiz(c, K, 1, sagH, p.sagN, p);
  c.restore(); c.restore();
}
