# Builder Notes — Round 3

Responded to Round 2's three findings: expanded thin sections substantially — added a
chatbot-vs-loop distinction and a "you've seen this before" examples paragraph to "What is an
agentic loop?", a new paragraph on the self-grading-inflation guardrail to "The example is this
page" (tying directly back to the Cons section), and a fuller two-paragraph Recap with a concrete
takeaway (pacing: page is now 1,448 words, ~9.65 min at 150wpm, versus 1,056 before); changed the
live readout's `WORDS_PER_MIN` constant from 180 to 150 so the countdown now agrees with the "10
minute" hero subtitle instead of contradicting it (readout honesty); and gave `.checklist` a
left accent border in `var(--accent)` to match `.callout`'s left-border pattern, so single "boxed"
elements now share one consistent left-border language while only the paired Pros/Cons cards use
the distinct top-border treatment (component consistency).
