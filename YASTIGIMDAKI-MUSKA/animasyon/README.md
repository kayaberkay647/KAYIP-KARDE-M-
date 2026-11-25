# YASTIĞIMDAKİ MUSKA — 1. Bölüm: "Çeyizden Gelen Hediye"

Dikey (9:16, 1080×1920, 30 fps) 2:35'lik 2D korku animasyonu. Çizim tarzı referans videodaki gibi: düz renkli vektör karakterler, kahverengi kontur, pembe allık, ortalanmış serif altyazı, iç ses italik, şarkılar ♪ ile.
Görüntülerin tamamı kodla çiziliyor. Sesler, efektler ve fon müziği ElevenLabs ile üretildi.

## İzlemek
`index.html` dosyasını Chrome'da aç, ekrana dokun ya da **Boşluk** tuşuna bas. Ses `ses/karisim.m4a` dosyasından otomatik çalar.
Belirli bir saniyeye gitmek için adrese saniyeyi ekle: `index.html?t=70`.

## Video almak
```
cd YASTIGIMDAKI-MUSKA/animasyon
node video_disa_aktar.js              # → YastigimdakiMuska_Bolum1.mp4 (1080x1920)
ALTYAZI=0 node video_disa_aktar.js    # altyazısız
```

## Dosyalar
| Dosya | Ne işe yarar |
|---|---|
| `replikler.json` | Bütün replikler, ElevenLabs duygu etiketleri, karakter sesleri ve ayarları |
| `efektler.json` | Ses efekti ve fon müziği tarifleri (ElevenLabs Sound Effects) |
| `araclar/ses_uret.py` | Replikleri seslendirir (`--kontrol` yazıya döküp metinle karşılaştırır) |
| `araclar/efekt_uret.py` | Efektleri üretir |
| `araclar/zaman_cizelgesi.py` | Çekim listesini gerçek ses süreleriyle zamanlar, sesi karıştırır → `zaman.js`, `ses/karisim.wav` |
| `motor.js` | Karakter iskeleti (göz kırpma, ağız senkronu, nefes, kollar), karakterler ve aksesuarlar |
| `sahneler.js` | Mekânlar ve 38 çekimin her biri (kamera, renk, oyunculuk) |
| `araclar/onizle.js` | Her çekimden önizleme karesi alır |

## Sesler (ElevenLabs, model: Eleven v4)
| Karakter | Ses | Not |
|---|---|---|
| Hatice (kayınvalide) | AYY NECLA | Entrikacı, tatlı ama soğuk |
| Nazlı (gelin, anlatıcı) | Zeynep Signature Voice Warm | İç ses aynı sesle, fısıltı etiketiyle |
| Emre (koca) | AYY MERT | |
| Gülizar Ana (büyücü) | MUSKA - Gulizar Ana | Bu dizi için Voice Design ile tasarlandı, hesaba kaydedildi |

Bir repliği değiştirmek için `replikler.json`'u düzenle, sonra:
```
python3 araclar/ses_uret.py H05          # sadece H05'i yeniden üret
python3 araclar/ses_uret.py --kontrol    # telaffuz kontrolü
python3 araclar/zaman_cizelgesi.py       # zamanlamayı ve miksajı yenile
node video_disa_aktar.js
```
Yastığın fısıltısı, rüyadaki bozuk ninni ve finaldeki "Nazlı…" sesine boğukluk ve yankı `zaman_cizelgesi.py` içinde otomatik uygulanır.

## Dizinin sabitleri (sonraki bölümlerde aynı kalacak)
- **Hatice'nin bilezik şıngırtısı** her girişinden önce duyulur. Korku anlarında Hatice **göz kırpmaz** ve göz bebekleri küçülür.
- **Nazlı'nın şarkısı** ♪ "Sabahın ilk ışığı sen, kalbimin evi sen" ♪ rüyalarda Gülizar'ın ağzından yavaş ve bozuk duyulur.
- **Renkler** sıcak bejden griye kayar. Her bölüm biraz daha soğuk başlar.
- **Kırmızı iplik** büyünün işaretidir: yumak, dikiş, örgü.
