'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Perspective, PerspectiveId } from '@data/perspectives';
import { Tag } from '../Tag/Tag';
import './PerspectiveSwitcher.scss';

interface PerspectiveSwitcherProps {
  perspectives: Perspective[];
}

export function PerspectiveSwitcher({ perspectives }: PerspectiveSwitcherProps) {
  const [activeId, setActiveId] = useState<PerspectiveId>('ba');
  const prefersReducedMotion = useReducedMotion();
  const active = perspectives.find((p) => p.id === activeId)!;

  return (
    <div className="perspective-switcher">
      <div className="perspective-switcher__tabs" role="tablist" aria-label="Professional perspectives">
        {perspectives.map((p) => (
          <button
            key={p.id}
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
  );
}
