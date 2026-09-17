<script>
  import ContextMap from '$lib/components/ContextMap.svelte';
  import Technical from '$lib/components/Technical.svelte';
</script>

<svelte:head>
  <title>Boundaries — The Future of Case Management IT</title>
  <meta
    name="description"
    content="Why the design uses sixteen separate models rather than one, and the rules that keep them separate."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Boundaries</h1>
    <p class="lede">
      The most consequential choice in this design is where to draw lines between parts of the
      system, and then to defend those lines. Twelve domain models, one of which is really five,
      so sixteen in total.
    </p>

    <h2>The argument against a single model</h2>

    <p>
      Programmes like this usually begin by building one model of a case that every program can
      share. It looks like the responsible choice: less duplication, one place to change things,
      consistency across the ministry.
    </p>

    <p>
      What happens next is well documented. A child protection investigation and a child care
      subsidy renewal have almost nothing in common beyond involving a person. Making them share a
      lifecycle means every change to one is negotiated with everyone else. The model becomes
      something nobody can change, and the programme starts removing scope to avoid changing it.
      The previous programme here merged its final two phases and cut child protection scope, for
      exactly this reason.
    </p>

    <p>
      So the design accepts duplication. Five program families get five case models. The plumbing
      is written more than once, and that is cheaper than the alternative.
    </p>

    <h2>What the parts are</h2>

    <figure class="wide">
      <ContextMap />
      <figcaption>
        Select any part to see what it owns, what it deliberately does not own, and the test that
        tells you when the boundary has been breached. The five case models share protocols, not a
        case model.
      </figcaption>
    </figure>

    <h2>Four rules keep the lines in place</h2>

    <p>
      A boundary that exists only in a diagram will not survive delivery pressure. These are written so
      that a reviewer can point at something and say whether it complies.
    </p>

    <ol class="rules">
      <li>
        <h3>Each part can be released on its own</h3>
        <p>
          It has its own storage and its own message topics. If two parts always have to ship
          together, they are one part wearing two names.
        </p>
      </li>
      <li>
        <h3>No part reads another part's database</h3>
        <p>
          No shared tables. No joins across schemas. Not for a report, and not in a test
          environment. This is the rule that erodes first and takes the longest to notice.
        </p>
      </li>
      <li>
        <h3>There are exactly two ways to talk</h3>
        <p>
          A published interface for reads, and published events for notifications. There is no
          third mechanism, and adding one is not a shortcut.
        </p>
      </li>
      <li>
        <h3>Copies are owned by whoever holds them</h3>
        <p>
          A part needing another's data keeps its own copy, built from that part's events, shaped
          the way it needs. When the source corrects something, the copy has to follow.
        </p>
      </li>
    </ol>

    <h2>The thin identity model</h2>

    <p>
      Participant Identity is deliberately small: identifiers, enough detail to tell two people
      apart, and whether identity has been proven. Not addresses, not income, not relationships.
    </p>

    <p>
      This is the part most likely to drift, because every new requirement produces a reason to add
      one more field to the person record. Once that starts, the shared model has been rebuilt in
      the one place the design most needs to stay thin.
    </p>

    <p>
      Merge and split are built in from the first day rather than added later. The previous
      system's audit found duplicate records at scale, with search described as ineffective and
      exact-match only. Retrofitting merge into a system that assumed one person equals one row is
      close to impossible, because by then every payment instruction and every stored decision has
      keyed itself to an identifier the design promised would be stable.
    </p>

    <Technical summary="Published events and the boundary test">
      <p>
        Participant Identity publishes <code>PersonRegistered</code>, <code>IdentityMerged</code>,
        <code>IdentitySplit</code>, <code>IdentifierAdded</code> and
        <code>IdentifierInvalidated</code>. Every other context maintains its own projection
        (Payee, Applicant, Caregiver, Reporter, Appellant, Debtor) keyed by participant identifier.
      </p>
      <p>
        Evidence &amp; Verification publishes <code>EvidenceRecorded</code>,
        <code>EvidenceActivated</code>, <code>EvidenceSuperseded</code>,
        <code>EvidenceVerified</code>, <code>EvidenceInvalidated</code> and
        <code>EvidenceCorrectionRecorded</code>.
      </p>
    </Technical>

    <h2>Parts that are not domain models</h2>

    <p>
      Some pieces are shared infrastructure rather than parts of the business. They are owned by
      platform teams and used by everyone. The distinction matters because a platform part that
      starts holding program state has quietly become a seventeenth domain model without anyone
      chartering it.
    </p>

    <p>
      Two of them are worth naming, because their charters are deliberately opposite. The published
      interface is permanent: it is the contract built to outlive the systems that implement it.
      The translation layer over the existing Siebel system is temporary, and the team that builds
      it is accountable for its own disbandment.
    </p>

    <p class="pull">
      A team accountable for a thing will grow and protect it. A team measured on its own
      dissolution will not.
    </p>
  </div>
</div>

<style>
  .rules {
    list-style: none;
    counter-reset: r;
    padding: 0;
    margin: 1.5rem 0 2rem;
    max-width: 58ch;
  }
  .rules li {
    counter-increment: r;
    display: grid;
    grid-template-columns: 2rem 1fr;
    gap: 0 0.9rem;
    padding: 1rem 0;
    border-top: 1px solid var(--rule);
  }
  .rules li::before {
    content: counter(r);
    font-family: var(--font-ui);
    font-size: var(--step-1);
    font-weight: 700;
    color: var(--muted);
    line-height: 1.1;
  }
  .rules h3 {
    margin: 0 0 0.35rem;
    font-size: var(--step-0);
    grid-column: 2;
  }
  .rules p {
    margin: 0;
    grid-column: 2;
    font-size: var(--step--1);
    line-height: 1.6;
  }

  .pull {
    font-family: var(--font-ui);
    font-size: var(--step-1);
    font-weight: 600;
    line-height: 1.4;
    max-width: 34ch;
    border-left: 3px solid var(--ink);
    padding-left: 1rem;
    margin: 2rem 0;
    letter-spacing: -0.015em;
  }
</style>
