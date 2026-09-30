<script>
  import { base } from '$app/paths';
  import { common, parts } from '$lib/market.js';

  // Offerings are shown alphabetically by organisation, then product, within
  // each kind, so the order carries no meaning.
  const kinds = [
    { key: 'commercial', label: 'Commercial products' },
    { key: 'open', label: 'Open-source projects' },
    { key: 'government', label: 'Government services' }
  ];
  const byName = (a, b) => a.org.localeCompare(b.org) || a.product.localeCompare(b.product);
  const of = (part, kind) => part.offers.filter((o) => o.kind === kind).sort(byName);
  const link = ([page, id]) => `${base}/requirements/${page}#${id.toLowerCase()}`;
</script>

<svelte:head>
  <title>Components — The Future of Case Management IT</title>
  <meta
    name="description"
    content="The parts that make up the future case management system: what each is for, how it fits the whole, what any product must do, and who offers products for it."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Components</h1>
    <p class="lede">
      The future system is made of a small number of parts. Each has one job, and the parts talk
      to each other only through published contracts. This page describes each part, how it fits
      the whole, what any product would have to do to fill it, and who offers products for it.
    </p>
    <p class="notice">
      This page describes the market. It does not assess, rank or recommend any product or
      supplier. Products are listed alphabetically, inclusion is not an endorsement, and leaving a
      product out is not a judgement. Any choice of product is made through the ministry’s
      procurement process.
    </p>
  </div>

  <section class="wide" aria-labelledby="whole">
    <h2 id="whole">How the parts fit</h2>
    <ol class="stack">
      <li class="layer">
        <span class="role">Where work happens</span>
        <a href="#case-platform">Case management platform</a>
        <span class="with">
          with <a href="#workflow">workflow</a> moving the work and
          <a href="#documents">correspondence</a> sending notices and taking in documents
        </span>
      </li>
      <li class="layer split">
        <span class="role">What the work relies on</span>
        <span class="pair">
          <a href="#rules">Rules engine</a>
          <span class="with">decides eligibility and entitlement</span>
        </span>
        <span class="pair">
          <a href="#identity">Client identity resolution</a>
          <span class="with">keeps one index of clients</span>
        </span>
      </li>
      <li class="layer spine">
        <span class="role">What carries it all</span>
        <a href="#events">Event backbone and event store</a>
        <span class="with">carries every fact and decision between the parts, and keeps the record</span>
      </li>
    </ol>
    <p class="note">
      Facts enter as evidence and are kept on the event backbone. The rules engine turns them
      into determinations. Workflow and the case platform act on those determinations, and
      correspondence tells the client. No part reaches into another part’s data.
    </p>
  </section>

  <section class="wide" aria-labelledby="every">
    <h2 id="every">What every part must do</h2>
    <p class="note">Whatever fills a part, these requirements apply.</p>
    <ul class="needs">
      {#each common as n}
        <li>
          <span>{n.text}</span>
          <span class="refs">
            {#each n.req as r}<a href={link(r)}>{r[1]}</a>{/each}
          </span>
        </li>
      {/each}
    </ul>
  </section>

  <nav class="wide jump" aria-label="Components on this page">
    <ul>
      {#each parts as p}
        <li><a href="#{p.id}">{p.name}</a></li>
      {/each}
    </ul>
  </nav>

  {#each parts as p, i}
    <section class="wide part" id={p.id} aria-labelledby="{p.id}-h">
      <header>
        <span class="num">{i + 1}</span>
        <div>
          <h2 id="{p.id}-h">{p.name}</h2>
          <p class="short">{p.short}</p>
        </div>
      </header>

      <div class="cols">
        <div>
          <h3>What it is for</h3>
          <p>{p.purpose}</p>
          <h3>How it fits the whole</h3>
          <p>{p.whole}</p>
        </div>
        <div>
          <h3>What any product must do</h3>
          <ul class="needs">
            {#each p.needs as n}
              <li>
                <span>{n.text}</span>
                <span class="refs">
                  {#each n.req as r}<a href={link(r)}>{r[1]}</a>{/each}
                </span>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <h3>Who offers products</h3>
      <div class="market">
        {#each kinds as k}
          {@const list = of(p, k.key)}
          {#if list.length}
            <div class="kind">
              <h4>{k.label}</h4>
              <ul>
                {#each list as o}
                  <li>
                    <span class="prod">{o.product}</span>
                    <span class="org">{o.org}</span>
                    <span class="what">{o.what}</span>
                    <span class="offered">{o.offered}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        {/each}
      </div>
    </section>
  {/each}

  <p class="prose source">
    The requirements are in the <a href="{base}/requirements">requirements specification</a>. The
    list of products is the set looked at in the project’s market research, not the whole market.
  </p>
</div>

<style>
  .notice {
    border-left: 4px solid var(--ink);
    padding: 0.6rem 0 0.6rem 1rem;
    font-size: var(--step--1);
  }
  section {
    margin-top: 3.5rem;
    scroll-margin-top: 5rem;
  }
  h2 {
    border-bottom: 2px solid var(--ink);
    padding-bottom: 0.5rem;
  }
  .note {
    max-width: var(--measure);
    font-size: var(--step--1);
    color: var(--muted);
  }
  .stack {
    list-style: none;
    margin: 1.5rem 0 1rem;
    padding: 0;
    display: grid;
    gap: 0.5rem;
    font-family: var(--font-ui);
  }
  .layer {
    display: grid;
    gap: 0.3rem;
    padding: 1rem 1.2rem;
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius);
    background: var(--paper-raised);
  }
  .layer.split {
    grid-template-columns: 1fr 1fr;
    column-gap: 1.5rem;
  }
  .layer.split .role {
    grid-column: 1 / -1;
  }
  .layer.spine {
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
  }
  .layer.spine a,
  .layer.spine .role,
  .layer.spine .with {
    color: var(--paper);
  }
  .role {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .layer a {
    font-weight: 700;
    font-size: var(--step-1);
  }
  .with a {
    font-size: inherit;
    font-weight: 600;
  }
  .pair {
    display: grid;
    gap: 0.2rem;
  }
  .with {
    font-size: var(--step--1);
    color: var(--muted);
  }
  @media (max-width: 40rem) {
    .layer.split {
      grid-template-columns: 1fr;
    }
  }
  .needs {
    list-style: none;
    margin: 1rem 0 0;
    padding: 0;
    display: grid;
    gap: 0.5rem;
  }
  .needs li {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.3rem 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--rule);
    font-size: var(--step--1);
    line-height: 1.5;
  }
  .needs li > span:first-child {
    flex: 1 1 22rem;
  }
  .refs {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
  }
  .jump ul {
    list-style: none;
    margin: 2.5rem 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .jump a {
    display: inline-block;
    padding: 0.5rem 0.8rem;
    min-height: 44px;
    box-sizing: border-box;
    border: 1px solid var(--rule-strong);
    border-radius: 999px;
    font-family: var(--font-ui);
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    color: var(--ink);
  }
  .jump a:hover {
    border-color: var(--ink);
  }
  .part header {
    display: flex;
    gap: 1rem;
    align-items: center;
    border-bottom: 2px solid var(--ink);
    padding-bottom: 0.6rem;
  }
  .part header h2 {
    border: 0;
    padding: 0;
    margin: 0;
  }
  .num {
    display: inline-grid;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    flex: none;
    border-radius: 50%;
    background: var(--ink);
    color: var(--paper);
    font-family: var(--font-ui);
    font-weight: 700;
  }
  .short {
    margin: 0.2rem 0 0;
    font-family: var(--font-ui);
    color: var(--muted);
  }
  .cols {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
    gap: 2rem;
  }
  h3 {
    font-size: var(--step-0);
    font-family: var(--font-ui);
    margin: 1.6rem 0 0.4rem;
  }
  .cols p {
    font-size: var(--step--1);
    line-height: 1.6;
    max-width: var(--measure);
  }
  .market {
    display: grid;
    gap: 1.2rem;
  }
  h4 {
    margin: 0.4rem 0 0.5rem;
    font-family: var(--font-ui);
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .kind ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 0.6rem;
  }
  .kind li {
    display: grid;
    gap: 0.15rem;
    align-content: start;
    padding: 0.8rem 0.9rem;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
    font-size: var(--step--1);
  }
  .prod {
    font-family: var(--font-ui);
    font-weight: 700;
  }
  .org {
    font-family: var(--font-ui);
    font-size: 0.82rem;
    color: var(--muted);
  }
  .what {
    margin-top: 0.3rem;
    line-height: 1.45;
  }
  .offered {
    margin-top: 0.3rem;
    font-family: var(--font-ui);
    font-size: 0.78rem;
    color: var(--muted);
  }
  .source {
    margin-top: 3rem;
    font-family: var(--font-ui);
    font-size: var(--step--1);
  }
</style>
