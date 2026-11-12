# hq-ui spec

Version 0.1.0, written 2026-11-12. This file records what was decided, why, and what is still open. Read it before changing anything.

## What this is

Design tokens plus a small React component library for a set of internal tools. Two themes share one foundation (spacing, type sizes, radii, motion):

| Theme | Direction | Character | Default density |
|---|---|---|---|
| `work` | Worksheet | DKT brand brief v0.1. A ruled sheet like the PDHQ costing worksheet: Bone ground, hairlines, mono figures, 2px corners, no boxed cards. | compact |
| `personal` | Paper | Calm and cool. No cards, large light numerals, sage accent, sections separated by space. | comfortable |

First consumers: PDHQ (a quoting and costing app) and a new CEO cockpit. `home-hq` is the likely first user of `personal`.

## Decisions from the interview (2026-11-12)

| Topic | Decision |
|---|---|
| Work palette | Walnut `#8A4A26` stays the only UI accent. Chart series come from the materials: iron, walnut, marble, honey wood, clay. Success, warning and danger are for status only. |
| Personal palette | Cool and neutral, clearly not work. Sage accent `#456650`. |
| Typefaces | Work: Newsreader for page titles only, Inter for UI, IBM Plex Mono for every figure. Personal: Inter throughout, tabular figures instead of mono, weight 300 for titles and big numbers. |
| Corners | One shared scale (0, 2, 4, 6, 10, 16). Work picks 2/2/4 for control/card/panel. Personal picks 6/10/16. This settles the conflict between the brief (10px) and the old `dkt-tokens.css` (2px). |
| Density | Work compact, Personal comfortable. Density is its own switch, so either theme can be flipped per screen. |
| Dark mode | Both themes. Follows the system, with a manual override. Work dark is the brief's Ink mode. |
| Stack | React + Tailwind 4, installed from a git repo with npm. |
| PDHQ | The Work theme appears as an entry in PDHQ's existing theme menu, next to Q mode and Parker mode. Picking it reskins existing screens. |
| Visual directions | Six were mocked. Worksheet (Work A) and Paper (Personal B) were picked. |

## How it is built

```
tokens/tokens.json        source of truth for every value
scripts/build-tokens.mjs  writes css/tokens.css and checks text contrast
css/tokens.css            generated, never edited by hand
css/components.css        hq-* classes, token values only
css/fonts.css             optional Google Fonts import
css/tailwind.css          Tailwind 4 @theme bridge (bg-hq-bg, text-hq-muted, ...)
css/shadcn.css            maps shadcn variables onto hq tokens (for PDHQ)
src/components.tsx        React wrappers over the classes, no state, no effects
src/chart.ts              Recharts props that point at CSS variables
src/theme.ts              applyTheme() and themeAttrs()
styleguide/               the living style guide (Vite app, not shipped)
dist/                     built JS and types, committed so git installs need no build
```

The CSS classes are the real interface. The React components only assemble class names, so a non-React page can use the same classes directly.

### Theming contract

Three data attributes, normally on `<html>`:

| Attribute | Values | When absent |
|---|---|---|
| `data-theme` | `work`, `personal` | Nothing is themed |
| `data-mode` | `light`, `dark` | Follows `prefers-color-scheme` |
| `data-density` | `compact`, `comfortable` | The theme's default |

`data-theme` and `data-mode` must sit on the same element. `data-density` can sit on any element, so one dense table inside a comfortable page works.

### Token layers

1. **Foundation**, on `:root`, shared by both themes: `--hq-space-1..9` (4 to 96px), `--hq-radius-*`, `--hq-text-*` (10 to 34px), `--hq-weight-*`, `--hq-leading-*`, `--hq-duration-fast|base|slow` (120, 200, 320ms), `--hq-ease-*`, `--hq-measure` (68ch).
2. **Theme style**, per theme: fonts (`--hq-font-display|ui|data`), title and heading sizes, label treatment, the three radius roles, and the rule tokens that decide where hairlines are drawn (`--hq-section-rule`, `--hq-stat-rule`, `--hq-list-rule`, `--hq-table-rule`).
3. **Colour roles**, per theme and mode: `bg`, `surface`, `line`, `line-strong`, `text`, `text-muted`, `accent` (+ `-hover`, `-press`, `-wash`), `on-accent`, `focus`, `success|warning|danger` (text-safe) and their `-fill` versions (for bars and dots), `chart-1..5`, `chart-grid`, `chart-axis`.
4. **Density**: `row-h`, `control-h`, `control-pad-x`, `card-pad`, `gap`, `section-gap`, `page-pad`, `text-body`, `text-data`, `text-stat`.

### Components

| Component | Class | Notes |
|---|---|---|
| `Card` | `.hq-card` | Unboxed section by default: ruled on top in Work, open in Personal. `variant="raised"` draws a box and is for forms and dialogs only. |
| `StatRow`, `Stat` | `.hq-stat-row`, `.hq-stat` | Label, value, optional note with a tone. Personal shows the value first. |
| `DataTable` | `.hq-table` | Typed columns. `numeric` right-aligns and uses the data face. Scrolls sideways in its own box on narrow screens. |
| `List`, `ListItem` | `.hq-list` | Text with optional right-hand meta. |
| `Nav` | `.hq-nav` | Top or side. `renderLink` swaps in a router link. `DktMark` is the arch-and-plinth logo. |
| `Button` | `.hq-btn` | primary, secondary, ghost. One primary per view. |
| `Input`, `Select`, `Textarea`, `Checkbox` | `.hq-input` etc. | Label, hint and error are wired to the control for screen readers. |
| `Legend` + `chart.ts` | `.hq-chart`, `.hq-legend` | Recharts props (`gridProps`, `axisProps`, `valueAxisProps`, `tooltipProps`, `barProps`, `lineProps`) and `chartSeries` colours. |

Not built yet: radio, switch, dialog, tabs, toast, date picker, pagination, empty and loading states.

## Where this departs from the DKT brief, on purpose

| Brief says | hq-ui does | Why |
|---|---|---|
| Clay `#75624E` for secondary text | `#6B5845` | Clay on Sand is 4.40:1, under the 4.5:1 minimum. |
| Success `#3F7D5A`, Warning `#B4802A`, Error `#A94A3C` | Those are kept as `-fill` colours. Text uses `#35694B`, `#7F5710`, `#9C4033`. | The brief's warning is 2.9:1 as text on Bone. |
| Never a second hue | Charts use iron, marble, honey wood and clay beside walnut. | Charts need more than one series. All are warm material colours, none is a UI accent. |
| Button text `#fff` in `dkt-tokens.css` | Bone `#F4EBDC` | The brief bans pure white. The old token file contradicted it. |
| Display letter-spacing `-0.015em` in `dkt-tokens.css` | The font's own spacing | Nothing in the brief asks for it. |
| Eyebrow labels above headings | Mono uppercase labels only as table column headers | Rule 6 of the brief is about replacing accent rules. Dense screens do not need a label over every heading. |
| Serif section headers | Newsreader on the page title only | The owner chose this in the interview, to keep dense screens sans. |

The Personal theme is not bound by the brief at all.

## Verified on 2026-11-12

- `npm run tokens`: 0 contrast failures across both themes and both modes (text, muted text, accent, status colours on `bg` and `surface`, and `on-accent` on `accent`).
- `npm run typecheck` and `npm run build` pass.
- Style guide opened in a browser: Work light and dark, Personal light and dark, at 1360px and 375px wide. No console errors, no sideways overflow.

## Not verified, and open questions

1. **Installing in PDHQ through Lovable.** Decided 2026-11-12: the repo is public at `github.com/caleb157/hq-ui`, so Lovable and Vercel can install it with no credentials. Install with `npm install github:caleb157/hq-ui`. Because the repo is public, it must never hold real customer names, order numbers, prices or margins. Whether Lovable's own build accepts a git dependency has not been tried.
2. **PDHQ's theme menu.** The local SuperQuoter copy is from April 2026 and has no Q mode, Parker mode or Dial-Up theme. `css/shadcn.css` is written against the standard Tailwind 4 shadcn variable names and has not been tried in the live app. The next session needs the current PDHQ repo checked out, and should read how PR #97 (Dial-Up) registered its theme before adding Work the same way.
3. **Nothing has been installed into a consuming app yet.** The package has only been exercised by its own style guide.
4. **Pinning.** Apps install from the `main` branch. Tag releases (`v0.1.0`) and install `github:caleb157/hq-ui#v0.1.0` once more than one app depends on it, so a change here cannot surprise an app.
5. **Fonts in Next apps.** `home-hq` should load Inter with `next/font` and set `--hq-font-ui`, rather than import `fonts.css`.
6. **Recharts versions.** Tested with Recharts 3.10. PDHQ had 3.8 in April.
7. **Compact controls are 32px tall**, under the 44px touch guideline. That is deliberate for a desktop data tool. Use `data-density="comfortable"` on screens meant for a phone.
8. **Chart series 4 and 5** in Work (honey wood, clay) are close in lightness to their neighbours. Label series directly when a chart uses more than three.

## Next steps, in order

1. Done 2026-11-12: public repo created and pushed.
2. In PDHQ: `npm install github:caleb157/hq-ui`; import `tokens.css`, `components.css`, `shadcn.css`; add Work to the theme menu; check the costing worksheet and one dialog in light and dark.
3. Build the CEO cockpit's first screen from the Work sample screen in the style guide.
4. Move `home-hq` onto `personal`.
5. Add the missing components as real screens ask for them, not before.
