import { House } from '@phosphor-icons/react';
import { PageHeader, Button } from '@design-system/index';
import { usePageTitle } from '@/hooks/usePageTitle';

export function NotFoundPage() {
  usePageTitle('Not Found');

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <PageHeader
          eyebrow="404"
          title="Page not found"
          description="The page you are looking for does not exist or has been moved."
        />
        <Button href="/" variant="primary">
          <House size={18} weight="bold" aria-hidden="true" />
          Back to home
        </Button>
      </div>
    </div>
  );
}
