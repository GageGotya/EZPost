import { NextResponse } from 'next/server';

// This route should be called by a cron job every 5 minutes
export async function GET(request: Request) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For now, just return success as we'll implement the posting logic later
    return NextResponse.json({ 
      success: true,
      message: 'Cron job executed successfully'
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Failed to execute cron job' },
      { status: 500 }
    );
  }
}

// Prevent Next.js from caching this route
export const dynamic = 'force-dynamic'; 