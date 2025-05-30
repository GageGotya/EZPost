import React from 'react';
import { Metadata } from 'next';
import SignupForm from '@/components/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up - EZPost',
  description: 'Create your EZPost account and start managing your social media presence',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Start your 14-day free trial
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-primary hover:text-primary/90">
              Sign in
            </a>
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
} 