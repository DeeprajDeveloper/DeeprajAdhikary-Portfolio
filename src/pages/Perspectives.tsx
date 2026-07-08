import { PageHeader, PerspectiveSwitcher } from '@design-system/index';
import { perspectives } from '@data/perspectives';
import { usePageTitle } from '@/hooks/usePageTitle';

export function PerspectivesPage() {
  usePageTitle('Perspectives');

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <PageHeader
          eyebrow="Three Perspectives"
          title="The same problem, three ways of seeing it"
          description="Business Analysis, Development, and Quality Engineering are not separate silos in my work — they are complementary lenses on the same system."
        />
        <PerspectiveSwitcher perspectives={perspectives} />
      </div>
    </div>
  );
}
