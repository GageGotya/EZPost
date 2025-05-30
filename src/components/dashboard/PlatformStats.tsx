import { Analytics } from '@prisma/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PlatformStatsProps {
  analytics: Analytics[];
}

interface PlatformMetrics {
  platform: string;
  engagement: number;
  reach: number;
  clicks: number;
  conversions: number;
}

export function PlatformStats({ analytics }: PlatformStatsProps) {
  const platformData = calculatePlatformMetrics(analytics);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={platformData}
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
          <Bar dataKey="engagement" fill="#8884d8" name="Engagement" />
          <Bar dataKey="reach" fill="#82ca9d" name="Reach" />
          <Bar dataKey="clicks" fill="#ffc658" name="Clicks" />
          <Bar dataKey="conversions" fill="#ff7300" name="Conversions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function calculatePlatformMetrics(analytics: Analytics[]): PlatformMetrics[] {
  // Group analytics by platform
  const platformMetrics = analytics.reduce((acc, analytic) => {
    if (!acc[analytic.platform]) {
      acc[analytic.platform] = {
        platform: getPlatformDisplayName(analytic.platform),
        engagement: 0,
        reach: 0,
        clicks: 0,
        conversions: 0,
      };
    }

    switch (analytic.metric) {
      case 'likes':
      case 'comments':
      case 'shares':
        acc[analytic.platform].engagement += analytic.value;
        break;
      case 'impressions':
        acc[analytic.platform].reach += analytic.value;
        break;
      case 'clicks':
        acc[analytic.platform].clicks += analytic.value;
        break;
      case 'conversions':
        acc[analytic.platform].conversions += analytic.value;
        break;
    }

    return acc;
  }, {} as Record<string, PlatformMetrics>);

  return Object.values(platformMetrics);
}

function getPlatformDisplayName(platform: string): string {
  const displayNames: Record<string, string> = {
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok',
  };

  return displayNames[platform] || platform;
} 