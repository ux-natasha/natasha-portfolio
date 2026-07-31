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
 * It is the rail's successor, not a second thing: same 96px structural column
 * in the same shell grid, same typographic discipline (numbers, never icons),
 * same "position plus how much remains" job (§1's rail rule). What it drops is
 * the folder-tab model, because inside a record the metaphor has changed from
 * filing to reading — you are choosing between chapters, not records.
 *
 * Each chapter is its own route now, so "where am I" is a route match, not a
 * scroll position: `activeFolder` is the folder number of the page actually
 * being read, undefined on the record overview where nothing is picked yet.
 * The measure fills to that chapter's position in the sequence rather than
 * scroll depth, since there's no longer one long document to measure.
 *
 * Everything the brief asks to be effortless is one control each: the mark goes
 * home, the numerals jump within the record, the measure says how much is left,
 * `catalogue` opens the jump-anywhere panel, and the foot holds drawer, contact
 * and theme. Nothing here is more than one click from anywhere else.
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
  const progress =
    chapters.length === 0 || activeIndex === -1
      ? 0
      : (activeIndex + 1) / chapters.length;

  return (
    <nav
      className="spine"
      aria-label={`${recordKey} navigation`}
      /* Position and remainder as one number, read by two different rules: the
         hairline beside the numerals at desktop widths, and the line along the
         bottom edge of the bar once the spine lies down. */
      style={{ "--read": progress } as React.CSSProperties}
    >
      {/* `?from=` is how the index knows which record to have selected when a
          reader steps back up a level — you land where you left, not at the top
          of a list you already chose from. */}
      <GoLink
        href={`/?from=${current}`}
        className="spine-mark"
        direction="out"
        aria-label="Home"
      >
        <span aria-hidden="true">N</span>
      </GoLink>

      <p className="spine-key">
        <span className="vh">Reading: </span>
        {recordKey}
      </p>

      {chapters.length > 0 ? (
        /* The rail was always a progress rail rather than a menu (§1). The
           measure and the chapter list are one object: a hairline running down
           beside the numerals, filling in the record's accent to the chapter
           being read. */
        <div className="spine-track">
          <span className="spine-fill" aria-hidden="true" />
          <ol className="spine-nums">
            {chapters.map((chapter) => (
              <li key={chapter.number}>
                <GoLink
                  className="spine-num"
                  href={`/${current}/${chapter.number}`}
                  aria-current={
                    chapter.number === activeFolder ? "location" : undefined
                  }
                >
                  {chapter.number}
                  <span className="vh"> — {chapter.name}</span>
                </GoLink>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="spine-foot">
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

        <GoLink className="rail-up" href={`/?from=${current}#drawer`} direction="out">
          <span className="arw" aria-hidden="true">
            ↑
          </span>
          drawer
        </GoLink>

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
