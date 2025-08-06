
'use server';
/**
 * @fileOverview An AI flow for generating new resume template code.
 *
 * This flow takes a template name and category and uses an AI prompt
 * to generate the TSX code for a new React component, along with the
 * corresponding entry for the template list.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateTemplateInputSchema = z.object({
  name: z.string().describe('The name of the new template, e.g., "Vienna" or "Kyoto".'),
  category: z.string().describe('The category for the new template, e.g., "Modern", "Classic", "Creative".'),
});
export type GenerateTemplateInput = z.infer<typeof GenerateTemplateInputSchema>;

const GenerateTemplateOutputSchema = z.object({
  caseStatement: z.string().describe("The full `case 'template-id':` block to be added to the switch statement in `ResumePreview.tsx`."),
  templateListEntry: z.string().describe("The new object to be added to the `initialTemplates` array in `lib/templates.ts`."),
});
export type GenerateTemplateOutput = z.infer<typeof GenerateTemplateOutputSchema>;


export async function generateTemplate(input: GenerateTemplateInput): Promise<GenerateTemplateOutput> {
  return generateTemplateFlow(input);
}

const generateTemplateFlow = ai.defineFlow(
  {
    name: 'generateTemplateFlow',
    inputSchema: GenerateTemplateInputSchema,
    outputSchema: GenerateTemplateOutputSchema,
  },
  async (input) => {
    const templateId = input.name.toLowerCase().replace(/\s+/g, '-');

    const prompt = `
      You are an expert React/Tailwind developer tasked with creating a new resume template component.

      **Request:**
      - Template Name: "${input.name}"
      - Template Category: "${input.category}"
      - Template ID: "${templateId}"

      **Instructions:**
      1.  **Design a NEW, UNIQUE, and aesthetically pleasing resume layout.** It must be completely different from common or existing designs. Be creative and aim for a professional, premium look and feel. Do not copy existing templates. Use sophisticated color schemes, typography, and layout structures.
      2.  **Generate a TSX \`case\` statement** for a React switch block. This case will render the new resume template.
          - The code must be self-contained within the \`return (...)\` statement.
          - It must use TailwindCSS for all styling.
          - It must use the data variables provided (e.g., \`personalInfo.name\`).
          - It must use the provided helper components like \`<ContactItem />\` and \`<ContactLink />\`.
      3.  **Generate the template list entry.** This is a single line of code representing the object to be added to the \`initialTemplates\` array in \`lib/templates.ts\`. The format is \`{ id: '${templateId}', name: '${input.name}', category: '${input.category}' },\`.

      **Output Format:**
      Provide a JSON object with two keys: "caseStatement" and "templateListEntry".

      - \`caseStatement\`: A string containing the full JS/TSX code for the \`case '${templateId}': ... return (...);\` block.
      - \`templateListEntry\`: A string containing the object to be added to the templates list, e.g., \`{ id: '...', name: '...', category: '...' },\`.
    `;

    const { output } = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.0-flash',
      output: {
        format: 'json',
        schema: GenerateTemplateOutputSchema,
      },
       config: {
        temperature: 0.8, // Increase creativity
      },
    });
    
    if (!output) {
      throw new Error('AI failed to generate template code.');
    }
    
    return output;
  }
);
