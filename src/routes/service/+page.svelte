<script>
  import SystemsPerTask from '$lib/components/SystemsPerTask.svelte';
  import Technical from '$lib/components/Technical.svelte';
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>The service today — The Future of Case Management IT</title>
  <meta
    name="description"
    content="What 326 service-delivery procedures show about how the work is actually done."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>The service today</h1>
    <p class="lede">
      The design answers problems that are visible in how the work is done now. Those problems were
      measured rather than assumed, by reading the ministry's own 326 standard operating
      procedures.
    </p>

    <h2>What the procedures are</h2>

    <p>
      Every recurring task a caseworker performs has a written procedure: what starts it, which
      screens to open, which form to send, what to type in which field. Together they run to 8.2
      million characters. They describe the service as it is actually delivered rather than as it
      was designed.
    </p>

    <p>
      Each one carries a header naming its purpose, the policy it implements, the legislation
      behind it, and how the work is classified in the system. That makes the whole set readable as
      a map of the service.
    </p>

    <div class="stats">
      <div><span class="n">326</span><span class="l">procedures</span></div>
      <div><span class="n">15</span><span class="l">capability areas</span></div>
      <div><span class="n">128</span><span class="l">kinds of work request</span></div>
      <div><span class="n">84</span><span class="l">statutory provisions cited</span></div>
      <div><span class="n">146</span><span class="l">distinct forms</span></div>
      <div><span class="n">13</span><span class="l">ways to reach the ministry</span></div>
    </div>

    <h2>Work crosses system boundaries constantly</h2>

    <figure class="wide">
      <SystemsPerTask />
      <figcaption>
        Counted by naming every system referenced in each procedure. The most common pairing is the
        Siebel case system with the client portal, then the case system with Service Canada, then
        the case system with the mainframe.
      </figcaption>
    </figure>

    <h2>One journey, three systems, two re-keys</h2>

    <p>
      Recovering an overpayment is the clearest example. A worker who has decided that someone was
      paid too much must:
    </p>

    <ol class="journey">
      <li>Open a separate web application to calculate the amount. It does not connect to either system of record.</li>
      <li>Print the result, scan it, and attach it back to the case.</li>
      <li>Move the case file to their own office in the mainframe so they have permission to act on it.</li>
      <li>Type the amount into the mainframe by hand.</li>
      <li>Move the case file back to where it came from.</li>
    </ol>

    <p>
      For clients whose earnings are annualised there is a further step: a spreadsheet, with figures
      read off one screen, typed into the spreadsheet, and the result typed back.
    </p>

    <p>
      None of this is anyone's poor practice. It is written down as the correct procedure, because
      given the systems that exist it is the correct procedure.
    </p>

    <h2>Where the rules actually live</h2>

    <p>
      A modernisation needs to know what it is replacing. The rules that decide entitlement are in
      four separate places, and only one of them is a rules engine.
    </p>

    <figure>
      <table>
        <caption>Business rules by location</caption>
        <thead>
          <tr><th scope="col">Where</th><th scope="col">What it holds</th></tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">A rules engine</th>
            <td>29 separate rulebases covering eligibility, validation, debt and payment calculation</td>
          </tr>
          <tr>
            <th scope="row">The mainframe</th>
            <td>Benefit calculation, rate recalculation, time limits, sanction end dates</td>
          </tr>
          <tr>
            <th scope="row">Formulas inside the case system</th>
            <td>Retention periods, access levels, privacy calculations</td>
          </tr>
          <tr>
            <th scope="row">A database table</th>
            <td>The rates the public-facing eligibility estimator uses</td>
          </tr>
        </tbody>
      </table>
      <figcaption>
        Found by reading the technical design documents for the current release alongside the
        procedures. No source control, promotion pipeline or version register is documented for the
        29 rulebases.
      </figcaption>
    </figure>

    <h2>Routing runs on a spreadsheet</h2>

    <p>
      Which queue a request joins, how urgent it is, how long it has, and where a scanned document
      goes are all defined in an Excel workbook that 56 procedures refer to. One of its sheets maps
      445 form numbers to their handling. Priority and service-level targets for the whole service
      sit outside the platform, maintained by hand.
    </p>

    <h2>Accommodation and the signature problem</h2>

    <p>
      There is a path for applicants who need an interpreter, find reading difficult, or have
      limited computer access: a worker reads the questions aloud and enters the answers for them.
    </p>

    <p>
      Because that path skips portal registration, no personal identification number is created for
      the applicant. The electronic signature depends on that number. The people the accommodation
      exists for are the people who cannot then sign electronically.
    </p>

    <Technical summary="How these figures were produced">
      <p>
        All counts come from the 326 markdown procedures held in the project corpus. System counts
        were produced by pattern-matching named systems per procedure; capability areas were
        derived from the policy-manual sections each procedure links to, with the remainder
        classified by content.
      </p>
      <p>
        Volumetrics are the one thing the procedures do not carry. Caseload, transaction rates and
        queue depths appear nowhere in them, and had to be recovered separately from interface
        specifications in the technical design documents.
      </p>
    </Technical>

    <p>
      The design pages set out how the proposal answers these conditions. The clearest place to see
      the connection is <a href="{base}/evidence">evidence and time</a>, because the overpayment
      journey above is a direct consequence of a record that cannot say what was known and when.
    </p>
  </div>
</div>

<style>
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    gap: 1.2rem 1.5rem;
    margin: 2rem 0 2.5rem;
    max-width: 62rem;
  }
  .stats div {
    border-top: 2px solid var(--rule-strong);
    padding-top: 0.6rem;
  }
  .n {
    display: block;
    font-family: var(--font-ui);
    font-size: var(--step-3);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
  .l {
    display: block;
    font-family: var(--font-ui);
    font-size: 0.8rem;
    color: var(--muted);
    margin-top: 0.3rem;
    line-height: 1.35;
  }

  .journey {
    max-width: 58ch;
    padding-left: 1.2rem;
  }
  .journey li {
    margin-bottom: 0.5rem;
    padding-left: 0.3rem;
  }
</style>
