"use client";

import { useState, useEffect } from 'react';

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
  } catch (e) {
    return null;
  }
}
