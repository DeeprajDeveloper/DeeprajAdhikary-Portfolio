import {
  Robot,
  CirclesFour,
  Eye,
  Sparkle,
  Wrench,
  Compass,
} from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';
import { PageHeader } from '@design-system/index';
import { exploringTopics } from '@data/exploring';
import { usePageTitle } from '@/hooks/usePageTitle';
import './Exploring.scss';

const topicIcons: Record<string, React.ComponentType<IconProps>> = {
  'ai-dev': Robot,
  'system-design': CirclesFour,
  accessibility: Eye,
  'motion-design': Sparkle,
  'developer-experience': Wrench,
  'product-thinking': Compass,
};

export function ExploringPage() {
  usePageTitle('Currently Exploring');

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <PageHeader
          eyebrow="Learning"
          title="Currently exploring"
          description="Technologies and topics I am actively learning. This section evolves over time."
        />

        <div className="exploring-grid">
          {exploringTopics.map((topic) => {
            const IconComponent = topicIcons[topic.id] ?? Compass;

            return (
              <article key={topic.id} className="exploring-card">
                <IconComponent
                  className="exploring-card__icon"
                  size={24}
                  weight="duotone"
                  aria-hidden="true"
                />
                <h2 className="exploring-card__label">{topic.label}</h2>
                <p className="exploring-card__description">{topic.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
