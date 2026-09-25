<script>
  import Technical from '$lib/components/Technical.svelte';

  const choices = [
    {
      id: 'evidence',
      title: 'Store dated claims, not facts',
      unusual:
        'Most case systems store the current value of a field and log changes separately.',
      why: 'Whether a person owes money back turns on whether the ministry knew something and failed to act. A current value with a change log beside it cannot answer that. The log sits outside the decision path.',
      cost: 'Every read gets harder. Developers have to think in periods rather than values, and every report has to say which point in time it means.'
    },
    {
      id: 'bitemporal',
      title: 'Track two kinds of time, and inherit a third',
      unusual: 'Finance has modelled two kinds of time for decades. Case management almost never does.',
      why: 'A tribunal asks two questions: what was true, and what did the ministry know. Each needs its own axis. The third axis exists because fifteen years of records arrive from a system still in use. Flatten their history into the migration date and a whole class of question stops having an answer.',
      cost: 'More storage, and a real learning curve. Most inherited records will not know their third date, and the system has to say so rather than guess.'
    },
    {
      id: 'split',
      title: 'Five case models rather than one',
      unusual: 'The conventional move is a single configurable case model shared across programs.',
      why: 'A child protection investigation and a child care subsidy renewal share almost nothing. A shared model turns every change into a negotiation. The last programme cut scope rather than reopen one.',
      cost: 'The plumbing gets written five times. That is a real cost, and the design accepts it on purpose.'
    },
    {
      id: 'pure',
      title: 'Decisions read no live data',
      unusual:
        'Teams usually call the rules engine as a service, and it fetches what it needs while it runs.',
      why: 'A decision that reads anything not stored with it cannot be re-run. Re-running is what lets you show a tribunal what happened, rather than piece it together from memory.',
      cost: 'Someone has to gather the facts before the decision runs, and gathering them consistently is a problem of its own.'
    },
    {
      id: 'contract',
      title: 'The interface outlives its implementation',
      unusual:
        'Teams normally treat the translation layer over a legacy system as the lasting asset.',
      why: 'Replacing a system in pieces only works if nobody calling it can tell which piece answered. The published interface is permanent. The translation layer behind it is temporary, and its team answers for winding itself up.',
      cost: 'The published interface has to refuse old vocabulary, even on the days when exposing it would be faster.'
    },
    {
      id: 'notice',
      title: 'Store the letter, not just the decision',
      unusual: 'Most systems treat letters as output rather than as part of the record.',
      why: 'A tribunal asks what the person was told as often as it asks what the system worked out. A decision that re-runs perfectly, next to a letter nobody can rebuild, still misses the question.',
      cost: 'Template versions and content hashes have to survive as long as the decisions that point at them.'
    },
    {
      id: 'disposition',
      title: 'Retention lives on the type, not the storage location',
      unusual: 'Most systems work out how long to keep something from where it sits.',
      why: 'Guessing from location fails the first time a fact appears in two places, which is day one. Attach the classification and the retention rule to the kind of evidence instead. Then destroying records becomes a job you can actually do.',
      cost: 'Every evidence type needs a records ruling before anyone can use it, which puts the records office on the critical path.'
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
      Several decisions here are not what a team would reach for by default. Each one below says
      what it buys and what it costs, so you can disagree with it in particular rather than in
      general.
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
      This architecture rests on every document we could recover about ICM and the work it
      supports. Each claim traces back to a primary source, or the documents confirm it between
      themselves, or the arithmetic gives it. Claims we could not check say so on the page.
    </p>

    <p>
      The design began with the assumptions that ICM rested on, and much of the approach to MIS
      with it. We tested eleven. None came through intact. Two of them:
    </p>

    <figure>
      <div class="falsified">
        <div>
          <h3>System residency is a legal requirement</h3>
          <p class="found">
            No federal or provincial statute says government systems have to sit in Canada. No
            published policy says it either.
          </p>
          <p class="conseq">
            Worries about data sovereignty and trade still point to keeping the systems in Canada,
            and the architecture does that. No formal guidance stands behind the choice.
          </p>
        </div>
        <div>
          <h3>Replacing the existing system has a deadline</h3>
          <p class="found">
            The vendor has committed to support the current platform to at least December 2037, on
            a rolling ten-year basis.
          </p>
          <p class="conseq">
            Nothing outside the programme forces the replacement to finish by a set date. So it can
            do discovery, research and analysis properly before it commits to building at scale. An
            unforced timetable takes a great deal of risk out of the work.
          </p>
        </div>
      </div>
      <figcaption>Two of the eleven assumptions that did not survive testing.</figcaption>
    </figure>

    <h2>What the evidence base is</h2>

    <p>
      Two bodies of source material sit behind this. The first is 57 technical design documents for
      the current release. They cover the application, its integrations, its data conversion and its
      reporting. The second is 326 service-delivery procedures, describing how the work gets done.
    </p>

    <p>
      Reading both matters, because they disagree about what the system is. The technical documents
      describe 61 applications. The procedures turn up 28 more tools that a worker touches and no
      technical document mentions. Among them: a standalone calculator, a reporting tool, credit and
      asset-check portals, a worker-safety device, a vital statistics service.
    </p>

    <Technical summary="What remains unresolved">
      <p>
        The architecture carries 40 open items to verify, and 30 more to settle before the design
        freezes. Three are worth naming here, because they change the shape of the work rather than
        its detail:
      </p>
      <ul>
        <li>
          Whether the rules can move off the mainframe on their own, given that both of them
          calculate.
        </li>
        <li>
          Whether we can settle what the third time axis holds before the first production record
          lands. Nobody can add it afterwards.
        </li>
        <li>
          What service levels the analytical platform can promise. That waits on a storage
          benchmark nobody has run yet.
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
