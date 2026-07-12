import './ContentSection.scss';

interface ContentSectionProps {
  label: string;
  content: string;
  isPlaceholder?: boolean;
}

export function ContentSection({ label, content, isPlaceholder = true }: ContentSectionProps) {
  return (
    <section className={`content-section ${isPlaceholder ? 'content-section--placeholder' : ''}`}>
      <h2 className="content-section__label">{label}</h2>
      <div className="content-section__body" data-annotatable>
        <p>{content}</p>
      </div>
    </section>
  );
}
