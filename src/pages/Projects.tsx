import { Link } from 'react-router-dom';
import { ArrowSquareOut } from '@phosphor-icons/react';
import { PageHeader, Tag } from '@design-system/index';
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
              <Link to={`/projects/${project.slug}`} className="project-card__link">
                <div className="project-card__header">
                  <h2 className="project-card__title">{project.title}</h2>
                  <Tag variant={project.statusLabel as TagVariantKey}>{project.statusLabel}</Tag>
                </div>
                <p className="project-card__tagline">{project.tagline}</p>
              </Link>
              <div className="project-card__info">
                <p className="project-card__hint">Click card to see details</p>
                <Link
                  to={project.liveUrl}
                  className="project-card__external"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live site <ArrowSquareOut size={14} weight="duotone" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
