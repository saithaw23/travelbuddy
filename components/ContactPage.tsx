'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, HelpCircle } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Show loading toast
    const loadingToast = toast.loading('Sending your message...');
    
    // Simulate API call
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you within 24 hours.'
      });
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          <Link href="/contact" className="text-sm font-medium text-purple-600">Contact</Link>
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
            Get in Touch
          </h1>
          <p className="text-xl text-white text-opacity-95 drop-shadow max-w-3xl mx-auto">
            Have questions? Need help? Want to share feedback? We're here for you 24/7.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 dark:bg-gray-950 pb-16">
        <div className="max-w-6xl mx-auto px-10 -mt-10 relative z-20">
          
          {/* QUICK CONTACT OPTIONS */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <MessageCircle className="w-8 h-8 text-white" />,
                title: 'Live Chat',
                description: 'Chat with our AI assistant instantly',
                action: 'Start Chat',
                color: 'from-purple-600 to-purple-800'
              },
              {
                icon: <Mail className="w-8 h-8 text-white" />,
                title: 'Email Support',
                description: 'support@travelbuddy.com',
                action: 'Send Email',
                color: 'from-blue-600 to-blue-800'
              },
              {
                icon: <Phone className="w-8 h-8 text-white" />,
                title: 'Phone Support',
                description: '+1 (555) 123-4567',
                action: 'Call Now',
                color: 'from-green-600 to-green-800'
              }
            ].map((option, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mx-auto mb-4`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{option.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{option.description}</p>
                <button className="px-6 py-2 bg-gray-100 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                  {option.action}
                </button>
              </div>
            ))}
          </div>

          {/* CONTACT FORM & INFO */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            
            {/* FORM */}
            <div className="col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Send Us a Message</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Message sent successfully!</p>
                    <p className="text-sm text-green-600">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="booking">Booking Issue</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-6">
              
              {/* OFFICE INFO */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:support@travelbuddy.com" className="text-purple-600 hover:text-purple-700">
                        support@travelbuddy.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <a href="tel:+15551234567" className="text-purple-600 hover:text-purple-700">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Office</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        123 Innovation Drive<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* HOURS */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Support Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">AI Chat Support</span>
                    <span className="font-semibold text-gray-900">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Email Support</span>
                    <span className="font-semibold text-gray-900">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Phone Support</span>
                    <span className="font-semibold text-gray-900">9AM - 9PM PST</span>
                  </div>
                </div>
              </div>

              {/* FAQ LINK */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <HelpCircle className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Need Quick Answers?</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Check our FAQ section for instant answers to common questions.
                </p>
                <Link href="/how-it-works" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all text-sm">
                  View FAQ
                </Link>
              </div>

            </div>
          </div>

          {/* DEPARTMENTS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Contact by Department</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  title: 'Customer Support',
                  email: 'support@travelbuddy.com',
                  description: 'Booking issues, account help, general questions'
                },
                {
                  title: 'Technical Support',
                  email: 'tech@travelbuddy.com',
                  description: 'App issues, bugs, technical problems'
                },
                {
                  title: 'Partnerships',
                  email: 'partners@travelbuddy.com',
                  description: 'Business inquiries, collaborations'
                },
                {
                  title: 'Press & Media',
                  email: 'press@travelbuddy.com',
                  description: 'Media inquiries, press releases'
                },
                {
                  title: 'Security',
                  email: 'security@travelbuddy.com',
                  description: 'Security issues, vulnerability reports'
                },
                {
                  title: 'Careers',
                  email: 'careers@travelbuddy.com',
                  description: 'Job opportunities, applications'
                }
              ].map((dept, idx) => (
                <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 transition-all">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{dept.title}</h3>
                  <a href={`mailto:${dept.email}`} className="text-purple-600 hover:text-purple-700 text-sm font-semibold block mb-2">
                    {dept.email}
                  </a>
                  <p className="text-sm text-gray-600">{dept.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SOCIAL MEDIA */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Follow Us on Social Media</h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Stay updated with travel tips, product updates, and special offers.
            </p>
            <div className="flex gap-4 justify-center">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((platform, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-12 h-12 bg-white dark:bg-gray-800 bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
                >
                  <span className="text-xl">{platform[0]}</span>
                </a>
              ))}
            </div>
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
