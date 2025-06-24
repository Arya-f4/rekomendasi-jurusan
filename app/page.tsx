"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft, ArrowRight,
  BadgeCheck,
  Brain,
  BrainCircuit,
  Briefcase,
  Building,
  Code,
  Drama,
  Ear,
  Eye,
  GraduationCap,
  Hand,
  HeartPulse,
  Laptop,
  Lightbulb,
  Paintbrush,
  PencilRuler,
  Scale,
  ShieldCheck, SmilePlus,
  Sun,
  Target,
  User,
  Users,
  Users2,
  Wand2
} from "lucide-react";

// --- Data untuk Pilihan dengan Ikon ---

const minatItems = [
  { id: "teknologi", label: "Teknologi & Pemrograman", icon: <Code className="h-5 w-5" /> },
  { id: "bisnis", label: "Bisnis & Manajemen", icon: <Briefcase className="h-5 w-5" /> },
  { id: "seni", label: "Seni & Desain", icon: <Paintbrush className="h-5 w-5" /> },
  { id: "kesehatan", label: "Kesehatan & Sains", icon: <HeartPulse className="h-5 w-5" /> },
  { id: "sosial", label: "Sosial & Hukum", icon: <Scale className="h-5 w-5" /> },
  { id: "analisis", label: "Analisis & Riset", icon: <BrainCircuit className="h-5 w-5" /> },
];

const kemampuanItems = [
  { id: "pemecahan_masalah", label: "Pemecahan Masalah", icon: <Lightbulb className="h-5 w-5" /> },
  { id: "berpikir_kritis", label: "Berpikir Kritis", icon: <BrainCircuit className="h-5 w-5" /> },
  { id: "kreativitas", label: "Kreativitas", icon: <Wand2 className="h-5 w-5" /> },
  { id: "komunikasi", label: "Komunikasi", icon: <Users className="h-5 w-5" /> },
  { id: "manajerial", label: "Manajemen & Kepemimpinan", icon: <Target className="h-5 w-5" /> },
  { id: "ketelitian", label: "Ketelitian & Detail", icon: <PencilRuler className="h-5 w-5" /> },
];

const karakterItems = [
  { id: "analitis", label: "Analitis", icon: <BrainCircuit className="h-5 w-5" /> },
  { id: "kreatif", label: "Kreatif", icon: <Wand2 className="h-5 w-5" /> },
  { id: "pemimpin", label: "Berjiwa Pemimpin", icon: <Users className="h-5 w-5" /> },
  { id: "terorganisir", label: "Terorganisir", icon: <Briefcase className="h-5 w-5" /> },
  { id: "tekun", label: "Tekun & Gigih", icon: <BadgeCheck className="h-5 w-5" /> },
  { id: "empatik", label: "Empatik", icon: <SmilePlus className="h-5 w-5" /> },
];

const FormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi minimal 2 karakter." }),
  school: z.string().min(2, { message: "Asal sekolah harus diisi minimal 2 karakter." }),
  minat: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Anda harus memilih setidaknya satu minat.",
  }),
  kemampuan: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Anda harus memilih setidaknya satu kemampuan.",
  }),
  nilai_matematika: z.coerce.number().min(0).max(100),
  nilai_fisika: z.coerce.number().min(0).max(100),
  nilai_biologi: z.coerce.number().min(0).max(100),
  nilai_ekonomi: z.coerce.number().min(0).max(100),
  nilai_sosiologi: z.coerce.number().min(0).max(100),
  nilai_sejarah: z.coerce.number().min(0).max(100),
  nilai_seni: z.coerce.number().min(0).max(100),
  nilai_bahasa_indonesia: z.coerce.number().min(0).max(100),
  nilai_bahasa_inggris: z.coerce.number().min(0).max(100),
  lingkungan_kerja: z.string({
    required_error: "Anda harus memilih lingkungan kerja.",
  }),
  gaya_belajar: z.string({
    required_error: "Anda harus memilih gaya belajar.",
  }),
  karakter: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Anda harus memilih setidaknya satu karakter.",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const steps = [
    { id: 1, title: 'Identitas Diri', icon: <User className="h-6 w-6" /> },
    { id: 2, title: 'Minat & Kemampuan', icon: <Lightbulb className="h-6 w-6" /> },
    { id: 3, title: 'Nilai Akademik', icon: <GraduationCap className="h-6 w-6" /> },
    { id: 4, title: 'Preferensi & Karakter', icon: <Users2 className="h-6 w-6" /> },
];
const stepFields = [
    ['name', 'school'],
    ['minat', 'kemampuan'],
    Object.keys(FormSchema.shape).filter(key => key.startsWith('nilai_')),
    ['lingkungan_kerja', 'gaya_belajar', 'karakter'],
];

export default function Home() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      school: "",
      minat: [],
      kemampuan: [],
      nilai_matematika: 80,
      nilai_fisika: 80,
      nilai_biologi: 80,
      nilai_ekonomi: 80,
      nilai_sosiologi: 80,
      nilai_sejarah: 80,
      nilai_seni: 80,
      nilai_bahasa_indonesia: 80,
      nilai_bahasa_inggris: 80,
      karakter: [],
    },
  });

  const handleNext = async () => {
    const fields = stepFields[currentStep];
    const output = await form.trigger(fields as (keyof FormSchemaType)[], { shouldFocus: true });
    if (!output) return;
    if (currentStep < steps.length - 1) {
        setCurrentStep(step => step + 1);
    }
  };

  const handlePrev = () => {
      if (currentStep > 0) {
          setCurrentStep(step => step - 1);
      }
  };

  function onSubmit(data: FormSchemaType) {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.append(key, value.join(","));
      } else {
        params.append(key, String(value));
      }
    });
    router.push(`/result?${params.toString()}`);
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
       <div className="space-y-4 mb-8">
            <Progress value={((currentStep + 1) / steps.length) * 100} />
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                {steps[currentStep].icon}
                <span>Langkah {currentStep + 1} dari {steps.length}: <strong>{steps[currentStep].title}</strong></span>
            </div>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
                 <motion.div
                    key={currentStep}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
            {currentStep === 0 && (
                 <Card>
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Identitas Diri</CardTitle>
                    <CardDescription>Mari kita mulai dengan perkenalan singkat.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Nama Lengkap</FormLabel><FormControl><Input placeholder="Contoh: Budi Sanjaya" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="school" render={({ field }) => (
                        <FormItem><FormLabel>Asal Sekolah</FormLabel><FormControl><Input placeholder="Contoh: SMA Negeri 1 Jakarta" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    </CardContent>
                </Card>
            )}

            {currentStep === 1 && (
                <div className="space-y-8">
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><HeartPulse className="h-5 w-5" />Minat Kamu</CardTitle><CardDescription>Pilih bidang-bidang yang membuatmu bersemangat.</CardDescription></CardHeader>
                    <CardContent>
                        <FormField control={form.control} name="minat" render={({ field }) => (
                            <FormItem><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{minatItems.map((item) => (
                                <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => (checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((v) => v !== item.id)))}/></FormControl>
                                <FormLabel className="font-normal flex items-center gap-2">{item.icon} {item.label}</FormLabel>
                                </FormItem>))}</div><FormMessage /></FormItem>)}/>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5" />Kekuatan & Kemampuan</CardTitle><CardDescription>Apa saja keahlian yang paling kamu andalkan?</CardDescription></CardHeader>
                    <CardContent>
                        <FormField control={form.control} name="kemampuan" render={({ field }) => (
                            <FormItem><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{kemampuanItems.map((item) => (
                                <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => (checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((v) => v !== item.id)))}/></FormControl>
                                <FormLabel className="font-normal flex items-center gap-2">{item.icon} {item.label}</FormLabel>
                                </FormItem>))}</div><FormMessage /></FormItem>)}/>
                    </CardContent>
                </Card>
                </div>
            )}

             {currentStep === 2 && (
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5"/>Nilai Akademik</CardTitle><CardDescription>Masukkan nilai rata-rata rapormu (skala 0-100).</CardDescription></CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">{stepFields[2].map(key => (
                        <FormField key={key} control={form.control} name={key as any} render={({ field }) => (
                            <FormItem><FormLabel className="capitalize">{key.replace('nilai_', '').replace('_', ' ')}</FormLabel><FormControl><Input type="number" min="0" max="100" {...field} /></FormControl><FormMessage/></FormItem>
                        )} />
                    ))}</CardContent>
                </Card>
             )}

            {currentStep === 3 && (
                <div className="space-y-8">
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Users2 className="h-5 w-5" />Preferensi</CardTitle><CardDescription>Pilih lingkungan dan cara belajar yang paling kamu sukai.</CardDescription></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField control={form.control} name="lingkungan_kerja" render={({ field }) => (
                        <FormItem className="space-y-3"><FormLabel><strong>Lingkungan Kerja Ideal</strong></FormLabel><FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="kantor" /></FormControl><FormLabel className="font-normal flex items-center gap-2"><Building className="h-4 w-4"/>Kantor (Struktur)</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="lapangan" /></FormControl><FormLabel className="font-normal flex items-center gap-2"><Sun className="h-4 w-4"/>Lapangan (Dinamis)</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="remote" /></FormControl><FormLabel className="font-normal flex items-center gap-2"><Laptop className="h-4 w-4"/>Remote (Fleksibel)</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="kolaboratif" /></FormControl><FormLabel className="font-normal flex items-center gap-2"><Users className="h-4 w-4"/>Kolaboratif (Tim)</FormLabel></FormItem>
                        </RadioGroup></FormControl><FormMessage/></FormItem>
                    )} />
                    <FormField control={form.control} name="gaya_belajar" render={({ field }) => (
                        <FormItem className="space-y-3"><FormLabel><strong>Gaya Belajar Dominan</strong></FormLabel><FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="visual" /></FormControl><FormLabel className="font-normal flex items-center gap-2"><Eye className="h-4 w-4"/>Visual (Melihat)</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="auditori" /></FormControl><FormLabel className="font-normal flex items-center gap-2"><Ear className="h-4 w-4"/>Auditori (Mendengar)</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="kinestetik" /></FormControl><FormLabel className="font-normal flex items-center gap-2"><Hand className="h-4 w-4"/>Kinestetik (Praktik)</FormLabel></FormItem>
                             <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="logis" /></FormControl><FormLabel className="font-normal flex items-center gap-2"><Brain className="h-4 w-4"/>Logis (Penalaran)</FormLabel></FormItem>
                        </RadioGroup></FormControl><FormMessage/></FormItem>
                    )} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Drama className="h-5 w-5" />Kepribadian & Karakter</CardTitle><CardDescription>Pilih beberapa sifat yang paling menggambarkan dirimu.</CardDescription></CardHeader>
                    <CardContent>
                    <FormField control={form.control} name="karakter" render={({ field }) => (
                        <FormItem><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{karakterItems.map((item) => (
                           <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                           <FormControl><Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => (checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((v) => v !== item.id)))}/></FormControl>
                           <FormLabel className="font-normal flex items-center gap-2">{item.icon} {item.label}</FormLabel>
                           </FormItem>))}</div><FormMessage /></FormItem>)}/>
                    </CardContent>
                </Card>
                </div>
            )}
             </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
                <Button type="button" onClick={handlePrev} disabled={currentStep === 0} variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Kembali
                </Button>
                
                {currentStep < steps.length - 1 ? (
                    <Button type="button" onClick={handleNext} className="flex items-center gap-2">
                        Lanjut <ArrowRight className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> Lihat Rekomendasi
                    </Button>
                )}
            </div>
        </form>
      </Form>
    </main>
  );
}
