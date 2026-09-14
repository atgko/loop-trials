```
Content: 10/10
- Coverage (3/3): All four required beats are present as their own headed sections: "What is an agentic loop?" (definition, stopping condition, mechanical check), "When to use one" (4-card checklist), "What loops are good at" (upside), "Where loops go wrong" (downside/cons).
- Accuracy (2/2): No fabricated statistics, quotes, or tool names. Claims are generic and defensible (e.g. "a loop that runs eight rounds can cost roughly eight times what a single prompt would" is a stated approximation, not a cited stat).
- Audience fit (2/2): Jargon defined inline on first use — e.g. line 521: "An **agent** is different — it's a program that can take actions on its own... An **agentic loop** is what happens when you let that agent repeat... Each pass through that cycle is called an **iteration**." The hero caption explicitly targets the audience: "For anyone who has used an AI chat tool but never built with one. No coding background required."
- Pacing (2/2): Full-page prose totals roughly 1,450–1,500 words across 6 sections; at a normal spoken pace (~140 wpm) that's ~10–11 minutes. Sections are evenly sized (3 lead paragraphs in section 1, ~4 short cards in sections 2 and 4), no section is padded with filler or rushed to a single line.
- Engagement (1/1): Section 5 is a fully worked concrete example (photo-resize script that fails on corrupted files, patched and re-run) that explicitly maps back to the abstract loop diagram from section 1 ("'Checks result' from that diagram is step 2 here").

Design: 9/10
- Hard gates: all pass.
  - Palette: every hex found via grep is one of the nine approved values (`#F5F0E6`, `#FFFFFF`, `#EAE1D2`, `#ECE3D3`, `#BE0000`, `#890000`, `#241E1A`, `#3A332C`, `#756B60`) — confirmed by grepping every `#[0-9A-Fa-f]{3,6}` in the file (lines 9–17 root variables, plus `#FFFFFF` reused at lines 146, 192, 246, 292, 350).
  - Emoji: `grep` for emoji/pictograph Unicode ranges (U+1F300–1FAFF, U+2600–27BF) returned no matches.
  - Typefaces/sizes: only `Calibri, "Segoe UI", Arial, sans-serif` (body) and `Cambria, Georgia, "Times New Roman", serif` (headings) appear. `font-size` grep returned only 13px, 17px, 19px, 28px, 44px — all on the approved list.
  - Contrast (computed via WCAG relative luminance): body text `--body-ink #3A332C` (L=0.0345) on `--bg #F5F0E6` (L=0.8744) → ratio 10.94:1. Headings `--ink #241E1A` (L=0.0138) on `--bg` → 14.49:1. White text on `--crimson #BE0000` (L=0.1095) for `.diagram-box.is-key h3` (19px bold, large-text threshold 3:1) → 6.59:1. Closest pair: `--muted #756B60` (L=0.1514) on `--bg` (used for `.caption` and `.hero .subtitle`, both normal-size text needing 4.5:1) → (0.8744+0.05)/(0.1514+0.05) = 4.59:1 — passes, but narrowly.
- Polish checks (all 7 passed) — subtotal: 10/10.
  - Every margin/padding/gap grepped (`8,16,24,32,48,64,96px`, plus `0`) is a multiple of 8px.
  - Exactly one `border-radius: var(--radius)` (12px) and one `box-shadow: var(--shadow)` recipe is used on every card-like element (`.diagram-box`, `.diagram-note`, `.card`, `.grid-square`, `.upside-note`, `.example-card`); the only other radius value is `50%` on circular icon badges/markers, a distinct element type, not a card.
  - No gradients anywhere (`grep gradient` → no matches).
  - No interactive controls exist (no `<button>`/`<input>`), so no unstyled-default-control issue applies.
  - No dead CSS classes found — every class defined in `<style>` is referenced somewhere in the body markup.
  - Exactly one `<h1>` in the document (hero only); all six section titles use `<h2>`, one visual weight below it.
  - Crimson/crimson-dark background fills: `.diagram-box.is-key`, `.grid-square.is-highlight`, `.step-badge.is-final`, and one `.badge.is-crimson-dark` = 4 fills against ~27 distinct card/block elements across the page (diagram boxes+note, cards, grid-squares+note, example-card+steps, takeaway items) ≈ 1-in-6.75 — inside the required 1-in-6 to 1-in-8 band.
- Rendered visual fidelity: adjustment: -1.
  - Rendered the file at 1280×900 (via a data-URL load, since `file:` navigation was sandboxed) and compared full-page screenshot against the five references. The kicker+heading rhythm, watermark loop glyph placement, red top-rule under the hero subtitle, the four-box crimson-accented flow diagram, and the takeaway section's red vertical bars all closely match refs 01, 02, and 05 — no overlap, overflow, or misaligned icons anywhere in the screenshot.
  - Two real deviations from the reference system: (1) ref-04's card list is a single full-width stacked column with generous internal breathing room; this file's `.list` cards (sections 2 and 4) are packed into a 2-column grid, producing visibly tighter line-wrapping and a denser block of 4 cards where the reference shows 3 spacious ones. (2) In the references every card badge circle is filled crimson; here badges default to `--ink` (near-black) and crimson is reserved for only one "key" element per section — a deliberate, rubric-compliant restraint (needed to satisfy the 1-in-6–8 ratio check above) but it reads as a slightly less bold, more generic accent system than the references' consistently red badges.

Top 3 fixes for next round:
1. In `.list .card` (lines 230–238), switch section 2/4's card grid from `grid-template-columns: repeat(2, 1fr)` to a single-column stacked layout matching ref-04, giving each card the wider, airier proportions the reference uses.
2. Nudge `--muted` slightly darker (e.g. toward `#6B6154`) or restrict it to backgrounds where it clears contrast with more margin — `.caption`/`.hero .subtitle` currently sit at 4.59:1 against `--bg`, only 0.09 above the WCAG floor.
3. Consider making 1–2 more of the default `.badge`/`.grid-square` icon circles crimson (while staying inside the 1-in-6–8 ratio) to bring the badge treatment closer to the references' more assertive red-accent feel without breaking the ratio rule.
```
