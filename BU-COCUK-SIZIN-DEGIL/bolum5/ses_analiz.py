# Sahne sesi analizi (ses_uret.js tarafından çağrılır)
#  - Konuşmadan metne (STT) kelime zamanlarını senaryo kelimeleriyle eşleştirir → her repliğin gerçek başlangıç/bitişi
#  - Replikler arasında en sessiz anı bulur → kesme noktası (kelime asla ortadan bölünmez)
#  - Arada sessizlik yoksa (konuşmalar birbirine akıyorsa) "bitisik" işaretler → araya boşluk eklenmez
#  - İfade ölçümü: ses perdesi değişkenliği (yarım ton), doğruluk
# Kullanım: python3 ses_analiz.py ses.mp3 stt.json satirlar.json  → JSON çıktı
import sys, json, re, subprocess, difflib
import numpy as np

SR = 16000
def yukle(f):
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

def sade(w):
    w = w.replace('İ', 'i').replace('I', 'ı').lower()
    w = re.sub(r'(.)\1{2,}', r'\1', w)
    return re.sub(r'[^a-zçğıöşüâ0-9]', '', w)

def enerji_db(x, t0, t1):
    a, b = max(0, int(t0 * SR)), min(len(x), int(t1 * SR))
    if b <= a: return -120.0
    return float(20 * np.log10(np.sqrt(np.mean(x[a:b] ** 2)) + 1e-9))

def en_sessiz(x, t0, t1, pen=0.02):
    """[t0, t1] aralığında en sessiz 20 ms'lik noktanın ortası ve seviyesi"""
    if t1 - t0 < pen: m = (t0 + t1) / 2; return m, enerji_db(x, m - pen / 2, m + pen / 2)
    en, en_t = 1e9, t0
    t = t0
    while t + pen <= t1:
        e = enerji_db(x, t, t + pen)
        if e < en: en, en_t = e, t + pen / 2
        t += pen / 4
    return en_t, en

def perde(x):
    n, h = int(SR * .04), int(SR * .01); out = []
    for i in range(0, len(x) - n, h):
        fr = x[i:i + n] * np.hanning(n)
        if np.sqrt(np.mean(fr ** 2)) < 0.01: continue
        ac = np.correlate(fr, fr, 'full')[n - 1:]; ac /= ac[0] + 1e-9
        lo, hi = int(SR / 500), int(SR / 75); k = lo + np.argmax(ac[lo:hi])
        if ac[k] > 0.45: out.append(SR / k)
    if not out: return 0.0
    p = np.array(out); return float(np.std(12 * np.log2(p / np.median(p))))

ses, stt_f, satir_f = sys.argv[1:4]
x = yukle(ses); sure = len(x) / SR
stt = [w for w in json.load(open(stt_f, encoding='utf-8'))['words'] if w['type'] == 'word']
satirlar = json.load(open(satir_f, encoding='utf-8'))

# senaryo kelimeleri (satır, kelime) ↔ STT kelimeleri eşleştirme
sk = []
for si, s in enumerate(satirlar):
    for w in s['metin'].split():
        if re.search(r'\w', w): sk.append((si, w))
A = [sade(w) for _, w in sk]; B = [sade(w['text']) for w in stt]
zaman = [None] * len(sk)
for blk in difflib.SequenceMatcher(None, A, B, autojunk=False).get_matching_blocks():
    for k in range(blk.size): zaman[blk.a + k] = (stt[blk.b + k]['start'], stt[blk.b + k]['end'])
eslesen = sum(1 for z in zaman if z)
# eşleşmeyen kelimeler için komşulardan ara değer
for i in range(len(zaman)):
    if zaman[i] is None:
        once = next((zaman[j][1] for j in range(i - 1, -1, -1) if zaman[j]), 0.0)
        sonra = next((zaman[j][0] for j in range(i + 1, len(zaman)) if zaman[j]), sure)
        zaman[i] = (once, max(once, min(sonra, once + 0.3)))

satir_kel = [[] for _ in satirlar]
for (si, w), (s, e) in zip(sk, zaman): satir_kel[si].append({'w': w, 's': round(s, 3), 'e': round(e, 3)})

sonuc = []
for i, s in enumerate(satirlar):
    k = satir_kel[i]
    sonuc.append({'id': s['id'], 'sesBas': k[0]['s'], 'sesSon': k[-1]['e'], 'kelime': k})
# kesme noktaları: replikler arasındaki en sessiz an
for i, r in enumerate(sonuc):
    if i == 0:
        t, e = en_sessiz(x, max(0, r['sesBas'] - 0.4), max(0.0, r['sesBas'] - 0.02)) if r['sesBas'] > 0.05 else (0.0, -120)
        r['kesBas'] = round(max(0.0, t), 3)
    if i + 1 < len(sonuc):
        n = sonuc[i + 1]
        a, b = min(r['sesSon'], n['sesBas']) - 0.05, max(r['sesSon'], n['sesBas']) + 0.05
        t, e = en_sessiz(x, a, b)
        r['kesSon'] = n['kesBas'] = round(t, 3); n['bitisik'] = e > -42
        r['kesSonDb'] = round(e, 1)
    else:
        # son replik: bitişten sonra sessizliğe kadar (en fazla 0.8 sn)
        t = r['sesSon']
        while t < min(sure, r['sesSon'] + 0.8) and enerji_db(x, t, t + 0.02) > -45: t += 0.02
        r['kesSon'] = round(min(sure, t + 0.12), 3)
print(json.dumps({'sure': sure, 'perde': perde(x), 'dogruluk': eslesen / max(1, len(sk)), 'satirlar': sonuc}, ensure_ascii=False))
