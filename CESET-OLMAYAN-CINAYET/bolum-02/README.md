# CESET OLMAYAN CİNAYET — 2. Bölüm: KAPIDAKİ KADIN

9:16 dikey, 1080×1920, 30 fps, **2 dk 10 sn**. 1. bölümün son saniyesinden (kapıdaki üç vuruş) devam eder.
Duygu öncelikli: replikler hızlandırılmadı, kısaltılmadı.

## Ortak dosyalar
Karakterler ve mekânlar `../ortak/` klasöründedir ve sonraki bölümler de bunları kullanır:
- `ortak/karakter.js` — Aylin, Emir, Komiser Murat, Zehra, polis memuru ve **Derya** (yeni)
- `ortak/mekan.js` — 4 numaralı daire (salon, giriş kapısı, mutfak, yatak odası kapısı)
- `ortak/bodrum.js` — apartman merdiveni (geçmiş görüntüsü), bodrum koridoru, B-11/B-12/B-13 depoları, kayıt cihazı yakın planları

## Derya (sabit tasarım)
Omuz hizası düz siyah saç (ortadan ayrık), açık buğday ten, koyu yeşil gözler, bordo kuşaklı yağmurluk, siyah pantolon,
sol ön kolda sargı. Ses: ElevenLabs **Ayça** (`COC DERYA`, eleven_v3, stability 0.0).

## Sesler
- Diğer karakterler 1. bölümle aynı ElevenLabs sesleri.
- Emir'in kaydı (D34): kendi sesi + küçük hoparlör/kayıt cihazı filtresi ve bant cızırtısı.
- Bütün replikler -17 dBFS konuşma seviyesine eşitlenir; konuşmalar fonun ortalama ~19 dB, en az ~10 dB üstündedir.
- Kontrol: `python3 araclar/kontrol.py` (Scribe ile yazıya döküp senaryoyla karşılaştırır). D30 için kararlı mod (`"st": 0.5`) gerekti.

## Üretim
```
python3 araclar/ses_uret.py [D05 ...]   # seslendirme (replikler.json → ses/)
python3 araclar/efekt_uret.py           # 2. bölüme özel efektler
python3 araclar/zamanla.py --mix        # zaman çizelgesi + ses miksi
node video_disa_aktar.js                # → CesetOlmayanCinayet_Bolum2.mp4
```

## Zaman çizelgesi (gerçekleşen)
| Sahne | Başlangıç | Senaryodaki |
|---|---|---|
| 1 Kapıyı açmayın! (+ başlık) | 0:00 | 0:00 |
| 2 Gizemli kadın | 0:15.4 | 0:14 |
| 3 Saklanan gerçek | 0:28.4 | 0:29 |
| 4 Merdivendeki adam (geçmiş görüntüsü) | 0:47.4 | 0:44 |
| 5 B-13 anahtarı | 1:03.1 | 1:00 |
| 6 Bodrumdaki sır | 1:18.8 | 1:15 |
| 7 Aylin'in gözyaşları | 1:33.9 | 1:30 |
| 8 Emir'in son uyarısı | 1:50.0 | 1:46 |
| Bitiş kartı | 2:07.9 | — |
