# BU ÇOCUK SİZİN DEĞİL — 5. Bölüm: "Mert"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil önceki bölümlerle **birebir aynı** (bkz. `../bolum1/README.md`).

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Park | **Giriş direkt:** Nur kameraya (Aslı'ya) bağırıyor: "Kimsiniz siz? Kızımın etrafında neden dolaşıyorsunuz?!" Aslı: "Ela 14 Mart gecesi, Şehir Hastanesi'nde doğdu… değil mi?!" |
| S2 | Park, bank | İki anne yan yana; Ela arkada salıncakta. Aslı her şeyi anlatıyor. Nur: Ela'nın kalbinde delik var, 9 yıldır biri bütün masrafları ödüyor, açıklamada "Ela için". |
| S3 | Ev (Kerem) | Banka ekranı: "Alıcı: Nur Aksoy · Açıklama: Ela için · Düzenli ödeme". Kerem'in iç sesi: "Dokuz yıldır… bir ay bile aksatmadım." |
| S4 | Park, bank | Nur: Ela'nın babası **Mert**. Telefonundaki tek fotoğraf: "Parayı gönderen bu. Adı Mert. Ela'nın babası." Fotoğraftaki adam **Kerem**. Son: "Peki Nur… gerçekten hiçbir şey bilmiyor muydu?" |
| Son | — | "Devamı 6. bölümde…" |

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses) | Hasan Yasin – Warm Turkish Narrator |
| Nur | COC ZEHRA |
| Ela | DEFNE (Gamze Cartoon) |

Fon müziği önceki bölümlerden aynen alındı.

## Değiştirmek
1. `bolum5.js` içinde replik, duygu, poz, plan; banka ekranı yazıları `yazilar.banka` altında.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S4` sadece o sahne).
3. `node video_disa_aktar.js`

Yeni planlar: `nurPark, nurParkYakin, asliAyakPark, asliAyakYakin, nurElaPark, bankIkili, asliBankYakin, nurBankYakin, keremEvTelefon, bankaEkran, fotoTelefon, fotoTelefonYakin, elaSalincak`
