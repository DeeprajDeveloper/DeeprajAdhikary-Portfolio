import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { PageHeader, Tag } from '@design-system/index';
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
            <Link key={project.slug} to={`/projects/${project.slug}`} className="project-card">
              <div className="project-card__header">
                <h2 className="project-card__title">{project.title}</h2>
                <Tag variant="placeholder">Placeholder</Tag>
              </div>
              <p className="project-card__tagline">{project.tagline}</p>
              <span className="project-card__cta">
                View project <ArrowRight size={14} weight="duotone" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
