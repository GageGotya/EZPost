import { PrismaClient, Post } from '@prisma/client';
import { generateContent, generateHashtags } from '../ai/contentGenerator';
import { determineOptimalPostingTime } from '../scheduling/optimalTimes';

const prisma = new PrismaClient();

interface PostingConfig {
  userId: string;
  platforms: string[];
  topic?: string;
}

export async function scheduleAutomatedPosts(config: PostingConfig): Promise<void> {
  const { userId, platforms, topic } = config;

  try {
    // Get user preferences
    const userPreferences = await prisma.userPreferences.findUnique({
      where: { userId }
    });

    if (!userPreferences) {
      throw new Error('User preferences not found');
    }

    // Get user's social media accounts
    const accounts = await prisma.account.findMany({
      where: { userId }
    });

    if (accounts.length === 0) {
      throw new Error('No social media accounts connected');
    }

    // Generate content for each platform
    for (const platform of platforms) {
      const account = accounts.find(acc => acc.platform === platform);
      if (!account) continue;

      // Generate content
      const content = await generateContent({
        platform: platform as any,
        userPreferences,
        topic
      });

      // Generate hashtags
      const hashtags = await generateHashtags(
        content,
        platform as any,
        userPreferences.industryType || 'General'
      );

      // Determine optimal posting time
      const scheduledTime = await determineOptimalPostingTime(
        platform as any,
        userPreferences
      );

      // Create post in database
      await prisma.post.create({
        data: {
          userId,
          content: content + '\n\n' + hashtags.join(' '),
          platforms: [platform],
          status: 'scheduled',
          scheduledFor: scheduledTime,
        }
      });
    }
  } catch (error) {
    console.error('Error scheduling automated posts:', error);
    throw error;
  }
}

export async function publishScheduledPosts(): Promise<void> {
  try {
    // Find all posts that are scheduled and due for publishing
    const duePosts = await prisma.post.findMany({
      where: {
        status: 'scheduled',
        scheduledFor: {
          lte: new Date()
        }
      },
      include: {
        user: {
          include: {
            accounts: true
          }
        }
      }
    });

    for (const post of duePosts) {
      try {
        // Publish to each platform
        for (const platform of post.platforms) {
          const account = post.user.accounts.find(acc => acc.platform === platform);
          if (!account) continue;

          await publishToSocialMedia(post, platform, account);
        }

        // Update post status to published
        await prisma.post.update({
          where: { id: post.id },
          data: {
            status: 'published',
            publishedAt: new Date()
          }
        });
      } catch (error) {
        console.error(`Error publishing post ${post.id}:`, error);
        
        // Mark post as failed
        await prisma.post.update({
          where: { id: post.id },
          data: {
            status: 'failed'
          }
        });
      }
    }
  } catch (error) {
    console.error('Error in publish scheduled posts:', error);
    throw error;
  }
}

async function publishToSocialMedia(
  post: Post,
  platform: string,
  account: any
): Promise<void> {
  // Implementation will vary by platform
  switch (platform) {
    case 'twitter':
      // Implement Twitter API posting
      break;
    case 'linkedin':
      // Implement LinkedIn API posting
      break;
    case 'facebook':
      // Implement Facebook API posting
      break;
    case 'instagram':
      // Implement Instagram API posting
      break;
    case 'tiktok':
      // Implement TikTok API posting
      break;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

export async function retryFailedPosts(): Promise<void> {
  try {
    const failedPosts = await prisma.post.findMany({
      where: {
        status: 'failed'
      }
    });

    for (const post of failedPosts) {
      // Reschedule for the next optimal time
      const userPreferences = await prisma.userPreferences.findUnique({
        where: { userId: post.userId }
      });

      if (!userPreferences) continue;

      const nextTime = await determineOptimalPostingTime(
        post.platforms[0] as any,
        userPreferences
      );

      await prisma.post.update({
        where: { id: post.id },
        data: {
          status: 'scheduled',
          scheduledFor: nextTime
        }
      });
    }
  } catch (error) {
    console.error('Error retrying failed posts:', error);
    throw error;
  }
} 