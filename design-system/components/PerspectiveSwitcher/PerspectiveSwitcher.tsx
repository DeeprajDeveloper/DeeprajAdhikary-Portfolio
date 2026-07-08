'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Perspective, PerspectiveId } from '@data/perspectives';
import { Tag } from '../Tag/Tag';
import './PerspectiveSwitcher.scss';

interface PerspectiveSwitcherProps {
  perspectives: Perspective[];
}

export function PerspectiveSwitcher({ perspectives }: PerspectiveSwitcherProps) {
  const [activeId, setActiveId] = useState<PerspectiveId>('ba');
  const [notchLeft, setNotchLeft] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const panelWrapRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<PerspectiveId, HTMLButtonElement>>>({});
  const active = perspectives.find((p) => p.id === activeId)!;

  const updateNotchPosition = useCallback(() => {
    const panelWrap = panelWrapRef.current;
    const activeTab = tabRefs.current[activeId];
    if (!panelWrap || !activeTab) return;

    const panelRect = panelWrap.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    setNotchLeft(tabRect.left + tabRect.width / 2 - panelRect.left);
  }, [activeId]);

  useEffect(() => {
    updateNotchPosition();

    window.addEventListener('resize', updateNotchPosition);
    const observer = new ResizeObserver(updateNotchPosition);
    if (panelWrapRef.current) observer.observe(panelWrapRef.current);

    return () => {
      window.removeEventListener('resize', updateNotchPosition);
      observer.disconnect();
    };
  }, [updateNotchPosition]);

  return (
    <div className="perspective-switcher">
      <div className="perspective-switcher__tabs" role="tablist" aria-label="Professional perspectives">
        {perspectives.map((p) => (
          <button
            key={p.id}
            ref={(element) => {
              tabRefs.current[p.id] = element ?? undefined;
            }}
            role="tab"
            aria-selected={activeId === p.id}
            aria-controls={`perspective-panel-${p.id}`}
            id={`perspective-tab-${p.id}`}
            className={`perspective-switcher__tab perspective-switcher__tab--${p.id} ${activeId === p.id ? 'perspective-switcher__tab--active' : ''}`}
            onClick={() => setActiveId(p.id)}
          >
            <Tag variant={p.id}>{p.label}</Tag>
          </button>
        ))}
      </div>

      <div ref={panelWrapRef} className="perspective-switcher__panel-wrap">
        <motion.div
          className={`perspective-switcher__notch perspective-switcher__notch--${activeId}`}
          animate={{ left: notchLeft }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }
          }
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          id={`perspective-panel-${activeId}`}
          role="tabpanel"
          aria-labelledby={`perspective-tab-${activeId}`}
          className={`perspective-switcher__panel perspective-switcher__panel--${activeId}`}
          initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <p className="perspective-switcher__tagline">{active.tagline}</p>

          <ul className="perspective-switcher__focus">
            {active.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>

          <div className="perspective-switcher__scenario">
            <h3 className="perspective-switcher__scenario-title">{active.scenario.title}</h3>
            <p className="perspective-switcher__scenario-question">{active.scenario.question}</p>
            <p className="perspective-switcher__scenario-response">{active.scenario.response}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      </div>
    </div>
  );
}
