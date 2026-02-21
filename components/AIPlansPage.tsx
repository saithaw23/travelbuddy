"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Star,
  ChevronRight,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Check,
  ArrowLeft,
  Wand2,
} from "lucide-react";

interface TripPlan {
  id: string;
  name: string;
  tagline: string;
  destination: string;
  duration: string;
  groupSize: string;
  totalCost: number;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
  included: {
    flights: number;
    hotels: number;
    restaurants: number;
    activities: number;
  };
  tags: string[];
  aiConfidence: number;
}

interface TravelPreferences {
  destination: string;
  duration: string;
  budget: string;
  groupSize: string;
  travelStyle: string;
  interests: string[];
  conversationSummary: string;
}

const FALLBACK_PLANS: TripPlan[] = [
  {
    id: "plan-1",
    name: "Tokyo Cultural Immersion",
    tagline: "Experience the perfect blend of ancient traditions and modern innovation",
    destination: "Tokyo, Japan",
    duration: "7 Days / 6 Nights",
    groupSize: "2-4 travelers",
    totalCost: 4850,
    rating: 4.9,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600",
    highlights: [
      "Private tea ceremony in Uji",
      "Skip-the-line Senso-ji Temple tour",
      "Michelin-star kaiseki dinner",
      "TeamLab Borderless experience",
    ],
    included: { flights: 2, hotels: 6, restaurants: 8, activities: 12 },
    tags: ["Culture", "Food", "Art"],
    aiConfidence: 98,
  },
  {
    id: "plan-2",
    name: "Bali Wellness Retreat",
    tagline: "Rejuvenate your mind and body in tropical paradise",
    destination: "Bali, Indonesia",
    duration: "5 Days / 4 Nights",
    groupSize: "2-6 travelers",
    totalCost: 2980,
    rating: 4.8,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
    highlights: [
      "Sunrise yoga at Tegallalang Rice Terraces",
      "Traditional Balinese spa day",
      "Ubud Monkey Forest exploration",
      "Beachfront villa stay",
    ],
    included: { flights: 2, hotels: 4, restaurants: 6, activities: 8 },
    tags: ["Wellness", "Nature", "Relaxation"],
    aiConfidence: 95,
  },
  {
    id: "plan-3",
    name: "Swiss Alps Adventure",
    tagline: "Breathtaking mountain views and thrilling outdoor experiences",
    destination: "Interlaken, Switzerland",
    duration: "6 Days / 5 Nights",
    groupSize: "2-4 travelers",
    totalCost: 5200,
    rating: 4.9,
    reviewCount: 267,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600",
    highlights: [
      "Jungfraujoch railway experience",
      "Paragliding over Lake Brienz",
      "Chocolate-making workshop",
      "Scenic train to Zermatt",
    ],
    included: { flights: 2, hotels: 5, restaurants: 7, activities: 10 },
    tags: ["Adventure", "Scenic", "Nature"],
    aiConfidence: 96,
  },
  {
    id: "plan-4",
    name: "Greek Island Hopping",
    tagline: "Discover the magic of Santorini, Mykonos, and Athens",
    destination: "Greece",
    duration: "8 Days / 7 Nights",
    groupSize: "2-6 travelers",
    totalCost: 3650,
    rating: 4.7,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600",
    highlights: [
      "Sunset dinner in Oia",
      "Catamaran cruise with snorkeling",
      "Acropolis guided tour",
      "Traditional Greek cooking class",
    ],
    included: { flights: 4, hotels: 7, restaurants: 10, activities: 14 },
    tags: ["Beach", "History", "Food"],
    aiConfidence: 94,
  },
];

export default function AIPlansPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [plans, setPlans] = useState<TripPlan[]>(FALLBACK_PLANS);
  const [preferences, setPreferences] = useState<TravelPreferences | null>(null);
  const [isAIGenerated, setIsAIGenerated] = useState(false);

  useEffect(() => {
    try {
      const storedPrefs = sessionStorage.getItem('travelPreferences');
      const storedPlans = sessionStorage.getItem('aiPlans');

      if (storedPrefs && storedPlans) {
        const parsedPrefs: TravelPreferences = JSON.parse(storedPrefs);
        const parsedPlans: TripPlan[] = JSON.parse(storedPlans);

        if (parsedPlans && parsedPlans.length > 0) {
          setPreferences(parsedPrefs);
          setPlans(parsedPlans);
          setIsAIGenerated(true);
        }
      }
    } catch {
      // Silently fall back to default plans
    }
  }, []);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowConfirmModal(true);
  };

  const handleConfirmPlan = () => {
    // Save the selected plan data so PlanDetailPage can load it
    const planData = plans.find((p) => p.id === selectedPlan);
    if (planData) {
      sessionStorage.setItem('selectedPlan', JSON.stringify(planData));
    }
    router.push(`/plan/${selectedPlan}`);
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-gray-900">AI Trip Plans</span>
            </div>
            <button
              onClick={() => router.push("/my-plans")}
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              My Plans
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            {isAIGenerated ? (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
                  <Wand2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">
                    Personalized Just For You
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Your Tailored Trip Plans
                </h1>
                {preferences && (
                  <div className="max-w-2xl mx-auto mb-4">
                    <p className="text-base text-gray-600 dark:text-gray-400 italic leading-relaxed">
                      &quot;{preferences.conversationSummary}&quot;
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {preferences.destination !== 'Flexible' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          <MapPin className="w-3 h-3" /> {preferences.destination}
                        </span>
                      )}
                      {preferences.duration !== 'Flexible' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          <Calendar className="w-3 h-3" /> {preferences.duration}
                        </span>
                      )}
                      {preferences.budget !== 'Flexible' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          <DollarSign className="w-3 h-3" /> {preferences.budget}
                        </span>
                      )}
                      {preferences.groupSize && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                          <Users className="w-3 h-3" /> {preferences.groupSize}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">
                    Powered by AI
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Complete Trip Plans
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Our AI has curated these complete itineraries. Each plan includes flights, hotels, restaurants, and activities—ready to book.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Plans Grid */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        {plan.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {plan.name}
                      </h3>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-green-500 rounded-full">
                      <Sparkles className="w-3 h-3 text-white" />
                      <span className="text-xs font-bold text-white">
                        {plan.aiConfidence}% Match
                      </span>
                    </div>
                    {isAIGenerated && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 bg-purple-600 rounded-full">
                        <Wand2 className="w-3 h-3 text-white" />
                        <span className="text-xs font-bold text-white">AI Pick</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{plan.tagline}</p>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span>{plan.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>{plan.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span>{plan.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Star className="w-4 h-4 text-yellow-500" fill="#FACC15" />
                        <span>{plan.rating} ({plan.reviewCount})</span>
                      </div>
                    </div>

                    {/* Included */}
                    <div className="flex items-center gap-4 py-3 border-y border-gray-100 dark:border-gray-700 mb-4">
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <Plane className="w-4 h-4 text-gray-400" />
                        <span>{plan.included.flights}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <Hotel className="w-4 h-4 text-gray-400" />
                        <span>{plan.included.hotels}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <Utensils className="w-4 h-4 text-gray-400" />
                        <span>{plan.included.restaurants}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <Camera className="w-4 h-4 text-gray-400" />
                        <span>{plan.included.activities}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 mb-5">
                      {plan.highlights.slice(0, 3).map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Total from</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          ${plan.totalCost.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">per person</p>
                      </div>
                      <button
                        onClick={() => handleSelectPlan(plan.id)}
                        className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                      >
                        Select Plan
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto text-center py-10 px-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-3">
              {isAIGenerated ? 'Want to refine your plans?' : 'Want us to personalize these?'}
            </h3>
            <p className="text-purple-100 mb-6">
              {isAIGenerated
                ? 'Chat with our AI again to adjust your preferences and get new recommendations.'
                : 'Chat with our AI assistant to get plans tailored specifically to your interests and budget.'}
            </p>
            <button
              onClick={() => router.push("/chat")}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition"
            >
              {isAIGenerated ? 'Chat Again' : 'Chat with AI'}
            </button>
          </div>
        </section>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedPlanData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Add to Your Plans?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &quot;{selectedPlanData.name}&quot; will be added to your library. You can
                invite others and collaborate on the details.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPlanData.image}
                  alt={selectedPlanData.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {selectedPlanData.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedPlanData.destination}
                  </p>
                  <p className="text-sm font-semibold text-purple-600">
                    ${selectedPlanData.totalCost.toLocaleString()}/person
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPlan}
                className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Add to Plans
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
