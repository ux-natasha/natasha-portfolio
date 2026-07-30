import { Workspace } from "@/components/Workspace";
import { getSite } from "@/lib/content";

/**
 * The index — an overview, and nothing more.
 *
 * The frame opens on Natasha, shows the drawer's contents, and hands off (§0).
 * Each record is its own route: this page never holds a case study, so a
 * reviewer's decision here is which one to read, not how far to scroll.
 *
 * Read from markdown at build time and prerendered — the filesystem is touched
 * during `next build` and never on a request.
 */
export default function Home() {
  return <Workspace site={getSite()} />;
}
