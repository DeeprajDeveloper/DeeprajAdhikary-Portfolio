import { HighlighterCircleIcon } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';
import {
  useAnnotateMarks,
  useAnnotateMode,
  useAnnotateToast,
} from '@/context/AnnotateContext';
import './AnnotateToolbar.scss';

export function AnnotateToolbar() {
  const location = useLocation();
  const { enabled, toggle } = useAnnotateMode();
  const { markCount, clearMarks } = useAnnotateMarks();
  const { showToast, dismissToast } = useAnnotateToast();
  const onPlayground = location.pathname.startsWith('/playground');
  const visible = enabled || markCount > 0 || onPlayground || showToast;

  if (!visible) return null;

  return (
    <>
      <div className="annotate-toolbar" role="group" aria-label="Annotate mode controls">
        <button
          type="button"
          className={`annotate-toolbar__toggle ${enabled ? 'annotate-toolbar__toggle--active' : ''}`}
          aria-pressed={enabled}
          aria-label={enabled ? 'Turn off Highlight mode' : 'Turn on Highlight mode'}
          onClick={toggle}
        >
          <HighlighterCircleIcon size={18} weight="duotone" aria-hidden="true" />
          <span>{enabled ? 'Highlighting' : 'Highlight'}</span>
        </button>

        {markCount > 0 && (
          <button
            type="button"
            className="annotate-toolbar__clear"
            onClick={clearMarks}
          >
            Clear all highlights
          </button>
        )}
      </div>

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
