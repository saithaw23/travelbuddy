'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Compass, MapPin, Calendar, DollarSign, Users, Heart } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const STARTER_PROMPTS = [
  { icon: '🏖️', text: 'Plan a weekend getaway under $1000', category: 'budget' },
  { icon: '🎭', text: 'Find me a cultural trip to Asia', category: 'culture' },
  { icon: '👨‍👩‍👧‍👦', text: 'I need a family vacation with kids', category: 'family' },
  { icon: '🌄', text: 'Adventure trip for thrill seekers', category: 'adventure' },
  { icon: '💑', text: 'Romantic getaway for two', category: 'romance' },
  { icon: '🍜', text: 'Food tour across Europe', category: 'food' },
];

export default function ChatLandingPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI travel assistant. Tell me about your dream trip and I'll help you plan it perfectly. Where would you like to go?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, messages.length);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string, messageCount: number): Message => {
    // Simple mock logic - replace with actual AI API
    const lowerMessage = userMessage.toLowerCase();
    
    if (messageCount === 1) {
      // First response - ask for more details
      if (lowerMessage.includes('budget') || lowerMessage.includes('$')) {
        return {
          id: Date.now().toString(),
          role: 'assistant',
          content: "Great! I can help you plan a budget-friendly trip. What's your ideal destination, and how many days are you thinking?",
          timestamp: new Date(),
        };
      } else if (lowerMessage.includes('family') || lowerMessage.includes('kids')) {
        return {
          id: Date.now().toString(),
          role: 'assistant',
          content: "Perfect! Family trips are my specialty. How many people will be traveling, and what are the ages of your kids? Also, what's your budget range?",
          timestamp: new Date(),
        };
      } else if (lowerMessage.includes('romantic') || lowerMessage.includes('couple')) {
        return {
          id: Date.now().toString(),
          role: 'assistant',
          content: "How lovely! A romantic getaway. Are you thinking beach, mountains, or city? And what's your budget for this special trip?",
          timestamp: new Date(),
        };
      } else {
        return {
          id: Date.now().toString(),
          role: 'assistant',
          content: "That sounds exciting! To create the perfect itinerary, I need a few more details:\n\n• What's your budget range?\n• How many days?\n• Traveling solo or with others?\n• Any specific interests? (food, adventure, culture, relaxation)",
          timestamp: new Date(),
        };
      }
    } else if (messageCount === 3) {
      // Second response - gather final details
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Excellent! I have enough information now. Let me create some personalized trip plans for you. This will take just a moment...",
        timestamp: new Date(),
      };
    } else if (messageCount === 5) {
      // Final response - redirect to plans
      setTimeout(() => {
        router.push('/ai-plans');
      }, 2000);
      
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "✨ Perfect! I've created 3 amazing trip plans tailored just for you. Taking you to your personalized recommendations now...",
        timestamp: new Date(),
      };
    }

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: "Got it! What else can you tell me about your preferences?",
      timestamp: new Date(),
    };
  };

  const handleStarterPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 shadow-md z-50 flex items-center justify-between px-10">
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

      {/* MAIN CHAT SECTION */}
      <div className="mt-20 min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          
          {/* Hero Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">AI-Powered Travel Planning</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Chat Your Way to the <span className="text-purple-600">Perfect Trip</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Just tell me what you're looking for, and I'll create personalized itineraries that match your style, budget, and interests
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            
            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter Prompts (show only if no user messages yet) */}
            {messages.filter(m => m.role === 'user').length === 0 && (
              <div className="px-6 pb-4 border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Try asking:</p>
                <div className="grid grid-cols-2 gap-2">
                  {STARTER_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleStarterPrompt(prompt.text)}
                      className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg text-left text-sm text-gray-700 hover:text-purple-700 transition-all group"
                    >
                      <span className="text-xl">{prompt.icon}</span>
                      <span className="font-medium">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your dream trip..."
                  className="flex-1 px-5 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Alternative Option */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-3">Prefer to browse on your own?</p>
            <button
              onClick={() => router.push('/browse/setup')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
            >
              <Compass className="w-5 h-5" />
              Browse Destinations Manually
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-10 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Chat With Our AI?</h2>
          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: <Sparkles className="w-8 h-8 text-purple-600" />, title: 'Natural Conversation', desc: 'Just talk like you would with a friend' },
              { icon: <MapPin className="w-8 h-8 text-purple-600" />, title: 'Smart Suggestions', desc: 'Get personalized recommendations instantly' },
              { icon: <DollarSign className="w-8 h-8 text-purple-600" />, title: 'Budget Aware', desc: 'Plans that fit your spending limits' },
              { icon: <Heart className="w-8 h-8 text-purple-600" />, title: 'Your Preferences', desc: 'Matches your interests and travel style' }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-3">{feature.icon}</div>
                <h4 className="text-base font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-10 text-sm">
        <p>&copy; 2025 TravelBuddy. All rights reserved. | 
          <a href="#privacy" className="text-purple-400 hover:text-purple-300 transition"> Privacy Policy</a> | 
          <a href="#terms" className="text-purple-400 hover:text-purple-300 transition"> Terms of Service</a> | 
          <a href="#contact" className="text-purple-400 hover:text-purple-300 transition"> Contact Us</a>
        </p>
      </footer>
    </>
  );
}
