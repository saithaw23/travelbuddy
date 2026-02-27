type ChatRole = 'system' | 'user' | 'assistant';

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error('GROQ_API_KEY is not set in environment variables');
}

const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
const apiBaseUrl = 'https://api.groq.com/openai/v1/chat/completions';

export const TRAVEL_SYSTEM_PROMPT = `You are TravelBuddy, a warm and knowledgeable AI travel planning assistant. 
Your goal is to help users plan their perfect trip through natural, engaging conversation.

Guidelines:
- Ask clarifying questions naturally, one or two at a time (not a big list all at once)
- Gather key info: destination, travel dates or duration, budget, group size, travel style/interests
- Be encouraging and enthusiastic about their trip ideas
- Offer helpful suggestions based on what they share
- Keep responses concise (2–4 sentences max unless listing specifics)
- Once you feel you have a good picture of their trip wishes, you can let them know they can type "confirm" to generate their personalized travel plans

Do NOT ask for more than what's needed. Be conversational, not like a form.`;

export async function generateChatCompletion(
  messages: ChatMessage[],
  options?: {
    temperature?: number;
    maxTokens?: number;
  }
): Promise<string> {
  const response = await fetch(apiBaseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 1024,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('Groq API returned an empty response');
  }

  return content.trim();
}
