import type { ReactNode } from 'react';
import './Callout.scss';

type CalloutVariant = 'intern' | 'reflection';

interface CalloutProps {
  variant?: CalloutVariant;
  children: ReactNode;
}

const variantClass: Record<CalloutVariant, string> = {
  intern: 'callout--intern',
  reflection: 'callout--reflection',
};

const variantLabel: Record<CalloutVariant, string> = {
  intern: "What I'd tell an intern",
  reflection: 'Reflection',
};

export function Callout({ variant = 'intern', children }: CalloutProps) {
  return (
    <aside className={`callout ${variantClass[variant]}`}>
      <p className="callout__label">{variantLabel[variant]}</p>
      <div className="callout__body">{children}</div>
    </aside>
  );
}
