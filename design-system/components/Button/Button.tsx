import { Link } from 'react-router-dom';
import './Button.scss';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  to?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  external?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  tertiary: 'btn--tertiary',
  ghost: 'btn--tertiary',
};

export function Button({
  children,
  href,
  to,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  external = false,
}: ButtonProps) {
  const classes = ['btn', variantClass[variant], `btn--${size}`, className]
    .filter(Boolean)
    .join(' ');

  const content = <span className="btn__face">{children}</span>;

  if (to && !disabled) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
