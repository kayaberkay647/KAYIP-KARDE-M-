# Replikleri işler (baş/son sessizlik + uzun iç duraklamaları kısaltır), sahne zamanlamasını kurar,
# ağız hareketi verisini çıkarır → zaman.js ; ses miksini yapar → .bolum_ses.wav
# Kullanım: python3 araclar/zamanla.py [--mix]
import json, os, sys, subprocess, array, math, wave
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR, FPS = 44100, 30
R = {r["id"]: r for r in json.load(open(f"{KOK}/replikler.json"))}
KORU = {"D18": 0.5, "D34": 0.55, "D35": 0.6}   # bu duraklamalar dramatik, korunur

TEMPO = 1.0    # 2. bölüm: duygu öncelikli, hızlandırma yok
def pcm(f):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-af", f"atempo={TEMPO}", "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"], capture_output=True).stdout
    return array.array("h", raw)

def isle(r):
    a = json.load(open(f"{KOK}/ses/{r['id']}_{r['k']}.json"))
    ch, s, e = a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]
    # v3 duygu etiketleri ([crying] vb.) konuşulmaz: hizalamada boşluk gibi say
    ic = False; ch = list(ch); etiket = set()
    for j, c0 in enumerate(ch):
        if c0 == "[": ic = True; etiket.add(j)
        if ic: ch[j] = " "
        if c0 == "]": ic = False
    s = [v / TEMPO for v in s]; e = [v / TEMPO for v in e]
    x = pcm(f"{KOK}/ses/{r['id']}_{r['k']}.mp3")
    # gerçek ses başlangıcı
    esik = 500; bas = next((i for i, v in enumerate(x) if abs(v) > esik), 0); bas = max(0, bas - int(.02 * SR))
    al = [j for j, c in enumerate(ch) if c.isalnum()]
    son = min(len(x), int((e[al[-1]] + .1) * SR))
    # kesilecek aralıklar (iç duraklamalar)
    kes = []; hedef = KORU.get(r["id"], .24)
    for p, q in zip(al, al[1:]):
        if q - p > 1 and any(p < j < q for j in etiket):   # hıçkırık/nefes: en fazla 1 sn, fazlası sonraki kelimeden hemen önce kesilir
            g0, g1 = e[p] + .05, s[q] - .08
            if g1 - g0 > 1.0: kes.append((g1 - (g1 - g0 - 1.0), g1))
        elif q - p > 1:
            g0, g1 = e[p] + .05, s[q] - .04
            if g1 - g0 > hedef + .06:
                # sessizliğin en sessiz kısmından kes
                orta = (g0 + g1) / 2; fazla = (g1 - g0) - hedef
                kes.append((orta - fazla / 2, orta + fazla / 2))
    kes.sort()
    def eslem(t):  # orijinal zaman → yeni zaman
        d = 0
        for k0, k1 in kes:
            if t >= k1: d += k1 - k0
            elif t > k0: d += t - k0
        return t - d - bas / SR
    y = array.array("h"); i = bas
    for k0, k1 in kes + [(son / SR, son / SR)]:
        j = int(k0 * SR); y.extend(x[i:j]); i = int(k1 * SR)
    # kesim yerlerinde tık olmasın: kısa fade
    n = len(y); fd = int(.01 * SR)
    for k in range(min(fd, n)): y[n - 1 - k] = int(y[n - 1 - k] * k / fd)
    # SES SEVİYESİ EŞİTLEME: konuşulan bölümlerin RMS'i her karakterde aynı hedefe (-17 dBFS)
    pen = int(.05 * SR); enerji = []
    for i0 in range(0, n - pen, pen):
        sg = y[i0:i0 + pen]; enerji.append(math.sqrt(sum(v * v for v in sg) / pen))
    esikE = max(enerji) * .18 if enerji else 0
    aktif = [v for v in enerji if v > esikE] or [1]
    rms = math.sqrt(sum(v * v for v in aktif) / len(aktif))
    kazanc = (32767 * 10 ** (-17 / 20)) / max(rms, 1)
    if r.get("tel"): kazanc *= .9
    lim = 32767 * 10 ** (-1.5 / 20)
    for i0 in range(n):  # yumuşak sınırlayıcı (tanh) — tepeler kırpılmaz, bükülür
        v = y[i0] * kazanc
        y[i0] = int(lim * math.tanh(v / lim)) if abs(v) > lim * .6 else int(v)
    out = f"{KOK}/ses_islenmis/{r['id']}.wav"; os.makedirs(os.path.dirname(out), exist_ok=True)
    w = wave.open(out, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes()); w.close()
    sure = len(y) / SR
    # ağız: her kare için açıklık (RMS) ve yuvarlaklık (harf)
    kareler = int(math.ceil(sure * FPS)) + 1; ac = []; yu = []
    zh = [(eslem(s[j]), eslem(e[j]), ch[j].lower()) for j in range(len(ch))]
    pik = max(1, max(abs(v) for v in y))
    for f in range(kareler):
        t = f / FPS; a0, a1 = int(max(0, t - .025) * SR), int(min(sure, t + .025) * SR)
        seg = y[a0:a1]; rms = math.sqrt(sum(v * v for v in seg) / max(1, len(seg))) / pik if seg else 0
        harf = next((c for (h0, h1, c) in zh if h0 <= t < h1), " ")
        o = min(1, rms * 4.2)
        if harf in "mbp": o *= .15
        if harf in " .,!?…'": o *= .6
        ac.append(round(o * 9)); yu.append(1 if harf in "oöuü" else 0)
    kel = []  # altyazı için kelime zamanları
    return {"sure": round(sure, 3), "ac": "".join(map(str, ac)), "yu": "".join(map(str, yu))}

# ---------------- ZAMAN ÇİZELGESİ ----------------
# ('S', no, nominal başlangıç) | ('L', id, önce_boşluk) | ('W', sn) | ('E', ad)
PLAN = [
  ("S", 1, 0), ("E", "vurus"), ("W", 1.5), ("E", "bakis"), ("W", .7), ("E", "murat_yuru"), ("W", 1.3), ("E", "kapi_ac"), ("W", .9),
  ("L", "D01", 0), ("L", "D02", .25), ("L", "D03", .25), ("W", .1), ("E", "kapi_kapan"), ("W", .45), ("E", "baslik"), ("W", 1.9),
  ("S", 2, 0), ("W", .35), ("L", "D04", 0), ("L", "D05", .25), ("L", "D06", .3), ("L", "D07", .3), ("W", .5),
  ("S", 3, 0), ("W", .45), ("L", "D08", 0), ("L", "D09", .3), ("L", "D10", .25), ("L", "D11", .3), ("L", "D12", .25), ("W", .1), ("E", "muzik_dus"), ("W", .6),
  ("S", 4, 0), ("W", .3), ("L", "D13", 0), ("L", "D14", .25), ("E", "zehra_gel"), ("W", .1), ("L", "D15", .1), ("L", "D16", .25), ("L", "D17", .25), ("W", .9),
  ("S", 5, 0), ("E", "anahtar_goster"), ("W", .8), ("L", "D18", 0), ("L", "D19", .25), ("L", "D20", .3), ("L", "D21", .25), ("L", "D22", .25), ("W", .15), ("E", "isaret"), ("W", 1.3),
  ("S", 6, 0), ("W", 1.5), ("L", "D23", 0), ("L", "D24", .25), ("W", .15), ("E", "kilit"), ("W", 1.3), ("E", "kapi_acil"), ("W", 1.3), ("L", "D25", 0), ("L", "D26", .25), ("W", .1), ("E", "flas"), ("W", .9),
  ("S", 7, 0), ("W", .5), ("L", "D27", 0), ("L", "D28", .3), ("L", "D29", .3), ("L", "D30", .3), ("L", "D31", .3), ("W", .5), ("E", "murat_don"), ("W", 1.3),
  ("S", 8, 0), ("W", .2), ("L", "D32", 0), ("L", "D33", .25), ("W", .15), ("E", "play"), ("W", .75), ("L", "D34", 0), ("W", .45), ("E", "donus"), ("W", .9),
  ("L", "D35", 0), ("W", .3), ("E", "derya_yakin"), ("W", 2.3), ("E", "karar"), ("W", 2.3), ("E", "bitis"),
]
NOMINAL = {1: 0, 2: 14, 3: 29, 4: 44, 5: 60, 6: 75, 7: 90, 8: 106}

veri = {k: isle(r) for k, r in R.items()}
t = 0; satir = []; ev = {}; sahne = {}
for it in PLAN:
    if it[0] == "S": sahne[it[1]] = round(t, 3)
    elif it[0] == "W": t += it[1]
    elif it[0] == "E": ev[it[1]] = round(t, 3)
    elif it[0] == "L":
        r = R[it[1]]; t += it[2]
        satir.append({"id": r["id"], "k": r["k"], "s": r["s"], "t": round(t, 3), "d": veri[r["id"]]["sure"],
                      "m": r.get("alt", r["m"]), "tel": 1 if r.get("kayit") else 0,
                      "ac": veri[r["id"]]["ac"], "yu": veri[r["id"]]["yu"]})
        t += veri[r["id"]]["sure"]
SURE = round(ev["bitis"], 3)
print("TOPLAM SÜRE:", SURE)
for k in sorted(sahne): print(f"  Sahne {k}: {sahne[k]:6.2f} (senaryo {NOMINAL[k]})")
open(f"{KOK}/zaman.js", "w").write("// zamanla.py tarafından üretildi — elle düzenleme\nconst SURE=%s, SAHNE=%s, EV=%s, REPLIK=%s;\n" % (
    SURE, json.dumps(sahne), json.dumps(ev), json.dumps(satir, ensure_ascii=False)))

# ---------------- SES MİKSİ ----------------
if "--mix" in sys.argv:
    E = lambda ad: f"{KOK}/efekt/{ad}.mp3"
    girdi, filt, etiket = [], [], []
    def gir(*a):
        girdi.extend(a); return sum(1 for x in girdi if x == "-i") - 1
    def ekle(dosya, t0, ses=1.0, ek="", dongu=False):
        i = gir(*((["-stream_loop", "-1"] if dongu else []) + ["-i", dosya]))
        lab = f"a{i}"; ms = int(max(0, t0) * 1000)
        filt.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo,{ek + ',' if ek else ''}volume={ses},adelay={ms}|{ms}[{lab}]")
        etiket.append(lab)
    # diyaloglar
    dlg = []
    for s in satir:
        # oda akustiği: kısa erken yansımalar (stüdyo kuruluğunu kırar) — telefon sesleri hariç
        # ses kaydı (Emir): küçük hoparlör + hafif bozulma
        ek = "highpass=f=380,lowpass=f=3600,acompressor=threshold=0.08:ratio=5,acrusher=bits=10:mix=0.25,volume=1.7" if s["tel"] else "highpass=f=70,aecho=0.85:0.6:19|33|52:0.13|0.09|0.05,acompressor=threshold=0.25:ratio=2.5:attack=8:release=120,volume=1.7"
        i = gir("-i", f"{KOK}/ses_islenmis/{s['id']}.wav"); ms = int(s["t"] * 1000)
        filt.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo,{ek + ',' if ek else ''}volume=1.0,adelay={ms}|{ms}[d{i}]"); dlg.append(f"d{i}")
    filt.append("".join(f"[{d}]" for d in dlg) + f"amix=inputs={len(dlg)}:normalize=0,apad=whole_dur={SURE}[dlg]")
    filt.append(f"[dlg]volume={os.environ.get('DLG_KAZANC', '1')},asplit=2[dlgA][dlgK]")
    # müzik (diyalog altında kısılır), finalde kesilir
    i = gir("-i", f"{KOK}/muzik.mp3")
    filt.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo,atrim=0:{SURE},volume='if(lt(t,{ev['karar'] - .3}),0.16,0)':eval=frame,afade=t=in:d=1.5[m0]")
    filt.append("[m0][dlgK]sidechaincompress=threshold=0.012:ratio=10:attack=30:release=600[muz]")
    S = lambda i: satir[[x["id"] for x in satir].index(i)]["t"]
    bod0, bod1 = sahne[6], sahne[7]
    # yağmur + sokak: salonda sürekli; bodrumda çok kısık; finalde kesilir
    ekle(E("yagmur"), 0, 1, f"atrim=0:{ev['karar']},volume='if(between(t,{bod0},{bod1}),0.05,0.2)':eval=frame,afade=t=out:st={ev['karar'] - .3:.3f}:d=0.3", dongu=True)
    ekle(E("sokak"), 0, 1, f"atrim=0:{ev['karar']},volume='if(between(t,{bod0},{bod1}),0.03,0.17)':eval=frame,afade=t=out:st={ev['karar'] - .3:.3f}:d=0.3", dongu=True)
    for k in (0, .55, 1.1): ekle(E("vurus3"), ev["vurus"] + .1 + k - .03, 1.0 + k * .1, "atrim=0:0.24,afade=t=out:st=0.17:d=0.07")
    ekle(E("vurgu"), ev["kapi_ac"] + .5, .3, "atrim=0:1.4,afade=t=out:st=0.8:d=0.6")
    ekle(E("adim_ic"), ev["murat_yuru"], .55)
    ekle(E("kapi_ac"), ev["kapi_ac"] + .2, .7)
    ekle(E("nefes_kadin"), ev["kapi_ac"] + .5, .18, "atrim=0:1.5,afade=t=out:st=1.0:d=0.5")
    ekle(E("yagmurluk"), ev["kapi_kapan"] - .4, .35)
    ekle(E("kapi_kapan"), ev["kapi_kapan"], .45)
    ekle(E("baslik"), ev["baslik"], .7)
    ekle(E("piyano"), sahne[3] + .2, .26, "afade=t=out:st=5.5:d=2")
    ekle(E("merdiven_kosu"), S("D14") + .1, .28, "atrim=0:2.6,afade=t=out:st=2.0:d=0.6")
    ekle(E("canta"), S("D14") + .6, .35)
    ekle(E("mutfak_kapi"), ev["zehra_gel"] - .3, .4)
    ekle(E("telsiz"), sahne[4] + 2, .1, "atrim=0:2.0,afade=t=out:st=1.5:d=0.5")
    ekle(E("anahtar_metal"), ev["anahtar_goster"], .5)
    ekle(E("yukselis"), S("D18") - .2, .35, "atrim=0:1.4,afade=t=out:st=0.9:d=0.5")
    ekle(E("koridor_adim"), ev["isaret"] + .2, .35)
    ekle(E("bodrum"), bod0 - .2, .5, f"atrim=0:{bod1 - bod0 + .3:.2f},afade=t=in:d=0.6,afade=t=out:st={bod1 - bod0 - .4:.2f}:d=0.7")
    ekle(E("merdiven_in"), bod0, .45, "atrim=0:1.6")
    ekle(E("kilit"), ev["kilit"] + .1, .8)
    ekle(E("metal_kapi"), ev["kapi_acil"], .55, "atrim=0:1.4,afade=t=out:st=0.9:d=0.5")
    ekle(E("deklansor"), ev["flas"], .7)
    ekle(E("piyano"), sahne[7] + .2, .18, "afade=t=out:st=6.5:d=2")
    ekle(E("adim_ic"), ev["murat_don"], .45)
    ekle(E("kayit_tik"), ev["play"] + .35, .7)
    ekle(E("kayit_cizirti"), ev["play"] + .45, .3, f"atrim=0:{S('D34') - ev['play'] + 3.2:.2f},afade=t=out:st={S('D34') - ev['play'] + 2.4:.2f}:d=0.6")
    ekle(E("yukselis"), ev["derya_yakin"] - .2, .45, "atrim=0:2.3,afade=t=out:st=2.0:d=0.3")
    ekle(E("final_vurgu"), ev["karar"] - .25, .75, "afade=t=out:st=0.6:d=0.25")
    filt.append("[dlgA][muz]" + "".join(f"[{e}]" for e in etiket) + f"amix=inputs={2 + len(etiket)}:normalize=0:weights='1 {" ".join([os.environ.get("FON_KAZANC", "1")] * (1 + len(etiket)))}',atrim=0:{SURE},alimiter=limit=0.95[out]")
    cmd = ["ffmpeg", "-v", "error", "-y"] + girdi + ["-filter_complex", ";".join(filt), "-map", "[out]", "-ar", "48000", os.environ.get("CIKTI_WAV", f"{KOK}/.bolum_ses.wav")]
    subprocess.run(cmd, check=True); print("Ses miksi hazır → .bolum_ses.wav")
