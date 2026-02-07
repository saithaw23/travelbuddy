# Chat Feature Quick Start Guide

## For Developers Getting Started

### What You Need to Know

TravelBuddy now uses **conversational AI as the primary interface**. Users chat with an AI assistant instead of filling out forms.

### Files You'll Work With

#### Frontend Components
- `components/ChatLandingPage.tsx` - Main chat interface (landing page)
- `components/FloatingChatWidget.tsx` - Persistent chat widget (all pages)
- `app/page.tsx` - Routes to ChatLandingPage
- `app/chat/page.tsx` - Dedicated chat page
- `app/layout.tsx` - Includes FloatingChatWidget globally

#### Backend
- `app/api/chat/route.ts` - Chat API endpoint (currently mock)

#### Documentation
- `docs/chat-implementation.md` - Detailed technical docs
- `docs/chat-first-summary.md` - High-level overview
- `docs/chat-architecture-diagram.md` - Visual architecture

### Quick Setup (5 minutes)

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Run dev server**:
```bash
npm run dev
```

3. **Open browser**:
```
http://localhost:3000
```

4. **Test the chat**:
   - Click a starter prompt OR type a message
   - See AI response (currently mock)
   - Continue conversation
   - Watch it route to `/ai-plans` after gathering info

### How It Works (Simple Version)

```
User types message
    ↓
POST /api/chat (mock response for now)
    ↓
AI responds with follow-up question
    ↓
Repeat until enough info gathered
    ↓
Route to /ai-plans with trip data
```

### Making Your First Change

#### Example 1: Add a New Starter Prompt

**File:** `components/ChatLandingPage.tsx`

**Find:**
```typescript
const STARTER_PROMPTS = [
  { icon: '🏖️', text: 'Plan a weekend getaway under $1000', category: 'budget' },
  // ... more prompts
];
```

**Add:**
```typescript
const STARTER_PROMPTS = [
  { icon: '🏖️', text: 'Plan a weekend getaway under $1000', category: 'budget' },
  { icon: '🎿', text: 'Ski trip to the mountains', category: 'winter' }, // NEW
  // ... more prompts
];
```

#### Example 2: Customize AI Response

**File:** `app/api/chat/route.ts`

**Find:**
```typescript
function generateMockResponse(message: string, history: any[]): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('budget')) {
    return "Great! I can help you plan a budget-friendly trip...";
  }
  // ... more conditions
}
```

**Add:**
```typescript
if (lowerMessage.includes('ski') || lowerMessage.includes('snow')) {
  return "Awesome! Winter sports trip. What's your skill level - beginner, intermediate, or expert?";
}
```

#### Example 3: Change Chat Widget Position

**File:** `components/FloatingChatWidget.tsx`

**Find:**
```typescript
<button
  onClick={() => setIsOpen(true)}
  className="fixed bottom-6 right-6 w-16 h-16 ..."
>
```

**Change to bottom-left:**
```typescript
<button
  onClick={() => setIsOpen(true)}
  className="fixed bottom-6 left-6 w-16 h-16 ..." // Changed right-6 to left-6
>
```

### Integrating Real AI (Next Step)

#### Option 1: OpenAI

1. **Install SDK**:
```bash
npm install openai
```

2. **Add API key** to `.env.local`:
```env
OPENAI_API_KEY=sk-your-key-here
```

3. **Update** `app/api/chat/route.ts`:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { message, conversationHistory } = await request.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a travel planning assistant. Ask questions to gather: destination, dates, budget, travelers, interests."
      },
      ...conversationHistory,
      { role: "user", content: message }
    ],
  });

  return NextResponse.json({
    success: true,
    response: completion.choices[0].message.content,
    timestamp: new Date().toISOString(),
  });
}
```

#### Option 2: Anthropic Claude

1. **Install SDK**:
```bash
npm install @anthropic-ai/sdk
```

2. **Add API key** to `.env.local`:
```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

3. **Update** `app/api/chat/route.ts`:
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  const { message, conversationHistory } = await request.json();

  const response = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 1024,
    messages: conversationHistory,
  });

  return NextResponse.json({
    success: true,
    response: response.content[0].text,
    timestamp: new Date().toISOString(),
  });
}
```

### Testing Checklist

- [ ] Chat interface loads on homepage
- [ ] Starter prompts are clickable
- [ ] Can type and send messages
- [ ] AI responds (even if mock)
- [ ] Conversation scrolls automatically
- [ ] Floating widget appears on other pages
- [ ] Widget can open/close/minimize
- [ ] No console errors
- [ ] Mobile responsive (test on small screen)

### Common Issues & Fixes

**Issue:** Chat widget not showing
- **Fix:** Check `app/layout.tsx` includes `<FloatingChatWidget />`

**Issue:** Messages not sending
- **Fix:** Check `/api/chat` endpoint is working (test with curl/Postman)

**Issue:** Styling looks broken
- **Fix:** Ensure Tailwind CSS is configured properly

**Issue:** TypeScript errors
- **Fix:** Run `npm run build` to see all errors

### Where to Get Help

1. **Read the docs:**
   - `docs/chat-implementation.md` - Full technical details
   - `docs/chat-architecture-diagram.md` - Visual diagrams

2. **Check existing code:**
   - Look at `ChatLandingPage.tsx` for patterns
   - See how `FloatingChatWidget.tsx` handles state

3. **Test the API:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","conversationHistory":[]}'
```

### Next Steps

1. **Integrate real AI** (OpenAI or Claude)
2. **Connect to backend** (`POST /api/trips`)
3. **Add conversation persistence** (save to database)
4. **Implement data extraction** (structured trip data from chat)
5. **Add error handling** (API failures, rate limits)
6. **Optimize performance** (caching, debouncing)

### Quick Reference

**Start dev server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Run tests:**
```bash
npm test
```

**Check TypeScript:**
```bash
npx tsc --noEmit
```

**Format code:**
```bash
npm run format
```

### Key Concepts

- **Message:** Single chat message (user or AI)
- **Conversation History:** Array of all messages
- **Starter Prompt:** Pre-written message user can click
- **Context:** Page-specific information for AI
- **Extraction:** Getting structured data from natural language

### File Structure

```
app/
├── api/
│   └── chat/
│       └── route.ts          # Chat API endpoint
├── chat/
│   └── page.tsx              # Dedicated chat page
├── layout.tsx                # Global layout (includes widget)
└── page.tsx                  # Landing page (chat interface)

components/
├── ChatLandingPage.tsx       # Main chat UI
└── FloatingChatWidget.tsx    # Persistent chat widget

docs/
├── chat-implementation.md    # Detailed docs
├── chat-first-summary.md     # Overview
├── chat-architecture-diagram.md  # Diagrams
└── QUICKSTART-CHAT.md        # This file
```

### Pro Tips

1. **Use React DevTools** to inspect component state
2. **Check Network tab** to see API requests/responses
3. **Use console.log** liberally while developing
4. **Test on mobile** - chat UX is different on small screens
5. **Read error messages** - they usually tell you exactly what's wrong

### Resources

- [Next.js Docs](https://nextjs.org/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic Claude Docs](https://docs.anthropic.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

---

**Ready to code?** Start with adding a new starter prompt, then move on to integrating real AI!
