import { useEffect, useState } from 'react';
import {
  Button,
  Tag,
  CaseStudyCard,
  LayerToggle,
  CodeBlock,
  Callout,
  Nav,
  Footer,
  Input,
  IconCheck,
  IconFlag,
  IconRedline,
  IconHighlighter,
} from '@design-system/index';
import './DesignSystemPage.scss';

const sections = [
  { id: 'colors', label: 'Color' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing & grid' },
  { id: 'icons', label: 'Iconography' },
  { id: 'motion', label: 'Motion' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'tags', label: 'Tags' },
  { id: 'cards', label: 'Cards' },
  { id: 'layer-toggle', label: 'Layer toggle' },
  { id: 'code-block', label: 'Code block' },
  { id: 'callouts', label: 'Callouts' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'forms', label: 'Forms' },
  { id: 'footer', label: 'Footer' },
];

const colorTokens = [
  { name: 'ink', hex: '#111111', note: 'Primary text and UI ink' },
  { name: 'paper', hex: '#FAF9F4', note: 'Primary background' },
  { name: 'highlighter-yellow', hex: '#F5C518', note: 'Accent fills only' },
  { name: 'mustard', hex: '#C99A2E', note: 'Secondary yellow surfaces' },
  { name: 'slate-100', hex: '#F5F5F3', note: 'Card backgrounds' },
  { name: 'slate-300', hex: '#E8E7E1', note: 'Borders and dividers' },
  { name: 'slate-500', hex: '#C9C7BE', note: 'Disabled / placeholder' },
  { name: 'slate-700', hex: '#8A877D', note: 'Secondary text' },
  { name: 'slate-900', hex: '#57544C', note: 'Captions' },
  { name: 'signal-green', hex: '#4B7B4F', note: 'Positive outcomes' },
  { name: 'signal-rust', hex: '#B4472A', note: 'Bug / defect flags' },
];

const spacingScale = [4, 8, 12, 16, 24, 32, 48, 64, 96];

function BusinessLayerDemo() {
  return (
    <div className="layer-section">
      <p className="layer-section__label">Business layer</p>
      <h3 className="layer-section__title">The hook</h3>
      <div className="layer-section__body">
        <p>
          The refund flow was quietly costing support 40+ tickets a month. I sat
          with two support reps for a day, mapped where customers actually got
          stuck, and rewrote the flow's requirements around those exact failure
          points.
        </p>
      </div>
    </div>
  );
}

function CodeLayerDemo() {
  return (
    <div className="layer-section layer-section--code">
      <p className="layer-section__label">Code layer</p>
      <h3 className="layer-section__title">Technical context</h3>
      <div className="layer-section__body">
        <p>
          The refund state lived in three different places — the order table, a
          support-ticket flag, and a frontend-only boolean — so a refund could
          look complete in one place and pending in another.
        </p>
      </div>
      <CodeBlock
        code={`// Three sources of truth — pick one
const refundStatus = order.refunded;      // DB
const ticketFlag = ticket.isRefunded;     // support tool
const uiState = checkout.refundComplete;  // frontend only`}
        caption="This is the kind of mismatch that makes requirements untestable until someone traces all three paths."
        language="javascript"
      />
      <Callout variant="intern">
        When you see the same concept stored in more than one place, that's not
        a dev problem yet — it's a requirements problem waiting to happen.
      </Callout>
    </div>
  );
}

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState('colors');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="ds-page">
      <aside className="ds-page__sidebar">
        <p className="ds-page__sidebar-title">The Annotator</p>
        <nav aria-label="Design system sections">
          <ul className="ds-page__nav">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`ds-page__nav-link ${activeSection === id ? 'ds-page__nav-link--active' : ''}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="ds-page__main">
        <header className="ds-page__header">
          <h1>The Annotator | Design System</h1>
          <p>
            Internal reference for every token and component. Nothing in the
            portfolio gets one-off styling — if it's not here, it gets added
            here first.
          </p>
        </header>

        <section id="colors" className="ds-section">
          <h2 className="ds-section__title">Color</h2>
          <div className="ds-swatches">
            {colorTokens.map(({ name, hex, note }) => (
              <div key={name} className="ds-swatch" title={note}>
                <div
                  className="ds-swatch__chip"
                  style={{ backgroundColor: hex }}
                />
                <p className="ds-swatch__name">{name}</p>
                <p className="ds-swatch__hex">{hex}</p>
                <p className="ds-swatch__note">{note}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="typography" className="ds-section">
          <h2 className="ds-section__title">Typography</h2>
          <div className="ds-type-specimens">
            <div className="ds-type-row">
              <span className="ds-type-label">Display</span>
              <p className="ds-type-display">
                Business framing in, technical fluency out.
              </p>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-label">H1</span>
              <p className="ds-type-h1">Case studies</p>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-label">H2</span>
              <p className="ds-type-h2">How I approached the refund flow</p>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-label">H3</span>
              <p className="ds-type-h3">The outcome</p>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-label">Body</span>
              <p className="ds-type-body">
                I traced repeat bugs back to a missing null-check on the address
                form, and got that written into every future intake ticket as a
                required test case.
              </p>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-label">Code layer body</span>
              <p className="ds-type-body-code">
                Slightly denser body copy signals you're in the technical layer
                now — same voice, tighter rhythm.
              </p>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-label">Two-font rule</span>
              <p className="ds-type-body">
                Stack Sans Notch + Source Sans on this screen. Playfair appears
                once in the Display row above — never all three at once.
              </p>
            </div>
          </div>
        </section>

        <section id="spacing" className="ds-section">
          <h2 className="ds-section__title">Spacing &amp; grid</h2>
          <p className="ds-section__intro">8px base unit. Content max ~720px. Page max 1200px.</p>
          <div className="ds-spacing-ruler">
            {spacingScale.map((px) => (
              <div key={px} className="ds-spacing-item">
                <div
                  className="ds-spacing-bar"
                  style={{ width: `${px}px`, height: `${px}px` }}
                />
                <span>{px}px</span>
              </div>
            ))}
          </div>
          <div className="ds-grid-demo">
            <div className="ds-grid-demo__content">Content column (~720px)</div>
            <div className="ds-grid-demo__page">Page container (1200px)</div>
          </div>
        </section>

        <section id="icons" className="ds-section">
          <h2 className="ds-section__title">Iconography</h2>
          <div className="ds-icons">
            <div className="ds-icon-item">
              <IconCheck />
              <span>Check — validated</span>
            </div>
            <div className="ds-icon-item">
              <IconFlag />
              <span>Flag — flagged issue</span>
            </div>
            <div className="ds-icon-item">
              <IconRedline />
              <span>Redline — before / after</span>
            </div>
            <div className="ds-icon-item ds-icon-item--accent">
              <IconHighlighter />
              <span>Highlighter — layer toggle</span>
            </div>
          </div>
        </section>

        <section id="motion" className="ds-section">
          <h2 className="ds-section__title">Motion</h2>
          <p className="ds-section__intro">
            Highlighter swipe on hover — the one signature interaction (~220ms).
          </p>
          <a href="#motion" className="ds-motion-demo">
            Hover me — highlighter swipe
          </a>
        </section>

        <section id="buttons" className="ds-section">
          <h2 className="ds-section__title">Buttons</h2>
          <div className="ds-component-grid">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary link</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </section>

        <section id="tags" className="ds-section">
          <h2 className="ds-section__title">Tags</h2>
          <div className="ds-component-grid">
            <Tag label="requirements" kind="skill" />
            <Tag label="ux-research" kind="skill" />
            <Tag label="react" kind="stack" />
            <Tag label="postgres" kind="stack" />
          </div>
        </section>

        <section id="cards" className="ds-section">
          <h2 className="ds-section__title">Case study card</h2>
          <CaseStudyCard
            title="Why 1 in 5 users abandoned checkout at the payment step"
            summary="Mapped the drop-off to a validation rule that fired before users saw the error message. Rewrote the acceptance criteria around visible feedback."
            skillsDemonstrated={['requirements', 'ux-research', 'qa-test-design']}
            slug="checkout-drop-off"
          />
        </section>

        <section id="layer-toggle" className="ds-section">
          <h2 className="ds-section__title">Layer toggle</h2>
          <LayerToggle
            businessLayer={<BusinessLayerDemo />}
            codeLayer={<CodeLayerDemo />}
          />
        </section>

        <section id="code-block" className="ds-section">
          <h2 className="ds-section__title">Code block</h2>
          <CodeBlock
            code={`SELECT order_id, refund_status
FROM orders
WHERE refund_status != support_ticket.refund_flag;`}
            caption="Run this once and you'll see why support and the app disagreed on 'refunded'."
            language="sql"
          />
        </section>

        <section id="callouts" className="ds-section">
          <h2 className="ds-section__title">Callouts</h2>
          <Callout variant="intern">
            Single-source-of-truth isn't a architecture buzzword here — it's the
            difference between a testable requirement and a bug report three
            sprints later.
          </Callout>
          <Callout variant="reflection">
            I'd push for a shared status enum in the requirements doc earlier
            next time, before any UI mockups get approved.
          </Callout>
        </section>

        <section id="navigation" className="ds-section">
          <h2 className="ds-section__title">Navigation</h2>
          <div className="ds-nav-demo">
            <Nav />
          </div>
        </section>

        <section id="forms" className="ds-section">
          <h2 className="ds-section__title">Forms</h2>
          <div className="ds-form-demo">
            <Input label="Email" placeholder="you@example.com" />
            <Input label="Disabled field" placeholder="Not available" disabled />
          </div>
        </section>

        <section id="footer" className="ds-section">
          <h2 className="ds-section__title">Footer</h2>
          <Footer />
        </section>
      </main>
    </div>
  );
}
