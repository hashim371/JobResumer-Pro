"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase";
import { push, ref, set } from "firebase/database";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const resumeSchema = z.object({
  name: z.string().min(3, "Resume name must be at least 3 characters.").max(50, "Resume name is too long."),
});

export default function NewResumePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (values: z.infer<typeof resumeSchema>) => {
    if (!user) {
      toast({ variant: "destructive", title: "Not authenticated", description: "You must be logged in to create a resume." });
      return;
    }

    setIsSubmitting(true);
    try {
      const resumesRef = ref(db, `users/${user.uid}/resumes`);
      const newResumeRef = push(resumesRef);
      await set(newResumeRef, {
        name: values.name,
        createdAt: new Date().toISOString(),
      });
      toast({ title: "Resume Created!", description: "You can now start editing your new resume." });
      router.push(`/resume/${newResumeRef.key}/edit`);
    } catch (error) {
      console.error("Error creating resume:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to create resume. Please try again." });
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
  }
  
  if (!user) {
     router.push("/auth");
     return null;
  }

  return (
    <>
    <Header />
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        <Card className="w-full max-w-lg animate-fadeIn">
          <CardHeader>
            <CardTitle>Create a New Resume</CardTitle>
            <CardDescription>Give your new resume a name to get started. You can change this later.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'My Software Engineer Resume'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Resume
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
    <Footer />
    </>
  );
}
