<script>
  import SystemsPerTask from '$lib/components/SystemsPerTask.svelte';
  import Technical from '$lib/components/Technical.svelte';
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Current State — The Future of Case Management IT</title>
  <meta
    name="description"
    content="What 326 service-delivery procedures show about how the work is actually done."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Current State</h1>
    <p class="lede">
      This design does not set out to contradict the current system. It comes from one question.
      Why does a large, expensive piece of software, laboured over by hundreds of capable and
      well-meaning people, still fail the organizations it serves? The answer lies in what the
      system leaves out: what it ignores, and what it pushes outside itself.
    </p>

    <h2>What the SDPR procedures are</h2>

    <p>
      Every recurring task a caseworker does has a written procedure: what starts it, which screens
      to open, which form to send, what to type in which field. Together they run to 8.2 million
      characters. They describe the service as staff really deliver it.
    </p>

    <p>
      Each one carries a header naming its purpose, the policy it carries out, the law behind it,
      and how the system classifies the work. That turns the whole set into a map of the
      services.
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
      Recovering an overpayment is the clearest example. A worker who has decided someone was paid
      too much has to:
    </p>

    <ol class="journey">
      <li>Open a separate web application to calculate the amount. It does not connect to either system of record.</li>
      <li>Print the result, scan it, and attach it back to the case.</li>
      <li>Move the case file to their own office in the mainframe so they have permission to act on it.</li>
      <li>Type the amount into the mainframe by hand.</li>
      <li>Move the case file back to where it came from.</li>
    </ol>

    <p>
      Clients whose earnings are annualised need one step more: a spreadsheet. The worker reads
      figures off one screen, types them into the sheet, and types the result back.
    </p>

    <p>
      None of this is anyone's poor practice. The procedure says to do it this way, because with
      the systems that exist this is the right way.
    </p>

    <h2>Where the rules actually live</h2>

    <p>
      A modernisation has to know what it is replacing. The rules that decide entitlement sit in
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
        procedures. Nothing on record gives the 29 rulebases source control, a promotion pipeline
        or a version register.
      </figcaption>
    </figure>

    <h2>Routing runs on a spreadsheet</h2>

    <p>
      An Excel workbook decides which queue a request joins, how urgent it is, how long it has, and
      where a scanned document goes. Fifty-six procedures point at it. One of its sheets maps 445
      form numbers to their handling. So the priorities and service-level targets for the whole
      service sit outside the platform, kept up by hand.
    </p>

    <h2>Accommodation and the signature problem</h2>

    <p>
      There is a path for applicants who need an interpreter, find reading difficult, or have
      little access to a computer. A worker reads the questions aloud and enters the answers for
      them.
    </p>

    <p>
      That path skips portal registration, so the applicant never gets a personal identification
      number. The electronic signature depends on that number. So the people the accommodation
      exists for are the people who then cannot sign electronically.
    </p>

    <Technical summary="How these figures were produced">
      <p>
        The counts come from reading the Resource Finder and the other document stores in full,
        then pattern-matching and mapping the text. Named systems, capability areas and the policy
        behind each procedure come from the documents and the policy manual.
      </p>
      <p>
        Nobody has measured the volumes yet. You can count caseload throughput, worker streams,
        transaction rates and queue depth directly. The figures here come from the technical design
        documents instead.
      
      </p>
    </Technical>

    <p>
      The rest of the site sets out how the design answers these conditions. Start with
      <a href="{base}/evidence">evidence</a>. The overpayment journey above follows directly from a
      record that cannot say what the ministry knew, or when.
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
