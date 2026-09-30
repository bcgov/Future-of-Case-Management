// The parts of the solution, what each needs, and who offers products for it.
//
// This is a description of the market, not an assessment of it. Keep it that
// way: no scores, rankings, prices, pros and cons, or pass/fail results here.
// Offerings are listed alphabetically by organisation. The evaluation lives in
// the project's research artefact, which is not published on this site.
//
// `req` entries are [page, id]: they link to the requirement cards.

export const common = [
  {
    text: 'Protected data is kept in Canada, and the most sensitive data is stored on-premise.',
    req: [['quality', 'NFR-C-004']]
  },
  {
    text: 'A product sits inside one context, behind that context’s published contract, and exchanges only evidence and decisions with other contexts.',
    req: [['quality', 'NFR-I-002']]
  },
  {
    text: 'If a product is a cloud service at the core of the solution, the ministry keeps an on-premise copy of its records: the context’s events, its decision records and its rules, kept current while the service runs. Mission-critical services, monthly payments first, can then carry on if the supplier cuts off access.',
    req: [['quality', 'NFR-A-009']]
  },
  {
    text: 'Access rights are generated from information-sharing agreements, never granted by hand.',
    req: [
      ['functional', 'FR-085'],
      ['quality', 'NFR-SEC-003']
    ]
  },
  {
    text: 'Staff sign in through the provincial single sign-on service.',
    req: [['quality', 'NFR-SEC-001']]
  },
  {
    text: 'The ministry’s records stay in formats it owns and can move, and open standards are preferred.',
    req: [
      ['quality', 'NFR-I-005'],
      ['quality', 'NFR-I-006']
    ]
  },
  {
    text: 'Every action is audit logged, and records are kept and destroyed on schedule.',
    req: [
      ['quality', 'NFR-C-002'],
      ['quality', 'NFR-C-003']
    ]
  },
  {
    text: 'Screens and documents meet accessibility standards.',
    req: [['quality', 'NFR-U-002']]
  }
];

export const parts = [
  {
    id: 'case',
    name: 'Case work, one context per program family',
    short: 'Five case contexts, each with its own case model',
    purpose:
      'The software caseworkers use every day. There are five case contexts, one for each program family: employment assistance, persons with disabilities, child care subsidy, employment services and child protection. Each keeps its own case record and its own lifecycle, from taking an application to scheduling reviews.',
    whole:
      'The five share ways of working, not a case model. Each records evidence through Evidence & Verification, asks Eligibility & Entitlement for decisions, raises work in Work Management and instructs payments through Financial Components. None of them holds payments, overpayments or reconsideration. Those are contexts of their own, described below. A case management product fills one case context. The same product can be used for more than one, but each use keeps its own data. Parameter N11 sets the rule for the rest: buy, adopt or reuse common tools, and build only where no ready-made product meets a legal, policy or programme need.',
    needs: [
      { text: 'Takes applications in stages and keeps a complete case record, so work can carry on when a case changes hands.', req: [['functional', 'FR-025'], ['functional', 'FR-032']] },
      { text: 'Schedules reviews, recertifications and follow-up of missed appointments.', req: [['functional', 'FR-024']] },
      { text: 'Five case contexts share protocols, not a case model.', req: [['quality', 'NFR-I-008']] },
      { text: 'Does not make workers’ tasks slower than they are today.', req: [['quality', 'NFR-U-001']] }
    ],
    offers: [
      { org: 'Appian', product: 'Appian Platform', kind: 'commercial', what: 'Low-code platform for building case and process applications.', offered: 'Cloud service or self-hosted' },
      { org: 'Merative', product: 'Cúram', kind: 'commercial', what: 'Social program management software for benefits, eligibility and case management.', offered: 'Self-hosted or hybrid' },
      { org: 'Microsoft', product: 'Dynamics 365 Customer Service', kind: 'commercial', what: 'Case management on the Dataverse platform.', offered: 'Cloud service; a separate on-premises edition exists' },
      { org: 'Pegasystems', product: 'Pega Government Platform', kind: 'commercial', what: 'Case management and workflow for government services.', offered: 'Cloud service or self-hosted' },
      { org: 'Salesforce', product: 'Public Sector Solutions', kind: 'commercial', what: 'Case, benefits and licensing applications on the Salesforce platform.', offered: 'Cloud service' },
      { org: 'ServiceNow', product: 'Public Sector Digital Services', kind: 'commercial', what: 'Service requests and case workflows on the ServiceNow platform.', offered: 'Cloud service or customer-operated' },
      { org: 'ArkCase', product: 'ArkCase Community Edition', kind: 'open', what: 'Case management platform with document handling.', offered: 'Self-hosted' },
      { org: 'Children in Families', product: 'OSCaR', kind: 'open', what: 'Case management and record keeping for family-care services.', offered: 'Cloud service or self-hosted' }
    ]
  },
  {
    id: 'payments',
    name: 'Payments & Benefit Issuance',
    short: 'The one controlled path money leaves by',
    purpose:
      'Issues every payment through one controlled path: issuance runs, direct deposit, cheque and electronic transfer, stop payment, reissue, returned items and the month-end cutoff. It reconciles with the corporate financial system.',
    whole:
      'It takes payment instructions from Financial Components and turns them into disbursements. It decides no entitlement. An entitlement decided twice must not be paid twice, and that guarantee lives here, once, rather than in five case contexts.',
    needs: [
      { text: 'Issues every payment through one issuance service.', req: [['functional', 'FR-042']] },
      { text: 'Runs issuance, with stop, recall, reissue and returns as separate operations.', req: [['functional', 'FR-043'], ['functional', 'FR-044']] },
      { text: 'Works with the corporate accounting system and the banks.', req: [['integrations', 'INT-001'], ['integrations', 'INT-002']] }
    ],
    offers: []
  },
  {
    id: 'financial',
    name: 'Financial Components',
    short: 'The benefit ledger',
    purpose:
      'Keeps the benefit ledger: accounts, accruals, payment schedules and double-entry postings. It creates, cancels and replaces payment instructions. It also holds money paid out now that may have to be repaid, such as interim assistance while a decision is being challenged.',
    whole:
      'It turns financial decisions into the postings that Payments & Benefit Issuance carries out. It is kept apart from issuance because a ledger and a payment run fail in different ways and are audited in different ways. It decides no entitlement.',
    needs: [
      { text: 'Keeps a benefit ledger that reconciles three ways.', req: [['functional', 'FR-045']] },
      { text: 'Holds money paid out now that may have to be repaid, until the awaited decision settles it.', req: [['functional', 'FR-041']] },
      { text: 'Applies deductions and set-off, and protects the minimum a client must keep.', req: [['functional', 'FR-048']] },
      { text: 'Separates working out, approving and releasing a payment, in code.', req: [['functional', 'FR-046']] }
    ],
    offers: []
  },
  {
    id: 'overpayment',
    name: 'Overpayment & Recovery',
    short: 'Money owed back',
    purpose:
      'Raises overpayments, tells the client, and manages repayment agreements, deductions, set-off, write-off and referral to collections.',
    whole:
      'An overpayment always comes from recalculating a past period, and it always carries a classification. The rule that classifies it reads the evidence operation behind the recalculation. A supersession reported late gives a recoverable overpayment. A correction is classified by whose error it was. That rule is a versioned policy artefact, not code inside a case context.',
    needs: [
      { text: 'Calculates and classifies overpayments from the evidence that changed.', req: [['functional', 'FR-051']] },
      { text: 'A person decides every debt.', req: [['functional', 'FR-052']] },
      { text: 'Handles repayment, write-off, collections and disputes.', req: [['functional', 'FR-053'], ['integrations', 'INT-019']] }
    ],
    offers: []
  },
  {
    id: 'appeals',
    name: 'Appeals & Reconsideration',
    short: 'Challenging a decision',
    purpose:
      'Records every reconsideration request, runs the legal time limits, builds the record for reconsideration and appeal, and deals with the tribunal as an outside party.',
    whole:
      'It is built once, not once per program. Whether reconsideration is available is decided by the independent reconsideration unit and recorded as evidence, which this context reads but never writes. A decision put right on appeal becomes a new decision, never a manual adjustment. Interim assistance is instructed from here and held in Financial Components.',
    needs: [
      { text: 'Accepts and records every reconsideration request.', req: [['functional', 'FR-055']] },
      { text: 'Reads, and never makes, the decision on whether reconsideration is available.', req: [['functional', 'FR-056']] },
      { text: 'Builds the record for reconsideration and appeal from the decision record.', req: [['functional', 'FR-058']] },
      { text: 'Treats the tribunal as an outside party, and puts decisions right without manual steps.', req: [['functional', 'FR-059'], ['functional', 'FR-060']] }
    ],
    offers: []
  },
  {
    id: 'consent',
    name: 'Consent & Disclosure',
    short: 'Consent, disclosure and requests for correction',
    purpose:
      'The one place client consent is kept: what was consented to, for how long, and when it was withdrawn. It records every disclosure, and a person’s request to correct their information, with its time limit.',
    whole:
      'Other contexts check consent here rather than keeping their own. The correction itself is made by the context that owns the fact. Agreements between organisations are a different thing: they sit in the agreement registry in Secure Data Exchange.',
    needs: [
      { text: 'Records consents with their scope, time limit and withdrawal.', req: [['functional', 'FR-075']] },
      { text: 'Discloses only with a recorded legal basis.', req: [['functional', 'FR-077']] },
      { text: 'Handles requests for correction, and the annotations that follow.', req: [['functional', 'FR-079']] }
    ],
    offers: []
  },
  {
    id: 'rules',
    name: 'Rules engine and decision authoring',
    short: 'Works out eligibility and entitlement',
    purpose:
      'Works out eligibility and entitlement from the facts, using the rules in force on the relevant dates. It also lets policy staff write, test and release those rules.',
    whole:
      'It sits inside Eligibility & Entitlement. The decision service around it gathers the facts first and passes the engine a snapshot of them. The engine reads nothing else while it runs, and returns determinations with their reasons. The case contexts and workflow ask for decisions, and hold no eligibility rules of their own. Architecture decision D3 covers whether to build or buy the authoring and release tooling.',
    needs: [
      { text: 'Policy staff write rules as versioned artefacts with effective dates.', req: [['functional', 'FR-090']] },
      { text: 'Runs inside the decision service, against a snapshot of the facts passed to it, and reads nothing else while it runs.', req: [['functional', 'FR-001']] },
      { text: 'Each rule carries the policy it comes from and the date that policy took effect.', req: [['functional', 'FR-090']] },
      { text: 'Works out effective dates by rule, for each part of a benefit.', req: [['functional', 'FR-005']] },
      { text: 'Runs several generations of rules side by side.', req: [['functional', 'FR-010']] },
      { text: 'Gives reasons that name the rule applied and the fact behind it.', req: [['functional', 'FR-002']] },
      { text: 'Replays any past decision from stored records.', req: [['functional', 'FR-008']] },
      { text: 'Blocks a release when rules have conflicting dates.', req: [['functional', 'FR-091']] },
      { text: 'Keeps each rule in one authoritative place.', req: [['quality', 'NFR-M-005']] }
    ],
    offers: [
      { org: 'GoRules', product: 'GoRules BRMS', kind: 'commercial', what: 'Rules authoring, testing and release management.', offered: 'Cloud service or self-hosted' },
      { org: 'IBM', product: 'Operational Decision Manager', kind: 'commercial', what: 'Business rules management and decision services.', offered: 'Self-hosted or cloud' },
      { org: 'InRule Technology', product: 'InRule Decision Platform', kind: 'commercial', what: 'Decision authoring and execution.', offered: 'Cloud service or self-hosted' },
      { org: 'Oracle', product: 'Intelligent Advisor', kind: 'commercial', what: 'Policy modelling and determinations, with rules written in Word and Excel.', offered: 'Cloud service; a self-managed edition exists' },
      { org: 'Apache Software Foundation', product: 'Drools', kind: 'open', what: 'Rules engine with DMN decision tables, part of Apache KIE.', offered: 'Self-hosted' },
      { org: 'GoRules', product: 'ZEN Engine', kind: 'open', what: 'Embeddable decision engine that runs JSON decision models.', offered: 'Self-hosted' },
      { org: 'Inria', product: 'Catala', kind: 'open', what: 'Programming language for turning legislation into code, developed as a research project.', offered: 'Self-hosted' },
      { org: 'OpenFisca', product: 'OpenFisca Core', kind: 'open', what: 'Rules-as-code engine for tax and benefit legislation.', offered: 'Self-hosted' }
    ]
  },
  {
    id: 'workflow',
    name: 'Workflow and durable execution',
    short: 'Moves work between people and systems',
    purpose:
      'Moves work between people and systems: work items, queues, due dates set by legal time limits, and escalation. It also runs long processes, such as payment runs, that must survive failures and pick up where they stopped.',
    whole:
      'It serves Work Management, one context that all five case contexts use. It moves the work and asks for decisions, but makes no decisions itself. Its due dates come from the register of legal time limits.',
    needs: [
      { text: 'Takes its due dates from one register of legal time limits.', req: [['functional', 'FR-061']] },
      { text: 'Manages work items and queues, with due dates.', req: [['functional', 'FR-067']] },
      { text: 'Supports supervision, escalation and overdue work.', req: [['functional', 'FR-068']] },
      { text: 'Balances caseloads, with a supervisor deciding.', req: [['functional', 'FR-069']] },
      { text: 'Schedules reviews, recertifications and follow-up of missed appointments.', req: [['functional', 'FR-024']] },
      { text: 'Retries safely, and every dependency has a timeout and a fallback.', req: [['quality', 'NFR-I-004'], ['quality', 'NFR-A-003']] }
    ],
    offers: [
      { org: 'Camunda', product: 'Camunda 8', kind: 'commercial', what: 'BPMN process orchestration.', offered: 'Cloud service or self-hosted' },
      { org: 'Flowable AG', product: 'Flowable Enterprise', kind: 'commercial', what: 'Process, case and decision automation (BPMN, CMMN and DMN).', offered: 'Cloud service' },
      { org: 'Orkes', product: 'Orkes Conductor', kind: 'commercial', what: 'Workflow orchestration built on Conductor.', offered: 'Cloud service or self-hosted' },
      { org: 'Temporal Technologies', product: 'Temporal Cloud', kind: 'commercial', what: 'Durable execution for long-running processes.', offered: 'Cloud service' },
      { org: 'Apache Software Foundation', product: 'jBPM', kind: 'open', what: 'Business process management, part of Apache KIE.', offered: 'Self-hosted' },
      { org: 'Conductor OSS', product: 'Conductor', kind: 'open', what: 'Workflow orchestration engine, originally from Netflix.', offered: 'Self-hosted' },
      { org: 'Flowable AG', product: 'Flowable (open source)', kind: 'open', what: 'BPMN, CMMN and DMN engines.', offered: 'Self-hosted' },
      { org: 'Operaton community', product: 'Operaton', kind: 'open', what: 'BPMN and DMN engine, a fork of Camunda 7 Community Edition.', offered: 'Self-hosted' },
      { org: 'Temporal Technologies', product: 'Temporal', kind: 'open', what: 'Durable execution service.', offered: 'Self-hosted' }
    ]
  },
  {
    id: 'events',
    name: 'Event store, event backbone and schema registry',
    short: 'Holds the evidence, and carries events between contexts',
    purpose:
      'Evidence & Verification keeps every fact as an append-only stream of events, with its three dates. The backbone carries events between contexts, and the schema registry checks each one against its registered schema.',
    whole:
      'The backbone carries events. It is not where facts are kept. Facts are held by Evidence & Verification in its own event store, and other contexts read them through its published interface or keep copies built from its events. Four habits make this an architecture rather than a message bus. Every kind of event has a registered schema and one owning context. Each service saves its change and its event together, in one step. Work that crosses contexts is undone step by step if it fails, rather than locked across systems. And tampering shows, so the streams can serve as the audit trail. Architecture decision D9 sets the direction for the event broker and its support model.',
    needs: [
      { text: 'Keeps each fact as a stream of versions, and works out its current state from them.', req: [['data', 'DR-020']] },
      { text: 'Records the four states of a fact, and corrections, without overwriting.', req: [['functional', 'FR-011'], ['functional', 'FR-012']] },
      { text: 'Fixes three dates on every fact before the first event.', req: [['data', 'DR-001']] },
      { text: 'Lets only evidence and determinations cross between contexts.', req: [['quality', 'NFR-I-002']] },
      { text: 'Checks schema compatibility, and tests contracts.', req: [['quality', 'NFR-I-003']] },
      { text: 'Shows if any record has been tampered with.', req: [['quality', 'NFR-SEC-009']] },
      { text: 'Holds decades of data within stated limits on consumer lag.', req: [['quality', 'NFR-S-002'], ['quality', 'NFR-P-005']] }
    ],
    offers: [
      { org: 'AxonIQ', product: 'Axon Server', kind: 'commercial', what: 'Event store and message routing for event-sourced systems.', offered: 'Self-hosted' },
      { org: 'Confluent', product: 'Confluent Platform and Confluent Cloud', kind: 'commercial', what: 'Kafka distribution and managed Kafka service.', offered: 'Cloud service or self-hosted' },
      { org: 'Kurrent', product: 'KurrentDB', kind: 'commercial', what: 'Event store database.', offered: 'Cloud service or self-hosted' },
      { org: 'Red Hat', product: 'Streams for Apache Kafka', kind: 'commercial', what: 'Supported Kafka on OpenShift and Red Hat Enterprise Linux.', offered: 'Self-hosted' },
      { org: 'Redpanda Data', product: 'Redpanda', kind: 'commercial', what: 'Kafka-compatible streaming platform.', offered: 'Cloud service or self-hosted' },
      { org: 'Aiven', product: 'Karapace', kind: 'open', what: 'Schema registry and Kafka REST proxy.', offered: 'Self-hosted' },
      { org: 'Apache Software Foundation', product: 'Apache Kafka', kind: 'open', what: 'Event streaming platform.', offered: 'Self-hosted' },
      { org: 'Apicurio', product: 'Apicurio Registry', kind: 'open', what: 'Schema and API registry with compatibility rules.', offered: 'Self-hosted' },
      { org: 'Strimzi', product: 'Strimzi', kind: 'open', what: 'Operator for running Kafka on Kubernetes and OpenShift.', offered: 'Self-hosted' }
    ]
  },
  {
    id: 'identity',
    name: 'Client identity resolution',
    short: 'Finds the records that belong to the same person',
    purpose:
      'Finds records that refer to the same person, so Participant Identity can join them. Uncertain matches go to a person to decide. Joining two records, or separating two that were wrongly joined, is recorded as an event that every other context follows.',
    whole:
      'It sits inside Participant Identity, which the ministry builds and keeps small: identifiers, enough detail to match on, and proof-of-identity status. Addresses, income and relationships are evidence, held elsewhere. Every other context refers to a client by the participant identifier. Proof of identity comes from the provincial identity services, not from this component. A matching library does the matching; it does not keep a master copy of each person.',
    needs: [
      { text: 'Joins and separates client records, with people deciding uncertain matches, and records each join or separation as an event.', req: [['functional', 'FR-028']] },
      { text: 'Supports establishing and proving identity.', req: [['functional', 'FR-027'], ['integrations', 'INT-005']] },
      { text: 'Reads identity data when it is needed, rather than storing copies.', req: [['data', 'DR-019']] }
    ],
    offers: [
      { org: 'Informatica', product: 'MDM Customer 360', kind: 'commercial', what: 'Master data management for customer and citizen records.', offered: 'Cloud service' },
      { org: 'Reltio', product: 'Reltio Multidomain MDM', kind: 'commercial', what: 'Master data management.', offered: 'Cloud service' },
      { org: 'Semarchy', product: 'Semarchy Data Platform', kind: 'commercial', what: 'Master data management with governance workflows.', offered: 'Cloud service or self-hosted' },
      { org: 'Senzing', product: 'Senzing SDK', kind: 'commercial', what: 'Entity resolution library.', offered: 'Self-hosted' },
      { org: 'Tamr', product: 'Tamr', kind: 'commercial', what: 'Master data management using machine learning.', offered: 'Cloud service or self-hosted' },
      { org: 'Dedupe.io', product: 'dedupe', kind: 'open', what: 'Python library for deduplication and record linkage.', offered: 'Self-hosted' },
      { org: 'UK Ministry of Justice', product: 'Splink', kind: 'open', what: 'Probabilistic record linkage library.', offered: 'Self-hosted' },
      { org: 'Zingg Labs', product: 'Zingg', kind: 'open', what: 'Entity resolution using machine learning.', offered: 'Self-hosted' }
    ]
  },
  {
    id: 'documents',
    name: 'Correspondence, document capture and e-signature',
    short: 'Notices out, documents in, signatures',
    purpose:
      'Builds notices from the decision record, delivers them and records proof of service. It also captures documents from every channel and handles signatures and attestations.',
    whole:
      'It serves two contexts, Documents & Capture and Notices & Correspondence. Notices take their content from determinations and the rules that produced them, so a notice always matches its decision. A captured document supports evidence. It is never a decision.',
    needs: [
      { text: 'Builds notices from the decision record, with the required rights wording.', req: [['functional', 'FR-062'], ['functional', 'FR-063']] },
      { text: 'Records delivery, proof of service and deemed receipt.', req: [['functional', 'FR-064']] },
      { text: 'Produces notices in other languages, in plain language and in accessible formats.', req: [['functional', 'FR-065']] },
      { text: 'Captures documents from every channel, classifies them and scans them for malware.', req: [['functional', 'FR-071'], ['functional', 'FR-072']] },
      { text: 'Treats values read by machine as unverified evidence.', req: [['functional', 'FR-073']] },
      { text: 'Handles signatures and attestations, and severs information within sentences.', req: [['functional', 'FR-074'], ['functional', 'FR-078']] },
      { text: 'Hands mail to the provincial print-and-mail service.', req: [['integrations', 'INT-003']] }
    ],
    offers: [
      { org: 'ABBYY', product: 'ABBYY Vantage', kind: 'commercial', what: 'Document capture, classification and data extraction.', offered: 'Cloud service or self-hosted' },
      { org: 'Carbone', product: 'Carbone', kind: 'commercial', what: 'Document generation from templates.', offered: 'Cloud service or self-hosted' },
      { org: 'Docmosis', product: 'Docmosis', kind: 'commercial', what: 'Document generation from templates.', offered: 'Cloud service or self-hosted' },
      { org: 'Docusign', product: 'Docusign eSignature', kind: 'commercial', what: 'Electronic signature.', offered: 'Cloud service' },
      { org: 'Documenso', product: 'Documenso Cloud', kind: 'commercial', what: 'Electronic signature.', offered: 'Cloud service' },
      { org: 'OneSpan', product: 'OneSpan Sign', kind: 'commercial', what: 'Electronic signature.', offered: 'Cloud service' },
      { org: 'OpenText', product: 'OpenText Communications (Exstream)', kind: 'commercial', what: 'Customer communications management for print, email, SMS and web.', offered: 'Cloud service or self-hosted' },
      { org: 'Quadient', product: 'Quadient Inspire', kind: 'commercial', what: 'Customer communications management.', offered: 'Cloud service' },
      { org: 'Smart Communications', product: 'SmartCOMM', kind: 'commercial', what: 'Customer communications management.', offered: 'Cloud service' },
      { org: 'Documenso', product: 'Documenso', kind: 'open', what: 'Electronic signature.', offered: 'Self-hosted' },
      { org: 'DocuSeal', product: 'DocuSeal', kind: 'open', what: 'Electronic signature and document forms.', offered: 'Self-hosted' },
      { org: 'Paperless-ngx', product: 'Paperless-ngx', kind: 'open', what: 'Scanning, indexing and archiving of documents.', offered: 'Self-hosted' },
      { org: 'Government of Canada', product: 'GC Notify', kind: 'government', what: 'Email and text message notifications for federal services.', offered: 'Government service' },
      { org: 'Province of British Columbia', product: 'Common Document Generation Service (CDOGS)', kind: 'government', what: 'Document generation from templates for BC government teams.', offered: 'Government service' },
      { org: 'Province of British Columbia', product: 'Common Hosted Email Service (CHES)', kind: 'government', what: 'Email delivery for BC government applications.', offered: 'Government service' }
    ]
  }
];
