import { useState, type CSSProperties } from 'react';
import { ArrowFatLinesDownIcon } from '@phosphor-icons/react';
import { features } from '@config/features';
import { hero } from '@data/hero';
import { Button } from '../Button/Button';
import { HeroOrbit } from './HeroOrbit';
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

function splitWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

/** Ease-in-out cubic: slow start, fast middle, slow end. */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

const CASCADE_SECONDS = 1.15;

function wordDelay(index: number, total: number): number {
  if (total <= 1) return 0;
  return easeInOutCubic(index / (total - 1)) * CASCADE_SECONDS;
}

function HeroWords({
  words,
  startIndex,
  total,
  className = '',
}: {
  words: string[];
  startIndex: number;
  total: number;
  className?: string;
}) {
  return words.map((word, offset) => {
    const index = startIndex + offset;
    return (
      <span
        key={`${index}-${word}`}
        className={`hero__word ${className}`.trim()}
        style={
          {
            '--hero-word-delay': wordDelay(index, total),
          } as CSSProperties
        }
      >
        <span className="hero__word-inner">{word}</span>
      </span>
    );
  });
}

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

  const beforeWords = splitWords(headlineBefore);
  const interactiveWords = splitWords(hero.headlineInteractive);
  const afterWords = splitWords(headlineAfter);
  const totalWords = beforeWords.length + interactiveWords.length + afterWords.length;

  const scrollToContent = () => {
    document.getElementById('perspectives')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      {features.heroOrbit && <HeroOrbit />}
      <div className="hero__content">
        <span className="hero__eyebrow" aria-live="polite">
          <span className="hero__eyebrow-line">
            <span className="hero__eyebrow-text">{typedEyebrow}</span>
            <span className="hero__eyebrow-cursor" aria-hidden="true" />
          </span>
        </span>

        <h1 id="hero-heading" className="hero__hook">
          <HeroWords words={beforeWords} startIndex={0} total={totalWords} />
          {lensesTypewriterEnabled ? (
            <span
              className="hero__lenses"
              onMouseEnter={() => setLensesHovered(true)}
              onMouseLeave={() => setLensesHovered(false)}
              onFocus={() => setLensesHovered(true)}
              onBlur={() => setLensesHovered(false)}
              tabIndex={0}
              aria-label={`Perspectives: ${hero.headlinePerspectives.join(', ')}`}
            >
              {lensesHovered ? (
                <span className="hero__lenses-line hero__highlight">
                  <span className="hero__lenses-text">{lensesText}</span>
                  <span className="hero__lenses-cursor" aria-hidden="true" />
                </span>
              ) : (
                <HeroWords
                  words={interactiveWords}
                  startIndex={beforeWords.length}
                  total={totalWords}
                  className="hero__word--highlight"
                />
              )}
            </span>
          ) : (
            <HeroWords
              words={interactiveWords}
              startIndex={beforeWords.length}
              total={totalWords}
              className="hero__word--highlight"
            />
          )}
          <HeroWords
            words={afterWords}
            startIndex={beforeWords.length + interactiveWords.length}
            total={totalWords}
          />
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
