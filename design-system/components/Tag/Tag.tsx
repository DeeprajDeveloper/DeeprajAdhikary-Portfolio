import { TAG_VARIANTS, TagVariantKey } from '@constants/constants';
import './Tag.scss';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariantKey;
}

export function Tag({ children, variant = 'default' }: TagProps) {
  return <span className={`tag tag--${TAG_VARIANTS[variant]}`}>{children}</span>;
}
