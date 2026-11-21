# ElevenLabs (eleven_v3, duygu etiketli) ile replikleri seslendirir → ses/ (mp3 + harf zamanlaması)
# Ses profilleri: ../ortak/sesler.json  |  Kullanım: python3 araclar/ses_uret.py [M05 M07 ...]  (boş = eksikler)
import json, base64, sys, os, urllib.request, time
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SES = json.load(open(f"{KOK}/../ortak/sesler.json"))
secili = set(sys.argv[1:]); os.makedirs(f"{KOK}/ses", exist_ok=True)
for r in json.load(open(f"{KOK}/replikler.json")):
    mp3, js = f"{KOK}/ses/{r['id']}_{r['k']}.mp3", f"{KOK}/ses/{r['id']}_{r['k']}.json"
    if (secili and r["id"] not in secili) or (not secili and os.path.exists(mp3)): continue
    P = SES[r["k"]]
    govde = json.dumps({"text": r.get("v3", r["m"]), "model_id": "eleven_v3", "language_code": "tr",
        "voice_settings": {"stability": r.get("st", P["stability"]), "similarity_boost": P["similarity"], "style": P["style"], "use_speaker_boost": True}}).encode()
    for deneme in range(4):
        try:
            req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{P['voice_id']}/with-timestamps?output_format=mp3_44100_128",
                data=govde, headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
            d = json.load(urllib.request.urlopen(req, timeout=120)); break
        except Exception as e:
            print("hata", r["id"], e); time.sleep(3 * (deneme + 1))
    else: sys.exit(1)
    open(mp3, "wb").write(base64.b64decode(d["audio_base64"])); json.dump(d.get("alignment"), open(js, "w"), ensure_ascii=False)
    print(r["id"], r["k"], "tamam")
