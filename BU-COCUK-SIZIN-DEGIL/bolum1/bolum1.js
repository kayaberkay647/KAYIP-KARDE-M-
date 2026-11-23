/* ==========================================================================
   BU ÇOCUK SİZİN DEĞİL — 1. BÖLÜM VERİSİ
   Senaryoyu, sesleri ve sahne planlarını buradan değiştir.
   - Metni değiştirdikten sonra:  node ses_uret.js   (sadece değişen replikler yeniden üretilir)
   - Zamanlama seslerin gerçek süresine göre otomatik hesaplanır.
   ========================================================================== */
const BOLUM = {
  no: 1,
  diziAdi: "BU ÇOCUK SİZİN DEĞİL",
  bolumYazisi: "Bölüm 1",
  hedefSure: 150,            // saniye. Replik araları bu süreyi tutturacak şekilde otomatik açılır.
  sonKartSure: 4,            // en sondaki "2. Bölüm yakında" kartının süresi
  model: "eleven_v4",        // ElevenLabs modeli (alternatif: eleven_multilingual_v2)

  // ElevenLabs sesleri (hesabındaki ses kimlikleri) ve sabit ayarlar.
  // Dizi boyunca AYNI ayarları kullan → karakter sesleri tutarlı kalır.
  sesler: {
    SELIN:    { ad: "AYY SEVDA",               id: "4XsbOSxQHw4NUVaEeo2o", ayar: { stability: 0.45, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true } },
    SELIN_IC: { ad: "AYY SEVDA (iç ses)",      id: "4XsbOSxQHw4NUVaEeo2o", ayar: { stability: 0.60, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true } },
    MURAT:    { ad: "AYY MERT",                id: "Q5n6GDIjpN0pLOlycRFT", ayar: { stability: 0.55, similarity_boost: 0.8, style: 0.20, use_speaker_boost: true } },
    KEMAL:    { ad: "COC MURAT",               id: "j82ax9yhzfYwq9lDvRWL", ayar: { stability: 0.55, similarity_boost: 0.8, style: 0.25, use_speaker_boost: true } },
    DEFNE:    { ad: "Gamze (Cartoon Character)", id: "Hr3W7yWIljG9YBJn39oK", ayar: { stability: 0.45, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true } },
  },

  // kim: konuşan (SELIN_IC = Selin'in iç sesi; ağız oynamaz, altyazı italik)
  // once: replikten önceki boşluk (sn) · plan: gösterilecek kamera planı
  // ek: replik ortasında plan değişimi [{ f: replik süresinin oranı, plan }]
  // oncePlan: replikten önceki boşlukta gösterilecek plan (ör. başlık kartı)
  // duygu: karakterlerin yüz ifadesi (o andan itibaren geçerli)
  //   notr · gulumse · uzgun · aglama · sok · endise · ciddi · supheli · sakin · aci · uyku · zorGulumse
  replikler: [
    // ── SOĞUK AÇILIŞ: DOKTOR ODASI ──
    { id: "R01", kim: "KEMAL", once: 0.3, plan: "doktor", ek: [{ f: 0.42, plan: "monitor" }],
      duygu: { KEMAL: "ciddi", SELIN: "endise", MURAT: "sakin" },
      metin: "Selin Hanım… kızınızın kan grubu AB. Sizin ve eşinizin kan grubu ise sıfır." },
    { id: "R02", kim: "KEMAL", once: 0.6, plan: "doktorYakin",
      metin: "Bu çocuk… sizin olamaz." },
    { id: "R03", kim: "SELIN", once: 0.5, plan: "selinYakin", duygu: { SELIN: "sok" },
      metin: "Ne? Ne diyorsunuz siz? Defne'yi ben doğurdum!" },

    // ── BAŞLIK + GERİ DÖNÜŞ: 3 GÜN ÖNCE, MUTFAK ──
    { id: "R04", kim: "SELIN_IC", once: 3.6, oncePlan: "baslik", plan: "mutfakGenis",
      duygu: { SELIN: "gulumse", DEFNE: "aci", MURAT: "gulumse" },
      metin: "Her şey üç gün önce… basit bir kulak ağrısıyla başladı." },
    { id: "R05", kim: "DEFNE", once: 0.4, plan: "defneMutfak",
      metin: "Anne… kulağım çok ağrıyor. İçinde bir şey vızıldıyor gibi." },
    { id: "R06", kim: "MURAT", once: 0.4, plan: "muratMutfak",
      metin: "Gel bakayım prensesim. Kulak iltihabıdır, yarın doktora gideriz." },
    { id: "R07", kim: "SELIN_IC", once: 0.5, plan: "kanTupu",
      metin: "Doktor, küçük bir tüp ameliyatı gerektiğini söyledi. Ameliyattan önce de hepimizden kan aldılar. Sadece bir formalite, dediler." },

    // ── ŞİMDİ: DOKTOR ODASI ──
    { id: "R08", kim: "KEMAL", once: 0.9, plan: "doktor", duygu: { SELIN: "sok", KEMAL: "ciddi", MURAT: "sakin" },
      metin: "Testi iki kez tekrarladık. Sonuç değişmedi." },
    { id: "R09", kim: "SELIN", once: 0.4, plan: "ikili", duygu: { SELIN: "aglama" },
      metin: "Bir hata vardır… Laboratuvar karıştırmıştır. Değil mi Murat? Bir şey söylesene!" },
    { id: "R10", kim: "MURAT", once: 0.5, plan: "muratYakin",
      metin: "Sakin ol Selin. Böyle şeyler olur. Yeniden test yaptırırız, olur biter." },
    { id: "R11", kim: "KEMAL", once: 0.9, plan: "doktorYakin", duygu: { KEMAL: "supheli" },
      metin: "Murat Bey… siz hiç şaşırmadınız." },
    { id: "R12", kim: "SELIN_IC", once: 0.5, plan: "muratYakin", ek: [{ f: 0.55, plan: "selinYakin" }], duygu: { SELIN: "uzgun" },
      metin: "Doktor haklıydı. Kocam ne bir soru sordu… ne de bir an olsun kızına baktı." },

    // ── HASTANE KORİDORU ──
    { id: "R13", kim: "DEFNE", once: 0.9, plan: "koridorIkili", duygu: { DEFNE: "endise", SELIN: "uzgun" },
      metin: "Anne? Sen ağladın mı?" },
    { id: "R14", kim: "SELIN", once: 0.4, plan: "selinKoridor", duygu: { SELIN: "zorGulumse" },
      metin: "Yok bir tanem… Gözüme bir şey kaçtı sadece." },
    { id: "R15", kim: "DEFNE", once: 0.4, plan: "defneKoridor", duygu: { DEFNE: "notr" },
      metin: "Ameliyat olunca kulağım iyileşecek mi?" },
    { id: "R16", kim: "SELIN", once: 0.4, plan: "koridorIkili", duygu: { DEFNE: "gulumse" },
      metin: "İyileşecek. Her şey iyileşecek." },

    // ── ARABA, GECE ──
    { id: "R17", kim: "SELIN_IC", once: 1.0, plan: "araba", duygu: { DEFNE: "uyku", SELIN: "uzgun", MURAT: "notr" },
      metin: "Eve dönerken arabada kimse konuşmadı. Defne arka koltukta uyuyakalmıştı." },
    { id: "R18", kim: "SELIN_IC", once: 0.6, plan: "araba", ek: [{ f: 0.35, plan: "telefon" }],
      metin: "Sonra Murat'ın telefonu titredi. Ekrana hızlıca baktı… ve mesajı silmeye çalıştı." },
    { id: "R19", kim: "SELIN_IC", once: 0.5, plan: "ayna", ek: [{ f: 0.62, plan: "selinAraba" }], duygu: { SELIN: "sok" },
      metin: "Ama ben dikiz aynasından okumuştum. İki kelime: Doktor biliyor." },
    { id: "R20", kim: "SELIN_IC", once: 0.6, plan: "muratAraba", ek: [{ f: 0.5, plan: "selinAraba" }], duygu: { SELIN: "aglama" },
      metin: "O gece anladım… Kocam bu gerçeği benden çok önce biliyordu." },

    // ── KAPANIŞ: SELİN İZLEYİCİYE KONUŞUR ──
    { id: "R21", kim: "SELIN", once: 1.2, plan: "kapanis", duygu: { SELIN: "ciddi" },
      metin: "Peki o mesajı kim attı? Murat benden ne saklıyor? Sence Defne'nin gerçek annesi kim? Tahminini yorumlara yaz." },
    { id: "R22", kim: "SELIN", once: 0.4, plan: "kapanis",
      metin: "Hikâyenin devamını kaçırmamak için takip et… Çünkü ikinci bölümde, gizlice bir DNA testi yaptırıyorum." },
  ],

  // Ekrandaki yazılar
  yazilar: {
    geriDonus: "3 GÜN ÖNCE",
    monitorHasta: "Defne Yıldız (9)",
    telefonGonderen: "Bilinmeyen Numara",
    telefonMesaj: "Doktor biliyor.",
    sonKartUst: "2. BÖLÜM YAKINDA",
    sonKartAlt: "Takip et  •  Tahminini yorumlara yaz",
  },
};
if (typeof module !== "undefined") module.exports = BOLUM;
