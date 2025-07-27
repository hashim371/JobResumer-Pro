
"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Loader2, Download, Edit, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumePreview } from '@/components/ResumePreview';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResumeViewPage() {
    const { id: resumeId } = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [resumeData, setResumeData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const previewRef = useRef<HTMLDivElement>(null);

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
                setResumeData(snapshot.val());
            } else {
                toast({ variant: 'destructive', title: 'Error', description: 'Resume not found.' });
                router.push('/my-resumes');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, authLoading, resumeId, router]);

    const handleDownload = () => {
        const input = previewRef.current;
        if (!input) return;

        const originalWidth = input.style.width;
        input.style.width = '8.5in';

        html2canvas(input, {
            scale: 4,
            useCORS: true,
            logging: true,
            windowWidth: input.scrollWidth,
            windowHeight: input.scrollHeight,
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'in',
                format: [8.5, 11]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, 8.5, 11);
            pdf.save(`${resumeData?.personalInfo?.name || 'resume'}.pdf`);
            
            input.style.width = originalWidth;
            toast({ title: 'Success', description: 'Your resume has been downloaded.' });
        }).catch(error => {
            console.error("Error generating PDF", error);
            input.style.width = originalWidth;
            toast({ variant: 'destructive', title: 'Error', description: 'Could not generate PDF.' });
        });
    };

    const handleDownloadImage = () => {
        const input = previewRef.current;
        if (!input) return;

        const originalWidth = input.style.width;
        input.style.width = '8.5in';

        html2canvas(input, {
          scale: 4,
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
    
            input.style.width = originalWidth;
            toast({ title: 'Success', description: 'Your resume has been downloaded as an image.' });
          })
          .catch((error) => {
            console.error('Error generating Image', error);
            input.style.width = originalWidth;
            toast({ variant: 'destructive', title: 'Error', description: 'Could not generate image.' });
          });
      };

    if (loading || authLoading) {
        return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
    }
    
    if (!resumeData) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/40">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                    <Button variant="ghost" asChild>
                        <Link href="/my-resumes" className="flex items-center"><ArrowLeft className="mr-2 h-4 w-4" /> Back to My Resumes</Link>
                    </Button>
                    <div className="flex-1" />
                    <div className="flex items-center gap-4">
                        <Button variant="outline" asChild>
                            <Link href={`/resume/${resumeId}/edit`}><Edit className="mr-2 h-4 w-4"/> Edit</Link>
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

            <main className="flex-1 py-8 flex items-center justify-center">
                 <div 
                    ref={previewRef}
                    className="w-[8.5in] h-[11in] bg-white shadow-2xl"
                    >
                    <ResumePreview templateId={resumeData.templateId} data={resumeData} />
                </div>
            </main>
        </div>
    );
}
