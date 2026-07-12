import { Hero, CaseStudyCard, PerspectiveCard, SectionTeaser } from '@design-system/index';
import { featuredCaseStudies } from '@data/case-studies';
import { homePerspectives } from '@data/perspectives';
import { usePageTitle } from '@/hooks/usePageTitle';
import './Home.scss';

export function HomePage() {
  usePageTitle();

  return (
    <div className="home-page">
      <Hero />

      <section className="section section--tight home-perspectives" id="perspectives">
        <div className="section__container">
          <div className="section__header">
            <p className="section__eyebrow">Perspectives</p>
            <h2 className="section__title">Three complementary lenses</h2>
            <p className="section__description">
              Business Analysis, Development, and Quality Engineering — interconnected
              ways of seeing the same system, not separate silos.
            </p>
          </div>

          <div className="home-perspectives__grid">
            {homePerspectives.map((perspective) => (
              <PerspectiveCard key={perspective.id} perspective={perspective} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight home-featured" id="case-studies">
        <div className="section__container">
          <div className="section__header">
            <p className="section__eyebrow">Case Studies</p>
            <h2 className="section__title">Fictionalized enterprise scenarios</h2>
            <p className="section__description">
              Placeholder case studies inspired by real-world wealth management experience.
              Content will be filled in after desensitizing project details.
            </p>
          </div>

          <div className="home-featured__grid">
            {featuredCaseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      <section className="section home-explore" id="explore">
        <div className="section__container">
          <div className="section__header">
            <p className="section__eyebrow">Explore</p>
            <h2 className="section__title">Discover how I work</h2>
          </div>

          <div className="home-explore__grid">
            <SectionTeaser
              eyebrow="Process"
              title="How I Think"
              description="An interactive walkthrough of my problem-solving approach — from problem to iteration."
              href="/thinking"
            />
            <SectionTeaser
              eyebrow="Artifacts"
              title="Documentation Showcase"
              description="Sample BRDs, user stories, diagrams, and test plans — fictional but realistic."
              href="/artifacts"
            />
            <SectionTeaser
              eyebrow="Insights"
              title="Lessons Learned"
              description="Insights from nearly a decade working on a large enterprise platform."
              href="/lessons"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
