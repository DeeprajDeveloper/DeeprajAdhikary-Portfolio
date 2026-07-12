import { Link } from 'react-router-dom';
import type { PlaygroundItem } from '@data/playground';
import { Tag } from '../Tag/Tag';
import './PlaygroundCard.scss';

interface PlaygroundCardProps {
  item: PlaygroundItem;
}

export function PlaygroundCard({ item }: PlaygroundCardProps) {
  const body = (
    <>
      <div className="playground-card__tags">
        <Tag variant="skill">{item.tag}</Tag>
      </div>
      <h3 className="playground-card__title">{item.title}</h3>
      <p className="playground-card__summary">{item.description}</p>
      <span className="playground-card__cta">{item.cta}</span>
    </>
  );

  return (
    <article className="playground-card">
      {item.href ? (
        <Link to={item.href} className="playground-card__link">
          {body}
        </Link>
      ) : (
        <div className="playground-card__link playground-card__link--static">{body}</div>
      )}
    </article>
  );
}
