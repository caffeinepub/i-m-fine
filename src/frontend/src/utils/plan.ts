import { PlanOption } from '../backend';

export type PlanLevel = 'free' | 'basic' | 'premier';

export interface PlanOptionDisplay {
  value: PlanOption;
  label: string;
  level: PlanLevel;
}

export const PLAN_OPTIONS: PlanOptionDisplay[] = [
  { value: PlanOption.free, label: 'Free - $0', level: 'free' },
  { value: PlanOption.basicMonthly, label: 'Basic - $9.99 a month', level: 'basic' },
  { value: PlanOption.basicSixMonth, label: 'Basic - $59.94 for 6 months (No auto renewals)', level: 'basic' },
  { value: PlanOption.basicYearly, label: 'Basic - $109.89 a year (No auto renewals)', level: 'basic' },
  { value: PlanOption.premierMonthly, label: 'Premier - $24.99 a month', level: 'premier' },
  { value: PlanOption.premierSixMonth, label: 'Premier - $149.94 for 6 months (No auto renewals)', level: 'premier' },
  { value: PlanOption.premierYearly, label: 'Premier - $274.89 for a year (No auto renewals)', level: 'premier' },
];

export function getPlanLevel(planOption: PlanOption): PlanLevel {
  const option = PLAN_OPTIONS.find(opt => opt.value === planOption);
  return option?.level || 'free';
}

export function getPlanLabel(planOption: PlanOption): string {
  const option = PLAN_OPTIONS.find(opt => opt.value === planOption);
  return option?.label || 'Free - $0';
}
