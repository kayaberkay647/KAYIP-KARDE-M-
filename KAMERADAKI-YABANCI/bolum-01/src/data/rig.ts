// KARAKTER RİG KATMAN SÖZLEŞMESİ (Kerem ve Defne için aynı)
// Dosya yolu: public/assets/characters/<karakter>/<view>/<katman>.png
// Bir görünümün TÜM katmanları aynı tuval boyutunda (1200x2800, şeffaf PNG) ve aynı hizada olmalıdır;
// rig kutusu 600x1400 birimdir, ayakların ortası (600, 2800 px) çapa noktasıdır. Boyun pivotu (600, 600 px).

export const VISEME_LIST = ["X", "MBP", "A", "E", "I", "O", "U", "FV", "C"] as const;

export const VISEME_NOTES_TR: Record<(typeof VISEME_LIST)[number], string> = {
  X: "Dinlenme — dudaklar kapalı, gevşek",
  MBP: "m/b/p — dudaklar birbirine bastırılmış",
  A: "a — çene en açık",
  E: "e — yayvan, dişler hafif görünür",
  I: "ı/i — dar açıklık, dişler görünür",
  O: "o/ö — yuvarlak orta açıklık",
  U: "u/ü — küçük yuvarlak, öne uzamış dudak",
  FV: "f/v — alt dudak üst dişlere değer",
  C: "diğer ünsüzler (t d s z n l r k g ç ş y h) — hafif açık",
};

export const FRONT_LAYERS = [
  "body_stand",
  "body_sit",
  "body_stand_phone",
  "body_sit_phone",
  "body_reach",
  "head",
  "hair_back",
  "hair_front",
  "eyes_open",
  "eyes_half",
  "eyes_closed",
  "eyes_wide",
  "brows_neutral",
  "brows_concern",
  "brows_fear",
  "brows_determined",
  "brows_tired",
  ...VISEME_LIST.map((v) => `mouth_${v}`),
];

export const BACK_LAYERS = ["body_stand", "body_walk_a", "body_walk_b", "head_back"];

/** Katmanlı modun devreye girmesi için ön görünümde ŞART olan minimum katmanlar. */
export const FRONT_REQUIRED = ["body_stand", "head", "hair_front", "eyes_open", "eyes_half", "eyes_closed", "brows_neutral", ...VISEME_LIST.map((v) => `mouth_${v}`)];

export const rigLayerPaths = (id: string) => [
  ...FRONT_LAYERS.map((l) => `assets/characters/${id}/front/${l}.png`),
  ...BACK_LAYERS.map((l) => `assets/characters/${id}/back/${l}.png`),
];
