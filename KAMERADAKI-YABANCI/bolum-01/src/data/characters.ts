// SABİT KARAKTER TANIMLARI — 15 bölüm boyunca değişmez.
// Görsel referans üretimi, rig katmanları ve ElevenLabs ses ayarları buradan okunur.

export type CharacterId = "kerem" | "defne" | "yabanci";

export type VoiceSettings = {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
  speed: number;
};

export type CharacterSheet = {
  id: CharacterId;
  name: string;
  role: string;
  age?: number;
  /** Sahne içi renkler: yer tutucu rig (animatik) ve ışık kontrolü için. */
  palette: { skin: string; hair: string; eyes: string; top: string; under: string; bottom: string };
  descriptionTr: string[];
  voiceTr: string[];
  actingTr: string[];
  /** Tüm görsel promptlarda birebir kullanılacak sabit İngilizce tanım. */
  referencePromptEn: string;
  /** ElevenLabs: her karakter tüm bölümlerde AYNI voice ID ile seslendirilir. */
  voiceEnvKey: string;
  voiceSettings: VoiceSettings;
};

export const STYLE_PROMPT_EN =
  "Ultra realistic 2D anime animation, professional cinematic psychological horror, detailed hand-drawn mature anime character design, natural human anatomy and facial proportions, realistic eye and mouth shapes, subtle skin shading, detailed hair strands, realistic fabric folds, highly detailed interior environment, dramatic cinematic lighting, dark navy blue, muted gray, cold blue and dim amber color palette, film-quality 2D composition";

export const NEGATIVE_PROMPT_EN =
  "3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors";

export const CHARACTERS: Record<CharacterId, CharacterSheet> = {
  kerem: {
    id: "kerem",
    name: "KEREM",
    role: "Abi",
    age: 29,
    palette: {
      skin: "#d7a985",
      hair: "#2e2119",
      eyes: "#5a3a22",
      top: "#1d2a44", // lacivert kapüşonlu
      under: "#7d8187", // gri tişört
      bottom: "#34363b", // antrasit pantolon
    },
    descriptionTr: [
      "29 yaşında erkek, orta-uzun boy, normal atletik yapı",
      "Açık buğday ten, kısa koyu kahverengi saç, kahverengi göz",
      "Hafif ve düzgün sakal, yakışıklı ama doğal yüz hatları",
      "Lacivert kapüşonlu üst (fermuarsız), içinde gri tişört, antrasit pantolon",
    ],
    voiceTr: [
      "Orta-kalın, hafif tok erkek sesi, doğal Türkçe",
      "Başlangıçta sakin ve yorgun; korktukça ses gerilir ama bağırmaz",
      "Korkusunu bastırır, kardeşini korumaya çalışır",
    ],
    actingTr: [
      "Gerçekçi nefes, doğal göz kırpma, hafif kaş hareketleri",
      "Konuşurken hafif baş ve omuz vurguları",
      "Korkuyu yüzünde önce çene ve göz kapaklarıyla gösterir",
    ],
    referencePromptEn:
      "KEREM: a 29-year-old Turkish man, medium-tall, normal athletic build, light wheat (light olive-beige) skin, short dark brown hair neatly cut, warm brown eyes, light neatly trimmed stubble beard, handsome but natural sharp facial features, wearing a navy blue pullover hoodie over a plain gray t-shirt, anthracite gray trousers",
    voiceEnvKey: "VOICE_ID_KEREM",
    voiceSettings: { stability: 0.5, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true, speed: 0.96 },
  },
  defne: {
    id: "defne",
    name: "DEFNE",
    role: "Kız kardeş",
    age: 16,
    palette: {
      skin: "#dcae8a",
      hair: "#5b3524", // kestane
      eyes: "#7a6a3a", // ela
      top: "#5e1f27", // bordo kazak
      under: "#5e1f27",
      bottom: "#6b6e73", // gri ekose pijama
    },
    descriptionTr: [
      "16 yaşında genç kız, ince ve orta boylu",
      "Açık buğday ten, omuz hizasında dalgalı kestane saç, ela göz",
      "Doğal ve gerçekçi genç yüz",
      "Bol bordo kazak, gri ekose pijama pantolonu",
    ],
    voiceTr: [
      "Doğal genç kız sesi, yumuşak, hafif ince ve hafif nefesli",
      "Korktuğunda nefesi hızlanır, zaman zaman titrer",
      "Gereksiz yüksek ses yok; panik anlarında bile kontrollü",
    ],
    actingTr: [
      "Uykusuz, yorgun göz kapakları (ilk sahneler)",
      "Korkuyla büyüyen gözler, titreyen dudaklar ve eller",
      "Abisine bakarak güven arar",
    ],
    referencePromptEn:
      "DEFNE: a 16-year-old Turkish girl, slim and average height, light wheat skin, shoulder-length wavy chestnut brown hair, hazel eyes, young natural realistic face without makeup, wearing an oversized burgundy knit sweater and gray plaid pajama pants",
    voiceEnvKey: "VOICE_ID_DEFNE",
    voiceSettings: { stability: 0.45, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true, speed: 0.95 },
  },
  yabanci: {
    id: "yabanci",
    name: "YABANCI",
    role: "Kameradaki yabancı",
    palette: { skin: "#000000", hair: "#000000", eyes: "#000000", top: "#07080b", under: "#07080b", bottom: "#07080b" },
    descriptionTr: [
      "Çok uzun boylu ve ince insan silueti",
      "Siyah kapüşonlu uzun kıyafet; yüz TAMAMEN karanlıkta, ASLA gösterilmez",
      "Eller doğal ama rahatsız edici derecede hareketsiz",
      "Çıplak gözle görülmez; yalnızca kamera görüntülerinde belirir",
    ],
    voiceTr: [
      "Yalnızca finalde: çok sakin, çok yakından gelen doğal yetişkin erkek fısıltısı",
      "Robotik efekt, pitch shift veya canavar sesi KESİNLİKLE yok",
    ],
    actingTr: ["Hareketsiz durur; hareket ettiğinde çok yavaş ve kontrollü"],
    referencePromptEn:
      "THE STRANGER: an unnaturally tall and thin human silhouette wearing a long black hooded coat, the face completely hidden in absolute darkness inside the hood (no facial features visible at all), long pale still hands hanging naturally at the sides, perfectly motionless posture",
    voiceEnvKey: "VOICE_ID_YABANCI",
    voiceSettings: { stability: 0.7, similarity_boost: 0.85, style: 0.1, use_speaker_boost: true, speed: 0.9 },
  },
};
