# GECE NÖBETİ — 1. Bölüm: "Uyanık Kal"

Dikey (9:16, 1080×1920) Instagram Reels formatında 2:30'luk 2D korku animasyonu. Görseller ve ses efektleri tamamen kodla üretilir, tarayıcıda çalışır.

## İzlemek
`index.html` dosyasını Chrome'da aç ve ekrana dokun. **Boşluk** tuşu oynatır ve duraklatır.
Belirli bir kareyi görmek için adrese saniyeyi ekle: `index.html?t=70`.

## ElevenLabs seslerini eklemek
1. Aşağıdaki her repliği ElevenLabs'ta (Eleven v3) seslendir. Köşeli parantezdeki etiketleri metnin başına yaz.
2. Dosyaları tablodaki isimlerle `ses/` klasörüne koy.
3. Ya sayfadaki **🎙 Sesleri Yükle** düğmesiyle seç, ya da `node video_disa_aktar.js` ile MP4 al. Dışa aktarma aracı sesleri `ses/` klasöründen kendisi bulur.

Uyurgezer, telefon ve kapı arkası efektlerini kod otomatik uygular: uyurgezer seste 1 yarım ton pesleştirme ve yankı, telefon hoparlörü filtresi, kapı arkası boğukluğu. Sen sesleri **temiz** üret.

| Dosya | Karakter | Etiket | Metin |
|---|---|---|---|
| `B01_R01_ELIF.mp3` | Elif (uyurgezer) | `[whispers] [flat]` | Abi... kapıyı aç. *(0:00 ve 1:09'da iki kez kullanılır)* |
| `B01_R02_SELMA.mp3` | Selma | `[tired]` | Nöbetim sabah yedide biter. Kapıyı arkamdan iki kere kilitle. |
| `B01_R03_EMRE.mp3` | Emre | `[sighs]` | Biliyorum anne. Her gece aynı şey. |
| `B01_R04_SELMA.mp3` | Selma | `[serious]` | Bu gece farklı. Elif'in uyurgezerliği arttı. Sakın uyandırma onu... elinden tut, yatağına götür. |
| `B01_R05_EMRE.mp3` | Emre | | Ne zamandan beri bu kadar kötü? |
| `B01_R06_SELMA.mp3` | Selma | `[quietly]` | Babanız gittiğinden beri. |
| `B01_R07_SELMA.mp3` | Selma | `[whispers]` | Anahtar sende dursun. Kim gelirse gelsin... açma. |
| `B01_R08_ELIF.mp3` | Elif | `[sleepy] [soft]` | Abi... bu gece de nöbet sende mi? |
| `B01_R09_EMRE.mp3` | Emre | `[warm]` | Bende. Kamera da açık, bak. Seni izliyorum. |
| `B01_R10_ELIF.mp3` | Elif | `[hesitant]` | O zaman... o gelirse beni ona verme, tamam mı? |
| `B01_R11_EMRE.mp3` | Emre | | Kim gelirse? |
| `B01_R12_ELIF.mp3` | Elif | `[whispers]` | Pencerenin önündeki adam. Bana hep 'gel' diyor. |
| `B01_R13_EMRE.mp3` | Emre | `[soft laugh]` | Rüya o Elif. Rüyadaki adamlar kimseyi alamaz. |
| `B01_R14_ELIF.mp3` | Elif | `[quietly] [serious]` | Rüya olsa... senin adını bilmezdi. |
| `B01_R15_EMRE.mp3` | Emre | `[yawning] [whispers]` | Uyuma Emre... sadece dört saat kaldı. |
| `B01_R17_EMRE.mp3` | Emre | `[panicked]` | Elif? ELİF! |
| `B01_R18_EMRE.mp3` | Emre | `[shaky breath]` | Tamam... tamam. Evdesin. Burada bir yerdesin. |
| `B01_R19_EMRE.mp3` | Emre | `[whispers] [careful]` | Elif... gel, yatağa dönelim. |
| `B01_R20_ELIF.mp3` | Elif (uyurgezer) | `[flat]` | Kapıyı aç Emre. Babam soğukta kaldı. |
| `B01_R21_EMRE.mp3` | Emre | `[whispers] [trembling]` | Babam burada değil, Elif. Babam... gitti. |
| `B01_R22_ELIF.mp3` | Elif (uyurgezer) | `[flat]` | Gitmedi. Kapının arkasında bekliyor. |
| `B01_R23_BABA.mp3` | Baba | `[low] [raspy] [whispers]` | Emre... oğlum. Aç şu kapıyı. Kızım üşüyor. |
| `B01_R24_ELIF.mp3` | Elif (uyurgezer) | `[flat]` | Anahtar sende abi. Hep sende. |
| `B01_R25_ELIF.mp3` | Elif | `[sleepy] [soft]` | Abi... ben yine bir şey yaptım mı? |
| `B01_R26_EMRE.mp3` | Emre | `[forcing calm]` | Hayır. Hiçbir şey yapmadın. Uyu. |
| `B01_R27_ELIF.mp3` | Elif | `[sleepy] [whispers]` | Sen de uyuma ama... tamam mı? |
| `B01_R28_EMRE.mp3` | Emre | `[whispers] [terrified]` | Bu... bu ne? |
| `B01_R29_ELIF.mp3` | Elif (uyurgezer) | `[whispers] [flat]` | Sen beni izliyorsun abi... O da seni. |

**Ses ayarları (15 bölüm boyunca sabit):**
- Emre: Stability 45 / Similarity 80 / Style 25
- Elif normal: 50 / 80 / 30
- Elif uyurgezer: **85 / 80 / 0** (ses aynı, sadece ayar değişir)
- Selma: 55 / 80 / 20
- Baba: 60 / 85 / 15

Bir ses dosyası altyazı süresinden uzun çıkarsa, `index.html` içindeki `AYAR.replikler` listesinde o satırın `t` (başlangıç) ve `sure` değerlerini ayarla.

## Video almak (MP4, 1080×1920)
```
cd GECE-NOBETI/animasyon
node video_disa_aktar.js              # 1080x1920, altyazılı
ALTYAZI=0 node video_disa_aktar.js    # altyazısız
```
Gerekenler: Node.js, Playwright (Chromium), ffmpeg. Çıktı dosyası: `GeceNobeti_Bolum1.mp4`.

## Zaman çizelgesi
| Saniye | Sahne |
|---|---|
| 0–4 | Soğuk açılış: gece görüşü kamerası, Elif yatakta oturuyor |
| 4–12 | Jenerik: GECE NÖBETİ, 1. BÖLÜM: UYANIK KAL |
| 12–34 | Antre: Selma nöbete gidiyor, anahtar, iki kere kilit |
| 34–58 | Elif'in odası: "Pencerenin önündeki adam" |
| 58–74 | Salon 03:17: kamerada Elif doğrulur, yatak boşalır |
| 74–86 | Koşu, açık pencere, boş sokak |
| 86–118 | Ön kapı: uyurgezer Elif, üç vuruş, babanın sesi |
| 118–132 | Yatağa dönüş, annenin mesajı |
| 132–144 | Kayıt: yatağın kenarındaki şey |
| 144–150 | DEVAMI GELECEK... |
