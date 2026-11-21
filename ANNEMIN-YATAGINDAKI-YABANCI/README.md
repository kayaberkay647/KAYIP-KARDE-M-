# ANNEMİN YATAĞINDAKİ YABANCI

9:16 dikey (1080×1920, 30 fps) 2D animasyon dizisi. Gizem, aile sırları, psikolojik gerilim.
Görseller tarayıcı canvas'ında kodla çizilir, sesler ElevenLabs ile üretilir.

## Ortak (bütün bölümlerde aynı kalır)
| Dosya | İçerik |
|---|---|
| `ortak/karakter.js` | Karakter tasarımları ve çizim motoru (`KARAKTER` tablosu) |
| `ortak/ev.js` | Aile evi: salon (tül perdeli pencere), koridor, annenin yatak odası (berjer, komodin), 1999 geçmişi (evin önü), yakın planlar (fotoğraflar, çanta, telefon, arşiv, çekmece, dikiş kutusu, mektup) |
| `ortak/sesler.json` | Ses profilleri (ElevenLabs ses kimliği + ayarlar) |
| `ortak/font/` | Nunito, Oswald, Caveat |

## Karakterler
| Karakter | Görünüş | Ses (ElevenLabs, eleven_v3) |
|---|---|---|
| **Mert** (28) | Kısa koyu kahve, yana taranmış saç; hafif sakal; büyük kahverengi gözler; lacivert kazak, siyah pantolon | Yunus (`AYY MERT`) |
| **Sevda** (34) | Omuz altına inen dalgalı altın sarısı saç; zümrüt yeşili gözler; koyu yeşil hırka, krem bluz, siyah pantolon | Elif (`AYY SEVDA`) |
| **Necla Hanım** (52) | Açık kahve, arkadan topuz saç; hafif toplu; bordo hırka, koyu etek | Ahu (`AYY NECLA`) |
| **Komiser Sinan** (41) | Kısa siyah saç, kırçıllı sakal ve şakaklar; koyu gri ceket, siyah gömlek | Ozan Karaca (`AYY SINAN`) |
| Annenin genç hâli / küçük kız (Sevda, 7) | Eski fotoğraflarda ve 1999 geçmiş sahnesinde | — |
| Genç adam (`BABA_GENC`) | 1999 fotoğrafında ve geçmiş sahnesinde; yüzü gölgede/sırtı dönük | — |

## Yeni bölüm eklemek
`bolum-01` klasörünü örnek alın: `replikler.json` (metin + `v3` duygu etiketli metin), `araclar/zamanla.py` içindeki `PLAN`, `js/sahneler.js` içindeki çekim listesi.

## Zaman çizgisi (bölümler arası tutarlılık)
- Sevda 1999 Ekim'inde, 7 yaşında kayboldu (bugün 34). Arşiv dosyası: 1999/0418.
- "Bahar, 1997" fotoğrafı: anne ve 5 yaşındaki Sevda.
- "Ekim 1999" fotoğrafı: anne, Sevda ve yüzü gölgede genç adam; arkasındaki isim henüz gösterilmedi.
- 2. bölüm sonunda Sevda adamın Mert'in babası olduğunu iddia ediyor — kanıtlanmadı.
