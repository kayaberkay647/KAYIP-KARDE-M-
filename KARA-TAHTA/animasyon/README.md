# KARA TAHTA — 1. Bölüm Animasyonu

2 dakikalık 2D korku animasyonu. Tamamen tarayıcıda çalışır: görseller kodla çizilir, ses efektleri kodla üretilir, diyaloglar `ses/` klasöründeki ElevenLabs kayıtlarıdır.

## İzlemek
- **Hazır video:** `node video_disa_aktar.js` ile `KaraTahta_Bolum1.mp4` üretilir (aşağıda).
- **Tarayıcıda:** `index.html` dosyasını Chrome'da aç, **🎙 Sesleri Yükle** ile `ses/` klasöründeki 17 dosyayı seç, ekrana tıkla. Kısayol: **Boşluk** = oynat/duraklat.
  Klasörü yerel bir sunucuyla açarsan (`npx serve .` gibi) sesler otomatik yüklenir.

## Sesler
| Karakter | ElevenLabs sesi | İşlem |
|---|---|---|
| Zeynep | Jessica (hazır ses) | Perde ×1.19 (çocuk sesi) |
| Mert | Liam (hazır ses) | Perde ×1.41 (çocuk sesi) |
| Serkan | Will (hazır ses) | Perde ×1.41, tarayıcıda yankı + duvar arkası filtresi + sol kulak |
| Hasan Amca | Daniel (hazır ses) | — |
| Nuray Öğretmen | Matilda (hazır ses) | — |

Model: `eleven_v3`, dil: Türkçe. Ücretsiz plan API'de yalnızca hazır seslere izin verdiği için çocuk sesleri yetişkin seslerinden inceltildi.
Ücretsiz planda ElevenLabs'ın belirtilmesi gerekiyor; videonun sonunda "Seslendirme: ElevenLabs" yazısı bu yüzden var.

**Sesleri yeniden üretmek:** `ELEVENLABS_API_KEY=... python3 seslendir.py R04 R11` (sadece verilen replikler). Ücretli plana geçersen `seslendir.py` içindeki çocuk ses kimliklerini Voice Design ile oluşturduğun seslerle değiştir ve perde değerini `1.0` yap.

## Video almak
```
cd KARA-TAHTA/animasyon
node video_disa_aktar.js            # 1920x1080 (~4 dakika sürer)
node video_disa_aktar.js 1280 720   # daha hızlı
ALTYAZI=0 node video_disa_aktar.js  # altyazısız
```
Çıktı: `KaraTahta_Bolum1.mp4`. Gerekenler: Node.js, Playwright, ffmpeg.

## Düzenlemek
`index.html` dosyasının en üstündeki **`AYAR`** bloğu:
- `replikler`: her diyalogun başlama saniyesi (`t`), altyazı metni, ses seviyesi (`ses`).
- `efektler`: yağmur, tebeşir, zil, silme, sandalye vb. (`t` = saniye, `ses` = seviye).
- `diziAdi`, `bolumYazisi`, `mekanYazisi`, `sayi`, `sonrakiSayi`, `bitisYazisi`, `jenerik`: ekrandaki yazılar.
- `altyazi: false` ile altyazıyı kapatabilirsin.

Sınıf ve koridor küçük bir 3B çizim motoruyla çizilir (`sinif()`, `koridor()`); kamera her planda `kamAyar({x, y, z, yaw, pitch, f})` ile ayarlanır. Belirli bir kareyi görmek için: `index.html?t=62` (62. saniye).

## Zaman çizelgesi
| Saniye | Sahne |
|---|---|
| 0–10 | Giriş: tebeşirle yazılan KARA TAHTA, 1. BÖLÜM — KİMSE YAZMADI |
| 10–34 | Sabah: yağmurda okul, koridor, karanlık sınıf, tahtada 15 ve küçük el izi |
| 34–56 | Kim yazdı?: öğretmen, Mert siler, Zeynep pencerede, kapı camında Hasan Amca |
| 56–86.5 | Teneffüs: 15 kendiliğinden geri yazılır, Hasan Amca kapıda, "Otuz yedi yıl sonra…" |
| 86.5–107 | Çıkış: akşam, okul kapısı, 7-B penceresinde siluet |
| 107–120 | Final: sandalye kendi kendine çekilir, "Orası benim sıram… Zeynep.", DEVAM EDECEK, 14 |
