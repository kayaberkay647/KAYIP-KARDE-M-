"""Konuşma aralarındaki fon kalıntısını yumuşakça bastırır (konuşmanın kendisine dokunmaz).
Kullanım: python3 ara_kapisi.py girdi.wav whisper.json cikti.wav [aralik_kazanci_db=-14]
Konuşma bölgesi = (ASR kelime penceresi) ∩ (kısa süreli seviye > eşik); 40 ms ön, 180 ms arka tampon, 60 ms kosinüs geçiş."""
import sys, json, numpy as np, soundfile as sf
src, js, dst = sys.argv[1:4]; gap_db = float(sys.argv[4]) if len(sys.argv) > 4 else -14
a, sr = sf.read(src, dtype="float32"); mono = a.mean(1) if a.ndim > 1 else a
words = [w for s in json.load(open(js)) for w in s["words"]]
hop = int(sr * 0.01); n = len(mono) // hop
lvl = np.array([20*np.log10(np.sqrt((mono[i*hop:(i+1)*hop]**2).mean())+1e-9) for i in range(n)])
win = np.zeros(n, bool)
for w in words:
    win[max(0, int((w["s"]-0.25)*100)):min(n, int((w["e"]+0.35)*100))] = True
act = win & (lvl > -31)
# kapanış: 180 ms arka tampon, 40 ms ön tampon
k = act.copy()
for i in np.where(act)[0]:
    k[max(0, i-4):min(n, i+19)] = True
# 120 ms'den kısa boşlukları doldur
i = 0
while i < n:
    if not k[i]:
        j = i
        while j < n and not k[j]: j += 1
        if j - i < 12 and i > 0 and j < n: k[i:j] = True
        i = j
    else: i += 1
g = np.where(k, 1.0, 10**(gap_db/20))
# 60 ms kosinüs yumuşatma
ker = np.hanning(13); ker /= ker.sum(); g = np.convolve(g, ker, "same")
g = np.maximum(g, np.where(k, 1.0, 0))  # konuşma karelerinde kazanç tam 1
gs = np.interp(np.arange(len(mono)) / hop, np.arange(n) + 0.5, g).astype(np.float32)
out = a * (gs[:, None] if a.ndim > 1 else gs)
sf.write(dst, out, sr, subtype="PCM_24")
spans = []; i = 0
while i < n:
    if k[i]:
        j = i
        while j < n and k[j]: j += 1
        spans.append((round(i/100, 2), round(j/100, 2))); i = j
    else: i += 1
print("konuşma bölgeleri:", spans)
