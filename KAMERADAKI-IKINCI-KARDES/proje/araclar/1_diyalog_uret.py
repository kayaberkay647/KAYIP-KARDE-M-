# -*- coding: utf-8 -*-
"""
KAMERADAKİ İKİNCİ KARDEŞ — 1. Bölüm
Adım 1: Diyalog seslerini üretir, işler, zamanlar.

Çıktılar
  ses/diyalog/ham/Lxx_p.mp3          → TTS ham çıktısı (önbellek; varsa tekrar indirilmez)
  ses/diyalog/islenmis/Lxx_KIM.wav   → efektli, zaman çizelgesine yerleştirilecek replik (48 kHz)
  ses/diyalog_yerlesim.json          → her repliğin başlama saniyesi (efekt/mix betiği okur)
  animasyon/veri/diyalog.js          → altyazı + dudak senkronu verisi (animasyon okur)
  altyazi/kameradaki_ikinci_kardes_bolum_01.srt

ElevenLabs kullanmak istersen: ses/diyalog/elevenlabs/ klasörüne L01.mp3 … L29.mp3 (ya da .wav) koy
(tek parça, tüm replik). Bu betik onları TTS yerine kullanır; kelime zamanlaması
sesin enerji eğrisinden tahmin edilir. Fısıltı/titreme/nefes eklenmez (oyuncunun performansı);
yalnızca oda akustiği (uzak, kapı arkası, ikinci Defne yankısı, çocuk fısıltısı yankısı) eklenir.
Metinler ve ayarlar: senaryo/ElevenLabs-Seslendirme-Metni.md

Kullanım:  python3 1_diyalog_uret.py
Gerekenler: pip install edge-tts numpy scipy soundfile ; ffmpeg
"""
import asyncio, json, os, ssl, subprocess, sys, math
import numpy as np
import soundfile as sf
from scipy import signal
from scipy.linalg import solve_toeplitz

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HAM = os.path.join(KOK, "ses", "diyalog", "ham")
ISL = os.path.join(KOK, "ses", "diyalog", "islenmis")
ELEVEN = os.path.join(KOK, "ses", "diyalog", "elevenlabs")
SR = 48000
FPS = 30

SESLER = {
    "ARDA":   dict(ses="tr-TR-AhmetNeural", hiz=2,  perde=0),
    "DEFNE":  dict(ses="tr-TR-EmelNeural",  hiz=6,  perde=10),
    "IKINCI": dict(ses="tr-TR-EmelNeural",  hiz=-16, perde=4),   # aynı ses kimliği, yavaş
    "COCUK":  dict(ses="tr-TR-EmelNeural",  hiz=-4, perde=40),
}

# ---------------------------------------------------------------------------
# REPLİKLER
#   t      : repliğin başladığı saniye (videonun başından)
#   parca  : TTS'e ayrı ayrı okutulan parçalar; "ara" = önceki parçadan sonra bırakılan sessizlik
#   hiz/perde : TTS ayarı (karakterin temel ayarına eklenir, % ve Hz)
#   fisilti: 0..1  (LPC fısıltı karışımı)   titreme: 0..1   nefes: 0..1 (nefesli ton)
#   ortam  : "yakin" | "uzak" (salondan, koridordan dinlenen) | "kapi" (kapalı kapının arkası) | "hayalet"
# ---------------------------------------------------------------------------
REPLIKLER = [
 # SAHNE 02  (9–19)
 dict(id="L01", kim="ARDA",  t=11.25, parca=[("Defne, koridor kamerası yine hareket algılamış.",0)], hiz=0, perde=2),
 dict(id="L02", kim="DEFNE", t=15.05, parca=[("Abi, kesin yine kamera saçmalıyordur.",0)], hiz=4),
 # SAHNE 03  (19–29)
 dict(id="L03", kim="ARDA",  t=23.10, parca=[("Bir dakika...",0),("Defne, bu sen misin?",0.45)], hiz=-4),
 dict(id="L04", kim="DEFNE", t=26.55, parca=[("Ne olmuş?",0),("Göstersene.",0.15)], hiz=6, perde=4),
 # SAHNE 04  (29–39)
 dict(id="L05", kim="DEFNE", t=31.20, parca=[("Abi, ben koridora falan çıkmadım ki.",0)], hiz=4),
 dict(id="L06", kim="ARDA",  t=34.75, parca=[("Nasıl çıkmadın?",0),("Üstündeki kıyafet bile aynı.",0.2)], hiz=0),
 # SAHNE 05  (39–49)
 dict(id="L07", kim="ARDA",  t=43.30, parca=[("Şuna bak...",0),("Aynı anda iki yerdesin.",0.5)], hiz=-8, perde=-3, fisilti=0.22, ses=-2),
 dict(id="L08", kim="DEFNE", t=47.00, parca=[("Abi, bu nasıl oluyor?",0)], hiz=8, perde=2, nefes=0.15),
 # SAHNE 06  (49–59)
 dict(id="L09", kim="DEFNE", t=49.85, parca=[("Abi...",0),("O kız bana benziyor.",0.35)], hiz=-2, fisilti=0.3, ses=-2),
 dict(id="L10", kim="ARDA",  t=53.45, parca=[("Benziyor değil Defne...",0),("Resmen sensin.",0.95)], hiz=-12, perde=-3),
 # SAHNE 07  (59–69)
 dict(id="L11", kim="DEFNE", t=61.10, parca=[("Abi, duyuyor musun?",0),("Koridordan geliyor.",0.2)], hiz=10, perde=2, nefes=0.2, fisilti=0.12),
 dict(id="L12", kim="ARDA",  t=64.75, parca=[("Sen burada dur.",0),("Bir bakıp geleceğim.",0.3)], hiz=-4),
 # SAHNE 08  (69–79)
 dict(id="L13", kim="ARDA",  t=73.60, parca=[("Kim var orada?",0)], hiz=-6),
 dict(id="L14", kim="ARDA",  t=76.70, parca=[("Defne, sen mi bir şey yaptın?",0)], hiz=-4, fisilti=0.32, ses=-3),
 # SAHNE 09  (79–89)
 dict(id="L15", kim="ARDA",  t=85.10, parca=[("Yok artık...",0)], hiz=-8, fisilti=0.72, ses=-2),
 dict(id="L16", kim="DEFNE", t=87.05, parca=[("Abi?",0),("Ne oldu?",0.25)], hiz=6, ortam="uzak"),
 # SAHNE 10  (89–99)
 dict(id="L17", kim="ARDA",  t=94.45, parca=[("Defne...",0),("Sakın hareket etme.",0.45)], hiz=-8, fisilti=0.58, titreme=0.5, ses=-1),
 dict(id="L18", kim="DEFNE", t=96.90, parca=[("Abi, niye?",0),("Ne var?",0.15)], hiz=10, ortam="uzak"),
 # SAHNE 11  (99–109)
 dict(id="L19", kim="ARDA",  t=100.05, parca=[("Defne, sakince kalk.",0),("Bana doğru gel.",0.35)], hiz=-6, titreme=0.45, fisilti=0.15),
 dict(id="L20", kim="DEFNE", t=103.25, parca=[("Abi, beni korkutma.",0),("Ne oluyor?",0.2)], hiz=12, perde=4, nefes=0.25, titreme=0.3),
 # SAHNE 12  (109–119)
 dict(id="L21", kim="DEFNE", t=110.45, parca=[("Arda, bir şey söylesene.",0)], hiz=8, nefes=0.2, titreme=0.25),
 dict(id="L22", kim="ARDA",  t=113.85, parca=[("Gözünü arkaya çevirme.",0),("Gel yanıma.",0.3)], hiz=-4, fisilti=0.55, titreme=0.4),
 # SAHNE 13  (119–129)
 dict(id="L23", kim="IKINCI",t=124.00, parca=[("Abi...",0),("Buraya gelsene.",0.6)], hiz=0, ortam="kapi"),
 dict(id="L24", kim="DEFNE", t=126.60, parca=[("Abi...",0),("Ben buradayım.",0.35)], hiz=2, fisilti=0.66, titreme=0.35),
 # SAHNE 14  (129–139)
 dict(id="L25", kim="ARDA",  t=130.35, parca=[("Sen...",0),("Sen kimsin?",0.35)], hiz=-6, fisilti=0.35, titreme=0.5),
 dict(id="L26", kim="IKINCI",t=134.05, parca=[("Abi...",0),("Beni tanımadın mı?",0.55)], hiz=-2, ortam="hayalet"),
 # SAHNE 15  (139–150)
 dict(id="L27", kim="DEFNE", t=142.45, parca=[("Abi...",0),("Ben gerçek Defne'yim.",0.4)], hiz=0, titreme=0.75, nefes=0.25, fisilti=0.2),
 dict(id="L28", kim="IKINCI",t=146.05, parca=[("Ben de öyle.",0)], hiz=-4, ortam="hayalet"),
 dict(id="L29", kim="COCUK", t=147.78, parca=[("Hangimize inanacaksın?",0)], hiz=0, fisilti=0.97, ortam="cocuk", ses=-4),
]

ALTYAZI_METNI = {  # ekranda görünen metin (tek satırda tutulan orijinal yazım)
 "L01":"Defne, koridor kamerası yine hareket algılamış.",
 "L02":"Abi, kesin yine kamera saçmalıyordur.",
 "L03":"Bir dakika... Defne, bu sen misin?",
 "L04":"Ne olmuş? Göstersene.",
 "L05":"Abi, ben koridora falan çıkmadım ki.",
 "L06":"Nasıl çıkmadın? Üstündeki kıyafet bile aynı.",
 "L07":"Şuna bak... Aynı anda iki yerdesin.",
 "L08":"Abi, bu nasıl oluyor?",
 "L09":"Abi... O kız bana benziyor.",
 "L10":"Benziyor değil Defne... Resmen sensin.",
 "L11":"Abi, duyuyor musun? Koridordan geliyor.",
 "L12":"Sen burada dur. Bir bakıp geleceğim.",
 "L13":"Kim var orada?",
 "L14":"Defne, sen mi bir şey yaptın?",
 "L15":"Yok artık...",
 "L16":"Abi? Ne oldu?",
 "L17":"Defne... Sakın hareket etme.",
 "L18":"Abi, niye? Ne var?",
 "L19":"Defne, sakince kalk. Bana doğru gel.",
 "L20":"Abi, beni korkutma. Ne oluyor?",
 "L21":"Arda, bir şey söylesene.",
 "L22":"Gözünü arkaya çevirme. Gel yanıma.",
 "L23":"Abi... Buraya gelsene.",
 "L24":"Abi... Ben buradayım.",
 "L25":"Sen... Sen kimsin?",
 "L26":"Abi... Beni tanımadın mı?",
 "L27":"Abi... Ben gerçek Defne'yim.",
 "L28":"Ben de öyle.",
 "L29":"Hangimize inanacaksın?",
}

SAHNE_BITIS = [9,19,29,39,49,59,69,79,89,99,109,119,129,139,150]
# Çocuk fısıltısı ElevenLabs'ta Defne'nin sesiyle üretildiyse perdesi inceltilir (gerçek çocuk sesi kullanırsan False yap)
ELEVEN_COCUK_INCELT = True

# ---------------------------------------------------------------------------
def tts_indir(metin, ses, hiz, perde, hedef):
    """edge-tts ile mp3 + kelime sınırlarını indirir (önbellekli)."""
    jsn = hedef + ".json"
    if os.path.exists(hedef) and os.path.exists(jsn):
        return json.load(open(jsn, encoding="utf-8"))
    import edge_tts, edge_tts.communicate as C
    ca = "/root/.ccr/ca-bundle.crt"
    if os.path.exists(ca):
        C._SSL_CTX = ssl.create_default_context(cafile=ca)
    async def calis():
        c = edge_tts.Communicate(metin, ses, rate=f"{hiz:+d}%", pitch=f"{perde:+d}Hz", boundary="WordBoundary")
        kel = []
        with open(hedef, "wb") as f:
            async for ch in c.stream():
                if ch["type"] == "audio": f.write(ch["data"])
                elif ch["type"] == "WordBoundary":
                    kel.append([ch["offset"] / 1e7, ch["duration"] / 1e7, ch["text"]])
        return kel
    for deneme in range(4):
        try:
            kel = asyncio.run(calis()); break
        except Exception as e:
            print("  TTS hata, tekrar:", e); kel = None
    if not kel: raise SystemExit("TTS başarısız: " + metin)
    json.dump(kel, open(jsn, "w", encoding="utf-8"), ensure_ascii=False)
    return kel

def oku(yol):
    ham = subprocess.run(["ffmpeg", "-v", "error", "-i", yol, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(ham, dtype=np.float32).astype(np.float64)

def sessizlik_kirp(x, esik=0.004):
    """Sondaki sessizliği kırpar (baştakini korur: kelime zamanları buna göre)."""
    e = np.abs(x) > esik
    if not e.any(): return x
    son = len(x) - np.argmax(e[::-1])
    return x[:min(len(x), son + int(0.06 * SR))]

def ilk_ses(x, esik=0.004):
    e = np.abs(x) > esik
    return int(np.argmax(e)) if e.any() else 0

# --- efektler ---------------------------------------------------------------
def lpc_fisilti(x, sira=28):
    """Sesin spektral zarfını koruyup uyarımını gürültüyle değiştirir → doğal fısıltı."""
    N = int(0.032 * SR); H = N // 4
    pen = np.hanning(N)
    y = np.zeros(len(x) + N); norm = np.zeros(len(x) + N)
    rng = np.random.default_rng(7)
    xp = np.concatenate([x, np.zeros(N)])
    pre = signal.lfilter([1, -0.9], [1], xp)
    for i in range(0, len(x), H):
        fr = pre[i:i + N] * pen
        if len(fr) < N: break
        r = np.correlate(fr, fr, "full")[N - 1:N + sira]
        if r[0] < 1e-9: continue
        r[0] *= 1.0001
        try: a = solve_toeplitz(r[:sira], -r[1:sira + 1])
        except Exception: continue
        A = np.concatenate([[1], a])
        res = signal.lfilter(A, [1], fr)
        g = np.sqrt(np.mean(res ** 2))
        n = rng.standard_normal(N) * g
        out = signal.lfilter([1], A, n)
        out = np.clip(out, -4, 4)
        y[i:i + N] += out * pen; norm[i:i + N] += pen ** 2
    y = y[:len(x)] / np.maximum(norm[:len(x)], 1e-3)
    y = signal.lfilter([1], [1, -0.9], y)           # de-emphasis
    b, a = signal.butter(2, 350 / (SR / 2), "high"); y = signal.lfilter(b, a, y)
    # seviyeyi orijinale eşitle
    y *= (np.sqrt(np.mean(x ** 2)) + 1e-9) / (np.sqrt(np.mean(y ** 2)) + 1e-9)
    return y

def titret(x, miktar):
    if miktar <= 0: return x
    n = np.arange(len(x)) / SR
    f = 6.2 + 0.6 * np.sin(n * 0.7)                      # ~6 Hz titreme
    faz = 2 * np.pi * np.cumsum(f) / SR
    p = miktar * 0.014                                    # perde sapması (oran)
    D = p * SR / (2 * np.pi * 6.2)                        # örnek cinsinden zaman bükme
    idx = np.clip(np.arange(len(x)) + D * np.sin(faz), 0, len(x) - 1)
    y = np.interp(idx, np.arange(len(x)), x)
    trem = 1 - miktar * 0.13 * (0.5 + 0.5 * np.sin(2 * np.pi * np.cumsum(f * 1.07) / SR + 1.0))
    return y * trem

def nefesli(x, miktar):
    if miktar <= 0: return x
    w = lpc_fisilti(x)
    b, a = signal.butter(2, 2500 / (SR / 2), "high")
    return x + miktar * 0.7 * signal.lfilter(b, a, w)

def yanki_ir(sure, sonum, parlak=0.5, tohum=1):
    rng = np.random.default_rng(tohum)
    n = int(sure * SR); t = np.arange(n) / SR
    ir = rng.standard_normal(n) * np.exp(-t * 6.9 / sonum)
    b, a = signal.butter(1, (1500 + 7000 * parlak) / (SR / 2), "low")
    ir = signal.lfilter(b, a, ir)
    ir[: int(0.008 * SR)] *= np.linspace(0, 1, int(0.008 * SR))
    return ir / np.sqrt(np.sum(ir ** 2))

def yanki(x, ir, islak):
    w = signal.fftconvolve(x, ir)[: len(x) + len(ir)]
    y = np.zeros(len(w)); y[: len(x)] += x * (1 - islak * 0.5)
    return y + w * islak

def filtre(x, tip, f, sira=2):
    b, a = signal.butter(sira, f / (SR / 2), tip); return signal.lfilter(b, a, x)

def perde_kaydir(x, oran):
    """Basit yeniden örnekleme (oran>1 → ince ve kısa)."""
    n = int(len(x) / oran)
    return np.interp(np.arange(n) * oran, np.arange(len(x)), x)

def ortam_isle(x, ortam):
    if ortam == "uzak":        # salondan / koridordan uzak ses
        y = filtre(filtre(x, "high", 180), "low", 3800)
        return yanki(y * 0.55, yanki_ir(1.0, 0.55, 0.3, 11), 0.42)
    if ortam == "kapi":        # mutfak kapısının arkasından, boğuk + yankılı + ikiz katman
        ikiz = np.concatenate([np.zeros(int(0.028 * SR)), perde_kaydir(x, 0.982)])[: len(x) + int(0.05*SR)]
        y = np.zeros(max(len(x), len(ikiz))); y[: len(x)] += x; y[: len(ikiz)] += ikiz * 0.28
        y = filtre(filtre(y, "high", 160), "low", 2300, 3)
        on = yanki(y[::-1], yanki_ir(1.4, 1.1, 0.2, 5), 0.9)[::-1]   # ters yankı: sesten önce gelen nefes
        out = yanki(y * 0.8, yanki_ir(1.6, 1.25, 0.25, 4), 0.5)
        pad = len(on) - len(y)
        tam = np.zeros(pad + len(out)); tam[:len(on)] += on * 0.22; tam[pad:pad + len(out)] += out
        return tam, pad
    if ortam == "hayalet":     # ikinci Defne yakında: hafif boğuk, yankılı, huzursuz ikiz
        ikiz = np.concatenate([np.zeros(int(0.022 * SR)), perde_kaydir(x, 0.985)])
        y = np.zeros(max(len(x), len(ikiz))); y[: len(x)] += x; y[: len(ikiz)] += ikiz * 0.22
        y = filtre(filtre(y, "high", 120), "low", 4200, 2)
        on = yanki(y[::-1], yanki_ir(1.1, 0.9, 0.25, 6), 0.9)[::-1]
        out = yanki(y, yanki_ir(1.5, 1.2, 0.3, 8), 0.34)
        pad = len(on) - len(y)
        tam = np.zeros(pad + len(out)); tam[:len(on)] += on * 0.16; tam[pad:pad + len(out)] += out
        return tam, pad
    if ortam == "cocuk":       # çocuk fısıltısı
        y = filtre(x, "high", 300)
        return yanki(y, yanki_ir(2.2, 1.9, 0.45, 9), 0.45)
    return x

# --- dudak senkronu ---------------------------------------------------------
UNLU = set("aeıioöuüâîû")
def harf_viseme(h):
    h = h.lower()
    if h in "aâ": return "A"
    if h in "eiîı": return "E" if h in "ei" else "I"
    if h in "oö": return "O"
    if h in "uüû": return "U"
    if h in "mbp": return "M"
    if h in "fv": return "F"
    if h in "şçcj": return "S"
    if h in "lrntdsz": return "C"
    return "C"

def kelime_visemleri(kelime, bas, sure):
    harfler = [h for h in kelime if h.isalpha()]
    if not harfler: return []
    ag = np.array([1.5 if h.lower() in UNLU else 0.8 for h in harfler]); ag /= ag.sum()
    out, t = [], bas
    for h, w in zip(harfler, ag):
        out.append((t, t + w * sure, harf_viseme(h))); t += w * sure
    return out

def enerji_zamanlama(x, metin):
    """ElevenLabs gibi kelime zamanı olmayan sesler için: konuşma bölgelerine kelimeleri yayar."""
    kel = metin.replace("...", " ").split()
    e = np.abs(x) > 0.01
    if not e.any(): return []
    a = np.argmax(e) / SR; b = (len(x) - np.argmax(e[::-1])) / SR
    uz = np.array([len(k) for k in kel], float); uz /= uz.sum()
    t, out = a, []
    for k, w in zip(kel, uz):
        out.append([t, w * (b - a) * 0.92, k]); t += w * (b - a)
    return out

# ---------------------------------------------------------------------------
def main():
    os.makedirs(HAM, exist_ok=True); os.makedirs(ISL, exist_ok=True)
    yerlesim, js_veri, srt = [], [], []
    print(f"{'ID':4} {'KİM':7} {'başla':>7} {'bitiş':>7}  sahne-sonu")
    for r in REPLIKLER:
        kim = r["kim"]; tem = SESLER[kim]
        hiz = tem["hiz"] + r.get("hiz", 0); perde = tem["perde"] + r.get("perde", 0)
        eleven = next((os.path.join(ELEVEN, r["id"] + u) for u in (".mp3", ".wav") if os.path.exists(os.path.join(ELEVEN, r["id"] + u))), None)
        parcalar = []   # (ses dizisi, kelimeler[(t,dur,txt)])
        if eleven:
            x = sessizlik_kirp(oku(eleven))
            bas = max(0, ilk_ses(x) - int(0.08 * SR)); x = x[bas:]     # baştaki sessizliği videodaki zamana göre kırp
            parcalar.append((x, enerji_zamanlama(x, ALTYAZI_METNI[r["id"]]), 0.0))
            print(f"  {r['id']}: ElevenLabs kaydı kullanılıyor ({os.path.basename(eleven)})")
        else:
            for i, (metin, ara) in enumerate(r["parca"]):
                yol = os.path.join(HAM, f"{r['id']}_{i}.mp3")
                kel = tts_indir(metin, tem["ses"], hiz, perde, yol)
                x = sessizlik_kirp(oku(yol))
                parcalar.append((x, kel, ara))
        # parçaları birleştir (kuru ses)
        kuru = np.zeros(0); kelimeler = []
        for x, kel, ara in parcalar:
            if len(kuru):
                kon = len(kuru) + int(ara * SR) - ilk_ses(x)    # önceki parçanın bitişinden "ara" kadar sonra konuş
                kon = max(kon, len(kuru) - ilk_ses(x) // 2)
            else:
                kon = 0
            yeni = np.zeros(max(len(kuru), kon + len(x))); yeni[:len(kuru)] += kuru; yeni[kon:kon + len(x)] += x
            kuru = yeni
            for (o, d, w) in kel: kelimeler.append((kon / SR + o, d, w))
        # ses rengi işlemleri (yalnızca TTS için; ElevenLabs kaydında fısıltı/titreme/nefes oyuncunun performansıdır)
        if eleven: r = {**r, "fisilti": 0, "nefes": 0, "titreme": 0}
        if kim == "COCUK" and (not eleven or ELEVEN_COCUK_INCELT):
            kuru = perde_kaydir(kuru, 1.10)
            kelimeler = [(o / 1.10, d / 1.10, w) for o, d, w in kelimeler]
        if r.get("fisilti", 0) > 0:
            w = r["fisilti"]; fs = lpc_fisilti(kuru)
            kuru = (1 - w) * kuru * (1 - 0.35 * w) + w * fs * 1.15
        kuru = nefesli(kuru, r.get("nefes", 0))
        kuru = titret(kuru, r.get("titreme", 0))
        # dudak senkronu (kuru sesten)
        hop = SR // FPS
        nkare = int(math.ceil(len(kuru) / hop))
        rms = np.array([np.sqrt(np.mean(kuru[i * hop:(i + 1) * hop] ** 2)) if i * hop < len(kuru) else 0 for i in range(nkare)])
        ref = np.percentile(rms[rms > 1e-4], 90) if (rms > 1e-4).any() else 1
        acik = np.clip((rms / ref) ** 0.75 * 1.05, 0, 1)
        acik = np.convolve(acik, [0.25, 0.5, 0.25], "same")
        vis = []
        for o, d, w in kelimeler: vis += kelime_visemleri(w, o, d)
        sekil = []
        for i in range(nkare):
            tt = (i + 0.5) / FPS; s = "X"
            for a, b, v in vis:
                if a <= tt < b: s = v; break
            sekil.append(s)
        for i in range(nkare):
            if sekil[i] == "M": acik[i] *= 0.08
            if sekil[i] == "X": acik[i] *= 0.5
        # ortam
        on_pay = 0
        res = ortam_isle(kuru, r.get("ortam", "yakin"))
        if isinstance(res, tuple): islenmis, on_pay = res
        else: islenmis = res
        kazanc = 10 ** (r.get("ses", 0) / 20)
        islenmis = islenmis * kazanc
        tepe = np.max(np.abs(islenmis))
        if tepe > 0.97: islenmis *= 0.97 / tepe
        dosya = f"{r['id']}_{kim}.wav"
        sf.write(os.path.join(ISL, dosya), islenmis.astype(np.float32), SR, subtype="PCM_24")
        bas = r["t"]; ilk = kelimeler[0][0] if kelimeler else 0
        son_kel = max(o + d for o, d, w in kelimeler) if kelimeler else len(kuru) / SR
        bitis = bas + son_kel
        sahne_sonu = next(s for s in SAHNE_BITIS if s > bas)
        uyari = "  <-- TAŞIYOR!" if bitis > sahne_sonu - 0.05 else ""
        print(f"{r['id']:4} {kim:7} {bas+ilk:7.2f} {bitis:7.2f}  {sahne_sonu}{uyari}")
        yerlesim.append(dict(id=r["id"], kim=kim, dosya=dosya, t=bas - on_pay / SR, ortam=r.get("ortam", "yakin")))
        js_veri.append(dict(id=r["id"], kim=kim, t=round(bas, 3), bas=round(bas + ilk, 3), son=round(bitis, 3),
                            metin=ALTYAZI_METNI[r["id"]],
                            agiz="".join(sekil), acik=[int(round(v * 99)) for v in acik],
                            kelime=[[round(bas + o, 3), round(bas + o + d, 3), w] for o, d, w in kelimeler]))
        srt.append((bas + ilk - 0.05, bitis + 0.45, ALTYAZI_METNI[r["id"]]))

    json.dump(yerlesim, open(os.path.join(KOK, "ses", "diyalog_yerlesim.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    with open(os.path.join(KOK, "animasyon", "veri", "diyalog.js"), "w", encoding="utf-8") as f:
        f.write("// 1_diyalog_uret.py tarafından üretildi — elle düzenleme.\n// acik: kare başına ağız açıklığı (0-99, 30 fps); agiz: kare başına ağız şekli.\n")
        f.write("window.DIYALOG = " + json.dumps(js_veri, ensure_ascii=False) + ";\n")
    # SRT (çakışmaları düzelt)
    def zf(s):
        ms = int(round(s * 1000)); return f"{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d},{ms%1000:03d}"
    for i in range(len(srt) - 1):
        if srt[i][1] > srt[i + 1][0] - 0.04:
            srt[i] = (srt[i][0], srt[i + 1][0] - 0.04, srt[i][2])
    with open(os.path.join(KOK, "altyazi", "kameradaki_ikinci_kardes_bolum_01.srt"), "w", encoding="utf-8") as f:
        for i, (a, b, m) in enumerate(srt, 1):
            f.write(f"{i}\n{zf(a)} --> {zf(b)}\n{m}\n\n")
    print("Tamam: diyalog.js, srt, wav dosyaları yazıldı.")

if __name__ == "__main__":
    main()
