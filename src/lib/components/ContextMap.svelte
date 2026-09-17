<script>
  const contexts = [
    {
      id: 'identity',
      name: 'Participant Identity',
      group: 'core',
      plain: 'Who someone is, and nothing else about them.',
      owns: 'Identifiers, enough demographics to match candidates, identity-proofing status, merge and split.',
      not: 'No addresses, no payment details, no employment records, no relationships. Those are evidence, owned elsewhere.',
      test: 'If it gains a column outside this definition, the shared model has been rebuilt. Treat that as a defect, not as debt.'
    },
    {
      id: 'evidence',
      name: 'Evidence & Verification',
      group: 'core',
      plain: 'Every dated claim about the world, and how it was checked.',
      owns: 'The evidence succession set, verification policy, the four operations, three time axes.',
      not: 'It does not decide anything. It records what was claimed and what was verified.',
      test: 'Its events are the trigger fabric for everything else.'
    },
    {
      id: 'determination',
      name: 'Eligibility & Entitlement',
      group: 'core',
      plain: 'Whether someone qualifies, and for how much.',
      owns: 'The determination function, the decision record, the bound artefacts.',
      not: 'It holds no state of its own between decisions and reads no live data at decision time.',
      test: 'Pure: no clock, no database, no service calls.'
    },
    {
      id: 'ea',
      name: 'Employment assistance',
      group: 'case',
      plain: 'The case model for employment assistance.',
      owns: 'Its own case lifecycle, its own language.',
      not: 'It shares no case model with the other four program families.',
      test: 'Protocols are shared; the case model is not.'
    },
    {
      id: 'cp',
      name: 'Child protection',
      group: 'case',
      plain: 'The case model for child protection.',
      owns: 'Investigations, safety, placements, court-ordered records, decades-long retention.',
      not: 'It does not bend to fit a subsidy renewal.',
      test: 'The previous programme cut scope here specifically because a shared model made the work harder.'
    },
    {
      id: 'ccs',
      name: 'Child care subsidy',
      group: 'case',
      plain: 'The case model for child care subsidy.',
      owns: 'Its own renewal cycle and authorisation model.',
      not: '—',
      test: 'The smallest rule surface, which is why it is captured first.'
    },
    {
      id: 'es',
      name: 'Employment services',
      group: 'case',
      plain: 'The case model for employment services.',
      owns: 'Plans, referrals, provider interaction.',
      not: '—',
      test: '—'
    },
    {
      id: 'pwd',
      name: 'Persons with disabilities',
      group: 'case',
      plain: 'The case model for disability assistance and designation.',
      owns: 'Designation, prescribed classes, review cycles.',
      not: '—',
      test: '—'
    },
    {
      id: 'payments',
      name: 'Payments & Issuance',
      group: 'money',
      plain: 'The one place money leaves the ministry.',
      owns: 'Issuance runs, payment instructions, method routing, stop payment, reissue, returned items, month-end cutoff.',
      not: 'It does not calculate entitlement.',
      test: 'An entitlement determined twice must not be paid twice, and that guarantee lives here rather than in five case contexts.'
    },
    {
      id: 'financial',
      name: 'Financial Components',
      group: 'money',
      plain: 'The ledger.',
      owns: 'Accounts, accruals, schedules, double-entry postings.',
      not: 'It does not disburse.',
      test: 'Separate from issuance because ledger correctness and disbursement mechanics fail differently and are audited differently.'
    },
    {
      id: 'overpayment',
      name: 'Overpayment & Recovery',
      group: 'money',
      plain: 'Money owed back, and what taking it back does to the client.',
      owns: 'Overpayment generation, notification, repayment agreements, deduction rates, write-off, collections referral.',
      not: '—',
      test: 'The rule classifying a recalculation as recoverable or as administrative error reads the evidence operation that produced it.'
    },
    {
      id: 'appeals',
      name: 'Appeals & Reconsideration',
      group: 'support',
      plain: 'Challenging a decision.',
      owns: 'Statutory clocks, reconsideration packages, the tribunal as an external party, interim assistance.',
      not: '—',
      test: 'Modelled once, not per program family. An allowed appeal is a retroactive determination, not a manual adjustment.'
    },
    {
      id: 'work',
      name: 'Work Management',
      group: 'support',
      plain: 'Who does what, and by when.',
      owns: 'Tasks, assignment, caseload balancing, supervisory queues, overdue surfacing, escalation.',
      not: 'Work items reference identifiers. They never carry copies of evidence.',
      test: 'Named once so that "overdue" does not acquire five different definitions.'
    },
    {
      id: 'documents',
      name: 'Documents & Capture',
      group: 'support',
      plain: 'Scans, uploads, attachments, signatures.',
      owns: 'Capture, attachment lifecycle, extraction, e-signature, and the link between a document and the claim it supports.',
      not: 'A document is not evidence.',
      test: 'A document is what a verification policy accepts as satisfying an evidence type. Losing that distinction turns the file store into a second system of record.'
    },
    {
      id: 'notices',
      name: 'Notices & Correspondence',
      group: 'support',
      plain: 'What the client was actually told.',
      owns: 'Template lifecycle, content hashing, rendering, channel selection, proof of what was sent.',
      not: '—',
      test: 'It receives the decision classification so an adverse determination emits reasons and an appeal period by construction.'
    },
    {
      id: 'provider',
      name: 'Provider & Outcome',
      group: 'support',
      plain: 'The organisations that deliver services.',
      owns: 'Facilities, placements, authorisations, agreements, outcome measures.',
      not: '—',
      test: '—'
    }
  ];

  const groups = [
    { id: 'core', label: 'Shared spine' },
    { id: 'case', label: 'One per program family' },
    { id: 'money', label: 'Money' },
    { id: 'support', label: 'Delivery' }
  ];

  let selected = $state('evidence');
  const ctx = $derived(contexts.find((c) => c.id === selected));
</script>

<div class="map">
  <div class="board">
    {#each groups as g}
      <section class="grp" aria-labelledby="grp-{g.id}">
        <h3 id="grp-{g.id}">{g.label}</h3>
        <ul>
          {#each contexts.filter((c) => c.group === g.id) as c}
            <li>
              <button
                class="node"
                aria-pressed={selected === c.id}
                onclick={() => (selected = c.id)}>{c.name}</button
              >
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>

  <aside class="detail" aria-live="polite">
    <h3>{ctx.name}</h3>
    <p class="plain">{ctx.plain}</p>
    <dl>
      <dt>Owns</dt>
      <dd>{ctx.owns}</dd>
      {#if ctx.not !== '—'}
        <dt>Does not own</dt>
        <dd>{ctx.not}</dd>
      {/if}
      {#if ctx.test !== '—'}
        <dt>Boundary test</dt>
        <dd>{ctx.test}</dd>
      {/if}
    </dl>
  </aside>
</div>

<style>
  .map {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
    padding: 1.25rem;
  }
  @media (min-width: 52rem) {
    .map {
      grid-template-columns: 1.15fr 1fr;
      gap: 2rem;
    }
  }

  .grp + .grp {
    margin-top: 1.25rem;
  }
  .grp h3 {
    margin: 0 0 0.5rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--muted);
    font-family: var(--font-ui);
    letter-spacing: 0;
  }
  .grp ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .node {
    font-family: var(--font-ui);
    font-size: 0.85rem;
    padding: 0.4rem 0.7rem;
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius);
    background: var(--paper);
    cursor: pointer;
    text-align: left;
  }
  .node:hover {
    border-color: var(--ink);
  }
  .node[aria-pressed='true'] {
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
  }

  .detail {
    border-top: 2px solid var(--ink);
    padding-top: 0.9rem;
  }
  @media (min-width: 52rem) {
    .detail {
      border-top: 0;
      border-left: 1px solid var(--rule);
      padding: 0 0 0 2rem;
    }
  }
  .detail h3 {
    margin: 0 0 0.4rem;
    font-size: var(--step-1);
  }
  .plain {
    margin: 0 0 1rem;
    color: var(--muted);
  }
  .detail dl {
    margin: 0;
    font-size: var(--step--1);
  }
  .detail dt {
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 0.9rem;
  }
  .detail dd {
    margin: 0.2rem 0 0;
    line-height: 1.6;
  }
</style>
