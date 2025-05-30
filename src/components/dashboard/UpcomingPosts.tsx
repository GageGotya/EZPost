import type { Database } from '@/lib/supabase/types';
import { formatDate, formatTime, truncateText, getRelativeTimeString } from '@/lib/utils';

type Post = Database['public']['Tables']['social_posts']['Row'];

interface UpcomingPostsProps {
  posts: Post[];
}

export function UpcomingPosts({ posts }: UpcomingPostsProps) {
  // Sort posts by scheduled time
  const sortedPosts = [...posts].sort((a, b) => {
    if (!a.scheduled_for || !b.scheduled_for) return 0;
    return new Date(a.scheduled_for).getTime() - new Date(b.scheduled_for).getTime();
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Upcoming Posts</h2>
      {sortedPosts.length === 0 ? (
        <p className="text-gray-500">No upcoming posts scheduled</p>
      ) : (
        <div className="space-y-3">
          {sortedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    {post.scheduled_for && (
                      <>
                        {formatDate(new Date(post.scheduled_for))} at{' '}
                        {formatTime(new Date(post.scheduled_for))} (
                        {getRelativeTimeString(new Date(post.scheduled_for))})
                      </>
                    )}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {truncateText(post.content, 100)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    {post.platform}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getPlatformEmoji(platform: string): string {
  const emojis: Record<string, string> = {
    twitter: '🐦',
    linkedin: '💼',
    instagram: '📸',
    facebook: '👥',
    tiktok: '🎵',
  };

  return emojis[platform] || '📱';
} 