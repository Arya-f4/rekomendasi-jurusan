"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Check,
  FlaskRoundIcon as Flask,
  HeartPulse,
  Code,
  Users,
  Scale,
  Palette,
  Languages,
  LineChart,
} from "lucide-react"
import { cn } from "@/lib/utils"

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

  const [completedSteps, setCompletedSteps] = useState({
    personalData: false,
    interests: false,
    academics: false,
    skills: false,
    preferences: false,
  })

  const [activeTab, setActiveTab] = useState("personal")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [visibleAcademicFields, setVisibleAcademicFields] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<
    Array<{
      id: string
      question: string
      type: string
      options?: Array<{ value: string; label: string }>
      field: string
    }>
  >([])

  // Update visible academic fields based on selected interests
  useEffect(() => {
    const fieldsToShow = new Set<string>()

    selectedInterests.forEach((interest) => {
      switch (interest) {
        case "minatSains":
          fieldsToShow.add("nilaiMatematika")
          fieldsToShow.add("nilaiFisika")
          break
        case "minatTeknologi":
          fieldsToShow.add("nilaiMatematika")
          fieldsToShow.add("nilaiFisika")
          break
        case "minatSosial":
          fieldsToShow.add("nilaiSosiologi")
          fieldsToShow.add("nilaiSejarah")
          break
        case "minatDebat":
          fieldsToShow.add("nilaiSejarah")
          fieldsToShow.add("nilaiBahasa")
          break
        case "minatKesehatan":
          fieldsToShow.add("nilaiBiologi")
          fieldsToShow.add("nilaiKimia")
          break
        case "minatSeni":
          fieldsToShow.add("nilaiSeni")
          break
        case "minatBahasa":
          fieldsToShow.add("nilaiBahasa")
          break
        case "minatKeuangan":
          fieldsToShow.add("nilaiEkonomi")
          fieldsToShow.add("nilaiMatematika")
          break
      }
    })

    setVisibleAcademicFields(Array.from(fieldsToShow))
  }, [selectedInterests])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }
      return newData
    })

    // Update completed steps based on filled fields
    updateCompletedSteps()
  }

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) => {
      // Check if interest is already selected
      if (prev.includes(interest)) {
        // Remove interest
        return prev.filter((item) => item !== interest)
      } else {
        // Add interest
        return [...prev, interest]
      }
    })

    // Set the interest value to "tinggi" if selected, or empty if deselected
    const value = selectedInterests.includes(interest) ? "" : "tinggi"

    setFormData((prev) => {
      const newData = { ...prev, [interest]: value }

      // If interest is being selected (value is "tinggi"), update related fields
      if (value === "tinggi") {
        switch (interest) {
          case "minatSains":
            // If science interest is high, update related fields
            if (newData.nilaiMatematika === "") newData.nilaiMatematika = "75"
            if (newData.nilaiFisika === "") newData.nilaiFisika = "75"
            if (newData.kemampuanAnalitis === "") newData.kemampuanAnalitis = "baik"
            break
          case "minatTeknologi":
            // If technology interest is high, update related fields
            if (newData.keterampilanTeknis === "") newData.keterampilanTeknis = "baik"
            if (newData.preferensiPekerjaan === "") newData.preferensiPekerjaan = "Teknis"
            break
          case "minatSosial":
            // If social interest is high, update related fields
            if (newData.nilaiSosiologi === "") newData.nilaiSosiologi = "75"
            if (newData.kemampuanKomunikasi === "") newData.kemampuanKomunikasi = "baik"
            break
          case "minatKesehatan":
            // If health interest is high, update related fields
            if (newData.nilaiBiologi === "") newData.nilaiBiologi = "75"
            if (newData.nilaiKimia === "") newData.nilaiKimia = "75"
            if (newData.preferensiPekerjaan === "") newData.preferensiPekerjaan = "Pelayanan Masyarakat"
            break
          case "minatSeni":
            // If art interest is high, update related fields
            if (newData.nilaiSeni === "") newData.nilaiSeni = "75"
            if (newData.kemampuanKreativitas === "") newData.kemampuanKreativitas = "baik"
            break
          case "minatBahasa":
            // If language interest is high, update related fields
            if (newData.nilaiBahasa === "") newData.nilaiBahasa = "75"
            if (newData.kemampuanKomunikasi === "") newData.kemampuanKomunikasi = "baik"
            break
          case "minatKeuangan":
            // If finance interest is high, update related fields
            if (newData.nilaiEkonomi === "") newData.nilaiEkonomi = "75"
            if (newData.nilaiMatematika === "") newData.nilaiMatematika = "75"
            if (newData.preferensiPekerjaan === "") newData.preferensiPekerjaan = "Administratif"
            break
          case "minatDebat":
            // If debate interest is high, update related fields
            if (newData.kemampuanKomunikasi === "") newData.kemampuanKomunikasi = "baik"
            if (newData.nilaiSejarah === "") newData.nilaiSejarah = "75"
            break
        }
      }

      return newData
    })

    // Update completed steps
    updateCompletedSteps()
  }

  const updateCompletedSteps = () => {
    const personalFields = ["namaLengkap", "umur", "jenisKelamin", "sekolahAsal", "kotaAsal"]

    // Check if personal data is complete
    const personalComplete = personalFields.every((field) => formData[field as keyof typeof formData] !== "")

    // Check if at least 1 interest is selected
    const interestsComplete = selectedInterests.length >= 1

    // Check if job preference is selected
    const preferenceComplete = formData.preferensiPekerjaan !== ""

    setCompletedSteps((prev) => ({
      ...prev,
      personalData: personalComplete,
      interests: interestsComplete,
      preferences: preferenceComplete,
    }))
  }

  const generateQuestions = () => {
    const newQuestions: Array<{
      id: string
      question: string
      type: string
      options?: Array<{ value: string; label: string }>
      field: string
    }> = []

    // Academic questions based on selected interests
    if (selectedInterests.includes("minatSains") || selectedInterests.includes("minatTeknologi")) {
      newQuestions.push({
        id: "nilaiMatematika",
        question: "Berapa nilai rata-rata Matematika kamu?",
        type: "number",
        field: "nilaiMatematika",
      })
      newQuestions.push({
        id: "nilaiFisika",
        question: "Berapa nilai rata-rata Fisika kamu?",
        type: "number",
        field: "nilaiFisika",
      })
    }

    if (selectedInterests.includes("minatKesehatan")) {
      newQuestions.push({
        id: "nilaiBiologi",
        question: "Berapa nilai rata-rata Biologi kamu?",
        type: "number",
        field: "nilaiBiologi",
      })
      newQuestions.push({
        id: "nilaiKimia",
        question: "Berapa nilai rata-rata Kimia kamu?",
        type: "number",
        field: "nilaiKimia",
      })
    }

    if (selectedInterests.includes("minatSosial") || selectedInterests.includes("minatDebat")) {
      newQuestions.push({
        id: "nilaiSosiologi",
        question: "Berapa nilai rata-rata Sosiologi kamu?",
        type: "number",
        field: "nilaiSosiologi",
      })
      newQuestions.push({
        id: "nilaiSejarah",
        question: "Berapa nilai rata-rata Sejarah kamu?",
        type: "number",
        field: "nilaiSejarah",
      })
    }

    if (selectedInterests.includes("minatBahasa")) {
      newQuestions.push({
        id: "nilaiBahasa",
        question: "Berapa nilai rata-rata Bahasa kamu?",
        type: "number",
        field: "nilaiBahasa",
      })
    }

    if (selectedInterests.includes("minatSeni")) {
      newQuestions.push({
        id: "nilaiSeni",
        question: "Berapa nilai rata-rata Seni kamu?",
        type: "number",
        field: "nilaiSeni",
      })
    }

    if (selectedInterests.includes("minatKeuangan")) {
      newQuestions.push({
        id: "nilaiEkonomi",
        question: "Berapa nilai rata-rata Ekonomi kamu?",
        type: "number",
        field: "nilaiEkonomi",
      })
    }

    // Skill questions
    newQuestions.push({
      id: "kemampuanAnalitis",
      question: "Bagaimana kemampuan analitis kamu?",
      type: "select",
      options: [
        { value: "baik", label: "Baik" },
        { value: "sedang", label: "Sedang" },
        { value: "kurang", label: "Kurang" },
      ],
      field: "kemampuanAnalitis",
    })

    newQuestions.push({
      id: "kemampuanKomunikasi",
      question: "Bagaimana kemampuan komunikasi kamu?",
      type: "select",
      options: [
        { value: "baik", label: "Baik" },
        { value: "sedang", label: "Sedang" },
        { value: "kurang", label: "Kurang" },
      ],
      field: "kemampuanKomunikasi",
    })

    newQuestions.push({
      id: "kemampuanKreativitas",
      question: "Bagaimana kemampuan kreativitas kamu?",
      type: "select",
      options: [
        { value: "baik", label: "Baik" },
        { value: "sedang", label: "Sedang" },
        { value: "kurang", label: "Kurang" },
      ],
      field: "kemampuanKreativitas",
    })

    newQuestions.push({
      id: "kemampuanKetelitian",
      question: "Bagaimana kemampuan ketelitian kamu?",
      type: "select",
      options: [
        { value: "baik", label: "Baik" },
        { value: "sedang", label: "Sedang" },
        { value: "kurang", label: "Kurang" },
      ],
      field: "kemampuanKetelitian",
    })

    newQuestions.push({
      id: "kemampuanSpasial",
      question: "Bagaimana kemampuan spasial kamu?",
      type: "select",
      options: [
        { value: "baik", label: "Baik" },
        { value: "sedang", label: "Sedang" },
        { value: "kurang", label: "Kurang" },
      ],
      field: "kemampuanSpasial",
    })

    newQuestions.push({
      id: "keterampilanTeknis",
      question: "Bagaimana keterampilan teknis kamu?",
      type: "select",
      options: [
        { value: "baik", label: "Baik" },
        { value: "sedang", label: "Sedang" },
        { value: "kurang", label: "Kurang" },
      ],
      field: "keterampilanTeknis",
    })

    setQuestions(newQuestions)
    setCurrentQuestion(0)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleQuestionChange = (value: string) => {
    const currentField = questions[currentQuestion].field
    handleChange(currentField, value)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const goToNextTab = () => {
    if (activeTab === "personal") {
      setActiveTab("academic")
      generateQuestions()
    }
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

  // Interest cards data
  const interestCards = [
    { id: "minatSains", label: "Sains", icon: <Flask className="h-6 w-6" /> },
    { id: "minatTeknologi", label: "Teknologi", icon: <Code className="h-6 w-6" /> },
    { id: "minatSosial", label: "Sosial", icon: <Users className="h-6 w-6" /> },
    { id: "minatDebat", label: "Debat", icon: <Scale className="h-6 w-6" /> },
    { id: "minatKesehatan", label: "Kesehatan", icon: <HeartPulse className="h-6 w-6" /> },
    { id: "minatSeni", label: "Seni", icon: <Palette className="h-6 w-6" /> },
    { id: "minatBahasa", label: "Bahasa", icon: <Languages className="h-6 w-6" /> },
    { id: "minatKeuangan", label: "Keuangan", icon: <LineChart className="h-6 w-6" /> },
  ]

  // Academic fields mapping
  const academicFields = [
    { id: "nilaiMatematika", label: "Nilai Matematika" },
    { id: "nilaiFisika", label: "Nilai Fisika" },
    { id: "nilaiBiologi", label: "Nilai Biologi" },
    { id: "nilaiKimia", label: "Nilai Kimia" },
    { id: "nilaiBahasa", label: "Nilai Bahasa" },
    { id: "nilaiSejarah", label: "Nilai Sejarah" },
    { id: "nilaiSosiologi", label: "Nilai Sosiologi" },
    { id: "nilaiEkonomi", label: "Nilai Ekonomi" },
    { id: "nilaiSeni", label: "Nilai Seni" },
  ]

  return (
    <main className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Rekomendasi Jurusan Kuliah</CardTitle>
          <CardDescription>Isi formulir berikut untuk mendapatkan rekomendasi jurusan kuliah</CardDescription>
          <div className="flex justify-between mb-4">
            <div
              className={`flex items-center ${completedSteps.personalData ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${completedSteps.personalData ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                1
              </div>
              <span className="text-sm">Data Pribadi</span>
            </div>
            <div className={`flex items-center ${completedSteps.interests ? "text-primary" : "text-muted-foreground"}`}>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${completedSteps.interests ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                2
              </div>
              <span className="text-sm">Minat</span>
            </div>
            <div
              className={`flex items-center ${completedSteps.preferences ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${completedSteps.preferences ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                3
              </div>
              <span className="text-sm">Preferensi</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
                <p className="text-sm text-gray-500 mb-4">Pilih bidang studi yang kamu minati:</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {interestCards.map((interest) => (
                    <div
                      key={interest.id}
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2",
                        selectedInterests.includes(interest.id)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card hover:bg-accent",
                      )}
                      onClick={() => handleInterestToggle(interest.id)}
                    >
                      {interest.icon}
                      <span className="font-medium">{interest.label}</span>
                      {selectedInterests.includes(interest.id) && <Check className="h-4 w-4 absolute top-2 right-2" />}
                    </div>
                  ))}
                </div>

                {selectedInterests.length < 1 && (
                  <p className="text-sm text-red-500 mt-2">Pilih minimal 1 bidang minat</p>
                )}

                <div className="space-y-2 mt-6">
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
                    onClick={goToNextTab}
                    disabled={selectedInterests.length < 1}
                  >
                    Lanjut ke Data Akademik
                  </Button>
                </div>
              </TabsContent>

              {/* Academic Data Tab */}
              <TabsContent value="academic" className="space-y-6" id="academic-tab">
                {selectedInterests.length > 0 ? (
                  <>
                    {questions.length > 0 ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">
                            Pertanyaan {currentQuestion + 1} dari {questions.length}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% selesai
                          </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-6">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${Math.round(((currentQuestion + 1) / questions.length) * 100)}%` }}
                          ></div>
                        </div>

                        <div className="p-6 border rounded-lg shadow-sm">
                          <h4 className="text-xl font-medium mb-4">{questions[currentQuestion].question}</h4>

                          {questions[currentQuestion].type === "number" ? (
                            <div className="space-y-2">
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={formData[questions[currentQuestion].field as keyof typeof formData] as string}
                                onChange={(e) => handleQuestionChange(e.target.value)}
                                placeholder="0-100"
                                className="text-lg p-6"
                                required
                              />
                              <p className="text-sm text-muted-foreground">Masukkan nilai antara 0-100</p>
                            </div>
                          ) : questions[currentQuestion].type === "select" ? (
                            <div className="space-y-4">
                              {questions[currentQuestion].options?.map((option) => (
                                <div
                                  key={option.value}
                                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                                    formData[questions[currentQuestion].field as keyof typeof formData] === option.value
                                      ? "bg-primary text-primary-foreground border-primary"
                                      : "hover:bg-accent"
                                  }`}
                                  onClick={() => handleQuestionChange(option.value)}
                                >
                                  <span className="text-lg">{option.label}</span>
                                  {formData[questions[currentQuestion].field as keyof typeof formData] ===
                                    option.value && <Check className="h-5 w-5 ml-auto" />}
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div className="flex justify-between mt-6">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handlePrevQuestion}
                            disabled={currentQuestion === 0}
                          >
                            Sebelumnya
                          </Button>

                          {currentQuestion < questions.length - 1 ? (
                            <Button
                              type="button"
                              onClick={handleNextQuestion}
                              disabled={!formData[questions[currentQuestion].field as keyof typeof formData]}
                            >
                              Selanjutnya
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              disabled={!formData[questions[currentQuestion].field as keyof typeof formData]}
                            >
                              Lihat Rekomendasi
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                          <h3 className="text-lg font-medium mb-2">Memuat pertanyaan...</h3>
                          <p className="text-muted-foreground">Mohon tunggu sebentar</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-8 text-center bg-muted rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Belum Ada Minat yang Dipilih</h3>
                    <p className="text-muted-foreground mb-4">
                      Silakan kembali ke tab Data Pribadi dan pilih minimal satu bidang minat untuk melanjutkan.
                    </p>
                    <Button onClick={() => setActiveTab("personal")}>Kembali ke Data Pribadi</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
