# PROGRESS.md — where the work stands

**If you are a fresh AI session with a small context window: read this file first.**
It is the source of truth for current state. `agents.md` = rules, `project.md` = facts.
Update it before a session ends — see "Session protocol" in `agents.md`.

## Current phase

**Phase 3 — First site skeleton written (text-only, placeholders).** Created `index.html`,
`index.ru.html`, `impressum.html`, `datenschutz.html`, `assets/css/style.css`,
`assets/js/site.js`. No images are used yet. Language switch = plain links between the two
main pages (works without JS). Last updated: 2026-11-05

## Next step

1. **Ask the human what the images show** (agents.md: I cannot read images), pick hero
   image and decorative plates, rename files if needed. Figure PNGs are 3-19 MB: web-sized
   copies are needed in `assets/img/` (customer-assets stays read-only); ask how to produce
   them, since that may need a tool (no dependencies without asking).
2. **Confirm with the human:** the colors in `style.css` are a placeholder palette, not
   matched to the artwork; the offer list (3 cards) is derived from the price sheet and not
   confirmed; the adult-audience sentence wording; the Russian copy (native check).
3. Replace placeholders (e-mail, phone, Impressum, hosting in Datenschutz) once supplied.
4. Milestones 7 (look) and 8 (accessibility pass) next.

## Milestones

`[ ]` = not started, `[x]` = done. Reordering or adding steps is allowed and expected — a
new insight can change the plan. Log the change in the Decisions log instead of silently
rewriting the list.

- [x] 1. Setup: repo, docs, hosting approach, stack decision — **done** (upload target is
      only needed at Milestone 9)
- [ ] 2. Content decisions: characters, contact channel, Impressum — **mostly answered**, the
      only things still missing are the costume character names and the real Impressum values
- [x] 3. Structure: pages, nav, language switch — skeleton done, see Decisions log
- [ ] 4. German copy for the main page — first draft in `index.html`, needs human review ← **current**
- [ ] 5. Russian copy for the main page — first draft in `index.ru.html`, needs native review
- [ ] 6. Legal pages — placeholder drafts exist; need real data and legal review
- [ ] 7. Look & animations: carnival/circus, subtle motion
- [ ] 8. Accessibility: alt text, contrast, `prefers-reduced-motion`
- [ ] 9. Deploy — only on explicit instruction

## Decisions log (append-only, newest first)

- 2026-11-05 — Implemented the language switch as **two static pages** (`index.html` /
  `index.ru.html`) linked by DE/RU links: works without JS. Legal pages link back with a
  German-only note. Footer on the RU page carries the note in Russian.
- 2026-11-05 — Skeleton uses **no images** (nothing confirmed by the human) and a placeholder
  palette (dark plum, gold, red/blue/green accents). Page has no cookies, external fonts or
  scripts; Datenschutz draft says so — keep that true or update it.

- 2026-11-04 — Answered by the human: **contact channel = e-mail link + phone number**, no form,
  no third-party sender, no server script. The real address and number are still to be supplied.
- 2026-11-04 — Answered: **the adult part appears as one neutral sentence, no list** — the named
  adult add-ons from the price sheet ("Stas Striptease", "Sex Bomb") stay off the page.
- 2026-11-04 — Answered: **the Russian switch covers the whole main page**; legal pages stay
  German with a German-only note. Implementation is still open: one file with a JS toggle vs.
  two static pages (`index.html` / `index.ru.html`). Leaning to two pages so it works without JS.
- 2026-11-04 — Answered: **Impressum details are placeholders for now**, clearly marked, so the
  legal pages cannot go live until the human replaces name/address/e-mail/phone.
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

Same topics as `project.md` → "Offene Punkte", but numbered differently here (project.md
re-numbers after the struck-through decided items were merged).

- [x] 0. Stack choice — answered: plain HTML/CSS/JS, no build step, no dependencies.
- [ ] 1. ~~Impressum: e-mail/phone channel decided (e-mail link + phone)~~ — still missing:
      company name, address, the real e-mail address and phone number. Placeholders in use.
- [ ] 2. Extra costume characters: their names, and when their assets arrive
- [ ] 3. ~~Which prices may become public~~ → decided: **none, "auf Anfrage"**. Still open:
      which items of the offer list are shown
- [x] 3a. Adult events — answered: **one neutral sentence, no list**, no named add-ons
- [x] 4. Contact channel — answered: **e-mail link + phone**, no form
- [ ] 5. Upload target: Strato file space, Squarespace or Jimdo — only needed at Milestone 9
      (the site itself is built as a static site, that is decided)
- [x] 6. Russian switch — answered: **whole main page**, legal pages stay German
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

- 2026-11-04 — Milestone 2 answered by the human: contact = **e-mail link + phone**, adult part
   = **one neutral sentence, no list**, Russian switch = **whole main page**, Impressum =
   **placeholders for now**. No site files written yet.
- 2026-11-04 — Milestone 1 (Setup) closed: repo + docs committed, hosting approach and stack
  decided (static site, plain HTML/CSS/JS, no build step, zero dependencies).
- 2026-11-04 — `project.md` (German), `agents.md` (English incl. session protocol),
  `PROGRESS.md`, `.gitignore`, asset renames, asset inventory corrected against the real
  filenames, initial commits `fa446e1` + `95bf819`.
