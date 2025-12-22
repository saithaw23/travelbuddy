# TravelBuddy Implementation Plan

_Last updated: 2025-12-23_

## Goals & Scope
- Stand up a NestJS service layer that powers the existing Next.js demo shell with real data.
- Limit third-party usage to free-tier APIs initially: Amadeus self-serve tier (flights/hotels) and Foursquare Places (restaurants). Defer paid APIs (Google Places, OpenAI/Claude) until business validation.
- Split execution between two developers so backend contracts and frontend wiring progress in parallel.

## External APIs (Phase 1)
| Capability | Provider | Free Tier Notes | How We Use It |
| --- | --- | --- | --- |
| Flights (500+ airlines) | Amadeus Flight Offers Search | 10K calls / month | Fetch top flight options filtered by origin, destination, dates, and cabin class; cache by search hash.
| Hotels (150K+) | Amadeus Hotel Search | 10K calls / month | Pull nightly rates + room info for destination and date window; cache daily per city.
| Restaurants worldwide | Foursquare Places API | 1K calls / hour | Query by geo + budget, map categories to user interests, store results for 24h.
| Attractions | **Deferred** (Google Places) | Pay-per-use | Mock via curated dataset until paid tier approved.
| AI Recommendations | **Deferred** (OpenAI/Claude) | Pay-per-use | Use templated heuristics for MVP; keep abstraction so LLM can drop-in later.

Architectural guardrails:
- Build a `VendorsModule` with per-provider services so swapping or extending vendors does not affect core logic.
- Introduce Redis caching + rate-limiters to respect free-tier quotas.
- Record telemetry on API consumption for future scaling decisions.

## Developer Split

### Developer A – Backend (NestJS / Infrastructure)
1. **Scaffold & Config**
   - `nest new api`; add ESLint, Jest, Husky, dotenv, `@nestjs/config`.
   - Docker Compose for Postgres + Redis; ensure `npm run start:dev` uses hot reload.
2. **Core Modules & Entities**
   - Modules: `Auth`, `Users`, `Trips`, `Itineraries`, `Recommendations`, `Selections` (cart), `Checkout`, `Vendors`.
   - Data models (Prisma or TypeORM): `User`, `TravelerProfile`, `TripRequest`, `TripPreference`, `RecommendationItem`, `ItineraryDay`, `Selection`, `Booking`.
3. **Endpoints (initial contract)**
   - `POST /api/trips` save intake from [components/LandingPage.tsx](../components/LandingPage.tsx).
   - `GET /api/trips/:id` hydrate profile, budget, interests for profile/trip-summary pages.
   - `GET /api/recommendations/:tripId` respond with sections `{flights, hotels, restaurants}`; include `matchScore`, `price`, `bookingLink`.
   - `POST /api/recommendations/:tripId/refresh` queue refresh job; respond with job id.
   - `GET /api/itineraries/:tripId` deliver day-by-day breakdown for [components/TripSummaryPage.tsx](../components/TripSummaryPage.tsx) and [components/CompareItinerariesPage.tsx](../components/CompareItinerariesPage.tsx).
   - `PUT /api/selections/:tripId` persist user-selected items from [components/RecommendationsPage.tsx](../components/RecommendationsPage.tsx).
   - `POST /api/checkout/:tripId` create payment intent placeholder (mock until processor integrated).
4. **Vendor Integrations**
   - Implement Amadeus token client, search helpers, response normalizers, and caching.
   - Implement Foursquare Places fetcher with category mapping and scoring utilities.
   - Provide mock providers for future Google/LLM services; feature-flag via config.
5. **Recommendation Engine**
   - Compose vendor data, run rule-based scoring (budget fit, interest overlap, style match) to produce `matchScore`.
   - Persist generated options for audit; expose reasons string.
6. **Testing & Docs**
   - Unit tests for services + controllers; integration test hitting Docker DB.
   - Generate OpenAPI spec (`@nestjs/swagger`) to share with frontend; export to `docs/api-spec.yaml`.
7. **Infra & Observability**
   - Add health checks, rate limiting (Helmet + throttler), structured logging (pino), metrics stub.

### Developer B – Frontend Wiring (Next.js / UI)
1. **API Client Layer**
   - Create `lib/api.ts` with typed fetch helpers (using the OpenAPI spec) and SWR/React Query hooks per endpoint.
   - Handle optimistic updates for selection toggles on [components/RecommendationsPage.tsx](../components/RecommendationsPage.tsx).
2. **Landing & Intake Integration**
   - Replace current hard-coded state submit in [components/LandingPage.tsx](../components/LandingPage.tsx) with `POST /api/trips` call; route to `/recommendations?tripId=...` using returned id.
3. **Recommendations Screen**
   - Fetch `GET /api/recommendations/:tripId` server-side (Next RSC) and hydrate client components.
   - Wire “Select” buttons to `PUT /api/selections/:tripId` and reflect real selection state in sidebar.
   - Display API quotas / warnings if backend returns throttle metadata.
4. **Trip Summary & Comparison**
   - For [components/TripSummaryPage.tsx](../components/TripSummaryPage.tsx) and [components/CompareItinerariesPage.tsx](../components/CompareItinerariesPage.tsx), swap mock itinerary data for responses from `/api/itineraries`.
   - Implement skeleton loaders + error boundaries for fetch failures.
5. **Checkout Flow**
   - Integrate [components/CheckoutPage.tsx](../components/CheckoutPage.tsx) with `POST /api/checkout/:tripId`; show returned confirmation id and payment status placeholder.
6. **Profile Page Sync**
   - Tie [components/ProfilePage.tsx](../components/ProfilePage.tsx) stats to `GET /api/users/me` and user trip history endpoints.
7. **State Management & QA**
   - Use React Context or Zustand to keep `tripId` and selection summary accessible across pages.
   - Add Playwright smoke tests covering intake → recommendations → summary flow hitting mocked API responses.

## Integration Timeline (Suggested)
1. **Week 1**: Backend scaffolding + trip intake endpoints; frontend wiring for trip creation.
2. **Week 2**: Vendor adapters + recommendation engine; frontend hooks for recommendations & selections.
3. **Week 3**: Itinerary + comparison data, checkout mock, profile sync, end-to-end tests.
4. **Week 4**: Hardening, monitoring, documentation, decision on adding paid APIs.

## Collaboration Notes
- Maintain shared OpenAPI document and contract tests to detect breaking changes early.
- Use feature flags to allow frontend to fall back to mock data when backend feature incomplete.
- Track API quota usage centrally; expose `/api/system/quotas` endpoint for dashboards so frontend can surface “data may be stale” banners if limits hit.