export const SPECIALTY_KEYS = [
  'Legal',
  'Medical',
  'Technical',
  'Financial',
] as const;

export type SpecialtyKey = typeof SPECIALTY_KEYS[number];