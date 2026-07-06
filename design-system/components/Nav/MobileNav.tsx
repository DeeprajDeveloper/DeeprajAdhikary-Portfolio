import { Link, useLocation } from 'react-router-dom';
import { site, navLinks } from '@data/site';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { matchNavIndex } from '@/hooks/useScrollNav';
import './Nav.scss';

export function MobileNav() {
  const location = useLocation();
  const activeIndex = matchNavIndex(location.pathname);

  const currentLabel = navLinks[activeIndex]?.label ?? 'Home';

  return (
    <header className="side-nav-mobile" aria-label="Mobile navigation">
      <Link to="/" className="side-nav-mobile__brand">
        {site.name.split(' ')[0]}
      </Link>
      <span className="side-nav-mobile__current">{currentLabel}</span>
      <ThemeToggle />
    </header>
  );
}
