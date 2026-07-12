const STYLE =
  'background:#111111;color:#f5c518;padding:8px 12px;border-radius:4px;font-family:ui-monospace,monospace;font-size:12px;';

const STYLE_SECONDARY =
  'background:transparent;color:#8a877d;padding:4px 0;font-family:ui-monospace,monospace;font-size:11px;';

const GUARD = '__portfolio_console_egg__';

export function logConsoleEgg() {
  if (typeof window === 'undefined') return;
  const root = window as Window & { [GUARD]?: boolean };
  if (root[GUARD]) return;
  root[GUARD] = true;

  console.log(
    '%cTICKET-001 · Status: Resolved · Severity: Delightful · You found the console. Most people don’t check here first.',
    STYLE,
  );
  console.log(
    '%cIf you’re screening for curiosity: hello@deeprajadhikary.com',
    STYLE_SECONDARY,
  );
}
