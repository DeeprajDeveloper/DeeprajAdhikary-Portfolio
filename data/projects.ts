export interface Project {
  slug: string;
  title: string;
  tagline: string;
  status: 'active' | 'placeholder';
  statusLabel: string;
  repoUrl: string;
  liveUrl: string;
  sections: {
    problem: string;
    motivation: string;
    designDecisions: string;
    technicalChoices: string;
    challenges: string;
    futureImprovements: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'huetype',
    title: 'HueType',
    tagline: 'A personal project exploring design, interaction, and developer experience.',
    status: 'active',
    statusLabel: 'dev',
    repoUrl: 'https://github.com/DeeprajDeveloper/HueType',
    liveUrl: 'https://huetype.dev',
    sections: {
      problem: '[Placeholder — describe the problem HueType solves]',
      motivation: '[Placeholder — why you built it]',
      designDecisions: '[Placeholder — key design choices and reasoning]',
      technicalChoices: '[Placeholder — stack and architecture decisions]',
      challenges: '[Placeholder — what was difficult and how you handled it]',
      futureImprovements: '[Placeholder — what comes next]',
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
