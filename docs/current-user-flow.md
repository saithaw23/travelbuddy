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
| `/` | [LandingPage.tsx](../components/LandingPage.tsx) | Trip intake form + marketing hero + "Near Me" toggle | Direct load, header logo |
| `/ai-plans` | [AIPlansPage.tsx](../components/AIPlansPage.tsx) | **NEW:** AI-generated complete trip plans for selection | "Get AI Trip Plans" CTA from `/` |
| `/browse` | [BrowsePage.tsx](../components/BrowsePage.tsx) | **NEW:** Manual category-based place browsing | "Browse Manually" CTA from `/` |
| `/my-plans` | [MyPlansPage.tsx](../components/MyPlansPage.tsx) | **NEW:** Library of saved/created plans | Header nav, after plan selection |
| `/plan/[id]` | [PlanDetailPage.tsx](../components/PlanDetailPage.tsx) | **NEW:** Individual plan with collaboration (voting, comments) | Selecting a plan from `/ai-plans` or creating from `/browse` |
| `/compare-itineraries` | [CompareItinerariesPage.tsx](../components/CompareItinerariesPage.tsx) | Side-by-side plan comparison | Multi-select from `/my-plans` |
| `/checkout` | [CheckoutPage.tsx](../components/CheckoutPage.tsx) | Traveler info + payment form + order summary | "Proceed to Checkout" from `/plan/[id]` |
| `/profile` | [ProfilePage.tsx](../components/ProfilePage.tsx) | User profile, stats, preferences, review contributions | Header avatar chip |

### Legacy Routes (May be deprecated)
| Route | Component | Notes |
| --- | --- | --- |
| `/recommendations` | [RecommendationsPage.tsx](../components/RecommendationsPage.tsx) | Original category recommendations, still accessible |
| `/trip-summary` | [TripSummaryPage.tsx](../components/TripSummaryPage.tsx) | Original summary view, still accessible |

## 3. End-to-End User Flow (Updated)

### Flow A: AI-Powered Trip Planning
1. **Discovery & Intake (`/`)**  
   - User lands on hero section describing AI-powered planning.
   - Can toggle "Near Me" to auto-detect location and get local recommendations.
   - Completes trip basics (destination, dates, traveler count), budget, travel style, interests.
   - Clicks "Get AI Trip Plans" → routes to `/ai-plans`.

2. **Browse AI Plans (`/ai-plans`)**  
   - Displays complete trip plans curated by AI (e.g., "Tokyo Cultural Immersion", "Bali Wellness Retreat").
   - Each plan card shows destination, duration, price, AI confidence score, what's included (flights, hotels, restaurants, activities), and key highlights.
   - User clicks "Select Plan" → confirmation modal → adds to library → routes to `/plan/[id]`.

3. **Plan Collaboration Hub (`/plan/[id]`)**  
   - Shows plan details with hero image, destination, dates, travelers, total cost.
   - Displays all included items (flights, hotels, restaurants, activities) in expandable cards.
   - **Collaboration Features:**
     - Invite collaborators via email
     - Team voting (Yes/No/Maybe) on each item
     - Comments section per item
     - Owner notes/decisions log
   - Primary CTA: "Proceed to Checkout" → `/checkout`.

4. **My Plans Library (`/my-plans`)**  
   - Shows all saved plans with status badges (Draft, Planning, Confirmed, Completed).
   - Multi-select to compare plans → routes to `/compare-itineraries`.
   - Quick actions: Share, Duplicate, Delete.

### Flow B: Manual Browsing
1. **Intake (`/`)** → User clicks "Browse Manually" → routes to `/browse`.

2. **Browse Destinations (`/browse`)**  
   - Category tabs: Flights, Hotels, Restaurants, Activities.
   - "Near Me" toggle to filter by distance.
   - Add individual items to cart.
   - Click "Create My Plan" → creates plan → routes to `/plan/custom-1`.

3. **Continue with collaboration and checkout** (same as Flow A steps 3-4).

### Compare Flow
- From `/my-plans`, select 2+ plans → "Compare" button → `/compare-itineraries`.
- Side-by-side comparison with vote summaries and consensus board.

## 4. Feature Inventory by Screen

### Landing Intake (`/`)
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
