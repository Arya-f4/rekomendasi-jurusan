// app/result/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecommendation, RecommendationResult, UserInput } from '@/lib/recommendation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Detail tambahan untuk setiap jurusan (deskripsi, ikon, dll.)
const majorDetails: { [key: string]: { description: string; icon: string } } = {
  Teknik: { description: "Bidang yang berfokus pada penerapan ilmu pengetahuan dan teknologi untuk merancang, membangun, dan memelihara mesin, struktur, dan sistem.", icon: "🔬" },
  Hukum: { description: "Studi tentang sistem aturan yang ditegakkan melalui lembaga sosial untuk mengatur perilaku.", icon: "⚖️" },
  Kedokteran: { description: "Ilmu dan praktik diagnosis, pengobatan, dan pencegahan penyakit.", icon: "🩺" },
  Arsitektur: { description: "Seni dan ilmu merancang bangunan dan struktur fisik lainnya.", icon: "🏛️" },
  Sastra: { description: "Studi tentang karya tulis, terutama yang dianggap memiliki nilai seni atau intelektual.", icon: "📚" },
  Akuntansi: { description: "Pengukuran, pemrosesan, dan komunikasi informasi keuangan tentang entitas ekonomi.", icon: "💼" },
};

function Recommendations() {
  const searchParams = useSearchParams();

  // Membangun objek UserInput dari search parameters
  const userInput: UserInput = {};
  searchParams.forEach((value, key) => {
      if (key.startsWith('nilai_')) {
          userInput[key] = Number(value);
      } else {
          userInput[key] = value;
      }
  });

  const recommendations: RecommendationResult[] = getRecommendation(userInput);

  if (recommendations.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Hasil Rekomendasi</h2>
        <p>Maaf, tidak ada jurusan yang cocok dengan kriteria Anda. Coba ubah pilihan Anda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Rekomendasi Jurusan Untukmu</h1>
        <p className="text-muted-foreground mt-2">
          Berikut adalah rekomendasi jurusan berdasarkan jawabanmu.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {recommendations.map(({ rekomendasi, alasan }, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{majorDetails[rekomendasi]?.icon || '🎓'}</span>
                <CardTitle>{rekomendasi}</CardTitle>
              </div>
              <CardDescription>{majorDetails[rekomendasi]?.description || 'Deskripsi tidak tersedia.'}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div>
                    <p className="text-sm font-medium mb-2">Alasan Rekomendasi:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {alasan.map((reason, i) => <li key={i}>{reason}</li>)}
                    </ul>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<div className="text-center">Memuat hasil...</div>}>
        <Recommendations />
      </Suspense>
    </main>
  );
}