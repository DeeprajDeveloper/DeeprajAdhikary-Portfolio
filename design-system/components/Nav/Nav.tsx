import { Link, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { site, navLinks } from '@data/site';
import { navShortcuts } from '@data/shortcuts';
import { features } from '@config/features';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { Footer } from '../Footer/Footer';
import { matchNavIndex } from '@/hooks/useScrollNav';
import './Nav.scss';

export function Nav() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const activeIndex = isHome ? (clickedIndex ?? 0) : matchNavIndex(location.pathname);
  const showShortcutLabels = features.shortcutLabels;
  const showShortcutKeys = features.shortcutKeys;

  const scrollActiveLinkToCenter = useCallback(() => {
    const viewport = viewportRef.current;
    const activeLink = linkRefs.current[activeIndex];
    if (!viewport || !activeLink) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const linkRect = activeLink.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    const linkCenter =
      linkRect.top - viewportRect.top + viewport.scrollTop + linkRect.height / 2;
    const targetScroll = linkCenter - viewport.clientHeight / 2;

    viewport.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [activeIndex]);

  useEffect(() => {
    if (isHome) {
      setClickedIndex(null);
    }
  }, [isHome]);

  useEffect(() => {
    scrollActiveLinkToCenter();
  }, [scrollActiveLinkToCenter]);

  useEffect(() => {
    const handlePageClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (target instanceof Element && target.closest('.side-nav, .side-nav-mobile')) return;

      scrollActiveLinkToCenter();
    };

    document.addEventListener('click', handlePageClick);
    return () => document.removeEventListener('click', handlePageClick);
  }, [scrollActiveLinkToCenter]);

  const handleNavClick = (index: number) => {
    setClickedIndex(index);
  };

  return (
    <aside className="side-nav" aria-label="Site navigation">
      <div className="side-nav__header">
        <Link to="/" className="side-nav__brand" onClick={() => handleNavClick(0)}>
          {site.name}
        </Link>
      </div>

      <div ref={viewportRef} className="side-nav__viewport">
        <nav className="side-nav__track" aria-label="Main navigation">
          {navLinks.map((link, index) => {
            const isActive = index === activeIndex;
            const distance = Math.abs(index - activeIndex);

            return (
              <Link
                key={link.href}
                ref={(element) => {
                  linkRefs.current[index] = element;
                }}
                to={link.href}
                className={`side-nav__link ${isActive ? 'side-nav__link--active' : ''}`}
                data-distance={Math.min(distance, 3)}
                aria-current={isActive ? 'page' : undefined}
                {...(showShortcutKeys
                  ? { 'aria-keyshortcuts': navShortcuts[index].key }
                  : {})}
                title={
                  showShortcutLabels
                    ? `${link.label} (${navShortcuts[index].key})`
                    : link.label
                }
                onClick={() => handleNavClick(index)}
              >
                <span className="side-nav__link-label">{link.label}</span>
                {showShortcutLabels && (
                  <kbd className="side-nav__shortcut">{navShortcuts[index].key}</kbd>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="side-nav__footer">
        <ThemeToggle variant="nav" />
        <Footer variant="nav" />
      </div>
    </aside>
  );
}
