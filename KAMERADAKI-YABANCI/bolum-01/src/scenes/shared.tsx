// Sahneler arası ortak kurulumlar: salon, koridor, oda ve telefon/CCTV kompozisyonları.
// Tüm konumlar SABİT kat planına göredir (src/data/locations.ts).
import React from "react";
import { useCurrentFrame } from "remotion";
import { Camera, Layer, type CamKey } from "../components/Camera";
import { CharacterRig, LIGHT, type RigProps } from "../components/CharacterRig";
import { Stranger } from "../components/Stranger";
import { CameraApp, CCTVFeed, Phone } from "../components/Surveillance";
import {
  BedroomCam01BG,
  BedroomDoorPovBG,
  BedroomInteriorBG,
  ClockSecondHand,
  HallwayBG,
  HallwayCam02BG,
  LivingRoomBG,
  LivingRoomFG,
  LivingRoomLightFX,
  Plate,
  RainOnGlass,
  flickerAt,
} from "../sets/Sets";

export type ShotProps = { t: number; r: number };

/** Sahne zaman çizelgesi: r (sahne içi saniye) için aktif çekimi seçer. */
export function pick<T>(r: number, cuts: [number, T][]): { shot: T; sr: number; i: number } {
  let i = 0;
  for (let k = 0; k < cuts.length; k++) if (r >= cuts[k][0]) i = k;
  return { shot: cuts[i][1], sr: r - cuts[i][0], i };
}

// -------------------------------------------------- SALON
// Kerem kanepenin sol ucunda (x≈1000), Defne sağ ucunda (x≈1460). Sahne genişliği 2400.
export const KEREM_SOFA = { x: 1000, y: 1560, scale: 0.86 };
export const DEFNE_SOFA = { x: 1460, y: 1560, scale: 0.78 };
// Yüz merkezleri (kamera hedefi için)
export const faceOf = (pos: { x: number; y: number; scale: number }, sit = true) => ({
  x: pos.x,
  y: pos.y - (1400 - 175 - (sit ? 300 : 0)) * pos.scale,
});

export const LivingRoom: React.FC<{
  t: number;
  r: number;
  path: CamKey[];
  shake?: number;
  kerem?: Partial<RigProps> | null;
  defne?: Partial<RigProps> | null;
  extra?: React.ReactNode;
  hallLight?: number;
}> = ({ t, r, path, shake = 0, kerem = {}, defne = {}, extra, hallLight }) => {
  const frame = useCurrentFrame();
  return (
    <Camera r={r} path={path} stage={{ w: 2400, h: 1920 }} shake={shake} seed="lr">
      <Layer depth={0.92}>
        <Plate set="LR_MASTER" fallback={<LivingRoomBG />} />
        <RainOnGlass x={160} y={320} w={440} h={900} density={80} opacity={0.55} />
        <ClockSecondHand cx={1240} cy={640} startSec={20 + t} />
        {/* koridor tavan ışığı titremesi (koridor ağzının içinde) */}
        <div
          style={{
            position: "absolute",
            left: 2090,
            top: 560,
            width: 200,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(210,220,255,0.6), rgba(210,220,255,0))",
            opacity: hallLight ?? flickerAt(frame, "lrhall", 0.35),
          }}
        />
      </Layer>
      <Layer depth={1}>
        {kerem && <CharacterRig id="kerem" t={t} {...KEREM_SOFA} pose="sit" hands="lap" light={LIGHT.lampWarm} {...kerem} />}
        {defne && <CharacterRig id="defne" t={t} {...DEFNE_SOFA} pose="sit" hands="lap" blanket light={LIGHT.lampWarm} {...defne} />}
        {extra}
      </Layer>
      <Layer depth={1.12}>
        <Plate set="LR_MASTER" layer="fg.png" fallback={<LivingRoomFG />} />
      </Layer>
      <Layer depth={1} blur={0}>
        <LivingRoomLightFX />
      </Layer>
    </Camera>
  );
};

// -------------------------------------------------- KORİDOR
export const Hallway: React.FC<{
  t: number;
  r: number;
  path: CamKey[];
  shake?: number;
  children?: React.ReactNode;
  light?: number;
}> = ({ r, path, shake = 0.4, children, light }) => {
  const frame = useCurrentFrame();
  const l = light ?? flickerAt(frame, "hw", 0.8);
  return (
    <Camera r={r} path={path} shake={shake} seed="hw">
      <Layer depth={0.95}>
        <Plate set="HW_MASTER" fallback={<HallwayBG light={l} />} />
      </Layer>
      <Layer depth={1}>{children}</Layer>
    </Camera>
  );
};

// -------------------------------------------------- ODA (gerçek görüntü)
export const BedroomFromDoor: React.FC<{ r: number; path: CamKey[]; shake?: number; camLed?: boolean; children?: React.ReactNode; fg?: React.ReactNode }> = ({
  r,
  path,
  shake = 0.5,
  camLed = true,
  children,
  fg,
}) => (
  <Camera r={r} path={path} shake={shake} seed="bd">
    <Layer depth={0.9}>
      <Plate set="BR_DOOR_POV" fallback={<BedroomDoorPovBG camLed={camLed} />} />
      <RainOnGlass x={430} y={560} w={230} h={440} density={40} opacity={0.4} />
    </Layer>
    <Layer depth={1}>{children}</Layer>
    {fg && <Layer depth={1.15}>{fg}</Layer>}
  </Camera>
);

export const BedroomInterior: React.FC<{ r: number; path: CamKey[]; shake?: number; children?: React.ReactNode }> = ({ r, path, shake = 0.5, children }) => (
  <Camera r={r} path={path} shake={shake} seed="bi">
    <Layer depth={0.9}>
      <Plate set="BR_INTERIOR" fallback={<BedroomInteriorBG />} />
    </Layer>
    <Layer depth={1}>{children}</Layer>
  </Camera>
);

// -------------------------------------------------- KAMERA GÖRÜNTÜLERİ (CCTV içerikleri)
/** CAM 01 içeriği: yatak odası, isteğe bağlı yabancı ve kardeşler. 1080x1920 koordinat. */
export const Cam01Content: React.FC<{
  t: number;
  stranger?: { x: number; y: number; scale?: number; headTurn?: number; lean?: number } | null;
  siblings?: boolean;
  keremTurn?: number;
}> = ({ t, stranger, siblings, keremTurn = 0 }) => (
  <>
    <Plate set="BR_CAM01" fallback={<BedroomCam01BG />} />
    {siblings && (
      <>
        <CharacterRig id="defne" t={t} x={720} y={1640} scale={0.42} view="front" turn={-0.4} hands="phone" light={LIGHT.moon} speak={false} />
        <CharacterRig id="kerem" t={t} x={560} y={1560} scale={0.46} view={keremTurn > 0.5 ? "back" : "front"} light={LIGHT.moon} speak={false} />
      </>
    )}
    {stranger && <Stranger {...stranger} />}
  </>
);

/** CAM 02 içeriği. doorOpen: Defne'nin kapısının açıklığı (0 kapalı, 1 açık; S16'da kapanır). */
export const Cam02Content: React.FC<{ stranger?: boolean; strangerTurn?: number; doorOpen?: number; strangerAt?: "hall" | "door" }> = ({
  stranger,
  strangerTurn = 1,
  doorOpen = 0,
  strangerAt = "hall",
}) => (
  <>
    <Plate set="HW_CAM02" fallback={<HallwayCam02BG />} />
    {doorOpen > 0.01 && (
      <div style={{ position: "absolute", left: 465, top: 640, width: 150 * doorOpen, height: 260, background: "linear-gradient(180deg,#3a4150,#262a33)" }} />
    )}
    {stranger && (strangerAt === "hall" ? <Stranger x={540} y={1080} scale={0.3} headTurn={strangerTurn} /> : <Stranger x={575} y={960} scale={0.27} headTurn={0.15} lean={0.3} />)}
  </>
);

/** S18 imkânsız görüntü: kardeşlerin arkasından, kapıya doğru. */
export const BehindContent: React.FC<{ t: number; stranger: boolean }> = ({ t, stranger }) => (
  <>
    <Plate set="BR_INTERIOR" fallback={<BedroomInteriorBG />} />
    <CharacterRig id="kerem" t={t} x={600} y={1700} scale={0.78} view="back" light={LIGHT.moon} speak={false} />
    <CharacterRig id="defne" t={t} x={400} y={1730} scale={0.7} view="back" light={LIGHT.moon} speak={false} />
    {stranger && <Stranger x={830} y={1990} scale={0.95} headTurn={1} view="back" />}
  </>
);

/** Telefon (ekranda kamera uygulaması + CCTV görüntüsü) — tam ekran yakın plan için. */
export const PhoneFeed: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  rot?: number;
  camLabel: string;
  sub?: string;
  clockSec: number;
  glitch?: number;
  zoom?: { x: number; y: number; z: number };
  labelHighlight?: number;
  live?: boolean;
  children: React.ReactNode;
}> = ({ x = 540, y = 960, w = 600, rot = 0, camLabel, sub, clockSec, glitch, zoom, labelHighlight, live = true, children }) => {
  const h = w * 2.06;
  const sw = w - 28;
  const sh = h - 28;
  const feedTop = sh * 0.14;
  const fh = sh - feedTop - 90;
  return (
    <Phone x={x} y={y} w={w} h={h} rot={rot}>
      <CameraApp sw={sw} sh={sh} camLabel={camLabel} sub={sub} labelHighlight={labelHighlight} live={live}>
        <CCTVFeed w={sw} h={fh} label={camLabel.split(" - ")[0]} clockSec={clockSec} glitch={glitch} zoom={zoom} showRec={false} labelSize={18}>
          {children}
        </CCTVFeed>
      </CameraApp>
    </Phone>
  );
};

/** Hikâye saati (03:13:00'dan itibaren sn): bildirim 31.3'te 03:13:02, S07 canlı görüntü 03:13:09. */
export const storyClock = (t: number) => t - 29;

/** Ters koridor (kapıdan salona bakış). */
export const HallwayReverse: React.FC<{ r: number; path: CamKey[]; shake?: number; children?: React.ReactNode; light?: number }> = ({
  r,
  path,
  shake = 0.5,
  children,
  light,
}) => {
  const frame = useCurrentFrame();
  const l = light ?? flickerAt(frame, "hwr", 0.75);
  return (
    <Camera r={r} path={path} shake={shake} seed="hwr">
      <Layer depth={0.92}>
        <Plate set="HW_REVERSE" fallback={<HallwayBG light={l} reverse />} />
      </Layer>
      <Layer depth={1}>{children}</Layer>
    </Camera>
  );
};

/** Elde tutulan telefon yakın planı: arka plan bulanık mekân, ön planda telefon ve parmaklar. */
export const PhoneShot: React.FC<{
  r: number;
  path: CamKey[];
  bg: React.ReactNode;
  shake?: number;
  hands?: { skin: string; sleeve: string } | null;
  phoneW?: number;
  phoneRot?: number;
  children: (p: { w: number; rot: number }) => React.ReactNode;
}> = ({ r, path, bg, shake = 0.35, hands, phoneW = 600, phoneRot = 0, children }) => {
  const h = phoneW * 2.06;
  return (
    <Camera r={r} path={path} shake={shake} seed="ph" blurScale={0}>
      <Layer depth={0.6} blur={16}>
        <div style={{ position: "absolute", inset: 0, filter: "brightness(0.55)" }}>{bg}</div>
      </Layer>
      <Layer depth={1}>
        {children({ w: phoneW, rot: phoneRot })}
        {hands && (
          <div style={{ position: "absolute", left: 540 - phoneW / 2, top: 960 - h / 2, width: phoneW, height: h, transform: `rotate(${phoneRot}deg)` }}>
            {/* sol el: başparmak kenarda, avuç alt köşede */}
            <div style={{ position: "absolute", left: -70, top: h * 0.52, width: 130, height: 300, borderRadius: 70, background: hands.skin, filter: "brightness(0.55)" }} />
            <div style={{ position: "absolute", left: -150, top: h * 0.62, width: 190, height: 520, borderRadius: 90, background: hands.sleeve }} />
            <div style={{ position: "absolute", right: -60, top: h * 0.45, width: 90, height: 120, borderRadius: 45, background: hands.skin, filter: "brightness(0.5)" }} />
            <div style={{ position: "absolute", right: -64, top: h * 0.58, width: 92, height: 115, borderRadius: 45, background: hands.skin, filter: "brightness(0.45)" }} />
            <div style={{ position: "absolute", right: -60, top: h * 0.7, width: 88, height: 110, borderRadius: 44, background: hands.skin, filter: "brightness(0.4)" }} />
          </div>
        )}
      </Layer>
    </Camera>
  );
};

export const HANDS = {
  kerem: { skin: "#c9987a", sleeve: "#18233a" },
  defne: { skin: "#d2a283", sleeve: "#4f1a21" },
};
