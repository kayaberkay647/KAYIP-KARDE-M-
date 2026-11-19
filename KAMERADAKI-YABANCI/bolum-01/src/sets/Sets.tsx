// MEKÂN PLAKALARI
// Her set için: final PNG plakası varsa o kullanılır (public/assets/sets/<SET>/bg.png),
// yoksa AYNI kat planına sadık animatik vektör çizimi gösterilir.
// Işık titremesi, yağmur, saat saniyesi gibi canlı öğeler plakadan bağımsız üst katmanlardır.
import React from "react";
import { Img, random, useCurrentFrame } from "remotion";
import { SETS, type SetId } from "../data/locations";
import { has, setLayerPath, src } from "../lib/assets";
import { FPS } from "../config";

export const Plate: React.FC<{ set: SetId; layer?: string; fallback: React.ReactNode }> = ({ set, layer = "bg.png", fallback }) => {
  const st = SETS[set].stage;
  const rel = setLayerPath(set, layer);
  if (has(rel)) return <Img src={src(rel)} style={{ position: "absolute", left: 0, top: 0, width: st.w, height: st.h }} />;
  return <>{fallback}</>;
};

const svgBox = (w: number, h: number): React.CSSProperties => ({ position: "absolute", left: 0, top: 0, width: w, height: h });

// ------------------------------------------------------------------ SALON
export const LivingRoomBG: React.FC = () => (
  <svg viewBox="0 0 2400 1920" style={svgBox(2400, 1920)}>
    <defs>
      <linearGradient id="lrWall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#121826" />
        <stop offset="1" stopColor="#1c2333" />
      </linearGradient>
      <pattern id="lrPaper" width="38" height="38" patternUnits="userSpaceOnUse">
        <path d="M 0 0 L 0 38" stroke="#000" strokeOpacity="0.16" strokeWidth="2" />
        <circle cx="19" cy="19" r="2.2" fill="#3a4258" opacity="0.25" />
      </pattern>
      <linearGradient id="lrFloor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#24180f" />
        <stop offset="1" stopColor="#0d0907" />
      </linearGradient>
      <radialGradient id="lrLamp" cx="1850" cy="700" r="900" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffb35a" stopOpacity="0.55" />
        <stop offset="0.35" stopColor="#ff9a3c" stopOpacity="0.18" />
        <stop offset="1" stopColor="#ff9a3c" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="lrNight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0b1530" />
        <stop offset="1" stopColor="#1d3256" />
      </linearGradient>
      <linearGradient id="lrSofa" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#30496e" />
        <stop offset="1" stopColor="#1a2a44" />
      </linearGradient>
      <linearGradient id="lrMoonSpill" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8fb0e6" stopOpacity="0.2" />
        <stop offset="1" stopColor="#8fb0e6" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="2400" height="1500" fill="url(#lrWall)" />
    <rect width="2400" height="1500" fill="url(#lrPaper)" />
    <rect y="1060" width="2400" height="10" fill="#0b0f18" opacity="0.7" />
    <rect y="1070" width="2400" height="430" fill="#000" opacity="0.12" />
    <rect y="1500" width="2400" height="420" fill="url(#lrFloor)" />
    {Array.from({ length: 22 }).map((_, i) => (
      <line key={i} x1={i * 115 - 60} y1={1500} x2={(i * 115 - 60 - 1200) * 1.6 + 1200} y2={1920} stroke="#000" strokeOpacity="0.35" strokeWidth="3" />
    ))}
    <rect y="1490" width="2400" height="16" fill="#0a0806" />
    {/* pencere + perdeler */}
    <rect x="160" y="320" width="440" height="900" fill="url(#lrNight)" />
    <g stroke="#2a2f3a" strokeWidth="18" fill="none">
      <rect x="160" y="320" width="440" height="900" />
      <line x1="380" y1="320" x2="380" y2="1220" />
      <line x1="160" y1="700" x2="600" y2="700" />
    </g>
    <rect x="140" y="1220" width="480" height="26" fill="#2b2f38" />
    <path d="M 70 260 C 120 600 90 1000 130 1330 L 270 1330 C 240 1000 260 600 240 260 Z" fill="#141a27" />
    <path d="M 690 260 C 640 600 670 1000 630 1330 L 500 1330 C 530 1000 510 600 530 260 Z" fill="#141a27" />
    {[120, 170, 210, 560, 600, 650].map((x, i) => (
      <path key={i} d={`M ${x} 270 C ${x + 10} 700 ${x - 8} 1000 ${x + 6} 1320`} stroke="#000" strokeOpacity="0.35" strokeWidth="6" fill="none" />
    ))}
    <rect x="60" y="246" width="660" height="18" rx="9" fill="#2c2620" />
    <polygon points="230,1500 560,1500 980,1920 360,1920" fill="url(#lrMoonSpill)" />
    {/* lamba ışığı duvarda */}
    <rect width="2400" height="1920" fill="url(#lrLamp)" />
    {/* kanepe */}
    <path d="M 760 1050 Q 760 1000 820 995 L 1660 995 Q 1720 1000 1720 1050 L 1720 1260 L 760 1260 Z" fill="url(#lrSofa)" />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${810 + i * 300} 1020 Q ${960 + i * 300} 1000 ${1090 + i * 300} 1020 L ${1090 + i * 300} 1240 L ${810 + i * 300} 1240 Z`} fill="#2b4267" stroke="#15223a" strokeWidth="5" />
    ))}
    <rect x="740" y="1240" width="1000" height="150" rx="26" fill="#243a5d" />
    <rect x="760" y="1390" width="960" height="70" fill="#162640" />
    <rect x="690" y="1110" width="120" height="330" rx="40" fill="#2a4065" />
    <rect x="1670" y="1110" width="120" height="330" rx="40" fill="#2a4065" />
    <rect x="780" y="1450" width="30" height="50" fill="#120d09" />
    <rect x="1670" y="1450" width="30" height="50" fill="#120d09" />
    {/* duvar saati (03:13) */}
    <g transform="translate(1240 640)">
      <circle r="78" fill="#2a241d" />
      <circle r="66" fill="#c9bfa8" />
      <circle r="66" fill="#000" opacity="0.35" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x="-2" y="-60" width="4" height="12" fill="#1a1612" transform={`rotate(${i * 30})`} />
      ))}
      <rect x="-3" y="-34" width="6" height="38" fill="#14110d" transform={`rotate(${3 * 30 + 13 * 0.5})`} />
      <rect x="-2" y="-52" width="4" height="56" fill="#14110d" transform={`rotate(${13 * 6})`} />
      <circle r="5" fill="#14110d" />
    </g>
    {/* ayaklı lamba */}
    <rect x="1844" y="760" width="12" height="740" fill="#1b1611" />
    <ellipse cx="1850" cy="1498" rx="70" ry="14" fill="#130f0b" />
    <path d="M 1770 760 L 1930 760 L 1900 630 L 1800 630 Z" fill="#f2c27a" />
    <path d="M 1770 760 L 1930 760 L 1900 630 L 1800 630 Z" fill="#ffdca0" opacity="0.5" />
    {/* koridor ağzı */}
    <rect x="2030" y="360" width="320" height="1140" fill="#151922" />
    <polygon points="2050,380 2330,380 2240,760 2140,760" fill="#191d26" />
    <polygon points="2050,1500 2330,1500 2240,1060 2140,1060" fill="#1a130d" />
    <polygon points="2050,380 2140,760 2140,1060 2050,1500" fill="#2a2a2a" />
    <polygon points="2330,380 2240,760 2240,1060 2330,1500" fill="#242424" />
    <rect x="2140" y="760" width="100" height="300" fill="#0d0f14" />
    <rect x="2160" y="800" width="60" height="260" fill="#16100c" />
    <rect x="2020" y="350" width="340" height="20" fill="#252a35" />
    <rect x="2020" y="350" width="18" height="1150" fill="#252a35" />
    <rect x="2342" y="350" width="18" height="1150" fill="#252a35" />
  </svg>
);

/** Ön plan: ahşap sehpa (karakterlerin önünde). */
export const LivingRoomFG: React.FC = () => (
  <svg viewBox="0 0 2400 1920" style={svgBox(2400, 1920)}>
    <defs>
      <linearGradient id="lrTable" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#3b2414" />
        <stop offset="1" stopColor="#6a3f22" />
      </linearGradient>
    </defs>
    <path d="M 900 1610 L 1580 1610 L 1620 1680 L 860 1680 Z" fill="url(#lrTable)" />
    <rect x="860" y="1680" width="760" height="34" fill="#2a190e" />
    <rect x="890" y="1714" width="30" height="206" fill="#21140b" />
    <rect x="1560" y="1714" width="30" height="206" fill="#21140b" />
    <ellipse cx="1120" cy="1640" rx="34" ry="10" fill="none" stroke="#2a180c" strokeWidth="4" opacity="0.6" />
  </svg>
);

/** Pencere camında yağmur damlaları ve akış izleri (her plaka üzerinde kullanılabilir). */
export const RainOnGlass: React.FC<{ x: number; y: number; w: number; h: number; density?: number; opacity?: number }> = ({ x, y, w, h, density = 70, opacity = 0.6 }) => {
  const frame = useCurrentFrame();
  const drops = Array.from({ length: density }).map((_, i) => {
    const speed = 0.4 + random(`rs${i}`) * 1.6;
    const len = 20 + random(`rl${i}`) * 50;
    const px = random(`rx${i}`) * w;
    const py = ((random(`ry${i}`) * h + frame * speed * 6) % (h + len)) - len;
    return { px, py, len, o: 0.25 + random(`ro${i}`) * 0.5 };
  });
  const beads = Array.from({ length: Math.round(density * 0.8) }).map((_, i) => ({
    px: random(`bx${i}`) * w,
    py: random(`by${i}`) * h,
    r: 1.5 + random(`br${i}`) * 3.2,
  }));
  return (
    <svg style={{ position: "absolute", left: x, top: y, width: w, height: h, opacity }} viewBox={`0 0 ${w} ${h}`}>
      {beads.map((b, i) => (
        <circle key={i} cx={b.px} cy={b.py} r={b.r} fill="#9fbce6" opacity={0.35} />
      ))}
      {drops.map((d, i) => (
        <line key={i} x1={d.px} y1={d.py} x2={d.px - 2} y2={d.py + d.len} stroke="#a9c4ec" strokeOpacity={d.o} strokeWidth={2} strokeLinecap="round" />
      ))}
    </svg>
  );
};

/** Duvar saatinin saniye ibresi (gerçek zamanlı akış). Saat 03:13 sabit. */
export const ClockSecondHand: React.FC<{ cx: number; cy: number; startSec: number }> = ({ cx, cy, startSec }) => {
  const frame = useCurrentFrame();
  const secs = Math.floor(startSec + frame / FPS);
  return (
    <svg style={{ position: "absolute", left: cx - 70, top: cy - 70, width: 140, height: 140 }} viewBox="-70 -70 140 140">
      <rect x="-1" y="-58" width="2" height="66" fill="#7a1d14" transform={`rotate(${(secs % 60) * 6})`} />
    </svg>
  );
};

/** Lamba kaynaklı sıcak ışık + pencere soğuk ışığı (karakterlerin üstünde, yumuşak). */
export const LivingRoomLightFX: React.FC = () => (
  <svg viewBox="0 0 2400 1920" style={{ ...svgBox(2400, 1920), mixBlendMode: "screen", pointerEvents: "none" }}>
    <defs>
      <radialGradient id="lfxLamp" cx="1860" cy="720" r="700" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffb35a" stopOpacity="0.28" />
        <stop offset="1" stopColor="#ffb35a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="lfxWin" cx="380" cy="760" r="800" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#5f86c4" stopOpacity="0.18" />
        <stop offset="1" stopColor="#5f86c4" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="2400" height="1920" fill="url(#lfxLamp)" />
    <rect width="2400" height="1920" fill="url(#lfxWin)" />
  </svg>
);

/** Koridor tavan lambası titremesi (0..1 parlaklık) — deterministik. */
export const flickerAt = (frame: number, seed = "fl", base = 0.85) => {
  const k = Math.floor(frame / 2);
  const r = random(`${seed}${k}`);
  const burst = random(`${seed}b${Math.floor(frame / 45)}`) < 0.35;
  return burst ? (r < 0.3 ? 0.15 : r < 0.5 ? 0.55 : base) : base - r * 0.08;
};

// ------------------------------------------------------------------ KORİDOR
export const HallwayBG: React.FC<{ light?: number; doorShade?: number; reverse?: boolean }> = ({ light = 0.85, doorShade = 0, reverse = false }) => (
  <svg viewBox="0 0 1080 1920" style={svgBox(1080, 1920)}>
    <defs>
      <linearGradient id="hwWallL" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#3b382f" />
        <stop offset="1" stopColor="#1d1c19" />
      </linearGradient>
      <linearGradient id="hwWallR" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stopColor="#35322a" />
        <stop offset="1" stopColor="#1a1916" />
      </linearGradient>
      <linearGradient id="hwFloor" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#3a2617" />
        <stop offset="1" stopColor="#120c08" />
      </linearGradient>
      <linearGradient id="hwWarm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffb35a" stopOpacity="0.12" />
        <stop offset="1" stopColor="#ffb35a" stopOpacity="0.32" />
      </linearGradient>
      <radialGradient id="hwBulb" cx="540" cy="430" r="520" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#dfe6ff" stopOpacity={0.55 * light} />
        <stop offset="0.5" stopColor="#9fb0d8" stopOpacity={0.12 * light} />
        <stop offset="1" stopColor="#9fb0d8" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1080" height="1920" fill="#0c0d10" />
    <polygon points="0,0 1080,0 680,640 400,640" fill="#15161a" />
    <polygon points="0,0 400,640 400,1160 0,1920" fill="url(#hwWallL)" />
    <polygon points="1080,0 680,640 680,1160 1080,1920" fill="url(#hwWallR)" />
    <polygon points="0,1920 1080,1920 680,1160 400,1160" fill="url(#hwFloor)" />
    {Array.from({ length: 9 }).map((_, i) => {
      const xb = (i / 8) * 1080;
      const xt = 400 + (i / 8) * 280;
      return <line key={i} x1={xt} y1={1160} x2={xb} y2={1920} stroke="#000" strokeOpacity="0.45" strokeWidth="3" />;
    })}
    {[1220, 1320, 1470, 1700].map((yy, i) => {
      const p = (yy - 1160) / 760;
      return <line key={i} x1={400 - p * 400} y1={yy} x2={680 + p * 400} y2={yy} stroke="#000" strokeOpacity="0.25" strokeWidth="2" />;
    })}
    <line x1="0" y1="1880" x2="400" y2="1150" stroke="#0a0908" strokeWidth="14" />
    <line x1="1080" y1="1880" x2="680" y2="1150" stroke="#0a0908" strokeWidth="14" />
    {reverse ? (
      <g>
        {/* ters açı: uçta salonun sıcak ışıklı kapı boşluğu */}
        <rect x="400" y="640" width="280" height="520" fill="#1f1e1a" />
        <rect x="440" y="700" width="200" height="460" fill="#2e1d10" />
        <rect x="440" y="700" width="200" height="460" fill="url(#hwWarm)" />
        <polygon points="440,1160 640,1160 760,1300 330,1300" fill="#ffb35a" opacity="0.12" />
      </g>
    ) : (
    <g>
    <rect x="400" y="640" width="280" height="520" fill="#1f1e1a" />
    <rect x="452" y="740" width="176" height="420" fill="#21150d" />
    <rect x="462" y="752" width="156" height="190" fill="#1a1009" />
    <rect x="462" y="958" width="156" height="190" fill="#1a1009" />
    <circle cx="604" cy="958" r="7" fill="#9c7a3c" />
    <rect x="588" y="955" width="22" height="6" rx="3" fill="#9c7a3c" />
    <rect x="452" y="740" width="176" height="420" fill="#000" opacity={0.25 + doorShade * 0.5} />
    </g>
    )}
    {/* tavan lambası */}
    <ellipse cx="540" cy="420" rx="52" ry="14" fill={`rgba(235,240,255,${0.25 + light * 0.7})`} />
    <rect width="1080" height="1920" fill="url(#hwBulb)" />
    <rect width="1080" height="1920" fill="#05070c" opacity={0.35 * (1 - light)} />
  </svg>
);

/** CAM 02 — salon ucundaki tavandan, aşağı eğik imkânsız yüksek açı. Uçta Defne'nin kapısı (465–615 x 640–900). */
export const HallwayCam02BG: React.FC = () => (
  <svg viewBox="0 0 1080 1920" style={svgBox(1080, 1920)}>
    <rect width="1080" height="1920" fill="#0e0f12" />
    <polygon points="0,0 1080,0 650,560 430,560" fill="#1b1c1f" />
    <polygon points="0,0 430,560 430,900 0,1500" fill="#2c2b27" />
    <polygon points="1080,0 650,560 650,900 1080,1500" fill="#262521" />
    <polygon points="0,1500 430,900 650,900 1080,1500 1080,1920 0,1920" fill="#22180f" />
    {Array.from({ length: 9 }).map((_, i) => (
      <line key={i} x1={430 + (i / 8) * 220} y1={900} x2={(i / 8) * 1080} y2={1920} stroke="#000" strokeOpacity="0.35" strokeWidth="3" />
    ))}
    <line x1="0" y1="1470" x2="430" y2="895" stroke="#0a0908" strokeWidth="10" />
    <line x1="1080" y1="1470" x2="650" y2="895" stroke="#0a0908" strokeWidth="10" />
    <rect x="430" y="560" width="220" height="340" fill="#24221e" />
    <rect x="465" y="640" width="150" height="260" fill="#1b120b" />
    <circle cx="602" cy="780" r="5" fill="#8a6d36" />
    <ellipse cx="540" cy="300" rx="50" ry="14" fill="#d8dcea" opacity="0.45" />
    <circle cx="540" cy="300" r="240" fill="#cfd6ef" opacity="0.05" />
  </svg>
);

// ------------------------------------------------------------------ DEFNE'NİN ODASI
/** CAM 01 — kuzeybatı üst köşeden geniş açı. Yatak solda (doğu duvarı), kapı sağda (güney duvarı). */
export const BedroomCam01BG: React.FC = () => (
  <svg viewBox="0 0 1080 1920" style={svgBox(1080, 1920)}>
    <defs>
      <linearGradient id="bcFloor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1d1611" />
        <stop offset="1" stopColor="#2a2018" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1920" fill="#101318" />
    <polygon points="0,180 560,520 560,1180 0,1500" fill="#22262c" />
    <polygon points="560,520 1080,240 1080,1460 560,1180" fill="#1d2025" />
    <polygon points="0,1500 560,1180 1080,1460 1080,1920 0,1920" fill="url(#bcFloor)" />
    <polygon points="0,180 560,520 1080,240 1080,0 0,0" fill="#15181d" />
    {/* ay ışığı (kameranın arkasındaki pencereden) */}
    <polygon points="260,1560 720,1300 1000,1500 520,1860" fill="#8fb0e6" opacity="0.12" />
    {/* kapı — güney duvarı */}
    <polygon points="760,690 960,580 960,1360 760,1260" fill="#1d130c" />
    <polygon points="772,705 948,608 948,1345 772,1252" fill="#000" opacity="0.2" />
    <circle cx="790" cy="980" r="7" fill="#7d6232" />
    {/* yatak — doğu duvarı boyunca */}
    <polygon points="0,1060 380,880 560,960 180,1180" fill="#2a3442" />
    <polygon points="0,1060 180,1180 180,1290 0,1170" fill="#1c232d" />
    <polygon points="180,1180 560,960 560,1060 180,1290" fill="#222b37" />
    <polygon points="20,1030 230,935 320,975 110,1075" fill="#3c4757" />
    <path d="M 160 1100 Q 300 1000 470 980 Q 420 1060 260 1150 Z" fill="#323d4c" />
    {/* komodin */}
    <polygon points="0,920 120,860 200,900 80,960" fill="#2a1d14" />
    <polygon points="80,960 200,900 200,1010 80,1070" fill="#1d140e" />
    <rect x="96" y="830" width="40" height="50" fill="#3a3a3a" />
  </svg>
);

/** Kapıdan içeri bakış: pencere karşıda, yatak sağda, masa solda, kamera sol üst köşede. */
export const BedroomDoorPovBG: React.FC<{ camLed?: boolean }> = ({ camLed = true }) => (
  <svg viewBox="0 0 1080 1920" style={svgBox(1080, 1920)}>
    <defs>
      <linearGradient id="bdNight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0c1631" />
        <stop offset="1" stopColor="#223a62" />
      </linearGradient>
      <radialGradient id="bdMoon" cx="560" cy="820" r="700" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#7d9fd9" stopOpacity="0.25" />
        <stop offset="1" stopColor="#7d9fd9" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1080" height="1920" fill="#0f1218" />
    <polygon points="0,0 1080,0 860,360 220,360" fill="#13161c" />
    <polygon points="0,0 220,360 220,1340 0,1920" fill="#1b1e24" />
    <polygon points="1080,0 860,360 860,1340 1080,1920" fill="#181b21" />
    <rect x="220" y="360" width="640" height="980" fill="#1e2128" />
    <polygon points="0,1920 1080,1920 860,1340 220,1340" fill="#1e1610" />
    {/* pencere + perde */}
    <rect x="430" y="560" width="230" height="440" fill="url(#bdNight)" />
    <path d="M 380 520 C 400 740 390 920 410 1080 L 520 1080 C 505 900 515 720 505 520 Z" fill="#101521" />
    <path d="M 710 520 C 690 740 700 920 680 1080 L 585 1080 C 600 900 590 720 600 520 Z" fill="#101521" />
    <rect x="512" y="560" width="76" height="440" fill="#5c7fb8" opacity="0.18" />
    <rect x="370" y="506" width="350" height="12" rx="6" fill="#262019" />
    {/* masa (sol) */}
    <polygon points="230,1000 400,1000 400,1030 230,1030" fill="#2a1d13" />
    <polygon points="40,1080 230,1000 230,1030 40,1120" fill="#24180f" />
    <rect x="236" y="1030" width="14" height="300" fill="#1a120b" />
    <rect x="60" y="1110" width="16" height="420" fill="#1a120b" />
    <rect x="270" y="950" width="60" height="50" fill="#2d2a36" />
    <rect x="340" y="930" width="14" height="70" fill="#38343e" />
    {/* yatak (sağ) */}
    <polygon points="860,1080 700,1120 700,1240 860,1190" fill="#2c3646" />
    <polygon points="700,1120 1080,1300 1080,1500 700,1240" fill="#344050" />
    <polygon points="700,1240 1080,1500 1080,1620 700,1300" fill="#1d242e" />
    <polygon points="730,1100 830,1080 860,1110 760,1130" fill="#4a5566" />
    <polygon points="880,1100 960,1060 960,1180 880,1200" fill="#23180f" />
    {/* duvar kamerası (sol üst köşe) + kablo */}
    <g>
      <rect x="150" y="300" width="70" height="44" rx="10" fill="#d8dadc" />
      <circle cx="198" cy="322" r="14" fill="#16181c" />
      <circle cx="198" cy="322" r="6" fill="#2b3d55" />
      <circle cx="162" cy="312" r="4" fill={camLed ? "#38e07a" : "#1c2a22"} />
      <path d="M 186 344 C 186 600 196 900 206 1250" stroke="#cfd2d5" strokeWidth="5" fill="none" opacity="0.7" />
      <rect x="194" y="1248" width="26" height="34" rx="4" fill="#cfd2d5" opacity="0.8" />
    </g>
    <rect width="1080" height="1920" fill="url(#bdMoon)" />
  </svg>
);

/** Pencere tarafından kapıya bakış (kardeşlerin sırt planı ve S18 imkânsız görüntü). */
export const BedroomInteriorBG: React.FC = () => (
  <svg viewBox="0 0 1080 1920" style={svgBox(1080, 1920)}>
    <rect width="1080" height="1920" fill="#0d1015" />
    <polygon points="0,0 1080,0 900,380 180,380" fill="#12151a" />
    <polygon points="0,0 180,380 180,1380 0,1920" fill="#181b21" />
    <polygon points="1080,0 900,380 900,1380 1080,1920" fill="#1c1f25" />
    <rect x="180" y="380" width="720" height="1000" fill="#1d2027" />
    <polygon points="0,1920 1080,1920 900,1380 180,1380" fill="#1c140e" />
    {Array.from({ length: 8 }).map((_, i) => (
      <line key={i} x1={180 + (i / 7) * 720} y1={1380} x2={(i / 7) * 1080} y2={1920} stroke="#000" strokeOpacity="0.4" strokeWidth="3" />
    ))}
    {/* kapı (güney duvarı, merkezin biraz sağı) */}
    <rect x="560" y="700" width="230" height="680" fill="#24170e" />
    <rect x="576" y="716" width="198" height="300" fill="#1c1209" />
    <rect x="576" y="1040" width="198" height="324" fill="#1c1209" />
    <rect x="552" y="692" width="246" height="10" fill="#171009" />
    <rect x="580" y="1012" width="30" height="8" rx="4" fill="#9c7a3c" />
    <circle cx="586" cy="1016" r="7" fill="#9c7a3c" />
    {/* ay ışığı zeminde (arkadaki pencereden) */}
    <polygon points="380,1500 760,1500 860,1920 260,1920" fill="#8fb0e6" opacity="0.1" />
    {/* yatağın ayak ucu (sol ön plan) */}
    <polygon points="0,1500 210,1460 260,1560 0,1640" fill="#2b3545" />
    <polygon points="0,1640 260,1560 260,1700 0,1800" fill="#1a212b" />
  </svg>
);

/** Duvardaki kamera ve priz — yakın plan insert. LED ve kablo sahnede animasyonludur. */
export const WallCamInsertBG: React.FC = () => (
  <svg viewBox="0 0 1080 1920" style={svgBox(1080, 1920)}>
    <defs>
      <linearGradient id="wcWall" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2a2c30" />
        <stop offset="1" stopColor="#15171b" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#wcWall)" />
    <rect x="0" y="0" width="80" height="1920" fill="#000" opacity="0.25" />
    <g transform="translate(540 300)">
      <rect x="-60" y="-120" width="40" height="70" fill="#bfc2c6" />
      <rect x="-140" y="-60" width="280" height="170" rx="40" fill="#dfe1e3" />
      <rect x="-140" y="40" width="280" height="70" rx="30" fill="#000" opacity="0.15" />
      <circle cx="40" cy="25" r="62" fill="#111317" />
      <circle cx="40" cy="25" r="34" fill="#1f2b3d" />
      <circle cx="52" cy="12" r="10" fill="#6f8bb5" opacity="0.6" />
    </g>
    <g transform="translate(540 1500)">
      <rect x="-110" y="-110" width="220" height="220" rx="24" fill="#d5d6d4" />
      <rect x="-110" y="-110" width="220" height="220" rx="24" fill="#000" opacity="0.25" />
      <circle r="70" fill="#c3c4c2" />
      <circle cx="-26" r="13" fill="#1a1a1a" />
      <circle cx="26" r="13" fill="#1a1a1a" />
    </g>
  </svg>
);

/** Kapının iç yüzü — kol ayrı katmandır (dönüş için). */
export const DoorInsideInsertBG: React.FC = () => (
  <svg viewBox="0 0 1080 1920" style={svgBox(1080, 1920)}>
    <defs>
      <linearGradient id="diWood" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#1a100a" />
        <stop offset="0.5" stopColor="#2b1a0f" />
        <stop offset="1" stopColor="#160d07" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#diWood)" />
    {Array.from({ length: 26 }).map((_, i) => (
      <path key={i} d={`M ${i * 44} 0 C ${i * 44 + 20} 600 ${i * 44 - 20} 1300 ${i * 44 + 10} 1920`} stroke="#000" strokeOpacity="0.22" strokeWidth="3" fill="none" />
    ))}
    <rect x="80" y="160" width="920" height="560" fill="none" stroke="#0e0805" strokeWidth="16" />
    <rect x="80" y="1260" width="920" height="560" fill="none" stroke="#0e0805" strokeWidth="16" />
    <rect x="300" y="820" width="150" height="420" rx="20" fill="#6e5528" />
    <rect x="300" y="820" width="150" height="420" rx="20" fill="#000" opacity="0.35" />
    <ellipse cx="375" cy="1150" rx="16" ry="30" fill="#0a0603" />
  </svg>
);

/** Kapı kolu (pivot 375,930). angle: derece, aşağı dönüş pozitif. */
export const DoorHandle: React.FC<{ angle: number; glint: number }> = ({ angle, glint }) => {
  if (has(setLayerPath("BR_DOOR_INSIDE_INSERT", "handle.png")))
    return (
      <Img
        src={src(setLayerPath("BR_DOOR_INSIDE_INSERT", "handle.png"))}
        style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transformOrigin: "375px 930px", transform: `rotate(${angle}deg)` }}
      />
    );
  return (
    <svg viewBox="0 0 1080 1920" style={svgBox(1080, 1920)}>
      <defs>
        <linearGradient id="dhBrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8b46a" />
          <stop offset="0.45" stopColor="#8a6a30" />
          <stop offset="1" stopColor="#3f2f14" />
        </linearGradient>
      </defs>
      <g transform={`rotate(${angle} 375 930)`}>
        <circle cx="375" cy="930" r="62" fill="url(#dhBrass)" />
        <rect x="375" y="900" width="420" height="62" rx="31" fill="url(#dhBrass)" />
        <rect x="420" y="904" width="340" height="12" rx="6" fill="#fff3d0" opacity={0.25 + glint * 0.5} />
      </g>
    </svg>
  );
};

/** Sehpa yüzeyi (makro). */
export const TableInsertBG: React.FC = () => (
  <svg viewBox="0 0 1080 1920" style={svgBox(1080, 1920)}>
    <defs>
      <linearGradient id="tiWood" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2a1a0f" />
        <stop offset="0.6" stopColor="#4b2e19" />
        <stop offset="1" stopColor="#7a4a26" />
      </linearGradient>
      <radialGradient id="tiLamp" cx="1000" cy="500" r="1100" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffb35a" stopOpacity="0.35" />
        <stop offset="1" stopColor="#ffb35a" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#tiWood)" />
    {Array.from({ length: 34 }).map((_, i) => (
      <path key={i} d={`M -100 ${i * 64} C 300 ${i * 64 + 40} 700 ${i * 64 - 30} 1200 ${i * 64 + 20}`} stroke="#000" strokeOpacity={0.12 + (i % 3) * 0.05} strokeWidth="3" fill="none" />
    ))}
    <ellipse cx="260" cy="1500" rx="110" ry="60" fill="none" stroke="#1e1109" strokeWidth="8" opacity="0.4" />
    <rect width="1080" height="1920" fill="url(#tiLamp)" />
    <rect width="1080" height="1920" fill="#0a1020" opacity="0.25" />
  </svg>
);
