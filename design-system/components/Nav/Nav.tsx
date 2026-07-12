import { Link, useLocation } from 'react-router-dom';
import { useEffect, useId, useRef, useState } from 'react';
import {
  PackageIcon,
  DetectiveIcon,
  CompassIcon,
  RocketLaunchIcon,
  IntersectThreeIcon,
  HouseIcon,
  NotePencilIcon,
  ListIcon,
  BrainIcon,
  XIcon,
  type Icon,
} from '@phosphor-icons/react';
import { site, navLinks } from '@data/site';
import { navShortcuts } from '@data/shortcuts';
import { features } from '@config/features';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { matchNavIndex } from '@/hooks/useScrollNav';
import './Nav.scss';

const navIcons: Record<(typeof navLinks)[number]['href'], Icon> = {
  '/': HouseIcon,
  '/thinking': BrainIcon,
  '/perspectives': IntersectThreeIcon,
  '/case-studies': DetectiveIcon,
  '/projects': RocketLaunchIcon,
  '/artifacts': PackageIcon,
  '/lessons': NotePencilIcon,
  '/exploring': CompassIcon,
};

export function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const activeIndex = matchNavIndex(location.pathname);
  const activeLabel = navLinks[activeIndex]?.label ?? 'Menu';
  const showShortcutLabels = features.shortcutLabels;
  const showShortcutKeys = features.shortcutKeys;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (islandRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Link to="/" className="brand-island" aria-label={site.name}>
        <span className="brand-island__name brand-island__name--full">{site.name}</span>
        <span className="brand-island__name brand-island__name--short" aria-hidden="true">
          DA
        </span>
      </Link>

      <div className="nav-islands">
        <div className="theme-island">
          <ThemeSwitch />
        </div>

        <div
          ref={islandRef}
          className={`menu-island ${open ? 'menu-island--open' : ''}`}
        >
          <div className="menu-island__bar">
            <span className="menu-island__current" aria-hidden={open}>
              {activeLabel}
            </span>
            <button
              ref={toggleRef}
              type="button"
              className="menu-island__toggle"
              aria-expanded={open}
              aria-controls={menuId}
              aria-haspopup="true"
              aria-label={open ? 'Close menu' : `Open menu, current page ${activeLabel}`}
              onClick={toggleMenu}
            >
              <ListIcon
                className="menu-island__icon menu-island__icon--burger"
                size={18}
                weight="bold"
                aria-hidden="true"
              />
              <XIcon
                className="menu-island__icon menu-island__icon--close"
                size={16}
                weight="bold"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="menu-island__expand" id={menuId}>
            <div className="menu-island__expand-inner">
              <nav className="menu-island__nav" aria-label="Main navigation">
                {navLinks.map((link, index) => {
                  const isActive = index === activeIndex;
                  const number = index + 1;
                  const NavIcon = navIcons[link.href];

                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`menu-island__link ${isActive ? 'menu-island__link--active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                      tabIndex={open ? undefined : -1}
                      {...(showShortcutKeys
                        ? { 'aria-keyshortcuts': navShortcuts[index].key }
                        : {})}
                      title={
                        showShortcutLabels
                          ? `${link.label} (${navShortcuts[index].key})`
                          : link.label
                      }
                      onClick={() => setOpen(false)}
                    >
                      <NavIcon
                        className="menu-island__link-icon"
                        size={18}
                        weight="duotone"
                        aria-hidden="true"
                      />
                      <span className="menu-island__label">{link.label}</span>
                      <span className="menu-island__index" aria-hidden="true">
                        {number}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
