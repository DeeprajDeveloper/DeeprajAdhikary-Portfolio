import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import './SectionTeaser.scss';

interface SectionTeaserProps {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
}

export function SectionTeaser({
  eyebrow,
  title,
  description,
  href,
  linkLabel = 'Explore',
}: SectionTeaserProps) {
  return (
    <div className="section-teaser">
      <p className="section-teaser__eyebrow">{eyebrow}</p>
      <h2 className="section-teaser__title">{title}</h2>
      <p className="section-teaser__description">{description}</p>
      <Link to={href} className="section-teaser__link">
        {linkLabel} <ArrowRight size={14} weight="bold" aria-hidden="true" />
      </Link>
    </div>
  );
}
