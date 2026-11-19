import { Config } from "@remotion/cli/config";

// KAMERADAKİ YABANCI — 1. Bölüm render ayarları (dikey 9:16, 30 fps)
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setCodec("h264");
Config.setCrf(17);
Config.setPixelFormat("yuv420p");
Config.setConcurrency(null);
Config.setOverwriteOutput(true);
// Bulut/CI ortamlarında Remotion kendi headless kabuğunu indiremezse:
//   REMOTION_BROWSER=/opt/pw-browsers/chromium/... npx remotion render ...
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
