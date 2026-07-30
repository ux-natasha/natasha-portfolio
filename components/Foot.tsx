import type { Drawer } from "@/lib/schema";
import { GoLink } from "@/components/PageTransition";

/**
 * The same foot on every page — the address, and one way back up.
 *
 * It carries `id="contact"`, which is what the spine's "contact" link targets:
 * contact is a line at the bottom of the page you are already on, not a route.
 * A separate `/contact` page holding one email address would be a thinner
 * destination than the foot that is already there.
 */
export function Foot({
  contact,
  /** Where "back" goes. The index scrolls to its own top; a record steps up a
   *  zoom level to the drawer, which is where a record came from. */
  back,
}: {
  contact: Drawer["contact"];
  back: { label: string; href: string; route?: boolean };
}) {
  return (
    <footer className="foot" id="contact">
      <p>
        <a href={contact.href}>{contact.value}</a>
        {contact.placeholder ? (
          <>
            {" "}
            <span className="accent-ink">· placeholder</span>
          </>
        ) : null}
      </p>

      {back.route ? (
        <GoLink className="to-top" href={back.href} direction="out">
          <span aria-hidden="true">↑</span> {back.label}
        </GoLink>
      ) : (
        <a className="to-top" href={back.href}>
          <span aria-hidden="true">↑</span> {back.label}
        </a>
      )}
    </footer>
  );
}
