/* ==========================================================================
   BU ÇOCUK SİZİN DEĞİL — 1. BÖLÜM  (referans videonun yapısında)
   Yapı: iki iç ses (Aslı + Kerem) + diyalog, kesintisiz akış, sert kesmeler,
   kısa altyazı parçaları (iç ses italik, konuşma düz), sürekli yumuşak fon müziği.
   Değişiklikten sonra:  node ses_uret.js  →  node video_disa_aktar.js
   ========================================================================== */
const BOLUM = {
  no: 1,
  diziAdi: "BU ÇOCUK SİZİN DEĞİL",
  hedefSure: 150,              // saniye
  diyalogModeli: "eleven_v3",  // ElevenLabs diyalog modu
  stabilite: 0.5,
  hedefTempo: 2.1,             // saniyede kelime (referans videoyla aynı tempo)
  replikArasi: 0.5,            // replikler arası boşluk (referans: 0.4–0.7 sn)
  sahneArasi: 0.75,            // sahne geçişinde boşluk

  karakterler: {
    ASLI:  { ad: "Aslı",      ses: "ZaoBgxgzPhoCm533Pb7B", sesAdi: "Zeynep – Warm & Rich" },
    KEREM: { ad: "Kerem",     ses: "tILIOdKERNNbBHVEXk7I", sesAdi: "Hasan Yasin – Warm Turkish Narrator" },
    NIHAL: { ad: "Dr. Nihal", ses: "8WPhqbK1tiExOyeiOUT0", sesAdi: "Mine – Natural, Steady and Calm" },
    DURU:  { ad: "Duru",      ses: "rtnDjO8siSxeTEeTVczO", sesAdi: "Gözde (karakter seslendirme)" },
  },

  // kim: konuşan · *_IC = iç ses (ağız oynamaz, altyazı italik)
  // ses: ElevenLabs'a giden metin ([etiket] okunmaz, duyguya dönüşür) · metin: altyazı
  // plan: kamera planı · ek: replik ortasında kesme [{f: oran, plan}] · duygu / poz / bak: karakter halleri
  // efekt: [{ t: replik başına göre sn, ad }] · ekBosluk: replikten önce ek sessizlik (sn)
  sahneler: [
    { id: "S1", mekan: "ofis", gun: "bugun", replikler: [
      { id: "R01", kim: "NIHAL", plan: "nihalMasa", ek: [{ f: 0.62, plan: "kagit" }], duygu: { NIHAL: "ciddi", ASLI: "merakli", KEREM: "notr" }, poz: { NIHAL: "kagit" },
        ses: "[serious] Aslı Hanım, Kerem Bey… Duru'nun kan tahlili geldi. [pause] Kan grubu AB.",
        metin: "Aslı Hanım, Kerem Bey… Duru'nun kan tahlili geldi. Kan grubu AB." },
      { id: "R02", kim: "ASLI", plan: "asliOfis", duygu: { ASLI: "endise" },
        ses: "[confused] Tamam… bir sorun mu var?",
        metin: "Tamam… bir sorun mu var?" },
      { id: "R03", kim: "NIHAL", plan: "nihalMasa", ek: [{ f: 0.5, plan: "ciftOfis" }], duygu: { NIHAL: "uzgun" }, poz: { NIHAL: "masa" },
        ses: "[hesitant] Sizin ikinizin kan grubu sıfır. [sighs] İki sıfırdan… AB grubu bir çocuk olamaz.",
        metin: "Sizin ikinizin kan grubu sıfır. İki sıfırdan… AB grubu bir çocuk olamaz." },
      { id: "R04", kim: "ASLI_IC", plan: "asliOfis", duygu: { ASLI: "sok" },
        ses: "[whispering, shaken] Doktor ne diyordu? Kulaklarım uğulduyordu. Ya da… duymak istemiyordum.",
        metin: "Doktor ne diyordu? Kulaklarım uğulduyordu. Ya da… duymak istemiyordum." },
      { id: "R05", kim: "ASLI", plan: "asliYakin", duygu: { ASLI: "aglama" }, poz: { ASLI: "gogus" },
        ses: "[shocked, voice trembling] Ne demek olamaz? Ben o çocuğu dokuz ay karnımda taşıdım!",
        metin: "Ne demek olamaz? Ben o çocuğu dokuz ay karnımda taşıdım!" },
      { id: "R06", kim: "KEREM_IC", plan: "keremOfis", duygu: { KEREM: "gergin" },
        ses: "[quietly, tense] İşte o gün geldi. Dokuz yıldır korktuğum gün.",
        metin: "İşte o gün geldi. Dokuz yıldır korktuğum gün." },
      { id: "R07", kim: "NIHAL", plan: "nihalMasa", duygu: { NIHAL: "sefkat" },
        ses: "[gently] Testi iki kez tekrarladık. Sonuç aynı.",
        metin: "Testi iki kez tekrarladık. Sonuç aynı." },
      { id: "R08", kim: "KEREM", plan: "keremOfis", duygu: { KEREM: "sakin" },
        ses: "[calmly] Laboratuvar hatasıdır. Yeniden yaptırırız.",
        metin: "Laboratuvar hatasıdır. Yeniden yaptırırız." },
      { id: "R09", kim: "NIHAL", plan: "nihalYakin", duygu: { NIHAL: "supheli" }, bak: { NIHAL: "KEREM" },
        ses: "[suspicious] Kerem Bey… [pause] siz hiç şaşırmadınız.",
        metin: "Kerem Bey… siz hiç şaşırmadınız." },
      { id: "R09b", kim: "ASLI_IC", plan: "keremOfis", ek: [{ f: 0.55, plan: "asliOfis" }], duygu: { ASLI: "uzgun" }, bak: { ASLI: "KEREM", KEREM: "asagi" },
        ses: "[trembling] O an Kerem'in yüzüne baktım. Hiçbir şey yoktu. Ne korku… ne şaşkınlık.",
        metin: "O an Kerem'in yüzüne baktım. Hiçbir şey yoktu. Ne korku… ne şaşkınlık." },
    ]},
    { id: "S2", mekan: "mutfak", gun: "gecmis", etiket: "3 GÜN ÖNCE", replikler: [
      { id: "R10", kim: "ASLI_IC", plan: "mutfakGenis", duygu: { ASLI: "gulumse", DURU: "aci", KEREM: "gulumse" }, poz: { DURU: "kulak", ASLI: "yan", KEREM: "yan" },
        ses: "[softly] Üç gün önce… her şey o kadar normaldi ki.",
        metin: "Üç gün önce… her şey o kadar normaldi ki." },
      { id: "R11", kim: "DURU", plan: "duruMutfak",
        ses: "[whiny] Anneee… kulağım yine çok ağrıyor.",
        metin: "Anne… kulağım yine çok ağrıyor." },
      { id: "R12", kim: "ASLI", plan: "asliMutfak", duygu: { ASLI: "sefkat" }, poz: { ASLI: "uzan" },
        ses: "[worried, tender] Gel bakayım bir tanem. Ateşin de var senin.",
        metin: "Gel bakayım bir tanem. Ateşin de var senin." },
      { id: "R13", kim: "KEREM", plan: "keremMutfak", duygu: { KEREM: "sefkat" },
        ses: "[warmly] Yarın sabah ilk iş doktora gidiyoruz, prenses.",
        metin: "Yarın sabah ilk iş doktora gidiyoruz, prenses." },
      { id: "R14", kim: "DURU", plan: "masa", duygu: { DURU: "endise" }, poz: { DURU: "yan" },
        ses: "[sulky] Ama iğne yok, değil mi baba?",
        metin: "Ama iğne yok, değil mi baba?" },
      { id: "R15", kim: "KEREM", plan: "masa", duygu: { KEREM: "gulumse", DURU: "gulumse" },
        ses: "[chuckles] İğne yok. Söz.",
        metin: "İğne yok. Söz." },
      { id: "R16", kim: "KEREM_IC", plan: "keremYakin", duygu: { KEREM: "gergin" },
        ses: "[tense whisper] Kızımın gözlerine her baktığımda aynı korku. Bir gün biri… gerçeği öğrenecek.",
        metin: "Kızımın gözlerine her baktığımda aynı korku. Bir gün biri… gerçeği öğrenecek." },
      { id: "R17", kim: "ASLI_IC", plan: "asliMutfak", ek: [{ f: 0.3, plan: "kanTupu" }],
        ses: "[sighs] Kulağına küçük bir tüp takılacaktı. Ameliyattan önce de üçümüzden kan aldılar. [bitterly] Sadece bir formalite… dediler.",
        metin: "Kulağına küçük bir tüp takılacaktı. Ameliyattan önce de üçümüzden kan aldılar. Sadece bir formalite… dediler." },
    ]},
    { id: "S3", mekan: "hatira", gun: "hatira", replikler: [
      { id: "R18", kim: "ASLI_IC", plan: "hatira", duygu: { ASLI: "gulumse" },
        ses: "[emotional] Dokuz yıl önce onu ilk kucağıma aldığımda… dünyanın en mutlu kadınıydım. [voice breaking] O benim kızımdı.",
        metin: "Dokuz yıl önce onu ilk kucağıma aldığımda… dünyanın en mutlu kadınıydım. O benim kızımdı." },
    ]},
    { id: "S4", mekan: "ofis", gun: "bugun", replikler: [
      { id: "R19", kim: "ASLI", plan: "ciftOfis", duygu: { ASLI: "aglama", KEREM: "sakin", NIHAL: "uzgun" }, poz: { ASLI: "yan", KEREM: "kollar" }, bak: { ASLI: "KEREM", KEREM: "asagi" },
        ses: "[crying, desperate] Kerem, bir şey söylesene! Bu bir hata, değil mi?",
        metin: "Kerem, bir şey söylesene! Bu bir hata, değil mi?" },
      { id: "R20", kim: "KEREM", plan: "keremOfis", bak: { KEREM: "ASLI" },
        ses: "[cold] Sakin ol, Aslı. Böyle şeyler olur.",
        metin: "Sakin ol, Aslı. Böyle şeyler olur." },
      { id: "R20b", kim: "NIHAL", plan: "nihalYakin", duygu: { NIHAL: "ciddi" },
        ses: "[carefully] Doğumun yapıldığı hastaneyle görüşmenizi öneririm. [lowers voice] Bazen… bebekler karışabiliyor.",
        metin: "Doğumun yapıldığı hastaneyle görüşmenizi öneririm. Bazen… bebekler karışabiliyor." },
      { id: "R21", kim: "ASLI_IC", plan: "asliYakin", duygu: { ASLI: "aglama" }, poz: { ASLI: "agiz" },
        ses: "[trembling] Kerem ne bir soru sordu… ne de dönüp kızına baktı.",
        metin: "Kerem ne bir soru sordu… ne de dönüp kızına baktı." },
    ]},
    { id: "S5", mekan: "salon", gun: "gece", replikler: [
      { id: "R22", kim: "ASLI_IC", plan: "salonGenis", duygu: { KEREM: "gergin", ASLI: "uzgun" }, poz: { KEREM: "telefon", ASLI: "yan" },
        ses: "[quietly] O gece Kerem salonda oturdu. Gözünü telefondan ayırmadı.",
        metin: "O gece Kerem salonda oturdu. Gözünü telefondan ayırmadı." },
      { id: "R23", kim: "KEREM_IC", plan: "keremSofa", ekBosluk: 1.0, efekt: [{ t: -1.45, ad: "telefon" }], bak: { KEREM: "telefon" },
        ses: "[nervous whisper] Bilinmeyen numara… Lütfen o olmasın.",
        metin: "Bilinmeyen numara… Lütfen o olmasın." },
      { id: "R24", kim: "ASLI_IC", plan: "telefon", duygu: { ASLI: "sok" },
        ses: "[frightened whisper] Ekrandaki mesajı ben de gördüm. İki kelime… Doktor biliyor.",
        metin: "Ekrandaki mesajı ben de gördüm. İki kelime… “Doktor biliyor.”" },
      { id: "R24b", kim: "ASLI", plan: "asliKapi", duygu: { ASLI: "supheli" },
        ses: "[quietly] Kimdi o?",
        metin: "Kimdi o?" },
      { id: "R24c", kim: "KEREM", plan: "keremSofa", duygu: { KEREM: "sakin" }, bak: { KEREM: "ASLI" },
        ses: "[flat] İş yerinden. [pause] Önemli değil, sen yat.",
        metin: "İş yerinden. Önemli değil, sen yat." },
      { id: "R25", kim: "KEREM_IC", plan: "telefonSil", duygu: { KEREM: "gergin" },
        ses: "[tense] Hemen silmeliyim. Aslı… asla öğrenmemeli.",
        metin: "Hemen silmeliyim. Aslı… asla öğrenmemeli." },
      { id: "R26", kim: "DURU", plan: "duruKapi", duygu: { DURU: "uykulu" },
        ses: "[sleepy] Anne? Babam neden uyumuyor?",
        metin: "Anne? Babam neden uyumuyor?" },
      { id: "R27", kim: "ASLI", plan: "asliDuru", duygu: { ASLI: "zorGulumse", DURU: "uykulu" }, poz: { ASLI: "basOksa" },
        ses: "[softly] Uyu bebeğim. Annen burada.",
        metin: "Uyu bebeğim. Annen burada." },
      { id: "R28", kim: "ASLI_IC", plan: "asliYakinGece", duygu: { ASLI: "aglama" }, poz: { ASLI: "yan" },
        ses: "[crying softly] O gece anladım. Kocam bu gerçeği… benden çok önce biliyordu.",
        metin: "O gece anladım. Kocam bu gerçeği… benden çok önce biliyordu." },
      { id: "R29", kim: "ASLI_IC", plan: "cizim", efekt: [{ t: 0.2, ad: "kalem" }],
        ses: "[determined whisper] Ve o mesajı kim attıysa… onu bulacaktım.",
        metin: "Ve o mesajı kim attıysa… onu bulacaktım." },
    ]},
  ],

  // Sürekli yumuşak fon müziği (referanstaki gibi konuşmanın altında, sessiz anlarda duyulur)
  muzik: { seviye: 0.30, sure: 155, istem: "Gentle melancholic solo piano with very soft strings, emotional Turkish family drama underscore, slow steady tempo, calm and intimate, consistent mood, instrumental, no vocals, no drums" },
  efektler: {
    telefon: { seviye: 0.42, sure: 2,   istem: "Smartphone vibrating twice on a wooden coffee table, short buzzing vibration" },
    kalem:   { seviye: 0.45, sure: 4,   istem: "Child drawing with a colored pencil on paper, soft pencil scribbling sound, close up" },
  },

  yazilar: {
    kagitHasta: "DURU YILMAZ (8)",
    telefonGonderen: "Bilinmeyen Numara",
    telefonMesaj: "Doktor biliyor.",
    son: "Devamı 2. bölümde…",
  },
};
if (typeof module !== "undefined") module.exports = BOLUM;
