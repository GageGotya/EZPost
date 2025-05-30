'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Platform } from '@/lib/types';
import toast from 'react-hot-toast';
import {
  CalendarIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface ScheduledPost {
  id: number;
  content: string;
  platform: Platform;
  scheduledFor: string;
  status: 'scheduled' | 'published' | 'failed';
}

export default function Schedule() {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock data for scheduled posts
  const scheduledPosts: ScheduledPost[] = [
    {
      id: 1,
      content: "Excited to announce our latest product update! 🚀 Check out the new features that will revolutionize your workflow...",
      platform: 'twitter',
      scheduledFor: '2024-03-20T15:00:00Z',
      status: 'scheduled',
    },
    {
      id: 2,
      content: "We're thrilled to share insights from our recent industry survey. The results show that 78% of businesses are now adopting AI...",
      platform: 'linkedin',
      scheduledFor: '2024-03-21T12:30:00Z',
      status: 'scheduled',
    },
    {
      id: 3,
      content: "✨ Transform your social media strategy with AI-powered content creation. Swipe to learn more about our latest features...",
      platform: 'instagram',
      scheduledFor: '2024-03-22T09:15:00Z',
      status: 'scheduled',
    },
  ];

  const handleEdit = (postId: number) => {
    // Implement edit functionality
    toast.error('Edit functionality coming soon!');
  };

  const handleDelete = async (postId: number) => {
    if (!window.confirm('Are you sure you want to delete this scheduled post?')) {
      return;
    }

    setLoading(true);
    try {
      // Here we would call the API to delete the post
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
      console.error('Delete post error:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-semibold text-gray-900">Content Schedule</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage your scheduled social media posts.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            {/* Calendar View */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Upcoming Posts
                  </h3>
                  <Button
                    onClick={() => {
                      // Navigate to content generation page
                    }}
                  >
                    Create New Post
                  </Button>
                </div>

                {/* Posts List */}
                <div className="mt-6 flow-root">
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {scheduledPosts.map((post) => (
                      <li key={post.id} className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-blue-500">
                          <div className="flex justify-between items-start">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl" aria-hidden="true">
                                  {getPlatformIcon(post.platform)}
                                </span>
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    post.status === 'published'
                                      ? 'bg-green-100 text-green-800'
                                      : post.status === 'scheduled'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                </span>
                              </div>
                              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                                {post.content}
                              </p>
                              <div className="mt-2 flex items-center space-x-4">
                                <div className="flex items-center text-sm text-gray-500">
                                  <CalendarIcon
                                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  {new Date(post.scheduledFor).toLocaleDateString()}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <ClockIcon
                                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  {new Date(post.scheduledFor).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="ml-4 flex flex-shrink-0 space-x-2">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={() => handleEdit(post.id)}
                              >
                                <span className="sr-only">Edit</span>
                                <PencilIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={() => handleDelete(post.id)}
                              >
                                <span className="sr-only">Delete</span>
                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {scheduledPosts.length === 0 && (
                  <div className="mt-6 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No scheduled posts</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating a new post.
                    </p>
                    <div className="mt-6">
                      <Button
                        onClick={() => {
                          // Navigate to content generation page
                        }}
                      >
                        Create New Post
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 