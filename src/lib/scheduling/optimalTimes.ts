import type { Database } from '../supabase/types';

type Analytics = Database['public']['Tables']['post_analytics']['Row'] & {
  timestamp: string;
  value: number;
};

type UserPreferences = Database['public']['Tables']['user_preferences']['Row'] & {
  timezone: string;
};

type Platform = 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'tiktok';

interface TimeSlot {
  hour: number;
  engagement: number;
}

// Default optimal times based on general social media research
const defaultOptimalTimes: Record<Platform, number[]> = {
  twitter: [9, 12, 15, 18], // 9AM, 12PM, 3PM, 6PM
  linkedin: [8, 10, 12, 17], // 8AM, 10AM, 12PM, 5PM
  instagram: [11, 14, 19, 21], // 11AM, 2PM, 7PM, 9PM
  facebook: [9, 13, 15, 19], // 9AM, 1PM, 3PM, 7PM
  tiktok: [11, 15, 19, 22], // 11AM, 3PM, 7PM, 10PM
};

export async function determineOptimalPostingTime(
  platform: Platform,
  userPreferences: UserPreferences,
  analytics?: Analytics[]
): Promise<Date> {
  // Start with user's timezone
  const userTimezone = userPreferences.timezone || 'UTC';
  const now = new Date();
  
  // If we have analytics data, use it to determine best time
  if (analytics && analytics.length > 0) {
    const timeSlots = analyzeHistoricalData(analytics);
    const bestHour = findBestTimeSlot(timeSlots).hour;
    return getNextAvailableTime(bestHour, now, userTimezone);
  }

  // Otherwise use default optimal times
  const defaultTimes = defaultOptimalTimes[platform];
  const currentHour = now.getHours();
  
  // Find the next available default time
  const nextTime = defaultTimes.find(hour => hour > currentHour) || defaultTimes[0];
  return getNextAvailableTime(nextTime, now, userTimezone);
}

function analyzeHistoricalData(analytics: Analytics[]): TimeSlot[] {
  const timeSlots: TimeSlot[] = [];
  
  // Group engagement by hour
  const hourlyEngagement = analytics.reduce((acc, entry) => {
    const hour = new Date(entry.timestamp).getHours();
    acc[hour] = (acc[hour] || 0) + entry.value;
    return acc;
  }, {} as Record<number, number>);

  // Convert to time slots
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push({
      hour,
      engagement: hourlyEngagement[hour] || 0
    });
  }

  return timeSlots;
}

function findBestTimeSlot(timeSlots: TimeSlot[]): TimeSlot {
  return timeSlots.reduce((best, current) => 
    current.engagement > best.engagement ? current : best
  );
}

function getNextAvailableTime(hour: number, now: Date, timezone: string): Date {
  const targetDate = new Date(now);
  targetDate.setHours(hour, 0, 0, 0);

  // If the time has passed today, schedule for tomorrow
  if (targetDate <= now) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  return targetDate;
}

export function generatePostingSchedule(
  userPreferences: UserPreferences,
  platforms: Platform[]
): Date[] {
  const schedule: Date[] = [];
  const postsPerDay = getPostingFrequency(userPreferences);
  const now = new Date();

  // Generate schedule for the next 7 days
  for (let day = 0; day < 7; day++) {
    for (let post = 0; post < postsPerDay; post++) {
      // Rotate through platforms
      const platform = platforms[post % platforms.length];
      const baseTime = defaultOptimalTimes[platform][post % defaultOptimalTimes[platform].length];
      
      const scheduleDate = new Date(now);
      scheduleDate.setDate(scheduleDate.getDate() + day);
      scheduleDate.setHours(baseTime, 0, 0, 0);
      
      schedule.push(scheduleDate);
    }
  }

  return schedule;
}

function getPostingFrequency(preferences: UserPreferences): number {
  switch (preferences.post_frequency) {
    case 'daily':
      return 1;
    case '3x_week':
      return 3;
    case 'weekly':
      return 7;
    default:
      return 1;
  }
}

export function generateSchedule(preferences: UserPreferences, analytics: Analytics[]): Date[] {
  const schedule: Date[] = [];
  const postsPerWeek = getPostingFrequency(preferences);
  const now = new Date();

  // Calculate optimal posting times based on analytics
  const timeSlots = analyzeHistoricalData(analytics);
  const bestTimeSlot = findBestTimeSlot(timeSlots);

  // Generate schedule for the next week
  for (let day = 0; day < 7; day++) {
    if (day < postsPerWeek) {
      const scheduleDate = new Date(now);
      scheduleDate.setDate(scheduleDate.getDate() + day);
      scheduleDate.setHours(bestTimeSlot.hour, 0, 0, 0);
      schedule.push(scheduleDate);
    }
  }

  return schedule;
} 