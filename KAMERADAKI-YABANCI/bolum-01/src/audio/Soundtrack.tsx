// SES KURGUSU — yalnızca diskte GERÇEKTEN bulunan dosyalar çalınır (npm run scan).
// Diyalog: her replik kendi dosyası, senaryodaki `at` anında başlar.
// Efekt: sahne efekt listesi. Ortam: yağmur / oda tonu / müzik yatakları (döngü + zarf).
// Müzik 113.6'da (S17) aniden kesilir; 118.5'te her şey kararır (yalnızca son vuruş kalır).
import React from "react";
import { Audio, Sequence, interpolate } from "remotion";
import { ALL_LINES, ALL_SFX, AMBIENCE, BLACKOUT_AT } from "../data/script";
import { ambPath, durationOf, has, sfxPath, src, voicePath } from "../lib/assets";
import { f } from "../config";

const VOICE_GAIN: Record<string, number> = { kerem: 1.0, defne: 1.0, yabanci: 1.15 };

export const envelope = (frame: number, dur: number, fadeIn: number, fadeOut: number) =>
  Math.min(
    fadeIn > 0 ? interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" }) : 1,
    fadeOut > 0 ? interpolate(frame, [dur - fadeOut, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1,
  );

export const Soundtrack: React.FC = () => (
  <>
    {ALL_LINES.filter((l) => has(voicePath(l.id))).map((l) => {
      const real = durationOf(voicePath(l.id)) ?? l.window;
      return (
        <Sequence key={l.id} from={f(l.at)} durationInFrames={Math.max(1, f(Math.min(real + 0.1, BLACKOUT_AT - l.at)))} name={`VO ${l.id}`}>
          <Audio src={src(voicePath(l.id))} volume={VOICE_GAIN[l.speaker]} />
        </Sequence>
      );
    })}
    {ALL_SFX.filter((x) => has(sfxPath(x.file))).map((x) => {
      const real = durationOf(sfxPath(x.file)) ?? x.duration;
      const len = x.at < BLACKOUT_AT ? Math.min(real, BLACKOUT_AT - x.at) : real;
      return (
        <Sequence key={x.id} from={f(x.at)} durationInFrames={Math.max(1, f(len))} name={`SFX ${x.id}`}>
          <Audio src={src(sfxPath(x.file))} volume={x.volume} />
        </Sequence>
      );
    })}
    {AMBIENCE.filter((a) => has(ambPath(a.file))).map((a) => {
      const dur = f(a.to - a.from);
      const loopLen = Math.max(30, f(durationOf(ambPath(a.file)) ?? 10) - 2);
      const pieces = Math.ceil(dur / loopLen);
      return (
        <Sequence key={a.id} from={f(a.from)} durationInFrames={dur} name={`AMB ${a.id}`}>
          {Array.from({ length: pieces }).map((_, i) => (
            <Sequence key={i} from={i * loopLen} durationInFrames={Math.min(loopLen, dur - i * loopLen)}>
              <Audio src={src(ambPath(a.file))} volume={(fr) => a.volume * envelope(fr + i * loopLen, dur, f(a.fadeIn), f(a.fadeOut))} />
            </Sequence>
          ))}
        </Sequence>
      );
    })}
  </>
);
