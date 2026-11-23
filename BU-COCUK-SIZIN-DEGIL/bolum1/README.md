# BU ÇOCUK SİZİN DEĞİL — 1. Bölüm (yeniden yapım)

Dikey (9:16, 1080x1920) 2D animasyon · 2:30 · Tüm sesler ElevenLabs.

## Dosyalar
| Dosya | Ne işe yarar |
|---|---|
| `bolum1.js` | Senaryo, karakter sesleri, sahneler, ortam sesleri, müzik. **Değişiklikleri burada yap.** |
| `ses_uret.js` | ElevenLabs'tan diyalog (diyalog modu), ortam sesi, efekt ve müzik üretir → `ses_paketi.js` |
| `index.html` | Animasyonun kendisi (Chrome'da aç). Karakter çizimi, kamera, ışık, ses miksajı. |
| `video_disa_aktar.js` | 1080x1920 MP4 çıkarır. |
| `index_eski_v1.html` | Önceki sürüm (yedek). |

## Karakterler ve sesler
| Karakter | Ses (ElevenLabs) |
|---|---|
| Aslı (anne, anlatıcı) | Zeynep – Warm & Rich |
| Kerem (baba) | Hasan Yasin – Warm Turkish Narrator |
| Dr. Nihal (doktor) | Mine – Natural, Steady and Calm |
| Duru (8) | Gözde (karakter seslendirme) |

## Ses nasıl üretiliyor?
- **Diyalog modu:** Her sahnenin konuşmaları tek parça üretilir. Karakterler birbirine cevap verir gibi doğal akışla konuşur. Duygu etiketleri (`[crying]`, `[whispers]`, `[sighs]`…) okunmaz, sese yansır.
- Her sahne için 2 okuma üretilir, yazıya çevrilip metinle karşılaştırılır, en doğru okuma seçilir.
- **Tempo:** Her sahne saniyede ~2 kelimeye eşitlenir (`hedefTempo`). Ne hızlı ne yavaş, bütün bölümde tutarlı.
- **Seviye:** Konuşma −16 LUFS (yayın standardı). Ortam sesleri ve müzik konuşmanın altında; biri konuşurken otomatik kısılır.
- Konuşma kanalında kompresör var: fısıltı ile bağırış arasındaki fark dengelenir.

## Değiştirmek
1. `bolum1.js`: replik (`ses` = seslendirilen metin, `metin` = altyazı), duygu, poz, kamera planı.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten gelir; `node ses_uret.js S3` sadece 3. sahne).
3. `node video_disa_aktar.js` → `BuCocukSizinDegil_Bolum1.mp4`

Görsel ayarlar `index.html` başındaki `GORSEL` (altyazı konumu/puntosu), ses dengesi `MIKS` (konuşma seviyesi, konuşurken müzik/ortam kısma oranı).

## Duygular / pozlar / planlar
- Duygular: `notr, gulumse, merakli, endise, uzgun, aglama, sok, ciddi, supheli, sakin, sefkat, aci, uyku, zorGulumse, umut`
- Pozlar: `yan, masa, kagit, gogus, agiz, kulak, kollar, gozluk, direksiyon, telefon, alin, saril`
- Planlar: `nihalOrta, nihalYakin, nihalOmuz, kagitYakin, asliYakin, cift, keremYakin, mutfakGenis, duruMasa, keremDuru, kanTupu, koridorGenis, asliKoridor, duruKoridor, sarilma, arabaGenis, telefon, ayna, asliAraba, keremAraba, kapanis`
