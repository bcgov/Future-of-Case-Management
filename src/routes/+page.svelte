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
      Four months of payments were correct when they were made, and are now an underpayment: four
      months a client went without money they turn out to have been entitled to. The current system
      keeps only today's answer, rewriting history rather than recording it. What did we know, when
      did we know it, and how can that be proven? The design on these pages keeps all three.
    </p>
    <p class="gloss">* Persons With Disability</p>

    <figure class="wide">
      <BitemporalPlane />
      <figcaption>
        Move either slider. The left one changes the month you are asking <em>about</em>. The right
        one changes the month you are asking <em>in</em>. The hard horizontal edge is the July
        decision reaching back over every month before it, which is what a retroactive determination
        looks like when both axes are kept.
      </figcaption>
    </figure>
  </div>
</section>

<div class="shell">
  <div class="prose">
    <h2>Current State</h2>

    <p>
      Case management covers a wide range of services across the Ministries of Children and Family
      Development and Social Development and Poverty Reduction. Assistance payments, service
      requests, social work, loss recovery and client support all depend on a worker having the full
      context in front of them. The work is life-critical: a wrong answer means someone might not eat
      this month, or a child misses a check-in.
    </p>

    <p>
      Two systems do the work: an Oracle Siebel customer relationship management application adapted
      for government, and a mainframe dating from 1982. They run in parallel and together administer
      the core programs. Every attempt to retire the mainframe has been abandoned or has failed.
    </p>

    <h2>The New Design is Built on Three Pillars</h2>

    <div class="triad">
      <article>
        <h3>Evidence, not 'facts'</h3>
        <p>
          The system will not store "this person is an adult." It stores, "on 14 July, AI Agent ID-33422 read the uploaded 
          image of identification and determined the identity to match the case and the date of birth to be April 22, 1988. 
          Business rules determine they're an adult."
          Who or what decided, when, and <em>on what basis</em> are part of the record, rather than
          sitting in an attached PDF or outside the system altogether.
        </p>
        <p><a href="{base}/evidence">Evidence</a></p>
      </article>

      <article>
        <h3>Apt boundaries</h3>
        <p>
          Two ministries with broad mandates carry a very diverse portfolio. The current system forces
          all of it into one rigid model, which is how a design becomes brittle. Each program family
          gets its own model instead.
        </p>
        <p><a href="{base}/domains">Domains</a></p>
      </article>

      <article>
        <h3>A decision you can re-run</h3>
        <p>
          Every entitlement decision stores the rules, the engine, the facts it saw, its own
          reasoning and outcomes. Four days later for a manager or years later at a tribunal, the decision can
          be replayed rather than reconstructed from memory.
        </p>
        <p><a href="{base}/determinations">Determinations</a></p>
      </article>
    </div>

    <h2>Why do backdates matter?</h2>

    <p>
      Case management is largely the work of building a consistent timeline as information arrives.
      It does not arrive in order, and what turns up later can change what earlier events meant. In
      the retroactive designation above, the client spent four months short of what they were owed,
      and someone on assistance has no reserve to absorb that. The same machinery runs in the other
      direction, and lands on the same person, who has to pay the overage back.
    </p>

    <p>
      When someone is paid more than they were entitled to, the money is treated one of two ways.
      If the client's circumstances changed and they reported it late, it is a recoverable
      overpayment, and the ministry takes it back at $10 a month out of a payment that was already
      only just enough. If the ministry already held the information and did not act on it, that is
      administrative error, and the client should not be the one carrying it.
    </p>

    <p>
      Telling those apart requires knowing <strong>when the ministry knew</strong>. That is a
      transaction-time question. A system that records only when a fact was true, or that stamps
      every migrated record with the date it was migrated, cannot answer it. The existing
      overpayment backlog sits almost entirely in records from before any cutover.
    </p>

    <p>
      Mispayment is one example of many. Nearly every claim a client makes has to be corroborated by
      evidence, and that cycle of claim, evidence and substantiation is the core loop of how
      assistance is administered.
    </p>

    <Technical summary="How this is modelled">
      <p>
        Every evidence assertion carries three time dimensions: <code>valid_time</code> (the period
        in the world for which the fact holds), <code>recorded_at</code> (when this system learned
        it), and <code>legacy_asserted_at</code> (when the predecessor system asserted it, where
        that can be decoded from the legacy record).
      </p>
      <p>
        The third axis is nullable and carries a confidence enumeration of
        <code>DECODED</code>, <code>INFERRED</code> or <code>UNKNOWN</code>. On
        <code>UNKNOWN</code>, any consumer computing a knowledge-state answer must return
        <code>INDETERMINATE</code> rather than silently substituting the migration timestamp.
      </p>
      <p>
        None of this can be added later. Events are immutable, so a field can be added with a
        default but cannot be populated retroactively. The axis has to exist before the first
        production event is written.
      </p>
    </Technical>

    <h2>What this site covers</h2>

    <p>
      These pages set out the domain model and the reasoning behind the least conventional choices.
      Each carries a plain English explanation, with the technical statement behind a disclosure.
    </p>

    <p>
      <a href="{base}/current-state">Current State</a> is worth reading first if you do not know ICM
      and MIS, because the design makes most sense against what it replaces.
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
