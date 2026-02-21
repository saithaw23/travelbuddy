'use client';

import Link from 'next/link';
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function BlogPage() {
  const featuredPost = {
    title: 'How AI is Revolutionizing Travel Planning in 2026',
    excerpt: 'Discover how artificial intelligence is transforming the way we plan trips, from personalized recommendations to real-time itinerary adjustments.',
    author: 'Sarah Chen',
    date: 'February 5, 2026',
    readTime: '8 min read',
    category: 'AI & Technology',
    image: '🤖',
    slug: 'ai-revolutionizing-travel-planning-2026'
  };

  const recentPosts = [
    {
      title: '10 Hidden Gems in Southeast Asia You Need to Visit',
      excerpt: 'Move over, Bangkok and Bali. These lesser-known destinations offer authentic experiences without the crowds.',
      author: 'Marcus Johnson',
      date: 'February 3, 2026',
      readTime: '6 min read',
      category: 'Destinations',
      image: '🏝️',
      slug: 'hidden-gems-southeast-asia'
    },
    {
      title: 'Budget Travel: How to Plan a $1000 European Adventure',
      excerpt: 'Yes, it\'s possible! Learn our proven strategies for experiencing Europe on a shoestring budget.',
      author: 'Emma Wilson',
      date: 'January 30, 2026',
      readTime: '10 min read',
      category: 'Budget Travel',
      image: '💰',
      slug: 'budget-european-adventure'
    },
    {
      title: 'The Ultimate Guide to Group Travel Planning',
      excerpt: 'Coordinating a group trip doesn\'t have to be chaos. Here\'s how to keep everyone happy and on budget.',
      author: 'Alex Rivera',
      date: 'January 28, 2026',
      readTime: '7 min read',
      category: 'Travel Tips',
      image: '👥',
      slug: 'ultimate-group-travel-guide'
    },
    {
      title: 'Sustainable Travel: Making Eco-Friendly Choices',
      excerpt: 'Travel responsibly without sacrificing comfort. Our guide to reducing your carbon footprint while exploring the world.',
      author: 'Priya Patel',
      date: 'January 25, 2026',
      readTime: '9 min read',
      category: 'Sustainable Travel',
      image: '🌱',
      slug: 'sustainable-travel-guide'
    },
    {
      title: 'Digital Nomad Destinations for 2026',
      excerpt: 'The best cities for remote workers: fast WiFi, affordable living, and vibrant communities.',
      author: 'David Kim',
      date: 'January 22, 2026',
      readTime: '8 min read',
      category: 'Digital Nomad',
      image: '💻',
      slug: 'digital-nomad-destinations-2026'
    },
    {
      title: 'Family Travel: Tips for Stress-Free Vacations with Kids',
      excerpt: 'From packing hacks to keeping kids entertained, here\'s everything you need for a smooth family trip.',
      author: 'Lisa Martinez',
      date: 'January 20, 2026',
      readTime: '6 min read',
      category: 'Family Travel',
      image: '👨‍👩‍👧‍👦',
      slug: 'family-travel-tips'
    }
  ];

  const categories = [
    'All Posts',
    'AI & Technology',
    'Destinations',
    'Budget Travel',
    'Travel Tips',
    'Sustainable Travel',
    'Digital Nomad',
    'Family Travel'
  ];

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 shadow-md z-50 flex items-center justify-between px-10">
        <Link href="/" className="text-2xl font-bold text-purple-600">TravelBuddy</Link>
        <nav className="flex gap-10 items-center">
          <Link href="/about" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">About</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">How It Works</Link>
          <Link href="/trust-safety" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">Trust & Safety</Link>
          <Link href="/blog" className="text-sm font-medium text-purple-600">Blog</Link>
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

      {/* HERO SECTION */}
      <section 
        className="mt-20 flex items-center justify-center text-center relative overflow-hidden pt-24 pb-20"
        style={{
          background: 'linear-gradient(135deg, #9333ea 0%, #a855f7 50%, #c084fc 100%)',
        }}
      >
        <div className="relative z-10 max-w-4xl px-8">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            TravelBuddy Blog
          </h1>
          <p className="text-xl text-white text-opacity-95 drop-shadow max-w-3xl mx-auto">
            Travel tips, destination guides, and insights on the future of AI-powered travel planning.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 dark:bg-gray-950 pb-16">
        <div className="max-w-6xl mx-auto px-10 -mt-10 relative z-20">
          
          {/* FEATURED POST */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 mb-12 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-start gap-8">
              <div className="text-8xl">{featuredPost.image}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 dark:text-gray-400 rounded-full text-sm font-semibold">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 hover:text-purple-600 transition">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all">
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="mb-8">
            <div className="flex gap-3 flex-wrap justify-center">
              {categories.map((category, idx) => (
                <button
                  key={idx}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    idx === 0
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 dark:text-gray-300 border border-gray-300 hover:border-purple-600 hover:text-purple-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* RECENT POSTS */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {recentPosts.map((post, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="text-5xl mb-4">{post.image}</div>
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 dark:text-gray-400 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Never Miss a Post</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Get travel tips, destination guides, and AI insights delivered to your inbox every week.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-4 bg-white dark:bg-gray-800 text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-purple-200 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
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
