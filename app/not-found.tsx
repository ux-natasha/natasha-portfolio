import Link from "next/link";
import { getCatalogue, getSite } from "@/lib/content";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * An empty slot.
 *
 * Composed rather than apologetic, and — like every other page here — not a dead
 * end: it lists the whole drawer, because a reader who mistyped a URL knows what
 * they wanted and just needs it in front of them. Plain `next/link`, no exit
 * transition: there was no page to leave.
 */
export default function NotFound() {
  const { drawer } = getSite();
  const catalogue = getCatalogue();

  return (
    <div className="shell" id="top">
      <nav className="rail" aria-label="Rail">
        <span className="rail-mark" aria-hidden="true">
          N
        </span>
        <Link className="rail-up" href="/">
          <span className="arw" aria-hidden="true">
            ↑
          </span>
          drawer
        </Link>

        <div className="rail-foot">
          <ThemeToggle />
        </div>
      </nav>

      <main className="sheet" id="content" tabIndex={-1}>
        <header className="shelfpage">
          <p className="eyebrow">Empty slot · 404</p>
          <h1 className="shelfpage-title">Nothing filed here</h1>
          <p className="shelfpage-lede">
            The drawer has no record under that name. Everything that does exist
            is below.
          </p>
        </header>

        <section className="shelfpage-onward" aria-labelledby="nf-onward">
          <h2 className="onward-key" id="nf-onward">
            In the drawer
          </h2>
          <ul className="shelfpage-list">
            {catalogue.map((entry) => (
              <li key={entry.slug}>
                <Link
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
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className="foot" id="contact">
          <p>
            <a href={drawer.contact.href}>{drawer.contact.value}</a>
          </p>
          <Link className="to-top" href="/">
            <span aria-hidden="true">↑</span> back to the drawer
          </Link>
        </footer>
      </main>
    </div>
  );
}
