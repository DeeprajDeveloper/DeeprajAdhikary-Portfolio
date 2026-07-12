import { useMemo, useState, type FormEvent } from 'react';
import { PageHeader, BackLink, Button } from '@design-system/index';
import { complaintExamples } from '@data/playground';
import { usePageTitle } from '@/hooks/usePageTitle';
import './PlaygroundRequirements.scss';

type ComplaintKind = 'visual' | 'performance' | 'usability' | 'general';

function classifyComplaint(text: string): ComplaintKind {
  const lower = text.toLowerCase();
  if (/(look|ugly|broken|layout|mobile|visual|css|design)/.test(lower)) return 'visual';
  if (/(slow|fast|lag|performance|load|timeout)/.test(lower)) return 'performance';
  if (/(find|confus|weird|hard|can't|cannot|button|flow|usab)/.test(lower)) return 'usability';
  return 'general';
}

function buildRequirement(complaint: string) {
  const kind = classifyComplaint(complaint);
  const trimmed = complaint.trim().replace(/^["']|["']$/g, '');

  const frames: Record<ComplaintKind, string> = {
    visual: 'Framed as a presentation defect with a clear user-visible condition.',
    performance: 'Framed as a measurable response-time expectation, not a vibe.',
    usability: 'Framed as a task-completion failure with a recoverable path.',
    general: 'Framed as a behavior contract a developer can implement and a tester can verify.',
  };

  const templates: Record<ComplaintKind, { given: string; when: string; then: string }> = {
    visual: {
      given: 'a user is viewing the affected screen on a supported viewport',
      when: `the UI exhibits the reported issue ("${trimmed}")`,
      then: 'the layout renders without overlap, clipping, or broken alignment against the design spec',
    },
    performance: {
      given: 'a user initiates the reported action under normal network conditions',
      when: `the system behaves as described ("${trimmed}")`,
      then: 'the primary response completes within the agreed performance budget and surfaces progress if wait exceeds 1 second',
    },
    usability: {
      given: 'a user is trying to complete the related task with typical domain knowledge',
      when: `they encounter the friction described ("${trimmed}")`,
      then: 'the user can complete the task without workarounds, using labeled controls and a clear next step',
    },
    general: {
      given: 'a user is on the relevant screen with a valid session',
      when: `they experience the complaint ("${trimmed}")`,
      then: 'the system behaves according to the documented happy path, with an explicit error state if the action cannot complete',
    },
  };

  return {
    frame: frames[kind],
    ...templates[kind],
  };
}

export function PlaygroundRequirementsPage() {
  usePageTitle('Requirements Generator');
  const [complaint, setComplaint] = useState('');
  const [exampleIndex, setExampleIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [emptyPrompt, setEmptyPrompt] = useState(false);

  const result = useMemo(() => {
    if (!submitted || !complaint.trim()) return null;
    return buildRequirement(complaint);
  }, [complaint, submitted]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!complaint.trim()) {
      setEmptyPrompt(true);
      setSubmitted(false);
      return;
    }
    setEmptyPrompt(false);
    setSubmitted(true);
  };

  const handleExample = () => {
    const next = (exampleIndex + 1) % complaintExamples.length;
    setExampleIndex(next);
    setComplaint(complaintExamples[next]);
    setEmptyPrompt(false);
    setSubmitted(false);
  };

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <BackLink to="/playground" label="Playground" />
        <PageHeader
          eyebrow="Playground"
          title="Vague Complaint → Requirement"
          description="Type the kind of fuzzy feedback you’d hear in a stakeholder meeting. Get a Given/When/Then you could actually hand to engineering."
        />

        <form className="req-gen" onSubmit={handleSubmit}>
          <label className="req-gen__label" htmlFor="complaint-input">
            Vague complaint
          </label>
          <textarea
            id="complaint-input"
            className="req-gen__input"
            rows={3}
            placeholder="e.g. 'the checkout feels weird'"
            value={complaint}
            onChange={(event) => {
              setComplaint(event.target.value);
              setEmptyPrompt(false);
            }}
          />

          {emptyPrompt && (
            <p className="req-gen__hint" role="status">
              Try typing a complaint first, even a vague one.
            </p>
          )}

          <div className="req-gen__actions">
            <Button type="submit" variant="primary">
              Translate to requirement
            </Button>
            <Button type="button" variant="secondary" onClick={handleExample}>
              Try another example
            </Button>
          </div>
        </form>

        {result && (
          <article className="req-gen__output" data-annotatable>
            <p className="req-gen__frame">{result.frame}</p>
            <div className="req-gen__gwt">
              <p>
                <strong>Given</strong> {result.given}
              </p>
              <p>
                <strong>When</strong> {result.when}
              </p>
              <p>
                <strong>Then</strong> {result.then}
              </p>
            </div>
            <p className="req-gen__tagline">
              Translated by someone who’s heard this exact sentence in a stakeholder meeting.
            </p>
          </article>
        )}
      </div>
    </div>
  );
}
