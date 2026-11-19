# KAMERADAKİ YABANCI — 1. Bölüm: GECE 03.13

15 bölümlük psikolojik korku dizisinin ilk bölümü. **Remotion + React + TypeScript** ile kurulmuş, kare kare kontrol edilen bir 2D animasyon projesi.

| | |
|---|---|
| Süre | **tam 120 sn** (02:00) |
| Görüntü | 1080x1920, 9:16 dikey |
| FPS / kare | 30 fps / **3600 kare** |
| Sahne | **18** (süreler senaryodan birebir) |
| Replik | 32 (Kerem 15, Defne 16, Yabancı 1, yalnızca finalde) |
| Dil | Türkçe ses ve altyazı, İngilizce görsel promptları |
| Ses | ElevenLabs (eleven_v3 + ses etiketleri), replik başına ayrı dosya |

## Projede neler var

| Hazır olan | Durumu |
|---|---|
| 18 sahnenin kurgusu, kamera hareketleri (push-in, omuz üstü, takip, rack focus, gerilimde el kamerası), kesmeler | ✅ kodda |
| Karakter rigi: göz kırpma, nefes, baş mikro hareketi, korku titremesi, kaş ifadeleri, **Türkçe dudak senkronu** | ✅ kodda |
| Jenerik, telefon uygulaması arayüzü, "CAM 01 - HAREKET ALGILANDI - 03:13" bildirimi, CCTV görüntüsü (parazit, saat, LIVE), "CAM 02 - KORIDOR", "DEVAM EDECEK..." | ✅ son hâliyle |
| Türkçe altyazı (beyaz, ince siyah dış çizgi, alt-orta, en fazla 2 satır) | ✅ son hâliyle |
| Ses kurgusu: replikler, 43 efekt, yağmur/oda/müzik yatakları, 01:53.6'da müzik kesilmesi, 01:58.5 kararma | ✅ kodda, dosyalar bekleniyor |
| Karakter ve mekân **çizimleri** | ⏳ üretilecek. Promptlar, dosya yolları ve katman sözleşmesi `production/` altında |
| ElevenLabs ses dosyaları | ⏳ üretilecek. `npm run voices` / `npm run sfx` hazır |

Bu ortamda görüntü üretim modeli ve ElevenLabs anahtarı olmadığı için hiçbir çizim ya da ses dosyası uydurulmadı. Çizimler gelene kadar proje **animatik** olarak çalışır. Aynı kat planına sadık vektör yer tutucular, aynı rig mantığıyla hareket eden mankenler kullanılır. Kamera, zamanlama, oyunculuk ve dudak senkronu bu hâliyle de izlenip onaylanabilir. Dosyalar doğru yollara konduğunda kod hiç değişmeden gerçek çizimlere ve seslere geçer.

## Hızlı başlangıç

```bash
cd KAMERADAKI-YABANCI/bolum-01
npm install
npm run studio            # Remotion Studio: kare kare önizleme
npm run render:animatic   # out/KY_E01_animatic.mp4 (bilgi şeritli animatik)
```

Kompozisyonlar:
- `KY-E01`: final (bilgi şeridi yok, altyazılı)
- `KY-E01-Animatic`: üstte sahne, zaman, kare ve replik bilgisi
- `KY-E01-Clean`: altyazısız (platform altyazısı için)

> Bulut/CI ortamında Remotion kendi tarayıcısını indiremezse:
> `REMOTION_BROWSER=/yol/chrome-headless-shell npm run render:animatic`

## Üretim akışı (final için)

1. **Karakter referansları**: `production/01_KARAKTER_REFERANSLARI.md`
   Önce her karakterin model sheet'ini üretip onaylayın. Sonraki her görselde bu referansı kilit olarak kullanın.
2. **Rig katmanları**: Kerem ve Defne için `public/assets/characters/<id>/front|back/*.png`
   1200x2800 boyutunda, şeffaf ve aynı hizada olmalı. Katman listesi ve 9 Türkçe ağız şekli (viseme) dokümanda var.
3. **Mekân plakaları**: `production/02_MEKAN_PLAKALARI.md` (10 plaka) → `public/assets/sets/<SET>/bg.png`
4. **Yabancı**: `public/assets/characters/yabanci/cctv_stand.png`. Yüz çizilmez, kapüşonun içi mutlak siyahtır.
5. **Seslendirme**:
   ```bash
   cp .env.example .env      # ELEVENLABS_API_KEY + 3 voice ID
   npm run voices -- --dry-run   # gönderilecek metinleri kontrol et
   npm run voices                # public/audio/voice/*.mp3 + *.align.json
   ```
   Voice ID'leri 15 bölüm boyunca sabit kalsın diye `production/voices.json` dosyasına da yazın.
   `.align.json` dosyası ElevenLabs'in harf zamanlamasıdır; dudak senkronu bununla birebir çalışır.
6. **Efekt ve ortam**: `npm run sfx` (veya `production/05_SES_EFEKTLERI.md`'deki adlarla elle koyun)
7. **Doğrulama ve render**:
   ```bash
   npm run validate:final    # eksik dosya veya sahneye sığmayan replik varsa durur
   npm run render            # out/KY_E01_GECE_0313.mp4
   ```

## Doğrulama (`npm run validate`)
Her render'dan önce otomatik çalışır ve şunları denetler:
- 1080x1920, 30 fps, 120 sn, 3600 kare, 18 sahne. Sahneler boşluksuz ve ardışık olmalı.
- Diyalog sırası. Her replik kendi sahnesinin içinde başlar ve bir sonrakine taşmaz.
- Gerçek ses süresi ayrılan pencereye sığmalı. Taşarsa hangi replik olduğunu ve kaç saniye taştığını söyler; sahne süresi asla uzatılmaz.
- Altyazı en fazla 2 satır.
- Yabancı yalnızca 01:57'de, tek replikle konuşur.
- `--final`: tüm ses, efekt, plaka ve rig katmanları yerinde mi?

## Klasör yapısı

```
src/
  config.ts              sabit teknik ayarlar (120 sn, 3600 kare, 18 sahne)
  data/script.ts         TEK DOĞRULUK KAYNAĞI: sahneler, replikler, etiketler, efektler, ortam
  data/characters.ts     sabit karakter tanımları + ElevenLabs ses ayarları
  data/locations.ts      kat planı + 10 mekân plakası (promptlar, boyutlar)
  data/rig.ts            karakter katman sözleşmesi, Türkçe viseme listesi
  components/            Camera (parallax/odak/el kamerası), CharacterRig, Stranger,
                         Surveillance (CCTV, telefon, bildirim), Overlays (altyazı, jenerik, son)
  sets/Sets.tsx          plaka yükleyici + animatik vektör mekânlar
  scenes/                S01–S18 çekim planları
  audio/Soundtrack.tsx   ses kurgusu (yalnızca var olan dosyalar)
  lib/lipsync.ts         Türkçe dudak senkronu (hizalama veya süreye yayılmış metin)
scripts/                 scan-assets, validate, generate-voices, generate-sfx, export-production
production/              otomatik üretilen üretim dokümanları ve CSV manifestleri
public/                  çizimler ve sesler (boş klasörler hazır)
```

`production/*.md` ve `*.csv` dosyaları `npm run prompts` ile `src/data/` içinden yeniden üretilir.

## Değişmez kurallar (kodda zorunlu)
- Yabancının yüzü hiçbir karede yoktur; `Stranger` bileşeni yüz çizmez. Gerçek oda görüntülerinde yabancı yer almaz, yalnızca kamera görüntülerinde görünür.
- Final: 01:54 Defne'nin repliği, 01:57 yabancının fısıltısı, 01:58.5 ani kararma, 01:58.8 "DEVAM EDECEK...", 02:00 son. Yabancının kimliği ve sesin nereden geldiği gösterilmez.
- Karakter görünümü tek yerden (`characters.ts` + rig katmanları) gelir. Sahneler karakter çizmez, yalnızca rig'i konumlar.
- Sahne süreleri `script.ts`'te sabittir. Ses uzun gelirse sahne değil ses düzeltilir.

## Sahne listesi
Ayrıntılı tablo, kare aralıkları, kamera ve efekt listesi: `production/03_SAHNE_PLANI.md`.
