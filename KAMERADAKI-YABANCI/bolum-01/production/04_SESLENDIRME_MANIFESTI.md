# 04 · Seslendirme Manifesti (ElevenLabs)
> Bu dosya `npm run prompts` ile `src/data/` içinden otomatik üretilir. Elle düzenlemeyin; kaynağı düzenleyin.

- Model: **eleven_v3** (ses etiketleri desteklenir). Etiket desteklemeyen modelde (ör. eleven_multilingual_v2) etiketleri silin, "Yönerge" sütununu oyunculuk notu olarak kullanın.
- Her karakter **tüm bölümlerde aynı voice ID** ile seslendirilir → `production/voices.json`.
- Her replik ayrı dosya: `public/audio/voice/<ID>.mp3`. Otomatik üretim: `npm run voices` (harf zamanlamalı `.align.json` da kaydedilir → dudak senkronu).
- Replik "En fazla" süresini aşarsa `npm run validate` hata verir; hızı (speed) artırın veya yeniden üretin. Sahne süreleri DEĞİŞMEZ.
- Yabancının sesi: robotik/pitch/canavar efekti YOK. Temiz, kuru, çok yakın mikrofon.

## Ses ayarları (sabit)
| Karakter | Env anahtarı | Stability | Similarity | Style | Speed |
|---|---|---|---|---|---|
| KEREM | `VOICE_ID_KEREM` | 0.5 | 0.8 | 0.2 | 0.96 |
| DEFNE | `VOICE_ID_DEFNE` | 0.45 | 0.8 | 0.3 | 0.95 |
| YABANCI | `VOICE_ID_YABANCI` | 0.7 | 0.85 | 0.1 | 0.9 |

## Replikler
| Dosya | Başlangıç | En fazla | Karakter | eleven_v3 metni | Yönerge |
|---|---|---|---|---|---|
| `E01_S03_L01_KEREM.mp3` | 00:12.4 | 2.3 sn | KEREM | [tired] [softly] Defne, yine mi uyuyamadın? | Sakin, yorgun ve meraklı. Acele etmeden. |
| `E01_S03_L02_DEFNE.mp3` | 00:14.9 | 2.95 sn | DEFNE | [scared] [whispers] Abi, yemin ederim... odamda biri vardı. | Korkulu, biraz titreyen fısıltı. '...' sonrası kısa nefes. |
| `E01_S04_L01_KEREM.mp3` | 00:18.5 | 3 sn | KEREM | [reassuring] Bak, kamerayı açtım. Bir şey varsa göreceğiz. | Koruyucu, kendinden emin, yumuşak. |
| `E01_S04_L02_DEFNE.mp3` | 00:22.0 | 2.6 sn | DEFNE | [whispers] [nervous] Ya gördüğümüz şey insan değilse? | Çok alçak ve tedirgin. |
| `E01_S05_L01_DEFNE.mp3` | 00:26.0 | 1.5 sn | DEFNE | [whispers] [scared] Abi... duydun mu? | Fısıltı. 'Abi'den sonra durur. |
| `E01_S05_L02_KEREM.mp3` | 00:28.5 | 1.9 sn | KEREM | [whispers] [serious] Evet. Koridordan geldi. | Alçak sesle, dikkatle dinleyerek. |
| `E01_S06_L01_DEFNE.mp3` | 00:32.3 | 2 sn | DEFNE | [shocked] Abi! Kamera hareket algıladı! | İrkilmiş, ani; bağırmadan yükselen ses. |
| `E01_S06_L02_KEREM.mp3` | 00:34.9 | 2.6 sn | KEREM | [serious] Bir dakika... görüntüyü açıyorum. | Ciddi, odaklı; '...' sonrası telefona dokunur. |
| `E01_S07_L01_DEFNE.mp3` | 00:39.0 | 2.7 sn | DEFNE | [scared] [breathless] Abi... yatağımın yanında biri duruyor! | Fısıltıyla başlar, sona doğru korkuyla kırılır. |
| `E01_S07_L02_KEREM.mp3` | 00:42.2 | 2.4 sn | KEREM | [stunned] Kapı kilitliydi. Nasıl girmiş? | Şaşkın, ciddi, alçak. |
| `E01_S08_L01_DEFNE.mp3` | 00:46.0 | 1.8 sn | DEFNE | [pleading] [scared] Kerem, ne olur gitme! | Panik, yalvaran; ses kısık kalır. |
| `E01_S08_L02_KEREM.mp3` | 00:48.3 | 3.1 sn | KEREM | [calm] [determined] Seni burada bırakamam. Birlikte bakacağız. | Sakin görünmeye çalışan kararlı ses. |
| `E01_S09_L01_DEFNE.mp3` | 00:53.4 | 2.6 sn | DEFNE | [whispers] [trembling] Kapının önünde bir gölge gördüm... | Fısıltı, titrek. |
| `E01_S09_L02_KEREM.mp3` | 00:56.5 | 2.2 sn | KEREM | [whispers] [firm] Bana yakın dur. Sakın ayrılma. | Kararlı ama alçak; korkuyu bastırıyor. |
| `E01_S10_L01_KEREM.mp3` | 01:01.1 | 2.2 sn | KEREM | [confused] [quietly] Kimse yok... Her yer kapalı. | Şaşkın; '...' sonrası etrafına bakar. |
| `E01_S10_L02_DEFNE.mp3` | 01:03.6 | 2.2 sn | DEFNE | [trembling] [scared] Ama telefonda hâlâ görünüyor! | Sesi titreyerek, yükselmeden. |
| `E01_S11_L01_DEFNE.mp3` | 01:07.2 | 1.9 sn | DEFNE | [shouts] [terrified] Abi! Adam tam arkanda! | Korkuyla yükselen ses; çığlık değil. |
| `E01_S11_L02_KEREM.mp3` | 01:09.9 | 2.8 sn | KEREM | [shocked] [breathless] Ne?!... Hayır, burada kimse yok! | İrkilerek döner; nefes nefese. |
| `E01_S12_L01_KEREM.mp3` | 01:15.6 | 1.9 sn | KEREM | [unsure] [quietly] Belki eski bir kayıttır. | Kendini ikna etmeye çalışan alçak ses. |
| `E01_S12_L02_DEFNE.mp3` | 01:17.9 | 2.8 sn | DEFNE | [scared] [whispers] Hayır abi... bak, şimdi hareket etti! | Korku içinde; son kelime keskin. |
| `E01_S13_L01_KEREM.mp3` | 01:21.4 | 2.2 sn | KEREM | [hurried] Fişini çekiyorum. Pil de yok. | Aceleci ama kontrollü. |
| `E01_S13_L02_DEFNE.mp3` | 01:23.9 | 1.6 sn | DEFNE | [panicked] [whispers] Tamam... çabuk ol! | Panik, fısıltı. |
| `E01_S14_L01_KEREM.mp3` | 01:28.6 | 2 sn | KEREM | [tense] [disbelief] Nasıl olur? Kamera kapandı! | Gerilen ses, inanamayan. |
| `E01_S14_L02_DEFNE.mp3` | 01:31.0 | 2.6 sn | DEFNE | [whispers] [terrified] Abi... görüntü hâlâ devam ediyor. | Neredeyse duyulmayan fısıltı. |
| `E01_S15_L01_DEFNE.mp3` | 01:35.1 | 2.2 sn | DEFNE | [confused] [scared] İkinci kamera mı? Sen mi taktın? | Şaşkın, kısık. |
| `E01_S15_L02_KEREM.mp3` | 01:37.6 | 2.2 sn | KEREM | [quietly] [slowly] Hayır... evde başka kamera yok. | Giderek alçalan ses; son kelime neredeyse fısıltı. |
| `E01_S16_L01_DEFNE.mp3` | 01:40.6 | 2.3 sn | DEFNE | [terrified] [whispers] Abi... şimdi koridorda duruyor! | Dehşet, nefes nefese fısıltı. |
| `E01_S16_L02_KEREM.mp3` | 01:44.3 | 1.9 sn | KEREM | [firm] [urgent] Bakma ona. Kapıyı kapat! | Kısa, kararlı, alçak. |
| `E01_S17_L01_DEFNE.mp3` | 01:48.6 | 1.9 sn | DEFNE | [whispers] [terrified] Abi... kapı kolu dönüyor! | Titrek fısıltı. |
| `E01_S17_L02_KEREM.mp3` | 01:51.0 | 2.4 sn | KEREM | [whispers] Sessiz ol... sakın kıpırdama. | Fısıltı; kelimeler arasında nefes. |
| `E01_S18_L01_DEFNE.mp3` | 01:54.0 | 2.95 sn | DEFNE | [shocked] [whispers] [trembling] Abi... bizi arkadan kim çekiyor? | Şok, titrek ve çok alçak; son kelimelerde nefesi kesilir. |
| `E01_S18_L02_YABANCI.mp3` | 01:57.0 | 1.45 sn | YABANCI | [whispers] [calm] Sakın dönmeyin. | Çok sakin, çok yakın; doğal ve ürpertici erkek fısıltısı. Efekt YOK. |
