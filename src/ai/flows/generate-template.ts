
'use server';
/**
 * @fileOverview An AI flow for generating new resume template code.
 *
 * - generateTemplate - A function that handles the template generation process.
 * - GenerateTemplateInput - The input type for the generateTemplate function.
 * - GenerateTemplateOutput - The return type for the generateTemplate function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

const GenerateTemplateInputSchema = z.object({
  name: z.string().describe('The name of the new template, e.g., "Vienna" or "Kyoto".'),
  category: z.string().describe('The category for the new template, e.g., "Modern", "Classic", "Creative".'),
});
export type GenerateTemplateInput = z.infer<typeof GenerateTemplateInputSchema>;

const GenerateTemplateOutputSchema = z.object({
  success: z.boolean().describe("Whether the template generation and file update were successful."),
  error: z.string().optional().describe("Error message if the process failed."),
});
export type GenerateTemplateOutput = z.infer<typeof GenerateTemplateOutputSchema>;


// This is the main function that the client will call.
export async function generateTemplate(input: GenerateTemplateInput): Promise<GenerateTemplateOutput> {
  return generateTemplateFlow(input);
}


// Define the prompt for the AI model
const templatePrompt = ai.definePrompt({
  name: 'generateTemplatePrompt',
  input: { schema: GenerateTemplateInputSchema },
  output: { schema: z.object({ code: z.string().describe("The complete TSX code for the new template's case block.") }) },
  prompt: `
    You are an expert React and Tailwind CSS developer tasked with creating a new, unique, and premium resume template component.
    The user has provided a name: '{{{name}}}' and a category: '{{{category}}}'.
    
    Generate the TSX code for a new 'case' block to be inserted into an existing 'switch (templateId)' statement in a React component named 'ResumePreview.tsx'.
    
    IMPORTANT REQUIREMENTS:
    1.  The new template MUST be visually distinct from all other existing templates. Get creative with layouts (e.g., multi-column, different header styles), typography, and color schemes.
    2.  The design must be professional, clean, and modern.
    3.  Use Tailwind CSS classes for all styling. Do not use inline styles.
    4.  The generated code MUST be a single 'case' block. Do not include the 'switch' statement itself.
    5.  The case name must be the dasherized version of the template name. For example, if the name is "New Delhi", the case should be 'case "new-delhi":'.
    6.  The code should render a top-level div with the className: \`className={cn(parentClass, "...")}\`. You can add additional class names for styling.
    7.  All data is passed in a \`data\` object. Access it like this: \`personalInfo?.name\`, \`summary\`, \`experience\`, \`education\`, \`skills\`.
    8.  Use the provided helper components \`ContactItem\` and \`ContactLink\` for contact information.
    9.  Ensure all JSX is valid and there are no syntax errors.
    10. The output must be ONLY the code for the case block, starting with \`case '...' :\` and ending with \`break;\`. DO NOT add any other explanations or surrounding text.

    Example of an existing case block for structure reference (DO NOT COPY THIS DESIGN):
    \`\`\`tsx
    case 'dublin': 
        const SectionTitle = ({ children }: { children: React.ReactNode }) => (
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-800 mb-2 font-headline">{children}</h2>
        );
        const SkillBadge = ({ children }: { children: React.ReactNode }) => (
          <span className="bg-gray-200 text-gray-700 text-[10px] font-medium px-3 py-1 rounded-md">{children}</span>
        )
        return (
            <div className={cn(parentClass, "font-body bg-white text-gray-800 text-[10pt] leading-normal flex flex-col")}>
                <header className="bg-blue-600 text-white p-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold font-headline">{personalInfo?.name}</h1>
                        <p className="text-lg font-light mt-1">{personalInfo?.role}</p>
                    </div>
                    <div className="flex flex-col items-end text-xs gap-1">
                        <ContactLink type="email" value={personalInfo?.email} />
                        <span>{personalInfo?.phone}</span>
                        <span>{personalInfo?.location}</span>
                        <ContactLink type="website" value={personalInfo?.website} />
                    </div>
                </header>
                <main className="p-8 flex-grow grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-6">
                        <section>
                            <SectionTitle>Professional Summary</SectionTitle>
                            <p className="text-xs text-gray-600 leading-relaxed">{summary}</p>
                        </section>
                        <section>
                            <SectionTitle>Work Experience</SectionTitle>
                            <div className="space-y-4">
                                {experience?.map((exp: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-sm">{exp.jobTitle}</h3>
                                            <p className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} - {exp.endDate}</p>
                                        </div>
                                        <h4 className="text-sm italic text-gray-600">{exp.company}</h4>
                                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                    <div className="col-span-1 space-y-6">
                        <section>
                            <SectionTitle>Education</SectionTitle>
                            {education?.map((edu: any, i: number) => (
                                <div key={i}>
                                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                                    <p className="text-xs text-gray-700">{edu.school}</p>
                                    <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                                </div>
                            ))}
                        </section>
                        <section>
                            <SectionTitle>Skills</SectionTitle>
                            <div className="flex flex-wrap gap-2">
                                {skills?.map((skill: any, i: number) => (
                                    <SkillBadge key={i}>{skill.name}</SkillBadge>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    \`\`\`
  `,
});


// Define the main flow
const generateTemplateFlow = ai.defineFlow(
  {
    name: 'generateTemplateFlow',
    inputSchema: GenerateTemplateInputSchema,
    outputSchema: GenerateTemplateOutputSchema,
  },
  async (input) => {
    try {
      // Step 1: Generate the new template code using the AI prompt
      const { output } = await templatePrompt(input);
      if (!output?.code) {
        return { success: false, error: "AI failed to generate template code." };
      }

      // Step 2: Add the new template to the template store
      const dasherizedName = input.name.toLowerCase().replace(/\s+/g, '-');
      
      const templatesFilePath = path.join(process.cwd(), 'src', 'lib', 'templates.ts');
      const templatesFileContent = await fs.readFile(templatesFilePath, 'utf-8');
      
      const newTemplateEntry = `  { id: '${dasherizedName}', name: '${input.name}', category: '${input.category}' },\n];`;
      const updatedTemplatesContent = templatesFileContent.replace('];', newTemplateEntry);
      
      await fs.writeFile(templatesFilePath, updatedTemplatesContent, 'utf-8');

      // Step 3: Inject the generated code into ResumePreview.tsx
      const previewFilePath = path.join(process.cwd(), 'src', 'components', 'ResumePreview.tsx');
      let previewFileContent = await fs.readFile(previewFilePath, 'utf-8');

      // Find the last `case` block to insert the new one before `default`
      const lastCaseIndex = previewFileContent.lastIndexOf('case ');
      const insertionPoint = previewFileContent.indexOf('default:', lastCaseIndex);

      if (insertionPoint === -1) {
          return { success: false, error: "Could not find the default case in ResumePreview.tsx" };
      }
      
      // Ensure the case name is correctly formatted in the generated code.
      const correctedCode = output.code.replace(/case\s+['"].*['"]:/, `case '${dasherizedName}':`);

      const newContent = 
        previewFileContent.slice(0, insertionPoint) + 
        correctedCode + 
        '\n    ' + 
        previewFileContent.slice(insertionPoint);

      await fs.writeFile(previewFilePath, newContent, 'utf-8');
      
      return { success: true };

    } catch (e: any) {
      console.error(e);
      return { success: false, error: e.message || "An unknown error occurred." };
    }
  }
);
