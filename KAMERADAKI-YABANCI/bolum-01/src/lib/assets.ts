// Varlık durumu: `npm run scan` public/ klasörünü tarar ve src/generated/asset-status.json yazar.
// Bileşenler yalnızca GERÇEKTEN var olan dosyaları yükler; eksik görseller için animatik
// yer tutucusu (vektör çizim), eksik sesler için sessizlik kullanılır. Hiçbir varlık uydurulmaz.
import { staticFile } from "remotion";
import status from "../generated/asset-status.json";

export type Alignment = { chars: string[]; starts: number[]; ends: number[] };

type Status = {
  generatedAt: string | null;
  present: string[];
  durations: Record<string, number>;
  alignments: Record<string, Alignment>;
};

const st = status as Status;
const presentSet = new Set(st.present);

/** public/ altındaki göreli yol mevcut mu? */
export const has = (rel: string) => presentSet.has(rel);
export const src = (rel: string) => staticFile(rel);
export const durationOf = (rel: string): number | undefined => st.durations[rel];
export const alignmentOf = (lineId: string): Alignment | undefined => st.alignments[lineId];

export const voicePath = (lineId: string) => `audio/voice/${lineId}.mp3`;
export const sfxPath = (file: string) => `audio/sfx/${file}`;
export const ambPath = (file: string) => `audio/amb/${file}`;
export const setLayerPath = (setId: string, file: string) => `assets/sets/${setId}/${file}`;
export const charLayerPath = (character: string, view: string, layer: string) =>
  `assets/characters/${character}/${view}/${layer}.png`;
