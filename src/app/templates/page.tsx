
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
        <div className={`flex items-center ${withPhoto ? 'justify-start' : 'justify-center'} mb-4`}>
            {withPhoto && <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>}
            <div className={withPhoto ? 'text-left' : 'text-center'}>
                <div className="w-24 h-4 bg-gray-400 mb-1"></div>
                <div className="w-16 h-3 bg-gray-300"></div>
            </div>
        </div>
    );

    const renderSection = (title: string, lines = 3) => (
        <div className="mb-3">
            <div className="w-20 h-3 bg-gray-500 mb-2"></div>
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} className={`h-2 mb-1 ${i % 2 === 0 ? 'w-full' : 'w-11/12'} bg-gray-300`}></div>
            ))}
        </div>
    );

    const renderExperience = () => (
         <div className="mb-3">
            <div className="w-20 h-3 bg-gray-500 mb-2"></div>
            <div className="w-16 h-2 bg-gray-400 mb-1"></div>
            {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className={`h-2 mb-1 ${i % 2 === 0 ? 'w-full' : 'w-11/12'} bg-gray-300`}></div>
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
                        <div className="h-full w-full bg-gray-100 p-2">
                            {renderSection("Skills", 4)}
                            {renderSection("Education", 2)}
                        </div>
                    </div>
                    <div className="w-2/3 pl-4">
                        <div className="w-32 h-4 bg-gray-400 mb-2"></div>
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
                    <hr className="my-2 border-gray-200"/>
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
                     <hr className="my-2 border-gray-200"/>
                    {renderSection("Professional Summary")}
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
                  <CardContent className="p-0 relative">
                    <div className="overflow-hidden rounded-t-lg bg-gray-100">
                        <div className="transform scale-[0.25] origin-top-left -translate-y-[282px] -translate-x-[200px] w-[800px] h-[1130px] flex items-center justify-center pointer-events-none">
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
