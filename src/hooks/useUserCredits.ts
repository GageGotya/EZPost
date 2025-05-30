import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type UserCredits = Database['public']['Tables']['user_credits']['Row'];

export function useUserCredits() {
  const { userId } = useAuth();
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchCredits();
    }
  }, [userId]);

  const fetchCredits = async () => {
    try {
      const { data: userCredits, error } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        throw error;
      }

      setCredits(userCredits);
    } catch (error) {
      console.error('Error fetching credits:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCredits = async (newCredits: Partial<UserCredits>) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_credits')
        .update(newCredits)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      await fetchCredits();
    } catch (error) {
      console.error('Error updating credits:', error);
      throw error;
    }
  };

  const useCredit = async () => {
    if (!credits || credits.available <= 0) {
      throw new Error('No credits available');
    }

    await updateCredits({
      available: credits.available - 1,
      used: credits.used + 1,
    });
  };

  return {
    credits: credits || { available: 0, used: 0, user_id: userId!, id: '', created_at: '', updated_at: '' },
    loading,
    updateCredits,
    fetchCredits,
    useCredit
  };
} 