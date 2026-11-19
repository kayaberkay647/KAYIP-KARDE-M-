// SAHNE 01–06
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Camera, K, Layer } from "../components/Camera";
import { LIGHT } from "../components/CharacterRig";
import { Fade, TitleSequence } from "../components/Overlays";
import { CCTVFeed, MotionNotification, Phone } from "../components/Surveillance";
import { prog } from "../lib/anim";
import { Plate, TableInsertBG } from "../sets/Sets";
import { Cam01Content, LivingRoom, pick, storyClock } from "./shared";

// S01 · 00:00–00:06 · GECE KAMERASI — sabit geniş açılı güvenlik kamerası
export const S01: React.FC<{ t: number }> = ({ t }) => {
  const r = t;
  const turn = prog(r, 4.0, 5.7);
  const glitch = 0.04 + prog(r, 5.35, 5.8) * 0.8;
  return (
    <AbsoluteFill>
      <CCTVFeed w={1080} h={1920} label="CAM 01" clockSec={7 + r} glitch={glitch} noise={0.42}>
        <Cam01Content t={t} stranger={{ x: 640, y: 1330, scale: 0.62, headTurn: turn * 0.98 }} />
      </CCTVFeed>
      <Fade t={r} at={5.72} dur={0.2} />
    </AbsoluteFill>
  );
};

// S02 · 00:06–00:11 · JENERİK
export const S02: React.FC<{ t: number }> = ({ t }) => <TitleSequence r={t - 6} />;

// S03 · 00:11–00:18 · KARDEŞLERİN KONUŞMASI
export const S03: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 11;
  const { shot, sr } = pick(r, [
    [0, "wide"],
    [1.25, "kerem"],
    [3.75, "defne"],
  ] as const);
  const defne = { eyes: "tired" as const, brows: "concern" as const, look: [-0.5, 0.15] as [number, number], turn: -0.35, fear: 0.25 };
  const kerem = { eyes: "tired" as const, brows: "neutral" as const, look: [0.7, 0.1] as [number, number], turn: 0.45 };
  return (
    <AbsoluteFill>
      {shot === "wide" && <LivingRoom t={t} r={sr} path={[K(0, 1240, 1010, 1.0), K(1.25, 1200, 985, 1.08)]} kerem={kerem} defne={defne} />}
      {shot === "kerem" && (
        <LivingRoom t={t} r={sr} path={[K(0, 1050, 830, 1.75), K(2.5, 1015, 790, 2.35)]} kerem={{ ...kerem, brows: sr > 0.8 ? "concern" : "neutral" }} defne={defne} />
      )}
      {shot === "defne" && (
        <LivingRoom
          t={t}
          r={sr}
          path={[K(0, 1445, 880, 2.0), K(3.25, 1458, 850, 2.6)]}
          kerem={kerem}
          defne={{ ...defne, eyes: sr > 1.3 ? "normal" : "tired", brows: "fear", look: sr > 1.1 ? [-0.8, -0.1] : [-0.4, 0.4], fear: 0.4 }}
        />
      )}
      <Fade t={r} at={0} dur={0.5} inOut="in" />
    </AbsoluteFill>
  );
};

// S04 · 00:18–00:25 · GÜVENLİK KAMERASI
export const S04: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 18;
  const { shot, sr } = pick(r, [
    [0, "ots"],
    [3.6, "defne"],
  ] as const);
  if (shot === "ots") {
    // Kerem'in omzunun üzerinden: telefon ekranı keskin, Defne arka planda yumuşak
    const lift = prog(sr, 0, 0.8);
    return (
      <AbsoluteFill>
        <LivingRoom
          t={t}
          r={sr}
          path={[K(0, 1420, 905, 1.9, 1.45), K(3.6, 1405, 890, 2.05, 1.45)]}
          kerem={null}
          defne={{ eyes: "normal", brows: "concern", look: sr > 2.2 ? [-0.6, 0.5] : [0.1, 0.8], turn: -0.2, fear: 0.35, hands: sr > 2.4 ? "chest" : "lap" }}
        />
        <Camera r={sr} path={[K(0, 540, 960, 1), K(3.6, 540, 930, 1.06)]} background="transparent" shake={0.25}>
          <Layer depth={1}>
            <div style={{ position: "absolute", left: -180, top: 1180, width: 640, height: 900, borderRadius: "48%", background: "#121b2e", filter: "blur(10px)" }} />
            <Phone x={600} y={1380 - lift * 120} w={430} rot={-6} glow={0.9}>
              <div style={{ position: "absolute", inset: 0 }}>
                <CCTVFeed w={402} h={858} label="CAM 01" clockSec={storyClock(t)} showRec={false} labelSize={16}>
                  <Cam01Content t={t} />
                </CCTVFeed>
                <div style={{ position: "absolute", left: 14, top: 14, background: "rgba(200,20,20,0.9)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "3px 9px", borderRadius: 5, fontFamily: "sans-serif" }}>
                  ● LIVE
                </div>
              </div>
            </Phone>
            <div style={{ position: "absolute", left: 390, top: 1560 - lift * 120, width: 150, height: 210, borderRadius: 70, background: "#b98c6e", filter: "brightness(0.5)" }} />
          </Layer>
        </Camera>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <LivingRoom
        t={t}
        r={sr}
        path={[K(0, 1458, 855, 2.45), K(3.4, 1464, 835, 2.95)]}
        kerem={{ hands: "phone", turn: 0.5 }}
        defne={{ eyes: "normal", brows: "fear", look: sr > 2.9 ? [0.9, -0.1] : [-0.7, 0.55], turn: sr > 2.9 ? 0.5 : -0.3, fear: 0.45, hands: "chest" }}
      />
    </AbsoluteFill>
  );
};

// S05 · 00:25–00:31 · KORİDORDAKİ SES
export const S05: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 25;
  const { shot, sr } = pick(r, [
    [0, "defneEyes"],
    [2.55, "kerem"],
    [4.95, "hall"],
  ] as const);
  const headTurn = prog(r, 0.35, 0.95);
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {shot === "defneEyes" && (
        <LivingRoom
          t={t}
          r={sr}
          path={[K(0, 1458, 838, 3.2), K(2.55, 1462, 828, 3.75)]}
          shake={0.15}
          kerem={{ hands: "phone" }}
          defne={{ eyes: "wide", brows: "fear", turn: -0.3 + headTurn * 1.1, look: [-0.6 + headTurn * 1.6, -0.05], fear: 0.55, hands: "chest" }}
        />
      )}
      {shot === "kerem" && (
        <LivingRoom
          t={t}
          r={sr}
          path={[K(0, 1010, 795, 2.2), K(2.4, 1022, 782, 2.45)]}
          kerem={{ turn: 0.85, look: [1, -0.1], brows: "concern", hands: "phone", fear: 0.2 }}
          defne={{ eyes: "wide", brows: "fear", turn: 0.8, look: [1, 0], fear: 0.55, hands: "chest" }}
        />
      )}
      {shot === "hall" && (
        <LivingRoom
          t={t}
          r={sr}
          path={[K(0, 2190, 910, 1.7, 1.25), K(0.6, 2190, 905, 1.85, 0.92), K(1.05, 2190, 900, 2.0, 0.92)]}
          hallLight={frame % 9 < 2 ? 0.1 : 0.42}
        />
      )}
    </AbsoluteFill>
  );
};

// S06 · 00:31–00:38 · TELEFON UYARISI
export const S06: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 31;
  const frame = useCurrentFrame();
  const { shot, sr } = pick(r, [
    [0, "macro"],
    [1.15, "defne"],
    [3.6, "kerem"],
  ] as const);
  if (shot === "macro") {
    const on = r >= 0.3;
    const vib = (r > 0.3 && r < 0.75) || (r > 0.95 && r < 1.15) ? Math.sin(frame * 2.7) * 6 : 0;
    return (
      <Camera r={sr} path={[K(0, 540, 980, 1.18), K(1.15, 540, 960, 1.38)]} shake={0}>
        <Layer depth={0.95}>
          <Plate set="LR_TABLE_INSERT" fallback={<TableInsertBG />} />
        </Layer>
        <Layer depth={1}>
          <Phone x={540 + vib} y={960} w={560} rot={9} screenOn={on} glow={on ? 1 : 0}>
            <MotionNotification sw={532} appear={prog(r, 0.3, 0.55)} text="CAM 01 - HAREKET ALGILANDI - 03:13" />
          </Phone>
        </Layer>
      </Camera>
    );
  }
  const pickUp = prog(r, 4.3, 5.0);
  return (
    <AbsoluteFill>
      {shot === "defne" && (
        <LivingRoom
          t={t}
          r={sr}
          path={[K(0, 1452, 870, 2.2), K(2.45, 1456, 848, 2.55)]}
          shake={0.2}
          kerem={{ turn: 0.2, look: [0, 1], brows: "concern" }}
          defne={{ eyes: "wide", brows: "fear", look: [-0.55, 0.8], turn: -0.35, fear: 0.65, hands: "chest", tilt: -2 }}
          extra={<div style={{ position: "absolute", left: 1180, top: 1540, width: 220, height: 160, background: "radial-gradient(closest-side, rgba(150,190,255,0.35), rgba(150,190,255,0))" }} />}
        />
      )}
      {shot === "kerem" && (
        <LivingRoom
          t={t}
          r={sr}
          path={[K(0, 1000, 805, 2.05), K(3.4, 1004, 772, 2.55)]}
          kerem={{ brows: "determined", look: pickUp > 0.5 ? [0.1, 0.9] : [0.2, 1], turn: 0.15, hands: pickUp > 0.5 ? "phone" : "lap", light: pickUp > 0.5 ? { ...LIGHT.lampWarm, phone: 0.6 } : LIGHT.lampWarm }}
          defne={{ eyes: "wide", brows: "fear", look: [-0.8, 0.4], turn: -0.6, fear: 0.6, hands: "chest" }}
        />
      )}
    </AbsoluteFill>
  );
};

