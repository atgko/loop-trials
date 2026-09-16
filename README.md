# Loops Explaining Loops

An agentic loop graded its own work and gave itself a false 10/10. A second run with
mechanical checks and an isolated critic still plateaued at 9/10 — here's why.

**[Compare both runs side by side →](https://compare-loop-trials.vercel.app)**

Two runs of the same experiment. This is **v1**: a subjective 0–10 Design score,
graded by the same session that just wrote the draft, converged to a perfect 10/10
in round 4 — without the actual visual design ever meaningfully changing. Every
score was backed by real evidence (quoted CSS, measured contrast ratios), so nothing
was rubber-stamped; the rubric itself just never asked the question that mattered.

**[v2](./v2/README.md)** was built to close that gap: the Design score is now
mechanical (a fixed checklist and formula, not an impression), the Critic runs as a
fully isolated subagent that never sees the Builder's reasoning or prior scores, and
every round gets real browser rendering compared against five reference images from
an actual slide deck. The result: v2 ran the full 8-round cap and **never** hit a
simultaneous 10/10 — it plateaued at Content 10/10, Design 9/10 for seven straight
rounds. Reading all eight critic reports together (something no single round's
isolated critic could do) surfaces why: the reference images fill every icon badge
solid crimson, while the design system's own crimson-dominance rule caps how much of
the page can be crimson-filled. Every round fixed a genuinely new, real defect —
gray connector arrows, dense card layouts, faint watermarks, monochrome badges — but
each fix was actually a fresh symptom of that one unresolved rule conflict, and
no round was positioned to name it. See [v2's README](./v2/README.md) and
[v2's run-summary.md](./v2/run-summary.md) for the full round-by-round breakdown.

| Run | Rounds | Content | Design | Stop reason |
|-----|--------|---------|--------|-------------|
| v1  | 4 / 8  | 10/10   | 10/10  | `perfect_score` |
| v2  | 8 / 8  | 10/10   | 9/10 (best) | `round_cap` |

---

A class assignment wrapped in an experiment: build a 10-minute lecture page on **agentic loops**
(what they are, when to use them, their pros and cons) for an undergraduate class — by running an
agentic loop to build it, with no human in the loop between rounds, and a subjective stop condition
("does this feel good enough," expressed as a strict rubric) instead of an objective one like
passing tests.

One AI played two roles each round: **Builder**, who wrote or revised the page, and **Critic**, who
scored the current draft on Content and Design (each out of 10) against a written rubric and named
specific problems. The next round had to fix exactly those problems. The loop would stop as soon as
both scores hit a genuine 10/10 in the same round, or after 8 rounds — whichever came first.

## Result

The loop ran **4 of the allowed 8 rounds**, reaching a verified **Content 10/10, Design 10/10** in
Round 4 (stop reason: `perfect_score`).

| Round | Content | Design |
|-------|---------|--------|
| 1     | 8/10    | 7/10   |
| 2     | 9/10    | 8/10   |
| 3     | 10/10   | 9/10   |
| 4     | 10/10   | 10/10  |

Every score of 9 or 10 along the way is backed by quoted HTML/CSS evidence or a computed value
(word counts, WCAG contrast ratios) in that round's `critic-report.md` — a guardrail against the
same AI grading its own homework too kindly.

## What's in here

```
final.html                  <- start here: tabbed viewer (Round 1-4 + Highlights)
rounds/
  round-1/ ... round-4/
    lecture.html             <- that round's full, standalone lecture page
    critic-report.md         <- scores, rationale, and evidence for this round
    builder-notes.md         <- what changed this round and why
run-summary.md               <- final scores, round count, stop reason
```

Open `final.html` in any modern browser — it's fully self-contained, works offline, and makes no
network calls. Each round tab renders that round's lecture page in a sandboxed iframe alongside its
scores; the Highlights tab is written for students and walks through what changed and why, with the
real scores attached to each change.

Each `rounds/round-N/lecture.html` also opens standalone on its own.

## Why this exists

See `run-summary.md` for the full round-by-round breakdown of what the Critic caught each time
(a too-short "when to use it" section, an overstated research attribution, a live reading-time
readout that contradicted the page's own "10-minute" claim, inconsistent component styling, and
finally a measured color-contrast accessibility failure) and how the Builder responded.
