# ElevenLabs Sound Effects ile ortam seslerini üretir → efekt/*.mp3  (var olanlar atlanır)
import json, os, sys, urllib.request, time
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EFEKT = {
    "yagmur":      (22, "gentle steady rain falling outside an apartment window at night, heard from indoors, soft and continuous, seamless loop"),
    "nefes":       (4,  "frightened young woman breathing fast and shaky, close microphone, no words"),
    "vurgu":       (3,  "short cinematic tension hit, deep impact with dark reverb tail, thriller"),
    "tiktak":      (10, "old wall clock ticking quietly in a silent room"),
    "adim_ic":     (4,  "a few hesitant footsteps on an old wooden parquet floor indoors"),
    "kapi_gicirt": (3,  "old wooden apartment door slowly creaking open"),
    "koridor_adim":(4,  "footsteps echoing in an apartment building stairwell corridor, approaching"),
    "kapi_kapan":  (2,  "apartment door slammed shut hard, echo in stairwell"),
    "siren":       (8,  "police car siren passing outside in rain at night, heard from inside a building, distant"),
    "telsiz":      (5,  "police radio walkie talkie static chatter, short beep and unintelligible voice, low volume"),
    "titresim":    (3,  "smartphone vibrating on a wooden table, two short buzzes"),
    "hat_kesik":   (3,  "phone call suddenly disconnected, click then busy tone beeps"),
    "yukselis":    (4,  "short cinematic tension riser swelling up, dark strings and low synth, ends abruptly"),
    "anahtar":     (3,  "small metal key picked up from wooden floor and dropped into a plastic evidence bag, rustle"),
    "torba":       (2,  "plastic evidence bag being handled, crinkle"),
    "piyano":      (8,  "slow sad sparse piano notes, melancholic, minor key, soft"),
    "vurus3":      (3,  "three loud hard knocks on a wooden apartment door, slow and heavy"),
    "final_vurgu": (4,  "cinematic thriller ending stinger, big rising hit then sudden silence"),
    "gecmis":      (3,  "soft dreamy whoosh transition into a flashback, airy shimmer"),
    "gecmis_don":  (2,  "soft reverse whoosh returning from flashback"),
    "sokak":       (22, "distant city street at night in the rain heard from inside an apartment, cars passing slowly on wet asphalt, faraway dog, very subtle, seamless loop"),
    "baslik":      (4,  "dark cinematic title impact boom with subtle metallic ring, mystery series logo sting"),
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
