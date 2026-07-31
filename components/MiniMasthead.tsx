"use client";

import { GoLink } from "@/components/PageTransition";
import type { Compartment } from "@/lib/schema";

/**
 * The header of a single folder page — not the full masthead.
 *
 * A folder is its own route now, so a reader can land on it directly (a
 * shared link, a back button, browser history) without ever passing through
 * the record overview and its role/timeline/team/outcome panel. Zero
 * context at that point would be worse than the full panel repeated on
 * every folder; this is the middle ground — just enough to say whose work
 * this is and where it sits, plus a way back to the full masthead for
 * anyone who wants it. It costs nothing to arrive with: no disclosure, no
 * extra screen, just the top of the page.
 */
export function MiniMasthead({
  record,
  position,
  total,
}: {
  record: Compartment;
  position: number;
  total: number;
}) {
  return (
    <div className="mini-mast">
      <GoLink className="mm-back" href={`/${record.slug}`} direction="out">
        <span aria-hidden="true">←</span> {record.name} overview
      </GoLink>

      <div className="mm-id">
        <span className="mm-tick" aria-hidden="true" />
        <span className="mm-key">{record.key}</span>
        <span className="mm-name">{record.name}</span>
      </div>

      <span className="mm-pos">
        {position} / {total}
      </span>
    </div>
  );
}
