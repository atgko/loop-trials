```
Content: 9/10
- Coverage (3/3): All four required beats are present and clearly separated by section: what a loop is (Section 1, "An agentic loop is what happens when you let that agent repeat: it acts, checks what happened against some goal, and decides whether to act again or stop"), when to use one (Section 2's four-card checklist), the pros (Section 3, "What loops are good at" — catches mistakes, improves unsupervised, handles multi-step work, consistent under repetition), and the cons (Section 4, "Where loops go wrong" — cost, infinite loops, invisible broken checks, harder review).
- Accuracy (2/2): No fabricated statistics, quotes, or named tools/products. The one numeric claim ("A loop that runs eight rounds can cost roughly eight times what a single prompt would") is framed as an illustrative hypothetical, not a cited fact, and is directionally correct (linear cost scaling with iterations).
- Audience fit (2/2): Jargon is defined inline at first use — "agent," "agentic loop," "iteration," and "stopping condition" are each bolded and explained the first time they appear (Section 1, paragraph 1). The hero caption explicitly addresses "anyone who has used an AI chat tool but never built with one."
- Pacing (1/2): Manually counting the running body text (hero copy + all section leads, cards, diagram/step labels, and closing) totals approximately 950 words. At a normal lecture pace of 130–150 wpm, that reads in roughly 6.3–7.3 minutes — noticeably short of the stated 10-minute target, even allowing for a slower ~115 wpm delivery (~8.3 min). Not padded, but under-filled for the runtime.
- Engagement (1/1): Section 5 gives a concrete worked example (a photo-resize script that fails on corrupted files, patched and rerun with a "zero failures or six attempts" stopping rule) — a specific, followable case rather than an abstract description.

Design: 8/10
- Hard gates: all four pass.
  1. Palette — every hex in the file (`grep '#[0-9A-Fa-f]{3,6}'`) is one of `#F5F0E6, #FFFFFF, #EAE1D2, #ECE3D3, #BE0000, #890000, #241E1A, #3A332C, #756B60` — all nine approved values are used and no unapproved value appears (`#A79A89` simply isn't used, which is allowed).
  2. Emoji — regex scan for U+1F300–U+1FAFF and U+2600–U+27BF returned no matches.
  3. Typefaces/sizes — only `Calibri, "Segoe UI", Arial, sans-serif` and `Cambria, Georgia, "Times New Roman", serif` appear; every `font-size` found (`13px, 17px, 19px, 28px, 44px`) is on the approved list.
  4. Contrast — computed via WCAG relative luminance:
     - `--body-ink #3A332C` on `--bg #F5F0E6`: L₁=0.8746, L₂=0.0345 → (0.9246)/(0.0845) = **10.9:1** (pass, normal text).
     - `--crimson #BE0000` kicker on `--bg`: L=0.1092 → (0.9246)/(0.1592) = **5.8:1** (pass, normal text).
     - `--muted #756B60` on `--bg` (used by `.caption`, `.card-body p`, `.takeaway-desc`, `.subtitle` — all normal-weight, none ≥24px/≥19px-bold): L=0.1514 → (0.9246)/(0.2014) = **4.59:1** — passes the 4.5 floor but only barely.
     - White text on `--crimson` (`.diagram-box.is-key h3`, 19px bold, qualifies as large text): (1.05)/(0.1594) = **6.6:1** (pass, exceeds even the 4.5 normal-text bar).
     - White icons/numbers on `--ink #241E1A` circles: (1.05)/(0.0638) = **16.5:1** (pass).
  Since all four gates pass, Design is not capped at 4.

- Polish checks (all hard gates passed): all 7 pass — subtotal: 10/10
  5. Every margin/padding/gap value found by grep (`16, 8, 32, 24, 64, 96, 48px`, etc.) is a multiple of 8; no offenders.
  6. Exactly one `border-radius` (`var(--radius)=12px`) and one `box-shadow` (`var(--shadow)`) recipe are applied consistently to every card-like element (`.diagram-box`, `.diagram-note`, `.card`, `.grid-square`, `.upside-note`, `.example-card`). The `50%` radius is reserved for circular icon badges, a distinct element type, not a violation.
  7. No `gradient` string appears anywhere in the file (grep returned no matches).
  8. No interactive controls (buttons/inputs) exist on the page, so the "no default unstyled control" check is vacuously satisfied.
  9. Every class defined in `<style>` (kicker, caption, hero, diagram-box, card, grid-square, takeaway-bar, etc.) is referenced at least once in the body markup — no dead CSS found.
  10. Exactly one `<h1>` ("Agentic Loops," 44px) exists; all other headings are `<h2>` (28px) or `<h3>` (19px), clearly subordinate.
  11. Crimson-background-fill count: treating the actual content blocks/cards (diagram boxes, notes, cards, grid squares, example card, steps, takeaway items — 27 total) as the denominator, and only whole-block crimson fills as the numerator (`.diagram-box.is-key`, `.grid-square.is-highlight` — the small circular badges and the 6px `.takeaway-bar` accents are icon/accent elements within blocks, not the blocks themselves), the ratio is 2/27 ≈ 1-in-13 — under the 1-in-6–1-in-8 target but nowhere near the one-fifth failure threshold, so this does not fail.

- Rendered visual fidelity: adjustment: −2
  The rendered screenshot shows a serious, un-obvious-from-source defect: the decorative loop-icon watermarks in the hero (top right) and the takeaway section (bottom) render as large, solid **black** amorphous shapes instead of the intended thin-lined icon tinted in `--glyph-tint (#ECE3D3)`. This happens because `.hero-watermark`/`.takeaway-watermark` set `color: var(--glyph-tint)` but never apply `fill: none; stroke: currentColor` (that styling lives only on the `.icon` class, which these `<svg>` elements don't carry) — so the `<path>`/`<polyline>` shapes fall back to the SVG default `fill: black`. Against the reference images (ref-01-hero.jpg, ref-05-takeaway.jpg), which show a soft, pale, thin-outlined circular-arrow watermark barely visible against the cream background, this reads as a jarring, broken graphic in exactly the two "bookend" sections a viewer sees first and last. Everything else — card grids, the flow diagram, icon badges (which do carry `.icon` and render correctly as thin white/dark line icons), section rhythm, and overall whitespace density — matches the references' restrained, editorial feel closely; no overlap, overflow, or awkward line-break issues were observed elsewhere in the full-page screenshot.
- Final Design score: 10 − 2 = 8

Top 3 fixes for next round (ranked, each naming the exact section or CSS rule to change):
1. Fix `.hero-watermark` / `.takeaway-watermark` in the `<style>` block (lines ~90–98 and ~366–374): add `fill: none; stroke: currentColor; stroke-width: 1;` (or simply give the `<svg class="hero-watermark">` / `<svg class="takeaway-watermark">` elements the `.icon` class) so the loop glyph renders as the intended pale outline instead of a solid black blob.
2. Nudge `--muted: #756B60` slightly darker (e.g., toward `#6B6156`) — it's used for `.caption`, `.card-body p`, `.subtitle`, and `.takeaway-desc` against `--bg #F5F0E6` at a measured 4.59:1, only 0.09 above the WCAG 4.5:1 floor for normal text.
3. Add material to close the pacing gap — body copy totals ~950 words (~6.5–7 min at normal pace) against a 10-minute target; expand Section 5's worked example or add a short second example/case to Section 3 or 4.
```
