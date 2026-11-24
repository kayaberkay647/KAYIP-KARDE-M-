# BU ÇOCUK SİZİN DEĞİL — 4. Bölüm: "Parktaki Kız"

Dikey 1080x1920 · 2:30 · Tüm sesler ElevenLabs (eleven_v4, önceki bölümlerle aynı sesler + Ela ve Nur).
Sistem, kurgu, altyazı, ses dengesi ve görsel stil önceki bölümlerle **birebir aynı** (bkz. `../bolum1/README.md`).

## Akış
| Sahne | Yer | Ne oluyor |
|---|---|---|
| S1 | Park | **Giriş direkt:** Ela kameraya (Aslı'ya) bakıp soruyor: "Teyze… neden bana öyle bakıyorsun?" Aslı: "Dokuz yıl sonra ilk kez… kendi gözlerimin içine bakıyordum." |
| S2 | Salon (gece) · "İKİ GÜN ÖNCE" | Aslı internette Nur Aksoy'u buluyor: doğum günü fotoğrafı, 9 mum, isim **Ela**. "Kerem'in telefonundaki E… Ela'ydı." Konum: Çınaraltı Parkı. Kerem: "Bu saatte kiminle yazışıyorsun?" |
| S3 | Park | Ela'nın doğum günü 14 Mart, kalbi hasta. Saçını kulağının arkasına atıyor; Aslı da aynı anda aynı hareketi yapıyor. Ela: **"Senin kulağında da benim lekem var!"** Son: Nur uzaktan bağırıyor: "Ela! Kiminle konuşuyorsun sen?!" |
| Son | — | "Devamı 5. bölümde…" |

## Sesler
| Karakter | ElevenLabs sesi |
|---|---|
| Aslı (+ iç ses) | Zeynep – Warm & Rich |
| Kerem (+ iç ses) | Hasan Yasin – Warm Turkish Narrator |
| Ela (yeni) | DEFNE (Gamze Cartoon) |
| Nur (yeni) | COC ZEHRA |

Fon müziği önceki bölümlerden aynen alındı.

## Yeni karakterler
- **Ela:** Aslı'nın saç, göz ve ten rengi; bele kadar saç, pembe toka; sağ kulak memesinde kahverengi doğum lekesi (Aslı'da da aynı leke var).
- **Nur:** Topuz, Duru'nun saç ve göz rengi; yeşil kazak.

## Değiştirmek
1. `bolum4.js` içinde replik, duygu, poz, plan; telefondaki profil yazıları `yazilar.profil` altında.
2. `node ses_uret.js` (değişmeyen sahneler önbellekten; `node ses_uret.js S3` sadece o sahne).
3. `node video_disa_aktar.js`

Yeni planlar: `elaPark, asliPark, asliParkYakin, parkGenis, salonTelefon, profil, profilYakin, profilKonum, kulakEla, kulakAsli, nurUzak, nurYakin`
Yeni pozlar: `sacKulak` (saçı kulağın arkasına atma), `yanKulak` (saç kulağın arkasında, kollar yanda)
