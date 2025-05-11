interface RecommendationParams {
  minatSains: string
  minatTeknologi: string
  minatSosial: string
  minatKesehatan: string
  minatSeni: string
  minatBahasa: string
  minatKeuangan: string
  minatDebat: string
  nilaiMatematika: number
  nilaiFisika: number
  nilaiBiologi: number
  nilaiKimia: number
  nilaiBahasa: number
  nilaiSejarah: number
  nilaiSosiologi: number
  nilaiEkonomi: number
  nilaiSeni: number
  kemampuanAnalitis: string
  kemampuanKomunikasi: string
  kemampuanKreativitas: string
  kemampuanKetelitian: string
  kemampuanSpasial: string
  keterampilanTeknis: string
  preferensiPekerjaan: string
}

export function getRecommendation(params: RecommendationParams): string {
  // Initialize variables for all rules
  let rekomendasi = "Belum ada rekomendasi yang cocok"

  // Variables for Teknik (Engineering)
  let cocokBidangSains = "tidak"
  let cocokBidangTeknologi = "tidak"
  let cocokBidangTeknisAwal = "tidak"
  let cocokBidangTeknis = "tidak"

  // Variables for Hukum (Law)
  let cocokBidangSosial = "tidak"
  let cocokBidangHukumAwal = "tidak"
  let cocokBidangHukumPerantara = "tidak"
  let cocokBidangHukum = "tidak"

  // Variables for Kedokteran (Medicine)
  let cocokBidangKesehatan = "tidak"
  let cocokBidangKlinisAwal = "tidak"
  let cocokBidangKlinisPerantara = "tidak"
  let cocokBidangKlinis = "tidak"

  // Variables for Arsitektur (Architecture)
  let cocokBidangSeni = "tidak"
  let cocokBidangDesainAwal = "tidak"
  let cocokBidangDesainPerantara = "tidak"
  let cocokBidangDesain = "tidak"

  // Variables for Sastra (Literature)
  let cocokBidangBahasa = "tidak"
  let cocokBidangKreatifAwal = "tidak"
  let cocokBidangKreatifPerantara = "tidak"
  let cocokBidangKreatif = "tidak"

  // Variables for Akuntansi (Accounting)
  let cocokBidangKeuangan = "tidak"
  let cocokBidangAnalitisAwal = "tidak"
  let cocokBidangAnalitisPerantara = "tidak"
  let cocokBidangAnalitis = "tidak"

  // ===== RULES FOR TEKNIK (ENGINEERING) =====

  // Rule 1: IF minat_sains = tinggi AND nilai_matematika >= 80 THEN cocok_bidang_sains = ya
  if (params.minatSains === "tinggi" && params.nilaiMatematika >= 80) {
    cocokBidangSains = "ya"
  }

  // Rule 2: IF minat_teknologi = tinggi AND keterampilan_teknis = baik THEN cocok_bidang_teknologi = ya
  if (params.minatTeknologi === "tinggi" && params.keterampilanTeknis === "baik") {
    cocokBidangTeknologi = "ya"
  }

  // Rule 3: IF nilai_fisika >= 75 AND kemampuan_analitis = baik AND cocok_bidang_teknologi = ya THEN cocok_bidang_teknis_awal = ya
  if (params.nilaiFisika >= 75 && params.kemampuanAnalitis === "baik" && cocokBidangTeknologi === "ya") {
    cocokBidangTeknisAwal = "ya"
  }

  // Rule 4: IF cocok_bidang_sains = ya AND cocok_bidang_teknis_awal = ya AND nilai_fisika >= 80 THEN cocok_bidang_teknis = ya
  if (cocokBidangSains === "ya" && cocokBidangTeknisAwal === "ya" && params.nilaiFisika >= 80) {
    cocokBidangTeknis = "ya"
  }

  // Rule 5: IF cocok_bidang_sains = ya AND cocok_bidang_teknis = ya AND preferensi_pekerjaan IN (Teknis) THEN rekomendasi = Teknik
  if (cocokBidangSains === "ya" && cocokBidangTeknis === "ya" && params.preferensiPekerjaan === "Teknis") {
    rekomendasi = "Teknik"
  }

  // ===== RULES FOR HUKUM (LAW) =====

  // Rule 6: IF minat_sosial = tinggi AND nilai_sejarah >= 75 THEN cocok_bidang_sosial = ya
  if (params.minatSosial === "tinggi" && params.nilaiSejarah >= 75) {
    cocokBidangSosial = "ya"
  }

  // Rule 7: IF minat_debat = tinggi AND kemampuan_komunikasi = baik THEN cocok_bidang_hukum_awal = ya
  if (params.minatDebat === "tinggi" && params.kemampuanKomunikasi === "baik") {
    cocokBidangHukumAwal = "ya"
  }

  // Rule 8: IF cocok_bidang_sosial = ya AND cocok_bidang_hukum_awal = ya AND nilai_sosiologi >= 75 THEN cocok_bidang_hukum_perantara = ya
  if (cocokBidangSosial === "ya" && cocokBidangHukumAwal === "ya" && params.nilaiSosiologi >= 75) {
    cocokBidangHukumPerantara = "ya"
  }

  // Rule 9: IF cocok_bidang_sosial = ya AND cocok_bidang_hukum_perantara = ya AND nilai_bahasa >= 80 THEN cocok_bidang_hukum = ya
  if (cocokBidangSosial === "ya" && cocokBidangHukumPerantara === "ya" && params.nilaiBahasa >= 80) {
    cocokBidangHukum = "ya"
  }

  // Rule 10: IF cocok_bidang_sosial = ya AND cocok_bidang_hukum = ya AND kemampuan_komunikasi = baik THEN rekomendasi = Hukum
  if (cocokBidangSosial === "ya" && cocokBidangHukum === "ya" && params.kemampuanKomunikasi === "baik") {
    rekomendasi = "Hukum"
  }

  // ===== RULES FOR KEDOKTERAN (MEDICINE) =====

  // Rule 11: IF minat_kesehatan = tinggi AND nilai_biologi >= 80 THEN cocok_bidang_kesehatan = ya
  if (params.minatKesehatan === "tinggi" && params.nilaiBiologi >= 80) {
    cocokBidangKesehatan = "ya"
  }

  // Rule 12: IF nilai_kimia >= 75 AND kemampuan_ketelitian = baik THEN cocok_bidang_klinis_awal = ya
  if (params.nilaiKimia >= 75 && params.kemampuanKetelitian === "baik") {
    cocokBidangKlinisAwal = "ya"
  }

  // Rule 13: IF cocok_bidang_kesehatan = ya AND cocok_bidang_klinis_awal = ya AND nilai_biologi >= 75 THEN cocok_bidang_klinis_perantara = ya
  if (cocokBidangKesehatan === "ya" && cocokBidangKlinisAwal === "ya" && params.nilaiBiologi >= 75) {
    cocokBidangKlinisPerantara = "ya"
  }

  // Rule 14: IF cocok_bidang_kesehatan = ya AND cocok_bidang_klinis_perantara = ya AND nilai_kimia >= 75 THEN cocok_bidang_klinis = ya
  if (cocokBidangKesehatan === "ya" && cocokBidangKlinisPerantara === "ya" && params.nilaiKimia >= 75) {
    cocokBidangKlinis = "ya"
  }

  // Rule 15: IF cocok_bidang_kesehatan = ya AND cocok_bidang_klinis = ya AND preferensi_pekerjaan IN (Pelayanan Masyarakat) THEN rekomendasi = Kedokteran
  if (
    cocokBidangKesehatan === "ya" &&
    cocokBidangKlinis === "ya" &&
    params.preferensiPekerjaan === "Pelayanan Masyarakat"
  ) {
    rekomendasi = "Kedokteran"
  }

  // ===== RULES FOR ARSITEKTUR (ARCHITECTURE) =====

  // Rule 16: IF minat_seni = tinggi AND kemampuan_kreativitas = baik THEN cocok_bidang_seni = ya
  if (params.minatSeni === "tinggi" && params.kemampuanKreativitas === "baik") {
    cocokBidangSeni = "ya"
  }

  // Rule 17: IF nilai_seni >= 75 AND kemampuan_spasial = baik THEN cocok_bidang_desain_awal = ya
  if (params.nilaiSeni >= 75 && params.kemampuanSpasial === "baik") {
    cocokBidangDesainAwal = "ya"
  }

  // Rule 18: IF cocok_bidang_seni = ya AND cocok_bidang_desain_awal = ya AND nilai_matematika >= 70 THEN cocok_bidang_desain_perantara = ya
  if (cocokBidangSeni === "ya" && cocokBidangDesainAwal === "ya" && params.nilaiMatematika >= 70) {
    cocokBidangDesainPerantara = "ya"
  }

  // Rule 19: IF cocok_bidang_seni = ya AND cocok_bidang_desain_perantara = ya AND kemampuan_spasial = baik THEN cocok_bidang_desain = ya
  if (cocokBidangSeni === "ya" && cocokBidangDesainPerantara === "ya" && params.kemampuanSpasial === "baik") {
    cocokBidangDesain = "ya"
  }

  // Rule 20: IF cocok_bidang_seni = ya AND cocok_bidang_desain = ya AND preferensi_pekerjaan IN (Kreatif) THEN rekomendasi = Arsitektur
  if (cocokBidangSeni === "ya" && cocokBidangDesain === "ya" && params.preferensiPekerjaan === "Kreatif") {
    rekomendasi = "Arsitektur"
  }

  // ===== RULES FOR SASTRA (LITERATURE) =====

  // Rule 21: IF minat_bahasa = tinggi AND nilai_bahasa >= 80 THEN cocok_bidang_bahasa = ya
  if (params.minatBahasa === "tinggi" && params.nilaiBahasa >= 80) {
    cocokBidangBahasa = "ya"
  }

  // Rule 22: IF minat_seni = tinggi AND kemampuan_komunikasi = baik THEN cocok_bidang_kreatif_awal = ya
  if (params.minatSeni === "tinggi" && params.kemampuanKomunikasi === "baik") {
    cocokBidangKreatifAwal = "ya"
  }

  // Rule 23: IF cocok_bidang_bahasa = ya AND cocok_bidang_kreatif_awal = ya AND nilai_sejarah >= 75 THEN cocok_bidang_kreatif_perantara = ya
  if (cocokBidangBahasa === "ya" && cocokBidangKreatifAwal === "ya" && params.nilaiSejarah >= 75) {
    cocokBidangKreatifPerantara = "ya"
  }

  // Rule 24: IF cocok_bidang_bahasa = ya AND cocok_bidang_kreatif_perantara = ya AND kemampuan_komunikasi = baik THEN cocok_bidang_kreatif = ya
  if (cocokBidangBahasa === "ya" && cocokBidangKreatifPerantara === "ya" && params.kemampuanKomunikasi === "baik") {
    cocokBidangKreatif = "ya"
  }

  // Rule 25: IF cocok_bidang_bahasa = ya AND cocok_bidang_kreatif = ya AND preferensi_pekerjaan IN (Kreatif) THEN rekomendasi = Sastra
  if (cocokBidangBahasa === "ya" && cocokBidangKreatif === "ya" && params.preferensiPekerjaan === "Kreatif") {
    rekomendasi = "Sastra"
  }

  // ===== RULES FOR AKUNTANSI (ACCOUNTING) =====

  // Rule 26: IF minat_keuangan = tinggi AND nilai_ekonomi >= 80 THEN cocok_bidang_keuangan = ya
  if (params.minatKeuangan === "tinggi" && params.nilaiEkonomi >= 80) {
    cocokBidangKeuangan = "ya"
  }

  // Rule 27: IF nilai_matematika >= 75 AND kemampuan_ketelitian = baik THEN cocok_bidang_analitis_awal = ya
  if (params.nilaiMatematika >= 75 && params.kemampuanKetelitian === "baik") {
    cocokBidangAnalitisAwal = "ya"
  }

  // Rule 28: IF cocok_bidang_keuangan = ya AND cocok_bidang_analitis_awal = ya AND nilai_ekonomi >= 75 THEN cocok_bidang_analitis_perantara = ya
  if (cocokBidangKeuangan === "ya" && cocokBidangAnalitisAwal === "ya" && params.nilaiEkonomi >= 75) {
    cocokBidangAnalitisPerantara = "ya"
  }

  // Rule 29: IF cocok_bidang_keuangan = ya AND cocok_bidang_analitis_perantara = ya AND kemampuan_ketelitian = baik THEN cocok_bidang_analitis = ya
  if (cocokBidangKeuangan === "ya" && cocokBidangAnalitisPerantara === "ya" && params.kemampuanKetelitian === "baik") {
    cocokBidangAnalitis = "ya"
  }

  // Rule 30: IF cocok_bidang_keuangan = ya AND cocok_bidang_analitis = ya AND preferensi_pekerjaan IN (Administratif) THEN rekomendasi = Akuntansi
  if (cocokBidangKeuangan === "ya" && cocokBidangAnalitis === "ya" && params.preferensiPekerjaan === "Administratif") {
    rekomendasi = "Akuntansi"
  }

  return rekomendasi
}
