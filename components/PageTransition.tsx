"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";

/**
 * Spatial continuity across routes.
 *
 * The site used to be one page, so a chapter hand-off could keep both sheets
 * mounted and slide one off as the other came in (§1a). Records are separate
 * documents now, and no framework keeps the outgoing one mounted across a
 * navigation — so the move is split in two halves that meet in the middle: the
 * leaving page plays its exit here, then pushes; the arriving page plays its
 * own load-in assembly on mount (§1b, CSS keyframes, no JS). Same `--settle`
 * family, same easing, same direction of travel — a reader sees one gesture.
 *
 * Only the sheet moves. The rail and the spine hold still, so a record reads
 * as sliding out from behind a structural column that was never part of the
 * transition — which is exactly what the column is for.
 *
 * `direction` is the reader's sense of travel, not the DOM order: "in" is
 * going deeper (index → record, record → next record), "out" is stepping back
 * up a zoom level (record → index, record → drawer).
 */

type Direction = "in" | "out";
type Go = (href: string, direction?: Direction) => void;

const GoContext = createContext<Go | null>(null);

/** The exit half of the hand-off. ~240ms — shorter than --settle on purpose:
 *  it is a departure, not a performance, and it delays a real navigation. */
const EXIT_MS = 240;

export function PageTransition({
  className,
  accent,
  children,
}: {
  className: string;
  /** Set here as well as on <html> so the marks are right before hydration. */
  accent?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [leaving, setLeaving] = useState<Direction | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const go = useCallback<Go>(
    (href, direction = "in") => {
      // One navigation at a time: a second click mid-exit would queue a push
      // to a page the reader never asked to see.
      if (timer.current !== undefined) return;

      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      setLeaving(direction);
      timer.current = window.setTimeout(() => router.push(href), EXIT_MS);
    },
    [router],
  );

  // A push that resolves before the timer fires (or a reader hitting Back
  // mid-exit) unmounts this — the timer has to go with it.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Sibling routes that share a component (e.g. /vpro/00 -> /vpro/01, both
  // FolderPage) don't remount it — React reuses the instance and only
  // updates props, so `leaving`/`timer` from the outgoing click would
  // otherwise survive into the arriving page. Left unset, `go()`'s re-entrancy
  // guard stays tripped forever (every later click silently no-ops) and the
  // arriving `.sheet` inherits the exit animation's `opacity: 0` end state.
  // A real navigation landing is exactly a pathname change, so that's the
  // signal to clear both.
  useEffect(() => {
    timer.current = undefined;
    setLeaving(null);
  }, [pathname]);

  return (
    <GoContext.Provider value={go}>
      {/* `id="top"` lives here rather than in each page: this wrapper IS the page
          shell on every route, so "back to top" has one target everywhere. */}
      <div
        id="top"
        className={className}
        data-accent={accent}
        data-leaving={leaving ?? undefined}
      >
        {children}
      </div>
    </GoContext.Provider>
  );
}

export function useGo(): Go {
  const go = useContext(GoContext);
  if (go === null) {
    throw new Error("useGo must be used inside a PageTransition");
  }
  return go;
}

/* Module scope, not React state: it has to survive the rail/spine's own
 * remount. Every route is its own page component (no shared layout wraps
 * them), so a client-side navigation unmounts the old rail and mounts a
 * fresh one — which replayed `assemble-rail` from opacity 0 on every single
 * navigation, not just a real page load. That reads as the one element
 * that's supposed to "hold still across the transition" (§1a) blinking off
 * and sliding back in. A plain module boolean resets on a real reload (new
 * JS session) but survives a client-side route push, so it can tell the two
 * apart without needing a server flag or sessionStorage. */
let booted = false;

/** True only for the very first paint of a browser session. */
export function useIsFirstBoot(): boolean {
  const [first] = useState(() => !booted);
  useEffect(() => {
    booted = true;
  }, []);
  return first;
}

/**
 * A real `next/link` that plays the exit first.
 *
 * It stays a real link on purpose: the href is in the markup, so middle-click,
 * ⌘-click, "open in new tab", "copy link" and a crawler all behave normally,
 * and only a plain left-click is intercepted. Anything modified falls straight
 * through to the browser — an animation is not worth breaking a new tab for.
 */
export function GoLink({
  href,
  direction = "in",
  onNavigate,
  children,
  ...rest
}: {
  href: string;
  direction?: Direction;
  /** Fires only when the transition is actually taken — e.g. to close a panel. */
  onNavigate?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const go = useGo();

  return (
    <Link
      href={href}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }
        event.preventDefault();
        onNavigate?.();
        go(href, direction);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
