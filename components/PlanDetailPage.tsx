"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Share2,
  UserPlus,
  Check,
  X,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Edit3,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Star,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
  CreditCard,
  Info,
  Car,
  Wifi,
  Coffee,
  Accessibility,
  ParkingCircle,
  Waves,
  Dumbbell,
  Minus,
  Plus,
  Settings,
} from "lucide-react";

type VoteOption = "yes" | "no" | "undecided";

interface PlaceDetails {
  description: string;
  facilities: { icon: string; name: string; available: boolean }[];
  userRatings: { user: string; initials: string; rating: number; comment: string; date: string }[];
  avgRating: number;
  totalReviews: number;
}

interface PlanItem {
  id: string;
  category: "flight" | "hotel" | "restaurant" | "activity";
  name: string;
  location: string;
  date: string;
  time?: string;
  price: number;
  image: string;
  rating: number;
  quantity?: number;
  seats?: number;
  nights?: number;
  guests?: number;
}

interface Participant {
  id: string;
  name: string;
  initials: string;
  role: "owner" | "collaborator";
  email?: string;
}

interface Comment {
  id: string;
  participantId: string;
  text: string;
  createdAt: string;
}

interface Vote {
  itemId: string;
  participantId: string;
  vote: VoteOption;
}

const categoryIcons = {
  flight: Plane,
  hotel: Hotel,
  restaurant: Utensils,
  activity: Camera,
};

const categoryColors = {
  flight: { bg: "bg-blue-100", text: "text-blue-600" },
  hotel: { bg: "bg-purple-100", text: "text-purple-600" },
  restaurant: { bg: "bg-orange-100", text: "text-orange-600" },
  activity: { bg: "bg-green-100", text: "text-green-600" },
};

// Mock data
const mockPlan = {
  id: "plan-1",
  name: "Tokyo Cultural Immersion",
  destination: "Tokyo, Japan",
  dateRange: "Mar 15 - 22, 2025",
  travelers: 4,
  totalCost: 4850,
  image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600",
  isAiGenerated: true,
};

const mockItems: PlanItem[] = [
  {
    id: "item-1",
    category: "flight",
    name: "Direct Flight SFO → NRT",
    location: "Japan Airlines",
    date: "Mar 15",
    time: "10:30 AM",
    price: 850,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200",
    rating: 4.5,
    seats: 2,
  },
  {
    id: "item-2",
    category: "hotel",
    name: "Park Hyatt Tokyo",
    location: "Shinjuku, Tokyo",
    date: "Mar 15-21",
    price: 450,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200",
    rating: 4.9,
    nights: 6,
    guests: 2,
  },
  {
    id: "item-3",
    category: "restaurant",
    name: "Sukiyabashi Jiro",
    location: "Ginza, Tokyo",
    date: "Mar 16",
    time: "7:00 PM",
    price: 300,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200",
    rating: 4.9,
    guests: 2,
  },
  {
    id: "item-4",
    category: "activity",
    name: "TeamLab Borderless",
    location: "Odaiba, Tokyo",
    date: "Mar 17",
    time: "2:00 PM",
    price: 35,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200",
    rating: 4.8,
    quantity: 2,
  },
  {
    id: "item-5",
    category: "activity",
    name: "Private Tea Ceremony",
    location: "Uji, Kyoto",
    date: "Mar 18",
    time: "10:00 AM",
    price: 120,
    image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=200",
    rating: 4.7,
    quantity: 2,
  },
];

// Mock place details for info modal
const mockPlaceDetails: Record<string, PlaceDetails> = {
  "item-1": {
    description: "Premium direct flight service with excellent in-flight amenities and entertainment.",
    facilities: [
      { icon: "wifi", name: "Free WiFi", available: true },
      { icon: "coffee", name: "Meals Included", available: true },
      { icon: "accessibility", name: "Wheelchair Access", available: true },
    ],
    userRatings: [
      { user: "Mike T.", initials: "MT", rating: 5, comment: "Smooth flight, great service!", date: "2 weeks ago" },
      { user: "Lisa K.", initials: "LK", rating: 4, comment: "Comfortable seats, food was good", date: "1 month ago" },
    ],
    avgRating: 4.5,
    totalReviews: 892,
  },
  "item-2": {
    description: "Luxury 5-star hotel in the heart of Shinjuku with panoramic city views.",
    facilities: [
      { icon: "parking", name: "Valet Parking", available: true },
      { icon: "wifi", name: "Free WiFi", available: true },
      { icon: "pool", name: "Infinity Pool", available: true },
      { icon: "gym", name: "Fitness Center", available: true },
      { icon: "coffee", name: "Room Service 24/7", available: true },
    ],
    userRatings: [
      { user: "Anna B.", initials: "AB", rating: 5, comment: "Best hotel experience ever! Views are incredible.", date: "1 week ago" },
      { user: "James L.", initials: "JL", rating: 5, comment: "Lost in Translation vibes, absolutely stunning", date: "2 weeks ago" },
      { user: "Sophie R.", initials: "SR", rating: 4, comment: "Amazing but pricey. Worth it for special occasions.", date: "3 weeks ago" },
    ],
    avgRating: 4.9,
    totalReviews: 2341,
  },
  "item-3": {
    description: "World-famous 3-Michelin-star sushi restaurant. Reservation required months in advance.",
    facilities: [
      { icon: "accessibility", name: "Wheelchair Access", available: false },
      { icon: "parking", name: "Street Parking", available: true },
    ],
    userRatings: [
      { user: "David C.", initials: "DC", rating: 5, comment: "Life-changing sushi. Worth every penny.", date: "3 days ago" },
      { user: "Emma W.", initials: "EW", rating: 5, comment: "The best omakase I've ever had!", date: "1 week ago" },
    ],
    avgRating: 4.9,
    totalReviews: 4521,
  },
  "item-4": {
    description: "Immersive digital art museum with stunning interactive installations.",
    facilities: [
      { icon: "accessibility", name: "Wheelchair Access", available: true },
      { icon: "parking", name: "Nearby Parking", available: true },
      { icon: "coffee", name: "Café On-site", available: true },
    ],
    userRatings: [
      { user: "Chris H.", initials: "CH", rating: 5, comment: "Mind-blowing! Plan at least 3 hours.", date: "2 days ago" },
      { user: "Rachel M.", initials: "RM", rating: 4, comment: "Beautiful but very crowded. Go early!", date: "1 week ago" },
    ],
    avgRating: 4.8,
    totalReviews: 8765,
  },
  "item-5": {
    description: "Traditional Japanese tea ceremony experience with a certified tea master.",
    facilities: [
      { icon: "accessibility", name: "Wheelchair Access", available: false },
      { icon: "parking", name: "Free Parking", available: true },
    ],
    userRatings: [
      { user: "Tom S.", initials: "TS", rating: 5, comment: "Peaceful and authentic. Highly recommend!", date: "5 days ago" },
    ],
    avgRating: 4.7,
    totalReviews: 2156,
  },
};

const mockParticipants: Participant[] = [
  { id: "p1", name: "Krit (You)", initials: "KR", role: "owner" },
  { id: "p2", name: "Sarah Miller", initials: "SM", role: "collaborator" },
  { id: "p3", name: "John Davis", initials: "JD", role: "collaborator" },
  { id: "p4", name: "Emily Chen", initials: "EC", role: "collaborator" },
];

export default function PlanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const planId = params?.id as string;

  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, Record<string, VoteOption>>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({
    "item-3": [
      {
        id: "c1",
        participantId: "p2",
        text: "This is THE sushi place! So excited 🍣",
        createdAt: "2 hours ago",
      },
    ],
  });
  const [ownerNotes, setOwnerNotes] = useState<Record<string, string>>({});
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState<string | null>(null);
  const [itemQuantities, setItemQuantities] = useState<Record<string, { seats?: number; nights?: number; guests?: number; quantity?: number }>>({
    "item-1": { seats: 2 },
    "item-2": { nights: 6, guests: 2 },
    "item-3": { guests: 2 },
    "item-4": { quantity: 2 },
    "item-5": { quantity: 2 },
  });

  const getFacilityIcon = (icon: string) => {
    switch (icon) {
      case "wifi": return <Wifi className="w-4 h-4" />;
      case "parking": return <ParkingCircle className="w-4 h-4" />;
      case "coffee": return <Coffee className="w-4 h-4" />;
      case "accessibility": return <Accessibility className="w-4 h-4" />;
      case "pool": return <Waves className="w-4 h-4" />;
      case "gym": return <Dumbbell className="w-4 h-4" />;
      default: return <Check className="w-4 h-4" />;
    }
  };

  const updateItemQuantity = (itemId: string, field: string, delta: number) => {
    setItemQuantities(prev => {
      const current = prev[itemId] || {};
      const currentValue = (current as Record<string, number>)[field] || 1;
      const newValue = Math.max(1, currentValue + delta);
      return {
        ...prev,
        [itemId]: { ...current, [field]: newValue }
      };
    });
  };

  const getItemPrice = (item: PlanItem) => {
    const qty = itemQuantities[item.id] || {};
    if (item.category === "flight") return item.price * (qty.seats || 1);
    if (item.category === "hotel") return item.price * (qty.nights || 1);
    if (item.category === "restaurant") return item.price * (qty.guests || 1);
    return item.price * (qty.quantity || 1);
  };

  const totalCost = mockItems.reduce((sum, item) => sum + getItemPrice(item), 0);

  const handleVote = (itemId: string, participantId: string, vote: VoteOption) => {
    setVotes((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [participantId]: vote,
      },
    }));
  };

  const handleAddComment = (e: React.FormEvent, itemId: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("comment") as HTMLInputElement;
    
    if (!input.value.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      participantId: "p1",
      text: input.value,
      createdAt: "Just now",
    };

    setComments((prev) => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), newComment],
    }));
    input.value = "";
    toast.success('Comment added');
  };

  const getVoteSummary = (itemId: string) => {
    const itemVotes = votes[itemId] || {};
    const summary = { yes: 0, no: 0, undecided: 0 };
    Object.values(itemVotes).forEach((vote) => {
      summary[vote]++;
    });
    return summary;
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }
    
    const loadingToast = toast.loading('Sending invitation...');
    
    // Mock invite
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Invitation sent!', {
        description: `${inviteEmail} has been invited to collaborate`
      });
      setShowInviteModal(false);
      setInviteEmail("");
    }, 1000);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push("/my-plans")}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">My Plans</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-purple-400 transition"
                >
                  <UserPlus className="w-4 h-4" />
                  Invite
                </button>
                <button
                  onClick={() => router.push("/checkout")}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
                >
                  <CreditCard className="w-4 h-4" />
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Plan Hero */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-start gap-6">
              <img
                src={mockPlan.image}
                alt={mockPlan.name}
                className="w-32 h-24 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {mockPlan.isAiGenerated && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      <Sparkles className="w-3 h-3" />
                      AI Generated
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {mockPlan.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    {mockPlan.destination}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    {mockPlan.dateRange}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-purple-500" />
                    {mockPlan.travelers} travelers
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-purple-500" />
                    ${mockPlan.totalCost}/person
                  </span>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Team:</span>
                  <div className="flex -space-x-2">
                    {mockParticipants.map((p) => (
                      <div
                        key={p.id}
                        className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm flex items-center justify-center border-2 border-white"
                        title={p.name}
                      >
                        {p.initials}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="w-9 h-9 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-purple-400 hover:text-purple-600 transition"
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {mockParticipants.length} collaborators
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Items */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Plan Items ({mockItems.length})
          </h2>

          <div className="space-y-4">
            {mockItems.map((item) => {
              const Icon = categoryIcons[item.category];
              const colors = categoryColors[item.category];
              const isExpanded = expandedItem === item.id;
              const voteSummary = getVoteSummary(item.id);
              const itemComments = comments[item.id] || [];

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  {/* Item Header */}
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`p-1.5 rounded-lg ${colors.bg} ${colors.text}`}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="text-xs font-medium text-gray-500 uppercase">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">{item.location}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                          {item.time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.time}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" fill="#FACC15" />
                            {item.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${getItemPrice(item).toLocaleString()}
                        </p>
                        {/* Quantity indicator */}
                        <p className="text-xs text-gray-500">
                          {item.category === "flight" && `${itemQuantities[item.id]?.seats || 1} seat(s)`}
                          {item.category === "hotel" && `${itemQuantities[item.id]?.nights || 1} night(s)`}
                          {item.category === "restaurant" && `${itemQuantities[item.id]?.guests || 1} guest(s)`}
                          {item.category === "activity" && `${itemQuantities[item.id]?.quantity || 1} ticket(s)`}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {voteSummary.yes > 0 && (
                            <span className="flex items-center gap-1 text-xs text-green-600">
                              <ThumbsUp className="w-3 h-3" />
                              {voteSummary.yes}
                            </span>
                          )}
                          {voteSummary.no > 0 && (
                            <span className="flex items-center gap-1 text-xs text-red-600">
                              <ThumbsDown className="w-3 h-3" />
                              {voteSummary.no}
                            </span>
                          )}
                          {itemComments.length > 0 && (
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <MessageCircle className="w-3 h-3" />
                              {itemComments.length}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Action buttons */}
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowDetailsModal(item.id); }}
                          className="p-2 hover:bg-blue-50 rounded-full text-blue-600"
                          title="View Details"
                        >
                          <Info className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowEditModal(item.id); }}
                          className="p-2 hover:bg-purple-50 rounded-full text-purple-600"
                          title="Edit Booking"
                        >
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Collaboration Panel */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                      {/* Voting */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-800 mb-3">
                          Team Votes
                        </p>
                        <div className="grid gap-2">
                          {mockParticipants.map((p) => (
                            <div
                              key={p.id}
                              className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold text-xs flex items-center justify-center">
                                  {p.initials}
                                </div>
                                <span className="text-sm text-gray-800">
                                  {p.name}
                                </span>
                              </div>
                              <div className="flex gap-1">
                                {(["yes", "no", "undecided"] as VoteOption[]).map(
                                  (option) => {
                                    const isActive =
                                      votes[item.id]?.[p.id] === option;
                                    return (
                                      <button
                                        key={option}
                                        onClick={() =>
                                          handleVote(item.id, p.id, option)
                                        }
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                                          isActive
                                            ? option === "yes"
                                              ? "bg-green-600 text-white"
                                              : option === "no"
                                              ? "bg-red-600 text-white"
                                              : "bg-gray-600 text-white"
                                            : "border border-gray-300 text-gray-600 hover:border-gray-400"
                                        }`}
                                      >
                                        {option === "yes"
                                          ? "Yes"
                                          : option === "no"
                                          ? "No"
                                          : "Maybe"}
                                      </button>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Comments */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-800 mb-3">
                          Comments
                        </p>
                        <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
                          {itemComments.length === 0 ? (
                            <p className="text-sm text-gray-500 py-2">
                              No comments yet. Start the conversation!
                            </p>
                          ) : (
                            itemComments.map((comment) => {
                              const participant = mockParticipants.find(
                                (p) => p.id === comment.participantId
                              );
                              return (
                                <div
                                  key={comment.id}
                                  className="bg-white border border-gray-200 rounded-lg p-3"
                                >
                                  <div className="flex items-center justify-between mb-1 text-xs text-gray-500">
                                    <span className="font-semibold text-gray-800">
                                      {participant?.name || "Unknown"}
                                    </span>
                                    <span>{comment.createdAt}</span>
                                  </div>
                                  <p className="text-sm text-gray-900">
                                    {comment.text}
                                  </p>
                                </div>
                              );
                            })
                          )}
                        </div>
                        <form
                          onSubmit={(e) => handleAddComment(e, item.id)}
                          className="flex gap-2"
                        >
                          <input
                            type="text"
                            name="comment"
                            placeholder="Add a comment..."
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </div>

                      {/* Owner Notes */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          <Edit3 className="w-4 h-4 inline mr-1" />
                          Owner Notes
                        </label>
                        <textarea
                          value={ownerNotes[item.id] || ""}
                          onChange={(e) =>
                            setOwnerNotes((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          placeholder="Add notes or decisions about this item..."
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg text-sm px-4 py-2.5 focus:outline-none focus:border-purple-600"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary Footer */}
          <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Total Estimated Cost</span>
              <span className="text-2xl font-bold text-gray-900">
                ${totalCost.toLocaleString()}
                <span className="text-sm font-normal text-gray-500">
                  /person
                </span>
              </span>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="w-full py-4 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Checkout
            </button>
          </div>
        </main>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                Invite Collaborators
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleInvite}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="friend@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-purple-600"
                required
              />

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  Collaborators can:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Vote on plan items
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Leave comments
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    View all details
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Place Details Modal */}
      {showDetailsModal && mockPlaceDetails[showDetailsModal] && (() => {
        const item = mockItems.find(i => i.id === showDetailsModal)!;
        const details = mockPlaceDetails[showDetailsModal];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative h-40">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setShowDetailsModal(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  <p className="text-sm text-white/80">{item.location}</p>
                </div>
              </div>

              <div className="p-6">
                {/* Rating Summary */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-6 h-6 text-yellow-500" fill="#FACC15" />
                    <span className="text-2xl font-bold text-gray-900">{details.avgRating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({details.totalReviews.toLocaleString()} reviews)</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-6">{details.description}</p>

                {/* Facilities */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Facilities & Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {details.facilities.map((facility, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          facility.available ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {getFacilityIcon(facility.icon)}
                        <span className="text-sm">{facility.name}</span>
                        {!facility.available && <X className="w-3 h-3 ml-auto" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Reviews */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Reviews from Travelers</h4>
                  <div className="space-y-3">
                    {details.userRatings.map((review, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold text-xs flex items-center justify-center">
                              {review.initials}
                            </div>
                            <span className="text-sm font-medium text-gray-900">{review.user}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                fill={i < review.rating ? '#FACC15' : 'none'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{review.comment}</p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowDetailsModal(null)}
                  className="w-full mt-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Edit Booking Modal */}
      {showEditModal && (() => {
        const item = mockItems.find(i => i.id === showEditModal)!;
        const qty = itemQuantities[showEditModal] || {};
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Edit Booking Details</h3>
                <button
                  onClick={() => setShowEditModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Item Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                  <p className="text-sm text-gray-500">{item.date}{item.time && ` at ${item.time}`}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="space-y-4 mb-6">
                {item.category === "flight" && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Number of Seats</p>
                      <p className="text-xs text-gray-500">${item.price} per seat</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateItemQuantity(showEditModal, 'seats', -1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{qty.seats || 1}</span>
                      <button
                        onClick={() => updateItemQuantity(showEditModal, 'seats', 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {item.category === "hotel" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Number of Nights</p>
                        <p className="text-xs text-gray-500">${item.price} per night</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateItemQuantity(showEditModal, 'nights', -1)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{qty.nights || 1}</span>
                        <button
                          onClick={() => updateItemQuantity(showEditModal, 'nights', 1)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Number of Guests</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateItemQuantity(showEditModal, 'guests', -1)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{qty.guests || 1}</span>
                        <button
                          onClick={() => updateItemQuantity(showEditModal, 'guests', 1)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {item.category === "restaurant" && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Number of Guests</p>
                      <p className="text-xs text-gray-500">${item.price} per person</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateItemQuantity(showEditModal, 'guests', -1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{qty.guests || 1}</span>
                      <button
                        onClick={() => updateItemQuantity(showEditModal, 'guests', 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {item.category === "activity" && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Number of Tickets</p>
                      <p className="text-xs text-gray-500">${item.price} per ticket</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateItemQuantity(showEditModal, 'quantity', -1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{qty.quantity || 1}</span>
                      <button
                        onClick={() => updateItemQuantity(showEditModal, 'quantity', 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Updated Price */}
              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Updated Price</span>
                  <span className="text-xl font-bold text-purple-600">
                    ${getItemPrice(item).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowEditModal(null)}
                className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        );
      })()}
    </>
  );
}
