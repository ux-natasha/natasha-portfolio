import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FolderPage } from "@/components/FolderPage";
import { getCatalogue, getRecord, getSite } from "@/lib/content";

/**
 * One folder, one route — `/vpro/00`, `/vpro/01`, and so on.
 *
 * A record used to be one continuous scroll holding every chapter; this is
 * the per-chapter successor, generated the same way the record route is:
 * from the same directory listing, so adding a folder is still just adding a
 * file, never a registry entry.
 */

type Params = { params: Promise<{ record: string; folder: string }> };

export const dynamicParams = false;

export function generateStaticParams(): { record: string; folder: string }[] {
  const { compartments } = getSite();
  return compartments.flatMap((c) =>
    c.folders.map((f) => ({ record: c.slug, folder: f.number })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { record: slug, folder: number } = await params;
  const record = getRecord(slug);
  const folder = record?.folders.find((f) => f.number === number);
  if (!record || !folder) return {};

  return {
    title: `${folder.title} — ${record.name} — Natasha M.`,
    description: folder.ledePlaceholder ? `${record.desc}` : folder.lede,
  };
}

export default async function FolderRoute({ params }: Params) {
  const { record: slug, folder: number } = await params;
  const { drawer } = getSite();
  const catalogue = getCatalogue();

  const record = getRecord(slug);
  const folder = record?.folders.find((f) => f.number === number);
  if (!record || !folder) notFound();

  return (
    <FolderPage
      record={record}
      folder={folder}
      catalogue={catalogue}
      contact={drawer.contact}
    />
  );
}
