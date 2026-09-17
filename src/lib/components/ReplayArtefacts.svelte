<script>
  // Five artefacts are bound into every decision. Switch one off to see which
  // question stops being answerable.
  const artefacts = [
    {
      id: 'rules',
      n: 1,
      name: 'The rules',
      bound: 'Content digest, tagged and immutable once released',
      why: 'Names the policy that was applied.',
      breaks:
        'Which rules were in force becomes a reconstruction from release notes, argued rather than shown.'
    },
    {
      id: 'engine',
      n: 2,
      name: 'The engine',
      bound: 'Version number and the archived binary',
      why: 'An engine upgrade can change how the same rules evaluate.',
      breaks:
        'The version number survives but the executable does not. An identifier is worthless once the vendor stops serving that tag.'
    },
    {
      id: 'snapshot',
      n: 3,
      name: 'The facts it saw',
      bound: 'Copied in full into the record, never referenced',
      why: 'The record has to hold the world as it was, not a pointer to the world as it is.',
      breaks:
        'A pointer resolves to whatever the database says today. Replay returns today’s answer to a four-year-old question.'
    },
    {
      id: 'trace',
      n: 4,
      name: 'The reasoning',
      bound: 'Which rules fired and which branches were taken, in a ministry-owned format',
      why: 'This is what a decision-maker reads out at a hearing.',
      breaks:
        'Nobody can explain the decision in words. It can perhaps be re-run, but it cannot be accounted for.'
    },
    {
      id: 'notice',
      n: 5,
      name: 'The letter',
      bound: 'Content-hashed template, resolved at decision time',
      why: 'A tribunal asks equally what the client was told.',
      breaks:
        'The determination reproduces perfectly and still fails to answer the question actually asked, which is often about the letter.'
    }
  ];

  // A plain array rather than a Set: $state gives deep reactivity to arrays
  // and plain objects, but not to Set or Map.
  let off = $state([]);

  function toggle(id) {
    off = off.includes(id) ? off.filter((x) => x !== id) : [...off, id];
  }

  const missing = $derived(artefacts.filter((a) => off.includes(a.id)));
  const ok = $derived(missing.length === 0);
</script>

<div class="replay">
  <ul class="cards">
    {#each artefacts as a}
      {@const gone = off.includes(a.id)}
      <li>
        <button class="card" class:gone aria-pressed={gone} onclick={() => toggle(a.id)}>
          <span class="num" aria-hidden="true">{a.n}</span>
          <span class="nm">{a.name}</span>
          <span class="bd">{a.bound}</span>
          <span class="state">{gone ? 'Not stored' : 'Stored'}</span>
        </button>
      </li>
    {/each}
  </ul>

  <div class="verdict" class:ok aria-live="polite">
    {#if ok}
      <p class="head">The decision can be replayed.</p>
      <p>
        Four years on, the same inputs produce the same answer, the reasoning can be read aloud, and
        the letter the client received can be reproduced.
      </p>
    {:else}
      <p class="head">
        {missing.length === 1 ? 'One artefact is missing.' : `${missing.length} artefacts are missing.`}
      </p>
      <ul>
        {#each missing as m}
          <li><strong>{m.name}.</strong> {m.breaks}</li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .replay {
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
    padding: 1.25rem;
  }
  .cards {
    list-style: none;
    margin: 0 0 1.25rem;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10.5rem, 1fr));
    gap: 0.6rem;
  }
  .card {
    display: grid;
    gap: 0.25rem;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 0.75rem 0.8rem 0.65rem;
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius);
    background: var(--paper);
    cursor: pointer;
  }
  .card:hover {
    border-color: var(--ink);
  }
  .num {
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--muted);
  }
  .nm {
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: 0.92rem;
    line-height: 1.2;
  }
  .bd {
    font-size: 0.76rem;
    line-height: 1.4;
    color: var(--muted);
  }
  .state {
    margin-top: 0.35rem;
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--txn);
  }
  .card.gone {
    background: color-mix(in oklab, var(--paper) 92%, var(--ink));
    border-style: dashed;
  }
  .card.gone .nm,
  .card.gone .bd {
    opacity: 0.55;
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
  .card.gone .state {
    color: var(--valid);
  }

  .verdict {
    border-top: 1px solid var(--rule);
    padding-top: 1.1rem;
  }
  .head {
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: var(--step-1);
    margin: 0 0 0.5rem;
    letter-spacing: -0.015em;
  }
  .verdict p,
  .verdict li {
    font-size: var(--step--1);
    line-height: 1.6;
    max-width: 58ch;
  }
  .verdict ul {
    margin: 0;
    padding-left: 1.1rem;
  }
  .verdict li {
    margin-bottom: 0.45rem;
  }
  .verdict.ok .head {
    color: var(--txn);
  }
</style>
