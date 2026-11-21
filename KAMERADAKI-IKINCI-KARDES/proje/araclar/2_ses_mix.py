# -*- coding: utf-8 -*-
"""
KAMERADAKİ İKİNCİ KARDEŞ — 1. Bölüm
Adım 2: Ortam sesleri, efektler ve gerilim ambiyansını sentezler; diyaloglarla miksler.

Girdi : ses/diyalog_yerlesim.json + ses/diyalog/islenmis/*.wav  (1_diyalog_uret.py)
        animasyon/veri/yurume.js (ayak sesi zamanları — animasyonla aynı kaynak)
Çıktı : ses/bolum_01_ses.wav  (48 kHz, stereo, tam 150.000 sn, ~-15 LUFS)
        ses/efekt/*.wav  (ayrı katmanlar: ortam, efekt, muzik, diyalog)
"""
import json, os, re
import numpy as np
import soundfile as sf
from scipy import signal

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
SURE = 150.0
N = int(SURE * SR)
RNG = np.random.default_rng(2026)

def db(x): return 10 ** (x / 20)
def bos(): return np.zeros((2, N))
def zaman(t): return np.arange(int(t * SR)) / SR
def filt(x, tip, f, sira=2):
    if isinstance(f, (list, tuple)): f = [v / (SR / 2) for v in f]
    else: f = f / (SR / 2)
    b, a = signal.butter(sira, f, tip); return signal.lfilter(b, a, x)
def rezonans(x, f, q):
    b, a = signal.iirpeak(f / (SR / 2), q); return signal.lfilter(b, a, x)
def gurultu(n): return RNG.standard_normal(n)
def pembe(n):
    w = gurultu(n); b = [0.049922035, -0.095993537, 0.050612699, -0.004408786]; a = [1, -2.494956002, 2.017265875, -0.522189400]
    return signal.lfilter(b, a, w) * 6
def kahve(n): x = np.cumsum(gurultu(n)); x = filt(x, 'high', 20); return x / (np.std(x) + 1e-9)
def zarf(n, atak, birak):
    e = np.ones(n); a = min(n, int(atak * SR)); r = min(n - a, int(birak * SR))
    if a: e[:a] = np.linspace(0, 1, a)
    if r: e[-r:] = np.linspace(1, 0, r) ** 1.5
    return e
def ust_zarf(n, sure):  # üstel sönüm
    return np.exp(-np.arange(n) / SR / sure)
def norm(x, tepe=1.0):
    m = np.max(np.abs(x)) + 1e-12; return x / m * tepe
def yanki_ir(sure, sonum, parlak=0.5, tohum=1):
    r = np.random.default_rng(tohum); n = int(sure * SR); t = np.arange(n) / SR
    ir = r.standard_normal(n) * np.exp(-t * 6.9 / sonum)
    ir = filt(ir, 'low', 1200 + 8000 * parlak, 1); ir[:int(0.01 * SR)] *= np.linspace(0, 1, int(0.01 * SR))
    return ir / np.sqrt(np.sum(ir ** 2))
def yanki(x, sure=1.2, sonum=0.9, islak=0.3, parlak=0.4, tohum=3):
    w = signal.fftconvolve(x, yanki_ir(sure, sonum, parlak, tohum))
    y = np.zeros(len(w)); y[:len(x)] = x * (1 - islak * 0.4); return y + w * islak

def ekle(hedef, x, t, kazanc_db=0.0, pan=0.0):
    """Mono ya da stereo sesi t saniyesine yerleştirir. pan: -1 sol, +1 sağ."""
    i = int(round(t * SR)); g = db(kazanc_db)
    if x.ndim == 1:
        l = np.cos((pan + 1) * np.pi / 4) * np.sqrt(2); r = np.sin((pan + 1) * np.pi / 4) * np.sqrt(2)
        x = np.vstack([x * l, x * r])
    if i < 0: x = x[:, -i:]; i = 0
    n = min(x.shape[1], N - i)
    if n > 0: hedef[:, i:i + n] += x[:, :n] * g

# ======================= EFEKT SENTEZLERİ =======================
def saat_tik(tok=False):
    n = int(0.06 * SR); x = np.zeros(n); x[0] = 1; x[int(0.0012 * SR)] = -0.6
    y = rezonans(x, 3100 if not tok else 2600, 18) + 0.6 * rezonans(x, 5200, 25) + 0.3 * rezonans(x, 1400, 10)
    y *= ust_zarf(n, 0.009); return norm(filt(y, 'high', 700), 0.5)

def adim(zemin='tahta', guc=1.0, tohum=0):
    r = np.random.default_rng(tohum); n = int(0.28 * SR)
    g = r.standard_normal(n)
    gov = filt(g, 'low', 260 if zemin == 'tahta' else 160) * ust_zarf(n, 0.035)
    tik = filt(g, 'band', [1800, 5200]) * ust_zarf(n, 0.006) * (0.35 if zemin == 'tahta' else 0.06)
    cor = filt(r.standard_normal(n), 'band', [600, 2400]) * zarf(n, 0.02, 0.12) * (0.05 if zemin == 'tahta' else 0.08)
    y = gov * 1.6 + tik + cor
    if zemin == 'tahta' and r.random() < 0.5:   # ahşap gıcırtısı
        g2 = gicirti(0.18, 900 + 300 * r.random(), tohum=tohum + 5); y[:len(g2)] += 0.15 * g2
    return norm(y, 0.9 * guc)

def gicirti(sure, temel=700, tohum=1, hiz=(28, 55)):
    """Sürtünmeli ahşap gıcırtısı: değişken hızlı darbe dizisi + rezonanslar."""
    r = np.random.default_rng(tohum); n = int(sure * SR)
    t = np.arange(n) / SR
    f = np.interp(t, np.linspace(0, sure, 7), r.uniform(hiz[0], hiz[1], 7))
    f *= 1 + 0.25 * np.sin(2 * np.pi * 1.7 * t + r.random() * 6)
    faz = np.cumsum(f) / SR
    darbe = np.diff(np.floor(faz), prepend=0)
    darbe = darbe * (0.6 + 0.4 * r.random(n))
    y = np.zeros(n)
    for fr, q, g in [(temel, 14, 1.0), (temel * 1.62, 16, 0.7), (temel * 2.43, 18, 0.5), (temel * 3.9, 20, 0.3)]:
        y += g * rezonans(darbe, fr, q)
    y += 0.08 * filt(r.standard_normal(n), 'band', [400, 3000]) * (0.5 + 0.5 * np.sin(2 * np.pi * 3 * t))
    y *= zarf(n, 0.08, 0.25)
    return norm(y, 0.8)

def titresim(parcalar):
    """Telefon titreşimi: [(baş, son), ...] (göreli sn)"""
    son = max(b for a, b in parcalar) + 0.1; n = int(son * SR); t = np.arange(n) / SR
    m = 0.6 * np.sign(np.sin(2 * np.pi * 172 * t)) + 0.4 * np.sin(2 * np.pi * 344 * t)
    m *= 1 + 0.35 * np.sin(2 * np.pi * 23 * t)
    e = np.zeros(n)
    for a, b in parcalar:
        i, j = int(a * SR), int(b * SR); e[i:j] = zarf(j - i, 0.01, 0.03)
    y = filt(m * e, 'low', 1100, 2) + 0.15 * filt(gurultu(n), 'band', [2000, 6000]) * e
    return norm(y, 0.7)

def bip(f, sure, kare=False, sonum=None):
    n = int(sure * SR); t = np.arange(n) / SR
    y = np.sign(np.sin(2 * np.pi * f * t)) * 0.4 + np.sin(2 * np.pi * f * t) * 0.6 if kare else np.sin(2 * np.pi * f * t) + 0.18 * np.sin(4 * np.pi * f * t)
    y *= zarf(n, 0.004, 0.02) if sonum is None else ust_zarf(n, sonum) * zarf(n, 0.003, 0.01)
    return filt(y, 'low', 6000)

def bildirim_kamera():  # sahne 1: kısa elektronik bildirim
    y = np.zeros(int(0.42 * SR)); a = bip(1480, 0.08, kare=True); y[:len(a)] += a
    b = bip(1980, 0.09, kare=True); y[int(0.15 * SR):int(0.15 * SR) + len(b)] += b
    return norm(y, 0.6)

def bildirim_telefon(keskin=False):
    y = np.zeros(int(0.9 * SR))
    notalar = [(2093, 0.0), (2637, 0.09), (3136, 0.18)] if keskin else [(1318, 0.0), (1760, 0.13)]
    for f, t0 in notalar:
        s = bip(f, 0.5, sonum=0.11 if keskin else 0.16); i = int(t0 * SR); y[i:i + len(s)] += s[:len(y) - i]
    return norm(y, 0.7)

def dokunma():
    n = int(0.03 * SR); x = gurultu(n) * ust_zarf(n, 0.003); return norm(filt(x, 'band', [2500, 7000]), 0.35)

def vuus(sure=0.28, yukari=True):
    n = int(sure * SR); t = np.arange(n) / SR
    x = gurultu(n); out = np.zeros(n); seg = 256
    for i in range(0, n, seg):
        k = i / n; fc = 600 + 3500 * (k if yukari else 1 - k)
        out[i:i + seg] = filt(x[i:i + seg], 'band', [fc * 0.7, fc * 1.3], 1)
    return norm(out * np.sin(np.pi * t / sure), 0.35)

def kayit_acilis():
    n = int(0.16 * SR); t = np.arange(n) / SR
    f = 700 + 2200 * (t / 0.16) ** 1.5; y = np.sin(2 * np.pi * np.cumsum(f) / SR) * zarf(n, 0.005, 0.06)
    return norm(y, 0.4)

def parazit(sure, tohum=1, guc=1.0):
    r = np.random.default_rng(tohum); n = int(sure * SR); y = np.zeros(n); i = 0
    while i < n:
        L = int(r.uniform(0.012, 0.07) * SR); L = min(L, n - i)
        tur = r.random()
        if tur < 0.4:
            s = r.standard_normal(L); s = np.repeat(s[::r.integers(4, 18)], r.integers(4, 18))[:L]
            if len(s) < L: s = np.pad(s, (0, L - len(s)))
        elif tur < 0.7:
            tt = np.arange(L) / SR; s = np.sign(np.sin(2 * np.pi * r.uniform(300, 3200) * tt)) * 0.6
        elif tur < 0.85: s = filt(r.standard_normal(L), 'high', 4000) * 0.8
        else: s = np.zeros(L)
        y[i:i + L] = s * r.uniform(0.4, 1.0); i += L
    y = np.round(y * 6) / 6
    return norm(filt(y, 'low', 9000) * zarf(n, 0.003, 0.02), 0.8 * guc)

def kalp(vurus=2, aralik=0.95, tohum=1):
    tek = int(0.35 * SR); y = np.zeros(int((vurus * aralik + 0.6) * SR))
    for k in range(vurus):
        for j, (g, f) in enumerate([(1.0, 58), (0.7, 50)]):
            i = int((k * aralik + j * 0.27) * SR); t = np.arange(tek) / SR
            s = np.sin(2 * np.pi * f * t * (1 - 0.25 * t)) * ust_zarf(tek, 0.07) * g
            s += 0.15 * filt(gurultu(tek), 'low', 300) * ust_zarf(tek, 0.02)
            y[i:i + tek] += s[:len(y) - i]
    return norm(filt(y, 'low', 180), 0.9)

def araba(sure=3.0):
    n = int(sure * SR); t = np.arange(n) / SR
    env = np.exp(-((t - sure * 0.5) / (sure * 0.24)) ** 2)
    dop = 1 + 0.06 * np.tanh((sure * 0.5 - t) * 2)
    motor = sum(np.sin(2 * np.pi * 46 * k * np.cumsum(dop) / SR) / k for k in range(1, 6))
    las = filt(kahve(n), 'band', [90, 700])
    y = (0.35 * motor + las) * env
    y = filt(y, 'low', 900)
    pan = np.linspace(-0.8, 0.8, n)
    L = y * np.cos((pan + 1) * np.pi / 4); R = y * np.sin((pan + 1) * np.pi / 4)
    st = np.vstack([L, R]); return st / (np.max(np.abs(st)) + 1e-9) * 0.7

def cizirti(sure, tohum=4):  # lamba titreşimi elektrik sesi
    r = np.random.default_rng(tohum); n = int(sure * SR); t = np.arange(n) / SR
    v = np.sign(np.sin(2 * np.pi * 100 * t)) * 0.5 + np.sin(2 * np.pi * 300 * t) * 0.3
    kapi = (r.random(n // 400 + 1) > 0.35).repeat(400)[:n]
    y = (v + 0.6 * filt(r.standard_normal(n), 'high', 2500)) * kapi
    return norm(filt(y, 'low', 7000) * zarf(n, 0.005, 0.03), 0.6)

def nefes(sure, ic=True, parlak=1500, tohum=1):
    r = np.random.default_rng(tohum); n = int(sure * SR)
    x = filt(r.standard_normal(n), 'band', [parlak * 0.35, parlak * 2.2])
    x = rezonans(x, parlak, 2) * 0.5 + x
    e = np.sin(np.pi * np.linspace(0, 1, n)) ** (1.2 if ic else 2)
    return norm(x * e, 0.5)

def metal_ton(sure=2.0, f0=196):
    n = int(sure * SR); t = np.arange(n) / SR
    y = sum(g * np.sin(2 * np.pi * f0 * k * t + 2 * np.sin(2 * np.pi * 0.7 * t)) for k, g in [(1, 1), (2.76, 0.6), (5.4, 0.35), (8.93, 0.2), (13.3, 0.1)])
    y *= zarf(n, sure * 0.55, sure * 0.3) * (1 + 0.2 * np.sin(2 * np.pi * 5.5 * t))
    return norm(yanki(y, 2.0, 1.6, 0.5, 0.6, 7)[:n + int(1.5 * SR)], 0.6)

def tiz_ton(sure=1.8):
    n = int(sure * SR); t = np.arange(n) / SR
    y = np.sin(2 * np.pi * 3150 * t) + 0.7 * np.sin(2 * np.pi * 3236 * t) + 0.2 * np.sin(2 * np.pi * 6300 * t)
    y *= (t / sure) ** 1.6 * (1 + 0.3 * np.sin(2 * np.pi * 7 * t))
    y[-int(0.01 * SR):] *= np.linspace(1, 0, int(0.01 * SR))
    return norm(y, 0.5)

def derin_vurus():
    n = int(2.2 * SR); t = np.arange(n) / SR
    f = 52 * np.exp(-t * 1.2) + 26
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * ust_zarf(n, 0.55)
    tr = filt(gurultu(n), 'low', 1800) * ust_zarf(n, 0.04)
    y = sub + 0.5 * tr + 0.25 * np.tanh(sub * 3)
    y = yanki(y, 2.5, 2.2, 0.45, 0.25, 9)[:n]
    return norm(y, 1.0)

def kumas(sure, tohum=1):
    r = np.random.default_rng(tohum); n = int(sure * SR)
    x = filt(r.standard_normal(n), 'band', [900, 5500]) * (0.5 + 0.5 * np.abs(filt(r.standard_normal(n), 'low', 12)) * 3)
    return norm(x * zarf(n, sure * 0.3, sure * 0.5), 0.35)

def uzak_gumbur(tohum=1):
    r = np.random.default_rng(tohum); n = int(0.9 * SR)
    y = filt(r.standard_normal(n), 'low', 140) * ust_zarf(n, 0.12)
    return norm(yanki(y, 1.0, 0.7, 0.5, 0.1, tohum)[:n], 0.6)

# ======================= ORTAM KATMANLARI =======================
def ortam():
    O = bos()
    t = np.arange(N) / SR
    # gece rüzgârı (pencere dışında; salonda daha çok)
    for ch in range(2):
        w = filt(kahve(N), 'band', [120, 700]) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.07 * t + ch) * np.sin(2 * np.pi * 0.023 * t + 1))
        O[ch] += w * db(-47)
    # elektrik uğultusu (koridor lambası) — koridor zaman aralıklarında belirgin
    hum = (np.sin(2 * np.pi * 50 * t) + 0.5 * np.sin(2 * np.pi * 100 * t) + 0.25 * np.sin(2 * np.pi * 150 * t) + 0.12 * np.sin(2 * np.pi * 200 * t))
    hum *= 1 + 0.05 * np.sin(2 * np.pi * 0.3 * t)
    kor = np.interp(t, [0, 0.5, 9, 9.3, 68.8, 69.3, 98.8, 99.2, 118.8, 119.3, 148.0, 148.3, 150],
                       [0, 1, 1, 0.12, 0.12, 1, 1, 0.45, 0.45, 1, 1, 0, 0])
    O += hum * kor * db(-44)
    # kamera görüntüsü hışırtısı (tam ekran K1/K2)
    kam = np.interp(t, [0, 0.55, 0.6, 8.95, 9.0, 88.95, 89.0, 94.15, 94.2, 150], [0, 0, 1, 1, 0, 0, 1, 1, 0, 0])
    for ch in range(2): O[ch] += filt(gurultu(N), 'high', 3500) * kam * db(-46)
    # TV mırıltısı (salon; konuşma benzeri, boğuk)
    tv = filt(pembe(N), 'band', [250, 2200])
    hece = np.abs(filt(gurultu(N), 'low', 5)); hece = np.clip(hece * 3, 0, 1.4)
    tv = filt(tv * hece, 'low', 1500)
    sal = np.interp(t, [0, 9.0, 9.3, 68.8, 69.3, 98.8, 99.2, 118.8, 119.3, 148, 148.3, 150],
                       [0.15, 0.15, 1, 1, 0.25, 0.25, 0.55, 0.55, 0.2, 0.2, 0, 0])
    O[0] += tv * sal * db(-50); O[1] += tv * sal * db(-52)
    # duvar saati: her saniye (hikâye saati 23:17:05 + t → tam saniyelerde)
    tik, tok = saat_tik(), saat_tik(True)
    for s in range(1, 150):
        if 147.9 < s: break
        k = float(np.interp(s, [0, 9, 9.3, 29, 29.5, 39, 39.5, 68.8, 69.3, 98.8, 99.2, 118.8, 119.3, 150],
                               [0.35, 0.35, 1, 1, 1.7, 1.7, 1, 1, 0.3, 0.3, 0.6, 0.6, 0.22, 0.22]))
        if 58.6 < s < 60.9: k *= 0.4
        ekle(O, (tik if s % 2 else tok), s, 20 * np.log10(k) - 33, pan=-0.25)
    return O

# ======================= GERİLİM AMBİYANSI (müzik) =======================
def gerilim(dialog_zarf):
    t = np.arange(N) / SR
    yog = np.interp(t, [0, 0.6, 9, 9.4, 22, 39, 49, 58.55, 58.7, 59.5, 69, 74.6, 75, 76.6, 79, 89, 99, 109, 119, 128.8, 129.3, 139, 145, 145.3, 145.8, 147.7, 147.8, 150],
                       [0, 0.28, 0.3, 0.1, 0.12, 0.35, 0.55, 0.78, 0.04, 0.12, 0.3, 0.3, 0.12, 0.15, 0.35, 0.62, 0.7, 0.72, 0.8, 0.75, 0.22, 0.32, 0.85, 0.3, 0.75, 0.92, 0.0, 0.0])
    M = bos()
    # alçak küme (E1 civarı, uyumsuz)
    for ch, dt in [(0, 0.0), (1, 0.21)]:
        y = np.zeros(N)
        for f, g in [(41.2, 1.0), (43.65, 0.55), (61.7, 0.45), (82.4, 0.3), (87.3, 0.18)]:
            y += g * np.sin(2 * np.pi * (f + dt * (1 if f > 50 else 0)) * t + RNG.random() * 6)
        y *= 0.8 + 0.2 * np.sin(2 * np.pi * 0.11 * t + ch)
        M[ch] += y * 0.32
    # karanlık gürültü katmanı (yoğunlukla açılan filtre)
    for ch in range(2):
        g = kahve(N)
        alt = filt(g, 'band', [55, 220]); ust = filt(g, 'band', [220, 900])
        M[ch] += alt * 0.55 + ust * 0.25 * np.clip(yog - 0.4, 0, 1) * 2
    # yüksek, cam gibi uyumsuz tını (yoğunluk > 0.55)
    cam = (np.sin(2 * np.pi * 1318.5 * t) + 0.8 * np.sin(2 * np.pi * 1396.9 * t)) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.37 * t))
    for ch in range(2): M[ch] += cam * np.clip((yog - 0.55) * 2.2, 0, 1) * 0.035
    M *= yog ** 1.3
    # diyalog altında 4 dB kısma
    M *= 1 - (1 - db(-4)) * dialog_zarf
    return M * db(-17)

# ======================= ZAMANLANMIŞ EFEKTLER =======================
def efektler():
    E = bos()
    # --- Sahne 1 ---
    ekle(E, parazit(0.48, 1), 0.55, -14)
    ekle(E, gicirti(1.9, 640, tohum=11), 3.55, -20, pan=0.1)
    ekle(E, parazit(0.3, 2), 5.95, -15)
    ekle(E, bildirim_kamera(), 7.55, -20)
    # --- Sahne 2 ---
    ekle(E, titresim([(0.0, 0.42), (0.55, 0.95)]), 10.0, -16, pan=0.25)
    ekle(E, kumas(0.4, 1), 14.9, -32, pan=-0.3)
    # --- Sahne 3 ---
    ekle(E, dokunma(), 20.28, -18); ekle(E, vuus(0.3), 20.62, -26); ekle(E, kayit_acilis(), 20.95, -22)
    # --- Sahne 4 ---
    ekle(E, kumas(0.6, 2), 29.2, -30, pan=-0.2)
    ekle(E, uzak_gumbur(3), 33.6, -36, pan=0.6)
    # --- Sahne 5 ---
    ekle(E, dokunma(), 40.28, -18); ekle(E, vuus(0.32), 40.58, -26)
    ekle(E, parazit(0.12, 5, 0.5), 43.0, -30)
    ekle(E, kalp(2, 0.82, 1), 45.45, -12)
    # bas kabarması
    n = int(4.5 * SR); tt = np.arange(n) / SR
    bas = np.sin(2 * np.pi * 36 * tt) * (tt / 4.5) ** 2 * zarf(n, 0.01, 0.4); ekle(E, bas, 42.6, -16)
    # --- Sahne 6 ---
    ekle(E, kumas(0.5, 3), 49.1, -31, pan=0.25)
    ekle(E, parazit(0.34, 6), 58.3, -13)
    # --- Sahne 7 ---
    for k, ts in enumerate(adim_zamanlari('SES_adim')):
        ekle(E, yanki(adim('tahta', 0.8, 100 + k), 0.8, 0.5, 0.55, 0.2, 2)[:int(0.9 * SR)], ts, -24, pan=0.55)
    ekle(E, gicirti(0.35, 1100, tohum=21, hiz=(18, 30)), 61.7, -33, pan=0.6)
    ekle(E, kumas(1.2, 4), 64.0, -28, pan=0.2)
    # --- Sahne 8 ---
    ekle(E, cizirti(0.32), 70.55, -24)
    ekle(E, araba(3.0), 74.9, -31)
    # --- Sahne 9 ---
    ekle(E, titresim([(0.0, 0.4), (0.55, 0.95)]), 79.15, -15)
    ekle(E, bildirim_telefon(True), 79.2, -15)
    ekle(E, dokunma(), 81.0, -18); ekle(E, vuus(0.3, False), 81.33, -25)
    ekle(E, parazit(0.18, 8, 0.4), 82.5, -30)
    # --- Sahne 10 ---
    ekle(E, yanki(nefes(2.3, True, 700, 3), 1.6, 1.3, 0.6, 0.3, 4), 90.3, -27)
    ekle(E, parazit(0.4, 9), 93.5, -15)
    # --- Sahne 11 ---
    ekle(E, kalp(9, 1.0, 2), 99.6, -16)
    ekle(E, parazit(0.12, 10, 0.4), 106.0, -32)
    for k, ts in enumerate(np.arange(104.2, 109.2, 0.72)): ekle(E, nefes(0.45, k % 2 == 0, 1700, 30 + k), ts, -36, pan=-0.2)
    # --- Sahne 12 ---
    ekle(E, kumas(1.0, 5), 109.4, -30, pan=-0.2)
    ekle(E, tiz_ton(1.75), 117.25, -25)
    for k, ts in enumerate(np.arange(110.6, 118.5, 0.66)): ekle(E, nefes(0.4, k % 2 == 0, 1800, 60 + k), ts, -38)
    # --- Sahne 13 ---
    ekle(E, gicirti(2.7, 560, tohum=31, hiz=(14, 32)), 121.3, -18, pan=0.0)
    for k, ts in enumerate(np.arange(126.6, 129.0, 0.6)): ekle(E, nefes(0.38, k % 2 == 0, 1900, 90 + k), ts, -37, pan=0.2)
    # --- Sahne 14 ---
    ekle(E, gicirti(1.6, 600, tohum=41, hiz=(12, 26)), 129.0, -19)
    ekle(E, kumas(0.5, 6), 129.55, -29, pan=0.2)
    ekle(E, metal_ton(2.0, 196), 132.8, -19)
    for k, ts in enumerate(np.arange(137.3, 139.0, 0.55)): ekle(E, nefes(0.32, k % 2 == 0, 1300, 120 + k), ts, -37)
    # --- Sahne 15 ---
    ekle(E, kumas(0.7, 7), 139.2, -28)
    ekle(E, parazit(0.22, 12), 147.8, -12)
    ekle(E, parazit(0.12, 13, 0.6), 148.6, -18)
    ekle(E, derin_vurus(), 149.45, -9)
    # --- ayak sesleri (yurume.js ile eş zamanlı) ---
    for ad, Y in YURUME.items():
        if ad == 'SES_adim': continue
        uzak = ad.startswith('ARDA_salon')
        for k, ts in enumerate(adim_zamanlari(ad)):
            x = adim(Y['zemin'], 1.0, sum(map(ord, ad)) + k)
            kaz = -22 if Y['zemin'] == 'tahta' else -27
            if ad == 'ARDA_kor3': kaz = -19
            pan = 0.0
            if ad == 'DEFNE_salon': kaz = -29
            ekle(E, x, ts - 0.01, kaz, pan=pan)
    return E

def yurume_oku():
    s = open(os.path.join(KOK, 'animasyon', 'veri', 'yurume.js'), encoding='utf-8').read()
    j = s[s.index('{'):s.rindex('}') + 1]
    return json.loads(j)
YURUME = yurume_oku()
def adim_zamanlari(ad):
    Y = YURUME[ad]; d = (Y['t1'] - Y['t0']) / Y['adim']
    return [Y['t0'] + k * d for k in range(1, Y['adim'] + 1)]

# ======================= DİYALOG =======================
def diyalog():
    D = bos(); zarf_ = np.zeros(N)
    yer = json.load(open(os.path.join(KOK, 'ses', 'diyalog_yerlesim.json'), encoding='utf-8'))
    for r in yer:
        x, sr = sf.read(os.path.join(KOK, 'ses', 'diyalog', 'islenmis', r['dosya']))
        assert sr == SR
        if x.ndim > 1: x = x.mean(axis=1)
        # konuşma seviyesi: etkin RMS -> -20 dBFS (fısıltılar biraz daha alçak)
        aktif = x[np.abs(x) > 0.01]
        rms = np.sqrt(np.mean(aktif ** 2)) if len(aktif) else 0.1
        hedef = {'COCUK': -27, 'IKINCI': -22}.get(r['kim'], -20)
        if r['ortam'] == 'uzak': hedef -= 4
        g = db(hedef) / (rms + 1e-9)
        pan = 0.0
        if r['ortam'] == 'uzak': pan = -0.35
        if r['kim'] == 'COCUK':  # sol kulağa yakın fısıltı, sağda gecikmeli
            i = int(r['t'] * SR); n = min(len(x), N - i)
            D[0, i:i + n] += x[:n] * g * 1.15
            d = int(0.018 * SR)
            if i + d < N: D[1, i + d:i + d + n] += x[:max(0, min(n, N - i - d))] * g * 0.7
        else:
            ekle(D, x * g, r['t'], 0, pan)
        i = int(r['t'] * SR); n = min(len(x), N - i)
        e = np.abs(x[:n]) > 0.02
        zarf_[i:i + n] = np.maximum(zarf_[i:i + n], e)
    zarf_ = np.convolve(zarf_, np.ones(int(0.3 * SR)) / int(0.3 * SR), 'same')
    return D, np.clip(zarf_ * 1.5, 0, 1)

def main():
    import pyloudnorm as pyln
    os.makedirs(os.path.join(KOK, 'ses', 'efekt'), exist_ok=True)
    print('diyalog…'); D, dz = diyalog()
    print('ortam…'); O = ortam() * db(5)
    print('efektler…'); E = efektler()
    print('gerilim ambiyansı…'); M = gerilim(dz)
    # son: 148.7'den sonra sadece fısıltı + vuruş; 150'de tam sessizlik
    t = np.arange(N) / SR
    son = np.interp(t, [0, 148.65, 148.75, 150], [1, 1, 0, 0])
    O *= son; M *= son
    mix = D + O + E + M
    mix[:, -int(0.03 * SR):] *= np.linspace(1, 0, int(0.03 * SR))
    # ses yüksekliği (-15 LUFS) + tepe sınırlayıcı (-1.5 dBFS)
    from scipy.ndimage import minimum_filter1d
    meter = pyln.Meter(SR)
    for ad, x in [('diyalog', D), ('ortam', O), ('efekt', E), ('muzik', M)]:
        try: print(f'  katman {ad:8s} {meter.integrated_loudness(x.T):6.1f} LUFS')
        except Exception: pass
    lufs = meter.integrated_loudness(mix.T)
    kaz = -15.0 - lufs
    for _ in range(3):
        y = mix * db(kaz)
        thr = db(-1.5); env = np.max(np.abs(y), axis=0)
        g = np.minimum(1.0, thr / (env + 1e-12))
        w = int(0.006 * SR); g = minimum_filter1d(g, w); g = np.convolve(g, np.hanning(w) / np.hanning(w).sum(), 'same')
        g2 = np.minimum(1.0, g)
        y = y * g2
        son_l = meter.integrated_loudness(y.T); kaz += (-15.0 - son_l)
    mix = y
    print(f'LUFS önce {lufs:.1f} → sonra {meter.integrated_loudness(mix.T):.1f}, tepe {20*np.log10(np.max(np.abs(mix))):.2f} dBFS')
    for ad, x in [('diyalog', D), ('ortam', O), ('efekt', E), ('muzik', M)]:
        sf.write(os.path.join(KOK, 'ses', 'efekt', f'katman_{ad}.wav'), (x * db(kaz)).T.astype(np.float32), SR, subtype='FLOAT')
    sf.write(os.path.join(KOK, 'ses', 'bolum_01_ses.wav'), mix.T.astype(np.float32), SR, subtype='PCM_24')
    sf.write(os.path.join(KOK, 'ses', 'bolum_01_ses.flac'), mix.T.astype(np.float32), SR, subtype='PCM_24')
    print('Tamam → ses/bolum_01_ses.wav', mix.shape[1] / SR, 'sn')

if __name__ == '__main__':
    main()
