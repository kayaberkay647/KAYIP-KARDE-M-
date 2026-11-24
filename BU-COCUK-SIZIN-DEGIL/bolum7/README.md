# BU ÇOCUK SİZİN DEĞİL — 7. Bölüm: "Ben Kimin Çocuğuyum?"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil önceki bölümlerle **birebir aynı** (bkz. `../bolum1/README.md`).

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Muayenehane kapısı (akşam) | **Giriş direkt:** Ağlayan Duru, ayıcığıyla doktorun kapısında: "Doktor teyze… ben kimin çocuğuyum?" Dr. Nihal şaşkın: "Bu saatte burada tek başına ne yapıyorsun?" |
| S2 | Park / ev · "BİRKAÇ SAAT ÖNCE" | Aslı bütün gün Duru'yu arıyor, polisle konuşuyor. Kerem telefonda ağzından kaçırıyor: "O kadının adresini ver bana!" Aslı: "Hani tanımıyordun?" |
| S3 | Ev (gece) | Kapı çalıyor (zil efekti, kapının altında iki gölge). Dr. Nihal: "Aslı Hanım… kızınız bende." Aslı Duru'ya sarılıyor: "Ne olursa olsun… her zaman senin annenim." Kerem doktoru soğuk bir şekilde gönderiyor. |
| S4 | Apartman kapısı | Dr. Nihal fısıldıyor: **"Dokuz yıl önce o gece… ben de o hastanedeydim."** "Yarın muayenehaneme gelin. Yalnız gelin. Ve kocanıza… hiçbir şey söylemeyin." |
| Son | — | "Devamı 8. bölümde…" |

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses) | Hasan Yasin – Warm Turkish Narrator |
| Dr. Nihal | Mine – Natural, Steady and Calm |
| Duru | Gözde (karakter seslendirme) |

Fon müziği önceki bölümlerden aynen alındı. Yeni efekt: kapı zili (`zil`).

## Değiştirmek
1. `bolum7.js` içinde replik, duygu, poz, plan; tabela yazıları `yazilar` altında.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S4` sadece o sahne).
3. `node video_disa_aktar.js`

Yeni planlar: `duruKlinikKapi, duruKlinikKapiYakin, nihalKapi, nihalKapiYakin, asliParkTelefon, asliParkTelefonYakin, kapiInsert, nihalDuruKapi, asliKapiYakin, sarilmaKoridor, asliNihalKapi, nihalFisilti` · Yeni arka plan: `apartman` · Yeni kıyafetler: Duru `mont` (pembe), Dr. Nihal `gece` (palto)
