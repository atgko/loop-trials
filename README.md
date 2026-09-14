# Loops Explaining Loops

Two runs of the same experiment. This is **v1**. **[v2](./v2/README.md)** anchors
the Design score to real reference images and a mechanical checklist instead of a
subjective impression, runs the Critic as a fully isolated subagent, and adds real
browser rendering every round — see [v2's README](./v2/README.md) for what that
changed and what it found.

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
