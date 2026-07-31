---
# ── 02 · PLANNING ─────────────────────────────────────────────────────
# The SURVIVOR. Seven or eight fully working prototypes; this is the one
# that lived. Credit is scrupulous — the surviving screen is Natasha's.

number: "02"
name: Planning
credit: Survivor · Team iterated, one lived
title: Planning

meta:
  - key: Role
    value: Designed the surviving screen
  - key: Surface
    value: Projects · Planning
  - key: Constraint
    value: No autosave
  - key: Depth
    value: Five levels, fixed by dev

pullQuote: A UI designer might want a beautiful screen. A project manager will not.

breakdownLabel: What I built
breakdown:
  - name: The toolbar
    desc: One line of tools. Not more.
    credit: SOLO
  - name: The table
    desc: Minimal; colour reserved for critical, and has-workflow
    credit: SOLO
  - name: Breakdown
    desc: Five levels of nesting, fixed by development constraints
    credit: SOLO
  - name: Execution · Replanning
    desc: Adjacent planning stages, supported rather than owned
    credit: SUPPORTED

diagramNote: e.g. the five-level breakdown, or a delay propagating along the path

depth: 0
---

## Lede

Seven or eight working prototypes before one survived. The screen that breaks
the software if it's wrong.

## Body

Users did not want a network of connections. They wanted to see how a delay
moved a date — that reframe turned the module from a dependency graph into a
date-anchored gantt. Before drawing it, I studied gantt interaction, toolbar
structure, and task-nesting in ClickUp, Zoho, Atlassian, and MS Project — not
to copy them, but to find what was already muscle memory, so CCPM's own
scheduling theory wouldn't be one more thing to learn on top of a new UI. This
is where the team iterated hardest: seven or eight fully working prototypes,
through real changes of scope and concept, before one passed stakeholder
review — the earlier rounds didn't. The one that survived is the planning
screen. For a project manager a project is a document, and on a web app with
no autosave, losing one means someone gets yelled at. So: save-as-draft big
and prominent, tasks addable several ways, and the little space left spent
pointing at what matters. The toolbar stays one line. Colour is rationed to
two questions — is this critical, does it have a workflow. Real projects nest
arbitrarily — a building has floors, floors have units — but the engine
couldn't hold unlimited depth, so the breakdown caps at five levels instead.
Planning became the base the rest of the module's planning stages were built
on, and it's since been adopted and customised client-wide.

## Decisions

### Why black got rationed

Black is one of the brand's own colours, and the old interface leaned on it
as a default surface — panels, backgrounds, chrome, all of it. On Planning it
got rationed the same way colour on the table did: reserved for the two
things a PM actually needs to notice, not spent on everything just because it
was available.

### Studying five tools before drawing one

Before drawing the toolbar, I went through ClickUp, Zoho, Atlassian, and MS
Project — not for ideas to copy, but to find what was already muscle memory:
how tasks get added, nested, deleted, dragged. CCPM is a dense scheduling
theory on its own; the goal was to keep the interface itself from being a
second thing to learn on top of it.

### The prototypes that didn't survive

Seven or eight fully working, multi-user-journey prototypes were built before
one passed stakeholder review, through real changes of scope and concept
along the way — which means the other six or seven didn't pass. That's not a
footnote to smooth over: getting the core mental model right, on the module
that would break the product if it was wrong, cost that much.
