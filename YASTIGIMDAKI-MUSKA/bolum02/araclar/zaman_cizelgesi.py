#!/usr/bin/env python3
"""Çekim listesini gerçek ses süreleriyle zamanlar, sesleri işler ve karıştırır.

Çıktılar:
  zaman.js          → index.html'in okuduğu zaman çizelgesi (çekimler, replikler, altyazı parçaları, ağız zarfları)
  ses/karisim.wav   → bütün bölümün son ses miksajı (-14 LUFS)
  ses/karisim.m4a   → tarayıcıda önizleme için
Kullanım: python3 araclar/zaman_cizelgesi.py
"""
import json, os, re, subprocess
import numpy as np

KLASOR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SES = os.path.join(KLASOR, 'ses')
SR, FPS = 48000, 30

# ───────────────────────── ÇEKİM LİSTESİ ─────────────────────────
# id, en kısa süre, replikler [(id, öncesindeki boşluk)], kuyruk, efektler [(ad, çekim içi saniye, ses düzeyi)]
C = lambda id, **k: dict(id=id, **k)
CEKIMLER = [
    # SAHNE 1 · SOĞUK AÇILIŞ: DİKİŞ KESİLİYOR
    C('A1', min=4.4, bas=0.45, rep=[('I01', 0)], kuyruk=0.4, efekt=[('iplik_kesme', 0.05, 1.0), ('yastik_soluk', 1.25, .9)]),
    C('A2', min=3.9, efekt=[('kumas', 0.2, .7)]),
    C('A3', bas=0.2, rep=[('I02', 0)], kuyruk=0.5),
    C('A4', bas=0.5, rep=[('G01', 0)], kuyruk=0.5),
    C('A5', min=3.2, bas=0.9, rep=[('H08', 0)], kuyruk=0.8, efekt=[('bilezik', 0.2, .5)]),
    C('T1', min=3.4, efekt=[('baslik_hit', 0.15, .9)]),
    # SAHNE 2 · TELEFON
    C('B1', bas=0.3, rep=[('N01', 0)], kuyruk=0.2),
    C('B2', bas=0.2, rep=[('E01', 0), ('E02', 0.3)], kuyruk=0.25),
    C('B3', bas=0.2, rep=[('N02', 0)], kuyruk=0.3),
    C('B4', bas=0.2, rep=[('E03', 0)], kuyruk=1.0, efekt=[('telefon_kapat', 'son-0.95', .8)]),
    C('B5', bas=0.3, rep=[('I03', 0)], kuyruk=0.5),
    C('B6', bas=0.9, rep=[('I08', 0)], kuyruk=0.6),
    C('B7', bas=0.5, rep=[('I09', 0)], kuyruk=0.5, efekt=[('kumas', 0.6, .5)]),
    # SAHNE 3 · AKŞAM YEMEĞİ
    C('C1', bas=0.9, rep=[('H01', 0)], kuyruk=0.3, efekt=[('bilezik', 0.3, .6)]),
    C('C2', bas=0.3, rep=[('I04', 0)], kuyruk=0.3),
    C('C2B', bas=0.2, rep=[('H09', 0)], kuyruk=0.4),
    C('C3', bas=0.2, rep=[('H02', 0)], kuyruk=0.25),
    C('C4', bas=0.2, rep=[('E04', 0)], kuyruk=0.25),
    C('C5', min=3.2, bas=0.7, rep=[('H03', 0)], kuyruk=0.6),
    C('C6', bas=0.5, rep=[('N03', 0)], kuyruk=0.4, efekt=[('masaya_birak', 0.3, 1.0)]),
    C('C7', bas=0.3, rep=[('H04', 0)], kuyruk=0.3, efekt=[('bilezik', 0.2, .5)]),
    C('C8', bas=0.2, rep=[('E05', 0)], kuyruk=0.25),
    C('C9', bas=0.3, rep=[('I05', 0)], kuyruk=0.4),
    C('C10', bas=0.3, rep=[('H05', 0)], kuyruk=0.7, efekt=[('bilezik', 0.5, .6)]),
    C('C11', bas=0.2, rep=[('N04', 0)], kuyruk=0.3),
    C('C12', bas=0.3, rep=[('H06', 0)], kuyruk=1.0),
    # SAHNE 4 · GECE 03:00, BANYO
    C('D0', min=3.4, bas=1.1, rep=[('E06', 0)], kuyruk=0.4),
    C('D0B', bas=0.3, rep=[('I10', 0)], kuyruk=0.5),
    C('D1', min=3.0, efekt=[('kagit_acma', 0.8, .8)]),
    C('D2', bas=0.3, rep=[('I06', 0)], kuyruk=0.3),
    C('D3', bas=0.3, rep=[('I07', 0)], kuyruk=0.4),
    C('D4', min=3.7, efekt=[('dugum', 0.3, 1.0)]),
    C('D5', min=2.9, efekt=[('bilezik', 0.4, .8)]),
    C('D6', bas=1.6, rep=[('H07', 0)], kuyruk=0.4, efekt=[('kapi_kolu', 0.2, 1.0)]),
    C('D7', min=2.2),
    C('D8', min=1.4, efekt=[('final_hit', 0.0, 1.0)]),
    C('D9', min=4.6),
]

# Fon sesleri: ad, başlangıç çekimi, bitiş çekimi, düzey, giriş, çıkış (saniye), [ofset]
FONLAR = [
    ('gerilim', 'A1', 'A3', .35, 0.5, 0.3),
    ('mum_oda', 'A4', 'A4', .55, 0.3, 0.2),
    ('gerilim', 'A4', 'A5', .35, 0.5, 0.2, 5.0),
    ('gerilim', 'B1', 'B7', .15, 0.8, 0.8),
    ('ofis', 'B2', 'B2', .30, 0.1, 0.1),
    ('ofis', 'B4', 'B4', .30, 0.1, 0.1, 4.0),
    ('sofra', 'C1', 'C4', .35, 0.5, 0.2),
    ('duvar_saati', 'C5', 'C6', .50, 0.1, 0.3),
    ('sofra', 'C7', 'C9', .25, 0.3, 0.3, 3.0),
    ('gerilim', 'C10', 'C12', .40, 0.5, 0.6),
    ('gece_saat', 'D0', 'D0B', .40, 0.6, 0.4),
    ('damla', 'D1', 'D7', .45, 0.6, 0.1),
    ('gerilim', 'D2', 'D7', .40, 1.0, 0.05),
]

# ───────────────────────── SES İŞLEME ─────────────────────────
def oku(yol, filtre=None):
    k = ['ffmpeg', '-v', 'error', '-i', yol]
    if filtre:
        k += ['-af', filtre]
    k += ['-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(k, capture_output=True, check=True).stdout, np.float32).copy()


def kirp(x, esik_db=-42):
    """Baştaki/sondaki sessizliği atar; (sinyal, baştan atılan saniye) döner."""
    pencere = int(SR * .01)
    e = np.sqrt(np.convolve(x ** 2, np.ones(pencere) / pencere, 'same'))
    ust = np.where(e > 10 ** (esik_db / 20))[0]
    if not len(ust):
        return x, 0.0
    a, b = max(0, ust[0] - int(SR * .04)), min(len(x), ust[-1] + int(SR * .12))
    return x[a:b], a / SR


def sikistir(x, en_uzun=0.42, esik_db=-40):
    """Replik içindeki uzun sessizlikleri en_uzun saniyeye indirir; (sinyal, zaman_eşleme) döner."""
    p = int(SR * .02)
    e = np.sqrt(np.convolve(x ** 2, np.ones(p) / p, 'same'))
    sessiz = e < 10 ** (esik_db / 20)
    parcalar, harita, i, n = [], [(0.0, 0.0)], 0, len(x)
    yeni = 0
    while i < n:
        j = i
        while j < n and sessiz[j] == sessiz[i]:
            j += 1
        uz = j - i
        if sessiz[i] and uz > en_uzun * SR and i > 0 and j < n:
            tut = int(en_uzun * SR)
            parca = np.concatenate([x[i:i + tut // 2], x[j - tut // 2:j]])
        else:
            parca = x[i:j]
        parcalar.append(parca)
        harita.append((j / SR, (yeni + len(parca)) / SR))
        yeni += len(parca)
        i = j
    return np.concatenate(parcalar), harita


def esle(harita, t):
    for (a0, b0), (a1, b1) in zip(harita, harita[1:]):
        if t <= a1:
            return b0 + (min(t, a1) - a0) * ((b1 - b0) / (a1 - a0) if a1 > a0 else 0)
    return harita[-1][1]


def normalle(x, hedef_db):
    aktif = x[np.abs(x) > 0.01]
    rms = np.sqrt((aktif ** 2).mean()) if len(aktif) else 1e-4
    y = x * (10 ** (hedef_db / 20) / rms)
    tepe = np.abs(y).max()
    return y * (0.95 / tepe) if tepe > 0.95 else y


ISLEM = {  # replik türüne/kimliğine göre ffmpeg filtresi ve hedef seviye
    'diyalog': ('highpass=f=70,atempo=1.05', -19),
    'icses':   ('highpass=f=80,atempo=1.03,aecho=0.85:0.5:35:0.12', -20),
    'sarki':   ('highpass=f=80,aecho=0.8:0.6:60:0.2', -21),
    'H07':     ('lowpass=f=1400,aecho=0.8:0.6:40:0.25', -22),
}


def zarf(x):
    """30 fps ağız açıklığı zarfı (0–1)."""
    n = len(x) // (SR // FPS) + 1
    r = np.array([np.sqrt((x[i * SR // FPS:(i + 1) * SR // FPS] ** 2).mean() + 1e-12) for i in range(n)])
    db = 20 * np.log10(r + 1e-9)
    v = np.clip((db + 42) / 24, 0, 1)
    v = np.convolve(v, [.25, .5, .25], 'same')
    return [round(float(a), 2) for a in v]


def parca_zamanlari(r, ofset, sure, harita):
    """Altyazı parçalarının replik içindeki başlangıçlarını ElevenLabs karakter zamanlamasından bulur."""
    parcalar = r.get('parca') or [r.get('altyazi') or re.sub(r'\s+', ' ', re.sub(r'\[[^\]]*\]', '', r['metin'])).strip()]
    hiz = json.load(open(os.path.join(SES, r['id'] + '.json')))
    yazi = ''.join(hiz['characters'])
    out, ara = [], 0
    for p in parcalar:
        anahtar = p[:12]
        i = yazi.find(anahtar, ara)
        bas = esle(harita, max(0.0, hiz['character_start_times_seconds'][i] - ofset)) if i >= 0 and out else 0.0
        if i >= 0:
            ara = i + 1
        out.append({'metin': p.replace('...', '…'), 'bas': round(min(bas, sure - .3), 2)})
    for j, o in enumerate(out):
        o['bit'] = out[j + 1]['bas'] if j + 1 < len(out) else round(sure, 2)
    return out


def main():
    cfg = json.load(open(os.path.join(KLASOR, 'replikler.json')))
    rep = {r['id']: r for r in cfg['replikler']}
    sesler = {}
    for r in cfg['replikler']:
        filtre, hedef = ISLEM.get(r['id']) or ISLEM[r['tur'] if r['tur'] in ISLEM else 'diyalog']
        ham = oku(os.path.join(SES, r['id'] + '.mp3'))
        x, ofset = kirp(ham)
        x, harita = sikistir(x, 0.5 if r['tur'] in ('icses', 'sarki') or r['kim'] == 'GULIZAR' else 0.36)
        yol = os.path.join(SES, '.tmp.wav')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', yol], input=x.tobytes(), check=True)
        y = oku(yol, filtre)
        olcek = len(y) / len(x)
        harita = [(a, b * olcek) for a, b in harita]
        sesler[r['id']] = (normalle(y, hedef), ofset, len(y) / SR, harita)
    os.remove(os.path.join(SES, '.tmp.wav'))

    # Zamanlama
    t, cekimler, replikler, efektler = 0.0, [], [], []
    for c in CEKIMLER:
        imlec = t + c.get('bas', 0.3)
        for rid, bosluk in c.get('rep', []):
            imlec += bosluk
            sinyal, ofset, konusma, harita = sesler[rid]
            r = rep[rid]
            replikler.append({'id': rid, 'kim': r['kim'], 'tur': r['tur'], 't0': round(imlec, 3),
                              't1': round(imlec + konusma, 3), 'cekim': c['id'],
                              'parcalar': [{**p, 'bas': round(imlec + p['bas'], 3), 'bit': round(imlec + p['bit'], 3)}
                                           for p in parca_zamanlari(r, ofset, konusma, harita)],
                              'zarf': zarf(sinyal[:int(konusma * SR)])})
            imlec += konusma
        son = max(t + c.get('min', 0), imlec + c.get('kuyruk', 0.4))
        cekimler.append({'id': c['id'], 't0': round(t, 3), 't1': round(son, 3)})
        for ad, an, duzey in c.get('efekt', []):
            bas = son - float(an.split('-')[1]) if isinstance(an, str) else t + an
            efektler.append((ad, bas, duzey))
        t = son
    SURE = round(t, 3)
    ct = {c['id']: c for c in cekimler}

    # Karışım
    mix = np.zeros(int((SURE + 1) * SR), np.float32)

    def ekle(x, bas, duzey=1.0, gir=0.0, cik=0.0):
        x = x.copy() * duzey
        if gir > 0:
            n = min(len(x), int(gir * SR)); x[:n] *= np.linspace(0, 1, n)
        if cik > 0:
            n = min(len(x), int(cik * SR)); x[-n:] *= np.linspace(1, 0, n)
        i = int(bas * SR)
        if i >= len(mix):
            return
        x = x[:len(mix) - i]
        mix[i:i + len(x)] += x

    onbellek = {}
    def efekt(ad):
        if ad not in onbellek:
            onbellek[ad] = normalle(oku(os.path.join(SES, f'efekt_{ad}.mp3')), -20)
        return onbellek[ad]

    for f in FONLAR:
        ad, c0, c1, duzey, gir, cik = f[:6]
        ofs = f[6] if len(f) > 6 else 0
        bas, bit = ct[c0]['t0'], ct[c1]['t1']
        kaynak = efekt(ad)
        uzun = int((bit - bas) * SR)
        x = np.tile(kaynak, uzun // len(kaynak) + 2)[int(ofs * SR):int(ofs * SR) + uzun]
        ekle(x, bas, duzey, gir, cik)
    for ad, bas, duzey in efektler:
        ekle(efekt(ad), bas, duzey, 0.005, 0.05)
    for r in replikler:
        sinyal = sesler[r['id']][0]
        ekle(sinyal, r['t0'], 1.0)

    mix = mix[:int(SURE * SR)]
    ham = os.path.join(SES, '.mix_ham.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', ham], input=mix.tobytes(), check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', ham, '-af', 'loudnorm=I=-14:TP=-1.0:LRA=11', '-ar', str(SR), '-ac', '2',
                    os.path.join(SES, 'karisim.wav')], check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(SES, 'karisim.wav'), '-c:a', 'aac', '-b:a', '192k',
                    os.path.join(SES, 'karisim.m4a')], check=True)
    os.remove(ham)

    with open(os.path.join(KLASOR, 'zaman.js'), 'w') as f:
        f.write('// araclar/zaman_cizelgesi.py tarafından üretildi — elle düzenleme\n')
        f.write('const ZAMAN = ' + json.dumps({'fps': FPS, 'sure': SURE, 'cekimler': cekimler, 'replikler': replikler},
                                              ensure_ascii=False, separators=(',', ':')) + ';\n')
    print(f'Toplam süre: {SURE:.2f} sn ({int(SURE // 60)}:{SURE % 60:05.2f})')
    for c in cekimler:
        print(f"  {c['id']:3s} {c['t0']:7.2f} → {c['t1']:7.2f}  ({c['t1'] - c['t0']:.2f})")


if __name__ == '__main__':
    main()
