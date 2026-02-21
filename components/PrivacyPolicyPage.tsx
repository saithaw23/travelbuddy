'use client';

import Link from 'next/link';
import { Shield, Eye, Lock, Database, UserCheck, FileText } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function PrivacyPolicyPage() {
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

      {/* HERO SECTION */}
      <section 
        className="mt-20 flex items-center justify-center text-center relative overflow-hidden pt-24 pb-20"
        style={{
          background: 'linear-gradient(135deg, #9333ea 0%, #a855f7 50%, #c084fc 100%)',
        }}
      >
        <div className="relative z-10 max-w-4xl px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 bg-opacity-20 rounded-full mb-6">
            <Shield className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">Legal Document</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-xl text-white text-opacity-95 drop-shadow">
            Last Updated: February 8, 2026
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 dark:bg-gray-950 pb-16">
        <div className="max-w-4xl mx-auto px-10 -mt-10 relative z-20">
          
          {/* QUICK LINKS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: 'Information We Collect', id: 'collect' },
                { title: 'How We Use Data', id: 'use' },
                { title: 'Data Sharing', id: 'sharing' },
                { title: 'Your Rights', id: 'rights' },
                { title: 'Data Security', id: 'security' },
                { title: 'Contact Us', id: 'contact' }
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={`#${link.id}`}
                  className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-semibold hover:bg-purple-100 transition-all text-center"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* INTRODUCTION */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Introduction</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Welcome to TravelBuddy. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, store, and protect your information when you use our AI-powered travel planning platform.
              </p>
              <p>
                This policy applies to all users of TravelBuddy's website, mobile applications, and related services (collectively, the "Services"). By using our Services, you agree to the collection and use of information in accordance with this policy.
              </p>
              <p className="font-semibold text-purple-600">
                TravelBuddy, Inc. is the data controller responsible for your personal data.
              </p>
            </div>
          </div>

          {/* INFORMATION WE COLLECT */}
          <div id="collect" className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">1. Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">1.1 Information You Provide</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li><strong>Account Information:</strong> Name, email address, password, phone number</li>
                  <li><strong>Profile Data:</strong> Travel preferences, interests, budget ranges, travel style</li>
                  <li><strong>Trip Information:</strong> Destinations, dates, traveler details, special requests</li>
                  <li><strong>Payment Information:</strong> Credit card details (processed securely by Stripe)</li>
                  <li><strong>Communications:</strong> Messages sent through our chat interface, support inquiries</li>
                  <li><strong>User Content:</strong> Reviews, comments, photos, and other content you share</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">1.2 Information Collected Automatically</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                  <li><strong>Usage Data:</strong> Pages visited, features used, time spent, click patterns</li>
                  <li><strong>Location Data:</strong> Approximate location based on IP address (with your consent for precise location)</li>
                  <li><strong>Cookies & Tracking:</strong> Session data, preferences, analytics information</li>
                  <li><strong>AI Interactions:</strong> Conversation history with our AI assistant</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">1.3 Information from Third Parties</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li><strong>Social Media:</strong> Profile information if you sign in via Google, Facebook, or other OAuth providers</li>
                  <li><strong>Travel Partners:</strong> Booking confirmations, flight status, hotel reservations</li>
                  <li><strong>Payment Processors:</strong> Transaction status and payment verification</li>
                </ul>
              </div>
            </div>
          </div>

          {/* HOW WE USE DATA */}
          <div id="use" className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">2. How We Use Your Data</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">We use your personal data for the following purposes:</p>
              
              <div className="space-y-3">
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Provide Our Services</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Create and manage your account, process bookings, generate AI recommendations, facilitate group collaboration</p>
                </div>
                
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Personalization</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Tailor trip recommendations based on your preferences, past trips, and behavior patterns</p>
                </div>
                
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Communication</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Send booking confirmations, trip updates, customer support responses, and service announcements</p>
                </div>
                
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Improve Our Services</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Analyze usage patterns, test new features, train our AI models, fix bugs and technical issues</p>
                </div>
                
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Security & Fraud Prevention</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Detect and prevent fraudulent transactions, protect against security threats, verify user identity</p>
                </div>
                
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Legal Compliance</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Comply with legal obligations, respond to law enforcement requests, enforce our terms of service</p>
                </div>
                
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Marketing (With Your Consent)</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Send promotional emails, travel deals, and personalized offers (you can opt out anytime)</p>
                </div>
              </div>
            </div>
          </div>

          {/* DATA SHARING */}
          <div id="sharing" className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">3. How We Share Your Data</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p className="font-semibold text-purple-600">We do not sell your personal data to third parties.</p>
              
              <p>We may share your information with:</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Service Providers</h4>
                  <p className="text-sm">Third-party companies that help us operate our Services:</p>
                  <ul className="list-disc list-inside text-sm ml-4 mt-2 space-y-1">
                    <li>Payment processors (Stripe) for secure transactions</li>
                    <li>Cloud hosting providers (AWS, Vercel) for data storage</li>
                    <li>AI providers (OpenAI, Anthropic) for chat functionality</li>
                    <li>Email service providers for communications</li>
                    <li>Analytics providers for usage insights</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Travel Partners</h4>
                  <p className="text-sm">Airlines, hotels, and restaurants to complete your bookings. We only share information necessary for reservations.</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Group Collaborators</h4>
                  <p className="text-sm">Other users you invite to collaborate on trip planning can see shared trip details, comments, and votes.</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Legal Requirements</h4>
                  <p className="text-sm">Law enforcement, government agencies, or courts when required by law or to protect our rights and safety.</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Business Transfers</h4>
                  <p className="text-sm">In the event of a merger, acquisition, or sale of assets, your data may be transferred to the new entity.</p>
                </div>
              </div>
            </div>
          </div>

          {/* YOUR RIGHTS */}
          <div id="rights" className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">4. Your Privacy Rights</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">Depending on your location, you have the following rights:</p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: 'Access',
                    description: 'Request a copy of all personal data we hold about you'
                  },
                  {
                    title: 'Correction',
                    description: 'Update or correct inaccurate information'
                  },
                  {
                    title: 'Deletion',
                    description: 'Request deletion of your personal data (right to be forgotten)'
                  },
                  {
                    title: 'Portability',
                    description: 'Receive your data in a machine-readable format'
                  },
                  {
                    title: 'Restriction',
                    description: 'Limit how we process your data'
                  },
                  {
                    title: 'Objection',
                    description: 'Object to processing based on legitimate interests'
                  },
                  {
                    title: 'Withdraw Consent',
                    description: 'Revoke consent for data processing at any time'
                  },
                  {
                    title: 'Opt-Out',
                    description: 'Unsubscribe from marketing communications'
                  }
                ].map((right, idx) => (
                  <div key={idx} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{right.title}</h4>
                    <p className="text-sm text-gray-700">{right.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-purple-100 border-l-4 border-purple-600 p-4 mt-6">
                <p className="text-sm text-gray-800">
                  <strong>To exercise your rights:</strong> Email us at <a href="mailto:privacy@travelbuddy.com" className="text-purple-600 font-semibold">privacy@travelbuddy.com</a> or visit your account settings. We will respond within 30 days.
                </p>
              </div>
            </div>
          </div>

          {/* DATA SECURITY */}
          <div id="security" className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">5. Data Security & Retention</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Security Measures</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>256-bit SSL/TLS encryption for all data transmission</li>
                  <li>Encrypted data storage at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Two-factor authentication for account access</li>
                  <li>Employee access controls and confidentiality agreements</li>
                  <li>Automated threat detection and monitoring</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Data Retention</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">We retain your personal data for as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Provide our Services and maintain your account</li>
                  <li>Comply with legal obligations (e.g., tax records for 7 years)</li>
                  <li>Resolve disputes and enforce our agreements</li>
                  <li>Improve our Services through analytics</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  When you delete your account, we permanently remove your personal data within 30 days, except where retention is required by law.
                </p>
              </div>
            </div>
          </div>

          {/* COOKIES */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">6. Cookies & Tracking Technologies</h2>
            <div className="space-y-4 text-gray-700">
              <p>We use cookies and similar technologies to enhance your experience. See our <Link href="/cookie-policy" className="text-purple-600 font-semibold hover:underline">Cookie Policy</Link> for details.</p>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Essential Cookies</h4>
                  <p className="text-sm">Required for basic functionality (cannot be disabled)</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Analytics Cookies</h4>
                  <p className="text-sm">Help us understand usage patterns (can be disabled)</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Marketing Cookies</h4>
                  <p className="text-sm">Personalize ads and content (can be disabled)</p>
                </div>
              </div>
            </div>
          </div>

          {/* INTERNATIONAL TRANSFERS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">7. International Data Transfers</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                TravelBuddy operates globally. Your data may be transferred to and processed in countries other than your own, including the United States.
              </p>
              <p>
                We ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Standard Contractual Clauses approved by the European Commission</li>
                <li>Adequacy decisions for countries with equivalent data protection</li>
                <li>Privacy Shield certification (where applicable)</li>
              </ul>
            </div>
          </div>

          {/* CHILDREN'S PRIVACY */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">8. Children's Privacy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                TravelBuddy is not intended for children under 13 years of age. We do not knowingly collect personal data from children under 13.
              </p>
              <p>
                If you are a parent or guardian and believe your child has provided us with personal data, please contact us at <a href="mailto:privacy@travelbuddy.com" className="text-purple-600 font-semibold">privacy@travelbuddy.com</a> and we will delete it.
              </p>
            </div>
          </div>

          {/* CHANGES TO POLICY */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">9. Changes to This Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Posting the new policy on this page with an updated "Last Updated" date</li>
                <li>Sending an email notification to your registered email address</li>
                <li>Displaying a prominent notice on our website</li>
              </ul>
              <p>
                Your continued use of our Services after changes become effective constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>

          {/* CONTACT */}
          <div id="contact" className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">10. Contact Us</h2>
            <div className="space-y-4">
              <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">Email</h4>
                  <a href="mailto:privacy@travelbuddy.com" className="text-purple-100 hover:text-white">privacy@travelbuddy.com</a>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Mail</h4>
                  <p className="text-purple-100">
                    TravelBuddy, Inc.<br />
                    Attn: Privacy Officer<br />
                    123 Innovation Drive<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-purple-400">
                <h4 className="font-bold mb-2">Data Protection Officer (EU/UK)</h4>
                <a href="mailto:dpo@travelbuddy.com" className="text-purple-100 hover:text-white">dpo@travelbuddy.com</a>
              </div>
            </div>
          </div>

          {/* OTHER LEGAL DOCS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Related Legal Documents</h3>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/terms-of-service" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="px-6 py-3 bg-white dark:bg-gray-800 text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all">
                Cookie Policy
              </Link>
              <Link href="/data-processing" className="px-6 py-3 bg-white dark:bg-gray-800 text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all">
                Data Processing Agreement
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-center py-10 text-sm border-t border-gray-200 dark:border-gray-700 dark:border-gray-800">
        <p>&copy; 2026 TravelBuddy. All rights reserved. | 
          <Link href="/privacy-policy" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Privacy Policy</Link> | 
          <Link href="/terms-of-service" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Terms of Service</Link> | 
          <Link href="/contact" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Contact Us</Link>
        </p>
      </footer>
    </>
  );
}
