#!/usr/bin/env python3
"""Generate the site's requirements data from the requirements specification.

    python3 scripts/build-requirements.py <path/to/ARC-001-REQ-vX.Y.md>

Writes one module per page into src/lib/requirements/. The specification is
the source of truth: re-run this after it changes, then `npm run copy:update`
and commit the lock with the data, because the wording is the author's.

Markdown is converted to a small, known subset of HTML. Links to glossary
terms point at the site glossary; requirement IDs link to their cards;
parameter IDs link to the Parameters page. `%BASE%` is replaced with the
site's base path at render time.
"""
import html
import json
import re
import sys
from collections import OrderedDict, defaultdict
from pathlib import Path

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / 'src' / 'lib' / 'requirements'
doc = SRC.read_text(encoding='utf-8')

# ---- where each requirement lives on the site ------------------------------
PAGES = {'BR': 'business', 'FR': 'functional', 'NFR': 'quality', 'INT': 'integrations', 'DR': 'data'}


def page_of(rid):
    return PAGES['NFR' if rid.startswith('NFR') else rid.split('-')[0]]


# ---- the document's glossary, mapped onto the site glossary ----------------
# Concepts the site glossary already explains keep the site's entry.
TO_SITE = {
    'eaat': 'tribunal', 'reconsideration': 'reconsideration', 'entitlement': 'entitlement',
    'variant': 'variant', 'custodian': 'custodian', 'dripa': 'dripa', 'foippa': 'foippa',
    'evidence': 'fact', 'provenance': 'provenance', 'correction': 'correction',
    'use-constraint': 'use-limit', 'copy': 'copy', 'disposition': 'disposition',
    'crypto-erasure': 'key-destruction', 'indirection': 'separate-storage',
    'append-only': 'permanent-history', 'determination': 'determination',
    'decision-record': 'decision-record', 'rules-artefact': 'rules-engine', 'replay': 'replay',
    'snapshot': 'watermark', 'clock': 'legal-time-limit', 'segregation': 'separation-of-duties',
    'cohort': 'client-group', 'system-of-record': 'system-of-record', 'rollback': 'rollback',
    'acl': 'translation-layer', 'ohs': 'interface', 'bounded-context': 'part', 'channel': 'channel',
    'assistive-tech': 'assistive-technology', 'wcag': 'accessibility-standard', 'event': 'event',
    'rpo-rto': 'recovery-targets', 'availability': 'availability-target', 'schema': 'schema',
    'fitness-function': 'automated-check', 'valid-time': 'valid-time',
    'agreement-registry': 'sharing-agreement', 'parameter': 'parameter', 'legacy': 'old-system',
    'icm-mis': 'old-system',
}
gloss = OrderedDict()
for m in re.finditer(r'^\| <a id="g-([a-z0-9-]+)"></a>\*\*(.+?)\*\* \| (.+?) \|$', doc, re.M):
    gloss[m.group(1)] = {'term': m.group(2), 'definition': m.group(3)}


def site_slug(req_slug):
    return TO_SITE.get(req_slug, req_slug)


# ---- markdown subset -> html ------------------------------------------------
ID_RX = re.compile(r'\b(NFR-[A-Z]+-\d{3}|BR-\d{3}|FR-\d{3}|INT-\d{3}|DR-\d{3})\b')
N_RX = re.compile(r'\b(N(?:0[1-9]|1\d|2[01]))\b(?![-\d])')


def inline(text, used=None):
    """Inline markdown to html. `used` collects glossary site slugs linked."""
    holds = []

    def hold(s):
        holds.append(s)
        return f'\x00{len(holds) - 1}\x00'

    t = text
    t = re.sub(r'`([^`]+)`', lambda m: hold(f'<code>{html.escape(m.group(1))}</code>'), t)

    def glink(m):
        slug = site_slug(m.group(2))
        if used is not None:
            used.add(slug)
        return hold(f'<a class="g" href="%BASE%/glossary#{slug}">{html.escape(m.group(1))}</a>')

    t = re.sub(r'\[([^\]]+)\]\(#g-([a-z0-9-]+)\)', glink, t)
    t = re.sub(r'\[([A-Z0-9]+-C\d+)\]', lambda m: hold(f'<span class="cite">{m.group(1)}</span>'), t)
    t = html.escape(t, quote=False)
    t = ID_RX.sub(lambda m: hold(f'<a class="rid" href="%BASE%/requirements/{page_of(m.group(1))}#{m.group(1).lower()}">{m.group(1)}</a>'), t)
    t = N_RX.sub(lambda m: hold(f'<a class="rid" href="%BASE%/parameters#{m.group(1).lower()}">{m.group(1)}</a>'), t)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<em>\1</em>', t)
    while '\x00' in t:
        t = re.sub(r'\x00(\d+)\x00', lambda m: holds[int(m.group(1))], t)
    return t


def block(md, used=None):
    """Paragraphs, bullet and checkbox lists, tables, blockquotes."""
    out, para, lst, tbl = [], [], [], []

    def flush():
        nonlocal para, lst, tbl
        if para:
            out.append('<p>' + inline(' '.join(para), used) + '</p>')
        if lst:
            cls = ' class="checks"' if all(c for c, _ in lst) else ''
            out.append(f'<ul{cls}>' + ''.join(f'<li>{inline(x, used)}</li>' for _, x in lst) + '</ul>')
        if tbl:
            rows = [r for r in tbl if not re.match(r'^\|[\s:|-]+\|$', r)]
            cells = [[c.strip() for c in r.strip().strip('|').split(' | ')] for r in rows]
            head, body = cells[0], cells[1:]
            h = '<div class="tbl"><table><thead><tr>' + ''.join(f'<th scope="col">{inline(c, used)}</th>' for c in head) + '</tr></thead><tbody>'
            h += ''.join('<tr>' + ''.join(f'<td>{inline(c, used)}</td>' for c in r) + '</tr>' for r in body)
            out.append(h + '</tbody></table></div>')
        para, lst, tbl = [], [], []

    for line in md.split('\n'):
        s = line.rstrip()
        if not s.strip() or s.strip() == '---':
            flush()
            continue
        if s.startswith('|'):
            if para or lst:
                flush()
            tbl.append(s)
            continue
        m = re.match(r'^\s*- (\[ \] )?(.*)', s)
        if m:
            if para or tbl:
                flush()
            lst.append((bool(m.group(1)), m.group(2)))
            continue
        if s.startswith('> '):
            s = s[2:]
        if tbl:
            flush()
        if lst:
            lst[-1] = (lst[-1][0], lst[-1][1] + ' ' + s.strip())
        else:
            para.append(s.strip())
    flush()
    return ''.join(out)


def plain(md):
    t = re.sub(r'\[([^\]]+)\]\(#g-[a-z0-9-]+\)', r'\1', md)
    t = re.sub(r'\[[A-Z0-9]+-C\d+\]', '', t)
    t = re.sub(r'[*`]', '', t)
    return re.sub(r'\s+', ' ', t).strip()


# ---- requirement blocks -----------------------------------------------------
LABEL = re.compile(r'\*\*([A-Z][A-Za-z ]+?)\*\*: ?')


def fields_of(body):
    """Split a requirement body into ordered (label, markdown) fields."""
    fields = []
    for line in body.split('\n'):
        m = re.match(r'^\*\*([A-Z][A-Za-z /]+?)\*\*:(.*)$', line)
        if m:
            parts = re.split(r' · (?=\*\*[A-Z][A-Za-z /]+?\*\*:)', line)
            for p in parts:
                pm = re.match(r'^\*\*([A-Z][A-Za-z /]+?)\*\*: ?(.*)$', p)
                fields.append([pm.group(1), pm.group(2)])
        elif fields:
            fields[-1][1] += '\n' + line
        elif line.strip():
            fields.append(['Description', line])
    return [(k, v.strip()) for k, v in fields if v.strip() and v.strip() != '—']


def first_sentence(md):
    p = plain(md.split('\n\n')[0])
    m = re.match(r'(.+?[.:;])(\s|$)', p)
    return (m.group(1) if m else p)[:260]


PRIO = {'MUST_HAVE': 'Must', 'SHOULD_HAVE': 'Should', 'COULD_HAVE': 'Could', 'WONT_HAVE': "Won't"}
LEAD_KEYS = ('Description', 'Requirement', 'Purpose')
META_KEYS = {'Priority', 'Complexity', 'Module'}


def req_item(rid, title, body):
    fs = fields_of(body)
    used = set()
    d = dict(fs)
    prio_raw = plain(d.get('Priority', ''))
    pm = re.search(r'(MUST|SHOULD|COULD|WONT)_HAVE', prio_raw)
    mod = re.search(r'\bM(\d)\b', plain(d.get('Module', '')))
    lead_md = next((d[k] for k in LEAD_KEYS if k in d), fs[0][1] if fs else '')
    shown = []
    for k, v in fs:
        if k in META_KEYS:
            continue
        shown.append({'label': k, 'html': block(v, used)})
    return {
        'id': rid, 'anchor': rid.lower(), 'title': plain(title),
        'priority': PRIO[pm.group(0)] if pm else None,
        'priorityNote': prio_raw if pm and prio_raw != pm.group(0) else '',
        'module': int(mod.group(1)) if mod else None,
        'moduleText': plain(d.get('Module', '')),
        'complexity': plain(d.get('Complexity', '')).title() or None,
        'lead': first_sentence(lead_md),
        'fields': shown, 'terms': sorted(used),
    }


def section(h2):
    m = re.search(r'(?ms)^## ' + re.escape(h2) + r'\n(.*?)(?=^## |\Z)', doc)
    return m.group(1)


def groups_in(sec, level, idrx):
    """Split a section into groups at `### ` headings and items at `level` headings."""
    groups, intro = [], ''
    chunks = re.split(r'(?m)^(?=### )', sec)
    intro = chunks[0]
    for ch in chunks[1:]:
        gtitle = ch.split('\n', 1)[0][4:].strip()
        items = []
        parts = re.split(r'(?m)^(?=' + level + r' )', ch)
        gintro = parts[0].split('\n', 1)[1] if '\n' in parts[0] else ''
        for p in parts[1:]:
            m = re.match(level + r' (' + idrx + r'): (.*)\n', p)
            if not m:
                continue
            items.append(req_item(m.group(1), m.group(2), p[m.end():]))
        groups.append({'id': re.sub(r'[^a-z0-9]+', '-', gtitle.lower()).strip('-'), 'title': gtitle,
                       'intro': block(gintro.strip()), 'items': items})
    return intro, groups


cats = OrderedDict()

# Business: ### BR-nnn headings under ## Business Requirements
sec = section('Business Requirements')
items = []
for p in re.split(r'(?m)^(?=### BR-)', sec)[1:]:
    m = re.match(r'### (BR-\d{3}): (.*)\n', p)
    items.append(req_item(m.group(1), m.group(2), p[m.end():]))
cats['business'] = {'intro': block(re.split(r'(?m)^### ', sec)[0].strip()),
                    'groups': [{'id': 'business', 'title': 'Business requirements', 'intro': '', 'items': items}]}

# Functional: groups A–P
fsec = section('Functional Requirements')
fsec = fsec[fsec.index('### Functional Requirements Detail'):]
intro, groups = groups_in(fsec, '####', r'FR-\d{3}')
cats['functional'] = {'intro': '', 'groups': [g for g in groups if g['items']]}
cats['functional']['intro'] = block(re.search(r'(?ms)### Functional Requirements Detail\n(.*?)^\| Group', fsec).group(1).strip())

# Quality (non-functional)
intro, groups = groups_in(section('Non-Functional Requirements (NFRs)'), '####', r'NFR-[A-Z]+-\d{3}')
for g in groups:
    g['title'] = g['title'].replace(' Requirements', '')
cats['quality'] = {'intro': block(intro.strip()), 'groups': groups}

# Integrations
isec = section('Integration Requirements')
intro, groups = groups_in(isec, '####', r'INT-\d{3}')
cats['integrations'] = {'intro': groups[0]['intro'], 'groups': [dict(groups[0], title='External integrations', intro='')]}

# Data: requirement groups plus the information objects
dsec = section('Data Requirements')
intro, groups = groups_in(dsec, '####', r'DR-\d{3}')
entities = []
for p in re.split(r'(?m)^(?=#### Entity )', dsec)[1:]:
    m = re.match(r'#### Entity (\d+): (.*)\n', p)
    body = re.split(r'(?m)^### ', p[m.end():])[0]
    entities.append({'id': f'entity-{m.group(1)}', 'title': m.group(2), 'html': block(body.strip())})
quality = next((g for g in groups if g['title'] == 'Data Quality Requirements'), None)
migration_intro = next((g['intro'] for g in groups if g['title'] == 'Data Migration Requirements'), '')
cats['data'] = {'intro': '', 'groups': [g for g in groups if g['items']], 'entities': entities,
                'quality': quality['intro'] if quality else '', 'migrationIntro': migration_intro}
DATA_TITLES = {'Data Requirements Detail': 'How facts are recorded and kept',
               'Data Migration Requirements': 'Moving data from the legacy systems',
               'Data Consumption and Identity Requirements': 'Using data and identity'}
for g in cats['data']['groups']:
    if g['title'] == 'Data Migration Requirements':
        g['intro'] = migration_intro
    g['title'] = DATA_TITLES.get(g['title'], g['title'])

# Trade-offs: conflicts, dependencies, risks
csec = section('Requirement Conflicts & Resolutions')
conflicts = []
for p in re.split(r'(?m)^(?=### Conflict )', csec)[1:]:
    m = re.match(r'### Conflict (C-\d+): (.*)\n', p)
    body = p[m.end():]
    strat = re.search(r'\*\*Resolution Strategy\*\*: ([^\n]+)', body)
    dec = re.search(r'\*\*Decision\*\*: ([^\n]+)', body)
    auth = re.search(r'\*\*Decision Authority\*\*: ([^\n]+)', body)
    conflicts.append({'id': m.group(1), 'anchor': m.group(1).lower(), 'title': plain(m.group(2)),
                      'strategy': plain(strat.group(1)) if strat else '',
                      'open': bool(re.search(r'pending|subject to|until', plain(dec.group(1)) if dec else '', re.I)),
                      'decision': inline(dec.group(1)) if dec else '',
                      'authority': inline(auth.group(1)) if auth else '',
                      'html': block(body.strip())})
dsr = section('Dependencies and Risks')
deps = re.search(r'(?ms)### Dependencies\n(.*?)^---', dsr).group(1)
risks = re.search(r'(?ms)### Risks\n(.*?)(?=\Z)', dsr).group(1)
cats_trade = {'conflicts': conflicts, 'dependencies': block(deps.strip()), 'risks': block(risks.strip())}

# ---- summary numbers for the overview -------------------------------------
summary = {'version': re.search(r'\| \*\*Version\*\* \| ([\d.]+) \|', doc).group(1), 'categories': []}
labels = {'business': 'Business', 'functional': 'Functional', 'quality': 'Quality',
          'integrations': 'Integrations', 'data': 'Data'}
modules = defaultdict(int)
for key, cat in cats.items():
    its = [i for g in cat['groups'] for i in g['items']]
    pr = defaultdict(int)
    for i in its:
        pr[i['priority'] or 'Unset'] += 1
        if key == 'functional' and i['module'] is not None:
            modules[i['module']] += 1
    summary['categories'].append({'key': key, 'label': labels[key], 'count': len(its),
                                  'groups': len(cat['groups']), 'priorities': dict(pr)})
summary['total'] = sum(c['count'] for c in summary['categories'])
summary['modules'] = [{'module': m, 'count': modules.get(m, 0)} for m in range(10)]
cov = re.search(r'Obligations traced to at least one requirement \| (\d+) \|', doc)
summary['obligations'] = int(cov.group(1)) if cov else None
cfd = re.search(r'Children and family services: provisions given a disposition \| ([\d,]+)', doc)
summary['cfdProvisions'] = int(cfd.group(1).replace(',', '')) if cfd else None
cfd = re.search(r'Children and family services: provisions met by a new requirement \| ([\d,]+)', doc)
summary['cfdMet'] = int(cfd.group(1).replace(',', '')) if cfd else None
summary['cfdRequirements'] = sum(1 for g in cats['functional']['groups'] if g['title'].startswith('CF') for _ in g['items'])
summary['parameters'] = len(re.findall(r'^\| N\d\d .*\| \d+:', doc, re.M))
summary['conflicts'] = len(conflicts)
summary['openConflicts'] = sum(1 for c in conflicts if c['open'])

# ---- glossary terms the site does not already hold -------------------------
usage = defaultdict(list)
for key, cat in cats.items():
    for g in cat['groups']:
        for i in g['items']:
            for s in i['terms']:
                usage[s].append({'id': i['id'], 'page': key})
new_terms = OrderedDict()
for slug, g in gloss.items():
    if slug in TO_SITE:
        continue
    new_terms[slug] = {'term': g['term'], 'short': plain(g['definition']), 'body': []}

# ---- write -----------------------------------------------------------------
OUT.mkdir(parents=True, exist_ok=True)
HEADER = '// Generated by scripts/build-requirements.py from the requirements specification. Do not edit by hand.\n'


def write(name, obj):
    (OUT / name).write_text(HEADER + 'export default ' + json.dumps(obj, ensure_ascii=False, indent=1) + ';\n', encoding='utf-8')


for key, cat in cats.items():
    for g in cat['groups']:
        for i in g['items']:
            i.pop('terms', None)
    write(f'{key}.js', cat)
write('tradeoffs.js', cats_trade)
write('summary.js', summary)
write('glossary.js', {'terms': new_terms, 'usage': usage})
print(json.dumps({k: v for k, v in summary.items() if k != 'modules'}, indent=0))
print('new glossary terms', len(new_terms), 'terms with usage', len(usage))
