import { Plate } from "@/components/Plate";
import type { Opening as OpeningContent } from "@/lib/schema";

/**
 * The TOP of the frame (§1b). Name, role, the line, and the at-a-glance panel
 * beside a drawing. Lightest touch — this is not an "about me" and not a hero;
 * the gray-line copy IS the introduction, because it shows how she thinks.
 *
 * The name lives HERE and only here. No chapter repeats it.
 */
export function Opening({ content }: { content: OpeningContent }) {
  const { card, plate } = content;

  return (
    <header className="hero">
      <div>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className="hero-name">{content.name}</h1>
        <p className="hero-role">{content.role}</p>
        {/* The line carries one italic word, set in the markdown. */}
        <p
          className="hero-line"
          dangerouslySetInnerHTML={{ __html: content.lineHtml }}
        />
      </div>

      <div className="hero-side">
        {/* A PANEL, never a ruled table (§1). Label over value, no rule
            between rows, one corner tag for the whole block. */}
        <aside className="card" aria-labelledby="card-label">
          {card.placeholder ? (
            <span className="card-tag">placeholder</span>
          ) : null}
          <h2 className="vh" id="card-label">
            {card.label}
          </h2>
          {card.rows.map((row) => (
            <div
              key={row.key}
              className={`card-row${row.placeholder ? " is-stub" : ""}`}
            >
              <span className="card-label">{row.key}</span>
              <span className="card-val">{row.value}</span>
            </div>
          ))}
        </aside>

        <Plate alt={plate.alt} caption={plate.caption} />
      </div>
    </header>
  );
}
