import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
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
