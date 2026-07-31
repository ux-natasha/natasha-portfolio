---
# ── 01 · THE STACKS ───────────────────────────────────────────────────
# Personal project, solo end to end — design, frontend, backend, deploy.
# Facts sourced from the repo (github.com/ux-natasha/the-stacks) and its
# live demo, not invented: nine commits, nine media types besides the
# three named, four keyless metadata providers and four that need a free
# key, backup as a single SQLite file.

number: "01"
name: The stacks
credit: Solo · personal project
title: The stacks

meta:
  - key: Role
    value: Design + full build, solo
  - key: Stack
    value: React · Vite · Tailwind · Express
  - key: Storage
    value: One SQLite file, no cloud
  - key: Status
    value: Live demo, self-hostable

depth: 0
---

## Lede

A spreadsheet doesn't look like a library. I built a shelf instead — twelve
kinds of media in one file you actually own.

## Body

The Stacks tracks books, games, anime, and nine other media types as a
shelf instead of a spreadsheet — a book gets a spine, a movie a case, a
game a cartridge, so the library actually looks like one. There's no login
and no shared server: each person runs their own container against their
own SQLite file, and that one file is the whole backup — items, lists,
tags, settings, even the metadata-provider API keys, which live in the
database instead of the environment so they travel with the file instead
of getting left behind. Metadata comes from eight providers; four need no
key at all — Open Library, Google Books, MyAnimeList, AniList — and four
need a free one. I built and shipped the first working version in nine
commits over about a day, then wrapped it in a Docker image and put a
public demo on Render, capped and reset hourly so a shared instance nobody
logs into doesn't grow forever.
