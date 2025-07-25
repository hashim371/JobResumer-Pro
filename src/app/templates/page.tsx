
"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const templates = [
  { id: 'dublin', name: 'Dublin', category: 'Simple', image: 'https://placehold.co/400x565.png' },
  { id: 'tokyo', name: 'Tokyo', category: 'Two-column', image: 'https://placehold.co/400x565.png' },
  { id: 'new-york', name: 'New York', category: 'Simple', image: 'https://placehold.co/400x565.png' },
  { id: 'geneva', name: 'Geneva', category: 'Picture', image: 'https://placehold.co/400x565.png' },
  { id: 'sydney', name: 'Sydney', category: 'ATS', image: 'https://placehold.co/400x565.png' },
  { id: 'paris', name: 'Paris', category: 'Google Docs', image: 'https://placehold.co/400x565.png' },
  { id: 'london', name: 'London', category: 'Word', image: 'https://placehold.co/400x565.png' },
  { id: 'madrid', name: 'Madrid', category: 'Picture', image: 'https://placehold.co/400x565.png' },
  { id: 'berlin', name: 'Berlin', category: 'Two-column', image: 'https://placehold.co/400x565.png' },
  { id: 'moscow', name: 'Moscow', category: 'Simple', image: 'https://placehold.co/400x565.png' },
  { id: 'cairo', name: 'Cairo', category: 'ATS', image: 'https://placehold.co/400x565.png' },
  { id: 'seoul', name: 'Seoul', category: 'Picture', image: 'https://placehold.co/400x565.png' },
];

const filters = ['All templates', 'Simple', 'Two-column', 'Picture', 'ATS', 'Google Docs', 'Word'];

export default function TemplatesPage() {
  const [activeFilter, setActiveFilter] = useState('All templates');

  const filteredTemplates = templates.filter(template => {
    if (activeFilter === 'All templates') return true;
    return template.category === activeFilter;
  });

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Choose Your Perfect Template</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Select from our professionally designed resume templates to create a standout application in minutes.</p>
          </div>

          <div className="flex justify-center mb-10 flex-wrap gap-2 animate-fadeIn">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                className="rounded-full px-6 transition-all duration-300 ease-in-out"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fadeIn">
            {filteredTemplates.map(template => (
              <Link key={template.id} href={`/resume/create?template=${template.id}`} className="block">
                <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border-transparent hover:border-accent">
                  <CardContent className="p-0 relative">
                    <div className="overflow-hidden rounded-t-lg">
                      <Image
                        src={template.image}
                        alt={`${template.name} resume template`}
                        width={400}
                        height={565}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        data-ai-hint="resume professional"
                      />
                    </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                        <div className="text-center">
                           <Button asChild className="rounded-full bg-white/90 text-gray-900 font-semibold hover:bg-white">
                            <span>Use Template <ArrowRight className="ml-2 h-4 w-4"/></span>
                          </Button>
                        </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 bg-card flex flex-col items-start">
                      <h3 className="font-semibold text-lg text-card-foreground">{template.name}</h3>
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
