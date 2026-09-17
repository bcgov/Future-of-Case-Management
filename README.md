# The Future of Case Management IT — architecture site

A six-page SvelteKit site explaining the proposed architecture for the successor
to British Columbia's integrated case management systems. Plain English leads;
technical statements sit behind disclosures.

Built as a static site. No server, no runtime data, no analytics, no cookies.

## Running it

```bash
npm install
npm run dev      # development, http://localhost:5173
npm run build    # static output into build/
npm run preview  # serve the built output
```

## Editing copy

The wording is locked. `copy.lock.txt` holds every piece of reader-facing text:
page titles and descriptions, body text, accessible names, and the strings in
the interactive components. A refactor that changes any of it fails the check,
and the deploy workflow runs the same check before it publishes.

```bash
npm run copy:check   # build, then compare the copy with copy.lock.txt
npm run copy:update  # after an intentional wording change: rewrite the lock
```

To change copy, edit the text, run `npm run copy:update`, and commit the lock
file in the same commit as the text. The lock file's diff then shows exactly what
the wording change was.

Changes to markup, classes, component structure and line wrapping don't affect
the lock. Moving component data between files doesn't either.

## Deploying to GitHub Pages

`.github/workflows/pages.yml` builds and publishes on every push to `main`, and
can also be run by hand from the Actions tab.

One thing to set up: in **Settings → Pages**, set **Source** to **GitHub
Actions**. The workflow needs no other configuration.

The build is served from `https://<org>.github.io/<repo>/`, so the workflow
passes the repository name as `BASE_PATH`. If this ever moves to a user or
organisation site (`<org>.github.io`), set `BASE_PATH` to an empty string
instead.

Asset URLs are emitted relative (`paths.relative` in `svelte.config.js`), so the
built output also works when served from any other subdirectory, or opened from
disk.

## Structure

```
src/
  app.css                     design tokens and base styles
  routes/
    +layout.svelte            masthead, navigation, footer
    +page.svelte              overview, with the bitemporal hero
    evidence/                 evidence and the three time axes
    contexts/                 domain boundaries
    determination/            decisions as a re-runnable function
    service/                  what the service looks like today
    decisions/                the unconventional choices, and why
  lib/components/
    BitemporalPlane.svelte    the hero interactive
    EvidenceOperations.svelte record, supersede, correct, invalidate
    ContextMap.svelte         the sixteen domain models
    ReplayArtefacts.svelte    the five artefacts bound to a decision
    SystemsPerTask.svelte     measured cross-system working
    Technical.svelte          plain English / technical disclosure
```

## Design notes

Two accent colours carry meaning and are not used decoratively. Ochre marks
**valid time** — when a fact held in the world. Teal marks **transaction
time** — when the system learned it. The same two hues appear in the hero grid,
the operation panel and the inline keys, so the distinction is learnable in one
place and reusable everywhere else.

Type is Literata for prose and Archivo for headings and interface text, with
IBM Plex Mono confined to schema fragments.

## Accessibility

Targeting WCAG 2.2 AA. Verified with axe-core 4.10 across all six pages in both
light and dark themes, with no violations.

Specifics worth knowing if you edit it:

- Colour is never the only signal. Every cell in the hero grid carries its
  dollar value as screen-reader text, and the two time axes are labelled as well
  as coloured.
- The hero uses two range inputs rather than a draggable canvas, so it is
  keyboard-operable by default and announces its result through a live region.
- Interactive controls meet the 24px target size rule (WCAG 2.2, 2.5.8).
- `prefers-reduced-motion` is respected; there is no non-interactive motion
  anywhere.
- Dark mode follows `prefers-color-scheme` and can be forced with
  `data-theme="light"` or `data-theme="dark"` on the root element.

Re-run the audit after changes:

```js
// in the browser console on any page
const s = document.createElement('script');
s.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js';
document.head.appendChild(s);
s.onload = async () => console.table((await axe.run()).violations);
```

## Sources

Content is drawn from the architecture document (`Prospective-Case-Mgmt-v2.md`),
the Release 26.7 technical design documents, and 326 service-delivery
procedures, all held in the parent repository. Figures quoted on the site come
from those sources. Nothing on the site is a government commitment.
