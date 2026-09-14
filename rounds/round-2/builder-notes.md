# Builder Notes — Round 2

Revised per Round 1's five findings: expanded the "When should you use one?" section with a worked
bug-fix comparison and a three-question decision checklist (pacing); rewrote the ReAct attribution
sentence to drop the unverified "Google researchers" claim (accuracy); added a live "Section X of Y
· ~N min left" readout to the nav bar (navigation & flow); added a `@media (max-width: 600px)`
breakpoint for the Pros/Cons columns and put the previously-unused `.callout` class to work for a
research-backed "diminishing returns" note (layout/dead CSS); and rebuilt the reason/act/observe
diagram with a horizontally-scrolling wrapper instead of `flex-wrap`, so it can no longer break its
left-to-right arrow order on a narrow window (polish).
