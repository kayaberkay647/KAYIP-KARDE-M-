# CESET OLMAYAN CİNAYET — 1. Bölüm: KANLI EV

9:16 dikey, 1080×1920, 30 fps, **120 saniye** 2D animasyon. Polisiye / gizem.
Görseller kodla çizilir (tarayıcı canvas), sesler ElevenLabs ile üretildi.

## İzlemek
- Video: `node video_disa_aktar.js` → `CesetOlmayanCinayet_Bolum1.mp4` (MP4 dosyaları git'e eklenmez)
- Tarayıcıda: `index.html` dosyasını aç, **Boşluk** = oynat/durdur. Belirli bir kare: `index.html?t=75`

## Karakterler ve sesler (ElevenLabs, eleven_multilingual_v2)
| Karakter | Ses (hesaptaki adı) | Tasarım |
|---|---|---|
| Aylin | Gözde Arıkan (`COC AYLIN`) | Omuz hizası koyu kahve saç, krem kazak, koyu mavi pantolon |
| Emir | Can Seçkin (`COC EMIR`) | Kısa siyah saç, hafif sakal, lacivert gömlek (yalnızca geçmiş sahnesi) |
| Komiser Murat | Kadir Kayışcı (`COC MURAT`) | Kırçıllı kısa saç, hafif sakal, koyu gri ceket |
| Zehra Teyze | Sultan (`COC ZEHRA`) | Açık bej başörtüsü, kahverengi hırka |
| Telefondaki görevli | Eda Atlas (`COC GOREVLI`) | Yalnızca ses (telefon filtresi) |
| Polis memuru | Mehmet Derindağ (`COC MEMUR`) | Lacivert üniforma, şapka |

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
| 2 Kaybolan nişanlı | 0:12 | 0:14 |
| 3 Komşunun şüphesi | 0:23.6 | 0:29 |
| 4 Komiserin gelişi | 0:39.9 | 0:44 |
| 5 Son telefon (geçmiş) | 0:58.6 | 1:00 |
| 6 Gizemli anahtar | 1:11.1 | 1:16 |
| 7 Kırık saat | 1:26.2 | 1:31 |
| 8 Şaşırtıcı final | 1:43.3 | 1:47 |
| Bitiş kartı | 1:58.1 | — |

Toplam süre 120 saniyedir. Sahne başlangıçları senaryodakinden 1–5 saniye önce geliyor, çünkü 1–2. sahnelerde konuşma payı kısa, 3–4. sahnelerde uzundu. Diyaloglar yapay hızlandırılmadı. Uzun iç duraklamalar kısaltıldı ve ElevenLabs konuşma hızı en fazla %8 artırıldı.
