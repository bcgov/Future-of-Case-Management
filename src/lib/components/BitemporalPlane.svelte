<script>
  // A retroactive disability designation.
  //   Valid time       = the month the designation applies to.
  //   Transaction time = the month the ministry came to know it.
  // Rates are the single-person figures the ministry's own eligibility
  // estimator uses: $1,060 on assistance, $1,535.50 once designated.

  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  const BASE = 1060;
  const PWD = 1535.5;

  // One fact — the disability designation — asserted once, then again with a
  // period that reaches back to the original application.
  const versions = [
    {
      learnedAt: 0,
      from: null,
      to: null,
      rate: BASE,
      note: 'At application in March, no disability designation is in place.'
    },
    {
      learnedAt: 4,
      from: 0,
      to: 7,
      rate: PWD,
      note: 'Designated in July as a person with a disability, effective from the March application date.'
    }
  ];

  let knownAt = $state(3); // transaction time — "if we asked in…"
  let about = $state(2); // valid time — "…about which month?"

  // Asked at knowledge time k, about month v: which version was current, and
  // did its period cover that month?
  function answer(k, v) {
    let current = versions[0];
    for (const ver of versions) if (ver.learnedAt <= k) current = ver;
    const covers = current.from !== null && v >= current.from && v <= current.to;
    return { rate: covers ? current.rate : BASE, source: current, covers };
  }

  const current = $derived(answer(knownAt, about));

  // The answer the system gives today. Where it differs from the answer it
  // gave at the time, the difference is money already owed.
  const nowAnswer = $derived(answer(months.length - 1, about));
  const differs = $derived(current.rate !== nowAnswer.rate);
  const shortfall = $derived(nowAnswer.rate - current.rate);

  const cells = $derived(months.map((_, k) => months.map((_, v) => answer(k, v).rate)));

  const money = (n) =>
    '$' +
    n.toLocaleString('en-CA', {
      minimumFractionDigits: n % 1 ? 2 : 0,
      maximumFractionDigits: 2
    });
</script>

<div class="plane">
  <div class="grid-wrap">
    <div class="axis-y" aria-hidden="true">
      <span class="axis-label">
        <span class="swatch swatch-txn"></span>
        When the ministry knew
      </span>
    </div>

    <table class="grid">
      <caption class="sr-only">
        Monthly entitlement the system would report, by the month asked about (columns) and the month the
        question was asked (rows). The highlighted cell matches the two sliders below.
      </caption>
      <thead>
        <tr>
          <th scope="col"><span class="sr-only">Asked in</span></th>
          {#each months as m, v}
            <th scope="col" class:col-on={v === about}>{m}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each [...months].reverse() as m, ri}
          {@const k = months.length - 1 - ri}
          <tr>
            <th scope="row" class:row-on={k === knownAt}>{m}</th>
            {#each months as _, v}
              <td
                class:on={k === knownAt && v === about}
                class:lit={k === knownAt || v === about}
                style="--fill:{cells[k][v] === BASE ? 0 : 1}"
              >
                <span class="sr-only">{money(cells[k][v])}</span>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>

    <p class="axis-x" aria-hidden="true">
      The month being asked about
      <span class="swatch swatch-valid"></span>
    </p>
  </div>

  <div class="side">
    <div class="controls">
      <div class="ctl">
      <label for="bt-valid">
        Ask about <strong>{months[about]}</strong>
        <span class="k-valid">valid time</span>
      </label>
      <input id="bt-valid" type="range" min="0" max={months.length - 1} bind:value={about} />
      </div>

      <div class="ctl">
      <label for="bt-known">
        Asked in <strong>{months[knownAt]}</strong>
        <span class="k-txn">transaction time</span>
      </label>
      <input id="bt-known" type="range" min="0" max={months.length - 1} bind:value={knownAt} />
      </div>
    </div>

    <output class="readout" aria-live="polite">
    <p class="sentence">
      Asked in <strong>{months[knownAt]}</strong> about <strong>{months[about]}</strong>, the system
      reports a monthly entitlement of <strong>{money(current.rate)}</strong>.
    </p>
    <p class="basis">Current version of the record: {current.source.note}</p>
    {#if differs}
      <p class="flag">
        Today the system reports {money(nowAnswer.rate)} for {months[about]}. The payment actually
        made that month was correct when it was issued, and is now an underpayment of
        {money(shortfall)}.
      </p>
    {/if}
    </output>
  </div>
</div>

<style>
  .plane {
    background: var(--paper-raised);
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    padding: 1.15rem 1.25rem 1.25rem;
  }

  .grid-wrap {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.4rem 0.75rem;
    align-items: stretch;
  }

  .axis-y {
    grid-column: 1;
    display: flex;
    align-items: center;
  }
  .axis-label {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-family: var(--font-ui);
    font-size: 0.78rem;
    color: var(--muted);
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .axis-x {
    grid-column: 2;
    margin: 0.2rem 0 0;
    font-family: var(--font-ui);
    font-size: 0.78rem;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .swatch {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 2px;
    display: inline-block;
  }
  .swatch-valid {
    background: var(--valid-mid);
  }
  .swatch-txn {
    background: var(--txn-mid);
  }

  .grid {
    grid-column: 2;
    border-collapse: separate;
    border-spacing: 2px;
    margin: 0;
    table-layout: fixed;
  }
  .grid th {
    border: 0;
    padding: 0.15rem 0;
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--muted);
    text-align: center;
  }
  .grid thead th:first-child {
    width: 2.4rem;
  }
  .grid tbody th {
    text-align: right;
    padding-right: 0.45rem;
  }
  .grid th.col-on {
    color: var(--valid);
    font-weight: 700;
  }
  .grid th.row-on {
    color: var(--txn);
    font-weight: 700;
  }

  .grid td {
    border: 0;
    padding: 0;
    height: 1.4rem;
    border-radius: 2px;
    /* Fill runs pale -> ink as entitlement drops. Never the only signal:
       every cell also carries its value as screen-reader text. */
    /* Reduced entitlement tints toward the valid-time hue, the same hue used
       for valid time everywhere else. Colour is never the only signal: each
       cell also carries its dollar value as screen-reader text. */
    background: color-mix(in oklab, var(--paper) calc((1 - var(--fill)) * 100%), var(--valid-mid));
    opacity: 0.45;
  }
  .grid td.lit {
    opacity: 1;
  }
  .grid tr:hover td {
    opacity: 0.8;
  }
  .grid td.on {
    box-shadow:
      inset 0 0 0 2px var(--ink),
      0 0 0 2px var(--paper-raised);
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 1.25rem;
    margin-top: 1.2rem;
  }

  /* Wide screens: the controls and the answer sit beside the grid rather than
     under it, which keeps the whole interaction above a laptop fold. */
  @media (min-width: 64rem) {
    .plane {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(21rem, 1fr);
      gap: 1.5rem 2rem;
      align-items: start;
    }
    .controls {
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-top: 0;
    }
    .side .readout {
      margin-top: 1.15rem;
    }
    .side .sentence {
      font-size: var(--step-0);
      line-height: 1.5;
    }
  }
  .ctl label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-ui);
    font-size: 0.85rem;
    color: var(--muted);
    margin-bottom: 0.35rem;
  }
  .ctl strong {
    color: var(--ink);
  }

  .readout {
    display: block;
    margin-top: 1.15rem;
    padding-top: 1rem;
    border-top: 1px solid var(--rule);
  }
  .sentence {
    margin: 0 0 0.5rem;
    font-size: var(--step-1);
    line-height: 1.45;
  }
  .basis {
    margin: 0;
    color: var(--muted);
    font-size: var(--step--1);
    font-family: var(--font-ui);
  }
  .flag {
    margin: 0.8rem 0 0;
    padding-left: 0.8rem;
    border-left: 3px solid var(--txn);
    font-size: var(--step--1);
    font-family: var(--font-ui);
    color: var(--ink);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 34rem) {
    .plane {
      padding: 1rem;
    }
    .grid th {
      font-size: 0.6rem;
    }
    .sentence {
      font-size: var(--step-0);
    }
  }
</style>
