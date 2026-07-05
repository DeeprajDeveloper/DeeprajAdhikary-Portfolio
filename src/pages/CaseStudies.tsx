import { PageHeader, CaseStudyCard, PlaceholderBanner } from '@design-system/index';
import { caseStudies } from '@data/case-studies';
import { usePageTitle } from '@/hooks/usePageTitle';
import './CaseStudies.scss';

export function CaseStudiesPage() {
  usePageTitle('Case Studies');

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <PageHeader
          eyebrow="Case Studies"
          title="Enterprise scenarios, fictionalized"
          description="These case studies are generalized scenarios inspired by real-world wealth management experience. All content is placeholder until project details are desensitized."
        />
        <PlaceholderBanner />
        <div className="case-studies-grid">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </div>
  );
}
