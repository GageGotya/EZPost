'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { user, isLoaded: loaded } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    router.push('/login');
  };

  const signUp = async (email: string, password: string) => {
    router.push('/signup');
  };

  const signOut = async () => {
    await clerkSignOut();
    router.push('/');
  };

  return {
    user,
    loading: !loaded,
    signIn,
    signUp,
    signOut,
  };
} 