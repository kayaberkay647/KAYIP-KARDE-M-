# BU ÇOCUK SİZİN DEĞİL — 8. Bölüm: "Stajyer"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil önceki bölümlerle **birebir aynı** (bkz. `../bolum1/README.md`).
9 yıl önceki sahneler 1. bölümdeki gibi siyah-beyaz.

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Muayenehane | **Giriş direkt itiraf:** Ağlayan Dr. Nihal: "Bileklikleri değiştirdiğini gördüm. Ve sustum. Çünkü bana para verdiler." O gece doğumhanede nöbetçi stajyermiş. |
| S2 | Hastane · "9 YIL ÖNCE" (siyah-beyaz) | Yenidoğan odası, iki beşik (YILMAZ / AKSOY). Maskeli hemşire bileklikleri değiştiriyor. Stajyer Nihal kapı aralığından görüyor; hemşire dönüp "sus" işareti yapıyor. Ertesi sabah dolapta para dolu zarf ve not: "SUSARSAN KİMSEYE BİR ŞEY OLMAZ." |
| S3 | Muayenehane | Aslı: "Kızımı başka bir kadın büyüttü… ve siz sustunuz!" Nihal: Duru'nun dosyasında 14 Mart'ı görünce testi bilerek istemiş. |
| S4 | Apartman merdiveni | Kerem aşağıda bekliyor: "Doktor konuşursa… her şey biter." Birini arıyor: "Aslı seni ararsa… sakın açma." |
| S5 | Muayenehane | Hemşirenin yakasındaki isim kartı: **"Gül. Gül Yılmaz."** Eski aile fotoğrafı: Gül, Kerem'in kız kardeşi. Son: "Bu aileden kimseye güvenebilir miydim?" |
| Son | — | "Devamı 9. bölümde…" |

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses) | Hasan Yasin – Warm Turkish Narrator |
| Dr. Nihal (+ anlatım) | Mine – Natural, Steady and Calm |
| Gül (9. bölümde konuşacak) | COC DERYA |

Fon müziği önceki bölümlerden aynen alındı.

## Yeni karakter
- **Gül:** Kerem'in kız kardeşi; Kerem'in saç ve göz rengi, küt saç. 9 yıl önce hemşire forması ve cerrahi maske (`ozel: { maske: true }`).

## Değiştirmek
1. `bolum8.js` içinde replik, duygu, poz, plan; bileklik/not/kart yazıları `yazilar` altında.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S2` sadece o sahne).
3. `node video_disa_aktar.js`

Yeni planlar: `nihalItiraf, hastaneKoridor, bebekOdasi, bileklikInsert, stajyerKapi, hemsireBakis, zarfDolap, notTehdit, keremMerdiven, keremMerdivenYakin, isimKarti, aileFoto` · Yeni arka planlar: `hastaneKoridor`, `apartmanGun`
