export interface PlaygroundItem {
  slug: string;
  title: string;
  description: string;
  href: string | null;
  cta: string;
  tag: string;
}

export const playgroundItems: PlaygroundItem[] = [
  {
    slug: 'annotate',
    title: 'Highlighting Mode',
    description: 'Highlight prose across the site the way a document gets annotated.',
    href: '/playground/annotate',
    cta: 'Try it',
    tag: 'Interactive',
  },
  {
    slug: 'mask-a-record',
    title: 'Mask-a-Record',
    description: 'See how referential integrity survives masking — and what breaks when it doesn’t.',
    href: '/playground/mask-a-record',
    cta: 'Try it',
    tag: 'Demo',
  },
  {
    slug: 'requirements-generator',
    title: 'Vague Complaint → Requirement',
    description: 'Type a fuzzy stakeholder complaint. Get a Given/When/Then back.',
    href: '/playground/requirements-generator',
    cta: 'Try it',
    tag: 'Translator',
  },
  {
    slug: 'console-egg',
    title: 'One more thing — open your console',
    description: 'No further explanation. The curious ones already know where to look.',
    href: null,
    cta: 'Look closer',
    tag: 'Easter egg',
  },
];

export const maskSampleCustomer = {
  name: 'Avery Chen',
  email: 'avery.chen@northwind.example',
  accountNumber: '4829173650',
  address: '1847 Mercer Street, Suite 12, Austin TX 78701',
} as const;

export const maskSampleTransaction = {
  id: 'TXN-88421',
  amount: '$1,240.00',
  date: '2026-03-14',
  accountNumber: '4829173650',
} as const;

export const complaintExamples = [
  'the checkout feels weird',
  'search is too slow',
  'I can never find my statements',
  'the button doesn’t do anything',
  'mobile looks broken on my phone',
] as const;
