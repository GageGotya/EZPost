import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { useUserCredits } from '@/hooks/useUserCredits';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useState } from 'react';
import {
  ChartBarIcon,
  ClockIcon,
  CreditCardIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { credits } = useUserCredits();
  const { preferences } = useUserPreferences();
  const [loading, setLoading] = useState(false);

  const stats = [
    {
      name: 'Available Credits',
      value: credits.available,
      icon: CreditCardIcon,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Posts Generated',
      value: credits.used,
      icon: DocumentTextIcon,
      change: '+54.02%',
      changeType: 'positive',
    },
    {
      name: 'Scheduled Posts',
      value: 12,
      icon: ClockIcon,
      change: '+12.05%',
      changeType: 'positive',
    },
    {
      name: 'Engagement Rate',
      value: '4.5%',
      icon: ChartBarIcon,
      change: '+2.31%',
      changeType: 'positive',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      platform: 'twitter',
      content: 'Excited to announce our latest product update! 🚀 Check out the new features that will revolutionize your workflow...',
      status: 'scheduled',
      date: '2024-03-20T15:00:00Z',
    },
    {
      id: 2,
      platform: 'linkedin',
      content: 'We're thrilled to share insights from our recent industry survey. The results show that 78% of businesses are now adopting AI...',
      status: 'published',
      date: '2024-03-19T12:30:00Z',
    },
    {
      id: 3,
      platform: 'instagram',
      content: '✨ Transform your social media strategy with AI-powered content creation. Swipe to learn more about our latest features...',
      status: 'draft',
      date: '2024-03-18T09:15:00Z',
    },
  ];

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Stats */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-blue-500 p-3">
                      <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">
                      {stat.name}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </p>
                  </dd>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="mx-auto max-w-7xl">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Recent Activity
                  </h3>
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-my-5 divide-y divide-gray-200">
                      {recentActivity.map((post) => (
                        <li key={post.id} className="py-5">
                          <div className="relative focus-within:ring-2 focus-within:ring-blue-500">
                            <h3 className="text-sm font-semibold text-gray-800">
                              <span className="capitalize">{post.platform}</span>{' '}
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  post.status === 'published'
                                    ? 'bg-green-100 text-green-800'
                                    : post.status === 'scheduled'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {post.status}
                              </span>
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                              {post.content}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                              })}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        // Navigate to content page
                      }}
                    >
                      View all content
                    </Button>
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