import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    // TODO: Replace with actual AI API call (OpenAI, Claude, etc.)
    // For now, return a mock response
    
    const response = generateMockResponse(message, conversationHistory);

    return NextResponse.json({
      success: true,
      response: response,
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

function generateMockResponse(message: string, history: any[]): string {
  const lowerMessage = message.toLowerCase();
  const messageCount = history?.length || 0;

  // First interaction
  if (messageCount <= 1) {
    if (lowerMessage.includes('budget') || lowerMessage.includes('$')) {
      return "Great! I can help you plan a budget-friendly trip. What's your ideal destination, and how many days are you thinking?";
    } else if (lowerMessage.includes('family') || lowerMessage.includes('kids')) {
      return "Perfect! Family trips are my specialty. How many people will be traveling, and what are the ages of your kids? Also, what's your budget range?";
    } else if (lowerMessage.includes('romantic') || lowerMessage.includes('couple')) {
      return "How lovely! A romantic getaway. Are you thinking beach, mountains, or city? And what's your budget for this special trip?";
    } else if (lowerMessage.includes('adventure') || lowerMessage.includes('thrill')) {
      return "Exciting! I love planning adventure trips. What kind of activities interest you - hiking, water sports, extreme sports? And what's your budget?";
    } else if (lowerMessage.includes('food') || lowerMessage.includes('culinary')) {
      return "A food lover! What type of cuisine are you most interested in? And which region or country would you like to explore?";
    } else if (lowerMessage.includes('culture') || lowerMessage.includes('cultural')) {
      return "Cultural exploration is wonderful! Which region interests you most - Asia, Europe, South America? And what's your budget range?";
    } else {
      return "That sounds exciting! To create the perfect itinerary, I need a few more details:\n\n• What's your budget range?\n• How many days?\n• Traveling solo or with others?\n• Any specific interests? (food, adventure, culture, relaxation)";
    }
  }

  // Second interaction - gather more details
  if (messageCount <= 3) {
    return "Excellent! I have enough information now. Let me create some personalized trip plans for you. This will take just a moment...";
  }

  // Final interaction - ready to show plans
  if (messageCount <= 5) {
    return "✨ Perfect! I've created 3 amazing trip plans tailored just for you. Taking you to your personalized recommendations now...";
  }

  return "I'm here to help! What else would you like to know about your trip?";
}
