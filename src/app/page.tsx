import Link from 'next/link';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { LandingLayout } from '@/components/layout/LandingLayout';
import { Button } from '@/components/ui/Button';
import {
  BoltIcon,
  ChartBarIcon,
  ClockIcon,
  SparklesIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI-Powered Content Generation',
    description:
      'Create engaging social media content in seconds with our advanced AI technology.',
    icon: SparklesIcon,
  },
  {
    name: 'Smart Scheduling',
    description:
      'Let AI determine the best times to post for maximum engagement across all platforms.',
    icon: ClockIcon,
  },
  {
    name: 'Multi-Platform Support',
    description:
      'Manage content for Twitter, LinkedIn, Instagram, Facebook, and TikTok from one place.',
    icon: UserGroupIcon,
  },
  {
    name: 'Performance Analytics',
    description:
      'Track engagement, reach, and growth with detailed analytics and insights.',
    icon: ChartBarIcon,
  },
  {
    name: 'Quick Setup',
    description:
      'Get started in minutes with our intuitive interface and guided onboarding.',
    icon: BoltIcon,
  },
  {
    name: 'Customizable Settings',
    description:
      'Tailor the content generation to match your brand voice and preferences.',
    icon: WrenchScrewdriverIcon,
  },
];

const testimonials = [
  {
    content:
      "EZPost has transformed how we manage our social media. The AI-generated content is incredibly engaging and saves us hours every week.",
    author: {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      company: 'TechStart Inc.',
    },
  },
  {
    content:
      "The smart scheduling feature is a game-changer. Our engagement has increased by 150% since we started using EZPost.",
    author: {
      name: 'Michael Rodriguez',
      role: 'Social Media Manager',
      company: 'Growth Labs',
    },
  },
  {
    content:
      "As a small business owner, EZPost has been invaluable. It's like having a full social media team at a fraction of the cost.",
    author: {
      name: 'Emily Thompson',
      role: 'Founder',
      company: 'The Modern Boutique',
    },
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
          <div className="text-2xl font-bold text-primary-600">EZPost</div>
          <div className="space-x-4">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <SignInButton mode="modal">
              <button className="text-primary-600 hover:text-primary-700">Sign In</button>
            </SignInButton>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="py-24 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Social Media Management
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Create, schedule, and analyze your social media content across all platforms with the power of AI.
          </p>
          <SignUpButton mode="modal">
            <button className="btn-primary text-lg px-8 py-3">
              Get Started Free
            </button>
          </SignUpButton>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">AI Content Creation</h3>
            <p className="text-gray-600">Generate engaging content optimized for each platform automatically.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Smart Scheduling</h3>
            <p className="text-gray-600">Post at the perfect time with AI-powered scheduling optimization.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
            <p className="text-gray-600">Get detailed analytics and AI-driven recommendations to improve engagement.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 