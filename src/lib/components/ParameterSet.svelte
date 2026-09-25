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
      why: 'Without it, nothing downstream can be rebuilt. You cannot replay a decision against evidence when nobody knows what period it covered. And you cannot tell a correction apart from a change in the world.',
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
      why: 'The shape of the payload is what carries provenance across the line. A row arrives with no sign of who claimed it. So the receiver cannot know what it may conclude, and a later correction has nothing to attach to.',
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
      test: 'Does any part read another part’s tables, or depend on a type it does not own? The second question catches the failure that really happens. Shared models come back as schemas, not as databases.',
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
      why: 'Nobody can reason about logic spread across layers, test it, or change it with confidence. You end up unable to say which copy is the authoritative one. Keeping it together also makes validation uniform: no integration or migration script can slip past a rule the data itself enforces.',
      test: 'To see how one business rule works, how many systems do you have to open? If more than one, say which is authoritative, why the others exist, and what generates them.',
      retro: '',
      source: 'From P5, unchanged'
    },
    {
      id: 'n05',
      code: 'N05',
      axis: 'boundary',
      name: 'One writer per record, at every moment',
      plain:
        'One system of record per record, per group of clients, transition included. Not both systems writing and a reconciliation afterwards. And nothing resolves a conflict automatically where the data decides what a person receives.',
      why: 'Resolve a conflict automatically and a merge rule stands in for a policy or a person. Writing from both sides is also how a temporary overlap turns permanent.',
      test: 'For every record in transition, name the one system of record and the group it covers. If the answer is “it depends on the field”, someone has split the work across fields instead of across groups of clients.',
      retro: '',
      source: 'From P9, unchanged'
    },
    {
      id: 'n06',
      code: 'N06',
      axis: 'propagation',
      name: 'Every copy is traceable, and every correction reaches it',
      plain:
        'A part that copies evidence records where it came from. When the source corrects it, you can list everyone holding a copy, and each of them has to act. That holds even where a decision already went out on the old value.',
      why: 'Copying creates this duty, and nothing else discharges it. A design that passes nothing on at all still passes every boundary rule perfectly. It also leaves people paid on a value we know to be wrong.',
      test: 'Correct a fact at its source. Can you list every part holding a copy? Does each one have to act? And does anything raise an alarm when a correction goes unread?',
      retro: 'Provenance has to be written as the copy is made',
      source: 'From P3, the half the source calls load-bearing'
    },
    {
      id: 'n21',
      code: 'N21',
      axis: 'propagation',
      name: 'Limits on use travel with the information',
      plain:
        'Sometimes the ministry may hold a fact but not use it for something. The bar rides on the fact itself and travels with every copy. The system enforces it where the use happens, rather than leaving it to procedure.',
      why: 'Nothing else catches a lawfully held fact reaching a use it was barred from. Policy bars five different things: an attribute, a class of content, a counterparty, a subject matter, and an act of communication. Only the first has anything to do with a calculation.',
      test: 'Does the bar sit on the information rather than in a procedure? Does it survive a copy into another part? Does a read that fails to state its purpose get refused? And does a blocked use leave an event behind?',
      retro: 'A bar absent at capture is absent from every earlier copy',
      source: 'New, from policy'
    },
    {
      id: 'n07',
      code: 'N07',
      axis: 'determination',
      name: 'The calculation reads nothing but its inputs',
      plain:
        'No clock, no database, no service calls inside the decision. It gets everything it needs up front. The record it writes comes out of the decision, and never feeds back into it.',
      why: 'Purity is what makes an identical re-run possible in practice rather than on paper. A rules service that fetches what it needs ties every decision to a running system. That is the first thing a tribunal will probe.',
      test: 'Feed it the same rules, the same engine version and the same inputs. Does it produce a byte-identical trace? Does it touch the clock, the environment or any service on the way?',
      retro: 'The engine must be sealed before the first rule is written',
      source: 'From P8, narrowed to the calculation'
    },
    {
      id: 'n08',
      code: 'N08',
      axis: 'determination',
      name: 'The decision record stands on its own',
      plain:
        'A decision stores which rules version ran against which evidence version. It stores the artefacts themselves rather than pointing at them. It also records what the client asked for, which criteria they met and which they did not, what the ministry assumed, what evidence was missing, and the date the client heard.',
      why: 'A pointer to a running system is not evidence. Replay has to outlive everything that produced the decision, the engine included. The client is also owed the record itself, put together and severed under FOIPPA. Replay alone does not deliver that.',
      test: 'Can you replay a decision made three years ago from storage alone, with nothing running? Can you put together the appeal record and sever it on demand?',
      retro: '',
      source: 'From P2, narrowed to the record'
    },
    {
      id: 'n09',
      code: 'N09',
      axis: 'determination',
      name: 'The snapshot names the moment it was read',
      plain:
        'Gathering the facts means reading stores that update on their own schedules. So the decision records the point in the event sequence it read from. It sets a limit on how far behind a store may be, and refuses to issue outside that limit.',
      why: 'The architecture names the hole in its own text. Two decisions issued moments apart, with one store briefly behind, can each see a different world quite legitimately. Both replay. Both reproduce. They disagree, and nothing else notices.',
      test: 'Does the design name the watermark, write it into the decision record, and hold it to a stated limit? Does a decision outside that limit fail rather than go ahead?',
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
      why: 'This is what makes replacement in pieces possible at all. The interface published today over the old platform is the one published tomorrow over the new services. Confuse the contract with the layer and you bind old vocabulary to the new architecture. That is the failure the programme exists to reverse.',
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
        'Buy, adopt or reuse the common parts: workflow, notification, identity, secrets, policy evaluation, scheduling, document storage, search, print and mail. To build one instead, name a legal, policy or programme need that no off-the-shelf option meets. Someone other than the component’s owner has to agree. Wanting it faster does not count.',
      why: 'Time spent building common capability is time not spent on decisions that reproduce, and that is where the programme will be judged. Without an outside check the test marks its own homework, which is how it fails today.',
      test: 'For every custom-built component, name the legal, policy or programme need that no off-the-shelf option meets. Then name who agreed, other than the builder.',
      retro: '',
      source: 'From P6, with the independent check added'
    },
    {
      id: 'n12',
      code: 'N12',
      axis: 'obligation',
      name: 'Disposition is designed before the first event',
      plain:
        'Decide how records end, per class of fact, before anything is written. A schedule, an indirection, or destroying one person’s key. Publish what survives a destruction, design who holds the keys, and say what a replay does when it meets an event it cannot read.',
      why: 'An append-only store and a legal duty to destroy pull against each other. Settle that after the first event and you are rebuilding, not repairing. The timing is the rule: a correct design that arrives late has failed.',
      test: 'Before the first event, has someone chosen the mechanism for each class of fact and published what survives?',
      retro: 'A store with no disposition design cannot acquire one afterwards',
      source: 'From P11, split'
    },
    {
      id: 'n13',
      code: 'N13',
      axis: 'obligation',
      name: 'Custodianship is modelled, not assumed',
      plain:
        'Whose record it is is an attribute the system reads. The model covers the non-Crown participant class properly rather than approximating it. Handing a record to another sovereign is one of the ways it can end. And sharing agreements are machine-readable artefacts that grant the access rights themselves.',
      why: 'The Declaration on the Rights of Indigenous Peoples Act commits the Province to alignment. A Nation’s governance over its own data will not fit into a retention rule or an access list. A PDF agreement cannot grant an access right, and nobody can audit a right that came from somewhere else.',
      test: 'For any evidence type, can you name its custodian? Does the system read that, or do people just follow a convention? And does every access decision trace back to the agreement registry, and to nothing else?',
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
        'You can move any group of clients back without a data project, and an approved statement says what the return trip loses. Reversibility covers both the mechanism and how much survives.',
      why: 'Other rules bound how long a coexistence runs. Nothing else bounds how much it loses on the way back. A rollback plan that does not say what it loses has not been tested.',
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
      why: 'Nothing else in the set catches a system that is correct, reproducible, well-bounded, and out of reach of the people it exists for. Usage totals hide that failure completely, and it falls on clients and front-line staff.',
      test: 'For each journey, can a person finish it on every supported channel? Does the outcome change with the route? For each interface, has someone tested it with assistive technology, and not just run a scan? A scan catches around 30% of issues.',
      retro: '',
      source: 'New, from the gaps the architecture records'
    },
    {
      id: 'n16',
      code: 'N16',
      axis: 'continuity',
      name: 'Recovery targets are stated per service and proven by exercise',
      plain:
        'Every service carries an availability target and stated recovery times, set against what its failure does to a client. An exercise has to demonstrate them. Shared infrastructure takes the strictest target of anything that depends on it.',
      why: 'Nothing else catches a missing recovery duty. Every recovery figure in the architecture covers the analytics platform. None covers the published interface, the translation layer, the decision service or the case stores. Bringing the system back does not put a missed payment run right.',
      test: 'Name the availability tier and the recovery targets for each service. Then show the exercise result behind them. A figure nobody has measured is not a target.',
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
      why: 'Nothing else says who may exercise an authority. The decision record names what was decided and by whom. It does nothing to stop one person deciding, reviewing and releasing the money. Policy states all three limbs directly.',
      test: 'For every entitlement, name who decides and who reviews, and say what the ministry keeps for itself. Does every decision trace back to the person who reasoned it, as opposed to anyone who advised?',
      retro: '',
      source: 'New, from policy'
    },
    {
      id: 'n19',
      code: 'N19',
      axis: 'clocks',
      name: 'Statutory clocks run in the system',
      plain:
        'The model holds every time limit once: what starts it, how long it runs, which extensions it allows, and who has to authorise each. A breach becomes a recorded event. Where policy attaches a consequence, the system applies it without being asked.',
      why: 'Decide outside the legislated time and eligibility runs from the date the decision was due, not the date it came. So a missed deadline changes what the client is owed. An unmodelled clock is a source of wrong entitlement, not a service-level gap.',
      test: 'Does the model hold each limit once, with its owner, its class, its start event, duration, extensions and authorisations? Does a breach show up without a person spotting it, and does its consequence apply automatically?',
      retro: '',
      source: 'New, from policy'
    },
    {
      id: 'n20',
      code: 'N20',
      axis: 'adjudicability',
      name: 'Whether a decision can be challenged is recorded per entitlement',
      plain:
        'For each entitlement the system records four things: the law it rests on, whether a decision can go to reconsideration, whether it can go to appeal, and to which body. It records them per entitlement and per variant. It never takes them from the parent programme.',
      why: 'The four values move independently, and you cannot work one out from another. Getting it wrong hurts the client either way: you offer a route that does not exist, or you withhold one that does.',
      test: 'For every entitlement and every variant, can the system state the law it rests on, whether it goes to reconsideration, whether it goes to appeal, and to which forum? And can it do that without borrowing any of it from the parent?',
      retro: '',
      source: 'New, from policy'
    },
    {
      id: 'n18',
      code: 'N18',
      axis: 'detect',
      name: 'Every rule carries a way of catching a breach',
      plain:
        'Each parameter names how you catch a breach of it. Anything you could write as a lint rule, a fitness function or a compatibility check gets written as one.',
      why: 'Otherwise the set is just a statement of intent. You have to be able to see a breach first; automating the check comes after. A rule whose breach nobody can see gets abandoned, and nobody ever decides to abandon it.',
      test: 'For each parameter, name the check and say whether it runs automatically. Where a person checks something a machine could check, say which one, and why nobody has automated it.',
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
