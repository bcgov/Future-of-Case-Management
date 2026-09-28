<script>
  import { base } from '$app/paths';
  import { terms } from '$lib/glossary.js';
  import { params } from '$lib/components/ParameterSet.svelte';

  // Alphabetical by the word a reader sees, not by slug.
  const entries = Object.entries(terms)
    .map(([slug, t]) => ({
      slug,
      ...t,
      used: params.filter((p) => p.terms.includes(slug))
    }))
    .sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));

  const letters = [...new Set(entries.map((e) => e.term[0].toUpperCase()))];
</script>

<svelte:head>
  <title>Glossary — The Future of Case Management IT</title>
  <meta
    name="description"
    content="Plain explanations of the words used to describe the twenty-one parameters, with links back to each parameter that uses them."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Glossary</h1>
    <p class="lede">
      The parameters use some words that have a particular meaning in this work. This page explains
      each one in plain terms. Where architects have their own name for an idea, it is given in
      brackets, so you can recognise it in other documents.
    </p>

    <nav class="letters" aria-label="Jump to a letter">
      <ul>
        {#each letters as l}
          <li><a href="#letter-{l}">{l}</a></li>
        {/each}
      </ul>
    </nav>

    <dl class="glossary">
      {#each entries as e, i}
        {@const first = i === 0 || entries[i - 1].term[0].toUpperCase() !== e.term[0].toUpperCase()}
        <div class="entry" id={e.slug}>
          <dt>
            {#if first}<span class="anchor" id="letter-{e.term[0].toUpperCase()}"></span>{/if}{e.term}
          </dt>
          <dd>
            <p class="short">{e.short}</p>
            {#each e.body as para}
              <p>{para}</p>
            {/each}
            {#if e.page || e.used.length}
              <p class="links">
                {#if e.page}
                  <span>See it at work: <a href="{base}{e.page.href}">{e.page.label}</a></span>
                {/if}
                {#if e.used.length}
                  <span
                    >Used in:
                    {#each e.used as p, j}<a href="{base}/parameters#{p.id}" aria-label="{p.code}: {p.name}"
                        >{p.code}</a
                      >{j < e.used.length - 1 ? ' · ' : ''}{/each}</span
                  >
                {/if}
              </p>
            {/if}
          </dd>
        </div>
      {/each}
    </dl>
  </div>
</div>

<style>
  .letters ul {
    list-style: none;
    margin: 0 0 2rem;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  .letters a {
    display: inline-block;
    min-width: 28px;
    min-height: 28px;
    line-height: 28px;
    text-align: center;
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: 0.85rem;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    text-decoration: none;
  }
  .letters a:hover {
    border-color: var(--ink);
  }

  .glossary {
    margin: 0;
  }
  .entry {
    border-top: 1px solid var(--rule);
    padding: 1.1rem 0 0.4rem;
    scroll-margin-top: 5rem;
  }
  .anchor {
    scroll-margin-top: 6rem;
  }
  .entry:target {
    border-top: 2px solid var(--ink);
  }
  dt {
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: var(--step-1);
    line-height: 1.3;
  }
  dd {
    margin: 0.4rem 0 0;
  }
  dd p {
    margin: 0 0 0.7rem;
  }
  .short {
    font-weight: 600;
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 1.5rem;
    font-family: var(--font-ui);
    font-size: 0.85rem;
    color: var(--muted);
  }
  .links a {
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }
  .links span:first-child a {
    font-family: var(--font-ui);
    font-size: 0.85rem;
  }
</style>
