# Loops Explaining Loops — v2

The second run of the same experiment. [v1](../README.md) asked an agentic loop to
build and grade its own 10-minute lecture page on agentic loops, and found that a
rigorous, evidence-backed Design score could still converge to a perfect 10 without
the actual visual design ever changing — the rubric never asked the question that
mattered. v2 exists to close that gap.

## What changed from v1

- **Design scoring is mechanical**, derived from [`design-system.md`](./design-system.md)'s
  checklist via a fixed formula, not a subjective 0–10 impression.
- **The Critic runs as an isolated subagent** ([`.claude/agents/loop-critic.md`](./.claude/agents/loop-critic.md)),
  not a role played by the same session that just wrote the draft. It never sees the
  Builder's reasoning, prior scores, or how many rounds have happened.
- **Real rendering, every round.** The Critic has live browser access (Playwright
  MCP): it navigates to the actual `lecture.html`, screenshots it, and compares that
  screenshot directly against five reference images extracted from a real slide deck
  ([`design-ref/*.jpg`](./design-ref)) — not just against written rules.
- **Two deliverables**, not one: a clean standalone page meant to actually be shared
  ([`showcase.html`](./showcase.html)), and the full round-by-round process view
  ([`final.html`](./final.html)).

Full spec: [`PRD-v2.md`](./PRD-v2.md).

## Result

The loop ran the full **8 of 8 allowed rounds** and never produced a genuine 10/10 on
both axes in the same round (stop reason: `round_cap`). The best it reached —
**Content 10/10, Design 9/10** — showed up in six of the eight rounds, most recently
Round 8.

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

Every score of 9 or 10 is backed by quoted HTML/CSS, a computed WCAG contrast or
spacing value, or a specific observation from the actual rendered screenshot — see
each round's `critic-report.md`.

## The part worth reading

Design scored 9/10 for seven rounds straight, but not because the same bug kept
recurring — each round's rendered check caught a genuinely new, specific problem.
Read across rounds 2, 6, 7, and 8, though, and four "different" findings turn out to
be the same unresolved tension wearing different clothes: the reference images fill
every icon badge solid crimson, while `design-system.md`'s own crimson-dominance rule
caps how much of the page can be crimson-filled. Because the Critic is deliberately
isolated and cold every round, no single round was positioned to notice the pattern
— it only shows up when you read all eight reports side by side, which is what
[`run-summary.md`](./run-summary.md) does explicitly. That's the honest reason
Design never reached 10/10: not a bug the loop failed to fix, but a real conflict
between two rules it was never asked to reconcile.

## What's in here

```
PRD-v2.md                     the spec this run executed
design-system.md              color/type/spacing/icon spec + the mechanical checklist
design-ref/                   five reference images extracted from the source deck
.claude/agents/loop-critic.md the isolated Critic subagent definition
rounds/
  round-1/ ... round-8/
    lecture.html               that round's full, standalone lecture page
    critic-report.md           scores, rationale, computed evidence, screenshot notes
    builder-notes.md           what changed this round and why
run-summary.md                 final scores, round count, stop reason, honesty check
showcase.html                  start here to just read the lecture — the finished page
final.html                     the full round-by-round tabbed process view
```

`showcase.html` and `final.html` are both fully self-contained, work offline, and
make no network calls. `showcase.html` independently passes every
`design-system.md` check on its own — it doesn't inherit a pass just because Round 8
scored well.
