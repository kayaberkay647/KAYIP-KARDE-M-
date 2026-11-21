// Kurgu altyapısı (1. bölümden): salon çekimi, omuz üstü, altyazı, başlık, kare çizimi
// SAHNELER — çekim listesi, kamera, karakter konumları, altyazı, başlıklar.
const L = id => REPLIK.find(r => r.id === id), Lb = id => L(id).t, Ls = id => L(id).t + L(id).d;
const VURUSLAR = [0, .55, 1.1].map(k => EV.vurus + .1 + k);
const basY = (ad, p) => p.y - 835 * (p.s || 1) * KARAKTER[ad].boy + (p.otur || 0) * 150 * (p.s || 1) * KARAKTER[ad].boy;

function yuruyus(t, t0, t1, x0, y0, x1, y1) {
  const k = seg(t, t0, t1), e = ease(k);
  const x = lerp(x0, x1, e), y = lerp(y0, y1, e);
  const hareket = k > 0 && k < 1;
  return { x, y, s: olcek(y), yuru: hareket ? Math.hypot(x - x0, y - y0) / 150 : null, yon: Math.sign(x1 - x0) || 1 };
}
const yakin = (ad, p, z = 3.5, dy = 40) => [p.x + (p.don || 0) * 10 * (p.s || 1), basY(ad, p) + dy * (p.s || 1), z / (p.s || 1)];
const orta = (ad, p, z = 2.3, dy = 230) => [p.x, basY(ad, p) + dy * (p.s || 1), z / (p.s || 1)];

// Bir salon çekimi çizer. kisiler: [[ad, p], ...]  on: ön plan omuz üstü [ad, p]
function salonCek(c, t, cam, o, kisiler, on) {
  let [cx, cy, z] = cam;
  cx += gurultu(t * .35, 11) * 5 / z * 3; cy += gurultu(t * .3, 12) * 4 / z * 3;
  c.save(); kamera(c, cx, cy, z);
  salonArka(c, o, t);
  kisiler.slice().sort((a, b) => a[1].y - b[1].y).forEach(([ad, p]) => kisiCiz(c, ad, p, t));
  if (on) { // omuz üstü ön plan: kameraya göre konumlanır, hafif bulanık ve koyu
    const [oad, taraf] = on, vw = W / z, vh = H / z, fs = 2.3 / z;
    const oy = cy + vh * .4 + 835 * fs * KARAKTER[oad].boy, ox = cx + taraf * vw * .4;
    c.save(); c.filter = 'blur(4px) brightness(.62)'; kisiCiz(c, oad, { x: ox, y: oy, s: fs, arka: 1 }, t); c.restore();
  }
  salonIsik(c, o, t);
  c.restore();
}


// (çekim listesi sahneler.js içinde)

// ---------- YAZILAR ----------
function altBaslik(c, yazi, lt) {
  const a = Math.min(seg(lt, .1, .6), 1 - seg(lt, 2.2, 2.8)); if (a <= 0) return;
  c.save(); c.globalAlpha = a; c.font = '600 76px Caveat'; c.textAlign = 'left'; c.fillStyle = 'rgba(0,0,0,.55)'; c.fillText(yazi, 75, 245); c.fillStyle = '#f4ead8'; c.fillText(yazi, 70, 240); c.restore();
}
function baslikKarti(c, t, lt) {
  const a = Math.min(seg(lt, 0, .45), 1 - seg(lt, 1.5, 1.9)); if (a <= 0) return;
  c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(8,8,14,.72)'; c.fillRect(0, 0, W, H);
  c.textAlign = 'center'; const s = 1 + (1 - easeOut(seg(lt, 0, .8))) * .08;
  c.translate(W / 2, 880); c.scale(s, s);
  c.font = '600 112px Oswald'; c.fillStyle = '#f2ece2'; c.fillText('CESET', 0, -60); c.fillText('OLMAYAN', 0, 60);
  c.fillStyle = '#c0392b'; c.fillText('CİNAYET', 0, 180);
  c.fillStyle = '#c0392b'; c.fillRect(-260, 225, 520 * easeOut(seg(lt, .2, .9)), 6);
  c.font = '800 46px Nunito'; c.fillStyle = 'rgba(242,236,226,.9)'; c.fillText(BOLUM_YAZISI, 0, 310);
  c.restore();
}
function bitisKarti(c, t, lt) {
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const a = seg(lt, .25, .8), b = seg(lt, .7, 1.4);
  c.save(); c.textAlign = 'center'; c.globalAlpha = a;
  c.font = '600 84px Oswald'; c.fillStyle = '#f2ece2'; c.fillText('CESET OLMAYAN', W / 2, 860); c.fillStyle = '#c0392b'; c.fillText('CİNAYET', W / 2, 960);
  c.globalAlpha = b; c.font = '800 54px Nunito'; c.fillStyle = 'rgba(242,236,226,.9)';
  const yazi = 'DEVAM EDECEK...'; c.fillText(yazi.slice(0, Math.ceil(yazi.length * seg(lt, .7, 1.5))), W / 2, 1090);
  c.restore();
}
function altyaziCiz(c, t) {
  if (!AYAR.altyazi) return;
  for (const r of REPLIK) {
    if (t < r.t - .05 || t > r.t + r.d + .15) continue;
    const a = Math.min(seg(t, r.t - .05, r.t + .08), 1 - seg(t, r.t + r.d + .02, r.t + r.d + .15));
    c.save(); c.globalAlpha = a; c.font = '800 54px Nunito'; c.textAlign = 'center'; c.lineJoin = 'round';
    const satirlar = []; let s = '';
    for (const k of r.m.split(' ')) { const d = s ? s + ' ' + k : k; if (c.measureText(d).width > 900 && s) { satirlar.push(s); s = k; } else s = d; }
    satirlar.push(s);
    const y0 = 1470 - (satirlar.length - 1) * 33;
    satirlar.forEach((st, i) => {
      const y = y0 + i * 66;
      c.lineWidth = 11; c.strokeStyle = 'rgba(10,10,16,.85)'; c.strokeText(st, W / 2, y);
      c.fillStyle = r.tel ? '#cfe5ff' : '#ffffff'; c.fillText(st, W / 2, y);
    });
    c.restore();
  }
}

// ---------- ANA KARE ÇİZİMİ ----------
const tampon = document.createElement('canvas'); tampon.width = W; tampon.height = H; const tc = tampon.getContext('2d');
const grenK = document.createElement('canvas'); grenK.width = grenK.height = 256; { const g = grenK.getContext('2d'), d = g.createImageData(256, 256); for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 14; } g.putImageData(d, 0, 0); }
const AYAR = { altyazi: true };
function cizim(t, ctx) {
  t = clamp(t, 0, SURE - .001);
  let i = 0; while (i < CEKIM.length - 1 && t >= CEKIM[i + 1][0]) i++;
  const [b, f] = CEKIM[i];
  tc.setTransform(1, 0, 0, 1, 0, 0); tc.filter = 'none'; tc.globalAlpha = 1; tc.clearRect(0, 0, W, H);
  f(tc, t, t - b);
  tc.setTransform(1, 0, 0, 1, 0, 0);
  const gecmis = GECMIS.some(([a, b]) => t >= a && t < b);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.filter = gecmis ? 'sepia(.45) saturate(.55) brightness(1.06) contrast(.94)' : 'none';
  ctx.drawImage(tampon, 0, 0); ctx.filter = 'none';
  // vinyet
  const v = ctx.createRadialGradient(W / 2, H * .45, H * .3, W / 2, H * .5, H * .78); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, gecmis ? 'rgba(40,30,20,.6)' : 'rgba(0,0,0,.42)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  // gren
  ctx.save(); ctx.globalAlpha = 1; const ox = hash(Math.floor(t * 30)) * 256, oy = hash(Math.floor(t * 30) + 5) * 256; ctx.translate(-ox, -oy); ctx.fillStyle = ctx.createPattern(grenK, 'repeat'); ctx.fillRect(0, 0, W + 256, H + 256); ctx.restore();
  // geçişler: açılış, geçmişe giriş/çıkış flaşı
  if (t < .25) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .25})`; ctx.fillRect(0, 0, W, H); }
  for (const [a, b] of GECMIS) for (const [g, d] of [[a, .35], [b, .3]]) if (t >= g && t < g + d) { ctx.fillStyle = `rgba(255,248,235,${.8 * (1 - (t - g) / d)})`; ctx.fillRect(0, 0, W, H); }
  for (const [a, b, yazi] of ARA_YAZI) if (t >= a && t < b) altBaslik(ctx, yazi, t - a);
  if (t >= EV.baslik && t < SAHNE[2]) baslikKarti(ctx, t, t - EV.baslik);
  if (t < EV.karar) altyaziCiz(ctx, t);
}
