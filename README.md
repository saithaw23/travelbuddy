# TravelBuddy - AI-Powered Travel Planning

An intelligent travel planning platform that uses **conversational AI** to help users plan their perfect trips through natural dialogue.

## 🌟 Key Features

- **Chat-First Interface** - Plan trips by chatting naturally with AI
- **AI-Generated Itineraries** - Get personalized trip plans based on your preferences
- **Collaborative Planning** - Invite friends/family to vote and comment on plans
- **Flexible Editing** - Swap individual items without rebuilding entire trips
- **Budget Transparency** - Detailed price breakdowns with all fees visible
- **Persistent AI Assistant** - Floating chat widget available on all pages
- **Manual Browsing** - Fallback option for users who prefer visual selection

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd travelbuddy
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The chat interface will load automatically on the homepage.

## 💬 Chat-First Experience

### How It Works

1. **Start Chatting** - Users describe their trip in natural language
2. **AI Asks Questions** - System gathers destination, dates, budget, preferences
3. **Generate Plans** - AI creates 3 personalized itineraries
4. **Select & Collaborate** - Choose a plan, invite others, vote on items
5. **Checkout** - Complete booking with transparent pricing

### Quick Start for Developers

See [docs/QUICKSTART-CHAT.md](docs/QUICKSTART-CHAT.md) for a 5-minute setup guide.

## 📁 Project Structure

```
app/
├── api/
│   └── chat/              # Chat API endpoint
├── ai-plans/              # AI-generated trip plans
├── browse/                # Manual browsing (fallback)
├── chat/                  # Dedicated chat page
├── checkout/              # Payment & booking
├── my-plans/              # User's saved plans
├── plan/[id]/             # Individual plan details
├── profile/               # User profile
├── layout.tsx             # Global layout (includes chat widget)
└── page.tsx               # Landing page (chat interface)

components/
├── ChatLandingPage.tsx    # Main chat interface
├── FloatingChatWidget.tsx # Persistent chat widget
├── AIPlansPage.tsx        # AI-generated plans display
├── BrowsePage.tsx         # Manual browsing
├── PlanDetailPage.tsx     # Plan collaboration hub
└── ...                    # Other components

docs/
├── QUICKSTART-CHAT.md     # Quick start guide
├── chat-implementation.md # Detailed technical docs
├── chat-first-summary.md  # High-level overview
├── chat-architecture-diagram.md  # Visual architecture
├── current-user-flow.md   # User journey documentation
└── implementation-plan.md # Backend integration plan
```

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **AI Integration:** OpenAI GPT-4 / Anthropic Claude (configurable)
- **Backend:** NestJS (planned), PostgreSQL, Redis
- **APIs:** Amadeus (flights/hotels), Foursquare (restaurants)

## 📚 Documentation

- **[Quick Start Guide](docs/QUICKSTART-CHAT.md)** - Get started in 5 minutes
- **[Chat Implementation](docs/chat-implementation.md)** - Detailed technical docs
- **[Architecture Diagram](docs/chat-architecture-diagram.md)** - Visual system design
- **[User Flow](docs/current-user-flow.md)** - Complete user journey
- **[Implementation Plan](docs/implementation-plan.md)** - Backend integration roadmap

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# AI Provider (choose one)
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...

# Backend API (when ready)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### AI Integration

The chat currently uses mock responses. To integrate real AI:

1. Install SDK:
```bash
npm install openai
# or
npm install @anthropic-ai/sdk
```

2. Update `app/api/chat/route.ts` with your API calls

See [docs/chat-implementation.md](docs/chat-implementation.md) for detailed instructions.

## 🧪 Testing

```bash
# Run tests
npm test

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build for production
npm run build
```

## 🎨 Key Components

### ChatLandingPage
Main conversational interface with:
- Starter prompts for common trip types
- Natural language input
- Dynamic AI responses
- Automatic routing to plans

### FloatingChatWidget
Persistent assistant that:
- Appears on all pages
- Provides contextual help
- Maintains conversation history
- Minimizable/closable

### AIPlansPage
Displays AI-generated trip plans with:
- Destination details
- Price breakdowns
- Included items (flights, hotels, activities)
- AI confidence scores

## 🚦 User Flow

```
Landing (Chat) → AI Plans → Plan Detail → Checkout
                     ↓
              Browse (Manual)
```

**Floating chat widget available on all pages**

## 🔄 Migration from Form-Based

The original form-based intake is preserved in `components/LandingPage.tsx` and can be restored if needed:

```typescript
// In app/page.tsx
import LandingPage from "@/components/LandingPage";
export default function Home() {
  return <LandingPage />;
}
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 Development Roadmap

### Phase 1 (Current)
- [x] Chat-first landing page
- [x] Floating chat widget
- [x] Mock AI responses
- [ ] Real AI integration (OpenAI/Claude)
- [ ] Backend API connection

### Phase 2
- [ ] Conversation persistence
- [ ] Advanced data extraction
- [ ] Voice input
- [ ] Multi-language support
- [ ] Collaborative chat

### Phase 3
- [ ] Image uploads
- [ ] Real-time availability
- [ ] Advanced personalization
- [ ] Mobile app

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
