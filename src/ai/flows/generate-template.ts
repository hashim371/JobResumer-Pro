
'use server';
/**
 * @fileOverview An AI flow for generating and storing new resume template code.
 *
 * - generateTemplate - A function that handles the template generation process.
 * - getTemplatesFlow - A function to retrieve all templates from the database.
 * - GenerateTemplateInput - The input type for the generateTemplate function.
 * - GenerateTemplateOutput - The return type for the generateTemplate function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { ref, set, get } from 'firebase/database';
import { initialTemplates, Template } from '@/lib/templates';

// Schema for the AI model's output (the TSX code)
const GeneratedCodeSchema = z.object({
  code: z.string().describe("The complete, self-contained TSX code for the new template's React component. It should be a single function component."),
});

// Input for the template generation flow
const GenerateTemplateInputSchema = z.object({
  name: z.string().describe('The name of the new template, e.g., "Vienna" or "Kyoto".'),
  category: z.string().describe('The category for the new template, e.g., "Modern", "Classic", "Creative".'),
});
export type GenerateTemplateInput = z.infer<typeof GenerateTemplateInputSchema>;

// Output for the template generation flow
const GenerateTemplateOutputSchema = z.object({
  success: z.boolean().describe("Whether the template generation and database update were successful."),
  error: z.string().optional().describe("Error message if the process failed."),
});
export type GenerateTemplateOutput = z.infer<typeof GenerateTemplateOutputSchema>;


// Main function the client will call
export async function generateTemplate(input: GenerateTemplateInput): Promise<GenerateTemplateOutput> {
  return generateTemplateFlow(input);
}

// Prompt to generate the template code
const templatePrompt = ai.definePrompt({
  name: 'generateTemplatePrompt',
  input: { schema: GenerateTemplateInputSchema },
  output: { schema: GeneratedCodeSchema },
  prompt: `
    You are an expert React and Tailwind CSS developer tasked with creating a new, unique, and premium resume template component.
    The user has provided a name: '{{{name}}}' and a category: '{{{category}}}'.
    
    IMPORTANT REQUIREMENTS:
    1.  Generate the complete TSX code for a new, self-contained React functional component for the resume template.
    2.  The component should accept a single prop: 'data', which contains all the resume information (personalInfo, summary, experience, etc.).
    3.  The design MUST be visually distinct, professional, clean, and modern. Use Tailwind CSS for all styling. Do not use inline styles.
    4.  The top-level element must be a div with the className: \`w-[8.5in] h-[11in] bg-white text-base font-body\`. You can add more classes for styling.
    5.  All data is accessed from the 'data' prop, e.g., \`data.personalInfo?.name\`.
    6.  The output must be ONLY the TSX code for the component, starting with \`({ data }) => {\` and ending with the final closing brace \`}\`. Do not include any imports or exports.
    7.  Do not define helper components like 'ContactLink' or 'ContactItem' inside the function. Assume they are available in the parent scope.

    Example of the function structure (DO NOT COPY THIS DESIGN):
    \`\`\`tsx
    ({ data }) => {
      const { personalInfo, summary, experience, education, skills } = data;
      
      const SectionTitle = ({ children }) => (
        <h2 className="text-sm font-bold uppercase tracking-widest text-blue-800 mb-2 font-headline">{children}</h2>
      );

      return (
        <div className="w-[8.5in] h-[11in] bg-white text-gray-800 text-[10pt] leading-normal flex flex-col font-body">
          <header className="bg-blue-600 text-white p-8">
             <h1 className="text-4xl font-bold font-headline">{personalInfo?.name}</h1>
             {/* ... more JSX ... */}
          </header>
          <main className="p-8 flex-grow">
            {/* ... more JSX ... */}
          </main>
        </div>
      );
    }
    \`\`\`
  `,
});

// Flow to generate and save the template
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

      // Step 2: Save the new template to Firebase Realtime Database
      const dasherizedName = input.name.toLowerCase().replace(/\s+/g, '-');
      const templateId = `${dasherizedName}-${Math.random().toString(36).substring(2, 6)}`;
      const templateRef = ref(db, `templates/${templateId}`);

      const newTemplateData: Template & { code: string } = {
        id: templateId,
        name: input.name,
        category: input.category,
        code: output.code,
      };

      await set(templateRef, newTemplateData);

      return { success: true };

    } catch (e: any) {
      console.error(e);
      return { success: false, error: e.message || "An unknown error occurred while saving the template." };
    }
  }
);


// Flow to get all templates from Firebase
export const getTemplatesFlow = ai.defineFlow(
  {
    name: 'getTemplatesFlow',
    inputSchema: z.undefined(),
    outputSchema: z.array(z.any()), // Using z.any() for simplicity with Firebase data structure
  },
  async () => {
    try {
      const templatesRef = ref(db, 'templates');
      const snapshot = await get(templatesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Combine initial templates with DB templates, ensuring no duplicates
        const dbTemplates = Object.values(data) as Template[];
        const combined = [...initialTemplates];
        const dbIds = new Set(dbTemplates.map(t => t.id));
        
        dbTemplates.forEach(dbTemplate => {
            const index = combined.findIndex(t => t.id === dbTemplate.id);
            if (index > -1) {
                combined[index] = dbTemplate; // Update existing
            } else {
                combined.push(dbTemplate); // Add new
            }
        });
        
        return combined;

      } else {
        // If no templates in DB, seed with initial templates
        const updates: { [key: string]: any } = {};
        initialTemplates.forEach(template => {
            updates[`templates/${template.id}`] = template;
        });
        // Note: this doesn't use 'set' which would overwrite the whole db path
        // but since we are seeding, it's fine. For real updates, use update()
        const dbRef = ref(db);
        await set(dbRef, updates);

        return initialTemplates;
      }
    } catch (error: any) {
        console.error("Failed to fetch templates, returning initial set.", error);
        // Fallback to initial templates if DB fetch fails
        return initialTemplates;
    }
  }
);
