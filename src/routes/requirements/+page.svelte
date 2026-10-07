<script>
  import { base } from '$app/paths';
  import summary from '$lib/requirements/summary.js';

  const blurb = {
    business: 'What the ministry needs the new system to achieve, and how success is measured.',
    functional: 'What the system must do, from a first application to an appeal and from a report about a child to an adoption order, grouped by capability.',
    quality: 'How well it must do it: availability, recovery, security, privacy, accessibility and more.',
    integrations: 'Every outside system it must exchange information with, and on what terms.',
    data: 'How facts are recorded, kept, destroyed and moved from the legacy systems.'
  };
  const order = ['Must', 'Should', 'Could', "Won't"];

  const modules = [
    'Foundations',
    'Read access and client index',
    'Notices and correspondence',
    'Documents and capture',
    'Work management',
    'Decisions and rules',
    'Payments and recovery',
    'Reconsideration and appeal',
    'Employment and disability assistance',
    'Child protection'
  ];
  const peak = Math.max(...summary.modules.map((m) => m.count));

  const ladder = [
    {
      tier: 'Legislation',
      what: 'The Employment and Assistance Acts and their regulations, privacy, records and human rights law. For children and families: the Child, Family and Community Service Act, the Adoption Act and the federal Act on Indigenous children, youth and families.',
      standing: 'Overrides everything else.'
    },
    {
      tier: 'Policy',
      what: 'The BCEA Policy and Procedure Manual: 126 pages, 270 obligations, 297 rules, 138 time limits. For children and families: the policy chapters, standards and practice directives of the Ministry of Children and Family Development.',
      standing: 'Overrides every procedure, job aid and spreadsheet.'
    },
    {
      tier: 'Practice',
      what: 'Procedures, job aids and spreadsheets that show how the work is done today.',
      standing: 'Evidence of current practice. Never the authority for a requirement.'
    }
  ];
</script>

<svelte:head>
  <title>Requirements — The Future of Case Management IT</title>
  <meta
    name="description"
    content="The requirements for the system that replaces ICM and MIS: what it must do, how well, what it connects to, and where the trade-offs are."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Requirements</h1>
    <p class="lede">
      These are the requirements for the system that replaces ICM and MIS. Each one says what the
      system must do, how to check it, and which law, policy or design parameter it comes from.
    </p>
  </div>

  <ul class="stats wide" aria-label="The requirements in numbers">
    <li>
      <span class="big">{summary.total}</span>
      <span class="what">requirements across five categories</span>
    </li>
    <li>
      <span class="big">{summary.obligations}<small>/270</small></span>
      <span class="what">policy obligations traced to a requirement</span>
    </li>
    {#if summary.cfdProvisions}
      <li>
        <span class="big">{summary.cfdProvisions.toLocaleString('en-CA')}</span>
        <span class="what">provisions of children and family law and policy read, each with a recorded outcome</span>
      </li>
    {/if}
    <li>
      <span class="big">{summary.parameters}<small>/21</small></span>
      <span class="what">design parameters carried by at least one requirement</span>
    </li>
    <li>
      <span class="big">{summary.conflicts}</span>
      <span class="what">trade-offs set out, {summary.openConflicts} still waiting on a ministry ruling</span>
    </li>
  </ul>

  <div class="prose">
    <h2>Where the requirements come from</h2>
    <p>
      Sources are ranked, and the ranking settles any conflict between them. Where a procedure says
      one thing and policy says another, the requirement follows policy and the procedure is
      recorded as a defect for the ministry to fix.
    </p>
  </div>

  <ol class="ladder wide">
    {#each ladder as l, i}
      <li style="--i: {i}">
        <span class="tier">{l.tier}</span>
        <span class="what">{l.what}</span>
        <span class="standing">{l.standing}</span>
      </li>
    {/each}
  </ol>

  <div class="prose">
    <h2>What they cover</h2>
    <p>
      Each category has its own page. Every requirement opens to show its description, the checks
      that prove it is met, and the reasons it exists.
    </p>
  </div>

  <ul class="tiles wide">
    {#each summary.categories as c}
      <li>
        <a href="{base}/requirements/{c.key}">
          <span class="count">{c.count}</span>
          <span class="label">{c.label}</span>
          <span class="blurb">{blurb[c.key]}</span>
          <span class="bar" aria-hidden="true">
            {#each order as p}
              {#if c.priorities[p]}
                <span class="seg {p === "Won't" ? 'wont' : p.toLowerCase()}" style="flex: {c.priorities[p]}"></span>
              {/if}
            {/each}
          </span>
          <span class="legend">
            {order
              .filter((p) => c.priorities[p])
              .map((p) => `${c.priorities[p]} ${p.toLowerCase()}`)
              .join(' · ')}
          </span>
        </a>
      </li>
    {/each}
  </ul>

  <div class="prose">
    <h2>When they are needed</h2>
    <p>
      The architecture delivers the system in ten modules, each in use before the next is funded.
      This chart counts the functional requirements by the module in which each is first needed.
      The foundations module carries the most, because some things cannot be added once the first
      record, rule or payment exists.
    </p>
  </div>

  <figure class="wide">
    <ol class="modules">
      {#each summary.modules as m}
        <li>
          <span class="col" aria-hidden="true">
            <span class="fill" style="height: {(m.count / peak) * 100}%; --w: {(m.count / peak) * 100}%"></span>
          </span>
          <span class="num">{m.count}</span>
          <span class="code">M{m.module}</span>
          <span class="name">{modules[m.module]}</span>
        </li>
      {/each}
    </ol>
    <figcaption>
      Functional requirements by the module in which each is first needed. A requirement needed
      across several modules is counted in the first.
    </figcaption>
  </figure>

  <div class="prose">
    <h2>How each requirement is written</h2>
    <ul class="rules">
      <li>
        <strong>It can be checked.</strong> Every requirement carries acceptance criteria written as
        "given, when, then", so a tester can say whether it passes.
      </li>
      <li>
        <strong>It says where it comes from.</strong> Each one lists the policy obligations it meets
        and the design parameters that test it, and links to them.
      </li>
      <li>
        <strong>It holds no dollar amounts or day counts.</strong> Those change, so they live once in
        the rules register with their policy source and effective date. A requirement names the rule;
        the register holds the value.
      </li>
      <li>
        <strong>It does not copy today's system.</strong> Where the current system calculates
        something other than what policy states, the requirement follows policy.
      </li>
    </ul>

    <h2>What is still open</h2>
    <p>
      Some requirements depend on decisions nobody has made yet: rulings on conflicts inside policy,
      the records schedules, and several architecture decisions. The
      <a href="{base}/requirements/trade-offs">trade-offs page</a> sets out each conflict, how it was
      resolved or who must resolve it, and the dependencies and risks that go with them.
    </p>
    <p>
      The requirements for children and family services were added in version 1.6. Each was written
      from the passage of law or policy it rests on. Nobody at the ministry has reviewed them yet.
      Those for mental health, integrated teams and youth justice are marked conditional, because
      nobody has decided whether the new system covers that work.
    </p>
    <p class="source">
      Source: requirements specification, version {summary.version}, a draft. Words with a special
      meaning link to the <a href="{base}/glossary">glossary</a>.
    </p>
  </div>
</div>

<style>
  .stats {
    list-style: none;
    margin: 2.5rem 0 1rem;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .stats li {
    background: var(--paper-raised);
    padding: 1.3rem 1.2rem 1.2rem;
    display: grid;
    gap: 0.4rem;
    align-content: start;
  }
  .big {
    font-family: var(--font-ui);
    font-size: var(--step-5);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
  }
  .big small {
    font-size: 0.4em;
    font-weight: 600;
    color: var(--muted);
    margin-left: 0.15em;
    letter-spacing: 0;
  }
  .stats .what {
    font-family: var(--font-ui);
    font-size: 0.88rem;
    line-height: 1.4;
    color: var(--muted);
  }

  .ladder {
    list-style: none;
    margin: 1.5rem 0 1rem;
    padding: 0;
    display: grid;
    gap: 0.5rem;
  }
  .ladder li {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.25rem 1.5rem;
    padding: 1rem 1.2rem;
    margin-left: calc(var(--i) * 1.5rem);
    border-left: 6px solid var(--ink);
    border-top: 1px solid var(--rule);
    border-right: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    background: var(--paper-raised);
    border-radius: 0 var(--radius) var(--radius) 0;
  }
  .ladder li:nth-child(2) {
    border-left-color: color-mix(in srgb, var(--ink) 60%, var(--paper));
  }
  .ladder li:nth-child(3) {
    border-left-color: color-mix(in srgb, var(--ink) 25%, var(--paper));
  }
  @media (min-width: 52rem) {
    .ladder li {
      grid-template-columns: 9rem 1fr 16rem;
      align-items: baseline;
    }
  }
  .tier {
    font-family: var(--font-ui);
    font-weight: 700;
    font-size: var(--step-0);
  }
  .ladder .what {
    font-size: var(--step--1);
    line-height: 1.5;
  }
  .standing {
    font-family: var(--font-ui);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--muted);
  }

  .tiles {
    list-style: none;
    margin: 1.5rem 0 1rem;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
    gap: 0.8rem;
  }
  .tiles a {
    display: grid;
    gap: 0.45rem;
    height: 100%;
    padding: 1.2rem 1.2rem 1rem;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
    text-decoration: none;
    color: var(--ink);
    transition: border-color 120ms ease, transform 120ms ease;
  }
  .tiles a:hover {
    border-color: var(--ink);
    transform: translateY(-2px);
  }
  .count {
    font-family: var(--font-ui);
    font-size: var(--step-4);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
  }
  .label {
    font-family: var(--font-ui);
    font-size: var(--step-1);
    font-weight: 600;
  }
  .blurb {
    font-size: var(--step--1);
    line-height: 1.5;
    color: var(--muted);
  }
  .bar {
    display: flex;
    gap: 2px;
    height: 0.55rem;
    margin-top: 0.4rem;
    border-radius: 999px;
    overflow: hidden;
  }
  .seg.must {
    background: var(--ink);
  }
  .seg.should {
    background: color-mix(in srgb, var(--ink) 45%, var(--paper));
  }
  .seg.could {
    background: color-mix(in srgb, var(--ink) 20%, var(--paper));
  }
  .seg.wont {
    background: repeating-linear-gradient(
      45deg,
      var(--rule-strong) 0 3px,
      transparent 3px 6px
    );
  }
  .legend {
    font-family: var(--font-ui);
    font-size: 0.78rem;
    color: var(--muted);
  }

  .modules {
    list-style: none;
    margin: 0;
    padding: 1.2rem 1rem 1rem;
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    gap: 0.5rem;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
  }
  .modules li {
    display: grid;
    grid-template-rows: 10rem auto auto auto;
    gap: 0.3rem;
    text-align: center;
    min-width: 0;
  }
  .col {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-bottom: 1px solid var(--rule-strong);
  }
  .fill {
    width: 70%;
    background: var(--ink);
    border-radius: 3px 3px 0 0;
    min-height: 2px;
  }
  .num {
    font-family: var(--font-ui);
    font-weight: 700;
    font-size: var(--step-0);
  }
  .code {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
  }
  .modules .name {
    font-family: var(--font-ui);
    font-size: 0.7rem;
    line-height: 1.3;
    color: var(--muted);
    overflow-wrap: anywhere;
  }
  @media (max-width: 40rem) {
    .modules {
      grid-template-columns: 1fr;
    }
    .modules li {
      grid-template-columns: 3rem 1fr 2.5rem;
      grid-template-rows: auto auto;
      text-align: left;
      align-items: center;
    }
    .col {
      grid-column: 2;
      grid-row: 1;
      height: 0.8rem;
      justify-content: flex-start;
      border: 0;
      align-items: stretch;
    }
    .fill {
      height: 100% !important;
      width: var(--w, 0);
      border-radius: 0 3px 3px 0;
    }
    .num {
      grid-column: 3;
      grid-row: 1;
    }
    .code {
      grid-column: 1;
      grid-row: 1;
    }
    .modules .name {
      grid-column: 2 / 4;
      grid-row: 2;
    }
  }

  .rules {
    padding-left: 1.2rem;
  }
  .rules li {
    margin-bottom: 0.7rem;
  }
  .source {
    font-family: var(--font-ui);
    font-size: var(--step--1);
    color: var(--muted);
    margin-top: 2rem;
  }
</style>
