# Run Summary — v2

**Final scores:** Content 10/10, Design 9/10 (Round 8)

**Round count:** 8 rounds run (the hard cap — see Section 2/10 of `PRD-v2.md`)

**Stop reason:** `round_cap` — the loop never produced a genuine 10/10 on both axes in
the same round. Design plateaued at 9/10 for seven consecutive rounds (2 through 8);
Content reached 10/10 in six of the eight rounds but was held to 9/10 in Round 5.
Round 8 completed with the best scores the run ever reached (10/9), so the loop
stopped at the cap per Section 2's stop condition, not on a perfect score.

## Score history

| Round | Content | Design |
|-------|---------|--------|
| 1     | 9/10    | 8/10   |
| 2     | 10/10   | 9/10   |
| 3     | 10/10   | 9/10   |
| 4     | 10/10   | 9/10   |
| 5     | 9/10    | 9/10   |
| 6     | 10/10   | 9/10   |
| 7     | 10/10   | 9/10   |
| 8     | 10/10   | 9/10   |

## What each round fixed

- **Round 1:** First draft, built from scratch against `design-system.md` and the
  five `design-ref/*.jpg` references. Design was capped at 8/10 because the hero and
  takeaway watermark SVGs were missing `fill: none; stroke: currentColor`, so the
  intended pale outline glyph rendered as a solid black blob in the actual screenshot
  — a defect invisible from the source CSS alone, only caught by Section 4's rendered
  check.
- **Round 2:** Fixed the watermark rendering bug and expanded the prose by roughly
  450 words to close the pacing gap (Round 1 read in ~7 minutes; the target is ~10).
  Content hit a perfect 10. The rendered check now flagged a new, previously
  invisible issue: the two-column card-list layout in sections 2 and 4 read denser
  than reference `ref-04`'s spacious single column.
- **Round 3:** Switched those card lists from a cramped 2-column grid to a single
  stacked column with larger badges and more generous padding, matching `ref-04`.
  The rendered check then caught Section 1's two back-to-back multi-line paragraphs
  reading as noticeably denser and more textbook-like than anything in the reference
  images.
- **Round 4:** Restructured Section 1 to remove the stacked-paragraph density, and
  folded a dense sub-block into the existing callout. The rendered check then found
  the flow diagram's connector arrows rendering muted gray instead of the reference's
  crimson, weakening the diagram's directional read.
- **Round 5:** Recolored the diagram connector arrows to crimson, matching `ref-02`.
  Content dropped to 9/10 this round — not because the page regressed, but because
  this round's isolated Critic (cold, with no memory of prior rounds' higher scores)
  independently judged the "~10 minutes" pacing claim as an inferred word-count
  estimate rather than a measured one, and docked the pacing criterion a point on
  that basis. The rendered check's remaining deduction was a structural one (a
  continuous scrolling lecture inherently reads denser than a one-idea-per-slide
  deck), not a specific bug.
- **Round 6:** Split Section 1's two-paragraph note into two separate side-by-side
  cards to further reduce density. Content recovered to 10/10. The rendered check
  found a new symptom of a recurring tension (see below): the card-list badges in
  sections 2 and 4 render mostly `--ink` (near-black) with crimson reserved for only
  one "key" badge per section, reading more monochrome than `ref-04`'s consistently
  crimson badges.
- **Round 7:** Added a 2px crimson *border* ring to the default card badge (a stroke,
  not a background fill, to stay inside the crimson-dominance ratio rule). The
  rendered check then flagged that every section-head marker icon reused the same
  `#icon-loop` glyph regardless of topic, and that both watermarks rendered too
  faint (thin 1px stroke) against the reference's bolder treatment.
- **Round 8 (final, hard cap):** Varied the five section-head marker icons per topic,
  thickened and enlarged both watermarks, and added one crimson-dark caution marker.
  All three of Round 7's fixes verified as resolved. The rendered check found one
  more instance of the same recurring tension: the default `.marker` circle still
  fills `--ink`, not crimson, while every reference slide (`ref-02`, `ref-03`,
  `ref-04`) fills its icon-marker circle crimson by default.

## The part worth reading

Design scored 9/10 in seven straight rounds (2 through 8) without ever closing the
last point, and it wasn't the same bug recurring — it was four *different* concrete
defects across those rounds (dense card lists, dense prose, gray arrows, monochrome
badges, repeated icons, a faint watermark, and finally the default marker color).
Read individually, each fix was real and each round's evidence was genuine: quoted
code, computed contrast ratios, or a specific screenshot observation, never an
assertion. That's the mechanism working as designed.

But look at rounds 2, 6, and 8 together and a single thread runs through all three:
the reference images (`ref-02`, `ref-03`, `ref-04`) fill every icon badge and marker
circle solid crimson, while `design-system.md`'s own Section 6, item 10 caps crimson
*background fills* at roughly one in six to one in eight content blocks to avoid "a
red page with some beige." Those two constraints are in real tension — the reference
kit's badge language is more crimson than the ratio rule allows — and every round's
fix treated it as a fresh, isolated defect (a card list, then a set of badges, then a
default marker) rather than naming the actual conflict once and resolving it at the
rule level. Because each Critic invocation is deliberately isolated and cold (per the
PRD's Section 5.2/10 guardrail), no single round was in a position to notice the
pattern across rounds — only reading all eight reports side by side, as this summary
does, surfaces it. The loop hit its 8-round cap before anyone — Builder or Critic —
named that tension explicitly, which is the honest reason Design never reached 10/10,
not any single remaining bug.

Full detail per round, including each Critic's actual reasoning and rendered
observations, is in `rounds/round-N/critic-report.md`.

## Honesty check

Every score of 9 or 10 in every round's `critic-report.md` is backed by quoted
HTML/CSS, a computed WCAG contrast or spacing value, or a specific, named
observation from the actual rendered screenshot — no score was asserted without
pointing at the thing that earned it. Content's dip to 9/10 in Round 5 is a real
artifact of critic-to-critic variance under intentional isolation (Section 10's
guardrail), not a page regression — the page's word count and structure were
materially unchanged from Round 4. Design's flat 9/10 from Round 2 onward reflects a
genuine, unresolved design-system tension (see above), not seven repeats of the same
unfixed bug.

## Artifacts

- `rounds/round-1/` through `rounds/round-8/`: each has `lecture.html`,
  `critic-report.md`, and `builder-notes.md`.
- `final.html`: the full round-by-round tabbed view (Rounds 1–8 plus a Highlights
  tab), each round rendered in a sandboxed iframe with its score strip.
- `showcase.html`: Round 8's `lecture.html`, finalized as a standalone deliverable —
  independently re-verified against every `design-system.md` check.
