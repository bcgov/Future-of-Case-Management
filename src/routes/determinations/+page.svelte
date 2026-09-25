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
      Someone can challenge a decision about their entitlement years after the ministry made it. So
      the design treats every decision as something you re-run, not something you remember.
    </p>

    <h2>The problem with asking a system what it decided</h2>

    <p>
      Ask a typical case management system why a person got a particular amount in March 2022 and
      it will work the sum again. It uses today's rules, today's data and today's software, then
      reports the answer with confidence. The answer may well be right. Nobody can tell, and nobody
      can show a tribunal the difference.
    </p>

    <p>
      Three things have shifted underneath since March 2022. Policy changed. The person's recorded
      circumstances changed, perhaps several times. And someone upgraded the software. A rules
      engine upgrade can change how the same rule reads, and nobody notices until a client
      appeals.
    </p>

    <h2>Treating a decision as a function</h2>

    <p>
      The design makes entitlement a calculation with no hidden inputs. It reads the rules, the
      facts and the date it is deciding for. While it runs it does not read the clock, query a
      database, or call another service. It gets everything it needs up front.
    </p>

    <p>
      That rule sounds academic. It is what makes the next part work: if nothing hidden went in,
      then storing what went in is enough to reproduce what came out.
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
        engine gives you this on its own. The shell around the engine enforces it. The engine runs
        in-process against a snapshot passed by value, and that is what puts byte-identical replay
        within reach rather than in the brochure.
      </p>
    </Technical>

    <h2>Five things stored with every decision</h2>

    <p>
      Storing the answer is not enough. Storing the answer and the rules is still not enough. The
      system binds five artefacts into the record at the moment it makes the decision.
    </p>

    <figure class="wide">
      <ReplayArtefacts />
      <figcaption>
        Switch any artefact off to see which question stops being answerable. Each one covers a
        failure the other four do not.
      </figcaption>
    </figure>

    <p>
      Teams leave out the fifth one most often. A decision that reproduces perfectly, next to a
      letter nobody can rebuild, still misses the question the tribunal asked. That question is
      often about what the person was told, not about what the system worked out.
    </p>

    <h2>How long replay has to work</h2>

    <p>
      Archiving the software tells you what it was. It does not promise that anything in twenty
      years can still run it. The operating system, the processor and the container runtime all die
      younger than a child protection record, which the ministry keeps for ninety years.
    </p>

    <p>
      Rather than leave that hanging, the design commits to a horizon in three stages and writes it
      down in advance.
    </p>

    <figure>
      <ol class="horizon">
        <li>
          <span class="yr">Years 0&ndash;7</span>
          <p>
            We archive the software itself and test it every quarter to confirm it still runs.
            Seven years covers the appeal, reconsideration and audit paths that really do re-run a
            decision.
          </p>
        </li>
        <li>
          <span class="yr">Years 7&ndash;20</span>
          <p>
            The rules live on as a written specification, with a test suite that any rebuild has to
            pass. The suite stays independent of the engine from day one, so this handover costs
            nothing when it comes.
          </p>
        </li>
        <li>
          <span class="yr">Beyond 20 years</span>
          <p>
            The stored reasoning, the letter and the facts are the record. Re-running stops being
            on offer. This is what a paper file has always been.
          </p>
        </li>
      </ol>
      <figcaption>
        The three stages run in order, which is why they are numbered. The last one holds up
        because the ministry declared it in advance, rather than discovering it during a
        hearing.
      </figcaption>
    </figure>

    <h2>Two decisions made moments apart can disagree</h2>

    <p>
      Storing the inputs makes replay reliable. It says nothing about whether the inputs were
      gathered consistently. That is where the remaining gap sits.
    </p>

    <p>
      Gathering the facts means reading across several stores that update on their own schedules.
      Two decisions issued seconds apart, with one store briefly behind, can each see a different
      world quite legitimately. Both replay perfectly. Both are reproducible. They disagree, and
      nothing described so far catches it. So the design pins each snapshot to a point in the
      sequence of recorded events. A later reader can then tell which view of the world a decision
      was made against.
    </p>

    <h2>Decisions that affect people carry their own classification</h2>

    <p>
      Every rule carries a label saying what kind of decision it produces. Some produce an
      administrative decision, which needs reasons. Some produce a decision a person has to make
      before it takes effect. The rest are working sums that affect nobody on their own.
    </p>

    <p>
      That label travels with the decision into the letter. A decision that goes against someone
      sends out its reasons, its appeal period and the route to challenge it, because the label
      says it must. Not because somebody remembered.
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
