# Design System: "Executive Beige/Crimson"

Extracted directly from the source PowerPoint (`build2.js`), so every value
here is a real constant that was actually used and screenshotted, not a
guess at what the deck "feels like." This is the primary design reference
for the v2 experiment. Five representative slide exports are included
alongside this file (`ref-01-hero.jpg` through `ref-05-takeaway.jpg`) as
literal visual ground truth — the Critic should compare the HTML against
these images directly, not just against the written rules below.

## 1. Color system

| Name | Hex | Role | Contrast vs. background | Usage rule |
|---|---|---|---|---|
| `--bg` | `#F5F0E6` | Page background | — | The dominant color. Should cover most of the page. |
| `--panel` | `#FFFFFF` | Card background | — | Default surface for content blocks. |
| `--panel-2` | `#EAE1D2` | Secondary panel | — | Emphasis blocks, pull-quotes, highlighted rows. |
| `--glyph-tint` | `#ECE3D3` | Decorative watermark only | — | Large background motifs. Never used for text. |
| `--crimson` | `#BE0000` | Primary accent | 5.8:1 on `--bg` | Headings' eyebrow labels, primary icon badges, links, one hero block per page. Accent only — see the dominance rule in Section 6. |
| `--crimson-dark` | `#890000` | Secondary/caution accent | 8.96:1 on `--bg` | A second, distinguishable accent for "watch out" content (cons, costs, warnings) without leaving the red family. |
| `--ink` | `#241E1A` | Headings, primary text | 14.49:1 on `--bg` | Default heading color. |
| `--body-ink` | `#3A332C` | Body copy | 10.94:1 on `--bg` | Default paragraph color. |
| `--muted` | `#756B60` | Secondary text, captions | 4.59:1 on `--bg` (passes AA) / 4.02:1 on `--panel-2` (fails AA at normal size) | Fine for captions on `--bg` or `--panel`. On `--panel-2`, use `--body-ink` instead for anything under ~19px — see check C2. |
| `--muted-2` | `#A79A89` | Decorative labels only | 2.42:1 on `--bg` (fails AA) | Large, non-essential text only (e.g., a big page number). Never for anything a reader needs to actually read. |

**No other colors.** Nine values, above, full stop — including any color used
in an inline SVG icon's `fill` or `stroke`. `--crimson` and `--crimson-dark`
may be used at reduced opacity for tints (e.g., a light crimson wash behind
a callout), but no other hue may appear anywhere in the shipped page.

## 2. Typography

Two families, matching the deck exactly, both system fonts (zero network
requests):

- **Cambria** (serif) — all headings.
- **Calibri** (sans) — everything else. Fallback stack: `Calibri, "Segoe UI", Arial, sans-serif`. Serif fallback: `Cambria, Georgia, "Times New Roman", serif`.

| Role | Font | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Eyebrow / kicker | Calibri | 13px | 700 | `--crimson` (or `--crimson-dark` for caution sections) | Uppercase, letter-spacing 0.08em. Sits above every major heading. |
| H1 (page title) | Cambria | 44px | 700 | `--ink` | One per page. |
| H2 (section title) | Cambria | 28px | 700 | `--ink` | One per major section. |
| H3 (card / subsection title) | Cambria | 19px | 700 | `--ink` | |
| Body | Calibri | 17px | 400 | `--body-ink` | Line height 1.6. Line length capped around 70–75 characters. |
| Caption / small print | Calibri | 13px | 400 | `--muted` | Never `--muted-2`. |

No third typeface, no italicized display font, no script/handwriting font.
Exactly the sizes above — no off-scale one-off font sizes anywhere in the
CSS.

## 3. Spacing and shape

- **Base unit: 8px.** Every margin, padding, and gap value must be a
  multiple of 8 (8, 16, 24, 32, 48, 64, 96...).
- **Card radius: 12px**, consistently, on every card-like element.
- **Shadow recipe (one, reused everywhere):**
  `box-shadow: 0 4px 14px rgba(58, 51, 44, 0.16);` — a warm charcoal
  shadow, never pure black, never colored crimson.
- **Section rhythm:** at least 64px of vertical space between major
  sections. Cards get 24–32px of internal padding.

## 4. Icons and imagery

- **No photography of any kind.** The deck's identity is entirely
  typographic and geometric. Keep it that way.
- **No emoji, no Unicode pictograph characters, ever** — not `\u2708`, not
  `\u2713`, not `\u2699`, none of them. This is not a style preference, it's
  a bug that already happened: the source deck's Boeing 747 slide used a
  plane emoji for its icon grid, and it rendered as a full-color emoji
  (blue and white) that broke the palette rule above, because emoji
  rendering is controlled by the operating system's font, not by the page's
  CSS. **All icons must be hand-built inline SVG**, stroked or filled only
  with colors from Section 1, so they can never introduce an off-palette
  color.
- **Icon badge pattern:** a filled circle (44–56px), color `--crimson`,
  `--crimson-dark`, or `--ink` depending on context, with a simple
  single-color SVG glyph centered inside in white. Used for checklist
  items, numbered steps, and callouts. (See `ref-04-card-list.jpg`.)
- **Icon grid motif:** a grid of small square cards, one highlighted in
  `--crimson` with a white icon while the rest stay `--panel` with `--ink`
  icons. Use this only when the content is literally enumerable (e.g., "4
  pros," "5 steps") — it's a content pattern, not decoration. (See
  `ref-03-icon-grid.jpg`.)
- **Background watermark motif:** one large, very low-contrast icon (using
  `--glyph-tint`) tucked in a corner of a hero or closing section, purely
  decorative. (See `ref-01-hero.jpg` and `ref-05-takeaway.jpg`.)
- **Left-accent-bar list:** a 4–6px `--crimson` vertical bar beside a bolded
  line and a muted description line below it. Used for "key takeaways"
  style lists. (See `ref-05-takeaway.jpg`.)

## 5. Layout patterns

- **Kicker + title header**, every section: small crimson eyebrow label,
  then a bold serif heading directly below it. This is the single biggest
  driver of the "editorial/executive" feel — use it consistently, not just
  on the first section.
- **Card-based body**, not walls of text on bare background. Group related
  content into a `--panel` or `--panel-2` card with real padding.
- **Flow diagrams** for anything sequential: boxes connected by simple
  arrows, one box highlighted in `--crimson` if it's the key step. (See
  `ref-02-flow-diagram.jpg`.)
- **Numbered circle badges** for ordered steps.

## 6. The "no AI-slop" checklist

Concrete, checkable bans — not vibes:

1. **Palette conformance.** Every color value in the final CSS/SVG (grep
   for every `#` hex and every named color) must resolve to one of the nine
   values in Section 1. Anything else fails this check immediately.
2. **No emoji/pictograph characters anywhere** in the shipped HTML — scan
   for characters in the emoji Unicode blocks (U+1F300–U+1FAFF,
   U+2600–U+27BF, U+2190–U+21FF arrows are fine since they're not
   emoji-rendered, but treat anything that a browser could render as a
   colored pictograph as banned).
3. **Two typefaces, maximum**, and only the sizes listed in Section 2 — no
   one-off font sizes.
4. **8px spacing grid, no exceptions** — flag any margin/padding/gap that
   isn't a multiple of 8.
5. **One shadow recipe, one border radius**, used consistently — no mixing
   sharp corners and rounded corners, no mixing shadow styles.
6. **No gradients** except a tint/shade of a single approved color (e.g., a
   lighter wash of `--crimson`) — no multi-hue or unrelated-hue gradients.
7. **No unstyled default browser elements** — if there are buttons, tabs,
   or inputs, they're intentionally styled to match this system, not left
   as browser defaults.
8. **No dead code** — no CSS class defined and never used (this exact bug
   was caught and fixed in Round 2 of the v1 run; don't reintroduce it).
9. **Exactly one H1-equivalent visual anchor** per page — no two headings
   competing at the same visual weight for the reader's attention.
10. **Crimson dominance ratio.** Count every element with a `--crimson` or
    `--crimson-dark` *background fill* against the total number of
    content blocks on the page. Crimson-filled blocks should be roughly
    1-in-6 to 1-in-8 — an accent, not a dominant field. If more than about a
    fifth of the blocks on the page are crimson-filled, that's a fail: the
    page is now "a red page with some beige," not "a beige page with a red
    accent."
11. **Contrast, computed, not eyeballed.** For every text/background pairing
    actually used on the page, compute the real WCAG contrast ratio (the
    table in Section 1 has the values already computed for the standard
    pairs). Flag anything under 4.5:1 for normal text or 3:1 for large text
    (≥24px, or ≥19px bold).

## 7. Suggested external references (optional, secondary)

The deck itself (Section 0 images) is the primary reference. If you also
want a real website to triangulate against, here are a few well-known ones
that share pieces of this aesthetic — none is a perfect match, so take the
specific thing noted, not the whole site:

- **The Economist (economist.com)** — the closest existing match to "red +
  cream + serif + confident and editorial." Take: the way a single red
  accent reads as authoritative against a warm neutral field. Don't take:
  their dense, newspaper-style multi-column layout — too cramped for a
  10-minute lecture page.
- **McKinsey Insights articles (mckinsey.com/featured-insights)** —
  restrained color, generous whitespace, serif headlines over sans body,
  "executive research report" pacing. Take: the whitespace and the
  heading rhythm. Don't take: their near-total absence of color, which
  would leave no room for the crimson accent.
- **Notion's marketing site (notion.com)** — warm off-white background,
  black text, sparing color accents, icon-driven feature grids. Take: how
  their icon grids stay simple and single-colored per icon rather than
  busy or multi-colored. Don't take: their playful, rounded illustration
  style — too casual for "executive."

If one of these actually resonates, say which, and I can pull a couple of
screenshots from it the same way I did for the deck, so the Critic has a
second literal image to check against instead of just a written note.
