# hq-ui: notes for Claude

Read SPEC.md first. It has the decisions, the departures from the DKT brief, and the open questions.

## Commands

```bash
npm run tokens      # regenerate css/tokens.css from tokens/tokens.json, fail on contrast under 4.5:1
npm run typecheck
npm run build       # tokens + dist/ (commit dist/, git installs do not build)
npm run dev         # style guide at http://localhost:5199
```

## Rules

1. `tokens/tokens.json` is the source of truth. Never edit `css/tokens.css` by hand. Change the JSON and run `npm run tokens`.
2. `css/components.css` uses token variables only. No hex colours. No new font sizes or spacing values that are not in the foundation scale.
3. A new colour role must be added to all four palettes (work light, work dark, personal light, personal dark) and, if it is used for text, to `textRoles` in `scripts/build-tokens.mjs`.
4. Components stay stateless and effect-free so they work in server components. `useId` is the only hook in use.
5. Every component added to `src/` gets an example in `styleguide/main.tsx`. If it is not in the style guide, it is not done.
6. After any visual change, open the style guide and check Work and Personal in light and dark, at desktop and phone width. Say what you checked.
7. Bump `version` in both `package.json` and `tokens/tokens.json` together.

## Work theme: rules carried from the DKT brief

The brief is kept outside this repo. For this library the ones that bite are:

- Walnut is the only accent, once or twice per screen. One primary button per view.
- No pure white or pure black, no cool greys.
- Every number a person could hold us to is set with `.hq-num` or a `numeric` column.
- No shadows, no pills, no gradients, no accent rule under a heading.
- Button labels are a verb with an object: "Start a quote", never "Submit".
- Never generate product imagery. Use a labelled placeholder.

Where hq-ui departs from the brief, SPEC.md lists each case with its reason. Do not "fix" those back.

## Make it on purpose

This work goes through the `make-it-on-purpose` skill. Run it on any new screen, component or copy. Two things settled so far:

- A card is an open section unless a box is needed. Do not wrap every block in `variant="raised"`.
- Copy has no em dashes, no eyebrow labels, no section numbers, and no periods on titles.

## What not to do

- The repo is `github.com/caleb157/hq-ui`, public, and apps install from `main`. Run `npm run build` and commit `dist/` with every source change. Ask before pushing, and before publishing to npm.
- Sample figures in the style guide are invented. Do not quote them as real.
- This repo is public. Never put real customer names, order numbers, prices, margins or credentials in it.
