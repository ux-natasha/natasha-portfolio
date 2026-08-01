import { Foot } from "@/components/Foot";
import { GoLink, PageTransition } from "@/components/PageTransition";
import { Spine } from "@/components/Spine";
import type { CatalogueEntry, Drawer, Shelf } from "@/lib/schema";

/**
 * A shelf with nothing on it yet — /writing, /reading.
 *
 * §1c keeps these quiet and clearly-coming and PRODUCT.md forbids inventing
 * their contents, so this page invents nothing: it states what will be here, says
 * plainly that it isn't, and then does the one useful thing an empty page can,
 * which is offer the work that *is* written. An empty state is not fabricated
 * content — but a label that leads nowhere is a dead end, and the drawer had two.
 *
 * Composed rather than apologetic. It carries no accent: an accent identifies a
 * record, and this is not one.
 */
export function ShelfView({
  shelf,
  catalogue,
  contact,
}: {
  shelf: Shelf;
  catalogue: CatalogueEntry[];
  contact: Drawer["contact"];
}) {
  const records = catalogue.filter(
    (entry) => entry.kind === "record" && entry.ready,
  );

  return (
    <PageTransition className="shell">
      <Spine
        recordKey={shelf.label.toUpperCase()}
        chapters={[]}
        catalogue={catalogue}
        current={shelf.slug}
      />

      <main className="sheet" id="content" tabIndex={-1}>
        <header className="shelfpage">
          <p className="eyebrow">
            {shelf.kicker} · {shelf.state}
          </p>
          <h1 className="shelfpage-title">{shelf.title}</h1>
          <p className="shelfpage-lede">{shelf.lede}</p>

          {shelf.bodyHtml ? (
            <div
              className="shelfpage-body"
              dangerouslySetInnerHTML={{ __html: shelf.bodyHtml }}
            />
          ) : null}
        </header>

        {/* The empty state's one job: not to be a full stop. */}
        <section className="shelfpage-onward" aria-labelledby="shelf-onward">
          <h2 className="onward-key" id="shelf-onward">
            Written, and worth reading
          </h2>
          <ul className="shelfpage-list">
            {records.map((entry) => (
              <li key={entry.slug}>
                <GoLink
                  href={`/${entry.slug}`}
                  className="shelfpage-rec"
                  data-accent={entry.accent}
                >
                  <span className="shelfpage-rec-key">{entry.key}</span>
                  <span className="shelfpage-rec-name">{entry.name}</span>
                  <span className="shelfpage-rec-sub">{entry.sub}</span>
                  <span className="shelfpage-rec-cta" aria-hidden="true">
                    →
                  </span>
                </GoLink>
              </li>
            ))}
          </ul>
        </section>

        <Foot
          contact={contact}
          back={{ label: "back to the drawer", href: "/#drawer", route: true }}
        />
      </main>
    </PageTransition>
  );
}
