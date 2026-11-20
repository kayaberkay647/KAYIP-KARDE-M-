# 1dkdua | Hikmetli Kareler — animasyon stüdyosu

Konuşma kayıtlarından 9:16 sinematik 2D animasyon üreten, kodla çizen motor. Görsel kimlik: **[STIL-REHBERI.md](STIL-REHBERI.md)**.

```
1dkdua/
├── STIL-REHBERI.md          ← bütün videoların standardı
├── motor/                   ← ortak motor (her videoda aynı)
│   ├── motor.js             kamera/parallax, kâğıt dokusu, başlık, altyazı panosu, kapanış, geçişler
│   ├── karakter.js          ADAM, HOCA, TALEBE: ayakta, yürüyen, oturan, arkadan
│   ├── cevre.js             gökyüzü, tepe, zeytin, servi, konak, sütun, kemer, kandil, yıldız, ay…
│   ├── ahiret.js            mezar taşları, kabir kesiti, kefen, Mescid-i Nebevî, hurma, kerpiç ev, nur
│   ├── ibadet.js            seccade, secde figürü, bohça, dolap, koku/köpük, titreşim halkaları, cami silueti
│   ├── mekan.js             ortak misafir odası (gün/akşam/gece ışığı), tahta zemin
│   ├── mahser.js            çocuk figürü, güvercin, gök feneri, kalabalık, havz, yağmur/şimşek, koku iplikleri
│   └── fontlar/             Cinzel, Cormorant Garamond, EB Garamond (OFL)
├── araclar/                 ses ayrıştırma, döküm, zaman çizelgesi, ortam sesi, render
├── videolar/
│   ├── 01-imtihan-sahasi/   SENARYO.md, sahneler.js, index.html, veri/, ses/
│   ├── 02-kabir-ve-berzah/  + ortam.json (ses planı)
│   ├── 03-seccade/
│   └── 04-yavru/
└── cikti/                   bitmiş MP4'ler
```

## İzlemek / önizlemek
`videolar/01-imtihan-sahasi/index.html` dosyasını bir yerel sunucuyla açın (fontlar için):
```bash
cd 1dkdua && python3 -m http.server 8000   # → http://localhost:8000/videolar/01-imtihan-sahasi/
```
Boşluk = oynat/duraklat, `?t=35.4` = o saniyenin karesi.

## Üretmek
```bash
cd 1dkdua
araclar/uret.sh videolar/01-imtihan-sahasi      # → cikti/1dkdua_01-imtihan-sahasi.mp4
```
Gerekenler: Node.js + Playwright (Chromium), ffmpeg, Python 3 (numpy, scipy, soundfile).
Kaynak sesi ayırmak ve dökmek için ayrıca: faster-whisper, torch, deepfilternet (bkz. rehber §12).
