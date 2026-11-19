// KARAKTER RİGİ (Kerem / Defne)
//
// İki çalışma modu:
//  A) KATMANLI ÇİZİM (final): public/assets/characters/<id>/<view>/ altında tüm katman PNG'leri
//     varsa, gerçek çizimler üst üste bindirilir; göz kırpma, nefes, baş hareketi, kaş ifadesi ve
//     dudak senkronu (viseme) kod tarafından katman değiştirilerek canlandırılır.
//  B) ANİMATİK YER TUTUCU: çizimler henüz yoksa, aynı rig mantığıyla çalışan vektör manken çizilir.
//     Kadraj, oyunculuk zamanlaması ve dudak senkronu bu modda da birebir kontrol edilebilir.
//
// Rig kutusu: 600 x 1400 birim, çapa noktası ayakların ortası (300, 1400).
import React, { useId } from "react";
import { Img, useCurrentFrame } from "remotion";
import { CHARACTERS } from "../data/characters";
import { ALL_LINES } from "../data/script";
import { blink, breath, tremble } from "../lib/anim";
import { charLayerPath, has, src } from "../lib/assets";
import { lineDuration, mouthAt, type MouthState, type Viseme } from "../lib/lipsync";
import { BACK_LAYERS, FRONT_REQUIRED } from "../data/rig";
import { noise2D } from "@remotion/noise";
import { FPS } from "../config";

export type Brow = "neutral" | "concern" | "fear" | "determined" | "tired";
export type EyeMode = "tired" | "normal" | "wide";
export type Hands = "down" | "phone" | "lap" | "reach" | "chest";
export type Light = { key: string; side: number; amt: number; ambient: number; phone?: number };

export const LIGHT = {
  lampWarm: { key: "#ffb766", side: 1, amt: 0.35, ambient: 0.32 } as Light,
  window: { key: "#7fa6dd", side: -1, amt: 0.3, ambient: 0.42 } as Light,
  hallway: { key: "#c9d6ff", side: 0, amt: 0.22, ambient: 0.55 } as Light,
  moon: { key: "#8db0e8", side: -0.6, amt: 0.28, ambient: 0.55 } as Light,
  phone: { key: "#9cc7ff", side: 0, amt: 0.22, ambient: 0.5, phone: 0.32 } as Light,
};

export type RigProps = {
  id: "kerem" | "defne";
  t: number;
  x: number;
  y: number;
  scale?: number;
  view?: "front" | "back";
  turn?: number;
  tilt?: number;
  pose?: "stand" | "sit" | "walk";
  walk?: number;
  hands?: Hands;
  brows?: Brow;
  eyes?: EyeMode;
  look?: [number, number];
  fear?: number;
  blanket?: boolean;
  light?: Light;
  speak?: boolean;
  mono?: string;
  flip?: boolean;
  /** 0..1 — ayağa kalkma geçişi (sit → stand) */
  rise?: number;
};

/** Konuşmacının şu an söylediği replik (varsa) ve ağız durumu. */
export function speakingState(id: string, t: number): MouthState & { lineId?: string } {
  for (const l of ALL_LINES) {
    if (l.speaker !== id) continue;
    const d = lineDuration(l);
    if (t >= l.at && t <= l.at + d + 0.05) return { ...mouthAt(l, t - l.at), lineId: l.id };
  }
  return { viseme: "X", open: 0, speaking: false };
}

const hasLayered = (id: string, view: "front" | "back") =>
  (view === "front" ? FRONT_REQUIRED : BACK_LAYERS).every((l) => has(charLayerPath(id, view, l)));

const FACE_K = "M -72 -40 C -74 -95 -40 -120 0 -120 C 40 -120 74 -95 72 -40 C 70 12 62 50 38 78 C 24 92 10 99 0 99 C -10 99 -24 92 -38 78 C -62 50 -70 12 -72 -40 Z";
const FACE_D = "M -66 -40 C -68 -94 -36 -116 0 -116 C 36 -116 68 -94 66 -40 C 64 8 54 46 32 72 C 20 86 9 92 0 92 C -9 92 -20 86 -32 72 C -54 46 -64 8 -66 -40 Z";

export const CharacterRig: React.FC<RigProps> = (p) => {
  const frame = useCurrentFrame();
  const {
    id,
    t,
    x,
    y,
    scale = 1,
    view = "front",
    turn = 0,
    tilt = 0,
    pose = "stand",
    walk = 0,
    hands = "down",
    brows = "neutral",
    eyes = "normal",
    look = [0, 0],
    fear = 0,
    blanket = false,
    light = LIGHT.lampWarm,
    speak = true,
    mono,
    flip = false,
    rise,
  } = p;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const C = CHARACTERS[id].palette;
  const seed = id;

  // --- canlılık: nefes, titreme, baş mikro hareketi, göz kırpma, konuşma
  const br = breath(frame, 1 + fear * 1.4, id === "kerem" ? 0 : 1.7);
  const tr = tremble(frame, fear, seed);
  const mouth: MouthState = speak ? speakingState(id, t) : { viseme: "X", open: 0, speaking: false };
  const bl = Math.max(blink(frame, seed, 1 + fear * 0.6), eyes === "wide" && fear > 0.7 ? 0 : 0);
  const sec = frame / FPS;
  const headNoise = noise2D(seed + "head", sec * 0.35, 0) * 1.6 + (mouth.speaking ? Math.sin(sec * 7.3) * 0.9 * mouth.open : 0);
  const headTilt = tilt + headNoise;
  const headDY = -br * 2.5 + (mouth.speaking ? mouth.open * 1.5 : 0);
  const sitAmt = pose === "sit" ? 1 - (rise ?? 0) : 0;
  const yShift = sitAmt * 300;
  const stride = pose === "walk" ? Math.sin(walk * Math.PI * 2) : 0;
  const bob = pose === "walk" ? Math.abs(Math.cos(walk * Math.PI * 2)) * -10 : 0;

  const W = 600;
  const H = 1400;
  const box: React.CSSProperties = {
    position: "absolute",
    left: x - (W / 2) * scale + tr.x,
    top: y - H * scale + tr.y + bob * scale,
    width: W * scale,
    height: H * scale,
    transform: flip ? "scaleX(-1)" : undefined,
  };

  // ---------------- A) KATMANLI ÇİZİM ----------------
  if (!mono && hasLayered(id, view)) {
    const L = (layer: string, style?: React.CSSProperties) =>
      has(charLayerPath(id, view, layer)) ? (
        <Img src={src(charLayerPath(id, view, layer))} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }} />
      ) : null;
    const bodyName = `body_${pose === "walk" ? (stride > 0 ? "walk_a" : "walk_b") : pose}${hands === "phone" ? "_phone" : hands === "reach" ? "" : ""}`;
    const eyeName = bl > 0.66 ? "eyes_closed" : bl > 0.25 || eyes === "tired" ? "eyes_half" : eyes === "wide" ? "eyes_wide" : "eyes_open";
    const vis: Viseme = mouth.speaking ? mouth.viseme : fear > 0.6 ? "I" : "X";
    return (
      <div style={box}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 60%", transform: `scaleY(${1 + br * 0.006})` }}>
          {L(hands === "reach" ? "body_reach" : bodyName) ?? L(`body_${pose}`) ?? L("body_stand")}
        </div>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 21%", transform: `translateY(${headDY * scale}px) rotate(${headTilt}deg)` }}>
          {L("hair_back")}
          {L(view === "back" ? "head_back" : "head")}
          {view === "front" && L(eyeName)}
          {view === "front" && (L(`brows_${brows}`) ?? L("brows_neutral"))}
          {view === "front" && L(`mouth_${vis}`)}
          {L("hair_front")}
        </div>
      </div>
    );
  }

  // ---------------- B) ANİMATİK VEKTÖR MANKEN ----------------
  const skin = mono ?? C.skin;
  const hair = mono ?? C.hair;
  const top = mono ?? C.top;
  const bottom = mono ?? C.bottom;
  const dark = mono ?? "#0b0d12";
  const tx = turn * 26; // yüz özelliklerinin yatay kayması (3/4 görünüm)
  const HC = { x: 300, y: 175 + yShift };
  const eyeOpen = Math.max(0, (eyes === "tired" ? 0.55 : eyes === "wide" ? 1.18 : 0.88) * (1 - bl));
  const browShape: Record<Brow, [number, number]> = {
    neutral: [0, 0],
    concern: [-7, 2],
    fear: [-11, -5],
    determined: [7, 2],
    tired: [-3, 4],
  };
  const [bInner, bLift] = browShape[brows];
  const isK = id === "kerem";
  const mOpen = mouth.speaking ? mouth.open : fear > 0.6 ? 0.12 : 0;
  const vis = mouth.speaking ? mouth.viseme : "X";
  const mw = vis === "O" ? 17 : vis === "U" ? 13 : vis === "A" ? 25 : vis === "E" || vis === "I" ? 27 : 22;
  const mh = mOpen * 19;

  // eller
  const armY = 360 + yShift;
  const handPos: Record<Hands, [[number, number], [number, number]]> = {
    down: [
      [150 - stride * 18, 820],
      [450 + stride * 18, 820],
    ],
    lap: [
      [235, 1110],
      [365, 1110],
    ],
    phone: [
      [275, 640 + yShift * 0.9],
      [325, 640 + yShift * 0.9],
    ],
    chest: [
      [270, 560 + yShift],
      [335, 590 + yShift],
    ],
    reach: [
      [150, 820 + yShift],
      [470, 60],
    ],
  };
  const [hl, hr] = handPos[hands];
  const handL: [number, number] = hands === "down" ? [hl[0], hl[1] + yShift] : hl;
  const handR: [number, number] = hands === "down" ? [hr[0], hr[1] + yShift] : hr;

  const Figure: React.FC<{ m?: boolean }> = ({ m }) => {
    const F = (c: string) => (m ? "#fff" : c);
    const shoulderW = isK ? 158 : 138;
    const waistW = isK ? 128 : 125;
    const torsoTop = 318 + yShift;
    const hip = 830 + yShift;
    const arm = (from: [number, number], to: [number, number], w: number) => {
      const mx = (from[0] + to[0]) / 2 + (from[0] < 300 ? -16 : 16);
      const my = (from[1] + to[1]) / 2 + 20;
      return `M ${from[0]} ${from[1]} Q ${mx} ${my} ${to[0]} ${to[1]}`;
    };
    const sL: [number, number] = [300 - shoulderW + 22, armY];
    const sR: [number, number] = [300 + shoulderW - 22, armY];
    return (
      <g>
        {/* bacaklar */}
        {sitAmt > 0.5 ? (
          <g fill={F(bottom)}>
            <path d={`M ${300 - waistW + 10} ${hip - 20} L ${300 + waistW - 10} ${hip - 20} L ${300 + waistW} ${hip + 90} L ${300 - waistW} ${hip + 90} Z`} />
            <path d={`M ${300 - waistW + 8} ${hip + 70} L ${300 - 18} ${hip + 70} L ${300 - 30} 1385 L ${300 - waistW + 18} 1385 Z`} />
            <path d={`M ${300 + 18} ${hip + 70} L ${300 + waistW - 8} ${hip + 70} L ${300 + waistW - 18} 1385 L ${300 + 30} 1385 Z`} />
          </g>
        ) : (
          <g fill={F(bottom)}>
            <path d={`M ${300 - waistW + 6} ${hip - 10} L 296 ${hip - 10} L ${292 - stride * 26} 1380 L ${205 - stride * 26} 1380 Z`} />
            <path d={`M 304 ${hip - 10} L ${300 + waistW - 6} ${hip - 10} L ${395 + stride * 26} 1380 L ${308 + stride * 26} 1380 Z`} />
          </g>
        )}
        <g fill={F(dark)}>
          <ellipse cx={sitAmt > 0.5 ? 220 : 248 - stride * 26} cy={1386} rx={52} ry={16} />
          <ellipse cx={sitAmt > 0.5 ? 380 : 352 + stride * 26} cy={1386} rx={52} ry={16} />
        </g>
        {/* gövde */}
        <path
          d={`M ${300 - shoulderW} ${torsoTop + 40} Q ${300 - shoulderW + 4} ${torsoTop} ${300 - 50} ${torsoTop - 8} L ${300 + 50} ${torsoTop - 8} Q ${300 + shoulderW - 4} ${torsoTop} ${300 + shoulderW} ${torsoTop + 40} L ${300 + waistW + 8} ${hip + 10} Q 300 ${hip + 26} ${300 - waistW - 8} ${hip + 10} Z`}
          fill={F(top)}
        />
        {!m && (
          <g opacity={0.5}>
            {/* kumaş kıvrımları */}
            <path d={`M ${300 - 70} ${torsoTop + 160} Q ${300 - 40} ${torsoTop + 260} ${300 - 60} ${hip - 40}`} stroke="#000" strokeOpacity={0.35} strokeWidth={5} fill="none" />
            <path d={`M ${300 + 75} ${torsoTop + 180} Q ${300 + 50} ${torsoTop + 280} ${300 + 70} ${hip - 30}`} stroke="#000" strokeOpacity={0.3} strokeWidth={5} fill="none" />
            <rect x={300 - waistW} y={hip - 18} width={waistW * 2} height={22} fill="#000" opacity={0.25} />
          </g>
        )}
        {/* yaka: Kerem kapüşon + gri tişört, Defne bordo kazak yakası */}
        {isK ? (
          <g>
            <path d={`M ${300 - 78} ${torsoTop - 12} Q 300 ${torsoTop + 46} ${300 + 78} ${torsoTop - 12} Q ${300 + 70} ${torsoTop + 30} 300 ${torsoTop + 40} Q ${300 - 70} ${torsoTop + 30} ${300 - 78} ${torsoTop - 12} Z`} fill={F(mono ?? C.under)} />
            {!m && !mono && view === "front" && (
              <g stroke="#c9ccd2" strokeWidth={4} strokeLinecap="round" opacity={0.75}>
                <path d={`M ${300 - 26} ${torsoTop + 30} q -2 70 -4 120`} fill="none" />
                <path d={`M ${300 + 26} ${torsoTop + 30} q 2 70 4 120`} fill="none" />
              </g>
            )}
            {view === "back" && <path d={`M ${300 - 95} ${torsoTop - 6} Q 300 ${torsoTop + 150} ${300 + 95} ${torsoTop - 6} Q 300 ${torsoTop + 40} ${300 - 95} ${torsoTop - 6} Z`} fill={F(top)} stroke={m ? undefined : "#0a1222"} strokeWidth={4} />}
          </g>
        ) : (
          <path d={`M ${300 - 60} ${torsoTop - 10} Q 300 ${torsoTop + 22} ${300 + 60} ${torsoTop - 10}`} stroke={F(mono ?? "#4c161d")} strokeWidth={16} fill="none" />
        )}
        {/* kollar */}
        <g stroke={F(top)} strokeWidth={isK ? 66 : 62} strokeLinecap="round" fill="none">
          <path d={arm(sL, handL, 66)} />
          <path d={arm(sR, handR, 66)} />
        </g>
        <g fill={F(skin)}>
          <ellipse cx={handL[0]} cy={handL[1] + 12} rx={isK ? 25 : 21} ry={isK ? 31 : 27} />
          <ellipse cx={handR[0]} cy={handR[1] + 12} rx={isK ? 25 : 21} ry={isK ? 31 : 27} />
        </g>
        {hands === "phone" && view === "front" && (
          <g>
            <rect x={300 - 42} y={handL[1] - 66} width={84} height={150} rx={12} fill={F("#0d0f13")} />
            {!m && <circle cx={300 - 22} cy={handL[1] - 46} r={7} fill="#1d2129" />}
            {!m && <g fill={skin}><ellipse cx={300 - 44} cy={handL[1] + 6} rx={14} ry={28} /><ellipse cx={300 + 44} cy={handL[1] + 6} rx={14} ry={28} /></g>}
          </g>
        )}
        {/* battaniye (Defne, salon) */}
        {blanket && (
          <path
            d={`M ${300 - shoulderW - 30} ${torsoTop + 30} Q 300 ${torsoTop - 40} ${300 + shoulderW + 30} ${torsoTop + 30} L ${300 + waistW + 70} ${hip + 150} Q 300 ${hip + 210} ${300 - waistW - 70} ${hip + 150} Z`}
            fill={F(mono ?? "#7c7266")}
            opacity={m ? 1 : 0.96}
          />
        )}
        {/* boyun */}
        <rect x={300 - 24} y={HC.y + 70} width={48} height={torsoTop - HC.y - 64} fill={F(skin)} />
        {!m && <rect x={300 - 24} y={HC.y + 80} width={48} height={24} fill="#000" opacity={0.25} />}
        {/* baş */}
        <g transform={`translate(${HC.x} ${HC.y + headDY}) rotate(${headTilt})`}>
          {/* arka saç (Defne) */}
          {!isK && (
            <path
              d="M -98 -50 C -112 -150 112 -150 98 -50 C 110 20 118 90 108 150 C 96 166 78 150 66 162 C 50 172 30 154 12 162 L -12 162 C -30 154 -50 172 -66 162 C -80 150 -98 166 -108 150 C -118 90 -110 20 -98 -50 Z"
              fill={F(hair)}
            />
          )}
          {view === "back" ? (
            <g>
              <ellipse cx={0} cy={-6} rx={78} ry={100} fill={F(hair)} />
              {isK && <path d="M -30 84 Q 0 96 30 84 L 28 104 Q 0 112 -28 104 Z" fill={F(skin)} opacity={m ? 1 : 0.8} />}
              {!m && <path d="M -40 -90 q 40 -20 80 6 M -55 -40 q 50 -10 100 10" stroke="#000" strokeOpacity={0.25} strokeWidth={4} fill="none" />}
            </g>
          ) : (
            <g transform={`translate(${tx * 0.25} 0)`}>
              {/* kulaklar */}
              <ellipse cx={-74 + tx * 0.6} cy={4} rx={11} ry={22} fill={F(skin)} />
              <ellipse cx={74 + tx * 0.6} cy={4} rx={11} ry={22} fill={F(skin)} />
              {/* yüz */}
              <path d={isK ? FACE_K : FACE_D} fill={F(skin)} />
              {!m && (
                <clipPath id={`${uid}f`}>
                  <path d={isK ? FACE_K : FACE_D} />
                </clipPath>
              )}
              {!m && !mono && (
                <g transform={`translate(${tx} 0)`}>
                  {/* yanak/çene gölgesi + sakal (yüz sınırına kırpılır) */}
                  <g clipPath={`url(#${uid}f)`} transform={`translate(${-tx} 0)`}>
                    <g transform={`translate(${tx} 0)`}>
                      <path d="M 26 0 Q 60 40 28 90 L 90 90 L 90 -20 Z" fill="#000" opacity={0.13} />
                      {isK && <path d="M -64 18 C -54 72 -22 100 0 100 C 22 100 54 72 64 18 C 52 60 26 82 0 82 C -26 82 -52 60 -64 18 Z" fill={hair} opacity={0.34} />}
                      {isK && <path d="M -20 44 Q 0 38 20 44" stroke={hair} strokeOpacity={0.35} strokeWidth={5} fill="none" />}
                    </g>
                  </g>
                  {/* kaşlar */}
                  <g stroke={hair} strokeWidth={isK ? 7 : 5} strokeLinecap="round" fill="none">
                    <path d={`M -52 ${-38 - bLift} Q -36 ${-46 - bLift} -14 ${-38 + bInner}`} />
                    <path d={`M 14 ${-38 + bInner} Q 36 ${-46 - bLift} 52 ${-38 - bLift}`} />
                  </g>
                  {/* gözler */}
                  {[-31, 31].map((ex) => {
                    const h = 12 * eyeOpen;
                    const cid = `${uid}e${ex < 0 ? "l" : "r"}`;
                    const almond = `M ${ex - 18} -12 Q ${ex} ${-12 - h} ${ex + 18} -12 Q ${ex} ${-12 + h * 0.75} ${ex - 18} -12 Z`;
                    return (
                      <g key={ex}>
                        <clipPath id={cid}>
                          <path d={almond} />
                        </clipPath>
                        <path d={almond} fill="#e9e4dc" />
                        <g clipPath={`url(#${cid})`}>
                          <circle cx={ex + look[0] * 6} cy={-12 + look[1] * 3} r={8.5} fill={C.eyes} />
                          <circle cx={ex + look[0] * 6} cy={-12 + look[1] * 3} r={eyes === "wide" ? 3 : 4.2} fill="#0b0705" />
                          <circle cx={ex + look[0] * 6 + 3} cy={-15 + look[1] * 3} r={2} fill="#fff" opacity={0.85} />
                          <rect x={ex - 20} y={-30} width={40} height={10 + 0} fill="#000" opacity={0.18} />
                        </g>
                        <path d={`M ${ex - 19} -11 Q ${ex} ${-13 - h * 1.05} ${ex + 19} -12`} stroke="#14100e" strokeWidth={3.6} fill="none" strokeLinecap="round" />
                        {eyes === "tired" && <path d={`M ${ex - 14} -2 Q ${ex} 4 ${ex + 14} -2`} stroke="#000" strokeOpacity={0.18} strokeWidth={3} fill="none" />}
                      </g>
                    );
                  })}
                  {/* burun */}
                  <path d="M 4 -4 Q 8 22 10 30 Q 4 36 -4 33" stroke="#7a4d35" strokeOpacity={0.55} strokeWidth={3} fill="none" strokeLinecap="round" />
                  {/* ağız */}
                  {mh < 1.6 ? (
                    <path d={`M ${-mw / 2} 58 Q 0 ${vis === "MBP" ? 60 : 61} ${mw / 2} 58`} stroke="#5a2f26" strokeWidth={3.4} fill="none" strokeLinecap="round" />
                  ) : (
                    <g>
                      <path d={`M ${-mw / 2} 57 Q 0 ${53} ${mw / 2} 57 Q ${mw / 2 - 2} ${57 + mh} 0 ${57 + mh + 1} Q ${-mw / 2 + 2} ${57 + mh} ${-mw / 2} 57 Z`} fill="#2a1210" />
                      {(vis === "E" || vis === "I" || vis === "A") && <rect x={-mw / 2 + 4} y={57} width={mw - 8} height={Math.min(4, mh * 0.3)} fill="#e8e1d6" />}
                      <path d={`M ${-mw / 2} 57 Q 0 53 ${mw / 2} 57`} stroke="#5a2f26" strokeWidth={2.6} fill="none" />
                    </g>
                  )}
                </g>
              )}
              {/* ön saç */}
              {isK ? (
                <path
                  d="M -80 -36 C -86 -110 -42 -142 6 -140 C 52 -138 86 -110 80 -36 C 74 -64 58 -88 30 -90 C 12 -100 -18 -96 -40 -86 C -60 -76 -74 -58 -80 -36 Z"
                  fill={F(hair)}
                  transform={`translate(${tx * 0.5} 0)`}
                />
              ) : (
                <path
                  d="M -96 30 C -104 -60 -80 -128 2 -126 C 80 -124 106 -60 94 30 C 86 -20 74 -60 50 -80 C 30 -60 0 -54 -24 -72 C -44 -60 -66 -40 -74 -10 C -80 10 -86 26 -96 30 Z"
                  fill={F(hair)}
                  transform={`translate(${tx * 0.5} 0)`}
                />
              )}
              {!m && !mono && !isK && (
                <path d="M -72 -10 C -90 40 -78 90 -96 140 M 74 -10 C 92 40 80 92 98 142" stroke={hair} strokeWidth={18} fill="none" strokeLinecap="round" />
              )}
            </g>
          )}
        </g>
      </g>
    );
  };

  const maskId = `${uid}m`;
  const gradId = `${uid}g`;
  const phoneGlow = Math.min(0.75, light.phone ?? (hands === "phone" && view === "front" ? 0.35 : 0));
  return (
    <div style={box}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <mask id={maskId}>
            <Figure m />
          </mask>
          <linearGradient id={gradId} x1={light.side >= 0 ? "0" : "1"} y1="0" x2={light.side >= 0 ? "1" : "0"} y2="0">
            <stop offset="0" stopColor="#04060c" stopOpacity={0.62} />
            <stop offset="0.55" stopColor="#04060c" stopOpacity={0.2} />
            <stop offset="1" stopColor={light.key} stopOpacity={light.amt} />
          </linearGradient>
          <radialGradient id={`${uid}p`} cx="0.5" cy={(HC.y + 40) / H} r="0.35">
            <stop offset="0" stopColor="#bcd8ff" stopOpacity={0.3} />
            <stop offset="1" stopColor="#bcd8ff" stopOpacity={0} />
          </radialGradient>
        </defs>
        <Figure />
        {!mono && (
          <g mask={`url(#${maskId})`}>
            <rect width={W} height={H} fill={`url(#${gradId})`} />
            <rect width={W} height={H} fill="#060a14" opacity={light.ambient} />
            {phoneGlow > 0 && <rect width={W} height={H} fill={`url(#${uid}p)`} opacity={phoneGlow} style={{ mixBlendMode: "screen" }} />}
          </g>
        )}
      </svg>
    </div>
  );
};
