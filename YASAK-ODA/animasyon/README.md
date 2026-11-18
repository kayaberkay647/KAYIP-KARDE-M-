# YASAK ODA — 1. Bölüm Animasyonu

2.5 dakikalık 2D korku animasyonu. Tamamen tarayıcıda çalışır. Görseller kodla çizilir, ses efektleri kodla üretilir.

## İzlemek
`index.html` dosyasını Chrome'da aç, ekrana tıkla. Kısayol: **Boşluk** = oynat/duraklat.

## ElevenLabs seslerini eklemek
1. Her repliği ElevenLabs'ta seslendir (metinler: `../Bolum-01-Uc-Vurus.md`, bölüm 5).
2. Dosyaları şu isimlerle kaydet ve `ses/` klasörüne koy:

| Dosya | Karakter |
|---|---|
| `B01_R01_ANNE.mp3` | Anne |
| `B01_R02_ELIF.mp3`, `R06`, `R11`, `R14`, `R21` | Elif |
| `B01_R03_EMRE.mp3`, `R08`, `R12`, `R15`, `R16`, `R17`, `R18`, `R20` | Emre |
| `B01_R04_DEDE.mp3`, `R05`, `R07`, `R09`, `R10` | Dede |
| `B01_R13_O.mp3` | Varlık (ANNE sesiyle üret) |
| `B01_R19_O.mp3`, `B01_R22_O.mp3` | Varlık (ELİF sesiyle üret) |

3. Sayfada **🎙 Sesleri Yükle** ile hepsini seç. Dosya adında `R01`…`R22` geçmesi yeterli.

Varlık ("O") replikleri otomatik olarak yavaşlatılır, yankı ve gecikmeli ikinci ses eklenir. R22 sol kulaktan fısıldar.

## Video almak
- **Kolay yol:** Sayfada **🎬 Video Kaydet**. 2:30 boyunca gerçek zamanlı kaydeder ve `.webm` indirir.
- **En iyi kalite (MP4, 1080p):** Claude Code'da veya terminalde:
  ```
  cd YASAK-ODA/animasyon
  node video_disa_aktar.js            # 1920x1080
  node video_disa_aktar.js 1280 720   # daha hızlı
  ALTYAZI=0 node video_disa_aktar.js  # altyazısız
  ```
  `ses/` klasöründeki ElevenLabs dosyalarını otomatik ekler. Çıktı: `YasakOda_Bolum1.mp4`. Gerekenler: Node.js, Playwright, ffmpeg.

## Düzenlemek
`index.html` dosyasının en üstündeki **`AYAR`** bloğu:
- `replikler`: her diyalogun başlama saniyesi (`t`), altyazı metni, ses seviyesi (`ses`).
  ElevenLabs sesin uzun çıkarsa sonraki repliğin `t` değerini birkaç saniye ileri al.
- `efektler`: vuruşlar, gıcırtılar, rüzgâr vb. (`t` = saniye).
- `diziAdi`, `bolumYazisi`, `mekanYazisi`, `fotoYazisi`, `bitisYazisi`: ekrandaki yazılar.
- `altyazi: false` ile altyazıyı kapatabilirsin.

Sahnelerin görselleri `SAHNELER` listesindeki fonksiyonlarda çizilir. Kamera hareketleri `kamYol(...)` satırlarında `[saniye, x, y, zoom]` olarak tanımlıdır.

Belirli bir kareyi görmek için: `index.html?t=135` (135. saniye).

## Zaman çizelgesi
| Saniye | Sahne |
|---|---|
| 0–12 | Giriş: YASAK ODA, 1. BÖLÜM — ÜÇ VURUŞ |
| 12–32 | Varış: karlı köy, dede kapıda |
| 32–58 | Kural: koridor, 03:17 saati, yasak kapı, dede yakın plan |
| 58–88 | Üç Vuruş: yatak odası, annenin sesi |
| 88–110 | Anahtar: kayıp anahtar, aralık kapı |
| 110–140 | Yasak Oda: fotoğraflar, Yusuf 1979, köşedeki kız |
| 140–150 | Final: DEVAM EDECEK... |
