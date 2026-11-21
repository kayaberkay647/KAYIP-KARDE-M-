# ElevenLabs Sound Effects ile ortam seslerini üretir → efekt/*.mp3  (var olanlar atlanır)
import json, os, sys, urllib.request, time
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EFEKT = {   # 2. bölüme özel yeni efektler (1. bölümün efektleri efekt/ klasörüne kopyalandı)
    "kapi_ac":       (2,  "apartment door lock latch clicking and wooden door opening quickly, rain sound outside in stairwell"),
    "nefes_kadin":   (3,  "young woman out of breath after running, scared panting, close"),
    "yagmurluk":     (2,  "wet raincoat rustling as a person moves, water dripping"),
    "merdiven_kosu": (3,  "fast heavy footsteps running down concrete stairwell, echoing"),
    "canta":         (2,  "leather bag brushing against a wall and swinging, rustle"),
    "mutfak_kapi":   (2,  "kitchen door opening softly, cups clinking quietly"),
    "anahtar_metal": (2,  "small metal key moving inside a plastic evidence bag, light jingle"),
    "bodrum":        (22, "dark apartment basement ambience, low electrical hum, distant water pipe drip, eerie room tone, seamless"),
    "merdiven_in":   (2,  "two men walking down concrete basement stairs carefully"),
    "kilit":         (2,  "metal key inserted into an old lock and turning with a heavy clack"),
    "metal_kapi":    (3,  "heavy rusty metal storage door slowly creaking open, echo in basement"),
    "deklansor":     (2,  "camera shutter click with flash charging whine"),
    "kayit_tik":     (1,  "small plastic button click of a voice recorder"),
    "kayit_cizirti": (8,  "old voice recorder tape hiss and soft crackle, low level, continuous"),
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
