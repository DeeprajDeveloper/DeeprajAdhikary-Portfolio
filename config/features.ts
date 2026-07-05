/**
 * Feature flags for optional UI behavior.
 *
 * Defaults live here — change them and rebuild to toggle without env vars.
 * For deploy-time overrides, set VITE_FEATURE_* in .env, .env.production,
 * or your hosting provider's environment settings (then rebuild).
 */

const defaults = {
  /** Hover typewriter on "three complementary lenses" in the hero headline */
  heroLensesTypewriter: true,
} as const;

function envFlag(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value === '') return defaultValue;
  return value === 'true' || value === '1';
}

export const features = {
  heroLensesTypewriter: envFlag(
    import.meta.env.VITE_FEATURE_HERO_LENSES_TYPEWRITER,
    defaults.heroLensesTypewriter,
  ),
} as const;

export type Features = typeof features;
