# BU ÇOCUK SİZİN DEĞİL — 1. Bölüm

Dikey (9:16) 2D animasyon. Süre: ~2:30. Sesler ElevenLabs ile üretildi.

## Dosyalar
| Dosya | Ne işe yarar |
|---|---|
| `bolum1.js` | **Senaryo + sesler + sahne planları.** Değişiklikleri burada yap. |
| `ses_uret.js` | Diyalogları ElevenLabs'tan üretir → `ses/` ve `ses_paketi.js` |
| `index.html` | Animasyonun kendisi (Chrome'da aç, oynat) |
| `video_disa_aktar.js` | 1080x1920 MP4 çıkarır |

## Sesler (ElevenLabs, model: eleven_v4)
| Karakter | Ses |
|---|---|
| Selin (ve iç sesi) | AYY SEVDA |
| Murat | AYY MERT |
| Dr. Kemal | COC MURAT |
| Defne | Gamze (Cartoon Character) — ses kütüphanesinden eklendi |

ElevenLabs çocuk sesi tasarımına izin vermediği için Defne'yi çizgi film karakterleri seslendiren bir yetişkin seslendirmen sesi seslendiriyor.

## Bir şeyi değiştirmek
1. `bolum1.js` içinde repliği, duyguyu veya planı değiştir.
2. `node ses_uret.js` (sadece değişen replikler yeniden üretilir; `--kontrol` ile telaffuz kontrolü).
3. `node video_disa_aktar.js` → `BuCocukSizinDegil_Bolum1.mp4`

Zamanlama, seslerin gerçek süresine göre otomatik hesaplanır ve `hedefSure` (150 sn) tutturulur.

## Planlar (kamera çekimleri)
`doktor, doktorYakin, monitor, selinYakin, ikili, muratYakin, mutfakGenis, defneMutfak, muratMutfak, kanTupu, koridorIkili, selinKoridor, defneKoridor, araba, telefon, ayna, selinAraba, muratAraba, kapanis, baslik, sonKart`

## Duygular
`notr, gulumse, uzgun, aglama, sok, endise, ciddi, supheli, sakin, aci, uyku, zorGulumse`

## Ses miksajı
`index.html` içindeki `SES_AYAR`:
- `diyalog`: konuşma seviyesi (1.25)
- `muzik`: fon müziği seviyesi (0.8)
- `kisma`: biri konuşurken müzik ve efektler bu orana iner (0.17 → %83 kısılır), konuşma bitince geri açılır
