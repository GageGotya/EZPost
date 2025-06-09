'use client';

import { Layout } from '@/components/layout/Layout';

export default function TroubleshootingPage() {
  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Troubleshooting Guide</h1>
            
            <div className="prose prose-blue max-w-none space-y-12">
              {/* Account Issues */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account Issues</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Can't Log In</h3>
                    <div className="mt-2 text-gray-600">
                      <p className="mb-2">If you're having trouble logging in:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Make sure you're using the correct email address</li>
                        <li>Check if your password is correct (case sensitive)</li>
                        <li>Clear your browser cache and cookies</li>
                        <li>Try using a different browser</li>
                        <li>Use the "Forgot Password" link to reset your password</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Account Verification Issues</h3>
                    <div className="mt-2 text-gray-600">
                      <p className="mb-2">If you haven't received your verification email:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Check your spam/junk folder</li>
                        <li>Add support@ezpost.com to your safe senders list</li>
                        <li>Request a new verification email from your account settings</li>
                        <li>Contact support if the issue persists</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Social Media Connection Issues */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Social Media Connection Issues</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Failed to Connect Account</h3>
                    <div className="mt-2 text-gray-600">
                      <p className="mb-2">If you're having trouble connecting your social media accounts:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Ensure you're logged into the correct social media account</li>
                        <li>Check if you have the necessary permissions (e.g., admin access for Facebook pages)</li>
                        <li>Try disconnecting and reconnecting the account</li>
                        <li>Make sure you've granted all required permissions</li>
                        <li>Check if the platform's API is currently experiencing issues</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Lost Connection</h3>
                    <div className="mt-2 text-gray-600">
                      <p className="mb-2">If a previously connected account is no longer working:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Check if your social media account password has changed</li>
                        <li>Verify if the account's permissions are still valid</li>
                        <li>Reconnect the account through the dashboard</li>
                        <li>Ensure your account hasn't been suspended or restricted</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Content Generation Issues */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content Generation Issues</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">AI Generation Errors</h3>
                    <div className="mt-2 text-gray-600">
                      <p className="mb-2">If you're experiencing issues with AI content generation:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Check if you have sufficient credits</li>
                        <li>Make sure your prompt follows our guidelines</li>
                        <li>Try refreshing the page and generating again</li>
                        <li>Break down complex requests into simpler ones</li>
                        <li>Contact support if errors persist</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Content Quality Issues</h3>
                    <div className="mt-2 text-gray-600">
                      <p className="mb-2">To improve the quality of generated content:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Provide more detailed prompts</li>
                        <li>Update your business profile with specific information</li>
                        <li>Set the appropriate tone and style preferences</li>
                        <li>Use relevant keywords in your prompts</li>
                        <li>Review and adjust your target audience settings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Scheduling Issues */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Scheduling Issues</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Posts Not Publishing</h3>
                    <div className="mt-2 text-gray-600">
                      <p className="mb-2">If your scheduled posts aren't being published:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Verify your social media connections are active</li>
                        <li>Check if the content meets platform guidelines</li>
                        <li>Ensure your account has sufficient permissions</li>
                        <li>Review the scheduling timezone settings</li>
                        <li>Check for any platform-specific restrictions</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Scheduling Conflicts</h3>
                    <div className="mt-2 text-gray-600">
                      <p className="mb-2">To resolve scheduling conflicts:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Check for overlapping post times</li>
                        <li>Review your posting frequency settings</li>
                        <li>Adjust your optimal posting times</li>
                        <li>Consider platform-specific posting limits</li>
                        <li>Use the calendar view to spot conflicts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Support */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still Need Help?</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    If you're still experiencing issues or need additional assistance, our support team is here to help.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Email us at:{' '}
                      <a href="mailto:support@ezpost.com" className="text-blue-600 hover:text-blue-800">
                        support@ezpost.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      Response time: Within 24 hours
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 