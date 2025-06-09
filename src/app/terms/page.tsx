'use client';

import { Layout } from '@/components/layout/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="prose prose-blue max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
                <p className="text-gray-600">
                  By accessing or using EZPost, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Permission is granted to temporarily access and use EZPost for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose</li>
                    <li>Attempt to decompile or reverse engineer any software contained on EZPost</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                  </p>
                  <p>
                    You are responsible for safeguarding the password that you use to access the platform and for any activities or actions under your password.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Some features of EZPost require payment. You agree to pay all fees or charges to your account based on our fees, charges, and billing terms in effect at the time.
                  </p>
                  <p>
                    If you dispute any charges you must let us know within sixty (60) days after the date that we invoice you.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content Guidelines</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    You are responsible for all content you post through our platform. Content must not:
                  </p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Be unlawful, harmful, threatening, abusive, harassing, defamatory, or invasive of privacy</li>
                    <li>Infringe any patent, trademark, trade secret, copyright, or other intellectual property</li>
                    <li>Contain software viruses or any other malicious code</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-600">
                  EZPost shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-600">
                  We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600">
                  Questions about the Terms should be sent to us at{' '}
                  <a href="mailto:legal@ezpost.com" className="text-blue-600 hover:text-blue-800">
                    legal@ezpost.com
                  </a>
                </p>
                <p className="text-gray-600 mt-4">
                  Last Updated: {new Date().toLocaleDateString()}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 