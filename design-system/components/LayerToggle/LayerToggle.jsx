import { useState } from 'react';
import './LayerToggle.scss';

export default function LayerToggle({
  businessLayer,
  codeLayer,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`layer-toggle ${isOpen ? 'layer-toggle--open' : ''}`}>
      <div className="layer-toggle__business">{businessLayer}</div>

      <div className="layer-toggle__control-wrap">
        <button
          type="button"
          className="layer-toggle__control"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="layer-toggle__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 14 L17 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M3 10 L14 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          {isOpen ? 'Collapse the code layer' : 'Expand the code layer'}
        </button>
      </div>

      <div
        className="layer-toggle__code"
        hidden={!isOpen}
        aria-hidden={!isOpen}
      >
        {codeLayer}
      </div>
    </div>
  );
}
