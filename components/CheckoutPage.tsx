'use client';

import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-1000 flex items-center justify-between px-10">
        <Link href="/" className="text-2xl font-bold text-purple-600">TravelBuddy</Link>
        <nav className="flex gap-10 items-center">
          <a href="#about" className="text-sm font-medium text-gray-800 hover:text-purple-600">About</a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-800 hover:text-purple-600">How It Works</a>
          <a href="#trust" className="text-sm font-medium text-gray-800 hover:text-purple-600">Trust & Safety</a>
          <a href="#blog" className="text-sm font-medium text-gray-800 hover:text-purple-600">Blog</a>
          <a href="#contact" className="text-sm font-medium text-gray-800 hover:text-purple-600">Contact</a>
        </nav>

        <div className="flex gap-6 items-center">
          <Link href="/profile" className="flex items-center gap-4 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-semibold text-sm">JD</div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-gray-800 text-sm">John Doe</div>
              <div className="text-xs text-gray-500">Signed in</div>
            </div>
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-10">
          {/* HEADING */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Booking</h1>
            <p className="text-gray-600 text-sm">NYC Holiday Deluxe · Dec 15-22, 2025 · 7 nights</p>
          </div>

          {/* BOOKING FORM */}
          <div className="grid grid-cols-3 gap-8">
            {/* LEFT - FORM */}
            <div className="col-span-2 space-y-6">
              {/* TRAVELER DETAILS */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Traveler Details</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">First Name</label>
                      <input type="text" defaultValue="John" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-purple-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-purple-600" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                    <input type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-purple-600" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Phone</label>
                    <input type="tel" placeholder="+1 (555) 123-4567" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-purple-600" />
                  </div>
                </div>
              </div>

              {/* PAYMENT DETAILS */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Payment Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-purple-600" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-purple-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">CVV</label>
                      <input type="text" placeholder="123" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* TERMS */}
              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" defaultChecked className="mt-1 w-4 h-4 accent-purple-600" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms and conditions and have read the privacy policy
                </label>
              </div>

              {/* CTA BUTTONS */}
              <div className="space-y-3">
                <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                  Complete Booking
                </button>
                <button className="w-full py-3 border-2 border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition">
                  Save for Later
                </button>
              </div>
            </div>

            {/* RIGHT - ORDER SUMMARY */}
            <div>
              <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-28">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Flight:</span>
                    <span className="text-gray-800 font-semibold">$450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hotel (7 nights):</span>
                    <span className="text-gray-800 font-semibold">$1,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Activities & Tours:</span>
                    <span className="text-gray-800 font-semibold">$400</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Meals & Dining:</span>
                    <span className="text-gray-800 font-semibold">$350</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-purple-600">$2,400</span>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 text-sm">
                  <p className="text-gray-700 mb-2"><span className="font-semibold">Trip Details:</span></p>
                  <ul className="space-y-1 text-gray-600 text-xs">
                    <li>📍 New York City</li>
                    <li>📅 Dec 15-22, 2025</li>
                    <li>🌙 7 nights</li>
                    <li>👥 2 travelers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-10 text-sm mt-16">
        <p>&copy; 2025 TravelBuddy. All rights reserved. | 
          <a href="#privacy" className="text-purple-400 hover:text-red-400 transition"> Privacy Policy</a> | 
          <a href="#terms" className="text-purple-400 hover:text-red-400 transition"> Terms of Service</a> | 
          <a href="#contact" className="text-purple-400 hover:text-red-400 transition"> Contact Us</a>
        </p>
      </footer>
    </>
  );
}
