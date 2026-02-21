'use client';

import Link from 'next/link';
import { Sparkles, Users, Globe, Heart, Target, Zap } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function AboutPage() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 shadow-md z-50 flex items-center justify-between px-10">
        <Link href="/" className="text-2xl font-bold text-purple-600">TravelBuddy</Link>
        <nav className="flex gap-10 items-center">
          <Link href="/about" className="text-sm font-medium text-purple-600">About</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">How It Works</Link>
          <Link href="/trust-safety" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Trust & Safety</Link>
          <Link href="/blog" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Blog</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Contact</Link>
        </nav>

        <div className="flex gap-6 items-center">
          <ModeToggle />
          <Link href="/profile" className="flex items-center gap-4 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-semibold text-sm">JD</div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-gray-800 text-sm">John Doe</div>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">About TravelBuddy</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Reimagining Travel Planning with AI
          </h1>
          <p className="text-xl text-white text-opacity-95 drop-shadow max-w-3xl mx-auto">
            We're on a mission to make travel planning effortless, personalized, and enjoyable for everyone. No more endless research, overwhelming options, or complicated booking processes.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 dark:bg-gray-950 pb-16">
        <div className="max-w-6xl mx-auto px-10 -mt-10 relative z-20">
          
          {/* OUR STORY */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                TravelBuddy was born from a simple frustration: planning a trip shouldn't feel like a full-time job. Our founders spent countless hours comparing flights, reading hotel reviews, and trying to coordinate group travel decisions—only to feel overwhelmed and uncertain about their choices.
              </p>
              <p>
                We realized that while AI was transforming many industries, travel planning was still stuck in the past. Travelers were forced to juggle multiple websites, spreadsheets, and group chats just to organize a simple vacation.
              </p>
              <p>
                So we built TravelBuddy—an AI-powered platform that understands your preferences through natural conversation, generates personalized itineraries, and makes group planning collaborative and fun. No more decision fatigue. No more missed details. Just effortless travel planning.
              </p>
            </div>
          </div>

          {/* OUR MISSION */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-2xl p-12 mb-12 border border-purple-200 dark:border-purple-800">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
                <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
                  To empower every traveler with AI-driven insights and tools that make trip planning as exciting as the journey itself. We believe travel should be accessible, personalized, and stress-free for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* OUR VALUES */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  icon: <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
                  title: 'Innovation First',
                  description: 'We leverage cutting-edge AI to solve real travel problems and continuously push boundaries.'
                },
                {
                  icon: <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
                  title: 'User-Centric',
                  description: 'Every feature we build starts with understanding traveler needs and pain points.'
                },
                {
                  icon: <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
                  title: 'Transparency',
                  description: 'No hidden fees, no dark patterns. We show you exactly what you\'re paying for and why.'
                },
                {
                  icon: <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
                  title: 'Inclusivity',
                  description: 'Travel is for everyone. We design for diverse needs, budgets, and travel styles.'
                },
                {
                  icon: <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
                  title: 'Efficiency',
                  description: 'We respect your time. Our AI does the heavy lifting so you can focus on excitement.'
                },
                {
                  icon: <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
                  title: 'Reliability',
                  description: 'Your trip matters. We ensure accurate information and dependable booking processes.'
                }
              ].map((value, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TEAM SECTION */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Meet the Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              We're a diverse team of travel enthusiasts, AI engineers, and product designers united by a passion for making travel planning delightful.
            </p>
            
            <div className="grid grid-cols-4 gap-8">
              {[
                { name: 'Sarah Chen', role: 'CEO & Co-Founder', initials: 'SC', color: 'from-purple-600 to-purple-800' },
                { name: 'Marcus Johnson', role: 'CTO & Co-Founder', initials: 'MJ', color: 'from-blue-600 to-blue-800' },
                { name: 'Priya Patel', role: 'Head of AI', initials: 'PP', color: 'from-pink-600 to-pink-800' },
                { name: 'Alex Rivera', role: 'Head of Product', initials: 'AR', color: 'from-green-600 to-green-800' },
                { name: 'Emma Wilson', role: 'Head of Design', initials: 'EW', color: 'from-orange-600 to-orange-800' },
                { name: 'David Kim', role: 'Head of Engineering', initials: 'DK', color: 'from-indigo-600 to-indigo-800' },
                { name: 'Lisa Martinez', role: 'Head of Operations', initials: 'LM', color: 'from-red-600 to-red-800' },
                { name: 'James Taylor', role: 'Head of Growth', initials: 'JT', color: 'from-teal-600 to-teal-800' }
              ].map((member, idx) => (
                <div key={idx} className="text-center">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4`}>
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STATS */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white mb-12">
            <h2 className="text-4xl font-bold mb-8 text-center">TravelBuddy by the Numbers</h2>
            <div className="grid grid-cols-4 gap-8">
              {[
                { number: '50K+', label: 'Happy Travelers' },
                { number: '150+', label: 'Countries Covered' },
                { number: '1M+', label: 'Trips Planned' },
                { number: '4.8/5', label: 'Average Rating' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-purple-100 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ready to Plan Your Next Adventure?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who've discovered a better way to plan trips. Start chatting with our AI today.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/" className="px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl">
                Start Planning
              </Link>
              <Link href="/how-it-works" className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-all">
                Learn How It Works
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-center py-10 text-sm border-t border-gray-200 dark:border-gray-800">
        <p>&copy; 2026 TravelBuddy. All rights reserved. | 
          <Link href="/trust-safety" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Privacy Policy</Link> | 
          <Link href="/trust-safety" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Terms of Service</Link> | 
          <Link href="/contact" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Contact Us</Link>
        </p>
      </footer>
    </>
  );
}
