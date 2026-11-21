# -*- coding: utf-8 -*-
"""
KAMERADAKİ İKİNCİ KARDEŞ — 1. Bölüm
Adım 0 (isteğe bağlı): 29 repliği ElevenLabs API ile seslendirir.

Metinler ve duygu etiketleri: senaryo/ElevenLabs-Seslendirme-Metni.md (oradan okunur, tek kaynak)
Çıktı: ses/diyalog/elevenlabs/L01.mp3 … L29.mp3  (+ denemeler/ ve rapor.json)
Sonra: python3 1_diyalog_uret.py && python3 2_ses_mix.py && node 3_render.js 4

Kullanım:
  python3 0_elevenlabs_uret.py                 # eksik replikleri üretir
  python3 0_elevenlabs_uret.py L17 L19          # yalnız bu replikleri yeniden üretir
  ELEVENLABS_API_KEY=... python3 0_elevenlabs_uret.py

Sesler: ücretsiz pakette API yalnızca ElevenLabs'ın hazır seslerine izin verir (kütüphane sesleri ve
Voice Design ücretli pakette). Ücretli pakette SESLER içindeki ses ID'lerini Türkçe kütüphane sesleriyle
değiştirebilirsin (ör. Arda: Yunus Q5n6GDIjpN0pLOlycRFT, Defne: Gökçe Deniz oPC5I9GKjMReiaM29gjY).
"""
import json, os, re, ssl, subprocess, sys, time, urllib.request, urllib.error
import numpy as np

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
METIN = os.path.join(os.path.dirname(KOK), "senaryo", "ElevenLabs-Seslendirme-Metni.md")
CIKTI = os.path.join(KOK, "ses", "diyalog", "elevenlabs")
DENEME = os.path.join(CIKTI, "denemeler")
MODEL = "eleven_v4"
# Karakter → (ses ID, stability, similarity). İkinci Defne = Defne'nin sesi, daha düz/sakin ayar.
SESLER = {
    "ARDA":   ("bIHbv24MWmeRgasZH58o", 0.5, 0.8),   # Will (hazır ses)
    "DEFNE":  ("cgSgspJ2msm6clMCkdW9", 0.5, 0.8),   # Jessica (hazır ses)
    "IKINCI": ("cgSgspJ2msm6clMCkdW9", 0.85, 0.85),
    "COCUK":  ("cgSgspJ2msm6clMCkdW9", 0.5, 0.75),  # Defne'nin fısıltısı; 1_diyalog_uret.py perdesini inceltir
}
KIM_ESLE = {"ARDA": "ARDA", "DEFNE": "DEFNE", "GERÇEK DEFNE": "DEFNE", "İKİNCİ DEFNE": "IKINCI", "ÇOCUK FISILTISI": "COCUK"}
DENEME_SAYISI = 3          # süre sınırını aşan replik için en fazla deneme
SSL_CTX = ssl.create_default_context(cafile="/root/.ccr/ca-bundle.crt") if os.path.exists("/root/.ccr/ca-bundle.crt") else ssl.create_default_context()

def istek(yol, govde=None, yontem="GET", ham=False):
    h = {"Content-Type": "application/json"}
    if os.environ.get("ELEVENLABS_API_KEY"): h["xi-api-key"] = os.environ["ELEVENLABS_API_KEY"]
    req = urllib.request.Request("https://api.elevenlabs.io" + yol, data=json.dumps(govde).encode() if govde else None, headers=h, method=yontem)
    with urllib.request.urlopen(req, context=SSL_CTX, timeout=180) as r:
        b = r.read(); return b if ham else json.loads(b)

def replikler():
    s = open(METIN, encoding="utf-8").read()
    pat = re.compile(r"\*\*(L\d\d) — ([^*]+)\*\* · başlar ([\d:.]+) · hedef ([\d.]+) sn · en fazla \**([\d.]+) sn\**.*?```\n(.*?)\n```", re.S)
    return [dict(id=a, kim=KIM_ESLE[b.strip()], hedef=float(d), enfazla=float(e), metin=f.strip()) for a, b, c, d, e, f in pat.findall(s)]

def konusma_suresi(yol):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", yol, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True).stdout
    x = np.frombuffer(raw, dtype=np.float32)
    e = np.abs(x) > 0.01
    if not e.any(): return 0.0
    return float((len(x) - np.argmax(e[::-1]) - np.argmax(e)) / 16000)

def uret(r, deneme, hiz):
    vid, st, si = SESLER[r["kim"]]
    vs = {"stability": st, "similarity_boost": si}
    if hiz != 1.0: vs["speed"] = hiz
    govde = {"text": r["metin"], "model_id": MODEL, "voice_settings": vs, "language_code": "tr"}
    ses = istek(f"/v1/text-to-speech/{vid}?output_format=mp3_44100_128", govde, "POST", ham=True)
    yol = os.path.join(DENEME, f"{r['id']}_{deneme}.mp3"); open(yol, "wb").write(ses)
    return yol

def main():
    os.makedirs(DENEME, exist_ok=True)
    secili = set(sys.argv[1:])
    rapor_yol = os.path.join(CIKTI, "rapor.json")
    rapor = json.load(open(rapor_yol)) if os.path.exists(rapor_yol) else {}
    abone = istek("/v1/user/subscription")
    print(f"ElevenLabs: {abone['character_count']}/{abone['character_limit']} karakter kullanılmış · model {MODEL}")
    for r in replikler():
        hedef_dosya = os.path.join(CIKTI, r["id"] + ".mp3")
        if (secili and r["id"] not in secili) or (not secili and os.path.exists(hedef_dosya)): continue
        kalan = abone["character_limit"] - abone["character_count"]
        if kalan < len(r["metin"]) + 50: print("Karakter kotası bitti, duruldu."); break
        denemeler = []
        for k in range(DENEME_SAYISI):
            hiz = [1.0, 1.08, 1.15][k]
            try: yol = uret(r, len(rapor.get(r["id"], {}).get("denemeler", [])) + k, hiz)
            except urllib.error.HTTPError as e:
                print(f"  {r['id']} HATA {e.code}: {e.read().decode()[:200]}"); break
            sure = konusma_suresi(yol); denemeler.append((yol, sure, hiz))
            abone["character_count"] += len(r["metin"])
            print(f"  {r['id']} {r['kim']:6s} deneme {k + 1}: {sure:.2f} sn (hedef {r['hedef']}, en fazla {r['enfazla']}) hız {hiz}")
            if sure <= r["enfazla"]: break
        if not denemeler: continue
        uygun = [d for d in denemeler if d[1] <= r["enfazla"]] or denemeler
        en_iyi = min(uygun, key=lambda d: abs(d[1] - r["hedef"]))
        subprocess.run(["cp", en_iyi[0], hedef_dosya])
        rapor[r["id"]] = dict(kim=r["kim"], metin=r["metin"], secilen=os.path.basename(en_iyi[0]), sure=round(en_iyi[1], 2), hedef=r["hedef"], enfazla=r["enfazla"],
                              sigiyor=bool(en_iyi[1] <= r["enfazla"]), denemeler=rapor.get(r["id"], {}).get("denemeler", []) + [os.path.basename(d[0]) for d in denemeler])
        json.dump(rapor, open(rapor_yol, "w"), ensure_ascii=False, indent=1)
    abone = istek("/v1/user/subscription")
    print(f"Bitti. ElevenLabs: {abone['character_count']}/{abone['character_limit']} karakter")
    sigmayan = [k for k, v in rapor.items() if not v["sigiyor"]]
    if sigmayan: print("Süre sınırını aşan:", sigmayan)

if __name__ == "__main__":
    main()
