/* KAMERADAKİ İKİNCİ KARDEŞ — kare oluşturucu: çekim seçimi, geçişler, renk düzeni, altyazı */
'use strict';
const ANA = document.getElementById('c');
let ALTYAZI_ACIK = true;
let _gecis = null;

function cekimBul(t) { for (const c of CEKIMLER) if (t >= c.t0 && t < c.t1) return c; return CEKIMLER[CEKIMLER.length - 1]; }

function kare(t) {
  window.SIMDI = t;
  const ctx = ANA.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  const c = cekimBul(t);
  ctx.save(); c.ciz(ctx, t); ctx.restore();
  // giriş geçişi
  if (c.giris) {
    const k = (t - c.t0) / c.giris.sure;
    if (k < 1) {
      if (c.giris.tip === 'erit') {
        const onceki = CEKIMLER[CEKIMLER.indexOf(c) - 1];
        if (onceki) {
          if (!_gecis) _gecis = tuval(W, H);
          const g = _gecis.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
          g.save(); onceki.ciz(g, t); g.restore();
          ctx.save(); ctx.globalAlpha = 1 - ss(k); ctx.drawImage(_gecis, 0, 0); ctx.restore();
        }
      } else if (c.giris.tip === 'parazit') parazitCiz(ctx, W, H, t, 1 - k);
    }
  }
  // final bölümü: daha soğuk mavi, koyu gölgeler (sahne 13–15)
  const finalK = ss(seg(t, 119, 124));
  if (finalK > 0 && t < 148.0) {
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = `rgba(150,165,200,${0.35 * finalK})`; ctx.fillRect(0, 0, W, H); ctx.restore();
    vinyet(ctx, 0.35 * finalK, '#02040a');
  }
  // genel: hafif film greni + vinyet (siyah ekranda değil)
  if (t > 0.55 && t < 148.7) vinyet(ctx, 0.28, '#05060a', W, H, 0.5);
  if (ALTYAZI_ACIK) altyazi(ctx, t);
}

/* ---------- altyazı: beyaz, ince siyah dış çizgi, alt-orta, en fazla 2 satır ---------- */
function satirlaraBol(ctx, metin, maks) {
  const kel = metin.split(' '), out = []; let s = '';
  for (const k of kel) { const d = s ? s + ' ' + k : k; if (ctx.measureText(d).width > maks && s) { out.push(s); s = k; } else s = d; }
  if (s) out.push(s);
  if (out.length > 2) { // iki satıra dengele
    const yari = Math.ceil(kel.length / 2); return [kel.slice(0, yari).join(' '), kel.slice(yari).join(' ')];
  }
  return out;
}
function altyazi(ctx, t) {
  const D = window.DIYALOG || [];
  for (let i = 0; i < D.length; i++) {
    const r = D[i], sonraki = D[i + 1];
    const a = r.bas - 0.06, b = Math.min(r.son + 0.5, sonraki ? sonraki.bas - 0.08 : 1e9, 149.95);
    if (t < a || t >= b) continue;
    const al = clamp((t - a) / 0.1) * clamp((b - t) / 0.12);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = al;
    const px = 54;
    ctx.font = `${r.kim === 'COCUK' ? 'italic ' : ''}700 ${px}px "Inter", sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    const sat = satirlaraBol(ctx, r.metin, 900);
    const y0 = 1610 - (sat.length - 1) * px * 1.22;
    sat.forEach((s, j) => {
      const y = y0 + j * px * 1.22;
      ctx.lineJoin = 'round'; ctx.miterLimit = 2;
      ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = 11; ctx.strokeText(s, W / 2, y + 2);
      ctx.strokeStyle = '#000'; ctx.lineWidth = 6; ctx.strokeText(s, W / 2, y);
      ctx.fillStyle = '#ffffff'; ctx.fillText(s, W / 2, y);
    });
    ctx.restore();
  }
}

// Hazırlık: fontlar + gren dokuları
let HAZIR = false;
async function hazirla() {
  grenHazirla();
  try { await document.fonts.load('700 54px "Inter"'); await document.fonts.load('600 40px "JetBrains Mono"'); await document.fonts.load('600 40px "Inter"'); await document.fonts.load('italic 700 54px "Inter"'); } catch (e) { }
  await document.fonts.ready;
  HAZIR = true;
}
