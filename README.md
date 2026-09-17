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

## Deploying to GitHub Pages

`.github/workflows/pages.yml` builds and publishes on every push to `main`.

Two things to set up once:

1. In the repository, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
2. Check the base path. GitHub serves a project site from `/<repo-name>/`, so
   the workflow passes `BASE_PATH="/<repo-name>"` to the build. If you are
   publishing to a user or organisation site (`<user>.github.io`), change that
   line to pass an empty string instead.

The site lives in the `site/` subdirectory of this repository, which the
workflow accounts for. If you move it to the repository root, drop the
`working-directory` and `path` prefixes from the workflow.

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
