'use client';

import { Layout } from '@/components/layout/Layout';
import { RedirectToSignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <RedirectToSignIn />
      </div>
    </Layout>
  );
} 