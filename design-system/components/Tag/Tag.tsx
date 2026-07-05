import './Tag.scss';

type TagVariant = 'default' | 'skill' | 'stack' | 'ba' | 'dev' | 'qe' | 'placeholder';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
}

const variantClass: Record<TagVariant, string> = {
  default: 'tag--stack',
  skill: 'tag--skill',
  stack: 'tag--stack',
  ba: 'tag--ba',
  dev: 'tag--dev',
  qe: 'tag--qe',
  placeholder: 'tag--skill',
};

export function Tag({ children, variant = 'default' }: TagProps) {
  return <span className={`tag ${variantClass[variant]}`}>{children}</span>;
}
