'use client';

import { Layout } from '@/components/layout/Layout';
import { SignIn as ClerkSignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <ClerkSignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full max-w-md",
              card: "bg-white shadow-md rounded-lg p-8",
            }
          }}
          routing="path"
          path="/login"
          signUpUrl="/signup"
          redirectUrl="/dashboard"
        />
      </div>
    </Layout>
  );
} 