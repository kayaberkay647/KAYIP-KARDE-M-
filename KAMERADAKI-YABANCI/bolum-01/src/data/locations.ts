// MEKÂN TASARIMI — tek ev, değişmez mimari plan.
// Her "set", sahnelerde kamerayla kadrajlanan tek bir çizim plakasıdır. Aynı mekânın
// farklı plan ölçekleri, aynı plakanın farklı kamera konumlarıdır: böylece mobilya,
// kapı ve pencere konumları asla değişmez.

export type SetId =
  | "LR_MASTER"
  | "LR_TABLE_INSERT"
  | "HW_MASTER"
  | "HW_REVERSE"
  | "HW_CAM02"
  | "BR_CAM01"
  | "BR_DOOR_POV"
  | "BR_INTERIOR"
  | "BR_WALLCAM_INSERT"
  | "BR_DOOR_INSIDE_INSERT";

export type SetPlate = {
  id: SetId;
  location: "SALON" | "KORIDOR" | "DEFNE'NİN ODASI";
  /** Sahne (stage) koordinat sistemi; kamera bu koordinatlarda çalışır. */
  stage: { w: number; h: number };
  /** Önerilen üretim çözünürlüğü (yakın planlar için 2x pay). */
  renderSize: { w: number; h: number };
  layers: { file: string; required: boolean; noteTr: string }[];
  usedInScenes: number[];
  promptEn: string;
};

/** Kat planı — tüm plakalar bu plana uymak zorundadır. */
export const FLOOR_PLAN_TR = `
EV KAT PLANI (kuzey yukarı)

  ┌────────── DEFNE'NİN ODASI ──────────┐
  │ [masa]      [PENCERE/koyu perde]  [komodin]
  │ ▲CAM01 (kuzeybatı üst köşe)      [YATAK — doğu duvarı boyunca]
  │                                    │
  │ [KAPI — güney duvarının batı yarısı]│
  └──────┬──────────────────────────────┘
         │ KORİDOR (dar, uzun, ahşap zemin, krem duvar, ortada titreyen tavan lambası)
         │ Koridorun ucunda Defne'nin kapısı. CAM02 diye bir kamera YOKTUR.
         │
  ┌──────┴──────────── SALON ──────────────────┐
  │ [PENCERE, sol]  [MAVİ KANEPE + üstünde DUVAR SAATİ]  [AYAKLI LAMBA]  [KORİDOR AĞZI, sağ]
  │                 [AHŞAP SEHPA kanepenin önünde]
  └────────────────────────────────────────────┘

Kerem kanepenin SOL ucunda (sehpaya yakın), Defne SAĞ ucunda battaniyeyle oturur.
Telefon: S04 Kerem'in elinde → S06 sehpada → S06 sonu Kerem alır → S08'den itibaren Defne tutar.
Odada kardeşler S16'dan sonra KAPIYA DÖNÜK durur (yüzleri BR_DOOR_POV yönünden, sırtları BR_INTERIOR yönünden çekilir).
`;

const STYLE = "realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text";

export const SETS: Record<SetId, SetPlate> = {
  LR_MASTER: {
    id: "LR_MASTER",
    location: "SALON",
    stage: { w: 2400, h: 1920 },
    renderSize: { w: 4800, h: 3840 },
    layers: [
      { file: "bg.png", required: true, noteTr: "Duvarlar, pencere, perdeler, kanepe, saat, lamba, koridor ağzı" },
      { file: "fg.png", required: false, noteTr: "Ön plan: ahşap sehpa (karakterlerin önünde kalır), şeffaf PNG" },
    ],
    usedInScenes: [3, 4, 5, 6, 7, 8],
    promptEn: `${STYLE}. Wide interior of an old but well-kept Turkish family living room at 3 AM, very wide panorama. From left to right: a tall window with heavy dark curtains slightly open, cold blue rainy night outside with raindrops on the glass; a worn blue fabric three-seat sofa against the back wall with a folded knit blanket; an old round wall clock above the sofa showing 03:13; a floor lamp with a warm yellow fabric shade on the right of the sofa casting a soft amber pool of light; on the far right a doorway opening into a long, narrow, dark hallway with a cream wall, wooden floor and one dim ceiling light deep inside. A small wooden coffee table in front of the sofa. Dark navy and muted gray shadows, warm amber practical light vs cold blue moonlight, subtle volumetric light, eye-level camera.`,
  },
  LR_TABLE_INSERT: {
    id: "LR_TABLE_INSERT",
    location: "SALON",
    stage: { w: 1080, h: 1920 },
    renderSize: { w: 2160, h: 3840 },
    layers: [{ file: "bg.png", required: true, noteTr: "Sehpa yüzeyi makro; telefonun ekranını kod çizer" }],
    usedInScenes: [6],
    promptEn: `${STYLE}. Extreme close-up top-down 3/4 angle of an old scratched wooden coffee table surface at night, warm wood grain, a faint ring stain from a tea glass, soft amber lamp light from the right, cold blue window light from the left, shallow depth of field, empty space in the center where a smartphone will lie.`,
  },
  HW_MASTER: {
    id: "HW_MASTER",
    location: "KORIDOR",
    stage: { w: 1080, h: 1920 },
    renderSize: { w: 2160, h: 3840 },
    layers: [{ file: "bg.png", required: true, noteTr: "Salondan Defne'nin kapısına bakan tek nokta perspektif" }],
    usedInScenes: [5, 9, 16],
    promptEn: `${STYLE}. One-point perspective view down a long, narrow hallway of an old family apartment at night, seen from the living room end at eye level. Old wooden plank floor, cream painted walls with slight age stains, a single ceiling light fixture halfway down giving dim cold light, at the far end a closed dark wooden bedroom door with a brass lever handle. Cold blue shadows, faint warm light spill on the floor from behind the camera, deep unsettling darkness near the door.`,
  },
  HW_REVERSE: {
    id: "HW_REVERSE",
    location: "KORIDOR",
    stage: { w: 1080, h: 1920 },
    renderSize: { w: 2160, h: 3840 },
    layers: [{ file: "bg.png", required: true, noteTr: "Defne'nin kapısından salona doğru ters açı; uçta sıcak salon ışığı" }],
    usedInScenes: [9, 16],
    promptEn: `${STYLE}. Reverse one-point perspective view of the same long, narrow hallway at night, seen from just outside the bedroom door looking back toward the living room. Old wooden plank floor, cream walls in cold blue shadow, one dim ceiling light halfway, and at the far end the open doorway of the living room glowing with warm amber lamp light. Completely empty.`,
  },
  HW_CAM02: {
    id: "HW_CAM02",
    location: "KORIDOR",
    stage: { w: 1080, h: 1920 },
    renderSize: { w: 1620, h: 2880 },
    layers: [{ file: "bg.png", required: true, noteTr: "İmkânsız yüksek açı: tavanın köşesinden koridor (CCTV efekti kodla eklenir)" }],
    usedInScenes: [15, 16, 17],
    promptEn: `${STYLE}. Impossible high-angle view from the very top corner of the ceiling of the same long narrow hallway, looking down toward the closed bedroom door (Defne's door) at the end, wide-angle lens distortion, old wooden floor, cream walls, one dim ceiling light. Monochrome-friendly lighting, very dark, empty.`,
  },
  BR_CAM01: {
    id: "BR_CAM01",
    location: "DEFNE'NİN ODASI",
    stage: { w: 1080, h: 1920 },
    renderSize: { w: 1620, h: 2880 },
    layers: [{ file: "bg.png", required: true, noteTr: "Kuzeybatı üst köşedeki güvenlik kamerasının bakış açısı" }],
    usedInScenes: [1, 7, 11, 12, 14],
    promptEn: `${STYLE}. High corner security camera view of a teenage girl's small bedroom at night, wide-angle lens with slight barrel distortion, looking down diagonally. A single bed with rumpled gray-blue sheets along the right side wall, a small bedside table with an unlit lamp, a closed dark wooden door in the far wall, wooden floor. Pale moonlight from a window behind the camera falls on the floor in a long rectangle. Very dark blue shadows, the room is empty.`,
  },
  BR_DOOR_POV: {
    id: "BR_DOOR_POV",
    location: "DEFNE'NİN ODASI",
    stage: { w: 1080, h: 1920 },
    renderSize: { w: 2160, h: 3840 },
    layers: [{ file: "bg.png", required: true, noteTr: "Kapıdan içeri: pencere karşıda, yatak sağda, masa solda, kamera sol üst köşede" }],
    usedInScenes: [10, 11, 13, 14, 15, 16, 17, 18],
    promptEn: `${STYLE}. Eye-level view from the doorway into a teenage girl's small bedroom at night. Opposite wall: a window with heavy dark curtains, cold moonlight leaking through the gap and rain on the glass. Right side: a single bed with gray-blue sheets along the wall and a small bedside table. Left side: a small study desk with books and a desk lamp turned off. High in the top-left corner of the room a small white wall-mounted home security camera with a thin power cable running down the wall to a socket. Cold blue moonlight, deep shadows.`,
  },
  BR_INTERIOR: {
    id: "BR_INTERIOR",
    location: "DEFNE'NİN ODASI",
    stage: { w: 1080, h: 1920 },
    renderSize: { w: 2160, h: 3840 },
    layers: [{ file: "bg.png", required: true, noteTr: "Pencere tarafından kapıya bakış; kardeşlerin sırt planı + S18 imkânsız görüntü" }],
    usedInScenes: [11, 17, 18],
    promptEn: `${STYLE}. Eye-level reverse view inside the same small teenage bedroom at night, looking from the window side toward the closed dark wooden door slightly right of center in the far wall, brass lever handle. Left foreground edge: the foot of the single bed with gray-blue sheets. Cream walls in deep blue shadow, moonlight from behind the camera, wooden floor, oppressive empty space in the middle of the room.`,
  },
  BR_WALLCAM_INSERT: {
    id: "BR_WALLCAM_INSERT",
    location: "DEFNE'NİN ODASI",
    stage: { w: 1080, h: 1920 },
    renderSize: { w: 2160, h: 3840 },
    layers: [
      { file: "bg.png", required: true, noteTr: "Duvar, kamera gövdesi, priz (kablo ve LED kodla çizilir)" },
    ],
    usedInScenes: [13, 14],
    promptEn: `${STYLE}. Close-up vertical shot of a cream bedroom wall corner at night: a small white home security camera mounted high on the wall at the top of the frame, and an old white wall power socket near the bottom of the frame. No cable visible (cable is animated separately). Cold blue moonlight, realistic wall texture and soft shadows.`,
  },
  BR_DOOR_INSIDE_INSERT: {
    id: "BR_DOOR_INSIDE_INSERT",
    location: "DEFNE'NİN ODASI",
    stage: { w: 1080, h: 1920 },
    renderSize: { w: 2160, h: 3840 },
    layers: [
      { file: "bg.png", required: true, noteTr: "Kapının iç yüzü (kol HARİÇ)" },
      { file: "handle.png", required: true, noteTr: "Pirinç kapı kolu, şeffaf PNG, pivot sol-orta (dönüşü kod yapar)" },
    ],
    usedInScenes: [17],
    promptEn: `${STYLE}. Extreme close-up of the inside of an old dark wooden bedroom door at night, a worn brass lever door handle and keyhole plate, realistic metal reflections catching faint cold light, deep shadows, dust in the air.`,
  },
};
