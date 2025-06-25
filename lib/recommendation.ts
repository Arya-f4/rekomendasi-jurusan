// lib/recommendation.ts

/**
 * Representasi Fakta dalam sistem pakar.
 * Contoh: { 'nilai_matematika': 85 } atau { 'cocok_bidang_sains': 'ya' }
 */
interface Fact {
  [key: string]: number | string;
}

/**
 * Struktur Aturan Forward Chaining.
 */
interface Rule {
  id: string;
  antecedent: (facts: Fact) => boolean;
  consequent: Fact;
  description: string; // Deskripsi untuk menjelaskan aturan
}

// Kumpulan Aturan (Rule Base) dengan deskripsi
const rules: Rule[] = [
    {
        id: 'R1',
        antecedent: (facts) => (facts['nilai_matematika'] as number) >= 80 && (facts['nilai_fisika'] as number) >= 80,
        consequent: { cocok_bidang_sains: 'ya' },
        description: "Nilai Matematika dan Fisika tinggi menunjukkan kecocokan dengan bidang sains.",
    },
    {
        id: 'R2',
        antecedent: (facts) => (facts['nilai_matematika'] as number) >= 75 && (facts['nilai_fisika'] as number) >= 75,
        consequent: { cocok_bidang_teknis: 'ya' },
        description: "Nilai Matematika dan Fisika yang baik menunjukkan potensi di bidang teknis.",
    },
    {
        id: 'R3',
        antecedent: (facts) => facts['cocok_bidang_sains'] === 'ya' && facts['cocok_bidang_teknis'] === 'ya' && facts['preferensi_pekerjaan_teknis'] === 'ya',
        consequent: { rekomendasi: 'Teknik' },
        description: "Kecocokan di bidang sains, teknis, dan minat pada pekerjaan teknis merekomendasikan jurusan Teknik.",
    },
    {
        id: 'R4',
        antecedent: (facts) => (facts['nilai_sejarah'] as number) >= 75 && (facts['nilai_sosiologi'] as number) >= 75,
        consequent: { cocok_bidang_sosial: 'ya' },
        description: "Nilai Sejarah dan Sosiologi yang baik menunjukkan kecocokan dengan bidang sosial.",
    },
    {
        id: 'R5',
        antecedent: (facts) => (facts['nilai_bahasa'] as number) >= 80 && (facts['nilai_sosiologi'] as number) >= 75,
        consequent: { cocok_bidang_hukum: 'ya' },
        description: "Kemampuan bahasa dan pemahaman sosiologi adalah dasar untuk studi hukum.",
    },
    {
        id: 'R6',
        antecedent: (facts) => facts['cocok_bidang_sosial'] === 'ya' && facts['cocok_bidang_hukum'] === 'ya' && facts['preferensi_pekerjaan_administratif'] === 'ya',
        consequent: { rekomendasi: 'Hukum' },
        description: "Kecocokan di bidang sosial, hukum, dan minat pada administrasi merekomendasikan jurusan Hukum.",
    },
    {
        id: 'R7',
        antecedent: (facts) => (facts['nilai_biologi'] as number) >= 80 && (facts['nilai_kimia'] as number) >= 80,
        consequent: { cocok_bidang_kesehatan: 'ya' },
        description: "Nilai Biologi dan Kimia yang tinggi adalah fondasi utama bidang kesehatan.",
    },
    {
        id: 'R8',
        antecedent: (facts) => (facts['nilai_biologi'] as number) >= 75 && (facts['nilai_kimia'] as number) >= 75,
        consequent: { cocok_bidang_klinis: 'ya' },
        description: "Nilai Biologi dan Kimia yang baik mendukung studi di bidang klinis.",
    },
    {
        id: 'R9',
        antecedent: (facts) => facts['cocok_bidang_kesehatan'] === 'ya' && facts['cocok_bidang_klinis'] === 'ya' && facts['preferensi_pelayanan_masyarakat'] === 'ya',
        consequent: { rekomendasi: 'Kedokteran' },
        description: "Kecocokan di bidang kesehatan, klinis, dan minat pelayanan masyarakat merekomendasikan jurusan Kedokteran.",
    },
    {
        id: 'R10',
        antecedent: (facts) => (facts['nilai_seni'] as number) >= 75 && (facts['nilai_matematika'] as number) >= 75,
        consequent: { cocok_bidang_seni: 'ya' },
        description: "Kombinasi nilai Seni dan Matematika menunjukkan potensi di bidang seni terstruktur.",
    },
    {
        id: 'R11',
        antecedent: (facts) => (facts['nilai_seni'] as number) >= 75 && (facts['nilai_fisika'] as number) >= 70,
        consequent: { cocok_bidang_desain: 'ya' },
        description: "Kombinasi nilai Seni dan Fisika mendukung pemahaman ruang dan bentuk dalam desain.",
    },
    {
        id: 'R12',
        antecedent: (facts) => facts['cocok_bidang_seni'] === 'ya' && facts['cocok_bidang_desain'] === 'ya' && facts['preferensi_pekerjaan_kreatif'] === 'ya',
        consequent: { rekomendasi: 'Arsitektur' },
        description: "Kecocokan di bidang seni, desain, dan minat pada pekerjaan kreatif merekomendasikan jurusan Arsitektur.",
    },
    {
        id: 'R13',
        antecedent: (facts) => (facts['nilai_bahasa'] as number) >= 80 && (facts['nilai_sejarah'] as number) >= 75,
        consequent: { cocok_bidang_bahasa: 'ya' },
        description: "Nilai Bahasa dan Sejarah yang kuat adalah dasar untuk studi Sastra.",
    },
    {
        id: 'R14',
        antecedent: (facts) => (facts['nilai_bahasa'] as number) >= 85 && (facts['nilai_seni'] as number) >= 75,
        consequent: { cocok_bidang_kreatif: 'ya' },
        description: "Nilai Bahasa dan Seni yang tinggi menunjukkan potensi besar di bidang kreatif berbasis tulisan.",
    },
    {
        id: 'R15',
        antecedent: (facts) => facts['cocok_bidang_bahasa'] === 'ya' && facts['cocok_bidang_kreatif'] === 'ya' && facts['preferensi_pekerjaan_kreatif'] === 'ya',
        consequent: { rekomendasi: 'Sastra' },
        description: "Kecocokan di bidang bahasa, kreatif, dan minat pada pekerjaan kreatif merekomendasikan jurusan Sastra.",
    },
    {
        id: 'R16',
        antecedent: (facts) => (facts['nilai_ekonomi'] as number) >= 80 && (facts['nilai_matematika'] as number) >= 75,
        consequent: { cocok_bidang_keuangan: 'ya' },
        description: "Nilai Ekonomi dan Matematika yang baik adalah kunci untuk bidang keuangan.",
    },
    {
        id: 'R17',
        antecedent: (facts) => (facts['nilai_ekonomi'] as number) >= 75 && (facts['nilai_matematika'] as number) >= 80,
        consequent: { cocok_bidang_analitis: 'ya' },
        description: "Kombinasi Ekonomi dan Matematika yang kuat menunjukkan kemampuan analitis yang tinggi.",
    },
    {
        id: 'R18',
        antecedent: (facts) => facts['cocok_bidang_keuangan'] === 'ya' && facts['cocok_bidang_analitis'] === 'ya' && facts['preferensi_pekerjaan_administratif'] === 'ya',
        consequent: { rekomendasi: 'Akuntansi' },
        description: "Kecocokan di bidang keuangan, analitis, dan minat administrasi merekomendasikan jurusan Akuntansi.",
    },
];

export interface UserInput {
  [key: string]: string | number;
}

export interface RecommendationResult {
  rekomendasi: string;
  alasan: string[];
}

export function getRecommendation(userInput: UserInput): RecommendationResult[] {
  const finalRecommendations = new Map<string, string[]>();

  // Jalur inferensi terpisah untuk setiap kemungkinan rekomendasi
  const potentialMajors = ["Teknik", "Hukum", "Kedokteran", "Arsitektur", "Sastra", "Akuntansi"];

  potentialMajors.forEach(majorName => {
    let facts: Fact = { ...userInput };
    const appliedRules = new Set<string>();
    const ruleTrace: string[] = [];

    // Iterasi beberapa kali untuk memastikan semua aturan turunan bisa terpicu (menghindari infinite loop)
    for (let i = 0; i < rules.length; i++) {
        let newFactDerived = false;
        for (const rule of rules) {
            if (!appliedRules.has(rule.id) && rule.antecedent(facts)) {
                facts = { ...facts, ...rule.consequent };
                appliedRules.add(rule.id);
                ruleTrace.push(rule.description);
                newFactDerived = true;

                if (facts.rekomendasi === majorName) {
                    if (!finalRecommendations.has(majorName)) {
                        finalRecommendations.set(majorName, ruleTrace);
                    }
                    // Berhenti mencari untuk jalur ini setelah rekomendasi ditemukan
                    return; 
                }
            }
        }
        // Jika tidak ada fakta baru yang diturunkan dalam satu iterasi penuh, hentikan
        if (!newFactDerived) break;
    }
  });

  return Array.from(finalRecommendations.entries()).map(([rekomendasi, alasan]) => ({
      rekomendasi,
      alasan,
  }));
}