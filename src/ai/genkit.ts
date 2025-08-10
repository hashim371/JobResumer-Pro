import {genkit, lazy} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [lazy(() => googleAI({
    apiKey: process.env.GEMINI_API_KEY,
  }))],
});
