#!/usr/bin/env bash
# 1dkdua — bir videonun tamamını üretir: ortam sesi + miks → kareler → MP4 (ses + görüntü)
# Kullanım:  araclar/uret.sh videolar/01-imtihan-sahasi [isci=4]
# Önkoşul: videolar/<ad>/ses/konusma_temiz.wav ve veri/zaman_cizelgesi.js hazır olmalı (bkz. STIL-REHBERI.md → Süreç).
set -euo pipefail
KOK="$(cd "$(dirname "$0")/.." && pwd)"; cd "$KOK"
V="${1:?video klasörü}"; ISCI="${2:-4}"; AD="$(basename "$V")"
mkdir -p cikti
echo "1/3 Ortam sesi ve miks…"
python3 -I araclar/ortam_sesi.py "$V/ses/konusma_temiz.wav" "$V/ses/miks.wav" "$V/ses/ortam.wav"
echo "2/3 Kareler çiziliyor…"
NODE_PATH="${NODE_PATH:-$(npm root -g)}" node araclar/render.js "$V" "cikti/.${AD}_goruntu.mp4" "$ISCI"
echo "3/3 Ses ve görüntü birleştiriliyor…"
ffmpeg -loglevel error -y -i "cikti/.${AD}_goruntu.mp4" -i "$V/ses/miks.wav" -map 0:v:0 -map 1:a:0 \
  -c:v copy -c:a aac -b:a 256k -ar 44100 -ac 2 -metadata:s:a:0 language=tur -metadata title="1dkdua | Hikmetli Kareler" \
  -movflags +faststart -shortest "cikti/1dkdua_${AD}.mp4"
rm -f "cikti/.${AD}_goruntu.mp4"
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate,sample_rate -of compact "cikti/1dkdua_${AD}.mp4"
echo "Bitti → cikti/1dkdua_${AD}.mp4"
