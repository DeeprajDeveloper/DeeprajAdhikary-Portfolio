import { Link } from 'react-router-dom';
import type { HomePerspective } from '@data/perspectives';
import './PerspectiveCard.scss';

interface PerspectiveCardProps {
  perspective: HomePerspective;
}

export function PerspectiveCard({ perspective }: PerspectiveCardProps) {
  return (
    <article className={`perspective-card perspective-card--${perspective.id}`}>
      <Link to="/perspectives" className="perspective-card__link">
        <h3 className="perspective-card__title">{perspective.label}</h3>
        <p className="perspective-card__description">{perspective.description}</p>
        <span className="perspective-card__cta">Explore perspective</span>
      </Link>
    </article>
  );
}
