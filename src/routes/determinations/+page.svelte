<script>
  import ReplayArtefacts from '$lib/components/ReplayArtefacts.svelte';
  import Technical from '$lib/components/Technical.svelte';
</script>

<svelte:head>
  <title>Determinations — The Future of Case Management IT</title>
  <meta
    name="description"
    content="Why an entitlement decision is treated as a function that can be re-run years later."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Determinations</h1>
    <p class="lede">
      A decision about someone's entitlement may be challenged years after it was made. The design
      treats every decision as something that can be re-run rather than remembered.
    </p>

    <h2>The problem with asking a system what it decided</h2>

    <p>
      Ask a typical case management system why a person received a particular amount in March 2022
      and it will recalculate. It will use today's rules, today's data and today's software, and
      report the answer with confidence. That answer may be right. There is no way to tell, and no
      way to show a tribunal the difference.
    </p>

    <p>
      Three things have moved underneath since March 2022. Policy changed. The person's recorded
      circumstances changed, possibly several times. The software itself was upgraded, and a rules
      engine upgrade can alter how the same rule evaluates without anyone noticing until someone
      appeals.
    </p>

    <h2>Treating a decision as a function</h2>

    <p>
      The design makes entitlement a calculation with no hidden inputs. It reads the rules, the
      facts and the date it is deciding for. It does not read the clock, does not query a database,
      and does not call another service while it runs. Everything it needs is handed to it.
    </p>

    <p>
      That constraint sounds academic. It is what makes the next part possible: if nothing hidden
      went in, then storing what went in is enough to reproduce what came out.
    </p>

    <Technical summary="The function signature">
      <p>
        <code
          >Determine(rulesArtefactVersion, evidenceSnapshot, referenceDate) →
          DeterminationResult</code
        >
      </p>
      <p>
        Pure: no input or output, no clock reads, no database access, no service calls. No rules
        engine provides this on its own; it is enforced by the shell around the engine. The engine
        evaluates in-process against a snapshot passed by value, which is what makes byte-identical
        replay achievable rather than aspirational.
      </p>
    </Technical>

    <h2>Five things stored with every decision</h2>

    <p>
      Storing the answer is not enough, and storing the answer plus the rules is still not enough.
      Five artefacts are bound into the record at the moment the decision is made.
    </p>

    <figure class="wide">
      <ReplayArtefacts />
      <figcaption>
        Switch any artefact off to see which question stops being answerable. Each one covers a
        failure the other four do not.
      </figcaption>
    </figure>

    <p>
      The fifth is the one most often left out. A determination that reproduces perfectly, paired
      with a letter nobody can reconstruct, does not answer the question a tribunal actually put,
      which is frequently about what the person was told rather than what the system computed.
    </p>

    <h2>How long replay has to work</h2>

    <p>
      Archiving the software guarantees you can identify it. It does not guarantee that anything in
      twenty years can run it. The operating system, the processor architecture and the container
      runtime all have shorter lives than a child protection record, which is retained for ninety
      years.
    </p>

    <p>
      Rather than leave that unresolved, the design commits to a horizon in three stages and writes
      it down in advance.
    </p>

    <figure>
      <ol class="horizon">
        <li>
          <span class="yr">Years 0&ndash;7</span>
          <p>
            The software itself is archived and tested quarterly to confirm it still runs. Seven
            years covers the appeal, reconsideration and audit paths that actually re-execute.
          </p>
        </li>
        <li>
          <span class="yr">Years 7&ndash;20</span>
          <p>
            The rules are maintained as a written specification, with a test suite that any
            re-implementation must reproduce. The suite is kept independent of the engine from the
            first day, so this transition costs nothing when it arrives.
          </p>
        </li>
        <li>
          <span class="yr">Beyond 20 years</span>
          <p>
            The stored reasoning, the letter and the facts are the record, and re-running is no
            longer offered. This is what a paper file has always been.
          </p>
        </li>
      </ol>
      <figcaption>
        The three stages are a real sequence, which is why they are numbered. The last is
        defensible because it was declared in advance rather than discovered during a hearing.
      </figcaption>
    </figure>

    <h2>Two decisions made moments apart can disagree</h2>

    <p>
      Storing the inputs makes replay reliable. It says nothing about whether the inputs were
      gathered consistently, and that is where the remaining gap sits.
    </p>

    <p>
      Assembling the facts means reading across several stores that update independently. Two
      decisions issued seconds apart, where one store is briefly behind, can legitimately see
      different worlds. Both replay perfectly. Both are reproducible. They disagree, and nothing
      described so far detects it. The design pins each snapshot to a point in the sequence of
      recorded events, so a later reader can tell which view of the world a decision was made
      against.
    </p>

    <h2>Decisions that affect people carry their own classification</h2>

    <p>
      Every rule is labelled with what kind of decision it produces: an administrative decision
      that requires reasons, a decision that a person must make before it takes effect, or an
      intermediate calculation that affects nobody on its own.
    </p>

    <p>
      That label travels with the decision into the letter. An adverse determination emits its
      reasons, its appeal period and the route to challenge it because the classification says it
      must, not because somebody remembered.
    </p>
  </div>
</div>

<style>
  .horizon {
    list-style: none;
    counter-reset: h;
    margin: 0;
    padding: 0;
    max-width: 58ch;
  }
  .horizon li {
    counter-increment: h;
    display: grid;
    grid-template-columns: 8.5rem 1fr;
    gap: 0 1rem;
    padding: 1rem 0;
    border-top: 1px solid var(--rule);
    align-items: start;
  }
  .horizon li:last-child {
    border-bottom: 1px solid var(--rule);
  }
  .yr {
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--txn);
  }
  .horizon p {
    margin: 0;
    font-size: var(--step--1);
    line-height: 1.6;
  }
  @media (max-width: 34rem) {
    .horizon li {
      grid-template-columns: 1fr;
      gap: 0.3rem;
    }
  }
</style>
