export type ThemeMode = 'dark' | 'light';

export type GamerTier = 'bronze' | 'silver' | 'gold' | 'fakher';

export interface GamerProfile {
  id: string;
  name: string;
  phone: string;
  tier: GamerTier;
  xp: number;
  balance: number;
  totalHoursPlayed: number;
  discountPercentage: number;
  avatar: string;
}

export interface Station {
  id: string;
  name: string;
  type: 'PS5' | 'PC' | 'XBOX' | 'VR';
  status: 'active' | 'idle' | 'reserved';
  ratePerHour: number;
  secondsElapsed: number;
  allocatedSeconds?: number; // Target time if timed session
  customerName: string;
  gamerTier?: GamerTier;
  buffetOrders: { item: string; price: number; count: number }[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  clockInTime: string;
  status: 'present' | 'delayed' | 'absent';
  delayMinutes: number;
  overtimeHours: number;
  shiftHours: number;
  hourlySalary: number;
}

export interface PartnerGameClub {
  id: string;
  name: string;
  city: string;
  address: string;
  consolesCount: number;
  pcCount: number;
  rating: number;
  isVip: boolean;
  phone: string;
  image: string;
}

export interface Installer {
  id: string;
  name: string;
  city: string;
  experienceYears: number;
  projectsCompleted: number;
  phone: string;
  rating: number;
  certifiedRelay: boolean;
  status: 'available' | 'busy';
}

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  views: number;
}

export interface TutorialVideo {
  id: string;
  title: string;
  duration: string;
  category: string;
  level: 'مقدماتی' | 'متوسط' | 'پیشرفته';
  thumbnailUrl?: string;
  stepsCount: number;
}
