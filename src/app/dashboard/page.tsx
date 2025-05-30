import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Create New Post</h3>
            <p className="text-gray-600">Generate AI-powered content for your social media.</p>
          </button>
          
          <button className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">View Analytics</h3>
            <p className="text-gray-600">Check your social media performance metrics.</p>
          </button>
          
          <button className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Schedule Posts</h3>
            <p className="text-gray-600">Manage your content calendar.</p>
          </button>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="text-gray-600">
            No recent activity to display.
          </div>
        </div>
        
        {/* Performance Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <div className="text-gray-600">
            Connect your social media accounts to view performance metrics.
          </div>
        </div>
      </div>
    </div>
  );
} 