/**
 * Deterministic mock data for the "verified itineraries" feature.
 * Every value is a plain JSON-friendly literal — no randomisers.
 *
 * To extend: add entries to the arrays below, then wire them into
 * the helper hooks in useTripData.ts.  See docs/MOCK-DATA-PLAYBOOK.md.
 */

import type {
  CuratedDestination,
  RecommendedItinerary,
  InfluencerTip,
  VerifiedSource,
  TripPlan,
} from './types';

// ---------------------------------------------------------------------------
// Curated destinations
// ---------------------------------------------------------------------------

export const curatedDestinations: CuratedDestination[] = [
  {
    id: 'dest-tokyo',
    city: 'Tokyo',
    country: 'Japan',
    confidenceScore: 92,
    verificationNotes: 'Prices verified via JTB and Japan Tourism Agency Q1 2026 data.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600',
  },
  {
    id: 'dest-bali',
    city: 'Bali',
    country: 'Indonesia',
    confidenceScore: 88,
    verificationNotes: 'Hotel rates cross-checked with Agoda & Booking.com Jan 2026.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600',
  },
  {
    id: 'dest-paris',
    city: 'Paris',
    country: 'France',
    confidenceScore: 95,
    verificationNotes: 'Attractions & transit verified against official Paris tourism board.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600',
  },
  {
    id: 'dest-nyc',
    city: 'New York City',
    country: 'USA',
    confidenceScore: 72,
    verificationNotes: 'Some Broadway show prices may change seasonally; last checked Dec 2025.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600',
  },
  {
    id: 'dest-barcelona',
    city: 'Barcelona',
    country: 'Spain',
    confidenceScore: 84,
    verificationNotes: 'Museum & tapas tour prices confirmed via GetYourGuide Feb 2026.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600',
  },
];

// ---------------------------------------------------------------------------
// Recommended itineraries
// ---------------------------------------------------------------------------

export const recommendedItineraries: RecommendedItinerary[] = [
  {
    id: 'itin-tokyo-culture',
    destinationId: 'dest-tokyo',
    estBudget: 3200,
    tags: ['culture', 'food', 'photography'],
    dailyBreakdown: [
      { day: 1, title: 'Asakusa & Senso-ji', description: 'Explore Tokyo\'s oldest temple, stroll Nakamise-dori, then lunch in Kappabashi.', estimatedCost: 120 },
      { day: 2, title: 'Tsukiji Outer Market & Ginza', description: 'Morning street food tour, afternoon shopping in Ginza district.', estimatedCost: 180 },
      { day: 3, title: 'Akihabara & TeamLab', description: 'Geek culture in the morning, immersive digital art in the evening.', estimatedCost: 150 },
      { day: 4, title: 'Day trip to Kamakura', description: 'Visit the Great Buddha and Hokokuji bamboo grove.', estimatedCost: 100 },
      { day: 5, title: 'Shinjuku & Shibuya', description: 'Meiji Shrine, Harajuku fashion, Shibuya crossing at sunset.', estimatedCost: 130 },
    ],
  },
  {
    id: 'itin-tokyo-adventure',
    destinationId: 'dest-tokyo',
    estBudget: 4100,
    tags: ['adventure', 'food', 'nightlife'],
    dailyBreakdown: [
      { day: 1, title: 'Mt. Takao Hike', description: 'Cable car up, hike the summit trail, soba lunch at the top.', estimatedCost: 90 },
      { day: 2, title: 'Go-karting & Robot Restaurant', description: 'Mario-kart through the streets, evening robot cabaret show.', estimatedCost: 250 },
      { day: 3, title: 'Odaiba thrill park', description: 'VR adventure zone and onsen with Tokyo Bay views.', estimatedCost: 180 },
      { day: 4, title: 'Sumo morning practice', description: 'Watch training at a beya, then ramen hopping in Ikebukuro.', estimatedCost: 100 },
      { day: 5, title: 'Golden Gai bar-hop', description: 'Explore 200+ tiny bars in Shinjuku\'s famous alley.', estimatedCost: 200 },
    ],
  },
  {
    id: 'itin-bali-wellness',
    destinationId: 'dest-bali',
    estBudget: 2200,
    tags: ['wellness', 'nature', 'budget-friendly'],
    dailyBreakdown: [
      { day: 1, title: 'Ubud rice terraces', description: 'Tegallalang walk and coffee plantation tour.', estimatedCost: 60 },
      { day: 2, title: 'Yoga & spa day', description: 'Morning vinyasa at The Yoga Barn, afternoon Balinese massage.', estimatedCost: 80 },
      { day: 3, title: 'Waterfall trail', description: 'Trek to Tegenungan and Kanto Lampo waterfalls.', estimatedCost: 50 },
      { day: 4, title: 'Sunrise at Mt. Batur', description: 'Pre-dawn hike with breakfast at the summit.', estimatedCost: 75 },
    ],
  },
  {
    id: 'itin-paris-romance',
    destinationId: 'dest-paris',
    estBudget: 4500,
    tags: ['culture', 'food', 'luxury'],
    dailyBreakdown: [
      { day: 1, title: 'Eiffel Tower & Seine cruise', description: 'Skip-the-line summit access, evening dinner cruise.', estimatedCost: 320 },
      { day: 2, title: 'Louvre & Le Marais', description: 'Full-day Louvre visit, falafel lunch on Rue des Rosiers.', estimatedCost: 80 },
      { day: 3, title: 'Montmartre & Sacré-Cœur', description: 'Artists\' quarter walking tour, wine tasting in a cave.', estimatedCost: 110 },
      { day: 4, title: 'Versailles day trip', description: 'Palace and gardens, picnic in the park.', estimatedCost: 140 },
      { day: 5, title: 'Patisserie crawl & Marais shopping', description: 'Visit top patisseries, boutique shopping afternoon.', estimatedCost: 200 },
    ],
  },
  {
    id: 'itin-nyc-budget',
    destinationId: 'dest-nyc',
    estBudget: 1800,
    tags: ['budget-friendly', 'culture', 'food'],
    dailyBreakdown: [
      { day: 1, title: 'Central Park & MET', description: 'Morning jog, pay-what-you-wish entry to the Metropolitan Museum.', estimatedCost: 40 },
      { day: 2, title: 'Brooklyn Bridge & DUMBO', description: 'Walk the bridge, pizza at Juliana\'s, Brooklyn flea market.', estimatedCost: 60 },
      { day: 3, title: 'Chinatown & Lower East Side', description: 'Dim sum brunch, street art tour, Tenement Museum.', estimatedCost: 50 },
      { day: 4, title: 'High Line & Chelsea Market', description: 'Elevated park walk, diverse food stalls for lunch.', estimatedCost: 70 },
    ],
  },
  {
    id: 'itin-barcelona-tapas',
    destinationId: 'dest-barcelona',
    estBudget: 2600,
    tags: ['food', 'culture', 'nightlife'],
    dailyBreakdown: [
      { day: 1, title: 'Gothic Quarter tapas crawl', description: 'Guided food tour through Barri Gòtic.', estimatedCost: 90 },
      { day: 2, title: 'Sagrada Família & Park Güell', description: 'Gaudí masterpieces, skip-the-line tickets.', estimatedCost: 70 },
      { day: 3, title: 'La Boqueria & beach', description: 'Market brunch, afternoon at Barceloneta beach.', estimatedCost: 60 },
      { day: 4, title: 'Montjuïc & flamenco show', description: 'Castle views, Magic Fountain, evening flamenco.', estimatedCost: 100 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Influencer tips
// ---------------------------------------------------------------------------

export const influencerTips: InfluencerTip[] = [
  {
    id: 'tip-1',
    handle: '@tokyofoodie',
    platform: 'instagram',
    summary: 'Skip tourist ramen chains — head to Fuunji in Shinjuku for life-changing tsukemen.',
    proofLink: 'https://instagram.com/p/example-tokyofoodie-1',
  },
  {
    id: 'tip-2',
    handle: '@balivibes',
    platform: 'tiktok',
    summary: 'Book Tegallalang rice terrace visits before 9 AM to beat the crowds entirely.',
    proofLink: 'https://tiktok.com/@balivibes/video/example-1',
  },
  {
    id: 'tip-3',
    handle: '@parisinsider',
    platform: 'youtube',
    summary: 'The Musée de l\'Orangerie is free on the first Sunday of each month — far fewer queues than the Louvre.',
    proofLink: 'https://youtube.com/watch?v=example-paris-1',
  },
  {
    id: 'tip-4',
    handle: '@nycbudgettraveler',
    platform: 'blog',
    summary: 'Get $1 pizza slices on St. Marks Place — just as good as the $5 spots.',
    proofLink: 'https://nycbudgettraveler.com/best-dollar-slices',
  },
  {
    id: 'tip-5',
    handle: '@bcn_adventures',
    platform: 'instagram',
    summary: 'El Xampanyet in Born serves the best cava and anchovies — cash only.',
    proofLink: 'https://instagram.com/p/example-bcn-1',
  },
];

// ---------------------------------------------------------------------------
// Verification sources (one per destination for demo)
// ---------------------------------------------------------------------------

export const verifiedSources: VerifiedSource[] = [
  { type: 'destination', sourceId: 'dest-tokyo', confidenceScore: 92, lastVerified: '2026-01-15' },
  { type: 'destination', sourceId: 'dest-bali', confidenceScore: 88, lastVerified: '2026-01-20' },
  { type: 'destination', sourceId: 'dest-paris', confidenceScore: 95, lastVerified: '2026-02-01' },
  { type: 'destination', sourceId: 'dest-nyc', confidenceScore: 72, lastVerified: '2025-12-10' },
  { type: 'destination', sourceId: 'dest-barcelona', confidenceScore: 84, lastVerified: '2026-02-05' },
];

// ---------------------------------------------------------------------------
// Pre-assembled TripPlan objects for quick consumption
// ---------------------------------------------------------------------------

function buildTripPlans(): TripPlan[] {
  return curatedDestinations.map((dest) => {
    const itinerary = recommendedItineraries.find((i) => i.destinationId === dest.id)!;
    const tips = influencerTips.filter((_t, idx) => idx % curatedDestinations.length === curatedDestinations.indexOf(dest));
    const verification = verifiedSources.find((v) => v.sourceId === dest.id)!;
    return { id: `plan-${dest.id}`, destination: dest, itinerary, tips, verification };
  });
}

export const mockTripPlans: TripPlan[] = buildTripPlans();
