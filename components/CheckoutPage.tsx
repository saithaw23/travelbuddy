'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check, CreditCard, Save, ArrowLeft, Star } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [termsAccepted, setTermsAccepted] = useState(true);

  const bookingItems = [
    { id: 'flight', name: 'Flight to NYC', type: 'Flight' },
    { id: 'hotel', name: 'The Plaza Hotel', type: 'Hotel' },
    { id: 'activity1', name: 'Statue of Liberty Tour', type: 'Activity' },
    { id: 'restaurant1', name: 'Le Bernardin', type: 'Restaurant' },
  ];

  const handleCompleteBooking = () => {
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions to continue');
      return;
    }
    setIsProcessing(true);
    
    const loadingToast = toast.loading('Processing your booking...');
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setBookingComplete(true);
      toast.dismiss(loadingToast);
      toast.success('Booking confirmed!', {
        description: 'Check your email for confirmation details'
      });
      // Show rating modal after successful booking
      setTimeout(() => {
        setShowRatingModal(true);
      }, 1500);
    }, 2000);
  };

  const handleSaveForLater = () => {
    toast.success('Booking saved!', {
      description: 'You can find it in My Plans'
    });
    router.push('/my-plans');
  };

  const handleRatingSubmit = () => {
    setShowRatingModal(false);
    toast.success('Thank you for your ratings!', {
      description: 'Your feedback helps other travelers'
    });
    router.push('/profile');
  };

  const setItemRating = (itemId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [itemId]: rating }));
  };

  if (bookingComplete && !showRatingModal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 text-center max-w-md shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your NYC Holiday Deluxe trip is booked. Check your email for confirmation details.</p>
          <p className="text-sm text-gray-500">Preparing your rating form...</p>
        </div>
      </div>
    );
  }

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
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-purple-600" 
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms and conditions and have read the privacy policy
                </label>
              </div>

              {/* CTA BUTTONS */}
              <div className="space-y-3">
                <button 
                  type="button"
                  onClick={handleCompleteBooking}
                  disabled={isProcessing}
                  className={`w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Complete Booking
                    </>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={handleSaveForLater}
                  className="w-full py-3 border-2 border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
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

      {/* RATING MODAL - Shown after successful booking */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-500" fill="#FACC15" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Rate Your Experience</h2>
              <p className="text-sm text-gray-600">Help other travelers by rating the places in your trip!</p>
            </div>

            <div className="space-y-4 mb-6">
              {bookingItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setItemRating(item.id, star)}
                        className="p-1 hover:scale-110 transition"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            (ratings[item.id] || 0) >= star
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                          }`}
                          fill={(ratings[item.id] || 0) >= star ? '#FACC15' : 'none'}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-500 self-center">
                      {ratings[item.id] ? `${ratings[item.id]}/5` : 'Not rated'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowRatingModal(false);
                  router.push('/profile');
                }}
                className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={handleRatingSubmit}
                className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Submit Ratings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
