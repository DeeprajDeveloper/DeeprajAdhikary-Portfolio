import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, site } from '@data/index';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Nav.scss';

export default function Nav({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTransparent = transparent && !scrolled;

  return (
    <header
      className={`site-nav ${isTransparent ? 'site-nav--transparent' : 'site-nav--solid'}`}
    >
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand">
          {site.name}
        </Link>
        <nav className="site-nav__links" aria-label="Main">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className={`site-nav__link ${location.pathname === href ? 'site-nav__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
