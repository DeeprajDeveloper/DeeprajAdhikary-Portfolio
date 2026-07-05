import './Tag.scss';

const kindClass = {
  skill: 'tag--skill',
  stack: 'tag--stack',
};

export default function Tag({ label, kind = 'skill', className = '' }) {
  return (
    <span className={`tag ${kindClass[kind]} ${className}`.trim()}>
      {label}
    </span>
  );
}
