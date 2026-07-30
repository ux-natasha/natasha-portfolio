"use client";

import { useEffect } from "react";
import { Chapter } from "@/components/Chapter";
import { Foot } from "@/components/Foot";
import { Masthead } from "@/components/Masthead";
import { NextRecord } from "@/components/NextRecord";
import { PageTransition } from "@/components/PageTransition";
import { Spine } from "@/components/Spine";
import type { CatalogueEntry, Compartment, Drawer } from "@/lib/schema";

/**
 * A record: one case study, one route, one scroll.
 *
 * The chapters are a continuous document rather than tabs or sub-routes — a
 * reviewer gets the whole arc in one gesture, and the spine keeps their place
 * without their having to hold it themselves. Order is build order (§1.1), so
 * scrolling forward through the page is scrolling forward through the project.
 *
 * The frame's own rules survive the move off the index unchanged: whitespace is
 * the only separator, the meta block is a panel, depth defaults closed, and the
 * structural column is real and persistent rather than a floating control.
 */
export function Record({
  record,
  catalogue,
  contact,
}: {
  record: Compartment;
  catalogue: CatalogueEntry[];
  contact: Drawer["contact"];
}) {
  useAccentGround(record.accent);

  return (
    <PageTransition className="shell" accent={record.accent}>
      <Spine
        recordKey={record.key}
        chapters={record.folders.map((folder) => ({
          number: folder.number,
          name: folder.name,
          anchor: folder.anchor,
        }))}
        catalogue={catalogue}
        current={record.slug}
      />

      <main className="sheet" id="content" tabIndex={-1}>
        <Masthead record={record} />

        {/* Chapters separate by whitespace scale alone — no rule between them,
            no card around them (§1). */}
        <div className="chapters">
          {record.folders.map((folder) => (
            <Chapter key={folder.number} folder={folder} />
          ))}
        </div>

        <NextRecord catalogue={catalogue} current={record.slug} />

        <Foot
          contact={contact}
          back={{
            label: "back to the drawer",
            href: `/?from=${record.slug}#drawer`,
            route: true,
          }}
        />
      </main>
    </PageTransition>
  );
}

/**
 * The paper's own tint, for the whole viewport rather than the shell alone.
 *
 * The accent tokens are set on `.shell[data-accent]` too, so every mark is the
 * right colour in the server-rendered HTML with no JS at all. This adds the one
 * thing an element inside the page cannot: the ground behind the page, out past
 * the shell's max width and into the overscroll gutter. It is a ~4% tint, so
 * arriving a frame after hydration is imperceptible — and the same mechanism the
 * theme toggle already uses, rather than a second one.
 */
function useAccentGround(accent: string) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-accent", accent);
    return () => root.removeAttribute("data-accent");
  }, [accent]);
}
