
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
  const data = initialData && initialData.personalInfo ? initialData : mockData;
  const { personalInfo, summary, experience, education, skills } = data;

  const renderSimpleHeader = () => (
    <div className="text-center mb-6 border-b-2 border-gray-200 pb-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-800">{personalInfo?.name}</h1>
        <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
            <span>{personalInfo?.email}</span>
            <span>{personalInfo?.phone}</span>
            <span>{personalInfo?.location}</span>
            {personalInfo?.website && <span>{personalInfo?.website}</span>}
        </div>
    </div>
  );

  const renderPictureHeader = () => (
    <div className="flex items-center mb-6 border-b-2 border-gray-200 pb-4">
        <div className="w-24 h-24 rounded-full bg-gray-300 mr-6 shrink-0 flex-shrink-0"></div>
        <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-800">{personalInfo?.name}</h1>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span>{personalInfo?.email}</span>
                <span>{personalInfo?.phone}</span>
                <span>{personalInfo?.location}</span>
                {personalInfo?.website && <span>{personalInfo?.website}</span>}
            </div>
        </div>
    </div>
  );

  const renderSectionTitle = (title: string) => (
    <h2 className="text-xl font-bold text-gray-700 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">{title}</h2>
  );

  const renderExperience = (exp: any) => (
    <div key={exp.company + exp.jobTitle} className="mb-4">
        <div className="flex justify-between items-baseline">
            <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
            <div className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</div>
        </div>
        <h4 className="text-md font-medium text-gray-700">{exp.company}</h4>
        <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
    </div>
  );

  const renderEducation = (edu: any) => (
      <div key={edu.school + edu.degree} className="mb-2">
         <div className="flex justify-between items-baseline">
            <h3 className="text-lg font-semibold text-gray-800">{edu.school}</h3>
            <div className="text-sm text-gray-600">{edu.graduationDate}</div>
        </div>
        <p className="text-md text-gray-700">{edu.degree}</p>
      </div>
  );


  // Different Template Layouts
  switch (templateId) {
    case 'tokyo':
    case 'berlin':
      return (
        <div className="p-8 font-serif bg-white text-gray-800 min-h-full">
            <div className="flex gap-8">
                <div className="w-1/3 pr-8 border-r border-gray-200">
                    <div className="text-center mb-6">
                         <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
                         <h1 className="text-3xl font-bold tracking-tight text-gray-800">{personalInfo?.name}</h1>
                    </div>
                     <div className="flex flex-col text-center gap-1 mt-2 text-sm text-gray-600 mb-6">
                        <span>{personalInfo?.email}</span>
                        <span>{personalInfo?.phone}</span>
                        <span>{personalInfo?.location}</span>
                        {personalInfo?.website && <span>{personalInfo?.website}</span>}
                    </div>

                    {renderSectionTitle('Skills')}
                    <ul className="list-disc list-inside text-sm text-gray-600">
                       {skills?.map((skill: any) => <li key={skill.name}>{skill.name}</li>)}
                    </ul>

                    <div className="mt-4">
                        {renderSectionTitle('Education')}
                        {education?.map(renderEducation)}
                    </div>
                </div>

                <div className="w-2/3">
                    {renderSectionTitle('Professional Summary')}
                    <p className="text-sm text-gray-600 mb-6">{summary}</p>
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
            <div className="p-8 font-sans bg-white text-gray-800 min-h-full">
                {renderPictureHeader()}
                <div>
                    {renderSectionTitle('Professional Summary')}
                    <p className="text-sm text-gray-600 mb-6">{summary}</p>
                </div>
                <div>
                    {renderSectionTitle('Work Experience')}
                    {experience?.map(renderExperience)}
                </div>
                <div className="mt-4">
                    {renderSectionTitle('Education')}
                    {education?.map(renderEducation)}
                </div>
                <div className="mt-4">
                    {renderSectionTitle('Skills')}
                    <div className="flex flex-wrap gap-2">
                       {skills?.map((skill: any) => <span key={skill.name} className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{skill.name}</span>)}
                    </div>
                </div>
            </div>
        )

    default: // Simple, ATS, Word, Google Docs templates
      return (
        <div className="p-8 font-sans bg-white text-gray-800 min-h-full">
            {renderSimpleHeader()}
            <div>
                {renderSectionTitle('Professional Summary')}
                <p className="text-sm text-gray-600 mb-6">{summary}</p>
            </div>
            <div>
                {renderSectionTitle('Work Experience')}
                {experience?.map(renderExperience)}
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4">
              <div>
                  {renderSectionTitle('Education')}
                  {education?.map(renderEducation)}
              </div>
              <div>
                  {renderSectionTitle('Skills')}
                  <ul className="list-disc list-inside text-sm text-gray-600">
                     {skills?.map((skill: any) => <li key={skill.name}>{skill.name}</li>)}
                  </ul>
              </div>
            </div>
        </div>
      );
  }
};
