# PROGRESS.md — where the work stands

**If you are a fresh AI session with a small context window: read this file first.**
It is the source of truth for current state. `agents.md` = rules, `project.md` = facts.
Update it before a session ends — see "Session protocol" in `agents.md`.

## Current phase

**Phase 1 — Setup: documentation only.** No code, no site, no dependencies yet.
Last updated: 2026-11-04

## Next step

1. **Ask the human for the hosting target** (Strato / Jimdo / Squarespace). This decides
   static site vs. CMS and closes Milestone 1. ← blocking
2. Ask what `fuzzy-circle-1.png` and `fuzzy-circle-2.png` actually show; rename them if the
   current names are wrong (AI cannot see images).
3. Then start Milestone 2 (content decisions): prices, characters, contact channel.

## Milestones

`[ ]` = not started, `[x]` = done. Reordering or adding steps is allowed and expected — a
new insight can change the plan. Log the change in the Decisions log instead of silently
rewriting the list.

- [ ] 1. Setup: repo, framework, hosting decision — **in progress**
- [ ] 2. Content decisions: prices, characters, contact channel
- [ ] 3. Structure: pages, nav, language switch
- [ ] 4. German copy for the main page
- [ ] 5. Russian copy for the main page
- [ ] 6. Legal pages: Impressum, Datenschutz (German only) — deliberately late
- [ ] 7. Look & animations: carnival/circus, subtle motion
- [ ] 8. Accessibility: alt text, contrast, `prefers-reduced-motion`
- [ ] 9. Deploy — only on explicit instruction

## Decisions log (append-only, newest first)

- 2026-11-04 — Milestone sequence set as above, but explicitly agile: a new insight may
  reorder or add steps; the change gets logged here rather than editing the list quietly.
- 2026-11-04 — Progress lives in this file plus "Session protocol" in `agents.md`, not inside
  `project.md` or git history. Reason: the local model has a 64k context window, so a fresh
  session must resume without rereading everything.
- 2026-11-04 — Legal pages stay German-only; the Russian switch applies to the main page.
- 2026-11-04 — `customer-assets/` is read-only; `customer-data.txt` is never read, quoted or
  committed; `.gitignore` keeps it untracked.
- 2026-11-04 — Renamed misspelled assets: `fuzzy-circly-1.png` → `fuzzy-circle-1.png`,
  `bacground-yellow-with-questionmark.jpg` → `background-yellow-with-questionmark.jpg`.
- 2026-11-04 — Repo history started with two commits: `fa446e1` (docs), `95bf819`
  (customer assets as read-only source material). Branch is still `master`; rename to `main`
  if wanted, but no remote exists yet.
- 2026-11-04 — Docs split into two root files: `agents.md` (English rules) + `project.md`
  (German facts), rather than one combined doc or a `docs/` folder.
- 2026-11-04 — AI cannot read images: never attempt image vision. Ask the human what an image
  shows, then rename the file to match.

## Open blockers (need answers from the human)

Mirrors `project.md` → "Offene Punkte":

- [ ] 1. Impressum details: company name, address, e-mail/phone
- [ ] 2. Extra costume characters: their names, and when their assets arrive
- [ ] 3. Which prices/packages from `Preise - mischka.xlsx` may become public
- [ ] 4. Contact channel: form, phone, e-mail, messenger?
- [ ] 5. Hosting target ← needed to close Milestone 1
- [ ] 6. Russian switch: whole main page, or selected texts only?
- [ ] 7. References, testimonials, venues — do they exist?
- [ ] 8. Cookie banner, analytics, image rights beyond DSGVO

## Gotchas

- The repo had **zero commits until 2026-11-04**; nothing was pushed, no remote assumed.
- `customer-assets/customer-data.txt` contains real hosting passwords. Never open it. Check
  `git status` whenever staging anything from `customer-assets/`.
- Asset names in `project.md` are filename guesses, not verified content — some may mislead,
  especially `fuzzy-circle-1.png` / `fuzzy-circle-2.png`. Confirm with the human before use.
- No frameworks, libraries or dependencies without asking first (see `agents.md`).
- `customer-assets/figure-cheburashka-2.PNG` has an uppercase extension — keep that in mind
  for URLs and build scripts once files are served, on case-sensitive servers.

## Done

- 2026-11-04 — `project.md` (German), `agents.md` (English incl. session protocol),
  `PROGRESS.md`, `.gitignore`, asset renames, asset inventory corrected against the real
  filenames, initial commits `fa446e1` + `95bf819`.
