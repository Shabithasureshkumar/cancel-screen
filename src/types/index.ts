export type ScreenMode = 'cancel' | 'confirm_continuity' | 'cancelled_success';

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  rating: number;
  reviewCount: number;
  matchScore: number;
  avatarUrl: string;
  isVerified: boolean;
  consultationType: 'Video Consultation' | 'In-Person Consultation';
  nextAvailable?: string;
  waitDays?: number;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  duration: string;
  fee: string;
  doctor: Doctor;
  status: string;
}

export interface PatientMetric {
  label: string;
  value: string;
  icon: 'blood' | 'height' | 'weight' | 'bmi';
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatarUrl: string;
  largeAvatarUrl?: string;
  isPrimary?: boolean;
  isVerified?: boolean;
  birthDate?: string;
  email?: string;
  phone?: string;
  metrics?: PatientMetric[];
}

export type CancellationReasonId = 
  | 'schedule_conflict' 
  | 'personal_emergency' 
  | 'technical_issues' 
  | 'financial_reasons';

export interface CancellationOption {
  id: CancellationReasonId;
  label: string;
}

export interface BetterFitSlot {
  badge: string;
  matchScore: number;
  title: string;
  subtitle: string;
  benefits: string[];
}

export interface RefundDetails {
  status: string;
  amount: string;
  returnMethod: string;
  estimatedArrival: string;
}

export interface ReplacementDoctor {
  id: string;
  name: string;
  avatarUrl: string;
  matchScore: number;
  availability: string;
  experience: string;
  specialtyText: string;
  delayText: string;
}
