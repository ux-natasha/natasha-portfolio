"use client";

import { useEffect, useRef, useState } from "react";
import { Catalogue } from "@/components/Catalogue";
import { GoLink } from "@/components/PageTransition";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { CatalogueEntry } from "@/lib/schema";

export type SpineChapter = { number: string; name: string; anchor: string };

/**
 * The reading spine — a record's navigation.
 *
 * It is the rail's successor, not a second thing: same 96px structural column
 * in the same shell grid, same typographic discipline (numbers, never icons),
 * same "position plus how much remains" job (§1's rail rule). What it drops is
 * the folder-tab model, because inside a record the metaphor has changed from
 * filing to reading — you are in one document, not choosing between records.
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
}: {
  /** The mono key — VPRO, STACKS, WRITING. Says where you are, at a glance. */
  recordKey: string;
  /** Empty on a shelf page: nothing to jump between, so the list isn't drawn. */
  chapters: SpineChapter[];
  catalogue: CatalogueEntry[];
  current: string;
}) {
  const [open, setOpen] = useState(false);
  const active = useActiveChapter(chapters);
  const progress = useReadProgress();

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
        /* The rail was always a progress rail rather than a menu (§1). In a
           continuous document the thing to measure is the scroll, so the
           measure and the chapter list are one object: a hairline running down
           beside the numerals, filling in the record's accent as it is read. */
        <div className="spine-track">
          <span className="spine-fill" aria-hidden="true" />
          <ol className="spine-nums">
            {chapters.map((chapter) => (
              <li key={chapter.number}>
                <a
                  className="spine-num"
                  href={`#${chapter.anchor}`}
                  aria-current={chapter.anchor === active ? "location" : undefined}
                >
                  {chapter.number}
                  <span className="vh"> — {chapter.name}</span>
                </a>
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

/**
 * Which chapter is being read, from the document rather than from a click — so
 * the spine and the scroll can never disagree, whichever one moved.
 *
 * The observer's root margin keeps a band across the middle of the viewport and
 * asks which section is in it: the chapter under the reader's eye, not the one
 * technically nearest the top. Falls back to the first chapter above the band
 * so the marker is never nowhere.
 */
function useActiveChapter(chapters: SpineChapter[]): string | null {
  const [active, setActive] = useState<string | null>(
    chapters[0]?.anchor ?? null,
  );

  useEffect(() => {
    if (chapters.length === 0) return;

    const sections = chapters
      .map((chapter) => document.getElementById(chapter.anchor))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Tracked across callbacks, not rebuilt per callback: a scroll can leave
    // one section without entering another (a tall chapter spanning the whole
    // band), and in that frame only the leaving entry is reported.
    const visible = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const inBand = sections.find((section) => visible.get(section.id));
        if (inBand !== undefined) setActive(inBand.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [chapters]);

  return active;
}

/** 0 → 1 through the document. Read on a passive listener, coalesced to a
 *  frame: it drives one custom property and must never own a scroll. */
function useReadProgress(): number {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      frame.current = undefined;
      const run =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(run <= 0 ? 1 : Math.min(1, window.scrollY / run));
    };

    const onScroll = () => {
      if (frame.current !== undefined) return;
      frame.current = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== undefined) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return progress;
}
