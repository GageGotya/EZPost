import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get posts that need to be published
    const { data: posts, error } = await supabase
      .from('social_posts')
      .select('*')
      .eq('status', 'scheduled')
      .lte('scheduled_for', new Date().toISOString());

    if (error) {
      throw error;
    }

    // Process each post (in a real implementation, this would publish to social media)
    for (const post of posts || []) {
      await supabase
        .from('social_posts')
        .update({ status: 'published', published_at: new Date().toISOString() })
        .eq('id', post.id);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Schedule check completed successfully',
      processed: posts?.length || 0
    });
  } catch (error) {
    console.error('Schedule check error:', error);
    return NextResponse.json(
      { error: 'Failed to check schedule' },
      { status: 500 }
    );
  }
}

// Prevent Next.js from caching this route
export const dynamic = 'force-dynamic'; 