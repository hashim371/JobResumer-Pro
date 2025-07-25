"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const templates = [
  { id: 'dublin', name: 'Dublin', category: 'Simple', image: 'https://placehold.co/400x565.png' },
  { id: 'tokyo', name: 'Tokyo', category: 'Two-column', image: 'https://placehold.co/400x565.png' },
  { id: 'new-york', name: 'New York', category: 'Simple', image: 'https://placehold.co/400x565.png' },
  { id: 'geneva', name: 'Geneva', category: 'Picture', image: 'https://placehold.co/400x565.png' },
  { id: 'sydney', name: 'Sydney', category: 'ATS', image: 'https://placehold.co/400x565.png' },
  { id: 'paris', name: 'Paris', category: 'Google Docs', image: 'https://placehold.co/400x565.png' },
  { id: 'london', name: 'London', category: 'Word', image: 'https://placehold.co/400x565.png' },
  { id: 'madrid', name: 'Madrid', category: 'Picture', image: 'https://placehold.co/400x565.png' },
];

const filters = ['All templates', 'Picture', 'Word', 'Simple', 'ATS', 'Two-column', 'Google Docs'];

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
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl font-bold tracking-tight font-headline">Choose Your Template</h1>
            <p className="mt-4 text-lg text-muted-foreground">Select a template to get started with your professional resume.</p>
          </div>

          <div className="flex justify-center mb-8 flex-wrap gap-2">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                className="rounded-full"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fadeIn">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0 relative">
                  <Image
                    src={template.image}
                    alt={template.name}
                    width={400}
                    height={565}
                    className="w-full h-auto object-cover"
                    data-ai-hint="resume professional"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <Button asChild>
                      <Link href={`/resume/create?template=${template.id}`}>Use this template</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
