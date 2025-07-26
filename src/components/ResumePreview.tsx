
"use client";

import React from 'react';

// A mock data structure if no data is provided
const mockData = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '123-456-7890',
    location: 'New York, NY',
    website: 'johndoe.com',
  },
  summary: 'Dedicated and results-oriented Software Engineer with 5+ years of experience in developing, testing, and maintaining web applications. Proficient in JavaScript, React, and Node.js. Seeking to leverage my skills to contribute to a dynamic team.',
  experience: [
    { jobTitle: 'Senior Software Engineer', company: 'Tech Corp', startDate: 'Jan 2020', endDate: 'Present', description: 'Developed and maintained client-side features for a large-scale e-commerce platform using React and Redux.' },
    { jobTitle: 'Software Engineer', company: 'Innovate LLC', startDate: 'Jun 2017', endDate: 'Dec 2019', description: 'Collaborated with a team of developers to build and deploy a new SaaS product.' },
  ],
  education: [
    { degree: 'B.S. in Computer Science', school: 'State University', graduationDate: 'May 2017' },
  ],
  skills: [
    { name: 'JavaScript' },
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'TypeScript' },
    { name: 'HTML & CSS' },
  ],
};


interface ResumePreviewProps {
  templateId: string;
  data?: any;
}

export const ResumePreview = ({ templateId, data: initialData }: ResumePreviewProps) => {
  const data = initialData && initialData.personalInfo && initialData.personalInfo.name ? initialData : mockData;
  const { personalInfo, summary, experience, education, skills } = data;

  // Different Template Layouts
  switch (templateId) {
    case 'tokyo':
    case 'berlin':
       // Redesigned premium two-column layout
       return (
        <div className="font-sans bg-white min-h-full text-sm leading-relaxed text-gray-800 p-8 flex gap-8">
            {/* Main Content (Left Column) */}
            <div className="w-2/3">
                <header className="mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 tracking-tight break-words">{personalInfo?.name}</h1>
                    <p className="text-xl text-blue-700 font-medium mt-1">Software Engineer</p>
                </header>
                
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider border-b-2 border-blue-200 pb-2 mb-3">About Me</h2>
                    <p className="text-sm text-gray-700 break-words">{summary}</p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider border-b-2 border-blue-200 pb-2 mb-3">Experience</h2>
                    {experience?.map((exp: any, i:number) => (
                        <div key={i} className="mb-4 break-inside-avoid">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-md font-semibold text-gray-800 break-words">{exp.jobTitle}</h3>
                                <p className="text-xs text-gray-500 font-medium whitespace-nowrap pl-4">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <h4 className="text-sm font-medium text-gray-600 break-words">{exp.company}</h4>
                            <p className="text-sm text-gray-700 mt-1 break-words">{exp.description}</p>
                        </div>
                    ))}
                </section>
                
                <section>
                    <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider border-b-2 border-blue-200 pb-2 mb-3">Education</h2>
                    {education?.map((edu:any, i:number) => (
                        <div key={i} className="mb-3">
                            <h3 className="text-md font-semibold text-gray-800 break-words">{edu.degree}</h3>
                            <p className="text-sm text-gray-700 break-words">{edu.school}</p>
                            <p className="text-xs text-gray-500 font-medium">{edu.graduationDate}</p>
                        </div>
                    ))}
                </section>
            </div>
            
            {/* Sidebar (Right Column) */}
            <div className="w-1/3 pl-8 border-l-2 border-gray-100">
                 <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider pb-2 mb-3">Contact</h2>
                    <div className="space-y-2 text-sm">
                        {personalInfo?.email && <p className="flex items-center gap-2 break-all"><span>📧</span> {personalInfo.email}</p>}
                        {personalInfo?.phone && <p className="flex items-center gap-2 break-all"><span>📞</span> {personalInfo.phone}</p>}
                        {personalInfo?.location && <p className="flex items-center gap-2 break-all"><span>📍</span> {personalInfo.location}</p>}
                        {personalInfo?.website && <p className="flex items-center gap-2 break-all"><span>🌐</span> {personalInfo.website}</p>}
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider pb-2 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills?.map((skill: any) => (
                            <span key={skill.name} className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">{skill.name}</span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
      );

    case 'geneva':
    case 'madrid':
    case 'seoul':
         // Elegant, split-column layout
        return (
            <div className="font-serif bg-gray-50 text-gray-700 min-h-full text-sm leading-relaxed p-8 flex gap-8">
                <div className="w-2/3">
                    <div className="text-left mb-8">
                        <h1 className="text-5xl font-bold text-gray-800 tracking-tight break-words">{personalInfo?.name}</h1>
                        <p className="text-lg text-teal-600 font-medium mt-1">Software Engineer</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">About Me</h2>
                        <div className="w-16 border-b-2 border-teal-200 mb-3"></div>
                        <p className="text-sm break-words">{summary}</p>
                    </div>

                     <div className="mb-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">Experience</h2>
                        <div className="w-16 border-b-2 border-teal-200 mb-3"></div>
                        {experience?.map((exp: any, i:number) => (
                            <div key={i} className="mb-3 break-inside-avoid">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold text-md text-gray-800 break-words">{exp.jobTitle}</h3>
                                    <p className="text-xs text-gray-500 whitespace-nowrap pl-2">{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-600 break-words">{exp.company}</p>
                                <p className="text-sm mt-1 break-words">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="w-px bg-gray-200"></div>
                <div className="w-1/3 pt-16">
                     <div className="mb-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">Contact</h2>
                        <div className="w-16 border-b-2 border-teal-200 mb-3"></div>
                        <p className="text-sm break-words">{personalInfo.email}</p>
                        <p className="text-sm break-words">{personalInfo.phone}</p>
                        <p className="text-sm break-words">{personalInfo.location}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">Education</h2>
                        <div className="w-16 border-b-2 border-teal-200 mb-3"></div>
                        {education?.map((edu: any, i:number) => (
                             <div key={i} className="mb-2">
                                <p className="font-semibold text-md break-words">{edu.degree}</p>
                                <p className="text-sm break-words">{edu.school}</p>
                                <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">Skills</h2>
                        <div className="w-16 border-b-2 border-teal-200 mb-3"></div>
                         <div className="flex flex-wrap gap-2">
                            {skills?.map((skill: any) => <span key={skill.name} className="bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full">{skill.name}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        )

    default: // Simple, ATS, Word, Google Docs templates
      // Modern, clean, single-column layout
      return (
        <div className="p-8 font-sans bg-white text-slate-800 min-h-full text-sm leading-relaxed">
            {/* Header */}
            <div className="flex items-start justify-between bg-slate-700 text-white p-6 -mx-8 -mt-8 mb-8">
                 <div className="w-3/4">
                    <h1 className="text-4xl font-bold tracking-tight break-words">{personalInfo?.name}</h1>
                    <p className="text-lg text-slate-300 mt-1">Software Engineer</p>
                </div>
                 <div className="w-1/4 text-right text-xs flex flex-col items-end gap-1 break-words">
                     <p className="break-all">{personalInfo?.email}</p>
                     <p className="break-all">{personalInfo?.phone}</p>
                     <p className="break-all">{personalInfo?.location}</p>
                </div>
            </div>

            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider border-b-2 border-slate-200 pb-1 mb-3">Professional Summary</h2>
                <p className="text-sm text-slate-600 break-words">{summary}</p>
            </section>
            
            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider border-b-2 border-slate-200 pb-1 mb-3">Work Experience</h2>
                {experience?.map((exp:any, i:number) => (
                    <div key={i} className="mb-4 break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-md font-semibold text-slate-800 break-words">{exp.jobTitle}</h3>
                            <div className="text-xs text-slate-500 font-medium whitespace-nowrap pl-2">{exp.startDate} - {exp.endDate}</div>
                        </div>
                        <h4 className="text-sm font-medium text-slate-600 break-words">{exp.company}</h4>
                        <p className="text-sm text-slate-600 mt-1 break-words">{exp.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="grid grid-cols-2 gap-x-8">
                 <div>
                    <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider border-b-2 border-slate-200 pb-1 mb-3">Education</h2>
                    {education?.map((edu:any, i:number) => (
                        <div key={i} className="mb-3 break-inside-avoid">
                            <h3 className="text-md font-semibold text-slate-800 break-words">{edu.degree}</h3>
                            <p className="text-sm text-slate-700 break-words">{edu.school}</p>
                            <p className="text-xs text-slate-500 font-medium">{edu.graduationDate}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider border-b-2 border-slate-200 pb-1 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {skills?.map((skill: any) => <span key={skill.name} className="bg-slate-100 text-slate-800 text-sm font-medium px-4 py-1 rounded-md">{skill.name}</span>)}
                    </div>
                </div>
            </section>
        </div>
      );
  }
};
