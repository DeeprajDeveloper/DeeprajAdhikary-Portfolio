import { useId, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CaretDownIcon, GithubLogoIcon, GlobeIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PageHeader, BackLink, PlaceholderBanner, Button } from '@design-system/index';
import { getProjectBySlug } from '@data/projects';
import { usePageTitle } from '@/hooks/usePageTitle';
import './ProjectDetail.scss';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [techOpen, setTechOpen] = useState(false);
  const techPanelId = useId();
  const techSectionRef = useRef<HTMLElement>(null);
  const shouldScrollTechRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  usePageTitle(project?.title ?? 'Project');

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const scrollTechIntoView = () => {
    techSectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const handleTechToggle = () => {
    setTechOpen((open) => {
      const next = !open;
      shouldScrollTechRef.current = next;
      return next;
    });
  };

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
              <Button
                href={project.liveUrl}
                external
                variant="primary"
                size="sm"
                className="project-detail__cta project-detail__cta--live"
              >
                <span className="project-detail__cta-face">
                  <GlobeIcon size={16} weight="duotone" aria-hidden="true" />
                  Live website
                </span>
              </Button>
              <Button
                href={project.repoUrl}
                external
                variant="secondary"
                size="sm"
                className="project-detail__cta project-detail__cta--github"
              >
                <span className="project-detail__cta-face">
                  <GithubLogoIcon size={16} weight="duotone" aria-hidden="true" />
                  Git repo
                </span>
              </Button>
            </>
          }
        />

        {project.showPlaceholderBanner && (
          <PlaceholderBanner message="HueType content is placeholder — fill in when ready." />
        )}

        <figure className="project-detail__cover">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.coverImageAlt ?? `${project.title} preview`}
              className="project-detail__cover-image"
            />
          ) : (
            <div className="project-detail__cover-placeholder" aria-hidden="true">
              <span className="project-detail__cover-mark">{project.title}</span>
              <span className="project-detail__cover-caption">Brand / product preview coming soon</span>
            </div>
          )}
        </figure>

        <section className="project-detail__problem" aria-labelledby="project-problem-heading">
          <h3 id="project-problem-heading" className="project-detail__problem-label">
            The problem
          </h3>
          <p className="project-detail__problem-statement">{project.problem}</p>
        </section>

        <section className="project-detail__why" aria-labelledby="project-why-heading">
          <h3 id="project-why-heading" className="project-detail__section-label">
            Why I created it
          </h3>
          <ul className="project-detail__pointers">
            {project.whyCreated.map((point) => (
              <li key={point} className="project-detail__pointer">
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section
          ref={techSectionRef}
          className="project-detail__tech"
          aria-labelledby="project-tech-toggle"
        >
          <button
            type="button"
            id="project-tech-toggle"
            className={`project-detail__tech-toggle ${techOpen ? 'project-detail__tech-toggle--open' : ''}`}
            aria-expanded={techOpen}
            aria-controls={techPanelId}
            onClick={handleTechToggle}
          >
            <span>See how it was built</span>
            <CaretDownIcon
              className="project-detail__tech-caret"
              size={18}
              weight="duotone"
              aria-hidden="true"
            />
          </button>

          <AnimatePresence initial={false}>
            {techOpen && (
              <motion.div
                id={techPanelId}
                className="project-detail__tech-panel"
                role="region"
                aria-labelledby="project-tech-toggle"
                initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  if (!shouldScrollTechRef.current) return;
                  shouldScrollTechRef.current = false;
                  scrollTechIntoView();
                }}
              >
                <div className="project-detail__tech-inner">
                  {project.technicalDetails.map((detail) => (
                    <article key={detail.label} className="project-detail__tech-item">
                      <h4 className="project-detail__tech-label">{detail.label}</h4>
                      <p className="project-detail__tech-body">{detail.content}</p>
                    </article>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
