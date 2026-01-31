
export enum ViewType {
  TIMELINE = 'TIMELINE',
  BOARD = 'BOARD',
  UNPLANNED = 'UNPLANNED',
  WORKSPACE = 'WORKSPACE'
}

export type TimelineItemType = 'task' | 'note';

export interface Profile {
  name: string;
  email: string;
  avatar: string | null;
}

export interface AppLockSettings {
  enabled: boolean;
  pin: string | null;
  timeoutMinutes: number; // 0 for immediate
  lastUnlockedAt: number | null;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  details?: string;
  time?: string;
  date: string | null;
  completed: boolean;
  projectId?: string;
  tags: string[];
  createdAt: number;
  type: TimelineItemType;
  isBigNote?: boolean;
  reminderMinutes?: number;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  icon?: string;
  progress: number;
}

export interface AppState {
  tasks: Task[];
  projects: Project[];
  tags: string[];
  darkMode: boolean;
  reminderTone: string;
  profile: Profile;
  appLock: AppLockSettings;
}
