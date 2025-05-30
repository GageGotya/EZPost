import React from 'react';
import { Metadata } from 'next';
import SocialAccountConnector from '@/components/accounts/SocialAccountConnector';

export const metadata: Metadata = {
  title: 'Connect Accounts - EZPost',
  description: 'Connect your social media accounts to EZPost',
};

export default function ConnectAccountsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Connect Social Media Accounts
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Connect your social media accounts to start automating your content
        </p>
      </div>

      <SocialAccountConnector />
    </div>
  );
} 