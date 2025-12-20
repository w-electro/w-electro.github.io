"use client";

const STORAGE_KEY = "najah_user_activity";

export interface UserActivity {
  toolsUsed: string[];
  aiChats: number;
  savedFiles: number;
  lastUpdated: string;
}

const defaultActivity: UserActivity = {
  toolsUsed: [],
  aiChats: 0,
  savedFiles: 0,
  lastUpdated: new Date().toISOString(),
};

export function getActivity(): UserActivity {
  if (typeof window === "undefined") {
    return defaultActivity;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error("Failed to read activity from localStorage");
  }

  return defaultActivity;
}

export function saveActivity(activity: UserActivity): void {
  if (typeof window === "undefined") return;

  try {
    activity.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activity));
  } catch {
    console.error("Failed to save activity to localStorage");
  }
}

export function trackToolUsage(toolId: string): void {
  const activity = getActivity();
  if (!activity.toolsUsed.includes(toolId)) {
    activity.toolsUsed.push(toolId);
  }
  saveActivity(activity);
}

export function trackAiChat(): void {
  const activity = getActivity();
  activity.aiChats += 1;
  saveActivity(activity);
}

export function trackSavedFile(): void {
  const activity = getActivity();
  activity.savedFiles += 1;
  saveActivity(activity);
}

export function getStats(): { toolsCount: number; aiChatsCount: number; savedFilesCount: number } {
  const activity = getActivity();
  return {
    toolsCount: activity.toolsUsed.length,
    aiChatsCount: activity.aiChats,
    savedFilesCount: activity.savedFiles,
  };
}
