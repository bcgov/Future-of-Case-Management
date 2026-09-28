<script module>
  // The twenty-one parameters, grouped by the axis each one occupies. A chip
  // carries its code so the detail panel can be cited; the retrofit marker is
  // text as well as a border, because colour is never the only signal here.
  export const params = [
    {
      id: 'n01',
      code: 'N01',
      axis: 'record',
      name: 'Every fact is dated and has a source',
      plain:
        'The system never stores a fact on its own. With every fact it keeps four things: who reported it, the period of time it was true for, the date this system learned it, and the date the old system recorded it. If the old system’s date can’t be read, the record says so.',
      why: 'Without these dates, nothing later can be rebuilt. You can’t re-check a decision if you don’t know what period its facts covered. And you can’t tell whether a value changed because the world changed, or because someone fixed a mistake.',
      test: 'Pick any fact. Can you say when it was true, when this system learned it, and what the old system said? Can you point to the record it came from?',
      retro: '',
      partial:
        'The first two dates can be added later. The old system’s date cannot. It has to be in place before the new system records its first real event.',
      source: 'Principle 1, split in two',
      terms: ['fact', 'valid-time', 'transaction-time', 'old-system', 'correction', 'event']
    },
    {
      id: 'n02',
      code: 'N02',
      axis: 'record',
      name: 'Parts of the system share facts and decisions, not raw data',
      plain:
        'When one part of the system sends something to another, it sends a fact with its source, or a decision. It doesn’t send rows copied out of its database, ID numbers only it understands, or the raw results of a search.',
      why: 'A fact carries a note of where it came from. A database row doesn’t. The part that receives a bare row can’t tell who said it, so it can’t know what it is safe to conclude. And if the source later fixes the value, there is nothing to attach the fix to.',
      test: 'Read every message one part sends to another. Does any of it copy the sender’s database layout, use an ID only the sender understands, or hand over search results instead of a fact?',
      retro: '',
      source: 'Principle 1, split in two',
      terms: ['part', 'fact', 'provenance', 'schema', 'correction']
    },
    {
      id: 'n03',
      code: 'N03',
      axis: 'boundary',
      name: 'Each part keeps its own picture of the data',
      plain:
        'Each part of the system keeps its own description of a person, a case or a payment. There is no single shared “Person” record that every part must use. No part shares a database layout with another, reads another part’s tables, or relies on a data type that another part defines.',
      why: 'When every part shares one model, any change to it has to wait for everyone who uses it. One team’s release holds up all the others. ICM ran into exactly this: it had to merge its last two phases and drop child protection from its scope.',
      test: 'Does any part read another part’s tables, or rely on a data type another part owns? The second question matters more. A shared model rarely comes back as a shared database. It comes back as a shared layout that everyone copies.',
      retro: '',
      source: 'Principle 4, plus a piece of Principle 3',
      terms: ['part', 'data-model', 'schema', 'old-system']
    },
    {
      id: 'n04',
      code: 'N04',
      axis: 'boundary',
      name: 'Rules live with the data they control',
      plain:
        'The part that holds the data also enforces the rules about that data. A rule is not split up between the database, a settings table and steps that staff just know to follow.',
      why: 'If a rule is spread across several places, nobody can understand it, test it or change it safely. Soon nobody can say which version of the rule is the real one. Keeping a rule with its data also means everything that writes to the data is checked the same way. A data load or a link from another system can’t slip past a rule the data enforces itself.',
      test: 'To see how one business rule works, how many systems do you have to open? If it’s more than one, say which is the real source, why the others exist, and how they are produced from it.',
      retro: '',
      source: 'Principle 5, unchanged',
      terms: ['business-rule', 'part', 'migration']
    },
    {
      id: 'n05',
      code: 'N05',
      axis: 'boundary',
      name: 'Only one system can change a record at a time',
      plain:
        'Every record has one system in charge of it: its system of record. That holds for each group of clients, and it still holds while clients move from the old system to the new one. The two systems never both make changes and sort out the differences afterwards. And where the data affects what a person receives, no automatic process decides which version wins.',
      why: 'If software settles a conflict on its own, a merge rule ends up making a choice that belongs to policy or to a person. And letting both systems make changes is how a short overlap quietly becomes permanent.',
      test: 'For every record being moved, name the one system of record and the group of clients it covers. If the answer is “it depends on the field”, someone has divided the work by field instead of by group of clients.',
      retro: '',
      source: 'Principle 9, unchanged',
      terms: ['system-of-record', 'client-group', 'transition']
    },
    {
      id: 'n06',
      code: 'N06',
      axis: 'propagation',
      name: 'Every copy can be traced, and every correction reaches it',
      plain:
        'When one part copies a fact from another, it records where the copy came from. If the source later corrects the fact, you can list everyone who holds a copy, and each of them has to deal with the change. That is true even when a decision has already gone out based on the old value.',
      why: 'Making a copy creates this duty, and only this rule makes sure it is met. A design where parts share nothing at all would pass every other rule about how parts connect. It would also leave people being paid on a value we know is wrong.',
      test: 'Correct a fact at its source. Can you list every part that holds a copy? Does each one have to act on the correction? And does something raise an alarm if a correction goes unread?',
      retro: 'Where a copy came from has to be written down at the moment it is made',
      source: 'Principle 3: the half the architecture says everything else rests on',
      terms: ['copy', 'provenance', 'correction', 'part']
    },
    {
      id: 'n21',
      code: 'N21',
      axis: 'propagation',
      name: 'Limits on how information may be used travel with it',
      plain:
        'Sometimes the ministry is allowed to hold a piece of information but not to use it for a certain purpose. That limit is attached to the information itself, and it goes with every copy. The system enforces the limit at the moment someone tries to use the information. It doesn’t rely on staff remembering a procedure.',
      why: 'No other rule catches information the ministry holds lawfully being put to a use it is barred from. Policy limits five different kinds of things: a single detail in a record, a type of content, who the information goes to, a subject, and a way of communicating. Only the first has anything to do with a calculation.',
      test: 'Is the limit attached to the information, not written in a procedure? Does it stay attached when the information is copied to another part? If someone asks for the information without saying why, are they refused? And when a use is blocked, is that recorded?',
      retro: 'A limit missing when information is first collected is missing from every copy made before it was added',
      source: 'New, from ministry policy',
      terms: ['use-limit', 'copy', 'part', 'event']
    },
    {
      id: 'n07',
      code: 'N07',
      axis: 'determination',
      name: 'The calculation uses only what it is given',
      plain:
        'While the system works out a decision, it doesn’t check the clock, look anything up in a database or call any other service. Everything it needs is handed to it at the start. The decision record is written from the result, and never feeds back into the calculation.',
      why: 'This is what makes it possible to re-run a decision and get exactly the same answer, in practice and not just in theory. A rules service that fetches its own information ties every decision to systems that must still be running. That is the first thing a tribunal will look at.',
      test: 'Give it the same rules, the same version of the engine and the same inputs. Do you get exactly the same result, down to the last character? Does it read the clock, its settings or any other service along the way?',
      retro: 'The rules engine has to be sealed off before anyone writes the first rule',
      source: 'Principle 8, narrowed to the calculation',
      terms: ['determination', 'rules-engine', 'replay', 'decision-record', 'tribunal']
    },
    {
      id: 'n08',
      code: 'N08',
      axis: 'determination',
      name: 'The decision record is complete on its own',
      plain:
        'Each decision stores which version of the rules was used and which version of the facts. It stores full copies of them, not links to them. It also records what the client asked for, which requirements they met and which they didn’t, what the ministry assumed, what evidence was missing, and the date the client was told.',
      why: 'A link to a system that is still running is not proof. You have to be able to replay a decision long after the systems that made it are gone, the rules engine included. The client also has a right to the record itself, gathered together, with protected details removed as FOIPPA requires. Being able to replay a decision doesn’t give them that.',
      test: 'Can you replay a decision made three years ago using only what is stored, with no systems running? Can you put together the appeal record, and remove the protected details, whenever someone asks?',
      retro: '',
      source: 'Principle 2, narrowed to the record',
      terms: ['decision-record', 'fact', 'replay', 'rules-engine', 'appeal-record', 'severing', 'foippa']
    },
    {
      id: 'n09',
      code: 'N09',
      axis: 'determination',
      name: 'A decision records the moment its facts were read',
      plain:
        'To gather the facts for a decision, the system reads from several stores. Each store updates on its own schedule, so some may be a little behind. The decision records the exact point it read up to. There is a limit on how far behind a store may be, and if one is further behind than that, the system won’t issue the decision.',
      why: 'The architecture points out this gap itself. Two decisions made moments apart can each see a different set of facts if one store is briefly behind. Both can be replayed. Both give the same answer every time. But they disagree with each other, and no other rule would notice.',
      test: 'Does the design name the point each decision read up to (the watermark), write it into the decision record, and set a limit on how far behind a store can be? If a store is past that limit, does the decision stop instead of going ahead?',
      retro: 'In practice: the watermark has to be in the very first decision record',
      source: 'New: the architecture named the gap but had no rule for it',
      terms: ['store', 'watermark', 'event', 'decision-record', 'replay']
    },
    {
      id: 'n10',
      code: 'N10',
      axis: 'interface',
      name: 'The interface outlasts the system behind it',
      plain:
        'Published interfaces use the words of policy and of the ministry’s work, not the terms of whatever product sits behind them. The interface is meant to last. The translation layer that connects it to the old system is temporary, and the team that runs it is set up to wind down.',
      why: 'This is what makes it possible to replace the old system one piece at a time. The interface published today in front of the old system is the same one published later in front of the new services. Mix up the interface with the translation layer and you tie the old system’s words to the new design. That is the very problem the programme exists to fix.',
      test: 'Could a reviewer tell from the interface’s definition which product is behind it? Now take the product away. How many changes does the interface need?',
      retro: '',
      source: 'Principle 7, unchanged',
      terms: ['interface', 'translation-layer', 'old-system', 'schema']
    },
    {
      id: 'n11',
      code: 'N11',
      axis: 'interface',
      name: 'Buy common tools, and have someone else check any choice to build',
      plain:
        'For common tools, buy one, adopt one or reuse one. That covers workflow, notifications, sign-in, storing passwords and keys, policy checks, scheduling, document storage, search, and print and mail. To build one instead, name a legal, policy or programme need that no ready-made product meets. Someone other than the team that would own it has to agree. Wanting it sooner is not a reason.',
      why: 'Time spent building tools that already exist is time not spent on getting decisions right, and that is what the programme will be judged on. Without someone else checking, the team marks its own homework. That is how this goes wrong today.',
      test: 'For every tool built in-house, name the legal, policy or programme need that no ready-made product meets. Then name who agreed to it, other than the people who built it.',
      retro: '',
      source: 'Principle 6, with the outside check added',
      terms: ['common-tools', 'replay']
    },
    {
      id: 'n12',
      code: 'N12',
      axis: 'obligation',
      name: 'How records are destroyed is decided before anything is stored',
      plain:
        'Before the system stores anything, decide how each kind of fact will be destroyed when its time comes. There are three ways: delete a whole kind of record on a set schedule, keep personal details in a separate place that can be deleted, or lock one person’s records with a key and then destroy the key. Publish what is left after a record is destroyed. Plan who holds the keys. And say what a replay does when it reaches a record it can no longer read.',
      why: 'The system keeps a permanent history that is never changed. The law sometimes requires records to be destroyed. Those two pull against each other. Settle it after the first record is stored and you are rebuilding, not repairing. Timing is the whole point: a correct plan that arrives late has still failed.',
      test: 'Before the first real event, has someone chosen how each kind of fact will be destroyed, and published what survives?',
      retro: 'A store built without a plan for destroying records can’t get one later',
      source: 'Principle 11, split in two',
      terms: ['disposition', 'permanent-history', 'retention-schedule', 'separate-storage', 'key-destruction', 'replay', 'event']
    },
    {
      id: 'n13',
      code: 'N13',
      axis: 'obligation',
      name: 'The system knows whose record it is',
      plain:
        'Who is responsible for a record, its custodian, is something the system stores and reads, not something people just know. The system properly handles records that belong to someone other than the provincial government, such as an Indigenous Nation, instead of forcing them into the wrong shape. Handing a record over to another government is one of the ways a record can leave the system. And data-sharing agreements are written so the system can read them, and they are what grant access.',
      why: 'Under the Declaration on the Rights of Indigenous Peoples Act, the Province has committed to bringing its laws in line with the UN Declaration. A Nation’s control over its own data can’t be squeezed into a retention rule or a list of who has access. A PDF agreement can’t grant anyone access. And if access comes from anywhere other than the agreement, nobody can check it.',
      test: 'For any kind of fact, can you name its custodian? Does the system read that, or do people just follow a habit? And can every decision about access be traced to the register of agreements, and to nothing else?',
      retro: '',
      partial: 'Partly. The architecture says part of it can be added later, but not which part.',
      source: 'Principle 11, split in two',
      terms: ['custodian', 'dripa', 'sharing-agreement', 'disposition']
    },
    {
      id: 'n14',
      code: 'N14',
      axis: 'reversibility',
      name: 'Every move can be undone, and what is lost is written down',
      plain:
        'Any group of clients moved to the new system can be moved back to the old one without a separate data project. An approved statement says what information would be lost on the way back. Being able to undo a move means both having a way to do it and knowing how much survives.',
      why: 'Other rules limit how long the old and new systems run side by side. Only this one limits how much is lost when moving back. A plan to move back that doesn’t say what it loses hasn’t really been tested.',
      test: 'Can this group go back to the old system today, without a data project? Can you name every kind of fact that wouldn’t survive the trip? The old system has no way to tell a correction from a later update. If that isn’t on the list, the list isn’t complete.',
      retro: 'If nobody proves a move can be undone, you find out it can’t only when you need to',
      source: 'Principle 12, unchanged',
      terms: ['client-group', 'rollback', 'correction', 'old-system']
    },
    {
      id: 'n15',
      code: 'N15',
      axis: 'reach',
      name: 'Everyone can use the service, whatever their ability or way in',
      plain:
        'A person can get the same result whatever their disability and whichever way they contact the ministry. Screens and forms meet the Province’s accessibility standard from the first release. And every service has a supported way to use it that isn’t online.',
      why: 'No other rule catches a system that works correctly and reliably but that the people it serves can’t reach. Counts of how many people used a service hide this completely. The cost falls on clients and on front-line staff.',
      test: 'For each service, can a person finish it through every supported channel? Does the result change depending on the route? For each screen, has a person tested it with assistive technology, and not just run an automated scan? A scan catches only about 30% of problems.',
      retro: '',
      source: 'New: fills a gap the architecture had already noted',
      terms: ['channel', 'accessibility-standard', 'assistive-technology']
    },
    {
      id: 'n16',
      code: 'N16',
      axis: 'continuity',
      name: 'Each service has recovery targets, proven in practice runs',
      plain:
        'Every service has a target for how much of the time it must be working, and limits on how long it can be down and how much recent data it can lose. These targets depend on how much harm an outage does to a client. A practice run has to show the targets can be met. Anything shared by several services must meet the strictest target of any of them.',
      why: 'No other rule makes sure recovery is planned. Every recovery figure in the architecture covers the reporting and analytics platform. None covers the published interface, the translation layer, the decision service or the case records. And getting the system running again doesn’t fix a payment run that was missed.',
      test: 'Name the availability level and the recovery targets for each service. Then show the practice-run results that back them up. A number nobody has measured is not a target.',
      retro: '',
      source: 'New: fills a gap the architecture had already noted. Still a proposal.',
      terms: ['availability-target', 'recovery-targets', 'practice-run', 'interface', 'translation-layer']
    },
    {
      id: 'n17',
      code: 'N17',
      axis: 'continuity',
      name: 'Different people decide, review and pay',
      plain:
        'The person who makes a decision can’t also review it, or speak for the ministry when it is appealed. Someone making a decision can ask for advice, but can’t let that advice replace their own thinking. All payments go through one checkpoint, where working out the amount, approving it and releasing it are done by different people.',
      why: 'No other rule says who is allowed to use which power. The decision record shows what was decided and by whom. But it does nothing to stop one person deciding, reviewing and releasing the money. Policy sets out all three of these separations directly.',
      test: 'For every entitlement, name who decides and who reviews, and say which powers the ministry keeps for itself. Can every decision be traced to the person who actually reasoned it through, rather than someone who only gave advice?',
      retro: '',
      source: 'New, from ministry policy',
      terms: ['separation-of-duties', 'reconsideration', 'appeal', 'entitlement', 'decision-record']
    },
    {
      id: 'n19',
      code: 'N19',
      axis: 'clocks',
      name: 'The system tracks legal time limits',
      plain:
        'The system holds every legal time limit in one place: what starts the clock, how long it runs, what extensions are allowed, and who must approve each one. Missing a deadline is recorded as an event. Where policy says missing it has a consequence, the system applies it without anyone having to ask.',
      why: 'If the ministry decides after the legal deadline, the client’s eligibility counts from the date the decision was due, not the date it was made. So a missed deadline changes what the client is owed. A time limit the system doesn’t track leads to wrong payments, not just slow service.',
      test: 'Does the system hold each limit once, with who owns it, what kind it is, what starts it, how long it runs, and its extensions and approvals? Does a missed deadline show up without a person having to spot it? Does its consequence apply automatically?',
      retro: '',
      source: 'New, from ministry policy',
      terms: ['legal-time-limit', 'entitlement', 'event']
    },
    {
      id: 'n20',
      code: 'N20',
      axis: 'adjudicability',
      name: 'Each benefit records whether and how a decision can be challenged',
      plain:
        'For each entitlement, the system records four things: the law it is based on, whether a decision can be reconsidered, whether it can be appealed, and who hears the appeal. It records these for each entitlement and each variant of it. It never assumes they are the same as for the wider programme the entitlement belongs to.',
      why: 'The four answers can each be different, and you can’t work one out from another. Getting them wrong hurts the client either way: you offer a way to challenge a decision that doesn’t exist, or you hide one that does.',
      test: 'For every entitlement and every variant, can the system state the law it is based on, whether it can be reconsidered, whether it can be appealed, and who hears the appeal? Can it do that without borrowing any of it from the wider programme?',
      retro: '',
      source: 'New, from ministry policy',
      terms: ['entitlement', 'variant', 'reconsideration', 'appeal', 'tribunal']
    },
    {
      id: 'n18',
      code: 'N18',
      axis: 'detect',
      name: 'Every rule comes with a way to catch it being broken',
      plain:
        'Each parameter says how you would find out it has been broken. Where software could do that check automatically, it has to be built as an automated check.',
      why: 'Without this, the list is just good intentions. First you need to be able to see when a rule is broken; automating the check comes after. A rule that nobody can see being broken slowly stops being followed, without anyone ever choosing to drop it.',
      test: 'For each parameter, name the check and say whether it runs automatically. Where a person checks something a computer could, say which one, and why nobody has automated it.',
      retro: '',
      source: 'Principle 10, made to apply to every rule',
      terms: ['automated-check', 'parameter']
    }
  ];
</script>

<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { terms } from '$lib/glossary.js';

  const axes = [
    { id: 'record', label: 'The record' },
    { id: 'boundary', label: 'Boundaries between parts' },
    { id: 'propagation', label: 'Copies and corrections' },
    { id: 'determination', label: 'Making a decision' },
    { id: 'interface', label: 'Interfaces and buying' },
    { id: 'obligation', label: 'Keeping and destroying records' },
    { id: 'reversibility', label: 'Moving back' },
    { id: 'reach', label: 'Access for everyone' },
    { id: 'continuity', label: 'Recovery and separate duties' },
    { id: 'clocks', label: 'Legal time limits' },
    { id: 'adjudicability', label: 'Challenging a decision' },
    { id: 'detect', label: 'Catching a breach' }
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

  // The glossary links back here as #n06, so open that parameter on arrival.
  function fromHash() {
    const id = location.hash.slice(1);
    if (params.some((x) => x.id === id)) {
      filter = 'all';
      selected = id;
      document.getElementById('parameter-detail')?.scrollIntoView({ block: 'start' });
    }
  }
  onMount(() => {
    fromHash();
    addEventListener('hashchange', fromHash);
    return () => removeEventListener('hashchange', fromHash);
  });
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

  <aside class="detail" id="parameter-detail" aria-live="polite">
    <p class="code-lg">{p.code}</p>
    <h3>{p.name}</h3>
    <p class="plain">{p.plain}</p>
    <dl>
      <dt>Why it is needed</dt>
      <dd>{p.why}</dd>
      <dt>How to check it</dt>
      <dd>{p.test}</dd>
      <dt>Where it came from</dt>
      <dd>{p.source}</dd>
      {#if p.retro !== ''}
        <dt>Cannot be added later</dt>
        <dd>{p.retro}</dd>
      {:else if p.partial}
        <dt>Can only partly be added later</dt>
        <dd>{p.partial}</dd>
      {/if}
      <dt>Words explained in the glossary</dt>
      <dd>
        <ul class="terms">
          {#each p.terms as t}
            <li><a href="{base}/glossary#{t}">{terms[t].term}</a></li>
          {/each}
        </ul>
      </dd>
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
    scroll-margin-top: 5rem;
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
  .terms {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.15rem 0.9rem;
  }
  .terms a {
    display: inline-block;
    min-height: 24px;
    line-height: 24px;
  }
</style>
