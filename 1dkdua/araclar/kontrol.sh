#!/usr/bin/env bash
# 1dkdua — bitmiş videonun teknik kontrolü: biçim, süre, kare sayısı, donma (slayt etkisi), siyah kare, ses seviyesi
# Kullanım: araclar/kontrol.sh cikti/1dkdua_01-imtihan-sahasi.mp4
set -uo pipefail
F="${1:?mp4}"
echo "── Biçim"
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=codec_name,profile,width,height,r_frame_rate,pix_fmt,color_space,nb_read_frames,duration -of default=nw=1 "$F"
ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate,channels,bit_rate,start_time,duration -of default=nw=1 "$F"
echo "── Donma (0,5 sn'den uzun hareketsiz bölüm) — boş olmalı"
ffmpeg -hide_banner -i "$F" -vf "freezedetect=n=-62dB:d=0.5" -map 0:v:0 -f null - 2>&1 | grep -E "freeze_(start|duration)" || echo "donma yok"
echo "── Siyah kare (0,6 sn'den uzun) — yalnızca açılış/bitiş kararması beklenir"
ffmpeg -hide_banner -i "$F" -vf "blackdetect=d=0.6:pix_th=0.06" -map 0:v:0 -f null - 2>&1 | grep -E "black_start" || echo "uzun siyah yok"
echo "── Ses (EBU R128)"
ffmpeg -hide_banner -i "$F" -map 0:a:0 -af ebur128=peak=true -f null - 2>&1 | grep -A12 "Summary" | grep -E "I:|LRA:|Peak:"
