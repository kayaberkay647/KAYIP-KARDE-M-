# ElevenLabs (eleven_v3, duygu etiketleri) ile tüm replikleri seslendirir (ses + harf zamanlaması).
# Kullanım: python3 araclar/ses_uret.py [R05 R07 ...]   (boş = hepsi, var olanlar atlanır; id verilirse yeniden üretilir)
import json, base64, sys, os, urllib.request, time
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SES = {  # karakter: (voice_id, stability, similarity, style, hız)
    "AYLIN":   ("aEJD8mYP0nuof1XHShVY", 0.38, 0.80, 0.45, 1.00),
    "EMIR":    ("rSuyucEH95GpZEfLV0AM", 0.50, 0.80, 0.25, 0.97),
    "MURAT":   ("j82ax9yhzfYwq9lDvRWL", 0.55, 0.80, 0.20, 1.00),
    "ZEHRA":   ("gyxPK6bLXQAkBSCeAKvk", 0.40, 0.80, 0.40, 1.05),
    "GOREVLI": ("mBUB5zYuPwfVE6DTcEjf", 0.65, 0.80, 0.10, 1.03),
    "MEMUR":   ("LCHGt3rsPMP50Vs28amI", 0.60, 0.80, 0.15, 1.05),
}
secili = set(sys.argv[1:])
os.makedirs(f"{KOK}/ses", exist_ok=True)
for r in json.load(open(f"{KOK}/replikler.json")):
    mp3, js = f"{KOK}/ses/{r['id']}_{r['k']}.mp3", f"{KOK}/ses/{r['id']}_{r['k']}.json"
    if (secili and r["id"] not in secili) or (not secili and os.path.exists(mp3)):
        continue
    vid, st, sim, sty, hiz = SES[r["k"]]
    hiz = round(min(1.15, hiz + r.get("hiz", 0)), 2)
    # eleven_v3: duygu etiketli metin; stability yalnızca 0.0 (yaratıcı) / 0.5 (doğal) / 1.0 olabilir
    V3_ST = {"AYLIN": 0.0, "ZEHRA": 0.0, "EMIR": 0.0, "MURAT": 0.5, "GOREVLI": 0.5, "MEMUR": 0.5}
    govde = json.dumps({"text": r.get("v3", r["m"]), "model_id": "eleven_v3", "language_code": "tr",
        "voice_settings": {"stability": V3_ST[r["k"]], "similarity_boost": sim, "style": sty, "use_speaker_boost": True}}).encode()
    for deneme in range(4):
        try:
            req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{vid}/with-timestamps?output_format=mp3_44100_128",
                data=govde, headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
            d = json.load(urllib.request.urlopen(req, timeout=120)); break
        except Exception as e:
            print("hata", r["id"], e); time.sleep(3 * (deneme + 1))
    else:
        sys.exit(1)
    open(mp3, "wb").write(base64.b64decode(d["audio_base64"]))
    json.dump(d.get("alignment"), open(js, "w"), ensure_ascii=False)
    print(r["id"], r["k"], "tamam")
