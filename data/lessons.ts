export interface Lesson {
  id: string;
  title: string;
  insight: string;
}

export const lessons: Lesson[] = [
  {
    id: 'small-requirements',
    title: 'Small requirements create large downstream impacts',
    insight:
      'A single ambiguous field definition can propagate through dozens of downstream systems. I learned to trace requirements to their furthest consumer before signing off.',
  },
  {
    id: 'documentation',
    title: 'Why documentation matters',
    insight:
      'The team that inherits your work will not have your context. Documentation is not bureaucracy — it is empathy for the next person.',
  },
  {
    id: 'balancing-needs',
    title: 'Balancing business needs with technical constraints',
    insight:
      'The best solution is rarely the most elegant or the fastest to ship. It is the one that satisfies the business rule within real technical and timeline constraints.',
  },
  {
    id: 'maintainability',
    title: 'Designing for maintainability',
    insight:
      'Systems outlive the people who build them. Every shortcut taken for speed becomes someone else\'s maintenance burden.',
  },
  {
    id: 'communication',
    title: 'Communicating across technical and business teams',
    insight:
      'The same concept needs different language for different audiences. A business rule for a BA, a validation constraint for a dev, and a test scenario for QA — same truth, three expressions.',
  },
  {
    id: 'beyond-implementation',
    title: 'Thinking beyond implementation',
    insight:
      'Shipping is not the finish line. Operations, monitoring, support, and compliance all depend on decisions made during design.',
  },
];
