// Core Types for TravelBuddy

export type PlanStatus = 'draft' | 'planning' | 'confirmed' | 'completed';
export type ItemCategory = 'flight' | 'hotel' | 'restaurant' | 'activity';
export type VoteOption = 'yes' | 'no' | 'maybe';
export type ParticipantRole = 'owner' | 'collaborator';

export interface Participant {
  id: string;
  name: string;
  initials: string;
  role: ParticipantRole;
  email?: string;
}

export interface PlanItem {
  id: string;
  category: ItemCategory;
  name: string;
  location: string;
  date: string;
  time?: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  tags: string[];
  aiRecommended: boolean;
  matchScore?: number;
  duration?: string;
  distance?: string;
  quantity?: number;
  seats?: number;
  nights?: number;
  guests?: number;
}

export interface Plan {
  id: string;
  name: string;
  destination: string;
  dateRange: string;
  travelers: number;
  totalCost: number;
  status: PlanStatus;
  items: PlanItem[];
  collaborators: Participant[];
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface Vote {
  itemId: string;
  participantId: string;
  vote: VoteOption;
}

export interface Comment {
  id: string;
  itemId: string;
  participantId: string;
  text: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatar?: string;
  stats: {
    totalTrips: number;
    countriesVisited: number;
    totalSpent: number;
  };
  preferences: {
    adventureLevel: number;
    travelStyles: string[];
    interests: string[];
    budgetRange: { min: number; max: number };
  };
  memberSince: string;
}
