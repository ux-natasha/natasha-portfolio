"use client";

import { useState } from "react";
import { Catalogue } from "@/components/Catalogue";
import { GoLink } from "@/components/PageTransition";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { CatalogueEntry } from "@/lib/schema";

export type SpineChapter = { number: string; name: string };

/**
 * The reading spine — a record's navigation.
 *
 * It is the rail's successor, not a second thing — and, per Natasha's own
 * review, not a visually different thing either: same 96px structural
 * column in the same shell grid, same "N" mark / "↑ drawer" / key / numbered
 * list / foot order, and the chapter numbers now render as the exact same
 * cut-tab boxes (`.rail-num`) the index uses for its records, with the same
 * pink cut-in bar marking the current one. A record needs two things the
 * index doesn't — `catalogue`, to jump to another compartment without
 * backing out to the drawer first, and a contact link — so those live
 * alongside the position counter in the foot, the one place this column
 * says more than the rail's does.
 *
 * Each chapter is its own route now, so "where am I" is a route match, not a
 * scroll position: `activeFolder` is the folder number of the page actually
 * being read, undefined on the record overview where nothing is picked yet.
 */
export function Spine({
  recordKey,
  chapters,
  catalogue,
  current,
  activeFolder,
}: {
  /** The mono key — VPRO, STACKS, WRITING. Says where you are, at a glance. */
  recordKey: string;
  /** Empty on a shelf page: nothing to jump between, so the list isn't drawn. */
  chapters: SpineChapter[];
  catalogue: CatalogueEntry[];
  current: string;
  /** The folder number of the page being read, or undefined on the overview. */
  activeFolder?: string;
}) {
  const [open, setOpen] = useState(false);
  const activeIndex = chapters.findIndex((c) => c.number === activeFolder);

  return (
    <nav className="spine" aria-label={`${recordKey} navigation`}>
      {/* `?from=` is how the index knows which record to have selected when a
          reader steps back up a level — you land where you left, not at the top
          of a list you already chose from. */}
      <GoLink
        href={`/?from=${current}`}
        className="rail-mark spine-mark"
        direction="out"
        aria-label="Home"
      >
        <span aria-hidden="true">N</span>
      </GoLink>

      <GoLink className="rail-up" href={`/?from=${current}#drawer`} direction="out">
        <span className="arw" aria-hidden="true">
          ↑
        </span>
        drawer
      </GoLink>

      <p className="rail-key">
        <span className="vh">Reading: </span>
        {recordKey}
      </p>

      {chapters.length > 0 ? (
        <ol className="rail-nums">
          {chapters.map((chapter) => (
            <li key={chapter.number}>
              <GoLink
                className="rail-num"
                href={`/${current}/${chapter.number}`}
                aria-current={chapter.number === activeFolder ? "step" : undefined}
              >
                {chapter.number}
                <span className="vh"> — {chapter.name}</span>
              </GoLink>
            </li>
          ))}
        </ol>
      ) : null}

      <div className="spine-foot">
        {chapters.length > 0 ? (
          <p className="rail-pos" aria-hidden="true">
            {activeIndex > -1 ? String(activeIndex + 1).padStart(2, "0") : "—"} /{" "}
            {String(chapters.length).padStart(2, "0")}
          </p>
        ) : null}

        <button
          type="button"
          className="rail-up spine-jump"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="arw" aria-hidden="true">
            ⌄
          </span>
          catalogue
        </button>

        <a className="rail-up" href="#contact">
          <span className="arw" aria-hidden="true">
            ↓
          </span>
          contact
        </a>

        <ThemeToggle />
      </div>

      <Catalogue
        entries={catalogue}
        current={current}
        open={open}
        onClose={() => setOpen(false)}
      />
    </nav>
  );
}
