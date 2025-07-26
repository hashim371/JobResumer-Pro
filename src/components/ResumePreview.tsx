
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
       // Creative, colorful, two-column layout
       return (
        <div className="font-sans bg-white min-h-full text-sm leading-relaxed flex text-gray-800">
            {/* Left Sidebar */}
            <div className="w-1/3 bg-slate-800 text-white p-6 flex flex-col relative overflow-hidden">
                <div 
                    className="absolute inset-0 bg-slate-900 opacity-20"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                    }}
                ></div>
                <div className="w-24 h-24 rounded-full bg-white mx-auto mb-6 flex-shrink-0 shadow-lg border-4 border-slate-400"></div>
                <div className="text-center z-10 mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-white break-words">{personalInfo?.name}</h1>
                    <p className="text-slate-300">Software Engineer</p>
                </div>
                <div className="space-y-4 z-10 break-words">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Contact</h3>
                        <p className="text-xs">{personalInfo.email}</p>
                        <p className="text-xs">{personalInfo.phone}</p>
                        <p className="text-xs">{personalInfo.location}</p>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Skills</h3>
                        <ul className="text-xs list-disc list-inside">
                            {skills?.slice(0, 5).map((skill: any) => <li key={skill.name}>{skill.name}</li>)}
                        </ul>
                    </div>
                </div>

            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8 break-words">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Professional Summary</h2>
                    <p className="text-sm text-gray-600">{summary}</p>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-700 border-b-2 border-slate-200 pb-1 mb-3">Experience</h3>
                    {experience?.map((exp: any, i:number) => (
                        <div key={i} className="mb-3">
                            <p className="font-semibold">{exp.jobTitle} at {exp.company}</p>
                            <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            <p className="text-sm mt-1">{exp.description}</p>
                        </div>
                    ))}
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-700 border-b-2 border-slate-200 pb-1 mb-3">Education</h3>
                     {education?.map((edu: any, i:number) => (
                        <div key={i}>
                            <p className="font-semibold">{edu.degree}</p>
                            <p className="text-sm text-gray-600">{edu.school} ({edu.graduationDate})</p>
                        </div>
                    ))}
                </div>
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
                        <h1 className="text-5xl font-bold text-gray-800 tracking-tight">{personalInfo?.name}</h1>
                        <p className="text-lg text-teal-600 font-medium mt-1">Software Engineer</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">About Me</h2>
                        <div className="w-16 border-b-2 border-teal-200 mb-3"></div>
                        <p className="text-sm">{summary}</p>
                    </div>

                     <div className="mb-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">Experience</h2>
                        <div className="w-16 border-b-2 border-teal-200 mb-3"></div>
                        {experience?.map((exp: any, i:number) => (
                            <div key={i} className="mb-3 break-inside-avoid">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold text-md text-gray-800">{exp.jobTitle}</h3>
                                    <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-600">{exp.company}</p>
                                <p className="text-sm mt-1">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="w-px bg-gray-200"></div>
                <div className="w-1/3 pt-20">
                     <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-6 flex-shrink-0 shadow-lg"></div>
                     <div className="mb-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">Contact</h2>
                        <div className="w-16 border-b-2 border-teal-200 mb-3"></div>
                        <p className="text-sm">{personalInfo.email}</p>
                        <p className="text-sm">{personalInfo.phone}</p>
                        <p className="text-sm">{personalInfo.location}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">Education</h2>
                        <div className="w-16 border-b-2 border-teal-200 mb-3"></div>
                        {education?.map((edu: any, i:number) => (
                             <div key={i}>
                                <p className="font-semibold text-md">{edu.degree}</p>
                                <p className="text-sm">{edu.school}</p>
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
            <div className="flex items-center justify-between bg-slate-700 text-white p-6 -mx-8 -mt-8 mb-8">
                 <div className="w-3/4">
                    <h1 className="text-4xl font-bold tracking-tight">{personalInfo?.name}</h1>
                    <p className="text-lg text-slate-300 mt-1">Software Engineer</p>
                </div>
                 <div className="w-1/4 text-right text-xs flex flex-col items-end">
                     <p>{personalInfo?.email}</p>
                     <p>{personalInfo?.phone}</p>
                     <p>{personalInfo?.location}</p>
                </div>
            </div>

            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider border-b-2 border-slate-200 pb-1 mb-3">Professional Summary</h2>
                <p className="text-sm text-slate-600">{summary}</p>
            </section>
            
            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider border-b-2 border-slate-200 pb-1 mb-3">Work Experience</h2>
                {experience?.map((exp:any, i:number) => (
                    <div key={i} className="mb-4 break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-md font-semibold text-slate-800">{exp.jobTitle}</h3>
                            <div className="text-xs text-slate-500 font-medium">{exp.startDate} - {exp.endDate}</div>
                        </div>
                        <h4 className="text-sm font-medium text-slate-600">{exp.company}</h4>
                        <p className="text-sm text-slate-600 mt-1">{exp.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="grid grid-cols-2 gap-x-8">
                 <div>
                    <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider border-b-2 border-slate-200 pb-1 mb-3">Education</h2>
                    {education?.map((edu:any, i:number) => (
                        <div key={i} className="mb-3 break-inside-avoid">
                            <h3 className="text-md font-semibold text-slate-800">{edu.degree}</h3>
                            <p className="text-sm text-slate-700">{edu.school}</p>
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
