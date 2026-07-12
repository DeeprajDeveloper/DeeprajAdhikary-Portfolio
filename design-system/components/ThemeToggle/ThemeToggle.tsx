import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { features } from '@config/features';
import { themeShortcut } from '@data/shortcuts';
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
  const showShortcutLabels = features.shortcutLabels;
  const showShortcutKeys = features.shortcutKeys;
  const ariaLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

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
        aria-label={ariaLabel}
        {...(showShortcutKeys ? { 'aria-keyshortcuts': 'Shift+T' } : {})}
        title={showShortcutLabels ? `${label} (${themeShortcut.label})` : label}
      >
        {isDark ? (
          <SunIcon size={18} weight="duotone" aria-hidden="true" />
        ) : (
          <MoonIcon size={18} weight="duotone" aria-hidden="true" />
        )}
        <span>{label}</span>
        {showShortcutLabels && (
          <kbd className="theme-toggle__shortcut">{themeShortcut.label}</kbd>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleClick}
      aria-label={ariaLabel}
      {...(showShortcutKeys ? { 'aria-keyshortcuts': 'Shift+T' } : {})}
      title={showShortcutLabels ? `${label} (${themeShortcut.label})` : label}
    >
      <SunIcon
        className="theme-toggle__icon theme-toggle__icon--sun"
        size={18}
        weight="duotone"
        aria-hidden="true"
      />
      <MoonIcon
        className="theme-toggle__icon theme-toggle__icon--moon"
        size={18}
        weight="duotone"
        aria-hidden="true"
      />
    </button>
  );
}
