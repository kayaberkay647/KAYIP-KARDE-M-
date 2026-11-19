# KAMERADAKİ İKİNCİ KARDEŞ — 1. Bölüm: "Evde Biri Daha Var"

150 saniyelik, 9:16 dikey (1080×1920, 30 fps), Türkçe seslendirmeli 2D animasyon.

**Çıktı:** `cikti/kameradaki_ikinci_kardes_bolum_01.mp4` (H.264 + AAC 256 kbps, ~-15 LUFS)

## Klasörler

```
senaryo/                      Bölüm senaryosu, karakterler, sahne tablosu
proje/
  animasyon/                  Tarayıcıda çalışan animasyon (index.html ile izlenir)
    js/cekirdek.js            matematik, 3B→2B projeksiyon, gren, vinyet
    js/karakter.js            katmanlı karakter rigi (kafa, gövde, kollar, gözler, kaşlar, ağız, saç)
    js/mekan.js               salon, koridor, K1/K2 kamera görünümü, telefon arayüzü, çocuk çizimi
    js/cekim.js               dudak senkronu, göz kırpma, karakteri mekâna yerleştirme, alan derinliği
    js/sahneler.js            karakterlerin zaman çizelgesi + 15 sahnenin çekim listesi
    js/ana.js                 kare oluşturma, geçişler, altyazı
    veri/diyalog.js           (üretilir) altyazı + kare başına ağız açıklığı/şekli
    veri/yurume.js            yürüyüş yolları ve adım zamanları (ayak sesleri de buradan)
    fontlar/                  Inter, JetBrains Mono (OFL)
  araclar/
    1_diyalog_uret.py         Türkçe TTS → fısıltı/titreme/yankı işlemleri → dudak senkronu + SRT
    2_ses_mix.py              ortam sesleri, efektler, gerilim ambiyansı, diyalog miksi
    3_render.js               paralel kare çizimi + H.264 + ses → MP4
    kare_onizle.js            seçili saniyeleri PNG olarak kaydeder
  ses/diyalog/ham/            TTS ham kayıtları (önbellek) + kelime zamanları
  ses/diyalog/islenmis/       sahnede kullanılan işlenmiş replikler (L01–L29)
  ses/bolum_01_ses.flac       son ses miksi
  altyazi/                    SRT
cikti/                        MP4
```

## Yeniden üretmek

```bash
pip install edge-tts numpy scipy soundfile pyloudnorm     # + ffmpeg, Node.js, Playwright (Chromium)
cd proje/araclar
python3 1_diyalog_uret.py        # sesler + dudak senkronu + altyazı
python3 2_ses_mix.py             # efekt + müzik + miks  → ses/bolum_01_ses.wav
node 3_render.js 4               # 4 paralel işçi → ../cikti/kameradaki_ikinci_kardes_bolum_01.mp4
ALTYAZI=0 node 3_render.js 4     # altyazısız sürüm
```

İzlemek / sahneye bakmak: `proje/animasyon/index.html` (Boşluk = oynat). Belirli kare: `index.html?t=135`.

## Seslendirme

- Arda: Microsoft **tr-TR-AhmetNeural**, Defne / İkinci Defne / çocuk fısıltısı: **tr-TR-EmelNeural** (edge-tts ile).
- İkinci Defne aynı ses kimliğidir; yavaşlatılır, boğuklaştırılır, yankı + ters yankı + ince ikiz katman eklenir.
- Fısıltılar LPC tabanlı fısıltı dönüştürmesiyle, korku titremesi perde/genlik titreşimiyle üretilir.
- **ElevenLabs ile değiştirmek:** sahneye göre yazılmış etiketli metinler, ses tasarımları ve ayarlar `senaryo/ElevenLabs-Seslendirme-Metni.md` içinde. Üretilen dosyaları `proje/ses/diyalog/elevenlabs/L01.mp3 … L29.mp3` (veya .wav) adıyla koyup üç adımı yeniden çalıştırın. Betik bu dosyaları TTS yerine kullanır, dudak senkronunu sesten yeniden hesaplar; fısıltı/titreme eklemez, yalnızca oda akustiğini ekler. Ticari yayın için lisanslı bir ses (ElevenLabs vb.) önerilir.

## Düzenleme

- Replik zamanı / ton: `araclar/1_diyalog_uret.py` → `REPLIKLER` (t, hiz, perde, fisilti, titreme, ortam).
- Efekt zamanları: `araclar/2_ses_mix.py` → `efektler()`.
- Kamera ve oyunculuk: `animasyon/js/sahneler.js` → `durumArda/durumDefne/durumIkinci` ve `cekim(...)` satırları.
