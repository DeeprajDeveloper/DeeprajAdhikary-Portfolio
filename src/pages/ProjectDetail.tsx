import { Navigate, useParams } from 'react-router-dom';
import { PageHeader, BackLink, PlaceholderBanner, ContentSection, Button } from '@design-system/index';
import { getProjectBySlug } from '@data/projects';
import { usePageTitle } from '@/hooks/usePageTitle';
import './Projects.scss';
import { GithubLogoIcon, GlobeIcon } from '@phosphor-icons/react';

const sectionLabels: Record<string, string> = {
  problem: 'The Problem',
  motivation: 'Motivation',
  designDecisions: 'Design Decisions',
  technicalChoices: 'Technical Choices',
  challenges: 'Challenges',
  futureImprovements: 'Future Improvements',
};

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  usePageTitle(project?.title ?? 'Project');

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="inner-page">
      <div className="inner-page__container inner-page__container--wide">
        <BackLink to="/projects" label="Projects" />
        <PageHeader
          eyebrow="Project"
          title={project.title}
          description={project.tagline}
          actions={
            <>
              <Button href={project.repoUrl} external variant="secondary" size="sm">
              <GithubLogoIcon size={16} weight="duotone" aria-hidden="true" />
                Git repo
              </Button>
              <Button href={project.liveUrl} external variant="secondary" size="sm">
                <GlobeIcon size={16} weight="duotone" aria-hidden="true" />
                Live website
              </Button>
            </>
          }
        />
        <PlaceholderBanner message="HueType content is placeholder — fill in when ready." />

        <div className="project-sections">
          {Object.entries(project.sections).map(([key, content]) => (
            <ContentSection
              key={key}
              label={sectionLabels[key] ?? key}
              content={content}
              isPlaceholder
            />
          ))}
        </div>
      </div>
    </div>
  );
}
