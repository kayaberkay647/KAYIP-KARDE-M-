# 1dkdua | Hikmetli Kareler — Stil Rehberi

Bu rehber bütün 1dkdua videolarının standardıdır. Yeni bir video bu kurallarla, aynı motorla (`motor/`) üretilir.
İlk uygulama: `videolar/01-imtihan-sahasi`.

## 1. Teknik standart

| | |
|---|---|
| Format | 9:16 dikey, **1080×1920**, **30 FPS** sabit |
| Görüntü | H.264 High, CRF 14, `preset slow`, `tune animation`, yuv420p, BT.709 |
| Ses | AAC 256 kb/s, 44,1 kHz stereo |
| Süre | Konuşmanın gerçek süresi + 6–7 sn kapanış |
| Kararlılık | Her kare yalnızca `t` saniyesine bağlı (deterministik). Rastgelelik tohumlu, doku sabit: titreme yok |

## 2. Renk paleti (`motor/motor.js → P`)

| Ad | Hex | Kullanım |
|---|---|---|
| krem | `#F3EAD3` | zemin, kâğıt |
| kâğıt | `#F4ECD9` | altyazı panosu |
| mürekkep | `#3A2E24` | metin |
| zeytin | `#6E7B3A` | ana yeşil, Adam'ın kaftanı |
| zeytin koyu | `#4E5A28` | gölgeler |
| zeytin açık | `#A3AC72` | ışıklı yüzeyler |
| toprak | `#A0673F` | ahşap, toprak, üst başlık |
| kiremit | `#B9653F` | çatılar |
| altın | `#D4A84B` | süsler, çerçeve, kapanış |
| altın açık | `#EBCB7E` | parıltı |
| gece | `#0E1B33 → #2C4A73` | kapanış göğü |
| ay | `#F6ECCD` | ay ışığı |

Gündüz sahneleri sıcak pastel (şeftali-krem gökyüzü), alacakaranlık mor-gül, gece lacivert. Doygun saf renk yok.

## 3. Doku ve ışık

- Bütün karenin üstünde **sabit kâğıt dokusu** (lif + ince gren, `overlay` %55) ve sıcak kenar kararması (vinyet).
- Işık kaynağına göre `screen` haleler, ışık huzmeleri, havada toz zerreleri.
- Uzak katmanlar gökyüzü rengine karışır (hava perspektifi).

## 4. Tipografi (yerel fontlar: `motor/fontlar/`, OFL lisanslı)

| Yer | Font | Boyut |
|---|---|---|
| Üst başlık (seri adı) | Cinzel 600, harf aralığı 9–16 px | 30 px, toprak rengi |
| Hikâye başlığı | Cormorant Garamond 700 | 104 px, mürekkep, krem parıltı |
| Altyazı | EB Garamond 500 | 44 px, satır 58 px |
| Kapanış küçük satır | Cormorant Garamond İtalik 500 | 50 px, krem |
| Kapanış büyük satır | Cormorant Garamond 700, altın degrade + parıltı | 78 px |
| İmza | Cormorant Garamond İtalik 600 | 44 px, `@1dkdua` |

## 5. Giriş (ilk 2 saniye)

- Üstte küçük **HİKMETLİ KARELER**, altında hikâye başlığı; 0,25 sn'de başlar, 1,4 sn'de tamamen nettir.
- Başlık hafif bulanıktan netleşir, yukarı süzülür; altında ortadan iki yana açılan altın çizgi + elmas süsü.
- 4,6 sn civarında yumuşakça kaybolur. Kamera bu sırada yavaşça geri çekilir/yükselir.
- Video 0,45 sn'lik siyahtan açılışla başlar.

## 6. Altyazı panosu

- Alt-orta (merkez y = 1520 px), krem **yırtık kenarlı kâğıt**, yumuşak gölge, kâğıt dokusu.
- İçte ince altın çerçeve, üst ortada küçük altın elmas (imza öğesi).
- En fazla 2 satır, 780 px genişlik; tek kelime alt satıra düşmez.
- **Kelime kelime senkron:** söylenmemiş kelimeler %26 opaklıkta; kelime söylendiği an koyulaşır, ilk 0,9 sn hafif zeytin tonunda kalır.
- Arka arkaya gelen satırlarda pano kaybolmaz, genişliği yumuşakça yeni satıra uyar.
- Metin TDK yazımına uygun; dinî terimler yerleşik transkripsiyonla (Rabbü'l-âlemîn, Kur'ân-ı Azîmüşşân).

## 7. Sahne temposu ve kamera

- Sahneler genellikle **4–7 sn**; sahne sınırı her zaman cümle arasındaki durağa denk gelir.
- Geçiş: **0,6 sn çapraz geçiş**. Aynı mekânda anlam değişince kamera kaydırması (hızlı kaydırmada 12 alt kareli hareket bulanıklığı).
- Kamera hiçbir an tamamen durmaz: yavaş yakınlaşma, geri çekilme, yatay kaydırma.
- Parallax katman derinlikleri: gökyüzü 0,02–0,08 · uzak dağ 0,1–0,2 · orta plan 0,3–0,6 · ana plan 1 · ön plan 1,15–1,35.
- Aksiyon altyazı panosunun üstünde kalır (ana karakter genelde ekranın 35–65 % yüksekliğinde).

## 8. Animasyon kuralları

- Karakterler nefes alır, 3–5 sn'de bir göz kırpar; yürüme fazı yürünen mesafeden hesaplanır (ayak kaymaz).
- Jestler 0,6–0,9 sn'lik yumuşak geçişlerle; konuşan karakterin ağzı ses zarfıyla (50 Hz) senkron.
- Çevre sürekli canlı: ağaç kümeleri ve çimen rüzgârda, bulutlar kayar, duman/su/ateş böceği/kuş hareket eder.
- Söylenmeyen olay eklenmez; her görüntü o anda söylenen cümlenin anlamını canlandırır.

## 9. Karakter tutarlılığı (`motor/karakter.js`)

- **ADAM:** krem sarık + zeytin külah, kısa koyu kahve sakal, zeytin kaftan, krem entari, hardal kuşak, kahve yemeni.
- **HOCA:** beyaz büyük sarık, siyah gür sakal, koyu cübbe, koyu kuşak, beyaz entari.
- **TALEBE1/2:** toprak ve yeşil-gri tonlarda, arkadan.
- Paletler sahnede değiştirilmez; yalnızca gece ışığı için ton kaydırılır. Oranlar: baş yüksekliği = 1 birim, ayakta boy ≈ 7,4 birim.

## 10. Kapanış

- Konuşmanın **gerçekten söylenmiş** en etkileyici cümlesi, güzel bir **gece manzarası** üzerinde.
- Küçük italik krem satır + büyük altın satır düzeni, satırlar 0,5 sn arayla yukarı süzülerek belirir.
- Altında altın süs çizgisi ve küçük **@1dkdua**. Son 0,85 sn'de siyaha iner, ses de söner.

## 11. Ses

- Konuşma: **yalnızca kaynak konuşma**, hız/perde/seviye değişmez, kesilmez. Fondaki müzik/ilahi DeepFilterNet3 ile ayrılır,
  kelime aralarındaki kalıntı 60 ms geçişli kapıyla −14 dB bastırılır. Kontrol: `miks − ortam − konuşma ≈ 0`.
- Ortam: sahneye özgü (rüzgâr, kuş, çan, karga, çeşme, cırcır, adım), konuşmanın **20–24 dB altında**; konuşma anında ~6 dB daha kısılır.
- Atmosfer pedi: sahneye göre değişen yumuşak akor, −40 dB; kapanışta −35 dB.

## 12. Süreç (yeni video)

```bash
# 1. Konuşmayı çıkar, ayır, dök
ffmpeg -i kaynak.mp4 -vn -c:a pcm_s16le orig.wav
python3 -I araclar/konusma_temizle_dfn.py <DeepFilterNet3 klasörü> orig.wav dfn.wav 24
python3 -I araclar/dokum_whisper.py <16kHz mono wav> large-v3 whisper.json
python3 -I araclar/ara_kapisi.py dfn.wav whisper.json videolar/<ad>/ses/konusma_temiz.wav -14
# 2. Altyazı satırlarını düzelt (veri/altyazi_satirlari.txt), zaman çizelgesini üret
python3 -I araclar/zaman_cizelgesi.py whisper.json videolar/<ad>/ses/konusma_temiz.wav videolar/<ad>/veri/altyazi_satirlari.txt videolar/<ad>/veri/zaman_cizelgesi.json
# → veri/zaman_cizelgesi.json ve tarayıcı için veri/zaman_cizelgesi.js (ses zarfı dahil)
# 3. SENARYO.md → sahneler.js, index.html'de önizle, kontrol kareleri al
node araclar/kare.js videolar/<ad> /tmp/kareler 1 5 10
# 4. Üret
araclar/uret.sh videolar/<ad>
```
