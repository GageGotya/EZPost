'use client';

import { Layout } from '@/components/layout/Layout';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/');
      return;
    }

    // You can add any onboarding steps here
    // For now, we'll just redirect to dashboard
    if (isLoaded && user) {
      router.push('/dashboard');
    }
  }, [isLoaded, user, router]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Setting up your account...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Just a moment while we get everything ready for you.
          </p>
        </div>
      </div>
    </Layout>
  );
} 