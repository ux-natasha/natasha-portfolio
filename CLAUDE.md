# CLAUDE.md — Natasha M. portfolio

This file is the source of truth for the build. Read it fully before writing code.
It encodes decisions already made. Do not relitigate them, and do not fill gaps
with defaults — if something isn't specified here, ask, don't guess. The failure
mode this project exists to avoid is generic template output.

---

## 0. What this is

A **framed monograph portfolio** for Natasha M., a product designer with three years
at Vector Digital Labs (the IT arm of a consulting firm). The CCPM work is the deep
centre, but it is NOT the whole site — it sits inside a frame that opens on Natasha
(the designer) and closes out onto other future work.

Structure is a FRAME, three movements:
- **TOP — Natasha, lightest touch.** Name + a line (the gray-line opening copy IS
  the introduction — it shows how she thinks). Not an "about me," not a hero. Then
  straight down into the work.
- **CENTRE — the CCPM compartment.** The four chapters (00–03), the deep dive. This
  is the monograph proper and the bulk of the site. CCPM is the first compartment,
  not the only shape a compartment can take — see "Compartments scale" below.
- **TAIL — the drawer.** After 03 closes, the view pulls back out to reveal the
  drawer: the CCPM folder just read, PLUS dimmed/labelled "coming" tabs for future
  work (**Writing**, **Reading** — plain labels, Natasha's register; not "Musings"
  etc.). Real structure, placeholder contents.

**Two zoom levels (the drawer/folder model).** You (Natasha) are the drawer. CCPM is
one folder in it. Future work = more folders later. So navigation has TWO levels:
folder tabs (00–03) navigate WITHIN the CCPM folder; a level above (the drawer) holds
the CCPM folder as one item among future ones. The rail therefore has an "up to
drawer" position above the chapter tabs. Step back = see the cabinet; step in = read
the folder.

**Compartments scale (settled, 2026-07-30) — a real review flagged that the
original model only worked for CCPM.** A compartment declares a `unit`:
`"chapter"` (a build-order sequence, like CCPM/VPro) or `"piece"` (a set of
independent, unordered work — e.g. a future Motion Studies compartment). The
noun and the "in the order they were built" claim both key off this one field;
everything else — the tab row, the folder shape, the pager, the route a folder
opens onto — is identical either way. A future compartment that is one project,
several projects, or a loose set of pieces all use the same nav; nothing about
it assumes CCPM's shape. See §1e for what a folder actually opens onto.

Audience: hiring managers and design leads at product companies.
Job of the site: prove depth and judgment a card grid can't hold — AND show Natasha
is more than one project, without faking content that isn't there yet.

RISK TO MANAGE: two nav levels + a drawer holding one real folder can tip into
over-engineered scaffolding-for-its-own-sake. Discipline: the drawer is a brief
moment you pass THROUGH, not a second homepage. One real folder, confidently the
centre. Future slots (Writing/Reading) are dimmed, labelled, clearly-coming — quiet
to the point of near-invisible until filled. Never let the empty slots dominate.

---

## 1. The controlling concept (architecture, not decoration)

**The site is structured the way a project is planned.** This is invisible — a
logic the site obeys, never a picture it shows. There is NO Gantt chart, NO
timeline graphic, NO chart on the homepage. If the concept ever becomes visible
as an illustration, it has failed.

It cashes out as exactly three structural rules:

1. **Chapter order = build order.** Chapters run in the order the product was
   actually built, not "best work first." Sequence with dependencies.
   Order: 00 old system → 01 Configuration → 02 Planning → 03 Tasks.

2. **Nav = a rail, not a menu.** It shows where you are in the sequence and how
   much remains. (Natasha built exactly this twice in the real product: a progress
   bar and a critical-path visualization.) It is a progress rail.

3. **Scroll = depth.** A chapter opens at a one-line level that reads in ~10s.
   Scrolling goes DOWN INTO the same chapter (progressive disclosure, up to ~5
   levels — mirrors the product's fixed 5-level task breakdown), not across to the
   next section. The hard requirement: legible in 10 seconds AND rewarding in 10
   minutes. Both, in layers — never a compromise between them.

Plus one spatial rule:

4. **Whitespace = protected slack ("buffer").** When there's more to say, it goes
   into depth (a deeper level), never into the margin. Whitespace is a rule, not a
   taste. Do not fill it.

**HARD RULE — no ink dividers.** Sections and chapters separate by whitespace scale
alone. NEVER use a full-width horizontal rule/hairline as a section or chapter
divider — that is ink doing space's job, and it is the single fastest way this site
starts reading as a document/resume instead of a workspace. (This was tried once
and produced exactly that failure — see build log.) Space is the separator, always.

**HARD RULE — meta block is a panel, not a table.** "Role / System / Owned /
Outcome" renders as a compact bordered panel (inspector-style, attached near the
content it describes) with tight label/value stacking. It must NEVER render as a
ruled/bordered table with a horizontal rule under each row — that is a CV skills
table and reads as a resume immediately.

**HARD RULE — depth defaults CLOSED.** Only level 1 is visible by default, for
every chapter, always. Deeper levels are reached by an explicit, quiet affordance
(a small "+N more" or a dot) — never rendered pre-expanded, never shown as a nested
indented outline with all levels visible at once. An exploded static outline
defeats the entire 10-second/10-minute rule and reads as a document, not a reveal.

**HARD RULE — the rail must exist as a real, persistent element.** Not a floating
avatar/chat-bubble in a corner. A structural column, always on screen, typographic
(chapter numbers, not icons), showing current position + remaining.

**Stub/placeholder markers: mark once, quietly, per block — never repeated inline
before every field.** A stub tag is a small corner label, not a redline stamp
appearing multiple times on one screen.

Test for any proposed feature: does it change chapter order, what the nav is, or
what scrolling does? If not, it's costume — cut it.

### 1a. The workspace skin (interaction layer only)

The planning logic above is the DEEP STRUCTURE and does not change. On top of it
sits an interaction skin: the site behaves like the design/records tool the work
was built in. This is skin, not architecture — it changes how the plan is *touched*,
never what the plan *is*.

- **Rail nav = folder tabs.** The rail reads as the cut tabs on file dividers —
  chapter numbers 00–03 as tabbed edges. Active tab carries the pink. It's a real
  persistent structural column (NOT a floating bubble), showing position + remaining.
  Selecting a chapter (via tab or scroll) triggers a lateral **SLIDE** transition:
  the current record pushes off to the side as the next slides in — thumbing forward
  through a set of records. Slide, NOT a page-flip/rotate (quieter, cleaner). The
  folder is implied by MOTION and the tab cuts, never drawn in skeuomorphic detail
  (no hinges, no drawer chrome, no manila texture). Grainy paper + ink; pink only on
  the active tab + interaction.
- Opening a chapter reads as selecting a record: selection handles / a bounding box
  settle around the selected thing.
- The depth-reveal reads as inspecting a layer — deeper INTO the selected record.
- Rendered entirely in ink/paper/2%-pink. Selection handles are pink (they're
  interaction).

**Scroll ↔ tab sync + the scroll-jack boundary (important engineering rule).**
Rail tabs and scroll position stay synced — scrolling advances chapters, clicking a
tab jumps scroll, they always agree. BUT "scroll drives the flip" must NOT become a
pinned horizontal scroll-hijack inside chapters (the kill list / Kimi ref forbids
scroll-jacking + scroll traps). Resolution: WITHIN a chapter, scroll is normal
vertical scroll driving the depth levels. Only the HAND-OFF between chapters does
the lateral slide, triggered at the chapter boundary. This gives the folder-flip
feeling at the seams without trapping the scroll. Under prefers-reduced-motion the
slide degrades to a plain anchor jump. (If Natasha later requests the fuller pinned-
horizontal treatment, revisit — but default to the boundary-slide version.)

Hard discipline — the workspace is BEHAVIOR, never DECORATION. A toolbar that
navigates = concept made tactile (keep). A cloud/sparkle/sticker = costume (cut).
The folder metaphor lives in the RAIL TABS + the SLIDE transition only — it is
motion and structure, not a drawn skeuomorphic cabinet. Reference for the *conceit
only* was Kaye Matulac's portfolio; its pastel gradient script and decorative chips
are explicitly OUT (see kill list). Take the tool metaphor, leave the skin.

### 1b. The opening screen (TOP of the frame — introduces Natasha, not the project)

The site opens on NATASHA (the designer), lightest touch, then descends into the
CCPM folder. It is NOT a project intro and NOT three lines on white — it is a
composed screen that boots itself into place.

Structure (in this order):
- **Name + line.** "Natasha M. / Designer, Vector Digital Labs." The gray-line
  opening copy serves as the introduction — it shows how she thinks, so no separate
  "about me" is needed here.
- **Context** — one line placing the CCPM work you're about to enter.
- **Outcome** — what was achieved, visible at first glance. **PLACEHOLDER for now:**
  render as a subtitle + one line, clearly marked as stub copy (muted / `[placeholder]`
  tag). Do NOT invent a real achievement. Include a **small pictorial** slot (a
  modest original abstraction, never a product screenshot — see confidentiality);
  can be a stubbed placeholder box until speced.
- **Descend into CCPM** — scrolling/entering goes DOWN INTO the CCPM folder (chapter
  00). This is stepping into the folder, per the drawer/folder model in section 0.

- **Name** ("Natasha M.") lives HERE and only here. Chapters do not repeat it.

Meta block (opening + echoed at chapter level) is FOUR items:
**Role / System / Owned / Outcome.** Renders as a PANEL, never a table (hard rules,
section 1).

**Load motion — Displace-style composed assembly.** On load, elements slide and
settle into place as a composed sequence — the workspace booting. NOT a scroll drift,
NOT a fade-up. Rail slides in, meta block sets, outcome pictorial settles last.

### 1c. The tail (BOTTOM of the frame — the drawer closeout)

After chapter 03 closes, the view pulls back OUT to the drawer level (per section 0's
two-zoom model). This is the frame closing — the mirror of the opening.

- Shows the **CCPM folder** just read (now one item, seen from outside).
- Plus **dimmed, labelled "coming" tabs: Writing, Reading.** Clearly future, not yet
  enterable. Plain labels (Natasha's register — NOT "Musings"/"Journal"). These tell
  a visitor she's more than one project without faking content.
- The pull-back-out motion mirrors the opening's assembly (a step up a zoom level,
  not a new page). Contact / links can live here, quiet.

DISCIPLINE: the drawer is a brief moment you pass THROUGH, not a second homepage. The
future tabs are quiet to near-invisible until filled. One real folder, confidently
central. Do NOT let empty scaffolding dominate — that reintroduces the wix read.

---

### 1d. The folder object (SETTLED — build to this)

The chapter/record renders as a physical folder. Reference implementation:
**`folder_craft.html`** — match its construction, not just its look.

**Degree of literalness: RESTRAINED PHYSICAL.** Unmistakably a folder, rendered in
the site's own grainy ink-on-paper material. NOT photoreal manila (tried and
rejected — reads as 2010s skeuomorphism, makes the folder the subject instead of the
work, and lands on the kill list).

**The folder is visually STRONG — strength through CRAFT.** Not through scale
(presence), not through quirk (character). It commands attention because every edge
is exact and the thickness is honest. Do not make it recede.

How the physicality is built (this is the part that matters):
- **Value-stepped laminations.** Back cover is a real tone-step darker than the
  sheet, with two thin crisp edge layers between them. You read thickness through
  *stacked edges and value separation*.
- **NO blur-based depth.** No large soft drop-shadow. One tight contact shadow only.
  Escalating blur reads as a sticker floating above the page — off-putting, not
  physical. This was the actual cause of an earlier failure.
- **NO fake stacked "ghost" folders behind.** Implying folders that don't exist is
  decoration masquerading as structure; it "leads nowhere." Only the folder's own
  back cover sits behind the sheet.
- **Honest fold.** One real folded corner with a visible crease line.
- **Tab row** (00–03) sits on the cover edge; active tab is lighter, carries the
  pink marker.

**Interior density: 8.** The folder is strong AND the contents are substantial —
both, not either. Pack it with REAL information: meta strip, plus the actual
breakdown (e.g. for 01: Custom Attributes / Workflows / Reason Master / Holiday
Master, each with a one-line description and a credit tag, SOLO marked in pink).
Density is earned with substance, never with ornament. A sparse interior reads as
"unremarkable" — there must be something to actually read.

**Divider rule:** dividers live in GUTTERS, never flush against text. Use a grid
with column gaps and draw rules centred in the gap (not `border-right` on cells) —
otherwise columns lose their shared left rhythm and the block starts reading as a
table.

---

### 1e. The folder is a teaser, not the chapter (settled, 2026-07-30)

**The folder cover, as it renders on the index, says "here's an interesting part
of this project" — it is NOT the chapter itself.** Selecting a tab (00–03) swaps
which folder's level-1 lede and four-field meta panel show inside the open
compartment's cover, in place, on the index. That's a preview a reader flips
through before committing, the same way you'd riffle a set of dividers without
pulling any one page out. Nothing on the index IS the chapter.

**"Read more →" is the one link that actually navigates.** It lands on the
previewed folder's own anchor inside a dedicated **Record route** (`/<slug>`,
e.g. `/vpro`) — a continuous, whitespace-separated document holding every
chapter/piece in the compartment, opening on a masthead (role/timeline/team/
outcome, always first). This is the real content; the index cover is the
trailer for it, never a substitute.

**Long-form reading, on the Record route, is a separate problem from the index
and gets its own answer** — this is what a case study needs once it can grow to
several pages, many sections, images, video: the folder-cover/tab-row model
was never meant to solve it, and doesn't try to.
- **The Spine** — the rail's record-route successor. Same persistent
  typographic column, but tracks the chapter actually in view (not the last one
  clicked) and shows a continuous read-progress fill, so "where am I" and "how
  much is left" are both answered at any scroll depth, not just at a chapter
  boundary.
- **The Catalogue** — a jump-anywhere panel, opened from the Spine, listing
  every compartment and future-work slot in one place. Answers "how do I jump
  to another compartment" without backing out to the drawer first.
- **The next-record pager** — at the end of a Record, steps to the previous/
  next compartment (wraps; never ends on a dead slot). Answers "how do I return
  to another folder."

**TO BE CLOSED LATER:** how much of a folder previews on the index cover before
a reader has to commit to "Read more" — today it's exactly level-1 (the lede)
plus the meta panel, nothing deeper. Whether a teaser should ever surface a
peek of level-2 is an open call, not a settled one; don't add it without asking.

---

## 2. Voice (copy is load-bearing — do not rewrite it)

Natasha's writing is dry, self-deprecating, concrete, allergic to grandeur. It is
the best asset on the site. **Report, don't compose.** Every line must contain a
fact a stranger couldn't guess — a number, a stake, or a specific noun. Jokes work
only when welded to a fact.

Banned register (these are the failure signals):
- Mood/atmosphere copy: "a vast subject," "what makes systems run," "a destination
  previously unexplored." Advice that could sit under any project on any site.
- "read to find out more" / "click to learn more" — Wix-shaped clickbait.
- Repeating a joke. One deadpan aside is a signature; three is a tic. Ration them.
- LinkedIn-summary voice.

When copy is needed and not yet written, draft in this voice and flag it for
Natasha — do not invent facts about the work.

---

## 3. Approved copy (final — set exactly, do not paraphrase)

Opening:
> Natasha M.
> Designer, Vector Digital Labs.
>
> Three years, five modules, and one long argument
> about the brightness of gray.
> On projectors.

00 — The old system:
> A decade of history. Four people understood the code.
> A diagram that showed what connected to what,
> but never when, or by how much you were late.
> I patched it for a year, then helped kill it,
> and learned a theory older than I am.

01 — Configuration:
> A config change took two days of someone else's time.
> A hidden column took another.
> I designed the part where you do it yourself.

02 — Planning:
> Seven or eight working prototypes before one survived.
> The screen that breaks the software if it's wrong.

03 — Tasks: level-1 line not yet written. Do not draft a headline before the
deeper levels exist. Leave a clearly-marked TODO.

Deeper levels (2–4) for all chapters are drafted from source material but NOT yet
finalized in this file. Ask before writing new chapter prose.

---

## 4. The four chapters (and the credit rule)

Authorship is scrupulously honest — this is a feature, not a weakness. Three
registers:

- **00 — The old system (prologue).** Team context. Network diagram, gatekept code
  (a config change took two days), a year of patching, the navigation fight with
  older consultants (they wanted the nav *gone*; settled on dismissible nav, no
  colour, responsive font size), the gray-on-projectors settlement.
- **01 — Configuration (SOLO).** The self-service layer that defines the whole
  system before any project exists: custom attributes, workflows, reasons,
  holidays. Replaced "two days of a gatekeeper's time." This is likely the site's
  strongest fact.
- **02 — Planning (SURVIVOR).** The team made 7–8 working prototypes; the one that
  survived was the planning screen Natasha built. Toolbar in a single line; minimal
  table; black rationed to two things a PM checks (is it critical, does it have a
  workflow); no autosave, so save-as-draft is big and prominent; 5-level breakdown.
- **03 — Tasks (HONEST).** Natasha fought it and iterated; a senior colleague broke
  it open (taller row height + the divider reused from admin). Natasha owned
  **Modify Subtasks** (multiple user journeys, own screens) and the role-split
  logic: who clicks a task determines what they see — updaters get "Task Updates,"
  reviewers get "Task Reviews" (a PM makes no progress, they judge it).

**Credit rule:** a section is a *chapter* only if Natasha can carry it alone.
Everything else is context/world. Never narrate as solo what was shared. This was
cross-checked against a contribution spreadsheet; honor it.

PARKED: whether Natasha solely designed the workflow-configuration screen. If
confirmed, it becomes 01's headline. Do NOT lean on "workflows are the hero
feature" until confirmed.

---

## 5. Visual system (LOCKED — System B structure, C's typeface)

Pick is settled: **System B's structure and layout** (specimen-sheet: mono labels,
the marker/number system, data rows, site-as-instrument) rendered with **System
C's display typeface**. This is a deliberate mix, chosen by Natasha.

Type:
- Display: **Fraunces** (serif, opsz variable)
- Labels / data / technical: **JetBrains Mono**
- Body: **Inter**
- All open-source (Google Fonts). Licensing settled, open-source only.

CAUTION — the one thing to verify by eye at full size: Fraunces is warm/literary;
B's system is technical (mono utility text). Serif-display-over-mono-labels can read
as two rooms if handled loosely. It's a real editorial move when it works. Build the
vertical slice with it and get Natasha's eye on it BEFORE treating it as final. If it
fights, the fallbacks are Space Grotesk (B's original display) or tightening the
serif's role to display-only.

Palette (fixed across all systems):
- Paper `#F1EFE8` · Ink `#16150F` · Gray `#6F6E66` · Line `#C9C7BC`
- Pink `#D4537E` (+ soft `#ED93B1`)

**Pink rule (critical):** pink appears ONLY in the interaction layer — hover,
reveal, active state. It is absent at rest and is the reward for interacting.
Roughly the last ~2% of any screen. This mirrors how black was rationed in the
real product (used only for critical things). An always-on pink contradicts the
subject and must not happen.

**Design dials (set deliberately — do not drift):**
- **VARIANCE 6** — composed asymmetry. Not grid-locked, not artsy-chaotic. Editorial
  restraint carrying a data-dense subject; full asymmetry would fight legibility.
- **MOTION 5** — Displace-style assembly, folder slide, depth reveals. Restrained
  scrubs, no bounce/overshoot. Above 3, so prefers-reduced-motion handling is
  MANDATORY, not optional.
- **DENSITY 4 in the frame / 8 inside a chapter.** The opening and drawer are airy;
  the folders are dense. This split is deliberate: Natasha's native register is
  dense-but-legible (ag-grid, MUI tables, a single-line toolbar), not airy editorial.
  Density 8 is only slop if the packed elements are decorative — pack with real
  information (breakdowns, metadata, credit tags) and it reads as a spec sheet, which
  is the goal.

---

## 6. Motion vocabulary (locked in specimen)

- **Hover:** element lifts ~3px; pink underline wipes in from the left.
  ~0.5s, `cubic-bezier(.2,.8,.2,1)`.
- **Depth reveal:** level-2 content grows DOWNWARD into the same section
  (max-height + opacity), ~0.55s, same easing. A small dot goes gray→pink on open.
- Prefer spring-like/eased motion over generic ease. No bounce/overshoot on scroll.
- Motion serves the concept (depth, sequence). No decorative animation. Scattered
  effects read as AI-generated; one orchestrated moment beats many.
- **Record-to-record slide carries a scale step (settled, 2026-07-31):** the
  outgoing folder recedes to `scale(0.96)` as it exits, the incoming one
  arrives from `scale(0.96)` — transform-only, same `--settle`/`--ease`, no
  new shadow or blur (§1d's rule holds). Reads as the folder being pulled
  from and filed back into the drawer rather than a flat push-past.
- **The opening plate settles back-to-front (settled, 2026-07-31):** the three
  gray-value planes arrive one after another (~100ms apart) rather than as one
  block, so "an argument about the brightness of gray, settled" plays out
  rather than just being illustrated. See `Plate.tsx`.

---

## 7. Tech stack & structure

- **Framework:** Next.js + React + TypeScript.
- **Deploy:** Vercel (assume this; open to reconsider if there's a concrete reason).
- **Content in markdown, separate from components.** Prose lives in `.md`/`.mdx`
  files so Natasha can fix a typo in GitHub's web editor from her phone, forever,
  with no toolchain and no dependency on any subscription. This is a hard
  requirement — do not inline chapter prose into TSX.
- **No CMS.** Each chapter is art-directed and non-repeating; a content model would
  fight every one. Flat files + markdown only.
- Scroll choreography: GSAP ScrollTrigger is acceptable; keep scrub restrained
  (~0.6–1.2). Smooth-scroll (Lenis) only if it stays subtle. No scroll-jacking, no
  scroll traps.
- Keep text as real HTML. Use WebGL/canvas only where genuinely necessary.

---

## 8. Gating (the gated layer)

- Public layer = the full story + **reconstructed diagrams drawn in code**
  (abstractions Natasha draws: the 5-level breakdown, critical path, a duration
  conflict, toolbar state changes). NOT screenshots.
- Real product screens live behind a password (Vercel middleware, one shared
  password, cookie). Some sites brief a chapter publicly and gate the full case
  study — that pattern is acceptable too.
- **CONFIDENTIALITY — hard constraint:** the product is proprietary B2B software.
  The 2022 user manual is stamped proprietary. NONE of its screenshots, diagrams,
  numbers, or replanning formulas may appear on the public site. Public diagrams
  must be original abstractions with no client data and no proprietary layout.
  Natasha is confirming with her employer what may be shown; when uncertain, keep
  it out.

---

## 9. Build order (for least iterations)

Static composition first, choreography second. This is the highest-leverage rule.
1. Lock the specimen pick → derive tokens.
2. Build ONE vertical slice end-to-end: TOP-of-frame opening (introduces Natasha) +
   one full chapter (Configuration), at full fidelity, static first. Prove the stack
   on one slice before replicating. NOTE: build the CENTRE (CCPM folder) first and
   most solidly; the frame (top line + drawer tail) wraps it — do not over-invest in
   the frame before the centre reads right.
3. Add the locked motion vocabulary to that slice (Displace assembly; folder slide).
4. Replicate structure across remaining chapters (00, 02, 03).
5. Build the rail nav with TWO zoom levels: folder tabs (00–03) within CCPM, plus the
   "up to drawer" level. Wire progress/active state + scroll↔tab sync (boundary-slide,
   NOT pinned scroll-jack — see 1a).
6. Build the tail/drawer (1c): CCPM folder seen from outside + dimmed Writing/Reading
   tabs. Keep quiet.
7. Gating middleware + reconstructed diagrams.
8. QA: reduced-motion (slide→anchor jump, remove pinning/zoom, keep all content),
   responsive (1440/1280/1024/768/430/390/360), keyboard focus, skip link, no console
   errors, 60fps.

Expect ~2–3 iteration loops per section. That's the target, not one-shot.

---

## 10. Kill list (reject on sight)

- Anything that looks Framer- or Webflow-made: three stock sections stacked, no
  matter how much animation is layered on.
- "Wix in a week" energy.
- The three current AI-design defaults: (1) warm-cream + high-contrast serif +
  terracotta accent (esp. near `#D97757`); (2) near-black + single acid-green/
  vermilion accent; (3) broadsheet hairlines + zero-radius + dense columns as a
  whole-site look.
- Y2K / pastel-maximalist styling (explicitly dropped).
- Gradients, glassmorphism, glowing orbs, bento grids, feature cards, pill buttons,
  fake terminals, random particles, generic icons, constant fade-up-on-scroll.
- Pink anywhere at rest.
- Mood copy; repeated jokes; "read more" clickbait.
- Pastel gradient script wordmarks (Canva-era; gradient text is a top offender).
- Decorative chips/stickers (clouds, sparkles) — the workspace skin is behavior,
  not ornament. If a tool-metaphor element doesn't navigate or reveal, it's costume.
- **The resume/CV/document pattern** — full-width horizontal rules as section
  dividers; fielded data (role/system/owned/outcome) rendered as a ruled table;
  every depth level exploded open simultaneously as a static nested outline; a
  floating avatar/chat-bubble standing in for the rail. This combination was built
  once and correctly rejected as "looks like a resume." See the four HARD RULEs in
  section 1 — each one exists specifically because this happened.
- **Fake depth on the folder** — photoreal manila; ghost/stacked folders behind the
  active one implying a set that doesn't exist ("leads nowhere"); large soft
  drop-shadows used to manufacture physicality (reads as a floating sticker,
  "off-putting"). All three were built and rejected. Depth comes from value-stepped
  edges, never blur. See 1d.
- **Dividers flush against text** — rules must sit in gutters, not on the text edge.

---

## 11. Build log (real attempts, what broke, what fixed it)

**Attempt 1 (opening + 00–02, static):** Rendered as a resume/CV. Root causes, all
now hard rules in section 1: full-width hairlines used as dividers instead of
whitespace; the meta block rendered as a ruled table; every depth level shown
exploded/nested instead of collapsed; the rail was a floating avatar bubble instead
of a persistent structural element; stub tags repeated inline before every field.
None of this was a concept, copy, or typeface problem — Fraunces-over-mono read
fine in isolation. It was pure layout defaulting to document conventions when the
meta block and depth reveal weren't specified down to their forbidden forms. A
corrective mockup (fix.html) demonstrates the repaired version: same words, same
type, no dividers, panel instead of table, real rail, depth closed by default.
Rebuild from this state, not from attempt 1.

**Attempt 2 (the folder object, several rounds):** Iterated on making the chapter
read as a physical folder. What failed, in order: (a) photoreal manila — rejected,
skeuomorphic, made the folder the subject instead of the work; (b) a flat card with
a tab — "too flat," because there was no back cover, so it read as a card not a
folder; (c) adding ghost folders behind + heavier drop-shadows to fix the flatness —
rejected hard: "overlapping elements that don't make sense," "a tabular structure
behind that leads nowhere," "drop shadows that do nothing but make the folder
off-putting." Lesson: I was manufacturing depth with fakery and blur. (d) Also
flagged: the interior text read as "unremarkable" — because it was sparse, not
because the type was wrong. **Resolution:** strip all fakery; build thickness from
value-stepped laminations and crisp edges; make the folder strong through CRAFT; and
push the interior to density 8 with real structural content. Result approved as
"very chic." Reference implementation: `folder_craft.html`. A follow-up alignment
fix replaced border-right cells with a gutter-divider grid (see 1d divider rule).

## 12. Open items (ask Natasha, don't assume)

Design is SETTLED — the remaining opens are all CONTENT, not design:

- **03 Tasks level-1 headline** — write from the source material, don't force it.
- **Workflow-configuration-screen authorship** (PARKED — gates 01's headline). If
  confirmed solo, it likely becomes the loudest fact on the site.
- **Outcome copy + pictorial** for the opening: PLACEHOLDER (subtitle + one line,
  stubbed pictorial). Natasha writes both — do not invent them.
- **Employer confirmation** on what may be shown in the gated layer.
- **Public email string.**
- **Deeper-level (2–4) chapter prose** — finalize per-chapter before building that
  chapter.
- **VERIFY BY EYE at full size:** Fraunces-display-over-JetBrains-Mono-labels. See
  section 5 caution + fallbacks. (The folder mockups suggest it's working, but it
  hasn't been judged at full page scale.)
- **Teaser depth (to be closed later, §1e)** — the index cover previews exactly
  level-1 + meta today. Whether a deeper peek (a hint of level-2) should ever
  surface before "Read more" is unresolved; ask before changing it either way.
