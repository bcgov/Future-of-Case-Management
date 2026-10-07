<script>
  import { onMount, tick } from 'svelte';
  import { base } from '$app/paths';
  import RequirementCard from './RequirementCard.svelte';

  // A filterable list of requirements, grouped by category. Every card is
  // prerendered; the filters only hide what does not match.
  let { data, modules = false } = $props();

  const fix = (html) => html.replaceAll('%BASE%', base);
  const strip = (html) => html.replace(/<[^>]+>/g, ' ');

  const groups = data.groups.map((g) => {
    const m = g.title.match(/^([A-P]|CF\d+)\.\s+(.*)$/);
    return { ...g, letter: m ? m[1] : null, name: m ? m[2] : g.title };
  });
  const all = groups.flatMap((g) => g.items);
  // Search text is built once, in the browser, from what the card shows.
  const haystack = new Map(
    all.map((i) => [
      i.id,
      [i.id, i.title, i.lead, ...i.fields.map((f) => strip(f.html))].join(' ').toLowerCase()
    ])
  );

  const priorities = ['Must', 'Should', 'Could', "Won't"].filter((p) =>
    all.some((i) => i.priority === p)
  );
  const moduleList = modules
    ? [...new Set(all.map((i) => i.module).filter((m) => m !== null))].sort((a, b) => a - b)
    : [];

  let query = $state('');
  let chosen = $state([]);
  let mod = $state(null);
  let opened = $state(Object.fromEntries(all.map((i) => [i.id, false])));

  const matches = (i) =>
    (!query.trim() || haystack.get(i.id).includes(query.trim().toLowerCase())) &&
    (!chosen.length || chosen.includes(i.priority)) &&
    (mod === null || i.module === mod);

  const shown = $derived(
    groups.map((g) => ({ ...g, visible: g.items.filter(matches) })).filter((g) => g.visible.length)
  );
  const count = $derived(shown.reduce((n, g) => n + g.visible.length, 0));
  const filtering = $derived(query.trim() !== '' || chosen.length > 0 || mod !== null);

  function toggle(p) {
    chosen = chosen.includes(p) ? chosen.filter((x) => x !== p) : [...chosen, p];
  }
  function clear() {
    query = '';
    chosen = [];
    mod = null;
  }
  function setAll(state) {
    const next = {};
    for (const g of shown) for (const i of g.visible) next[i.id] = state;
    opened = { ...opened, ...next };
  }

  // A link to #fr-061 opens that card, clearing any filter that would hide it.
  async function fromHash() {
    const id = decodeURIComponent(location.hash.slice(1)).toUpperCase();
    const item = all.find((i) => i.id === id);
    if (!item) return;
    if (!matches(item)) clear();
    opened = { ...opened, [item.id]: true };
    await tick();
    document.getElementById(item.anchor)?.scrollIntoView({ block: 'start' });
  }
  onMount(() => {
    fromHash();
    addEventListener('hashchange', fromHash);
    return () => removeEventListener('hashchange', fromHash);
  });
</script>

<div class="browser">
  <div class="tools" role="search">
    <label class="search">
      <span class="vh">Search requirements</span>
      <input type="search" placeholder="Search by word or ID" bind:value={query} />
    </label>

    <div class="row" role="group" aria-label="Filter by priority">
      <span class="lbl" aria-hidden="true">Priority</span>
      {#each priorities as p}
        <button class="chip" aria-pressed={chosen.includes(p)} onclick={() => toggle(p)}>{p}</button>
      {/each}
    </div>

    {#if moduleList.length}
      <div class="row" role="group" aria-label="Filter by the module in which it is first needed">
        <span class="lbl" aria-hidden="true">First needed</span>
        {#each moduleList as m}
          <button class="chip mono" aria-pressed={mod === m} onclick={() => (mod = mod === m ? null : m)}
            >M{m}</button
          >
        {/each}
      </div>
    {/if}

    <div class="row status">
      <p aria-live="polite">
        Showing {count} of {all.length}
        {#if filtering}<button class="link" onclick={clear}>Clear filters</button>{/if}
      </p>
      <span class="spacer"></span>
      <button class="link" onclick={() => setAll(true)}>Expand all</button>
      <button class="link" onclick={() => setAll(false)}>Collapse all</button>
    </div>
  </div>

  {#if groups.length > 1}
    <nav class="index" aria-label="Categories on this page">
      <ul>
        {#each groups as g}
          {@const n = shown.find((s) => s.id === g.id)?.visible.length ?? 0}
          <li class:empty={!n}>
            <a href="#{g.id}">
              {#if g.letter}<span class="letter">{g.letter}</span>{/if}
              <span class="name">{g.name}</span>
              <span class="n">{n}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}

  <div class="groups">
    {#each shown as g (g.id)}
      <section class="group" id={g.id} aria-labelledby="h-{g.id}">
        <h2 id="h-{g.id}">
          {#if g.letter}<span class="letter">{g.letter}</span>{/if}
          {g.name}
          <span class="n">{g.visible.length}</span>
        </h2>
        {#if g.intro && !filtering}
          <div class="intro">{@html fix(g.intro)}</div>
        {/if}
        <ul class="cards">
          {#each g.visible as item (item.id)}
            <li><RequirementCard {item} bind:open={opened[item.id]} /></li>
          {/each}
        </ul>
      </section>
    {:else}
      <p class="none">No requirement matches these filters.</p>
    {/each}
  </div>
</div>

<style>
  .browser {
    display: grid;
    gap: 1.5rem;
  }
  @media (min-width: 64rem) {
    .browser {
      grid-template-columns: 15rem 1fr;
      grid-template-areas: 'tools tools' 'index groups';
      align-items: start;
    }
    .tools {
      grid-area: tools;
    }
    .index {
      grid-area: index;
      position: sticky;
      top: 5rem;
      max-height: calc(100vh - 6rem);
      overflow-y: auto;
    }
    .groups {
      grid-area: groups;
    }
  }

  .tools {
    display: grid;
    gap: 0.7rem;
    padding: 1rem;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
  }
  .search input {
    width: 100%;
    font: inherit;
    font-family: var(--font-ui);
    font-size: var(--step-0);
    padding: 0.6rem 0.8rem;
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius);
    background: var(--paper);
    color: var(--ink);
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem;
  }
  .lbl {
    font-family: var(--font-ui);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-right: 0.35rem;
    min-width: 6.5rem;
  }
  .chip {
    font-size: 0.82rem;
    font-weight: 600;
    min-height: 32px;
    padding: 0.3rem 0.75rem;
    border: 1px solid var(--rule-strong);
    border-radius: 999px;
    background: var(--paper);
    cursor: pointer;
  }
  .chip.mono {
    font-family: var(--font-mono);
    font-size: 0.78rem;
  }
  .chip:hover {
    border-color: var(--ink);
  }
  .chip[aria-pressed='true'] {
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
  }
  .status p {
    margin: 0;
    font-family: var(--font-ui);
    font-size: 0.85rem;
    color: var(--muted);
  }
  .spacer {
    flex: 1;
  }
  .link {
    background: none;
    border: 0;
    padding: 0.25rem 0.4rem;
    min-height: 28px;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 0.2em;
    cursor: pointer;
  }

  .index ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.15rem;
  }
  .index a {
    display: grid;
    grid-template-columns: 1.6rem 1fr auto;
    align-items: baseline;
    gap: 0.4rem;
    padding: 0.4rem 0.5rem;
    min-height: 32px;
    font-family: var(--font-ui);
    font-size: 0.85rem;
    line-height: 1.3;
    text-decoration: none;
    border-radius: var(--radius);
    color: var(--ink);
  }
  .index a:hover {
    background: var(--paper-raised);
  }
  .index li.empty a {
    color: var(--muted);
    opacity: 0.6;
  }
  .index .name {
    grid-column: 2;
  }
  .letter {
    display: inline-grid;
    place-items: center;
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 0.3rem;
    border-radius: 999px;
    border: 1px solid var(--rule-strong);
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 700;
  }
  .n {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--muted);
  }

  .group + .group {
    margin-top: 2.5rem;
  }
  .group h2 {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0 0 0.9rem;
    font-size: var(--step-2);
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--ink);
  }
  .group h2 .letter {
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.45rem;
    font-size: 0.9rem;
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
  }
  .group h2 .n {
    margin-left: auto;
    font-size: 0.85rem;
  }
  .intro {
    max-width: var(--measure);
    font-size: var(--step--1);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  .cards {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.6rem;
  }
  .none {
    font-family: var(--font-ui);
    color: var(--muted);
  }
  .vh {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
</style>
