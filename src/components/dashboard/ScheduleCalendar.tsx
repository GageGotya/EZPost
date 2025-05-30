import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import type { Database } from '@/lib/supabase/types';
import { format } from 'date-fns';
import type { DayProps } from 'react-day-picker';

type Post = Database['public']['Tables']['social_posts']['Row'];

interface ScheduleCalendarProps {
  posts: Post[];
}

export function ScheduleCalendar({ posts }: ScheduleCalendarProps) {
  const [date, setDate] = useState<Date>(new Date());

  // Group posts by date
  const postsByDate = posts.reduce((acc, post) => {
    if (!post.scheduled_for) return acc;
    
    const dateStr = format(new Date(post.scheduled_for), 'yyyy-MM-dd');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  // Create calendar day content
  const getDayContent = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayPosts = postsByDate[dateStr] || [];
    
    return (
      <div className="w-full h-full min-h-[80px] p-1">
        <div className="text-sm font-medium">{format(day, 'd')}</div>
        {dayPosts.map((post) => (
          <div
            key={post.id}
            className={`text-xs p-1 mt-1 rounded truncate ${
              getStatusColor(post.status)
            }`}
            title={post.content}
          >
            {format(new Date(post.scheduled_for!), 'HH:mm')} - {getPlatformEmoji(post.platform)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(newDate: Date | undefined) => newDate && setDate(newDate)}
        className="rounded-md border"
        components={{
          Day: ({ day }: DayProps) => getDayContent(day.date),
        }}
      />
    </div>
  );
}

function getStatusColor(status: string): string {
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
  switch (platform) {
    case 'twitter':
      return '🐦';
    case 'linkedin':
      return '💼';
    case 'instagram':
      return '📸';
    case 'facebook':
      return '👥';
    case 'tiktok':
      return '🎵';
    default:
      return '📱';
  }
} 