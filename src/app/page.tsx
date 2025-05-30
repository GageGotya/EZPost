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
    <LandingLayout>
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="/pricing" className="inline-flex space-x-6">
                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                  What's new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>Just shipped v1.0</span>
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              AI-Powered Social Media Management Made Simple
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create engaging content, schedule posts, and grow your social media presence with the power of AI.
              Save time and boost engagement across all your platforms.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button onClick={() => window.location.href = '/signup'}>
                Get started
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/features'}
              >
                Learn more
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <img
                src="/dashboard-preview.png"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Powerful features for modern social media management
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Streamline your social media workflow with our comprehensive suite of tools and AI-powered features.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon
                      className="h-5 w-5 flex-none text-blue-600"
                      aria-hidden="true"
                    />
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

      {/* Testimonial section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by businesses worldwide
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author.name}
                  className="pt-8 sm:inline-block sm:w-full sm:px-4"
                >
                  <figure className="rounded-2xl bg-white p-8 text-sm leading-6">
                    <blockquote className="text-gray-900">
                      <p>{`"${testimonial.content}"`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.author.name}
                        </div>
                        <div className="text-gray-600">{`${testimonial.author.role}, ${testimonial.author.company}`}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to transform your social media?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of businesses using EZPost to create engaging content and grow their social media presence.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button onClick={() => window.location.href = '/signup'}>
                Get started today
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/pricing'}
              >
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
} 