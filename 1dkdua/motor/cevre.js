// 1dkdua — çevre ve dekor kütüphanesi (dünya koordinatlarında çizer; katman() içinde çağrılır)
'use strict';

function gokyuzu(duraklar) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = dGrad(0, 0, 0, H, duraklar); X.fillRect(0, 0, W, H); X.restore(); }

function gunes(x, y, r, c = '#FFF1C9', hale = '#FFD99A', guc = 1) {
  parilti(x, y, r * 9, hale, .35 * guc); parilti(x, y, r * 3.2, hale, .55 * guc);
  daire(x, y, r); X.fillStyle = rGrad(x - r * .2, y - r * .2, 0, r * 1.1, [[0, '#FFFBEA'], [1, c]]); X.fill();
}
function ay(x, y, r, guc = 1) {
  parilti(x, y, r * 7, '#9FB6D8', .28 * guc); parilti(x, y, r * 2.6, '#E9E2C6', .35 * guc);
  for (const [k, a] of [[1.7, .07], [2.5, .045], [3.4, .03]]) { daire(x, y, r * k); X.fillStyle = rgb('#DCE3EE', a * guc); X.fill(); }
  daire(x, y, r); X.fillStyle = rGrad(x - r * .3, y - r * .3, 0, r * 1.1, [[0, '#FFFBEC'], [1, P.ay]]); X.fill();
  X.save(); daire(x, y, r); X.clip();
  for (const [dx, dy, rr] of [[-.3, -.15, .22], [.25, .2, .16], [.05, -.4, .1], [-.1, .35, .12]]) { daire(x + dx * r, y + dy * r, rr * r); X.fillStyle = 'rgba(190,180,150,.22)'; X.fill(); }
  X.restore();
}
function bulut(x, y, w, seed, renk = '#FFF6E4', al = .85, golge = '#E8CFA8') {
  const r = rng(seed); const n = 5 + (r() * 3 | 0);
  X.save(); X.globalAlpha = al;
  for (let k = 0; k < 2; k++) {
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1) - .5, bx = x + u * w * .8 + (r() - .5) * w * .1, by = y - Math.cos(u * Math.PI) * w * .1 - r() * w * .05;
      const rx = w * (.16 + r() * .1), ry = rx * (.55 + r() * .2);
      elips(bx + (k ? 0 : w * .02), by + (k ? 0 : w * .035), rx, ry); doldur(k ? renk : golge, k ? 1 : .8);
    }
  }
  X.fillStyle = rgb(golge, .6); X.fillRect(x - w * .45, y + w * .02, w * .9, w * .025);
  X.restore();
}
// tepe sırtı: x0..x1 arası, taban yb, genlik amp, dalga boyu dl
function tepe(x0, x1, yb, amp, dl, seed, renk, alt = H * 2) {
  X.beginPath(); X.moveTo(x0, alt);
  for (let x = x0; x <= x1 + 20; x += 20) X.lineTo(x, yb - (vnoise(x / dl, seed) * .7 + vnoise(x / dl * 2.3, seed + 9) * .3 + .6) * amp);
  X.lineTo(x1, alt); X.closePath(); X.fillStyle = typeof renk === 'string' && renk[0] !== '#' ? renk : rgb(renk); X.fill();
}
function tepeY(x, yb, amp, dl, seed) { return yb - (vnoise(x / dl, seed) * .7 + vnoise(x / dl * 2.3, seed + 9) * .3 + .6) * amp; }

// Zeytin ağacı: boğumlu gövde + gri-yeşil yaprak kümeleri, rüzgârda salınır
function zeytinAgaci(x, y, s, t, seed = 1, isik = 1, renkler) {
  const R = renkler || { govde: '#6B4F3A', govdeK: '#4A3527', y1: '#7F8E5F', y2: '#97A673', y3: '#B4BE8E', yK: '#5E6B45' };
  const r = rng(seed);
  X.save(); X.translate(x, y); X.scale(s, s);
  const ru = sal(t * .8, seed) * .015;
  // gövde
  X.beginPath(); X.moveTo(-.18, 0); X.bezierCurveTo(-.12, -.3, -.28, -.5, -.1, -.8); X.bezierCurveTo(.0, -.95, -.15, -1.05, -.05, -1.2);
  X.lineTo(.12, -1.18); X.bezierCurveTo(.1, -1.0, .22, -.85, .12, -.6); X.bezierCurveTo(.05, -.4, .2, -.2, .22, 0); X.closePath();
  X.fillStyle = dGrad(-.2, 0, .2, 0, [[0, R.govdeK], [.6, R.govde], [1, R.govdeK]]); X.fill();
  X.beginPath(); X.moveTo(-.05, -.25); X.quadraticCurveTo(.05, -.5, -.02, -.75); cizgi(R.govdeK, .02, .7);
  // dallar
  const dallar = [[-.05, -1.15, -.55, -1.55], [.05, -1.15, .5, -1.6], [0, -1.2, .05, -1.9], [-.08, -.95, -.5, -1.2], [.1, -.9, .45, -1.15]];
  for (const [a, b, c, d] of dallar) { X.beginPath(); X.moveTo(a, b); X.quadraticCurveTo((a + c) / 2 + .05, (b + d) / 2 + .05, c + ru * 2, d); cizgi(R.govde, .06); }
  // yaprak kümeleri: dal uçlarında ayrık kümeler (arada gökyüzü görünür); her küme koyu alt, orta, ışıklı üst ve kenarda yaprak izleri
  const kume = [];
  for (let i = 0; i < 11; i++) { const a = Math.PI * (.06 + .88 * i / 10), rad = .78 + r() * .22; kume.push([-Math.cos(a) * .95 * rad, -1.42 - Math.sin(a) * .62 * rad - r() * .08, .19 + r() * .1]); }
  for (let i = 0; i < 5; i++) kume.push([(r() - .5) * 1.0, -1.5 - r() * .3, .2 + r() * .08]);
  kume.sort((a, b) => a[1] - b[1]);
  for (let i = 0; i < kume.length; i++) {
    const [kx0, ky, kr] = kume[i]; const kx = kx0 + ru * (2.2 - ky) + sal(t * (1.05 + i * .04), seed + i) * .02;
    leke(kx, ky + .05, kr, kr * .72, seed * 50 + i * 3, 9, .22); doldur(R.yK);
    leke(kx - .01, ky - .01, kr * .93, kr * .62, seed * 50 + i * 3 + 1, 9, .2); doldur(R.y1);
    leke(kx + .05, ky - .07, kr * .58, kr * .34, seed * 50 + i * 3 + 2, 8, .25); doldur(R.y2, .95);
    if (isik > 0) { leke(kx + .08, ky - .1, kr * .3, kr * .15, seed * 50 + i * 3 + 3, 7, .3); doldur(R.y3, .65 * isik); }
    for (let j = 0; j < 14; j++) {
      const a = hash(seed * 999 + i * 31 + j) * TAU, rr = kr * (.8 + hash(seed * 77 + i * 13 + j) * .3);
      const lx = kx + Math.cos(a) * rr, ly = ky + Math.sin(a) * rr * .68;
      elips(lx, ly, .055, .02, a + Math.PI / 2 + .4); doldur(j % 3 === 0 ? R.y3 : j % 3 === 1 ? R.y1 : R.yK, j % 3 === 0 ? .7 * Math.max(.3, isik) : .95);
    }
  }
  X.restore();
}
function selvi(x, y, h, t, seed = 0, renk = '#4F5C34', renkA = '#6E7B47') {
  const s = sal(t * .9, seed) * h * .012;
  X.save(); X.translate(x, y);
  X.beginPath(); X.moveTo(-h * .07, 0); X.bezierCurveTo(-h * .13, -h * .4, -h * .1, -h * .75, s, -h);
  X.bezierCurveTo(h * .1 + s * .5, -h * .75, h * .13, -h * .4, h * .07, 0); X.closePath(); doldur(renk);
  X.beginPath(); X.moveTo(h * .01, -h * .05); X.bezierCurveTo(h * .1, -h * .4, h * .07, -h * .72, s * .9, -h * .96); X.bezierCurveTo(h * .03, -h * .6, h * .05, -h * .3, h * .01, -h * .05); doldur(renkA, .8);
  X.restore();
}
// Çimen: rüzgârda eğilen ince sapsar
function cimen(x0, x1, y, yuk, yog, t, seed, renk, al = 1, ruzgar = 1) {
  const r = rng(seed); X.save(); X.strokeStyle = rgb(renk, al); X.lineCap = 'round';
  const n = Math.floor((x1 - x0) / yog);
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0), h = yuk * (.5 + r() * .7), e = (sal(t * 1.4 + x * .01, seed) * .5 + .6) * h * .35 * ruzgar;
    X.lineWidth = 1.2 + r() * 1.8; X.beginPath(); X.moveTo(x, y + r() * 6); X.quadraticCurveTo(x + e * .3, y - h * .6, x + e, y - h); X.stroke();
  }
  X.restore();
}
function koyun(x, y, s, t, seed) {
  const r = rng(seed); const otla = (Math.sin(t * .8 + seed) + 1) / 2; X.save(); X.translate(x, y); X.scale(s * (r() < .5 ? -1 : 1), s);
  for (const lx of [-.35, -.15, .2, .38]) { X.fillStyle = '#4A3A30'; X.fillRect(lx - .04, -.25, .08, .28); }
  leke(0, -.48, .55, .32, seed, 9, .12); doldur('#F1EADB'); leke(.05, -.55, .4, .2, seed + 1, 8, .15); doldur('#FFFBF2', .9);
  X.save(); X.translate(.5, -.55 + otla * .25); X.rotate(otla * .6); elips(.12, 0, .17, .11); doldur('#4A3A30'); X.restore();
  X.restore();
}
function kus(x, y, s, t, seed, renk = '#5A4A3E') {
  const k = Math.sin(t * 9 + seed * 3); X.save(); X.translate(x, y); X.scale(s, s);
  X.beginPath(); X.moveTo(-1, -k * .55); X.quadraticCurveTo(-.45, -.35 - k * .2, 0, 0); X.quadraticCurveTo(.45, -.35 - k * .2, 1, -k * .55);
  cizgi(renk, .22); X.restore();
}
function karga(x, y, s, t, seed, gagala = 0) {
  X.save(); X.translate(x, y); X.scale(s, s);
  const hop = Math.max(0, Math.sin(t * 2.2 + seed)) ** 8 * .25;
  X.translate(0, -hop);
  X.fillStyle = '#211C1E';
  X.beginPath(); X.moveTo(-.9, -.55); X.quadraticCurveTo(-.4, -1.05, .35, -.8); X.quadraticCurveTo(.55, -.5, .3, -.3); X.quadraticCurveTo(-.3, -.25, -.9, -.55); X.fill();
  X.beginPath(); X.moveTo(-.85, -.55); X.lineTo(-1.35, -.4); X.lineTo(-1.25, -.62); X.closePath(); X.fill();
  X.save(); X.translate(.4, -.85); X.rotate(gagala * .9);
  daire(0, 0, .22); X.fill(); X.beginPath(); X.moveTo(.15, -.08); X.lineTo(.55, .04); X.lineTo(.15, .1); X.closePath(); X.fillStyle = '#3A3236'; X.fill();
  daire(.06, -.05, .035); X.fillStyle = '#C9B98A'; X.fill(); X.restore();
  X.strokeStyle = '#2E2624'; X.lineWidth = .06; X.beginPath(); X.moveTo(-.1, -.3); X.lineTo(-.15, hop); X.moveTo(.1, -.3); X.lineTo(.12, hop); X.stroke();
  X.restore();
}

// Uzak kasaba evi / kubbe
function evKucuk(x, y, w, h, duvar = '#EADBBE', cati = '#B9653F', pencere = 1) {
  X.fillStyle = rgb(duvar); X.fillRect(x - w / 2, y - h, w, h);
  X.fillStyle = rgb(koyu(duvar, .15)); X.fillRect(x + w * .2, y - h, w * .3, h);
  cokgen([[x - w / 2 - w * .08, y - h], [x, y - h - w * .32], [x + w / 2 + w * .08, y - h]]); doldur(cati);
  if (pencere) { X.fillStyle = 'rgba(60,40,30,.55)'; X.fillRect(x - w * .25, y - h * .65, w * .14, h * .22); X.fillRect(x + w * .05, y - h * .65, w * .14, h * .22); }
}
function kubbe(x, y, r, renk = '#E3D3B3') {
  X.fillStyle = rgb(renk); X.fillRect(x - r, y - r * .7, r * 2, r * .7);
  X.beginPath(); X.arc(x, y - r * .7, r * .85, Math.PI, 0); X.closePath(); X.fillStyle = rgb(mix(renk, '#8FA0A0', .35)); X.fill();
  X.fillStyle = rgb(P.altin); X.fillRect(x - 1.5, y - r * 1.75, 3, r * .25);
}

// Osmanlı konağı. d: 0 (yeni) .. 1 (harabe). Orijin: zemin orta. Ölçek: s (1 = ~ 700px genişlik)
function konak(x, y, s, d, t, isik = 1, kapi = 0) {
  const r = rng(77);
  X.save(); X.translate(x, y); X.scale(s, s);
  const sol = mix('#F2E7D0', '#B8AE9C', d * .9), ahsap = mix('#6E4A2E', '#4A4038', d), tas = mix('#CDBB9C', '#9C9384', d), kir = mix('#B9653F', '#7E6A5C', d * .8);
  const sat = 1 - d * .6;
  // zemin kat (taş)
  X.fillStyle = rgb(tas); X.fillRect(-330, -230, 660, 230);
  X.save(); X.beginPath(); X.rect(-330, -230, 660, 230); X.clip();
  X.strokeStyle = rgb(koyu(tas, .25), .5); X.lineWidth = 2;
  for (let yy = -230; yy < 0; yy += 34) { X.beginPath(); X.moveTo(-330, yy); X.lineTo(330, yy); X.stroke(); for (let xx = -330 + ((yy / 34) % 2 ? 0 : 30); xx < 330; xx += 62) { X.beginPath(); X.moveTo(xx, yy); X.lineTo(xx, yy + 34); X.stroke(); } }
  X.restore();
  // kapı (kemerli)
  X.beginPath(); X.moveTo(-55, 0); X.lineTo(-55, -130); X.arc(0, -130, 55, Math.PI, 0); X.lineTo(55, 0); X.closePath(); doldur(koyu(tas, .35));
  X.beginPath(); X.moveTo(-46, 0); X.lineTo(-46, -128); X.arc(0, -128, 46, Math.PI, 0); X.lineTo(46, 0); X.closePath();
  if (kapi > 0) { doldur('#22180F'); X.save(); X.clip(); X.fillStyle = rgb(mix('#7A4E2E', '#3C3430', d)); X.fillRect(-46, -180, 46 * (1 - kapi * .85), 180); X.fillRect(46 - 46 * (1 - kapi * .85), -180, 46 * (1 - kapi * .85), 180); X.restore(); }
  else { doldur(mix('#7A4E2E', '#3C3430', d)); X.beginPath(); X.moveTo(0, -172); X.lineTo(0, 0); cizgi(koyu(ahsap, .3), 3, .8); }
  daire(-14, -70, 4); doldur(P.altinK); daire(14, -70, 4); doldur(P.altinK);
  // zemin pencereleri
  for (const px of [-230, 230]) { X.fillStyle = rgb(koyu(tas, .3)); X.fillRect(px - 38, -170, 76, 96); X.fillStyle = rgb(mix('#3E3A3A', '#1E1A1A', d)); X.fillRect(px - 30, -162, 60, 80); X.strokeStyle = rgb(ahsap); X.lineWidth = 4; X.strokeRect(px - 30, -162, 60, 80); X.beginPath(); X.moveTo(px, -162); X.lineTo(px, -82); X.moveTo(px - 30, -122); X.lineTo(px + 30, -122); X.stroke(); }
  // üst kat (sıva + ahşap çatkı) ve cumba
  X.fillStyle = rgb(sol); X.fillRect(-350, -470, 700, 240);
  X.fillStyle = rgb(ahsap); X.fillRect(-356, -240, 712, 14); X.fillRect(-356, -476, 712, 12);
  for (const px of [-350, -120, 120, 344]) X.fillRect(px, -470, 8, 240);
  // cumba (çıkma) ve payandalar
  X.fillStyle = rgb(mix('#F6EDD9', '#B3A996', d * .9)); X.fillRect(-150, -500, 300, 285);
  X.fillStyle = rgb(ahsap); X.fillRect(-156, -230, 312, 16); X.fillRect(-156, -506, 312, 12);
  for (const px of [-140, -60, 40, 120]) { cokgen([[px, -214], [px + 20, -214], [px + 20, -180], [px + 6, -160]]); doldur(ahsap); }
  // pencereler (cumba 3, yanlar 2'şer)
  const pencereler = [[-100, -440, 70, 150], [0, -440, 70, 150], [100, -440, 70, 150], [-270, -430, 80, 140], [-195, -430, 0, 0], [240, -430, 80, 140]];
  for (const [px, py, pw, ph] of pencereler) {
    if (!pw) continue;
    X.fillStyle = rgb(ahsap); X.fillRect(px - pw / 2 - 6, py - 6, pw + 12, ph + 12);
    X.fillStyle = rgb(mix(mix('#F6D9A0', '#9FB6B8', .3), '#2A2626', d)); X.fillRect(px - pw / 2, py, pw, ph);
    X.strokeStyle = rgb(ahsap); X.lineWidth = 4; X.beginPath(); X.moveTo(px, py); X.lineTo(px, py + ph); X.moveTo(px - pw / 2, py + ph * .45); X.lineTo(px + pw / 2, py + ph * .45); X.stroke();
    if (d < .5) { X.fillStyle = rgb('#FFF4D8', .35 * isik * (1 - d * 2)); X.fillRect(px - pw / 2 + 4, py + 4, pw * .35, ph * .4); }
    // kepenkler
    const kk = d > .55 ? (d - .55) * 1.4 : 0;
    X.save(); X.translate(px - pw / 2 - 8, py); X.rotate(kk * .5); X.fillStyle = rgb(mix('#7C8A4E', '#5A5446', d)); X.fillRect(-pw * .42, 0, pw * .42, ph); X.restore();
    if (d < .85) { X.fillStyle = rgb(mix('#7C8A4E', '#5A5446', d)); X.fillRect(px + pw / 2 + 8, py, pw * .42, ph); }
    // saksıda sardunya
    if (py > -440 && d < .6) { X.fillStyle = rgb(P.kiremit); X.fillRect(px - 24, py + ph + 6, 48, 22); for (let i = 0; i < 6; i++) { daire(px - 20 + i * 8, py + ph + 2 - (i % 2) * 6, 8); doldur(mix('#C8443A', '#7A5A4A', d * 1.6)); } }
  }
  // çatı (geniş saçak, kiremit)
  const cokme = sm(.55, 1, d);
  X.beginPath(); X.moveTo(-420, -470); X.lineTo(-250, -600 + cokme * 60); X.lineTo(250, -600); X.lineTo(420, -470); X.closePath(); doldur(kir);
  X.save(); X.clip(); X.strokeStyle = rgb(koyu(kir, .25), .6); X.lineWidth = 3;
  for (let yy = -600; yy < -470; yy += 16) { X.beginPath(); X.moveTo(-430, yy); X.lineTo(430, yy); X.stroke(); }
  for (let xx = -420; xx < 420; xx += 22) { X.beginPath(); X.moveTo(xx, -600); X.lineTo(xx * 1.08, -470); X.stroke(); }
  X.restore();
  X.fillStyle = rgb(koyu(kir, .35)); X.fillRect(-424, -474, 848, 10);
  X.fillStyle = rgb(mix('#A9876A', '#6E625A', d)); X.fillRect(150, -660 + cokme * 20, 34, 70);
  // harabe ayrıntıları
  if (d > 0) {
    X.save();
    // lekeler ve dökülen sıva
    for (let i = 0; i < 14; i++) { const lx = -330 + r() * 660, ly = -460 + r() * 220, a = sm(i / 14 * .7, i / 14 * .7 + .3, d); if (a > 0) { leke(lx, ly, 20 + r() * 40, 12 + r() * 25, 300 + i, 8, .35); doldur(mix('#9A8A72', '#6C5E4E', r()), .55 * a); } }
    // çatlaklar
    X.strokeStyle = rgb('#3A2E26', .8); X.lineWidth = 2.5; X.lineCap = 'round';
    for (let i = 0; i < 7; i++) {
      const a = sm(.1 + i * .08, .3 + i * .08, d); if (a <= 0) continue;
      let cx = -300 + r() * 600, cy = -470 + r() * 100; X.beginPath(); X.moveTo(cx, cy);
      const n = Math.ceil(6 * a); for (let k = 0; k < n; k++) { cx += (r() - .5) * 50; cy += 20 + r() * 25; X.lineTo(cx, cy); }
      X.stroke();
    }
    // çatıda delikler
    const dk = sm(.5, .9, d);
    if (dk > 0) for (let i = 0; i < 5; i++) { leke(-250 + i * 120 + r() * 40, -560 + r() * 60, 40 * dk, 22 * dk, 400 + i, 7, .4); doldur('#2B2522', .9); }
    // sarmaşık
    const sv = sm(.35, 1, d);
    if (sv > 0) {
      for (const [sx, yon] of [[-330, 1], [330, -1], [-150, 1]]) {
        X.strokeStyle = rgb('#4E4A2A', .9); X.lineWidth = 4; X.beginPath(); X.moveTo(sx, 0);
        let px = sx, py = 0; const L = 520 * sv;
        for (let k = 0; k < L; k += 26) { px += Math.sin(k * .05 + sx) * 14 * yon; py -= 26; X.lineTo(px, py); }
        X.stroke();
        for (let k = 0; k < L; k += 22) { const yy = -k, xx = sx + Math.sin(k * .05 + sx) * 18 * yon; leke(xx + (hash(k + sx) - .5) * 30, yy, 16, 11, k + sx * 3, 6, .3); doldur(hash(k * 3 + sx) < .5 ? '#5F6B3A' : '#77824A', .95); }
      }
    }
    X.restore();
  }
  X.restore();
}

// Sütun (yivli, başlıklı). kirik: 0 = tam, >0 = üst kısmı kırık oranı
function sutun(x, y, h, w, kirik, renk = '#D8C29C', seed = 0) {
  const k = renk, kk = koyu(renk, .3), ka = acik(renk, .25);
  const hh = h * (1 - kirik);
  X.fillStyle = rgb(koyu(renk, .1)); X.fillRect(x - w * .75, y - h * .06, w * 1.5, h * .06); // kaide
  X.fillStyle = dGrad(x - w / 2, 0, x + w / 2, 0, [[0, kk], [.35, ka], [.7, k], [1, kk]]);
  if (kirik > 0) {
    X.beginPath(); X.moveTo(x - w / 2, y - h * .06); X.lineTo(x - w / 2, y - hh); for (let i = 0; i <= 6; i++) X.lineTo(x - w / 2 + w * i / 6, y - hh - (hash(seed * 13 + i) - .3) * w * .5); X.lineTo(x + w / 2, y - h * .06); X.closePath(); X.fill();
  } else {
    X.fillRect(x - w / 2, y - h, w, h * .94);
    X.fillStyle = rgb(koyu(renk, .05)); X.fillRect(x - w * .8, y - h - h * .05, w * 1.6, h * .05);
    X.fillStyle = rgb(ka); X.fillRect(x - w * .7, y - h - h * .08, w * 1.4, h * .03);
  }
  X.strokeStyle = rgb(kk, .45); X.lineWidth = Math.max(1, w * .04);
  for (let i = 1; i < 5; i++) { const xx = x - w / 2 + w * i / 5; X.beginPath(); X.moveTo(xx, y - h * .07); X.lineTo(xx, y - hh + w * .3); X.stroke(); }
}

// Halı / kilim (perspektifsiz düz şerit)
function hali(x, y, w, h, seed, renk1 = '#8E3B2C', renk2 = '#D4A84B', renk3 = '#4E5A28', zemin = '#B5583C') {
  X.save(); X.fillStyle = rgb(zemin); X.fillRect(x, y, w, h);
  X.strokeStyle = rgb(renk2, .9); X.lineWidth = h * .04; X.strokeRect(x + h * .06, y + h * .06, w - h * .12, h - h * .12);
  X.fillStyle = rgb(renk1); X.fillRect(x + h * .12, y + h * .12, w - h * .24, h - h * .24);
  const n = Math.max(3, Math.floor(w / (h * .7)));
  for (let i = 0; i < n; i++) {
    const cx = x + w * (i + .5) / n, cy = y + h / 2, rr = h * .26;
    cokgen([[cx, cy - rr], [cx + rr, cy], [cx, cy + rr], [cx - rr, cy]]); doldur(i % 2 ? renk3 : renk2);
    cokgen([[cx, cy - rr * .45], [cx + rr * .45, cy], [cx, cy + rr * .45], [cx - rr * .45, cy]]); doldur(zemin);
  }
  X.restore();
}

function kandil(x, y, s, t, zincir = 300) {
  X.save(); X.translate(x, y); X.scale(s, s);
  const sw = sal(t * .7, 3) * .02; X.rotate(sw);
  X.strokeStyle = 'rgba(70,55,40,.9)'; X.lineWidth = .025; X.beginPath(); X.moveTo(0, -zincir / 100); X.lineTo(0, -.3); X.moveTo(0, -.3); X.lineTo(-.3, .1); X.moveTo(0, -.3); X.lineTo(.3, .1); X.stroke();
  // cam gövde
  X.beginPath(); X.moveTo(-.32, .1); X.quadraticCurveTo(-.42, .55, -.12, .72); X.lineTo(.12, .72); X.quadraticCurveTo(.42, .55, .32, .1); X.closePath();
  X.fillStyle = rGrad(0, .45, 0, .5, [[0, '#FFE7A8', .95], [.6, '#E3A64C', .7], [1, '#9C6A2E', .6]]); X.fill();
  X.strokeStyle = rgb(P.altinK); X.lineWidth = .03; X.stroke();
  // alev
  const al = 1 + sal(t * 2.3, 7) * .06;
  X.beginPath(); X.moveTo(0, .58); X.quadraticCurveTo(.07 * al, .48, 0, .32 - .04 * al); X.quadraticCurveTo(-.07 * al, .48, 0, .58); doldur('#FFF6D6');
  X.restore();
}

function sandik(x, y, s, dolu, t) { // dolu: 1 = altın dolu, 0 = boş
  X.save(); X.translate(x, y); X.scale(s, s);
  // kapak (açık, arkada)
  cokgen([[-1.05, -1.0], [1.05, -1.0], [.95, -2.0], [-.95, -2.0]]); doldur('#5C3A22');
  X.fillStyle = rgb('#7A4E2E'); X.fillRect(-.9, -1.9, 1.8, .82);
  X.fillStyle = rgb('#3E3A36'); X.fillRect(-1.0, -1.55, 2.0, .1);
  // altın yığını
  if (dolu > 0) {
    const r = rng(5);
    X.save(); X.beginPath(); X.rect(-1.2, -2.2, 2.4, 1.3); X.clip();
    const h = .55 * dolu;
    X.beginPath(); X.moveTo(-.95, -.95); X.quadraticCurveTo(-.4, -.95 - h * 1.4, 0, -.95 - h * 1.5); X.quadraticCurveTo(.5, -.95 - h * 1.3, .95, -.95); X.closePath(); X.fillStyle = dGrad(0, -.95 - h * 1.5, 0, -.9, [[0, '#F4D48A'], [1, '#B98A33']]); X.fill();
    for (let i = 0; i < 40; i++) { const u = r() * 2 - 1, cy = -.95 - (1 - u * u) * h * 1.4 * r(); if (r() > dolu * 1.1) continue; elips(u * .9, cy, .09, .045); doldur(r() < .5 ? '#F7DE9A' : '#D9AB4B'); }
    // inci kolye ve kadeh
    if (dolu > .4) { X.strokeStyle = 'rgba(250,245,235,.95)'; X.setLineDash([.001, .07]); X.lineWidth = .06; X.lineCap = 'round'; X.beginPath(); X.moveTo(-.7, -1.05); X.quadraticCurveTo(-.2, -.75 - h, .3, -1.1); X.stroke(); X.setLineDash([]); }
    X.restore();
    parilti(0, -1.3, 1.4, '#FFD98A', .35 * dolu);
  }
  // gövde
  X.fillStyle = dGrad(0, -1.0, 0, 0, [[0, '#8A5A34'], [1, '#5E3B22']]); X.fillRect(-1.05, -1.0, 2.1, 1.0);
  X.fillStyle = rgb('#3E3A36'); X.fillRect(-1.05, -.98, 2.1, .1); X.fillRect(-.75, -1.0, .1, 1.0); X.fillRect(.65, -1.0, .1, 1.0);
  X.fillStyle = rgb(P.altinK); X.fillRect(-.1, -.8, .2, .25);
  X.restore();
}

function kemer(x, y, s, t, sarmasik = 1, renk = '#C9B89A') {
  X.save(); X.translate(x, y); X.scale(s, s);
  const kk = koyu(renk, .3), ka = acik(renk, .2);
  // ayaklar
  for (const sx of [-1, 1]) {
    X.fillStyle = dGrad(sx * 1.1, 0, sx * .7, 0, [[0, kk], [1, renk]]); X.fillRect(sx > 0 ? .7 : -1.1, -2.6, .4, 2.6);
    X.strokeStyle = rgb(kk, .5); X.lineWidth = .02; for (let yy = -2.6; yy < 0; yy += .32) { X.beginPath(); X.moveTo(sx > 0 ? .7 : -1.1, yy); X.lineTo(sx > 0 ? 1.1 : -.7, yy); X.stroke(); }
  }
  // kemer
  X.beginPath(); X.arc(0, -2.6, 1.1, Math.PI, 0); X.arc(0, -2.6, .7, 0, Math.PI, true); X.closePath(); X.fillStyle = dGrad(0, -3.7, 0, -2.6, [[0, ka], [1, renk]]); X.fill();
  X.strokeStyle = rgb(kk, .55); X.lineWidth = .02;
  for (let i = 0; i <= 9; i++) { const a = Math.PI + Math.PI * i / 9; X.beginPath(); X.moveTo(Math.cos(a) * .7, -2.6 + Math.sin(a) * .7); X.lineTo(Math.cos(a) * 1.1, -2.6 + Math.sin(a) * 1.1); X.stroke(); }
  X.fillStyle = rgb(koyu(renk, .1)); X.fillRect(-1.25, -3.82, 2.5, .14);
  // sarmaşık
  if (sarmasik > 0) {
    const r = rng(9);
    for (let i = 0; i < 26; i++) { const a = Math.PI + r() * Math.PI * .55, rr = .9 + r() * .25; leke(Math.cos(a) * rr + sal(t * 1.3, i) * .01, -2.6 + Math.sin(a) * rr, .1, .07, i + 900, 6, .3); doldur(r() < .5 ? '#5E6B3A' : '#7A8650', .95 * sarmasik); }
    for (let i = 0; i < 14; i++) { leke(-1.05 + r() * .4, -2.4 + r() * 2.2, .09, .06, i + 950, 6, .3); doldur(r() < .5 ? '#5E6B3A' : '#7A8650', .9 * sarmasik); }
  }
  X.restore();
}

function yildizlar(n, seed, t, x0 = 0, y0 = 0, w = W, h = H * .6, al = 1) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * w, y = y0 + Math.pow(r(), 1.3) * h, b = r(), tw = .85 + Math.sin(t * (.6 + r() * .8) + i) * .15;
    const rr = .7 + b * 1.6;
    X.fillStyle = rgb('#FFF7E0', (.35 + b * .6) * tw * al * (1 - y / (y0 + h) * .5)); daire(x, y, rr); X.fill();
    if (b > .92) { parilti(x, y, rr * 6, '#FFF1C8', .3 * tw * al); }
  }
}
function atesBocekleri(n, seed, t, x0, y0, w, h, al = 1) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const bx = x0 + r() * w, by = y0 + r() * h, f1 = .2 + r() * .3, f2 = .15 + r() * .3, p = r() * TAU;
    const x = bx + Math.sin(t * f1 + p) * 40 + Math.sin(t * f2 * 2.1 + p) * 15, y = by + Math.cos(t * f2 + p) * 25;
    const parla = Math.pow((Math.sin(t * (.7 + r() * .6) + p) + 1) / 2, 2) * al;
    if (parla < .02) continue;
    parilti(x, y, 26, '#E9F28A', .55 * parla); daire(x, y, 2.6); X.fillStyle = rgb('#FBFFD6', parla); X.fill();
  }
}
// sis bandı
function sis(y, kal, t, hiz, al, renk = '#FFF6E6', seed = 0) {
  X.save(); X.globalAlpha = al;
  for (let i = 0; i < 7; i++) { const x = ((i * 380 + t * hiz + seed * 97) % 2660) - 1330; elips(x, y + Math.sin(i * 1.7 + seed) * kal * .3, 360, kal); X.fillStyle = rGrad(x, y, 0, 360, [[0, renk, .55], [1, renk, 0]]); X.fill(); }
  X.restore();
}
// toz zerreleri (ışık huzmesinde)
function tozZerre(n, seed, t, x0, y0, w, h, renk = '#FFF2CF', al = .6) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const vx = (r() - .3) * 14, vy = -4 - r() * 8, p = r() * 100;
    const x = x0 + ((r() * w + (t + p) * vx) % w + w) % w, y = y0 + ((r() * h + (t + p) * vy) % h + h) % h;
    X.fillStyle = rgb(renk, al * (.4 + .6 * Math.abs(Math.sin(t * .8 + i)))); daire(x, y, .9 + r() * 1.8); X.fill();
  }
}
function isikHuzmesi(x0, y0, x1, y1, gen0, gen1, renk, al) {
  X.save(); X.globalCompositeOperation = 'screen';
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  cokgen([[x0 + nx * gen0, y0 + ny * gen0], [x1 + nx * gen1, y1 + ny * gen1], [x1 - nx * gen1, y1 - ny * gen1], [x0 - nx * gen0, y0 - ny * gen0]]);
  X.fillStyle = dGrad(x0, y0, x1, y1, [[0, renk, al], [1, renk, 0]]); X.fill(); X.restore();
}
