export interface ProjectTechnicalDetail {
  label: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  status: 'active' | 'placeholder';
  statusLabel: string;
  repoUrl: string;
  liveUrl: string;
  coverImage?: string;
  coverImageAlt?: string;
  showPlaceholderBanner: boolean;
  problem: string;
  whyCreated: string[];
  technicalDetails: ProjectTechnicalDetail[];
}

export const projects: Project[] = [
  {
    slug: 'huetype',
    title: 'HueType',
    tagline: 'A personal project exploring design, interaction, and developer experience.',
    status: 'active',
    statusLabel: 'dev',
    repoUrl: 'https://github.com/DeeprajDeveloper/ProjectHueType',
    liveUrl: 'https://huetype.dev',
    coverImage: undefined,
    coverImageAlt: 'HueType brand preview',
    showPlaceholderBanner: true,
    problem:
      `Most palette tools show you five swatches in a row and expect you to imagine how they'll hold up on a real login page or a data-heavy dashboard. This is the problem I wanted to solve.`,
    whyCreated: [
      'I wanted a playground where palette and type choices feel alive in real UI, not just swatches.',
      'Static component galleries never answered whether a pairing would hold up in a full product surface.',
      'Building HueType let me explore design systems, interaction, and developer experience in one place.',
    ],
    technicalDetails: [
      {
        label: 'Design decisions',
        content:
          '[Placeholder — key design choices and reasoning. How the product surfaces color and type together.]',
      },
      {
        label: 'Technical choices',
        content:
          '[Placeholder — stack and architecture decisions. What you chose and why.]',
      },
      {
        label: 'Challenges',
        content:
          '[Placeholder — what was difficult and how you handled it.]',
      },
      {
        label: 'Future improvements',
        content:
          '[Placeholder — what comes next.]',
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
