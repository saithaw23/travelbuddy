import { NextRequest, NextResponse } from 'next/server';
import { generateChatCompletion, TRAVEL_SYSTEM_PROMPT, ChatMessage } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    const history = (conversationHistory || [])
      .filter((msg: { role: string }) => msg.role === 'user' || msg.role === 'assistant')
      .map((msg: { role: string; content: string }) => ({
        role: msg.role as ChatMessage['role'],
        content: msg.content,
      }));

    // Ensure the conversation that follows the system prompt begins with a user message.
    const firstUserIndex = history.findIndex(entry => entry.role === 'user');
    const normalizedHistory = firstUserIndex === -1 ? [] : history.slice(firstUserIndex);

    const messages: ChatMessage[] = [
      { role: 'system', content: TRAVEL_SYSTEM_PROMPT },
      ...normalizedHistory,
      { role: 'user', content: message },
    ];

    const responseText = await generateChatCompletion(messages, {
      temperature: 0.65,
      maxTokens: 700,
    });

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
