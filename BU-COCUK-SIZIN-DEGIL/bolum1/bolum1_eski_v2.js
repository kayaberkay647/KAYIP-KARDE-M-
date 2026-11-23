/* ==========================================================================
   BU ÇOCUK SİZİN DEĞİL — 1. BÖLÜM (yeniden yapım)
   Senaryo, karakter sesleri, ortam sesleri, müzik ve kamera planları burada.
   Değişiklikten sonra:  node ses_uret.js  →  node video_disa_aktar.js
   ========================================================================== */
const BOLUM = {
  no: 1,
  diziAdi: "BU ÇOCUK SİZİN DEĞİL",
  bolumYazisi: "Bölüm 1",
  hedefSure: 150,              // saniye
  diyalogModeli: "eleven_v3",  // ElevenLabs diyalog modu (karakterler birbirine cevap verir gibi konuşur)
  stabilite: 0.5,              // 0 = çok duygusal/değişken, 0.5 = doğal, 1 = sabit
  hedefTempo: 2.0,             // saniyede kelime. Her sahne bu tempoya eşitlenir (tutarlı, ne hızlı ne yavaş)
  konusmaHizi: 1.0,            // ek genel hız çarpanı

  // Karakterler ve ElevenLabs sesleri (dizi boyunca aynı kalmalı)
  karakterler: {
    ASLI:  { ad: "Aslı",       yas: 33, ses: "ZaoBgxgzPhoCm533Pb7B", sesAdi: "Zeynep – Warm & Rich" },
    KEREM: { ad: "Kerem",      yas: 38, ses: "tILIOdKERNNbBHVEXk7I", sesAdi: "Hasan Yasin – Warm Turkish Narrator" },
    NIHAL: { ad: "Dr. Nihal",  yas: 45, ses: "8WPhqbK1tiExOyeiOUT0", sesAdi: "Mine – Natural, Steady and Calm" },
    DURU:  { ad: "Duru",       yas: 8,  ses: "rtnDjO8siSxeTEeTVczO", sesAdi: "Gözde (karakter seslendirme)" },
  },

  // Sahneler. Her sahnenin diyaloğu tek parça üretilir → doğal akış.
  // kim: konuşan (ASLI_IC = Aslı'nın iç sesi: ağız oynamaz)
  // ses: ElevenLabs'a giden metin ([etiketler] okunmaz, duyguya dönüşür) · metin: altyazı
  // plan: kamera planı · ek: replik ortasında plan değişimi · duygu: yüz ifadeleri · poz: kol/el hareketleri
  // bak: sadece o replik için bakış (karakter adı, kamera, asagi, kacamak, pencere, telefon, yol). Yoksa otomatik: dinleyen konuşana bakar.
  // vurgu: replikten önceki boşluğun payı (varsayılan 1) · efekt: [{ t: replik başına göre saniye, ad }]
  sahneler: [
    { id: "S1", mekan: "muayene", ortam: "muayene", muzik: null, replikler: [
      { id: "R01", kim: "NIHAL", plan: "nihalOrta",
        duygu: { NIHAL: "ciddi", ASLI: "merakli", KEREM: "notr" }, poz: { NIHAL: "kagit" },
        ses: "[serious] Aslı Hanım, Kerem Bey… Duru'nun ameliyat öncesi kan tahlili geldi. [pause] Kan grubu AB.",
        metin: "Aslı Hanım, Kerem Bey… Duru'nun ameliyat öncesi kan tahlili geldi. Kan grubu AB." },
      { id: "R02", kim: "ASLI", plan: "asliYakin", duygu: { ASLI: "endise" },
        ses: "[confused] Eee… tamam? [nervous laugh] Bir sorun mu var?",
        metin: "Eee… tamam? Bir sorun mu var?" },
      { id: "R03", kim: "NIHAL", plan: "nihalOmuz", ek: [{ f: 0.45, plan: "kagitYakin" }], duygu: { NIHAL: "uzgun" }, poz: { NIHAL: "masa" },
        ses: "[hesitant] Sizin ikinizin kan grubu sıfır. [sighs] İki sıfır grubundan… AB grubu bir çocuk olamaz.",
        metin: "Sizin ikinizin kan grubu sıfır. İki sıfır grubundan… AB grubu bir çocuk olamaz." },
      { id: "R04", kim: "ASLI", plan: "asliYakin", efekt: [{ t: -0.35, ad: "vurus" }], duygu: { ASLI: "sok" }, poz: { ASLI: "gogus" },
        ses: "[shocked] Ne demek olamaz? [voice trembling] Ben o çocuğu dokuz ay karnımda taşıdım!",
        metin: "Ne demek olamaz? Ben o çocuğu dokuz ay karnımda taşıdım!" },
      { id: "R05", kim: "NIHAL", plan: "nihalYakin", duygu: { NIHAL: "sefkat" },
        ses: "[gently] Testi iki kez tekrarladık. [pause] Sonuç aynı.",
        metin: "Testi iki kez tekrarladık. Sonuç aynı." },
      { id: "R05b", kim: "NIHAL", plan: "nihalOmuz", duygu: { NIHAL: "ciddi", ASLI: "aglama" }, poz: { NIHAL: "masa", ASLI: "agiz" },
        ses: "[carefully] Doğumun yapıldığı hastaneyle görüşmenizi öneririm. [lowers voice] Bazen… bebekler karışabiliyor.",
        metin: "Doğumun yapıldığı hastaneyle görüşmenizi öneririm. Bazen… bebekler karışabiliyor." },
    ]},
    { id: "S2", mekan: "mutfak", ortam: "mutfak", muzik: "ani", gecmis: true, oncePlan: "baslik", replikler: [
      { id: "R06", kim: "ASLI_IC", plan: "mutfakGenis", duygu: { ASLI: "gulumse", DURU: "aci", KEREM: "gulumse" }, poz: { DURU: "kulak", ASLI: "yan", KEREM: "yan" },
        ses: "[softly] Üç gün önce… her şey o kadar normaldi ki.",
        metin: "Üç gün önce… her şey o kadar normaldi ki." },
      { id: "R07", kim: "DURU", plan: "duruMasa",
        ses: "[whiny] Anneee… kulağım yine ağrıyor. [sniffles] Bu sefer çok fena.",
        metin: "Anne… kulağım yine ağrıyor. Bu sefer çok fena." },
      { id: "R08", kim: "KEREM", plan: "keremDuru", duygu: { KEREM: "sefkat" }, poz: { KEREM: "alin" },
        ses: "[warmly] Gel bakayım buraya, prenses. [concerned] Ateşin de var senin. Yarın sabah ilk iş doktora gidiyoruz, tamam mı?",
        metin: "Gel bakayım buraya, prenses. Ateşin de var senin. Yarın sabah ilk iş doktora gidiyoruz, tamam mı?" },
      { id: "R09", kim: "DURU", plan: "duruMasa", duygu: { DURU: "endise" },
        ses: "[sulky] Ama iğne yok, değil mi?",
        metin: "Ama iğne yok, değil mi?" },
      { id: "R10", kim: "KEREM", plan: "keremDuru", duygu: { KEREM: "gulumse", DURU: "gulumse" }, poz: { KEREM: "yan" },
        ses: "[chuckles] İğne yok. Söz.",
        metin: "İğne yok. Söz." },
      { id: "R10b", kim: "ASLI", plan: "mutfakGenis", duygu: { ASLI: "gulumse" }, bak: { ASLI: "KEREM" },
        ses: "[laughs] Baban söz verdiyse tamamdır, kızım.",
        metin: "Baban söz verdiyse tamamdır, kızım." },
      { id: "R11", kim: "ASLI_IC", plan: "kanTupu",
        ses: "[sighs] Kulağına küçük bir tüp takılacaktı. Ameliyattan önce de üçümüzden kan aldılar. [bitterly] Sadece bir formalite… dediler.",
        metin: "Kulağına küçük bir tüp takılacaktı. Ameliyattan önce de üçümüzden kan aldılar. Sadece bir formalite… dediler." },
    ]},
    { id: "S3", mekan: "muayene", ortam: "muayene", muzik: "gizem", replikler: [
      { id: "R12", kim: "ASLI", plan: "cift", duygu: { ASLI: "aglama", KEREM: "sakin", NIHAL: "uzgun" }, poz: { ASLI: "yan", KEREM: "kollar" }, bak: { ASLI: "KEREM", KEREM: "asagi" },
        ses: "[crying] Kerem… bir şey söylesene! [desperate] Bu bir hata, değil mi?",
        metin: "Kerem… bir şey söylesene! Bu bir hata, değil mi?" },
      { id: "R13", kim: "KEREM", plan: "keremYakin", bak: { KEREM: "ASLI" },
        ses: "[calmly] Sakin ol, Aslı. [dismissive] Laboratuvarlar karıştırır böyle şeyleri. Yeniden yaptırırız.",
        metin: "Sakin ol, Aslı. Laboratuvarlar karıştırır böyle şeyleri. Yeniden yaptırırız." },
      { id: "R14", kim: "NIHAL", plan: "nihalYakin", duygu: { NIHAL: "supheli" }, poz: { NIHAL: "gozluk" }, bak: { NIHAL: "KEREM" },
        ses: "[suspicious] Kerem Bey… [pause] siz hiç şaşırmadınız.",
        metin: "Kerem Bey… siz hiç şaşırmadınız." },
      { id: "R15", kim: "ASLI_IC", plan: "keremYakin", ek: [{ f: 0.5, plan: "asliYakin" }], duygu: { ASLI: "uzgun", KEREM: "sakin" }, bak: { KEREM: "kacamak", ASLI: "KEREM" },
        ses: "[whispering] Doktor haklıydı. [trembling] Kerem ne bir soru sordu… ne de dönüp kızına baktı.",
        metin: "Doktor haklıydı. Kerem ne bir soru sordu… ne de dönüp kızına baktı." },
    ]},
    { id: "S4", mekan: "koridor", ortam: "koridor", muzik: "gizem", replikler: [
      { id: "R16", kim: "DURU", plan: "koridorGenis", duygu: { DURU: "endise", ASLI: "uzgun" }, bak: { DURU: "ASLI", ASLI: "DURU" },
        ses: "[worried] Anne? Sen ağladın mı?",
        metin: "Anne? Sen ağladın mı?" },
      { id: "R17", kim: "ASLI", plan: "asliKoridor", duygu: { ASLI: "zorGulumse" },
        ses: "[forced smile] Yok bir tanem… gözüme bir şey kaçtı.",
        metin: "Yok bir tanem… gözüme bir şey kaçtı." },
      { id: "R18", kim: "DURU", plan: "duruKoridor", duygu: { DURU: "umut" },
        ses: "[hopeful] Ameliyattan sonra kulağım geçecek mi?",
        metin: "Ameliyattan sonra kulağım geçecek mi?" },
      { id: "R19", kim: "ASLI", plan: "sarilma", duygu: { ASLI: "aglama", DURU: "gulumse" }, poz: { ASLI: "saril", DURU: "saril" },
        ses: "[voice breaking] Geçecek. [whispers] Söz veriyorum… her şey geçecek.",
        metin: "Geçecek. Söz veriyorum… her şey geçecek." },
    ]},
    { id: "S5", mekan: "araba", ortam: "araba", muzik: "gerilim", replikler: [
      { id: "R20", kim: "ASLI_IC", plan: "arabaGenis", duygu: { DURU: "uyku", ASLI: "uzgun", KEREM: "notr" }, poz: { KEREM: "direksiyon", ASLI: "yan" }, bak: { ASLI: "pencere" },
        ses: "[quietly] Eve dönerken arabada kimse konuşmadı. Duru arkada uyuyakalmıştı.",
        metin: "Eve dönerken arabada kimse konuşmadı. Duru arkada uyuyakalmıştı." },
      { id: "R21", kim: "ASLI_IC", plan: "telefon", vurgu: 2.2, efekt: [{ t: -1.0, ad: "telefon" }], bak: { KEREM: "telefon" },
        ses: "[tense] Sonra Kerem'in telefonu titredi. Mesaja baktı… ve hemen sildi.",
        metin: "Sonra Kerem'in telefonu titredi. Mesaja baktı… ve hemen sildi." },
      { id: "R21b", kim: "ASLI", plan: "arabaGenis", duygu: { ASLI: "supheli" }, bak: { ASLI: "KEREM", KEREM: "yol" }, poz: { KEREM: "direksiyon" },
        ses: "[quietly] Kimdi?",
        metin: "Kimdi?" },
      { id: "R21c", kim: "KEREM", plan: "keremAraba", duygu: { KEREM: "sakin" },
        ses: "[flat] İşten biri. [pause] Önemli değil.",
        metin: "İşten biri. Önemli değil." },
      { id: "R22", kim: "ASLI_IC", plan: "ayna", ek: [{ f: 0.62, plan: "asliAraba" }], duygu: { ASLI: "sok" }, bak: { ASLI: "KEREM" },
        ses: "[whispers] Ama ben aynadan okumuştum. [frightened] İki kelime… Doktor biliyor.",
        metin: "Ama ben aynadan okumuştum. İki kelime… “Doktor biliyor.”" },
      { id: "R23", kim: "ASLI_IC", plan: "keremAraba", ek: [{ f: 0.5, plan: "asliAraba" }], duygu: { ASLI: "aglama", KEREM: "sakin" }, bak: { KEREM: "yol" },
        ses: "[crying softly] O gece anladım. Kocam bu gerçeği… benden çok önce biliyordu.",
        metin: "O gece anladım. Kocam bu gerçeği… benden çok önce biliyordu." },
    ]},
    { id: "S6", mekan: "salon", ortam: "salon", muzik: "gerilim", replikler: [
      { id: "R24", kim: "ASLI", plan: "kapanis", duygu: { ASLI: "ciddi" }, bak: { ASLI: "kamera" },
        ses: "[softly] Sence o mesajı kim attı? Yorumlara yaz… [whispers] devamı ikinci bölümde.",
        metin: "Sence o mesajı kim attı? Yorumlara yaz… devamı ikinci bölümde." },
    ]},
  ],

  // ElevenLabs ses efektleri (gerçek kayıt kalitesinde ortam sesleri). seviye: konuşmanın altında kalacak şekilde
  ortamSesleri: {
    muayene: { seviye: 0.20, sure: 22, dongu: true,  istem: "Quiet hospital doctor's office room tone, soft air conditioning hum, very distant muffled hallway voices, faint clock ticking, no music" },
    mutfak:  { seviye: 0.16, sure: 22, dongu: true,  istem: "Calm morning kitchen ambience in an apartment, birds chirping outside an open window, distant city traffic, soft tea kettle simmering, no music" },
    koridor: { seviye: 0.20, sure: 22, dongu: true,  istem: "Hospital corridor ambience, distant indistinct people talking, echoing footsteps far away, soft intercom chime, reverberant hallway, no music" },
    araba:   { seviye: 0.16, sure: 22, dongu: true,  istem: "Inside a moving car at night in the rain, rain drumming on the roof, windshield wipers swishing slowly, low steady engine hum, no music" },
    salon:   { seviye: 0.18, sure: 22, dongu: true,  istem: "Quiet living room at night, soft wall clock ticking, faint wind outside the window, very quiet room tone, no music" },
  },
  spotEfektler: {
    telefon: { seviye: 0.55, sure: 2,   istem: "Smartphone vibrating twice on a car center console, buzzing vibration" },
    vurus:   { seviye: 0.60, sure: 3.5, istem: "Deep cinematic boom impact with long reverb tail, dramatic reveal hit, no music" },
    gecis:   { seviye: 0.45, sure: 1.5, istem: "Soft cinematic whoosh transition" },
  },
  // ElevenLabs müzik (enstrümantal fon müziği)
  muzikler: {
    gizem:   { seviye: 0.24, sure: 60, istem: "Slow mysterious emotional cinematic piano, sparse notes, soft low strings, melancholic family drama underscore, instrumental, no vocals, no drums" },
    ani:     { seviye: 0.24, sure: 30, istem: "Warm gentle nostalgic piano, tender family memory, soft and hopeful, slow tempo, instrumental, no vocals, no drums" },
    gerilim: { seviye: 0.24, sure: 45, istem: "Dark tense cinematic suspense underscore, low sustained strings, subtle heartbeat pulse, slow build, instrumental, no vocals" },
  },

  yazilar: {
    geriDonus: "3 GÜN ÖNCE",
    kagitHasta: "DURU YILMAZ (8)",
    telefonGonderen: "Bilinmeyen Numara",
    telefonMesaj: "Doktor biliyor.",
    sonKartUst: "2. BÖLÜM YAKINDA",
    sonKartAlt: "Takip et  •  Tahminini yorumlara yaz",
  },
};
if (typeof module !== "undefined") module.exports = BOLUM;
