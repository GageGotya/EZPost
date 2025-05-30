import { useState, useEffect } from 'react';
import { UserPreferences, BusinessProfile } from '@/lib/types';
import { userStorage } from '@/lib/userStorage';
import { useAuth } from './useAuth';

const DEFAULT_PREFERENCES: UserPreferences = {
  postFrequency: 'daily',
  preferredTimes: ['9:00', '15:00', '19:00'],
  platforms: ['twitter', 'linkedin', 'instagram'],
  businessProfile: {
    type: 'other',
    name: '',
    description: '',
    targetAudience: '',
    keywords: [],
    tone: 'professional'
  },
  autoSchedule: true
};

export function useUserPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const storedPreferences = userStorage.getUserPreferences(user.uid);
      if (storedPreferences) {
        setPreferences(storedPreferences);
      }
      setLoading(false);
    }
  }, [user]);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    if (!user) return;

    const updatedPreferences = {
      ...preferences,
      ...newPreferences
    };

    setPreferences(updatedPreferences);
    userStorage.saveUserPreferences(user.uid, updatedPreferences);
  };

  const updateBusinessProfile = (profile: BusinessProfile) => {
    if (!user) return;

    const updatedPreferences = {
      ...preferences,
      businessProfile: profile
    };

    setPreferences(updatedPreferences);
    userStorage.saveUserPreferences(user.uid, updatedPreferences);
    userStorage.saveBusinessProfile(user.uid, profile);
  };

  return {
    preferences,
    loading,
    updatePreferences,
    updateBusinessProfile
  };
} 