import { Link } from 'react-router-dom';
import Tag from '../Tag/Tag';
import './CaseStudyCard.scss';

export default function CaseStudyCard({
  title,
  summary,
  skillsDemonstrated = [],
  slug,
  to,
}) {
  const linkTo = to ?? (slug ? `/work/${slug}` : '#');

  return (
    <article className="case-study-card">
      <Link to={linkTo} className="case-study-card__link">
        <h3 className="case-study-card__title">{title}</h3>
        <p className="case-study-card__summary">{summary}</p>
        {skillsDemonstrated.length > 0 && (
          <div className="case-study-card__tags">
            {skillsDemonstrated.map((skill) => (
              <Tag key={skill} label={skill} kind="skill" />
            ))}
          </div>
        )}
        <span className="case-study-card__cta">See how this got built →</span>
      </Link>
    </article>
  );
}
