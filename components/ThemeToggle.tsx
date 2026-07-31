"use client";

import { useEffect, useState } from "react";

/**
 * Lives at the foot of whichever structural column the page has — the rail on
 * the index, the spine on a record — rather than as a floating switch bolted on
 * somewhere else (§1). Reuses `.rail-up`'s hover-lift-plus-underline idiom (§6)
 * instead of inventing a second one, and names the destination the way
 * `.rail-up` already does ("↑ drawer" / "→ dark"), never an icon: the column is
 * typographic throughout.
 *
 * `theme` starts `null` (unknown on the server) and resolves on mount from
 * `localStorage`, falling back to the system preference; nothing renders until
 * then, so it never shows a guess. A blocking script in the document head has
 * already applied any stored choice before this runs — there is no flash to
 * cover for, this only has to get its own label right.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    setTheme(
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    );
  }, []);

  if (theme === null) return null;

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="rail-up theme-toggle"
      aria-label={`Switch to ${next} theme`}
      onClick={() => {
        document.documentElement.setAttribute("data-theme", next);
        window.localStorage.setItem("theme", next);
        setTheme(next);
        // Changing the site's own gray is new evidence in the opening's joke
        // about the brightness of gray — see Plate.tsx.
        window.dispatchEvent(new Event("theme-toggled"));
      }}
    >
      <span className="arw" aria-hidden="true">
        →
      </span>
      {next}
    </button>
  );
}
