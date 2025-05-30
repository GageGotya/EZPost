import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transform Your Social Media Presence with AI
              </h1>
              <p className="text-xl mb-8">
                Automate content creation, scheduling, and analytics across TikTok, LinkedIn, Instagram, Twitter, and Facebook with our AI-powered platform.
              </p>
              <Link href="/signup" className="btn-primary text-lg">
                Start Free Trial
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/dashboard-preview.png"
                alt="EZPost Dashboard Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose EZPost?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-white shadow-lg">
                <div className="text-primary text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="p-8 rounded-lg bg-white shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  ${plan.price}<span className="text-lg text-gray-500">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="btn-primary block text-center">
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Content Creation',
    description: 'Our advanced AI creates engaging, platform-optimized content that resonates with your audience.',
  },
  {
    icon: '📊',
    title: 'Smart Analytics',
    description: 'Track performance metrics and get AI-driven insights to improve your social media strategy.',
  },
  {
    icon: '🔄',
    title: 'Automated Scheduling',
    description: 'Set it and forget it with our intelligent posting schedule that maximizes engagement.',
  },
]

const pricingPlans = [
  {
    name: 'Business',
    price: 79,
    features: [
      '5 social media accounts',
      '60 AI-generated posts/month',
      'Advanced analytics',
      'Priority email support',
      'Custom branding',
      'Content calendar',
    ],
  },
  {
    name: 'Enterprise',
    price: 199,
    features: [
      'Unlimited social accounts',
      'Unlimited AI-generated posts',
      'Premium analytics & reporting',
      '24/7 priority support',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'Custom AI training',
    ],
  },
] 