export const TAG_VARIANTS = {
  default: 'default',
  skill: 'skill',
  stack: 'stack',
  ba: 'ba',
  dev: 'dev',
  qe: 'qe',
  placeholder: 'placeholder',
} as const;

export type TagVariantKey = keyof typeof TAG_VARIANTS;
export type TagVariantValue = (typeof TAG_VARIANTS)[TagVariantKey];
