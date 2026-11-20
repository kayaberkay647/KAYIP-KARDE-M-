// 1dkdua — ortak mekân: gün/akşam/gece ışığı, Osmanlı misafir odası (pencere, sedir, sini, dolap, kandil), tahta zemin
// 03 ve sonraki videolarda ortak kullanılır. odaCiz(t, g, o): g = 0 gün · .5 akşam · 1 gece
'use strict';
// ───────── Gün/akşam/gece renkleri ─────────
const GUN = ['#BCD8DE', '#F7E4B6'], AKSAM = ['#8C74A0', '#F4AE7C'], GECE = ['#0D1A32', '#2A4870'];
function gokV(v) { return v < .5 ? [mix(GUN[0], AKSAM[0], v / .5), mix(GUN[1], AKSAM[1], v / .5)] : [mix(AKSAM[0], GECE[0], (v - .5) / .5), mix(AKSAM[1], GECE[1], (v - .5) / .5)]; }
function isikV(g) { return g < .5 ? [mix('#FFE9B8', '#FFB070', g / .5), .27 - g * .12] : [mix('#FFB070', '#8FA8D0', (g - .5) / .5), .21 - (g - .5) * .18]; }

// ───────── Oda ─────────
function pencere03(px, g, t, o = {}) {
  const [ust, alt] = gokV(g), gn = sm(.3, 1, g), YM = -400, YA = -10;
  X.fillStyle = rgb(mix('#B79B74', '#4A3A30', gn * .6)); X.beginPath(); X.moveTo(px - 142, YA + 6); X.lineTo(px - 142, YM); X.arc(px, YM, 142, Math.PI, 0); X.lineTo(px + 142, YA + 6); X.closePath(); X.fill();
  X.beginPath(); X.moveTo(px - 120, YA); X.lineTo(px - 120, YM); X.arc(px, YM, 120, Math.PI, 0); X.lineTo(px + 120, YA); X.closePath();
  X.fillStyle = dGrad(0, YM - 130, 0, YA, [[0, ust], [1, alt]]); X.fill();
  X.save(); X.clip();
  if (g > .55) { yildizlar(24, 77 + Math.abs(px), t, px - 120, YM - 130, 240, 360, sm(.55, .95, g)); ay(px + 40, YM - 20, 22, sm(.55, .95, g)); }
  if (o.kuslar && px > 0) for (let i = 0; i < 4; i++) { const u = clamp((t - 12.2) / 2.8); kus(px - 130 + u * 280 + i * 24, YM - 20 - i * 28 - Math.sin(u * 5 + i) * 10, 5, t, i + 2, '#4A3A44'); }
  X.strokeStyle = rgb(mix('#7A5233', '#2A1E1A', gn * .7), .85); X.lineWidth = 3.5;
  for (let k = -12; k < 13; k++) { X.beginPath(); X.moveTo(px - 120 + k * 20, YA); X.lineTo(px - 120 + k * 20 + 520, YM - 150); X.moveTo(px + 120 - k * 20, YA); X.lineTo(px + 120 - k * 20 - 520, YM - 150); X.stroke(); }
  X.restore();
  X.fillStyle = rgb(mix('#8A5B37', '#3A2A20', gn * .6)); X.fillRect(px - 152, YA - 2, 304, 16);
}
function sedir03(C) {
  X.fillStyle = rgb(C('#6E4529', '#2A1E18', .8)); X.fillRect(330, 175, 830, 140);
  X.fillStyle = rgb(C('#B5583C', '#5A2A20', .8)); X.fillRect(330, 130, 830, 52); X.fillStyle = rgb(P.altin, .85); X.fillRect(330, 176, 830, 6);
  const renk = ['#7D8648', '#C4A05A', '#A65A44', '#7D8648', '#C4A05A'];
  for (let i = 0; i < 5; i++) {
    const x = 380 + i * 160; X.save(); X.translate(x + 70, 62); X.rotate((hash(i + 3) - .5) * .06);
    X.beginPath(); X.moveTo(-70, 56); X.quadraticCurveTo(-80, 0, -62, -52); X.quadraticCurveTo(0, -62, 62, -52); X.quadraticCurveTo(80, 0, 70, 56); X.quadraticCurveTo(0, 62, -70, 56); X.closePath();
    X.fillStyle = dGrad(0, -58, 0, 56, [[0, C(acik(renk[i], .12), '#3A3028', .7)], [1, C(koyu(renk[i], .18), '#201814', .7)]]); X.fill();
    X.strokeStyle = rgb(P.altin, .5); X.lineWidth = 2.5; X.beginPath(); X.ellipse(0, -2, 38, 26, 0, 0, TAU); X.stroke(); cokgen([[0, -14], [13, -2], [0, 10], [-13, -2]]); doldur(P.altin, .55); X.restore();
  }
}
function sini03(x, y, t, C) {
  X.strokeStyle = rgb(C('#6B4429', '#2A1E18', .8)); X.lineWidth = 9; X.lineCap = 'round'; for (const k of [-1, 1]) { X.beginPath(); X.moveTo(x + k * 70, y + 18); X.lineTo(x + k * 118, y + 130); X.stroke(); }
  elips(x, y + 14, 172, 38); doldur(C('#8E6A2A', '#3E2E16', .8)); elips(x, y, 172, 38); X.fillStyle = dGrad(x - 170, 0, x + 170, 0, [[0, C('#B98A33', '#5A4420', .8)], [.5, C('#EBC36A', '#8A6A34', .8)], [1, C('#A97F2C', '#4A3818', .8)]]); X.fill();
  elips(x, y, 140, 28); X.strokeStyle = 'rgba(120,80,20,.55)'; X.lineWidth = 3; X.stroke();
  for (const [gx, gy] of [[-62, -4], [8, 6], [72, -2]]) {
    elips(x + gx, y + gy + 14, 27, 8); doldur('#EFE6D0');
    X.beginPath(); X.moveTo(x + gx - 14, y + gy - 28); X.quadraticCurveTo(x + gx - 9, y + gy, x + gx - 7, y + gy + 12); X.lineTo(x + gx + 7, y + gy + 12); X.quadraticCurveTo(x + gx + 9, y + gy, x + gx + 14, y + gy - 28); X.closePath(); X.fillStyle = 'rgba(190,72,32,.88)'; X.fill(); X.strokeStyle = 'rgba(255,240,220,.75)'; X.lineWidth = 2; X.stroke();
  }
  for (let i = 0; i < 3; i++) { const u = (t * .3 + i / 3) % 1; X.beginPath(); X.moveTo(x + 8 + (i - 1) * 24, y - 30 - u * 6); X.bezierCurveTo(x + (i - 1) * 24 + Math.sin(t * 2 + i) * 12, y - 70 - u * 40, x + (i - 1) * 24 - 12, y - 100 - u * 60, x + (i - 1) * 24 + Math.sin(t * 1.7 + i) * 16, y - 130 - u * 80); cizgi('#FFFFFF', 4, .2 * Math.sin(u * Math.PI)); }
}
// o: {dolap 0..1, kuslar}
function odaCiz(t, g, o = {}) {
  const gn = sm(.3, 1, g), C = (gun, gece, k = 1) => mix(gun, gece, gn * k), duvar = C('#E8D6AF', '#4E4040', .85);
  X.fillStyle = dGrad(0, -1000, 0, 380, [[0, C('#D9C29A', '#3A2E2C', .85)], [.6, duvar], [1, koyu(duvar, .1)]]); X.fillRect(-1500, -1000, 3400, 1400);
  X.fillStyle = rgb(C('#5C3B24', '#2A1C16', .8)); X.fillRect(-1500, -1000, 3400, 170);
  for (let x = -1500; x < 1900; x += 140) { X.fillStyle = rgb(C('#4A2F1C', '#1E1410', .8)); X.fillRect(x, -1000, 26, 175); }
  X.fillStyle = rgb(C('#6E7B3A', '#323A24', .7)); X.fillRect(-1500, -760, 3400, 46);
  for (let x = -1500; x < 1900; x += 60) { cokgen([[x + 30, -756], [x + 50, -737], [x + 30, -718], [x + 10, -737]]); doldur(P.altin, .9 - gn * .4); }
  pencere03(-560, o.pencereSol ?? g, t, o); pencere03(560, o.pencereSag ?? g, t, o);
  X.fillStyle = dGrad(0, 150, 0, 385, [[0, C('#8C5C38', '#3A2A22', .8)], [1, C('#6E4529', '#2A1E18', .8)]]); X.fillRect(-1500, 150, 3400, 235);
  X.strokeStyle = rgb(C('#5A3820', '#1E1410', .8), .8); X.lineWidth = 4; for (let x = -1500; x < 1900; x += 160) X.strokeRect(x + 14, 170, 132, 190);
  X.fillStyle = dGrad(0, 385, 0, 1300, [[0, C('#A8744A', '#4A3226', .85)], [1, C('#7C5232', '#2E1E16', .85)]]); X.fillRect(-1500, 385, 3400, 900);
  X.strokeStyle = 'rgba(40,22,10,.35)'; X.lineWidth = 3; for (let y = 400; y < 1300; y += 34 + (y - 400) * .12) { X.beginPath(); X.moveTo(-1500, y); X.lineTo(1900, y); X.stroke(); }
  X.save(); X.globalAlpha = 1 - gn * .45; dolap(-40, 430, .95, o.dolap || 0, t); X.restore();
  if (gn > .01) { X.fillStyle = `rgba(14,10,12,${.36 * gn})`; X.fillRect(-300, -190, 380, 620); }
  sedir03(C); if (o.sini !== false) sini03(120, 560, t, C);
  kandil(190, -330, 100, t, 380);
  const [lc, la] = isikV(g); for (const px of [-560, 560]) isikHuzmesi(px, -230, px - 260, 700, 80, 210, lc, la);
  if (g > .3) { X.save(); X.globalCompositeOperation = 'screen'; parilti(190, -330, 700, '#FFB860', .4 * sm(.3, .85, g)); X.restore(); }
  tozZerre(34, 15, t, -800, -400, 1900, 1100, '#FFF2CF', .4 * (1 - gn * .6));
}
// Tahta zemin, yukarıdan görünüm (S1, S9)
function zeminUst(t, kr, isik) {
  X.fillStyle = rgb(mix('#B58558', '#2C1C14', kr)); X.fillRect(-1400, -1500, 2800, 3000);
  for (let i = -10; i < 10; i++) {
    const x = i * 150, c = mix(mix('#B98A5C', '#9A6E44', hash(i + 40)), '#2C1C14', kr);
    X.fillStyle = rgb(c); X.fillRect(x, -1500, 148, 3000);
    X.strokeStyle = `rgba(40,22,10,${.4 - kr * .2})`; X.lineWidth = 3; X.beginPath(); X.moveTo(x, -1500); X.lineTo(x, 1500); X.stroke();
    for (let k = 0; k < 14; k++) { const gx = x + 12 + hash(i * 17 + k) * 124; X.strokeStyle = `rgba(70,40,18,${.16 - kr * .1})`; X.lineWidth = 1.5; X.beginPath(); for (let y = -1500; y < 1500; y += 60) X.lineTo(gx + Math.sin(y * .01 + k + i) * 5, y); X.stroke(); }
    for (let k = 0; k < 4; k++) { const ky = -1400 + hash(i * 5 + k + 90) * 2800; X.beginPath(); X.moveTo(x + 148, ky); X.lineTo(x + 150, ky + 220); X.strokeStyle = 'rgba(30,16,8,.18)'; X.lineWidth = 2; X.stroke(); }
  }
  if (isik > 0) { // pencere ışığı
    X.save(); X.globalCompositeOperation = 'screen'; const ox = Math.sin(t * .15) * 14;
    cokgen([[-560 + ox, -820], [80 + ox, -820], [520 + ox, 280], [-120 + ox, 280]]); X.fillStyle = dGrad(0, -820, 0, 280, [[0, '#FFEAC0', .3 * isik], [1, '#FFEAC0', .12 * isik]]); X.fill();
    X.strokeStyle = `rgba(80,50,20,${.3 * isik})`; X.lineWidth = 16; X.beginPath(); X.moveTo(-240 + ox, -820); X.lineTo(200 + ox, 280); X.moveTo(-560 + ox, -250); X.lineTo(450 + ox, -150); X.stroke(); X.restore();
    tozZerre(40, 5, t, -500, -700, 1000, 1000, '#FFF2CF', .7 * isik);
  }
}

