"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Navigation,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useTripData } from "@/lib/useTripData";

export default function TripSetupPage() {
  const router = useRouter();
  const { tripData, setTripData, isLoaded } = useTripData();
  
  const [destination, setDestination] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState("5000");
  const [currency, setCurrency] = useState("USD");
  const [useNearMe, setUseNearMe] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);

  // Load saved data when component mounts
  useEffect(() => {
    if (isLoaded && tripData) {
      setDestination(tripData.destination || "");
      setFromDate(tripData.fromDate || "");
      setToDate(tripData.toDate || "");
      setTravelers(tripData.travelers || 2);
      setBudget(tripData.budget || "5000");
      setCurrency(tripData.currency || "USD");
      setUseNearMe(tripData.useNearMe || false);
      setUserLocation(tripData.userLocation || null);
    }
  }, [isLoaded, tripData]);

  const handleNearMeToggle = () => {
    if (!useNearMe) {
      setDetectingLocation(true);
      // Simulate location detection
      setTimeout(() => {
        const location = "San Francisco, CA";
        setUserLocation(location);
        setDestination(location);
        setDetectingLocation(false);
        setUseNearMe(true);
      }, 1500);
    } else {
      setUseNearMe(false);
      setDestination("");
    }
  };

  const handleContinue = () => {
    // Save trip data to localStorage
    setTripData({
      destination,
      fromDate,
      toDate,
      travelers,
      budget,
      currency,
      useNearMe,
      userLocation: userLocation || undefined,
    });

    // Navigate to browse page
    router.push("/browse");
  };

  const isFormValid = destination && fromDate && toDate && travelers > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <h1 className="font-bold text-gray-900">Plan Your Trip</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">
                Browse Manually
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Tell Us About Your Trip
            </h2>
            <p className="text-gray-600">
              Provide some basic details to help us show you the best options
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Destination or Near Me */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Where are you going?
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    disabled={useNearMe}
                    className={`w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 dark:text-gray-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 ${
                      useNearMe ? "bg-purple-50 border-purple-300" : ""
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNearMeToggle}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all ${
                    useNearMe
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 dark:text-gray-300 hover:bg-purple-100 hover:text-purple-700 border border-gray-300"
                  }`}
                >
                  <Navigation
                    className={`w-4 h-4 ${detectingLocation ? "animate-pulse" : ""}`}
                  />
                  {detectingLocation
                    ? "Detecting..."
                    : useNearMe
                    ? "Near Me ✓"
                    : "Near Me"}
                </button>
              </div>
              {useNearMe && userLocation && (
                <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  Showing places near {userLocation}
                </p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  From
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 dark:text-gray-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  To
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    min={fromDate}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 dark:text-gray-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                How many travelers?
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 dark:text-gray-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Budget (per person)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="5000"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 dark:text-gray-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 dark:text-gray-200 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="AUD">AUD (A$)</option>
                </select>
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-6">
              <button
                onClick={handleContinue}
                disabled={!isFormValid}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-semibold transition-all ${
                  isFormValid
                    ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue to Browse
                <ChevronRight className="w-5 h-5" />
              </button>
              {!isFormValid && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                  Please fill in all required fields
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
              AI-Powered Matching
            </h3>
            <p className="text-xs text-gray-600">
              Get personalized recommendations based on your preferences
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
              Budget Tracking
            </h3>
            <p className="text-xs text-gray-600">
              Stay within budget with real-time cost calculations
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200">
            <div className="text-3xl mb-2">🤝</div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
              Collaborate
            </h3>
            <p className="text-xs text-gray-600">
              Invite friends and plan together with voting and comments
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
