# KARA TAHTA — 1. Bölüm: "KİMSE YAZMADI"

**Tür:** 2D korku animasyon dizisi · **Süre:** 2 dk (120 sn) · **Format:** 1920×1080, 16:9, 24 fps
**Tahtadaki sayı:** **15**
**Dizi rehberi:** `Dizi-Rehberi.md` (15 bölümün başlıkları ve ana sır)

---

## 0. DEĞİŞTİRİLEBİLİR AYARLAR

Bir şeyi değiştirmek istersen önce burayı değiştir, sonra metinde aynı kelimeyi bul-değiştir yap.

| Ayar | Değer |
|---|---|
| Ana karakter | **ZEYNEP** (12 yaş) |
| En yakın arkadaş | **MERT** (12 yaş) |
| Hizmetli | **HASAN AMCA** (50 yaş, 1989'da 7-B öğrencisi) |
| Öğretmen | **NURAY ÖĞRETMEN** (35 yaş) |
| Kayıp çocuk | **SERKAN** (bu bölümde sadece fısıltısı duyulur) |
| Okul | **AKÇAKAVAK ORTAOKULU** (hayali), kasabada eski taş bina |
| Sınıf | **7-B**, ikinci katta, koridorun en sonunda |
| Zaman | Ocak, yağmurlu. 1989'dan 37 yıl sonra |
| Kritik sıra | Son sıra, pencere kenarı. **Zeynep'in sırası = 1989'da Serkan'ın sırası** |

---

## 1. KARAKTERLER VE ELEVENLABS SES KİMLİKLERİ

**Tutarlılık kuralı:** Her karakter için ElevenLabs'ta **bir kez** ses oluştur (Voice Design veya Voice Library) ve 15 bölüm boyunca **aynı sesi ve aynı ayarları** kullan. Ayarları değiştirme, sadece metindeki duygu etiketlerini değiştir.

| Karakter | Ses tarifi (Voice Design'a yapıştır) | Stability | Similarity | Style |
|---|---|---|---|---|
| **ZEYNEP** | Türk kız çocuk, 12 yaşında, zeki ve meraklı, yumuşak ama net ses, korkunca nefesi hızlanan, İstanbul Türkçesi | 45 | 75 | 30 |
| **MERT** | Türk erkek çocuk, 12 yaşında, neşeli ve şakacı, hızlı konuşan, sesi hafif çatallanmaya başlamış | 45 | 75 | 35 |
| **HASAN AMCA** | Türk erkek, 50 yaşında, kalın, yorgun ve hafif boğuk ses, az ve alçak sesle konuşan, cümle aralarında duraksayan | 55 | 80 | 20 |
| **NURAY ÖĞRETMEN** | Türk kadın, 35 yaşında, otoriter ama yorgun, net diksiyonlu öğretmen sesi | 60 | 75 | 15 |
| **SERKAN** | Türk erkek çocuk, 12 yaşında, çok yumuşak ve hüzünlü, uzaktan geliyormuş gibi fısıltılı ses | 30 | 75 | 40 |

**SERKAN için kurgu efekti (dizinin her bölümünde aynı):**
- Hafif reverb (küçük, boş bir oda hissi)
- Alçak geçiren filtre (sanki bir duvarın ardından geliyormuş gibi)
- %95 hız
- Fısıltıları **sol kanaldan** ver (izleyicinin kulağına çok yakından)

**Model:** `Eleven v3` önerilir. Köşeli parantez içindeki duygu etiketlerini anlar (`[whispers]`, `[scared]` vb.).
`Multilingual v2` kullanacaksan köşeli parantezleri **sil**, `…` ve virgülleri bırak.

**Dosya adlandırma:** `KT01_R07_HASAN.mp3` → KT01 = Kara Tahta 1. Bölüm, R07 = 7. replik

---

## 2. GÖRSEL STİL REHBERİ

- **Stil:** Gerçekçi oranlı 2D çizim, sinematik ışık, ince film greni, hafif vinyet. Karikatür değil.
- **Renk paleti:**
  - Yağmur grisi `#2B3138` · Tahta yeşili-siyahı `#1E2A24` · Soluk floresan `#C9D6C2`
  - **Dizinin imza rengi:** tebeşir beyazı `#ECEBE4`. Ekrandaki en parlak şey her zaman tebeşirdir.
  - **Tek sıcak renk:** Hasan Amca'nın odasındaki ampul `#D9A441` (bu bölümde görünmüyor)
- **Kamera dili:**
  - Tahtaya yavaş yaklaşma (push-in)
  - Sınıfın arka köşesinden sabit geniş plan. Bu plan **Serkan'ın bakış açısıdır**, izleyici fark etmeden "son sıradan" bakar.
  - Koridorda uzun ve simetrik planlar
  - Korku anlarında ani yakın plan
- **Animasyon:** Camdan süzülen yağmur damlaları, havada süzülen tebeşir tozu, yanıp sönen floresan lamba. Küçük hareketler gerçekçilik katar.
- **Yazı fontu:** Başlıklar tebeşir yazısı gibi: *Cabin Sketch* veya *Rock Salt* (ücretsiz, Google Fonts)

---

## 3. SENARYO (zaman çizelgeli)

### GİRİŞ — 0:00 → 0:10 (10 sn)

**GÖRSEL:** Siyah ekran. Yavaşça koyu yeşil-siyah bir tahta yüzeyi belirir. Üzerinde eski, silinmiş yazıların gri hayaletleri var.
**SES:** Uzaktan yağmur. Sonra çok yakından, tebeşirin tahtaya sürtünmesi: uzun ve yavaş bir gıcırtı.

**0:03:** Görünmeyen bir el tebeşirle yazıyor. Harfler tek tek, hafif eğri, çocuk yazısı gibi çıkıyor. Tebeşir tozu aşağı dökülüyor:

> # KARA TAHTA

**0:07:** Altında daha küçük:

> **1. BÖLÜM — KİMSE YAZMADI**

**SES:** Son harften sonra tebeşirin tahtaya vurduğu tek bir **"tık"** (dizinin imza sesi).

**0:09:** Bir sünger darbesiyle yazılar silinir. Siyaha geçiş.

---

### SAHNE 1 — SABAH · 0:10 → 0:32 (22 sn)

**GÖRSEL:** Dış mekân, sabah, yağmur. İki katlı, taş duvarlı eski okul binası. Yanında iskeleli, yarım kalmış yeni bir beton bina ve hareketsiz bir vinç *(8. bölümdeki yıkım için tohum, net göster)*. Bahçe boş, su birikintileri var. İki çocuk tek bir şemsiyenin altında koşarak kapıdan giriyor.

**EKRAN YAZISI (sol alt, küçük):** *Akçakavak Ortaokulu. Ocak.*

**GÖRSEL:** İç mekân, ikinci kat koridoru. Uzun ve simetrik. Floresan lambalardan biri yanıp sönüyor. Duvarda eski sınıf fotoğrafları asılı. Kamera birinin önünden hızlıca geçer, altında "1989" yazıyor *(7. bölüm için tohum)*. ZEYNEP ve MERT yürüyor, ıslak ayakkabıların gıcırtısı duyuluyor.

| # | Karakter | Replik (ElevenLabs'a yapıştır) |
|---|---|---|
| R01 | MERT | `[cheerful, out of breath] Söylemiştim! Bu saatte okulda bizden başka kimse olmaz.` |

**GÖRSEL:** Koridorun sonunda 7-B kapısı. MERT kapıyı açar. Sınıf karanlık, ışıklar kapalı, pencereden gri sabah ışığı giriyor. Kamera yavaşça tahtaya yaklaşır.
Tahtanın ortasında, büyük, eğri bir çocuk yazısıyla:

> ## 15

Tebeşir tozu hâlâ oluğa dökülüyor gibi. Tahtanın sağ alt köşesinde **küçük, tebeşirli bir el izi** var. 12 yaşındaki bir çocuğun elinden de küçük.

| # | Karakter | Replik |
|---|---|---|
| R02 | ZEYNEP | `[quiet, surprised] Biri bizden önce gelmiş…` |
| R03 | MERT | `[laughs] On beş mi? Neyin on beşi bu ya?` |
| R04 | ZEYNEP | `[uneasy] Yazıya bak Mert. Sanki… küçük bir çocuk yazmış.` |

---

### SAHNE 2 — KİM YAZDI? · 0:32 → 0:54 (22 sn)

**SES:** Eski elektrikli okul zili: uzun, metalik bir "zırrrr".

**GÖRSEL:** Sınıf dolu, soğuk floresan ışıklar yanıyor. NURAY ÖĞRETMEN elinde yoklama defteriyle giriyor. Kapıda durup tahtaya bakıyor.

| # | Karakter | Replik |
|---|---|---|
| R05 | NURAY ÖĞRETMEN | `[stern] Günaydın. Bunu tahtaya kim yazdı?` |

**GÖRSEL:** Sessizlik. Sınıfın arka köşesinden geniş plan: bütün kafalar yavaşça MERT'e döner.

| # | Karakter | Replik |
|---|---|---|
| R06 | MERT | `[defensive] Hocam ben değilim, yemin ederim! Biz geldiğimizde vardı.` |
| R07 | NURAY ÖĞRETMEN | `[sighs, tired] Mert… sil şunu da derse başlayalım.` |

**GÖRSEL:** MERT süngerle siler. Sayı kaybolur, geride soluk gri bir iz kalır.
Yakın plan: ZEYNEP son sırada, pencere kenarında oturuyor *(bu sırayı net göster, finalde önemli)*. Gözü izde.

**GÖRSEL:** Kapının camında HASAN AMCA'nın yüzü belirir. Elinde paspas kovası var. Tahtadaki silik ize bakıyor, yüzü bembeyaz. Hiçbir şey demeden çekilip gider. **Bunu sadece ZEYNEP görür.**

---

### SAHNE 3 — TENEFFÜS · 0:54 → 1:22 (28 sn)

**SES:** Teneffüs zili. Koridordaki çocuk sesleri uzaklaşır, sonra sessizlik. Sadece camdaki yağmur.

**GÖRSEL:** Boş sınıf. ZEYNEP geri gelip sırasında unuttuğu su şişesini alıyor. Tahta tertemiz.

**SES:** Arkasından yavaş, uzun bir **tebeşir gıcırtısı**… ve **tık.**

**GÖRSEL:** ZEYNEP donar. Yavaşça döner.

| # | Karakter | Replik |
|---|---|---|
| R08 | ZEYNEP | `[whispers] Mert…? Sen misin?` |

**GÖRSEL:** Tahtada yine büyük bir **15.** Tebeşir tozu hâlâ havada süzülüyor. Oluktaki kısa, sarımsı tebeşir parçası yavaşça yuvarlanıp duruyor.

| # | Karakter | Replik |
|---|---|---|
| R09 | ZEYNEP | `[scared, breathless] Hayır… hayır, az önce sildik…` |

**GÖRSEL:** ZEYNEP geri geri yürür ve birine çarpar. Ani dönüş: HASAN AMCA kapıda duruyor.

| # | Karakter | Replik |
|---|---|---|
| R10 | HASAN AMCA | `[low, tense] Kızım… sen bu sınıfta mı okuyorsun?` |

**GÖRSEL:** ZEYNEP başını sallar. HASAN'ın gözleri tahtaya kayar. Cebinden ıslak bir bez çıkarır, eli titriyor.

| # | Karakter | Replik |
|---|---|---|
| R11 | HASAN AMCA | `[whispers to himself, shaken] On beş… Otuz yedi yıl sonra… yine mi?` |

**GÖRSEL:** HASAN sayıyı hızla siler, ZEYNEP'i omzundan tutup kapıya yönlendirir.

| # | Karakter | Replik |
|---|---|---|
| R12 | HASAN AMCA | `[urgent] Hadi bahçeye çık. Bunu kimseye söyleme. Kimseye.` |

---

### SAHNE 4 — ÇIKIŞ · 1:22 → 1:44 (22 sn)

**GÖRSEL:** Dış mekân, akşamüstü, hava kararıyor, yağmur hafiflemiş. Okul kapısının önünden servisler ayrılıyor. ZEYNEP ile MERT şemsiyenin altında.

| # | Karakter | Replik |
|---|---|---|
| R13 | MERT | `[teasing] Ne yani, şimdi de tahtaya hayalet mi yazıyor?` |
| R14 | ZEYNEP | `[serious] Hasan Amca korktu Mert. Gözlerini görmen lazımdı.` |

**GÖRSEL:** ZEYNEP başını kaldırır. İkinci katın en sondaki penceresi 7-B'nin. Işıklar kapalı. Ama camın arkasında, son sıranın hizasında **küçük bir siluet** ayakta duruyor. Kıpırdamıyor, aşağıya, ZEYNEP'e bakıyor.

| # | Karakter | Replik |
|---|---|---|
| R15 | ZEYNEP | `[whispers] Mert… pencereye bak. Son sırada biri var.` |

**GÖRSEL:** MERT bakar. Kesme, pencere: **boş.**

| # | Karakter | Replik |
|---|---|---|
| R16 | MERT | `[nervous laugh] Zeynep… sınıfın ışıkları kapalı. Orada kimse yok.` |

---

### FİNAL — 1:44 → 2:00 (16 sn)

**GÖRSEL:** 7-B, gece. Zifiri karanlık. Sadece sokak lambasının soluk ışığı ve camdan süzülen yağmurun duvardaki gölgeleri var. Sınıfın ön köşesinden son sıraya doğru sabit geniş plan.

**SES:** Yağmur birden kesilir. Mutlak sessizlik.

**GÖRSEL:** ZEYNEP'in sırasının sandalyesi kendi kendine, yavaşça **geri çekilir.** Gıcırtı. Sandalyenin üstüne ince bir tebeşir tozu dökülür, sanki biri oturmuş gibi.

**SES:** Çok yakından, sol kulakta (stereo sol kanal) bir çocuk fısıltısı:

| # | Karakter | Replik |
|---|---|---|
| R17 | SERKAN *(fısıltı)* | `[whispers, sad, childlike] Orası benim sıram… Zeynep.` |

**1:52:** Siyah ekran. Ortada tebeşirle yazılmış gibi beyaz yazı:

> ### DEVAM EDECEK…

**1:57:** Tek kare, ani kesme (1 sn): Tahtada büyük bir **14.** Tebeşir gıcırtısı ve **tık.**

**2:00:** Siyah. Bitiş.

---

## 4. SÜRE KONTROL TABLOSU

| Bölüm | Başlangıç | Bitiş | Süre |
|---|---|---|---|
| Giriş (başlık + 1. Bölüm) | 0:00 | 0:10 | 10 sn |
| Sahne 1: Sabah | 0:10 | 0:32 | 22 sn |
| Sahne 2: Kim Yazdı? | 0:32 | 0:54 | 22 sn |
| Sahne 3: Teneffüs | 0:54 | 1:22 | 28 sn |
| Sahne 4: Çıkış | 1:22 | 1:44 | 22 sn |
| Final: Devam Edecek | 1:44 | 2:00 | 16 sn |
| **TOPLAM** | | | **120 sn = 2:00** |

Toplam yaklaşık 110 kelime diyalog var (ElevenLabs'ta etiketlerle birlikte ~900 karakter), bu da 45–50 saniyelik konuşma eder. Geri kalan süre sessizlik, ses efekti ve görsel gerilim için.

---

## 5. ELEVENLABS İÇİN SADECE DİYALOGLAR (hızlı kopyala)

```
R01 | MERT        | [cheerful, out of breath] Söylemiştim! Bu saatte okulda bizden başka kimse olmaz.
R02 | ZEYNEP      | [quiet, surprised] Biri bizden önce gelmiş…
R03 | MERT        | [laughs] On beş mi? Neyin on beşi bu ya?
R04 | ZEYNEP      | [uneasy] Yazıya bak Mert. Sanki… küçük bir çocuk yazmış.
R05 | NURAY       | [stern] Günaydın. Bunu tahtaya kim yazdı?
R06 | MERT        | [defensive] Hocam ben değilim, yemin ederim! Biz geldiğimizde vardı.
R07 | NURAY       | [sighs, tired] Mert… sil şunu da derse başlayalım.
R08 | ZEYNEP      | [whispers] Mert…? Sen misin?
R09 | ZEYNEP      | [scared, breathless] Hayır… hayır, az önce sildik…
R10 | HASAN       | [low, tense] Kızım… sen bu sınıfta mı okuyorsun?
R11 | HASAN       | [whispers to himself, shaken] On beş… Otuz yedi yıl sonra… yine mi?
R12 | HASAN       | [urgent] Hadi bahçeye çık. Bunu kimseye söyleme. Kimseye.
R13 | MERT        | [teasing] Ne yani, şimdi de tahtaya hayalet mi yazıyor?
R14 | ZEYNEP      | [serious] Hasan Amca korktu Mert. Gözlerini görmen lazımdı.
R15 | ZEYNEP      | [whispers] Mert… pencereye bak. Son sırada biri var.
R16 | MERT        | [nervous laugh] Zeynep… sınıfın ışıkları kapalı. Orada kimse yok.
R17 | SERKAN      | [whispers, sad, childlike] Orası benim sıram… Zeynep.
```

---

## 6. SES EFEKTLERİ LİSTESİ (SFX)

| Zaman | Efekt |
|---|---|
| 0:00 | Uzak yağmur (döngü, final hariç bölüm boyunca) |
| 0:01 | Uzun, yavaş tebeşir gıcırtısı (dizinin imza sesi) |
| 0:08 | Tebeşirin "tık" sesi (imza sesi) |
| 0:09 | Süngerle silme |
| 0:10 | Şemsiyeye vuran yağmur, koşan ayak sesleri |
| 0:16 | Floresan lamba vızıltısı ve cızırtısı, ıslak ayakkabı gıcırtısı |
| 0:22 | Kapı açılması (eski ahşap) |
| 0:32 | Eski elektrikli okul zili (uzun "zırrrr") |
| 0:35 | Sınıf uğultusu, sonra ani sessizlik |
| 0:46 | Süngerle silme |
| 0:54 | Teneffüs zili, uzaklaşan çocuk sesleri |
| 1:00 | Tebeşir gıcırtısı ve "tık" |
| 1:10 | Ani çarpma ve kısa, sert müzik vuruşu (stinger) |
| 1:22 | Servis motorları, ıslak asfalt |
| 1:36 | Alçak drone başlar, pencere kesmesinde kesilir |
| 1:44 | Yağmur birden kesilir: mutlak sessizlik |
| 1:47 | Sandalyenin yerde sürtünme gıcırtısı |
| 1:57 | Tebeşir gıcırtısı ve "tık" |

---

## 7. DİZİ DEVAMLILIĞI İÇİN TOHUMLAR (sonraki bölümlerde kullan)

- **Geri sayım:** Ertesi sabah tahtada **14** var. 2. bölüm bu kareyle açılır.
- **Küçük el izi:** Her bölümde tahtanın sağ alt köşesinde aynı yerde.
- **Hasan Amca'nın "Otuz yedi yıl sonra":** 1989'u ilk kez ima eden replik. Hasan o yılı yaşamış biri.
- **Zeynep'in sırası:** Altında "S.E. 89" kazınmış olacak (3. bölüm).
- **Koridordaki 1989 fotoğrafı:** Bu bölümde sadece bir an görünüyor (7. bölüm).
- **Yarım kalmış yeni bina ve vinç:** Yıkım kararının ilk ipucu (8. bölüm).
- **Oluktaki sarımsı tebeşir:** Hep aynı kısa, eski tip tebeşir. Kimse koymuyor, atılsa da geri geliyor. 15. bölümde Serkan'ın tebeşir kutusundan çıktığı anlaşılır.
- **Pencere siluetini sadece Zeynep görüyor:** Mert ilk kez 2. bölümde kendisi görecek.
