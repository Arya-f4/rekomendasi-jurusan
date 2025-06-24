// app/result/page.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getRecommendation, RecommendationResult, UserInput } from '@/lib/recommendation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function Recommendations() {
  const searchParams = useSearchParams();

  // Membangun objek UserInput dari search parameters
  const userInput: UserInput = {
    minat: searchParams.get('minat')?.split(',') || [],
    kemampuan: searchParams.get('kemampuan')?.split(',') || [],
    nilai_matematika: Number(searchParams.get('nilai_matematika')) || 0,
    nilai_fisika: Number(searchParams.get('nilai_fisika')) || 0,
    nilai_kimia: Number(searchParams.get('nilai_kimia')) || 0,
    nilai_biologi: Number(searchParams.get('nilai_biologi')) || 0,
    nilai_ekonomi: Number(searchParams.get('nilai_ekonomi')) || 0,
    nilai_geografi: Number(searchParams.get('nilai_geografi')) || 0,
    nilai_sosiologi: Number(searchParams.get('nilai_sosiologi')) || 0,
    nilai_sejarah: Number(searchParams.get('nilai_sejarah')) || 0,
    nilai_seni: Number(searchParams.get('nilai_seni')) || 0,
    nilai_bahasa_indonesia: Number(searchParams.get('nilai_bahasa_indonesia')) || 0,
    nilai_bahasa_inggris: Number(searchParams.get('nilai_bahasa_inggris')) || 0,
    lingkungan_kerja: searchParams.get('lingkungan_kerja') || '',
    gaya_belajar: searchParams.get('gaya_belajar') || '',
    karakter: searchParams.get('karakter')?.split(',') || [],
  };

  // Panggil fungsi rekomendasi yang baru dan sudah disederhanakan
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
          Berikut adalah 3 rekomendasi jurusan teratas berdasarkan pilihanmu.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.slice(0, 3).map(({ major, score, matchDetails }, index) => (
          <Card key={major.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index === 0 ? 'Pilihan Utama' : `Rekomendasi #${index + 1}`}
                    </Badge>
                    <CardTitle className="mt-2">{major.name}</CardTitle>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{score}</div>
              </div>
              <CardDescription>{major.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
                <div>
                    <p className="text-sm font-medium mb-2">Tingkat Kecocokan:</p>
                    <Progress value={(matchDetails.matchedCriteria / matchDetails.totalCriteria) * 100} className="w-full" />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                        {matchDetails.matchedCriteria} dari {matchDetails.totalCriteria} kriteria cocok
                    </p>
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
