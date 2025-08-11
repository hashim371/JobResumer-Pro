
'use server';
/**
 * @fileOverview Defines the AI prompt and schemas for generating resume template styles.
 * This file is a Server Action and is called directly from the client.
 */

import { ai } from '@/ai/genkit';
import { GenerateTemplateInputSchema, TemplateStyleSchema, type GenerateTemplateInput, type TemplateStyle } from '@/lib/schema/template';


const generateTemplateStylePrompt = ai.definePrompt({
    name: 'generateTemplateStylePrompt',
    input: { schema: GenerateTemplateInputSchema },
    output: { schema: TemplateStyleSchema },
    model: 'googleai/gemini-2.0-flash',
    prompt: `
      You are an expert brand and visual designer with a keen eye for resume typography, layout, and color theory. Your task is to generate a JSON object that defines a unique and compelling visual style for a new resume template.

      **CRITICAL INSTRUCTIONS:**
      1.  **BE CREATIVE AND DIVERSE:** Do NOT produce generic or repetitive designs. Each output must be genuinely unique.
      2.  **CATEGORY IS KEY:** The chosen 'category' is the most important input. All your design choices—layout, font, and colors—must directly reflect the feeling and purpose of the category.
      3.  **DO NOT REUSE STYLES:** Do not use common color schemes like basic blue and gray. Create something fresh and inspiring.

      **DESIGN BRIEF:**
      - Template Name: "{{name}}"
      - **Design Category: "{{category}}"**

      **YOUR THOUGHT PROCESS:**
      1.  **Analyze the Category:**
          -   **If 'Modern'**: Think clean lines, sans-serif fonts (like 'Inter', 'Nunito Sans'), and a minimalist, often monochromatic color scheme with one bold accent.
          -   **If 'Creative' or 'Artistic'**: Think asymmetrical layouts, unique font pairings (e.g., a serif headline with a sans-serif body), and a bold, expressive color palette.
          -   **If 'Elegant' or 'Classic'**: Think serif fonts ('Lora', 'Playfair Display'), centered headers, ample white space, and a sophisticated, muted color scheme (e.g., deep navy, charcoal, off-white, maybe a metallic accent).
          -   **If 'ATS' or 'Professional'**: Prioritize readability and structure. A 'two-column-left' layout is often good. Use a very clean, standard font like 'Lato' or 'Roboto'. The color scheme should be professional and high-contrast but not distracting.
          -   **If 'Bold'**: Use strong, thick fonts, high-contrast colors, and a layout that makes a statement.

      2.  **Choose a Layout:** Based on your category analysis, select one of 'single-column', 'two-column-left', or 'two-column-right'.

      3.  **Choose a Font Family:** Select a professional and readable Google Font that perfectly matches the category's vibe.

      4.  **Create a Unique Color Scheme:** Based on the category, generate a harmonious and professional palette of four distinct hex codes. Ensure sufficient contrast, especially for text.

      **Output Format:**
      Provide ONLY a valid JSON object matching the defined schema. Do not include any other text or markdown.
    `,
    config: {
        temperature: 1.0, 
    },
});

export async function generateTemplateStyle(input: GenerateTemplateInput): Promise<TemplateStyle> {
    try {
        const { output } = await generateTemplateStylePrompt(input);
        if (!output) {
          throw new Error('AI failed to generate a response.');
        }
        return output;
    } catch (error: any) {
        console.error('Error in generateTemplateStyle server action:', error);
        throw new Error('Failed to generate template style. The AI model may be temporarily unavailable.');
    }
}
