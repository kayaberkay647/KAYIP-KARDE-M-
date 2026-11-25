# BU ÇOCUK SİZİN DEĞİL — 10. Bölüm: "Seçim" (dizinin orta noktası)

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil önceki bölümlerle **birebir aynı** (bkz. `../bolum1/README.md`).
Geçmiş sahneleri siyah-beyaz.

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Salon (gece) | **Giriş direkt itiraf:** Kerem kameraya bakarak: "Evet. İkisi de benim kızım." Aslı: "Anlat. Her şeyi. Baştan." |
| S2 | "10 YIL ÖNCE" (siyah-beyaz) | Sahil kasabasında Nur'la tanışma; Kerem kendini "Mert" diye tanıtmış. Aynı gece aynı hastanede iki doğum. Kalp raporu: bebek Yılmaz'da ciddi delik. Kerem camın arkasından iki beşiğe bakıyor: "Biri hasta… biri sağlıklı." |
| S3 | Salon (gece) | Aslı: "Ve sen… sağlıklı olanı seçtin?" Kerem: "Seni korumak istedim!" Masrafları uzaktan ödemiş. "Duru benim her şeyim. Ona dokunma, Aslı." |
| S4 | Salon (gece) | Kerem'in iç sesi: "Tek başıma batmayacağım." Final: **"İki kızımı da yanımda tutamazdım. Birini seçtim… Ve Nur bunu biliyordu."** "Ona sor." Aslı: "Korku değil… intikam." |
| S5 | Park anısı (siyah-beyaz) | Nur'un 5. bölümdeki sözleri yankılanıyor. "Yoksa Kerem… yine mi yalan söylüyordu?" |
| Son | — | "Devamı 11. bölümde…" |

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses / anlatım) | Hasan Yasin – Warm Turkish Narrator |
| Nur | COC ZEHRA |

Fon müziği önceki bölümlerden aynen alındı.

## Değiştirmek
1. `bolum10.js` içinde replik, duygu, poz, plan; rapor yazıları `yazilar.rapor` altında.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S2` sadece o sahne).
3. `node video_disa_aktar.js`

Yeni planlar: `keremItiraf, keremItirafYakin, sahilGecmis, sahilNurYakin, keremHastane, raporInsert, camBesik` · Yeni arka plan: `sahil`
