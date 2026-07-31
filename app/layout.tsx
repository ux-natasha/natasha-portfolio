import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { getSite } from "@/lib/content";
import "./globals.css";

/**
 * The type system is locked (CLAUDE.md §5): System B's structure rendered with
 * System C's display face. Fraunces displays, JetBrains Mono labels and data,
 * Inter carries prose.
 *
 * Fraunces is loaded with its OPTICAL SIZE axis, which is the reason it is
 * here rather than any other serif — the name sets at 104px with fine, open
 * serifs and a chapter lede at 21px with sturdier ones, from one file. `axes`
 * and a `weight` list are mutually exclusive in next/font, so the weights give
 * way to the axis that does the work.
 *
 * All three are self-hosted by next/font at build time: no request to
 * fonts.googleapis.com at runtime, no render-blocking stylesheet, and a
 * size-adjusted fallback that holds the layout still while they load.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const DESCRIPTION =
  "Three years on a critical-chain project management system, in four chapters, in the order they were built.";

export const metadata: Metadata = {
  /* Records and shelves set their own titles; `default` covers the index and
     anything that doesn't (the empty slot). */
  title: {
    default: "Natasha M. — Designer, Vector Digital Labs",
    template: "%s",
  },
  description: DESCRIPTION,
  authors: [{ name: "Natasha M." }],
  openGraph: {
    type: "profile",
    title: "Natasha M. — Designer, Vector Digital Labs",
    description: DESCRIPTION,
  },
};

/**
 * `themeColor` matches the paper — one value per scheme, so mobile browser
 * chrome continues the page instead of framing it in either theme.
 * `viewportFit` keeps the rail clear of the notch on a landscape iPhone.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E7E5DB" },
    { media: "(prefers-color-scheme: dark)", color: "#18191B" },
  ],
  colorScheme: "light dark",
  viewportFit: "cover",
};

/**
 * Runs before hydration so a stored theme applies before first paint — the
 * alternative is a light flash on every reload for anyone who picked dark.
 * With nothing stored, the page falls through to the `prefers-color-scheme`
 * CSS and needs no JS at all. Kept as a plain string, not a template, so
 * nothing here can ever carry interpolated data into the page.
 */
const THEME_INIT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /**
   * The one place this site assumes its reader might open devtools rather
   * than just scroll — a fair bet for the audience (§0: hiring managers and
   * design leads, the people who check how a thing is actually built). Reads
   * the address from the same markdown the foot's contact link uses, so it's
   * one fact kept in one place rather than a second copy baked into code.
   * `JSON.stringify` turns each line into a safe JS string literal rather
   * than interpolating it into the template directly, the same caution
   * `THEME_INIT` above already takes with untrusted-looking strings.
   */
  const { drawer } = getSite();
  const CONSOLE_INIT = `console.log(${JSON.stringify(
    "Curious enough to open devtools on someone's portfolio — that's basically the job.",
  )});console.log(${JSON.stringify(`${drawer.contact.value}, if you want to talk about it.`)});`;

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrainsMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: CONSOLE_INIT }} />
      </head>
      <body>
        {/* `#content` is the one target that exists on every route — the index,
            a record, a shelf, the empty slot. `#work` only ever existed on the
            index, and a skip link that lands nowhere on four pages out of six
            is worse than none. */}
        <a className="skip" href="#content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
