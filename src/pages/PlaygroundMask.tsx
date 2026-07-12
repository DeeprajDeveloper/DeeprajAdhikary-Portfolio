import { useCallback, useId, useState } from 'react';
import { PageHeader, BackLink, Button, Callout } from '@design-system/index';
import { maskSampleCustomer, maskSampleTransaction } from '@data/playground';
import { usePageTitle } from '@/hooks/usePageTitle';
import './PlaygroundMask.scss';

type MaskState = 'raw' | 'masked' | 'broken';

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function maskDigits(value: string, seed: string): string {
  const base = hashString(seed);
  let i = 0;
  return value.replace(/\d/g, () => {
    const digit = (base + i * 17) % 10;
    i += 1;
    return String(digit);
  });
}

function maskEmail(email: string, seed: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  const maskedLocal = maskDigits(local.replace(/[a-z]/gi, 'x'), `${seed}:email`);
  return `${maskedLocal}@${domain}`;
}

function maskName(name: string, seed: string): string {
  const base = hashString(`${seed}:name`);
  return name
    .split(' ')
    .map((part, index) => {
      const first = String.fromCharCode(65 + ((base + index * 3) % 26));
      return `${first}${'.'.repeat(Math.max(part.length - 1, 2))}`;
    })
    .join(' ');
}

function maskAddress(address: string, seed: string): string {
  return maskDigits(address.replace(/[A-Za-z]/g, 'x'), `${seed}:address`);
}

export function PlaygroundMaskPage() {
  usePageTitle('Mask-a-Record');
  const [state, setState] = useState<MaskState>('raw');
  const explanationId = useId();
  const [explanationOpen, setExplanationOpen] = useState(false);

  const seed = 'session-mask-v1';
  const maskedAccount = maskDigits(maskSampleCustomer.accountNumber, `${seed}:account`);
  const brokenAccount = maskDigits(maskSampleCustomer.accountNumber, `${seed}:broken`);

  const customerAccount =
    state === 'raw'
      ? maskSampleCustomer.accountNumber
      : state === 'masked'
        ? maskedAccount
        : brokenAccount;

  const transactionAccount =
    state === 'raw'
      ? maskSampleTransaction.accountNumber
      : state === 'masked'
        ? maskedAccount
        : maskDigits(maskSampleTransaction.accountNumber, `${seed}:txn-break`);

  const mismatched = state === 'broken' && customerAccount !== transactionAccount;

  const customer = {
    name:
      state === 'raw'
        ? maskSampleCustomer.name
        : maskName(maskSampleCustomer.name, seed),
    email:
      state === 'raw'
        ? maskSampleCustomer.email
        : maskEmail(maskSampleCustomer.email, seed),
    accountNumber: customerAccount,
    address:
      state === 'raw'
        ? maskSampleCustomer.address
        : maskAddress(maskSampleCustomer.address, seed),
  };

  const handleMask = useCallback(() => setState('masked'), []);
  const handleBreak = useCallback(() => setState('broken'), []);
  const handleReset = useCallback(() => {
    setState('raw');
    setExplanationOpen(false);
  }, []);

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <BackLink to="/playground" label="Playground" />
        <PageHeader
          eyebrow="Playground"
          title="Mask-a-Record"
          description="Mask sensitive fields while keeping format — and watch what referential integrity looks like when it holds or breaks."
          actions={
            <>
              <Button variant="primary" onClick={handleMask} disabled={state !== 'raw'}>
                Mask this record
              </Button>
              <Button
                variant="secondary"
                onClick={handleBreak}
                disabled={state === 'raw'}
              >
                Break referential integrity
              </Button>
              <Button variant="tertiary" onClick={handleReset} disabled={state === 'raw'}>
                Reset
              </Button>
            </>
          }
        />

        <div className="mask-playground">
          <article className="mask-card">
            <h2 className="mask-card__title">Customer Record</h2>
            <dl className="mask-card__fields">
              <div>
                <dt>Name</dt>
                <dd className={state !== 'raw' ? 'mask-card__value--masked' : undefined}>
                  {customer.name}
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd className={state !== 'raw' ? 'mask-card__value--masked' : undefined}>
                  {customer.email}
                </dd>
              </div>
              <div>
                <dt>Account Number</dt>
                <dd
                  className={[
                    state !== 'raw' ? 'mask-card__value--masked' : '',
                    mismatched ? 'mask-card__value--mismatch' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {customer.accountNumber}
                  {mismatched && <span className="mask-card__flag">Mismatch</span>}
                </dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd className={state !== 'raw' ? 'mask-card__value--masked' : undefined}>
                  {customer.address}
                </dd>
              </div>
            </dl>
          </article>

          <article className="mask-card">
            <h2 className="mask-card__title">Transaction Record</h2>
            <dl className="mask-card__fields">
              <div>
                <dt>Transaction ID</dt>
                <dd>{maskSampleTransaction.id}</dd>
              </div>
              <div>
                <dt>Amount</dt>
                <dd>{maskSampleTransaction.amount}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{maskSampleTransaction.date}</dd>
              </div>
              <div>
                <dt>Account Number</dt>
                <dd
                  className={[
                    state !== 'raw' ? 'mask-card__value--masked' : '',
                    mismatched ? 'mask-card__value--mismatch' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {transactionAccount}
                  {mismatched && <span className="mask-card__flag">Mismatch</span>}
                </dd>
              </div>
            </dl>
          </article>
        </div>

        <div className="mask-playground__explain">
          <button
            type="button"
            className="mask-playground__explain-toggle"
            aria-expanded={explanationOpen}
            aria-controls={explanationId}
            onClick={() => setExplanationOpen((open) => !open)}
          >
            {explanationOpen ? 'Hide explanation' : 'What just happened?'}
          </button>

          {explanationOpen && (
            <div id={explanationId}>
              <Callout variant="intern">
                <p>
                  Masking isn’t random noise — it’s a deterministic transform that keeps format
                  while hiding identity. The Account Number on both records must resolve to the
                  <em> same</em> masked value, or joins across tables silently break. That’s
                  referential integrity. When you “break” it, you’re simulating the failure mode
                  that ships bad test data into QA.
                </p>
              </Callout>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
