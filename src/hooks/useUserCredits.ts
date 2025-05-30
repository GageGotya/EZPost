import { useState, useEffect } from 'react';
import { UserCredits } from '@/lib/types';
import { userStorage } from '@/lib/userStorage';
import { useAuth } from './useAuth';

export function useUserCredits() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<UserCredits>({ available: 0, used: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const storedCredits = userStorage.getUserCredits(user.uid);
      setCredits(storedCredits);
      setLoading(false);
    }
  }, [user]);

  const addCredits = (amount: number) => {
    if (!user) return;
    userStorage.addCredits(user.uid, amount);
    setCredits(userStorage.getUserCredits(user.uid));
  };

  const useCredit = (): boolean => {
    if (!user) return false;
    const success = userStorage.useCredit(user.uid);
    if (success) {
      setCredits(userStorage.getUserCredits(user.uid));
    }
    return success;
  };

  return {
    credits,
    loading,
    addCredits,
    useCredit,
  };
} 