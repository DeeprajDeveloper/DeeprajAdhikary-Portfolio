import { Link } from 'react-router-dom';
import './Button.scss';

const variantClass = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  tertiary: 'btn--tertiary',
};

const sizeClass = {
  sm: 'btn--sm',
  md: 'btn--md',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  href,
  to,
  children,
  className = '',
  ...rest
}) {
  const classes = ['btn', variantClass[variant], sizeClass[size], className]
    .filter(Boolean)
    .join(' ');

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
