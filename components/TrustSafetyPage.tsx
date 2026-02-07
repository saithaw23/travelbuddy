'use client';

import Link from 'next/link';
import { Shield, Lock, Eye, UserCheck, CreditCard, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function TrustSafetyPage() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 shadow-md z-50 flex items-center justify-between px-10">
        <Link href="/" className="text-2xl font-bold text-purple-600">TravelBuddy</Link>
        <nav className="flex gap-10 items-center">
          <Link href="/about" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">About</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600">How It Works</Link>
          <Link href="/trust-safety" className="text-sm font-medium text-purple-600">Trust & Safety</Link>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full mb-6">
            <Shield className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">Your Safety is Our Priority</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Trust & Safety
          </h1>
          <p className="text-xl text-white text-opacity-95 drop-shadow max-w-3xl mx-auto">
            We're committed to protecting your data, securing your payments, and ensuring a safe travel planning experience.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 pb-16">
        <div className="max-w-6xl mx-auto px-10 -mt-10 relative z-20">
          
          {/* OUR COMMITMENT */}
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Commitment to You</h2>
            <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
              At TravelBuddy, trust isn't just a feature—it's the foundation of everything we do. We implement industry-leading security measures and transparent practices to protect your information and ensure peace of mind.
            </p>
          </div>

          {/* SECURITY MEASURES */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">How We Protect You</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Lock className="w-8 h-8 text-white" />,
                  title: 'Bank-Level Encryption',
                  description: 'All data transmitted between your device and our servers is encrypted using 256-bit SSL/TLS encryption—the same standard used by banks.',
                  color: 'from-purple-600 to-purple-800'
                },
                {
                  icon: <CreditCard className="w-8 h-8 text-white" />,
                  title: 'Secure Payments',
                  description: 'We use Stripe for payment processing. Your credit card information never touches our servers and is PCI-DSS compliant.',
                  color: 'from-blue-600 to-blue-800'
                },
                {
                  icon: <Eye className="w-8 h-8 text-white" />,
                  title: 'Privacy by Design',
                  description: 'We collect only the data necessary to provide our service. Your personal information is never sold to third parties.',
                  color: 'from-green-600 to-green-800'
                },
                {
                  icon: <UserCheck className="w-8 h-8 text-white" />,
                  title: 'Account Security',
                  description: 'Two-factor authentication, secure password requirements, and automatic logout protect your account from unauthorized access.',
                  color: 'from-orange-600 to-orange-800'
                },
                {
                  icon: <Shield className="w-8 h-8 text-white" />,
                  title: 'Regular Security Audits',
                  description: 'We conduct quarterly security audits and penetration testing to identify and fix vulnerabilities before they become issues.',
                  color: 'from-red-600 to-red-800'
                },
                {
                  icon: <AlertCircle className="w-8 h-8 text-white" />,
                  title: 'Fraud Detection',
                  description: 'Advanced AI monitors for suspicious activity and alerts you immediately if we detect anything unusual with your account.',
                  color: 'from-indigo-600 to-indigo-800'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DATA PRIVACY */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-12 mb-12 border border-purple-200">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Data, Your Control</h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <p><strong>What We Collect:</strong> Name, email, travel preferences, booking history, and payment information (processed securely by Stripe).</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <p><strong>How We Use It:</strong> To personalize your travel recommendations, process bookings, and improve our service. We never sell your data.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <p><strong>Your Rights:</strong> Access, download, or delete your data anytime. Request a copy of all information we have about you.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <p><strong>Data Retention:</strong> We keep your data only as long as necessary. Deleted accounts are permanently removed within 30 days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COMPLIANCE */}
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Compliance & Certifications</h2>
            <div className="grid grid-cols-3 gap-8">
              {[
                {
                  title: 'GDPR Compliant',
                  description: 'Full compliance with EU General Data Protection Regulation for European users.'
                },
                {
                  title: 'CCPA Compliant',
                  description: 'Adheres to California Consumer Privacy Act requirements for California residents.'
                },
                {
                  title: 'PCI-DSS Level 1',
                  description: 'Highest level of payment card industry security standards through Stripe.'
                },
                {
                  title: 'SOC 2 Type II',
                  description: 'Independently audited for security, availability, and confidentiality controls.'
                },
                {
                  title: 'ISO 27001',
                  description: 'International standard for information security management systems.'
                },
                {
                  title: 'HTTPS Everywhere',
                  description: 'All connections encrypted with TLS 1.3 for maximum security.'
                }
              ].map((cert, idx) => (
                <div key={idx} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SAFE TRAVEL PRACTICES */}
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Safe Travel Practices</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Vendors</h3>
                <p className="text-gray-700 leading-relaxed">
                  We partner only with reputable airlines, hotels, and service providers. All vendors are vetted for safety, reliability, and customer satisfaction.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Price Accuracy</h3>
                <p className="text-gray-700 leading-relaxed">
                  Prices are pulled directly from vendor APIs in real-time. What you see is what you pay—no bait-and-switch tactics.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Protection</h3>
                <p className="text-gray-700 leading-relaxed">
                  All bookings are confirmed directly with vendors. You receive official confirmation emails and booking references immediately.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our AI assistant and human support team are available around the clock to help with issues, changes, or emergencies during your trip.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Travel Advisories</h3>
                <p className="text-gray-700 leading-relaxed">
                  We monitor government travel advisories and alert you to any safety concerns for your destination before and during your trip.
                </p>
              </div>
            </div>
          </div>

          {/* TRANSPARENCY */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white mb-12">
            <h2 className="text-4xl font-bold mb-6 text-center">Our Transparency Promise</h2>
            <div className="max-w-4xl mx-auto space-y-4 text-lg">
              <p className="leading-relaxed">
                <strong>No Hidden Fees:</strong> Every price breakdown shows base fare, taxes, and all fees upfront. What you see is what you pay.
              </p>
              <p className="leading-relaxed">
                <strong>Clear Terms:</strong> Our terms of service and privacy policy are written in plain language, not legal jargon.
              </p>
              <p className="leading-relaxed">
                <strong>Open Communication:</strong> We notify you immediately of any changes to your booking, pricing, or our policies.
              </p>
              <p className="leading-relaxed">
                <strong>Honest AI:</strong> Our AI explains its recommendations and confidence levels. You always know why something is suggested.
              </p>
            </div>
          </div>

          {/* REPORT ISSUES */}
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Report a Security Issue</h2>
            <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
              If you discover a security vulnerability or have concerns about your account safety, please contact us immediately.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all shadow-lg">
                Contact Security Team
              </Link>
              <a href="mailto:security@travelbuddy.com" className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-all">
                security@travelbuddy.com
              </a>
            </div>
            <p className="text-sm text-gray-600 text-center mt-6">
              We take all security reports seriously and respond within 24 hours.
            </p>
          </div>

          {/* LEGAL DOCUMENTS */}
          <div className="bg-gray-100 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Legal Documents</h2>
            <div className="flex gap-6 justify-center flex-wrap">
              <Link href="/privacy-policy" className="px-6 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm border border-gray-200">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="px-6 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm border border-gray-200">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="px-6 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm border border-gray-200">
                Cookie Policy
              </Link>
              <Link href="/data-processing" className="px-6 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm border border-gray-200">
                Data Processing Agreement
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-6">Last updated: February 8, 2026</p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-10 text-sm">
        <p>&copy; 2026 TravelBuddy. All rights reserved. | 
          <Link href="/trust-safety" className="text-purple-400 hover:text-purple-300 transition"> Privacy Policy</Link> | 
          <Link href="/trust-safety" className="text-purple-400 hover:text-purple-300 transition"> Terms of Service</Link> | 
          <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition"> Contact Us</Link>
        </p>
      </footer>
    </>
  );
}
