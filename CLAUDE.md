# Site

## The copy belongs to the author

The wording on this site is written and owned by the author. Do not change it
unless the task is explicitly a copy change.

- Refactors, restyling, dependency upgrades and accessibility fixes must leave
  every piece of reader-facing text exactly as it is. That covers body text,
  headings, titles, meta descriptions, `aria-label`/`alt` text, and the strings in
  component data arrays.
- Run `npm run copy:check` before calling any non-copy change done. If it fails,
  the change altered copy: put the text back. Never run `npm run copy:update` to
  make a refactor pass.
- Only a change the author asked for as a copy change may run `copy:update`, and
  `copy.lock.txt` goes in the same commit as the text.
- Don't rewrite whole .svelte files with Write when an Edit will do. Rewrites are
  how prose silently drifts.
