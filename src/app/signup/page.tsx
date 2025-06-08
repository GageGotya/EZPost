'use client';

import { Layout } from '@/components/layout/Layout';
import { SignUp as ClerkSignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <ClerkSignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full max-w-md",
              card: "bg-white shadow-md rounded-lg p-8",
            }
          }}
          routing="path"
          path="/signup"
          signInUrl="/login"
          redirectUrl="/dashboard"
        />
      </div>
    </Layout>
  );
} 