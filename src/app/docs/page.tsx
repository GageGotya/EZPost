'use client';

import { Layout } from '@/components/layout/Layout';

export default function DocsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Documentation</h1>
            
            {/* Getting Started */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600 mb-4">
                  Welcome to EZPost! This guide will help you get started with our platform and make the most of our AI-powered social media management tools.
                </p>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Quick Start Guide</h3>
                <ol className="list-decimal pl-4 space-y-2 text-gray-600">
                  <li>Sign up for an account</li>
                  <li>Connect your social media accounts</li>
                  <li>Create your first AI-generated post</li>
                  <li>Schedule and publish content</li>
                  <li>Monitor analytics and performance</li>
                </ol>
              </div>
            </section>

            {/* Troubleshooting */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Troubleshooting</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Connection Issues</h3>
                  <p className="text-gray-600 mb-2">
                    If you're having trouble connecting your social media accounts:
                  </p>
                  <ul className="list-disc pl-4 space-y-2 text-gray-600">
                    <li>Ensure you're logged into your social media account</li>
                    <li>Check if you have the necessary permissions</li>
                    <li>Try disconnecting and reconnecting the account</li>
                    <li>Clear your browser cache and cookies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Content Generation</h3>
                  <p className="text-gray-600 mb-2">
                    Tips for optimal AI content generation:
                  </p>
                  <ul className="list-disc pl-4 space-y-2 text-gray-600">
                    <li>Provide clear and specific prompts</li>
                    <li>Include relevant keywords</li>
                    <li>Specify your target audience</li>
                    <li>Review and edit generated content</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Tips & Tricks */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tips & Tricks</h2>
              <div className="grid gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Optimal Posting Times</h3>
                  <p className="text-gray-600">
                    Our AI analyzes your audience's engagement patterns to determine the best times to post. Check the analytics section for personalized recommendations.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Content Strategy</h3>
                  <p className="text-gray-600">
                    Mix different types of content (text, images, videos) and use our AI to maintain a consistent brand voice across all platforms.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Analytics Insights</h3>
                  <p className="text-gray-600">
                    Regularly review your analytics to understand what content performs best and adjust your strategy accordingly.
                  </p>
                </div>
              </div>
            </section>

            {/* Support */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need More Help?</h2>
              <p className="text-gray-600">
                If you need additional assistance, don't hesitate to contact our support team at{' '}
                <a href="mailto:support@ezpost.com" className="text-blue-600 hover:text-blue-800">
                  support@ezpost.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 