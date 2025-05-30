import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type UserPreferences = Database['public']['Tables']['user_preferences']['Row'];
type BusinessProfile = Database['public']['Tables']['business_profiles']['Row'];

interface CombinedPreferences extends UserPreferences {
  business_profile?: BusinessProfile;
}

const DEFAULT_PREFERENCES: Partial<CombinedPreferences> = {
  post_frequency: 'weekly',
  platforms: ['twitter', 'linkedin', 'instagram'],
  auto_schedule: true,
  business_profile: {
    id: '',
    user_id: '',
    type: 'other',
    name: '',
    description: null,
    target_audience: null,
    keywords: [],
    tone: 'professional',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as BusinessProfile,
};

export function useUserPreferences() {
  const { userId } = useAuth();
  const [preferences, setPreferences] = useState<CombinedPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchPreferences();
    }
  }, [userId]);

  const fetchPreferences = async () => {
    try {
      // Fetch user preferences
      const { data: prefs, error: prefsError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (prefsError) {
        throw prefsError;
      }

      // Fetch business profile
      const { data: profile, error: profileError } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // Ignore "not found" error
        throw profileError;
      }

      setPreferences({
        ...prefs,
        business_profile: profile || DEFAULT_PREFERENCES.business_profile,
      });
    } catch (error) {
      console.error('Error fetching preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_preferences')
        .update(newPreferences)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      await fetchPreferences();
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  };

  const updateBusinessProfile = async (profile: Partial<BusinessProfile>) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('business_profiles')
        .upsert({
          ...profile,
          user_id: userId,
        })
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      await fetchPreferences();
    } catch (error) {
      console.error('Error updating business profile:', error);
      throw error;
    }
  };

  return {
    preferences: preferences || DEFAULT_PREFERENCES,
    loading,
    updatePreferences,
    updateBusinessProfile,
  };
} 