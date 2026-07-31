"use client";

import { useId, useState } from "react";
import type { Folder } from "@/lib/schema";

/**
 * One folder's content — now the whole of its own route rather than a spread
 * stacked among others in one continuous document. The margin numeral is
 * still load-bearing (chapter order IS build order, §1.1); `MiniMasthead`
 * carries the "which record, which folder, how many" orientation a reader
 * landing on this route cold still needs, so this component only carries
 * the chapter itself.
 *
 * Depth used to cascade one gate per level (level 2 → 3 → 4 → 4b → 5), each
 * requiring its own click before the next was even visible. Two things
 * changed that: the diagram and the "real screens" note are the only
 * non-text content on the page, so they're surfaced unconditionally right
 * after the facts — not something a reader has to click three times to find.
 * Everything else earns exactly one click: body, breakdown and decisions
 * open together, ordered general → specific, under a single "read the rest"
 * toggle. Depth still defaults CLOSED (§1's hard rule) — there's just one
 * gate now instead of three.
 */
export function Chapter({ folder }: { folder: Folder }) {
  const [open, setOpen] = useState(false);

  const revealId = useId();
  const titleId = useId();

  const hasBreakdown = (folder.breakdown?.length ?? 0) > 0;
  const hasDecisions = (folder.decisions?.length ?? 0) > 0;
  const hasDiagram = Boolean(folder.diagramNote);

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

        {/* The reconstructed diagram — surfaced here, not behind a click. It's
            the one non-text thing on the page; burying it three reveals deep
            was burying the reason to keep scrolling. */}
        {hasDiagram ? (
          <div className="diagram-box">
            <p className="diagram-note">
              ORIGINAL DIAGRAM — DRAWN IN CODE
              <br />
              {folder.diagramNote}
              <br />
              <br />
              abstraction only · no client data · no product layout
            </p>
          </div>
        ) : null}

        {/* What's behind the password hasn't been designed yet — said plainly,
            right where a reader would otherwise expect a finished feature,
            rather than dressed up as one more reveal waiting for a click
            (§8: gated, but that's a separate open question from this page). */}
        {hasDiagram ? (
          <div className="gate-box">
            <span className="card-tag">placeholder</span>
            <p className="gate-label">Real screens</p>
            <p className="gate-desc is-stub">
              What happens after the password hasn't been decided yet.
            </p>
          </div>
        ) : null}

        {folder.bodyHtml ? (
          <>
            {/* The one remaining gate: body, breakdown and decisions all open
                together, ordered general → specific within the same reveal —
                that ordering is the "levels" idea now, not a separate click
                per level. */}
            <button
              type="button"
              className="page-more is-entry"
              aria-expanded={open}
              aria-controls={revealId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="dot" aria-hidden="true" />
              {open ? "show less" : "read the rest, redacted"}{" "}
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
                {folder.pullQuote ? (
                  <p className="pull-quote">{folder.pullQuote}</p>
                ) : null}

                {hasBreakdown ? (
                  <>
                    <p className="section-label">
                      {folder.breakdownLabel?.toLowerCase() ?? "breakdown"}
                    </p>
                    <div className="breakdown">
                      {folder.breakdown!.map((row) => (
                        <div className="breakdown-row" key={row.name}>
                          <span className="breakdown-name">{row.name}</span>
                          <span className="breakdown-desc">{row.desc}</span>
                          <span
                            className={`breakdown-credit${
                              row.credit.toUpperCase() === "SOLO"
                                ? " is-solo"
                                : ""
                            }`}
                          >
                            {row.credit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {hasDecisions ? (
                  <>
                    <p className="section-label">the decisions</p>
                    <div className="decisions">
                      {folder.decisions!.map((d) => (
                        <div className="decision" key={d.heading}>
                          <p className="decision-heading">{d.heading}</p>
                          <div
                            className="decision-body"
                            dangerouslySetInnerHTML={{ __html: d.bodyHtml }}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {/* §4's fixed 5-level breakdown is a real editorial commitment.
                    A folder that hasn't claimed levels 3+ yet (no breakdown)
                    still says so honestly, rather than stopping silently. */}
                {!hasBreakdown && folder.depth > 0 ? (
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
