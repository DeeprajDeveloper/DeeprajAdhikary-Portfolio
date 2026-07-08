import { navLinks } from '@data/site';

export function matchNavIndex(pathname: string): number {
  if (pathname === '/') return 0;

  const exact = navLinks.findIndex((link) => link.href === pathname);
  if (exact >= 0) return exact;

  const nested = navLinks.findIndex(
    (link) => link.href !== '/' && pathname.startsWith(`${link.href}/`),
  );
  return nested >= 0 ? nested : 0;
}
