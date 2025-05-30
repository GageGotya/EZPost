import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  plan: 'business' | 'enterprise';
};

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'business' | 'enterprise'>('business');
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          plan: selectedPlan,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      toast.success('Account created successfully!');
      router.push('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="name" className="sr-only">
            Full name
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            id="name"
            type="text"
            autoComplete="name"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            placeholder="Full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            id="email"
            type="email"
            autoComplete="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            id="password"
            type="password"
            autoComplete="new-password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            placeholder="Password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm password
          </label>
          <input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value =>
                value === password || 'The passwords do not match',
            })}
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Select your plan</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className={`relative rounded-lg border p-4 cursor-pointer ${
              selectedPlan === 'business'
                ? 'border-primary ring-2 ring-primary'
                : 'border-gray-300'
            }`}
            onClick={() => setSelectedPlan('business')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Business</p>
                  <p className="text-gray-500">$79/month</p>
                </div>
              </div>
              <div
                className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                  selectedPlan === 'business'
                    ? 'border-transparent bg-primary'
                    : 'border-gray-300'
                }`}
              >
                {selectedPlan === 'business' && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div
            className={`relative rounded-lg border p-4 cursor-pointer ${
              selectedPlan === 'enterprise'
                ? 'border-primary ring-2 ring-primary'
                : 'border-gray-300'
            }`}
            onClick={() => setSelectedPlan('enterprise')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Enterprise</p>
                  <p className="text-gray-500">$199/month</p>
                </div>
              </div>
              <div
                className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                  selectedPlan === 'enterprise'
                    ? 'border-transparent bg-primary'
                    : 'border-gray-300'
                }`}
              >
                {selectedPlan === 'enterprise' && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          ) : (
            'Create your account'
          )}
        </button>
      </div>

      <div className="text-sm text-center text-gray-600">
        By signing up, you agree to our{' '}
        <a href="/terms" className="font-medium text-primary hover:text-primary/90">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="font-medium text-primary hover:text-primary/90">
          Privacy Policy
        </a>
      </div>
    </form>
  );
} 