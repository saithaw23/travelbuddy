# TravelBuddy Prototype — Current Feature Inventory & User Journey

_Last updated: 2026-01-08_

## 1. Prototype Overview
- **Scope:** Frontend-only Next.js experience that showcases an end-to-end leisure trip planning flow powered by static/mock data.
- **Persona:** Logged-in traveler ("John Doe") exploring, configuring, and checking out a curated New York City holiday itinerary.
- **Device Target:** Desktop-first layouts with responsive-friendly grid choices; minimal mobile optimization work completed.

## 2. Navigation Surface & Routes
| Route | Component | Purpose | Primary Inbound Paths |
| --- | --- | --- | --- |
| `/` | [components/LandingPage.tsx](../components/LandingPage.tsx) | Trip intake form + marketing hero | Direct load, header logo, footer links |
| `/recommendations` | [components/RecommendationsPage.tsx](../components/RecommendationsPage.tsx) | Category tabs for AI-matched options + selection cart | Submission from `/` |
| `/trip-summary` | [components/TripSummaryPage.tsx](../components/TripSummaryPage.tsx) | Condensed itinerary + budget card + CTA to checkout/compare | "Save and Review Trip" CTA on `/recommendations` |
| `/compare-itineraries` | [components/CompareItinerariesPage.tsx](../components/CompareItinerariesPage.tsx) | Saved itinerary cards + comparison table + expand/collapse per day | CTA from `/trip-summary`, nav experimentation |
| `/checkout` | [components/CheckoutPage.tsx](../components/CheckoutPage.tsx) | Traveler info + payment form + order summary | "Book This Plan" CTAs in comparison + "Continue to Checkout" on summary |
| `/profile` | [components/ProfilePage.tsx](../components/ProfilePage.tsx) | User profile, stats, preferences, loyalty insights | Header avatar chip |

All routes share a common sticky header (logo, marketing links, avatar) and footer (legal links).

## 3. End-to-End User Flow
1. **Discovery & Intake (`/`)**  
   - User lands on hero section describing AI-powered planning.
   - Completes trip basics (destination, dates, traveler count), budget, travel style, interests, optional per-traveler preferences.
   - Submits form, which currently uses `router.push('/recommendations')` without persisting data.

2. **Browse Recommendations (`/recommendations`)**  
   - Category tabs (Flights, Hotels, Restaurants, Attractions, Car Rentals) with count badges.
   - Filters sidebar (AI match score slider, price slider, sort, budget checkbox).
   - Card list (currently flights only) showing match badge, route, duration, price, and `Select` toggles updating right-hand cart placeholder.
   - "Save and Review Trip" CTA routes to `/trip-summary` regardless of selected items.

3. **Evaluate Summary (`/trip-summary`)**  
   - Gradient hero reiterates destination, dates, travelers, and progress step.
   - Accordion itinerary per day with action buttons (`Change`, `Remove`) using static data.
   - Budget cards show total budget, spend, remaining, and breakdown by category.
   - Primary CTAs: `Continue to Checkout` (→ `/checkout`) and `Compare Options` (→ `/compare-itineraries`).

4. **Compare Alternatives (`/compare-itineraries`)**  
   - Grid of saved itineraries showing cost, duration, traveler count, with toggle-select states.
   - Comparison matrix highlights total cost and budget status for selected itineraries (two by default).
   - Detailed cards for each selected itinerary feature expandable per-day agendas and CTAs (`Book This Plan`, `Edit Comparison`).

5. **Checkout (`/checkout`)**  
   - Split layout with traveler details form, mock payment inputs, terms checkbox, primary CTA (`Complete Booking`).
   - Sticky order summary card listing cost breakdown and trip facts, reinforcing commitment.

6. **Profile (`/profile`)**  
   - Serves as a personalized hub showing avatar, stats (trips, countries, spending), saved travel styles, interests, AI insight blurb, past trip highlight, account + loyalty info, and hard-coded destination suggestions.
   - Provides future surface to manage preferences that feed earlier steps.

## 4. Feature Inventory by Screen
### Landing Intake (`/`)
- Marketing hero + feature tiles for value proposition.
- Multi-section form: destination, date inputs + quick presets, traveler count with dynamic per-person preferences, budget & currency, adventure slider, travel styles (chip toggles), interests (checkbox grid).
- Secondary CTA to browse all destinations (currently non-functional). 

### Recommendations (`/recommendations`)
- Category tabs with active styling and count chips.
- Filter panel: AI match slider, price slider, budget checkbox, sort dropdown, clear button.
- Recommendation cards (flights demo) with image placeholder gradient, match badge, route, schedule, price, selection button.
- Right sidebar summary listing selected items placeholder + budget breakdown (zeros initially) + CTA to trip summary.

### Trip Summary (`/trip-summary`)
- Hero summarizing trip metadata and progress step.
- Accordion itinerary segments with timeline styling and `Change/Remove` affordances.
- Budget overview card plus category breakdown and status alert (within budget) with remaining amount message.
- Branching CTAs to resume editing (`Compare Options`) or continue conversion (`Checkout`).

### Compare Itineraries (`/compare-itineraries`)
- Saved itinerary cards with select/deselect logic, visual checkmark, and cost/destination metadata.
- Buttons to compare selected itineraries (scrolls page) or clear selection.
- Comparison table showing total cost and budget status row.
- Detailed itinerary cards per selection, each with gradient header, day-by-day expanders, and booking actions.

### Checkout (`/checkout`)
- Traveler details form (name, email, phone) and payment form (card number, expiry, CVV).
- Terms checkbox, primary CTA (`Complete Booking`), secondary CTA (`Save for Later`).
- Sticky order summary with line items (flight, hotel, activities, meals) and trip detail list.

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
