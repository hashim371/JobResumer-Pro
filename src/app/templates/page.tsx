
"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const templates = [
  { id: 'dublin', name: 'Dublin', category: 'Simple' },
  { id: 'tokyo', name: 'Tokyo', category: 'Two-column' },
  { id: 'new-york', name: 'New York', category: 'Simple' },
  { id: 'geneva', name: 'Geneva', category: 'Picture' },
  { id: 'sydney', name: 'Sydney', category: 'ATS' },
  { id: 'paris', name: 'Paris', category: 'Google Docs' },
  { id: 'london', name: 'London', category: 'Word' },
  { id: 'madrid', name: 'Madrid', category: 'Picture' },
  { id: 'berlin', name: 'Berlin', category: 'Two-column' },
  { id: 'moscow', name: 'Moscow', category: 'Simple' },
  { id: 'cairo', name: 'Cairo', category: 'ATS' },
  { id: 'seoul', name: 'Seoul', category: 'Picture' },
];

const filters = ['All templates', 'Simple', 'Two-column', 'Picture', 'ATS', 'Google Docs', 'Word'];

const ResumePreview = ({ templateId }: { templateId: string }) => {
    const baseClasses = "bg-white text-gray-800 p-4 w-[400px] h-[565px] text-[8px] leading-tight flex flex-col font-sans";

    const renderHeader = (withPhoto = false) => (
        <div className={`flex items-center ${withPhoto ? 'justify-start' : 'justify-center'} mb-4 border-b border-gray-200 pb-2`}>
            {withPhoto && <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 shrink-0"></div>}
            <div className={withPhoto ? 'text-left' : 'text-center'}>
                <div className="font-bold text-[12px] text-gray-700">JOHN DOE</div>
                <div className="text-gray-500">Software Engineer</div>
            </div>
        </div>
    );

    const renderSection = (title: string, lines = 3) => (
        <div className="mb-3">
            <div className="font-bold text-gray-600 border-b border-gray-200 pb-1 mb-1 text-[9px] uppercase tracking-wider">{title}</div>
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} className={`h-1.5 mb-1 rounded-sm ${i % 2 === 0 ? 'w-full' : 'w-11/12'} bg-gray-200`}></div>
            ))}
        </div>
    );

    const renderExperience = () => (
         <div className="mb-3">
            <div className="font-bold text-[9px] text-gray-700">Awesome Company</div>
            <div className="text-gray-500 text-[7px] mb-1">Senior Developer | 2020 - Present</div>
            {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className={`h-1.5 mb-1 rounded-sm ${i % 2 === 0 ? 'w-full' : 'w-11/12'} bg-gray-200`}></div>
            ))}
        </div>
    );


    switch (templateId) {
        case 'tokyo':
        case 'berlin':
            return (
                 <div className={`${baseClasses} flex-row`}>
                    <div className="w-1/3 pr-4 border-r border-gray-200">
                        {renderHeader(true)}
                        <div className="pt-2">
                            {renderSection("Skills", 4)}
                            {renderSection("Education", 2)}
                        </div>
                    </div>
                    <div className="w-2/3 pl-4">
                        <div className="font-bold text-gray-600 border-b border-gray-200 pb-1 mb-2 text-[9px] uppercase tracking-wider">Work Experience</div>
                        {renderExperience()}
                        {renderExperience()}
                    </div>
                </div>
            )
        case 'geneva':
        case 'madrid':
        case 'seoul':
             return (
                <div className={`${baseClasses}`}>
                    {renderHeader(true)}
                    {renderSection("Professional Summary")}
                    {renderExperience()}
                    {renderExperience()}
                    {renderSection("Education")}
                </div>
            )
        default: // Simple, ATS, Word, Google Docs
            return (
                 <div className={`${baseClasses}`}>
                    {renderHeader(false)}
                    {renderSection("Professional Summary")}
                    <div className="font-bold text-gray-600 border-b border-gray-200 pb-1 mb-2 text-[9px] uppercase tracking-wider">Work Experience</div>
                    {renderExperience()}
                    {renderExperience()}
                    {renderSection("Skills")}
                    {renderSection("Education")}
                </div>
            )
    }
}


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
                  <CardContent className="p-0 relative h-96">
                    <div className="overflow-hidden rounded-t-lg bg-gray-100 h-full">
                        <div className="transform scale-[0.4] origin-top-left pointer-events-none">
                            <div className="shadow-2xl">
                               <ResumePreview templateId={template.id} />
                            </div>
                        </div>
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
