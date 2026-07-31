---
name: Natasha M. — Portfolio (The Working Folder)
description: A single-page monograph rendered as a physical folder inside a drawer — grainy ink-on-paper, a typographic rail, pink rationed to the interaction layer.
colors:
  paper: "#e7e5db"
  paper-2: "#edebe2"
  paper-3: "#f3f1ea"
  taupe: "#d4d1c4"
  taupe-2: "#cac6b7"
  taupe-3: "#beb9a8"
  ink: "#1c1b18"
  ink-2: "#413e35"
  muted: "#6a6555"
  muted-strong: "#4e4a3e"
  line: "#d6d3c6"
  rose: "#d4537e"
  rose-ink: "#a93a63"
  rose-deep: "#9c2f5b"
  shadow: "rgba(40, 37, 28, 0.16)"
  selection: "rgba(190, 58, 110, 0.14)"
  sheen: "rgba(255, 255, 255, 0.5)"
typography:
  base:
    fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  display:
    fontFamily: "var(--font-fraunces), Georgia, \"Times New Roman\", serif"
    fontSize: "clamp(2.75rem, 10.5vw, 6.5rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.02em"
    fontVariation: "opsz 120"
  headline:
    fontFamily: "var(--font-fraunces), Georgia, \"Times New Roman\", serif"
    fontSize: "clamp(2rem, 5.2vw, 3.625rem)"
    fontWeight: 600
    lineHeight: 0.99
    letterSpacing: "-0.015em"
    fontVariation: "opsz 90"
  opening-line:
    fontFamily: "var(--font-fraunces), Georgia, \"Times New Roman\", serif"
    fontSize: "clamp(1.1875rem, 2.1vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.42
    fontVariation: "opsz 40"
  chapter-lede:
    fontFamily: "var(--font-fraunces), Georgia, \"Times New Roman\", serif"
    fontSize: "clamp(1.1875rem, 2.2vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.42
    fontVariation: "opsz 40"
  stub-voice:
    fontFamily: "var(--font-fraunces), Georgia, \"Times New Roman\", serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
    fontVariation: "italic, opsz 20"
  body:
    fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif"
    fontSize: "0.90625rem"
    fontWeight: 400
    lineHeight: 1.7
  body-small:
    fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  kicker:
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, \"SF Mono\", Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.2em"
    textTransform: uppercase
  micro:
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, \"SF Mono\", Menlo, monospace"
    fontSize: "0.5625rem"
    fontWeight: 400
    letterSpacing: "0.16em"
  label:
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, \"SF Mono\", Menlo, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    letterSpacing: "0.15em"
    textTransform: uppercase
  tag:
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, \"SF Mono\", Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.04em"
  compartment-name:
    fontFamily: "var(--font-fraunces), Georgia, \"Times New Roman\", serif"
    fontSize: "1.4375rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
    fontVariation: "opsz 40"
rounded:
  focus: "2px"
  sm: "3px"
  md: "5px"
  lg: "6px"
spacing:
  gutter: "clamp(1.25rem, 4.4vw, 4rem)"
  section: "clamp(2.5rem, 6vw, 4.125rem)"
  tail: "clamp(3rem, 7vw, 4.625rem)"
  maxw: "1160px"
  rail-w: "96px"
components:
  tab:
    backgroundColor: "{colors.taupe}"
    textColor: "{colors.muted-strong}"
    rounded: "{rounded.lg}"
    padding: "0.6875rem 0.875rem 0.75rem"
  tab-active:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
  compartment:
    backgroundColor: "{colors.taupe}"
    textColor: "{colors.muted-strong}"
    rounded: "{rounded.sm}"
    padding: "0.8125rem 1.25rem 0.9375rem"
  compartment-active:
    backgroundColor: "{colors.paper-3}"
    textColor: "{colors.ink}"
  panel:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    padding: "1.375rem 1.5rem 1.5rem"
  control-button:
    backgroundColor: "{colors.paper-3}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "0.5625rem 0.875rem"
  control-button-hover:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
---

# Design System: Natasha M. — Portfolio

## Overview

**Creative North Star: "The Working Folder"**

The site is a drawer holding compartments, and each compartment holds
folders. CCPM — the critical-chain project management system Natasha spent
three years on — is one compartment, currently the only one with real
folders inside it (four: 00 old system, 01 configuration, 02 planning, 03
tasks). The compartment's own name isn't settled — content currently calls
it "VPro redesign" — and neither is that naming decision in general; treat
any name in this file as descriptive of the current build, not locked. Each
folder is built from the same ink-on-paper material as everything around
it: no manila texture, no hinge, no illustrated cabinet. Physicality comes
from construction — a folded corner with a real crease, a stacked-shadow
edge that reads as lamination — not from a picture of a folder.

Underneath the folder skin is a planning document, not a portfolio grid:
compartments and folders load from `content/` in build order, the rail is a
position readout rather than a menu, and every record opens at a one-line
"lede" with a quiet cue for more underneath. Density is asymmetric on
purpose — the frame (the opening, the drawer) stays open and airy; a folder
itself, once opened, is dense with real information (a four-field meta panel,
running prose, credit tags). Pink is rationed to interaction: it is absent
from every surface at rest and exists only as hover color, an active-tab
mark, or a current-step indicator.

**This file documents the system as it is actually built**, not as a
provisional plan. Two things an earlier version of this document flagged as
unbuilt are now shipped: the depth cue below a folder's lede opens and
closes on click (§1's grow-downward reveal, still closed by default on
every folder), and the chapter-to-chapter hand-off is the lateral slide
`CLAUDE.md` §1a/§6 describe, not a scroll/anchor jump. The load-in assembly
(§1b) and a second dark palette (see **Dark**, under Colors) are also now
built, neither of which any earlier version of this file mentioned. See
**Known Gaps & Open Decisions** at the end of this file for what's still
actually open.

**Key Characteristics:**
- A folder built from one element's stacked, hard-edged `box-shadow`s — no
  extra DOM layers, no blur standing in for a missing surface.
- Two zoom levels: a folder's own tab row within an open compartment, and a
  drawer of compartments above that.
- Pink appears only on hover, focus, an active tab, or a current-step marker
  — never at rest.
- A variable-optical-size serif for anything read as voice, an exact mono
  for anything read as data, and a plain sans for running prose.
- Flat, square corners are the default; radius is reserved for tab-shaped
  and small round controls, never for a generic content panel.

## Colors

Warm, desaturated paper tones with two structural neutrals (taupe, for
anything not yet open) and one accent held almost entirely in reserve.

### Primary
- **Rose** (`#d4537e`): the one accent, and the only color in the system
  absent at rest. Fills marks and dots only — the active folder tab's tick,
  the depth-cue dot, the open-compartment's underline spine. Measures 3.1:1
  against paper, which is enough for a non-text mark (WCAG's 3:1 floor) but
  not for type.
- **Rose Ink** (`#a93a63`): the same hue, darkened until it clears 4.5:1 for
  text. Used wherever pink needs to *read as words* — the `Solo` credit
  register, the rail's current-compartment key, `focus-visible` outlines,
  the shelf key and CTA, the placeholder tag on the opening card.
- **Rose Deep** (`#9c2f5b`): a third, darkest step in the same hue, used
  only as the far end of the current-shelf's board gradient
  (`linear-gradient(180deg, var(--rose) 0%, #9c2f5b 100%)`) and that
  gradient's border. Exists purely to give the "board" under an open
  compartment's shelf the same value-step depth logic the folder page uses
  — a light-to-dark run, not a flat tint.

### Neutral
- **Paper** (`#e7e5db`): the page ground.
- **Paper 2** (`#edebe2`) / **Paper 3** (`#f3f1ea`): two steps lighter than
  Paper. Paper 2 is the open panel/tab/compartment tone; Paper 3 is the
  lightest — the open folder sheet and the plate frame — so the reading
  surface itself is the brightest thing on the page.
- **Taupe** (`#d4d1c4`) / **Taupe 2** (`#cac6b7`) / **Taupe 3** (`#beb9a8`):
  the board — unopened tabs and compartments, the fold's exposed corner, the
  dashed borders on placeholder surfaces (`.plate`, `.slot`), and (settled
  2026-07-31, Natasha's own ask) the rail's/spine's own background — the
  persistent column reads as the case around the sheet, a tone-step darker
  than the page it sits beside, rather than flush with it.
- **Ink** (`#1c1b18`): primary text, active-state borders, the skip link.
- **Ink 2** (`#413e35`): a second text step for supporting prose — hero
  role line, meta values, compartment names — one notch lighter than Ink
  without dropping into Muted.
- **Muted** (`#6a6555`): secondary text and mono labels at rest. Re-cut from
  an earlier `#8B8576` that measured 2.9:1 and failed AA at every size it
  was used at; this value is 4.6:1 on Paper.
- **Muted Strong** (`#4e4a3e`): the same role, one step darker, for text set
  directly on Taupe (closed compartment keys, closed tab numbers) — Muted
  alone only reaches 3.8:1 there; this reaches 5.8:1.
- **Line** (`#d6d3c6`): the one hairline-rule color — rail edge, panel
  border, the gutter-divider under the meta grid, the foot's top rule.
- **Shadow** (`rgba(40, 37, 28, 0.16)`): tint for the folder's single soft
  contact shadow. Never used at full alpha; always inside a tight, negative
  spread.
- **Sheen** (`rgba(255, 255, 255, 0.5)`): a one-off `inset` highlight on the
  well (the open compartment's body) — `inset 0 1px 0 var(--sheen)` — a
  single bright pixel along its top edge, standing in for the well catching
  light where it meets the compartment tab above it. The one white-based
  color in a system otherwise built entirely from paper/taupe tones.

### Named Rules
**The Last-2% Rule.** Rose is absent at rest on every surface. It exists
only as the reward for hovering, focusing, or opening something — the
active tab's tick, the current rail step, a link underline on hover.

**The Two-Jobs-One-Hue Rule.** Rose is split by *function*, not by taste:
`rose` (`#d4537e`, 3.1:1) marks things — ticks, dots, spines, the shelf's
current-state gradient — where the WCAG bar is 3:1 for non-text. `rose-ink`
(`#a93a63`, 4.5:1+) sets anything that is *type* — credit tags, focus
outlines — where the bar is 4.5:1. `#d4537e` cannot legally carry 9px mono
text; conflating the two was a real, fixed contrast bug. The rail/spine key
moved off rose-ink entirely once the rail's own background became Taupe
(above) — rose-ink measures under 4:1 there, and resting key text sitting
in rose at all cut against the Last-2%-Rule below anyway, so it now takes
`muted-strong` under the Board-Text Exception like any other closed key.

**The Board-Text Exception.** Any text sitting on `taupe`/`taupe-2` uses
`muted-strong`, never `muted` — the same gray measures differently on a
darker ground, and the site has two grays for exactly this reason.

### Dark

A second, neutral-cool palette, live at `app/globals.css` under
`@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]`. It
follows system preference until someone touches the toggle at the foot of
the rail, then remembers that choice in `localStorage` and applies it
before first paint (a blocking script in `app/layout.tsx`, so there is no
light-mode flash for a returning dark-mode reader).

It is a re-derivation, not an inversion — every color keeps the *job* it
has in light mode, re-cut for a dark canvas:
- **Paper** drops from `#e7e5db` to a neutral near-black (`#18191b`), with
  `paper-2`/`paper-3` still stepping *up* toward it as a surface opens —
  the same direction light mode already uses, unchanged.
- **Taupe** steps *down* below paper instead of up past it. Light mode's
  taupe is a darker tone than its paper; dark mode's paper is already close
  to the floor, so there's no room to go darker in the same direction —
  taupe recedes below the canvas instead, keeping the same "less
  prominent than what's open" meaning without crushing into black.
- **Rose** is lifted and warmed (`#e0648c` / `#f0a8c2` / `#a53e64`) so both
  contrast floors still clear against the darker grounds — 3:1 for marks,
  4.5:1 for type — the same contract as light mode, not a relaxed one.
  It's the one color that stays warm on purpose: the neutrals went cool,
  rose is still the accent.
- **`--line`** flips which side of paper it sits on. In light mode it's a
  tone-step *darker* than the sheet — the same family as taupe — because
  that's what reads as a lamination edge on a light canvas. In dark mode a
  visible edge has to be *lighter* than the sheet instead (elevation reads
  as brightness, not shadow, once the canvas itself is this dark), so
  `--line` sits above `paper-2` rather than below it. The folder's
  stacked-shadow lamination (`.page-frame`'s `box-shadow`, alternating
  `--paper-2`/`--line`) needed no changes — the same two variables, now
  carrying values on the other side of the sheet, still produce visible
  steps.
- **`--sheen`** and **`--shadow`** stay structurally the same idea (a
  soft top-edge highlight, a soft contact shadow) at lower opacity and a
  cooler tint — a bright white sheen or a heavy black shadow would both
  overstate themselves on a ground this dark.

The toggle itself is typographic, not an icon (§1's rule for the rail
extends to anything living in it): `.rail-up`'s existing hover-lift/
underline idiom, reused rather than duplicated, labelled with the
destination the same way `.rail-up` already says "↑ drawer" — "→ dark" in
light mode, "→ light" in dark. It renders nothing until it has resolved a
theme client-side (`localStorage`, then system preference), so it never
shows a guess.

## Typography

**Display Font:** Fraunces (variable, `opsz` axis loaded — no fixed weight
list — with Georgia / Times New Roman fallback)
**Body Font:** Inter (with system-ui fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace fallback)

**Character:** A warm, literary serif carries the name, chapter titles, and
any line meant to read as *voice* — the hero line, a chapter's lede — set
against an exact mono for every label, tag, and data value, with Inter
holding the running prose in between. The pairing is deliberate: a
technical, specimen-sheet skeleton (mono labels, numbered tabs, data rows)
rendered in a warmer display face than a pure utility system would choose.

### Hierarchy
- **Base** (400, `1rem`, line-height 1.6, Inter): the `body` element's own
  default. In practice almost invisible — every visible block of copy on
  the page carries a role-specific size that overrides it — but it's the
  size any new, un-styled text will render at, so it's tokenized rather
  than left as an implicit browser default.
- **Display** (600, `clamp(2.75rem, 10.5vw, 6.5rem)`, line-height 0.92,
  `opsz 120`): the name, once, at the top of the frame. Nothing else on the
  page uses this step.
- **Headline** (600, `clamp(2rem, 5.2vw, 3.625rem)`, line-height 0.99,
  `opsz 90`): a folder's own chapter title.
- **Opening line** (400, `clamp(1.1875rem, 2.1vw, 1.3125rem)`, line-height
  1.42, `opsz 40`, max 34ch): the hero's one line of approved copy — the
  ten-second read that stands in for an "about me."
- **Chapter lede** (400, `clamp(1.1875rem, 2.2vw, 1.375rem)`, line-height
  1.42, `opsz 40`, max 38ch): a folder's own ten-second opening line — level
  1 of the depth model. Same voice as Opening Line, a hair larger, a
  slightly wider measure.
- **Stub voice** (400 italic, `~0.9375rem`, `opsz 20`, color Muted): the
  register for copy that doesn't exist yet — a placeholder card row, an
  unwritten well description. Two call sites (`0.9375rem`, `0.96875rem`)
  carry the same role at slightly different, un-tokenized sizes.
- **Body** (400, `0.90625rem`, line-height 1.7, max 62ch, color Ink 2): a
  chapter's running prose.
- **Body small** (400, `0.875rem`, line-height 1.4): meta-panel values,
  compartment names, well descriptions when not in stub voice.
- **Micro** (400, `0.5625rem`, ~0.14–0.18em tracking — varies per call
  site): the smallest mono step — the rail's "↑ drawer" link, the rail key,
  the panel's corner placeholder tag, the plate caption, a closed
  compartment's key line. Tied with Label and Tag as one of the system's
  most-reused sizes (5 call sites each).
- **Kicker** (400, `0.6875rem`, 0.2em tracking, uppercase): the loudest
  standalone mono label — eyebrows, the drawer heading, the descend cue.
- **Label** (400, `0.625rem`, 0.15em tracking, uppercase): field keys in the
  meta panel and the at-a-glance card — the most common of the mono-label
  sizes, used here as the representative token.
- **Tag** (400, `0.75rem`, 0.04em tracking): closed folder tabs, rail-number
  buttons, the shelf key.
- **Compartment name** (600, `1.4375rem`, `opsz 40`, -0.01em tracking): a
  compartment's own name as printed on its shelf face (`.shelf-name`) — one
  step quieter than Headline, because on the shelf it's an entry in a list,
  not the subject of the page it opens. Also carries the catalogue panel's
  heading and an onward-pager's record name: three places where a name is an
  entry in a list rather than the subject of a page.

Three steps exist only on a record route (`/<slug>`), where a case study is a
continuous document rather than a folder. They are separate roles rather than
reuses because a record has a title *above* its chapters, so the chapter title
has to sit a real step below the page title — a distinction the index never
needed, because there a folder's title WAS the page's:

- **Record title** (600, `clamp(2.5rem, 7vw, 4.5rem)`, line-height 0.94,
  `opsz 100`): a record's own name at the top of its route (`.mast-title`), and
  a shelf page's title (`.shelfpage-title`). Between Display (the name, once)
  and Headline — it is the subject of its page, but not of the site.
- **Chapter title** (600, `clamp(1.75rem, 4vw, 2.75rem)`, line-height 1.02,
  `opsz 70`): a chapter's title inside a record (`.ch-title`). One clear step
  below Record title, because on a record route a chapter is a section of a
  document, not the document.
- **Chapter numeral** (600, `clamp(2.25rem, 5vw, 3.5rem)`, line-height 0.85,
  -0.03em tracking, `opsz 90`, colour `--mark`): the number in a chapter's
  margin (`.ch-num`). The one place a record's accent sits at rest and large.
  Set larger than the title it sits beside, and readable as structure rather
  than as a heading, because it carries the sequence — and the sequence is
  build order, which is information (§1.1) rather than decoration.

### Named Rules
**The Optical-Size Rule.** Fraunces loads with its `opsz` axis on and no
fixed `weight` array — `axes` and a static `weight` list are mutually
exclusive in `next/font`. The 104px-equivalent name and the 19px chapter
lede are genuinely different cuts from one file, not one shape scaled.

**The Unfinished Twelve Rule (observed, not enforced).** Font *size* in the
mono label scale does collapse cleanly — every mono label in the system
lands on one of four sizes (`0.5625rem` / `0.625rem` / `0.6875rem` /
`0.75rem`, now Micro/Label/Kicker/Tag above), each reused 5–8 times. Letter
*spacing* does not: at the same `0.5625rem` size alone, `rail-up` tracks at
0.18em, `rail-key` at 0.14em, `card-tag` at 0.16em, `plate` figcaption at
0.14em, and `comp-key` at 0.18em — five call sites, three different
tracking values, no shared `--label-tracking-*` custom property behind any
of them. This file's four roles document the size scale as it actually is;
they pick one representative tracking value per role and do not claim the
CSS has already standardized it. Collapsing tracking to match is listed
under Known Gaps, not silently assumed done.

## Layout

One shell grid drives the whole page: a fixed `--rail-w` (96px) column
against `minmax(0, 1fr)`, capped at `--maxw` (1160px) and centered. Below
880px the grid drops to a single column and the rail lies down (see
Components → Rail).

The hero splits `minmax(0, 1fr)` against a fixed 296px facts column (the
at-a-glance card + the plate); at 1024px that narrows to 260px, and at 880px
it collapses to one stacked column entirely — composed asymmetry, not a
centered layout, so legibility wins over symmetry on a data-dense subject.

The meta grid inside a folder page is `repeat(4, minmax(0, 1fr))`, dropping
to 2 columns at 880px and 1 at 520px; its divider is a single hairline drawn
by the grid's own `::before` across the top of the row, in the gutter, never
a `border-right` on a cell.

`--gutter` (`clamp(1.25rem, 4.4vw, 4rem)`) is the one horizontal padding
value reused across the sheet, the rail (in its collapsed row form), and the
hero. Section separation is whitespace only — `clamp(2.5rem, 6vw, 4.125rem)`
above the "work" hand-off, `clamp(3rem, 7vw, 4.625rem)` above the drawer,
`4rem` above the foot — never a full-width rule.

Horizontal scrollers (the compartment strip, the folder tab row) scroll
inside their own `overflow-x: auto` band rather than wrapping or shrinking
their contents into unreadable texture; the page itself never scrolls
sideways (`overflow-x: hidden` on `body`).

**Verified breakpoints:** 1024px (hero facts column narrows), 880px (shell
single-column, rail collapses to a horizontal strip, meta grid to 2 cols),
520px (meta grid to 1 col, fold shrinks to 24px, tab/shelf padding tightens).

### Named Rules
**The One-Rule-Per-Gutter Rule.** Every divider in a data grid (the meta
row, and — were one added — any future field grid) is drawn once, centered
in the grid's own gap, never repeated as a border on individual cells.

### Motion

Three moments, all built on `--settle` (0.5s) and `--ease`, nothing else:

- **The chapter-to-chapter hand-off** (`SlidingPage` in `Workspace.tsx`).
  Only the boundary between chapters slides (§1a) — scroll inside a
  chapter is left alone. The outgoing sheet stays mounted, `aria-hidden`
  and `inert`, just long enough to play its exit (`page-slide-exit-left`/
  `-right`), then unmounts; the incoming sheet enters from the opposite
  side. Direction follows `ci * 1000 + fi` — compartment dominates folder,
  so it orders correctly across compartments and within one.
- **The load-in assembly** (§1b). No JS: `assemble`/`assemble-rail`
  keyframes on the rail and the hero column, staggered by
  `animation-delay` in reading order — rail, then eyebrow → name → role →
  line, then the at-a-glance card, then the plate last, then the "work, in
  the order it was built" line. Scoped to `.hero .eyebrow` rather than the
  bare `.eyebrow` class so it never replays on a folder's own eyebrow row.
- **The depth reveal** (§6, see Components → Depth cue). A
  `grid-template-rows` tween rather than `max-height`, so it doesn't have
  to guess at a target height for unknown content length.

All three inherit the sitewide `prefers-reduced-motion` rule (near-zero
animation/transition duration on `*`) with no extra reduced-motion-specific
code of their own — the global rule already covers any `animation`-based
rule in the file, including ones added after it was written.

## Elevation & Depth

Flat by default. The one place depth is deliberately built is the folder
page (`.page-frame`), and it is built entirely from **one element's stacked
box-shadows** — not extra DOM layers, not blur standing in for a missing
surface:

```
box-shadow:
  5px 6px 0 -1px var(--paper-2),
  6px 7px 0 -1px var(--line),
  11px 13px 0 -2px var(--paper-2),
  12px 14px 0 -2px var(--line),
  0 18px 40px -26px var(--shadow);
```

The first four are hard-edged (`0` blur, negative spread) offset shadows —
two lamination pairs, each a Paper-2/Line couplet at a slightly larger
offset, reading as two crisp stacked sheet-edges behind the folder. The
fifth is the one soft shadow in the whole system: a tight, heavily
negative-spread contact shadow, standing in for the sheet resting on its own
stack rather than floating above the page. At ≤880px the stack drops to a
single lamination pair plus the same contact shadow, so the effect survives
at small sizes without eating the gutter.

### Shadow Vocabulary
- **Lamination pair** (`{offset} {offset} 0 -1px var(--paper-2), {offset+1}
  {offset+1} 0 -1px var(--line)`): hard-edged, zero-blur. Two pairs at
  desktop widths, one below 880px.
- **Contact** (`0 18px 40px -26px var(--shadow)`, `0 16px 36px -26px
  var(--shadow)` below 880px): the only blurred shadow in the system, kept
  tight by its large negative spread.

### Named Rules
**The No-Ghosts Rule.** Nothing implies a surface that doesn't exist. There
is no stacked "ghost" folder behind the open one — the lamination shadows
belong to the one folder on screen, sized to read as its own edges, not as
copies of it.

## Shapes

Corners are small and mostly square: the system's default is a flat,
un-rounded rectangle, and radius is reserved for tab-shaped or small round
elements, never applied to a generic content panel.

**Flat (no radius):** the at-a-glance card, the plate frame, the shelf
face, the slot, the meta grid, the foot.

**Rounded — a four-step scalar scale (`focus` 2px, `sm` 3px, `md` 5px, `lg`
6px), each applied to specific corners rather than uniformly:**
- `focus` (`2px`) — the `focus-visible` outline's own corner, on every
  focusable element.
- `sm` (`3px`) — a closed compartment tab (top corners only, `3px 3px 0
  0`); the well, the open compartment's body (top-right only, `0 3px 0 0`,
  where it joins the strip above it); the folder page itself (`0 3px 3px
  3px` — square at the top-left where it joins the tab row, rounded
  everywhere else).
- `md` (`5px`) — small round controls: rail-number buttons, pager buttons,
  uniformly rounded.
- `lg` (`6px`) — a folder tab (top corners only, `6px 6px 0 0`), the most
  rounded element in the system, because it's the one meant to read as a
  physically cut tab.

The one honest fold is a literal corner cut: a triangular `::before` (32px,
24px below 520px) in Taupe sits behind a matching `::after` triangle whose
`linear-gradient` crease sits at its own 50% midpoint — a 45° gradient
measures corner-to-corner, so the flap's hypotenuse crease is the run's
midpoint, not its far edge. No CSS filter, no torn-paper texture.

### Named Rules
**The Radius-Is-For-Tabs Rule.** If an element is meant to be picked up and
read (a panel, a card, a slot, the meta grid), it stays square. If it's
meant to be picked up and *clicked* — a tab, a small round control — it
gets a radius. The folder page itself is the one exception, and it's
square exactly where it joins the tab row above it.

## Components

### The Rail
A real, persistent, typographic column (`.rail`), never a floating avatar.
Sticky at `top: 0`, full viewport height at desktop widths, 96px wide, on
Taupe rather than Paper (settled 2026-07-31) — a tone-step darker than the
sheet beside it, the case around the page rather than flush with it.
Contains, top to bottom: an "N" mark (Display-face, `opsz 40`), an "↑
drawer" link, the current compartment's key (Muted Strong on a
hairline-topped strip — the Board-Text Exception, since the strip sits on
Taupe), and a vertical list of folder-number buttons (`.rail-num`, 44×44px
minimum, Muted Strong at rest, Rose Ink when `aria-current="step"`). Below
880px it lies down: `position: sticky` still, but a horizontal 46px strip
with the same content read left-to-right and its own `overflow-x: auto`.

### Compartment strip & folder tab row
Two `role="tablist"` rows (`.comp-strip`, `.tablist`) built from the same
cut-tab idiom at two scales — Taupe at rest, Paper-2 when selected, a
1px translateY "settle" on the active tab, and (compartments only) a 2px
Rose spine along the selected tab's bottom edge joining it to the panel
below. A folder tab's name is present in the accessible name at all times
(`aria-controls`/`aria-labelledby` wired) but visually clipped to just its
number until selected — `clip-path`, never `display:none`, so a screen
reader always has the full label.

The folder tab row's own job is to **select, not navigate**: clicking
`00`–`03` swaps which folder's lede and four-field meta panel show inside
the open compartment's cover (`Cover.tsx`), in place, on the index. A
`.pager` (`← previous` / `next →`) steps the same selection by one for a
reader thumbing straight through rather than picking a tab. Neither
control leaves the page — the folder object stays a closed cover being
read from the outside. "Read more →" (`.cover-open`) is the one link that
actually navigates, landing on the previewed folder's own anchor
(`/<slug>#ch-<nn>`) in its full record. This is the restored
Compartment → Folder → "Read more" hierarchy: a reader previews before
committing to leave, and the dedicated record route (see **Records**,
below) is always the destination, never the index itself.

Not every compartment is a build-order sequence. A compartment's `unit`
(`"chapter"` or `"piece"`, default `"chapter"` when absent) swaps the
noun everywhere a folder count prints — the well count, the cover's
folder-count line, a record's contents line — and drops the "in the
order they were built" claim for `unit: "piece"`, since an unordered set
of independent pieces has no build order to claim. VPro is chapters;
Motion Studies is pieces. The same `Folder` shape and the same tab row
serve both — nothing about the tab row, the pager, or the record route
assumes one shape over the other.

### The Panel (`.card`, at-a-glance)
A bordered rectangle (Paper-2, 1px Line border, no radius) with a single
corner tag (`.card-tag`, Rose Ink, positioned outside the top edge) marking
the whole block as containing placeholder rows — never repeated per field.
Rows stack label-over-value with a top margin between them, no rule.

### The Plate
An original SVG abstraction (three overlapping gray rectangles), never a
product screenshot. Sits in a dashed Taupe-2 border on Paper-3, with a mono
caption beneath.

### The Folder page (`.page-frame`)
See Elevation & Depth for its construction. Interior order: an eyebrow row
(folder number + name in Rose Ink, credit register in Muted) → Headline →
Chapter Lede → optional rendered-markdown body → the four-field meta grid
→ an optional depth cue. Density here is intentionally high relative to the
rest of the page.

### Depth cue (`.page-more`)
A small Rose dot beside "more ↓" / "less ↑" in Kicker-scale mono — a real
`<button aria-expanded>` that grows the body open (§6's grid-template-rows
tween, ~0.55s) rather than a static label. The dot goes gray→pink on open.
Depth still defaults closed on every folder, every time (§1) — the folder
component remounts on switch rather than carrying `open` over from the
last one. Where a folder has no levels past what's written, "+N further
levels not yet written" prints under the body once expanded — a caption,
not a second control.

### Pager
Two buttons (`.pager button`, Paper-3, 1px Taupe-3 border, 5px radius, 44px
min-height) that step the open folder's `fi` state by one; disabled state
drops to 0.4 opacity rather than hiding.

### The Drawer / Shelf
`.drawer` holds one `.shelf` button per compartment — all three clickable,
confirmed intentional (see Known Gaps) — plus a `<ul class="slot-list">` of
two genuinely inert `.slot` items (Writing, Reading — `<li>`, no href, no
handler). A shelf is a flat Paper-2 face over a Taupe "board" strip
(`.shelf::after`) that turns Rose-to-`#9c2f5b` gradient on hover/focus only
— never at rest, even for the currently-open compartment (the Last-2%
Rule applies to the drawer too).

A shelf carries no `data-accent` — a compartment's own hue is not read
anywhere on the index, so there's nothing local for `--mark`/`--mark-ink`
to override, and every shelf's key and hover board fall through to the
`:root` default (flat Rose) regardless of which compartment it is. This
is deliberate, not an oversight fixed by adding the attribute back: a
compartment's accent becomes part of the experience only once a reader is
actually on its record route (`Record.tsx`'s `useAccentGround` sets
`data-accent` there, and only there). An earlier build set `data-accent`
on the shelf link and on the cover wrapper, which bled each compartment's
olive/navy/burgundy into the drawer at rest — a regression against this
same rule, fixed by removing the attribute rather than by adding hover
gating, since the index should never carry it in the first place.

### Foot
A single hairline-topped row: the contact link (with a `placeholder` tag in
Rose Ink when unset) and a "↑ back to top" anchor. Both hit 44px min-height.

### Records (`/<slug>`)
A record is its own route, not a deeper state of the index — a case study
opens on `Masthead` (role/timeline/team/outcome first, always, before any
chapter), then a continuous, whitespace-separated stack of `Chapter`s
(each its own closed-by-default depth reveal, per §1), then `NextRecord`,
then `Foot`. This is where a compartment's accent finally applies:
`useAccentGround` sets `data-accent` on `<html>` for the route's lifetime,
tinting `--ground` and coloring each chapter's margin numeral — the one
place Rose's per-compartment hue sits at rest and large (see Typography →
Chapter numeral).

Three components answer "how do I move through 7 pages, 10 sections, and
not lose my place" — the long-form-reading question a folder-sized cover
never had to solve:

- **Spine** (`.spine`) — the rail's record-route counterpart, and (settled
  2026-07-31, Natasha's own review) no longer a visually separate nav
  system: same column, same mark/up-drawer/key/foot order, and the chapter
  numerals now render as the exact same `.rail-num` cut-tab boxes the index
  uses for its records, with the same pink cut-in bar marking the current
  one. Each chapter is its own route, so "where am I" is a route match —
  `aria-current="step"`, the same value the rail uses for its own sequence
  — rather than a scroll position; the foot carries a plain "NN / NN"
  position counter (`.rail-pos`, the rail's own class) alongside catalogue
  and contact, the two controls a record needs that the index doesn't. An
  earlier build tracked the active chapter with `IntersectionObserver` and
  drew a separate progress line beside the numerals (`.spine-fill`) — a
  real, distinct visual language living only here, which was exactly the
  "two navigation systems" complaint; removed in favor of the rail's own
  idiom rather than kept alongside it.
- **Catalogue** (`.cat`) — a native `<dialog>` jump-anywhere panel, opened
  from the Spine's foot. Lists every record and shelf in one place (each
  record entry carries its own accent on its edge — legitimate here,
  since a reader who opens this is already inside a record and has
  already learned that color), marks the one being read `aria-current`,
  and always offers a way back to the drawer. Built on `<dialog>` rather
  than a hand-rolled panel so focus containment, Escape, the inert
  background and the backdrop are the platform's.
- **NextRecord** (`.onward`) — the end-of-record pager. Shows the
  previous and next record (never a shelf — landing a reader on an empty
  slot is a worse ending than not offering one), each already carrying
  its own accent so the color a reader is about to meet is visible before
  they click. Wraps: the last record leads to the first, never to a
  disabled button.

## Do's and Don'ts

### Do:
- **Do** separate every section by whitespace scale alone — `clamp()`
  values reused across the sheet — never a full-width rule.
- **Do** render the meta panel and the at-a-glance card as bordered,
  square panels with tight label/value stacking, never a ruled table.
- **Do** keep a stub/placeholder tag to one per block, in the corner, in
  Rose Ink — never repeated inline before every field.
- **Do** keep the rail sticky and persistent at every viewport — it changes
  axis (column → strip) below 880px, never disappears.
- **Do** build any future depth or elevation from stacked, opaque,
  zero-or-near-zero-blur `box-shadow`s, matching `.page-frame`'s technique,
  before reaching for extra DOM layers or a soft drop-shadow.
- **Do** use `rose` for marks (ticks, dots, spines) and `rose-ink` for type
  — never the reverse; `#d4537e` fails 4.5:1 for text.
- **Do** load Fraunces with its `opsz` axis active, no fixed weight list.
- **Do** keep a folder tab's full name in the accessible name at all times,
  even when visually clipped to a number.

### Don't:
- **Don't** use a full-width horizontal rule as a section or chapter
  divider.
- **Don't** render a field list as a table with a hairline under every row.
- **Don't** add fake stacked "ghost" folders behind the open one, or
  escalate drop-shadow blur to fake extra depth — the lamination effect is
  one element's hard-edged shadow stack, not extra layers.
- **Don't** render the folder in photoreal manila texture or add literal
  cabinet chrome (hinges, drawer pulls).
- **Don't** let rose appear anywhere at rest — no permanent tint, badge
  fill, or border.
- **Don't** dim a "coming" label with text-opacity alone — quiet it through
  form (dashed border, no radius, Muted color at full opacity), the same
  way `.slot` is built now. A prior opacity-only attempt measured 2.06:1
  and failed AA.
- **Don't** assume `Page` keeps its `open` state across a folder switch —
  it's remounted (keyed to compartment + folder) specifically so depth
  reverts to closed every time, per §1's "defaults CLOSED, always."

---

## Known Gaps & Open Decisions

This section exists because the previous `DESIGN.md` described intentions
that had drifted from the shipped code without anyone noticing — this list
is here so that doesn't happen silently again. It is not part of the
canonical DESIGN.md section set; treat it as a running punch list, safe to
edit as content and motion evolve.

1. **Mono label letter-spacing is not collapsed to a small token set.**
   Size collapses cleanly to four steps (see Typography → "The Unfinished
   Twelve Rule"), but tracking doesn't — the same `0.5625rem` size alone
   spans three different `letter-spacing` values across five call sites,
   with no shared tracking custom property behind any of them.

**Resolved (2026-07-30):** the four items this list used to carry —
the depth reveal being a static label rather than a control, the
chapter-to-chapter hand-off being a scroll jump rather than the §1a slide,
`--settle` being declared but unreferenced, and no load-in assembly or
dark palette existing — are all now shipped. `--settle` now drives the
depth reveal, the chapter slide, and the load-in assembly's staggered
`assemble`/`assemble-rail` keyframes; see Layout → Motion for all three,
Components → Depth cue for the reveal's markup, and Colors → Dark for the
palette.
Kept here as a dated note rather than deleted outright, on the theory that
a list that only ever grows is more honest than one that quietly loses its
history.

**Confirmed, not a gap (2026-07-30):** three compartments rendering as open,
fully clickable shelves — rather than two dimmed placeholder slots — was
flagged here as a possible drift from `PRODUCT.md`'s "N≥2 gate" and
`CLAUDE.md` §1c. Natasha confirmed this is the intended interim state, not
an error to fix; leaving `02-the-stacks`/`03-motion-studies` openable with
their "Material coming" placeholder folder is a deliberate choice.
