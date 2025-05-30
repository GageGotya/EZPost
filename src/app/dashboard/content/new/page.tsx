import React from 'react';
import { Metadata } from 'next';
import ContentGenerator from '@/components/content/ContentGenerator';

export const metadata: Metadata = {
  title: 'Create Content - EZPost',
  description: 'Generate AI-powered content for your social media accounts',
};

export default function NewContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Create New Content
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use our AI to generate engaging content for your social media accounts
        </p>
      </div>

      <ContentGenerator />
    </div>
  );
} 