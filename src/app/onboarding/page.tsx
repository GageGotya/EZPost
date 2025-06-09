'use client';

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
      try {
        if (!user) {
          router.replace('/');
        } else if (user.emailAddresses[0].verification.status !== 'verified') {
          // Wait for email verification
          return;
        } else {
          router.replace('/dashboard');
        }
      } catch (error) {
        console.error('Redirect error:', error);
        router.replace('/');
      }
    };

    handleRedirect();
  }, [isLoaded, user, router, isRedirecting]);

  if (!isLoaded || !user) {
    return null;
  }

  const isEmailVerified = user.emailAddresses[0].verification.status === 'verified';

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {!isEmailVerified
            ? "Please verify your email"
            : "Setting up your account..."}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {!isEmailVerified
            ? "Check your email for a verification link"
            : "Just a moment while we get everything ready for you."}
        </p>
      </div>
    </div>
  );
} 