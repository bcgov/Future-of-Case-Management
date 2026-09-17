<script>
  // Four operations. They differ only in what they do to valid time, and that
  // difference is the main input to how an overpayment gets classified.
  const ops = [
    {
      id: 'record',
      name: 'Record',
      plain: 'We learned something new.',
      valid: 'the period asserted',
      txn: 'now',
      effect: 'A first assertion about a period nothing covered yet.',
      money: null,
      example: 'At application, the client declares they live alone.'
    },
    {
      id: 'supersede',
      name: 'Supersede',
      plain: 'The world changed.',
      valid: 'a new period',
      txn: 'now',
      effect:
        'The earlier assertion stays true for its own period. The new one takes over from a later date.',
      money: 'the world having changed',
      example: 'A partner moves in on 1 May, and the client reports it.'
    },
    {
      id: 'correct',
      name: 'Correct',
      plain: 'We were wrong about the world.',
      valid: 'the same period',
      txn: 'now',
      effect:
        'The earlier assertion was never right. The replacement covers exactly the same period.',
      money: 'the ministry having been wrong',
      example: 'A review establishes the household was a couple from January, not a single person.'
    },
    {
      id: 'invalidate',
      name: 'Invalidate',
      plain: 'It should never have been recorded.',
      valid: 'closed',
      txn: 'now',
      effect: 'The assertion is withdrawn. It remains visible in the history as withdrawn.',
      money: null,
      example: 'The finding was filed against the wrong participant.'
    }
  ];

  let selected = $state('supersede');
  const op = $derived(ops.find((o) => o.id === selected));
</script>

<div class="ops">
  <div class="tabs" role="group" aria-label="Evidence operations">
    {#each ops as o}
      <button
        class="btn"
        aria-pressed={selected === o.id}
        onclick={() => (selected = o.id)}>{o.name}</button
      >
    {/each}
  </div>

  <div class="panel" aria-live="polite">
    <p class="plain">{op.plain}</p>

    <dl class="axes">
      <div>
        <dt><span class="k-valid">valid time</span></dt>
        <dd>{op.valid}</dd>
      </div>
      <div>
        <dt><span class="k-txn">transaction time</span></dt>
        <dd>{op.txn}</dd>
      </div>
    </dl>

    <p class="effect">{op.effect}</p>
    <p class="example"><span class="lbl">For example</span> {op.example}</p>

    {#if op.money}
      <p class="money" class:err={op.money === 'the ministry having been wrong'}>
        If this produced an overpayment, the classification rule reads the operation as
        <strong>{op.money}</strong>.
      </p>
    {/if}
  </div>
</div>

<style>
  .ops {
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
  }
  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem;
    border-bottom: 1px solid var(--rule);
  }
  .panel {
    padding: 1.25rem 1rem 1.4rem;
  }
  .plain {
    font-size: var(--step-2);
    line-height: 1.3;
    margin: 0 0 1.1rem;
    max-width: 22ch;
    font-family: var(--font-ui);
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .axes {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2.5rem;
    margin: 0 0 1.1rem;
    padding: 0.85rem 0;
    border-block: 1px solid var(--rule);
  }
  .axes div {
    min-width: 11rem;
  }
  .axes dt {
    margin-bottom: 0.3rem;
  }
  .axes dd {
    margin: 0;
    font-family: var(--font-ui);
    font-size: var(--step-0);
    font-weight: 600;
  }
  .effect {
    margin: 0 0 0.9rem;
    max-width: 54ch;
  }
  .example {
    margin: 0;
    font-size: var(--step--1);
    color: var(--muted);
    max-width: 54ch;
  }
  .lbl {
    font-family: var(--font-ui);
    font-weight: 600;
    color: var(--ink);
  }
  .money {
    margin: 1.1rem 0 0;
    padding: 0.7rem 0.9rem;
    border-radius: var(--radius);
    background: var(--valid-soft);
    border-left: 3px solid var(--valid);
    font-size: var(--step--1);
    font-family: var(--font-ui);
    max-width: 54ch;
  }
  .money.err {
    background: var(--txn-soft);
    border-left-color: var(--txn);
  }
</style>
