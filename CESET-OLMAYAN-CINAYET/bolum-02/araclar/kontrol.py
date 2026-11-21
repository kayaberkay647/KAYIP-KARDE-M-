# Her repliği ElevenLabs Scribe ile yazıya döker ve senaryo metniyle karşılaştırır.
import json, subprocess, re, sys, os, difflib
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = json.load(open(f"{KOK}/replikler.json")); sec = set(sys.argv[1:])
def norm(s): return re.sub(r"[^\wçğıöşü ]", "", s.replace("İ", "i").replace("I", "ı").lower().replace("b-13", "b on üç").replace("b13", "b on üç").replace("13", "on üç")).split()
kotu = []
for r in R:
    if sec and r["id"] not in sec: continue
    out = subprocess.run(["curl", "-s", "-X", "POST", "https://api.elevenlabs.io/v1/speech-to-text", "-H", "xi-api-key: proxy-injected",
        "-F", "model_id=scribe_v1", "-F", "language_code=tur", "-F", f"file=@{KOK}/ses/{r['id']}_{r['k']}.mp3"], capture_output=True, text=True).stdout
    t = json.loads(out).get("text", "")
    a, b = norm(r["m"]), norm(t); oran = difflib.SequenceMatcher(None, a, b).ratio()
    durum = "OK  " if oran > .92 else "FARK"
    if oran <= .92: kotu.append(r["id"])
    print(durum, r["id"], f"{oran:.2f}", "" if oran > .92 else "| " + t)
print("SORUNLU:", " ".join(kotu))
