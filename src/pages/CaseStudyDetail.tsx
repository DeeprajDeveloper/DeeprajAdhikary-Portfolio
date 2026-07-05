import { Navigate, useParams } from 'react-router-dom';
import { PageHeader, PlaceholderBanner, ContentSection } from '@design-system/index';
import { getCaseStudyBySlug, caseStudySections } from '@data/case-studies';
import { usePageTitle } from '@/hooks/usePageTitle';

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  usePageTitle(study?.title ?? 'Case Study');

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <div className="inner-page">
      <div className="inner-page__container inner-page__container--wide">
        <PageHeader
          eyebrow={study.topic}
          title={study.title}
          description={study.summary}
        />
        <PlaceholderBanner message="This case study is a placeholder. Fill in each section after desensitizing your project information." />

        <div className="case-study-sections">
          {caseStudySections.map((section) => (
            <ContentSection
              key={section.key}
              label={section.label}
              content={section.placeholder}
              isPlaceholder
            />
          ))}
        </div>
      </div>
    </div>
  );
}
