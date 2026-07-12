import { Link } from 'react-router-dom';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';
import { PageHeader, Tag, Button } from '@design-system/index';
import { TagVariantKey } from '@constants/constants';
import { projects } from '@data/projects';
import { usePageTitle } from '@/hooks/usePageTitle';
import './Projects.scss';

export function ProjectsPage() {
  usePageTitle('Projects');

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <PageHeader
          eyebrow="Projects"
          title="Personal work and side projects"
          description="Focused on decision-making and reasoning, not technology lists."
        />

        <div className="projects-list">
          {projects.map((project) => (
            <article key={project.slug} className="project-card">
              <div className="project-card__header">
                <h2 className="project-card__title">
                  <Link to={`/projects/${project.slug}`} className="project-card__link">
                    {project.title}
                  </Link>
                </h2>
                <Tag variant={project.statusLabel as TagVariantKey}>{project.statusLabel}</Tag>
              </div>
              <p className="project-card__tagline">{project.tagline}</p>
              <div className="project-card__info">
                <Button
                  href={project.liveUrl}
                  external
                  variant="secondary"
                  size="sm"
                  className="project-card__external"
                >
                  Visit live site
                  <ArrowSquareOutIcon size={16} weight="duotone" aria-hidden="true" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
