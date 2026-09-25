<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import SignIn from '$lib/components/SignIn.svelte';
  import { enabled as gateOn, session, signIn, signOut, complete } from '$lib/sso';

  let { children } = $props();

  // The page is prerendered with its content in place, so `locked` starts
  // false and the curtain is drawn after hydration. app.html hides the
  // content before first paint so the copy is not flashed on the way.
  let locked = $state(false);
  let who = $state(null);
  let busy = $state(false);
  let gateError = $state('');

  function settle() {
    who = session();
    locked = gateOn && !who;
    // app.html hid the prerendered content before paint; hydration owns it now.
    document.documentElement.removeAttribute('data-prelock');
  }

  onMount(async () => {
    if (!gateOn) return;
    settle();
    try {
      const returnTo = await complete();
      settle();
      if (returnTo) await goto(returnTo, { replaceState: true });
    } catch (e) {
      gateError = e instanceof Error ? e.message : String(e);
      settle();
    }
  });

  async function startSignIn() {
    busy = true;
    gateError = '';
    try {
      await signIn($page.url.pathname);
    } catch (e) {
      gateError = e instanceof Error ? e.message : String(e);
      busy = false;
    }
  }

  const nav = [
    { href: '/', label: 'Overview' },
    { href: '/current-state', label: 'Current State' },
    { href: '/evidence', label: 'Evidence' },
    { href: '/domains', label: 'Domains' },
    { href: '/determinations', label: 'Determinations' },  
    { href: '/parameters', label: 'Parameters' },
    { href: '/choices', label: 'Choices' }
  ];

  const path = $derived($page.url.pathname.replace(base, '').replace(/\/$/, '') || '/');
  let open = $state(false);
</script>

<svelte:head>
  {#if gateOn}<meta name="sso-gate" content="on" />{/if}
</svelte:head>

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

    {#if !locked}
    <button
      class="toggle"
      aria-expanded={open}
      aria-controls="nav"
      onclick={() => (open = !open)}
    >
      {open ? 'Close' : 'Menu'}
    </button>
    {/if}

    {#if !locked}
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
    {:else if who}
      <p class="who">Signed in as {who.name} <button class="out" onclick={signOut}>Sign out</button></p>
    {/if}
  </div>
</header>

<main id="main">
  {#if locked}
    <SignIn onSignIn={startSignIn} {busy} error={gateError} />
  {:else}
    {@render children()}
  {/if}
</main>

<footer class="foot">
  <div class="draft" role="note">DRAFT</div>
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
  /* Corner ribbon. Fixed to the viewport so it stays legible while reading,
     and inert so it never intercepts a click on the content beneath it. */
  .draft {
    position: fixed;
    right: -2.9rem;
    bottom: 3.1rem;
    z-index: 40;
    transform: rotate(-45deg);
    transform-origin: center;
    margin: 0;
    padding: 0.25rem 3.5rem;
    background: var(--ink);
    color: var(--paper);
    font-family: var(--font-ui);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-align: center;
    pointer-events: none;
    box-shadow: 0 1px 6px rgb(0 0 0 / 0.25);
  }
  @media print {
    .draft {
      position: absolute;
      top: 0;
    }
  }

  .who {
    font-family: var(--font-ui);
    font-size: var(--step--1);
    color: var(--muted);
    margin: 0;
    display: flex;
    gap: 0.6rem;
    align-items: center;
  }
  .out {
    font: inherit;
    color: inherit;
    background: none;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    min-height: 24px;
    padding: 0.15rem 0.5rem;
    cursor: pointer;
  }
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

  /* The wordmark plus seven nav items stop fitting on one line just below
     1150px, so the menu button takes over above that point. */
  @media (max-width: 72rem) {
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
