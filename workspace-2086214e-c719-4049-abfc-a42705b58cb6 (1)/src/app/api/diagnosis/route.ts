import { NextRequest, NextResponse } from 'next/server';
import { generateMockDiagnosis } from '@/lib/medical-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate diagnosis result
    const result = generateMockDiagnosis(body);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Diagnosis error:', error);
    return NextResponse.json(
      { error: 'Failed to process diagnosis' },
      { status: 500 }
    );
  }
}
