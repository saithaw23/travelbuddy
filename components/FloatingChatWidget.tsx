'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function FloatingChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! Need help with your trip planning? Ask me anything!",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Hide the widget on the home page and the dedicated chat page
  if (pathname === '/' || pathname === '/chat') {
    return null;
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
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
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.success ? data.response : "I'm having trouble right now. Try the main chat for help!",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Something went wrong. Try the main chat page!",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-purple-600 text-white rounded-full shadow-2xl hover:bg-purple-700 transition-all hover:scale-110 flex items-center justify-center z-50 group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Travel Assistant</h3>
            <p className="text-xs text-purple-100">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-purple-500 p-1.5 rounded-lg transition"
            aria-label="Minimize chat"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-purple-500 p-1.5 rounded-lg transition"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="h-[440px] overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 ${message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
