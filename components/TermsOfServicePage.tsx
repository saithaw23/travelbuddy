'use client';

import Link from 'next/link';
import { Shield, FileText, CreditCard, AlertCircle, Scale, Users } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function TermsOfServicePage() {
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
            <FileText className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">Legal Agreement</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Terms of Service
          </h1>
          <p className="text-xl text-white text-opacity-95 drop-shadow">
            Last Updated: February 8, 2026
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 dark:bg-gray-950 pb-16">
        <div className="max-w-4xl mx-auto px-10 -mt-10 relative z-20">
          
          {/* INTRODUCTION */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Agreement to Terms</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Welcome to TravelBuddy! These Terms of Service ("Terms") govern your access to and use of TravelBuddy's website, mobile applications, and services (collectively, the "Services").
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms and our <Link href="/privacy-policy" className="text-purple-600 font-semibold hover:underline">Privacy Policy</Link>. If you do not agree to these Terms, please do not use our Services.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mt-6">
                <p className="font-semibold text-purple-900">
                  IMPORTANT: These Terms contain an arbitration clause and class action waiver. Please read Section 9 carefully.
                </p>
              </div>
            </div>
          </div>

          {/* USER ACCOUNTS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">1. User Accounts</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-bold text-gray-900">1.1 Account Creation</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must be at least 13 years old to create an account</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>One account per person; no account sharing</li>
                <li>You must notify us immediately of any unauthorized access</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6">1.2 Account Responsibilities</h3>
              <p>You are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All activities that occur under your account</li>
                <li>Keeping your password secure and confidential</li>
                <li>Updating your account information when it changes</li>
                <li>Complying with all applicable laws and regulations</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6">1.3 Account Termination</h3>
              <p>We may suspend or terminate your account if you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate these Terms</li>
                <li>Engage in fraudulent activity</li>
                <li>Provide false information</li>
                <li>Abuse or harass other users or our staff</li>
              </ul>
            </div>
          </div>

          {/* BOOKING TERMS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">2. Booking & Payment Terms</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">2.1 Bookings</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>All bookings are subject to availability</li>
                  <li>Prices may change until booking is confirmed</li>
                  <li>Confirmation email constitutes a binding contract</li>
                  <li>You must provide accurate traveler information</li>
                  <li>Special requests are not guaranteed</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">2.2 Pricing</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>All prices displayed in USD unless otherwise specified</li>
                  <li>Prices include all mandatory taxes and fees</li>
                  <li>Currency conversion rates may apply</li>
                  <li>We reserve the right to correct pricing errors</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">2.3 Payment</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Payment processed securely via Stripe</li>
                  <li>Full payment required at time of booking</li>
                  <li>We accept major credit cards and debit cards</li>
                  <li>Payment authorization may be required</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">2.4 Cancellations & Refunds</h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                  <p className="text-gray-700">
                    <strong>Important:</strong> Cancellation policies vary by vendor (airline, hotel, restaurant). Please review the specific cancellation policy for each booking before confirming.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-4">
                  <li>Refunds processed within 5-10 business days</li>
                  <li>Cancellation fees may apply</li>
                  <li>Non-refundable bookings clearly marked</li>
                  <li>Contact support for cancellation assistance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* USER CONDUCT */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">3. User Conduct & Prohibited Activities</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>You agree NOT to:</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Make fraudulent bookings or payments',
                  'Use stolen credit cards or payment methods',
                  'Harass, abuse, or threaten other users',
                  'Post spam, malware, or malicious content',
                  'Attempt unauthorized access to our systems',
                  'Scrape or copy our content without permission',
                  'Impersonate others or create fake accounts',
                  'Violate any applicable laws or regulations',
                  'Interfere with our Services or servers',
                  'Use bots or automated tools',
                  'Share your account credentials',
                  'Reverse engineer our software'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-red-600 font-bold">✗</span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* INTELLECTUAL PROPERTY */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">4. Intellectual Property</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-bold text-gray-900">4.1 Our Content</h3>
              <p>
                All content on TravelBuddy (text, graphics, logos, software, AI models) is owned by TravelBuddy, Inc. and protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6">4.2 User Content</h3>
              <p>By posting content (reviews, photos, comments), you grant us a worldwide, non-exclusive, royalty-free license to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Display, reproduce, and distribute your content</li>
                <li>Use your content to improve our Services</li>
                <li>Create derivative works for promotional purposes</li>
              </ul>
              <p className="mt-4">You retain ownership of your content and can delete it anytime.</p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6">4.3 Trademarks</h3>
              <p>
                "TravelBuddy" and our logo are registered trademarks. You may not use our trademarks without written permission.
              </p>
            </div>
          </div>

          {/* LIABILITY */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">5. Disclaimers & Limitation of Liability</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-900 mb-3">5.1 Service "AS IS"</h3>
                <p className="text-gray-800">
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE UNINTERRUPTED, ERROR-FREE, OR SECURE ACCESS.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">5.2 Third-Party Services</h3>
                <p className="text-gray-700">
                  We are not responsible for services provided by airlines, hotels, restaurants, or other third-party vendors. Complaints should be directed to the vendor.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">5.3 AI Recommendations</h3>
                <p className="text-gray-700">
                  Our AI provides recommendations based on available data. We do not guarantee accuracy, suitability, or satisfaction with AI-generated suggestions.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-900 mb-3">5.4 Limitation of Liability</h3>
                <p className="text-gray-800 dark:text-gray-200 mb-3">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRAVELBUDDY SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 ml-4">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Lost profits, data, or business opportunities</li>
                  <li>Damages exceeding the amount you paid us in the past 12 months</li>
                  <li>Acts of third-party vendors or service providers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* DISPUTE RESOLUTION */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">6. Dispute Resolution & Arbitration</h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border-2 border-yellow-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-900 mb-3">IMPORTANT: Please Read Carefully</h3>
                <p className="text-gray-800">
                  This section affects your legal rights. It requires you to arbitrate disputes and limits your ability to bring class actions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">6.1 Informal Resolution</h3>
                <p className="text-gray-700">
                  Before filing a claim, you agree to contact us at <a href="mailto:legal@travelbuddy.com" className="text-purple-600 font-semibold">legal@travelbuddy.com</a> to attempt informal resolution. We'll try to resolve disputes within 60 days.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">6.2 Binding Arbitration</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  If informal resolution fails, disputes will be resolved through binding arbitration under the American Arbitration Association (AAA) rules.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Arbitration conducted in San Francisco, CA (or your location for claims under $10,000)</li>
                  <li>Arbitrator's decision is final and binding</li>
                  <li>Limited appeal rights</li>
                  <li>We pay arbitration fees for claims under $10,000</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-900 mb-3">6.3 Class Action Waiver</h3>
                <p className="text-gray-800">
                  YOU AND TRAVELBUDDY AGREE THAT DISPUTES WILL BE RESOLVED ON AN INDIVIDUAL BASIS ONLY. YOU WAIVE YOUR RIGHT TO PARTICIPATE IN CLASS ACTIONS, CLASS ARBITRATIONS, OR REPRESENTATIVE ACTIONS.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">6.4 Exceptions</h3>
                <p className="text-gray-700">
                  Either party may bring claims in small claims court or seek injunctive relief for intellectual property violations.
                </p>
              </div>
            </div>
          </div>

          {/* GOVERNING LAW */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">7. Governing Law & Jurisdiction</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.
              </p>
              <p>
                Any disputes not subject to arbitration shall be brought exclusively in the state or federal courts located in San Francisco County, California.
              </p>
            </div>
          </div>

          {/* CHANGES TO TERMS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">8. Changes to Terms</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We may update these Terms from time to time. We will notify you of material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Posting the updated Terms with a new "Last Updated" date</li>
                <li>Sending an email notification to your registered email</li>
                <li>Displaying a prominent notice on our website</li>
              </ul>
              <p>
                Your continued use of our Services after changes become effective constitutes acceptance of the updated Terms.
              </p>
            </div>
          </div>

          {/* CONTACT */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">9. Contact Information</h2>
            <div className="space-y-4">
              <p>Questions about these Terms? Contact us:</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">Email</h4>
                  <a href="mailto:legal@travelbuddy.com" className="text-purple-100 hover:text-white">legal@travelbuddy.com</a>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Mail</h4>
                  <p className="text-purple-100">
                    TravelBuddy, Inc.<br />
                    Legal Department<br />
                    123 Innovation Drive<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* OTHER LEGAL DOCS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Related Legal Documents</h3>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/privacy-policy" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all">
                Privacy Policy
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
