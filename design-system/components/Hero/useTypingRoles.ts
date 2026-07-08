import { useEffect, useState } from 'react';

const TYPE_DELAY_MS = 55;
const DELETE_DELAY_MS = 35;
const PAUSE_MS = 1400;

export function useTypingRoles(roles: readonly string[], enabled = true) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) {
      setText('');
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || roles.length === 0) {
      setText(roles[0] ?? '');
      return;
    }

    if (roles.length === 1) {
      setText(roles[0]);
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId = 0;

    const schedule = (delay: number) => {
      timeoutId = window.setTimeout(tick, delay);
    };

    const tick = () => {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex += 1;
        setText(current.slice(0, charIndex));

        if (charIndex >= current.length) {
          schedule(PAUSE_MS);
          deleting = true;
          return;
        }

        schedule(TYPE_DELAY_MS);
        return;
      }

      if (charIndex > 0) {
        charIndex -= 1;
        setText(current.slice(0, charIndex));
        schedule(DELETE_DELAY_MS);
        return;
      }

      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      schedule(TYPE_DELAY_MS);
    };

    setText('');
    charIndex = 0;
    deleting = false;
    roleIndex = 0;
    schedule(TYPE_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [roles, enabled]);

  return text;
}
