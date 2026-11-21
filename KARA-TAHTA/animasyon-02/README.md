# KARA TAHTA — 2. Bölüm Animasyonu ("Silinmeyen")

2 dakikalık 2D korku animasyonu. 1. bölümle aynı motor ve aynı sesler; senaryo: `../Bolum-02-Silinmeyen.md`.

## İzlemek
- **Hazır video:** `node video_disa_aktar.js` → `KaraTahta_Bolum2.mp4` (1080p, ~4 dakikada üretilir).
- **Tarayıcıda:** `index.html` dosyasını Chrome'da aç, **🎙 Sesleri Yükle** ile `ses/` klasöründeki 14 dosyayı seç, ekrana tıkla.

## Sesler
1. bölümle aynı ElevenLabs sesleri (ayrıntı: `../animasyon/README.md`). Yeniden üretmek için:
`ELEVENLABS_API_KEY=... python3 seslendir.py R03` (sadece verilen replikler).

## Video almak
```
cd KARA-TAHTA/animasyon-02
node video_disa_aktar.js            # 1920x1080
node video_disa_aktar.js 1280 720   # daha hızlı
ALTYAZI=0 node video_disa_aktar.js  # altyazısız
```

## Zaman çizelgesi
| Saniye | Sahne |
|---|---|
| 0–10 | Soğuk açılış (tahtada 14) ve başlık |
| 10–48.5 | Silinmeyen: sünger kararır, ıslak bezle yazı beyazlaşır, Mert'e ceza |
| 48.5–60.5 | Koridor: Zeynep anlatır, Mert inanmaz |
| 60.5–95.5 | Ceza: Mert tek başına, 14 yeniden yazılır, camdaki yansıma, ışık söner |
| 95.5–120 | Final: kilitli kapı, "Beni silemezsin… Mert.", camda el izi, DEVAM EDECEK, 13 |

Düzenleme için `index.html` en üstündeki `AYAR` bloğu (replik zamanları, efektler, yazılar). Belirli bir kare: `index.html?t=76`.
