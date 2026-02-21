import { NextRequest, NextResponse } from 'next/server';
import { genAI } from '@/lib/gemini';

const SUMMARIZE_PROMPT = `You are a travel data extraction AI. The user has had a conversation with a travel planning assistant and has decided to confirm their trip details.

Based on the conversation history below, extract their preferences and generate exactly 3 personalized travel plan recommendations.

Return ONLY valid JSON (no markdown, no extra text) in this exact structure:
{
  "preferences": {
    "destination": "extracted destination or 'Flexible' if not specified",
    "duration": "extracted duration or 'Flexible'",
    "budget": "extracted budget or 'Flexible'",
    "groupSize": "extracted group size or 'Solo'",
    "travelStyle": "extracted travel style (e.g. Adventure, Relaxation, Culture, Food, Romance, Family)",
    "interests": ["list", "of", "interests"],
    "conversationSummary": "A warm 2-3 sentence summary of what the traveler is looking for, written as if to confirm back to the user"
  },
  "plans": [
    {
      "id": "plan-1",
      "name": "Plan name (creative, 3-5 words)",
      "tagline": "One sentence selling point",
      "destination": "City, Country",
      "duration": "X Days / Y Nights",
      "groupSize": "X-Y travelers",
      "totalCost": 2500,
      "rating": 4.8,
      "reviewCount": 234,
      "image": "https://images.unsplash.com/photo-XXXXXXXXXXXXXXXXXX?w=600",
      "highlights": ["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4"],
      "included": { "flights": 2, "hotels": 5, "restaurants": 8, "activities": 10 },
      "tags": ["Tag1", "Tag2", "Tag3"],
      "aiConfidence": 96
    },
    { ... second plan ... },
    { ... third plan ... }
  ]
}

Use real Unsplash photo IDs relevant to the destinations. Make the plans genuinely match the user's stated preferences. Vary the price points (budget, mid-range, premium).`;

export async function POST(request: NextRequest) {
    try {
        const { conversationHistory } = await request.json();

        // Build a readable conversation transcript
        const transcript = conversationHistory
            .map((msg: { role: string; content: string }) =>
                `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
            )
            .join('\n');

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const result = await model.generateContent(
            `${SUMMARIZE_PROMPT}\n\nCONVERSATION:\n${transcript}`
        );

        let responseText = result.response.text();

        // Strip any markdown code fences if present
        responseText = responseText
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();

        const parsed = JSON.parse(responseText);

        return NextResponse.json({
            success: true,
            preferences: parsed.preferences,
            plans: parsed.plans,
        });
    } catch (error) {
        console.error('Summarize API error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to generate travel summary' },
            { status: 500 }
        );
    }
}
