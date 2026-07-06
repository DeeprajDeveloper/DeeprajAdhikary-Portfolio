import { useState } from 'react';
import { ArrowFatLinesDownIcon } from '@phosphor-icons/react';
import { features } from '@config/features';
import { hero } from '@data/hero';
import { Button } from '../Button/Button';
import { useTypingRoles } from './useTypingRoles';
import './Hero.scss';

const lensesTypewriterEnabled = features.heroLensesTypewriter;

const [headlineBefore, headlineAfter] = (() => {
  const interactive = hero.headlineInteractive;
  const start = hero.headline.indexOf(interactive);
  if (start === -1) {
    return [hero.headline, ''];
  }
  return [
    hero.headline.slice(0, start),
    hero.headline.slice(start + interactive.length),
  ];
})();

export function Hero() {
  const [lensesHovered, setLensesHovered] = useState(false);
  const typedEyebrow = useTypingRoles(hero.eyebrowRoles);
  const typedPerspective = useTypingRoles(
    hero.headlinePerspectives,
    lensesTypewriterEnabled && lensesHovered,
  );
  const lensesText =
    lensesTypewriterEnabled && lensesHovered
      ? typedPerspective
      : hero.headlineInteractive;

  const scrollToContent = () => {
    document.getElementById('perspectives')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero__content">
        <span className="hero__eyebrow" aria-live="polite">
          <span className="hero__eyebrow-line">
            <span className="hero__eyebrow-text">{typedEyebrow}</span>
            <span className="hero__eyebrow-cursor" aria-hidden="true" />
          </span>
        </span>

        <h1 id="hero-heading" className="hero__hook">
          {headlineBefore}
          {lensesTypewriterEnabled ? (
            <span
              className="hero__lenses hero__highlight"
              onMouseEnter={() => setLensesHovered(true)}
              onMouseLeave={() => setLensesHovered(false)}
              onFocus={() => setLensesHovered(true)}
              onBlur={() => setLensesHovered(false)}
              tabIndex={0}
              aria-label={`Perspectives: ${hero.headlinePerspectives.join(', ')}`}
            >
              <span className="hero__lenses-line">
                <span className="hero__lenses-text">{lensesText}</span>
                {lensesHovered && (
                  <span className="hero__lenses-cursor" aria-hidden="true" />
                )}
              </span>
            </span>
          ) : (
            <span className="hero__highlight">{hero.headlineInteractive}</span>
          )}
          {headlineAfter}
        </h1>

        <p className="hero__subhead">{hero.subheadline}</p>

        <div className="hero__actions">
          <Button to={hero.cta.href} variant="primary">
            {hero.cta.label}
          </Button>
          <Button to={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>

      <button
        type="button"
        className="hero__scroll-cue"
        onClick={scrollToContent}
        aria-label="Scroll to know more"
      >
        <span className="hero__scroll-cue-text">Scroll to explore</span>
        <ArrowFatLinesDownIcon className="hero__scroll-icon" size={20} weight="duotone" aria-hidden="true" />
      </button>
    </section>
  );
}
