'use client';

import { Layout } from '@/components/layout/Layout';
import Link from 'next/link';
import {
  SparklesIcon,
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI-Powered Content',
    description: 'Generate engaging posts optimized for each platform',
    icon: SparklesIcon,
  },
  {
    name: 'Smart Scheduling',
    description: 'Post at the perfect time for maximum engagement',
    icon: ClockIcon,
  },
  {
    name: 'Analytics & Insights',
    description: 'Track performance with detailed metrics and AI recommendations',
    icon: ChartBarIcon,
  },
  {
    name: 'Multi-Platform',
    description: 'Manage all your social accounts in one place',
    icon: UserGroupIcon,
  },
  {
    name: 'Quick Setup',
    description: 'Get started in minutes with our guided onboarding',
    icon: BoltIcon,
  },
  {
    name: 'Brand Voice',
    description: 'AI learns and maintains your unique brand voice',
    icon: WrenchScrewdriverIcon,
  },
];

const testimonials = [
  {
    name: 'Michael Roberts',
    role: 'Marketing Director',
    company: 'TechFlow Solutions',
    content: 'EZPost has transformed how we manage our social media. The AI-generated content is spot-on with our brand voice, and the scheduling features save us hours every week.',
  },
  {
    name: 'Sarah Thompson',
    role: 'Small Business Owner',
    company: 'Bloom Boutique',
    content: 'As a small business owner, I was struggling to maintain a consistent social media presence. EZPost made it simple and effective. The results have been amazing!',
  },
  {
    name: 'David Chen',
    role: 'Social Media Manager',
    company: 'Growth Digital',
    content: 'The analytics and AI recommendations have helped us optimize our posting strategy. Our engagement rates have increased significantly since using EZPost.',
  },
];

export default function Home() {
  return (
    <Layout>
      <div className="relative isolate">
        {/* Background gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-purple-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        {/* Hero Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-6xl font-bold text-blue-600 mb-8">
                EZPOST
              </h1>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                AI-Powered Social Media Management
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Create, schedule, and analyze your social media content across all platforms with the power of AI.
                Save time and boost engagement with smart automation.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/signup"
                  className="rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get Started
                </Link>
                <Link href="/pricing" className="text-lg font-semibold leading-6 text-gray-900">
                  View Pricing <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Everything You Need</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Powerful Features for Modern Social Media
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our AI-powered platform helps you create engaging content, schedule posts at optimal times, and track performance across all your social media channels.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Testimonials</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What Our Clients Say
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex flex-col bg-white p-8 shadow-lg rounded-xl">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  </div>
                  <div className="mt-6">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
          <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
            <div className="ml-[max(50%-11rem,3.5rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-600 to-purple-400 opacity-30 sm:ml-[max(50%-30rem,25rem)] sm:w-[72.1875rem]" />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Transform Your Social Media?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Take your social media presence to the next level with our AI-powered platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get Started
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn More <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 