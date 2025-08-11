/**
 * @fileOverview Defines the AI prompt and schemas for generating resume template styles.
 * This file is used by the /api/generate-template API route.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateTemplateInputSchema = z.object({
  name: z.string().describe('The name of the new template, e.g., "Vienna" or "Kyoto".'),
  category: z.string().describe('The category for the new template, e.g., "Modern", "Classic", "Creative".'),
});
export type GenerateTemplateInput = z.infer<typeof GenerateTemplateInputSchema>;

export const TemplateStyleSchema = z.object({
    layout: z.enum(['single-column', 'two-column-left', 'two-column-right']).describe("The overall layout structure. 'two-column-left' means a sidebar on the left."),
    fontFamily: z.string().describe("A Google Font name for the body text, e.g., 'Lato', 'Roboto', 'Montserrat'."),
    colors: z.object({
        primary: z.string().describe("A hex color code for primary elements like headers and titles. E.g., '#2c5282'."),
        secondary: z.string().describe("A hex color code for the sidebar or background accents. E.g., '#f7fafc'."),
        text: z.string().describe("A hex color code for main body text. E.g., '#2d3748'."),
        textOnPrimary: z.string().describe("A hex color code for text that appears on a primary color background. E.g., '#ffffff'."),
    }).describe("A unique and professional color scheme."),
}).describe("A JSON object describing the visual style of a new resume template.");

export type TemplateStyle = z.infer<typeof TemplateStyleSchema>;


export const generateTemplateStylePrompt = ai.definePrompt({
    name: 'generateTemplateStylePrompt',
    input: { schema: GenerateTemplateInputSchema },
    output: { schema: TemplateStyleSchema },
    model: 'googleai/gemini-2.0-flash', 
    prompt: `
      You are an expert resume designer. Your task is to generate a JSON object defining the style for a new resume template.
      The design must be unique, professional, and aesthetically pleasing. Do NOT reuse color schemes or layouts from common designs.

      **Request:**
      - Template Name: "{{name}}"
      - Template Category: "{{category}}"

      **Instructions:**
      1.  **Choose a Layout:** Select one of 'single-column', 'two-column-left', or 'two-column-right'.
      2.  **Choose a Font:** Select a professional and readable Google Font.
      3.  **Create a Color Scheme:** Generate a unique, harmonious color palette with four hex color codes for 'primary', 'secondary', 'text', and 'textOnPrimary'.

      **Output Format:**
      Provide ONLY a valid JSON object matching the defined schema. Do not include any other text or markdown.
    `,
    config: {
        temperature: 0.9, 
    },
});