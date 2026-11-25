# BU ÇOCUK SİZİN DEĞİL — 11. Bölüm: "Yalanın Ortası"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler + kardiyolog).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil önceki bölümlerle **birebir aynı** (bkz. `../bolum1/README.md`).

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Nur'un evi | **Giriş direkt:** Nur ağlayarak kameraya (Aslı'ya): "Yemin ederim, Aslı! Bana evli olmadığını söyledi!" Nur eski telefonunu uzatıyor: "Kendin oku." |
| S2 | Nur'un evi · telefon ekleri | "Mert"in mesajları: "Bu yaz bitince evleneceğiz, söz." Son mesaj doğumdan bir gün önce: **"Şehir Hastanesi'ni ben ayarladım."** Kader değilmiş, Kerem planlamış. Gizli numaradan Nur'a: "Aslı Yılmaz, Ela'yı senden almak istiyor. Dikkat et." İki anne birleşiyor: "Ben senin düşmanın değilim." |
| S3 | Ev (Kerem) | Kerem'in iç sesi: "Plan değişti." Avukatını arıyor: "Evrakları hazırlayın. Hemen." (12. bölümdeki velayet davasına hazırlık) |
| S4 | Nur'un evi | Okuldan telefon: "Ela mı? Ne demek bayıldı?!" |
| S5 | Hastane | Kardiyolog: "Kalpteki delik büyümüş." Final: **"İki hafta içinde ameliyat olmazsa… çok geç olabilir."** Nur: "Param yok." Aslı: "Ödeyeceğiz." Son: hastane yatağında uyuyan Ela, "Öz kızımı daha yeni bulmuştum… Onu kaybedemezdim." |
| Son | — | "Devamı 12. bölümde…" |

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses) | Hasan Yasin – Warm Turkish Narrator |
| Nur | COC ZEHRA |
| Kardiyolog (yeni) | COC MURAT |

Fon müziği ve telefon efekti önceki bölümlerden aynen alındı.

## Değiştirmek
1. `bolum11.js` içinde replik, duygu, poz, plan; telefon mesajları `yazilar.mesajlar` ve `yazilar.gizli` altında.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S5` sadece o sahne).
3. `node video_disa_aktar.js`

Yeni planlar: `nurEvYakin, asliNurEv, asliNurEvYakin, nurTelefonVer, nurTelefonKulak, ikiAnne, mesajlar, mesajlarYakin, mesajGizli, hastaneKosu, doktorKoridor, doktorYakin, nurHastane, asliHastane, elaYatak` · Yeni arka plan: `nurEv` · Yeni karakter: `DOKTOR` (kardiyolog)
