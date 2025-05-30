import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const platforms = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: '/icons/twitter.svg',
    description: 'Connect your Twitter account to post tweets and threads',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '/icons/facebook.svg',
    description: 'Connect your Facebook page or profile',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '/icons/instagram.svg',
    description: 'Connect your Instagram business account',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/icons/linkedin.svg',
    description: 'Connect your LinkedIn profile or company page',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '/icons/tiktok.svg',
    description: 'Connect your TikTok creator account',
  },
];

export default function SocialAccountConnector() {
  const router = useRouter();

  const handleConnect = async (platform: string) => {
    try {
      const response = await fetch(`/api/auth/${platform}/connect`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initiate connection');
      }

      // Redirect to the platform's OAuth page
      window.location.href = data.authUrl;
    } catch (error) {
      toast.error('Failed to connect account. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {platforms.map((platform) => (
        <div
          key={platform.id}
          className="relative rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                src={platform.icon}
                alt={platform.name}
                className="h-12 w-12"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {platform.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {platform.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => handleConnect(platform.id)}
                className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="col-span-full">
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                Need help connecting your accounts? Check out our{' '}
                <a href="/help" className="font-medium underline">
                  help guide
                </a>{' '}
                or{' '}
                <a href="/contact" className="font-medium underline">
                  contact support
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 