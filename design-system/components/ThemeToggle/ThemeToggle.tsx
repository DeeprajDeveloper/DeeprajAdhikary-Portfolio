import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '../../context/ThemeContext';
import { runThemeTransition } from '../../utils/themeTransition';
import './ThemeToggle.scss';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    runThemeTransition(event, () => {
      setTheme(isDark ? 'light' : 'dark');
    });
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleClick}
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
