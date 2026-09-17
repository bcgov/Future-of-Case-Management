<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { base } from '$app/paths';

  let { children } = $props();

  const nav = [
    { href: '/', label: 'Overview' },
    { href: '/evidence', label: 'Evidence and time' },
    { href: '/contexts', label: 'Boundaries' },
    { href: '/determination', label: 'Determination' },
    { href: '/service', label: 'The service today' },
    { href: '/decisions', label: 'Choices and reasons' }
  ];

  const path = $derived($page.url.pathname.replace(base, '').replace(/\/$/, '') || '/');
  let open = $state(false);
</script>

<a class="skip" href="#main">Skip to content</a>

<header class="masthead">
  <div class="shell bar">
    <a class="mark" href="{base}/" aria-label="The Future of Case Management IT — overview">
      <svg width="22" height="22" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <rect x="2" y="8" width="6" height="6" fill="var(--valid-mid)" />
        <rect x="8" y="2" width="6" height="6" fill="var(--txn-mid)" />
      </svg>
      <span>The Future of Case Management IT</span>
    </a>

    <button
      class="toggle"
      aria-expanded={open}
      aria-controls="nav"
      onclick={() => (open = !open)}
    >
      {open ? 'Close' : 'Menu'}
    </button>

    <nav id="nav" class:open aria-label="Sections">
      <ul>
        {#each nav as item}
          <li>
            <a
              href="{base}{item.href === '/' ? '/' : item.href}"
              aria-current={path === item.href ? 'page' : undefined}
              onclick={() => (open = false)}>{item.label}</a
            >
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header>

<main id="main">
  {@render children()}
</main>

<footer class="foot">
  <div class="shell">
    <p>
      A design proposal for the successor to British Columbia's integrated case management systems,
      covering employment assistance, disability assistance, child care subsidy, employment services
      and child protection.
    </p>
    <p class="fine">
      Figures on this site are drawn from the architecture document and from 326 service-delivery
      procedures. Nothing here is a government commitment.
    </p>
  </div>
</footer>

<style>
  .masthead {
    border-bottom: 1px solid var(--rule);
    background: var(--paper);
    position: sticky;
    top: 0;
    z-index: 20;
  }
  .bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 3.75rem;
    flex-wrap: wrap;
  }
  .mark {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    margin-right: auto;
    letter-spacing: -0.01em;
  }
  .mark:hover span {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  nav ul {
    display: flex;
    gap: 1.15rem;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
  }
  nav a {
    font-family: var(--font-ui);
    font-size: 0.88rem;
    color: var(--muted);
    text-decoration: none;
    /* WCAG 2.2 target size (2.5.8): at least 24px in each dimension. */
    min-height: 28px;
    display: inline-flex;
    align-items: center;
    padding: 0.3rem 0;
    border-bottom: 2px solid transparent;
  }
  nav a:hover {
    color: var(--ink);
    border-bottom-color: var(--rule-strong);
  }
  nav a[aria-current='page'] {
    color: var(--ink);
    font-weight: 600;
    border-bottom-color: var(--ink);
  }

  .toggle {
    display: none;
    background: none;
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius);
    padding: 0.35rem 0.7rem;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .foot {
    margin-top: 6rem;
    border-top: 1px solid var(--rule);
    padding: 2.5rem 0 4rem;
    font-family: var(--font-ui);
    font-size: var(--step--1);
    color: var(--muted);
  }
  .foot p {
    max-width: 58ch;
  }
  .fine {
    color: var(--muted);
  }

  /* The wordmark plus six nav items stop fitting on one line just below
     1020px, so the menu button takes over above that point. */
  @media (max-width: 64rem) {
    .toggle {
      display: inline-block;
    }
    nav {
      display: none;
      width: 100%;
      padding-bottom: 0.9rem;
    }
    nav.open {
      display: block;
    }
    nav ul {
      flex-direction: column;
      gap: 0.1rem;
    }
    nav a {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--rule);
      width: 100%;
    }
  }
</style>
