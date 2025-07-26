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
    // This flow now expects to receive a clean, plain object.
    const {output} = await prompt(input);
    return output!;
  }
);


export async function improveResumeSection(input: ImproveResumeSectionInput): Promise<ImproveResumeSectionOutput> {
  // Guard against empty input to prevent unnecessary AI calls.
  if (!input.text || !input.text.trim()) {
      return { improvedText: '' };
  }
  
  // This is the definitive fix.
  // The exported server action receives the "tainted" object from the client.
  // It extracts the primitive values and then calls the internal flow with a 
  // brand new, clean object literal. This guarantees the prompt is isolated
  // from any Next.js serialization metadata.
  return improveResumeSectionFlow({ text: input.text, section: input.section });
}
