# Mock Data Playbook

> How to work with the deterministic mock data layer and plan the transition to real data.

## File layout

| File | Purpose |
|------|---------|
| `lib/types.ts` | Shared TypeScript interfaces (`CuratedDestination`, `RecommendedItinerary`, `InfluencerTip`, `VerifiedSource`, `TripPlan`, `DailyActivity`) |
| `lib/mockTrips.ts` | All hard-coded mock records — destinations, itineraries, tips, verification entries |
| `lib/useTripData.ts` | React hooks & pure helpers that read from `mockTrips`. Used by components instead of fetch calls |
| `lib/mockData.ts` | Original browse-page mock data (flights, hotels, restaurants, activities). Unchanged. |

## Extending the mocks

### Add a new destination

1. Add an entry to `curatedDestinations` in `lib/mockTrips.ts`.
2. Create at least one `RecommendedItinerary` whose `destinationId` matches the new destination's `id`.
3. Optionally add an `InfluencerTip` and a `VerifiedSource`.
4. The `mockTripPlans` array is built automatically — no manual wiring needed.

### Add a new itinerary variant

Append to `recommendedItineraries`. The only requirement is that `destinationId` references an existing destination `id`.

### Adjust confidence scores

Confidence scores live on both `CuratedDestination.confidenceScore` and `VerifiedSource.confidenceScore`. They are deterministic integers (0–100). Change them directly in `mockTrips.ts`.

### Add tags

Tags are free-form strings on `RecommendedItinerary.tags`. The `useItineraries` hook filters by exact (case-insensitive) match.

## Using the hooks

```tsx
import { useDestinations, useItineraries, useTips, useMockTripPlans, getConfidenceScore } from '@/lib/useTripData';

// All destinations
const destinations = useDestinations();

// Filter by city substring
const tokyoOnly = useDestinations('Tokyo');

// Itineraries under $3,000 tagged "food"
const foodTrips = useItineraries({ maxBudget: 3000, tag: 'food' });

// Full TripPlan objects for a specific destination
const plans = useMockTripPlans({ destinationId: 'dest-bali' });

// Deterministic confidence score (pure function, not a hook)
const score = getConfidenceScore('dest-tokyo'); // → 92
```

## Replacing mocks with real data

When a real API or database is available:

1. **Keep the types** — `CuratedDestination`, `RecommendedItinerary`, etc. in `lib/types.ts` stay the same.
2. **Swap the data source** — Replace the hard-coded arrays in `mockTrips.ts` with async fetch calls or a database query layer.
3. **Convert hooks from `useMemo` to data-fetching** — e.g., use `useSWR`, React Query, or Next.js server components to load data:
   ```ts
   export function useDestinations(cityFilter?: string) {
     const { data } = useSWR(`/api/destinations?city=${cityFilter ?? ''}`, fetcher);
     return data ?? [];
   }
   ```
4. **Feature flag** — During transition, add an env var `NEXT_PUBLIC_USE_MOCK_DATA=true` and branch:
   ```ts
   const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
   ```
5. **Remove `mockTrips.ts`** once the real layer is stable.

## Design decisions

- **No randomisers** — every value is a literal so screenshots and demos are reproducible.
- **JSON-friendly** — all objects are plain serialisable records (no `Date` instances, class instances, etc.).
- **Confidence scores** — deterministic integers baked into each destination. They surface as "verified" badges in the UI. Adjust freely for demo purposes.
