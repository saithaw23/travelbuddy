# TravelBuddy Prototype — Current Feature Inventory & User Journey

_Last updated: 2026-01-08_

## 1. Prototype Overview
- **Scope:** Frontend-only Next.js experience that showcases an end-to-end leisure trip planning flow powered by static/mock data.
- **Persona:** Logged-in traveler ("John Doe" / "Krit") exploring, configuring, and checking out curated travel itineraries.
- **Device Target:** Desktop-first layouts with responsive-friendly grid choices; minimal mobile optimization work completed.

## 2. Navigation Surface & Routes (Updated Flow)

### Primary User Paths
| Route | Component | Purpose | Primary Inbound Paths |
| --- | --- | --- | --- |
| `/` | [ChatLandingPage.tsx](../components/ChatLandingPage.tsx) | **NEW:** Chat-first AI trip planning interface with conversational intake | Direct load, header logo |
| `/chat` | [ChatLandingPage.tsx](../components/ChatLandingPage.tsx) | **NEW:** Dedicated full-screen chat experience (same as landing) | Direct navigation, "Chat with AI" links |
| `/ai-plans` | [AIPlansPage.tsx](../components/AIPlansPage.tsx) | AI-generated complete trip plans for selection | Chat conversation completion, "Get AI Trip Plans" CTA |
| `/browse` | [BrowsePage.tsx](../components/BrowsePage.tsx) | Manual category-based place browsing (fallback option) | "Browse Manually" link from `/` or `/chat` |
| `/my-plans` | [MyPlansPage.tsx](../components/MyPlansPage.tsx) | Library of saved/created plans | Header nav, after plan selection |
| `/plan/[id]` | [PlanDetailPage.tsx](../components/PlanDetailPage.tsx) | Individual plan with collaboration (voting, comments) + chat widget | Selecting a plan from `/ai-plans` or creating from `/browse` |
| `/compare-itineraries` | [CompareItinerariesPage.tsx](../components/CompareItinerariesPage.tsx) | Side-by-side plan comparison | Multi-select from `/my-plans` |
| `/checkout` | [CheckoutPage.tsx](../components/CheckoutPage.tsx) | Traveler info + payment form + order summary | "Proceed to Checkout" from `/plan/[id]` |
| `/profile` | [ProfilePage.tsx](../components/ProfilePage.tsx) | User profile, stats, preferences, review contributions | Header avatar chip |

### Global Components
| Component | Purpose | Availability |
| --- | --- | --- |
| [FloatingChatWidget.tsx](../components/FloatingChatWidget.tsx) | **NEW:** Persistent chat assistant accessible from any page | All pages (via layout) |

### Legacy Routes (Deprecated)
| Route | Component | Notes |
| --- | --- | --- |
| `/recommendations` | [RecommendationsPage.tsx](../components/RecommendationsPage.tsx) | Original category recommendations, replaced by chat flow |
| `/trip-summary` | [TripSummaryPage.tsx](../components/TripSummaryPage.tsx) | Original summary view, replaced by `/plan/[id]` |

## 3. End-to-End User Flow (Updated - Chat-First)

### Flow A: AI-Powered Conversational Trip Planning (PRIMARY)
1. **Chat-First Discovery (`/` or `/chat`)**  
   - User lands on conversational AI interface with welcoming message.
   - Sees starter prompts: "Plan a weekend getaway under $1000", "Find me a cultural trip to Asia", "Family vacation with kids", etc.
   - Can type naturally: "I want to visit Japan for 2 weeks in spring with my partner, budget around $5000"
   - AI asks clarifying questions conversationally:
     - "What's most important to you - adventure, relaxation, or culture?"
     - "Any dietary restrictions or special interests?"
     - "Prefer luxury hotels or local experiences?"
   - User responds naturally, building context through conversation.
   - When enough information gathered, AI confirms: "Perfect! I've created 3 amazing trip plans for you" → routes to `/ai-plans`.

2. **Browse AI Plans (`/ai-plans`)**  
   - Displays complete trip plans curated by AI based on chat conversation context.
   - Each plan card shows destination, duration, price, AI confidence score, what's included, and key highlights.
   - User clicks "Select Plan" → confirmation modal → adds to library → routes to `/plan/[id]`.

3. **Plan Collaboration Hub (`/plan/[id]`)**  
   - Shows plan details with hero image, destination, dates, travelers, total cost.
   - **NEW: Floating chat widget available** - users can ask questions about the plan without leaving the page.
   - Displays all included items (flights, hotels, restaurants, activities) in expandable cards.
   - Collaboration features: invite collaborators, team voting, comments, owner notes.
   - Primary CTA: "Proceed to Checkout" → `/checkout`.

4. **My Plans Library (`/my-plans`)**  
   - Shows all saved plans with status badges.
   - **Chat widget available** for questions about managing plans.
   - Multi-select to compare plans → routes to `/compare-itineraries`.

### Flow B: Manual Browsing (FALLBACK)
1. **Chat to Manual Transition (`/` or `/chat`)** 
   - User sees "Prefer to browse on your own?" link.
   - Clicks "Browse Destinations Manually" → routes to `/browse`.

2. **Browse Destinations (`/browse`)**  
   - Category tabs: Flights, Hotels, Restaurants, Activities.
   - **Chat widget available** for questions while browsing.
   - "Near Me" toggle to filter by distance.
   - Add individual items to cart.
   - Click "Create My Plan" → creates plan → routes to `/plan/custom-1`.

3. **Continue with collaboration and checkout** (same as Flow A steps 3-4).

### Persistent Chat Assistant (ALL PAGES)
- **Floating chat widget** ([FloatingChatWidget.tsx](../components/FloatingChatWidget.tsx)) appears on all pages.
- Users can ask contextual questions:
  - On `/browse`: "Why is this hotel recommended?"
  - On `/plan/[id]`: "Can I change the flight time?"
  - On `/checkout`: "What's included in this price?"
- Chat maintains context across pages for seamless assistance.
- Minimizable and closable for users who prefer unassisted browsing.

### Compare Flow
- From `/my-plans`, select 2+ plans → "Compare" button → `/compare-itineraries`.
- Side-by-side comparison with vote summaries and consensus board.

## 4. Feature Inventory by Screen

### Chat Landing (`/` and `/chat`) — NEW PRIMARY INTERFACE
- **Hero section** with AI-powered branding and value proposition.
- **Large conversational chat interface** (60-70% of viewport):
  - Welcome message from AI assistant
  - Message history with user/assistant distinction
  - Typing indicators during AI response
  - Smooth auto-scroll to latest message
- **Starter prompt buttons** (shown before first user message):
  - 6 pre-written prompts covering common use cases
  - Categories: budget, culture, family, adventure, romance, food
  - One-click to start conversation
- **Natural language input**:
  - Text input field with send button
  - Handles complex multi-part requests
  - AI asks clarifying questions dynamically
- **Conversation flow**:
  - AI gathers: destination, dates, budget, travelers, interests, travel style
  - Confirms understanding before generating plans
  - Routes to `/ai-plans` when sufficient context collected
- **Fallback option**: "Browse Manually" link for users preferring visual selection.
- **Features section**: Why chat with AI (natural conversation, smart suggestions, budget aware, personalized).

### Floating Chat Widget (Global) — NEW
- **Persistent across all pages** via layout component.
- **Floating button** in bottom-right corner:
  - Purple circular button with message icon
  - Red notification dot to draw attention
  - Hover animation for discoverability
- **Expandable chat panel**:
  - 384px width × 600px height when open
  - Minimizable to header-only view
  - Closable to return to floating button
- **Contextual assistance**:
  - Provides page-specific help
  - Answers questions about pricing, features, changes
  - Maintains conversation context across pages
- **Smart responses**:
  - Detects keywords (price, change, hotel, flight, food)
  - Provides relevant guidance based on current page
  - Suggests next actions

### Landing Intake (`/`) — DEPRECATED (replaced by chat)
- Marketing hero + feature tiles for value proposition.
- **NEW: "Near Me" toggle** to auto-detect location.
- Multi-section form: destination input with location icon, date inputs + quick presets, traveler count, budget & currency, adventure slider, travel styles (chip toggles), interests (checkbox grid).
- **Updated CTAs:**
  - Primary: "Get AI Trip Plans" (with Sparkles icon) → `/ai-plans`
  - Secondary: "Browse Manually" (with Compass icon) → `/browse`

### AI Plans (`/ai-plans`) — NEW
- Hero section with "Powered by AI" badge.
- Grid of complete trip plan cards featuring:
  - Destination image with tag overlays
  - AI confidence match percentage
  - Plan name, tagline, location, duration, group size
  - What's included (flights, hotels, restaurants, activities counts)
  - Highlights checklist
  - Price per person
  - "Select Plan" CTA
- Confirmation modal when selecting a plan.
- Bottom CTA: "Want to build your own?" → `/browse`.

### Browse Destinations (`/browse`) — NEW
- Sticky header with "Near Me" toggle and location display.
- Category tabs: Flights, Hotels, Restaurants, Activities.
- Item cards with:
  - Image, distance badge (when Near Me enabled)
  - Name, location, rating, tags, duration
  - Price with unit label
  - Add/Added toggle button
- Floating cart summary showing item count and total.
- Slide-out cart drawer with item list and "Create My Plan" CTA.

### My Plans Library (`/my-plans`) — NEW
- Action bar: "Get AI Plan", "Build Custom" buttons.
- Compare button (appears when 2+ plans selected).
- Plan cards with:
  - Selection checkbox for comparison
  - Destination image
  - AI-generated badge (if applicable)
  - Status badge (Draft/Planning/Confirmed/Completed)
  - Plan name, destination, date range, traveler count
  - Collaborator avatars
  - Item count
  - Last updated timestamp
  - Open/Menu actions
- Empty state with CTAs to get started.

### Plan Detail (`/plan/[id]`) — NEW
- Hero section: Plan image, name, AI badge, destination, dates, travelers, cost.
- Participants section with avatar row and invite button.
- Itinerary items in expandable cards:
  - Category icon and label
  - Item image, name, location, date/time, price, rating
  - Vote summary badges (thumbs up/down counts, comment count)
  - Expand to reveal:
    - **Team Votes:** Grid of participants with Yes/No/Maybe buttons
    - **Comments:** List with add comment form
    - **Owner Notes:** Textarea for decisions
- Summary footer with total cost and checkout CTA.
- Invite modal with email input and collaborator capabilities list.

### Profile (`/profile`)
- Profile header with avatar, stats, and buttons (`Edit Profile`, `Settings`).
- Travel preferences blocks (adventure, styles, interests, budget range) with edit affordance.
- AI insight card summarizing behavior.
- Past travels highlight card with imagery placeholder.
- Side column: account summary, travel insights metrics, and three recommendation CTAs.

## 5. Data & State Assumptions
- All screens load static data defined inside their respective components; no API calls are wired yet.
- Navigation between steps does not pass query params or persisted state; each page initializes mock context for "John Doe".
- Selection state on `/recommendations` only lives in-memory and resets on navigation.
- Budget math in summary/compare pages is hard-coded and not derived from selections.

## 6. Extension Touchpoints for Upcoming Add-ons
- **Trip Intake Submission:** Replace `router.push('/recommendations')` with backend trip creation response to propagate a `tripId` through query params or global store.
- **Recommendations Data Layer:** Swap `flights` array for server-provided categories; hydrate selection sidebar with actual totals and call-to-action enabling logic.
- **Itinerary & Comparison:** Fetch itinerary collections per `tripId`, map to accordion/comparison UI, and expose edit/remove actions to mutate backend entries.
- **Checkout:** Integrate payment intent creation, success state, and confirmation screen; guard CTA until validations pass.
- **Profile:** Connect to user preferences endpoint, enabling edits to reflect in recommendation scoring.

This document reflects the current clickable prototype so new feature requests can be mapped to the correct route, data contract, and user decision point.

## 7. Journey Alignment & Gaps (Based on Krit Persona Map)
- **Participants stage:** Current intake only captures the primary user. To support “preference-based planning for participants,” we need a way to invite or at least attribute preferences per traveler, surface their votes/comments, and show who has responded. Majority voting + comment threads satisfy the pain point of “taking all opinions into account,” but we still lack participant onboarding and notification states.
- **Locations stage:** Geolocation-aware suggestions and live availability address the “is there a suitable place?” concern, yet we must also display operational data (business hours, price brackets, real-time status) so users stop “losing track of updates.” Consider caching last-checked timestamps per recommendation card.
- **Reviews stage:** Allowing in-app reviews (text, short video, images) builds trust compared to agency reviews. To fully meet “what if they’re fake?” expectations, add lightweight authenticity signals (verified traveler badge, trip date, moderation queue) when we implement UGC.
- **Expectations:** The user journey expects a single “Super App” experience. Ensure collaboration tools, geolocation, AI info panels, and UGC live inside existing routes so users are not sent to external tools (LINE, Trip). All new features should reuse the current header nav and route structure to keep the flow smooth.

## 8. Feature Placement & UX Considerations
| Feature | Primary Surfaces | UX Notes & Dependencies |
| --- | --- | --- |
| **Group voting + participant comments** | `/recommendations` (selection board), `/trip-summary` (itinerary checklist), `/compare-itineraries` (per-card vote status) | Add a “Participants” drawer that lists invited travelers, their votes per item, and inline comment threads. Owner override controls live next to each recommendation and day item. Requires participant management (invite modal) on `/` intake or `/profile` preferences. |
| **Manual owner edits post-feedback** | `/trip-summary`, `/compare-itineraries` | Convert existing `Change/Remove` buttons into edit flows that let the owner swap items or annotate decisions. Show activity log so collaborators see adjustments. |
| **Geolocation-aware suggestions + nearby AI context** | `/recommendations` (tab content), future place-detail modal | Detect user location (with consent) to seed default destination filters and sort options. When a card is expanded, call an AI helper to summarize live info (hours, trending tips) pulled from internet sources; cache per place to avoid jitter. Consider map snippet to reinforce “around me.” |
| **Place detail info fetch** | New detail panel/modal triggered from recommendation cards across `/recommendations`, `/trip-summary` | Provide structured sections: Overview, Live Essentials (hours, price level, crowd indicator), AI Insights (pull quote), Related content. This is where geolocation + AI info converge. |
| **In-app reviews with media (text/video/image)** | `/recommendations` detail panel, `/trip-summary` day entries, `/profile` past trips | Each place shows a reviews carousel with filter chips (friends, verified, media type). Submission form supports text + optional short video/image upload placeholders. Tie reviews back to user profiles to maintain trust. |

### Flow & Overlap Check
- The flow remains linear (`/` → `/recommendations` → `/trip-summary` → `/checkout`) while collaboration features add parallel loops (participants vote/comment without forcing route changes). Keep collaboration UI collapsible to avoid crowding primary CTAs.
- No route duplication is required; detail panels sit inside existing pages so geolocation + AI insights + reviews share a single surface, preventing conflicting UX.
- Potential friction: participants may need account creation before voting. Mitigate by allowing email-based quick invites with temporary access tokens and showing pending status inside the Participants drawer.
- Ensure global state (trip + participant context) syncs across pages so votes/comments don’t reset when navigating.
