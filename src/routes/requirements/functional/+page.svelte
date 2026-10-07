<script>
  import { base } from '$app/paths';
  import RequirementBrowser from '$lib/components/RequirementBrowser.svelte';
  import data from '$lib/requirements/functional.js';

  const fix = (html) => html.replaceAll('%BASE%', base);
</script>

<svelte:head>
  <title>Functional requirements — The Future of Case Management IT</title>
  <meta name="description" content="The functional requirements, grouped by capability: decisions, evidence, payments and appeals, then children and family services from a report about a child to adoption." />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Functional requirements</h1>
    <p class="lede">What the system must do. Groups A to P follow a client's matter through the ministry. Groups CF1 to CF18 follow a child's or a family's, and were written from the law and policy of the Ministry of Children and Family Development. Each requirement lists the provisions it meets and the checks that prove it.</p>
    {#if data.intro}<div class="intro">{@html fix(data.intro)}</div>{/if}
  </div>

  <div class="wide browse">
    <RequirementBrowser {data} modules={true} />
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
