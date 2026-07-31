---
# ── 00 · THE OLD SYSTEM ───────────────────────────────────────────────
# Chapter order is BUILD order, not "best work first" (§1). This is the
# prologue: the system Natasha maintained for a year and then helped kill.
#
# Credit register: TEAM. Nothing here is claimed solo except the three
# things actually shipped alone on the legacy app.

number: "00"
name: The old system
credit: Team · Prologue
title: The old system

# Meta panel — FOUR items. A panel, never a ruled table (§1).
meta:
  - key: Role
    value: Maintainer, then designer
  - key: Surface
    value: VectorPro (legacy)
  - key: Understood by
    value: Four people
  - key: Shipped
    value: Progress bar · critical path · documents

pullQuote: I learned the system by keeping it alive, then got to help replace it.

breakdownLabel: What I touched
breakdown:
  - name: Progress bar
    desc: Running-task progress on the legacy app
    credit: SOLO
  - name: Critical path
    desc: Visualising the path through a project
    credit: SOLO
  - name: Documents
    desc: Uploading and updating files in the system
    credit: SOLO
  - name: Navigation
    desc: The segregation fight — and the settlement
    credit: TEAM

diagramNote: e.g. connections without time vs. time as the scope

# How many depth levels sit behind level 1. 0 — levels 3–5 are written below
# via breakdown/decisions/diagramNote instead of this counter.
depth: 0
---

## Lede

A decade of history. Four people understood the code. A diagram that showed
what connected to what, but never when, or by how much you were late.

## Body

It showed the network of dependencies but not the thing consultants asked for:
when a task should have started, and how far it had slipped. A config change
took two days of someone else's time. A hidden column took another. That, plus
scheduling runs measured in hours, is what got the rebuild approved. I patched
it for a year first — a progress bar, the critical path visualisation, document
upload — which is how I learned a theory older than I am.

## Decisions

### The navigation fight

Older consultants wanted the navigation gone outright. The team held one line
— no colour-coding, because colour had to stay reserved for meaningful states,
not decoration — and conceded the rest: navigation became dismissible and
recallable instead of fixed or removed, and font size went responsive instead
of one-size-fits-all. Less immediate "wow" for the loudest stakeholders, for
an IA that still scales past this one generation of users.

### Gray, on projectors

The other argument was smaller and took longer: what shade of gray would
still read once it hit a conference-room projector, where contrast is the
first thing to wash out. It settled on a value dark enough to survive that,
and the interface has run on it since.
