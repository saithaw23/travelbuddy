'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RecommendationsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('flights');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const categories = [
    { id: 'flights', label: 'Flights', count: 8 },
    { id: 'hotels', label: 'Hotels', count: 12 },
    { id: 'restaurants', label: 'Restaurants', count: 24 },
    { id: 'attractions', label: 'Attractions', count: 18 },
    { id: 'car-rentals', label: 'Car Rentals', count: 5 }
  ];

  const flights = [
    {
      id: 'flight1',
      route: 'LAX → NYC',
      time: '8:00 AM - Non-stop',
      duration: '5h 45m',
      price: '$450',
      matchScore: '95%',
      matchColor: 'green'
    },
    {
      id: 'flight2',
      route: 'LAX → NYC',
      time: '2:30 PM - 1 stop',
      duration: '7h 20m',
      price: '$380',
      matchScore: '88%',
      matchColor: 'yellow'
    }
  ];

  const toggleSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-1000 flex items-center justify-between px-10">
        <Link href="/" className="text-2xl font-bold text-purple-600">TravelBuddy</Link>
        <nav className="flex gap-10 items-center">
          <a href="#about" className="text-sm font-medium text-gray-800 hover:text-purple-600">About</a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-800 hover:text-purple-600">How It Works</a>
          <a href="#trust" className="text-sm font-medium text-gray-800 hover:text-purple-600">Trust & Safety</a>
          <a href="#blog" className="text-sm font-medium text-gray-800 hover:text-purple-600">Blog</a>
          <a href="#contact" className="text-sm font-medium text-gray-800 hover:text-purple-600">Contact</a>
        </nav>

        <div className="flex gap-6 items-center">
          <Link href="/profile" className="flex items-center gap-4 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-semibold text-sm">JD</div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-gray-800 text-sm">John Doe</div>
              <div className="text-xs text-gray-500">Signed in</div>
            </div>
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="pt-40 pb-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-10">
          {/* CATEGORY TABS */}
          <div className="flex gap-8 border-b border-gray-200 mb-8 pb-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 text-sm font-semibold transition ${
                  activeCategory === category.id
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-4'
                    : 'text-gray-800 hover:text-purple-600'
                }`}
              >
                {category.label}
                <span className={`px-2 py-1 rounded-full text-xs text-white ${
                  activeCategory === category.id ? 'bg-purple-600' : 'bg-gray-400'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-4 gap-8">
            {/* LEFT SIDEBAR - FILTERS */}
            <div className="col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Refine Results</h3>

                {/* AI MATCH SCORE */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">AI Match Score</label>
                  <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-purple-600" />
                  <p className="text-xs text-gray-500 mt-2">80%+ relevance</p>
                </div>

                {/* PRICE RANGE */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">Price Range</label>
                  <input type="range" min="0" max="1000" defaultValue="500" className="w-full accent-purple-600" />
                  <p className="text-xs text-gray-500 mt-2">Up to $500</p>
                </div>

                {/* BUDGET CHECKBOX */}
                <div className="mb-6 flex items-center gap-2">
                  <input type="checkbox" id="within-budget" defaultChecked className="w-4 h-4 accent-purple-600" />
                  <label htmlFor="within-budget" className="text-sm text-gray-800 cursor-pointer">Within budget</label>
                </div>

                {/* SORT BY */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Sort by:</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600">
                    <option>Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Departure Time</option>
                  </select>
                </div>

                {/* CLEAR FILTERS */}
                <button className="w-full py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition">
                  Clear Filters
                </button>
              </div>
            </div>

            {/* CENTER - RECOMMENDATIONS */}
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Recommended {categories.find(c => c.id === activeCategory)?.label}</h2>
              <p className="text-gray-600 text-sm mb-6">Showing 8 recommendations</p>

              <div className="space-y-4">
                {flights.map(flight => (
                  <div key={flight.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                    {/* Flight Image */}
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                    {/* Flight Details */}
                    <div className="p-6">
                      {/* Match Score */}
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3 ${
                        flight.matchColor === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        {flight.matchScore} Match
                      </div>

                      {/* Route */}
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{flight.route}</h3>

                      {/* Time Details */}
                      <p className="text-sm text-gray-600 mb-3">{flight.time} · {flight.duration}</p>

                      {/* Price */}
                      <p className="text-2xl font-bold text-purple-600 mb-3">{flight.price}</p>

                      {/* Info */}
                      <p className="text-xs text-gray-600 mb-4">Fits budget</p>
                      <p className="text-xs text-gray-600 mb-4">Matches preferences</p>

                      {/* Select Button */}
                      <button
                        onClick={() => toggleSelection(flight.id)}
                        className={`w-full py-3 rounded-lg font-semibold transition ${
                          selectedItems.includes(flight.id)
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR - TRIP SELECTIONS */}
            <div className="col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Your Trip Selections</h3>

                {selectedItems.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">No items selected yet</p>
                ) : (
                  <div className="mb-6 space-y-2">
                    {selectedItems.map(id => (
                      <div key={id} className="text-sm text-gray-800 bg-white p-2 rounded">
                        Selected item
                      </div>
                    ))}
                  </div>
                )}

                {/* BUDGET BREAKDOWN */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Budget Breakdown</h4>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Flights:</span>
                      <span className="text-purple-600 font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hotels:</span>
                      <span className="text-purple-600 font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Restaurants:</span>
                      <span className="text-purple-600 font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Attractions:</span>
                      <span className="text-purple-600 font-semibold">$0</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mb-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-800">Total:</span>
                      <span className="text-purple-600 font-bold">$0</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-6">Remaining: $2,000</p>

                  {/* CTA BUTTON */}
                  <button 
                    onClick={() => router.push('/trip-summary')}
                    className="w-full py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition"
                  >
                    Save and Review Trip
                  </button>
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
