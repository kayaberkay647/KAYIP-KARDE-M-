#!/usr/bin/env python3
"""efektler.json'daki ses efektlerini ElevenLabs Sound Effects ile üretir → ses/efekt_<ad>.mp3
Kullanım: python3 araclar/efekt_uret.py [ad ...]   (ad verilmezse eksikleri üretir)"""
import json, os, sys, urllib.request

KLASOR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ANAHTAR = os.environ.get('ELEVENLABS_API_KEY', 'proxy-injected')

liste = json.load(open(os.path.join(KLASOR, 'efektler.json')))
secili = set(sys.argv[1:])
for ad, e in liste.items():
    hedef = os.path.join(KLASOR, 'ses', f'efekt_{ad}.mp3')
    if (secili and ad not in secili) or (not secili and os.path.exists(hedef)):
        continue
    veri = {'text': e['metin'], 'duration_seconds': e['sure'], 'prompt_influence': 0.5,
            'model_id': 'eleven_text_to_sound_v2', 'loop': e.get('dongu', False)}
    r = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_192',
                               data=json.dumps(veri).encode(),
                               headers={'Content-Type': 'application/json', 'xi-api-key': ANAHTAR})
    with urllib.request.urlopen(r, timeout=180) as y:
        open(hedef, 'wb').write(y.read())
    print('üretildi', ad)
