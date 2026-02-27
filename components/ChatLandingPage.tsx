'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Compass, MapPin, DollarSign, Users, Heart, CheckCircle2 } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';
import { getVerifiedContext } from '@/lib/useTripData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const STARTER_PROMPTS = [
  { icon: '🏖️', text: 'Weekend getaway under $1000' },
  { icon: '🎭', text: 'Cultural trip to Asia' },
  { icon: '👨‍👩‍👧‍👦', text: 'Family vacation with kids' },
  { icon: '🌄', text: 'Adventure trip for thrill seekers' },
  { icon: '💑', text: 'Romantic getaway for two' },
  { icon: '🍜', text: 'Food tour across Europe' },
];

const CONFIRM_KEYWORDS = ['confirm', 'confirmed', 'go ahead', "that's it", "that's all", 'finalize', 'looks good', 'proceed'];

function isConfirmMessage(msg: string): boolean {
  const lower = msg.toLowerCase().trim();
  return CONFIRM_KEYWORDS.some(kw => lower === kw || lower.startsWith(kw + ' ') || lower.endsWith(' ' + kw));
}

export default function ChatLandingPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(() => {
    // Build initial greeting — may be enhanced with landing form prefs
    const verifiedCtx = getVerifiedContext();
    let openingContent = `Hi! I'm your AI travel assistant 🌍 Tell me about your dream trip and I'll help you plan it perfectly.\n\n🛡️ ${verifiedCtx}`;

    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('landingPreferences');
        if (stored) {
          const prefs = JSON.parse(stored);
          sessionStorage.removeItem('landingPreferences'); // consume it once
          const parts: string[] = [];
          if (prefs.destination) parts.push(`going to **${prefs.destination}**`);
          if (prefs.fromDate && prefs.toDate) parts.push(`traveling ${prefs.fromDate} → ${prefs.toDate}`);
          if (prefs.travelers > 1) parts.push(`with ${prefs.travelers} travelers`);
          if (prefs.budget) parts.push(`budget of ${prefs.budget}`);
          if (parts.length > 0) {
            openingContent = `Hi! I can see you're interested in ${parts.join(', ')}. I'm your AI travel assistant — let's refine this into the perfect trip! 🌍\n\nTell me more: what kind of experience are you looking for? (e.g., adventure, relaxation, food, culture...)`;
          }
        }
      } catch { /* ignore */ }
    }

    return [{
      id: '1',
      role: 'assistant',
      content: openingContent,
      timestamp: new Date(),
    }];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [hasUserMessages, setHasUserMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg]);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isTyping || isSummarizing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setHasUserMessages(true);

    if (isConfirmMessage(message)) {
      await handleConfirm(updatedMessages);
      return;
    }

    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          conversationHistory: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        addMessage({
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        });
      } else {
        addMessage({
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date(),
        });
      }
    } catch {
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleConfirm = async (currentMessages: Message[]) => {
    setIsSummarizing(true);

    addMessage({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: "✨ Perfect! Let me put together a summary of your travel preferences and create some personalized plans just for you...",
      timestamp: new Date(),
    });

    try {
      const response = await fetch('/api/chat/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationHistory: currentMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem('travelPreferences', JSON.stringify(data.preferences));
        sessionStorage.setItem('aiPlans', JSON.stringify(data.plans));

        addMessage({
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: `🗺️ **Here's what I've got for you:**\n\n${data.preferences.conversationSummary}\n\nI've created **3 personalized trip plans** tailored to your preferences. Taking you there now...`,
          timestamp: new Date(),
        });

        setTimeout(() => {
          router.push('/ai-plans');
        }, 2500);
      } else {
        addMessage({
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: "I had trouble generating your plans. Could you tell me a bit more and try confirming again?",
          timestamp: new Date(),
        });
        setIsSummarizing(false);
      }
    } catch {
      addMessage({
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: "Something went wrong generating your plans. Please try again.",
        timestamp: new Date(),
      });
      setIsSummarizing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const isLoading = isTyping || isSummarizing;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">

      {/* HEADER */}
      <header className="shrink-0 h-16 bg-white dark:bg-gray-900 shadow-sm z-50 flex items-center justify-between px-8 border-b border-gray-100 dark:border-gray-800">
        <Link href="/" className="text-xl font-bold text-purple-600">TravelBuddy</Link>
        <nav className="flex gap-8 items-center">
          <Link href="/about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600">About</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600">How It Works</Link>
          <Link href="/trust-safety" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600">Trust &amp; Safety</Link>
          <Link href="/blog" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600">Blog</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600">Contact</Link>
        </nav>
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Link href="/profile" className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-semibold text-xs">JD</div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-xs">John Doe</div>
              <div className="text-[10px] text-gray-500">Signed in</div>
            </div>
          </Link>
        </div>
      </header>

      {/* BODY — fills remaining height */}
      <div className="flex flex-1 min-h-0 gap-0">

        {/* LEFT PANEL — branding strip */}
        <div className="hidden lg:flex flex-col justify-center px-10 w-72 shrink-0 bg-gradient-to-b from-purple-600 to-purple-800 text-white">
          <div className="mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2 leading-snug">
              Chat Your Way to the<br />
              <span className="text-purple-200">Perfect Trip</span>
            </h1>
            <p className="text-sm text-purple-100 leading-relaxed">
              Tell me what you&apos;re dreaming of and I&apos;ll create personalized itineraries just for you.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            {[
              { icon: <MapPin className="w-4 h-4" />, label: 'Smart destination matching' },
              { icon: <DollarSign className="w-4 h-4" />, label: 'Budget-aware planning' },
              { icon: <Users className="w-4 h-4" />, label: 'Group & solo trips' },
              { icon: <Heart className="w-4 h-4" />, label: 'Personalized to your style' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-purple-100">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-purple-500">
            <p className="text-xs text-purple-200 mb-3">Prefer manual browsing?</p>
            <button
              onClick={() => router.push('/browse/setup')}
              className="flex items-center gap-2 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg transition w-full"
            >
              <Compass className="w-4 h-4" />
              Browse Destinations
            </button>
          </div>
        </div>

        {/* CHAT PANEL */}
        <div className="flex flex-col flex-1 min-h-0">

          {/* Page title bar */}
          <div className="shrink-0 flex items-center gap-2 px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">AI-Powered Travel Planning</span>
            <span className="ml-auto text-xs text-gray-400">Powered by Groq</span>
          </div>

          {/* Messages — scrollable */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[76%] rounded-2xl px-4 py-3 ${message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm'
                    }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-[11px] font-semibold text-purple-600">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-gray-500">
                      {isSummarizing ? 'Creating your personalized plans...' : 'AI is thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* STARTER PROMPTS */}
          {!hasUserMessages && (
            <div className="shrink-0 px-5 pb-2">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt.text)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 border border-gray-200 dark:border-gray-700 hover:border-purple-300 rounded-full text-xs text-gray-600 dark:text-gray-300 hover:text-purple-700 transition-all"
                  >
                    <span>{prompt.icon}</span>
                    <span className="font-medium">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CONFIRM HINT */}
          {hasUserMessages && !isSummarizing && (
            <div className="shrink-0 px-5 pb-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg px-4 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>
                  Happy with your trip details? Type <strong className="text-purple-600">&quot;confirm&quot;</strong> to generate your personalized travel plans!
                </span>
              </div>
            </div>
          )}

          {/* INPUT */}
          <form onSubmit={handleSubmit} className="shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isSummarizing ? 'Generating your plans...' : 'Describe your dream trip...'}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
