export type PerspectiveId = 'ba' | 'dev' | 'qe';

export interface HomePerspective {
  id: PerspectiveId;
  label: string;
  description: string;
}

export const homePerspectives: HomePerspective[] = [
  {
    id: 'ba',
    label: 'Business Analysis',
    description: 'Requirements, stakeholders, business rules, process improvement',
  },
  {
    id: 'dev',
    label: 'Development',
    description: 'Architecture, APIs, implementation, technical trade-offs',
  },
  {
    id: 'qe',
    label: 'Quality Engineering',
    description: 'Risks, edge cases, testing, validation, reliability',
  },
];

export interface Perspective {
  id: PerspectiveId;
  label: string;
  tagline: string;
  focusAreas: string[];
  scenario: {
    title: string;
    question: string;
    response: string;
  };
}

export const perspectives: Perspective[] = [
  {
    id: 'ba',
    label: 'Business Analyst',
    tagline: 'What does the business actually need?',
    focusAreas: [
      'Requirements gathering and documentation',
      'Stakeholder alignment',
      'Business rules and process flows',
      'Process improvement',
      'Functional and non-functional requirements',
    ],
    scenario: {
      title: 'Account status change request',
      question: 'An advisor needs to update a client account status.',
      response:
        'I would map the business rules governing valid status transitions, identify which stakeholders must approve each transition, and document the acceptance criteria before any design work begins.',
    },
  },
  {
    id: 'dev',
    label: 'Developer',
    tagline: 'How should this be built?',
    focusAreas: [
      'System architecture',
      'API design and contracts',
      'Database modeling',
      'Implementation patterns',
      'Technical trade-offs',
    ],
    scenario: {
      title: 'Account status change request',
      question: 'An advisor needs to update a client account status.',
      response:
        'I would evaluate whether status is a single field or a state machine, design an API that enforces valid transitions server-side, and ensure the data model supports audit history without breaking downstream consumers.',
    },
  },
  {
    id: 'qe',
    label: 'Quality Engineer',
    tagline: 'What could go wrong?',
    focusAreas: [
      'Risk identification',
      'Edge case analysis',
      'Test strategy and coverage',
      'Validation and verification',
      'Reliability and regression',
    ],
    scenario: {
      title: 'Account status change request',
      question: 'An advisor needs to update a client account status.',
      response:
        'I would test invalid transitions, concurrent updates, partial failures in downstream propagation, and verify that audit logs capture who changed what and when — including rollback scenarios.',
    },
  },
];
