"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Personal Data
    namaLengkap: "",
    umur: "",
    jenisKelamin: "",
    sekolahAsal: "",
    kotaAsal: "",

    // Study Interests
    minatSains: "",
    minatTeknologi: "",
    minatSosial: "",
    minatHukum: "",
    minatKesehatan: "",
    minatSeni: "",
    minatBahasa: "",
    minatKeuangan: "",
    minatMatematika: "",
    minatDesain: "",
    minatDebat: "",

    // Academic Scores
    nilaiMatematika: "",
    nilaiFisika: "",
    nilaiBiologi: "",
    nilaiKimia: "",
    nilaiBahasa: "",
    nilaiSejarah: "",
    nilaiSosiologi: "",
    nilaiEkonomi: "",
    nilaiSeni: "",

    // Skills
    kemampuanAnalitis: "",
    kemampuanKomunikasi: "",
    kemampuanKreativitas: "",
    kemampuanKetelitian: "",
    kemampuanSpasial: "",
    kemampuanMemori: "",
    keterampilanTeknis: "",
    kemampuanProblemSolving: "",

    // Job Preference
    preferensiPekerjaan: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create query string from form data
    const queryParams = new URLSearchParams()
    Object.entries(formData).forEach(([key, value]) => {
      queryParams.append(key, value)
    })

    // Navigate to result page with query params
    router.push(`/result?${queryParams.toString()}`)
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Rekomendasi Jurusan Kuliah</CardTitle>
          <CardDescription>Isi formulir berikut untuk mendapatkan rekomendasi jurusan kuliah</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Data Pribadi</TabsTrigger>
                <TabsTrigger value="academic">Data Akademik</TabsTrigger>
              </TabsList>

              {/* Personal Data Tab */}
              <TabsContent value="personal" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="namaLengkap">Nama Lengkap</Label>
                  <Input
                    id="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={(e) => handleChange("namaLengkap", e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="umur">Umur</Label>
                    <Input
                      id="umur"
                      type="number"
                      min="15"
                      max="25"
                      value={formData.umur}
                      onChange={(e) => handleChange("umur", e.target.value)}
                      placeholder="15-25 tahun"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Jenis Kelamin</Label>
                    <RadioGroup
                      value={formData.jenisKelamin}
                      onValueChange={(value) => handleChange("jenisKelamin", value)}
                      className="flex space-x-4"
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Pria" id="pria" />
                        <Label htmlFor="pria">Pria</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Wanita" id="wanita" />
                        <Label htmlFor="wanita">Wanita</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sekolahAsal">Sekolah Asal</Label>
                    <Input
                      id="sekolahAsal"
                      value={formData.sekolahAsal}
                      onChange={(e) => handleChange("sekolahAsal", e.target.value)}
                      placeholder="Nama sekolah menengah atas"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kotaAsal">Kota Asal</Label>
                    <Input
                      id="kotaAsal"
                      value={formData.kotaAsal}
                      onChange={(e) => handleChange("kotaAsal", e.target.value)}
                      placeholder="Kota tempat tinggal"
                      required
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium pt-4">Minat Bidang Studi</h3>
                <p className="text-sm text-gray-500 mb-4">Pilih tingkat minat untuk setiap bidang berikut:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minatSains">Minat Sains</Label>
                    <Select onValueChange={(value) => handleChange("minatSains", value)} required>
                      <SelectTrigger id="minatSains">
                        <SelectValue placeholder="Pilih tingkat minat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tinggi">Tinggi</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="rendah">Rendah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minatTeknologi">Minat Teknologi</Label>
                    <Select onValueChange={(value) => handleChange("minatTeknologi", value)} required>
                      <SelectTrigger id="minatTeknologi">
                        <SelectValue placeholder="Pilih tingkat minat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tinggi">Tinggi</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="rendah">Rendah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minatSosial">Minat Sosial</Label>
                    <Select onValueChange={(value) => handleChange("minatSosial", value)} required>
                      <SelectTrigger id="minatSosial">
                        <SelectValue placeholder="Pilih tingkat minat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tinggi">Tinggi</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="rendah">Rendah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minatHukum">Minat Debat</Label>
                    <Select onValueChange={(value) => handleChange("minatDebat", value)} required>
                      <SelectTrigger id="minatDebat">
                        <SelectValue placeholder="Pilih tingkat minat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tinggi">Tinggi</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="rendah">Rendah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minatKesehatan">Minat Kesehatan</Label>
                    <Select onValueChange={(value) => handleChange("minatKesehatan", value)} required>
                      <SelectTrigger id="minatKesehatan">
                        <SelectValue placeholder="Pilih tingkat minat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tinggi">Tinggi</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="rendah">Rendah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minatSeni">Minat Seni</Label>
                    <Select onValueChange={(value) => handleChange("minatSeni", value)} required>
                      <SelectTrigger id="minatSeni">
                        <SelectValue placeholder="Pilih tingkat minat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tinggi">Tinggi</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="rendah">Rendah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minatBahasa">Minat Bahasa</Label>
                    <Select onValueChange={(value) => handleChange("minatBahasa", value)} required>
                      <SelectTrigger id="minatBahasa">
                        <SelectValue placeholder="Pilih tingkat minat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tinggi">Tinggi</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="rendah">Rendah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minatKeuangan">Minat Keuangan</Label>
                    <Select onValueChange={(value) => handleChange("minatKeuangan", value)} required>
                      <SelectTrigger id="minatKeuangan">
                        <SelectValue placeholder="Pilih tingkat minat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tinggi">Tinggi</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="rendah">Rendah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferensiPekerjaan">Preferensi Pekerjaan</Label>
                  <Select onValueChange={(value) => handleChange("preferensiPekerjaan", value)} required>
                    <SelectTrigger id="preferensiPekerjaan">
                      <SelectValue placeholder="Pilih preferensi pekerjaan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Teknis">Teknis</SelectItem>
                      <SelectItem value="Kreatif">Kreatif</SelectItem>
                      <SelectItem value="Pelayanan Masyarakat">Pelayanan Masyarakat</SelectItem>
                      <SelectItem value="Administratif">Administratif</SelectItem>
                      <SelectItem value="Klinis">Klinis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => document.getElementById("academic-tab")?.click()}
                  >
                    Lanjut ke Data Akademik
                  </Button>
                </div>
              </TabsContent>

              {/* Academic Data Tab */}
              <TabsContent value="academic" className="space-y-6" id="academic-tab">
                <h3 className="text-lg font-medium">Nilai Akademik</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Masukkan nilai rata-rata untuk setiap mata pelajaran (skala 0-100):
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nilaiMatematika">Nilai Matematika</Label>
                    <Input
                      id="nilaiMatematika"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilaiMatematika}
                      onChange={(e) => handleChange("nilaiMatematika", e.target.value)}
                      placeholder="0-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nilaiFisika">Nilai Fisika</Label>
                    <Input
                      id="nilaiFisika"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilaiFisika}
                      onChange={(e) => handleChange("nilaiFisika", e.target.value)}
                      placeholder="0-100"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nilaiBiologi">Nilai Biologi</Label>
                    <Input
                      id="nilaiBiologi"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilaiBiologi}
                      onChange={(e) => handleChange("nilaiBiologi", e.target.value)}
                      placeholder="0-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nilaiKimia">Nilai Kimia</Label>
                    <Input
                      id="nilaiKimia"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilaiKimia}
                      onChange={(e) => handleChange("nilaiKimia", e.target.value)}
                      placeholder="0-100"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nilaiBahasa">Nilai Bahasa</Label>
                    <Input
                      id="nilaiBahasa"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilaiBahasa}
                      onChange={(e) => handleChange("nilaiBahasa", e.target.value)}
                      placeholder="0-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nilaiSejarah">Nilai Sejarah</Label>
                    <Input
                      id="nilaiSejarah"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilaiSejarah}
                      onChange={(e) => handleChange("nilaiSejarah", e.target.value)}
                      placeholder="0-100"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nilaiSosiologi">Nilai Sosiologi</Label>
                    <Input
                      id="nilaiSosiologi"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilaiSosiologi}
                      onChange={(e) => handleChange("nilaiSosiologi", e.target.value)}
                      placeholder="0-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nilaiEkonomi">Nilai Ekonomi</Label>
                    <Input
                      id="nilaiEkonomi"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilaiEkonomi}
                      onChange={(e) => handleChange("nilaiEkonomi", e.target.value)}
                      placeholder="0-100"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nilaiSeni">Nilai Seni</Label>
                  <Input
                    id="nilaiSeni"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.nilaiSeni}
                    onChange={(e) => handleChange("nilaiSeni", e.target.value)}
                    placeholder="0-100 (opsional)"
                  />
                </div>

                <h3 className="text-lg font-medium pt-4">Kemampuan dan Keterampilan</h3>
                <p className="text-sm text-gray-500 mb-4">Pilih tingkat kemampuan untuk setiap keterampilan berikut:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="kemampuanAnalitis">Kemampuan Analitis</Label>
                    <Select onValueChange={(value) => handleChange("kemampuanAnalitis", value)} required>
                      <SelectTrigger id="kemampuanAnalitis">
                        <SelectValue placeholder="Pilih tingkat kemampuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baik">Baik</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="kurang">Kurang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kemampuanKomunikasi">Kemampuan Komunikasi</Label>
                    <Select onValueChange={(value) => handleChange("kemampuanKomunikasi", value)} required>
                      <SelectTrigger id="kemampuanKomunikasi">
                        <SelectValue placeholder="Pilih tingkat kemampuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baik">Baik</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="kurang">Kurang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="kemampuanKreativitas">Kemampuan Kreativitas</Label>
                    <Select onValueChange={(value) => handleChange("kemampuanKreativitas", value)} required>
                      <SelectTrigger id="kemampuanKreativitas">
                        <SelectValue placeholder="Pilih tingkat kemampuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baik">Baik</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="kurang">Kurang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kemampuanKetelitian">Kemampuan Ketelitian</Label>
                    <Select onValueChange={(value) => handleChange("kemampuanKetelitian", value)} required>
                      <SelectTrigger id="kemampuanKetelitian">
                        <SelectValue placeholder="Pilih tingkat kemampuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baik">Baik</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="kurang">Kurang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="kemampuanSpasial">Kemampuan Spasial</Label>
                    <Select onValueChange={(value) => handleChange("kemampuanSpasial", value)} required>
                      <SelectTrigger id="kemampuanSpasial">
                        <SelectValue placeholder="Pilih tingkat kemampuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baik">Baik</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="kurang">Kurang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kemampuanMemori">Kemampuan Memori</Label>
                    <Select onValueChange={(value) => handleChange("kemampuanMemori", value)} required>
                      <SelectTrigger id="kemampuanMemori">
                        <SelectValue placeholder="Pilih tingkat kemampuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baik">Baik</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="kurang">Kurang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="keterampilanTeknis">Keterampilan Teknis</Label>
                    <Select onValueChange={(value) => handleChange("keterampilanTeknis", value)} required>
                      <SelectTrigger id="keterampilanTeknis">
                        <SelectValue placeholder="Pilih tingkat keterampilan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baik">Baik</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="kurang">Kurang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kemampuanProblemSolving">Kemampuan Problem Solving</Label>
                    <Select onValueChange={(value) => handleChange("kemampuanProblemSolving", value)} required>
                      <SelectTrigger id="kemampuanProblemSolving">
                        <SelectValue placeholder="Pilih tingkat kemampuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baik">Baik</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="kurang">Kurang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-6">
                  Lihat Rekomendasi
                </Button>
              </TabsContent>
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
