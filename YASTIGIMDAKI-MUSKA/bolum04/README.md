# YASTIĞIMDAKİ MUSKA — 4. Bölüm: "Mezarlık Sokağı"

1. bölümle aynı tarz, karakterler, sesler ve çizim motoru. Süre 2:25, 1080×1920, 30 fps.
Senaryo: `../Bolum-04-Mezarlik-Sokagi.md`

## İzlemek / video almak
```
cd YASTIGIMDAKI-MUSKA/bolum04
# index.html'i Chrome'da aç, ya da:
node video_disa_aktar.js          # → YastigimdakiMuska_Bolum4.mp4
```

## Yapı
Bütün bölümler aynı motoru paylaşır:
- `../animasyon/motor.js` → karakterler, iskelet, aksesuarlar (muska, telefon, düğümlü iplik, sarma tabağı…)
- `../animasyon/mekanlar.js` → mutfak, antre, yatak odası, banyo, büyü odası, Hatice'nin salonu, ofis, banyo kapısı
- `../animasyon/fontlar/` → Lora

Bu klasörde yalnızca bölüme özel olanlar var: `replikler.json`, `efektler.json`, `sahneler.js` (33 çekim), `araclar/zaman_cizelgesi.py` (çekim listesi ve fon sesleri), `ses/`.

## Sesi yenilemek
```
python3 araclar/ses_uret.py H05        # bir repliği yeniden üret
python3 araclar/ses_uret.py --kontrol  # telaffuz kontrolü
python3 araclar/efekt_uret.py          # eksik efektleri üret
python3 araclar/zaman_cizelgesi.py     # zamanlama + miksaj
```
Telefon sesleri (E03, H07) telefon hoparlörü gibi, mutfaktan seslenen Hatice (H03) uzaktan duyulacak şekilde otomatik işlenir. Nazlı'nın sesi çalındığı için bu bölümde yalnızca iç sesle ve deftere yazarak konuşur.
