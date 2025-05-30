import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { useUserCredits } from '@/hooks/useUserCredits';
import { PRICING_TIERS } from '@/lib/pricing';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Credits() {
  const { credits } = useUserCredits();
  const [loading, setLoading] = useState(false);

  const creditHistory = [
    {
      id: 1,
      type: 'purchase',
      amount: 30,
      date: '2024-03-15T10:30:00Z',
      description: 'Growth Plan Purchase',
    },
    {
      id: 2,
      type: 'used',
      amount: -1,
      date: '2024-03-16T14:20:00Z',
      description: 'Content Generation - Twitter',
    },
    {
      id: 3,
      type: 'used',
      amount: -1,
      date: '2024-03-16T14:20:00Z',
      description: 'Content Generation - LinkedIn',
    },
    {
      id: 4,
      type: 'bonus',
      amount: 5,
      date: '2024-03-17T09:00:00Z',
      description: 'Referral Bonus',
    },
  ];

  const handlePurchase = async (tierId: string) => {
    setLoading(true);
    try {
      // Here we would integrate with Stripe
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Purchase successful!');
    } catch (error) {
      toast.error('Failed to process payment');
      console.error('Purchase error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Credits</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your content generation credits and purchase history.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Credit Status */}
          <div className="mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Credit Balance
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>You currently have {credits.available} credits available.</p>
                </div>
                <div className="mt-5">
                  <div className="rounded-md bg-gray-50 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">
                        Total Credits Used
                      </div>
                      <div className="text-sm text-gray-500">{credits.used}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Options */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Purchase Credits</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative rounded-lg border p-6 ${
                    tier.recommended
                      ? 'border-blue-600 ring-2 ring-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-2 right-4 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-gray-500">{tier.credits} credits</p>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-gray-900">
                    ${tier.price}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    ${(tier.price / tier.credits).toFixed(2)} per credit
                  </p>
                  <Button
                    variant={tier.recommended ? 'primary' : 'outline'}
                    fullWidth
                    className="mt-6"
                    loading={loading}
                    onClick={() => handlePurchase(tier.id)}
                  >
                    Purchase
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Credit History */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Credit History</h2>
            <div className="mt-4 bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flow-root">
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {creditHistory.map((item) => (
                      <li key={item.id} className="py-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.description}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {new Date(item.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                              })}
                            </p>
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              item.amount > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {item.amount > 0 ? '+' : ''}
                            {item.amount} credits
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 