#!/usr/bin/env bash
# Render sonrası kontrol: süre, çözünürlük, fps, kodek, ses, oynatılabilirlik, sahne kareleri
set -e
V="${1:-$(dirname "$0")/../../cikti/kameradaki_ikinci_kardes_bolum_01.mp4}"
echo "== $V"
ffprobe -v error -show_entries format=duration,size,bit_rate -show_entries stream=codec_name,profile,width,height,r_frame_rate,nb_frames,pix_fmt,sample_rate,channels -of default=nw=1 "$V"
echo "== tam çözme testi (hata varsa aşağıda görünür)"
ffmpeg -v error -i "$V" -f null - && echo "çözme: HATASIZ"
echo "== ses yüksekliği"
ffmpeg -hide_banner -i "$V" -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|LRA:|Peak:" | tail -3
