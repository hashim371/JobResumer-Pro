
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
            <div className="w-1/3 bg-slate-800 text-white p-6">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-slate-500 mx-auto mb-4 border-4 border-slate-400"></div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">{personalInfo?.name}</h1>
                    <p className="text-sm text-slate-300">Software Engineer</p>
                </div>

                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-500 pb-1 mb-3">Details</h2>
                <div className="flex flex-col gap-2 mt-2 text-xs text-slate-300 mb-6">
                    <span>{personalInfo?.phone}</span>
                    <span>{personalInfo?.email}</span>
                    <span>{personalInfo?.location}</span>
                    {personalInfo?.website && <span className="break-all">{personalInfo?.website}</span>}
                </div>
                
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-500 pb-1 mb-3">Skills</h2>
                <ul className="text-xs text-slate-300 space-y-2">
                   {skills?.map((skill: any) => <li key={skill.name}>{skill.name}</li>)}
                </ul>
            </div>

            <div className="w-2/3 p-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-700 pb-1 mb-4">Profile</h2>
                    <p className="text-sm text-slate-600 mb-6">{summary}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-700 pb-1 mb-4">Employment History</h2>
                    {experience?.map(renderExperience)}
                </div>
                 <div>
                    <h2 className="text-xl font-bold text-slate-700 pb-1 mb-4">Education</h2>
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
                <div className="flex items-center mb-6 border-b-4 border-slate-700 pb-6">
                    <div className="w-32 h-32 rounded-full bg-slate-300 mr-8 shrink-0 flex-shrink-0 border-4 border-white shadow-md"></div>
                    <div className="flex-grow">
                        <h1 className="text-5xl font-bold tracking-tight text-slate-800">{personalInfo?.name}</h1>
                        <p className="text-lg text-slate-500 mt-1">Software Engineer</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-x-12">
                   <div className="col-span-2">
                        <div>
                            {renderSectionTitle('Profile')}
                            <p className="text-sm text-slate-600 mb-6">{summary}</p>
                        </div>
                        <div>
                            {renderSectionTitle('Experience')}
                            {experience?.map(renderExperience)}
                        </div>
                   </div>
                   <div className="col-span-1">
                        {renderSectionTitle('Contact')}
                         <div className="flex flex-col gap-2 text-sm text-slate-600 mb-6">
                            <span>{personalInfo?.email}</span>
                            <span>{personalInfo?.phone}</span>
                            <span>{personalInfo?.location}</span>
                            {personalInfo?.website && <span className="break-all">{personalInfo?.website}</span>}
                        </div>

                        {renderSectionTitle('Education')}
                        {education?.map(renderEducation)}
                        
                        {renderSectionTitle('Skills')}
                        <div className="flex flex-wrap gap-2 mt-2">
                           {skills?.map((skill: any) => <span key={skill.name} className="bg-slate-200 text-slate-700 text-xs font-medium px-3 py-1 rounded-full">{skill.name}</span>)}
                        </div>
                   </div>
                </div>
            </div>
        )

    default: // Simple, ATS, Word, Google Docs templates
      return (
        <div className="p-8 font-sans bg-white text-slate-800 min-h-full text-sm leading-relaxed">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-slate-800">{personalInfo?.name}</h1>
                 <p className="text-lg text-slate-500 mt-1">Software Engineer</p>
                <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-4 text-sm text-slate-600">
                    <span>{personalInfo?.location}</span>
                    <span className="hidden sm:inline">|</span>
                    <span>{personalInfo?.phone}</span>
                    <span className="hidden sm:inline">|</span>
                    <span>{personalInfo?.email}</span>
                    {personalInfo?.website && <><span className="hidden sm:inline">|</span><a href="#" className="text-blue-600 hover:underline">{personalInfo?.website}</a></>}
                </div>
            </div>
            
            <hr className="my-6" />

            <div>
                {renderSectionTitle('Profile')}
                <p className="text-sm text-slate-600 mb-6">{summary}</p>
            </div>
            <div>
                {renderSectionTitle('Employment History')}
                {experience?.map(renderExperience)}
            </div>
            <div>
                {renderSectionTitle('Education')}
                {education?.map(renderEducation)}
            </div>
            <div>
                 {renderSectionTitle('Skills')}
                  <div className="flex flex-wrap gap-2 mt-2">
                     {skills?.map((skill: any) => <span key={skill.name} className="bg-slate-100 text-slate-800 text-sm font-medium px-4 py-1 rounded-md">{skill.name}</span>)}
                  </div>
            </div>
        </div>
      );
  }
};
