"""KARA TAHTA 2. Bölüm repliklerini ElevenLabs ile seslendirir ve ses/ klasörüne koyar.

Kullanım:
    ELEVENLABS_API_KEY=... python3 seslendir.py          # eksik replikleri üretir
    ELEVENLABS_API_KEY=... python3 seslendir.py R04 R11  # sadece bu replikleri yeniden üretir

Ücretsiz plan yalnızca ElevenLabs'ın hazır seslerine izin verir; çocuk sesleri yetişkin seslerinin
perdesi yükseltilerek elde edilir (ffmpeg rubberband). Ücretli plana geçince SESLER tablosundaki
çocuk ses kimliklerini Voice Design ile oluşturduğun seslerle değiştir ve PERDE değerini 1.0 yap.
Gerekenler: Python 3, requests, ffmpeg (rubberband filtresiyle).
"""
import os, subprocess, sys, tempfile
import requests

KLASOR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ses")
API = "https://api.elevenlabs.io/v1"
ANAHTAR = os.environ.get("ELEVENLABS_API_KEY", "proxy-injected")

# karakter: (ElevenLabs ses kimliği, perde çarpanı)
SESLER = {
    "ZEYNEP": ("cgSgspJ2msm6clMCkdW9", 1.19),  # Jessica (hazır ses), inceltilmiş
    "MERT":   ("TX3LPaxmHKxFdv7VOQHJ", 1.41),  # Liam (hazır ses, Türkçe doğrulanmış), inceltilmiş
    "SERKAN": ("bIHbv24MWmeRgasZH58o", 1.41),  # Will (hazır ses), inceltilmiş; yankı tarayıcıda eklenir
    "HASAN":  ("onwK4e9ZLuTAKqWW03F9", 1.0),   # Daniel (hazır ses, Türkçe doğrulanmış)
    "NURAY":  ("XrExE9yKIg1WjnnlVkGX", 1.0),   # Matilda (hazır ses)
}

REPLIKLER = [
    ("R01", "NURAY",  "[angry] Yine mi? Bu şakayı kim sürdürüyor bakalım?"),
    ("R02", "MERT",   "[defensive] Hocam, bakmayın bana öyle! Ben yapmadım!"),
    ("R03", "NURAY",  "[stern] Sil şunu Mert. Hemen."),
    ("R04", "MERT",   "[nervous] Hocam… silinmiyor. Bakın, sünger simsiyah oldu!"),
    ("R05", "NURAY",  "[shocked] [quietly] Bu ne böyle… Su değdikçe daha da beyazlaşıyor."),
    ("R06", "NURAY",  "[cold] Tebeşire ne kattın Mert? Okul çıkışı burada kalıyorsun. Tahta temizlenmeden eve gitmek yok."),
    ("R07", "ZEYNEP", "[whispers] [urgent] Mert, dün teneffüste o sayı kendi kendine geri geldi. Ben gördüm."),
    ("R08", "MERT",   "[frustrated] Yeter Zeynep! Senin hayaletin yüzünden ceza yiyen benim."),
    ("R09", "MERT",   "[tired] [grumbling] Hayaletmiş… Bir tahta, bir kova su. Hepsi bu."),
    ("R10", "MERT",   "[whispers] [uneasy] Kim var orada? Zeynep… sen misin?"),
    ("R11", "MERT",   "[scared] [breathless] Orada… biri oturuyor."),
    ("R12", "ZEYNEP", "[worried] Mert…?"),
    ("R13", "MERT",   "[panicked] Kapı… kapı açılmıyor! Hasan Amca! Biri yok mu?"),
    ("R14", "SERKAN", "[whispers] [sad] Beni silemezsin… Mert."),
]


def seslendir(metin, ses_id, hedef):
    r = requests.post(f"{API}/text-to-speech/{ses_id}?output_format=mp3_44100_128",
                      headers={"xi-api-key": ANAHTAR, "Content-Type": "application/json"},
                      json={"text": metin, "model_id": "eleven_v3", "language_code": "tr",
                            "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}})
    if r.status_code != 200:
        sys.exit(f"ElevenLabs hatası {r.status_code}: {r.text[:300]}")
    with open(hedef, "wb") as f:
        f.write(r.content)


def isle(ham, cikti, perde):
    # perde → sessizlik kırpma (baş/son) → ses seviyesi eşitleme
    f = f"rubberband=pitch={perde}:formant=shifted:pitchq=quality," if perde != 1.0 else ""
    f += ("silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.05,areverse,"
          "silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.12,areverse,"
          "loudnorm=I=-17:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", ham, "-af", f, "-ar", "44100", "-ac", "1",
                    "-b:a", "128k", cikti], check=True)


if __name__ == "__main__":
    secilen = set(sys.argv[1:])
    os.makedirs(KLASOR, exist_ok=True)
    for rid, kim, metin in REPLIKLER:
        cikti = os.path.join(KLASOR, f"KT02_{rid}_{kim}.mp3")
        if secilen and rid not in secilen:
            continue
        if not secilen and os.path.exists(cikti):
            continue
        ses_id, perde = SESLER[kim]
        with tempfile.TemporaryDirectory() as tmp:
            ham = os.path.join(tmp, "ham.mp3")
            seslendir(metin, ses_id, ham)
            isle(ham, cikti, perde)
        print("hazır:", os.path.basename(cikti))
