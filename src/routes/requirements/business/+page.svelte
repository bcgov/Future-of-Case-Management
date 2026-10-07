<script>
  import { base } from '$app/paths';
  import RequirementBrowser from '$lib/components/RequirementBrowser.svelte';
  import data from '$lib/requirements/business.js';

  const fix = (html) => html.replaceAll('%BASE%', base);
</script>

<svelte:head>
  <title>Business requirements — The Future of Case Management IT</title>
  <meta name="description" content="The outcomes the new system must deliver for the two ministries, with how success is measured and what delivers each one." />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Business requirements</h1>
    <p class="lede">Fourteen outcomes the new system must deliver. Each says why it matters, how success is measured, and which functional and quality requirements deliver it.</p>
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
