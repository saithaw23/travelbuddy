# TravelBuddy - Browse Manually Feature Implementation Roadmap

## Overview
Reimplementing the "Browse Manually" flow from the old app, excluding the AI trip recommendation route (which is now handled by the AI chat page).

## Features to Implement

### 1. Browse Page (/browse)
- Category tabs: Flights, Hotels, Restaurants, Activities
- "Near Me" toggle with location detection
- Item cards with AI recommendations
- Distance calculations
- Add to cart functionality
- Cart drawer with selections
- Budget tracking
- "Create My Plan" button

### 2. My Plans Page (/my-plans)
- Library of saved plans
- Plan cards with status badges
- Multi-select for comparison
- Collaborator avatars
- Action buttons (Share, Duplicate, Delete)

### 3. Plan Detail Page (/plan/[id])
- Plan hero section
- Participants management
- Invite modal
- Itinerary items (expandable cards)
- Collaboration features:
  - Team voting (Yes/No/Maybe)
  - Comments per item
  - Owner notes
- Item details modal
- Edit booking modal (quantity adjustments)
- Checkout button

### 4. Compare Itineraries (/compare)
- Side-by-side plan comparison
- Vote summaries
- Consensus board
- Budget comparison

### 5. Checkout Page (/checkout)
- Traveler details form
- Payment form
- Order summary
- Booking confirmation
- Post-booking rating modal

### 6. Profile Page (/profile)
- User stats
- Travel preferences
- Past travels
- Review contributions
- AI insights

## Data Structure (Mock)

### Trip/Plan
```typescript
interface Plan {
  id: string;
  name: string;
  destination: string;
  dateRange: string;
  travelers: number;
  totalCost: number;
  status: 'draft' | 'planning' | 'confirmed' | 'completed';
  items: PlanItem[];
  collaborators: Participant[];
}
```

### Plan Item
```typescript
interface PlanItem {
  id: string;
  category: 'flight' | 'hotel' | 'restaurant' | 'activity';
  name: string;
  location: string;
  date: string;
  time?: string;
  price: number;
  image: string;
  rating: number;
  aiRecommended: boolean;
  matchScore?: number;
}
```

### Participant
```typescript
interface Participant {
  id: string;
  name: string;
  initials: string;
  role: 'owner' | 'collaborator';
  email?: string;
}
```

### Vote
```typescript
interface Vote {
  itemId: string;
  participantId: string;
  vote: 'yes' | 'no' | 'maybe';
}
```

### Comment
```typescript
interface Comment {
  id: string;
  itemId: string;
  participantId: string;
  text: string;
  createdAt: string;
}
```

## Implementation Order

1. ✅ Create mock data structure
2. ✅ Build Browse page with categories
3. ✅ Implement cart functionality
4. ✅ Create My Plans library
5. ✅ Build Plan Detail with collaboration
6. ✅ Add Compare functionality
7. ✅ Implement Checkout flow
8. ✅ Build Profile page

## Notes
- All data is mock/frontend only
- No backend integration
- Focus on UI/UX and demo functionality
- Chat widget appears on all pages except home (/)
