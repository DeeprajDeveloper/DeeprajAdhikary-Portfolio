import { PageHeader, BackLink, Button } from '@design-system/index';
import { useAnnotateMode } from '@/context/AnnotateContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import './PlaygroundAnnotate.scss';

export function PlaygroundAnnotatePage() {
  usePageTitle('Highlighting Mode');
  const { enabled, setEnabled } = useAnnotateMode();

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <BackLink to="/playground" label="Playground" />
        <PageHeader
          eyebrow="Playground"
          title="Highlighting Mode"
          actions={
            <Button
              variant={enabled ? 'primary' : 'secondary'}
              onClick={() => setEnabled(!enabled)}
            >
              {enabled ? 'Highlighting mode on' : 'Enable highlighting mode'}
            </Button>
          }
        />

        <div className="annotate-intro" data-annotatable>
          <p>
            Enable highlighting mode, then drag across this prose the way you’d mark up a requirements
            doc. Marks live for this session only — reload and they’re gone.
          </p>
          <p>
            This paragraph is annotatable too. Try selecting across both paragraphs, or just a few
            words. Buttons, navigation, and tags stay off-limits — yellow already means something
            there.
          </p>
        </div>
      </div>
    </div>
  );
}
