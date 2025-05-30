import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

type ContentFormData = {
  topic: string;
  tone: string;
  platforms: string[];
  contentType: 'text' | 'image' | 'video';
  keywords: string;
};

const platforms = [
  { id: 'twitter', name: 'Twitter' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'tiktok', name: 'TikTok' },
];

const tones = [
  'Professional',
  'Casual',
  'Humorous',
  'Informative',
  'Inspirational',
];

const contentTypes = [
  {
    id: 'text',
    name: 'Text Post',
    icon: DocumentTextIcon,
    description: 'Generate text-based content',
  },
  {
    id: 'image',
    name: 'Image Post',
    icon: PhotoIcon,
    description: 'Generate image with caption',
  },
  {
    id: 'video',
    name: 'Video Idea',
    icon: VideoCameraIcon,
    description: 'Generate video concept and script',
  },
];

export default function ContentGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ContentFormData>();
  const selectedPlatforms = watch('platforms', []);
  const selectedContentType = watch('contentType', 'text');

  const onSubmit = async (data: ContentFormData) => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const result = await response.json();
      setGeneratedContent(result.content);
      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Content Type
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {contentTypes.map((type) => (
              <div
                key={type.id}
                className={`relative rounded-lg border p-4 cursor-pointer ${
                  selectedContentType === type.id
                    ? 'border-primary ring-2 ring-primary'
                    : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  {...register('contentType')}
                  value={type.id}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <type.icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4">
                    <label className="block text-sm font-medium text-gray-900">
                      {type.name}
                    </label>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Topic or Product
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...register('topic', { required: 'Topic is required' })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="What would you like to create content about?"
            />
            {errors.topic && (
              <p className="mt-1 text-sm text-red-600">{errors.topic.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Target Platforms
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {platforms.map((platform) => (
              <div key={platform.id} className="relative flex items-center">
                <input
                  type="checkbox"
                  {...register('platforms', {
                    required: 'Select at least one platform',
                  })}
                  value={platform.id}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  {platform.name}
                </label>
              </div>
            ))}
          </div>
          {errors.platforms && (
            <p className="mt-1 text-sm text-red-600">
              {errors.platforms.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content Tone
          </label>
          <select
            {...register('tone', { required: 'Select a tone' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Select a tone</option>
            {tones.map((tone) => (
              <option key={tone} value={tone.toLowerCase()}>
                {tone}
              </option>
            ))}
          </select>
          {errors.tone && (
            <p className="mt-1 text-sm text-red-600">{errors.tone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Keywords (optional)
          </label>
          <input
            type="text"
            {...register('keywords')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Enter keywords separated by commas"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isGenerating}
            className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : 'Generate Content'}
          </button>
        </div>
      </form>

      {generatedContent.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Generated Content
          </h3>
          <div className="space-y-4">
            {generatedContent.map((content, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-4 shadow"
              >
                <p className="text-sm text-gray-900 whitespace-pre-wrap">
                  {content}
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(content);
                      toast.success('Copied to clipboard!');
                    }}
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Copy
                  </button>
                  <button className="inline-flex items-center rounded-md bg-primary px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                    Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 