
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Loader2, Download, Edit, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumePreview } from '@/components/ResumePreview';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { createRoot } from 'react-dom/client';

export default function ResumeViewPage() {
    const { id: resumeId } = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [resumeData, setResumeData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);

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

    const downloadAs = async (format: 'pdf' | 'png') => {
        setIsDownloading(true);
    
        const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
            import('jspdf'),
            import('html2canvas'),
        ]);

        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.width = '8.5in';
        container.style.height = '11in';
        document.body.appendChild(container);
    
        const root = createRoot(container);
        root.render(<ResumePreview templateId={resumeData.templateId} data={resumeData} />);
        
        try {
            await document.fonts.ready;
        } catch (err) {
            console.warn('Fonts could not be loaded before download.', err);
        }
        
        setTimeout(async () => {
          try {
            const canvas = await html2canvas(container, {
              scale: 4, 
              useCORS: true,
              logging: false, // Disables logging for cleaner console
              width: container.offsetWidth,
              height: container.offsetHeight,
              windowWidth: container.scrollWidth,
              windowHeight: container.scrollHeight,
            });
    
            const imgData = canvas.toDataURL('image/png', 1.0);
            const fileName = `${resumeData?.personalInfo?.name || 'resume'}.${format}`;
    
            if (format === 'pdf') {
              const pdf = new jsPDF({
                  orientation: 'p',
                  unit: 'in',
                  format: 'letter'
              });
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();
              pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
              pdf.save(fileName);
            } else {
              const link = document.createElement('a');
              link.href = imgData;
              link.download = fileName;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
    
            toast({ title: 'Success', description: `Your resume has been downloaded as a ${format.toUpperCase()}.` });
          } catch (error) {
            console.error(`Error generating ${format}`, error);
            toast({ variant: 'destructive', title: 'Error', description: `Could not generate ${format.toUpperCase()}.` });
          } finally {
            document.body.removeChild(container);
            setIsDownloading(false);
          }
        }, 500); 
    };

    if (loading || authLoading) {
        return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
    }
    
    if (!resumeData) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/40 animate-fadeIn">
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
                        <Button onClick={() => downloadAs('png')} variant="outline" disabled={isDownloading}>
                            {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <ImageIcon className="mr-2 h-4 w-4" />}
                            Download PNG
                        </Button>
                        <Button onClick={() => downloadAs('pdf')} disabled={isDownloading}>
                            {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />}
                            Download PDF
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 py-8 flex items-start justify-center">
                 <div className="w-[8.5in] h-[11in] bg-white shadow-2xl">
                    <ResumePreview templateId={resumeData.templateId} data={resumeData} />
                </div>
            </main>
        </div>
    );
}

