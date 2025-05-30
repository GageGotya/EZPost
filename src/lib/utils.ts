import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateTimeSlots(
  startHour: number = 0,
  endHour: number = 23,
  interval: number = 30
): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = new Date();
      time.setHours(hour, minute);
      slots.push(formatTime(time));
    }
  }
  return slots;
}

export function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `in ${diffInDays} day${diffInDays === 1 ? "" : "s"}`;
  }
  if (diffInHours > 0) {
    return `in ${diffInHours} hour${diffInHours === 1 ? "" : "s"}`;
  }
  if (diffInMinutes > 0) {
    return `in ${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"}`;
  }
  return "now";
} 