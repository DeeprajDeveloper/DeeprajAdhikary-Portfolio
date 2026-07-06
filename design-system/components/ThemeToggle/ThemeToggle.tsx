import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '../../context/ThemeContext';
import { runThemeTransition } from '../../utils/themeTransition';
import './ThemeToggle.scss';

interface ThemeToggleProps {
  variant?: 'default' | 'nav';
}

export function ThemeToggle({ variant = 'default' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Light mode' : 'Dark mode';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    runThemeTransition(event, () => {
      setTheme(isDark ? 'light' : 'dark');
    });
  };

  if (variant === 'nav') {
    return (
      <button
        type="button"
        className="theme-toggle theme-toggle--nav"
        onClick={handleClick}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <Sun size={18} weight="regular" aria-hidden="true" />
        ) : (
          <Moon size={18} weight="regular" aria-hidden="true" />
        )}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={label}
    >
      <Sun
        className="theme-toggle__icon theme-toggle__icon--sun"
        size={18}
        weight="regular"
        aria-hidden="true"
      />
      <Moon
        className="theme-toggle__icon theme-toggle__icon--moon"
        size={18}
        weight="regular"
        aria-hidden="true"
      />
    </button>
  );
}
