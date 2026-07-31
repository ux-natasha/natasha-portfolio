/**
 * The shape of the content, with no filesystem in it — this module is safe on
 * both sides of the server/client boundary. Reading the markdown lives in
 * `lib/content.ts`, which is server-only.
 */

/** One label/value pair in a panel. Never a table row (CLAUDE.md §1). */
export type MetaField = {
  key: string;
  value: string;
  /** Copy Natasha hasn't written yet. Styled quiet, tagged once per block. */
  placeholder?: boolean;
};

/**
 * A record's accent, named rather than given as hex.
 *
 * Named because the value has to differ per THEME — a muted olive that clears
 * 4.5:1 on light paper is invisible on dark, so each name resolves to two
 * triples in `globals.css` (`[data-accent="olive"]`, and again under dark).
 * Frontmatter carrying raw hex could only ever get one of the two right.
 *
 * Adding a fourth record is one name here and one CSS block there.
 */
export type AccentName = "olive" | "navy" | "burgundy";

/** The TOP of the frame. Name, the line, the panel, the drawing. */
export type Opening = {
  eyebrow: string;
  name: string;
  role: string;
  /** Already rendered: the line carries exactly one italic word. */
  lineHtml: string;
  card: {
    label: string;
    placeholder?: boolean;
    rows: MetaField[];
  };
  plate: { alt: string; caption: string };
  descend: string;
};

/** The TAIL of the frame. The compartments are read from disk, not listed. */
export type Drawer = {
  heading: string;
  note: string;
  contact: { value: string; href: string; placeholder?: boolean };
};

/** One record inside a compartment — a chapter of the monograph. */
export type Folder = {
  /** "00"–"03". Printed on the tab cut and in the record's margin. */
  number: string;
  /** Stable id for the in-record anchor and the spine's scroll sync. */
  anchor: string;
  name: string;
  /** The credit register: Solo / Survivor / Shared / Team. Honest, always. */
  credit: string;
  title: string;
  /** Level 1. Reads in ten seconds. */
  lede: string;
  /** §3 forbids drafting a headline before the deeper levels exist. */
  ledePlaceholder?: boolean;
  /** Level 2, already rendered from markdown. */
  bodyHtml: string;
  /** Level 2's closing aside. Optional — not every chapter earns one. */
  pullQuote?: string;
  meta: MetaField[];
  /** How many levels sit below this one, for the "+N more" cue. Counts down
      to 0 as real levels 3–5 get written; a folder with `breakdown` set has
      already claimed levels 3+ itself and this stops applying. */
  depth: number;

  /** Level 3's toggle label — chapter-specific ("what i built", "what's
      mine"). Only present on folders that go past level 2. */
  breakdownLabel?: string;
  /** Level 3: the named pieces inside this chapter, each credited. Mirrors
      §4's credit register at row granularity — only rows with a real,
      sourced credit are ever included, never invented to fill a count. */
  breakdown?: BreakdownRow[];

  /** Level 4: named decisions, each with its own prose. Only decisions with
      real source material are included — an unsourced one is left out
      rather than drafted thin. */
  decisions?: Decision[];

  /** Level 5's diagram half: a one-line hint at what the reconstructed
      diagram will show once drawn (§8 — original abstraction, no client
      data). Its presence is what triggers rendering levels 3–5 at all. */
  diagramNote?: string;
};

/** One row of a chapter's level-3 breakdown. */
export type BreakdownRow = {
  name: string;
  desc: string;
  /** Free text, not an enum — "SOLO", "TEAM", "TBC", "COLLEAGUE", whatever
      the credit register actually is for that piece. */
  credit: string;
};

/** One named decision inside a chapter's level 4, prose already rendered. */
export type Decision = {
  heading: string;
  bodyHtml: string;
};

/**
 * A drawer compartment — one record. On the index it is a shelf and a closed
 * cover; on its own route (`/<slug>`) it is the whole case study.
 */
export type Compartment = {
  /** Short mono key shown in the rail, the spine and on the shelf. */
  key: string;
  /** The route. Derived from the directory name with its `nn-` prefix cut. */
  slug: string;
  /** The catalogue number — the `nn-` prefix, kept for the masthead eyebrow. */
  record: string;
  name: string;
  desc: string;
  spine: string;
  accent: AccentName;
  /**
   * Which folder's number the index COVER (§1e's teaser) previews by default.
   * Undefined falls back to the first folder, same as before this existed —
   * build order still governs the record route and the tab row's own start;
   * this only decides what a reader sees before ever clicking a tab.
   */
  lead?: string;
  /** The problem, in one line. The masthead's second step. */
  problem: string;
  problemPlaceholder?: boolean;
  /**
   * The recruiter band: Role · Timeline · Team · Owned · Outcome. Visible at
   * rest, never behind a disclosure — it is the four-second read.
   */
  facts: MetaField[];
  /** Set when any fact is still unwritten: tags the block once, in the corner. */
  factsPlaceholder?: boolean;
  /**
   * What a `folders` entry IS, in this compartment. Not every record is a
   * sequence of chapters in build order — VPro is, but a compartment can just
   * as easily hold a set of independent pieces with no build-order relation
   * to each other. Same `Folder` shape either way (a folder is still a folder
   * to jump to, credit, and read), only the noun and the "built in order"
   * framing change. Defaults to "chapter" so existing content needs no edit.
   */
  unit?: "chapter" | "piece";
  folders: Folder[];
};

/**
 * A drawer slot that now has somewhere to go — `/writing`, `/reading`.
 *
 * §1c keeps these quiet and clearly-coming, and PRODUCT.md forbids inventing
 * their contents. Both still hold: the page they open onto is a composed empty
 * shelf that says so. An empty state is not fabricated content, and it beats a
 * label that leads nowhere.
 */
export type Shelf = {
  slug: string;
  label: string;
  /** "Coming" — printed on the index slot and on the shelf page itself. */
  state: string;
  kicker: string;
  title: string;
  /** The one honest line about what will land here. */
  lede: string;
  bodyHtml: string;
};

/**
 * One flat list of everywhere a reader can go, records and shelves together.
 * The catalogue panel, the spine's jump control and the end-of-record pager
 * all read from this, so "never a dead end" is one invariant, not three.
 */
export type CatalogueEntry = {
  kind: "record" | "shelf";
  slug: string;
  key: string;
  name: string;
  sub: string;
  accent?: AccentName;
  /** False for a shelf with nothing on it yet, and for a placeholder record. */
  ready: boolean;
};

/** Everything the index needs, in one serialisable object. */
export type Site = {
  opening: Opening;
  compartments: Compartment[];
  drawer: Drawer;
  shelves: Shelf[];
  catalogue: CatalogueEntry[];
};

/**
 * The shelf line, split so the first clause sets in ink and the rest in gray.
 * Done here rather than in the component because it is a fact about the copy —
 * a spine reads "Four chapters, three years", and the count is the part that
 * carries. Copy with no comma keeps all of itself in the lead.
 */
export function splitSpine(spine: string): { lead: string; rest: string } {
  const at = spine.indexOf(",");
  if (at === -1) return { lead: spine, rest: "" };
  return { lead: spine.slice(0, at + 1), rest: spine.slice(at + 1) };
}

/**
 * The noun for a compartment's folders, singular or plural — "chapter(s)"
 * for a build-order sequence, "piece(s)" for an unordered set. One function
 * so a fourth compartment shape never means hunting down three call sites.
 */
export function unitNoun(unit: Compartment["unit"], count: number): string {
  const noun = unit === "piece" ? "piece" : "chapter";
  return count === 1 ? noun : `${noun}s`;
}

/**
 * Where a reader goes next, and previously — wrapped, so the last record leads
 * back to the first rather than to a disabled button. §Routing's "no dead
 * ends" is enforced here, once, instead of being remembered at each call site.
 */
export function neighbours(
  catalogue: CatalogueEntry[],
  slug: string,
): { prev: CatalogueEntry; next: CatalogueEntry } | null {
  if (catalogue.length < 2) return null;
  const at = catalogue.findIndex((e) => e.slug === slug);
  if (at === -1) return null;
  const n = catalogue.length;
  return {
    prev: catalogue[(at - 1 + n) % n],
    next: catalogue[(at + 1) % n],
  };
}
