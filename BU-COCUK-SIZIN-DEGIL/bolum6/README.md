# BU ÇOCUK SİZİN DEĞİL — 6. Bölüm: "Kapının Arkasında"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil önceki bölümlerle **birebir aynı** (bkz. `../bolum1/README.md`).

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Salon (gece) | **Giriş direkt:** Aslı, Kerem'in yüzüne: "Mert kim, Kerem?" Kerem inkâr ediyor, sesler yükseliyor. Aslı: **"Hangi aile, Kerem?! Bu çocuk benim değil!"** |
| S2 | Koridor (gece) | Duru ayıcığıyla kapının arkasında her şeyi duyuyor: "Ben… sizin değil miyim?" |
| S3 | Salon (gece) | Kerem: "Bu yolun sonunda Duru'yu da kaybedersin." Kerem'in iç sesi: "Gerçeği öğrenirse… her şeyi kaybederim." |
| S4 | Duru'nun odası (gece) | Aslı, Duru'yu uyuyor sanıyor. Aslı çıkınca Duru gözlerini açıyor: "Gerçek annem… kim acaba?" |
| S5 | Duru'nun odası · "ERTESİ SABAH" | Yatak boş. Yastıkta el yazısı not: **"Gerçek annemi bulmaya gittim. Beni merak etmeyin."** Masada kulak damlası kutusu, üstünde Dr. Nihal'in adresi (7. bölüme ipucu). Son: "Dokuz yaşında bir çocuk… tek başına nereye giderdi?" |
| Son | — | "Devamı 7. bölümde…" |

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses) | Hasan Yasin – Warm Turkish Narrator |
| Duru (+ notu okuyan dış ses) | Gözde (karakter seslendirme) |

Fon müziği önceki bölümlerden aynen alındı. Not el yazısı fontu: Kalam (Google Fonts).

## Değiştirmek
1. `bolum6.js` içinde replik, duygu, poz, plan; notun satırları `yazilar.not` altında.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S5` sadece o sahne).
3. `node video_disa_aktar.js`

Yeni planlar: `keremSofaYakin, asliSalonAyak, keremAyak, keremAyakYakin, ciftSalon, duruKapiYakin, duruYalniz, asliOdaKapi, asliOdaYakin, keremKapiSabah, bosYatak, bosYatakYakin, notYakin, ilacKutusu` · Yeni arka plan: `cocukOdasiGun`
