const STYLE_ID = 'theme-transition-styles';

const TRANSITION_CSS = `
::view-transition-group(root) {
  animation-duration: 1.1s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

::view-transition-new(root) {
  animation-name: theme-reveal;
}

::view-transition-old(root) {
  animation: none;
  z-index: -1;
}

@keyframes theme-reveal {
  from {
    clip-path: circle(0% at var(--theme-x, 50%) var(--theme-y, 50%));
  }

  to {
    clip-path: circle(150% at var(--theme-x, 50%) var(--theme-y, 50%));
  }
}
`;

function injectTransitionStyles() {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = TRANSITION_CSS;
}

function setTransitionOrigin(event: { clientX: number; clientY: number }) {
  const x = `${(event.clientX / window.innerWidth) * 100}%`;
  const y = `${(event.clientY / window.innerHeight) * 100}%`;
  document.documentElement.style.setProperty('--theme-x', x);
  document.documentElement.style.setProperty('--theme-y', y);
}

export function runThemeTransition(
  event: { clientX: number; clientY: number },
  switchTheme: () => void,
) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !document.startViewTransition) {
    switchTheme();
    return;
  }

  injectTransitionStyles();
  setTransitionOrigin(event);
  document.startViewTransition(switchTheme);
}
