'use client';

import { Layout } from '@/components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              At EZPost, we're revolutionizing how businesses approach social media management. Our mission is to make professional-grade social media tools accessible and powerful through cutting-edge AI technology and intuitive design. We believe every business should have the tools and capabilities to excel in the digital space, regardless of their size or resources.
            </p>
          </div>

          {/* Story Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Story</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-500">
                  Born from the challenges faced by modern businesses in managing their social media presence, EZPost was created to make professional social media management accessible and efficient. We understand that maintaining an engaging social media presence is crucial for business success, yet it can be overwhelming and time-consuming.
                </p>
              </div>
              <div>
                <p className="text-gray-500">
                  By harnessing the power of advanced AI technology, we've developed a platform that not only saves valuable time but also enhances the quality and effectiveness of social media content. Our AI learns your unique brand voice and automatically generates engaging, platform-optimized content that resonates with your audience.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Innovation First</h4>
                <p className="text-gray-500">
                  We continuously push the boundaries of AI technology to deliver cutting-edge solutions that transform social media management.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">User-Centric Design</h4>
                <p className="text-gray-500">
                  We believe powerful tools should be intuitive and accessible, making professional social media management effortless for everyone.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Customer Success</h4>
                <p className="text-gray-500">
                  Your growth is our priority. We're committed to providing the tools and support you need to achieve exceptional results on social media.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h4 className="text-lg font-semibold text-gray-900">Gage Ayala</h4>
                <p className="text-gray-500">Founder & CEO</p>
                <p className="mt-2 text-sm text-gray-500">Visionary leader focused on making professional social media management accessible to all businesses.</p>
              </div>
              <div className="text-center">
                <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h4 className="text-lg font-semibold text-gray-900">Emily Funk</h4>
                <p className="text-gray-500">Lead Design</p>
                <p className="mt-2 text-sm text-gray-500">Creative force behind our intuitive user interface and seamless user experience.</p>
              </div>
              <div className="text-center">
                <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h4 className="text-lg font-semibold text-gray-900">Alex Mitchell</h4>
                <p className="text-gray-500">Software Engineer</p>
                <p className="mt-2 text-sm text-gray-500">Technical expert driving our AI innovation and platform development.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 