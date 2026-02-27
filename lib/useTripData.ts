"use client";

import { useState, useEffect, useMemo } from 'react';
import type {
  CuratedDestination,
  RecommendedItinerary,
  InfluencerTip,
  TripPlan,
} from './types';
import {
  curatedDestinations,
  recommendedItineraries,
  influencerTips,
  mockTripPlans,
} from './mockTrips';

export interface TripData {
  destination: string;
  fromDate: string;
  toDate: string;
  travelers: number;
  budget: string;
  currency: string;
  useNearMe: boolean;
  userLocation?: string;
}

const STORAGE_KEY = 'travelbuddy_trip_data';

const defaultTripData: TripData = {
  destination: '',
  fromDate: '',
  toDate: '',
  travelers: 2,
  budget: '5000',
  currency: 'USD',
  useNearMe: false,
};

export function useTripData() {
  const [tripData, setTripDataState] = useState<TripData>(defaultTripData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setTripDataState(parsed);
        } catch (e) {
          console.error('Failed to parse trip data:', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever data changes
  const setTripData = (data: Partial<TripData>) => {
    const newData = { ...tripData, ...data };
    setTripDataState(newData);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    }
  };

  const clearTripData = () => {
    setTripDataState(defaultTripData);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    tripData,
    setTripData,
    clearTripData,
    isLoaded,
  };
}

export function getTripDataFromStorage(): TripData | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Mock-data helper hooks — read from lib/mockTrips.ts, never fetch
// ---------------------------------------------------------------------------

/** All curated destinations, optionally filtered by city substring. */
export function useDestinations(cityFilter?: string): CuratedDestination[] {
  return useMemo(() => {
    if (!cityFilter) return curatedDestinations;
    const lower = cityFilter.toLowerCase();
    return curatedDestinations.filter(
      (d) => d.city.toLowerCase().includes(lower) || d.country.toLowerCase().includes(lower),
    );
  }, [cityFilter]);
}

/** Itineraries filtered by destination, max budget, and/or tag. */
export function useItineraries(filters?: {
  destinationId?: string;
  maxBudget?: number;
  tag?: string;
}): RecommendedItinerary[] {
  const destinationId = filters?.destinationId;
  const maxBudget = filters?.maxBudget;
  const tag = filters?.tag;

  return useMemo(() => {
    let results = recommendedItineraries;
    if (destinationId) {
      results = results.filter((i) => i.destinationId === destinationId);
    }
    if (maxBudget !== undefined) {
      results = results.filter((i) => i.estBudget <= maxBudget);
    }
    if (tag) {
      const lower = tag.toLowerCase();
      results = results.filter((i) => i.tags.some((t) => t.toLowerCase() === lower));
    }
    return results;
  }, [destinationId, maxBudget, tag]);
}

/** Tips, optionally filtered by platform. */
export function useTips(platform?: InfluencerTip['platform']): InfluencerTip[] {
  return useMemo(() => {
    if (!platform) return influencerTips;
    return influencerTips.filter((t) => t.platform === platform);
  }, [platform]);
}

/** Full TripPlan objects, with optional destination + budget + tag filters. */
export function useMockTripPlans(filters?: {
  destinationId?: string;
  maxBudget?: number;
  tag?: string;
}): TripPlan[] {
  const destinationId = filters?.destinationId;
  const maxBudget = filters?.maxBudget;
  const tag = filters?.tag;

  return useMemo(() => {
    let results = mockTripPlans;
    if (destinationId) {
      results = results.filter((p) => p.destination.id === destinationId);
    }
    if (maxBudget !== undefined) {
      results = results.filter((p) => p.itinerary.estBudget <= maxBudget);
    }
    if (tag) {
      const lower = tag.toLowerCase();
      results = results.filter((p) => p.itinerary.tags.some((t) => t.toLowerCase() === lower));
    }
    return results;
  }, [destinationId, maxBudget, tag]);
}

/**
 * Deterministic confidence-meter value for a given destination.
 * Returns the confidenceScore directly from the curated data so demos
 * always show the same number (e.g., 72 %, 88 %).
 */
export function getConfidenceScore(destinationId: string): number {
  const dest = curatedDestinations.find((d) => d.id === destinationId);
  return dest?.confidenceScore ?? 0;
}

/**
 * Build a short context string about verified itineraries that can be
 * injected into a chat assistant's opening message.
 */
export function getVerifiedContext(): string {
  const count = curatedDestinations.length;
  const topDest = curatedDestinations
    .slice(0, 3)
    .map((d) => `${d.city} (${d.confidenceScore}% verified)`)
    .join(', ');
  return `We have ${count} verified destinations ready: ${topDest}. Ask me about any of them!`;
}
