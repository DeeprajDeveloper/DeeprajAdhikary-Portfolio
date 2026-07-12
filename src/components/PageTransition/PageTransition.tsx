import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type ReactElement,
} from 'react';
import { useLocation, type Location } from 'react-router-dom';
import { useTheme } from '@design-system/index';
import { features } from '@config/features';
import { hero } from '@data/hero';
import './PageTransition.scss';

const HOLD_MS = 700;

interface PageTransitionProps {
  children: ReactElement<{ location?: Location }>;
}

function pickRole(): string {
  const roles = hero.eyebrowRoles;
  return roles[Math.floor(Math.random() * roles.length)] ?? '';
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const { theme } = useTheme();
  const enabled = features.pageTransitions;
  const isFirstRender = useRef(true);
  const [renderLocation, setRenderLocation] = useState(location);
  const [phase, setPhase] = useState<'idle' | 'cover' | 'hold' | 'reveal'>('idle');
  const [role, setRole] = useState('');
  const pendingLocation = useRef<Location | null>(null);

  useEffect(() => {
    if (!enabled) {
      setRenderLocation(location);
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      setRenderLocation(location);
      return;
    }

    if (location.pathname === renderLocation.pathname) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setRenderLocation(location);
      return;
    }

    pendingLocation.current = location;
    setRole(pickRole());
    setPhase('cover');
  }, [enabled, location, renderLocation.pathname]);

  useEffect(() => {
    if (phase !== 'hold') return;

    const timer = window.setTimeout(() => {
      setPhase('reveal');
    }, HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  const handlePanelAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    if (phase === 'cover') {
      if (pendingLocation.current) {
        setRenderLocation(pendingLocation.current);
        pendingLocation.current = null;
      }
      setPhase('hold');
      return;
    }

    if (phase === 'reveal') {
      setPhase('idle');
    }
  };

  if (!enabled || !isValidElement(children)) {
    return children;
  }

  const logoSrc = theme === 'dark' ? '/logo_transparent_dark.svg' : '/logo_transparent_light.svg';

  return (
    <>
      {phase !== 'idle' && (
        <div
          className={`page-transition page-transition--${phase}`}
          aria-hidden="true"
        >
          <div
            className="page-transition__panel"
            onAnimationEnd={handlePanelAnimationEnd}
          >
            <div className="page-transition__content">
              <img src={logoSrc} alt="" className="page-transition__logo" />
              {role && <p className="page-transition__role">{role}</p>}
            </div>
          </div>
        </div>
      )}
      {cloneElement(children, { location: renderLocation })}
    </>
  );
}
