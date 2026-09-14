# PRD v2: Agentic-Loop Lecture Page ("Loops Explaining Loops")

## Changelog from v1

- Design scoring is now **mechanical**, derived from `design-system.md`'s
  checklist via a fixed formula, not a subjective 0-10 impression.
- The Critic now runs as an **isolated Claude Code subagent**
  (`.claude/agents/loop-critic.md`), not a role played by the same session
  that just wrote the draft. It never sees the Builder's reasoning, prior
  scores, or how many rounds have happened.
- No screenshot or rendering tooling is used. All checks are code-level.
  See Section 4 for what this trades away.
- Two deliverables now, not one: a clean standalone page meant to actually
  be shared, and the full tabbed experiment view for anyone who wants the
  process story.

## 0. Context

Same premise as v1: a 10-minute lecture page on agentic loops for
undergraduates, built by an agentic loop grading itself, with no human
between rounds. This run is meant to produce something worth putting your
name on. Treat that as real — this isn't just a test of the loop mechanism
anymore, it's a deliverable.

## 1. Objective

Produce:

1. `showcase.html` — a single, polished, standalone lecture page. This is
   the artifact a stranger would open from a LinkedIn link or a portfolio.
   It must read as a finished page, not as an experiment.
2. `final.html` — the full round-by-round tabbed view plus a Highlights
   tab, as in v1, for anyone who wants to see how it was built.

Both must independently satisfy every check in `design-system.md`.

## 2. Success Criteria / Stop Condition

Each round, the isolated Critic subagent scores the current draft, out of
10 on each axis:

- **Content score** (Section 6.1) — accurate, complete, right level,
  paced for 10 minutes, actually teaches something.
- **Design score** (Section 6.2) — derived mechanically from
  `design-system.md`'s checklist, not an impression.

**Stop the loop when either is true:**

1. Content = 10 **and** Design = 10 in the same round, or
2. 8 rounds have been completed.

Same as v1: no rounding up, no stopping on a 9, hard cap at 8 regardless of
trajectory.

## 3. Out of Scope

Same as v1 (no live-presentation mode, no external network calls in the
shipped pages, no editing a past round after the fact), plus: no headless
browser, screenshot tool, or rendering dependency is installed or used
anywhere in this pipeline.

## 4. Rendering (added — Playwright MCP is now available)

The Critic subagent has real browser access via the Playwright MCP server
(`claude mcp add playwright npx @playwright/mcp@latest -- --headless`,
installed once, outside this repo, before running the loop). Each round,
before scoring, it navigates to the round's `lecture.html` and takes an
actual full-page screenshot, then compares that screenshot directly
against `design-ref/*.jpg`. The Design score's Step 3 (rendered visual
fidelity, in `.claude/agents/loop-critic.md`) is a real check now, not an
advisory note — it can and should move the score.

This is a build-time-only dependency. It does not appear in either shipped
deliverable (`showcase.html`, `final.html`), which remain fully offline
per Section 9. If the Playwright MCP server isn't connected when a round
starts (check with `/mcp`), stop and fix that before continuing — do not
silently fall back to code-only grading and call it equivalent, since that
would quietly reintroduce the exact gap this section closes.

## 5. Roles and Protocol

### 5.1 Builder (main session)

Same responsibilities as v1: write round 1 from scratch, revise every
round after in direct response to the Critic's findings, write a short
changelog each round. Before each round, consult `design-system.md` and
glance at `design-ref/*.jpg` for direction — the Critic will check the
rules, but the Builder should be aiming at the pictures, not just the
rulebook.

### 5.2 Critic (isolated subagent)

Defined in `.claude/agents/loop-critic.md` (provided alongside this PRD —
create it at that exact path before round 1). It has **Read, Grep, Glob,
and the Playwright MCP browser tools only** — it cannot edit anything and
cannot run arbitrary Bash. Its system prompt contains the rubric, the
design-system checklist, and the rendering step, and nothing else: no
mention of prior rounds, no access to the Builder's notes, no memory of
having "already" looked at this page.

Each round, the main session invokes it explicitly (e.g., "use the
loop-critic subagent to grade `rounds/round-N/lecture.html`") and passes
**only the file path** — not a summary, not the Builder's reasoning, not
the previous critic report. It grades what's in front of it, cold, every
time.

### 5.3 Round Protocol

```
create .claude/agents/loop-critic.md if it doesn't exist yet

round = 1
loop:
  if round == 1:
    Builder creates rounds/round-1/lecture.html from scratch
  else:
    Builder revises the previous round's lecture.html per the last
    critic-report.md, saves as rounds/round-N/lecture.html
  invoke loop-critic subagent on rounds/round-N/lecture.html only
  save rounds/round-N/critic-report.md (Critic's output, verbatim)
  save rounds/round-N/builder-notes.md (Builder's 1-2 sentence changelog)
  if (content_score == 10 and design_score == 10) or round == 8:
    stop, record stop_reason
  round += 1
```

## 6. Grading Rubric

### 6.1 Content — out of 10 (unchanged from v1)

| Criterion | Points | What earns it |
|---|---|---|
| Coverage | 0–3 | Answers all four required beats: what an agentic loop is, when to use one, the pros, the cons. |
| Accuracy | 0–2 | Technically correct; no fabricated stats, quotes, or tools. |
| Audience fit | 0–2 | Written for undergraduates, jargon defined on first use. |
| Pacing | 0–2 | Reads in roughly 10 minutes. |
| Engagement | 0–1 | At least one concrete example or analogy. |

### 6.2 Design — out of 10 (mechanical floor, rendered ceiling)

**Step 1 — Hard gates.** Check these four using `design-system.md`
Section 1 and 2:

- Palette conformance (only the 9 approved hex values appear anywhere)
- No emoji or pictograph characters anywhere in the HTML
- Two typefaces max, only the approved sizes
- Every text/background pair actually used computes to ≥4.5:1 (normal
  text) or ≥3:1 (large text)

**If any hard gate fails, Design is capped at 4/10.** Name exactly which
gate(s) failed and quote the offending code. Skip Steps 2 and 3.

**Step 2 — Polish checks.** Only if all four hard gates pass: start at 10,
subtract 1 point for each of these that fails (design-system.md Section 6,
items 4–10), floor at 0:

- 8px spacing grid, no exceptions
- One shadow recipe, one border radius, used consistently
- No gradients except a tint/shade of a single approved color
- No unstyled default browser elements
- No dead CSS (a class defined and never used)
- Exactly one H1-equivalent visual anchor
- Crimson dominance ratio within roughly 1-in-6 to 1-in-8 content blocks

**Step 3 — Rendered visual fidelity.** With Playwright MCP available (see
Section 4), the Critic renders the page, screenshots it, and compares that
screenshot directly against `design-ref/*.jpg`. Up to 2 further points can
be deducted from the Step 2 subtotal for a real, described visual gap
(cramped spacing that passes the 8px check on paper but reads wrong
rendered, doesn't feel like the same design system, visible layout bugs).
Floor the final score at 0.

Every 9 or 10 on either axis needs quoted code, a computed number, or a
specific screenshot observation. An asserted score with no evidence is
invalid and must be redone.

## 7. Artifacts and File Structure

```
loop-experiment-v2/
  PRD.md                        this file
  design-system.md              color/type/spacing/icon spec + checklist
  design-ref/
    ref-01-hero.jpg
    ref-02-flow-diagram.jpg
    ref-03-icon-grid.jpg
    ref-04-card-list.jpg
    ref-05-takeaway.jpg
  .claude/agents/loop-critic.md subagent definition (provided, see below)
  rounds/
    round-1/  lecture.html  critic-report.md  builder-notes.md
    round-2/  ...
    ... through round-N (N <= 8)
  showcase.html                 standalone deliverable, see Section 8.2
  final.html                    tabbed experiment view, see Section 8.1
  run-summary.md                final scores, stop reason, round-by-round fixes
```

## 8. Final Deliverables

### 8.1 `final.html` (same spec as v1)

Tab bar across rounds plus a Highlights tab, each round in a sandboxed
`iframe`, score strip per round, Highlights tab written for students with
real scores inline per round and a full score-progression table, stop
reason stated plainly.

### 8.2 `showcase.html` (new in v2)

The winning round's `lecture.html`, finalized as a standalone page:

- No tab bar, no mention of rounds, Builder, Critic, or the loop process —
  reads as a normal, finished page on agentic loops.
- A quiet footer credit line: name and program.
- One small, unobtrusive line at the very bottom — something like "See how
  this page was built" — linking to `final.html`, for anyone curious
  enough to click.
- Must independently pass every check in `design-system.md` on its own. It
  doesn't inherit a pass just because its source round scored well; verify
  it again as the last step before calling the run done.

## 9. Technical Constraints

Same as v1: vanilla HTML/CSS/JS, no build step, fully offline at view time
(no CDNs, no external fonts, no network calls), renders correctly in a
modern browser. Additionally: nothing in this pipeline requires installing
a headless browser, a screenshot tool, or any rendering dependency — v2 is
code-level checks only, by design (Section 4).

## 10. Guardrails

- Hard cap: never exceed 8 rounds.
- No silent edits: every change is a new round with its own artifacts.
- No fabrication: don't state a specific fact, quote, or number you're not
  confident is real.
- Be honest about the stop reason, in `run-summary.md` and in
  `final.html`'s Highlights tab — including if Section 4's known
  limitation means a "perfect" score didn't catch something a human later
  notices.
- The Critic subagent must never be shown prior rounds' critic reports,
  the Builder's changelog, or any indication of round number when scoring.
  If you notice it anchoring on "this is probably good since it's a later
  round," that's a bug in the isolation — fix the invocation, not the
  score.

## 11. Acceptance Checklist

- [ ] `.claude/agents/loop-critic.md` exists at the exact path and was
      actually invoked as a subagent each round — not simulated by the
      main session pretending to be the Critic.
- [ ] The Playwright MCP server was connected for the entire run (checked
      via `/mcp` before round 1), and every round's critic-report.md shows
      real rendered screenshot observations in Step 3, not "N/A" or a
      skipped step.
- [ ] Every round in `rounds/` has all three files, and each
      `lecture.html` opens standalone without errors.
- [ ] The loop ran to a genuine 10/10-on-both round or to round 8.
- [ ] `final.html` opens with no console errors, every round tab loads its
      correct content, and the Highlights tab is readable by someone
      outside this process.
- [ ] `showcase.html` opens standalone, has no leftover references to
      rounds/Builder/Critic, has the credit line, and independently passes
      every `design-system.md` check.
- [ ] `run-summary.md` states final scores, round count, stop reason, and
      does not overstate what Section 4's limitation means was actually
      verified.
- [ ] Nothing in either shipped HTML file makes a network call.
