export type Platform = 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'tiktok';

export type BusinessType = 'retail' | 'tech' | 'food' | 'health' | 'finance' | 'other';
export type PostFrequency = 'daily' | '3x_week' | 'weekly';
export type ContentTone = 'professional' | 'casual' | 'humorous' | 'formal';

export interface BusinessProfile {
  type: BusinessType;
  name: string;
  description: string;
  targetAudience: string;
  competitors?: string[];
  keywords: string[];
  tone: ContentTone;
}

export interface UserPreferences {
  postFrequency: PostFrequency;
  preferredTimes: string[];
  platforms: Platform[];
  businessProfile: BusinessProfile;
  autoSchedule: boolean;
}

export interface UserCredits {
  available: number;
  used: number;
  lastPurchase?: string;
}

export interface ContentRequest {
  prompt: string;
  tone?: ContentTone;
  platforms: Platform[];
  keywords?: string[];
  businessContext?: BusinessProfile;
}

export interface GeneratedContent {
  platform: Platform;
  content: string;
  hashtags: string[];
  suggestedTime?: string;
}

export interface ScheduledPost {
  id: string;
  content: GeneratedContent;
  scheduledFor: string;
  platform: Platform;
  status: 'pending' | 'published' | 'failed';
}

export interface PricingTier {
  id: string;
  name: string;
  credits: number;
  price: number;
  features: string[];
  recommended?: boolean;
} 