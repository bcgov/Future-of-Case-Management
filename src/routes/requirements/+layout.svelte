<script>
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import summary from '$lib/requirements/summary.js';

  let { children } = $props();

  // The requirements section keeps its own category bar, so a reader moving
  // between categories never has to go back to the drawer.
  const count = Object.fromEntries(summary.categories.map((c) => [c.key, c.count]));
  const tabs = [
    { href: '/requirements', label: 'Overview', n: summary.total },
    { href: '/requirements/business', label: 'Business', n: count.business },
    { href: '/requirements/functional', label: 'Functional', n: count.functional },
    { href: '/requirements/quality', label: 'Quality', n: count.quality },
    { href: '/requirements/integrations', label: 'Integrations', n: count.integrations },
    { href: '/requirements/data', label: 'Data', n: count.data },
    { href: '/requirements/trade-offs', label: 'Trade-offs', n: summary.conflicts }
  ];
  const path = $derived($page.url.pathname.replace(base, '').replace(/\/$/, '') || '/');
</script>

<div class="bar">
  <nav class="shell" aria-label="Requirement categories">
    <ul>
      {#each tabs as t}
        <li>
          <a href="{base}{t.href}" aria-current={path === t.href ? 'page' : undefined}>
            <span>{t.label}</span>
            <span class="n">{t.n}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div>

{@render children()}

<style>
  .bar {
    border-bottom: 1px solid var(--rule);
    margin-bottom: 2.5rem;
    background: var(--paper);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.2rem;
    overflow-x: auto;
    scrollbar-width: thin;
  }
  a {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4rem;
    white-space: nowrap;
    padding: 0.9rem 0.8rem 0.75rem;
    min-height: 44px;
    font-family: var(--font-ui);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--muted);
    text-decoration: none;
    border-bottom: 3px solid transparent;
  }
  a:hover {
    color: var(--ink);
    border-bottom-color: var(--rule-strong);
  }
  a[aria-current='page'] {
    color: var(--ink);
    border-bottom-color: var(--ink);
  }
  .n {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 500;
  }
</style>
