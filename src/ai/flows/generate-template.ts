
'use server';
/**
 * @fileOverview An AI flow for generating a new resume template's style and layout data.
 *
 * This flow takes a template name and category and uses an AI prompt
 * to generate a JSON object defining the template's visual properties.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { ref, set } from 'firebase/database';
import { db } from '@/lib/firebase';
import type { Template } from '@/lib/templates';

const GenerateTemplateInputSchema = z.object({
  name: z.string().describe('The name of the new template, e.g., "Vienna" or "Kyoto".'),
  category: z.string().describe('The category for the new template, e.g., "Modern", "Classic", "Creative".'),
});
export type GenerateTemplateInput = z.infer<typeof GenerateTemplateInputSchema>;

// The output is now a success flag, as the main result is writing to the DB.
const GenerateTemplateOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});
export type GenerateTemplateOutput = z.infer<typeof GenerateTemplateOutputSchema>;


const TemplateStyleSchema = z.object({
    layout: z.enum(['single-column', 'two-column-left', 'two-column-right']).describe("The overall layout structure. 'two-column-left' means a sidebar on the left."),
    fontFamily: z.string().describe("A Google Font name for the body text, e.g., 'Lato', 'Roboto', 'Montserrat'."),
    colors: z.object({
        primary: z.string().describe("A hex color code for primary elements like headers and titles. E.g., '#2c5282'."),
        secondary: z.string().describe("A hex color code for the sidebar or background accents. E.g., '#f7fafc'."),
        text: z.string().describe("A hex color code for main body text. E.g., '#2d3748'."),
        textOnPrimary: z.string().describe("A hex color code for text that appears on a primary color background. E.g., '#ffffff'."),
    }).describe("A unique and professional color scheme."),
}).describe("A JSON object describing the visual style of a new resume template.");


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
      You are an expert resume designer. Your task is to generate a JSON object defining the style for a new resume template.
      The design must be unique, professional, and aesthetically pleasing. Do NOT reuse color schemes or layouts from common designs.

      **Request:**
      - Template Name: "${input.name}"
      - Template Category: "${input.category}"

      **Instructions:**
      1.  **Choose a Layout:** Select one of 'single-column', 'two-column-left', or 'two-column-right'.
      2.  **Choose a Font:** Select a professional and readable Google Font.
      3.  **Create a Color Scheme:** Generate a unique, harmonious color palette with four hex color codes for 'primary', 'secondary', 'text', and 'textOnPrimary'.

      **Output Format:**
      Provide ONLY a valid JSON object matching the defined schema. Do not include any other text or markdown.
    `;

    try {
        const { output } = await ai.generate({
          prompt: prompt,
          model: 'googleai/gemini-2.0-flash',
          output: {
            format: 'json',
            schema: TemplateStyleSchema,
          },
          config: {
            temperature: 0.9, // Higher creativity
          },
        });
        
        if (!output) {
          throw new Error('AI failed to generate template style.');
        }

        const newTemplate: Template = {
            id: templateId,
            name: input.name,
            category: input.category,
            style: output,
        };

        // Save the new template directly to Firebase
        const newTemplateRef = ref(db, `templates/${templateId}`);
        await set(newTemplateRef, newTemplate);

        return { success: true };

    } catch (e: any) {
        console.error("Error in generateTemplateFlow:", e);
        return { success: false, error: e.message || 'An unexpected error occurred.' };
    }
  }
);
