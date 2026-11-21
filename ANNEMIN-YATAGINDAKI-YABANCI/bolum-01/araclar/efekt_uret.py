# ElevenLabs Sound Effects ile ortam seslerini üretir → efekt/*.mp3  (var olanlar atlanır)
import json, os, sys, urllib.request, time
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EFEKT = {   # bu bölüme özel efektler (diğerleri CESET OLMAYAN CİNAYET kütüphanesinden kopyalandı)
    "ruzgar":        (22, "soft night wind blowing outside an old house, heard from inside, gentle and continuous, seamless loop"),
    "zemin_gicirti": (2,  "old wooden floorboard creaking under a step in a quiet house"),
    "yatak_hisirti": (2,  "person slowly sitting up in bed, bed sheets and blanket rustling, bed frame creak"),
    "kapi_vurus":    (2,  "three quick worried knocks on a wooden apartment front door"),
    "canta_fermuar": (2,  "zipper of a leather handbag being opened slowly"),
    "foto_hisirti":  (2,  "old paper photograph pulled out of a bag, soft paper rustle"),
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
