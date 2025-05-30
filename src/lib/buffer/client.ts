import { Buffer } from '@buffer/api';

if (!process.env.BUFFER_ACCESS_TOKEN) {
  throw new Error('Missing env.BUFFER_ACCESS_TOKEN');
}

export const buffer = new Buffer({
  accessToken: process.env.BUFFER_ACCESS_TOKEN,
});

export async function schedulePost({
  text,
  platform,
  scheduledAt,
}: {
  text: string;
  platform: string;
  scheduledAt: Date;
}) {
  try {
    // Get the first profile for the specified platform
    const profiles = await buffer.profiles.list();
    const profile = profiles.find(p => p.service === platform);

    if (!profile) {
      throw new Error(`No profile found for platform: ${platform}`);
    }

    // Create and schedule the post
    const post = await buffer.posts.create({
      text,
      profile_ids: [profile.id],
      scheduled_at: scheduledAt.toISOString(),
    });

    return post;
  } catch (error) {
    console.error('Buffer API error:', error);
    throw error;
  }
}

export async function getPostAnalytics(postId: string) {
  try {
    const analytics = await buffer.posts.analytics(postId);
    return {
      likes: analytics.reactions || 0,
      comments: analytics.comments || 0,
      shares: analytics.shares || 0,
      impressions: analytics.reach || 0,
      engagement_rate: analytics.engagement || 0,
    };
  } catch (error) {
    console.error('Buffer Analytics API error:', error);
    throw error;
  }
} 