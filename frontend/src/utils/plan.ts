import { PlanOption } from '../backend';

export type PlanLevel = 'free' | 'basic' | 'premier';

export interface PlanOptionDisplay {
  value: PlanOption;
  label: string;
  level: PlanLevel;
}

export const PLAN_OPTIONS: PlanOptionDisplay[] = [
  { value: PlanOption.free, label: 'Demo - $0 / 6 weeks then $4.99/month', level: 'free' },
  { value: PlanOption.basicMonthly, label: 'Basic - $14.99/month', level: 'basic' },
  { value: PlanOption.basicSixMonth, label: 'Basic - $89.94 for 6 months (No auto renewals)', level: 'basic' },
  { value: PlanOption.basicYearly, label: 'Basic - $179.88 a year (No auto renewals)', level: 'basic' },
  { value: PlanOption.premierMonthly, label: 'Premier - $24.99/month', level: 'premier' },
  { value: PlanOption.premierSixMonth, label: 'Premier - $149.94 for 6 months (No auto renewals)', level: 'premier' },
  { value: PlanOption.premierYearly, label: 'Premier - $299.88 for a year (No auto renewals)', level: 'premier' },
];

export function getPlanLevel(planOption: PlanOption): PlanLevel {
  const option = PLAN_OPTIONS.find(opt => opt.value === planOption);
  return option?.level || 'free';
}

export function getPlanLabel(planOption: PlanOption): string {
  const option = PLAN_OPTIONS.find(opt => opt.value === planOption);
  return option?.label || 'Demo - $0 / 6 weeks then $4.99/month';
}

export function isPaidPlan(planOption: PlanOption): boolean {
  return planOption !== PlanOption.free;
}

// Entitlement catalog for all features across plan tiers
export interface FeatureEntitlement {
  id: string;
  title: string;
  description: string;
  requiredPlan: PlanLevel;
  isImplemented: boolean;
  category: 'core' | 'journal' | 'tools' | 'tracking' | 'support' | 'premium';
}

export const FEATURE_ENTITLEMENTS: FeatureEntitlement[] = [
  // Free plan features
  {
    id: 'mood-checkin',
    title: 'Mood Check-ins',
    description: 'Track your daily mood and emotional state',
    requiredPlan: 'free',
    isImplemented: true,
    category: 'core',
  },
  {
    id: 'journal-limited',
    title: 'Journal Entries',
    description: '2 entries per week, max 8 per month',
    requiredPlan: 'free',
    isImplemented: true,
    category: 'journal',
  },
  {
    id: 'breathing-exercises',
    title: 'Breathing Exercises',
    description: 'Guided breathing techniques for relaxation',
    requiredPlan: 'free',
    isImplemented: true,
    category: 'tools',
  },
  {
    id: 'grounding-exercises',
    title: 'Grounding Exercises',
    description: '5-4-3-2-1 technique to stay present',
    requiredPlan: 'free',
    isImplemented: true,
    category: 'tools',
  },
  {
    id: 'trauma-guide',
    title: 'What is Trauma?',
    description: '5-part guide and activities',
    requiredPlan: 'free',
    isImplemented: false,
    category: 'core',
  },

  // Basic plan features
  {
    id: 'journal-full',
    title: 'Full Journal Access',
    description: 'Unlimited journal entries',
    requiredPlan: 'basic',
    isImplemented: true,
    category: 'journal',
  },
  {
    id: 'intention-setting',
    title: 'Intention Setting',
    description: 'Set daily intentions for mindful living',
    requiredPlan: 'basic',
    isImplemented: false,
    category: 'tools',
  },
  {
    id: 'reflection-setting',
    title: 'Reflection Setting',
    description: 'Guided reflection prompts and exercises',
    requiredPlan: 'basic',
    isImplemented: false,
    category: 'tools',
  },
  {
    id: 'life-audit',
    title: 'Life Audit',
    description: 'Comprehensive life assessment tool',
    requiredPlan: 'basic',
    isImplemented: false,
    category: 'tools',
  },
  {
    id: 'habit-tracker',
    title: 'Habit Tracker Package',
    description: 'Track and build positive habits',
    requiredPlan: 'basic',
    isImplemented: false,
    category: 'tracking',
  },
  {
    id: 'mindful-changes',
    title: 'Mindful Changes Package',
    description: 'Tools for intentional life changes',
    requiredPlan: 'basic',
    isImplemented: false,
    category: 'tools',
  },
  {
    id: 'progress-tracking',
    title: 'Progress Tracking Tools',
    description: 'Monitor your growth and activities',
    requiredPlan: 'basic',
    isImplemented: false,
    category: 'tracking',
  },
  {
    id: 'trigger-support',
    title: 'Trigger Support Tools',
    description: 'Identify and manage emotional triggers',
    requiredPlan: 'basic',
    isImplemented: false,
    category: 'support',
  },
  {
    id: 'thought-reframing',
    title: 'Thought Reframing',
    description: 'Challenge negative thought patterns',
    requiredPlan: 'basic',
    isImplemented: true,
    category: 'tools',
  },

  // Premier plan features
  {
    id: 'better-you-challenge',
    title: 'Better You Challenge Tracker',
    description: 'Structured personal growth challenges',
    requiredPlan: 'premier',
    isImplemented: false,
    category: 'tracking',
  },
  {
    id: 'reset-work',
    title: 'Reset Work',
    description: 'Deep personal reset exercises',
    requiredPlan: 'premier',
    isImplemented: false,
    category: 'tools',
  },
  {
    id: 'all-trackers',
    title: 'All Trackers',
    description: 'Complete suite of tracking tools',
    requiredPlan: 'premier',
    isImplemented: false,
    category: 'tracking',
  },
  {
    id: 'one-on-one-guidance',
    title: 'One-on-One Guidance',
    description: 'Personalized support and guidance',
    requiredPlan: 'premier',
    isImplemented: false,
    category: 'support',
  },
  {
    id: 'deep-trauma-tools',
    title: 'Deep Trauma Tools',
    description: 'Advanced trauma processing resources',
    requiredPlan: 'premier',
    isImplemented: false,
    category: 'support',
  },
  {
    id: 'premium-content',
    title: 'Premium Content',
    description: 'Exclusive articles, videos, and resources',
    requiredPlan: 'premier',
    isImplemented: false,
    category: 'premium',
  },
  {
    id: 'early-access',
    title: 'Early Access Feature',
    description: 'Be first to try new features',
    requiredPlan: 'premier',
    isImplemented: false,
    category: 'premium',
  },
];

export function getFeaturesByPlan(planLevel: PlanLevel): FeatureEntitlement[] {
  const planHierarchy: Record<PlanLevel, number> = {
    free: 0,
    basic: 1,
    premier: 2,
  };

  return FEATURE_ENTITLEMENTS.filter(
    (feature) => planHierarchy[feature.requiredPlan] <= planHierarchy[planLevel]
  );
}

export function getFeaturesByCategory(category: string): FeatureEntitlement[] {
  return FEATURE_ENTITLEMENTS.filter((feature) => feature.category === category);
}
