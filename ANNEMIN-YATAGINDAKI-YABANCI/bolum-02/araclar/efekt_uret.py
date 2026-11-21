# ElevenLabs Sound Effects ile ortam seslerini üretir → efekt/*.mp3  (var olanlar atlanır)
import json, os, sys, urllib.request, time
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EFEKT = {   # 2. bölüme özel efektler
    "tini":         (22, "very soft dark ambient drone tone, warm low pad with subtle melancholic resonance, continuous and seamless, no rhythm, no melody"),
    "dosya":        (2,  "old paper files and a photograph being handled, paper rustle"),
    "perde":        (2,  "sheer curtain being pulled aside slowly on a curtain rod"),
    "cocuk_aglama": (4,  "a little girl crying and sobbing in the distance outside at night, muffled, far away"),
    "araba_kapi":   (2,  "old car door closing with a heavy thud outside at night, distant"),
    "cekmece":      (2,  "old wooden drawer sliding open, slight creak"),
    "kutu_gicirti": (2,  "old tin sewing box lid opening with a small metallic creak"),
    "eldiven":      (2,  "latex gloves being put on, snap"),
    "kagit":        (2,  "old envelope and letter paper unfolding, crisp rustle"),
    "kalp":         (6,  "very subtle low heartbeat-like tension pulse, soft and slow, cinematic"),
}
os.makedirs(f"{KOK}/efekt", exist_ok=True)
for ad, (sure, tarif) in EFEKT.items():
    f = f"{KOK}/efekt/{ad}.mp3"
    if os.path.exists(f) and ad not in sys.argv[1:]:
        continue
    govde = json.dumps({"text": tarif, "duration_seconds": sure, "prompt_influence": 0.5}).encode()
    for d in range(3):
        try:
            req = urllib.request.Request("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", data=govde,
                headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
            open(f, "wb").write(urllib.request.urlopen(req, timeout=180).read()); print(ad, "tamam"); break
        except Exception as e:
            print("hata", ad, e, getattr(e, "read", lambda: b"")()[:200]); time.sleep(4)
