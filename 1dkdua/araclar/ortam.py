"""1dkdua — JSON yapılandırmalı ortam sesi + atmosfer pedi; konuşmanın altına karıştırılır.
Konuşma örneklerine dokunulmaz (miks − ortam − konuşma = 0). Konuşma anında ortam ~6 dB kısılır.
Kullanım: python3 -I ortam.py videolar/<ad>/ortam.json konusma.wav cikti_miks.wav [cikti_ortam.wav]

ortam.json anahtarları (zamanlar saniye, seviyeler dBFS):
  sure                         toplam süre
  ruzgar   [[a,b,alcak,yuksek,kum]]        rüzgâr katmanları (kum = yüksek frekans hışırtı)
  oda      [[a,b,seviye]]                  iç mekân tonu
  ugultu   [[a,b,seviye]]                  toprak altı / boğuk uğultu
  kuslar   [[a,b,aralik,seviye,tohum,uzak]] kuş cıvıltıları
  guvercin [[t,seviye]]                    güvercin ötüşü
  can      [[t,seviye]]                    küçük çan
  hisirti  [[t,sure,seviye]]               kumaş / sayfa hışırtısı
  karga    [[t,sure,seviye,pan]]
  cesme    [[a,b,seviye]]  su   [[a,b,seviye]] (ırmak)
  ates     [[a,b,seviye]]                  kor uğultusu + çıtırtı
  gicirti  [[t,seviye]]   gumbur [[t,seviye]]   supurme [[t,sure,seviye]]
  isilti   [[a,b,aralik,seviye,tohum]]     ince parıltı tınıları
  ped      [[[frekanslar],a,b,seviye,gir,cik,parlaklik]]  ışık/ruh pedi
  circir   [[a,b,seviye,tohum,adet]]
  baykus   [[t,seviye]]
  adim     [[t,seviye,pan,parlaklik]]
  akorlar  [[a,b,[frekanslar],seviye]]     atmosfer pedi (sahneye göre akor)
"""
import sys, json, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt

cfg = json.load(open(sys.argv[1], encoding='utf-8'))
SR = sf.info(sys.argv[2]).samplerate; SURE = float(cfg['sure']); N = int(SR * SURE); T = np.arange(N) / SR  # SR: konuşmanın örnekleme hızı (44,1 / 48 kHz)
R = np.random.default_rng(1907)
def db(x): return 10 ** (x / 20)
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'lowpass', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'highpass', fs=SR, output='sos'), x)
def norm(x): return x / (np.sqrt((x ** 2).mean()) + 1e-12)
def zarf(a, b, gir=.6, cik=.6): return np.clip((T - (a - gir / 2)) / gir, 0, 1) * np.clip(((b + cik / 2) - T) / cik, 0, 1)
def yavas(seed, hiz=.5):
    r = np.random.default_rng(seed); k = np.linspace(0, SURE, int(SURE * hiz) + 2); return np.interp(T, k, r.random(len(k)))
def pan(x, p): a = (p + 1) * np.pi / 4; return np.stack([x * np.cos(a), x * np.sin(a)], 1)
ST = np.zeros((N, 2))
def koy(sinyal, t0, p=0.0, hedef=None):
    h = ST if hedef is None else hedef; i = int(t0 * SR); s = pan(sinyal, p); j = min(len(h), i + len(s))
    if 0 <= i < len(h): h[i:j] += s[:j - i]
def stereo_ekle(x, seviye, z, gecikme=2205):
    ST[:, 0] += x * z * db(seviye); ST[:, 1] += np.roll(x, gecikme) * z * db(seviye)

# ── sürekli dokular (bir kez üretilir) ──
r_alc = norm(bp(R.standard_normal(N), 120, 700)) * (0.55 + 0.45 * yavas(3, .35))
r_yuk = norm(bp(R.standard_normal(N), 900, 3500)) * (0.4 + 0.6 * yavas(5, .5))
kum = norm(hp(R.standard_normal(N), 2500)) * (0.3 + 0.7 * yavas(7, 1.2) ** 2)
kahve = np.cumsum(R.standard_normal(N)) * .02; oda = norm(lp(kahve - lp(kahve, 20), 260))
ugultu = norm(lp(R.standard_normal(N), 140, 4)) * (0.7 + 0.3 * yavas(9, .3))
for a, b, alc, yuk, *k in cfg.get('ruzgar', []):
    z = zarf(a, b); ST[:, 0] += z * (db(alc) * r_alc + db(yuk) * r_yuk + db(k[0] if k else -99) * kum)
    ST[:, 1] += z * (db(alc) * np.roll(r_alc, 4410) + db(yuk) * np.roll(r_yuk, 3000) + db(k[0] if k else -99) * np.roll(kum, 2205))
for a, b, sv in cfg.get('oda', []): stereo_ekle(oda, sv, zarf(a, b), 0)
for a, b, sv in cfg.get('ugultu', []): stereo_ekle(ugultu, sv, zarf(a, b, 1, 1), 900)

# ── kuşlar, güvercin, çan ──
def kus_cagri(f0, n, r):
    parca = []
    for _ in range(n):
        d = .05 + r.random() * .09; t = np.arange(int(d * SR)) / SR
        f = f0 * (1 + .25 * np.sin(np.pi * t / d) * (1 if r.random() < .5 else -1)) * (1 + .1 * r.random())
        parca += [np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2, np.zeros(int((.03 + r.random() * .08) * SR))]
    return np.concatenate(parca)
for a, b, ara, sv, seed, *uz in cfg.get('kuslar', []):
    r = np.random.default_rng(seed); t = a
    while t < b:
        x = kus_cagri(2600 + r.random() * 2600, 2 + int(r.random() * 4), r)
        if uz and uz[0]: x = lp(x, 3500)
        koy(x * db(sv - r.random() * 6), t, r.random() * 1.6 - .8); t += ara * (.5 + r.random())
def guvercin():
    parca = []
    for d, f in [(.18, 330), (.06, 0), (.34, 300), (.08, 0), (.22, 310)]:
        t = np.arange(int(d * SR)) / SR
        parca.append(np.sin(2 * np.pi * (f + 20 * np.sin(np.pi * t / d)) * t) * np.sin(np.pi * t / d) ** 1.5 * (1 + .3 * np.sin(2 * np.pi * 28 * t)) if f else np.zeros(len(t)))
    return lp(np.concatenate(parca), 1200)
for t0, sv in cfg.get('guvercin', []): koy(guvercin() * db(sv), t0, .4)
def can(f0, sure=.9):
    t = np.arange(int(sure * SR)) / SR
    return sum(a * np.sin(2 * np.pi * f0 * k * t) * np.exp(-t * d) for k, a, d in [(1, 1, 5), (2.76, .5, 8), (5.4, .25, 12)])
for t0, sv in cfg.get('can', []): koy(can(1250 + R.random() * 300) * db(sv), t0, .3 + R.random() * .4)

# ── hışırtı, karga, su, ateş ──
for t0, d, sv in cfg.get('hisirti', []):
    n = int(d * SR); x = bp(R.standard_normal(n), 1500, 6000) * np.hanning(n) * (0.5 + 0.5 * np.abs(np.sin(np.linspace(0, 9, n))))
    koy(norm(x) * db(sv), t0, .3)
def karga(sure=.32):
    t = np.arange(int(sure * SR)) / SR; f = 520 - 120 * t / sure; saw = 2 * ((np.cumsum(f) / SR) % 1) - 1
    x = saw * (0.6 + 0.4 * R.standard_normal(len(t))); return norm(bp(x, 700, 1700) + .6 * bp(x, 2000, 3200)) * np.sin(np.pi * t / sure) ** .7
for t0, d, sv, p in cfg.get('karga', []): koy(karga(d) * db(sv), t0, p)
def damla_dokusu(a, b, yog, lo, hi, seed):
    x = np.zeros(N); r = np.random.default_rng(seed)
    for t0 in np.arange(a - .5, b + .5, .012):
        if r.random() < yog and 0 <= t0 < SURE:
            d = int((.004 + r.random() * .012) * SR); i = int(t0 * SR); m = min(d, N - i)
            if m > 0: x[i:i + m] += (R.standard_normal(d) * np.exp(-np.linspace(0, 6, d)) * r.random())[:m]
    return norm(bp(x, lo, hi) + 1e-9)
for a, b, sv in cfg.get('cesme', []): stereo_ekle(damla_dokusu(a, b, .5, 1800, 7000, 31), sv, zarf(a, b, .6, 1.2), 600)
for a, b, sv in cfg.get('su', []):
    akis = norm(bp(R.standard_normal(N), 300, 2500)) * (0.6 + 0.4 * yavas(13, 2)) + .7 * damla_dokusu(a, b, .35, 900, 4000, 33)
    stereo_ekle(norm(akis), sv, zarf(a, b, 1, 1), 1500)
for a, b, sv in cfg.get('ates', []):
    gurul = norm(lp(R.standard_normal(N), 220, 3)) * (0.6 + 0.4 * yavas(17, 1.5))
    citir = np.zeros(N); r = np.random.default_rng(37)
    for t0 in np.arange(a, b, .02):
        if r.random() < .35:
            d = int(.003 * SR); i = int(t0 * SR)
            if i + d < N: citir[i:i + d] += R.standard_normal(d) * r.random()
    stereo_ekle(gurul + .5 * norm(bp(citir, 1500, 6000) + 1e-9), sv, zarf(a, b, 1, 1), 1200)
def gicirti(sure=.45):
    t = np.arange(int(sure * SR)) / SR; f = 260 + 180 * t / sure + 30 * np.sin(2 * np.pi * 23 * t)
    saw = 2 * ((np.cumsum(f) / SR) % 1) - 1; return norm(bp(saw, 400, 2500)) * np.sin(np.pi * t / sure)
for t0, sv in cfg.get('gicirti', []): koy(gicirti() * db(sv), t0, .1)
def gumbur(sure=.6):
    t = np.arange(int(sure * SR)) / SR
    return np.sin(2 * np.pi * (60 - 15 * t / sure) * t) * np.exp(-t * 6) + .4 * lp(R.standard_normal(len(t)), 300) * np.exp(-t * 10)
for t0, sv in cfg.get('gumbur', []): koy(gumbur() * db(sv), t0, 0)
for t0, d, sv in cfg.get('supurme', []):
    n = int(d * SR); x = R.standard_normal(n); out = np.zeros(n)
    for k in range(24):
        a, b = k * n // 24, (k + 1) * n // 24; c = 300 + 1700 * np.sin(np.pi * k / 23); out[a:b] = bp(x, c * .7, c * 1.4)[a:b]
    koy(norm(out) * np.hanning(n) * db(sv), t0, 0)

# ── ped, ışıltı, cırcır, baykuş, adım ──
def ped_sinyal(notalar, a, b, gir, cik, parlak):
    z = np.clip((T - a) / gir, 0, 1) * np.clip((b - T) / cik, 0, 1); x = np.zeros(N)
    for f in notalar:
        for det in (-.0035, .0035):
            ph = 2 * np.pi * f * (1 + det) * T; x += np.sin(ph) + .35 * np.sin(2 * ph) + .15 * np.sin(3 * ph)
    x = lp(x, parlak) * z; return x / (np.sqrt((x[z > .5] ** 2).mean()) + 1e-9) if (z > .5).any() else x
for notalar, a, b, sv, gir, cik, parlak in cfg.get('ped', []):
    x = ped_sinyal(notalar, a, b, gir, cik, parlak); ST[:, 0] += x * db(sv); ST[:, 1] += np.roll(x, 300) * db(sv)
for a, b, ara, sv, seed in cfg.get('isilti', []):
    r = np.random.default_rng(seed); t = a
    while t < b:
        f = 2200 + r.random() * 3200; tt = np.arange(int(.5 * SR)) / SR
        koy(np.sin(2 * np.pi * f * tt) * np.exp(-tt * 9) * db(sv - r.random() * 6), t, r.random() * 1.4 - .7); t += ara * (.4 + r.random())
for a, b, sv, seed, adet in cfg.get('circir', []):
    r = np.random.default_rng(seed); top = np.zeros(N)
    for _ in range(int(adet)):
        f = 4300 + r.random() * 900; oran = .45 + r.random() * .4; faz = r.random()
        darbe = (np.sin(2 * np.pi * 32 * T) > .3).astype(float) * (((T / oran + faz) % 1) < .22)
        top += lp(darbe, 200) * np.sin(2 * np.pi * f * T) * db(-r.random() * 6)
    z = zarf(a, b, 1.2, 1.2); top = hp(top, 2500) * z; k = np.sqrt((top[z > .5] ** 2).mean()) + 1e-9
    ST[:, 0] += top * db(sv) / k; ST[:, 1] += np.roll(top, 1500) * db(sv) / k
def baykus():
    parca = []
    for d, f in [(.32, 410), (.12, 0), (.5, 395)]:
        tt = np.arange(int(d * SR)) / SR
        parca.append(np.sin(2 * np.pi * (f - 25 * tt / d) * tt) * np.sin(np.pi * tt / d) ** 1.5 if f else np.zeros(len(tt)))
    return np.concatenate(parca)
for t0, sv in cfg.get('baykus', []): koy(baykus() * db(sv), t0, -.6)
for t0, sv, p, parlak in cfg.get('adim', []):
    n = int(.09 * SR); tt = np.arange(n) / SR
    koy((lp(R.standard_normal(n), parlak) * np.exp(-tt * 45) + .7 * np.sin(2 * np.pi * 95 * tt) * np.exp(-tt * 38)) * db(sv), t0, p)

# ── atmosfer pedi ──
PED = np.zeros((N, 2)); yedek = ST; ST = PED
for a, b, notalar, sv in cfg.get('akorlar', []):
    x = ped_sinyal(notalar, a - .6, b + .6, 1.2, 1.2, 850); ST[:, 0] += x * db(sv); ST[:, 1] += np.roll(x, 300) * db(sv)
ST = yedek; PED *= (0.85 + .15 * np.sin(2 * np.pi * T / 7.3))[:, None]

# ── konuşma (dokunulmaz) + kısma ──
konusma, sr = sf.read(sys.argv[2], dtype='float64'); assert sr == SR, sr
if konusma.ndim == 1: konusma = np.stack([konusma, konusma], 1)
K = np.zeros((N, 2)); K[:min(N, len(konusma))] = konusma[:N]
e = np.maximum(lp(np.abs(K.mean(1)), 8), 0); e = np.clip(20 * np.log10(e + 1e-6) + 46, 0, 22) / 22
g = np.empty(N); s = 0.0; a_, r_ = 1 - np.exp(-1 / (.05 * SR)), 1 - np.exp(-1 / (.45 * SR))
for i in range(0, N, 32): v = e[i]; s += (a_ if v > s else r_) * 32 * (v - s); g[i:i + 32] = s
g = np.clip(g, 0, 1)
ortam = ST * (1 - .5 * g)[:, None] + PED * (1 - .35 * g)[:, None]
ortam *= np.clip((SURE - T) / 1.2, 0, 1)[:, None] * np.clip(T / .6, 0, 1)[:, None]
miks = K + ortam; tepe = np.abs(miks).max()
if tepe > .98: print('UYARI: tepe', tepe, '— ortam seviyesini düşürün (konuşma ölçeklenmedi)'); ortam *= .98 / tepe; miks = K + ortam
sf.write(sys.argv[3], miks.astype(np.float32), SR, subtype='PCM_24')
if len(sys.argv) > 4: sf.write(sys.argv[4], ortam.astype(np.float32), SR, subtype='PCM_24')
def rms(x): return 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)
konus = g > .5; son = int(min(len(konusma) / SR, SURE) * SR)
print(f'konuşma RMS {rms(K[:son]):.1f} dB · ortam (konuşmada) {rms(ortam[konus]):.1f} dB · ortam (aralarda) {rms(ortam[~konus & (np.arange(N) < son)]):.1f} dB · kapanış {rms(ortam[son:]) if son < N else -99:.1f} dB · tepe {20*np.log10(np.abs(miks).max()):.1f} dBFS')
