import type { Database } from '@/lib/supabase/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Analytics = Database['public']['Tables']['post_analytics']['Row'] & {
  platform: string;
  metric: string;
  value: number;
};

interface PlatformStatsProps {
  analytics: Analytics[];
}

export function PlatformStats({ analytics }: PlatformStatsProps) {
  // Group analytics by platform
  const platformData = analytics.reduce((acc, stat) => {
    const platform = stat.platform;
    if (!acc[platform]) {
      acc[platform] = {
        platform,
        likes: 0,
        comments: 0,
        shares: 0,
      };
    }
    acc[platform].likes += stat.likes;
    acc[platform].comments += stat.comments;
    acc[platform].shares += stat.shares;
    return acc;
  }, {} as Record<string, any>);

  const data = Object.values(platformData);

  return (
    <div className="h-96 w-full">
      <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="platform" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="likes" fill="#8884d8" name="Likes" />
          <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
          <Bar dataKey="shares" fill="#ffc658" name="Shares" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 