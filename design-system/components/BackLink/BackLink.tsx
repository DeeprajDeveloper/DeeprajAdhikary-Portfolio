import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import './BackLink.scss';

interface BackLinkProps {
  to: string;
  label: string;
}

export function BackLink({ to, label }: BackLinkProps) {
  return (
    <Link to={to} className="back-link">
      <span className="back-link__icon">
        <ArrowLeft size={16} weight="duotone" aria-hidden="true" />
      </span>
      <span className="back-link__text">{label}</span>
    </Link>
  );
}
