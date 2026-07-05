import { Flag as FlagIcon } from '@phosphor-icons/react';
import './CareerJourney.scss';

export default function CareerJourney({ title, milestones }) {
  return (
    <section className="career-journey" aria-label="Career journey">
      <div className="career-journey__inner">
        {title && <h2 className="career-journey__title">{title}</h2>}
        <ol className="career-journey__timeline">
          {milestones.map((milestone, index) => (
            <li key={milestone.label} className="career-journey__milestone">
              <div className="career-journey__marker">
                <span className="career-journey__flag" aria-hidden="true">
                  <FlagIcon size={16} weight="regular" />
                </span>
                {index < milestones.length - 1 && (
                  <span className="career-journey__connector" aria-hidden="true" />
                )}
              </div>
              <time className="career-journey__year" dateTime={milestone.year}>
                {milestone.year}
              </time>
              <span className="career-journey__label">{milestone.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
