'use client';

import Link from 'next/link';
import { 
  Plane, 
  MessageCircle, 
  Calendar, 
  Search,
  MapPin,
  Heart,
  Users,
  FileText
} from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-6">
        {icon || <Plane className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        {description}
      </p>

      {(actionLabel && (actionHref || onAction)) && (
        actionHref ? (
          <Link href={actionHref}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              {actionLabel}
            </Button>
          </Link>
        ) : (
          <Button 
            onClick={onAction}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
}

// Specific empty states
export function NoPlansEmptyState() {
  return (
    <EmptyState
      icon={<Calendar className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
      title="No trips planned yet"
      description="Start planning your next adventure by chatting with our AI or browsing destinations manually."
      actionLabel="Start Planning"
      actionHref="/"
    />
  );
}

export function NoSearchResultsEmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <EmptyState
      icon={<Search className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
      title="No results found"
      description="We couldn't find any matches for your search. Try adjusting your filters or search terms."
      actionLabel="Clear Filters"
      onAction={onReset}
    />
  );
}

export function NoMessagesEmptyState() {
  return (
    <EmptyState
      icon={<MessageCircle className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
      title="Start a conversation"
      description="Tell us about your dream trip and we'll help you plan the perfect itinerary."
      actionLabel="Send a Message"
    />
  );
}

export function NoCollaboratorsEmptyState({ onInvite }: { onInvite?: () => void }) {
  return (
    <EmptyState
      icon={<Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
      title="No collaborators yet"
      description="Invite friends and family to help plan this trip together. They can vote on options and leave comments."
      actionLabel="Invite People"
      onAction={onInvite}
    />
  );
}

export function NoFavoritesEmptyState() {
  return (
    <EmptyState
      icon={<Heart className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
      title="No favorites saved"
      description="Save your favorite destinations, hotels, and activities to easily find them later."
      actionLabel="Browse Destinations"
      actionHref="/browse"
    />
  );
}

export function NoReviewsEmptyState() {
  return (
    <EmptyState
      icon={<FileText className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
      title="No reviews yet"
      description="Share your travel experiences to help other travelers make better decisions."
    />
  );
}

export function NoNearbyEmptyState() {
  return (
    <EmptyState
      icon={<MapPin className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
      title="No nearby options"
      description="We couldn't find any options near your current location. Try browsing all destinations instead."
      actionLabel="Browse All"
    />
  );
}
