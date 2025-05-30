import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authConfig } from '../api/auth/[...nextauth]/route';
import DashboardNav from '@/components/dashboard/DashboardNav';
import { Toaster } from 'react-hot-toast';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={session.user} />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
} 