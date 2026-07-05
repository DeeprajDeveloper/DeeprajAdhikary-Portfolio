import { Link } from 'react-router-dom';
import type { CaseStudy } from '@data/case-studies';
import { Tag } from '../Tag/Tag';
import './CaseStudyCard.scss';

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="case-study-card">
      <Link to={`/case-studies/${study.slug}`} className="case-study-card__link">
        <div className="case-study-card__tags">
          <Tag variant="skill">Placeholder</Tag>
        </div>
        <h3 className="case-study-card__title">{study.title}</h3>
        <p className="case-study-card__summary">{study.summary}</p>
        <span className="case-study-card__cta">View case study</span>
      </Link>
    </article>
  );
}
