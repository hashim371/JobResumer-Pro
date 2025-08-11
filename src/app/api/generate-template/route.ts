
import { NextRequest, NextResponse } from 'next/server';
import { generateTemplateStyle, GenerateTemplateInputSchema } from '@/ai/flows/generate-template';

export const dynamic = 'force-dynamic'; // Ensures this route is always run dynamically

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = GenerateTemplateInputSchema.parse(body);

    const output = await generateTemplateStyle(input);

    return NextResponse.json(output);
  } catch (error: any) {
    console.error('API Error in /api/generate-template:', error);
    let errorMessage = 'An internal server error occurred.';
    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
