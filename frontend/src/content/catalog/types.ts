// Shared types for content catalog items

export interface LinkItem {
  title: string;
  description: string;
  url: string;
  source: string;
}

export interface MediaItem {
  title: string;
  description: string;
  url: string;
  source: string;
  duration?: string;
}

export interface ResourceItem {
  title: string;
  description: string;
  url?: string;
  source: string;
  inAppContent?: string;
}

export interface CommunityInfoSection {
  title: string;
  description: string;
  content: string[];
  externalLinks?: Array<{ label: string; url: string }>;
}
