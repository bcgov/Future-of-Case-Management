<script>
  // Measured across 326 service-delivery procedures: how many separate systems
  // a worker must touch to complete one documented task.
  const bands = [
    { n: '0', count: 39, note: 'No system named' },
    { n: '1', count: 80, note: 'One system' },
    { n: '2', count: 114, note: 'Two systems' },
    { n: '3', count: 51, note: 'Three systems' },
    { n: '4+', count: 42, note: 'Four or more' }
  ];
  const total = bands.reduce((s, b) => s + b.count, 0);
  const max = Math.max(...bands.map((b) => b.count));
  const multi = bands.slice(2).reduce((s, b) => s + b.count, 0);
  const pct = Math.round((multi / total) * 100);
</script>

<div class="chart">
  <p class="claim">
    <strong>{pct}%</strong> of documented procedures need two or more systems to finish one task.
  </p>

  <table>
    <caption class="sr-only"
      >Number of procedures by count of separate systems required, across {total} procedures.</caption
    >
    <thead>
      <tr>
        <th scope="col">Systems</th>
        <th scope="col">Procedures</th>
        <th scope="col"><span class="sr-only">Proportion</span></th>
      </tr>
    </thead>
    <tbody>
      {#each bands as b}
        <tr class:hi={b.n === '2' || b.n === '3' || b.n === '4+'}>
          <th scope="row">{b.n}</th>
          <td class="num">{b.count}</td>
          <td class="barcell">
            <span class="bar" style="--w:{(b.count / max) * 100}%"></span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <p class="foot">
    Highlighted rows are the {multi} procedures that cross a system boundary. Four procedures require
    seven.
  </p>
</div>

<style>
  .chart {
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
    padding: 1.4rem;
  }
  .claim {
    font-family: var(--font-ui);
    font-size: var(--step-2);
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin: 0 0 1.4rem;
    max-width: 24ch;
  }
  .claim strong {
    color: var(--txn);
    font-weight: 700;
  }
  table {
    margin: 0;
  }
  th,
  td {
    border-bottom: 1px solid var(--rule);
    padding: 0.45rem 0.8rem 0.45rem 0;
  }
  thead th {
    font-size: 0.75rem;
    color: var(--muted);
    font-weight: 600;
  }
  tbody th {
    width: 4.5rem;
    font-size: 0.95rem;
  }
  .num {
    width: 4rem;
    font-variant-numeric: tabular-nums;
  }
  .barcell {
    width: auto;
    padding-right: 0;
  }
  .bar {
    display: block;
    height: 0.75rem;
    width: var(--w);
    background: var(--rule-strong);
    border-radius: 2px;
  }
  tr.hi .bar {
    background: var(--txn);
  }
  tr.hi th,
  tr.hi .num {
    font-weight: 700;
  }
  .foot {
    margin: 1.1rem 0 0;
    font-family: var(--font-ui);
    font-size: var(--step--1);
    color: var(--muted);
    max-width: 52ch;
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
</style>
