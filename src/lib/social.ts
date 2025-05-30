import { supabase } from './supabase/client';
import type { Database } from './supabase/types';

type Post = Database['public']['Tables']['social_posts']['Row'];
type Account = Database['public']['Tables']['users']['Row'];

export type SocialPlatform = 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'tiktok';

export async function publishToSocialMedia(
  post: Post,
  account: Account,
  platform: SocialPlatform
): Promise<{ success: boolean; error?: string }> {
  try {
    // This is where you'll implement the actual posting logic for each platform
    // For now, we'll just simulate success
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true };
  } catch (error) {
    console.error(`Error posting to ${platform}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export function validateContent(content: string, platform: SocialPlatform): boolean {
  const limits = {
    twitter: 280,
    linkedin: 3000,
    facebook: 63206,
    instagram: 2200,
    tiktok: 2200
  };

  return content.length <= limits[platform];
}

export function formatContentForPlatform(content: string, platform: SocialPlatform): string {
  switch (platform) {
    case 'twitter':
      return content.slice(0, 280);
    case 'instagram':
    case 'tiktok':
      // Add line breaks for readability
      return content.replace(/\. /g, '.\n\n');
    case 'linkedin':
      // Add professional formatting
      return content.replace(/\. /g, '.\n\n');
    case 'facebook':
      // Facebook-specific formatting
      return content;
    default:
      return content;
  }
} 