
"use client";

import { useEffect, useState, useRef, use } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase';
import { ref, onValue, update } from 'firebase/database';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, PlusCircle, Trash2, Download, ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';
import { ResumePreview } from '@/components/ResumePreview';
import { templates } from '@/app/templates/page';
import Link from 'next/link';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const experienceSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string(),
  description: z.string(),
});

const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  school: z.string().min(1, 'School is required'),
  graduationDate: z.string().min(1, 'Graduation date is required'),
});

const skillSchema = z.object({
  name: z.string().min(1, 'Skill is required'),
});

const resumeSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string(),
    email: z.string().email(),
    phone: z.string(),
    location: z.string(),
    website: z.string().url().optional().or(z.literal('')),
  }),
  summary: z.string(),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
});

type ResumeData = z.infer<typeof resumeSchema>;

export default function ResumeEditPage() {
  const router = useRouter();
  const { id: resumeId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: { name: '', role: '', email: '', phone: '', location: '', website: '' },
      summary: '',
      experience: [],
      education: [],
      skills: [],
    },
  });
  
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control: form.control, name: 'experience' });
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control: form.control, name: 'education' });
  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: 'skills' });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/auth');
      return;
    }
    if (!resumeId) return;

    const resumeRef = ref(db, `users/${user.uid}/resumes/${resumeId}`);
    const unsubscribe = onValue(resumeRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setResumeData(data);
        const formData = {
          ...data,
          personalInfo: {
            ...data.personalInfo,
            role: data.personalInfo.role ?? '',
          },
          experience: data.experience?.map((exp: any) => ({
            jobTitle: exp.jobTitle ?? '',
            company: exp.company ?? '',
            startDate: exp.startDate ?? '',
            endDate: exp.endDate ?? '',
            description: exp.description ?? '',
          })) || [],
           education: data.education?.map((edu: any) => ({
            degree: edu.degree ?? '',
            school: edu.school ?? '',
            graduationDate: edu.graduationDate ?? '',
          })) || [],
           skills: data.skills?.map((skill: any) => ({
            name: skill.name ?? '',
          })) || [],
        };
        form.reset(formData);
      } else {
        toast({ variant: 'destructive', title: 'Error', description: 'Resume not found.' });
        router.push('/templates');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, authLoading, resumeId, router, form]);
  
  const watchedData = form.watch();

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
        const updates = { ...watchedData, updatedAt: new Date().toISOString() };
        await update(ref(db, `users/${user.uid}/resumes/${resumeId as string}`), updates);
        toast({ title: 'Saved!', description: 'Your resume has been updated.' });
    } catch (err: any) {
        toast({ variant: 'destructive', title: 'Save Error', description: err.message });
    } finally {
        setIsSaving(false);
    }
  };


  const handleDownload = () => {
    const input = previewRef.current;
    if (!input) return;

    const originalScale = input.style.transform;
    const originalWidth = input.style.width;

    // Reset styles for capture
    input.style.transform = 'scale(1)';
    input.style.width = '8.5in'; // Standard US Letter width

    html2canvas(input, {
        scale: 4, // Higher scale for better quality
        useCORS: true,
        logging: true,
        windowWidth: input.scrollWidth,
        windowHeight: input.scrollHeight,
    })
    .then(canvas => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'in',
            format: 'letter'
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;

        let finalWidth = pdfWidth;
        let finalHeight = finalWidth / ratio;

        if (finalHeight > pdfHeight) {
            finalHeight = pdfHeight;
            finalWidth = finalHeight * ratio;
        }

        const x = (pdfWidth - finalWidth) / 2;
        const y = 0;

        pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
        pdf.save(`${resumeData?.personalInfo?.name || 'resume'}.pdf`);

        // Restore styles
        input.style.transform = originalScale;
        input.style.width = originalWidth;

        toast({ title: 'Success', description: 'Your resume has been downloaded.' });
    })
    .catch(error => {
        console.error("Error generating PDF", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not generate PDF.' });
        
        // Restore styles
        input.style.transform = originalScale;
        input.style.width = originalWidth;
    });
  };

  const handleDownloadImage = () => {
    const input = previewRef.current;
    if (!input) return;

    const originalScale = input.style.transform;
    const originalWidth = input.style.width;

    // Reset styles for capture
    input.style.transform = 'scale(1)';
    input.style.width = '8.5in'; // Standard US Letter width

    html2canvas(input, {
      scale: 4, // Higher scale for better quality
      useCORS: true,
      logging: true,
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0);

        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${resumeData?.personalInfo?.name || 'resume'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Restore styles
        input.style.transform = originalScale;
        input.style.width = originalWidth;

        toast({ title: 'Success', description: 'Your resume has been downloaded as an image.' });
      })
      .catch((error) => {
        console.error('Error generating Image', error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not generate image.' });

        // Restore styles
        input.style.transform = originalScale;
        input.style.width = originalWidth;
      });
  };

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
  }
  
  if (!resumeData) {
      return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
            <Button variant="ghost" asChild>
                <Link href="/my-resumes" className="flex items-center"><ArrowLeft className="mr-2 h-4 w-4"/> Back to My Resumes</Link>
            </Button>
            <div className="flex-1 text-center font-semibold">
                Editing: {templates.find(t => t.id === resumeData.templateId)?.name || 'Resume'}
            </div>
            <div className="flex items-center gap-4">
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4" />}
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button onClick={handleDownloadImage} variant="outline">
                    <ImageIcon className="mr-2 h-4 w-4" /> Download Image
                </Button>
                 <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
            </div>
        </div>
      </header>

      <main className="flex-1 grid md:grid-cols-2 gap-8 p-4 md:p-8 bg-muted/20">
        {/* Editor Form */}
        <div className="h-full overflow-y-auto pr-4">
          <Card className="shadow-none border-none bg-transparent">
             <CardContent className="p-0">
               <Form {...form}>
                 <form className="space-y-6">
                    <Accordion type="multiple" defaultValue={['personal', 'summary', 'experience']} className="w-full">
                        {/* Personal Info */}
                        <AccordionItem value="personal">
                            <AccordionTrigger className="text-xl font-bold">Personal Information</AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                                <FormField name="personalInfo.name" control={form.control} render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField name="personalInfo.role" control={form.control} render={({ field }) => (<FormItem><FormLabel>Role (e.g., Software Engineer)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField name="personalInfo.email" control={form.control} render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField name="personalInfo.phone" control={form.control} render={({ field }) => (<FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField name="personalInfo.location" control={form.control} render={({ field }) => (<FormItem><FormLabel>Location (e.g., City, State)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField name="personalInfo.website" control={form.control} render={({ field }) => (<FormItem><FormLabel>Website/Portfolio</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </AccordionContent>
                        </AccordionItem>
                        
                        {/* Professional Summary */}
                         <AccordionItem value="summary">
                            <AccordionTrigger className="text-xl font-bold">Professional Summary</AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                                 <FormField name="summary" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel>Summary</FormLabel>
                                        </div>
                                        <FormControl><Textarea rows={5} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                 )} />
                            </AccordionContent>
                        </AccordionItem>

                        {/* Work Experience */}
                        <AccordionItem value="experience">
                            <AccordionTrigger className="text-xl font-bold">Work Experience</AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                                {experienceFields.map((field, index) => (
                                    <Card key={field.id} className="p-4 relative">
                                        <div className="space-y-4">
                                            <FormField name={`experience.${index}.jobTitle`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField name={`experience.${index}.company`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <div className="grid grid-cols-2 gap-4">
                                               <FormField name={`experience.${index}.startDate`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input {...field} placeholder="e.g., Jan 2020" /></FormControl><FormMessage /></FormItem>)} />
                                               <FormField name={`experience.${index}.endDate`} control={form.control} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input {...field} placeholder="e.g., Present" /></FormControl><FormMessage /></FormItem>)} />
                                            </div>
                                            <FormField name={`experience.${index}.description`} control={form.control} render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel>Description</FormLabel>
                                                    </div>
                                                    <FormControl><Textarea {...field} placeholder="Describe your responsibilities and achievements." /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4" /></Button>
                                    </Card>
                                ))}
                                <Button type="button" variant="outline" onClick={() => appendExperience({ jobTitle: '', company: '', startDate: '', endDate: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4"/> Add Experience</Button>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Education */}
                        <AccordionItem value="education">
                             <AccordionTrigger className="text-xl font-bold">Education</AccordionTrigger>
                             <AccordionContent className="space-y-4 pt-4">
                                {educationFields.map((field, index) => (
                                     <Card key={field.id} className="p-4 relative">
                                        <div className="space-y-4">
                                            <FormField name={`education.${index}.degree`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Degree/Certificate</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField name={`education.${index}.school`} control={form.control} render={({ field }) => (<FormItem><FormLabel>School/University</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField name={`education.${index}.graduationDate`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Graduation Date</FormLabel><FormControl><Input {...field} placeholder="e.g., May 2019" /></FormControl><FormMessage /></FormItem>)} />
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeEducation(index)}><Trash2 className="h-4 w-4" /></Button>
                                    </Card>
                                ))}
                                <Button type="button" variant="outline" onClick={() => appendEducation({ degree: '', school: '', graduationDate: '' })}><PlusCircle className="mr-2 h-4 w-4"/> Add Education</Button>
                             </AccordionContent>
                        </AccordionItem>
                        
                        {/* Skills */}
                        <AccordionItem value="skills">
                             <AccordionTrigger className="text-xl font-bold">Skills</AccordionTrigger>
                             <AccordionContent className="space-y-4 pt-4">
                                {skillsFields.map((field, index) => (
                                     <Card key={field.id} className="p-2 relative flex items-center">
                                        <div className="flex-1">
                                             <FormField name={`skills.${index}.name`} control={form.control} render={({ field }) => (<FormItem><FormControl><Input {...field} placeholder="e.g., React" className="border-none shadow-none focus-visible:ring-0" /></FormControl><FormMessage /></FormItem>)} />
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4" /></Button>
                                    </Card>
                                ))}
                                <Button type="button" variant="outline" onClick={() => appendSkill({ name: '' })}><PlusCircle className="mr-2 h-4 w-4"/> Add Skill</Button>
                             </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                 </form>
               </Form>
             </CardContent>
          </Card>
        </div>
        
        {/* Resume Preview */}
        <div className="h-full flex items-start justify-center overflow-hidden">
            <div 
              ref={previewRef}
              className="w-full bg-white shadow-lg"
              style={{
                transform: 'scale(0.8)',
                transformOrigin: 'top center',
                width: '8.5in',
                minHeight: '11in',
              }}
            >
              <ResumePreview templateId={resumeData.templateId} data={watchedData} />
            </div>
        </div>
      </main>
    </div>
  );
}
