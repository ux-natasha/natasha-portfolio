"use client";

import { useEffect } from "react";

/**
 * The paper's own tint, for the whole viewport rather than the shell alone.
 *
 * The accent tokens are set on `.shell[data-accent]` too, so every mark is the
 * right colour in the server-rendered HTML with no JS at all. This adds the one
 * thing an element inside the page cannot: the ground behind the page, out past
 * the shell's max width and into the overscroll gutter. It is a ~4% tint, so
 * arriving a frame after hydration is imperceptible — and the same mechanism the
 * theme toggle already uses, rather than a second one.
 *
 * Shared between the record overview and its individual folder pages — both are
 * `data-accent`-tinted the same way, so this lives once rather than twice.
 */
export function useAccentGround(accent: string) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-accent", accent);
    return () => root.removeAttribute("data-accent");
  }, [accent]);
}
