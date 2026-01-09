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
  DollarSign,
  Plus,
  Check,
  ShoppingBag,
  ArrowLeft,
  Navigation,
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react";

type Category = "flights" | "hotels" | "restaurants" | "activities";

interface PlaceItem {
  id: string;
  name: string;
  category: Category;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  priceLabel: string;
  duration?: string;
  image: string;
  tags: string[];
  distance?: string;
}

const categoryConfig = {
  flights: { icon: Plane, label: "Flights", color: "text-blue-600", bg: "bg-blue-100" },
  hotels: { icon: Hotel, label: "Hotels", color: "text-purple-600", bg: "bg-purple-100" },
  restaurants: { icon: Utensils, label: "Restaurants", color: "text-orange-600", bg: "bg-orange-100" },
  activities: { icon: Camera, label: "Activities", color: "text-green-600", bg: "bg-green-100" },
};

const mockItems: PlaceItem[] = [
  // Flights
  {
    id: "f1",
    name: "Direct Flight to Tokyo",
    category: "flights",
    location: "SFO → NRT",
    rating: 4.5,
    reviewCount: 892,
    price: 850,
    priceLabel: "round-trip",
    duration: "11h 30m",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400",
    tags: ["Non-stop", "Economy"],
  },
  {
    id: "f2",
    name: "Premium Economy to Bali",
    category: "flights",
    location: "LAX → DPS",
    rating: 4.7,
    reviewCount: 456,
    price: 1200,
    priceLabel: "round-trip",
    duration: "17h 45m",
    image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=400",
    tags: ["1 Stop", "Premium"],
  },
  // Hotels
  {
    id: "h1",
    name: "Park Hyatt Tokyo",
    category: "hotels",
    location: "Shinjuku, Tokyo",
    rating: 4.9,
    reviewCount: 2341,
    price: 450,
    priceLabel: "/night",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    tags: ["Luxury", "City View"],
    distance: "0.5 km",
  },
  {
    id: "h2",
    name: "Ubud Jungle Resort",
    category: "hotels",
    location: "Ubud, Bali",
    rating: 4.8,
    reviewCount: 1567,
    price: 280,
    priceLabel: "/night",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
    tags: ["Pool Villa", "Breakfast"],
    distance: "2.3 km",
  },
  {
    id: "h3",
    name: "Santorini Cave Hotel",
    category: "hotels",
    location: "Oia, Santorini",
    rating: 4.9,
    reviewCount: 987,
    price: 380,
    priceLabel: "/night",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400",
    tags: ["Sea View", "Romantic"],
    distance: "1.1 km",
  },
  // Restaurants
  {
    id: "r1",
    name: "Sukiyabashi Jiro",
    category: "restaurants",
    location: "Ginza, Tokyo",
    rating: 4.9,
    reviewCount: 4521,
    price: 300,
    priceLabel: "/person",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
    tags: ["Michelin 3★", "Omakase"],
    distance: "1.8 km",
  },
  {
    id: "r2",
    name: "Locavore Ubud",
    category: "restaurants",
    location: "Ubud, Bali",
    rating: 4.7,
    reviewCount: 1234,
    price: 120,
    priceLabel: "/person",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    tags: ["Farm-to-Table", "Tasting Menu"],
    distance: "0.8 km",
  },
  // Activities
  {
    id: "a1",
    name: "TeamLab Borderless",
    category: "activities",
    location: "Odaiba, Tokyo",
    rating: 4.8,
    reviewCount: 8765,
    price: 35,
    priceLabel: "/person",
    duration: "2-3 hours",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400",
    tags: ["Digital Art", "Immersive"],
    distance: "5.2 km",
  },
  {
    id: "a2",
    name: "Tegallalang Rice Terrace",
    category: "activities",
    location: "Tegallalang, Bali",
    rating: 4.6,
    reviewCount: 3421,
    price: 15,
    priceLabel: "/person",
    duration: "2-4 hours",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400",
    tags: ["Nature", "Photography"],
    distance: "8.1 km",
  },
  {
    id: "a3",
    name: "Sunrise Hike Mt. Batur",
    category: "activities",
    location: "Kintamani, Bali",
    rating: 4.7,
    reviewCount: 2156,
    price: 45,
    priceLabel: "/person",
    duration: "6 hours",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
    tags: ["Adventure", "Guided"],
    distance: "25 km",
  },
];

export default function BrowsePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>("hotels");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [nearMeEnabled, setNearMeEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);

  useEffect(() => {
    // Simulate location detection
    const timer = setTimeout(() => {
      setUserLocation("San Francisco, CA");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = mockItems.filter((item) => item.category === activeCategory);

  const toggleSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const selectedItemsData = mockItems.filter((item) => selectedItems.includes(item.id));
  const totalCost = selectedItemsData.reduce((sum, item) => sum + item.price, 0);

  const handleCreatePlan = () => {
    // In real app, this would create a plan and redirect
    router.push("/plan/custom-1");
  };

  const categories = Object.entries(categoryConfig) as [Category, typeof categoryConfig.flights][];

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
                className="relative flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold"
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
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span>{userLocation || "Detecting location..."}</span>
              </div>
              <button
                onClick={() => setNearMeEnabled(!nearMeEnabled)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  nearMeEnabled
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>Near Me</span>
              </button>
            </div>
          </div>
        </header>

        {/* Category Tabs */}
        <div className="bg-white border-b border-gray-100 sticky top-[120px] z-30">
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
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl overflow-hidden border-2 transition-all ${
                    isSelected ? "border-purple-500 shadow-lg" : "border-transparent shadow-sm"
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
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" fill="#FACC15" />
                        <span className="font-medium text-gray-800">{item.rating}</span>
                        <span className="text-gray-400">({item.reviewCount})</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.map((tag) => (
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
                        <span className="text-sm text-gray-500">{item.priceLabel}</span>
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
              className="flex items-center gap-4 px-6 py-4 bg-gray-900 text-white rounded-2xl shadow-2xl"
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
                              ${item.price}{item.priceLabel}
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
