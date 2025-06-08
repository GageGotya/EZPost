import { Layout } from '@/components/layout/Layout';
import { PRICING_TIERS } from '@/lib/pricing';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Choose the perfect plan for your social media needs
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                  tier.recommended ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="p-6">
                  {tier.recommended && (
                    <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-600 mb-4">
                      RECOMMENDED
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                  <p className="mt-4 text-sm text-gray-500">
                    Perfect for {tier.id === 'starter' ? 'getting started' : tier.id === 'growth' ? 'growing businesses' : 'large organizations'}
                  </p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                    <span className="text-base font-medium text-gray-500">/mo</span>
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Includes {tier.credits} credits per month
                  </p>
                  <Link
                    href="/signup"
                    className={`mt-8 block w-full rounded-md py-2 px-4 text-center text-sm font-semibold text-white ${
                      tier.recommended ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h4 className="text-sm font-medium text-gray-900 tracking-wide">
                    What's included
                  </h4>
                  <ul className="mt-6 space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex space-x-3">
                        <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  What is a credit?
                </h4>
                <p className="text-gray-500">
                  A credit allows you to generate one AI-powered social media post optimized for your chosen platform.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Do credits roll over?
                </h4>
                <p className="text-gray-500">
                  Yes, unused credits roll over to the next month, up to a maximum of 2x your monthly credit allocation.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I change plans?
                </h4>
                <p className="text-gray-500">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Is there a free trial?
                </h4>
                <p className="text-gray-500">
                  Yes, all new accounts start with 5 free credits to try out our service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 