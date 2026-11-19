// YABANCI — çok uzun, ince, siyah kapüşonlu siluet. Yüz HER ZAMAN mutlak karanlıktır;
// bu bileşen yüz çizmez, çizemez. Yalnızca kamera görüntüleri içinde kullanılır.
// Final çizimi varsa (assets/characters/yabanci/cctv_stand.png) onu kullanır.
import React from "react";
import { Img, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { has, src } from "../lib/assets";

export const STRANGER_ASSET = "assets/characters/yabanci/cctv_stand.png";

/** Kutu: 360 x 1700, çapa ayak ortası. headTurn: 0 = yana dönük, 1 = kameraya dönük. */
export const Stranger: React.FC<{
  x: number;
  y: number;
  scale?: number;
  headTurn?: number;
  /** 0..1 — başını hafifçe öne/kameraya doğru eğme */
  lean?: number;
  opacity?: number;
  rim?: string;
  view?: "front" | "back";
}> = ({ x, y, scale = 1, headTurn = 0, lean = 0, opacity = 1, rim = "#6f86ad", view = "front" }) => {
  const frame = useCurrentFrame();
  const W = 360;
  const H = 1700;
  // neredeyse sıfır hareket: yalnızca algının sınırında bir salınım
  const sway = noise2D("yab", frame * 0.004, 0) * 0.35;
  const box: React.CSSProperties = {
    position: "absolute",
    left: x - (W / 2) * scale,
    top: y - H * scale,
    width: W * scale,
    height: H * scale,
    opacity,
    transform: `rotate(${sway}deg)`,
    transformOrigin: "50% 100%",
  };
  if (has(STRANGER_ASSET) && view === "front" && headTurn > 0.95) {
    return (
      <div style={box}>
        <Img src={src(STRANGER_ASSET)} style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
  const ht = Math.max(0, Math.min(1, headTurn));
  const hoodShift = (1 - ht) * -26; // yan profilde kapüşon ağzı sola kayar
  const openW = view === "back" ? 0 : 20 + ht * 30;
  return (
    <div style={box}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="yabRim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={rim} stopOpacity={0.55} />
            <stop offset="0.08" stopColor={rim} stopOpacity={0} />
            <stop offset="0.92" stopColor={rim} stopOpacity={0} />
            <stop offset="1" stopColor={rim} stopOpacity={0.3} />
          </linearGradient>
        </defs>
        {/* uzun palto gövdesi */}
        <path
          d="M 180 250 C 120 250 92 290 86 360 C 74 520 70 760 64 1000 C 58 1240 52 1480 46 1690 L 314 1690 C 308 1480 302 1240 296 1000 C 290 760 286 520 274 360 C 268 290 240 250 180 250 Z"
          fill="#050608"
        />
        <path d="M 180 250 C 120 250 92 290 86 360 C 74 520 70 760 64 1000 C 58 1240 52 1480 46 1690 L 314 1690 C 308 1480 302 1240 296 1000 C 290 760 286 520 274 360 C 268 290 240 250 180 250 Z" fill="url(#yabRim)" />
        {/* kollar — doğal ama kıpırtısız */}
        <path d="M 92 330 C 66 420 60 620 66 860 L 96 860 C 100 640 104 450 120 350 Z" fill="#040506" />
        <path d="M 268 330 C 294 420 300 620 294 860 L 264 860 C 260 640 256 450 240 350 Z" fill="#040506" />
        {/* soluk, uzun parmaklı eller */}
        <g fill="#8d8c8f" opacity={0.55}>
          <path d="M 70 858 C 66 900 68 950 74 990 L 80 990 L 82 930 L 88 1000 L 94 1000 L 92 920 L 98 980 L 102 978 L 98 860 Z" />
          <path d="M 290 858 C 294 900 292 950 286 990 L 280 990 L 278 930 L 272 1000 L 266 1000 L 268 920 L 262 980 L 258 978 L 262 860 Z" />
        </g>
        {/* kapüşon */}
        <g transform={`translate(0 ${lean * 14}) rotate(${lean * 6} 180 200)`}>
          <path
            d={`M ${110 + hoodShift * 0.3} 300 C 96 180 120 70 182 62 C 246 56 270 170 252 300 C 230 280 140 280 ${110 + hoodShift * 0.3} 300 Z`}
            fill="#060709"
          />
          <path d={`M 110 300 C 96 180 120 70 182 62 C 246 56 270 170 252 300`} stroke={rim} strokeOpacity={0.35} strokeWidth={3} fill="none" />
          {/* kapüşonun içi: MUTLAK KARANLIK — yüz yok */}
          {openW > 0 && (
            <ellipse cx={180 + hoodShift} cy={186} rx={openW} ry={70} fill="#000000" />
          )}
        </g>
      </svg>
    </div>
  );
};
