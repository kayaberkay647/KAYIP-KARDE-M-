"""1dkdua — sahneye özel ortam sesleri + çok düşük seviyeli atmosfer pedi, konuşmanın altına karıştırılır.
Konuşma örneklerine dokunulmaz (hız, perde, seviye aynı); yalnızca altına ortam eklenir ve konuşma sırasında ortam kısılır.
Kullanım: python3 ortam_sesi.py konusma.wav cikti_miks.wav [cikti_ortam.wav]"""
import sys, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt

SR = 44100; SURE = 57.0; N = int(SR * SURE)
R = np.random.default_rng(1907)
T = np.arange(N) / SR

def db(x): return 10 ** (x / 20)
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'lowpass', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'highpass', fs=SR, output='sos'), x)
def norm(x): return x / (np.sqrt((x ** 2).mean()) + 1e-12)
def zarf(a, b, gir=.6, cik=.6):  # sahne penceresi (yumuşak giriş/çıkış)
    return np.clip((T - (a - gir / 2)) / gir, 0, 1) * np.clip(((b + cik / 2) - T) / cik, 0, 1)
def yavas(n_nokta, seed, hiz=.5):  # yavaş değişen 0..1 eğrisi
    r = np.random.default_rng(seed); k = np.linspace(0, SURE, int(SURE * hiz) + 2); v = r.random(len(k))
    return np.interp(T, k, v)
def pan(x, p):  # p: -1 sol .. 1 sağ
    a = (p + 1) * np.pi / 4; return np.stack([x * np.cos(a), x * np.sin(a)], 1)
def yerlestir(hedef, sinyal, t0, p=0.0):
    i = int(t0 * SR); s = pan(sinyal, p); j = min(len(hedef), i + len(s))
    if i < len(hedef): hedef[i:j] += s[:j - i]

ST = np.zeros((N, 2))

# ── Rüzgâr katmanları ──
beyaz = R.standard_normal(N)
ruzgar_alcak = norm(bp(beyaz, 120, 700)) * (0.55 + 0.45 * yavas(0, 3, .35))
ruzgar_yuksek = norm(bp(R.standard_normal(N), 900, 3500)) * (0.4 + 0.6 * yavas(0, 5, .5))
kum = norm(hp(R.standard_normal(N), 2500)) * (0.3 + 0.7 * yavas(0, 7, 1.2) ** 2)
oda = norm(lp(np.cumsum(R.standard_normal(N)) * .02 - lp(np.cumsum(R.standard_normal(N)) * .02, 20), 260))

def ruz(a, b, alc, yuk, kumd=-99, p=0.0):
    z = zarf(a, b)
    ST[:, 0] += z * (db(alc) * ruzgar_alcak + db(yuk) * ruzgar_yuksek + db(kumd) * kum) * (1 - .15 * p)
    ST[:, 1] += z * (db(alc) * np.roll(ruzgar_alcak, 4410) + db(yuk) * np.roll(ruzgar_yuksek, 3000) + db(kumd) * np.roll(kum, 2205)) * (1 + .15 * p)

ruz(0, 6.5, -40, -50)            # A tepe
ST += pan(zarf(6.5, 12.9) * db(-50) * oda, 0)  # oda tonu
ruz(6.5, 12.9, -58, -66)
ruz(12.9, 17.0, -37, -48)        # çöplük, akşam rüzgârı
ruz(17.0, 23.3, -46, -56)        # avlu
ruz(23.3, 27.6, -36, -46, -42)   # çöl
ruz(27.6, 31.6, -42, -54)        # yol
ST += pan(zarf(31.6, 37.5) * db(-52) * oda, 0)  # medrese
ruz(37.5, 44.9, -44, -54)        # şafak
ruz(44.9, SURE + 1, -46, -58)    # gece

# ── Kuşlar ──
def kus_cagri(f0, n, r):
    parca = []
    for k in range(n):
        d = .05 + r.random() * .09; t = np.arange(int(d * SR)) / SR
        f = f0 * (1 + .25 * np.sin(np.pi * t / d) * (1 if r.random() < .5 else -1)) * (1 + .1 * r.random())
        x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2
        parca += [x, np.zeros(int((.03 + r.random() * .08) * SR))]
    return np.concatenate(parca)
def kuslar(a, b, yogun, seviye, seed, uzak=False):
    r = np.random.default_rng(seed); t = a
    while t < b:
        x = kus_cagri(2600 + r.random() * 2600, 2 + int(r.random() * 4), r)
        if uzak: x = lp(x, 3500)
        yerlestir(ST, x * db(seviye - r.random() * 6), t, r.random() * 1.6 - .8)
        t += yogun * (.5 + r.random())
kuslar(0.3, 6.2, 1.1, -44, 11)
kuslar(6.6, 12.6, 1.8, -54, 12, uzak=True)
kuslar(17.1, 20.8, 1.0, -45, 13)
kuslar(37.6, 44.6, .8, -42, 14)

# ── Koyun çanı (A) ──
def can(f0, sure=.9):
    t = np.arange(int(sure * SR)) / SR
    return sum(a * np.sin(2 * np.pi * f0 * k * t) * np.exp(-t * d) for k, a, d in [(1, 1, 5), (2.76, .5, 8), (5.4, .25, 12)])
r = np.random.default_rng(21)
for t0 in [0.8, 1.9, 2.6, 3.9, 4.7, 5.6]:
    yerlestir(ST, can(1250 + r.random() * 300) * db(-50 - r.random() * 4), t0 + r.random() * .3, .3 + r.random() * .4)

# ── Kumaş hışırtısı (C) ──
for t0, d in [(10.7, .5), (11.25, .7), (12.0, .4)]:
    n = int(d * SR); x = bp(R.standard_normal(n), 1500, 6000) * np.hanning(n) * (0.5 + 0.5 * np.abs(np.sin(np.linspace(0, 9, n))))
    yerlestir(ST, norm(x) * db(-47), t0, .35)

# ── Karga (D) ──
def karga(sure=.32):
    t = np.arange(int(sure * SR)) / SR; f = 520 - 120 * t / sure
    saw = 2 * ((np.cumsum(f) / SR) % 1) - 1
    x = saw * (0.6 + 0.4 * R.standard_normal(len(t)))
    x = bp(x, 700, 1700) + .6 * bp(x, 2000, 3200)
    return norm(x) * np.sin(np.pi * t / sure) ** .7
yerlestir(ST, karga() * db(-41), 12.95, -.3); yerlestir(ST, karga(.28) * db(-43), 13.35, -.3)
yerlestir(ST, karga(.36) * db(-44), 16.4, .4)
# sinek vızıltısı
n = int(4.1 * SR); tt = np.arange(n) / SR
vz = np.sin(2 * np.pi * (210 + 15 * np.sin(2 * np.pi * 3 * tt)) * tt) * (0.5 + 0.5 * np.sin(2 * np.pi * .7 * tt) ** 2)
yerlestir(ST, lp(vz + .3 * np.sign(vz), 1500) * np.hanning(n) * db(-56), 12.9, .2)

# ── Çeşme (E), kapı ──
cesme = np.zeros(N)
r = np.random.default_rng(31)
for t0 in np.arange(16.6, 21.6, .012):
    if r.random() < .5:
        d = int((.004 + r.random() * .012) * SR); i = int((t0 + r.random() * .01) * SR)
        cesme[i:i + d] += R.standard_normal(d) * np.exp(-np.linspace(0, 6, d)) * r.random()
cesme = bp(cesme, 1800, 7000) + .4 * bp(R.standard_normal(N), 400, 1200) * .02
ST += pan(norm(cesme) * zarf(17.0, 21.3, .6, 1.2) * db(-47), -.45)
def gicirti(sure=.45):
    t = np.arange(int(sure * SR)) / SR; f = 260 + 180 * t / sure + 30 * np.sin(2 * np.pi * 23 * t)
    saw = 2 * ((np.cumsum(f) / SR) % 1) - 1; return bp(saw, 400, 2500) * np.sin(np.pi * t / sure)
yerlestir(ST, norm(gicirti()) * db(-50), 19.95, .05)
tt = np.arange(int(.35 * SR)) / SR
yerlestir(ST, (np.sin(2 * np.pi * 70 * tt) * np.exp(-tt * 18) + .3 * lp(R.standard_normal(len(tt)), 600) * np.exp(-tt * 30)) * db(-36), 20.92, .05)
# zamanın akışı: yükselip alçalan rüzgâr süpürmesi
n = int(2.4 * SR); x = R.standard_normal(n); out = np.zeros(n)
for k in range(24):
    a, b = k * n // 24, (k + 1) * n // 24; c = 300 + 1700 * np.sin(np.pi * k / 23)
    out[a:b] = bp(x, c * .7, c * 1.4)[a:b]
yerlestir(ST, norm(out) * np.hanning(n) * db(-44), 20.75, 0)

# ── Karun: saray belirirken cam gibi ışıltı ──
def ped(notalar, a, b, seviye, gir=1.2, cik=1.2, parlak=900, p=0):
    z = np.clip((T - a) / gir, 0, 1) * np.clip((b - T) / cik, 0, 1)
    x = np.zeros(N)
    for f in notalar:
        for det in (-.0035, .0035):
            ph = 2 * np.pi * f * (1 + det) * T
            x += np.sin(ph) + .35 * np.sin(2 * ph) + .15 * np.sin(3 * ph)
    x = lp(x, parlak) * z
    ST[:, 0] += norm(x[z > 0]).mean() * 0 + x * db(seviye) / (np.sqrt((x[z > .5] ** 2).mean()) + 1e-9) * (1 - .2 * p)
    ST[:, 1] += np.roll(x, 300) * db(seviye) / (np.sqrt((x[z > .5] ** 2).mean()) + 1e-9) * (1 + .2 * p)
ped([659.3, 987.8, 1318.5, 1975.5], 24.3, 26.9, -48, gir=.7, cik=.9, parlak=4000)
def isilti(a, b, yogun, seviye, seed):
    r = np.random.default_rng(seed); t = a
    while t < b:
        f = 2200 + r.random() * 3200; tt = np.arange(int(.5 * SR)) / SR
        yerlestir(ST, np.sin(2 * np.pi * f * tt) * np.exp(-tt * 9) * db(seviye - r.random() * 6), t, r.random() * 1.4 - .7)
        t += yogun * (.4 + r.random())
isilti(26.1, 26.9, .08, -50, 41)
isilti(29.7, 31.5, .07, -49, 42)
isilti(35.4, 37.2, .12, -52, 43)

# ── Cırcır böcekleri (gece / medrese dışı) ──
def circir(a, b, seviye, seed, n=4):
    r = np.random.default_rng(seed); top = np.zeros(N)
    for k in range(n):
        f = 4300 + r.random() * 900; oran = .45 + r.random() * .4; faz = r.random()
        darbe = (np.sin(2 * np.pi * 32 * T) > .3).astype(float) * (((T / oran + faz) % 1) < .22)
        top += lp(darbe, 200) * np.sin(2 * np.pi * f * T) * db(-r.random() * 6)
    z = zarf(a, b, 1.2, 1.2); top = hp(top, 2500) * z
    ST[:, 0] += top * db(seviye) / (np.sqrt((top[z > .5] ** 2).mean()) + 1e-9)
    ST[:, 1] += np.roll(top, 1500) * db(seviye) / (np.sqrt((top[z > .5] ** 2).mean()) + 1e-9)
circir(29.8, 31.6, -58, 51, 2)
circir(31.6, 37.5, -56, 52, 3)
circir(44.9, SURE + 1, -47, 53, 5)
# baykuş (kapanışta, konuşma bitince)
def baykus():
    parca = []
    for d, f in [(.32, 410), (.12, 0), (.5, 395)]:
        tt = np.arange(int(d * SR)) / SR
        parca.append(np.sin(2 * np.pi * (f - 25 * tt / d) * tt) * np.sin(np.pi * tt / d) ** 1.5 if f else np.zeros(len(tt)))
    return np.concatenate(parca)
yerlestir(ST, baykus() * db(-46), 53.2, -.6)

# ── Adım sesleri (görüntüdeki yürüyüşle aynı formüller) ──
ADIM_K = .35 * 2 / np.pi
def ease_s(x): x = np.clip(x, 0, 1); return x * x * (3 - 2 * x)
def adim_zamanlari(faz_fn, a, b):
    ts = np.arange(a, b, 1 / 600); ph = np.array([faz_fn(t) for t in ts]); k = np.floor((ph - np.pi / 2) / np.pi)
    return ts[1:][np.diff(k) > 0]
def adim(seviye, p, parlak=900):
    n = int(.09 * SR); tt = np.arange(n) / SR
    x = lp(R.standard_normal(n), parlak) * np.exp(-tt * 45) + .7 * np.sin(2 * np.pi * 95 * tt) * np.exp(-tt * 38)
    return x * db(seviye)
faz_E = lambda t: ease_s((t - 19.3) / 1.4) * 5.6 / ADIM_K
for t0 in adim_zamanlari(faz_E, 19.35, 20.55): yerlestir(ST, adim(-40, -.1, 1400), t0)
def faz_I(t):
    u = np.clip((t - 41.15) / 3.75, 0, 1); uu = .02 + (.66 - .02) * (u * .55 + ease_s(u) * .45); return uu * 140 / ADIM_K
for t0 in adim_zamanlari(faz_I, 41.2, 44.9):
    u = (t0 - 41.2) / 3.7; yerlestir(ST, adim(-37 - 10 * u, -.5 + .6 * u), t0)
for t0 in np.arange(27.75, 31.4, np.pi / 6.4): yerlestir(ST, adim(-50 - 8 * (t0 - 27.7) / 3.7, .05, 700), t0)

# ── Atmosfer pedi (çok düşük; sahneye göre akor) ──
akorlar = [(0, 6.5, [146.8, 220.0, 329.6, 370.0]), (6.5, 12.9, [146.8, 220.0, 293.7, 370.0]), (12.9, 17.0, [146.8, 174.6, 220.0, 293.7]),
           (17.0, 21.0, [196.0, 246.9, 293.7, 392.0]), (21.0, 23.3, [164.8, 196.0, 246.9, 329.6]), (23.3, 27.6, [146.8, 174.6, 220.0, 261.6]),
           (27.6, 31.6, [116.5, 174.6, 233.1, 293.7]), (31.6, 37.5, [146.8, 220.0, 293.7, 370.0]), (37.5, 44.9, [146.8, 220.0, 329.6, 440.0]),
           (44.9, 50.2, [146.8, 220.0, 293.7, 329.6]), (50.2, SURE + 2, [146.8, 220.0, 293.7, 370.0, 440.0])]
ped_top = np.zeros((N, 2)); yedek = ST; ST = ped_top
for a, b, nt in akorlar: ped(nt, a - .6, b + .6, -40 if a < 50 else -35, gir=1.2, cik=1.2, parlak=850)
ST = yedek
ped_top *= (0.85 + .15 * np.sin(2 * np.pi * T / 7.3))[:, None]

# ── Konuşma: olduğu gibi; ortam konuşma sırasında kısılır ──
konusma, sr = sf.read(sys.argv[1], dtype='float64')
assert sr == SR, sr
if konusma.ndim == 1: konusma = np.stack([konusma, konusma], 1)
K = np.zeros((N, 2)); K[:len(konusma)] = konusma[:N]
e = np.abs(K.mean(1)); e = np.maximum(lp(e, 8), 0)
e = np.clip(20 * np.log10(e + 1e-6) + 46, 0, 22) / 22  # 0..1
# hızlı tepki, yavaş bırakma
g = np.empty(N); s = 0.0; a_, r_ = 1 - np.exp(-1 / (.05 * SR)), 1 - np.exp(-1 / (.45 * SR))
for i in range(0, N, 32):
    v = e[i]; s += (a_ if v > s else r_) * 32 * (v - s); g[i:i + 32] = s
g = np.clip(g, 0, 1)
kis = (1 - .5 * g)[:, None]          # ortam: konuşmada ~6 dB kısılır
ortam = ST * kis + ped_top * (1 - .35 * g)[:, None]
# bitişte sessizliğe in
son = np.clip((SURE - T) / 1.2, 0, 1)[:, None]; ortam *= son
ortam *= np.clip(T / .6, 0, 1)[:, None]
miks = K + ortam
tepe = np.abs(miks).max()
if tepe > .98: miks *= .98 / tepe; print('uyarı: tepe sınırlandı', tepe)
sf.write(sys.argv[2], miks.astype(np.float32), SR, subtype='PCM_24')
if len(sys.argv) > 3: sf.write(sys.argv[3], ortam.astype(np.float32), SR, subtype='PCM_24')
def rms(x): return 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)
konus = g > .5
print(f'konuşma RMS {rms(K[:int(50*SR)]):.1f} dB · ortam (konuşma sırasında) {rms(ortam[konus]):.1f} dB · ortam (aralarda) {rms(ortam[~konus & (T < 50)]):.1f} dB · kapanış ortamı {rms(ortam[T > 50.5]):.1f} dB · tepe {20*np.log10(np.abs(miks).max()):.1f} dBFS')
