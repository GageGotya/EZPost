'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { useUserCredits } from '@/hooks/useUserCredits';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useState } from 'react';
import { Platform } from '@/lib/types';
import toast from 'react-hot-toast';

export default function Content() {
  const { credits, useCredit } = useUserCredits();
  const { preferences } = useUserPreferences();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);

  const platforms: { id: Platform; name: string; icon: string }[] = [
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'facebook', name: 'Facebook', icon: '👥' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
  ];

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    if (credits.available < selectedPlatforms.length) {
      toast.error('Not enough credits');
      return;
    }

    setLoading(true);
    try {
      // Here we would call the OpenAI API to generate content
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Use credits for each platform
      await Promise.all(selectedPlatforms.map(() => useCredit()));
      
      toast.success('Content generated successfully!');
      setPrompt('');
      setSelectedPlatforms([]);
    } catch (error) {
      toast.error('Failed to generate content');
      console.error('Content generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Generate Content
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create engaging content for multiple platforms using AI.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Credits info */}
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          Available Credits
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            You have {credits.available} credits remaining. Each
                            platform selection uses 1 credit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Platform selection */}
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Select Platforms
                    </label>
                    <p className="text-sm text-gray-500">
                      Choose the platforms you want to generate content for.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                      {platforms.map((platform) => (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => handlePlatformToggle(platform.id)}
                          className={`relative rounded-lg border p-4 flex items-center space-x-3 ${
                            selectedPlatforms.includes(platform.id)
                              ? 'border-blue-600 ring-2 ring-blue-600'
                              : 'border-gray-300'
                          }`}
                        >
                          <div className="flex-shrink-0 text-2xl">
                            {platform.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-sm font-medium text-gray-900">
                              {platform.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt input */}
                  <div>
                    <label
                      htmlFor="prompt"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content Prompt
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="prompt"
                        name="prompt"
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Describe what you want to post about..."
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      loading={loading}
                      disabled={loading || selectedPlatforms.length === 0 || !prompt.trim()}
                    >
                      Generate Content
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 