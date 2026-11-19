import React from "react";
import { Composition } from "remotion";
import { DURATION_FRAMES, FPS, HEIGHT, WIDTH } from "./config";
import { Episode } from "./Episode";

export const Root: React.FC = () => (
  <>
    {/* FİNAL: bilgi şeridi yok. `npm run render` önce tüm varlıkları doğrular. */}
    <Composition id="KY-E01" component={Episode} durationInFrames={DURATION_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} defaultProps={{ animatic: false, subtitles: true }} />
    {/* ANİMATİK: eksik çizimler vektör yer tutucuyla, üstte sahne/replik bilgi şeridi. */}
    <Composition id="KY-E01-Animatic" component={Episode} durationInFrames={DURATION_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} defaultProps={{ animatic: true, subtitles: true }} />
    {/* Altyazısız temiz çıktı (platform altyazısı / dublaj için) */}
    <Composition id="KY-E01-Clean" component={Episode} durationInFrames={DURATION_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} defaultProps={{ animatic: false, subtitles: false }} />
  </>
);
