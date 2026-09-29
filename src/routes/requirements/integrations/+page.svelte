<script>
  import { base } from '$app/paths';
  import RequirementBrowser from '$lib/components/RequirementBrowser.svelte';
  import data from '$lib/requirements/integrations.js';

  const fix = (html) => html.replaceAll('%BASE%', base);
</script>

<svelte:head>
  <title>Integration requirements — The Future of Case Management IT</title>
  <meta name="description" content="The twenty-five outside systems the new system must exchange information with, and the terms of each exchange." />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Integrations</h1>
    <p class="lede">Every outside system the new system must exchange information with: what flows each way, how it is protected, and what happens when it fails.</p>
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
