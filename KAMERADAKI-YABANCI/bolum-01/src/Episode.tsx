// KAMERADAKİ YABANCI — 1. Bölüm: GECE 03.13 — ana kurgu (120 sn / 3600 kare / 18 sahne)
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FPS } from "./config";
import { SCENES } from "./data/script";
import { DebugHUD, FilmFX, Subtitles } from "./components/Overlays";
import { Soundtrack } from "./audio/Soundtrack";
import { S01, S02, S03, S04, S05, S06 } from "./scenes/ScenesA";
import { S07, S08, S09, S10, S11, S12 } from "./scenes/ScenesB";
import { S13, S14, S15, S16, S17, S18 } from "./scenes/ScenesC";

const SCENE_COMPONENTS: React.FC<{ t: number }>[] = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, S15, S16, S17, S18];

export type EpisodeProps = { animatic: boolean; subtitles: boolean };

export const Episode: React.FC<EpisodeProps> = ({ animatic, subtitles }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const idx = Math.max(0, SCENES.findIndex((s) => t >= s.start && t < s.end));
  const Scene = SCENE_COMPONENTS[idx];
  const n = SCENES[idx].n;
  const fx = n !== 2 && t < 118.5;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene t={t} />
      {fx && <FilmFX grain={n === 1 ? 0.04 : 0.075} vignette={0.7} />}
      {subtitles && <Subtitles t={t} />}
      {animatic && <DebugHUD t={t} />}
      <Soundtrack />
    </AbsoluteFill>
  );
};
