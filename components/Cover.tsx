"use client";

import { GoLink } from "@/components/PageTransition";
import type { Compartment } from "@/lib/schema";

/**
 * A record on the index: the folder, closed.
 *
 * This is where the folder metaphor lives and where it ends. The construction is
 * the approved one (§1d) and untouched — value-stepped laminations, crisp edges,
 * one honest fold, one tight contact shadow, no ghost folders, no blur standing
 * in for a surface. What changed is that it no longer holds a chapter: it holds
 * the *cover* of one, and reading happens on the record's own route.
 *
 * Three jobs, kept separate so nothing is a duplicate of anything:
 *   - the tab cuts NAVIGATE — each is a real link into that chapter of the
 *     record, which is what keeps them structure rather than costume (§1a);
 *   - the contents list INFORMS — number, name, credit register, no links;
 *   - "open the record" is the way in.
 */
export function Cover({ record }: { record: Compartment }) {
  return (
    <div className="cover-wrap" data-accent={record.accent}>
      {/* The cut tabs. Number visible, full chapter name always in the
          accessible name — clipped, never `display:none`. */}
      <div className="cover-tabs">
        {record.folders.map((folder) => (
          <GoLink
            key={folder.number}
            href={`/${record.slug}#${folder.anchor}`}
            className="cover-tab"
          >
            <span className="tick" aria-hidden="true" />
            {folder.number}
            <span className="vh"> — {folder.name}</span>
          </GoLink>
        ))}
      </div>

      <article className="page-frame cover">
        <div className="cover-top">
          <p className="eyebrow accent-ink">
            Record {record.record} · {record.key}
          </p>
          <p className="eyebrow">
            {record.folders.length}{" "}
            {record.folders.length === 1 ? "chapter" : "chapters"}
          </p>
        </div>

        <h3 className="cover-title">{record.name}</h3>
        <p className="cover-desc">{record.desc}</p>

        {/* Density 8 inside a folder (§5) — earned with real structure, not
            ornament: what is in it, who made it, in build order. */}
        <ol className="cover-contents">
          {record.folders.map((folder) => (
            <li key={folder.number} className="cover-row">
              <span className="cover-row-num">{folder.number}</span>
              <span className="cover-row-name">{folder.name}</span>
              <span className="cover-row-credit">{folder.credit}</span>
            </li>
          ))}
        </ol>

        <GoLink href={`/${record.slug}`} className="cover-open">
          open the record <span aria-hidden="true">→</span>
        </GoLink>
      </article>
    </div>
  );
}
