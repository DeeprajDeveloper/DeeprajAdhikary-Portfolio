import { HighlighterCircleIcon, PowerIcon } from '@phosphor-icons/react';
import {
  useAnnotateMarks,
  useAnnotateMode,
  useAnnotateToast,
} from '@/context/AnnotateContext';
import './AnnotateToolbar.scss';

export function AnnotateToolbar() {
  const { enabled, setEnabled } = useAnnotateMode();
  const { markCount, clearMarks } = useAnnotateMarks();
  const { showToast, dismissToast } = useAnnotateToast();

  if (!enabled && !showToast) return null;

  return (
    <>
      {enabled && (
        <div className="annotate-toolbar" role="group" aria-label="Highlight mode controls">
          <span className="annotate-toolbar__status" aria-hidden="true">
            <HighlighterCircleIcon size={18} weight="duotone" />
          </span>

          {markCount > 0 && (
            <button
              type="button"
              className="annotate-toolbar__clear"
              onClick={clearMarks}
            >
              Clear
            </button>
          )}

          <button
            type="button"
            className="annotate-toolbar__power annotate-toolbar__power--on"
            aria-label="Turn off highlight mode"
            onClick={() => setEnabled(false)}
          >
            <PowerIcon size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>
      )}

      {showToast && (
        <div className="annotate-toast" role="status">
          <p className="annotate-toast__text">
            You’re highlighting the page now — try dragging over anything to highlight it.
          </p>
          <button
            type="button"
            className="annotate-toast__dismiss"
            onClick={dismissToast}
            aria-label="Dismiss"
          >
            Got it
          </button>
        </div>
      )}
    </>
  );
}
