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

export interface RecommendationResult {
  jurusan: string;
  kesesuaian: number;
  alasan: string[];
}

export function getAllRecommendations(params: RecommendationParams): RecommendationResult[] {
  // Array to store all recommendations
  const recommendations: RecommendationResult[] = [];

  // Inisialisasi variabel untuk semua aturan
  let cocokBidangSains = "tidak";
  let cocokBidangTeknologi = "tidak";
  let cocokBidangTeknisAwal = "tidak";
  let cocokBidangTeknisPerantara = "tidak";
  let cocokBidangTeknis = "tidak";
  let alasanTeknik: string[] = [];

  // Variabel untuk Hukum (Law)
  let cocokBidangSosial = "tidak";
  let cocokBidangHukumAwal = "tidak";
  let cocokBidangHukumPerantara = "tidak";
  let cocokBidangHukum = "tidak";
  let alasanHukum: string[] = [];

  // Variabel untuk Kedokteran (Medicine)
  let cocokBidangKesehatan = "tidak";
  let cocokBidangKlinisAwal = "tidak";
  let cocokBidangKlinisPerantara = "tidak";
  let cocokBidangKlinis = "tidak";
  let alasanKedokteran: string[] = [];

  // Variabel untuk Arsitektur (Architecture)
  let cocokBidangDesain = "tidak";
  let cocokBidangDesainAwal = "tidak";
  let cocokBidangDesainPerantara = "tidak";
  let alasanArsitektur: string[] = [];

  // Variabel untuk Sastra (Literature)
  let cocokBidangBahasa = "tidak";
  let cocokBidangKreatifAwal = "tidak";
  let cocokBidangKreatifPerantara = "tidak";
  let cocokBidangKreatif = "tidak";
  let alasanSastra: string[] = [];

  // Variabel untuk Akuntansi (Accounting)
  let cocokBidangKeuangan = "tidak";
  let cocokBidangAnalitisAwal = "tidak";
  let cocokBidangAnalitisPerantara = "tidak";
  let cocokBidangAnalitis = "tidak";
  let alasanAkuntansi: string[] = [];

  // ===== RULES FOR TEKNIK (ENGINEERING) =====

  // Rule 1: IF minat_sains = tinggi OR minat_teknologi = tinggi THEN cocok_bidang_sains = ya
  if (params.minatSains === "tinggi" || params.minatTeknologi === "tinggi") {
    cocokBidangSains = "ya";
    if (params.minatSains === "tinggi") alasanTeknik.push("Minat tinggi di bidang sains");
    if (params.minatTeknologi === "tinggi") alasanTeknik.push("Minat tinggi di bidang teknologi");
  }

  // Rule 2: IF nilai_matematika >= 70 OR nilai_fisika >= 70 THEN cocok_bidang_teknologi = ya
  if (params.nilaiMatematika >= 70 || params.nilaiFisika >= 70) {
    cocokBidangTeknologi = "ya";
    if (params.nilaiMatematika >= 70) alasanTeknik.push(`Nilai matematika baik (${params.nilaiMatematika})`);
    if (params.nilaiFisika >= 70) alasanTeknik.push(`Nilai fisika baik (${params.nilaiFisika})`);
  }

  // Rule 3: IF keterampilan_teknis = baik OR kemampuan_analitis = baik THEN cocok_bidang_teknis_awal = ya
  if (params.keterampilanTeknis === "baik" || params.kemampuanAnalitis === "baik") {
    cocokBidangTeknisAwal = "ya";
    if (params.keterampilanTeknis === "baik") alasanTeknik.push("Keterampilan teknis baik");
    if (params.kemampuanAnalitis === "baik") alasanTeknik.push("Kemampuan analitis baik");
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
    alasanTeknik.push(`Preferensi pekerjaan sesuai (${params.preferensiPekerjaan})`);
  }

  // Rule 6: IF cocok_bidang_teknis = ya THEN rekomendasi = Teknik
  if (cocokBidangTeknis === "ya") {
    recommendations.push({
      jurusan: "Teknik",
      kesesuaian: calculateMatchPercentage(alasanTeknik.length, 6),
      alasan: alasanTeknik
    });
  } else if (cocokBidangSains === "ya" && cocokBidangTeknologi === "ya") {
    // Partial match
    recommendations.push({
      jurusan: "Teknik",
      kesesuaian: calculateMatchPercentage(alasanTeknik.length, 6),
      alasan: alasanTeknik
    });
  }

  // ===== RULES FOR HUKUM (LAW) =====

  // Rule 7: IF minat_sosial = tinggi OR minat_debat = tinggi THEN cocok_bidang_sosial = ya
  if (params.minatSosial === "tinggi" || params.minatDebat === "tinggi") {
    cocokBidangSosial = "ya";
    if (params.minatSosial === "tinggi") alasanHukum.push("Minat tinggi di bidang sosial");
    if (params.minatDebat === "tinggi") alasanHukum.push("Minat tinggi di bidang debat");
  }

  // Rule 8: IF nilai_sejarah >= 70 OR nilai_sosiologi >= 70 THEN cocok_bidang_hukum_awal = ya
  if (params.nilaiSejarah >= 70 || params.nilaiSosiologi >= 70) {
    cocokBidangHukumAwal = "ya";
    if (params.nilaiSejarah >= 70) alasanHukum.push(`Nilai sejarah baik (${params.nilaiSejarah})`);
    if (params.nilaiSosiologi >= 70) alasanHukum.push(`Nilai sosiologi baik (${params.nilaiSosiologi})`);
  }

  // Rule 9: IF cocok_bidang_sosial = ya AND cocok_bidang_hukum_awal = ya AND kemampuan_komunikasi = baik THEN cocok_bidang_hukum_perantara = ya
  if (cocokBidangSosial === "ya" && cocokBidangHukumAwal === "ya" && params.kemampuanKomunikasi === "baik") {
    cocokBidangHukumPerantara = "ya";
    alasanHukum.push("Kemampuan komunikasi baik");
  }

  // Rule 10: IF cocok_bidang_hukum_perantara = ya AND (nilai_bahasa >= 75 OR nilai_sejarah >= 75) THEN cocok_bidang_hukum = ya
  if (cocokBidangHukumPerantara === "ya" && (params.nilaiBahasa >= 75 || params.nilaiSejarah >= 75)) {
    cocokBidangHukum = "ya";
    if (params.nilaiBahasa >= 75) alasanHukum.push(`Nilai bahasa sangat baik (${params.nilaiBahasa})`);
    if (params.nilaiSejarah >= 75) alasanHukum.push(`Nilai sejarah sangat baik (${params.nilaiSejarah})`);
  }

  // Rule 11: IF cocok_bidang_hukum = ya THEN rekomendasi = Hukum
  if (cocokBidangHukum === "ya") {
    recommendations.push({
      jurusan: "Hukum",
      kesesuaian: calculateMatchPercentage(alasanHukum.length, 6),
      alasan: alasanHukum
    });
  } else if (cocokBidangSosial === "ya" && cocokBidangHukumAwal === "ya") {
    // Partial match
    recommendations.push({
      jurusan: "Hukum",
      kesesuaian: calculateMatchPercentage(alasanHukum.length, 6),
      alasan: alasanHukum
    });
  }

  // ===== RULES FOR KEDOKTERAN (MEDICINE) =====

  // Rule 12: IF minat_kesehatan = tinggi OR nilai_biologi >= 75 THEN cocok_bidang_kesehatan = ya
  if (params.minatKesehatan === "tinggi" || params.nilaiBiologi >= 75) {
    cocokBidangKesehatan = "ya";
    if (params.minatKesehatan === "tinggi") alasanKedokteran.push("Minat tinggi di bidang kesehatan");
    if (params.nilaiBiologi >= 75) alasanKedokteran.push(`Nilai biologi sangat baik (${params.nilaiBiologi})`);
  }

  // Rule 13: IF nilai_kimia >= 70 OR kemampuan_ketelitian = baik THEN cocok_bidang_klinis_awal = ya
  if (params.nilaiKimia >= 70 || params.kemampuanKetelitian === "baik") {
    cocokBidangKlinisAwal = "ya";
    if (params.nilaiKimia >= 70) alasanKedokteran.push(`Nilai kimia baik (${params.nilaiKimia})`);
    if (params.kemampuanKetelitian === "baik") alasanKedokteran.push("Kemampuan ketelitian baik");
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
    alasanKedokteran.push(`Preferensi pekerjaan sesuai (${params.preferensiPekerjaan})`);
    recommendations.push({
      jurusan: "Kedokteran",
      kesesuaian: calculateMatchPercentage(alasanKedokteran.length, 5),
      alasan: alasanKedokteran
    });
  } else if (cocokBidangKesehatan === "ya" && cocokBidangKlinisAwal === "ya") {
    // Partial match
    recommendations.push({
      jurusan: "Kedokteran",
      kesesuaian: calculateMatchPercentage(alasanKedokteran.length, 5),
      alasan: alasanKedokteran
    });
  }

  // ===== RULES FOR ARSITEKTUR (ARCHITECTURE) =====

  // Rule 17: IF minat_seni = tinggi OR kemampuan_kreativitas = baik THEN cocok_bidang_desain_awal = ya
  if (params.minatSeni === "tinggi" || params.kemampuanKreativitas === "baik") {
    cocokBidangDesainAwal = "ya";
    if (params.minatSeni === "tinggi") alasanArsitektur.push("Minat tinggi di bidang seni");
    if (params.kemampuanKreativitas === "baik") alasanArsitektur.push("Kemampuan kreativitas baik");
  }

  // Rule 18: IF nilai_seni >= 70 OR kemampuan_spasial = baik THEN cocok_bidang_desain_perantara = ya
  if (params.nilaiSeni >= 70 || params.kemampuanSpasial === "baik") {
    cocokBidangDesainPerantara = "ya";
    if (params.nilaiSeni >= 70) alasanArsitektur.push(`Nilai seni baik (${params.nilaiSeni})`);
    if (params.kemampuanSpasial === "baik") alasanArsitektur.push("Kemampuan spasial baik");
  }

  // Rule 19: IF cocok_bidang_desain_awal = ya AND cocok_bidang_desain_perantara = ya AND nilai_matematika >= 65 THEN cocok_bidang_desain = ya
  if (cocokBidangDesainAwal === "ya" && cocokBidangDesainPerantara === "ya" && params.nilaiMatematika >= 65) {
    cocokBidangDesain = "ya";
    alasanArsitektur.push(`Nilai matematika cukup (${params.nilaiMatematika})`);
  }

  // Rule 20: IF cocok_bidang_desain = ya AND preferensi_pekerjaan IN (Kreatif, Desain) THEN rekomendasi = Arsitektur
  if (cocokBidangDesain === "ya" && (params.preferensiPekerjaan === "Kreatif" || params.preferensiPekerjaan === "Desain")) {
    alasanArsitektur.push(`Preferensi pekerjaan sesuai (${params.preferensiPekerjaan})`);
    recommendations.push({
      jurusan: "Arsitektur",
      kesesuaian: calculateMatchPercentage(alasanArsitektur.length, 5),
      alasan: alasanArsitektur
    });
  } else if (cocokBidangDesainAwal === "ya" && cocokBidangDesainPerantara === "ya") {
    // Partial match
    recommendations.push({
      jurusan: "Arsitektur",
      kesesuaian: calculateMatchPercentage(alasanArsitektur.length, 5),
      alasan: alasanArsitektur
    });
  }

  // ===== RULES FOR SASTRA (LITERATURE) =====

  // Rule 21: IF minat_bahasa = tinggi OR nilai_bahasa >= 75 THEN cocok_bidang_bahasa = ya
  if (params.minatBahasa === "tinggi" || params.nilaiBahasa >= 75) {
    cocokBidangBahasa = "ya";
    if (params.minatBahasa === "tinggi") alasanSastra.push("Minat tinggi di bidang bahasa");
    if (params.nilaiBahasa >= 75) alasanSastra.push(`Nilai bahasa sangat baik (${params.nilaiBahasa})`);
  }

  // Rule 22: IF minat_seni = tinggi OR kemampuan_komunikasi = baik THEN cocok_bidang_kreatif_awal = ya
  if (params.minatSeni === "tinggi" || params.kemampuanKomunikasi === "baik") {
    cocokBidangKreatifAwal = "ya";
    if (params.minatSeni === "tinggi" && !alasanSastra.includes("Minat tinggi di bidang seni")) 
      alasanSastra.push("Minat tinggi di bidang seni");
    if (params.kemampuanKomunikasi === "baik") alasanSastra.push("Kemampuan komunikasi baik");
  }

  // Rule 23: IF cocok_bidang_bahasa = ya AND cocok_bidang_kreatif_awal = ya THEN cocok_bidang_kreatif_perantara = ya
  if (cocokBidangBahasa === "ya" && cocokBidangKreatifAwal === "ya") {
    cocokBidangKreatifPerantara = "ya";
  }

  // Rule 24: IF cocok_bidang_kreatif_perantara = ya AND (nilai_sejarah >= 70 OR nilai_bahasa >= 70) THEN cocok_bidang_kreatif = ya
  if (cocokBidangKreatifPerantara === "ya" && (params.nilaiSejarah >= 70 || params.nilaiBahasa >= 70)) {
    cocokBidangKreatif = "ya";
    if (params.nilaiSejarah >= 70 && !alasanSastra.includes(`Nilai sejarah baik (${params.nilaiSejarah})`)) 
      alasanSastra.push(`Nilai sejarah baik (${params.nilaiSejarah})`);
  }

  // Rule 25: IF cocok_bidang_kreatif = ya AND preferensi_pekerjaan IN (Kreatif, Pendidikan) THEN rekomendasi = Sastra
  if (
    cocokBidangKreatif === "ya" &&
    (params.preferensiPekerjaan === "Kreatif" || params.preferensiPekerjaan === "Pendidikan")
  ) {
    alasanSastra.push(`Preferensi pekerjaan sesuai (${params.preferensiPekerjaan})`);
    recommendations.push({
      jurusan: "Sastra",
      kesesuaian: calculateMatchPercentage(alasanSastra.length, 5),
      alasan: alasanSastra
    });
  } else if (cocokBidangBahasa === "ya" && cocokBidangKreatifAwal === "ya") {
    // Partial match
    recommendations.push({
      jurusan: "Sastra",
      kesesuaian: calculateMatchPercentage(alasanSastra.length, 5),
      alasan: alasanSastra
    });
  }

  // ===== RULES FOR AKUNTANSI (ACCOUNTING) =====

  // Rule 26: IF minat_keuangan = tinggi OR nilai_ekonomi >= 75 THEN cocok_bidang_keuangan = ya
  if (params.minatKeuangan === "tinggi" || params.nilaiEkonomi >= 75) {
    cocokBidangKeuangan = "ya";
    if (params.minatKeuangan === "tinggi") alasanAkuntansi.push("Minat tinggi di bidang keuangan");
    if (params.nilaiEkonomi >= 75) alasanAkuntansi.push(`Nilai ekonomi sangat baik (${params.nilaiEkonomi})`);
  }

  // Rule 27: IF nilai_matematika >= 70 OR kemampuan_ketelitian = baik THEN cocok_bidang_analitis_awal = ya
  if (params.nilaiMatematika >= 70 || params.kemampuanKetelitian === "baik") {
    cocokBidangAnalitisAwal = "ya";
    if (params.nilaiMatematika >= 70 && !alasanAkuntansi.includes(`Nilai matematika baik (${params.nilaiMatematika})`)) 
      alasanAkuntansi.push(`Nilai matematika baik (${params.nilaiMatematika})`);
    if (params.kemampuanKetelitian === "baik" && !alasanAkuntansi.includes("Kemampuan ketelitian baik")) 
      alasanAkuntansi.push("Kemampuan ketelitian baik");
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
    alasanAkuntansi.push(`Preferensi pekerjaan sesuai (${params.preferensiPekerjaan})`);
    recommendations.push({
      jurusan: "Akuntansi",
      kesesuaian: calculateMatchPercentage(alasanAkuntansi.length, 5),
      alasan: alasanAkuntansi
    });
  } else if (cocokBidangKeuangan === "ya" && cocokBidangAnalitisAwal === "ya") {
    // Partial match
    recommendations.push({
      jurusan: "Akuntansi",
      kesesuaian: calculateMatchPercentage(alasanAkuntansi.length, 5),
      alasan: alasanAkuntansi
    });
  }

  // If no recommendations, add fallback based on preferences
  if (recommendations.length === 0) {
    switch (params.preferensiPekerjaan) {
      case "Teknis":
      case "Teknologi":
        recommendations.push({
          jurusan: "Teknik",
          kesesuaian: 40,
          alasan: ["Berdasarkan preferensi pekerjaan"]
        });
        break;
      case "Pelayanan Masyarakat":
      case "Kesehatan":
        recommendations.push({
          jurusan: "Kedokteran",
          kesesuaian: 40,
          alasan: ["Berdasarkan preferensi pekerjaan"]
        });
        break;
      case "Kreatif":
      case "Desain":
        recommendations.push({
          jurusan: "Arsitektur",
          kesesuaian: 40,
          alasan: ["Berdasarkan preferensi pekerjaan"]
        });
        break;
      case "Pendidikan":
        recommendations.push({
          jurusan: "Sastra",
          kesesuaian: 40,
          alasan: ["Berdasarkan preferensi pekerjaan"]
        });
        break;
      case "Administratif":
      case "Keuangan":
        recommendations.push({
          jurusan: "Akuntansi",
          kesesuaian: 40,
          alasan: ["Berdasarkan preferensi pekerjaan"]
        });
        break;
      default:
        recommendations.push({
          jurusan: "Teknik",
          kesesuaian: 30,
          alasan: ["Rekomendasi default"]
        });
    }
  }

  // Sort recommendations by match percentage (highest first)
  return recommendations.sort((a, b) => b.kesesuaian - a.kesesuaian);
}

// Helper function to calculate match percentage
function calculateMatchPercentage(matchedCriteria: number, totalCriteria: number): number {
  return Math.round((matchedCriteria / totalCriteria) * 100);
}

// Legacy function for backward compatibility
export function getRecommendation(params: RecommendationParams): string {
  const recommendations = getAllRecommendations(params);
  return recommendations.length > 0 ? recommendations[0].jurusan : "Teknik";
}
