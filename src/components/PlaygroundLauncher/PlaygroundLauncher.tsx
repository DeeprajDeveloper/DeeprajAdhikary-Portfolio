import { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CricketIcon, XIcon } from '@phosphor-icons/react';
import { playgroundItems } from '@data/playground';
import { useAnnotateMode } from '@/context/AnnotateContext';
import './PlaygroundLauncher.scss';

export function PlaygroundLauncher() {
  const [open, setOpen] = useState(false);
  const [consoleHint, setConsoleHint] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setEnabled } = useAnnotateMode();

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

    if (slug === 'annotate') {
      setEnabled(true);
    }

    setOpen(false);
    if (href) navigate(href);
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
            <p className="playground-launcher__eyebrow">Playground</p>
            <p className="playground-launcher__title">Pick something to try</p>
          </div>

          <ul className="playground-launcher__list">
            {playgroundItems.map((item) => (
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

          <Link
            to="/playground"
            className="playground-launcher__all"
            onClick={() => setOpen(false)}
          >
            Open full playground page
          </Link>
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
