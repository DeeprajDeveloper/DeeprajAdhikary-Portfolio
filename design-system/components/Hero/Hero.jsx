import { useEffect, useState } from 'react';
import { ArrowFatLinesDown as ArrowFatLinesDownIcon } from '@phosphor-icons/react';
import Button from '../Button/Button';
import './Hero.scss';

const TYPE_MS = 45;
const DELETE_MS = 25;
const PAUSE_TYPED_MS = 2200;
const PAUSE_DELETED_MS = 400;

function useTypingRoles(roles) {
  const [displayText, setDisplayText] = useState(roles[0] ?? '');

  useEffect(() => {
    if (!roles.length) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      let index = 0;
      setDisplayText(roles[0]);
      const intervalId = setInterval(() => {
        index = (index + 1) % roles.length;
        setDisplayText(roles[index]);
      }, 3000);
      return () => clearInterval(intervalId);
    }

    let cancelled = false;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const tick = () => {
      if (cancelled) return;

      const current = roles[roleIndex];

      if (!isDeleting) {
        charIndex += 1;
        setDisplayText(current.slice(0, charIndex));

        if (charIndex >= current.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            tick();
          }, PAUSE_TYPED_MS);
          return;
        }

        timeoutId = setTimeout(tick, TYPE_MS);
        return;
      }

      charIndex -= 1;
      setDisplayText(current.slice(0, charIndex));

      if (charIndex <= 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeoutId = setTimeout(tick, PAUSE_DELETED_MS);
        return;
      }

      timeoutId = setTimeout(tick, DELETE_MS);
    };

    charIndex = 0;
    setDisplayText('');
    tick();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [roles]);

  return displayText;
}

export default function Hero({
  eyebrowRoles,
  hookLine,
  hookHighlight,
  subhead,
  ctaLabel,
  ctaHref,
  onScrollCue,
}) {
  const typedEyebrow = useTypingRoles(eyebrowRoles);

  const renderHook = () => {
    if (!hookHighlight || !hookLine.includes(hookHighlight)) {
      return hookLine;
    }
    const [before, after] = hookLine.split(hookHighlight);
    return (
      <>
        {before}
        <mark className="hero__highlight">{hookHighlight}</mark>
        {after}
      </>
    );
  };

  return (
    <section className="hero">
      <div className="hero__content">
        <span className="hero__eyebrow" aria-live="polite">
          <span className="hero__eyebrow-line">
            <span className="hero__eyebrow-text">{typedEyebrow}</span>
            <span className="hero__eyebrow-cursor" aria-hidden="true" />
          </span>
        </span>
        <h1 className="hero__hook">{renderHook()}</h1>
        <p className="hero__subhead">{subhead}</p>
        <Button variant="primary" to={ctaHref}>
          {ctaLabel}
        </Button>
      </div>
      {onScrollCue && (
        <button
          type="button"
          className="hero__scroll-cue"
          onClick={onScrollCue}
          aria-label="Scroll to next section"
        >
          <ArrowFatLinesDownIcon
            className="hero__scroll-icon"
            size={28}
            weight="regular"
            aria-hidden="true"
          />
        </button>
      )}
    </section>
  );
}
