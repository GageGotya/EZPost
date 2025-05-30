import { Post } from '@prisma/client';
import { formatDate, formatTime, truncateText, getRelativeTimeString } from '@/lib/utils';

interface UpcomingPostsProps {
  posts: Post[];
}

export function UpcomingPosts({ posts }: UpcomingPostsProps) {
  // Filter and sort upcoming posts
  const upcomingPosts = posts
    .filter(post => post.status === 'scheduled' && post.scheduledFor > new Date())
    .sort((a, b) => a.scheduledFor!.getTime() - b.scheduledFor!.getTime())
    .slice(0, 5); // Show only next 5 posts

  if (upcomingPosts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No upcoming posts scheduled
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {upcomingPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {truncateText(post.content, 100)}
              </p>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <span className="truncate">
                  {formatDate(post.scheduledFor!)} at {formatTime(post.scheduledFor!)}
                </span>
                <span className="mx-2">•</span>
                <span className="text-primary-600">
                  {getRelativeTimeString(post.scheduledFor!)}
                </span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              {post.platforms.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
                >
                  {getPlatformEmoji(platform)} {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
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