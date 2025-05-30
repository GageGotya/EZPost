import { PricingTier } from './types';

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 10,
    price: 15,
    features: [
      '10 AI-generated posts',
      'Basic scheduling',
      'Platform optimization',
      'Hashtag suggestions'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    credits: 30,
    price: 39,
    recommended: true,
    features: [
      '30 AI-generated posts',
      'Advanced scheduling',
      'Platform optimization',
      'Hashtag suggestions',
      'Best time to post',
      'Basic analytics'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    credits: 100,
    price: 99,
    features: [
      '100 AI-generated posts',
      'Advanced scheduling',
      'Platform optimization',
      'Hashtag suggestions',
      'Best time to post',
      'Advanced analytics',
      'Priority support',
      'Custom brand voice'
    ]
  }
];

// Calculate cost per post
export const COST_PER_POST = {
  starter: 1.50,  // $15/10 posts
  growth: 1.30,   // $39/30 posts
  pro: 0.99       // $99/100 posts
};

// Subscription savings compared to pay-as-you-go
export const SUBSCRIPTION_SAVINGS = {
  starter: '25%',
  growth: '35%',
  pro: '50%'
}; 