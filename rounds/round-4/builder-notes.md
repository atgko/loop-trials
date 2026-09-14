# Builder Notes — Round 4

Responded to Round 3's single finding: added a new `--accent-warm-text: #a34e1f` variable (a
darkened version of the warm accent) and switched `.callout strong` and `.arrow` to use it instead
of the original `--accent-warm` (#c9622a), which stays in place for border-only uses (`.callout`'s
left border and `.col.cons`'s top border) where WCAG text-contrast rules don't apply. No text
content was changed this round — only the two failing text/icon color uses.
