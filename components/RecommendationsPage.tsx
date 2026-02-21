'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Clock3, ImageIcon, MapPin, MessageCircle, SendHorizonal, Sparkles, Star, Video } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';

export default function RecommendationsPage() {
  const router = useRouter();
  type VoteOption = 'yes' | 'no' | 'undecided';
  type ReviewType = 'text' | 'photo' | 'video';
  type Review = {
    id: string;
    user: string;
    initials: string;
    rating: number;
    type: ReviewType;
    content: string;
    timestamp: string;
    mediaLabel?: string;
  };

  const [activeCategory, setActiveCategory] = useState('flights');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const participants = [
    { id: 'owner', name: 'Krit (Owner)', initials: 'KR', role: 'Owner' },
    { id: 'amy', name: 'Amy Chen', initials: 'AC', role: 'Traveler' },
    { id: 'marco', name: 'Marco Li', initials: 'ML', role: 'Traveler' }
  ];
  const mediaFilters: Array<'all' | ReviewType> = ['all', 'text', 'photo', 'video'];
  const [userLocation, setUserLocation] = useState<{ city: string; lat: number; lng: number; accuracy: string } | null>(null);
  const [locationStatus, setLocationStatus] = useState('Detecting your location...');
  const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null);

  const categories = [
    { id: 'flights', label: 'Flights', count: 8 },
    { id: 'hotels', label: 'Hotels', count: 12 },
    { id: 'restaurants', label: 'Restaurants', count: 24 },
    { id: 'attractions', label: 'Attractions', count: 18 },
    { id: 'car-rentals', label: 'Car Rentals', count: 5 }
  ];

  const flights = [
    {
      id: 'flight1',
      route: 'LAX → NYC',
      time: '8:00 AM - Non-stop',
      duration: '5h 45m',
      price: '$450',
      matchScore: '95%',
      matchColor: 'green',
      coords: { lat: 40.6413, lng: -73.7781 },
      airport: 'JFK International'
    },
    {
      id: 'flight2',
      route: 'LAX → NYC',
      time: '2:30 PM - 1 stop',
      duration: '7h 20m',
      price: '$380',
      matchScore: '88%',
      matchColor: 'yellow',
      coords: { lat: 40.6895, lng: -74.1745 },
      airport: 'Newark Liberty'
    }
  ];

  const placeDetails: Record<string, {
    name: string;
    category: string;
    coords: { lat: number; lng: number };
    aiSummary: string;
    liveEssentials: { label: string; value: string }[];
    internetHighlights: string[];
  }> = {
    flight1: {
      name: 'JFK Morning Non-stop',
      category: 'Flight Option',
      coords: flights[0].coords,
      aiSummary: 'Best arrival window for maximizing Day 1. Weather delays historically low (<6%) for this slot.',
      liveEssentials: [
        { label: 'Terminal', value: 'T5 · JetBlue Mint' },
        { label: 'Baggage Claim ETA', value: '18 min avg' },
        { label: 'Crowd Level', value: 'Moderate' }
      ],
      internetHighlights: [
        'FlightAware reports 92% on-time performance this week.',
        'NYC DOT shows light traffic from JFK to Manhattan during 3-4 PM.'
      ]
    },
    flight2: {
      name: 'Evening Saver Flight',
      category: 'Flight Option',
      coords: flights[1].coords,
      aiSummary: 'Later departure eases workday wrap-up but increases arrival fatigue. 1-stop adds 40 mins buffer.',
      liveEssentials: [
        { label: 'Terminal', value: 'EWR Terminal C' },
        { label: 'Layover', value: 'Denver · 55 min' },
        { label: 'Crowd Level', value: 'High' }
      ],
      internetHighlights: [
        'Reddit r/travel reports occasional gate changes on this route—arrive early.',
        'Weather.gov indicates light snow chances after 9 PM on arrival date.'
      ]
    }
  };

  const initialReviews: Record<string, Review[]> = {
    flight1: [
      {
        id: 'r1',
        user: 'Amy Chen',
        initials: 'AC',
        rating: 4.8,
        type: 'text',
        content: 'Smooth flight, cabin felt fresh and the Mint seats were worth it. Landing around 3 PM made customs quick.',
        timestamp: 'Yesterday',
        mediaLabel: 'Verified traveler'
      },
      {
        id: 'r2',
        user: 'Marco Li',
        initials: 'ML',
        rating: 4.5,
        type: 'photo',
        content: 'Shared album: Gate view + lounge snacks. Security was only 10 minutes.',
        timestamp: '3 days ago',
        mediaLabel: '3 photos'
      }
    ],
    flight2: [
      {
        id: 'r3',
        user: 'Sasha Patel',
        initials: 'SP',
        rating: 4.0,
        type: 'video',
        content: 'Quick clip covering the Denver layover. Crowded but organized, plenty of charging spots.',
        timestamp: 'Last week',
        mediaLabel: '0:37 video'
      }
    ]
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserLocation({ city: 'Brooklyn, NY', lat: 40.6782, lng: -73.9442, accuracy: '±1.5 mi' });
      setLocationStatus('Personalizing results near Brooklyn, NY');
      setLocationPermission('granted');
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const [reviews, setReviews] = useState<Record<string, Review[]>>(initialReviews);
  const [activeMediaFilter, setActiveMediaFilter] = useState<'all' | ReviewType>('all');
  const [reviewForm, setReviewForm] = useState<{ text: string; mediaType: ReviewType }>({ text: '', mediaType: 'text' });

  useEffect(() => {
    setActiveMediaFilter('all');
    setReviewForm({ text: '', mediaType: 'text' });
  }, [activePlaceId]);

  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const getDistanceLabel = (flightId: string) => {
    const place = placeDetails[flightId];
    if (!userLocation || !place) return null;
    const distance = calculateDistanceKm(userLocation.lat, userLocation.lng, place.coords.lat, place.coords.lng);
    return distance < 5 ? '≤5 km from you' : `${distance} km from you`;
  };

  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>, placeId: string) => {
    e.preventDefault();
    const text = reviewForm.text.trim();
    if (!text) return;
    setReviews(prev => ({
      ...prev,
      [placeId]: [
        {
          id: `${placeId}-review-${Date.now()}`,
          user: 'Krit (Owner)',
          initials: 'KR',
          rating: 4.7,
          type: reviewForm.mediaType,
          content: text,
          timestamp: 'Just now',
          mediaLabel: reviewForm.mediaType === 'text' ? 'Note added' : reviewForm.mediaType === 'photo' ? 'Photo set' : 'Short clip'
        },
        ...(prev[placeId] || [])
      ]
    }));
    setReviewForm({ text: '', mediaType: reviewForm.mediaType });
  };

  const renderMediaIcon = (type: ReviewType) => {
    switch (type) {
      case 'photo':
        return <ImageIcon className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getFilteredReviews = () => {
    if (!activePlaceId) return [];
    const placeReviews = reviews[activePlaceId] || [];
    if (activeMediaFilter === 'all') return placeReviews;
    return placeReviews.filter(review => review.type === activeMediaFilter);
  };

  const getAverageRating = (placeId: string) => {
    const placeReviews = reviews[placeId] || [];
    if (!placeReviews.length) return null;
    const total = placeReviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / placeReviews.length).toFixed(1);
  };

  const initialVotes = useMemo(() => {
    return flights.reduce((acc, flight, idx) => {
      acc[flight.id] = {
        owner: 'yes',
        amy: idx === 0 ? 'yes' : 'no',
        marco: idx === 0 ? 'undecided' : 'yes'
      } as Record<string, VoteOption>;
      return acc;
    }, {} as Record<string, Record<string, VoteOption>>);
  }, []);

  const [votes, setVotes] = useState<Record<string, Record<string, VoteOption>>>(initialVotes);
  const [comments, setComments] = useState<Record<string, { id: string; participantId: string; text: string; createdAt: string }[]>>({
    flight1: [
      { id: 'c1', participantId: 'amy', text: 'Love the morning arrival—gives us a full first day.', createdAt: '2h ago' }
    ],
    flight2: [
      { id: 'c2', participantId: 'marco', text: 'Later departure works better for my work schedule.', createdAt: '1h ago' }
    ]
  });
  const [ownerNotes, setOwnerNotes] = useState<Record<string, string>>({
    flight1: 'Leaning toward morning flight but need to confirm seat upgrades.',
    flight2: ''
  });

  const handleVoteChange = (flightId: string, participantId: string, voteValue: VoteOption) => {
    setVotes(prev => ({
      ...prev,
      [flightId]: {
        ...prev[flightId],
        [participantId]: voteValue
      }
    }));
  };

  const handleAddComment = (e: FormEvent<HTMLFormElement>, flightId: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = (formData.get('comment') as string)?.trim();
    if (!text) return;
    setComments(prev => ({
      ...prev,
      [flightId]: [
        ...(prev[flightId] || []),
        {
          id: `${flightId}-${Date.now()}`,
          participantId: 'owner',
          text,
          createdAt: 'Just now'
        }
      ]
    }));
    e.currentTarget.reset();
  };

  const handleOwnerNoteChange = (flightId: string, value: string) => {
    setOwnerNotes(prev => ({
      ...prev,
      [flightId]: value
    }));
  };

  const getMajorityLabel = (flightId: string) => {
    const voteSet = votes[flightId];
    if (!voteSet) return 'Awaiting responses';
    const yesCount = Object.values(voteSet).filter(v => v === 'yes').length;
    const noCount = Object.values(voteSet).filter(v => v === 'no').length;
    if (yesCount > participants.length / 2) return 'Majority in favor';
    if (noCount >= participants.length / 2) return 'Majority against';
    return 'Mixed feedback';
  };

  const toggleSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const activePlace = activePlaceId ? placeDetails[activePlaceId] : null;
  const filteredReviews = getFilteredReviews();
  const modalAverageRating = activePlaceId ? getAverageRating(activePlaceId) : null;

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 shadow-md z-1000 flex items-center justify-between px-10">
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
      <div className="pt-40 pb-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-10">
          {/* CATEGORY TABS */}
          <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700 mb-8 pb-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 text-sm font-semibold transition ${
                  activeCategory === category.id
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-4'
                    : 'text-gray-800 dark:text-gray-200 hover:text-purple-600'
                }`}
              >
                {category.label}
                <span className={`px-2 py-1 rounded-full text-xs text-white ${
                  activeCategory === category.id ? 'bg-purple-600' : 'bg-gray-400'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-4 gap-8">
            {/* LEFT SIDEBAR - FILTERS */}
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sticky top-24">
                <div className="mb-6 p-4 rounded-xl border border-dashed border-purple-300 bg-purple-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Location</p>
                    </div>
                    <span className="text-[11px] text-purple-600">{locationPermission === 'granted' ? 'On' : 'Off'}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{userLocation?.city || 'Locating...'}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{locationStatus}</p>
                  <button className="flex items-center gap-1 text-xs font-semibold text-purple-600 underline">
                    Adjust radius <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">Refine Results</h3>

                {/* AI MATCH SCORE */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">AI Match Score</label>
                  <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-purple-600" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">80%+ relevance</p>
                </div>

                {/* PRICE RANGE */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Price Range</label>
                  <input type="range" min="0" max="1000" defaultValue="500" className="w-full accent-purple-600" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Up to $500</p>
                </div>

                {/* BUDGET CHECKBOX */}
                <div className="mb-6 flex items-center gap-2">
                  <input type="checkbox" id="within-budget" defaultChecked className="w-4 h-4 accent-purple-600" />
                  <label htmlFor="within-budget" className="text-sm text-gray-800 dark:text-gray-200 cursor-pointer">Within budget</label>
                </div>

                {/* SORT BY */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Sort by:</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600">
                    <option>Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Departure Time</option>
                  </select>
                </div>

                {/* CLEAR FILTERS */}
                <button className="w-full py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-50 dark:bg-gray-9500 transition">
                  Clear Filters
                </button>
              </div>
            </div>

            {/* CENTER - RECOMMENDATIONS */}
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Recommended {categories.find(c => c.id === activeCategory)?.label}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Showing 8 recommendations</p>

              <div className="space-y-4">
                {flights.map(flight => (
                  <div key={flight.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition">
                    {/* Flight Image */}
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                    {/* Flight Details */}
                    <div className="p-6">
                      {/* Match Score */}
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3 ${
                        flight.matchColor === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        {flight.matchScore} Match
                      </div>

                      {/* Route */}
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{flight.route}</h3>

                      {/* Time Details */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{flight.time} · {flight.duration}</p>

                      {/* Price */}
                      <p className="text-2xl font-bold text-purple-600 mb-3">{flight.price}</p>

                      {/* Info */}
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                        <span>Consensus:</span>
                        <span className={`font-semibold ${getMajorityLabel(flight.id).includes('favor') ? 'text-green-600' : getMajorityLabel(flight.id).includes('against') ? 'text-red-600' : 'text-orange-500'}`}>
                          {getMajorityLabel(flight.id)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Matches preferences</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                        {userLocation
                          ? getDistanceLabel(flight.id) || 'Calculating distance...'
                          : 'Enable location to see nearby matches'}
                      </p>
                      {getAverageRating(flight.id) && (
                        <div className="flex items-center gap-1 text-xs font-semibold text-gray-800 dark:text-gray-200 mb-4">
                          <Star className="w-3.5 h-3.5 text-yellow-500" fill="#FACC15" />
                          <span>{getAverageRating(flight.id)} average rating</span>
                        </div>
                      )}

                      {/* Participant Votes */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Participant votes</p>
                        <div className="space-y-2">
                          {participants.map(participant => (
                            <div key={participant.id} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[10px]">
                                  {participant.initials}
                                </div>
                                <div>
                                  <p className="text-gray-800 dark:text-gray-200 font-semibold">{participant.name}</p>
                                  <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase">{participant.role}</p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                {(['yes', 'no', 'undecided'] as VoteOption[]).map(option => (
                                  <button
                                    key={option}
                                    onClick={() => handleVoteChange(flight.id, participant.id, option)}
                                    type="button"
                                    className={`px-2 py-1 rounded-full border text-[10px] font-semibold transition ${votes[flight.id]?.[participant.id] === option ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-300 text-gray-600 dark:text-gray-400 hover:border-purple-400'}`}
                                  >
                                    {option === 'yes' ? 'Yes' : option === 'no' ? 'No' : 'Later'}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Comments */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Comments</p>
                        <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
                          {(comments[flight.id] || []).map(comment => {
                            const participant = participants.find(p => p.id === comment.participantId);
                            return (
                              <div key={comment.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1 text-[11px] text-gray-500">
                                  <span className="font-semibold text-gray-800">{participant?.name || 'Unknown'}</span>
                                  <span>{comment.createdAt}</span>
                                </div>
                                <p className="text-sm text-gray-900">{comment.text}</p>
                              </div>
                            );
                          })}
                        </div>
                        <form className="flex gap-2" onSubmit={(event) => handleAddComment(event, flight.id)}>
                          <input
                            type="text"
                            name="comment"
                            placeholder="Add a note for the group"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-purple-600"
                          />
                          <button type="submit" className="px-3 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold">Post</button>
                        </form>
                      </div>

                      {/* Owner Notes */}
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Owner decision log</label>
                        <textarea
                          value={ownerNotes[flight.id] || ''}
                          onChange={(event) => handleOwnerNoteChange(flight.id, event.target.value)}
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg text-xs px-3 py-2 focus:outline-none focus:border-purple-600"
                          placeholder="Capture final decision or action items"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => toggleSelection(flight.id)}
                          className={`flex-1 py-3 rounded-lg font-semibold transition ${
                            selectedItems.includes(flight.id)
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          Select
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivePlaceId(flight.id)}
                          className="flex-1 py-3 border-2 border-purple-200 text-purple-700 rounded-lg font-semibold text-sm hover:border-purple-400"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR - TRIP SELECTIONS */}
            <div className="col-span-1">
              <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Your Trip Selections</h3>

                {selectedItems.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No items selected yet</p>
                ) : (
                  <div className="mb-6 space-y-2">
                    {selectedItems.map(id => (
                      <div key={id} className="text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 p-2 rounded">
                        Selected item
                      </div>
                    ))}
                  </div>
                )}

                {/* BUDGET BREAKDOWN */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Budget Breakdown</h4>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Flights:</span>
                      <span className="text-purple-600 font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hotels:</span>
                      <span className="text-purple-600 font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Restaurants:</span>
                      <span className="text-purple-600 font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Attractions:</span>
                      <span className="text-purple-600 font-semibold">$0</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mb-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-800">Total:</span>
                      <span className="text-purple-600 font-bold">$0</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Remaining: $2,000</p>

                  {/* CTA BUTTON */}
                  <button 
                    onClick={() => router.push('/trip-summary')}
                    className="w-full py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-50 dark:bg-gray-9500 transition"
                  >
                    Save and Review Trip
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Participant pulse</h4>
                  <div className="space-y-3 text-xs text-gray-700">
                    {flights.map(flight => (
                      <div key={flight.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200">
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-gray-800">{flight.route}</span>
                          <span className="text-purple-600 font-bold">{getMajorityLabel(flight.id)}</span>
                        </div>
                        <p className="text-[11px] text-gray-500">Owner note: {ownerNotes[flight.id] || 'No decision logged yet'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-center py-10 text-sm border-t border-gray-200 dark:border-gray-700 dark:border-gray-800">
        <p>&copy; 2025 TravelBuddy. All rights reserved. | 
          <a href="#privacy" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Privacy Policy</a> | 
          <a href="#terms" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Terms of Service</a> | 
          <a href="#contact" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"> Contact Us</a>
        </p>
      </footer>

      {activePlace && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-[2000] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <p className="text-xs uppercase tracking-widest text-purple-500 font-semibold">{activePlace.category}</p>
                <h3 className="text-xl font-bold text-gray-900">{activePlace.name}</h3>
              </div>
              <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900" onClick={() => setActivePlaceId(null)}>Close ✕</button>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-6 space-y-4 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
                  <p className="text-xs text-purple-600 mb-1">Personalized using your location</p>
                  <p className="text-sm font-semibold text-gray-900">{userLocation?.city || 'Location pending'}</p>
                  <p className="text-xs text-gray-600">{locationStatus}</p>
                  {userLocation && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Distance: {getDistanceLabel(activePlaceId!)} · Accuracy {userLocation.accuracy}</p>
                  )}
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    AI Insight
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{activePlace.aiSummary}</p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    <Clock3 className="w-4 h-4 text-purple-600" />
                    Live essentials
                  </h4>
                  <div className="space-y-2">
                    {activePlace.liveEssentials.map(item => (
                      <div key={item.label} className="flex justify-between text-xs text-gray-700">
                        <span className="font-semibold text-gray-800">{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="h-48 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-600 text-white flex flex-col items-start justify-end p-4">
                  <p className="text-xs uppercase tracking-widest text-white/70">Map preview</p>
                  <p className="text-sm font-semibold">{activePlace.name}</p>
                  <p className="text-xs text-white/70">Approx. location visualized · tap to open maps (future)</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">From the internet</h4>
                  <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300 space-y-1">
                    {activePlace.internetHighlights.map(highlight => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition">
                  Add to Trip with this Context
                </button>
              </div>

              <div className="md:col-span-2 border-t border-gray-100 p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Traveler reviews</h4>
                    <p className="text-xs text-gray-500">High-signal comments from friends & verified guests.</p>
                    {modalAverageRating && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-gray-800 dark:text-gray-200 mt-2">
                        <Star className="w-3.5 h-3.5 text-yellow-500" fill="#FACC15" />
                        <span>{modalAverageRating} average · {filteredReviews.length} shown</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mediaFilters.map(filter => (
                      <button
                        key={filter}
                        onClick={() => setActiveMediaFilter(filter)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                          activeMediaFilter === filter
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-purple-300'
                        }`}
                      >
                        {filter !== 'all' && renderMediaIcon(filter as ReviewType)}
                        <span className="capitalize">{filter === 'all' ? 'All media' : filter}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {filteredReviews.length === 0 ? (
                    <p className="text-xs text-gray-500">No reviews for this filter yet. Be the first to share.</p>
                  ) : (
                    filteredReviews.map(review => (
                      <div key={review.id} className="border border-gray-100 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-800 dark:text-gray-200 font-semibold text-sm flex items-center justify-center">
                              {review.initials}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{review.user}</p>
                              <p className="text-[11px] text-gray-500">{review.timestamp}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                            <Star className="w-3.5 h-3.5 text-yellow-500" fill="#FACC15" />
                            {review.rating.toFixed(1)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mb-2">
                          {renderMediaIcon(review.type)}
                          <span className="capitalize">{review.type}</span>
                          {review.mediaLabel && <span>• {review.mediaLabel}</span>}
                        </div>
                        <p className="text-sm text-gray-700">{review.content}</p>
                      </div>
                    ))
                  )}
                </div>

                {activePlaceId && (
                  <form onSubmit={(event) => handleReviewSubmit(event, activePlaceId)} className="bg-gray-50 dark:bg-gray-950 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-semibold text-gray-600">Share as:</label>
                      <div className="flex gap-2">
                        {(['text', 'photo', 'video'] as ReviewType[]).map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setReviewForm(prev => ({ ...prev, mediaType: type }))}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                              reviewForm.mediaType === type
                                ? 'bg-white text-purple-600 border-purple-600'
                                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-purple-300'
                            }`}
                          >
                            {renderMediaIcon(type)}
                            <span className="capitalize">{type}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      value={reviewForm.text}
                      onChange={(event) => setReviewForm(prev => ({ ...prev, text: event.target.value }))}
                      rows={3}
                      placeholder="Drop your tip, upload context, or paste a short video link."
                      className="w-full border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 px-3 py-2 focus:outline-none focus:border-purple-600"
                    />
                    <div className="flex justify-between items-center text-[11px] text-gray-500">
                      <span>Media uploads are mocked for demo purposes.</span>
                      <button type="submit" className="inline-flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-full text-xs font-semibold">
                        <SendHorizonal className="w-3.5 h-3.5" /> Share update
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
