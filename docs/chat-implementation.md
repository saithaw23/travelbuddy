# Chat-First Implementation Guide

_Last updated: 2026-02-08_

## Overview
TravelBuddy now uses a **chat-first approach** where conversational AI is the primary interface for trip planning. This document outlines the implementation, architecture, and integration points.

## Architecture

### Components

#### 1. ChatLandingPage (`/` and `/chat`)
**Purpose:** Primary entry point for trip planning via conversational AI.

**Features:**
- Full-screen chat interface with message history
- Starter prompts for common use cases
- Natural language processing for trip requirements
- Dynamic question flow based on user responses
- Automatic routing to `/ai-plans` when ready

**User Flow:**
1. User lands on page → sees AI welcome message
2. Clicks starter prompt OR types custom message
3. AI asks clarifying questions (destination, dates, budget, preferences)
4. User responds naturally in conversation
5. AI confirms understanding → generates plans → routes to `/ai-plans`

**Key Props/State:**
- `messages`: Array of conversation history
- `inputValue`: Current user input
- `isTyping`: AI response loading state

#### 2. FloatingChatWidget (Global)
**Purpose:** Persistent chat assistant available on all pages.

**Features:**
- Floating button in bottom-right corner
- Expandable chat panel (384px × 600px)
- Minimizable and closable
- Contextual responses based on page and keywords
- Maintains conversation context

**Integration:**
- Added to `app/layout.tsx` for global availability
- Appears on all pages except landing (to avoid duplication)
- Z-index: 50 (above most content, below modals)

**Contextual Responses:**
- Detects keywords: price, change, hotel, flight, food, help
- Provides page-specific guidance
- Suggests relevant actions

#### 3. Chat API Route (`/api/chat`)
**Purpose:** Backend endpoint for processing chat messages.

**Current Implementation:**
- Mock responses based on keyword detection
- Conversation history tracking
- Response generation logic

**TODO - Production Implementation:**
```typescript
// Replace mock with actual AI API
import OpenAI from 'openai';
// or
import Anthropic from '@anthropic-ai/sdk';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: conversationHistory,
});
```

## Integration Points

### Frontend → Backend
**Endpoint:** `POST /api/chat`

**Request:**
```json
{
  "message": "I want to visit Japan for 2 weeks",
  "conversationHistory": [
    { "role": "assistant", "content": "Hi! Where would you like to go?" },
    { "role": "user", "content": "I want to visit Japan for 2 weeks" }
  ],
  "context": {
    "currentPage": "/browse",
    "userId": "user123",
    "sessionId": "session456"
  }
}
```

**Response:**
```json
{
  "success": true,
  "response": "Great choice! What's your budget range?",
  "timestamp": "2026-02-08T10:30:00Z",
  "metadata": {
    "extractedInfo": {
      "destination": "Japan",
      "duration": "14 days"
    },
    "nextQuestions": ["budget", "travelStyle", "interests"]
  }
}
```

### Chat → Trip Creation
When AI has gathered sufficient information:

1. **Extract structured data** from conversation:
```typescript
{
  destination: "Tokyo, Japan",
  fromDate: "2026-04-01",
  toDate: "2026-04-14",
  travelers: 2,
  budget: "$5000",
  interests: ["food", "culture", "photography"],
  travelStyle: ["local experiences", "moderate adventure"]
}
```

2. **Call trip creation API:**
```typescript
const response = await fetch('/api/trips', {
  method: 'POST',
  body: JSON.stringify(tripData),
});
```

3. **Route to AI plans:**
```typescript
router.push(`/ai-plans?tripId=${tripId}`);
```

## Data Flow

```
User Input
    ↓
ChatLandingPage / FloatingChatWidget
    ↓
POST /api/chat
    ↓
AI Processing (OpenAI/Claude/etc.)
    ↓
Response + Extracted Data
    ↓
Update UI + Conversation History
    ↓
[When Ready] → POST /api/trips
    ↓
Route to /ai-plans
```

## Conversation State Management

### Session Storage
Store conversation context in session:
```typescript
sessionStorage.setItem('chatHistory', JSON.stringify(messages));
sessionStorage.setItem('extractedTripData', JSON.stringify(tripData));
```

### Context Persistence
Maintain context across pages:
```typescript
// In FloatingChatWidget
useEffect(() => {
  const savedHistory = sessionStorage.getItem('chatHistory');
  if (savedHistory) {
    setMessages(JSON.parse(savedHistory));
  }
}, []);
```

## AI Integration (Production)

### Option 1: OpenAI GPT-4
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: `You are a travel planning assistant. Extract trip details:
      - destination
      - dates (from/to)
      - budget
      - travelers count
      - interests
      - travel style
      
      Ask clarifying questions naturally. When you have all info, respond with JSON.`
    },
    ...conversationHistory
  ],
  temperature: 0.7,
});
```

### Option 2: Anthropic Claude
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const message = await anthropic.messages.create({
  model: "claude-3-sonnet-20240229",
  max_tokens: 1024,
  messages: conversationHistory,
});
```

### Structured Data Extraction
Use function calling or structured outputs:
```typescript
const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: conversationHistory,
  functions: [
    {
      name: "create_trip_plan",
      description: "Create a trip plan when all required info is gathered",
      parameters: {
        type: "object",
        properties: {
          destination: { type: "string" },
          fromDate: { type: "string", format: "date" },
          toDate: { type: "string", format: "date" },
          budget: { type: "number" },
          travelers: { type: "number" },
          interests: { type: "array", items: { type: "string" } },
          travelStyle: { type: "array", items: { type: "string" } }
        },
        required: ["destination", "fromDate", "toDate", "budget"]
      }
    }
  ],
  function_call: "auto"
});
```

## Styling & UX

### Design Tokens
```css
/* Chat colors */
--chat-user-bg: #9333ea (purple-600)
--chat-assistant-bg: #f3f4f6 (gray-100)
--chat-border: #e5e7eb (gray-200)
--chat-accent: #a855f7 (purple-500)

/* Animations */
.animate-bounce: typing indicator dots
.animate-pulse: notification badge
```

### Responsive Behavior
- **Desktop:** Full chat interface (600px height)
- **Tablet:** Adjusted width (90vw max)
- **Mobile:** Full-screen chat when open

### Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support (Enter to send, Esc to close)
- Screen reader announcements for new messages
- Focus management when opening/closing widget

## Testing

### Unit Tests
```typescript
// Test message sending
test('sends message and updates history', async () => {
  const { getByPlaceholderText, getByText } = render(<ChatLandingPage />);
  const input = getByPlaceholderText('Describe your dream trip...');
  
  fireEvent.change(input, { target: { value: 'Trip to Japan' } });
  fireEvent.submit(input.closest('form'));
  
  await waitFor(() => {
    expect(getByText('Trip to Japan')).toBeInTheDocument();
  });
});
```

### Integration Tests
```typescript
// Test API endpoint
test('POST /api/chat returns response', async () => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      message: 'I want to visit Paris',
      conversationHistory: []
    })
  });
  
  const data = await response.json();
  expect(data.success).toBe(true);
  expect(data.response).toBeDefined();
});
```

## Performance Considerations

### Optimization Strategies
1. **Debounce typing indicators** - Don't show "AI is typing" for <500ms responses
2. **Message virtualization** - For long conversations (>50 messages), use virtual scrolling
3. **API caching** - Cache common responses (greetings, FAQs)
4. **Lazy loading** - Load FloatingChatWidget only when needed
5. **Request batching** - Batch multiple quick messages if user types fast

### Monitoring
Track key metrics:
- Average conversation length (messages)
- Time to trip creation (from first message to `/ai-plans`)
- API response times
- User drop-off points in conversation
- Most common starter prompts used

## Migration from Form-Based Intake

### Backward Compatibility
The old form-based landing page is preserved as `components/LandingPage.tsx` and can be restored if needed:

```typescript
// In app/page.tsx
import LandingPage from "@/components/LandingPage"; // Old form
// import ChatLandingPage from "@/components/ChatLandingPage"; // New chat

export default function Home() {
  return <LandingPage />; // Revert to form
}
```

### A/B Testing
To test both approaches:
```typescript
// Feature flag or user segment
const useChat = user.segment === 'chat-beta' || Math.random() > 0.5;

return useChat ? <ChatLandingPage /> : <LandingPage />;
```

## Future Enhancements

### Phase 2 Features
1. **Voice input** - Speech-to-text for hands-free planning
2. **Image uploads** - "I want to go somewhere like this" with photo
3. **Multi-language** - Support for non-English conversations
4. **Conversation branching** - "Actually, let me change that..."
5. **Saved conversations** - Resume planning later
6. **Chat history** - View past conversations in profile
7. **Collaborative chat** - Group members can chat together
8. **Smart suggestions** - Autocomplete based on popular queries

### Advanced AI Features
1. **Sentiment analysis** - Detect excitement, hesitation, confusion
2. **Proactive suggestions** - "Based on your interests, have you considered..."
3. **Budget optimization** - "I can save you $200 by adjusting dates"
4. **Real-time availability** - "This hotel is 90% booked for those dates"
5. **Personalization** - Learn from past trips and preferences

## Troubleshooting

### Common Issues

**Chat not responding:**
- Check API endpoint is running
- Verify environment variables (API keys)
- Check browser console for errors
- Ensure conversation history format is correct

**Widget not appearing:**
- Verify FloatingChatWidget is in layout.tsx
- Check z-index conflicts
- Ensure no CSS hiding the widget

**Messages not scrolling:**
- Check messagesEndRef is attached
- Verify scrollToBottom is called in useEffect
- Check overflow-y-auto class is applied

**Context not persisting:**
- Verify sessionStorage is working
- Check for page reloads clearing state
- Ensure conversation history is saved on each message

## Resources

- [OpenAI Chat API Docs](https://platform.openai.com/docs/guides/chat)
- [Anthropic Claude API Docs](https://docs.anthropic.com/claude/reference/messages_post)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [React Chat UI Best Practices](https://www.patterns.dev/posts/chat-ui-patterns)
