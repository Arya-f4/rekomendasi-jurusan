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
import { ArrowLeft, BrainCircuit, Briefcase, GraduationCap, HeartHandshake, Loader, Palette, School, ShieldCheck, User } from "lucide-react";

// Skema validasi diperbarui dengan nama dan asal sekolah
const FormSchema = z.object({
  nama: z.string().min(2, { message: "Nama harus diisi minimal 2 karakter." }),
  asal_sekolah: z.string().min(3, { message: "Asal sekolah harus diisi minimal 3 karakter." }),
  nilai_matematika: z.coerce.number({ required_error: "Nilai harus diisi." }).min(0, "Nilai minimal 0").max(100, "Nilai maksimal 100"),
  nilai_fisika: z.coerce.number({ required_error: "Nilai harus diisi." }).min(0).max(100),
  nilai_biologi: z.coerce.number({ required_error: "Nilai harus diisi." }).min(0).max(100),
  nilai_kimia: z.coerce.number({ required_error: "Nilai harus diisi." }).min(0).max(100),
  nilai_bahasa: z.coerce.number({ required_error: "Nilai harus diisi." }).min(0).max(100),
  nilai_sejarah: z.coerce.number({ required_error: "Nilai harus diisi." }).min(0).max(100),
  nilai_sosiologi: z.coerce.number({ required_error: "Nilai harus diisi." }).min(0).max(100),
  nilai_ekonomi: z.coerce.number({ required_error: "Nilai harus diisi." }).min(0).max(100),
  nilai_seni: z.coerce.number({ required_error: "Nilai harus diisi." }).min(0).max(100),
  preferensi_pekerjaan_teknis: z.enum(["ya", "tidak"], {
    required_error: "Anda harus memilih salah satu preferensi.",
  }),
  preferensi_pekerjaan_administratif: z.enum(["ya", "tidak"], {
    required_error: "Anda harus memilih salah satu preferensi.",
  }),
  preferensi_pelayanan_masyarakat: z.enum(["ya", "tidak"], {
    required_error: "Anda harus memilih salah satu preferensi.",
  }),
  preferensi_pekerjaan_kreatif: z.enum(["ya", "tidak"], {
    required_error: "Anda harus memilih salah satu preferensi.",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

// Langkah kuis diperbarui dengan langkah identitas diri
const quizSteps = [
    { 
        id: "identitas", 
        title: "Perkenalan Diri", 
        icon: <User className="h-6 w-6" />,
        fields: [
            { name: "nama", label: "Nama Lengkap Kamu", icon: <User className="h-5 w-5 text-gray-400"/> },
            { name: "asal_sekolah", label: "Asal Sekolah", icon: <School className="h-5 w-5 text-gray-400"/> },
        ]
    },
    { 
        id: "nilai", 
        title: "Nilai Akademik", 
        icon: <GraduationCap className="h-6 w-6" />,
        fields: [
            { name: "nilai_matematika", label: "Matematika" },
            { name: "nilai_fisika", label: "Fisika" },
            { name: "nilai_biologi", label: "Biologi" },
            { name: "nilai_kimia", label: "Kimia" },
            { name: "nilai_bahasa", label: "Bahasa" },
            { name: "nilai_sejarah", label: "Sejarah" },
            { name: "nilai_sosiologi", label: "Sosiologi" },
            { name: "nilai_ekonomi", label: "Ekonomi" },
            { name: "nilai_seni", label: "Seni" },
        ]
    },
    { id: "preferensi_pekerjaan_teknis", title: "Preferensi Pekerjaan Teknis", type: "radio", icon: <BrainCircuit className="h-6 w-6" />, label: "Apakah Anda tertarik bekerja di bidang teknis?" },
    { id: "preferensi_pekerjaan_administratif", title: "Preferensi Pekerjaan Administratif", type: "radio", icon: <Briefcase className="h-6 w-6" />, label: "Tertarik dengan pekerjaan di bidang administratif?" },
    { id: "preferensi_pelayanan_masyarakat", title: "Preferensi Pelayanan Masyarakat", type: "radio", icon: <HeartHandshake className="h-6 w-6" />, label: "Tertarik dengan pekerjaan di bidang pelayanan masyarakat?" },
    { id: "preferensi_pekerjaan_kreatif", title: "Preferensi Pekerjaan Kreatif", type: "radio", icon: <Palette className="h-6 w-6" />, label: "Tertarik dengan pekerjaan di bidang kreatif?" },
];


export default function Home() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama: "",
      asal_sekolah: "",
      nilai_matematika: 80,
      nilai_fisika: 80,
      nilai_biologi: 80,
      nilai_kimia: 80,
      nilai_bahasa: 80,
      nilai_sejarah: 80,
      nilai_sosiologi: 80,
      nilai_ekonomi: 80,
      nilai_seni: 80,
    },
    mode: "onChange",
  });

  const handleNext = async () => {
    const currentStepInfo = quizSteps[currentStep];
    let fieldsToValidate: (keyof FormSchemaType)[];

    if (currentStepInfo.id === 'identitas' || currentStepInfo.id === 'nilai') {
        fieldsToValidate = currentStepInfo.fields.map(f => f.name as keyof FormSchemaType);
    } else {
        fieldsToValidate = [currentStepInfo.id as keyof FormSchemaType];
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    
    if (isValid && currentStep < quizSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (isValid && currentStep === quizSteps.length - 1) {
        form.handleSubmit(onSubmit)();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  function onSubmit(data: FormSchemaType) {
    setIsSubmitting(true);
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    
    setTimeout(() => {
        router.push(`/result?${params.toString()}`);
    }, 1500);
  }
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const currentStepInfo = quizSteps[currentStep];

  return (
    <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader>
          <Progress value={((currentStep + 1) / quizSteps.length) * 100} className="mb-4"/>
          <CardTitle className="text-center text-xl flex items-center justify-center gap-2">
             {currentStepInfo.icon} {currentStepInfo.title}
          </CardTitle>
          <CardDescription className="text-center">
             Langkah {currentStep + 1} dari {quizSteps.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-hidden min-h-[300px]">
          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {currentStepInfo.id === 'identitas' && (
                     <div className="space-y-6">
                        {currentStepInfo.fields.map(field => (
                           <FormField
                           key={field.name}
                           control={form.control}
                           name={field.name as keyof FormSchemaType}
                           render={({ field: formField }) => (
                             <FormItem>
                               <FormLabel className="text-base">{field.label}</FormLabel>
                               <FormControl>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3">{field.icon}</span>
                                    <Input
                                        type="text"
                                        {...formField}
                                        className="pl-10"
                                        placeholder={`Masukkan ${field.label.toLowerCase()}...`}
                                    />
                                </div>
                               </FormControl>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                        ))}
                     </div>
                  )}
                  {currentStepInfo.id === 'nilai' && (
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
                        {currentStepInfo.fields.map(field => (
                           <FormField
                           key={field.name}
                           control={form.control}
                           name={field.name as keyof FormSchemaType}
                           render={({ field: formField }) => (
                             <FormItem>
                               <FormLabel>{field.label}</FormLabel>
                               <FormControl>
                                 <Input
                                   type="number"
                                   min="0"
                                   max="100"
                                   {...formField}
                                   onChange={e => formField.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                                   placeholder="0-100"
                                 />
                               </FormControl>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                        ))}
                     </div>
                  )}
                  {currentStepInfo.type === 'radio' && (
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 text-blue-600">
                           {currentStepInfo.icon}
                        </div>
                        <FormField
                            control={form.control}
                            name={currentStepInfo.id as keyof FormSchemaType}
                            render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-lg font-semibold">{currentStepInfo.label}</FormLabel>
                                <FormControl className="mt-4">
                                <RadioGroup
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        setTimeout(handleNext, 300);
                                    }}
                                    value={field.value as string}
                                    className="flex justify-center items-center space-x-4 pt-4"
                                >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="ya" /></FormControl>
                                        <FormLabel className="font-normal text-base">Ya</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="tidak" /></FormControl>
                                        <FormLabel className="font-normal text-base">Tidak</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                                </FormControl>
                                <FormMessage className="text-center pt-2" />
                            </FormItem>
                            )}
                        />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

               {isSubmitting ? (
                 <div className="flex flex-col items-center justify-center min-h-[100px] mt-8">
                    <Loader className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="mt-4 text-muted-foreground">Menganalisis jawabanmu...</p>
                 </div>
               ) : (
                <div className="flex justify-between mt-8 pt-4 border-t">
                    <Button type="button" onClick={handlePrev} disabled={currentStep === 0 || isSubmitting} variant="outline" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Kembali
                    </Button>
                    
                    <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                        {currentStep === quizSteps.length - 1 ? (
                            <><ShieldCheck className="h-4 w-4 mr-2"/> Lihat Hasil</>
                        ) : "Lanjut"}
                    </Button>
                </div>
               )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}