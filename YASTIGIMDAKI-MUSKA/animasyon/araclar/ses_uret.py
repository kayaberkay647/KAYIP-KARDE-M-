#!/usr/bin/env python3
"""YASTIĞIMDAKİ MUSKA – replikleri ElevenLabs ile seslendirir.

Kullanım:
  python3 araclar/ses_uret.py            # eksik replikleri üretir
  python3 araclar/ses_uret.py H01 N03    # sadece bu replikleri yeniden üretir
  python3 araclar/ses_uret.py --kontrol  # üretilen sesleri yazıya döküp metinle karşılaştırır

API anahtarı: ELEVENLABS_API_KEY ortam değişkeni (bu bulut oturumunda proxy ekler).
Her replik için ses/<ID>.mp3 ve ses/<ID>.json (karakter zamanlaması) yazılır.
"""
import base64, json, os, re, sys, urllib.request, difflib

KLASOR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SES = os.path.join(KLASOR, 'ses')
API = 'https://api.elevenlabs.io/v1'
ANAHTAR = os.environ.get('ELEVENLABS_API_KEY', 'proxy-injected')


def istek(yol, veri=None, dosya=None):
    if dosya:
        sinir = '----muska'
        govde = b''
        for k, v in veri.items():
            govde += f'--{sinir}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode()
        govde += f'--{sinir}\r\nContent-Disposition: form-data; name="file"; filename="a.mp3"\r\nContent-Type: audio/mpeg\r\n\r\n'.encode()
        govde += open(dosya, 'rb').read() + f'\r\n--{sinir}--\r\n'.encode()
        tip = f'multipart/form-data; boundary={sinir}'
    else:
        govde, tip = json.dumps(veri).encode(), 'application/json'
    r = urllib.request.Request(API + yol, data=govde, headers={'Content-Type': tip, 'xi-api-key': ANAHTAR})
    with urllib.request.urlopen(r, timeout=180) as y:
        return json.loads(y.read())


def temiz(m):
    return re.sub(r'\s+', ' ', re.sub(r'\[[^\]]*\]', '', m)).strip()


def uret(cfg, r):
    ses = cfg['sesler'][r['kim']]
    d = istek(f"/text-to-speech/{ses['voice_id']}/with-timestamps?output_format=mp3_44100_192",
              {'text': r['metin'], 'model_id': cfg['model'], 'voice_settings': ses['ayar']})
    open(os.path.join(SES, r['id'] + '.mp3'), 'wb').write(base64.b64decode(d['audio_base64']))
    json.dump(d.get('alignment') or d.get('normalized_alignment'), open(os.path.join(SES, r['id'] + '.json'), 'w'), ensure_ascii=False)
    print('üretildi', r['id'], temiz(r['metin']))


def kontrol(cfg):
    for r in cfg['replikler']:
        f = os.path.join(SES, r['id'] + '.mp3')
        if not os.path.exists(f):
            continue
        t = istek('/speech-to-text', {'model_id': 'scribe_v1', 'language_code': 'tur'}, dosya=f).get('text', '')
        a = re.sub(r'[^\wçğıöşü ]', '', temiz(r['metin']).lower())
        b = re.sub(r'[^\wçğıöşü ]', '', re.sub(r'\([^)]*\)', '', t).lower())
        oran = difflib.SequenceMatcher(None, a.split(), b.split()).ratio()
        print(f"{r['id']} {'OK ' if oran > .8 else '!! '} {oran:.2f} | {t}")


if __name__ == '__main__':
    cfg = json.load(open(os.path.join(KLASOR, 'replikler.json')))
    os.makedirs(SES, exist_ok=True)
    if '--kontrol' in sys.argv:
        kontrol(cfg)
        sys.exit()
    secili = set(a for a in sys.argv[1:] if not a.startswith('-'))
    for r in cfg['replikler']:
        hedef = os.path.join(SES, r['id'] + '.mp3')
        if (secili and r['id'] in secili) or (not secili and not os.path.exists(hedef)):
            uret(cfg, r)
