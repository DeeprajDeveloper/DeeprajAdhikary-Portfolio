'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { ThinkingStage, ThinkingStageId } from '@data/thinking';
import './ThinkingFlow.scss';

interface ThinkingFlowProps {
  stages: ThinkingStage[];
}

export function ThinkingFlow({ stages }: ThinkingFlowProps) {
  const [activeId, setActiveId] = useState<ThinkingStageId>(stages[0].id);
  const prefersReducedMotion = useReducedMotion();
  const active = stages.find((s) => s.id === activeId)!;

  return (
    <div className="thinking-flow">
      <div className="thinking-flow__stages" role="tablist" aria-label="Problem-solving stages">
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            role="tab"
            aria-selected={activeId === stage.id}
            aria-controls={`panel-${stage.id}`}
            id={`tab-${stage.id}`}
            className={`thinking-flow__stage ${activeId === stage.id ? 'thinking-flow__stage--active' : ''}`}
            onClick={() => setActiveId(stage.id)}
          >
            <span className="thinking-flow__stage-number">{index + 1}</span>
            <span className="thinking-flow__stage-label">{stage.label}</span>
          </button>
        ))}
      </div>

      <div className="thinking-flow__connector" aria-hidden="true">
        {stages.map((stage, i) => (
          <span
            key={stage.id}
            className={`thinking-flow__dot ${i <= stages.findIndex((s) => s.id === activeId) ? 'thinking-flow__dot--filled' : ''}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          id={`panel-${activeId}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeId}`}
          className="thinking-flow__panel"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h3 className="thinking-flow__panel-title">{active.label}</h3>
          <p className="thinking-flow__panel-summary">{active.summary}</p>
          <p className="thinking-flow__panel-detail">{active.detail}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
