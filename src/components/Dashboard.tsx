"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase";
import { ref, onValue, off, remove } from "firebase/database";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, Trash2, Edit, FileText, Briefcase, GraduationCap, Star } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Resume {
  id: string;
  name: string;
  createdAt: string;
  summary?: string;
}

export function Dashboard() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const resumesRef = ref(db, `users/${user.uid}/resumes`);
    const listener = onValue(resumesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const resumeList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setResumes(resumeList);
      } else {
        setResumes([]);
      }
      setLoading(false);
    }, (error) => {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Failed to load resumes." });
      setLoading(false);
    });

    return () => {
      off(resumesRef, "value", listener);
    };
  }, [user, toast]);

  const deleteResume = async (resumeId: string) => {
    if (!user) return;
    try {
      const resumeRef = ref(db, `users/${user.uid}/resumes/${resumeId}`);
      await remove(resumeRef);
      toast({ title: "Success", description: "Resume deleted successfully." });
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to delete resume." });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Your Resumes</h1>
        <Button asChild>
          <Link href="/new-resume">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Resume
          </Link>
        </Button>
      </div>
      
      {resumes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map(resume => (
            <Card key={resume.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-primary" />
                  <span className="truncate">{resume.name}</span>
                </CardTitle>
                <CardDescription>
                  Created on {new Date(resume.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <p className="text-sm text-muted-foreground line-clamp-3">
                  {resume.summary || "No summary available. Add one to make your resume stand out!"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                 <Button variant="ghost" size="icon" asChild>
                   <Link href={`/resume/${resume.id}/edit`}><Edit className="h-4 w-4" /></Link>
                 </Button>
                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your resume.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteResume(resume.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-16">
          <CardContent>
            <h3 className="text-xl font-semibold">No Resumes Yet</h3>
            <p className="text-muted-foreground mt-2">Click the button above to create your first resume!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
