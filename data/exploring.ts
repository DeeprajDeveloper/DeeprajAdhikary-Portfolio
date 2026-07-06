export interface ExploringTopic {
  id: string;
  label: string;
  description: string;
}

export const exploringTopics: ExploringTopic[] = [
  {
    id: 'ai-dev',
    label: 'AI-assisted development',
    description: 'Using AI tools to accelerate analysis, documentation, and code review while maintaining quality standards.',
  },
  {
    id: 'system-design',
    label: 'System design',
    description: 'Architectural patterns for scalable, maintainable enterprise systems.',
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    description: 'Building interfaces that work for everyone — keyboard, screen reader, and cognitive accessibility.',
  },
  {
    id: 'motion-design',
    label: 'Motion design',
    description: 'Animations that clarify rather than decorate — purposeful motion in user interfaces.',
  },
  {
    id: 'developer-experience',
    label: 'Developer experience',
    description: 'Tooling, documentation, and workflows that help teams ship reliably.',
  },
  {
    id: 'product-thinking',
    label: 'Product thinking',
    description: 'Connecting technical decisions to user outcomes and business value.',
  },
  {
    id: 'ui-ux-design',
    label: 'UI/UX design',
    description: 'Designing interfaces that are not only functional but also delightful to use.',
  },
];
