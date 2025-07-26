
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
    { jobTitle: 'Senior Software Engineer', company: 'Tech Corp', startDate: 'Jan 2020', endDate: 'Present', description: 'Developed and maintained client-side features for a large-scale e-commerce platform using React and Redux. Collaborated with cross-functional teams to deliver high-quality software solutions.' },
    { jobTitle: 'Software Engineer', company: 'Innovate LLC', startDate: 'Jun 2017', endDate: 'Dec 2019', description: 'Collaborated with a team of developers to build and deploy a new SaaS product. Contributed to both front-end and back-end development.' },
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
    { name: 'SQL' },
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
    case 'berlin': // Two-Column
      return (
        <div className="font-sans bg-white text-gray-800 min-h-full flex text-sm">
          <div className="w-1/3 bg-accent/20 p-8 text-accent-foreground/80">
            <h1 className="text-3xl font-bold text-primary-foreground bg-primary p-4 -ml-8 mt-4 mb-8 text-white">{personalInfo?.name}</h1>

            <div className="mb-8">
              <h2 className="text-lg font-bold uppercase text-primary mb-3">Contact</h2>
              <p className="mb-1 break-words">{personalInfo?.email}</p>
              <p className="mb-1">{personalInfo?.phone}</p>
              <p className="mb-1">{personalInfo?.location}</p>
              <p className="break-words">{personalInfo?.website}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold uppercase text-primary mb-3">Skills</h2>
              <ul className="list-disc list-inside">
                {skills?.map((skill: any, i: number) => <li key={i}>{skill.name}</li>)}
              </ul>
            </div>
             <div>
              <h2 className="text-lg font-bold uppercase text-primary mb-3">Education</h2>
              {education?.map((edu:any, i:number) => (
                <div key={i} className="mb-3">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p>{edu.school}</p>
                  <p className="text-xs">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/3 p-8">
             <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/50 pb-2 mb-4">Summary</h2>
                <p className="leading-relaxed">{summary}</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/50 pb-2 mb-4">Experience</h2>
                {experience?.map((exp: any, i:number) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
                      <p className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <h4 className="font-semibold text-gray-700">{exp.company}</h4>
                    <p className="mt-1 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </section>
          </div>
        </div>
      );

    case 'geneva':
    case 'madrid':
    case 'seoul': // Picture
        return (
            <div className="p-8 font-serif bg-white text-gray-700 min-h-full text-sm">
                <div className="text-center mb-6 pb-4 border-b-4 border-accent">
                    <h1 className="text-5xl font-extrabold text-primary">{personalInfo?.name}</h1>
                    <p className="text-xl text-gray-500 mt-1">Software Engineer</p>
                </div>
                <div className="flex justify-center text-xs gap-6 mb-6">
                    <p>📧 {personalInfo?.email}</p>
                    <p>📞 {personalInfo?.phone}</p>
                    <p>📍 {personalInfo?.location}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-3 border-b border-accent/30 pb-1">Summary</h2>
                    <p className="leading-relaxed">{summary}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-3 border-b border-accent/30 pb-1">Experience</h2>
                    {experience?.map((exp: any, i:number) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between">
                                <h3 className="font-semibold text-md text-primary">{exp.jobTitle}</h3>
                                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-sm text-gray-600 italic">{exp.company}</p>
                            <p className="mt-1">{exp.description}</p>
                        </div>
                    ))}
                </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-3 border-b border-accent/30 pb-1">Education</h2>
                        {education?.map((edu: any, i:number) => (
                             <div key={i} className="mb-2">
                                <p className="font-semibold text-md">{edu.degree}</p>
                                <p className="text-sm">{edu.school}</p>
                                <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-3 border-b border-accent/30 pb-1">Skills</h2>
                         <div className="flex flex-wrap gap-2">
                            {skills?.map((skill: any, i:number) => <span key={i} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">{skill.name}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        )

    default: // Simple, ATS, Word, Google Docs templates
      return (
        <div className="p-8 font-sans bg-white text-slate-800 min-h-full text-sm">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-6 -m-8 mb-6">
                <h1 className="text-4xl font-bold">{personalInfo?.name}</h1>
                <div className="flex justify-between mt-2 text-xs">
                    <span>{personalInfo?.phone}</span>
                    <span>{personalInfo?.email}</span>
                    <span>{personalInfo?.location}</span>
                    <span>{personalInfo?.website}</span>
                </div>
            </div>

            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase text-primary tracking-wider mb-2">Professional Summary</h2>
                <p className="text-slate-700 leading-relaxed">{summary}</p>
            </section>
            
            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase text-primary tracking-wider mb-2">Work Experience</h2>
                {experience?.map((exp:any, i:number) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between">
                            <h3 className="text-md font-bold text-slate-800">{exp.jobTitle}</h3>
                            <div className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</div>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-600 italic">{exp.company}</h4>
                        <p className="text-slate-700 mt-1">{exp.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="grid grid-cols-2 gap-x-8">
                 <div>
                    <h2 className="text-lg font-bold uppercase text-primary tracking-wider mb-2">Education</h2>
                    {education?.map((edu:any, i:number) => (
                        <div key={i} className="mb-3">
                            <h3 className="text-md font-bold text-slate-800">{edu.degree}</h3>
                            <p className="text-sm text-slate-700">{edu.school}</p>
                            <p className="text-xs text-slate-500">{edu.graduationDate}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h2 className="text-lg font-bold uppercase text-primary tracking-wider mb-2">Skills</h2>
                    <ul className="flex flex-wrap gap-2 mt-2">
                        {skills?.map((skill: any, i:number) => <li key={i} className="bg-primary/20 text-primary-focus text-xs font-medium px-3 py-1 rounded-md">{skill.name}</li>)}
                    </ul>
                </div>
            </section>
        </div>
      );
  }
};
