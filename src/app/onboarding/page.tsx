'use client';

import { Layout } from '@/components/layout/Layout';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoaded || isRedirecting) return;

    const handleRedirect = async () => {
      setIsRedirecting(true);
      if (!user) {
        router.push('/');
      } else {
        router.push('/dashboard');
      }
    };

    handleRedirect();
  }, [isLoaded, user, router, isRedirecting]);

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