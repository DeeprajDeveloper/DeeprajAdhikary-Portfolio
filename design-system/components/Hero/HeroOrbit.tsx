import { useCallback, useEffect, useRef, useState } from 'react';
import { Code, ShieldCheck, Users } from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import type { PerspectiveId } from '@data/perspectives';
import { hero } from '@data/hero';
import './HeroOrbit.scss';

const ORB_ICONS: Record<PerspectiveId, Icon> = {
  ba: Users,
  dev: Code,
  qe: ShieldCheck,
};

const ROTATION_SPEED = 5.5;
const DRAG_THRESHOLD = 8;

interface Point {
  x: number;
  y: number;
}

interface Layout {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  radius: number;
}

function polarToPoint(angleDeg: number, radius: number, centerX: number, centerY: number): Point {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(rad),
    y: centerY + radius * Math.sin(rad),
  };
}

function getLayout(width: number, height: number): Layout {
  const centerX = width / 2;
  const centerY = height * 0.46;
  const radius = Math.min(Math.max(Math.min(width, height) * 0.34, 130), 300);

  return { width, height, centerX, centerY, radius };
}

export function HeroOrbit() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const baseAnglesRef = useRef<number[]>(hero.orbitOrbs.map((orb) => orb.startAngle));
  const dragRef = useRef<{
    index: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);

  const [layout, setLayout] = useState<Layout>({ width: 0, height: 0, centerX: 0, centerY: 0, radius: 0 });
  const [paused, setPaused] = useState(false);
  const [, setFrame] = useState(0);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateLayout = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;
    const { width, height } = node.getBoundingClientRect();
    setLayout(getLayout(width, height));
  }, []);

  useEffect(() => {
    updateLayout();
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver(updateLayout);
    observer.observe(node);
    return () => observer.disconnect();
  }, [updateLayout]);

  useEffect(() => {
    if (paused || reducedMotion || layout.width === 0) return;

    let frameId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      rotationRef.current = (rotationRef.current + delta * ROTATION_SPEED) % 360;
      setFrame((value) => value + 1);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [paused, reducedMotion, layout.width]);

  const getOrbAngle = (index: number) => baseAnglesRef.current[index] + rotationRef.current;

  const getOrbPosition = (index: number): Point => {
    const angle = getOrbAngle(index);
    return polarToPoint(angle, layout.radius, layout.centerX, layout.centerY);
  };

  const updateOrbAngleFromPointer = (index: number, clientX: number, clientY: number) => {
    const node = containerRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const centerX = rect.left + layout.centerX;
    const centerY = rect.top + layout.centerY;
    const pointerAngle = (Math.atan2(clientY - centerY, clientX - centerX) * 180) / Math.PI;
    baseAnglesRef.current[index] = pointerAngle - rotationRef.current;
    setFrame((value) => value + 1);
  };

  const handlePointerDown = (index: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      index,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    setPaused(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const distance = Math.hypot(
      event.clientX - drag.startX,
      event.clientY - drag.startY,
    );

    if (distance > DRAG_THRESHOLD) {
      drag.moved = true;
      updateOrbAngleFromPointer(drag.index, event.clientX, event.clientY);
    }
  };

  const handlePointerUp =
    (href: string) => (event: React.PointerEvent<HTMLButtonElement>) => {
      event.currentTarget.releasePointerCapture(event.pointerId);
      const drag = dragRef.current;
      dragRef.current = null;
      setPaused(false);

      if (drag && !drag.moved) {
        navigate(href);
      }
    };

  const handleKeyDown = (href: string) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(href);
    }
  };

  if (layout.width === 0) {
    return <div ref={containerRef} className="hero-orbit" />;
  }

  const positions = hero.orbitOrbs.map((_, index) => getOrbPosition(index));

  return (
    <div ref={containerRef} className="hero-orbit">
      <svg
        className="hero-orbit__svg"
        width={layout.width}
        height={layout.height}
        aria-hidden="true"
      >
        <circle
          className="hero-orbit__ring"
          cx={layout.centerX}
          cy={layout.centerY}
          r={layout.radius}
        />
      </svg>

      {hero.orbitOrbs.map((orb, index) => {
        const IconComponent = ORB_ICONS[orb.id];
        const position = positions[index];

        return (
          <button
            key={orb.id}
            type="button"
            className={`hero-orbit__orb hero-orbit__orb--${orb.id}`}
            style={{
              left: position.x,
              top: position.y,
            }}
            onPointerDown={handlePointerDown(index)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp(orb.href)}
            onPointerCancel={handlePointerUp(orb.href)}
            onKeyDown={handleKeyDown(orb.href)}
            aria-label={`${orb.label} — ${orb.tagline}. Open perspectives.`}
          >
            <span className="hero-orbit__orb-icon-wrap">
              <IconComponent className="hero-orbit__orb-icon" size={28} weight="duotone" />
            </span>
            <span className="hero-orbit__orb-label">{orb.label}</span>
            <span className="hero-orbit__orb-tagline">{orb.tagline}</span>
          </button>
        );
      })}
    </div>
  );
}
