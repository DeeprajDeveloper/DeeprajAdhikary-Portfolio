import { navLinks } from './site';

export const themeShortcut = {
  key: 'T',
  shift: true,
  label: 'SHIFT + T',
} as const;

export const navShortcuts = navLinks.map((link, index) => ({
  href: link.href,
  label: link.label,
  key: String(index + 1),
}));
