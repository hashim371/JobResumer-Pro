"use client";

import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "@/lib/firebase";
import { ref, set, push, remove } from "firebase/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import type { ResumeData } from "@/app/resume/[id]/edit/page";

const workExperienceSchema = z.object({
  id: z.string().optional(),
  jobTitle: z.string().min(1, "Job title is required."),
  company: z.string().min(1, "Company is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string(),
  description: z.string(),
});

const educationSchema = z.object({
  id: z.string().optional(),
  degree: z.string().min(1, "Degree is required."),
  school: z.string().min(1, "School/University is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string(),
});

const resumeEditorSchema = z.object({
  name: z.string().min(3, "Resume name is required."),
  summary: z.string(),
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: z.string(),
});

type ResumeEditorFormValues = z.infer<typeof resumeEditorSchema>;

interface ResumeEditorProps {
  initialData: ResumeData;
  resumeId: string;
  userId: string;
}

export function ResumeEditor({ initialData, resumeId, userId }: ResumeEditorProps) {
  const { toast } = useToast();

  const form = useForm<ResumeEditorFormValues>({
    resolver: zodResolver(resumeEditorSchema),
    defaultValues: {
      name: initialData.name || "",
      summary: initialData.summary || "",
      workExperience: initialData.workExperience ? Object.values(initialData.workExperience) : [],
      education: initialData.education ? Object.values(initialData.education) : [],
      skills: initialData.skills?.join(", ") || "",
    },
  });
  
  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({ control: form.control, name: "workExperience" });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: "education" });

  const handleSave = async (data: ResumeEditorFormValues) => {
    try {
      const resumeRef = ref(db, `users/${userId}/resumes/${resumeId}`);
      
      const workExperienceForDb = data.workExperience.reduce((acc, work) => {
        const id = work.id || push(ref(db, `users/${userId}/resumes/${resumeId}/workExperience`)).key;
        if (id) {
          acc[id] = { ...work, id };
        }
        return acc;
      }, {} as any);

      const educationForDb = data.education.reduce((acc, edu) => {
        const id = edu.id || push(ref(db, `users/${userId}/resumes/${resumeId}/education`)).key;
        if (id) {
         acc[id] = { ...edu, id };
        }
        return acc;
      }, {} as any);

      await set(resumeRef, {
        ...initialData,
        name: data.name,
        summary: data.summary,
        workExperience: workExperienceForDb,
        education: educationForDb,
        skills: data.skills.split(",").map(s => s.trim()).filter(Boolean),
      });

      toast({ title: "Success!", description: "Your resume has been saved." });
    } catch (error) {
      console.error("Failed to save resume:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not save your resume." });
    }
  };
  
  const removeWorkExperience = (index: number) => {
    const workId = form.getValues(`workExperience.${index}.id`);
    if(workId) {
      remove(ref(db, `users/${userId}/resumes/${resumeId}/workExperience/${workId}`));
    }
    removeWork(index);
    toast({title: "Work Experience Removed"});
  }

  const removeEducation = (index: number) => {
    const eduId = form.getValues(`education.${index}.id`);
    if(eduId) {
      remove(ref(db, `users/${userId}/resumes/${resumeId}/education/${eduId}`));
    }
    removeEdu(index);
    toast({title: "Education Removed"});
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1 max-w-md">
                  <FormControl>
                    <Input {...field} className="text-2xl font-bold border-0 shadow-none focus-visible:ring-0 p-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>

        <Accordion type="multiple" defaultValue={["summary", "work", "education", "skills"]} className="w-full">
          {/* Professional Summary */}
          <AccordionItem value="summary">
            <AccordionTrigger className="text-xl font-semibold">Professional Summary</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Professional Bio</FormLabel>
                        <FormControl><Textarea rows={5} placeholder="Write a brief summary about your professional background..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          
          {/* Work Experience */}
          <AccordionItem value="work">
            <AccordionTrigger className="text-xl font-semibold">Work Experience</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {workFields.map((field, index) => (
                  <Card key={field.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Job #{index + 1}</CardTitle>
                        <CardDescription>Add your work experience details.</CardDescription>
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeWorkExperience(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FormField control={form.control} name={`workExperience.${index}.jobTitle`} render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="e.g. Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name={`workExperience.${index}.company`} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="e.g. Google" {...field} /></FormControl><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name={`workExperience.${index}.startDate`} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="text" placeholder="e.g. Jan 2022" {...field} /></FormControl><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name={`workExperience.${index}.endDate`} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="text" placeholder="e.g. Present" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                        <FormField control={form.control} name={`workExperience.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe your responsibilities and achievements..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                  </Card>
                ))}
                <Button type="button" variant="outline" onClick={() => appendWork({ jobTitle: "", company: "", startDate: "", endDate: "", description: "" })}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Work Experience
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Education */}
          <AccordionItem value="education">
            <AccordionTrigger className="text-xl font-semibold">Education</AccordionTrigger>
            <AccordionContent>
               <div className="space-y-4">
                {eduFields.map((field, index) => (
                  <Card key={field.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                       <div>
                        <CardTitle>Education #{index + 1}</CardTitle>
                        <CardDescription>Add your education details.</CardDescription>
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeEducation(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree/Certificate</FormLabel><FormControl><Input placeholder="e.g. B.S. in Computer Science" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`education.${index}.school`} render={({ field }) => (<FormItem><FormLabel>School/University</FormLabel><FormControl><Input placeholder="e.g. Stanford University" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`education.${index}.startDate`} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input placeholder="e.g. Sep 2018" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`education.${index}.endDate`} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input placeholder="e.g. May 2022" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                  </Card>
                ))}
                <Button type="button" variant="outline" onClick={() => appendEdu({ degree: "", school: "", startDate: "", endDate: "" })}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Skills */}
          <AccordionItem value="skills">
            <AccordionTrigger className="text-xl font-semibold">Skills</AccordionTrigger>
            <AccordionContent>
                <Card>
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Skills</FormLabel>
                        <FormControl><Input placeholder="e.g. React, Node.js, Python" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
}
