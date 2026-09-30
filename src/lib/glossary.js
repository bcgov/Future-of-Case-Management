// Terms used in the parameter panels, keyed by the slug the panels link to.
// The glossary page renders every entry, so every word here is in the copy lock.
// `page` points at the part of the site that shows the idea at work.

export const terms = {
  'accessibility-standard': {
    term: 'Accessibility standard',
    short: 'The rules a screen or form must follow so that people with disabilities can use it.',
    body: [
      'The Province sets a standard for how accessible its online services must be. It is based on the Web Content Accessibility Guidelines (WCAG), an international set of rules. They cover things like text a screen reader can read aloud, colours with enough contrast, and forms you can fill in with a keyboard alone.',
      'N15 asks for this from the first release, not as a fix added later.'
    ]
  },
  appeal: {
    term: 'Appeal',
    short: 'Asking an independent body outside the ministry to look at a decision again.',
    body: [
      'If a client still disagrees after a reconsideration, they can often appeal. An appeal goes to a body outside the ministry, usually a tribunal. Not every decision can be appealed, and not every appeal goes to the same body. That is why N20 records this for each entitlement.'
    ]
  },
  'appeal-record': {
    term: 'Appeal record',
    short: 'Everything the ministry had in front of it when it made a decision, gathered for the client.',
    body: [
      'When a client challenges a decision, policy says the ministry must give them the appeal record. It holds all the submissions, information and records the ministry had when it made the decision. Before the client gets it, some protected details may have to be removed. That step is called severing.',
      'N08 asks that the system can put this record together on demand, rather than staff searching for the pieces by hand.'
    ]
  },
  'assistive-technology': {
    term: 'Assistive technology',
    short: 'Tools people with disabilities use to work a computer or phone, such as screen readers.',
    body: [
      'Examples are screen readers that read the page aloud, software that magnifies the screen, voice control, and switches used instead of a mouse. Automated scans find only about 30% of accessibility problems. The rest show up only when a person tries the service with these tools, which is why N15 asks for real testing.'
    ]
  },
  'automated-check': {
    term: 'Automated check',
    short: 'A test that software runs by itself to catch a rule being broken.',
    body: [
      'Technical teams use several kinds. A lint rule reads the code and flags patterns that break a rule, such as one part reaching into another part’s tables. A fitness function is a test of the whole design, run again and again, that fails if the design drifts away from a goal. A compatibility check compares a new version of an interface with the old one and fails if the change would break anyone who uses it.',
      'N18 says that wherever a rule can be checked this way, it must be. A person then only has to check what a machine cannot.'
    ]
  },
  'availability-target': {
    term: 'Availability target',
    short: 'How much of the time a service must be up and working.',
    body: [
      'It is usually given as a percentage over a month or a year. A service that must be available 99.9% of the time can be down for about 45 minutes a month. N16 asks that each service’s target be set by how much harm an outage does to a client, not picked the same for everything.'
    ]
  },
  'business-rule': {
    term: 'Business rule',
    short: 'A rule about how the ministry’s work is done, such as who qualifies for a benefit.',
    body: [
      'Business rules come from law, policy and practice. “A client must report income by the fifth of the month” is one. N04 asks that each rule lives in one place, with the data it controls, so there is never a question about which copy of the rule is the real one.'
    ]
  },
  channel: {
    term: 'Channel',
    short: 'A way a person reaches the ministry: online, by phone, in person or by mail.',
    body: [
      'N15 asks that a person can finish the same task through every supported channel and get the same result. It also asks that every service has a supported way in that is not online.'
    ]
  },
  'client-group': {
    term: 'Group of clients',
    short: 'A set of clients moved from the old system to the new one together.',
    body: [
      'The new system will not replace the old one in a single day. Clients move across in groups, for example by programme or by region. Architects often call a group like this a cohort. Rules N05 and N14 are written per group, because for each group exactly one system must be in charge, and the group must be able to move back.'
    ]
  },
  'common-tools': {
    term: 'Common tools',
    short: 'Tools almost every organisation needs, like sign-in and document storage, that can be bought rather than built.',
    body: [
      'N11 lists them: workflow (moving work between people), notifications, identity and sign-in, storing passwords and encryption keys safely, policy checks (software that decides whether an action is allowed), scheduling, document storage, search, and print and mail.',
      'Good products for all of these already exist. Building one in-house is allowed only for a need no product meets, and someone outside the team has to agree.'
    ]
  },
  copy: {
    term: 'Copy',
    short: 'A fact one part of the system holds that it took from another part.',
    body: [
      'Parts of the system often keep their own copy of a fact so they can work quickly without asking the source every time. That is normal. The risk is that the source corrects the fact and the copy stays wrong. N06 asks that every copy records where it came from, so a correction can always find it.'
    ]
  },
  correction: {
    term: 'Correction',
    short: 'Fixing a fact that was recorded wrongly, as opposed to a fact that changed.',
    body: [
      'These two are easy to confuse, and they mean different things. A correction says the record was wrong all along: the income was never $900, it was $1,100. A supersession says the world changed: the income was $900 until March and $1,100 after.',
      'Both can leave a client underpaid or overpaid in the past. The difference is who bears it. A supersession the client reported late gives an overpayment the ministry can recover. A correction is judged by whose error it was: a client who hid something is in a different position from a worker who mis-keyed a figure. The old system cannot tell the two apart, which is why N14 says that difference is lost if a group moves back.'
    ],
    page: { href: '/evidence', label: 'Evidence' }
  },
  custodian: {
    term: 'Custodian',
    short: 'The organisation responsible for a record and entitled to decide how it is used.',
    body: [
      'Most records the ministry holds are the provincial government’s. Some are not. A record may belong to an Indigenous Nation or another organisation and be held by the ministry under an agreement. N13 asks that the system stores who the custodian is and acts on it, rather than relying on staff to know.'
    ]
  },
  'data-model': {
    term: 'Data model',
    short: 'A part’s own description of the things it works with, such as a person or a payment.',
    body: [
      'Different parts of the ministry’s work need to know different things about the same person. Payments needs a bank account. A case worker needs contact details. A single shared model tries to hold all of it, and every change then needs everyone to agree.',
      'N03 asks each part to keep its own model instead. The Domains page shows the nineteen parts and what each one owns.'
    ],
    page: { href: '/domains', label: 'Domains' }
  },
  'decision-record': {
    term: 'Decision record',
    short: 'The stored account of a decision: what was decided, on what facts, under which rules.',
    body: [
      'Every decision the system makes is saved with everything needed to explain it later. That includes the version of the rules and of the engine that ran them, a full copy of the facts it used, its reasoning, and the version of the letter template the client was sent. It also records how far through the record of events the decision read (the watermark) and what kind of decision it was, so that a decision needing reasons, or a person’s sign-off, can be told apart from a working sum.',
      'N08 asks that the record holds full copies of all of this, not links to other systems. That way it still makes sense years later, after those systems have changed or gone.'
    ],
    page: { href: '/determinations', label: 'Determinations' }
  },
  determination: {
    term: 'Decision (determination)',
    short: 'The system working out what a client is entitled to under the rules.',
    body: [
      'Architects call this a determination. The system takes the facts about a client and the rules for a benefit, and works out the result: eligible or not, and how much. N07, N08 and N09 are all about making that calculation something you can repeat and explain.'
    ],
    page: { href: '/determinations', label: 'Determinations' }
  },
  disposition: {
    term: 'Destroying records (disposition)',
    short: 'What happens to a record at the end of its life: destroyed, archived or handed over.',
    body: [
      'Records cannot be kept forever. The law sets how long each kind must be kept and what happens after. Architects call this disposition. A record may be destroyed, moved to the archives, or handed to another government that is its rightful custodian.',
      'N12 asks that the way each kind of record ends is decided before the system stores anything, because the method shapes how the records are stored.'
    ]
  },
  dripa: {
    term: 'Declaration on the Rights of Indigenous Peoples Act',
    short: 'The B.C. law that commits the Province to bring its laws in line with the UN Declaration on the Rights of Indigenous Peoples.',
    body: [
      'Passed in 2019, often shortened to DRIPA or the Declaration Act. The UN Declaration recognises Indigenous peoples’ right to govern their own affairs, and that includes information about their own people. A ministry system that treats every record as the Province’s cannot honour that. This is the reason for N13.'
    ]
  },
  entitlement: {
    term: 'Entitlement',
    short: 'A specific benefit or payment a client may qualify for.',
    body: [
      'A programme such as income assistance contains many separate entitlements: a monthly support amount, a shelter amount, and dozens of supplements for things like transportation, dental care or a special diet. Each can have its own rules, its own law behind it, and its own route to challenge a decision. Eligibility is whether a client qualifies for an entitlement, and from what date.'
    ]
  },
  event: {
    term: 'Event',
    short: 'A single thing the system records as having happened, such as a fact recorded or a decision issued.',
    body: [
      'The new system keeps its history as a long list of events, each added to the end and never changed. “The first event” means the first real record the new system stores. Several parameters must be in place before that moment, because once events exist in one shape they cannot be reshaped.'
    ]
  },
  fact: {
    term: 'Fact (evidence)',
    short: 'A piece of information about a client that someone has claimed is true, such as their income.',
    body: [
      'In the new system a fact is never just a value like “$1,100”. It is a claim: who said it, what period it covers, and when the system learned it. The site mostly calls these claims evidence, because they are what a decision rests on. Where it says “fact”, it means a claim of this kind, never a bare value.',
      'The Evidence page shows how this works, with a worked example.'
    ],
    page: { href: '/evidence', label: 'Evidence' }
  },
  foippa: {
    term: 'FOIPPA',
    short: 'The Freedom of Information and Protection of Privacy Act, B.C.’s main privacy and access law.',
    body: [
      'It gives people the right to see records the government holds, including records about themselves. It also protects other people’s personal information. When the ministry releases a record, FOIPPA decides which details must be removed first.'
    ]
  },
  interface: {
    term: 'Interface',
    short: 'The agreed way one system asks another for information or asks it to do something.',
    body: [
      'An interface is like a published contract. It says what you can ask for, in what form, and what you get back. Other systems are built to rely on it, so it has to stay stable for a long time.',
      'N10 asks that interfaces use the ministry’s own words, so that the product behind one can be swapped out without anyone who uses it noticing.'
    ]
  },
  'key-destruction': {
    term: 'Destroying the key (crypto-shredding)',
    short: 'Locking one person’s records with their own key, then destroying the key to make the records unreadable.',
    body: [
      'Each person’s records are scrambled (encrypted) with a key that belongs to them alone. When the records must be destroyed, the system destroys the key. The scrambled data can stay in place, but nobody can read it ever again. This lets a permanent history meet a legal duty to destroy.',
      'N12 allows it for a small number of kinds of fact, each named, where a duty to destroy one person’s records can be foreseen. It is never the default. It needs careful planning about who holds the keys and how destruction is proven.'
    ]
  },
  'legacy-assertion-time': {
    term: 'Legacy assertion time',
    short: 'When the old system recorded a fact, for records moved from it.',
    body: [
      'Records moved from the old system all arrive in the new one on the same day. If that day were used as the date the ministry learned each fact, fifteen years of history would look as though it arrived at once. So each moved fact keeps a third date: when the old system recorded it. It carries a confidence marker, because the old record often cannot show it. Where the date is unknown, the system says so rather than guessing.',
      'N01 asks for all three dates on every fact: valid time, transaction time and this one.'
    ],
    page: { href: '/evidence', label: 'Evidence' }
  },
  'legal-time-limit': {
    term: 'Legal time limit',
    short: 'A deadline set in law or policy, such as the time the ministry has to decide.',
    body: [
      'Many steps in the ministry’s work have a deadline. A client has 20 business days to ask for a reconsideration. The ministry then has 10 business days to decide, or 20 with an approved extension. Some limits count business days and some count calendar days.',
      'Missing some limits changes what the client is owed. That makes them part of the entitlement, not just a service standard, which is why N19 asks the system to track them.'
    ]
  },
  migration: {
    term: 'Data load (migration)',
    short: 'Moving existing records from the old system into the new one.',
    body: [
      'Migration scripts copy large amounts of data in bulk. If a rule is enforced only by the screens staff use, a bulk load can skip right past it. N04 asks that the data enforce its own rules, so every route in is checked.'
    ]
  },
  'old-system': {
    term: 'The old system (ICM and MIS)',
    short: 'The two systems that do the ministry’s case work today, and that the new system will replace.',
    body: [
      'ICM, short for Integrated Case Management, is a customer relationship management product adapted for government. MIS is a mainframe built in 1982. The two run side by side and share the core programs between them, so the site calls them together “the old system”.',
      'For years the old and new systems will run side by side while groups of clients move across. The Current State page explains how the work is done today.'
    ],
    page: { href: '/current-state', label: 'Current State' }
  },
  parameter: {
    term: 'Parameter',
    short: 'A rule the design must follow, written so a reviewer can check whether it does.',
    body: [
      'Each parameter comes with a question you can ask of the running system. If the answer is wrong, the design has broken the rule. There are twenty-one. Each has a code from N01 to N21, which matches the full statement in the architecture documents.'
    ],
    page: { href: '/parameters', label: 'Parameters' }
  },
  part: {
    term: 'Part of the system (domain)',
    short: 'One area of the ministry’s work, with its own data and its own rules, such as Payments or Overpayments.',
    body: [
      'The new system is built as separate parts, each responsible for one area of the work. Architects call these domains. Each part owns its own data. Parts talk to each other only by sending facts and decisions, never by reaching into each other’s databases.'
    ],
    page: { href: '/domains', label: 'Domains' }
  },
  'permanent-history': {
    term: 'Permanent history (append-only store)',
    short: 'A store where new records are only ever added to the end, and nothing is overwritten.',
    body: [
      'Instead of changing a record in place, the system adds a new entry saying what changed. That keeps a full history, which is what lets a decision be replayed. But it clashes with the legal duty to destroy some records, and N12 exists to settle that clash before the first record is stored.'
    ]
  },
  'practice-run': {
    term: 'Practice run (recovery exercise)',
    short: 'Deliberately taking a service down to prove it can be brought back within its targets.',
    body: [
      'A recovery plan that has never been tried is a guess. In a practice run the team simulates a failure, restores the service, and measures how long it took and how much data was lost. N16 counts a recovery target as real only once a practice run has met it.'
    ]
  },
  provenance: {
    term: 'Source (provenance)',
    short: 'Where a fact came from: who said it, and which record it was taken from.',
    body: [
      'Architects call this provenance. It is what lets you judge how far to trust a fact, and what lets a correction find every copy that needs fixing. Once a fact is passed on without it, it cannot be added back later.'
    ]
  },
  reconsideration: {
    term: 'Reconsideration',
    short: 'A client’s first step to challenge a decision: asking the ministry to look at it again.',
    body: [
      'A reconsideration is done inside the ministry, by staff who had no part in the original decision. A client usually has 20 business days to ask for one. Some decisions cannot be reconsidered, and N20 asks the system to record which.'
    ]
  },
  'recovery-targets': {
    term: 'Recovery targets',
    short: 'How quickly a service must be back after a failure, and how much recent data it may lose.',
    body: [
      'There are two. The recovery time is how long the service may be down before it must be working again. The recovery point is how much recent work may be lost: a recovery point of one hour means at most the last hour of changes. Technical teams call these the RTO and the RPO.',
      'For payments the architecture sets the recovery point at zero: no payment data may be lost at all.'
    ]
  },
  replay: {
    term: 'Replay',
    short: 'Running a past decision again, from its stored inputs, to show exactly how it was reached.',
    body: [
      'If a client appeals a decision made years ago, the ministry has to show what it decided and why. Replay means feeding the same rules and the same facts back through the same calculation, and getting exactly the same answer.',
      'That only works if the calculation used nothing but its inputs (N07), and if every input was saved (N08).'
    ],
    page: { href: '/determinations', label: 'Determinations' }
  },
  'retention-schedule': {
    term: 'Retention schedule',
    short: 'The official list of how long each kind of government record must be kept.',
    body: [
      'Government records are kept for set periods and then destroyed or archived. A schedule might say case files are kept for a set number of years after the case closes. Deleting a whole kind of record when its time comes is the default method in N12, and most kinds of record end this way.'
    ]
  },
  rollback: {
    term: 'Moving back (rollback)',
    short: 'Returning a group of clients from the new system to the old one if something goes wrong.',
    body: [
      'Any large change needs a way back. N14 asks that moving a group back needs no special data project, and that an approved statement lists what information would not survive the trip. The old system cannot hold some of what the new one records, so something is always lost. The question is whether everyone knows what.'
    ]
  },
  'rules-engine': {
    term: 'Rules engine',
    short: 'The software that applies the entitlement rules to a client’s facts to reach a decision.',
    body: [
      'The rules for each benefit are written down in a form a computer can follow. The rules engine takes those rules and a client’s facts, and works out the result. Each version of the rules, and each version of the engine, is kept, so an old decision can be replayed exactly as it was made.',
      'N07 asks that the engine is sealed off: it may use only what it is handed, never the clock, a database or another service.'
    ]
  },
  schema: {
    term: 'Database layout (schema)',
    short: 'The structure of a database: its tables, its columns, and what each one holds.',
    body: [
      'Technical teams call this a schema. When one part sends another a copy of its database rows, or relies on its layout, the two become tied together. Neither can change its layout without breaking the other. N02, N03 and N10 all guard against this.'
    ]
  },
  'separate-storage': {
    term: 'Keeping personal details separately',
    short: 'Storing the details that identify a person in one place, and only a reference to them everywhere else.',
    body: [
      'Instead of writing a person’s name and details into every record, the history holds a reference number. The details live in one separate store. Deleting them there makes every record that points to them anonymous. Architects call this indirection. It is one of the methods N12 allows, chosen for each kind of fact.'
    ]
  },
  'separation-of-duties': {
    term: 'Separation of duties',
    short: 'Making sure no one person controls every step, so each step checks the one before.',
    body: [
      'Policy sets three separations. The person who reviews a decision cannot be the one who made it. The person who speaks for the ministry at an appeal cannot be either of them. And working out a payment, approving it and releasing it are done by different people. N17 asks the system to enforce these, rather than leaving it to rosters.'
    ]
  },
  severing: {
    term: 'Severing',
    short: 'Removing protected details from a record before it is released.',
    body: [
      'A record given to a client can contain information they are not entitled to see, such as details about another person. FOIPPA says which details must be removed first. Doing this by hand on a large record is slow and easy to get wrong. N08 asks that the decision record can be severed on demand.'
    ]
  },
  'sharing-agreement': {
    term: 'Data-sharing agreement',
    short: 'A formal agreement setting out what information one organisation may share with another, and why.',
    body: [
      'Today these agreements are usually signed documents. Staff read them and then set up access by hand. N13 asks that each agreement is also written in a form the system can read, and that the system grants access from the agreement itself. That way every access can be traced to an agreement and checked.'
    ]
  },
  store: {
    term: 'Store',
    short: 'A place where data is kept, such as a database.',
    body: [
      'The new system has many stores. Some are built to answer questions quickly and are refreshed from the main history a moment after it changes. That short delay is normal, but it means a store can be briefly behind. N09 is about what a decision must do about that.'
    ]
  },
  'system-of-record': {
    term: 'System of record',
    short: 'The one system in charge of a record, whose version counts when there is a disagreement.',
    body: [
      'While the old and new systems run side by side, the same record may exist in both. N05 says only one of them may change it at a time, for each group of clients. The other system can read it, but cannot write to it.'
    ]
  },
  transition: {
    term: 'Transition',
    short: 'The years when the old and new systems run side by side while clients move across.',
    body: [
      'Replacing a system this size is done in stages. During the transition, some clients are in the new system and some are still in the old one. Most of the risk in a replacement sits here, and several parameters are written for it.'
    ]
  },
  'translation-layer': {
    term: 'Translation layer',
    short: 'Temporary software that lets the new interfaces talk to the old system.',
    body: [
      'The new interfaces use the ministry’s words. The old system uses its own. The translation layer sits between them and converts one into the other. Architects call it an anti-corruption layer, because it stops the old system’s way of doing things leaking into the new design.',
      'It is meant to be thrown away once the old system is gone. N10 asks that nobody mistakes it for something permanent.'
    ],
    page: { href: '/choices', label: 'Choices' }
  },
  'transaction-time': {
    term: 'Transaction time',
    short: 'When the system learned a fact.',
    body: [
      'This is the date the fact was recorded, which is often later than when it became true. Together with valid time, it lets the ministry answer two separate questions a tribunal will ask: what was true, and what did the ministry know at the time? For records moved from the old system, this is the date they were moved. A third date, legacy assertion time, holds when the old system recorded them.'
    ],
    page: { href: '/evidence', label: 'Evidence' }
  },
  tribunal: {
    term: 'Tribunal',
    short: 'An independent body that hears appeals against ministry decisions.',
    body: [
      'For most income and disability assistance decisions, this is the Employment and Assistance Appeal Tribunal. Some entitlements go to a different body, which is why N20 records the body for each one.',
      'A tribunal will ask how a decision was reached and what the ministry knew at the time. Several parameters exist so the ministry can answer from the record rather than from memory.'
    ]
  },
  'use-limit': {
    term: 'Limit on use',
    short: 'A rule that the ministry may hold a piece of information but not use it for a particular purpose.',
    body: [
      'Holding information lawfully is not the same as being allowed to use it for anything. Policy sometimes bars a use: a detail that must not count in a calculation, content that must not be shared with a certain party, a subject that must not be raised. N21 asks that the limit stays attached to the information, so it goes with every copy and the system can enforce it.'
    ]
  },
  'valid-time': {
    term: 'Valid time',
    short: 'The period during which a fact was true in the world.',
    body: [
      'A client’s income of $1,100 might be true from March to June. That period is its valid time. It is separate from when the ministry found out, which is transaction time, and from when the old system recorded it, which is legacy assertion time. Keeping all three lets the ministry recalculate the past correctly when it learns something late.'
    ],
    page: { href: '/evidence', label: 'Evidence' }
  },
  variant: {
    term: 'Variant',
    short: 'A version of an entitlement with its own conditions, such as a supplement for one group of clients.',
    body: [
      'Some entitlements come in several forms. A variant can differ from its parent in who hears an appeal, or even in whether it can be reconsidered at all. N20 records these details for each variant, and never copies them from the parent.'
    ]
  },
  watermark: {
    term: 'Watermark',
    short: 'A marker recording exactly how far through the system’s history a decision read.',
    body: [
      'A decision reads its facts from a store that is filled from several streams of events, each updating on its own schedule. The watermark is the point in time up to which that store has applied every event from every one of those streams. It is set by the stream furthest behind. It is not the last event the decision happened to see, because a later event can arrive while an earlier one is still missing.',
      'Writing the watermark into the decision record shows exactly which version of the facts the decision was based on. Setting a limit on how far behind a store may be stops a decision being made from an out-of-date view.'
    ]
  }
};
