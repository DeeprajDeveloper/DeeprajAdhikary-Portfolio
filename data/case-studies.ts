export type CaseStudySectionKey =
  | 'problem'
  | 'discovery'
  | 'stakeholders'
  | 'businessRules'
  | 'functionalRequirements'
  | 'nonFunctionalRequirements'
  | 'userStories'
  | 'acceptanceCriteria'
  | 'systemFlow'
  | 'databaseConsiderations'
  | 'apiConsiderations'
  | 'architectureDecisions'
  | 'risks'
  | 'testingStrategy'
  | 'lessonsLearned';

export interface CaseStudySection {
  key: CaseStudySectionKey;
  label: string;
  placeholder: string;
}

export const caseStudySections: CaseStudySection[] = [
  { key: 'problem', label: 'Problem', placeholder: 'Describe the core problem this case study addresses.' },
  { key: 'discovery', label: 'Discovery', placeholder: 'How was the problem investigated and understood?' },
  { key: 'stakeholders', label: 'Stakeholders', placeholder: 'Who was involved and what did each group need?' },
  { key: 'businessRules', label: 'Business Rules', placeholder: 'What rules governed the system behavior?' },
  { key: 'functionalRequirements', label: 'Functional Requirements', placeholder: 'What must the system do?' },
  { key: 'nonFunctionalRequirements', label: 'Non-functional Requirements', placeholder: 'Performance, security, compliance constraints.' },
  { key: 'userStories', label: 'User Stories', placeholder: 'User stories in standard format.' },
  { key: 'acceptanceCriteria', label: 'Acceptance Criteria', placeholder: 'Testable criteria for each requirement.' },
  { key: 'systemFlow', label: 'System Flow', placeholder: 'End-to-end flow through the system.' },
  { key: 'databaseConsiderations', label: 'Database Considerations', placeholder: 'Data model, integrity, and storage decisions.' },
  { key: 'apiConsiderations', label: 'API Considerations', placeholder: 'API design, contracts, and integration points.' },
  { key: 'architectureDecisions', label: 'Architecture Decisions', placeholder: 'Key technical decisions and trade-offs.' },
  { key: 'risks', label: 'Risks', placeholder: 'Identified risks and mitigation strategies.' },
  { key: 'testingStrategy', label: 'Testing Strategy', placeholder: 'How quality was validated.' },
  { key: 'lessonsLearned', label: 'Lessons Learned', placeholder: 'What this project taught.' },
];

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  status: 'placeholder';
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'account-opening-workflow',
    title: 'Account Opening Workflow',
    summary: 'End-to-end workflow for onboarding new client accounts with validation, approval gates, and downstream propagation.',
    topic: 'Account Opening',
    status: 'placeholder',
    featured: true,
  },
  {
    slug: 'dividend-processing',
    title: 'Dividend Processing',
    summary: 'Calculation, allocation, and distribution of dividend payments across multiple account types.',
    topic: 'Dividend Processing',
    status: 'placeholder',
    featured: true,
  },
  {
    slug: 'transaction-approval-flow',
    title: 'Transaction Approval Flow',
    summary: 'Multi-level approval workflow for high-value transactions with audit trail and escalation rules.',
    topic: 'Transaction Approval',
    status: 'placeholder',
    featured: false,
  },
  {
    slug: 'document-management',
    title: 'Document Management',
    summary: 'Upload, classification, retention, and retrieval of client documents with compliance requirements.',
    topic: 'Document Management',
    status: 'placeholder',
    featured: false,
  },
  {
    slug: 'notification-engine',
    title: 'Notification Engine',
    summary: 'Event-driven notification system for client and advisor alerts across channels.',
    topic: 'Notification Engine',
    status: 'placeholder',
    featured: false,
  },
  {
    slug: 'user-permissions',
    title: 'User Permissions',
    summary: 'Role-based access control for advisors, operations staff, and system administrators.',
    topic: 'User Permissions',
    status: 'placeholder',
    featured: false,
  },
  {
    slug: 'audit-trail',
    title: 'Audit Trail',
    summary: 'Immutable logging of system changes for regulatory compliance and forensic analysis.',
    topic: 'Audit Trail',
    status: 'placeholder',
    featured: false,
  },
  {
    slug: 'portfolio-rebalancing',
    title: 'Portfolio Rebalancing',
    summary: 'Automated rebalancing logic with constraint validation and trade execution.',
    topic: 'Portfolio Rebalancing',
    status: 'placeholder',
    featured: false,
  },
  {
    slug: 'reporting-pipeline',
    title: 'Reporting Pipeline',
    summary: 'Data aggregation and report generation for regulatory and client-facing outputs.',
    topic: 'Reporting Pipeline',
    status: 'placeholder',
    featured: false,
  },
];

export const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
