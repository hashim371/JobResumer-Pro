
"use client";

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase';
import { ref, push, set } from 'firebase/database';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function CreateResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) {
      return; 
    }

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'You must be signed in to create a resume.',
      });
      router.push('/auth');
      return;
    }

    if (user && templateId) {
      const createResume = async () => {
        try {
          const resumesRef = ref(db, `users/${user.uid}/resumes`);
          const newResumeRef = push(resumesRef);
          
          const newResume = {
            id: newResumeRef.key,
            templateId: templateId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            personalInfo: {
              name: user.displayName || 'Your Name',
              role: 'Your Role (e.g. Software Engineer)',
              email: user.email || '',
              phone: '',
              location: '',
              website: '',
            },
            summary: 'A brief professional summary about yourself.',
            experience: [],
            education: [],
            skills: [],
          };
          
          await set(newResumeRef, newResume);
          
          toast({
            title: 'Resume Created!',
            description: `You can now edit your new resume using the ${templateId} template.`,
          });
          
          router.push(`/resume/${newResumeRef.key}/edit`);

        } catch (error) {
          console.error('Error creating resume:', error);
          toast({
            variant: 'destructive',
            title: 'Error creating resume',
            description: 'Could not create a new resume. Please try again.',
          });
          router.push('/templates');
        }
      };

      createResume();
    } else if (!templateId) {
        toast({
            variant: 'destructive',
            title: 'No Template Selected',
            description: 'Please select a template to continue.',
        });
        router.push('/templates');
    }

  }, [user, authLoading, templateId, router]);


  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Creating your resume...</p>
        </div>
    </div>
  );
}
