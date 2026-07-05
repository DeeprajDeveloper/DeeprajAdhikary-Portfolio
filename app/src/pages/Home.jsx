import { useRef } from 'react';
import {
  Nav,
  Hero,
  CareerJourney,
  CaseStudyCard,
  Footer,
} from '@design-system/index';
import {
  hero,
  careerJourney,
  featuredCaseStudies,
  pages,
} from '@data/index';
import './Home.scss';

export default function Home() {
  const caseStudiesRef = useRef(null);
  const { caseStudiesSection } = pages.home;

  const scrollToCaseStudies = () => {
    caseStudiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      <Nav transparent />
      <Hero {...hero} onScrollCue={scrollToCaseStudies} />
      <CareerJourney {...careerJourney} />
      <section ref={caseStudiesRef} className="home__case-studies">
        <div className="home__case-studies-inner">
          <h2 className="home__section-title">{caseStudiesSection.title}</h2>
          <p className="home__section-intro">{caseStudiesSection.intro}</p>
          <div className="home__cards">
            {featuredCaseStudies.map((study) => (
              <CaseStudyCard key={study.slug} {...study} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
