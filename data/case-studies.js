export const caseStudies = [
  {
    slug: 'checkout-drop-off',
    title: 'Why 1 in 5 users abandoned checkout at the payment step',
    summary:
      'Mapped the drop-off to a validation rule that fired before users saw the error message.',
    skillsDemonstrated: ['requirements', 'ux-research'],
    featured: true,
  },
  {
    slug: 'test-data-early-bugs',
    title: 'Building a test-data set that caught bugs three sprints early',
    summary:
      'Built edge-case data that exposed a null-check gap before it reached production.',
    skillsDemonstrated: ['qa-test-design', 'test-data-strategy'],
    featured: false,
  },
  {
    slug: 'refund-flow-support',
    title:
      'Fixing a refund flow that was quietly costing support 40+ tickets a month',
    summary:
      'Sat with support reps, mapped failure points, and rewrote requirements around what customers actually hit.',
    skillsDemonstrated: ['requirements', 'stakeholder-alignment'],
    featured: true,
  },
];

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);
