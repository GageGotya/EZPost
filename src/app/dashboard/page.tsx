import { Metadata } from 'next';
import Link from 'next/link';
import {
  PencilSquareIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Dashboard | EZPost',
  description: 'Manage your social media content and analytics',
};

const features = [
  {
    name: 'Content Creation',
    description: 'Create and schedule engaging social media content with AI assistance',
    href: '/dashboard/content',
    icon: PencilSquareIcon,
  },
  {
    name: 'Analytics',
    description: 'Track performance metrics across all your social media platforms',
    href: '/dashboard/analytics',
    icon: ChartBarIcon,
  },
  {
    name: 'Schedule',
    description: 'Plan and organize your content calendar efficiently',
    href: '/dashboard/schedule',
    icon: CalendarIcon,
  },
  {
    name: 'Social Accounts',
    description: 'Manage your connected social media accounts',
    href: '/dashboard/accounts',
    icon: UserGroupIcon,
  },
  {
    name: 'Templates',
    description: 'Access and customize content templates for quick posting',
    href: '/dashboard/templates',
    icon: DocumentTextIcon,
  },
  {
    name: 'Settings',
    description: 'Configure your account preferences and notifications',
    href: '/dashboard/settings',
    icon: CogIcon,
  },
];

export default function DashboardPage() {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome to EZPost</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your social media presence efficiently with our AI-powered tools.
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.name}
                href={feature.href}
                className="relative group rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out"
              >
                <div>
                  <span className="inline-flex rounded-lg bg-blue-50 p-3">
                    <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-8 rounded-lg bg-blue-50 p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Need Help?</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Check out our comprehensive documentation:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      <Link href="/docs" className="text-blue-600 hover:text-blue-500 font-medium">
                        Documentation Overview
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs/troubleshooting" className="text-blue-600 hover:text-blue-500 font-medium">
                        Troubleshooting Guide
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs/api" className="text-blue-600 hover:text-blue-500 font-medium">
                        API Reference
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 