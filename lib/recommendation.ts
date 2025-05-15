interface RecommendationParams {
  minatSains: string;
  minatTeknologi: string;
  minatSosial: string;
  minatKesehatan: string;
  minatSeni: string;
  minatBahasa: string;
  minatKeuangan: string;
  minatDebat: string;
  nilaiMatematika: number;
  nilaiFisika: number;
  nilaiBiologi: number;
  nilaiKimia: number;
  nilaiBahasa: number;
  nilaiSejarah: number;
  nilaiSosiologi: number;
  nilaiEkonomi: number;
  nilaiSeni: number;
  kemampuanAnalitis: string;
  kemampuanKomunikasi: string;
  kemampuanKreativitas: string;
  kemampuanKetelitian: string;
  kemampuanSpasial: string;
  keterampilanTeknis: string;
  preferensiPekerjaan: string;
}

export function getRecommendation(params: RecommendationParams): string {
  // Inisialisasi variabel untuk semua aturan
  let rekomendasi = "Belum ada rekomendasi yang cocok";

  // Variabel untuk Teknik (Engineering)
  let cocokBidangSains = "tidak";
  let cocokBidangTeknologi = "tidak";
  let cocokBidangTeknisAwal = "tidak";
  let cocokBidangTeknisPerantara = "tidak";
  let cocokBidangTeknis = "tidak";

  // Variabel untuk Hukum (Law)
  let cocokBidangSosial = "tidak";
  let cocokBidangHukumAwal = "tidak";
  let cocokBidangHukumPerantara = "tidak";
  let cocokBidangHukum = "tidak";

  // Variabel untuk Kedokteran (Medicine)
  let cocokBidangKesehatan = "tidak";
  let cocokBidangKlinisAwal = "tidak";
  let cocokBidangKlinisPerantara = "tidak";
  let cocokBidangKlinis = "tidak";

  // Variabel untuk Arsitektur (Architecture)
  let cocokBidangDesain = "tidak";
  let cocokBidangDesainAwal = "tidak";
  let cocokBidangDesainPerantara = "tidak";

  // Variabel untuk Sastra (Literature)
  let cocokBidangBahasa = "tidak";
  let cocokBidangKreatifAwal = "tidak";
  let cocokBidangKreatifPerantara = "tidak";
  let cocokBidangKreatif = "tidak";

  // Variabel untuk Akuntansi (Accounting)
  let cocokBidangKeuangan = "tidak";
  let cocokBidangAnalitisAwal = "tidak";
  let cocokBidangAnalitisPerantara = "tidak";
  let cocokBidangAnalitis = "tidak";

  // ===== RULES FOR TEKNIK (ENGINEERING) =====

  // Rule 1: IF minat_sains = tinggi OR minat_teknologi = tinggi THEN cocok_bidang_sains = ya
  if (params.minatSains === "tinggi" || params.minatTeknologi === "tinggi") {
    cocokBidangSains = "ya";
  }

  // Rule 2: IF nilai_matematika >= 70 OR nilai_fisika >= 70 THEN cocok_bidang_teknologi = ya
  if (params.nilaiMatematika >= 70 || params.nilaiFisika >= 70) {
    cocokBidangTeknologi = "ya";
  }

  // Rule 3: IF keterampilan_teknis = baik OR kemampuan_analitis = baik THEN cocok_bidang_teknis_awal = ya
  if (params.keterampilanTeknis === "baik" || params.kemampuanAnalitis === "baik") {
    cocokBidangTeknisAwal = "ya";
  }

  // Rule 4: IF cocok_bidang_sains = ya AND cocok_bidang_teknis_awal = ya AND (nilai_matematika >= 75 OR nilai_fisika >= 75) THEN cocok_bidang_teknis_perantara = ya
  if (
    cocokBidangSains === "ya" &&
    cocokBidangTeknisAwal === "ya" &&
    (params.nilaiMatematika >= 75 || params.nilaiFisika >= 75)
  ) {
    cocokBidangTeknisPerantara = "ya";
  }

  // Rule 5: IF cocok_bidang_teknologi = ya AND cocok_bidang_teknis_perantara = ya AND preferensi_pekerjaan IN (Teknis, Teknologi) THEN cocok_bidang_teknis = ya
  if (
    cocokBidangTeknologi === "ya" &&
    cocokBidangTeknisPerantara === "ya" &&
    (params.preferensiPekerjaan === "Teknis" || params.preferensiPekerjaan === "Teknologi")
  ) {
    cocokBidangTeknis = "ya";
  }

  // Rule 6: IF cocok_bidang_teknis = ya THEN rekomendasi = Teknik
  if (cocokBidangTeknis === "ya") {
    rekomendasi = "Teknik";
  }

  // ===== RULES FOR HUKUM (LAW) =====

  // Rule 7: IF minat_sosial = tinggi OR minat_debat = tinggi THEN cocok_bidang_sosial = ya
  if (params.minatSosial === "tinggi" || params.minatDebat === "tinggi") {
    cocokBidangSosial = "ya";
  }

  // Rule 8: IF nilai_sejarah >= 70 OR nilai_sosiologi >= 70 THEN cocok_bidang_hukum_awal = ya
  if (params.nilaiSejarah >= 70 || params.nilaiSosiologi >= 70) {
    cocokBidangHukumAwal = "ya";
  }

  // Rule 9: IF cocok_bidang_sosial = ya AND cocok_bidang_hukum_awal = ya AND kemampuan_komunikasi = baik THEN cocok_bidang_hukum_perantara = ya
  if (cocokBidangSosial === "ya" && cocokBidangHukumAwal === "ya" && params.kemampuanKomunikasi === "baik") {
    cocokBidangHukumPerantara = "ya";
  }

  // Rule 10: IF cocok_bidang_hukum_perantara = ya AND (nilai_bahasa >= 75 OR nilai_sejarah >= 75) THEN cocok_bidang_hukum = ya
  if (cocokBidangHukumPerantara === "ya" && (params.nilaiBahasa >= 75 || params.nilaiSejarah >= 75)) {
    cocokBidangHukum = "ya";
  }

  // Rule 11: IF cocok_bidang_hukum = ya THEN rekomendasi = Hukum
  if (cocokBidangHukum === "ya") {
    rekomendasi = "Hukum";
  }

  // ===== RULES FOR KEDOKTERAN (MEDICINE) =====

  // Rule 12: IF minat_kesehatan = tinggi OR nilai_biologi >= 75 THEN cocok_bidang_kesehatan = ya
  if (params.minatKesehatan === "tinggi" || params.nilaiBiologi >= 75) {
    cocokBidangKesehatan = "ya";
  }

  // Rule 13: IF nilai_kimia >= 70 OR kemampuan_ketelitian = baik THEN cocok_bidang_klinis_awal = ya
  if (params.nilaiKimia >= 70 || params.kemampuanKetelitian === "baik") {
    cocokBidangKlinisAwal = "ya";
  }

  // Rule 14: IF cocok_bidang_kesehatan = ya AND cocok_bidang_klinis_awal = ya THEN cocok_bidang_klinis_perantara = ya
  if (cocokBidangKesehatan === "ya" && cocokBidangKlinisAwal === "ya") {
    cocokBidangKlinisPerantara = "ya";
  }

  // Rule 15: IF cocok_bidang_klinis_perantara = ya AND (nilai_biologi >= 70 OR nilai_kimia >= 70) THEN cocok_bidang_klinis = ya
  if (cocokBidangKlinisPerantara === "ya" && (params.nilaiBiologi >= 70 || params.nilaiKimia >= 70)) {
    cocokBidangKlinis = "ya";
  }

  // Rule 16: IF cocok_bidang_klinis = ya AND preferensi_pekerjaan IN (Pelayanan Masyarakat, Kesehatan) THEN rekomendasi = Kedokteran
  if (
    cocokBidangKlinis === "ya" &&
    (params.preferensiPekerjaan === "Pelayanan Masyarakat" || params.preferensiPekerjaan === "Kesehatan")
  ) {
    rekomendasi = "Kedokteran";
  }

  // ===== RULES FOR ARSITEKTUR (ARCHITECTURE) =====

  // Rule 17: IF minat_seni = tinggi OR kemampuan_kreativitas = baik THEN cocok_bidang_desain_awal = ya
  if (params.minatSeni === "tinggi" || params.kemampuanKreativitas === "baik") {
    cocokBidangDesainAwal = "ya";
  }

  // Rule 18: IF nilai_seni >= 70 OR kemampuan_spasial = baik THEN cocok_bidang_desain_perantara = ya
  if (params.nilaiSeni >= 70 || params.kemampuanSpasial === "baik") {
    cocokBidangDesainPerantara = "ya";
  }

  // Rule 19: IF cocok_bidang_desain_awal = ya AND cocok_bidang_desain_perantara = ya AND nilai_matematika >= 65 THEN cocok_bidang_desain = ya
  if (cocokBidangDesainAwal === "ya" && cocokBidangDesainPerantara === "ya" && params.nilaiMatematika >= 65) {
    cocokBidangDesain = "ya";
  }

  // Rule 20: IF cocok_bidang_desain = ya AND preferensi_pekerjaan IN (Kreatif, Desain) THEN rekomendasi = Arsitektur
  if (cocokBidangDesain === "ya" && (params.preferensiPekerjaan === "Kreatif" || params.preferensiPekerjaan === "Desain")) {
    rekomendasi = "Arsitektur";
  }

  // ===== RULES FOR SASTRA (LITERATURE) =====

  // Rule 21: IF minat_bahasa = tinggi OR nilai_bahasa >= 75 THEN cocok_bidang_bahasa = ya
  if (params.minatBahasa === "tinggi" || params.nilaiBahasa >= 75) {
    cocokBidangBahasa = "ya";
  }

  // Rule 22: IF minat_seni = tinggi OR kemampuan_komunikasi = baik THEN cocok_bidang_kreatif_awal = ya
  if (params.minatSeni === "tinggi" || params.kemampuanKomunikasi === "baik") {
    cocokBidangKreatifAwal = "ya";
  }

  // Rule 23: IF cocok_bidang_bahasa = ya AND cocok_bidang_kreatif_awal = ya THEN cocok_bidang_kreatif_perantara = ya
  if (cocokBidangBahasa === "ya" && cocokBidangKreatifAwal === "ya") {
    cocokBidangKreatifPerantara = "ya";
  }

  // Rule 24: IF cocok_bidang_kreatif_perantara = ya AND (nilai_sejarah >= 70 OR nilai_bahasa >= 70) THEN cocok_bidang_kreatif = ya
  if (cocokBidangKreatifPerantara === "ya" && (params.nilaiSejarah >= 70 || params.nilaiBahasa >= 70)) {
    cocokBidangKreatif = "ya";
  }

  // Rule 25: IF cocok_bidang_kreatif = ya AND preferensi_pekerjaan IN (Kreatif, Pendidikan) THEN rekomendasi = Sastra
  if (
    cocokBidangKreatif === "ya" &&
    (params.preferensiPekerjaan === "Kreatif" || params.preferensiPekerjaan === "Pendidikan")
  ) {
    rekomendasi = "Sastra";
  }

  // ===== RULES FOR AKUNTANSI (ACCOUNTING) =====

  // Rule 26: IF minat_keuangan = tinggi OR nilai_ekonomi >= 75 THEN cocok_bidang_keuangan = ya
  if (params.minatKeuangan === "tinggi" || params.nilaiEkonomi >= 75) {
    cocokBidangKeuangan = "ya";
  }

  // Rule 27: IF nilai_matematika >= 70 OR kemampuan_ketelitian = baik THEN cocok_bidang_analitis_awal = ya
  if (params.nilaiMatematika >= 70 || params.kemampuanKetelitian === "baik") {
    cocokBidangAnalitisAwal = "ya";
  }

  // Rule 28: IF cocok_bidang_keuangan = ya AND cocok_bidang_analitis_awal = ya THEN cocok_bidang_analitis_perantara = ya
  if (cocokBidangKeuangan === "ya" && cocokBidangAnalitisAwal === "ya") {
    cocokBidangAnalitisPerantara = "ya";
  }

  // Rule 29: IF cocok_bidang_analitis_perantara = ya AND (nilai_ekonomi >= 70 OR nilai_matematika >= 70) THEN cocok_bidang_analitis = ya
  if (cocokBidangAnalitisPerantara === "ya" && (params.nilaiEkonomi >= 70 || params.nilaiMatematika >= 70)) {
    cocokBidangAnalitis = "ya";
  }

  // Rule 30: IF cocok_bidang_analitis = ya AND preferensi_pekerjaan IN (Administratif, Keuangan) THEN rekomendasi = Akuntansi
  if (
    cocokBidangAnalitis === "ya" &&
    (params.preferensiPekerjaan === "Administratif" || params.preferensiPekerjaan === "Keuangan")
  ) {
    rekomendasi = "Akuntansi";
  }

  // Jika semua aturan gagal, gunakan preferensi pekerjaan sebagai fallback
  if (rekomendasi === "Belum ada rekomendasi yang cocok") {
    switch (params.preferensiPekerjaan) {
      case "Teknis":
      case "Teknologi":
        rekomendasi = "Teknik";
        break;
      case "Pelayanan Masyarakat":
      case "Kesehatan":
        rekomendasi = "Kedokteran";
        break;
      case "Kreatif":
      case "Desain":
      case "Pendidikan":
        rekomendasi = "Arsitektur"; // atau Sastra, tergantung preferensi
        break;
      case "Administratif":
      case "Keuangan":
        rekomendasi = "Akuntansi";
        break;
      default:
        rekomendasi = "Teknik"; // Default fallback
    }
  }

  return rekomendasi;
}