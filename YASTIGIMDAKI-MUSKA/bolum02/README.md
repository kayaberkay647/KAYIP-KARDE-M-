# YASTIĞIMDAKİ MUSKA — 2. Bölüm: "Kırmızı İplik"

1. bölümle aynı tarz, karakterler, sesler ve çizim motoru. Süre 2:26, 1080×1920, 30 fps.
Senaryo: `../Bolum-02-Kirmizi-Iplik.md`

## İzlemek / video almak
```
cd YASTIGIMDAKI-MUSKA/bolum02
# index.html'i Chrome'da aç, ya da:
node video_disa_aktar.js          # → YastigimdakiMuska_Bolum2.mp4
```

## Yapı
Bütün bölümler aynı motoru paylaşır:
- `../animasyon/motor.js` → karakterler, iskelet, aksesuarlar (muska, telefon, düğümlü iplik, sarma tabağı…)
- `../animasyon/mekanlar.js` → mutfak, antre, yatak odası, banyo, büyü odası, Hatice'nin salonu, ofis, banyo kapısı
- `../animasyon/fontlar/` → Lora

Bu klasörde yalnızca bölüme özel olanlar var: `replikler.json`, `efektler.json`, `sahneler.js` (37 çekim), `araclar/zaman_cizelgesi.py` (çekim listesi ve fon sesleri), `ses/`.

## Sesi yenilemek
```
python3 araclar/ses_uret.py H05        # bir repliği yeniden üret
python3 araclar/ses_uret.py --kontrol  # telaffuz kontrolü
python3 araclar/efekt_uret.py          # eksik efektleri üret
python3 araclar/zaman_cizelgesi.py     # zamanlama + miksaj
```
Kapı arkasındaki fısıltıya (H07) boğukluk ve yankı otomatik uygulanır.
