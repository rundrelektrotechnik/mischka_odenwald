# PROGRESS.md — where the work stands

**If you are a fresh AI session with a small context window: read this file first.**
It is the source of truth for current state. `agents.md` = rules, `project.md` = facts.
Update it before a session ends — see "Session protocol" in `agents.md`.

## Current phase

**Phase 3 — First site skeleton written (text-only, placeholders).** Created `index.html`,
`index.ru.html`, `impressum.html`, `datenschutz.html`, `assets/css/style.css`,
`assets/js/site.js`. Hero uses a resized copy of `figure-mischka-1.png` plus `gold-paint-stroke.png` (in `assets/img/`). Language switch = plain links between the two
main pages (works without JS). Last updated: 2026-11-05

## Next step

1. **Better Mischka assets arrive later** (human): swap `assets/img/figure-mischka-1.png`.
   Other images (plates, other figures) still need the human to say what they show and where
   to use them. Resize with PowerShell System.Drawing (no install needed), 800px wide, into
   `assets/img/`; `customer-assets/` stays untouched.
2. **Confirm with the human:** the colors in `style.css` are a placeholder palette, not
   matched to the artwork; the offer list (3 cards) is derived from the price sheet and not
   confirmed; the adult-audience sentence wording; the Russian copy (native check).
3. Replace remaining placeholders: e-mail (in the txt file), Kleinunternehmer/USt note, hosting in Datenschutz.
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

- 2026-11-08 — Share image `assets/img/og-mischka-odenwald.jpg` (1200x630, ~60 KB) generated with
  System.Drawing: customer's `background-gradient.png` scaled to cover + a **yellow disc with the
  real Mischka figure** (`figure-mischka-1.png`, cropped like the homepage orb: cover, top 6%,
  1.25x zoom, gold ring) centered with a soft shadow. I cannot see images, so framing/colors are
  unchecked. Wired into og:image / twitter:image (summary_large_image). Social platforms cache
  previews: use the Facebook Sharing Debugger to refresh after going live.
- 2026-11-08 — SEO basics, all derived from `Domain:` in the text file (no domain → plain
  relative language link, no crawl files): canonical, hreflang de/ru/x-default, Open Graph +
  Twitter tags, LocalBusiness JSON-LD (same data as the Impressum, no opening hours), generated
  `robots.txt` and `sitemap.xml` (legal pages stay noindex and out of the sitemap). Dev server and
  `preview.mjs` serve/copy both files. Todo after going live: Google Search Console + submit the
  sitemap; use real search words in the page titles (DE/RU).
- 2026-11-08 — **Hosting decided: GitHub Pages** (Strato dropped). Workflow
  `.github/workflows/build.yml` builds on every push/PR and deploys from main only
  (`actions/deploy-pages`; ZIP artifact `webseite` kept). `Hoster: GitHub Inc.` in the text file;
  Datenschutz §3 has a GitHub/US-transfer paragraph (DPF statement from my knowledge — legal
  check). DNS at Squarespace: A ×4 for @ (185.199.108-111.153), CNAME www →
  rundrelektrotechnik.github.io. **Site is live at https://mischka-odenwald.de with HTTPS**
  (verified with curl; http and www redirect correctly).

- 2026-11-08 — Domain **mischka-odenwald.de** is owned via Squarespace (domain only, no site).
  New text-file key `Domain:`; the Impressum/Datenschutz show it as "Website" and Datenschutz §3
  has a paragraph on Squarespace as domain/DNS provider (Squarespace Ireland Limited address
  from my knowledge — verify). **Hosting is still undecided** (placeholder remains); proposed
  GitHub Pages deploy from the existing workflow + DNS records at Squarespace — waiting for the
  human's go before changing the workflow or DNS. Once hosting is fixed: fill `Hoster:` /
  `Hoster Anschrift:`, then consider canonical/hreflang/Open Graph tags with the domain.

- 2026-11-08 — Branch renamed `master` → `main`. Remote `origin` =
  https://github.com/rundrelektrotechnik/mischka_odenwald (**public**). Added `README.md`
  (German, non-technical: edit the txt on GitHub, download the artifact), the workflow
  `.github/workflows/build.yml` (on push to main / PR / manual: `npm run build:prod` →
  artifact `webseite` from `dist/site`; **no deployment**, no domain/hosting yet) and
  `scripts/preview.mjs --out`. **Push held back:** the repo is public but `customer-assets/`
  (price list xlsx, flyers, customer notes) is tracked — needs the human's decision before it
  goes public (see conversation).

- 2026-11-08 — Phones (< 40em): the half circle is replaced by a **compact wrapped grid** of the
  orbs (4 + 3, names screen-reader only) above the detail card; saves ~80px+ of height and
  avoids the empty arc interior. Half circle stays from 40em up. Checked at 375px and 320px.

- 2026-11-08 — **Legal pages completed (standard texts, not lawyer-reviewed).** Impressum: § 5 DDG
  address block, contact, **Umsatzsteuer = Kleinunternehmer § 19 UStG** (confirmed by the human;
  "Kleinunternehmen" in the text file is treated as a tax status, so no "Rechtsform:" line is
  printed for it), Verbraucherstreitbeilegung ("nicht bereit/verpflichtet" — assumption, confirm),
  Haftung für Inhalte/Links, Urheberrecht. Datenschutz: Verantwortliche, Allgemeines, Hosting +
  Server-Logs, Kontaktaufnahme (channels from the data), WhatsApp paragraph (only if shown),
  no cookies/analytics/external resources, social-links section (only networks shown), Rechte +
  Aufsichtsbehörde Hessen (HBDI). "Entwurf" banners removed. **Only open placeholder:** the
  hosting provider — new text-file keys `Hoster:` and `Hoster Anschrift:` (fill when the
  upload target is decided; until then a visible [PLATZHALTER] stays in Datenschutz §3). Keep
  Datenschutz true if cookies, fonts, analytics or a form are ever added.

- 2026-11-08 — Balloon bouquet orb **hidden for now** until the customer supplies a proper
  cut-out: `[Figur 8]` in the text file has `Anzeigen: nein` (any figure block supports it;
  "ja"/delete the line to show). Block and image stay in place. Impressum/Datenschutz re-checked
  against the newest data: address, Inhaber/in, phone and e-mail come from the text file; the
  Datenschutz contact sentence and the social-links section are now generated from the channels
  actually shown (E-Mail, Telefon, WhatsApp / Instagram, Facebook, WhatsApp). Still open for
  legal review: "Rechtsform: Kleinunternehmen" is a tax status rather than a legal form —
  confirm wording (e.g. "Einzelunternehmen"/Kleinunternehmer § 19 UStG); hosting section.

- 2026-11-08 — New customer photo `balloon-bouquet-photo.jpg` (JPG with background, 1080x1439):
  used as a **circle crop** (not a true cut-out — no background removal, and I cannot see the
  image) in an extra orb in the **middle of the half circle**, between the top figure (Stas) and
  the detail card. Resized copy `assets/img/photo-balloon-bouquet-1.jpg` (640px). In the text file
  it is `[Figur 8]` with `Position: Mitte`; such figures are excluded from the arc spacing. The
  crop is centered (`object-position: 50% 50%`) — human must check the framing, and supply a
  real cut-out PNG if a yellow-disc look is wanted.

- 2026-11-08 — Contact socials changed to **icon-only**: round yellow icon buttons
  (WhatsApp, Instagram, Facebook; name as screen-reader text + tooltip) in a row below the
  e-mail/phone tiles. Supersedes the compact social tiles from earlier today.

- 2026-11-08 — "Preise auf Anfrage." removed from the page and from the text file (the
  `Preishinweis` lines are gone; no price statement on the site now). Contact section relaid out
  as **tiles** (e-mail, phone | WhatsApp, Instagram, Facebook) in a 6-column grid: 2+3 on wide
  screens, on phones e-mail/phone full width and the three social tiles compact in one row.
  Social links now appear **only there**; the footer is just Impressum / Datenschutz. The
  "Soziale Medien" intro lines were removed from the text file. Handles shown on the tiles are
  derived from the profile URLs.

- 2026-11-08 — WhatsApp added to the social links: `https://wa.me/<digits of Telefon>`, derived
  automatically; `WhatsApp anzeigen: ja/nein` in the text file switches it. Icon is inline SVG.
  Datenschutz note and the social intro text now mention WhatsApp (legal wording still to be
  reviewed). The e-mail address was filled in by the human in the text file.

- 2026-11-08 — Favicon: schematic Mischka (flat bear head on a yellow disc) as
  `assets/img/icon-mischka-favicon.svg` + 32px PNG + 180px apple-touch (square yellow bg).
  Fur colors are a **guess from sampled pixel averages** of `figure-mischka-1.png` (I cannot
  see it): head `#5b4f4b`, muzzle `#d9c3b0`. Human must check the look and correct the colors in
  the SVG; the PNGs were drawn with the same shapes (redo both if the design changes).

- 2026-11-08 — **Customer-editable content file.** `Texte-und-Kontaktdaten.txt` (root, German
  instructions, `[Abschnitt]` + `Schlüssel: Wert`, `#` = note) holds all non-legal texts (DE+RU),
  the figures (name, text, image file) and the contact data. `scripts/build.mjs` renders
  `templates/*.tpl.html` into the root pages `index.html`, `index.ru.html`, `impressum.html`,
  `datenschutz.html` (**generated — edit the templates or the txt, never the root html**).
  `npm run dev` and `npm run preview` run the build first; `Vorschau-erstellen.bat` is the
  double-click version for the customer (needs Node). Figures/offer cards/target groups are
  numbered blocks and can be added by copying. Empty e-mail → visible [PLATZHALTER]; empty RU
  text → German fallback + warning. Fixed UI strings live in `UI` in build.mjs.
- 2026-11-08 — Real data from the human: Firma `mischka_odenwald` (**confirmed as the official
  name**), Inhaberin Anastasiia Rempel (shown as "Inhaber/in"), Lauerbacher Weg 19, 64711
  Erbach, tel +491604612442, Rechtsform Kleinunternehmen. Impressum + Datenschutz fill from
  these. **Still missing:** e-mail; Kleinunternehmer note (§ 19 UStG) / USt-ID wording needs a
  legal check (placeholder kept).

- 2026-11-05 — Human asked for a `package.json`. Added it with **zero dependencies** (this
  supersedes the earlier "no package.json" wording; the no-dependencies rule stands). Commands:
  `npm run dev` = static server on http://127.0.0.1:4321 (serves only index*.html, legal pages
  and `assets/`; never `customer-assets/`). `npm run preview` = builds `dist/preview/`
  (git-ignored) for the customer: copies the site, rewrites root-absolute/directory links to
  relative file links, fails on any unresolved link/asset. Open `dist/preview/index.html`
  straight from the file system. Needs Node >= 18. New pages must be root-level `*.html`
  files (or add them to the allow-list in `scripts/dev.mjs`).

- 2026-11-05 — Human: main image is "mischka" (better ones come later); resizing is allowed
  freely; **layout and styling take priority** over content details right now. Used
  `figure-mischka-1.png` (800px copy) and `gold-paint-stroke.png` (800px copy) in the hero.
  Gotcha: the in-app browser pane shows file:// pages as snapshots without CSS/images; use `npm run dev`.

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
