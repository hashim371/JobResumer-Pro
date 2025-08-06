
'use server';
/**
 * @fileOverview An AI flow for generating and storing new resume template code.
 *
 * This file is currently NOT in use pending resolution of runtime rendering issues.
 * The logic has been simplified to prevent application crashes.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { ref, set, get } from 'firebase/database';
import { initialTemplates, Template } from '@/lib/templates';

const GenerateTemplateInputSchema = z.object({
  name: z.string().describe('The name of the new template, e.g., "Vienna" or "Kyoto".'),
  category: z.string().describe('The category for the new template, e.g., "Modern", "Classic", "Creative".'),
});
export type GenerateTemplateInput = z.infer<typeof GenerateTemplateInputSchema>;

const GenerateTemplateOutputSchema = z.object({
  success: z.boolean().describe("Whether the template generation and database update were successful."),
  error: z.string().optional().describe("Error message if the process failed."),
});
export type GenerateTemplateOutput = z.infer<typeof GenerateTemplateOutputSchema>;


// Main function the client will call - Currently a stub
export async function generateTemplate(input: GenerateTemplateInput): Promise<GenerateTemplateOutput> {
  // This functionality is temporarily disabled.
  console.warn("AI template generation is temporarily disabled.");
  return { success: false, error: "AI template generation is temporarily disabled." };
}

// Flow to get all templates from Firebase
export const getTemplatesFlow = ai.defineFlow(
  {
    name: 'getTemplatesFlow',
    inputSchema: z.object({}), // Expects an empty object
    outputSchema: z.array(z.any()), // Using z.any() for simplicity with Firebase data structure
  },
  async () => {
    try {
      const templatesRef = ref(db, 'templates');
      const snapshot = await get(templatesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dbTemplates = Object.values(data) as Template[];
        // For now, let's just return the initial templates to ensure stability
        return initialTemplates;
      } else {
        // If nothing in DB, return initial set.
        return initialTemplates;
      }
    } catch (error: any) {
        console.error("Failed to fetch templates, returning initial set.", error);
        // Fallback to initial templates if DB fetch fails
        return initialTemplates;
    }
  }
);

    