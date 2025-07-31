
"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { getTemplates } from '@/lib/template-store';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ResumePreview = dynamic(() => import('@/components/ResumePreview').then(mod => mod.ResumePreview), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

export default function TemplatesPage() {
  const searchParams = useSearchParams();
  const currentTemplates = getTemplates();
  const activeFilter = searchParams.get('filter') || 'All templates';

  const filters = ['All templates', ...Array.from(new Set(currentTemplates.map(t => t.category)))];

  const filteredTemplates = currentTemplates.filter(template => {
    if (activeFilter === 'All templates') return true;
    return template.category === activeFilter;
  });

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20 animate-fadeIn">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Choose Your Perfect Template</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Select from our professionally designed resume templates to create a standout application in minutes.</p>
          </div>

          <div className="flex justify-center mb-10 flex-wrap gap-2">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                className="rounded-full px-6 transition-colors duration-200"
                asChild
              >
                <Link href={filter === 'All templates' ? '/templates' : `?filter=${filter}`}>{filter}</Link>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredTemplates.map(template => (
              <Link key={template.id} href={`/resume/create?template=${template.id}`} className="block group">
                <Card className="overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:border-primary transform hover:-translate-y-2">
                 <CardContent className="p-0 relative aspect-[8.5/11] w-full bg-background overflow-hidden">
                    <ResumePreview templateId={template.id} isClickable={false} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                        <div className="text-center">
                           <Button asChild className="rounded-full bg-white/90 text-gray-900 font-semibold hover:bg-white shadow-md">
                            <span>Use Template <ArrowRight className="ml-2 h-4 w-4"/></span>
                          </Button>
                        </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 bg-card flex flex-col items-start">
                      <h3 className="font-semibold text-lg text-card-foreground font-headline">{template.name}</h3>
                      <Badge variant="secondary" className="mt-2">{template.category}</Badge>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
