# BU ÇOCUK SİZİN DEĞİL — 1. Bölüm (referans videonun yapısında)

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs.

## Referanstan alınan yapı
| Özellik | Referans | Bu bölüm |
|---|---|---|
| Anlatım | İki iç ses (karı + koca) + diyalog | Aslı'nın ve Kerem'in iç sesi + diyalog |
| Tempo | ~2.1 kelime/sn, replik arası 0.4–0.7 sn | ~2.1 kelime/sn, replik arası ~0.7 sn |
| Kurgu | Sert kesmeler, plan başına 3–5 sn | Sert kesmeler, plan başına ~3–5 sn |
| Çerçeve | Karakterler önden, ortada, bütün vücut | Aynı (oturanlar sandalyede ayağa kadar, masada belden yukarı) |
| Altyazı | Ekranın ~%70'i, 2–4 kelimelik parçalar, konuşma düz / iç ses italik serif | Aynı (kelime zamanlarıyla senkron) |
| Ses | Konuşmanın altında sürekli yumuşak fon müziği, ortam sesi yok | Aynı (ElevenLabs müzik), sadece telefon ve kalem efekti |
| Hatıra | Siyah-beyaz | Siyah-beyaz (9 yıl önceki doğum) |
| Görsel | Krem desenli duvar kâğıdı, perdeli pencere, kenar kararması | Aynı |

## Dosyalar
| Dosya | Ne işe yarar |
|---|---|
| `bolum1.js` | Senaryo, karakter sesleri, sahne/plan, müzik ve efekt istemleri. **Değişiklikleri burada yap.** |
| `ses_uret.js` | ElevenLabs: diyalog modu (sahne sahne), kelime zamanları, fon müziği, efektler → `ses_paketi.js` |
| `index.html` | Animasyon (Chrome'da aç). Üstte `GORSEL` (altyazı konumu/puntosu) ve `MIKS` (ses dengesi). |
| `video_disa_aktar.js` | 1080x1920 MP4 çıkarır. |

## Değiştirmek
1. `bolum1.js` içinde replik (`ses` = seslendirme metni, `metin` = altyazı), duygu, poz, plan.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S2` sadece 2. sahne).
3. `node video_disa_aktar.js`

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses) | Hasan Yasin – Warm Turkish Narrator |
| Dr. Nihal | Mine – Natural, Steady and Calm |
| Duru | Gözde (karakter seslendirme) |

Planlar: `nihalMasa, nihalYakin, kagit, asliOfis, asliYakin, keremOfis, ciftOfis, mutfakGenis, duruMutfak, asliMutfak, keremMutfak, keremYakin, masa, kanTupu, hatira, salonGenis, keremSofa, telefon, telefonSil, asliKapi, duruKapi, asliDuru, asliYakinGece, cizim`
