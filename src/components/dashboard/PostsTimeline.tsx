import React from 'react';
import type { Database } from '@/lib/supabase/types';
import { formatDate, formatTime } from '@/lib/utils';

type Post = Database['public']['Tables']['social_posts']['Row'];

interface PostsTimelineProps {
  posts: Post[];
}

export function PostsTimeline({ posts }: PostsTimelineProps) {
  // Group posts by date
  const groupedPosts = posts.reduce((acc, post) => {
    const dateStr = post.scheduled_for || post.published_at;
    if (!dateStr) return acc;

    const date = new Date(dateStr);
    const formattedDate = formatDate(date);
    
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  // Sort dates in reverse chronological order
  const sortedDates = Object.keys(groupedPosts).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  if (sortedDates.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No posts found
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {sortedDates.map((date, dateIndex) => (
          <li key={date}>
            <div className="relative pb-8">
              {dateIndex !== sortedDates.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                    {getStatusIcon(groupedPosts[date][0].status)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">{date}</p>
                    {groupedPosts[date].map((post) => (
                      <div
                        key={post.id}
                        className="mt-2 text-sm text-gray-700"
                      >
                        <p className="font-medium">
                          {formatTime(new Date(post.scheduled_for || post.published_at!))}
                        </p>
                        <p className="mt-1">{post.content}</p>
                        <div className="mt-2 flex space-x-2">
                          <span
                            key={post.platform}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {getPlatformEmoji(post.platform)} {post.platform}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        getStatusStyle(groupedPosts[date][0].status)
                      }`}
                    >
                      {groupedPosts[date][0].status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getStatusIcon(status: string): string {
  switch (status) {
    case 'scheduled':
      return '⏰';
    case 'published':
      return '✅';
    case 'failed':
      return '❌';
    default:
      return '📝';
  }
}

function getStatusStyle(status: string): string {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'published':
      return 'bg-green-100 text-green-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
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