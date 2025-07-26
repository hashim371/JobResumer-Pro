
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

  const renderSimpleHeader = () => (
    <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800">{personalInfo?.name}</h1>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-600">
            <span>{personalInfo?.email}</span>
            <span className="hidden sm:inline">|</span>
            <span>{personalInfo?.phone}</span>
            <span className="hidden sm:inline">|</span>
            <span>{personalInfo?.location}</span>
            {personalInfo?.website && <><span className="hidden sm:inline">|</span><span>{personalInfo?.website}</span></>}
        </div>
    </div>
  );

  const renderPictureHeader = () => (
    <div className="flex items-center mb-8">
        <div className="w-28 h-28 rounded-full bg-slate-300 mr-8 shrink-0 flex-shrink-0"></div>
        <div className="flex-grow">
            <h1 className="text-5xl font-bold tracking-tight text-slate-800">{personalInfo?.name}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-600">
                <span>{personalInfo?.email}</span>
                <span>{personalInfo?.phone}</span>
                <span>{personalInfo?.location}</span>
                {personalInfo?.website && <span>{personalInfo?.website}</span>}
            </div>
        </div>
    </div>
  );

  const renderSectionTitle = (title: string, customClasses: string = "") => (
    <h2 className={`text-lg font-bold text-slate-700 border-b-2 border-slate-300 pb-1 mb-4 uppercase tracking-wider ${customClasses}`}>{title}</h2>
  );

  const renderExperience = (exp: any) => (
    <div key={exp.company + exp.jobTitle} className="mb-4 break-inside-avoid">
        <div className="flex justify-between items-baseline">
            <h3 className="text-md font-semibold text-slate-800">{exp.jobTitle}</h3>
            <div className="text-xs text-slate-500 font-medium">{exp.startDate} - {exp.endDate}</div>
        </div>
        <h4 className="text-sm font-medium text-slate-600">{exp.company}</h4>
        <p className="text-sm text-slate-600 mt-1">{exp.description}</p>
    </div>
  );

  const renderEducation = (edu: any) => (
      <div key={edu.school + edu.degree} className="mb-3 break-inside-avoid">
         <div className="flex justify-between items-baseline">
            <h3 className="text-md font-semibold text-slate-800">{edu.school}</h3>
            <div className="text-xs text-slate-500 font-medium">{edu.graduationDate}</div>
        </div>
        <p className="text-sm text-slate-700">{edu.degree}</p>
      </div>
  );


  // Different Template Layouts
  switch (templateId) {
    case 'tokyo':
    case 'berlin':
      return (
        <div className="p-8 font-serif bg-white text-slate-800 min-h-full text-sm leading-relaxed">
            <div className="flex gap-8">
                <div className="w-1/3 bg-slate-100 p-6 rounded-md">
                    <div className="text-center mb-6">
                         <div className="w-24 h-24 rounded-full bg-slate-300 mx-auto mb-4"></div>
                         <h1 className="text-2xl font-bold tracking-tight text-slate-800">{personalInfo?.name}</h1>
                    </div>
                     <div className="flex flex-col text-center gap-1 mt-2 text-xs text-slate-600 mb-6">
                        <span>{personalInfo?.email}</span>
                        <span>{personalInfo?.phone}</span>
                        <span>{personalInfo?.location}</span>
                        {personalInfo?.website && <span>{personalInfo?.website}</span>}
                    </div>
                    <hr className="my-6 border-slate-300"/>
                    
                    {renderSectionTitle('Skills', 'text-sm text-center')}
                    <ul className="text-center text-xs text-slate-600 space-y-1">
                       {skills?.map((skill: any) => <li key={skill.name}>{skill.name}</li>)}
                    </ul>
                    
                    <hr className="my-6 border-slate-300"/>
                    {renderSectionTitle('Education', 'text-sm text-center')}
                    {education?.map(renderEducation)}
                </div>

                <div className="w-2/3">
                    {renderSectionTitle('Professional Summary')}
                    <p className="text-xs text-slate-600 mb-6">{summary}</p>
                    {renderSectionTitle('Work Experience')}
                    {experience?.map(renderExperience)}
                </div>
            </div>
        </div>
      );

    case 'geneva':
    case 'madrid':
    case 'seoul':
        return (
            <div className="p-10 font-sans bg-white text-slate-800 min-h-full text-sm leading-relaxed">
                {renderPictureHeader()}
                <hr className="border-t-2 border-slate-300 -mt-2 mb-6" />
                <div>
                    {renderSectionTitle('Professional Summary')}
                    <p className="text-xs text-slate-600 mb-6">{summary}</p>
                </div>
                <div>
                    {renderSectionTitle('Work Experience')}
                    {experience?.map(renderExperience)}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-x-12">
                    <div>
                        {renderSectionTitle('Education')}
                        {education?.map(renderEducation)}
                    </div>
                    <div>
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
        <div className="p-10 font-sans bg-white text-slate-800 min-h-full text-sm leading-relaxed">
            {renderSimpleHeader()}
            <div>
                {renderSectionTitle('Professional Summary')}
                <p className="text-xs text-slate-600 mb-6">{summary}</p>
            </div>
            <div>
                {renderSectionTitle('Work Experience')}
                {experience?.map(renderExperience)}
            </div>
            <div className="mt-6 columns-2 gap-x-12">
              <div className="break-inside-avoid">
                  {renderSectionTitle('Education')}
                  {education?.map(renderEducation)}
              </div>
              <div className="break-inside-avoid">
                  {renderSectionTitle('Skills')}
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                     {skills?.map((skill: any) => <li key={skill.name}>{skill.name}</li>)}
                  </ul>
              </div>
            </div>
        </div>
      );
  }
};
