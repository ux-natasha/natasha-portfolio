import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Record } from "@/components/Record";
import { ShelfView } from "@/components/ShelfView";
import { getCatalogue, getRecord, getShelf, getSite } from "@/lib/content";

/**
 * One route per record, and per shelf — `/vpro`, `/the-stacks`, `/writing`.
 *
 * Both live under one dynamic segment because both are "a thing in the drawer,
 * opened", and a reader moving between them should never cross a seam in the
 * routing. Which one a slug is decides which view renders; a slug that is
 * neither 404s.
 *
 * `generateStaticParams` reads the same directory listing `lib/content` walks, so
 * adding a record really is adding a directory: no registry, no route file, no
 * flag. Nothing here is generated on demand.
 */

type Params = { params: Promise<{ record: string }> };

export const dynamicParams = false;

export function generateStaticParams(): { record: string }[] {
  const site = getSite();
  return [
    ...site.compartments.map((c) => ({ record: c.slug })),
    ...site.shelves.map((s) => ({ record: s.slug })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { record: slug } = await params;

  const record = getRecord(slug);
  if (record !== null) {
    return {
      title: `${record.name} — Natasha M.`,
      /* The problem line is the description: it is the one sentence that says
         what the work was, and it is already written for a reader who knows
         nothing. A placeholder one is marked as such rather than shipped as a
         confident claim in a search result. */
      description: record.problemPlaceholder
        ? `${record.desc} Write-up in progress.`
        : record.problem,
    };
  }

  const shelf = getShelf(slug);
  if (shelf !== null) {
    return { title: `${shelf.title} — Natasha M.`, description: shelf.lede };
  }

  return {};
}

export default async function RecordPage({ params }: Params) {
  const { record: slug } = await params;
  const { drawer } = getSite();
  const catalogue = getCatalogue();

  const record = getRecord(slug);
  if (record !== null) {
    return (
      <Record record={record} catalogue={catalogue} contact={drawer.contact} />
    );
  }

  const shelf = getShelf(slug);
  if (shelf !== null) {
    return (
      <ShelfView shelf={shelf} catalogue={catalogue} contact={drawer.contact} />
    );
  }

  notFound();
}
