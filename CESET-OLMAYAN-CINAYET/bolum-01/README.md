# CESET OLMAYAN CİNAYET — 1. Bölüm: KANLI EV

9:16 dikey, 1080×1920, 30 fps, **2 dk 14 sn** 2D animasyon. Polisiye / gizem.
Görseller kodla çizilir (tarayıcı canvas), sesler ElevenLabs ile üretildi.

## İzlemek
- Video: `node video_disa_aktar.js` → `CesetOlmayanCinayet_Bolum1.mp4` (MP4 dosyaları git'e eklenmez)
- Tarayıcıda: `index.html` dosyasını aç, **Boşluk** = oynat/durdur. Belirli bir kare: `index.html?t=75`

## Karakterler ve sesler (ElevenLabs **eleven_v3**, duygu etiketli)
| Karakter | Ses (hesaptaki adı) | Tasarım |
|---|---|---|
| Aylin | Gözde Arıkan (`COC AYLIN`) | Omuz hizası koyu kahve saç, krem kazak, koyu mavi pantolon |
| Emir | Can Seçkin (`COC EMIR`) | Kısa siyah saç, hafif sakal, lacivert gömlek (yalnızca geçmiş sahnesi) |
| Komiser Murat | Kadir Kayışcı (`COC MURAT`) | Kırçıllı kısa saç, hafif sakal, koyu gri ceket |
| Zehra Teyze | Sultan (`COC ZEHRA`) | Açık bej başörtüsü, kahverengi hırka |
| Telefondaki görevli | Eda Atlas (`COC GOREVLI`) | Yalnızca ses (telefon filtresi) |
| Polis memuru | Mehmet Derindağ (`COC MEMUR`) | Lacivert üniforma, şapka |

Her replik `replikler.json` içindeki `v3` alanında duygu etiketleriyle (`[crying]`, `[panicked]`, `[whispers]`…) seslendirilir; altyazı `m` alanındaki temiz metinden gelir.
Bütün replikler aynı konuşma seviyesine (-17 dBFS RMS) eşitlenir; diyaloglara hafif oda akustiği eklenir, müzik konuşma sırasında otomatik kısılır.
Seslendirme sonrası kontrol: `python3 araclar/kontrol.py` (Scribe ile yazıya döküp senaryo metniyle karşılaştırır).

Karakter tasarımları `js/karakter.js` içindeki `KARAKTER` tablosunda sabittir; bütün sahneler aynı çizim fonksiyonunu kullanır.

## Klasörler
| Yol | İçerik |
|---|---|
| `replikler.json` | 35 replik (metin, karakter, sahne, hız ayarı) |
| `ses/` | ElevenLabs çıktıları (mp3 + harf zamanlaması) |
| `efekt/` | ElevenLabs ses efektleri (yağmur, adım, kapı, siren, telsiz, vuruş…) |
| `muzik.mp3` | ElevenLabs Music ile üretilmiş gizem/gerilim fon müziği |
| `zaman.js` | Otomatik üretilen zaman çizelgesi + ağız hareketi verisi |
| `js/` | `karakter.js` (karakterler), `mekan.js` (daire + yakın planlar), `sahneler.js` (çekim listesi, kamera, altyazı) |
| `araclar/` | `ses_uret.py`, `efekt_uret.py`, `zamanla.py` |

## Yeniden üretmek / düzenlemek
```
python3 araclar/ses_uret.py R07          # bir repliği yeniden seslendir (metni replikler.json'da değiştir)
python3 araclar/zamanla.py --mix         # zaman çizelgesi + ses miksi
node video_disa_aktar.js                 # MP4
node video_disa_aktar.js 40 60           # sadece 40–60. saniyeler (hızlı deneme)
ALTYAZI=0 node video_disa_aktar.js       # altyazısız
```
Zamanlama `araclar/zamanla.py` içindeki `PLAN` listesindedir (replik araları, bekleme süreleri, efekt anları).
Çekimler `js/sahneler.js` içindeki `cek(başlangıç, …)` satırlarıdır; her çekim bir sonrakine kadar sürer.

## Zaman çizelgesi (gerçekleşen)
| Sahne | Başlangıç | Senaryodaki |
|---|---|---|
| 1 Şok açılış (+ başlık) | 0:00 | 0:00 |
| 2 Kaybolan nişanlı | 0:13.6 | 0:14 |
| 3 Komşunun şüphesi | 0:27.7 | 0:29 |
| 4 Komiserin gelişi | 0:46.3 | 0:44 |
| 5 Son telefon (geçmiş) | 1:05.9 | 1:00 |
| 6 Gizemli anahtar | 1:19.6 | 1:16 |
| 7 Kırık saat | 1:36.8 | 1:31 |
| 8 Şaşırtıcı final | 1:57.0 | 1:47 |

Toplam süre 133,8 saniye. Duygulu v3 oyunculuğu (hıçkırık, nefes, vurgulu duraklamalar) 120 saniyeye sığmadı; duygu korunarak
yalnızca uzun duraklamalar kısaltıldı (hıçkırık içerenler en fazla 1 sn) ve konuşma perdesi değişmeden %6 hızlandırıldı (`zamanla.py` → `TEMPO`).
