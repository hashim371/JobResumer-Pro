
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Trash2, Edit, FileText, Eye } from 'lucide-react';
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
        const resumeList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })) as Resume[];
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
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
            <h1 className="text-2xl font-bold font-headline">My Resumes</h1>
             <Button asChild className="ml-auto">
                <Link href="/templates"><Plus className="mr-2 h-4 w-4"/> New Resume</Link>
             </Button>
        </div>
      </header>
      <main className="flex-1 bg-muted/20 animate-fadeIn">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {resumes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {resumes.map(resume => {
                 const template = templates.find(t => t.id === resume.templateId);
                 return (
                    <Card key={resume.id} className="group flex flex-col overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:border-primary transform hover:-translate-y-1">
                      <Link href={`/resume/${resume.id}`} className="block overflow-hidden">
                         <CardContent className="p-0 relative aspect-[8.5/11] w-full bg-background overflow-hidden">
                           <div
                              className="absolute inset-0 transform scale-[0.20] origin-top-left transition-transform duration-300 ease-in-out group-hover:scale-[0.21]"
                              style={{width: '500%', height: '500%'}}
                            >
                              <ResumePreview templateId={resume.templateId} data={resume} />
                            </div>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Eye className="h-12 w-12 text-white" />
                            </div>
                        </CardContent>
                       </Link>
                       <CardHeader className="flex-grow p-4">
                          <CardTitle className="truncate text-lg">{resume.personalInfo?.name || "Untitled Resume"}</CardTitle>
                          <CardDescription>{template?.name || "Unknown"} Template</CardDescription>
                       </CardHeader>
                        <CardFooter className="flex justify-end gap-2 p-4 pt-0">
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
            <div className="text-center py-20 rounded-lg border-2 border-dashed border-muted-foreground/30 animate-fadeIn">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/80" />
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
