import { PageHeader, PlaygroundCard } from '@design-system/index';
import { playgroundItems } from '@data/playground';
import { usePageTitle } from '@/hooks/usePageTitle';
import './Playground.scss';

export function PlaygroundPage() {
  usePageTitle('Playground');

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <PageHeader
          eyebrow="Playground"
          title="A corner of the site that’s allowed to be fun"
          description="Use the star button in the bottom-right corner anytime — or jump into a demo below."
        />

        <div className="playground-grid">
          {playgroundItems.map((item) => (
            <PlaygroundCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
