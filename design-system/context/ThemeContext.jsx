import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';

const ThemeContext = createContext(null);

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return getSystemTheme();
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const next = media.matches ? 'dark' : 'light';
        setTheme(next);
      }
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
