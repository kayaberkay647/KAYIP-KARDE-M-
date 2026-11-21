// APARTMAN MERDİVENİ ve BODRUM — 2. bölümden itibaren. Dünya koordinatları salonla aynı ölçekte (zemin 1180).
KARAKTER.SILUET = { boy: 1.04, kadin: 0, ten: '#c9a080', sac: '#222', goz: '#333', kas: '#222', yuz: 'kosegen', sacTip: 'emir',
  ust: '#2a2a30', ustTip: 'ceket', alt: '#1a1a1e', altTip: 'pantolon', ayak: '#111', omuz: 140, dudak: '#866', seed: 9 };
KOL.canta = s => [s * 150, -340];

function cantaCiz(c, x, y, s = 1) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.strokeStyle = '#0c0c0e'; c.lineWidth = 8; c.beginPath(); c.moveTo(-30, -6); c.quadraticCurveTo(0, -40, 30, -6); c.stroke();
  yd(c, -70, -6, 140, 100, 14); konturlu(c, '#18181b', 3); c.fillStyle = '#c9a65a'; c.fillRect(-8, 10, 16, 10);
  c.restore();
}

// Geçmiş: loş merdivende siyah çantalı adam (yüz gösterilmez)
function merdivenGecmis(c, t, lt) {
  c.fillStyle = '#4a4f58'; c.fillRect(0, 0, W, H);
  const g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#5b616b'); g.addColorStop(1, '#2c3036'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  // basamaklar (sol üstten sağ alta inen)
  for (let i = 0; i < 14; i++) {
    const x = -60 + i * 90, y = 760 + i * 92;
    c.fillStyle = i % 2 ? '#6c717a' : '#646971'; c.fillRect(x, y, 700, 92);
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x, y + 80, 700, 12);
  }
  // korkuluk
  c.strokeStyle = '#2b2b2f'; c.lineWidth = 16; c.beginPath(); c.moveTo(-40, 300); c.lineTo(1300, 1530); c.stroke();
  c.lineWidth = 7; for (let i = 0; i < 12; i++) { const x = 20 + i * 100; c.beginPath(); c.moveTo(x, 355 + x * .92); c.lineTo(x, 740 + x * .92); c.stroke(); }
  // duvar lambası
  const titre = .75 + .25 * Math.max(0, gurultu(t * 9, 3));
  const lg = c.createRadialGradient(860, 380, 10, 860, 380, 700); lg.addColorStop(0, `rgba(255,214,150,${.45 * titre})`); lg.addColorStop(1, 'rgba(255,214,150,0)');
  c.fillStyle = lg; c.fillRect(0, 0, W, H); c.fillStyle = '#f6dfb0'; yd(c, 820, 350, 80, 50, 20); c.fill();
  // siluet: merdivenden hızla iner
  const k = seg(lt, 0, 2.4), x = lerp(250, 860, k), y = lerp(1180, 1740, k);
  c.save(); c.filter = 'brightness(.08) blur(1.5px)';
  kisiCiz(c, 'SILUET', { x, y, s: 1.05, arka: 1, yuru: k * 6, yon: 1, sag: 'canta' }, t);
  c.restore();
  cantaCiz(c, x + 170, y - 360, 1.1);
  // ön plan gölgesi + vinyet
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.75)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}

// BODRUM KORİDORU — dünya 0..1600 genişlik
const BODRUM = { b13: [960, 1290] };
function bodrumArka(c, o, t) {
  const g = c.createLinearGradient(0, 0, 0, 1180); g.addColorStop(0, '#5f646b'); g.addColorStop(1, '#878b91'); c.fillStyle = g; c.fillRect(-400, -200, 2400, 1380);
  c.fillStyle = 'rgba(40,40,45,.12)'; for (let i = 0; i < 26; i++) { c.beginPath(); c.ellipse(hash(i) * 1700, 300 + hash(i + 5) * 800, 40 + hash(i + 9) * 90, 20 + hash(i + 3) * 60, 0, 0, 7); c.fill(); }
  c.strokeStyle = 'rgba(30,30,35,.18)'; c.lineWidth = 3; for (let y = 120; y < 1180; y += 150) { c.beginPath(); c.moveTo(-400, y); c.lineTo(2000, y); c.stroke(); }
  // borular
  c.fillStyle = '#4a4e55'; c.fillRect(-400, 90, 2400, 36); c.fillStyle = '#6a6f77'; c.fillRect(-400, 96, 2400, 8);
  c.fillStyle = '#3e4248'; c.fillRect(-400, 150, 2400, 22); c.fillStyle = '#555'; c.fillRect(1500, 90, 30, 1090);
  // zemin
  const z = c.createLinearGradient(0, 1180, 0, 1920); z.addColorStop(0, '#4d5056'); z.addColorStop(1, '#6b6e74'); c.fillStyle = z; c.fillRect(-400, 1180, 2400, 800);
  c.fillStyle = 'rgba(20,20,25,.2)'; for (let i = 0; i < 10; i++) { c.beginPath(); c.ellipse(hash(i + 40) * 1600, 1300 + hash(i + 41) * 500, 80 + hash(i) * 120, 14, 0, 0, 7); c.fill(); }
  // depo kapıları
  for (const [x0, ad] of [[150, 'B-11'], [560, 'B-12'], [960, 'B-13']]) {
    const w = 330, y0 = 380, acik = ad === 'B-13' ? (o.b13Acik || 0) : 0;
    c.fillStyle = '#2e3136'; c.fillRect(x0 - 16, y0 - 16, w + 32, 1180 - y0 + 16);
    c.fillStyle = '#0b0b0d'; c.fillRect(x0, y0, w, 1180 - y0);
    if (acik > 0 && o.fener) { const fg = c.createRadialGradient(x0 + w * .6, 800, 10, x0 + w * .6, 800, 300); fg.addColorStop(0, 'rgba(255,245,210,.25)'); fg.addColorStop(1, 'rgba(255,245,210,0)'); c.fillStyle = fg; c.fillRect(x0, y0, w, 800); }
    const lw = w * (1 - .8 * acik), sk = 30 * acik;
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0 + lw, y0 + sk); c.lineTo(x0 + lw, 1180 - sk * .5); c.lineTo(x0, 1180); c.closePath();
    const kg = c.createLinearGradient(x0, 0, x0 + w, 0); kg.addColorStop(0, '#6f7c88'); kg.addColorStop(1, '#55616c'); c.fillStyle = kg; c.fill(); c.strokeStyle = '#2a2f35'; c.lineWidth = 5; c.stroke();
    if (acik < .5) {
      c.fillStyle = 'rgba(30,35,40,.5)'; for (let i = 0; i < 6; i++) for (const yy of [y0 + 30, 1150]) { c.beginPath(); c.arc(x0 + 30 + i * 54, yy, 5, 0, 7); c.fill(); }
      c.strokeStyle = 'rgba(30,35,40,.35)'; c.lineWidth = 4; for (let yy = y0 + 120; yy < 1100; yy += 120) { c.beginPath(); c.moveTo(x0 + 20, yy); c.lineTo(x0 + w - 20, yy); c.stroke(); }
      c.font = '600 92px Oswald'; c.textAlign = 'center'; c.fillStyle = ad === 'B-13' ? '#e9e2cf' : 'rgba(230,225,210,.8)'; c.fillText(ad, x0 + w / 2, y0 + 150);
      c.fillStyle = '#b8b8b8'; yd(c, x0 + w - 70, 760, 30, 90, 8); c.fill(); c.fillStyle = '#222'; c.beginPath(); c.arc(x0 + w - 55, 830, 6, 0, 7); c.fill();
      c.fillStyle = 'rgba(120,60,20,.35)'; c.beginPath(); c.ellipse(x0 + 60, 1100, 40, 60, 0, 0, 7); c.fill();
    }
  }
  // merdiven (sağda, yukarıdan iniyor)
  for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? '#62666d' : '#5a5e65'; c.fillRect(1380 + i * 0, 480 + i * 88, 400, 88); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(1380, 480 + i * 88 + 76, 400, 12); }
  c.strokeStyle = '#2b2b2f'; c.lineWidth = 12; c.beginPath(); c.moveTo(1360, 300); c.lineTo(1360, 1180); c.stroke();
}
function bodrumIsik(c, o, t) {
  const a = Math.sin(t * 1.3) * .12, bx = 800 + Math.sin(a) * 160, by = 120 + Math.cos(a) * 160;
  c.strokeStyle = '#222'; c.lineWidth = 3; c.beginPath(); c.moveTo(800, 120); c.lineTo(bx, by); c.stroke();
  c.fillStyle = '#fff2c8'; c.beginPath(); c.arc(bx, by + 14, 16, 0, 7); c.fill();
  c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(60,66,90,.55)'; c.fillRect(-400, -200, 2400, 2400);
  c.globalCompositeOperation = 'screen';
  const titre = .85 + .15 * Math.max(0, gurultu(t * 12, 8));
  const lg = c.createRadialGradient(bx, by + 20, 10, bx, by + 300, 1000); lg.addColorStop(0, `rgba(255,220,160,${.55 * titre})`); lg.addColorStop(.6, `rgba(255,210,150,${.12 * titre})`); lg.addColorStop(1, 'rgba(255,210,150,0)');
  c.fillStyle = lg; c.fillRect(-400, -200, 2400, 2400);
  if (o.fener) { // komiserin el feneri hüzmesi
    const [fx, fy, hx, hy] = o.fener; c.fillStyle = 'rgba(255,250,225,.18)'; c.beginPath(); c.moveTo(fx, fy);
    const an = Math.atan2(hy - fy, hx - fx), r = Math.hypot(hx - fx, hy - fy) * 1.3; c.lineTo(fx + Math.cos(an - .18) * r, fy + Math.sin(an - .18) * r); c.lineTo(fx + Math.cos(an + .18) * r, fy + Math.sin(an + .18) * r); c.fill();
  }
  c.restore();
  // toz zerreleri
  c.fillStyle = 'rgba(255,240,210,.35)'; for (let i = 0; i < 40; i++) { const x = hash(i + 300) * 1600, y = frac(hash(i + 400) + t * .015 * (1 + hash(i))) * 1500 + 100; c.beginPath(); c.arc(x + Math.sin(t + i) * 10, y, 2 + hash(i) * 2, 0, 7); c.fill(); }
}

// Yakın plan: anahtar kilitte döner (B-13 kapısı)
function insKilit(c, t, lt) {
  const g = c.createLinearGradient(0, 0, W, 0); g.addColorStop(0, '#5a6673'); g.addColorStop(1, '#6f7c88'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = 'rgba(30,35,40,.5)'; for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(120 + i * 210, 160, 12, 0, 7); c.fill(); }
  c.font = '600 280px Oswald'; c.textAlign = 'center'; c.fillStyle = 'rgba(233,226,207,.9)'; c.fillText('B-13', W / 2, 520);
  c.fillStyle = '#b0b0b0'; yd(c, W / 2 - 90, 900, 180, 420, 40); c.fill(); c.strokeStyle = '#666'; c.lineWidth = 6; c.stroke();
  c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(W / 2, 1060, 30, 0, 7); c.fill(); c.fillRect(W / 2 - 12, 1060, 24, 70);
  const don = ease(seg(lt, .5, 1.1)) * Math.PI / 2, gir = easeOut(seg(lt, 0, .45));
  c.save(); c.translate(W / 2, 1080); c.rotate(don); c.scale(lerp(1.3, 1, gir), lerp(1.3, 1, gir)); c.scale(5, 5); c.rotate(Math.PI); nesne(c, 'anahtar', 0, 8, 0); c.restore();
  c.save(); c.translate(W / 2 + 40, 1240); c.rotate(-.3 + don * .4);
  c.fillStyle = '#8fb7d9'; c.strokeStyle = '#5b86ad'; c.lineWidth = 6; c.beginPath(); c.ellipse(0, 60, 120, 150, 0, 0, 7); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(-70, -60, 40, 90, .4, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#474b53'; yd(c, -150, 180, 300, 600, 40); c.fill(); c.restore();
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.7)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}
// Yakın plan: tozlu rafta kayıt cihazı + fotoğraf flaşı
function insKayitRaf(c, t, lt, flas) {
  c.fillStyle = '#121316'; c.fillRect(0, 0, W, H);
  const z = 1 + lt * .03; c.save(); c.translate(W / 2, H / 2); c.scale(z, z); c.translate(-W / 2, -H / 2);
  c.fillStyle = '#5a4634'; c.fillRect(60, 1120, 960, 46); c.fillRect(60, 520, 960, 40); c.fillRect(80, 300, 30, 1400); c.fillRect(970, 300, 30, 1400);
  for (const [x, w, h] of [[140, 260, 220], [430, 180, 160], [140, 330, 380]]) { if (h === 380) { c.fillStyle = '#8a7356'; c.fillRect(x, 1166 + 20, w, 0); continue; } c.fillStyle = '#8a7356'; c.fillRect(x, 1120 - h, w, h); c.strokeStyle = '#5e4c37'; c.lineWidth = 4; c.strokeRect(x, 1120 - h, w, h); }
  c.fillStyle = '#7d6a50'; c.fillRect(150, 520 - 200, 300, 200); c.fillRect(600, 520 - 150, 260, 150);
  kayitCihazi(c, 760, 1050, 1.6, 0);
  c.fillStyle = 'rgba(200,190,170,.25)'; for (let i = 0; i < 60; i++) c.fillRect(100 + hash(i) * 880, 1110 + hash(i + 3) * 10, 3, 2);
  c.restore();
  // el feneri hüzmesi
  c.save(); c.globalCompositeOperation = 'screen'; const fg = c.createRadialGradient(760, 980, 20, 760, 980, 520); fg.addColorStop(0, 'rgba(255,248,220,.55)'); fg.addColorStop(1, 'rgba(255,248,220,0)'); c.fillStyle = fg; c.fillRect(0, 0, W, H); c.restore();
  c.fillStyle = 'rgba(255,240,210,.4)'; for (let i = 0; i < 30; i++) { const x = 500 + hash(i + 500) * 520, y = 700 + frac(hash(i + 600) + t * .02) * 600; c.beginPath(); c.arc(x, y, 2.5, 0, 7); c.fill(); }
  if (flas != null && flas >= 0 && flas < .35) { c.fillStyle = `rgba(255,255,255,${.95 * (1 - flas / .35)})`; c.fillRect(0, 0, W, H); }
}
// Yakın plan: delil torbasında anahtar (salon)
function insAnahtarTorba(c, t, lt) {
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3a3f4a'); g.addColorStop(1, '#5b4b40'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(W / 2 + gurultu(lt, 4) * 6, H / 2 - 40); c.rotate(-.05);
  c.fillStyle = '#8fb7d9'; c.strokeStyle = '#5b86ad'; c.lineWidth = 6; for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * 290, -420, 80, 110, s * .4, 0, 7); c.fill(); c.stroke(); }
  c.fillStyle = 'rgba(235,240,245,.6)'; c.strokeStyle = 'rgba(150,160,170,.95)'; yd(c, -340, -500, 680, 900, 30); c.fill(); c.stroke();
  c.fillStyle = '#c0392b'; c.fillRect(-340, -500, 680, 60);
  c.save(); c.rotate(-.5); c.scale(7, 7); nesne(c, 'anahtar', 0, -6, 0); c.restore();
  c.save(); c.rotate(-.5); c.fillStyle = '#d9c9a0'; c.strokeStyle = '#8a7a50'; c.lineWidth = 5; c.beginPath(); c.arc(0, -230, 80, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#2a2a2a'; c.font = '800 64px Nunito'; c.textAlign = 'center'; c.fillText('B-13', 0, -208); c.restore();
  c.fillStyle = '#fff'; c.fillRect(-230, 250, 460, 120); c.fillStyle = '#333'; c.font = '800 46px Nunito'; c.textAlign = 'center'; c.fillText('DELİL NO: 03', 0, 305); c.font = '600 34px Nunito'; c.fillText('Salon zemini', 0, 350);
  c.fillStyle = 'rgba(255,255,255,.22)'; c.beginPath(); c.moveTo(-320, -420); c.lineTo(-180, -420); c.lineTo(-320, 200); c.fill();
  c.restore();
  c.fillStyle = 'rgba(30,25,40,.2)'; c.fillRect(0, 0, W, H);
}
// Yakın plan: torbadaki kayıt cihazı çalıştırılır
function insKayitCalar(c, t, lt, calis) {
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2c3038'); g.addColorStop(1, '#4a3d34'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(W / 2, H / 2 - 60); const z = 1 + lt * .025; c.scale(z, z);
  c.fillStyle = 'rgba(235,240,245,.5)'; c.strokeStyle = 'rgba(150,160,170,.9)'; c.lineWidth = 5; yd(c, -330, -560, 660, 1000, 30); c.fill(); c.stroke();
  c.fillStyle = '#c0392b'; c.fillRect(-330, -560, 660, 56);
  const led = calis > 0 ? (Math.sin(t * 10) > 0 ? 1 : .3) : 0;
  kayitCihazi(c, 0, -40, 4, led);
  if (calis > 0) { // ses dalgası
    c.strokeStyle = 'rgba(255,90,90,.85)'; c.lineWidth = 6; c.beginPath();
    for (let x = -260; x <= 260; x += 8) { const a = agizDurum('EMIR', t).ac; const y = 420 + Math.sin(x * .09 + t * 30) * (8 + 70 * a) * Math.cos(x / 520 * Math.PI); x === -260 ? c.moveTo(x, y) : c.lineTo(x, y); }
    c.stroke();
  }
  // play'e basan eldivenli parmak
  const bas = seg(lt, .2, .55) - seg(lt, .7, 1.1);
  if (lt < 1.3) { c.save(); c.translate(lerp(240, 30, clamp(bas * 1.4, 0, 1)), lerp(520, 60, clamp(bas * 1.4, 0, 1))); c.rotate(-.6); c.fillStyle = '#8fb7d9'; c.strokeStyle = '#5b86ad'; c.lineWidth = 6; c.beginPath(); c.ellipse(0, 0, 36, 90, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(40, 150, 110, 120, 0, 0, 7); c.fill(); c.stroke(); c.restore(); }
  c.restore();
  const v = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.6)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}
