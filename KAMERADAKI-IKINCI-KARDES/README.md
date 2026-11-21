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
    0_elevenlabs_uret.py      ElevenLabs ile 29 repliği üretir (süre sınırını aşanı yeniden dener)
    1_diyalog_uret.py         sesleri işler (ElevenLabs ya da TTS) → dudak senkronu + SRT
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
python3 0_elevenlabs_uret.py     # (isteğe bağlı) ElevenLabs sesleri
python3 1_diyalog_uret.py        # sesler + dudak senkronu + altyazı
python3 2_ses_mix.py             # efekt + müzik + miks  → ses/bolum_01_ses.wav
node 3_render.js 4               # 4 paralel işçi → ../cikti/kameradaki_ikinci_kardes_bolum_01.mp4
ALTYAZI=0 node 3_render.js 4     # altyazısız sürüm
```

İzlemek / sahneye bakmak: `proje/animasyon/index.html` (Boşluk = oynat). Belirli kare: `index.html?t=135`.

## Seslendirme

Videodaki sesler **ElevenLabs (Eleven v4)** ile üretildi. Metinler ve duygu etiketleri `senaryo/ElevenLabs-Seslendirme-Metni.md` dosyasında.

- Arda: hazır ses **Will**. Defne, İkinci Defne ve çocuk fısıltısı: hazır ses **Jessica**. İkinci Defne daha düz/sakin ayarla okunur; çocuk fısıltısının perdesi `1_diyalog_uret.py` içinde inceltilir.
- Ücretsiz ElevenLabs paketi API'de yalnızca hazır seslere izin verir; kütüphane sesleri ve Voice Design ücretli pakette açılır.
- Ücretli pakette Türkçe kütüphane seslerine geçmek için `araclar/0_elevenlabs_uret.py` içindeki `SESLER` bölümüne ses ID'lerini yazın, `ses/diyalog/elevenlabs/L*.mp3` dosyalarını silin ve betiği yeniden çalıştırın. Öneriler: Arda için Yunus (`Q5n6GDIjpN0pLOlycRFT`), Defne için Gökçe Deniz (`oPC5I9GKjMReiaM29gjY`).
- Betik ElevenLabs kayıtlarına fısıltı/titreme eklemez; yalnızca oda akustiğini ekler: uzak ses, kapı arkası, ikinci Defne yankısı, çocuk fısıltısı yankısı.
- `ses/diyalog/elevenlabs/` klasörü boşsa sistem Microsoft Edge TTS'e döner (tr-TR-AhmetNeural / tr-TR-EmelNeural).

```bash
python3 0_elevenlabs_uret.py          # eksik replikleri ElevenLabs ile üretir (ELEVENLABS_API_KEY ya da ortamın bağlı anahtarı)
python3 0_elevenlabs_uret.py L17 L19  # yalnız bu replikleri yeniden üretir
```

## Düzenleme

- Replik zamanı / ton: `araclar/1_diyalog_uret.py` → `REPLIKLER` (t, hiz, perde, fisilti, titreme, ortam).
- Efekt zamanları: `araclar/2_ses_mix.py` → `efektler()`.
- Kamera ve oyunculuk: `animasyon/js/sahneler.js` → `durumArda/durumDefne/durumIkinci` ve `cekim(...)` satırları.
