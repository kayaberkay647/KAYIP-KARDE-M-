# ANNEMİN YATAĞINDAKİ YABANCI

9:16 dikey (1080×1920, 30 fps) 2D animasyon dizisi. Gizem, aile sırları, psikolojik gerilim.
Görseller tarayıcı canvas'ında kodla çizilir, sesler ElevenLabs ile üretilir.

## Ortak (bütün bölümlerde aynı kalır)
| Dosya | İçerik |
|---|---|
| `ortak/karakter.js` | Karakter tasarımları ve çizim motoru (`KARAKTER` tablosu) |
| `ortak/ev.js` | Aile evi: salon, annenin yatak odası, yatak, yakın plan çekimleri (eski fotoğraf, çanta, telefon, arşiv) |
| `ortak/sesler.json` | Ses profilleri (ElevenLabs ses kimliği + ayarlar) |
| `ortak/font/` | Nunito, Oswald, Caveat |

## Karakterler
| Karakter | Görünüş | Ses (ElevenLabs, eleven_v3) |
|---|---|---|
| **Mert** (28) | Kısa koyu kahve, yana taranmış saç; hafif sakal; büyük kahverengi gözler; lacivert kazak, siyah pantolon | Yunus (`AYY MERT`) |
| **Sevda** (34) | Omuz altına inen dalgalı altın sarısı saç; zümrüt yeşili gözler; koyu yeşil hırka, krem bluz, siyah pantolon | Elif (`AYY SEVDA`) |
| **Necla Hanım** (52) | Açık kahve, arkadan topuz saç; hafif toplu; bordo hırka, koyu etek | Ahu (`AYY NECLA`) |
| **Komiser Sinan** (41) | Kısa siyah saç, kırçıllı sakal ve şakaklar; koyu gri ceket, siyah gömlek | Ozan Karaca (`AYY SINAN`) |
| Annenin genç hâli / küçük kız | Yalnızca 1997 tarihli eski fotoğrafta | — |

## Yeni bölüm eklemek
`bolum-01` klasörünü örnek alın: `replikler.json` (metin + `v3` duygu etiketli metin), `araclar/zamanla.py` içindeki `PLAN`, `js/sahneler.js` içindeki çekim listesi.
