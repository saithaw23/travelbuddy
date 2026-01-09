"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  MoreHorizontal,
  Trash2,
  Copy,
  Share2,
  ArrowLeft,
  GitCompare,
  Clock,
} from "lucide-react";

interface SavedPlan {
  id: string;
  name: string;
  destination: string;
  image: string;
  dateRange: string;
  travelers: number;
  status: "draft" | "planning" | "confirmed" | "completed";
  itemCount: number;
  collaborators: { initials: string; name: string }[];
  lastUpdated: string;
  isAiGenerated: boolean;
}

const mockPlans: SavedPlan[] = [
  {
    id: "plan-1",
    name: "Tokyo Cultural Immersion",
    destination: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600",
    dateRange: "Mar 15 - 22, 2025",
    travelers: 4,
    status: "planning",
    itemCount: 28,
    collaborators: [
      { initials: "KR", name: "Krit" },
      { initials: "SM", name: "Sarah" },
      { initials: "JD", name: "John" },
    ],
    lastUpdated: "2 hours ago",
    isAiGenerated: true,
  },
  {
    id: "plan-2",
    name: "Bali Wellness Retreat",
    destination: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
    dateRange: "Apr 5 - 10, 2025",
    travelers: 2,
    status: "confirmed",
    itemCount: 18,
    collaborators: [{ initials: "KR", name: "Krit" }],
    lastUpdated: "1 day ago",
    isAiGenerated: true,
  },
  {
    id: "custom-1",
    name: "Weekend in San Francisco",
    destination: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600",
    dateRange: "Feb 28 - Mar 2, 2025",
    travelers: 2,
    status: "draft",
    itemCount: 8,
    collaborators: [{ initials: "KR", name: "Krit" }],
    lastUpdated: "3 days ago",
    isAiGenerated: false,
  },
];

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-700" },
  planning: { label: "Planning", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-800" },
  completed: { label: "Completed", color: "bg-blue-100 text-blue-800" },
};

export default function MyPlansPage() {
  const router = useRouter();
  const [plans] = useState<SavedPlan[]>(mockPlans);
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const togglePlanSelection = (planId: string) => {
    setSelectedPlans((prev) =>
      prev.includes(planId)
        ? prev.filter((id) => id !== planId)
        : [...prev, planId]
    );
  };

  const handleCompare = () => {
    if (selectedPlans.length >= 2) {
      router.push("/compare-itineraries");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Home</span>
            </button>
            <h1 className="font-bold text-gray-900">My Plans</h1>
            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Action Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/ai-plans")}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
            >
              <Sparkles className="w-4 h-4" />
              Get AI Plan
            </button>
            <button
              onClick={() => router.push("/browse")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:border-gray-400 transition"
            >
              <Plus className="w-4 h-4" />
              Build Custom
            </button>
          </div>

          {selectedPlans.length >= 2 && (
            <button
              onClick={handleCompare}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              <GitCompare className="w-4 h-4" />
              Compare ({selectedPlans.length})
            </button>
          )}
        </div>
      </div>

      {/* Plans Grid */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Your Saved Plans
          </h2>
          <p className="text-sm text-gray-500">
            {plans.length} plans • Select 2+ to compare
          </p>
        </div>

        {plans.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No plans yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start by getting AI recommendations or browsing destinations
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => router.push("/ai-plans")}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                Get AI Plan
              </button>
              <button
                onClick={() => router.push("/browse")}
                className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold"
              >
                <Plus className="w-4 h-4" />
                Browse Manually
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isSelected = selectedPlans.includes(plan.id);
              const status = statusConfig[plan.status];

              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group ${
                    isSelected
                      ? "border-purple-500 shadow-lg"
                      : "border-transparent shadow-sm hover:shadow-md"
                  }`}
                >
                  {/* Image */}
                  <div
                    className="relative h-36"
                    onClick={() => togglePlanSelection(plan.id)}
                  >
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Selection Checkbox */}
                    <div
                      className={`absolute top-3 left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                        isSelected
                          ? "bg-purple-600 border-purple-600"
                          : "border-white bg-white/20 backdrop-blur-sm"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    {/* AI Badge */}
                    {plan.isAiGenerated && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span className="text-xs font-medium text-white">AI</span>
                      </div>
                    )}

                    {/* Status */}
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {plan.destination}
                        </p>
                      </div>

                      {/* Menu */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(showMenu === plan.id ? null : plan.id);
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded-full"
                        >
                          <MoreHorizontal className="w-5 h-5 text-gray-400" />
                        </button>
                        {showMenu === plan.id && (
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Share2 className="w-4 h-4" />
                              Share
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Copy className="w-4 h-4" />
                              Duplicate
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {plan.dateRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {plan.travelers}
                      </span>
                    </div>

                    {/* Collaborators */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {plan.collaborators.slice(0, 3).map((collab, idx) => (
                            <div
                              key={idx}
                              className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-semibold text-xs flex items-center justify-center border-2 border-white"
                              title={collab.name}
                            >
                              {collab.initials}
                            </div>
                          ))}
                          {plan.collaborators.length > 3 && (
                            <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 font-semibold text-xs flex items-center justify-center border-2 border-white">
                              +{plan.collaborators.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="ml-2 text-xs text-gray-500">
                          {plan.itemCount} items
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/plan/${plan.id}`);
                        }}
                        className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700"
                      >
                        Open
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Last Updated */}
                    <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      Updated {plan.lastUpdated}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
