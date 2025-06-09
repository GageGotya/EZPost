'use client';

import { Button } from '@/components/ui/Button';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Settings() {
  const { signOut } = useAuth();
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

      // Password changes are handled through Clerk's UI
      window.location.href = '/user/settings/password';
      
      toast.success('Redirecting to password change...');
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
      // Account deletion is handled through Clerk's UI
      window.location.href = '/user/settings/delete';
      
      toast.success('Redirecting to account deletion...');
    } catch (error) {
      toast.error('Failed to delete account');
      console.error('Account deletion error:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Change Password
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Update your password to keep your account secure.</p>
                </div>
                <form onSubmit={handlePasswordChange} className="mt-5 sm:flex sm:items-center">
                  <div className="w-full sm:max-w-xs">
                    <Button
                      type="button"
                      onClick={() => window.location.href = '/user/settings/password'}
                      loading={loading}
                      fullWidth
                    >
                      Change Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-6 bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Delete Account
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Once you delete your account, you will lose all data associated with it.
                  </p>
                </div>
                <div className="mt-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDeleteAccount}
                    loading={deleteLoading}
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
    </>
  );
} 