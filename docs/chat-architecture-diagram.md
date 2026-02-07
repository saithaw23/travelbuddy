# Chat-First Architecture Diagram

## Component Hierarchy

```
app/layout.tsx
├── {children} (page content)
└── FloatingChatWidget (global, all pages)

app/page.tsx → ChatLandingPage
app/chat/page.tsx → ChatLandingPage
app/browse/page.tsx → BrowsePage + FloatingChatWidget
app/ai-plans/page.tsx → AIPlansPage + FloatingChatWidget
app/plan/[id]/page.tsx → PlanDetailPage + FloatingChatWidget
app/checkout/page.tsx → CheckoutPage + FloatingChatWidget
```

## Data Flow: Chat to Trip Creation

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              ChatLandingPage Component                       │
│  • Displays conversation                                     │
│  • Handles user input                                        │
│  • Shows starter prompts                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  POST /api/chat                              │
│  Request:                                                    │
│  {                                                           │
│    message: "I want to visit Japan",                        │
│    conversationHistory: [...],                              │
│    context: { currentPage, userId }                         │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              AI Processing Layer                             │
│  • OpenAI GPT-4 / Anthropic Claude                          │
│  • Extract structured data                                   │
│  • Generate natural responses                                │
│  • Determine if ready for trip creation                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Response to Frontend                        │
│  {                                                           │
│    success: true,                                            │
│    response: "Great! What's your budget?",                  │
│    extractedInfo: {                                          │
│      destination: "Japan",                                   │
│      duration: "14 days"                                     │
│    },                                                        │
│    readyForPlans: false                                      │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Update Conversation UI                          │
│  • Add AI response to messages                              │
│  • Show typing indicator                                     │
│  • Scroll to bottom                                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    (User continues chat)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│          When readyForPlans: true                            │
│                                                              │
│  POST /api/trips                                             │
│  {                                                           │
│    destination: "Tokyo, Japan",                             │
│    fromDate: "2026-04-01",                                  │
│    toDate: "2026-04-14",                                    │
│    budget: 5000,                                            │
│    travelers: 2,                                            │
│    interests: ["food", "culture"],                          │
│    travelStyle: ["local experiences"]                       │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend Trip Creation                           │
│  • Save trip to database                                     │
│  • Call vendor APIs (Amadeus, Foursquare)                   │
│  • Generate AI recommendations                               │
│  • Return tripId                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Route to AI Plans                               │
│  router.push(`/ai-plans?tripId=${tripId}`)                  │
└─────────────────────────────────────────────────────────────┘
```

## Floating Chat Widget Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Any Page                                  │
│  (browse, plan detail, checkout, etc.)                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              FloatingChatWidget                              │
│  State: Closed (floating button)                             │
└─────────────────────────────────────────────────────────────┘
                            ↓ (user clicks)
┌─────────────────────────────────────────────────────────────┐
│              FloatingChatWidget                              │
│  State: Open (chat panel)                                    │
│  • Load conversation history from session                    │
│  • Show contextual welcome message                           │
└─────────────────────────────────────────────────────────────┘
                            ↓ (user asks question)
┌─────────────────────────────────────────────────────────────┐
│              POST /api/chat                                  │
│  • Include current page context                              │
│  • Include conversation history                              │
│  • Include user session data                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Contextual AI Response                          │
│  • Detect page: /browse → hotel recommendations             │
│  • Detect page: /plan/[id] → plan modifications             │
│  • Detect page: /checkout → payment questions                │
│  • Detect keywords: price, change, help, etc.               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Update Widget UI                                │
│  • Display AI response                                       │
│  • Save to session storage                                   │
│  • Maintain context for next question                        │
└─────────────────────────────────────────────────────────────┘
```

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│                  Session Storage                             │
│                                                              │
│  chatHistory: Message[]                                      │
│  extractedTripData: TripData                                 │
│  currentTripId: string                                       │
│  userId: string                                              │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              React Component State                           │
│                                                              │
│  ChatLandingPage:                                            │
│    - messages: Message[]                                     │
│    - inputValue: string                                      │
│    - isTyping: boolean                                       │
│                                                              │
│  FloatingChatWidget:                                         │
│    - isOpen: boolean                                         │
│    - isMinimized: boolean                                    │
│    - messages: Message[]                                     │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                  Backend Database                            │
│                                                              │
│  conversations:                                              │
│    - id, userId, messages, createdAt, updatedAt             │
│                                                              │
│  trips:                                                      │
│    - id, userId, conversationId, tripData, status           │
└─────────────────────────────────────────────────────────────┘
```

## API Endpoints

```
┌─────────────────────────────────────────────────────────────┐
│                  Chat Endpoints                              │
│                                                              │
│  POST   /api/chat                                            │
│         • Process user message                               │
│         • Return AI response                                 │
│         • Extract trip data                                  │
│                                                              │
│  GET    /api/chat/history                                    │
│         • Retrieve conversation history                      │
│         • Filter by userId                                   │
│                                                              │
│  POST   /api/chat/context                                    │
│         • Update conversation context                        │
│         • Add page-specific data                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Trip Endpoints (Existing)                   │
│                                                              │
│  POST   /api/trips                                           │
│         • Create trip from chat data                         │
│         • Call vendor APIs                                   │
│         • Generate recommendations                           │
│                                                              │
│  GET    /api/trips/:id                                       │
│         • Retrieve trip details                              │
│                                                              │
│  PATCH  /api/trips/:id                                       │
│         • Update trip via chat                               │
└─────────────────────────────────────────────────────────────┘
```

## Integration with Existing Features

```
Chat-First Landing
        ↓
    AI Plans ←──────────┐
        ↓               │
   Plan Detail          │
        ↓               │
    Checkout            │
        ↓               │
   Confirmation         │
                        │
Browse (Manual) ────────┘
        ↓
   Create Plan
        ↓
   Plan Detail
        ↓
    Checkout

(FloatingChatWidget available on ALL pages)
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend                                 │
│                                                              │
│  • Next.js 14 (App Router)                                  │
│  • React 18                                                  │
│  • TypeScript                                                │
│  • Tailwind CSS                                              │
│  • Lucide Icons                                              │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                     API Layer                                │
│                                                              │
│  • Next.js Route Handlers                                    │
│  • OpenAI API / Anthropic Claude                            │
│  • Session Management                                        │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                     Backend (Existing)                       │
│                                                              │
│  • NestJS                                                    │
│  • PostgreSQL                                                │
│  • Redis (caching)                                           │
│  • Amadeus API (flights/hotels)                             │
│  • Foursquare API (restaurants)                             │
└─────────────────────────────────────────────────────────────┘
```

## Message Types

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    extractedData?: Partial<TripData>;
    suggestions?: string[];
    actions?: Action[];
  };
}

interface TripData {
  destination: string;
  fromDate: string;
  toDate: string;
  budget: number;
  currency: string;
  travelers: number;
  interests: string[];
  travelStyle: string[];
  adventureLevel?: number;
}

interface Action {
  type: 'route' | 'api_call' | 'suggestion';
  payload: any;
}
```

## Error Handling Flow

```
User Message
    ↓
POST /api/chat
    ↓
┌─────────────────────────────────────────┐
│ Try: AI API Call                        │
│   ↓                                     │
│ Success → Return response               │
│   ↓                                     │
│ Catch: Error                            │
│   ↓                                     │
│ Log error                               │
│   ↓                                     │
│ Return fallback response:               │
│ "I'm having trouble right now.          │
│  Please try again or browse manually."  │
└─────────────────────────────────────────┘
    ↓
Display in UI
    ↓
Offer fallback: "Browse Manually" button
```
