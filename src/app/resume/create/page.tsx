
"use client";

import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CreateResumePage() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');

  // In a real app, you'd fetch template details based on the ID
  // and render the appropriate editor.
  // For now, we just show a confirmation.

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto px-4 py-8 md:py-16 flex items-center justify-center min-h-[calc(100vh-250px)]">
          <div className="w-full max-w-2xl mx-auto animate-fadeIn">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Create Your Resume</CardTitle>
                <CardDescription className="text-md pt-2">
                  You've selected the <strong>{templateId}</strong> template.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <p className="text-muted-foreground">
                  This is where the resume editor for the '{templateId}' template would be.
                  We'll build out the full editor in the next steps.
                </p>
                
                <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" asChild>
                        <Link href="/templates">Choose a different template</Link>
                    </Button>
                     <Button size="lg">
                        Save and Continue
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
