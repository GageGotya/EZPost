import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const currentPassword = formData.get('currentPassword') as string;
      const newPassword = formData.get('newPassword') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      if (newPassword !== confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }

      // Here we would call Firebase to update the password
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('Password updated successfully');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error('Failed to update password');
      console.error('Password update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(true);
    try {
      // Here we would call Firebase to delete the account
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      await signOut();
      toast.success('Account deleted successfully');
    } catch (error) {
      toast.error('Failed to delete account');
      console.error('Account deletion error:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            {/* Account Information */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Account Information
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Your account details and email preferences.</p>
                </div>
                <div className="mt-5">
                  <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user?.metadata.creationTime
                          ? new Date(user.metadata.creationTime).toLocaleDateString()
                          : 'N/A'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="mt-8 bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Change Password
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Ensure your account is using a long, random password to stay secure.</p>
                </div>
                <form onSubmit={handlePasswordChange} className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      loading={loading}
                      disabled={loading}
                    >
                      Change Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Email Preferences */}
            <div className="mt-8 bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Email Notifications
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Choose what types of emails you'd like to receive.</p>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="marketing"
                        name="marketing"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketing" className="font-medium text-gray-700">
                        Marketing emails
                      </label>
                      <p className="text-gray-500">
                        Receive updates about new features and promotions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="activity"
                        name="activity"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="activity" className="font-medium text-gray-700">
                        Activity notifications
                      </label>
                      <p className="text-gray-500">
                        Get notified when your posts are published or when you're running low on credits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delete Account */}
            <div className="mt-8 bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Delete Account
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Once you delete your account, you will lose all data associated with it.
                    This action cannot be undone.
                  </p>
                </div>
                <div className="mt-5">
                  <Button
                    type="button"
                    variant="outline"
                    loading={deleteLoading}
                    disabled={deleteLoading}
                    onClick={handleDeleteAccount}
                    className="text-red-600 hover:text-red-700 border-red-600 hover:border-red-700"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 