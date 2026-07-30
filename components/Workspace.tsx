"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Cover } from "@/components/Cover";
import { Foot } from "@/components/Foot";
import { Opening } from "@/components/Opening";
import { GoLink, PageTransition } from "@/components/PageTransition";
import { ThemeToggle } from "@/components/ThemeToggle";
import { splitSpine, type Site } from "@/lib/schema";

/**
 * The index, and only the index.
 *
 * It opens on Natasha, shows what is in the drawer, and hands off. The case
 * studies used to live here as the same page's deeper state; they are their own
 * routes now, so nothing below the fold is a reader's destination — it is a
 * choice between destinations. That is the whole change in one sentence, and it
 * is why this file got shorter rather than longer.
 *
 * Two zoom levels, unchanged from §0: the rail moves BETWEEN records here, and
 * the spine moves WITHIN one over there. Step back, see the cabinet; step in,
 * read the folder.
 */
export function Workspace({ site }: { site: Site }) {
  /* The catalogue panel is a record-page control: on the index the drawer IS
     the catalogue, so it isn't duplicated here. */
  const { opening, compartments, drawer, shelves } = site;

  const [ci, setCi] = useState(0);
  const record = compartments[ci];

  const uid = useId();
  const tabId = (i: number) => `${uid}-rec-${i}`;
  const wellId = `${uid}-well`;

  const cabinet = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  /**
   * The rail and the drawer act on a cabinet that may be off screen, so they
   * bring it back. The strip doesn't — the thing it changed is already under the
   * reader's eye, and scrolling would move the page out from under a click.
   */
  const revealCabinet = useCallback(() => {
    cabinet.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  useReturnedFrom(compartments.map((c) => c.slug), setCi);

  return (
    <PageTransition className="shell">
      <nav className="rail" aria-label="Progress rail">
        <span className="rail-mark" aria-hidden="true">
          N
        </span>

        {/* Up one zoom level: out of the folders, back to the drawer (§0). */}
        <a className="rail-up" href="#drawer">
          <span className="arw" aria-hidden="true">
            ↑
          </span>
          drawer
        </a>

        <p className="rail-key">
          <span className="vh">Selected record: </span>
          {record.key}
        </p>

        {/* On the index the numbers are RECORDS, not chapters — the layer above
            the one the spine works on. A progress rail, not a menu: they carry
            aria-current="step" and read as a sequence. */}
        <ol className="rail-nums">
          {compartments.map((c, i) => (
            <li key={c.slug}>
              <button
                type="button"
                className="rail-num"
                aria-current={i === ci ? "step" : undefined}
                onClick={() => {
                  setCi(i);
                  revealCabinet();
                }}
              >
                {c.record}
                <span className="vh"> — {c.name}</span>
              </button>
            </li>
          ))}
        </ol>

        <ThemeToggle />
      </nav>

      <main className="sheet" id="content" tabIndex={-1}>
        <Opening content={opening} />

        {/* The skip link lands here, so it has to be able to take focus. */}
        <h2 className="open-line" id="work" tabIndex={-1}>
          <span className="dash" aria-hidden="true" />
          {/* One span: the arrow has to wrap with the last word, not sit at the
              far edge of a two-line flex row. */}
          <span>
            {opening.descend} <span aria-hidden="true">↓</span>
          </span>
        </h2>

        <section ref={cabinet} aria-labelledby="work">
          <div
            className="comp-strip"
            role="tablist"
            aria-label="Records"
            ref={strip}
            onKeyDown={(e) => roving(e, strip.current, ci, compartments.length, setCi)}
          >
            {compartments.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                role="tab"
                id={tabId(i)}
                className="comp"
                aria-selected={i === ci}
                aria-controls={wellId}
                tabIndex={i === ci ? 0 : -1}
                onClick={() => setCi(i)}
              >
                <span className="comp-key">Record {c.record}</span>
                <span className="comp-name">{c.name}</span>
              </button>
            ))}
          </div>

          <div
            className="well"
            id={wellId}
            role="tabpanel"
            aria-labelledby={tabId(ci)}
          >
            <div className="well-head">
              <p className="well-desc">{record.spine}</p>
              <p className="well-count">
                {record.folders.length}{" "}
                {record.folders.length === 1 ? "chapter" : "chapters"}
              </p>
            </div>

            <SlidingCover record={record} seq={ci} />
          </div>

          {/* Switching a cover moves no focus, so nothing would be announced.
              This says what is showing, once, politely. */}
          <p className="vh" role="status">
            {record.name} — record {ci + 1} of {compartments.length}
          </p>
        </section>

        {/* ── The tail: the view pulls back out to the drawer (§1c) ── */}
        <section className="drawer" id="drawer" aria-labelledby="drawer-heading">
          <h2 className="drawer-heading" id="drawer-heading">
            {drawer.heading}
          </h2>

          {compartments.map((c) => {
            const { lead, rest } = splitSpine(c.spine);
            return (
              <GoLink key={c.slug} href={`/${c.slug}`} className="shelf" data-accent={c.accent}>
                <span className="shelf-face">
                  <span className="shelf-key">{c.key}</span>
                  <span className="shelf-name">{c.name}</span>
                  <span className="shelf-sub">
                    <b>{lead}</b>
                    {rest}
                  </span>
                  <span className="shelf-cta">
                    open <span aria-hidden="true">→</span>
                  </span>
                </span>
              </GoLink>
            );
          })}

          {/* Still quiet, still clearly coming — but they open now. A labelled
              slot that leads nowhere is a dead end; a labelled slot that opens
              onto an honest empty page is not (§1c, and the routing rule). */}
          <ul className="slot-list">
            {shelves.map((shelf) => (
              <li key={shelf.slug}>
                <GoLink href={`/${shelf.slug}`} className="slot">
                  <span className="slot-key">{shelf.label}</span>
                  <span className="slot-state">{shelf.state}</span>
                  <span className="slot-cta" aria-hidden="true">
                    →
                  </span>
                </GoLink>
              </li>
            ))}
          </ul>

          <p className="drawer-note">{drawer.note}</p>
        </section>

        <Foot contact={drawer.contact} back={{ label: "back to top", href: "#top" }} />
      </main>
    </PageTransition>
  );
}

/* ── The record-to-record hand-off ────────────────────────────────────── */

/**
 * §1a's lateral slide, still doing its original job at the seam between records
 * — the closed cover pushes off to the side as the next one slides in, thumbing
 * through a set. Scroll inside the page is untouched.
 *
 * The outgoing cover stays mounted, `aria-hidden` and `inert`, only long enough
 * to play its exit, then unmounts; nothing lingers in the DOM or the tab order.
 */
function SlidingCover({
  record,
  seq,
}: {
  record: Site["compartments"][number];
  seq: number;
}) {
  const [shown, setShown] = useState({ record, seq });
  const [outgoing, setOutgoing] = useState<
    | { record: Site["compartments"][number]; seq: number; direction: 1 | -1 }
    | null
  >(null);

  if (seq !== shown.seq) {
    setOutgoing({ ...shown, direction: seq > shown.seq ? 1 : -1 });
    setShown({ record, seq });
  }

  useEffect(() => {
    if (outgoing === null) return;
    // --settle is 0.5s; a hair of slack so the animation is never visibly cut
    // off by the timer racing the paint.
    const timer = window.setTimeout(() => setOutgoing(null), 600);
    return () => window.clearTimeout(timer);
  }, [outgoing]);

  return (
    <div className="page-slide">
      {outgoing !== null ? (
        <div
          key={`${outgoing.record.slug}-out`}
          className={`page-slide-slot page-slide-exit${
            outgoing.direction > 0 ? "-left" : "-right"
          }`}
          aria-hidden="true"
          inert
        >
          <Cover record={outgoing.record} />
        </div>
      ) : null}

      <div
        key={`${shown.record.slug}-in`}
        className={
          outgoing !== null
            ? `page-slide-slot page-slide-enter${
                outgoing.direction > 0 ? "-right" : "-left"
              }`
            : "page-slide-slot"
        }
      >
        <Cover record={shown.record} />
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────── */

/**
 * Coming back from a record selects the record you were reading, so stepping up
 * a zoom level lands you where you left rather than at the top of a list. The
 * slug arrives as `?from=`, written by the links that step back out.
 *
 * Read from `location` in an effect rather than through `useSearchParams` on
 * purpose: this page is fully static, and reading search params during render
 * would opt it into a Suspense boundary for a query string that only ever
 * matters after the first paint.
 */
function useReturnedFrom(slugs: string[], select: (i: number) => void) {
  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from");
    if (from === null) return;
    const at = slugs.indexOf(from);
    if (at > 0) select(at);
  }, [slugs, select]);
}

/**
 * The APG tablist keyboard contract: arrows move and select, Home and End go to
 * the ends, and focus follows the selection. Only these keys are consumed — Tab,
 * Escape and everything else pass through untouched.
 */
function roving(
  event: React.KeyboardEvent,
  list: HTMLElement | null,
  current: number,
  count: number,
  select: (next: number) => void,
) {
  const next = {
    ArrowRight: (current + 1) % count,
    ArrowDown: (current + 1) % count,
    ArrowLeft: (current - 1 + count) % count,
    ArrowUp: (current - 1 + count) % count,
    Home: 0,
    End: count - 1,
  }[event.key];

  if (next === undefined) return;

  event.preventDefault();
  select(next);
  (list?.children[next] as HTMLElement | undefined)?.focus();
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
