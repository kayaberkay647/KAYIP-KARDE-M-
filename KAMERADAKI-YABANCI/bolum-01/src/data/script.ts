// KAMERADAKİ YABANCI — 1. Bölüm: GECE 03.13
// TEK DOĞRULUK KAYNAĞI: sahne süreleri, diyaloglar, seslendirme yönergeleri, efektler.
// Sahne süreleri senaryodan BİREBİR alınmıştır; değiştirilmez.
// Diyalog `at` değerleri: replik sesinin başladığı an (saniye, bölüm başından).
// `window`: replik için ayrılmış en uzun süre; ElevenLabs çıktısı buna sığmalıdır (validate kontrol eder).

import type { CharacterId } from "./characters";

export type Speaker = Exclude<CharacterId, never>;

export type DialogueLine = {
  id: string; // dosya adı kökü: E01_S03_L01_KEREM
  speaker: Speaker;
  text: string; // ekranda ve seste kullanılan metin (etiketsiz)
  at: number;
  window: number;
  /** ElevenLabs v3 ses etiketleri (metnin başına eklenir). */
  tags: string[];
  /** Etiket desteklemeyen modeller için oyunculuk yönergesi. */
  deliveryTr: string;
  /** Ses konumu: "near" = karakterin yanında; "intimate" = kulağa çok yakın (yabancı). */
  mix?: "room" | "near" | "intimate";
};

export type SfxCue = {
  id: string;
  file: string; // public/audio/sfx/<file>
  at: number; // saniye
  volume: number; // 0..1
  /** ElevenLabs Sound Effects promptu (İngilizce). */
  promptEn: string;
  duration: number; // üretim süresi (sn)
};

export type Scene = {
  n: number;
  title: string;
  start: number;
  end: number;
  visualPromptEn: string;
  cameraTr: string[];
  animationTr: string[];
  dialogue: DialogueLine[];
  sfx: SfxCue[];
};

const L = (
  scene: number,
  idx: number,
  speaker: Speaker,
  text: string,
  at: number,
  window: number,
  tags: string[],
  deliveryTr: string,
  mix: DialogueLine["mix"] = "near",
): DialogueLine => ({
  id: `E01_S${String(scene).padStart(2, "0")}_L${String(idx).padStart(2, "0")}_${speaker.toUpperCase()}`,
  speaker,
  text,
  at,
  window,
  tags,
  deliveryTr,
  mix,
});

const X = (id: string, at: number, volume: number, duration: number, promptEn: string): SfxCue => ({
  id,
  file: `${id}.mp3`,
  at,
  volume,
  duration,
  promptEn,
});

export const SCENES: Scene[] = [
  {
    n: 1,
    title: "GECE KAMERASI",
    start: 0,
    end: 6,
    visualPromptEn:
      "Ultra realistic cinematic 2D anime psychological horror scene. A dark teenage girl's bedroom recorded from a high corner security camera at night. Heavy shadows, dim moonlight, rain outside the window. A tall mysterious man wearing a black hooded coat stands motionless beside an empty bed. His face is completely hidden. A digital timestamp reads 03:13. The stranger slowly turns toward the camera. Professional dark anime film lighting, realistic environmental detail, disturbing atmosphere.",
    cameraTr: ["Geniş açılı güvenlik kamerası (sabit)", "Hafif dijital parazit"],
    animationTr: ["Yabancı hareketsiz durur", "Son iki saniyede (04.0–06.0) başını kameraya çevirir"],
    dialogue: [],
    sfx: [
      X("S01_cctv_static", 0, 0.35, 6, "Quiet security camera digital static hum with faint electrical buzz, low fidelity surveillance audio"),
      X("S01_drone_low", 0, 0.6, 6, "Deep low frequency horror drone, ominous sub bass rumble, slowly swelling, cinematic"),
      X("S01_glitch_cut", 5.75, 0.55, 1, "Short sharp digital video glitch and signal cut"),
    ],
  },
  {
    n: 2,
    title: "DİZİ JENERİĞİ",
    start: 6,
    end: 11,
    visualPromptEn:
      "Professional cinematic psychological horror title sequence. Deep black background, subtle drifting dark smoke, faint security camera static, elegant white horror typography, slow atmospheric title reveal, restrained cinematic animation.",
    cameraTr: ["Yazıya yavaş yaklaşma"],
    animationTr: ["KAMERADAKİ YABANCI yumuşakça belirir", "1. BÖLÜM / GECE 03.13 alt satırda gelir"],
    dialogue: [],
    sfx: [
      X("S02_title_hit", 6.3, 0.85, 4, "Single cinematic horror trailer hit with deep bass boom and long dark reverb tail"),
      X("S02_sub_boom", 8.4, 0.6, 3, "Deep sub bass boom, soft distant impact, dark cinematic"),
    ],
  },
  {
    n: 3,
    title: "KARDEŞLERİN KONUŞMASI",
    start: 11,
    end: 18,
    visualPromptEn:
      "Highly realistic cinematic 2D anime living room at night. Kerem, a 29-year-old man with short dark brown hair, light beard and navy hoodie, sits beside a wooden coffee table. His teenage sister Defne, with wavy chestnut hair and burgundy sweater, sits anxiously on a blue sofa. Soft warm lamp lighting contrasts with cold blue rainy window light. Natural facial expressions, mature realistic anime style, emotional acting.",
    cameraTr: ["Önce geniş plan", "Kerem'in yüzüne yaklaş", "Defne cevap verirken ona geç"],
    animationTr: ["Defne battaniyeye sarılı, uykusuz göz kapakları", "Kerem yorgun, öne eğik"],
    dialogue: [
      L(3, 1, "kerem", "Defne, yine mi uyuyamadın?", 12.4, 2.3, ["tired", "softly"], "Sakin, yorgun ve meraklı. Acele etmeden."),
      L(3, 2, "defne", "Abi, yemin ederim... odamda biri vardı.", 14.9, 2.95, ["scared", "whispers"], "Korkulu, biraz titreyen fısıltı. '...' sonrası kısa nefes."),
    ],
    sfx: [
      X("S03_clock_tick", 11, 0.3, 7, "Old analog wall clock ticking slowly in a quiet room at night"),
      X("S03_fabric_rustle", 14.6, 0.35, 2, "Soft blanket fabric rustle on a fabric sofa, person shifting nervously"),
    ],
  },
  {
    n: 4,
    title: "GÜVENLİK KAMERASI",
    start: 18,
    end: 25,
    visualPromptEn:
      "Realistic cinematic 2D anime dialogue scene. A protective older brother shows a live security camera feed on his smartphone to his frightened teenage sister. The girl looks uncomfortable and nervous. Close-up of their eyes, realistic hand gestures, detailed smartphone reflections, intimate dramatic lighting.",
    cameraTr: ["Kerem'in omzundan telefon ekranı", "Defne'nin yüzüne yakın çekim"],
    animationTr: ["Kerem telefonu Defne'ye uzatır", "Defne huzursuz, gözlerini ekrandan kaçırır"],
    dialogue: [
      L(4, 1, "kerem", "Bak, kamerayı açtım. Bir şey varsa göreceğiz.", 18.5, 3.0, ["reassuring"], "Koruyucu, kendinden emin, yumuşak."),
      L(4, 2, "defne", "Ya gördüğümüz şey insan değilse?", 22.0, 2.6, ["whispers", "nervous"], "Çok alçak ve tedirgin."),
    ],
    sfx: [
      X("S04_phone_tap", 18.3, 0.5, 1, "Two soft fingertip taps on a smartphone glass screen, close up"),
      X("S04_far_creak", 24.2, 0.35, 2, "Distant single wooden floorboard creak in an old house at night"),
    ],
  },
  {
    n: 5,
    title: "KORİDORDAKİ SES",
    start: 25,
    end: 31,
    visualPromptEn:
      "Cinematic realistic 2D anime psychological horror scene. A dark empty hallway seen from a warm living room. The ceiling light flickers softly. Defne suddenly turns her head toward the corridor while Kerem watches her reaction. Deep atmospheric shadows, realistic eye animation, subtle suspense.",
    cameraTr: ["Defne'nin gözlerine yaklaş", "Ardından boş koridora odaklan"],
    animationTr: ["İkisi de sesini alçaltır", "Kerem dikkatle dinler", "Replikler arası bir saniyelik sessizlik"],
    dialogue: [
      L(5, 1, "defne", "Abi... duydun mu?", 26.0, 1.5, ["whispers", "scared"], "Fısıltı. 'Abi'den sonra durur."),
      L(5, 2, "kerem", "Evet. Koridordan geldi.", 28.5, 1.9, ["whispers", "serious"], "Alçak sesle, dikkatle dinleyerek."),
    ],
    sfx: [
      X("S05_floor_creak", 25.25, 0.6, 2, "Slow heavy creak of an old wooden floorboard in a hallway, as if someone stepped on it"),
      X("S05_light_buzz", 28.4, 0.3, 2.6, "Faint flickering fluorescent ceiling light electrical buzz"),
    ],
  },
  {
    n: 6,
    title: "TELEFON UYARISI",
    start: 31,
    end: 38,
    visualPromptEn:
      "Extreme cinematic close-up of a smartphone vibrating on an old wooden table. Realistic 2D anime horror style. A security camera notification appears on screen: \"CAM 01 - HAREKET ALGILANDI - 03:13\". Kerem and Defne stare at the phone with alarm. Realistic screen glow, shocked facial expressions, tense atmosphere.",
    cameraTr: ["Telefona aşırı yakın çekim", "Kerem'in yüzüne geç"],
    animationTr: ["Defne aniden irkilir", "Kerem ciddileşir, telefonu alır"],
    dialogue: [
      L(6, 1, "defne", "Abi! Kamera hareket algıladı!", 32.3, 2.0, ["shocked"], "İrkilmiş, ani; bağırmadan yükselen ses."),
      L(6, 2, "kerem", "Bir dakika... görüntüyü açıyorum.", 34.9, 2.6, ["serious"], "Ciddi, odaklı; '...' sonrası telefona dokunur."),
    ],
    sfx: [
      X("S06_notification", 31.3, 0.7, 1.5, "Short modern smartphone security alert notification chime, two tones"),
      X("S06_vibrate_wood", 31.3, 0.65, 1.5, "Smartphone vibrating loudly on a wooden table surface, two buzzes"),
      X("S06_heartbeat", 35.5, 0.35, 2.5, "Slow muffled heartbeat thumps, low and tense"),
    ],
  },
  {
    n: 7,
    title: "YATAĞIN BAŞINDAKİ YABANCI",
    start: 38,
    end: 45,
    visualPromptEn:
      "Terrifying realistic 2D anime security camera footage displayed on a smartphone. A tall faceless hooded stranger stands motionless next to Defne's bed. Deep blue shadows, slight digital interference, realistic bedroom layout. Cut to Defne's horrified eyes and Kerem's stunned facial reaction. Serious cinematic psychological horror.",
    cameraTr: ["Telefon ekranına yaklaş", "Yabancıyı göster", "Defne'nin yüzüne kes"],
    animationTr: ["Defne'nin nefesi hızlanır", "Kerem'in gözleri büyür"],
    dialogue: [
      L(7, 1, "defne", "Abi... yatağımın yanında biri duruyor!", 39.0, 2.7, ["scared", "breathless"], "Fısıltıyla başlar, sona doğru korkuyla kırılır."),
      L(7, 2, "kerem", "Kapı kilitliydi. Nasıl girmiş?", 42.2, 2.4, ["stunned"], "Şaşkın, ciddi, alçak."),
    ],
    sfx: [
      X("S07_digital_interference", 38, 0.35, 3, "Subtle digital video interference crackle from a phone speaker"),
      X("S07_heartbeat", 41.0, 0.4, 4, "Faster muffled heartbeat, tense, low"),
      X("S07_drone", 38, 0.45, 7, "Low tension horror drone, steady, unsettling"),
    ],
  },
  {
    n: 8,
    title: "ABİNİN KARARI",
    start: 45,
    end: 52,
    visualPromptEn:
      "Realistic cinematic 2D anime dramatic sequence. Kerem stands up quickly from the sofa and moves protectively in front of his frightened younger sister. Defne holds the smartphone with shaking hands. Detailed facial animation, natural body posture, dramatic blue and amber nighttime lighting.",
    cameraTr: ["Kerem'i aşağıdan orta açıyla göster", "Defne'nin korkmuş yüzüne geç", "Kerem'in yüzüne yaklaş"],
    animationTr: ["Defne panik içinde", "Kerem sakin görünmeye çalışır"],
    dialogue: [
      L(8, 1, "defne", "Kerem, ne olur gitme!", 46.0, 1.8, ["pleading", "scared"], "Panik, yalvaran; ses kısık kalır."),
      L(8, 2, "kerem", "Seni burada bırakamam. Birlikte bakacağız.", 48.3, 3.1, ["calm", "determined"], "Sakin görünmeye çalışan kararlı ses."),
    ],
    sfx: [
      X("S08_sofa_stand", 45.05, 0.55, 1.5, "Person standing up quickly from an old fabric sofa, springs creak and fabric rustle"),
      X("S08_footstep", 45.6, 0.45, 1, "Single soft footstep on a wooden floor in socks"),
      X("S08_breath_fast", 46.0, 0.3, 4, "Quiet fast nervous breathing of a teenage girl, close"),
    ],
  },
  {
    n: 9,
    title: "KARANLIK KORİDOR",
    start: 52,
    end: 59,
    visualPromptEn:
      "Realistic 2D anime horror scene of two siblings cautiously walking through a long, narrow corridor at night. Kerem walks ahead while Defne stays close behind him. Flickering ceiling light, old wooden floor, closed bedroom door, cold blue shadows. Natural walking animation, cinematic rear tracking shot.",
    cameraTr: ["Arkadan takip", "Kapıya yavaş yaklaş", "Defne'nin yüzünü göster"],
    animationTr: ["Defne fısıldar", "Kerem kararlıdır ama korkmaktadır"],
    dialogue: [
      L(9, 1, "defne", "Kapının önünde bir gölge gördüm...", 53.4, 2.6, ["whispers", "trembling"], "Fısıltı, titrek."),
      L(9, 2, "kerem", "Bana yakın dur. Sakın ayrılma.", 56.5, 2.2, ["whispers", "firm"], "Kararlı ama alçak; korkuyu bastırıyor."),
    ],
    sfx: [
      X("S09_footsteps", 52, 0.4, 7, "Slow cautious footsteps of two people walking on an old creaky wooden hallway floor"),
      X("S09_light_buzz", 52, 0.3, 7, "Flickering ceiling light electrical buzz with irregular crackles"),
    ],
  },
  {
    n: 10,
    title: "BOŞ ODA",
    start: 59,
    end: 66,
    visualPromptEn:
      "Cinematic realistic 2D anime reveal of a seemingly empty teenage girl's bedroom at night. Kerem slowly opens the bedroom door while Defne watches from behind. The bed is empty, the window is closed and the wall-mounted security camera remains in place. Cold moonlight, realistic interior shadows and unsettling stillness.",
    cameraTr: ["Kapının içinden ileri hareket", "Boş yatağı göster", "Kerem'e yakın çekim"],
    animationTr: ["Kerem şaşkın", "Defne sesi titreyerek konuşur"],
    dialogue: [
      L(10, 1, "kerem", "Kimse yok... Her yer kapalı.", 61.1, 2.2, ["confused", "quietly"], "Şaşkın; '...' sonrası etrafına bakar."),
      L(10, 2, "defne", "Ama telefonda hâlâ görünüyor!", 63.6, 2.2, ["trembling", "scared"], "Sesi titreyerek, yükselmeden."),
    ],
    sfx: [
      X("S10_door_creak", 59.15, 0.65, 2.5, "Old wooden bedroom door slowly creaking open on rusty hinges"),
      X("S10_wind", 60.5, 0.3, 5, "Very faint wind against a closed window at night, soft whistle"),
      X("S10_drone", 59, 0.4, 7, "Low unsettling tension drone, empty room atmosphere"),
    ],
  },
  {
    n: 11,
    title: "ARKASINDAKİ ADAM",
    start: 66,
    end: 74,
    visualPromptEn:
      "Intense realistic 2D anime psychological horror scene. In the physical bedroom, Kerem stands alone with his terrified sister. On the smartphone's live security feed, the tall hooded stranger stands directly behind Kerem. The figure is invisible to the naked eye. Defne watches the screen in terror while Kerem turns around. Cinematic cross-cutting, natural facial reactions, dramatic low light.",
    cameraTr: ["Telefon ekranında yabancıyı göster", "Defne'nin gözlerine yaklaş", "Kerem arkasını dönsün", "Gerçekte kimse olmasın"],
    animationTr: ["Defne korkuyla bağırır", "Kerem aniden döner, nefesi hızlanır"],
    dialogue: [
      L(11, 1, "defne", "Abi! Adam tam arkanda!", 67.2, 1.9, ["shouts", "terrified"], "Korkuyla yükselen ses; çığlık değil."),
      L(11, 2, "kerem", "Ne?!... Hayır, burada kimse yok!", 69.9, 2.8, ["shocked", "breathless"], "İrkilerek döner; nefes nefese."),
    ],
    sfx: [
      X("S11_bass_hit", 66.25, 0.8, 3, "Sudden low bass horror stinger hit, deep and short"),
      X("S11_cloth_turn", 69.45, 0.5, 1, "Fast clothing movement whoosh of a person turning around quickly in a hoodie"),
      X("S11_sharp_breath", 69.55, 0.5, 1.2, "Sharp sudden male inhale of shock, close"),
    ],
  },
  {
    n: 12,
    title: "GÖRÜNTÜ CANLI",
    start: 74,
    end: 81,
    visualPromptEn:
      "Realistic cinematic 2D anime extreme close-up of a smartphone live surveillance feed. The faceless hooded man slowly moves his head toward the camera. The red LIVE label remains visible. Kerem watches the movement in disbelief, while Defne recoils. Subtle digital glitches, eerie lighting and believable reactions.",
    cameraTr: ["Telefon ekranına yavaş zoom", "Yabancının baş hareketini göster", "Kerem'in yüzüne geç"],
    animationTr: ["Kerem kendini ikna etmeye çalışır", "Defne korku içinde konuşur, geri çekilir"],
    dialogue: [
      L(12, 1, "kerem", "Belki eski bir kayıttır.", 75.6, 1.9, ["unsure", "quietly"], "Kendini ikna etmeye çalışan alçak ses."),
      L(12, 2, "defne", "Hayır abi... bak, şimdi hareket etti!", 77.9, 2.8, ["scared", "whispers"], "Korku içinde; son kelime keskin."),
    ],
    sfx: [
      X("S12_digital_hum", 74, 0.4, 7, "Low digital electronic hum from a phone, eerie and steady"),
      X("S12_glitch", 77.6, 0.45, 1.2, "Subtle short video glitch crackle"),
    ],
  },
  {
    n: 13,
    title: "KAMERANIN FİŞİ",
    start: 81,
    end: 87,
    visualPromptEn:
      "Cinematic realistic 2D anime close-up of Kerem reaching toward the security camera power cable mounted on the bedroom wall. Defne stands behind him anxiously. Detailed hands, natural cable movement, realistic shadows and dramatic framing. Kerem firmly disconnects the power plug.",
    cameraTr: ["Kerem'in eline yakın çekim", "Fişe odaklan", "Kameranın ışığının söndüğünü göster"],
    animationTr: ["Kerem aceleci", "Defne panik içinde"],
    dialogue: [
      L(13, 1, "kerem", "Fişini çekiyorum. Pil de yok.", 81.4, 2.2, ["hurried"], "Aceleci ama kontrollü."),
      L(13, 2, "defne", "Tamam... çabuk ol!", 83.9, 1.6, ["panicked", "whispers"], "Panik, fısıltı."),
    ],
    sfx: [
      X("S13_cable", 82.0, 0.45, 2, "Plastic power cable sliding against a painted wall"),
      X("S13_plug_pull", 85.6, 0.75, 1, "Electrical plug firmly pulled out of a wall socket, crisp click"),
      X("S13_hum_cut", 85.6, 0.4, 1.4, "Electrical hum abruptly cutting off into silence"),
    ],
  },
  {
    n: 14,
    title: "İMKÂNSIZ GÖRÜNTÜ",
    start: 87,
    end: 94,
    visualPromptEn:
      "Highly realistic cinematic 2D anime horror scene. The security camera has been unplugged and its power indicator is dark. However, Kerem's smartphone continues displaying an active live bedroom surveillance feed. The mysterious hooded figure remains visible on the phone. Kerem and Defne stare in disbelief, illuminated by the cold phone screen.",
    cameraTr: ["Çekilmiş fişi göster", "Kapanmış kameraya geç", "Telefondaki devam eden görüntüye yaklaş"],
    animationTr: ["Kerem'in sesi gerilir", "Defne neredeyse fısıldar"],
    dialogue: [
      L(14, 1, "kerem", "Nasıl olur? Kamera kapandı!", 88.6, 2.0, ["tense", "disbelief"], "Gerilen ses, inanamayan."),
      L(14, 2, "defne", "Abi... görüntü hâlâ devam ediyor.", 91.0, 2.6, ["whispers", "terrified"], "Neredeyse duyulmayan fısıltı."),
    ],
    sfx: [
      X("S14_digital_hum", 87, 0.4, 7, "Faint impossible digital hum, eerie electronic tone"),
      X("S14_deep_tension", 89.5, 0.55, 4.5, "Deep rising tension sound, dark low frequency swell"),
    ],
  },
  {
    n: 15,
    title: "İKİNCİ KAMERA",
    start: 94,
    end: 100,
    visualPromptEn:
      "Realistic cinematic 2D anime supernatural surveillance scene. The smartphone screen suddenly switches by itself to a new camera feed labeled \"CAM 02 - KORIDOR\". The feed shows the family's dark narrow hallway from an elevated camera angle, although no second camera was installed. Kerem and Defne exchange frightened looks. Detailed smartphone screen, blue nighttime lighting.",
    cameraTr: ["Ekrandaki CAM 02 yazısına yaklaş", "İki karakterin yüzlerini göster"],
    animationTr: ["Defne şaşkın", "Kerem'in sesi giderek alçalır"],
    dialogue: [
      L(15, 1, "defne", "İkinci kamera mı? Sen mi taktın?", 95.1, 2.2, ["confused", "scared"], "Şaşkın, kısık."),
      L(15, 2, "kerem", "Hayır... evde başka kamera yok.", 97.6, 2.2, ["quietly", "slowly"], "Giderek alçalan ses; son kelime neredeyse fısıltı."),
    ],
    sfx: [
      X("S15_switch", 94.35, 0.6, 1, "Single digital camera feed switch blip with short static burst"),
      X("S15_low_freq", 94.5, 0.5, 5.5, "Low frequency tension tone slowly rising"),
    ],
  },
  {
    n: 16,
    title: "KORİDORDAKİ YABANCI",
    start: 100,
    end: 107,
    visualPromptEn:
      "Terrifying realistic cinematic 2D anime scene. A mysterious second security camera feed shows the hooded faceless stranger standing in the hallway outside Defne's bedroom. But when Kerem looks directly into the real hallway, it is empty. The same corridor is shown from two contrasting perspectives, one with the stranger and one without. Strong psychological horror atmosphere.",
    cameraTr: ["Telefon görüntüsünü göster", "Gerçek boş koridora dön", "Tekrar telefona yaklaş"],
    animationTr: ["Defne dehşete kapılmış", "Kerem kısa ve kararlı konuşur"],
    dialogue: [
      L(16, 1, "defne", "Abi... şimdi koridorda duruyor!", 100.6, 2.3, ["terrified", "whispers"], "Dehşet, nefes nefese fısıltı."),
      L(16, 2, "kerem", "Bakma ona. Kapıyı kapat!", 104.3, 1.9, ["firm", "urgent"], "Kısa, kararlı, alçak."),
    ],
    sfx: [
      X("S16_low_tension", 100, 0.45, 7, "Low droning horror tension bed, very dark"),
      X("S16_door_creak", 106.2, 0.6, 1.2, "Short creak of an old wooden door being pushed shut"),
    ],
  },
  {
    n: 17,
    title: "KAPI KOLUNDAKİ HAREKET",
    start: 107,
    end: 114,
    visualPromptEn:
      "Ultra-realistic cinematic 2D anime horror close-up of an old bedroom door handle slowly turning by itself. Kerem and Defne stand frozen inside the dark bedroom. On the smartphone screen, the mysterious hooded stranger appears near the same closed door. Detailed metal reflections, terrified facial expressions, slow camera movement and unbearable suspense.",
    cameraTr: ["Kapı koluna aşırı yakın çekim", "Defne'nin titreyen gözlerini göster", "Kerem'in yüzüne yavaş yaklaş"],
    animationTr: ["Defne çok korkmuş", "Kerem fısıltıyla konuşur", "İkisinin de nefesi duyulur", "Müzik aniden kesilir (113.6)"],
    dialogue: [
      L(17, 1, "defne", "Abi... kapı kolu dönüyor!", 108.6, 1.9, ["whispers", "terrified"], "Titrek fısıltı."),
      L(17, 2, "kerem", "Sessiz ol... sakın kıpırdama.", 111.0, 2.4, ["whispers"], "Fısıltı; kelimeler arasında nefes."),
    ],
    sfx: [
      X("S17_handle_turn", 107.2, 0.7, 3, "Old brass metal door lever handle slowly turning and creaking, close up, very quiet room"),
      X("S17_breaths", 107.5, 0.35, 6, "Two people breathing quietly and shakily in fear, close, holding breath"),
    ],
  },
  {
    n: 18,
    title: "GİZEMLİ FİNAL",
    start: 114,
    end: 120,
    visualPromptEn:
      "Extremely suspenseful realistic 2D anime psychological horror finale. Kerem and Defne stand frozen inside the dark bedroom while holding a smartphone. Suddenly the phone's surveillance image switches to an impossible view of the same bedroom from directly behind them. A tall hooded silhouette stands only in the phone image, dangerously close to their backs, while the actual room appears empty. The stranger's face remains completely hidden. Defne's eyes widen in pure terror. Cut abruptly to black and reveal elegant white text: \"DEVAM EDECEK...\" Cinematic unresolved supernatural mystery, serious realistic horror.",
    cameraTr: [
      "Telefon ekranına aşırı yakın çekim",
      "Ekranda Kerem ve Defne'nin arkadan görüntüsü; arkalarında karanlık siluet",
      "Gerçek odada aynı yerde hiçbir şey görünmüyor",
      "118.5: görüntü aniden kararır; DEVAM EDECEK...",
    ],
    animationTr: ["Defne'nin gözleri dehşetle büyür", "Yabancının yüzü ve sesin kaynağı gösterilmez"],
    dialogue: [
      L(18, 1, "defne", "Abi... bizi arkadan kim çekiyor?", 114.0, 2.95, ["shocked", "whispers", "trembling"], "Şok, titrek ve çok alçak; son kelimelerde nefesi kesilir."),
      L(18, 2, "yabanci", "Sakın dönmeyin.", 117.0, 1.45, ["whispers", "calm"], "Çok sakin, çok yakın; doğal ve ürpertici erkek fısıltısı. Efekt YOK.", "intimate"),
    ],
    sfx: [
      X("S18_feed_switch", 113.95, 0.55, 1, "Abrupt digital feed switch glitch, short and sharp"),
      X("S18_end_thud", 118.8, 0.5, 1.2, "Single soft deep sub bass thud in silence, very low"),
    ],
  },
];

/** Ortam ses yatakları (döngü). Zaman aralıkları sahne kurallarına bağlıdır. */
export type AmbienceBed = {
  id: string;
  file: string;
  from: number;
  to: number;
  volume: number;
  fadeIn: number;
  fadeOut: number;
  promptEn: string;
};

export const AMBIENCE: AmbienceBed[] = [
  { id: "AMB_rain_window", file: "AMB_rain_window.mp3", from: 0, to: 6, volume: 0.55, fadeIn: 0.3, fadeOut: 0.25, promptEn: "Steady moderate night rain on a window glass heard from inside a quiet bedroom, no thunder, seamless loop" },
  { id: "AMB_rain_interior", file: "AMB_rain_interior.mp3", from: 11, to: 52, volume: 0.35, fadeIn: 0.6, fadeOut: 0.8, promptEn: "Gentle night rain outside an old apartment heard from a living room, occasional soft wind gust, seamless loop" },
  { id: "AMB_house_night", file: "AMB_house_night.mp3", from: 52, to: 113.6, volume: 0.3, fadeIn: 0.8, fadeOut: 0.05, promptEn: "Very quiet old house at night room tone, faint distant rain and soft wind, seamless loop" },
  { id: "MUS_dread_bed", file: "MUS_dread_bed.mp3", from: 25, to: 113.6, volume: 0.28, fadeIn: 3, fadeOut: 0.03, promptEn: "Minimal dark psychological horror underscore, low sustained strings and sub drone, slowly building dread, no melody, seamless loop" },
  { id: "AMB_room_silence", file: "AMB_room_silence.mp3", from: 113.6, to: 118.5, volume: 0.25, fadeIn: 0.05, fadeOut: 0.0, promptEn: "Near silent bedroom room tone at night with extremely faint rain, tense quiet" },
];

/** Müziğin aniden kesildiği an (S17) ve finaldeki kararma. */
export const MUSIC_CUT_AT = 113.6;
export const BLACKOUT_AT = 118.5;
export const END_CARD_AT = 118.8;

export const ALL_LINES: DialogueLine[] = SCENES.flatMap((sc) => sc.dialogue);
export const ALL_SFX: SfxCue[] = SCENES.flatMap((sc) => sc.sfx);
