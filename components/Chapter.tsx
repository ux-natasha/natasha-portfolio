"use client";

import { useId, useState } from "react";
import type { Folder } from "@/lib/schema";

/**
 * One chapter of a record, as a spread in a catalogue rather than a card.
 *
 * There is no folder object here and no tab: the folder metaphor did its work on
 * the index and is spent (it is also the one thing the brief asked not to
 * repeat). What carries the structure instead is the numeral in the margin —
 * and the numerals are load-bearing, not decoration: chapter order IS build
 * order (§1.1), so the sequence is information a reader needs.
 *
 * Chapters separate by whitespace scale alone. No rule, ever (§1's hard rule) —
 * that is the single fastest way this starts reading as a document.
 *
 * Nothing animates on scroll. The authored moments are the route hand-off, the
 * masthead's assembly, the travelling spine marker and this reveal; a settle on
 * every chapter as it passes would be the fade-up-on-scroll the kill list names.
 */
export function Chapter({ folder }: { folder: Folder }) {
  /* Depth defaults CLOSED, every chapter, every visit (§1). Local state and no
     persistence: there is nothing to carry over, by design. */
  const [open, setOpen] = useState(false);
  const revealId = useId();
  const titleId = useId();

  return (
    <section className="ch" id={folder.anchor} aria-labelledby={titleId}>
      {/* The margin numeral: the one place a record's accent sits at rest and
          large. Hidden from assistive tech — the number is already in the
          eyebrow, and hearing it twice is noise. */}
      <p className="ch-num" aria-hidden="true">
        {folder.number}
      </p>

      <div className="ch-main">
        <div className="ch-top">
          <p className="eyebrow accent-ink">
            {folder.number} · {folder.name}
          </p>
          <p className="eyebrow">{folder.credit}</p>
        </div>

        <h2 className="ch-title" id={titleId}>
          {folder.title}
        </h2>

        {/* Level 1. Reads in ten seconds. */}
        <p className={`ch-lede${folder.ledePlaceholder ? " is-stub" : ""}`}>
          {folder.ledePlaceholder ? `[${folder.lede}]` : folder.lede}
        </p>

        {/* Dividers live in GUTTERS, never flush against text (§1d): the rule is
            drawn by the row across its own top, in the gap, and the columns keep
            a shared left rhythm. Meta stays at level 1 — short facts, scannable
            in the same ten seconds as the lede — so it sits before the reveal. */}
        <div className="meta-row">
          {folder.meta.map((field) => (
            <div key={field.key}>
              <span className="meta-label">{field.key}</span>
              <span className="meta-val">{field.value}</span>
            </div>
          ))}
        </div>

        {folder.bodyHtml ? (
          <>
            <button
              type="button"
              className="page-more"
              aria-expanded={open}
              aria-controls={revealId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="dot" aria-hidden="true" />
              {open ? "less" : "more"}{" "}
              <span aria-hidden="true">{open ? "↑" : "↓"}</span>
            </button>

            {/* A grid-template-rows tween, not max-height: it tolerates content
                of unknown height instead of guessing at one. The content stays
                in the DOM at all times — collapsed, not removed — so it is
                findable and readable by assistive tech either way. */}
            <div className="page-reveal" data-open={open}>
              <div className="page-reveal-inner" id={revealId}>
                <div
                  className="page-body"
                  dangerouslySetInnerHTML={{ __html: folder.bodyHtml }}
                />
                {/* §4's fixed 5-level breakdown is a real editorial commitment,
                    not just the one level written so far. Honest about the gap
                    rather than padding the count. */}
                {folder.depth > 0 ? (
                  <p className="page-stub-note">
                    + {folder.depth} further{" "}
                    {folder.depth === 1 ? "level" : "levels"} not yet written
                  </p>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
