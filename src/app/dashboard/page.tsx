import { Suspense } from 'react';
import { PrismaClient } from '@prisma/client';
import { ScheduleCalendar } from '@/components/dashboard/ScheduleCalendar';
import { AnalyticsOverview } from '@/components/dashboard/AnalyticsOverview';
import { PlatformStats } from '@/components/dashboard/PlatformStats';
import { UpcomingPosts } from '@/components/dashboard/UpcomingPosts';
import { PostsTimeline } from '@/components/dashboard/PostsTimeline';

const prisma = new PrismaClient();

async function DashboardContent() {
  // Fetch user's posts
  const posts = await prisma.post.findMany({
    where: {
      status: {
        in: ['scheduled', 'published']
      }
    },
    orderBy: {
      scheduledFor: 'asc'
    },
    take: 50
  });

  // Fetch analytics
  const analytics = await prisma.analytics.findMany({
    where: {
      timestamp: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
      }
    },
    orderBy: {
      timestamp: 'asc'
    }
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsOverview analytics={analytics} />
      </div>

      {/* Calendar and Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Posting Schedule</h2>
          <ScheduleCalendar posts={posts} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Posts Timeline</h2>
          <PostsTimeline posts={posts} />
        </div>
      </div>

      {/* Platform Stats and Upcoming Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
          <PlatformStats analytics={analytics} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Posts</h2>
          <UpcomingPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
} 