"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { getAllRecommendations, type RecommendationResult } from "../lib/recommendation"
import { BookOpen, Briefcase, Building, FlaskRoundIcon as Flask, HeartPulse, Scale, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ResultPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>("0")

  // Extract form data from URL parameters
  const formData = {
    minatSains: searchParams.get("minatSains") || "",
    minatTeknologi: searchParams.get("minatTeknologi") || "",
    minatSosial: searchParams.get("minatSosial") || "",
    minatKesehatan: searchParams.get("minatKesehatan") || "",
    minatSeni: searchParams.get("minatSeni") || "",
    minatBahasa: searchParams.get("minatBahasa") || "",
    minatKeuangan: searchParams.get("minatKeuangan") || "",
    minatDebat: searchParams.get("minatDebat") || "",
    nilaiMatematika: Number(searchParams.get("nilaiMatematika") || 0),
    nilaiFisika: Number(searchParams.get("nilaiFisika") || 0),
    nilaiBiologi: Number(searchParams.get("nilaiBiologi") || 0),
    nilaiKimia: Number(searchParams.get("nilaiKimia") || 0),
    nilaiBahasa: Number(searchParams.get("nilaiBahasa") || 0),
    nilaiSejarah: Number(searchParams.get("nilaiSejarah") || 0),
    nilaiSosiologi: Number(searchParams.get("nilaiSosiologi") || 0),
    nilaiEkonomi: Number(searchParams.get("nilaiEkonomi") || 0),
    nilaiSeni: Number(searchParams.get("nilaiSeni") || 0),
    kemampuanAnalitis: searchParams.get("kemampuanAnalitis") || "",
    kemampuanKomunikasi: searchParams.get("kemampuanKomunikasi") || "",
    kemampuanKreativitas: searchParams.get("kemampuanKreativitas") || "",
    kemampuanKetelitian: searchParams.get("kemampuanKetelitian") || "",
    kemampuanSpasial: searchParams.get("kemampuanSpasial") || "",
    keterampilanTeknis: searchParams.get("keterampilanTeknis") || "",
    preferensiPekerjaan: searchParams.get("preferensiPekerjaan") || "",
  }

  // Get all recommendations based on form data
  const recommendations: RecommendationResult[] = getAllRecommendations(formData)

  // Define recommendation details
  const recommendationDetails: Record<string, any> = {
    Teknik: {
      icon: <Flask className="w-12 h-12 text-primary" />,
      description:
        "Jurusan Teknik cocok untuk Anda yang memiliki minat tinggi di bidang sains dan teknologi. Anda memiliki kemampuan analitis dan teknis yang baik, serta nilai matematika dan fisika yang memadai.",
      careers: ["Insinyur", "Pengembang Perangkat Lunak", "Analis Sistem", "Peneliti Teknologi"],
      universities: [
        "Institut Teknologi Bandung",
        "Universitas Indonesia",
        "Universitas Gadjah Mada",
        "Institut Teknologi Sepuluh Nopember",
      ],
    },
    Hukum: {
      icon: <Scale className="w-12 h-12 text-primary" />,
      description:
        "Jurusan Hukum cocok untuk Anda yang memiliki minat tinggi di bidang sosial dan debat. Anda memiliki kemampuan komunikasi yang baik dan nilai sejarah serta sosiologi yang memadai.",
      careers: ["Pengacara", "Hakim", "Konsultan Hukum", "Notaris"],
      universities: [
        "Universitas Indonesia",
        "Universitas Gadjah Mada",
        "Universitas Padjadjaran",
        "Universitas Airlangga",
      ],
    },
    Kedokteran: {
      icon: <HeartPulse className="w-12 h-12 text-primary" />,
      description:
        "Jurusan Kedokteran cocok untuk Anda yang memiliki minat tinggi di bidang kesehatan. Anda memiliki kemampuan ketelitian yang baik dan nilai biologi serta kimia yang memadai.",
      careers: ["Dokter", "Peneliti Medis", "Spesialis Kesehatan", "Konsultan Medis"],
      universities: [
        "Universitas Indonesia",
        "Universitas Gadjah Mada",
        "Universitas Airlangga",
        "Universitas Padjadjaran",
      ],
    },
    Arsitektur: {
      icon: <Building className="w-12 h-12 text-primary" />,
      description:
        "Jurusan Arsitektur cocok untuk Anda yang memiliki minat tinggi di bidang seni dan desain. Anda memiliki kemampuan kreativitas dan spasial yang baik, serta nilai seni dan matematika yang memadai.",
      careers: ["Arsitek", "Desainer Interior", "Perencana Kota", "Konsultan Desain"],
      universities: [
        "Institut Teknologi Bandung",
        "Universitas Indonesia",
        "Universitas Gadjah Mada",
        "Institut Teknologi Sepuluh Nopember",
      ],
    },
    Sastra: {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      description:
        "Jurusan Sastra cocok untuk Anda yang memiliki minat tinggi di bidang bahasa dan seni. Anda memiliki kemampuan komunikasi dan kreativitas yang baik, serta nilai bahasa dan sejarah yang memadai.",
      careers: ["Penulis", "Editor", "Penerjemah", "Pengajar Bahasa"],
      universities: [
        "Universitas Indonesia",
        "Universitas Gadjah Mada",
        "Universitas Padjadjaran",
        "Universitas Airlangga",
      ],
    },
    Akuntansi: {
      icon: <Briefcase className="w-12 h-12 text-primary" />,
      description:
        "Jurusan Akuntansi cocok untuk Anda yang memiliki minat tinggi di bidang keuangan. Anda memiliki kemampuan ketelitian dan analitis yang baik, serta nilai matematika dan ekonomi yang memadai.",
      careers: ["Akuntan", "Auditor", "Konsultan Keuangan", "Analis Keuangan"],
      universities: [
        "Universitas Indonesia",
        "Universitas Gadjah Mada",
        "Universitas Padjadjaran",
        "Universitas Airlangga",
      ],
    },
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Hasil Rekomendasi Jurusan</CardTitle>
          <CardDescription>
            Berdasarkan data yang Anda berikan, berikut adalah rekomendasi jurusan kuliah untuk Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <h3 className="text-lg font-medium">Ditemukan {recommendations.length} jurusan yang sesuai</h3>
                </div>

                <div className="w-full mb-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full grid grid-cols-3 md:grid-cols-6">
                      {recommendations.map((rec, index) => (
                        <TabsTrigger key={index} value={index.toString()} className="relative">
                          {rec.jurusan}
                          <Badge
                            className="absolute -top-2 -right-2 text-xs"
                            variant={rec.kesesuaian >= 70 ? "default" : "secondary"}
                          >
                            {rec.kesesuaian}%
                          </Badge>
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {recommendations.map((rec, index) => {
                      const details = recommendationDetails[rec.jurusan]
                      return (
                        <TabsContent key={index} value={index.toString()} className="mt-6">
                          <Card>
                            <CardHeader className="pb-2">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-4">
                                  {details.icon}
                                  <div>
                                    <CardTitle>Jurusan {rec.jurusan}</CardTitle>
                                    <CardDescription>Tingkat kesesuaian: {rec.kesesuaian}%</CardDescription>
                                  </div>
                                </div>
                                <Badge
                                  className="mt-2 md:mt-0 self-start md:self-center"
                                  variant={rec.kesesuaian >= 70 ? "default" : "secondary"}
                                >
                                  {rec.kesesuaian >= 80
                                    ? "Sangat Sesuai"
                                    : rec.kesesuaian >= 60
                                      ? "Sesuai"
                                      : rec.kesesuaian >= 40
                                        ? "Cukup Sesuai"
                                        : "Kurang Sesuai"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="mb-4">{details.description}</p>

                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h4 className="font-medium mb-2">Alasan Rekomendasi:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {rec.alasan.map((alasan, i) => (
                                    <li key={i}>{alasan}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div>
                                  <h4 className="text-lg font-semibold mb-2">Prospek Karir</h4>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {details.careers.map((career: string, i: number) => (
                                      <li key={i}>{career}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold mb-2">Universitas Terkemuka</h4>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {details.universities.map((university: string, i: number) => (
                                      <li key={i}>{university}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      )
                    })}
                  </Tabs>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-8">
              <p className="text-lg text-muted-foreground">
                Tidak ada rekomendasi yang ditemukan berdasarkan data yang Anda berikan.
              </p>
            </div>
          )}

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Catatan Penting</h3>
            <p>
              Rekomendasi ini didasarkan pada data yang Anda berikan dan merupakan saran awal. Untuk keputusan final,
              pertimbangkan juga faktor lain seperti biaya pendidikan, lokasi universitas, dan peluang karir di daerah
              Anda.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => window.history.back()} variant="outline" className="mr-2">
            Kembali ke Form
          </Button>
          <Button onClick={() => window.print()}>Cetak Hasil</Button>
        </CardFooter>
      </Card>
    </main>
  )
}
