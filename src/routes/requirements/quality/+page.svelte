<script>
  import { base } from '$app/paths';
  import RequirementBrowser from '$lib/components/RequirementBrowser.svelte';
  import data from '$lib/requirements/quality.js';

  const fix = (html) => html.replaceAll('%BASE%', base);
</script>

<svelte:head>
  <title>Quality requirements — The Future of Case Management IT</title>
  <meta name="description" content="The non-functional requirements: performance, availability, scalability, security, compliance, usability, supportability and interoperability." />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Quality requirements</h1>
    <p class="lede">How well the system must work: how fast, how available, how secure, how accessible and how easy to support. Targets come from the architecture or are measured from the running legacy systems.</p>
    {#if data.intro}<div class="intro">{@html fix(data.intro)}</div>{/if}
  </div>

  <div class="wide browse">
    <RequirementBrowser {data} modules={false} />
  </div>
</div>

<style>
  .intro {
    font-size: var(--step--1);
    line-height: 1.6;
  }
  .intro :global(table) {
    font-size: 0.85rem;
  }
  .browse {
    margin-top: 2rem;
  }
</style>
