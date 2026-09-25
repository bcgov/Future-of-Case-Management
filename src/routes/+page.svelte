<script>
  import BitemporalPlane from '$lib/components/BitemporalPlane.svelte';
  import Technical from '$lib/components/Technical.svelte';
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>The Future of Case Management IT</title>
  <meta
    name="description"
    content="A design proposal for the successor to British Columbia's integrated case management systems, explained in plain English."
  />
</svelte:head>

<section class="hero">
  <div class="shell">
    <h1>A PWD* designation granted in July.<br />It takes effect from March.</h1>
    <p class="lede">
      Four months of payments were right when the ministry made them. They are now an underpayment:
      four months a client went without money they turn out to have been owed. The current system
      keeps only today's answer. It rewrites history instead of recording it. What did we know, when
      did we know it, and how do we prove it? This design keeps all three.
    </p>
    <p class="gloss">* Persons With Disability</p>

    <figure class="wide">
      <BitemporalPlane />
      <figcaption>
        Move either slider. The left one changes the month you ask <em>about</em>. The right one
        changes the month you ask <em>in</em>. The hard edge across the grid is the July decision
        reaching back over every earlier month. That is what a backdated decision looks like when
        the system keeps both axes.
      </figcaption>
    </figure>
  </div>
</section>

<div class="shell">
  <div class="prose">
    <h2>Current State</h2>

    <p>
      Two ministries run case management: Children and Family Development, and Social Development
      and Poverty Reduction. The work covers assistance payments, service requests, social work,
      loss recovery and client support. All of it depends on a worker seeing the full picture. The
      work is life-critical. A wrong answer means someone might not eat this month, or a child
      misses a check-in.
    </p>

    <p>
      Two systems do the work. One is an Oracle Siebel customer relationship management product,
      adapted for government. The other is a mainframe built in 1982. They run side by side and
      share the core programs between them. Every attempt to retire the mainframe has stalled or
      failed.
    </p>

    <h2>The New Design is Built on Three Pillars</h2>

    <div class="triad">
      <article>
        <h3>Evidence, not 'facts'</h3>
        <p>
          The system will not store "this person is an adult." It stores this: on 14 July, AI agent
          ID-33422 read the uploaded image of identification, matched it to the case, and read the
          date of birth as 22 April 1988. Business rules then decide the person is an adult. Who or
          what decided, when, and <em>on what basis</em> all sit in the record. They do not sit in
          an attached PDF, or outside the system altogether.
        </p>
        <p><a href="{base}/evidence">Evidence</a></p>
      </article>

      <article>
        <h3>Apt boundaries</h3>
        <p>
          Two ministries with broad mandates carry a very mixed portfolio. The current system forces
          all of it into one rigid model. That is how a design turns brittle. Here each program
          family gets its own model.
        </p>
        <p><a href="{base}/domains">Domains</a></p>
      </article>

      <article>
        <h3>A decision you can re-run</h3>
        <p>
          Every entitlement decision stores the rules, the engine, the facts it saw, its own
          reasoning and what it decided. A manager four days later, or a tribunal years later, can
          re-run it instead of piecing it together from memory.
        </p>
        <p><a href="{base}/determinations">Determinations</a></p>
      </article>
    </div>

    <h2>Why do backdates matter?</h2>

    <p>
      Much of case management is building one clear timeline as information arrives. It does not
      arrive in order, and what turns up later can change what earlier events meant. In the
      backdated designation above, the client spent four months short of what they were owed.
      Someone on assistance has no savings to absorb that. The same machinery runs the other way
      too. It lands on the same person, who then has to pay the money back.
    </p>

    <p>
      When someone is paid too much, the money falls into one of two classes. If the client's
      circumstances changed and they told the ministry late, it is a recoverable overpayment. The
      ministry takes it back at $10 a month, out of a payment that was already only just enough. If
      the ministry held the information all along and did not act on it, that is administrative
      error, and the client should not carry it.
    </p>

    <p>
      Telling those two apart means knowing <strong>when the ministry knew</strong>. That is a
      transaction-time question. A system that records only when a fact was true cannot answer it.
      Nor can one that stamps every moved record with the date it moved. Almost the whole
      overpayment backlog sits in records from before any cutover.
    </p>

    <p>
      Mispayment is one example of many. Evidence has to back nearly every claim a client makes.
      That cycle of claim, evidence and proof is the core loop of the whole service.
    </p>

    <Technical summary="How this is modelled">
      <p>
        Every evidence assertion carries three time dimensions: <code>valid_time</code> (the period
        in the world for which the fact holds), <code>recorded_at</code> (when this system learned
        it), and <code>legacy_asserted_at</code> (when the old system asserted it, where the old
        record still shows that).
      </p>
      <p>
        The third axis is nullable. It carries a confidence value of <code>DECODED</code>,
        <code>INFERRED</code> or <code>UNKNOWN</code>. On <code>UNKNOWN</code>, any consumer working
        out a knowledge-state answer must return <code>INDETERMINATE</code>. It must not quietly
        substitute the migration timestamp.
      </p>
      <p>
        None of this can be added later. Events are immutable: you can add a field with a default,
        but you cannot fill it in afterwards. The axis has to exist before the first production
        event.
      </p>
    </Technical>

    <h2>What this site covers</h2>

    <p>
      These pages set out the domain model, and the thinking behind the least conventional choices.
      Each one leads in plain English and keeps the technical statement behind a disclosure.
    </p>

    <p>
      Read <a href="{base}/current-state">Current State</a> first if you do not know ICM and MIS.
      The design makes most sense against what it replaces.
      <a href="{base}/parameters">Parameters</a> lists the twenty-one rules the design has to hold
      to, each with the check that catches a breach.
    </p>
  </div>
</div>

<style>
  .hero {
    padding: clamp(1.5rem, 4vw, 2.75rem) 0 0.5rem;
  }
  .hero h1 {
    max-width: 22ch;
    margin-bottom: 0.75rem;
  }
  .hero .lede {
    margin-bottom: 0.9rem;
    color: var(--muted);
  }
  .gloss {
    font-family: var(--font-ui);
    font-size: var(--step--1);
    color: var(--muted);
    margin: 0 0 1.9rem;
  }
  .hero figure {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .triad {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 2rem 2.5rem;
    max-width: 62rem;
    margin: 2rem 0 1rem;
  }
  .triad article {
    border-top: 2px solid var(--ink);
    padding-top: 0.9rem;
  }
  .triad h3 {
    margin-top: 0;
    font-size: var(--step-0);
  }
  .triad p {
    font-size: var(--step--1);
    line-height: 1.6;
  }
  .triad p:last-child {
    margin-bottom: 0;
    font-family: var(--font-ui);
  }

  @media (min-width: 60rem) {
    .hero h1 {
      font-size: clamp(2.3rem, 4.2vw, 3.2rem);
    }
  }
</style>
