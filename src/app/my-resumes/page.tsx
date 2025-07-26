
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Trash2, Edit, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResumePreview } from '@/components/ResumePreview';
import Link from 'next/link';
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
import { toast } from '@/hooks/use-toast';
import { templates } from '@/app/templates/page';

interface Resume {
  id: string;
  templateId: string;
  updatedAt: string;
  personalInfo: {
    name: string;
  };
}

export default function MyResumesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/auth');
      return;
    }

    const resumesRef = ref(db, `users/${user.uid}/resumes`);
    const unsubscribe = onValue(resumesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const resumeList = Object.values(data) as Resume[];
        setResumes(resumeList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
      } else {
        setResumes([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, authLoading, router]);

  const handleDelete = async (resumeId: string) => {
    if (!user) return;
    const resumeRef = ref(db, `users/${user.uid}/resumes/${resumeId}`);
    try {
      await remove(resumeRef);
      toast({ title: "Success", description: "Resume deleted successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete resume." });
    }
  };

  if (loading || authLoading) {
    return <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
            <h1 className="text-2xl font-bold">My Resumes</h1>
             <Button asChild className="ml-auto">
                <Link href="/templates"><Plus className="mr-2 h-4 w-4"/> New Resume</Link>
             </Button>
        </div>
      </header>
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {resumes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {resumes.map(resume => {
                 const template = templates.find(t => t.id === resume.templateId);
                 return (
                    <Card key={resume.id} className="group flex flex-col">
                        <CardContent className="p-0 relative aspect-[8.5/11] flex-shrink-0">
                           <div className="absolute inset-0 overflow-hidden rounded-t-lg bg-gray-100">
                                <div 
                                className="transform origin-top-left pointer-events-none bg-white"
                                style={{
                                    transform: 'scale(0.20)',
                                    width: '8.5in',
                                    height: '11in',
                                }}
                                >
                                <ResumePreview templateId={resume.templateId} data={resume} />
                                </div>
                            </div>
                        </CardContent>
                       <CardHeader className="flex-grow">
                          <CardTitle className="truncate">{resume.personalInfo?.name || "Untitled Resume"}</CardTitle>
                          <CardDescription>{template?.name || "Unknown"} Template</CardDescription>
                       </CardHeader>
                        <CardFooter className="flex justify-end gap-2">
                           <Button variant="outline" size="sm" asChild>
                              <Link href={`/resume/${resume.id}/edit`}><Edit className="mr-2 h-4 w-4" /> Edit</Link>
                           </Button>
                           <AlertDialog>
                              <AlertDialogTrigger asChild>
                                 <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                 <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                       This action cannot be undone. This will permanently delete your resume.
                                    </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(resume.id)}>Delete</AlertDialogAction>
                                 </AlertDialogFooter>
                              </AlertDialogContent>
                           </AlertDialog>
                        </CardFooter>
                    </Card>
                 )
              })}
            </div>
          ) : (
            <div className="text-center py-20 rounded-lg border-2 border-dashed border-gray-300">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-xl font-semibold">No Resumes Found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Get started by creating a new resume.</p>
                <div className="mt-6">
                    <Button asChild>
                        <Link href="/templates">
                        <Plus className="mr-2 h-4 w-4" /> Create New Resume
                        </Link>
                    </Button>
                </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
