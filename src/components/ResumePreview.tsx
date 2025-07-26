
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
    case 'berlin':
      return (
        <div className="p-8 font-sans bg-gray-100 text-gray-800 min-h-full">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="mb-8">
                <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
                <h1 className="text-3xl font-bold text-gray-900">{personalInfo?.name}</h1>
                <p className="text-md text-blue-600">Software Engineer</p>
              </div>
              <div>
                <h2 className="text-lg font-bold uppercase text-gray-600 tracking-wider mb-4">Contact</h2>
                <p className="text-sm mb-1">{personalInfo?.email}</p>
                <p className="text-sm mb-1">{personalInfo?.phone}</p>
                <p className="text-sm">{personalInfo?.location}</p>
              </div>
              <div className="mt-8">
                <h2 className="text-lg font-bold uppercase text-gray-600 tracking-wider mb-4">Skills</h2>
                <ul className="list-disc list-inside text-sm">
                  {skills?.map((skill: any) => <li key={skill.name}>{skill.name}</li>)}
                </ul>
              </div>
            </div>
            <div className="col-span-2">
              <section className="mb-8">
                <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-700">About Me</h2>
                <p className="text-sm leading-relaxed">{summary}</p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-700">Experience</h2>
                {experience?.map((exp: any, i:number) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                    <p className="text-sm text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </section>
              <section>
                <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-700">Education</h2>
                {education?.map((edu:any, i:number) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.school} | {edu.graduationDate}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      );

    case 'geneva':
    case 'madrid':
    case 'seoul':
        return (
            <div className="p-8 font-serif bg-white text-gray-700 min-h-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">{personalInfo?.name}</h1>
                    <p className="text-lg text-teal-600">Software Engineer</p>
                </div>
                <div className="flex justify-center text-sm gap-8 mb-8 border-y-2 border-gray-200 py-2">
                    <p>{personalInfo?.email}</p>
                    <p>{personalInfo?.phone}</p>
                    <p>{personalInfo?.location}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Summary</h2>
                    <p className="text-sm leading-relaxed">{summary}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Experience</h2>
                    {experience?.map((exp: any, i:number) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between">
                                <h3 className="font-semibold text-md text-gray-800">{exp.jobTitle}</h3>
                                <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-sm text-gray-600">{exp.company}</p>
                            <p className="text-sm mt-1">{exp.description}</p>
                        </div>
                    ))}
                </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Education</h2>
                        {education?.map((edu: any, i:number) => (
                             <div key={i} className="mb-2">
                                <p className="font-semibold text-md">{edu.degree}</p>
                                <p className="text-sm">{edu.school}</p>
                                <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Skills</h2>
                         <div className="flex flex-wrap gap-2">
                            {skills?.map((skill: any) => <span key={skill.name} className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">{skill.name}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        )

    default: // Simple, ATS, Word, Google Docs templates
      return (
        <div className="p-8 font-sans bg-white text-slate-800 min-h-full">
            {/* Header */}
            <div className="text-center border-b-2 border-slate-200 pb-4 mb-6">
                <h1 className="text-4xl font-bold text-slate-900">{personalInfo?.name}</h1>
                <p className="text-md text-slate-500 mt-1">{personalInfo?.location}</p>
                <div className="flex justify-center gap-4 text-sm text-slate-600 mt-2">
                    <span>{personalInfo?.phone}</span>
                    <span>{personalInfo?.email}</span>
                    <span>{personalInfo?.website}</span>
                </div>
            </div>

            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-3">Professional Summary</h2>
                <p className="text-sm text-slate-700 leading-relaxed">{summary}</p>
            </section>
            
            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-3">Work Experience</h2>
                {experience?.map((exp:any, i:number) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold text-slate-800">{exp.jobTitle}</h3>
                            <div className="text-sm text-slate-500">{exp.startDate} - {exp.endDate}</div>
                        </div>
                        <h4 className="text-md font-medium text-slate-600">{exp.company}</h4>
                        <p className="text-sm text-slate-700 mt-1">{exp.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="grid grid-cols-2 gap-x-8">
                 <div>
                    <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-3">Education</h2>
                    {education?.map((edu:any, i:number) => (
                        <div key={i} className="mb-3">
                            <h3 className="text-lg font-semibold text-slate-800">{edu.degree}</h3>
                            <p className="text-md text-slate-700">{edu.school}</p>
                            <p className="text-sm text-slate-500">{edu.graduationDate}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-3">Skills</h2>
                    <ul className="flex flex-wrap gap-2 mt-2">
                        {skills?.map((skill: any) => <li key={skill.name} className="bg-slate-200 text-slate-800 text-sm font-medium px-4 py-1 rounded-md">{skill.name}</li>)}
                    </ul>
                </div>
            </section>
        </div>
      );
  }
};
