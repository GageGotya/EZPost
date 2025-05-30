import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Platform } from '@/lib/types';
import {
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ShareIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

interface EngagementMetric {
  id: string;
  name: string;
  stat: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ForwardRefExoticComponent<any>;
}

interface PlatformMetric {
  platform: Platform;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  };
  trend: 'up' | 'down';
  percentage: string;
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const stats: EngagementMetric[] = [
    {
      id: 'total_engagement',
      name: 'Total Engagement',
      stat: '2,651',
      change: '12%',
      changeType: 'increase',
      icon: ChartBarIcon,
    },
    {
      id: 'likes',
      name: 'Likes',
      stat: '1,423',
      change: '8.2%',
      changeType: 'increase',
      icon: HeartIcon,
    },
    {
      id: 'comments',
      name: 'Comments',
      stat: '842',
      change: '5.4%',
      changeType: 'increase',
      icon: ChatBubbleLeftIcon,
    },
    {
      id: 'shares',
      name: 'Shares',
      stat: '386',
      change: '3.2%',
      changeType: 'decrease',
      icon: ShareIcon,
    },
  ];

  const platformMetrics: PlatformMetric[] = [
    {
      platform: 'twitter',
      metrics: {
        likes: 523,
        comments: 245,
        shares: 128,
        reach: 12500,
      },
      trend: 'up',
      percentage: '12%',
    },
    {
      platform: 'linkedin',
      metrics: {
        likes: 412,
        comments: 189,
        shares: 95,
        reach: 8900,
      },
      trend: 'up',
      percentage: '18%',
    },
    {
      platform: 'instagram',
      metrics: {
        likes: 892,
        comments: 356,
        shares: 145,
        reach: 15600,
      },
      trend: 'down',
      percentage: '5%',
    },
  ];

  const getPlatformIcon = (platform: Platform) => {
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
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your social media performance and engagement metrics.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Time Range Selector */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h3 className="text-lg font-medium text-gray-900">Performance Overview</h3>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <div className="flex space-x-2">
                  {(['7d', '30d', '90d'] as const).map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? 'primary' : 'outline'}
                      onClick={() => setTimeRange(range)}
                    >
                      {range === '7d' ? 'Week' : range === '30d' ? 'Month' : '3 Months'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-8">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-blue-500 p-3">
                      <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                    <p
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {item.changeType === 'increase' ? (
                        <ArrowUpIcon
                          className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowDownIcon
                          className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                          aria-hidden="true"
                        />
                      )}
                      <span className="sr-only">
                        {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                      </span>
                      {item.change}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Platform Performance */}
          <div className="mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Platform Performance
                </h3>
                <div className="mt-6 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                              Platform
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Likes
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Comments
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Shares
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Reach
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Trend
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {platformMetrics.map((platform) => (
                            <tr key={platform.platform}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="flex items-center">
                                  <span className="text-2xl mr-2">
                                    {getPlatformIcon(platform.platform)}
                                  </span>
                                  <span className="font-medium text-gray-900 capitalize">
                                    {platform.platform}
                                  </span>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {platform.metrics.likes.toLocaleString()}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {platform.metrics.comments.toLocaleString()}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {platform.metrics.shares.toLocaleString()}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {platform.metrics.reach.toLocaleString()}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <div
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    platform.trend === 'up'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {platform.trend === 'up' ? (
                                    <ArrowUpIcon
                                      className="-ml-1 mr-1.5 h-4 w-4"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <ArrowDownIcon
                                      className="-ml-1 mr-1.5 h-4 w-4"
                                      aria-hidden="true"
                                    />
                                  )}
                                  {platform.percentage}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 