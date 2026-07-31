"use client";

import { Foot } from "@/components/Foot";
import { Masthead } from "@/components/Masthead";
import { NextRecord } from "@/components/NextRecord";
import { PageTransition } from "@/components/PageTransition";
import { Spine } from "@/components/Spine";
import { useAccentGround } from "@/lib/useAccentGround";
import type { CatalogueEntry, Compartment, Drawer } from "@/lib/schema";

/**
 * A record's overview: one route, the whole case study named and placed.
 *
 * Chapters used to stack here as one continuous scroll — a reviewer got the
 * whole arc in one gesture, but paid for all four chapters even to read one.
 * They're separate routes now (`/<slug>/<NN>`), reached from the masthead's
 * own contents list; this page is what's left once that stack is gone: the
 * masthead (role/timeline/team/outcome, the four-second read), the way into
 * each chapter, and the way to the next record.
 *
 * The frame's own rules survive the move off the index unchanged: whitespace is
 * the only separator, the meta block is a panel, and the structural column is
 * real and persistent rather than a floating control.
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
        }))}
        catalogue={catalogue}
        current={record.slug}
      />

      <main className="sheet" id="content" tabIndex={-1}>
        <Masthead record={record} />

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
