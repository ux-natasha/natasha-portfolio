---
# ── 03 · TASKS ────────────────────────────────────────────────────────
# The HONEST one. A senior colleague broke this module open; the credit
# rule says so plainly. What is Natasha's is Modify Subtasks and the
# role-split logic, and that is all the chapter claims.

number: "03"
name: Tasks
credit: Shared · The honest one
title: Tasks

meta:
  - key: Role
    value: Owned Modify Subtasks
  - key: Surface
    value: Tasks · Updates & Reviews
  - key: Broke open by
    value: A senior colleague
  - key: Users
    value: Split by who clicks

pullQuote: Someone else turned the key. The corner behind the door was mine.

breakdownLabel: What's mine
breakdown:
  - name: Modify Subtasks
    desc: Multiple user journeys, its own screens — my undertaking
    credit: SOLO
  - name: The landing
    desc: Row height + divider — the move that made it work
    credit: COLLEAGUE
  - name: Actual vs planned
    desc: The simple-looking chart that took the longest
    credit: TEAM

diagramNote: e.g. who clicks a task → what they see

depth: 0

# Levels 2-5 are real now, so CLAUDE.md §3's block on drafting a headline
# before they exist no longer applies — but this is still a DRAFT pending
# Natasha's sign-off, not approved copy (only the opening + 00-02's ledes are
# final per §3). `ledePlaceholder` stays true on purpose: it keeps this
# rendering in the same bracketed, quiet stub register as every other
# unapproved line, so a reader (and Natasha) can tell it hasn't been signed
# off. Drawn from the Body/Decisions material below — the row-height fix, the
# role split, Modify Subtasks as the owned piece — nothing invented.
ledePlaceholder: true
---

## Lede

Everyone knew Tasks, and nobody wanted it touched. A senior colleague broke it open with a taller row height. I owned what came after: whoever clicks a task decides what they see.

## Body

Tasks was hard in a way the gantt was not. The gantt was new; nobody had
expectations of it. Tasks was known, heavily used, and most people didn't want
it touched, even though the team thought it could be better — a different bar
than Planning's blank slate: here, a change had to earn its place, not just
improve on the old one. I tried converting the old design across, adding
colour, splitting pages, cutting columns. None of it clicked. It clicked when
a then-senior colleague redesigned the landing: a taller row height, plus the
divider we'd already built in Admin. What survived from talking to consultants
was about people, not pixels — someone updating a task and someone reviewing
it want different things from the same screen. So the module split in two:
updaters get Task Updates, an editing surface. Reviewers get Task Reviews, a
surface built on charts, because a reviewer isn't making progress, they're
judging it — including an actual-vs-planned completion chart that looked
simple and wasn't. Each side got its own three-tier structure, parent tasks
down to subtasks, which doubled the surface area to design. Modify Subtasks —
its own screens and journeys — was mine: subtasks have no dependencies of
their own, but they're the smallest, most-touched unit in the system, and the
thing people most often need to change is who's assigned and what workflow is
attached.

## Decisions

### Why the page splits by role

Task and subtask managers update; project and parent-task managers review —
and the old system gave both the same screen. The people doing the updating
need an editing surface. The people reviewing aren't making progress, they're
judging it, so they need charts and infographics instead of edit tools. That
distinction is why Tasks splits into Task Updates and Task Reviews rather
than staying one page with more filters.

### Parent tasks, tasks, subtasks — twice over

Splitting by role doesn't remove the task hierarchy, it duplicates it: Task
Updates and Task Reviews each got their own parent-task / task / subtask
structure, built and maintained separately. That's twice the surface area for
the same information, traded for neither an updater nor a reviewer wading
through tools meant for the other.

### Modify Subtasks, on its own

Subtasks don't carry dependencies of their own, but they're the smallest and
most-touched unit in the system, and the two things people change most —
who's assigned, what workflow is attached — both live here. I built Modify
Subtasks as its own set of journeys and screens rather than folding it into
the general task-edit flow, because friction at the level that gets touched
the most is the friction that costs the most.
