import { NextRequest, NextResponse } from 'next/server';
import { genAI, TRAVEL_SYSTEM_PROMPT } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: TRAVEL_SYSTEM_PROMPT,
    });

    // Convert our history format to Gemini's format
    const history = (conversationHistory || [])
      .slice(0, -1) // exclude the latest user message (we pass it separately)
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    const chat = model.startChat({ history });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({
      success: true,
      response: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
