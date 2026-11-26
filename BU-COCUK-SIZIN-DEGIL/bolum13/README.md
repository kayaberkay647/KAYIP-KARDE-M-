# BU ÇOCUK SİZİN DEĞİL — 13. Bölüm: "Dava"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler + avukat).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil önceki bölümlerle **birebir aynı** (bkz. `../bolum1/README.md`).

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Avukatın bürosu (uzlaşma görüşmesi) | **Giriş direkt:** Kerem'in avukatı kameraya (Aslı'ya): "Hanımefendi, siz hukuken… Duru'nun annesi bile değilsiniz." Nur'un borçları masaya konuyor. Avukat suçu Gül'e atıyor: "Bileklikleri değiştiren… hemşire Gül Yılmaz'dır." Kerem ameliyat masraflarını velayet karşılığında teklif ediyor. |
| S2 | Büro koridoru | Nur: "Beni mi izletmiş?" Aslı: "Bu sefer biz de izleyeceğiz." |
| S3 | Tanık listesi | Final: **"Dr. Nihal Aras — Kerem'in tanığı."** Aslı doktoru arıyor, telefonu kapalı. "Bize gerçeği anlatan doktor… neden Kerem'in tarafındaydı?" |
| Son | — | "Devamı 14. bölümde…" |

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses) | Hasan Yasin – Warm Turkish Narrator |
| Nur | COC ZEHRA |
| Avukat (yeni) | AYY SINAN |

## Değiştirmek
1. `bolum13.js` içinde replik, duygu, poz, plan; tanık listesi `yazilar.tanik` altında.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten).
3. `node video_disa_aktar.js`

Yeni planlar: `avukatYakin, asliBuroYakin, nurBuroYakin, keremBuro, keremBuroYakin, buroGenis, ikiAnneKoridor, asliTelefonDis, tanikListesi, tanikListesiYakin` · Yeni arka plan: `buro` · Yeni karakter: `AVUKAT`
