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
      Four months of payments were correct when they were made, and are now an underpayment. This triggers additional work, overrides, reviews. Our current system keeps only the second, rewriting history rather than recording it.
      What did we know, how can it be proven, and when? The future captures all of it, rather than ignoring it.
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
    <h2>What this system does</h2>

    <p>
      It decides whether a person gets assistance, how much, and when the money arrives. It carries
      employment assistance, disability assistance, child care subsidy, employment services and
      child protection. A wrong answer means someone does not eat this month, or a child protection
      worker cannot see a record they need.
    </p>

    <p>
      The systems doing this work today are an Oracle Siebel application and a mainframe that
      predates it. They run alongside each other, and both calculate. A previous programme spent
      $182 million replacing them and finished with roughly a third of the older systems retired.
    </p>

    <h2>Three ideas hold the design together</h2>

    <div class="triad">
      <article>
        <h3>Evidence, not facts</h3>
        <p>
          The system does not store "this person is designated". It stores "on 14 July, an
          adjudicator designated this person, effective from 2 March". Who decided, when, and on
          what basis are part of the record rather than metadata attached to it.
        </p>
        <p><a href="{base}/evidence">How evidence and time work</a></p>
      </article>

      <article>
        <h3>Separate models, not one</h3>
        <p>
          A child protection investigation and a child care subsidy renewal have almost nothing in
          common. Forcing them into a shared model is how case management programmes acquire a
          design nobody can change. Each of the five program families gets its own.
        </p>
        <p><a href="{base}/contexts">Where the boundaries fall</a></p>
      </article>

      <article>
        <h3>A decision you can re-run</h3>
        <p>
          Every entitlement decision stores the rules, the engine, the facts it saw, its own
          reasoning and the letter that was sent. Four years later at a tribunal, the decision can
          be replayed rather than reconstructed from memory.
        </p>
        <p><a href="{base}/determination">How determination works</a></p>
      </article>
    </div>

    <h2>Why the two dates matter so much</h2>

    <p>
      The retroactive designation above is the gentle version, because the money is owed to the
      client. The same machinery runs in the other direction, and there the stakes are higher.
    </p>

    <p>
      When someone is paid more than they were entitled to, the money is treated one of two ways.
      If the client's circumstances changed and they reported it late, it is a recoverable
      overpayment and the ministry takes it back at $10 a month. If the ministry already held the
      information and did not act on it, that is administrative error, and the position is
      different.
    </p>

    <p>
      Telling those apart requires knowing <strong>when the ministry knew</strong>. That is a
      transaction-time question. A system that records only when a fact was true, or that stamps
      every migrated record with the date it was migrated, cannot answer it. The existing
      overpayment backlog sits almost entirely in records from before any cutover.
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
      The pages that follow set out the domain model and the reasoning behind the choices that are
      least conventional. Plain English comes first on every page. Where a technical statement adds
      precision, it sits behind a disclosure you can open.
    </p>

    <p>
      <a href="{base}/service">The service today</a> is worth reading before the design pages. The
      architecture answers problems that are visible in how the work is actually done, and those
      problems are measurable.
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
