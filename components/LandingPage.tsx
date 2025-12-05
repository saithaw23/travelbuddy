'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [destination, setDestination] = useState('New York City');
  const [fromDate, setFromDate] = useState('2025-12-15');
  const [toDate, setToDate] = useState('2025-12-22');
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState('$5,000');
  const [currency, setCurrency] = useState('USD ($)');
  const [adventureLevel, setAdventureLevel] = useState(4);
  const [selectedTravelStyles, setSelectedTravelStyles] = useState(['Luxury', 'Budget-Friendly']);
  const [selectedInterests, setSelectedInterests] = useState(['Food & Dining', 'Museums & Culture', 'Photography', 'Art & Design']);
  const [additionalTravelersVisible, setAdditionalTravelersVisible] = useState(false);
  const [expandedCollapsible, setExpandedCollapsible] = useState<string | null>(null);
  const [additionalAdventureLevels, setAdditionalAdventureLevels] = useState<Record<number, number>>({});

  const adventureLabels = ['', 'Relaxed', 'Moderate', 'Balanced', 'Adventurous', 'Extreme'];
  
  const travelStyles = ['Luxury', 'Budget-Friendly', 'Local Experiences', 'Adventure Sports', 'Cultural Tours', 'Relaxation', 'Nightlife', 'Family-Friendly'];
  const interests = ['Food & Dining', 'Outdoor Activities', 'Museums & Culture', 'Nightlife & Entertainment', 'Shopping', 'Photography', 'Beach & Water', 'Mountain & Hiking', 'Historical Sites', 'Wildlife & Nature', 'Adventure Sports', 'Art & Design'];

  const handleTravelersChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setTravelers(value);
    setAdditionalTravelersVisible(value > 1);
  };

  const toggleTravelStyle = (style: string) => {
    setSelectedTravelStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleCollapsible = (section: string) => {
    setExpandedCollapsible(expandedCollapsible === section ? null : section);
  };

  const handlePresetDate = (preset: string) => {
    const today = new Date();
    let from: Date = new Date();
    let to: Date = new Date();
    
    switch(preset) {
      case 'weekend':
        from = new Date(today);
        from.setDate(from.getDate() + (5 - from.getDay()));
        to = new Date(from);
        to.setDate(to.getDate() + 2);
        break;
      case 'month':
        from = new Date(today);
        from.setDate(1);
        from.setMonth(from.getMonth() + 1);
        to = new Date(from);
        to.setDate(to.getDate() + 30);
        break;
      case 'flexible':
        from = new Date(today);
        from.setDate(from.getDate() + 7);
        to = new Date(from);
        to.setDate(to.getDate() + 14);
        break;
    }
    
    setFromDate(from.toISOString().split('T')[0]);
    setToDate(to.toISOString().split('T')[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/recommendations');
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-1000 flex items-center justify-between px-10">
        <a href="#" className="text-2xl font-bold text-purple-600">TravelBuddy</a>
        <nav className="flex gap-10 items-center">
          <a href="#about" className="text-sm font-medium text-gray-800 hover:text-purple-600">About</a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-800 hover:text-purple-600">How It Works</a>
          <a href="#trust" className="text-sm font-medium text-gray-800 hover:text-purple-600">Trust & Safety</a>
          <a href="#blog" className="text-sm font-medium text-gray-800 hover:text-purple-600">Blog</a>
          <a href="#contact" className="text-sm font-medium text-gray-800 hover:text-purple-600">Contact</a>
        </nav>

        <div className="flex gap-6 items-center">
          <Link href="/profile" className="flex items-center gap-4 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-semibold text-sm">JD</div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-gray-800 text-sm">John Doe</div>
              <div className="text-xs text-gray-500">Signed in</div>
            </div>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        className="mt-20 flex items-start justify-center text-center relative overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(135deg, #9333ea 0%, #a855f7 50%, #c084fc 100%)',
          minHeight: '400px'
        }}
      >
        <div className="relative z-10 max-w-2xl px-8">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">Your Perfect Trip, Effortlessly</h1>
          <p className="text-lg text-white text-opacity-90 drop-shadow">AI-powered recommendations tailored to your budget, interests, and travel style</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 pb-16">
        <div className="max-w-6xl mx-auto px-10 -mt-20 relative z-20">
          <div className="max-w-4xl mx-auto">
            {/* FORM SECTION */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-purple-600 mb-4">Tell Us About Your Trip</h2>
                <p className="text-base text-gray-600">In just 3 minutes, get personalized recommendations perfectly matched to your budget and preferences</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* TRIP BASICS */}
                <div className="border-t-2 border-gray-300 mt-8 pt-6 mb-6">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Trip Basics</h3>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Where are you going?</label>
                  <input
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">From</label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">To</label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Quick select:</label>
                  <div className="flex gap-4 flex-wrap mb-2">
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition" onClick={() => handlePresetDate('weekend')}>
                      This Weekend
                    </button>
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition" onClick={() => handlePresetDate('month')}>
                      Next Month
                    </button>
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition" onClick={() => handlePresetDate('flexible')}>
                      Flexible Dates
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 italic">Can&apos;t decide? Choose flexible dates for more options</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">How many people are traveling?</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={travelers}
                    onChange={handleTravelersChange}
                    className="w-48 px-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                {/* BUDGET & PREFERENCES */}
                <div className="border-t-2 border-gray-300 mt-8 pt-6 mb-6">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Budget & Preferences</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">What&apos;s your total budget?</label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                    />
                    <p className="text-xs text-gray-500 italic mt-1">Per person for entire trip</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Currency</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-sans text-gray-800 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>JPY (¥)</option>
                      <option>AUD (A$)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">How adventurous are you?</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={adventureLevel}
                    onChange={(e) => setAdventureLevel(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Relaxed</span>
                    <span>Adventurous</span>
                  </div>
                  <div className="text-center text-purple-600 font-bold mt-2">{adventureLabels[adventureLevel]}</div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">What&apos;s your travel style?</label>
                  <div className="flex flex-wrap gap-3">
                    {travelStyles.map(style => (
                      <button
                        key={style}
                        type="button"
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTravelStyles.includes(style) ? 'bg-purple-600 text-white' : 'bg-white border border-gray-300 text-gray-800 hover:border-purple-600 hover:bg-purple-50'}`}
                        onClick={() => toggleTravelStyle(style)}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">What interests you most?</label>
                  <div className="grid grid-cols-3 gap-4">
                    {interests.map(interest => (
                      <div key={interest} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={interest}
                          checked={selectedInterests.includes(interest)}
                          onChange={() => toggleInterest(interest)}
                          className="w-5 h-5 accent-purple-600 cursor-pointer"
                        />
                        <label htmlFor={interest} className="text-sm text-gray-800 cursor-pointer">{interest}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {additionalTravelersVisible && travelers > 1 && (
                  <div className="border-t-2 border-gray-300 mt-8 pt-6 mb-6">
                    <p className="text-sm font-semibold text-gray-800 mb-4">Add preferences for additional travelers</p>
                    {Array.from({ length: travelers - 1 }).map((_, index) => (
                      <div key={index + 1} className="mb-4">
                        <div
                          className="px-4 py-3 bg-gray-100 rounded-lg cursor-pointer font-semibold text-gray-800 hover:bg-purple-100 transition flex justify-between items-center"
                          onClick={() => toggleCollapsible(`person${index + 2}`)}
                        >
                          Person {index + 2} Preferences
                          <span className={`transition-transform ${expandedCollapsible === `person${index + 2}` ? 'rotate-180' : ''}`}>▼</span>
                        </div>
                        {expandedCollapsible === `person${index + 2}` && (
                          <div className="mt-4 pl-4 space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-800 mb-2">Adventure Level</label>
                              <input
                                type="range"
                                min="1"
                                max="5"
                                value={additionalAdventureLevels[index + 2] || 3}
                                onChange={(e) => setAdditionalAdventureLevels({...additionalAdventureLevels, [index + 2]: parseInt(e.target.value)})}
                                className="w-full accent-purple-600"
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>Relaxed</span>
                                <span>Adventurous</span>
                              </div>
                              <div className="text-center text-purple-600 font-bold mt-2">{adventureLabels[additionalAdventureLevels[index + 2] || 3]}</div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-800 mb-3">What is your travel style?</label>
                              <div className="flex flex-wrap gap-2">
                                {travelStyles.map((style) => (
                                  <button
                                    key={style}
                                    type="button"
                                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                                      selectedTravelStyles.includes(style)
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}
                                  >
                                    {style}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-800 mb-3">What interests you most?</label>
                              <div className="grid grid-cols-3 gap-3">
                                {interests.map((interest) => (
                                  <div key={interest} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      id={`person${index + 2}-${interest}`}
                                      defaultChecked={false}
                                      className="w-5 h-5 accent-purple-600 cursor-pointer"
                                    />
                                    <label htmlFor={`person${index + 2}-${interest}`} className="text-sm text-gray-800 cursor-pointer">{interest}</label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* FORM ACTIONS */}
                <div className="flex gap-4 justify-center pt-6">
                  <button type="submit" className="flex-1 min-w-52 px-10 py-3 bg-purple-600 text-white rounded-lg text-base font-semibold hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all">
                    Get My Personalized Recommendations
                  </button>
                  <button type="button" className="flex-1 min-w-52 px-10 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg text-base font-semibold hover:bg-purple-50 transition-all">
                    Browse All Destinations
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="max-w-6xl mx-auto px-10 mt-16 mb-16 text-center">
          <h2 className="text-4xl font-bold text-purple-600 mb-4">How We Personalize Your Trip</h2>
          <p className="text-base text-gray-600 mb-12 max-w-2xl mx-auto">Our AI analyzes your preferences to match you with options that fit your style AND budget</p>
          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: '🎯', title: 'Smart Matching', desc: 'AI matches flights, hotels & activities to your preferences' },
              { icon: '💰', title: 'Budget Control', desc: 'Real-time tracking keeps you within your budget' },
              { icon: '🌍', title: 'Curated Options', desc: 'No overwhelming lists—just options that fit you' },
              { icon: '⭐', title: 'Expert Tips', desc: 'Hidden gems and insider recommendations included' }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-gray-100 rounded-xl text-center">
                <div className="text-5xl mb-3">{feature.icon}</div>
                <h4 className="text-base font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
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
