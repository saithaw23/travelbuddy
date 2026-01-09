'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MapPin, Sparkles, Star, Users, Clock, DollarSign, ChevronRight, Plane, Hotel, Utensils, Camera } from 'lucide-react';

export default function PlansPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const aiPlans = [
    {
      id: 'plan-luxury',
      name: 'NYC Luxury Experience',
      tagline: 'Premium hotels, fine dining, VIP access',
      matchScore: 96,
      totalCost: '$4,850',
      perPerson: '$2,425',
      duration: '7 nights',
      highlights: [
        { icon: Plane, label: 'JetBlue Mint Non-stop' },
        { icon: Hotel, label: 'The Plaza Hotel ★★★★★' },
        { icon: Utensils, label: '4 Michelin-star restaurants' },
        { icon: Camera, label: 'Private museum tours' }
      ],
      included: ['Flights', 'Hotel', '12 activities', '8 restaurant reservations'],
      image: 'from-purple-600 to-pink-500'
    },
    {
      id: 'plan-balanced',
      name: 'NYC Best Value',
      tagline: 'Great experiences without breaking the bank',
      matchScore: 92,
      totalCost: '$2,400',
      perPerson: '$1,200',
      duration: '7 nights',
      highlights: [
        { icon: Plane, label: 'American Airlines Direct' },
        { icon: Hotel, label: 'Grand Central Hotel ★★★★' },
        { icon: Utensils, label: 'Local favorites + 2 upscale' },
        { icon: Camera, label: 'Walking tours + museum passes' }
      ],
      included: ['Flights', 'Hotel', '8 activities', '6 restaurant picks'],
      image: 'from-blue-600 to-purple-500'
    },
    {
      id: 'plan-budget',
      name: 'NYC Budget Explorer',
      tagline: 'Maximum adventure, minimum spend',
      matchScore: 85,
      totalCost: '$1,450',
      perPerson: '$725',
      duration: '7 nights',
      highlights: [
        { icon: Plane, label: 'Spirit Airlines (1 stop)' },
        { icon: Hotel, label: 'Pod Times Square ★★★' },
        { icon: Utensils, label: 'Street food + hidden gems' },
        { icon: Camera, label: 'Free attractions + parks' }
      ],
      included: ['Flights', 'Hotel', '6 activities', '5 food spots'],
      image: 'from-green-500 to-teal-500'
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleAddToLibrary = () => {
    router.push('/plan?id=' + selectedPlan);
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-50 flex items-center justify-between px-10">
        <Link href="/" className="text-2xl font-bold text-purple-600">TravelBuddy</Link>
        <nav className="flex gap-10 items-center">
          <Link href="/my-plans" className="text-sm font-medium text-gray-800 hover:text-purple-600">My Plans</Link>
          <a href="#how-it-works" className="text-sm font-medium text-gray-800 hover:text-purple-600">How It Works</a>
          <a href="#contact" className="text-sm font-medium text-gray-800 hover:text-purple-600">Contact</a>
        </nav>
        <div className="flex gap-6 items-center">
          <Link href="/profile" className="flex items-center gap-4 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-semibold text-sm">KR</div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-gray-800 text-sm">Krit</div>
              <div className="text-xs text-gray-500">Signed in</div>
            </div>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-28 pb-8 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider opacity-90">AI-Generated Plans</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">Your Personalized NYC Itineraries</h1>
          <p className="text-base opacity-90 max-w-2xl mx-auto">Based on your preferences, we've crafted 3 complete travel plans. Select one to add to your library and start collaborating.</p>
        </div>
      </section>

      {/* CONTEXT BAR */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-10 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>New York City</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Dec 15-22, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span>2 travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <span>Budget: $5,000</span>
            </div>
          </div>
          <Link href="/" className="text-sm text-purple-600 font-semibold hover:underline">Edit preferences</Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-10">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Generating personalized plans...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {aiPlans.map(plan => (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:shadow-lg ${
                      selectedPlan === plan.id ? 'border-purple-600 ring-2 ring-purple-200' : 'border-gray-200'
                    }`}
                  >
                    {/* Plan Header */}
                    <div className={`h-32 bg-gradient-to-br ${plan.image} p-6 flex flex-col justify-between`}>
                      <div className="flex items-center justify-between">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {plan.matchScore}% Match
                        </span>
                        {selectedPlan === plan.id && (
                          <span className="bg-white text-purple-600 text-xs font-bold px-3 py-1 rounded-full">Selected</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                        <p className="text-sm text-white/80">{plan.tagline}</p>
                      </div>
                    </div>

                    {/* Plan Details */}
                    <div className="p-6">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-purple-600">{plan.totalCost}</span>
                        <span className="text-sm text-gray-500">total ({plan.perPerson}/person)</span>
                      </div>

                      <div className="space-y-3 mb-4">
                        {plan.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                            <item.icon className="w-4 h-4 text-purple-500" />
                            <span>{item.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-500 mb-2">Includes:</p>
                        <div className="flex flex-wrap gap-2">
                          {plan.included.map((item, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center justify-between">
                <div>
                  {selectedPlan ? (
                    <p className="text-gray-800">
                      <span className="font-semibold">{aiPlans.find(p => p.id === selectedPlan)?.name}</span> selected. 
                      Add it to your library to customize and invite collaborators.
                    </p>
                  ) : (
                    <p className="text-gray-600">Select a plan above to continue</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <Link href="/browse" className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition">
                    Build My Own Instead
                  </Link>
                  <button
                    onClick={handleAddToLibrary}
                    disabled={!selectedPlan}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition ${
                      selectedPlan
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Add to My Plans <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-10 text-sm">
        <p>&copy; 2025 TravelBuddy. All rights reserved.</p>
      </footer>
    </>
  );
}
