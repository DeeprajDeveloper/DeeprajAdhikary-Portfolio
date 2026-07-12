import { useId, type ChangeEvent } from 'react';
import { features } from '@config/features';
import { themeShortcut } from '@data/shortcuts';
import { useTheme } from '../../context/ThemeContext';
import { runThemeTransition } from '../../utils/themeTransition';
import './ThemeSwitch.scss';

function transitionPoint(event: ChangeEvent<HTMLInputElement>) {
  const native = event.nativeEvent;
  if (native instanceof MouseEvent) {
    return { clientX: native.clientX, clientY: native.clientY };
  }

  return {
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight / 2,
  };
}

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const inputId = useId();
  const showShortcutLabels = features.shortcutLabels;
  const showShortcutKeys = features.shortcutKeys;
  const ariaLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const title = showShortcutLabels
    ? `${isDark ? 'Light mode' : 'Dark mode'} (${themeShortcut.label})`
    : isDark
      ? 'Light mode'
      : 'Dark mode';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextDark = event.target.checked;
    runThemeTransition(transitionPoint(event), () => {
      setTheme(nextDark ? 'dark' : 'light');
    });
  };

  return (
    <label className="theme-switch" title={title}>
      <input
        id={inputId}
        className="theme-switch__input"
        type="checkbox"
        checked={isDark}
        onChange={handleChange}
        aria-label={ariaLabel}
        {...(showShortcutKeys ? { 'aria-keyshortcuts': 'Shift+T' } : {})}
      />
      <span className="theme-switch__slider" aria-hidden="true">
        <span className="theme-switch__sun-moon">
          <svg className="theme-switch__moon-dot theme-switch__moon-dot--1" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__moon-dot theme-switch__moon-dot--2" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__moon-dot theme-switch__moon-dot--3" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__ray theme-switch__ray--1" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__ray theme-switch__ray--2" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__ray theme-switch__ray--3" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__cloud theme-switch__cloud--dark theme-switch__cloud--1" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__cloud theme-switch__cloud--dark theme-switch__cloud--2" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__cloud theme-switch__cloud--dark theme-switch__cloud--3" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__cloud theme-switch__cloud--light theme-switch__cloud--4" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__cloud theme-switch__cloud--light theme-switch__cloud--5" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
          <svg className="theme-switch__cloud theme-switch__cloud--light theme-switch__cloud--6" viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={50} />
          </svg>
        </span>
        <span className="theme-switch__stars">
          <svg className="theme-switch__star theme-switch__star--1" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="theme-switch__star theme-switch__star--2" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="theme-switch__star theme-switch__star--3" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="theme-switch__star theme-switch__star--4" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
        </span>
      </span>
    </label>
  );
}
