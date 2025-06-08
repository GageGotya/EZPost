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
              Empowering businesses to thrive in the digital age with AI-powered social media management.
            </p>
          </div>

          {/* Story Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Story</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-500">
                  EZPost was founded with a simple yet powerful vision: to make professional social media management accessible to businesses of all sizes. We recognized that maintaining an effective social media presence was becoming increasingly complex and time-consuming.
                </p>
              </div>
              <div>
                <p className="text-gray-500">
                  By leveraging cutting-edge AI technology, we've created a platform that not only saves time but also enhances the quality and effectiveness of social media content. Our AI understands your brand voice and automatically generates engaging content optimized for each platform.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h4>
                <p className="text-gray-500">
                  We continuously push the boundaries of what's possible with AI and social media management.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Simplicity</h4>
                <p className="text-gray-500">
                  We believe powerful tools should be easy to use, making social media management effortless.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Customer Success</h4>
                <p className="text-gray-500">
                  Your success is our success. We're committed to helping you achieve your social media goals.
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
              </div>
              <div className="text-center">
                <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h4 className="text-lg font-semibold text-gray-900">Sarah Chen</h4>
                <p className="text-gray-500">Head of AI</p>
              </div>
              <div className="text-center">
                <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h4 className="text-lg font-semibold text-gray-900">Marcus Johnson</h4>
                <p className="text-gray-500">Head of Product</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 