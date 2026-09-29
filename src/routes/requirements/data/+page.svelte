<script>
  import { base } from '$app/paths';
  import RequirementBrowser from '$lib/components/RequirementBrowser.svelte';
  import data from '$lib/requirements/data.js';

  const fix = (html) => html.replaceAll('%BASE%', base);
</script>

<svelte:head>
  <title>Data requirements — The Future of Case Management IT</title>
  <meta
    name="description"
    content="The nineteen data requirements, the ten principal information objects, and the data quality rules for the system that replaces ICM and MIS."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Data</h1>
    <p class="lede">
      How the system records facts, keeps them, destroys them on schedule, and moves them from the
      legacy systems without losing what the ministry knew and when.
    </p>
  </div>

  <div class="wide browse">
    <RequirementBrowser {data} />
  </div>

  <section class="wide objects" aria-labelledby="objects">
    <h2 id="objects">The main information objects</h2>
    <p class="note">
      Each object belongs to one part of the system. They are not a shared model that every part must
      use; each part keeps its own view of what it needs.
    </p>
    <ul>
      {#each data.entities as e}
        <li>
          <details id={e.id}>
            <summary>
              <span class="num">{e.id.replace('entity-', '')}</span>
              <span class="t">{e.title}</span>
            </summary>
            <div class="val">{@html fix(e.html)}</div>
          </details>
        </li>
      {/each}
    </ul>
  </section>

  {#if data.quality}
    <section class="prose quality" aria-labelledby="quality">
      <h2 id="quality">Data quality</h2>
      <div class="val">{@html fix(data.quality)}</div>
    </section>
  {/if}
</div>

<style>
  .browse {
    margin-top: 2rem;
  }
  .objects {
    margin-top: 3.5rem;
  }
  .objects h2,
  .quality h2 {
    border-bottom: 2px solid var(--ink);
    padding-bottom: 0.5rem;
  }
  .note {
    max-width: var(--measure);
    font-size: var(--step--1);
    color: var(--muted);
  }
  .objects ul {
    list-style: none;
    margin: 1rem 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
    gap: 0.6rem;
    align-items: start;
  }
  details {
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
    scroll-margin-top: 5rem;
  }
  details[open] {
    grid-column: 1 / -1;
    border-color: var(--rule-strong);
  }
  summary {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem 1rem;
    cursor: pointer;
    font-family: var(--font-ui);
    font-weight: 600;
  }
  .num {
    display: inline-grid;
    place-items: center;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    background: var(--ink);
    color: var(--paper);
    font-size: 0.8rem;
    flex: none;
  }
  .val {
    padding: 0 1rem 1rem;
    font-size: var(--step--1);
    line-height: 1.6;
    overflow-x: auto;
  }
  .val :global(table) {
    font-size: 0.82rem;
  }
  .quality {
    margin-top: 3.5rem;
  }
  .quality .val {
    padding: 0;
  }
</style>
