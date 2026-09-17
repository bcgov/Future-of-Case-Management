<script>
  import Technical from '$lib/components/Technical.svelte';

  const choices = [
    {
      id: 'evidence',
      title: 'Store dated claims, not facts',
      unusual:
        'Most case systems store the current value of a field and log changes separately.',
      why: 'Whether a person owes money back depends on whether the ministry knew something and failed to act. A current value with a change log beside it cannot answer that reliably, because the log is not part of the decision path.',
      cost: 'Every read is more complex. Developers have to think in periods rather than values, and reporting has to specify which point in time it means.'
    },
    {
      id: 'bitemporal',
      title: 'Track two kinds of time, and inherit a third',
      unusual: 'Bitemporal modelling is well established in finance and rare in case management.',
      why: 'The two questions a tribunal asks are what was true and what the ministry knew. They need separate axes. The third axis exists only because fifteen years of records arrive from a system that is still running, and collapsing their history into the migration date would make an entire class of question unanswerable.',
      cost: 'More storage, and a real learning curve. The third axis will be unknown in most inherited records, and the system has to say so rather than guess.'
    },
    {
      id: 'split',
      title: 'Five case models rather than one',
      unusual: 'The conventional move is a single configurable case model shared across programs.',
      why: 'A child protection investigation and a child care subsidy renewal share almost nothing. A shared model makes every change a negotiation, and the previous programme cut scope rather than change one.',
      cost: 'Plumbing gets written five times. This is a real cost and it is accepted deliberately.'
    },
    {
      id: 'pure',
      title: 'Decisions read no live data',
      unusual:
        'Rules engines are usually called as a service that fetches what it needs while it runs.',
      why: 'If a decision reads anything not stored with it, it cannot be reproduced. Reproduction is the difference between showing a tribunal what happened and reconstructing it from memory.',
      cost: 'The facts have to be assembled before the decision runs, and assembling them consistently is its own problem.'
    },
    {
      id: 'contract',
      title: 'The interface outlives its implementation',
      unusual:
        'Translation layers over a legacy system are normally treated as the durable asset.',
      why: 'Replacing a system in pieces only works if consumers are insulated from which piece is answering. The published interface is permanent; the translation layer behind it is temporary and its team is accountable for disbanding.',
      cost: 'It requires refusing legacy vocabulary in the published interface even when exposing it would be faster.'
    },
    {
      id: 'notice',
      title: 'Store the letter, not just the decision',
      unusual: 'Correspondence is usually treated as output rather than part of the record.',
      why: 'A tribunal asks what the person was told as often as it asks what was computed. A determination that reproduces perfectly alongside an unreconstructable letter does not answer the question.',
      cost: 'Template versions and content hashes have to be retained for as long as the decisions that reference them.'
    },
    {
      id: 'disposition',
      title: 'Retention lives on the type, not the storage location',
      unusual: 'Retention is commonly inferred from where something is stored.',
      why: 'Inference from location fails the first time a fact appears in two places, which is the first day. Attaching classification and retention to the kind of evidence makes disposition tractable.',
      cost: 'Every evidence type needs a records determination before it can be used, which puts the records office on the critical path.'
    }
  ];

  let open = $state('evidence');
</script>

<svelte:head>
  <title>Choices — The Future of Case Management IT</title>
  <meta
    name="description"
    content="The least conventional decisions in the design, what each is for, and what it costs."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Choices</h1>
    <p class="lede">
      Several decisions here are not what a team would reach for by default. Each is set out with
      what it buys and what it costs, so that a reader can disagree with it specifically.
    </p>

    <div class="choices">
      {#each choices as c, i}
        <article class="choice">
          <h2>
            <button
              aria-expanded={open === c.id}
              aria-controls="c-{c.id}"
              onclick={() => (open = open === c.id ? '' : c.id)}
            >
              <span class="idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span>{c.title}</span>
              <span class="chev" aria-hidden="true">{open === c.id ? '–' : '+'}</span>
            </button>
          </h2>
          <div id="c-{c.id}" class="body" hidden={open !== c.id}>
            <dl>
              <dt>Why it is unusual</dt>
              <dd>{c.unusual}</dd>
              <dt>What it is for</dt>
              <dd>{c.why}</dd>
              <dt>What it costs</dt>
              <dd>{c.cost}</dd>
            </dl>
          </div>
        </article>
      {/each}
    </div>

    <h2>How the design was arrived at</h2>

    <p>
      The architecture document marks every claim with how well it is supported: verified against a
      primary source, internally confirmed but not publicly checkable, derived by arithmetic from
      marked inputs, or unverified. Unverified claims carry an owner and a date by which someone
      must resolve them.
    </p>

    <p>
      That convention produced a section most architecture documents do not have: a list of things
      the authors believed at the outset and then disproved. Eleven assumptions were tested and
      failed. Two examples.
    </p>

    <figure>
      <div class="falsified">
        <div>
          <h3>System residency is a legal requirement</h3>
          <p class="found">
            Neither the federal nor the provincial statute book requires systems to be located in
            Canada for government applications, and no published policy stipulating it could be
            found.
          </p>
          <p class="conseq">
            The design still keeps systems in Canada, because cloud policy independently requires
            Canadian data centres. What changed is the stated reason, which is now policy rather
            than law.
          </p>
        </div>
        <div>
          <h3>Replacing the existing system has a deadline</h3>
          <p class="found">
            Vendor support for the current platform is committed through at least December 2037, on
            a rolling ten-year basis.
          </p>
          <p class="conseq">
            Nothing external forces the replacement to finish. Anything that does has to be built
            into how the programme is run, which is why the design says so plainly rather than
            assuming urgency.
          </p>
        </div>
      </div>
      <figcaption>
        Two of eleven assumptions that did not survive testing. Recording them makes the design
        reviewable; an architecture whose failed premises are invisible cannot be checked.
      </figcaption>
    </figure>

    <h2>What the evidence base is</h2>

    <p>
      Two bodies of source material sit behind this. The technical design documents for the current
      release of the existing system, 57 of them, describing the application, its integrations,
      its data conversion and its reporting. And the 326 service-delivery procedures describing how
      the work is done.
    </p>

    <p>
      Reading both matters, because they disagree about what the system is. The technical documents
      describe 61 applications. The procedures reveal 28 further tools that a worker actually
      touches and that appear in no technical document: a standalone calculator, a reporting tool,
      credit and asset-check portals, a worker-safety device, a vital statistics service.
    </p>

    <Technical summary="What remains unresolved">
      <p>
        The architecture carries 40 open verification items and 30 items that must be resolved
        before the design is frozen. Three are worth naming here because they change the shape of
        the work rather than its detail:
      </p>
      <ul>
        <li>
          Whether the rules can be migrated independently of the mainframe, given that both
          calculate.
        </li>
        <li>
          Whether the decision on what the third time axis holds can be made before the first
          production record is written. It cannot be added afterwards.
        </li>
        <li>
          What service levels the analytical platform can commit to, which depends on a storage
          benchmark that has not yet been run.
        </li>
      </ul>
    </Technical>
  </div>
</div>

<style>
  .choices {
    margin: 2rem 0 3rem;
    max-width: 58ch;
    border-top: 1px solid var(--rule);
  }
  .choice {
    border-bottom: 1px solid var(--rule);
  }
  .choice h2 {
    margin: 0;
    font-size: var(--step-0);
  }
  .choice button {
    display: grid;
    grid-template-columns: 2.4rem 1fr 1.5rem;
    align-items: baseline;
    gap: 0.6rem;
    width: 100%;
    text-align: left;
    background: none;
    border: 0;
    padding: 1rem 0;
    cursor: pointer;
    font-family: var(--font-ui);
    font-size: var(--step-0);
    font-weight: 600;
    letter-spacing: -0.015em;
  }
  .choice button:hover span:nth-child(2) {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  .idx {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }
  .chev {
    font-size: 1.2rem;
    color: var(--muted);
    text-align: right;
    line-height: 1;
  }
  .body {
    padding: 0 0 1.2rem 3rem;
  }
  .body dl {
    margin: 0;
  }
  .body dt {
    font-family: var(--font-ui);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted);
    margin-top: 0.9rem;
  }
  .body dt:first-child {
    margin-top: 0;
  }
  .body dd {
    margin: 0.2rem 0 0;
    font-size: var(--step--1);
    line-height: 1.62;
  }

  .falsified {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
    gap: 2rem;
  }
  .falsified > div {
    border-top: 2px solid var(--valid);
    padding-top: 0.8rem;
  }
  .falsified h3 {
    margin: 0 0 0.6rem;
    font-size: var(--step-0);
  }
  .falsified p {
    font-size: var(--step--1);
    line-height: 1.6;
    margin: 0 0 0.7rem;
  }
  .conseq {
    color: var(--muted);
    margin-bottom: 0;
  }

  @media (max-width: 34rem) {
    .body {
      padding-left: 0;
    }
  }
</style>
