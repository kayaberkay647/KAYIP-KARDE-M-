"""Whisper kelime zamanlarını düzeltilmiş Türkçe metinle eşleştirir, kelime başlangıçlarını
ses enerjisine göre hassaslaştırır ve altyazı satırlarını (pano) üretir.
Kullanım: python3 zaman_cizelgesi.py whisper.json temiz_konusma.wav satirlar.txt cikti.json
satirlar.txt: her satır bir altyazı panosu; kelime sayısı ASR kelimeleriyle "|" birleştirme ipuçlarıyla eşleşir.
  Biçim:  görünen metin  ::  ASR kelime sayısı listesi (görünen kelime başına kaç ASR kelimesi; boşsa hepsi 1)"""
import sys, json, re, numpy as np, soundfile as sf
wj, wav, lines_p, out_p = sys.argv[1:5]
asr = [w for s in json.load(open(wj)) for w in s["words"]]
skip = set(json.loads(open(lines_p).readline().split("SKIP:")[1])) if open(lines_p).readline().startswith("#SKIP:") else set()
asr = [w for i, w in enumerate(asr) if i not in skip]
a, sr = sf.read(wav, dtype="float32"); a = a.mean(1) if a.ndim > 1 else a
hop = sr // 100; lvl = np.array([20*np.log10(np.sqrt((a[i*hop:(i+1)*hop]**2).mean())+1e-9) for i in range(len(a)//hop)])
# Konuşma bölgeleri (seviye > -31 dB, 120 ms'den kısa boşluklar birleşik)
act = lvl > -31; spans = []; i = 0
while i < len(act):
    if act[i]:
        j = i
        while j < len(act) and (act[j] or (j + 12 < len(act) and act[j:j+12].any())): j += 1
        spans.append((i/100, j/100)); i = j
    else: i += 1
def refine(s, e):
    # Whisper duraksamayı kelimeye katarsa: kelime içinde, en az 250 ms sessizlikten sonra başlayan bölge = gerçek başlangıç
    for (b0, b1), prev in zip(spans, [(-1, -1)] + spans[:-1]):
        if s + 0.1 < b0 <= e and b0 - prev[1] > 0.25: return round(b0, 3)
    i0, i1 = int(s*100), max(int(s*100)+1, int(e*100) - 6)
    for i in range(i0, min(i1, len(lvl))):
        if lvl[i] > -34: return round(max(s, i/100 - 0.02), 3)
    return s
lines = []; k = 0
for raw in open(lines_p, encoding="utf-8"):
    raw = raw.rstrip("\n")
    if not raw.strip() or raw.startswith("#"): continue
    text, _, spec = raw.partition("::")
    disp = text.split(); cnt = [int(x) for x in spec.split()] if spec.strip() else [1]*len(disp)
    assert len(cnt) == len(disp), raw
    words = []
    for d, c in zip(disp, cnt):
        grp = asr[k:k+c]; k += c
        s, e = grp[0]["s"], grp[-1]["e"]
        m = re.fullmatch(r"(.*)\{([\d.]+)\}", d)  # elle düzeltme: kelime{saniye}
        st = float(m.group(2)) if m else refine(s, e); d = m.group(1) if m else d
        words.append({"m": d, "s": st, "e": round(e, 3), "asr": "".join(g["w"] for g in grp).strip()})
    disp = [w["m"] for w in words]
    lines.append({"metin": " ".join(disp), "kelimeler": words, "bas": words[0]["s"], "son": words[-1]["e"]})
assert k == len(asr), f"eşleşmeyen ASR kelimesi: {len(asr)-k}"
json.dump({"satirlar": lines}, open(out_p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
# Konuşan karakterin ağzı için 50 Hz ses zarfı + tarayıcıya gömülü .js
hz = 50; hp_ = sr // hz; zz = np.array([np.sqrt((a[i*hp_:(i+1)*hp_]**2).mean()) for i in range(len(a)//hp_)])
zz = np.convolve(np.clip((20*np.log10(zz+1e-9)+40)/28, 0, 1), [.25, .5, .25], "same")
veri = {"satirlar": lines, "zarf": [round(float(x), 2) for x in zz], "zarfHz": hz, "sesSuresi": round(len(a)/sr, 3)}
open(out_p.rsplit(".", 1)[0] + ".js", "w", encoding="utf-8").write("// Otomatik üretildi: araclar/zaman_cizelgesi.py\nwindow.ZAMAN = " + json.dumps(veri, ensure_ascii=False) + ";\n")
for l in lines:
    print(f"[{l['bas']:6.2f} → {l['son']:6.2f}] {l['metin']}")
    print("      " + "  ".join(f"{w['m']}@{w['s']:.2f}" + (f"(asr:{w['asr']})" if w['asr'].lower().strip('.,?!') != w['m'].lower().strip('.,?!:“”') else "") for w in l["kelimeler"]))
