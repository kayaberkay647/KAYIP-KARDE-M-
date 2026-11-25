# BU ÇOCUK SİZİN DEĞİL — 9. Bölüm: "Gül"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler + Gül).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil önceki bölümlerle **birebir aynı** (bkz. `../bolum1/README.md`).

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Gül'ün kapısı (başka şehir) | **Giriş direkt:** Gül kapıyı açıyor: "Seni yıllardır bekliyordum, Aslı. Geç kaldın." Kerem onu düğüne bile çağırmamış. |
| S2 | Otobüs · "BİR GÜN ÖNCE" | Aslı adresi Kerem'in eski telefon defterinde buluyor, 9 saatlik yol. Kerem arıyor; iç sesi: "Gül'e gidiyorsa… her şey biter." Tehdit: "Yanlış bir şey yaparsan, Duru'yu bir daha göremezsin." |
| S3 | Gül'ün evi, çay masası | Gül itiraf ediyor: bileklikleri Kerem'in isteğiyle değiştirmiş ("Bebeklerden biri ölebilir, kurtarmamız lazım"). Kerem dokuz yıl her ay "sustun mu?" diye aramış. Final: **"Senin bebeğin… kalp hastasıydı. Diğer bebek ise… abimin kızıydı."** "Nur'la abimin bir ilişkisi vardı. Sen hamileyken." Son: "Kerem… hasta olan kendi kızını mı Nur'a vermişti?" |
| Son | — | "Devamı 10. bölümde…" (10. bölüm Kerem'in itirafıyla açılıyor: "Evet. İkisi de benim kızım.") |

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses) | Hasan Yasin – Warm Turkish Narrator |
| Gül (yeni ses) | COC DERYA |

Fon müziği ve telefon efekti önceki bölümlerden aynen alındı.

## Değiştirmek
1. `bolum9.js` içinde replik, duygu, poz, plan.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S3` sadece o sahne).
3. `node video_disa_aktar.js`

Yeni planlar: `gulKapi, gulKapiYakin, asliKapiDis, asliKapiDisYakin, otobusAsli, otobusAsliYakin, otobusPencere, gulEvGenis, asliMasaYakin, gulMasaYakin, duruFoto` · Yeni arka plan: `gulEv` (deniz manzaralı eski ev) · Otobüs içi (kayan manzara) plan içinde çiziliyor.
