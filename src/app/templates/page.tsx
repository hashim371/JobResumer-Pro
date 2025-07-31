
"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { ResumePreview } from '@/components/ResumePreview';
import { getTemplates, Template } from '@/lib/template-store';

export const templates: Template[] = [
  { id: 'dublin', name: 'Dublin', category: 'Simple' },
  { id: 'new-york', name: 'New York', category: 'Simple' },
  { id: 'geneva', name: 'Geneva', category: 'Creative' },
  { id: 'sydney', name: 'Sydney', category: 'ATS' },
  { id: 'paris', name: 'Paris', category: 'Classic' },
  { id: 'london', name: 'London', category: 'Modern' },
  { id: 'madrid', name: 'Madrid', category: 'Creative' },
  { id: 'berlin', name: 'Berlin', category: 'Two-column' },
  { id: 'moscow', name: 'Moscow', category: 'Simple' },
  { id: 'cairo', name: 'Cairo', category: 'ATS' },
  { id: 'seoul', name: 'Seoul', category: 'Creative' },
  { id: 'tokyo', name: 'Tokyo', category: 'Modern' },
  { id: 'rome', name: 'Rome', category: 'Classic' },
  { id: 'vienna', name: 'Vienna', category: 'Classic' },
  { id: 'amsterdam', name: 'Amsterdam', category: 'Two-column' },
  { id: 'stockholm', name: 'Stockholm', category: 'Modern' },
  { id: 'athens', name: 'Athens', category: 'Classic' },
  { id: 'helsinki', name: 'Helsinki', category: 'Modern' },
  { id: 'oslo', name: 'Oslo', category: 'Two-column' },
  { id: 'lisbon', name: 'Lisbon', category: 'Simple' },
  { id: 'copenhagen', name: 'Copenhagen', category: 'Simple' },
  { id: 'prague', name: 'Prague', category: 'Simple' },
  { id: 'warsaw', name: 'Warsaw', category: 'Simple' },
  { id: 'singapore', name: 'Singapore', category: 'Modern' },
  { id: 'kyoto', name: 'Kyoto', category: 'Elegant' },
  { id: 'dubai', name: 'Dubai', category: 'Bold' },
  { id: 'toronto', name: 'Toronto', category: 'Professional' },
  { id: 'mumbai', name: 'Mumbai', category: 'Creative' },
  { id: 'rio', name: 'Rio', category: 'Dynamic' },
  { id: 'zurich', name: 'Zurich', category: 'Minimalist' },
  { id: 'istanbul', name: 'Istanbul', category: 'Classic' },
  { id: 'shanghai', name: 'Shanghai', category: 'Modern' },
  { id: 'mexico-city', name: 'Mexico City', category: 'Artistic' },
];

export default function TemplatesPage() {
  const [activeFilter, setActiveFilter] = useState('All templates');
  const [currentTemplates, setCurrentTemplates] = useState<Template[]>([]);

  useEffect(() => {
    setCurrentTemplates(getTemplates());
  }, []);

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
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredTemplates.map(template => (
              <Link key={template.id} href={`/resume/create?template=${template.id}`} className="block group">
                <Card className="overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:border-primary transform hover:-translate-y-1">
                 <CardContent className="p-0 relative aspect-[8.5/11] w-full bg-background overflow-hidden">
                    <div
                      className="absolute inset-0 transform scale-[0.20] origin-top-left transition-transform duration-300 ease-in-out group-hover:scale-[0.21]"
                      style={{width: '500%', height: '500%'}}
                    >
                      <ResumePreview templateId={template.id} />
                    </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4">
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
