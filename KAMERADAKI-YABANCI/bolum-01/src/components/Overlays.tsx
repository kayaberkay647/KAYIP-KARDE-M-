import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { ALL_LINES, SCENES } from "../data/script";
import { CHARACTERS } from "../data/characters";
import { lineDuration } from "../lib/lipsync";
import { INTER, MONO, SERIF } from "../lib/fonts";
import { prog } from "../lib/anim";
import { has, voicePath } from "../lib/assets";
import { EPISODE_TITLE, FPS, SERIES_TITLE } from "../config";

// ------------------------------------------------------------------ ALTYAZI
// Beyaz, ince siyah dış çizgi, alt-orta bölüm, en fazla iki satır, yüzleri kapatmaz.
export const SUB_MAX_CHARS_PER_LINE = 30;
export const SUB_HOLD = 0.25;

export const Subtitles: React.FC<{ t: number }> = ({ t }) => {
  const line = ALL_LINES.find((l) => t >= l.at - 0.03 && t <= l.at + lineDuration(l) + SUB_HOLD);
  if (!line) return null;
  const end = line.at + lineDuration(line) + SUB_HOLD;
  const a = Math.min(prog(t, line.at - 0.03, line.at + 0.1), 1 - prog(t, end - 0.12, end));
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 300, pointerEvents: "none" }}>
      <div
        style={{
          maxWidth: 880,
          textAlign: "center",
          fontFamily: INTER,
          fontWeight: 600,
          fontSize: 50,
          lineHeight: 1.22,
          color: "#ffffff",
          WebkitTextStroke: "5px #000",
          paintOrder: "stroke fill",
          textShadow: "0 2px 10px rgba(0,0,0,0.55)",
          opacity: a,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {line.text}
      </div>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ FİLM DOKUSU
export const FilmFX: React.FC<{ grain?: number; vignette?: number }> = ({ grain = 0.07, vignette = 0.75 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 75% 60% at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,${vignette}) 100%)` }} />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: grain, mixBlendMode: "overlay" }}>
        <filter id={`fg${frame % 5}`}>
          <feTurbulence type="fractalNoise" baseFrequency={0.85} numOctaves={2} seed={frame % 61} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#fg${frame % 5})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Kısa siyah geçiş (kararma). */
export const Fade: React.FC<{ t: number; at: number; dur: number; inOut?: "in" | "out" }> = ({ t, at, dur, inOut = "out" }) => {
  const p = prog(t, at, at + dur);
  const o = inOut === "out" ? p : 1 - p;
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: "#000", opacity: o }} />;
};

// ------------------------------------------------------------------ JENERİK (S02)
export const TitleSequence: React.FC<{ r: number }> = ({ r }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(r, [0, 5], [1, 1.07]);
  const titleA = prog(r, 0.25, 1.7);
  const flick = r > 0.25 && r < 0.9 && random(`tf${frame}`) < 0.35 ? 0.4 : 1;
  const subA = prog(r, 1.9, 2.9);
  const out = 1 - prog(r, 4.5, 5);
  const smoke = (i: number) => {
    const x = 540 + Math.sin(r * 0.25 + i * 2.1) * 220 + i * 40 - 120;
    const y = 960 + Math.cos(r * 0.2 + i * 1.3) * 260 + (i % 2 ? 300 : -300);
    return { x, y };
  };
  return (
    <AbsoluteFill style={{ background: "#000", opacity: out }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const s = smoke(i);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x - 500,
              top: s.y - 400,
              width: 1000,
              height: 800,
              borderRadius: "50%",
              background: "radial-gradient(closest-side, rgba(40,62,104,0.32), rgba(20,30,60,0))",
              filter: "blur(40px)",
            }}
          />
        );
      })}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.12, mixBlendMode: "screen" }}>
        <filter id={`ts${frame % 4}`}>
          <feTurbulence type="fractalNoise" baseFrequency={1.1} numOctaves={1} seed={frame % 41} />
          <feColorMatrix values="0 0 0 0 0.7  0 0 0 0 0.8  0 0 0 0 0.95  0 0 0 0.6 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#ts${frame % 4})`} />
      </svg>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", transform: `scale(${zoom})` }}>
        <div style={{ textAlign: "center", color: "#f2f2ef", fontFamily: SERIF }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 600,
              letterSpacing: "0.1em",
              lineHeight: 1.02,
              opacity: titleA * flick,
              filter: `blur(${(1 - titleA) * 12}px)`,
              textShadow: "0 0 40px rgba(120,150,210,0.25)",
            }}
          >
            {SERIES_TITLE.split(" ").map((w) => (
              <div key={w}>{w}</div>
            ))}
          </div>
          <div style={{ width: 140 * subA + 1, height: 2, background: "#c9ced8", margin: "56px auto 40px", opacity: subA * 0.8 }} />
          <div style={{ opacity: subA, fontFamily: INTER, fontWeight: 500, fontSize: 34, letterSpacing: "0.42em", color: "#c7ccd6" }}>1. BÖLÜM</div>
          <div style={{ opacity: subA, marginTop: 18, fontSize: 64, fontWeight: 500, letterSpacing: "0.16em", color: "#eceae4" }}>{EPISODE_TITLE}</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ DEVAM EDECEK
export const EndCard: React.FC<{ r: number }> = ({ r }) => {
  const a = prog(r, 0, 0.7);
  return (
    <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 82, letterSpacing: "0.14em", color: "#f1f0ec", opacity: a, filter: `blur(${(1 - a) * 6}px)` }}>
        DEVAM EDECEK...
      </div>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ ANİMATİK BİLGİ ŞERİDİ
export const DebugHUD: React.FC<{ t: number }> = ({ t }) => {
  const frame = useCurrentFrame();
  const sc = SCENES.find((s) => t >= s.start && t < s.end) ?? SCENES[SCENES.length - 1];
  const line = ALL_LINES.find((l) => t >= l.at && t <= l.at + lineDuration(l));
  const mm = Math.floor(t / 60);
  const ss = (t % 60).toFixed(2).padStart(5, "0");
  return (
    <div style={{ position: "absolute", left: 18, top: 16, right: 18, fontFamily: MONO, fontSize: 21, color: "rgba(255,255,255,0.78)", textShadow: "0 1px 3px #000", lineHeight: 1.4, pointerEvents: "none" }}>
      <div>
        ANİMATİK · S{String(sc.n).padStart(2, "0")} {sc.title} · {mm}:{ss} · f{frame}/{120 * FPS}
      </div>
      {line && (
        <div style={{ opacity: 0.8 }}>
          {CHARACTERS[line.speaker].name} · {line.id} · {has(voicePath(line.id)) ? "ses ✓" : "ses yok (tahmini süre)"}
        </div>
      )}
    </div>
  );
};
