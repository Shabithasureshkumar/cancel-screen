import { 
  Appointment, 
  BetterFitSlot, 
  CancellationOption, 
  Doctor, 
  FamilyMember, 
  RefundDetails, 
  ReplacementDoctor 
} from '../types';

export const initialDoctor: Doctor = {
  id: 'doc-michelle',
  name: 'Dr. Michelle Juat, FNP',
  role: 'Nurse Practitioner',
  specialty: 'Family Medicine • 12+ Years Exp',
  experience: '12+ Years',
  rating: 4.9,
  reviewCount: 124,
  matchScore: 96,
  avatarUrl: '/assets/dr_michelle.png',
  isVerified: true,
  consultationType: 'Video Consultation',
  nextAvailable: 'May 27, 2026',
  waitDays: 42,
};

export const initialAppointment: Appointment = {
  id: 'apt-48291',
  date: 'Mon, Jun 1',
  time: '7:30 PM',
  duration: '40 mins',
  fee: '$44.00',
  doctor: initialDoctor,
  status: 'Confirmed',
};

export const betterFitSlot: BetterFitSlot = {
  badge: 'SMART ASSIST',
  matchScore: 98,
  title: 'Tomorrow, 11:00 AM',
  subtitle: 'Earlier than your original',
  benefits: [
    'Retain your position in the priority queue.',
    'Same provider, reduced transit time.',
    'No re-documentation required.',
  ],
};

export const familyMembers: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'Sarah Johnson',
    relation: 'Myself',
    avatarUrl: '/assets/patient_sarah_sm.png',
    largeAvatarUrl: '/assets/sarah_johnson.png',
    isPrimary: true,
    isVerified: true,
    birthDate: 'May 14, 1992 (32 Years)',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234- 8901',
    metrics: [
      { label: 'BLOOD GROUP', value: 'A+', icon: 'blood' },
      { label: 'HEIGHT', value: '165cm', icon: 'height' },
      { label: 'WEIGHT', value: '58kg', icon: 'weight' },
      { label: 'BMI INDEX', value: '21.3', icon: 'bmi' },
    ],
  },
  {
    id: 'fam-2',
    name: 'Michael Johnson',
    relation: 'Dad',
    avatarUrl: '/assets/patient_michael_sm.png',
    largeAvatarUrl: '/assets/michael_johnson.png',
    isPrimary: false,
    isVerified: false,
    birthDate: 'August 22, 1960 (64 Years)',
    email: 'michael.j@example.com',
    phone: '+1 (555) 345- 9102',
    metrics: [
      { label: 'BLOOD GROUP', value: 'O+', icon: 'blood' },
      { label: 'HEIGHT', value: '178cm', icon: 'height' },
      { label: 'WEIGHT', value: '76kg', icon: 'weight' },
      { label: 'BMI INDEX', value: '24.0', icon: 'bmi' },
    ],
  },
  {
    id: 'fam-3',
    name: 'Linda Johnson',
    relation: 'Mom',
    avatarUrl: '/assets/patient_linda_sm.png',
    largeAvatarUrl: '/assets/linda_johnson.png',
    isPrimary: false,
    isVerified: false,
    birthDate: 'November 10, 1963 (61 Years)',
    email: 'linda.j@example.com',
    phone: '+1 (555) 456- 1290',
    metrics: [
      { label: 'BLOOD GROUP', value: 'A+', icon: 'blood' },
      { label: 'HEIGHT', value: '160cm', icon: 'height' },
      { label: 'WEIGHT', value: '62kg', icon: 'weight' },
      { label: 'BMI INDEX', value: '24.2', icon: 'bmi' },
    ],
  },
];

export const cancellationOptions: CancellationOption[] = [
  { id: 'schedule_conflict', label: 'Schedule Conflict' },
  { id: 'personal_emergency', label: 'Personal Emergency' },
  { id: 'technical_issues', label: 'Technical Issues' },
  { id: 'financial_reasons', label: 'Financial Reasons' },
];

export const refundDetails: RefundDetails = {
  status: 'Full Refund Eligible',
  amount: '$145.00',
  returnMethod: 'AMEX •••• 9002',
  estimatedArrival: 'Estimated arrival in your account: 2-3 Business Days',
};

export const replacementDoctor: ReplacementDoctor = {
  id: 'doc-sarah',
  name: 'Dr. Sarah Wilson',
  avatarUrl: '/assets/dr_sarah_wilson.png',
  matchScore: 95,
  availability: 'Tomorrow • 10:00 AM',
  experience: '4.9 ★ (12+ Years)',
  specialtyText: 'Same specialty: Family Medicine',
  delayText: 'Immediate care - No delays',
};
