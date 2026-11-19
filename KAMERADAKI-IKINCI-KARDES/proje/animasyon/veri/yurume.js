// Yürüyüş bölümleri — hem animasyon (adım fazı) hem ses (ayak sesi zamanları) bu dosyadan okunur.
// yol: [x, z] noktaları (metre), adim: adım sayısı. Ayak yere bastığında ses çıkar: t0 + k*(t1-t0)/adim, k=1..adim
window.YURUME = {
  "ARDA_salon":   { "kim": "ARDA",  "mekan": "salon",   "t0": 67.55, "t1": 69.35, "adim": 3, "yol": [[0.5, 3.3], [0.95, 2.62], [1.45, 1.75], [1.8, 0.9]], "zemin": "hali" },
  "ARDA_kor1":    { "kim": "ARDA",  "mekan": "koridor", "t0": 69.0,  "t1": 70.3,  "adim": 2, "yol": [[-0.7, 2.95], [-0.3, 3.0], [-0.02, 3.08]], "zemin": "tahta" },
  "ARDA_kor2":    { "kim": "ARDA",  "mekan": "koridor", "t0": 71.25, "t1": 72.55, "adim": 2, "yol": [[-0.02, 3.08], [0.0, 3.82]], "zemin": "tahta" },
  "ARDA_kor3":    { "kim": "ARDA",  "mekan": "koridor", "t0": 98.75, "t1": 99.65, "adim": 2, "yol": [[0.0, 3.82], [-0.2, 3.35], [-0.32, 3.1]], "zemin": "tahta", "hizli": true },
  "DEFNE_salon":  { "kim": "DEFNE", "mekan": "salon",   "t0": 110.55,"t1": 118.2, "adim": 10, "yol": [[-0.2, 3.12], [0.55, 3.0], [0.95, 2.45], [1.3, 1.5], [1.7, 0.55], [1.8, -0.1]], "zemin": "hali" },
  "DEFNE_kor":    { "kim": "DEFNE", "mekan": "koridor", "t0": 118.6, "t1": 119.75, "adim": 2, "yol": [[-0.8, 2.95], [-0.55, 2.98], [-0.36, 3.02]], "zemin": "tahta" },
  "SES_adim":     { "kim": "IKINCI","mekan": "koridor", "t0": 58.7,  "t1": 60.65, "adim": 3, "yol": [[0, 6.0], [0, 6.6]], "zemin": "tahta", "sadeceSes": true }
};
