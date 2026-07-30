# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers and design leads at product companies. They land on the site
deciding whether Natasha is worth bringing in — the job the site does is prove
depth and judgment a card grid can't hold, in the time a reviewer actually gives
a portfolio.

## Product Purpose

Prove Natasha ships real, working systems — not just polished portfolio output.
The core belief the site should leave a reviewer with: she ships real, working
systems (concrete shipped impact — replaced a two-day gatekept process, a
planning screen that survived 7-8 prototype rounds, honest about what broke and
what a senior colleague had to fix). Success is a reviewer walking away certain
of that, not merely impressed by craft.

## Positioning

The site's own structure is evidence, not decoration: it is built the way a
project is planned — chapter order follows real build order, the nav is a
progress rail (not a menu), and content discloses in the same 5-level depth the
underlying product uses. The presentation itself demonstrates the planning
discipline the case study describes. Combined with scrupulously honest credit
(SOLO / SURVIVOR / HONEST tags, never narrating shared work as solo), this is a
claim a generically "cool" portfolio competitor could not copy without also
having shipped the underlying discipline.

## Operating Context

Next.js + React + TypeScript, deployed on Vercel. Prose lives in markdown,
separate from components, so Natasha can fix a typo from her phone with no
toolchain. Real product screens are gated behind a shared password
(middleware + cookie); the public layer uses reconstructed, original-abstraction
diagrams only — never proprietary screenshots or layouts.

CCPM is the first and currently only real project folder. Multiple other,
isolated future project folders are planned (per Natasha, 2026-07-28) but none
are named, scoped, or built yet. Structural chrome tied to a second folder's
existence (the shelf, the drawer closeout/lintel, the "↑ Drawer" rail entry)
stays dormant — by design (the N≥2 gate) — until a second folder's content
directory actually exists. Do not invent names or content for these future
folders ahead of that.

## Capabilities and Constraints

- **Confidentiality is a hard constraint.** The CCPM product is proprietary B2B
  software (2022 user manual stamped proprietary). No real screenshots,
  diagrams, numbers, or replanning formulas may appear on the public layer.
  Employer confirmation on what may be shown is still pending — keep it out
  when uncertain.
- **The N≥2 gate.** Second-folder chrome (shelf/drawer/rail entry) is derived
  from content existing, not a flag. This is deliberate: it prevents scaffolding
  from ever outrunning substance.
- **`GATE_PASSWORD` is currently unset** — the password gate runs on the
  documented stand-in value in `.env.example` and says so on both sides of the
  door. Needs a real value set on Vercel before any approved real screen goes
  behind it.
- **The legacy CCPM-predecessor product's real name is unconfirmed** — public
  copy currently says "the legacy application" as a placeholder.

## Brand Commitments

- Name: **Natasha M.** — appears once, at the top of the frame, never repeated
  per-chapter.
- Voice: dry, self-deprecating, concrete, allergic to grandeur. "Report, don't
  compose" — every line carries a specific fact a stranger couldn't guess.
  Jokes are rationed (one is a signature, three is a tic).
- Approved copy for the opening and chapters 00–02 is final and must be set
  exactly, not paraphrased.

## Evidence on Hand

- Final approved copy: the opening lines, and chapters 00 (The old system), 01
  (Configuration), 02 (Planning).
- Chapter content breakdowns: 01's four pieces (Custom Attributes, Workflows,
  Reason Master, Holiday Master, each with a credit tag); 03's ownership
  (Modify Subtasks, the updater/reviewer role-split logic).
- Credit assignments were cross-checked against an actual contribution
  spreadsheet — the SOLO / SURVIVOR / HONEST tags are load-bearing facts, not
  flavor.
- Reference mockups in the repo: `folder_craft.html` (the folder-object
  construction to match), `all_chapters.html` (source prose/breakdowns for 00,
  02, 03), `case_full.html`, `landing.html`.

**Stated absences — do not fabricate these:**
- 03's level-1 headline is not yet written (leave as a marked TODO).
- Deeper levels (2-4) for all chapters are drafted from source material but not
  finalized.
- The opening's outcome copy + pictorial are placeholder only.
- The opening panel's `System` line is reported copy, not Natasha's own words yet.
- The CCPM folder cover's own `Role` line is stubbed.
- The public contact email string does not exist yet.
- Names/scope for the future non-CCPM project folders do not exist yet.

## Product Principles

1. Chapter and folder order mirrors the real build order, never "best work
   first" — sequence itself carries meaning.
2. A section earns "chapter" status only if Natasha can carry it alone; shared
   work is context, never narrated as solo.
3. Structural chrome must never outrun actual content — the N≥2 gate keeps the
   site's scaffolding proportional to what's actually been built.
4. Confidentiality first: when it's unclear whether something proprietary can
   be shown, it stays out.
5. Report, don't compose — copy wins on specific, unguessable facts, never on
   mood or grandeur.

## Accessibility & Inclusion

WCAG 2.1 AA is the standing bar (confirmed) — contrast, keyboard navigation,
and visible focus states are hard requirements, not aspirational. A prior
2.06:1 contrast failure (a dimmed "coming" folder label) was found and fixed
during build; treat that class of failure as a regression, not a style choice,
if it reappears.
