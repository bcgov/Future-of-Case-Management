<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { goto, afterNavigate } from '$app/navigation';
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

  // Groups follow the order a newcomer reads in. An item may carry its own
  // `children` when a page grows sub-pages; the drawer nests them.
  const nav = [
    { items: [{ href: '/', label: 'Overview' }] },
    { label: 'Where we are', items: [{ href: '/current-state', label: 'Current State' }] },
    {
      label: 'The design',
      items: [
        { href: '/evidence', label: 'Evidence' },
        { href: '/domains', label: 'Domains' },
        { href: '/determinations', label: 'Determinations' }
      ]
    },
    {
      label: 'The rules',
      items: [
        { href: '/parameters', label: 'Parameters' },
        { href: '/choices', label: 'Choices' }
      ]
    },
    { label: 'Reference', items: [{ href: '/glossary', label: 'Glossary' }] }
  ];

  const path = $derived($page.url.pathname.replace(base, '').replace(/\/$/, '') || '/');

  // A modal <dialog> gives the drawer focus containment, Escape to close and
  // an inert page behind it without any hand-rolled trapping.
  let drawer = $state();
  let open = $state(false);
  function openDrawer() {
    drawer.showModal();
  }
  // Track the `open` attribute rather than the close event, so the button's
  // state follows every way the dialog can close: Escape, backdrop, a link.
  $effect(() => {
    if (!drawer) return;
    const watch = new MutationObserver(() => (open = drawer.open));
    watch.observe(drawer, { attributes: true, attributeFilter: ['open'] });
    return () => watch.disconnect();
  });
  function closeDrawer() {
    drawer?.close();
  }
  // A click on the backdrop lands on the dialog element itself.
  function onBackdrop(e) {
    if (e.target === drawer) closeDrawer();
  }
  afterNavigate(closeDrawer);
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
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls="drawer"
      onclick={openDrawer}
    >
      Menu
    </button>
    {:else if who}
      <p class="who">Signed in as {who.name} <button class="out" onclick={signOut}>Sign out</button></p>
    {/if}
  </div>
</header>

{#snippet links(items)}
  <ul>
    {#each items as item}
      <li>
        <a
          href="{base}{item.href === '/' ? '/' : item.href}"
          aria-current={path === item.href ? 'page' : undefined}
          onclick={closeDrawer}>{item.label}</a
        >
        {#if item.children}{@render links(item.children)}{/if}
      </li>
    {/each}
  </ul>
{/snippet}

{#if !locked}
<dialog
  id="drawer"
  class="drawer"
  bind:this={drawer}
  aria-labelledby="drawer-title"
  onclick={onBackdrop}
>
  <div class="drawer-head">
    <h2 id="drawer-title">Contents</h2>
    <button class="toggle" onclick={closeDrawer}>Close</button>
  </div>
  <nav aria-label="Sections">
    {#each nav as group, i}
      <section class="group" aria-labelledby={group.label ? `nav-group-${i}` : undefined}>
        {#if group.label}<h3 id="nav-group-{i}">{group.label}</h3>{/if}
        {@render links(group.items)}
      </section>
    {/each}
  </nav>
</dialog>
{/if}

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

  .toggle {
    font-family: var(--font-ui);
    font-size: 0.85rem;
    color: var(--ink);
    background: none;
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius);
    min-height: 32px;
    padding: 0.35rem 0.8rem;
    cursor: pointer;
  }
  .toggle:hover {
    border-color: var(--ink);
  }

  /* The drawer slides in from the right, over the page. */
  .drawer {
    position: fixed;
    inset: 0 0 0 auto;
    margin: 0;
    width: min(22rem, 88vw);
    max-width: none;
    height: 100dvh;
    max-height: none;
    padding: 0 1.5rem 2rem;
    overflow-y: auto;
    border: 0;
    border-left: 1px solid var(--rule);
    background: var(--paper);
    color: var(--ink);
    box-shadow: -8px 0 24px rgb(0 0 0 / 0.18);
  }
  .drawer[open] {
    animation: slide-in 180ms ease-out;
  }
  .drawer::backdrop {
    background: rgb(0 0 0 / 0.35);
  }
  @keyframes slide-in {
    from {
      transform: translateX(100%);
    }
  }
  .drawer-head {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 3.75rem;
    background: var(--paper);
    border-bottom: 1px solid var(--rule);
    margin-bottom: 1rem;
  }
  .drawer-head h2 {
    margin: 0;
    font-family: var(--font-ui);
    font-size: 0.95rem;
    font-weight: 600;
  }
  .group + .group {
    margin-top: 1.25rem;
  }
  .group h3 {
    margin: 0 0 0.3rem;
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .drawer ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .drawer ul ul {
    margin-left: 0.9rem;
    border-left: 1px solid var(--rule);
    padding-left: 0.6rem;
  }
  .drawer a {
    display: flex;
    align-items: center;
    /* WCAG 2.2 target size (2.5.8): at least 24px in each dimension. */
    min-height: 36px;
    padding: 0.3rem 0.6rem;
    margin-left: -0.6rem;
    border-left: 3px solid transparent;
    font-family: var(--font-ui);
    font-size: 0.95rem;
    color: var(--ink);
    text-decoration: none;
  }
  .drawer a:hover {
    background: var(--paper-raised);
    border-left-color: var(--rule-strong);
  }
  .drawer a[aria-current='page'] {
    font-weight: 600;
    border-left-color: var(--ink);
    background: var(--paper-raised);
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

</style>
