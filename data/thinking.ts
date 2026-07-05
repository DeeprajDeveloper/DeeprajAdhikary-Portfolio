export type ThinkingStageId =
  | 'problem'
  | 'discovery'
  | 'requirements'
  | 'design'
  | 'implementation'
  | 'testing'
  | 'iteration';

export interface ThinkingStage {
  id: ThinkingStageId;
  label: string;
  summary: string;
  detail: string;
}

export const thinkingStages: ThinkingStage[] = [
  {
    id: 'problem',
    label: 'Problem',
    summary: 'Start with what is actually broken, not what someone assumed was broken.',
    detail:
      'I begin by separating symptoms from root causes. A vague complaint like "the workflow feels slow" becomes a specific question: slow for whom, at which step, and compared to what expectation?',
  },
  {
    id: 'discovery',
    label: 'Discovery',
    summary: 'Map the system as it exists — not as documentation claims it exists.',
    detail:
      'I trace data flows, talk to the people who use the system daily, and identify where reality diverges from the intended design. Discovery is where most assumptions get challenged.',
  },
  {
    id: 'requirements',
    label: 'Requirements',
    summary: 'Translate understanding into testable, unambiguous statements of need.',
    detail:
      'Good requirements are specific enough that two developers would build the same thing, and testable enough that QA can verify them without guessing intent.',
  },
  {
    id: 'design',
    label: 'Design',
    summary: 'Choose structures that serve the business rule, not just the immediate ticket.',
    detail:
      'Design decisions balance what is needed now with what will need to change later. I document trade-offs so future teams understand why a path was chosen.',
  },
  {
    id: 'implementation',
    label: 'Implementation',
    summary: 'Build with awareness of downstream impact.',
    detail:
      'Implementation is where requirements meet reality. I stay close enough to the code to catch when a technically valid solution violates a business rule or creates a testing gap.',
  },
  {
    id: 'testing',
    label: 'Testing',
    summary: 'Validate behavior across happy paths, edge cases, and failure modes.',
    detail:
      'Testing is not a phase at the end — it is a lens applied throughout. I design test scenarios from requirements, not from whatever happens to be built.',
  },
  {
    id: 'iteration',
    label: 'Iteration',
    summary: 'Learn from what shipped and feed that back into the system.',
    detail:
      'Every release teaches something. I capture lessons in documentation, update test coverage, and refine requirements based on what production behavior revealed.',
  },
];
