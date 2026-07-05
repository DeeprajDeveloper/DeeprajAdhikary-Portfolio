import './Callout.scss';

const variantClass = {
  intern: 'callout--intern',
  reflection: 'callout--reflection',
};

const variantLabel = {
  intern: "What I'd tell an intern",
  reflection: 'Reflection',
};

export default function Callout({ variant = 'intern', children }) {
  return (
    <aside className={`callout ${variantClass[variant]}`}>
      <p className="callout__label">{variantLabel[variant]}</p>
      <div className="callout__body">{children}</div>
    </aside>
  );
}
