/**
 * Original abstractions drawn in code. Never a product screenshot: the software
 * is proprietary B2B and nothing of its layout may appear here (§8).
 */

/**
 * The argument about the brightness of gray, settled — three planes, each a
 * real value step lighter than the one behind it. The opening's plate, and only
 * the opening's: it illustrates one specific approved line.
 */
export function Plate({ alt, caption }: { alt: string; caption: string }) {
  return (
    <figure className="plate">
      <svg viewBox="0 0 240 78" role="img" aria-label={alt}>
        <rect x="8" y="14" width="150" height="46" fill="#B9B4A5" />
        <rect x="34" y="22" width="150" height="46" fill="#CFCABB" />
        <rect
          x="60"
          y="30"
          width="150"
          height="46"
          fill="#E6E3D8"
          stroke="#CFCABB"
        />
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/**
 * A record's diagram slot before the diagram exists.
 *
 * §8 commits to reconstructed diagrams drawn in code — the 5-level breakdown, a
 * critical path, a duration conflict. None are drawn yet, and drawing a
 * plausible-looking one to fill the hole would be inventing evidence. So the
 * slot renders the one thing that is true about it: a frame, an accented edge
 * that ties it to the record it belongs to, and a caption saying it is empty.
 *
 * Deliberately not a soft-shadowed rounded rectangle standing in for content —
 * it is measured, ruled, and obviously a reserved space.
 */
export function PlateStub({ label }: { label: string }) {
  return (
    <figure className="plate plate-stub">
      <svg viewBox="0 0 240 78" role="img" aria-label={`Empty diagram slot: ${label}`}>
        {/* The reserved area, ruled rather than filled — a plan, not a picture. */}
        <rect
          x="0.5"
          y="0.5"
          width="239"
          height="77"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeDasharray="3 4"
        />
        <line
          x1="0.5"
          y1="0.5"
          x2="239.5"
          y2="77.5"
          stroke="currentColor"
          strokeOpacity="0.14"
        />
        <line
          x1="239.5"
          y1="0.5"
          x2="0.5"
          y2="77.5"
          stroke="currentColor"
          strokeOpacity="0.14"
        />
      </svg>
      <figcaption>
        <span className="plate-mark">diagram</span> not yet drawn
      </figcaption>
    </figure>
  );
}
