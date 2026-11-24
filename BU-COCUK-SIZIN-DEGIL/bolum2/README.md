# BU ÇOCUK SİZİN DEĞİL — 2. Bölüm: "Laboratuvar Hatası"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, 1. bölümle aynı sesler).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil 1. bölümle **birebir aynı** (bkz. `../bolum1/README.md`).

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Mutfak (sabah) | **Giriş direkt kavga:** Aslı "“Doktor biliyor” ne demek, Kerem?!" diye bağırarak açılıyor. Kerem "laboratuvar hatası" diyor, Duru kavgayı duyuyor. |
| S2 | Salon / muayenehane (telefon) | Aslı, Dr. Nihal'i arayıp gizlice DNA testi istiyor. "Eşiniz bilmesin, değil mi?" |
| S3 | Duru'nun odası (gece) | Aslı kızının saçını tarıyor, üç tel saçı zarfa koyuyor. Duru: "Anne… ben senin kızın mıyım?" |
| S4 | Laboratuvar | Zarf teslim ediliyor; üstüne sadece bir numara yapıştırılıyor. |
| S5 | Salon (gece) | Kerem'in telefonunda hatırlatıcı: "E.'nin doğum günü – 14 Mart." Duru'nun doğum günüyle aynı. |
| Son | — | "Devamı 3. bölümde…" |

## Dosyalar
| Dosya | Ne işe yarar |
|---|---|
| `bolum2.js` | Senaryo, karakter sesleri, planlar, ekrandaki yazılar. **Değişiklikleri burada yap.** |
| `ses_uret.js` | ElevenLabs: sahne başına 3 okuma → en doğru + en duygulu seçilir, kelime zamanları → `ses_paketi.js` |
| `index.html` | Animasyon motoru (1. bölümün motoru + bu bölümün yeni planları). |
| `video_disa_aktar.js` | `BuCocukSizinDegil_Bolum2.mp4` çıkarır. |

Fon müziği ve efektler 1. bölümden aynen alındı (dizi boyunca aynı müzik).

## Değiştirmek
1. `bolum2.js` içinde replik, duygu, poz, plan.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S3` sadece o sahne).
3. `node video_disa_aktar.js`

Yeni planlar: `asliMutfakYakin, asliTelefon, asliTelefonYakin, nihalTelefon, nihalTelefonYakin, duruYatak, asliTarak, duruYatakYakin, duruUyku, zarf, zarfLab, zarfNumara, salonAsli, asliSofaYakin, hatirlatici, keremKapi, keremKapiYakin, takvim`
