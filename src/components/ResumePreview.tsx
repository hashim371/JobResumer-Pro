
"use client";

import React from 'react';

// A mock data structure if no data is provided
const mockData = {
  personalInfo: {
    name: 'John Doe',
    role: 'Software Engineer',
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
  const data = initialData || mockData;
  const { personalInfo, summary, experience, education, skills } = data;

  // Different Template Layouts
  switch (templateId) {
    case 'new-york':
        return (
            <div className="p-8 font-serif bg-white text-gray-800 min-h-full text-sm leading-relaxed">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-headline">{personalInfo?.name}</h1>
                    <p className="text-xl mt-1 text-gray-600 font-light tracking-wide">{personalInfo?.role}</p>
                    <div className="flex justify-center gap-x-4 text-xs mt-2 text-gray-600">
                        <span>{personalInfo?.phone}</span>
                        <span className="text-gray-400">&bull;</span>
                        <span className="break-words">{personalInfo?.email}</span>
                        <span className="text-gray-400">&bull;</span>
                        <span>{personalInfo?.location}</span>
                        {personalInfo?.website && <><span className="text-gray-400">&bull;</span><span className="break-words">{personalInfo?.website}</span></>}
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-700 tracking-widest uppercase pb-2 border-b-2 border-gray-300 mb-3">Summary</h2>
                    <p>{summary}</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-700 tracking-widest uppercase pb-2 border-b-2 border-gray-300 mb-3">Experience</h2>
                    {experience?.map((exp: any, i: number) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-md">{exp.jobTitle} at {exp.company}</h3>
                                <p className="text-xs font-mono">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="mt-1 text-gray-700">{exp.description}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-x-12">
                    <div className="mb-6">
                        <h2 className="text-sm font-bold text-gray-700 tracking-widest uppercase pb-2 border-b-2 border-gray-300 mb-3">Education</h2>
                        {education?.map((edu: any, i: number) => (
                            <div key={i} className="mb-2">
                                <h3 className="font-bold">{edu.degree}</h3>
                                <p>{edu.school}</p>
                                <p className="text-xs text-gray-600">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-gray-700 tracking-widest uppercase pb-2 border-b-2 border-gray-300 mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills?.map((skill: any, i: number) => (
                                <span key={i} className="bg-gray-200 text-gray-800 font-medium text-xs px-3 py-1 rounded">{skill.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );

    case 'sydney': // ATS-friendly
    case 'cairo':
      return (
        <div className="p-8 font-body bg-white text-slate-800 min-h-full text-sm">
            <h1 className="text-3xl font-bold font-headline text-slate-900">{personalInfo?.name}</h1>
            <p className="text-lg text-slate-600 font-medium">{personalInfo?.role}</p>
            <div className="flex flex-wrap gap-x-4 text-xs mt-1 text-slate-600">
                <span>{personalInfo?.phone}</span>
                <span>{personalInfo?.email}</span>
                <span>{personalInfo?.location}</span>
                <span>{personalInfo?.website}</span>
            </div>

            <section className="mt-6">
                <h2 className="text-md font-bold uppercase text-slate-700 tracking-wider border-b border-slate-300 pb-1 mb-2 font-headline">Professional Summary</h2>
                <p className="text-slate-700 leading-relaxed text-xs">{summary}</p>
            </section>
            
            <section className="mt-4">
                <h2 className="text-md font-bold uppercase text-slate-700 tracking-wider border-b border-slate-300 pb-1 mb-2 font-headline">Work Experience</h2>
                {experience?.map((exp:any, i:number) => (
                    <div key={i} className="mb-3">
                        <div className="flex justify-between">
                            <h3 className="text-sm font-bold text-slate-800">{exp.jobTitle}</h3>
                            <div className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</div>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-600 italic">{exp.company}</h4>
                        <p className="text-slate-700 mt-1 text-xs">{exp.description}</p>
                    </div>
                ))}
            </section>
            
             <section className="mt-4">
                <h2 className="text-md font-bold uppercase text-slate-700 tracking-wider border-b border-slate-300 pb-1 mb-2 font-headline">Education</h2>
                {education?.map((edu:any, i:number) => (
                    <div key={i} className="mb-2">
                        <h3 className="text-sm font-bold text-slate-800">{edu.degree}</h3>
                        <p className="text-xs text-slate-700">{edu.school}</p>
                        <p className="text-xs text-slate-500">{edu.graduationDate}</p>
                    </div>
                ))}
            </section>

            <section className="mt-4">
                <h2 className="text-md font-bold uppercase text-slate-700 tracking-wider border-b border-slate-300 pb-1 mb-2 font-headline">Skills</h2>
                <p className="text-xs text-slate-700">
                    {skills?.map((skill: any) => skill.name).join(', ')}
                </p>
            </section>
        </div>
      );

    case 'paris':
    case 'rome':
    case 'athens':
    case 'vienna':
    case 'istanbul':
        return (
            <div className="p-10 font-serif bg-white text-gray-900 min-h-full text-[10.5pt] leading-normal">
                <div className="text-center">
                    <h1 className="text-3xl tracking-widest font-light uppercase font-headline">{personalInfo?.name}</h1>
                    <p className="text-md tracking-widest uppercase text-gray-600 mt-1">{personalInfo?.role}</p>
                    <div className="text-xs text-gray-500 mt-2">
                        {personalInfo?.location} &bull; {personalInfo?.phone} &bull; {personalInfo?.email} {personalInfo?.website && <> &bull; {personalInfo?.website}</>}
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-[11pt] font-semibold tracking-[.2em] text-center uppercase border-y border-gray-400 py-1 my-3 font-headline">Summary</h2>
                    <p className="text-center">{summary}</p>
                </div>

                <div className="mt-5">
                    <h2 className="text-[11pt] font-semibold tracking-[.2em] text-center uppercase border-y border-gray-400 py-1 my-3 font-headline">Experience</h2>
                    {experience?.map((exp: any, i: number) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between">
                                <h3 className="font-bold text-sm">{exp.company}</h3>
                                <p className="text-sm">{exp.startDate} &mdash; {exp.endDate}</p>
                            </div>
                            <p className="italic text-sm">{exp.jobTitle}</p>
                            <p className="mt-0.5 text-gray-800">{exp.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-5">
                    <h2 className="text-[11pt] font-semibold tracking-[.2em] text-center uppercase border-y border-gray-400 py-1 my-3 font-headline">Education</h2>
                    {education?.map((edu: any, i: number) => (
                         <div key={i} className="flex justify-between mb-1">
                            <div>
                                <h3 className="font-bold text-sm">{edu.school}</h3>
                                <p className="text-sm">{edu.degree}</p>
                            </div>
                            <p className="text-sm">{edu.graduationDate}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-5">
                    <h2 className="text-[11pt] font-semibold tracking-[.2em] text-center uppercase border-y border-gray-400 py-1 my-3 font-headline">Skills</h2>
                     <p className="text-center">{skills?.map((skill: any) => skill.name).join(' &bull; ')}</p>
                </div>
            </div>
        )
    
    case 'london':
    case 'tokyo':
    case 'helsinki':
    case 'shanghai':
        return (
             <div className="p-8 font-body bg-white text-gray-800 min-h-full text-sm">
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <h1 className="text-5xl font-extrabold text-blue-800 mb-2 font-headline">{personalInfo?.name}</h1>
                        <p className="text-lg font-light text-gray-600">{personalInfo?.role}</p>
                    </div>
                    <div className="text-right text-xs">
                        <p className="break-words">{personalInfo?.email}</p>
                        <p>{personalInfo?.phone}</p>
                        <p>{personalInfo?.location}</p>
                        <p className="break-words">{personalInfo?.website}</p>
                    </div>
                </div>

                <div className="mt-8 border-t-2 border-blue-800 pt-6">
                    <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider mb-3 font-headline">About Me</h2>
                    <p className="leading-relaxed">{summary}</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider mb-3 font-headline">Experience</h2>
                     {experience?.map((exp: any, i: number) => (
                        <div key={i} className="mb-4 grid grid-cols-4 gap-4">
                           <div className="col-span-1 text-xs text-gray-600">
                               <p>{exp.startDate} - {exp.endDate}</p>
                               <p>{exp.company}</p>
                           </div>
                           <div className="col-span-3">
                                <h3 className="font-bold">{exp.jobTitle}</h3>
                               <p className="mt-1 leading-relaxed">{exp.description}</p>
                           </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-12">
                     <div>
                        <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider mb-3 font-headline">Education</h2>
                        {education?.map((edu: any, i: number) => (
                            <div key={i} className="mb-3">
                                <h3 className="font-bold">{edu.degree}</h3>
                                <p className="text-sm">{edu.school}</p>
                                <p className="text-xs text-gray-600">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                     <div>
                        <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider mb-3 font-headline">Skills</h2>
                        <ul className="list-disc list-inside space-y-1">
                          {skills?.map((skill: any, i:number) => <li key={i}>{skill.name}</li>)}
                        </ul>
                    </div>
                </div>

            </div>
        )

    case 'berlin': 
    case 'oslo':
    case 'toronto':
      return (
        <div className="font-body bg-white text-gray-800 min-h-full flex text-sm">
          <div className="w-1/3 bg-gray-100 p-8 text-gray-800 flex flex-col">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 font-headline">{personalInfo?.name}</h1>
                <p className="text-md text-gray-600 mt-1">{personalInfo?.role}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase text-gray-600 tracking-wider mb-3 font-headline">Contact</h2>
              <div className="text-xs space-y-1">
                <p className="break-words">{personalInfo?.email}</p>
                <p>{personalInfo?.phone}</p>
                <p>{personalInfo?.location}</p>
                <p className="break-words">{personalInfo?.website}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase text-gray-600 tracking-wider mb-3 font-headline">Skills</h2>
              <ul className="text-xs space-y-1">
                {skills?.map((skill: any, i: number) => <li key={i} className="bg-gray-200 px-2 py-1 rounded-sm">{skill.name}</li>)}
              </ul>
            </div>
             <div className="mt-auto">
              <h2 className="text-sm font-bold uppercase text-gray-600 tracking-wider mb-3 font-headline">Education</h2>
              {education?.map((edu:any, i:number) => (
                <div key={i} className="mb-3 text-xs">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.school}</p>
                  <p className="text-gray-500">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/3 p-8">
             <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4 font-headline">Summary</h2>
                <p className="leading-relaxed text-sm">{summary}</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4 font-headline">Experience</h2>
                {experience?.map((exp: any, i:number) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-md font-bold">{exp.jobTitle}</h3>
                      <p className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <h4 className="font-semibold text-gray-700 italic">{exp.company}</h4>
                    <p className="mt-1 leading-relaxed text-xs">{exp.description}</p>
                  </div>
                ))}
              </section>
          </div>
        </div>
      );

    case 'geneva':
    case 'madrid':
    case 'seoul':
        return (
            <div className="p-8 font-body bg-white text-gray-700 min-h-full text-sm">
                <div className="flex items-center mb-6 pb-6 border-b-2 border-teal-500">
                    <div>
                        <h1 className="text-5xl font-extrabold text-teal-700 font-headline">{personalInfo?.name}</h1>
                        <p className="text-xl text-gray-500 mt-1">{personalInfo?.role}</p>
                    </div>
                </div>
                <div className="flex justify-start text-xs gap-6 mb-6">
                    <p>📧 {personalInfo?.email}</p>
                    <p>📞 {personalInfo?.phone}</p>
                    <p>📍 {personalInfo?.location}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3 border-b border-teal-200 pb-1 font-headline">Summary</h2>
                    <p className="leading-relaxed">{summary}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3 border-b border-teal-200 pb-1 font-headline">Experience</h2>
                    {experience?.map((exp: any, i:number) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between">
                                <h3 className="font-semibold text-md text-teal-800">{exp.jobTitle}</h3>
                                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-sm text-gray-600 italic">{exp.company}</p>
                            <p className="mt-1">{exp.description}</p>
                        </div>
                    ))}
                </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3 border-b border-teal-200 pb-1 font-headline">Education</h2>
                        {education?.map((edu: any, i:number) => (
                             <div key={i} className="mb-2">
                                <p className="font-semibold text-md">{edu.degree}</p>
                                <p className="text-sm">{edu.school}</p>
                                <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3 border-b border-teal-200 pb-1 font-headline">Skills</h2>
                         <div className="flex flex-wrap gap-2">
                            {skills?.map((skill: any, i:number) => <span key={i} className="bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full">{skill.name}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    
    case 'moscow':
    case 'copenhagen':
    case 'prague':
        return (
             <div className="p-8 font-body bg-white text-gray-800 min-h-full text-sm">
                <div className="text-center pb-4 border-b-4 border-rose-300">
                    <h1 className="text-4xl font-bold text-rose-800 font-headline">{personalInfo?.name}</h1>
                    <p className="text-md text-gray-500 mt-1">{personalInfo?.role}</p>
                </div>
                 <div className="flex justify-center text-xs gap-4 mt-4 text-gray-600">
                    <span>{personalInfo?.phone}</span>
                    <span>&bull;</span>
                    <span className="break-words">{personalInfo?.email}</span>
                     <span>&bull;</span>
                    <span>{personalInfo?.location}</span>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold uppercase text-rose-700 tracking-wider mb-2 text-center font-headline">Summary</h2>
                    <p className="leading-relaxed text-center text-xs">{summary}</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold uppercase text-rose-700 tracking-wider mb-3 text-center font-headline">Experience</h2>
                     {experience?.map((exp: any, i: number) => (
                        <div key={i} className="mb-4">
                           <div className="text-center">
                                <h3 className="font-bold inline">{exp.jobTitle}</h3>
                                <span className="text-gray-600"> at </span>
                                <h4 className="font-bold inline">{exp.company}</h4>
                                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                           </div>
                           <p className="mt-1 leading-relaxed text-xs">{exp.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-8">
                     <div>
                        <h2 className="text-lg font-semibold uppercase text-rose-700 tracking-wider mb-2 text-center font-headline">Education</h2>
                        {education?.map((edu: any, i: number) => (
                            <div key={i} className="mb-3 text-center">
                                <h3 className="font-bold">{edu.degree}</h3>
                                <p className="text-sm">{edu.school}</p>
                                <p className="text-xs text-gray-600">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                     <div>
                        <h2 className="text-lg font-semibold uppercase text-rose-700 tracking-wider mb-2 text-center font-headline">Skills</h2>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {skills?.map((skill: any, i:number) => (
                            <span key={i} className="bg-rose-100 text-rose-800 text-xs px-3 py-1 rounded-md">{skill.name}</span>
                          ))}
                        </div>
                    </div>
                </div>

            </div>
        )
    case 'amsterdam':
        return (
            <div className="font-body min-h-full flex text-sm">
            <div className="w-1/3 bg-orange-500 text-white p-8 flex flex-col">
                <div className="flex-grow">
                    <h1 className="text-3xl font-bold mb-2 font-headline">{personalInfo?.name}</h1>
                    <p className="text-md text-orange-100 mb-8">{personalInfo?.role}</p>
                    <div className="mb-6">
                        <h2 className="text-md font-semibold uppercase tracking-wider mb-2 font-headline">Contact</h2>
                        <div className="text-xs space-y-1 text-orange-100">
                        <p>{personalInfo?.email}</p>
                        <p>{personalInfo?.phone}</p>
                        <p>{personalInfo?.location}</p>
                        <p>{personalInfo?.website}</p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-md font-semibold uppercase tracking-wider mb-2 font-headline">Skills</h2>
                        <ul className="text-xs flex flex-wrap gap-2">
                        {skills?.map((skill: any, i: number) => <li key={i} className="bg-orange-400 px-2 py-1 rounded">{skill.name}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="mt-auto">
                <h2 className="text-md font-semibold uppercase tracking-wider mb-2 font-headline">Education</h2>
                {education?.map((edu: any, i: number) => (
                    <div key={i} className="mb-3 text-xs">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-orange-200">{edu.school}</p>
                    <p className="text-orange-200">{edu.graduationDate}</p>
                    </div>
                ))}
                </div>
            </div>
            <div className="w-2/3 p-8 bg-white text-gray-800">
                <section className="mb-6">
                <h2 className="text-xl font-bold text-orange-600 border-b-2 border-orange-200 pb-2 mb-3 font-headline">Summary</h2>
                <p className="leading-relaxed">{summary}</p>
                </section>
                <section>
                <h2 className="text-xl font-bold text-orange-600 border-b-2 border-orange-200 pb-2 mb-3 font-headline">Experience</h2>
                {experience?.map((exp: any, i: number) => (
                    <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-md font-bold">{exp.jobTitle}</h3>
                        <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <h4 className="font-semibold text-orange-700 italic">{exp.company}</h4>
                    <p className="mt-1 leading-relaxed text-xs">{exp.description}</p>
                    </div>
                ))}
                </section>
            </div>
            </div>
        );
    case 'stockholm':
      return (
        <div className="p-8 font-body bg-sky-950 text-white min-h-full text-sm">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight font-headline">{personalInfo?.name}</h1>
            <p className="text-lg font-light text-sky-200">{personalInfo?.role}</p>
            <div className="flex justify-center gap-x-4 text-xs mt-2 text-sky-300">
              <span>{personalInfo?.phone}</span>
              <span>&bull;</span>
              <span className="break-words">{personalInfo?.email}</span>
              <span>&bull;</span>
              <span>{personalInfo?.location}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-sky-700 mb-3 text-sky-300 font-headline">Summary</h2>
            <p className="text-sky-100">{summary}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-sky-700 mb-3 text-sky-300 font-headline">Experience</h2>
            {experience?.map((exp: any, i: number) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-md text-sky-100">{exp.jobTitle} at {exp.company}</h3>
                  <p className="text-xs font-mono text-sky-400">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="mt-1 text-sky-200">{exp.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-12">
            <div className="mb-6">
              <h2 className="text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-sky-700 mb-3 text-sky-300 font-headline">Education</h2>
              {education?.map((edu: any, i: number) => (
                <div key={i} className="mb-2">
                  <h3 className="font-bold text-sky-100">{edu.degree}</h3>
                  <p className="text-sky-200">{edu.school}</p>
                  <p className="text-xs text-sky-400">{edu.graduationDate}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-sky-700 mb-3 text-sky-300 font-headline">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills?.map((skill: any, i: number) => (
                  <span key={i} className="bg-sky-800 text-sky-100 font-medium text-xs px-3 py-1 rounded-full">{skill.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    
    case 'lisbon':
      return (
        <div className="p-8 font-body bg-white text-gray-700 min-h-full text-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-green-700">
            <div>
              <h1 className="text-4xl font-extrabold text-green-800 font-headline">{personalInfo?.name}</h1>
              <p className="text-lg text-gray-500 mt-1">{personalInfo?.role}</p>
            </div>
            <div className="text-right text-xs">
              <p>Email: <span className="break-words font-semibold">{personalInfo?.email}</span></p>
              <p>Phone: <span className="font-semibold">{personalInfo?.phone}</span></p>
              <p>Location: <span className="font-semibold">{personalInfo?.location}</span></p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-2 font-headline">Summary</h2>
            <p className="leading-relaxed text-xs">{summary}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-2 font-headline">Experience</h2>
            {experience?.map((exp: any, i: number) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-md text-green-900">{exp.jobTitle} at {exp.company}</h3>
                  <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="mt-1 text-xs">{exp.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-2 font-headline">Education</h2>
              {education?.map((edu: any, i: number) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold text-md">{edu.degree}</p>
                  <p className="text-sm">{edu.school} - {edu.graduationDate}</p>
                </div>
              ))}
            </div>
            <div className="col-span-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-2 font-headline">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills?.map((skill: any, i: number) => <span key={i} className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded">{skill.name}</span>)}
              </div>
            </div>
          </div>
        </div>
      )
    
    case 'warsaw':
        return (
          <div className="p-8 font-body bg-white text-slate-800 min-h-full text-sm">
              <div className="bg-gray-800 text-white p-6 -m-8 mb-6">
                  <h1 className="text-4xl font-bold font-headline">{personalInfo?.name}</h1>
                  <p className="text-lg font-light text-gray-300 mt-1">{personalInfo?.role}</p>
                  <div className="flex justify-between mt-2 text-xs text-gray-300">
                      <span>{personalInfo?.phone}</span>
                      <span>{personalInfo?.email}</span>
                      <span>{personalInfo?.location}</span>
                      <span>{personalInfo?.website}</span>
                  </div>
              </div>
  
              <section className="mb-6">
                  <h2 className="text-lg font-bold uppercase text-gray-700 tracking-wider mb-2 font-headline">Professional Summary</h2>
                  <p className="text-slate-700 leading-relaxed">{summary}</p>
              </section>
              
              <section className="mb-6">
                  <h2 className="text-lg font-bold uppercase text-gray-700 tracking-wider mb-2 font-headline">Work Experience</h2>
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
                      <h2 className="text-lg font-bold uppercase text-gray-700 tracking-wider mb-2 font-headline">Education</h2>
                      {education?.map((edu:any, i:number) => (
                          <div key={i} className="mb-3">
                              <h3 className="text-md font-bold text-slate-800">{edu.degree}</h3>
                              <p className="text-sm text-slate-700">{edu.school}</p>
                              <p className="text-xs text-slate-500">{edu.graduationDate}</p>
                          </div>
                      ))}
                  </div>
  
                  <div>
                      <h2 className="text-lg font-bold uppercase text-gray-700 tracking-wider mb-2 font-headline">Skills</h2>
                      <ul className="flex flex-wrap gap-2 mt-2">
                          {skills?.map((skill: any, i:number) => <li key={i} className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-md">{skill.name}</li>)}
                      </ul>
                  </div>
              </section>
          </div>
        );
    case 'singapore':
        return (
            <div className="p-8 font-body bg-white text-gray-800 min-h-full text-sm">
                <div className="flex justify-between items-start pb-4 border-b-2 border-red-500">
                    <div>
                        <h1 className="text-4xl font-extrabold text-red-700 font-headline">{personalInfo?.name}</h1>
                        <p className="text-lg font-light text-gray-600 mt-1">{personalInfo?.role}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600 space-y-1">
                        <p>{personalInfo?.email}</p>
                        <p>{personalInfo?.phone}</p>
                        <p>{personalInfo?.location}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-sm font-bold uppercase text-red-600 tracking-widest mb-2 font-headline">Summary</h2>
                    <p className="leading-relaxed">{summary}</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-sm font-bold uppercase text-red-600 tracking-widest mb-3 font-headline">Experience</h2>
                    {experience?.map((exp: any, i: number) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-md font-semibold text-gray-900">{exp.jobTitle}, <span className="font-normal italic">{exp.company}</span></h3>
                                <p className="text-xs text-gray-500 font-mono">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="mt-1 leading-relaxed text-gray-700 text-xs">{exp.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-12">
                    <div>
                        <h2 className="text-sm font-bold uppercase text-red-600 tracking-widest mb-3 font-headline">Education</h2>
                        {education?.map((edu: any, i: number) => (
                            <div key={i} className="mb-2">
                                <h3 className="text-md font-semibold">{edu.degree}</h3>
                                <p className="text-sm">{edu.school}</p>
                                <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-sm font-bold uppercase text-red-600 tracking-widest mb-3 font-headline">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills?.map((skill: any, i: number) => (
                                <span key={i} className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">{skill.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    case 'kyoto':
        return (
            <div className="p-10 font-serif bg-cream-50 text-gray-700 min-h-full text-sm leading-relaxed">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-thin tracking-widest font-headline">{personalInfo?.name}</h1>
                    <p className="text-lg text-gray-500 mt-2 tracking-wider">{personalInfo?.role}</p>
                </div>

                <div className="flex justify-center text-xs gap-x-6 mb-8 text-gray-500">
                    <span>{personalInfo?.phone}</span>
                    <span>{personalInfo?.email}</span>
                    <span>{personalInfo?.location}</span>
                </div>

                <div className="mb-6 border-t border-gray-300 pt-6">
                    <p className="text-center text-xs italic">{summary}</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-center text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-4 font-headline">EXPERIENCE</h2>
                    {experience?.map((exp: any, i: number) => (
                        <div key={i} className="mb-4 text-center">
                            <h3 className="font-bold">{exp.jobTitle} at {exp.company}</h3>
                            <p className="text-xs text-gray-500 mb-1">{exp.startDate} - {exp.endDate}</p>
                            <p className="text-xs text-gray-600">{exp.description}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-x-12 border-t border-gray-300 pt-6">
                    <div>
                        <h2 className="text-center text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-4 font-headline">EDUCATION</h2>
                        {education?.map((edu: any, i: number) => (
                            <div key={i} className="mb-2 text-center">
                                <h3 className="font-bold">{edu.degree}</h3>
                                <p className="text-xs">{edu.school}</p>
                                <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-center text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-4 font-headline">SKILLS</h2>
                        <p className="text-center text-xs">{skills?.map((skill: any) => skill.name).join(' / ')}</p>
                    </div>
                </div>
            </div>
        );
    case 'dubai':
        return (
            <div className="p-8 font-body bg-gray-900 text-white min-h-full text-sm flex">
                <div className="w-1/3 bg-gray-800 p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-amber-400 font-headline">{personalInfo?.name}</h1>
                        <p className="text-lg text-gray-300 mt-1">{personalInfo?.role}</p>
                    </div>
                    <div>
                        <div className="mb-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-2 font-headline">Contact</h2>
                            <div className="text-xs space-y-1">
                                <p>{personalInfo?.email}</p>
                                <p>{personalInfo?.phone}</p>
                                <p>{personalInfo?.location}</p>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-2 font-headline">Skills</h2>
                            <div className="flex flex-wrap gap-2 text-xs">
                                {skills?.map((skill: any, i: number) => (
                                    <span key={i} className="bg-gray-700 text-amber-300 px-2 py-1 rounded">{skill.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/3 p-8">
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-amber-400 border-b-2 border-amber-500 pb-2 mb-3 font-headline">Summary</h2>
                        <p className="leading-relaxed text-gray-300">{summary}</p>
                    </section>
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-amber-400 border-b-2 border-amber-500 pb-2 mb-3 font-headline">Experience</h2>
                        {experience?.map((exp: any, i: number) => (
                            <div key={i} className="mb-4">
                                <h3 className="text-md font-bold">{exp.jobTitle}</h3>
                                <p className="text-sm text-gray-400 italic">{exp.company} / {exp.startDate} - {exp.endDate}</p>
                                <p className="mt-1 text-xs text-gray-300">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-amber-400 border-b-2 border-amber-500 pb-2 mb-3 font-headline">Education</h2>
                        {education?.map((edu: any, i: number) => (
                            <div key={i} className="mb-2">
                                <h3 className="text-md font-bold">{edu.degree}</h3>
                                <p className="text-sm text-gray-400">{edu.school}</p>
                                <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        );
    case 'mumbai':
        return (
            <div className="p-8 font-body bg-white text-gray-800 min-h-full text-sm">
                <div className="relative text-center pb-4">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500"></div>
                    <h1 className="text-4xl font-bold text-gray-900 mt-8 font-headline">{personalInfo?.name}</h1>
                    <p className="text-lg text-purple-600">{personalInfo?.role}</p>
                    <div className="flex justify-center text-xs gap-4 mt-2 text-gray-500">
                        <span>{personalInfo?.phone}</span>
                        <span>{personalInfo?.email}</span>
                        <span>{personalInfo?.location}</span>
                    </div>
                </div>
                <section className="mt-6">
                    <h2 className="text-md font-bold text-purple-700 tracking-wider mb-2 font-headline">SUMMARY</h2>
                    <p className="leading-relaxed text-xs border-l-2 border-purple-200 pl-4">{summary}</p>
                </section>
                <section className="mt-6">
                    <h2 className="text-md font-bold text-pink-700 tracking-wider mb-2 font-headline">EXPERIENCE</h2>
                    {experience?.map((exp: any, i: number) => (
                        <div key={i} className="mb-3">
                            <h3 className="font-semibold text-md">{exp.jobTitle} at <span className="text-pink-600">{exp.company}</span></h3>
                            <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            <p className="text-xs mt-1">{exp.description}</p>
                        </div>
                    ))}
                </section>
                <section className="mt-6 grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-md font-bold text-orange-700 tracking-wider mb-2 font-headline">EDUCATION</h2>
                        {education?.map((edu: any, i: number) => (
                            <div key={i} className="mb-2">
                                <h3 className="font-semibold text-md">{edu.degree}</h3>
                                <p className="text-xs">{edu.school} ({edu.graduationDate})</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-md font-bold text-green-700 tracking-wider mb-2 font-headline">SKILLS</h2>
                        <div className="flex flex-wrap gap-2 text-xs">
                            {skills?.map((skill: any, i: number) => (
                                <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{skill.name}</span>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    case 'rio':
        return (
            <div className="p-8 font-body bg-white text-gray-800 min-h-full text-sm relative overflow-hidden">
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-yellow-300 rounded-full opacity-50"></div>
                <div className="absolute -bottom-24 -right-12 w-64 h-64 bg-green-300 rounded-full opacity-50"></div>
                <div className="relative z-10">
                    <header className="text-left mb-8">
                        <h1 className="text-5xl font-extrabold text-blue-800 font-headline">{personalInfo?.name}</h1>
                        <p className="text-xl text-gray-600">{personalInfo?.role}</p>
                    </header>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2">
                            <section className="mb-6">
                                <h2 className="text-lg font-bold text-blue-700 mb-2 font-headline">Summary</h2>
                                <p className="text-xs leading-relaxed">{summary}</p>
                            </section>
                            <section>
                                <h2 className="text-lg font-bold text-blue-700 mb-2 font-headline">Experience</h2>
                                {experience?.map((exp: any, i: number) => (
                                    <div key={i} className="mb-3">
                                        <h3 className="font-bold">{exp.jobTitle}</h3>
                                        <p className="text-sm italic text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                                        <p className="text-xs mt-1">{exp.description}</p>
                                    </div>
                                ))}
                            </section>
                        </div>
                        <div className="col-span-1 text-xs space-y-6">
                            <section>
                                <h2 className="font-bold text-green-700 mb-2 font-headline">CONTACT</h2>
                                <p>{personalInfo?.email}</p>
                                <p>{personalInfo?.phone}</p>
                                <p>{personalInfo?.location}</p>
                            </section>
                            <section>
                                <h2 className="font-bold text-green-700 mb-2 font-headline">EDUCATION</h2>
                                {education?.map((edu: any, i: number) => (
                                    <div key={i}>
                                        <h3 className="font-semibold">{edu.degree}</h3>
                                        <p>{edu.school}</p>
                                        <p>{edu.graduationDate}</p>
                                    </div>
                                ))}
                            </section>
                            <section>
                                <h2 className="font-bold text-green-700 mb-2 font-headline">SKILLS</h2>
                                <div className="flex flex-wrap gap-1">
                                    {skills?.map((skill: any, i: number) => <span key={i} className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-[10px]">{skill.name}</span>)}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    case 'zurich':
        return (
            <div className="p-8 font-body bg-gray-50 text-gray-900 min-h-full text-sm">
                <header className="flex justify-between items-center pb-4 border-b border-gray-300">
                    <h1 className="text-3xl font-semibold tracking-tighter font-headline">{personalInfo?.name}</h1>
                    <p className="text-md text-gray-600">{personalInfo?.role}</p>
                </header>
                <div className="grid grid-cols-12 gap-8 mt-6 text-xs">
                    <div className="col-span-4 space-y-6">
                        <section>
                            <h2 className="font-bold tracking-widest text-gray-500 uppercase mb-2 text-[10px] font-headline">Info</h2>
                            <p>{personalInfo?.email}</p>
                            <p>{personalInfo?.phone}</p>
                            <p>{personalInfo?.location}</p>
                        </section>
                        <section>
                            <h2 className="font-bold tracking-widest text-gray-500 uppercase mb-2 text-[10px] font-headline">Skills</h2>
                            <div className="flex flex-col gap-1">
                                {skills?.map((skill: any, i: number) => <p key={i}>{skill.name}</p>)}
                            </div>
                        </section>
                        <section>
                            <h2 className="font-bold tracking-widest text-gray-500 uppercase mb-2 text-[10px] font-headline">Education</h2>
                             {education?.map((edu: any, i: number) => (
                                <div key={i}>
                                    <h3 className="font-semibold">{edu.degree}</h3>
                                    <p className="text-gray-600">{edu.school}</p>
                                    <p className="text-gray-600">{edu.graduationDate}</p>
                                </div>
                            ))}
                        </section>
                    </div>
                    <div className="col-span-8">
                        <section className="mb-6">
                            <h2 className="font-bold tracking-widest text-gray-500 uppercase mb-2 text-[10px] font-headline">Summary</h2>
                            <p className="leading-relaxed">{summary}</p>
                        </section>
                        <section>
                             <h2 className="font-bold tracking-widest text-gray-500 uppercase mb-2 text-[10px] font-headline">Experience</h2>
                            {experience?.map((exp: any, i: number) => (
                                <div key={i} className="mb-4">
                                    <h3 className="font-semibold text-sm">{exp.jobTitle}</h3>
                                    <p className=" text-gray-600">{exp.company}</p>
                                    <p className="text-gray-500 text-[10px]">{exp.startDate} - {exp.endDate}</p>
                                    <p className="mt-1 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        );
     case 'mexico-city':
      return (
        <div className="font-body min-h-full flex text-sm">
          <div className="w-1/3 bg-blue-800 text-white p-8 flex flex-col items-center text-center">
             <h1 className="text-2xl font-bold font-headline">{personalInfo?.name}</h1>
            <p className="text-sm text-blue-200">{personalInfo?.role}</p>
            <div className="text-xs space-y-4 mt-8">
              <section>
                <h2 className="font-bold uppercase tracking-wider mb-2 font-headline">Contact</h2>
                <p>{personalInfo?.email}</p>
                <p>{personalInfo?.phone}</p>
                <p>{personalInfo?.location}</p>
              </section>
              <section>
                <h2 className="font-bold uppercase tracking-wider mb-2 font-headline">Education</h2>
                {education?.map((edu: any, i: number) => (
                  <div key={i}>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p>{edu.school}</p>
                    <p>{edu.graduationDate}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
          <div className="w-2/3 p-8 bg-white">
            <section className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-3 font-headline">Summary</h2>
              <p className="leading-relaxed">{summary}</p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-3 font-headline">Experience</h2>
              {experience?.map((exp: any, i: number) => (
                <div key={i} className="mb-4">
                  <h3 className="text-md font-bold">{exp.jobTitle} at <span className="text-blue-700">{exp.company}</span></h3>
                  <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  <p className="mt-1 leading-relaxed text-xs">{exp.description}</p>
                </div>
              ))}
            </section>
             <section>
              <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-3 font-headline">Skills</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                 {skills?.map((skill: any, i: number) => <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md">{skill.name}</span>)}
              </div>
            </section>
          </div>
        </div>
      );
    case 'dublin': // Simple
    default:
      return (
        <div className="p-8 font-body bg-white text-slate-800 min-h-full text-sm">
            <div className="bg-indigo-700 text-white p-6 -m-8 mb-6">
                <h1 className="text-4xl font-bold font-headline">{personalInfo?.name}</h1>
                <p className="text-lg text-indigo-200 font-light mt-1">{personalInfo?.role}</p>
                <div className="flex justify-between mt-2 text-xs text-indigo-200">
                    <span>{personalInfo?.phone}</span>
                    <span>{personalInfo?.email}</span>
                    <span>{personalInfo?.location}</span>
                    <span>{personalInfo?.website}</span>
                </div>
            </div>

            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase text-indigo-700 tracking-wider mb-2 font-headline">Professional Summary</h2>
                <p className="text-slate-700 leading-relaxed">{summary}</p>
            </section>
            
            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase text-indigo-700 tracking-wider mb-2 font-headline">Work Experience</h2>
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
                    <h2 className="text-lg font-bold uppercase text-indigo-700 tracking-wider mb-2 font-headline">Education</h2>
                    {education?.map((edu:any, i:number) => (
                        <div key={i} className="mb-3">
                            <h3 className="text-md font-bold text-slate-800">{edu.degree}</h3>
                            <p className="text-sm text-slate-700">{edu.school}</p>
                            <p className="text-xs text-slate-500">{edu.graduationDate}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h2 className="text-lg font-bold uppercase text-indigo-700 tracking-wider mb-2 font-headline">Skills</h2>
                    <ul className="flex flex-wrap gap-2 mt-2">
                        {skills?.map((skill: any, i:number) => <li key={i} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-md">{skill.name}</li>)}
                    </ul>
                </div>
            </section>
        </div>
      );
  }
};
