// KAMERADAKİ YABANCI — 1. Bölüm: GECE 03.13
// Değişmez teknik ayarlar. Bu değerler bölüm boyunca SABİTTİR.

export const SERIES_TITLE = "KAMERADAKİ YABANCI";
export const EPISODE_NUMBER = 1;
export const EPISODE_TITLE = "GECE 03.13";
export const TOTAL_EPISODES = 15;

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const DURATION_SECONDS = 120;
export const DURATION_FRAMES = DURATION_SECONDS * FPS; // 3600
export const SCENE_COUNT = 18;

/** Saniyeyi kareye çevirir (en yakın kareye yuvarlar). */
export const f = (seconds: number) => Math.round(seconds * FPS);
/** Kareyi saniyeye çevirir. */
export const s = (frames: number) => frames / FPS;
