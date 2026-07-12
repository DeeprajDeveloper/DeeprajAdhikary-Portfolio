import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CricketIcon, PowerIcon, XIcon } from '@phosphor-icons/react';
import { playgroundItems } from '@data/playground';
import { useAnnotateMode } from '@/context/AnnotateContext';
import './PlaygroundLauncher.scss';

const launcherItems = playgroundItems.filter((item) => item.slug !== 'annotate');

export function PlaygroundLauncher() {
  const [open, setOpen] = useState(false);
  const [consoleHint, setConsoleHint] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { enabled, toggle } = useAnnotateMode();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setConsoleHint(false);
  }, [open]);

  const handleItem = (slug: string, href: string | null) => {
    if (slug === 'console-egg') {
      setConsoleHint(true);
      return;
    }

    setOpen(false);
    if (href) navigate(href);
  };

  const handleHighlightToggle = () => {
    toggle();
  };

  return (
    <div className="playground-launcher" ref={rootRef}>
      {open && (
        <div
          className="playground-launcher__panel"
          id={panelId}
          role="dialog"
          aria-label="Playground"
        >
          <div className="playground-launcher__header">
            <div className="playground-launcher__header-copy">
              <p className="playground-launcher__eyebrow">Playground</p>
              <p className="playground-launcher__title">Pick something to try</p>
            </div>
          </div>

          <div className="playground-launcher__power-row">
            <div className="playground-launcher__power-copy">
              <p className="playground-launcher__power-label">Highlighter</p>
              <p className="playground-launcher__power-desc">
                Mark up prose across the site. Drag to highlight.
              </p>
            </div>
            <button
              type="button"
              className={`playground-launcher__power ${enabled ? 'playground-launcher__power--on' : ''}`}
              aria-pressed={enabled}
              aria-label={enabled ? 'Turn off highlighter' : 'Turn on highlighter'}
              onClick={handleHighlightToggle}
            >
              <PowerIcon size={22} weight="bold" aria-hidden="true" />
            </button>
          </div>

          <ul className="playground-launcher__list">
            {launcherItems.map((item) => (
              <li key={item.slug}>
                <button
                  type="button"
                  className="playground-launcher__item"
                  onClick={() => handleItem(item.slug, item.href)}
                >
                  <span className="playground-launcher__item-tag">{item.tag}</span>
                  <span className="playground-launcher__item-title">{item.title}</span>
                  <span className="playground-launcher__item-desc">{item.description}</span>
                </button>
              </li>
            ))}
          </ul>

          {consoleHint && (
            <p className="playground-launcher__hint" role="status">
              Open your browser console — the ticket is already waiting.
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        className={`playground-launcher__fab ${open ? 'playground-launcher__fab--open' : ''}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close playground' : 'Open playground'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <XIcon size={22} weight="bold" aria-hidden="true" />
        ) : (
          <CricketIcon size={22} weight="fill" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
