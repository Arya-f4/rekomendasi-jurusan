// lib/recommendation.ts

/**
 * File ini berisi logika inti untuk sistem pakar rekomendasi jurusan.
 * Logika ini menggunakan metode forward chaining sederhana.
 *
 * Prosesnya adalah sebagai berikut:
 * 1. Menerima input dari pengguna (fakta awal).
 * 2. Menyiapkan basis pengetahuan (daftar jurusan beserta kriterianya).
 * 3. Mesin inferensi (inference engine) akan mencocokkan fakta dari pengguna dengan
 * kriteria pada setiap jurusan.
 * 4. Setiap kecocokan akan menambah skor untuk jurusan tersebut.
 * 5. Hasilnya adalah daftar jurusan yang diurutkan berdasarkan skor tertinggi.
 */

// Tipe data untuk input pengguna
export interface UserInput {
  minat: string[];
  kemampuan: string[];
  nilai_matematika: number;
  nilai_fisika: number;
  nilai_kimia: number;
  nilai_biologi: number;
  nilai_ekonomi: number;
  nilai_geografi: number;
  nilai_sosiologi: number;
  nilai_sejarah: number;
  nilai_seni: number;
  nilai_bahasa_indonesia: number;
  nilai_bahasa_inggris: number;
  lingkungan_kerja: string;
  gaya_belajar: string;
  karakter: string[];
}

// Tipe data untuk kriteria setiap jurusan
interface MajorCriteria {
  minat: string[];
  kemampuan: string[];
  // Nilai minimum yang direkomendasikan untuk jurusan ini
  nilai_matematika?: number;
  nilai_fisika?: number;
  nilai_kimia?: number;
  nilai_biologi?: number;
  nilai_ekonomi?: number;
  nilai_geografi?: number;
  nilai_sosiologi?: number;
  nilai_sejarah?: number;
  nilai_seni?: number;
  nilai_bahasa_indonesia?: number;
  nilai_bahasa_inggris?: number;
  lingkungan_kerja?: string[];
  gaya_belajar?: string[];
  karakter?: string[];
}

// Tipe data untuk struktur data jurusan
export interface Major {
  id: string;
  name: string;
  description: string;
  criteria: MajorCriteria;
}

// Tipe data untuk hasil rekomendasi
export interface RecommendationResult {
  major: Major;
  score: number;
  matchDetails: {
    matchedCriteria: number;
    totalCriteria: number;
  };
}

// Basis Pengetahuan (Knowledge Base) - Daftar semua jurusan dan kriterianya
const majors: Major[] = [
  {
    id: "if",
    name: "Teknik Informatika",
    description: "Jurusan yang berfokus pada pengembangan perangkat lunak, kecerdasan buatan, dan jaringan komputer.",
    criteria: {
      minat: ["teknologi", "pemrograman", "analisis", "logika"],
      kemampuan: ["pemecahan_masalah", "berpikir_kritis", "matematika"],
      nilai_matematika: 85,
      nilai_fisika: 80,
      nilai_bahasa_inggris: 80,
      lingkungan_kerja: ["kantor", "remote"],
      gaya_belajar: ["visual", "logis"],
      karakter: ["tekun", "rasional", "kreatif"],
    },
  },
  {
    id: "si",
    name: "Sistem Informasi",
    description: "Jurusan yang menjembatani antara ilmu komputer dengan bisnis dan manajemen.",
    criteria: {
      minat: ["teknologi", "bisnis", "manajemen", "analisis"],
      kemampuan: ["pemecahan_masalah", "komunikasi", "manajerial"],
      nilai_matematika: 80,
      nilai_ekonomi: 80,
      nilai_bahasa_inggris: 85,
      lingkungan_kerja: ["kantor", "kolaboratif"],
      gaya_belajar: ["auditori", "sosial"],
      karakter: ["terorganisir", "komunikatif", "analitis"],
    },
  },
  {
    id: "dkv",
    name: "Desain Komunikasi Visual",
    description: "Jurusan yang berfokus pada komunikasi visual melalui media seperti grafis, video, dan animasi.",
    criteria: {
      minat: ["seni", "kreativitas", "visual"],
      kemampuan: ["menggambar", "desain_grafis", "imajinasi"],
      nilai_seni: 85,
      nilai_bahasa_indonesia: 80,
      lingkungan_kerja: ["kantor", "freelance", "studio"],
      gaya_belajar: ["visual", "kinestetik"],
      karakter: ["kreatif", "imajinatif", "detail"],
    },
  },
  {
    id: "ak",
    name: "Akuntansi",
    description: "Jurusan yang mempelajari pencatatan, pelaporan, dan analisis keuangan.",
    criteria: {
      minat: ["bisnis", "keuangan", "angka", "analisis"],
      kemampuan: ["ketelitian", "matematika", "organisasi"],
      nilai_ekonomi: 85,
      nilai_matematika: 85,
      lingkungan_kerja: ["kantor"],
      gaya_belajar: ["logis", "soliter"],
      karakter: ["teliti", "jujur", "terorganisir"],
    },
  },
  {
    id: "mn",
    name: "Manajemen",
    description: "Jurusan yang mempelajari perencanaan, pengelolaan, dan pengorganisasian sumber daya perusahaan.",
    criteria: {
      minat: ["bisnis", "kepemimpinan", "strategi"],
      kemampuan: ["manajerial", "komunikasi", "pemecahan_masalah"],
      nilai_ekonomi: 85,
      nilai_sosiologi: 80,
      nilai_bahasa_inggris: 80,
      lingkungan_kerja: ["kantor", "kolaboratif"],
      gaya_belajar: ["sosial", "auditori"],
      karakter: ["pemimpin", "komunikatif", "strategis"],
    },
  },
    {
    id: "hk",
    name: "Hukum",
    description: "Mempelajari sistem hukum yang berkaitan dengan kehidupan kemasyarakatan.",
    criteria: {
      minat: ["sosial", "keadilan", "analisis"],
      kemampuan: ["berpikir_kritis", "komunikasi", "negosiasi"],
      nilai_sejarah: 85,
      nilai_sosiologi: 85,
      nilai_bahasa_indonesia: 85,
      lingkungan_kerja: ["kantor", "lapangan"],
      gaya_belajar: ["verbal", "logis"],
      karakter: ["analitis", "jujur", "kritis"],
    },
  },
  {
    id: "psi",
    name: "Psikologi",
    description: "Mempelajari perilaku dan proses mental manusia.",
    criteria: {
      minat: ["sosial", "kesehatan_mental", "analisis"],
      kemampuan: ["empati", "komunikasi", "pemecahan_masalah"],
      nilai_biologi: 80,
      nilai_sosiologi: 85,
      nilai_bahasa_indonesia: 80,
      lingkungan_kerja: ["kantor", "klinik", "sekolah"],
      gaya_belajar: ["sosial", "verbal"],
      karakter: ["empatik", "pendengar_baik", "analitis"],
    },
  },
  // Tambahkan jurusan lain di sini dengan format yang sama
];

/**
 * Mesin Inferensi (Inference Engine)
 * Fungsi utama untuk menghitung rekomendasi berdasarkan input pengguna.
 * Ini adalah implementasi dari forward chaining.
 * @param userInput - Objek yang berisi semua jawaban dari pengguna.
 * @returns Array hasil rekomendasi yang sudah diurutkan.
 */
export function getRecommendation(userInput: UserInput): RecommendationResult[] {
  const recommendations: RecommendationResult[] = [];

  // Iterasi melalui setiap jurusan dalam basis pengetahuan
  majors.forEach((major) => {
    let score = 0;
    let totalCriteriaCount = 0;

    // Aturan 1: Mencocokkan Minat
    const minatUser = new Set(userInput.minat);
    const minatJurusan = new Set(major.criteria.minat);
    totalCriteriaCount += minatJurusan.size;
    minatUser.forEach((minat) => {
      if (minatJurusan.has(minat)) {
        score += 2; // Minat diberi bobot lebih tinggi
      }
    });

    // Aturan 2: Mencocokkan Kemampuan
    const kemampuanUser = new Set(userInput.kemampuan);
    const kemampuanJurusan = new Set(major.criteria.kemampuan);
    totalCriteriaCount += kemampuanJurusan.size;
    kemampuanUser.forEach((kemampuan) => {
      if (kemampuanJurusan.has(kemampuan)) {
        score += 2; // Kemampuan juga diberi bobot lebih tinggi
      }
    });
    
    // Aturan 3: Mencocokkan Nilai Mata Pelajaran
    // Hanya nilai yang didefinisikan dalam kriteria jurusan yang akan diperiksa.
    // Ini menghilangkan pengecekan parameter yang tidak relevan.
    Object.keys(major.criteria).forEach((key) => {
        if (key.startsWith('nilai_')) {
            totalCriteriaCount++;
            const majorMinScore = major.criteria[key as keyof MajorCriteria] as number;
            const userScore = userInput[key as keyof UserInput] as number;
            if (userScore >= majorMinScore) {
                score += 1;
            }
        }
    });

    // Aturan 4: Mencocokkan Lingkungan Kerja
    if (major.criteria.lingkungan_kerja && major.criteria.lingkungan_kerja.includes(userInput.lingkungan_kerja)) {
      score += 1;
    }
    if (major.criteria.lingkungan_kerja) totalCriteriaCount += 1;


    // Aturan 5: Mencocokkan Gaya Belajar
    if (major.criteria.gaya_belajar && major.criteria.gaya_belajar.includes(userInput.gaya_belajar)) {
      score += 1;
    }
    if (major.criteria.gaya_belajar) totalCriteriaCount +=1;


    // Aturan 6: Mencocokkan Karakter
    if (major.criteria.karakter) {
        const karakterUser = new Set(userInput.karakter);
        const karakterJurusan = new Set(major.criteria.karakter);
        totalCriteriaCount += karakterJurusan.size;
        karakterUser.forEach((k) => {
            if (karakterJurusan.has(k)) {
                score += 1;
            }
        });
    }

    // Hanya tambahkan jurusan jika memiliki skor > 0 untuk menghindari hasil yang tidak relevan
    if (score > 0) {
        recommendations.push({
            major,
            score,
            matchDetails: {
              matchedCriteria: score, // Disederhanakan, bisa dibuat lebih detail jika perlu
              totalCriteria: totalCriteriaCount,
            }
        });
    }
  });

  // Urutkan rekomendasi dari skor tertinggi ke terendah
  return recommendations.sort((a, b) => b.score - a.score);
}
