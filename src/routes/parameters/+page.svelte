<script>
  import ParameterSet from '$lib/components/ParameterSet.svelte';
  import Technical from '$lib/components/Technical.svelte';
  import { base } from '$app/paths';

  // The five gates, in the order the work reaches them.
  const gates = [
    {
      when: 'Before the first rule is written',
      codes: 'N07',
      what: 'The engine is sealed off from live data. A rule authored against a service it can call has already fixed the shape of every rule after it.'
    },
    {
      when: 'Before the first event is written',
      codes: 'N12, and the third date in N01',
      what: 'How records are destroyed is decided per class of fact. Events are immutable, so a date can be added with a default but never filled in afterwards.'
    },
    {
      when: 'As the first copy is made',
      codes: 'N06, N21',
      what: 'Where a copy came from, and what its source bars it from, are written at the moment of copying. Neither can be reconstructed later.'
    },
    {
      when: 'From the first decision',
      codes: 'N09',
      what: 'The point in the event sequence a decision read from goes into its record. Earlier decisions cannot be tied to a consistent view of the world.'
    },
    {
      when: 'Before the first group of clients moves',
      codes: 'N14',
      what: 'Moving them back is proven rather than claimed, and what the return trip loses is written down and approved.'
    }
  ];

  // How the twelve source principles resolve. Fourteen targets, plus seven new.
  const refactor = [
    { from: 'P1', op: 'split', to: 'N01 · N02' },
    { from: 'P2', op: 'narrowed', to: 'N08' },
    { from: 'P3', op: 'split', to: 'N03 · N06' },
    { from: 'P4', op: 'absorbs P3(a)', to: 'N03' },
    { from: 'P5', op: 'carried', to: 'N04' },
    { from: 'P6', op: 'extended', to: 'N11' },
    { from: 'P7', op: 'carried', to: 'N10' },
    { from: 'P8', op: 'narrowed', to: 'N07' },
    { from: 'P9', op: 'carried', to: 'N05' },
    { from: 'P10', op: 'generalised', to: 'N18' },
    { from: 'P11', op: 'split', to: 'N12 · N13' },
    { from: 'P12', op: 'carried', to: 'N14' }
  ];
</script>

<svelte:head>
  <title>Parameters — The Future of Case Management IT</title>
  <meta
    name="description"
    content="The twenty-one rules the design has to hold to, each with the test that catches a breach, and the six that cannot be added later."
  />
</svelte:head>

<div class="shell">
  <div class="prose">
    <h1>Parameters</h1>
    <p class="lede">
      The following parameters are the twenty-one proposed rules the design has to follow. 
      Each one is written so a reviewer can point at something and judge whether it complies. 
      Six of the parameters must be built in from the start; they cannot be added once the work has started.
    </p>
    <h2>What a parameter is</h2>

    <p>
      A parameter is something a system must comply with. 
      A parameter must be check-able; it must be possible to check whether the system complies to it. 
      To make sure that these rules are parameters, every entry below ends in a question you can put to a running system and get a wrong answer to.
    </p>

    <p>
      The set makes three claims:
    </p>
      <ol>
          <li>Every parameter is necessary: take one away and the design loses
            something nothing else supplies. </li>
          <li>No two overlap: nothing is said twice.</li>
          <li>And together they carry what the architecture is trying to do. </li>
      </ol>
      <p>
      Each entry below demonstrates the first two
      claims. The third rests on an argument against a list of intents, and it is the weakest of
      the three, because another architect could reasonably draw some of these lines elsewhere.
    </p>

    <h2>The set</h2>

    <figure class="wide">
      <ParameterSet />
      <figcaption>
        Grouped by the part of the design each one covers. Select any parameter to see how to check
        it. A heavy left edge marks the six you cannot add later. Words with a special meaning are
        explained in the <a href="{base}/glossary">glossary</a>, and each parameter links to the
        ones it uses.
      </figcaption>
    </figure>

    <h2>Six cannot be added later</h2>

    <p>
      You can satisfy most of these late, at a price. Six you cannot. Each one has to be in place
      before a particular first event. Once that event has happened, the fix is a rebuild rather
      than a repair.
    </p>

    <figure class="wide">
      <ol class="gates">
        {#each gates as g}
          <li>
            <span class="dot" aria-hidden="true"></span>
            <span class="when">{g.when}</span>
            <span class="codes">{g.codes}</span>
            <p>{g.what}</p>
          </li>
        {/each}
      </ol>
      <figcaption>
        The gates in the order delivery reaches them. This says what order the work has to happen
        in. It does not say which rules matter most.
      </figcaption>
    </figure>

    <p class="pull">Do first only what cannot be done later.</p>

    <h2>Where the twenty-one came from</h2>

    <p>
      Every principle in the architecture is accounted for. Seven carried across, with their
      wording narrowed or widened. Three split, because each held two ideas that could stand apart.
      One took in a clause from another, and one became more general. So twelve principles turned
      into fourteen parameters, and seven more joined them.
    </p>

    <figure class="wide">
      <ul class="refactor">
        {#each refactor as r}
          <li>
            <span class="from">{r.from}</span>
            <span class="op">{r.op}</span>
            <span class="to">{r.to}</span>
          </li>
        {/each}
      </ul>
      <p class="added">
        <span class="lbl">Added</span>
        <span class="codes">N09 · N15 · N16 · N17 · N19 · N20 · N21</span>
      </p>
      <figcaption>
        N09 closes a gap the architecture names in its own text. N15 and N16 close two more it had
        already recorded against itself. The last four came out of the policy manual, which turned
        out to state rules the architecture had never reached.
      </figcaption>
    </figure>

    <p>
      Those last four are the interesting ones, because nobody found them by thinking harder about
      the architecture. They came from reading what the ministry already tells its own staff to do.
      Policy sets time limits, and missing one changes what a client is owed. It names which
      entitlements a client can appeal, and to whom. It keeps the person who decides apart from the
      person who reviews. And it bars certain uses of information the ministry may lawfully hold.
      The twelve could not express any of that.
    </p>

    <p>
      Where a parameter restates one of the architecture’s twelve principles, the architecture’s
      own wording wins if the two ever differ. The seven new ones are recorded as amendments to the
      architecture, each with a decision record. N16 is still a proposal.
    </p>

    <h2>A rule nobody can check is not a rule</h2>

    <p>
      One parameter is not about the system at all. N18 ranges over the other twenty. It makes each
      of them name how you catch a breach, and it says that anything you could write as a lint rule
      or a compatibility check has to be written as one.
    </p>

    <p>
      It stands on its own rather than folded into the others. File a rule about enforcement among
      the rules about behaviour, and enforcement stops being anybody's job without anyone deciding
      that it should.
    </p>
</div>
</div>

<style>
  .gates {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1.5rem;
  }
  @media (min-width: 52rem) {
    .gates {
      grid-template-columns: repeat(5, 1fr);
      gap: 1.25rem;
    }
  }
  .gates li {
    border-top: 1px solid var(--rule-strong);
    padding-top: 0.9rem;
    position: relative;
  }
  .dot {
    position: absolute;
    top: -5px;
    left: 0;
    width: 9px;
    height: 9px;
    background: var(--ink);
    border-radius: 50%;
  }
  .when {
    display: block;
    font-family: var(--font-ui);
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.3;
  }
  .gates .codes {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--muted);
    margin-top: 0.3rem;
  }
  .gates p {
    margin: 0.6rem 0 0;
    font-size: var(--step--1);
    line-height: 1.55;
  }

  .refactor {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    gap: 0.5rem;
  }
  .refactor li {
    display: grid;
    grid-template-columns: 2.2rem 1fr;
    gap: 0 0.5rem;
    align-items: baseline;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
    padding: 0.6rem 0.7rem;
  }
  .from {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 600;
    grid-row: span 2;
  }
  .op {
    font-family: var(--font-ui);
    font-size: 0.72rem;
    color: var(--muted);
  }
  .to {
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }

  .added {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.6rem;
    margin: 0.8rem 0 0;
    border-top: 2px solid var(--ink);
    padding-top: 0.6rem;
  }
  .lbl {
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--muted);
  }
  .added .codes {
    font-family: var(--font-mono);
    font-size: 0.8rem;
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
</style>
