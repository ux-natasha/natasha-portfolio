import type { KeyboardEvent } from "react";

/**
 * The APG tablist keyboard contract: arrows move and select, Home and End go
 * to the ends, and focus follows the selection. Only these keys are
 * consumed — Tab, Escape and everything else pass through untouched.
 *
 * Shared between the index's compartment strip and a cover's folder tablist
 * — both are `role="tablist"` rows, so both get the same contract rather
 * than two hand-rolled copies drifting apart.
 */
export function roving(
  event: KeyboardEvent,
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
