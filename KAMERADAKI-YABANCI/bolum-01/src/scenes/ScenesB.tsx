// SAHNE 07–12
import React from "react";
import { AbsoluteFill } from "remotion";
import { K } from "../components/Camera";
import { CharacterRig, LIGHT } from "../components/CharacterRig";
import { lerp, prog } from "../lib/anim";
import { BedroomInteriorBG, LivingRoomBG } from "../sets/Sets";
import {
  BedroomFromDoor,
  BedroomInterior,
  Cam01Content,
  HANDS,
  Hallway,
  HallwayReverse,
  LivingRoom,
  PhoneFeed,
  PhoneShot,
  pick,
  storyClock,
} from "./shared";

const blurredLivingRoom = (
  <div style={{ position: "absolute", left: -820, top: -100, width: 2400, height: 1920 }}>
    <LivingRoomBG />
  </div>
);
const blurredBedroom = <BedroomInteriorBG />;
const head = (y: number, s: number) => y - 1225 * s;

/** Odadaki sabit konumlar (S10–S18). */
export const ROOM = {
  keremDoorPov: { x: 540, y: 1720, scale: 0.82 }, // BR_DOOR_POV önünde, kameraya dönük
  defneDoorPov: { x: 560, y: 1760, scale: 0.72 },
  defneInterior: { x: 640, y: 1640, scale: 0.66 }, // BR_INTERIOR önünde (kapı arkasında)
};

/** CCTV'de yabancının konumu: Kerem'in hemen arkasında (S11–S14). */
export const STRANGER_BEHIND = { x: 455, y: 1520, scale: 0.6 };

// S07 · 00:38–00:45 · YATAĞIN BAŞINDAKİ YABANCI
export const S07: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 38;
  const { shot, sr } = pick(r, [
    [0, "phone"],
    [2.0, "defne"],
    [3.95, "kerem"],
  ] as const);
  if (shot === "phone")
    return (
      <PhoneShot r={sr} path={[K(0, 540, 960, 1.0), K(2.0, 540, 880, 1.5)]} bg={blurredLivingRoom} hands={HANDS.kerem}>
        {({ w, rot }) => (
          <PhoneFeed w={w} rot={rot} camLabel="CAM 01 - YATAK ODASI" clockSec={storyClock(t)} glitch={0.05} zoom={{ x: 620, y: 960, z: lerp(1, 1.3, prog(sr, 0.3, 2)) }}>
            <Cam01Content t={t} stranger={{ x: 640, y: 1330, scale: 0.62, headTurn: 0.15 }} />
          </PhoneFeed>
        )}
      </PhoneShot>
    );
  return (
    <AbsoluteFill>
      {shot === "defne" && (
        <LivingRoom
          t={t}
          r={sr}
          path={[K(0, 1458, 832, 3.4), K(1.95, 1460, 826, 3.95)]}
          shake={0.3}
          kerem={{ hands: "phone" }}
          defne={{ eyes: "wide", brows: "fear", look: [-0.7, 0.45], turn: -0.4, fear: 0.85, hands: "chest", light: { ...LIGHT.lampWarm, phone: 0.55 } }}
        />
      )}
      {shot === "kerem" && (
        <LivingRoom
          t={t}
          r={sr}
          path={[K(0, 1002, 785, 2.3), K(3.05, 1004, 768, 2.8)]}
          shake={0.2}
          kerem={{ eyes: "wide", brows: sr > 1.4 ? "concern" : "fear", look: [0.15, 0.85], hands: "phone", fear: 0.45, light: { ...LIGHT.lampWarm, phone: 0.6 } }}
          defne={{ eyes: "wide", brows: "fear", look: [-0.8, 0.4], turn: -0.5, fear: 0.85, hands: "chest" }}
        />
      )}
    </AbsoluteFill>
  );
};

// S08 · 00:45–00:52 · ABİNİN KARARI
export const S08: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 45;
  const rise = prog(r, 0.02, 0.75);
  const kx = lerp(1000, 1090, prog(r, 0.15, 0.85));
  const keremStand = { x: kx, y: 1580, scale: 0.86, pose: "sit" as const, rise, hands: "down" as const };
  const defne = { eyes: "wide" as const, brows: "fear" as const, hands: "phone" as const, fear: 0.85, turn: -0.35, look: [-0.4, -0.8] as [number, number] };
  const { shot, sr } = pick(r, [
    [0, "rise"],
    [0.85, "defne"],
    [3.15, "kerem"],
  ] as const);
  return (
    <AbsoluteFill>
      {shot === "rise" && (
        <LivingRoom t={t} r={sr} path={[K(0, 1120, 1010, 1.45), K(0.85, 1130, 900, 1.6)]} shake={0.45} kerem={{ ...keremStand, brows: "determined", look: [0.6, 0.2], turn: 0.4 }} defne={defne} />
      )}
      {shot === "defne" && (
        <LivingRoom t={t} r={sr} path={[K(0, 1478, 852, 2.4), K(2.3, 1472, 838, 2.8)]} shake={0.35} kerem={{ ...keremStand, rise: 1, turn: 0.7, look: [0.8, 0.6], brows: "determined" }} defne={defne} />
      )}
      {shot === "kerem" && (
        <LivingRoom
          t={t}
          r={sr}
          path={[K(0, 1090, 600, 1.9), K(3.85, 1088, 540, 2.6)]}
          shake={0.2}
          kerem={{ ...keremStand, rise: 1, brows: "determined", eyes: "normal", look: [0.55, 0.6], turn: 0.55, fear: 0.3 }}
          defne={defne}
        />
      )}
    </AbsoluteFill>
  );
};

// S09 · 00:52–00:59 · KARANLIK KORİDOR
export const S09: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 52;
  const { shot, sr } = pick(r, [
    [0, "rear"],
    [2.8, "defneRev"],
    [4.4, "keremRev"],
  ] as const);
  if (shot === "rear") {
    const p = prog(sr, 0, 2.8, (x) => x);
    return (
      <Hallway t={t} r={sr} path={[K(0, 540, 1010, 1.0), K(2.8, 540, 960, 1.22)]} shake={0.55}>
        <CharacterRig id="kerem" t={t} view="back" pose="walk" walk={sr * 0.85} x={600} y={lerp(1880, 1760, p)} scale={lerp(0.95, 0.86, p)} light={LIGHT.hallway} />
        <CharacterRig id="defne" t={t} view="back" pose="walk" walk={sr * 0.85 + 0.35} x={360} y={lerp(2080, 1960, p)} scale={lerp(1.08, 0.98, p)} light={LIGHT.hallway} />
      </Hallway>
    );
  }
  if (shot === "defneRev")
    return (
      <HallwayReverse r={sr} path={[K(0, 540, 690, 2.35), K(1.6, 540, 680, 2.65)]}>
        <CharacterRig id="defne" t={t} x={540} y={1900} scale={1.0} pose="walk" walk={sr * 0.35} hands="chest" eyes="wide" brows="fear" look={[0.25, -0.2]} fear={0.75} light={LIGHT.hallway} />
      </HallwayReverse>
    );
  return (
    <HallwayReverse r={sr} path={[K(0, 560, 700, 1.9), K(2.6, 585, 688, 2.2)]}>
      <CharacterRig id="defne" t={t} x={410} y={1720} scale={0.8} pose="walk" walk={sr * 0.35 + 0.5} hands="chest" eyes="wide" brows="fear" look={[0.5, -0.1]} fear={0.75} light={LIGHT.hallway} />
      <CharacterRig id="kerem" t={t} x={610} y={1900} scale={1.0} pose="walk" walk={sr * 0.35} brows="determined" look={[-0.35, 0]} turn={-0.25} fear={0.4} light={LIGHT.hallway} />
    </HallwayReverse>
  );
};

// S10 · 00:59–01:06 · BOŞ ODA
export const S10: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 59;
  const { shot, sr } = pick(r, [
    [0, "pov"],
    [1.9, "kerem"],
    [4.45, "defne"],
  ] as const);
  if (shot === "pov") {
    const open = prog(sr, 0.1, 1.5);
    return (
      <BedroomFromDoor
        r={sr}
        path={[K(0, 540, 1000, 1.0), K(1.05, 540, 980, 1.12), K(1.9, 760, 1160, 1.42)]}
        fg={
          <div
            style={{
              position: "absolute",
              left: 0,
              top: -200,
              width: 1080 * (1 - open) + 60,
              height: 2400,
              background: "linear-gradient(90deg,#120a05,#24160c)",
              boxShadow: "20px 0 40px rgba(0,0,0,0.6)",
            }}
          />
        }
      />
    );
  }
  const keremPos = { x: 650, y: 1560, scale: 0.62 };
  const defnePos = { x: 742, y: 1440, scale: 0.5 };
  const lookAround = Math.sin(prog(r, 2.0, 4.4) * Math.PI * 1.5);
  return (
    <BedroomInterior r={sr} path={shot === "kerem" ? [K(0, 650, head(1560, 0.62), 2.0), K(2.55, 652, head(1560, 0.62) - 8, 2.45)] : [K(0, 742, head(1440, 0.5), 2.75), K(2.55, 742, head(1440, 0.5) - 6, 3.2)]}>
      <CharacterRig id="defne" t={t} {...defnePos} hands="phone" eyes="wide" brows="fear" fear={0.75} look={[-0.2, 0.3]} light={LIGHT.phone} />
      <CharacterRig id="kerem" t={t} {...keremPos} brows="concern" turn={lookAround * 0.7} look={[lookAround, 0]} fear={0.3} light={LIGHT.moon} />
    </BedroomInterior>
  );
};

// S11 · 01:06–01:14 · ARKASINDAKİ ADAM
export const S11: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 66;
  const { shot, sr } = pick(r, [
    [0, "phone"],
    [1.15, "defne"],
    [3.35, "turn"],
    [5.6, "back"],
  ] as const);
  if (shot === "phone")
    return (
      <PhoneShot r={sr} path={[K(0, 540, 960, 1.15), K(1.15, 525, 900, 1.45)]} bg={blurredBedroom} hands={HANDS.defne} shake={0.6}>
        {({ w, rot }) => (
          <PhoneFeed w={w} rot={rot} camLabel="CAM 01 - YATAK ODASI" clockSec={storyClock(t)} glitch={sr < 0.25 ? 0.9 : 0.06}>
            <Cam01Content t={t} siblings stranger={{ ...STRANGER_BEHIND, headTurn: 0.3 }} />
          </PhoneFeed>
        )}
      </PhoneShot>
    );
  if (shot === "defne")
    return (
      <BedroomInterior r={sr} shake={0.7} path={[K(0, 640, head(1640, 0.66), 2.8), K(2.2, 640, head(1640, 0.66) - 6, 3.6)]}>
        <CharacterRig id="defne" t={t} {...ROOM.defneInterior} hands="phone" eyes="wide" brows="fear" fear={0.95} look={[0.5, -0.3]} turn={0.15} light={LIGHT.phone} />
      </BedroomInterior>
    );
  const k = ROOM.keremDoorPov;
  if (shot === "turn") {
    const turned = sr > 0.18;
    return (
      <BedroomFromDoor r={sr} shake={1.0} path={[K(0, 540, head(k.y, k.scale), 2.0), K(0.35, 540, head(k.y, k.scale) + 20, 1.85), K(2.25, 560, 900, 1.45)]}>
        <CharacterRig id="kerem" t={t} {...k} view={turned ? "back" : "front"} turn={turned ? 0 : prog(sr, 0, 0.18) * 1} eyes="wide" brows="fear" fear={0.8} light={LIGHT.moon} />
      </BedroomFromDoor>
    );
  }
  return (
    <BedroomFromDoor r={sr} shake={0.7} path={[K(0, 540, head(k.y, k.scale), 2.25), K(2.4, 540, head(k.y, k.scale) - 10, 2.6)]}>
      <CharacterRig id="kerem" t={t} {...k} eyes="wide" brows="fear" fear={0.85} look={[0.3, 0.2]} turn={lerp(0.9, 0.1, prog(sr, 0, 0.4))} light={LIGHT.moon} />
    </BedroomFromDoor>
  );
};

// S12 · 01:14–01:21 · GÖRÜNTÜ CANLI
export const S12: React.FC<{ t: number }> = ({ t }) => {
  const r = t - 74;
  const { shot, sr } = pick(r, [
    [0, "phone"],
    [1.5, "kerem"],
    [3.6, "phone2"],
    [4.95, "defne"],
  ] as const);
  const headTurn = lerp(0.3, 1, prog(r, 0.4, 4.6));
  const lean = prog(r, 3.7, 4.9) * 0.45;
  if (shot === "phone" || shot === "phone2")
    return (
      <PhoneShot r={sr} path={shot === "phone" ? [K(0, 540, 960, 1.3), K(1.5, 540, 930, 1.55)] : [K(0, 540, 930, 1.6), K(1.35, 540, 920, 1.75)]} bg={blurredBedroom} hands={HANDS.defne} shake={0.4}>
        {({ w, rot }) => (
          <PhoneFeed
            w={w}
            rot={rot}
            camLabel="CAM 01 - YATAK ODASI"
            clockSec={storyClock(t)}
            glitch={shot === "phone2" && sr < 0.3 ? 0.8 : 0.07}
            zoom={{ x: 470, y: 760, z: shot === "phone" ? lerp(1, 1.45, prog(sr, 0, 1.5)) : lerp(1.6, 1.9, prog(sr, 0, 1.35)) }}
          >
            <Cam01Content t={t} siblings stranger={{ ...STRANGER_BEHIND, headTurn, lean }} />
          </PhoneFeed>
        )}
      </PhoneShot>
    );
  const k = ROOM.keremDoorPov;
  if (shot === "kerem")
    return (
      <BedroomFromDoor r={sr} shake={0.35} path={[K(0, 540, head(k.y, k.scale), 2.35), K(2.1, 540, head(k.y, k.scale) - 8, 2.7)]}>
        <CharacterRig id="kerem" t={t} {...k} brows="concern" eyes="normal" look={[0.15, 0.9]} fear={0.5} light={{ ...LIGHT.moon, phone: 0.5 }} />
      </BedroomFromDoor>
    );
  const d = ROOM.defneInterior;
  const recoil = prog(sr, 0.1, 0.7);
  return (
    <BedroomInterior r={sr} shake={0.8} path={[K(0, 640, head(d.y, d.scale), 2.7), K(2.05, 645, head(d.y, d.scale) - 4, 3.1)]}>
      <CharacterRig id="defne" t={t} {...d} y={d.y - recoil * 20} hands="phone" eyes="wide" brows="fear" fear={1} tilt={-6 * recoil} turn={-0.35 * recoil} look={[0.2, 0.5]} light={LIGHT.phone} />
    </BedroomInterior>
  );
};
