// Sinematik kamera: anahtar karelerle push-in / pan / tracking, katman derinliğine göre
// parallax ve odak (rack focus), gerilim anlarında kontrollü el kamerası.
import React, { createContext, useContext } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { HEIGHT, WIDTH } from "../config";
import { handheld, keys, smooth, type Key } from "../lib/anim";

export type CamKey = Key<{ x: number; y: number; z: number; focus: number }>;

type CamState = { x: number; y: number; z: number; focus: number; stageW: number; stageH: number; blurScale: number };
const Ctx = createContext<CamState>({ x: WIDTH / 2, y: HEIGHT / 2, z: 1, focus: 1, stageW: WIDTH, stageH: HEIGHT, blurScale: 10 });

/** Kısa yardımcı: kamera anahtarı (t: çekim başından itibaren saniye). focus varsayılan 1 (özne düzlemi). */
export const K = (t: number, x: number, y: number, z: number, focus = 1): CamKey => ({ t, x, y, z, focus });

export const Camera: React.FC<{
  /** Çekim başından itibaren geçen saniye */
  r: number;
  path: CamKey[];
  stage?: { w: number; h: number };
  shake?: number;
  seed?: string;
  blurScale?: number;
  ease?: (t: number) => number;
  background?: string;
  children: React.ReactNode;
}> = ({ r, path, stage = { w: WIDTH, h: HEIGHT }, shake = 0, seed = "cam", blurScale = 10, ease = smooth, background = "#05070b", children }) => {
  const frame = useCurrentFrame();
  const c = keys(r, path, ease);
  const hh = handheld(frame, shake, seed);
  return (
    <AbsoluteFill style={{ background, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translate(${hh.x}px, ${hh.y}px) rotate(${hh.r}deg) scale(${1 + shake * 0.02})` }}>
        <Ctx.Provider value={{ ...c, stageW: stage.w, stageH: stage.h, blurScale }}>{children}</Ctx.Provider>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * Derinlik katmanı. depth: 1 = özne düzlemi, <1 uzak arka plan (daha az hareket eder), >1 ön plan.
 * Tüm katmanlar aynı sahne koordinatlarını kullanır.
 */
export const Layer: React.FC<{ depth?: number; blur?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  depth = 1,
  blur,
  style,
  children,
}) => {
  const c = useContext(Ctx);
  const cx = c.stageW / 2 + (c.x - c.stageW / 2) * depth;
  const cy = c.stageH / 2 + (c.y - c.stageH / 2) * depth;
  const z = Math.pow(c.z, depth);
  const b = blur ?? Math.abs(depth - c.focus) * c.blurScale;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: c.stageW,
        height: c.stageH,
        transformOrigin: "0 0",
        transform: `translate(${WIDTH / 2}px, ${HEIGHT / 2}px) scale(${z}) translate(${-cx}px, ${-cy}px)`,
        filter: b > 0.3 ? `blur(${b.toFixed(2)}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Sahne koordinatında konumlanan kutu. */
export const Place: React.FC<{ x: number; y: number; w?: number; h?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  x,
  y,
  w,
  h,
  style,
  children,
}) => <div style={{ position: "absolute", left: x, top: y, width: w, height: h, ...style }}>{children}</div>;
