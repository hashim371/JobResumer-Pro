"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase";
import { ref, onValue, off } from "firebase/database";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { ResumeEditor } from "@/components/ResumeEditor";

export interface ResumeData {
  name: string;
  createdAt: string;
  summary?: string;
  workExperience?: Record<string, WorkExperienceEntry>;
  education?: Record<string, EducationEntry>;
  skills?: string[];
}

export interface WorkExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
}

export default function EditResumePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const resumeId = params.id as string;
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth");
      return;
    }

    const resumeRef = ref(db, `users/${user.uid}/resumes/${resumeId}`);
    const listener = onValue(resumeRef, (snapshot) => {
      if (snapshot.exists()) {
        setResume(snapshot.val());
      } else {
        // Handle case where resume doesn't exist or user doesn't have access
        router.push("/");
      }
      setLoading(false);
    });

    return () => {
      off(resumeRef, "value", listener);
    };
  }, [user, authLoading, resumeId, router]);

  if (loading || authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!resume) {
    // This can be a more user-friendly "not found" component
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Resume Not Found</h1>
            <p className="text-muted-foreground">The resume you are looking for does not exist.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <ResumeEditor initialData={resume} resumeId={resumeId} userId={user.uid} />
        </div>
      </main>
      <Footer />
    </>
  );
}
