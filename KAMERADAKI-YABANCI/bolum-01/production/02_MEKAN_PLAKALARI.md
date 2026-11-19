# 02 · Mekân Plakaları
> Bu dosya `npm run prompts` ile `src/data/` içinden otomatik üretilir. Elle düzenlemeyin; kaynağı düzenleyin.

```
EV KAT PLANI (kuzey yukarı)

  ┌────────── DEFNE'NİN ODASI ──────────┐
  │ [masa]      [PENCERE/koyu perde]  [komodin]
  │ ▲CAM01 (kuzeybatı üst köşe)      [YATAK — doğu duvarı boyunca]
  │                                    │
  │ [KAPI — güney duvarının batı yarısı]│
  └──────┬──────────────────────────────┘
         │ KORİDOR (dar, uzun, ahşap zemin, krem duvar, ortada titreyen tavan lambası)
         │ Koridorun ucunda Defne'nin kapısı. CAM02 diye bir kamera YOKTUR.
         │
  ┌──────┴──────────── SALON ──────────────────┐
  │ [PENCERE, sol]  [MAVİ KANEPE + üstünde DUVAR SAATİ]  [AYAKLI LAMBA]  [KORİDOR AĞZI, sağ]
  │                 [AHŞAP SEHPA kanepenin önünde]
  └────────────────────────────────────────────┘

Kerem kanepenin SOL ucunda (sehpaya yakın), Defne SAĞ ucunda battaniyeyle oturur.
Telefon: S04 Kerem'in elinde → S06 sehpada → S06 sonu Kerem alır → S08'den itibaren Defne tutar.
Odada kardeşler S16'dan sonra KAPIYA DÖNÜK durur (yüzleri BR_DOOR_POV yönünden, sırtları BR_INTERIOR yönünden çekilir).
```

Genel: gece, şiddetli olmayan yağmur, zaman zaman rüzgâr. Renkler: koyu lacivert, soluk gri, soğuk mavi, loş sarı ışık.
Plakalarda **karakter, yazı, logo olmamalı**. Canlı öğeler (yağmur damlası, lamba titremesi, saat saniyesi, telefon ekranı, kamera LED'i, kapı kolu dönüşü, kablo) kodla üstüne eklenir.


## LR_MASTER — SALON
- Kullanıldığı sahneler: S03, S04, S05, S06, S07, S08
- Sahne koordinatı: 2400x1920 · Üretim çözünürlüğü: **4800x3840**
- Dosyalar:
  - `public/assets/sets/LR_MASTER/bg.png` (zorunlu) — Duvarlar, pencere, perdeler, kanepe, saat, lamba, koridor ağzı
  - `public/assets/sets/LR_MASTER/fg.png` (isteğe bağlı) — Ön plan: ahşap sehpa (karakterlerin önünde kalır), şeffaf PNG

**Prompt:** realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text. Wide interior of an old but well-kept Turkish family living room at 3 AM, very wide panorama. From left to right: a tall window with heavy dark curtains slightly open, cold blue rainy night outside with raindrops on the glass; a worn blue fabric three-seat sofa against the back wall with a folded knit blanket; an old round wall clock above the sofa showing 03:13; a floor lamp with a warm yellow fabric shade on the right of the sofa casting a soft amber pool of light; on the far right a doorway opening into a long, narrow, dark hallway with a cream wall, wooden floor and one dim ceiling light deep inside. A small wooden coffee table in front of the sofa. Dark navy and muted gray shadows, warm amber practical light vs cold blue moonlight, subtle volumetric light, eye-level camera.

**Negative:** 3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors, people, person, figure


## LR_TABLE_INSERT — SALON
- Kullanıldığı sahneler: S06
- Sahne koordinatı: 1080x1920 · Üretim çözünürlüğü: **2160x3840**
- Dosyalar:
  - `public/assets/sets/LR_TABLE_INSERT/bg.png` (zorunlu) — Sehpa yüzeyi makro; telefonun ekranını kod çizer

**Prompt:** realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text. Extreme close-up top-down 3/4 angle of an old scratched wooden coffee table surface at night, warm wood grain, a faint ring stain from a tea glass, soft amber lamp light from the right, cold blue window light from the left, shallow depth of field, empty space in the center where a smartphone will lie.

**Negative:** 3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors, people, person, figure


## HW_MASTER — KORIDOR
- Kullanıldığı sahneler: S05, S09, S16
- Sahne koordinatı: 1080x1920 · Üretim çözünürlüğü: **2160x3840**
- Dosyalar:
  - `public/assets/sets/HW_MASTER/bg.png` (zorunlu) — Salondan Defne'nin kapısına bakan tek nokta perspektif

**Prompt:** realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text. One-point perspective view down a long, narrow hallway of an old family apartment at night, seen from the living room end at eye level. Old wooden plank floor, cream painted walls with slight age stains, a single ceiling light fixture halfway down giving dim cold light, at the far end a closed dark wooden bedroom door with a brass lever handle. Cold blue shadows, faint warm light spill on the floor from behind the camera, deep unsettling darkness near the door.

**Negative:** 3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors, people, person, figure


## HW_REVERSE — KORIDOR
- Kullanıldığı sahneler: S09, S16
- Sahne koordinatı: 1080x1920 · Üretim çözünürlüğü: **2160x3840**
- Dosyalar:
  - `public/assets/sets/HW_REVERSE/bg.png` (zorunlu) — Defne'nin kapısından salona doğru ters açı; uçta sıcak salon ışığı

**Prompt:** realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text. Reverse one-point perspective view of the same long, narrow hallway at night, seen from just outside the bedroom door looking back toward the living room. Old wooden plank floor, cream walls in cold blue shadow, one dim ceiling light halfway, and at the far end the open doorway of the living room glowing with warm amber lamp light. Completely empty.

**Negative:** 3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors, people, person, figure


## HW_CAM02 — KORIDOR
- Kullanıldığı sahneler: S15, S16, S17
- Sahne koordinatı: 1080x1920 · Üretim çözünürlüğü: **1620x2880**
- Dosyalar:
  - `public/assets/sets/HW_CAM02/bg.png` (zorunlu) — İmkânsız yüksek açı: tavanın köşesinden koridor (CCTV efekti kodla eklenir)

**Prompt:** realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text. Impossible high-angle view from the very top corner of the ceiling of the same long narrow hallway, looking down toward the closed bedroom door (Defne's door) at the end, wide-angle lens distortion, old wooden floor, cream walls, one dim ceiling light. Monochrome-friendly lighting, very dark, empty.

**Negative:** 3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors, people, person, figure


## BR_CAM01 — DEFNE'NİN ODASI
- Kullanıldığı sahneler: S01, S07, S11, S12, S14
- Sahne koordinatı: 1080x1920 · Üretim çözünürlüğü: **1620x2880**
- Dosyalar:
  - `public/assets/sets/BR_CAM01/bg.png` (zorunlu) — Kuzeybatı üst köşedeki güvenlik kamerasının bakış açısı

**Prompt:** realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text. High corner security camera view of a teenage girl's small bedroom at night, wide-angle lens with slight barrel distortion, looking down diagonally. A single bed with rumpled gray-blue sheets along the right side wall, a small bedside table with an unlit lamp, a closed dark wooden door in the far wall, wooden floor. Pale moonlight from a window behind the camera falls on the floor in a long rectangle. Very dark blue shadows, the room is empty.

**Negative:** 3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors, people, person, figure


## BR_DOOR_POV — DEFNE'NİN ODASI
- Kullanıldığı sahneler: S10, S11, S13, S14, S15, S16, S17, S18
- Sahne koordinatı: 1080x1920 · Üretim çözünürlüğü: **2160x3840**
- Dosyalar:
  - `public/assets/sets/BR_DOOR_POV/bg.png` (zorunlu) — Kapıdan içeri: pencere karşıda, yatak sağda, masa solda, kamera sol üst köşede

**Prompt:** realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text. Eye-level view from the doorway into a teenage girl's small bedroom at night. Opposite wall: a window with heavy dark curtains, cold moonlight leaking through the gap and rain on the glass. Right side: a single bed with gray-blue sheets along the wall and a small bedside table. Left side: a small study desk with books and a desk lamp turned off. High in the top-left corner of the room a small white wall-mounted home security camera with a thin power cable running down the wall to a socket. Cold blue moonlight, deep shadows.

**Negative:** 3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors, people, person, figure


## BR_INTERIOR — DEFNE'NİN ODASI
- Kullanıldığı sahneler: S11, S17, S18
- Sahne koordinatı: 1080x1920 · Üretim çözünürlüğü: **2160x3840**
- Dosyalar:
  - `public/assets/sets/BR_INTERIOR/bg.png` (zorunlu) — Pencere tarafından kapıya bakış; kardeşlerin sırt planı + S18 imkânsız görüntü

**Prompt:** realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text. Eye-level reverse view inside the same small teenage bedroom at night, looking from the window side toward the closed dark wooden door slightly right of center in the far wall, brass lever handle. Left foreground edge: the foot of the single bed with gray-blue sheets. Cream walls in deep blue shadow, moonlight from behind the camera, wooden floor, oppressive empty space in the middle of the room.

**Negative:** 3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors, people, person, figure


## BR_WALLCAM_INSERT — DEFNE'NİN ODASI
- Kullanıldığı sahneler: S13, S14
- Sahne koordinatı: 1080x1920 · Üretim çözünürlüğü: **2160x3840**
- Dosyalar:
  - `public/assets/sets/BR_WALLCAM_INSERT/bg.png` (zorunlu) — Duvar, kamera gövdesi, priz (kablo ve LED kodla çizilir)

**Prompt:** realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text. Close-up vertical shot of a cream bedroom wall corner at night: a small white home security camera mounted high on the wall at the top of the frame, and an old white wall power socket near the bottom of the frame. No cable visible (cable is animated separately). Cold blue moonlight, realistic wall texture and soft shadows.

**Negative:** 3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors, people, person, figure


## BR_DOOR_INSIDE_INSERT — DEFNE'NİN ODASI
- Kullanıldığı sahneler: S17
- Sahne koordinatı: 1080x1920 · Üretim çözünürlüğü: **2160x3840**
- Dosyalar:
  - `public/assets/sets/BR_DOOR_INSIDE_INSERT/bg.png` (zorunlu) — Kapının iç yüzü (kol HARİÇ)
  - `public/assets/sets/BR_DOOR_INSIDE_INSERT/handle.png` (zorunlu) — Pirinç kapı kolu, şeffaf PNG, pivot sol-orta (dönüşü kod yapar)

**Prompt:** realistic cinematic 2D anime background art, hand-painted, highly detailed, no characters, no text. Extreme close-up of the inside of an old dark wooden bedroom door at night, a worn brass lever door handle and keyhole plate, realistic metal reflections catching faint cold light, deep shadows, dust in the air.

**Negative:** 3D render, Pixar style, CGI, chibi, childish cartoon, comedy expression, plastic skin, inconsistent face, different hairstyle, extra fingers, distorted hands, deformed anatomy, unrealistic eyes, blurry face, random text, letters, logo, watermark, signature, oversaturated colors, people, person, figure

