'use client';

import Link from 'next/link';
import { Cookie, Settings, Eye, Shield } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function CookiePolicyPage() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full mb-6">
            <Cookie className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">Cookie Information</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Cookie Policy
          </h1>
          <p className="text-xl text-white text-opacity-95 drop-shadow">
            Last Updated: February 8, 2026
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 pb-16">
        <div className="max-w-4xl mx-auto px-10 -mt-10 relative z-20">
          
          {/* WHAT ARE COOKIES */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">What Are Cookies?</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit websites. They help websites remember your preferences, improve your experience, and provide analytics to website owners.
              </p>
              <p>
                TravelBuddy uses cookies and similar tracking technologies (web beacons, pixels, local storage) to enhance your experience and understand how you use our Services.
              </p>
            </div>
          </div>

          {/* TYPES OF COOKIES */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              {/* ESSENTIAL COOKIES */}
              <div className="border-l-4 border-green-600 pl-6 bg-green-50 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  Essential Cookies (Required)
                </h3>
                <p className="text-gray-700 mb-4">
                  These cookies are necessary for our website to function. They cannot be disabled.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white">
                      <tr>
                        <th className="text-left p-3 font-bold">Cookie Name</th>
                        <th className="text-left p-3 font-bold">Purpose</th>
                        <th className="text-left p-3 font-bold">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">session_id</td>
                        <td className="p-3">Maintains your login session</td>
                        <td className="p-3">Session</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">csrf_token</td>
                        <td className="p-3">Security protection against attacks</td>
                        <td className="p-3">Session</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">cookie_consent</td>
                        <td className="p-3">Remembers your cookie preferences</td>
                        <td className="p-3">1 year</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">load_balancer</td>
                        <td className="p-3">Routes requests to correct server</td>
                        <td className="p-3">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ANALYTICS COOKIES */}
              <div className="border-l-4 border-blue-600 pl-6 bg-blue-50 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-blue-600" />
                  Analytics Cookies (Optional)
                </h3>
                <p className="text-gray-700 mb-4">
                  Help us understand how visitors use our website. You can disable these.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white">
                      <tr>
                        <th className="text-left p-3 font-bold">Cookie Name</th>
                        <th className="text-left p-3 font-bold">Purpose</th>
                        <th className="text-left p-3 font-bold">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">_ga</td>
                        <td className="p-3">Google Analytics - distinguishes users</td>
                        <td className="p-3">2 years</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">_gid</td>
                        <td className="p-3">Google Analytics - distinguishes users</td>
                        <td className="p-3">24 hours</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">_gat</td>
                        <td className="p-3">Google Analytics - throttles requests</td>
                        <td className="p-3">1 minute</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">amplitude_id</td>
                        <td className="p-3">Amplitude - user behavior analytics</td>
                        <td className="p-3">10 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MARKETING COOKIES */}
              <div className="border-l-4 border-purple-600 pl-6 bg-purple-50 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-purple-600" />
                  Marketing Cookies (Optional)
                </h3>
                <p className="text-gray-700 mb-4">
                  Used to personalize ads and measure campaign effectiveness. You can disable these.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white">
                      <tr>
                        <th className="text-left p-3 font-bold">Cookie Name</th>
                        <th className="text-left p-3 font-bold">Purpose</th>
                        <th className="text-left p-3 font-bold">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">_fbp</td>
                        <td className="p-3">Facebook Pixel - ad targeting</td>
                        <td className="p-3">90 days</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">ads_id</td>
                        <td className="p-3">Ad personalization and tracking</td>
                        <td className="p-3">1 year</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">_gcl_au</td>
                        <td className="p-3">Google Ads - conversion tracking</td>
                        <td className="p-3">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* HOW TO MANAGE COOKIES */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Manage Cookies</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cookie Consent Tool</h3>
                <p className="text-gray-700 mb-4">
                  When you first visit TravelBuddy, you'll see a cookie banner. You can customize your preferences by clicking "Cookie Settings."
                </p>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all">
                  Manage Cookie Preferences
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Browser Settings</h3>
                <p className="text-gray-700 mb-4">
                  You can also control cookies through your browser settings:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { browser: 'Google Chrome', path: 'Settings > Privacy and security > Cookies and other site data' },
                    { browser: 'Mozilla Firefox', path: 'Options > Privacy & Security > Cookies and Site Data' },
                    { browser: 'Safari', path: 'Preferences > Privacy > Cookies and website data' },
                    { browser: 'Microsoft Edge', path: 'Settings > Cookies and site permissions > Cookies and site data' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2">{item.browser}</h4>
                      <p className="text-sm text-gray-600">{item.path}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                <p className="text-sm text-gray-800">
                  <strong>Note:</strong> Disabling essential cookies may prevent you from using certain features of our website, such as logging in or making bookings.
                </p>
              </div>
            </div>
          </div>

          {/* THIRD-PARTY COOKIES */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Third-Party Cookies</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We use services from third-party companies that may set their own cookies:
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'Google Analytics', purpose: 'Website analytics and user behavior tracking' },
                  { name: 'Stripe', purpose: 'Secure payment processing' },
                  { name: 'Facebook Pixel', purpose: 'Ad targeting and conversion tracking' },
                  { name: 'OpenAI', purpose: 'AI chat functionality' },
                  { name: 'Amplitude', purpose: 'Product analytics and insights' },
                  { name: 'SendGrid', purpose: 'Email delivery tracking' }
                ].map((service, idx) => (
                  <div key={idx} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                    <p className="text-sm text-gray-600">{service.purpose}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4">
                These third parties have their own privacy policies. We recommend reviewing them:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Google Privacy Policy</a></li>
                <li><a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Stripe Privacy Policy</a></li>
                <li><a href="https://www.facebook.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Facebook Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* DO NOT TRACK */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Do Not Track Signals</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Some browsers have a "Do Not Track" (DNT) feature that signals websites you don't want to be tracked. Currently, there is no industry standard for how to respond to DNT signals.
              </p>
              <p>
                TravelBuddy respects your privacy choices. When you disable optional cookies through our cookie consent tool, we will not use those cookies regardless of DNT settings.
              </p>
            </div>
          </div>

          {/* UPDATES */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Updates to This Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.
              </p>
              <p>
                We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </div>
          </div>

          {/* CONTACT */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">Questions About Cookies?</h2>
            <p className="mb-6">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="flex gap-8">
              <div>
                <h4 className="font-bold mb-2">Email</h4>
                <a href="mailto:privacy@travelbuddy.com" className="text-purple-100 hover:text-white">privacy@travelbuddy.com</a>
              </div>
              <div>
                <h4 className="font-bold mb-2">Mail</h4>
                <p className="text-purple-100">
                  TravelBuddy, Inc.<br />
                  123 Innovation Drive<br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>

          {/* OTHER LEGAL DOCS */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Legal Documents</h3>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/privacy-policy" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all">
                Terms of Service
              </Link>
              <Link href="/data-processing" className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all">
                Data Processing Agreement
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-10 text-sm">
        <p>&copy; 2026 TravelBuddy. All rights reserved. | 
          <Link href="/privacy-policy" className="text-purple-400 hover:text-purple-300 transition"> Privacy Policy</Link> | 
          <Link href="/terms-of-service" className="text-purple-400 hover:text-purple-300 transition"> Terms of Service</Link> | 
          <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition"> Contact Us</Link>
        </p>
      </footer>
    </>
  );
}
