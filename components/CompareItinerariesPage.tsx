'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ModeToggle } from './mode/mode-toggle';

export default function CompareItinerariesPage() {
  const router = useRouter();
  const [selectedItineraries, setSelectedItineraries] = useState<string[]>(['nyc-winter', 'nyc-holiday']);
  const [expandedDay, setExpandedDay] = useState<Record<string, string>>({});

  const savedItineraries = [
    {
      id: 'nyc-winter',
      name: 'NYC Winter Getaway',
      destination: 'New York City',
      dates: 'Dec 15-22, 2025',
      duration: '7 nights',
      cost: '$1,645',
      travelers: '2 people',
      checked: true
    },
    {
      id: 'nyc-holiday',
      name: 'NYC Holiday Deluxe',
      destination: 'New York City',
      dates: 'Dec 15-22, 2025',
      duration: '7 nights',
      cost: '$2,400',
      travelers: '2 people',
      checked: true
    },
    {
      id: 'nyc-budget',
      name: 'NYC Budget-Friendly',
      destination: 'New York City',
      dates: 'Dec 15-22, 2025',
      duration: '7 nights',
      cost: '$1,200',
      travelers: '2 people',
      checked: false
    }
  ];

  const itineraryDetails: Record<string, any> = {
    'nyc-holiday': {
      cost: '$2,400',
      days: [
        {
          date: 'DAY 1 - DEC 15 (ARRIVAL)',
          items: [
            { time: '8:00 AM', title: 'Flight: LAX → JFK', desc: 'JetBlue First Class · Non-stop · 5h 30m', price: '$520' },
            { time: '4:00 PM', title: 'Private Car Service', desc: 'Luxury sedan to hotel', price: 'Free' },
            { time: '5:00 PM', title: 'Check-in: Plaza Hotel', desc: '★★★★★ Luxury · Central Park view', price: '$1,200 (7 nights)' }
          ]
        },
        {
          date: 'DAY 2 - DEC 16',
          items: [
            { time: '12:00 PM', title: 'Metropolitan Museum', desc: 'Private guided tour', price: '$150' },
            { time: '2:00 PM', title: 'Lunch: Michelin-star Restaurant', desc: 'Premium dining experience', price: '$180' }
          ]
        }
      ]
    },
    'nyc-winter': {
      cost: '$1,645',
      days: [
        {
          date: 'DAY 1 - DEC 15 (ARRIVAL)',
          items: [
            { time: '8:00 AM', title: 'Flight: LAX → JFK', desc: 'American Airlines · Non-stop · 5h 45m', price: '$450' },
            { time: '3:45 PM', title: 'Airport Transfer', desc: 'Estimated 45 mins to hotel', price: 'Free' },
            { time: '4:30 PM', title: 'Check-in: Grand Central Hotel', desc: '★★★★ · 0.5 mi from city center', price: '$850 (7 nights)' }
          ]
        },
        {
          date: 'DAY 2 - DEC 16',
          items: [
            { time: '10:00 AM', title: 'MoMA Museum', desc: 'Modern art exhibits', price: '$25' },
            { time: '1:00 PM', title: 'Lunch: Local Deli', desc: 'Casual dining', price: '$35' }
          ]
        }
      ]
    }
  };

  const toggleItinerary = (id: string) => {
    setSelectedItineraries(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleDay = (itineraryId: string, dayIndex: number) => {
    const key = `${itineraryId}-day${dayIndex}`;
    setExpandedDay(prev => ({
      ...prev,
      [key]: prev[key] ? '' : key
    }));
  };

  const voteSummaries = {
    'nyc-holiday': {
      majority: 'Majority in favor',
      summary: '3/4 travelers voted YES · Owner approved'
    },
    'nyc-winter': {
      majority: 'Mixed feedback',
      summary: '2 YES · 1 NO · waiting on 1 traveler'
    },
    'nyc-budget': {
      majority: 'Majority against',
      summary: 'Budget option rejected due to redeye flight'
    }
  } as Record<string, { majority: string; summary: string }>;

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

      {/* MAIN CONTENT */}
      <div className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="max-w-6xl mx-auto px-10">
          {/* HEADING */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Compare Itineraries</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Select and compare multiple saved itineraries to find the perfect trip</p>
          </div>

          {/* SAVED ITINERARIES SECTION */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">Your Saved Itineraries</h2>

            <div className="grid grid-cols-3 gap-6 mb-6">
              {savedItineraries.map(itinerary => (
                <div
                  key={itinerary.id}
                  className={`p-5 rounded-lg border-2 cursor-pointer transition ${
                    selectedItineraries.includes(itinerary.id)
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 dark:border-gray-700 bg-white hover:border-purple-400'
                  }`}
                  onClick={() => toggleItinerary(itinerary.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">{itinerary.name}</h3>
                    {selectedItineraries.includes(itinerary.id) && (
                      <span className="text-purple-600 text-lg">✓</span>
                    )}
                  </div>
                  <div className="space-y-2 text-xs">
                    <div><span className="text-gray-600">Destination:</span> <span className="text-gray-800">{itinerary.destination}</span></div>
                    <div><span className="text-gray-600">Dates:</span> <span className="text-gray-800">{itinerary.dates}</span></div>
                    <div><span className="text-gray-600">Duration:</span> <span className="text-gray-800">{itinerary.duration}</span></div>
                    <div><span className="text-gray-600">Total Cost:</span> <span className="font-bold text-gray-800">{itinerary.cost}</span></div>
                    <div><span className="text-gray-600">Travelers:</span> <span className="text-gray-800">{itinerary.travelers}</span></div>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  // Compare selected itineraries (already displayed below)
                  document.querySelector('.grid.grid-cols-2')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 transition"
              >
                Compare Selected
              </button>
              <button 
                onClick={() => setSelectedItineraries([])}
                className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold text-sm hover:bg-purple-50 transition"
              >
                Clear Selection
              </button>
            </div>
          </div>

          {/* COMPARISON TABLE */}
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
            <div className="bg-purple-600 text-white p-4 grid grid-cols-3 gap-4 font-bold text-sm">
              <div>Trip Overview</div>
              {selectedItineraries.map(id => (
                <div key={id}>{savedItineraries.find(i => i.id === id)?.name}</div>
              ))}
            </div>

            {/* Total Cost Row */}
            <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200">
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Total Cost</div>
              {selectedItineraries.map(id => (
                <div key={id} className="text-sm text-gray-800">
                  {savedItineraries.find(i => i.id === id)?.cost}
                </div>
              ))}
            </div>

            {/* Budget Status Row */}
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Budget Status</div>
              <div className="text-xs">
                <span className="text-orange-500 font-semibold">⚠ Over Budget</span>
              </div>
              <div className="text-xs">
                <span className="text-green-600 font-semibold">✓ Within Budget</span>
              </div>
            </div>
          </div>

          {/* DETAILED ITINERARIES */}
          <div className="grid grid-cols-2 gap-8">
            {selectedItineraries.map(itineraryId => {
              const itinerary = savedItineraries.find(i => i.id === itineraryId);
              const details = itineraryDetails[itineraryId];

              return (
                <div key={itineraryId} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* HEADER */}
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
                    <h3 className="text-lg font-bold mb-2">{itinerary?.name}</h3>
                    <div className="text-2xl font-bold mb-2">{details?.cost}</div>
                    <p className="text-sm opacity-90">{itinerary?.duration} · {itinerary?.travelers}</p>
                    <div className="mt-3 p-3 rounded-lg bg-white/10">
                      <p className="text-xs uppercase tracking-wide opacity-80">Participant vote</p>
                      <p className="text-sm font-semibold">{voteSummaries[itineraryId]?.majority || 'Awaiting votes'}</p>
                      <p className="text-[11px] opacity-80">{voteSummaries[itineraryId]?.summary || 'No comments yet'}</p>
                    </div>
                  </div>

                  {/* DAYS */}
                  <div className="p-6 space-y-6">
                    {details?.days.map((day: any, dayIndex: number) => (
                      <div key={dayIndex}>
                        <button
                          onClick={() => toggleDay(itineraryId, dayIndex)}
                          className="text-xs font-bold text-purple-600 mb-3 hover:text-purple-700 transition"
                        >
                          {day.date}
                        </button>

                        {expandedDay[`${itineraryId}-day${dayIndex}`] && (
                          <div className="space-y-4 pl-4 border-l-4 border-purple-600">
                            {day.items.map((item: any, itemIndex: number) => (
                              <div key={itemIndex}>
                                <p className="text-xs font-bold text-purple-600 mb-1">{item.time}</p>
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{item.title}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{item.desc}</p>
                                <p className="text-sm font-semibold text-purple-600">{item.price}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-6 flex gap-3">
                    <button 
                      onClick={() => router.push('/checkout')}
                      className="flex-1 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 transition"
                    >
                      Book This Plan
                    </button>
                    <button className="flex-1 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold text-sm hover:bg-purple-50 transition">
                      Edit Comparison
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PARTICIPANT SUMMARY */}
          <div className="mt-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Participant consensus board</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Track which itinerary currently leads so you can lock it in or ask for more feedback.</p>
            <div className="grid grid-cols-3 gap-4 text-xs">
              {savedItineraries.map(itinerary => (
                <div key={itinerary.id} className="border border-gray-100 rounded-lg p-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{itinerary.name}</p>
                  <p className="text-[11px] text-gray-500">{itinerary.dates}</p>
                  <p className="text-[11px] font-bold text-purple-600 mt-2">{voteSummaries[itinerary.id]?.majority || 'Awaiting votes'}</p>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">{voteSummaries[itinerary.id]?.summary || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-center py-10 text-sm border-t border-gray-200 dark:border-gray-700 dark:border-gray-800">
        <p>&copy; 2025 TravelBuddy. All rights reserved. | 
          <a href="#privacy" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Privacy Policy</a> | 
          <a href="#terms" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Terms of Service</a> | 
          <a href="#contact" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Contact Us</a>
        </p>
      </footer>
    </>
  );
}
