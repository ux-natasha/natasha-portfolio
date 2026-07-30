"use client";

import { GoLink } from "@/components/PageTransition";
import { neighbours } from "@/lib/schema";
import type { CatalogueEntry } from "@/lib/schema";

/**
 * The end of a record, and the guarantee that it isn't the end of the site.
 *
 * A reader who finishes here has three ways on without touching Back: the next
 * record, the previous one, and back up to the drawer. The list wraps, so the
 * last record leads to the first and nothing is ever a disabled button — a
 * greyed-out "next" at the end of the only path forward is a dead end wearing a
 * control's clothes.
 *
 * Each neighbour carries its own accent on its edge, so the colour arrives
 * before the page does: you see where you're going, then you go there.
 */
export function NextRecord({
  catalogue,
  current,
}: {
  catalogue: CatalogueEntry[];
  current: string;
}) {
  /* Records only. The catalogue panel lists the shelves too — they belong in a
     jump-anywhere index — but "previous / next" here means the next piece of
     work, and wrapping a reader off the end of the first record into an empty
     shelf is a worse ending than the one it was meant to prevent. */
  const pair = neighbours(
    catalogue.filter((entry) => entry.kind === "record"),
    current,
  );
  if (pair === null) return null;

  return (
    <nav className="onward" aria-label="Continue">
      <p className="onward-key">Continue</p>

      <div className="onward-pair">
        <GoLink
          href={`/${pair.prev.slug}`}
          className="onward-card is-prev"
          data-accent={pair.prev.accent}
          direction="out"
        >
          <span className="onward-dir">
            <span aria-hidden="true">←</span> previous
          </span>
          <span className="onward-name">{pair.prev.name}</span>
          <span className="onward-sub">{pair.prev.sub}</span>
        </GoLink>

        <GoLink
          href={`/${pair.next.slug}`}
          className="onward-card is-next"
          data-accent={pair.next.accent}
        >
          <span className="onward-dir">
            next <span aria-hidden="true">→</span>
          </span>
          <span className="onward-name">{pair.next.name}</span>
          <span className="onward-sub">{pair.next.sub}</span>
        </GoLink>
      </div>

      <GoLink
        href={`/?from=${current}#drawer`}
        className="onward-up"
        direction="out"
      >
        <span aria-hidden="true">↑</span> all of it, from the drawer
      </GoLink>
    </nav>
  );
}
