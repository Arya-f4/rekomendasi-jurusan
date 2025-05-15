"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getRecommendation } from "@/lib/recommendation"
import ResultPage from "../result-page"
export default function Page() {
  const searchParams = useSearchParams()

  // Extract form data from query parameters
  const formData = {
    // Personal Data
    namaLengkap: searchParams.get("namaLengkap") || "",
    umur: searchParams.get("umur") || "",
    jenisKelamin: searchParams.get("jenisKelamin") || "",
    sekolahAsal: searchParams.get("sekolahAsal") || "",
    kotaAsal: searchParams.get("kotaAsal") || "",

    // Study Interests
    minatSains: searchParams.get("minatSains") || "",
    minatTeknologi: searchParams.get("minatTeknologi") || "",
    minatSosial: searchParams.get("minatSosial") || "",
    minatHukum: searchParams.get("minatHukum") || "",
    minatKesehatan: searchParams.get("minatKesehatan") || "",
    minatSeni: searchParams.get("minatSeni") || "",
    minatBahasa: searchParams.get("minatBahasa") || "",
    minatKeuangan: searchParams.get("minatKeuangan") || "",
    minatMatematika: searchParams.get("minatMatematika") || "",
    minatDesain: searchParams.get("minatDesain") || "",
    minatDebat: searchParams.get("minatDebat") || "",

    // Academic Scores
    nilaiMatematika: searchParams.get("nilaiMatematika") || "0",
    nilaiFisika: searchParams.get("nilaiFisika") || "0",
    nilaiBiologi: searchParams.get("nilaiBiologi") || "0",
    nilaiKimia: searchParams.get("nilaiKimia") || "0",
    nilaiBahasa: searchParams.get("nilaiBahasa") || "0",
    nilaiSejarah: searchParams.get("nilaiSejarah") || "0",
    nilaiSosiologi: searchParams.get("nilaiSosiologi") || "0",
    nilaiEkonomi: searchParams.get("nilaiEkonomi") || "0",
    nilaiSeni: searchParams.get("nilaiSeni") || "0",

    // Skills
    kemampuanAnalitis: searchParams.get("kemampuanAnalitis") || "",
    kemampuanKomunikasi: searchParams.get("kemampuanKomunikasi") || "",
    kemampuanKreativitas: searchParams.get("kemampuanKreativitas") || "",
    kemampuanKetelitian: searchParams.get("kemampuanKetelitian") || "",
    kemampuanSpasial: searchParams.get("kemampuanSpasial") || "",
    kemampuanMemori: searchParams.get("kemampuanMemori") || "",
    keterampilanTeknis: searchParams.get("keterampilanTeknis") || "",
    kemampuanProblemSolving: searchParams.get("kemampuanProblemSolving") || "",

    // Job Preference
    preferensiPekerjaan: searchParams.get("preferensiPekerjaan") || "",
  }

  // Get recommendation based on form data
  const recommendation = getRecommendation({
    minatSains: formData.minatSains,
    minatTeknologi: formData.minatTeknologi,
    minatSosial: formData.minatSosial,
    minatKesehatan: formData.minatKesehatan,
    minatSeni: formData.minatSeni,
    minatBahasa: formData.minatBahasa,
    minatKeuangan: formData.minatKeuangan,
    minatDebat: formData.minatDebat,
    nilaiMatematika: Number.parseInt(formData.nilaiMatematika),
    nilaiFisika: Number.parseInt(formData.nilaiFisika),
    nilaiBiologi: Number.parseInt(formData.nilaiBiologi),
    nilaiKimia: Number.parseInt(formData.nilaiKimia),
    nilaiBahasa: Number.parseInt(formData.nilaiBahasa),
    nilaiSejarah: Number.parseInt(formData.nilaiSejarah),
    nilaiSosiologi: Number.parseInt(formData.nilaiSosiologi),
    nilaiEkonomi: Number.parseInt(formData.nilaiEkonomi),
    nilaiSeni: Number.parseInt(formData.nilaiSeni),
    kemampuanAnalitis: formData.kemampuanAnalitis,
    kemampuanKomunikasi: formData.kemampuanKomunikasi,
    kemampuanKreativitas: formData.kemampuanKreativitas,
    kemampuanKetelitian: formData.kemampuanKetelitian,
    kemampuanSpasial: formData.kemampuanSpasial,
    keterampilanTeknis: formData.keterampilanTeknis,
    preferensiPekerjaan: formData.preferensiPekerjaan,
  })

  return (
    <ResultPage/>
    
  )
}
