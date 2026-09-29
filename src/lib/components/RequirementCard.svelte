<script>
  import { base } from '$app/paths';

  // One requirement, collapsed to its headline. Expanding it shows every field
  // from the specification. The content is prerendered inside <details>, so it
  // reads without JavaScript and every word is in the copy lock.
  let { item, open = $bindable(false) } = $props();

  const fix = (html) => html.replaceAll('%BASE%', base);
  const priorityClass = {
    Must: 'must',
    Should: 'should',
    Could: 'could',
    "Won't": 'wont'
  };
</script>

<details class="req" id={item.anchor} bind:open>
  <summary>
    <span class="head">
      <span class="rid">{item.id}</span>
      <span class="badges">
        {#if item.priority}
          <span class="pri {priorityClass[item.priority]}">{item.priority}</span>
        {/if}
        {#if item.module !== null}
          <span class="tag">M{item.module}</span>
        {/if}
        {#if item.complexity}
          <span class="tag quiet">{item.complexity}</span>
        {/if}
      </span>
    </span>
    <h3>{item.title}</h3>
    <span class="lead">{item.lead}</span>
    <span class="more" aria-hidden="true">{open ? 'Hide detail' : 'Show detail'}</span>
  </summary>
  <div class="body">
    {#if item.priorityNote}
      <p class="note">Priority: {item.priorityNote}</p>
    {/if}
    {#if item.moduleText}
      <p class="note">First needed in: {item.moduleText}</p>
    {/if}
    {#each item.fields as f}
      <section class="field" class:ac={/criteria/i.test(f.label)}>
        <h4>{f.label}</h4>
        <div class="val">{@html fix(f.html)}</div>
      </section>
    {/each}
  </div>
</details>

<style>
  .req {
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
    scroll-margin-top: 5rem;
  }
  .req[open] {
    border-color: var(--rule-strong);
    box-shadow: 0 1px 0 var(--rule-strong);
  }
  .req:target,
  .req:focus-within {
    border-color: var(--ink);
  }

  summary {
    display: grid;
    gap: 0.35rem;
    padding: 1rem 1.1rem 0.9rem;
    cursor: pointer;
    list-style: none;
    position: relative;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary:hover .more {
    color: var(--ink);
    text-decoration: underline;
  }

  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .rid {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 0.02em;
  }
  .badges {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  .pri,
  .tag {
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1;
    padding: 0.3rem 0.5rem;
    border-radius: 999px;
    border: 1px solid var(--rule-strong);
    white-space: nowrap;
  }
  /* Priority is carried by the word; the fill only reinforces it. */
  .pri.must {
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
  }
  .pri.should {
    border-color: var(--ink);
  }
  .pri.could {
    border-style: dashed;
  }
  .pri.wont {
    color: var(--muted);
    text-decoration: line-through;
  }
  .tag.quiet {
    color: var(--muted);
    border-color: var(--rule);
  }

  h3 {
    margin: 0.1rem 0 0;
    font-family: var(--font-ui);
    font-size: var(--step-1);
    line-height: 1.25;
    letter-spacing: -0.01em;
  }
  .lead {
    font-size: var(--step--1);
    line-height: 1.55;
    color: var(--muted);
    max-width: 70ch;
  }
  .more {
    font-family: var(--font-ui);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted);
    margin-top: 0.2rem;
  }

  .body {
    border-top: 1px solid var(--rule);
    padding: 0.4rem 1.1rem 1.1rem;
    display: grid;
    gap: 0.2rem;
  }
  .note {
    font-family: var(--font-ui);
    font-size: 0.82rem;
    color: var(--muted);
    margin: 0.6rem 0 0;
  }
  .field {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.2rem 1.5rem;
    padding: 0.7rem 0 0.2rem;
  }
  @media (min-width: 52rem) {
    .field {
      grid-template-columns: 11rem 1fr;
    }
  }
  h4 {
    margin: 0;
    font-family: var(--font-ui);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    line-height: 1.8;
  }
  .val {
    font-size: var(--step--1);
    line-height: 1.6;
    min-width: 0;
  }
  .val :global(p) {
    margin: 0 0 0.6rem;
  }
  .val :global(ul) {
    margin: 0 0 0.6rem;
    padding-left: 1.2rem;
  }
  .val :global(li) {
    margin-bottom: 0.3rem;
  }
  /* Acceptance criteria read as a checklist. */
  .ac .val :global(ul.checks) {
    list-style: none;
    padding: 0;
  }
  .ac .val :global(ul.checks li) {
    position: relative;
    padding: 0.55rem 0.7rem 0.55rem 2.1rem;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper);
    margin-bottom: 0.45rem;
  }
  .ac .val :global(ul.checks li)::before {
    content: '';
    position: absolute;
    left: 0.7rem;
    top: 0.8rem;
    width: 0.8rem;
    height: 0.8rem;
    border: 1.5px solid var(--rule-strong);
    border-radius: 2px;
  }
  .val :global(a.rid) {
    font-family: var(--font-mono);
    font-size: 0.85em;
  }
  .val :global(a.g) {
    text-decoration-style: dotted;
  }
  .val :global(.cite) {
    font-family: var(--font-mono);
    font-size: 0.72em;
    color: var(--muted);
    white-space: nowrap;
  }
  .val :global(.tbl) {
    overflow-x: auto;
  }
  .val :global(table) {
    font-size: 0.85rem;
  }
</style>
