'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

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
          return;
        }

        // Check if user exists in Supabase
        const { data: userPrefs } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (!userPrefs) {
          // New user - create preferences
          await supabase.from('user_preferences').insert({
            user_id: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: user.fullName || user.firstName || '',
          });

          // Create initial credits
          await supabase.from('user_credits').insert({
            user_id: user.id,
            credits_remaining: 100, // Initial free credits
          });
        }

        // Redirect to dashboard
        router.replace('/dashboard');
      } catch (error) {
        console.error('Redirect error:', error);
        router.replace('/dashboard');
      }
    };

    handleRedirect();
  }, [isLoaded, user, router, isRedirecting]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Setting up your account...
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Just a moment while we get everything ready for you.
        </p>
      </div>
    </div>
  );
} 