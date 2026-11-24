# BU ÇOCUK SİZİN DEĞİL — 3. Bölüm: "Arşiv"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler + arşiv memuru).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil 1. ve 2. bölümle **birebir aynı** (bkz. `../bolum1/README.md`).

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Salon (gün) | **Giriş direkt sonuç:** DNA raporu ekranda, Aslı fısıldıyor: "Annelik olasılığı… yüzde sıfır?!" Duru okuldan geliyor; Aslı kâğıdı saklayıp ona sarılıyor. |
| S2 | Telefon | Dr. Nihal: "O gece başka bir bebek daha doğduysa… kaydı hastanenin arşivinde olmalı." |
| S3 | Arşiv kapısı / salon | Kerem arıyor: "Neredesin?" Aslı: "Hastanedeyim." Kerem'in iç sesi: "Sakın oraya gitmiş olmasın." |
| S4 | Hastane arşivi | Kayıt defteri: 14 Mart gecesi 15 dakika arayla iki kız bebek. Diğer anne: **Nur Aksoy**. Memur: "Bu dosyayı geçen ay kocanız da istemişti." Talep formunda Kerem'in imzası. |
| Son | — | "Devamı 4. bölümde…" |

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses) | Hasan Yasin – Warm Turkish Narrator |
| Dr. Nihal | Mine – Natural, Steady and Calm |
| Duru | Gözde (karakter seslendirme) |
| Arşiv memuru (yeni) | COC MEMUR |

Fon müziği ve telefon efekti önceki bölümlerden aynen alındı. Yeni efekt: defter sayfası (`sayfa`).

## Değiştirmek
1. `bolum3.js` içinde replik, duygu, poz, plan; ekrandaki rapor/defter/form yazıları `yazilar` altında.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S4` sadece o sahne).
3. `node video_disa_aktar.js`

Yeni planlar: `dnaRapor, asliKagit, asliKagitYakin, duruSalon, asliDuruSalon, sarilma, asliTelefonB, asliTelefonBYakin, keremTelefon, keremTelefonYakin, asliArsivKapi, asliArsivTelefon, memurYakin, asliArsiv, asliArsivYakin, arsivGenis, kayitDefteri, kayitDefteriYakin, talepFormu, nurKayit`
