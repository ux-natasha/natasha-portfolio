"use client";

import { useRef, useState } from "react";
import { roving } from "@/lib/a11y";
import { GoLink } from "@/components/PageTransition";
import { unitNoun, type Compartment } from "@/lib/schema";

/**
 * A record on the index: the folder, closed, but not flat.
 *
 * Compartment → folder → "Read more" — a tab picks a folder, that folder's
 * own lede and meta facts show in the sheet, and only then does a reader
 * choose to leave for the full record. No `data-accent` here or anywhere
 * below it: the index stays one register, and a compartment's own accent
 * only becomes part of the experience once a reader is actually on its
 * route (`Record.tsx`'s `useAccentGround`). See DESIGN.md's Last-2% Rule.
 *
 * Three jobs, kept separate so nothing is a duplicate of anything:
 *   - the tab row SELECTS which folder is previewed here, never navigates
 *     directly — that's what makes the preview possible at all (§1a: a
 *     tool-metaphor element that only navigates would be costume for what
 *     it could instead reveal);
 *   - the pager steps the same selection by one, for a reader thumbing
 *     straight through rather than picking a tab;
 *   - "read more" is the one link that actually leaves the index, landing
 *     on the previewed folder's own anchor in the full record.
 */
export function Cover({ record }: { record: Compartment }) {
  const [fi, setFi] = useState(0);
  const folder = record.folders[fi];
  const tabs = useRef<HTMLDivElement>(null);
  const panelId = `cov-panel-${record.slug}`;
  const tabId = (i: number) => `cov-tab-${record.slug}-${i}`;

  return (
    <div className="cover-wrap">
      <div
        className="tablist"
        role="tablist"
        aria-label={`${unitNoun(record.unit, 2)} in ${record.name}`}
        ref={tabs}
        onKeyDown={(e) => roving(e, tabs.current, fi, record.folders.length, setFi)}
      >
        {record.folders.map((f, i) => (
          <button
            key={f.number}
            type="button"
            role="tab"
            id={tabId(i)}
            className="tab"
            aria-selected={i === fi}
            aria-controls={panelId}
            tabIndex={i === fi ? 0 : -1}
            onClick={() => setFi(i)}
          >
            <span className="tick" aria-hidden="true" />
            {f.number}
            <span className="tab-name">{f.name}</span>
          </button>
        ))}
      </div>

      <article
        className="page-frame cover"
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(fi)}
      >
        <div className="cover-top">
          <p className="eyebrow">
            Record {record.record} · {record.key}
          </p>
          <p className="eyebrow">
            {record.folders.length} {unitNoun(record.unit, record.folders.length)}
          </p>
        </div>

        <h3 className="cover-title">{record.name}</h3>
        <p className="cover-desc">{record.desc}</p>

        {/* The previewed folder — level 1 only, the ten-second read. Its own
            deeper levels stay behind "read more", not expanded here. */}
        <div className="ch-top">
          <p className="eyebrow">
            {folder.number} · {folder.name}
          </p>
          <p className="eyebrow">{folder.credit}</p>
        </div>
        <h4 className="cover-folder-title">{folder.title}</h4>
        <p className={`ch-lede${folder.ledePlaceholder ? " is-stub" : ""}`}>
          {folder.ledePlaceholder ? `[${folder.lede}]` : folder.lede}
        </p>

        <div className="meta-row">
          {folder.meta.map((field) => (
            <div key={field.key}>
              <span className="meta-label">{field.key}</span>
              <span className="meta-val">{field.value}</span>
            </div>
          ))}
        </div>

        <div className="cover-foot">
          <div className="pager">
            <button
              type="button"
              onClick={() => setFi((v) => v - 1)}
              disabled={fi === 0}
            >
              <span aria-hidden="true">←</span> previous
            </button>
            <button
              type="button"
              onClick={() => setFi((v) => v + 1)}
              disabled={fi === record.folders.length - 1}
            >
              next <span aria-hidden="true">→</span>
            </button>
          </div>

          <GoLink href={`/${record.slug}#${folder.anchor}`} className="cover-open">
            read more <span aria-hidden="true">→</span>
          </GoLink>
        </div>
      </article>
    </div>
  );
}
