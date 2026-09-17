<script>
  // Plain English stays on the page. The technical statement sits behind a
  // native disclosure, so keyboard and screen-reader behaviour comes for free.
  let { summary = 'The technical statement', children } = $props();
</script>

<details class="tech">
  <summary>{summary}</summary>
  <div class="body">
    {@render children()}
  </div>
</details>

<style>
  .tech {
    border: 1px solid var(--rule);
    border-left: 3px solid var(--rule-strong);
    border-radius: var(--radius);
    background: var(--paper-raised);
    margin: 1.8rem 0;
    max-width: var(--measure);
  }
  summary {
    cursor: pointer;
    padding: 0.75rem 1rem;
    font-family: var(--font-ui);
    font-size: var(--step--1);
    font-weight: 600;
    list-style-position: outside;
  }
  summary:hover {
    background: color-mix(in oklab, var(--paper-raised) 88%, var(--ink));
  }
  .body {
    padding: 0.25rem 1rem 0.9rem;
    font-size: var(--step--1);
    line-height: 1.65;
  }
  .body :global(p:last-child) {
    margin-bottom: 0;
  }
  .body :global(code) {
    background: color-mix(in oklab, var(--paper) 70%, var(--rule));
    padding: 0.1em 0.3em;
    border-radius: 2px;
  }
  .body :global(table) {
    font-size: 0.92em;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  @media (min-width: 40rem) {
    .body :global(table) {
      display: table;
      white-space: normal;
    }
  }
</style>
