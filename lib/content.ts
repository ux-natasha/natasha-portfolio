import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type {
  CatalogueEntry,
  Compartment,
  Decision,
  Drawer,
  Folder,
  Opening,
  Shelf,
  Site,
} from "./schema";

/**
 * Prose lives in markdown, separate from components, so a typo can be fixed in
 * GitHub's web editor from a phone with no toolchain and no subscription
 * (CLAUDE.md §7). Nothing here reaches for a CMS: each chapter is art-directed
 * and non-repeating, and a content model would fight every one of them.
 *
 * The tree is the cabinet, and it is also the route map:
 *
 *   content/opening.md                                    the top of the frame
 *   content/drawer.md                                     the tail of the frame
 *   content/shelves/<slug>.md                             /writing, /reading
 *   content/compartments/<nn-slug>/compartment.md         a record → /<slug>
 *   content/compartments/<nn-slug>/folders/*.md           its chapters
 *
 * Adding a record is adding a numbered directory. No registry to update, no
 * route to write, no flag to flip — `app/[record]/page.tsx` generates its
 * params from exactly this listing. The `nn-` prefix sets order and is cut off
 * the public URL.
 *
 * Read once, at build time. Every page here is static, so the filesystem is
 * touched during `next build` and never on a request.
 */

const CONTENT = path.join(process.cwd(), "content");
const COMPARTMENTS = path.join(CONTENT, "compartments");
const SHELVES = path.join(CONTENT, "shelves");

/** Everything the index needs, in one object, ready for a client component. */
export function getSite(): Site {
  const compartments = getCompartments();
  const shelves = getShelves();
  return {
    opening: getOpening(),
    compartments,
    drawer: getDrawer(),
    shelves,
    catalogue: buildCatalogue(compartments, shelves),
  };
}

/* ── Records ──────────────────────────────────────────────────────────── */

/** The slugs `app/[record]` prerenders. Directory listing, nothing else. */
export function getRecordSlugs(): string[] {
  return getCompartments().map((c) => c.slug);
}

/** One record by its public slug, or null — the route 404s on null. */
export function getRecord(slug: string): Compartment | null {
  return getCompartments().find((c) => c.slug === slug) ?? null;
}

export function getShelf(slug: string): Shelf | null {
  return getShelves().find((s) => s.slug === slug) ?? null;
}

/** Records first, in build order, then the shelves. One list, no dead ends. */
export function getCatalogue(): CatalogueEntry[] {
  return buildCatalogue(getCompartments(), getShelves());
}

function buildCatalogue(
  compartments: Compartment[],
  shelves: Shelf[],
): CatalogueEntry[] {
  return [
    ...compartments.map((c): CatalogueEntry => ({
      kind: "record",
      slug: c.slug,
      key: c.key,
      name: c.name,
      sub: c.spine,
      accent: c.accent,
      /* A record whose only chapter is a placeholder is listed, reachable, and
         honest about being empty — never hidden, because hiding it would make
         the pager skip a slug that still resolves. */
      ready: !c.folders.every((f) => f.ledePlaceholder),
    })),
    ...shelves.map((s): CatalogueEntry => ({
      kind: "shelf",
      slug: s.slug,
      key: s.label,
      name: s.title,
      sub: s.lede,
      ready: false,
    })),
  ];
}

/* ── Readers ──────────────────────────────────────────────────────────── */

function getOpening(): Opening {
  const { data } = read(path.join(CONTENT, "opening.md"));
  const { line, ...rest } = data as Omit<Opening, "lineHtml"> & { line: string };
  return { ...rest, lineHtml: inline(line) };
}

function getDrawer(): Drawer {
  return read(path.join(CONTENT, "drawer.md")).data as Drawer;
}

/**
 * The shelves, in filename order. Absent directory is not an error — it just
 * means the drawer has no openable slots yet.
 */
function getShelves(): Shelf[] {
  if (!fs.existsSync(SHELVES)) return [];

  return files(SHELVES).map((name) => {
    const { data, content } = read(path.join(SHELVES, name));
    return {
      ...(data as Omit<Shelf, "slug" | "bodyHtml">),
      slug: name.replace(/\.md$/, ""),
      bodyHtml: block(content),
    };
  });
}

/**
 * Every record, in directory order. A compartment with no `folders/`
 * directory yet is skipped rather than rendered empty — the index can never
 * advertise a record that opens onto nothing, and `[record]` can never
 * prerender a route with no chapters in it.
 */
function getCompartments(): Compartment[] {
  if (!fs.existsSync(COMPARTMENTS)) return [];

  return dirs(COMPARTMENTS)
    .map((dir) => readCompartment(dir))
    .filter((c): c is Compartment => c !== null);
}

function readCompartment(dir: string): Compartment | null {
  const file = path.join(COMPARTMENTS, dir, "compartment.md");
  if (!fs.existsSync(file)) return null;

  const folders = path.join(COMPARTMENTS, dir, "folders");
  if (!fs.existsSync(folders)) return null;

  const read = files(folders).map((name) =>
    readFolder(path.join(folders, name)),
  );
  if (read.length === 0) return null;

  const { record, slug } = splitDirName(dir);
  const data = matter(fs.readFileSync(file, "utf8")).data as Omit<
    Compartment,
    "folders" | "slug" | "record" | "factsPlaceholder"
  >;

  return {
    ...data,
    slug,
    record,
    /* Tagged once for the whole band, from the rows themselves — so the corner
       tag can never drift out of step with which facts are actually written. */
    factsPlaceholder: (data.facts ?? []).some((f) => f.placeholder),
    folders: read,
  };
}

/** `01-vpro` → record "01", slug "vpro". The prefix orders; it is not public. */
function splitDirName(dir: string): { record: string; slug: string } {
  const at = dir.indexOf("-");
  if (at === -1) return { record: "", slug: dir };
  return { record: dir.slice(0, at), slug: dir.slice(at + 1) };
}

/**
 * A folder's frontmatter is its structure; its body is its prose, split on
 * `##` headings. `## Lede` is level 1 and stays plain text — it sets as display
 * type and must never arrive carrying markup. `## Body` is level 2 and is
 * rendered.
 */
function readFolder(file: string): Folder {
  const { data, content } = read(file);
  const sections = splitSections(content);

  const lede = sections.get("lede");
  if (lede === undefined) {
    throw new Error(`${path.basename(file)} has no "## Lede" section`);
  }

  const front = data as Omit<Folder, "lede" | "bodyHtml" | "anchor">;

  return {
    ...front,
    /* The in-record anchor and the spine's scroll-sync key. Derived from the
       filename's own number and name so a chapter's URL fragment can never
       disagree with the order it renders in. */
    anchor: `ch-${front.number}`,
    lede: flatten(lede),
    bodyHtml: block(sections.get("body") ?? ""),
    /* Level 4. Structured data (breakdown, pullQuote, diagramNote) lives in
       frontmatter and passes through `front` untouched; decisions are prose,
       so they're authored as `### ` subheadings under `## Decisions` instead
       — the same reasoning that put Lede/Body in markdown in the first
       place (§7: prose belongs in markdown, not YAML). */
    decisions: parseDecisions(sections.get("decisions")),
  };
}

/** Split a `## Decisions` block on its `### ` subheadings into named,
    already-rendered decisions. Undefined if the chapter has none — a
    folder with no sourced decisions skips level 4 rather than faking one. */
function parseDecisions(md: string | undefined): Decision[] | undefined {
  if (!md) return undefined;
  const out: Decision[] = [];
  let heading: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (heading !== null) {
      out.push({ heading: heading.trim(), bodyHtml: block(buffer.join("\n").trim()) });
    }
    buffer = [];
  };

  for (const line of md.split("\n")) {
    const sub = /^###\s+(?!#)(.*)$/.exec(line);
    if (sub) {
      flush();
      heading = sub[1].trim();
    } else if (heading !== null) {
      buffer.push(line);
    }
  }
  flush();
  return out.length > 0 ? out : undefined;
}

/* Content is authored on Windows and lands as CRLF. `splitSections` matches
   `##` headings without the `/m` flag, so a stray trailing `\r` on the
   heading line blocks the match — normalize before anything parses it. */
function read(file: string) {
  return matter(fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n"));
}

/** Directories, sorted by their `nn-` prefix. */
function dirs(at: string): string[] {
  return fs
    .readdirSync(at, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

/** Markdown files, sorted by their `nn-` prefix. */
function files(at: string): string[] {
  return fs
    .readdirSync(at)
    .filter((name) => name.endsWith(".md"))
    .sort();
}

/** Split a markdown body on `##` headings; the heading text is the key. */
function splitSections(md: string): Map<string, string> {
  const out = new Map<string, string>();
  let key: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (key !== null) out.set(key, buffer.join("\n").trim());
    buffer = [];
  };

  for (const line of md.split("\n")) {
    const heading = /^##\s+(?!#)(.*)$/.exec(line);
    if (heading) {
      flush();
      key = heading[1].trim().toLowerCase();
    } else if (key !== null) {
      buffer.push(line);
    }
  }
  flush();
  return out;
}

/** Markdown soft-wraps collapsed back into one line of plain text. */
function flatten(md: string): string {
  return md.replace(/\s+/g, " ").trim();
}

function inline(md: string): string {
  return marked.parseInline(md.trim(), { async: false }) as string;
}

function block(md: string): string {
  if (md.trim().length === 0) return "";
  return (marked.parse(md.trim(), { async: false }) as string).trim();
}
