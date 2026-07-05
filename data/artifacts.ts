export type ArtifactType =
  | 'brd'
  | 'functional-spec'
  | 'use-case'
  | 'user-story'
  | 'acceptance-criteria'
  | 'process-map'
  | 'sequence-diagram'
  | 'er-diagram'
  | 'state-diagram'
  | 'wireframe'
  | 'api-spec'
  | 'test-plan'
  | 'risk-assessment';

export interface Artifact {
  id: string;
  type: ArtifactType;
  label: string;
  description: string;
}

export const artifactTypes: Record<ArtifactType, string> = {
  brd: 'Business Requirements Document',
  'functional-spec': 'Functional Specification',
  'use-case': 'Use Case',
  'user-story': 'User Story',
  'acceptance-criteria': 'Acceptance Criteria',
  'process-map': 'Process Map',
  'sequence-diagram': 'Sequence Diagram',
  'er-diagram': 'ER Diagram',
  'state-diagram': 'State Diagram',
  wireframe: 'Wireframe',
  'api-spec': 'API Specification',
  'test-plan': 'Test Plan',
  'risk-assessment': 'Risk Assessment',
};

export const artifacts: Artifact[] = [
  { id: 'brd-01', type: 'brd', label: 'Account Onboarding BRD', description: 'Fictional business requirements for a client onboarding workflow.' },
  { id: 'user-story-01', type: 'user-story', label: 'Status Change User Stories', description: 'User stories for an account status management feature.' },
  { id: 'acceptance-01', type: 'acceptance-criteria', label: 'Dividend Calculation AC', description: 'Acceptance criteria for dividend allocation logic.' },
  { id: 'process-01', type: 'process-map', label: 'Approval Workflow Map', description: 'Process map for a multi-level transaction approval flow.' },
  { id: 'sequence-01', type: 'sequence-diagram', label: 'Notification Sequence', description: 'Sequence diagram for event-driven notifications.' },
  { id: 'er-01', type: 'er-diagram', label: 'Client Data Model', description: 'Entity-relationship diagram for core client entities.' },
  { id: 'state-01', type: 'state-diagram', label: 'Account State Machine', description: 'State diagram for account lifecycle transitions.' },
  { id: 'api-01', type: 'api-spec', label: 'Account API Spec', description: 'API specification for account management endpoints.' },
  { id: 'test-01', type: 'test-plan', label: 'Regression Test Plan', description: 'Test plan for a major release regression cycle.' },
  { id: 'risk-01', type: 'risk-assessment', label: 'Data Migration Risk Assessment', description: 'Risk assessment for a production data migration.' },
];
