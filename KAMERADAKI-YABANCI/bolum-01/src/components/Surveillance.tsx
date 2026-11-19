// Güvenlik kamerası görüntüsü + telefon cihazı ve kamera uygulaması arayüzü.
import React from "react";
import { random, useCurrentFrame } from "remotion";
import { MONO, INTER } from "../lib/fonts";

/** "03:13:07" biçimi. clockSec: 03:13:00'dan itibaren saniye. */
export const clockText = (clockSec: number) => {
  const total = 3 * 3600 + 13 * 60 + Math.floor(clockSec);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
};

/** Kayan kumlanma + tarama çizgisi + soğuk gece görüşü renk işlemi. */
export const CCTVFeed: React.FC<{
  w: number;
  h: number;
  /** Arka plan çizimi ve figürler — 1080x1920 sahne koordinatında */
  children: React.ReactNode;
  label: string;
  clockSec: number;
  glitch?: number;
  noise?: number;
  showRec?: boolean;
  /** İçerik yakınlaştırma (görüntü içi dijital zoom) */
  zoom?: { x: number; y: number; z: number };
  labelSize?: number;
}> = ({ w, h, children, label, clockSec, glitch = 0, noise = 0.35, showRec = true, zoom, labelSize }) => {
  const frame = useCurrentFrame();
  const sc = w / 1080;
  const z = zoom?.z ?? 1;
  const zx = zoom?.x ?? 540;
  const zy = zoom?.y ?? 960;
  const gl = glitch > 0 && random(`g${frame}`) < glitch ? (random(`gx${frame}`) - 0.5) * 60 * glitch : 0;
  const band = random(`gb${Math.floor(frame / 3)}`);
  const fs = labelSize ?? Math.max(16, 34 * sc);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, overflow: "hidden", background: "#000" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1080,
          height: 1920,
          transformOrigin: "0 0",
          transform: `scale(${sc}) translate(${540 - zx * z + gl}px, ${(h / sc) / 2 - zy * z}px) scale(${z})`,
          // Kızılötesi gece görüşü: oda açık gri, yabancı mutlak siyah kalır.
          filter: "grayscale(1) brightness(2.7) contrast(1.12) sepia(0.22) hue-rotate(165deg) saturate(0.65)",
        }}
      >
        {children}
      </div>
      {/* parazit / kumlanma */}
      <svg style={{ position: "absolute", inset: 0, width: w, height: h, opacity: noise, mixBlendMode: "screen" }}>
        <filter id={`n${frame % 7}`}>
          <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={frame % 97} />
          <feColorMatrix values="0 0 0 0 0.75  0 0 0 0 0.85  0 0 0 0 0.9  0 0 0 0.55 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#n${frame % 7})`} />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 1px, transparent 2px, transparent 4px)",
        }}
      />
      {glitch > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            width: w,
            top: band * h,
            height: 8 + random(`gh${frame}`) * 40 * glitch,
            background: "rgba(220,235,255,0.18)",
            transform: `translateX(${(random(`gt${frame}`) - 0.5) * 80 * glitch}px)`,
          }}
        />
      )}
      <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 ${120 * sc}px rgba(0,0,0,0.85)` }} />
      {/* kamera bilgileri */}
      <div style={{ position: "absolute", left: 30 * sc + 8, top: 34 * sc + 8, fontFamily: MONO, fontSize: fs, color: "#e8eef5", letterSpacing: "0.06em", textShadow: "0 0 4px rgba(0,0,0,0.9)" }}>
        {label}
      </div>
      <div style={{ position: "absolute", left: 30 * sc + 8, bottom: 40 * sc + 8, fontFamily: MONO, fontSize: fs, color: "#e8eef5", letterSpacing: "0.08em", textShadow: "0 0 4px rgba(0,0,0,0.9)" }}>
        {clockText(clockSec)}
      </div>
      {showRec && (
        <div style={{ position: "absolute", right: 30 * sc + 8, top: 34 * sc + 8, fontFamily: MONO, fontSize: fs, color: "#e8eef5", display: "flex", alignItems: "center", gap: 10 * sc + 4 }}>
          <span style={{ width: fs * 0.55, height: fs * 0.55, borderRadius: 99, background: "#ff3b30", opacity: Math.floor(frame / 15) % 2 ? 1 : 0.25 }} />
          REC
        </div>
      )}
    </div>
  );
};

/** Akıllı telefon gövdesi. Ekran içeriği children (ekran boyutu: w-32 x h-32). */
export const Phone: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  rot?: number;
  children?: React.ReactNode;
  screenOn?: boolean;
  glow?: number;
}> = ({ x, y, w = 600, h = 1240, rot = 0, children, screenOn = true, glow = 1 }) => {
  const r = w * 0.11;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, transform: `rotate(${rot}deg)` }}>
      {screenOn && glow > 0 && (
        <div
          style={{
            position: "absolute",
            left: -w * 0.6,
            top: -h * 0.4,
            width: w * 2.2,
            height: h * 1.8,
            background: "radial-gradient(closest-side, rgba(150,190,255,0.22), rgba(150,190,255,0))",
            opacity: glow,
            mixBlendMode: "screen",
          }}
        />
      )}
      <div style={{ position: "absolute", inset: 0, borderRadius: r, background: "linear-gradient(145deg,#2a2d33,#0a0b0d 40%,#1a1c20)", boxShadow: "0 30px 80px rgba(0,0,0,0.7)" }} />
      <div style={{ position: "absolute", inset: 14, borderRadius: r - 10, background: "#020304", overflow: "hidden" }}>
        {screenOn ? children : null}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 35%)" }} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 30, width: w * 0.2, height: w * 0.055, marginLeft: -w * 0.1, borderRadius: 99, background: "#000" }} />
    </div>
  );
};

/** Kamera uygulaması ekranı: başlık + canlı yayın + LIVE etiketi. Ekran boyutu: sw x sh. */
export const CameraApp: React.FC<{
  sw: number;
  sh: number;
  camLabel: string;
  sub?: string;
  live?: boolean;
  children: React.ReactNode;
  labelHighlight?: number;
}> = ({ sw, sh, camLabel, sub = "Canlı görüntü", live = true, children, labelHighlight = 0 }) => {
  const frame = useCurrentFrame();
  const feedTop = sh * 0.14;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#07090d", fontFamily: INTER, color: "#e9edf3" }}>
      <div style={{ position: "absolute", left: 30, right: 30, top: 18, display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 600, opacity: 0.9 }}>
        <span>03:13</span>
        <span style={{ letterSpacing: 2 }}>▮▮▮ 78%</span>
      </div>
      <div style={{ position: "absolute", left: 30, top: 62, fontSize: 30, fontWeight: 700, letterSpacing: "0.02em", color: labelHighlight > 0 ? `rgba(255,${255 - labelHighlight * 60},${255 - labelHighlight * 60},1)` : "#e9edf3" }}>
        {camLabel}
      </div>
      <div style={{ position: "absolute", left: 30, top: 100, fontSize: 19, opacity: 0.6 }}>{sub}</div>
      <div style={{ position: "absolute", left: 0, top: feedTop, width: sw, height: sh - feedTop - 90, overflow: "hidden" }}>{children}</div>
      {live && (
        <div style={{ position: "absolute", left: 22, top: feedTop + 18, display: "flex", alignItems: "center", gap: 8, background: "rgba(200,20,20,0.92)", padding: "5px 12px", borderRadius: 6, fontWeight: 700, fontSize: 20, letterSpacing: "0.08em" }}>
          <span style={{ width: 10, height: 10, borderRadius: 99, background: "#fff", opacity: Math.floor(frame / 18) % 2 ? 1 : 0.4 }} />
          LIVE
        </div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 26, display: "flex", justifyContent: "space-around", fontSize: 18, opacity: 0.55 }}>
        <span>● Kayıt</span>
        <span>⟲ Oynat</span>
        <span>⚙ Ayarlar</span>
      </div>
    </div>
  );
};

/** Kilit ekranı bildirim kartı. */
export const MotionNotification: React.FC<{ sw: number; appear: number; text: string }> = ({ sw, appear, text }) => (
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 20%, #10192c, #030407 70%)", fontFamily: INTER }}>
    <div style={{ position: "absolute", top: 140, width: "100%", textAlign: "center", color: "#dfe6f2", fontSize: 120, fontWeight: 300, letterSpacing: "-0.02em" }}>03:13</div>
    <div
      style={{
        position: "absolute",
        left: 22,
        width: sw - 44,
        top: 330 - (1 - appear) * 60,
        opacity: appear,
        background: "rgba(36,40,50,0.92)",
        borderRadius: 26,
        padding: "22px 24px",
        color: "#f1f4f8",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 19, opacity: 0.75, fontWeight: 600 }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, background: "#2f6fe4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>◉</span>
        EV KAMERASI · şimdi
      </div>
      <div style={{ marginTop: 12, fontSize: 25, fontWeight: 700, lineHeight: 1.25 }}>{text}</div>
    </div>
  </div>
);
