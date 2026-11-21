# Replikleri işler (baş/son sessizlik + uzun iç duraklamaları kısaltır), sahne zamanlamasını kurar,
# ağız hareketi verisini çıkarır → zaman.js ; ses miksini yapar → .bolum_ses.wav
# Kullanım: python3 araclar/zamanla.py [--mix]
import json, os, sys, subprocess, array, math, wave
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR, FPS = 44100, 30
R = {r["id"]: r for r in json.load(open(f"{KOK}/replikler.json"))}
KORU = {"R14": 0.55, "R35": 0.62, "R05": 0.45, "R27": 0.4, "R23": 0.35}   # bu duraklamalar dramatik, korunur

def pcm(f):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"], capture_output=True).stdout
    return array.array("h", raw)

def isle(r):
    a = json.load(open(f"{KOK}/ses/{r['id']}_{r['k']}.json"))
    ch, s, e = a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]
    x = pcm(f"{KOK}/ses/{r['id']}_{r['k']}.mp3")
    # gerçek ses başlangıcı
    esik = 500; bas = next((i for i, v in enumerate(x) if abs(v) > esik), 0); bas = max(0, bas - int(.02 * SR))
    al = [j for j, c in enumerate(ch) if c.isalnum()]
    son = min(len(x), int((e[al[-1]] + .1) * SR))
    # kesilecek aralıklar (iç duraklamalar)
    kes = []; hedef = KORU.get(r["id"], .24)
    for p, q in zip(al, al[1:]):
        if q - p > 1:
            g0, g1 = e[p] + .05, s[q] - .04
            if g1 - g0 > hedef + .06:
                # sessizliğin en sessiz kısmından kes
                orta = (g0 + g1) / 2; fazla = (g1 - g0) - hedef
                kes.append((orta - fazla / 2, orta + fazla / 2))
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
  ("S", 1, 0), ("E", "vurgu"), ("W", .35), ("L", "R01", 0), ("L", "R02", .22), ("L", "R03", .22), ("W", .1), ("E", "baslik"), ("W", 1.8),
  ("S", 2, 0), ("E", "s2_yuru"), ("W", .45), ("L", "R04", 0), ("W", .25), ("E", "arama"), ("W", 2.3), ("E", "cevapsiz"), ("W", .35), ("L", "R05", 0), ("W", .15), ("E", "kapi_pan"), ("W", 1.3),
  ("S", 3, 0), ("E", "zehra_gel"), ("W", .6), ("L", "R06", 0), ("L", "R07", .15), ("L", "R08", .15), ("L", "R09", .15), ("L", "R10", .15), ("W", .2),
  ("S", 4, 0), ("E", "murat_gel"), ("W", .55), ("L", "R11", 0), ("L", "R12", .15), ("L", "R13", .15), ("L", "R14", .15), ("L", "R15", .15), ("L", "R16", .15), ("W", .25),
  ("S", 5, 0), ("E", "gecmis"), ("W", .5), ("L", "R17", 0), ("L", "R18", .15), ("E", "golge"), ("L", "R19", .15), ("L", "R20", .15), ("W", .05), ("E", "kesildi"), ("W", .9), ("E", "donus"), ("W", .3),
  ("S", 6, 0), ("E", "anahtar_gor"), ("W", .4), ("L", "R21", 0), ("L", "R22", .15), ("L", "R23", .15), ("L", "R24", .15), ("L", "R25", .15), ("W", .05), ("E", "torbaya"), ("W", .4),
  ("S", 7, 0), ("E", "memur_gel"), ("W", .45), ("L", "R26", 0), ("L", "R27", .25), ("L", "R28", .15), ("L", "R29", .15), ("L", "R30", .15), ("L", "R31", .15), ("W", .2),
  ("S", 8, 0), ("E", "sonra"), ("W", .7), ("L", "R32", 0), ("L", "R33", .15), ("L", "R34", .15), ("L", "R35", .15), ("W", .2), ("E", "vurus"), ("W", 1.45), ("E", "karar"), ("W", 1.9), ("E", "bitis"),
]
NOMINAL = {1: 0, 2: 14, 3: 29, 4: 44, 5: 60, 6: 76, 7: 91, 8: 107}

veri = {k: isle(r) for k, r in R.items()}
t = 0; satir = []; ev = {}; sahne = {}
for it in PLAN:
    if it[0] == "S": sahne[it[1]] = round(t, 3)
    elif it[0] == "W": t += it[1]
    elif it[0] == "E": ev[it[1]] = round(t, 3)
    elif it[0] == "L":
        r = R[it[1]]; t += it[2]
        satir.append({"id": r["id"], "k": r["k"], "s": r["s"], "t": round(t, 3), "d": veri[r["id"]]["sure"],
                      "m": r.get("alt", r["m"]), "tel": 1 if (r["k"] == "GOREVLI" or r["id"] in ("R18", "R20")) else 0,
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
        ek = "highpass=f=320,lowpass=f=3300,acompressor=threshold=0.1:ratio=4,volume=1.25" if s["tel"] else ""
        if s["s"] == 5 and s["k"] == "EMIR": ek = "aecho=0.8:0.5:40:0.18"
        i = gir("-i", f"{KOK}/ses_islenmis/{s['id']}.wav"); ms = int(s["t"] * 1000)
        filt.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo,{ek + ',' if ek else ''}volume=1.0,adelay={ms}|{ms}[d{i}]"); dlg.append(f"d{i}")
    filt.append("".join(f"[{d}]" for d in dlg) + f"amix=inputs={len(dlg)}:normalize=0,apad=whole_dur={SURE}[dlg]")
    filt.append("[dlg]asplit=2[dlgA][dlgK]")
    # müzik (diyalog altında kısılır), finalde kesilir
    i = gir("-i", f"{KOK}/muzik.mp3")
    filt.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo,atrim=0:{SURE},volume='if(lt(t,{ev['vurus'] - .4}),0.30,0)':eval=frame,afade=t=in:d=1.5[m0]")
    filt.append("[m0][dlgK]sidechaincompress=threshold=0.02:ratio=6:attack=40:release=500[muz]")
    # yağmur: sürekli, finalde kesilir
    ekle(E("yagmur"), 0, 1, f"atrim=0:{ev['karar']},volume='if(lt(t,{sahne[2]}),0.55,if(lt(t,{sahne[5]}),0.32,if(lt(t,{ev['donus']}),0.2,0.3)))':eval=frame,afade=t=out:st={ev['karar'] - .3:.3f}:d=0.3", dongu=True)
    ekle(E("vurgu"), ev["vurgu"], .9)
    ekle(E("nefes"), .35, .55)
    ekle(E("baslik"), ev["baslik"], .8)
    ekle(E("adim_ic"), ev["s2_yuru"], .6)
    # cevapsız arama tonu (450 Hz, 1 sn çal / 1.2 sn bekle)
    i = gir("-f", "lavfi", "-i", "sine=f=450:d=2.3:sample_rate=44100")
    a0 = int(ev["arama"] * 1000)
    filt.append(f"[{i}:a]aformat=channel_layouts=stereo,volume='if(lt(mod(t,2.2),1.0),0.09,0)':eval=frame,highpass=f=300,lowpass=f=3400,adelay={a0}|{a0}[ring]"); etiket.append("ring")
    ekle(E("tiktak"), ev["kapi_pan"] - .6, .45, "atrim=0:3,afade=t=out:st=2.4:d=0.6")
    ekle(E("koridor_adim"), ev["zehra_gel"] - .9, .5)
    ekle(E("kapi_gicirt"), ev["zehra_gel"] + .05, .7)
    ekle(E("siren"), ev["murat_gel"] - 1.2, .45, "afade=t=out:st=5:d=2")
    ekle(E("adim_ic"), ev["murat_gel"] + .1, .55)
    ekle(E("telsiz"), ev["murat_gel"] + 1.6, .22)
    ekle(E("telsiz"), satir[[s["id"] for s in satir].index("R15")]["t"] - .2, .15, "atrim=0:2.5,afade=t=out:st=2:d=0.5")
    ekle(E("gecmis"), ev["gecmis"] - .2, .6)
    ekle(E("hat_kesik"), ev["kesildi"], .55)
    ekle(E("yukselis"), ev["kesildi"] - .3, .6)
    ekle(E("gecmis_don"), ev["donus"] - .15, .55)
    ekle(E("anahtar"), ev["torbaya"], .7)
    ekle(E("koridor_adim"), ev["memur_gel"] - .4, .45)
    ekle(E("torba"), satir[[s["id"] for s in satir].index("R26")]["t"] + 1.6, .6)
    ekle(E("piyano"), satir[[s["id"] for s in satir].index("R27")]["t"] - .3, .5, "afade=t=out:st=6:d=2")
    ekle(E("titresim"), ev["sonra"] - .1, .7)
    for k in (0, .55, 1.1): ekle(E("vurus3"), ev["vurus"] + k - .03, 1.0 + k * .15, "atrim=0:0.24,afade=t=out:st=0.17:d=0.07")
    ekle(E("final_vurgu"), ev["karar"] - .25, .8, "afade=t=out:st=0.6:d=0.25")
    filt.append("[dlgA][muz]" + "".join(f"[{e}]" for e in etiket) + f"amix=inputs={2 + len(etiket)}:normalize=0,atrim=0:{SURE},alimiter=limit=0.95[out]")
    cmd = ["ffmpeg", "-v", "error", "-y"] + girdi + ["-filter_complex", ";".join(filt), "-map", "[out]", "-ar", "48000", f"{KOK}/.bolum_ses.wav"]
    subprocess.run(cmd, check=True); print("Ses miksi hazır → .bolum_ses.wav")
