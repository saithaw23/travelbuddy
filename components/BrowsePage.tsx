"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plane,
  Hotel,
  Utensils,
  Camera,
  MapPin,
  Star,
  Clock,
  Plus,
  Check,
  ShoppingBag,
  ArrowLeft,
  Navigation,
  Sparkles,
  ChevronRight,
  X,
  Calendar,
  Users,
} from "lucide-react";
import { ItemCategory, PlanItem } from "@/lib/types";
import {
  mockFlights,
  mockHotels,
  mockRestaurants,
  mockActivities,
} from "@/lib/mockData";
import { useTripData } from "@/lib/useTripData";

const categoryConfig: Record<ItemCategory, { icon: any; label: string; color: string; bg: string }> = {
  flight: { icon: Plane, label: "Flights", color: "text-blue-600", bg: "bg-blue-100" },
  hotel: { icon: Hotel, label: "Hotels", color: "text-purple-600", bg: "bg-purple-100" },
  restaurant: { icon: Utensils, label: "Restaurants", color: "text-orange-600", bg: "bg-orange-100" },
  activity: { icon: Camera, label: "Activities", color: "text-green-600", bg: "bg-green-100" },
};

const categoryItems: Record<ItemCategory, PlanItem[]> = {
  flight: mockFlights,
  hotel: mockHotels,
  restaurant: mockRestaurants,
  activity: mockActivities,
};

export default function BrowsePage() {
  const router = useRouter();
  const { tripData, isLoaded } = useTripData();
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("hotel");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [nearMeEnabled, setNearMeEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Check if trip data exists, if not redirect to setup
  useEffect(() => {
    if (isLoaded && !tripData.destination) {
      router.push("/browse/setup");
    }
  }, [isLoaded, tripData, router]);

  // Load Near Me state from trip data
  useEffect(() => {
    if (tripData.useNearMe && tripData.userLocation) {
      setNearMeEnabled(true);
      setUserLocation(tripData.userLocation);
    } else if (tripData.destination) {
      setUserLocation(tripData.destination);
    }
  }, [tripData]);

  const filteredItems = categoryItems[activeCategory];

  const toggleSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const selectedItemsData = Object.values(categoryItems)
    .flat()
    .filter((item) => selectedItems.includes(item.id));

  const totalCost = selectedItemsData.reduce((sum, item) => sum + item.price, 0);

  const handleCreatePlan = () => {
    // In real app, this would create a plan and redirect
    router.push("/my-plans");
  };

  const handleNearMeToggle = () => {
    if (!nearMeEnabled) {
      setDetectingLocation(true);
      setTimeout(() => {
        setDetectingLocation(false);
        setNearMeEnabled(true);
      }, 1000);
    } else {
      setNearMeEnabled(false);
    }
  };

  const categories = Object.entries(categoryConfig) as [ItemCategory, typeof categoryConfig[ItemCategory]][];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h1 className="font-bold text-gray-900">Browse Destinations</h1>
              <button
                onClick={() => setShowCart(true)}
                className="relative flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cart</span>
                {selectedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {selectedItems.length}
                  </span>
                )}
              </button>
            </div>

            {/* Location & Near Me Toggle */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">{tripData.destination || userLocation || "Detecting location..."}</span>
                </div>
                {tripData.fromDate && tripData.toDate && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span>{new Date(tripData.fromDate).toLocaleDateString()} - {new Date(tripData.toDate).toLocaleDateString()}</span>
                  </div>
                )}
                {tripData.travelers && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>{tripData.travelers} {tripData.travelers === 1 ? 'traveler' : 'travelers'}</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleNearMeToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  nearMeEnabled
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Navigation className={`w-4 h-4 ${detectingLocation ? "animate-pulse" : ""}`} />
                <span>{detectingLocation ? "Detecting..." : nearMeEnabled ? "Near Me ✓" : "Near Me"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Category Tabs */}
        <div className="bg-white border-b border-gray-100 sticky top-[136px] z-30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex gap-2 py-3 overflow-x-auto">
              {categories.map(([key, config]) => {
                const Icon = config.icon;
                const isActive = activeCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {categoryConfig[activeCategory].label}
            </h2>
            <p className="text-sm text-gray-500">
              {filteredItems.length} options available
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              const config = categoryConfig[item.category];
              const Icon = config.icon;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl overflow-hidden border-2 transition-all ${
                    isSelected ? "border-purple-500 shadow-lg" : "border-transparent shadow-sm hover:shadow-md"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.distance && nearMeEnabled && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                        <Navigation className="w-3 h-3 inline mr-1" />
                        {item.distance}
                      </span>
                    )}
                    {item.aiRecommended && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {item.matchScore}% Match
                      </span>
                    )}
                    {isSelected && (
                      <div className="absolute bottom-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" fill="#FACC15" />
                        <span className="font-medium text-gray-800">{item.rating}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.duration && (
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </span>
                      )}
                    </div>

                    {/* Price & Add Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ${item.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          {item.category === 'flight' && '/person'}
                          {item.category === 'hotel' && '/night'}
                          {item.category === 'restaurant' && '/person'}
                          {item.category === 'activity' && '/person'}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSelection(item.id)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                          isSelected
                            ? "bg-purple-100 text-purple-700"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Floating Cart Summary */}
        {selectedItems.length > 0 && !showCart && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
            <button
              onClick={() => setShowCart(true)}
              className="flex items-center gap-4 px-6 py-4 bg-gray-900 text-white rounded-2xl shadow-2xl hover:bg-gray-800 transition"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold">{selectedItems.length} items</span>
              </div>
              <div className="w-px h-6 bg-gray-700" />
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${totalCost.toLocaleString()}</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCart(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Your Selection</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {selectedItemsData.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Browse and add items to build your plan
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {selectedItemsData.map((item) => {
                      const config = categoryConfig[item.category];
                      const Icon = config.icon;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`${config.bg} ${config.color} p-1 rounded`}>
                                <Icon className="w-3 h-3" />
                              </span>
                              <span className="text-xs text-gray-500 capitalize">
                                {item.category}
                              </span>
                            </div>
                            <p className="font-medium text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${item.price}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleSelection(item.id)}
                            className="p-2 hover:bg-gray-200 rounded-full"
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Items</span>
                      <span className="font-medium text-gray-900">
                        {selectedItems.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Estimated Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        ${totalCost.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Create Plan Button */}
                  <button
                    onClick={handleCreatePlan}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                  >
                    <Sparkles className="w-5 h-5" />
                    Create My Plan
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    You can invite others and collaborate after creating
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
