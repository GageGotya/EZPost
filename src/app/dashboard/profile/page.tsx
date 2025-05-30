import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useState } from 'react';
import { BusinessType, ContentTone, Platform, PostFrequency } from '@/lib/types';
import toast from 'react-hot-toast';

export default function Profile() {
  const { preferences, updatePreferences, updateBusinessProfile } = useUserPreferences();
  const [loading, setLoading] = useState(false);

  const businessTypes: BusinessType[] = ['retail', 'tech', 'food', 'health', 'finance', 'other'];
  const postFrequencies: { value: PostFrequency; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: '3x_week', label: '3 Times per Week' },
    { value: 'weekly', label: 'Weekly' },
  ];
  const contentTones: { value: ContentTone; label: string }[] = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'formal', label: 'Formal' },
  ];
  const platforms: { value: Platform; label: string }[] = [
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'tiktok', label: 'TikTok' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const businessProfile = {
        type: formData.get('businessType') as BusinessType,
        name: formData.get('businessName') as string,
        description: formData.get('description') as string,
        targetAudience: formData.get('targetAudience') as string,
        keywords: formData.get('keywords')?.toString().split(',').map(k => k.trim()) || [],
        tone: formData.get('tone') as ContentTone,
      };

      const selectedPlatforms = platforms
        .filter(p => formData.get(`platform_${p.value}`) === 'on')
        .map(p => p.value);

      await updateBusinessProfile(businessProfile);
      await updatePreferences({
        postFrequency: formData.get('postFrequency') as PostFrequency,
        platforms: selectedPlatforms,
        autoSchedule: formData.get('autoSchedule') === 'on',
      });

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Business Profile</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your business profile and content preferences.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200">
                <div>
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Business Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      This information will be used to generate content that matches your brand.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                        Business Type
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        defaultValue={preferences.businessProfile.type}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                        Business Name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        id="businessName"
                        defaultValue={preferences.businessProfile.name}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Business Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        defaultValue={preferences.businessProfile.description}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
                        Target Audience
                      </label>
                      <input
                        type="text"
                        name="targetAudience"
                        id="targetAudience"
                        defaultValue={preferences.businessProfile.targetAudience}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
                        Keywords (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="keywords"
                        id="keywords"
                        defaultValue={preferences.businessProfile.keywords.join(', ')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Content Preferences
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Choose how you want your content to be generated and scheduled.
                    </p>
                  </div>

                  <div className="mt-6">
                    <fieldset>
                      <legend className="text-base font-medium text-gray-900">Platforms</legend>
                      <div className="mt-4 space-y-4">
                        {platforms.map((platform) => (
                          <div key={platform.value} className="flex items-center">
                            <input
                              id={`platform_${platform.value}`}
                              name={`platform_${platform.value}`}
                              type="checkbox"
                              defaultChecked={preferences.platforms.includes(platform.value)}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`platform_${platform.value}`}
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              {platform.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>

                    <div className="mt-6">
                      <label htmlFor="postFrequency" className="block text-sm font-medium text-gray-700">
                        Posting Frequency
                      </label>
                      <select
                        id="postFrequency"
                        name="postFrequency"
                        defaultValue={preferences.postFrequency}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        {postFrequencies.map((frequency) => (
                          <option key={frequency.value} value={frequency.value}>
                            {frequency.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
                        Content Tone
                      </label>
                      <select
                        id="tone"
                        name="tone"
                        defaultValue={preferences.businessProfile.tone}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        {contentTones.map((tone) => (
                          <option key={tone.value} value={tone.value}>
                            {tone.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="autoSchedule"
                            name="autoSchedule"
                            type="checkbox"
                            defaultChecked={preferences.autoSchedule}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="autoSchedule" className="font-medium text-gray-700">
                            Auto-schedule posts
                          </label>
                          <p className="text-gray-500">
                            Let AI determine the best time to post your content.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 