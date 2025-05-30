import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addHours, addDays, parseISO, isAfter, isBefore } from 'date-fns';
import { publishToSocialMedia, type SocialPlatform } from '@/lib/social';

type PostResult = {
  postId: string;
  platform?: string;
  status: 'success' | 'error';
  error?: string;
};

// Verify cron secret to ensure only Vercel can trigger this
const verifyCronSecret = (request: Request) => {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return false;
  }
  return true;
};

export async function GET(request: Request) {
  try {
    if (!verifyCronSecret(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const tomorrow = addDays(now, 1);

    // Get all scheduled posts for the next 24 hours
    const scheduledPosts = await prisma.post.findMany({
      where: {
        status: 'scheduled',
        scheduledFor: {
          gte: now,
          lt: tomorrow,
        },
      },
      include: {
        user: {
          include: {
            accounts: true,
          },
        },
      },
    });

    const results: PostResult[] = [];
    
    for (const post of scheduledPosts) {
      try {
        // Check if we're within 5 minutes of the scheduled time
        const scheduledTime = parseISO(post.scheduledFor!.toISOString());
        const fiveMinutesBefore = addHours(now, -5/60);
        const fiveMinutesAfter = addHours(now, 5/60);

        if (
          isAfter(scheduledTime, fiveMinutesBefore) &&
          isBefore(scheduledTime, fiveMinutesAfter)
        ) {
          // Post to each platform
          for (const platform of post.platforms) {
            const account = post.user.accounts.find(acc => acc.platform === platform);
            
            if (account) {
              try {
                const result = await publishToSocialMedia(
                  post,
                  account,
                  platform as SocialPlatform
                );

                if (result.success) {
                  await prisma.post.update({
                    where: { id: post.id },
                    data: {
                      status: 'published',
                      publishedAt: now,
                    },
                  });

                  await prisma.analytics.create({
                    data: {
                      userId: post.userId,
                      postId: post.id,
                      platform,
                      metric: 'posted',
                      value: 1,
                      timestamp: now,
                    },
                  });

                  results.push({
                    postId: post.id,
                    platform,
                    status: 'success',
                  });
                } else {
                  throw new Error(result.error || 'Failed to publish');
                }
              } catch (error) {
                console.error(`Error posting to ${platform}:`, error);
                results.push({
                  postId: post.id,
                  platform,
                  status: 'error',
                  error: error instanceof Error ? error.message : 'Unknown error',
                });
              }
            }
          }
        }
      } catch (error) {
        console.error('Error processing post:', error);
        results.push({
          postId: post.id,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });

  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Failed to process scheduled posts' },
      { status: 500 }
    );
  }
} 