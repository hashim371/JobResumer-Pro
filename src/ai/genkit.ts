import {genkit, lazy} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [lazy(() => googleAI())],
  model: 'googleai/gemini-2.0-flash',
});
