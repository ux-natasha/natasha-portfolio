import { PlateStub } from "@/components/Plate";
import { unitNoun, type Compartment } from "@/lib/schema";

/**
 * The first viewport of a record, built for someone deciding whether to read it.
 *
 * Everything a hiring manager needs to place the work is here and at rest —
 * what it is, the problem, role, timeline, team, what was owned, the outcome,
 * and the four chapters with their credit registers. Nothing in this block sits
 * behind a disclosure: depth defaults closed (§1), but depth is the levels
 * *below* a chapter's own opening line, never the facts that decide whether to
 * start reading at all.
 *
 * The name "Natasha M." is not repeated here — it belongs once, at the top of
 * the index (§1b). A record's own title is the project.
 */
export function Masthead({ record }: { record: Compartment }) {
  return (
    <header className="mast">
      <div className="mast-lead">
        <p className="eyebrow accent-ink mast-eyebrow">
          Record {record.record} · {record.key}
        </p>
        <h1 className="mast-title">{record.name}</h1>

        {/* The problem, in one line — the ten-second read. */}
        <p className={`mast-problem${record.problemPlaceholder ? " is-stub" : ""}`}>
          {record.problemPlaceholder ? `[${record.problem}]` : record.problem}
        </p>

        <p className="mast-desc">{record.desc}</p>
      </div>

      <div className="mast-side">
        {/* A PANEL, never a ruled table (§1) — label over value, no rule between
            rows, one corner tag for the whole block however many rows are
            unwritten. */}
        <aside className="card mast-facts" aria-labelledby="facts-label">
          {record.factsPlaceholder ? (
            <span className="card-tag">placeholder</span>
          ) : null}
          <h2 className="vh" id="facts-label">
            At a glance
          </h2>
          {record.facts.map((fact) => (
            <div
              key={fact.key}
              className={`card-row${fact.placeholder ? " is-stub" : ""}`}
            >
              <span className="card-label">{fact.key}</span>
              <span className="card-val">{fact.value}</span>
            </div>
          ))}
        </aside>

        <PlateStub label={record.name} />
      </div>

      {/* The contents. Real anchors, so the ten-second scan and the navigation
          are the same object rather than a list beside a list. */}
      <nav
        className="contents"
        aria-label={`${unitNoun(record.unit, 2)} in ${record.name}`}
      >
        <p className="contents-key">
          {record.folders.length} {unitNoun(record.unit, record.folders.length)}
          {record.unit === "piece" ? "" : ", in the order they were built"}
        </p>
        <ol className="contents-list">
          {record.folders.map((folder) => (
            <li key={folder.number}>
              <a className="contents-item" href={`#${folder.anchor}`}>
                <span className="contents-num">{folder.number}</span>
                <span className="contents-name">{folder.name}</span>
                <span className="contents-credit">{folder.credit}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}
