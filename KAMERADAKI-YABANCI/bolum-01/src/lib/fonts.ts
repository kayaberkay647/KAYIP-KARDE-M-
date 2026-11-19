// Yazı tipleri — npm (@fontsource) üzerinden YEREL olarak paketlenir; render sırasında ağ gerekmez.
// Türkçe karakterler (İ Ş Ğ Ç Ö Ü ı) latin-ext alt kümesindedir; yüklenmeden kare çekilmez.
import { continueRender, delayRender } from "remotion";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

export const INTER = "Inter, sans-serif";
export const SERIF = "'Cormorant Garamond', serif";
export const MONO = "'JetBrains Mono', monospace";

const SAMPLE = "KAMERADAKİ YABANCI ışğüşöç İŞĞÜÇÖ 0123456789";
if (typeof document !== "undefined") {
  const handle = delayRender("Yazı tipleri yükleniyor");
  Promise.all(
    [
      "400 40px Inter",
      "500 40px Inter",
      "600 40px Inter",
      "700 40px Inter",
      "500 40px 'Cormorant Garamond'",
      "600 40px 'Cormorant Garamond'",
      "400 40px 'JetBrains Mono'",
      "500 40px 'JetBrains Mono'",
    ].map((f) => document.fonts.load(f, SAMPLE)),
  )
    .catch((e) => console.error("Yazı tipi yüklenemedi", e))
    .finally(() => continueRender(handle));
}
