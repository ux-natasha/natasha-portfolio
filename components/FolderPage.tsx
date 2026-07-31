"use client";

import { Chapter } from "@/components/Chapter";
import { Foot } from "@/components/Foot";
import { MiniMasthead } from "@/components/MiniMasthead";
import { GoLink, PageTransition } from "@/components/PageTransition";
import { Spine } from "@/components/Spine";
import { useAccentGround } from "@/lib/useAccentGround";
import type { CatalogueEntry, Compartment, Drawer, Folder } from "@/lib/schema";

/**
 * One folder, one route, one page.
 *
 * The record overview used to stack every chapter in one continuous scroll;
 * a reader who only wanted one folder still paid for all four. This is that
 * one folder on its own: `MiniMasthead` for orientation, the chapter itself,
 * then a way to the next folder without a detour back through the overview.
 */
export function FolderPage({
  record,
  folder,
  catalogue,
  contact,
}: {
  record: Compartment;
  folder: Folder;
  catalogue: CatalogueEntry[];
  contact: Drawer["contact"];
}) {
  useAccentGround(record.accent);

  const index = record.folders.findIndex((f) => f.number === folder.number);
  const prev = index > 0 ? record.folders[index - 1] : null;
  const next = index < record.folders.length - 1 ? record.folders[index + 1] : null;

  return (
    <PageTransition className="shell" accent={record.accent}>
      <Spine
        recordKey={record.key}
        chapters={record.folders.map((f) => ({ number: f.number, name: f.name }))}
        catalogue={catalogue}
        current={record.slug}
        activeFolder={folder.number}
      />

      <main className="sheet" id="content" tabIndex={-1}>
        <MiniMasthead record={record} position={index + 1} total={record.folders.length} />

        <div className="chapters">
          <Chapter folder={folder} />
        </div>

        <nav className="folder-nav" aria-label="Other chapters in this record">
          {prev ? (
            <GoLink href={`/${record.slug}/${prev.number}`} direction="out">
              <span aria-hidden="true">←</span> {prev.number} · {prev.name}
            </GoLink>
          ) : (
            <GoLink href={`/${record.slug}`} direction="out">
              <span aria-hidden="true">←</span> {record.name} overview
            </GoLink>
          )}

          {next ? (
            <GoLink href={`/${record.slug}/${next.number}`}>
              {next.number} · {next.name} <span aria-hidden="true">→</span>
            </GoLink>
          ) : (
            <GoLink href={`/${record.slug}`}>
              {record.name} overview <span aria-hidden="true">→</span>
            </GoLink>
          )}
        </nav>

        <Foot
          contact={contact}
          back={{
            label: `back to ${record.name} overview`,
            href: `/${record.slug}`,
            route: true,
          }}
        />
      </main>
    </PageTransition>
  );
}
