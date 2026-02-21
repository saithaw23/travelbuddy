'use client';

import Link from 'next/link';
import { MessageCircle, Sparkles, CheckCircle, CreditCard, MapPin, Users, Calendar, DollarSign } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function HowItWorksPage() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 shadow-md z-50 flex items-center justify-between px-10">
        <Link href="/" className="text-2xl font-bold text-purple-600">TravelBuddy</Link>
        <nav className="flex gap-10 items-center">
          <Link href="/about" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">About</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-purple-600">How It Works</Link>
          <Link href="/trust-safety" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Trust & Safety</Link>
          <Link href="/blog" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Blog</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Contact</Link>
        </nav>

        <div className="flex gap-6 items-center">
          <ModeToggle />
          <Link href="/profile" className="flex items-center gap-4 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-semibold text-sm">JD</div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">John Doe</div>
              <div className="text-xs text-gray-500">Signed in</div>
            </div>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        className="mt-20 flex items-center justify-center text-center relative overflow-hidden pt-24 pb-20"
        style={{
          background: 'linear-gradient(135deg, #9333ea 0%, #a855f7 50%, #c084fc 100%)',
        }}
      >
        <div className="relative z-10 max-w-4xl px-8">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            How TravelBuddy Works
          </h1>
          <p className="text-xl text-white text-opacity-95 drop-shadow max-w-3xl mx-auto">
            From conversation to confirmation in minutes. Here's how our AI-powered platform makes travel planning effortless.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 dark:bg-gray-950 pb-16">
        <div className="max-w-6xl mx-auto px-10 -mt-10 relative z-20">
          
          {/* SIMPLE STEPS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">4 Simple Steps to Your Perfect Trip</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">No forms, no hassle—just chat with our AI and let us handle the rest.</p>
            
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  icon: <MessageCircle className="w-8 h-8 text-white" />,
                  title: 'Chat with Our AI',
                  description: 'Tell us about your dream trip in your own words. Where do you want to go? What\'s your budget? What do you enjoy? Our AI understands natural conversation—no rigid forms to fill out.',
                  example: '"I want a romantic trip to Italy for 2 weeks in spring, budget around $5000, love food and wine"',
                  color: 'from-purple-600 to-purple-800'
                },
                {
                  step: '2',
                  icon: <Sparkles className="w-8 h-8 text-white" />,
                  title: 'Get Personalized Plans',
                  description: 'Our AI analyzes thousands of options and creates 3 complete trip plans tailored to your preferences. Each plan includes flights, hotels, restaurants, and activities—all within your budget.',
                  example: 'See detailed itineraries with prices, ratings, and AI confidence scores',
                  color: 'from-blue-600 to-blue-800'
                },
                {
                  step: '3',
                  icon: <CheckCircle className="w-8 h-8 text-white" />,
                  title: 'Collaborate & Customize',
                  description: 'Traveling with others? Invite them to vote on options and leave comments. Want to swap a hotel or change a restaurant? Edit individual items without rebuilding your entire trip.',
                  example: 'Group voting, comments, and flexible editing all in one place',
                  color: 'from-green-600 to-green-800'
                },
                {
                  step: '4',
                  icon: <CreditCard className="w-8 h-8 text-white" />,
                  title: 'Book & Go',
                  description: 'Review your final itinerary with transparent pricing (no hidden fees!), complete your booking securely, and receive your trip details instantly. Export to PDF for offline access.',
                  example: 'One-click booking with complete price breakdown',
                  color: 'from-orange-600 to-orange-800'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl font-bold text-gray-300">0{item.step}</span>
                      <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{item.description}</p>
                    <div className="bg-gray-50 dark:bg-gray-950 border-l-4 border-purple-600 p-4 rounded">
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">{item.example}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KEY FEATURES */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">What Makes TravelBuddy Different</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
                  title: 'Conversational AI',
                  description: 'No more filling out endless forms. Just chat naturally about your trip preferences and let our AI do the work.'
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-purple-600" />,
                  title: 'Smart Recommendations',
                  description: 'Our AI analyzes your preferences, budget, and travel style to suggest options you\'ll actually love.'
                },
                {
                  icon: <DollarSign className="w-8 h-8 text-purple-600" />,
                  title: 'Price Transparency',
                  description: 'See exactly what you\'re paying for with itemized breakdowns. No hidden fees, no surprises.'
                },
                {
                  icon: <Users className="w-8 h-8 text-purple-600" />,
                  title: 'Group Collaboration',
                  description: 'Invite friends and family to vote on options and comment. Make group decisions without endless group chats.'
                },
                {
                  icon: <Calendar className="w-8 h-8 text-purple-600" />,
                  title: 'Flexible Editing',
                  description: 'Change your mind? Swap individual flights, hotels, or activities without starting over.'
                },
                {
                  icon: <MapPin className="w-8 h-8 text-purple-600" />,
                  title: 'Complete Itineraries',
                  description: 'Get everything in one place: flights, hotels, restaurants, activities, and local tips.'
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HOW AI WORKS */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-12 mb-12 border border-purple-200">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">How Our AI Works</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">1. Understanding Your Preferences</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our AI uses natural language processing to understand your travel preferences from conversation. It extracts key details like destination, dates, budget, travel style, and interests without requiring you to fill out forms.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">2. Searching Thousands of Options</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We connect to major travel APIs (Amadeus for flights/hotels, Foursquare for restaurants) to search thousands of real-time options. Our AI filters and ranks them based on your specific preferences and budget.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">3. Creating Personalized Itineraries</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The AI combines the best options into complete trip plans, ensuring everything fits your budget, schedule, and interests. It considers factors like location proximity, timing, and traveler reviews.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">4. Learning from Feedback</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  As you interact with recommendations (voting, commenting, selecting), our AI learns your preferences to provide even better suggestions for future trips.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                {
                  q: 'How long does it take to plan a trip?',
                  a: 'Most users complete their trip planning in 1-2 minutes of chatting with our AI. The AI generates personalized plans instantly, and you can book right away or take time to collaborate with your group.'
                },
                {
                  q: 'Can I change my itinerary after it\'s created?',
                  a: 'Absolutely! You can swap individual flights, hotels, restaurants, or activities without rebuilding your entire trip. Just click on any item and select "Change" to see alternatives.'
                },
                {
                  q: 'How does group collaboration work?',
                  a: 'Invite collaborators via email or link. They can view your itinerary, vote on options (Yes/No/Maybe), and leave comments. As the trip owner, you have final decision-making power.'
                },
                {
                  q: 'Are there any hidden fees?',
                  a: 'Never. We show complete price breakdowns including base fare, taxes, and all fees upfront. What you see is what you pay.'
                },
                {
                  q: 'What if I need help during my trip?',
                  a: 'Our AI assistant is available 24/7 through the floating chat widget. Ask questions about your itinerary, get local recommendations, or request changes anytime.'
                },
                {
                  q: 'Can I use TravelBuddy offline?',
                  a: 'Yes! Export your itinerary to PDF before your trip. It includes all booking confirmations, addresses, and important details for offline access.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{faq.q}</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Experience the Future of Travel Planning?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who've discovered a smarter way to plan trips.
            </p>
            <Link href="/" className="inline-block px-10 py-4 bg-white dark:bg-gray-800 text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
              Start Planning Your Trip
            </Link>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-center py-10 text-sm border-t border-gray-200 dark:border-gray-700 dark:border-gray-800">
        <p>&copy; 2026 TravelBuddy. All rights reserved. | 
          <Link href="/trust-safety" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Privacy Policy</Link> | 
          <Link href="/trust-safety" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Terms of Service</Link> | 
          <Link href="/contact" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Contact Us</Link>
        </p>
      </footer>
    </>
  );
}
