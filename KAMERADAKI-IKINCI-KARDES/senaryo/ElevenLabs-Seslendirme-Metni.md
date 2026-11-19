# KAMERADAKİ İKİNCİ KARDEŞ — 1. Bölüm · ElevenLabs Seslendirme Metni

Her replik videodaki sahneye, kamera açısına ve zamanlamaya göre yazıldı. Köşeli parantez içindeki İngilizce etiketler **okunmaz**; Eleven v3 bunları oyunculuk yönergesi olarak uygular. Replik metinleri senaryodakiyle birebir aynıdır (kelime eklenmedi, çıkarılmadı).

---

## 1. Model

- **Önerilen: Eleven v3.** Türkçeyi destekler ve `[whispers]`, `[trembling]` gibi duygu etiketlerini anlar.
  - Stability: Arda ve Defne için **Natural**. Fısıltı ve korku etiketleri yeterince etkili olmazsa o repliği **Creative** ile yeniden üret. İkinci Defne için **Robust** (düz, değişmeyen, tekinsiz ton).
- **Multilingual v2 kullanacaksan:** köşeli parantezleri ve içindekileri sil; `...` ve noktalama kalsın. Duyguyu aşağıdaki ayarlarla ver.
- Her karakter için **tek bir ses ID'si** kullan ve ayarlarını bölüm boyunca değiştirme; yalnızca etiketler değişsin. İkinci Defne, Defne ile **aynı ses ID'sini** kullanır.

## 2. Sesler (Voice Design açıklamaları — kopyala, yapıştır)

**ARDA**
```
Turkish male, 25 years old, natural Istanbul Turkish accent. Medium-depth, warm, clear voice. Calm, protective older brother who speaks in short, serious sentences. When scared his voice trembles slightly and drops lower, but he never shouts. Realistic, conversational, not theatrical.
```

**DEFNE** (İkinci Defne de bu sesi kullanır)
```
Turkish female, 19 years old, natural Istanbul Turkish accent. Young, bright, clear and natural voice. Curious and relaxed in normal moments; when frightened she speaks faster and her breathing becomes audible. Realistic, conversational, not theatrical.
```

**ÇOCUK FISILTISI** (yalnız son replik)
```
Young Turkish girl, soft and quiet voice, natural Istanbul Turkish. Whispering gently, close to the microphone, eerie and calm.
```
> Bu ses tasarlanamazsa Defne'nin sesini `[childlike whisper]` etiketiyle kullan.

## 3. Ayarlar

| Karakter | Stability (v2) | Similarity | Style | Speaker Boost | Speed |
|---|---|---|---|---|---|
| ARDA | 45 | 80 | 25 | Açık | 1.00 |
| DEFNE | 35 | 80 | 40 | Açık | 1.03 |
| İKİNCİ DEFNE (Defne'nin sesi) | 75 | 85 | 0 | Açık | 0.88 |
| ÇOCUK | 40 | 75 | 30 | Kapalı | 0.95 |

## 4. Önemli: süre

Animasyondaki ifadeler, baş çevirmeler ve kamera hareketleri aşağıdaki **hedef sürelere** göre ayarlı. Dudak hareketleri yeni sesinden otomatik hesaplanır.

- Her replik için 3–4 deneme üret; hedef süreye en yakın olanı seç.
- **"En fazla"** süreyi aşmasın; aşarsa bir sonraki replikle üst üste biner. Betik bu durumda `TAŞIYOR!` uyarısı verir.
- Sıkı replikler: **L14, L17, L18, L19, L24.** Bunlarda Speed'i 1.05'e çıkarabilirsin.

## 5. Replikler

Dosya adları: `L01.mp3 … L29.mp3`

---

### SAHNE 02 · 00:09–00:19 · Salon, iki kardeş koltukta

**L01 — ARDA** · başlar 0:11.3 · hedef 2.9 sn · en fazla 3.6 sn
*Ekranda:* Telefonu titredi, ekrana bakıyor, kaşları hafifçe çatılıyor; cümlenin ortasında başını Defne'ye çeviriyor.
*Ton:* Gündelik, hafif şaşkın, biraz bıkkın. Korku yok.
```
[slightly puzzled, casual] Defne, koridor kamerası yine hareket algılamış.
```

**L02 — DEFNE** · başlar 0:15.1 · hedef 2.2 sn · en fazla 3.8 sn
*Ekranda:* Kendi telefonuna bakarken gülümsüyor, başını kaldırıp abisine bakıyor.
*Ton:* Rahat, umursamaz, hafif gülerek; abisine takılıyor.
```
[relaxed, amused, smiling] Abi, kesin yine kamera saçmalıyordur.
```

### SAHNE 03 · 00:19–00:29 · Telefon ekranı / 23:14 kaydı

**L03 — ARDA** · başlar 0:23.2 · hedef 2.9 sn · en fazla 3.3 sn
*Ekranda:* Yüzüne yakın plan; telefonun ışığı yüzünde. Kayıttaki kızı görüyor. "Bir dakika"dan sonra yaklaşık 1 sn duruyor, sonra Defne'ye dönüyor.
*Ton:* Şaşkın ve ciddi, yavaşlayan; ikinci cümle soru tonunda, alçak.
```
[surprised, suddenly serious] Bir dakika... [short pause] Defne, bu sen misin?
```

**L04 — DEFNE** · başlar 0:26.6 · hedef 1.5 sn · en fazla 2.3 sn
*Ekranda:* Kayıt oynuyor (Defne kadraj dışında).
*Ton:* Meraklı, hâlâ rahat, hafif hızlı.
```
[curious, light] Ne olmuş? Göstersene.
```

### SAHNE 04 · 00:29–00:39 · Defne ekrana yaklaşır

**L05 — DEFNE** · başlar 0:31.3 · hedef 2.0 sn · en fazla 3.4 sn
*Ekranda:* Yakın plan; önce şaşırıyor, sonra kaşlarını çatıyor.
*Ton:* İçten bir şaşkınlık ve hafif savunma. Henüz korku yok ama gerginlik var.
```
[confused, a little defensive] Abi, ben koridora falan çıkmadım ki.
```

**L06 — ARDA** · başlar 0:34.8 · hedef 3.1 sn · en fazla 4.1 sn
*Ekranda:* Arda'ya yakın plan, Defne'ye bakıyor.
*Ton:* Şüpheli, sorgulayan ama abice; iki cümle arasında kısa bir es.
```
[suspicious, questioning] Nasıl çıkmadın? [short pause] Üstündeki kıyafet bile aynı.
```

### SAHNE 05 · 00:39–00:49 · K1 ve K2 aynı anda, 23:14

**L07 — ARDA** · başlar 0:43.4 · hedef 2.8 sn · en fazla 3.5 sn
*Ekranda:* İki kamera görüntüsü yan yana (Arda kadraj dışında).
*Ton:* Alçak sesle, donup kalmış; neredeyse kendi kendine.
```
[quietly, stunned, almost to himself] Şuna bak... [short pause] Aynı anda iki yerdesin.
```

**L08 — DEFNE** · başlar 0:47.1 · hedef 1.2 sn · en fazla 1.8 sn
*Ekranda:* Arda'nın büyüyen gözlerine yakın plan (Defne kadraj dışında).
*Ton:* Korkmaya başlıyor; hızlı, nefesli, ses hafif inceliyor.
```
[starting to panic, breathy, fast] Abi, bu nasıl oluyor?
```

### SAHNE 06 · 00:49–00:59 · "Resmen sensin"

**L09 — DEFNE** · başlar 0:49.9 · hedef 1.9 sn · en fazla 3.4 sn
*Ekranda:* Defne'nin yüzüne yavaş yaklaşma; rahat ifade kaybolmuş.
*Ton:* Kısık, korkmuş, küçük bir ses; "Abi..."den sonra yutkunur gibi es.
```
[softly, frightened, small voice] Abi... [short pause] O kız bana benziyor.
```

**L10 — ARDA** · başlar 0:53.6 · hedef 4.1 sn · en fazla 5.4 sn
*Ekranda:* Arda'nın tepkisi, ardından kayıttaki kız yavaşça kameraya dönüyor. **"Resmen sensin." kızın yüzü göründüğü anda (yaklaşık +2.8 sn) gelmeli.**
*Ton:* Yavaş, ağır, ciddi; "Defne..."den sonra uzun es; son iki kelime alçak ve kesin.
```
[slowly, gravely] Benziyor değil Defne... [long pause] Resmen sensin.
```

### SAHNE 07 · 00:59–01:09 · Koridordan üç ayak sesi

**L11 — DEFNE** · başlar 1:01.2 · hedef 2.4 sn · en fazla 3.5 sn
*Ekranda:* Ayak seslerinden hemen sonra abisine sokuluyor, başı kapıya dönük.
*Ton:* Endişeli, hızlı, yarı fısıltı; iki cümle arasında nefes.
```
[anxious, half-whispering, fast] Abi, duyuyor musun? [quick breath] Koridordan geliyor.
```

**L12 — ARDA** · başlar 1:04.8 · hedef 2.7 sn · en fazla 4.1 sn
*Ekranda:* Yavaşça ayağa kalkıyor, Defne'ye bakıyor.
*Ton:* Sakin görünmeye çalışıyor; alçak, koruyucu, kontrollü. Korkusu belli belirsiz.
```
[trying to sound calm, low and protective] Sen burada dur. [short pause] Bir bakıp geleceğim.
```

### SAHNE 08 · 01:09–01:19 · Boş koridor

**L13 — ARDA** · başlar 1:13.7 · hedef 0.9 sn · en fazla 2.9 sn
*Ekranda:* Koridorun ortasında durmuş, mutfak kapısına bakıyor.
*Ton:* Bağırmadan, temkinli, sesini hafif yükselterek.
```
[cautious, firm, not shouting] Kim var orada?
```
*(Ardından 2 saniyelik sessizlik videoda kendiliğinden var; ayrı dosya olduğu için ekleme yapma.)*

**L14 — ARDA** · başlar 1:16.8 · hedef 2.0 sn · en fazla **2.1 sn**
*Ekranda:* Başını salon kapısına doğru çeviriyor.
*Ton:* Daha kısık, tedirgin, kendinden emin değil.
```
[quietly, uneasy] Defne, sen mi bir şey yaptın?
```

### SAHNE 09 · 01:19–01:29 · "HAREKET ALGILANDI — K2 SALON"

**L15 — ARDA** · başlar 1:25.2 · hedef 0.8 sn · en fazla 1.8 sn
*Ekranda:* Canlı K2'de koltuğun arkasında siluet; Arda'nın gözleri büyüyor.
*Ton:* Fısıltı, inanamama; nefes kesilir gibi.
```
[whispers, in disbelief] Yok artık...
```

**L16 — DEFNE** · başlar 1:27.1 · hedef 1.1 sn · en fazla 1.8 sn
*Ekranda:* Arda koridorda; Defne'nin sesi salondan geliyor.
*Ton:* Başka odaya seslenir gibi, meraklı-endişeli. Normal kaydet; uzaklık efekti betikte eklenir.
```
[calling from another room, worried] Abi? Ne oldu?
```

### SAHNE 10 · 01:29–01:39 · Koltuğun arkasındaki ikinci Defne

**L17 — ARDA** · başlar 1:34.5 · hedef 2.6 sn · en fazla **2.7 sn**
*Ekranda:* Arda donup kalmış, telefona bakıyor.
*Ton:* Boğuk, acil fısıltı, titreyen ses; "Defne..."den sonra kısa es.
```
[urgent whisper, voice trembling] Defne... Sakın hareket etme.
```

**L18 — DEFNE** · başlar 1:37.4 · hedef 1.4 sn · en fazla **1.5 sn**
*Ekranda:* Arda'nın yüzü (Defne salondan sesleniyor).
*Ton:* Şaşkın, huzursuz, salondan seslenir gibi; kısa ve hızlı.
```
[confused, uneasy, calling out] Abi, niye? Ne var?
```

### SAHNE 11 · 01:39–01:49 · Salon kapısında

**L19 — ARDA** · başlar 1:40.1 · hedef 3.0 sn · en fazla **3.0 sn**
*Ekranda:* Arda kapı eşiğinde, Defne'ye bakıyor.
*Ton:* Kontrollü ama korkmuş; kelimeleri tek tek, sakin vermeye çalışıyor; ses hafif titrek.
```
[controlled but scared, voice shaking slightly] Defne, sakince kalk. Bana doğru gel.
```

**L20 — DEFNE** · başlar 1:43.3 · hedef 1.9 sn · en fazla 5.6 sn
*Ekranda:* Defne koltukta tek başına, abisine bakıyor (kapıdan bakış açısı).
*Ton:* Korkmuş, yalvaran, hızlı nefes; sesi kırılıyor.
```
[scared, pleading, breathing fast] Abi, beni korkutma. Ne oluyor?
```

### SAHNE 12 · 01:49–01:59 · Defne kalkar, abisine yürür

**L21 — DEFNE** · başlar 1:50.5 · hedef 1.4 sn · en fazla 3.2 sn
*Ekranda:* Ayağa kalkıp kapıya doğru yürüyor.
*Ton:* Gergin, titrek, ısrarcı; abisine ilk kez adıyla sesleniyor, "Arda" vurgulu.
```
[nervous, shaky, insisting] Arda, bir şey söylesene.
```

**L22 — ARDA** · başlar 1:53.9 · hedef 2.7 sn · en fazla 5.0 sn
*Ekranda:* Kapıda, telefondan gözünü ayırmadan.
*Ton:* Gergin, acil fısıltı; iki cümle arasında kısa es.
```
[tense, urgent whisper] Gözünü arkaya çevirme. [short pause] Gel yanıma.
```

### SAHNE 13 · 01:59–02:09 · Mutfaktan gelen ses

**L23 — İKİNCİ DEFNE** · başlar 2:04.1 · hedef 2.2 sn · en fazla 2.8 sn
*Ekranda:* Aralık mutfak kapısı, karanlık; konuşan görünmüyor.
*Ton:* Çok sakin, yumuşak, yavaş, duygusuz; "Abi..." hafif uzatılmış. Normal kaydet; boğukluk ve yankı betikte eklenir.
```
[very calm, soft, slow, emotionless] Abi... [short pause] Buraya gelsene.
```

**L24 — DEFNE** · başlar 2:07.0 · hedef 1.5 sn · en fazla **1.9 sn**
*Ekranda:* Defne'nin yüzüne yakın plan, dehşet içinde.
*Ton:* Dehşetle fısıltı, titreyen nefes.
```
[terrified whisper, trembling] Abi... Ben buradayım.
```

### SAHNE 14 · 02:09–02:19 · Kapıdaki ikinci Defne

**L25 — ARDA** · başlar 2:10.4 · hedef 1.8 sn · en fazla 3.5 sn
*Ekranda:* İki kardeşin yüzü; Defne abisinin koluna sarılıyor.
*Ton:* Zorlanarak, kısık ve boğuk; ilk "Sen..." boğazda kalıyor, sonra yeniden deniyor.
```
[hoarse, struggling to speak, frightened] Sen... [short pause] Sen kimsin?
```

**L26 — İKİNCİ DEFNE** · başlar 2:14.2 · hedef 2.3 sn · en fazla 4.8 sn
*Ekranda:* Kapı eşiğinde, başını yana yatırıyor; gülümsemiyor; gözlerine yakın plan.
*Ton:* Çok sakin, yavaş, neredeyse tatlı ama boş; soru tonu yumuşak ve tekinsiz.
```
[very calm, slow, eerily gentle] Abi... [short pause] Beni tanımadın mı?
```

### SAHNE 15 · 02:19–02:30 · Final

**L27 — GERÇEK DEFNE** · başlar 2:22.5 · hedef 2.0 sn · en fazla 3.5 sn
*Ekranda:* Telefondaki K1 görüntüsü (iki Defne aynı anda başını Arda'ya çeviriyor), ardından Arda'nın gözleri.
*Ton:* Korkudan titreyen, ağlamaklı, alçak ses; "Abi..."den sonra es.
```
[trembling with fear, on the verge of tears, quiet] Abi... Ben gerçek Defne'yim.
```

**L28 — İKİNCİ DEFNE** · başlar 2:26.2 · hedef 1.1 sn · en fazla 1.7 sn
*Ekranda:* İkinci Defne'nin yüzüne yavaş yaklaşma; gözünü kırpmadan bakıyor.
*Ton:* Sakin, düz, ürpertici; acele yok, vurgu yok.
```
[calm, flat, chilling] Ben de öyle.
```

**L29 — ÇOCUK FISILTISI** · başlar 2:28.0 · hedef 1.4 sn · en fazla 1.8 sn
*Ekranda:* Parazit → bej kâğıtta çocuk çizimi → tam siyah ekran.
*Ton:* Çok hafif, yumuşak, kulağa yakın çocuk fısıltısı; tekinsiz ve sakin. Yankı ve sol kulak yerleşimi betikte eklenir.
```
[whispers softly, eerie] Hangimize inanacaksın?
```

---

## 6. Videoya yerleştirme

1. İndirdiğin dosyaları `L01.mp3 … L29.mp3` (ya da `.wav`) adıyla `KAMERADAKI-IKINCI-KARDES/proje/ses/diyalog/elevenlabs/` klasörüne koy. Eksik kalan replikler mevcut TTS sesiyle kalır.
2. Çalıştır:
   ```
   cd KAMERADAKI-IKINCI-KARDES/proje/araclar
   python3 1_diyalog_uret.py      # ElevenLabs dosyalarını kullanır, dudak senkronunu yeniden hesaplar
   python3 2_ses_mix.py
   node 3_render.js 4
   ```
3. ElevenLabs kayıtlarına betik **fısıltı, titreme veya nefes eklemez**; bu performans sesin kendisinde. Yalnızca oda akustiği eklenir:
   - L16 ve L18: salondan uzak ses
   - L23: kapı arkası boğukluğu ve yankı
   - L26 ve L28: ikinci Defne'nin hafif yankısı ve tekinsiz ikiz katmanı
   - L29: çocuk fısıltısının yankısı
4. `1_diyalog_uret.py` çıktısında `TAŞIYOR!` görürsen o repliği daha kısa bir denemeyle değiştir.
