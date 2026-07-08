export const hero = {
  eyebrowRoles: [
    'System Thinker',
    'Business Analyst',
    'Developer',
    'Quality Advocate',
    'Problem Solver',
    'Curious Builder',
    'Enterprise Mindset',
    'Always Learning',
    'Simplifying Complexity',
    'Bridging Business & Technology',
  ],
  headline: 'I understand complex systems through three complementary lenses',
  headlineInteractive: 'three complementary lenses',
  headlinePerspectives: [
    'Business Analyst',
    'Developer',
    'Quality Engineer',
  ],
  subheadline:
    'Business Analysis, Development, and Quality Engineering — not as separate roles, but as interconnected ways of seeing the same problem.',
  cta: { label: 'Explore how I think', href: '/how-i-think' },
  secondaryCta: { label: 'View perspectives', href: '/perspectives' },
  orbitOrbs: [
    {
      id: 'ba',
      label: 'Business Analysis',
      tagline: 'Understand the why',
      href: '/perspectives',
      startAngle: -90,
    },
    {
      id: 'dev',
      label: 'Development',
      tagline: 'Build the how',
      href: '/perspectives',
      startAngle: 150,
    },
    {
      id: 'qe',
      label: 'Quality Engineering',
      tagline: 'Ensure it works, always',
      href: '/perspectives',
      startAngle: 30,
    },
  ],
} as const;
