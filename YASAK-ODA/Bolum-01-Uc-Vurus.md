# YASAK ODA — 1. Bölüm: "ÜÇ VURUŞ"

**Tür:** 2D korku animasyon dizisi · **Süre:** 2 dk 30 sn (150 sn) · **Format:** 1920×1080, 16:9, 24 fps

---

## 0. DEĞİŞTİRİLEBİLİR AYARLAR

Bir şeyi değiştirmek istersen önce burayı değiştir, sonra metinde aynı kelimeyi bul-değiştir yap.

| Ayar | Değer |
|---|---|
| Abi | **EMRE** (15 yaş) |
| Kardeş | **CAN** (9 yaş) |
| Dede | **İSMAİL DEDE** (78 yaş) |
| Anne | **ANNE** (40 yaş, sadece sesi duyulur) |
| Varlık | **O** (sesleri taklit eden şey) |
| Mekân | Karlı bir dağ köyünde, iki katlı eski ahşap ev |
| Zaman | Ocak, sömestr tatili |
| Saat motifi | **03:17** (dizi boyunca her bölümde tekrar edecek) |
| Dedenin kayıp kardeşi | **YUSUF** (fotoğrafta, yüzü kazınmış, 1979) |

---

## 1. KARAKTERLER VE ELEVENLABS SES KİMLİKLERİ

**Tutarlılık kuralı:** Her karakter için ElevenLabs'ta **bir kez** ses oluştur (Voice Design veya Voice Library) ve 30 bölüm boyunca **aynı sesi ve aynı ayarları** kullan. Ayarları değiştirme, yalnızca metindeki duygu etiketlerini değiştir.

| Karakter | Ses tarifi (Voice Design'a yapıştır) | Stability | Similarity | Style |
|---|---|---|---|---|
| **EMRE** | Genç Türk erkek, 15 yaşında, sakin ve koruyucu, hafif kısık, alçak ve net konuşan, İstanbul Türkçesi | 50 | 75 | 20 |
| **CAN** | Küçük Türk erkek çocuk, ince ve tatlı ses, meraklı, korkunca titreyen, hızlı ve nefes nefese konuşan | 40 | 75 | 35 |
| **İSMAİL DEDE** | Yaşlı Türk erkek, 78 yaşında, derin ve pürüzlü ses, yavaş ve ağır konuşan, her cümlenin sonunda kısa bir sessizlik | 60 | 80 | 15 |
| **ANNE** | Türk kadın, 40 yaşında, sıcak ve şefkatli, hafif endişeli | 55 | 75 | 20 |
| **O** | Ayrı ses yok. ANNE ve CAN seslerini kullanır (aşağıdaki "O" notuna bak) | — | — | — |

**"O" (varlık) için ses hilesi:** Varlık, taklit ettiği kişinin **kendi sesiyle** konuşur. Aynı ses ID'sini kullan, sadece:
- Stability'yi **25**'e düşür (ses biraz "yanlış" ve kararsız gelir)
- Kurguda: **-2 yarım ton pitch**, **%92 hız**, hafif reverb, arkasına çok kısık ikinci bir kopya (0.1 sn gecikmeli)

**Model:** `Eleven v3` önerilir, köşeli parantez içindeki duygu etiketlerini anlar (`[whispers]`, `[scared]` vb.).
`Multilingual v2` kullanacaksan köşeli parantezleri **sil**, `…` ve virgülleri bırak.

**Dosya adlandırma (kurguda karışmasın diye):** `B01_R07_DEDE.mp3` → B01 = Bölüm 1, R07 = Replik 7

---

## 2. GÖRSEL STİL REHBERİ

- **Stil:** Gerçekçi oranlı 2D çizim, sinematik ışık, ince film greni, hafif vinyet. Karikatür değil.
- **Renk paleti:**
  - Gece mavisi `#0E1520` · Soğuk gri `#3A4452` · Kar beyazı `#D9DEE5`
  - **Tek sıcak renk:** fener/mum turuncusu `#E8963A`. Güvenli alanları sadece bu ışık aydınlatır.
  - Yasak oda: rengi tamamen soluk, neredeyse siyah-beyaz
- **Kamera dili:** Yavaş zoom'lar, sabit geniş planlar, korku anlarında ani yakın plan
- **Animasyon:** Nefes buharı, titreyen fener ışığı, perdede hafif rüzgâr. Küçük hareketler gerçekçilik katar.
- **Yazı fontu:** Başlık için *Special Elite* veya *Cinzel* (ücretsiz, Google Fonts)

---

## 3. SENARYO (zaman çizelgeli)

### GİRİŞ — 0:00 → 0:12 (12 sn)

**GÖRSEL:** Tamamen siyah ekran.
**SES:** Uğuldayan rüzgâr. Uzaktan, ahşaba **üç yavaş vuruş**: *tak… tak… tak.*

**0:04:** Ekranın ortasında, titreyerek beliren yazı:

> # YASAK ODA

Harfler yavaşça, sanki tırnakla kazınmış gibi çizilir. Sonra bir kez titreyip sabitlenir.

**0:08:** Altında küçük, beyaz yazı:

> **1. BÖLÜM — ÜÇ VURUŞ**

**0:11:** Yazılar karanlığa erir.

---

### SAHNE 1 — VARIŞ · 0:12 → 0:32 (20 sn)

**GÖRSEL:** Dış mekân, alacakaranlık. Karla kaplı dar bir köy yolu. Yolun sonunda iki katlı, kararmış ahşap bir ev. Pencerelerinden yalnızca birinde ışık var. Eski bir araba iki çocuğu bırakıp geri dönüyor, kırmızı stop lambaları sisin içinde kayboluyor.

**EKRAN YAZISI (sol alt, küçük):** *Bir dağ köyü. Ocak.*

**SES:** Karda ayak sesleri, uzaklaşan motor sesi, köpek havlaması.

| # | Karakter | Replik (ElevenLabs'a yapıştır) |
|---|---|---|
| R01 | ANNE *(arabadan, uzaktan)* | `[warmly] Sadece bir hafta, söz. Dedenizi üzmeyin, tamam mı?` |

**GÖRSEL:** Çocuklar sırt çantalarıyla evin önünde. CAN abisinin montunun kolunu tutuyor. Evin karanlık üst kat penceresine bakıyor.

| # | Karakter | Replik |
|---|---|---|
| R02 | CAN | `[whispers] Abi… bu ev bize bakıyor gibi.` |
| R03 | EMRE | `[sighs] Saçmalama. Sadece eski bir ev.` |

**GÖRSEL:** Kapı gıcırdayarak açılır. Elinde gaz lambasıyla İSMAİL DEDE. Boynunda, ipe geçirilmiş **paslı büyük bir anahtar.** *(Bu anahtarı net göster. Sahne 4'te önemli.)*

| # | Karakter | Replik |
|---|---|---|
| R04 | İSMAİL DEDE | `Hoş geldiniz evlatlar. İçeri girin… hava kararıyor.` |

---

### SAHNE 2 — KURAL · 0:32 → 0:58 (26 sn)

**GÖRSEL:** İç mekân. Dar, uzun bir koridor. Dede önde, gaz lambası duvarlarda sallanan gölgeler yapıyor. Duvarda eski kilim, durmuş bir duvar saati. Akrep ve yelkovan **03:17**'de takılı kalmış.

**SES:** Döşeme tahtalarının gıcırtısı, lambanın cızırtısı.

| # | Karakter | Replik |
|---|---|---|
| R05 | İSMAİL DEDE | `Burası mutfak. Şurası benim odam. Sizin odanız da merdivenin yanında.` |

**GÖRSEL:** Kamera koridorun sonuna kayar. Lamba ışığının zar zor ulaştığı yerde, diğerlerinden daha koyu bir kapı. Üzerinde **ağır bir asma kilit**, ahşapta tırnak izine benzeyen çizikler. CAN parmağıyla gösteriyor.

| # | Karakter | Replik |
|---|---|---|
| R06 | CAN | `[curious] Dede, şu kapı neden kilitli?` |

**GÖRSEL:** Dede duruyor. Yavaşça döner. Yakın plan: yüzünün yarısı lambanın ışığında, yarısı karanlıkta. Eli istemsizce boynundaki anahtara gidiyor.

| # | Karakter | Replik |
|---|---|---|
| R07 | İSMAİL DEDE | `[serious] Bu evde tek bir kuralım var. Koridorun sonundaki odaya… asla girmeyeceksiniz.` |
| R08 | EMRE | `İçinde ne var ki?` |
| R09 | İSMAİL DEDE | `[pause] Hiçbir şey. Öyle kalsın diye kilitli.` |

**GÖRSEL:** Dede eğilir, iki çocuğun gözlerine tek tek bakar.

| # | Karakter | Replik |
|---|---|---|
| R10 | İSMAİL DEDE | `[whispers] Bir de… o kapı çalarsa, sakın açmayın.` |

**GÖRSEL:** Lamba bir an söner gibi olur, sonra yanar. Kesme.

---

### SAHNE 3 — ÜÇ VURUŞ · 0:58 → 1:28 (30 sn)

**GÖRSEL:** Çocukların yatak odası, gece. Pencereden giren soğuk mavi ay ışığı. İki ayrı demir yatak. Kardeşler yorganların altında. Komodindeki eski çalar saat: **03:17**.

**SES:** Derin sessizlik… sonra koridorun sonundan: **tak… tak… tak.**

**GÖRSEL:** CAN'ın gözleri karanlıkta açılır.

| # | Karakter | Replik |
|---|---|---|
| R11 | CAN | `[whispers] [scared] Abi… uyuyor musun? Biri kapıyı çalıyor.` |
| R12 | EMRE | `[sleepy] Rüzgârdır Can. Uyu hadi.` |

**SES:** Vuruşlar tekrar gelir. Bu sefer **daha yakın**, sanki koridorun ortasından: **TAK. TAK. TAK.**

**GÖRSEL:** EMRE'nin gözleri açılır. Kapının altındaki aralıktan bir gölge geçer.

| # | Karakter | Replik |
|---|---|---|
| R13 | O *(ANNE sesiyle, boğuk, duvarın ardından)* | `[whispers] Can… kapıyı aç oğlum. Benim… annen.` |

**GÖRSEL:** CAN sevinçle doğrulur, yorganı atmak üzere.

| # | Karakter | Replik |
|---|---|---|
| R14 | CAN | `[excited] Abi! Annem… annem gelmiş!` |

**GÖRSEL:** EMRE hızla uzanıp CAN'ın bileğini yakalar. Yakın plan: EMRE'nin yüzü bembeyaz.

| # | Karakter | Replik |
|---|---|---|
| R15 | EMRE | `[tense whisper] Annem şehirde, Can. Arabanın gittiğini kendi gözümüzle gördük.` |
| R16 | EMRE | `[whispers] Yorganın altına gir. Ne duyarsan duy… kalkma.` |

**SES:** Koridorda ağır ve yavaş uzaklaşan ayak sesleri. Sonra sessizlik.

---

### SAHNE 4 — ANAHTAR · 1:28 → 1:50 (22 sn)

**GÖRSEL:** EMRE elinde telefon fenerleriyle koridorda. Nefesi buhar yapıyor (ev çok soğumuş). Dedenin kapısını yavaşça aralar. Dede sırtüstü uyuyor, ağzı hafif açık.

**SES:** Dedenin ağır, hırıltılı nefesi.

| # | Karakter | Replik |
|---|---|---|
| R17 | EMRE | `[whispers] Dede… dede, uyan.` |

**GÖRSEL:** Dede uyanmıyor. Fener ışığı dedenin boynuna kayar. **İp orada, ama anahtar yok.** İpin ucu kopmuş gibi.

| # | Karakter | Replik |
|---|---|---|
| R18 | EMRE | `[scared whisper] Anahtar… anahtar nerede?` |

**GÖRSEL:** EMRE koridora döner. Fener ışığı koridorun sonuna ulaşır. **Asma kilit yerde yatıyor.** Yasak odanın kapısı **bir parmak aralık.** Aralıktan içeri karanlık değil, soluk gri bir ışık sızıyor.

**SES:** Derin, alçak bir uğultu (drone) başlar ve sahne sonuna kadar yükselir.

---

### SAHNE 5 — YASAK ODA · 1:50 → 2:20 (30 sn)

**GÖRSEL:** EMRE hızla yatak odasına geri döner. **CAN'ın yatağı boş.** Yorgan yere atılmış.

| # | Karakter | Replik |
|---|---|---|
| R19 | O *(CAN sesiyle, yasak odadan)* | `Abi! Gel… buraya gel. Burada biri var… seni tanıyor.` |

**GÖRSEL:** EMRE koridorun sonuna yürür. Kamera arkasından takip eder (omuz üstü çekim). Kapıyı iter. Gıcırtı.

**GÖRSEL — ODANIN İÇİ (renkler solar, neredeyse siyah-beyaz):**
- Duvarlar baştan aşağı **eski siyah-beyaz fotoğraflarla** kaplı.
- Yakın plan: tek bir fotoğraf. **İki küçük erkek kardeş**, kolkola. Altında el yazısıyla: *"İsmail ve Yusuf — 1979"*. Küçük olanın **yüzü tırnakla kazınmış.**
- Odanın köşesinde, duvara dönük duran küçük bir siluet. **CAN'ın pijaması.** Kıpırdamıyor.

| # | Karakter | Replik |
|---|---|---|
| R20 | EMRE | `[relieved, then angry] Can! Ne işin var burada? Hadi, çık dışarı!` |

**GÖRSEL:** Siluet kıpırdamıyor. 2 saniye sessizlik.

**SES:** Uğultu aniden kesilir. Mutlak sessizlik.

**SES (EMRE'NİN ARKASINDAN, koridordan):**

| # | Karakter | Replik |
|---|---|---|
| R21 | CAN *(gerçek CAN, uykulu, koridordan)* | `[sleepy, confused] Abi…? Kiminle konuşuyorsun?` |

**GÖRSEL:** EMRE donar. Yakın plan: gözleri. Yavaşça köşeye bakar.
Köşedeki siluet, **başını yavaş yavaş, olması gerekenden fazla** çevirmeye başlıyor…

**KESME (2:18):** Kapı **BAM!** diye kapanır. Ekran anında siyah.

---

### FİNAL — 2:20 → 2:30 (10 sn)

**GÖRSEL:** Tamamen siyah ekran.

**SES:** 1 saniye sessizlik. Sonra çok yakından, sol kulakta (stereo sol kanal) bir fısıltı:

| # | Karakter | Replik |
|---|---|---|
| R22 | O *(CAN sesiyle, fısıltı)* | `[whispers] Sıra sende… abi.` |

**2:23:** Siyah ekranın ortasında, yavaşça beliren beyaz yazı:

> ### DEVAM EDECEK...

**SES:** Çok uzaktan, son kez: **tak… tak… tak.**

**2:30:** Yazı karanlığa erir. Bitiş.

---

## 4. SÜRE KONTROL TABLOSU

| Bölüm | Başlangıç | Bitiş | Süre |
|---|---|---|---|
| Giriş (başlık + 1. Bölüm) | 0:00 | 0:12 | 12 sn |
| Sahne 1: Varış | 0:12 | 0:32 | 20 sn |
| Sahne 2: Kural | 0:32 | 0:58 | 26 sn |
| Sahne 3: Üç Vuruş | 0:58 | 1:28 | 30 sn |
| Sahne 4: Anahtar | 1:28 | 1:50 | 22 sn |
| Sahne 5: Yasak Oda | 1:50 | 2:20 | 30 sn |
| Final: Devam Edecek | 2:20 | 2:30 | 10 sn |
| **TOPLAM** | | | **150 sn = 2:30** |

Toplam ~150 kelime diyalog var, yaklaşık 65–70 sn konuşmaya denk geliyor. Geri kalanı sessizlik, ses efekti ve görsel gerilim. Korkuda sessizlik en güçlü araçtır.

---

## 5. ELEVENLABS İÇİN SADECE DİYALOGLAR (hızlı kopyala)

```
R01 | ANNE        | [warmly] Sadece bir hafta, söz. Dedenizi üzmeyin, tamam mı?
R02 | CAN         | [whispers] Abi… bu ev bize bakıyor gibi.
R03 | EMRE        | [sighs] Saçmalama. Sadece eski bir ev.
R04 | DEDE        | Hoş geldiniz evlatlar. İçeri girin… hava kararıyor.
R05 | DEDE        | Burası mutfak. Şurası benim odam. Sizin odanız da merdivenin yanında.
R06 | CAN         | [curious] Dede, şu kapı neden kilitli?
R07 | DEDE        | [serious] Bu evde tek bir kuralım var. Koridorun sonundaki odaya… asla girmeyeceksiniz.
R08 | EMRE        | İçinde ne var ki?
R09 | DEDE        | [pause] Hiçbir şey. Öyle kalsın diye kilitli.
R10 | DEDE        | [whispers] Bir de… o kapı çalarsa, sakın açmayın.
R11 | CAN         | [whispers] [scared] Abi… uyuyor musun? Biri kapıyı çalıyor.
R12 | EMRE        | [sleepy] Rüzgârdır Can. Uyu hadi.
R13 | O (ANNE)    | [whispers] Can… kapıyı aç oğlum. Benim… annen.
R14 | CAN         | [excited] Abi! Annem… annem gelmiş!
R15 | EMRE        | [tense whisper] Annem şehirde, Can. Arabanın gittiğini kendi gözümüzle gördük.
R16 | EMRE        | [whispers] Yorganın altına gir. Ne duyarsan duy… kalkma.
R17 | EMRE        | [whispers] Dede… dede, uyan.
R18 | EMRE        | [scared whisper] Anahtar… anahtar nerede?
R19 | O (CAN)     | Abi! Gel… buraya gel. Burada biri var… seni tanıyor.
R20 | EMRE        | [relieved, then angry] Can! Ne işin var burada? Hadi, çık dışarı!
R21 | CAN         | [sleepy, confused] Abi…? Kiminle konuşuyorsun?
R22 | O (CAN)     | [whispers] Sıra sende… abi.
```

---

## 6. SES EFEKTLERİ LİSTESİ (SFX)

| Zaman | Efekt |
|---|---|
| 0:00 | Rüzgâr uğultusu (döngü) |
| 0:01 / 2:27 | Ahşaba 3 yavaş vuruş (aynı kayıt, dizinin imza sesi) |
| 0:12 | Karda ayak sesi, uzaklaşan araba, uzak köpek |
| 0:28 | Gıcırdayan ahşap kapı |
| 0:32 | Döşeme gıcırtısı, gaz lambası cızırtısı |
| 0:58 | Saat tik-takı (çok kısık) |
| 1:05 | 3 sert vuruş (daha yakın, daha yüksek) |
| 1:24 | Koridorda uzaklaşan ağır ayak sesleri |
| 1:28 | Yaşlı adam hırıltılı nefesi |
| 1:42 | Alçak drone/uğultu başlar, yükselir |
| 2:10 | Uğultu aniden kesilir (mutlak sessizlik) |
| 2:18 | Kapı çarpması (BAM) |

---

## 7. DİZİ DEVAMLILIĞI İÇİN TOHUMLAR (sonraki bölümlerde kullan)

- **03:17:** Koridordaki durmuş saat. Her bölümde olaylar bu saatte başlar.
- **Yusuf:** Dedenin 1979'da o odada kaybolan küçük kardeşi. Dizinin ana sırrı.
- **Kazınmış yüz:** Varlık, aldığı kardeşin yüzünü fotoğraflardan siler.
- **Üç vuruş:** Varlığın imzası. Dizinin müzikal motifi olabilir.
- **"Sıra sende":** Her kuşakta bir kardeş. Bu sefer sıra Emre ile Can'da.
- **Dede gerçekten uyuyor muydu?** 2. Bölüm buradan açılabilir.
