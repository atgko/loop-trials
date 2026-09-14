```
Content: 10/10
- Coverage (3/3): All four required beats are present as their own sections: "What is an agentic loop?" (defines agent/agentic loop/iteration/stopping condition), "When to use one" (four-criteria checklist), "What loops are good at" (upside section), "Where loops go wrong" (cost/infinite-loop/invisible-broken-check/review-burden).
- Accuracy (2/2): No fabricated tools, quotes, or citations anywhere in the copy. The one numeric claim — "A loop that runs eight rounds can cost roughly eight times what a single prompt would" — is explicitly hedged ("roughly") as an illustrative multiplier, not presented as a sourced statistic.
- Audience fit (2/2): Jargon is defined inline on first use, e.g. "An **agent** is different — it's a program that can take actions on its own, like editing a file, running a command, or browsing a page..." and "Each pass through that cycle is called an **iteration**." Hero explicitly states "No coding background required to follow along."
- Pacing (2/2): Stripped-tag word count (via script, excluding the `<style>`/`<svg>` blocks) = 1353 words. At a spoken-lecture pace of 130-150 wpm that's ~9-10.4 minutes — lands right in the 10-minute target.
- Engagement (1/1): Section 5, "A worked example," walks through a concrete, relatable case (a photo-resize script hitting corrupted files) as a 5-step numbered loop, tied back explicitly to the abstract diagram from Section 1.

Design: 9/10
- Hard gates: all four PASS.
  1. Palette: `grep -n "#[0-9A-Fa-f]{3,6}"` returns only `#F5F0E6, #FFFFFF, #EAE1D2, #ECE3D3, #BE0000, #890000, #241E1A, #3A332C, #756B60` (9 of the 10 approved values used; `#A79A89` simply isn't needed) — no out-of-palette hex found, and `--shadow: 0 4px 14px rgba(58, 51, 44, 0.16)` is the rgb decomposition of `#3A332C`, an approved token.
  2. Emoji: regex search for `[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]` returned no matches.
  3. Type/size: only `Calibri, "Segoe UI", Arial, sans-serif` and `Cambria, Georgia, "Times New Roman", serif` appear as font-family stacks; every `font-size` found is one of `13px, 17px, 19px, 28px, 44px`.
  4. Contrast: computed WCAG ratios for every color pair actually used together — body text `#3A332C` on `#F5F0E6` bg = 10.94:1; headings `#241E1A` on `#F5F0E6` = 14.5:1; `#BE0000` kicker on `#F5F0E6` = 5.80:1; `#890000` on `#F5F0E6`/white = 8.96:1/10.17:1; white on `#241E1A` (step-badge numerals, 19px bold) = 16.46:1; white on `#BE0000` (diagram/grid-square text) = 6.58:1; `#241E1A` on `#EAE1D2` = 12.70:1. The tightest pair, `--muted` (`#756B60`) on the page background `#F5F0E6` (used for `.caption` and `.takeaway-desc`, both normal-size text), computes to (0.8745+0.05)/(0.1514+0.05) = 4.59:1 — clears the 4.5:1 floor, but only barely.
- Polish checks (all hard gates passed) — subtotal: 10/10
  - 8px grid: every margin/padding/gap value found by grep (`16px, 8px, 32px, 64px, 24px, 96px, 48px, 96px 0 64px`, etc.) is a multiple of 8. Pass.
  - Radius/shadow: exactly one `border-radius: var(--radius)` (12px) and one `box-shadow: var(--shadow)` recipe reused on every card-like element (`.diagram-box`, `.diagram-note`, `.card`, `.grid-square`, `.upside-note`, `.example-card`); the only other `border-radius` value is `50%`, reserved for circular icon badges, not cards. Pass.
  - Gradients: `grep -i "gradient"` returned zero matches anywhere in the file. Pass.
  - Unstyled controls: the page has no `<button>`, `<input>`, or other interactive form element at all, so nothing to fail here. Pass (N/A).
  - Dead CSS: manually cross-checked all ~44 classes defined in `<style>` against usage in the body (`kicker`, `is-caution`, `is-key`, `is-crimson-dark`, `is-highlight`, `is-final`, etc.) — every one is referenced at least once. Pass.
  - Single H1 anchor: only one `<h1>Agentic Loops</h1>` exists in the document; every other heading is `h2` (28px) or `h3` (19px), a full size step down. Pass.
  - Crimson ratio: crimson/crimson-dark *background* fills occur on 2 of the ~19 shadowed card/box containers (`.diagram-box.is-key`, `.grid-square.is-highlight`) — about 1-in-9.5 (10.5%). Counting the two smaller crimson-filled badges too (`.badge.is-crimson-dark`, `.step-badge.is-final`) gives 4-in-23 (~17%). Either reading stays under the "exceeds a fifth" failure line, so this passes, if on the sparse edge of the stated 1-in-6–to-1-in-8 band.
- Rendered visual fidelity (screenshot at 1280px vs. the five references) — adjustment: -1
  - The editorial system reads as authentically the same family as the refs: serif h1 + italic serif subtitle + red kicker + red hairline rule + tan looped-arrow watermark in the hero, and the recurring kicker-circle-heading rhythm opening every section — this is not a generic reskin, it visibly shares the references' DNA.
  - One concrete deviation: in ref-02 the connective arrows between flow boxes are rendered in the crimson accent color, giving the diagram a strong directional pull. In this file's rendered diagram (Task → Agent acts → Checks result → Done), the arrows render as a muted taupe/gray, per `.diagram-arrow { flex: 0 0 auto; width: 24px; align-self: center; color: var(--muted); }` (line 198) — a visibly weaker connective thread than the reference's red arrows in the same screenshot position.
  - Because this is a continuous scrolling lecture (six stacked sections, ~1350 words of visible body copy) rather than a one-idea-per-slide deck like the five references, each section reads denser than any single reference frame — expected given the different medium/brief, not a defect, but it does mean the page doesn't reproduce the references' extreme whitespace-to-content ratio when viewed side by side.
  - No overlap, overflow, or misaligned icons were visible anywhere in the full-page screenshot — card padding, circular badge centering, and grid alignment all render cleanly at 1280px.
- Final Design score: 10 - 1 = 9

Top 3 fixes for next round (ranked):
1. In the `.diagram-arrow` rule (style block, ~line 194-199), change `color: var(--muted)` to `color: var(--crimson)` so the flow-diagram connectors match the reference's red-arrow motif instead of fading into the gray/taupe caption color.
2. Nudge the crimson-fill ratio up slightly toward the reference's ~1-in-6 target — e.g. add one more crimson-filled accent (such as making one `.card .badge` in Section 2's "when to use one" list crimson) so the accent doesn't feel confined to only the two "warning/key" callouts, keeping it under the 1-in-5 ceiling.
3. Tighten the `--muted` (`#756B60`) on `--bg` (`#F5F0E6`) pairing used for `.caption` and `.takeaway-desc` — it's the single closest contrast margin in the file at 4.59:1 against a 4.5:1 floor; darkening `--muted` by even a few steps would give real headroom instead of a near-miss.
```
