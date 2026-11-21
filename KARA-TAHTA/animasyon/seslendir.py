"""KARA TAHTA 1. Bölüm repliklerini ElevenLabs ile seslendirir ve ses/ klasörüne koyar.

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
    ("R01", "MERT",   "[excited] Söylemiştim! Bu saatte okulda bizden başka kimse olmaz."),
    ("R02", "ZEYNEP", "[surprised] [quietly] Biri bizden önce gelmiş…"),
    ("R03", "MERT",   "[laughs] On beş mi? Neyin on beşi bu ya?"),
    ("R04", "ZEYNEP", "[uneasy] Yazıya bak Mert. Sanki… küçük bir çocuk yazmış."),
    ("R05", "NURAY",  "[stern] Günaydın. Bunu tahtaya kim yazdı?"),
    ("R06", "MERT",   "[defensive] Hocam ben değilim, yemin ederim! Biz geldiğimizde vardı."),
    ("R07", "NURAY",  "[sighs] Mert… sil şunu da derse başlayalım."),
    ("R08", "ZEYNEP", "[whispers] Mert…? Sen misin?"),
    ("R09", "ZEYNEP", "[scared] [breathless] Hayır… hayır, az önce sildik…"),
    ("R10", "HASAN",  "[tense] [quietly] Kızım… sen bu sınıfta mı okuyorsun?"),
    ("R11", "HASAN",  "[whispers] On beş… Otuz yedi yıl sonra… yine mi?"),
    ("R12", "HASAN",  "[urgent] Hadi bahçeye çık. Bunu kimseye söyleme. Kimseye."),
    ("R13", "MERT",   "[teasing] Ne yani, şimdi de tahtaya hayalet mi yazıyor?"),
    ("R14", "ZEYNEP", "[serious] Hasan Amca korktu Mert. Gözlerini görmen lazımdı."),
    ("R15", "ZEYNEP", "[whispers] Mert… pencereye bak. Son sırada biri var."),
    ("R16", "MERT",   "[nervous laugh] Zeynep… sınıfın ışıkları kapalı. Orada kimse yok."),
    ("R17", "SERKAN", "[whispers] [sad] Orası benim sıram… Zeynep."),
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
        cikti = os.path.join(KLASOR, f"KT01_{rid}_{kim}.mp3")
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
