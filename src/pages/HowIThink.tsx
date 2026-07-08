import { PageHeader, ThinkingFlow } from '@design-system/index';
import { thinkingStages } from '@data/thinking';
import { usePageTitle } from '@/hooks/usePageTitle';

export function HowIThinkPage() {
  usePageTitle('My thinking process');

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <PageHeader
          eyebrow="Approach"
          title="How I think through complex problems"
          description="Every system I work on gets the same treatment — whether I am gathering requirements, reviewing architecture, or designing test coverage. This is the flow I follow."
        />
        <ThinkingFlow stages={thinkingStages} />
      </div>
    </div>
  );
}
