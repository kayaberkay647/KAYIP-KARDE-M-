// SAHNE 13–18
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { Camera, K, Layer } from "../components/Camera";
import { CharacterRig, LIGHT } from "../components/CharacterRig";
import { EndCard } from "../components/Overlays";
import { lerp, prog } from "../lib/anim";
import { BedroomInteriorBG, DoorHandle, DoorInsideInsertBG, Plate, WallCamInsertBG } from "../sets/Sets";
import {
  BedroomFromDoor,
  BedroomInterior,
  BehindContent,
  Cam01Content,
  Cam02Content,
  HANDS,
  HallwayReverse,
  PhoneFeed,
  PhoneShot,
  pick,
  storyClock,
} from "./shared";
import { ROOM, STRANGER_BEHIND } from "./ScenesB";

const head = (y: number, s: number) => y - 1225 * s;
const blurredBedroom = <BedroomInteriorBG />;

/** Duvar kamerası insert'i: kablo, fiş, LED ve Kerem'in eli (1080x1920). */
const WallCamRig: React.FC<{ plugOut: number; ledOn: boolean; handVisible: boolean }> = ({ plugOut, ledOn, handVisible }) => {
  const frame = useCurrentFrame();
  const sway = plugOut > 0.99 ? noise2D("cab", frame * 0.05, 0) * 14 : 0;
  const px = 540 + plugOut * 120 + sway;
  const py = 1500 + plugOut * 140;
  const ps = 1 + plugOut * 0.25;
  return (
    <svg viewBox="0 0 1080 1920" style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920 }}>
      {/* kablo */}
      <path d={`M 560 410 C 560 800 ${520 + sway} 1100 ${px} ${py - 70 * ps}`} stroke="#d9dbdd" strokeWidth={9} fill="none" />
      <path d={`M 560 410 C 560 800 ${520 + sway} 1100 ${px} ${py - 70 * ps}`} stroke="#000" strokeOpacity={0.25} strokeWidth={3} fill="none" transform="translate(3 0)" />
      {/* fiş */}
      <g transform={`translate(${px} ${py}) scale(${ps})`}>
        <rect x={-48} y={-70} width={96} height={110} rx={18} fill="#e4e5e3" />
        <rect x={-48} y={-70} width={96} height={110} rx={18} fill="#000" opacity={0.22} />
        {plugOut > 0.05 && (
          <g fill="#b9b39a">
            <rect x={-30} y={40} width={10} height={44} rx={4} />
            <rect x={20} y={40} width={10} height={44} rx={4} />
          </g>
        )}
      </g>
      {/* LED */}
      <circle cx={430} cy={270} r={9} fill={ledOn ? "#3dff8a" : "#16241b"} />
      {ledOn && <circle cx={430} cy={270} r={34} fill="#3dff8a" opacity={0.25} />}
      {/* el */}
      {handVisible && (
        <g transform={`translate(${px + 40} ${py - 10})`}>
          <path d="M 40 -40 C 160 -50 260 40 300 160 L 520 320 L 520 700 L 200 520 C 120 420 40 300 20 160 Z" fill="#18233a" />
          <path d="M -40 -60 C 10 -100 90 -90 120 -40 C 150 10 150 90 110 140 C 60 180 -10 170 -50 120 C -80 70 -80 -20 -40 -60 Z" fill="#c69676" />
          <path d="M -60 -30 C -90 -10 -96 30 -70 46" stroke="#a87b5e" strokeWidth={22} strokeLinecap="round" fill="none" />
          <rect x={-40} y={-60} width={180} height={220} fill="#05070c" opacity={0.35} />
        </g>
      )}
    </svg>
  );
};

const WallCamShot: React.FC<{ r: number; path: ReturnType<typeof K>[]; plugOut: number; ledOn: boolean; hand: boolean }> = ({ r, path, plugOut, ledOn, hand }) => (
  <Camera r={r} path={path} shake={0.45} seed="wc">
    <Layer depth={0.97}>
      <Plate set="BR_WALLCAM_INSERT" fallback={<WallCamInsertBG />} />
    </Layer>
    <Layer depth={1}>
      <WallCamRig plugOut={plugOut} ledOn={ledOn} handVisible={hand} />
    </Layer>
  </Camera>
);

// S13 · 01:21–01:27 · KAMERANIN FİŞİ
export const S13: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 81;
  const { shot, sr } = pick(r, [
    [0, "kerem"],
    [2.5, "defne"],
    [4.4, "insert"],
  ] as const);
  if (shot === "kerem")
    return (
      <BedroomFromDoor r={sr} shake={0.6} path={[K(0, 360, 780, 1.6), K(2.5, 320, 650, 1.9)]}>
        <CharacterRig id="kerem" t={t} x={330} y={1650} scale={0.75} flip hands="reach" brows="determined" look={[-0.6, -0.8]} fear={0.5} light={LIGHT.moon} />
      </BedroomFromDoor>
    );
  if (shot === "defne") {
    const d = ROOM.defneDoorPov;
    return (
      <BedroomFromDoor r={sr} shake={0.6} path={[K(0, 560, head(d.y, d.scale), 2.6), K(1.9, 560, head(d.y, d.scale) - 6, 3.0)]}>
        <CharacterRig id="defne" t={t} {...d} hands="phone" eyes="wide" brows="fear" fear={0.9} look={[-0.7, -0.3]} turn={-0.4} light={LIGHT.phone} />
      </BedroomFromDoor>
    );
  }
  return (
    <WallCamShot
      r={sr}
      path={[K(0, 540, 1380, 1.35), K(0.45, 540, 1400, 1.35), K(1.6, 540, 430, 1.2)]}
      plugOut={prog(sr, 0.2, 0.4)}
      ledOn={sr < 0.3}
      hand
    />
  );
};

// S14 · 01:27–01:34 · İMKÂNSIZ GÖRÜNTÜ
export const S14: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 87;
  const { shot, sr } = pick(r, [
    [0, "insert"],
    [1.4, "kerem"],
    [3.8, "phone"],
    [5.4, "defne"],
  ] as const);
  if (shot === "insert") return <WallCamShot r={sr} path={[K(0, 600, 1420, 1.3), K(1.4, 540, 440, 1.3)]} plugOut={1} ledOn={false} hand />;
  if (shot === "kerem") {
    const k = ROOM.keremDoorPov;
    return (
      <BedroomFromDoor r={sr} camLed={false} shake={0.55} path={[K(0, 540, head(k.y, k.scale), 2.2), K(2.4, 540, head(k.y, k.scale) - 10, 2.6)]}>
        <CharacterRig id="kerem" t={t} {...k} hands="chest" eyes="wide" brows="fear" fear={0.7} look={[0.3, 0.7]} turn={0.25} light={{ ...LIGHT.moon, phone: 0.5 }} />
      </BedroomFromDoor>
    );
  }
  if (shot === "phone")
    return (
      <PhoneShot r={sr} path={[K(0, 540, 960, 1.15), K(1.6, 540, 900, 1.6)]} bg={blurredBedroom} hands={HANDS.defne} shake={0.3}>
        {({ w, rot }) => (
          <PhoneFeed w={w} rot={rot} camLabel="CAM 01 - YATAK ODASI" clockSec={storyClock(t)} glitch={0.05}>
            <Cam01Content t={t} siblings stranger={{ ...STRANGER_BEHIND, headTurn: 1, lean: 0.45 }} />
          </PhoneFeed>
        )}
      </PhoneShot>
    );
  const d = ROOM.defneInterior;
  return (
    <BedroomInterior r={sr} shake={0.4} path={[K(0, 640, head(d.y, d.scale), 3.0), K(1.6, 640, head(d.y, d.scale) - 4, 3.35)]}>
      <CharacterRig id="defne" t={t} {...d} hands="phone" eyes="wide" brows="fear" fear={0.8} look={[0, 0.85]} light={LIGHT.phone} />
    </BedroomInterior>
  );
};

// S15 · 01:34–01:40 · İKİNCİ KAMERA
export const S15: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 94;
  const { shot, sr } = pick(r, [
    [0, "phone"],
    [1.0, "defne"],
    [3.4, "kerem"],
  ] as const);
  if (shot === "phone") {
    const switched = sr >= 0.35;
    return (
      <PhoneShot r={sr} path={[K(0, 540, 960, 1.1), K(0.35, 540, 960, 1.15), K(1.0, 420, 470, 2.0)]} bg={blurredBedroom} hands={HANDS.defne} shake={0.25}>
        {({ w, rot }) => (
          <PhoneFeed
            w={w}
            rot={rot}
            camLabel={switched ? "CAM 02 - KORIDOR" : "CAM 01 - YATAK ODASI"}
            clockSec={storyClock(t)}
            glitch={sr > 0.25 && sr < 0.6 ? 0.95 : 0.05}
            labelHighlight={switched ? 1 : 0}
          >
            {switched ? <Cam02Content /> : <Cam01Content t={t} siblings stranger={{ ...STRANGER_BEHIND, headTurn: 1, lean: 0.45 }} />}
          </PhoneFeed>
        )}
      </PhoneShot>
    );
  }
  if (shot === "defne") {
    const d = ROOM.defneDoorPov;
    return (
      <BedroomFromDoor r={sr} camLed={false} shake={0.3} path={[K(0, 560, head(d.y, d.scale), 2.6), K(2.4, 560, head(d.y, d.scale) - 8, 2.9)]}>
        <CharacterRig id="defne" t={t} {...d} hands="phone" eyes="wide" brows="concern" fear={0.65} look={[-0.9, -0.2]} turn={-0.55} light={LIGHT.phone} />
      </BedroomFromDoor>
    );
  }
  const k = ROOM.keremDoorPov;
  return (
    <BedroomFromDoor r={sr} camLed={false} shake={0.2} path={[K(0, 540, head(k.y, k.scale), 2.4), K(2.6, 540, head(k.y, k.scale) - 10, 2.9)]}>
      <CharacterRig id="kerem" t={t} {...k} eyes="wide" brows="fear" fear={0.6} look={[0.65, 0.35]} turn={0.4} light={LIGHT.moon} />
    </BedroomFromDoor>
  );
};

// S16 · 01:40–01:47 · KORİDORDAKİ YABANCI
export const S16: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 100;
  const { shot, sr } = pick(r, [
    [0, "phone"],
    [1.0, "defne"],
    [2.9, "hall"],
    [4.2, "kerem"],
    [6.0, "phone2"],
  ] as const);
  if (shot === "phone" || shot === "phone2")
    return (
      <PhoneShot r={sr} path={shot === "phone" ? [K(0, 540, 960, 1.2), K(1.0, 540, 940, 1.4)] : [K(0, 540, 940, 1.3), K(1.0, 540, 920, 1.55)]} bg={blurredBedroom} hands={HANDS.defne} shake={0.4}>
        {({ w, rot }) => (
          <PhoneFeed w={w} rot={rot} camLabel="CAM 02 - KORIDOR" clockSec={storyClock(t)} glitch={0.06} zoom={{ x: 545, y: 860, z: shot === "phone" ? lerp(1.1, 1.6, prog(sr, 0, 1)) : 1.45 }}>
            <Cam02Content stranger doorOpen={shot === "phone" ? 1 : 1 - prog(sr, 0.15, 0.7)} />
          </PhoneFeed>
        )}
      </PhoneShot>
    );
  if (shot === "defne") {
    const d = ROOM.defneDoorPov;
    return (
      <BedroomFromDoor r={sr} camLed={false} shake={0.7} path={[K(0, 560, head(d.y, d.scale), 2.9), K(1.9, 560, head(d.y, d.scale) - 5, 3.4)]}>
        <CharacterRig id="defne" t={t} {...d} hands="phone" eyes="wide" brows="fear" fear={1} look={[0, 0.8]} light={LIGHT.phone} />
      </BedroomFromDoor>
    );
  }
  if (shot === "hall") return <HallwayReverse r={sr} shake={0.6} path={[K(0, 540, 960, 1.0), K(1.3, 540, 930, 1.18)]} />;
  return (
    <BedroomInterior r={sr} shake={0.5} path={[K(0, 650, head(1560, 0.62), 2.2), K(1.8, 652, head(1560, 0.62) - 6, 2.6)]}>
      <CharacterRig id="kerem" t={t} x={650} y={1560} scale={0.62} brows="determined" eyes="wide" fear={0.6} look={[0.4, 0.2]} turn={0.3} light={LIGHT.moon} />
    </BedroomInterior>
  );
};

// S17 · 01:47–01:54 · KAPI KOLUNDAKİ HAREKET
export const S17: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 107;
  const frame = useCurrentFrame();
  const { shot, sr } = pick(r, [
    [0, "handle"],
    [1.5, "defne"],
    [3.4, "phone"],
    [4.5, "kerem"],
  ] as const);
  if (shot === "handle") {
    const ang = 30 * prog(r, 0.2, 2.8) + noise2D("hd", frame * 0.2, 0) * 0.6;
    return (
      <Camera r={sr} path={[K(0, 540, 1000, 1.0), K(1.5, 470, 960, 1.2)]} shake={0.15} seed="dh">
        <Layer depth={0.97}>
          <Plate set="BR_DOOR_INSIDE_INSERT" fallback={<DoorInsideInsertBG />} />
        </Layer>
        <Layer depth={1}>
          <DoorHandle angle={ang} glint={prog(r, 0.2, 1.5)} />
        </Layer>
      </Camera>
    );
  }
  if (shot === "defne") {
    const d = ROOM.defneDoorPov;
    return (
      <BedroomFromDoor r={sr} camLed={false} shake={0.5} path={[K(0, 560, head(d.y, d.scale), 3.6), K(1.9, 560, head(d.y, d.scale) - 3, 4.0)]}>
        <CharacterRig id="defne" t={t} {...d} hands="phone" eyes="wide" brows="fear" fear={1} look={[0, -0.1]} light={LIGHT.phone} />
      </BedroomFromDoor>
    );
  }
  if (shot === "phone")
    return (
      <PhoneShot r={sr} path={[K(0, 540, 960, 1.35), K(1.1, 540, 940, 1.5)]} bg={blurredBedroom} hands={HANDS.defne} shake={0.5}>
        {({ w, rot }) => (
          <PhoneFeed w={w} rot={rot} camLabel="CAM 02 - KORIDOR" clockSec={storyClock(t)} glitch={0.08} zoom={{ x: 560, y: 800, z: 1.9 }}>
            <Cam02Content stranger doorOpen={0} strangerAt="door" />
          </PhoneFeed>
        )}
      </PhoneShot>
    );
  const k = ROOM.keremDoorPov;
  return (
    <BedroomFromDoor r={sr} camLed={false} shake={0.35} path={[K(0, 540, head(k.y, k.scale), 2.2), K(2.5, 540, head(k.y, k.scale) - 6, 3.0)]}>
      <CharacterRig id="kerem" t={t} {...k} eyes="wide" brows="fear" fear={0.75} look={[0, -0.05]} light={LIGHT.moon} />
    </BedroomFromDoor>
  );
};

// S18 · 01:54–02:00 · GİZEMLİ FİNAL
export const S18: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 114;
  const { shot, sr } = pick(r, [
    [0, "phone"],
    [1.2, "defne"],
    [2.6, "real"],
    [3.8, "eyes"],
    [4.5, "black"],
    [4.8, "end"],
  ] as const);
  const d = ROOM.defneDoorPov;
  if (shot === "phone")
    return (
      <PhoneShot r={sr} path={[K(0, 540, 960, 1.35), K(1.2, 540, 960, 1.6)]} bg={blurredBedroom} hands={HANDS.defne} shake={0.4}>
        {({ w, rot }) => (
          <PhoneFeed w={w} rot={rot} camLabel="CAM 0▒ - ▒▒▒▒▒▒" clockSec={storyClock(t)} glitch={sr < 0.3 ? 1 : 0.1} zoom={{ x: 540, y: 1200, z: lerp(1, 1.2, prog(sr, 0, 1.2)) }}>
            <BehindContent t={t} stranger />
          </PhoneFeed>
        )}
      </PhoneShot>
    );
  if (shot === "defne")
    return (
      <BedroomFromDoor r={sr} camLed={false} shake={0.4} path={[K(0, 560, head(d.y, d.scale), 3.0), K(1.4, 560, head(d.y, d.scale) - 4, 3.5)]}>
        <CharacterRig id="defne" t={t} {...d} hands="phone" eyes="wide" brows="fear" fear={1} look={[0, 0.8]} light={LIGHT.phone} />
      </BedroomFromDoor>
    );
  if (shot === "real")
    // Gerçek oda: telefondaki ile aynı kadraj — arkalarında HİÇBİR ŞEY yok.
    return (
      <BedroomInterior r={sr} shake={0.12} path={[K(0, 540, 1100, 1.0), K(1.2, 540, 1080, 1.06)]}>
        <CharacterRig id="kerem" t={t} x={600} y={1700} scale={0.78} view="back" fear={0.9} light={LIGHT.moon} speak={false} />
        <CharacterRig id="defne" t={t} x={400} y={1730} scale={0.7} view="back" fear={1} light={LIGHT.moon} speak={false} />
      </BedroomInterior>
    );
  if (shot === "eyes")
    return (
      <BedroomFromDoor r={sr} camLed={false} shake={0.1} path={[K(0, 560, head(d.y, d.scale) - 12, 4.6), K(0.7, 560, head(d.y, d.scale) - 12, 4.9)]}>
        <CharacterRig id="defne" t={t} {...d} hands="phone" eyes="wide" brows="fear" fear={1} look={[0, 0]} light={LIGHT.phone} />
      </BedroomFromDoor>
    );
  if (shot === "black") return <AbsoluteFill style={{ background: "#000" }} />;
  return <EndCard r={sr} />;
};
