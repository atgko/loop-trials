```
Content: 10/10
- Coverage (3/3): All four required beats each get a full H2 section — "What is an agentic loop?" (line 525), "When to use one" (573), "What loops are good at" (631), "Where loops go wrong" (674).
- Accuracy (2/2): No fabricated stats/tools/quotes; the one numeric claim is explicitly hedged ("can cost roughly eight times what a single prompt would," line 687), not presented as measured data.
- Audience fit (2/2): Key jargon is bolded and defined inline on first use — "An **agent** is different — it's a program that can take actions on its own..." and "**agentic loop**... **iteration**" (line 529), "**stopping condition**" (line 531).
- Pacing (2/2): Measured body word count (script-stripped HTML tags/SVG defs) = 1,328 words. At a 130–150 wpm spoken lecture pace, that's ≈8.9–10.2 minutes — squarely in the 10-minute target, neither padded nor rushed.
- Engagement (1/1): The "worked example" section (lines 725–767) walks a concrete case — a photo-resize script that gets patched across retries — through 5 numbered steps.

Design: 9/10
- Hard gates:
  1. Palette — PASS. Grep for `#[0-9A-Fa-f]{3,6}` returned only `#F5F0E6, #FFFFFF, #EAE1D2, #ECE3D3, #BE0000, #890000, #241E1A, #3A332C, #756B60` (lines 9–17) plus repeats of `#FFFFFF` (146, 192, 253, 299, 357) — all 9 on-list, none extra.
  2. No emoji — PASS. Regex `[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]` found no matches in the file.
  3. Typefaces/sizes — PASS. Only `Calibri, "Segoe UI", Arial, sans-serif` (body, line 33) and `Cambria, Georgia, "Times New Roman", serif` (headings, 39/113/361). Font-sizes used: only 13, 17, 19, 28, 44px (full grep list checked, no outliers).
  4. Contrast — PASS. Computed via WCAG relative-luminance formula: body-ink `#3A332C` on bg `#F5F0E6` = 10.93:1; ink `#241E1A` on bg = 14.49:1; **muted `#756B60` on bg = 4.59:1** (tightest pairing, e.g. `.subtitle`/`.caption`/`.takeaway-desc`, still clears the 4.5:1 floor); muted on white panel = 5.21:1; crimson `#BE0000` on bg = 5.80:1; crimson-dark `#890000` on bg = 8.95:1; white on crimson = 6.59:1; white on ink = 16.46:1; ink on panel-2 `#EAE1D2` = 12.70:1; crimson note-label on panel-2 = 5.08:1. All pairs clear their required threshold.

- Polish checks (all hard gates passed):
  5. 8px grid — PASS (every margin/padding/gap value found via grep is one of 8/16/24/32/48/64/96).
  6. One radius + one shadow on card-like elements — PASS. `var(--radius)`=12px and `var(--shadow)`=`0 4px 14px rgba(58,51,44,0.16)` are used identically on `.diagram-box`, `.diagram-note`, `.card`, `.grid-square`, `.upside-note`, `.example-card`. The only other radius (`50%`) appears solely on circular icon badges (`.marker`, `.badge`, `.step-badge`), a distinct non-card element type.
  7. No off-palette gradients — PASS (grep for "gradient" found zero matches).
  8. No unstyled native controls — PASS, vacuously (no `<button>/<input>/<select>/<textarea>` exist in the file).
  9. No dead CSS — PASS. Every class defined in `<style>` (including `is-caution`, `is-key`, `is-highlight`, `is-crimson-dark`, `is-final`) has a matching `class="..."` usage in the body.
  10. One H1-equivalent — PASS. Exactly one `<h1>` (44px, "Agentic Loops"); all others are h2 (28px) or h3 (19px).
  11. Crimson-fill ratio — PASS (borderline). Crimson/crimson-dark used as a `background-color` fill on `.diagram-box.is-key` and `.grid-square.is-highlight` = 2 of ~20 card-like blocks (4 diagram-box + 2 diagram-note + 8 card + 4 grid-square + 1 upside-note + 1 example-card) ≈ 10% — under the 1-in-6–1-in-8 target but well clear of the "exceeds a fifth" failure line.
  — subtotal: 10/10

- Rendered visual fidelity: Structural correspondence to the reference kit is strong — the section-1 flow diagram (Task → Agent acts → Checks result [crimson] → Done) mirrors ref-02's You→Prompt→AI Agent[crimson]→Result almost exactly; the card lists (sections 2/4) match ref-04's circular-badge + bold-serif-title + gray-description rhythm; the takeaway list matches ref-05's red-bar + title + description pattern; the hero (kicker → huge serif H1 → italic subtitle → crimson rule → caption) matches ref-01's composition. Two concrete deviations, visible in the rendered screenshot: (a) all five `.marker` section-head circles (lines 521, 569, 627, 670, 729) reuse the identical `#icon-loop` glyph regardless of topic, even though the shared `<defs>` (lines 452–496) already defines distinct check/target/coins/eye/layers/gauge/warning icons used elsewhere — every section opener looks the same instead of visually distinct. (b) the hero/takeaway watermark (1px stroke, 360px/320px box) renders as a faint, thin tan outline, noticeably less bold/graphic than ref-01 and ref-05's chunkier watermark treatment. No broken layout was found — no overlap, overflow, or misaligned icons at any point down the full-page screenshot.
- adjustment: -1 (repeated marker icon + underweight watermark; nothing actually broken, so not -2)

Final Design score: 10 - 1 = 9

Top 3 fixes for next round (ranked):
1. Vary the `.marker` icon per section — swap the repeated `<use href="#icon-loop"/>` on lines 521, 569, 627, 670, 729 for topic-relevant icons already defined in the `<defs>` block (e.g., `#icon-target` for "When to use one," `#icon-check`/`#icon-eye` for "Upside," `#icon-warning` for "Downside") so each section reads as visually distinct.
2. Strengthen `.hero-watermark`/`.takeaway-watermark` (lines 90–103, 378–391) — raise `stroke-width` above 1 and/or enlarge the box so the watermark reads as a bold background motif like ref-01/ref-05 instead of the faint outline currently visible in the screenshot.
3. (Minor) Nudge the crimson-fill ratio from ~10% closer to the 1-in-6–1-in-8 target — e.g., give one additional card-like block a solid crimson fill (such as one badge in the "When to use one" list) — without pushing past the 20% ceiling.
```
