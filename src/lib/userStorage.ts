import { UserPreferences, UserCredits, BusinessProfile } from './types';

const USER_PREFS_KEY = 'user_preferences';
const USER_CREDITS_KEY = 'user_credits';
const BUSINESS_PROFILE_KEY = 'business_profile';

export const userStorage = {
  // User Preferences
  getUserPreferences(userId: string): UserPreferences | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(`${userId}_${USER_PREFS_KEY}`);
    return data ? JSON.parse(data) : null;
  },

  saveUserPreferences(userId: string, preferences: UserPreferences) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${userId}_${USER_PREFS_KEY}`, JSON.stringify(preferences));
  },

  // Credits Management
  getUserCredits(userId: string): UserCredits {
    if (typeof window === 'undefined') return { available: 0, used: 0 };
    const data = localStorage.getItem(`${userId}_${USER_CREDITS_KEY}`);
    return data ? JSON.parse(data) : { available: 0, used: 0 };
  },

  addCredits(userId: string, amount: number) {
    const credits = this.getUserCredits(userId);
    credits.available += amount;
    credits.lastPurchase = new Date().toISOString();
    localStorage.setItem(`${userId}_${USER_CREDITS_KEY}`, JSON.stringify(credits));
  },

  useCredit(userId: string): boolean {
    const credits = this.getUserCredits(userId);
    if (credits.available <= 0) return false;
    
    credits.available -= 1;
    credits.used += 1;
    localStorage.setItem(`${userId}_${USER_CREDITS_KEY}`, JSON.stringify(credits));
    return true;
  },

  // Business Profile
  getBusinessProfile(userId: string): BusinessProfile | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(`${userId}_${BUSINESS_PROFILE_KEY}`);
    return data ? JSON.parse(data) : null;
  },

  saveBusinessProfile(userId: string, profile: BusinessProfile) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${userId}_${BUSINESS_PROFILE_KEY}`, JSON.stringify(profile));
  }
}; 