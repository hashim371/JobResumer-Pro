
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

  const renderSectionTitle = (title: string, customClasses: string = "") => (
    <h2 className={`text-sm font-bold text-slate-600 border-b-2 border-slate-200 pb-1 mb-3 uppercase tracking-widest ${customClasses}`}>{title}</h2>
  );

  const renderExperience = (exp: any) => (
    <div key={exp.company + exp.jobTitle} className="mb-4 break-inside-avoid">
        <div className="flex justify-between items-baseline">
            <h3 className="text-md font-semibold text-slate-800">{exp.jobTitle}</h3>
            <div className="text-xs text-slate-500 font-medium">{exp.startDate} - {exp.endDate}</div>
        </div>
        <h4 className="text-sm font-medium text-slate-600">{exp.company}</h4>
        <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
            <li>{exp.description}</li>
            <li>Additional achievement or responsibility.</li>
        </ul>
    </div>
  );

  const renderEducation = (edu: any) => (
      <div key={edu.school + edu.degree} className="mb-3 break-inside-avoid">
         <div className="flex justify-between items-baseline">
            <h3 className="text-md font-semibold text-slate-800">{edu.degree}</h3>
            <div className="text-xs text-slate-500 font-medium">{edu.graduationDate}</div>
        </div>
        <p className="text-sm text-slate-700">{edu.school}</p>
      </div>
  );


  // Different Template Layouts
  switch (templateId) {
    case 'tokyo':
    case 'berlin':
       return (
        <div className="font-sans bg-white text-slate-800 min-h-full text-sm leading-relaxed flex">
            {/* Sidebar */}
            <div className="w-1/3 bg-slate-800 text-white p-6 flex flex-col">
                <div className="text-center mb-8">
                    {/* Photo */}
                    <div className="w-24 h-24 rounded-full bg-slate-500 mx-auto mb-4 border-4 border-slate-400 shadow-md"></div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">{personalInfo?.name}</h1>
                    <p className="text-sm text-slate-300">Software Engineer</p>
                </div>

                {/* Contact Info */}
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-500 pb-1 mb-3">Details</h2>
                <div className="flex flex-col gap-2 mt-2 text-xs text-slate-300 mb-6">
                    <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 004.28 4.28l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                        <span>{personalInfo?.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                        <span className="break-all">{personalInfo?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                        <span>{personalInfo?.location}</span>
                    </div>
                </div>
                
                {/* Skills */}
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-500 pb-1 mb-3">Skills</h2>
                <ul className="text-xs text-slate-300 space-y-2 mt-2">
                   {skills?.map((skill: any) => <li key={skill.name}>{skill.name}</li>)}
                </ul>
                <div className="mt-auto pt-6 text-center text-slate-500 text-[10px]">
                    <p>{personalInfo?.website}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-700 border-b-2 border-slate-300 pb-2 mb-4">Profile</h2>
                    <p className="text-sm text-slate-600 mb-6">{summary}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-700 border-b-2 border-slate-300 pb-2 mb-4">Employment History</h2>
                    {experience?.map(renderExperience)}
                </div>
                 <div>
                    <h2 className="text-xl font-bold text-slate-700 border-b-2 border-slate-300 pb-2 mb-4">Education</h2>
                    {education?.map(renderEducation)}
                </div>
            </div>
        </div>
      );

    case 'geneva':
    case 'madrid':
    case 'seoul':
        return (
            <div className="p-8 font-serif bg-white text-slate-800 min-h-full text-sm leading-relaxed">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold tracking-tight text-slate-800">{personalInfo?.name}</h1>
                    <p className="text-lg text-slate-500 mt-2">Software Engineer</p>
                </div>

                <div className="mb-8 border-y-2 border-slate-200 py-3 text-center text-xs">
                     <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-1 text-slate-600">
                        <span>{personalInfo?.location}</span>
                        <span>&bull;</span>
                        <span>{personalInfo?.phone}</span>
                        <span>&bull;</span>
                        <span>{personalInfo?.email}</span>
                        {personalInfo?.website && <><span>&bull;</span><a href="#" className="text-blue-600 hover:underline">{personalInfo?.website}</a></>}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-x-12">
                   {/* Main column */}
                   <div className="col-span-2">
                        <div>
                            {renderSectionTitle('Profile', 'font-serif')}
                            <p className="text-sm text-slate-600 mb-6">{summary}</p>
                        </div>
                        <div>
                            {renderSectionTitle('Experience', 'font-serif')}
                            {experience?.map(renderExperience)}
                        </div>
                   </div>
                   {/* Sidebar */}
                   <div className="col-span-1">
                        {renderSectionTitle('Education', 'font-serif')}
                        {education?.map(renderEducation)}
                        
                        <div className="mt-6">
                            {renderSectionTitle('Skills', 'font-serif')}
                            <div className="flex flex-wrap gap-2 mt-2">
                            {skills?.map((skill: any) => <span key={skill.name} className="bg-slate-200 text-slate-700 text-xs font-medium px-3 py-1 rounded-full">{skill.name}</span>)}
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        )

    default: // Simple, ATS, Word, Google Docs templates
      return (
        <div className="p-8 font-sans bg-white text-slate-800 min-h-full text-sm leading-relaxed">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-slate-800">{personalInfo?.name}</h1>
                 <p className="text-lg text-slate-500 mt-1">Software Engineer</p>
                <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-4 text-xs text-slate-600">
                    <span>{personalInfo?.location}</span>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <span>{personalInfo?.phone}</span>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <span>{personalInfo?.email}</span>
                    {personalInfo?.website && <><span className="hidden sm:inline text-slate-300">|</span><a href="#" className="text-blue-600 hover:underline">{personalInfo?.website}</a></>}
                </div>
            </div>
            
            <hr className="my-6 border-slate-200" />

            <div>
                {renderSectionTitle('Profile', 'text-indigo-600 border-indigo-200')}
                <p className="text-sm text-slate-600 mb-6">{summary}</p>
            </div>
            <div>
                {renderSectionTitle('Employment History', 'text-indigo-600 border-indigo-200')}
                {experience?.map(renderExperience)}
            </div>
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    {renderSectionTitle('Education', 'text-indigo-600 border-indigo-200')}
                    {education?.map(renderEducation)}
                </div>
                <div>
                    {renderSectionTitle('Skills', 'text-indigo-600 border-indigo-200')}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {skills?.map((skill: any) => <span key={skill.name} className="bg-slate-100 text-slate-800 text-sm font-medium px-4 py-1 rounded-md">{skill.name}</span>)}
                    </div>
                </div>
            </div>
        </div>
      );
  }
};
