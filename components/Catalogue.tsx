"use client";

import { useEffect, useRef } from "react";
import { GoLink } from "@/components/PageTransition";
import type { CatalogueEntry } from "@/lib/schema";

/**
 * The card catalogue: everywhere a reader can go, from anywhere.
 *
 * The spine is 96px wide and cannot list three record names, so "jump directly
 * to another record" gets its own surface rather than being crammed in or left
 * out. It reads as the drawer's index cards pulled out to be looked through —
 * each entry carries its own record's accent on its edge, so the colour a
 * reader learned on one page is how they recognise it in the list.
 *
 * Built on the native `<dialog>` so the focus containment, the Escape key, the
 * inert background and the backdrop are the platform's rather than
 * reimplemented — a hand-rolled focus trap is the kind of thing that works in
 * every test except a real screen reader.
 */
export function Catalogue({
  entries,
  current,
  open,
  onClose,
}: {
  entries: CatalogueEntry[];
  /** The slug being read now, or null on the index. */
  current: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog === null) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const records = entries.filter((e) => e.kind === "record");
  const shelves = entries.filter((e) => e.kind === "shelf");

  return (
    <dialog
      ref={ref}
      className="cat"
      aria-labelledby="cat-heading"
      /* `close` fires for Escape and for the close button alike, so the state
         upstream stays in step however the panel was dismissed. */
      onClose={onClose}
      /* A click that lands on the dialog element itself landed on the backdrop:
         every child covers its own area. */
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="cat-inner">
        <div className="cat-head">
          <h2 className="cat-heading" id="cat-heading">
            The catalogue
          </h2>
          <button type="button" className="cat-close" onClick={onClose}>
            close <span aria-hidden="true">✕</span>
          </button>
        </div>

        <p className="cat-key">Records</p>
        <ul className="cat-list">
          {records.map((entry) => (
            <li key={entry.slug}>
              <GoLink
                href={`/${entry.slug}`}
                className="cat-item"
                data-accent={entry.accent}
                aria-current={entry.slug === current ? "page" : undefined}
                onNavigate={onClose}
              >
                <span className="cat-item-key">{entry.key}</span>
                <span className="cat-item-name">{entry.name}</span>
                <span className="cat-item-sub">{entry.sub}</span>
                {entry.slug === current ? (
                  <span className="cat-item-state">reading</span>
                ) : !entry.ready ? (
                  <span className="cat-item-state">empty</span>
                ) : null}
              </GoLink>
            </li>
          ))}
        </ul>

        <p className="cat-key">Shelves</p>
        <ul className="cat-list">
          {shelves.map((entry) => (
            <li key={entry.slug}>
              <GoLink
                href={`/${entry.slug}`}
                className="cat-item is-shelf"
                aria-current={entry.slug === current ? "page" : undefined}
                onNavigate={onClose}
              >
                <span className="cat-item-key">{entry.key}</span>
                <span className="cat-item-sub">{entry.sub}</span>
                <span className="cat-item-state">
                  {entry.slug === current ? "reading" : "coming"}
                </span>
              </GoLink>
            </li>
          ))}
        </ul>

        <div className="cat-foot">
          <GoLink href="/" className="cat-home" direction="out" onNavigate={onClose}>
            <span aria-hidden="true">↑</span> the drawer, from the top
          </GoLink>
          <a href="#contact" className="cat-home" onClick={onClose}>
            contact
          </a>
        </div>
      </div>
    </dialog>
  );
}
