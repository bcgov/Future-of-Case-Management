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
      Current case management tracks facts, fields are overwritten, history is lost. In the new system,
      the unit of informationv is not a "fact" it is a timestamped, attributable <em>claim</em>. 
      That claim can be falsified, validated, overturned or replaced - and no information is lost.
    </p>

    <h2>Why not just store facts</h2>

    <p>
      A system that stores just the current state, "Income: $900" has left unanswered some of the most important questions.
      How do we know? What evidence is there? When did we know? Is this the corrected number or the number recorded at the time?

      Frontline staff are adaptable, this information isn't truly <em>lost</em> it's just not modeled by the system. 
      It goes in notes, forms, attachments and other ancillary documents, only the tiny slice of information is actually held as data.
    </p>

    <p>
      This isn't simply an auditing nicety, it eliminates the cognitive drag; the mismatch between how the system handles data and how frontline staff operate.
      Significant effort is spent substantiating evidence against claims, this is done manually and is not a properly modeled first class activity despite it being, numerically, the most common task workers perform.
      Social workers must spend hours mapping their notes and activities to a different structure - serving the software, rather than their clients.
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
        One evidence assertion, from a case where the dates are contested. The ministry now says
        the household was a couple from January. It came to that view in September. Eight months of
        payments were made at the single rate in between, and which of those two dates you read
        decides what happens next.
      </figcaption>
    </figure>

    <h2>The four things that can happen to an assertion</h2>

    <p>
      Once something is recorded it is never edited in place. Four operations change what the
      system believes, and they differ in one respect: what each does to the period the claim
      covers.
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
      That distinction is the reason the model exists. It is a policy rule expressed in the shape of
      the data, and it can be applied consistently because the operation that produced a
      recalculation is recorded on the record itself rather than inferred afterwards.
    </p>

    <p>
      The operation is an input to the classification rather than the whole of it. Who caused the
      error matters too, and a client who concealed a relationship is not in the same position as a
      worker who mis-keyed a figure. What the model guarantees is narrower and more useful: the
      question is answerable at all, from the record, rather than reconstructed by whoever is
      looking at the file today.
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
      A conventional design holds one relationship start date and an audit entry recording that a
      worker changed it on 12 September. That answers the third question, gestures at the second,
      and cannot answer the first at all. The eight monthly payments are left looking like errors,
      when at the time each was the correct application of what was then known.
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
      Two time axes are standard. This design carries a third, and it exists because the new system
      inherits fifteen years of records from systems that are still running.
    </p>

    <p>
      When old records are brought across, they all arrive on the same day. If that migration date
      becomes the "when we learned it" date for every inherited record, then every historical fact
      appears to have been learned simultaneously. Supersede and Correct become indistinguishable
      across the whole pre-cutover record, and the overpayment classification rule cannot run
      against the records where most overpayments actually sit.
    </p>

    <p>
      The third axis holds the date the <em>predecessor</em> system asserted the fact, where that
      can be read out of the old record. It is frequently unknowable, so it carries a confidence
      marker, and where the answer is unknown the system says so rather than guessing.
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
        Three dates on every assertion. The third is nullable; the design treats an unknown value as
        unknown rather than substituting the migration date.
      </figcaption>
    </figure>

    <p>
      This cannot be added later. Events are immutable: a field can be introduced with a default,
      but it cannot be filled in retroactively, because the source was either decoded at migration
      or it was not. The decision has to be made before the first production record is written.
    </p>

    <Technical summary="Confidence values and replay behaviour">
      <p>
        <code>legacy_asserted_at</code> is accompanied by <code>legacy_assertion_confidence</code>,
        which takes <code>DECODED</code> (read directly from the legacy record or audit trail),
        <code>INFERRED</code> (derived from a related artefact by a documented rule) or
        <code>UNKNOWN</code>.
      </p>
      <p>
        On <code>UNKNOWN</code>, any consumer computing a knowledge-state answer (the overpayment
        classification rule, a tribunal reconstruction view, a disclosure history) must return
        <code>INDETERMINATE</code>. Projections that answer only valid-time questions ignore the
        field.
      </p>
      <p>
        Retroactive recalculation runs off valid time, which a competent migration preserves, so
        recalculation is unaffected. What breaks without the third axis is narrower: the question of
        what the ministry knew and when, which is the question a tribunal asks.
      </p>
    </Technical>

    <h2>What the design refuses to do</h2>

    <p>
      There is a tempting move here: reconstruct the missing history by generating events that look
      like real ones, inferred from the old system's audit trail. The design forbids it. Recovering
      a timestamp and marking how confident you are in it makes a bounded, checkable claim.
      Manufacturing a sequence of events that were never recorded invents history, and a tribunal is
      exactly the place that would come apart.
    </p>

    <p class="pull">Provenance may be recovered. Intent may not be reconstructed.</p>
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
