<script>
  import EvidenceOperations from '$lib/components/EvidenceOperations.svelte';
  import Technical from '$lib/components/Technical.svelte';
</script>

<svelte:head>
  <title>Evidence — The Future of Case Management IT</title>
  <meta
    name="description"
    content="Why the system records dated claims rather than facts, and why it tracks two kinds of time."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Evidence</h1>
    <p class="lede">
      ICM tracks facts. It overwrites fields and buries history. In the new system the unit of
      information is a dated <em>claim</em>, tied to its evidence and to whoever made it. Later work
      can disprove that claim, confirm it, overturn it or replace it, and nothing is lost on the
      way.
    </p>

    <h2>Why not store facts?</h2>

    <p>
      A system that stores only the current state, "Income: $900", leaves the important questions
      open. How do we know? What evidence is there? When did we know? Is this the corrected number,
      or the number we recorded at the time?
    </p>

    <p>
      Front-line staff adapt, so the information is not <em>lost</em>. It is just not modelled. It
      goes into notes, forms and attachments, and only a thin slice of it is ever held as data.
    </p>

    <p>
      This is not an auditing nicety. It closes the gap between how the system holds data and how
      front-line staff work. Substantiating evidence against claims is the most common task a worker
      performs, and the system does not model it at all, so it is done by hand. Social workers spend
      hours mapping their notes onto a structure that serves the software rather than their
      clients.
    </p>

    <p>So the unit of storage is an assertion:</p>

    <figure>
      <div class="assertion">
        <div class="row">
          <span class="f">what</span>
          <span class="v">household composition: couple</span>
        </div>
        <div class="row">
          <span class="f">about whom</span><span class="v">participant 4471-A</span>
        </div>
        <div class="row">
          <span class="f k-valid">true for</span><span class="v">from 1 January, open-ended</span>
        </div>
        <div class="row">
          <span class="f k-txn">learned on</span><span class="v">12 September</span>
        </div>
        <div class="row"><span class="f">from</span><span class="v">eligibility review finding</span></div>
        <div class="row"><span class="f">verified</span><span class="v">tenancy agreement, 14 September</span></div>
      </div>
      <figcaption>
        One evidence assertion, from a case where the dates are in dispute. The ministry now says
        the household was a couple from January. It reached that view in September. In between it
        paid eight months at the single rate. Which of those two dates you read decides what
        happens next.
      </figcaption>
    </figure>

    <h2>The four things that can happen to an assertion</h2>

    <p>
      Once the system records something, nobody edits it in place. Four operations change what the
      system believes. They differ in one respect: what each does to the period the claim covers.
    </p>

    <figure class="wide">
      <EvidenceOperations />
      <figcaption>
        Select an operation. Supersede and Correct both replace an earlier claim, but only Correct
        says the earlier claim was wrong about its own period. That is what separates a
        recoverable debt from the ministry's own error.
      </figcaption>
    </figure>

    <p>
      That distinction is why the model exists. It is a policy rule written into the shape of the
      data. It applies consistently because the record itself names the operation that caused the
      recalculation. Nobody has to guess at it afterwards.
    </p>

    <p>
      The operation feeds the classification without settling it. Who caused the error matters too.
      A client who hid a relationship is not in the same position as a worker who mis-keyed a
      figure. The model promises something narrower and more useful: the question has an answer at
      all, and the answer comes from the record rather than from whoever opens the file today.
    </p>

    <h2>Where a conventional record gives up</h2>

    <p>
      Take the assertion above to a tribunal. The client accepts a relationship exists but disputes
      that it began in January. Three separate things are now in question, and they are easy to
      confuse:
    </p>

    <ul class="three">
      <li>What the ministry believed about the household in each of those eight months.</li>
      <li>When the ministry changed its mind, and on what evidence.</li>
      <li>What start date the ministry now asserts.</li>
    </ul>

    <p>
      A conventional design holds one relationship start date, plus an audit entry saying a worker
      changed it on 12 September. That answers the third question, gestures at the second, and
      cannot touch the first. It leaves the eight monthly payments looking like errors. Each one was
      the right answer to what the ministry knew at the time.
    </p>

    <Technical summary="The operations, formally">
      <table>
        <thead>
          <tr>
            <th scope="col">Operation</th>
            <th scope="col">Valid time</th>
            <th scope="col">Transaction time</th>
            <th scope="col">Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>RecordEvidence</code></td>
            <td>asserted period</td>
            <td>now</td>
            <td>We learned a new fact</td>
          </tr>
          <tr>
            <td><code>SupersedeEvidence</code></td>
            <td>new period</td>
            <td>now</td>
            <td>The world changed</td>
          </tr>
          <tr>
            <td><code>CorrectEvidence</code></td>
            <td>same period</td>
            <td>now</td>
            <td>We were wrong about the world</td>
          </tr>
          <tr>
            <td><code>InvalidateEvidence</code></td>
            <td>closed</td>
            <td>now</td>
            <td>The assertion should never have existed</td>
          </tr>
        </tbody>
      </table>
      <p>
        The aggregate is the evidence succession set: the stream of versions of one logical fact
        about one subject. Commands append events; current state is a projection. Verification
        status transitions are themselves events.
      </p>
    </Technical>

    <h2>The third date, and the history problem</h2>

    <p>
      Two time axes are standard. This design carries a third, because the new system inherits
      fifteen years of records from systems that are still running.
    </p>

    <p>
      Old records all arrive on the same day. Make that migration date the "when we learned it"
      date and every historical fact looks as though it arrived at the same moment. Supersede and
      Correct then look identical across the whole pre-cutover record. The overpayment rule stops
      working on exactly the records where most overpayments sit.
    </p>

    <p>
      The third axis holds the date the <em>old</em> system asserted the fact, where the old record
      still shows it. Often it cannot be read at all, so the date carries a confidence marker. Where
      the answer is unknown, the system says so rather than guessing.
    </p>

    <figure>
      <div class="axes3">
        <div class="ax">
          <span class="k-valid">valid time</span>
          <p>The period in the world for which the fact holds.</p>
          <p class="src">Set by whoever asserts it, from the source.</p>
        </div>
        <div class="ax">
          <span class="k-txn">transaction time</span>
          <p>When this system learned it.</p>
          <p class="src">Set at recording. Never changes.</p>
        </div>
        <div class="ax third">
          <span class="k-third">legacy assertion time</span>
          <p>When the previous system asserted it, if that can be decoded.</p>
          <p class="src">Set at migration. Often unknown, and marked as such.</p>
        </div>
      </div>
      <figcaption>
        Three dates on every assertion. The third can be empty, and the design treats an unknown
        value as unknown rather than swapping in the migration date.
      </figcaption>
    </figure>

    <p>
      Nobody can add this later. Events are immutable: you can introduce a field with a default,
      but you cannot fill it in afterwards. Either the migration decoded the source or it did not.
      So the decision has to come before the first production record.
    </p>

    <Technical summary="Confidence values and replay behaviour">
      <p>
        <code>legacy_asserted_at</code> travels with
        <code>legacy_assertion_confidence</code>, which takes <code>DECODED</code> (read straight
        from the legacy record or audit trail), <code>INFERRED</code> (worked out from a related
        artefact by a written rule) or <code>UNKNOWN</code>.
      </p>
      <p>
        On <code>UNKNOWN</code>, any consumer working out a knowledge-state answer must return
        <code>INDETERMINATE</code>. That covers the overpayment rule, a tribunal reconstruction
        view and a disclosure history. Projections that answer only valid-time questions ignore the
        field.
      </p>
      <p>
        Backdated recalculation runs off valid time, which any competent migration preserves, so
        recalculation survives. Something narrower breaks without the third axis: what the ministry
        knew and when. That is the question separating a recoverable debt from the ministry's own
        error.
      </p>
    </Technical>

  </div>
</div>

<style>
  .assertion {
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
    overflow: hidden;
  }
  .row {
    display: grid;
    grid-template-columns: 9.5rem 1fr;
    gap: 1rem;
    padding: 0.6rem 1rem;
    border-bottom: 1px solid var(--rule);
    align-items: baseline;
  }
  .row:last-child {
    border-bottom: 0;
  }
  .f {
    font-family: var(--font-ui);
    font-size: 0.8rem;
    color: var(--muted);
    justify-self: start;
  }
  .v {
    font-family: var(--font-mono);
    font-size: 0.85rem;
  }

  .axes3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1.5rem;
  }
  .ax {
    border-top: 2px solid var(--rule-strong);
    padding-top: 0.8rem;
  }
  .ax p {
    font-size: var(--step--1);
    margin: 0.6rem 0 0;
    line-height: 1.55;
  }
  .ax .src {
    color: var(--muted);
    font-family: var(--font-ui);
  }
  .ax.third {
    border-top-style: dashed;
  }
  .k-third {
    font-family: var(--font-ui);
    font-size: 0.82em;
    font-weight: 600;
    padding: 0.1em 0.45em;
    border-radius: var(--radius);
    background: transparent;
    color: var(--muted);
    box-shadow: inset 0 0 0 1px var(--rule-strong);
    white-space: nowrap;
  }

  .three {
    max-width: 58ch;
    padding-left: 1.1rem;
  }
  .three li {
    margin-bottom: 0.45rem;
  }

  .pull {
    font-family: var(--font-ui);
    font-size: var(--step-1);
    font-weight: 600;
    line-height: 1.4;
    max-width: 30ch;
    border-left: 3px solid var(--ink);
    padding-left: 1rem;
    margin: 2rem 0;
    letter-spacing: -0.015em;
  }

  @media (max-width: 34rem) {
    .row {
      grid-template-columns: 1fr;
      gap: 0.15rem;
    }
  }
</style>
