<script>
  import { base } from '$app/paths';
  import data from '$lib/requirements/tradeoffs.js';

  const fix = (html) => html.replaceAll('%BASE%', base);
  const text = (html) => html.replace(/<[^>]+>/g, '');
  const resolved = data.conflicts.filter((c) => !c.open).length;
</script>

<svelte:head>
  <title>Trade-offs — The Future of Case Management IT</title>
  <meta
    name="description"
    content="The conflicts between requirements, how each was resolved or who must resolve it, and the dependencies and risks the requirements carry."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Trade-offs and open decisions</h1>
    <p class="lede">
      Some requirements pull against each other. These conflicts come from the sources themselves:
      policy against practice, one design parameter against another, a legal duty against a design
      property. Each one says what was chosen, what it costs, and who decides.
    </p>
  </div>

  <ul class="summary wide" aria-label="Conflict status">
    <li><span class="big">{data.conflicts.length}</span> conflicts set out</li>
    <li><span class="big">{resolved}</span> resolved by the source hierarchy or the architecture</li>
    <li><span class="big">{data.conflicts.length - resolved}</span> waiting on a ministry ruling</li>
  </ul>

  <ol class="conflicts wide">
    {#each data.conflicts as c}
      <li>
        <details id={c.anchor}>
          <summary>
            <span class="top">
              <span class="cid">{c.id}</span>
              <span class="strategy">{c.strategy}</span>
              <span class="state" class:open={c.open}>{c.open ? 'Open' : 'Resolved'}</span>
            </span>
            <h2>{c.title}</h2>
            {#if c.decision}<span class="decision"><strong>Decision:</strong> {text(c.decision)}</span>{/if}
            {#if c.authority}<span class="auth"><strong>Who decides:</strong> {text(c.authority)}</span>{/if}
          </summary>
          <div class="val">{@html fix(c.html)}</div>
        </details>
      </li>
    {/each}
  </ol>

  <section class="wide more" aria-labelledby="deps">
    <h2 id="deps">Dependencies</h2>
    <p class="note">Decisions and sources the requirements wait on, with their owners.</p>
    <div class="val">{@html fix(data.dependencies)}</div>
  </section>

  <section class="wide more" aria-labelledby="risks">
    <h2 id="risks">Risks to the requirements</h2>
    <div class="val">{@html fix(data.risks)}</div>
  </section>

  <p class="prose source">
    Back to the <a href="{base}/requirements">requirements overview</a>.
  </p>
</div>

<style>
  .summary {
    list-style: none;
    margin: 2rem 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 0.8rem;
    font-family: var(--font-ui);
    font-size: 0.9rem;
    color: var(--muted);
  }
  .summary li {
    border-top: 3px solid var(--ink);
    padding-top: 0.6rem;
  }
  .big {
    display: block;
    font-size: var(--step-4);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }
  .conflicts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.7rem;
  }
  details {
    border: 1px solid var(--rule);
    border-left: 5px solid var(--ink);
    border-radius: var(--radius);
    background: var(--paper-raised);
    scroll-margin-top: 5rem;
  }
  summary {
    display: grid;
    gap: 0.4rem;
    padding: 1rem 1.2rem;
    cursor: pointer;
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  .top {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
  }
  .cid {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted);
    margin-right: 0.3rem;
  }
  .strategy,
  .state {
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0.3rem 0.55rem;
    border-radius: 999px;
    border: 1px solid var(--rule-strong);
  }
  .state {
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
  }
  .state.open {
    background: transparent;
    color: var(--ink);
    border: 1.5px dashed var(--ink);
  }
  h2 {
    margin: 0.2rem 0 0;
    font-size: var(--step-1);
    line-height: 1.3;
  }
  .decision,
  .auth {
    font-size: var(--step--1);
    line-height: 1.5;
    max-width: 75ch;
  }
  .auth {
    color: var(--muted);
  }
  .val {
    padding: 0 1.2rem 1.2rem;
    font-size: var(--step--1);
    line-height: 1.6;
    overflow-x: auto;
  }
  .val :global(table) {
    font-size: 0.82rem;
  }
  .more {
    margin-top: 3.5rem;
  }
  .more h2 {
    font-size: var(--step-2);
    border-bottom: 2px solid var(--ink);
    padding-bottom: 0.5rem;
  }
  .more .val {
    padding: 0;
  }
  .note {
    font-size: var(--step--1);
    color: var(--muted);
  }
  .source {
    margin-top: 3rem;
    font-family: var(--font-ui);
    font-size: var(--step--1);
  }
</style>
