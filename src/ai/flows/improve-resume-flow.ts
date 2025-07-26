'use server';
/**
 * @fileOverview An AI flow to improve resume sections.
 *
 * - improveResumeSection - A function that enhances text for a specific resume section.
 * - ImproveResumeSectionInput - The input type for the improveResumeSection function.
 * - ImproveResumeSectionOutput - The return type for the improveResume-section function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveResumeSectionInputSchema = z.object({
  text: z.string().describe('The text to improve.'),
  section: z.string().describe("The resume section the text belongs to (e.g., 'summary', 'experience')."),
});
export type ImproveResumeSectionInput = z.infer<typeof ImproveResumeSectionInputSchema>;

const ImproveResumeSectionOutputSchema = z.object({
  improvedText: z.string().describe('The improved resume section text.'),
});
export type ImproveResumeSectionOutput = z.infer<typeof ImproveResumeSectionOutputSchema>;

const prompt = ai.definePrompt({
  name: 'improveResumeSectionPrompt',
  input: { schema: ImproveResumeSectionInputSchema },
  output: { schema: ImproveResumeSectionOutputSchema },
  prompt: `You are an expert resume writer and career coach. Your task is to revise the following text for a resume's '{{section}}' section.

Rewrite the text to be more professional, concise, and impactful. Use strong action verbs and focus on quantifiable achievements where possible. Ensure the tone is appropriate for a professional resume.

Original text:
"{{text}}"

Return only the improved text in the 'improvedText' field.`,
});

const improveResumeSectionFlow = ai.defineFlow(
  {
    name: 'improveResumeSectionFlow',
    inputSchema: ImproveResumeSectionInputSchema,
    outputSchema: ImproveResumeSectionOutputSchema,
  },
  async (input) => {
    // The 'input' object coming into the flow might be tainted by server action serialization.
    // Create a fresh, clean object to pass to the prompt to avoid "Unsupported Part type" errors.
    const cleanInput = {
      text: input.text,
      section: input.section,
    };
    const {output} = await prompt(cleanInput);
    return output!;
  }
);


export async function improveResumeSection(input: ImproveResumeSectionInput): Promise<ImproveResumeSectionOutput> {
  if (!input.text.trim()) {
      return { improvedText: '' };
  }
  // The exported server action calls the internal flow.
  return improveResumeSectionFlow(input);
}
