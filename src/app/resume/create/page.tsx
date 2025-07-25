
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
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-2xl mx-auto animate-fadeIn">
            <Card>
              <CardHeader>
                <CardTitle>Create Your Resume</CardTitle>
                <CardDescription>
                  You've selected the <strong>{templateId}</strong> template.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>
                  This is where the resume editor for the '{templateId}' template would be.
                  We'll build out the full editor in the next steps.
                </p>
                <div>
                    {/* Placeholder for the form */}
                </div>
                <div className="flex justify-between">
                    <Button variant="outline" asChild>
                        <Link href="/templates">Choose a different template</Link>
                    </Button>
                     <Button>
                        Save and Continue
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
