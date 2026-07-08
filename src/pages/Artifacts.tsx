import {
  FileText,
  FlowArrow,
  GitBranch,
  ListChecks,
  Database,
  TreeStructure,
  CirclesThree,
  Layout,
  Code,
  ClipboardText,
  Warning,
} from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';
import type { ArtifactType } from '@data/artifacts';
import { PageHeader, PlaceholderBanner } from '@design-system/index';
import { artifacts, artifactTypes } from '@data/artifacts';
import { usePageTitle } from '@/hooks/usePageTitle';
import './Artifacts.scss';

const artifactIcons: Record<ArtifactType, React.ComponentType<IconProps>> = {
  brd: FileText,
  'functional-spec': FileText,
  'use-case': FlowArrow,
  'user-story': ListChecks,
  'acceptance-criteria': ListChecks,
  'process-map': FlowArrow,
  'sequence-diagram': GitBranch,
  'er-diagram': Database,
  'state-diagram': CirclesThree,
  wireframe: Layout,
  'api-spec': Code,
  'test-plan': ClipboardText,
  'risk-assessment': Warning,
};

export function ArtifactsPage() {
  usePageTitle('Artifacts');

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <PageHeader
          eyebrow="Documentation"
          title="Professional artifacts"
          description="Examples of the documentation I produce — BRDs, user stories, diagrams, test plans, and more. All fictional but realistic."
        />
        <PlaceholderBanner message="Artifact content is placeholder. Add desensitized examples when ready." />

        <div className="artifacts-grid">
          {artifacts.map((artifact) => {
            const IconComponent = artifactIcons[artifact.type] ?? TreeStructure;

            return (
              <article key={artifact.id} className="artifact-card">
                <IconComponent
                  className="artifact-card__icon"
                  size={24}
                  weight="duotone"
                  aria-hidden="true"
                />
                <span className="artifact-card__type">{artifactTypes[artifact.type]}</span>
                <h2 className="artifact-card__title">{artifact.label}</h2>
                <p className="artifact-card__description">{artifact.description}</p>
                <span className="artifact-card__status">Content coming soon</span>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
