
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
    case 'new-york':
        return (
            <div className="p-8 font-serif bg-white text-gray-800 min-h-full text-sm leading-relaxed">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">{personalInfo?.name}</h1>
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
        <div className="p-8 font-sans bg-white text-slate-800 min-h-full text-sm">
            <h1 className="text-3xl font-bold text-slate-900">{personalInfo?.name}</h1>
            <div className="flex flex-wrap gap-x-4 text-xs mt-1 text-slate-600">
                <span>{personalInfo?.phone}</span>
                <span>{personalInfo?.email}</span>
                <span>{personalInfo?.location}</span>
                <span>{personalInfo?.website}</span>
            </div>

            <section className="mt-6">
                <h2 className="text-md font-bold uppercase text-slate-700 tracking-wider border-b border-slate-300 pb-1 mb-2">Professional Summary</h2>
                <p className="text-slate-700 leading-relaxed text-xs">{summary}</p>
            </section>
            
            <section className="mt-4">
                <h2 className="text-md font-bold uppercase text-slate-700 tracking-wider border-b border-slate-300 pb-1 mb-2">Work Experience</h2>
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
                <h2 className="text-md font-bold uppercase text-slate-700 tracking-wider border-b border-slate-300 pb-1 mb-2">Education</h2>
                {education?.map((edu:any, i:number) => (
                    <div key={i} className="mb-2">
                        <h3 className="text-sm font-bold text-slate-800">{edu.degree}</h3>
                        <p className="text-xs text-slate-700">{edu.school}</p>
                        <p className="text-xs text-slate-500">{edu.graduationDate}</p>
                    </div>
                ))}
            </section>

            <section className="mt-4">
                <h2 className="text-md font-bold uppercase text-slate-700 tracking-wider border-b border-slate-300 pb-1 mb-2">Skills</h2>
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
        return (
            <div className="p-10 font-serif bg-white text-gray-900 min-h-full text-[10.5pt] leading-normal">
                <div className="text-center">
                    <h1 className="text-3xl tracking-widest font-light uppercase">{personalInfo?.name}</h1>
                    <div className="text-xs text-gray-500 mt-2">
                        {personalInfo?.location} &bull; {personalInfo?.phone} &bull; {personalInfo?.email} {personalInfo?.website && <> &bull; {personalInfo?.website}</>}
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-[11pt] font-semibold tracking-[.2em] text-center uppercase border-y border-gray-400 py-1 my-3">Summary</h2>
                    <p className="text-center">{summary}</p>
                </div>

                <div className="mt-5">
                    <h2 className="text-[11pt] font-semibold tracking-[.2em] text-center uppercase border-y border-gray-400 py-1 my-3">Experience</h2>
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
                    <h2 className="text-[11pt] font-semibold tracking-[.2em] text-center uppercase border-y border-gray-400 py-1 my-3">Education</h2>
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
                    <h2 className="text-[11pt] font-semibold tracking-[.2em] text-center uppercase border-y border-gray-400 py-1 my-3">Skills</h2>
                     <p className="text-center">{skills?.map((skill: any) => skill.name).join(' &bull; ')}</p>
                </div>
            </div>
        )
    
    case 'london':
    case 'tokyo':
    case 'helsinki':
        return (
             <div className="p-8 font-sans bg-white text-gray-800 min-h-full text-sm">
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <h1 className="text-5xl font-extrabold text-blue-800 mb-2">{personalInfo?.name}</h1>
                        <p className="text-lg font-light text-gray-600">Software Engineer</p>
                    </div>
                    <div className="text-right text-xs">
                        <p className="break-words">{personalInfo?.email}</p>
                        <p>{personalInfo?.phone}</p>
                        <p>{personalInfo?.location}</p>
                        <p className="break-words">{personalInfo?.website}</p>
                    </div>
                </div>

                <div className="mt-8 border-t-2 border-blue-800 pt-6">
                    <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider mb-3">About Me</h2>
                    <p className="leading-relaxed">{summary}</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider mb-3">Experience</h2>
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
                        <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider mb-3">Education</h2>
                        {education?.map((edu: any, i: number) => (
                            <div key={i} className="mb-3">
                                <h3 className="font-bold">{edu.degree}</h3>
                                <p className="text-sm">{edu.school}</p>
                                <p className="text-xs text-gray-600">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                     <div>
                        <h2 className="text-lg font-bold uppercase text-blue-800 tracking-wider mb-3">Skills</h2>
                        <ul className="list-disc list-inside space-y-1">
                          {skills?.map((skill: any, i:number) => <li key={i}>{skill.name}</li>)}
                        </ul>
                    </div>
                </div>

            </div>
        )

    case 'berlin': 
    case 'oslo':
      return (
        <div className="font-sans bg-white text-gray-800 min-h-full flex text-sm">
          <div className="w-1/3 bg-gray-100 p-8 text-gray-800 flex flex-col">
            <div className="text-center mb-8">
                 <div className="w-24 h-24 mx-auto mb-4">
                    <img src={'https://placehold.co/120x120.png'} alt="Portrait" className="rounded-full shadow-md" data-ai-hint="professional portrait" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{personalInfo?.name}</h1>
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase text-gray-600 tracking-wider mb-3">Contact</h2>
              <div className="text-xs space-y-1">
                <p className="break-words">{personalInfo?.email}</p>
                <p>{personalInfo?.phone}</p>
                <p>{personalInfo?.location}</p>
                <p className="break-words">{personalInfo?.website}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase text-gray-600 tracking-wider mb-3">Skills</h2>
              <ul className="text-xs space-y-1">
                {skills?.map((skill: any, i: number) => <li key={i} className="bg-gray-200 px-2 py-1 rounded-sm">{skill.name}</li>)}
              </ul>
            </div>
             <div className="mt-auto">
              <h2 className="text-sm font-bold uppercase text-gray-600 tracking-wider mb-3">Education</h2>
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
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">Summary</h2>
                <p className="leading-relaxed text-sm">{summary}</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">Experience</h2>
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
        const photoUrl = 'https://placehold.co/120x120.png';
        return (
            <div className="p-8 font-sans bg-white text-gray-700 min-h-full text-sm">
                <div className="flex items-center mb-6 pb-6 border-b-2 border-teal-500">
                    <div className="w-32 h-32 mr-6 shrink-0">
                        <img src={photoUrl} alt="Portrait" className="rounded-full shadow-md w-full h-full object-cover" data-ai-hint="professional portrait" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-extrabold text-teal-700">{personalInfo?.name}</h1>
                        <p className="text-xl text-gray-500 mt-1">Software Engineer</p>
                    </div>
                </div>
                <div className="flex justify-start text-xs gap-6 mb-6">
                    <p>📧 {personalInfo?.email}</p>
                    <p>📞 {personalInfo?.phone}</p>
                    <p>📍 {personalInfo?.location}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3 border-b border-teal-200 pb-1">Summary</h2>
                    <p className="leading-relaxed">{summary}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3 border-b border-teal-200 pb-1">Experience</h2>
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
                        <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3 border-b border-teal-200 pb-1">Education</h2>
                        {education?.map((edu: any, i:number) => (
                             <div key={i} className="mb-2">
                                <p className="font-semibold text-md">{edu.degree}</p>
                                <p className="text-sm">{edu.school}</p>
                                <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3 border-b border-teal-200 pb-1">Skills</h2>
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
             <div className="p-8 font-sans bg-white text-gray-800 min-h-full text-sm">
                <div className="text-center pb-4 border-b-4 border-rose-300">
                    <h1 className="text-4xl font-bold text-rose-800">{personalInfo?.name}</h1>
                    <p className="text-md text-gray-500 mt-1">Software Engineer</p>
                </div>
                 <div className="flex justify-center text-xs gap-4 mt-4 text-gray-600">
                    <span>{personalInfo?.phone}</span>
                    <span>&bull;</span>
                    <span className="break-words">{personalInfo?.email}</span>
                     <span>&bull;</span>
                    <span>{personalInfo?.location}</span>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold uppercase text-rose-700 tracking-wider mb-2 text-center">Summary</h2>
                    <p className="leading-relaxed text-center text-xs">{summary}</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold uppercase text-rose-700 tracking-wider mb-3 text-center">Experience</h2>
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
                        <h2 className="text-lg font-semibold uppercase text-rose-700 tracking-wider mb-2 text-center">Education</h2>
                        {education?.map((edu: any, i: number) => (
                            <div key={i} className="mb-3 text-center">
                                <h3 className="font-bold">{edu.degree}</h3>
                                <p className="text-sm">{edu.school}</p>
                                <p className="text-xs text-gray-600">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                     <div>
                        <h2 className="text-lg font-semibold uppercase text-rose-700 tracking-wider mb-2 text-center">Skills</h2>
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
        <div className="font-sans min-h-full flex text-sm">
          <div className="w-1/3 bg-orange-500 text-white p-8 flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{personalInfo?.name}</h1>
            <p className="text-md text-orange-100 mb-8">Software Engineer</p>
            <div className="mb-6">
              <h2 className="text-md font-semibold uppercase tracking-wider mb-2">Contact</h2>
              <div className="text-xs space-y-1 text-orange-100">
                <p className="break-words">{personalInfo?.email}</p>
                <p>{personalInfo?.phone}</p>
                <p>{personalInfo?.location}</p>
                <p className="break-words">{personalInfo?.website}</p>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-md font-semibold uppercase tracking-wider mb-2">Skills</h2>
              <ul className="text-xs flex flex-wrap gap-2">
                {skills?.map((skill: any, i: number) => <li key={i} className="bg-orange-400 px-2 py-1 rounded">{skill.name}</li>)}
              </ul>
            </div>
            <div className="mt-auto">
              <h2 className="text-md font-semibold uppercase tracking-wider mb-2">Education</h2>
              {education?.map((edu: any, i: number) => (
                <div key={i} className="mb-3 text-xs">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-orange-200">{edu.school}</p>
                  <p className="text-orange-200">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/3 p-8 bg-white">
            <section className="mb-6">
              <h2 className="text-xl font-bold text-orange-600 border-b-2 border-orange-200 pb-2 mb-3">Summary</h2>
              <p className="leading-relaxed">{summary}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-orange-600 border-b-2 border-orange-200 pb-2 mb-3">Experience</h2>
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
        <div className="p-8 font-sans bg-sky-950 text-white min-h-full text-sm">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight">{personalInfo?.name}</h1>
            <div className="flex justify-center gap-x-4 text-xs mt-2 text-sky-300">
              <span>{personalInfo?.phone}</span>
              <span>&bull;</span>
              <span className="break-words">{personalInfo?.email}</span>
              <span>&bull;</span>
              <span>{personalInfo?.location}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-sky-700 mb-3 text-sky-300">Summary</h2>
            <p className="text-sky-100">{summary}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-sky-700 mb-3 text-sky-300">Experience</h2>
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
              <h2 className="text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-sky-700 mb-3 text-sky-300">Education</h2>
              {education?.map((edu: any, i: number) => (
                <div key={i} className="mb-2">
                  <h3 className="font-bold text-sky-100">{edu.degree}</h3>
                  <p className="text-sky-200">{edu.school}</p>
                  <p className="text-xs text-sky-400">{edu.graduationDate}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-sky-700 mb-3 text-sky-300">Skills</h2>
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
        <div className="p-8 font-sans bg-white text-gray-700 min-h-full text-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-green-700">
            <div>
              <h1 className="text-4xl font-extrabold text-green-800">{personalInfo?.name}</h1>
              <p className="text-lg text-gray-500 mt-1">Software Engineer</p>
            </div>
            <div className="text-right text-xs">
              <p>Email: <span className="break-words font-semibold">{personalInfo?.email}</span></p>
              <p>Phone: <span className="font-semibold">{personalInfo?.phone}</span></p>
              <p>Location: <span className="font-semibold">{personalInfo?.location}</span></p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-2">Summary</h2>
            <p className="leading-relaxed text-xs">{summary}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-2">Experience</h2>
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
              <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-2">Education</h2>
              {education?.map((edu: any, i: number) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold text-md">{edu.degree}</p>
                  <p className="text-sm">{edu.school} - {edu.graduationDate}</p>
                </div>
              ))}
            </div>
            <div className="col-span-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills?.map((skill: any, i: number) => <span key={i} className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded">{skill.name}</span>)}
              </div>
            </div>
          </div>
        </div>
      )
    
    case 'warsaw':
        return (
          <div className="p-8 font-sans bg-white text-slate-800 min-h-full text-sm">
              <div className="bg-gray-800 text-white p-6 -m-8 mb-6">
                  <h1 className="text-4xl font-bold">{personalInfo?.name}</h1>
                  <div className="flex justify-between mt-2 text-xs text-gray-300">
                      <span>{personalInfo?.phone}</span>
                      <span>{personalInfo?.email}</span>
                      <span>{personalInfo?.location}</span>
                      <span>{personalInfo?.website}</span>
                  </div>
              </div>
  
              <section className="mb-6">
                  <h2 className="text-lg font-bold uppercase text-gray-700 tracking-wider mb-2">Professional Summary</h2>
                  <p className="text-slate-700 leading-relaxed">{summary}</p>
              </section>
              
              <section className="mb-6">
                  <h2 className="text-lg font-bold uppercase text-gray-700 tracking-wider mb-2">Work Experience</h2>
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
                      <h2 className="text-lg font-bold uppercase text-gray-700 tracking-wider mb-2">Education</h2>
                      {education?.map((edu:any, i:number) => (
                          <div key={i} className="mb-3">
                              <h3 className="text-md font-bold text-slate-800">{edu.degree}</h3>
                              <p className="text-sm text-slate-700">{edu.school}</p>
                              <p className="text-xs text-slate-500">{edu.graduationDate}</p>
                          </div>
                      ))}
                  </div>
  
                  <div>
                      <h2 className="text-lg font-bold uppercase text-gray-700 tracking-wider mb-2">Skills</h2>
                      <ul className="flex flex-wrap gap-2 mt-2">
                          {skills?.map((skill: any, i:number) => <li key={i} className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-md">{skill.name}</li>)}
                      </ul>
                  </div>
              </section>
          </div>
        );
    case 'dublin': // Simple
    default:
      return (
        <div className="p-8 font-sans bg-white text-slate-800 min-h-full text-sm">
            <div className="bg-indigo-700 text-white p-6 -m-8 mb-6">
                <h1 className="text-4xl font-bold">{personalInfo?.name}</h1>
                <div className="flex justify-between mt-2 text-xs text-indigo-200">
                    <span>{personalInfo?.phone}</span>
                    <span>{personalInfo?.email}</span>
                    <span>{personalInfo?.location}</span>
                    <span>{personalInfo?.website}</span>
                </div>
            </div>

            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase text-indigo-700 tracking-wider mb-2">Professional Summary</h2>
                <p className="text-slate-700 leading-relaxed">{summary}</p>
            </section>
            
            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase text-indigo-700 tracking-wider mb-2">Work Experience</h2>
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
                    <h2 className="text-lg font-bold uppercase text-indigo-700 tracking-wider mb-2">Education</h2>
                    {education?.map((edu:any, i:number) => (
                        <div key={i} className="mb-3">
                            <h3 className="text-md font-bold text-slate-800">{edu.degree}</h3>
                            <p className="text-sm text-slate-700">{edu.school}</p>
                            <p className="text-xs text-slate-500">{edu.graduationDate}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h2 className="text-lg font-bold uppercase text-indigo-700 tracking-wider mb-2">Skills</h2>
                    <ul className="flex flex-wrap gap-2 mt-2">
                        {skills?.map((skill: any, i:number) => <li key={i} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-md">{skill.name}</li>)}
                    </ul>
                </div>
            </section>
        </div>
      );
  }
};
