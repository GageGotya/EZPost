import { NextResponse } from 'next/server';
import { publishScheduledPosts, retryFailedPosts } from '@/lib/posting/automatedPoster';

// This route should be called by a cron job every 5 minutes
export async function GET() {
  try {
    // Verify cron secret to ensure this is a legitimate cron job
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      throw new Error('CRON_SECRET environment variable not set');
    }

    // Publish any scheduled posts that are due
    await publishScheduledPosts();

    // Retry any failed posts
    await retryFailedPosts();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in cron job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Prevent Next.js from caching this route
export const dynamic = 'force-dynamic'; 