<script>
  import ContextMap from '$lib/components/ContextMap.svelte';
  import Technical from '$lib/components/Technical.svelte';
</script>

<svelte:head>
  <title>Domains — The Future of Case Management IT</title>
  <meta
    name="description"
    content="Why the design uses sixteen separate models rather than one, and the rules that keep them separate."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Domains</h1>
    <p class="lede">
      Perhaps the biggest choice in this design is where to draw the lines between parts of the
      system. Twelve domain models, one of which is really five sub-domains, which makes sixteen.
    </p>

    <h2>The problem of a single model</h2>

    <p>
      Programmes like this usually start by building one model of a case that every program can
      share. That is how MIS began, and how ICM began. It looks like the responsible choice: less
      duplication, one place to change things, one way of working across the ministry.
    </p>

    <p>
      What happens next is well documented. A child protection investigation and a child care
      subsidy renewal have almost nothing in common beyond involving a person. Make them share a
      lifecycle and every change to one has to be negotiated with everyone else. Multiply that over
      dozens of programs and nobody can change the model at all. So teams bolt on sub-entities,
      extend them, and add more ways to integrate. The system turns into a plate of spaghetti. You
      cannot change anything in one place, and any failure reaches everywhere. This is not
      hypothetical. ICM merged its final two phases and cut child protection scope for exactly this
      reason.
    </p>

    <p>
      This design takes the difference seriously. Five program families get five case models. The
      plumbing is written more than once, and that is cheaper than the alternative.
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
      A boundary that lives only in a diagram will not survive delivery pressure. These four are
      written so a reviewer can point at something and say whether it complies.
    </p>

    <ol class="rules">
      <li>
        <h3>Each part can be released on its own</h3>
        <p>
          It has its own storage and its own message topics. If two parts always ship together,
          they are one part wearing two names.
        </p>
      </li>
      <li>
        <h3>No part reads another part's database</h3>
        <p>
          No shared tables. No joins across schemas. Not for a report, and not in a test
          environment. This rule erodes first, and takes the longest to notice.
        </p>
      </li>
      <li>
        <h3>There are exactly two ways to talk</h3>
        <p>
          A published interface for reads, and published events for notices. There is no third
          way, and adding one is not a shortcut.
        </p>
      </li>
      <li>
        <h3>Copies are owned by whoever holds them</h3>
        <p>
          A part that needs another's data keeps its own copy, built from that part's events and
          shaped the way it needs. When the source corrects something, the copy has to follow.
        </p>
      </li>
    </ol>

    <h2>The thin identity model</h2>

    <p>
      Participant Identity stays deliberately small. It holds identifiers, enough detail to tell
      two people apart, and whether anyone has proven the identity. No addresses, no income, no
      relationships.
    </p>

    <p>
      This part is the most likely to drift, because every new requirement brings a reason to add
      one more field to the person record. Once that starts, the shared model is back, in the one
      place the design most needs to stay thin.
    </p>

    <p>
      Merge and split go in on day one rather than later. The audit of the previous system found
      duplicate records at scale, and called its search ineffective and exact-match only. Adding
      merge afterwards to a system that assumed one person equals one row is close to impossible. By
      then every payment instruction and every stored decision has keyed itself to an identifier the
      design promised would hold still.
    </p>

    <Technical summary="Published events and the boundary test">
      <p>
        Participant Identity publishes <code>PersonRegistered</code>, <code>IdentityMerged</code>,
        <code>IdentitySplit</code>, <code>IdentifierAdded</code> and
        <code>IdentifierInvalidated</code>. Every other context keeps its own projection (Payee,
        Applicant, Caregiver, Reporter, Appellant, Debtor), keyed by participant identifier.
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
      Some pieces are shared infrastructure rather than parts of the business. Platform teams own
      them and everyone uses them. The difference matters. A platform part that starts holding
      program state has quietly become a seventeenth domain model, and nobody chartered it.
    </p>

    <p>
      Two of them are worth naming, because their charters point in opposite directions on purpose.
      The published interface is permanent: it is the contract built to outlive whatever implements
      it. The translation layer over the existing Siebel system is temporary, and the team that
      builds it answers for winding itself up.
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
