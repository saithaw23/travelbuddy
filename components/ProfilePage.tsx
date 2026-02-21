'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ImageIcon, MessageCircle, Star, Video } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const myReviews = [
    {
      id: 'rev1',
      place: 'JFK Morning Non-stop',
      rating: 4.8,
      media: 'text',
      content: 'Shared why the morning arrival is best for beating traffic + added seat tips.',
      timestamp: 'Yesterday'
    },
    {
      id: 'rev2',
      place: 'Grand Central Hotel',
      rating: 4.6,
      media: 'photo',
      content: 'Uploaded lobby + room walkthrough so the team can preview the vibe.',
      timestamp: '2 days ago'
    },
    {
      id: 'rev3',
      place: 'Met Museum Private Tour',
      rating: 4.9,
      media: 'video',
      content: '30-second clip of the guide + crowd level to justify premium pricing.',
      timestamp: 'Last week'
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
          <div className="flex items-center gap-4 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-300">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-semibold text-sm">JD</div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-gray-800 text-sm">John Doe</div>
              <div className="text-xs text-gray-500">Signed in</div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="pt-8 pb-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="max-w-4xl mx-auto px-10">
          {/* PROFILE HEADER */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-6 mt-24">
            <div className="flex items-start gap-6">
              {/* AVATAR */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-4xl flex-shrink-0">JD</div>

              {/* PROFILE INFO */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">John Doe</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">john.doe@example.com</p>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">8</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Trips</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">24</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Countries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">$18.5K</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Spent</div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                    Edit Profile
                  </button>
                  <button className="px-4 py-2 text-sm border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition">
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-3 gap-8">
            {/* LEFT COLUMN */}
            <div className="col-span-2 space-y-8">
              {/* YOUR TRAVEL PREFERENCES */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Your Travel Preferences</h2>
                  <button className="text-purple-600 dark:text-purple-400 text-sm font-semibold hover:text-purple-700">Edit</button>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">Adventure Level</h3>
                  <p className="text-gray-600 dark:text-gray-400">Balanced (3/5)</p>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">Travel Style</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Luxury', 'Budget-Friendly', 'Local Experiences'].map(style => (
                      <span key={style} className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Food & Dining', 'Museums & Culture', 'Photography', 'Art & Design'].map(interest => (
                      <span key={interest} className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">Budget Range</h3>
                  <p className="text-gray-600 dark:text-gray-400">$2,000 - $5,000 per trip</p>
                </div>
              </div>

              {/* AI INSIGHT */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg p-6 text-white">
                <h3 className="text-base font-bold mb-2">AI Insight:</h3>
                <p className="text-sm text-white">Based on your 8 past trips, you prefer mid-range hotels in city centers with easy access to restaurants and cultural attractions. Average trip length: 6-8 nights. Best booking window: 4-6 weeks in advance.</p>
              </div>

              {/* PAST TRAVELS */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Past Travels</h2>
                  <button className="text-purple-600 dark:text-purple-400 text-sm font-semibold hover:text-purple-700">View All</button>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg overflow-hidden">
                  <div className="h-32 flex items-center justify-center">
                    <span className="text-4xl">🇯🇵</span>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">Tokyo, Japan</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Mar 2024 · 8 nights</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* ACCOUNT SUMMARY */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-4">Account Summary</h3>

                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">john.doe@...</p>
                  </div>

                  <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Member Since</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">Jan 2022</p>
                  </div>

                  <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account Status</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">Verified</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Loyalty Status</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">Gold</p>
                  </div>
                </div>
              </div>

              {/* TRAVEL INSIGHTS */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-4">Travel Insights</h3>

                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Trip Cost</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">$2,831</p>
                  </div>

                  <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Favorite Region</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">Asia</p>
                  </div>

                  <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Trips/Year</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">2.7</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Best Rated Trip</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">Rome 4.9★</p>
                  </div>
                </div>
              </div>

              {/* PERSONALIZED RECOMMENDATIONS */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-4">Personalized Recommendations</h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">Based on your preferences and past travels, we recommend:</p>

                <div className="space-y-2">
                  <button className="w-full py-2 text-sm bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                    Barcelona, Spain
                  </button>
                  <button className="w-full py-2 text-sm bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                    Kyoto, Japan
                  </button>
                  <button className="w-full py-2 text-sm bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                    Amsterdam, Netherlands
                  </button>
                </div>
              </div>

              {/* REVIEW CONTRIBUTIONS */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-4">Your Review Contributions</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">These updates power trusted recommendations for your group.</p>
                <div className="space-y-3">
                  {myReviews.map(review => (
                    <div key={review.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{review.place}</p>
                        <div className="flex items-center gap-1 text-xs font-semibold text-gray-800 dark:text-gray-100">
                          <Star className="w-3.5 h-3.5 text-yellow-500" fill="#FACC15" />
                          {review.rating.toFixed(1)}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                        {review.media === 'photo' && <ImageIcon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                        {review.media === 'video' && <Video className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                        {review.media === 'text' && <MessageCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                        <span className="capitalize">{review.media}</span>
                        <span>• {review.timestamp}</span>
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-center py-10 text-sm mt-16 border-t border-gray-200 dark:border-gray-800">
        <p>&copy; 2025 TravelBuddy. All rights reserved. | 
          <a href="#privacy" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Privacy Policy</a> | 
          <a href="#terms" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Terms of Service</a> | 
          <a href="#contact" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Contact Us</a>
        </p>
      </footer>
    </>
  );
}
