# BU ÇOCUK SİZİN DEĞİL — 12. Bölüm: "İki Kız, Bir Koridor"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil önceki bölümlerle **birebir aynı** (bkz. `../bolum1/README.md`).

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Hastane odası | **Giriş direkt:** Ela yatağından kameraya (Aslı'ya): "Sen benim annem misin… yoksa annemin arkadaşı mı?" Aslı ilk kez kızının elini tutuyor. |
| S2 | Hastane koridoru | Duru her şeyi camdan izlemiş: "Artık beni sevmeyecek misin?" Aslı: "Gerçek anne… dokuz yıl her gece kalkıp sana su getiren annedir." |
| S3 | Hastane odası | Duru ile Ela tanışıyor: "Biz ikiz gibiyiz!" "Aynı gün doğmuşuz zaten!" Aslı ikisine birden sarılıyor. |
| S4 | Koridor · dava ekleri | Danışmada bırakılmış zarf: **Velayet davası.** Kerem iki kızın da velayetini istiyor: "Annelerin ikisi de çocuklara bakmaya uygun değildir." |
| S5 | Ev (Kerem, gece) | "İkisini de alacağım." Avukatına: "Mahkemeye doktoru da çağırın. Konuşacak." |
| S6 | Koridor | "Neden şimdi ikisini birden istiyordu?" |
| Son | — | "Devamı 13. bölümde…" |

## Değiştirmek
1. `bolum12.js` içinde replik, duygu, poz, plan; dava yazıları `yazilar.dava` altında.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten).
3. `node video_disa_aktar.js`

Yeni planlar: `elaYatakYakin, asliYatakBasi, elaAsliIkili, nurOdaKapi, koridorDuru, duruKoridorYakin, ikiKizOda, ucluSarilma, davaZarf, davaZarfYakin` · Yeni poz: `ikiSarilma`
