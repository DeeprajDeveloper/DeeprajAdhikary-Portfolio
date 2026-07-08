import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { features } from '@config/features';
import { useTheme } from '@design-system/index';
import { runThemeTransition } from '@design-system/utils/themeTransition';
import { navShortcuts, themeShortcut } from '@data/shortcuts';

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable
  );
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const enabled = features.shortcutKeys;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const key = event.key.toUpperCase();

      if (themeShortcut.shift && event.shiftKey && key === themeShortcut.key) {
        event.preventDefault();
        const isDark = theme === 'dark';
        runThemeTransition(
          { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 },
          () => setTheme(isDark ? 'light' : 'dark'),
        );
        return;
      }

      if (event.shiftKey) return;

      const navItem = navShortcuts.find((item) => item.key === event.key);
      if (navItem) {
        event.preventDefault();
        navigate(navItem.href);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, navigate, setTheme, theme]);
}
