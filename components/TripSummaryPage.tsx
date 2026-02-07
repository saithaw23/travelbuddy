'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ImageIcon, MessageCircle, Star, Video } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function TripSummaryPage() {
  const router = useRouter();
  const [expandedDay, setExpandedDay] = useState<string | null>('day1');

  const tripDetails = {
    destination: 'New York City',
    dateRange: 'Dec 15 - Dec 22, 2025',
    nights: '7 nights',
    travelers: '2 travelers',
    step: 'Step 4 of 5'
  };

  const itinerary = [
    {
      id: 'day1',
      title: 'Day 1 - Dec 15, 2024 (Arrival)',
      items: [
        {
          time: '8:00 AM',
          title: 'Flight: LAX → JFK',
          description: 'American Airlines · Non-stop · 5h 45m',
          price: '$450',
          actions: ['Change', 'Remove']
        },
        {
          time: '3:45 PM',
          title: 'Airport Transfer',
          description: 'Estimated 45 minutes to hotel',
          price: 'Free',
          actions: []
        }
      ]
    },
    {
      id: 'day2',
      title: 'Days 2-6 - Dec 16-20, 2024',
      items: []
    },
    {
      id: 'day7',
      title: 'Day 7 - Dec 22, 2024 (Departure)',
      items: [
        {
          time: '11:00 AM',
          title: 'Check-out: Grand Central Hotel',
          description: 'Check-out time',
          price: '$850 (7 nights)',
          actions: ['Change', 'Remove']
        }
      ]
    }
  ];

  const budgetBreakdown = [
    { label: 'Flights', amount: '$450' },
    { label: 'Hotels', amount: '$850' },
    { label: 'Restaurants', amount: '$300' },
    { label: 'Attractions', amount: '$45' },
    { label: 'Car Rentals', amount: '$0' }
  ];

  const totalBudget = '$2,000';
  const totalSpent = '$1,300';
  const remaining = '$700';

  const collaborationStatus = [
    {
      id: 'flight1',
      label: 'Flight LAX → JFK',
      majority: 'Majority in favor',
      color: 'text-green-600',
      ownerNote: 'Pending seat upgrade confirmation'
    },
    {
      id: 'hotel1',
      label: 'Grand Central Hotel',
      majority: 'Mixed feedback',
      color: 'text-orange-500',
      ownerNote: 'Waiting on Marco’s response'
    },
    {
      id: 'activity1',
      label: 'Metropolitan Museum Tour',
      majority: 'Majority against',
      color: 'text-red-600',
      ownerNote: 'Need new option—Amy prefers MoMA'
    }
  ];

  const travelerFeedback = [
    {
      id: 'fb1',
      title: 'Flight LAX → JFK',
      media: 'text',
      rating: 4.8,
      comment: 'Cabin felt refreshed and the earlier landing made customs quick. Sharing this so we can lock in the morning flight.',
      author: 'Amy C.',
      timestamp: 'Shared yesterday'
    },
    {
      id: 'fb2',
      title: 'Grand Central Hotel',
      media: 'photo',
      rating: 4.6,
      comment: 'Uploaded lobby photos + room view. Location is unbeatable, but beds are on the firmer side.',
      author: 'Marco L.',
      timestamp: 'Shared this morning'
    }
  ];

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 shadow-md z-1000 flex items-center justify-between px-10">
        <Link href="/" className="text-2xl font-bold text-purple-600">TravelBuddy</Link>
        <nav className="flex gap-10 items-center">
          <Link href="/about" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">About</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">How It Works</Link>
          <Link href="/trust-safety" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Trust & Safety</Link>
          <Link href="/blog" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Blog</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Contact</Link>
        </nav>

        <div className="flex gap-6 items-center">
          <ModeToggle />
          <Link href="/profile" className="flex items-center gap-4 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-semibold text-sm">JD</div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">John Doe</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Signed in</div>
            </div>
          </Link>
        </div>
      </header>

      {/* TRIP SUMMARY HERO */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8 pt-28">
        <div className="max-w-7xl mx-auto px-10 text-center">
          <h1 className="text-2xl font-bold mb-2">Your Trip Summary</h1>
          <p className="text-sm mb-1">{tripDetails.destination} · {tripDetails.dateRange} ({tripDetails.nights}) · {tripDetails.travelers}</p>
          <p className="text-xs opacity-90">{tripDetails.step}</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-10 py-12">
          <div className="grid grid-cols-3 gap-8">
            {/* LEFT - ITINERARY */}
            <div className="col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Your Trip Itinerary</h2>

              {itinerary.map(day => (
                <div key={day.id} className="bg-white rounded-lg border border-gray-200">
                  <button
                    onClick={() => setExpandedDay(expandedDay === day.id ? null : day.id)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                  >
                    <h3 className="font-semibold text-gray-800">{day.title}</h3>
                    <span className="text-gray-500">{expandedDay === day.id ? '▼' : '▶'}</span>
                  </button>

                  {expandedDay === day.id && day.items.length > 0 && (
                    <div className="border-t border-gray-200 px-6 py-4 space-y-6">
                      {day.items.map((item, idx) => (
                        <div key={idx} className="border-l-4 border-purple-600 pl-4">
                          <p className="text-sm font-semibold text-purple-600 mb-1">{item.time}</p>
                          <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <p className="font-semibold text-purple-600 mb-3">{item.price}</p>
                          {item.actions.length > 0 && (
                            <div className="flex gap-4">
                              {item.actions.map((action, aIdx) => (
                                <button key={aIdx} className="text-purple-600 text-sm font-semibold hover:text-purple-700">
                                  {action}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT - BUDGET SUMMARY */}
            <div className="col-span-1 space-y-6">
              {/* TOTAL BUDGET CARD */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white">
                <p className="text-xs opacity-90 mb-2">Total Budget</p>
                <h3 className="text-3xl font-bold mb-4">{totalBudget}</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Total Spent:</span>
                    <span className="font-semibold">{totalSpent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span className="font-semibold">{remaining}</span>
                  </div>
                </div>
              </div>

              {/* BUDGET BREAKDOWN */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Budget Breakdown</h4>
                <div className="space-y-2">
                  {budgetBreakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-gray-600">{item.label}:</span>
                      <span className="font-semibold text-gray-800">{item.amount}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-gray-800 text-xs">
                    <span>Total:</span>
                    <span className="text-purple-600">{totalSpent}</span>
                  </div>
                </div>

                {/* BUDGET STATUS */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-green-700">✓ Within budget</p>
                  <p className="text-xs text-green-600 mt-1">You have ${remaining.replace('$', '')} remaining</p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="space-y-3 mt-6">
                  <button 
                    onClick={() => router.push('/checkout')}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Continue to Checkout
                  </button>
                  <button 
                    onClick={() => router.push('/compare-itineraries')}
                    className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition"
                  >
                    Compare Options
                  </button>
                </div>
              </div>

              {/* COLLABORATION STATUS */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Collaboration tracker</h4>
                <p className="text-xs text-gray-500 mb-4">Shows majority vote per key item so you can act before checkout.</p>
                <div className="space-y-3">
                  {collaborationStatus.map(item => (
                    <div key={item.id} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-gray-800">{item.label}</span>
                        <span className={`text-[11px] font-bold ${item.color}`}>{item.majority}</span>
                      </div>
                      <p className="text-[11px] text-gray-500">Owner note: {item.ownerNote}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TRAVELER FEEDBACK */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                  Traveler feedback
                </h4>
                <p className="text-xs text-gray-500 mb-4">Latest media shared by collaborators. Use this to finalize swaps.</p>
                <div className="space-y-3">
                  {travelerFeedback.map(item => (
                    <div key={item.id} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{item.title}</p>
                          <p className="text-[11px] text-gray-500">{item.author} · {item.timestamp}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                          <Star className="w-3.5 h-3.5 text-yellow-500" fill="#FACC15" />
                          {item.rating.toFixed(1)}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mb-2">
                        {item.media === 'photo' && <ImageIcon className="w-3.5 h-3.5 text-purple-600" />}
                        {item.media === 'video' && <Video className="w-3.5 h-3.5 text-purple-600" />}
                        {item.media === 'text' && <MessageCircle className="w-3.5 h-3.5 text-purple-600" />}
                        <span className="capitalize">{item.media}</span>
                      </p>
                      <p className="text-xs text-gray-700">{item.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-10 text-sm mt-16">
        <p>&copy; 2025 TravelBuddy. All rights reserved. | 
          <a href="#privacy" className="text-purple-400 hover:text-red-400 transition"> Privacy Policy</a> | 
          <a href="#terms" className="text-purple-400 hover:text-red-400 transition"> Terms of Service</a> | 
          <a href="#contact" className="text-purple-400 hover:text-red-400 transition"> Contact Us</a>
        </p>
      </footer>
    </>
  );
}
