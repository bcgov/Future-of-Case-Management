<script>
  // The twenty-one parameters, grouped by the axis each one occupies. A chip
  // carries its code so the detail panel can be cited; the retrofit marker is
  // text as well as a border, because colour is never the only signal here.
  const params = [
    {
      id: 'n01',
      code: 'N01',
      axis: 'record',
      name: 'A fact is a dated claim with a source',
      plain:
        'Nothing is stored as a bare value. Every fact carries who claimed it, the period it covers, the date this system learned it, and the date the old system asserted it, or a marker saying that date cannot be read.',
      why: 'Nothing downstream can be rebuilt without it. A decision cannot be replayed against evidence whose period is unknown, and a correction cannot be told apart from a change in the world.',
      test: 'Take any fact. Can you say when it was true, when this system learned it, what the old system said, and point at the source record?',
      retro: '',
      partial:
        'The first two dates can be added later. The third cannot: it has to be in the record before the first production event.',
      source: 'From P1, split'
    },
    {
      id: 'n02',
      code: 'N02',
      axis: 'record',
      name: 'Only evidence and decisions cross a boundary',
      plain:
        'Parts of the system exchange claims and decisions. They do not hand each other rows, internal identifiers or query results.',
      why: 'The shape of the payload is what carries provenance across. A row arrives stripped of who claimed it, so the receiver cannot know what it is entitled to conclude, and a later correction has nothing to attach to.',
      test: 'Read every published message. Does any of it carry the sender’s storage shape, an identifier only the sender understands, or a result set rather than a claim?',
      retro: '',
      source: 'From P1, split'
    },
    {
      id: 'n03',
      code: 'N03',
      axis: 'boundary',
      name: 'No part depends on a model it does not own',
      plain:
        'Each part keeps its own picture of a person, a case, a payment. No canonical Person, no shared schema, no join across parts, no dependency on a type another part owns.',
      why: 'A shared model decides whose release everyone else waits for. The previous programme merged its last two phases and cut child protection scope because of exactly this.',
      test: 'Does any part read another part’s tables, or depend on a type it does not own? The second question catches the failure that actually happens: shared models come back as schemas rather than as databases.',
      retro: '',
      source: 'From P4, absorbing part of P3'
    },
    {
      id: 'n04',
      code: 'N04',
      axis: 'boundary',
      name: 'Behaviour lives with the data it governs',
      plain:
        'Whatever holds the data enforces its own rules. Logic is not split between the data, a configuration table and an unwritten process.',
      why: 'Logic spread across layers cannot be reasoned about, tested or changed with confidence, and it produces the state where nobody can say which copy is authoritative. It also makes validation uniform: a rule the data enforces cannot be bypassed by an integration or a migration script.',
      test: 'To see how one business rule works, how many systems must you open? If more than one, name which is authoritative, why the others exist, and show what generates them.',
      retro: '',
      source: 'From P5, unchanged'
    },
    {
      id: 'n05',
      code: 'N05',
      axis: 'boundary',
      name: 'One writer per record, at every moment',
      plain:
        'One system of record per record per group of clients, including during a transition. Not both systems writing with a reconciliation afterwards, and no automatic conflict resolution on anything that decides what a person receives.',
      why: 'Resolving a conflict automatically puts a merge rule in the place of a policy or a person. Writing from both sides is also the mechanism by which a temporary coexistence becomes permanent.',
      test: 'For every record in transition, name the single system of record and the group it covers. If the answer is “it depends on the field”, the split has been drawn across attributes rather than across groups of clients.',
      retro: '',
      source: 'From P9, unchanged'
    },
    {
      id: 'n06',
      code: 'N06',
      axis: 'propagation',
      name: 'Every copy is traceable, and every correction reaches it',
      plain:
        'A part that copies evidence records where it came from. When the source corrects it, every holder of a copy can be listed and has to act, including where a decision was already made on the old value.',
      why: 'This is the duty copying creates and nothing else discharges. A design that propagates nothing at all passes every boundary rule perfectly and still leaves people paid on a value known to be wrong.',
      test: 'Correct a fact at its source. Can you list every part holding a copy, and is each one required to act? Is a correction nobody consumes detected and alarmed?',
      retro: 'Provenance has to be written as the copy is made',
      source: 'From P3, the half the source calls load-bearing'
    },
    {
      id: 'n21',
      code: 'N21',
      axis: 'propagation',
      name: 'Limits on use travel with the information',
      plain:
        'Where a fact is lawfully held but barred from some use, the bar is recorded on the fact itself, travels with every copy, and is enforced where the use happens rather than left to procedure.',
      why: 'Nothing else catches a lawfully held fact reaching a use it was barred from. Policy bars five different things: an attribute, a class of content, a counterparty, a subject matter, and an act of communication. Only the first has anything to do with a calculation.',
      test: 'Is the bar recorded on the information rather than in a procedure? Does it survive copying into another part? Does an undeclared purpose fail closed? Is a blocked use recorded as an event?',
      retro: 'A bar absent at capture is absent from every earlier copy',
      source: 'New, from policy'
    },
    {
      id: 'n07',
      code: 'N07',
      axis: 'determination',
      name: 'The calculation reads nothing but its inputs',
      plain:
        'No clock, no database, no service calls inside the decision. Everything it needs is handed to it, and the record it writes is a result of the decision, never an input to it.',
      why: 'Purity is what makes an identical re-run physically achievable rather than aspirational. A rules service that fetches what it needs gives every decision a dependency on a running system, which is the first thing a tribunal will probe.',
      test: 'Given the same rules, the same engine version and the same inputs, does it produce a byte-identical trace, with no reference to the clock, the environment or any service?',
      retro: 'The engine must be sealed before the first rule is written',
      source: 'From P8, narrowed to the calculation'
    },
    {
      id: 'n08',
      code: 'N08',
      axis: 'determination',
      name: 'The decision record stands on its own',
      plain:
        'A decision stores which rules version ran against which evidence version, and stores the artefacts rather than pointing at them. It also records what was asked for, which criteria were met and which were not, what was assumed, what evidence was missing, and the date the client was told.',
      why: 'A pointer to a running system is not evidence: replay has to survive the retirement of everything that produced the decision, including the engine. And the client is owed the record itself, assembled and severed under FOIPPA, which replay alone does not deliver.',
      test: 'Can a decision made three years ago be replayed today from storage alone, with nothing running? Can the appeal record be assembled and severed on demand?',
      retro: '',
      source: 'From P2, narrowed to the record'
    },
    {
      id: 'n09',
      code: 'N09',
      axis: 'determination',
      name: 'The snapshot names the moment it was read',
      plain:
        'Assembling the facts means reading stores that update independently. The decision records the point in the event sequence it read from, sets a limit on how far behind a store may be, and refuses to issue outside that limit.',
      why: 'The architecture states the hole in its own text: two decisions issued microseconds apart, one store briefly behind, can legitimately see different worlds. Both replay. Both are reproducible. They disagree, and nothing else notices.',
      test: 'Is the watermark named in the design, written into the decision record, and bounded by a stated limit? Does issuance outside the bound fail rather than proceed?',
      retro: 'In practice: the watermark must be in the first decision record',
      source: 'New, and required'
    },
    {
      id: 'n10',
      code: 'N10',
      axis: 'interface',
      name: 'The contract outlives what implements it',
      plain:
        'Published interfaces use policy and domain words, not the vocabulary of whatever product sits behind them. The interface is the permanent artefact; the translation layer over the existing system is temporary, and its team is chartered to disband.',
      why: 'This is what makes replacement in pieces possible at all. The interface published today over the old platform is the interface published tomorrow over the new services. Conflating the contract with the layer binds legacy vocabulary to the future architecture, which is the failure the programme exists to reverse.',
      test: 'Can a reviewer tell from the schema which product implements it? Then remove the product and count the changes to the contract.',
      retro: '',
      source: 'From P7, unchanged'
    },
    {
      id: 'n11',
      code: 'N11',
      axis: 'interface',
      name: 'Generic capability is bought, and a decision to build is checked by someone else',
      plain:
        'Workflow, notification, identity, secrets, policy evaluation, scheduling, document storage, search, print and mail are bought, adopted or reused. Building one requires a named statutory, policy or programme-specific need that no commodity option meets, assessed by someone other than the component’s owner. A preference for performance is not such a need.',
      why: 'Effort spent building commodity capability is effort not spent on reproducible decisions, which is where the programme will be judged. Without the independent check the test is self-certifying, which is how it currently fails.',
      test: 'For every custom-built component: which statutory, policy or programme requirement does no commodity option meet, and who other than the builder assessed that answer?',
      retro: '',
      source: 'From P6, with the independent check added'
    },
    {
      id: 'n12',
      code: 'N12',
      axis: 'obligation',
      name: 'Disposition is designed before the first event',
      plain:
        'How records end is decided per class of fact before anything is written: a schedule, an indirection, or destroying one person’s key. What survives a destruction is published, key custody is designed, and the behaviour of a replay that meets an unreadable event is specified.',
      why: 'An append-only store and a statutory duty to destroy are in direct tension, and resolving that tension after the first event is a rebuild rather than a repair. The timing is the rule: a correct design arrived at late is a failed one.',
      test: 'Has the mechanism been decided per class of fact, and the survivor set published, before the first event is written?',
      retro: 'A store with no disposition design cannot acquire one afterwards',
      source: 'From P11, split'
    },
    {
      id: 'n13',
      code: 'N13',
      axis: 'obligation',
      name: 'Custodianship is modelled, not assumed',
      plain:
        'Whose record it is is an attribute the system reads. The non-Crown participant class is modelled rather than approximated, transfer to another sovereign is an available outcome, and sharing agreements are machine-readable artefacts that generate the access rights.',
      why: 'The Declaration on the Rights of Indigenous Peoples Act commits the Province to alignment, and a Nation’s governance over its own data is not expressible as a retention rule or an access list. A PDF agreement cannot generate an access right, and a right generated anywhere else cannot be audited.',
      test: 'For any evidence type: can you state its custodian, and does the system read that rather than people following a convention? Is every access decision traceable to the agreement registry and to no other source?',
      retro: '',
      partial: 'Partly. The architecture records the qualification without saying which half.',
      source: 'From P11, split'
    },
    {
      id: 'n14',
      code: 'N14',
      axis: 'reversibility',
      name: 'Every step back is possible, and its losses are published',
      plain:
        'Every group of clients moved can be moved back without a data project, with an approved statement of what the return trip loses. Reversibility is a property of the mechanism and of the fidelity.',
      why: 'How long a coexistence runs is controlled elsewhere. How much it loses on the way back is controlled by nothing else, and a rollback plan that does not say what is lost has not been tested.',
      test: 'Can this group return to the old system today, without a data project, and can you name every class of fact that would not survive the trip? Correction-versus-supersession has no destination in the old system: if that is not on the list, the list is incomplete.',
      retro: 'Reversibility claimed but never proven is discovered when it is needed',
      source: 'From P12, unchanged'
    },
    {
      id: 'n15',
      code: 'N15',
      axis: 'reach',
      name: 'Reach does not depend on the client’s capability or channel',
      plain:
        'A person can reach the same outcome whatever their disability and whichever route they take. Interfaces meet the Province’s accessibility standard at first release, and every journey has a supported route that is not digital.',
      why: 'Nothing else in the set detects a system that is correct, reproducible, well-bounded and unreachable by the people it exists for. That failure is invisible in aggregate usage data and falls entirely on clients and front-line staff.',
      test: 'For each journey: can it be completed on every supported channel, and does the outcome change with the route? For each interface: assessed with assistive technology, not only by automated scan, which catches around 30% of issues.',
      retro: '',
      source: 'New, from the gaps the architecture records'
    },
    {
      id: 'n16',
      code: 'N16',
      axis: 'continuity',
      name: 'Recovery targets are stated per service and proven by exercise',
      plain:
        'Every service carries an availability target and stated recovery times, set against what its failure does to a client, and demonstrated by exercise rather than asserted. Shared infrastructure inherits the strictest target of anything that depends on it.',
      why: 'Nothing else makes a recovery obligation detectable. Every recovery figure in the architecture covers the analytics platform. None exists for the published interface, the translation layer, the decision service or the case stores. A missed payment run is not recovered by the system coming back.',
      test: 'Name the availability tier and the recovery targets for each service, and produce the exercise result that demonstrates them. A figure never measured is not a target.',
      retro: '',
      source: 'New, from the gaps the architecture records; still proposed'
    },
    {
      id: 'n17',
      code: 'N17',
      axis: 'continuity',
      name: 'Deciding, reviewing and paying are held apart',
      plain:
        'One party cannot decide, then review its own decision, then represent the ministry at the appeal against it. A decision-maker may seek advice but may not let advice stand in for their own reasoning. Payment runs through one chokepoint, with determination, authorisation and release in different hands.',
      why: 'Nothing else says who may exercise an authority. The decision record says what was decided and by whom; it does nothing to stop the same person deciding, reviewing and releasing the money. Policy states all three limbs directly.',
      test: 'For every entitlement, name who holds the deciding capacity and who holds the reviewing one, and state what the ministry retains. Is a decision traceable to the person who reasoned it, as distinct from anyone who advised?',
      retro: '',
      source: 'New, from policy'
    },
    {
      id: 'n19',
      code: 'N19',
      axis: 'clocks',
      name: 'Statutory clocks run in the system',
      plain:
        'Every time limit is modelled once, with what starts it, how long it runs, which extensions are allowed and who must authorise each. A breach is a recorded event, and where policy attaches a consequence, the system applies it without being asked.',
      why: 'Where the ministry decides outside its legislated time, eligibility is determined as of the date the decision was due rather than the date it was made. A missed deadline changes what the client is owed, so an unmodelled clock is a source of wrong entitlement, not a service-level gap.',
      test: 'For every limit: modelled once, with its owner, its class, its start event, duration, extensions and authorisations? Is a breach detected without a person noticing it, and its consequence applied automatically?',
      retro: '',
      source: 'New, from policy'
    },
    {
      id: 'n20',
      code: 'N20',
      axis: 'adjudicability',
      name: 'Whether a decision can be challenged is recorded per entitlement',
      plain:
        'For each entitlement the system records its statutory basis, whether a decision on it can be reconsidered, whether it can be appealed, and to which body. Recorded per entitlement and per variant, never inferred from the parent programme.',
      why: 'The four values vary independently and cannot be derived. Getting it wrong has a direct client consequence in both directions: offering a route that does not exist, or withholding one that does.',
      test: 'For every entitlement and every variant: can the system state its basis, whether it is reconsiderable, whether it is appealable and to which forum, without inferring any of it from the parent?',
      retro: '',
      source: 'New, from policy'
    },
    {
      id: 'n18',
      code: 'N18',
      axis: 'detect',
      name: 'Every rule carries a way of catching a breach',
      plain:
        'Each parameter names how its violation is detected, and any detection that can be written as a lint rule, a fitness function or a compatibility check is written as one.',
      why: 'The set is otherwise a statement of intent. Detectability is the prior condition and automation is what follows from it. A rule whose breach nobody can see gets abandoned without anyone deciding to abandon it.',
      test: 'For each parameter, name its detection and say whether it is automated. Where a person checks something a machine could check, say which, and why it has not been automated.',
      retro: '',
      source: 'From P10, generalised'
    }
  ];

  const axes = [
    { id: 'record', label: 'The record' },
    { id: 'boundary', label: 'Boundaries and authority' },
    { id: 'propagation', label: 'Propagation' },
    { id: 'determination', label: 'Determination' },
    { id: 'interface', label: 'Interface and sourcing' },
    { id: 'obligation', label: 'Obligation and jurisdiction' },
    { id: 'reversibility', label: 'Reversibility' },
    { id: 'reach', label: 'Reach of service' },
    { id: 'continuity', label: 'Continuity and control' },
    { id: 'clocks', label: 'Statutory time' },
    { id: 'adjudicability', label: 'Adjudicability' },
    { id: 'detect', label: 'Detectability' }
  ];

  const filters = [
    { id: 'all', label: 'All twenty-one' },
    { id: 'retro', label: 'Must be right first' },
    { id: 'new', label: 'Added since the source' }
  ];

  let filter = $state('all');
  let selected = $state('n07');

  const shown = $derived(
    params.filter((p) =>
      filter === 'retro' ? p.retro !== '' : filter === 'new' ? p.source.startsWith('New') : true
    )
  );
  const p = $derived(params.find((x) => x.id === selected));
</script>

<div class="set">
  <div class="board">
    <div class="filters" role="group" aria-label="Which parameters to show">
      {#each filters as f}
        <button class="btn" aria-pressed={filter === f.id} onclick={() => (filter = f.id)}
          >{f.label}</button
        >
      {/each}
    </div>

    {#each axes as a}
      {@const inAxis = shown.filter((x) => x.axis === a.id)}
      {#if inAxis.length}
        <section class="axis" aria-labelledby="ax-{a.id}">
          <h3 id="ax-{a.id}">{a.label}</h3>
          <ul>
            {#each inAxis as x}
              <li>
                <button
                  class="chip"
                  class:first={x.retro !== ''}
                  aria-pressed={selected === x.id}
                  onclick={() => (selected = x.id)}
                >
                  <span class="code">{x.code}</span>
                  <span>{x.name}</span>
                  {#if x.retro !== ''}<span class="vh">must be right first</span>{/if}
                </button>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    {/each}
  </div>

  <aside class="detail" aria-live="polite">
    <p class="code-lg">{p.code}</p>
    <h3>{p.name}</h3>
    <p class="plain">{p.plain}</p>
    <dl>
      <dt>Why it cannot be dropped</dt>
      <dd>{p.why}</dd>
      <dt>The test that fails</dt>
      <dd>{p.test}</dd>
      <dt>Where it came from</dt>
      <dd>{p.source}</dd>
      {#if p.retro !== ''}
        <dt>Cannot be added later</dt>
        <dd>{p.retro}</dd>
      {:else if p.partial}
        <dt>Only partly addable later</dt>
        <dd>{p.partial}</dd>
      {/if}
    </dl>
  </aside>
</div>

<style>
  .set {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-raised);
    padding: 1.25rem;
  }
  @media (min-width: 52rem) {
    .set {
      grid-template-columns: 1.25fr 1fr;
      gap: 2rem;
    }
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.4rem;
  }

  .axis + .axis {
    margin-top: 1.1rem;
  }
  .axis h3 {
    margin: 0 0 0.45rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--muted);
    font-family: var(--font-ui);
    letter-spacing: 0;
  }
  .axis ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .chip {
    display: inline-flex;
    align-items: baseline;
    gap: 0.45rem;
    font-family: var(--font-ui);
    font-size: 0.82rem;
    line-height: 1.3;
    min-height: 28px;
    padding: 0.35rem 0.6rem;
    border: 1px solid var(--rule-strong);
    border-left-width: 1px;
    border-radius: var(--radius);
    background: var(--paper);
    cursor: pointer;
    text-align: left;
  }
  /* A parameter that cannot be retrofitted carries a heavy left edge as well
     as its own line in the panel, so the marker is not colour alone. */
  .chip.first {
    border-left-width: 4px;
    border-left-color: var(--ink);
  }
  .chip:hover {
    border-color: var(--ink);
  }
  .chip[aria-pressed='true'] {
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
  }
  .chip[aria-pressed='true'].first {
    border-left-color: var(--rule-strong);
  }
  .code {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--muted);
  }
  .chip[aria-pressed='true'] .code {
    color: var(--paper);
  }

  .vh {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .detail {
    border-top: 2px solid var(--ink);
    padding-top: 0.9rem;
  }
  @media (min-width: 52rem) {
    .detail {
      border-top: 0;
      border-left: 1px solid var(--rule);
      padding: 0 0 0 2rem;
    }
  }
  .code-lg {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted);
    margin: 0 0 0.25rem;
  }
  .detail h3 {
    margin: 0 0 0.5rem;
    font-size: var(--step-1);
  }
  .plain {
    margin: 0 0 1rem;
    font-size: var(--step--1);
    line-height: 1.6;
  }
  .detail dl {
    margin: 0;
    font-size: var(--step--1);
  }
  .detail dt {
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 0.9rem;
  }
  .detail dd {
    margin: 0.2rem 0 0;
    line-height: 1.6;
  }
</style>
