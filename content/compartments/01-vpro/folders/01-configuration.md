---
# ── 01 · CONFIGURATION ────────────────────────────────────────────────
# The SOLO chapter, and likely the site's strongest single fact. Built
# first in the real product, which is why it also carried the table
# structure and the component library for every screen after it.

number: "01"
name: Configuration
credit: Solo · Entirely made by me
title: Configuration

meta:
  - key: Role
    value: Sole designer
  - key: Surface
    value: Admin · Process Data
  - key: Replaced
    value: Gatekept config
  - key: Built
    value: First

pullQuote: The two days became a screen you open yourself.

breakdownLabel: What lives here
breakdown:
  - name: Custom Attributes
    desc: User-defined fields the rest of the system reads from
    credit: SOLO
  - name: Workflows
    desc: Phase and criticality definitions attached to tasks
    credit: TBC
  - name: Issue Reasons
    desc: Predefined reasons for raising issues, and their ordering
    credit: SOLO

diagramNote: e.g. how one attribute definition propagates into every project that uses it

depth: 0
---

## Lede

A config change took two days of someone else's time. A hidden column took
another. I designed the part where you do it yourself.

## Body

Configuration is the part of the system that exists before any project does:
the definitions everything else runs on. Nobody demos it and every module
depends on it. My piece was Process Data — issue reasons, workflows, custom
attributes — built as one consistent customisation layer instead of three
unrelated tools, because three bespoke patterns is exactly the kind of
fragmentation that made the old system take two days to touch a config. The
trade-off is less tailoring per type, for an admin who learns the pattern once
and reuses it three times. Admin was also built first in the module sequence,
which gave it a second job: the table structure and the component library got
settled here, by the team, and every module after it inherited both. That
sequencing paid off later — when Tasks stalled, what unblocked it was reusing
the row-height and divider pattern this module had already worked out.

## Decisions

### Three pages, similar but not the same

Issue reasons, workflows, and custom attributes don't do the same job, but
nobody should have to relearn the interface three times to configure all
three. Process Data is one consistent shape wearing three different sets of
fields — the same table, the same way of adding a row, the same place saved
changes show up — instead of three bespoke tools that happened to sit next to
each other.

### The table, and the components

With six modules and a rotating team, inventing table and component patterns
fresh in each one risks the exact fragmentation that made the old codebase
slow and gatekept to begin with. Admin went first, so its table structure and
component library became the shared baseline instead of one-off choices per
module. The clearest payoff came later, outside Admin entirely: when Tasks
stalled through several failed directions, what unblocked it was reusing the
divider and row-height pattern Admin had already settled.
