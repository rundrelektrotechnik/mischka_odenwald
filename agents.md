# agents.md — working rules for this repository

Read before doing anything: `PROGRESS.md` (current state), `project.md` (project description),
then this file (rules).

## Language

- All static content on the site is **German**. Legal pages (Impressum, Datenschutz) are
  German only — never translated.
- The main presentation page must support a **German / Russian language switch**. Russian
  copy must read as natural Russian for a native Russian-speaking audience, not a literal
  machine translation. Keep both versions in parallel: if one changes, update the other.
- This file is English; project docs and site content are German (Russian where relevant).

## Images — read this before touching assets

- I **cannot read images**. Never attempt image vision, and never describe an image from a
  guess.
- If an image's content matters, **ask the human partner what is in it**, then rename the
  file so its name matches what the file actually contains.
- Asset naming convention (follow it for new files):
  `<type>-<subject>[-<variant>].<ext>` — e.g. `figure-mischka-1.png`,
  `background-plate-gold-1.png`, `megaphone-green.png`.
- `customer-assets/` is customer-supplied material. Treat it as read-only: do not crop,
  recolor, or overwrite it. Copying into a site folder is fine, but say what changed and
  where.
- Never assume an asset is usable somewhere; confirm with the human partner first.
- Some costumed characters exist but have no good assets yet. Do not invent or name their
  profiles; leave a place for them and wait for the material.

## Never expose credentials

- `customer-assets/customer-data.txt` contains hosting login credentials. Do not read,
  quote, copy, or reference its contents in code, docs, comments, config, build scripts,
  or commits.
- Never commit credentials, tokens, or account names to any file. Keep this file
  untracked, and flag it if it ever gets staged.

## Content rules

- Do not invent facts: prices, contact details, availability, service scope, client names,
  customer photos, awards. Ask instead. `Preise - mischka.xlsx` is the source of truth for
  prices, but confirm before publishing anything from it.
- Legal pages need real, verifiable company details. Where information is missing, leave a
  clearly marked placeholder and call it out, rather than filling in plausible-sounding text.

## Visual and interaction direction

- Look: carnival / circus, colorful and playful — but stylish and restrained. Not cluttered,
  not loud or cheap.
- Animations must be subtle and tasteful. Respect `prefers-reduced-motion`, never block
  content, never autoplay anything noisy, and keep the page light on mobile.
- Existing artwork defines the palette (gold strokes, colored paint strokes, abstract
  background plates). Match it instead of introducing a new palette.

## Working agreement

- No dependencies, frameworks, or libraries get added without asking first.
- No deployment or hosting changes without explicit instruction.
- Keep commits scoped and descriptive; do not rewrite history.
- Ask when a decision would change what gets built; make and state obvious calls yourself.

## Session protocol (small context window: 64k)

The local model has a 64k context window, so sessions get compacted and a new one may start
with no memory of earlier ones. Follow this every session.

**At the start of a session**
1. Read `PROGRESS.md` first: it names the current phase and the next step.
2. Then `project.md` and `agents.md`. Never open `customer-data.txt`.
3. Check `git log --oneline -5` and `git status` — trust the repo over what the docs claim.
4. If an open question blocks the next step, ask the human partner; do not guess.

**During work**
- One milestone, one focused change per step; keep commits scoped and descriptive.
- Decisions must not live only in the conversation: as soon as one is made, write it into
  `PROGRESS.md` (dated entry in the Decisions log).
- New facts or surprises: update `project.md`; plan changes: update `PROGRESS.md`.

**Before finishing a session — mandatory**
1. Update `PROGRESS.md`: current phase, "Next step", checkbox status, dated Decision entry.
2. Write down anything a fresh session would need but cannot see in the repo — gotchas,
   items waiting on the human.
3. Run the verification you claim to have run (build, lint, tests where they exist) and state
   what you actually ran. Never claim completion without evidence.
4. Commit the work — and check that `customer-assets/customer-data.txt` is not staged.
5. If work is unfinished, leave "Next step" precise enough for a zero-memory session to act.

**If context runs out mid-task**
- Do not just summarize and stop. Write `PROGRESS.md` first, then say what remains.

## Open questions

Anything undecided lives in `project.md` under "Offene Punkte" — resolve it there, don't guess.
