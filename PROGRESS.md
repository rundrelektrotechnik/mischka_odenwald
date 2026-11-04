# PROGRESS.md — where the work stands

**If you are a fresh AI session with a small context window: read this file first.**
It is the source of truth for current state. `agents.md` = rules, `project.md` = facts.
Update it before a session ends — see "Session protocol" in `agents.md`.

## Current phase

**Phase 2 — Content decisions.** Setup is closed: static site, plain HTML/CSS/JS, no build
step, no dependencies. Still no site code yet.
Last updated: 2026-11-04

## Next step

1. **Collect the content facts from the human** (Milestone 2) — see "Open blockers" below:
   Impressum details, contact channel, character names, Russian switch scope. ← blocking
2. Then Milestone 3: one `index.html` + `style.css` + a small `script.js` for the language
   switch, and the two legal pages. **Nothing is installed, no build step.**
3. Upload target (Strato / Squarespace / Jimdo) stays open until Milestone 9; the static
   folder works on any of them.

## Milestones

`[ ]` = not started, `[x]` = done. Reordering or adding steps is allowed and expected — a
new insight can change the plan. Log the change in the Decisions log instead of silently
rewriting the list.

- [x] 1. Setup: repo, docs, hosting approach, stack decision — **done** (upload target is
      only needed at Milestone 9)
- [ ] 2. Content decisions: characters, contact channel, Impressum ← **current**
- [ ] 3. Structure: pages, nav, language switch
- [ ] 4. German copy for the main page
- [ ] 5. Russian copy for the main page
- [ ] 6. Legal pages: Impressum, Datenschutz (German only) — deliberately late
- [ ] 7. Look & animations: carnival/circus, subtle motion
- [ ] 8. Accessibility: alt text, contrast, `prefers-reduced-motion`
- [ ] 9. Deploy — only on explicit instruction

## Decisions log (append-only, newest first)

- 2026-11-04 — Audience clarified by the human: birthday parties are for **children with
  child-friendly costumes** and also **for adults**, where the themes are more adult but
  "still quite innocent, just dancing". So the page addresses both, and the adult add-on from
  the price sheet is not automatically a children's-page item. **Still open:** how adult
  events are presented (separate section? which wording? does the named add-on appear?).
- 2026-11-04 — Prices: **no numbers on the website at all — "Preise auf Anfrage"**. Only the
  offer list (what can be booked) is shown, never amounts. Reason: keeps the page current and
  prices are agreed per booking. This closes blocker 3 partly; which offer items are listed
  is still to be confirmed.
- 2026-11-04 — Stack decided: **plain HTML, CSS and JS, no build step, no dependencies** —
  no `package.json`, no framework, no bundler. Language switch via small hand-written JS.
  This closes Milestone 1.
- 2026-11-04 — Hosting approach decided: **self-built static site, no CMS**. The upload target
  (Strato / Squarespace / Jimdo) stays open until Milestone 9 — a static build runs on any of
  them, so the Russian switch must work without a CMS.
- 2026-11-04 — `fuzzy-circle-1.png` / `fuzzy-circle-2.png` confirmed by the human: ball-like
  circles with fuzzy edges, probably meant for juggling pictures. **Not used for now**, names
  stay as they are.
- 2026-11-04 — `Preise - mischka.xlsx` inspected: balloon bouquet prices (3/5/7 Blumen),
  `Auftritt Standard` (price omitted) for the core city (Michelstadt/Erbach), music for 3 songs
  (15-25 min), add-ons (extra music, extra song, photo time, text modules, games, soap
  bubbles), Anfahrt per km (rate omitted) — plus one optional adult-oriented item.
  **Nothing may be published before the human confirms** what is public and still current.
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

- [x] 0. Stack choice — answered: plain HTML/CSS/JS, no build step, no dependencies.
- [ ] 1. Impressum details: company name, address, e-mail/phone
- [ ] 2. Extra costume characters: their names, and when their assets arrive
- [ ] 3. ~~Which prices may become public~~ → decided: **none, "auf Anfrage"**. Still open:
      which items of the offer list are shown, and how adult-oriented events are sectioned
      and worded (blocker 3a)
- [ ] 3a. How adult-oriented events are presented: separate section? which wording? does a
      named add-on from the price sheet appear at all?
- [ ] 4. Contact channel: form, phone, e-mail, messenger?
- [ ] 5. Upload target: Strato file space, Squarespace or Jimdo — only needed at Milestone 9
      (the site itself is built as a static site, that is decided)
- [ ] 6. Russian switch: whole main page, or selected texts only?
- [ ] 7. References, testimonials, venues — do they exist?
- [ ] 8. Cookie banner, analytics, image rights beyond DSGVO

## Gotchas

- The repo had **zero commits until 2026-11-04**; nothing was pushed, no remote assumed.
- `customer-assets/customer-data.txt` contains real hosting passwords. Never open it. Check
  `git status` whenever staging anything from `customer-assets/`.
- Asset names in `project.md` are filename guesses, not verified content. `fuzzy-circle-1/2`
  are confirmed decorative balls and stay unused. Anything else still needs a human check
  before use.
- No frameworks, libraries or dependencies without asking first (see `agents.md`).
- `customer-assets/figure-cheburashka-2.PNG` has an uppercase extension — keep that in mind
  for URLs and build scripts once files are served, on case-sensitive servers.

## Done

- 2026-11-04 — Milestone 1 (Setup) closed: repo + docs committed, hosting approach and stack
  decided (static site, plain HTML/CSS/JS, no build step, zero dependencies).
- 2026-11-04 — `project.md` (German), `agents.md` (English incl. session protocol),
  `PROGRESS.md`, `.gitignore`, asset renames, asset inventory corrected against the real
  filenames, initial commits `fa446e1` + `95bf819`.
